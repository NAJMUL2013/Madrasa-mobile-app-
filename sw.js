const CACHE_NAME = "madrasa-app-cache-v20";
const URLS_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./app-icon-192.png",
  "./app-icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(URLS_TO_CACHE.map((u) =>
        fetch(new Request(u, { cache: "reload" })).then((r) => cache.put(u, r)).catch(() => {})
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// নেটওয়ার্ক-ফার্স্ট: অনলাইনে থাকলে সবসময় নতুন ভার্সন, অফলাইনে ক্যাশ থেকে চলবে
self.addEventListener("fetch", (event) => {
  const req = event.request;
