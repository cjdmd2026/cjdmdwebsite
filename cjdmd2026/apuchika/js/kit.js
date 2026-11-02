(() => {
  document.addEventListener('DOMContentLoaded', () => {
    initKitCarousel();
    initKitRentalScroll();
    initKitFaq();
  });

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /* =========================
     Kit Hero Carousel
  ========================= */

  function initKitCarousel() {
    const carousel = document.querySelector('[data-kit-carousel]');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.kit-hero-slide'));
    const dots = Array.from(carousel.querySelectorAll('.kit-carousel-dot'));

    if (!slides.length || !dots.length) return;

    let currentIndex = 0;
    let timer = null;

    // 배너 넘어가는 시간
    const delay = 8000;

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
     Kit Rental Scroll
     오른쪽 항목 opacity만 변경
  ========================= */

  function initKitRentalScroll() {
    const section = document.querySelector('.kit-rental-section');
    if (!section) return;

    const steps = Array.from(section.querySelectorAll('.kit-rental-step'));
    if (!steps.length) return;

    function updateRentalSteps() {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollable = rect.height - viewportHeight;
      const passed = -rect.top;

      const progress = scrollable > 0 ? clamp(passed / scrollable, 0, 1) : 0;
      const activeIndex = Math.round(progress * (steps.length - 1));

      steps.forEach((step, index) => {
        step.classList.toggle('is-active', index === activeIndex);
      });
    }

    updateRentalSteps();

    window.addEventListener('scroll', updateRentalSteps, { passive: true });
    window.addEventListener('resize', updateRentalSteps);
  }

function initKitRentalScroll() {
  const section = document.querySelector('.kit-rental-section');
  if (!section) return;

  const steps = Array.from(section.querySelectorAll('.kit-rental-step'));
  if (!steps.length) return;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateRentalSteps() {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const scrollable = rect.height - viewportHeight;
    const passed = -rect.top;

    const progress = scrollable > 0 ? clamp(passed / scrollable, 0, 1) : 0;
    const activeIndex = Math.round(progress * (steps.length - 1));

    steps.forEach((step, index) => {
      step.classList.toggle('is-active', index === activeIndex);
    });
  }

  updateRentalSteps();

  window.addEventListener('scroll', updateRentalSteps, { passive: true });
  window.addEventListener('resize', updateRentalSteps);
}

document.addEventListener('DOMContentLoaded', () => {
  initKitRentalScroll();
});

  /* =========================
     Kit FAQ Accordion
  ========================= */

  function initKitFaq() {
    const faqItems = Array.from(document.querySelectorAll('.kit-faq-item'));
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const button = item.querySelector('button');
      if (!button) return;

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach((faq) => {
          faq.classList.remove('is-open');
        });

        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    });
  }
})();