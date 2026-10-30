(() => {
    "use strict";

    // 기존 designer-mobile-02.js를 이 파일로 전체 교체합니다.
    // 모바일에서도 HTML의 slide-view를 유지하고, 사용자가 누른 보기만 변경합니다.
    const page = document.querySelector(".designer-page");
    if (!page || page.dataset.mobileControlsReady === "true") return;
    page.dataset.mobileControlsReady = "true";

    const mobile = window.matchMedia("(max-width: 759px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector(".header");
    const menuButton = document.querySelector(".menu-button");
    const menu = document.querySelector(".mobile-menu");
    const heading = page.querySelector(".designer-heading");
    const gridTitle = page.querySelector(".designer-heading__title--grid");
    const gridEmpty = document.querySelector(".designer-grid-empty");
    const toggles = [...page.querySelectorAll("[data-mobile-view]")];
    const filterButtons = [...page.querySelectorAll(".designer-filter__button[data-initial]")];
    let menuTimer;

    function currentView() {
        return page.classList.contains("grid-view") ? "grid" : "slide";
    }

    function syncEmpty() {
        if (gridEmpty) {
            gridEmpty.hidden = currentView() !== "grid" || page.dataset.designerResultCount !== "0";
        }
    }

    function syncView() {
        const view = currentView();
        toggles.forEach(button => {
            button.setAttribute("aria-pressed", String(button.dataset.mobileView === view));
        });
        if (gridTitle) gridTitle.id = "designer-title-grid";
        heading?.setAttribute("aria-labelledby", view === "slide" ? "designer-title-slide" : "designer-title-grid");
        syncEmpty();
    }

    function enhanceRenderedCards() {
        page.querySelectorAll(".designer-card__name-en, .formation-name-en").forEach(name => {
            name.lang = "en";
        });
    }

    function setMenu(open, restoreFocus = false) {
        if (!menuButton || !menu) return;
        if (!open && document.documentElement.classList.contains('page-transition-menu-hold')) return;
        clearTimeout(menuTimer);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
        document.body.classList.toggle("mobile-menu-open", open);
        menu.inert = !open;
        if (open) {
            menu.hidden = false;
            requestAnimationFrame(() => {
                if (menuButton.getAttribute("aria-expanded") === "true") menu.classList.add("is-open");
            });
        } else {
            if (restoreFocus && menu.contains(document.activeElement)) menuButton.focus({ preventScroll: true });
            menu.classList.remove("is-open");
            menuTimer = window.setTimeout(() => { menu.hidden = true; }, reducedMotion.matches ? 0 : 280);
        }
    }

    toggles.forEach(button => {
        button.addEventListener("click", () => {
            if (button.dataset.mobileView === currentView()) return;
            window.DesignerPage?.changeView(button.dataset.mobileView);
        });
    });
    menuButton?.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    menu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") setMenu(false, true);
    });

    function syncHeader() {
        header?.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", syncHeader, { passive: true });
    document.addEventListener("designer:viewchange", syncView);
    document.addEventListener("designer-filter-change", syncEmpty);
    document.addEventListener("designer:render", enhanceRenderedCards);
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (!mobile.matches || button.disabled || currentView() !== "grid") return;
            button.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "nearest", inline: "center" });
        });
    });
    mobile.addEventListener("change", () => {
        setMenu(false);
        syncView();
        enhanceRenderedCards();
    });

    function init() {
        if (menu) menu.inert = menu.hidden;
        syncView();
        syncHeader();
        enhanceRenderedCards();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
    else init();
})();
