(() => {
  const T = EFactTMS;
  const $ = selector => document.querySelector(selector);
  let selected = '1';
  const allFacilities = () => T.state.facilities || [];

  function updateMap(facility) {
    if (!facility) return;
    document.querySelectorAll('.facility-map-pin').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.facility === facility.id)));
    $('#facility-map-name').textContent = facility.name;
    $('#facility-map-status').textContent = facility.outlets.length
      ? `공개 배출구 ${facility.outlets.length}개 · 측정 시점을 함께 확인하세요.`
      : '공개 측정 자료가 확인되지 않은 시설입니다.';
  }

  function render() {
    const district = $('#district').value;
    const list = allFacilities().filter(f => district === 'all' || f.category === district);
    if (!list.some(f => f.id === selected)) selected = list[0]?.id;
    $('#facilities').innerHTML = list.map(f => `<button type="button" class="facility-button" data-id="${f.id}" aria-pressed="${f.id === selected}"><small>${T.esc(f.category)}</small><strong>${T.esc(f.name)}</strong><span>${f.outlets.length ? `공개 배출구 ${f.outlets.length}개` : '측정 자료 미확인'}</span></button>`).join('');
    $('#facilities').querySelectorAll('button').forEach(button => button.onclick = () => selectFacility(button.dataset.id, false));
    const facility = allFacilities().find(f => f.id === selected);
    $('#detail').innerHTML = facility ? T.detail(facility) : '<p>해당 사업장이 없습니다.</p>';
    if (!facility) return;
    updateMap(facility);
    $('#scene-facility').textContent = facility.name;
    $('#scene-status').textContent = facility.outlets.length ? '공개 측정 자료 · 시점 확인' : '자료 미확인';
    document.querySelectorAll('[data-facility]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.facility === facility.id)));
    document.dispatchEvent(new CustomEvent('facility-selected', { detail: facility.id }));
  }

  function selectFacility(id, scrollToDetail) {
    selected = id;
    $('#district').value = 'all';
    render();
    if (!scrollToDetail) return;
    const detail = $('#detail');
    detail.classList.remove('map-selected');
    requestAnimationFrame(() => detail.classList.add('map-selected'));
    $('#facility-detail').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => detail.focus({ preventScroll: true }), 650);
  }

  document.querySelectorAll('.facility-map-pin').forEach(button => button.addEventListener('click', () => selectFacility(button.dataset.facility, true)));
  $('#district').onchange = render;
  document.addEventListener('choose-facility', event => selectFacility(event.detail, false));
  document.addEventListener('tms-update', render);
  render();
  T.load();
})();

(() => {
  const atlas = document.querySelector('.impact-atlas');
  const intro = atlas?.querySelector('.impact-intro');
  const explorer = atlas?.querySelector('.body-explorer');
  if (!atlas || !intro || !explorer) return;

  atlas.classList.add('narrative-section');
  intro.classList.add('narrative-question');
  explorer.classList.add('narrative-answer');

  const description = intro.querySelector(':scope > p');
  const prompt = document.createElement('div');
  prompt.className = 'impact-prompt narrative-guide narrative-answer';
  prompt.innerHTML = `
    <p class="impact-kicker">EXPLORE THE RESPONSE</p>
    <h4>궁금한 반응 지점을<br><button class="impact-click-word" type="button" aria-label="반응 지점 살펴보기">클릭</button>해 보세요.</h4>
    <p>${description?.textContent.trim() || '머리부터 흉곽까지 이어지는 반응 지점을 선택해 물질별 정보를 확인해 보세요.'}</p>
    <span>한 번 더 내려 실제 모형을 살펴보세요 ↓</span>
    <div class="impact-ripple-stage" aria-hidden="true">
      <i class="impact-drop"></i>
      <i class="impact-ripple impact-ripple-one"></i>
      <i class="impact-ripple impact-ripple-two"></i>
      <i class="impact-ripple impact-ripple-three"></i>
    </div>`;
  description?.remove();
  intro.insertAdjacentHTML('beforeend','<span class="impact-scroll-cue">SCROLL TO DISCOVER ↓</span>');
  explorer.before(prompt);

  const guideTitle = explorer.querySelector('.body-guide > strong');
  if (guideTitle) guideTitle.innerHTML = '반응 지점을<br>직접 선택해 보세요.';

  const answers = document.querySelectorAll('.narrative-question, .narrative-answer');
  document.documentElement.classList.add('narrative-ready');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    answers.forEach(answer => answer.classList.add('is-narrative-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-narrative-visible');
    observer.unobserve(entry.target);
  }), { threshold: .16, rootMargin: '0px 0px -8% 0px' });
  answers.forEach(answer => observer.observe(answer));
})();

// The instruction reacts at the viewport centre: click cue → droplet → low ripple.
(() => {
  const prompt = document.querySelector('.impact-atlas .impact-prompt');
  const word = prompt?.querySelector('.impact-click-word');
  if (!prompt || !word) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let soundTimers = [];

  const playClick = (attempt = 0) => {
    if (window.EFactAudio?.playClick) {
      window.EFactAudio.playClick();
      return;
    }
    if (attempt < 4) soundTimers.push(setTimeout(() => playClick(attempt + 1), 80));
  };
  const playRipple = () => window.EFactAudio?.playWhoosh();

  const clearSoundTimers = () => {
    soundTimers.forEach(clearTimeout);
    soundTimers = [];
  };

  const runSequence = (forceSound = false) => {
    clearSoundTimers();
    prompt.classList.remove('is-ripple-active');
    void prompt.offsetWidth;
    prompt.classList.add('is-ripple-active');
    playClick();
    soundTimers.push(setTimeout(playRipple, 940));
  };

  word.addEventListener('click', event => {
    event.preventDefault();
    runSequence(true);
  });

  if (reducedMotion.matches) return;

  const centreObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) runSequence(false);
      else {
        clearSoundTimers();
        prompt.classList.remove('is-ripple-active');
      }
    });
  }, { threshold: 0, rootMargin: '-36% 0px -36% 0px' });

  centreObserver.observe(prompt);
})();

(() => {
  const intro = document.querySelector('.impact-atlas .impact-intro.narrative-question');
  const title = intro?.querySelector('h3');
  const kicker = intro?.querySelector('.impact-kicker');
  const cue = intro?.querySelector('.impact-scroll-cue');
  if (!intro || !title) return;

  intro.classList.add('impact-particle-ready');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    intro.classList.add('is-impact-complete');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'impact-particle-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  intro.prepend(canvas);
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) {
    intro.classList.add('is-impact-complete');
    return;
  }

  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => 1 - Math.pow(1 - clamp(value), 3);
  const mix = (from, to, amount) => from + (to - from) * amount;
  let particles = [];
  let width = 0;
  let height = 0;
  let ratio = 1;
  let frameId = 0;
  let particlesReady = false;

  function collectLine(text, y, colour, fontSize, maxParticles) {
    const surface = document.createElement('canvas');
    surface.width = Math.max(1, Math.round(width));
    surface.height = Math.max(1, Math.round(height));
    const surfaceContext = surface.getContext('2d');
    surfaceContext.clearRect(0, 0, width, height);
    surfaceContext.fillStyle = '#fff';
    surfaceContext.textAlign = 'center';
    surfaceContext.textBaseline = 'middle';
    surfaceContext.font = `600 ${fontSize}px Pretendard, "Noto Sans KR", sans-serif`;
    surfaceContext.fillText(text, width / 2, y, width * .9);
    const pixels = surfaceContext.getImageData(0, 0, surface.width, surface.height).data;
    const step = width < 700 ? 7 : 6;
    const points = [];
    for (let py = 0; py < surface.height; py += step) {
      for (let px = 0; px < surface.width; px += step) {
        if (pixels[(py * surface.width + px) * 4 + 3] > 100) points.push({ x:px, y:py, colour });
      }
    }
    for (let index = points.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [points[index], points[swap]] = [points[swap], points[index]];
    }
    return points.slice(0, maxParticles);
  }

  function rebuild() {
    const rect = intro.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const fontSize = width < 700
      ? Math.min(52, Math.max(36, width * .102))
      : Math.min(88, Math.max(48, width * .052));
    const centre = height * .49;
    const limit = width < 700 ? 250 : 480;
    const targets = [
      ...collectLine('보이지 않는 오염물질,', centre - fontSize * .58, '#e8f0ee', fontSize, limit),
      ...collectLine('몸은 어떤 신호를 보낼까요?', centre + fontSize * .58, '#15c2c8', fontSize, limit + 80)
    ];
    particles = targets.map((target, index) => ({
      ...target,
      startX: Math.random() * width,
      startY: Math.random() * height,
      scatterX: (Math.random() - .5) * (width * .34),
      scatterY: (Math.random() - .5) * (height * .2),
      size: width < 700 ? .85 + Math.random() * .8 : .8 + Math.random() * 1.25,
      opacity: .68 + Math.random() * .32,
      delay: (index % 17) / 17 * .1
    }));
    particlesReady = true;
  }

  function setTextProgress(progress) {
    const titleProgress = ease((progress - .62) / .18);
    const metaProgress = ease((progress - .78) / .15);
    title.style.opacity = String(titleProgress);
    title.style.filter = `blur(${(1 - titleProgress) * 16}px)`;
    title.style.transform = `translateY(${(1 - titleProgress) * 16}px) scale(${.985 + titleProgress * .015})`;
    [kicker, cue].filter(Boolean).forEach(element => {
      element.style.opacity = String(metaProgress);
      element.style.transform = `translateY(${(1 - metaProgress) * 12}px)`;
    });
  }

  function render(progress) {
    context.clearRect(0, 0, width, height);
    const gather = ease((progress - .08) / .44);
    const scatter = ease((progress - .76) / .24);
    const fade = 1 - ease((progress - .82) / .18);
    const letterHold = clamp((progress - .48) / .08) * (1 - clamp((progress - .76) / .1));
    context.globalCompositeOperation = 'lighter';
    particles.forEach(particle => {
      const localGather = ease((progress - .08 - particle.delay * .35) / .42);
      const x = mix(particle.startX, particle.x, localGather) + particle.scatterX * scatter;
      const y = mix(particle.startY, particle.y, localGather) + particle.scatterY * scatter;
      const alpha = Math.min(1, gather * 1.35) * fade * particle.opacity;
      if (alpha <= .01) return;
      context.globalAlpha = alpha;
      context.fillStyle = particle.colour;
      context.beginPath();
      context.arc(x, y, particle.size * (1 + letterHold * .24 + scatter * .35), 0, Math.PI * 2);
      context.fill();
    });
    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';
    setTextProgress(progress);
  }

  function updateFromScroll() {
    frameId = 0;
    const rect = intro.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top > viewportHeight * 1.12) {
      context.clearRect(0, 0, width, height);
      intro.classList.remove('is-impact-complete');
      setTextProgress(0);
      return;
    }
    if (rect.bottom < -viewportHeight * .12) {
      context.clearRect(0, 0, width, height);
      return;
    }

    if (!particlesReady) rebuild();
    const titleCentre = rect.top + rect.height * .49;
    const gatheringStarts = viewportHeight * .9;
    const titleCompletes = viewportHeight * .5;
    const progress = clamp((gatheringStarts - titleCentre) / (gatheringStarts - titleCompletes));
    render(progress);
    intro.classList.toggle('is-impact-complete', progress >= .985);
  }

  function scheduleUpdate() {
    if (frameId) return;
    frameId = requestAnimationFrame(updateFromScroll);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive:true });
  window.addEventListener('resize', () => {
    particlesReady = false;
    scheduleUpdate();
  }, { passive:true });
  scheduleUpdate();
})();
