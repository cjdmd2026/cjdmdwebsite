(() => {
  const tabs = [...document.querySelectorAll('[data-kit-step]')];
  function select(index, focus = false) {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
      if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(next, true); }
    });
  });
})();

(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const tsd = document.querySelector('.kw-tsd');
  const tips = [...document.querySelectorAll('.kw-tsd-steps li')];
  const rental = document.querySelector('.kw-rental-benefits');
  const pin = document.querySelector('.kw-benefits-pin');
  const list = document.querySelector('.kw-benefits');
  const benefits = [...document.querySelectorAll('.kw-benefits li')];
  const pictures = [...document.querySelectorAll('[data-benefit-image]')];
  const service = document.querySelector('.kw-service');
  const cards = [...document.querySelectorAll('.kw-service-grid li')];
  if (!tsd || !rental || !service) return;
  service.classList.add('has-scroll-reveal');
  const clamp = v => Math.max(0, Math.min(1, v));
  let queued = false;
  function render() {
    queued = false;
    const vh = window.innerHeight;
    const tipList = tsd.querySelector('.kw-tsd-steps');
    tipList.style.setProperty('--first-dot', `${tips[0].offsetHeight / 2}px`);
    tipList.style.setProperty('--last-dot', `${tips[tips.length-1].offsetHeight / 2}px`);
    let activeTip = -1;
    tips.forEach((tip, i) => {
      const active = motion.matches || tip.getBoundingClientRect().top < vh * .70;
      tip.classList.toggle('is-highlighted', active);
      if (active) activeTip = i;
    });
    tips.forEach((tip,i) => tip.classList.toggle('is-current', i === activeTip));
    tsd.dataset.activeStep = String(activeTip);
    tsd.querySelectorAll('[data-method-image]').forEach((picture,i) => { picture.hidden = i !== Math.max(0,activeTip); });
    const stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
    const progress = clamp((stickyTop - rental.getBoundingClientRect().top) / Math.max(1, rental.offsetHeight - pin.offsetHeight));
    const index = Math.min(benefits.length-1, Math.round(progress * (benefits.length-1)));
    const rowHeight = benefits[0].getBoundingClientRect().height;
    const windowHeight = list.parentElement.clientHeight;
    list.style.transform = motion.matches ? 'none' : `translateY(${(windowHeight-rowHeight)/2 - progress * (benefits.length-1) * rowHeight}px)`;
    benefits.forEach((item,i) => {item.classList.toggle('is-active',i===index);item.style.setProperty('--row-opacity',String([1,.42,.23,.16,.12][Math.abs(index-i)]))});
    pictures.forEach((item,i) => { item.hidden = i !== index; });
    const servicePin = service.querySelector('.kw-service-pin');
    const serviceGrid = service.querySelector('.kw-service-grid');
    const pinTop = parseFloat(getComputedStyle(servicePin).top) || 0;
    const serviceProgress = motion.matches ? 1 : clamp((pinTop - service.getBoundingClientRect().top) / Math.max(1, service.offsetHeight - servicePin.offsetHeight));
    service.style.setProperty('--service-progress', String(serviceProgress));
    const firstPicture = cards[0].querySelector('.kw-service-media');
    serviceGrid.style.setProperty('--rail-y', `${firstPicture.offsetHeight + parseFloat(getComputedStyle(cards[0].querySelector('.kw-step-copy')).marginTop)}px`);
    cards.forEach((card,i) => card.classList.toggle('is-visible', motion.matches || serviceProgress >= i / cards.length));
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(render); } }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  motion.addEventListener('change', schedule);
  render();
  // Keep one answer open, matching the supplied compact accordion view.
  const questions = [...document.querySelectorAll('.kw-faq details')];
  questions.forEach(item => item.addEventListener('toggle', () => {
    if (item.open) questions.forEach(other => { if (other !== item) other.open = false; });
  }));
})();

(() => {
  const carousel = document.querySelector('.kw-hero-main');
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-slide-to]')];
  const pause = carousel.querySelector('.kw-carousel-pause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0, stopped = reduced.matches, timer;
  function show(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide,i) => { slide.hidden = i !== active; });
    dots.forEach((dot,i) => dot.setAttribute('aria-pressed', String(i === active)));
  }
  function schedule() {
    clearInterval(timer);
    pause.setAttribute('aria-pressed', String(stopped));
    pause.setAttribute('aria-label', stopped ? '배너 자동 재생 시작' : '배너 자동 재생 정지');
    pause.textContent = stopped ? '▶' : 'Ⅱ';
    if (!stopped && !document.hidden && !carousel.contains(document.activeElement)) timer = setInterval(() => show(active + 1), 3000);
  }
  dots.forEach((dot,i) => dot.addEventListener('click', () => {show(i);schedule();}));
  pause.addEventListener('click', () => {stopped = !stopped;schedule();});
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => {stopped = reduced.matches;schedule();});
  schedule();
})();
