/**
 * designer-ribbon-slider.js
 * ------------------------------------------------------------
 * 현재 designer HTML 전용 WebGL Slide View
 *
 * 구조:
 * .designer-page
 * .designer-slider
 * .designer-track
 * .designer-card
 * .designer-card__image-wrap
 * .designer-card__name-ko
 * .designer-card__name-en
 *
 * 기능:
 * - Slide View에서만 WebGL 카드 렌더링
 * - 왼쪽 1/3 지점 카드가 가장 정면
 * - 오른쪽으로 갈수록 하나의 공통 3D 리본 흐름을 따라 왜곡
 * - 스크롤 시 카드 Mesh 자체가 이동
 * - 스프링 + 감쇠로 부드러운 카드 이동
 * - 리본 흐름은 화면에 보이지 않음
 * - 카드가 너무 빨리 사라지지 않도록 이동 속도 제한
 * - 화면 밖 슬롯을 반대편에서 재사용하는 무한 루프
 * - Grid View에서는 WebGL 제거 + 원래 DOM 카드 표시
 *
 * 연결:
 * <script src="../js/designer_02.js" defer></script>
 * <script src="../js/designer-ribbon-slider.js" defer></script>
 */

(() => {
    "use strict";

    const OPTIONS = Object.assign({
        /* ---------------------------------
           WebGL Pool
        --------------------------------- */
        poolSize: 13,
        textureWidth: 420,
        textureCacheSize: 14,

        /* ---------------------------------
           3D Ribbon Flow
           왼쪽 1/3 = 정면 카드
        --------------------------------- */
        focusRatio: 1 / 3,

        rightMaxTwistDeg: 64,
        leftMaxTwistDeg: 9,

        rightTwistDistance: 1150,
        leftTwistDistance: 820,

        rightDepth: 180,
        leftDepth: 22,

        screwWaveDeg: 5,
        screwWaveLength: 1500,

        mountOffset: 14,

        /* ---------------------------------
           살아있는 듯한 리본 움직임
        --------------------------------- */
        wobbleStrengthDeg: 9,
        wobbleFrequency: 0.0055,
        wobbleSpeed: 2.0,

        velocityTwistDeg: 5.5,
        velocityDepth: 18,

        /* ---------------------------------
           Spring
        --------------------------------- */
        scrollSpring: 112,
        scrollDamping: 19,

        ribbonSpring: 76,
        ribbonDamping: 12,

        cardSpring: 96,
        cardDamping: 16,

        /* ---------------------------------
           입력 민감도 / 속도 제한
        --------------------------------- */
        wheelSpeed: 0.00435,
        dragSpeed: 0.0054,

        maxScrollLead: 1.3,
        maxScrollVelocity: 3.6,
        maxWheelStep: 0.30,

        /*
         * 카드 재사용 위치
         * 화면 경계 밖으로 이 정도 카드 폭만큼 더 나간 뒤
         * 반대편에서 생성/재사용됩니다.
         */
        spawnPaddingCards: 3,

        /* ---------------------------------
           Shader
        --------------------------------- */
        rgbSplit: 2.0,

        /* ---------------------------------
           Renderer
        --------------------------------- */
        fov: 34,
        pixelRatio: 1.25,

        /* overlay 위/아래 여유 */
        verticalPadding: 80,
    }, window.DesignerRibbonSliderOptions || {});

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const mod = (n, m) => ((n % m) + m) % m;

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

    function parseCssUrl(value) {
        const match = String(value || "").match(
            /url\((['"]?)(.*?)\1\)/i
        );

        return match ? match[2] : "";
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
            console.warn(
                "[DesignerRibbonSlider] Three.js 로드 실패:",
                error
            );
            return;
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        /* =====================================================
           Original Card Data
        ===================================================== */

        function getOriginalCards() {
            const all = [
                ...track.querySelectorAll(".designer-card")
            ];

            const originals = all.filter(
                card => !card.hasAttribute("data-loop-clone")
            );

            return originals.length ? originals : all;
        }

        let sourceCards = getOriginalCards();

        if (!sourceCards.length) return;

        function readCard(card) {
            const imageWrap = card.querySelector(
                ".designer-card__image-wrap"
            );

            const cssImage =
                imageWrap?.style.getPropertyValue(
                    "--designer-card-image"
                ) ||
                (
                    imageWrap
                        ? getComputedStyle(imageWrap)
                            .getPropertyValue("--designer-card-image")
                        : ""
                );

            return {
                element: card,

                url: parseCssUrl(cssImage),

                nameKo:
                    card.dataset.nameKo ||
                    card.querySelector(
                        ".designer-card__name-ko"
                    )?.textContent?.trim() ||
                    "",

                nameEn:
                    card.dataset.nameEn ||
                    card.querySelector(
                        ".designer-card__name-en"
                    )?.textContent?.trim() ||
                    "",

                href:
                    card.getAttribute("href") || ""
            };
        }

        let cardData = sourceCards.map(readCard);

        /* =====================================================
           Style
        ===================================================== */

        const style = document.createElement("style");

        style.dataset.designerRibbonSliderStyle = "";

        style.textContent = `
            /*
             * WebGL 전용 overlay.
             * 원본 .designer-card / .designer-track 레이아웃 CSS는
             * 이 JS에서 절대 덮어쓰지 않습니다.
             */
            .designer-ribbon-webgl {
                position: fixed;
                z-index: 20;
                overflow: hidden;

                display: none;
                opacity: 0;
                pointer-events: none;

                touch-action: none;
            }

            .designer-ribbon-webgl.is-active {
                display: block;
                opacity: 1;
                pointer-events: auto;
            }

            .designer-ribbon-webgl canvas {
                display: block;
                width: 100%;
                height: 100%;
            }

            @media (prefers-reduced-motion: reduce) {
                .designer-ribbon-webgl {
                    display: none !important;
                }
            }
        `;

        document.head.appendChild(style);

        /* =====================================================
           Overlay / Renderer
        ===================================================== */

        const overlay = document.createElement("div");

        overlay.className = "designer-ribbon-webgl";
        overlay.setAttribute("aria-hidden", "true");

        document.body.appendChild(overlay);

        let renderer;

        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
        } catch (error) {
            console.warn(
                "[DesignerRibbonSlider] WebGL 생성 실패:",
                error
            );

            style.remove();
            overlay.remove();
            return;
        }

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                OPTIONS.pixelRatio
            )
        );

        renderer.setClearColor(0x000000, 0);

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

        /* =====================================================
           Layout Values
        ===================================================== */

        let cardWidth = 320;
        let cardHeight = 470;
        let gap = 24;
        let step = 344;

        /*
         * Slide View 카드 모양도 CSS에서 읽습니다.
         * .designer-card__image-wrap의 border-radius를 WebGL shader에 전달합니다.
         */
        let cardRadius = 17;

        let focusX = 0;
        let overlayWidth = 1;
        let overlayHeight = 1;

        function measure() {
            sourceCards = getOriginalCards();

            if (sourceCards[0]) {
                const rect =
                    sourceCards[0].getBoundingClientRect();

                if (rect.width > 2) {
                    cardWidth = rect.width;
                }

                if (rect.height > 2) {
                    cardHeight = rect.height;
                }

                const imageWrap =
                    sourceCards[0].querySelector(
                        ".designer-card__image-wrap"
                    );

                if (imageWrap) {
                    const imageStyle =
                        getComputedStyle(imageWrap);

                    const radius =
                        parseFloat(
                            imageStyle.borderTopLeftRadius
                        );

                    if (Number.isFinite(radius)) {
                        cardRadius = radius;
                    }
                }
            }

            const trackStyle = getComputedStyle(track);

            gap =
                parseFloat(
                    trackStyle.columnGap ||
                    trackStyle.gap
                ) || 24;

            step = cardWidth + gap;

            updateOverlayRect();

            /*
             * overlay가 실제 크기를 가진 상태에서만 renderer resize.
             */
            if (
                overlay.offsetWidth > 0 &&
                overlay.offsetHeight > 0
            ) {
                resizeRenderer();
            }

            syncCssCardUniforms();
        }

        function updateOverlayRect() {
            const rect = slider.getBoundingClientRect();

            const extra =
                OPTIONS.verticalPadding;

            overlay.style.left =
                `${Math.round(rect.left)}px`;

            overlay.style.top =
                `${Math.round(rect.top - extra)}px`;

            overlay.style.width =
                `${Math.round(rect.width)}px`;

            overlay.style.height =
                `${Math.round(rect.height + extra * 2)}px`;
        }

        function syncCssCardUniforms() {
            for (const slot of slots) {
                if (!slot?.uniforms) continue;

                slot.uniforms.uCardSize.value.set(
                    cardWidth,
                    cardHeight
                );

                slot.uniforms.uRadius.value =
                    cardRadius;
            }
        }


        function resizeRenderer() {
            overlayWidth =
                Math.max(
                    1,
                    overlay.clientWidth
                );

            overlayHeight =
                Math.max(
                    1,
                    overlay.clientHeight
                );

            renderer.setSize(
                overlayWidth,
                overlayHeight,
                false
            );

            camera.aspect =
                overlayWidth /
                overlayHeight;

            camera.updateProjectionMatrix();

            const fov =
                THREE.MathUtils.degToRad(
                    camera.fov
                );

            const cameraZ =
                (overlayHeight / 2) /
                Math.tan(fov / 2);

            camera.position.set(
                0,
                0,
                cameraZ
            );

            camera.lookAt(
                0,
                0,
                0
            );

            /*
             * WebGL world 좌표 기준
             * 왼쪽 1/3 = center 기준 -width/6
             */
            focusX =
                -overlayWidth / 6;
        }

        /* =====================================================
           Texture Cache
        ===================================================== */

        const placeholderCanvas =
            document.createElement("canvas");

        placeholderCanvas.width = 2;
        placeholderCanvas.height = 2;

        const placeholderCtx =
            placeholderCanvas.getContext("2d");

        placeholderCtx.fillStyle = "#222";
        placeholderCtx.fillRect(0, 0, 2, 2);

        const placeholderTexture =
            new THREE.CanvasTexture(
                placeholderCanvas
            );

        placeholderTexture.generateMipmaps = false;
        placeholderTexture.minFilter = THREE.LinearFilter;
        placeholderTexture.magFilter = THREE.LinearFilter;

        const textureCache = new Map();

        let textureUseClock = 0;

        async function loadImage(url) {
            return await new Promise(
                (resolve, reject) => {
                    if (!url) {
                        reject(new Error("image url 없음"));
                        return;
                    }

                    const image = new Image();

                    if (!/^(data:|blob:)/i.test(url)) {
                        image.crossOrigin = "anonymous";
                    }

                    image.onload = () => resolve(image);
                    image.onerror = reject;

                    image.src = url;
                }
            );
        }

        function activeTextures() {
            return new Set(
                slots
                    .map(slot => slot.texture)
                    .filter(
                        texture =>
                            texture &&
                            texture !== placeholderTexture
                    )
            );
        }

        function evictTextures() {
            if (
                textureCache.size <=
                OPTIONS.textureCacheSize
            ) {
                return;
            }

            const active =
                activeTextures();

            const candidates =
                [...textureCache.entries()]
                    .filter(
                        ([, entry]) =>
                            !active.has(entry.texture)
                    )
                    .sort(
                        (a, b) =>
                            a[1].used -
                            b[1].used
                    );

            while (
                textureCache.size >
                    OPTIONS.textureCacheSize &&
                candidates.length
            ) {
                const [key, entry] =
                    candidates.shift();

                textureCache.delete(key);
                entry.texture.dispose();
            }
        }

        async function createCardTexture(index) {
            const item = cardData[index];

            if (!item) {
                return placeholderTexture;
            }

            const cacheKey =
                `${index}|${item.url}|${item.nameKo}|${item.nameEn}`;

            const cached =
                textureCache.get(cacheKey);

            if (cached) {
                cached.used = ++textureUseClock;
                return cached.texture;
            }

            const ratio =
                cardWidth /
                Math.max(
                    1,
                    cardHeight
                );

            const canvas =
                document.createElement("canvas");

            canvas.width =
                OPTIONS.textureWidth;

            canvas.height =
                Math.max(
                    2,
                    Math.round(
                        OPTIONS.textureWidth /
                        ratio
                    )
                );

            const ctx =
                canvas.getContext("2d");

            const W = canvas.width;
            const H = canvas.height;

            ctx.fillStyle = "#222";
            ctx.fillRect(0, 0, W, H);

            try {
                const image =
                    await loadImage(item.url);

                const imageRatio =
                    image.naturalWidth /
                    image.naturalHeight;

                const canvasRatio =
                    W / H;

                let sx = 0;
                let sy = 0;
                let sw = image.naturalWidth;
                let sh = image.naturalHeight;

                if (imageRatio > canvasRatio) {
                    sw =
                        image.naturalHeight *
                        canvasRatio;

                    sx =
                        (
                            image.naturalWidth -
                            sw
                        ) / 2;
                } else {
                    sh =
                        image.naturalWidth /
                        canvasRatio;

                    sy =
                        (
                            image.naturalHeight -
                            sh
                        ) / 2;
                }

                ctx.drawImage(
                    image,
                    sx,
                    sy,
                    sw,
                    sh,
                    0,
                    0,
                    W,
                    H
                );
            } catch (error) {
                console.warn(
                    "[DesignerRibbonSlider] 이미지 로드 실패:",
                    item.url
                );
            }

            /*
             * 기존 Slide View처럼 아래쪽 텍스트 영역
             */
            const gradient =
                ctx.createLinearGradient(
                    0,
                    H * 0.52,
                    0,
                    H
                );

            gradient.addColorStop(
                0,
                "rgba(0,0,0,0)"
            );

            gradient.addColorStop(
                1,
                "rgba(0,0,0,.78)"
            );

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, W, H);

            const left = W * 0.10;

            ctx.textBaseline = "bottom";

            ctx.fillStyle = "#fff";

            ctx.font =
                `600 ${Math.round(W * 0.050)}px Pretendard, Arial, sans-serif`;

            ctx.fillText(
                item.nameKo,
                left,
                H - W * 0.105
            );

            ctx.fillStyle =
                "rgba(255,255,255,.72)";

            ctx.font =
                `300 ${Math.round(W * 0.034)}px Pretendard, Arial, sans-serif`;

            ctx.fillText(
                item.nameEn,
                left,
                H - W * 0.058
            );

            const texture =
                new THREE.CanvasTexture(canvas);

            if ("colorSpace" in texture) {
                texture.colorSpace =
                    THREE.SRGBColorSpace;
            }

            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            textureCache.set(
                cacheKey,
                {
                    texture,
                    used: ++textureUseClock
                }
            );

            evictTextures();

            return texture;
        }

        /* =====================================================
           Shared GLSL Flow
        ===================================================== */

        const FLOW_GLSL = `
            float PI = 3.14159265359;

            float smootherstep5(
                float edge0,
                float edge1,
                float x
            ) {
                float t =
                    clamp(
                        (x - edge0) /
                        max(
                            0.0001,
                            edge1 - edge0
                        ),
                        0.0,
                        1.0
                    );

                return
                    t * t * t *
                    (
                        t *
                        (
                            t * 6.0 -
                            15.0
                        ) +
                        10.0
                    );
            }

            float ribbonTwist(
                float x,
                float focusX,
                float rightDistance,
                float leftDistance,
                float rightMax,
                float leftMax,
                float waveAmount,
                float waveLength
            ) {
                float d =
                    x -
                    focusX;

                float rightT =
                    smootherstep5(
                        0.0,
                        rightDistance,
                        max(d, 0.0)
                    );

                float leftT =
                    smootherstep5(
                        0.0,
                        leftDistance,
                        max(-d, 0.0)
                    );

                float angle =
                    rightT * rightMax -
                    leftT * leftMax;

                float distanceFactor =
                    smootherstep5(
                        100.0,
                        650.0,
                        abs(d)
                    );

                angle +=
                    sin(
                        x /
                        waveLength *
                        6.28318530718
                    ) *
                    waveAmount *
                    distanceFactor;

                return angle;
            }

            float ribbonDepth(
                float x,
                float focusX,
                float rightDistance,
                float leftDistance,
                float rightDepth,
                float leftDepth
            ) {
                float d =
                    x -
                    focusX;

                float rightT =
                    smootherstep5(
                        0.0,
                        rightDistance,
                        max(d, 0.0)
                    );

                float leftT =
                    smootherstep5(
                        0.0,
                        leftDistance,
                        max(-d, 0.0)
                    );

                return
                    -rightT * rightDepth -
                    leftT * leftDepth;
            }
        `;

        /* =====================================================
           Card Shader
           보이지 않는 공통 ribbon field만 사용.
        ===================================================== */

        const vertexShader = `
            uniform float uCardCenterX;
            uniform float uFocusX;

            uniform float uRightDistance;
            uniform float uLeftDistance;

            uniform float uRightMaxTwist;
            uniform float uLeftMaxTwist;

            uniform float uRightDepth;
            uniform float uLeftDepth;

            uniform float uWaveAmount;
            uniform float uWaveLength;

            uniform float uMountOffset;

            uniform float uDynamicTwist;
            uniform float uDynamicDepth;

            uniform float uTime;
            uniform float uVelocity;

            uniform float uWobbleStrength;
            uniform float uWobbleFrequency;
            uniform float uWobbleSpeed;

            varying vec2 vUv;
            varying float vFacing;

            ${FLOW_GLSL}

            void main() {
                vUv = uv;

                /*
                 * 모든 카드 vertex가
                 * 같은 화면 X 기반 ribbon field를 샘플링.
                 */
                float x =
                    uCardCenterX +
                    position.x;

                float baseAngle =
                    ribbonTwist(
                        x,
                        uFocusX,
                        uRightDistance,
                        uLeftDistance,
                        uRightMaxTwist,
                        uLeftMaxTwist,
                        uWaveAmount,
                        uWaveLength
                    );

                /*
                 * Scroll velocity가 있을 때만
                 * 같은 ribbon phase로 wobble.
                 */
                float wobble =
                    sin(
                        x *
                        uWobbleFrequency +
                        uTime *
                        uWobbleSpeed
                    ) *
                    uWobbleStrength *
                    abs(uVelocity);

                wobble +=
                    sin(
                        x *
                        uWobbleFrequency *
                        0.55 -
                        uTime *
                        uWobbleSpeed *
                        0.75 +
                        1.7
                    ) *
                    uWobbleStrength *
                    0.42 *
                    abs(uVelocity);

                float angle =
                    baseAngle +
                    uDynamicTwist +
                    wobble;

                float c =
                    cos(angle);

                float s =
                    sin(angle);

                /*
                 * 가로 중심축(X축)을 기준으로
                 * 카드 위/아래가 실제 Z 방향으로 회전.
                 */
                float localY =
                    position.y;

                float y =
                    localY * c;

                float z =
                    localY * s;

                z +=
                    ribbonDepth(
                        x,
                        uFocusX,
                        uRightDistance,
                        uLeftDistance,
                        uRightDepth,
                        uLeftDepth
                    );

                z +=
                    sin(
                        x * 0.004 +
                        uTime * 2.0
                    ) *
                    uDynamicDepth;

                /*
                 * 보이지 않는 ribbon 표면보다
                 * 아주 조금 앞쪽에 카드 배치.
                 */
                y +=
                    -s *
                    uMountOffset;

                z +=
                    c *
                    uMountOffset;

                vFacing = c;

                gl_Position =
                    projectionMatrix *
                    modelViewMatrix *
                    vec4(
                        x,
                        y,
                        z,
                        1.0
                    );
            }
        `;

        const fragmentShader = `
            uniform sampler2D uTexture;
            uniform float uSplit;
            uniform float uOpacity;

            uniform vec2 uCardSize;
            uniform float uRadius;

            varying vec2 vUv;
            varying float vFacing;

            float roundedRectMask(
                vec2 uv,
                vec2 sizePx,
                float radiusPx
            ) {
                float r =
                    clamp(
                        radiusPx,
                        0.0,
                        min(sizePx.x, sizePx.y) * 0.5
                    );

                vec2 p =
                    (uv - 0.5) *
                    sizePx;

                vec2 b =
                    sizePx * 0.5 -
                    vec2(r);

                vec2 q =
                    abs(p) -
                    b;

                float d =
                    length(max(q, 0.0)) +
                    min(max(q.x, q.y), 0.0) -
                    r;

                return
                    1.0 -
                    smoothstep(
                        -1.0,
                        1.0,
                        d
                    );
            }

            void main() {
                /*
                 * 거의 옆면까지만 표시.
                 * 뒤집힌 뒷면은 보이지 않음.
                 */
                float facing =
                    smoothstep(
                        0.015,
                        0.14,
                        vFacing
                    );

                vec2 offset =
                    vec2(
                        uSplit,
                        0.0
                    );

                vec4 center =
                    texture2D(
                        uTexture,
                        vUv
                    );

                vec4 red =
                    texture2D(
                        uTexture,
                        clamp(
                            vUv + offset,
                            0.001,
                            0.999
                        )
                    );

                vec4 blue =
                    texture2D(
                        uTexture,
                        clamp(
                            vUv - offset,
                            0.001,
                            0.999
                        )
                    );

                vec3 rgb =
                    vec3(
                        red.r,
                        center.g,
                        blue.b
                    );

                rgb *=
                    mix(
                        0.43,
                        1.0,
                        clamp(
                            vFacing,
                            0.0,
                            1.0
                        )
                    );

                float rounded =
                    roundedRectMask(
                        vUv,
                        uCardSize,
                        uRadius
                    );

                gl_FragColor =
                    vec4(
                        rgb,
                        center.a *
                        uOpacity *
                        facing *
                        rounded
                    );
            }
        `;

        /* =====================================================
           Geometry Pool
        ===================================================== */

        let slots = [];

        const poolSize =
            Math.max(
                5,
                OPTIONS.poolSize % 2 === 0
                    ? OPTIONS.poolSize + 1
                    : OPTIONS.poolSize
            );

        const halfPool =
            Math.floor(
                poolSize / 2
            );

        function createSlots() {
            for (const slot of slots) {
                group.remove(slot.mesh);
                slot.mesh.geometry.dispose();
                slot.material.dispose();
            }

            slots = [];

            for (
                let i = 0;
                i < poolSize;
                i++
            ) {
                const geometry =
                    new THREE.PlaneGeometry(
                        cardWidth,
                        cardHeight,
                        44,
                        18
                    );

                const uniforms = {
                    uTexture: {
                        value:
                            placeholderTexture
                    },

                    uCardCenterX: {
                        value: 0
                    },

                    uFocusX: {
                        value: focusX
                    },

                    uRightDistance: {
                        value:
                            OPTIONS.rightTwistDistance
                    },

                    uLeftDistance: {
                        value:
                            OPTIONS.leftTwistDistance
                    },

                    uRightMaxTwist: {
                        value:
                            THREE.MathUtils.degToRad(
                                OPTIONS.rightMaxTwistDeg
                            )
                    },

                    uLeftMaxTwist: {
                        value:
                            THREE.MathUtils.degToRad(
                                OPTIONS.leftMaxTwistDeg
                            )
                    },

                    uRightDepth: {
                        value:
                            OPTIONS.rightDepth
                    },

                    uLeftDepth: {
                        value:
                            OPTIONS.leftDepth
                    },

                    uWaveAmount: {
                        value:
                            THREE.MathUtils.degToRad(
                                OPTIONS.screwWaveDeg
                            )
                    },

                    uWaveLength: {
                        value:
                            OPTIONS.screwWaveLength
                    },

                    uMountOffset: {
                        value:
                            OPTIONS.mountOffset
                    },

                    uDynamicTwist: {
                        value: 0
                    },

                    uDynamicDepth: {
                        value: 0
                    },

                    uTime: {
                        value: 0
                    },

                    uVelocity: {
                        value: 0
                    },

                    uWobbleStrength: {
                        value:
                            THREE.MathUtils.degToRad(
                                OPTIONS.wobbleStrengthDeg
                            )
                    },

                    uWobbleFrequency: {
                        value:
                            OPTIONS.wobbleFrequency
                    },

                    uWobbleSpeed: {
                        value:
                            OPTIONS.wobbleSpeed
                    },

                    uSplit: {
                        value: 0
                    },

                    uOpacity: {
                        value: 1
                    },

                    uCardSize: {
                        value:
                            new THREE.Vector2(
                                cardWidth,
                                cardHeight
                            )
                    },

                    uRadius: {
                        value:
                            cardRadius
                    }
                };

                const material =
                    new THREE.ShaderMaterial({
                        uniforms,
                        vertexShader,
                        fragmentShader,
                        transparent: true,
                        depthTest: true,
                        depthWrite: true,
                        side: THREE.FrontSide
                    });

                const mesh =
                    new THREE.Mesh(
                        geometry,
                        material
                    );

                mesh.frustumCulled = false;

                group.add(mesh);

                slots.push({
                    mesh,
                    material,
                    uniforms,

                    virtualIndex:
                        i - halfPool,

                    dataIndex: -1,

                    texture:
                        placeholderTexture,

                    loadToken: 0,

                    position: 0,
                    velocity: 0
                });
            }
        }

        /* =====================================================
           Spring
        ===================================================== */

        function springStep(
            state,
            target,
            stiffness,
            damping,
            dt
        ) {
            const count =
                Math.max(
                    1,
                    Math.ceil(
                        dt * 120
                    )
                );

            const h =
                dt / count;

            for (
                let i = 0;
                i < count;
                i++
            ) {
                const force =
                    (
                        target -
                        state.position
                    ) *
                    stiffness;

                state.velocity +=
                    (
                        force -
                        state.velocity *
                        damping
                    ) *
                    h;

                state.position +=
                    state.velocity *
                    h;
            }
        }

        /* =====================================================
           Scroll State
        ===================================================== */

        let targetScroll = 0;

        const scrollState = {
            position: 0,
            velocity: 0
        };

        const ribbonState = {
            position: 0,
            velocity: 0
        };

        const dynamicTwistState = {
            position: 0,
            velocity: 0
        };

        const dynamicDepthState = {
            position: 0,
            velocity: 0
        };

        function limitScrollTarget() {
            targetScroll =
                clamp(
                    targetScroll,
                    scrollState.position -
                        OPTIONS.maxScrollLead,
                    scrollState.position +
                        OPTIONS.maxScrollLead
                );
        }

        /* =====================================================
           Texture Assignment
        ===================================================== */

        async function assignTexture(
            slot,
            virtualIndex
        ) {
            const index =
                mod(
                    virtualIndex,
                    cardData.length
                );

            if (
                slot.dataIndex ===
                index
            ) {
                return;
            }

            slot.dataIndex =
                index;

            const token =
                ++slot.loadToken;

            slot.texture =
                placeholderTexture;

            slot.uniforms
                .uTexture
                .value =
                    placeholderTexture;

            try {
                const texture =
                    await createCardTexture(
                        index
                    );

                if (
                    token !==
                    slot.loadToken
                ) {
                    return;
                }

                slot.texture =
                    texture;

                slot.uniforms
                    .uTexture
                    .value =
                        texture;

                wake();
            } catch (error) {
                console.warn(
                    "[DesignerRibbonSlider] texture 생성 실패:",
                    error
                );
            }
        }

        /* =====================================================
           Actual Card Movement
        ===================================================== */

        function updateSlots(
            time,
            dt
        ) {
            limitScrollTarget();

            springStep(
                scrollState,
                targetScroll,
                OPTIONS.scrollSpring,
                OPTIONS.scrollDamping,
                dt
            );

            scrollState.velocity =
                clamp(
                    scrollState.velocity,
                    -OPTIONS.maxScrollVelocity,
                    OPTIONS.maxScrollVelocity
                );

            springStep(
                ribbonState,
                scrollState.position,
                OPTIONS.ribbonSpring,
                OPTIONS.ribbonDamping,
                dt
            );

            const normalizedVelocity =
                clamp(
                    scrollState.velocity /
                    OPTIONS.maxScrollVelocity,
                    -1,
                    1
                );

            springStep(
                dynamicTwistState,
                THREE.MathUtils.degToRad(
                    normalizedVelocity *
                    OPTIONS.velocityTwistDeg
                ),
                80,
                13,
                dt
            );

            springStep(
                dynamicDepthState,
                normalizedVelocity *
                    OPTIONS.velocityDepth,
                72,
                11,
                dt
            );

            /*
             * 슬롯마다 virtualIndex 유지.
             * 실제 카드 Mesh가 계속 좌우로 움직임.
             */
            for (const slot of slots) {
                let relative =
                    slot.virtualIndex -
                    ribbonState.position;

                let targetCenter =
                    focusX +
                    relative *
                    step;

                /*
                 * 카드 재사용 기준을 "몇 번째 카드인가"가 아니라
                 * 실제 화면 바깥 위치로 계산합니다.
                 *
                 * 오른쪽 3D 왜곡은 Z축으로 멀어지면서
                 * 원근 때문에 화면 안쪽으로 당겨져 보일 수 있으므로,
                 * 카드 폭보다 더 큰 padding을 두고 완전히 화면 밖에서만
                 * 재사용하도록 합니다.
                 */
                const spawnPadding =
                    cardWidth *
                    OPTIONS.spawnPaddingCards;

                const leftRecycleEdge =
                    -overlayWidth * 0.5 -
                    spawnPadding;

                const rightRecycleEdge =
                    overlayWidth * 0.5 +
                    spawnPadding;

                /*
                 * 왼쪽 경계를 완전히 벗어난 카드만
                 * 오른쪽 바깥으로 재사용.
                 */
                if (
                    targetCenter <
                    leftRecycleEdge
                ) {
                    slot.virtualIndex +=
                        poolSize;

                    relative =
                        slot.virtualIndex -
                        ribbonState.position;

                    targetCenter =
                        focusX +
                        relative *
                        step;

                    /*
                     * 재사용 순간에는 스프링 이동을 하지 않고
                     * 새 바깥 위치에 즉시 놓습니다.
                     */
                    slot.position =
                        targetCenter;

                    slot.velocity = 0;
                    slot.dataIndex = -1;
                }

                /*
                 * 오른쪽 경계를 완전히 벗어난 카드만
                 * 왼쪽 바깥으로 재사용.
                 */
                else if (
                    targetCenter >
                    rightRecycleEdge
                ) {
                    slot.virtualIndex -=
                        poolSize;

                    relative =
                        slot.virtualIndex -
                        ribbonState.position;

                    targetCenter =
                        focusX +
                        relative *
                        step;

                    slot.position =
                        targetCenter;

                    slot.velocity = 0;
                    slot.dataIndex = -1;
                }

                assignTexture(
                    slot,
                    slot.virtualIndex
                );

                /*
                 * Mesh 자체 X 이동도 spring.
                 */
                springStep(
                    slot,
                    targetCenter,
                    OPTIONS.cardSpring,
                    OPTIONS.cardDamping,
                    dt
                );

                slot.uniforms
                    .uCardCenterX
                    .value =
                        slot.position;

                slot.uniforms
                    .uFocusX
                    .value =
                        focusX;

                slot.uniforms
                    .uDynamicTwist
                    .value =
                        dynamicTwistState.position;

                slot.uniforms
                    .uDynamicDepth
                    .value =
                        dynamicDepthState.position;

                slot.uniforms
                    .uVelocity
                    .value =
                        normalizedVelocity;

                slot.uniforms
                    .uTime
                    .value =
                        time;

                slot.uniforms
                    .uSplit
                    .value =
                        (
                            normalizedVelocity *
                            OPTIONS.rgbSplit
                        ) /
                        Math.max(
                            1,
                            cardWidth
                        );

                slot.uniforms
                    .uOpacity
                    .value =
                        clamp(
                            1 -
                            Math.abs(relative) *
                            0.055,
                            0.42,
                            1
                        );
            }
        }

        /* =====================================================
           Pointer / Drag
        ===================================================== */

        let dragging = false;
        let dragStartX = 0;
        let dragStartScroll = 0;

        overlay.addEventListener(
            "pointerdown",
            event => {
                dragging = true;

                dragStartX =
                    event.clientX;

                dragStartScroll =
                    targetScroll;

                overlay.setPointerCapture?.(
                    event.pointerId
                );

                overlay.style.cursor =
                    "grabbing";
            }
        );

        overlay.addEventListener(
            "pointermove",
            event => {
                if (!dragging) return;

                const dx =
                    event.clientX -
                    dragStartX;

                targetScroll =
                    dragStartScroll -
                    dx *
                    OPTIONS.dragSpeed;

                limitScrollTarget();

                wake();
            }
        );

        function stopDrag(event) {
            dragging = false;

            overlay.releasePointerCapture?.(
                event.pointerId
            );

            overlay.style.cursor =
                "grab";
        }

        overlay.addEventListener(
            "pointerup",
            stopDrag
        );

        overlay.addEventListener(
            "pointercancel",
            stopDrag
        );

        /* =====================================================
           Wheel
        ===================================================== */

        overlay.addEventListener(
            "wheel",
            event => {
                if (
                    !page.classList.contains(
                        "slide-view"
                    )
                ) {
                    return;
                }

                event.preventDefault();

                const delta =
                    Math.abs(event.deltaX) >
                    Math.abs(event.deltaY)
                        ? event.deltaX
                        : event.deltaY;

                const stepDelta =
                    clamp(
                        delta *
                        OPTIONS.wheelSpeed,
                        -OPTIONS.maxWheelStep,
                        OPTIONS.maxWheelStep
                    );

                targetScroll +=
                    stepDelta;

                limitScrollTarget();

                wake();
            },
            {
                passive: false
            }
        );

        /* =====================================================
           Click card
        ===================================================== */

        const raycaster =
            new THREE.Raycaster();

        const pointer =
            new THREE.Vector2();

        let pointerDownX = 0;
        let pointerDownY = 0;

        overlay.addEventListener(
            "pointerdown",
            event => {
                pointerDownX =
                    event.clientX;

                pointerDownY =
                    event.clientY;
            }
        );

        overlay.addEventListener(
            "click",
            event => {
                if (
                    Math.hypot(
                        event.clientX -
                            pointerDownX,
                        event.clientY -
                            pointerDownY
                    ) > 6
                ) {
                    return;
                }

                const rect =
                    overlay.getBoundingClientRect();

                pointer.x =
                    (
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width
                    ) *
                    2 -
                    1;

                pointer.y =
                    -(
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height
                    ) *
                    2 +
                    1;

                raycaster.setFromCamera(
                    pointer,
                    camera
                );

                const intersections =
                    raycaster.intersectObjects(
                        slots.map(
                            slot =>
                                slot.mesh
                        ),
                        false
                    );

                if (!intersections.length) {
                    return;
                }

                const mesh =
                    intersections[0].object;

                const slot =
                    slots.find(
                        item =>
                            item.mesh === mesh
                    );

                if (!slot) return;

                const index =
                    mod(
                        slot.virtualIndex,
                        cardData.length
                    );

                const href =
                    cardData[index]?.href;

                if (
                    href &&
                    href !== "#"
                ) {
                    window.location.href =
                        href;
                }
            }
        );

        /* =====================================================
           View State
        ===================================================== */

        function isSlideView() {
            return (
                page.classList.contains(
                    "slide-view"
                ) &&
                !reducedMotion.matches
            );
        }

        /*
         * 원본 카드는 Grid/Slide가 함께 사용하므로
         * 개별 카드에는 어떤 style/class도 넣지 않습니다.
         *
         * Slide View 동안만 track 전체를 숨기고,
         * Grid View에서는 즉시 원상복구합니다.
         */
        let originalTrackVisibility =
            track.style.visibility;

        function hideOriginalTrackForSlide() {
            track.style.visibility =
                "hidden";
        }

        function restoreOriginalTrack() {
            if (originalTrackVisibility) {
                track.style.visibility =
                    originalTrackVisibility;
            } else {
                track.style.removeProperty(
                    "visibility"
                );
            }
        }

        function hardStopWebGL() {
            /*
             * Grid 전환 시 WebGL을 렌더링 트리에서 완전히 제외.
             */
            overlay.classList.remove(
                "is-active"
            );

            overlay.style.display =
                "none";

            overlay.style.pointerEvents =
                "none";

            dragging = false;

            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        }

        function activate() {
            if (!isSlideView()) {
                deactivate();
                return;
            }

            /*
             * Slide View로 들어온 순간에만 데이터 갱신.
             */
            sourceCards =
                getOriginalCards();

            cardData =
                sourceCards.map(
                    readCard
                );

            /*
             * 중요:
             * measure()보다 먼저 overlay를 display:block 상태로 만들어야
             * clientWidth / clientHeight가 실제 값으로 측정됩니다.
             */
            overlay.style.display =
                "block";

            overlay.style.pointerEvents =
                "auto";

            overlay.classList.add(
                "is-active"
            );

            /*
             * overlay가 실제 레이아웃에 참여한 뒤 크기 측정.
             */
            updateOverlayRect();
            resizeRenderer();

            /*
             * DOM 카드의 실제 Slide 크기를 읽은 뒤
             * WebGL 카드 geometry와 간격을 맞춤.
             */
            measure();

            /*
             * 원본 DOM track은 WebGL 준비가 끝난 다음 숨깁니다.
             */
            hideOriginalTrackForSlide();

            /*
             * Slide 진입 시 카드 슬롯을 현재 위치 기준으로 재정렬.
             */
            for (const slot of slots) {
                const relative =
                    slot.virtualIndex -
                    ribbonState.position;

                slot.position =
                    focusX +
                    relative *
                    step;

                slot.velocity = 0;
            }

            /*
             * 첫 프레임을 즉시 그려서
             * DOM track을 숨인 뒤 빈 화면이 보이지 않게 합니다.
             */
            renderer.render(
                scene,
                camera
            );

            wake();
        }

        function deactivate() {
            /*
             * Grid View:
             * 1) 원본 DOM track 즉시 복원
             * 2) WebGL overlay 완전 제거(display:none)
             * 3) RAF 즉시 정지
             * 4) 카드/scroll DOM 값은 절대 건드리지 않음
             */
            restoreOriginalTrack();

            hardStopWebGL();
        }

        /* =====================================================
           Frame
        ===================================================== */

        let raf = 0;
        let previousTime =
            performance.now();

        function frame(now) {
            raf = 0;

            /*
             * Grid 상태에서는 WebGL update/render를 단 한 줄도 실행하지 않음.
             */
            if (!isSlideView()) {
                deactivate();
                return;
            }

            const dt =
                clamp(
                    (
                        now -
                        previousTime
                    ) /
                    1000,
                    1 / 240,
                    1 / 30
                );

            previousTime = now;

            updateOverlayRect();

            updateSlots(
                now / 1000,
                dt
            );

            renderer.render(
                scene,
                camera
            );

            const moving =
                Math.abs(
                    targetScroll -
                    scrollState.position
                ) > 0.002 ||

                Math.abs(
                    scrollState.velocity
                ) > 0.002 ||

                Math.abs(
                    ribbonState.velocity
                ) > 0.002 ||

                Math.abs(
                    dynamicTwistState.position
                ) > 0.0002 ||

                Math.abs(
                    dynamicDepthState.position
                ) > 0.01 ||

                dragging;

            if (moving) {
                wake();
            }
        }

        function wake() {
            if (raf) return;

            previousTime =
                performance.now();

            raf =
                requestAnimationFrame(
                    frame
                );
        }

        /* =====================================================
           Existing Slider Scroll Sync
           designer_02.js가 scrollLeft를 바꾸는 경우 대응
        ===================================================== */

        let previousSliderScroll =
            slider.scrollLeft;

        slider.addEventListener(
            "scroll",
            () => {
                /*
                 * 매우 중요:
                 * Grid View에서는 이 JS가 slider.scrollLeft를
                 * 읽기만 하고 아무 동작도 하지 않습니다.
                 *
                 * designer_02.js가 Grid 전환 시 scrollLeft = 0을
                 * 실행해도 WebGL 쪽 scroll 상태에 반영되지 않습니다.
                 */
                if (!isSlideView()) {
                    previousSliderScroll =
                        slider.scrollLeft;

                    return;
                }

                /*
                 * Slide View에서만 DOM slider와 WebGL scroll을 동기화.
                 */
                const diff =
                    slider.scrollLeft -
                    previousSliderScroll;

                previousSliderScroll =
                    slider.scrollLeft;

                if (
                    Math.abs(diff) >
                    0.5
                ) {
                    targetScroll +=
                        diff /
                        Math.max(
                            1,
                            step
                        );

                    limitScrollTarget();
                }

                wake();
            },
            { passive: true }
        );

        /* =====================================================
           Observers
        ===================================================== */

        const pageObserver =
            new MutationObserver(() => {
                if (isSlideView()) {
                    previousSliderScroll =
                        slider.scrollLeft;

                    requestAnimationFrame(
                        activate
                    );
                } else {
                    /*
                     * class가 grid-view로 바뀌는 그 순간 바로 복원.
                     */
                    restoreOriginalTrack();

                    hardStopWebGL();

                    previousSliderScroll =
                        slider.scrollLeft;
                }
            });

        pageObserver.observe(page, {
            attributes: true,
            attributeFilter: ["class"]
        });

        let resizeTimer = 0;

        window.addEventListener(
            "resize",
            () => {
                clearTimeout(resizeTimer);

                resizeTimer =
                    setTimeout(() => {
                        /*
                         * Grid View에서는 WebGL용 measure/createSlots를
                         * 실행하지 않습니다.
                         * Grid 카드의 실제 CSS 레이아웃만 브라우저가 처리합니다.
                         */
                        if (!isSlideView()) {
                            return;
                        }

                        measure();

                        /*
                         * Slide View일 때만 실제 CSS 카드 크기에 맞춰
                         * WebGL geometry를 재생성합니다.
                         */
                        createSlots();

                        activate();
                    }, 120);
            },
            { passive: true }
        );

        const trackObserver =
            new MutationObserver(() => {
                /*
                 * Grid View에서는 DOM 카드가 원래 CSS Grid로만 동작해야 하므로
                 * WebGL texture / slot 갱신을 하지 않습니다.
                 */
                if (!isSlideView()) {
                    return;
                }

                const nextCards =
                    getOriginalCards();

                /*
                 * Slide View에서 필터/데이터 교체 등으로
                 * 카드 목록이 바뀐 경우에만 갱신합니다.
                 */
                if (
                    nextCards.length !==
                    sourceCards.length
                ) {
                    sourceCards =
                        nextCards;

                    cardData =
                        sourceCards.map(
                            readCard
                        );

                    for (const slot of slots) {
                        slot.dataIndex = -1;
                    }

                    wake();
                }
            });

        trackObserver.observe(track, {
            childList: true
        });

        reducedMotion.addEventListener?.(
            "change",
            () => {
                if (isSlideView()) {
                    activate();
                } else {
                    deactivate();
                }
            }
        );

        /* =====================================================
           Public API
        ===================================================== */

        window.DesignerRibbonSlider = {
            refresh() {
                sourceCards =
                    getOriginalCards();

                cardData =
                    sourceCards.map(
                        readCard
                    );

                measure();

                for (const slot of slots) {
                    slot.dataIndex = -1;
                }

                activate();
            },

            enable() {
                activate();
            },

            disable() {
                deactivate();
            },

            destroy() {
                restoreOriginalTrack();

                hardStopWebGL();

                cancelAnimationFrame(raf);

                pageObserver.disconnect();
                trackObserver.disconnect();

                for (const slot of slots) {
                    slot.mesh.geometry.dispose();
                    slot.material.dispose();
                }

                for (
                    const entry of
                    textureCache.values()
                ) {
                    entry.texture.dispose();
                }

                placeholderTexture.dispose();

                renderer.dispose();

                overlay.remove();
                style.remove();
},

            get status() {
                return {
                    cards: cardData.length,
                    poolSize: slots.length,
                    scroll:
                        scrollState.position,
                    velocity:
                        scrollState.velocity,
                    cssCardRadius:
                        cardRadius,
                    cssCardSize: {
                        width: cardWidth,
                        height: cardHeight
                    },
                    spawnPaddingCards:
                        OPTIONS.spawnPaddingCards,
                    slideView:
                        page.classList.contains(
                            "slide-view"
                        )
                };
            }
        };

        /* =====================================================
           Start
        ===================================================== */

        measure();
        createSlots();

        /*
         * 최초 주변 카드만 lazy-load.
         * 페이지 자체를 먼저 띄우고 WebGL은 idle에 시작.
         */
        const start = () => {
            if (isSlideView()) {
                activate();
            } else {
                restoreOriginalTrack();
                hardStopWebGL();
            }
        };

        if (
            "requestIdleCallback" in window
        ) {
            requestIdleCallback(
                start,
                { timeout: 500 }
            );
        } else {
            setTimeout(
                start,
                40
            );
        }
    });
})();
