(() => {
  const section = document.querySelector('.about-process');
  if (!section) return;
  const cards = [...section.querySelectorAll('.about-process-card')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 801px)');
  let queued = false;
  const clamp = n => Math.max(0, Math.min(1, n));
  function update() {
    queued = false;
    const pinned = desktop.matches && !reduced.matches;
    section.classList.toggle('is-pinned', pinned);
    const rect = section.getBoundingClientRect();
    const progress = clamp(-rect.top / Math.max(1, section.offsetHeight - innerHeight));
    cards.forEach((card, i) => {
      const p = pinned ? clamp((progress - .06 - i * .19) / .2) : 1;
      const eased = 1 - Math.pow(1 - p, 3);
      card.style.opacity = String(eased);
      card.style.transform = `translateY(${(1 - eased) * 75}px)`;
    });
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  desktop.addEventListener('change', schedule);
  update();
})();
