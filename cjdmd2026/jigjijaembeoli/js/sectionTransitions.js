/*
 * Vertical and horizontal SVG wipes adapted from Codrops Sketches 021 and 022.
 * Copyright (c) 2022 Codrops. MIT license: assets/licenses/CODROPS-SKETCHES-MIT.txt
 */
export function initSectionTransitions(gsap) {
  const horizontalPath = document.querySelector(".section-transition__path--horizontal");
  const verticalPath = document.querySelector(".section-transition__path--vertical");
  if (!horizontalPath || !verticalPath || !gsap) return () => {};

  const horizontal = {
    enter: "M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z",
    curve: "M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z",
    filled: "M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z",
    reverseFilled: "M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z",
    reverseCurve: "M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z",
    exit: "M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z",
  };
  const vertical = {
    enter: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
    curve: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
    filled: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
    reverseFilled: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
    reverseCurve: "M 0 0 V 50 Q 50 0 100 50 V 0 z",
    exit: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
  };
  let timeline;
  let activeTransition;

  const playWipe = (transition, path, shapes) => {
    if (!transition) return;
    transition.handled = true;
    activeTransition = transition;
    const hasTransitionSound = path === horizontalPath;
    if (hasTransitionSound) window.dispatchEvent(new Event("jikji:hero-transition-start"));
    timeline?.kill();

    timeline = gsap.timeline({
      onComplete() {
        path.style.visibility = "hidden";
        activeTransition = null;
        if (hasTransitionSound) window.dispatchEvent(new Event("jikji:hero-transition-end"));
        transition.complete?.();
      },
    });
    timeline
      .set(path, { visibility: "visible", attr: { d: shapes.enter } })
      .to(path, { attr: { d: shapes.curve }, duration: 0.48, ease: "power2.inOut" })
      .to(path, { attr: { d: shapes.filled }, duration: 0.3, ease: "sine.inOut" });

    if (transition.getNextSectionScrollY) {
      const scroll = { y: window.scrollY };
      timeline.to(scroll, {
        y: transition.getNextSectionScrollY(), duration: 0.48, ease: "power1.inOut",
        onUpdate: () => transition.moveToNextSection?.(scroll.y),
      });
    } else {
      timeline.add(() => transition.moveToNextSection?.());
    }

    timeline
      .set(path, { attr: { d: shapes.reverseFilled } })
      .to(path, { attr: { d: shapes.reverseCurve }, duration: 0.3, ease: "sine.inOut" })
      .to(path, { attr: { d: shapes.exit }, duration: 0.48, ease: "power2.inOut" });
  };

  const playAfterHero = event => playWipe(event.detail, horizontalPath, horizontal);
  const cancelHeroTransition = () => {
    if (!activeTransition) return;
    timeline?.kill();
    horizontalPath.style.visibility = "hidden";
    verticalPath.style.visibility = "hidden";
    activeTransition.complete?.();
    activeTransition = null;
    window.dispatchEvent(new Event("jikji:hero-transition-end"));
  };
  const playAfterIntro = () => {
    if (timeline?.isActive()) return;
    let lockedScrollY = window.scrollY;
    const nextSection = document.querySelector("#hero");
    const preventScroll = event => event.preventDefault();
    const preventScrollKeys = event => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) event.preventDefault();
    };
    const holdPosition = () => {
      if (Math.abs(window.scrollY - lockedScrollY) > 1) window.scrollTo(0, lockedScrollY);
    };
    const unlock = () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
      window.removeEventListener("scroll", holdPosition);
      requestAnimationFrame(() => window.ScrollTrigger?.update());
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);
    window.addEventListener("scroll", holdPosition, { passive: true });

    playWipe({
      getNextSectionScrollY() {
        return nextSection ? window.scrollY + nextSection.getBoundingClientRect().top : window.scrollY;
      },
      moveToNextSection(scrollY = window.scrollY + (nextSection?.getBoundingClientRect().top || 0)) {
        lockedScrollY = scrollY;
        window.scrollTo(0, lockedScrollY);
      },
      complete: unlock,
    }, verticalPath, vertical);
  };

  window.addEventListener("jikji:hero-video-ended", playAfterHero);
  window.addEventListener("jikji:hero-skip", cancelHeroTransition);
  window.addEventListener("jikji:intro-ended", playAfterIntro);
  return () => {
    window.removeEventListener("jikji:hero-video-ended", playAfterHero);
    window.removeEventListener("jikji:hero-skip", cancelHeroTransition);
    window.removeEventListener("jikji:intro-ended", playAfterIntro);
    timeline?.kill();
    window.dispatchEvent(new Event("jikji:hero-transition-end"));
    horizontalPath.style.visibility = "hidden";
    verticalPath.style.visibility = "hidden";
    activeTransition?.moveToNextSection?.();
    activeTransition?.complete?.();
    activeTransition = null;
  };
}
