const CACHE_PREFIX = 'pokopie-static-'
const CACHE_NAME = `${CACHE_PREFIX}v1`
const OFFLINE_URL = '/offline.html'
const PRECACHE_URLS = [
  OFFLINE_URL,
  '/logo-128.png',
  '/icon-192.png',
  '/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => (
            cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME
          ))
          .map((cacheName) => caches.delete(cacheName)),
      ))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL)),
    )
    return
  }

  const url = new URL(request.url)

  if (url.origin !== self.location.origin || !isStaticRequest(request, url)) {
    return
  }

  event.respondWith(updateStaticResource(request, event))
})

async function updateStaticResource(request, event) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)
  const refresh = fetch(request).then((response) => {
    if (response.ok) {
      event.waitUntil(cache.put(request, response.clone()))
    }
    return response
  })

  // Hashed build assets are immutable; other resources get refreshed in the
  // background so updated icons and images do not remain stale indefinitely.
  if (cachedResponse && new URL(request.url).pathname.startsWith('/assets/')) {
    return cachedResponse
  }

  if (cachedResponse) {
    event.waitUntil(refresh.catch(() => undefined))
    return cachedResponse
  }

  return refresh
}

function isStaticRequest(request, url) {
  return url.pathname.startsWith('/assets/') || [
    'font',
    'image',
    'script',
    'style',
  ].includes(request.destination)
}
