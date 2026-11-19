/* A custom monochrome mascot, built from geometry.
   No assets or character models are copied from the reference website.
   Three.js r160 (MIT) is served locally; no build step is required. */
import * as THREE from "./vendor/three.module.js";

export async function initCharacter(viewer, config = {}) {
  const stage = viewer.querySelector(".character-stage");
  const canvas = viewer.querySelector("canvas");
  const status = viewer.querySelector(".character-help");
  const copy = config.copy;
  const buttons = [...viewer.querySelectorAll("button")];
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 1.35, 7.4);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x889381, 2.5));
  const key = new THREE.DirectionalLight(0xffffff, 3.5);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 2);
  rim.position.set(4, 2, -3);
  scene.add(rim);

  const pearl = new THREE.MeshStandardMaterial({ color: 0xe9eee3, roughness: 0.33, metalness: 0.05 });
  const soft = new THREE.MeshStandardMaterial({ color: 0xc3ccbc, roughness: 0.55 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x252d27, roughness: 0.4 });
  const silver = new THREE.MeshStandardMaterial({ color: 0xaebba8, roughness: 0.45, metalness: 0.15 });
  const sphere = new THREE.SphereGeometry(1, 48, 32);
  const mascot = new THREE.Group();
  scene.add(mascot);
  function blob(parent, material, position, scale) {
    const mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    parent.add(mesh);
    return mesh;
  }
  // Rounded head, small ears, body, feet and arms.
  blob(mascot, pearl, [0, 0.55, 0], [1.04, 0.88, 0.79]);
  blob(mascot, pearl, [-0.77, 1.22, -0.03], [0.3, 0.33, 0.24]);
  blob(mascot, pearl, [0.77, 1.22, -0.03], [0.3, 0.33, 0.24]);
  blob(mascot, soft, [-0.77, 1.23, 0.18], [0.16, 0.18, 0.055]);
  blob(mascot, soft, [0.77, 1.23, 0.18], [0.16, 0.18, 0.055]);
  blob(mascot, soft, [0, -0.6, -0.08], [0.64, 0.71, 0.49]);
  blob(mascot, pearl, [0, -0.51, 0.34], [0.39, 0.43, 0.12]);
  blob(mascot, silver, [-0.37, -1.15, 0.16], [0.32, 0.2, 0.45]);
  blob(mascot, silver, [0.37, -1.15, 0.16], [0.32, 0.2, 0.45]);
  const leftArm = blob(mascot, soft, [-0.68, -0.47, 0], [0.23, 0.45, 0.24]);
  leftArm.rotation.z = -0.33;
  const rightArm = blob(mascot, soft, [0.68, -0.32, 0], [0.23, 0.45, 0.24]);
  rightArm.rotation.z = -0.62;
  blob(mascot, dark, [-0.36, 0.61, 0.721], [0.082, 0.117, 0.052]);
  blob(mascot, dark, [0.36, 0.61, 0.721], [0.082, 0.117, 0.052]);
  blob(mascot, pearl, [-0.382, 0.65, 0.765], [0.022, 0.027, 0.016]);
  blob(mascot, pearl, [0.338, 0.65, 0.765], [0.022, 0.027, 0.016]);
  blob(mascot, soft, [-0.58, 0.38, 0.67], [0.13, 0.065, 0.026]);
  blob(mascot, soft, [0.58, 0.38, 0.67], [0.13, 0.065, 0.026]);
  const smile = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, 0.29, 0.775),
    new THREE.Vector3(0, 0.23, 0.795),
    new THREE.Vector3(0.15, 0.29, 0.775),
  ]);
  const mouth = new THREE.Mesh(new THREE.TubeGeometry(smile, 24, 0.022, 8, false), dark);
  mascot.add(mouth);
  // Back detail makes the full 360-degree rotation readable.
  blob(mascot, pearl, [0, -0.69, -0.53], [0.23, 0.23, 0.23]);

  if (config.variant === "long-ears" && !config.model) {
    // Distinct temporary second character until its own model is supplied.
    mascot.children[1].position.set(-0.5, 1.55, -0.03);
    mascot.children[1].scale.set(0.22, 0.65, 0.23);
    mascot.children[2].position.set(0.5, 1.55, -0.03);
    mascot.children[2].scale.set(0.22, 0.65, 0.23);
    mascot.children[3].position.set(-0.5, 1.57, 0.18);
    mascot.children[3].scale.set(0.1, 0.43, 0.045);
    mascot.children[4].position.set(0.5, 1.57, 0.18);
    mascot.children[4].scale.set(0.1, 0.43, 0.045);
    camera.position.set(0, 1.55, 8.4);
    camera.lookAt(0, 0.3, 0);
  }
  if (config.model) {
    try {
      const { GLTFLoader } = await import("./vendor/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync(config.model);
      const bounds = new THREE.Box3().setFromObject(gltf.scene);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const fit = (config.modelScale || 1.8) / Math.max(size.x, size.y, size.z);
      gltf.scene.position.sub(center);
      const normalized = new THREE.Group();
      normalized.add(gltf.scene);
      normalized.scale.setScalar(fit);
      mascot.clear();
      mascot.add(normalized);
    } catch (error) {
      renderer.dispose();
      throw error;
    }
  }

  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const context = shadowCanvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 62);
  gradient.addColorStop(0, "rgba(35,45,34,0.24)");
  gradient.addColorStop(1, "rgba(35,45,34,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const shadowMap = new THREE.CanvasTexture(shadowCanvas);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.1),
    new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.4;
  scene.add(shadow);

  let yaw = 0;
  let pitch = 0;
  let auto = false;
  let visible = false;
  let dragging = false;
  let pointerX = 0;
  let pointerY = 0;
  let frame = 0;
  let lastTime = 0;
  let activeTime = 0;
  let disposed = false;
  function render() {
    if (disposed) return;
    const scrollAngle = window.characterStoryState?.[viewer.dataset.characterKey] || 0;
    mascot.rotation.set(pitch, yaw + scrollAngle, 0);
    renderer.render(scene, camera);
  }
  viewer.characterControls = {
    resetToFront() {
      stopAuto();
      yaw = 0;
      pitch = 0;
      render();
    },
  };
  function tick(time) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    if (!motion.matches) {
      activeTime += delta;
      if (auto && !dragging) yaw += delta * 0.38;
      mascot.position.y = Math.sin(activeTime * 1.6) * 0.045;
      if (!config.model) rightArm.rotation.z = -0.62 + Math.sin(activeTime * 1.6) * 0.06;
    }
    render();
    if (!motion.matches || (auto && !dragging)) frame = requestAnimationFrame(tick);
  }
  function wake() {
    if (!frame && visible && !document.hidden && !disposed) frame = requestAnimationFrame(tick);
  }
  function stopAuto() {
    auto = false;
    viewer.querySelector('[data-character-action="auto"]').setAttribute("aria-pressed", "false");
  }
  const resizeObserver = new ResizeObserver(() => {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  });
  resizeObserver.observe(stage);
  const intersection = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    lastTime = 0;
    if (visible) wake();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  intersection.observe(stage);
  stage.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    stopAuto();
    dragging = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
    stage.classList.add("is-dragging");
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointermove", event => {
    if (!dragging) return;
    yaw += (event.clientX - pointerX) * 0.012;
    if (event.pointerType === "mouse") {
      pitch = THREE.MathUtils.clamp(pitch + (event.clientY - pointerY) * 0.006, -0.35, 0.35);
    }
    pointerX = event.clientX;
    pointerY = event.clientY;
    render();
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(name => stage.addEventListener(name, () => {
    dragging = false;
    stage.classList.remove("is-dragging");
  }));
  stage.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) return;
    event.preventDefault();
    stopAuto();
    if (event.key === "Home") { yaw = 0; pitch = 0; }
    else yaw += event.key === "ArrowLeft" ? -0.22 : 0.22;
    render();
  });
  buttons.forEach(button => {
    button.disabled = false;
    button.addEventListener("click", () => {
      switch (button.dataset.characterAction) {
        case "auto":
          auto = !auto;
          button.setAttribute("aria-pressed", String(auto));
          wake();
          break;
        case "reset":
          stopAuto();
          yaw = 0;
          pitch = 0;
          mascot.position.y = 0;
          render();
          break;
        default:
          stopAuto();
          yaw += button.dataset.characterAction === "left" ? -0.4 : 0.4;
          render();
      }
    });
  });
  motion.addEventListener("change", () => {
    stopAuto();
    mascot.position.y = 0;
    lastTime = 0;
    render();
    wake();
  });
  document.addEventListener("visibilitychange", () => {
    lastTime = 0;
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else wake();
  });
  canvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    frame = 0;
    disposed = true;
    viewer.dataset.characterState = "fallback";
    canvas.hidden = true;
    buttons.forEach(button => { button.disabled = true; });
    status.textContent = copy.interrupted;
  });
  window.addEventListener("pagehide", event => {
    if (event.persisted) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersection.disconnect();
    const geometries = new Set();
    const materials = new Set();
    scene.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) materials.add(object.material);
    });
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    shadowMap.dispose();
    renderer.dispose();
  });
  canvas.hidden = false;
  viewer.dataset.characterState = "ready";
  status.textContent = config.model ? copy.ready : copy.temporary;
  render();
}
