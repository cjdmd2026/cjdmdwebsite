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

        maxScrollLead: 10,
        maxScrollVelocity: 3.6,
        maxWheelStep: 0.30,

        /*
         * 초성 필터가 All이 아닐 때는 무한 루프를 끄고
         * 끝에서 고무줄처럼 살짝 넘어갔다가 튕겨 돌아옵니다.
         */
        edgeBounceDistance: 0.22,
        edgeBounceKick: 3.4,
        edgeReturnDelay: 70,

        /*
         * finite mode에서 끝에 닿았을 때
         * 카드 전체 묶음이 같은 양만큼 함께 튕기도록 하는 global bounce.
         */
        edgeGroupBounceStrength: 0.28,
        edgeGroupBounceSpring: 92,
        edgeGroupBounceDamping: 13,

        /*
         * 초성 필터 전환 시 현재 카드 전체가
         * 화면 아래로 툭 떨어지는 exit animation.
         */
        filterExitDuration: 620,
        filterExitDrop: 3.0,
        filterExitStartLift: 6,

        /*
         * 떨어진 뒤 바로 새 카드가 올라오지 않도록
         * 짧은 숨 고르기 구간을 둡니다.
         */
        filterTransitionPause: 140,

        /*
         * 새로 추가되는 카드는 아래에서 위로 올라와 붙습니다.
         * 남아있는 카드는 그대로 유지됩니다.
         */
        filterEnterDuration: 720,
        filterEnterDrop: 3.0,
        filterEnterOvershoot: 10,

        /*
         * 카드 재사용 위치
         * 화면 경계 밖으로 이 정도 카드 폭만큼 더 나간 뒤
         * 반대편에서 생성/재사용됩니다.
         */
        spawnPaddingCards: 3,

        /* ---------------------------------
           Shader
        --------------------------------- */
        rgbSplit: 5.0,

        /*
         * 흰 배경 기준 가상 조명
         * - ambient: 전체 배경광
         * - diffuse: 정면을 보는 면의 밝기
         * - rim: 옆으로 꺾인 가장자리 반사광
         * - reflection: 카드 표면을 스치는 은은한 반사띠
         */
        lightAmbient: 0.86,
        lightDiffuse: 0.14,
        lightRim: 0.16,
        lightRimPower: 2.2,
        lightReflection: 0.045,
        lightReflectionCenter: 0.36,
        lightReflectionWidth: 0.42,
        lightColorR: 0.96,
        lightColorG: 0.97,
        lightColorB: 1.0,

        /*
         * 카드 실제 두께감
         * 앞면 Plane은 그대로 유지하고,
         * 둥근 모서리를 따라 뒤쪽으로 side wall을 생성합니다.
         */
        cardThickness: 5,
        cardThicknessColorR: 0.16,
        cardThicknessColorG: 0.16,
        cardThicknessColorB: 0.17,
        cardThicknessOpacity: 1.0,

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

                id:
                    card.dataset.designerId ||
                    "",

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

        /*
         * 필터 전환 상태
         *
         * 제거되는 카드만 아래로 떨어지고,
         * 남는 카드는 그대로 유지합니다.
         * 새로 추가되는 카드는 refresh 뒤 아래에서 올라옵니다.
         */
        let filterTransitionRaf = 0;
        let filterTransitionRunning = false;
        let pendingFilterTransition = null;

        const easeInCubic = t => t * t * t;

        const easeOutCubic = t => {
            const p = 1 - t;
            return 1 - p * p * p;
        };

        function cancelFilterTransition(reset = true) {
            if (filterTransitionRaf) {
                cancelAnimationFrame(filterTransitionRaf);
                filterTransitionRaf = 0;
            }

            filterTransitionRunning = false;

            if (reset) {
                for (const slot of slots) {
                    if (!slot?.uniforms) continue;

                    slot.uniforms.uFilterOffsetY.value = 0;
                }
            }
        }

        function getSlotDesignerId(slot) {
            /*
             * 필터 전환 중 cardData가 교체되어도
             * 슬롯이 현재 들고 있는 실제 디자이너 identity는 유지됩니다.
             */
            return slot?.currentDesignerId || "";
        }

        function prepareFilterTransition(nextDesignerIds = []) {
            if (
                !isSlideView() ||
                !overlay.classList.contains("is-active") ||
                !slots.length
            ) {
                pendingFilterTransition = {
                    retainedIds: [],
                    nextIds: [...nextDesignerIds]
                };

                return Promise.resolve();
            }

            cancelFilterTransition(true);

            const nextIds =
                new Set(nextDesignerIds);

            const retainedIds =
                new Set();

            const outgoingSlots = [];

            for (const slot of slots) {
                if (!slot.active) {
                    continue;
                }

                const id =
                    getSlotDesignerId(slot);

                if (!id) continue;

                if (nextIds.has(id)) {
                    retainedIds.add(id);

                    /*
                     * 남는 카드는 제자리 유지.
                     */
                    slot.uniforms.uFilterOffsetY.value = 0;
                } else {
                    /*
                     * 현재 카드가 원래 가지고 있던 밝기/거리 opacity를 보존.
                     * exit 시작 순간 opacity가 1로 튀는 현상을 막습니다.
                     */
                    slot.filterBaseOpacity =
                        slot.uniforms
                            .uOpacity
                            .value;

                    outgoingSlots.push(slot);
                }
            }

            pendingFilterTransition = {
                retainedIds: [...retainedIds],
                nextIds: [...nextIds]
            };

            if (!outgoingSlots.length) {
                return Promise.resolve();
            }

            filterTransitionRunning = true;

            const duration =
                Math.max(
                    120,
                    OPTIONS.filterExitDuration
                );

            const dropDistance =
                Math.max(
                    overlayHeight * OPTIONS.filterExitDrop,
                    cardHeight * 0.9
                );

            const startLift =
                OPTIONS.filterExitStartLift;

            const start =
                performance.now();

            filterFxPreviousTime =
                start;

            return new Promise(resolve => {
                function tick(now) {
                    if (
                    !filterTransitionRunning &&
                    !pendingFilterTransition
                ) {
                        resolve();
                        return;
                    }

                    const t =
                        clamp(
                            (now - start) / duration,
                            0,
                            1
                        );

                    const liftPhase =
                        Math.min(t / 0.2, 1);

                    const lift =
                        Math.sin(liftPhase * Math.PI) *
                        startLift *
                        (1 - liftPhase);

                    const fall =
                        dropDistance *
                        easeInCubic(t);

                    for (const slot of outgoingSlots) {
                        slot.uniforms
                            .uFilterOffsetY
                            .value =
                                lift - fall;

                        /*
                         * 화면 아래쪽에 거의 다 도착할 때까지
                         * 불투명도를 유지합니다.
                         * 마지막 10% 구간에서만 아주 부드럽게 사라집니다.
                         */
                        const fadeT =
                            clamp(
                                (t - 0.90) / 0.10,
                                0,
                                1
                            );

                        slot.uniforms
                            .uOpacity
                            .value =
                                (
                                    slot.filterBaseOpacity ??
                                    1
                                ) *
                                (1 - fadeT);
                    }

                    renderFilterFxFrame(
                        now
                    );

                    if (t < 1) {
                        filterTransitionRaf =
                            requestAnimationFrame(tick);
                        return;
                    }

                    filterTransitionRaf = 0;

                    /*
                     * outgoing 카드의 마지막 opacity/offset 상태를 그대로 유지한 채
                     * 다음 데이터 reconcile로 넘깁니다.
                     */
                    filterTransitionRunning = false;

                    renderer.render(
                        scene,
                        camera
                    );

                    resolve();
                }

                filterTransitionRaf =
                    requestAnimationFrame(tick);
            });
        }

        function prepareIncomingSlotsBeforeRender() {
            if (!slots.length) {
                return;
            }

            const retainedIds =
                new Set(
                    pendingFilterTransition
                        ?.retainedIds ||
                    []
                );

            const startDrop =
                Math.max(
                    overlayHeight *
                        OPTIONS.filterEnterDrop,
                    cardHeight * 0.8
                );

            /*
             * 새 카드가 첫 WebGL 렌더에서 잠깐 보였다가
             * 다시 사라지는 현상을 막기 위해
             * activate()/render()보다 먼저 아래쪽 + 투명 상태를 줍니다.
             */
            for (const slot of slots) {
                if (!slot.active) {
                    continue;
                }

                const id =
                    getSlotDesignerId(slot);

                if (
                    id &&
                    retainedIds.has(id)
                ) {
                    /*
                     * 남는 카드는 위치만 유지하고
                     * 현재 조명/거리 opacity는 절대 덮어쓰지 않습니다.
                     */
                    slot.uniforms
                        .uFilterOffsetY
                        .value = 0;
                } else {
                    slot.uniforms
                        .uFilterOffsetY
                        .value =
                            -startDrop;

                    slot.uniforms
                        .uOpacity
                        .value = 0;
                }
            }
        }

        /*
         * 필터 전환 중에도 평상시 WebGL 업데이트를 같이 돌립니다.
         * 조명 / 리본 왜곡 / wobble / rgb split / depth 효과가
         * 떨어짐·등장 순간에 멈췄다가 다시 켜지는 느낌을 방지합니다.
         */
        let filterFxPreviousTime =
            performance.now();

        function renderFilterFxFrame(now) {
            const dt =
                clamp(
                    (
                        now -
                        filterFxPreviousTime
                    ) / 1000,
                    1 / 240,
                    1 / 30
                );

            filterFxPreviousTime =
                now;

            updateOverlayRect();

            updateSlots(
                now / 1000,
                dt
            );

            renderer.render(
                scene,
                camera
            );
        }

        function playFilterEnter() {
            if (
                !isSlideView() ||
                !slots.length
            ) {
                pendingFilterTransition = null;
                return;
            }

            const retainedIds =
                new Set(
                    pendingFilterTransition
                        ?.retainedIds ||
                    []
                );

            const enteringSlots = [];

            for (const slot of slots) {
                const id =
                    getSlotDesignerId(slot);

                if (
                    id &&
                    retainedIds.has(id)
                ) {
                    /*
                     * 기존에도 있던 카드는 새로 튀어나오지 않음.
                     */
                    slot.uniforms.uFilterOffsetY.value = 0;

                    /*
                     * 기존 카드의 현재 밝기/조명 상태를 그대로 유지.
                     */
                    continue;
                }

                enteringSlots.push(slot);
            }

            if (!enteringSlots.length) {
                pendingFilterTransition =
                    null;

                wake();
                return;
            }

            const duration =
                Math.max(
                    160,
                    OPTIONS.filterEnterDuration
                );

            const startDrop =
                Math.max(
                    overlayHeight * OPTIONS.filterEnterDrop,
                    cardHeight * 0.8
                );

            /*
             * refresh 직후 첫 렌더부터 화면 아래에 위치시켜
             * 카드가 갑자기 확 생기는 현상을 방지.
             */
            for (const slot of enteringSlots) {
                slot.uniforms.uFilterOffsetY.value =
                    -startDrop;

                slot.uniforms.uOpacity.value = 0;
            }

            renderFilterFxFrame(
                performance.now()
            );

            filterTransitionRunning = true;

            const start =
                performance.now();

            filterFxPreviousTime =
                start;

            function tick(now) {
                if (!filterTransitionRunning) return;

                const t =
                    clamp(
                        (now - start) / duration,
                        0,
                        1
                    );

                const eased =
                    easeOutCubic(t);

                const overshoot =
                    Math.sin(t * Math.PI) *
                    OPTIONS.filterEnterOvershoot *
                    Math.pow(1 - t, 1.35);

                for (const slot of enteringSlots) {
                    slot.uniforms
                        .uFilterOffsetY
                        .value =
                            -startDrop *
                                (1 - eased) +
                            overshoot;

                    /*
                     * 아래쪽에서 충분히 올라오기 시작한 뒤
                     * 서서히 보이게 해서 갑자기 생성되는 느낌을 줄입니다.
                     */
                    const fadeIn =
                        clamp(
                            (t - 0.10) / 0.34,
                            0,
                            1
                        );

                    /*
                     * 평상시 updateSlots가 사용하는 거리 기반 opacity와
                     * 동일한 목표값으로 올라오게 해서,
                     * enter 종료 순간 밝기가 툭 바뀌지 않게 합니다.
                     */
                    const relative =
                        slot.virtualIndex -
                        ribbonState.position;

                    const baseOpacity =
                        clamp(
                            1 -
                                Math.abs(relative) *
                                0.055,
                            0.42,
                            1
                        );

                    slot.uniforms
                        .uOpacity
                        .value =
                            baseOpacity *
                            fadeIn;
                }

                renderFilterFxFrame(
                    now
                );

                if (t < 1) {
                    filterTransitionRaf =
                        requestAnimationFrame(tick);
                    return;
                }

                filterTransitionRaf = 0;
                filterTransitionRunning = false;

                pendingFilterTransition =
                    null;

                for (const slot of enteringSlots) {
                    slot.uniforms.uFilterOffsetY.value = 0;
                }

                updateSlots(
                    now / 1000,
                    1 / 60
                );

                renderer.render(
                    scene,
                    camera
                );

                wake();
            }

            filterTransitionRaf =
                requestAnimationFrame(tick);
        }

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

        /*
         * WebGL 카드 border는 CSS 변수에서 읽습니다.
         */
        let cardBorderWidth = 0;

        const cardBorderColor =
            new THREE.Vector4(
                0,
                0,
                0,
                0.18
            );

        /*
         * WebGL 카드의 세로 위치를 CSS 변수로 제어합니다.
         *
         * CSS 예:
         * .slide-view .designer-card {
         *     --designer-slide-card-offset-y: 40px;
         * }
         *
         * 양수 = 아래로
         * 음수 = 위로
         */
        let cardOffsetY = 0;

        /*
         * WebGL 카드 안 텍스트 위치도 CSS에서 읽습니다.
         */
        let cardTextLeft = 35;
        let cardTextBottom = 35;
        let cardTextGap = 3;

        let focusX = 0;
        let overlayWidth = 1;
        let overlayHeight = 1;

        const borderColorCanvas =
            document.createElement("canvas");

        const borderColorContext =
            borderColorCanvas.getContext("2d");

        function readCssColor(
            value,
            target
        ) {
            if (
                !borderColorContext ||
                !value
            ) {
                return;
            }

            try {
                borderColorContext.fillStyle =
                    "#000000";

                borderColorContext.fillStyle =
                    value.trim();

                const normalized =
                    borderColorContext.fillStyle;

                if (
                    normalized.startsWith("#")
                ) {
                    let hex =
                        normalized.slice(1);

                    if (hex.length === 3) {
                        hex =
                            hex
                                .split("")
                                .map(
                                    char =>
                                        char + char
                                )
                                .join("");
                    }

                    if (
                        hex.length === 6 ||
                        hex.length === 8
                    ) {
                        const r =
                            parseInt(
                                hex.slice(0, 2),
                                16
                            ) / 255;

                        const g =
                            parseInt(
                                hex.slice(2, 4),
                                16
                            ) / 255;

                        const b =
                            parseInt(
                                hex.slice(4, 6),
                                16
                            ) / 255;

                        const a =
                            hex.length === 8
                                ? parseInt(
                                    hex.slice(6, 8),
                                    16
                                ) / 255
                                : 1;

                        target.set(
                            r,
                            g,
                            b,
                            a
                        );

                        return;
                    }
                }

                const match =
                    normalized.match(
                        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i
                    );

                if (match) {
                    target.set(
                        Number(match[1]) / 255,
                        Number(match[2]) / 255,
                        Number(match[3]) / 255,
                        match[4] !== undefined
                            ? Number(match[4])
                            : 1
                    );
                }
            } catch (_) {
                // invalid CSS color -> keep previous value
            }
        }

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

                /*
                 * CSS --designer-slide-card-offset-y 값을 읽습니다.
                 */
                const cardStyle =
                    getComputedStyle(
                        sourceCards[0]
                    );

                const offsetY =
                    parseFloat(
                        cardStyle.getPropertyValue(
                            "--designer-slide-card-offset-y"
                        )
                    );

                cardOffsetY =
                    Number.isFinite(offsetY)
                        ? offsetY
                        : 0;

                const borderWidth =
                    parseFloat(
                        cardStyle.getPropertyValue(
                            "--designer-card-border-width"
                        )
                    );

                cardBorderWidth =
                    Number.isFinite(borderWidth)
                        ? Math.max(
                            0,
                            borderWidth
                        )
                        : 0;

                const borderColor =
                    cardStyle.getPropertyValue(
                        "--designer-card-border-color"
                    );

                if (borderColor.trim()) {
                    readCssColor(
                        borderColor,
                        cardBorderColor
                    );
                }

                const textLeft =
                    parseFloat(
                        cardStyle.getPropertyValue(
                            "--designer-card-text-left"
                        )
                    );

                const textBottom =
                    parseFloat(
                        cardStyle.getPropertyValue(
                            "--designer-card-text-bottom"
                        )
                    );

                const textGap =
                    parseFloat(
                        cardStyle.getPropertyValue(
                            "--designer-card-text-gap"
                        )
                    );

                cardTextLeft =
                    Number.isFinite(textLeft)
                        ? textLeft
                        : 35;

                cardTextBottom =
                    Number.isFinite(textBottom)
                        ? textBottom
                        : 35;

                cardTextGap =
                    Number.isFinite(textGap)
                        ? textGap
                        : 3;
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

                slot.uniforms.uCardOffsetY.value =
                    cardOffsetY;

                slot.uniforms.uBorderWidth.value =
                    cardBorderWidth;

                slot.uniforms.uBorderColor.value.copy(
                    cardBorderColor
                );
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
                    .filter(
                        slot =>
                            slot.active
                    )
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

            /*
             * 필터 전환으로 배열 index가 바뀌어도
             * 동일 디자이너 텍스처를 재사용합니다.
             */
            const cacheKey =
                [
                    item.id || item.url,
                    item.url,
                    item.nameKo,
                    item.nameEn,
                    cardTextLeft,
                    cardTextBottom,
                    cardTextGap
                ].join("|");

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

            /*
             * CSS px 값을 texture canvas 크기에 맞게 스케일링합니다.
             * WebGL 카드의 실제 cardWidth/cardHeight와 canvas W/H가 다르기 때문입니다.
             */
            const scaleX =
                W /
                Math.max(
                    1,
                    cardWidth
                );

            const scaleY =
                H /
                Math.max(
                    1,
                    cardHeight
                );

            const left =
                cardTextLeft *
                scaleX;

            const bottom =
                cardTextBottom *
                scaleY;

            const gap =
                cardTextGap *
                scaleY;

            const nameKoFontSize =
                Math.round(
                    W * 0.050
                );

            const nameEnFontSize =
                Math.round(
                    W * 0.034
                );

            ctx.textBaseline =
                "bottom";

            ctx.fillStyle =
                "#fff";

            ctx.font =
                `600 ${nameKoFontSize}px Pretendard, Arial, sans-serif`;

            /*
             * 영어 이름을 먼저 아래에 두고,
             * 한글 이름을 그 위에 gap만큼 띄워 배치합니다.
             */
            const nameEnY =
                H -
                bottom;

            const nameKoY =
                nameEnY -
                nameEnFontSize -
                gap;

            ctx.fillText(
                item.nameKo,
                left,
                nameKoY
            );

            ctx.fillStyle =
                "rgba(255,255,255,.72)";

            ctx.font =
                `300 ${nameEnFontSize}px Pretendard, Arial, sans-serif`;

            ctx.fillText(
                item.nameEn,
                left,
                nameEnY
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

            /*
             * CSS --designer-slide-card-offset-y 연동값
             */
            uniform float uCardOffsetY;
            uniform float uFilterOffsetY;

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

                /*
                 * front Plane은 position.z = 0,
                 * side wall은 0 ~ -cardThickness 범위의 local Z를 가집니다.
                 * 같은 리본 회전에 포함시켜 실제 입체 카드처럼 움직입니다.
                 */
                float localZ =
                    position.z;

                float y =
                    localY * c -
                    localZ * s;

                /*
                 * CSS의 양수 Y는 화면 아래 방향.
                 * WebGL 좌표계는 위가 +Y이므로 부호를 반대로 적용합니다.
                 */
                y -=
                    uCardOffsetY;

                /*
                 * 필터 전환용 개별 카드 offset.
                 * 음수면 화면 아래쪽.
                 */
                y +=
                    uFilterOffsetY;

                float z =
                    localY * s +
                    localZ * c;

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

            uniform float uBorderWidth;
            uniform vec4 uBorderColor;

            /*
             * 흰 배경용 가상 조명
             */
            uniform float uLightAmbient;
            uniform float uLightDiffuse;
            uniform float uLightRim;
            uniform float uLightRimPower;
            uniform float uLightReflection;
            uniform float uLightReflectionCenter;
            uniform float uLightReflectionWidth;
            uniform vec3 uLightColor;

            varying vec2 vUv;
            varying float vFacing;

            float roundedRectDistance(
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

                return
                    length(max(q, 0.0)) +
                    min(max(q.x, q.y), 0.0) -
                    r;
            }

            float roundedRectMask(
                vec2 uv,
                vec2 sizePx,
                float radiusPx
            ) {
                float d =
                    roundedRectDistance(
                        uv,
                        sizePx,
                        radiusPx
                    );

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

                /*
                 * =================================================
                 * White-background lighting
                 * =================================================
                 *
                 * vFacing:
                 * 1.0 = 정면
                 * 0.0 = 거의 옆면
                 */

                float face =
                    clamp(
                        vFacing,
                        0.0,
                        1.0
                    );

                /*
                 * Ambient + diffuse
                 * 흰 배경에서 카드가 너무 어두워지지 않게
                 * 기본 밝기를 충분히 남깁니다.
                 */
                float ambient =
                    uLightAmbient;

                float diffuse =
                    uLightDiffuse *
                    pow(
                        face,
                        1.2
                    );

                rgb *=
                    ambient +
                    diffuse;

                /*
                 * Rim reflection
                 * 카드가 옆으로 꺾일수록 가장자리에
                 * 흰 배경광이 반사되는 느낌.
                 */
                float rim =
                    pow(
                        1.0 - face,
                        uLightRimPower
                    ) *
                    uLightRim;

                rgb +=
                    uLightColor *
                    rim;

                /*
                 * Soft surface reflection
                 * 카드 표면에 고정된 얇은 반사띠.
                 * 너무 유리처럼 보이지 않도록 매우 약하게 적용.
                 */
                float reflectionDistance =
                    abs(
                        vUv.x -
                        uLightReflectionCenter
                    );

                float reflection =
                    1.0 -
                    smoothstep(
                        0.0,
                        max(
                            0.001,
                            uLightReflectionWidth
                        ),
                        reflectionDistance
                    );

                /*
                 * 옆면에서는 반사띠가 과하게 튀지 않도록
                 * 정면도에 따라 약하게 감쇠.
                 */
                reflection *=
                    mix(
                        0.35,
                        1.0,
                        face
                    );

                rgb +=
                    uLightColor *
                    reflection *
                    uLightReflection;

                /*
                 * HDR처럼 과포화되지 않게 제한.
                 */
                rgb =
                    min(
                        rgb,
                        vec3(1.0)
                    );

                float rounded =
                    roundedRectMask(
                        vUv,
                        uCardSize,
                        uRadius
                    );

                /*
                 * 투명한 둥근 모서리 바깥 영역이
                 * 뒤쪽 side wall의 depth를 가리지 않도록 제거합니다.
                 */
                if (rounded <= 0.001) {
                    discard;
                }

                float borderDistance =
                    roundedRectDistance(
                        vUv,
                        uCardSize,
                        uRadius
                    );

                float innerMask =
                    1.0 -
                    smoothstep(
                        -1.0,
                        1.0,
                        borderDistance +
                            max(
                                0.0,
                                uBorderWidth
                            )
                    );

                float borderMask =
                    clamp(
                        rounded -
                            innerMask,
                        0.0,
                        1.0
                    );

                rgb =
                    mix(
                        rgb,
                        uBorderColor.rgb,
                        borderMask *
                            uBorderColor.a
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

        /*
         * 카드 옆면 전용 Shader.
         * front와 같은 vertexShader / ribbon deformation을 공유하기 때문에
         * 스크롤·왜곡·wobble·필터 애니메이션을 전부 함께 따라갑니다.
         */
        const thicknessFragmentShader = `
            uniform float uOpacity;

            uniform vec3 uThicknessColor;
            uniform float uThicknessOpacity;

            uniform vec3 uLightColor;
            uniform float uLightRim;
            uniform float uLightRimPower;

            varying float vFacing;

            void main() {
                float face =
                    clamp(
                        abs(vFacing),
                        0.0,
                        1.0
                    );

                /*
                 * 옆으로 많이 돌아갈수록 옆면이 살짝 밝아져
                 * 흰 배경의 반사광을 받는 느낌을 줍니다.
                 */
                float edgeLight =
                    pow(
                        1.0 - face,
                        max(
                            0.1,
                            uLightRimPower
                        )
                    );

                vec3 rgb =
                    uThicknessColor;

                rgb *=
                    mix(
                        0.72,
                        1.0,
                        face
                    );

                rgb +=
                    uLightColor *
                    edgeLight *
                    uLightRim *
                    0.55;

                gl_FragColor =
                    vec4(
                        min(
                            rgb,
                            vec3(1.0)
                        ),
                        uOpacity *
                        uThicknessOpacity
                    );
            }
        `;

        /*
         * border-radius를 따라가는 3D side wall geometry.
         * 앞면 z=0에서 뒤쪽 z=-thickness까지 연결합니다.
         */
        function createRoundedSideGeometry(
            width,
            height,
            radius,
            thickness
        ) {
            const geometry =
                new THREE.BufferGeometry();

            const halfW =
                width * 0.5;

            const halfH =
                height * 0.5;

            const r =
                clamp(
                    radius,
                    0,
                    Math.min(
                        halfW,
                        halfH
                    )
                );

            const points = [];

            const addLine = (
                x0,
                y0,
                x1,
                y1,
                segments
            ) => {
                for (
                    let i = 0;
                    i < segments;
                    i++
                ) {
                    const t =
                        i / segments;

                    points.push([
                        x0 +
                            (x1 - x0) *
                            t,
                        y0 +
                            (y1 - y0) *
                            t
                    ]);
                }
            };

            const addArc = (
                cx,
                cy,
                startAngle,
                endAngle,
                segments
            ) => {
                for (
                    let i = 0;
                    i < segments;
                    i++
                ) {
                    const t =
                        i / segments;

                    const angle =
                        startAngle +
                        (
                            endAngle -
                            startAngle
                        ) *
                        t;

                    points.push([
                        cx +
                            Math.cos(angle) *
                            r,
                        cy +
                            Math.sin(angle) *
                            r
                    ]);
                }
            };

            /*
             * 화면 기준 시계 방향 perimeter.
             * 직선도 충분히 분할해 front와 비슷하게 ribbon bend를 샘플링합니다.
             */
            const straightSegments = 10;
            const arcSegments = 8;

            if (r <= 0.001) {
                addLine(
                    -halfW,
                    halfH,
                    halfW,
                    halfH,
                    straightSegments
                );
                addLine(
                    halfW,
                    halfH,
                    halfW,
                    -halfH,
                    straightSegments
                );
                addLine(
                    halfW,
                    -halfH,
                    -halfW,
                    -halfH,
                    straightSegments
                );
                addLine(
                    -halfW,
                    -halfH,
                    -halfW,
                    halfH,
                    straightSegments
                );
            } else {
                addLine(
                    -halfW + r,
                    halfH,
                    halfW - r,
                    halfH,
                    straightSegments
                );

                addArc(
                    halfW - r,
                    halfH - r,
                    Math.PI * 0.5,
                    0,
                    arcSegments
                );

                addLine(
                    halfW,
                    halfH - r,
                    halfW,
                    -halfH + r,
                    straightSegments
                );

                addArc(
                    halfW - r,
                    -halfH + r,
                    0,
                    -Math.PI * 0.5,
                    arcSegments
                );

                addLine(
                    halfW - r,
                    -halfH,
                    -halfW + r,
                    -halfH,
                    straightSegments
                );

                addArc(
                    -halfW + r,
                    -halfH + r,
                    -Math.PI * 0.5,
                    -Math.PI,
                    arcSegments
                );

                addLine(
                    -halfW,
                    -halfH + r,
                    -halfW,
                    halfH - r,
                    straightSegments
                );

                addArc(
                    -halfW + r,
                    halfH - r,
                    Math.PI,
                    Math.PI * 0.5,
                    arcSegments
                );
            }

            const positions = [];
            const uvs = [];
            const indices = [];

            const backZ =
                -Math.max(
                    0,
                    thickness
                );

            for (
                let i = 0;
                i < points.length;
                i++
            ) {
                const [x, y] =
                    points[i];

                /*
                 * 같은 perimeter point의 앞/뒤 vertex.
                 */
                positions.push(
                    x,
                    y,
                    0
                );

                positions.push(
                    x,
                    y,
                    backZ
                );

                const u =
                    i /
                    Math.max(
                        1,
                        points.length - 1
                    );

                uvs.push(
                    u,
                    1,
                    u,
                    0
                );
            }

            for (
                let i = 0;
                i < points.length;
                i++
            ) {
                const next =
                    (i + 1) %
                    points.length;

                const a =
                    i * 2;

                const b =
                    next * 2;

                const c =
                    next * 2 + 1;

                const d =
                    i * 2 + 1;

                indices.push(
                    a,
                    b,
                    d,

                    b,
                    c,
                    d
                );
            }

            geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(
                    positions,
                    3
                )
            );

            geometry.setAttribute(
                "uv",
                new THREE.Float32BufferAttribute(
                    uvs,
                    2
                )
            );

            geometry.setIndex(
                indices
            );

            geometry.computeBoundingSphere();

            return geometry;
        }

        /* =====================================================
           Geometry Pool
        ===================================================== */

        let slots = [];

        let poolSize = 0;
        let halfPool = 0;

        function isFiniteCardList() {
            /*
             * 카드 개수가 아니라 현재 초성 필터 상태를 기준으로 판단합니다.
             *
             * All       → 기존 무한 루프
             * ㄱ~ㅎ 선택 → 끝이 있는 slider + 전체 카드 bounce
             */
            const activeFilter =
                document.querySelector(
                    ".designer-filter__button[aria-pressed='true']"
                );

            const initial =
                activeFilter?.dataset.initial ||
                "all";

            return (
                cardData.length > 0 &&
                initial !== "all"
            );
        }

        function getFiniteScrollBounds() {
            return {
                min: 0,
                max: Math.max(
                    0,
                    cardData.length - 1
                )
            };
        }

        function getDesiredPoolSize() {
            /*
             * 필터 결과보다 WebGL 슬롯을 더 만들지 않습니다.
             * 예:
             * ㄴ = 2명 → Mesh도 2개
             * ㅎ = 1명 → Mesh도 1개
             *
             * 전체 34명일 때는 OPTIONS.poolSize까지만 유지해
             * 기존 성능 특성을 보존합니다.
             */
            return Math.min(
                OPTIONS.poolSize,
                cardData.length
            );
        }

        function createSlots() {
            /*
             * 이 함수는 최초 생성 / 실제 resize 때만 사용합니다.
             * 필터 전환에서는 절대 호출하지 않습니다.
             *
             * 물리 Mesh pool은 항상 OPTIONS.poolSize개 유지하고,
             * 실제 사용하는 카드 수만 poolSize로 별도 관리합니다.
             */
            for (const slot of slots) {
                group.remove(slot.mesh);

                if (slot.sideMesh) {
                    group.remove(
                        slot.sideMesh
                    );

                    slot.sideMesh
                        .geometry
                        .dispose();
                }

                slot.mesh.geometry.dispose();
                slot.material.dispose();

                slot.sideMaterial?.dispose();
            }

            slots = [];

            poolSize =
                getDesiredPoolSize();

            halfPool =
                Math.floor(
                    poolSize / 2
                );

            const physicalPoolSize =
                Math.max(
                    1,
                    OPTIONS.poolSize
                );

            for (
                let i = 0;
                i < physicalPoolSize;
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

                    uCardOffsetY: {
                        value:
                            cardOffsetY
                    },

                    uFilterOffsetY: {
                        value: 0
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
                    },

                    uBorderWidth: {
                        value:
                            cardBorderWidth
                    },

                    uBorderColor: {
                        value:
                            cardBorderColor.clone()
                    },

                    uLightAmbient: {
                        value:
                            OPTIONS.lightAmbient
                    },

                    uLightDiffuse: {
                        value:
                            OPTIONS.lightDiffuse
                    },

                    uLightRim: {
                        value:
                            OPTIONS.lightRim
                    },

                    uLightRimPower: {
                        value:
                            OPTIONS.lightRimPower
                    },

                    uLightReflection: {
                        value:
                            OPTIONS.lightReflection
                    },

                    uLightReflectionCenter: {
                        value:
                            OPTIONS.lightReflectionCenter
                    },

                    uLightReflectionWidth: {
                        value:
                            OPTIONS.lightReflectionWidth
                    },

                    uLightColor: {
                        value:
                            new THREE.Vector3(
                                OPTIONS.lightColorR,
                                OPTIONS.lightColorG,
                                OPTIONS.lightColorB
                            )
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

                /*
                 * 같은 uniforms object를 공유하므로
                 * front와 side가 완전히 같은 ribbon state를 사용합니다.
                 */
                uniforms.uThicknessColor = {
                    value:
                        new THREE.Vector3(
                            OPTIONS.cardThicknessColorR,
                            OPTIONS.cardThicknessColorG,
                            OPTIONS.cardThicknessColorB
                        )
                };

                uniforms.uThicknessOpacity = {
                    value:
                        OPTIONS.cardThicknessOpacity
                };

                const sideGeometry =
                    createRoundedSideGeometry(
                        cardWidth,
                        cardHeight,
                        cardRadius,
                        OPTIONS.cardThickness
                    );

                const sideMaterial =
                    new THREE.ShaderMaterial({
                        uniforms,
                        vertexShader,
                        fragmentShader:
                            thicknessFragmentShader,
                        transparent: true,
                        depthTest: true,
                        depthWrite: true,
                        side:
                            THREE.DoubleSide
                    });

                const sideMesh =
                    new THREE.Mesh(
                        sideGeometry,
                        sideMaterial
                    );

                sideMesh.frustumCulled =
                    false;

                /*
                 * side를 먼저 넣고 front를 나중에 넣어
                 * 동일 depth 경계에서도 앞면이 시각적으로 우선되게 합니다.
                 */
                group.add(sideMesh);
                group.add(mesh);

                slots.push({
                    mesh,
                    sideMesh,
                    material,
                    sideMaterial,
                    uniforms,

                    /*
                     * 물리 슬롯은 계속 살아있고,
                     * 필터 때는 virtualIndex / 데이터만 교체합니다.
                     */
                    virtualIndex:
                        i - Math.floor(
                            physicalPoolSize / 2
                        ),

                    dataIndex: -1,
                    currentDesignerId: "",
                    active: false,

                    texture:
                        placeholderTexture,

                    loadToken: 0,

                    position: 0,
                    velocity: 0
                });

                mesh.visible = false;
                sideMesh.visible = false;
            }

            /*
             * 최초 생성 직후 현재 데이터에 맞춰 활성 슬롯만 배치.
             */
            reconcileSlotsForCurrentData();
        }

        /*
         * =====================================================
         * Persistent Slot Reconciliation
         * =====================================================
         *
         * 필터 전환 때 Mesh / Material을 새로 만들지 않습니다.
         *
         * - 남는 디자이너: 기존 slot / texture / material 그대로 유지
         * - 사라지는 디자이너: exit 애니메이션 후 해당 slot 재사용
         * - 새 디자이너: 빈 slot에 데이터만 연결하고 아래에서 등장
         */
        function reconcileSlotsForCurrentData() {
            poolSize =
                getDesiredPoolSize();

            halfPool =
                Math.floor(
                    poolSize / 2
                );

            if (!cardData.length) {
                for (const slot of slots) {
                    slot.active = false;
                    slot.mesh.visible = false;

                if (slot.sideMesh) {
                    slot.sideMesh.visible = false;
                }

                    if (slot.sideMesh) {
                        slot.sideMesh.visible = false;
                    }
                }

                return;
            }

            const finite =
                isFiniteCardList();

            const targetVirtualIndexes = [];

            for (
                let i = 0;
                i < poolSize;
                i++
            ) {
                targetVirtualIndexes.push(
                    finite
                        ? i
                        : i - halfPool
                );
            }

            const targetEntries =
                targetVirtualIndexes.map(
                    virtualIndex => {
                        const dataIndex =
                            mod(
                                virtualIndex,
                                cardData.length
                            );

                        return {
                            virtualIndex,
                            dataIndex,
                            designer:
                                cardData[dataIndex]
                        };
                    }
                );

            const retainedIds =
                new Set(
                    pendingFilterTransition
                        ?.retainedIds ||
                    []
                );

            const unusedSlots =
                new Set(slots);

            const assignments = [];

            /*
             * 1차: 같은 디자이너를 이미 들고 있는 slot 우선 재사용.
             * 이 경우 ShaderMaterial / texture / 조명 uniform이 그대로 유지됩니다.
             */
            for (const entry of targetEntries) {
                const matchingSlot =
                    [...unusedSlots].find(
                        slot =>
                            slot.currentDesignerId &&
                            slot.currentDesignerId ===
                                entry.designer?.id
                    );

                if (!matchingSlot) {
                    continue;
                }

                assignments.push({
                    slot: matchingSlot,
                    entry,
                    retained:
                        retainedIds.has(
                            entry.designer.id
                        )
                });

                unusedSlots.delete(
                    matchingSlot
                );
            }

            /*
             * 2차: 아직 배정되지 않은 target은 남는 빈 slot에 연결.
             */
            const assignedVirtualIndexes =
                new Set(
                    assignments.map(
                        item =>
                            item.entry.virtualIndex
                    )
                );

            for (const entry of targetEntries) {
                if (
                    assignedVirtualIndexes.has(
                        entry.virtualIndex
                    )
                ) {
                    continue;
                }

                const slot =
                    unusedSlots.values()
                        .next().value;

                if (!slot) {
                    break;
                }

                assignments.push({
                    slot,
                    entry,
                    retained: false
                });

                unusedSlots.delete(slot);
            }

            /*
             * 사용하지 않는 물리 slot은 숨기되 dispose하지 않습니다.
             */
            for (const slot of unusedSlots) {
                slot.active = false;
                slot.mesh.visible = false;

                if (slot.sideMesh) {
                    slot.sideMesh.visible = false;
                }
            }

            const startDrop =
                Math.max(
                    overlayHeight *
                        OPTIONS.filterEnterDrop,
                    cardHeight * 0.8
                );

            for (
                const {
                    slot,
                    entry,
                    retained
                } of assignments
            ) {
                slot.active = true;
                slot.mesh.visible = true;

                if (slot.sideMesh) {
                    slot.sideMesh.visible = true;
                }

                slot.virtualIndex =
                    entry.virtualIndex;

                /*
                 * 남는 카드는 현재 위치/텍스처/조명을 그대로 유지.
                 */
                if (
                    retained &&
                    slot.currentDesignerId ===
                        entry.designer.id
                ) {
                    slot.dataIndex =
                        entry.dataIndex;

                    slot.uniforms
                        .uFilterOffsetY
                        .value = 0;

                    /*
                     * retained slot의 현재 opacity/light state 유지.
                     */
                    continue;
                }

                /*
                 * 새 카드:
                 * 첫 렌더 전부터 화면 아래 + 투명 상태.
                 * 기존 material은 그대로 재사용하고 texture만 교체합니다.
                 */
                slot.dataIndex = -1;

                /*
                 * currentDesignerId는 실제 texture가 연결될 때 assignTexture에서 갱신.
                 * 여기서 미리 바꾸면 이전 texture를 새 카드로 착각할 수 있습니다.
                 */
                slot.uniforms
                    .uFilterOffsetY
                    .value =
                        -startDrop;

                slot.uniforms
                    .uOpacity
                    .value = 0;

                assignTexture(
                    slot,
                    entry.virtualIndex
                );
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

        /*
         * 초성 필터 상태의 slider 끝에서 모든 카드에 동일하게 적용되는
         * 공통 X bounce offset (카드 간 상대 간격은 유지).
         */
        const edgeGroupBounceState = {
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

            /*
             * All이 아닌 초성 필터 상태:
             * 무한으로 넘어가지 않고 끝에서 약간만 overscroll 허용.
             */
            if (isFiniteCardList()) {
                const bounds =
                    getFiniteScrollBounds();

                targetScroll =
                    clamp(
                        targetScroll,
                        bounds.min -
                            OPTIONS.edgeBounceDistance,
                        bounds.max +
                            OPTIONS.edgeBounceDistance
                    );
            }
        }

        let edgeReturnTimer = 0;

        function returnFromFiniteEdge() {
            if (!isFiniteCardList()) {
                return;
            }

            const bounds =
                getFiniteScrollBounds();

            const clamped =
                clamp(
                    targetScroll,
                    bounds.min,
                    bounds.max
                );

            const overshoot =
                targetScroll -
                clamped;

            if (
                Math.abs(overshoot) <
                0.0001
            ) {
                return;
            }

            /*
             * scroll 자체는 즉시 실제 경계로 복귀시키고,
             * bounce는 별도의 공통 상태로 분리합니다.
             *
             * 이 값을 모든 카드 targetCenter에 동일하게 더하므로
             * 끝쪽 카드만이 아니라 현재 보이는 카드 전체가
             * 하나의 묶음처럼 같이 통통 튑니다.
             */
            targetScroll =
                clamped;

            scrollState.velocity *=
                0.35;

            ribbonState.velocity *=
                0.35;

            edgeGroupBounceState.position +=
                overshoot *
                step *
                OPTIONS.edgeGroupBounceStrength;

            edgeGroupBounceState.velocity +=
                overshoot *
                step *
                OPTIONS.edgeBounceKick;

            wake();
        }

        function scheduleFiniteEdgeReturn() {
            if (!isFiniteCardList()) {
                return;
            }

            clearTimeout(
                edgeReturnTimer
            );

            edgeReturnTimer =
                setTimeout(
                    returnFromFiniteEdge,
                    OPTIONS.edgeReturnDelay
                );
        }

        /* =====================================================
           Texture Assignment
        ===================================================== */

        async function assignTexture(
            slot,
            virtualIndex
        ) {
            if (!cardData.length) {
                slot.mesh.visible = false;

                if (slot.sideMesh) {
                    slot.sideMesh.visible = false;
                }
                return;
            }

            slot.mesh.visible = true;

            if (slot.sideMesh) {
                slot.sideMesh.visible = true;
            }

            const index =
                mod(
                    virtualIndex,
                    cardData.length
                );

            const item =
                cardData[index];

            if (!item) {
                return;
            }

            /*
             * 배열 index가 아니라 designer id 기준으로 동일성 판단.
             * 필터로 배열 순서가 달라져도 남는 카드는 texture를 다시 연결하지 않습니다.
             */
            if (
                slot.currentDesignerId ===
                    item.id &&
                slot.texture &&
                slot.texture !==
                    placeholderTexture
            ) {
                slot.dataIndex =
                    index;

                return;
            }

            slot.dataIndex =
                index;

            const token =
                ++slot.loadToken;

            /*
             * 이미 캐시된 카드라면 placeholder로 잠깐 되돌리지 않습니다.
             * 필터 전환 중 이미지/조명이 꺼졌다 켜지는 느낌을 줄입니다.
             */

            const cacheKey =
                item
                    ? `${item.id || item.url}|${item.url}|${item.nameKo}|${item.nameEn}`
                    : "";

            const cached =
                cacheKey
                    ? textureCache.get(
                        cacheKey
                    )
                    : null;

            if (cached?.texture) {
                cached.used =
                    ++textureUseClock;

                slot.texture =
                    cached.texture;

                slot.currentDesignerId =
                    item.id;

                slot.uniforms
                    .uTexture
                    .value =
                        cached.texture;
            } else {
                /*
                 * 새 카드가 화면 아래 + opacity 0 상태이므로
                 * 기존 texture를 유지한 채 새 texture 로드를 기다립니다.
                 * placeholder로 바꾸는 순간적인 어두운 프레임을 제거합니다.
                 */
            }

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

                slot.currentDesignerId =
                    item.id;

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
            if (
                !cardData.length ||
                !poolSize ||
                !slots.length
            ) {
                return;
            }

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

            /*
             * finite mode의 공통 bounce는 0으로 스프링 복귀.
             * 모든 카드에 같은 X offset으로 적용됩니다.
             */
            springStep(
                edgeGroupBounceState,
                0,
                OPTIONS.edgeGroupBounceSpring,
                OPTIONS.edgeGroupBounceDamping,
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
                if (!slot.active) {
                    continue;
                }

                let relative =
                    slot.virtualIndex -
                    ribbonState.position;

                let targetCenter =
                    focusX +
                    relative *
                    step +
                    (
                        isFiniteCardList()
                            ? edgeGroupBounceState.position
                            : 0
                    );

                /*
                 * All일 때만 기존 무한 루프 재사용.
                 * 초성 필터가 선택된 상태에서는 끝이 있는 slider로 동작합니다.
                 */
                if (!isFiniteCardList()) {
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

                        slot.position =
                            targetCenter;

                        slot.velocity = 0;
                        slot.dataIndex = -1;
                        slot.currentDesignerId = "";
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
                        slot.currentDesignerId = "";
                    }
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

                if (
                    !filterTransitionRunning &&
                    !pendingFilterTransition
                ) {


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

            /*
             * finite slider가 끝을 넘긴 상태라면
             * 손을 놓는 순간 벽에서 튕겨 복귀.
             */
            returnFromFiniteEdge();
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

                /*
                 * 휠 입력이 끝난 직후 overscroll을 되돌려
                 * 끝에서 통통 튀는 느낌을 만듭니다.
                 */
                scheduleFiniteEdgeReturn();

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
             * Grid 전환 시 진행 중인 필터 exit도 중지.
             */
            cancelFilterTransition(true);

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
             * 필터 결과가 0명이면 WebGL을 완전히 숨깁니다.
             */
            if (!cardData.length) {
                restoreOriginalTrack();
                hardStopWebGL();
                return;
            }

            /*
             * 필터 전환에서는 Mesh / Material을 재생성하지 않습니다.
             * 물리 pool은 그대로 유지하고 slot 데이터만 재배치합니다.
             */
            const desiredPoolSize =
                getDesiredPoolSize();

            if (
                desiredPoolSize !==
                    poolSize ||
                pendingFilterTransition
            ) {
                reconcileSlotsForCurrentData();
            }

            if (pendingFilterTransition) {
                prepareIncomingSlotsBeforeRender();
            }

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
             * 필터 전환 중에는 전환 전용 RAF가
             * updateSlots + render를 담당합니다.
             */
            if (filterTransitionRunning) {
                return;
            }

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

                Math.abs(
                    edgeGroupBounceState.position
                ) > 0.01 ||

                Math.abs(
                    edgeGroupBounceState.velocity
                ) > 0.01 ||

                dragging;

            if (moving) {
                wake();
            }
        }

        function wake() {
            if (filterTransitionRunning) {
                return;
            }

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

                    /*
                     * DOM 데이터만 바뀌어도 기존 texture/material은 유지.
                     * 실제 재배치는 refresh()에서 수행합니다.
                     */
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
            /*
             * 필터 결과를 바꾸기 전에 호출.
             * 제거되는 카드만 떨어지고 남는 카드는 유지합니다.
             */
            prepareFilterTransition,

            refresh() {
                /*
                 * designer_02.js가 WebGL idle start보다 먼저 refresh()를 호출할 수 있습니다.
                 * 그 경우에는 최초 entrance를 여기서 한 번만 시작하고 종료합니다.
                 */
                if (
                    !initialEntrancePlayed &&
                    isSlideView()
                ) {
                    sourceCards =
                        getOriginalCards();

                    cardData =
                        sourceCards.map(
                            readCard
                        );

                    measure();

                    reconcileSlotsForCurrentData();

                    startInitialEntrance();

                    return;
                }

                /*
                 * exit이 끝난 슬롯의 상태를 첫 렌더 전에 강제로 원복하지 않습니다.
                 * reconcile이 retained/new 상태를 직접 결정합니다.
                 */
                cancelFilterTransition(false);

                sourceCards =
                    getOriginalCards();

                cardData =
                    sourceCards.map(
                        readCard
                    );

                /*
                 * 필터가 바뀔 때 이전 목록의 스크롤 위치를
                 * 새 목록에 그대로 들고 오지 않습니다.
                 */
                /*
                 * 새 필터는 첫 위치를 목표로 하지만,
                 * 현재 spring / twist / depth 상태를 즉시 0으로 끊지 않습니다.
                 * 기존 왜곡과 조명이 자연스럽게 이어지도록 합니다.
                 */
                targetScroll = 0;

                edgeGroupBounceState.position = 0;
                edgeGroupBounceState.velocity = 0;

                if (!cardData.length) {
                    restoreOriginalTrack();
                    hardStopWebGL();
                    return;
                }

                measure();

                /*
                 * 핵심:
                 * 기존 Mesh / ShaderMaterial / 조명 uniform은 그대로 유지하고
                 * 필요한 slot만 재배치합니다.
                 */
                reconcileSlotsForCurrentData();

                /*
                 * 새로 들어오는 카드만 첫 렌더 전부터
                 * 화면 아래 + opacity 0 상태로 유지합니다.
                 */
                prepareIncomingSlotsBeforeRender();

                activate();

                setTimeout(
                    () => {
                        requestAnimationFrame(
                            () => {
                                playFilterEnter();
                            }
                        );
                    },
                    OPTIONS.filterTransitionPause
                );
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
                clearTimeout(edgeReturnTimer);
                cancelFilterTransition(true);

                pageObserver.disconnect();
                trackObserver.disconnect();

                for (const slot of slots) {
                    slot.mesh.geometry.dispose();
                    slot.material.dispose();

                    slot.sideMesh
                        ?.geometry
                        .dispose();

                    slot.sideMaterial
                        ?.dispose();
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
                    poolSize: poolSize,
                    physicalPoolSize: slots.length,
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
                    cardThickness:
                        OPTIONS.cardThickness,
                    cssCardOffsetY:
                        cardOffsetY,
                    finiteMode:
                        isFiniteCardList(),
                    finiteBounds:
                        isFiniteCardList()
                            ? getFiniteScrollBounds()
                            : null,
                    edgeGroupBounce: {
                        position:
                            edgeGroupBounceState.position,
                        velocity:
                            edgeGroupBounceState.velocity
                    },
                    lighting: {
                        ambient:
                            OPTIONS.lightAmbient,
                        diffuse:
                            OPTIONS.lightDiffuse,
                        rim:
                            OPTIONS.lightRim,
                        reflection:
                            OPTIONS.lightReflection
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
         * 최초 페이지 진입 / 새로고침 전용 entrance.
         *
         * persistent slot 구조에서는 createSlots() 직후 새 슬롯이
         * 이미 화면 아래 + opacity 0 상태로 준비됩니다.
         * 이전에는 최초 start()에서 activate()만 호출해서
         * 아래에 있는 카드가 playFilterEnter()를 타지 못했습니다.
         */
        let initialEntrancePlayed = false;

        function startInitialEntrance() {
            if (
                initialEntrancePlayed ||
                !isSlideView() ||
                !cardData.length
            ) {
                return;
            }

            initialEntrancePlayed = true;

            /*
             * 최초에는 유지할 카드가 없으므로
             * 모든 현재 카드를 incoming 카드로 취급합니다.
             */
            pendingFilterTransition = {
                retainedIds: [],
                nextIds:
                    cardData.map(
                        item => item.id
                    )
            };

            prepareIncomingSlotsBeforeRender();

            activate();

            setTimeout(
                () => {
                    requestAnimationFrame(
                        () => {
                            playFilterEnter();
                        }
                    );
                },
                OPTIONS.filterTransitionPause
            );
        }

        /*
         * 최초 주변 카드만 lazy-load.
         * 페이지 자체를 먼저 띄우고 WebGL은 idle에 시작.
         */
        const start = () => {
            if (isSlideView()) {
                startInitialEntrance();
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
