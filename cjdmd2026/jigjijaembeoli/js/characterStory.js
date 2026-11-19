function bindPosePicker(panel) {
  const featureImage = panel.querySelector(".character-feature__image");
  const poseRow = panel.querySelector(".character-poses__row");
  if (!featureImage || !poseRow) return () => {};

  const items = poseRow.querySelectorAll(".character-poses__item");
  const buttons = poseRow.querySelectorAll(".character-poses__button");
  const selectPose = event => {
    const button = event.currentTarget;
    const image = button.querySelector("img");
    featureImage.src = image.src;
    featureImage.alt = button.getAttribute("aria-label");
    featureImage.animate(
      [{ scale: 0.78 }, { scale: 1 }],
      { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
    buttons.forEach(poseButton => poseButton.setAttribute("aria-pressed", String(poseButton === button)));
  };
  const clearDock = () => {
    poseRow.classList.remove("is-hovering");
    items.forEach(item => item.classList.remove("is-dock-current"));
  };
  const updateDock = event => {
    const button = event.target.closest(".character-poses__button");
    if (!button || !poseRow.contains(button)) return;
    const activeIndex = Array.from(buttons).indexOf(button);
    poseRow.classList.add("is-hovering");
    items.forEach((item, index) => item.classList.toggle("is-dock-current", index === activeIndex));
  };
  const clearDockOnFocusOut = event => {
    if (!poseRow.contains(event.relatedTarget)) clearDock();
  };

  buttons.forEach(button => button.addEventListener("click", selectPose));
  poseRow.addEventListener("pointerover", updateDock);
  poseRow.addEventListener("pointerleave", clearDock);
  poseRow.addEventListener("focusin", updateDock);
  poseRow.addEventListener("focusout", clearDockOnFocusOut);
  return () => {
    buttons.forEach(button => button.removeEventListener("click", selectPose));
    poseRow.removeEventListener("pointerover", updateDock);
    poseRow.removeEventListener("pointerleave", clearDock);
    poseRow.removeEventListener("focusin", updateDock);
    poseRow.removeEventListener("focusout", clearDockOnFocusOut);
  };
}

export function initCharacterPosePickers() {
  return Array.from(document.querySelectorAll(".character-panel"))
    .map(bindPosePicker);
}


function createCharacterSpeech(panel, message, greetingAudio, fallbackDuration) {
  const bubble = panel.querySelector(".character-speech");
  const box = bubble?.querySelector(".character-speech__bubble");
  const text = bubble?.querySelector(".character-speech__text");
  const measure = bubble?.querySelector(".character-speech__measure");
  if (!bubble || !box || !text || !measure) return null;

  let timer = 0;
  let index = 0;
  const characters = Array.from(message);
  const fallbackInterval = Math.max(90, ((fallbackDuration * 1000) - 90) / Math.max(1, characters.length - 1));
  const baseFontSize = parseFloat(getComputedStyle(text).fontSize);
  const updateWidth = () => {
    const feature = bubble.parentElement.getBoundingClientRect();
    const center = feature.left + feature.width / 2;
    const availableWidth = Math.max(48, Math.min(window.innerWidth - 32, Math.min(center, window.innerWidth - center) * 2 - 24));
    const textWidthLimit = Math.max(8, availableWidth - 46);
    measure.style.fontSize = `${baseFontSize}px`;
    measure.textContent = message;
    const fullMessageWidth = measure.getBoundingClientRect().width;
    const fontSize = Math.max(8, Math.min(baseFontSize, baseFontSize * textWidthLimit / Math.max(1, fullMessageWidth)));
    text.style.fontSize = `${fontSize}px`;
    measure.style.fontSize = `${fontSize}px`;
    measure.textContent = text.textContent;
    const measuredWidth = measure.getBoundingClientRect().width;
    box.style.setProperty("--speech-width", `${Math.min(availableWidth, Math.max(48, Math.ceil(measuredWidth + 46)))}px`);
  };
  const onResize = () => updateWidth();
  window.addEventListener("resize", onResize, { passive: true });

  function stop() {
    window.clearTimeout(timer);
    timer = 0;
    index = 0;
    text.textContent = "";
    measure.textContent = "";
    text.style.removeProperty("font-size");
    measure.style.removeProperty("font-size");
    box.style.setProperty("--speech-width", "48px");
    bubble.classList.remove("is-visible", "is-typing");
    bubble.setAttribute("aria-hidden", "true");
  }

  function start() {
    stop();
    const audioDuration = Number.isFinite(greetingAudio?.duration) ? greetingAudio.duration : fallbackDuration;
    const typeInterval = Number.isFinite(audioDuration)
      ? Math.max(90, ((audioDuration * 1000) - 90) / Math.max(1, characters.length - 1))
      : fallbackInterval;
    bubble.setAttribute("aria-hidden", "false");
    bubble.classList.add("is-visible", "is-typing");
    const typeNext = () => {
      if (index < characters.length) {
        text.textContent += characters[index];
        index += 1;
        updateWidth();
        if (index >= characters.length) {
          timer = 0;
          bubble.classList.remove("is-typing");
          return;
        }
        timer = window.setTimeout(typeNext, typeInterval);
        return;
      }
      timer = 0;
      bubble.classList.remove("is-typing");
    };
    timer = window.setTimeout(typeNext, 90);
  }

  return {
    start,
    stop,
    destroy() {
      stop();
      window.removeEventListener("resize", onResize);
    },
    get message() { return message; },
  };
}

export function initCharacterStory(gsap) {
  const root = document.querySelector("#character");
  if (!root || !gsap || !window.ScrollTrigger) return () => {};

  const mousePanel = root.querySelector(".character-panel--mouse");
  const birdPanel = root.querySelector(".character-panel--bird");
  const mouseFeature = mousePanel.querySelector(".character-feature");
  const mouseFeatureImage = mouseFeature.querySelector(".character-feature__image");
  const mousePoses = mousePanel.querySelectorAll(".character-poses__item");
  const birdFeature = birdPanel.querySelector(".character-feature");
  const birdFeatureImage = birdFeature.querySelector(".character-feature__image");
  const birdPoses = birdPanel.querySelectorAll(".character-poses__item");
  const characterSwitcher = root.querySelector(".character-switcher");
  const characterSwitchButtons = Array.from(root.querySelectorAll("[data-character-select]"));
  const greetingVoices = {
    mouse: new Audio(new URL("../assets/audio/character-jjikjwi-greeting.mp3", import.meta.url)),
    bird: new Audio(new URL("../assets/audio/character-jjaekjjae-greeting.mp3", import.meta.url)),
  };
  const speech = {
    mouse: createCharacterSpeech(mousePanel, "안녕! 내 이름은 찍쥐야! 잘 부탁해!", greetingVoices.mouse, 4.519),
    bird: createCharacterSpeech(birdPanel, "안녕! 내 이름은 짹째! 만나서 반가워!!", greetingVoices.bird, 5.042),
  };
  Object.values(greetingVoices).forEach(audio => {
    audio.preload = "auto";
    audio.load();
  });
  let activeSpeech = null;
  let activeVoice = null;
  let pendingVoice = null;
  let activeCharacter = "mouse";
  let requestedCharacter = null;
  const setActiveCharacter = name => {
    const isBird = name === "bird";
    activeCharacter = name;
    root.dataset.selectedCharacter = name;
    characterSwitchButtons.forEach(button => {
      const selected = button.dataset.characterSelect === name;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    characterSwitcher?.classList.toggle("is-bird", isBird);
    mousePanel.style.removeProperty("--character-panel-bg");
    birdPanel.style.removeProperty("--character-panel-bg");
  };
  const stopVoices = () => {
    Object.values(greetingVoices).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    activeVoice = null;
    pendingVoice = null;
  };
  const playVoice = name => {
    if (activeVoice === name && !greetingVoices[name].paused) return;
    stopVoices();
    const audio = greetingVoices[name];
    activeVoice = name;
    pendingVoice = name;
    const playback = audio.play();
    playback?.then(() => {
      if (activeVoice === name) pendingVoice = null;
    }).catch(() => {
      // Keep the selected voice pending until the visitor provides a browser gesture.
    });
  };
  const resumePendingVoice = () => {
    if (!pendingVoice || pendingVoice !== activeVoice) return;
    const name = pendingVoice;
    const playback = greetingVoices[name].play();
    playback?.then(() => {
      if (activeVoice === name) pendingVoice = null;
    }).catch(() => {});
  };
  const audioGestureEvents = ["pointerdown", "touchstart", "keydown", "wheel"];
  audioGestureEvents.forEach(eventName => {
    document.addEventListener(eventName, resumePendingVoice, { capture: true, passive: true });
  });
  const activateSpeech = (name, restart = false) => {
    if (activeSpeech === name && !restart) return;
    Object.entries(speech).forEach(([key, controller]) => {
      if (!controller) return;
      if (key === name) controller.start();
      else controller.stop();
    });
    activeSpeech = name;
    root.dataset.activeSpeech = name;
    playVoice(name);
  };
  const stopSpeech = () => {
    Object.values(speech).forEach(controller => controller?.stop());
    stopVoices();
    activeSpeech = null;
    root.removeAttribute("data-active-speech");
  };
  const characterNames = [...root.querySelectorAll(".character-name")];
  characterNames.forEach(name => {
    const text = name.textContent.trim();
    if (name.querySelector(".character-name__char")) return;
    name.setAttribute("aria-label", text);
    name.replaceChildren(...Array.from(text, (character, index) => {
      const span = document.createElement("span");
      span.className = "character-name__char";
      span.style.setProperty("--name-char-index", String(index));
      span.textContent = character;
      return span;
    }));
  });
  const nameObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-highlighted", entry.isIntersecting);
    });
  }, { threshold: 0.25, rootMargin: "-5% 0px -5% 0px" });
  characterNames.forEach(name => nameObserver.observe(name));

  gsap.set(mouseFeature, { x: -150 });
  gsap.set(mouseFeatureImage, { autoAlpha: 0 });
  gsap.set(mousePoses, { x: -45, autoAlpha: 0.3 });
  gsap.set(birdPanel, { clipPath: "inset(100% 0 0 0)" });
  gsap.set(birdFeature, { x: -150 });
  gsap.set(birdFeatureImage, { autoAlpha: 0 });
  gsap.set(birdPoses, { x: -45, autoAlpha: 0.3 });
  gsap.set(birdPanel.querySelectorAll(".character-copy > *"), { autoAlpha: 0, y: 46 });

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "character-story",
      trigger: root,
      start: "top top",
      end: () => "+=" + window.innerHeight * (window.innerWidth < 700 ? 7.2 : 8.4),
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        root.style.visibility = "visible";
        root.classList.remove("is-process-intro");
        requestedCharacter = null;
        setActiveCharacter("mouse");
        stopSpeech();
      },
      onEnterBack: () => {
        root.style.visibility = "visible";
        requestedCharacter = null;
        setActiveCharacter("bird");
        activateSpeech("bird", true);
      },
      onLeave: () => {
        stopSpeech();
        root.classList.remove("is-process-intro");
        root.style.visibility = "hidden";
        const nextSection = root.nextElementSibling;
        if (nextSection) {
          window.scrollTo({
            top: window.scrollY + nextSection.getBoundingClientRect().top,
            behavior: "smooth",
          });
        }
      },
      onLeaveBack: () => { stopSpeech(); root.classList.remove("is-process-intro"); root.style.visibility = "hidden"; },
    },
  });

  timeline
    .to(mouseFeature, { x: 0, duration: 0.7, ease: "power2.out" })
    .to(mouseFeatureImage, { autoAlpha: 1, duration: 0.7, ease: "power2.out" }, "<")
    .to(mousePoses, { x: 0, autoAlpha: 1, duration: 0.45, stagger: 0.16, ease: "power2.out" })
    .to({}, { duration: 1.4 })
    .to(birdPanel, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "none" }, "bird-transition")
    .to(birdFeature, { x: 0, duration: 0.7, ease: "power2.out" }, "bird-transition+=0.3")
    .to(birdFeatureImage, { autoAlpha: 1, duration: 0.7, ease: "power2.out" }, "bird-transition+=0.3")
    .to(birdPoses, { x: 0, autoAlpha: 1, duration: 0.45, stagger: 0.16, ease: "power2.out" }, "bird-transition+=0.52")
    .to(birdPanel.querySelector(".kicker"), { autoAlpha: 1, y: 0, duration: 0.52, ease: "power2.out" }, "bird-transition+=0.32")
    .to(birdPanel.querySelector(".character-name"), { autoAlpha: 1, y: 0, duration: 0.62, ease: "power2.out" }, "bird-transition+=0.42")
    .to(birdPanel.querySelector(".character-subtitle"), { autoAlpha: 1, y: 0, duration: 0.56, ease: "power2.out" }, "bird-transition+=0.58")
    .to(birdPanel.querySelector(".sub"), { autoAlpha: 1, y: 0, duration: 0.64, ease: "power2.out" }, "bird-transition+=0.73")
    .to(birdPanel.querySelector(".character-link"), { autoAlpha: 1, y: 0, duration: 0.54, ease: "power2.out" }, "bird-transition+=0.9")
    .to({}, { duration: 1.5 });

  const mouseSpeechTime = 0.72;
  const birdSpeechTime = timeline.labels["bird-transition"] + 1.05;
  root.dataset.birdSpeechProgress = (birdSpeechTime / timeline.duration()).toFixed(4);
  const selectCharacter = event => {
    const name = event.currentTarget.dataset.characterSelect;
    requestedCharacter = name;
    setActiveCharacter(name);
    const trigger = timeline.scrollTrigger;
    if (!trigger) return;
    const destinationProgress = name === "bird" ? 0.78 : 0.18;
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * destinationProgress,
      behavior: "smooth",
    });
  };
  characterSwitchButtons.forEach(button => button.addEventListener("click", selectCharacter));
  const handleSwitcherKeydown = event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = characterSwitchButtons.findIndex(button => button === document.activeElement);
    const nextIndex = event.key === "Home" || event.key === "ArrowLeft"
      ? Math.max(0, index - 1)
      : Math.min(characterSwitchButtons.length - 1, index + 1);
    characterSwitchButtons[nextIndex]?.focus();
    characterSwitchButtons[nextIndex]?.click();
  };
  characterSwitcher?.addEventListener("keydown", handleSwitcherKeydown);
  timeline.eventCallback("onUpdate", () => {
    if (!timeline.scrollTrigger?.isActive) return;
    const progress = timeline.progress();
    root.classList.toggle("is-process-intro", progress >= 0.88 && progress < 0.995);
    const currentTime = timeline.time();
    const currentCharacter = currentTime >= birdSpeechTime ? "bird" : "mouse";
    if (currentTime >= birdSpeechTime) activateSpeech("bird");
    else if (currentTime >= mouseSpeechTime) activateSpeech("mouse");
    else if (activeSpeech) stopSpeech();
    if (requestedCharacter && requestedCharacter !== currentCharacter) return;
    requestedCharacter = null;
    if (activeCharacter !== currentCharacter) setActiveCharacter(currentCharacter);
  });

  const openBird = event => {
    event.preventDefault();
    history.replaceState(null, "", "#character-two");
    const trigger = window.ScrollTrigger.getById("character-story");
    if (!trigger) return;
    requestedCharacter = "bird";
    setActiveCharacter("bird", true);
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * 0.56,
      behavior: "smooth",
    });
  };
  const birdLink = mousePanel.querySelector('a[href="#character-two"]');
  birdLink?.addEventListener("click", openBird);

  return () => {
    root.classList.remove("is-process-intro");
    nameObserver.disconnect();
    audioGestureEvents.forEach(eventName => {
      document.removeEventListener(eventName, resumePendingVoice, true);
    });
    stopSpeech();
    characterSwitchButtons.forEach(button => button.removeEventListener("click", selectCharacter));
    characterSwitcher?.removeEventListener("keydown", handleSwitcherKeydown);
    Object.values(speech).forEach(controller => controller?.destroy());
    delete root.dataset.birdSpeechProgress;
    characterNames.forEach(name => {
      name.classList.remove("is-highlighted");
    });
    birdLink?.removeEventListener("click", openBird);
    timeline.scrollTrigger?.kill();
    timeline.kill();
    root.style.removeProperty("visibility");
  };
}
