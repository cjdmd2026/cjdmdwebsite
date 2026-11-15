document.documentElement.classList.add('has-js');


    /* 01. 요소 선택 */

    const commonHeader =
      document.getElementById('commonHeader');

    const scrollTopBtn =
      document.getElementById('scrollTopBtn');

    const mobileMenuToggle =
      document.getElementById('mobileMenuToggle');

    const headerNav =
      document.getElementById('headerNav');

    const concernStage =
      document.getElementById('concernStage');

    const packageArrows =
      document.querySelector('.package-down-arrows');

    const packageSection =
      document.querySelector('.package-section');

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lastScrollY = window.scrollY;


    /* 02. 헤더 / 맨 위로 버튼 */

    function handleScrollUI() {
      const currentY = window.scrollY;

      const isMenuOpen =
        headerNav?.classList.contains('is-open') ?? false;

      if (commonHeader) {

        if (isMenuOpen || currentY <= 10) {
          commonHeader.classList.remove('is-hidden');
        }
        else if (currentY > lastScrollY && currentY > 80) {
          commonHeader.classList.add('is-hidden');
        }
        else if (currentY < lastScrollY) {
          commonHeader.classList.remove('is-hidden');
        }

      }

      scrollTopBtn?.classList.toggle(
        'is-visible',
        currentY > 300
      );

      lastScrollY = currentY;
    }

    window.addEventListener(
      'scroll',
      handleScrollUI,
      { passive: true }
    );

    window.addEventListener('resize', handleScrollUI);

    handleScrollUI();

    scrollTopBtn?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    });


    /* 03. 모바일 메뉴 */

    function setMobileMenu(open) {

      mobileMenuToggle?.classList.toggle('is-active', open);

      headerNav?.classList.toggle('is-open', open);

      mobileMenuToggle?.setAttribute(
        'aria-expanded',
        String(open)
      );

      mobileMenuToggle?.setAttribute(
        'aria-label',
        open ? '메뉴 닫기' : '메뉴 열기'
      );

      if (open) {
        commonHeader?.classList.remove('is-hidden');
      }
    }

    mobileMenuToggle?.addEventListener('click', () => {
      setMobileMenu(
        !headerNav?.classList.contains('is-open')
      );
    });

    document.querySelectorAll('.header-menu-item a').forEach(link => {
      link.addEventListener('click', () => {
        setMobileMenu(false);
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setMobileMenu(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setMobileMenu(false);
      }
    });


    /* 04. 기본 스크롤 등장 효과 */

    const revealElements = document.querySelectorAll(
      '.reveal-up:not(.package-title):not(.package-card)'
    );

    if (
      reducedMotion ||
      !('IntersectionObserver' in window)
    ) {

      revealElements.forEach(el => {
        el.classList.add('is-visible');
      });

    } else {

      const revealObserver = new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: .08,
          rootMargin: '0px 0px -20px 0px'
        }
      );

      revealElements.forEach(el => {
        revealObserver.observe(el);
      });

    }


    /* 05. 독서 고민 말풍선 순차 등장 */

    if (concernStage) {

      if (
        reducedMotion ||
        !('IntersectionObserver' in window)
      ) {

        concernStage.classList.add('is-chat-active');

      } else {

        const chatObserver = new IntersectionObserver(
          (entries, observer) => {

            entries.forEach(entry => {

              if (!entry.isIntersecting) return;

              concernStage.classList.add('is-chat-active');

              observer.unobserve(entry.target);

            });

          },
          {
            threshold: .18,
            rootMargin: '0px 0px -40px 0px'
          }
        );

        chatObserver.observe(concernStage);

      }
    }


    /* 06. 화살표 3개 → 패키지 제목 → 카드 */

    if (packageSection && packageArrows) {

      let ready = false;

      function showPackageContent() {

        if (ready) return;

        ready = true;

        packageSection.classList.add('is-package-ready');

      }

      if (
        reducedMotion ||
        !('IntersectionObserver' in window)
      ) {

        packageArrows.classList.add('is-arrow-active');

        showPackageContent();

      } else {

        const lastArrow = packageArrows.querySelector(
          'svg path:last-child'
        );

        lastArrow?.addEventListener('transitionend', event => {

          if (event.propertyName === 'opacity') {
            showPackageContent();
          }

        });

        const arrowObserver = new IntersectionObserver(
          (entries, observer) => {

            entries.forEach(entry => {

              if (!entry.isIntersecting) return;

              packageArrows.classList.add('is-arrow-active');

              // 애니메이션 전환이 생략되는 환경 대비
              window.setTimeout(showPackageContent, 950);

              observer.unobserve(entry.target);

            });

          },
          {
            threshold: .4,
            rootMargin: '0px 0px -20px 0px'
          }
        );

        arrowObserver.observe(packageArrows);

      }
    }



    /* ==========================================
       07. 동화책 3단계 기능 - 자연스러운 무한 슬라이더
       세 책을 반복 배치하고 트랙 전체를 한 칸씩 이동
       ========================================== */
    const bookFeature = document.querySelector('.storybook-feature');
    if (bookFeature) {
      const bookViewport = bookFeature.querySelector('.storybook-feature-viewport');
      const bookSlides = [...bookViewport.querySelectorAll('.storybook-feature-slide')];
      const bookDots = [...bookFeature.querySelectorAll('.storybook-feature-dot')];
      const bookTitle = bookFeature.querySelector('#storybookFeatureTitle');
      const bookDescription = bookFeature.querySelector('#storybookFeatureDescription');
      const bookCarousel = bookFeature.querySelector('.storybook-feature-carousel');
      const bookPrev = bookFeature.querySelector('.storybook-feature-arrow--prev');
      const bookNext = bookFeature.querySelector('.storybook-feature-arrow--next');
      const bookCount = bookSlides.length;

      if (bookCount > 0 && bookViewport) {
        /* 복제본 - 원본 - 복제본 순서로 세 세트를 이어 붙임 */
        const bookTrack = document.createElement('div');
        bookTrack.className = 'storybook-feature-track';

        const makeClone = (slide) => {
          const clone = slide.cloneNode(true);
          clone.classList.remove('is-current', 'is-before', 'is-after');
          clone.setAttribute('aria-hidden', 'true');
          clone.querySelectorAll('img').forEach(img => img.draggable = false);
          return clone;
        };

        bookSlides.forEach(slide => bookTrack.appendChild(makeClone(slide)));
        bookSlides.forEach(slide => {
          slide.classList.remove('is-current', 'is-before', 'is-after');
          bookTrack.appendChild(slide);
        });
        bookSlides.forEach(slide => bookTrack.appendChild(makeClone(slide)));
        bookViewport.replaceChildren(bookTrack);

        let bookIndex = 0;
        let bookSlot = bookCount; // 가운데 원본 세트부터 시작
        let bookMoving = false;
        let bookTouchStartX = null;
        let bookFallbackTimer = null;

        /* 디스플레이에 맞는 책 간 실제 간격을 측정 */
        function bookPosition(animate) {
          if (!animate) bookTrack.style.transition = 'none';
          const width = bookTrack.firstElementChild.getBoundingClientRect().width;
          const gap = parseFloat(getComputedStyle(bookTrack).columnGap) || 0;
          const step = width + gap;
          bookTrack.style.setProperty('--book-offset', `${-bookSlot * step}px`);
          if (!animate) {
            // 레이아웃 반영 후 CSS 전환 다시 활성화
            void bookTrack.offsetWidth;
            bookTrack.style.transition = '';
          }
        }

        function bookUpdateText() {
          const current = bookSlides[bookIndex];
          if (bookTitle) bookTitle.textContent = current.dataset.title || '';
          if (bookDescription) {
            bookDescription.replaceChildren();
            (current.dataset.description || '').split('|').forEach((line, i) => {
              if (i) bookDescription.append(document.createElement('br'));
              bookDescription.append(document.createTextNode(line));
            });
          }
          bookDots.forEach((dot, i) => {
            const active = i === bookIndex;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-current', String(active));
          });
          [...bookTrack.children].forEach((slide, i) => {
            slide.setAttribute('aria-hidden', String(i !== bookSlot));
          });
        }

        function bookFinish() {
          if (!bookMoving) return;
          bookMoving = false;
          if (bookFallbackTimer !== null) {
            clearTimeout(bookFallbackTimer);
            bookFallbackTimer = null;
          }
          // 끝의 복제본까지 이동했다면 동일한 진짜 책 위치로 즉시 복귀
          // 이미지가 같아서 화면에 점프가 나타나지 않음
          if (bookSlot >= bookCount * 2) bookSlot -= bookCount;
          if (bookSlot < bookCount) bookSlot += bookCount;
          bookIndex = (bookSlot - bookCount) % bookCount;
          bookPosition(false);
          bookUpdateText();
        }

        function bookMove(direction) {
          if (bookMoving) return; // 겹쳐서 이동하지 않도록 보호
          bookMoving = true;
          bookSlot += direction > 0 ? 1 : -1;
          if (reducedMotion) {
            bookFinish();
            return;
          }
          bookPosition(true);
          // 브라우저 전환을 생략한 경우에도 잠기지 않게 안전장치
          bookFallbackTimer = window.setTimeout(bookFinish, 850);
        }

        bookTrack.addEventListener('transitionend', (event) => {
          if (event.target === bookTrack && event.propertyName === 'transform') {
            bookFinish();
          }
        });
        bookPrev?.addEventListener('click', () => bookMove(-1));
        bookNext?.addEventListener('click', () => bookMove(1));
        bookDots.forEach((dot, i) => {
          dot.addEventListener('click', () => {
            if (bookMoving || i === bookIndex) return;
            const forward = (i - bookIndex + bookCount) % bookCount;
            const backward = (bookIndex - i + bookCount) % bookCount;
            bookMove(forward <= backward ? 1 : -1);
          });
        });

        bookCarousel?.addEventListener('keydown', event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            bookMove(event.key === 'ArrowLeft' ? -1 : 1);
          }
        });

        bookCarousel?.addEventListener('touchstart', event => {
          bookTouchStartX = event.changedTouches[0]?.clientX ?? null;
        }, { passive: true });
        bookCarousel?.addEventListener('touchend', event => {
          if (bookTouchStartX === null) return;
          const x = event.changedTouches[0]?.clientX ?? bookTouchStartX;
          const delta = x - bookTouchStartX;
          if (Math.abs(delta) > 45) bookMove(delta < 0 ? 1 : -1);
          bookTouchStartX = null;
        }, { passive: true });

        // 화면 크기가 바뀌어도 현재 책이 가운데에 유지됨
        window.addEventListener('resize', () => {
          if (!bookMoving) bookPosition(false);
        });

        bookPosition(false);
        bookUpdateText();
      }
    }


/* ==========================================
   09. 동화책 패키지 카드 앞면/뒷면 뒤집기
   ========================================== */
(() => {
  const flipCards = document.querySelectorAll('.ilkko-package-flip');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped');
      const name = card.dataset.bookName || '동화책';
      card.setAttribute('aria-pressed', String(flipped));
      card.setAttribute('aria-label', `${name} ${flipped ? '설명 보기' : '표지 크게 보기'}`);
    });
  });
})();



/* ==========================================
   08. 읽:꼬 동화책 패키지 구매 버튼
   ========================================== */
(() => {
  const purchaseButton = document.getElementById('ilkkoPurchaseButton');
  const purchaseNotice = document.getElementById('ilkkoPurchaseNotice');
  // 실제 구매 URL을 받으면 아래 빈 문자열 안에 붙여넣으세요.
  const PURCHASE_URL = '';

  purchaseButton?.addEventListener('click', () => {
    if (PURCHASE_URL) {
      window.location.href = PURCHASE_URL;
    } else if (purchaseNotice) {
      purchaseNotice.textContent = '구매 페이지를 준비 중이에요.';
    }
  });
})();
