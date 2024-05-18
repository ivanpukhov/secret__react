self.addEventListener('fetch', (event) => {
    if (event.request.url === 'https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3') {
        event.respondWith(new Response('', { status: 403 }));
    }
});
