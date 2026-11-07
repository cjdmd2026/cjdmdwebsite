// Preserve the original line breaks and widths when a designer's display font is unavailable.
// The copy itself lives in HTML and remains readable before fonts or JavaScript load.
(() => {
    const media = matchMedia("(max-width: 999px)");
    function fit() {
        const art = document.querySelector(media.matches ? ".case-art.case-mobile" : ".case-art.case-pc");
        if (!art) return;
        const lines = [...art.querySelectorAll(".case-line")];
        const ratios = lines.map(line => {
            const ink = line.firstElementChild;
            const natural = ink.offsetWidth;
            return natural > 0 ? line.getBoundingClientRect().width / natural : 1;
        });
        lines.forEach((line, i) => line.firstElementChild.style.setProperty("--fit", ratios[i].toFixed(4)));
    }
    let queued;
    const schedule = () => { cancelAnimationFrame(queued); queued = requestAnimationFrame(fit); };
    document.fonts?.ready.then(schedule);
    window.addEventListener("resize", schedule, { passive: true });
    media.addEventListener("change", schedule);
    schedule();
})();
