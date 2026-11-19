import * as THREE from "./vendor/three.module.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";

export function initSpecialistModels(canvas, paths = []) {
  if (!canvas || !paths.length) return { setProgress() {}, destroy() {} };

  const status = canvas.parentElement.querySelector(".spec-model-status");
  let renderer;
  let rendererUnavailable = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.35, 5.4);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x77766f, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.8);
  rim.position.set(4, 2, -3);
  scene.add(rim);

  const root = new THREE.Group();
  scene.add(root);
  const loader = new GLTFLoader();
  let currentModel = null;
  let currentIndex = -1;
  let requestedIndex = 0;
  let loading = false;
  let failedIndex = -1;
  let angle = 0;
  let progress = 0;
  let disposed = false;
  let visible = false;
  const section = canvas.closest("#specialist");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function resize() {
    if (disposed || !visible || !ensureRenderer()) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  function ensureRenderer() {
    if (renderer) return true;
    if (rendererUnavailable || disposed) return false;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      return true;
    } catch (error) {
      rendererUnavailable = true;
      if (status) {
        status.hidden = false;
        status.textContent = "3D 모델을 표시할 수 없습니다.";
      }
      console.warn("Specialist 3D renderer unavailable:", error);
      return false;
    }
  }

  function disposeModel(model) {
    model.traverse(object => {
      object.geometry?.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.filter(Boolean).forEach(material => {
        Object.values(material).filter(value => value?.isTexture).forEach(texture => texture.dispose());
        material.dispose();
      });
    });
  }

  function showModel(model, index) {
    if (currentModel) {
      root.remove(currentModel);
      disposeModel(currentModel);
    }
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.scale.setScalar(2.1 / Math.max(size.x, size.y, size.z, 0.001));
    if (index === 2) model.rotation.y = Math.PI / 2;
    root.add(model);
    currentModel = model;
    currentIndex = index;
    if (status) status.hidden = true;
    render();
  }

  async function loadRequestedModel() {
    if (loading || disposed || !visible || !ensureRenderer() || currentIndex === requestedIndex || failedIndex === requestedIndex) return;
    loading = true;
    const index = requestedIndex;
    if (status) {
      status.hidden = false;
      status.textContent = "3D 모델을 불러오는 중입니다.";
    }
    try {
      const gltf = await loader.loadAsync(paths[index]);
      if (disposed) {
        disposeModel(gltf.scene);
        return;
      }
      if (index !== requestedIndex) {
        disposeModel(gltf.scene);
      } else {
        failedIndex = -1;
        showModel(gltf.scene, index);
      }
    } catch (error) {
      failedIndex = index;
      if (index === requestedIndex && status) status.textContent = "3D 모델을 불러오지 못했습니다.";
      console.warn("Specialist model unavailable:", paths[index], error);
    } finally {
      loading = false;
      if (!disposed && currentIndex !== requestedIndex && failedIndex !== requestedIndex) loadRequestedModel();
    }
  }

  function render() {
    if (disposed || !visible || !ensureRenderer()) return;
    root.rotation.y = angle;
    renderer.render(scene, camera);
  }

  function setProgress(value) {
    progress = Math.max(0, Math.min(0.999999, value));
    const position = progress * paths.length;
    const nextIndex = Math.min(paths.length - 1, Math.floor(position));
    angle = position * Math.PI * 2;
    if (requestedIndex !== nextIndex) {
      requestedIndex = nextIndex;
      if (failedIndex !== nextIndex) failedIndex = -1;
    }
    if (visible && currentIndex !== requestedIndex) loadRequestedModel();
    render();
  }

  function updateNaturalScroll() {
    if (window.innerWidth > 880 || reducedMotion.matches || !section) return;
    const bounds = section.getBoundingClientRect();
    setProgress((window.innerHeight - bounds.top) / (bounds.height + window.innerHeight));
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) {
      resize();
      if (currentIndex !== requestedIndex) loadRequestedModel();
      render();
    }
  }, { rootMargin: "400px 0px" });
  intersectionObserver.observe(section || canvas);
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", updateNaturalScroll, { passive: true });
  reducedMotion.addEventListener("change", updateNaturalScroll);
  setProgress(0);
  updateNaturalScroll();

  return {
    setProgress,
    destroy() {
      disposed = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateNaturalScroll);
      reducedMotion.removeEventListener("change", updateNaturalScroll);
      if (currentModel) disposeModel(currentModel);
      renderer?.dispose();
    },
  };
}
