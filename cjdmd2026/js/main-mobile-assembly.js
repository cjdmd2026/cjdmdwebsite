/* A spring-driven assembly that lands directly on the first mobile poster. */
(() => {
    'use strict';
    const host = document.getElementById('mobileAssembly');
    if (!host) return;
    const root = document.documentElement;
    const stage = host.querySelector('.mobile-assembly-stage');
    const paper = host.querySelector('.mobile-assembly-paper');
    const poster = host.querySelector('.mobile-assembly-poster');
    const destination = document.querySelector('#mobile-poster-slides .mobile-poster-image img');
    const status = host.querySelector('[role="status"]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const set = window.MAIN_POSTER_SPRITES?.light;
    const scriptURL = document.currentScript.src;
    const HOLD = 480, GATHER = 3000, ASSEMBLED = HOLD + GATHER;
    const motion = window.MainPosterWipe;
    const LANDING = ASSEMBLED + 320, SHRINK = motion.timing.move;
    const REVEAL_START = LANDING + SHRINK * .9, END = REVEAL_START + motion.timing.reveal;
    const clamp = value => Math.max(0, Math.min(1, value));
    const mix = (a, b, t) => a + (b - a) * t;
    const smooth = t => t * t * (3 - 2 * t);
    const easeLanding = motion.easeInOut;
    // A short outward anticipation, a quick pull, then a damped overshoot.
    // Normalization gives every piece an exact, still destination at t = 1.
    const spring = t => 1 - Math.exp(-8.5 * t) * (Math.cos(11 * t) + 8.5 / 11 * Math.sin(11 * t));
    const springEnd = spring(1);
    const gather = t => t < .14 ? -.045 * Math.sin(t / .14 * Math.PI / 2)
        : -.045 + 1.045 * spring((t - .14) / .86) / springEnd;
    const noise = (index, salt) => {
        const value = Math.sin((index + 1) * 78.233 + salt * 37.719) * 43758.5453;
        return value - Math.floor(value);
    };
    const background = [...document.querySelectorAll('.header, .footer, .main-mobile > :not(.mobile-assembly)')];
    const inertStates = background.map(element => element.inert);
    let canvas = stage.querySelector('canvas'), batch = null, context = null, atlas = null;
    let pieces = [], ready = false, visible = true, failed = false, finished = false;
    let width = 0, height = 0, ratio = 1, large = null, small = null;
    let elapsed = 0, lastTime = null, frame = 0;

    function stop() { cancelAnimationFrame(frame); frame = 0; lastTime = null; }
    function finishOpening(error = false) {
        if (finished) return;
        finished = true;
        stop();
        root.classList.remove('mobile-assembly-active', 'mobile-assembly-shrinking');
        root.style.removeProperty('--mobile-page-reveal');
        background.forEach((element, index) => { element.inert = inertStates[index]; });
        host.dataset.state = error ? 'unavailable' : 'complete';
        status.textContent = '결합 포스터';
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        reduced.removeEventListener('change', onReducedMotion);
        batch?.dispose();
        batch = null;
        canvas.width = canvas.height = 1;
        document.dispatchEvent(new Event('main:mobile-opening-complete'));
    }
    function make2D() {
        batch?.dispose();
        batch = null;
        const replacement = canvas.cloneNode(false);
        canvas.replaceWith(replacement);
        canvas = replacement;
        context = canvas.getContext('2d', {alpha: true});
        if (!context) { failed = true; finishOpening(true); return false; }
        canvas.width = Math.max(1, Math.round(width * ratio));
        canvas.height = Math.max(1, Math.round(height * ratio));
        host.dataset.renderer = '2d';
        return true;
    }
    function fit() {
        if (finished) return;
        width = stage.clientWidth;
        height = stage.clientHeight;
        ratio = Math.min(devicePixelRatio || 1, 1.5);
        if (!set || !width || !height || !destination) return;
        const scale = Math.min((width - 24) / set.w, (height - 24) / set.h);
        large = {x: (width - set.w * scale) / 2, y: (height - set.h * scale) / 2, w: set.w * scale, h: set.h * scale};
        const rect = destination.getBoundingClientRect();
        const border = getComputedStyle(destination);
        const bx = parseFloat(border.borderLeftWidth) || 0, by = parseFloat(border.borderTopWidth) || 0;
        // Use the image content box so the last frame matches the actual card.
        small = {x: rect.left + bx, y: rect.top + by,
            w: rect.width - bx - (parseFloat(border.borderRightWidth) || 0),
            h: rect.height - by - (parseFloat(border.borderBottomWidth) || 0)};
        if (batch) batch.resize(width, height, ratio);
        else if (context) {
            canvas.width = Math.max(1, Math.round(width * ratio));
            canvas.height = Math.max(1, Math.round(height * ratio));
        }
        if (ready && !failed) draw();
    }
    function draw() {
        if (!ready || failed || finished || !large || !small) return;
        const progress = clamp((elapsed - HOLD) / GATHER);
        const landing = clamp((elapsed - LANDING) / SHRINK);
        // Desktop tweens V.move with cubic easing, then eases the displayed frame again.
        const move = easeLanding(landing), travel = easeLanding(move);
        const rect = {x: mix(large.x, small.x, travel), y: mix(large.y, small.y, travel),
            w: mix(large.w, small.w, travel), h: mix(large.h, small.h, travel)};
        const sx = rect.w / set.w, sy = rect.h / set.h;
        if (elapsed >= LANDING) {
            root.classList.add('mobile-assembly-shrinking');
            root.style.setProperty('--mobile-page-reveal', smooth(clamp((landing - .08) / .84)).toFixed(4));
            const transform = `translate3d(${rect.x}px,${rect.y}px,0) scale(${sx},${sy})`;
            paper.style.transform = poster.style.transform = transform;
            paper.style.opacity = clamp(move * 1.4);
            poster.style.opacity = easeLanding(clamp((elapsed - REVEAL_START) / motion.timing.reveal));
        }
        if (batch) batch.clear();
        else {
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            context.clearRect(0, 0, width, height);
        }
        const clock = elapsed * .0013;
        for (const piece of pieces) {
            const local = clamp((progress - piece.start) / piece.duration);
            const joined = gather(local), remaining = 1 - joined;
            const targetX = rect.x + (piece.gx + piece.gw / 2) * sx;
            const targetY = rect.y + (piece.gy + piece.gh / 2) * sy;
            const startX = piece.x * width, startY = piece.y * height;
            const arc = Math.sin(local * Math.PI) * (1 - local) * piece.bend;
            const drift = (8 + piece.depth * 14) * remaining;
            const x = mix(startX, targetX, joined) - (targetY - startY) * arc + Math.sin(piece.phase + clock) * drift;
            const y = mix(startY, targetY, joined) + (targetX - startX) * arc + Math.cos(piece.phase * 1.3 + clock) * drift * .7;
            const zoom = 1 + piece.depth * 1.3 * remaining;
            const w = piece.gw * sx * zoom, h = piece.gh * sy * zoom;
            const angle = (piece.turn + Math.sin(piece.phase + clock) * .14) * remaining;
            const alpha = mix(piece.size < 16 ? .18 : piece.size < 26 ? .5 : 1, 1, clamp(joined));
            if (x + w < 0 || x - w > width || y + h < 0 || y - h > height) continue;
            if (batch) batch.add(piece, x - w / 2, y - h / 2, w, h, angle, alpha);
            else {
                context.save();
                context.globalAlpha = alpha;
                context.translate(x, y);
                context.rotate(angle);
                context.drawImage(atlas, piece.ax, piece.ay, piece.gw, piece.gh, -w / 2, -h / 2, w, h);
                context.restore();
            }
        }
        if (batch && !batch.flush(atlas)) {
            if (make2D()) draw();
            return;
        }
        const state = elapsed >= LANDING ? 'shrinking' : elapsed >= ASSEMBLED ? 'assembled' : elapsed < HOLD ? 'scattered' : 'gathering';
        if (host.dataset.state !== state) {
            host.dataset.state = state;
            if (state === 'assembled') status.textContent = '아이콘이 모여 완성된 결합';
        }
    }
    function tick(now) {
        frame = 0;
        if (!ready || !visible || document.hidden || failed || finished) { lastTime = null; return; }
        // Instanced WebGL follows the screen refresh; the 2D fallback stays lighter.
        if (!batch && lastTime !== null && now - lastTime < 1000 / 30) { frame = requestAnimationFrame(tick); return; }
        if (lastTime !== null) elapsed = Math.min(END, elapsed + Math.min(now - lastTime, 64));
        lastTime = now;
        draw();
        if (elapsed < END && !failed && !finished) frame = requestAnimationFrame(tick);
        else finishOpening();
    }
    function resume() {
        if (ready && visible && !document.hidden && !failed && !finished && !frame) {
            lastTime = null;
            frame = requestAnimationFrame(tick);
        }
    }
    function onVisibility() {
        visible = !document.hidden;
        if (visible) resume(); else stop();
    }
    function onReducedMotion() { if (reduced.matches) finishOpening(); }
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(stage);
    if (destination) resizeObserver.observe(destination);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onReducedMotion);
    async function prepare() {
        if (reduced.matches) { finishOpening(); return; }
        background.forEach(element => { element.inert = true; });
        try {
            if (!set?.s?.length || !destination) throw new Error('Assembly artwork unavailable');
            atlas = new Image();
            atlas.decoding = 'async';
            atlas.src = new URL(set.atlas, scriptURL).href;
            await Promise.all([atlas.decode(), poster.decode()]);
            if (finished) return;
            const sizes = set.s.map(row => Math.max(row[2], row[3]));
            const min = Math.min(...sizes), max = Math.max(...sizes);
            const ranked = sizes.map((_, index) => index).sort((a, b) => sizes[b] - sizes[a] || a - b);
            const ranks = new Uint32Array(sizes.length);
            ranked.forEach((index, rank) => { ranks[index] = rank; });
            pieces = set.s.map(([gx, gy, gw, gh, ax, ay], index) => {
                const depth = (sizes[index] - min) / (max - min || 1);
                const order = .25 * (1 - depth) + .55 * ranks[index] / (sizes.length - 1) + .2 * noise(index, 5);
                const start = order * .2, end = mix(.76, 1, order);
                return {gx, gy, gw, gh, ax, ay, depth, size: sizes[index], start, duration: end - start,
                    x: noise(index, 1) * 1.12 - .06, y: noise(index, 2) * 1.12 - .06,
                    phase: noise(index, 3) * Math.PI * 2, bend: (noise(index, 4) - .5) * .26,
                    turn: (noise(index, 6) - .5) * 1.15};
            }).sort((a, b) => a.size - b.size);
            fit();
            batch = window.createHeroSpriteBatch?.(canvas) || null;
            if (batch) { batch.resize(width, height, ratio); host.dataset.renderer = 'webgl'; }
            else if (!make2D()) return;
            ready = true;
            status.textContent = '아이콘이 모이는 애니메이션 재생 중';
            document.fonts?.ready.then(fit);
            draw();
            resume();
        } catch (error) {
            failed = true;
            finishOpening(true);
            console.warn('Mobile assembly unavailable:', error);
        }
    }
    prepare();
})();
