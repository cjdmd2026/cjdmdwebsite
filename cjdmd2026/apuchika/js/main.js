/* =========================
   Apuchika Main JS
   중복 선언 제거 버전
========================= */

document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     Common Helper
  ========================= */

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /* =========================
     Reveal Animation
  ========================= */

  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* =========================
     Top Button
  ========================= */

  const topButton = document.querySelector('.top-button');

  if (topButton) {
    topButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* =========================
     Index - Process Image Change
  ========================= */

  const steps = document.querySelectorAll('.step');
  const processImage = document.getElementById('processImage');
  const visualBox = document.querySelector('.process-visual');

  let processImageTimer = null;

  function changeProcess(activeStep) {
    if (!processImage || !visualBox || !activeStep) return;

    const nextImage = activeStep.dataset.img;
    if (!nextImage || processImage.getAttribute('src') === nextImage) return;

    steps.forEach((step) => step.classList.remove('is-active'));
    activeStep.classList.add('is-active');

    clearTimeout(processImageTimer);

    visualBox.classList.add('is-changing');

    processImageTimer = setTimeout(() => {
      processImage.setAttribute('src', nextImage);

      requestAnimationFrame(() => {
        visualBox.classList.remove('is-changing');
      });
    }, 180);
  }

  steps.forEach((step) => {
    step.addEventListener('mouseenter', () => changeProcess(step));
    step.addEventListener('click', () => changeProcess(step));
  });

  /* =========================
     Index - Scroll Motion
  ========================= */

  const heroScroll = document.querySelector('.hero-scroll');
  const cloud = document.querySelector('.cloud-divider');
  const heroContent = document.querySelector('.hero-content');
  const problemSection = document.querySelector('.problem-section');
  const solutionSection = document.querySelector('.solution-section');
  const solutionItems = document.querySelectorAll('.solution-stage');

  let targetCloudPull = 0;
  let currentCloudPull = 0;

  let targetHeroY = 0;
  let currentHeroY = 0;

  let heroSnapLock = false;

  /* 스크롤에 따라 구름 / 히어로 텍스트 움직임 계산 */
  function updateIndexScrollTargets() {
    if (heroScroll && cloud) {
      const rect = heroScroll.getBoundingClientRect();
      const scrollable = heroScroll.offsetHeight - window.innerHeight;

      const progress = scrollable > 0
        ? clamp(-rect.top / scrollable, 0, 1)
        : 0;

      /*
        구름이 너무 위로 올라가지 않도록 이동량 줄임.
        기존 0.28 이상이면 과하게 올라감.
      */
      targetCloudPull = -progress * 18;
    }

    if (heroScroll && heroContent) {
      const rect = heroScroll.getBoundingClientRect();
      const scrollable = heroScroll.offsetHeight - window.innerHeight;

      const progress = scrollable > 0
        ? clamp(-rect.top / scrollable, 0, 1)
        : 0;

      targetHeroY = -progress * 58;
    }

    if (solutionSection && solutionItems.length) {
      const rect = solutionSection.getBoundingClientRect();

      const progress = clamp(
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.42),
        0,
        1
      );

      if (solutionItems[0]) {
        solutionItems[0].classList.toggle('is-on', progress > 0.16);
      }

      if (solutionItems[1]) {
        solutionItems[1].classList.toggle('is-on', progress > 0.34);
      }

      if (solutionItems[2]) {
        solutionItems[2].classList.toggle('is-on', progress > 0.54);
      }
    }
  }

  /* 구름 / 텍스트 부드럽게 렌더링 */
  function renderSmoothMotion() {
    const ease = 0.12;

    currentCloudPull += (targetCloudPull - currentCloudPull) * ease;
    currentHeroY += (targetHeroY - currentHeroY) * ease;

    if (cloud) {
      cloud.style.setProperty('--cloud-pull', `${currentCloudPull}px`);
    }

    if (heroContent) {
      heroContent.style.setProperty('--hero-content-y', `${currentHeroY}px`);
    }

    requestAnimationFrame(renderSmoothMotion);
  }

  /* 히어로에서 problem 섹션으로 넘어갈 때 걸리는 느낌 */
  function initHeroSnapScroll() {
    if (!heroScroll || !problemSection) return;

    let isSnapping = false;
    let hasSnappedDown = false;

    window.addEventListener(
      'wheel',
      (event) => {
        const isScrollingDown = event.deltaY > 0;
        const isScrollingUp = event.deltaY < 0;

        const heroRect = heroScroll.getBoundingClientRect();

        /*
          히어로가 거의 끝나가는 구간에서만 스냅 작동.
          기존처럼 hero가 보이는 동안 계속 감지하면 중간에서 버벅거립니다.
        */
        const isNearHeroBottom =
          heroRect.bottom <= window.innerHeight * 0.82 &&
          heroRect.bottom > window.innerHeight * 0.18;

        /*
          다시 위로 올라가면 한 번 걸렸던 상태 초기화
        */
        if (isScrollingUp && window.scrollY < problemSection.offsetTop - 320) {
          hasSnappedDown = false;
        }

        if (
          !isScrollingDown ||
          isSnapping ||
          hasSnappedDown ||
          !isNearHeroBottom
        ) {
          return;
        }

        event.preventDefault();

        isSnapping = true;
        hasSnappedDown = true;

        const snapOffset = 250;
        const targetY = problemSection.offsetTop - snapOffset;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });

        window.setTimeout(() => {
          isSnapping = false;
        }, 950);
      },
      { passive: false }
    );
  }

  /* 실행 */
  window.addEventListener('scroll', updateIndexScrollTargets, { passive: true });
  window.addEventListener('resize', updateIndexScrollTargets);

  updateIndexScrollTargets();
  renderSmoothMotion();
  initHeroSnapScroll();

  function initProblemMarquee() {
    const track = document.querySelector('.problem-section .marquee-track');
    if (!track) return;

    /*
      이미 marquee-group 구조로 바뀐 상태면 중복 실행 방지
    */
    if (track.dataset.marqueeReady === 'true') return;

    const cards = Array.from(track.querySelectorAll(':scope > .mini-card'));
    if (!cards.length) return;

    const group = document.createElement('div');
    group.className = 'marquee-group';

    cards.forEach((card) => {
      group.appendChild(card);
    });

    const cloneGroup = group.cloneNode(true);
    cloneGroup.setAttribute('aria-hidden', 'true');

    track.appendChild(group);
    track.appendChild(cloneGroup);

    track.dataset.marqueeReady = 'true';
  }

  initProblemMarquee();

  /* =========================
     Animation Page - World Interaction
  ========================= */

  const worldMainVideo = document.getElementById('worldMainVideo');
  const worldMainTitle = document.getElementById('worldMainTitle');
  const worldMainDesc = document.getElementById('worldMainDesc');
  const worldItems = document.querySelectorAll('.ani-world-item');

  worldItems.forEach((item) => {
    item.addEventListener('click', () => {
      worldItems.forEach((el) => el.classList.remove('is-active'));
      item.classList.add('is-active');

      const nextVideo = item.dataset.video;
      const nextPoster = item.dataset.poster;
      const nextTitle = item.dataset.title;
      const nextDesc = item.dataset.desc;

      if (worldMainVideo && nextVideo) {
        worldMainVideo.pause();
        worldMainVideo.setAttribute('src', nextVideo);

        if (nextPoster) {
          worldMainVideo.setAttribute('poster', nextPoster);
        }

        worldMainVideo.load();
      }

      if (worldMainTitle && nextTitle) {
        worldMainTitle.textContent = nextTitle;
      }

      if (worldMainDesc && nextDesc) {
        worldMainDesc.textContent = nextDesc;
      }
    });
  });

  /* =========================
     Animation Page - Search / Favorite
  ========================= */

  const animationSearch = document.getElementById('animationSearch');
  const favoriteFilterBtn = document.getElementById('favoriteFilterBtn');
  const animationCards = document.querySelectorAll('.ani-card');
  const heartButtons = document.querySelectorAll('.heart-btn');

  const FAVORITE_STORAGE_KEY = 'apuchika-animation-favorites';

  let favoriteOnly = false;

  function getSavedFavorites() {
    try {
      const saved = localStorage.getItem(FAVORITE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  function saveFavorites(favoriteIds) {
    try {
      localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // localStorage 사용 불가 환경에서는 저장 생략
    }
  }

  function syncFavoriteState() {
    if (!animationCards.length) return;

    const savedFavorites = getSavedFavorites();

    animationCards.forEach((card, index) => {
      if (!card.dataset.id) {
        card.dataset.id = `ani-${String(index + 1).padStart(2, '0')}`;
      }

      const cardId = card.dataset.id;
      const heartButton = card.querySelector('.heart-btn');

      const isInitialFavorite = card.dataset.favorite === 'true';
      const isSavedFavorite = savedFavorites.includes(cardId);

      const isFavorite = savedFavorites.length > 0
        ? isSavedFavorite
        : isInitialFavorite;

      card.dataset.favorite = isFavorite ? 'true' : 'false';

      if (heartButton) {
        heartButton.classList.toggle('is-active', isFavorite);
      }
    });

    if (savedFavorites.length === 0) {
      const initialFavorites = [];

      animationCards.forEach((card) => {
        if (card.dataset.favorite === 'true') {
          initialFavorites.push(card.dataset.id);
        }
      });

      saveFavorites(initialFavorites);
    }
  }

  function updateFavoriteStorage() {
    const favoriteIds = [];

    animationCards.forEach((card) => {
      if (card.dataset.favorite === 'true') {
        favoriteIds.push(card.dataset.id);
      }
    });

    saveFavorites(favoriteIds);
  }

  function filterAnimationCards() {
    if (!animationCards.length) return;

    const keyword = animationSearch
      ? animationSearch.value.trim().toLowerCase()
      : '';

    animationCards.forEach((card) => {
      const title = card.dataset.title
        ? card.dataset.title.toLowerCase()
        : '';

      const isFavorite = card.dataset.favorite === 'true';

      const matchKeyword = title.includes(keyword);
      const matchFavorite = !favoriteOnly || isFavorite;

      card.classList.toggle('is-hidden', !(matchKeyword && matchFavorite));
    });
  }

  heartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest('.ani-card');
      if (!card) return;

      const nextFavoriteState = card.dataset.favorite !== 'true';

      card.dataset.favorite = nextFavoriteState ? 'true' : 'false';
      button.classList.toggle('is-active', nextFavoriteState);

      updateFavoriteStorage();
      filterAnimationCards();
    });
  });

  if (animationSearch) {
    animationSearch.addEventListener('input', filterAnimationCards);
  }

  if (favoriteFilterBtn) {
    favoriteFilterBtn.addEventListener('click', () => {
      favoriteOnly = !favoriteOnly;

      favoriteFilterBtn.classList.toggle('is-active', favoriteOnly);
      filterAnimationCards();
    });
  }

  syncFavoriteState();
  filterAnimationCards();

  /* =========================
     Character Page Interaction
  ========================= */

  const planetStage =
    document.getElementById('planetStage') ||
    document.getElementById('planetWrap');

  const heroScrollBtn = document.getElementById('heroScrollBtn');
  const characterIntro = document.getElementById('characterIntro');
  const characterHero = document.getElementById('characterHero');

  let planetMouseX = 0;
  let planetMouseY = 0;

  function updateCharacterHero() {
    if (!characterHero || !planetStage) return;

    const rect = characterHero.getBoundingClientRect();
    const scrollable = characterHero.offsetHeight - window.innerHeight;

    const progress = scrollable > 0
      ? clamp(-rect.top / scrollable, 0, 1)
      : 0;

    const y = progress * 120;
    const r = progress * 22;
    const s = 1 - progress * 0.08;

    planetStage.style.transform = `
      translate3d(0, ${y}px, 0)
      rotate(${r}deg)
      scale(${s})
      rotateX(${-planetMouseY}deg)
      rotateY(${planetMouseX}deg)
    `;
  }

  if (heroScrollBtn && characterIntro) {
    heroScrollBtn.addEventListener('click', () => {
      characterIntro.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (planetStage) {
    window.addEventListener('mousemove', (event) => {
      planetMouseX = (event.clientX / window.innerWidth - 0.5) * 18;
      planetMouseY = (event.clientY / window.innerHeight - 0.5) * 18;

      updateCharacterHero();
    });
  }

  /* =========================
     Global Scroll / Resize
  ========================= */

  let scrollTicking = false;

  function handleScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateIndexScrollTargets();
        updateCharacterHero();
        scrollTicking = false;
      });

      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateIndexScrollTargets();
    updateCharacterHero();
  });

  updateIndexScrollTargets();
  updateCharacterHero();
  renderSmoothMotion();
});

/* =========================================================
   Character Planet Image Interaction
   3D 이미지 기반 양치별 행성 인터랙션
========================================================= */

(() => {
  const planetHero = document.getElementById('characterHero');
  const planetStage = document.getElementById('planetStage');
  const heroScrollBtn = document.getElementById('heroScrollBtn');
  const characterIntro = document.getElementById('characterIntro');

  if (!planetHero || !planetStage) return;

  let targetY = 0;
  let currentY = 0;

  let targetScale = 1;
  let currentScale = 1;

  let mouseX = 0;
  let mouseY = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updatePlanetTarget() {
    const rect = planetHero.getBoundingClientRect();
    const progress = clamp(-rect.top / window.innerHeight, 0, 1);

    /*
      스크롤 시 행성 이동량
      숫자 줄이면 덜 움직임
    */
    targetY = progress * 80;

    /*
      스크롤 시 행성 크기 변화
      1 = 원래 크기
      0.92 = 살짝 작아짐
    */
    targetScale = 1 - progress * 0.08;
  }

  function renderPlanet() {
    const ease = 0.08;

    currentY += (targetY - currentY) * ease;
    currentScale += (targetScale - currentScale) * ease;

    const tiltX = mouseY * 5;
    const tiltY = mouseX * 5;

    planetStage.style.transform = `
      translate(-50%, -50%)
      translate3d(0, ${currentY}px, 0)
      scale(${currentScale})
      rotateX(${-tiltX}deg)
      rotateY(${tiltY}deg)
    `;

    requestAnimationFrame(renderPlanet);
  }

  window.addEventListener(
    'mousemove',
    (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    },
    { passive: true }
  );

  window.addEventListener(
    'scroll',
    () => {
      updatePlanetTarget();
    },
    { passive: true }
  );

  window.addEventListener('resize', updatePlanetTarget);

  if (heroScrollBtn && characterIntro) {
    heroScrollBtn.addEventListener('click', () => {
      characterIntro.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  updatePlanetTarget();
  renderPlanet();
})();

/* =========================================================
   Apuchika Kit Page JS
   reference motion 적용 버전
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initKitCarousel();
  initScrollDrivenCards({
    sectionSelector: '.kit-method-section',
    itemSelector: '[data-kit-scroll-item]',
  });
  initKeywordScrollMotion();
  initKitCardStack();
  initScrollDrivenCards({
    sectionSelector: '.kit-rental-section',
    itemSelector: '[data-kit-rental-step]',
  });
  initKitFaq();
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/* =========================
   Hero Carousel
========================= */

function initKitCarousel() {
  const carousel = document.querySelector('[data-kit-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.kit-hero-slide'));
  const dots = Array.from(carousel.querySelectorAll('.kit-carousel-dot'));

  if (!slides.length || !dots.length) return;

  let currentIndex = 0;
  let timer = null;
  const delay = 5000;

  function setSlide(nextIndex) {
    currentIndex = clamp(nextIndex, 0, slides.length - 1);

    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
      dot.style.setProperty('--dot-duration', `${delay}ms`);

      const progress = dot.querySelector('span');
      if (progress) {
        progress.style.animation = 'none';
        progress.offsetHeight;
        progress.style.animation = '';
      }
    });
  }

  function nextSlide() {
    setSlide((currentIndex + 1) % slides.length);
  }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(nextSlide, delay);
  }

  function stopAuto() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const nextIndex = Number(dot.dataset.slide);
      if (Number.isNaN(nextIndex)) return;

      setSlide(nextIndex);
      startAuto();
    });
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  setSlide(0);
  startAuto();
}

/* =========================
   Scroll-driven vertical cards
========================= */

function initScrollDrivenCards({ sectionSelector, itemSelector }) {
  const section = document.querySelector(sectionSelector);
  const items = Array.from(document.querySelectorAll(itemSelector));

  if (!section || !items.length) return;

  function setActiveByScroll() {
    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const activeIndex = clamp(
      Math.round(progress * (items.length - 1)),
      0,
      items.length - 1
    );

    section.style.setProperty('--section-progress', progress.toFixed(4));

    items.forEach((item, index) => {
      const offset = index - activeIndex;
      item.classList.toggle('is-active', index === activeIndex);
      item.classList.toggle('is-past', index < activeIndex);
      item.classList.toggle('is-next', index > activeIndex);
      item.style.setProperty('--item-offset', offset);
    });
  }

  let ticking = false;

  function onScroll() {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      setActiveByScroll();
      ticking = false;
    });

    ticking = true;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', setActiveByScroll);

  setActiveByScroll();
}

/* =========================
   Keyword pill scroll motion
========================= */

function initKeywordScrollMotion() {
  const section = document.querySelector('.kit-keyword-section');
  if (!section) return;

  function updateKeyword() {
    const rect = section.getBoundingClientRect();
    const total = window.innerHeight + rect.height;
    const progress = clamp((window.innerHeight - rect.top) / total, 0, 1);

    section.style.setProperty('--keyword-progress', progress.toFixed(4));
  }

  let ticking = false;

  function onScroll() {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      updateKeyword();
      ticking = false;
    });

    ticking = true;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateKeyword);

  updateKeyword();
}

/* =========================
   Scrolling stacked cards
   참고 영상 3 유형
========================= */

function initKitCardStack() {
  const section = document.querySelector('[data-kit-stack-section]');
  const cards = Array.from(document.querySelectorAll('.kit-stack-card'));

  if (!section || !cards.length) return;

  function updateStack() {
    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const position = progress * (cards.length - 1);
    const activeIndex = clamp(Math.round(position), 0, cards.length - 1);

    cards.forEach((card, index) => {
      const rel = index - position;
      const abs = Math.min(Math.abs(rel), 2.2);
      const x = rel * 185;
      const y = abs * 18;
      const rotate = rel * 9;
      const scale = 1 - abs * 0.055;
      const opacity = clamp(1 - abs * 0.42, 0.16, 1);

      card.classList.toggle('is-active', index === activeIndex);
      card.style.zIndex = String(20 - Math.round(abs * 5));
      card.style.opacity = opacity.toFixed(3);
      card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
    });
  }

  let ticking = false;

  function onScroll() {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      updateStack();
      ticking = false;
    });

    ticking = true;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateStack);

  updateStack();
}

/* =========================
   FAQ Accordion
========================= */

function initKitFaq() {
  const faq = document.querySelector('[data-kit-faq]');
  if (!faq) return;

  const items = Array.from(faq.querySelectorAll('.kit-faq-item'));

  items.forEach((item) => {
    const button = item.querySelector('button');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((faqItem) => {
        faqItem.classList.remove('is-open');
        const faqButton = faqItem.querySelector('button');
        if (faqButton) faqButton.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
