/* ======================================================================
   thread-crosshair-mask.js — 실처럼 휘어지는 십자 커서 / 배경 반전 마스킹 버전

   HTML에 다음 한 줄을 연결하면 됩니다.
   <script src="./js/thread-crosshair-mask.js" defer></script>

   Canvas와 필요한 스타일을 자동 생성합니다. 외부 라이브러리가 필요 없습니다.
   원본의 실 물리/곡선은 유지하고, 흰 실 + CSS mix-blend-mode: difference를 적용합니다.
   실과 교차점이 그려진 부분만 반전됩니다. 투명한 나머지 영역은 바뀌지 않습니다.
   밝은 배경에는 어두운 실, 어두운 배경에는 밝은 실이 보입니다.
   이미지/영상 위에서도 그 위치에 실제 그려진 배경과 합성됩니다.
   중간 회색은 반전 전후의 명도 차가 작으므로 대비가 낮을 수 있습니다.
   페이지 레이아웃/클릭/스크롤/키보드 단축키를 변경하지 않습니다.
   문서 배경이 완전히 투명한 경우에만 브라우저 기본 Canvas 배경색을 보완합니다.
   기존 thread-crosshair.js 대신 이 파일 하나만 연결하세요.

   실행 중 설정 변경:
     window.threadCursor.settings.flutter = 0.88;
     window.threadCursor.settings.softness = 0.86;
     window.threadCursor.settings.thickness = 1.2;
     window.threadCursor.setPreset('airy'); // delicate | balanced | airy
     window.threadCursor.setBlendMode('normal');     // 기존 보라/분홍 색상
     window.threadCursor.setBlendMode('difference'); // 배경 반전으로 복귀
     window.threadCursor.destroy();        // 효과 제거 + 원래 커서 복원

   OPTIONS.blendMode: 'difference'가 반전 모드입니다. 'normal'은 기존 색상입니다.
   OPTIONS.theme / colors는 normal 모드 또는 blend 미지원 환경에서만 사용합니다.
   CSS blend 설명: https://www.w3.org/TR/compositing-1/#blendingdifference
   ====================================================================== */
(() => {
  'use strict';

  function init() {
    // ── 기본 설정: 이 부분만 수정하면 됩니다. ──
    const SETTINGS = {
      flutter: 0.48,     // 0~1: 흔들림. 높을수록 바람에 더 많이 흔들립니다.
      softness: 0.68,    // 0~1: 유연함. 높을수록 더 느슨하고 늦게 따라옵니다.
      thickness: 0.2    // 실 두께 (CSS px)
    };
    const OPTIONS = {
      blendMode: 'difference', // 'difference': 배경 반전 / 'normal': 기존 컬러
      edgeOpacity: 1,         // 반전 모드 끝부분 불투명도. 1: 또렷 / 0.7: 은은
      ensurePageBackdrop: true, // 투명한 문서의 기본 배경만 보완 (제거 시 복원)
      hideNativeCursor: true, // false: 기본 마우스 커서도 함께 표시
      clickPulse: true,       // 빈 곳을 누르면 실에 파동 발생
      touchEnabled: true,     // 터치하는 동안에도 표시. false: 마우스/펜만 사용
      theme: 'auto',          // 'auto' | 'light' | 'dark'
      zIndex: 999998,
      maxDpr: 2,
      colors: {
        light: { x: '121,96,177', y: '200,126,155', point: '#534361' },
        dark:  { x: '187,165,238', y: '226,163,187', point: '#eee9f3' }
      }
    };
    const PRESETS = {
      delicate: { flutter: 0.24, softness: 0.48, thickness: 0.9 },
      balanced: { flutter: 0.48, softness: 0.68, thickness: 1.2 },
      airy:     { flutter: 0.88, softness: 0.86, thickness: 1.2 }
    };
    const COUNT = 44;                      // 각 방향의 질점 수. 총 176개.
    const FIXED_STEP = 1 / 120;            // 화면 주사율과 물리 계산을 분리.
    const EDGE_MARGIN = 48;               // 화면 밖까지 그려 모서리 끊김 방지.
    const TAU = Math.PI * 2;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothstep = (a, b, x) => {
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    // 이미 연결되어 있다면 중복 생성하지 않습니다.
    const CANVAS_ID = 'thread-crosshair-overlay';
    const CURSOR_CLASS = 'thread-crosshair-active';
    if (document.getElementById(CANVAS_ID)) return;

    const canvas = document.createElement('canvas');
    canvas.id = CANVAS_ID;
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'fixed', inset: '0', display: 'block',
      width: '100%', height: '100%', margin: '0', padding: '0',
      border: '0', background: 'transparent',
      pointerEvents: 'none', zIndex: String(OPTIONS.zIndex),
      mixBlendMode: 'normal', isolation: 'auto',
      opacity: '1', filter: 'none', transform: 'none'
    });
    canvas.style.setProperty('pointer-events', 'none', 'important');
    const blendSupported = Boolean(window.CSS && window.CSS.supports('mix-blend-mode', 'difference'));
    let masking = false;
    function applyBlendMode(mode) {
      if (mode !== 'difference' && mode !== 'normal') return false;
      OPTIONS.blendMode = mode;
      masking = mode === 'difference' && blendSupported;
      canvas.style.setProperty('mix-blend-mode', masking ? 'difference' : 'normal', 'important');
      return mode === 'normal' || blendSupported;
    }
    applyBlendMode(OPTIONS.blendMode);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return; // Canvas를 지원하지 않으면 원래 커서를 그대로 사용합니다.

    const style = document.createElement('style');
    style.id = 'thread-crosshair-style';
    style.textContent = `
      html.${CURSOR_CLASS}, html.${CURSOR_CLASS} * {
        cursor: none !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
    // body의 transform / isolation / opacity에 의한 합성 경계를 피합니다.
    // 페이지 내부 래퍼에 넣지 않고 최상위에 고정해 실제 페이지와 합성합니다.
    document.documentElement.appendChild(canvas);

    // 완전히 투명한 문서에서는 브라우저의 흰 기본 바탕이 CSS 합성 배경에
    // 포함되지 않을 수 있습니다. 배경을 지정하지 않은 문서에만 기본색을 보완.
    // 사이트의 명시적인 배경색/이미지는 덮어쓰지 않고 destroy() 시 복원합니다.
    const BACKDROP_CLASS = 'thread-crosshair-default-backdrop';
    function isTransparent(value) {
      return value === 'transparent' || /^rgba\([^)]*,\s*0(?:\.0+)?\s*\)$/.test(value);
    }
    if (OPTIONS.ensurePageBackdrop && blendSupported) {
      style.textContent += `
        html.${BACKDROP_CLASS} { background-color: Canvas; }
      `;
    }
    function refreshBackdrop() {
      const root = document.documentElement;
      root.classList.remove(BACKDROP_CLASS);
      if (!OPTIONS.ensurePageBackdrop || !blendSupported) return;
      const rootStyle = getComputedStyle(root);
      const bodyStyle = getComputedStyle(document.body);
      if (isTransparent(rootStyle.backgroundColor) && rootStyle.backgroundImage === 'none' &&
          isTransparent(bodyStyle.backgroundColor) && bodyStyle.backgroundImage === 'none') {
        root.classList.add(BACKDROP_CLASS);
      }
    }
    refreshBackdrop();

    function setNativeCursorHidden(hidden) {
      document.documentElement.classList.toggle(
        CURSOR_CLASS, OPTIONS.hideNativeCursor && hidden
      );
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let lastTime = 0;
    let simulationTime = 0;
    let accumulator = 0;
    let animationId = 0;
    let disposed = false;
    let hasInteracted = false;
    // 마우스 위치를 알기 전에는 화면 중앙에 임의의 커서를 표시하지 않습니다.
    let visibility = 0;
    let targetVisibility = 0;
    let hoverAmount = 0;
    let isHovering = false;
    let dark = false;
    let pulseId = 0;
    let lastPulseTime = -10;
    const pulses = [];
    const pointer = { x: width * 0.56, y: height * 0.48 };
    const previousPointer = { ...pointer };
    const simulationPointer = { ...pointer };
    const eventController = new AbortController();
    const listenerOptions = { signal: eventController.signal };

    class Strand {
      constructor(axis, sign, phase) {
        this.axis = axis;
        this.sign = sign;
        this.phase = phase;
        this.positions = new Float64Array(COUNT + 1);
        this.velocities = new Float64Array(COUNT + 1);
        this.accelerations = new Float64Array(COUNT + 1);
        this.points = Array.from({ length: COUNT + 1 }, () => ({ x: 0, y: 0 }));
        this.reset();
      }
      reset() {
        this.positions.fill(this.axis === 'x' ? pointer.y : pointer.x);
        this.velocities.fill(0);
      }
      step(dt, time, anchor) {
        const cross = this.axis === 'x' ? anchor.y : anchor.x;
        if (reducedMotion) {
          this.positions.fill(cross);
          this.velocities.fill(0);
          return;
        }
        const { flutter, softness } = SETTINGS;
        const baseTension = 220 * Math.pow(0.15, softness);
        const coupling = 450 + (1 - softness) * 420;
        const dampingRatio = 0.73 - softness * 0.17;
        this.positions[0] = cross;
        this.velocities[0] = 0;

        // 먼저 전체 질점의 가속도를 계산한 뒤 한꺼번에 적분합니다.
        // 업데이트 순서에 따른 좌/우 비대칭을 피합니다.
        for (let i = 1; i <= COUNT; i++) {
          const s = i / COUNT;
          const envelope = smoothstep(0, .10, s) * (.48 + .52 * Math.sin(s * Math.PI * .88));
          const wind = flutter * envelope * (
            9.0 * Math.sin(time * 1.55 - s * 8.4 + this.phase) +
            4.3 * Math.sin(time * 2.35 - s * 15.8 + this.phase * 1.7) +
            1.7 * Math.sin(time * 3.70 + s * 24.0 + this.phase * .65)
          );
          const tension = baseTension * (.35 + .8 * Math.exp(-s * 4));
          const damping = 2 * Math.sqrt(tension) * dampingRatio + (1 - s) * 1.6;
          const left = this.positions[i - 1];
          const right = i === COUNT ? this.positions[i] : this.positions[i + 1];
          const laplacian = left + right - 2 * this.positions[i];
          this.accelerations[i] =
            (cross + wind - this.positions[i]) * tension +
            laplacian * coupling - this.velocities[i] * damping;
        }
        for (let i = 1; i <= COUNT; i++) {
          this.velocities[i] += this.accelerations[i] * dt;
          this.positions[i] += this.velocities[i] * dt;
        }
      }
      getPoints(time) {
        const along = this.axis === 'x' ? pointer.x : pointer.y;
        const cross = this.axis === 'x' ? pointer.y : pointer.x;
        const end = this.sign < 0 ? -EDGE_MARGIN : (this.axis === 'x' ? width : height) + EDGE_MARGIN;
        const maxBend = Math.max(110, Math.min(width, height) * .40);
        for (let i = 0; i <= COUNT; i++) {
          const s = i / COUNT;
          const a = lerp(along, end, s);
          // 고정점 근처는 접선을 수평/수직으로 만들어 날카로운 꺾임을 방지.
          const rootBlend = 1 - Math.exp(-Math.pow(s / .072, 2));
          const offset = maxBend * Math.tanh((this.positions[i] - cross) / maxBend);
          let wave = 0;
          if (!reducedMotion) {
            for (const pulse of pulses) {
              const age = time - pulse.time;
              const distance = s - age * .85;
              wave += Math.exp(-distance * distance / .009) *
                Math.sin(distance * 43 - age * 3 + this.phase * .25) *
                Math.exp(-age * 1.5) * 25 * pulse.sign * rootBlend;
            }
          }
          const b = cross + offset * rootBlend + wave;
          if (this.axis === 'x') { this.points[i].x = a; this.points[i].y = b; }
          else { this.points[i].x = b; this.points[i].y = a; }
        }
        // 부동소수점 오차 없이 교차점을 포인터 좌표에 고정합니다.
        this.points[0].x = pointer.x;
        this.points[0].y = pointer.y;
        return this.points;
      }
    }

    const strands = [
      new Strand('x', -1, .1),
      new Strand('x',  1, 1.5),
      new Strand('y', -1, 3.1),
      new Strand('y',  1, 4.3)
    ];

    // Canvas를 기기 픽셀 비율에 맞추되 2배로 제한해 불필요한 부하를 줄입니다.
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, OPTIONS.maxDpr);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!hasInteracted) {
        pointer.x = width * .56;
        pointer.y = height * .48;
      } else {
        pointer.x = clamp(pointer.x, 0, width);
        pointer.y = clamp(pointer.y, 0, height);
      }
      Object.assign(previousPointer, pointer);
      Object.assign(simulationPointer, pointer);
      for (const strand of strands) strand.reset();
    }

    // Catmull–Rom → cubic Bézier. 하나의 축은 끊기지 않는 단일 경로입니다.
    function drawCurve(points, color) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];
        ctx.bezierCurveTo(
          p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6,
          p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6,
          p2.x, p2.y
        );
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = SETTINGS.thickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    function threadGradient(axis) {
      // 흰색 source를 difference 합성하면 위치별 배경이 반전됩니다.
      // Canvas 내부 globalCompositeOperation이 아니라 DOM/CSS 합성을 사용해야
      // 페이지의 이미지/영상/배경에도 반전이 적용됩니다.
      const rgb = masking ? '255,255,255' : OPTIONS.colors[dark ? 'dark' : 'light'][axis];
      const edge = clamp(Number(OPTIONS.edgeOpacity) || 0, 0, 1);
      if (masking && edge === 1) return '#ffffff';
      const gradient = ctx.createLinearGradient(0, 0, axis === 'x' ? width : 0, axis === 'y' ? height : 0);
      gradient.addColorStop(0, `rgba(${rgb},${masking ? edge : .40})`);
      gradient.addColorStop(.17, `rgba(${rgb},${masking ? lerp(edge, 1, .7) : .80})`);
      gradient.addColorStop(.50, `rgba(${rgb},${masking ? 1 : .98})`);
      gradient.addColorStop(.83, `rgba(${rgb},${masking ? lerp(edge, 1, .7) : .80})`);
      gradient.addColorStop(1, `rgba(${rgb},${masking ? edge : .40})`);
      return gradient;
    }

    function render() {
      // 잔상 없이 매 프레임 새로 그립니다. DOM 위에 오버레이되지만 클릭은 가로채지 않습니다.
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = visibility;
      const left = strands[0].getPoints(simulationTime);
      const right = strands[1].getPoints(simulationTime);
      const top = strands[2].getPoints(simulationTime);
      const bottom = strands[3].getPoints(simulationTime);
      drawCurve([...left].reverse().concat(right.slice(1)), threadGradient('x'));
      drawCurve([...top].reverse().concat(bottom.slice(1)), threadGradient('y'));

      // 아주 작은 점으로 실제 클릭 위치를 표시. 버튼 위에서는 얇은 고리로 바뀝니다.
      const radius = lerp(2.2, 6, hoverAmount);
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, radius, 0, TAU);
      ctx.fillStyle = masking ? '#ffffff' : OPTIONS.colors[dark ? 'dark' : 'light'].point;
      if (hoverAmount < .08) {
        ctx.fill();
      } else {
        ctx.strokeStyle = masking ? '#ffffff' : OPTIONS.colors[dark ? 'dark' : 'light'].point;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 1.25, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function start() {
      if (!disposed && !document.hidden && !animationId) {
        animationId = requestAnimationFrame(frame);
      }
    }

    function frame(timestamp) {
      animationId = 0;
      if (disposed || document.hidden) return;
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, .05) : FIXED_STEP;
      lastTime = timestamp;
      accumulator += dt;
      const steps = Math.min(6, Math.floor((accumulator + 1e-9) / FIXED_STEP));
      for (let i = 0; i < steps; i++) {
        const t = (i + 1) / steps;
        simulationPointer.x = lerp(previousPointer.x, pointer.x, t);
        simulationPointer.y = lerp(previousPointer.y, pointer.y, t);
        simulationTime += FIXED_STEP;
        for (const strand of strands) strand.step(FIXED_STEP, simulationTime, simulationPointer);
        accumulator = Math.max(0, accumulator - FIXED_STEP);
      }
      // 고주사율에서 물리 스텝이 없었던 프레임은 이전 위치를 유지.
      if (steps > 0) Object.assign(previousPointer, pointer);
      while (pulses.length && simulationTime - pulses[0].time > 2.2) pulses.shift();
      visibility = lerp(visibility, targetVisibility, 1 - Math.exp(-dt * 9));
      hoverAmount = lerp(hoverAmount, isHovering ? 1 : 0, 1 - Math.exp(-dt * 16));
      render();
      if (targetVisibility > 0 || visibility > .002) {
        start();
      } else {
        // 포인터가 화면 밖에 있으면 그리기를 멈춥니다.
        ctx.clearRect(0, 0, width, height);
        lastTime = 0;
        accumulator = 0;
      }
    }

    function readPointer(event) {
      if (disposed || (event.pointerType === 'touch' && !OPTIONS.touchEnabled)) return;
      const first = !hasInteracted || targetVisibility === 0;
      hasInteracted = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      targetVisibility = 1;
      setNativeCursorHidden(event.pointerType !== 'touch');
      if (first) {
        for (const strand of strands) strand.reset();
        Object.assign(previousPointer, pointer);
        Object.assign(simulationPointer, pointer);
      }
      const target = event.target;
      isHovering = target instanceof Element && Boolean(target.closest('button, a, input, select, textarea, [role="button"]'));
      start();
    }

    function pulse() {
      if (disposed || reducedMotion || !hasInteracted || simulationTime - lastPulseTime < .15) return;
      lastPulseTime = simulationTime;
      pulses.push({ time: simulationTime, sign: ++pulseId % 2 ? 1 : -1 });
      if (pulses.length > 5) pulses.shift();
    }

    function hidePointer() {
      targetVisibility = 0;
      isHovering = false;
      setNativeCursorHidden(false);
    }

    // 캡처 단계에서 좌표만 읽으며, 원래 페이지의 클릭/스크롤은 막지 않습니다.
    const pointerOptions = { ...listenerOptions, passive: true, capture: true };
    window.addEventListener('pointermove', readPointer, pointerOptions);
    window.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' && !OPTIONS.touchEnabled) return;
      readPointer(event);
      if (!OPTIONS.clickPulse) return;
      if (event.target instanceof Element && event.target.closest('button, input, a, select, textarea, [role="button"]')) return;
      pulse();
    }, pointerOptions);
    window.addEventListener('pointerup', event => {
      if (event.pointerType === 'touch') hidePointer();
    }, pointerOptions);
    window.addEventListener('pointercancel', hidePointer, pointerOptions);
    document.documentElement.addEventListener('pointerleave', hidePointer, listenerOptions);
    window.addEventListener('blur', hidePointer, listenerOptions);
    window.addEventListener('resize', () => {
      resize();
      refreshBackdrop();
    }, { ...listenerOptions, passive: true });
    window.addEventListener('load', refreshBackdrop, { ...listenerOptions, once: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
        animationId = 0;
        lastTime = 0;
        accumulator = 0;
        visibility = 0;
        hidePointer();
        ctx.clearRect(0, 0, width, height);
      }
      // 다시 돌아오면 실제 포인터 입력이 발생할 때 재시작합니다.
    }, listenerOptions);

    function updateMotionPreference() {
      reducedMotion = motionQuery.matches;
      pulses.length = 0;
      for (const strand of strands) strand.reset();
    }
    motionQuery.addEventListener('change', updateMotionPreference, listenerOptions);

    // 기존 웹사이트의 테마를 읽기만 합니다. 배경/레이아웃/단축키는 변경하지 않습니다.
    function updateTheme() {
      if (OPTIONS.theme !== 'auto') {
        dark = OPTIONS.theme === 'dark';
        return;
      }
      const root = document.documentElement;
      const explicitTheme = root.getAttribute('data-theme') || document.body.getAttribute('data-theme');
      if (explicitTheme === 'light' || explicitTheme === 'dark') {
        dark = explicitTheme === 'dark';
      } else {
        dark = root.classList.contains('dark') || document.body.classList.contains('dark') ||
          getComputedStyle(root).colorScheme === 'dark';
      }
    }
    const themeObserver = new MutationObserver(updateTheme);
    for (const element of [document.documentElement, document.body]) {
      themeObserver.observe(element, {
        attributes: true, attributeFilter: ['data-theme', 'class', 'style']
      });
    }
    const colorQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorQuery.addEventListener('change', updateTheme, listenerOptions);

    // 다른 페이지에서 제거하거나 개발 중 점검할 때 쓸 수 있는 작은 공개 API.
    window.threadCursor = {
      settings: SETTINGS,
      pulse,
      setBlendMode: applyBlendMode,
      refreshBackdrop,
      setPreset(name) {
        if (!Object.prototype.hasOwnProperty.call(PRESETS, name)) return false;
        Object.assign(SETTINGS, PRESETS[name]);
        return true;
      },
      reset() {
        pulses.length = 0;
        for (const strand of strands) strand.reset();
        Object.assign(previousPointer, pointer);
        Object.assign(simulationPointer, pointer);
      },
      inspect() {
        return {
          pointer: { ...pointer },
          settings: { ...SETTINGS },
          reducedMotion,
          dark,
          masking,
          blendSupported,
          blendMode: OPTIONS.blendMode,
          visible: visibility,
          running: Boolean(animationId),
          size: { width, height, dpr },
          finite: strands.every(s => [...s.positions, ...s.velocities].every(Number.isFinite)),
          points: strands.map(s => s.getPoints(simulationTime).map(p => ({ ...p })))
        };
      },
      destroy() {
        disposed = true;
        cancelAnimationFrame(animationId);
        animationId = 0;
        eventController.abort();
        themeObserver.disconnect();
        setNativeCursorHidden(false);
        ctx.clearRect(0, 0, width, height);
        canvas.remove();
        style.remove();
        document.documentElement.classList.remove(BACKDROP_CLASS);
        delete window.threadCursor;
      }
    };

    updateMotionPreference();
    updateTheme();
    resize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
