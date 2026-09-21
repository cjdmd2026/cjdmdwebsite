/*
 * Circle cursor + flowing outline ripple, based on thread-crosshair-mask.js.
 * Load this file in place of the original script. No dependencies.
 * window.threadCursor.settings controls sizes, flutter and border thickness.
 */
(() => {
  'use strict';

  function init() {
    const SETTINGS = {
      thickness: 0.2,        // CSS pixels; cursor ring and ripple border.
      cursorRadius: 3.2,     // Original: 2.2.
      hoverRadius: 8,        // Original: 6.
      rippleRadius: 180,
      rippleDuration: 1.8,   // Seconds.
      flutter: 0.72         // 0: circular; 1: strongest flowing deformation.
    };
    const OPTIONS = {
      blendMode: 'difference',
      ensurePageBackdrop: true,
      hideNativeCursor: true,
      clickPulse: true,
      touchEnabled: true,
      theme: 'auto',
      zIndex: 999998,
      maxDpr: 2,
      maxRipples: 12,
      colors: {
        light: { point: '#534361' },
        dark: { point: '#eee9f3' }
      }
    };
    const TAU = Math.PI * 2;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const CANVAS_ID = 'thread-crosshair-overlay';
    const CURSOR_CLASS = 'thread-crosshair-active';
    const BACKDROP_CLASS = 'thread-crosshair-default-backdrop';
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
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const blendSupported = Boolean(window.CSS && window.CSS.supports('mix-blend-mode', 'difference'));
    let masking = false;
    function applyBlendMode(mode) {
      if (mode !== 'difference' && mode !== 'normal') return false;
      OPTIONS.blendMode = mode;
      masking = mode === 'difference' && blendSupported;
      canvas.style.setProperty('mix-blend-mode', masking ? 'difference' : 'normal', 'important');
      start();
      return mode === 'normal' || blendSupported;
    }

    const style = document.createElement('style');
    style.id = 'thread-crosshair-style';
    style.textContent = `
      html.${CURSOR_CLASS}, html.${CURSOR_CLASS} * { cursor: none !important; }
      html.${BACKDROP_CLASS} { background-color: Canvas; }
    `;
    (document.head || document.documentElement).appendChild(style);
    document.documentElement.appendChild(canvas);

    function isTransparent(value) {
      return value === 'transparent' || /^rgba\([^)]*,\s*0(?:\.0+)?\s*\)$/.test(value);
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
    function setNativeCursorHidden(hidden) {
      document.documentElement.classList.toggle(CURSOR_CLASS, OPTIONS.hideNativeCursor && hidden);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let lastTime = 0;
    let animationId = 0;
    let disposed = false;
    let hasInteracted = false;
    let visibility = 0;
    let targetVisibility = 0;
    let hoverAmount = 0;
    let isHovering = false;
    let dark = false;
    const pointer = { x: 0, y: 0 };
    const pulses = [];
    const ripplePoints = Array.from({ length: 96 }, () => ({ x: 0, y: 0 }));
    const eventController = new AbortController();
    const listenerOptions = { signal: eventController.signal };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, OPTIONS.maxDpr);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = clamp(pointer.x, 0, width);
      pointer.y = clamp(pointer.y, 0, height);
      start();
    }

    function drawRipple(ripple, radius, progress, age) {
      const flutter = clamp(Number(SETTINGS.flutter) || 0, 0, 1);
      const envelope = (1 - Math.exp(-progress * 10)) * (1 - progress * .25);
      const amplitude = Math.min(radius * .20, 24) * flutter * envelope;
      const count = ripplePoints.length;
      for (let i = 0; i < count; i++) {
        const angle = i / count * TAU;
        // Integer angular frequencies join seamlessly; the time rates echo the original strands.
        const wave = .62 * Math.sin(angle * 3 - age * 1.55 + ripple.phase) +
          .28 * Math.sin(angle * 5 + age * 2.35 + ripple.phase * 1.7) +
          .10 * Math.sin(angle * 8 - age * 3.70 + ripple.phase * .65);
        const distance = radius + amplitude * wave;
        ripplePoints[i].x = ripple.x + Math.cos(angle) * distance;
        ripplePoints[i].y = ripple.y + Math.sin(angle) * distance;
      }

      // Wrap Catmull-Rom tangents around the loop so there is no closing corner.
      ctx.beginPath();
      ctx.moveTo(ripplePoints[0].x, ripplePoints[0].y);
      for (let i = 0; i < count; i++) {
        const p0 = ripplePoints[(i + count - 1) % count];
        const p1 = ripplePoints[i];
        const p2 = ripplePoints[(i + 1) % count];
        const p3 = ripplePoints[(i + 2) % count];
        ctx.bezierCurveTo(
          p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6,
          p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6,
          p2.x, p2.y
        );
      }
      ctx.closePath();
      ctx.stroke();
    }

    function render(timestamp) {
      ctx.clearRect(0, 0, width, height);
      const color = masking ? '#ffffff' : OPTIONS.colors[dark ? 'dark' : 'light'].point;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = SETTINGS.thickness;

      // Each click keeps its own origin, independent of the moving cursor.
      for (let i = pulses.length - 1; i >= 0; i--) {
        const ripple = pulses[i];
        const age = Math.max(0, (timestamp - ripple.time) / 1000);
        const progress = clamp(age / ripple.duration, 0, 1);
        if (progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const eased = 1 - Math.pow(1 - progress, 2);
        const radius = lerp(ripple.startRadius, ripple.endRadius, eased);
        ctx.globalAlpha = 1 - progress * progress;
        drawRipple(ripple, radius, progress, age);
      }

      if (visibility > 0) {
        ctx.globalAlpha = visibility;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, lerp(SETTINGS.cursorRadius, SETTINGS.hoverRadius, hoverAmount), 0, TAU);
        if (hoverAmount < .08) {
          ctx.fill();
        } else {
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(pointer.x, pointer.y, 1.25, 0, TAU);
          ctx.fill();
        }
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
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, .05) : 1 / 60;
      lastTime = timestamp;
      const hoverTarget = isHovering ? 1 : 0;
      visibility = reducedMotion ? targetVisibility : lerp(visibility, targetVisibility, 1 - Math.exp(-dt * 9));
      hoverAmount = reducedMotion ? hoverTarget : lerp(hoverAmount, hoverTarget, 1 - Math.exp(-dt * 16));
      if (Math.abs(visibility - targetVisibility) < .002) visibility = targetVisibility;
      if (Math.abs(hoverAmount - hoverTarget) < .002) hoverAmount = hoverTarget;
      render(timestamp);
      if (pulses.length || visibility !== targetVisibility || hoverAmount !== hoverTarget) {
        start();
      } else {
        lastTime = 0;
      }
    }

    function readPointer(event) {
      if (disposed || (event.pointerType === 'touch' && !OPTIONS.touchEnabled)) return;
      hasInteracted = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      targetVisibility = 1;
      setNativeCursorHidden(event.pointerType !== 'touch');
      isHovering = event.target instanceof Element && Boolean(event.target.closest('button, a, input, select, textarea, [role="button"]'));
      start();
    }
    function pulse() {
      if (disposed || document.hidden || reducedMotion || !hasInteracted) return;
      const radius = lerp(SETTINGS.cursorRadius, SETTINGS.hoverRadius, hoverAmount);
      pulses.push({
        x: pointer.x,
        y: pointer.y,
        time: performance.now(),
        phase: Math.random() * TAU,
        startRadius: radius,
        endRadius: Math.max(radius, SETTINGS.rippleRadius),
        duration: Math.max(.05, SETTINGS.rippleDuration)
      });
      if (pulses.length > OPTIONS.maxRipples) pulses.shift();
      start();
    }
    function hidePointer() {
      targetVisibility = 0;
      isHovering = false;
      setNativeCursorHidden(false);
      start();
    }

    // Passive observation preserves buttons, links, scrolling and text selection.
    const pointerOptions = { ...listenerOptions, passive: true, capture: true };
    window.addEventListener('pointermove', readPointer, pointerOptions);
    window.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' && !OPTIONS.touchEnabled) return;
      readPointer(event);
      if (OPTIONS.clickPulse && event.button === 0) pulse();
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
      if (!document.hidden) return;
      cancelAnimationFrame(animationId);
      animationId = 0;
      lastTime = 0;
      visibility = 0;
      targetVisibility = 0;
      hoverAmount = 0;
      isHovering = false;
      pulses.length = 0;
      setNativeCursorHidden(false);
      ctx.clearRect(0, 0, width, height);
    }, listenerOptions);
    motionQuery.addEventListener('change', () => {
      reducedMotion = motionQuery.matches;
      pulses.length = 0;
      start();
    }, listenerOptions);

    function updateTheme() {
      const root = document.documentElement;
      const explicitTheme = root.getAttribute('data-theme') || document.body.getAttribute('data-theme');
      if (OPTIONS.theme !== 'auto') {
        dark = OPTIONS.theme === 'dark';
      } else if (explicitTheme === 'light' || explicitTheme === 'dark') {
        dark = explicitTheme === 'dark';
      } else {
        dark = root.classList.contains('dark') || document.body.classList.contains('dark') ||
          getComputedStyle(root).colorScheme === 'dark';
      }
      start();
    }
    const themeObserver = new MutationObserver(updateTheme);
    for (const element of [document.documentElement, document.body]) {
      themeObserver.observe(element, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme, listenerOptions);

    window.threadCursor = {
      settings: SETTINGS,
      pulse,
      setBlendMode: applyBlendMode,
      refreshBackdrop,
      reset() {
        pulses.length = 0;
        start();
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
          ripples: pulses.map(ripple => ({ ...ripple }))
        };
      },
      destroy() {
        disposed = true;
        cancelAnimationFrame(animationId);
        animationId = 0;
        eventController.abort();
        themeObserver.disconnect();
        setNativeCursorHidden(false);
        canvas.remove();
        style.remove();
        document.documentElement.classList.remove(BACKDROP_CLASS);
        delete window.threadCursor;
      }
    };

    applyBlendMode(OPTIONS.blendMode);
    refreshBackdrop();
    updateTheme();
    resize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
