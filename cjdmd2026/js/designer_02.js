document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // DOM
    // =========================================================

    const designerPage = document.querySelector(".designer-page");
    const viewButton = designerPage?.querySelector(".view-button");
    const viewIcon = viewButton?.querySelector("img");
    const viewLabel = viewButton?.querySelector("span");

    const slider = document.querySelector(".designer-slider");
    const track = document.querySelector(".designer-track");

    if (
        !designerPage ||
        !viewButton ||
        !viewIcon ||
        !viewLabel ||
        !slider ||
        !track
    ) return;


    // =========================================================
    // Infinite Loop
    // =========================================================

    let loopReady = false;
    let scrollFrame = null;


    // 원본 카드만 반환
    function getOriginalCards() {
        return [
            ...track.querySelectorAll(
                ".designer-card:not([data-loop-clone])"
            )
        ];
    }


    // 복제 카드 생성
    function createClone(card, position) {

        const clone = card.cloneNode(true);

        clone.dataset.loopClone = position;

        // 접근성상 복제 요소는 중복으로 읽지 않도록
        clone.setAttribute("aria-hidden", "true");
        clone.tabIndex = -1;


        // 혹시 나중에 카드 내부에 id가 추가되더라도
        // clone에서 중복 id가 생기지 않도록 제거
        clone.removeAttribute("id");

        clone.querySelectorAll("[id]").forEach(element => {
            element.removeAttribute("id");
        });


        return clone;
    }


    // slider 내부에서 해당 요소가 위치한 정확한 scroll 좌표
    function getScrollPosition(element) {

        return (
            slider.scrollLeft +
            element.getBoundingClientRect().left -
            slider.getBoundingClientRect().left
        );
    }


    // 한 카드 세트의 전체 길이
    function getLoopWidth() {

        const originalFirst =
            track.querySelector(
                ".designer-card:not([data-loop-clone])"
            );

        const afterFirst =
            track.querySelector(
                '[data-loop-clone="after"]'
            );

        if (!originalFirst || !afterFirst) {
            return 0;
        }


        return (
            afterFirst.getBoundingClientRect().left -
            originalFirst.getBoundingClientRect().left
        );
    }


    // ---------------------------------------------------------
    // Infinite Loop 생성
    // ---------------------------------------------------------

    function createInfiniteLoop() {

        if (loopReady) return;

        if (!designerPage.classList.contains("slide-view")) {
            return;
        }


        const cards = getOriginalCards();

        if (cards.length < 2) return;


        const beforeFragment =
            document.createDocumentFragment();

        const afterFragment =
            document.createDocumentFragment();


        // 앞쪽 복제
        cards.forEach(card => {

            beforeFragment.appendChild(
                createClone(card, "before")
            );

        });


        // 뒤쪽 복제
        cards.forEach(card => {

            afterFragment.appendChild(
                createClone(card, "after")
            );

        });


        /*
            결과

            [복제 1 ~ 34]
            [원본 1 ~ 34]
            [복제 1 ~ 34]
        */

        track.insertBefore(
            beforeFragment,
            track.firstChild
        );

        track.appendChild(afterFragment);


        loopReady = true;


        // 처음에는 가운데 원본 1번에서 시작
        requestAnimationFrame(() => {

            const originalFirst =
                track.querySelector(
                    ".designer-card:not([data-loop-clone])"
                );

            if (!originalFirst) return;


            slider.scrollLeft =
                getScrollPosition(originalFirst);

        });
    }


    // ---------------------------------------------------------
    // Infinite Loop 제거
    // Grid View에서 사용
    // ---------------------------------------------------------

    function destroyInfiniteLoop() {

        track
            .querySelectorAll("[data-loop-clone]")
            .forEach(clone => clone.remove());


        slider.scrollLeft = 0;

        loopReady = false;
    }


    // ---------------------------------------------------------
    // 무한 위치 보정
    // ---------------------------------------------------------

    function normalizeInfiniteScroll() {

        if (!loopReady) return;

        if (!designerPage.classList.contains("slide-view")) {
            return;
        }


        const originalFirst =
            track.querySelector(
                ".designer-card:not([data-loop-clone])"
            );

        const afterFirst =
            track.querySelector(
                '[data-loop-clone="after"]'
            );


        if (!originalFirst || !afterFirst) return;


        const loopWidth = getLoopWidth();

        if (!loopWidth) return;


        const originalStart =
            getScrollPosition(originalFirst);

        const afterStart =
            getScrollPosition(afterFirst);

        const currentX = slider.scrollLeft;


        /*
            왼쪽으로 원본 시작점을 넘어간 경우

            ... 33 34 | 1 2 3 ...

            같은 위치를 한 세트 오른쪽으로 이동
        */
        if (currentX < originalStart) {

            slider.scrollLeft =
                currentX + loopWidth;

        }


        /*
            오른쪽 복제 세트까지 진입한 경우

            ... 33 34 | 1 2 3 ...

            같은 위치를 한 세트 왼쪽으로 이동
        */
        else if (currentX >= afterStart) {

            slider.scrollLeft =
                currentX - loopWidth;

        }
    }


    // scroll 이벤트는 RAF로 제한
    slider.addEventListener(
        "scroll",
        () => {

            if (!loopReady) return;


            cancelAnimationFrame(scrollFrame);


            scrollFrame =
                requestAnimationFrame(
                    normalizeInfiniteScroll
                );

        },
        { passive: true }
    );


    // =========================================================
    // View 전환
    // =========================================================

    function changeView(selectedView) {

        const isSlideView =
            selectedView === "slide";


        designerPage.classList.add(
            "is-view-changing"
        );


        designerPage.classList.toggle(
            "slide-view",
            isSlideView
        );

        designerPage.classList.toggle(
            "grid-view",
            !isSlideView
        );


        // -----------------------------------------------------
        // 버튼
        // -----------------------------------------------------

        viewButton.dataset.view =
            isSlideView
                ? "grid"
                : "slide";


        viewButton.setAttribute(
            "aria-label",
            isSlideView
                ? "그리드 보기로 전환"
                : "슬라이드 보기로 전환"
        );


        viewIcon.src =
            isSlideView
                ? "../assets/images/icons/grid-scroll-icon.svg"
                : "../assets/images/icons/side-scroll-icon.svg";


        viewLabel.textContent = "";


        // -----------------------------------------------------
        // Loop
        // -----------------------------------------------------

        if (isSlideView) {

            requestAnimationFrame(() => {
                createInfiniteLoop();
            });

        }

        else {

            destroyInfiniteLoop();

        }


        // 강제 reflow
        void designerPage.offsetWidth;


        designerPage.classList.remove(
            "is-view-changing"
        );
    }


    viewButton.addEventListener(
        "click",
        () => {

            changeView(
                viewButton.dataset.view
            );

        }
    );


    // =========================================================
    // Slide 가로 Wheel
    // =========================================================

    slider.addEventListener(
        "wheel",
        event => {

            if (
                !designerPage
                    .classList
                    .contains("slide-view")
            ) {
                return;
            }


            if (
                slider.scrollWidth <=
                slider.clientWidth
            ) {
                return;
            }


            event.preventDefault();


            /*
                일반 마우스:
                deltaY → 가로 이동

                트랙패드:
                deltaX가 존재하면 함께 반영
            */

            const delta =
                Math.abs(event.deltaX) >
                Math.abs(event.deltaY)

                    ? event.deltaX
                    : event.deltaY;


            slider.scrollLeft += delta;

        },
        {
            passive: false
        }
    );


    // =========================================================
    // Resize
    // 카드가 vw 단위이므로 화면 크기 변경 대응
    // =========================================================

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer = setTimeout(() => {

                if (
                    designerPage
                        .classList
                        .contains("slide-view")
                ) {

                    /*
                        카드 너비가 vw라 화면 크기에 따라
                        Loop 한 세트 길이도 자동으로 달라짐.

                        getLoopWidth()가 매번 실제 위치를
                        측정하기 때문에 clone을 다시 만들
                        필요는 없음.
                    */

                    normalizeInfiniteScroll();

                }

            }, 100);

        }
    );


    // =========================================================
    // 검색 / 초성 필터
    // 현재 미구현
    // =========================================================

    /*
        검색 기능을 나중에 구현해서
        카드 display가 변경된다면

        destroyInfiniteLoop();
        createInfiniteLoop();

        를 실행해서 복제 목록을 갱신하면 됩니다.
    */


    // =========================================================
    // 초기 View
    // =========================================================

    changeView("slide");

});