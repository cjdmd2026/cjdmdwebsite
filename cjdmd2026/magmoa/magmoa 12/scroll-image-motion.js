/* Image choreography follows scroll in both directions, independent of UI swaps. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 800px)');
  const definitions = [
    ['.about-question', '.about-photo-stack', false, 'photo'],
    ['.about-way', '.about-way-visual', true, 'way'],
    ['.editorial-features', '.feature-editorial-visual', true, 'phone']
  ];
  const scenes = definitions.map(([section, target, pinned, type]) => ({
    section: document.querySelector(section), target: document.querySelector(target), pinned, type
  })).filter(scene => scene.section && scene.target);
  if (!scenes.length) return;
  let pending = false;
  function update() {
    pending = false;
    scenes.forEach(({section, target, pinned, type}) => {
      const rect = section.getBoundingClientRect();
      const enabled = !reduced.matches && !small.matches;
      const range = pinned ? section.offsetHeight - innerHeight : innerHeight + section.offsetHeight;
      const progress = Math.max(0, Math.min(1, (pinned ? -rect.top : innerHeight - rect.top) / Math.max(1, range)));
      target.classList.toggle('has-scroll-image-motion', enabled);
      target.style.setProperty('--image-progress', enabled ? progress : .5);
      target.dataset.motionType = type;
    });
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  small.addEventListener('change', schedule);
  update();
})();
