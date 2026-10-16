const CACHE = 'valdombra-1-5-v1';
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon.png", "./icon-192.png", "./icon-512.png", "./mappa-valdombra.webp", "./villaggio.jpg", "./sagrato.jpg", "./bosco.jpg", "./lettera.jpg", "./locanda.jpg", "./viandante.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('valdombra-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}))) });
