// Service worker de Mora Calidad — v3
// Cambios respecto a v1:
//  - Precachea TODOS los archivos propios (portada, manifest e iconos), no solo './'.
//    Asi la app instalada arranca entera aunque no haya red.
//  - Guarda copia fresca de los archivos propios cada vez que se descargan.
//  - Fallback seguro: si algo no esta en cache, devuelve la portada en vez de
//    una pagina en blanco.
// Nota: la app interna (iframe de Google) NO se puede cachear desde aqui;
// sin conexion, index.html se encarga de mostrar el aviso "Sin conexion".

const CACHE = 'mora-calidad-v2'; // subir el numero en cada cambio de este archivo
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Borra las caches de versiones anteriores (p. ej. mora-calidad-v1)
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        // Si es un archivo de nuestro propio dominio, guardamos copia fresca
        if (e.request.url.startsWith(self.location.origin)) {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia));
        }
        return resp;
      })
      .catch(() =>
        // Sin red: servir de cache; si no esta, al menos la portada
        caches.match(e.request).then(r => r || caches.match('./'))
      )
  );
});
