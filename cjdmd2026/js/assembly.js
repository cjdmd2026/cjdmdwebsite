(() => {
  'use strict';

  // Each direct child in the two artwork groups is one complete icon.
  // Keep nested paths together so multicolour icons fly as a single piece.
  const SETTINGS = {
    triggerViewport: .12,
    launchDuration: 6.2,
    acceleration: 2.4,
    slowFlight: 1.6,
    fastFlight: .65,
    finalCount: 6,
    finalStagger: .12,
    finalFlight: 1.85,
    scatter: .9,
    atlasScale: 1.25
  };

  function pieceTiming(rank, count) {
    const finalCount = Math.min(SETTINGS.finalCount, count);
    const regularCount = count - finalCount;
    if (rank >= regularCount) {
      return { start: SETTINGS.launchDuration + (rank - regularCount + 1) * SETTINGS.finalStagger,
        duration: SETTINGS.finalFlight, finale: true };
    }
    const order = rank / Math.max(1, regularCount - 1);
    // Inverse of an accelerating launch curve: widely spaced early, dense late.
    return { start: SETTINGS.launchDuration * Math.pow(order, 1 / SETTINGS.acceleration),
      duration: SETTINGS.slowFlight + (SETTINGS.fastFlight - SETTINGS.slowFlight) * order,
      finale: false };
  }

  function cubicBezier(x1, y1, x2, y2) {
    const sample = (t, a, b) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;
    return (x) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      let low = 0, high = 1;
      // Invert the curve's x coordinate; using y(t) alone is not CSS bezier easing.
      for (let i = 0; i < 16; i++) {
        const t = (low + high) / 2;
        if (sample(t, x1, x2) < x) low = t;
        else high = t;
      }
      return sample((low + high) / 2, y1, y2);
    };
  }
  const settleEase = cubicBezier(.22, .8, .3, 1);
  const root = document.querySelector('#assembly');
  if (!root) return;
  const stage = root.querySelector('.assembly__stage');
  const canvas = document.querySelector('#assembly-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const source = document.querySelector('#poster-source').content.querySelector('svg');
  const counter = document.querySelector('#piece-count');
  const total = document.querySelector('#piece-total');
  const percent = document.querySelector('#progress-value');
  const rail = document.querySelector('.progress__track');
  const fill = document.querySelector('#progress-fill');
  const bottom = document.querySelector('#bottom-progress');
  const status = document.querySelector('#stage-status');
  const cue = document.querySelector('#scroll-cue');
  const completeButton = document.querySelector('#show-complete');
  const replayButton = document.querySelector('#replay');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const random = (n) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const serializer = new XMLSerializer();
  let pieces = [], fullImage, frame = 0, lastTime = null, progress = 0;
  let playback = 'idle', elapsed = 0, duration = 0;
  let width = 0, height = 0, dpr = 1, ready = false, geometry;
  let triggerY = 0, previousCount = -1, previousPercent = -1;
  const viewBox = source.viewBox.baseVal;
  const artWidth = viewBox.width, artHeight = viewBox.height;

  function decodeSvg(markup) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }));
      const image = new Image();
      image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
      image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG image decode failed')); };
      image.src = url;
    });
  }

  async function preparePieces() {
    const measure = source.cloneNode(true);
    measure.style.cssText = `position:fixed;left:-10000px;top:0;width:${artWidth}px;height:${artHeight}px;visibility:hidden;pointer-events:none`;
    measure.setAttribute('aria-hidden', 'true');
    document.body.append(measure);
    try {
      const artwork = measure.querySelector('[id="_결_합"]');
      const elements = [...artwork.children].flatMap(group => [...group.children]);
      const defs = measure.querySelector('defs').outerHTML;
      const pages = [];
      let page, x, y, rowHeight;
      const newPage = () => { page = { nodes: [], height: 0, image: null }; pages.push(page); x = 0; y = 0; rowHeight = 0; };
      newPage();
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const b = element.getBBox();
        const pad = 3, scale = SETTINGS.atlasScale;
        const sw = Math.ceil(b.width * scale) + pad * 2;
        const sh = Math.ceil(b.height * scale) + pad * 2;
        if (x + sw > 2048) { x = 0; y += rowHeight; rowHeight = 0; }
        if (y + sh > 2048) newPage();
        page.nodes.push(`<g transform="translate(${x + pad} ${y + pad}) scale(${scale}) translate(${-b.x} ${-b.y})">${serializer.serializeToString(element)}</g>`);
        pieces.push({ index: i, page, sx: x, sy: y, sw, sh, x: b.x - pad / scale, y: b.y - pad / scale,
          w: sw / scale, h: sh / scale, cx: b.x + b.width / 2, cy: b.y + b.height / 2,
          area: b.width * b.height,
          rotation: (random(i + 8) - .5) * 2.8, distance: .7 + random(i + 17) * .8,
          size: 1.7 + random(i + 29) * 1.7 });
        x += sw; rowHeight = Math.max(rowHeight, sh); page.height = Math.max(page.height, y + sh);
      }
      // Keep the inward flight direction independent of the assembly order.
      const bounds = artwork.getBBox();
      const centreX = bounds.x + bounds.width / 2;
      const centreY = bounds.y + bounds.height / 2;
      for (const piece of pieces) {
        const dx = piece.cx - centreX, dy = piece.cy - centreY;
        // Approach from the outside on the same side.
        piece.angle = Math.atan2(dy, dx) + (random(piece.index + 1) - .5) * .2;
      }
      // Use the original icon bounds, excluding atlas padding and flight scaling.
      // Small icons appear first; the largest icons arrive and settle last.
      const ordered = [...pieces].sort((a, b) => a.area - b.area || a.index - b.index);
      ordered.forEach((piece, rank) => { Object.assign(piece, pieceTiming(rank, pieces.length)); });
      duration = Math.max(...pieces.map(piece => piece.start + piece.duration));
      total.textContent = pieces.length.toLocaleString('en-US');
      canvas.setAttribute('aria-label', `${pieces.length.toLocaleString('ko-KR')}개의 아이콘이 모여 ‘결합’이라는 글자를 만드는 포스터`);
      // Bake vectors once into sprite atlases. No per-frame SVG layout or path parsing.
      for (const atlas of pages) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="${atlas.height}" viewBox="0 0 2048 ${atlas.height}">${defs}${atlas.nodes.join('')}</svg>`;
        const image = await decodeSvg(svg);
        const texture = document.createElement('canvas');
        texture.width = 2048; texture.height = atlas.height;
        texture.getContext('2d').drawImage(image, 0, 0);
        atlas.image = texture;
        atlas.nodes = null;
      }
    } finally { measure.remove(); }
  }

  function resize() {
    width = stage.clientWidth; height = stage.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    const mobile = width <= 760;
    const availableHeight = mobile ? Math.max(100, height - 296) : Math.max(120, height - 138);
    const scale = Math.min(availableHeight / artHeight, width * (mobile ? .86 : .54) / artWidth);
    geometry = { scale, x: width * (mobile ? .5 : .62) - artWidth * scale / 2,
      y: (mobile ? 224 : 83) + (availableHeight - artHeight * scale) / 2 };
    triggerY = root.getBoundingClientRect().top + window.scrollY + clamp(height * SETTINGS.triggerViewport, 48, 96);
    completeButton.hidden = reducedMotion.matches;
    replayButton.hidden = reducedMotion.matches;
    if (reducedMotion.matches) showComplete();
    else readScroll();
    requestFrame();
  }

  function readScroll() {
    // Scroll only triggers playback; further scrolling never seeks or restarts it.
    if (ready && playback === 'idle' && !reducedMotion.matches && window.scrollY >= triggerY) play();
  }

  function play() {
    if (!ready) return;
    if (reducedMotion.matches) { showComplete(); return; }
    elapsed = 0; progress = 0; lastTime = null; playback = 'playing';
    requestFrame();
  }

  function showComplete() {
    elapsed = duration; progress = 1; lastTime = null; playback = 'complete';
    requestFrame();
  }

  function draw() {
    const { scale, x, y } = geometry;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#040000'; ctx.fillRect(0, 0, width, height);
    ctx.translate(x, y); ctx.scale(scale, scale);
    let landed = 0;
    if (progress >= .99999) {
      // The final frame is the entire original SVG, including its background and fine details.
      ctx.drawImage(fullImage, 0, 0, artWidth, artHeight); landed = pieces.length;
    } else {
      for (const piece of pieces) {
        const t = (elapsed - piece.start) / piece.duration;
        if (t >= 1) {
          ctx.drawImage(piece.page.image, piece.sx, piece.sy, piece.sw, piece.sh, piece.x, piece.y, piece.w, piece.h);
          landed++;
          continue;
        }
        // Do not preview large icons before their scheduled entrance.
        if (t < 0) continue;
        const phase = clamp(t);
        const remaining = piece.finale ? 1 - settleEase(phase) : Math.pow(1 - phase, 2);
        const distance = remaining * artWidth * piece.distance * SETTINGS.scatter;
        const dx = Math.cos(piece.angle) * distance;
        const dy = Math.sin(piece.angle) * distance;
        const size = 1 + (piece.size - 1) * remaining;
        ctx.save();
        ctx.globalAlpha = Math.min(1, phase * 6);
        ctx.translate(piece.cx + dx, piece.cy + dy);
        ctx.rotate(piece.rotation * remaining);
        ctx.scale(size, size);
        ctx.drawImage(piece.page.image, piece.sx, piece.sy, piece.sw, piece.sh, piece.x - piece.cx, piece.y - piece.cy, piece.w, piece.h);
        ctx.restore();
      }
    }
    updateUI(landed);
  }

  function updateUI(landed) {
    const value = Math.floor(progress * 100);
    if (landed !== previousCount) { counter.textContent = landed.toLocaleString('en-US'); previousCount = landed; }
    if (value !== previousPercent) {
      percent.innerHTML = `${String(value).padStart(2, '0')}<span>%</span>`;
      rail.setAttribute('aria-valuenow', value);
      previousPercent = value;
    }
    fill.style.transform = `scaleY(${progress})`;
    bottom.style.transform = `scaleX(${progress})`;
    const state = playback === 'complete' ? 'complete' : playback === 'idle' ? 'ready'
      : elapsed >= SETTINGS.launchDuration + SETTINGS.fastFlight ? 'landing' : 'assembling';
    const motion = reducedMotion.matches ? 'reduced' : 'full';
    if (root.dataset.state !== state || root.dataset.motion !== motion) {
      root.dataset.state = state;
      root.dataset.motion = motion;
      const messages = {
        ready: ['작은 조각부터, 큰 조각까지.', '<span aria-hidden="true">↓</span> 조금 스크롤하면 자동으로 재생됩니다'],
        assembling: ['작은 조각부터, 점점 빠르게.', '스크롤을 멈춰도 계속 결합됩니다'],
        landing: ['마지막 조각이 부드럽게 자리를 찾습니다.', '마지막 순간까지, 유연하게.'],
        complete: ['서로 다른 우리가, 하나로.', '다시 재생해 결합 과정을 감상해 보세요']
      };
      status.textContent = messages[state][0];
      cue.innerHTML = reducedMotion.matches ? '동작 줄이기 설정에 따라 완성본을 표시합니다' : messages[state][1];
    }
  }

  function tick(time) {
    frame = 0;
    if (!ready || document.hidden) return;
    if (playback === 'playing') {
      const dt = lastTime === null ? 0 : Math.max(0, (time - lastTime) / 1000);
      elapsed = Math.min(duration, elapsed + dt);
      lastTime = time;
      progress = elapsed / duration;
      if (elapsed >= duration) playback = 'complete';
    }
    draw();
    if (playback === 'playing') requestFrame();
  }

  function requestFrame() { if (ready && !frame && !document.hidden) frame = requestAnimationFrame(tick); }

  function fallback(error) {
    ready = false;
    cancelAnimationFrame(frame);
    const container = document.querySelector('#fallback');
    container.replaceChildren(source.cloneNode(true)); container.hidden = false;
    canvas.hidden = true; root.style.height = '100svh'; root.dataset.state = 'fallback';
    status.textContent = '완성된 포스터'; cue.textContent = '스크롤 효과를 불러오지 못해 원본을 표시합니다';
    console.error('Poster assembly:', error);
  }

  async function init() {
    try {
      if (!ctx) throw new Error('Canvas 2D is unavailable');
      // Explicit dimensions make SVG-to-canvas decoding consistent across browsers.
      const original = source.cloneNode(true);
      original.setAttribute('width', artWidth); original.setAttribute('height', artHeight);
      fullImage = await decodeSvg(serializer.serializeToString(original));
      await preparePieces();
      ready = true;
      resize();
      completeButton.disabled = false; replayButton.disabled = false;
      completeButton.addEventListener('click', showComplete);
      replayButton.addEventListener('click', play);
      window.addEventListener('scroll', readScroll, { passive: true });
      window.addEventListener('resize', resize, { passive: true });
      window.addEventListener('pageshow', resize);
      reducedMotion.addEventListener('change', resize);
      document.addEventListener('visibilitychange', () => {
        // Pause while the tab is hidden instead of skipping the finale on return.
        cancelAnimationFrame(frame); frame = 0; lastTime = null; requestFrame();
      });
      requestFrame();
    } catch (error) { fallback(error); }
  }
  init();
})();
