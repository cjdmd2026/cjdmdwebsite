const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output', 'page-rolling-mask');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname.startsWith('/__rolling/')) {
            const fallback = url.searchParams.has('fallback');
            const destination = url.pathname.endsWith('/a') ? 'b' : 'a';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<!doctype html><html><head>
                ${fallback ? '<script>delete window.onpagereveal; delete window.onpageswap;</script>' : ''}
                <script src="/js/page-rolling-transition.js"></script>
                <style>body{margin:0;min-height:100vh;background:${destination === 'b' ? '#c44' : '#48c'};color:white;font:48px sans-serif}nav{padding:40px}a{color:inherit}${fallback ? '@view-transition{navigation:none}' : ''}</style>
                </head><body><nav><a href="/___unused" download>Download</a>
                <a id="next" href="/__rolling/${destination}${url.search}">Next page</a></nav></body></html>`);
            return;
        }
        let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
        if (!file.startsWith(root + path.sep)) throw new Error('Outside workspace');
        if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
        res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        const content = await fs.readFile(file);
        // Keep the saved mask variant testable while the site uses the plain wall.
        res.end(path.extname(file) === '.html'
            ? content.toString('utf8').replaceAll('js/page-wall-transition.js', 'js/page-rolling-transition.js')
            : content);
    } catch { res.writeHead(404); res.end('Not found'); }
});

async function settled(page) {
    await page.waitForFunction(() => !document.documentElement.matches('.page-transition-active, .page-transition-pending, .page-transition-native') && !document.querySelector('.page-transition-layer'));
}

async function inspectTransition(page, label, mode = 'rolling-mask-native', pixelCheck = false) {
    await page.waitForFunction(() => document.documentElement.dataset.pageTransitionState === 'running');
    const result = await page.evaluate(async () => {
        const animations = document.getAnimations().filter(animation =>
            animation.effect?.target?.matches?.('.page-transition-layer'));
        if (animations.length !== 1) throw new Error('Missing mask timeline: ' + JSON.stringify({
            state: document.documentElement.dataset.pageTransitionState,
            mode: document.documentElement.dataset.pageTransitionMode,
            layers: document.querySelectorAll('.page-transition-layer').length,
            animations: document.getAnimations().map(animation => ({target: animation.effect?.target?.className, state: animation.playState}))
        }));
        animations.forEach(animation => { animation.pause(); animation.currentTime = 650; });
        window.rollingTestAnimations = animations;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const root = document.documentElement;
        const mask = root.classList.contains('page-transition-native')
            ? getComputedStyle(root, '::view-transition-new(root)')
            : getComputedStyle(document.querySelector('.page-transition-cover'));
        return { mode: root.dataset.pageTransitionMode, direction: root.dataset.pageTransitionDirection,
            icons: document.querySelectorAll('.page-transition-roller svg').length,
            icon: root.dataset.pageTransitionIcon, count: Number(root.dataset.pageTransitionIconCount),
            maskImage: mask.maskImage, clipPath: mask.clipPath,
            tip: document.querySelector('.page-transition-mask-tip').getAttribute('transform'),
            silhouettes: document.querySelectorAll('.page-transition-mask-tip').length,
            oldFilter: getComputedStyle(root, '::view-transition-old(root)').filter };
    });
    assert.equal(result.mode, mode, label);
    assert.equal(result.direction, 'left-to-right');
    assert.equal(result.icons, 0, 'No separately painted icon may cover the page');
    assert.equal(result.count, 33);
    assert.ok(result.icon);
    assert.notEqual(result.icon, page.lastRollingIcon, 'Consecutive transitions choose different icons');
    page.lastRollingIcon = result.icon;
    assert.match(result.maskImage, /#page-rolling-mask-\d+-(reveal|cover)/);
    assert.equal(result.clipPath, 'none', 'There must be no independent straight wipe');
    assert.match(result.tip, /translate\([\d.]+ [\d.]+\) rotate\([\d.]+\) scale/);
    assert.equal(result.silhouettes, 1, 'The moving opening is exactly one original icon silhouette');
    assert.ok(!result.oldFilter.includes('blur'), 'The outgoing page stays sharp');
    const screenshot = await page.screenshot({ path: path.join(output, `${label}.png`) });
    if (pixelCheck) {
        const pixels = await page.evaluate(async ({base64, fallback}) => {
            const defs = document.querySelector('.page-transition-mask-defs defs');
            const revealId = defs.querySelector('mask[id$="-reveal"]').id;
            const source = `<svg xmlns="http://www.w3.org/2000/svg" width="${innerWidth}" height="${innerHeight}"><defs>${defs.innerHTML}</defs><rect width="100%" height="100%" fill="white" mask="url(#${revealId})"/></svg>`;
            const readImage = async src => {
                const image = new Image(); image.src = src; await image.decode();
                const canvas = document.createElement('canvas'); canvas.width = innerWidth; canvas.height = innerHeight;
                const ctx = canvas.getContext('2d'); ctx.drawImage(image, 0, 0);
                return ctx.getImageData(0, 0, innerWidth, innerHeight).data;
            };
            const [expected, actual] = await Promise.all([
                readImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)),
                readImage('data:image/png;base64,' + base64)
            ]);
            const counts = {revealed: 0, covered: 0, mismatched: 0};
            for (let y = 210; y < innerHeight - 10; y += 13) for (let x = 10; x < innerWidth - 10; x += 13) {
                const offset = (y * innerWidth + x) * 4, alpha = expected[offset + 3];
                if (alpha > 5 && alpha < 250) continue;
                const revealed = alpha >= 250;
                const color = revealed ? [68, 136, 204] : fallback ? [255, 255, 255] : [204, 68, 68];
                counts[revealed ? 'revealed' : 'covered']++;
                if (color.some((value, channel) => Math.abs(actual[offset + channel] - value) > 5)) counts.mismatched++;
            }
            return counts;
        }, {base64: screenshot.toString('base64'), fallback: mode.endsWith('fallback')});
        assert.ok(pixels.revealed > 20 && pixels.covered > 20, 'Both pages must be present inside/outside the rolling silhouette');
        assert.equal(pixels.mismatched, 0, 'Screen pixels must match the real icon mask, not a colored overlay or straight wipe');
        result.pixels = pixels;
    }
    await page.evaluate(() => window.rollingTestAnimations.forEach(animation => animation.play()));
    await settled(page);
    console.log(label, JSON.stringify(result));
}

async function follow(page, href, mobile) {
    if (mobile) {
        await page.locator('.menu-button').click();
        await page.locator(`.mobile-menu a[href="${href}"]`).click();
    } else await page.locator(`.header .nav a[href="${href}"]`).click();
}

(async () => {
    await fs.mkdir(output, { recursive: true });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    console.log(`Local: ${origin}/archive/`);
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', ignoreDefaultArgs: ['--disable-back-forward-cache'] });
    try {
        const scenarios = new Set(process.argv.slice(2));
        for (const mobile of [false, true]) {
            const name = mobile ? 'mobile' : 'desktop';
            if (scenarios.size && !scenarios.has(name)) continue;
            const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 } });
            page.setDefaultTimeout(15000);
            const errors = [], iconRequests = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('request', request => { if (/page-transition-atlas|\/js\/page-transition\.js/.test(request.url())) iconRequests.push(request.url()); });
            await page.goto(origin + '/archive/', { waitUntil: 'domcontentloaded' });
            await settled(page);
            for (const route of ['designer', 'project', 'archive']) {
                await follow(page, `../${route}/`, mobile);
                await inspectTransition(page, `${name}-${route}`);
            }
            await page.locator('.header .logo a').click();
            await inspectTransition(page, `${name}-logo`);
            assert.equal(new URL(page.url()).pathname, '/index.html');
            await page.evaluate(() => window.PageTransition.back(1));
            await page.waitForURL('**/archive/', { waitUntil: 'commit' });
            await inspectTransition(page, `${name}-back`);
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await follow(page, '../designer/', mobile);
            await page.waitForURL('**/designer/', { waitUntil: 'commit' });
            await settled(page);
            assert.equal(await page.locator('.page-transition-layer').count(), 0);
            assert.deepEqual(iconRequests, [], 'Navigation must not download the preserved icon transition');
            assert.deepEqual(errors, [], `${name}: no uncaught browser errors`);
            console.log(`${name}: navigation, logo, history return and reduced motion passed`);
            await page.close();
        }
        for (const native of [true, false]) {
            if (scenarios.size && !scenarios.has(native ? 'mask' : 'fallback')) continue;
            const fallback = await browser.newPage({ viewport: { width: 390, height: 844 } });
            fallback.setDefaultTimeout(15000);
            await fallback.goto(origin + '/__rolling/a' + (native ? '' : '?fallback'));
            if (!native) assert.equal(await fallback.evaluate(() => 'onpagereveal' in window), false);
            await fallback.locator('#next').click();
            await inspectTransition(fallback, native ? 'mask-fixture' : 'mobile-fallback',
                native ? 'rolling-mask-native' : 'rolling-mask-fallback', true);
            await fallback.close();
        }
    } finally {
        await browser.close();
        await new Promise(resolve => server.close(resolve));
    }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
