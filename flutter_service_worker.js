'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "dc881285f399f79203b66a77c2635a48",
"/": "dc881285f399f79203b66a77c2635a48",
"main.dart.js": "a3b949777aef464d99c41ed61287c324",
"functions.js": "d47ba477e7fb09e10fe7dceb4e111e43",
"favicon.png": "b53ce72c4682aaf304320087ddbad0bc",
"icons/Icon-192.png": "47620083b0618feee4eb03021f2b5603",
"icons/Icon-512.png": "07befd726ffee7bd8fb952241e309b6a",
"manifest.json": "a83bbbd9d23ea4d752fbcd44cdc544fa",
"assets/LICENSE": "31e8521ffc21baba10588df8748174cf",
"assets/images/LandStories1.png": "9c3321db8a55612650934e128f5633c2",
"assets/images/python.png": "76fc9aa252b70c510358bf5b9b4c1abc",
"assets/images/WSW1.png": "20f84511f7c2295173d8cb13c7b0f01d",
"assets/images/flutter.png": "8ba1d5b022cd7f5999bea3085e87ceb0",
"assets/images/readmess.png": "f35fd41f6f027571995de2b11a64b2d8",
"assets/images/other.png": "a3e3ac66c4c32b6457a74d5669ae6313",
"assets/images/123.png": "ce57138db5970693926578bb0b4192b7",
"assets/images/profile.png": "30da2e82d5ac77dcebf67d64bddf8f89",
"assets/images/github2.png": "472739dfb5857b1f659f4c4c6b4568d0",
"assets/images/cs.png": "7bcb3f38c36dd49ea19e697fa194f3a1",
"assets/images/LandStories12.png": "f7df50c4304d2c9fa2be9831a99e539d",
"assets/images/LandStories13.png": "5c739a7eb85e0dfdc04ca50332718989",
"assets/AssetManifest.json": "53fadc57aab46563fff6502286052a8f",
"assets/FontManifest.json": "96880f5cbd12a15751331cdbdac93202",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/open_iconic_flutter/assets/open-iconic.woff": "3cf97837524dd7445e9d1462e3c4afe2",
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
