'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "dc881285f399f79203b66a77c2635a48",
"/": "dc881285f399f79203b66a77c2635a48",
"main.dart.js": "ee2b9e9eae821fda2f5695d94e4be03a",
"functions.js": "d47ba477e7fb09e10fe7dceb4e111e43",
"favicon.png": "9e1eeadd90c4ecc61a0fb7003285d980",
"icons/Icon-192.png": "47620083b0618feee4eb03021f2b5603",
"icons/Icon-512.png": "07befd726ffee7bd8fb952241e309b6a",
"manifest.json": "a83bbbd9d23ea4d752fbcd44cdc544fa",
"assets/images/LandStories1.png": "9c3321db8a55612650934e128f5633c2",
"assets/images/python.png": "76fc9aa252b70c510358bf5b9b4c1abc",
"assets/images/WSW1.png": "20f84511f7c2295173d8cb13c7b0f01d",
"assets/images/flutter.png": "8ba1d5b022cd7f5999bea3085e87ceb0",
"assets/images/readmess.png": "f35fd41f6f027571995de2b11a64b2d8",
"assets/images/other.png": "a3e3ac66c4c32b6457a74d5669ae6313",
"assets/images/123.png": "ce57138db5970693926578bb0b4192b7",
"assets/images/profile.png": "30da2e82d5ac77dcebf67d64bddf8f89",
"assets/images/github2.png": "472739dfb5857b1f659f4c4c6b4568d0",
"assets/images/battleship.png": "58e83a642c98b4b39db11cffd5a117f0",
"assets/images/cs.png": "7bcb3f38c36dd49ea19e697fa194f3a1",
"assets/images/LandStories12.png": "f7df50c4304d2c9fa2be9831a99e539d",
"assets/images/LandStories13.png": "5c739a7eb85e0dfdc04ca50332718989",
"assets/images/gameTogether.png": "d4a259d220521f184efae5e48fd5e1ed",
"assets/AssetManifest.json": "53fadc57aab46563fff6502286052a8f",
"assets/NOTICES": "9f84bec69dbdfc467fc8bb26c78376e8",
"assets/FontManifest.json": "ffef466a50fbc9ba6a16887682586d0d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/open_iconic_flutter/assets/open-iconic.woff": "3cf97837524dd7445e9d1462e3c4afe2",
"assets/files/Brady%20Stroud's%20cover%20letter.pdf": "bc9af040908e7a5b9a857b1730c9fc7d",
"assets/files/Brady%20Stroud's%20R%C3%A9sum%C3%A9.pdf": "51225b6c5f25d1b5e553b8ecf21f624a",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/images/profile.png": "30da2e82d5ac77dcebf67d64bddf8f89"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/LICENSE",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
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
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.message == 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message = 'downloadOffline') {
    downloadOffline();
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
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.add(resourceKey);
    }
  }
  return Cache.addAll(resources);
}
