import * as THREE from 'three';

let scene, camera, renderer, particles, geometry, particleMaterial;
let heroSection;
let archiveSection;

let mouseX = 0;
let mouseY = 0;
let autoRotation = 0;

const particleCount = 10000;

const randomPositions = new Float32Array(particleCount * 3);
const linePositions = new Float32Array(particleCount * 3);
const currentPositions = new Float32Array(particleCount * 3);
const sparkleValues = new Float32Array(particleCount);

let scrollProgress = 0;
let targetScrollProgress = 0;

let viewportWidth = 0;
let viewportHeight = 0;

const isReady = init();

if (isReady) {
    animate();
}

function init() {
    heroSection = document.getElementById('heroSection');
    archiveSection = document.querySelector('.archive');

    const viewportSize = getViewportSize();
    viewportWidth = viewportSize.width;
    viewportHeight = viewportSize.height;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        viewportWidth / viewportHeight,
        1,
        3000
    );

    camera.position.z = 1000;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // 흩어진 상태의 점 위치
        randomPositions[i3] = (Math.random() - 0.5) * 2800;
        randomPositions[i3 + 1] = (Math.random() - 0.5) * 2800;
        randomPositions[i3 + 2] = (Math.random() - 0.5) * 2000;

        // 선 위치는 화면 크기 기준으로 나중에 계산
        linePositions[i3] = 0;
        linePositions[i3 + 1] = 0;
        linePositions[i3 + 2] = 0;

        // 처음에는 랜덤 위치에서 시작
        currentPositions[i3] = randomPositions[i3];
        currentPositions[i3 + 1] = randomPositions[i3 + 1];
        currentPositions[i3 + 2] = randomPositions[i3 + 2];

        // 점마다 다른 반짝임 타이밍
        sparkleValues[i] = Math.random();
    }

    updateLinePositions();

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('sparkle', new THREE.BufferAttribute(sparkleValues, 1));

    particleMaterial = new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,

        uniforms: {
            uTime: { value: 0 },

            // 흩어진 상태의 점 크기
            uSize: { value: 0.7 },

            // 선으로 모였을 때의 점 크기
            uLineSize: { value: 1.2 },

            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            uSparkleStrength: { value: 1 }
        },

        vertexShader: `
            attribute float sparkle;

            uniform float uTime;
            uniform float uSize;
            uniform float uLineSize;
            uniform float uPixelRatio;
            uniform float uSparkleStrength;

            varying float vTwinkle;
            varying float vSparkleStrength;

            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

                float twinkle = sin(uTime * (2.0 + sparkle * 10.0) + sparkle * 50.0);
                twinkle = smoothstep(0.1, 1.0, twinkle);

                vSparkleStrength = uSparkleStrength;

                // 반짝임 강도
                vTwinkle = 1.0 + twinkle * 1.2 * uSparkleStrength;

                // 흩어진 상태에서는 반짝이는 크기,
                // 선 상태에서는 고정된 흰색 라인 크기 유지
                float finalSize = mix(uLineSize, uSize * vTwinkle, uSparkleStrength);

                gl_PointSize = finalSize * uPixelRatio * (1000.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,

        fragmentShader: `
            varying float vTwinkle;
            varying float vSparkleStrength;

            void main() {
                vec2 uv = gl_PointCoord - vec2(0.5);
                float dist = length(uv);

                // 기본 흰색 원형 점
                float circle = 1.0 - smoothstep(0.2, 0.5, dist);

                // 가로 빛 번짐
                float horizontal = 1.0 - smoothstep(0.0, 0.035, abs(uv.y));
                horizontal *= 1.0 - smoothstep(0.05, 0.5, abs(uv.x));

                // 세로 빛 번짐
                float vertical = 1.0 - smoothstep(0.0, 0.035, abs(uv.x));
                vertical *= 1.0 - smoothstep(0.05, 0.5, abs(uv.y));

                // 별 모양 빛
                float sparkleShape = max(circle, max(horizontal, vertical) * 0.55);

                // 기본 원형 점은 항상 유지하고,
                // 별빛 번짐만 스크롤에 따라 켜고 끔
                float alpha = mix(circle, sparkleShape * vTwinkle, vSparkleStrength);

                gl_FragColor = vec4(vec3(1.0), alpha);
            }
        `
    });

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.domElement.classList.add('three-canvas');
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(viewportWidth, viewportHeight);

    heroSection.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onWheel);
    window.addEventListener('resize', onWindowResize);

    return true;
}

function getViewportSize() {
    const rect = heroSection.getBoundingClientRect();

    return {
        width: Math.max(1, Math.round(rect.width || window.innerWidth)),
        height: Math.max(1, Math.round(rect.height || window.innerHeight))
    };
}

function syncViewportSize() {
    const viewportSize = getViewportSize();

    const newWidth = viewportSize.width;
    const newHeight = viewportSize.height;

    // 크기가 그대로면 다시 계산하지 않음
    if (newWidth === viewportWidth && newHeight === viewportHeight) return;

    viewportWidth = newWidth;
    viewportHeight = newHeight;

    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(viewportWidth, viewportHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (particleMaterial) {
        particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }

    updateLinePositions();
}

function updateLinePositions() {
    const distance = camera.position.z;

    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
    const visibleWidth = visibleHeight * camera.aspect;

    // 화면 끝에서 끝까지 이어지도록 살짝 더 길게 설정
    const lineWidth = visibleWidth * 1.08;
    const spacing = lineWidth / (particleCount - 1);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        linePositions[i3] = -lineWidth / 2 + i * spacing;
        linePositions[i3 + 1] = 0;
        linePositions[i3 + 2] = 0;
    }
}

function onMouseMove(e) {
    const rect = heroSection.getBoundingClientRect();

    mouseX = e.clientX - (rect.left + rect.width / 2);
    mouseY = e.clientY - (rect.top + rect.height / 2);
}

function onWheel(e) {
    syncViewportSize();

    if (e.deltaY > 0) {
        targetScrollProgress = 1;
    } else if (e.deltaY < 0) {
        targetScrollProgress = 0;
    }

    const text = document.getElementById('heroText');
    const hint = document.getElementById('hint');

    if (text) {
        text.style.opacity = targetScrollProgress === 1 ? '0' : '1';
    }

    if (hint) {
        hint.style.opacity = targetScrollProgress === 1 ? '0.1' : '0.3';
    }

    if (archiveSection) {
        if (targetScrollProgress === 1) {
            archiveSection.classList.add('active');
        } else {
            archiveSection.classList.remove('active');
        }
    }
}

    const text = document.getElementById('heroText');
    const hint = document.getElementById('hint');

    if (text) {
        text.style.opacity = targetScrollProgress === 1 ? '0' : '1';
    }

    if (hint) {
        hint.style.opacity = targetScrollProgress === 1 ? '0.1' : '0.3';
    }

function onWindowResize() {
    syncViewportSize();
}

function animate() {
    requestAnimationFrame(animate);

    syncViewportSize();

    // 흩어진 상태에서 선 상태로 부드럽게 보간
    scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

    const positions = geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        const tx =
            randomPositions[i3] * (1 - scrollProgress) +
            linePositions[i3] * scrollProgress;

        const ty =
            randomPositions[i3 + 1] * (1 - scrollProgress) +
            linePositions[i3 + 1] * scrollProgress;

        const tz =
            randomPositions[i3 + 2] * (1 - scrollProgress) +
            linePositions[i3 + 2] * scrollProgress;

        const speed = scrollProgress > 0.5 ? 0.2 : 0.12;

        positions[i3] += (tx - positions[i3]) * speed;
        positions[i3 + 1] += (ty - positions[i3 + 1]) * speed;
        positions[i3 + 2] += (tz - positions[i3 + 2]) * speed;
    }

    geometry.attributes.position.needsUpdate = true;

    const influence = 1 - scrollProgress;

    autoRotation += 0.0005;
    particles.rotation.y = autoRotation * influence;

    camera.position.x += (mouseX * influence - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * influence - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // 반짝임 시간 업데이트
    particleMaterial.uniforms.uTime.value = performance.now() * 0.001;

    // 스크롤 내릴수록 반짝임 꺼짐
    particleMaterial.uniforms.uSparkleStrength.value = 1 - scrollProgress;

    renderer.render(scene, camera);
}