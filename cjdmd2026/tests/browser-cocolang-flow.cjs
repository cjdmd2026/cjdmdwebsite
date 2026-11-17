const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..', process.env.COCOLANG_TEST_BUILD ? 'public-dist' : '.');
const output = path.resolve(__dirname, '../output/coco-lang-audit');
const origin = 'http://cocolang.test';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm' };

// Windows normally accepts the wrong case; production hosting does not.
async function exactFile(urlPath) {
  let current = root;
  for (const segment of decodeURIComponent(urlPath).split('/').filter(Boolean)) {
    assert(!['.', '..'].includes(segment));
    assert((await fs.readdir(current)).includes(segment), `Missing or incorrectly cased path: ${urlPath}`);
    current = path.join(current, segment);
  }
  if ((await fs.stat(current)).isDirectory()) current = path.join(current, 'index.html');
  return current;
}

(async () => {
  await fs.mkdir(output, { recursive: true });
  let testLinks = 0;
  for (const name of await fs.readdir(path.join(root, 'coco-lang'))) {
    if (!name.endsWith('.html')) continue;
    const html = await fs.readFile(path.join(root, 'coco-lang', name), 'utf8');
    for (const match of html.matchAll(/href="([^"]*test-index\.html)"/g)) {
      await exactFile(new URL(match[1], `${origin}/coco-lang/${name}`).pathname);
      testLinks++;
    }
  }
  assert(testLinks >= 7, 'The existing test entry links must be preserved');
  await exactFile('/coco-lang/img/shop-side-banner1.webp');
  assert((await fs.readFile(path.join(root, 'coco-lang/community.html'), 'utf8')).includes("'index.html#app-download'"));
  assert((await fs.readFile(path.join(root, 'coco-lang/index.html'), 'utf8')).includes('id="app-download"'));

  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const missingAssets = new Set();
  const flows = [];
  try {
    for (const status of ['yes', 'no']) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
      page.setDefaultTimeout(15000);
      const errors = [], dialogs = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.dismiss(); });
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        // The test covers the local selection/result flow, not fonts or the camera QR SDK.
        if (url.origin !== origin) return route.fulfill({ status: 200, contentType: route.request().resourceType() === 'script' ? 'text/javascript' : 'text/css', body: '' });
        try {
          const file = await exactFile(url.pathname);
          await route.fulfill({ contentType: mime[path.extname(file)] || 'application/octet-stream', body: await fs.readFile(file) });
        } catch {
          missingAssets.add(url.pathname);
          await route.fulfill({ status: 404, body: 'Not found' });
        }
      });
      await page.goto(`${origin}/coco-lang/TEST/test-index.html`);
      await page.locator('#startButton').click();
      await page.waitForURL('**/pet-status.html');
      await page.locator(`[data-value="${status}"]`).click();
      await page.locator('#petStatusNext').click();
      await page.waitForURL(`**/${status === 'yes' ? 'dog' : 'guest'}-info.html`);
      await page.locator(status === 'yes' ? '#dogName' : '#guestDogName').fill('코코');
      await page.locator(status === 'yes' ? '#dogAge' : '#guestDogAge').fill('2');
      await page.locator('[data-gender="male"]').click();
      if (status === 'yes') await page.locator('#dogWeight').fill('4');
      await page.locator(status === 'yes' ? '#dogInfoNext' : '#guestInfoNext').click();
      await page.waitForURL('**/select.html');
      assert(await page.locator('#breedSelectButton').isDisabled());
      assert.equal(await page.locator('.breed-card').count(), 5);
      await page.evaluate(() => {
        localStorage.setItem('originalResultType', 'stale');
        localStorage.setItem('detailViewType', 'stale');
      });
      const breed = status === 'yes' ? 'welly' : 'cori';
      await page.locator(`[data-breed="${breed}"]`).click();
      assert.equal(await page.locator(`[data-breed="${breed}"]`).getAttribute('aria-pressed'), 'true');
      await page.locator('.breed-card img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
      await page.screenshot({ path: path.join(output, `select-${status}.png`) });
      await page.locator('#breedSelectButton').click();
      await page.waitForURL('**/question.html');
      assert.equal(await page.evaluate(() => localStorage.getItem('selectedBreed')), breed);
      assert.equal(await page.evaluate(() => localStorage.getItem('originalResultType')), null);
      for (let index = 1; index <= 12; index++) {
        await page.waitForFunction(n => document.querySelector('#currentQuestionNumber').textContent.trim() === String(n).padStart(2, '0') || Number(document.querySelector('#currentQuestionNumber').textContent) === n, index);
        await page.locator(`.answer-card[data-answer-index="${status === 'yes' ? 0 : 1}"]`).click();
      }
      await page.waitForURL('**/result.html');
      const resultType = await page.locator('#resultTypeName').innerText();
      assert(resultType.trim());
      await page.locator('#resultMainImage').evaluate(img => img.decode());
      await page.locator('#detailButton').click();
      await page.waitForURL('**/result-detail.html');
      assert.equal((await page.locator('#detailTypeName').innerText()).trim(), resultType.trim());
      await page.locator('#detailMainImage').evaluate(img => img.decode());
      await page.locator('#otherTypeButton').click();
      await page.waitForURL('**/types.html');
      assert.equal(await page.locator('#typesGrid > *').count(), 9);
      await page.locator('#typesGrid img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
      await page.locator('#backResultButton').click();
      await page.waitForURL('**/result.html');
      assert.equal((await page.locator('#resultTypeName').innerText()).trim(), resultType.trim());
      assert.deepEqual(errors, []);
      assert.deepEqual(dialogs, []);
      flows.push({ petStatus: status, breed, resultType: resultType.trim(), questions: 12, detailAndAllTypes: 'passed' });

      if (status === 'yes') {
        await page.evaluate(() => localStorage.clear());
        for (const entry of ['question', 'result', 'result-detail', 'types']) {
          await page.goto(`${origin}/coco-lang/TEST/${entry}.html`);
          await page.waitForURL('**/select.html');
          assert(await page.locator('#breedSelectButton').isDisabled());
        }
        assert.equal(dialogs.length, 4, 'Missing session data should offer a working selection page');
        assert.deepEqual(errors, []);
      }

      if (status === 'no') {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`${origin}/coco-lang/TEST/select.html`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        await page.getByRole('button', { name: '푸들', exact: true }).click();
        await page.locator('#breedSelectButton').scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: path.join(output, 'select-mobile.png'), fullPage: true });
        await page.locator('#breedSelectButton').click();
        await page.waitForURL('**/question.html');
        assert.equal(await page.evaluate(() => localStorage.getItem('selectedBreed')), 'puri');
      }
      await page.close();
    }
    const expectedMissing = new Set(['/coco-lang/TEST/img/dog-frame.webp', ...['bgm-start', 'bgm-question', 'bgm-result', 'click'].map(name => `/coco-lang/TEST/audio/${name}.mp3`)]);
    assert.deepEqual([...missingAssets].filter(file => !expectedMissing.has(file)), [], 'No missing pages or unexpected assets');
    const report = { testLinks, flows, mobileSelection: 'passed', emptySessionRedirects: 4, missingFromOriginal: [...missingAssets], externalFontsAndCameraSdk: 'not covered' };
    await fs.writeFile(path.join(output, 'flow-verification.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
