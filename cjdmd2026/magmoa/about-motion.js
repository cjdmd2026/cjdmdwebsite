(() => {
  const root = document.querySelector('.about-page');
  if (!root) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 801px)');
  const scenes = [...root.querySelectorAll('[data-scene]')];
  const reveals = [...root.querySelectorAll('.about-reveal')];
  const letters = [];
  root.querySelectorAll('[data-scene="words"] h2 > span').forEach(line => {
    const text = line.textContent;
    line.replaceChildren();
    // Keep spaces as text so Korean phrases retain natural line wrapping.
    for (const character of Array.from(text)) {
      if (/\s/.test(character)) { line.append(document.createTextNode(character)); continue; }
      const letter = document.createElement('span');
      letter.className = 'about-letter';
      letter.textContent = character;
      line.append(letter);
      letters.push(letter);
    }
  });
  let queued = false;
  let previous = -1;
  const clamp = n => Math.min(1, Math.max(0, n));
  function update() {
    queued = false;
    root.classList.toggle('about-motion', !motion.matches);
    scenes.forEach(scene => {
      const rect = scene.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, scene.offsetHeight - innerHeight));
      scene.style.setProperty('--about-progress', desktop.matches ? progress : 1);
      if (scene.dataset.scene === 'words') {
        const fill = clamp((progress - .06) / .82);
        letters.forEach((letter, i) => letter.classList.toggle('is-lit', motion.matches || !desktop.matches || fill >= (i + 1) / letters.length));
      }
      if (scene.dataset.scene === 'way') {
        const index = desktop.matches && !motion.matches ? Math.min(2, Math.floor(progress * 3)) : 0;
        if (index !== previous) {
          previous = index;
          scene.querySelectorAll('.about-way-steps p').forEach((el, i) => el.classList.toggle('is-active', i === index));
          scene.querySelectorAll('.about-way-visual img').forEach((el, i) => el.classList.toggle('is-active', i === index));
          scene.querySelector('.about-way-count').textContent = `0${index + 1} / 03`;
        }
      }
    });
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight * .9) el.classList.add('is-visible');
    });
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  update();
})();

(() => {
  const layer = document.querySelector('.about-sticker-layer');
  if (!layer) return;

  const hero = layer.parentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const stickers = [
    'printing-museum', 'sangdangsanseong', 'seongan-gil', 'cheongnamdae',
    'munam-park', 'art-museum', 'cheongju-zoo', 'cheongju-station',
    'yukgeori-market', 'chojeong-palace',
  ];
  let nextSticker = 0;
  let lastStamp;

  function warmStickers() {
    if (motion.matches) {
      layer.replaceChildren();
      return;
    }
    stickers.forEach(name => {
      const image = new Image();
      image.src = `assets/about-stickers/${name}.svg`;
    });
  }

  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || motion.matches) return;
    const { clientX, clientY, timeStamp } = event;
    const bounds = layer.getBoundingClientRect();
    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    if (lastStamp && (
      timeStamp - lastStamp.time < 55 ||
      Math.hypot(x - lastStamp.x, y - lastStamp.y) < 60
    )) return;

    lastStamp = { x, y, time: timeStamp };
    const sticker = new Image();
    sticker.alt = '';
    sticker.draggable = false;
    sticker.src = `assets/about-stickers/${stickers[nextSticker]}.svg`;
    nextSticker = (nextSticker + 1) % stickers.length;
    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;
    sticker.style.setProperty('--tilt', `${Math.random() * 36 - 18}deg`);
    sticker.addEventListener('animationend', () => sticker.remove(), { once: true });
    layer.append(sticker);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { lastStamp = undefined; });
  motion.addEventListener('change', warmStickers);
  warmStickers();
})();

(() => {
  const track = document.querySelector('.about-wave-scroll');
  if (!track) return;
  const section = track.querySelector('.about-opening');
  const canvas = section.querySelector('canvas');
  const context = canvas.getContext('2d');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;

  function paint() {
    queued = false;
    track.classList.toggle('is-active', !motion.matches);
    const width = section.clientWidth;
    const height = section.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const progress = motion.matches ? 0 : Math.max(0, Math.min(1,
      -track.getBoundingClientRect().top / Math.max(1, track.offsetHeight - height)));
    const fill = Math.min(1, progress / .72);
    section.style.setProperty('--wave-exit', String(Math.max(0, (progress - .74) / .26)));
    const surface = height * (1.15 - fill * 1.35);
    context.beginPath();
    context.moveTo(0, height);
    for (let x = 0; x <= width + 8; x += 8) {
      const wave = Math.sin(x / width * Math.PI * 2 + fill * 7) * height * .045
        + Math.sin(x / width * Math.PI * 4 - fill * 5) * height * .016;
      context.lineTo(x, surface + wave);
    }
    context.lineTo(width, height);
    context.closePath();
    context.fillStyle = '#2f4bff';
    context.fill();
    const whiten = Math.max(0, Math.min(1, (fill - .35) / .25));
    const value = Math.round(17 + whiten * 238);
    section.style.setProperty('--wave-copy', 'rgb(' + value + ' ' + value + ' ' + value + ')');
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(section);
  paint();
})();
