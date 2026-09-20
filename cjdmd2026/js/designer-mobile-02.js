(() => {
    "use strict";

    const mobile = window.matchMedia("(max-width: 759px)");
    const page = document.querySelector(".designer-page");
    const header = document.querySelector(".header");
    const menuButton = document.querySelector(".menu-button");
    const menu = document.querySelector(".mobile-menu");
    const filterButtons = [...document.querySelectorAll(".designer-filter__button[data-initial]")];
    let desktopView = "slide";

    function currentView() {
        return page?.classList.contains("grid-view") ? "grid" : "slide";
    }

    function setMobileView() {
        if (!mobile.matches || !window.DesignerPage?.changeView) return;
        window.DesignerPage.changeView("grid");
    }

    function restoreDesktopView() {
        if (!window.DesignerPage?.changeView) return;
        window.DesignerPage.changeView(desktopView);
    }

    function setMenu(open) {
        if (!menuButton || !menu) return;
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
        document.body.classList.toggle("mobile-menu-open", open);
        if (open) {
            menu.hidden = false;
            requestAnimationFrame(() => menu.classList.add("is-open"));
        } else {
            menu.classList.remove("is-open");
            window.setTimeout(() => {
                if (!menu.classList.contains("is-open")) menu.hidden = true;
            }, 280);
        }
    }

    function enhanceRenderedCards() {
        if (!mobile.matches) return;
        document.querySelectorAll(".designer-card__name-en").forEach(name => {
            name.lang = "en";
        });
    }

    menuButton?.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    menu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });
    window.addEventListener("scroll", () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") setMenu(false);
    });
    document.addEventListener("designer:render", enhanceRenderedCards);

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (!mobile.matches || button.disabled) return;
            button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        });
    });

    mobile.addEventListener("change", event => {
        if (event.matches) {
            desktopView = currentView();
            setMobileView();
            enhanceRenderedCards();
        } else {
            setMenu(false);
            restoreDesktopView();
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        if (mobile.matches) {
            desktopView = "slide";
            setMobileView();
            enhanceRenderedCards();
        }
    }, { once: true });
})();
