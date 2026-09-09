document.addEventListener("DOMContentLoaded", () => {
    initHistoryExplanation();
    initTwoStepScroll();
    initSmoothStickyExplanation();
    initArchiveCardReveal();
    initHistoryCardReveal();
    initExplanationArchiveFade();
});


/* =========================================================
   Smooth Sticky Explanation
   - sticky가 붙고 떨어질 때 생기는 딱딱한 느낌을 완화
   - CSS의 실제 top 값을 자동으로 읽음
========================================================= */

function initSmoothStickyExplanation() {

    const explanation =
        document.querySelector(
            ".hero .explanation"
        );

    const parent =
        explanation?.closest(
            ".hero .card"
        );


    if (
        !explanation ||
        !parent
    ) {
        return;
    }


    /* =====================================================
       설정
    ===================================================== */

    /*
     * sticky 진입 / 이탈을 부드럽게 처리할 범위
     */
    const SOFT_ZONE =
        200;


    /*
     * 값이 작을수록 더 느리고 부드럽게 따라옴.
     * 0.08 ~ 0.18 정도 추천.
     */
    const FOLLOW =
        0.01;


    /*
     * 관성으로 밀릴 수 있는 최대 거리.
     */
    const MAX_OFFSET =
        42;


    /*
     * 스크롤 한 프레임의 이동량을
     * 시각적인 관성 값으로 변환하는 배수.
     */
    const VELOCITY_POWER =
        4.2;


    let currentOffset =
        0;

    let previousRawTop =
        null;

    let rafId =
        null;


    explanation.style.willChange =
        "transform";


    /* =====================================================
       transform 영향을 제외한 원래 sticky 위치 측정
    ===================================================== */

    function getRawRect() {

        const previousTransform =
            explanation.style.transform;


        explanation.style.transform =
            "none";


        const rect =
            explanation.getBoundingClientRect();


        explanation.style.transform =
            previousTransform;


        return rect;

    }


    /* =====================================================
       Animation
    ===================================================== */

    function update() {

        const rect =
            getRawRect();


        const parentRect =
            parent.getBoundingClientRect();


        const computed =
            getComputedStyle(
                explanation
            );


        const stickyTop =
            parseFloat(
                computed.top
            ) || 0;


        const rawTop =
            rect.top;


        if (
            previousRawTop ===
            null
        ) {

            previousRawTop =
                rawTop;

        }


        /*
         * sticky 위치와 현재 요소 위치의 거리
         */
        const stickyDistance =
            rawTop -
            stickyTop;


        /*
         * 부모의 하단이 sticky 요소를 밀어내기까지 남은 거리
         */
        const bottomDistance =
            parentRect.bottom -
            (
                stickyTop +
                rect.height
            );


        /*
         * sticky에 붙기 직전
         */
        const nearAttach =
            stickyDistance >= 0 &&
            stickyDistance <=
                SOFT_ZONE;


        /*
         * sticky로 붙어있는 상태
         */
        const isPinned =
            Math.abs(
                stickyDistance
            ) <= 2 &&
            bottomDistance > 0;


        /*
         * 부모 끝에서 sticky가 풀리기 직전 / 직후
         */
        const nearDetach =
            bottomDistance <=
                SOFT_ZONE &&
            bottomDistance >=
                -SOFT_ZONE;


        const isSoftZone =
            nearAttach ||
            isPinned ||
            nearDetach;


        /*
         * 이번 프레임에 sticky의 원래 위치가 얼마나 움직였는지
         */
        const velocity =
            rawTop -
            previousRawTop;


        previousRawTop =
            rawTop;


        let targetOffset =
            0;


        if (
            isSoftZone
        ) {

            /*
             * 위로 움직이면 약간 아래에서 따라오고,
             * 아래로 움직이면 약간 위에서 따라오면서
             * 붙고 떨어지는 순간의 속도 변화를 완충.
             */
            targetOffset =
                Math.max(
                    -MAX_OFFSET,
                    Math.min(
                        MAX_OFFSET,
                        -velocity *
                        VELOCITY_POWER
                    )
                );

        }


        /*
         * 관성 보간
         */
        currentOffset +=
            (
                targetOffset -
                currentOffset
            ) *
            FOLLOW;


        /*
         * 아주 작은 값은 0으로 정리
         */
        if (
            Math.abs(
                currentOffset
            ) <
            0.01
        ) {

            currentOffset =
                0;

        }


        explanation.style.transform =
            `translate3d(
                0,
                ${currentOffset}px,
                0
            )`;


        rafId =
            requestAnimationFrame(
                update
            );

    }


    rafId =
        requestAnimationFrame(
            update
        );


    /*
     * 페이지가 제거될 때를 위한 정리용 API
     */
    explanation._smoothStickyDestroy =
        () => {

            if (
                rafId
            ) {

                cancelAnimationFrame(
                    rafId
                );

            }


            explanation.style.transform =
                "";

            explanation.style.willChange =
                "";

        };

}


/* =========================================================
   1. History Hover → Explanation
========================================================= */

function initHistoryExplanation() {

    const explanation =
        document.querySelector(
            ".hero .explanation"
        );

    const title =
        explanation?.querySelector(
            "h2"
        );

    const description =
        explanation?.querySelector(
            "p"
        );

    const historyCards =
        document.querySelectorAll(
            ".history .history-card"
        );


    if (
        !explanation ||
        !title ||
        !description ||
        historyCards.length === 0
    ) {
        return;
    }


    /* =====================================================
       기본 문구 저장
    ===================================================== */

    const defaultTitle =
        title.innerHTML;

    const defaultDescription =
        description.innerHTML;


    /*
     * history-card 구간에 들어왔을 때 사용할 기본 문구
     */
    const historySectionTitle =
        "과거 전시";

    const historySectionDescription =
        `서로 다른 시선과 고민이 모여 만들어진 지난 전시의 기록을 돌아봅니다.
        <br>
        각자의 방식으로 쌓아온 시간과 결과들은 해마다 새로운 모습으로 이어졌고,
        <br>
        그 안에는 우리 학과가 지나온 다양한 순간들이 담겨 있습니다.`;


    /* =====================================================
       제목용 Clip Mask 생성
    ===================================================== */

    const titleMask =
        document.createElement(
            "div"
        );

    titleMask.className =
        "history-title-mask";


    title.parentNode.insertBefore(
        titleMask,
        title
    );

    titleMask.appendChild(
        title
    );


    /* =====================================================
       Style
       - animation 관련 스타일은 archive_02.css에서 관리
       - JS는 DOM wrapper와 class 상태만 제어
    ===================================================== */


    /* =====================================================
       Animation Config
    ===================================================== */

    const LEAVE_DURATION =
        540;

    const ENTER_DURATION =
        560;

    const LINE_STAGGER =
        65;


    let isAnimating =
        false;

    let pendingTitle =
        null;

    let pendingDescription =
        null;

    let pendingHistoryMode =
        null;


    let currentTitle =
        defaultTitle;

    let currentDescription =
        defaultDescription;


    /*
     * history 구간 상태
     */
    let isHistorySectionActive =
        false;

    let hoveredHistoryCard =
        null;


    /* =====================================================
       Description을 <br> 기준으로
       line-mask > line 구조로 생성
    ===================================================== */

    function renderDescriptionLines(
        html
    ) {

        const lines =
            html.split(
                /<br\s*\/?>/gi
            );


        description.innerHTML =
            "";


        lines.forEach(
            lineHtml => {

                const mask =
                    document.createElement(
                        "span"
                    );

                mask.className =
                    "history-description-line-mask";


                const line =
                    document.createElement(
                        "span"
                    );

                line.className =
                    "history-description-line";


                /*
                 * &emsp; 등 HTML 유지
                 */
                line.innerHTML =
                    lineHtml.trim();


                mask.appendChild(
                    line
                );

                description.appendChild(
                    mask
                );

            }
        );

    }


    renderDescriptionLines(
        defaultDescription
    );


    function getDescriptionLines() {

        return Array.from(
            description.querySelectorAll(
                ".history-description-line"
            )
        );

    }


    /* =====================================================
       Animation Helper
    ===================================================== */

    function animateElement(
        element,
        keyframes,
        options
    ) {

        return element
            .animate(
                keyframes,
                options
            )
            .finished
            .catch(
                () => {}
            );

    }


    /* =====================================================
       Leave
       h2 → line1 → line2 → line3...
    ===================================================== */

    async function playLeave() {

        const lines =
            getDescriptionLines();


        const animations =
            [];


        /*
         * 제목:
         * titleMask 밖으로 내려가며 사라짐.
         */
        animations.push(
            animateElement(
                title,
                [
                    {
                        transform:
                            "translate3d(0, 0, 0)"
                    },

                    {
                        transform:
                            "translate3d(0, 110%, 0)"
                    }
                ],
                {
                    duration:
                        LEAVE_DURATION,

                    delay:
                        0,

                    easing:
                        "cubic-bezier(.55, 0, .35, 1)",

                    fill:
                        "forwards"
                }
            )
        );


        /*
         * 각 줄:
         * 자기 mask 아래로 내려가자마자 잘림.
         */
        lines.forEach(
            (
                line,
                index
            ) => {

                animations.push(
                    animateElement(
                        line,
                        [
                            {
                                transform:
                                    "translate3d(0, 0, 0)"
                            },

                            {
                                transform:
                                    "translate3d(0, 110%, 0)"
                            }
                        ],
                        {
                            duration:
                                LEAVE_DURATION,

                            delay:
                                (
                                    index +
                                    1
                                ) *
                                LINE_STAGGER,

                            easing:
                                "cubic-bezier(.55, 0, .35, 1)",

                            fill:
                                "forwards"
                        }
                    )
                );

            }
        );


        await Promise.all(
            animations
        );

    }


    /* =====================================================
       Enter
       새 h2 → line1 → line2 → line3...
    ===================================================== */

    async function playEnter() {

        const lines =
            getDescriptionLines();


        /*
         * 모두 자기 mask 아래쪽에서 대기.
         * 그래서 화면에는 보이지 않음.
         */
        title.style.transform =
            "translate3d(0, 110%, 0)";


        lines.forEach(
            line => {

                line.style.transform =
                    "translate3d(0, 110%, 0)";

            }
        );


        void explanation.offsetWidth;


        const animations =
            [];


        animations.push(
            animateElement(
                title,
                [
                    {
                        transform:
                            "translate3d(0, 110%, 0)"
                    },

                    {
                        transform:
                            "translate3d(0, 0, 0)"
                    }
                ],
                {
                    duration:
                        ENTER_DURATION,

                    delay:
                        0,

                    easing:
                        "cubic-bezier(.18, .76, .22, 1)",

                    fill:
                        "forwards"
                }
            )
        );


        lines.forEach(
            (
                line,
                index
            ) => {

                animations.push(
                    animateElement(
                        line,
                        [
                            {
                                transform:
                                    "translate3d(0, 110%, 0)"
                            },

                            {
                                transform:
                                    "translate3d(0, 0, 0)"
                            }
                        ],
                        {
                            duration:
                                ENTER_DURATION,

                            delay:
                                (
                                    index +
                                    1
                                ) *
                                LINE_STAGGER,

                            easing:
                                "cubic-bezier(.18, .76, .22, 1)",

                            fill:
                                "forwards"
                        }
                    )
                );

            }
        );


        await Promise.all(
            animations
        );


        /*
         * 최종 상태 정리
         */
        title.style.transform =
            "translate3d(0, 0, 0)";


        lines.forEach(
            line => {

                line.style.transform =
                    "translate3d(0, 0, 0)";

            }
        );

    }


    /* =====================================================
       Content Update
    ===================================================== */

    function setContent(
        nextTitle,
        nextDescription
    ) {

        title.innerHTML =
            nextTitle;


        renderDescriptionLines(
            nextDescription
        );


        currentTitle =
            nextTitle;

        currentDescription =
            nextDescription;

    }


    /* =====================================================
       Change
    ===================================================== */

    async function changeExplanation(
        nextTitle,
        nextDescription,
        nextHistoryMode = null
    ) {

        nextTitle =
            nextTitle ||
            defaultTitle;

        nextDescription =
            nextDescription ||
            defaultDescription;


        if (
            nextTitle === currentTitle &&
            nextDescription === currentDescription &&
            !isAnimating
        ) {
            return;
        }


        if (
            isAnimating
        ) {

            pendingTitle =
                nextTitle;

            pendingDescription =
                nextDescription;

            pendingHistoryMode =
                nextHistoryMode;

            return;

        }


        isAnimating =
            true;


        await playLeave();


        /*
         * 기존 텍스트가 완전히 아래로 내려가
         * 마스크 밖에서 보이지 않는 순간에만
         * history 모드의 글자 크기를 즉시 변경.
         *
         * transition이 없기 때문에
         * 사용자는 크기가 바뀌는 장면을 보지 못함.
         */
        if (
            nextHistoryMode === true
        ) {

            explanation.classList.add(
                "is-history-section"
            );

        }
        else if (
            nextHistoryMode === false
        ) {

            explanation.classList.remove(
                "is-history-section"
            );

        }


        setContent(
            nextTitle,
            nextDescription
        );


        await playEnter();


        isAnimating =
            false;


        if (
            pendingTitle !== null
        ) {

            const queuedTitle =
                pendingTitle;

            const queuedDescription =
                pendingDescription;

            const queuedHistoryMode =
                pendingHistoryMode;


            pendingTitle =
                null;

            pendingDescription =
                null;

            pendingHistoryMode =
                null;


            if (
                queuedTitle !== currentTitle ||
                queuedDescription !== currentDescription
            ) {

                changeExplanation(
                    queuedTitle,
                    queuedDescription,
                    queuedHistoryMode
                );

            }

        }

    }


    function restoreExplanation() {

        /*
         * history 구간 안이라면
         * 원래 첫 문구가 아니라 "과거 전시" 문구로 복귀.
         */
        if (
            isHistorySectionActive
        ) {

            changeExplanation(
                historySectionTitle,
                historySectionDescription,
                true
            );

            return;

        }


        changeExplanation(
            defaultTitle,
            defaultDescription,
            false
        );

    }


    /* =====================================================
       Hover / Focus
    ===================================================== */

    historyCards.forEach(
        card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    hoveredHistoryCard =
                        card;

                    changeExplanation(
                        card.dataset.title,
                        card.dataset.description,
                        isHistorySectionActive
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    if (
                        hoveredHistoryCard ===
                        card
                    ) {

                        hoveredHistoryCard =
                            null;

                    }


                    restoreExplanation();

                }
            );


            card.setAttribute(
                "tabindex",
                "0"
            );


            card.addEventListener(
                "focus",
                () => {

                    hoveredHistoryCard =
                        card;

                    changeExplanation(
                        card.dataset.title,
                        card.dataset.description,
                        isHistorySectionActive
                    );

                }
            );


            card.addEventListener(
                "blur",
                () => {

                    if (
                        hoveredHistoryCard ===
                        card
                    ) {

                        hoveredHistoryCard =
                            null;

                    }


                    restoreExplanation();

                }
            );

        }
    );


    /* =====================================================
       History 구간 진입 / 이탈

       이번에는 오직 history-card 묶음(card-wrap)이
       실제 화면 안에 들어왔을 때만 활성화.
    ===================================================== */

    const historySection =
        document.querySelector(
            ".history"
        );

    const historyCardWrap =
        historySection?.querySelector(
            ".card-wrap"
        );


    if (
        historySection &&
        historyCardWrap
    ) {

        let historyModeActive =
            false;


        const historyObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            /*
                             * card-wrap이 실제 viewport 안에
                             * 들어온 경우에만 과거 전시 모드 활성화.
                             */
                            if (
                                entry.isIntersecting
                            ) {

                                if (
                                    historyModeActive
                                ) {
                                    return;
                                }


                                historyModeActive =
                                    true;

                                isHistorySectionActive =
                                    true;


                                /*
                                 * 카드 hover 중이면
                                 * 해당 카드의 문구를 유지.
                                 */
                                if (
                                    hoveredHistoryCard
                                ) {

                                    changeExplanation(
                                        hoveredHistoryCard.dataset.title,
                                        hoveredHistoryCard.dataset.description,
                                        true
                                    );

                                    return;

                                }


                                changeExplanation(
                                    historySectionTitle,
                                    historySectionDescription,
                                    true
                                );


                                return;

                            }


                            /*
                             * card-wrap이 viewport에서 벗어나면
                             * 항상 원래 hero 설명으로 복귀.
                             */
                            if (
                                historyModeActive
                            ) {

                                historyModeActive =
                                    false;

                                isHistorySectionActive =
                                    false;

                                hoveredHistoryCard =
                                    null;


                                changeExplanation(
                                    defaultTitle,
                                    defaultDescription,
                                    false
                                );

                            }

                        }
                    );

                },
                {
                    /*
                     * card-wrap의 20% 이상이
                     * 화면에 들어왔을 때 활성화.
                     */
                    threshold:
                        0.20,

                    /*
                     * 선행 감지 없음.
                     * 실제 viewport 안에서만 판정.
                     */
                    rootMargin:
                        "0px"
                }
            );


        historyObserver.observe(
            historyCardWrap
        );

    }
    }




/* =========================================================
   2. History Scroll Lock
========================================================= */

function initTwoStepScroll() {

    /* =====================================================
       0 → 100vh → 200vh

       0vh   : Hero
       100vh : History
       200vh : Archive 시작

       두 번의 100vh 이동 후 일반 Lenis 스크롤로 전환.
    ===================================================== */

    const STEP_COUNT =
        2;

    const STEP_DURATION =
        2.0;

    const WHEEL_DELTA_THRESHOLD =
        6;

    const POSITION_TOLERANCE =
        10;


    let isAnimating =
        false;


    /* =====================================================
       Lenis 확인
    ===================================================== */

    function hasLenis() {

        return (
            typeof lenis !== "undefined" &&
            lenis &&
            typeof lenis.scrollTo === "function"
        );

    }


    /* =====================================================
       위치 계산
    ===================================================== */

    function getViewportHeight() {

        return window.innerHeight;

    }


    function getStepY(
        step
    ) {

        return (
            getViewportHeight() *
            step
        );

    }


    function getStepEndY() {

        return getStepY(
            STEP_COUNT
        );

    }


    function getNearestStep() {

        const vh =
            getViewportHeight();


        return Math.max(
            0,
            Math.min(
                STEP_COUNT,
                Math.round(
                    window.scrollY /
                    vh
                )
            )
        );

    }


    /* =====================================================
       Step 이동
    ===================================================== */

    function scrollToStep(
        step
    ) {

        const safeStep =
            Math.max(
                0,
                Math.min(
                    STEP_COUNT,
                    step
                )
            );


        const target =
            getStepY(
                safeStep
            );


        isAnimating =
            true;


        let completed =
            false;


        function finish() {

            if (
                completed
            ) {
                return;
            }


            completed =
                true;

            isAnimating =
                false;

        }


        if (
            hasLenis()
        ) {

            lenis.scrollTo(
                target,
                {

                    duration:
                        STEP_DURATION,

                    easing:
                        t =>
                            1 -
                            Math.pow(
                                1 - t,
                                4
                            ),

                    lock:
                        true,

                    force:
                        true,

                    onComplete:
                        finish

                }
            );


            setTimeout(
                finish,
                STEP_DURATION *
                1000 +
                200
            );


            return;

        }


        window.scrollTo(
            {
                top:
                    target,

                behavior:
                    "smooth"
            }
        );


        setTimeout(
            finish,
            STEP_DURATION *
            1000
        );

    }


    /* =====================================================
       Wheel
    ===================================================== */

    function handleWheel(
        event
    ) {

        if (
            Math.abs(
                event.deltaY
            )
            <
            WHEEL_DELTA_THRESHOLD
        ) {
            return;
        }


        /*
         * 단계 이동 중에는 추가 입력 차단.
         */
        if (
            isAnimating
        ) {

            event.preventDefault();

            return;

        }


        const direction =
            event.deltaY > 0
                ? 1
                : -1;


        const currentY =
            window.scrollY;

        const stepEndY =
            getStepEndY();


        /* =================================================
           아래 방향
        ================================================= */

        if (
            direction > 0
        ) {

            /*
             * 이미 200vh 지점을 넘었다면
             * 여기부터는 기존 Lenis 일반 스크롤.
             */
            if (
                currentY >=
                stepEndY -
                POSITION_TOLERANCE
            ) {

                return;

            }


            /*
             * 0 → 100vh → 200vh
             */
            event.preventDefault();


            const currentStep =
                getNearestStep();


            scrollToStep(
                currentStep +
                1
            );


            return;

        }


        /* =================================================
           위 방향
           아래에서 다시 올라왔을 때도
           200vh → 100vh → 0 으로 대칭 이동
        ================================================= */

        if (
            direction < 0
        ) {

            /*
             * 200vh보다 훨씬 아래에 있을 때는
             * 일반 스크롤로 먼저 올라옴.
             */
            if (
                currentY >
                stepEndY +
                POSITION_TOLERANCE
            ) {

                return;

            }


            /*
             * 상단 0~200vh 구간에 들어오면
             * 다시 100vh 단위로 이동.
             */
            if (
                currentY >
                POSITION_TOLERANCE
            ) {

                event.preventDefault();


                const currentStep =
                    getNearestStep();


                scrollToStep(
                    currentStep -
                    1
                );

            }

        }

    }


    window.addEventListener(
        "wheel",
        handleWheel,
        {
            passive:
                false
        }
    );


    /* =====================================================
       Resize
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * 현재 0~200vh 구간 안에 있을 때만
             * viewport 높이 변경에 맞춰
             * 가장 가까운 단계로 위치 보정.
             */
            if (
                window.scrollY >
                getStepEndY() +
                POSITION_TOLERANCE
            ) {
                return;
            }


            const step =
                getNearestStep();


            window.scrollTo(
                0,
                getStepY(
                    step
                )
            );

        }
    );

}

/* =========================================================
   3. Archive Card Reveal
   - 화면에 들어오면 아래 → 위
   - 같은 화면 안의 카드들은 약간씩 순차 등장
   - 한 번 등장한 카드는 다시 숨기지 않음
========================================================= */

function initArchiveCardReveal() {

    const cards =
        document.querySelectorAll(
            ".archive-wrap .archive-box"
        );


    if (
        cards.length === 0
    ) {
        return;
    }


    /* =====================================================
       설정
    ===================================================== */

    /*
     * 카드별 등장 시간차
     */
    const STAGGER =
        70;


    /*
     * 너무 긴 delay가 생기지 않도록
     * 6개 단위로 반복
     */
    const STAGGER_GROUP =
        6;


    /*
     * 화면에 이 정도 들어오면 등장
     */
    const THRESHOLD =
        0.12;


    /*
     * 하단에서 약간 일찍 감지
     */
    const ROOT_MARGIN =
        "0px 0px -35px 0px";


    /* =====================================================
       카드별 delay 부여
    ===================================================== */

    cards.forEach(
        (
            card,
            index
        ) => {

            card.style.setProperty(
                "--reveal-delay",
                `${
                    (
                        index %
                        STAGGER_GROUP
                    ) *
                    STAGGER
                }ms`
            );

        }
    );


    /* =====================================================
       Observer
    ===================================================== */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target
                            .classList
                            .add(
                                "is-visible"
                            );


                        /*
                         * 최초 1회만 실행
                         */
                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold:
                    THRESHOLD,

                rootMargin:
                    ROOT_MARGIN
            }
        );


    cards.forEach(
        card => {

            observer.observe(
                card
            );

        }
    );

}

/* =========================================================
   4. History Card Reveal
   - 화면에 들어올 때마다 아래 → 위 + scale
   - 화면을 벗어나면 다시 아래로 내려가며 숨김
   - 재진입 시 다시 애니메이션
========================================================= */

function initHistoryCardReveal() {

    const cards =
        document.querySelectorAll(
            ".history .history-card"
        );


    if (
        cards.length === 0
    ) {
        return;
    }


    /* =====================================================
       설정
    ===================================================== */

    /*
     * 카드가 순차적으로 나타나는 시간차
     */
    const STAGGER =
        55;


    /*
     * 화면에 이 정도 들어오면 등장
     */
    const THRESHOLD =
        0.18;


    /*
     * 너무 끝에서 반응하지 않도록
     * 상/하단 감지 영역을 살짝 안쪽으로
     */
    const ROOT_MARGIN =
        "-4% 0px -4% 0px";


    /* =====================================================
       카드별 delay
    ===================================================== */

    cards.forEach(
        (
            card,
            index
        ) => {

            card.style.setProperty(
                "--history-reveal-delay",
                `${index * STAGGER}ms`
            );

        }
    );


    /* =====================================================
       Observer
    ===================================================== */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        const card =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            /*
                             * 등장할 때만 stagger 적용
                             */
                            card.style.setProperty(
                                "--history-current-delay",
                                card.style.getPropertyValue(
                                    "--history-reveal-delay"
                                )
                            );


                            card.classList.add(
                                "is-history-visible"
                            );

                        }
                        else {

                            /*
                             * 사라질 때는 즉시 반응하도록
                             * delay 제거
                             */
                            card.style.setProperty(
                                "--history-current-delay",
                                "0ms"
                            );


                            card.classList.remove(
                                "is-history-visible"
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    THRESHOLD,

                rootMargin:
                    ROOT_MARGIN
            }
        );


    cards.forEach(
        card => {

            observer.observe(
                card
            );

        }
    );

}

/* =========================================================
   5. Explanation Archive Fade
   - archive-wrap 진입 시 explanation 숨김
   - 다시 위로 올라오면 explanation 표시
========================================================= */

function initExplanationArchiveFade() {

    const explanation =
        document.querySelector(
            ".hero .explanation"
        );

    const archiveWrap =
        document.querySelector(
            ".archive-wrap"
        );


    if (
        !explanation ||
        !archiveWrap
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            explanation.classList.add(
                                "is-archive-hidden"
                            );

                        }
                        else {

                            explanation.classList.remove(
                                "is-archive-hidden"
                            );

                        }

                    }
                );

            },
            {
                /*
                 * archive-wrap이 화면에 아주 조금만 들어와도
                 * explanation이 사라지기 시작.
                 */
                threshold:
                    0.04,

                /*
                 * 화면 하단보다 살짝 늦게 감지해서
                 * history 구간에서는 explanation을 유지.
                 */
                rootMargin:
                    "0px 0px -6% 0px"
            }
        );


    observer.observe(
        archiveWrap
    );

}

