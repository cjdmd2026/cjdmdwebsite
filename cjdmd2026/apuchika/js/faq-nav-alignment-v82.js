document.addEventListener('DOMContentLoaded', () => {
  const faq = document.querySelector('#faq');
  const logo = document.querySelector('header.apu-header .brand img');
  const action = document.querySelector('header.apu-header .header-inquiry');
  if (!faq || !logo || !action) return;
  let queued = false;
  const align = () => {
    queued = false;
    if (!matchMedia('(min-width:801px)').matches) {
      faq.style.removeProperty('--faq-left');
      faq.style.removeProperty('--faq-right');
      return;
    }
    const brand = logo.getBoundingClientRect();
    const button = action.getBoundingClientRect();
    // The logo artwork starts 61px into its 900px source canvas.
    const left = brand.left + brand.width * 61 / 900;
    const right = document.documentElement.clientWidth - button.right;
    faq.style.setProperty('--faq-left', left + 'px');
    faq.style.setProperty('--faq-right', Math.max(0, right) + 'px');
  };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(align); } };
  const observer = new ResizeObserver(schedule);
  observer.observe(logo);
  observer.observe(action);
  observer.observe(document.querySelector('header.apu-header'));
  window.addEventListener('resize', schedule, { passive: true });
  document.fonts.ready.then(schedule);
  schedule();
});
