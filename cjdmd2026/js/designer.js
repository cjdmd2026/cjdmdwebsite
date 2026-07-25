document.addEventListener("DOMContentLoaded", () => {
    // 공통 DOM 참조
    const designerPage = document.querySelector(".designer-page");
    const viewButton = designerPage?.querySelector(".view-button");
    const viewIcon = viewButton?.querySelector("img");
    const viewLabel = viewButton?.querySelector("span");
    const slider = document.querySelector(".designer-slider");

    if (!designerPage || !viewButton || !viewIcon || !viewLabel || !slider) return;

    // === View 전환 ===
    function changeView(selectedView) {
        const isSlideView = selectedView === "slide";

        designerPage.classList.add("is-view-changing");
        designerPage.classList.toggle("slide-view", isSlideView);
        designerPage.classList.toggle("grid-view", !isSlideView);

        viewButton.dataset.view = isSlideView ? "grid" : "slide";
        viewButton.setAttribute(
            "aria-label",
            isSlideView ? "그리드 보기로 전환" : "슬라이드 보기로 전환"
        );
        viewIcon.src = isSlideView
            ? "../assets/images/icons/grid-scroll-icon.svg"
            : "../assets/images/icons/side-scroll-icon.svg";
        viewLabel.textContent = isSlideView ? "그리드 보기" : "슬라이드 보기";

        if (!isSlideView) slider.scrollLeft = 0;

        // 강제 reflow 후 보호 class를 제거해 View 전환에는 transition이 섞이지 않게 함
        void designerPage.offsetWidth;
        designerPage.classList.remove("is-view-changing");
    }

    viewButton.addEventListener("click", () => {
        changeView(viewButton.dataset.view);
    });

    // === Slide 가로 Wheel ===
    // 세로 wheel delta를 slider의 scrollLeft에 연속 반영하여 스크롤 기능 구현
    slider.addEventListener("wheel", (event) => {
        if (!designerPage.classList.contains("slide-view")) return;
        if (slider.scrollWidth <= slider.clientWidth) return;

        event.preventDefault();
        slider.scrollLeft += event.deltaY;
    }, { passive: false });

    // ==============================
    // 검색 / 초성 필터 연결 지점 (현재 미구현)
    // 검색은 카드의 data-name-ko / data-name-en,
    // 초성 필터는 버튼과 카드의 data-initial을 기준으로 추후 구현
    // ==============================

    // 페이지 진입 시 Slide View로 초기화
    changeView("slide");
});
