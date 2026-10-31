(() => {
    'use strict';

    const root = document.documentElement;
    const STORAGE_KEY = 'stamp-page-transition';
    const DURATION = 1100;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 759px)');
    const atlasURL = new URL('../assets/images/page-transition-atlas.json', document.currentScript.src);
    const nativeNavigation = 'onpagereveal' in window && 'onpageswap' in window;
    let spritesPromise, scene = null, leaving = false, arriving = false, contentShown = false;
    let exitBlur = null;
    let heldMenu = null;
    let navigationTimer = 0, arrivalTimer = 0;
    const domReady = document.readyState === 'loading'
        ? new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, {once: true}))
        : Promise.resolve();

    const style = document.createElement('style');
    style.textContent = `
        @view-transition { navigation: auto; }
        html.page-transition-pending::after {
            content: ''; position: fixed; inset: 0; z-index: 999999; background: #fff;
        }
        .page-transition-layer {
            position: fixed; inset: 0; width: 100%; height: 100dvh;
            z-index: 999999; pointer-events: auto; overflow: hidden;
            contain: layout paint style; isolation: isolate;
        }
        .page-transition-icons, .page-transition-cover {
            position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }
        .page-transition-icons { display: block; }
        .page-transition-cover { background: #fff; }
        html.page-transition-menu-hold .mobile-menu {
            background: #fff; opacity: 1; transform: none; transition: none;
        }
        html.page-transition-native::view-transition { pointer-events: auto; }
        html.page-transition-native::view-transition-group(root) {
            animation: page-transition-hold 8s linear both; z-index: 0;
        }
        html.page-transition-native::view-transition-image-pair(root) { isolation: isolate; }
        html.page-transition-native::view-transition-old(root),
        html.page-transition-native::view-transition-new(root) {
            animation: none; mix-blend-mode: normal; opacity: 1;
        }
        html.page-transition-native::view-transition-new(root) {
            clip-path: inset(0 100% 0 0);
        }
        html.page-transition-native::view-transition-old(root) {
            filter: blur(0px);
        }
        html.page-transition-native::view-transition-group(page-swarm) {
            animation: none; z-index: 1;
        }
        html.page-transition-native::view-transition-old(page-swarm) { display: none; }
        html.page-transition-native::view-transition-new(page-swarm) {
            animation: none; mix-blend-mode: normal; opacity: 1;
        }
        @keyframes page-transition-hold { from { opacity: 1; } to { opacity: 1; } }
        .page-enter-up {
            opacity: 0; transform: translateY(20px);
            transition: opacity 700ms ease, transform 700ms cubic-bezier(.22,1,.36,1);
        }
        .page-enter-up.is-show { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
            @view-transition { navigation: none; }
            .page-enter-up { animation-duration: 1ms !important; transition-duration: 1ms !important; }
        }
    `;
    document.head.appendChild(style);
    const clipStyle = [...style.sheet.cssRules].find(rule => rule.selectorText === 'html.page-transition-native::view-transition-new(root)')?.style || document.createElement('div').style;
    const blurStyle = [...style.sheet.cssRules].find(rule => rule.selectorText === 'html.page-transition-native::view-transition-old(root)')?.style || document.createElement('div').style;

    function readArrival() {
        try {
            const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
            return value?.version === 2 && value.href === location.href && Date.now() - value.time < 15000;
        } catch { return false; }
    }
    function clearArrival() {
        try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be blocked. */ }
    }
    function setActive(active) {
        if (root.classList.contains('page-transition-active') === active) return;
        root.classList.toggle('page-transition-active', active);
        document.dispatchEvent(new CustomEvent('page-transition:change', {detail: {active}}));
    }
    function bounded(promise, timeout) {
        return new Promise(resolve => {
            const timer = setTimeout(resolve, timeout);
            Promise.resolve(promise).then(value => { clearTimeout(timer); resolve(value); }, () => {
                clearTimeout(timer); resolve();
            });
        });
    }
    function loadSprites() {
        if (!spritesPromise) spritesPromise = (async () => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 2400);
            let sheet;
            try {
                const response = await fetch(atlasURL, {signal: controller.signal});
                if (!response.ok) throw new Error('Atlas response: ' + response.status);
                sheet = await response.json();
            } finally { clearTimeout(timeout); }
            const image = new Image();
            image.src = sheet.source;
            await image.decode();
            const atlas = document.createElement('canvas');
            // Mobile icons never need the desktop atlas's 256px source cells.
            const cell = mobile.matches ? Math.min(128, sheet.cell) : sheet.cell;
            atlas.width = sheet.columns * cell; atlas.height = Math.ceil(sheet.count / sheet.columns) * cell;
            const ctx = atlas.getContext('2d');
            if (!ctx) return [];
            ctx.drawImage(image, 0, 0, atlas.width, atlas.height);
            return Array.from({length: sheet.count}, (_, i) => ({atlas,
                x: i % sheet.columns * cell, y: Math.floor(i / sheet.columns) * cell, size: cell}));
        })().catch(error => {
            console.warn('[Page transition] Icon atlas unavailable.', error);
            return [];
        });
        return bounded(spritesPromise, 2500).then(sprites => sprites || []);
    }

    function resize(current) {
        const width = Math.max(1, current.layer.clientWidth), height = Math.max(1, current.layer.clientHeight);
        const vertical = mobile.matches;
        const iconSize = Math.min(156, Math.max(76, width * .1)) * 1.25;
        const spread = Math.min(150, width * .19, iconSize * .88), drift = Math.min(16, iconSize * .1);
        const tailLength = Math.min(480, width * .6);
        const margin = width * .109 + spread + drift + iconSize * Math.SQRT1_2 + 16;
        current.size = {width, height, vertical, travelLength: vertical ? height : width,
            crossLength: vertical ? width : height,
            iconSize, spread, drift, tailLength, startMargin: margin, endMargin: margin + tailLength};
        current.layer.dataset.direction = vertical ? 'top-to-bottom' : 'left-to-right';
        root.dataset.pageTransitionDirection = current.layer.dataset.direction;
        current.ratio = Math.min(devicePixelRatio || 1, vertical ? 1.25 : 1.5);
        current.canvas.width = Math.ceil(width * current.ratio);
        current.canvas.height = Math.ceil(height * current.ratio);
        if (current.start !== undefined) animateSurface(current);
        paint(current, current.progress || 0);
    }
    function waveEdge(size, cross, base, time) {
        return base + Math.sin(cross / size.crossLength * Math.PI * 3.2 + time * .004) * size.width * .075
            + Math.sin(cross / size.crossLength * Math.PI * 7.4 - time * .006) * size.width * .034;
    }
    function position(current, particle, time) {
        const {crossLength, vertical, spread, drift, tailLength} = current.size, depth = particle.depth;
        const lane = .5 + (particle.lane - .5) * (1 - depth * .12);
        const cross = lane * crossLength + Math.sin(time * .0018 + particle.seed * 12) * crossLength * (particle.trailing ? .016 : .035) + particle.offsetY;
        const along = waveEdge(current.size, cross, 0, time) * (1 - depth * .78) - depth * tailLength
            + particle.scatter * spread * (1 - depth * .7) + Math.sin(time * .003 + particle.seed * 20) * drift;
        // Swap movement axes on mobile while keeping each icon upright.
        return vertical ? {x: cross, y: along} : {x: along, y: cross};
    }
    function makeParticles(current, sprites) {
        const compact = current.size.vertical, bodyCount = compact ? 48 : 80, tailCount = compact ? 34 : 56;
        current.particles = Array.from({length: bodyCount + tailCount}, (_, i) => {
            const trailing = i >= bodyCount;
            const depth = trailing ? .075 + Math.pow((i - bodyCount + .5) / tailCount, 1.2) * .925
                : Math.pow((i + .5) / bodyCount, 1.5) * .075;
            const band = (((i * 37) % bodyCount + .5) / bodyCount) * 2 - 1;
            return {
                sprite: sprites[i % sprites.length], trailing, depth, lane: (i * .61803398875) % 1,
                seed: ((i * 9301 + 49297) % 233280) / 233280,
                scatter: trailing ? ((i * .754877666) % 1) * 2 - 1 : Math.sign(band) * Math.pow(Math.abs(band), 1.45),
                scale: trailing ? (.40 + ((i * 11) % 17) / 100) * (1 - depth * .12) : .52 + ((i * 17) % 35) / 100,
                opacity: 1 - depth * .18,
                angle: trailing ? ((i * 23) % 24) - 12 : ((i * 23) % 60) - 30,
                offsetY: trailing ? ((i * 43) % 24) - 12 : ((i * 43) % 70) - 35,
                spin: (((i * 31) % 21) - 10) * .096
            };
        });
        // Resolve spacing once, across several moments of the motion; no frame-time collision simulation.
        const times = [0, 275, 550, 825, 1100];
        const placed = current.particles.slice(0, bodyCount).map(p => ({scale: p.scale, weight: .35, samples: times.map(t => position(current, p, t))}));
        for (const particle of current.particles.slice(bodyCount)) {
            const originalLane = particle.lane;
            let bestLane = originalLane, bestPenalty = Infinity, bestSamples;
            for (let candidate = 0; candidate < 20; candidate++) {
                particle.lane = candidate === 0 ? originalLane : .04 + .92 * ((originalLane + candidate * .61803398875) % 1);
                const samples = times.map(t => position(current, particle, t));
                let penalty = 0;
                comparisons: for (const other of placed) {
                    const spacing = current.size.iconSize * (particle.scale + other.scale) * (.48 + particle.depth * .08);
                    for (let i = 0; i < samples.length; i++) {
                        const dx = samples[i].x - other.samples[i].x, dy = samples[i].y - other.samples[i].y;
                        const overlap = Math.max(0, 1 - (dx * dx + dy * dy) / (spacing * spacing));
                        penalty += overlap * overlap * other.weight;
                        // All penalties are positive: a worse candidate cannot recover.
                        if (penalty >= bestPenalty) break comparisons;
                    }
                }
                if (penalty < bestPenalty) { bestPenalty = penalty; bestLane = particle.lane; bestSamples = samples; }
                if (penalty === 0) break;
            }
            particle.lane = bestLane;
            placed.push({scale: particle.scale, weight: 1, samples: bestSamples});
        }
        current.canvas.dataset.pieces = String(bodyCount + tailCount);
        current.canvas.dataset.tailPieces = String(tailCount);
    }
    function clipPath(current, value) {
        const size = current.size, travel = value * value, time = travel * DURATION;
        const base = -size.startMargin + (size.travelLength + size.startMargin + size.endMargin) * travel;
        const edge = Array.from({length: 65}, (_, i) => {
            const cross = size.crossLength * i / 64;
            const along = waveEdge(size, cross, base, time);
            return size.vertical ? cross.toFixed(2) + 'px ' + along.toFixed(2) + 'px'
                : along.toFixed(2) + 'px ' + cross.toFixed(2) + 'px';
        }).join(',');
        return current.transition ? 'polygon(0 0,' + edge + (size.vertical ? ',100% 0)' : ',0 100%)')
            : (size.vertical ? 'polygon(0 100%,' : 'polygon(100% 0,') + edge + ',100% 100%)';
    }
    function animateSurface(current) {
        current.animations?.forEach(animation => animation.cancel());
        current.animations = [];
        try {
            // Prepare the wave once. Never mutate inherited root styles on every frame.
            const keyframes = Array.from({length: 49}, (_, i) => ({offset: i / 48, clipPath: clipPath(current, i / 48)}));
            current.animations.push((current.transition ? root : current.cover).animate(keyframes, {
                duration: DURATION, fill: 'both', easing: 'linear',
                ...(current.transition ? {pseudoElement: '::view-transition-new(root)'} : {})
            }));
            if (current.transition) current.animations.push(root.animate([
                {filter: 'blur(0px)'}, {filter: 'blur(12px)'}
            ], {duration: DURATION, fill: 'both', easing: 'cubic-bezier(.333333,0,.666667,1)',
                pseudoElement: '::view-transition-old(root)'}));
            // The canvas and browser-owned effects use the same document timeline.
            current.animations.forEach(animation => { animation.startTime = current.start; });
        } catch {
            current.animations.forEach(animation => animation.cancel());
            current.animations = [];
        }
    }
    function paint(current, value) {
        current.progress = value;
        const size = current.size, travel = value * value, time = travel * DURATION;
        const base = -size.startMargin + (size.travelLength + size.startMargin + size.endMargin) * travel;
        if (!current.animations?.length) {
            if (current.transition) {
                clipStyle.clipPath = clipPath(current, value);
                blurStyle.filter = 'blur(' + (12 * value * value * (3 - 2 * value)).toFixed(2) + 'px)';
            } else current.cover.style.clipPath = clipPath(current, value);
        }
        const phase = value === 1 ? 'complete' : base < size.travelLength * .3 ? 'entering' : base < size.travelLength * .7 ? 'crossing' : 'leaving';
        if (current.phase !== phase) {
            current.phase = phase;
            current.layer.dataset.phase = phase;
            root.dataset.pageTransitionState = phase;
        }
        const ctx = current.ctx, ratio = current.ratio;
        if (!ctx) return;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, current.canvas.width, current.canvas.height);
        for (const particle of current.particles) {
            const point = position(current, particle, time);
            const x = point.x + (size.vertical ? 0 : base), y = point.y + (size.vertical ? base : 0);
            if (x < -size.iconSize || x > size.width + size.iconSize || y < -size.iconSize || y > size.height + size.iconSize) continue;
            const angle = (particle.angle + particle.spin * time / 1000) * Math.PI / 180, scale = particle.scale * ratio;
            ctx.setTransform(Math.cos(angle) * scale, Math.sin(angle) * scale, -Math.sin(angle) * scale, Math.cos(angle) * scale, x * ratio, y * ratio);
            ctx.globalAlpha = particle.opacity;
            const sprite = particle.sprite;
            ctx.drawImage(sprite.atlas, sprite.x, sprite.y, sprite.size, sprite.size, -size.iconSize / 2, -size.iconSize / 2, size.iconSize, size.iconSize);
        }
        ctx.globalAlpha = 1;
    }
    function createScene(transition) {
        const layer = document.createElement('div');
        layer.className = 'page-transition-layer';
        layer.setAttribute('aria-hidden', 'true');
        layer.dataset.mode = transition ? 'single-native' : 'single-fallback';
        root.dataset.pageTransitionMode = layer.dataset.mode;
        const canvas = document.createElement('canvas');
        canvas.className = 'page-transition-icons';
        const cover = transition ? null : document.createElement('div');
        if (transition) canvas.style.viewTransitionName = 'page-swarm';
        else { cover.className = 'page-transition-cover'; layer.appendChild(cover); }
        layer.appendChild(canvas);
        document.body.appendChild(layer);
        root.classList.remove('page-transition-pending');
        const current = {layer, canvas, cover, transition, particles: [], ctx: canvas.getContext('2d'), frame: 0, timeout: 0};
        current.resize = () => resize(current);
        scene = current;
        resize(current);
        window.addEventListener('resize', current.resize, {passive: true});
        return current;
    }
    function cleanup() {
        const current = scene;
        scene = null;
        if (current) {
            cancelAnimationFrame(current.frame); clearTimeout(current.timeout);
            window.removeEventListener('resize', current.resize);
            current.animations?.forEach(animation => animation.cancel());
            current.transition?.skipTransition();
            current.layer.remove();
        }
        clearTimeout(navigationTimer); clearTimeout(arrivalTimer);
        exitBlur?.cancel(); exitBlur = null;
        root.classList.remove('page-transition-native', 'page-transition-preload', 'page-transition-pending', 'page-transition-menu-hold');
        clipStyle.clipPath = 'inset(0 100% 0 0)';
        blurStyle.filter = 'blur(0px)';
        arriving = leaving = false;
        setActive(false);
    }
    function showPageContent() {
        if (contentShown) return;
        contentShown = true;
        let index = 0;
        document.querySelectorAll('[typewriter-effect][typewriter-trigger="manual"]').forEach(el => {
            if (el.offsetParent !== null && window.TypewriterEffect) setTimeout(() => window.TypewriterEffect.play(el), index++ * 180);
        });
        document.querySelectorAll('.page-enter-up').forEach((el, i) => {
            if (el.offsetParent !== null) setTimeout(() => el.classList.add('is-show'), 100 + i * 100);
        });
    }
    async function contentReady() {
        await domReady;
        const visibleImages = [...document.images].filter(image => {
            const rect = image.getBoundingClientRect();
            return rect.width && rect.height && rect.bottom > 0 && rect.top < innerHeight;
        }).slice(0, 12);
        // Hidden desktop galleries must never delay a mobile page transition.
        const desktopReady = matchMedia('(min-width: 760px)').matches
            ? window.DesktopFeaturesReady || window.DesignerFormationReady
            : null;
        await bounded(Promise.allSettled([...visibleImages.map(image => image.decode()), document.fonts?.ready,
            desktopReady]), 1600);
    }
    async function run(current) {
        // The native old-page snapshot stays visible while the new page and atlas become ready.
        current.timeout = setTimeout(() => { if (scene === current) { cleanup(); showPageContent(); } }, 5000);
        try {
            const waitingAt = performance.now();
            const [sprites] = await Promise.all([loadSprites(), contentReady(), current.transition?.ready]);
            if (scene !== current) return;
            if (reduced.matches || !sprites.length || !current.ctx) {
                root.dataset.pageTransitionState = reduced.matches ? 'reduced-motion' : !sprites.length ? 'no-sprites' : 'no-canvas';
                cleanup(); showPageContent(); return;
            }
            const preparingAt = performance.now();
            makeParticles(current, sprites);
            showPageContent();
            current.start = performance.now();
            animateSurface(current);
            const preparedAt = performance.now();
            current.animations.forEach(animation => { animation.pause(); animation.currentTime = 0; });
            // Commit the first page/canvas frame before starting the movement clock.
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            if (scene !== current) return;
            const start = current.start = performance.now();
            current.animations.forEach(animation => { animation.play(); animation.startTime = start; });
            const intervals = [], drawing = [];
            let previous = start;
            const tick = now => {
                if (scene !== current) return;
                intervals.push(now - previous); previous = now;
                const progress = Math.max(0, Math.min(1, (now - start) / DURATION));
                const drawingAt = performance.now();
                paint(current, progress);
                drawing.push(performance.now() - drawingAt);
                if (progress === 1) {
                    const sorted = intervals.slice().sort((a,b) => a-b);
                    root.dataset.pageTransitionPerf = JSON.stringify({
                        frames: intervals.length, over32ms: intervals.filter(ms => ms > 32).length,
                        slowFrames: intervals.flatMap((ms, index) => ms > 32 ? [{index, ms: Math.round(ms)}] : []),
                        maxFrameMs: Math.round(Math.max(...intervals)), p95FrameMs: Math.round(sorted[Math.floor(sorted.length * .95)]),
                        prepareMs: +(preparedAt - preparingAt).toFixed(2), waitMs: Math.round(preparingAt - waitingAt),
                        warmupMs: Math.round(start - preparedAt),
                        surfaceAnimation: current.animations.length ? 'browser' : 'frame',
                        meanDrawMs: +(drawing.reduce((a,b) => a+b,0) / drawing.length).toFixed(2),
                        canvasPixels: current.canvas.width * current.canvas.height,
                        atlasPixels: sprites[0].atlas.width * sprites[0].atlas.height
                    });
                    cleanup(); return;
                }
                current.frame = requestAnimationFrame(tick);
            };
            current.frame = requestAnimationFrame(tick);
        } catch (error) {
            if (scene === current) {
                root.dataset.pageTransitionState = 'skipped';
                console.warn('[Page transition] Single pass skipped.', error);
                cleanup(); showPageContent();
            }
        }
    }

    // This script is parser-blocking in the head: pagereveal must be registered before first paint.
    window.addEventListener('pagereveal', event => {
        const transition = event.viewTransition;
        clearTimeout(arrivalTimer);
        if (!transition) { void domReady.then(fallbackArrival); return; }
        if (scene) cleanup();
        if (reduced.matches || !document.body) {
            transition.skipTransition(); cleanup(); clearArrival();
            void domReady.then(showPageContent);
            return;
        }
        clearTimeout(arrivalTimer);
        arriving = true;
        clearArrival();
        root.classList.remove('page-transition-preload', 'page-transition-pending');
        root.classList.add('page-transition-native');
        clipStyle.clipPath = 'inset(0 100% 0 0)';
        setActive(true);
        const current = createScene(transition);
        transition.finished.finally(() => { if (scene === current) { cleanup(); showPageContent(); } });
        void run(current);
    });
    window.addEventListener('pageswap', event => {
        const traverse = event.activation?.navigationType === 'traverse';
        if (reduced.matches || (!leaving && !traverse)) event.viewTransition?.skipTransition();
        // The BFCache must retain an interactive page, not an outgoing busy state.
        clearTimeout(navigationTimer);
        leaving = false;
        setActive(false);
    });
    window.addEventListener('pageshow', event => {
        if (event.persisted) {
            // Only reset the outgoing menu after returning from the BFCache.
            // Closing it in pageswap/pagehide can change the captured old page.
            if (heldMenu) {
                heldMenu.classList.remove('is-open');
                heldMenu.hidden = true;
                heldMenu.inert = true;
                document.body.classList.remove('mobile-menu-open');
                const button = document.querySelector('.menu-button');
                button?.setAttribute('aria-expanded', 'false');
                button?.setAttribute('aria-label', '메뉴 열기');
                heldMenu = null;
            }
            cleanup(); clearArrival();
        }
    });
    window.addEventListener('pagehide', () => {
        if (scene || exitBlur) cleanup();
        clearTimeout(navigationTimer);
    });
    reduced.addEventListener('change', () => {
        if (reduced.matches && scene) { cleanup(); showPageContent(); }
    });

    async function handleLinkClick(event) {
        const link = event.target.closest?.('[page-transition]');
        if (!link?.href || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
            || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
        if (url.pathname === location.pathname && url.search === location.search) {
            if (url.hash === location.hash) event.preventDefault();
            return;
        }
        event.preventDefault();
        if (leaving || arriving) return;
        leaving = true;
        const menu = mobile.matches ? link.closest('.mobile-menu') : null;
        if (menu && !menu.hidden) {
            heldMenu = menu;
            root.classList.add('page-transition-menu-hold');
            menu.classList.add('is-open');
        }
        setActive(true);
        if (!reduced.matches) {
            try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({version: 2, href: url.href, time: Date.now()})); } catch { /* Native transitions do not require storage. */ }
        }
        // Navigate immediately. The browser keeps the old document until the new one is ready.
        // No outgoing cover pass, DOM replacement, or re-execution of page scripts is needed.
        navigationTimer = setTimeout(() => { cleanup(); clearArrival(); }, 12000);
        if (!nativeNavigation && !reduced.matches && document.body.animate) {
            exitBlur = document.body.animate([{filter: 'blur(0px)'}, {filter: 'blur(12px)'}], {duration: 200, fill: 'both'});
            await exitBlur.finished.catch(() => {});
        }
        location.assign(url.href);
    }
    // Menu link handlers otherwise start their close/fade before document bubbling.
    // Claim only menu navigation early; other links retain their existing order.
    document.addEventListener('click', event => {
        if (event.target.closest?.('.mobile-menu [page-transition]')) void handleLinkClick(event);
    }, true);
    document.addEventListener('click', handleLinkClick);

    const expectedArrival = readArrival();
    root.classList.remove('page-transition-preload');
    if (expectedArrival && !reduced.matches) {
        arriving = true; setActive(true); root.classList.add('page-transition-pending');
    }
    if (!reduced.matches) void loadSprites();
    function fallbackArrival() {
        if (scene) return;
        if (arriving && !reduced.matches) {
            clearArrival();
            void run(createScene(null));
        } else { clearArrival(); cleanup(); showPageContent(); }
    }
    domReady.then(() => {
        // pagereveal normally owns the native path. A skipped/unsupported transition
        // falls back to one incoming swarm, never the former cover + reveal pair.
        if (scene) return;
        if (!nativeNavigation || !expectedArrival) fallbackArrival();
        else arrivalTimer = setTimeout(fallbackArrival, 1000);
    });
})();
