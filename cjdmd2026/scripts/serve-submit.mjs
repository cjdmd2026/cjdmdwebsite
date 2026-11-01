import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleRequest } from '../api/submission.js';

const root = path.resolve(fileURLToPath(new URL('../public-dist/', import.meta.url)));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost:4173');
    if (url.pathname === '/api/submission') {
      const request = new Request(url, { method: req.method, headers: req.headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : req, duplex: 'half' });
      const response = await handleRequest(request);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    if (url.pathname === '/submit') { res.writeHead(302, { Location: '/submit/' }); res.end(); return; }
    let local = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (!local.startsWith(root + path.sep) && local !== root) throw new Error();
    if ((await stat(local)).isDirectory()) local = path.join(local, 'index.html');
    res.writeHead(200, { 'Content-Type': types[path.extname(local)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(local));
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(4173, '127.0.0.1', () => console.log('Local: http://localhost:4173/submit/'));
