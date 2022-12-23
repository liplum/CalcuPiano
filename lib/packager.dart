import 'dart:io';

import 'package:calcupiano/foundation.dart';
import 'package:calcupiano/r.dart';
import 'package:collection/collection.dart';
import 'package:archive/archive_io.dart';
import 'package:file_picker/file_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sanitize_filename/sanitize_filename.dart';
import 'package:url_launcher/url_launcher.dart';

/// Packager provides An abstract layer to interact with local storage, disk and cloud.
///
/// ## Use cases:
/// - Dealing with soundpack archive, aka. `soundpack.zip`.
///
///
class Packager {
  Packager._();

  /// Pick the possible soundpack archive depended on platform.
  /// Return the path if picked. Null if canceled.
  static Future<String?> tryPickSoundpackArchive() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['zip'],
      withData: true,
      lockParentWindow: true,
    );
    return result?.files.single.path;
  }

  /// For the file format of a Soundpack, please check the [Soundpack Specification](https://github.com/liplum/calcupiano/specifications/Soundpack.md).
  static Future<void> importSoundpackFromFile(String path) async {
    final inputStream = InputFileStream(path);
    // Decode the zip from the InputFileStream. The archive will have the contents of the
    // zip, without having stored the data in memory.
    final archive = ZipDecoder().decodeBuffer(inputStream);

    final archiveFiles = archive.files.toList(growable: false);

    final uuid = UUID.v4();
    final rootDir = joinPath(R.soundpacksRootDir, uuid);
    // ----------------------------------------------------------------
    // Mapping(Copying) the archive files to local files.
    /// Only including file. No Folder.
    /// Note: If an archive file in a archive folder, its name is `myFolder/myFile.ext`
    final archiveFileName2LocalPath = <String, String>{};
    // For all of the entries in the archive
    for (final file in archiveFiles) {
      // If it's a file and not a directory
      if (file.isFile) {
        final targetPath = joinPath(rootDir, file.name);
        archiveFileName2LocalPath[file.name] = targetPath;
        final outputStream = OutputFileStream(targetPath);
        // The writeContent method will decompress the file content directly to disk without
        // storing the decompressed data in memory.
        file.writeContent(outputStream);
        // Make sure to close the output stream so the File is closed.
        outputStream.close();
      }
    }
    // ----------------------------------------------------------------
    // Find sound files of all notes.
    final Map<Note, LocalSoundFile> note2SoundFile = {};
    // TODO: I18n exception.
    // TODO: Handle exception.
    final fileName2ArchiveFile = archiveFiles.map((it) => MapEntry<String, ArchiveFile>(it.name, it)).toList();
    for (final note in Note.all) {
      final candidates = fileName2ArchiveFile.where((it) => it.key.startsWith(note.id)).toList(growable: false);
      if (candidates.isEmpty) throw Exception("Sound file of Note<$note> not found.");
      if (candidates.length > 1) throw Exception("Ambiguous sound audio file detected, $candidates, of Note<$note>.");
      final noteFile = candidates[0].value;
      if (R.supportedAudioExtension.contains(extensionOfPath(noteFile.name).toLowerCase())) {
        note2SoundFile[note] = LocalSoundFile(localPath: joinPath(rootDir, noteFile.name));
        continue;
      }
      throw Exception("Unsupported audio format, ${noteFile.name}.");
    }
    // ----------------------------------------------------------------
    // Finding helper function.
    String? findCaseInsensitiveLocalFileByName(String targetName) {
      return archiveFileName2LocalPath.entries.firstWhereOrNull((it) => it.key.toLowerCase() == targetName)?.value;
    }

    // ----------------------------------------------------------------
    // Find `soundpack.json`
    final soundpackJsonLocalPath = findCaseInsensitiveLocalFileByName("soundpack.json");
    SoundpackMeta? meta;
    if (soundpackJsonLocalPath != null) {
      final metaContent = await File(soundpackJsonLocalPath).readAsString();
      meta = Converter.fromUntypedJson(metaContent, SoundpackMeta.fromJson);
    }
    // ----------------------------------------------------------------
    // Find the `preview.png`
    final previewPngLocalPath = findCaseInsensitiveLocalFileByName("preview.png");
    LocalImageFile? previewImg;
    if (previewPngLocalPath != null) {
      previewImg = LocalImageFile(localPath: previewPngLocalPath);
    }
    // ----------------------------------------------------------------
    // Make the final LocalSoundpack object.
    final soundpack = LocalSoundpack(uuid: uuid, meta: meta ?? SoundpackMeta());
    soundpack.preview = previewImg;
    soundpack.note2SoundFile = note2SoundFile;
    DB.addSoundpackSnapshot(soundpack);
  }

  /// For the file format of a Soundpack, please check the [Soundpack Specification](https://github.com/liplum/calcupiano/specifications/Soundpack.md).
  /// Preconditions:
  /// - Ensure audio files of all essential notes are mounted in [LocalSoundpack.note2SoundFile].
  /// Postconditions:
  /// - The packed soundpack will be saved in temporary folder, see [getTemporaryDirectory].
  ///
  /// return the path of soundpack archive in temporary folder.
  static Future<String> packLocalSoundpack(LocalSoundpack soundpack) async {
    final archiveTargetPath = joinPath(R.tmpDir, "${soundpack.uuid}.zip");
    final rootDir = joinPath(R.soundpacksRootDir, soundpack.uuid);

    // ----------------------------------------------------------------
    // Zipping
    final archive = ZipFileEncoder();
    archive.zipDirectory(Directory(rootDir), filename: archiveTargetPath);
    // ----------------------------------------------------------------
    return archiveTargetPath;
  }

  /// Export the soundpack archive depended on platform.
  /// The archive won't be removed after exported.
  static Future<void> exportSoundpackArchive(LocalSoundpack soundpack) async {
    if (isDesktop) {
      var suggestedFileName = soundpack.meta.name;
      if (suggestedFileName != null) {
        suggestedFileName = sanitizeFilename(suggestedFileName);
      }
      final targetPath = await FilePicker.platform.saveFile(
        type: FileType.custom,
        fileName: suggestedFileName,
        allowedExtensions: ['zip'],
        lockParentWindow: true,
      );
      final archivePath = await packLocalSoundpack(soundpack);
    } else {}
  }

  /// Write [LocalSoundpack.meta] to local storage.
  static Future<void> writeSoundpackMetaFile(LocalSoundpack soundpack) async {
    final rootDir = joinPath(R.soundpacksRootDir, soundpack.uuid);
    final soundpackJson = Converter.toUntypedJson(soundpack.meta, indent: 2);
    if (soundpackJson != null) {
      await File(joinPath(rootDir, "soundpack.json")).writeAsString(soundpackJson);
    }
  }

  /// Write [LocalSoundpack.note2SoundFile] to local storage.
  /// To prevent overwriting itself, all involved files will be cached in temporary folder during writing.
  static Future<void> writeSoundFiles(LocalSoundpack soundpack) async {}

  static Future<void> duplicateSoundpack(SoundpackProtocol source) async {
    final uuid = UUID.v4();
    final SoundpackMeta meta;
    if (source is ExternalSoundpackProtocol) {
      final sourceName = source.meta.name;
      // TODO: L10n
      meta = source.meta.copyWith(
        name: sourceName == null ? null : "$sourceName~Copy",
      );
    } else {
      meta = SoundpackMeta();
    }
    final Map<Note, LocalSoundFile> note2SoundFiles = {};
    final rootDir = joinPath(R.soundpacksRootDir, uuid);
    await Directory(rootDir).create(recursive: true);
    for (final note in Note.all) {
      final file = await source.resolve(note);
      final localFilePath = await file.copyToFolder(rootDir);
      note2SoundFiles[note] = LocalSoundFile(localPath: localFilePath);
    }
    final soundpack = LocalSoundpack(uuid: uuid, meta: meta)..note2SoundFile = note2SoundFiles;
    DB.addSoundpackSnapshot(soundpack);
  }

  /// Only Works on Desktop
  static Future<void> revealSoundpackInFolder(LocalSoundpack soundpack) async {
    if (isDesktop) {
      final path = joinPath(R.soundpacksRootDir, soundpack.id);
      final url = Uri.parse('file:///$path');
      launchUrl(url);
    }
  }
}
