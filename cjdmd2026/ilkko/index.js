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
  const heroDesktopVideo = document.getElementById('heroDesktopVideo');
  const heroCanvas = document.getElementById('heroScrollCanvas');
  const heroContext = heroCanvas?.getContext('2d', { alpha: false });
  const heroMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const heroSheets = Array(4).fill(null);
  const heroFrameCount = 60;
  let heroMode;
  let heroPlaybackAllowed = !heroMotion.matches;
  let heroMediaStarted = false;
  let heroVideoReady = false;
  let heroRenderSource = null;
  let heroTarget = 0;
  let heroProgress = 0;
  let heroAnimation = 0;
  let heroPreviousTick = null;
  let heroLastFrame = -1;
  let heroWasPinned = false;
  let heroExit = null;

  function heroScrollDistance() {
    return heroSection.clientHeight - heroVideo.parentElement.clientHeight;
  }

  function updateHeroButton() {
    if (!heroPlayback) return;
    heroPlayback.hidden = heroMode !== 'play' || Boolean(heroVideo.error);
    heroPlayback.textContent = heroVideo.paused ? '영상 재생' : '영상 일시정지';
  }

  function playHero() {
    heroVideo.play().catch(updateHeroButton);
  }

  function startDesktopHero() {
    if (heroMediaStarted) return;
    heroMediaStarted = true;
    heroSheets.forEach((_, index) => {
      const sheet = new Image();
      sheet.fetchPriority = index === 0 ? 'high' : 'low';
      sheet.src = `images/hero-scroll-sharp-${index}.webp`;
      sheet.decode().then(() => {
        heroSheets[index] = sheet;
        queueHeroPaint();
      }).catch(() => {});
    });

    // Fetch the complete asset once. Seeking the local Blob avoids server range requests.
    if (heroDesktopVideo) {
      fetch('images/web-scroll-desktop.mp4', { credentials: 'same-origin' })
        .then(response => {
          if (!response.ok) throw new Error('Desktop video unavailable');
          return response.blob();
        })
        .then(video => {
          if (video.size && !video.type.startsWith('text/')) {
            heroDesktopVideo.preload = 'auto';
            heroDesktopVideo.src = URL.createObjectURL(video);
          }
        })
        .catch(() => {});
    }
  }

  function queueHeroPaint() {
    if (!heroAnimation && heroMode === 'scroll') {
      heroAnimation = requestAnimationFrame(paintDesktopHero);
    }
  }

  function paintHeroPreview() {
    if (!heroContext || !heroSheets.some(Boolean)) return false;
    const wanted = Math.round(heroProgress * (heroFrameCount - 1));
    let frame = wanted;
    for (let distance = 0; distance < heroSheets.length; distance++) {
      const after = wanted + distance;
      const before = wanted - distance;
      if (after < heroFrameCount && heroSheets[after % heroSheets.length]) {
        frame = after;
        break;
      }
      if (before >= 0 && heroSheets[before % heroSheets.length]) {
        frame = before;
        break;
      }
    }
    if (frame !== heroLastFrame) {
      const tile = Math.floor(frame / heroSheets.length);
      const { width, height } = heroCanvas;
      heroContext.drawImage(heroSheets[frame % heroSheets.length], (tile % 3) * width, Math.floor(tile / 3) * height,
        width, height, 0, 0, width, height);
      heroLastFrame = frame;
    }
    return true;
  }

  function paintDesktopHero(now) {
    heroAnimation = 0;
    if (heroMode !== 'scroll') {
      heroPreviousTick = null;
      return;
    }

    const elapsed = heroPreviousTick === null ? 17 : Math.min(now - heroPreviousTick, 50);
    const remaining = heroTarget - heroProgress;
    if (heroMotion.matches || Math.abs(remaining) < .006) heroProgress = heroTarget;
    else heroProgress += remaining * (1 - Math.exp(-elapsed / 108));

    const duration = heroDesktopVideo?.duration;
    const targetTime = Number.isFinite(duration) ? heroProgress * Math.max(0, duration - .015) : 0;
    const showFrame = heroProgress > .002;
    if (!showFrame && heroTarget === 0) heroRenderSource = null;
    // Keep the same renderer until the visitor returns to the opening poster.
    if (showFrame && !heroRenderSource) {
      if (heroVideoReady) heroRenderSource = 'video';
      else if (heroSheets.some(Boolean)) heroRenderSource = 'frames';
    }
    const showVideo = showFrame && heroRenderSource === 'video' && heroVideoReady;
    heroCanvas?.classList.toggle('is-visible', showFrame && heroRenderSource === 'frames' && paintHeroPreview());
    heroDesktopVideo?.classList.toggle('is-visible', showVideo);

    if (heroVideoReady && heroRenderSource !== 'frames' && !heroDesktopVideo.seeking &&
        Math.abs(heroDesktopVideo.currentTime - targetTime) > .024) {
      heroDesktopVideo.currentTime = targetTime;
    }

    if (heroProgress !== heroTarget) {
      heroPreviousTick = now;
      queueHeroPaint();
    } else {
      heroPreviousTick = null;
    }
  }

  function clearHeroExit() {
    if (heroExit) clearTimeout(heroExit.timer);
    heroExit = null;
  }

  function holdDesktopHero(pin, destination) {
    heroTarget = 1;
    if (!heroExit) {
      heroExit = {
        destination,
        timer: setTimeout(() => {
          const { destination } = heroExit;
          clearHeroExit();
          heroWasPinned = false;
          window.scrollTo({ top: destination, behavior: 'instant' });
        }, 650),
      };
    } else {
      heroExit.destination = Math.max(heroExit.destination, destination);
    }
    window.scrollTo({ top: pin, behavior: 'instant' });
    queueHeroPaint();
  }

  function shouldHoldDesktopHero() {
    return !heroMotion.matches && !location.hash && (heroExit ||
      (heroProgress < .98 && (heroSheets.some(Boolean) || heroVideoReady)));
  }

  function syncHero() {
    const rect = heroSection.getBoundingClientRect();
    const mobile = heroIsMobile();
    const mode = rect.bottom > 0 ? (mobile ? 'play' : 'scroll') : 'offscreen';

    if (mode !== heroMode) {
      heroMode = mode;
      heroVideo.loop = mode === 'play';
      if (mode === 'play') heroVideo.preload = 'auto';
      if (mode === 'play' && heroPlaybackAllowed) playHero();
      else heroVideo.pause();
      if (mode === 'scroll') startDesktopHero();
      updateHeroButton();
    }
    if (mobile) {
      clearHeroExit();
      heroWasPinned = false;
      return;
    }

    const distance = heroScrollDistance();
    if (distance <= 0) return;
    const offset = -rect.top;
    if (heroExit && offset < distance - 24) clearHeroExit();
    if (offset > distance && (heroWasPinned || heroExit) && shouldHoldDesktopHero()) {
      heroMode = 'scroll';
      const pin = window.scrollY + distance - offset;
      holdDesktopHero(pin, Math.min(window.scrollY, pin + window.innerHeight * .75));
      return;
    }

    heroWasPinned = mode === 'scroll' && offset >= 0 && offset <= distance + 1;
    if (mode === 'scroll') {
      heroTarget = clamp(offset / Math.max(1, distance - 24));
      queueHeroPaint();
    }
  }

  if (heroVideo && heroSection) {
    heroVideo.muted = true;
    heroVideo.addEventListener('loadedmetadata', syncHero);
    heroDesktopVideo?.addEventListener('loadeddata', () => {
      heroVideoReady = true;
      queueHeroPaint();
    });
    heroDesktopVideo?.addEventListener('seeked', queueHeroPaint);
    heroDesktopVideo?.addEventListener('error', () => {
      heroVideoReady = false;
      if (heroRenderSource === 'video') heroRenderSource = null;
      queueHeroPaint();
    });
    window.addEventListener('wheel', event => {
      if (heroIsMobile() || event.ctrlKey || !event.cancelable) return;
      if (event.deltaY < 0) clearHeroExit();
      if (event.deltaY <= 0 || !shouldHoldDesktopHero()) return;
      const offset = -heroSection.getBoundingClientRect().top;
      const distance = heroScrollDistance();
      if (distance <= 0 || offset < -2 || offset > distance + 1) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const overshoot = offset + event.deltaY * unit - distance;
      if (overshoot <= 0) return;

      event.preventDefault();
      const pin = window.scrollY + distance - offset;
      holdDesktopHero(pin, pin + Math.min(Math.max(overshoot, 24), window.innerHeight * .75));
    }, { passive: false });
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
      clearHeroExit();
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
