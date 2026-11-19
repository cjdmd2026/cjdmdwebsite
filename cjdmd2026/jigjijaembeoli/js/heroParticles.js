/* Rasterize the existing heading, then disperse its pixels with scroll progress.
   The real HTML heading remains available to screen readers and reduced motion. */
export function createHeroParticles(hero) {
  const title = hero.querySelector(".hero__inner .title");
  const canvas = hero.querySelector(".hero-particles");
  const headingText = title.textContent.trim();
  const headingChars = Array.from(headingText);
  title.replaceChildren(...headingChars.map(character => {
    if (/\s/.test(character)) return document.createTextNode(character);
    const span = document.createElement("span");
    span.textContent = character;
    return span;
  }));
  title.setAttribute("aria-label", headingText);
  title.dataset.waveText = title.textContent.trim();
  const onWaveFillEnd = event => {
    if (event.animationName === "hero-title-fill") hero.classList.add("hero-title-yelling");
  };
  title.addEventListener("animationend", onWaveFillEnd);
  const context = canvas.getContext("2d");
  if (!context) {
    return {
      setProgress() {},
      startWave() {
        hero.classList.remove("hero-title-yelling");
        hero.classList.add("hero-title-wave-active");
      },
      resetWave() { hero.classList.remove("hero-title-wave-active", "hero-title-yelling"); },
      destroy() {
        title.removeEventListener("animationend", onWaveFillEnd);
        hero.classList.remove("hero-title-wave-active", "hero-title-yelling");
        delete title.dataset.waveText;
      },
    };
  }
  const mask = document.createElement("canvas");
  const ink = mask.getContext("2d", { willReadFrequently: true });
  let particles = [];
  let progress = 0;
  let width = 0;
  let height = 0;
  let disposed = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  function random(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  }
  function measure() {
    if (disposed) return;
    const parent = title.parentElement;
    const transforms = [title.style.transform, parent.style.transform];
    title.style.transform = "none";
    parent.style.transform = "none";
    const bounds = hero.getBoundingClientRect();
    const titleBounds = title.getBoundingClientRect();
    width = Math.round(bounds.width);
    height = Math.round(bounds.height);
    const ratio = Math.min(devicePixelRatio, 1.75);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    mask.width = width;
    mask.height = height;
    const style = getComputedStyle(title);
    ink.font = style.fontWeight + " " + style.fontSize + " " + style.fontFamily;
    ink.fillStyle = style.color;
    ink.textBaseline = "alphabetic";
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      for (let i = 0; i < node.length; i++) {
        const character = node.textContent[i];
        if (/\s/.test(character)) continue;
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        const metrics = ink.measureText(character);
        const ascent = metrics.fontBoundingBoxAscent || parseFloat(style.fontSize) * 0.85;
        const descent = metrics.fontBoundingBoxDescent || parseFloat(style.fontSize) * 0.15;
        const x = rect.left - bounds.left;
        const y = rect.top - bounds.top + (rect.height - ascent - descent) / 2 + ascent;
        ink.fillText(character, x, y);
      }
    }
    title.style.transform = transforms[0];
    parent.style.transform = transforms[1];
    const pixels = ink.getImageData(0, 0, width, height).data;
    const step = width < 700 ? 2 : 3;
    particles = [];
    const left = Math.max(0, Math.floor(titleBounds.left - bounds.left));
    const top = Math.max(0, Math.floor(titleBounds.top - bounds.top));
    const right = Math.min(width, Math.ceil(titleBounds.right - bounds.left));
    const bottom = Math.min(height, Math.ceil(titleBounds.bottom - bounds.top));
    for (let y = top; y < bottom; y += step) {
      for (let x = left; x < right; x += step) {
        const alpha = pixels[(y * width + x) * 4 + 3] / 255;
        if (alpha < 0.2) continue;
        const seed = x + y * width;
        particles.push({
          x, y, alpha, size: step,
          delay: random(seed) * 0.38 + (x / width) * 0.2,
          dx: (random(seed + 1) - 0.2) * width * 0.38,
          dy: -(30 + random(seed + 2) * height * 0.35),
          wave: random(seed + 3) * 9,
        });
      }
    }
    context.fillStyle = style.color;
    draw();
  }
  function draw() {
    if (disposed) return;
    context.clearRect(0, 0, width, height);
    const dissolve = clamp((progress - 0.52) / 0.48);
    const active = dissolve > 0.005;
    hero.classList.toggle("hero-particles-active", active);
    if (!active || dissolve >= 1) return;
    const appear = clamp(dissolve / 0.05);
    for (const particle of particles) {
      const t = clamp((dissolve - particle.delay) / (1 - particle.delay));
      const eased = t * t;
      const size = particle.size * (1 - t * 0.8);
      context.globalAlpha = particle.alpha * appear * Math.pow(1 - t, 1.5);
      context.fillRect(
        particle.x + particle.dx * eased + Math.sin(t * 10 + particle.wave) * t * 9,
        particle.y + particle.dy * t + Math.sin(t * 7 + particle.wave) * t * 7,
        size, size,
      );
    }
    context.globalAlpha = 1;
  }
  measure();
  const resize = new ResizeObserver(measure);
  resize.observe(hero);
  document.fonts.ready.then(measure);
  window.ScrollTrigger?.addEventListener("refresh", measure);
  return {
    setProgress(value) { progress = clamp(value); draw(); },
    startWave() {
      hero.classList.remove("hero-title-yelling");
      hero.classList.remove("hero-title-wave-active");
      requestAnimationFrame(() => {
        if (!disposed) hero.classList.add("hero-title-wave-active");
      });
    },
    resetWave() { hero.classList.remove("hero-title-wave-active", "hero-title-yelling"); },
    destroy() {
      disposed = true;
      resize.disconnect();
      window.ScrollTrigger?.removeEventListener("refresh", measure);
      title.removeEventListener("animationend", onWaveFillEnd);
      hero.classList.remove("hero-particles-active");
      hero.classList.remove("hero-title-wave-active", "hero-title-yelling");
      delete title.dataset.waveText;
      context.clearRect(0, 0, width, height);
    },
  };
}
