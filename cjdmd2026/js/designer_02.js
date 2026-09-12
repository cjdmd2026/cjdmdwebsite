document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // Detail Page
    // =========================================================

    // 현재 디자이너 목록 HTML 기준 경로입니다.
    // 예: designer/index_02.html → designer/detail/designer-detail.html
    // 실제 상세 HTML 위치가 다르면 아래 한 줄만 수정하세요.
    const DESIGNER_DETAIL_PATH = "./designer-detail/designer-detail.html";

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

    if (!Array.isArray(window.DESIGNERS)) {
        console.warn(
            "[designer_02.js] window.DESIGNERS가 없습니다. designer-data.js를 먼저 연결해 주세요."
        );
        return;
    }

    // =========================================================
    // Designer Data
    // =========================================================

    const designers = [...window.DESIGNERS].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

    function getDesignerImage(designer) {
        if (designer.image) return designer.image;

        const number = String(
            designer.order ?? 0
        ).padStart(2, "0");

        return `../assets/images/designer/designer-${number}.png`;
    }

    function getDesignerHref(designer) {
        // 개별 href가 있으면 그 경로를 사용하고, 없으면 공통 상세 페이지를 사용합니다.
        const url = new URL(
            designer.href || DESIGNER_DETAIL_PATH,
            document.baseURI
        );

        // 기존 쿼리와 해시는 유지하고 학생 ID만 설정합니다.
        // designer-detail.js에서 같은 ?id= 값을 읽어 학생을 찾습니다.
        url.searchParams.set("id", designer.id);

        return url.href;
    }

    function createDesignerCard(designer) {
        const card = document.createElement("a");
        const imageWrap = document.createElement("span");
        const text = document.createElement("span");
        const nameKo = document.createElement("strong");
        const nameEn = document.createElement("span");

        card.className = "designer-card";
        card.href = getDesignerHref(designer);
        card.setAttribute("page-transition", "");

        card.dataset.designerId = designer.id;
        card.dataset.nameKo = designer.nameKo;
        card.dataset.nameEn = designer.nameEn;
        card.dataset.initial = designer.initial;
        card.dataset.projectIds =
            (designer.projectIds || []).join(" ");

        card.setAttribute(
            "aria-label",
            `${designer.nameKo} 상세 페이지 보기`
        );

        imageWrap.className =
            "designer-card__image-wrap";

        imageWrap.style.setProperty(
            "--designer-card-image",
            `url('${getDesignerImage(designer)}')`
        );

        text.className =
            "designer-card__text";

        nameKo.className =
            "designer-card__name-ko";

        nameKo.textContent =
            designer.nameKo;

        nameEn.className =
            "designer-card__name-en";

        nameEn.textContent =
            designer.nameEn;

        text.append(
            nameKo,
            nameEn
        );

        card.append(
            imageWrap,
            text
        );

        return card;
    }

    // =========================================================
    // Render
    // =========================================================

    function renderDesigners(
        list = designers
    ) {
        const fragment =
            document.createDocumentFragment();

        list.forEach(designer => {
            fragment.appendChild(
                createDesignerCard(
                    designer
                )
            );
        });

        track.replaceChildren(
            fragment
        );

        /*
         * 중요:
         * Grid View에서는 WebGL refresh를 실행하지 않음.
         * Grid 카드 크기를 WebGL이 잘못 읽는 문제 방지.
         */
        if (
            designerPage.classList.contains(
                "slide-view"
            ) &&
            window.DesignerRibbonSlider?.refresh
        ) {
            requestAnimationFrame(
                () => {
                    window
                        .DesignerRibbonSlider
                        .refresh();
                }
            );
        }

        document.dispatchEvent(
            new CustomEvent(
                "designer:render",
                {
                    detail: {
                        designers: list
                    }
                }
            )
        );
    }

    // =========================================================
    // View
    // =========================================================

    function changeView(
        selectedView
    ) {
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

        if (!isSlideView) {
            slider.scrollLeft = 0;
        }

        /*
         * CSS View 상태를 브라우저에 먼저 반영
         */
        void designerPage.offsetWidth;

        designerPage.classList.remove(
            "is-view-changing"
        );

        document.dispatchEvent(
            new CustomEvent(
                "designer:viewchange",
                {
                    detail: {
                        view:
                            isSlideView
                                ? "slide"
                                : "grid"
                    }
                }
            )
        );

        /*
         * Slide View에 들어온 뒤
         * Slide CSS가 적용된 실제 카드 크기로
         * WebGL을 다시 측정.
         */
        if (
            isSlideView &&
            window.DesignerRibbonSlider?.refresh
        ) {
            requestAnimationFrame(
                () => {
                    requestAnimationFrame(
                        () => {
                            window
                                .DesignerRibbonSlider
                                .refresh();
                        }
                    );
                }
            );
        }
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
    // Public API
    // =========================================================

    window.DesignerPage = {
        data: designers,
        render: renderDesigners,
        changeView,
        getTrack: () => track
    };

    // =========================================================
    // Start
    // =========================================================

    renderDesigners(designers);
    changeView("slide");
});
