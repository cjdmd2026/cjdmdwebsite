import { initSiteHeader } from "./main-intro/site-header.js";

initSiteHeader();

// Count detail pages and section fragments from the page that opened the first work.
// Keep the count on each entry so Back, Forward and reload preserve the same destination.
const footer = document.querySelector(".case-foot");
const backLink = document.querySelector(".case-back");
const referrer = document.referrer && new URL(document.referrer);
const handoffKey = "project-detail-next-entry";
let returnSteps = history.state?.projectReturnSteps;
function rememberSteps(steps) {
    returnSteps = steps;
    history.replaceState({ ...history.state, projectReturnSteps: steps }, "");
}
if (returnSteps == null) {
    let steps = referrer?.origin === location.origin && history.length > 1 ? 1 : 0;
    try {
        const handoff = JSON.parse(sessionStorage.getItem(handoffKey));
        if (steps && handoff?.from === referrer.pathname && handoff.to === location.pathname) steps = handoff.steps;
        sessionStorage.removeItem(handoffKey);
    } catch { /* The previous document is still reachable without session storage. */ }
    rememberSteps(steps);
}
window.addEventListener("hashchange", () => {
    rememberSteps(history.state?.projectReturnSteps ?? (returnSteps ? returnSteps + 1 : 0));
});

function handleProjectReturn(event) {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (link.href === backLink.href) {
        if (returnSteps > 0 && returnSteps < history.length) {
            event.preventDefault();
            if (window.PageTransition) void window.PageTransition.back(returnSteps);
            else history.go(-returnSteps);
        }
    } else {
        // Previous/next work links continue the same visit to the details.
        try {
            sessionStorage.setItem(handoffKey, JSON.stringify({
                from: location.pathname, to: new URL(link.href).pathname, steps: returnSteps ? returnSteps + 1 : 0
            }));
        } catch { /* Leave the native link usable if storage is unavailable. */ }
    }
}
backLink.addEventListener("click", handleProjectReturn);
footer.addEventListener("click", handleProjectReturn);

const header = document.querySelector(".header");
const sectionMenu = document.querySelector(".case-menu");
let hiddenHeight = 0;
let lastScrollY = window.scrollY;

function setHiddenHeight(value) {
    const next = Math.min(header.offsetHeight, Math.max(0, value));
    if (next === hiddenHeight) return;
    hiddenHeight = next;
    document.documentElement.style.setProperty("--case-header-offset", next + "px");
}

function followScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.max(0, Math.min(window.scrollY, maxScroll));
    const delta = y - lastScrollY;
    lastScrollY = y;
    if (y === 0 || document.body.classList.contains("mobile-menu-open") || header.querySelector(":focus-visible")) {
        setHiddenHeight(0);
        return;
    }
    setHiddenHeight(Math.min(y, hiddenHeight + delta));
}

window.addEventListener("scroll", followScroll, { passive: true });
window.addEventListener("resize", followScroll);
header.addEventListener("focusin", () => setHiddenHeight(0));

// Give native fragment navigation the inset it will need after the jump.
sectionMenu.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    const distance = target.getBoundingClientRect().top - sectionMenu.getBoundingClientRect().bottom;
    if (Math.abs(distance) > 1) setHiddenHeight(distance > 0 ? header.offsetHeight : 0);
});

// Preserve the original line breaks and widths when a designer's display font is unavailable.
// The copy itself lives in HTML and remains readable before fonts or JavaScript load.
(() => {
    if (document.querySelector("#artwork[data-native-type]")) return;
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
