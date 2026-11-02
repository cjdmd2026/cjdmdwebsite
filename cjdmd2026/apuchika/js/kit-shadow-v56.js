(() => {
  const screen = document.querySelector('.kit-movie-screen');
  if (!screen) return;
  const width = 640, height = 360;
  const probe = document.createElement('canvas');
  const mask = document.createElement('canvas');
  const shadow = document.createElement('canvas');
  for (const canvas of [probe, mask, shadow]) {
    canvas.width = width;
    canvas.height = height;
  }
  shadow.className = 'kit-contact-shadow';
  shadow.setAttribute('aria-hidden', 'true');
  const read = probe.getContext('2d', {willReadFrequently: true});
  const shape = mask.getContext('2d');
  const draw = shadow.getContext('2d');
  if (!read || !shape || !draw) return;
  screen.append(shadow);
  let visible = false, raf = 0;

  // Observe the rendered pixels only. The existing player owns all playback.
  function paintShadow() {
    const canvas = screen.querySelector('.kit-scroll-canvas');
    const video = screen.querySelector('[data-kit-video]');
    const poster = screen.querySelector('[data-kit-poster]');
    const surface = screen.classList.contains('sequence-ready') ? canvas :
      screen.classList.contains('webm-ready') && video?.readyState >= 2 ? video : poster;
    if (!surface || surface === poster && !poster.complete) return;
    try {
      read.clearRect(0, 0, width, height);
      read.drawImage(surface, 0, 0, width, height);
      const pixels = read.getImageData(0, 0, width, height).data;
      const bases = new Int16Array(width).fill(-1);
      let top = height, bottom = -1;
      for (let x = 0; x < width; x++) {
        for (let y = 1; y < height - 1; y++) {
          const i = (y * width + x) * 4 + 3;
          // Require a solid vertical run so antialiasing/noise cannot move the base.
          if (pixels[i] > 160 && pixels[i - width * 4] > 160 && pixels[i + width * 4] > 160) {
            bases[x] = y + 2;
            top = Math.min(top, y);
            bottom = Math.max(bottom, y + 2);
          }
        }
      }
      shape.clearRect(0, 0, width, height);
      draw.clearRect(0, 0, width, height);
      if (bottom < 0) return;
      const band = Math.max(16, (bottom - top) * .28);
      // Each column starts at its own base, preserving a rotated/sloping bottom.
      // Upper lid, wings and floating contents must not cast a second floor shadow.
      for (let x = 1; x < width - 1; x++) {
        const y = bases[x];
        if (y < 0 || bases[x - 1] < 0 || bases[x + 1] < 0) continue;
        const t = Math.max(0, Math.min(1, (y - (bottom - band)) / (band * .3)));
        if (!t) continue;
        shape.fillStyle = `rgba(0,36,65,${t * .34})`;
        shape.fillRect(x, y - 1.5, 1, 3);
      }
      // A narrow contact plus a soft downward spread; no detached oval or outline.
      draw.filter = 'blur(2.8px)';
      draw.globalAlpha = .85;
      draw.drawImage(mask, 0, 2);
      draw.filter = 'blur(.8px)';
      draw.globalAlpha = .8;
      draw.drawImage(mask, 0, 0);
      draw.filter = 'none';
      draw.globalAlpha = 1;
    } catch {
      // Avoid leaving an old shadow beneath a new/unreadable surface.
      draw.clearRect(0, 0, width, height);
    }
  }
  function loop() {
    raf = 0;
    if (!visible || document.hidden) return;
    paintShadow();
    raf = requestAnimationFrame(loop);
  }
  function resume() {
    if (visible && !document.hidden && !raf) raf = requestAnimationFrame(loop);
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    resume();
  }).observe(screen);
  document.addEventListener('visibilitychange', resume);
  screen.querySelector('[data-kit-poster]')?.addEventListener('load', paintShadow);
  paintShadow();
})();
