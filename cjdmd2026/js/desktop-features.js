/* No desktop script URLs are requested until the desktop layout is available. */
(() => {
    'use strict';
    const desktop = matchMedia('(min-width: 760px)');
    const root = document.documentElement;
    let started = false;
    root.dataset.desktopFeatures = 'idle';

    function load() {
        if (!desktop.matches || started) return;
        started = true;
        root.dataset.desktopFeatures = 'loading';
        // Download together, but execute in document order to preserve dependencies.
        const scripts = [...document.querySelectorAll('script[data-desktop-src]')].map(source =>
            new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.async = false;
                script.src = source.dataset.desktopSrc;
                script.onload = resolve;
                script.onerror = () => reject(new Error('Desktop feature: ' + script.src));
                document.head.append(script);
            })
        );
        window.DesktopFeaturesReady = Promise.all(scripts)
            .then(() => window.DesignerFormationReady)
            .then(() => { root.dataset.desktopFeatures = 'ready'; })
            .catch(error => {
                root.dataset.desktopFeatures = 'error';
                console.warn('[desktop-features]', error);
                window.DesignerPage?.changeView('grid');
                window.DesignerReturnState?.galleryFailed();
            });
    }

    desktop.addEventListener('change', load);
    load();
})();
