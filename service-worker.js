const cacheName = 'v2'

self.addEventListener('install', e => {
    console.log('Service worker installed.')
})

self.addEventListener('activate', e => {
    console.log('Service worker activated')
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Clearing old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', e => {
    console.log('Service worker fetching ' + e.request)
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resClone = res.clone()
                caches.open(cacheName).then(cache => {
                    cache.put(e.request, resClone)
                })
                return res
            })
            .catch(err => { caches.match(e.request).then(res => res) })
    )
})

self.addEventListener('notificationclick', e=>{
    e.notification.close()
    if(e.action=='explore'){
        clients.openWindow('/')
    }
})