'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "2ef5292c1665635f0947d030294c7fd2",
"/": "2ef5292c1665635f0947d030294c7fd2",
"main.dart.js": "130b4d9f3b840cbe8956fd81dfefee87",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a83bbbd9d23ea4d752fbcd44cdc544fa",
"assets/LICENSE": "5b9d3cff7aaab196b1d9bb85ff32fb11",
"assets/images/LandStories1.png": "9c3321db8a55612650934e128f5633c2",
"assets/images/python.png": "76fc9aa252b70c510358bf5b9b4c1abc",
"assets/images/WSW1.png": "20f84511f7c2295173d8cb13c7b0f01d",
"assets/images/flutter.png": "8ba1d5b022cd7f5999bea3085e87ceb0",
"assets/images/readmess.png": "f35fd41f6f027571995de2b11a64b2d8",
"assets/images/123.png": "ce57138db5970693926578bb0b4192b7",
"assets/images/profile.png": "30da2e82d5ac77dcebf67d64bddf8f89",
"assets/images/github2.png": "472739dfb5857b1f659f4c4c6b4568d0",
"assets/images/cs.png": "7bcb3f38c36dd49ea19e697fa194f3a1",
"assets/images/LandStories12.png": "f7df50c4304d2c9fa2be9831a99e539d",
"assets/images/LandStories13.png": "5c739a7eb85e0dfdc04ca50332718989",
"assets/AssetManifest.json": "40c6278e1fe4f45446b54c5e51269064",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/files/Brady%20Stroud's%20cover%20letter.pdf": "bc9af040908e7a5b9a857b1730c9fc7d",
"assets/files/Brady%20Stroud's%20R%C3%A9sum%C3%A9.pdf": "51225b6c5f25d1b5e553b8ecf21f624a",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/images/profile.png": "30da2e82d5ac77dcebf67d64bddf8f89"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
