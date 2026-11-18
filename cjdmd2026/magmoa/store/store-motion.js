(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let gridObserver;
  let frame = 0;
  const lookbook = document.querySelector('#lookbook');
  const banner = lookbook?.querySelector('.paper-photo-corner');
  const grid = document.querySelector('#productGrid');
  const clamp = value => Math.max(0, Math.min(1, value));

  function register(element, delay = 0) {
    if (element.classList.contains('store-reveal')) return;
    element.classList.add('store-reveal');
    element.style.setProperty('--reveal-delay', `${delay}ms`);
    observer.observe(element);
  }

  function products() {
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    Array.from(grid.children).forEach((card, index) => register(card, (index % columns) * 85));
  }

  function paint() {
    frame = 0;
    if (!banner || preference.matches) return;
    const rect = banner.getBoundingClientRect();
    const height = innerHeight;
    if (rect.bottom < 0 || rect.top > height) return;
    const progress = clamp((height - rect.top) / (height + rect.height));
    banner.style.setProperty('--lookbook-inset', `${(1 - clamp(progress / .45)) * 7}%`);
    banner.style.setProperty('--lookbook-scale', (1.045 - progress * .045).toFixed(4));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  function setup() {
    observer?.disconnect();
    gridObserver?.disconnect();
    document.documentElement.classList.remove('store-motion');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
    document.documentElement.classList.add('store-motion');
    document.querySelectorAll('#shop > .reveal, #lookbook .reveal, #about .reveal').forEach((el, index) => register(el, el.closest('#about') ? (index - 3) * 160 : 0));
    // Reconnect existing elements when the motion preference changes.
    document.querySelectorAll('.store-reveal:not(.is-visible)').forEach(el => observer.observe(el));
    if (grid) {
      products();
      gridObserver = new MutationObserver(products);
      gridObserver.observe(grid, { childList: true });
    }
    schedule();
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  preference.addEventListener('change', setup);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
