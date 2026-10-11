(() => {
    "use strict";


    /* ========================================
       기본 설정
    ======================================== */

    const LINK_SELECTOR =
        "[page-transition]";

    /*
     * 기존 코드와 동일한 키 유지.
     * 기존 HTML의 preload 체크 코드와도 호환됨.
     */
    const STORAGE_KEY =
        "stamp-page-transition";


    // Match project_04: one soft, continuous edge travels from left to right.
    const WAVE_DURATION_MS = 1100;
    const WAVE_PRIMARY_AMPLITUDE = .075;
    const WAVE_SECONDARY_AMPLITUDE = .034;
    const WAVE_EXTENT = WAVE_PRIMARY_AMPLITUDE + WAVE_SECONDARY_AMPLITUDE;
    const IN_BLUR_PX = 12;
    const ICON_SCALE = 1.25;
    const SVG_NS = 'http://www.w3.org/2000/svg';

    const TRANSITION_COLOR =
        "#fff";

    const TRANSITION_Z_INDEX =
        999999;


    // Resolve assets from this script so nested profile pages use the same icons.
    const ICON_BASE_URL = new URL(
        '../assets/images/project/test/icon/',
        document.currentScript?.src || document.baseURI
    );
    const ICON_FILES = [
        'team-09-magmoa.svg', 'team-10-ieoon.svg', 'team-11-byeolungwan.svg',
        'team-12-kokorang.svg', 'team-13-effect.svg', 'team-14-jikji-jamboree.svg',
        'team-01-apuchika.svg', 'team-02-ommix.svg', 'team-03-phishing-ttuk.svg',
        'team-04-ilkko.svg', 'team-05-kuro.svg', 'team-06-dadeullim.svg',
        'team-07-style-lens.svg', 'team-08-geuneuljabi.svg'
    ];
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let waveFrame = 0, waveJob = null;
    let fragmentLoad = null;
    let spriteLoad = null;

    let isTransitioning =
        false;

    let activeLayer =
        null;



    /* ========================================
       Style
    ======================================== */

    const style =
        document.createElement(
            "style"
        );


    style.textContent = `

        html.page-transition-preload { background: #fff; }
        html.page-transition-preload body { opacity: 0; }

        .page-transition-layer {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100dvh;
            overflow: hidden;
            z-index: ${TRANSITION_Z_INDEX};
            pointer-events: auto;
            contain: layout paint style;
            isolation: isolate;
        }
        .page-transition-blur,
        .page-transition-surface,
        .page-transition-icons {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        .page-transition-blur {
            -webkit-backdrop-filter: blur(var(--page-transition-blur, 0px));
            backdrop-filter: blur(var(--page-transition-blur, 0px));
        }
        .page-transition-surface { display: block; fill: ${TRANSITION_COLOR}; }
        .page-transition-icons { display: block; }
        @media (prefers-reduced-motion: reduce) {
            .page-transition-icons,
            .page-transition-blur { display: none; }
        }

        /* ==============================
           페이지 콘텐츠 Fade Up
        ============================== */

        .page-enter-up {
            opacity: 0;

            transform:
                translateY(20px);

            transition:
                opacity
                700ms
                ease,

                transform
                700ms
                cubic-bezier(.22, 1, .36, 1);
        }


        .page-enter-up.is-show {
            opacity: 1;

            transform:
                translateY(0);
        }


        /* ==============================
           접근성
        ============================== */

        @media (
            prefers-reduced-motion:
            reduce
        ) {

            .page-enter-up {

                animation-duration:
                    1ms !important;

                transition-duration:
                    1ms !important;
            }

        }

    `;


    document.head.appendChild(
        style
    );



    /* ========================================
       공통 유틸
    ======================================== */

    function makeIconFragment(source, shape) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', source.getAttribute('viewBox') || '0 0 268 268');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        const chain = [];
        for (let node = shape; node && node !== source; node = node.parentElement) chain.unshift(node);
        let parent = svg;
        chain.forEach((node, index) => {
            const clone = node.cloneNode(index === chain.length - 1);
            clone.removeAttribute('id');
            parent.appendChild(clone);
            parent = clone;
        });
        return svg;
    }

    function loadIconFragments() {
        if (reducedMotion.matches) return Promise.resolve([]);
        if (!fragmentLoad) {
            fragmentLoad = Promise.allSettled(ICON_FILES.map(async file => {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 3000);
                try {
                    const response = await fetch(new URL(file, ICON_BASE_URL), {signal: controller.signal});
                    if (!response.ok) throw new Error('Icon '+response.status+' '+file);
                    const xml = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
                    if (xml.querySelector('parsererror')) throw new Error('Invalid icon '+file);
                    return [...xml.querySelectorAll('path,polygon,polyline,rect,circle,ellipse,line')]
                        .filter(shape => !shape.closest('defs,clipPath,mask'))
                        .map(shape => makeIconFragment(xml.documentElement, shape));
                } finally { clearTimeout(timeout); }
            })).then(results => {
                const failed = results.filter(result => result.status === 'rejected');
                if (failed.length) console.warn('[Page transition] Some icons could not load; continuing with available icons.');
                return results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
            });
        }
        return fragmentLoad;
    }

    function loadIconSprites() {
        if (reducedMotion.matches) return Promise.resolve([]);
        if (!spriteLoad) spriteLoad = loadIconFragments().then(fragments => {
            if (!fragments.length) return [];
            // Rasterize the unique SVG pieces once, then reuse one small atlas.
            // No per-piece DOM transforms or SVG rasterization during the wave.
            const cell = Math.ceil(156 * ICON_SCALE * Math.min(window.devicePixelRatio || 1, 1.5));
            const columns = Math.ceil(Math.sqrt(fragments.length));
            const rows = Math.ceil(fragments.length / columns);
            const svg = document.createElementNS(SVG_NS, 'svg');
            svg.setAttribute('width', columns * cell);
            svg.setAttribute('height', rows * cell);
            fragments.forEach((fragment, index) => {
                const tile = fragment.cloneNode(true);
                tile.setAttribute('x', (index % columns) * cell);
                tile.setAttribute('y', Math.floor(index / columns) * cell);
                tile.setAttribute('width', cell);
                tile.setAttribute('height', cell);
                svg.appendChild(tile);
            });
            const url = URL.createObjectURL(new Blob(
                [new XMLSerializer().serializeToString(svg)], {type: 'image/svg+xml'}
            ));
            return new Promise(resolve => {
                const image = new Image();
                const finish = sprites => {
                    clearTimeout(timeout);
                    image.onload = image.onerror = null;
                    URL.revokeObjectURL(url);
                    resolve(sprites);
                };
                const timeout = setTimeout(() => finish([]), 3000);
                image.onerror = () => finish([]);
                image.onload = () => {
                    const atlas = document.createElement('canvas');
                    atlas.width = columns * cell;
                    atlas.height = rows * cell;
                    const context = atlas.getContext('2d');
                    if (!context) { finish([]); return; }
                    context.drawImage(image, 0, 0);
                    const pixels = context.getImageData(0, 0, atlas.width, atlas.height).data;
                    finish(fragments.map((_, index) => {
                        const x = (index % columns) * cell;
                        const y = Math.floor(index / columns) * cell;
                        // Sample once so the leading pair has a readable silhouette.
                        let filled = 0;
                        for (let row = 0; row < 16; row++) {
                            for (let column = 0; column < 16; column++) {
                                const px = x + Math.floor((column + .5) * cell / 16);
                                const py = y + Math.floor((row + .5) * cell / 16);
                                if (pixels[(py * atlas.width + px) * 4 + 3] > 32) filled++;
                            }
                        }
                        return {atlas, x, y, size: cell, coverage: filled / 256};
                    }));
                };
                image.src = url;
            });
        }).catch(error => {
            console.warn('[Page transition] Icon sprites unavailable; continuing with the white wave.', error);
            return [];
        });
        return spriteLoad;
    }

    function setTransitionActive(active) {
        const root = document.documentElement;
        if (root.classList.contains('page-transition-active') === active) return;
        root.classList.toggle('page-transition-active', active);
        document.dispatchEvent(new CustomEvent('page-transition:change', {detail: {active}}));
    }

    function createLayer(mode) {
        removeLayer(false);
        const layer = document.createElement('div');
        layer.className = 'page-transition-layer';
        layer.dataset.mode = mode;
        layer.setAttribute('aria-hidden', 'true');
        // On arrival the whole page remains white while the SVG assets load.
        if (mode === 'out') layer.style.background = TRANSITION_COLOR;
        // Blur only the outgoing page, beneath the sharp wave and icon canvas.
        const blur = mode === 'in' && !reducedMotion.matches ? document.createElement('div') : null;
        if (blur) {
            blur.className = 'page-transition-blur';
            layer.appendChild(blur);
        }
        const surface = document.createElementNS(SVG_NS, 'svg');
        surface.classList.add('page-transition-surface');
        surface.setAttribute('preserveAspectRatio', 'none');
        const path = document.createElementNS(SVG_NS, 'path');
        surface.appendChild(path);
        const icons = document.createElement('canvas');
        icons.className = 'page-transition-icons';
        layer.append(surface, icons);
        document.body.appendChild(layer);
        activeLayer = layer;
        const scene = {layer, surface, path, icons, blur, mode, particles: [], context: icons.getContext('2d')};
        scene.resize = () => resizeWave(scene);
        resizeWave(scene);
        window.addEventListener('resize', scene.resize, {passive: true});
        layer.waveScene = scene;
        setTransitionActive(true);
        return scene;
    }

    function createWaveIcons(scene, sprites) {
        if (reducedMotion.matches || !sprites.length || !scene.context) return;
        const count = scene.size.width < 640 ? 56 : 96;
        const scouts = [];
        if (scene.mode === 'in') {
            const readable = sprites.filter(sprite => sprite.coverage >= .1);
            const pool = (readable.length >= 2 ? readable : sprites).slice();
            for (let index = 0; index < 2; index++) {
                scouts.push(pool.length ? pool.splice(Math.floor(Math.random() * pool.length), 1)[0] : scouts[0]);
            }
        }
        scene.particles = Array.from({length: count}, (_, index) => {
            // A dense center with gradually fewer pieces toward either side.
            // Shuffle the evenly sampled positions so they do not form rows.
            const spread = (((index * 37) % count + .5) / count) * 2 - 1;
            const scout = scene.mode === 'in' && index < 2 ? index : -1;
            return {
                sprite: scout >= 0 ? scouts[scout] : sprites[index % sprites.length],
                scout,
                lane: scout >= 0 ? .32 + scout * .34 : (index * .61803398875) % 1,
                seed: ((index * 9301 + 49297) % 233280) / 233280,
                band: Math.sign(spread) * Math.pow(Math.abs(spread), 1.45),
                offsetY: ((index * 43) % 70) - 35,
                scale: scout >= 0 ? .94 : .52 + ((index * 17) % 46) / 100,
                angle: ((index * 23) % 90) - 45,
                spin: (((index * 31) % 21) - 10) * .096
            };
        });
        scene.icons.dataset.pieces = String(count);
    }

    function resizeWave(scene) {
        const width = Math.max(1, scene.layer.clientWidth);
        const height = Math.max(1, scene.layer.clientHeight);
        const baseIconSize = Math.min(156, Math.max(76, width * .1));
        const iconSize = baseIconSize * ICON_SCALE;
        const iconSpread = Math.min(120, width * .17, iconSize * .78);
        const iconDrift = Math.min(16, iconSize * .1);
        // Keep even the outermost rotated pieces offscreen at both endpoints.
        const margin = width * WAVE_EXTENT + Math.max(baseIconSize + 72,
            iconSpread + iconDrift + iconSize * Math.SQRT1_2 + 8);
        scene.size = {width, height, iconSize, iconSpread, iconDrift, margin};
        scene.pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        scene.icons.width = Math.ceil(width * scene.pixelRatio);
        scene.icons.height = Math.ceil(height * scene.pixelRatio);
        scene.surface.setAttribute('viewBox', '0 0 '+width+' '+height);
        if (scene.progress !== undefined) paintWave(scene, scene.progress, scene.time);
    }

    function waveX(y, base, size, time) {
        // Deeper overlapping waves retain project_04's flowing edge.
        return base
            + Math.sin(y / size.height * Math.PI * 3.2 + time * .004) * size.width * WAVE_PRIMARY_AMPLITUDE
            + Math.sin(y / size.height * Math.PI * 7.4 - time * .006) * size.width * WAVE_SECONDARY_AMPLITUDE;
    }

    function paintWave(scene, progress, time) {
        const size = scene.size;
        scene.progress = progress;
        scene.time = time;
        if (scene.blur) {
            const elapsed = Math.max(0, Math.min(1, time / WAVE_DURATION_MS));
            const blurProgress = elapsed * elapsed * (3 - 2 * elapsed);
            scene.blur.style.setProperty('--page-transition-blur', (IN_BLUR_PX * blurProgress).toFixed(2) + 'px');
        }
        // The edge, all fragments and the leading pair share one eased clock.
        const motionTime = scene.mode === 'in' ? progress * WAVE_DURATION_MS : time;
        const base = -size.margin + (size.width + size.margin * 2) * progress;
        const phase = progress === 1 ? 'complete'
            : scene.mode === 'in' && time >= 180 && time < 300 ? 'scouting'
            : base < size.width * .3 ? 'entering'
            : base < size.width * .7 ? 'crossing' : 'leaving';
        if (scene.layer.dataset.phase !== phase) scene.layer.dataset.phase = phase;
        const step = size.height / 32;
        const points = Array.from({length: 33}, (_, index) => {
            const y = index * step;
            const slope = Math.cos(y / size.height * Math.PI * 3.2 + motionTime * .004) * size.width * WAVE_PRIMARY_AMPLITUDE * Math.PI * 3.2 / size.height
                + Math.cos(y / size.height * Math.PI * 7.4 - motionTime * .006) * size.width * WAVE_SECONDARY_AMPLITUDE * Math.PI * 7.4 / size.height;
            return {x: waveX(y, base, size, motionTime), y, slope};
        });
        // Cubic segments share their tangents: the edge is one smooth line.
        let d = 'M '+points[0].x.toFixed(2)+' 0';
        for (let index = 1; index < points.length; index++) {
            const a = points[index-1], b = points[index];
            d += ' C '+(a.x+a.slope*step/3).toFixed(2)+' '+(a.y+step/3).toFixed(2)
                +' '+(b.x-b.slope*step/3).toFixed(2)+' '+(b.y-step/3).toFixed(2)
                +' '+b.x.toFixed(2)+' '+b.y.toFixed(2);
        }
        // The leading edge covers the old page; the trailing edge reveals the new one.
        const side = scene.mode === 'in' ? -size.margin : size.width + size.margin;
        scene.path.setAttribute('d', d+' L '+side+' '+size.height+' L '+side+' 0 Z');
        const context = scene.context, ratio = scene.pixelRatio;
        if (!context) return;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, scene.icons.width, scene.icons.height);
        for (const particle of scene.particles) {
            const y = particle.lane * size.height + Math.sin(motionTime * .0018 + particle.seed * 12) * size.height * .035 + particle.offsetY;
            const band = particle.band * size.iconSpread
                + Math.sin(motionTime * .003 + particle.seed * 20) * size.iconDrift;
            let x = waveX(y, base, size, motionTime) + band;
            if (particle.scout >= 0) {
                const startY = particle.lane * size.height
                    + Math.sin(particle.seed * 12) * size.height * .035 + particle.offsetY;
                const startX = waveX(startY, -size.margin, size, 0)
                    + particle.band * size.iconSpread + Math.sin(particle.seed * 20) * size.iconDrift;
                const offscreen = size.iconSize * particle.scale * Math.SQRT1_2 + 12 + particle.scout * 28;
                const lead = Math.max(0, -offscreen - startX);
                // Only their spacing differs: ease it back into the same wave.
                const advance = Math.min(1, progress / .08);
                const headStart = size.iconSize * .55 * advance * (2 - advance);
                const join = Math.max(0, Math.min(1, (progress - .06) / .5));
                x += (lead + headStart) * (1 - join * join * (3 - 2 * join));
            }
            if (x < -size.iconSize || x > size.width + size.iconSize ||
                y < -size.iconSize || y > size.height + size.iconSize) continue;
            const angle = (particle.angle + particle.spin * motionTime / 1000) * Math.PI / 180;
            const scale = particle.scale * ratio;
            const cos = Math.cos(angle) * scale, sin = Math.sin(angle) * scale;
            context.setTransform(cos, sin, -sin, cos, x * ratio, y * ratio);
            const sprite = particle.sprite;
            context.drawImage(sprite.atlas, sprite.x, sprite.y, sprite.size, sprite.size,
                -size.iconSize / 2, -size.iconSize / 2, size.iconSize, size.iconSize);
        }
    }

    function finishWave(success) {
        cancelAnimationFrame(waveFrame);
        waveFrame = 0;
        const current = waveJob;
        waveJob = null;
        current?.resolve(success);
    }

    function removeLayer(resumeBackground = true) {
        finishWave(false);
        if (activeLayer) window.removeEventListener('resize', activeLayer.waveScene.resize);
        activeLayer?.remove();
        activeLayer = null;
        if (resumeBackground) setTransitionActive(false);
    }

    function animateWave(scene) {
        if (activeLayer !== scene.layer) return Promise.resolve(false);
        const size = scene.size;
        const revealing = scene.mode === 'out';
        // IN starts with every piece outside the viewport. OUT starts at the
        // edge to keep the white handoff short.
        const waveExtent = size.width * WAVE_EXTENT + 2;
        const from = revealing
            ? Math.max(0, (size.margin - waveExtent) / (size.width + size.margin * 2))
            : 0;
        // One accelerating IN includes the leading pair. OUT keeps its shorter
        // travel, taking about half a second.
        const duration = revealing ? WAVE_DURATION_MS * (1 - from) / 2 : WAVE_DURATION_MS;
        const timeOffset = revealing ? WAVE_DURATION_MS : 0;
        if (reducedMotion.matches) {
            paintWave(scene, 1, timeOffset);
            return Promise.resolve(true);
        }
        paintWave(scene, from, timeOffset);
        return new Promise(resolve => {
            const job = {scene, resolve, started: performance.now(), duration, timeOffset};
            waveJob = job;
            const tick = now => {
                if (waveJob !== job) return;
                const elapsed = Math.max(0, now-job.started);
                const fraction = Math.min(1, elapsed/job.duration);
                const travel = revealing ? fraction : fraction * fraction;
                const progress = from + (1 - from) * travel;
                paintWave(scene, progress, job.timeOffset+elapsed);
                if (fraction === 1) {
                    scene.layer.dataset.phase = 'complete';
                    finishWave(true);
                    return;
                }
                waveFrame = requestAnimationFrame(tick);
            };
            waveFrame = requestAnimationFrame(tick);
        });
    }

    reducedMotion.addEventListener('change', () => {
        if (!reducedMotion.matches || !waveJob) return;
        const {scene, duration, timeOffset} = waveJob;
        paintWave(scene, 1, timeOffset+duration);
        finishWave(true);
    });

    function isModifiedClick(
        event
    ) {

        return (
            event.metaKey
            ||
            event.ctrlKey
            ||
            event.shiftKey
            ||
            event.altKey
        );

    }



    // One continuous left-to-right wave, split only by the document navigation.
    async function playIn() {
        const scene = createLayer('in');
        const fragments = await loadIconSprites();
        if (activeLayer !== scene.layer) return false;
        createWaveIcons(scene, fragments);
        const completed = await animateWave(scene);
        if (completed && activeLayer === scene.layer) {
            scene.layer.style.background = TRANSITION_COLOR;
            scene.blur?.remove();
            scene.icons.width = 0;
        }
        return completed;
    }

    async function playOut() {
        const scene = createLayer('out');
        const fragments = await loadIconSprites();
        if (activeLayer !== scene.layer) return;
        createWaveIcons(scene, fragments);
        // Paint the first visible edge before releasing the preload cover.
        const animation = animateWave(scene);
        scene.layer.style.background = '';
        document.documentElement.classList.remove('page-transition-preload');
        await animation;
        if (activeLayer === scene.layer) removeLayer();
    }


    /* ========================================
       현재 페이지 퇴장
    ======================================== */

    async function leavePage(
        href
    ) {

        if (
            isTransitioning
        ) {
            return;
        }


        isTransitioning =
            true;


        // Fetch only the chosen destination while the current page is covered.
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.as = 'document';
        prefetch.href = href;
        document.head.appendChild(prefetch);

        try { if (!await playIn()) return; }
        catch (error) { console.warn('[Page transition] Cover animation skipped.', error); }
        finally { prefetch.remove(); }


        /*
         * 다음 페이지에
         * 전환 상태 전달
         */
        try { sessionStorage.setItem(STORAGE_KEY, '1'); }
        catch { /* Navigation still works when storage is unavailable. */ }


        window.location.href =
            href;

    }



    /* ========================================
       NAV 클릭
    ======================================== */

    function handleLinkClick(
        event
    ) {

        const link = event.target.closest?.(LINK_SELECTOR);
        if (!link || link.hasAttribute('download')) return;


        /*
         * 새 탭 / modifier click은
         * 브라우저 기본 동작 유지
         */
        if (
            event.defaultPrevented
            ||
            event.button !== 0
            ||
            isModifiedClick(
                event
            )
        ) {

            return;

        }


        const href =
            link.href;


        if (!href) {
            return;
        }


        const target =
            link.getAttribute(
                "target"
            );


        if (
            target
            &&
            target !==
                "_self"
        ) {

            return;

        }


        const url =
            new URL(
                href,
                window.location.href
            );


        /*
         * 외부 링크 제외
         */
        if (
            url.origin
            !==
            window.location.origin
        ) {

            return;

        }


        /*
         * 현재 페이지 링크 제외
         */
        if (
            url.href
            ===
            window.location.href
        ) {

            event.preventDefault();

            return;

        }


        event.preventDefault();


        leavePage(
            url.href
        );

    }



    /* ========================================
       새 페이지 진입
    ======================================== */

    async function enterPage() {
        const shouldEnter = sessionStorage.getItem(STORAGE_KEY) === '1';
        if (!shouldEnter) {
            document.documentElement.classList.remove('page-transition-preload');
            showPageContent();
            return;
        }
        sessionStorage.removeItem(STORAGE_KEY);
        isTransitioning = true;
        try { await playOut(); }
        catch (error) {
            console.warn('[Page transition] Reveal animation skipped.', error);
            removeLayer();
            document.documentElement.classList.remove('page-transition-preload');
        }
        showPageContent();
        isTransitioning = false;
    }

    /* ========================================
       페이지 콘텐츠 등장
       기존 로직 유지
    ======================================== */

    function showPageContent() {


        /* ==============================
           Manual Typewriter
        ============================== */

        const typewriters =
            document.querySelectorAll(
                '[typewriter-effect][typewriter-trigger="manual"]'
            );


        let typewriterIndex =
            0;


        typewriters.forEach(
            el => {


                /*
                 * display:none 등
                 * 현재 화면에 보이지 않는 요소 제외
                 */
                if (
                    el.offsetParent
                    ===
                    null
                ) {

                    return;

                }


                if (
                    !window.TypewriterEffect
                ) {

                    return;

                }


                window.setTimeout(
                    () => {

                        window
                            .TypewriterEffect
                            .play(
                                el
                            );

                    },

                    typewriterIndex
                    *
                    180
                );


                typewriterIndex++;

            }
        );



        /* ==============================
           .page-enter-up
        ============================== */

        const enterElements =
            document.querySelectorAll(
                ".page-enter-up"
            );


        enterElements.forEach(
            (
                el,
                index
            ) => {


                if (
                    el.offsetParent
                    ===
                    null
                ) {

                    return;

                }


                window.setTimeout(
                    () => {

                        el.classList.add(
                            "is-show"
                        );

                    },

                    100
                    +
                    index
                    *
                    100
                );

            }
        );

    }



    /* ========================================
       Boot
    ======================================== */

    function boot() {


        /* --------------------------------
           page-transition 링크 등록
        -------------------------------- */

        // Delegation also covers project/profile links rendered after boot.
        document.addEventListener('click', handleLinkClick);
        void loadIconSprites();
        window.addEventListener('pageshow', event => {
            if (!event.persisted) return;
            removeLayer();
            isTransitioning = false;
            document.documentElement.classList.remove('page-transition-preload');
            showPageContent();
        });


        /* --------------------------------
           페이지 진입 처리
        -------------------------------- */

        enterPage();

    }



    /* ========================================
       실행
    ======================================== */

    if (
        document.readyState
        ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            boot,
            {
                once:
                    true
            }
        );

    }

    else {

        boot();

    }

})();
