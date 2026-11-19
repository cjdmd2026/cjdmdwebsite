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
    tab.addEventListener('pointerenter', () => {if(matchMedia('(min-width:801px) and (hover:hover)').matches)select(index)});
    tab.addEventListener('focus', () => {if(matchMedia('(min-width:801px)').matches)select(index)});
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
  service.classList.toggle('has-scroll-reveal',matchMedia('(max-width:800px)').matches);
  if(!tsd.querySelector('.kw-tsd-pin')){const stage=document.createElement('div');stage.className='kw-tsd-pin';stage.append(...tsd.childNodes);tsd.append(stage)}
  const clamp = v => Math.max(0, Math.min(1, v));
  let queued = false;
  function render() {
    queued = false;
    const vh = window.innerHeight;
    const tipList = tsd.querySelector('.kw-tsd-steps');
    tipList.style.setProperty('--first-dot', `${tips[0].offsetHeight / 2}px`);
    tipList.style.setProperty('--last-dot', `${tips[tips.length-1].offsetHeight / 2}px`);
    const firstCenter=tips[0].offsetTop+tips[0].offsetHeight/2;
    const railStops=['#000 0px'];
    tips.forEach(tip=>{
      const center=tip.offsetTop+tip.offsetHeight/2-firstCenter;
      const radius=parseFloat(getComputedStyle(tip,'::before').width)/2+1;
      const a=Math.max(0,center-radius),b=Math.max(0,center+radius);
      railStops.push(`#000 ${a}px`,`transparent ${a}px`,`transparent ${b}px`,`#000 ${b}px`);
    });
    tipList.style.setProperty('--tsd-rail-mask',`linear-gradient(to bottom,${railStops.join(',')})`);

    let activeTip = -1;
    tips.forEach((tip, i) => {
      const desktop=matchMedia('(min-width:801px)').matches;
      const stage=tsd.querySelector('.kw-tsd-pin');
      const top=parseFloat(getComputedStyle(stage).top)||0;
      const progress=clamp((top-tsd.getBoundingClientRect().top)/Math.max(1,tsd.offsetHeight-stage.offsetHeight));
      const active = motion.matches || (desktop ? i<=Math.min(2,Math.floor(progress*3)) : tip.getBoundingClientRect().top < vh * .70);
      tip.classList.toggle('is-highlighted', active);
      tip.classList.toggle('is-revealed', active);
      if (active) activeTip = i;
    });
    tips.forEach((tip,i) => tip.classList.toggle('is-current', i === activeTip));
    const railEnd = activeTip > 0 ? tips[activeTip].offsetTop + tips[activeTip].offsetHeight / 2 : firstCenter;
    tipList.style.setProperty('--tsd-visible-rail-height', `${Math.max(0, railEnd-firstCenter)}px`);
    tsd.dataset.activeStep = String(activeTip);
    tsd.querySelectorAll('[data-method-image]').forEach((picture,i) => { picture.hidden = i !== Math.max(0,activeTip); });
    const stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
    const rawProgress = clamp((stickyTop - rental.getBoundingClientRect().top) / Math.max(1, rental.offsetHeight - pin.offsetHeight));
    const progress = clamp((rawProgress - .08) / .84);
    const mobileBenefits = matchMedia('(max-width:800px)').matches;
    const index = mobileBenefits ? 0 : Math.min(benefits.length-1, Math.round(progress * (benefits.length-1)));
    const rowHeight = benefits[0].getBoundingClientRect().height;
    const windowHeight = list.parentElement.clientHeight;
    const benefitsWindow = list.parentElement;
    benefitsWindow.style.translate = 'none';
    if (!mobileBenefits) {
      const mediaRect = rental.querySelector('.kw-rental-media').getBoundingClientRect();
      const windowRect = benefitsWindow.getBoundingClientRect();
      benefitsWindow.style.translate = `0 ${mediaRect.top + mediaRect.height / 2 - windowRect.top - windowRect.height / 2}px`;
    }
    list.style.transform = (motion.matches || mobileBenefits) ? 'none' : `translateY(${(windowHeight-rowHeight)/2 - progress * (benefits.length-1) * rowHeight}px)`;
    benefits.forEach((item,i) => {
      item.classList.toggle('is-active',i===index);
      item.style.setProperty('--row-opacity',String([1,.42,.23,.16,.12][Math.abs(index-i)]));
      if (mobileBenefits && (motion.matches || item.getBoundingClientRect().top < vh * .92)) item.classList.add('benefit-revealed');
    });
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
    slides.forEach((slide,i) => { const selected = i === active; slide.hidden = false; slide.classList.toggle('is-current-slide', selected); slide.setAttribute('aria-hidden', String(!selected)); slide.inert = !selected; });
    dots.forEach((dot,i) => dot.setAttribute('aria-pressed', String(i === active)));
  }
  function schedule() {
    clearInterval(timer);
    pause.setAttribute('aria-pressed', String(stopped));
    pause.setAttribute('aria-label', stopped ? '배너 자동 재생 시작' : '배너 자동 재생 정지');
    pause.textContent = stopped ? '▶' : 'Ⅱ';
    if (!stopped && !document.hidden && !carousel.contains(document.activeElement)) timer = setInterval(() => show(active + 1), 5000);
  }
  dots.forEach((dot,i) => dot.addEventListener('click', () => {show(i);schedule();}));
  pause.addEventListener('click', () => {stopped = !stopped;schedule();});
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => {stopped = reduced.matches;schedule();});
  show(0);
  schedule();
})();
