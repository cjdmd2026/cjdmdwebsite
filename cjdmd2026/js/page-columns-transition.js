/* Site-wide Columns navigation. The previous icon and wall transitions remain
 * in their original files. Motion follows Codrops Interlude (MIT; see
 * interlude-MIT-LICENSE.txt): 700ms per bar, staggered by 60ms.
 * Mobile rotates the panel layout to sweep from left to right. */
(() => {
    'use strict';
    if (window.PageTransition?.mode === 'columns') return;
    const root = document.documentElement;
    const STORAGE_KEY = 'columns-page-transition';
    const BAR_DURATION = 700, STAGGER = 60;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const selector = '[page-transition], .header a[href], nav a[href]';
    const domReady = document.readyState === 'loading'
        ? new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, {once: true}))
        : Promise.resolve();
    let scene = null, leaving = false, arriving = false, contentShown = false;
    let watchdog = 0, heldMenuButton = null;

    const style = document.createElement('style');
    style.textContent = `
        @view-transition { navigation: none; }
        html.page-transition-pending::after {
            content: ''; position: fixed; inset: 0; z-index: 999999; background: #f2f2f2;
        }
        .page-transition-layer {
            position: fixed; inset: 0; width: 100%; height: 100dvh;
            z-index: 999999; pointer-events: auto; overflow: hidden;
            contain: layout paint style; isolation: isolate;
        }
        .page-transition-column {
            position: absolute; top: 0; height: 100%; background: #f2f2f2;
            pointer-events: none; will-change: transform;
        }
        .page-enter-up {
            opacity: 0; transform: translateY(20px);
            transition: opacity 700ms ease, transform 700ms cubic-bezier(.22,1,.36,1);
        }
        .page-enter-up.is-show { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
            .page-enter-up { transition-duration: 1ms !important; }
        }
    `;
    document.head.append(style);

    function readArrival() {
        try {
            const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
            if (value?.version !== 1 || Date.now() - value.time > 20000) return null;
            return value.traverse || value.href === location.href ? value : null;
        } catch { return null; }
    }
    function clearArrival() {
        try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* Storage is optional. */ }
    }
    function setActive(active) {
        if (root.classList.contains('page-transition-active') === active) return;
        root.classList.toggle('page-transition-active', active);
        document.dispatchEvent(new CustomEvent('page-transition:change', {detail: {active}}));
    }
    function cleanup() {
        clearTimeout(watchdog);
        const current = scene;
        scene = null;
        if (current) {
            current.animations.forEach(animation => animation.cancel());
            current.layer.remove();
        }
        root.classList.remove('page-transition-pending', 'page-transition-preload');
        leaving = arriving = false;
        setActive(false);
    }
    function showPageContent() {
        if (contentShown) return;
        contentShown = true;
        let index = 0;
        document.querySelectorAll('[typewriter-effect][typewriter-trigger="manual"]').forEach(element => {
            if (element.offsetParent !== null && window.TypewriterEffect) {
                setTimeout(() => window.TypewriterEffect.play(element), index++ * 180);
            }
        });
        document.querySelectorAll('.page-enter-up').forEach((element, i) => {
            if (element.offsetParent !== null) setTimeout(() => element.classList.add('is-show'), 100 + i * 100);
        });
    }
    async function contentReady() {
        await domReady;
        const images = [...document.images].filter(image => {
            const bounds = image.getBoundingClientRect();
            return bounds.width && bounds.height && bounds.bottom > 0 && bounds.top < innerHeight;
        }).slice(0, 12);
        const desktopReady = innerWidth >= 760 ? window.DesktopFeaturesReady || window.DesignerFormationReady : null;
        let timer;
        await Promise.race([
            Promise.allSettled([...images.map(image => image.decode()), document.fonts?.ready, desktopReady]),
            new Promise(resolve => { timer = setTimeout(resolve, 1600); })
        ]);
        clearTimeout(timer);
    }
    function createScene(entering, back = false) {
        const horizontal = innerWidth < 768;
        const count = horizontal ? 3 : 5;
        const axis = horizontal ? 'X' : 'Y', sign = horizontal ? -1 : 1;
        const layer = document.createElement('div');
        layer.className = 'page-transition-layer';
        layer.setAttribute('aria-hidden', 'true');
        layer.dataset.mode = 'columns';
        layer.dataset.axis = axis.toLowerCase();
        const bars = Array.from({length: count}, (_, index) => {
            const bar = document.createElement('div');
            bar.className = 'page-transition-column';
            Object.assign(bar.style, horizontal
                ? {left: '0', top: `${index * 100 / count}%`, width: '100%', height: `calc(${100 / count}% + 1px)`}
                : {left: `${index * 100 / count}%`, width: `calc(${100 / count}% + 1px)`});
            bar.style.transform = `translate${axis}(${entering ? 0 : 100 * sign}%)`;
            layer.append(bar);
            return bar;
        });
        document.body.append(layer);
        root.classList.remove('page-transition-pending');
        root.dataset.pageTransitionMode = 'columns';
        root.dataset.pageTransitionColumns = String(count);
        root.dataset.pageTransitionAxis = axis.toLowerCase();
        root.dataset.pageTransitionDirection = back ? 'right-to-left' : 'left-to-right';
        scene = {layer, bars, back, axis, sign, animations: []};
        return scene;
    }
    async function runPhase(current, entering) {
        root.dataset.pageTransitionState = entering ? 'entering' : 'leaving';
        const target = entering ? -100 * current.sign : 0;
        if (!reduced.matches && typeof current.layer.animate === 'function') {
            const phaseDuration = BAR_DURATION + (current.bars.length - 1) * STAGGER;
            const clamp = value => Math.max(0, Math.min(1, value));
            const ease = entering ? t => 1 - (1 - t) ** 3
                : t => t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
            current.animations = current.bars.map((bar, index) => {
                const order = current.back ? current.bars.length - 1 - index : index;
                const delay = order * STAGGER;
                const offsets = [...new Set([
                    ...Array.from({length: 61}, (_, i) => i / 60), delay / phaseDuration, (delay + BAR_DURATION) / phaseDuration
                ].map(clamp))].sort((a, b) => a - b);
                return bar.animate(offsets.map(offset => ({offset,
                    transform: `translate${current.axis}(${current.sign * ((entering ? 0 : 100) - 100 * ease(clamp((offset * phaseDuration - delay) / BAR_DURATION)))}%)`
                })), {duration: phaseDuration, fill: 'both', easing: 'linear'});
            });
            await Promise.allSettled(current.animations.map(animation => animation.finished));
        }
        if (scene !== current) return;
        current.bars.forEach(bar => { bar.style.transform = `translate${current.axis}(${target}%)`; });
        current.animations.forEach(animation => animation.cancel());
        current.animations = [];
    }
    function prepareArrival() {
        arriving = true;
        root.classList.add('page-transition-pending');
        setActive(true);
    }
    async function reveal(record) {
        if (scene || !arriving) return;
        await domReady;
        if (!arriving) return;
        const current = createScene(true, Boolean(record?.back));
        clearArrival();
        watchdog = setTimeout(() => { cleanup(); showPageContent(); }, 5000);
        try {
            await contentReady();
            if (scene !== current) return;
            showPageContent();
            await runPhase(current, true);
        } catch (error) {
            console.warn('[Page transition] Columns reveal skipped.', error);
        } finally {
            if (scene === current) {
                root.dataset.pageTransitionState = 'complete';
                cleanup(); showPageContent();
            }
        }
    }
    async function navigate(destination, commit, menuButton = null) {
        if (leaving || arriving) return false;
        if (reduced.matches) { clearArrival(); commit(); return true; }
        leaving = true; heldMenuButton = menuButton;
        setActive(true);
        const current = createScene(false, Boolean(destination.back));
        watchdog = setTimeout(() => {
            cleanup(); clearArrival(); root.dataset.pageTransitionState = 'cancelled';
        }, 12000);
        try {
            await runPhase(current, false);
            if (scene !== current) return false;
            // Reset the mobile menu while fully covered, so history restores a usable page.
            if (heldMenuButton?.getAttribute('aria-expanded') === 'true') heldMenuButton.click();
            heldMenuButton = null;
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify({version: 1, ...destination, time: Date.now()}));
            } catch { /* The destination can also identify same-origin navigation. */ }
            root.dataset.pageTransitionState = 'covered';
            commit();
            return true;
        } catch (error) {
            cleanup(); clearArrival(); commit();
            console.warn('[Page transition] Columns skipped.', error);
            return false;
        }
    }
    window.PageTransition = {
        mode: 'columns',
        back(steps = 1) {
            if (!Number.isInteger(steps) || steps < 1 || steps >= history.length) return false;
            return navigate({traverse: true, back: true}, () => history.go(-steps));
        }
    };
    function canonicalPath(path) { return path.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/'; }
    function handleLink(event) {
        const link = event.target.closest?.(selector);
        if (!link?.href || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
            || link.hasAttribute('download') || (link.target && link.target !== '_self')) return false;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return false;
        if (canonicalPath(url.pathname) === canonicalPath(location.pathname) && url.search === location.search) {
            if (url.hash === location.hash) event.preventDefault();
            return false;
        }
        event.preventDefault();
        const button = link.closest('.mobile-menu') ? document.querySelector('.menu-button') : null;
        void navigate({href: url.href}, () => location.assign(url.href), button);
        return true;
    }
    // Hold an open mobile menu until its covering phase finishes.
    document.addEventListener('click', event => {
        if (event.target.closest?.('.mobile-menu a[href]') && handleLink(event)) event.stopPropagation();
    }, true);
    document.addEventListener('click', handleLink);
    window.addEventListener('pagehide', () => { clearTimeout(watchdog); });
    window.addEventListener('pageshow', event => {
        if (!event.persisted) return;
        const record = readArrival();
        cleanup();
        if (!reduced.matches) { prepareArrival(); void reveal(record); }
        else { clearArrival(); showPageContent(); }
    });
    reduced.addEventListener('change', () => {
        if (reduced.matches) scene?.animations.forEach(animation => { try { animation.finish(); } catch { animation.cancel(); } });
    });

    const record = readArrival();
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    let sameOriginArrival = false;
    try { sameOriginArrival = navigationType === 'navigate' && document.referrer && new URL(document.referrer).origin === location.origin; } catch { /* No referrer. */ }
    root.classList.remove('page-transition-preload');
    if (!reduced.matches && (record || navigationType === 'back_forward' || sameOriginArrival)) prepareArrival();
    domReady.then(() => {
        if (arriving) void reveal(record);
        else { clearArrival(); showPageContent(); }
    });
})();
