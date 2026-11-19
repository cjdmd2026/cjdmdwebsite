const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

// Browser -> actual Node adapter -> fixture upstream -> actual normalization and
// history storage -> UI. No real credentials or production storage are used.
(async () => {
  const { createEfactApi } = await import('../server/efact-api.mjs');
  const { createEfactHistory } = await import('../server/efact-history.mjs');
  const { fixtureFetch, testNow, testEnv } = await import('./efact-fixtures.mjs');
  const root = path.resolve(__dirname, '../public-dist');
  const output = path.resolve(__dirname, '../output/submit-qa/efact');
  const calls = [], errors = [], missing = [], unexpectedLocal = [];
  let configured = true, browser;
  const options = { fetchImpl: fixtureFetch, now: () => testNow, history: createEfactHistory({ now: () => testNow }) };
  const api = createEfactApi({ ...options, env: testEnv });
  const unavailableApi = createEfactApi({ ...options, env: {}, history: createEfactHistory({ now: () => testNow }) });
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4' };
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      if (url.pathname.startsWith('/e-fact/api/')) {
        const response = await (configured ? api : unavailableApi)(new Request(url));
        calls.push(url.pathname + url.search);
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(Buffer.from(await response.arrayBuffer())); return;
      }
      let local = path.resolve(root, '.' + decodeURIComponent(url.pathname));
      if (!local.startsWith(root + path.sep)) throw Error('Invalid path');
      if ((await fs.stat(local)).isDirectory()) local = path.join(local, 'index.html');
      res.writeHead(200, { 'Content-Type': types[path.extname(local)] || 'application/octet-stream' });
      res.end(await fs.readFile(local));
    } catch { res.writeHead(404); res.end('Not found'); }
  });
  try {
    await fs.mkdir(output, { recursive: true });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (request.url().includes(':8765')) unexpectedLocal.push(request.url()); });
    page.on('response', response => { if (response.status() >= 400) missing.push(`${response.status()} ${new URL(response.url()).pathname}`); });
    for (const entry of ['/e-fact/', '/e-fact/main-atmosphere/index.html']) {
      await page.goto(origin + entry);
      await page.waitForFunction(() => document.querySelector('#status-score').textContent === '42');
      await page.waitForFunction(() => document.querySelector('.history-note').textContent.includes('2개 시간 기록'));
      assert.equal(await page.locator('#efact-local-notice').count(), 0);
      assert.equal(await page.locator('#home-chart circle').count(), 4);
      await page.locator('#home-station').selectOption('봉명동');
      await page.waitForFunction(() => document.querySelector('.history-note').textContent.includes('봉명동'));
      await page.locator('[data-view="stack"]').click();
      await page.waitForFunction(() => document.querySelector('#history-outlet')?.value === '001');
      assert.equal(await page.locator('.mini-values').isVisible(), false);
      assert.match(await page.locator('.live-business').innerText(), /4\.5/);
      await page.locator('#home-station').selectOption('3');
      await page.waitForFunction(() => document.querySelector('#history-outlet')?.value === '002');
      assert.match(await page.locator('.live-business').innerText(), /리뉴에너지충북/);
    }
    await page.locator('#home-status').screenshot({ path: path.join(output, 'dashboard.png') });
    await page.goto(origin + '/e-fact/pages/CheongjuStatus.html');
    await page.waitForFunction(() => document.querySelector('#recovery .recovery-card'));
    assert.match(await page.locator('#recovery').innerText(), /78\.5/);
    assert.match(await page.locator('#detail').innerText(), /4\.5/);
    await page.locator('#air-station-select').selectOption('봉명동');
    assert.match(await page.locator('#airkorea-live').innerText(), /12/);
    await page.locator('#facilities [data-id="3"]').click();
    assert.match(await page.locator('#detail').innerText(), /리뉴에너지충북/);
    await page.locator('#recovery').screenshot({ path: path.join(output, 'recovery.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin + '/e-fact/');
    await page.waitForFunction(() => document.querySelector('#status-score').textContent === '42');
    await page.locator('#home-status').screenshot({ path: path.join(output, 'mobile.png') });
    configured = false;
    await page.goto(origin + '/e-fact/');
    await page.waitForFunction(() => document.querySelector('.history-note').textContent.includes('이력을 불러오지 못했습니다'));
    assert.equal(await page.locator('#status-score').textContent(), '—');
    await page.goto(origin + '/e-fact/pages/CheongjuStatus.html');
    await page.locator('#recovery button').waitFor();
    assert.match(await page.locator('#detail').innerText(), /측정 자료를 기다리고/);
    assert.deepEqual(errors, []);
    assert.deepEqual(unexpectedLocal, []);
    assert.deepEqual(missing.filter(item => !item.endsWith('/favicon.ico')), []);
    for (const resource of ['air', 'tms', 'air-history', 'tms-history', 'incinerators']) assert(calls.some(call => call.split('?')[0] === `/e-fact/api/${resource}`), resource);
    console.log(JSON.stringify({ passed: true, pages: 3, viewports: 2, uniqueCalls: [...new Set(calls)], browserErrors: errors, screenshots: output }, null, 2));
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
