self.addEventListener('install', (event) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); 
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.hostname.includes('recaptcha.net')) {
        const modifiedHeaders = new Headers(event.request.headers);
        modifiedHeaders.set('Referer', 'https://greasyfork.org/');
        modifiedHeaders.set('Origin', 'https://greasyfork.org');
        const modifiedRequest = new Request(event.request, {
            headers: modifiedHeaders,
            mode: 'cors', 
            credentials: 'include',
        });

        event.respondWith(fetch(modifiedRequest));
    } else {
        event.respondWith(fetch(event.request));
    }
});
