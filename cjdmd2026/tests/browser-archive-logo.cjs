const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output', 'archive-logo');

async function openArchive(browser, { width = 1440, height = 900, reducedMotion = 'no-preference', failedFetch = false } = {}) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
    const errors = [];
    let logoFetches = 0;
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'archive.test') return route.fulfill({ contentType: 'text/javascript', body: '' });
        if (url.pathname.endsWith('/logo_wv.svg') && route.request().resourceType() === 'fetch') {
            logoFetches++;
            if (failedFetch) return route.fulfill({ status: 503, body: '' });
        }
        try {
            let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
            if (!file.startsWith(root + path.sep)) throw new Error('Unsafe test path');
            if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
            await route.fulfill({ path: file });
        } catch { await route.fulfill({ status: 404, body: '' }); }
    });
    await page.goto('http://archive.test/archive/', { waitUntil: 'load' });
    return { page, errors, fetches: () => logoFetches };
}

async function seek(page, progress) {
    return page.evaluate(progress => {
        const svg = document.querySelector('.archive-logo-assembly').shadowRoot.querySelector('svg');
        const background = document.getElementById('cjdmd-floating-outline-background');
        const duration = svg.getAnimations({ subtree: true })[0].effect.getTiming().duration;
        const animations = [...svg.getAnimations({ subtree: true }), ...background.shadowRoot.getAnimations()];
        for (const animation of animations) {
            animation.pause();
            animation.currentTime = duration * progress;
        }
        const pieces = [...svg.querySelectorAll('.archive-logo-piece')];
        const boxes = pieces.map(piece => piece.getBoundingClientRect());
        const shapeStyles = pieces.map(piece => getComputedStyle(piece.firstElementChild));
        const meanScale = pieces.reduce((sum, piece) => {
            const matrix = new DOMMatrix(getComputedStyle(piece).transform);
            return sum + Math.hypot(matrix.a, matrix.b);
        }, 0) / pieces.length;
        const onScreen = box => box.right > 0 && box.left < innerWidth && box.bottom > 70 && box.top < innerHeight;
        const refills = [...background.shadowRoot.querySelectorAll('[data-logo-refill]')];
        return {
            count: pieces.length, meanScale, duration,
            hits: pieces.map(piece => Number(piece.dataset.hit)),
            launches: pieces.map(piece => Number(piece.dataset.launch)),
            flights: pieces.map(piece => {
                const frames = piece.firstElementChild.getAnimations()[0].effect.getKeyframes();
                const contact = frames.findIndex(frame => Number(frame.fillOpacity) === 1);
                const departure = frames.slice(0, contact).findLast(frame => Number(frame.fillOpacity) === 0);
                return (frames[contact].computedOffset - departure.computedOffset) * duration;
            }),
            fills: shapeStyles.map(style => Number(style.fillOpacity)),
            borrowed: pieces.filter(piece => piece.dataset.origin === 'background').length,
            visible: boxes.filter(onScreen).length,
            refills: refills.length,
            visibleRefills: refills.map(piece => piece.getBoundingClientRect()).filter(onScreen).length,
            distance: pieces.map(piece => {
                const matrix = new DOMMatrix(getComputedStyle(piece).transform);
                return Math.hypot(matrix.m41, matrix.m42);
            }),
            spread: Math.max(...boxes.map(box => box.right)) - Math.min(...boxes.map(box => box.left)),
            fill: shapeStyles.reduce((sum, style) => sum + Number(style.fillOpacity), 0) / pieces.length,
            stroke: shapeStyles.reduce((sum, style) => sum + Number(style.strokeOpacity), 0) / pieces.length,
            overflow: document.documentElement.scrollWidth > innerWidth,
            pointerEvents: getComputedStyle(document.querySelector('.archive-logo-assembly')).pointerEvents,
            bounds: boxes.map(box => [box.left, box.top, box.width, box.height])
        };
    }, progress);
}

async function assertRestored(page) {
    await page.waitForFunction(() => !document.documentElement.classList.contains('archive-logo-enter'));
    assert.equal(await page.locator('.archive-logo-assembly').count(), 0);
    assert.equal(await page.locator('.hero .title img').evaluate(image => getComputedStyle(image).opacity), '1');
    const leftover = await page.evaluate(() => {
        const shadow = document.getElementById('cjdmd-floating-outline-background')?.shadowRoot;
        return shadow?.querySelectorAll('[data-logo-refill]').length || 0;
    });
    assert.equal(leftover, 0, 'All borrowed particles return to the normal background');
}

(async () => {
    await fs.mkdir(output, { recursive: true });
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    try {
        for (const [width, height] of [[1440, 900], [1024, 768], [760, 600]]) {
            const { page, errors } = await openArchive(browser, { width, height });
            await page.waitForFunction(() => document.querySelector('.archive-logo-assembly')?.shadowRoot.querySelector('.archive-logo-piece'));
            const start = await seek(page, 0);
            await page.waitForFunction(() => document.getElementById('cjdmd-floating-outline-background')?.dataset.motion === 'running');
            assert.equal(await page.locator('#cjdmd-floating-outline-background').evaluate(host => getComputedStyle(host).opacity), '1');
            assert.equal(start.count, 141, 'Every geometry in the new SVG participates');
            assert.equal(start.fill, 0, 'The background begins as unfilled outlines');
            assert.ok(start.stroke > .6 && start.meanScale > 2);
            assert.ok(start.spread > width * .8, 'Outlines span the background, beyond the logo');
            assert.equal(start.overflow, false);
            assert.equal(start.pointerEvents, 'none');
            assert.ok(start.borrowed > 0 && start.borrowed < start.count / 2, 'Only part of the field is borrowed; most logo pieces begin outside');
            assert.ok(start.visible <= start.borrowed + 2, 'No extra grid of icons is packed into the first screen');
            assert.equal(start.refills, start.borrowed, 'Each borrowed place gets a replacement');
            assert.equal(start.visibleRefills, 0, 'Replacements wait outside the viewport');
            await page.screenshot({ path: path.join(output, `${width}-outline.png`) });
            assert.equal(new Set(start.hits).size, start.count, 'Every fragment contacts separately, with no directional batches');
            const order = start.hits.map((hit, index) => ({ hit, index })).sort((a, b) => a.hit - b.hit);
            assert.ok(start.flights.every(time => Math.abs(time - 440) < .001), 'Every flight still takes 440ms');
            assert.equal(order[0].hit, 440, 'The first flight starts immediately, without an opening wait');
            const launches = [...start.launches].sort((a, b) => a - b);
            assert.ok(launches.slice(1).every((time, i) => time - launches[i] >= 6 && time - launches[i] <= 10),
                'Individual entry/departure starts remain 6–10ms apart');
            const outlines = await page.evaluate(() => {
                const shadow = document.querySelector('.archive-logo-assembly').shadowRoot;
                return [...shadow.querySelectorAll('[data-origin="outside"]')].map(piece => {
                    const entryEnd = Number(piece.dataset.entryEnd);
                    for (const animation of piece.getAnimations({ subtree: true })) {
                        animation.pause();
                        animation.currentTime = entryEnd + 70;
                    }
                    const box = piece.getBoundingClientRect();
                    const style = getComputedStyle(piece.firstElementChild);
                    return {
                        inside: box.left >= 0 && box.right <= innerWidth && box.top >= 70 && box.bottom <= innerHeight,
                        fill: Number(style.fillOpacity), stroke: Number(style.strokeOpacity),
                        opacity: Number(getComputedStyle(piece).opacity),
                        visiblePause: Number(piece.dataset.hit) - 440 - entryEnd
                    };
                });
            });
            assert.equal(outlines.length, start.count - start.borrowed);
            assert.ok(outlines.every(outline => outline.inside), 'Every outside fragment fully enters the viewport before its assembly flight');
            assert.ok(outlines.every(outline => outline.fill === 0 && outline.stroke === 1 && outline.opacity > .2),
                'Incoming fragments are visibly hollow outlines inside the viewport');
            assert.ok(outlines.every(outline => Math.abs(outline.visiblePause - 140) < .001),
                'Each outline has its own 140ms drift inside before gaining color');
            const entryPreview = await page.evaluate(() => {
                const pieces = [...document.querySelector('.archive-logo-assembly').shadowRoot.querySelectorAll('[data-origin="outside"]')];
                return Number(pieces[Math.floor(pieces.length / 2)].dataset.entryEnd) + 70;
            });
            await seek(page, entryPreview / start.duration);
            await page.screenshot({ path: path.join(output, `${width}-outline-entry.png`) });
            const early = await seek(page, 140 / start.duration);
            assert.ok(early.fills[order[0].index] > 0 && early.distance[order[0].index] < start.distance[order[0].index],
                'The first piece is already moving and gaining color in the first 140ms');
            assert.equal(early.fills[order.at(-1).index], 0, 'Later pieces keep their outlines until their individual departure');
            const mid = await seek(page, (order[0].hit + order.at(-1).hit) / 2 / start.duration);
            assert.ok(mid.fill > .2 && mid.fill < 1, 'Color fills in during the approach');
            assert.ok(mid.meanScale < start.meanScale && mid.meanScale > 1);
            assert.ok(mid.spread < start.spread);
            assert.ok(mid.visibleRefills > start.refills * .5, 'Replacements enter while the original pieces gather');
            await page.screenshot({ path: path.join(output, `${width}-gather.png`) });
            const contact = await seek(page, order[0].hit / start.duration);
            const center = (sample, index) => {
                const box = sample.bounds[index];
                return [box[0] + box[2] / 2, box[1] + box[3] / 2];
            };
            const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
            let maxPush = 0, spacing, spacingError = 0;
            for (let elapsed = 30; elapsed <= 330; elapsed += 30) {
                const sample = await seek(page, (order[1].hit + elapsed) / start.duration);
                const first = center(sample, order[0].index), second = center(sample, order[1].index);
                maxPush = Math.max(maxPush, distance(first, center(contact, order[0].index)));
                if (spacing === undefined) spacing = distance(first, second);
                spacingError = Math.max(spacingError, Math.abs(distance(first, second) - spacing));
            }
            assert.ok(maxPush > 1, 'Contact visibly pushes the joined body instead of easing to a stop');
            assert.ok(spacingError < .1, 'Docked fragments recoil together without separating again');
            await seek(page, (order[0].hit + 120) / start.duration);
            await page.screenshot({ path: path.join(output, `${width}-impact.png`) });
            const end = await seek(page, .9999);
            assert.ok(end.fill > .99999);
            assert.ok(end.stroke < .00001);
            assert.ok(Math.abs(end.meanScale - 1) < .0001);
            // At rest, wrappers must reproduce the SVG's unanimated geometry, including transforms.
            const natural = await page.evaluate(() => {
                const shadow = document.querySelector('.archive-logo-assembly').shadowRoot;
                return [...shadow.querySelectorAll('.archive-logo-piece')].map(piece => {
                    piece.style.setProperty('transform', 'none', 'important');
                    const box = piece.getBoundingClientRect();
                    return [box.left, box.top, box.width, box.height];
                });
            });
            assert.ok(natural.every((box, i) => box.every((value, j) => Math.abs(value - end.bounds[i][j]) < .01)));
            await page.evaluate(() => {
                document.querySelector('.archive-logo-assembly').shadowRoot.querySelector('svg')
                    .getAnimations({ subtree: true }).forEach(animation => animation.finish());
                document.getElementById('cjdmd-floating-outline-background').shadowRoot.getAnimations()
                    .forEach(animation => animation.finish());
            });
            await assertRestored(page);
            await page.waitForFunction(() => document.getElementById('cjdmd-floating-outline-background')?.dataset.motion === 'running');
            await page.screenshot({ path: path.join(output, `${width}-assembled.png`) });
            assert.deepEqual(errors, []);
            console.log(`PASS ${width}x${height}: ${start.count} separate contacts, ${maxPush.toFixed(1)}px body recoil, ${spacingError.toFixed(3)}px spacing error, replenishment, exact finish in ${start.duration.toFixed(0)}ms`);
            await page.close();
        }

        {
            const { page, errors } = await openArchive(browser);
            await page.waitForSelector('.archive-logo-assembly');
            const before = await page.evaluate(async () => {
                document.documentElement.classList.add('page-transition-active');
                await Promise.resolve();
                const animations = [...document.querySelector('.archive-logo-assembly').shadowRoot.querySelector('svg').getAnimations({ subtree: true }),
                    ...document.getElementById('cjdmd-floating-outline-background').shadowRoot.getAnimations()];
                await Promise.all(animations.map(animation => animation.ready));
                return animations.map(animation => animation.currentTime);
            });
            await page.waitForTimeout(250);
            const paused = await page.evaluate(() => [...document.querySelector('.archive-logo-assembly').shadowRoot.querySelector('svg').getAnimations({ subtree: true }),
                ...document.getElementById('cjdmd-floating-outline-background').shadowRoot.getAnimations()].map(animation => ({ time: animation.currentTime, state: animation.playState })));
            assert.ok(paused.every((animation, i) => animation.state === 'paused' && Math.abs(animation.time - before[i]) < 1));
            await page.evaluate(() => document.documentElement.classList.remove('page-transition-active'));
            await assertRestored(page);
            assert.deepEqual(errors, []);
            console.log('PASS page transition: pauses under the cover and naturally finishes after reveal');
            const spacing = await page.evaluate(async () => {
                const shadow = document.getElementById('cjdmd-floating-outline-background').shadowRoot;
                const center = element => {
                    const box = element.getBoundingClientRect();
                    return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
                };
                const visible = [...shadow.querySelectorAll('.piece:not(.fusion-piece)')]
                    .filter(element => getComputedStyle(element).visibility === 'visible')
                    .map(element => ({ element, ...center(element) }));
                const candidates = visible.filter(point => point.x > 140 && point.x < innerWidth - 140
                    && point.y > 150 && point.y < innerHeight - 150 && Math.abs(point.x - innerWidth / 2) > innerWidth * .14);
                candidates.forEach(candidate => {
                    candidate.room = Math.min(...visible.filter(other => other !== candidate && other.element !== candidate.element)
                        .map(other => Math.hypot(candidate.x - other.x, candidate.y - other.y)));
                });
                const target = candidates.sort((a, b) => b.room - a.room)[0];
                if (!target) throw new Error('No visible background icon to exercise spacing');
                const field = window.ArchiveOutlineBackground.reserveLogoSlots(0);
                const incoming = document.createElement('div');
                Object.assign(incoming.style, { position: 'fixed', left: `${target.x - 12}px`, top: `${target.y - 40}px`,
                    width: '80px', height: '80px', border: '1px solid #aaa', pointerEvents: 'none' });
                document.body.append(incoming);
                const animation = incoming.animate([{ transform: 'translateX(30px)' }, { transform: 'translateX(0px)' }],
                    { duration: 350, fill: 'forwards' });
                field.trackOutline(incoming, animation, { end: 1000 });
                const before = center(target.element);
                await new Promise(resolve => setTimeout(resolve, 650));
                const pushed = center(target.element);
                field.release();
                animation.cancel();
                incoming.remove();
                await new Promise(resolve => setTimeout(resolve, 1050));
                const settled = center(target.element);
                await new Promise(resolve => setTimeout(resolve, 200));
                const later = center(target.element);
                return { push: before.x - pushed.x, settledTravel: Math.hypot(later.x - settled.x, later.y - settled.y) };
            });
            assert.ok(spacing.push > 12, 'An incoming outline visibly pushes an existing icon away');
            assert.ok(spacing.settledTravel < 12, 'The extra velocity decays back to the gentle background flow');
            assert.deepEqual(errors, []);
            console.log(`PASS background spacing: ${spacing.push.toFixed(1)}px displacement, ${spacing.settledTravel.toFixed(1)}px settled travel / 200ms`);
            await page.emulateMedia({ reducedMotion: 'reduce' });
            const grab = await page.evaluate(() => {
                const shadow = document.getElementById('cjdmd-floating-outline-background').shadowRoot;
                for (const piece of shadow.querySelectorAll('.piece')) {
                    if (getComputedStyle(piece).visibility !== 'visible') continue;
                    const box = piece.querySelector('.color-group').getBoundingClientRect();
                    const x = box.left + box.width / 2, y = box.top + box.height / 2;
                    if (x > 40 && x < innerWidth - 40 && y > 120 && y < innerHeight - 80 && Math.abs(x - innerWidth / 2) > innerWidth * .25) return { x, y };
                }
            });
            assert.ok(grab, 'The restored background has a visible draggable icon');
            await page.mouse.move(grab.x, grab.y);
            await page.mouse.down();
            assert.equal(await page.locator('body').evaluate(body => body.classList.contains('cjdmd-outline-dragging')), true);
            await page.mouse.move(grab.x + 20, grab.y - 15);
            await page.mouse.up();
            assert.equal(await page.locator('body').evaluate(body => body.classList.contains('cjdmd-outline-dragging')), false);
            console.log('PASS background interaction: icons remain draggable after replenishment');
            await page.close();
        }

        for (const action of ['scroll', 'resize', 'reduce', 'pagehide']) {
            const { page, errors } = await openArchive(browser);
            await page.waitForSelector('.archive-logo-assembly');
            if (action === 'resize') await page.setViewportSize({ width: 1100, height: 800 });
            else if (action === 'reduce') await page.emulateMedia({ reducedMotion: 'reduce' });
            else if (action === 'scroll') await page.evaluate(() => scrollTo({ top: 300, behavior: 'instant' }));
            else await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
            await assertRestored(page);
            assert.deepEqual(errors, []);
            await page.close();
            console.log(`PASS ${action}: removes the animation and restores the image`);
        }

        for (const options of [{ reducedMotion: 'reduce' }, { width: 390 }, { failedFetch: true }]) {
            const { page, errors, fetches } = await openArchive(browser, options);
            await assertRestored(page);
            if (!options.failedFetch) assert.equal(fetches(), 0, 'No animation SVG request for reduced motion or mobile');
            assert.deepEqual(errors, []);
            await page.close();
            console.log(`PASS fallback ${JSON.stringify(options)}`);
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
