import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/+esm';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js/+esm';

/* =========================================================
   Tooth Planet 3D Model
   pages/characters.html 전용 GLB 모델 로더
========================================================= */

const canvasWrap = document.getElementById('toothPlanetCanvas');
const statusText = document.getElementById('planetModelStatus');

if (canvasWrap) {
  const modelPath = canvasWrap.dataset.model;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.15));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = false;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1;

  canvasWrap.appendChild(renderer.domElement);

  const planetRoot = new THREE.Group();
  scene.add(planetRoot);

  /* =========================
     Light
  ========================= */

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xbfeeff, 0.9);
  fillLight.position.set(-4, 2, 4);
  scene.add(fillLight);

  /* =========================
     Load GLB
  ========================= */

  const loader = new GLTFLoader();
  let loadedModel = null;

  loader.load(
    modelPath,
    (gltf) => {
      loadedModel = gltf.scene;

      loadedModel.traverse((child) => {
        if (!child.isMesh) return;

        child.castShadow = false;
        child.receiveShadow = false;
        child.frustumCulled = true;

        if (child.geometry) {
          child.geometry.computeBoundingSphere();
        }

        if (child.material) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];

          materials.forEach((mat) => {
            mat.needsUpdate = true;

            if ('flatShading' in mat) {
              mat.flatShading = true;
            }

            if ('roughness' in mat) {
              mat.roughness = 0.75;
            }

            if ('metalness' in mat) {
              mat.metalness = 0;
            }
          });
        }
      });

      centerAndScaleModel(loadedModel, 2.75);
      planetRoot.add(loadedModel);

      if (statusText) {
        statusText.style.display = 'none';
      }

      console.log('GLB 모델 로드 완료:', modelPath);
    },
    undefined,
    (error) => {
      console.error('GLB 모델 로드 실패:', error);

      if (statusText) {
        statusText.textContent =
          '3D 모델을 불러오지 못했습니다. Live Server 실행 여부와 GLB 경로를 확인하세요.';
      }
    }
  );

  function centerAndScaleModel(model, targetSize) {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);

    if (!maxSize || maxSize === 0) {
      console.warn('모델 크기를 계산할 수 없습니다.');
      return;
    }

    const scale = targetSize / maxSize;

    model.scale.setScalar(scale);

    model.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  /* =========================
     Resize
  ========================= */

  const rendererSize = new THREE.Vector2();

  function resizeRenderer() {
    const width = canvasWrap.clientWidth;
    const height = canvasWrap.clientHeight;

    if (!width || !height) return;

    renderer.getSize(rendererSize);

    if (rendererSize.x === width && rendererSize.y === height) return;

    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resizeRenderer, { passive: true });
  resizeRenderer();

/* =========================
   Interaction
   Drag Rotate Interaction
   자동 회전 없음 / 마우스로 직접 돌리는 방식
========================= */

const characterHero = document.getElementById('characterHero') || canvasWrap;

let targetRotX = 0;
let targetRotY = 0;
let currentRotX = 0;
let currentRotY = 0;

let velocityX = 0;
let velocityY = 0;

let isDragging = false;
let lastPointerX = 0;
let lastPointerY = 0;

let targetScrollY = 0;
let currentScrollY = 0;

let targetScale = 1;
let currentScale = 1;

let isVisible = true;
let isTabActive = !document.hidden;

canvasWrap.style.cursor = 'grab';
canvasWrap.style.touchAction = 'none';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScrollTarget() {
  if (!characterHero) return;

  const rect = characterHero.getBoundingClientRect();
  const progress = clamp(-rect.top / window.innerHeight, 0, 1);

  targetScrollY = progress * 0.28;
  targetScale = 1 - progress * 0.06;
}

/* =========================
   Pointer Drag
========================= */

canvasWrap.addEventListener('pointerdown', (event) => {
  isDragging = true;

  lastPointerX = event.clientX;
  lastPointerY = event.clientY;

  velocityX = 0;
  velocityY = 0;

  canvasWrap.style.cursor = 'grabbing';

  if (canvasWrap.setPointerCapture) {
    canvasWrap.setPointerCapture(event.pointerId);
  }
});

canvasWrap.addEventListener('pointermove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - lastPointerX;
  const deltaY = event.clientY - lastPointerY;

  lastPointerX = event.clientX;
  lastPointerY = event.clientY;

  /*
    드래그 감도
    숫자 키우면 더 확 돌아감
  */
  const rotateSpeed = 0.012;

  targetRotY += deltaX * rotateSpeed;
  targetRotX += deltaY * rotateSpeed;

  /*
    위아래 회전 제한
    너무 뒤집히지 않게 막음
  */
  targetRotX = clamp(targetRotX, -0.9, 0.9);

  /*
    관성용 속도 저장
  */
  velocityY = deltaX * rotateSpeed;
  velocityX = deltaY * rotateSpeed;
});

canvasWrap.addEventListener('pointerup', (event) => {
  isDragging = false;
  canvasWrap.style.cursor = 'grab';

  if (canvasWrap.releasePointerCapture) {
    canvasWrap.releasePointerCapture(event.pointerId);
  }
});

canvasWrap.addEventListener('pointercancel', () => {
  isDragging = false;
  canvasWrap.style.cursor = 'grab';
});

canvasWrap.addEventListener('pointerleave', () => {
  if (!isDragging) {
    canvasWrap.style.cursor = 'grab';
  }
});

/* =========================
   Scroll / Visibility
========================= */

window.addEventListener(
  'scroll',
  () => {
    updateScrollTarget();
  },
  { passive: true }
);

document.addEventListener('visibilitychange', () => {
  isTabActive = !document.hidden;
});

const observer = new IntersectionObserver(
  (entries) => {
    isVisible = entries[0]?.isIntersecting ?? true;
  },
  {
    threshold: 0.08,
  }
);

observer.observe(canvasWrap);

/* =========================
   Animation Loop
========================= */

let lastFrameTime = 0;
const fps = 60;
const frameInterval = 1000 / fps;

function animate(now) {
  requestAnimationFrame(animate);

  if (!isVisible || !isTabActive) return;

  if (now - lastFrameTime < frameInterval) return;
  lastFrameTime = now;

  resizeRenderer();

  currentScrollY += (targetScrollY - currentScrollY) * 0.08;
  currentScale += (targetScale - currentScale) * 0.08;

  /*
    마우스를 놓은 뒤 살짝 관성
    싫으면 이 블록 삭제해도 됨
  */
  if (!isDragging) {
    targetRotY += velocityY;
    targetRotX += velocityX;

    targetRotX = clamp(targetRotX, -0.9, 0.9);

    velocityY *= 0.92;
    velocityX *= 0.92;

    if (Math.abs(velocityY) < 0.0001) velocityY = 0;
    if (Math.abs(velocityX) < 0.0001) velocityX = 0;
  }

  /*
    보간값
    0.18~0.3 사이 추천
    숫자가 클수록 마우스에 더 즉각 반응
  */
  currentRotX += (targetRotX - currentRotX) * 0.22;
  currentRotY += (targetRotY - currentRotY) * 0.22;

  planetRoot.rotation.x = currentRotX;
  planetRoot.rotation.y = currentRotY;
  planetRoot.rotation.z = 0;

  planetRoot.position.y = -currentScrollY;
  planetRoot.scale.setScalar(currentScale);

  renderer.render(scene, camera);
}

updateScrollTarget();
requestAnimationFrame(animate);
}

const heroSection = document.getElementById('characterHero');
const starLayer1 = document.querySelector('.stars-1');
const starLayer2 = document.querySelector('.stars-2');
const starLayer3 = document.querySelector('.stars-3');
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');

if (heroSection && starLayer1 && starLayer2 && starLayer3 && glow1 && glow2) {
  heroSection.addEventListener(
    'pointermove',
    (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      starLayer1.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
      starLayer2.style.transform = `translate(${x * -16}px, ${y * -16}px)`;
      starLayer3.style.transform = `translate(${x * -26}px, ${y * -26}px)`;

      glow1.style.transform = `translate(${x * -18}px, ${y * -18}px)`;
      glow2.style.transform = `translate(${x * -28}px, ${y * -28}px)`;
    },
    { passive: true }
  );

  heroSection.addEventListener(
    'pointerleave',
    () => {
      starLayer1.style.transform = 'translate(0, 0)';
      starLayer2.style.transform = 'translate(0, 0)';
      starLayer3.style.transform = 'translate(0, 0)';
      glow1.style.transform = 'translate(0, 0)';
      glow2.style.transform = 'translate(0, 0)';
    },
    { passive: true }
  );
}