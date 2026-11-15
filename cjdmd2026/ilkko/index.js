document.addEventListener('DOMContentLoaded', () => {


  /* =========================================================
     공통 함수
  ========================================================= */

  const clamp = (
    value,
    min = 0,
    max = 1
  ) => {

    return Math.max(
      min,
      Math.min(
        max,
        value
      )
    );

  };



  /* =========================================================
     HEADER
  ========================================================= */

  const commonHeader =
    document.getElementById(
      'commonHeader'
    );

  const mobileMenuToggle =
    document.getElementById(
      'mobileMenuToggle'
    );

  const headerNav =
    document.getElementById(
      'headerNav'
    );

  const scrollTopBtn =
    document.getElementById(
      'scrollTopBtn'
    );


  let lastScrollY =
    window.scrollY;



  function handleCommonScroll() {

    const currentScrollY =
      window.scrollY;


    if (commonHeader) {

      if (
        currentScrollY <= 10
      ) {

        commonHeader
          .classList
          .remove(
            'is-hidden'
          );

      }

      else if (
        currentScrollY >
        lastScrollY &&
        currentScrollY >
        80
      ) {

        commonHeader
          .classList
          .add(
            'is-hidden'
          );

      }

      else if (
        currentScrollY <
        lastScrollY
      ) {

        commonHeader
          .classList
          .remove(
            'is-hidden'
          );

      }

    }


    if (scrollTopBtn) {

      scrollTopBtn
        .classList
        .toggle(
          'is-visible',
          currentScrollY > 200
        );

    }


    lastScrollY =
      currentScrollY;

  }


  window.addEventListener(
    'scroll',
    handleCommonScroll,
    {
      passive: true
    }
  );



  if (
    mobileMenuToggle &&
    headerNav
  ) {

    mobileMenuToggle
      .addEventListener(
        'click',
        () => {

          mobileMenuToggle
            .classList
            .toggle(
              'is-active'
            );

          headerNav
            .classList
            .toggle(
              'is-open'
            );

        }
      );

  }



  if (scrollTopBtn) {

    scrollTopBtn
      .addEventListener(
        'click',
        () => {

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

        }
      );

  }



  /* =========================================================
     HERO
  ========================================================= */

  const heroSection =
    document.getElementById(
      'heroScrollSection'
    );

  const heroVideo =
    document.getElementById(
      'heroVideo'
    );

  const scrollDownIcon =
    document.getElementById(
      'scrollDownIcon'
    );


  const heroIsMobile = () => window.matchMedia('(max-width: 768px)').matches;
  const heroPlayback = document.getElementById('heroPlayback');
  const heroMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let heroMode;
  let heroPlaybackAllowed = !heroMotion.matches;
  const heroCanvas = document.getElementById('heroFrameCanvas');
  const heroContext = heroCanvas?.getContext('2d', { alpha: false });
  const HERO_LAST_FRAME = 605;
  const HERO_SHEET_COLUMNS = 4;
  const HERO_FRAMES_PER_SHEET = 12;
  const HERO_LAST_SHEET = Math.floor(HERO_LAST_FRAME / HERO_FRAMES_PER_SHEET);
  const heroSheets = new Map();
  const heroLoadingSheets = new Set();
  const heroFailedSheets = new Set();
  let heroTargetFrame = 0;
  let heroDisplayedFrame = 0;
  let heroFramePosition = 0;
  let heroAnimation = 0;
  let heroTickTime = 0;

  function heroScrollDistance() {
    return heroSection.offsetHeight - heroVideo.parentElement.offsetHeight;
  }

  function scheduleHeroFrame() {
    if (!heroAnimation && heroMode === 'scroll') {
      heroAnimation = requestAnimationFrame(renderHeroFrame);
    }
  }

  function loadHeroSheet(index) {
    if (
      heroLoadingSheets.size >= 3 || heroSheets.has(index) ||
      heroLoadingSheets.has(index) || heroFailedSheets.has(index)
    ) return;

    heroLoadingSheets.add(index);
    const sheet = new Image();
    sheet.src = `images/hero-hd-sheets/${String(index).padStart(2, '0')}.jpg`;
    sheet.decode().then(() => {
      heroSheets.set(index, sheet);
      if (heroSheets.size > 4) {
        const current = heroFramePosition / HERO_FRAMES_PER_SHEET;
        const farthest = [...heroSheets.keys()].filter(key => key !== 0).reduce((a, b) =>
          Math.abs(a - current) > Math.abs(b - current) ? a : b
        );
        heroSheets.delete(farthest);
      }
    }, () => {
      heroFailedSheets.add(index);
    }).finally(() => {
      heroLoadingSheets.delete(index);
      scheduleHeroFrame();
    });
  }

  function drawHeroFrame(index) {
    const sheet = heroSheets.get(Math.floor(index / HERO_FRAMES_PER_SHEET));
    const frameInSheet = index % HERO_FRAMES_PER_SHEET;
    const { width, height } = heroCanvas;
    const x = frameInSheet % HERO_SHEET_COLUMNS * width;
    const y = Math.floor(frameInSheet / HERO_SHEET_COLUMNS) * height;
    heroContext.drawImage(sheet, x, y, width, height, 0, 0, width, height);
    heroCanvas.hidden = index === 0;
    heroCanvas.dataset.frame = index;
    heroDisplayedFrame = index;
  }

  function renderHeroFrame(now) {
    heroAnimation = 0;
    if (!heroContext || heroMode !== 'scroll') {
      heroTickTime = 0;
      return;
    }

    const elapsed = heroTickTime ? Math.min(now - heroTickTime, 300) : 16;
    heroTickTime = now;
    const remaining = heroTargetFrame - heroFramePosition;
    if (Math.abs(remaining) < .5 || heroMotion.matches) {
      heroFramePosition = heroTargetFrame;
    } else {
      heroFramePosition += remaining * (1 - Math.exp(-elapsed / 135));
    }

    const wanted = Math.round(heroFramePosition);
    const direction = Math.sign(wanted - heroDisplayedFrame);
    let best = heroDisplayedFrame;
    for (const index of heroSheets.keys()) {
      const start = index * HERO_FRAMES_PER_SHEET;
      const end = Math.min(start + HERO_FRAMES_PER_SHEET - 1, HERO_LAST_FRAME);
      const candidate = clamp(wanted, start, end);
      if ((candidate - best) * direction > 0 && (wanted - candidate) * direction >= 0) {
        best = candidate;
      }
    }
    if (best !== heroDisplayedFrame) drawHeroFrame(best);

    const ahead = heroTargetFrame - wanted;
    const sheet = Math.floor(wanted / HERO_FRAMES_PER_SHEET);
    const next = Math.floor((wanted + ahead * .32) / HERO_FRAMES_PER_SHEET);
    const nearby = ahead < 0 ? sheet - 1 : sheet + 1;
    const wantedSheets = [...new Set([sheet, next, nearby, sheet + 1, sheet - 1])]
      .filter(index => index >= 0 && index <= HERO_LAST_SHEET)
      .slice(0, 3);
    wantedSheets.forEach(loadHeroSheet);

    if (heroFramePosition !== heroTargetFrame) scheduleHeroFrame();
    else heroTickTime = 0;
  }

  function updateHeroButton() {
    if (!heroPlayback) return;
    heroPlayback.hidden = heroMode !== 'play' || Boolean(heroVideo.error);
    heroPlayback.textContent = heroVideo.paused ? '영상 재생' : '영상 일시정지';
  }

  function playHero() {
    heroVideo.play().catch(updateHeroButton);
  }

  function syncHero() {
    const rect = heroSection.getBoundingClientRect();
    let mode = 'offscreen';
    if (rect.bottom > 0) {
      if (heroIsMobile()) mode = 'play';
      else if (heroScrollDistance() > 0) mode = 'scroll';
      else mode = 'still';
    }

    if (mode !== heroMode) {
      heroMode = mode;
      heroVideo.loop = mode === 'play';
      if (mode === 'play') heroVideo.preload = 'auto';
      if (mode === 'play' && heroPlaybackAllowed) playHero();
      else heroVideo.pause();
      updateHeroButton();
    }
    if (mode === 'scroll') {
      const progress = clamp(-rect.top / heroScrollDistance());
      heroTargetFrame = Math.round(progress * HERO_LAST_FRAME);
      scheduleHeroFrame();
    }
  }

  if (heroVideo && heroSection) {
    // Control autoplay in one place so desktop scroll and normal playback never compete.
    heroVideo.muted = true;
    heroVideo.addEventListener('loadedmetadata', syncHero);
    for (const event of ['play', 'pause', 'error']) {
      heroVideo.addEventListener(event, updateHeroButton);
    }
    heroPlayback?.addEventListener('click', () => {
      if (!heroIsMobile()) return;
      heroPlaybackAllowed = heroVideo.paused;
      if (heroPlaybackAllowed) playHero();
      else heroVideo.pause();
    });
    heroMotion.addEventListener('change', () => {
      heroPlaybackAllowed = !heroMotion.matches;
      heroMode = undefined;
      syncHero();
    });
    for (const event of ['scroll', 'resize', 'pageshow']) {
      window.addEventListener(event, syncHero, { passive: true });
    }
    syncHero();
  }


  /* =========================================================
     DYSLEXIA
  ========================================================= */

  const dyslexiaSection =
    document.getElementById(
      'dyslexiaSection'
    );

  const dyslexiaTitle =
    document.getElementById(
      'dyslexiaTitle'
    );

  const dyslexiaImgWrap =
    document.getElementById(
      'dyslexiaImgWrap'
    );



  /* =========================================================
     ORANGE
  ========================================================= */

  const orangeSection =
    document.getElementById(
      'orangeSection'
    );

  const orangeSticky =
    document.getElementById(
      'orangeSticky'
    );

  const orangeTitle =
    document.getElementById(
      'orangeTitle'
    );



  /* =========================================================
     SEARCH
  ========================================================= */

  const keywordSearchSection =
    document.getElementById(
      'keywordSearchSection'
    );

  const keywordSearchInner =
    document.getElementById(
      'keywordSearchInner'
    );

  const fakeSearchText =
    document.getElementById(
      'fakeSearchText'
    );


  let typingStarted =
    false;



  if (
    keywordSearchSection &&
    keywordSearchInner &&
    fakeSearchText
  ) {

    const searchObserver =
      new IntersectionObserver(

        entries => {

          const entry =
            entries[0];


          if (
            !entry.isIntersecting
          ) {

            return;

          }


          keywordSearchInner
            .classList
            .add(
              'is-visible'
            );


          if (
            typingStarted
          ) {

            return;

          }


          typingStarted =
            true;


          const word =
            '난독증';


          let index = 0;


          const timer =
            setInterval(
              () => {

                index++;


                fakeSearchText
                  .textContent =
                  word.slice(
                    0,
                    index
                  );


                if (
                  index >=
                  word.length
                ) {

                  clearInterval(
                    timer
                  );

                }

              },
              350
            );

        },

        {
          threshold: .4
        }

      );


    searchObserver
      .observe(
        keywordSearchSection
      );

  }



  /* =========================================================
     MARQUEE
  ========================================================= */

  const brandMarqueeTrack =
    document.getElementById(
      'brandMarqueeTrack'
    );

  const brandMarqueeGroup =
    document.getElementById(
      'brandMarqueeGroup'
    );


  if (
    brandMarqueeTrack &&
    brandMarqueeGroup &&
    brandMarqueeTrack
      .children
      .length === 1
  ) {

    const clone =
      brandMarqueeGroup
        .cloneNode(
          true
        );


    clone
      .removeAttribute(
        'id'
      );


    brandMarqueeTrack
      .appendChild(
        clone
      );

  }



  /* =========================================================
     COMPARISON
  ========================================================= */

  const comparisonSection =
    document.getElementById(
      'comparisonSection'
    );


  if (
    comparisonSection
  ) {

    const comparisonObserver =
      new IntersectionObserver(

        entries => {

          if (
            entries[0]
              .isIntersecting
          ) {

            comparisonSection
              .classList
              .add(
                'is-visible'
              );

          }

        },

        {
          threshold: .18
        }

      );


    comparisonObserver
      .observe(
        comparisonSection
      );

  }



  /* =========================================================
     PROCESS
  ========================================================= */

  const trainingProcessSection =
    document.getElementById(
      'trainingProcessSection'
    );


  const processImages =
    Array.from(
      document.querySelectorAll(
        '.process-stage-image'
      )
    );


  const processSteps =
    Array.from(
      document.querySelectorAll(
        '.process-step'
      )
    );


  const processDots =
    Array.from(
      document.querySelectorAll(
        '.process-progress-dot'
      )
    );


  const processProgressFill =
    document.getElementById(
      'processProgressFill'
    );


  const processStepTrack =
    document.getElementById(
      'processStepTrack'
    );


  const processTextViewport =
    document.getElementById(
      'processTextViewport'
    );


  let currentProcessStage =
    -1;



  function changeProcessStage(
    index
  ) {

    if (
      currentProcessStage ===
      index
    ) {

      return;

    }


    currentProcessStage =
      index;



    /* 이미지 */

    processImages
      .forEach(
        (
          image,
          imageIndex
        ) => {

          image
            .classList
            .toggle(
              'is-active',
              imageIndex ===
              index
            );

        }
      );



    /* 단계 텍스트 */

    processSteps
      .forEach(
        (
          step,
          stepIndex
        ) => {

          step
            .classList
            .remove(
              'is-active',
              'is-passed'
            );


          if (
            stepIndex ===
            index
          ) {

            step
              .classList
              .add(
                'is-active'
              );

          }

          else if (
            stepIndex <
            index
          ) {

            step
              .classList
              .add(
                'is-passed'
              );

          }

        }
      );



    /* 텍스트 이동 */

    if (
      processStepTrack &&
      processTextViewport &&
      processSteps.length
    ) {

      const stepHeight =
        processSteps[0]
          .offsetHeight;


      const viewportHeight =
        processTextViewport
          .clientHeight;


      const totalHeight =
        processStepTrack
          .scrollHeight;


      const focusY =
        window.innerWidth <= 768

          ? 8
          : 20;


      let y =
        focusY -
        index *
        stepHeight;


      const minimumY =
        viewportHeight -
        totalHeight;


      y =
        Math.max(
          minimumY,
          Math.min(
            focusY,
            y
          )
        );


      processStepTrack
        .style
        .transform =
        `
          translate3d(
            0,
            ${y}px,
            0
          )
        `;

    }

  }



  /* =========================================================
     PACKAGE
  ========================================================= */

  const packageSection =
    document.getElementById(
      'packageScrollSection'
    );

  // Safari에서도 배경이 검정으로 보이지 않도록 투명 WebP 연속 프레임 사용
  const packageFrame = document.getElementById('packageFrame');
  const PACKAGE_FRAME_COUNT = 65;
  const MOBILE_PACKAGE = window.matchMedia('(max-width: 768px)').matches;
  const mobilePackageRecent = [];
  const PACKAGE_ACTION_FRAME = 64;
  const packageFrames = new Array(PACKAGE_FRAME_COUNT);
  let requestedPackageFrame = 0;
  let visiblePackageFrame = 0;

  function packageFrameUrl(i) {
    return 'images/package-frames/frame-' + String(i).padStart(3, '0') + '.webp';
  }

  function loadPackageFrame(i) {
    if (i < 0 || i >= PACKAGE_FRAME_COUNT) return;
    if (packageFrames[i]) return;
    const img = new Image();
    packageFrames[i] = img;
    if (MOBILE_PACKAGE) {
      mobilePackageRecent.push(i);
      while (mobilePackageRecent.length > 14) {
        const oldest = mobilePackageRecent.shift();
        if (oldest !== requestedPackageFrame) packageFrames[oldest] = undefined;
      }
    }
    img.decoding = 'async';
    img.onload = () => {
      // When a frame finishes loading, show it only if still the requested frame.
      if (requestedPackageFrame === i && packageFrame) {
        packageFrame.src = img.src;
        visiblePackageFrame = i;
      }
    };
    img.src = packageFrameUrl(i);
  }

  function setPackageFrame(i) {
    if (!packageFrame) return;
    // Mobile uses every second frame, reducing decode and image swaps.
    const sampled = MOBILE_PACKAGE ? Math.round(i / 2) * 2 : i;
    const index = Math.max(0, Math.min(PACKAGE_FRAME_COUNT - 1, sampled));
    requestedPackageFrame = index;
    const frame = packageFrames[index];
    if (frame && frame.complete && frame.naturalWidth) {
      if (visiblePackageFrame !== index) {
        packageFrame.src = frame.src;
        visiblePackageFrame = index;
      }
    } else {
      loadPackageFrame(index);
      loadPackageFrame(index + (MOBILE_PACKAGE ? 2 : 1));
      loadPackageFrame(index - (MOBILE_PACKAGE ? 2 : 1));
    }
  }

  // Prefetch when approaching the package section, not at first page load.
  if (packageSection && packageFrame) {
    loadPackageFrame(0);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          if (MOBILE_PACKAGE) {
            loadPackageFrame(0);
            loadPackageFrame(2);
            loadPackageFrame(4);
          } else {
            for (let i = 0; i < PACKAGE_FRAME_COUNT; i++) loadPackageFrame(i);
          }
          observer.disconnect();
        }
      }, { rootMargin: '1200px 0px' });
      observer.observe(packageSection);
    } else {
      for (let i = 0; i < (MOBILE_PACKAGE ? 5 : PACKAGE_FRAME_COUNT); i += (MOBILE_PACKAGE ? 2 : 1)) loadPackageFrame(i);
    }
  }


  /* =========================================================
     CONFETTI
  ========================================================= */

  const confettiLayer =
    document.getElementById(
      'confettiLayer'
    );


  const confettiPieces = [];



  function createConfetti() {

    if (
      !confettiLayer
    ) {

      return;

    }


    const colors = [
      '#ff5a8a',
      '#19bce4',
      '#32c96b',
      '#ffb028',
      '#ff7a05'
    ];


    for (
      let i = 0;
      i < 30;
      i++
    ) {

      const piece =
        document.createElement(
          'span'
        );


      piece.className =
        'confetti-piece';


      piece.style
        .setProperty(
          '--x',
          `${
            5 +
            Math.random() *
            90
          }%`
        );


      piece.style
        .setProperty(
          '--w',
          `${
            6 +
            Math.random() *
            8
          }px`
        );


      piece.style
        .setProperty(
          '--h',
          `${
            10 +
            Math.random() *
            10
          }px`
        );


      piece.style
        .setProperty(
          '--color',
          colors[
            Math.floor(
              Math.random() *
              colors.length
            )
          ]
        );


      confettiLayer
        .appendChild(
          piece
        );


      confettiPieces
        .push(
          piece
        );

    }

  }


  createConfetti();



  function updateConfetti(
    progress
  ) {

    confettiPieces
      .forEach(
        (
          piece,
          index
        ) => {

          const delay =
            (
              index %
              10
            ) *
            .025;


          let p =
            (
              progress -
              .05 -
              delay
            ) /
            .65;


          p =
            clamp(p);


          const y =
            -100 +
            p *
            (
              window.innerHeight +
              200
            );


          const rotate =
            p *
            600 *
            (
              index % 2
                ? 1
                : -1
            );


          piece.style.opacity =
            p > 0 &&
            p < 1

              ? 1
              : 0;


          piece.style.transform =
            `
              translate3d(
                ${
                  Math.sin(
                    p *
                    Math.PI *
                    3 +
                    index
                  ) *
                  25
                }px,
                ${y}px,
                0
              )

              rotate(
                ${rotate}deg
              )
            `;

        }
      );

  }



  /* =========================================================
     REVIEW
  ========================================================= */

  const reviewSection =
    document.getElementById(
      'reviewStorySection'
    );

  const reviewTrack =
    document.getElementById(
      'reviewSliderTrack'
    );

  const reviewWindow =
    document.getElementById(
      'reviewSliderWindow'
    );



  function updateReviewScroll(
    progress
  ) {

    if (
      !reviewTrack ||
      !reviewWindow
    ) {

      return;

    }


    if (!heroIsMobile()) {
      const overflow = Math.max(0, reviewTrack.scrollWidth - reviewWindow.clientWidth);
      reviewTrack.style.transform = `translate3d(${-overflow * progress}px, 0, 0)`;
      return;
    }

    const firstCard =
      reviewTrack
        .querySelector(
          '.review-card'
        );


    if (
      !firstCard
    ) {

      return;

    }


    const cardWidth =
      firstCard
        .getBoundingClientRect()
        .width;


    const startX =
      -cardWidth *
      .45;


    const trackWidth =
      reviewTrack
        .scrollWidth;


    const viewportWidth =
      reviewWindow
        .clientWidth;


    let endX =
      -(
        trackWidth -
        viewportWidth +
        cardWidth *
        .1
      );


    if (
      endX >
      startX
    ) {

      endX =
        startX;

    }


    const x =
      startX +
      (
        endX -
        startX
      ) *
      progress;


    reviewTrack
      .style
      .transform =
      `
        translate3d(
          ${x}px,
          0,
          0
        )
      `;

  }



  /* =========================================================
     부모님 가이드
  ========================================================= */

  const parentGuideSection =
    document.getElementById(
      'parentGuideSection'
    );


  const guideQuestion1 =
    document.getElementById(
      'guideQuestion1'
    );

  const guideAnswer1 =
    document.getElementById(
      'guideAnswer1'
    );

  const guideQuestion2 =
    document.getElementById(
      'guideQuestion2'
    );

  const guideAnswer2 =
    document.getElementById(
      'guideAnswer2'
    );


  let guideSequencePlayed =
    false;



  function showGuideQuestion(
    element
  ) {

    if (
      !element
    ) {

      return;

    }


    element
      .classList
      .add(
        'is-visible'
      );

  }



  function showGuideTyping(
    element
  ) {

    if (
      !element
    ) {

      return;

    }


    element
      .classList
      .add(
        'is-visible',
        'is-typing'
      );

  }



  function sendGuideAnswer(
    element
  ) {

    if (
      !element
    ) {

      return;

    }


    element
      .classList
      .remove(
        'is-typing'
      );


    element
      .classList
      .add(
        'is-sent'
      );

  }



  function playGuideSequence() {
    if (guideSequencePlayed) return;
    guideSequencePlayed = true;
    // '...' 타이핑 대기 없이 질문 다음 바로 잉꼬의 답변 표시
    showGuideQuestion(guideQuestion1);
    setTimeout(() => {
      if (guideAnswer1) {
        guideAnswer1.classList.add('is-visible');
        sendGuideAnswer(guideAnswer1);
      }
    }, 180);
    setTimeout(() => {
      showGuideQuestion(guideQuestion2);
      if (guideAnswer2) {
        guideAnswer2.classList.add('is-visible');
        sendGuideAnswer(guideAnswer2);
      }
    }, 750);
  }



  if (
    parentGuideSection
  ) {

    const guideObserver =
      new IntersectionObserver(

        entries => {

          entries
            .forEach(
              entry => {

                if (
                  entry.isIntersecting &&
                  !guideSequencePlayed
                ) {

                  playGuideSequence();


                  guideObserver
                    .disconnect();

                }

              }
            );

        },

        {
          threshold: .2
        }

      );


    guideObserver
      .observe(
        parentGuideSection
      );

  }



  /* =========================================================
     FINAL CTA
  ========================================================= */

  const finalCtaSection =
    document.getElementById(
      'finalCtaSection'
    );


  if (
    finalCtaSection
  ) {

    const finalObserver =
      new IntersectionObserver(

        entries => {

          entries
            .forEach(
              entry => {

                if (
                  entry.isIntersecting
                ) {

                  finalCtaSection
                    .classList
                    .add(
                      'is-visible'
                    );


                  finalObserver
                    .disconnect();

                }

              }
            );

        },

        {
          threshold: .2
        }

      );


    finalObserver
      .observe(
        finalCtaSection
      );

  }



  /* =========================================================
     전체 스크롤
  ========================================================= */

  let ticking =
    false;



  function render() {

    ticking =
      false;



    /* =====================================================
       HERO
    ===================================================== */

    if (
      heroSection &&
      heroVideo &&
      scrollDownIcon &&
      !heroIsMobile()
    ) {
      const rect = heroSection.getBoundingClientRect();
      const distance = heroScrollDistance();
      if (distance > 0) {
        const progress = clamp(-rect.top / distance);
        scrollDownIcon.style.opacity = clamp(1 - progress * 15);
      }
    }



    /* =====================================================
       DYSLEXIA
    ===================================================== */

    if (
      dyslexiaSection &&
      dyslexiaTitle &&
      dyslexiaImgWrap &&
      !window.matchMedia('(max-width: 768px)').matches
    ) {

      const rect =
        dyslexiaSection
          .getBoundingClientRect();


      const distance =
        dyslexiaSection
          .offsetHeight -
        window.innerHeight;


      if (
        distance > 0
      ) {

        const progress =
          clamp(
            -rect.top /
            distance
          );


        const titleProgress =
          clamp(
            (
              progress -
              .05
            ) /
            .3
          );


        dyslexiaTitle
          .style
          .opacity =
          titleProgress;


        dyslexiaTitle
          .style
          .transform =
          `
            translate(
              -50%,
              ${
                40 *
                (
                  1 -
                  titleProgress
                )
              }px
            )
          `;


        const imageProgress =
          clamp(
            (
              progress -
              .2
            ) /
            .45
          );


        dyslexiaImgWrap
          .style
          .opacity =
          imageProgress;


        dyslexiaImgWrap
          .style
          .transform =
          `
            translate(
              -50%,
              ${
                200 *
                (
                  1 -
                  imageProgress
                )
              }px
            )
          `;

      }

    }



    /* =====================================================
       ORANGE
    ===================================================== */

    if (
      orangeSection &&
      orangeSticky &&
      !window.matchMedia('(max-width: 768px)').matches
    ) {

      const rect =
        orangeSection
          .getBoundingClientRect();


      const distance =
        orangeSection
          .offsetHeight -
        window.innerHeight;


      if (
        distance > 0
      ) {

        const progress =
          clamp(
            -rect.top /
            distance
          );


        const green =
          Math.round(
            255 -
            133 *
            progress
          );


        const blue =
          Math.round(
            255 -
            250 *
            progress
          );


        orangeSticky
          .style
          .backgroundColor =
          `
            rgb(
              255,
              ${green},
              ${blue}
            )
          `;


        if (
          orangeTitle
        ) {

          orangeTitle
            .style
            .opacity =
            clamp(
              (
                progress -
                .3
              ) /
              .35
            );

        }

      }

    }



    /* =====================================================
       PROCESS
    ===================================================== */

    if (
      trainingProcessSection &&
      processImages.length
    ) {

      const rect =
        trainingProcessSection
          .getBoundingClientRect();


      const distance =
        trainingProcessSection
          .offsetHeight -
        window.innerHeight;


      if (
        distance > 0
      ) {

        const raw =
          clamp(
            -rect.top /
            distance
          );


        const progress =
          clamp(
            (
              raw -
              .04
            ) /
            .8
          );


        /*
          0 → 1단계
          .2 → 2단계
          .4 → 3단계
          .6 → 4단계
          .8 → 5단계
          1 → 6단계
        */

        let stage =
          Math.floor(
            progress *
            5 +
            .000001
          );


        if (
          progress >=
          .999
        ) {

          stage = 5;

        }


        stage =
          Math.max(
            0,
            Math.min(
              5,
              stage
            )
          );


        changeProcessStage(
          stage
        );


        if (
          processProgressFill
        ) {

          processProgressFill
            .style
            .height =
            `${
              progress *
              100
            }%`;

        }


        processDots
          .forEach(
            (
              dot,
              index
            ) => {

              const threshold =
                index /
                5;


              dot
                .classList
                .toggle(
                  'is-active',
                  progress >=
                  threshold
                );

            }
          );

      }

    }



    /* =====================================================
       PACKAGE
    ===================================================== */

    if (packageSection && packageFrame) {
      const rect = packageSection.getBoundingClientRect();
      const distance = packageSection.offsetHeight - window.innerHeight;
      if (distance > 0) {
        const raw = clamp(-rect.top / distance);
        const progress = clamp((raw - .07) / .77);
        setPackageFrame(Math.round(progress * PACKAGE_ACTION_FRAME));
        updateConfetti(raw);
      }
    }


    /* =====================================================
       REVIEW
    ===================================================== */

    if (
      reviewSection &&
      reviewTrack &&
      reviewWindow
    ) {

      const rect =
        reviewSection
          .getBoundingClientRect();


      const distance =
        reviewSection
          .offsetHeight -
        window.innerHeight;


      if (
        distance > 0
      ) {

        const raw =
          clamp(
            -rect.top /
            distance
          );


        const progress =
          clamp(
            (
              raw -
              .05
            ) /
            .89
          );


        updateReviewScroll(
          progress
        );

      }

    }

  }



  function requestRender() {

    if (
      ticking
    ) {

      return;

    }


    ticking =
      true;


    requestAnimationFrame(
      render
    );

  }



  window.addEventListener(
    'scroll',
    requestRender,
    {
      passive: true
    }
  );



  /* =========================================================
     RESIZE
  ========================================================= */

  window.addEventListener(
    'resize',
    () => {

      const savedStage =
        Math.max(
          0,
          currentProcessStage
        );


      currentProcessStage =
        -1;


      changeProcessStage(
        savedStage
      );


      requestRender();

    }
  );



  /* =========================================================
     초기 실행
  ========================================================= */

  changeProcessStage(
    0
  );


  handleCommonScroll();


  render();

});

/* === 읽:꼬 인덱스 오리지널 배경음악 ===
 * 소리 자동재생 제한을 고려해 첫 클릭/터치/키보드 입력부터 시작합니다.
 * 버튼으로 언제든 음소거/재생 전환이 가능합니다.
 */
(() => {
  const music = document.getElementById('ilkkoBgm');
  const toggle = document.getElementById('ilkkoBgmToggle');
  if (!music || !toggle) return;
  music.volume = 0.17;
  let optedOut = false;
  const reflect = playing => {
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? '배경음악 끄기' : '배경음악 켜기');
    toggle.title = playing ? '배경음악 끄기' : '배경음악 켜기';
    const label = toggle.querySelector('.ilkko-bgm-label');
    if (label) label.textContent = playing ? 'BGM ON' : 'BGM OFF';
  };
  async function startMusic() {
    try { await music.play(); reflect(true); }
    catch (err) { reflect(false); }
  }
  const startOnce = e => {
    if (optedOut || e?.target?.closest?.('#ilkkoBgmToggle')) return;
    if (music.paused) startMusic();
    document.removeEventListener('pointerdown', startOnce);
    document.removeEventListener('keydown', startOnce);
  };
  document.addEventListener('pointerdown', startOnce, { passive: true });
  document.addEventListener('keydown', startOnce);
  toggle.addEventListener('click', () => {
    if (music.paused) { optedOut = false; startMusic(); }
    else { optedOut = true; music.pause(); reflect(false); }
  });
  music.addEventListener('pause', () => reflect(false));
  music.addEventListener('play', () => reflect(true));
})();
