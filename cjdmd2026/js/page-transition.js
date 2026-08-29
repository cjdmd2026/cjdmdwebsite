(() => {
    "use strict";


    /* ========================================
       기본 설정
    ======================================== */

    const LINK_SELECTOR = "[page-transition]";
    const HEADER_SELECTOR = ".header";

    const STORAGE_KEY = "stamp-page-transition";


    /* Header 올라가는 시간 */
    const HEADER_LEAVE_DURATION = 450;

    /* 흰 배경이 덮이는 시간 */
    const COVER_DURATION = 500;

    /* Header 내려오는 시간 */
    const HEADER_ENTER_DURATION = 800;


    /*
     * 중복 클릭 방지
     */
    let isTransitioning = false;



    /* ========================================
       Style
    ======================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        /* ==============================
           페이지 전환 Cover
        ============================== */

        .page-transition-cover {
            position: fixed;
            inset: 0;

            width: 100vw;
            height: 100dvh;

            background: #f2f2f2;

            opacity: 0;

            z-index: 999999;

            pointer-events: auto;

            transition:
                opacity
                ${COVER_DURATION}ms
                ease;
        }


        .page-transition-cover.is-covering {
            opacity: 1;
        }


        /*
         * 새 페이지에서는
         * 처음부터 완전히 덮인 상태
         */
        .page-transition-cover.is-entering {
            opacity: 1;

            transition: none;
        }



        /* ==============================
           Header 올라가기
        ============================== */

        .header.page-transition-header-leave {
            top: calc(
                0px
                -
                var(--header-height)
                -
                2px
            );

            opacity: 0;

            transition:
                top
                ${HEADER_LEAVE_DURATION}ms
                cubic-bezier(.65, 0, .35, 1),

                opacity
                ${HEADER_LEAVE_DURATION}ms
                ease;
        }



        /* ==============================
           새 페이지 Header 초기 상태
        ============================== */

        .header.page-transition-header-enter {
            top: calc(
                0px
                -
                var(--header-height)
                -
                2px
            );

            opacity: 0;

            transition: none;
        }



        /* ==============================
           Header 내려오기
        ============================== */

        .header.page-transition-header-enter.is-show {
            top: 0;

            opacity: 1;

            transition:
                top
                ${HEADER_ENTER_DURATION}ms
                cubic-bezier(.22, 1, .36, 1),

                opacity
                ${HEADER_ENTER_DURATION}ms
                ease;
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

            .page-transition-cover,
            .header.page-transition-header-leave,
            .header.page-transition-header-enter.is-show,
            .page-enter-up {

                transition-duration:
                    1ms !important;

            }

        }

    `;


    document.head.appendChild(
        style
    );



    /* ========================================
       Cover 생성
    ======================================== */

    function createCover(
        entering = false
    ) {

        const cover =
            document.createElement(
                "div"
            );


        cover.className =
            "page-transition-cover";


        if (entering) {

            cover.classList.add(
                "is-entering"
            );

        }


        cover.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.appendChild(
            cover
        );


        return cover;

    }



    /* ========================================
       현재 페이지 퇴장
    ======================================== */

    function leavePage(
        href
    ) {

        if (isTransitioning) {
            return;
        }


        isTransitioning =
            true;


        const header =
            document.querySelector(
                HEADER_SELECTOR
            );



        /* --------------------------------
           1. Header 올라가기
        -------------------------------- */

        if (header) {

            header.classList.add(
                "page-transition-header-leave"
            );

        }



        /* --------------------------------
           2. Header 퇴장 후 Cover 시작
        -------------------------------- */

        window.setTimeout(

            () => {

                const cover =
                    createCover(false);


                let moved =
                    false;



                /* --------------------------------
                   실제 페이지 이동
                -------------------------------- */

                const movePage =
                    () => {

                        if (moved) {
                            return;
                        }


                        moved =
                            true;


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

                    };



                /* --------------------------------
                   Cover Fade 완료 후 이동
                -------------------------------- */

                cover.addEventListener(

                    "transitionend",

                    event => {

                        if (
                            event.propertyName
                            ===
                            "opacity"
                        ) {

                            movePage();

                        }

                    },

                    {
                        once: true
                    }

                );



                /* --------------------------------
                   Fade 시작
                -------------------------------- */

                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            () => {

                                cover
                                    .classList
                                    .add(
                                        "is-covering"
                                    );

                            }
                        );

                    }
                );



                /*
                 * transitionend가
                 * 발생하지 않을 경우 안전장치
                 */

                window.setTimeout(

                    movePage,

                    COVER_DURATION
                    +
                    100

                );

            },

            HEADER_LEAVE_DURATION

        );

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
         * 새 탭,
         * Ctrl / Shift / Alt 클릭 등은
         * 기존 브라우저 동작 유지
         */

        if (
            event.defaultPrevented
            ||
            event.button !== 0
            ||
            event.metaKey
            ||
            event.ctrlKey
            ||
            event.shiftKey
            ||
            event.altKey
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
            target !== "_self"
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
         * 현재 페이지 링크 클릭
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

    function enterPage() {

        const shouldEnter =

            sessionStorage.getItem(
                STORAGE_KEY
            )

            ===

            "1";



        /* --------------------------------
           직접 접속 / 새로고침
        -------------------------------- */

        if (!shouldEnter) {

            /*
             * Stamp 없이
             * 콘텐츠 등장 애니메이션만 실행
             */

            showPageContent();

            return;

        }



        /*
         * 새로고침 시
         * Stamp 반복 방지
         */

        sessionStorage.removeItem(
            STORAGE_KEY
        );



        const header =
            document.querySelector(
                HEADER_SELECTOR
            );



        /* --------------------------------
           1. Header 위쪽에 숨김
        -------------------------------- */

        if (header) {

            header.classList.add(
                "page-transition-header-enter"
            );

        }



        /* --------------------------------
           2. 흰색 Cover 생성
        -------------------------------- */

        const cover =
            createCover(true);



        /* --------------------------------
           3. Stamp 설정
        -------------------------------- */

        cover.setAttribute(
            "stamp",
            ""
        );


        cover.setAttribute(
            "stamp-trigger",
            "manual"
        );


        cover.setAttribute(
            "stamp-invert",
            ""
        );

        cover.setAttribute(
            "stamp-sound",
            ""
        );
        cover.setAttribute(
            "stamp-sound-volume",
            "0.7"
        );



        /* --------------------------------
           4. 새 페이지 표시
        -------------------------------- */

        /*
         * Cover가 위에 있기 때문에
         * body를 표시해도 화면은
         * 계속 흰색으로 보임
         */

        document.documentElement
            .classList
            .remove(
                "page-transition-preload"
            );



        /* --------------------------------
           StampEffect가 없는 경우
        -------------------------------- */

        if (
            !window.StampEffect
        ) {

            cover.remove();


            showHeader(
                header
            );


            showPageContent();


            return;

        }



        /* --------------------------------
           Stamp 등록
        -------------------------------- */

        window.StampEffect.init(
            cover
        );



        /* --------------------------------
           Stamp 완료
        -------------------------------- */

        cover.addEventListener(

            "stampcomplete",

            () => {


                /*
                 * Cover 제거
                 */

                cover.remove();



                /*
                 * Header 등장
                 */

                showHeader(
                    header
                );



                /*
                 * 페이지 콘텐츠 등장
                 */

                showPageContent();

            },

            {
                once: true
            }

        );



        /* --------------------------------
           Stamp 즉시 시작
        -------------------------------- */

        requestAnimationFrame(
            () => {

                window.StampEffect.play(
                    cover,
                    true
                );

            }
        );

    }



    /* ========================================
       Header 등장
    ======================================== */

    function showHeader(
        header
    ) {

        if (!header) {
            return;
        }



        /*
         * transition:none인 초기 상태를
         * 브라우저가 먼저 인식하도록
         * 두 프레임 대기
         */

        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        header.classList.add(
                            "is-show"
                        );

                    }
                );

            }
        );



        /* --------------------------------
           Header 애니메이션 완료 후
           클래스 제거
        -------------------------------- */

        window.setTimeout(

            () => {

                header.classList.remove(
                    "page-transition-header-enter",
                    "is-show"
                );

            },

            HEADER_ENTER_DURATION
            +
            50

        );

    }



    /* ========================================
       페이지 콘텐츠 등장
    ======================================== */

    function showPageContent() {

        /* ==============================
           Manual Typewriter 전부 검색
        ============================== */

        const typewriters =
            document.querySelectorAll(
                '[typewriter-effect][typewriter-trigger="manual"]'
            );


        let typewriterIndex = 0;


        typewriters.forEach(
            el => {

                /*
                 * display:none 등으로
                 * 현재 화면에 보이지 않는 요소는 제외
                 */
                if (
                    el.offsetParent === null
                ) {
                    return;
                }


                /*
                 * TypewriterEffect가 없으면 제외
                 */
                if (
                    !window.TypewriterEffect
                ) {
                    return;
                }


                window.setTimeout(
                    () => {

                        window.TypewriterEffect.play(
                            el
                        );

                    },

                    typewriterIndex * 180
                );


                typewriterIndex++;

            }
        );



        /* ==============================
           버튼 / 검색창 Fade Up
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

                /*
                 * 현재 화면에 보이지 않는 요소는 제외
                 */
                if (
                    el.offsetParent === null
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
                    index * 100
                );

            }
        );

    }



    /* ========================================
       Boot
    ======================================== */

    function boot() {


        /* --------------------------------
           NAV 링크 등록
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
                once: true
            }

        );

    }


    else {

        boot();

    }

})();