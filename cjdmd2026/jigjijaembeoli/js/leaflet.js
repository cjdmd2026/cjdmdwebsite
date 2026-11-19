const sideArtwork = {
  front: {
    front: "images/leaflet/leaflet-side-a-display.svg",
    back: "images/leaflet/leaflet-side-b-display.svg",
  },
  back: {
    front: "images/leaflet/leaflet-side-b-display.svg",
    back: "images/leaflet/leaflet-side-a-display.svg",
  },
};

export function initLeaflet(leaflet, gsap, ScrollTrigger) {
  if (!leaflet || !gsap || !ScrollTrigger) return;

  const section = leaflet.closest("#more");
  const openButton = section.querySelector(".leaflet-toggle");
  const sideButtons = [...section.querySelectorAll("[data-leaflet-side]")];
  const leftPanel = leaflet.querySelector(".leaflet__panel--0");
  const rightPanel = leaflet.querySelector(".leaflet__panel--2");
  const panels = [...leaflet.querySelectorAll(".leaflet__panel")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let side = "front";
  let foldTrigger = null;

  function setOpen(open, progress = 0) {
    leaflet.dataset.open = String(open);
    leaflet.dataset.progress = progress.toFixed(3);
    leaflet.setAttribute("aria-label", `${open ? "펼친" : "접힌"} 직지 리플렛 ${side === "front" ? "앞면" : "뒷면"}`);
    openButton.setAttribute("aria-pressed", String(open));
    openButton.textContent = open ? "리플렛 접기" : "리플렛 펼치기";
  }

  function setSide(nextSide) {
    side = nextSide;
    leaflet.dataset.side = side;
    panels.forEach(panel => {
      panel.querySelector(".leaflet__face--front img").src = sideArtwork[side].front;
      panel.querySelector(".leaflet__face--back img").src = sideArtwork[side].back;
    });
    sideButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.leafletSide === side));
    });
    setOpen(leaflet.dataset.open === "true", Number(leaflet.dataset.progress || 0));
  }

  sideButtons.forEach(button => button.addEventListener("click", () => setSide(button.dataset.leafletSide)));

  gsap.registerPlugin(ScrollTrigger);

  // Keep the center panel fixed: fold the right wing first, then the left.
  // Small Z offsets separate the three folded leaves so the closed stack reads.
  gsap.set(leaflet, { rotation: 0, transformStyle: "preserve-3d" });
  gsap.set(leftPanel, { rotateY: 0, transformOrigin: "right center" });
  gsap.set(rightPanel, { rotateY: 0, transformOrigin: "left center" });
  setOpen(true, 0);

  const foldTimeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "jikji-leaflet-fold",
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(innerHeight * 1.25, 800)}`,
      pin: section,
      pinSpacing: true,
      scrub: reduceMotion ? true : 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
    onUpdate: () => {
      const progress = foldTimeline.progress();
      leaflet.dataset.progress = progress.toFixed(3);
      const open = progress < 0.5;
      if (String(open) !== leaflet.dataset.open) setOpen(open, progress);
    },
  });

  foldTimeline
    .to(rightPanel, { rotateY: -180, z: 4, duration: 0.44 }, 0)
    .to(rightPanel, { "--panel-shade": 0.2, duration: 0.4 }, 0.02)
    .to(leftPanel, { rotateY: 180, z: 2, duration: 0.42 }, 0.45)
    .to(leftPanel, { "--panel-shade": 0.2, duration: 0.4 }, 0.47)
    .to(leaflet, { rotationY: 360, duration: 0.13, ease: "power2.inOut" }, 0.87);

  foldTrigger = foldTimeline.scrollTrigger;
  openButton.addEventListener("click", () => {
    if (!foldTrigger) return;
    const isOpen = Number(leaflet.dataset.progress || 0) < 0.5;
    const target = isOpen ? foldTrigger.end - 2 : foldTrigger.start + 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  });

  setSide("front");
  ScrollTrigger.refresh();
}
