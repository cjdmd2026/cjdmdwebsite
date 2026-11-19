/* Scroll-driven intro title and supplied 3D notebook model. */
import * as THREE from "./vendor/three.module.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";

export function initBookIntro(modelPath) {
  const hero = document.querySelector("#intro");
  if (!hero) return;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const leftWord = hero.querySelector(".book-word--left");
  const rightWord = hero.querySelector(".book-word--right");
  const caption = hero.querySelector(".book-intro__caption");
  const stage = hero.querySelector(".book-scene");
  const canvas = hero.querySelector(".book-canvas");
  hero.querySelectorAll(".book-title img").forEach(image => {
    image.addEventListener("load", () => update(progress), { once: true });
  });
  let progress = motion.matches ? 1 : 0;
  let renderModel = () => {};
  let renderer;
  let disposed = false;
  let visible = true;
  let scrollMedia;

  function update(value) {
    progress = value;
    const opening = Math.min(value / 0.78, 1);
    const eased = opening * opening * (3 - 2 * opening);
    const clamp01 = amount => Math.max(0, Math.min(1, amount));
    const smooth = amount => {
      const t = clamp01(amount);
      return t * t * (3 - 2 * t);
    };
    const logoMerge = smooth((value - 0.25) / 0.75);
    const bookFade = smooth((value - 0.35) / 0.3);
    const title = leftWord.parentElement;
    const titleGap = parseFloat(getComputedStyle(title).gap) || 0;
    const safeGap = Math.max(0, innerWidth / 2 - (leftWord.offsetWidth + rightWord.offsetWidth + titleGap) / 2 - 20);
    const gap = Math.min(innerWidth * 0.28, 420, safeGap);
    const small = innerWidth < 700;
    leftWord.style.transform = "translateX(" + (-(1 - logoMerge) * gap) + "px)";
    rightWord.style.transform = "translateX(" + ((1 - logoMerge) * gap) + "px)";
    leftWord.style.opacity = String(logoMerge);
    rightWord.style.opacity = String(logoMerge);
    hero.classList.toggle("intro-logo-effect", value >= 1 && logoMerge >= 1);
    hero.style.setProperty("--book-title-y", small ? "-135px" : "-18px");
    caption.style.opacity = String(0.65 + 0.35 * eased);
    stage.style.opacity = String(1 - bookFade);
    stage.style.transform = "scale(1)";
    renderModel(value, eased);
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    scrollMedia = window.gsap.matchMedia();
    scrollMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { value: 0 };
      window.gsap.to(state, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          id: "book-intro",
          trigger: hero,
          start: "top top",
          end: () => "+=" + innerHeight * (innerWidth < 700 ? 2.8 : 3.4),
          pin: true,
          scrub: 0.55,
          invalidateOnRefresh: true,
          onLeave: () => window.dispatchEvent(new Event("jikji:intro-ended")),
        },
        onUpdate: () => update(state.value),
      });
      return () => update(1);
    });
  } else {
    progress = 1;
  }

  const navigation = [document.querySelector("#header"), document.querySelector(".section-nav")].filter(Boolean);
  let navigationFrame = 0;
  function updateNavigation() {
    navigationFrame = 0;
    const active = hero.getBoundingClientRect().bottom > 100;
    document.body.classList.toggle("intro-active", active);
    navigation.forEach(element => { element.inert = active; });
  }
  updateNavigation();
  window.addEventListener("scroll", () => {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
  }, { passive: true });
  window.addEventListener("resize", updateNavigation);

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    canvas.hidden = true;
    update(progress);
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
  camera.position.set(0, 0.55, 6.1);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x807563, 2.8));
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 1.7);
  fill.position.set(4, 1, 3);
  scene.add(fill);

  const pivot = new THREE.Group();
  scene.add(pivot);
  renderModel = (value, eased) => {
    if (!pivot || disposed) return;
    const canSpin = !motion.matches && window.gsap && window.ScrollTrigger;
    const spin = canSpin ? Math.min(value / 0.65, 1) * Math.PI * 4 : 0;
    pivot.rotation.set(-0.06, -0.24 + spin, 0.035);
    pivot.scale.setScalar(0.94 + eased * 0.06);
    if (visible && !document.hidden) renderer.render(scene, camera);
  };

  function resizeRenderer() {
    const bounds = stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
    renderModel(progress, Math.min(progress / 0.78, 1));
  }
  const resizeObserver = new ResizeObserver(resizeRenderer);
  resizeObserver.observe(stage);
  const intersection = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) renderModel(progress, Math.min(progress / 0.78, 1));
  });
  intersection.observe(hero);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) renderModel(progress, Math.min(progress / 0.78, 1));
  });

  new GLTFLoader().load(modelPath, gltf => {
    if (disposed) return;
    const bounds = new THREE.Box3().setFromObject(gltf.scene);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
    const normalized = new THREE.Group();
    normalized.add(gltf.scene);
    normalized.scale.setScalar(2.35 / Math.max(size.x, size.y, size.z));
    pivot.add(normalized);
    canvas.hidden = false;
    hero.classList.add("book-model-ready");
    resizeRenderer();
    renderModel(progress, Math.min(progress / 0.78, 1));
  }, undefined, error => {
    canvas.hidden = true;
    console.warn("Intro notebook model unavailable:", error);
  });

  canvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    disposed = true;
    scrollMedia?.revert();
    canvas.hidden = true;
    hero.classList.remove("book-model-ready");
  });
  window.addEventListener("pagehide", event => {
    if (event.persisted) return;
    disposed = true;
    scrollMedia?.revert();
    resizeObserver.disconnect();
    intersection.disconnect();
    const geometries = new Set();
    const materials = new Set();
    const textures = new Set();
    scene.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) {
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          materials.add(material);
          Object.values(material).filter(value => value?.isTexture).forEach(texture => textures.add(texture));
        }
      }
    });
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    textures.forEach(texture => texture.dispose());
    renderer.dispose();
  });

  update(progress);
}
