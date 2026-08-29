(() => {
    "use strict";


    // =========================================================
    // PROJECTS 데이터
    // =========================================================

    function getProjects() {

        if (
            !window.PROJECTS ||
            !Array.isArray(window.PROJECTS)
        ) {

            console.error(
                "PROJECTS 데이터를 찾을 수 없습니다. project-data.js 연결을 확인해주세요."
            );

            return [];

        }


        return window.PROJECTS;

    }



    function getProjectById(
        projectId
    ) {

        return getProjects().find(
            project =>
                String(project.id) ===
                String(projectId)
        );

    }



    // =========================================================
    // Category Label
    // =========================================================

    const CATEGORY_LABELS = {

        all:
            "ALL",

        health:
            "건강",

        education:
            "교육",

        environment:
            "환경",

        culture:
            "문화",

        leisure:
            "여가",

        welfare:
            "복지",

        life:
            "생활",

        XR:
            "생활",

        xr:
            "생활"

    };



    function getCategoryLabel(
        category
    ) {

        return (
            CATEGORY_LABELS[category]
            ||
            category
            ||
            ""
        );

    }



    // =========================================================
    // HTML 카드 ↔ project-data.js 연결
    //
    // Slide / Grid 순서는 HTML 순서를 그대로 사용.
    // =========================================================

    function bindProjectCards() {

        const cards =
            document.querySelectorAll(
                `
                #slideview .card[data-project-id],
                #gridview .card[data-project-id]
                `
            );


        cards.forEach(
            card => {

                const projectId =
                    card.dataset.projectId;


                const project =
                    getProjectById(
                        projectId
                    );


                if (!project) {

                    console.warn(
                        `프로젝트 데이터를 찾을 수 없습니다: ${projectId}`
                    );

                    return;

                }



                // =============================================
                // Category
                // =============================================

                if (project.category) {

                    card.dataset.category =
                        project.category;

                }



                // =============================================
                // Grid Image
                // =============================================

                const gridImage =
                    card.querySelector(
                        ".card-image"
                    );


                if (
                    gridImage &&
                    project.image
                ) {

                    gridImage.style.backgroundImage =
                        `url("${project.image}")`;

                }



                // =============================================
                // Slide Image
                // =============================================

                if (
                    card.closest(
                        "#slideview"
                    ) &&
                    project.image
                ) {

                    card.style.backgroundImage =
                        `url("${project.image}")`;

                }



                // =============================================
                // Grid Info
                // =============================================

                const category =
                    card.querySelector(
                        ".card-category"
                    );


                const title =
                    card.querySelector(
                        ".card-title"
                    );


                const members =
                    card.querySelector(
                        ".card-members"
                    );


                const description =
                    card.querySelector(
                        ".card-description"
                    );


                if (category) {

                    category.textContent =
                        getCategoryLabel(
                            project.category
                        );

                }


                if (title) {

                    title.textContent =
                        project.title;

                }


                if (members) {

                    members.textContent =
                        project.members.join(" / ");

                }


                if (description) {

                    description.textContent =
                        project.description;

                }

            }
        );

    }



    // =========================================================
    // Slide 프로젝트 정보 변경
    // =========================================================

    function updateSlideInfo(
        projectId,
        animate = false
    ) {

        const project =
            getProjectById(
                projectId
            );


        if (!project) {
            return;
        }



        const titleGroup =
            document.querySelector(
                ".title-section h1[typewriter-effect]"
            );


        const title =
            document.querySelector(
                ".project-title"
            );


        const worker =
            document.querySelector(
                ".worker"
            );


        const description =
            document.querySelector(
                ".slide-description p"
            );



        // =====================================================
        // 기존 Writer 중지
        // =====================================================

        if (
            animate &&
            window.TypewriterEffect
        ) {

            if (titleGroup) {

                window.TypewriterEffect.cancel(
                    titleGroup
                );

            }


            if (description) {

                window.TypewriterEffect.cancel(
                    description
                );

            }

        }



        // =====================================================
        // 프로젝트 정보 입력
        // =====================================================

        if (title) {

            title.textContent =
                project.title;

        }


        if (worker) {

            worker.textContent =
                project.members.join(" / ");

        }


        if (description) {

            description.textContent =
                project.description;

        }



        // =====================================================
        // Writer 다시 실행
        // =====================================================

        if (
            animate &&
            window.TypewriterEffect
        ) {

            requestAnimationFrame(
                () => {

                    if (titleGroup) {

                        window.TypewriterEffect.replay(
                            titleGroup
                        );

                    }


                    if (description) {

                        window.setTimeout(
                            () => {

                                window.TypewriterEffect.replay(
                                    description
                                );

                            },

                            120
                        );

                    }

                }
            );

        }

    }



    // =========================================================
    // Grid 제목
    // =========================================================

    function showGridTitle() {

        const titleGroup =
            document.querySelector(
                ".title-section h1[typewriter-effect]"
            );


        const title =
            document.querySelector(
                ".project-title"
            );


        const worker =
            document.querySelector(
                ".worker"
            );


        const description =
            document.querySelector(
                ".slide-description p[typewriter-effect]"
            );



        if (
            window.TypewriterEffect
        ) {

            if (titleGroup) {

                window.TypewriterEffect.cancel(
                    titleGroup
                );

            }


            if (description) {

                window.TypewriterEffect.cancel(
                    description
                );

            }

        }



        if (title) {

            title.textContent =
                "프로젝트";

        }


        if (worker) {

            worker.textContent =
                "";

        }



        /*
         * cancel() 이후 manual typewriter가
         * 숨겨지는 것을 방지
         */
        if (titleGroup) {

            titleGroup.classList.add(
                "is-typed"
            );


            titleGroup.dataset.typing =
                "false";


            titleGroup.dataset.typed =
                "true";

        }

    }



    // =========================================================
    // 초기화
    // =========================================================

    function initProjectPage() {

        bindProjectCards();



        // =====================================================
        // Slide
        // =====================================================

        const slideview =
            document.querySelector(
                "#slideview"
            );


        /*
         * querySelectorAll은 HTML 순서를 그대로 유지.
         */
        const cards =
            [
                ...document.querySelectorAll(
                    "#slideview .card[data-project-id]"
                )
            ];

            // =========================================================
            // 현재 검색 결과에 포함된 Slide 카드
            // =========================================================

            function getVisibleCards() {

                return cards.filter(
                    card =>
                        !card.hidden
                );

            }


        let currentIndex =
            0;


        let isScrolling =
            false;


        let isInitialViewSetup =
            true;

        

        // =========================================================
        // 검색 결과 변경 시 Slide 활성 카드 갱신
        // =========================================================

        document.addEventListener(
            "project-search-change",

            event => {

                const query =
                    event.detail?.query || "";


                const visibleIds =
                    event.detail?.visibleIds || [];


                // 검색어가 비어 있으면
                // 지금 보고 있는 프로젝트 그대로 유지
                if (query === "") {
                    return;
                }


                const visibleCards =
                    cards.filter(
                        card =>
                            visibleIds.includes(
                                card.dataset.projectId
                            )
                    );


                // 검색 결과가 없으면
                if (visibleCards.length === 0) {
                    return;
                }


                const currentCard =
                    cards[currentIndex];


                // 현재 카드가 검색 결과에 포함되어 있는지
                const currentIsVisible =
                    currentCard &&
                    visibleIds.includes(
                        currentCard.dataset.projectId
                    );


                /*
                * 현재 카드가 검색 결과라면 그대로 유지
                * 아니라면 첫 번째 검색 결과로 이동
                */
                const targetCard =
                    currentIsVisible
                        ? currentCard
                        : visibleCards[0];


                // 모든 active 해제
                cards.forEach(
                    card => {

                        card.classList.remove(
                            "is-active"
                        );

                    }
                );


                // 검색 결과 카드 활성화
                targetCard.classList.add(
                    "is-active"
                );


                // 전체 배열 기준 index 갱신
                currentIndex =
                    cards.indexOf(
                        targetCard
                    );


                // 텍스트도 검색 결과에 맞게 변경
                updateSlideInfo(
                    targetCard.dataset.projectId,
                    false
                );

            }
        );



        // =====================================================
        // 현재 Slide 정보
        // =====================================================

        function showCurrentSlideInfo(
            forceVisible = false
        ) {

            if (
                cards.length === 0
            ) {
                return;
            }


            const projectId =
                cards[currentIndex]
                    .dataset
                    .projectId;


            updateSlideInfo(
                projectId,
                false
            );


            /*
             * 최초 페이지 진입:
             * page-transition.js가 Writer 실행.
             */
            if (
                !forceVisible
            ) {
                return;
            }


            const titleGroup =
                document.querySelector(
                    ".title-section h1[typewriter-effect]"
                );


            const description =
                document.querySelector(
                    ".slide-description p[typewriter-effect]"
                );


            if (titleGroup) {

                titleGroup.classList.add(
                    "is-typed"
                );


                titleGroup.dataset.typing =
                    "false";


                titleGroup.dataset.typed =
                    "true";

            }


            if (description) {

                description.classList.add(
                    "is-typed"
                );


                description.dataset.typing =
                    "false";


                description.dataset.typed =
                    "true";

            }

        }



        // =====================================================
        // Slide 초기 상태
        // =====================================================

        if (
            cards.length > 0
        ) {

            const activeIndex =
                cards.findIndex(
                    card =>
                        card.classList.contains(
                            "is-active"
                        )
                );


            currentIndex =
                activeIndex >= 0
                    ?
                    activeIndex
                    :
                    0;


            cards.forEach(
                (
                    card,
                    index
                ) => {

                    card.classList.toggle(
                        "is-active",
                        index === currentIndex
                    );

                }
            );


            updateSlideInfo(
                cards[currentIndex]
                    .dataset
                    .projectId,

                false
            );

        }



        // =====================================================
        // View 전환
        // =====================================================

        const viewButtons =
            document.querySelectorAll(
                ".view-button"
            );


        const views = {

            grid:
                document.querySelector(
                    "#gridview"
                ),

            slide:
                document.querySelector(
                    "#slideview"
                )

        };



        function changeView(
            selectedView
        ) {

            Object.entries(
                views
            ).forEach(
                (
                    [
                        viewName,
                        viewElement
                    ]
                ) => {

                    if (!viewElement) {
                        return;
                    }


                    viewElement.hidden =
                        viewName !==
                        selectedView;

                }
            );


            viewButtons.forEach(
                button => {

                    button.hidden =
                        button.dataset.view ===
                        selectedView;

                }
            );


            if (
                selectedView ===
                "grid"
            ) {

                showGridTitle();

            }


            else if (
                selectedView ===
                "slide"
            ) {

                showCurrentSlideInfo(
                    !isInitialViewSetup
                );

            }

        }



        viewButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        changeView(
                            button.dataset.view
                        );

                    }
                );

            }
        );



        // 최초 View
        changeView(
            "slide"
        );


        isInitialViewSetup =
            false;



        // =========================================================
        // 마우스 휠 Slide 전환
        // =========================================================

        document.addEventListener(

            "wheel",

            event => {

                // Slide View가 아니면 무시
                if (
                    !slideview ||
                    slideview.hidden
                ) {
                    return;
                }


                event.preventDefault();


                if (
                    isScrolling
                ) {
                    return;
                }



                // =================================================
                // 현재 검색 결과 카드만 가져오기
                // =================================================

                const visibleCards =
                    getVisibleCards();


                if (
                    visibleCards.length === 0
                ) {
                    return;
                }



                // =================================================
                // 현재 카드
                // =================================================

                const currentCard =
                    cards[currentIndex];


                let visibleIndex =
                    visibleCards.indexOf(
                        currentCard
                    );



                /*
                * 현재 카드가 검색 결과에서 빠진 경우
                * 첫 번째 검색 결과를 기준으로 잡음
                */
                if (
                    visibleIndex === -1
                ) {

                    visibleIndex =
                        0;

                }



                // =================================================
                // 방향
                // =================================================

                const direction =
                    event.deltaY > 0
                        ?
                        1
                        :
                        -1;



                const nextVisibleIndex =
                    visibleIndex +
                    direction;



                // =================================================
                // 검색 결과 범위 제한
                // =================================================

                if (
                    nextVisibleIndex < 0 ||
                    nextVisibleIndex >=
                    visibleCards.length
                ) {

                    return;

                }



                isScrolling =
                    true;



                // =================================================
                // 기존 카드 비활성화
                // =================================================

                cards.forEach(
                    card => {

                        card.classList.remove(
                            "is-active"
                        );

                    }
                );



                // =================================================
                // 다음 검색 결과 카드
                // =================================================

                const nextCard =
                    visibleCards[
                        nextVisibleIndex
                    ];



                /*
                * 전체 cards 배열에서
                * 실제 index를 다시 찾아서 저장
                */
                currentIndex =
                    cards.indexOf(
                        nextCard
                    );



                // =================================================
                // 활성화
                // =================================================

                nextCard.classList.add(
                    "is-active"
                );



                // =================================================
                // 프로젝트 정보 변경
                // =================================================

                updateSlideInfo(
                    nextCard.dataset.projectId,
                    true
                );



                // =================================================
                // 연속 휠 방지
                // =================================================

                window.setTimeout(
                    () => {

                        isScrolling =
                            false;

                    },

                    600
                );

            },

            {
                passive:
                    false
            }

        );

    }



    // =========================================================
    // 실행
    // =========================================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initProjectPage,
            {
                once:
                    true
            }
        );

    }


    else {

        initProjectPage();

    }

})();
