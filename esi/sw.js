const CACHE_NAME = "esi-visa-cache-v1";
const urlsToCache = [
  "/esi/index.html",
  "/esi/styles.css",
  "/esi/script.js",
  "/esi/manifest.json",
  "/esi/icons/icon-192.png",
  "/esi/icons/icon-512.png"
];

// Installer le service worker et mettre en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activer le service worker et nettoyer les anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Intercepter les requêtes et servir le cache si disponible
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
