const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

// Full browser -> real API handler -> isolated in-memory bucket -> download flow.
// Uses Chromium's synthetic camera; no real visitor images or production writes.
(async () => {
  const { handleApuchikaRequest } = await import('../server/apuchika-api.mjs');
  const root = path.resolve(__dirname, '../public-dist');
  const data = new Map(), calls = [], errors = [], missingAssets = [];
  let created, browser, failNextUpload = false;
  const bucket = {
    async put(key, bytes, options = {}) { if (failNextUpload) { failNextUpload = false; throw new Error('Simulated outage'); } data.set(key, { bytes, customMetadata: options.customMetadata }); },
    async get(key) { const item = data.get(key); return item ? { ...item, body: item.bytes, size: item.bytes.length } : null; },
    async head(key) { return this.get(key); },
    async delete(keys) { for (const key of Array.isArray(keys) ? keys : [keys]) data.delete(key); },
    async list({ prefix, limit }) { return { objects: [...data.keys()].filter(key => key.startsWith(prefix)).sort().slice(0, limit).map(key => ({ key })) }; },
    async limit() {},
  };
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://' + req.headers.host);
      if (url.pathname.startsWith('/apuchika/api/')) {
        const request = new Request(url, { method: req.method, headers: req.headers, ...(['GET', 'HEAD'].includes(req.method) ? {} : { body: req, duplex: 'half' }) });
        const response = await handleApuchikaRequest(request, { bucket });
        calls.push({ method: req.method, path: url.pathname, status: response.status });
        if (req.method === 'POST' && response.status === 201) created = await response.clone().json();
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(Buffer.from(await response.arrayBuffer())); return;
      }
      const local = path.resolve(root, '.' + decodeURIComponent(url.pathname));
      if (!local.startsWith(root + path.sep)) throw new Error('Invalid path');
      const body = await fs.readFile(local);
      res.writeHead(200, { 'Content-Type': types[path.extname(local)] || 'application/octet-stream' }); res.end(body);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ['camera'], reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && !response.url().includes('/api/')) missingAssets.push(`${response.status()} ${new URL(response.url()).pathname}`); });
    await page.goto(origin + '/apuchika/pages/badge.html');
    await page.locator('#start').click();
    await page.locator('#memberName').fill('테스트');
    await page.locator('#nameForm button').click();
    await page.locator('[data-role="leader"]').click();
    await page.locator('#shoot').click();
    await page.locator('#finalizeBadge').click();
    const pad = page.locator('#signaturePad');
    await pad.scrollIntoViewIfNeeded();
    const box = await pad.boundingBox();
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.4, { steps: 8 });
    await page.mouse.up();
    await page.locator('#openSave').click();
    await page.locator('#qrResult').waitFor({ state: 'visible' });
    assert.ok(created?.url.includes('/apuchika/pages/badge-download.html?id='));
    assert.equal(data.size, 1);
    const output = path.resolve(__dirname, '../output/apuchika-api-qa');
    await fs.mkdir(output, { recursive: true });
    await page.screenshot({ path: path.join(output, 'qr.png') });
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const download = await mobile.newPage();
    download.on('pageerror', error => errors.push(error.message));
    await download.goto(created.url);
    await download.locator('#actions').waitFor({ state: 'visible' });
    assert.equal(await download.locator('#photo').evaluate(image => image.naturalWidth), 2048);
    assert.equal(await download.locator('#photo').evaluate(image => image.naturalHeight), 1129);
    const save = download.waitForEvent('download');
    await download.locator('#save').click();
    assert.equal((await save).suggestedFilename(), '아푸치카-수호대원증.png');
    await download.screenshot({ path: path.join(output, 'mobile-download.png') });
    await page.locator('#revoke').click();
    await page.waitForFunction(() => document.getElementById('qrStatus').textContent.includes('삭제했어요'));
    assert.equal(data.size, 0);
    await download.reload();
    await download.locator('#retry').waitFor({ state: 'visible' });
    assert.match(await download.locator('#status').textContent(), /삭제되었거나/);
    failNextUpload = true;
    await page.locator('#makeQR').click();
    await page.waitForFunction(() => document.getElementById('qrStatus').textContent.includes('연결하지 못했어요'));
    assert.equal(data.size, 0);
    await page.locator('#makeQR').click();
    await page.locator('#qrResult').waitFor({ state: 'visible' });
    assert.equal(data.size, 1);
    await page.locator('#revoke').click();
    await page.waitForFunction(() => document.getElementById('qrStatus').textContent.includes('삭제했어요'));
    assert.equal(data.size, 0);
    assert.deepEqual(errors, []);
    // This existing background reference predates the API change; do not expand
    // this API-only task into replacing the team's artwork or CSS asset paths.
    assert.deepEqual(missingAssets.filter(value => value !== '404 /apuchika/assets/images/background-v71.jpg'), []);
    console.log(JSON.stringify({ passed: true, image: '2048x1129', calls, browserErrors: errors, existingMissingAssets: [...new Set(missingAssets)], screenshots: output }, null, 2));
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
