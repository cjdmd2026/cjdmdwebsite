/* Mobile uses its own short opening; desktop retains the full scroll sequence. */
(() => {
    'use strict';
    const mobile = matchMedia('(max-width: 759px)');
    const base = document.currentScript.src;

    function load(source) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = new URL(source, base).href;
            script.async = false;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Could not load ${source}`));
            document.head.append(script);
        });
    }

    // Re-enter the appropriate runtime when resizing across the existing mobile breakpoint.
    // This also disposes WebGL, scroll interception and timers from the desktop view.
    mobile.addEventListener('change', () => location.reload());

    async function start() {
        if (window.MainMobileView) {
            await load('main-mobile.js?v=20261118-no-arrows');
            await Promise.all([
                load('main-poster-sprites.js?v=20261104-identity-1'),
                load('main-hero-sprite-batch.js?v=20261104-solid-travel'),
                load('main-poster-wipe.js?v=20261118-pc-poster')
            ]);
            await load('main-mobile-assembly.js?v=20261118-pc-poster');
            await load('main-mobile-posters.js?v=20261118-pc-poster');
            return;
        }

        try {
            await load('https://unpkg.com/lenis@1.3.15/dist/lenis.min.js');
        } catch { /* Native scrolling remains available if the CDN is unavailable. */ }
        window.lenis = typeof Lenis === 'function'
            ? new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: .75 }) : null;
        if (window.lenis) {
            const frame = time => { window.lenis.raf(time); requestAnimationFrame(frame); };
            requestAnimationFrame(frame);
        }

        const desktopScripts = [
            'main-intro-loading.js?v=20261108-hero-reveal',
            'stamp-effect-transition.js',
            'student-mouse-effect.js?v=20261114-geuneuljabi-name',
            'designer-icon-data.js?v=20261114-geuneuljabi-name',
            'main-poster-sprites.js?v=20261104-identity-1',
            'main-scroll-input.js?v=20261030-1',
            'main-section-scroll.js?v=20261104-depth-passage',
            'main-hero-sprite-batch.js?v=20261104-solid-travel',
            'main-hero.js?v=20261113-poster-backdrop-transition',
            'main-intro.js?v=20261114-reading-fill-60',
            'committee-icon-transition.js?v=20261113-white-layer',
            'main.js?v=20261116-professor-rounded-depth'
        ];
        for (const source of desktopScripts) {
            try { await load(source); }
            catch (error) {
                console.error(error);
                document.documentElement.classList.remove('intro-loading');
                if (source.startsWith('main-intro.js')) {
                    window.MainIntroLoadFailed = true;
                    window.MainIntroLoading?.fail();
                }
            }
        }
    }
    start().catch(error => {
        console.error(error);
        document.documentElement.classList.remove('intro-loading', 'mobile-assembly-active', 'mobile-assembly-shrinking');
        const assembly = document.getElementById('mobileAssembly');
        if (assembly) {
            assembly.dataset.state = 'unavailable';
            assembly.querySelector('[role="status"]').textContent = '결합 그래픽';
        }
    });
})();
