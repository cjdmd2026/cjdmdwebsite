const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output', 'committee-icon-transition');

async function localPage(browser, viewport) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'committee.test') return route.fulfill({ contentType: 'text/javascript', body: '' });
        if (url.pathname === '/main-icon-test') return route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Committee transition test</title>' });
        try {
            let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
            if (!file.startsWith(root + path.sep)) throw new Error('Unsafe path');
            if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
            return route.fulfill({ path: file });
        } catch { return route.fulfill({ status: 404, body: '' }); }
    });
    return { page, errors };
}

async function checkMain(browser, name, viewport) {
    const { page, errors } = await localPage(browser, viewport);
    try {
        await page.goto('http://committee.test/main/');
        await page.waitForFunction(() => window.heroStudio?.ready && window.MainIntroLoading?.inspect().phase === 'done', null, { timeout: 90000 });
        await page.evaluate(() => {
            const section = document.getElementById('committee');
            scrollTo({ top: scrollY + section.getBoundingClientRect().top + parseFloat(getComputedStyle(section).paddingTop) - 110, behavior: 'instant' });
        });
        const tabs = page.locator('.committee-tab');
        const overlay = page.locator('.committee-icon-transition');
        await tabs.nth(1).click();
        await page.waitForFunction(() => !document.querySelector('.committee-icon-transition').hidden);
        await page.waitForTimeout(850);
        await page.screenshot({ path: path.join(output, `${name}-mid-transition.png`) });
        assert.equal(await overlay.isVisible(), true, 'The matrix remains visible through the middle of the transition');
        assert.equal(await page.locator('#committeeTrack').evaluate(node => getComputedStyle(node).transform), 'matrix(1, 0, 0, 1, 0, 0)', 'The photos no longer translate sideways');
        await page.waitForFunction(() => document.querySelector('.committee-icon-transition').hidden);
        assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true');
        assert.deepEqual(await page.locator('.committee-slide').evaluateAll(slides => slides.flatMap((slide, i) => getComputedStyle(slide).visibility === 'visible' ? [i] : [])), [1]);

        await tabs.nth(2).click();
        await page.waitForFunction(() => !document.querySelector('.committee-icon-transition').hidden);
        await page.waitForTimeout(600);
        await tabs.nth(4).click();
        await page.waitForTimeout(80);
        await tabs.nth(3).click();
        await page.waitForFunction(() => document.querySelector('.committee-icon-transition').hidden);
        assert.deepEqual(await page.locator('.committee-slide').evaluateAll(slides => slides.flatMap((slide, i) => getComputedStyle(slide).visibility === 'visible' ? [i] : [])), [3], 'Rapid tab changes end on the latest department');

        // Keyboard and reduced-motion behavior still select and label the same department.
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await tabs.nth(3).focus();
        await page.keyboard.press('ArrowRight');
        assert.equal(await tabs.nth(4).getAttribute('aria-selected'), 'true');
        assert.equal(await overlay.isVisible(), false);
        assert.equal(await page.locator('#committeeSlider').getAttribute('aria-labelledby'), await tabs.nth(4).getAttribute('id'));
        await page.screenshot({ path: path.join(output, `${name}-settled.png`) });
        if (name === 'desktop') {
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            await page.mouse.move(10, 10);
            await page.waitForFunction(() => document.querySelectorAll('.committee-tab')[5].getAttribute('aria-selected') === 'true');
            await page.waitForFunction(() => !document.querySelector('.committee-icon-transition').hidden);
            await page.waitForFunction(() => document.querySelector('.committee-icon-transition').hidden);
            assert.deepEqual(await page.locator('.committee-slide').evaluateAll(slides => slides.flatMap((slide, i) => getComputedStyle(slide).visibility === 'visible' ? [i] : [])), [5], 'Autoplay uses the same transition');
        }
        assert.deepEqual(errors, []);
        console.log(`${name}: real main page, diagonal matrix, rapid tabs, keyboard and reduced motion passed`);
    } finally { await page.close(); }
}

async function checkDirectionAndFallback(browser) {
    const { page, errors } = await localPage(browser, { width: 900, height: 700 });
    try {
        await page.goto('http://committee.test/main-icon-test');
        await page.setContent('<style>#photo{position:relative;width:600px;height:400px}canvas{position:absolute;inset:0;width:100%;height:100%}canvas[hidden]{display:none}</style><div id="photo"></div>');
        await page.addScriptTag({ path: path.join(root, 'js/main-icon-fragments.js') });
        await page.addScriptTag({ path: path.join(root, 'js/committee-icon-transition.js') });
        const result = await page.evaluate(async () => {
            const makeImage = async color => {
                const source = document.createElement('canvas'); source.width = 600; source.height = 400;
                const ctx = source.getContext('2d'); ctx.fillStyle = color; ctx.fillRect(0, 0, 600, 400);
                const image = new Image(); image.src = source.toDataURL(); await image.decode(); return image;
            };
            const from = await makeImage('#ff0000'), to = await makeImage('#0000ff');
            const effect = CommitteeIconTransition.create({ container: document.getElementById('photo'), fragments: MAIN_ICON_FRAGMENTS });
            let committed = 0;
            await effect.transition(from, to, () => committed++);
            const canvas = document.querySelector('#photo canvas'), gl = canvas.getContext('webgl');
            const started = performance.now();
            await new Promise(resolve => {
                function tick() { if (performance.now()-started >= 950) resolve(); else requestAnimationFrame(tick); }
                requestAnimationFrame(tick);
            });
            const pixel = (x, y) => { const value = new Uint8Array(4); gl.readPixels(Math.round(canvas.width*x), Math.round(canvas.height*y), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, value); return [...value]; };
            const sample = { topRight: pixel(.9, .9), bottomLeft: pixel(.1, .1), glError: gl.getError(), committed };
            await new Promise(resolve => setTimeout(resolve, 1300));
            sample.finished = canvas.hidden;
            const nativeContext = HTMLCanvasElement.prototype.getContext;
            HTMLCanvasElement.prototype.getContext = function(type, ...args) { return type === 'webgl' ? null : nativeContext.call(this, type, ...args); };
            const fallbackContainer = document.createElement('div'); document.body.append(fallbackContainer);
            const fallback = CommitteeIconTransition.create({ container: fallbackContainer, fragments: MAIN_ICON_FRAGMENTS });
            await fallback.transition(from, to, () => committed++);
            sample.fallbackCommitted = committed === 2 && fallbackContainer.querySelector('canvas').hidden;
            HTMLCanvasElement.prototype.getContext = nativeContext;
            return sample;
        });
        assert.ok(result.topRight[2] > 200 && result.topRight[0] < 40, 'The incoming photo appears first at the top-right');
        assert.ok(result.bottomLeft[0] > 200 && result.bottomLeft[2] < 40, 'The outgoing photo remains at the bottom-left');
        assert.equal(result.glError, 0);
        assert.equal(result.committed, 1);
        assert.equal(result.finished, true);
        assert.equal(result.fallbackCommitted, true);
        assert.deepEqual(errors, []);
        console.log('Direction and WebGL fallback:', result);
    } finally { await page.close(); }
}

(async () => {
    await fs.mkdir(output, { recursive: true });
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    try {
        const scenarios = new Set(process.argv.slice(2));
        if (!scenarios.size || scenarios.has('direction')) await checkDirectionAndFallback(browser);
        if (!scenarios.size || scenarios.has('desktop')) await checkMain(browser, 'desktop', { width: 1440, height: 900 });
        if (!scenarios.size || scenarios.has('mobile')) await checkMain(browser, 'mobile', { width: 390, height: 844 });
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
