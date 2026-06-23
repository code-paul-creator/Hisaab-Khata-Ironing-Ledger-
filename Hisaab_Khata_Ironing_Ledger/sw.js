// Service worker for Hisaab Khata.
// Caches the app shell on install so the app opens and works fully
// offline after the first visit — important since the istriwala may
// not always have reliable internet on the go.

const CACHE_NAME = "hisaab-khata-v2";
const ASSETS_TO_CACHE = [
  "./index.html",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./vendor/xlsx.full.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for app shell assets, network-first fallback for everything
// else (e.g. Google Fonts) so the core app always works offline, while
// fonts/icons still update when online.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isAppShell = ASSETS_TO_CACHE.some((asset) =>
    url.pathname.endsWith(asset.replace("./", "/"))
  ) || url.pathname === "/" || url.pathname.endsWith("/index.html");

  if (isAppShell) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // opportunistically cache fonts/CDN assets for offline reuse
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
