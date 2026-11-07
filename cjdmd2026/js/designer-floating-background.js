(() => {
    "use strict";

    // archive.js의 흐름 / 터치 효과에 개인 조각의 원래 색상을 적용합니다.
    // 개수, 크기, 속도, 진하기는 여기서 조절합니다.
    const SETTINGS = {
        density: 60, mobileDensity: 34, tileHeight: 900, maxPieces: 400,
        flowSpeed: 18,
        // 기존 평균 크기를 3단계로 두고, 작을수록 더 흐리게 표현합니다.
        depthLevels: [
            { size: 22, blur: 3.2 },
            { size: 34, blur: 2.4 },
            { size: 46, blur: 1.6 },
            { size: 60, blur: 0.9 },
            { size: 76, blur: 0.35 },
            { size: 94, blur: 0 }
        ],
        opacity: 0.32,
        touchRadius: 360, touchImpulse: 210, drag: 1.5
    };
    const scriptURL = document.currentScript.src;
    const iconBaseURL = new URL("../assets/images/project/icon/", scriptURL);
    const SVG_NS = "http://www.w3.org/2000/svg";
    const SHAPES = "path, rect, circle, ellipse, polygon, polyline, line";
    const GEOMETRY = [
        "d", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r",
        "rx", "ry", "width", "height", "points", "transform", "fill-rule", "clip-rule"
    ];

    function normalizeColor(value) {
        const color = (value || "").trim().toLowerCase();
        return /^#[0-9a-f]{3}$/.test(color)
            ? "#" + [...color.slice(1)].map(char => char + char).join("") : color;
    }

    function fillColor(shape, source) {
        for (let node = shape; node; node = node.parentElement) {
            const fill = node.style?.fill || node.getAttribute("fill");
            if (fill && fill !== "inherit") return normalizeColor(fill);
            if (node === source) break;
        }
        return "#000000";
    }

    async function loadFragment(project, designerId, signal) {
        const color = normalizeColor(project.studentColors?.[designerId]);
        if (!color) return null;
        const response = await fetch(new URL(project.file, iconBaseURL), { signal });
        if (!response.ok) throw new Error(`SVG HTTP ${response.status}: ${project.file}`);
        const parsed = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
        const source = parsed.documentElement;
        if (parsed.querySelector("parsererror") || source.localName !== "svg") {
            throw new Error(`Invalid SVG: ${project.file}`);
        }

        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("viewBox", source.getAttribute("viewBox") || "-14 -14 268 268");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.dataset.color = color;
        svg.dataset.projectId = project.projectId;
        svg.style.color = color;
        source.querySelectorAll(SHAPES).forEach(shape => {
            if (shape.closest("defs, clipPath, mask, symbol, pattern, marker") ||
                fillColor(shape, source) !== color) return;
            // 같은 색의 모든 도형과 부모의 좌표 변환을 한 조각으로 유지합니다.
            const fragmentShape = document.createElementNS(SVG_NS, shape.localName);
            GEOMETRY.forEach(name => {
                if (shape.hasAttribute(name)) fragmentShape.setAttribute(name, shape.getAttribute(name));
            });
            let branch = fragmentShape;
            for (let parent = shape.parentElement; parent && parent !== source; parent = parent.parentElement) {
                if (!parent.hasAttribute("transform")) continue;
                const group = document.createElementNS(SVG_NS, "g");
                group.setAttribute("transform", parent.getAttribute("transform"));
                group.append(branch);
                branch = group;
            }
            svg.append(branch);
        });
        if (!svg.childElementCount) throw new Error(`No ${color} shapes: ${project.file}`);
        return svg;
    }

    function mount(main, designer) {
        const projects = (window.DESIGNER_ICON_PROJECTS || []).filter(project =>
            (designer?.projectIds || []).includes(project.projectId) && project.studentColors?.[designer.id]
        );
        if (!main || !projects.length) return null;

        const abort = new AbortController();
        const { signal } = abort;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const host = document.createElement("div");
        host.className = "designer-floating-background";
        host.dataset.designerId = designer.id;
        host.setAttribute("aria-hidden", "true");
        host.setAttribute("inert", "");
        let particles = [], fragments = [];
        let width = 1, height = 1, elapsed = 0, frame = 0, lastTime = null;
        let pageActive = true;
        let observer = null;
        const pointers = new Map();

        function paint() {
            const top = host.getBoundingClientRect().top;
            particles.forEach(particle => {
                const visible = particle.y + top > -particle.size &&
                    particle.y + top < window.innerHeight + particle.size;
                particle.element.style.visibility = visible ? "visible" : "hidden";
                if (visible) particle.element.style.transform =
                    `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%) rotate(${particle.angle}deg)`;
            });
        }

        function resize() {
            const nextWidth = Math.max(1, main.clientWidth);
            const nextHeight = Math.max(1, main.clientHeight);
            // Animated grid rows can round the same total height up or down by one pixel.
            if (particles.length && nextWidth === width && Math.abs(nextHeight - height) <= 1) return;

            const density = nextWidth < 750 ? SETTINGS.mobileDensity : SETTINGS.density;
            const count = Math.min(SETTINGS.maxPieces, Math.max(density,
                Math.ceil(nextHeight / SETTINGS.tileHeight * density)));
            particles.forEach(particle => {
                particle.x *= nextWidth / width;
                particle.y *= nextHeight / height;
            });
            width = nextWidth;
            height = nextHeight;
            // Keep existing pieces and their motion when the page needs a different count.
            if (particles.length > count) {
                for (const particle of particles.splice(count)) particle.element.remove();
            } else if (particles.length < count) {
                const first = particles.length;
                const levels = Array.from({ length: count - first }, (_, i) => (first + i) % SETTINGS.depthLevels.length);
                for (let index = levels.length - 1; index > 0; index--) {
                    const other = Math.floor(Math.random() * (index + 1));
                    [levels[index], levels[other]] = [levels[other], levels[index]];
                }
                const additions = document.createDocumentFragment();
                for (const level of levels) {
                    const index = particles.length;
                    const element = document.createElement("div");
                    element.className = "designer-floating-background__piece";
                    element.dataset.depthLevel = level + 1;
                    element.style.opacity = SETTINGS.opacity + (index % 4) * 0.055;
                    element.append(fragments[index % fragments.length].cloneNode(true));
                    additions.append(element);
                    particles.push({
                        element, level,
                        // 좌우 교차나 세로 등간격 없이, 각 위치를 독립적으로 뽑습니다.
                        x: Math.random() * width,
                        y: Math.random() * height,
                        phase: Math.random() * Math.PI * 2, angle: Math.random() * 360,
                        vx: 0, vy: -SETTINGS.flowSpeed * 0.7,
                        spin: (index % 2 ? 1 : -1) * (0.7 + index % 5 * 0.22)
                    });
                }
                host.append(additions);
            }
            // 가장 큰 단계에 맞춰 전체를 함께 축소해 좁은 화면에서도 6단계를 유지합니다.
            const sizeScale = Math.min(1, width * 0.26 / SETTINGS.depthLevels.at(-1).size);
            particles.forEach(particle => {
                const level = SETTINGS.depthLevels[particle.level];
                particle.size = level.size * sizeScale;
                particle.element.style.width = `${particle.size}px`;
                particle.element.style.filter = level.blur ? `blur(${level.blur * sizeScale}px)` : "none";
            });
            paint();
        }

        function canMove() {
            return !signal.aborted && pageActive && !document.hidden &&
                !reducedMotion.matches && host.isConnected &&
                !document.documentElement.classList.contains('page-transition-active');
        }

        function tick(time) {
            frame = 0;
            if (!canMove()) { lastTime = null; return; }
            const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;
            elapsed += dt;
            const drag = Math.exp(-SETTINGS.drag * dt);
            particles.forEach(particle => {
                const flowX = SETTINGS.flowSpeed * 0.65 * Math.sin(particle.y * 0.0015 + elapsed * 0.12 + particle.phase);
                const flowY = -SETTINGS.flowSpeed * (0.65 + 0.35 * Math.cos(particle.x * 0.002 + elapsed * 0.09 + particle.phase));
                particle.vx = flowX + (particle.vx - flowX) * drag;
                particle.vy = flowY + (particle.vy - flowY) * drag;
                particle.x += particle.vx * dt;
                particle.y += particle.vy * dt;
                particle.angle = (particle.angle + particle.spin * dt) % 360;
                const margin = particle.size * 1.5;
                // 완전히 밖으로 나간 뒤 새로운 진입 위치를 골라 같은 줄의 반복을 피합니다.
                if (particle.x < -margin || particle.x > width + margin) {
                    particle.x = particle.x < -margin ? width + margin : -margin;
                    particle.y = Math.random() * height;
                }
                if (particle.y < -margin || particle.y > height + margin) {
                    particle.y = particle.y < -margin ? height + margin : -margin;
                    particle.x = Math.random() * width;
                }
            });
            paint();
            frame = requestAnimationFrame(tick);
        }

        function syncMotion() {
            cancelAnimationFrame(frame);
            frame = 0;
            lastTime = null;
            pointers.clear();
            if (host.isConnected) paint();
            if (canMove()) frame = requestAnimationFrame(tick);
        }

        function scatter(event, strength) {
            if (!canMove()) return;
            const rect = host.getBoundingClientRect();
            const x = event.clientX - rect.left, y = event.clientY - rect.top;
            if (x < 0 || x > width || y < 0 || y > height) return;
            const radius = Math.min(SETTINGS.touchRadius, width * 0.55);
            particles.forEach(particle => {
                const dx = particle.x - x, dy = particle.y - y;
                const distance = Math.hypot(dx, dy);
                if (distance >= radius) return;
                const angle = distance < 1 ? particle.phase : Math.atan2(dy, dx);
                const impulse = SETTINGS.touchImpulse * Math.pow(1 - distance / radius, 1.4) * strength;
                particle.vx += Math.cos(angle) * impulse;
                particle.vy += Math.sin(angle) * impulse;
                const limit = Math.min(1, SETTINGS.touchImpulse * 2 / (Math.hypot(particle.vx, particle.vy) || 1));
                particle.vx *= limit;
                particle.vy *= limit;
            });
        }

        function listen(target, type, listener, options = {}) {
            target.addEventListener(type, listener, { ...options, signal });
        }

        function destroy() {
            abort.abort();
            cancelAnimationFrame(frame);
            observer?.disconnect();
            pointers.clear();
            host.remove();
            main.classList.remove("has-designer-background");
            particles = [];
        }

        Promise.all(projects.map(project => loadFragment(project, designer.id, signal)))
            .then(results => {
                if (signal.aborted) return;
                fragments = results.filter(Boolean);
                if (!fragments.length) return;
                main.prepend(host);
                main.classList.add("has-designer-background");
                resize();
                observer = new ResizeObserver(resize);
                observer.observe(main);
                listen(window, "resize", resize, { passive: true });
                listen(window, "scroll", () => { if (reducedMotion.matches) paint(); }, { passive: true });
                listen(document, "visibilitychange", syncMotion);
                listen(document, "page-transition:change", syncMotion);
                listen(reducedMotion, "change", syncMotion);
                listen(window, "pagehide", () => { pageActive = false; syncMotion(); });
                listen(window, "pageshow", () => { pageActive = true; syncMotion(); });
                listen(document, "pointerdown", event => {
                    if (event.button !== 0 || !canMove()) return;
                    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY, time: performance.now() });
                    scatter(event, 1);
                }, { passive: true, capture: true });
                listen(document, "pointermove", event => {
                    const pointer = pointers.get(event.pointerId);
                    if (!pointer) return;
                    const time = performance.now();
                    if (time - pointer.time < 70 || Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) < 6) return;
                    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY, time });
                    scatter(event, 0.3);
                }, { passive: true, capture: true });
                ["pointerup", "pointercancel"].forEach(type => listen(document, type,
                    event => pointers.delete(event.pointerId), { passive: true, capture: true }));
                syncMotion();
            }).catch(error => {
                if (signal.aborted) return;
                destroy();
                console.warn("[DesignerFloatingBackground]", error);
            });

        return { destroy };
    }

    window.DesignerFloatingBackground = { mount };
})();
