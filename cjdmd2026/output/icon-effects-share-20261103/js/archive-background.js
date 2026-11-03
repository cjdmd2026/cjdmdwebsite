/* =========================================================
   6. Floating Outline Background
   Extracted from js/archive.js; no gallery, history, or Lenis dependency.
========================================================= */
;(() => {
    "use strict";

    // Original archive desktop breakpoint. Keep this inside the isolated effect.
    const archiveDesktop = matchMedia("(min-width: 760px)");

    // Replace these entries with your SVG URLs (relative to the HTML page).
    const ICON_URLS = [
        "../assets/images/project/test/icon/team-01-apuchika.svg",
        "../assets/images/project/test/icon/team-02-ommix.svg",
        "../assets/images/project/test/icon/team-03-phishing-ttuk.svg",
        "../assets/images/project/test/icon/team-04-ilkko.svg",
        "../assets/images/project/test/icon/team-05-kuro.svg",
        "../assets/images/project/test/icon/team-06-dadeullim.svg",
        "../assets/images/project/test/icon/team-07-style-lens.svg",
        "../assets/images/project/test/icon/team-08-geuneuljabi.svg",
        "../assets/images/project/test/icon/team-09-magmoa.svg",
        "../assets/images/project/test/icon/team-10-ieoon.svg",
        "../assets/images/project/test/icon/team-11-byeolungwan.svg",
        "../assets/images/project/test/icon/team-12-kokorang.svg",
        "../assets/images/project/test/icon/team-13-effect.svg",
        "../assets/images/project/test/icon/team-14-jikji-jamboree.svg"
    ];

    const BACKGROUND = "#ffffff";
    const LINE_COLOR = "#444444";
    const STROKE_WIDTH = 1.25;
    const TILE_HEIGHT_VH = 80;
    const FLOW_SPEED = 18;
    const GRAB_PADDING = 12;
    const SNAP_DISTANCE = 24;
    const HOLD_SCALE = 1.25;
    const MANUAL_MERGE_DURATION = 0.85;
    const MANUAL_MERGE_HOLD = 3;
    const MERGE_DURATION = 0.65;
    const MERGE_HOLD = 1.05;
    const SPLIT_IMPULSE = 175;
    const MERGE_COOLDOWN = 7;
    const MAX_MERGES = 2;
    const VELOCITY_DRAG = 1.5;
    const HOST_ID = "cjdmd-floating-outline-background";
    const BODY_CLASS = "cjdmd-outline-background-active";
    const SVG_NS = "http://www.w3.org/2000/svg";
    const SHAPES = "path, rect, circle, ellipse, polygon, polyline, line";
    const GEOMETRY_ATTRIBUTES = [
        "d", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r",
        "rx", "ry", "width", "height", "points", "transform"
    ];

    async function loadIcon(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`SVG HTTP ${response.status}: ${url}`);

        const document = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
        const svg = document.documentElement;
        if (document.querySelector("parsererror") || svg.localName !== "svg") {
            throw new Error(`Invalid SVG: ${url}`);
        }
        return svg;
    }

    function groupShapesByColor(source) {
        const groups = new Map();
        source.querySelectorAll(SHAPES).forEach(shape => {
            if (shape.closest("defs, clipPath, mask, symbol, pattern, marker")) return;
            let color = "#000000";
            for (let node = shape; node; node = node.parentElement) {
                const fill = node.style?.fill || node.getAttribute("fill");
                if (fill && fill !== "inherit") { color = fill.trim().toLowerCase(); break; }
                if (node === source) break;
            }
            if (/^#[0-9a-f]{3}$/.test(color)) {
                color = "#" + [...color.slice(1)].map(value => value + value).join("");
            }
            if (!groups.has(color)) groups.set(color, []);
            groups.get(color).push(shape);
        });
        return groups;
    }

    function createPiece(shapes, source, index, color) {
        const piece = document.createElement("div");
        piece.className = "piece";
        piece.dataset.icon = source.id;
        piece.dataset.color = color;
        const properties = {
            "--size": `${56 + (index * 13) % 46}px`,
            "--rot": `${((index * 31) % 92) - 46}deg`,
            "--alpha": `${(0.28 + (index % 6) * 0.07) * ((index + 1) % 7 === 0 ? 0.72 : 1)}`,
        };
        Object.entries(properties).forEach(([name, value]) => piece.style.setProperty(name, value));

        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("viewBox", source.getAttribute("viewBox") || "-14 -14 268 268");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        const colorGroup = document.createElementNS(SVG_NS, "g");
        colorGroup.setAttribute("class", "color-group");
        // Same-color shapes keep their original layout and always move as one piece.
        shapes.forEach(shape => {
            const outline = document.createElementNS(SVG_NS, shape.localName);
            GEOMETRY_ATTRIBUTES.forEach(name => {
                if (shape.hasAttribute(name)) outline.setAttribute(name, shape.getAttribute(name));
            });
            let branch = outline;
            for (let parent = shape.parentElement; parent && parent !== source; parent = parent.parentElement) {
                if (!parent.hasAttribute("transform")) continue;
                const group = document.createElementNS(SVG_NS, "g");
                group.setAttribute("transform", parent.getAttribute("transform"));
                group.append(branch);
                branch = group;
            }
            colorGroup.append(branch);
        });
        svg.append(colorGroup);
        piece.append(svg);
        return piece;
    }

    function createFlow(host) {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const particles = new Map();
        let activeDrag = null;
        const merges = new Set();
        let width = host.clientWidth;
        let height = host.clientHeight;
        let frame = 0;
        let pageActive = true;
        let lastTime = null;
        let elapsed = 0;
        let nextCollisionCheck = 0;
        let nextMerge = 0;
        const transitionActive = () => !archiveDesktop.matches || document.documentElement.matches(
            '.page-transition-preload, .page-transition-active'
        );

        function canAnimate() {
            return pageActive && host.isConnected && !document.hidden && !transitionActive() &&
                (!reducedMotion.matches || merges.size > 0);
        }

        // A collision can request a frame from inside tick(). All callers must
        // share this guard so its final scheduling step cannot create a second loop.
        function scheduleFrame() {
            if (frame) return;
            if (!canAnimate()) {
                lastTime = null;
                host.dataset.motion = 'paused';
                return;
            }
            if (host.dataset.motion !== 'running') host.dataset.motion = 'running';
            frame = requestAnimationFrame(tick);
        }

        function stopFrame() {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            lastTime = null;
            host.dataset.motion = 'paused';
        }

        const lerp = (from, to, amount) => from + (to - from) * amount;

        function feedbackPose(particle) {
            const wobble = reducedMotion.matches ? 0 : particle.wobble;
            const age = elapsed - particle.splitAt;
            const recoil = !reducedMotion.matches && age < 1 ? Math.sin(age * 18) * Math.exp(-age * 6) * 0.16 : 0;
            const scale = (particle.merge ? particle.mergeScale :
                1 + (particle.releaseScale - 1) * Math.exp(-age * 9)) * particle.holdScale;
            const sway = Math.sin(particle.wobblePhase) * wobble;
            return {
                x: particle.x + sway * particle.wobbleTravel,
                y: particle.y,
                angle: particle.angle + sway * particle.wobbleAngle,
                scale, recoil
            };
        }

        function paint(particle, hostTop) {
            const margin = particle.size;
            const screenY = particle.y + hostTop;
            const visible = screenY > -margin && screenY < window.innerHeight + margin;
            if (visible !== particle.visible) {
                particle.element.style.visibility = visible ? "visible" : "hidden";
                particle.visible = visible;
            }
            if (visible) {
                const { x, y, angle, scale, recoil } = feedbackPose(particle);
                particle.element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scale * (1 + recoil)}, ${scale * (1 - recoil * 0.6)})`;
            }
        }

        function finishMerge(merge, burst = true) {
            merges.delete(merge);
            merge.element.remove();
            [merge.a, merge.b].forEach((particle, index) => {
                const direction = index ? 1 : -1;
                if (burst || reducedMotion.matches) {
                    const separation = reducedMotion.matches ? merge.size * 0.6 : 8;
                    particle.x = merge.x + merge.nx * direction * separation;
                    particle.y = merge.y + merge.ny * direction * separation;
                    particle.vx = reducedMotion.matches ? 0 : merge.vx + merge.nx * direction * SPLIT_IMPULSE;
                    particle.vy = reducedMotion.matches ? 0 : merge.vy + merge.ny * direction * SPLIT_IMPULSE;
                }
                particle.merge = null;
                particle.releaseScale = burst && !reducedMotion.matches ? particle.mergeScale : 1;
                particle.splitAt = reducedMotion.matches ? -Infinity : elapsed;
                particle.mergeAfter = elapsed + MERGE_COOLDOWN + Math.random() * 3;
                particle.element.style.removeProperty("--merge-alpha");
            });
        }

        function beginMerge(first, second, manual = false) {
            const a = first.particle, b = second.particle;
            const dx = second.x - first.x, dy = second.y - first.y;
            const distance = Math.hypot(dx, dy);
            const element = document.createElement("div");
            element.className = "piece fusion-piece";
            element.dataset.fusion = "joining";
            element.dataset.trigger = manual ? "drop" : "collision";
            const svg = a.element.querySelector("svg").cloneNode(false);
            // Keep both original geometries in one SVG while they form a single icon.
            [a, b].forEach(particle => {
                Array.from(particle.element.querySelector("svg").children).forEach(shape => {
                    svg.append(shape.cloneNode(true));
                });
            });
            element.append(svg);
            const size = Math.min((a.element.clientWidth + b.element.clientWidth) * 0.55, window.innerWidth * 0.14);
            element.style.width = `${size}px`;
            element.style.setProperty("--alpha", (parseFloat(a.element.style.getPropertyValue("--alpha")) +
                parseFloat(b.element.style.getPropertyValue("--alpha"))) / 2);
            element.style.setProperty("--merge-alpha", "0");
            a.stage.parentElement.append(element);
            const merge = {
                a, b, element, started: elapsed, size,
                duration: reducedMotion.matches ? 0 : manual ? MANUAL_MERGE_DURATION : MERGE_DURATION,
                hold: manual ? MANUAL_MERGE_HOLD : MERGE_HOLD,
                manual,
                x: (a.x + b.x) / 2, y: (a.y + b.y) / 2,
                vx: (a.vx + b.vx) / 2, vy: (a.vy + b.vy) / 2,
                angle: a.angle + ((b.angle - a.angle + 540) % 360 - 180) / 2,
                nx: distance < 1 ? Math.cos(a.phase) : dx / distance,
                ny: distance < 1 ? Math.sin(a.phase) : dy / distance,
                origins: [a, b].map(particle => {
                    const pose = feedbackPose(particle);
                    return {
                        x: pose.x, y: pose.y, angle: pose.angle,
                        fromScale: pose.scale,
                        scale: size / particle.element.clientWidth
                    };
                })
            };
            [a, b].forEach((particle, index) => {
                const origin = merge.origins[index];
                particle.x = origin.x;
                particle.y = origin.y;
                particle.angle = origin.angle;
                particle.holdScale = 1;
                particle.wobble = 0;
                particle.mergeScale = origin.fromScale;
            });
            a.merge = b.merge = merge;
            merges.add(merge);
            nextMerge = elapsed + 0.8;
            // Reduced motion skips the approach but still observes the split timer.
            if (reducedMotion.matches) animateMerges(0);
            scheduleFrame();
        }

        function animateMerges(dt) {
            merges.forEach(merge => {
                const age = elapsed - merge.started;
                if (age >= merge.duration + merge.hold) {
                    finishMerge(merge);
                    return;
                }
                if (!reducedMotion.matches) {
                    merge.x += merge.vx * dt;
                    merge.y += merge.vy * dt;
                }
                const progress = merge.duration ? Math.min(1, age / merge.duration) : 1;
                const ease = merge.manual ? progress * progress * (3 - 2 * progress) : 1 - Math.pow(1 - progress, 3);
                const arc = merge.manual ? Math.sin(progress * Math.PI) * 12 : 0;
                const fade = Math.max(0, Math.min(1, (progress - 0.75) / 0.25));
                [merge.a, merge.b].forEach((particle, index) => {
                    const origin = merge.origins[index];
                    const direction = index ? 1 : -1;
                    particle.x = lerp(origin.x, merge.x, ease) - merge.ny * arc * direction;
                    particle.y = lerp(origin.y, merge.y, ease) + merge.nx * arc * direction;
                    particle.angle = origin.angle + ((merge.angle - origin.angle + 540) % 360 - 180) * ease;
                    particle.mergeScale = lerp(origin.fromScale, origin.scale, ease);
                    particle.element.style.setProperty("--merge-alpha", 1 - fade);
                });
                const hold = Math.max(0, age - merge.duration);
                const squeeze = reducedMotion.matches ? 0 : Math.max(0, (hold - merge.hold + 0.22) / 0.22);
                const pulse = reducedMotion.matches ? 1 : 1 + Math.sin(hold * Math.PI / merge.hold) * 0.035;
                merge.element.dataset.fusion = progress < 1 ? "joining" : squeeze > 0 ? "squeezing" : "joined";
                merge.element.style.setProperty("--merge-alpha", fade);
                merge.element.style.transform = `translate3d(${merge.x}px, ${merge.y}px, 0) translate(-50%, -50%) rotate(${merge.angle}deg) scale(${pulse * (1 + squeeze * 0.13)}, ${pulse * (1 - squeeze * 0.18)})`;
            });
        }

        function checkCollisions() {
            if (elapsed < nextCollisionCheck || elapsed < nextMerge || merges.size >= MAX_MERGES || activeDrag) return;
            nextCollisionCheck = elapsed + 0.15;
            // Read visible shape bounds together, at most a few times a second.
            const candidates = [];
            particles.forEach(particle => {
                if (!particle.visible || particle.merge || elapsed < particle.mergeAfter ||
                    Math.hypot(particle.vx, particle.vy) > 70) return;
                const bounds = particle.shape.getBoundingClientRect();
                const x = bounds.left + bounds.width / 2, y = bounds.top + bounds.height / 2;
                if (x < 0 || x > window.innerWidth || y < 40 || y > window.innerHeight ||
                    Math.abs(x - window.innerWidth / 2) < window.innerWidth * 0.12) return;
                candidates.push({ particle, x, y, bounds });
            });
            let nearest = null, best = Infinity;
            for (let i = 0; i < candidates.length; i++) {
                for (let j = i + 1; j < candidates.length; j++) {
                    const a = candidates[i], b = candidates[j];
                    if (a.particle.kind === b.particle.kind) continue;
                    const dx = Math.abs(a.x - b.x), dy = Math.abs(a.y - b.y);
                    if (dx > (a.bounds.width + b.bounds.width) / 2 + 5 ||
                        dy > (a.bounds.height + b.bounds.height) / 2 + 5) continue;
                    const radius = (Math.max(a.bounds.width, a.bounds.height) +
                        Math.max(b.bounds.width, b.bounds.height)) * 0.34 + 5;
                    const score = Math.hypot(dx, dy) / radius;
                    if (score < 1 && score < best) { nearest = [a, b]; best = score; }
                }
            }
            if (nearest) beginMerge(...nearest);
        }

        function render() {
            const hostTop = host.getBoundingClientRect().top;
            particles.forEach(particle => paint(particle, hostTop));
        }

        function tick(time) {
            frame = 0;
            if (!canAnimate()) {
                stopFrame();
                return;
            }
            const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;
            elapsed += dt;
            const drag = Math.exp(-VELOCITY_DRAG * dt);

            particles.forEach(particle => {
                const held = activeDrag?.particle === particle;
                const ready = activeDrag?.target === particle;
                const follow = 1 - Math.exp(-18 * dt);
                particle.holdScale = lerp(particle.holdScale, held ? HOLD_SCALE : 1, follow);
                particle.wobble = lerp(particle.wobble, held || ready ? 1 : 0, follow);
                // Distance changes the motion gradually; each piece keeps its own phase.
                particle.wobbleProximity = lerp(particle.wobbleProximity,
                    held || ready ? activeDrag.proximity : 0, 1 - Math.exp(-8 * dt));
                const speed = lerp(7, 22, particle.wobbleProximity) * particle.wobbleRate * (ready ? 1.23 : 1);
                const angle = lerp(2.5, 1.5, particle.wobbleProximity) * particle.wobbleRange * (ready ? 0.78 : 1);
                particle.wobbleSpeed = lerp(particle.wobbleSpeed, speed, follow);
                particle.wobbleAngle = lerp(particle.wobbleAngle, angle, follow);
                particle.wobbleTravel = lerp(0.35, 0.15, particle.wobbleProximity) * particle.wobbleRange;
                // Integrate frequency to avoid phase jumps when the pointer moves.
                particle.wobblePhase = (particle.wobblePhase + particle.wobbleSpeed * dt) % (Math.PI * 2);
                if (reducedMotion.matches || particle.merge || held || ready) return;
                const flowX = FLOW_SPEED * 0.65 * Math.sin(particle.y * 0.0015 + elapsed * 0.12 + particle.phase);
                const flowY = -FLOW_SPEED * (0.65 + 0.35 * Math.cos(particle.x * 0.002 + elapsed * 0.09 + particle.phase));
                particle.vx = flowX + (particle.vx - flowX) * drag;
                particle.vy = flowY + (particle.vy - flowY) * drag;
                particle.x += particle.vx * dt;
                particle.y += particle.vy * dt;
                particle.angle = (particle.angle + particle.spin * dt) % 360;

                // Re-enter from the opposite boundary only after leaving the document.
                const margin = particle.size * 1.5;
                if (particle.x < -margin) particle.x += width + margin * 2;
                if (particle.x > width + margin) particle.x -= width + margin * 2;
                if (particle.y < -margin) particle.y += height + margin * 2;
                if (particle.y > height + margin) particle.y -= height + margin * 2;
            });
            animateMerges(dt);
            render();
            if (activeDrag) setDropTarget(findDropTarget(activeDrag.particle));
            if (!reducedMotion.matches) checkCollisions();
            scheduleFrame();
        }

        function syncMotion() {
            stopFrame();
            cancelDrag();
            // Keep the outline field still while the page wave uses the frame budget.
            if (transitionActive()) {
                host.dataset.motion = 'paused';
                return;
            }
            merges.forEach(merge => finishMerge(merge, false));
            if (!pageActive || document.hidden || !host.isConnected) return;
            render();
            scheduleFrame();
        }

        const isContentTarget = target => target instanceof Element && target.closest(
            'a, button, input, textarea, select, [contenteditable]:not([contenteditable="false"]), .header, .history-card, .archive-box'
        );

        function pickParticle(clientX, clientY) {
            let nearest = null, best = Infinity;
            particles.forEach(particle => {
                if (!particle.visible) return;
                const bounds = particle.shape.getBoundingClientRect();
                // Ignore the fully faded middle of the background.
                const centerX = bounds.left + bounds.width / 2;
                if (Math.abs(centerX - width / 2) < width * 0.06) return;
                if (clientX < bounds.left - GRAB_PADDING || clientX > bounds.right + GRAB_PADDING ||
                    clientY < bounds.top - GRAB_PADDING || clientY > bounds.bottom + GRAB_PADDING) return;
                const distance = Math.hypot(clientX - centerX, clientY - bounds.top - bounds.height / 2);
                if (distance < best) { nearest = particle; best = distance; }
            });
            return nearest;
        }

        function setDropTarget(candidate) {
            const target = candidate?.particle || null;
            activeDrag.proximity = candidate ? Math.max(0, Math.min(1, 1 - candidate.distance / candidate.reach)) : 0;
            if (activeDrag.target === target) return;
            activeDrag.target?.element.classList.remove("is-drop-target");
            activeDrag.target = target;
            target?.element.classList.add("is-drop-target");
        }

        function findDropTarget(particle) {
            const bounds = particle.shape.getBoundingClientRect();
            let nearest = null, best = Infinity;
            particles.forEach(other => {
                if (other === particle || !other.visible || other.merge) return;
                const otherBounds = other.shape.getBoundingClientRect();
                const centerX = otherBounds.left + otherBounds.width / 2;
                const centerY = otherBounds.top + otherBounds.height / 2;
                if (centerX < 0 || centerX > width || centerY < 0 || centerY > window.innerHeight ||
                    Math.abs(centerX - width / 2) < width * 0.06 ||
                    isContentTarget(document.elementFromPoint(centerX, centerY))) return;
                const gapX = Math.max(0, otherBounds.left - bounds.right, bounds.left - otherBounds.right);
                const gapY = Math.max(0, otherBounds.top - bounds.bottom, bounds.top - otherBounds.bottom);
                const snapDistance = SNAP_DISTANCE + (activeDrag?.target === other ? 10 : 0);
                if (Math.hypot(gapX, gapY) > snapDistance) return;
                const distance = Math.hypot(bounds.left + bounds.width / 2 - otherBounds.left - otherBounds.width / 2,
                    bounds.top + bounds.height / 2 - otherBounds.top - otherBounds.height / 2);
                if (distance < best) {
                    nearest = {
                        particle: other, distance,
                        reach: (Math.max(bounds.width, bounds.height) + Math.max(otherBounds.width, otherBounds.height)) / 2 + snapDistance
                    };
                    best = distance;
                }
            });
            return nearest;
        }

        function startDrag(clientX, clientY, source, id, target) {
            if (activeDrag || document.hidden || !host.isConnected || transitionActive() || isContentTarget(target)) return false;
            const particle = pickParticle(clientX, clientY);
            if (!particle) return false;
            if (particle.merge) finishMerge(particle.merge, false);
            particle.vx = particle.vy = 0;
            particle.releaseScale = 1;
            particle.splitAt = -Infinity;
            if (reducedMotion.matches) particle.holdScale = HOLD_SCALE;
            const rect = host.getBoundingClientRect();
            activeDrag = {
                particle, source, id, target: null, proximity: 0,
                offsetX: particle.x - (clientX - rect.left),
                offsetY: particle.y - (clientY - rect.top),
                clientX, clientY
            };
            // Preserve its faded opacity when lifting it out of the background mask.
            const bounds = particle.shape.getBoundingClientRect();
            const edgePosition = Math.min(0.5, Math.max(0, Math.min(
                (bounds.left + bounds.width / 2) / width,
                1 - (bounds.left + bounds.width / 2) / width
            )));
            const stops = [[0, 1], [0.18, 0.82], [0.30, 0.46], [0.42, 0.12], [0.5, 0]];
            const stop = stops.findIndex(([position]) => position >= edgePosition);
            const [left, right] = [stops[Math.max(0, stop - 1)], stops[stop]];
            const fade = left === right ? left[1] : lerp(left[1], right[1], (edgePosition - left[0]) / (right[0] - left[0]));
            particle.element.style.setProperty("--drag-opacity", parseFloat(particle.element.style.getPropertyValue("--alpha")) * fade);
            // Keep the grabbed fragment visible when it crosses the center fade.
            host.shadowRoot.querySelector(".drag-layer").append(particle.element);
            particle.element.classList.add("is-dragging");
            document.body.classList.add("cjdmd-outline-dragging");
            render();
            return true;
        }

        function moveDrag(clientX, clientY) {
            if (!activeDrag) return;
            const rect = host.getBoundingClientRect();
            const { particle } = activeDrag;
            activeDrag.clientX = clientX;
            activeDrag.clientY = clientY;
            particle.x = Math.max(0, Math.min(width, clientX - rect.left + activeDrag.offsetX));
            particle.y = Math.max(0, Math.min(height, clientY - rect.top + activeDrag.offsetY));
            render();
            setDropTarget(findDropTarget(particle));
        }

        function endDrag(drop = false) {
            if (!activeDrag) return;
            const { particle, captureTarget, id } = activeDrag;
            const target = drop ? findDropTarget(particle)?.particle : null;
            setDropTarget(null);
            activeDrag = null;
            if (captureTarget?.hasPointerCapture(id)) captureTarget.releasePointerCapture(id);
            particle.element.classList.remove("is-dragging");
            particle.element.style.removeProperty("--drag-opacity");
            particle.stage.append(particle.element);
            document.body.classList.remove("cjdmd-outline-dragging");
            particle.mergeAfter = elapsed + MERGE_COOLDOWN;
            if (target) {
                const candidate = item => {
                    const bounds = item.shape.getBoundingClientRect();
                    return { particle: item, x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
                };
                beginMerge(candidate(particle), candidate(target), true);
            } else if (reducedMotion.matches) {
                particle.holdScale = 1;
            }
            render();
        }

        function cancelDrag() { endDrag(false); }

        document.addEventListener("pointerdown", event => {
            // Touch uses cancelable touch events so only an icon grab prevents scrolling.
            if (event.button !== 0) return;
            if (event.pointerType === "touch") {
                // Do not spawn the separate cursor effect on a background icon.
                if (!transitionActive() && !isContentTarget(event.target) && pickParticle(event.clientX, event.clientY)) {
                    event.stopPropagation();
                }
                return;
            }
            if (!startDrag(event.clientX, event.clientY, "pointer", event.pointerId, event.target)) return;
            activeDrag.captureTarget = event.target;
            event.target.setPointerCapture(event.pointerId);
            event.preventDefault();
            event.stopPropagation();
        }, { capture: true });
        document.addEventListener("pointermove", event => {
            if (activeDrag?.source !== "pointer" || activeDrag.id !== event.pointerId) return;
            moveDrag(event.clientX, event.clientY);
            event.preventDefault();
            event.stopPropagation();
        }, { capture: true });
        document.addEventListener("pointerup", event => {
            if (activeDrag?.source !== "pointer" || activeDrag.id !== event.pointerId) return;
            moveDrag(event.clientX, event.clientY);
            endDrag(true);
        }, { capture: true });
        document.addEventListener("pointercancel", event => {
            if (activeDrag?.source === "pointer" && activeDrag.id === event.pointerId) cancelDrag();
        }, { capture: true });
        document.addEventListener("lostpointercapture", event => {
            if (activeDrag?.source === "pointer" && activeDrag.id === event.pointerId) cancelDrag();
        }, { capture: true });

        document.addEventListener("touchstart", event => {
            if (event.touches.length !== 1) { cancelDrag(); return; }
            const touch = event.changedTouches[0];
            if (event.cancelable && startDrag(touch.clientX, touch.clientY, "touch", touch.identifier, event.target)) {
                event.preventDefault();
            }
        }, { passive: false, capture: true });
        document.addEventListener("touchmove", event => {
            if (activeDrag?.source !== "touch") return;
            const touch = Array.from(event.changedTouches).find(item => item.identifier === activeDrag.id);
            if (!touch) return;
            if (event.cancelable) event.preventDefault();
            moveDrag(touch.clientX, touch.clientY);
        }, { passive: false, capture: true });
        document.addEventListener("touchend", event => {
            if (activeDrag?.source !== "touch") return;
            const touch = Array.from(event.changedTouches).find(item => item.identifier === activeDrag.id);
            if (!touch) return;
            moveDrag(touch.clientX, touch.clientY);
            endDrag(true);
        }, { capture: true });
        document.addEventListener("touchcancel", cancelDrag, { passive: true, capture: true });
        document.addEventListener("keydown", event => { if (event.key === "Escape") cancelDrag(); });
        window.addEventListener("blur", cancelDrag);
        document.addEventListener("visibilitychange", syncMotion);
        document.addEventListener("page-transition:change", syncMotion);
        reducedMotion.addEventListener("change", syncMotion);
        archiveDesktop.addEventListener("change", syncMotion);
        window.addEventListener("scroll", () => {
            if (activeDrag) moveDrag(activeDrag.clientX, activeDrag.clientY);
            else if (reducedMotion.matches) render();
        }, { passive: true });
        window.addEventListener("pagehide", () => {
            pageActive = false;
            stopFrame();
            cancelDrag();
            merges.forEach(merge => finishMerge(merge, false));
        });
        window.addEventListener("pageshow", () => {
            pageActive = true;
            syncMotion();
        });
        syncMotion();

        return {
            addStage(stage, row, rowCount) {
                const hostTop = host.getBoundingClientRect().top;
                stage.querySelectorAll(".piece").forEach((element, index) => {
                    const sequence = index + row * stage.childElementCount;
                    const phase = sequence * 2.3999632297;
                    const wobbleRate = 0.9 + (sequence * 0.754877666 % 1) * 0.18;
                    const wobbleRange = 0.9 + (sequence * 0.569840291 % 1) * 0.2;
                    const particle = {
                        element, stage, shape: element.querySelector(".color-group"), phase,
                        // Sample each copy independently so stages never repeat a layout.
                        x: (0.02 + Math.random() * 0.96) * width,
                        y: (row + Math.random()) * height / rowCount,
                        size: parseFloat(element.style.getPropertyValue("--size")),
                        angle: parseFloat(element.style.getPropertyValue("--rot")),
                        spin: (index % 2 ? 1 : -1) * (0.7 + (index % 5) * 0.22),
                        vx: FLOW_SPEED * 0.4 * Math.sin(phase),
                        vy: -FLOW_SPEED * 0.7,
                        kind: index, holdScale: 1, wobble: 0,
                        wobblePhase: phase % (Math.PI * 2), wobbleRate, wobbleRange,
                        wobbleProximity: 0, wobbleSpeed: 7 * wobbleRate,
                        wobbleAngle: 2.5 * wobbleRange, wobbleTravel: 0.35 * wobbleRange,
                        merge: null, mergeScale: 1, releaseScale: 1,
                        splitAt: -Infinity,
                        mergeAfter: elapsed + 1.2 + (index % 7) * 0.13,
                        visible: null
                    };
                    particles.set(element, particle);
                    paint(particle, hostTop);
                });
            },
            removeStage(stage) {
                if (activeDrag?.particle.stage === stage) cancelDrag();
                merges.forEach(merge => {
                    if (merge.a.stage === stage || merge.b.stage === stage) finishMerge(merge, false);
                });
                particles.forEach((particle, element) => {
                    if (particle.stage !== stage) return;
                    particles.delete(element);
                });
            },
            resize() {
                cancelDrag();
                merges.forEach(merge => finishMerge(merge, false));
                const nextWidth = host.clientWidth;
                const nextHeight = host.clientHeight;
                particles.forEach(particle => {
                    particle.x *= nextWidth / Math.max(1, width);
                    particle.y *= nextHeight / Math.max(1, height);
                });
                width = nextWidth;
                height = nextHeight;
                render();
            }
        };
    }

    async function initFloatingOutlineBackground() {
        if (document.getElementById(HOST_ID)) return;

        const pageStyle = document.createElement("style");
        pageStyle.textContent = `
            body.${BODY_CLASS} {
                position: relative;
                min-height: 100vh;
                isolation: isolate;
                background: ${BACKGROUND};
            }
            body.cjdmd-outline-dragging, body.cjdmd-outline-dragging * {
                cursor: grabbing !important;
                user-select: none;
                -webkit-user-select: none;
            }
        `;
        document.head.append(pageStyle);
        document.body.classList.add(BODY_CLASS);

        const host = document.createElement("div");
        host.id = HOST_ID;
        host.setAttribute("aria-hidden", "true");
        host.setAttribute("inert", "");
        host.style.cssText = `position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;background:${BACKGROUND};`;
        // Shadow DOM keeps the site's generic SVG/div styles out of the effect.
        const root = host.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
            *, *::before, *::after { box-sizing: border-box; pointer-events: none; }
            .stage { position: absolute; inset: 0; }
            .drag-layer { position: absolute; inset: 0; }
            .center-fade {
                position: absolute;
                inset: 0;
                /* Fade continuously toward the center rather than clipping a band. */
                mask-image: linear-gradient(to right,
                    #000 0%, rgba(0, 0, 0, 0.82) 18%,
                    rgba(0, 0, 0, 0.46) 30%, rgba(0, 0, 0, 0.12) 42%,
                    transparent 50%,
                    rgba(0, 0, 0, 0.12) 58%, rgba(0, 0, 0, 0.46) 70%,
                    rgba(0, 0, 0, 0.82) 82%, #000 100%);
                -webkit-mask-image: linear-gradient(to right,
                    #000 0%, rgba(0, 0, 0, 0.82) 18%,
                    rgba(0, 0, 0, 0.46) 30%, rgba(0, 0, 0, 0.12) 42%,
                    transparent 50%,
                    rgba(0, 0, 0, 0.12) 58%, rgba(0, 0, 0, 0.46) 70%,
                    rgba(0, 0, 0, 0.82) 82%, #000 100%);
            }
            .piece {
                position: absolute;
                left: 0;
                top: 0;
                width: min(var(--size), 14vw);
                aspect-ratio: 1;
                opacity: calc(var(--alpha) * var(--merge-alpha, 1));
                color: ${LINE_COLOR};
                transform: translate(-50%, -50%) rotate(var(--rot));
                will-change: transform;
            }
            .piece.is-dragging { opacity: var(--drag-opacity, var(--alpha)); }
            svg { display: block; width: 100%; height: 100%; overflow: visible; }
            :is(${SHAPES}) {
                fill: none;
                stroke: currentColor;
                stroke-width: ${STROKE_WIDTH}px;
                stroke-linecap: round;
                stroke-linejoin: round;
                vector-effect: non-scaling-stroke;
            }
            @media (prefers-reduced-motion: reduce) {
                .piece { will-change: auto; }
            }
        `;
        const centerFade = document.createElement("div");
        centerFade.className = "center-fade";
        const dragLayer = document.createElement("div");
        dragLayer.className = "drag-layer";
        root.append(style, centerFade, dragLayer);
        document.body.prepend(host);

        const urls = ICON_URLS.filter(url => typeof url === "string" && url.trim());
        const results = await Promise.allSettled(urls.map(loadIcon));
        const fragment = document.createDocumentFragment();
        let index = 0;
        results.forEach((result, iconIndex) => {
            if (result.status === "rejected") {
                console.warn("[Floating outline]", urls[iconIndex], result.reason);
                return;
            }
            const svg = result.value;
            groupShapesByColor(svg).forEach((shapes, color) => {
                fragment.append(createPiece(shapes, svg, index++, color));
            });
        });
        const template = document.createElement("div");
        template.className = "stage";
        template.append(fragment);
        if (!index) return;

        // Repeat along the document so scrolling never reaches an empty background.
        const stages = [];
        const flow = createFlow(host);

        function syncStages() {
            if (!archiveDesktop.matches) return;
            flow.resize();
            const tileHeight = window.innerHeight * TILE_HEIGHT_VH / 100;
            const count = Math.max(1, Math.ceil(host.clientHeight / Math.max(1, tileHeight)));
            while (stages.length < count) {
                const stage = template.cloneNode(true);
                centerFade.append(stage);
                flow.addStage(stage, stages.length, count);
                stages.push(stage);
            }
            while (stages.length > count) {
                const stage = stages.pop();
                flow.removeStage(stage);
                stage.remove();
            }
        }

        syncStages();
        const sizeObserver = new ResizeObserver(syncStages);
        sizeObserver.observe(host);
        window.addEventListener("resize", syncStages, { passive: true });
    }

    const start = () => initFloatingOutlineBackground().catch(error => {
        console.warn("[Floating outline]", error);
    });
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
        start();
    }
})();
