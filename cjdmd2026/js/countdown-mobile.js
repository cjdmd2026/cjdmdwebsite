(() => {
    "use strict";

    const hero = document.getElementById("heroSection");
    const heroText = document.getElementById("heroText");
    const archive = document.querySelector(".archive");

    if (!hero) return;

    // Keeps CSS sizing stable while mobile browser chrome opens and closes.
    const updateViewportHeight = () => {
        const height = window.visualViewport?.height || window.innerHeight;
        document.documentElement.style.setProperty("--mobile-viewport-height", `${height}px`);
    };

    updateViewportHeight();
    window.visualViewport?.addEventListener("resize", updateViewportHeight, { passive: true });
    window.addEventListener("orientationchange", updateViewportHeight, { passive: true });

    let startY = 0;
    let currentY = 0;

    const setArchiveState = (active) => {
        if (!archive) return;
        heroText?.style.setProperty("opacity", active ? "0" : "1");
        archive.classList.toggle("active", active);
    };

    hero.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1) return;
        startY = event.touches[0].clientY;
        currentY = startY;
    }, { passive: true });

    hero.addEventListener("touchmove", (event) => {
        if (event.touches.length !== 1) return;
        currentY = event.touches[0].clientY;
    }, { passive: true });

    hero.addEventListener("touchend", () => {
        const delta = startY - currentY;
        if (Math.abs(delta) < 48) return;
        setArchiveState(delta > 0);
    }, { passive: true });
})();