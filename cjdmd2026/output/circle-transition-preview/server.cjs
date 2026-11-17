const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const types = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.svg': 'image/svg+xml',
    '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2'};
const files = new Set(['/transition-circle-test.html', '/js/project-data.js', '/js/designer-data.js',
    '/js/main-icon-fragments.js', '/js/transition-circle-preview.js', '/js/main-poster-sprites.js',
    '/js/main-hero-sprite-batch.js', '/js/transition-word-camera.js',
    '/js/transition-loading-assembly.js', '/js/main-intro/loading-assembly.js', '/js/main-intro/icons.json']);
http.createServer(async (request, response) => {
    try {
        const url = new URL(request.url, 'http://localhost');
        const pathname = decodeURIComponent(url.pathname === '/' ? '/transition-circle-test.html' : url.pathname);
        if (!files.has(pathname) && !pathname.startsWith('/assets/')) throw Error('Not a preview asset');
        const file = path.resolve(root, '.' + pathname);
        if (!file.startsWith(root + path.sep)) throw Error('Outside preview');
        const data = await fs.readFile(file);
        response.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store'});
        response.end(data);
    } catch { response.writeHead(404); response.end('Not found'); }
}).listen(4176, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4176/transition-circle-test.html'));
