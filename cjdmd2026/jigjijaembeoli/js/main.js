/* ============================================================
   main.js — 역할: 데이터 바인딩 + 움직임(인터랙션)만 담당.
   레이아웃(HTML)은 index.html, 디자인은 CSS, 콘텐츠는 data/*.js.
   이 파일은 섹션 HTML을 만들지 않습니다.
   ============================================================ */
import { siteImages } from "../data/siteImages.js?v=remove-unused-media-1";
import { sceneModels } from "../data/sceneModels.js";
import { videos } from "../data/videos.js?v=project04-video-poster-2";
import { characters } from "../data/characters.js";
import { initBookIntro } from "./bookIntro.js?v=intro-mint-particles-2";
import { initLeaflet } from "./leaflet.js?v=leaflet-restored-once-1";
import { siteContent } from "../data/siteContent.js?v=project04-thankyou-caption-1";
import { createHeroParticles } from "./heroParticles.js?v=hero-yell-1";
import { createHeroMedia } from "./heroMedia.js?v=hero-start-offset-05";
import { initSectionTransitions } from "./sectionTransitions.js?v=hero-skip-1";
import { initCanvasCursor } from "./canvasCursor.js";
import { initCharacterStory, initCharacterPosePickers } from "./characterStory.js?v=character-audio-sync-1";
import { initExperienceProcess } from "./experienceProcess.js?v=journey-layout-reset-1";
import { initSpecialistModels } from "./specialistModels.js";


const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const FALL = (w, h) => `https://placehold.co/${w}x${h}/eeeeee/999999?text=image`;

/* Keep the scroll cue viewport-fixed and hide it only when it overlaps visible UI. */
function initGlobalScrollHint() {
  const hint = $("#global-scroll-hint");
  if (!hint) return;
  const blockers = $("body");
  const selector = ".hero__scroll, .hero-skip, .intro-skip, .more-book-caption, .portfolio-hint, .portfolio-progress, button, a[href]";
  let scheduled = false;
  const update = () => {
    scheduled = false;
    hint.classList.toggle("is-process-intro", Boolean($("#character")?.classList.contains("is-process-intro")));
    const cue = hint.getBoundingClientRect();
    const candidates = $$(selector, blockers).filter(element => element !== hint && !hint.contains(element));
    const obscured = candidates.some(element => {
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.15) return false;
      const rect = element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1 || rect.bottom <= 0 || rect.top >= innerHeight) return false;
      return rect.left < cue.right && rect.right > cue.left && rect.top < cue.bottom && rect.bottom > cue.top;
    });
    hint.classList.toggle("is-obscured", obscured);
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  if (window.ScrollTrigger) ScrollTrigger.addEventListener("refresh", schedule);
  schedule();
}

initGlobalScrollHint();

initCharacterPosePickers();

initCanvasCursor(document.querySelector(".footprint-overlay"), siteImages.footprintCursor);


/* Bind text only; section markup remains in HTML. */
const contentValue = path => path.split(".").reduce((value, key) => value?.[key], siteContent);
$$("[data-content]").forEach(element => {
  const value = contentValue(element.dataset.content);
  if (typeof value === "string") element.textContent = value;
});
$$("*").forEach(element => {
  [...element.attributes].filter(attribute => attribute.name.startsWith("data-content-")).forEach(attribute => {
    const value = contentValue(attribute.value);
    if (typeof value === "string") element.setAttribute(attribute.name.slice(13), value);
  });
});
document.title = siteContent.pageTitle;
try {
  initBookIntro(sceneModels.introNotebook);
} catch (error) {
  // An unavailable optional 3D scene must not stop the page interactions.
  document.body.classList.remove("intro-active");
  document.querySelectorAll("#header, .section-nav").forEach(element => { element.inert = false; });
  console.warn("Book intro unavailable:", error);
}
initLeaflet(document.querySelector(".leaflet"), window.gsap, window.ScrollTrigger);
const specialistModels = initSpecialistModels($("#specialist .spec-model"), sceneModels.specialistSteps);

/* ---------- 1) 이미지 바인딩: [data-image="키"] → siteImages[키] ---------- */
$$("[data-image]").forEach(img => {
  const key = img.dataset.image;
  const src = siteImages[key];
  if (img.hasAttribute("data-optional")) {
    if (!src) return;
    img.hidden = false;
    if (img.dataset.image === "brandLogo") img.previousElementSibling.hidden = true;
  }
  img.src = src || FALL(800, 600);
  img.onerror = () => {
    img.onerror = null;
    if (img.hasAttribute("data-optional")) {
      img.hidden = true;
      if (img.dataset.image === "brandLogo") img.previousElementSibling.hidden = false;
    } else img.src = FALL(800, 600);
  };
});

/* ---------- 2) 영상 슬롯 바인딩: [data-video="키"] → videos[키] ----------
   우선순위 file > youtube > thumb. 슬롯 비율/크기는 CSS 가 유지. */
function createVideoFramePoster(video, posterTimes = []) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context || !posterTimes.length) return;

  const times = posterTimes.filter(time => Number.isFinite(time) && time >= 0);
  let index = 0;
  let bestScore = -1;
  let bestPoster = "";
  let bestTime = 0;
  let ready = false;

  const captureFrame = () => {
    if (ready || !video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth) return;
    const width = 360;
    const height = Math.max(1, Math.round(width * video.videoHeight / video.videoWidth));
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height).data;
    let brightness = 0;
    let samples = 0;
    for (let pixel = 0; pixel < pixels.length; pixel += 64) {
      brightness += pixels[pixel] * 0.2126 + pixels[pixel + 1] * 0.7152 + pixels[pixel + 2] * 0.0722;
      samples += 1;
    }
    const score = samples ? brightness / samples : 0;
    if (score > bestScore) {
      bestScore = score;
      bestPoster = canvas.toDataURL("image/jpeg", 0.82);
      bestTime = video.currentTime;
    }

    index += 1;
    const nextTime = times[index];
    if (nextTime !== undefined && nextTime < video.duration - 0.1) {
      video.currentTime = nextTime;
      return;
    }
    if (!bestPoster) return;
    ready = true;
    video.poster = bestPoster;
    video.dataset.posterFrameReady = "true";
    video.currentTime = bestTime;
  };

  video.addEventListener("seeked", captureFrame);
  video.addEventListener("loadedmetadata", () => {
    if (video.paused && times[0] !== undefined && times[0] < video.duration - 0.1) video.currentTime = times[0];
  }, { once: true });
}

function renderMedia(slot) {
  const v = videos[slot.dataset.video];
  if (!v) return;
  if (slot.hidden && !v.file) return;
  if (v.file) {
    const video = document.createElement("video");
    const isHero = slot.dataset.video === "heroBg";
    const isPortfolioVideo = Boolean(slot.closest(".vcard"));
    video.src = v.file;
    video.autoplay = !isHero && !isPortfolioVideo;
    video.muted = true;
    video.loop = !isHero && !isPortfolioVideo;
    video.playsInline = true;
    video.preload = isHero ? "auto" : "metadata";
    if (v.thumb) video.poster = v.thumb;

    if (isPortfolioVideo) {
      // Use the card's single custom control; native controls add a second play button.
      video.controls = false;
      createVideoFramePoster(video, v.posterTimes);
      const placeholder = slot.closest(".vcard")?.querySelector(".media-note");
      if (placeholder) placeholder.hidden = true;
      const playButton = document.createElement("button");
      const card = slot.closest(".vcard");
      playButton.type = "button";
      playButton.className = "play";
      playButton.setAttribute("aria-label", siteContent.ui.play);
      const playVideo = () => {
        if (video.dataset.posterFrameReady === "true") video.currentTime = 0;
        video.muted = false;
        video.play().catch(() => { playButton.hidden = false; });
      };
      playButton.addEventListener("click", event => {
        event.stopPropagation();
        if (video.paused || video.ended) playVideo();
        else video.pause();
      });
      video.addEventListener("play", () => {
        card?.classList.add("is-playing");
        playButton.classList.add("is-playing");
        playButton.setAttribute("aria-label", "영상 일시정지");
      });
      video.addEventListener("pause", () => {
        playButton.hidden = false;
        card?.classList.remove("is-playing");
        playButton.classList.remove("is-playing");
        playButton.setAttribute("aria-label", siteContent.ui.play);
      });
      video.addEventListener("ended", () => {
        playButton.hidden = false;
        card?.classList.remove("is-playing");
        playButton.classList.remove("is-playing");
        playButton.setAttribute("aria-label", siteContent.ui.play);
      });
      slot.replaceChildren(video, playButton);
      slot.closest(".vcard")?.addEventListener("click", event => {
        if (event.target.closest("video, button") || !video.paused) return;
        playVideo();
      });
      return;
    }

    slot.replaceChildren(video);
    if (isHero) {
      slot.hidden = false;
      const image = slot.parentElement.querySelector("[data-image]");
      video.addEventListener("loadeddata", () => {
        if (image) image.style.display = "none";
      }, { once: true });
      video.addEventListener("error", () => {
        slot.hidden = true;
        if (image) image.style.display = "";
      });
    }
    return;
  }
  const thumb = v.thumb || (v.youtube ? `https://img.youtube.com/vi/${v.youtube}/maxresdefault.jpg` : FALL(1280, 720));
  const link  = v.youtube ? `https://www.youtube.com/watch?v=${v.youtube}` : "#";
  const play  = v.youtube ? `<a class="play" href="${link}" target="_blank" rel="noopener" aria-label="${siteContent.ui.play}"></a>` : "";
  slot.innerHTML = `<img class="bw" src="${thumb}" alt="" onerror="this.onerror=null;this.src='${FALL(1280,720)}'">${play}`;
}
$$(".media-slot[data-video]").forEach(renderMedia);
if ("IntersectionObserver" in window) {
  const portfolioCardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 0.35) {
        entry.target.querySelectorAll("video").forEach(video => video.pause());
      }
    });
  }, { threshold: [0, 0.35] });
  $$("#portfolio .vcard").forEach(card => portfolioCardObserver.observe(card));
}
const heroMedia = createHeroMedia($("#hero"));

const hero = $("#hero");
const heroAudioSources = {
  title: "assets/audio/hero-title.mp3",
  captionFirst: "assets/audio/hero-caption-first.mp3",
  captionSecond: "assets/audio/hero-caption-second.mp3",
};
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const heroAudioContext = AudioContextClass ? new AudioContextClass() : null;
let heroAudioSource = null;
let heroTransitionAudioSource = null;
let heroTransitionAudioPending = false;
let pendingHeroAudioCue = null;
let heroTitleAudioPlayed = false;
const heroTransitionAudioBufferPromise = heroAudioContext
  ? fetch(new URL("../assets/audio/transition-bubbles.mp3", import.meta.url))
    .then(response => {
      if (!response.ok) throw new Error("HTTP " + response.status + " while loading the transition sound");
      return response.arrayBuffer();
    })
    .then(data => heroAudioContext.decodeAudioData(data))
    .catch(error => {
      console.error("Hero transition sound could not be loaded:", error);
      return null;
    })
  : Promise.resolve(null);
const heroAudioBuffersPromise = heroAudioContext
  ? Promise.all(Object.entries(heroAudioSources).map(async ([key, path]) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error("HTTP " + response.status + " while loading " + path);
    const buffer = await heroAudioContext.decodeAudioData(await response.arrayBuffer());
    return [key, buffer];
  })).then(entries => Object.fromEntries(entries)).catch(error => {
    console.error("Hero audio files could not be loaded:", error);
    return null;
  })
  : Promise.resolve(null);

const unlockHeroAudio = () => {
  if (!heroAudioContext) return;
  const resume = heroAudioContext.state === "running"
    ? Promise.resolve()
    : heroAudioContext.resume();
  resume.then(() => {
    playPendingHeroAudioCue();
    playHeroTransitionSound();
  })
    .catch(error => console.warn("Hero audio context remains locked:", error));
};
["pointerdown", "touchstart", "wheel", "keydown", "click"].forEach(eventName => {
  document.addEventListener(eventName, unlockHeroAudio, { capture: true, passive: true });
});

function playPendingHeroAudioCue() {
  if (!heroAudioContext || heroAudioContext.state !== "running" || !pendingHeroAudioCue) return;
  const cue = pendingHeroAudioCue;
  pendingHeroAudioCue = null;
  heroAudioBuffersPromise.then(buffers => {
    const buffer = buffers?.[cue.key];
    if (!buffer) return;
    if (heroAudioSource) {
      try { heroAudioSource.stop(); } catch { /* Previous cue has already ended. */ }
    }
    const source = heroAudioContext.createBufferSource();
    heroAudioSource = source;
    source.buffer = buffer;
    source.connect(heroAudioContext.destination);
    source.addEventListener("ended", () => {
      if (heroAudioSource === source) heroAudioSource = null;
    }, { once: true });
    source.start();
  });
}

function playAudioClip(key, label) {
  if (!heroAudioContext) {
    console.error("Web Audio is unavailable; cannot play " + label + ".");
    return;
  }
  pendingHeroAudioCue = { key, label };
  if (heroAudioContext.state === "running") playPendingHeroAudioCue();
}

function playHeroTransitionSound() {
  if (!heroTransitionAudioPending || !heroAudioContext || heroAudioContext.state !== "running") return;
  heroTransitionAudioBufferPromise.then(buffer => {
    if (!buffer || !heroTransitionAudioPending || heroTransitionAudioSource || heroAudioContext.state !== "running") return;
    const source = heroAudioContext.createBufferSource();
    const volume = heroAudioContext.createGain();
    heroTransitionAudioSource = source;
    source.buffer = buffer;
    volume.gain.value = 0.7;
    source.connect(volume);
    volume.connect(heroAudioContext.destination);
    source.addEventListener("ended", () => {
      if (heroTransitionAudioSource === source) heroTransitionAudioSource = null;
    }, { once: true });
    source.start();
  });
}

function stopHeroTransitionSound() {
  heroTransitionAudioPending = false;
  if (!heroTransitionAudioSource) return;
  try { heroTransitionAudioSource.stop(); } catch { /* The transition sound has already ended. */ }
  heroTransitionAudioSource = null;
}

window.addEventListener("jikji:hero-transition-start", () => {
  heroTransitionAudioPending = true;
  if (heroAudioContext?.state === "running") playHeroTransitionSound();
  else heroAudioContext?.resume()
    .then(playHeroTransitionSound)
    .catch(error => console.warn("Hero transition sound is waiting for audio access:", error));
});
window.addEventListener("jikji:hero-transition-end", stopHeroTransitionSound);

const playHeroTitleAudio = () => {
  if (heroTitleAudioPlayed) return;
  heroTitleAudioPlayed = true;
  playAudioClip("title", "새롭게 만나는 직지");
};
if (hero && "IntersectionObserver" in window) {
  const heroSectionAudioObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    playHeroTitleAudio();
    heroSectionAudioObserver.disconnect();
  }, { threshold: 0.01 });
  heroSectionAudioObserver.observe(hero);
} else if (hero) {
  window.addEventListener("load", () => {
    if (hero.getBoundingClientRect().top < window.innerHeight) playHeroTitleAudio();
  }, { once: true });
}

const firstCaptionLine = $(".hero-film-caption__line--first", hero);
const secondCaptionLine = $(".hero-film-caption__line--second", hero);
firstCaptionLine?.addEventListener("animationstart", event => {
  if (event.target === firstCaptionLine && event.animationName === "hero-caption-rise") {
    playAudioClip("captionFirst", "눈으로 보는 전시에서");
  }
});
secondCaptionLine?.addEventListener("animationstart", event => {
  if (event.target === secondCaptionLine && event.animationName === "hero-caption-rise") {
    playAudioClip("captionSecond", "직접 체험하는 전시로");
  }
});

/* ---------- Navigation, keyboard access and native scrolling ---------- */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const nav = $("#nav");
const menu = $(".menu-toggle");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", siteContent.ui.menuOpen);
  document.body.classList.remove("menu-open");
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? siteContent.ui.menuClose : siteContent.ui.menuOpen);
  document.body.classList.toggle("menu-open", open);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
  if (event.key === "Tab" && nav.classList.contains("open")) {
    const links = $$("a", nav);
    if (event.shiftKey && document.activeElement === links[0]) {
      event.preventDefault();
      menu.focus();
    } else if (!event.shiftKey && document.activeElement === menu) {
      event.preventDefault();
      links[0].focus();
    }
  }
});
window.matchMedia("(min-width: 881px)").addEventListener("change", closeMenu);

function scrollToTarget(target) {
  let top = target.getBoundingClientRect().top + window.scrollY;
  const pin = window.ScrollTrigger?.getAll().find(st => st.pin && (st.trigger === target || target.contains(st.pin)));
  if (pin) top = pin.start + 1;
  window.scrollTo({ top, behavior: reducedMotion.matches ? "instant" : "smooth" });
}
$$('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    if (link.hash === "#character-two" && window.ScrollTrigger?.getById("character-story")) {
      event.preventDefault();
      closeMenu();
      return;
    }
    event.preventDefault();
    closeMenu();
    if (link.matches(".hero-skip")) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      heroMedia.skipPlayback();
      history.replaceState(null, "", link.hash);
      window.scrollTo({ top, behavior: "instant" });
      window.ScrollTrigger?.update(true);
      requestAnimationFrame(() => {
        window.ScrollTrigger?.update(true);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
      return;
    }
    scrollToTarget(target);
    history.replaceState(null, "", link.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});

/* FAQ remains usable without animation libraries. */
$$(".faq-item").forEach((item, i) => {
  const question = $(".faq-q", item);
  const answer = $(".faq-a", item);
  question.setAttribute("role", "button");
  question.setAttribute("tabindex", "0");
  question.setAttribute("aria-expanded", "false");
  answer.id = "faq-answer-" + i;
  question.setAttribute("aria-controls", answer.id);
  answer.setAttribute("aria-hidden", "true");
  const toggle = () => {
    const open = item.classList.toggle("open");
    question.setAttribute("aria-expanded", String(open));
    answer.setAttribute("aria-hidden", String(!open));
    answer.style.maxHeight = open ? answer.scrollHeight + 28 + "px" : "";
  };
  question.addEventListener("click", toggle);
  question.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });
});

/* Reading progress and chapter navigation also work when GSAP is unavailable. */
const chapters = $$(".section-nav a").map(link => ({
  link, section: document.querySelector(link.hash),
}));
const navItems = $$("#nav a[href^='#']").map(link => ({
  link, section: document.querySelector(link.hash),
})).filter(item => item.section);
let scrollFrame = 0;
function updateProgress() {
  scrollFrame = 0;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  $(".reading-progress span").style.transform = "scaleX(" + (total > 0 ? window.scrollY / total : 0) + ")";
  let active = chapters[0];
  chapters.forEach(chapter => {
    if (chapter.section.getBoundingClientRect().top <= window.innerHeight * 0.45) active = chapter;
  });
  chapters.forEach(chapter => {
    if (chapter === active) chapter.link.setAttribute("aria-current", "location");
    else chapter.link.removeAttribute("aria-current");
  });
  let activeNav = navItems[0];
  navItems.forEach(item => {
    if (item.section.getBoundingClientRect().top <= window.innerHeight * 0.42) activeNav = item;
  });
  navItems.forEach(item => {
    if (item === activeNav) item.link.setAttribute("aria-current", "page");
    else item.link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
}, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

/* Reveal is independent of CDN loading. Content is visible by default in CSS. */
const reveals = $$(".reveal");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  document.documentElement.classList.add("reveal-ready");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(node => observer.observe(node));
}
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) reveals.forEach(node => node.classList.add("in"));
});

/* ---------- Scroll choreography ----------
   Desktop: held scenes with deliberate reading pauses.
   Mobile / short screens: natural flow, no pinned stacks.
   All pin state is reverted automatically by GSAP matchMedia.
*/
function initMotion() {
  if (!window.gsap || !window.ScrollTrigger) {
    $("#character")?.classList.add("character-story--static");
    return;
  }
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  initLogoDesignProcess(gsap, ScrollTrigger);

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const destroyCharacterStory = initCharacterStory(gsap);
    const destroyExperienceProcess = initExperienceProcess(gsap);
    const destroySectionTransitions = initSectionTransitions(gsap);
    const storyLayers = gsap.timeline({
      scrollTrigger: {
        id: "story-layer-separation", trigger: "#story",
        start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true,
      },
    });
    storyLayers
      .fromTo("#story .story-scene__background", { scale: 1 }, { scale: 1.06, y: 10, ease: "none" }, 0)
      .fromTo("#story .story-scene__people .story-scene__artwork", { y: 14, scale: 1.025 }, { y: -14, scale: 1.045, ease: "none" }, 0)
      .fromTo("#story .story-scene__tablet .story-scene__artwork", { x: -12, y: 8, scale: 1.025 }, { x: 12, y: -8, scale: 1.045, ease: "none" }, 0)
      .fromTo("#story .story-scene__shade", { opacity: 0 }, { opacity: 0.3, ease: "none" }, 0);
    const storyEntrance = gsap.timeline({
      scrollTrigger: {
        id: "story-layer-arrival",
        trigger: "#story",
        start: "top 82%",
        end: "top 48%",
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    });
    storyEntrance
      .fromTo("#story .story-scene__people", {
        x: 0, yPercent: -112, scale: 0.96, autoAlpha: 0,
      }, {
        x: 0, yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(1.55)",
      }, 0)
      .fromTo("#story .story-scene__tablet", {
        xPercent: 112, yPercent: 4, scale: 0.96, autoAlpha: 0,
      }, {
        xPercent: 0, yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.34, ease: "back.out(1.7)",
      }, 0.3);
    $$(".title").filter(title => !title.closest("#hero, #portfolio, #specialist")).forEach(title => {
      gsap.from(title, {
        yPercent: 35, clipPath: "inset(100% 0 0 0)", duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: title, start: "top 90%", once: true },
      });
    });
    gsap.from("#keywords .kw", {
      y: 30, scale: 0.96, opacity: 0, stagger: { each: 0.1, from: "center" },
      duration: 0.9, ease: "power2.out",
      scrollTrigger: { trigger: "#keywords .cloud", start: "top 70%", once: true },
    });
    gsap.from(".process-grid", {
      y: 65, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".process-grid", start: "top 90%", once: true },
    });
    $$("#process .pcard h3").forEach(title => {
      const label = title.textContent.trim();
      const characters = [...label].map(character => {
        const span = document.createElement("span");
        span.textContent = character;
        span.setAttribute("aria-hidden", "true");
        return span;
      });
      title.setAttribute("aria-label", label);
      title.replaceChildren(...characters);
      gsap.set(characters, { autoAlpha: 0 });
      gsap.to(characters, {
        autoAlpha: 1, duration: 0.01, stagger: 0.045, ease: "none",
        scrollTrigger: { trigger: title, start: "top 88%", once: true },
      });
    });
    gsap.fromTo("footer .fbg", { yPercent: -16, scale: 1.16 }, {
      yPercent: 0, scale: 1, ease: "none",
      scrollTrigger: { trigger: "#footer", start: "top bottom", end: "bottom bottom", scrub: true },
    });
    return () => {
      destroyCharacterStory?.();
      destroyExperienceProcess?.();
      destroySectionTransitions?.();
    };
  });
  mm.add("(min-width: 881px) and (prefers-reduced-motion: no-preference)", () => {
    document.documentElement.classList.add("motion-desktop");

    ScrollTrigger.create({
      id: "process-intro-hold",
      trigger: "#process .process-intro",
      start: "top top+=100",
      endTrigger: "#process .process-grid",
      end: "top top+=180",
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    // Restore the original hero scene after the independent book intro.
    const heroEnter = gsap.timeline({
      scrollTrigger: { id: "hero-enter", trigger: "#hero", start: "top 75%", once: true },
    });
    heroEnter
      .from("#hero .hero__inner .kicker", { y: 65, opacity: 0, duration: 1.2, ease: "expo.out" })
      .from("#hero .hero__inner .title", {
        y: 65, opacity: 0, duration: 1.2, ease: "expo.out",
      }, 0.14)
      .from("#hero .hero__inner .hero__description", { y: 65, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.28)
      .from("#hero .hero__inner .btn", { y: 65, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.42);
    const heroParticles = createHeroParticles($("#hero"));
    const dissolve = { progress: 0 };
    const hero = gsap.timeline({
      scrollTrigger: {
        id: "hero-scroll", trigger: "#hero", start: "top top",
        end: () => "+=" + window.innerHeight * 2.2,
        pin: true, scrub: 0.7, invalidateOnRefresh: true,
        onEnter: () => heroParticles.startWave(),
        onEnterBack: () => heroParticles.startWave(),
        onLeaveBack: () => heroParticles.resetWave(),
      },
    });
    hero.to({}, { duration: 0.25 })
      .to("#hero .hero__media", { scale: 1.18, duration: 1.3, ease: "none" }, 0)
      .to("#hero .hero__scroll", { autoAlpha: 0, duration: 0.2 }, 0.1)
      .to("#hero .hero__inner", { y: -100, autoAlpha: 0, scale: 0.94, duration: 0.7 }, 0.45)
      .to(dissolve, { progress: 1, duration: 1.05, ease: "none", onUpdate: () => { heroParticles.setProgress(dissolve.progress); heroMedia.setProgress(dissolve.progress); } }, 0.18)
      .to({}, { duration: 0.9 });
    gsap.fromTo("#story .order__inner", { scale: 0.97 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: "#story", start: "top 85%", end: "bottom 15%", scrub: 1.1 },
    });
    const cards = $$("#portfolio .vcard");
    const bar = $(".progress-bar");
    const count = $(".progress-count");
    const total = cards.length;
    const totalCount = $$(".progress-count").at(-1);
    if (totalCount) totalCount.textContent = String(total).padStart(2, "0");
    let portfolio;
    let selectedCardIndex = -1;
    const updatePortfolio = () => {
      if (!total || !portfolio) return;
      bar.style.width = ((portfolio.progress() * (total - 1) + 1) / total * 100) + "%";
      const activeIndex = cards.reduce((best, card, i) =>
        Number(gsap.getProperty(card, "opacity")) > Number(gsap.getProperty(cards[best], "opacity")) ? i : best, 0);
      selectCard(activeIndex);
    };
    const selectCard = index => {
      if (index !== selectedCardIndex) {
        cards.forEach((card, cardIndex) => {
          if (cardIndex !== index) card.querySelectorAll("video").forEach(video => video.pause());
        });
        selectedCardIndex = index;
      }
      cards.forEach((card, i) => { card.inert = i !== index; });
      count.textContent = String(index + 1).padStart(2, "0");
    };
    gsap.set(cards, { xPercent: 110, autoAlpha: 0, scale: 0.88, rotation: 5 });
    gsap.set(cards[0], { xPercent: 0, autoAlpha: 1, scale: 1, rotation: 0 });
    portfolio = gsap.timeline({
      onUpdate: updatePortfolio,
      scrollTrigger: {
        id: "portfolio-scroll", trigger: "#portfolio", start: "top top", end: () => "+=" + window.innerHeight * total * 0.85,
        pin: ".portfolio-pin", scrub: 0.65, invalidateOnRefresh: true,
      },
    });
    cards.forEach((card, i) => {
      gsap.set(card, { zIndex: i + 1 });
      portfolio.to({}, { duration: 0.45 });
      if (i < total - 1) {
        portfolio.to(card, { xPercent: -20, scale: 0.88, rotation: -5, autoAlpha: 0, duration: 0.55 })
          .to(cards[i + 1], { xPercent: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 0.55 }, "<");
      }
    });
    selectCard(0);
    updatePortfolio();

    const reasons = $$("#specialist .spec-reason");
    gsap.set(reasons, { autoAlpha: 0, y: 65 });
    gsap.set(reasons[0], { autoAlpha: 1, y: 0 });
    let specialist;
    specialist = gsap.timeline({
      onUpdate: () => {
        specialistModels.setProgress(specialist.progress());
        const active = reasons.reduce((best, reason, index) =>
          Number(gsap.getProperty(reason, "opacity")) > Number(gsap.getProperty(reasons[best], "opacity")) ? index : best, 0);
        $(".spec-status-count").textContent = String(active + 1).padStart(2, "0") + " / " + String(reasons.length).padStart(2, "0");
      },
      scrollTrigger: {
        id: "specialist-scroll", trigger: ".specialist-pin", start: "top top",
        end: () => "+=" + window.innerHeight * reasons.length * 0.6,
        pin: true, scrub: 0.65, invalidateOnRefresh: true,

      },
    });
    reasons.forEach((reason, i) => {
      specialist.to({}, { duration: 0.6 });
      if (i < reasons.length - 1) {
        specialist.to(reason, { autoAlpha: 0, y: -65, duration: 0.4 }, "reason" + i)
          .to(reasons[i + 1], { autoAlpha: 1, y: 0, duration: 0.4 }, "reason" + i);
      }
    });
    specialistModels.setProgress(0);
    return () => {
      heroParticles.destroy();
      heroMedia.setProgress(0);
      document.documentElement.classList.remove("motion-desktop");
      cards.forEach(card => { card.inert = false; });
      bar.style.width = "";
      updateProgress();
    };
  });
  mm.add("(max-width: 880px) and (prefers-reduced-motion: no-preference)", () => {
    const particles = createHeroParticles($("#hero"));
    const dissolve = { progress: 0 };
    const mobileHero = gsap.timeline({
      scrollTrigger: {
        id: "hero-particles-mobile", trigger: "#hero",
        start: "top top", end: () => "+=" + innerHeight * 1.8,
        pin: true, scrub: 0.6, invalidateOnRefresh: true,
        onEnter: () => particles.startWave(),
        onEnterBack: () => particles.startWave(),
        onLeaveBack: () => particles.resetWave(),
      },
    });
    mobileHero.to(dissolve, {
      progress: 1, duration: 1.05, ease: "none",
      onUpdate: () => { particles.setProgress(dissolve.progress); heroMedia.setProgress(dissolve.progress); },
    }).to({}, { duration: 0.8 });
    return () => { particles.destroy(); heroMedia.setProgress(0); };

  });
  ScrollTrigger.addEventListener("refresh", updateProgress);
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  ScrollTrigger.refresh();
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) scrollToTarget(target);
  }
}

function initLogoDesignProcess(gsap, ScrollTrigger) {
  const section = $("#logo-design-process");
  const trace = section?.querySelector(".logo-process__trace");
  const finalLogo = section?.querySelector(".logo-process__image--final");
  if (!section || !trace || !finalLogo) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const showFinalLogo = () => {
    trace.replaceChildren();
    trace.style.opacity = "0";
    finalLogo.style.opacity = "1";
    finalLogo.style.clipPath = "none";
    finalLogo.style.transform = "scale(1)";
  };
  if (reducedMotion) {
    showFinalLogo();
    return;
  }

  fetch(new URL("../images/logo-process/logo-01-traced.svg", import.meta.url))
    .then(response => {
      if (!response.ok) throw new Error(`Logo trace request failed (${response.status})`);
      return response.text();
    })
    .then(source => {
      const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
      const sourcePaths = parsed.querySelectorAll(".logo-process__trace-stroke");
      const sourceFill = parsed.querySelector(".logo-process__trace-fill");
      if (!sourcePaths.length || !sourceFill || parsed.querySelector("parsererror")) throw new Error("The traced logo paths are invalid");

      const paths = Array.from(sourcePaths, sourcePath => document.importNode(sourcePath, true));
      const fill = document.importNode(sourceFill, true);
      trace.replaceChildren(fill, ...paths);
      const pathLengths = paths.map(path => path.getTotalLength());
      const totalPathLength = pathLengths.reduce((sum, length) => sum + length, 0);
      paths.forEach((path, index) => {
        gsap.set(path, { strokeDasharray: pathLengths[index], strokeDashoffset: pathLengths[index] });
      });
      gsap.set(fill, { fillOpacity: 0 });
      gsap.set(trace, { opacity: 1, scale: 1, transformOrigin: "50% 50%" });
      gsap.set(finalLogo, { opacity: 0, scale: 0.985, transformOrigin: "50% 50%" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "logo-design-process-draw",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      paths.forEach((path, index) => {
        timeline.to(path, {
          strokeDashoffset: 0,
          duration: 4.5 * pathLengths[index] / totalPathLength,
          ease: "none",
        });
      });
      timeline
        .to(fill, { fillOpacity: 1, duration: 1.4, ease: "power1.out" })
        .to({}, { duration: 0.6 })
        .addLabel("logoMorph")
        .to(trace, { scale: 0.9, duration: 1.25, ease: "power1.inOut" }, "logoMorph")
        .to(finalLogo, {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power1.inOut",
        }, "logoMorph+=1.1")
        .to(trace, { opacity: 0, scale: 0.84, duration: 0.55, ease: "power1.in" }, "logoMorph+=1.45")
        .to(finalLogo, {
          scale: 0.985,
          duration: 0.4,
          ease: "power1.out",
        });
      ScrollTrigger.refresh();
    })
    .catch(error => {
      console.warn("Logo drawing animation unavailable:", error);
      showFinalLogo();
    });
}

initMotion();
window.addEventListener("load", () => window.ScrollTrigger?.refresh(), { once: true });
/* The optional 3D scene is loaded only when it approaches the viewport. */
document.querySelectorAll(".character-viewer").forEach(characterViewer => {
  const loadCharacter = async viewer => {
    if (viewer.dataset.characterState !== "idle") return;
    viewer.dataset.characterState = "loading";
    try {
      const { initCharacter } = await import("./character3d.js");
      const config = characters[viewer.dataset.characterKey];
      const image = viewer.querySelector("[data-character-image]");
      if (siteImages[image.dataset.image] && !config.model) {
        if (!image.complete) await new Promise((resolve, reject) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", reject, { once: true });
        });
        if (!image.naturalWidth) throw new Error("Character image failed to load");
        viewer.dataset.characterState = "image";
        viewer.querySelector(".character-help").textContent = siteContent.ui.image;
        return;
      }
      if (config.model) image.hidden = true;
      await initCharacter(viewer, { ...config, copy: siteContent.ui });
    } catch (error) {
      viewer.dataset.characterState = "fallback";
      viewer.querySelector(".character-help").textContent = siteContent.ui.fallback;
      console.warn("3D character unavailable:", error);
    }
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        const story = characterViewer.closest("#character");
        const targets = story ? story.querySelectorAll(".character-viewer") : [characterViewer];
        targets.forEach(loadCharacter);
      }
    }, { rootMargin: "400px" });
    observer.observe(characterViewer);
  } else {
    const story = characterViewer.closest("#character");
    const targets = story ? story.querySelectorAll(".character-viewer") : [characterViewer];
    targets.forEach(loadCharacter);
  }
});
