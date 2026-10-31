/* Loaded with Lenis only on desktop; stop its frame loop in the mobile layout. */
(() => {
    'use strict';
    if (!window.Lenis) return;
    const desktop = matchMedia('(min-width: 760px)');
    let frame = 0;

    function tick(time) {
        if (!desktop.matches || document.hidden || !window.lenis) { frame = 0; return; }
        window.lenis.raf(time);
        frame = requestAnimationFrame(tick);
    }
    function sync() {
        cancelAnimationFrame(frame);
        frame = 0;
        if (!desktop.matches) {
            window.lenis?.destroy();
            window.lenis = null;
            return;
        }
        if (!window.lenis) {
            window.lenis = new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 1.25 });
            if (document.documentElement.dataset.projectFluidView === 'slide') window.lenis.stop();
        }
        if (!document.hidden) frame = requestAnimationFrame(tick);
    }
    desktop.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pageshow', sync);
    window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); frame = 0; });
    sync();
})();
