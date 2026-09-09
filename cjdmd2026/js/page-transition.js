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


    /*
     * 8 Box Transition
     */
    const IN_DURATION =
        760;

    const IN_STAGGER =
        55;

    const OUT_DURATION =
        980;

    /*
     * 세로 4개 OUT 순서
     * 가운데 → 바깥
     */
    const OUT_DELAYS =
        [
            105,
            0,
            45,
            150
        ];


    const TRANSITION_COLOR =
        "#111";

    const TRANSITION_Z_INDEX =
        999999;


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

        .page-transition-layer {
            position: fixed;
            inset: 0;

            width: 100vw;
            height: 100dvh;

            overflow: hidden;

            z-index:
                ${TRANSITION_Z_INDEX};

            pointer-events: none;

            contain:
                layout paint style;

            transform:
                translateZ(0);
        }


        .page-transition-box {
            position: absolute;

            margin: 0;
            padding: 0;

            border: 0;

            background:
                var(
                    --page-transition-color,
                    ${TRANSITION_COLOR}
                );

            backface-visibility:
                hidden;

            will-change:
                transform;
        }


        /* ==============================
           IN
           가로 4등분
        ============================== */

        .page-transition-layer[data-mode="in"]
        .page-transition-box {

            left: 0;

            width: 100%;

            height:
                calc(25% + 1px);
        }


        /* ==============================
           OUT
           세로 4등분
        ============================== */

        .page-transition-layer[data-mode="out"]
        .page-transition-box {

            top: 0;

            width:
                calc(25% + 1px);

            height: 100%;
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

            .page-transition-box,
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

    function nextFrame() {

        return new Promise(
            resolve => {

                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            resolve
                        );

                    }
                );

            }
        );

    }



    function removeLayer() {

        if (
            activeLayer
            &&
            activeLayer.isConnected
        ) {

            activeLayer.remove();

        }


        activeLayer =
            null;

    }



    function createLayer(
        mode
    ) {

        removeLayer();


        const layer =
            document.createElement(
                "div"
            );


        layer.className =
            "page-transition-layer";


        layer.dataset.mode =
            mode;


        layer.setAttribute(
            "aria-hidden",
            "true"
        );


        layer.style.setProperty(
            "--page-transition-color",
            TRANSITION_COLOR
        );


        const boxes =
            [];


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "page-transition-box";


            if (
                mode ===
                "in"
            ) {

                box.style.top =
                    `${i * 25}%`;

            }

            else {

                box.style.left =
                    `${i * 25}%`;

            }


            layer.appendChild(
                box
            );


            boxes.push(
                box
            );

        }


        document.body.appendChild(
            layer
        );


        activeLayer =
            layer;


        return {

            layer,
            boxes

        };

    }



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



    /* ========================================
       Transition IN
       가로 4개
    ======================================== */

    async function playIn() {

        const {
            boxes
        } =
            createLayer(
                "in"
            );


        /*
         * 1,3 = 왼쪽에서
         * 2,4 = 오른쪽에서
         */
        const directions =
            [
                -1,
                1,
                -1,
                1
            ];


        boxes.forEach(
            (
                box,
                index
            ) => {

                box.style.transform =
                    `translate3d(${
                        directions[index]
                        *
                        105
                    }%, 0, 0)`;

            }
        );


        /*
         * 초기 위치를 먼저 렌더
         */
        void activeLayer
            .offsetWidth;


        await nextFrame();


        const animations =
            boxes.map(
                (
                    box,
                    index
                ) => {

                    return box.animate(
                        [

                            {
                                transform:
                                    `translate3d(${
                                        directions[index]
                                        *
                                        105
                                    }%, 0, 0)`
                            },

                            {
                                transform:
                                    "translate3d(0, 0, 0)"
                            }

                        ],

                        {

                            duration:
                                IN_DURATION,

                            delay:
                                index
                                *
                                IN_STAGGER,

                            easing:
                                "cubic-bezier(.72, 0, .22, 1)",

                            fill:
                                "forwards"

                        }
                    );

                }
            );


        await Promise.all(
            animations.map(
                animation =>
                    animation
                        .finished
                        .catch(
                            () => {}
                        )
            )
        );


        /*
         * 페이지 이동 전까지
         * 흰 화면 그대로 유지
         */

    }



    /* ========================================
       Transition OUT
       세로 4개
    ======================================== */

    async function playOut() {

        const {
            boxes
        } =
            createLayer(
                "out"
            );


        /*
         * 처음에는 화면을 완전히 덮음
         */
        boxes.forEach(
            box => {

                box.style.transform =
                    "translate3d(0, 0, 0)";

            }
        );


        void activeLayer
            .offsetWidth;


        /*
         * layer가 확실히 생성된 뒤
         * preload 해제
         */
        document.documentElement
            .classList
            .remove(
                "page-transition-preload"
            );


        await nextFrame();


        const animations =
            boxes.map(
                (
                    box,
                    index
                ) => {

                    return box.animate(
                        [

                            {
                                transform:
                                    "translate3d(0, 0, 0)"
                            },

                            {
                                transform:
                                    "translate3d(0, -105%, 0)"
                            }

                        ],

                        {

                            duration:
                                OUT_DURATION,

                            delay:
                                OUT_DELAYS[
                                    index
                                ],

                            easing:
                                "cubic-bezier(.76, 0, .18, 1)",

                            fill:
                                "forwards"

                        }
                    );

                }
            );


        await Promise.all(
            animations.map(
                animation =>
                    animation
                        .finished
                        .catch(
                            () => {}
                        )
            )
        );


        removeLayer();

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


        await playIn();


        /*
         * 다음 페이지에
         * 전환 상태 전달
         */
        sessionStorage.setItem(
            STORAGE_KEY,
            "1"
        );


        window.location.href =
            href;

    }



    /* ========================================
       NAV 클릭
    ======================================== */

    function handleLinkClick(
        event
    ) {

        const link =
            event.currentTarget;


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

        const shouldEnter =

            sessionStorage.getItem(
                STORAGE_KEY
            )

            ===

            "1";


        /*
         * 직접 접속 / 새로고침
         */
        if (
            !shouldEnter
        ) {

            document.documentElement
                .classList
                .remove(
                    "page-transition-preload"
                );


            showPageContent();

            return;

        }


        /*
         * 한 번만 사용
         */
        sessionStorage.removeItem(
            STORAGE_KEY
        );


        /*
         * 세로 4박스 OUT
         */
        await playOut();


        /*
         * OUT이 끝난 뒤
         * Typewriter + Fade Up
         */
        showPageContent();


        isTransitioning =
            false;

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

        document
            .querySelectorAll(
                LINK_SELECTOR
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        handleLinkClick
                    );

                }
            );


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
