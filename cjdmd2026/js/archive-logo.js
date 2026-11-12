// The entry borrows positions from the live background, then returns replenished
// particles to that same flow. The original image remains the accessible final frame.
(async function assembleArchiveLogo() {
    const root = document.documentElement;
    if (!root.classList.contains('archive-logo-enter')) return;

    const image = document.querySelector('.hero .title img');
    const motion = matchMedia('screen and (min-width: 760px) and (prefers-reduced-motion: no-preference)');
    const layer = document.createElement('span');
    layer.className = 'archive-logo-assembly';
    layer.setAttribute('aria-hidden', 'true');
    const controller = new AbortController();
    const options = { signal: controller.signal };
    const animations = [];
    let field, observer;
    let timeout = setTimeout(finish, 4500);

    function finish() {
        if (controller.signal.aborted) return;
        clearTimeout(timeout);
        controller.abort();
        observer?.disconnect();
        root.classList.remove('archive-logo-enter');
        field?.release();
        animations.forEach(animation => animation.cancel());
        layer.remove();
        document.dispatchEvent(new Event('archive-logo:complete'));
    }
    function syncPlayback() {
        const paused = document.hidden || root.matches('.page-transition-preload, .page-transition-pending, .page-transition-active');
        const time = document.timeline.currentTime;
        for (const animation of animations) {
            if (animation.playState === 'finished' || animation.playState === 'idle') continue;
            if (paused) animation.pause();
            else if (animation.playState === 'paused') {
                const position = animation.currentTime || 0;
                animation.play();
                animation.startTime = time - position;
            }
        }
    }
    function waitForBackground() {
        if (window.ArchiveOutlineBackground) return Promise.resolve(window.ArchiveOutlineBackground);
        return new Promise(resolve => {
            const done = () => {
                clearTimeout(timer);
                document.removeEventListener('archive-background:ready', done);
                resolve(window.ArchiveOutlineBackground);
            };
            const timer = setTimeout(done, 2500);
            document.addEventListener('archive-background:ready', done, { ...options, once: true });
            controller.signal.addEventListener('abort', done, { once: true });
        });
    }
    motion.addEventListener('change', finish, options);
    window.addEventListener('pagehide', finish, options);
    window.addEventListener('resize', finish, options);
    window.addEventListener('scroll', () => {
        if (scrollY > innerHeight * .18) finish();
    }, { ...options, passive: true });
    document.addEventListener('visibilitychange', syncPlayback, options);
    document.addEventListener('page-transition:change', syncPlayback, options);

    try {
        if (!image || !motion.matches || scrollY > innerHeight * .18) return;
        const [response, background] = await Promise.all([
            fetch(image.currentSrc || image.src, options),
            waitForBackground(),
            image.decode()
        ]);
        if (!response.ok || !background || controller.signal.aborted) return;
        const doc = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
        if (doc.querySelector('parsererror') || doc.documentElement.localName !== 'svg' || controller.signal.aborted) return;
        const svg = document.importNode(doc.documentElement, true);
        const shapes = [...svg.querySelectorAll('path, polygon, polyline, rect, circle, ellipse, line')]
            .filter(shape => !shape.closest('defs, clipPath, mask, symbol, pattern, marker'));
        if (!shapes.length || !svg.viewBox.baseVal.width) return;

        // Illustrator classes stay isolated from the page and the background SVGs.
        const shadow = layer.attachShadow({ mode: 'open' });
        shadow.append(svg);
        layer.style.visibility = 'hidden';
        image.closest('.card').prepend(layer);
        const stage = layer.getBoundingClientRect();
        const target = image.getBoundingClientRect();
        const scale = target.width / svg.viewBox.baseVal.width;
        if (!scale || !target.height) return;
        Object.assign(svg.style, {
            position: 'absolute', display: 'block', overflow: 'visible',
            left: `${target.left - stage.left}px`, top: `${target.top - stage.top}px`,
            width: `${target.width}px`, height: `${target.height}px`
        });
        const pieces = shapes.map(shape => {
            const ink = getComputedStyle(shape).fill;
            const piece = document.createElementNS(svg.namespaceURI, 'g');
            shape.before(piece);
            piece.append(shape);
            piece.classList.add('archive-logo-piece');
            Object.assign(piece.style, { transformBox: 'fill-box', transformOrigin: 'center' });
            Object.assign(shape.style, { vectorEffect: 'non-scaling-stroke', strokeWidth: '1.25px', strokeLinejoin: 'round', strokeLinecap: 'round' });
            return { piece, shape, ink, box: piece.getBBox() };
        });

        let seed = 20261113;
        const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
        // Shuffle the geometry so large and small motifs arrive from every direction.
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }
        field = background.reserveLogoSlots(pieces.length);
        // Interleave the existing field with incoming outlines, so there is no
        // separate batch waiting for all outside pieces to enter.
        const slots = new Map(field.slots.map((slot, index) => [
            Math.floor(index * pieces.length / field.slots.length), { slot, index }
        ]));
        const headerBottom = document.querySelector('.header')?.getBoundingClientRect().bottom || 70;
        // Match main-intro/loading-assembly.js: accelerating 440ms flights
        // transfer their momentum to one body, with a damped 1400ms recoil.
        const flightTime = 440;
        const impactTime = 1400;
        let nextTakeoff = 0;
        const centerX = svg.viewBox.baseVal.width / 2;
        const centerY = svg.viewBox.baseVal.height / 2;
        const entryPositions = [];
        const createAnimation = (element, keyframes, timing) => {
            const animation = element.animate(keyframes, { ...timing, fill: 'both' });
            animation.pause();
            animation.currentTime = 0;
            animations.push(animation);
            return animation;
        };
        const arrivals = pieces.map(({ piece, shape, ink, box }, index) => {
            const assigned = slots.get(index);
            const slot = assigned?.slot;
            const size = Math.max(box.width, box.height) * scale;
            const zoom = Math.max(1.5, Math.min(18, (slot?.size || 52 + random() * 42) / Math.max(1, size)));
            const margin = size * zoom + 48;
            const inset = size * zoom * .75 + 24;
            const side = index % 4;
            // Give the entire rotated outline a visible place inside the viewport,
            // below the header and away from the central text, before its flight.
            let placement;
            const radius = size * zoom * .6;
            for (let candidate = 0; candidate < (slot ? 1 : 18); candidate++) {
                const entryX = side === 0 ? inset + random() * stage.width * .16
                    : side === 1 ? stage.width - inset - random() * stage.width * .16
                    : inset + random() * (stage.width - inset * 2);
                const entryY = side === 2 ? headerBottom + inset + random() * stage.height * .08
                    : side === 3 ? stage.height - inset - random() * stage.height * .08
                    : headerBottom + inset + random() * (stage.height - headerBottom - inset * 2);
                let room = 10;
                for (const other of entryPositions) {
                    if (nextTakeoff - other.time > 560) continue;
                    room = Math.min(room, Math.hypot(entryX - other.x, entryY - other.y) / (radius + other.radius + 18));
                }
                for (const other of field.slots) {
                    room = Math.min(room, Math.hypot(entryX - other.x + stage.left, entryY - other.y + stage.top) / (radius + other.size * .5 + 12));
                }
                if (!placement || room > placement.room) placement = { x: entryX, y: entryY, room, radius, time: nextTakeoff };
            }
            const { x: entryX, y: entryY } = placement;
            if (!slot) entryPositions.push(placement);
            const originX = slot ? slot.x - stage.left : side === 0 ? -margin : side === 1 ? stage.width + margin : entryX;
            const originY = slot ? slot.y - stage.top : side === 2 ? -margin : side === 3 ? stage.height + margin : entryY;
            const x = (originX - target.left + stage.left) / scale - box.x - box.width / 2;
            const y = (originY - target.top + stage.top) / scale - box.y - box.height / 2;
            const angle = slot?.angle ?? (random() - .5) * 90;
            // Every fragment has its own departure and contact. Never batch by direction.
            const launch = nextTakeoff;
            nextTakeoff += 6 + random() * 4;
            const entry = slot ? null : {
                start: launch, end: launch + 280,
                x: (entryX - target.left + stage.left) / scale - box.x - box.width / 2,
                y: (entryY - target.top + stage.top) / scale - box.y - box.height / 2
            };
            const floatTime = entry ? entry.end + 140 : launch;
            const driftTime = entry ? 140 : floatTime;
            const driftX = (slot?.vx ?? (random() - .5) * 12) * driftTime / 1000 / scale;
            const driftY = (slot?.vy ?? -10) * driftTime / 1000 / scale;
            const spin = (slot?.spin ?? (random() - .5) * 2) * driftTime / 1000;
            const alpha = slot?.alpha ?? .25 + random() * .22;
            piece.dataset.origin = slot ? 'background' : 'outside';
            piece.dataset.launch = String(launch);
            if (entry) piece.dataset.entryEnd = String(entry.end);
            piece.dataset.hit = String(floatTime + flightTime);
            return { piece, shape, ink, box, slotIndex: assigned?.index, slot, entry, zoom, x, y, angle, floatTime,
                fromX: (entry?.x ?? x) + driftX, fromY: (entry?.y ?? y) + driftY, fromAngle: angle + spin,
                alpha, arc: (random() < .5 ? -1 : 1) * (18 + random() * 12) / scale };
        }).sort((a, b) => a.floatTime - b.floatTime);
        const duration = arrivals.at(-1).floatTime + flightTime + impactTime;
        const impacts = [];
        const bodySamples = new Map();
        function bodyPose(time) {
            if (bodySamples.has(time)) return bodySamples.get(time);
            let x = 0, y = 0, angle = 0;
            for (const impact of impacts) {
                const t = Math.max(0, Math.min(1, (time - impact.time) / impactTime));
                const recoil = Math.sin(15 * t) * (1 - t) ** 5;
                x += impact.x * recoil;
                y += impact.y * recoil;
                angle += impact.turn * recoil;
            }
            const pose = { x, y, angle };
            bodySamples.set(time, pose);
            return pose;
        }
        function attachedPose(item, body) {
            const x = item.box.x + item.box.width / 2 - centerX;
            const y = item.box.y + item.box.height / 2 - centerY;
            const radians = body.angle * Math.PI / 180;
            return { x: body.x + x * Math.cos(radians) - y * Math.sin(radians) - x,
                y: body.y + x * Math.sin(radians) + y * Math.cos(radians) - y, angle: body.angle };
        }
        const pose = (x, y, angle, zoom = 1) => `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${zoom})`;
        for (const [index, item] of arrivals.entries()) {
            const hit = item.floatTime + flightTime;
            // Earlier hits move the seat. Aim for that moving body, then add this
            // fragment's own impulse, exactly as the main loader docks each part.
            const seat = item.seat = attachedPose(item, bodyPose(hit));
            const length = Math.hypot(seat.x - item.fromX, seat.y - item.fromY) || 1;
            const dx = (seat.x - item.fromX) / length, dy = (seat.y - item.fromY) / length;
            const vx = 2 * (seat.x - item.fromX) + Math.PI * dy * item.arc;
            const vy = 2 * (seat.y - item.fromY) - Math.PI * dx * item.arc;
            const mass = Math.sqrt(1 + index * .18);
            const strength = 18 / mass / scale / (Math.hypot(vx, vy) || 1);
            const torque = (item.box.x + item.box.width / 2 - centerX) * vy
                - (item.box.y + item.box.height / 2 - centerY) * vx;
            impacts.push({ time: hit, x: vx * strength, y: vy * strength, turn: Math.sign(torque) * .65 / mass });
        }
        // All attached fragments sample the same body at the same times, so
        // even overlapping contacts cannot pull the joined artwork apart.
        const settleTimes = [...new Set([
            ...impacts.map(impact => impact.time),
            ...Array.from({ length: Math.floor(duration / 24) }, (_, i) => (i + 1) * 24), duration
        ])].sort((a, b) => a - b);
        arrivals.forEach(item => {
            const { piece, shape, ink, slotIndex, slot, entry, zoom, x, y, angle, floatTime, fromX, fromY, fromAngle, alpha, arc } = item;
            const hit = floatTime + flightTime;
            const seat = item.seat;
            const length = Math.hypot(seat.x - fromX, seat.y - fromY) || 1;
            const dx = (seat.x - fromX) / length, dy = (seat.y - fromY) / length;
            const angleDelta = ((seat.angle - fromAngle + 540) % 360) - 180;
            const frames = [
                { offset: 0, transform: pose(x, y, angle, zoom), opacity: alpha }
            ];
            const inkFrames = [
                { offset: 0, fillOpacity: 0, stroke: '#444444', strokeOpacity: 1 }
            ];
            if (entry) {
                frames.push({ offset: entry.start / duration, transform: pose(x, y, angle, zoom), opacity: alpha,
                    easing: 'cubic-bezier(.22, 1, .36, 1)' });
                frames.push({ offset: entry.end / duration, transform: pose(entry.x, entry.y, angle, zoom), opacity: alpha });
            }
            if (floatTime > 0) {
                frames.push({ offset: floatTime / duration, transform: pose(fromX, fromY, fromAngle, zoom), opacity: alpha });
                inkFrames.push({ offset: floatTime / duration, fillOpacity: 0, stroke: '#444444', strokeOpacity: 1 });
            }
            // Quadratic acceleration keeps the arrival fast right up to contact.
            // Each fragment docks once; subsequent motion belongs to the joined body.
            for (let step = 1; step <= 16; step++) {
                const t = step / 16, pull = t * t, bend = Math.sin(Math.PI * t) * arc;
                const offset = (floatTime + flightTime * t) / duration;
                frames.push({ offset, transform: pose(
                    fromX + (seat.x - fromX) * pull - dy * bend,
                    fromY + (seat.y - fromY) * pull + dx * bend,
                    fromAngle + angleDelta * pull, 1 + (zoom - 1) * (1 - pull) ** 2),
                    opacity: alpha + (1 - alpha) * pull });
                inkFrames.push({ offset, fillOpacity: pull, strokeOpacity: 1 - pull });
            }
            inkFrames.at(-1).stroke = ink;
            for (const time of settleTimes) {
                if (time <= hit) continue;
                const body = attachedPose(item, bodyPose(time));
                frames.push({ offset: time / duration, transform: pose(body.x, body.y, body.angle), opacity: 1 });
            }
            inkFrames.push({ offset: 1, fillOpacity: 1, stroke: ink, strokeOpacity: 0 });
            const movement = createAnimation(piece, frames, { duration });
            if (entry) field.trackOutline(piece, movement, { start: entry.start, end: floatTime, fade: 120 });
            createAnimation(shape, inkFrames, { duration });
            if (slot) {
                const refill = field.refill(slotIndex, { delay: Math.max(0, floatTime - 120), duration: 1250 + random() * 150 });
                if (refill) animations.push(refill);
            }
        });

        layer.style.visibility = '';
        observer = new MutationObserver(syncPlayback);
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });
        syncPlayback();
        clearTimeout(timeout);
        // Slow assets, a stuck cover or a hidden tab must never strand the heading.
        timeout = setTimeout(finish, 18000);
        await Promise.all(animations.map(animation => animation.finished));
    } catch (error) {
        if (!controller.signal.aborted) console.warn('Archive logo animation unavailable.', error);
    } finally {
        finish();
    }
})();
