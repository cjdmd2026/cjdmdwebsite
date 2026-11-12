const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };

async function openArchive(browser, width, reducedMotion = 'no-preference', height = 900) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        // Exercise the native scroll fallback without depending on external CDNs.
        if (url.hostname !== 'archive.test') return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
        try {
            let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
            if (!file.startsWith(root + path.sep)) throw new Error('Unsafe test path');
            if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
            await route.fulfill({ status: 200, contentType: types[path.extname(file)] || 'application/octet-stream', body: await fs.readFile(file) });
        } catch {
            await route.fulfill({ status: 404, body: 'Not found' });
        }
    });
    await page.goto('http://archive.test/archive/', { waitUntil: 'load' });
    await page.waitForFunction(expected => document.documentElement.dataset.desktopFeatures === expected, width >= 760 ? 'ready' : 'idle');
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
    return { page, errors };
}

async function sampleScroll(page, history) {
    return page.evaluate(async history => {
        const explanation = document.querySelector('.explanation');
        const title = explanation.querySelector('.history-title-mask');
        const description = explanation.querySelector('p');
        const read = () => ({
            history: explanation.classList.contains('is-history-section'),
            titleX: title.getBoundingClientRect().left,
            descriptionX: description.getBoundingClientRect().left,
            activeAnimations: explanation.getAnimations({ subtree: true }).length
        });
        const before = read();
        scrollTo({ top: history ? innerHeight : 0, behavior: 'instant' });
        const samples = [];
        const start = performance.now();
        while (performance.now() - start < 2700) {
            await new Promise(requestAnimationFrame);
            samples.push(read());
        }
        return { before, samples, after: read() };
    }, history);
}

function assertSmoothChange(result, history) {
    assert.equal(result.after.history, history);
    const changed = result.samples.filter(sample => sample.history === history);
    assert.ok(changed.length > 5, 'The new content remains visible');
    for (const key of ['titleX', 'descriptionX']) {
        const start = result.before[key], end = result.after[key];
        const distance = Math.abs(end - start);
        if (distance < 20) continue;
        assert.ok(Math.abs(changed[0][key] - start) < Math.max(24, distance * .2), `${key} begins at its previous visible position`);
        const low = Math.min(start, end), high = Math.max(start, end);
        const intermediate = changed.filter(sample => sample[key] > low + 5 && sample[key] < high - 5);
        assert.ok(intermediate.length >= 3, `${key} visibly travels between alignments instead of jumping`);
    }
    assert.equal(result.after.activeAnimations, 0, 'All text animations settle');
}

(async () => {
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    try {
        for (const width of [1440, 1024]) {
            const { page, errors } = await openArchive(browser, width);
            const centerError = await page.evaluate(() => {
                const logo = document.querySelector('.hero .title').getBoundingClientRect();
                const title = document.querySelector('.explanation .history-title-mask').getBoundingClientRect();
                const description = document.querySelector('.explanation p').getBoundingClientRect();
                return Math.abs((title.left + description.right) / 2 - (logo.left + logo.right) / 2);
            });
            assert.ok(centerError < 1, 'The intro stays centered beneath the logo');
            await page.evaluate(() => {
                const cards = document.querySelector('.history .card-wrap');
                const firstVisibleY = cards.getBoundingClientRect().top + scrollY - innerHeight;
                scrollTo({ top: Math.max(1, firstVisibleY - innerHeight * .12), behavior: 'instant' });
            });
            await page.waitForFunction(() => document.querySelector('.explanation').classList.contains('is-history-section'));
            const startsEarly = await page.evaluate(() => document.querySelector('.history .card-wrap').getBoundingClientRect().top > innerHeight);
            assert.ok(startsEarly, 'The text starts moving before the cards enter the viewport');
            assertSmoothChange(await sampleScroll(page, false), false);
            assertSmoothChange(await sampleScroll(page, true), true);

            const interrupted = await page.evaluate(async () => {
                const explanation = document.querySelector('.explanation');
                const wrappers = [explanation.querySelector('.history-title-mask'), explanation.querySelector('p')];
                const cards = [...document.querySelectorAll('.history-item')];
                const errors = [];
                for (const index of [0, 1, 5]) {
                    const before = wrappers.map(element => element.getBoundingClientRect().left);
                    cards[index].dispatchEvent(new MouseEvent('mouseenter'));
                    const after = wrappers.map(element => element.getBoundingClientRect().left);
                    errors.push(...before.map((left, i) => Math.abs(left - after[i])));
                    await new Promise(resolve => setTimeout(resolve, 90));
                }
                const expected = cards[5].querySelector('.history-card').dataset.title;
                await new Promise(resolve => setTimeout(resolve, 1250));
                return {
                    maxJump: Math.max(...errors), expected,
                    title: explanation.querySelector('h2').textContent,
                    animations: explanation.getAnimations({ subtree: true }).length,
                    transform: getComputedStyle(wrappers[0]).transform
                };
            });
            assert.ok(interrupted.maxJump < 1, 'Rapid card changes continue from the current on-screen position');
            assert.equal(interrupted.title, interrupted.expected, 'The latest card wins');
            assert.equal(interrupted.animations, 0);
            assert.equal(interrupted.transform, 'none');
            assertSmoothChange(await sampleScroll(page, false), false);
            assert.deepEqual(errors, []);
            console.log(`PASS ${width}px: centered intro, scroll both ways, interrupted card transitions`);
            await page.close();
        }

        for (const [width, height] of [[1440, 900], [1024, 768], [1440, 600]]) {
            const { page, errors } = await openArchive(browser, width, 'no-preference', height);
            await page.mouse.move(30, 200);
            await page.evaluate(() => scrollTo({ top: innerHeight, behavior: 'instant' }));
            await page.waitForFunction(() => document.querySelector('.explanation').classList.contains('is-history-section'));
            await page.evaluate(() => {
                const started = performance.now();
                const photo = document.querySelector('.archive-wrap .card01');
                window.photoScrollSamples = [];
                function sample() {
                    const elapsed = performance.now() - started;
                    const style = getComputedStyle(photo);
                    photoScrollSamples.push({
                        elapsed, y: scrollY,
                        visible: photo.classList.contains('is-visible'),
                        opacity: Number(style.opacity),
                        blur: Number.parseFloat(style.filter.match(/blur\(([\d.]+)/)?.[1] || 0),
                        scale: style.transform === 'none' ? 1 : new DOMMatrix(style.transform).m11
                    });
                    if (elapsed < 3100) requestAnimationFrame(sample);
                }
                sample();
            });
            await page.mouse.wheel(0, 700);
            // Let the scroll lock and photo reveal finish before the next wheel.
            await page.waitForFunction(() => photoScrollSamples.at(-1).elapsed >= 3100);
            await page.waitForFunction(() => {
                const photo = document.querySelector('.archive-wrap .card01');
                return photo.classList.contains('is-visible') && photo.getAnimations().length === 0;
            });
            const arrival = await page.evaluate(() => ({
                y: scrollY,
                gridTop: document.querySelector('.archive-wrap').getBoundingClientRect().top,
                photoTop: document.querySelector('.archive-wrap .card01').getBoundingClientRect().top,
                desiredTop: innerHeight * .1,
                filter: getComputedStyle(document.querySelector('.archive-wrap .card01')).filter,
                opacity: getComputedStyle(document.querySelector('.archive-wrap .card01')).opacity
            }));
            assert.ok(Math.abs(arrival.gridTop - arrival.desiredTop) < 1, 'The photo grid lands with 10% viewport space above it');
            assert.ok(Math.abs(arrival.photoTop - arrival.desiredTop) < 1, 'The revealed first photo shares the landing position');
            const motion = await page.evaluate(() => photoScrollSamples);
            assert.ok(motion[0].scale < .95 && motion[0].blur >= 9 && motion[0].opacity === 0, 'Photos start small, blurred and transparent');
            const revealStart = motion.find(sample => sample.visible).elapsed;
            const revealing = motion.find(sample => sample.elapsed >= revealStart + 300);
            assert.ok(revealing.blur > 1 && revealing.blur < 9 && revealing.scale > .9 && revealing.scale < .99
                && revealing.opacity > .1 && revealing.opacity < .9, 'Blur, scale and opacity progress together during the reveal');
            const revealed = motion.find(sample => sample.elapsed >= revealStart + 900);
            assert.ok(revealed.blur < .01 && revealed.scale > .999 && revealed.opacity > .999, 'The photo finishes revealing within 0.9 seconds');
            assert.equal(arrival.filter, 'blur(0px)', 'The photo finishes sharp');
            assert.equal(arrival.opacity, '1');
            const midway = motion.find(sample => sample.elapsed >= 800);
            const progress = (midway.y - height) / (arrival.y - height);
            assert.ok(progress > .85 && progress < .98, 'The photo descent follows the same gradual deceleration as the first scroll');
            const settled = motion.find(sample => Math.abs(sample.y - arrival.y) < 1);
            assert.ok(settled.elapsed >= 1200 && settled.elapsed < 1800, 'The 1.6-second eased scroll settles near its end');
            await page.mouse.wheel(0, 120);
            await page.waitForFunction(y => scrollY > y + 20, arrival.y);
            await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), arrival.y);
            await page.mouse.wheel(0, -700);
            await page.waitForFunction(() => Math.abs(scrollY - innerHeight) < 1);
            assert.deepEqual(errors, []);
            console.log(`PASS photo arrival ${width}x${height}: ${arrival.photoTop}px top margin, free scrolling and return to posters`);
            await page.close();
        }

        // A real wheel scroll brings a card under the stationary pointer. Its
        // hover must not replace the longer downward movement with a short one.
        {
            const { page, errors } = await openArchive(browser, 1440);
            await page.mouse.move(220, 450);
            await page.evaluate(() => {
                const explanation = document.querySelector('.explanation');
                const title = explanation.querySelector('.history-title-mask');
                const started = performance.now();
                window.verticalMotionSamples = [];
                function sample() {
                    const elapsed = performance.now() - started;
                    verticalMotionSamples.push({
                        elapsed,
                        y: title.getBoundingClientRect().top,
                        history: explanation.classList.contains('is-history-section'),
                        text: title.textContent.trim()
                    });
                    if (elapsed < 3200) requestAnimationFrame(sample);
                }
                sample();
            });
            await page.mouse.wheel(0, 700);
            await page.waitForFunction(() => verticalMotionSamples.at(-1).elapsed >= 3200);
            const samples = await page.evaluate(() => verticalMotionSamples);
            const first = samples[0], last = samples.at(-1);
            const start = samples.find(sample => sample.history).elapsed;
            assert.equal(last.text, 'ON', 'Scrolling over a card updates its text during the movement');
            assert.ok(last.y > first.y + 10, 'The text actually moves downward');
            const middle = samples.find(sample => sample.elapsed - start >= 1500);
            const progress = (middle.y - first.y) / (last.y - first.y);
            assert.ok(progress > .5 && progress < .85, `The visible descent is still in progress after 1.5s (${progress.toFixed(3)})`);
            const settled = samples.find(sample => sample.history && last.y - sample.y < .25);
            assert.ok(settled.elapsed - start >= 2050, 'Hovering does not shorten the visible downward travel');
            assert.deepEqual(errors, []);
            console.log(`PASS wheel + hover: descent ${(settled.elapsed - start).toFixed(0)}ms, ${(progress * 100).toFixed(1)}% at 1.5s`);

            await page.mouse.move(30, 400);
            await page.evaluate(() => {
                const explanation = document.querySelector('.explanation');
                const title = explanation.querySelector('.history-title-mask');
                const started = performance.now();
                window.returnMotionSamples = [];
                function sample() {
                    const elapsed = performance.now() - started;
                    returnMotionSamples.push({
                        elapsed, scrollY,
                        y: title.getBoundingClientRect().top,
                        history: explanation.classList.contains('is-history-section'),
                        animations: explanation.getAnimations({ subtree: true }).length
                    });
                    if (elapsed < 2400) requestAnimationFrame(sample);
                }
                sample();
            });
            await page.mouse.wheel(0, -700);
            await page.waitForFunction(() => returnMotionSamples.at(-1).elapsed >= 2400);
            const returning = await page.evaluate(() => returnMotionSamples);
            const returnStart = returning.find(sample => !sample.history);
            assert.ok(returnStart && returnStart.scrollY > 270, 'The intro returns before the upward scroll is nearly over');
            const returnEnd = returning.at(-1);
            assert.ok(Math.abs(returnEnd.y - first.y) < 1, 'The text returns to its original height');
            const returnSettled = returning.find(sample => !sample.history && Math.abs(sample.y - first.y) < .25);
            const returnTravelTime = returnSettled.elapsed - returnStart.elapsed;
            assert.ok(returnTravelTime > 1100 && returnTravelTime < 1600, 'The upward movement lasts visibly longer while keeping its own timing');
            assert.equal(returnEnd.animations, 0);
            assert.deepEqual(errors, []);
            console.log(`PASS upward return: starts at scrollY=${returnStart.scrollY}, settles in ${(returnSettled.elapsed - returnStart.elapsed).toFixed(0)}ms`);
            await page.close();
        }

        const { page, errors } = await openArchive(browser, 1440, 'reduce');
        const reduced = await sampleScroll(page, true);
        assert.equal(reduced.after.history, true);
        assert.ok(reduced.samples.every(sample => sample.activeAnimations === 0), 'Reduced motion changes content without animations');
        const reducedPhoto = await page.locator('.archive-wrap .card01').evaluate(element => {
            const style = getComputedStyle(element);
            return { opacity: style.opacity, filter: style.filter, transform: style.transform };
        });
        assert.deepEqual(reducedPhoto, { opacity: '1', filter: 'none', transform: 'none' });
        assert.deepEqual(errors, []);
        console.log('PASS reduced motion: visible content without movement');
        await page.close();

        const mobile = await openArchive(browser, 390);
        const mobilePhoto = await mobile.page.locator('.archive-wrap .card01').evaluate(element => {
            const style = getComputedStyle(element);
            return { opacity: style.opacity, filter: style.filter, transform: style.transform };
        });
        assert.deepEqual(mobilePhoto, { opacity: '1', filter: 'none', transform: 'none' });
        assert.deepEqual(mobile.errors, []);
        console.log('PASS mobile: photos remain visible, full-size and sharp');
        await mobile.page.close();
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
