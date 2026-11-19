/* Hero footage starts after the heading dissolves and holds the pinned scene until it ends. */
export function createHeroMedia(hero) {
  const video = hero.querySelector(".hero__video video");
  const playButton = hero.querySelector(".hero-play");
  const sectionTransitions = [...document.querySelectorAll(".section-transition")];
  let finished = false;
  let visible = false;
  let requested = false;
  let mediaEnded = false;
  let playbackLocked = false;
  let lockedScrollY = 0;
  let playbackWatchdog = 0;
  let transitionWatchdog = 0;

  const clearPlaybackWatchdog = () => {
    window.clearTimeout(playbackWatchdog);
    playbackWatchdog = 0;
  };
  const clearTransitionWatchdog = () => {
    window.clearTimeout(transitionWatchdog);
    transitionWatchdog = 0;
  };
  const armPlaybackWatchdog = () => {
    clearPlaybackWatchdog();
    playbackWatchdog = window.setTimeout(() => {
      if (mediaEnded || !playbackLocked) return;
      requested = false;
      video?.pause();
      hero.classList.remove("hero-video-playing");
      playButton.hidden = false;
      unlockPageScroll();
    }, 12000);
  };
  const playFromOffset = async () => {
    if (!video) throw new Error("Hero video is unavailable.");
    if (video.readyState < video.HAVE_METADATA) {
      await new Promise((resolve, reject) => {
        const onLoadedMetadata = () => { cleanup(); resolve(); };
        const onError = () => { cleanup(); reject(video.error || new Error("Hero video failed to load.")); };
        const cleanup = () => {
          video.removeEventListener("loadedmetadata", onLoadedMetadata);
          video.removeEventListener("error", onError);
        };
        video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
        video.addEventListener("error", onError, { once: true });
      });
    }
    if (video.error) throw video.error;
    const durationLimit = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.05) : 0.5;
    const startAt = Math.min(0.5, durationLimit);
    if (video.currentTime < startAt) {
      await new Promise((resolve, reject) => {
        const cleanup = () => {
          video.removeEventListener("seeked", onSeeked);
          video.removeEventListener("error", onError);
        };
        const onSeeked = () => { cleanup(); resolve(); };
        const onError = () => { cleanup(); reject(video.error || new Error("Hero video seek failed.")); };
        video.addEventListener("seeked", onSeeked, { once: true });
        video.addEventListener("error", onError, { once: true });
        try {
          video.currentTime = startAt;
          if (!video.seeking && Math.abs(video.currentTime - startAt) < 0.02) onSeeked();
        } catch (error) {
          cleanup();
          reject(error);
        }
      });
    }
    return video.play();
  };

  const preventScrollInput = event => {
    if (playbackLocked) event.preventDefault();
  };
  const suspendSectionTransitions = suspended => {
    sectionTransitions.forEach(transition => transition.classList.toggle("is-suspended", suspended));
  };
  const preventScrollKeys = event => {
    if (!playbackLocked) return;
    const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
    const target = event.target;
    if (scrollKeys.includes(event.key) && !target?.isContentEditable && !/INPUT|TEXTAREA|SELECT/.test(target?.tagName || "")) {
      event.preventDefault();
    }
  };
  const holdScrollPosition = () => {
    if (playbackLocked && Math.abs(window.scrollY - lockedScrollY) > 1) {
      window.scrollTo(0, lockedScrollY);
    }
  };
  const lockPageScroll = () => {
    if (playbackLocked) return;
    playbackLocked = true;
    lockedScrollY = window.scrollY;
    suspendSectionTransitions(true);
    window.addEventListener("wheel", preventScrollInput, { passive: false });
    window.addEventListener("touchmove", preventScrollInput, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);
    window.addEventListener("scroll", holdScrollPosition, { passive: true });
  };
  const unlockPageScroll = () => {
    if (!playbackLocked) return;
    playbackLocked = false;
    window.removeEventListener("wheel", preventScrollInput);
    window.removeEventListener("touchmove", preventScrollInput);
    window.removeEventListener("keydown", preventScrollKeys);
    window.removeEventListener("scroll", holdScrollPosition);
    suspendSectionTransitions(false);
    clearPlaybackWatchdog();
    requestAnimationFrame(() => window.ScrollTrigger?.update(true));
  };
  const finishPlayback = () => {
    if (mediaEnded) return;
    mediaEnded = true;
    requested = false;
    clearPlaybackWatchdog();
    hero.classList.remove("hero-video-playing");
    suspendSectionTransitions(false);
    // ScrollTrigger wraps a pinned hero in .pin-spacer, so hero.nextElementSibling
    // is empty while the video is playing. Resolve the actual following section.
    const nextSection = document.querySelector("#story")
      || hero.closest(".pin-spacer")?.nextElementSibling
      || hero.nextElementSibling;
    const getNextSectionScrollY = () => {
      return nextSection ? window.scrollY + nextSection.getBoundingClientRect().top : window.scrollY;
    };
    const completeTransition = () => {
      clearTransitionWatchdog();
      unlockPageScroll();
    };
    const transition = {
      handled: false,
      getNextSectionScrollY,
      moveToNextSection(scrollY = getNextSectionScrollY()) {
        lockedScrollY = scrollY;
        window.scrollTo({ top: lockedScrollY, behavior: "instant" });
      },
      complete: completeTransition,
    };
    window.dispatchEvent(new CustomEvent("jikji:hero-video-ended", { detail: transition }));
    if (!transition.handled) {
      transition.moveToNextSection();
      completeTransition();
    } else {
      transitionWatchdog = window.setTimeout(() => {
        transition.moveToNextSection();
        completeTransition();
      }, 4000);
    }
  };

  const skipPlayback = () => {
    mediaEnded = true;
    finished = false;
    requested = false;
    clearPlaybackWatchdog();
    clearTransitionWatchdog();
    video?.pause();
    hero.classList.remove("hero-video-playing");
    playButton.hidden = true;
    suspendSectionTransitions(false);
    unlockPageScroll();
    window.dispatchEvent(new Event("jikji:hero-skip"));
  };

  function sync() {
    if (!video) return;
    const shouldPlay = finished && visible && !document.hidden && !video.error && !mediaEnded;
    if (!shouldPlay) {
      video.pause();
      requested = false;
      hero.classList.remove("hero-video-playing");
      playButton.hidden = true;
      if (!finished || !visible || document.hidden || video.error) unlockPageScroll();
    } else if (!requested) {
      requested = true;
      playFromOffset().then(() => {
        if (mediaEnded || !finished || !visible || document.hidden) {
          video.pause();
          requested = false;
          return;
        }
        lockPageScroll();
        armPlaybackWatchdog();
        playButton.hidden = true;
        if (!mediaEnded) hero.classList.add("hero-video-playing");
        if (video.ended) finishPlayback();
      }).catch(() => {
        requested = false;
        hero.classList.remove("hero-video-playing");
        unlockPageScroll();
        if (finished && visible) playButton.hidden = false;
      });
    }
  }

  playButton.addEventListener("click", () => {
    if (!video) return;
    mediaEnded = false;
    requested = true;
    playFromOffset().then(() => {
      if (mediaEnded || !finished || !visible || document.hidden) {
        video.pause();
        requested = false;
        return;
      }
      lockPageScroll();
      armPlaybackWatchdog();
      playButton.hidden = true;
      if (!mediaEnded) hero.classList.add("hero-video-playing");
      if (video.ended) finishPlayback();
    }).catch(() => {
      requested = false;
      hero.classList.remove("hero-video-playing");
      unlockPageScroll();
    });
  });

  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, { threshold: 0.15 });
  observer.observe(hero);
  document.addEventListener("visibilitychange", sync);
  video?.addEventListener("loadeddata", sync);
  video?.addEventListener("timeupdate", armPlaybackWatchdog);
  video?.addEventListener("ended", finishPlayback);
  video?.addEventListener("error", () => {
    clearPlaybackWatchdog();
    playButton.hidden = true;
    unlockPageScroll();
  });
  window.addEventListener("pagehide", event => {
    video?.pause();
    unlockPageScroll();
    if (!event.persisted) observer.disconnect();
  });
  window.addEventListener("pageshow", sync);

  return {
    skipPlayback,
    setProgress(progress) {
      const reveal = Math.max(0, Math.min(1, (progress - 0.55) / 0.43));
      hero.style.setProperty("--hero-blur", (16 * (1 - reveal)).toFixed(2) + "px");
      hero.style.setProperty("--hero-overlay", (0.55 * (1 - reveal)).toFixed(3));
      const nextFinished = progress >= 0.98;
      // Ignore tiny progress changes at the end of the pin; they can happen
      // while ScrollTrigger is aligning the next pinned section.
      if (progress < 0.82 && mediaEnded) {
        mediaEnded = false;
        if (video) video.currentTime = 0;
      }
      finished = nextFinished;
      hero.classList.toggle("hero-media-revealed", finished);
      sync();
    },
  };
}
