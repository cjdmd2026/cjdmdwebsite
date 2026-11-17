const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const directories = new Set(['main', 'project', 'designer', 'archive', 'css', 'js', 'assets', 'countdown']);
const types = {'.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml',
    '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.woff':'font/woff', '.woff2':'font/woff2', '.json':'application/json'};
http.createServer(async (request, response) => {
    try {
        const url = new URL(request.url, 'http://localhost');
        const pathname = decodeURIComponent(url.pathname === '/' ? '/main/' : url.pathname);
        const parts = pathname.split('/').filter(Boolean);
        if (parts.some(part => part.startsWith('.')) || (!directories.has(parts[0]) && pathname !== '/index.html')) throw Error('Not public');
        let file = path.resolve(root, '.' + pathname);
        if (!file.startsWith(root + path.sep)) throw Error('Outside workspace');
        if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
        const bytes = await fs.readFile(file);
        response.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store'});
        response.end(bytes);
    } catch { response.writeHead(404); response.end('Not found'); }
}).listen(4177, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4177/archive/'));
