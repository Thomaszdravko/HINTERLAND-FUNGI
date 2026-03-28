const CACHE_NAME = "fungi-field-notes-v4";

const APP_SHELL = [
  "./",
  "./fieldnotes.html",
  "./manifest.json",
  "./SIX_9DEC9DD4-4378-4975-90D3-A9DCBFA380E8.png",
  "./SIX_23C2F4BF-4216-4448-9422-E561138A1CF5.png",
  "./SIX_FAF197CF-C703-4DE5-99F2-D27EA2A569B1.png",
  "./0027015A-CFA3-4237-AD58-B7418E9B049E.jpeg",
  "./IMG_1678.png",
  "./IMG_0238.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
