/**
 * designer-ribbon-slider.js — BIG ARC / SCREEN MATCH 2.1
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
 * - 오른쪽으로 갈수록 하나의 큰 깊이 곡선을 따라 후퇴 (X축 눕힘 없음)
 * - 승인한 테스트 값: 깊이 2400 / 펼침 27% / 간격 6 / 시작 1.3장
 * - 곡선 길이 4.5장: 스크린샷에 없는 항목은 테스트 기본값 유지
 * - 원근 투영을 고려한 비대칭 슬롯 재사용 + 실제 곡면 기준 클릭 판정
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
        poolSize: 13,       // 최소 슬롯 수. 깊이로 인해 더 필요한 슬롯은 자동 확보.
        maxPoolSize: 64,    // 초광폭 화면에서도 무제한으로 늘어나지 않도록 상한.
        textureWidth: 420,
        textureCacheSize: 40,

        /* ---------------------------------
           3D Ribbon Flow
           왼쪽 1/3 = 정면 카드
        --------------------------------- */
        focusRatio: 1 / 3,

        /* 승인한 큰 곡선 — 아래 5개 값으로 형태를 조절합니다. */
        arcDepth: 4400,          // 최대 후퇴 깊이: 테스트 2400 px
        arcSpreadRatio: 0.0,    // 끝점 펼침: 테스트 27%
        slideGap: 20,             // WebGL Slide만 적용. null이면 원래 CSS gap 사용.
        arcStart: 2.4,           // 정면 위치에서 1.3장 뒤부터 휘기 시작
        arcSpan: 4.0,            // 테스트 기본값. 높일수록 길고 완만하게 휨

        arcRipple: true,         // 이동할 때만 아주 작은 깊이 반응. 정지하면 큰 곡선 1개.
        arcMatchGapRadius: false, // 이전 옵션 호환용. CSS radius를 gap으로 제한하지 않습니다.

        /* 테스트 화면과 실제 페이지의 카메라/카드 크기 차이를 보정합니다.
         * 참조: 화면 폭 1600, 카드 약 240 + 간격 6, 카메라 거리 약 720.
         * arcDepth 2400은 이 참조 좌표의 깊이입니다. 실제 world 깊이는 자동 환산.
         * true일 때 start/span도 참조 화면의 카드 간격 단위입니다.
         * 카드 원래 크기/세로 위치와 Grid CSS는 바꾸지 않습니다.
         */
        arcMatchPrototype: true,
        arcReferenceStepRatio: 246 / 1600,
        arcReferenceCameraZ: 720,
        arcDepthScale: 1.0,       // 추가 강도. 1 = 참조 테스트의 원근 비율

        /* 깊이 기반 흐림: 정면은 유지하고 큰 곡선의 뒤쪽만 연해집니다.
         * start/end는 최대 후퇴 깊이 대비 0~1 비율입니다.
         * 기존 카드 크기, 곡선, CSS 테두리/모서리 설정은 변경하지 않습니다.
         */
        distanceOpacity: true,
        distanceMinOpacity: 0.35, // 가장 먼 구간의 불투명도. 작을수록 더 연해짐.
        distanceFadeStart: 0.03,  // 최대 깊이의 3%까지 원래 불투명도 유지.
        distanceFadeEnd: 0.75,    // 최대 깊이의 75%부터 최소 불투명도 유지.

        /* 이전 옵션 이름은 호환을 위해 남겨 둡니다. X축 회전 셰이더는 사용하지 않습니다. */
        rightMaxTwistDeg: 0,
        leftMaxTwistDeg: 0,

        rightTwistDistance: 1150,
        leftTwistDistance: 820,

        rightDepth: 0,
        leftDepth: 0,

        screwWaveDeg: 0,
        screwWaveLength: 1500,

        mountOffset: 0,

        /* ---------------------------------
           살아있는 듯한 리본 움직임
        --------------------------------- */
        wobbleStrengthDeg: 0,
        wobbleFrequency: 0.0055,
        wobbleSpeed: 2.0,

        velocityTwistDeg: 0,
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

        /* ---------------------------------
           오른쪽 화면 왜곡부 Soft Blur
           셰이더 텍스처를 벌려 샘플링하지 않고,
           WebGL 결과 위에 실제 backdrop blur를 그라데이션으로 겹칩니다.
        --------------------------------- */
        edgeBlurPx: 0,
        edgeBlurWidthRatio: 0.4,

        /* 방향키 1회 입력당 이동 카드 수 */
        keyboardStep: 1.0,

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
        rgbSplit: 2.0,

        /*
         * 흰 배경 기준 가상 조명
         * - ambient: 전체 배경광
         * - diffuse: 정면을 보는 면의 밝기
         * - rim: 옆으로 꺾인 가장자리 반사광
         * - reflection: 카드 표면을 스치는 은은한 반사띠
         */
        lightAmbient: 1.0,
        lightDiffuse: 0.0,
        lightRim: 0.025,
        lightRimPower: 2.2,
        lightReflection: 0.008,
        lightReflectionCenter: 0.36,
        lightReflectionWidth: 0.42,
        lightColorR: 1.0,
        lightColorG: 1.0,
        lightColorB: 1.0,

        /*
         * 카드 실제 두께감
         * 앞면 Plane은 그대로 유지하고,
         * 둥근 모서리를 따라 뒤쪽으로 side wall을 생성합니다.
         */
        cardThickness: 5,
        cardThicknessColorR: 1.0,
        cardThicknessColorG: 1.0,
        cardThicknessColorB: 1.0,
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

    // 외부 옵션의 비정상 값으로 NaN / 음수 깊이가 발생하지 않게 정규화합니다.
    const finiteNumber = (value, fallback) =>
        typeof value === "number" && Number.isFinite(value) ? value : fallback;
    OPTIONS.arcDepth = Math.max(0, finiteNumber(OPTIONS.arcDepth, 2400));
    OPTIONS.distanceMinOpacity = clamp(finiteNumber(OPTIONS.distanceMinOpacity, 0.55), 0, 1);
    OPTIONS.distanceFadeStart = clamp(finiteNumber(OPTIONS.distanceFadeStart, 0.03), 0, 0.999);
    OPTIONS.distanceFadeEnd = clamp(finiteNumber(OPTIONS.distanceFadeEnd, 0.75), OPTIONS.distanceFadeStart + 0.001, 1);
    OPTIONS.arcReferenceStepRatio = clamp(finiteNumber(OPTIONS.arcReferenceStepRatio, 246 / 1600), 0.02, 1);
    OPTIONS.arcReferenceCameraZ = Math.max(1, finiteNumber(OPTIONS.arcReferenceCameraZ, 720));
    OPTIONS.arcDepthScale = clamp(finiteNumber(OPTIONS.arcDepthScale, 1), 0, 4);
    // 간격 6px이라는 이유로 CSS 모서리를 4.8px로 덮어쓰지 않습니다.
    OPTIONS.arcMatchGapRadius = false;
    OPTIONS.arcSpreadRatio = clamp(finiteNumber(OPTIONS.arcSpreadRatio, 0.27), 0, 1);
    OPTIONS.arcStart = Math.max(0, finiteNumber(OPTIONS.arcStart, 1.3));
    OPTIONS.arcSpan = Math.max(0.1, finiteNumber(OPTIONS.arcSpan, 4.5));
    OPTIONS.slideGap = OPTIONS.slideGap == null ? null : Math.max(0, finiteNumber(OPTIONS.slideGap, 6));
    OPTIONS.focusRatio = clamp(finiteNumber(OPTIONS.focusRatio, 1 / 3), 0, 1);
    OPTIONS.maxPoolSize = clamp(Math.floor(finiteNumber(OPTIONS.maxPoolSize, 64)), 13, 128);
    OPTIONS.poolSize = clamp(Math.floor(finiteNumber(OPTIONS.poolSize, 13)), 1, OPTIONS.maxPoolSize);

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

        /* =====================================================
           Right Edge Soft Blur
           -----------------------------------------------------
           오른쪽으로 갈수록 강해지는 화면 공간 blur.
           텍스처를 여러 장 벌려 그리는 방식이 아니므로
           이미지가 2~3개로 갈라져 보이는 ghosting이 생기지 않습니다.
        ===================================================== */
        const edgeBlur = document.createElement("div");

        edgeBlur.className =
            "designer-ribbon-edge-blur";

        Object.assign(
            edgeBlur.style,
            {
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                width:
                    `${Math.round(
                        OPTIONS.edgeBlurWidthRatio * 10000
                    ) / 100}%`,
                pointerEvents: "none",
                zIndex: "2",

                /*
                 * backdrop-filter가 완전 투명 요소에서도
                 * 안정적으로 합성되도록 아주 미세한 투명 배경을 둡니다.
                 */
                background:
                    "rgba(255,255,255,0.001)",

                backdropFilter:
                    `blur(${OPTIONS.edgeBlurPx}px)`,
                WebkitBackdropFilter:
                    `blur(${OPTIONS.edgeBlurPx}px)`,

                /*
                 * 왼쪽은 원본 100%, 오른쪽으로 갈수록 blur 100%.
                 */
                maskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.10) 18%, rgba(0,0,0,0.42) 48%, rgba(0,0,0,0.78) 74%, #000 100%)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.10) 18%, rgba(0,0,0,0.42) 48%, rgba(0,0,0,0.78) 74%, #000 100%)"
            }
        );

        overlay.appendChild(edgeBlur);

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
        let initialEntrancePlayed = false;

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

                    const baseOpacity = cardBaseOpacity(relative, slot.position);

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
        let domStep = 344; // 기존 designer_02.js의 DOM scrollLeft 단위 (CSS gap 포함)

        /*
         * Slide View 카드 모양도 CSS에서 읽습니다.
         * .designer-card__image-wrap의 border-radius를 WebGL shader에 전달합니다.
         */
        let cardRadius = 17; // 하위 호환용 대표값. 실제 렌더는 네 모서리를 각각 사용.
        // 순서: top-left, top-right, bottom-right, bottom-left.
        let cardRadiiX = [17, 17, 17, 17];
        let cardRadiiY = [17, 17, 17, 17];
        // 순서: top, right, bottom, left.
        let cardBorderWidths = [0, 0, 0, 0];
        const cardBorderColors = Array.from({length:4}, () => new THREE.Vector4(0,0,0,0));
        let cardRadiusSource = 'image-wrap';
        let cardBorderSource = 'none';
        let arcPathStep = 344;
        let arcWorldDepth = OPTIONS.arcDepth;
        let arcCameraScale = 1;

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

        function readCssColor(value, target) {
            if (!borderColorContext || !value) return;
            try {
                if (window.CSS?.supports && !CSS.supports('color', value.trim())) return;
                borderColorContext.clearRect(0, 0, 1, 1);
                borderColorContext.fillStyle = value.trim();
                borderColorContext.fillRect(0, 0, 1, 1);
                const [r, g, b, a] = borderColorContext.getImageData(0, 0, 1, 1).data;
                const linear = n => { n /= 255; return n <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4); };
                // colorspace_fragment에서 다시 sRGB로 출력하므로 CSS 색은 선형값으로 전달.
                target.set(linear(r), linear(g), linear(b), a / 255);
            } catch (_) { /* invalid color: retain previous value */ }
        }

        const cornerProperties = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'];
        const borderSides = ['Top', 'Right', 'Bottom', 'Left'];
        const radiusProbe = document.createElement('div');
        Object.assign(radiusProbe.style, {position:'fixed', left:'-10000px', top:'-10000px', visibility:'hidden', pointerEvents:'none', boxSizing:'border-box', contain:'strict'});
        radiusProbe.setAttribute('aria-hidden', 'true');
        document.body.appendChild(radiusProbe);

        function radiusLength(value, axisSize) {
            const number = parseFloat(value);
            return Number.isFinite(number) ? Math.max(0, value.includes('%') ? axisSize * number / 100 : number) : 0;
        }
        function radiiFromStyle(style) {
            const x = [], y = [];
            for (const property of cornerProperties) {
                const pair = String(style[property] || '0').trim().split(/\s+/);
                x.push(radiusLength(pair[0], cardWidth));
                y.push(radiusLength(pair[1] || pair[0], cardHeight));
            }
            return {x,y};
        }
        function normalizeRadii(radii) {
            // CSS와 동일하게 서로 만나는 모서리들의 합이 변 길이를 넘을 때만 축소.
            const {x,y} = radii;
            const scale = Math.min(1,
                cardWidth / Math.max(1e-8,x[0]+x[1]), cardWidth / Math.max(1e-8,x[3]+x[2]),
                cardHeight / Math.max(1e-8,y[0]+y[3]), cardHeight / Math.max(1e-8,y[1]+y[2]));
            return {x:x.map(v=>v*scale), y:y.map(v=>v*scale)};
        }
        function readCardAppearance(cardStyle, imageStyle) {
            const styles = [cardStyle, imageStyle].filter(Boolean);
            const custom = name => styles.map(st => st.getPropertyValue(name).trim()).find(Boolean) || '';
            const radiusValue = custom('--designer-slide-card-radius') || custom('--designer-card-border-radius') || custom('--designer-card-radius');
            const outer = radiiFromStyle(cardStyle);
            const inner = imageStyle ? radiiFromStyle(imageStyle) : outer;
            let radii;
            if (radiusValue && CSS.supports('border-radius', radiusValue)) {
                radiusProbe.style.width = cardWidth+'px'; radiusProbe.style.height = cardHeight+'px';
                radiusProbe.style.fontSize = cardStyle.fontSize;
                radiusProbe.style.borderRadius = radiusValue;
                radii = radiiFromStyle(getComputedStyle(radiusProbe));
                cardRadiusSource = 'CSS variable';
            } else if (outer.x.some(v=>v>0) || outer.y.some(v=>v>0)) {
                radii = outer; cardRadiusSource = '.designer-card';
            } else {
                radii = inner; cardRadiusSource = imageStyle ? '.designer-card__image-wrap' : '.designer-card';
            }
            radii = normalizeRadii(radii);
            cardRadiiX = radii.x; cardRadiiY = radii.y;
            cardRadius = Math.max(...cardRadiiX, ...cardRadiiY);

            // 기존 CSS 변수 우선, 없으면 실제 border 속성의 width/color를 읽습니다.
            const widthValue = custom('--designer-card-border-width');
            const parsedWidth = parseFloat(widthValue);
            const colorValue = custom('--designer-card-border-color');
            const hasBorder = st => st && borderSides.some(side => !['none','hidden'].includes(st['border'+side+'Style']) && parseFloat(st['border'+side+'Width']) > 0);
            const borderStyle = hasBorder(cardStyle) ? cardStyle : hasBorder(imageStyle) ? imageStyle : cardStyle;
            cardBorderSource = Number.isFinite(parsedWidth) ? 'CSS variable' : hasBorder(borderStyle) ? (borderStyle===cardStyle ? '.designer-card' : '.designer-card__image-wrap') : 'none';
            cardBorderWidths = borderSides.map(side => Number.isFinite(parsedWidth) ? Math.max(0, parsedWidth) :
                (!['none','hidden'].includes(borderStyle['border'+side+'Style']) ? Math.max(0,parseFloat(borderStyle['border'+side+'Width']) || 0) : 0));
            for (let i=0;i<4;i++) {
                const cssColor = colorValue || borderStyle['border'+borderSides[i]+'Color'] || 'rgba(0,0,0,.18)';
                readCssColor(cssColor, cardBorderColors[i]);
            }
            cardBorderWidth = Math.max(...cardBorderWidths);
            cardBorderColor.copy(cardBorderColors[0]);
        }

        function syncArcMetrics() {
            const cameraZ = Math.max(camera.position.z, 1);
            arcCameraScale = OPTIONS.arcMatchPrototype ? cameraZ / OPTIONS.arcReferenceCameraZ : 1;
            arcPathStep = OPTIONS.arcMatchPrototype ? Math.max(1, overlayWidth * OPTIONS.arcReferenceStepRatio) : Math.max(1, step);
            arcWorldDepth = OPTIONS.arcDepth * arcCameraScale * OPTIONS.arcDepthScale;
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

                const cardStyle = getComputedStyle(sourceCards[0]);
                const imageStyle = imageWrap ? getComputedStyle(imageWrap) : null;
                readCardAppearance(cardStyle, imageStyle);

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
            const cssGap = parseFloat(trackStyle.columnGap || trackStyle.gap);
            domStep = cardWidth + (Number.isFinite(cssGap) ? Math.max(0, cssGap) : 24);
            gap = OPTIONS.slideGap == null
                ? (Number.isFinite(cssGap) ? Math.max(0, cssGap) : 24)
                : OPTIONS.slideGap;
            step = cardWidth + gap;
            // DOM/CSS gap은 변경하지 않습니다. Grid View는 기존 레이아웃 그대로입니다.

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

            syncArcMetrics();
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

        function effectiveCardRadius() {
            return cardRadius; // 절대 gap*0.8로 자르지 않습니다.
        }

        function syncCssCardUniforms() {
            const radius = effectiveCardRadius();
            for (const slot of slots) {
                if (!slot?.uniforms) continue;

                slot.uniforms.uCardSize.value.set(
                    cardWidth,
                    cardHeight
                );

                slot.uniforms.uRadius.value = radius;
                slot.uniforms.uRadiusX.value.set(...cardRadiiX);
                slot.uniforms.uRadiusY.value.set(...cardRadiiY);
                slot.uniforms.uBorderWidths.value.set(...cardBorderWidths);
                ['Top','Right','Bottom','Left'].forEach((side,i) => slot.uniforms['uBorderColor'+side].value.copy(cardBorderColors[i]));
                slot.uniforms.uArcDepth.value = arcWorldDepth;
                slot.uniforms.uStep.value = arcPathStep;
                slot.uniforms.uArcSpread.value = overlayWidth * OPTIONS.arcSpreadRatio;
                slot.uniforms.uCameraZ.value = camera.position.z;

                // Grid에서 처음 시작해 Slide에 진입한 경우에도 실제 CSS 크기로 맞춥니다.
                const geometry = slot.mesh.geometry;
                if (geometry.parameters.width !== cardWidth || geometry.parameters.height !== cardHeight) {
                    geometry.dispose();
                    slot.mesh.geometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 44, 18);
                }
                const sideKey = [cardWidth, cardHeight, ...cardRadiiX, ...cardRadiiY, OPTIONS.cardThickness].join("|");
                if (slot.sideMesh && slot.sideGeometryKey !== sideKey) {
                    slot.sideMesh.geometry.dispose();
                    slot.sideMesh.geometry = createRoundedSideGeometry(cardWidth, cardHeight, cardRadiiX, cardRadiiY, OPTIONS.cardThickness);
                    slot.sideGeometryKey = sideKey;
                }

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
            focusX = overlayWidth * (OPTIONS.focusRatio - 0.5);
            syncArcMetrics();
            // 실제 카메라에 맞게 환산한 깊이까지 보이도록 far plane도 함께 갱신합니다.
            camera.far = Math.max(5000, cameraZ + arcWorldDepth + Math.abs(OPTIONS.velocityDepth) + 1500);
            camera.updateProjectionMatrix();
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

        placeholderCtx.fillStyle = "#eee";
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
        const pendingTextures = new Map();

        function cardTextureKey(item) {
            return item ? [item.id || item.url, item.url, item.nameKo, item.nameEn,
                cardTextLeft, cardTextBottom, cardTextGap, cardWidth, cardHeight].join("|") : "";
        }

        function createCardTexture(index) {
            const item = cardData[index];
            if (!item) return Promise.resolve(placeholderTexture);
            const key = cardTextureKey(item);
            const cached = textureCache.get(key);
            if (cached) { cached.used = ++textureUseClock; return Promise.resolve(cached.texture); }
            if (pendingTextures.has(key)) return pendingTextures.get(key);
            const task = buildCardTexture(index).finally(() => pendingTextures.delete(key));
            pendingTextures.set(key, task);
            return task;
        }

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
                        ([key, entry]) =>
                            !active.has(entry.texture) &&
                            !slots.some(slot => slot.active && slot.pendingTextureKey === key)
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

        async function buildCardTexture(index) {
            const item = cardData[index];

            if (!item) {
                return placeholderTexture;
            }

            /*
             * 필터 전환으로 배열 index가 바뀌어도
             * 동일 디자이너 텍스처를 재사용합니다.
             */
            const cacheKey = cardTextureKey(item);
            const metrics = {cardWidth, cardHeight, cardTextLeft, cardTextBottom, cardTextGap};

            const cached =
                textureCache.get(cacheKey);

            if (cached) {
                cached.used = ++textureUseClock;
                return cached.texture;
            }

            const ratio =
                metrics.cardWidth /
                Math.max(
                    1,
                    metrics.cardHeight
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

            ctx.fillStyle = "#eee";
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
                "rgba(0,0,0,0)"
            );

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, W, H);

            /*
             * CSS px 값을 texture canvas 크기에 맞게 스케일링합니다.
             * WebGL 카드의 실제 metrics.cardWidth/metrics.cardHeight와 canvas W/H가 다르기 때문입니다.
             */
            const scaleX =
                W /
                Math.max(
                    1,
                    metrics.cardWidth
                );

            const scaleY =
                H /
                Math.max(
                    1,
                    metrics.cardHeight
                );

            const left =
                metrics.cardTextLeft *
                scaleX;

            const bottom =
                metrics.cardTextBottom *
                scaleY;

            const gap =
                metrics.cardTextGap *
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
                "#111";

            ctx.font =
                `700 ${nameKoFontSize}px Pretendard, Arial, sans-serif`;

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
                "#222";

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
            // 승인한 slider-big-arc-test.html의 실제 vertex 식과 동일합니다.
            // 모든 카드의 모든 vertex가 같은 global X를 샘플링합니다.
            float bigArcAmount(float x) {
                float progress = max((x - uFocusX) / max(uStep, 1.0) - uArcStart, 0.0);
                float bendT = clamp(1.0 - exp(-progress / max(uArcSpan, 0.0001)), 0.0, 0.9995);
                return 1.0 - cos(bendT * 1.57079632679);
            }
            float bigArcDepth(float x, float arc) {
                // 반복 웨이브로 경로를 만들지 않습니다. 이동 중의 작은 반응만 유지합니다.
                return -uArcDepth * arc
                    + sin(x * 0.004 + uTime * 2.0) * uDynamicDepth * uArcRipple * arc;
            }
        `;

        /* 앞면과 두께 옆면이 같은 곡면을 사용합니다. localY는 회전시키지 않습니다. */
        const vertexShader = `
            uniform float uCardCenterX;
            uniform float uFocusX;
            uniform float uStep;
            uniform float uArcDepth;
            uniform float uArcSpread;
            uniform float uArcStart;
            uniform float uArcSpan;
            uniform float uArcRipple;
            uniform float uCameraZ;
            uniform float uCardOffsetY;
            uniform float uFilterOffsetY;
            uniform float uDynamicDepth;
            uniform float uTime;
            varying vec2 vUv;
            varying float vFacing;
            ${FLOW_GLSL}

            void main() {
                vUv = uv;
                float sampleX = uCardCenterX + position.x;
                float arc = bigArcAmount(sampleX);
                float z = position.z + bigArcDepth(sampleX, arc);
                float x = sampleX + uArcSpread * arc;

                // CSS 세로 offset과 필터 낙하량은 화면 px로 유지합니다.
                // 깊어진다고 카드 중심선이 위/아래로 휘지 않습니다.
                float offsetY = -uCardOffsetY + uFilterOffsetY;
                float inversePerspective = (uCameraZ - z) / max(uCameraZ, 1.0);
                float y = position.y + offsetY * inversePerspective;

                vFacing = 1.0;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
            }
        `;

        const fragmentShader = `
            uniform sampler2D uTexture;
            uniform float uTextureReady;
            uniform float uSplit;
            uniform float uOpacity;

            uniform vec2 uCardSize;
            uniform float uRadius; // legacy alias
            uniform vec4 uRadiusX;
            uniform vec4 uRadiusY;
            uniform vec4 uBorderWidths; // top, right, bottom, left
            uniform vec4 uBorderColorTop;
            uniform vec4 uBorderColorRight;
            uniform vec4 uBorderColorBottom;
            uniform vec4 uBorderColorLeft;
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

            // p는 왼쪽 아래 원점. corner vec4는 TL, TR, BR, BL 순서.
            float ellipseCornerDistance(vec2 p, vec2 center, vec2 radius) {
                return (length((p-center)/max(radius,vec2(0.0001)))-1.0)*min(radius.x,radius.y);
            }
            float cardShapeDistance(vec2 p, vec2 size, vec4 rx, vec4 ry) {
                float d = max(max(-p.x,p.x-size.x),max(-p.y,p.y-size.y));
                if(rx.x>0.0 && ry.x>0.0 && p.x<rx.x && p.y>size.y-ry.x)
                    d=ellipseCornerDistance(p,vec2(rx.x,size.y-ry.x),vec2(rx.x,ry.x));
                if(rx.y>0.0 && ry.y>0.0 && p.x>size.x-rx.y && p.y>size.y-ry.y)
                    d=ellipseCornerDistance(p,vec2(size.x-rx.y,size.y-ry.y),vec2(rx.y,ry.y));
                if(rx.z>0.0 && ry.z>0.0 && p.x>size.x-rx.z && p.y<ry.z)
                    d=ellipseCornerDistance(p,vec2(size.x-rx.z,ry.z),vec2(rx.z,ry.z));
                if(rx.w>0.0 && ry.w>0.0 && p.x<rx.w && p.y<ry.w)
                    d=ellipseCornerDistance(p,vec2(rx.w,ry.w),vec2(rx.w,ry.w));
                return d;
            }
            float shapeAA(float distanceValue) {
                #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
                    return max(0.35, 0.5*fwidth(distanceValue));
                #else
                    return 0.75;
                #endif
            }

            void main() {
                if (uTextureReady < 0.5 || uOpacity < 0.001) discard;
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

                vec2 p = vUv*uCardSize;
                float outerDistance = cardShapeDistance(p,uCardSize,uRadiusX,uRadiusY);
                float aa = shapeAA(outerDistance);
                float rounded = 1.0-smoothstep(-aa,aa,outerDistance);
                if(rounded<=0.001) discard;

                vec2 inset = vec2(uBorderWidths.w,uBorderWidths.z);
                vec2 innerSize = uCardSize-vec2(uBorderWidths.w+uBorderWidths.y,uBorderWidths.x+uBorderWidths.z);
                vec4 innerRX = max(vec4(0.0),uRadiusX-vec4(uBorderWidths.w,uBorderWidths.y,uBorderWidths.y,uBorderWidths.w));
                vec4 innerRY = max(vec4(0.0),uRadiusY-vec4(uBorderWidths.x,uBorderWidths.x,uBorderWidths.z,uBorderWidths.z));
                float innerMask=0.0;
                if(innerSize.x>0.0 && innerSize.y>0.0) {
                    float innerDistance = cardShapeDistance(p-inset,innerSize,innerRX,innerRY);
                    float innerAA=shapeAA(innerDistance);
                    innerMask=1.0-smoothstep(-innerAA,innerAA,innerDistance);
                }
                float borderMask=clamp((rounded-innerMask)/max(rounded,0.0001),0.0,1.0);
                // 코너에서는 가장 가까운 테두리 방향의 색을 선택합니다.
                vec4 distances=vec4(uCardSize.y-p.y,uCardSize.x-p.x,p.y,p.x)/max(uBorderWidths,vec4(0.0001));
                vec4 edgeColor=uBorderColorTop;
                float nearest=distances.x;
                if(distances.y<nearest){nearest=distances.y;edgeColor=uBorderColorRight;}
                if(distances.z<nearest){nearest=distances.z;edgeColor=uBorderColorBottom;}
                if(distances.w<nearest){edgeColor=uBorderColorLeft;}
                rgb=mix(rgb,edgeColor.rgb,borderMask*edgeColor.a);

                gl_FragColor =
                    vec4(
                        rgb,
                        center.a *
                        uOpacity *
                        facing *
                        rounded
                    );
                #include <colorspace_fragment>
            }
        `;

        /*
         * 카드 옆면 전용 Shader.
         * front와 같은 vertexShader / ribbon deformation을 공유하기 때문에
         * 스크롤·왜곡·wobble·필터 애니메이션을 전부 함께 따라갑니다.
         */
        const thicknessFragmentShader = `
            uniform float uOpacity;
            uniform float uTextureReady;

            uniform vec3 uThicknessColor;
            uniform float uThicknessOpacity;

            uniform vec3 uLightColor;
            uniform float uLightRim;
            uniform float uLightRimPower;

            varying float vFacing;

            void main() {
                if (uTextureReady < 0.5 || uOpacity < 0.001) discard;
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
        function createRoundedSideGeometry(width, height, rx, ry, thickness) {
            const geometry = new THREE.BufferGeometry();
            const hw=width/2, hh=height/2, points=[];
            const line=(x0,y0,x1,y1,segments=44)=>{
                for(let i=0;i<segments;i++){const t=i/segments;points.push([x0+(x1-x0)*t,y0+(y1-y0)*t]);}
            };
            const arc=(cx,cy,rX,rY,a0,a1)=>{
                for(let i=0;i<16;i++){const a=a0+(a1-a0)*i/16;points.push([cx+Math.cos(a)*rX,cy+Math.sin(a)*rY]);}
            };
            line(-hw+rx[0],hh,hw-rx[1],hh);
            arc(hw-rx[1],hh-ry[1],rx[1],ry[1],Math.PI/2,0);
            line(hw,hh-ry[1],hw,-hh+ry[2],8);
            arc(hw-rx[2],-hh+ry[2],rx[2],ry[2],0,-Math.PI/2);
            line(hw-rx[2],-hh,-hw+rx[3],-hh);
            arc(-hw+rx[3],-hh+ry[3],rx[3],ry[3],-Math.PI/2,-Math.PI);
            line(-hw,-hh+ry[3],-hw,hh-ry[0],8);
            arc(-hw+rx[0],hh-ry[0],rx[0],ry[0],Math.PI,Math.PI/2);
            const positions=[],uvs=[],indices=[],z=-Math.max(0,thickness);
            points.forEach(([x,y],i)=>{positions.push(x,y,0,x,y,z);uvs.push(i/points.length,1,i/points.length,0);});
            for(let i=0;i<points.length;i++){const a=2*i,b=2*((i+1)%points.length);indices.push(a,b,a+1,b,b+1,a+1);}
            geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
            geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
            geometry.setIndex(indices);geometry.computeBoundingSphere();return geometry;
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

        function arcAmountAt(x) {
            const progress = Math.max((x - focusX) / Math.max(arcPathStep, 1) - OPTIONS.arcStart, 0);
            const bend = clamp(1 - Math.exp(-progress / OPTIONS.arcSpan), 0, 0.9995);
            return 1 - Math.cos(bend * Math.PI * 0.5);
        }

        function sampleArcPoint(x, localY = 0, filterY = 0, time = 0, localZ = 0) {
            const arc = arcAmountAt(x);
            const z = localZ - arcWorldDepth * arc
                + Math.sin(x * 0.004 + time * 2) * dynamicDepthState.position * (OPTIONS.arcRipple ? 1 : 0) * arc;
            const cameraZ = Math.max(camera.position.z, 1);
            return {
                x: x + overlayWidth * OPTIONS.arcSpreadRatio * arc,
                y: localY + (-cardOffsetY + filterY) * (cameraZ - z) / cameraZ,
                z
            };
        }

        function cardBaseOpacity(relative, centerX = focusX + relative * step) {
            if (!OPTIONS.distanceOpacity || arcWorldDepth <= 0.001) return 1;

            // 카드 순서가 아닌, 큰 곡선에서 카드 중심이 실제로 후퇴한 비율.
            // 정면/왼쪽은 arcAmountAt() == 0이므로 불투명도 1을 유지합니다.
            // 작은 이동 중 ripple은 제외해 불투명도가 미세하게 떨리지 않게 합니다.
            const depthRatio = clamp(arcAmountAt(centerX), 0, 1);
            const t = clamp(
                (depthRatio - OPTIONS.distanceFadeStart) /
                    Math.max(0.001, OPTIONS.distanceFadeEnd - OPTIONS.distanceFadeStart),
                0,
                1
            );
            const eased = t * t * (3 - 2 * t);
            return 1 - (1 - OPTIONS.distanceMinOpacity) * eased;
        }

        function getPoolLayout() {
            const padding = cardWidth * Math.max(1, OPTIONS.spawnPaddingCards);
            const cameraZ = Math.max(camera.position.z, 1);
            // 원근 투영 후 화면에 남는 범위를 최대 후퇴량까지 포함해서 계산합니다.
            // 깊이 때문에 작아진 카드가 화면 안에서 재사용되어 사라지는 것을 방지합니다.
            const farDepth = arcWorldDepth + Math.abs(OPTIONS.velocityDepth) + OPTIONS.cardThickness;
            const rawLeft = -overlayWidth / 2 - padding - cardWidth / 2;
            const rawRight = (overlayWidth / 2) * (1 + farDepth / cameraZ) + padding + cardWidth / 2;
            const left = Math.floor((rawLeft - focusX) / Math.max(step, 1));
            const right = Math.ceil((rawRight - focusX) / Math.max(step, 1));
            const size = clamp(Math.max(OPTIONS.poolSize, right - left + 1), 1, OPTIONS.maxPoolSize);
            return {left, size, right: left + size};
        }

        function getPhysicalPoolSize() {
            return getPoolLayout().size;
        }

        function getDesiredPoolSize() {
            if (!cardData.length) return 0;
            // All은 적은 데이터도 반복해 띠를 끝까지 채웁니다.
            // 초성 필터는 실제 결과 수만큼만 표시합니다 (1명 = 1장).
            return isFiniteCardList()
                ? Math.min(getPhysicalPoolSize(), cardData.length)
                : getPhysicalPoolSize();
        }

        function getVirtualWindow() {
            const layout = getPoolLayout();
            if (isFiniteCardList()) {
                const first = clamp(Math.floor(ribbonState.position) + layout.left, 0, Math.max(0, cardData.length - poolSize));
                return {first, end: first + poolSize};
            }
            const first = Math.ceil(ribbonState.position + layout.left);
            return {first, end: first + poolSize};
        }

        function createSlots() {
            /*
             * 이 함수는 최초 생성 / 실제 resize 때만 사용합니다.
             * 필터 전환에서는 절대 호출하지 않습니다.
             *
             * 물리 Mesh pool은 원근 가시 범위에 필요한 수만 유지하고,
             * 실제 사용하는 카드 수만 poolSize로 별도 관리합니다.
             */
            for (const slot of slots) {
                slot.active = false;
                slot.loadToken++;
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

            const physicalPoolSize = Math.max(1, getPhysicalPoolSize());

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

                    uTextureReady: { value: 0 },
                    uStep: { value: arcPathStep },
                    uArcDepth: { value: arcWorldDepth },
                    uArcSpread: { value: overlayWidth * OPTIONS.arcSpreadRatio },
                    uArcStart: { value: OPTIONS.arcStart },
                    uArcSpan: { value: OPTIONS.arcSpan },
                    uArcRipple: { value: OPTIONS.arcRipple ? 1 : 0 },
                    uCameraZ: { value: camera.position.z },
                    uCardCenterX: { value: 0 },

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

                    uRadius: { value: effectiveCardRadius() },
                    uRadiusX: {value:new THREE.Vector4(...cardRadiiX)},
                    uRadiusY: {value:new THREE.Vector4(...cardRadiiY)},
                    uBorderWidths: {value:new THREE.Vector4(...cardBorderWidths)},
                    uBorderColorTop: {value:cardBorderColors[0].clone()},
                    uBorderColorRight: {value:cardBorderColors[1].clone()},
                    uBorderColorBottom: {value:cardBorderColors[2].clone()},
                    uBorderColorLeft: {value:cardBorderColors[3].clone()},

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
                        extensions: { derivatives: true },
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
                        cardRadiiX,
                        cardRadiiY,
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

                    texture: placeholderTexture,
                    textureKey: "",
                    pendingTextureKey: "",
                    sideGeometryKey: [cardWidth, cardHeight, ...cardRadiiX, ...cardRadiiY, OPTIONS.cardThickness].join("|"),
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
                        ? getVirtualWindow().first + i
                        : Math.floor(ribbonState.position) + getPoolLayout().left + i
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
                const animateIncoming = !initialEntrancePlayed || !!pendingFilterTransition;
                slot.uniforms.uFilterOffsetY.value = animateIncoming ? -startDrop : 0;
                slot.uniforms.uOpacity.value = animateIncoming
                    ? 0
                    : cardBaseOpacity(entry.virtualIndex - ribbonState.position);

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
        let lastRenderedTime = 0;

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

        async function assignTexture(slot, virtualIndex) {
            if (!cardData.length || !slot.active) return;
            const index = mod(virtualIndex, cardData.length);
            const item = cardData[index];
            if (!item) return;
            const key = cardTextureKey(item);
            slot.dataIndex = index;
            if (slot.textureKey === key && slot.texture !== placeholderTexture) {
                // 필터 identity는 그리는 실제 텍스처와 함께 관리합니다.
                slot.currentDesignerId = item.id;
                slot.uniforms.uTextureReady.value = 1;
                return;
            }
            if (slot.pendingTextureKey === key) return;
            const token = ++slot.loadToken;
            slot.pendingTextureKey = key;
            slot.currentDesignerId = item.id;
            slot.uniforms.uTextureReady.value = 0;
            try {
                const texture = await createCardTexture(index);
                if (token !== slot.loadToken || !slot.active || slot.pendingTextureKey !== key) return;
                slot.texture = texture;
                slot.textureKey = key;
                slot.uniforms.uTexture.value = texture;
                slot.uniforms.uTextureReady.value = texture !== placeholderTexture ? 1 : 0;
                slot.currentDesignerId = item.id;
                wake();
            } catch (error) {
                console.warn("[DesignerRibbonSlider] texture 생성 실패:", error);
            } finally {
                if (token === slot.loadToken) slot.pendingTextureKey = "";
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

                // 같은 원근 구간에서만 재사용합니다. 비대칭 창의 폭은 정확히 poolSize입니다.
                const windowRange = getVirtualWindow();
                let recycled = false;
                while (slot.virtualIndex < windowRange.first) { slot.virtualIndex += poolSize; recycled = true; }
                while (slot.virtualIndex >= windowRange.end) { slot.virtualIndex -= poolSize; recycled = true; }
                if (recycled) {
                    relative = slot.virtualIndex - ribbonState.position;
                    targetCenter = focusX + relative * step + (isFiniteCardList() ? edgeGroupBounceState.position : 0);
                    slot.position = targetCenter;
                    slot.velocity = 0;
                    slot.dataIndex = -1;
                    slot.currentDesignerId = "";
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

                if (!filterTransitionRunning && !pendingFilterTransition) {
                    slot.uniforms.uOpacity.value = cardBaseOpacity(relative, slot.position);
                }

                slot.uniforms.uStep.value = arcPathStep;
                slot.uniforms.uArcDepth.value = arcWorldDepth;
                slot.uniforms.uArcSpread.value = overlayWidth * OPTIONS.arcSpreadRatio;
                slot.uniforms.uCameraZ.value = camera.position.z;

                // 셰이더 변형은 Three.js의 기본 transparent sort에 반영되지 않습니다.
                // 실제 후퇴 깊이를 renderOrder에 반영해 먼 카드를 먼저 그립니다.
                slot.depth = sampleArcPoint(slot.position, 0, 0, time).z;
            }
            const ordered = slots.filter(slot => slot.active).sort((a, b) => a.depth - b.depth);
            ordered.forEach((slot, i) => {
                if (slot.sideMesh) slot.sideMesh.renderOrder = i * 2;
                slot.mesh.renderOrder = i * 2 + 1;
            });
            lastRenderedTime = time;
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
                if (event.button !== 0 || !isSlideView()) return;
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

            if (overlay.hasPointerCapture?.(event.pointerId)) {
                overlay.releasePointerCapture(event.pointerId);
            }

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
           Keyboard
           ArrowLeft / ArrowRight로 카드 1장 단위 이동
        ===================================================== */

        window.addEventListener(
            "keydown",
            event => {
                if (!isSlideView()) {
                    return;
                }

                if (
                    event.key !== "ArrowLeft" &&
                    event.key !== "ArrowRight"
                ) {
                    return;
                }

                /* input / textarea / select / contenteditable 조작은 방해하지 않음 */
                const target = event.target;

                if (
                    target instanceof HTMLInputElement ||
                    target instanceof HTMLTextAreaElement ||
                    target instanceof HTMLSelectElement ||
                    target?.isContentEditable
                ) {
                    return;
                }

                if (
                    event.altKey ||
                    event.ctrlKey ||
                    event.metaKey
                ) {
                    return;
                }

                /* 길게 눌렀을 때 과도하게 넘어가는 것 방지 */
                if (event.repeat) {
                    event.preventDefault();
                    return;
                }

                event.preventDefault();

                const direction =
                    event.key === "ArrowRight"
                        ? 1
                        : -1;

                targetScroll +=
                    direction *
                    OPTIONS.keyboardStep;

                limitScrollTarget();
                scheduleFiniteEdgeReturn();
                wake();
            }
        );

        /* =====================================================
           Click card
        ===================================================== */

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const hitA = new THREE.Vector3(), hitB = new THREE.Vector3();
        const hitC = new THREE.Vector3(), hitD = new THREE.Vector3();
        const hitPoint = new THREE.Vector3();
        let pointerDownX = 0, pointerDownY = 0;

        function pointInsideRoundedCard(x,y) {
            const px=x+cardWidth/2,py=y+cardHeight/2,rx=cardRadiiX,ry=cardRadiiY;
            if(px<0 || px>cardWidth || py<0 || py>cardHeight) return false;
            const corners=[
                [0,rx[0],cardHeight-ry[0],px<rx[0]&&py>cardHeight-ry[0]],
                [1,cardWidth-rx[1],cardHeight-ry[1],px>cardWidth-rx[1]&&py>cardHeight-ry[1]],
                [2,cardWidth-rx[2],ry[2],px>cardWidth-rx[2]&&py<ry[2]],
                [3,rx[3],ry[3],px<rx[3]&&py<ry[3]]
            ];
            for(const [i,cx,cy,inside] of corners) if(inside && rx[i]>0 && ry[i]>0 && Math.hypot((px-cx)/rx[i],(py-cy)/ry[i])>1) return false;
            return true;
        }

        function pickCurvedCard(clientX, clientY) {
            if (!isSlideView() || !overlay.classList.contains("is-active")) return null;
            const rect = overlay.getBoundingClientRect();
            pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
            camera.updateMatrixWorld();
            raycaster.setFromCamera(pointer, camera);
            let closest = Infinity, result = null;
            const segments = 44; // 실제 mesh와 같은 가로 분할 수
            for (const slot of slots) {
                if (!slot.active || !slot.mesh.visible || slot.uniforms.uTextureReady.value < 0.5 || slot.uniforms.uOpacity.value < 0.05) continue;
                const filterY = slot.uniforms.uFilterOffsetY.value;
                const halfW = cardWidth / 2, halfH = cardHeight / 2;
                const setPoint = (target, lx, ly) => {
                    const p = sampleArcPoint(slot.position + lx, ly, filterY, lastRenderedTime);
                    target.set(p.x, p.y, p.z);
                };
                for (let col = 0; col < segments; col++) {
                    const lx0 = -halfW + col / segments * cardWidth;
                    const lx1 = -halfW + (col + 1) / segments * cardWidth;
                    setPoint(hitA, lx0, -halfH); setPoint(hitB, lx1, -halfH);
                    setPoint(hitC, lx0, halfH);  setPoint(hitD, lx1, halfH);
                    const intersects = raycaster.ray.intersectTriangle(hitA, hitB, hitC, false, hitPoint)
                        || raycaster.ray.intersectTriangle(hitB, hitD, hitC, false, hitPoint);
                    if (!intersects) continue;
                    const t = clamp((hitPoint.x - hitA.x) / Math.max(hitB.x - hitA.x, 0.00001), 0, 1);
                    const localX = lx0 + (lx1 - lx0) * t;
                    const baseline = hitA.y + (hitB.y - hitA.y) * t;
                    const localY = hitPoint.y - baseline - halfH;
                    if(!pointInsideRoundedCard(localX,localY)) continue;
                    const distance = hitPoint.distanceToSquared(raycaster.ray.origin);
                    if (distance < closest) { closest = distance; result = slot; }
                }
            }
            return result;
        }

        overlay.addEventListener("pointerdown", event => {
            pointerDownX = event.clientX;
            pointerDownY = event.clientY;
        });
        overlay.addEventListener("click", event => {
            if (event.button !== 0 || Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY) > 6) return;
            const slot = pickCurvedCard(event.clientX, event.clientY);
            if (!slot) return;
            const href = cardData[mod(slot.virtualIndex, cardData.length)]?.href;
            if (href && href !== "#") window.location.href = href;
        });

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
            if (!initialEntrancePlayed) {
                startInitialEntrance();
                return;
            }
            hideOriginalTrackForSlide();

                sourceCards =
                    getOriginalCards();

                cardData =
                    sourceCards.map(
                        readCard
                    );
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
            if (slots.length !== getPhysicalPoolSize()) {
                createSlots();
                if (pendingFilterTransition) prepareIncomingSlotsBeforeRender();
            }

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

            /* 첫 프레임 전에 실제 위치/곡선 uniform도 동기화합니다. */
            updateSlots(performance.now() / 1000, 0);
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

                dragging ||
                slots.some(slot => slot.active && Math.abs(slot.velocity) > 0.01);

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
                            domStep
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

                    /*
                    * slide-view 클래스로 바뀐 즉시
                    * 기존 DOM 카드를 먼저 숨김.
                    */
                    hideOriginalTrackForSlide();

                    previousSliderScroll =
                        slider.scrollLeft;

                    requestAnimationFrame(
                        activate
                    );
                }
                else {
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
            version: 'big-arc-screen-match-2.1',
            syncStyles() { if(isSlideView()){measure();wake();} },
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
                    slot.active = false;
                    slot.loadToken++;
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
                radiusProbe.remove();
                // Overlay CSS는 외부 stylesheet 소유이므로 여기서 삭제하지 않습니다.
},

            get status() {
                return {
                    version: 'big-arc-screen-match-2.1',
                    cards: cardData.length,
                    arc: {
                        depth: OPTIONS.arcDepth,
                        effectiveWorldDepth: arcWorldDepth,
                        cameraZ: camera.position.z,
                        depthToCameraRatio: arcWorldDepth/Math.max(camera.position.z,1),
                        pathStep: arcPathStep,
                        matchPrototype: OPTIONS.arcMatchPrototype,
                        spreadRatio: OPTIONS.arcSpreadRatio,
                        gap,
                        start: OPTIONS.arcStart,
                        span: OPTIONS.arcSpan,
                        xAxisTilt: 0,
                        radius: effectiveCardRadius()
                    },
                    cssAppearance: {
                        radiusSource:cardRadiusSource,
                        radiusX:[...cardRadiiX],radiusY:[...cardRadiiY],
                        borderSource:cardBorderSource,
                        borderWidths:[...cardBorderWidths]
                    },
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
