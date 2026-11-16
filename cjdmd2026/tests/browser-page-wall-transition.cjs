const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output', 'page-wall-transition');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname.startsWith('/__wall/')) {
            const fallback = url.searchParams.has('fallback');
            const destination = url.pathname.endsWith('/a') ? 'b' : 'a';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<!doctype html><html><head>
                ${fallback ? '<script>delete window.onpagereveal; delete window.onpageswap;</script>' : ''}
                <script src="/js/page-wall-transition.js"></script>
                <style>body{margin:0;min-height:100vh;background:${destination === 'b' ? '#c44' : '#48c'};color:white;font:48px sans-serif}nav{padding:40px}a{color:inherit}${fallback ? '@view-transition{navigation:none}' : ''}</style>
                </head><body><nav><a href="/___unused" download>Download</a>
                <a id="next" href="/__wall/${destination}${url.search}">Next page</a></nav></body></html>`);
            return;
        }
        let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
        if (!file.startsWith(root + path.sep)) throw new Error('Outside workspace');
        if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
        res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(await fs.readFile(file));
    } catch { res.writeHead(404); res.end('Not found'); }
});

async function settled(page) {
    await page.waitForFunction(() => !document.documentElement.matches('.page-transition-active, .page-transition-pending, .page-transition-native') && !document.querySelector('.page-transition-layer'));
}

async function inspectTransition(page, label, mode = 'wall-native') {
    await page.waitForFunction(() => document.documentElement.dataset.pageTransitionState === 'running');
    const result = await page.evaluate(() => {
        const animation = document.getAnimations().find(animation =>
            animation.effect?.pseudoElement === '::view-transition-new(root)' ||
            animation.effect?.target?.classList?.contains('page-transition-cover'));
        if (!animation) throw new Error('Missing wall animation');
        animation.pause();
        animation.currentTime = 400;
        window.wallTestAnimation = animation;
        const root = document.documentElement;
        return { mode: root.dataset.pageTransitionMode, direction: root.dataset.pageTransitionDirection,
            icons: document.querySelectorAll('.page-transition-icons').length,
            frames: animation.effect.getKeyframes().map(frame => frame.clipPath),
            oldFilter: getComputedStyle(root, '::view-transition-old(root)').filter };
    });
    assert.equal(result.mode, mode, label);
    assert.equal(result.direction, 'left-to-right');
    assert.equal(result.icons, 0);
    assert.ok(result.frames.every(frame => frame.startsWith('inset(')), 'The edge must remain straight');
    assert.ok(!result.oldFilter.includes('blur'), 'The outgoing page stays sharp');
    await page.screenshot({ path: path.join(output, `${label}.png`) });
    await page.evaluate(() => window.wallTestAnimation.play());
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
        if (!scenarios.size || scenarios.has('fallback')) {
            const fallback = await browser.newPage({ viewport: { width: 390, height: 844 } });
            fallback.setDefaultTimeout(15000);
            await fallback.goto(origin + '/__wall/a?fallback');
            assert.equal(await fallback.evaluate(() => 'onpagereveal' in window), false);
            await fallback.locator('#next').click();
            await inspectTransition(fallback, 'mobile-fallback', 'wall-fallback');
            await fallback.close();
        }
    } finally {
        await browser.close();
        await new Promise(resolve => server.close(resolve));
    }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
