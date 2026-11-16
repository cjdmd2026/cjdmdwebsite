(() => {
    'use strict';

    // The swarm and plain wall versions remain in their original files.
    const root = document.documentElement;
    const STORAGE_KEY = 'stamp-page-transition';
    const DURATION = 1300;
    const LAST_ICON_KEY = 'page-rolling-icon-last';
    const EMPTY_MASK = 'linear-gradient(transparent, transparent)';
    const iconsURL = new URL('main-icon-fragments.js', document.currentScript.src);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 759px)');
    const nativeNavigation = 'onpagereveal' in window && 'onpageswap' in window;
    const linkSelector = '[page-transition], .header a[href], nav a[href]';
    let scene = null, leaving = false, arriving = false, contentShown = false;
    let heldMenu = null;
    let iconsPromise;
    let maskSequence = 0;
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
        .page-transition-cover {
            position: absolute; inset: 0; background: #fff; pointer-events: none;
        }
        .page-transition-mask-defs { position: absolute; width: 0; height: 0; pointer-events: none; }
        .page-transition-cover { mask-mode: luminance; }
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
            mask-image: ${EMPTY_MASK}; mask-mode: luminance;
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
    const maskStyle = [...style.sheet.cssRules].find(rule => rule.selectorText === 'html.page-transition-native::view-transition-new(root)')?.style || document.createElement('div').style;

    function readArrival(fromCache = false) {
        try {
            const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
            if (value?.version !== 2 || Date.now() - value.time >= 15000) return false;
            if (value.traverse) return fromCache || performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
            return value.href === location.href;
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
    function loadIcons() {
        const read = () => Object.entries(window.MAIN_ICON_FRAGMENTS || {})
            .filter(([, icon]) => icon?.viewBox && icon?.svg);
        if (window.MAIN_ICON_FRAGMENTS) return Promise.resolve(read());
        if (!iconsPromise) iconsPromise = bounded(new Promise(resolve => {
            let script = [...document.scripts].find(element => element.src && new URL(element.src).pathname === iconsURL.pathname);
            const existing = !!script;
            if (!script) { script = document.createElement('script'); script.src = iconsURL.href; }
            script.addEventListener('load', () => resolve(read()), {once: true});
            script.addEventListener('error', () => resolve([]), {once: true});
            if (!existing) document.head.appendChild(script);
        }), 2200).then(icons => icons || []);
        return iconsPromise;
    }
    function svgElement(name, attributes = {}) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', name);
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    }
    function mountMask(current, icons) {
        if (!icons.length) return false;
        let previous;
        try { previous = sessionStorage.getItem(LAST_ICON_KEY); } catch { /* Storage is optional. */ }
        const choices = icons.length > 1 ? icons.filter(([id]) => id !== previous) : icons;
        const [id, icon] = choices[Math.floor(Math.random() * choices.length)];
        const [x, y, width, height] = icon.viewBox.split(/[\s,]+/).map(Number);
        current.iconCenter = {x: x + width / 2, y: y + height / 2};
        current.scale = current.size / Math.max(width, height);
        const prefix = `page-rolling-mask-${++maskSequence}`;
        const svg = svgElement('svg', {class: 'page-transition-mask-defs', 'aria-hidden': 'true', focusable: 'false'});
        const defs = svgElement('defs');
        const shape = svgElement('g', {id: `${prefix}-shape`});
        shape.innerHTML = icon.svg;
        const swept = svgElement('g', {id: `${prefix}-swept`});
        const trail = svgElement('rect', {width: 0, height: current.height});
        const tip = svgElement('use', {href: `#${prefix}-shape`, class: 'page-transition-mask-tip'});
        swept.append(trail, tip);
        for (const inverse of [false, true]) {
            const mask = svgElement('mask', {id: `${prefix}-${inverse ? 'cover' : 'reveal'}`,
                maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse',
                x: 0, y: 0, width: current.width, height: current.height, 'mask-type': 'luminance'});
            if (inverse) mask.appendChild(svgElement('rect', {width: current.width, height: current.height, fill: 'white'}));
            mask.appendChild(svgElement('use', {href: `#${prefix}-swept`, fill: inverse ? 'black' : 'white'}));
            defs.appendChild(mask);
        }
        defs.append(shape, swept);
        svg.appendChild(defs);
        current.layer.appendChild(svg);
        Object.assign(current, {svg, trail, tip});
        paintMask(current, 0);
        const maskId = `${prefix}-${current.transition ? 'reveal' : 'cover'}`;
        // An absolute same-document reference also works on pages with a <base> URL.
        (current.transition ? maskStyle : current.cover.style).maskImage = `url("${location.href.split('#')[0]}#${maskId}")`;
        root.dataset.pageTransitionIcon = id;
        root.dataset.pageTransitionIconCount = String(icons.length);
        try { sessionStorage.setItem(LAST_ICON_KEY, id); } catch { /* Storage is optional. */ }
        return true;
    }
    function maskTransform(current, progress) {
        return `translate(${progress * current.distance - current.margin} ${current.height / 2}) ` +
            `rotate(${progress * current.rotation}) scale(${current.scale}) ` +
            `translate(${-current.iconCenter.x} ${-current.iconCenter.y})`;
    }
    function paintMask(current, progress) {
        // Use exactly one rotating silhouette; preserve its internal cutouts too.
        current.tip.setAttribute('transform', maskTransform(current, progress));
        // Close only completed columns behind the entire icon, including its holes.
        // The leading edge is always the rotating icon silhouette, never a wall.
        const completed = Math.max(0, Math.min(current.width, progress * current.distance - current.margin * 2));
        current.trail.setAttribute('width', completed);
        current.layer.dataset.progress = progress.toFixed(4);
    }
    function createScene(transition) {
        const layer = document.createElement('div');
        layer.className = 'page-transition-layer';
        layer.setAttribute('aria-hidden', 'true');
        layer.dataset.mode = transition ? 'rolling-mask-native' : 'rolling-mask-fallback';
        layer.dataset.direction = 'left-to-right';
        root.dataset.pageTransitionMode = layer.dataset.mode;
        root.dataset.pageTransitionDirection = layer.dataset.direction;
        root.dataset.pageTransitionState = 'preparing';
        const cover = transition ? null : document.createElement('div');
        if (cover) { cover.className = 'page-transition-cover'; layer.appendChild(cover); }
        const width = innerWidth, height = innerHeight;
        const size = Math.max(height * 1.35, width * .55);
        const margin = size * Math.SQRT1_2 + 4;
        const distance = width + margin * 2;
        document.body.appendChild(layer);
        root.classList.remove('page-transition-pending');
        scene = {layer, cover, transition, width, height, size, margin, distance,
            rotation: distance / (size * .45) * 180 / Math.PI, animations: [], frame: 0, timeout: 0};
        return scene;
    }
    function skipTransition(transition) {
        if (!transition) return;
        transition.ready.catch(() => {});
        transition.skipTransition();
    }
    function cleanup() {
        const current = scene;
        scene = null;
        if (current) {
            cancelAnimationFrame(current.frame);
            clearTimeout(current.timeout);
            current.animations.forEach(animation => animation.cancel());
            skipTransition(current.transition);
            current.layer.remove();
        }
        clearTimeout(navigationTimer); clearTimeout(arrivalTimer);
        root.classList.remove('page-transition-native', 'page-transition-preload', 'page-transition-pending', 'page-transition-menu-hold');
        maskStyle.maskImage = EMPTY_MASK;
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
        const desktopReady = matchMedia('(min-width: 760px)').matches
            ? window.DesktopFeaturesReady || window.DesignerFormationReady
            : null;
        await bounded(Promise.allSettled([...visibleImages.map(image => image.decode()), document.fonts?.ready,
            desktopReady]), 1600);
    }
    async function run(current) {
        current.timeout = setTimeout(() => {
            if (scene === current) { cleanup(); showPageContent(); }
        }, 5000);
        try {
            const [icons] = await Promise.all([loadIcons(), contentReady(), current.transition?.ready]);
            if (scene !== current) return;
            if (reduced.matches) { cleanup(); showPageContent(); return; }
            if (!mountMask(current, icons)) {
                root.dataset.pageTransitionState = 'no-mask';
                cleanup(); showPageContent(); return;
            }
            showPageContent();
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            if (scene !== current) return;
            root.dataset.pageTransitionState = 'running';
            // A browser timeline clock keeps mask sampling pausable and cancellable;
            // opacity stays constant. All visible geometry is inside the SVG mask.
            let clock;
            if (current.layer.animate) {
                clock = current.layer.animate([{opacity: 1}, {opacity: 1}],
                    {duration: DURATION, easing: 'cubic-bezier(.45, 0, .55, 1)', fill: 'both'});
                current.animations.push(clock);
            }
            const start = performance.now();
            await new Promise(resolve => {
                const tick = now => {
                    if (scene !== current) { resolve(); return; }
                    const elapsed = Math.min(1, Math.max(0, (now - start) / DURATION));
                    const progress = clock ? clock.effect.getComputedTiming().progress || 0
                        : elapsed * elapsed * (3 - 2 * elapsed);
                    paintMask(current, progress);
                    if (progress >= 1) resolve();
                    else current.frame = requestAnimationFrame(tick);
                };
                current.frame = requestAnimationFrame(tick);
            });
            if (scene === current) {
                root.dataset.pageTransitionState = 'complete';
                cleanup();
            }
        } catch (error) {
            if (scene === current) {
                root.dataset.pageTransitionState = 'skipped';
                console.warn('[Page transition] Rolling transition skipped.', error);
                cleanup(); showPageContent();
            }
        }
    }

    // Register in the head before the incoming document's first paint.
    window.addEventListener('pagereveal', event => {
        const transition = event.viewTransition;
        clearTimeout(arrivalTimer);
        if (!transition) { void domReady.then(fallbackArrival); return; }
        if (scene) cleanup();
        if (reduced.matches || !document.body) {
            skipTransition(transition); cleanup(); clearArrival();
            void domReady.then(showPageContent);
            return;
        }
        arriving = true;
        clearArrival();
        root.classList.remove('page-transition-preload', 'page-transition-pending');
        root.classList.add('page-transition-native');
        maskStyle.maskImage = EMPTY_MASK;
        setActive(true);
        const current = createScene(transition);
        transition.finished.finally(() => { if (scene === current) { cleanup(); showPageContent(); } });
        void run(current);
    });
    window.addEventListener('pageswap', event => {
        const traverse = event.activation?.navigationType === 'traverse';
        if (reduced.matches || (!leaving && !traverse)) skipTransition(event.viewTransition);
        clearTimeout(navigationTimer);
        leaving = false;
        setActive(false);
    });
    window.addEventListener('pageshow', event => {
        if (!event.persisted) return;
        // Reset the held mobile menu only after its outgoing snapshot is finished.
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
        if (!scene) {
            cleanup();
            if (readArrival(true) && !reduced.matches) {
                prepareArrival();
                if (nativeNavigation) arrivalTimer = setTimeout(fallbackArrival, 1000);
                else fallbackArrival();
            } else clearArrival();
        }
    });
    window.addEventListener('pagehide', () => {
        if (scene) cleanup();
        clearTimeout(navigationTimer);
    });
    reduced.addEventListener('change', () => {
        if (reduced.matches && scene) { cleanup(); showPageContent(); }
    });
    window.addEventListener('resize', () => {
        if (scene) { cleanup(); showPageContent(); }
    }, {passive: true});

    function navigate(destination, commit, menu = null) {
        if (leaving || arriving) return;
        leaving = true;
        if (menu && !menu.hidden) {
            heldMenu = menu;
            root.classList.add('page-transition-menu-hold');
            menu.classList.add('is-open');
        }
        setActive(true);
        if (!reduced.matches) {
            try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({version: 2, ...destination, time: Date.now()})); } catch { /* Native transitions do not require storage. */ }
        }
        navigationTimer = setTimeout(() => { cleanup(); clearArrival(); }, 12000);
        commit();
    }
    window.PageTransition = {
        back(steps) { return navigate({traverse: true}, () => history.go(-steps)); }
    };
    function handleLinkClick(event) {
        const link = event.target.closest?.(linkSelector);
        if (!link?.href || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
            || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
        if (url.pathname === location.pathname && url.search === location.search) {
            if (url.hash === location.hash) event.preventDefault();
            return;
        }
        event.preventDefault();
        navigate({href: url.href}, () => location.assign(url.href), mobile.matches ? link.closest('.mobile-menu') : null);
    }
    document.addEventListener('click', event => {
        if (event.target.closest?.('.mobile-menu a[href]')) handleLinkClick(event);
    }, true);
    document.addEventListener('click', handleLinkClick);

    const expectedArrival = readArrival();
    root.classList.remove('page-transition-preload');
    function prepareArrival() {
        arriving = true; setActive(true); root.classList.add('page-transition-pending');
    }
    if (expectedArrival && !reduced.matches) prepareArrival();
    if (!reduced.matches) void loadIcons();
    function fallbackArrival() {
        if (scene) return;
        if (arriving && !reduced.matches) {
            clearArrival();
            void run(createScene(null));
        } else { clearArrival(); cleanup(); showPageContent(); }
    }
    domReady.then(() => {
        if (scene) return;
        if (!nativeNavigation || !expectedArrival) fallbackArrival();
        else arrivalTimer = setTimeout(fallbackArrival, 1000);
    });
})();
