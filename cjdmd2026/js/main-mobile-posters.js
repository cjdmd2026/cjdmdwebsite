/* Desktop poster switching, without the mobile slider dots or arrow controls. */
(() => {
    'use strict';
    const section = document.getElementById('hero');
    const button = document.getElementById('mobilePosterSwitch');
    if (!section || !button) return;
    const posterCanvas = document.getElementById('mobilePosterCanvas');
    const fxCanvas = document.getElementById('mobilePosterFx');
    const image = button.querySelector('img');
    const label = section.querySelector('[data-poster-label]');
    const download = section.querySelector('[data-poster-download]');
    const posters = window.MAIN_POSTERS;
    const motion = window.MainPosterWipe;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const images = posters.map(poster => {
        const result = new Image();
        result.decoding = 'async';
        result.src = new URL(poster.image, document.baseURI).href;
        return result;
    });
    let renderer = null, ready = false, visible = false, loading = false;
    let current = 0, from = 0, progress = 1, mode = 'wipe';
    let frame = 0, timer = 0, started = null, sizeKey = '';
    let pointer = null, lastSwipe = -Infinity;
    const openingDone = () => !document.documentElement.classList.contains('mobile-assembly-active');
    function sync() {
        const poster = posters[current];
        section.dataset.activeSlide = String(current);
        section.dataset.theme = poster.theme;
        label.textContent = poster.label;
        image.src = images[current].src;
        image.alt = poster.label;
        download.href = poster.pdf;
        download.setAttribute('aria-label', `${poster.label} PDF 다운로드`);
    }
    function paint() { renderer?.draw({from, to: current, progress, mode}); }
    function settle() {
        cancelAnimationFrame(frame);
        frame = 0;
        progress = 1;
        started = null;
        paint();
        section.dataset.posterMotion = 'idle';
        button.removeAttribute('aria-busy');
    }
    function stopAuto() { clearInterval(timer); timer = 0; }
    function startAuto() {
        if (timer || !ready || !visible || !openingDone() || document.hidden || reduced.matches || section.querySelector(':focus-visible')) return;
        timer = setInterval(() => { void goTo(current + 1, 'wipe'); }, motion.timing.autoInterval);
    }
    function tick(now) {
        if (document.hidden || !visible) { settle(); return; }
        if (started === null) started = now;
        const duration = mode === 'fade' ? motion.timing.clickSwitch : motion.timing.posterWipe;
        progress = Math.min(1, (now - started) / duration);
        paint();
        if (progress < 1) frame = requestAnimationFrame(tick);
        else settle();
    }
    async function goTo(index, nextMode = 'fade') {
        index = (index + posters.length) % posters.length;
        if (!ready || !openingDone() || loading || index === current) return;
        loading = true;
        try { await images[index].decode(); }
        catch { loading = false; return; }
        loading = false;
        settle();
        from = current;
        current = index;
        mode = nextMode;
        sync();
        if (reduced.matches || !renderer || !visible || document.hidden) { settle(); return; }
        progress = 0;
        started = null;
        section.dataset.posterMotion = mode;
        button.setAttribute('aria-busy', 'true');
        paint();
        frame = requestAnimationFrame(tick);
    }
    function measure() {
        if (!renderer) return;
        const rect = image.getBoundingClientRect(), surface = fxCanvas.getBoundingClientRect();
        const ratio = Math.min(devicePixelRatio || 1, 1.5);
        const size = {width: rect.width, height: rect.height, ratio,
            surfaceWidth: surface.width, surfaceHeight: surface.height, x: rect.left - surface.left, y: rect.top - surface.top};
        const key = Object.values(size).join(':');
        if (key === sizeKey || !rect.width || !rect.height) return;
        sizeKey = key;
        renderer.resize(size);
        paint();
    }
    button.addEventListener('click', () => {
        if (performance.now() - lastSwipe < 450) return;
        stopAuto();
        void goTo(current + 1, 'fade');
        startAuto();
    });
    button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        void goTo(event.key === 'Home' ? 0 : event.key === 'End' ? posters.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
    });
    button.addEventListener('pointerdown', event => { pointer = {x: event.clientX, y: event.clientY}; });
    button.addEventListener('pointercancel', () => { pointer = null; });
    button.addEventListener('pointerup', event => {
        if (!pointer) return;
        const x = event.clientX - pointer.x, y = event.clientY - pointer.y;
        pointer = null;
        if (Math.abs(x) < 36 || Math.abs(x) < Math.abs(y) * 1.4) return;
        lastSwipe = performance.now();
        stopAuto();
        void goTo(current + (x < 0 ? 1 : -1), 'wipe');
        startAuto();
    });
    section.addEventListener('focusin', stopAuto);
    section.addEventListener('focusout', () => { queueMicrotask(startAuto); });
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= .2;
        if (visible) startAuto();
        else { stopAuto(); settle(); }
    }, {threshold: [0, .2]}).observe(button);
    new ResizeObserver(measure).observe(button);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { stopAuto(); settle(); }
        else startAuto();
    });
    document.addEventListener('main:mobile-opening-complete', startAuto, {once: true});
    reduced.addEventListener('change', () => {
        if (reduced.matches) { stopAuto(); settle(); }
        else startAuto();
    });
    async function prepare() {
        try {
            await images[0].decode();
            renderer = motion.create({posterCanvas, fxCanvas, posters, posterImages: images});
            measure();
            posterCanvas.hidden = false;
        } catch (error) {
            console.warn('Mobile poster effect unavailable:', error);
            renderer = null;
            posterCanvas.hidden = true;
        }
        ready = true;
        section.dataset.posterReady = 'true';
        sync();
        startAuto();
    }
    prepare();
})();
