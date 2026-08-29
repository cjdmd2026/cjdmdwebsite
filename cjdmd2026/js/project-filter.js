(() => {
    "use strict";


    // =========================================================
    // 카테고리 연결
    // HTML data-filter → project-data.js category
    // =========================================================

    const CATEGORY_MAP = {
        all: null,
        health: "건강",
        education: "교육",
        environment: "환경",
        culture: "문화",
        leisure: "여가",
        welfare: "복지",
        life: "생활"
    };



    // =========================================================
    // 검색 문자열 정리
    // =========================================================

    function normalize(value) {

        return String(value ?? "")
            .toLowerCase()
            .replace(/\s+/g, "");

    }



    // =========================================================
    // 프로젝트 찾기
    // =========================================================

    function getProject(projectId) {

        if (
            !window.PROJECTS ||
            !Array.isArray(window.PROJECTS)
        ) {
            return null;
        }


        return window.PROJECTS.find(
            project =>
                project.id === projectId
        );

    }



    // =========================================================
    // 검색 판정
    //
    // 검색 대상:
    // 프로젝트명
    // 작업자 이름
    // 주제
    // =========================================================

    function matchesSearch(
        project,
        query
    ) {

        if (!query) {
            return true;
        }


        if (!project) {
            return false;
        }


        const searchText =
            normalize(
                [
                    project.title,
                    ...(project.members || []),
                    project.topic
                ].join(" ")
            );


        return searchText.includes(
            query
        );

    }



    // =========================================================
    // 초기화
    // =========================================================

    function init() {

        const filter =
            document.querySelector(
                "#gridview .filter"
            );


        const searchInput =
            document.querySelector(
                ".search-bar input"
            );


        const gridCards =
            [
                ...document.querySelectorAll(
                    "#gridview .card[data-project-id]"
                )
            ];


        const slideCards =
            [
                ...document.querySelectorAll(
                    "#slideview .card[data-project-id]"
                )
            ];



        // =====================================================
        // Filter 요소
        // =====================================================

        const filterButtons =
            filter
                ? [
                    ...filter.querySelectorAll(
                        "button[data-filter]"
                    )
                ]
                : [];


        const indicator =
            filter?.querySelector(
                ".filter-indicator"
            );


        const resetButton =
            filter?.querySelector(
                ".filter-reset"
            );



        // =====================================================
        // 현재 필터
        // =====================================================

        let currentButton =
            filterButtons.find(
                button =>
                    button.getAttribute(
                        "aria-pressed"
                    ) === "true"
            )
            ||
            filterButtons[0];


        let activeFilter =
            currentButton
                ?.dataset
                ?.filter
            ||
            "all";


        let currentY =
            0;



        // =====================================================
        // 현재 검색어
        // =====================================================

        let searchQuery =
            normalize(
                searchInput?.value
            );



        // =====================================================
        // Indicator 초기 위치
        // =====================================================

        function setIndicatorImmediately(
            button
        ) {

            if (
                !indicator ||
                !button
            ) {
                return;
            }


            currentY =
                button.offsetTop;


            indicator.style.transition =
                "none";


            indicator.style.top =
                `${currentY}px`;


            indicator.style.width =
                `${button.offsetWidth}px`;


            indicator.style.height =
                `${button.offsetHeight}px`;


            requestAnimationFrame(
                () => {

                    indicator.style.transition =
                        "";

                }
            );

        }



        // =====================================================
        // Slime Indicator 이동
        // =====================================================

        function moveIndicator(
            nextButton
        ) {

            if (
                !indicator ||
                !nextButton
            ) {
                return;
            }


            const shape =
                indicator.querySelector(
                    ".filter-indicator-shape"
                );


            const toY =
                nextButton.offsetTop;


            const distance =
                toY - currentY;


            /*
            * 기존 Slime 애니메이션이 있다면 제거
            */
            if (shape) {

                shape
                    .getAnimations()
                    .forEach(
                        animation => {

                            animation.cancel();

                        }
                    );

            }



            // =========================================
            // 위치 이동
            // transform이 아니라 top 사용
            // =========================================

            indicator.style.top =
                `${toY}px`;


            indicator.style.width =
                `${nextButton.offsetWidth}px`;


            indicator.style.height =
                `${nextButton.offsetHeight}px`;



            // =========================================
            // Slime 모양만 별도로 애니메이션
            // =========================================

            if (shape) {

                shape.animate(

                    [

                        {
                            transform:
                                "scaleX(1) scaleY(1)"
                        },


                        {
                            transform:
                                distance === 0
                                    ?
                                    "scaleX(1) scaleY(1)"
                                    :
                                    "scaleX(0.88) scaleY(1.45)"
                        },


                        {
                            transform:
                                "scaleX(1.08) scaleY(0.88)"
                        },


                        {
                            transform:
                                "scaleX(1) scaleY(1)"
                        }

                    ],

                    {
                        duration:
                            520,

                        easing:
                            "cubic-bezier(0.22, 1, 0.36, 1)",

                        fill:
                            "forwards"
                    }

                );

            }



            currentY =
                toY;

        }



        // =====================================================
        // 검색 + 필터 적용
        // =====================================================

        function applyResults() {

            const selectedCategory =
                CATEGORY_MAP[
                    activeFilter
                ];



            // =================================================
            // GRID
            //
            // 검색 + 카테고리 둘 다 적용
            // =================================================

            gridCards.forEach(
                card => {

                    const project =
                        getProject(
                            card.dataset.projectId
                        );


                    if (!project) {
                        return;
                    }



                    // 카테고리
                    const categoryMatch =
                        activeFilter === "all"
                            ||
                        project.category ===
                        selectedCategory;



                    // 검색
                    const searchMatch =
                        matchesSearch(
                            project,
                            searchQuery
                        );



                    card.hidden =
                        !(
                            categoryMatch &&
                            searchMatch
                        );

                }
            );



            // =================================================
            // SLIDE
            //
            // 카테고리 필터는 적용하지 않음
            // 검색만 적용
            // =================================================

            slideCards.forEach(
                card => {

                    const project =
                        getProject(
                            card.dataset.projectId
                        );


                    if (!project) {
                        return;
                    }


                    const searchMatch =
                        matchesSearch(
                            project,
                            searchQuery
                        );


                    card.hidden =
                        !searchMatch;

                }
            );



            // =================================================
            // project.js에 검색 결과 변경 알림
            // =================================================

            document.dispatchEvent(

                new CustomEvent(
                    "project-search-change",

                    {
                        detail: {

                            query:
                                searchQuery,

                            visibleIds:
                                slideCards
                                    .filter(
                                        card =>
                                            !card.hidden
                                    )
                                    .map(
                                        card =>
                                            card.dataset.projectId
                                    )

                        }
                    }

                )

            );

        }



        // =====================================================
        // Filter 버튼
        // =====================================================

        filterButtons.forEach(
            button => {

                button.addEventListener(
                    "click",

                    () => {

                        // 이미 선택된 버튼
                        if (
                            button ===
                            currentButton
                        ) {
                            return;
                        }



                        // 전부 false
                        filterButtons.forEach(
                            item => {

                                item.setAttribute(
                                    "aria-pressed",
                                    "false"
                                );

                            }
                        );



                        // 현재 버튼 true
                        button.setAttribute(
                            "aria-pressed",
                            "true"
                        );



                        activeFilter =
                            button.dataset.filter;



                        // Indicator 이동
                        moveIndicator(
                            button
                        );


                        currentButton =
                            button;



                        // 카드 필터 적용
                        applyResults();

                    }

                );

            }
        );



        // =====================================================
        // 초기화 버튼
        // =====================================================

        if (resetButton) {

            resetButton.addEventListener(
                "click",

                () => {

                    const allButton =
                        filterButtons.find(
                            button =>
                                button.dataset.filter ===
                                "all"
                        );


                    if (!allButton) {
                        return;
                    }



                    filterButtons.forEach(
                        item => {

                            item.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        }
                    );


                    allButton.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                    activeFilter =
                        "all";


                    moveIndicator(
                        allButton
                    );


                    currentButton =
                        allButton;


                    applyResults();

                }

            );

        }



        // =====================================================
        // 검색
        // =====================================================

        if (searchInput) {

            searchInput.addEventListener(
                "input",

                event => {

                    searchQuery =
                        normalize(
                            event.target.value
                        );


                    applyResults();

                }

            );

        }



        // =====================================================
        // 최초 실행
        // =====================================================

        requestAnimationFrame(
            () => {

                setIndicatorImmediately(
                    currentButton
                );


                applyResults();

            }
        );



        // =====================================================
        // 화면 크기 변경
        // =====================================================

        window.addEventListener(
            "resize",
            () => {

                setIndicatorImmediately(
                    currentButton
                );

            }
        );


        // =====================================================
        // Grid View로 전환할 때 Indicator 위치 다시 계산
        // =====================================================

        const viewButtons =
            document.querySelectorAll(
                ".view-button"
            );


        viewButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (
                            button.dataset.view !==
                            "grid"
                        ) {
                            return;
                        }


                        /*
                         * project.js에서 hidden을 제거한 뒤
                         * 실제 버튼 크기가 계산될 때까지 기다림
                         */
                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    () => {

                                        setIndicatorImmediately(
                                            currentButton
                                        );

                                    }
                                );

                            }
                        );

                    }
                );

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
            init,
            {
                once: true
            }
        );

    }

    else {

        init();

    }

})();