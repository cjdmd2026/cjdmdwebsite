// Keep the original image in the heading for layout, accessibility and the final frame.
(async function assembleArchiveLogo() {
    const root = document.documentElement;
    if (!root.classList.contains('archive-logo-enter')) return;

    const image = document.querySelector('.hero .title img');
    const motion = matchMedia('screen and (min-width: 760px) and (prefers-reduced-motion: no-preference)');
    const layer = document.createElement('span');
    layer.className = 'archive-logo-assembly';
    layer.setAttribute('aria-hidden', 'true');
    const controller = new AbortController();

    function finish() {
        root.classList.remove('archive-logo-enter');
        layer.remove();
        controller.abort();
    }
    motion.addEventListener('change', finish, { signal: controller.signal });
    window.addEventListener('pagehide', finish, { signal: controller.signal });

    try {
        if (!image || !motion.matches) return;
        const response = await fetch(image.currentSrc || image.src, { signal: controller.signal });
        if (!response.ok) return;
        const doc = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
        const svg = document.importNode(doc.documentElement, true);
        const icons = [...svg.querySelectorAll('[data-logo-row] > *')];
        if (!icons.length || controller.signal.aborted) return;

        // Isolate the Illustrator fill classes from the archive's other inline SVGs.
        layer.attachShadow({ mode: 'open' }).append(svg);
        image.after(layer);
        const { width, height } = svg.viewBox.baseVal;
        const scale = image.clientWidth / width;
        if (!scale) return;
        const spreadX = Math.min(290, innerWidth * .42 / scale);
        const spreadY = Math.min(115, innerHeight * .20 / scale);
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        icons.forEach((icon, index) => {
            const box = icon.getBBox();
            const angle = index * goldenAngle;
            const radius = Math.sqrt((index + .5) / icons.length);
            const x = width / 2 + Math.cos(angle) * spreadX * radius;
            const y = height / 2 + Math.sin(angle) * spreadY * radius;
            icon.style.setProperty('--x', (x - box.x - box.width / 2) + 'px');
            icon.style.setProperty('--y', (y - box.y - box.height / 2) + 'px');
            icon.style.setProperty('--turn', (Math.sin(angle) * 38) + 'deg');
            icon.style.setProperty('--delay', (180 + radius * 280) + 'ms');
        });
        svg.classList.add('is-entering');
        await Promise.all(svg.getAnimations({ subtree: true }).map(animation => animation.finished));
    } catch (error) {
        if (!controller.signal.aborted) console.warn('Archive logo animation unavailable.', error);
    } finally {
        finish();
    }
})();
