// Store the catalogue view on its own history entry so separate visits stay independent.
(() => {
    const searchFields = [...document.querySelectorAll(".search-bar input")];
    const filters = [...document.querySelectorAll("#gridview [data-filter]")];
    const mobile = matchMedia("(max-width: 759px)");
    const saved = performance.getEntriesByType("navigation")[0]?.type === "back_forward"
        ? history.state?.projectList : null;

    if (saved) {
        const view = mobile.matches ? "grid" : saved.view;
        window.projectListReturn = { ...saved, view };
        document.documentElement.classList.remove("project-intro-pending");
        document.documentElement.dataset.projectFluidView = view;
        document.getElementById("gridview").hidden = view !== "grid";
        document.getElementById("slideview").hidden = view !== "slide";
        searchFields.forEach(field => { field.value = saved.query; });
        filters.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === saved.filter)));
        window.addEventListener("pageshow", event => {
            if (!event.persisted && view === "grid") {
                requestAnimationFrame(() => window.scrollTo({ top: saved.scrollY, behavior: "instant" }));
            }
        }, { once: true });
    }

    document.addEventListener("click", event => {
        const link = event.target.closest("a.slide-detail-link, a.grid-detail-link, a.mobile-sheet-link");
        if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const slide = window.ProjectFluidSlide?.state;
        const projectList = {
            view: document.documentElement.dataset.projectFluidView || "grid",
            projectId: slide?.projectId,
            query: searchFields[0].value,
            filter: filters.find(button => button.getAttribute("aria-pressed") === "true")?.dataset.filter || "all",
            scrollY: window.scrollY,
            sheetId: link.matches(".mobile-sheet-link") ? new URL(link.href).pathname.split("/").filter(Boolean).pop() : null
        };
        history.replaceState({ ...history.state, projectList }, "");
    }, true);
})();
