const about = document.querySelector('.about-v2');
let syncThreeIntro = () => {};
let eavesTransitioning = false;
let aboutPaging = false;

if (about && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const titleSelector = [
    '.about-hero .about-display',
    '.about-project-intro .about-display',
    '.about-why .about-display',
    '.about-three-intro .about-display',
    '.about-statement h2',
    '.about-experience-intro .about-display'
  ].join(', ');

  about.querySelectorAll(titleSelector).forEach(title => {
    const original = title.textContent;
    const spoken = document.createElement('span');
    const visual = document.createElement('span');
    const characters = [...original].filter(character => /\S/.test(character)).length;
    let index = 0;

    spoken.className = 'about-visually-hidden';
    spoken.textContent = original;
    visual.className = 'about-title-visual';
    visual.setAttribute('aria-hidden', 'true');

    original.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        visual.append(document.createTextNode(part));
        return;
      }
      const word = document.createElement('span');
      word.className = 'about-title-word';
      for (const character of part) {
        const letter = document.createElement('span');
        letter.className = 'about-title-char';
        letter.textContent = character;
        letter.style.setProperty('--about-char-index', index);
        letter.style.setProperty('--about-char-reverse-index', characters - index - 1);
        word.append(letter);
        index += 1;
      }
      visual.append(word);
    });
    title.replaceChildren(spoken, visual);
  });

  const copySteps = [
    ['.about-hero h1', '.38s'],
    ['.about-hero .about-lead', '.54s'],
    ['.about-project-intro h3', '.22s'],
    ['.about-project-intro p', '.36s'],
    ['.about-why .about-why-intro', '.24s'],
    ['.about-why p:not(.about-why-intro)', '.4s'],
    ['.about-three-intro p', '.32s'],
    ['.about-statement p', '.24s'],
    ['.about-experience-intro p', '.36s']
  ];
  copySteps.forEach(([selector, delay]) => {
    about.querySelectorAll(selector).forEach(copy => {
      copy.classList.add('about-copy-step');
      copy.style.setProperty('--about-copy-delay', delay);
    });
  });
  about.classList.add('has-title-motion');
}

const photoSequence = about?.querySelector('.about-photo-sequence');
if (photoSequence) {
  const image = photoSequence.querySelector('.about-photo-sequence__image img');
  const scenes = [...photoSequence.querySelectorAll('.about-photo-scene')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let wheelPause = 0;
  let renderedIndex = -1;
  let renderedTravel = -1;

  function easeIntoThreeEaves(target) {
    const start = window.scrollY;
    const distance = target - start;
    const duration = 820;
    const root = document.documentElement;
    const previousSnap = root.style.scrollSnapType;
    let startTime;
    root.style.scrollSnapType = 'none';

    function tick(time) {
      if (startTime === undefined) startTime = time;
      const progress = Math.min(1, (time - startTime) / duration);
      const eased = progress < .5
        ? 4 * progress ** 3
        : 1 - (-2 * progress + 2) ** 3 / 2;
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      syncThreeIntro();
      if (progress < 1) requestAnimationFrame(tick);
      else root.style.scrollSnapType = previousSnap;
    }

    requestAnimationFrame(tick);
  }

  function updatePhotoSequence() {
    frame = 0;
    const viewport = Math.max(1, window.innerHeight);
    const stage = Math.max(0, Math.min(scenes.length - 1, -photoSequence.getBoundingClientRect().top / viewport));
    const currentIndex = Math.round(stage);
    const travel = Math.max(0, image.offsetHeight - viewport);
    if (currentIndex === renderedIndex && travel === renderedTravel) return;
    renderedIndex = currentIndex;
    renderedTravel = travel;
    photoSequence.style.setProperty('--about-photo-shift', `${-travel * currentIndex / (scenes.length - 1)}px`);
    scenes.forEach((scene, index) => scene.classList.toggle('is-current', index === currentIndex));
    photoSequence.classList.add('is-motion-ready');
  }

  function schedulePhotoSequence() {
    if (!frame) frame = requestAnimationFrame(updatePhotoSequence);
  }

  updatePhotoSequence();
  window.addEventListener('scroll', schedulePhotoSequence, { passive: true });
  window.addEventListener('resize', schedulePhotoSequence);
  window.addEventListener('pageshow', schedulePhotoSequence);
  image.addEventListener('load', schedulePhotoSequence);

  // Advance one image band per wheel gesture while the full-screen sequence is pinned.
  window.addEventListener('wheel', event => {
    if (eavesTransitioning || aboutPaging) { event.preventDefault(); return; }
    if (event.ctrlKey || Math.abs(event.deltaY) < 2 || document.querySelector('.menu-overlay.active')) return;
    const viewport = Math.max(1, window.innerHeight);
    const sequenceTop = window.scrollY + photoSequence.getBoundingClientRect().top;
    const position = (window.scrollY - sequenceTop) / viewport;
    const direction = Math.sign(event.deltaY);
    if (position < -.02 || position > scenes.length + .02) return;
    if ((position <= 0 && direction < 0) || (position >= scenes.length && direction > 0)) return;
    event.preventDefault();
    if (wheelPause) return;
    const current = Math.round(position);
    const next = Math.max(0, Math.min(scenes.length, current + direction));
    const target = sequenceTop + next * viewport;
    const crossingThreeEaves = current === scenes.length || next === scenes.length;
    if (crossingThreeEaves && !reducedMotion.matches) easeIntoThreeEaves(target);
    else window.scrollTo({ top: target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    wheelPause = window.setTimeout(() => { wheelPause = 0; }, crossingThreeEaves ? 920 : 760);
  }, { passive: false });
}

if (about && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const scenes = [...about.querySelectorAll('.about-reveal, [data-about-enter]')]
    .filter(scene => !scene.matches('.about-experience-intro'));
  about.classList.add('has-motion');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  scenes.forEach(scene => observer.observe(scene));
}

const threeIntro = about?.querySelector('.about-three-intro');
if (threeIntro && photoSequence) {
  let previousOffset;
  syncThreeIntro = () => {
    const viewport = Math.max(1, window.innerHeight);
    const entryTop = photoSequence.getBoundingClientRect().top + viewport * 3;
    const progress = Math.max(0, Math.min(1, 1 - entryTop / viewport));
    const eased = progress * progress * (3 - 2 * progress);
    const offset = Math.round((1 - eased) * viewport * .05);
    if (offset === previousOffset) return;
    previousOffset = offset;
    threeIntro.style.setProperty('--three-offset', `${offset}px`);
  };
}
const eaves = about?.querySelector('.about-eaves');
const overlaySlots = [...(eaves?.querySelectorAll('.about-eave-slot') || [])];
if (threeIntro && eaves && overlaySlots.length) {
  let transitionPauseUntil = 0;

  function moveBetweenIntroAndEaves(forward) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      (forward ? eaves : threeIntro).scrollIntoView({ behavior: 'instant', block: 'start' });
      return;
    }
    eavesTransitioning = true;
    const root = document.documentElement;
    const previousSnap = root.style.scrollSnapType;
    const introTop = window.scrollY + threeIntro.getBoundingClientRect().top;
    const eavesTop = window.scrollY + eaves.getBoundingClientRect().top;
    const introPlaceholder = document.createElement('div');
    introPlaceholder.style.height = `${threeIntro.offsetHeight}px`;
    introPlaceholder.style.marginTop = '-100svh';
    introPlaceholder.setAttribute('aria-hidden', 'true');
    threeIntro.before(introPlaceholder);
    const slotPlaceholders = overlaySlots.map(slot => {
      const placeholder = document.createElement('div');
      placeholder.style.height = `${slot.offsetHeight}px`;
      placeholder.setAttribute('aria-hidden', 'true');
      slot.before(placeholder);
      return placeholder;
    });
    root.style.scrollSnapType = 'none';
    threeIntro.classList.add('is-overlay-backdrop');
    threeIntro.style.transform = 'translate3d(0, 0, 0)';
    let slotTop = 0;
    overlaySlots.forEach((slot, index) => {
      const direction = index === 1 ? 1 : -1;
      slot.style.top = `${slotTop}px`;
      slotTop += slot.offsetHeight;
      about.append(slot);
      slot.classList.add('is-overlaying');
      slot.style.transform = `translate3d(${forward ? direction * window.innerWidth : 0}px, 0, 0)`;
    });
    window.scrollTo({ top: eavesTop, behavior: 'instant' });

    function finish() {
      if (!forward) window.scrollTo({ top: introTop, behavior: 'instant' });
      overlaySlots.forEach((slot, index) => {
        slotPlaceholders[index].replaceWith(slot);
        slot.classList.remove('is-overlaying');
        slot.style.transform = '';
        slot.style.top = '';
      });
      threeIntro.classList.remove('is-overlay-backdrop');
      threeIntro.style.transform = '';
      introPlaceholder.remove();
      root.style.scrollSnapType = previousSnap;
      eavesTransitioning = false;
      transitionPauseUntil = Date.now() + 250;
      window.dispatchEvent(new Event('scroll'));
    }

    let startTime;
    function tick(time) {
      if (startTime === undefined) startTime = time;
      const progress = Math.min(1, (time - startTime) / 900);
      const reveal = forward ? progress : 1 - progress;
      overlaySlots.forEach((slot, index) => {
        const direction = index === 1 ? 1 : -1;
        const start = index * .18;
        const local = Math.max(0, Math.min(1, (reveal - start) / .64));
        const eased = local * local * (3 - 2 * local);
        slot.style.transform = `translate3d(${Math.round(direction * (1 - eased) * window.innerWidth)}px, 0, 0)`;
      });
      window.scrollTo({ top: eavesTop, behavior: 'instant' });
      if (progress < 1) requestAnimationFrame(tick);
      else finish();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('wheel', event => {
    if (event.defaultPrevented || event.ctrlKey || Math.abs(event.deltaY) < 2 || document.querySelector('.menu-overlay.active')) return;
    const viewport = Math.max(1, window.innerHeight);
    const introTop = window.scrollY + threeIntro.getBoundingClientRect().top;
    const eavesTop = window.scrollY + eaves.getBoundingClientRect().top;
    const atIntro = Math.abs(window.scrollY - introTop) < viewport * .12;
    const atEaves = Math.abs(window.scrollY - eavesTop) < viewport * .12;
    if (eavesTransitioning || Date.now() < transitionPauseUntil) {
      if (atIntro || atEaves) event.preventDefault();
      return;
    }
    if (event.deltaY > 0 && atIntro) {
      event.preventDefault();
      moveBetweenIntroAndEaves(true);
    } else if (event.deltaY < 0 && atEaves) {
      event.preventDefault();
      moveBetweenIntroAndEaves(false);
    }
  }, { passive: false });
}
const eaveSlots = [...(about?.querySelectorAll('.about-eave-slot:not(.about-eave-slot--house)') || [])];
const statement = about?.querySelector('.about-statement');
const experience = about?.querySelector('.about-experience');
const experienceIntro = experience?.querySelector('.about-experience-intro');
const scrollScenes = [...(threeIntro ? [threeIntro] : []), ...eaveSlots, ...(statement ? [statement] : []), ...(experienceIntro ? [experienceIntro] : [])];
if (scrollScenes.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let frame = 0;
  let previousStatementProgress = -1;
  let previousScrollY = window.scrollY;
  let scrollDirection = 1;

  function updateScrollScenes() {
    frame = 0;
    syncThreeIntro();
    if (window.scrollY !== previousScrollY) {
      scrollDirection = Math.sign(window.scrollY - previousScrollY);
      previousScrollY = window.scrollY;
    }
    for (const scene of scrollScenes) {
      const rect = (scene === experienceIntro ? experience : scene).getBoundingClientRect();
      if (scene === statement) {
        // Leave upward toward the flow; returning brings the photos back from above.
        statement.classList.toggle('is-leaving', rect.top < -2 && scrollDirection > 0);
        const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        if (progress !== previousStatementProgress) {
          previousStatementProgress = progress;
          const copyProgress = Math.max(0, Math.min(1, (progress - .14) / .64));
          const copyEased = copyProgress * copyProgress * (3 - 2 * copyProgress);
          statement.style.setProperty('--statement-copy-opacity', copyEased.toFixed(3));
          statement.style.setProperty('--statement-copy-offset', `${((1 - copyEased) * 24).toFixed(1)}px`);
        }
      }
      const trigger = window.innerHeight - Math.min(rect.height * .3, window.innerHeight * .22);
      scene.classList.toggle('is-visible', rect.top <= trigger && (scene !== experienceIntro || rect.bottom > 0));
    }
  }

  function scheduleScrollScenes() {
    if (frame) return;
    frame = requestAnimationFrame(updateScrollScenes);
  }

  scrollScenes.forEach(scene => scene.classList.add('is-animated'));
  updateScrollScenes();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollScenes.forEach(scene => scene.classList.add('is-ready')));
  });
  window.addEventListener('scroll', scheduleScrollScenes, { passive: true });
  window.addEventListener('resize', scheduleScrollScenes);
  window.addEventListener('load', scheduleScrollScenes);
  window.addEventListener('pageshow', scheduleScrollScenes);
}

// Continue the full-screen sequence through the remaining About sections.
const pageSections = [eaves, statement, experience, about?.querySelector('.about-footer')].filter(Boolean);
if (pageSections.length > 1) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pauseUntil = 0;

  function moveToSection(target) {
    const start = window.scrollY;
    const distance = target - start;
    if (Math.abs(distance) < 2) return;
    const root = document.documentElement;
    const previousSnap = root.style.scrollSnapType;
    const startTime = performance.now();
    const timedDuration = reducedMotion.matches ? 0 : 700;
    aboutPaging = true;
    root.style.scrollSnapType = 'none';

    function finish() {
      root.style.scrollSnapType = previousSnap;
      aboutPaging = false;
      pauseUntil = Date.now() + 220;
    }

    function tick(time) {
      if (timedDuration) {
        const progress = Math.min(1, (time - startTime) / timedDuration);
        const eased = (1 - Math.cos(Math.PI * progress)) / 2;
        window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
        if (progress < 1) requestAnimationFrame(tick);
        else finish();
      } else {
        if (Math.abs(window.scrollY - target) > 2 && time - startTime < 3000) requestAnimationFrame(tick);
        else finish();
      }
    }

    // All remaining sections share the same gentle 0.7-second page transition.
    if (!timedDuration) window.scrollTo({ top: target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    requestAnimationFrame(tick);
  }

  window.addEventListener('wheel', event => {
    if (event.defaultPrevented || event.ctrlKey || event.shiftKey || Math.abs(event.deltaY) < 2 || Math.abs(event.deltaX) > Math.abs(event.deltaY) || document.querySelector('.menu-overlay.active')) return;
    const viewport = Math.max(1, window.innerHeight);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport);
    const stops = pageSections.map(section => Math.min(maxScroll, window.scrollY + section.getBoundingClientRect().top));
    if (window.scrollY < stops[0] - 2) return;
    if (aboutPaging || Date.now() < pauseUntil) {
      event.preventDefault();
      return;
    }
    const direction = Math.sign(event.deltaY);
    let current = 0;
    stops.forEach((top, index) => { if (window.scrollY >= top - 2) current = index; });
    const rect = pageSections[current].getBoundingClientRect();
    // Short screens can scroll through taller content before advancing.
    if (rect.height > viewport + 2 && ((direction > 0 && rect.bottom > viewport + 2) || (direction < 0 && rect.top < -2))) return;
    // The existing sideways entrance owns the return to THREE EAVES.
    if (current === 0 && direction < 0) return;
    const next = Math.max(0, Math.min(pageSections.length - 1, current + direction));
    if (next === current) return;
    event.preventDefault();
    moveToSection(stops[next]);
  }, { passive: false });
}

