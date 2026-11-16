(() => {
    'use strict';

    // The icon version remains available in page-transition.js.
    const root = document.documentElement;
    const STORAGE_KEY = 'stamp-page-transition';
    const DURATION = 800;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 759px)');
    const nativeNavigation = 'onpagereveal' in window && 'onpageswap' in window;
    const linkSelector = '[page-transition], .header a[href], nav a[href]';
    let scene = null, leaving = false, arriving = false, contentShown = false;
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
        .page-transition-cover {
            position: absolute; inset: 0; background: #fff; pointer-events: none;
        }
        html.page-transition-menu-hold .mobile-menu {
            background: #fff; opacity: 1; transform: none; transition: none;
        }
        html.page-transition-native::view-transition { pointer-events: auto; }
        html.page-transition-native::view-transition-group(root) {
            animation: page-transition-hold 8s linear both;
        }
        html.page-transition-native::view-transition-image-pair(root) { isolation: isolate; }
        html.page-transition-native::view-transition-old(root),
        html.page-transition-native::view-transition-new(root) {
            animation: none; mix-blend-mode: normal; opacity: 1;
        }
        html.page-transition-native::view-transition-new(root) {
            clip-path: inset(0 100% 0 0);
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
    function createScene(transition) {
        const layer = document.createElement('div');
        layer.className = 'page-transition-layer';
        layer.setAttribute('aria-hidden', 'true');
        layer.dataset.mode = transition ? 'wall-native' : 'wall-fallback';
        layer.dataset.direction = 'left-to-right';
        root.dataset.pageTransitionMode = layer.dataset.mode;
        root.dataset.pageTransitionDirection = layer.dataset.direction;
        root.dataset.pageTransitionState = 'preparing';
        const cover = transition ? null : document.createElement('div');
        if (cover) { cover.className = 'page-transition-cover'; layer.appendChild(cover); }
        document.body.appendChild(layer);
        root.classList.remove('page-transition-pending');
        scene = {layer, cover, transition, animation: null, frame: 0, timeout: 0};
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
            current.animation?.cancel();
            skipTransition(current.transition);
            current.layer.remove();
        }
        clearTimeout(navigationTimer); clearTimeout(arrivalTimer);
        root.classList.remove('page-transition-native', 'page-transition-preload', 'page-transition-pending', 'page-transition-menu-hold');
        clipStyle.clipPath = 'inset(0 100% 0 0)';
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
            await Promise.all([contentReady(), current.transition?.ready]);
            if (scene !== current) return;
            if (reduced.matches) { cleanup(); showPageContent(); return; }
            showPageContent();
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            if (scene !== current) return;
            root.dataset.pageTransitionState = 'running';
            try {
                current.animation = (current.transition ? root : current.cover).animate(
                    current.transition
                        ? [{clipPath: 'inset(0 100% 0 0)'}, {clipPath: 'inset(0 0% 0 0)'}]
                        : [{clipPath: 'inset(0 0 0 0%)'}, {clipPath: 'inset(0 0 0 100%)'}],
                    {duration: DURATION, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'both',
                        ...(current.transition ? {pseudoElement: '::view-transition-new(root)'} : {})}
                );
                await current.animation.finished;
            } catch {
                if (scene !== current) return;
                // Keep a straight edge even when Web Animations are unavailable.
                const start = performance.now();
                await new Promise(resolve => {
                    const tick = now => {
                        if (scene !== current) { resolve(); return; }
                        const progress = Math.min(1, (now - start) / DURATION);
                        const eased = progress * progress * (3 - 2 * progress);
                        if (current.transition) clipStyle.clipPath = `inset(0 ${(1 - eased) * 100}% 0 0)`;
                        else current.cover.style.clipPath = `inset(0 0 0 ${eased * 100}%)`;
                        if (progress === 1) resolve();
                        else current.frame = requestAnimationFrame(tick);
                    };
                    current.frame = requestAnimationFrame(tick);
                });
            }
            if (scene === current) {
                root.dataset.pageTransitionState = 'complete';
                cleanup();
            }
        } catch (error) {
            if (scene === current) {
                root.dataset.pageTransitionState = 'skipped';
                console.warn('[Page transition] Wall transition skipped.', error);
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
        clipStyle.clipPath = 'inset(0 100% 0 0)';
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
