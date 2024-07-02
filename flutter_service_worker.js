'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"flutter_bootstrap.js": "be8045be67071a8953ff930851e35447",
"version.json": "51df34abc8aaf8eb5bca1834ba232886",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "1345bca9550e43443cbcea123b50a2f0",
"assets/NOTICES": "61ca1cd3e097174cc7ca96b0eb83f688",
"assets/AssetManifest.bin": "d5beb7c53520e847f1aee9a3d92343b8",
"assets/assets/l10n/ru.json": "f2500fd575a927488e08f25ecad1eef4",
"assets/assets/l10n/en.json": "31d8eaf1a27ff4923aaa54105ed2116c",
"assets/assets/l10n/zh-CN.json": "37c258551780f015ac5f277d3fb1d10a",
"assets/assets/soundpack/default_long_tone/eq.wav": "3123fc934e90c1b6334ade1757cc1dbd",
"assets/assets/soundpack/default_long_tone/8.wav": "a0c4e9f8ebc7339203b524c72a9ce90c",
"assets/assets/soundpack/default_long_tone/1.wav": "4198ad31194d32707eb5e75323f7f26d",
"assets/assets/soundpack/default_long_tone/9.wav": "ea413dc8ebc6df40bcd99075014b4f35",
"assets/assets/soundpack/default_long_tone/div.wav": "e602ea5cec3649ed83e59b3206e90789",
"assets/assets/soundpack/default_long_tone/mul.wav": "e3025c93af856d05df60beeab1be4118",
"assets/assets/soundpack/default_long_tone/preview.png": "0db35ce462aa7b33c90458d4c0adf346",
"assets/assets/soundpack/default_long_tone/7.wav": "87fdeec30047da185f5075c480aa6792",
"assets/assets/soundpack/default_long_tone/3.wav": "78c2a449dca12adf376c1b8814922d75",
"assets/assets/soundpack/default_long_tone/4.wav": "29faab125f7d7a283a09cc315ff39c12",
"assets/assets/soundpack/default_long_tone/5.wav": "98128150678abd09918e9678412e1b19",
"assets/assets/soundpack/default_long_tone/minus.wav": "d89d40e75f907da9f2f1eeb9bf9c9374",
"assets/assets/soundpack/default_long_tone/2.wav": "5a5cff9a93fc003913e6e1b402e6bd8d",
"assets/assets/soundpack/default_long_tone/6.wav": "05cb2eac51654a9f8e8d45a9f87e3a43",
"assets/assets/soundpack/default_long_tone/plus.wav": "07c96c5fd4750d90166093426e59b92b",
"assets/assets/soundpack/default/eq.wav": "205420b30f8645af2496a41d4303e70e",
"assets/assets/soundpack/default/8.wav": "62538bd961683f639010d5b3c9cd9402",
"assets/assets/soundpack/default/1.wav": "8cbcfa25c521f55f085a89165f4c65e3",
"assets/assets/soundpack/default/9.wav": "1bc77d128bef11da9e02d1919e7a0b16",
"assets/assets/soundpack/default/div.wav": "333f4c44c9cacc1387b632b053b44df5",
"assets/assets/soundpack/default/mul.wav": "c7bc5f1d7f82e7cfd4e97c537596c6b5",
"assets/assets/soundpack/default/preview.png": "0db35ce462aa7b33c90458d4c0adf346",
"assets/assets/soundpack/default/7.wav": "e8b7b6f3dc763778e0b937eeb5c471c0",
"assets/assets/soundpack/default/3.wav": "ee337799f5c41cb6fb5b6467ff96945e",
"assets/assets/soundpack/default/4.wav": "6dc075bf134695a85ba8f46eb4673905",
"assets/assets/soundpack/default/5.wav": "6892e928a5e52eabac53930032c90285",
"assets/assets/soundpack/default/minus.wav": "0a2bb363304e8cdd39cc6c1a2263f6da",
"assets/assets/soundpack/default/2.wav": "0956dbb1eb2f249b56f7723262e62bec",
"assets/assets/soundpack/default/6.wav": "62eb9794d20dad0f3178b8218d0c442a",
"assets/assets/soundpack/default/plus.wav": "d3a2eb836bc77ddd36fe22e26bc4aca3",
"assets/assets/soundpack/classic/eq.wav": "8b1326e16bdc323c59d8f5276c2c9729",
"assets/assets/soundpack/classic/8.wav": "a290c66d268448cefe5c1612b1ae4607",
"assets/assets/soundpack/classic/1.wav": "1fa9e989d3d9f00309b2fcc22c6d6feb",
"assets/assets/soundpack/classic/9.wav": "a236e7e59ab3e516d1d816495e6002b9",
"assets/assets/soundpack/classic/div.wav": "04b8374d049c515f7cb460acaa302512",
"assets/assets/soundpack/classic/mul.wav": "12cfa3ae9a26d99caea454598158150a",
"assets/assets/soundpack/classic/preview.png": "e7fbc3626bdf9842e703c5ffc68e10c8",
"assets/assets/soundpack/classic/7.wav": "d10a54414bb1de0edb97478c194a96f8",
"assets/assets/soundpack/classic/3.wav": "904eef57f08238c93047562b428ee0df",
"assets/assets/soundpack/classic/4.wav": "61f8ba5d15fe3363714a81c76457b008",
"assets/assets/soundpack/classic/5.wav": "7ad5f90724967cdd183dcaaaa011f737",
"assets/assets/soundpack/classic/minus.wav": "6833bcd08bac69899077bc253e36503f",
"assets/assets/soundpack/classic/2.wav": "b91ec6edbafdc624eb11c0b93073a4fa",
"assets/assets/soundpack/classic/6.wav": "879b3be8c55af2713a709900569b34a3",
"assets/assets/soundpack/classic/plus.wav": "f5b8d4cb918c45da9c4c284120d78930",
"assets/assets/about.md": "efda5ad60021bcadc6ada66288f122f2",
"assets/assets/google_fonts/JetBrainsMono-ThinItalic.ttf": "aa93e984e58bd7e4e1531473c17d52d6",
"assets/assets/google_fonts/JetBrainsMono-Medium.ttf": "15c2ebb28013b8f27037860b71f483ff",
"assets/assets/google_fonts/JetBrainsMono-ExtraBoldItalic.ttf": "2ce9a9a9f4047c2ddb416d6d443fb56e",
"assets/assets/google_fonts/JetBrainsMono-ExtraLight.ttf": "679e3c3589a70b41c75cf7e5d0811eb6",
"assets/assets/google_fonts/JetBrainsMono-SemiBold.ttf": "c3adbde3f656416bb45d7a661ecc2888",
"assets/assets/google_fonts/JetBrainsMono-Italic.ttf": "62796a38c74f83aba9550a5de2ad9d35",
"assets/assets/google_fonts/JetBrainsMono-Bold.ttf": "3e1a9b80c1ed9755d08c2ae81ca97a7f",
"assets/assets/google_fonts/JetBrainsMono-ExtraLightItalic.ttf": "1c4a2ace205c6d3b93ec3c89dceffe6b",
"assets/assets/google_fonts/JetBrainsMono-ExtraBold.ttf": "7ad874f6c9a34c357913525b2e38559c",
"assets/assets/google_fonts/JetBrainsMono-SemiBoldItalic.ttf": "114ddbdde2a84573efafcdd417b6840c",
"assets/assets/google_fonts/JetBrainsMono-Light.ttf": "13ac96c97b2247eff314c1deec573391",
"assets/assets/google_fonts/JetBrainsMono-Regular.ttf": "6b46a47a47235c8dfcb327fbf7bd634f",
"assets/assets/google_fonts/JetBrainsMono-BoldItalic.ttf": "c50f62188635ff51e2540181e62ff5e6",
"assets/assets/google_fonts/JetBrainsMono-OFL.txt": "f60a2253049b1fadf088249ba365d9be",
"assets/assets/google_fonts/JetBrainsMono-Thin.ttf": "e2134b38c6364f30aba4f06540c34f30",
"assets/assets/google_fonts/JetBrainsMono-MediumItalic.ttf": "be8f789370bd7cf183188212bdd4ed8d",
"assets/assets/google_fonts/JetBrainsMono-LightItalic.ttf": "bb4a78e0c0d3fde9ef5f10d46665b7d0",
"assets/assets/img/preview-placeholder.svg": "6d67573eac964cb49e75f703fdbd7c23",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/packages/unicons/icons/UniconsThinline.ttf": "a5f998ba8479329bcfc4c5d03205972e",
"assets/packages/unicons/icons/UniconsSolid.ttf": "d6b9d67082150709895c1af769c32b0f",
"assets/packages/unicons/icons/UniconsLine.ttf": "2f71d162f4ba5d5c02c3a4824ed89e3f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "d31a184325429fe56cc4a5bfd0b424e7",
"assets/AssetManifest.bin.json": "2570eea57248db49c0ecd008d615c729",
"assets/FontManifest.json": "08c2a268a8ca1751181968354ad85639",
"assets/fonts/MaterialIcons-Regular.otf": "d219a846b5d0784763c54398659d7ccb",
"assets/AssetManifest.json": "7bbb018c423ca4d9f920bf333c295d52",
"index.html": "9fef7dc5ca85546c875a4b8b3c9549f3",
"/": "9fef7dc5ca85546c875a4b8b3c9549f3",
"manifest.json": "aadd2ddf8b76797b230b606b94c97518"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
