const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const phase = process.argv[2] || 'after';
  const reports = [];
  try {
    for (const [width, height] of [[1440, 900], [1920, 1080], [1024, 768]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => {
        let seed = 524;
        Math.random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
      });
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'designer.test') return route.fulfill({ body: '' });
        try {
          let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
          if (!file.startsWith(root + path.sep)) throw new Error('Outside workspace');
          if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
          if (file.endsWith('designer-icon-slide.js')) {
            const source = (await fs.readFile(file, 'utf8')).replace('galleryAnchors: spreadSlots.map', 'ambientDebug: ambientParticles.map(item => ({ ...item.target, shape: item.piece.ambientShape })), galleryAnchors: spreadSlots.map');
            return route.fulfill({ contentType: 'application/javascript', body: source });
          }
          await route.fulfill({ path: file });
        } catch { await route.fulfill({ status: 404, body: '' }); }
      });
      await page.goto('http://designer.test/designer/');
      await page.waitForFunction(() => window.GyeolhapIcons?.snapshot().ready);
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForFunction(() => window.GyeolhapIcons.snapshot().spread > .99);
      await page.mouse.move(5, 5);
      const report = await page.evaluate(() => {
        const s = window.GyeolhapIcons.snapshot();
        const box = document.getElementById('stage').getBoundingClientRect();
        const title = document.querySelector('.designer-heading__top').getBoundingClientRect();
        return { viewport: [innerWidth, innerHeight], stage: { x: box.x, y: box.y, width: box.width, height: box.height }, title: {x: title.x, y: title.y, width: title.width, height: title.height}, teams: s.galleryAnchors, ambient: s.ambientDebug, visibleLabels: [...document.querySelectorAll('.icon-team-name')].filter(n => !n.closest('button').hidden).length };
      });
      report.errors = errors;
      reports.push(report);
      await page.screenshot({ path: path.join(root, `output/designer-perimeter-${phase}-${width}.png`) });
      console.log(JSON.stringify(report));
      await page.close();
    }
    await fs.writeFile(path.join(root, `output/designer-perimeter-${phase}.json`), JSON.stringify(reports, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
