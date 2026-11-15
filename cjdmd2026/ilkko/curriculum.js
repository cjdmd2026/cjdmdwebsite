document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('commonHeader');
  const menuButton = document.getElementById('mobileMenuToggle');
  const nav = document.getElementById('headerNav');
  const topButton = document.getElementById('scrollTopBtn');
  let lastScrollY = window.scrollY;

  // 01. 공통 헤더 및 탑 버튼
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.classList.remove('is-active');
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
  };

  const handleScroll = () => {
    const current = window.scrollY;
    if (header && !nav?.classList.contains('is-open')) {
      if (current <= 10) header.classList.remove('is-hidden');
      else if (current > lastScrollY && current > 80) header.classList.add('is-hidden');
      else if (current < lastScrollY) header.classList.remove('is-hidden');
    }
    topButton?.classList.toggle('is-visible', current > 200);
    lastScrollY = current;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const opening = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', opening);
      menuButton.classList.toggle('is-active', opening);
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? '메뉴 닫기' : '메뉴 열기');
      header?.classList.remove('is-hidden');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });
  }
  topButton?.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  // 02. 두 번째 참고 영상: 화면에 섹션 전체가 들어온 다음,
  //     세로 스크롤을 따라 6개 카드가 자연스럽게 수평 이동합니다.
  //     preventDefault()로 휠을 가로 스크롤로 가로채지 않습니다.
  const section = document.getElementById('learningStages');
  const viewport = document.getElementById('stageViewport');
  const track = document.getElementById('stageTrack');
  const sticky = section?.querySelector('.learning-stages-sticky');
  if (!section || !viewport || !track || !sticky) return;

  const mobile = window.matchMedia('(max-width: 768px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 숫자가 작을수록 세로 스크롤을 많이 해야 하므로 카드가 더 천천히 이동합니다.
  const HORIZONTAL_SPEED = 0.90;
  const SMOOTHING = 0.17; // 0~1. 높을수록 즉각적으로 따라감

  let maxShift = 0;
  let travel = 1;
  let sectionTop = 0;
  let targetX = 0;
  let currentX = 0;
  let animationId = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  function render() {
    if (reduceMotion.matches) {
      currentX = targetX;
    } else {
      currentX += (targetX - currentX) * SMOOTHING;
      if (Math.abs(targetX - currentX) < 0.35) currentX = targetX;
    }

    track.style.transform = `translate3d(${-currentX}px, 0, 0)`;

    if (Math.abs(targetX - currentX) >= 0.35) {
      animationId = requestAnimationFrame(render);
    } else {
      animationId = null;
    }
  }

  function updatePosition() {
    if (mobile.matches) return;

    const progress = clamp((window.scrollY - sectionTop) / travel, 0, 1);
    targetX = maxShift * progress;

    if (animationId === null) {
      animationId = requestAnimationFrame(render);
    }
  }

  function measure() {
    if (animationId !== null) cancelAnimationFrame(animationId);
    animationId = null;

    if (mobile.matches) {
      section.style.height = '';
      track.style.transform = '';
      currentX = targetX = 0;
      return;
    }

    // 섹션에 가로로 숨겨진 전체 카드의 너비를 실측합니다.
    maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);

    // 섹션이 완전히 화면에 들어온 뒤 고정되는 스크롤 구간.
    travel = maxShift / HORIZONTAL_SPEED;
    const stickyHeight = sticky.getBoundingClientRect().height;
    section.style.height = `${Math.ceil(stickyHeight + travel)}px`;
    sectionTop = section.getBoundingClientRect().top + window.scrollY;

    currentX = targetX = maxShift * clamp((window.scrollY - sectionTop) / Math.max(1, travel), 0, 1);
    track.style.transform = `translate3d(${-currentX}px, 0, 0)`;
  }

  // 기본 스크롤은 그대로 유지하므로 끝에 도착하면 다음 섹션으로 자연스럽게 넘어갑니다.
  window.addEventListener('scroll', updatePosition, { passive: true });

  let resizeId = null;
  window.addEventListener('resize', () => {
    if (resizeId !== null) cancelAnimationFrame(resizeId);
    resizeId = requestAnimationFrame(() => {
      measure();
      updatePosition();
      resizeId = null;
    });
  });

  // 키보드로도 진행할 수 있도록 좌우 화살표 지원
  viewport.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    if (mobile.matches) {
      viewport.scrollBy({ left: event.key === 'ArrowRight' ? 240 : -240,
        behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    } else {
      window.scrollBy({ top: (event.key === 'ArrowRight' ? 1 : -1) * 260 / HORIZONTAL_SPEED,
        behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
  });

  measure();
  updatePosition();
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => { measure(); updatePosition(); });
  }
});



/* ==========================================
   03. 세 번째 섹션 - 팝업 / 구름 / 컨페티
========================================== */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('natureSection');
  const scene = document.getElementById('natureScene');
  const modal = document.getElementById('trainingModal');
  const dialog = modal?.querySelector('.training-dialog');
  const packageEl = document.getElementById('naturePackage');
  const confettiLayer = document.getElementById('confettiLayer');
  if (!section || !scene || !modal || !dialog || !packageEl || !confettiLayer) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const names = ['모음','자음','음운 인식','해독 연습','음운 변동','철자'];
  const stageData = [
    { title:'모음', headline:'모음의 모양과 소리를 익혀요.', description:'한글 읽기의 출발점인 모음을 차근차근 배워요.', tags:['소리 연결','모음 구별','읽기 기초'] },
    { title:'자음', headline:'자음의 원리를 차근차근 알아가요.', description:'자음과 소리를 연결하고 알맞은 글자를 구분해요.', tags:['자음 구별','소리 학습','글자 연결'] },
    { title:'음운 인식', headline:'글자를 이루는 소리를 발견해요.', description:'말소리를 듣고 나누며 소리가 모이는 원리를 익혀요.', tags:['첫소리 찾기','소리 합치기','음운 인식'] },
    { title:'해독 연습', headline:'배운 글자로 낱말을 읽어보아요.', description:'자음과 모음을 결합해 짧은 낱말부터 읽는 연습을 해요.', tags:['음절 읽기','낱말 해독','읽기 정확성'] },
    { title:'음운 변동', headline:'달라지는 소리의 규칙을 배워요.', description:'적힌 글자와 실제 발음이 다른 경우를 알아보아요.', tags:['발음 변화','규칙 학습','문장 읽기'] },
    { title:'철자', headline:'스스로 막힘없이 글을 소화해요.', description:'유창하게 철자를 읽고 완벽하게 마스터하는 단계입니다.', tags:['철자 마스터','독해 완성','자신감'] }
  ];
  const summaries = [
    '낱글자의 모양과 입모양부터 배우며, 아이가 입모양을 연결하며 말소리와 글자를 연결할 준비를 해요.',
    '모음을 배우고 난 후, 자음 원리를 체계적으로 체득해요.',
    '소리를 구별하고 합치며 낱말 속 소리의 구조를 알아보아요.',
    '글자와 소리를 결합해 낱말을 읽는 힘을 키워요.',
    '표기와 실제 발음의 차이를 이해하며 읽기를 넓혀요.',
    '알맞은 글자를 고르고 써보며 정확한 철자를 완성해요.'
  ];

  const num = document.getElementById('trainingModalNumber');
  const headline = document.getElementById('trainingModalHeadline');
  const description = document.getElementById('trainingModalDescription');
  const tags = document.getElementById('trainingModalTags');
  const list = document.getElementById('trainingDetailList');
  const scrollBody = document.getElementById('trainingModalScroll');
  const tabs = [...document.querySelectorAll('[data-modal-step]')];
  const stepImage = document.getElementById('trainingModalImage');
  const stepVideo = document.getElementById('trainingModalVideo');
  stepVideo.controls = false;
  stepVideo.loop = true;
  stepVideo.muted = true;
  stepVideo.playsInline = true;
  const placeholder = document.getElementById('trainingPlaceholderText');
  let opener = null;

  // 각 단계별 업로드 영상: 1 모음 → 2 자음 → 3 음운 인식 →
  // 4 해독 연습 → 5 음운 변동 → 6 철자.
  const trainingVideos = [
    'videos/stage-01.mp4', 'videos/stage-02.mp4',
    'videos/stage-03.mp4', 'videos/stage-04.mp4',
    'videos/stage-05.mp4', 'videos/stage-06.mp4'
  ];
  stepVideo.addEventListener('error', () => {
    stepVideo.hidden = true;
    placeholder.hidden = false;
  });

  list.replaceChildren();
  stageData.forEach((data,i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'training-overview-item';
    button.innerHTML = `<span class="training-overview-num">${i+1}</span><span><strong>${i+1}단계</strong><small>${summaries[i]}</small></span>`;
    button.addEventListener('click', () => selectStage(i+1));
    list.append(button);
  });

  function selectStage(n) {
    const data = stageData[n-1];
    if (!data) return;
    num.textContent = `${n}단계`;
    headline.textContent = data.headline;
    description.textContent = data.description;
    tags.replaceChildren();
    data.tags.forEach(t => {
      const s = document.createElement('span');
      s.textContent = t;
      tags.append(s);
    });
    // 이전 단계 재생을 멈춘 뒤 새 영상으로 교체.
    stepVideo.pause();
    stepVideo.hidden = false;
    stepImage.hidden = true;
    placeholder.hidden = true;
    stepVideo.setAttribute('aria-label', `${n}단계 ${data.title} 학습 영상`);
    stepVideo.src = trainingVideos[n-1];
    stepVideo.load();
    // 음소거 상태 자동/무한 반복 재생 (조작바 미표시).
    const playback = stepVideo.play();
    if (playback?.catch) playback.catch(() => {});
    tabs.forEach(tab => {
      const active = Number(tab.dataset.modalStep) === n;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
  }

  function openModal(n) {
    opener = document.activeElement;
    selectStage(n);
    scrollBody.scrollTop = 0;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    document.getElementById('trainingClose').focus();
  }
  function closeModal() {
    stepVideo.pause();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    opener?.focus?.();
  }
  // 보내준 OGG 효과음을 말풍선 클릭/터치할 때마다 새로 재생합니다.
  // 매번 새로운 Audio 인스턴스를 만들므로 팝업을 닫고 다시 열거나 빠르게
  // 연달아 클릭해도 한 번만 재생되는 문제가 발생하지 않습니다.
  const bubbleSoundProbe = new Audio();
  const bubbleSoundUrl = bubbleSoundProbe.canPlayType('audio/ogg; codecs="vorbis"')
    ? 'images/bubble-click.ogg'
    : 'images/bubble-click.wav'; // OGG 미지원 브라우저에서도 같은 소리 재생
  const activeBubbleSounds = new Set();
  function playBubblePop() {
    const sound = new Audio(bubbleSoundUrl);
    sound.volume = 0.6; // 0~1, 더 작게 하려면 0.3
    sound.preload = 'auto';
    activeBubbleSounds.add(sound); // 재생이 끝날 때까지 객체 유지
    const cleanup = () => activeBubbleSounds.delete(sound);
    sound.addEventListener('ended', cleanup, { once: true });
    sound.addEventListener('error', cleanup, { once: true });
    try {
      const attempt = sound.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(cleanup);
    } catch (_) {
      cleanup(); // 브라우저에서 음원 재생을 막아도 팝업은 정상 실행
    }
  }
  document.querySelectorAll('[data-open-step]').forEach(btn => btn.addEventListener('click', () => {
    playBubblePop();
    openModal(Number(btn.dataset.openStep));
  }));
  tabs.forEach(btn => btn.addEventListener('click', () => selectStage(Number(btn.dataset.modalStep))));
  document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModal));
  document.getElementById('trainingClose').addEventListener('click', closeModal);
  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    const focusables = [...dialog.querySelectorAll('button:not([disabled])')].filter(x=>x.getClientRects().length);
    if (!focusables.length) return;
    if (e.shiftKey && document.activeElement === focusables[0]) { e.preventDefault(); focusables.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === focusables.at(-1)) { e.preventDefault(); focusables[0].focus(); }
  });

  // 캐릭터에 마우스 호버 시 말풍선 / 터치 시 클릭으로 토글
  const stops = [...document.querySelectorAll('.nature-stop')];
  stops.forEach(stop => {
    const character = stop.querySelector('.nature-character');
    const bubble = stop.querySelector('.nature-bubble');
    // PC: 캐릭터 호버 → 말풍선 나타남. 말풍선 쪽으로 마우스를 이동할 시간 확보.
    let bubbleHideTimer;
    const showBubble = () => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      clearTimeout(bubbleHideTimer);
      stop.classList.add('is-bubble-hovered');
    };
    const hideBubbleSoon = () => {
      clearTimeout(bubbleHideTimer);
      bubbleHideTimer = setTimeout(() => stop.classList.remove('is-bubble-hovered'), 450);
    };
    character.addEventListener('mouseenter', showBubble);
    character.addEventListener('mouseleave', hideBubbleSoon);
    bubble.addEventListener('mouseenter', showBubble);
    bubble.addEventListener('mouseleave', hideBubbleSoon);
    character.addEventListener('click', () => {
      if (matchMedia('(hover: hover)').matches) return;
      stops.forEach(other => { if(other!==stop) other.classList.remove('is-bubble-open'); });
      stop.classList.toggle('is-bubble-open');
    });
    character.addEventListener('keydown', e => {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); stop.querySelector('.nature-bubble').focus(); }
    });
  });

  
  /*
   * 배경 2~7번 원본 그림은 한 픽셀도 자르지 않습니다.
   * 각 장면 전체를 스크롤로 보여준 다음, 끝 부분을 잠깐 고정합니다.
   * 이어지는 장면은 아래에서 위로 더 부드럽게 떠오르듯 올라오고,
   * 맨 앞 전환부는 흰 구름이 먼저 보이도록 처리합니다.
   * 추가 스크롤 가로채기(wheel/touch preventDefault)는 사용하지 않습니다.
   */
  const chapters = Array.from(scene.querySelectorAll('.nature-chapter'));
  let pinMeasureFrame = null;
  let chapterMotionFrame = null;
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
  const easeOutCubic = value => 1 - Math.pow(1 - value, 3);

  function measureChapterPins() {
    pinMeasureFrame = null;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    chapters.forEach(chapter => {
      const chapterHeight = chapter.getBoundingClientRect().height;
      const pinnedTop = Math.min(0, viewportHeight - chapterHeight);
      chapter.style.setProperty('--nature-pin-top', `${Math.round(pinnedTop)}px`);
    });
    scheduleChapterMotion();
  }
  function schedulePinMeasurement() {
    if (pinMeasureFrame != null) return;
    pinMeasureFrame = requestAnimationFrame(measureChapterPins);
  }

  function updateChapterMotion() {
    chapterMotionFrame = null;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    chapters.forEach(chapter => {
      const rect = chapter.getBoundingClientRect();
      const rawProgress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height * 0.2), 0, 1);
      const eased = reduced.matches ? rawProgress : easeOutCubic(rawProgress);
      const riseDistance = reduced.matches ? 0 : (1 - eased) * Math.min(58, viewportHeight * 0.075);
      chapter.style.setProperty('--chapter-rise', `${riseDistance.toFixed(2)}px`);
    });
  }
  function scheduleChapterMotion() {
    if (chapterMotionFrame != null) return;
    chapterMotionFrame = requestAnimationFrame(updateChapterMotion);
  }

  measureChapterPins();
  updateChapterMotion();
  window.addEventListener('resize', schedulePinMeasurement, { passive: true });
  window.addEventListener('scroll', scheduleChapterMotion, { passive: true });
  window.visualViewport?.addEventListener('resize', schedulePinMeasurement, { passive: true });
  document.fonts?.ready?.then(() => {
    schedulePinMeasurement();
    scheduleChapterMotion();
  });


  // 패키지 박스 등장 시 부드러운 장난감 종소리 "띠로링~뿅" 이 컨페티와 함께 재생됩니다.
  // OGG를 지원하지 않는 Safari 등을 위해 동일한 소리의 MP3를 준비했습니다.
  const packageAudioProbe = document.createElement('audio');
  const packageAudioUrl = packageAudioProbe.canPlayType('audio/ogg; codecs="vorbis"')
    ? 'images/package-cute.ogg'
    : 'images/package-cute.mp3';
  const packageAudio = new Audio(packageAudioUrl);
  packageAudio.preload = 'auto';
  packageAudio.volume = 0.56; // 효과음 볼륨: 0(무음) ~ 1(최대)
  packageAudio.load();

  let boxInside = false;
  let packageEntryId = 0;
  let pendingPackageAudio = false;

  function stopPackageAudio() {
    packageAudio.pause();
    try { packageAudio.currentTime = 0; } catch (_) {}
  }

  function playPackageAudio() {
    pendingPackageAudio = false;
    const entryId = packageEntryId;
    stopPackageAudio(); // 다시 진입했을 때 첫 음부터 재생
    try {
      const playPromise = packageAudio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // 일부 브라우저는 클릭/터치 전 스크롤만으로 시작한 소리를 차단합니다.
          // 이 경우 패키지가 보이는 상태에서 다음 사용자 동작으로 재시도합니다.
          if (boxInside && packageEntryId === entryId) pendingPackageAudio = true;
        });
      }
    } catch (_) {
      if (boxInside && packageEntryId === entryId) pendingPackageAudio = true;
    }
  }

  function retryPackageAudioAfterGesture() {
    if (!boxInside || !pendingPackageAudio) return;
    playPackageAudio();
  }
  document.addEventListener('pointerdown', retryPackageAudioAfterGesture, { passive: true });
  document.addEventListener('touchend', retryPackageAudioAfterGesture, { passive: true });
  document.addEventListener('keydown', retryPackageAudioAfterGesture);

  // 패키지 영역: 화면에 들어올 때마다 컨페티 + 축하 효과음 실행
  let confettiTimer;
  function confetti() {
    if(reduced.matches) return;
    confettiLayer.replaceChildren();
    const colors = ['#ff7a05','#ffd166','#fc6e89','#68c5ee','#7ac48a','#ae81e7','#ffffff'];
    const fragment = document.createDocumentFragment();
    for(let i=0;i<76;i++) {
      const piece=document.createElement('i');
      const rand=(a,b)=>a+Math.random()*(b-a);
      piece.className='confetti-piece';
      piece.style.setProperty('--x',`${rand(0,100)}vw`);
      piece.style.setProperty('--size',`${rand(6,12)}px`);
      piece.style.setProperty('--color',colors[i%colors.length]);
      piece.style.setProperty('--duration',`${rand(2.6,4.2)}s`);
      piece.style.setProperty('--delay',`${rand(0,.9)}s`);
      piece.style.setProperty('--drift',`${rand(-180,180)}px`);
      piece.style.setProperty('--rotate',`${rand(250,1100)}deg`);
      fragment.append(piece);
    }
    confettiLayer.append(fragment);
    clearTimeout(confettiTimer);
    confettiTimer=setTimeout(()=>confettiLayer.replaceChildren(),5500);
  }
  new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    packageEl.classList.toggle('is-visible', visible);

    if (visible && !boxInside) {
      boxInside = true;
      packageEntryId++;
      confetti();
      playPackageAudio();
    } else if (!visible && boxInside) {
      boxInside = false;
      packageEntryId++;
      pendingPackageAudio = false;
      stopPackageAudio();
    }
  }, { threshold: .5 }).observe(packageEl);
});
