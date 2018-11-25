let cacheNamed = "restaurant-reviews";
let cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant.js',
    './js/sw_registration.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// Service worker installation
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheNamed).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

// Service worker activation
self.addEventListener('activate', function(event) {
   event.waitUntil(
       caches.keys().then(function(cacheNames) {
           return Promise.all(
               cacheNames.filter(function(cacheName) {
                   return cacheName.startsWith('restaurant-') &&
                    cacheName != cacheNamed;
               }).map(function(cacheName) {
                   return caches.delete(cacheName);
               })
           );
       })
   );
});

// fetch offline view
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Found ', event.request, ' in cache');
                return response;
            }
            else {
                console.log('Could not find ', event.request, ' in cache, FETCHING!');
                return fetch(event.request)
                .then(function(response) {
                    const clonedResponse = response.clone();
                    caches.open('cacheNamed').then(function(cache) {
                        cache.put(event.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                })
            }
        })
    );
});