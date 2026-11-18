(() => {
  const story = document.querySelector('.scroll-story');
  const next = document.querySelector('.features-after-story');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!story || !next || reducedMotion.matches) return;

  const sticky = story.querySelector('.scroll-story__sticky');
  const viewport = story.querySelector('.scroll-story__viewport');
  const track = story.querySelector('.visual-steps');
  const count = track.children.length;
  const last = track.lastElementChild;
  const reveal = story.querySelector('.scroll-story__reveal');
  const counter = story.querySelector('.scroll-story__progress');
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  let ticking = false;
  const cards = [...track.children];
  const ease = value => { const t = clamp(value); return t * t * (3 - 2 * t); };

  story.classList.add('is-ready');
  next.classList.add('is-story-ready');

  function update() {
    ticking = false;
    const range = Math.max(1, story.offsetHeight - window.innerHeight);
    const progress = clamp(-story.getBoundingClientRect().top / range);
    const travel = clamp(progress / 0.77);
    const centers = cards.map(card => viewport.clientWidth / 2 - card.offsetLeft - card.offsetWidth / 2);
    const entry = viewport.clientWidth * (window.innerWidth > 700 ? .34 : .24);
    let position;
    if (travel < .18) {
      position = centers[0] + entry * (1 - ease(travel / .18));
    } else {
      const phase = clamp((travel - .18) / .74) * (count - 1);
      const index = Math.min(count - 2, Math.floor(phase));
      const movement = ease((phase - index - .16) / .68);
      position = centers[index] + (centers[index + 1] - centers[index]) * movement;
    }
    track.style.transform = `translate3d(${position}px, 0, 0)`;
    let nearest = 0;
    cards.forEach((card, index) => {
      const distance = Math.abs(position - centers[index]);
      if (distance < Math.abs(position - centers[nearest])) nearest = index;
      const emphasis = 1 - clamp(distance / (card.offsetWidth * 1.15));
      card.style.transform = `translate3d(0, ${(1 - emphasis) * 18}px, 0) scale(${.95 + emphasis * .05})`;
      card.style.opacity = String(.65 + emphasis * .35);
    });
    counter.textContent = `${String(nearest + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

    const expansion = clamp((progress - 0.77) / 0.23);
    last.querySelectorAll('.step-copy, .number').forEach(el => {
      el.style.opacity = String(1 - clamp(expansion / .12));
    });
    if (expansion > 0) {
      const card = last.getBoundingClientRect();
      const frame = sticky.getBoundingClientRect();
      const top = Math.max(0, card.top - frame.top) * (1 - expansion);
      const right = Math.max(0, frame.right - card.right) * (1 - expansion);
      const bottom = Math.max(0, frame.bottom - card.bottom) * (1 - expansion);
      const left = Math.max(0, card.left - frame.left) * (1 - expansion);
      reveal.style.setProperty("--story-expansion", String(expansion));
      reveal.style.opacity = String(clamp(expansion / .16));
      reveal.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${24 * (1 - expansion)}px)`;
      counter.style.color = '#fff';
    } else {
      reveal.style.opacity = '0';
      counter.style.color = '';
    }
  }

  function schedule() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
})();
