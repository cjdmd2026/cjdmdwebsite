(() => {
    "use strict";

    const mobile = window.matchMedia("(max-width: 759px)");
    const menuButton = document.querySelector(".menu-button");
    const menu = document.querySelector(".mobile-menu");
    const header = document.querySelector(".header");
    const grid = document.querySelector("#gridview");
    const cards = [...document.querySelectorAll("#gridview .card[data-project-id]")];
    const count = document.querySelector(".mobile-result-count");
    const emptyState = document.querySelector(".mobile-empty-state");
    const searchInput = document.querySelector(".title-section .search-bar input");
    const filterButtons = [...document.querySelectorAll("#gridview .filter button[data-filter]")];
    const scrim = document.querySelector(".mobile-sheet-scrim");
    const sheet = document.querySelector(".mobile-project-sheet");
    let lastFocus = null;
    let touchStartY = null;

    function projectFor(card) {
        return window.PROJECTS?.find(project => String(project.id) === String(card.dataset.projectId));
    }

    function ensureMobileGrid() {
        if (!mobile.matches) return;
        if (window.ProjectFluidSlide?.changeView) {
            window.ProjectFluidSlide.changeView("grid");
        } else {
            grid.hidden = false;
            const slide = document.querySelector("#slideview");
            if (slide) slide.hidden = true;
        }
    }

    function enhanceCards() {
        if (!mobile.matches) return;
        cards.forEach(card => {
            const project = projectFor(card);
            if (!project) return;
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `${project.title} 프로젝트 상세 보기`);
            const image = card.querySelector(".card-image");
            if (image && !image.querySelector(".mobile-card-image")) {
                const thumbnail = document.createElement("img");
                thumbnail.className = "mobile-card-image";
                thumbnail.src = project.image || "";
                thumbnail.alt = `${project.title} 대표 이미지`;
                thumbnail.loading = "lazy";
                thumbnail.decoding = "async";
                image.append(thumbnail);
            }
            if (!card.querySelector(":scope > .mobile-card-category")) {
                const category = document.createElement("span");
                category.className = "mobile-card-category";
                category.textContent = project.category || "";
                card.append(category);
            }
        });
    }

    function restoreDesktopCardAccess() {
        cards.forEach(card => {
            card.removeAttribute("tabindex");
            card.removeAttribute("role");
            card.removeAttribute("aria-label");
        });
    }

    function updateResults() {
        const visible = cards.filter(card => !card.hidden);
        if (count) count.textContent = String(visible.length);
        const shouldHideEmptyState = visible.length !== 0;
        if (emptyState && emptyState.hidden !== shouldHideEmptyState) {
            emptyState.hidden = shouldHideEmptyState;
        }
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

    function openSheet(card) {
        if (!mobile.matches || !sheet || !scrim) return;
        const project = projectFor(card);
        if (!project) return;
        lastFocus = card;
        sheet.querySelector(".mobile-sheet-category").textContent = project.category || "";
        sheet.querySelector(".mobile-sheet-members").textContent = (project.members || []).join(" / ");
        sheet.querySelector("#mobile-sheet-title-03").textContent = project.title || "";
        sheet.querySelector(".mobile-sheet-description").textContent = project.description || "";
        const image = sheet.querySelector(".mobile-sheet-image");
        image.src = project.slideImage || project.image || "";
        image.alt = `${project.title} 대표 이미지`;
        image.loading = "lazy";
        image.decoding = "async";
        const link = sheet.querySelector(".mobile-sheet-link");
        if (project.url) {
            link.href = project.url;
            link.removeAttribute("aria-disabled");
        } else {
            link.removeAttribute("href");
            link.setAttribute("aria-disabled", "true");
        }
        sheet.hidden = false;
        scrim.hidden = false;
        document.body.classList.add("mobile-sheet-open");
        requestAnimationFrame(() => {
            sheet.classList.add("is-open");
            scrim.classList.add("is-open");
            sheet.focus({ preventScroll: true });
        });
    }

    function closeSheet() {
        if (!sheet || sheet.hidden) return;
        sheet.classList.remove("is-open");
        scrim?.classList.remove("is-open");
        document.body.classList.remove("mobile-sheet-open");
        window.setTimeout(() => {
            sheet.hidden = true;
            if (scrim) scrim.hidden = true;
            lastFocus?.focus({ preventScroll: true });
        }, 340);
    }

    menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
    menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
    window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 8), { passive: true });
    filterButtons.forEach(button => button.addEventListener("click", () => {
        if (mobile.matches) button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        requestAnimationFrame(updateResults);
    }));
    searchInput?.addEventListener("input", () => requestAnimationFrame(updateResults));
    emptyState?.querySelector("button")?.addEventListener("click", () => {
        if (searchInput) {
            searchInput.value = "";
            searchInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
        filterButtons.find(button => button.dataset.filter === "all")?.click();
    });

    cards.forEach(card => {
        card.addEventListener("click", () => openSheet(card));
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openSheet(card);
            }
        });
    });
    scrim?.addEventListener("click", closeSheet);
    sheet?.addEventListener("touchstart", event => {
        touchStartY = sheet.scrollTop === 0 ? event.touches[0].clientY : null;
    }, { passive: true });
    sheet?.addEventListener("touchend", event => {
        if (touchStartY !== null && event.changedTouches[0].clientY - touchStartY > 70) closeSheet();
        touchStartY = null;
    }, { passive: true });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSheet();
            setMenu(false);
        }
        if (event.key === "Tab" && sheet && !sheet.hidden) {
            const focusable = [...sheet.querySelectorAll("button:not([hidden]), a[href]")];
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable.at(-1);
            if (event.shiftKey && (document.activeElement === first || document.activeElement === sheet)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    const resultsObserver = new MutationObserver(updateResults);
    cards.forEach(card => resultsObserver.observe(card, {
        attributes: true,
        attributeFilter: ["hidden"]
    }));
    mobile.addEventListener("change", event => {
        if (event.matches) {
            enhanceCards();
            ensureMobileGrid();
        } else {
            closeSheet();
            setMenu(false);
            restoreDesktopCardAccess();
        }
    });

    enhanceCards();
    ensureMobileGrid();
    updateResults();
    document.addEventListener("DOMContentLoaded", () => {
        ensureMobileGrid();
        updateResults();
    }, { once: true });
})();
