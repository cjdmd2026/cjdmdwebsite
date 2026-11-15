const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..', process.env.DETAIL_TEST_BUILD ? 'public-dist' : '.');
const projects = (process.env.DETAIL_TEST_PROJECTS || 'cheoma,curo,dadeullim,efact,ilkko,omix,phishing-ddook,stylens').split(',');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2' };

(async () => {
    const output = process.env.DETAIL_TEST_OUTPUT || await fs.mkdtemp(path.join(os.tmpdir(), 'project-detail-art-'));
    await fs.mkdir(output, { recursive: true });
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const results = [];
    try {
        for (const project of projects) {
            for (const width of [390, 1440]) {
                const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
                page.setDefaultTimeout(15000);
                const errors = [], requests = [];
                page.on('pageerror', error => errors.push(error.message));
                await page.route('**/*', async route => {
                    const url = new URL(route.request().url());
                    if (url.hostname !== 'details.test') return route.abort();
                    try {
                        let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
                        assert(file.startsWith(root + path.sep));
                        if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
                        requests.push(url.pathname);
                        await route.fulfill({ contentType: types[path.extname(file)] || 'application/octet-stream', body: await fs.readFile(file) });
                    } catch (error) {
                        errors.push(url.pathname + ': ' + error.message);
                        await route.fulfill({ status: 404, body: 'Not found' });
                    }
                });
                await page.goto(`http://details.test/project/${project}/`);
                const mode = width < 1000 ? 'mobile' : 'pc';
                // Exercise all artwork decoders, including images beyond the lazy-loading threshold.
                await page.locator(`.case-art.case-${mode} .case-raster-tile img`).evaluateAll(async images => {
                    for (const image of images) image.loading = 'eager';
                    await Promise.all(images.map(image => image.decode()));
                });
                const geometry = await page.evaluate(mode => {
                    const art = document.querySelector(`.case-art.case-${mode}`);
                    const images = [...art.querySelectorAll('.case-raster-tile img')];
                    const tiles = images.map(img => {
                        const rect = img.getBoundingClientRect();
                        return { width: img.naturalWidth, height: img.naturalHeight, declaredWidth: +img.getAttribute('width'), declaredHeight: +img.getAttribute('height'), x: rect.x, top: rect.top, bottom: rect.bottom, ratioError: Math.abs(rect.width / rect.height - img.naturalWidth / img.naturalHeight) };
                    });
                    return { sourceWidth: +art.dataset.sourceWidth, sourceHeight: +art.dataset.sourceHeight, width: art.getBoundingClientRect().width, height: art.getBoundingClientRect().height, overflow: document.documentElement.scrollWidth - innerWidth, tiles, textCount: art.querySelectorAll('.case-raster-text text').length, fills: [...art.querySelectorAll('.case-raster-text text')].map(t => getComputedStyle(t).fill), sections: art.querySelectorAll('.case-section').length };
                }, mode);
                assert.equal(geometry.overflow, 0, project + ' has horizontal overflow');
                assert.equal(geometry.sections, 9);
                assert(geometry.textCount > 20, project + ' retains selectable text');
                assert(geometry.fills.every(fill => fill === 'rgba(0, 0, 0, 0)'), project + ' has duplicate visible text');
                assert.equal(geometry.tiles.reduce((sum, t) => sum + t.height, 0), geometry.sourceHeight);
                assert(Math.abs(geometry.height - geometry.width * geometry.sourceHeight / geometry.sourceWidth) < 1, project + ' full source ratio');
                geometry.tiles.forEach((t, i) => {
                    assert.equal(t.width, geometry.sourceWidth);
                    assert.equal(t.width, t.declaredWidth);
                    assert.equal(t.height, t.declaredHeight);
                    assert(t.ratioError < 0.001, project + ' distorted tile');
                    assert.equal(t.x, 0);
                    if (i) assert(Math.abs(t.top - geometry.tiles[i - 1].bottom) < 0.1, project + ' seam or overlap');
                });
                const otherMode = mode === 'pc' ? 'mobile' : 'pc';
                assert(!requests.some(url => url.includes(`/details/${project}/${otherMode}-`)), project + ' downloads hidden artwork');
                await page.screenshot({ path: path.join(output, `${project}-${mode}-top.png`), scale: 'css' });
                for (const section of [1, 4, 8]) {
                    console.log(`${project} ${mode}: checking section ${section}`);
                    await page.locator(`.case-menu .case-${mode} a[href="#${mode}-${section}"]`).click();
                    await page.waitForFunction(({ mode, section }) => {
                        const target = document.getElementById(`${mode}-${section}`).getBoundingClientRect();
                        const bar = document.querySelector('.case-menu').getBoundingClientRect();
                        return Math.abs(target.top - bar.bottom) < 2;
                    }, { mode, section });
                    if (section === 4) await page.screenshot({ path: path.join(output, `${project}-${mode}-middle.png`), scale: 'css' });
                }
                if (width === 390) {
                    await page.evaluate(() => scrollTo(0, 0));
                    await page.getByRole('button', { name: '메뉴 열기' }).click();
                    await page.waitForFunction(() => document.querySelector('.menu-button').getAttribute('aria-expanded') === 'true');
                }
                assert.equal(await page.locator('.case-qr[href^="https://dmd2026.com/"]').count(), 1);
                assert.deepEqual(errors, []);
                results.push({ project, mode, tiles: geometry.tiles.length, width: geometry.sourceWidth, height: geometry.sourceHeight });
                // Resize the loaded page across both sides of the artwork breakpoint.
                for (const testWidth of width === 390 ? [320, 430, 768, 999] : [1000, 1920, 2560]) {
                    await page.setViewportSize({ width: testWidth, height: 900 });
                    assert(await page.evaluate(mode => {
                        const art = document.querySelector(`.case-art.case-${mode}`);
                        const rect = art.getBoundingClientRect();
                        return document.documentElement.scrollWidth === innerWidth && Math.abs(rect.height - rect.width * +art.dataset.sourceHeight / +art.dataset.sourceWidth) < 1;
                    }, mode), `${project} geometry at ${testWidth}`);
                }
                await page.close();
                console.log(`${project} ${mode}: native pixels, proportions, links and responsive geometry passed`);
            }
        }
        await fs.writeFile(path.join(output, 'browser-results.json'), JSON.stringify(results, null, 2));
        console.log('Screenshots: ' + output);
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
