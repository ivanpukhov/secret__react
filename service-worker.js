self.addEventListener('fetch', (event) => {
    if (event.request.destination === 'audio') {
        event.respondWith(new Response('', { status: 403 }));
    }
});
