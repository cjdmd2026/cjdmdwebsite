const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const widths = process.argv.slice(2).map(Number);

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try {
    for (const width of widths.length ? widths : [1024, 1440, 1920]) {
      const page = await browser.newPage({viewport:{width,height:900}, reducedMotion:'reduce'});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'designer.test') return route.fulfill({body:''});
        try {
          let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
          if (!file.startsWith(root + path.sep)) throw Error('Outside workspace');
          if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
          await route.fulfill({path:file});
        } catch { await route.fulfill({status:404,body:''}); }
      });
      await page.goto('http://designer.test/designer/');
      await page.waitForFunction(() => window.GyeolhapIcons?.snapshot().ready);
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForFunction(() => window.GyeolhapIcons.snapshot().spread > .99);
      await page.evaluate(() => {
        window.readViewUI = () => {
          const box = selector => {
            const element = document.querySelector(selector), r = element.getBoundingClientRect();
            return {x:r.x,y:r.y,width:r.width,height:r.height};
          };
          return {title:box('.designer-heading__title--slide'), heading:box('.designer-heading__top'),
            search:box('.search-bar'), button:box('.view-button'), stage:box('#stage'),
            offset:document.querySelector('.designer-heading').style.getPropertyValue('--gallery-heading-offset'),
            scrollY, spread:window.GyeolhapIcons.snapshot().spread,
            view:document.querySelector('.designer-page').classList.contains('slide-view') ? 'slide' : 'grid'};
        };
      });
      const original = await page.evaluate(() => readViewUI());
      await page.emulateMedia({reducedMotion:'no-preference'});
      const rounds = [];
      for (let round = 0; round < 2; round++) {
        await page.locator('.view-button').click();
        await page.waitForFunction(() => document.querySelector('.grid-view') && !document.querySelector('.is-view-transitioning'));
        await page.evaluate(() => {
          window.viewFrames = []; window.captureView = true;
          function frame() { viewFrames.push(readViewUI()); if (captureView) requestAnimationFrame(frame); }
          requestAnimationFrame(frame);
        });
        await page.locator('.view-button').click();
        await page.waitForFunction(() => document.querySelector('.slide-view') && !document.querySelector('.is-view-transitioning'));
        await page.waitForTimeout(150);
        const result = await page.evaluate(() => { captureView = false; return {final:readViewUI(),frames:viewFrames}; });
        rounds.push(result);
      }
      for (const round of rounds) {
        for (const key of ['title','heading','search','button','stage']) {
          for (const prop of ['x','y','width','height']) assert(Math.abs(original[key][prop] - round.final[key][prop]) < 1, `${width}px ${key}.${prop} shifted`);
        }
        // The title and search must stay anchored even while the incoming content scales.
        for (const frame of round.frames.filter(frame => frame.view === 'slide')) {
          for (const key of ['title','search']) for (const prop of ['x','y']) {
            assert(Math.abs(original[key][prop] - frame[key][prop]) < 1, `${width}px ${key}.${prop} jumped during transition`);
          }
        }
      }
      assert.deepEqual(errors, []);
      console.log(`${width}px: two grid/slide round trips preserve title, controls and stage positions; no mid-transition jumps.`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => {console.error(error); process.exitCode = 1;});
