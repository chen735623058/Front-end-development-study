/**
 * create by sxf on 2019/2/21.
 * 功能:
 */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'sxf-minimal-pwa-1'
var cacheList = [
    '/',
    'index.html',
    'main.css',
    'icon.png'
]
self.addEventListener('install',e =>{
    e.waitUntil(
        caches.open(cacheStorageKey)
            .then(cache => cache.addAll(cacheList))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch',function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if(response != null){
                return response;
            }
            return fetch(e.request.url)
        })
    )
})


self.addEventListener('activate',function (e) {
    e.waitUntil(
        // 获取所有的cache名称
        caches.keys().then(cacheName => {
                return Promise.all(
                    cacheName.filter(cacheName => {
                        return cacheName != cacheStorageKey
                    }).map(cacheName =>{
                        return caches.delete(cacheName)
                    })
                )
            }
        ).then(() =>{
                return self.clients.claim()
            }
        )
    )
})