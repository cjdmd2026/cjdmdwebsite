/**
 * Designer WebGL Screw Slider — LITE
 * ============================================================
 * 성능 우선 버전
 *
 * 핵심:
 * - 34개 Mesh/Texture를 한 번에 만들지 않음
 * - WebGL Mesh는 고정 9개만 생성해서 재활용
 * - 화면 근처 카드 이미지만 lazy-load
 * - 텍스처는 384px로 축소 + LRU 최대 12장 유지
 * - Plane subdivision 10 x 6
 * - pixelRatio 최대 1.25
 * - 스크롤 중/관성이 남아 있을 때만 requestAnimationFrame 실행
 * - Grid View에서는 WebGL 자동 비활성화
 *
 * 기존 designer_02.js 뒤에 연결:
 * <script src="../js/designer_02.js" defer></script>
 * <script src="../js/designer-screw-webgl-lite.js" defer></script>
 */

(() => {
    "use strict";

    const OPTIONS = Object.assign({
        poolSize: 9,           // 동시에 렌더링할 카드 수. 홀수 권장
        textureWidth: 384,     // WebGL용 축소 텍스처 폭
        textureCache: 12,      // GPU에 유지할 텍스처 최대 수

        cardsPerTurn: 6.5,
        radiusY: 72,
        radiusZ: 210,
        depthOffset: -105,

        yaw: 17,
        pitch: 7,
        roll: 2,

        fov: 35,

        bendMax: 24,
        splitMax: 8,

        scrollEase: 0.18,
        velocityEase: 0.18,
        velocityDamping: 0.82,

        pixelRatio: 1.25,
        clearAlpha: 0,
        cornerRadius: 0.035,
    }, window.DesignerScrewLiteOptions || {});

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const damp = (a, b, ease, dt = 1) =>
        lerp(a, b, 1 - Math.pow(1 - ease, dt));

    const mod = (n, m) => ((n % m) + m) % m;

    const parseCssUrl = (value) => {
        const m = String(value || "").match(/url\((['"]?)(.*?)\1\)/i);
        return m ? m[2] : "";
    };

    async function getThree() {
        if (window.THREE) return window.THREE;

        return await import(
            "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
        );
    }

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn, { once: true });
        } else {
            fn();
        }
    }

    ready(async () => {
        const page = document.querySelector(".designer-page");
        const slider = document.querySelector(".designer-slider");
        const track = document.querySelector(".designer-track");

        if (!page || !slider || !track) return;

        let THREE;

        try {
            THREE = await getThree();
        } catch (error) {
            console.warn("[DesignerScrewLite] Three.js 로드 실패", error);
            return;
        }

        if (!THREE?.WebGLRenderer) return;

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        // =========================================================
        // 카드 데이터
        // =========================================================

        function originalCards() {
            const all = [...track.querySelectorAll(".designer-card")];
            const originals = all.filter(
                (el) => !el.hasAttribute("data-loop-clone")
            );
            return originals.length ? originals : all;
        }

        let cards = originalCards();

        if (cards.length < 2) return;

        function cardData(card) {
            const imageWrap = card.querySelector(
                ".designer-card__image-wrap"
            );

            let value = "";

            if (imageWrap) {
                value =
                    imageWrap.style.getPropertyValue(
                        "--designer-card-image"
                    ) ||
                    getComputedStyle(imageWrap).getPropertyValue(
                        "--designer-card-image"
                    );
            }

            return {
                url: parseCssUrl(value),
                nameKo:
                    card.dataset.nameKo ||
                    card.querySelector(".designer-card__name-ko")?.textContent ||
                    "",
                nameEn:
                    card.dataset.nameEn ||
                    card.querySelector(".designer-card__name-en")?.textContent ||
                    "",
            };
        }

        let data = cards.map(cardData);

        // =========================================================
        // CSS
        // =========================================================

        const style = document.createElement("style");
        style.dataset.designerScrewLiteStyle = "";

        style.textContent = `
            .designer-screw-lite {
                position: fixed;
                z-index: 20;
                overflow: hidden;
                pointer-events: none;
                opacity: 0;
                transition: opacity .12s ease;
            }

            .designer-screw-lite.is-active {
                opacity: 1;
            }

            .designer-screw-lite canvas {
                display: block;
                width: 100%;
                height: 100%;
            }

            .designer-page.slide-view.webgl-screw-lite-ready
            .designer-track > .designer-card {
                opacity: 0 !important;
                pointer-events: none !important;
            }

            @media (prefers-reduced-motion: reduce) {
                .designer-screw-lite {
                    display: none !important;
                }

                .designer-page.slide-view.webgl-screw-lite-ready
                .designer-track > .designer-card {
                    opacity: 1 !important;
                }
            }
        `;

        document.head.appendChild(style);

        // =========================================================
        // WebGL
        // =========================================================

        const overlay = document.createElement("div");
        overlay.className = "designer-screw-lite";
        overlay.setAttribute("aria-hidden", "true");
        document.body.appendChild(overlay);

        let renderer;

        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
            });
        } catch (error) {
            console.warn("[DesignerScrewLite] WebGL 생성 실패", error);
            overlay.remove();
            style.remove();
            return;
        }

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                OPTIONS.pixelRatio
            )
        );

        renderer.setClearColor(0x000000, OPTIONS.clearAlpha);

        if ("outputColorSpace" in renderer) {
            renderer.outputColorSpace = THREE.SRGBColorSpace;
        }

        overlay.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            OPTIONS.fov,
            1,
            1,
            5000
        );

        const group = new THREE.Group();
        scene.add(group);

        // =========================================================
        // Shader
        // =========================================================

        const vertexShader = `
            uniform float uBend;
            uniform float uTwist;

            varying vec2 vUv;

            void main() {
                vUv = uv;

                vec3 p = position;

                float nx = uv.x - 0.5;
                float ny = uv.y - 0.5;

                float arch = sin(uv.x * 3.14159265);

                p.z += arch * uBend;
                p.x += sin(ny * 3.14159265) * uBend * 0.08;

                float angle = ny * uTwist;
                float c = cos(angle);
                float s = sin(angle);

                float x = p.x * c - p.z * s;
                float z = p.x * s + p.z * c;

                p.x = x;
                p.z = z;

                gl_Position =
                    projectionMatrix *
                    modelViewMatrix *
                    vec4(p, 1.0);
            }
        `;

        const fragmentShader = `
            uniform sampler2D uTexture;
            uniform float uSplit;
            uniform float uRadius;
            uniform float uOpacity;

            varying vec2 vUv;

            float roundedMask(vec2 uv, float r) {
                vec2 p = abs(uv - 0.5);
                vec2 b = vec2(0.5 - r);
                vec2 q = p - b;

                float d =
                    length(max(q, 0.0)) +
                    min(max(q.x, q.y), 0.0) -
                    r;

                return 1.0 - smoothstep(-0.004, 0.004, d);
            }

            void main() {
                vec2 off = vec2(uSplit, 0.0);

                vec2 rUv = clamp(vUv + off, 0.001, 0.999);
                vec2 bUv = clamp(vUv - off, 0.001, 0.999);

                vec4 c = texture2D(uTexture, vUv);
                vec4 r = texture2D(uTexture, rUv);
                vec4 b = texture2D(uTexture, bUv);

                vec3 rgb = vec3(r.r, c.g, b.b);

                float mask = roundedMask(vUv, uRadius);

                gl_FragColor = vec4(
                    rgb,
                    c.a * mask * uOpacity
                );
            }
        `;

        // =========================================================
        // Placeholder texture
        // =========================================================

        const placeholderCanvas = document.createElement("canvas");
        placeholderCanvas.width = 2;
        placeholderCanvas.height = 2;

        const pctx = placeholderCanvas.getContext("2d");
        pctx.fillStyle = "#202020";
        pctx.fillRect(0, 0, 2, 2);

        const placeholderTexture = new THREE.CanvasTexture(
            placeholderCanvas
        );

        placeholderTexture.generateMipmaps = false;
        placeholderTexture.minFilter = THREE.LinearFilter;
        placeholderTexture.magFilter = THREE.LinearFilter;

        // =========================================================
        // Texture LRU
        // =========================================================

        const textureCache = new Map();
        let textureClock = 0;

        function activeTextures() {
            return new Set(
                slots
                    .map((slot) => slot.texture)
                    .filter(
                        (texture) =>
                            texture &&
                            texture !== placeholderTexture
                    )
            );
        }

        function evictTextures() {
            if (textureCache.size <= OPTIONS.textureCache) return;

            const active = activeTextures();

            const candidates = [...textureCache.entries()]
                .filter(([, entry]) => !active.has(entry.texture))
                .sort((a, b) => a[1].used - b[1].used);

            while (
                textureCache.size > OPTIONS.textureCache &&
                candidates.length
            ) {
                const [url, entry] = candidates.shift();

                textureCache.delete(url);
                entry.texture.dispose();
            }
        }

        async function loadTexture(url) {
            if (!url) return placeholderTexture;

            const cached = textureCache.get(url);

            if (cached) {
                cached.used = ++textureClock;
                return cached.texture;
            }

            const image = await new Promise((resolve, reject) => {
                const img = new Image();

                if (!/^(data:|blob:)/i.test(url)) {
                    img.crossOrigin = "anonymous";
                }

                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });

            const scale = Math.min(
                1,
                OPTIONS.textureWidth / image.naturalWidth
            );

            const canvas = document.createElement("canvas");

            canvas.width = Math.max(
                2,
                Math.round(image.naturalWidth * scale)
            );

            canvas.height = Math.max(
                2,
                Math.round(image.naturalHeight * scale)
            );

            const ctx = canvas.getContext("2d", {
                alpha: false,
            });

            ctx.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const texture = new THREE.CanvasTexture(canvas);

            if ("colorSpace" in texture) {
                texture.colorSpace = THREE.SRGBColorSpace;
            }

            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            textureCache.set(url, {
                texture,
                used: ++textureClock,
            });

            evictTextures();

            return texture;
        }

        // =========================================================
        // Layout
        // =========================================================

        let sliderRect;
        let cardWidth = 320;
        let cardHeight = 544;
        let gap = 16;
        let step = 336;
        let startPadding = 0;

        function measure() {
            sliderRect = slider.getBoundingClientRect();

            const first = cards[0];

            if (first) {
                const rect = first.getBoundingClientRect();

                if (rect.width > 2) cardWidth = rect.width;
                if (rect.height > 2) cardHeight = rect.height;
            }

            const trackStyle = getComputedStyle(track);

            gap =
                parseFloat(
                    trackStyle.columnGap ||
                    trackStyle.gap
                ) || 16;

            step = cardWidth + gap;

            const cardContainer = track.parentElement;

            startPadding = cardContainer
                ? parseFloat(
                      getComputedStyle(cardContainer).paddingLeft
                  ) || 0
                : 0;

            updateOverlay();
            resizeRenderer();

            for (const slot of slots) {
                slot.mesh.geometry.dispose();

                slot.mesh.geometry = new THREE.PlaneGeometry(
                    cardWidth,
                    cardHeight,
                    10,
                    6
                );
            }
        }

        function updateOverlay() {
            sliderRect = slider.getBoundingClientRect();

            const extra = Math.max(
                80,
                OPTIONS.radiusY * 1.35
            );

            overlay.style.left = `${sliderRect.left}px`;
            overlay.style.top = `${sliderRect.top - extra}px`;
            overlay.style.width = `${sliderRect.width}px`;
            overlay.style.height =
                `${sliderRect.height + extra * 2}px`;
        }

        function resizeRenderer() {
            const w = Math.max(1, overlay.clientWidth);
            const h = Math.max(1, overlay.clientHeight);

            renderer.setSize(w, h, false);

            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            const fov = THREE.MathUtils.degToRad(camera.fov);

            const z =
                (h / 2) /
                Math.tan(fov / 2);

            camera.position.set(0, 0, z);
            camera.lookAt(0, 0, 0);
        }

        // =========================================================
        // Fixed mesh pool
        // =========================================================

        const poolSize = Math.max(
            5,
            OPTIONS.poolSize % 2 === 0
                ? OPTIONS.poolSize + 1
                : OPTIONS.poolSize
        );

        const halfPool = Math.floor(poolSize / 2);

        const slots = [];

        for (let i = 0; i < poolSize; i++) {
            const geometry = new THREE.PlaneGeometry(
                cardWidth,
                cardHeight,
                10,
                6
            );

            const uniforms = {
                uTexture: { value: placeholderTexture },
                uBend: { value: 0 },
                uTwist: { value: 0 },
                uSplit: { value: 0 },
                uRadius: { value: OPTIONS.cornerRadius },
                uOpacity: { value: 1 },
            };

            const material = new THREE.ShaderMaterial({
                uniforms,
                vertexShader,
                fragmentShader,
                transparent: true,
                depthTest: true,
                depthWrite: true,
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(
                geometry,
                material
            );

            mesh.frustumCulled = false;
            group.add(mesh);

            slots.push({
                mesh,
                material,
                uniforms,
                virtualIndex: Number.NaN,
                dataIndex: -1,
                texture: placeholderTexture,
                loadToken: 0,
            });
        }

        // =========================================================
        // Slot assignment
        // =========================================================

        async function assignSlot(slot, virtualIndex) {
            if (slot.virtualIndex === virtualIndex) return;

            slot.virtualIndex = virtualIndex;

            const index = mod(
                virtualIndex,
                data.length
            );

            slot.dataIndex = index;

            const item = data[index];
            const token = ++slot.loadToken;

            slot.texture = placeholderTexture;
            slot.uniforms.uTexture.value = placeholderTexture;

            if (!item?.url) return;

            try {
                const texture = await loadTexture(item.url);

                if (
                    token !== slot.loadToken ||
                    slot.virtualIndex !== virtualIndex
                ) {
                    return;
                }

                slot.texture = texture;
                slot.uniforms.uTexture.value = texture;
                wake();
            } catch (error) {
                console.warn(
                    "[DesignerScrewLite] texture 생략:",
                    item.url
                );
            }
        }

        // =========================================================
        // Motion
        // =========================================================

        let targetScroll = slider.scrollLeft;
        let smoothScroll = slider.scrollLeft;
        let previousScroll = slider.scrollLeft;

        let velocity = 0;
        let targetVelocity = 0;

        let raf = 0;
        let lastTime = performance.now();

        function updateMotion(dt) {
            targetScroll = slider.scrollLeft;

            smoothScroll = damp(
                smoothScroll,
                targetScroll,
                OPTIONS.scrollEase,
                dt
            );

            let delta = targetScroll - previousScroll;
            previousScroll = targetScroll;

            if (
                Math.abs(delta) >
                Math.max(
                    slider.clientWidth * 0.75,
                    600
                )
            ) {
                delta = 0;
                smoothScroll = targetScroll;
            }

            targetVelocity = delta;

            velocity = damp(
                velocity,
                targetVelocity,
                OPTIONS.velocityEase,
                dt
            );

            velocity *= Math.pow(
                OPTIONS.velocityDamping,
                dt
            );

            const speed = clamp(
                velocity / 28,
                -1,
                1
            );

            const viewportCenter =
                overlay.clientWidth / 2;

            /*
             * 현재 scrollLeft에 가장 가까운 가상 카드 번호
             */
            const centerVirtualIndex = Math.round(
                (
                    smoothScroll +
                    viewportCenter -
                    startPadding -
                    cardWidth / 2
                ) /
                step
            );

            const turnLength = Math.max(
                1,
                step * OPTIONS.cardsPerTurn
            );

            slots.forEach((slot, poolIndex) => {
                const offset = poolIndex - halfPool;
                const virtualIndex =
                    centerVirtualIndex + offset;

                assignSlot(slot, virtualIndex);

                const linearX =
                    startPadding +
                    virtualIndex * step +
                    cardWidth / 2 -
                    smoothScroll -
                    viewportCenter;

                const theta =
                    (linearX / turnLength) *
                    Math.PI *
                    2;

                const y =
                    Math.sin(theta) *
                    OPTIONS.radiusY;

                const z =
                    Math.cos(theta) *
                        OPTIONS.radiusZ +
                    OPTIONS.depthOffset;

                const yaw =
                    -Math.sin(theta) *
                    THREE.MathUtils.degToRad(
                        OPTIONS.yaw
                    );

                const pitch =
                    Math.cos(theta) *
                    THREE.MathUtils.degToRad(
                        OPTIONS.pitch
                    );

                const roll =
                    Math.sin(theta) *
                    THREE.MathUtils.degToRad(
                        OPTIONS.roll
                    );

                slot.mesh.position.set(
                    linearX,
                    y,
                    z
                );

                slot.mesh.rotation.set(
                    pitch + speed * 0.04,
                    yaw - speed * 0.06,
                    roll
                );

                /*
                 * 가운데는 선명, 양 끝은 살짝 어둡게
                 */
                const edge = Math.abs(
                    linearX /
                    Math.max(
                        1,
                        overlay.clientWidth * 0.58
                    )
                );

                slot.uniforms.uOpacity.value =
                    clamp(
                        1.08 - edge * 0.18,
                        0.5,
                        1
                    );

                slot.uniforms.uBend.value =
                    speed * OPTIONS.bendMax;

                slot.uniforms.uTwist.value =
                    speed * 0.08;

                slot.uniforms.uSplit.value =
                    (
                        speed *
                        OPTIONS.splitMax
                    ) /
                    Math.max(
                        1,
                        cardWidth
                    );
            });
        }

        // =========================================================
        // Render loop — 필요할 때만
        // =========================================================

        function frame(time) {
            raf = 0;

            if (
                !page.classList.contains("slide-view") ||
                reduced.matches
            ) {
                return;
            }

            const dt = clamp(
                (time - lastTime) / 16.6667,
                0.25,
                2.5
            );

            lastTime = time;

            updateOverlay();
            updateMotion(dt);

            renderer.render(scene, camera);

            const moving =
                Math.abs(
                    targetScroll - smoothScroll
                ) > 0.08 ||
                Math.abs(velocity) > 0.02;

            if (moving) wake();
        }

        function wake() {
            if (raf) return;

            lastTime = performance.now();

            raf = requestAnimationFrame(frame);
        }

        // =========================================================
        // View
        // =========================================================

        let firstVisibleReady = false;

        async function preloadInitial() {
            /*
             * 최초에는 가운데 주변 5장만 먼저 준비
             * 나머지는 스크롤할 때 로드
             */
            const initial = Math.min(
                5,
                data.length
            );

            await Promise.allSettled(
                data
                    .slice(0, initial)
                    .map((item) =>
                        item.url
                            ? loadTexture(item.url)
                            : Promise.resolve()
                    )
            );

            firstVisibleReady = true;
            updateView();
            wake();
        }

        function updateView() {
            const slide =
                page.classList.contains("slide-view");

            if (
                slide &&
                !reduced.matches &&
                firstVisibleReady
            ) {
                page.classList.add(
                    "webgl-screw-lite-ready"
                );

                overlay.classList.add(
                    "is-active"
                );

                measure();

                smoothScroll = slider.scrollLeft;
                previousScroll = slider.scrollLeft;

                wake();
            } else {
                page.classList.remove(
                    "webgl-screw-lite-ready"
                );

                overlay.classList.remove(
                    "is-active"
                );
            }
        }

        // =========================================================
        // Events / observers
        // =========================================================

        slider.addEventListener(
            "scroll",
            wake,
            { passive: true }
        );

        let resizeTimer = 0;

        window.addEventListener(
            "resize",
            () => {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {
                    measure();
                    wake();
                }, 120);
            },
            { passive: true }
        );

        const pageObserver =
            new MutationObserver(updateView);

        pageObserver.observe(page, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const trackObserver =
            new MutationObserver(() => {
                const nextCards = originalCards();

                if (nextCards.length !== cards.length) {
                    cards = nextCards;
                    data = cards.map(cardData);
                    wake();
                }
            });

        trackObserver.observe(track, {
            childList: true,
        });

        reduced.addEventListener?.(
            "change",
            updateView
        );

        // =========================================================
        // API
        // =========================================================

        window.DesignerScrewLite = {
            refresh() {
                cards = originalCards();
                data = cards.map(cardData);
                measure();
                wake();
            },

            disable() {
                page.classList.remove(
                    "webgl-screw-lite-ready"
                );
                overlay.classList.remove(
                    "is-active"
                );
            },

            enable() {
                updateView();
                wake();
            },

            destroy() {
                cancelAnimationFrame(raf);

                pageObserver.disconnect();
                trackObserver.disconnect();

                for (const slot of slots) {
                    slot.mesh.geometry.dispose();
                    slot.material.dispose();
                }

                for (const entry of textureCache.values()) {
                    entry.texture.dispose();
                }

                placeholderTexture.dispose();

                renderer.dispose();
                overlay.remove();
                style.remove();

                page.classList.remove(
                    "webgl-screw-lite-ready"
                );
            },

            get status() {
                return {
                    poolSize: slots.length,
                    textureCache: textureCache.size,
                    cards: data.length,
                    velocity,
                    slideView:
                        page.classList.contains(
                            "slide-view"
                        ),
                };
            },
        };

        // =========================================================
        // Start
        // =========================================================

        measure();

        /*
         * DOM과 기존 페이지 인터랙션을 먼저 띄운 뒤
         * WebGL 준비 시작
         */
        const start = () => {
            preloadInitial();
        };

        if ("requestIdleCallback" in window) {
            requestIdleCallback(start, {
                timeout: 700,
            });
        } else {
            setTimeout(start, 60);
        }
    });
})();
