// Service Worker for Home Management Suite PWA
const CACHE_NAME = 'home-management-suite-v1.0.0';
const STATIC_CACHE = 'home-management-suite-static-v1.0.0';
const DYNAMIC_CACHE = 'home-management-suite-dynamic-v1.0.0';

// Get the base path from the service worker's location
const BASE_PATH = self.location.pathname.replace('/service-worker.js', '');

// Files to cache immediately
const STATIC_ASSETS = [
  BASE_PATH || '/',
  `${BASE_PATH}/manifest.webmanifest`,
  `${BASE_PATH}/Shivohm_Logo_Light.png`,
  `${BASE_PATH}/Shivohm_Logo_Dark.png`,
  `${BASE_PATH}/Shivohm_Logo_White.png`,
  `${BASE_PATH}/Shivohm_Logo_3.png`,
  `${BASE_PATH}/loading.svg`,
  `${BASE_PATH}/vite.svg`,
  // Android app icons
  `${BASE_PATH}/icon-72.png`,
  `${BASE_PATH}/icon-96.png`,
  `${BASE_PATH}/icon-128.png`,
  `${BASE_PATH}/icon-144.png`,
  `${BASE_PATH}/icon-192.png`,
  `${BASE_PATH}/icon-512.png`,
  // Android splash screens
  `${BASE_PATH}/splash-800x480.png`,
  `${BASE_PATH}/splash-480x800.png`,
  `${BASE_PATH}/splash-1280x720.png`,
  `${BASE_PATH}/splash-720x1280.png`,
  `${BASE_PATH}/splash-1920x1080.png`,
  `${BASE_PATH}/splash-1080x1920.png`
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Force activation of new service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // Handle API requests differently
  if (url.pathname.startsWith(`${BASE_PATH}/api/`)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Return cached API response if available
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets and pages
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response.ok) return response;

            const responseClone = response.clone();

            // Cache HTML pages and static assets
            if (
              request.destination === 'document' ||
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'image' ||
              request.destination === 'font'
            ) {
              caches.open(DYNAMIC_CACHE)
                .then(cache => cache.put(request, responseClone));
            }

            return response;
          })
          .catch(() => {
            // Return offline fallback for navigation requests
            if (request.mode === 'navigate') {
              return caches.match(BASE_PATH || '/');
            }
          });
      })
  );
});

// Message event - handle updates and communication
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline actions (if needed)
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic here
  // This could sync offline todos, expenses, etc.
  console.log('[SW] Performing background sync');
}

// Push notifications (optional)
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: `${BASE_PATH}/Shivohm_Logo_3.png`,
    badge: `${BASE_PATH}/Shivohm_Logo_3.png`,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || (BASE_PATH || '/'))
  );
});