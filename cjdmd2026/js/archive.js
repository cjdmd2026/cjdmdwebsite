// 참여 학생 이름을 연도별 배열에 입력하세요. 예: ["이름1", "이름2"]
const STUDENTS_BY_YEAR = {
    "2021": ["김수연", "김해지", "김현주", "김현주", "김홍비", "남현정", "유채은", "이수", "이정민", "이현지", "임나영", "전보경", "조수빈", "조해지"],
    "2022": ["곽은지", "김남주", "김보연", "김보영", "김하나", "도민지", "박진슬", "박혜빈", "방미선", "방지우", "심지영", "안신영", "염윤지", "오예록", "오주희", "윤가영", "이유진", "이지은", "이효영", "조예림", "최서영", "하주희", "홍주연", "황수영"],    "2023": ["강서윤", "금윤서", "김민지", "김민채", "김윤아", "김윤희", "김정우", "김준호", "김혜인", "민서하", "백선혜", "변민섭", "신유진", "안성준", "안현정", "오소영", "윤선민", "이규민", "이서현", "이수민", "이시윤", "이지민", "이지선", "이지은", "이채은", "이현수", "임경용", "임지원", "장소희", "정주연", "조수아", "차은지", "최지수", "하예원", "하지원", "황인소"],
    "2024": ["김건우", "김나현", "김동경", "김무경", "김미성", "김채린", "김희진", "박동현", "박소이", "소수화", "손성민", "손유진", "양시원", "윤동혁", "이강현", "이다결", "이상훈", "이지민", "정이봄", "정진서", "조상윤", "최빛나", "홍유리", "홍자현"],
    "2025": ["강유림", "고현희", "곽초은", "권용우", "김도희", "김루나", "김민정", "김보미", "김선정", "김윤주", "김지수", "김현지", "김현진", "나원호", "노채린", "민유진", "박기연", "박미소", "박서희", "박순후", "박지수", "반상우", "백진주", "서동현", "손예진", "양윤보", "오우진", "오효진", "왕뢰이저", "유은비", "윤정원", "이새연", "이소현", "이연우", "이주연", "이채민", "이채현", "이현서", "임희원", "정예원", "정유민", "조범규", "조서영", "조예리", "최서윤", "최희선", "황서진", "황지원"],
    "2026": ["고비주", "권민성", "김다현", "김도연", "김민재", "김성은", "김주연", "김지유", "김지유", "김지윤", "김하원", "김혜진", "남나영", "노민영", "민지호", "박윤아", "박윤지", "서연우", "손예진", "송승빈", "송유진", "안나경", "유혜진", "윤지원", "윤태균", "이고은", "이나영", "임종원", "조우성", "조은교", "주보민", "주예진", "함대연"]
};

const DEFAULT_STUDENT_YEAR = "2026";

function renderStudents(container, year) {
    if (!container) return;
    const entries = STUDENTS_BY_YEAR[year];
    const names = Array.isArray(entries)
        ? entries.filter(name => typeof name === "string" && name.trim()).map(name => name.trim())
        : [];
    const fragment = document.createDocumentFragment();
    names.forEach(name => {
        const item = document.createElement("span");
        item.className = "student-name";
        item.setAttribute("role", "listitem");
        item.textContent = name;
        fragment.append(item);
    });
    container.replaceChildren(fragment);
    container.setAttribute("role", "list");
    container.setAttribute("aria-label", year ? `${year}년 참여 학생` : "참여 학생");
    container.dataset.year = year || "";
    container.hidden = names.length === 0;
    container.closest(".explanation")?.classList.toggle("has-students", names.length > 0);
}

document.addEventListener("DOMContentLoaded", () => {
    initHistoryExplanation();
    initTwoStepScroll();
    // Scroll-linked movement is handled by initExplanationArchiveFade().
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

    const studentList = explanation?.querySelector(".student");

    function getStudentYear(card) {
        return card.dataset.year?.trim() ||
            card.closest(".history-item")?.querySelector(".history-year")?.textContent.trim() || null;
    }


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
        "디미디의 흔적";

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
        140;

    const ENTER_DURATION =
        260;

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

    let pendingStudentYear = null;
    let currentStudentYear = DEFAULT_STUDENT_YEAR;
    let studentAnimation = null;
    renderStudents(studentList, currentStudentYear);


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

        animations.push(animateStudents(1, 0, LEAVE_DURATION));


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

        animations.push(animateStudents(0, 1, ENTER_DURATION));


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

    function animateStudents(from, to, duration) {
        if (!studentList || studentList.hidden) return Promise.resolve();
        studentAnimation?.cancel();
        studentAnimation = studentList.animate([{ opacity: from }, { opacity: to }], {
            duration,
            easing: "ease-out",
            fill: "forwards"
        });
        return studentAnimation.finished.catch(() => {});
    }

    function setContent(
        nextTitle,
        nextDescription,
        nextStudentYear
    ) {

        title.innerHTML =
            nextTitle;


        renderDescriptionLines(
            nextDescription
        );

        renderStudents(studentList, nextStudentYear);
        currentStudentYear = nextStudentYear;


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
        nextHistoryMode = null,
        nextStudentYear = DEFAULT_STUDENT_YEAR
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
            nextStudentYear === currentStudentYear &&
            (nextHistoryMode === null || nextHistoryMode === explanation.classList.contains("is-history-section")) &&
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

            pendingStudentYear = nextStudentYear;

            return;

        }


        isAnimating =
            true;


        await playLeave();

        // 텍스트가 가려진 동안 도착한 요청은 최신 카드로 바로 교체한다.
        if (pendingTitle !== null) {
            nextTitle = pendingTitle;
            nextDescription = pendingDescription;
            nextHistoryMode = pendingHistoryMode;
            nextStudentYear = pendingStudentYear;
            pendingTitle = null;
            pendingDescription = null;
            pendingHistoryMode = null;
            pendingStudentYear = null;
        }


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
            nextDescription,
            nextStudentYear
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

            const queuedStudentYear = pendingStudentYear;


            pendingTitle =
                null;

            pendingDescription =
                null;

            pendingHistoryMode =
                null;

            pendingStudentYear = null;


            if (
                queuedTitle !== currentTitle ||
                queuedDescription !== currentDescription ||
                queuedStudentYear !== currentStudentYear ||
                (queuedHistoryMode !== null && queuedHistoryMode !== explanation.classList.contains("is-history-section"))
            ) {

                changeExplanation(
                    queuedTitle,
                    queuedDescription,
                    queuedHistoryMode,
                    queuedStudentYear
                );

            }

        }

    }


    function restoreExplanation() {

        /*
         * 카드 사이의 여백에서도 마지막 카드 정보를 유지한다.
         * 기본 설명 복귀는 historyObserver의 구간 이탈 처리에서 맡는다.
         */
        if (
            isHistorySectionActive
        ) {
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
                        isHistorySectionActive,
                        getStudentYear(card)
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
                        isHistorySectionActive,
                        getStudentYear(card)
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
                                        true,
                                        getStudentYear(hoveredHistoryCard)
                                    );

                                    return;

                                }


                                changeExplanation(
                                    historySectionTitle,
                                    historySectionDescription,
                                    true,
                                    null
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
            ".history .history-item"
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
   - history 이후 스크롤 진행률에 맞춰 이동하며 사라짐
   - sticky가 부모 끝에 닿기 전에 fade 완료
========================================================= */

function initExplanationArchiveFade() {
    const explanation = document.querySelector(".hero .explanation");
    const parent = explanation?.closest(".hero .card");
    const history = document.querySelector(".history");
    if (!explanation || !parent || !history) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
        frame = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const stickyTop = parseFloat(getComputedStyle(explanation).top) || 0;
        const height = explanation.offsetHeight;
        const parentBottom = parent.getBoundingClientRect().bottom + y;
        const historyTop = history.getBoundingClientRect().top + y;
        const travel = reducedMotion.matches ? 0 : Math.min(40, vh * 0.04);

        // Finish before the sticky box reaches its parent's bottom edge.
        const fadeEnd = Math.max(1, parentBottom - stickyTop - height - travel - 16);
        const fadeStart = Math.max(historyTop, fadeEnd - vh * 0.25 );
        const progress = Math.max(0, Math.min(1,
            (y - fadeStart) / Math.max(1, fadeEnd - fadeStart)
        ));
        const eased = progress * progress * (3 - 2 * progress);

        explanation.style.setProperty("--explanation-opacity", String(1 - eased));
        explanation.style.transform = `translate3d(0, ${travel * progress}px, 0)`;
        explanation.classList.toggle("is-archive-hidden", progress >= 1);
    }

    function schedule() {
        if (!frame) frame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    reducedMotion.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(explanation);
    observer.observe(parent);
    update();
}


/* =========================================================
   6. Floating Outline Background
   Append this block after the existing archive functions.
========================================================= */
;(() => {
    "use strict";

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
        let lastTime = null;
        let elapsed = 0;
        let nextCollisionCheck = 0;
        let nextMerge = 0;
        const transitionActive = () => document.documentElement.matches(
            '.page-transition-preload, .page-transition-active'
        );

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
            if (!frame) frame = requestAnimationFrame(tick);
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
            if (!host.isConnected || document.hidden || (reducedMotion.matches && !merges.size) || transitionActive()) {
                lastTime = null;
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
            if (!reducedMotion.matches || merges.size) frame = requestAnimationFrame(tick);
        }

        function syncMotion() {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            lastTime = null;
            cancelDrag();
            // Keep the outline field still while the page wave uses the frame budget.
            if (transitionActive()) {
                host.dataset.motion = 'paused';
                return;
            }
            merges.forEach(merge => finishMerge(merge, false));
            render();
            host.dataset.motion = 'paused';
            if (!document.hidden && !reducedMotion.matches && host.isConnected) {
                host.dataset.motion = 'running';
                frame = requestAnimationFrame(tick);
            }
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
        window.addEventListener("scroll", () => {
            if (activeDrag) moveDrag(activeDrag.clientX, activeDrag.clientY);
            else if (reducedMotion.matches) render();
        }, { passive: true });
        window.addEventListener("pagehide", () => {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            lastTime = null;
            cancelDrag();
            merges.forEach(merge => finishMerge(merge, false));
        });
        window.addEventListener("pageshow", syncMotion);
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
