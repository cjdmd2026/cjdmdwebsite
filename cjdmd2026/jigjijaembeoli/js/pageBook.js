/* Page-turning and magnifier controls for the Jikji archive section. */
import * as THREE from "./vendor/three.module.js";
import { LeafThroughObject } from "./vendor/leafthrough/leafthrough-object.js";

export function initPageBook(pages) {
  const section = document.querySelector("#more");
  if (!section || !pages?.length) return () => {};

  const stage = section.querySelector(".page-book-stage");
  const canvas = section.querySelector(".page-book-canvas");
  const magnifier = section.querySelector(".page-book-magnifier");
  const magnifierCanvas = section.querySelector(".page-book-magnifier__canvas");
  const inspectToggle = section.querySelector(".page-book-inspect-toggle");
  const inspectLabel = inspectToggle?.querySelector("span");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const listenerController = new AbortController();
  const signal = listenerController.signal;
  const MAGNIFICATION = 2;
  let renderer;
  let magazine;
  let scrollMedia;
  let scrollTrigger;
  let frame = 0;
  let currentPage = 0;
  let requestedPage = 0;
  let navigationTarget = null;
  let visible = true;
  let inspecting = false;
  let scrollActive = false;
  let idleTimer = 0;
  let savedProgress = 0;
  let savedScroll = 0;
  let restoringInspection = false;
  let disposed = false;

  function updateInspectToggle() {
    if (!inspectToggle) return;
    const ready = Boolean(magazine?.ready && !disposed);
    inspectToggle.disabled = !ready || scrollActive || magazine.turning || navigationTarget !== null;
    inspectToggle.setAttribute("aria-pressed", String(inspecting));
    if (inspectLabel) inspectLabel.textContent = inspecting ? "돋보기 끄기" : "돋보기 켜기";
  }

  function markScrollActive() {
    scrollActive = true;
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      scrollActive = false;
      updateInspectToggle();
    }, 240);
  }

  function continueNavigation() {
    if (!magazine || !magazine.ready || inspecting || navigationTarget !== null) return;
    if (magazine.visiblePages.includes(requestedPage)) {
      currentPage = magazine.page;
      updateInspectToggle();
      return;
    }

    const direction = requestedPage > magazine.page ? 1 : -1;
    const pageStep = magazine.layout === "spread" ? 2 : 1;
    navigationTarget = magazine.page + direction * pageStep;
    magazine.goTo(navigationTarget, { animate: true });
    updateInspectToggle();
    scheduleFrame();
  }

  function setScrollProgress(value) {
    if (!magazine || motion.matches || inspecting || restoringInspection || disposed) return;
    requestedPage = Math.round(Math.max(0, Math.min(1, value)) * (pages.length - 1));
    markScrollActive();
    continueNavigation();
  }

  function setMagnifierVisible(isVisible) {
    if (!magnifier) return;
    magnifier.classList.toggle("is-visible", Boolean(isVisible));
  }

  function drawMagnifier(clientX, clientY) {
    if (!inspecting || !magazine || !magnifier || !magnifierCanvas || !renderer) return;
    const stageBounds = stage.getBoundingClientRect();
    const source = renderer.domElement;
    if (!stageBounds.width || !stageBounds.height || !source.width || !source.height) {
      setMagnifierVisible(false);
      return;
    }

    const wasEnabled = magazine.enabled;
    magazine.enabled = true;
    const overPage = magazine.covers(clientX, clientY);
    magazine.enabled = wasEnabled;
    if (!overPage) {
      setMagnifierVisible(false);
      return;
    }

    const lensRect = magnifier.getBoundingClientRect();
    const lensSize = magnifierCanvas.clientWidth;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    if (!lensSize) return;
    const backingWidth = Math.round(lensSize * pixelRatio);
    const backingHeight = Math.round(lensSize * pixelRatio);
    if (magnifierCanvas.width !== backingWidth || magnifierCanvas.height !== backingHeight) {
      magnifierCanvas.width = backingWidth;
      magnifierCanvas.height = backingHeight;
    }

    const context = magnifierCanvas.getContext("2d");
    if (!context) return;
    const stageX = clientX - stageBounds.left;
    const stageY = clientY - stageBounds.top;
    const sourceScaleX = source.width / stageBounds.width;
    const sourceScaleY = source.height / stageBounds.height;
    const cropWidth = lensSize / MAGNIFICATION * sourceScaleX;
    const cropHeight = lensSize / MAGNIFICATION * sourceScaleY;
    const desiredSourceX = stageX * sourceScaleX - cropWidth / 2;
    const desiredSourceY = stageY * sourceScaleY - cropHeight / 2;
    const sourceX = Math.max(0, Math.min(source.width - cropWidth, desiredSourceX));
    const sourceY = Math.max(0, Math.min(source.height - cropHeight, desiredSourceY));
    const left = Math.max(0, Math.min(stageBounds.width - lensRect.width, stageX - lensRect.width / 2));
    const top = Math.max(0, Math.min(stageBounds.height - lensRect.height, stageY - lensRect.height / 2));

    magnifier.style.left = `${left}px`;
    magnifier.style.top = `${top}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, lensSize, lensSize);
    context.save();
    context.beginPath();
    context.arc(lensSize / 2, lensSize / 2, lensSize / 2, 0, Math.PI * 2);
    context.clip();
    context.filter = "grayscale(1) sepia(.1)";
    context.drawImage(source, sourceX, sourceY, cropWidth, cropHeight, 0, 0, lensSize, lensSize);
    context.restore();
    setMagnifierVisible(true);
  }

  function setInspectMode(enabled) {
    if (!magazine || !magazine.ready || inspecting === enabled || (enabled && (scrollActive || magazine.turning || navigationTarget !== null))) return;

    if (enabled) {
      savedProgress = scrollTrigger?.progress ?? currentPage / Math.max(1, pages.length - 1);
      savedScroll = window.scrollY;
      currentPage = magazine.page;
      requestedPage = currentPage;
      inspecting = true;
      setMagnifierVisible(false);
      section.classList.add("page-book-inspecting");
      stage.setAttribute("aria-label", `직지 페이지 ${currentPage + 1} 확대 살펴보기`);
      updateInspectToggle();
      return;
    }

    inspecting = false;
    setMagnifierVisible(false);
    section.classList.remove("page-book-inspecting");
    stage.setAttribute("aria-label", "스크롤에 따라 페이지가 넘어가는 직지 책");
    requestedPage = currentPage;
    if (scrollTrigger && Number.isFinite(savedScroll)) {
      restoringInspection = true;
      const restoreY = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * savedProgress;
      window.scrollTo({ top: restoreY, behavior: "instant" });
      window.ScrollTrigger.update(true);
      restoringInspection = false;
    }
    updateInspectToggle();
    scheduleFrame();
  }

  function handleWheel(event) {
    if (!inspecting || !scrollTrigger?.isActive) return;
    event.preventDefault();
    event.stopPropagation();
  }

  function handleTouchMove(event) {
    if (!inspecting || !scrollTrigger?.isActive) return;
    event.preventDefault();
  }

  function handleKeydown(event) {
    if (!inspecting) return;
    if (event.key === "Escape") {
      setInspectMode(false);
      return;
    }
    if ([" ", "PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
    }
  }

  inspectToggle?.addEventListener("click", () => setInspectMode(!inspecting), { signal });
  stage?.addEventListener("pointermove", event => drawMagnifier(event.clientX, event.clientY), { signal });
  stage?.addEventListener("pointerleave", () => setMagnifierVisible(false), { signal });
  window.addEventListener("wheel", handleWheel, { passive: false, signal });
  window.addEventListener("touchmove", handleTouchMove, { passive: false, signal });
  window.addEventListener("keydown", handleKeydown, { signal });

  if (window.gsap && window.ScrollTrigger && !motion.matches) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    scrollMedia = window.gsap.matchMedia();
    scrollMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { value: 0 };
      const pageTurnTrigger = window.ScrollTrigger.create({
        id: "more-jikji-pages",
        trigger: section,
        start: "top top",
        // Give all 80 scans enough scroll distance to remain individually readable.
        // The previous 8 viewport heights compressed the whole archive into a short run.
        end: () => `+=${innerHeight * 24}`,
        pin: true,
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: self => {
          state.value = self.progress;
          setScrollProgress(state.value);
        },
      });
      scrollTrigger = pageTurnTrigger;
      return () => {
        scrollTrigger = null;
        window.clearTimeout(idleTimer);
        scrollActive = false;
        updateInspectToggle();
      };
    });
  }

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: true,
    });
  } catch {
    canvas.hidden = true;
    section.classList.add("page-book-unavailable");
    inspectToggle && (inspectToggle.disabled = true);
    scrollMedia?.revert();
    return () => listenerController.abort();
  }

  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0xf4f4f1, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.06, 4.3);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x807563, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 1.15);
  fill.position.set(4, 1, 3);
  scene.add(fill);

  magazine = new LeafThroughObject({ renderer, camera, domElement: canvas }, {
    pages,
    layout: "auto",
    startPage: 0,
    pageAspect: 1.5625,
    preload: 3,
    loop: false,
    motion: { speed: 2, reducedMotion: "auto" },
    interaction: { drag: false, click: false, hold: false, hover: false, keyboard: false },
    lighting: { shadows: false, floorShadow: 0 },
    maxPixelRatio: 1.5,
  });
  magazine.enabled = false;
  magazine.scale.setScalar(innerWidth < 768 ? 1.42 : 1.4);
  scene.add(magazine);
  canvas.hidden = false;

  function scheduleFrame() {
    if (!frame && visible && !document.hidden && !disposed) frame = requestAnimationFrame(drawFrame);
  }

  function drawFrame(now) {
    frame = 0;
    if (disposed || !magazine || !visible || document.hidden) return;
    const turning = magazine.tick(now);
    renderer.render(scene, camera);

    if (navigationTarget !== null && !turning && magazine.visiblePages.includes(navigationTarget)) {
      navigationTarget = null;
      currentPage = magazine.page;
      updateInspectToggle();
      continueNavigation();
    }
    updateInspectToggle();
    if (turning || navigationTarget !== null) scheduleFrame();
  }

  magazine.addEventListener("change", scheduleFrame);
  magazine.addEventListener("ready", () => {
    currentPage = magazine.page;
    requestedPage = currentPage;
    updateInspectToggle();
    scheduleFrame();
  });
  magazine.addEventListener("error", event => {
    console.warn("Jikji page unavailable:", event.detail?.page, event.detail?.error);
  });

  function resizeRenderer() {
    const bounds = stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
    magazine.scale.setScalar(innerWidth < 768 ? 1.42 : 1.4);
    setMagnifierVisible(false);
    scheduleFrame();
  }

  const resizeObserver = new ResizeObserver(resizeRenderer);
  resizeObserver.observe(stage);
  const intersection = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) {
      scheduleFrame();
      if (inspectToggle && !motion.matches && !inspectToggle.classList.contains("page-book-inspect-pulse")) {
        inspectToggle.classList.add("page-book-inspect-pulse");
      }
    }
  });
  inspectToggle?.addEventListener("animationend", event => {
    if (event.animationName === "page-book-mint-pulse") inspectToggle.classList.remove("page-book-inspect-pulse");
  }, { signal });
  intersection.observe(section);
  document.addEventListener("visibilitychange", scheduleFrame, { signal });
  resizeRenderer();

  function cleanup() {
    if (disposed) return;
    disposed = true;
    listenerController.abort();
    window.clearTimeout(idleTimer);
    if (frame) cancelAnimationFrame(frame);
    scrollMedia?.revert();
    resizeObserver.disconnect();
    intersection.disconnect();
    magazine?.dispose();
    renderer?.dispose();
  }

  canvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    cleanup();
    canvas.hidden = true;
    section.classList.add("page-book-unavailable");
  }, { signal });
  window.addEventListener("pagehide", event => {
    if (!event.persisted) cleanup();
  }, { once: true, signal });

  return cleanup;
}
