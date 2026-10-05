// 현재 방문 기록에만 목록 상태를 저장합니다. 새로 방문한 목록에는 적용하지 않습니다.
(() => {
    "use strict";
    const page = document.querySelector('.designer-page');
    if (!page || window.DesignerReturnState) return;
    const KEY = '__cjdmdDesignerReturn';
    const entryPath = location.pathname + location.search;
    const input = page.querySelector('.search-bar input');
    const buttons = [...page.querySelectorAll('.designer-filter__button[data-initial]')];
    const navigation = performance.getEntriesByType('navigation')[0];
    const read = () => {
        const value = history.state?.[KEY];
        return value?.version === 1 && value.path === entryPath && ['slide', 'grid'].includes(value.view) ? value : null;
    };
    let pending = navigation?.type === 'back_forward' ? read() : null;
    let restoring = !!pending, listReady = false, gallery = null, applying = false;
    let pageShown = document.readyState === 'complete', focusId = '', concealed = false;
    const originalVisibility = page.style.getPropertyValue('visibility');
    const originalPriority = page.style.getPropertyPriority('visibility');
    const originalBusy = page.getAttribute('aria-busy');
    try { history.scrollRestoration = 'manual'; } catch (_) {}

    function prime(state) {
        page.classList.toggle('slide-view', state.view === 'slide');
        page.classList.toggle('grid-view', state.view === 'grid');
        if (input) input.value = typeof state.query === 'string' ? state.query : '';
        const initial = buttons.some(button => button.dataset.initial === state.initial) ? state.initial : 'all';
        buttons.forEach(button => {
            const active = button.dataset.initial === initial;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }
    if (pending) {
        // 필터 JS가 초기화되기 전에 보기 방식, 검색어, 초성 선택을 먼저 복원합니다.
        prime(pending);
        page.style.setProperty('visibility', 'hidden');
        page.setAttribute('aria-busy', 'true');
        concealed = true;
    }
    function reveal() {
        if (!concealed) return;
        if (originalVisibility) page.style.setProperty('visibility', originalVisibility, originalPriority);
        else page.style.removeProperty('visibility');
        if (originalBusy === null) page.removeAttribute('aria-busy');
        else page.setAttribute('aria-busy', originalBusy);
        concealed = false;
    }
    function save() {
        if (restoring || !listReady) return;
        const filter = window.DesignerFilter?.state;
        const value = {
            version: 1, path: entryPath,
            view: page.classList.contains('grid-view') ? 'grid' : 'slide',
            scrollX: window.scrollX, scrollY: window.scrollY,
            query: input?.value || '',
            initial: filter?.initial || buttons.find(button => button.getAttribute('aria-pressed') === 'true')?.dataset.initial || 'all',
            focusId, gallery: gallery?.capture() || null
        };
        try { history.replaceState({ ...(history.state || {}), [KEY]: value }, ''); }
        catch (_) { /* 기록을 저장할 수 없어도 링크 이동은 유지합니다. */ }
    }
    function restore() {
        if (!restoring || !pending || applying || !listReady || !gallery || !pageShown) return;
        applying = true;
        const state = pending;
        try {
            window.DesignerPage.changeView(state.view);
            if (input) {
                input.value = typeof state.query === 'string' ? state.query : '';
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
            window.DesignerFilter?.apply();
            gallery.restore(state.gallery, state.view);
            if (state.view === 'grid') {
                window.scrollTo({ top: Number.isFinite(state.scrollY) ? state.scrollY : 0, left: Number.isFinite(state.scrollX) ? state.scrollX : 0, behavior: 'instant' });
            }
        } catch (error) {
            console.warn('[designer-return] 목록 복원 중 일부 상태를 적용하지 못했습니다.', error);
        }
        requestAnimationFrame(() => {
            pending = null; restoring = false; applying = false;
            reveal();
            focusId = typeof state.focusId === 'string' ? state.focusId : '';
            if (focusId) {
                const selector = state.view === 'grid' ? '.designer-card' : '.formation-person-card';
                const card = [...page.querySelectorAll(selector)].find(card => card.dataset.designerId === focusId);
                card?.focus({ preventScroll: true });
            }
            gallery.resume?.();
        });
    }
    window.DesignerReturnState = {
        get restoring() { return restoring; },
        get initialView() { return pending?.view || 'slide'; },
        listReady() { listReady = true; restore(); },
        registerGallery(value) { gallery = value; restore(); },
        galleryFailed() {
            if (pending) pending = { ...pending, view: 'grid', scrollY: 0, gallery: null };
            gallery = { capture: () => null, restore() {} }; restore();
        },
        save
    };
    // 카드 클릭 후 다른 핸들러가 선택 상태를 바꾸기 전에 저장합니다.
    document.addEventListener('click', event => {
        const link = event.target.closest?.('a[href]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
        const url = new URL(link.href, document.baseURI);
        if (url.origin !== location.origin || url.href === location.href) return;
        focusId = link.dataset.designerId || ''; save();
    }, true);
    window.addEventListener('pagehide', save);
    window.addEventListener('pageshow', event => {
        pageShown = true;
        if (event.persisted) {
            pending = read(); restoring = !!pending; applying = false;
        }
        restore();
    });
})();


document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // Detail Page
    // =========================================================

    // 현재 디자이너 목록 HTML 기준 경로입니다.
    // 예: designer/index_02.html → designer/detail/designer-detail.html
    // 실제 상세 HTML 위치가 다르면 아래 한 줄만 수정하세요.
    const DESIGNER_DETAIL_PATH = "./profile/";

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
    changeView(window.DesignerReturnState?.initialView || "slide");
    window.DesignerFilter?.apply();
    window.DesignerReturnState?.listReady();
});
