const MODEL_PATH = new URL('../models/bugangli6.glb', import.meta.url).href + '?v=20261103-01';
const MODEL_PATHS = Object.freeze({
  minga: MODEL_PATH,
  sachal: new URL('../models/yonghwajeon.web.glb', import.meta.url).href + '?v=20261103-01',
  gate: new URL('../models/mt_castle.glb', import.meta.url).href + '?v=20261103-01'
});

import { setupArchiveGallery, viewerArchiveRecords, viewerArchiveSites } from './archive-gallery.js?v=20261114-02';
import { archivePhotoDescriptions } from './archive-photo-descriptions.js?v=20261112-08';
import { renderLearningDiagrams } from './learning-diagrams.js?v=20261113-02';
import { createShadowRefreshGate } from './shadow-refresh.js?v=20261103-01';
import { TEMPLE_PART_ORDER, findTempleGroup, templeExplodeProfile } from './temple-parts.js?v=20261103-01';
import { koreanDate } from './solar-position.js?v=20261103-01';
import { orientLightToBuilding } from './building-light-direction.js?v=20261114-01';
import { homeBackgroundProgress, homeManualBackgroundProgress, setupHomeBackgroundVideos } from './home-background.js?v=20261115-04';
import { softenGroundShadow } from './ground-shadow.js?v=20261103-01';
import { SUN_PATH_SIZE, createSunPath, sunMinutesAtProgress, sunProgressAtMinutes, sunPathPoint, sunPathTicks, sunMinutesAtX } from './sun-path.js?v=20261103-01';

const LANG_KEY = 'hanokLanguage';
const VIEWER_TUTORIAL_KEY = 'hanokViewerTutorialSeenV2';
const SITE_BGM_KEY = 'hanokSiteBgmState';
const SITE_BGM_SRC = new URL('../assets/audio/bgm-bossa-nova.mp3', import.meta.url).href;
let siteBgmController = null;

function readSiteBgmState() {
  try {
    const stored = JSON.parse(localStorage.getItem(SITE_BGM_KEY) || '{}');
    return {
      enabled: stored.enabled !== false,
      position: Number.isFinite(Number(stored.position)) ? Math.max(0, Number(stored.position)) : 0,
      savedAt: Number.isFinite(Number(stored.savedAt)) ? Number(stored.savedAt) : Date.now()
    };
  } catch {
    return { enabled: true, position: 0, savedAt: Date.now() };
  }
}

function setupPersistentSiteBgm() {
  const page = document.body.dataset.page;
  if (page !== 'home' && page !== 'viewer') return null;

  let audio = document.getElementById('bgmAudio');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'bgmAudio';
    audio.src = SITE_BGM_SRC;
    audio.preload = 'auto';
    audio.loop = true;
    audio.hidden = true;
    document.body.appendChild(audio);
  }

  audio.volume = .42;
  audio.loop = true;
  const stored = readSiteBgmState();
  let enabled = stored.enabled;
  let restored = false;
  let lastPersistedAt = 0;

  const persist = (force = false) => {
    const now = Date.now();
    if (!force && now - lastPersistedAt < 800) return;
    lastPersistedAt = now;
    try {
      localStorage.setItem(SITE_BGM_KEY, JSON.stringify({
        enabled,
        position: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
        savedAt: now
      }));
    } catch {}
  };

  const restorePosition = () => {
    if (restored || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const elapsedSeconds = Math.max(0, (Date.now() - stored.savedAt) / 1000);
    // Carry only an actual page-transition gap. Returning to the site much later
    // should resume the saved point instead of advancing by the time spent away.
    const transitionSeconds = enabled && elapsedSeconds <= 15 ? elapsedSeconds : 0;
    audio.currentTime = (stored.position + transitionSeconds) % audio.duration;
    restored = true;
  };

  const play = async () => {
    if (!enabled) return false;
    restorePosition();
    try {
      await audio.play();
      persist(true);
      return true;
    } catch {
      return false;
    }
  };

  const setEnabled = async (nextEnabled) => {
    enabled = Boolean(nextEnabled);
    if (enabled) await play();
    else audio.pause();
    persist(true);
    return enabled;
  };

  audio.addEventListener('loadedmetadata', () => {
    restorePosition();
    if (enabled) play();
  }, { once: true });
  audio.addEventListener('timeupdate', () => persist(false));
  window.addEventListener('pagehide', () => persist(true));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') persist(true);
  });

  const retryPlayback = () => { if (enabled && audio.paused) play(); };
  document.addEventListener('pointerdown', retryPlayback, { once: true });
  document.addEventListener('keydown', retryPlayback, { once: true });

  if (audio.readyState >= 1) restorePosition();
  if (enabled) play();
  else audio.pause();

  siteBgmController = {
    audio,
    get enabled() { return enabled; },
    play,
    setEnabled,
    persist: () => persist(true)
  };
  return siteBgmController;
}

async function setupIndexEntrance() {
  if (document.body.dataset.page !== 'home') return;

  const entrance = document.getElementById('indexEntrance');
  if (!entrance) {
    document.body.classList.add('index-scene-reveal', 'index-typography-ready', 'index-typography-reveal');
    document.body.classList.remove('index-entrance-pending', 'index-camera-travel');
    return;
  }

  const preventEntranceScroll = (event) => event.preventDefault();
  const preventEntranceKeys = (event) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) event.preventDefault();
  };
  window.addEventListener('wheel', preventEntranceScroll, { passive: false });
  window.addEventListener('touchmove', preventEntranceScroll, { passive: false });
  window.addEventListener('keydown', preventEntranceKeys);

  let entranceFinished = false;
  const finish = () => {
    if (entranceFinished) return;
    entranceFinished = true;
    window.removeEventListener('wheel', preventEntranceScroll);
    window.removeEventListener('touchmove', preventEntranceScroll);
    window.removeEventListener('keydown', preventEntranceKeys);
    document.body.classList.remove('index-entrance-pending', 'index-camera-travel');
    entrance.remove();
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('index-scene-reveal', 'index-typography-ready', 'index-typography-reveal');
    finish();
    return;
  }

  const preloadImage = (src) => new Promise((resolve) => {
    const image = new Image();
    image.onload = async () => {
      try { await image.decode(); } catch {}
      resolve();
    };
    image.onerror = resolve;
    image.src = src;
  });
  await Promise.race([
    Promise.all([
      preloadImage('./assets/entrance/door_frame.webp'),
      preloadImage('./assets/entrance/door_left_v2.webp'),
      preloadImage('./assets/entrance/door_right_v2.webp'),
      preloadImage('./assets/videos/index-day-poster.webp'),
      preloadImage('./assets/videos/index-evening-poster.webp')
    ]),
    new Promise((resolve) => window.setTimeout(resolve, 1600))
  ]);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.setTimeout(() => entrance.classList.add('is-rising'), 100);
      window.setTimeout(() => {
        entrance.classList.add('is-opening');
      }, 470);
      // Stage two begins only after the leaves have reached their open angle.
      window.setTimeout(() => {
        entrance.classList.add('is-passing');
        document.body.classList.add('index-camera-travel');
        window.setTimeout(() => {
          document.body.classList.add('index-scene-reveal', 'index-typography-ready', 'index-typography-reveal');
        }, 420);
        window.setTimeout(finish, 820);
      }, 1640);
    });
  });

  window.setTimeout(() => {
    document.body.classList.add('index-scene-reveal', 'index-typography-ready', 'index-typography-reveal');
    finish();
  }, 3050);
}

function setupHomeScrollScene() {
  if (document.body.dataset.page !== 'home') return;
  const hero = document.querySelector('.hero-banner');
  if (!hero) return;
  const background = setupHomeBackgroundVideos(hero.querySelector('.home-background-videos'));
  const timeToggle = document.getElementById('homeTimeToggle');
  let isEvening = false;
  let frame = 0;
  let previousScene = -1;
  let measurePending = true;
  let heroTop = 0;
  let heroHeight = 0;
  let viewportHeight = 1;
  let visualProgress = 0;
  let manualAnchor = null;
  let blendAnimation = null;
  let scrollPending = false;
  const syncTimeControl = () => {
    if (!timeToggle) return;
    const isKorean = getLang() === 'ko';
    timeToggle.setAttribute('aria-checked', String(isEvening));
    timeToggle.setAttribute('aria-label', isKorean ? '저녁 모드' : 'Evening mode');
    timeToggle.title = isKorean
      ? (isEvening ? '낮으로 전환' : '저녁으로 전환')
      : (isEvening ? 'Switch to day' : 'Switch to evening');
  };
  const applyProgress = (value) => {
    visualProgress = Math.max(0, Math.min(1, value));
    background.setProgress(Number(visualProgress.toFixed(4)));
    const nextEvening = visualProgress >= .5;
    if (nextEvening !== isEvening) {
      isEvening = nextEvening;
      syncTimeControl();
    }
  };
  const update = (timestamp = performance.now()) => {
    frame = 0;
    // Geometry is stable between resizes. Avoid layout reads after each
    // scroll-frame style write, especially while the video is compositing.
    if (measurePending) {
      viewportHeight = Math.max(1, window.innerHeight);
      heroTop = hero.getBoundingClientRect().top + window.scrollY;
      heroHeight = hero.offsetHeight;
      measurePending = false;
    }
    const timeProgress = homeBackgroundProgress(window.scrollY, heroTop, heroHeight, viewportHeight);
    const sceneIndex = Math.max(0, Math.min(3, Math.round(window.scrollY / viewportHeight)));
    if (scrollPending) {
      // Interrupt a click fade at its visible colour instead of jumping to
      // either the old scroll colour or the unfinished target.
      if (blendAnimation) {
        manualAnchor = { position: blendAnimation.position, value: visualProgress };
        blendAnimation = null;
      }
      if (timeProgress === 0) manualAnchor = null;
      scrollPending = false;
    }
    if (blendAnimation) {
      const t = Math.max(0, Math.min(1, (timestamp - blendAnimation.start) / 450));
      const eased = t * t * (3 - 2 * t);
      applyProgress(blendAnimation.from + (blendAnimation.target - blendAnimation.from) * eased);
      if (t === 1) blendAnimation = null;
    } else {
      applyProgress(homeManualBackgroundProgress(timeProgress, manualAnchor));
    }
    if (sceneIndex !== previousScene) {
      previousScene = sceneIndex;
      document.body.classList.toggle('home-scene-context', sceneIndex === 1);
      document.body.classList.toggle('home-scene-guide', sceneIndex === 2);
      document.body.classList.toggle('home-scene-hanok', sceneIndex === 3);
      document.body.classList.toggle('home-scene-expanded', sceneIndex > 0);
    }
    if (blendAnimation) requestUpdate();
  };
  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  timeToggle?.addEventListener('click', () => {
    const target = blendAnimation ? 1 - blendAnimation.target : (isEvening ? 0 : 1);
    const position = homeBackgroundProgress(window.scrollY, heroTop, heroHeight, viewportHeight);
    manualAnchor = { position, value: target };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      blendAnimation = null;
      applyProgress(target);
    } else {
      blendAnimation = { position, target, from: visualProgress, start: performance.now() };
      requestUpdate();
    }
  });
  window.__refreshHomeTimeToggle = syncTimeControl;
  syncTimeControl();
  update();
  window.addEventListener('scroll', () => { scrollPending = true; requestUpdate(); }, { passive: true });
  window.addEventListener('resize', () => { measurePending = true; requestUpdate(); });
}

function prepareHomeTitleLetters() {
  if (document.body.dataset.page !== 'home') return;
  document.querySelectorAll('.hero-inner h1[data-i18n="homeTitle"], .home-scene-copy--context h2[data-i18n="homeContextTitle"]').forEach((title) => {
    const text = title.textContent || '';
    title.textContent = '';
    [...text].forEach((character, index) => {
      const span = document.createElement('span');
      span.className = 'hero-title-char';
      span.style.setProperty('--char-index', index);
      span.style.setProperty('--char-reverse-index', text.length - index - 1);
      span.textContent = character === ' ' ? '\u00a0' : character;
      title.appendChild(span);
    });
  });
}

const translations = {
  ko: {
    lightTime: '시간',
    brand: '로고/심볼', menuHome: 'HOME', menuViewer: 'VIEWER', menuArchive: 'ARCHIVING', menuAbout: 'ABOUT',
    homeEyebrow: '한옥 처마의 빛과 그림자를 탐색하는 인터랙티브 아카이브', homeKicker: '처마 · 빛 · 그림자', homeTitle: '처마 아래의 빛을 따라가다',
    homeCopy: '처마 아래의 빛과 그림자를 따라, 각 구조가 밝기와 공간의 경계를 어떻게 만드는지 관찰합니다.', homeContextKicker: '빛이 공간이 되는 곳', homeContextTitle: '처마는 지붕을 완성하는 데 그치지 않습니다.', homeContextCopy: '처마의 깊이와 형태는 빛이 들어오는 방식을 조절하며, 밝음과 그늘 사이에 변화하는 경계를 그립니다.', homeGuideTitle: '두 가지 시선으로 처마를 살펴보세요.', homeGuideArchiveTitle: '아카이브', homeGuideArchiveCopy: '한옥 처마의 세부와 기록을 따라가며 살펴봅니다.', homeGuideSimulationTitle: '시뮬레이션', homeGuideSimulationCopy: '3D 뷰어에서 구조가 빛을 만드는 방식을 관찰합니다.',
    enterViewer: '3D 뷰어 보기', viewArchive: '아카이브 보기', homeSimulation: '시뮬레이션', homeArchive: '아카이브', homeSimulationCardTitle: 'VIEWER', homeSimulationCardCopy: '3D 한옥 구조를 살펴보고 빛과 그림자가 변화하는 방식을 관찰합니다.', homeArchiveCardTitle: 'ARCHIVE', homeArchiveCardCopy: '여러 장소에서 수집한 한옥 처마와 건축 세부 기록을 살펴봅니다.',
    catMinga: '민가', catSachal: '사찰', catGate: '성문/누각',
    partGidung: '기둥', partGaepan: '개판 덮개', partJuchutdol: '주춧돌', partSeokkarae: '서까래', partBuyeon: '부연', partPyeongodae: '평고대', partChunyeo: '추녀', partSarae: '사래', partGiwa: '기와', partChimannori: '처마도리',
    photoTitle: '사진', explodeSelected: '선택 그룹 분해 보기', resetExplode: '분해 원래대로', dragRotate: '드래그 하여 회전', resetView: '초기화', explodeAll: '전체 분해 보기', fullscreen: '크게 보기', natureSound: '자연음', bgmSound: 'BGM', continueArchive: '아카이브에서 계속 →',
    viewerExploreDetail: '상세히 보기', viewerReset: '초기화', viewerFull: '전체 화면', viewerExplode: '분해', viewerMorning: '아침', viewerNoon: '정오', viewerEvening: '저녁', viewerRelatedArchive: '관련 아카이브',
    archiveTitle: 'ARCHIVING', archiveRelatedStructure: '관련 구조', aboutTitle: 'ABOUT',
    aboutPlanningTitle: '기획 의도', aboutPlanningCopy1: '처마의 구조와 그 아래 머무는 빛을 따라가며, 한옥을 이루는 세부 요소와 공간의 관계를 관찰합니다.', aboutPlanningCopy2: '익숙한 건축의 모습을 구조와 빛이라는 새로운 시선으로 바라볼 수 있도록 전시의 흐름을 계획했습니다.',
    aboutCheomaTitle: '처마란 무엇인가', aboutCheomaIntro1: '처마는 지붕이 건물의 바깥으로 이어지는 부분으로, 햇빛과 비를 조절하며 내부와 외부 사이의 깊이를 만듭니다.', aboutCheomaIntro2: '구조가 겹쳐지는 방식에 따라 한옥의 인상과 빛의 방향도 달라집니다.', aboutCheomaPerspectivesTitle: '처마를 보는 두 가지 시선', aboutCheomaStructureTitle: '구조', aboutCheomaLightTitle: '빛', aboutCheomaDetail1: '처마를 구성하는 부재는 서로 맞물려 지붕의 무게를 전달하고, 건물 바깥으로 깊은 그늘을 확장합니다.', aboutCheomaDetail2: '각 부재의 위치와 간격은 처마의 곡선과 빛이 실내로 들어오는 방식을 결정합니다.',
    aboutFlowTitle: '전시 흐름', aboutFlow1Title: '구조를 선택합니다', aboutFlow1Copy: '처마를 이루는 부재를 살펴봅니다.', aboutFlow2Title: '형태를 관찰합니다', aboutFlow2Copy: '3D 모델에서 위치와 관계를 확인합니다.', aboutFlow3Title: '빛을 이해합니다', aboutFlow3Copy: '구조가 만드는 빛과 그림자를 읽습니다.', aboutFlow4Title: '기록을 남깁니다', aboutFlow4Copy: '아카이브로 경험을 이어갑니다.',
    aboutTeamTitle: '팀', aboutTeamRole1: '기획 및 디자인', aboutTeamRole2: '3D 및 개발', aboutTeamCopy1: '기획과 시각 시스템을 설계했습니다.', aboutTeamCopy2: '3D 경험과 웹 인터랙션을 구현했습니다.'
  },
  en: {
    lightTime: 'Time',
    brand: 'LOGO / SYMBOL', menuHome: 'HOME', menuViewer: 'VIEWER', menuArchive: 'ARCHIVING', menuAbout: 'ABOUT',
    homeEyebrow: 'An interactive archive for exploring light and shadow under Korean eaves', homeKicker: 'EAVES · LIGHT · SHADOW', homeTitle: 'Trace Light Beneath the Eaves',
    homeCopy: 'Follow the light and shadow beneath the eaves to observe how each structure shapes brightness and spatial boundaries.', homeContextKicker: 'WHERE LIGHT BECOMES SPACE', homeContextTitle: 'An eave does more than complete a roof.', homeContextCopy: 'Its depth and form control how light enters, drawing a changing boundary between brightness and shade.', homeGuideTitle: 'Explore the eaves in two ways.', homeGuideArchiveTitle: 'Archive', homeGuideArchiveCopy: 'Trace the details and records of Hanok eaves.', homeGuideSimulationTitle: 'Simulation', homeGuideSimulationCopy: 'Observe how structure shapes light in the 3D Viewer.',
    enterViewer: 'Open Viewer', viewArchive: 'Open Archive', homeSimulation: 'SIMULATION', homeArchive: 'ARCHIVE', homeSimulationCardTitle: 'VIEWER', homeSimulationCardCopy: 'Explore the structure of a Hanok in 3D and observe how light and shadow change.', homeArchiveCardTitle: 'ARCHIVE', homeArchiveCardCopy: 'Browse records of Hanok eaves and architectural details collected from different places.',
    catMinga: 'House', catSachal: 'Temple', catGate: 'Gate/Pavilion',
    partGidung: 'Column', partGaepan: 'Roof Boarding', partJuchutdol: 'Foundation Stone', partSeokkarae: 'Rafter', partBuyeon: 'Buyeon', partPyeongodae: 'Pyeongodae', partChunyeo: 'Chunyeo', partSarae: 'Sarae', partGiwa: 'Roof Tile', partChimannori: 'Eave Purlin',
    photoTitle: 'Photo', explodeSelected: 'Explode Group', resetExplode: 'Reset Explode', dragRotate: 'Drag to Rotate', resetView: 'Reset', explodeAll: 'Explode All', fullscreen: 'Fullscreen', natureSound: 'Nature', bgmSound: 'BGM', continueArchive: 'Continue Archive →',
    viewerExploreDetail: 'Explore detail', viewerReset: 'RESET', viewerFull: 'FULL', viewerExplode: 'EXPLODE', viewerMorning: 'MORNING', viewerNoon: 'NOON', viewerEvening: 'EVENING', viewerRelatedArchive: 'Related archive',
    archiveTitle: 'ARCHIVING', archiveRelatedStructure: 'RELATED STRUCTURE', aboutTitle: 'ABOUT',
    aboutPlanningTitle: 'Planning Intention', aboutPlanningCopy1: 'Following the structure of the eaves and the light resting beneath them, this exhibition observes the relationship between the details of hanok and the spaces they shape.', aboutPlanningCopy2: 'The exhibition is arranged to reveal familiar architecture through a new perspective on structure and light.',
    aboutCheomaTitle: 'What Are Cheoma (Eaves)?', aboutCheomaIntro1: 'Cheoma are the portions of a roof that extend beyond the building, regulating sunlight and rain while creating depth between inside and outside.', aboutCheomaIntro2: 'The way their structural members overlap changes both the character of a hanok and the direction of light.', aboutCheomaPerspectivesTitle: 'Two Ways to Read the Eaves', aboutCheomaStructureTitle: 'Structure', aboutCheomaLightTitle: 'Light', aboutCheomaDetail1: 'The members forming the eaves interlock to transfer the roof load and extend deep shade beyond the building.', aboutCheomaDetail2: 'The position and spacing of each member determine the eave curve and how light enters the interior.',
    aboutFlowTitle: 'Exhibition Flow', aboutFlow1Title: 'Select a Structure', aboutFlow1Copy: 'Explore the members that form the eaves.', aboutFlow2Title: 'Observe Its Form', aboutFlow2Copy: 'Locate each element and its relationships in the 3D model.', aboutFlow3Title: 'Understand the Light', aboutFlow3Copy: 'Read the light and shadow produced by the structure.', aboutFlow4Title: 'Keep a Record', aboutFlow4Copy: 'Continue the experience through the Archive.',
    aboutTeamTitle: 'TEAM', aboutTeamRole1: 'Planning & Design', aboutTeamRole2: '3D & Development', aboutTeamCopy1: 'Exhibition planning and visual-system design.', aboutTeamCopy2: '3D experience and web-interaction development.'
  }
};

const buildingData = {
  minga: { ko: '민가', en: 'House', descKo: '민가 처마는 생활 공간의 빛을 부드럽게 걸러내며, 실내와 마당 사이의 그림자 경계를 만든다.', descEn: 'House eaves filter light into daily living spaces and form a soft boundary between interior and courtyard.' },
  sachal: { ko: '사찰', en: 'Temple', descKo: '사찰 처마는 깊고 장식적인 구조를 통해 빛의 유입을 조절하고 공간의 위계를 만든다.', descEn: 'Temple eaves control incoming light through deeper, layered structures.' },
  gate: { ko: '성문/누각', en: 'Gate/Pavilion', descKo: '성문과 누각의 처마는 높은 시점과 넓은 개방감을 바탕으로 그림자의 방향성을 강하게 드러낸다.', descEn: 'Gate and pavilion eaves reveal strong shadow direction through larger and more open structures.' }
};

const partData = {
  gongpo: {
    ko: '공포 처마', en: 'Bracket Eaves', keywords: [],
    descKo: '용화사 모델의 1층과 2층 공포 처마 그룹을 함께 선택합니다.',
    descEn: 'Select the bracket-eave groups on both levels of the Yonghwasa model.'
  },
  // objectKeywords를 먼저 보고, 이름 정보가 없는 부재만 material keywords로 보완한다.
  gidung: {
    ko: '기둥', en: 'Column', keywords: ['나무기둥', 'column', 'pillar'], objectKeywords: ['기둥', 'gidung', 'column', 'pillar'],
    descKo: '보와 도리를 받치고 지붕 하중을 주춧돌로 전달하는 수직 목재입니다.',
    descEn: 'A vertical timber member that supports beams and purlins and transfers roof loads to the foundation stone.'
  },
  gaepan: {
    ko: '개판 덮개', en: 'Roof Boarding', keywords: [], objectKeywords: ['개판 덮개', '개판덮개', 'geapan', 'gaepan', 'roof boarding'],
    descKo: '서까래 위를 면으로 덮어 지붕 바탕을 이루는 판재 그룹입니다.',
    descEn: 'A boarding layer laid over the rafters to form a continuous roof base.'
  },
  juchutdol: {
    ko: '주춧돌', en: 'Foundation Stone', keywords: ['주춧돌', 'foundationstone', 'foundation stone'], objectKeywords: ['주춧돌', 'juchutdol'],
    descKo: '기둥 아래에서 하중을 지반으로 분산하고 목재를 지면에서 띄우는 석재 받침입니다.',
    descEn: 'A stone base that spreads column loads to the ground and separates the timber from the soil.'
  },
  giwa: {
    ko: '기와', en: 'Roof Tile', keywords: ['giwa'],
    descKo: '지붕 외피를 이루는 기와의 위치를 확인합니다. 실제 학습 정보는 오른쪽 패널에서 역할과 사례를 이어서 봅니다.',
    descEn: 'Locate the roof-tile layer, then continue to the learning panel for its role and related cases.'
  },
  seokkarae: {
    ko: '서까래', en: 'Rafter', keywords: ['rafter'],
    descKo: '지붕 골격을 이루는 서까래의 위치를 확인합니다. 처마의 깊이와 아래 공간을 함께 관찰합니다.',
    descEn: 'Locate the rafter frame and observe it together with eave depth and the space below.'
  },
  buyeon: {
    ko: '부연', en: 'Buyeon', keywords: ['wood02'],
    descKo: '서까래 끝에 덧대어 처마를 더 멀리 내미는 부연의 위치와 반복을 관찰합니다.',
    descEn: 'Observe how buyeon members extend beyond the rafters to deepen the eave.'
  },
  pyeongodae: {
    ko: '평고대', en: 'Pyeongodae', keywords: ['wood01'],
    descKo: '서까래 끝을 수평으로 연결하며 처마선을 정리하는 평고대의 위치를 확인합니다.',
    descEn: 'Locate the horizontal pyeongodae that connects rafter ends and defines the eave line.'
  },
  chunyeo: {
    ko: '추녀', en: 'Chunyeo', keywords: ['door01', 'door'],
    descKo: '지붕 모서리를 받치며 처마 곡선을 바깥으로 이끄는 추녀의 방향을 확인합니다.',
    descEn: 'Follow the chunyeo as it supports the roof corner and directs the sweeping eave line outward.'
  },
  sarae: {
    ko: '사래', en: 'Sarae', keywords: ['floor01', 'floor', 'stone01', 'stone02', 'stone02a_tile'],
    descKo: '추녀 위에 덧대어 모서리 처마를 연장하는 사래의 돌출 방향을 관찰합니다.',
    descEn: 'Observe the sarae extending over the corner rafter to project the corner eave farther outward.'
  },
  chimannori: {
    ko: '처마도리', en: 'Eave Purlin', keywords: ['whitewall', 'wall', 'concrate', 'concrete', 'ground01', 'ground'],
    descKo: '건물 외곽에서 서까래를 받치는 처마도리의 수평 위치를 확인합니다.',
    descEn: 'Locate the eave purlin running along the building perimeter beneath the rafters.'
  }
};

// Gate/Pavilion keeps the existing four UI slots, but each slot points to an
// explicit mt_castle.glb object instead of the house-part name inference.
const gatePartSlotData = Object.freeze({
  giwa: {
    ko: '취두', en: 'Chwidu',
    descKo: '지붕 용마루 끝을 장식하고 마감하는 취두 그룹입니다.',
    descEn: 'The chwidu ornament group finishing the ends of the main roof ridge.'
  },
  gaepan: {
    ko: '도리', en: 'Purlin',
    descKo: '기둥과 보 위에서 지붕 골격을 수평으로 받치는 도리 그룹입니다.',
    descEn: 'The horizontal purlin group supporting the roof frame above the posts and beams.'
  },
  seokkarae: {
    ko: '주춧돌', en: 'Cornerstone',
    descKo: '기둥 아래에서 하중을 지반으로 전달하는 주춧돌 그룹입니다.',
    descEn: 'The foundation-stone group transferring post loads into the ground.'
  },
  gidung: {
    ko: '기단', en: 'Platform',
    descKo: '건물을 지면보다 높게 받치며 상부 하중을 지반으로 전달하는 기단 그룹입니다.',
    descEn: 'The raised platform group supporting the building and distributing its loads to the ground.'
  }
});

// Each building owns its four hotspot selections and model-specific anchors.
const viewerHotspotProfiles = Object.freeze({
  minga: Object.freeze({
    giwa: Object.freeze({ percentile: .72, offsetX: 0, offsetY: -1.5 }),
    gaepan: Object.freeze({ percentile: .50, offsetX: 0, offsetY: 0 }),
    seokkarae: Object.freeze({ percentile: .28, offsetX: -1, offsetY: 0 }),
    gidung: Object.freeze({ percentile: .62, offsetX: 1, offsetY: 1 })
  }),
  sachal: Object.freeze({
    giwa: Object.freeze({ percentile: .50, offsetX: 0, offsetY: -2 }),
    gaepan: Object.freeze({ percentile: .70, offsetX: 1, offsetY: 0 }),
    seokkarae: Object.freeze({ percentile: .30, offsetX: -1, offsetY: 0 }),
    gongpo: Object.freeze({ percentile: .55, offsetX: 0, offsetY: 1 })
  }),
  gate: Object.freeze({
    giwa: Object.freeze({ percentile: .50, offsetX: -1, offsetY: -1 }),
    gaepan: Object.freeze({ percentile: .50, offsetX: 0, offsetY: 1 }),
    seokkarae: Object.freeze({ percentile: .50, offsetX: 1, offsetY: -1 }),
    gidung: Object.freeze({ percentile: .50, offsetX: 0, offsetY: 1 })
  })
});

const learningPartDataLegacy = {
  giwa: {
    summaryKo: '지붕의 외피를 이루며 처마 끝의 인상을 만드는 표면 요소.',
    summaryEn: 'The roof surface layer that shapes the visual edge of the eave.',
    roleKo: '기와는 지붕 바깥을 덮어 비와 눈이 내부 목구조로 스며드는 것을 막습니다. 암키와와 수키와를 겹쳐 물길을 만들고 빗물이 처마 밖으로 흐르도록 합니다. 흙으로 만든 지붕 바탕을 햇빛과 풍화로부터 보호합니다.',
    roleEn: 'Roof tiles cover the outer roof and keep rain and snow away from the timber structure. Concave and convex tiles overlap to form drainage channels. They also protect the earthen roof bed from sunlight and weathering.',
    detailTitleKo: '기와는 어떻게 겹칠까?', detailTitleEn: 'How are the tiles layered?',
    lightKo: '암키와는 골을 이루며 아래쪽으로 물을 흘려보냅니다. 수키와는 암키와 사이의 이음부를 덮어 빗물이 틈으로 들어가는 것을 줄입니다. 처마 끝에서는 막새가 기와 끝을 마감하기도 합니다.',
    lightEn: 'Concave tiles form channels that carry water downslope. Convex tiles cover the joints between them and reduce water penetration. Decorative end tiles may finish the exposed edge at the eave.',
    caseTitleKo: '기와의 겹침과 처마 끝선 관찰',
    caseTitleEn: 'Observing tile overlap and the eave edge',
    caseTextKo: '실제 사진에서 기와 표면만 보지 말고, 끝선이 어느 위치에서 아래 공간과 만나는지 함께 확인합니다.',
    caseTextEn: 'In the case image, compare the tile surface with the point where the eave edge meets the space below.'
  },
  seokkarae: {
    summaryKo: '지붕의 골격을 이루며 처마의 깊이와 아래 공간을 읽는 기준이 되는 목재 구조.',
    summaryEn: 'A timber frame that forms the roof skeleton and helps read eave depth and the space below.',
    roleKo: '서까래는 도리 위에 경사지게 걸쳐 지붕면의 기본 골격을 만듭니다. 지붕 바탕과 기와의 무게를 받아 아래의 도리로 전달합니다. 일정한 간격으로 반복되며 지붕의 경사와 처마 내밀기를 형성합니다.',
    roleEn: 'Rafters span diagonally across the purlins to form the basic roof plane. They support the roof bed and tiles and transfer their load to the purlins below. Their repeated length and spacing establish roof pitch and eave projection.',
    detailTitleKo: '서까래는 어떻게 놓일까?', detailTitleEn: 'How are rafters arranged?',
    lightKo: '평서까래는 지붕의 곧은 구간에 나란히 놓입니다. 모서리 가까이에서는 선자서까래가 추녀를 중심으로 부채살처럼 퍼집니다. 겹처마에서는 서까래 위에 부연을 한 단 더 설치합니다.',
    lightEn: 'Parallel rafters cover the straight roof bays. Near a corner, fan rafters spread around the chunyeo. A double eave adds a second tier of buyeon above the rafters.',
    caseTitleKo: '서까래 방향과 처마 아래 경계 관찰',
    caseTitleEn: 'Observing rafter direction and the boundary below',
    caseTextKo: '사진 속 반복되는 목재 방향, 처마 끝 위치, 마루 위의 밝은 영역을 순서대로 비교합니다.',
    caseTextEn: 'Compare the repeated timber direction, eave edge position, and the bright area on the floor in sequence.'
  },
  buyeon: {
    summaryKo: '서까래 끝에 덧대어 처마를 한 겹 더 연장하고 깊은 그늘을 만드는 목재 부재.',
    summaryEn: 'A timber extension attached beyond the rafters to deepen the eave and its shade.',
    roleKo: '부연은 겹처마에서 서까래 위에 같은 방향으로 덧대는 짧고 각진 부재입니다. 초매기 평고대를 기준으로 설치되고, 부연 끝에는 이매기 평고대를 걸어 두 번째 처마선을 만듭니다.',
    roleEn: 'In a double eave, buyeon are short squared members laid above and in the same direction as the rafters. They are set from the first pyeongodae, with a second pyeongodae fixed at their ends.',
    detailTitleKo: '홑처마와 무엇이 다를까?', detailTitleEn: 'How does it differ from a single eave?',
    lightKo: '서까래 한 단만 드러나는 구성을 홑처마라고 합니다. 서까래 위에 부연을 더한 구성은 겹처마로, 처마가 한 단 더 뻗고 하부에 두 겹의 부재가 보입니다. 부연 끝에는 이매기 평고대가 연결됩니다.',
    lightEn: 'A single eave exposes one tier of rafters. A double eave adds buyeon above them, creating another projecting tier and two visible layers below. The second pyeongodae connects the buyeon ends.',
    caseTitleKo: '처마 끝의 층위 비교',
    caseTitleEn: 'Comparing layers at the eave edge',
    caseTextKo: '민가와 사찰 사례의 처마 하부를 나란히 보며 층위와 깊이의 차이를 관찰합니다.',
    caseTextEn: 'Compare the underside of house and temple eaves to observe differences in layering and depth.'
  },
  pyeongodae: {
    summaryKo: '추녀와 추녀 사이를 연결하며 서까래 또는 부연 끝의 곡선을 잡는 길고 가는 부재.',
    summaryEn: 'A long slender member connecting the corner rafters and setting the curve at rafter or buyeon ends.',
    roleKo: '평고대는 추녀와 추녀를 연결하고 그 곡선에 맞춰 서까래를 고정하는 기준이 됩니다. 서까래 위의 평고대는 초매기, 부연 위의 평고대는 이매기라 하며 처마의 앙곡과 안허리곡을 조정합니다.',
    roleEn: 'Pyeongodae connect the corner rafters and guide the fixing of rafters along the intended curve. The first lies at rafter ends and the second at buyeon ends, helping establish the eave curvature.',
    detailTitleKo: '처마곡과 어떤 관계일까?', detailTitleEn: 'How does it shape the eave curve?',
    lightKo: '평고대는 추녀 사이를 연결하며 서까래 끝이 따라갈 기준 곡선을 만듭니다. 서까래 끝의 초매기와 부연 끝의 이매기는 각각 첫 번째와 두 번째 처마곡을 정리합니다. 설치 과정에서 곡률을 조절해 앙곡과 안허리곡을 맞춥니다.',
    lightEn: 'Pyeongodae connect the corner rafters and provide the reference curve followed by the rafter ends. The first and second members organize the rafter and buyeon edges respectively. Their curvature is adjusted to establish the vertical and plan curves of the eave.',
    caseTitleKo: '처마선과 그림자선 비교',
    caseTitleEn: 'Comparing eave and shadow lines',
    caseTextKo: '서로 다른 사례에서 처마 끝의 선과 바닥 경계선의 방향을 나란히 비교합니다.',
    caseTextEn: 'Compare the direction of the eave edge and floor boundary across different cases.'
  },
  chunyeo: {
    summaryKo: '지붕 모서리를 대각선으로 받치며 위로 들린 처마 곡선을 만드는 굵은 부재.',
    summaryEn: 'A major diagonal member supporting the roof corner and shaping its lifted eave curve.',
    roleKo: '추녀는 지붕 모퉁이에 약 45도 방향으로 거는 부재이며 지붕 공사에서 먼저 설치합니다. 추녀의 곡선과 길이는 이어서 놓이는 평고대와 서까래의 위치, 처마 곡선을 정하는 기준이 됩니다.',
    roleEn: 'Chunyeo are placed diagonally, about 45 degrees, at roof corners and are installed early in roof framing. Their curve and length guide the subsequent pyeongodae, rafters, and eave profile.',
    detailTitleKo: '모서리에서는 어떻게 놓일까?', detailTitleEn: 'How is the roof corner assembled?',
    lightKo: '추녀는 두 처마면이 만나는 모서리에 대각선으로 놓입니다. 추녀 양옆에는 선자서까래가 부채살처럼 배치되어 모서리 지붕면을 채웁니다. 추녀의 들림과 내민 길이는 처마 모서리 곡선의 기준이 됩니다.',
    lightEn: 'The chunyeo lies diagonally where two eave planes meet. Fan rafters spread on both sides to fill the corner roof plane. Its lift and projection provide a reference for the corner curve.',
    caseTitleKo: '모서리 처마의 방향 관찰',
    caseTitleEn: 'Observing corner-eave direction',
    caseTextKo: '정면과 모서리 시점을 비교하며 처마선과 아래 경계의 방향 변화를 봅니다.',
    caseTextEn: 'Compare frontal and corner viewpoints to see directional changes in the eave and boundary below.'
  },
  sarae: {
    summaryKo: '겹처마에서 추녀 위에 놓이며 평부연에 대응하는 짧은 추녀 형태의 부재.',
    summaryEn: 'A short corner-rafter-like member placed over the chunyeo in a double eave, corresponding to the buyeon.',
    roleKo: '사래는 겹처마를 만들 때 추녀 머리 위쪽에 맞대어 고정합니다. 평면부에서 부연이 서까래 위에 놓이는 것처럼 모서리에서는 사래가 추녀 위에 놓이며, 이매기 평고대의 모서리 기준이 됩니다.',
    roleEn: 'Sarae are fixed over the head of the chunyeo in a double eave. As buyeon sit above ordinary rafters, sarae sit above the corner rafter and provide the corner reference for the second pyeongodae.',
    detailTitleKo: '추녀와 무엇이 다를까?', detailTitleEn: 'How does it differ from the chunyeo?',
    lightKo: '추녀는 홑처마와 겹처마 모두에서 모서리의 기본 골격이 됩니다. 사래는 겹처마일 때만 추녀 위에 추가되며 평부의 부연과 같은 층에 놓입니다. 추녀보다 짧고 이매기 평고대가 모서리에서 이어질 자리를 만듭니다.',
    lightEn: 'The chunyeo forms the primary corner frame in both single and double eaves. Sarae are added only in a double eave, on the same tier as the buyeon. They are shorter and receive the second pyeongodae at the corner.',
    caseTitleKo: '돌출된 처마 모서리 비교',
    caseTitleEn: 'Comparing projected eave corners',
    caseTextKo: '서로 다른 건축 유형의 모서리 사진을 같은 크기로 배치해 돌출 정도를 관찰합니다.',
    caseTextEn: 'Place corner images from different building types at the same scale to compare projection.'
  },
  chimannori: {
    summaryKo: '건물 외곽에 놓여 서까래를 직접 받는 가장 바깥쪽 도리.',
    summaryEn: 'The outermost purlin running around the building and directly supporting the rafters.',
    roleKo: '처마도리는 건물 외곽에서 가로로 길게 놓이며 서까래가 걸리는 받침이 됩니다. 도리 가운데 위치가 가장 바깥쪽인 부재로, 주심도리라고도 부릅니다.',
    roleEn: 'The eave purlin runs horizontally along the building perimeter and supports the rafters above. As the outermost purlin, it is also called the jusim purlin.',
    detailTitleKo: '지붕 하중은 어디로 이어질까?', detailTitleEn: 'Where does the roof load go?',
    lightKo: '서까래가 받은 지붕 하중은 그 아래의 처마도리와 중도리, 종도리로 전달됩니다. 처마도리는 건물 외곽에서 서까래를 직접 받는 가장 바깥쪽 도리입니다. 도리는 다시 보와 기둥으로 하중을 이어 주는 지붕 가구의 수평 부재입니다.',
    lightEn: 'Roof loads carried by the rafters pass to the eave, intermediate, and ridge purlins below. The eave purlin is the outermost purlin directly supporting the rafters. Purlins continue those loads toward the beams and posts.',
    caseTitleKo: '처마도리와 처마 내밀기 비교',
    caseTitleEn: 'Comparing the eave purlin and roof projection',
    caseTextKo: '처마도리 위치에서 처마 끝까지의 거리와 그 아래 그늘의 범위를 사례별로 관찰합니다.',
    caseTextEn: 'Compare the distance from the eave purlin to the roof edge and the shaded area below across cases.'
  }
};

const learningPartData = {
  gongpo: {
    summaryKo: '용화사 두 층의 처마 아래에 반복되는 공포 부재를 함께 살펴봅니다.',
    summaryEn: 'The bracket-eave groups across both levels of the Yonghwasa model.',
    roleKo: '처마 아래에 겹쳐진 부재의 구성과 간격을 살펴봅니다. 위층과 아래층에 반복되는 형태를 함께 비교할 수 있습니다.',
    roleEn: 'Explore the arrangement and spacing of the layered members beneath the eaves. Compare the repeated forms on the upper and lower levels.',
    detailTitleKo: '두 층을 함께 살펴보기', detailTitleEn: 'Explore both levels',
    lightKo: '하나의 핫스팟으로 두 층의 같은 부위를 선택합니다. 분해도에서는 층마다 다른 높이로 펼쳐져 각 그룹의 구성을 살펴볼 수 있습니다.',
    lightEn: 'One hotspot selects the same structure on both floors. The exploded view separates each level vertically so its arrangement can be explored.',
    tmiKo: '선택한 부위는 두 층에 함께 강조되고, 나머지 구조는 옅게 표시됩니다.',
    tmiEn: 'The selected structure is emphasized on both floors, with the surrounding structure shown faintly.',
    sources: []
  },
  gidung: {
    summaryKo: '보·도리와 지붕의 하중을 주춧돌로 전달하고 한옥의 칸을 세우는 수직 목재.',
    summaryEn: 'A vertical timber member that transfers roof loads to the foundation stones and defines the structural bays.',
    roleKo: '기둥은 보와 도리를 받쳐 지붕에서 내려오는 하중을 아래의 주춧돌로 전달합니다. 기둥 사이의 간격은 한옥의 칸을 만들고 벽·문·창호가 놓일 위치의 기준이 됩니다. 기둥과 보·도리는 맞춤과 이음으로 결구되어 목구조의 기본 뼈대를 이룹니다.',
    roleEn: 'Columns support beams and purlins and transfer roof loads to the foundation stones below. Their spacing defines the structural bays and sets the locations of walls, doors, and windows. Joined to horizontal members with traditional joints, they form the primary timber frame.',
    detailTitleKo: '기둥은 어떻게 세울까?', detailTitleEn: 'How is a column erected?',
    lightKo: '기둥은 주춧돌 위에 세우고 윗부분을 보와 도리 같은 수평 부재에 결구합니다. 자연석 초석을 사용할 때는 기둥 밑동을 돌 표면의 굴곡에 맞춰 깎는 그랭이질로 접촉면을 맞춥니다.',
    lightEn: 'A column stands on a foundation stone and is joined at the top to horizontal members such as beams and purlins. With an irregular natural stone, the column base is scribed and trimmed to match the stone surface, a technique called geuraengi-jil.',
    tmiKo: '기둥은 단면에 따라 둥근기둥과 네모기둥으로 나눌 수 있습니다. 전통 목구조에서는 기둥을 땅에 직접 묻지 않고 주춧돌 위에 세웁니다. 자연석의 요철은 기둥 밑동을 돌에 맞춰 깎는 그랭이질로 받아냅니다.',
    tmiEn: 'Columns may be classified by section as round or square. In traditional timber construction, they normally stand on stones rather than being buried directly in the soil. Geuraengi-jil fits the timber base to the irregular surface of a natural stone.',
    sources: [
      { ko: '국가한옥센터, 「한옥의 시공」', en: 'National Hanok Center, “Hanok Construction”', url: 'https://www.hanokdb.kr/theology/sub_04' },
      { ko: '한국민족문화대백과, 「목조건축」', en: 'Encyclopedia of Korean Culture, “Timber Architecture”', url: 'https://encykorea.aks.ac.kr/Article/E0018689' }
    ]
  },
  gaepan: {
    summaryKo: '서까래 위를 연속된 면으로 덮어 지붕 바탕을 이루는 판재.',
    summaryEn: 'Boards laid over the rafters to form a continuous base for the roof layers above.',
    roleKo: '개판 덮개는 서까래 사이를 덮어 지붕 바탕이 놓일 연속된 면을 만듭니다. 위쪽 지붕층의 하중을 여러 서까래로 나누어 전달합니다.',
    roleEn: 'Roof boarding closes the spaces between rafters and creates a continuous surface for the roof build-up. It distributes the loads of the layers above across multiple rafters.',
    detailTitleKo: '어디에 놓일까?', detailTitleEn: 'Where is it placed?',
    lightKo: '개판 덮개는 서까래 위쪽에 이어져 지붕의 바탕면을 만듭니다. 처마 아래에서 올려다보면 반복되는 서까래의 선과 개판의 넓은 면이 겹치며 지붕 하부에 깊은 그늘을 형성합니다.',
    lightEn: 'Roof boarding extends above the rafters to form the base plane of the roof. Viewed from below the eaves, its broad surface overlaps with the repeated rafter lines and deepens the shade beneath the roof.',
    tmiKo: '서까래가 지붕의 방향과 리듬을 선으로 드러낸다면, 개판 덮개는 그 사이를 면으로 이어 줍니다. 두 요소가 함께 보이는 처마 밑에서는 한옥 지붕의 구조와 깊이를 더욱 분명하게 읽을 수 있습니다.',
    tmiEn: 'While the rafters reveal the direction and rhythm of the roof as repeated lines, the boarding connects the spaces between them as a continuous plane. Seen together beneath the eaves, they make the roof structure and its depth easier to read.',
    sources: [
      { ko: '국가한옥센터, 「한옥 용어사전」', en: 'National Hanok Center, “Glossary of Hanok”', url: 'https://www.hanokdb.kr/download/hanok_dictionary_general_table.pdf' },
      { ko: '서울한옥포털, 「한옥의 구조」', en: 'Seoul Hanok Portal, “Structure of Hanok”', url: 'https://hanok.seoul.go.kr/front/kor/info/infoHanok.do?tab=2' }
    ]
  },
  juchutdol: {
    summaryKo: '기둥의 하중을 기초와 지반으로 전달하고 목재 밑동을 땅에서 띄우는 석재 받침.',
    summaryEn: 'A stone base that transfers column loads to the foundation and keeps the timber above the ground.',
    roleKo: '주춧돌은 기둥이 받는 건물 하중을 기초와 지반으로 전달합니다. 목재 기둥을 흙바닥에서 띄워 빗물과 지면 습기에 직접 닿는 것을 줄입니다. 기둥이 설 위치를 정하고 각 기둥의 높이와 수직을 맞추는 기준이 됩니다.',
    roleEn: 'Foundation stones transfer the loads carried by columns into the foundation and ground. They lift timber posts away from soil, reducing direct contact with rainwater and ground moisture. Their placement establishes column locations and helps set column height and vertical alignment.',
    detailTitleKo: '주춧돌은 어떻게 놓을까?', detailTitleEn: 'How is a foundation stone set?',
    lightKo: '다진 기초 위의 기둥 위치에 주춧돌을 놓고 흔들리지 않게 안정시킨 뒤 기둥을 세웁니다. 자연석은 비교적 평평한 돌을 골라 쓰고, 가공초석은 윗면이나 기둥이 앉는 주좌를 다듬어 사용합니다. 기둥 밑동은 그랭이질로 돌 표면에 맞출 수 있습니다.',
    lightEn: 'A stone is stabilized at each column position on the compacted foundation before the column is erected. A relatively flat natural stone may be used as found, while a dressed stone can have its top or column seat shaped. The timber base can then be scribed to fit the stone.',
    tmiKo: '자연석을 거의 그대로 쓰는 방식을 덤벙주초라고 부릅니다. 초석 윗면에서 기둥이 앉는 자리를 주좌라고 합니다. 누각처럼 하부를 높이는 건물에는 길게 만든 장초석이 쓰이기도 합니다.',
    tmiEn: 'A minimally dressed natural foundation stone is commonly called deombeong-jucho. The seat on the stone where the column rests is called the ju-jwa. Tall elongated stones, or jangchoseok, may be used where the lower level is raised, as in pavilions.',
    sources: [
      { ko: '한국민족문화대백과, 「주추」', en: 'Encyclopedia of Korean Culture, “Foundation Stone”', url: 'https://encykorea.aks.ac.kr/Article/E0053449' },
      { ko: '국가한옥센터, 「한옥의 시공」', en: 'National Hanok Center, “Hanok Construction”', url: 'https://www.hanokdb.kr/theology/sub_04' }
    ]
  },
  seokkarae: {
    summaryKo: '도리 위에 경사지게 놓여 지붕면의 골격을 만들고 지붕 하중을 전달하는 목재.',
    summaryEn: 'A sloping timber member that forms the roof plane and transfers its loads to the purlins.',
    roleKo: '서까래는 도리 위에 경사지게 걸쳐 지붕면의 기본 골격을 만듭니다. 산자·보토와 기와의 무게를 받아 처마도리·중도리·종도리로 전달합니다. 길이와 경사는 지붕 물매와 처마 내밀기의 크기를 결정합니다.',
    roleEn: 'Rafters slope across the purlins to form the basic roof plane. They carry the roof bed and tiles and pass those loads to the eave, intermediate, and ridge purlins. Their length and angle determine roof pitch and eave projection.',
    detailTitleKo: '서까래는 어떻게 놓일까?', detailTitleEn: 'How are rafters arranged?',
    lightKo: '지붕의 곧은 구간에는 평서까래를 나란히 놓습니다. 모서리에서는 추녀 주변에 선자서까래를 부채살처럼 배치해 지붕면을 채웁니다. 서까래 위에는 산자를 엮고 보토 등 지붕 바탕을 만든 뒤 기와를 잇습니다.',
    lightEn: 'Parallel rafters cover straight roof bays. At a corner, fan rafters spread around the corner rafter to fill the roof plane. Laths are woven above the rafters, followed by the earthen roof bed and tiles.',
    tmiKo: '서까래 한 단만 쓰면 홑처마, 그 위에 부연을 덧대면 겹처마입니다. 서까래가 실내에서 그대로 드러나는 천장 형식을 연등천장이라고 합니다. 선자서까래는 지붕 모서리에서 추녀를 중심으로 방사형으로 놓입니다.',
    tmiEn: 'One rafter tier forms a single eave; adding buyeon creates a double eave. A ceiling that leaves the rafters exposed is called a yeondeung ceiling. Fan rafters radiate around the corner rafter at roof corners.',
    sources: [
      { ko: '한국민족문화대백과, 「서까래」', en: 'Encyclopedia of Korean Culture, “Rafter”', url: 'https://encykorea.aks.ac.kr/Article/E0027666' },
      { ko: '한국민족문화대백과, 「흙」', en: 'Encyclopedia of Korean Culture, “Earth”', url: 'https://encykorea.aks.ac.kr/Article/E0065934' }
    ]
  },
  giwa: {
    summaryKo: '구운 점토를 겹쳐 지붕을 덮고 빗물과 눈을 흘려보내 목구조를 보호하는 외장재.',
    summaryEn: 'Fired-clay roofing units overlapped to shed rain and snow and protect the timber structure.',
    roleKo: '기와는 지붕 바탕을 덮어 빗물과 눈의 침투를 막고 목재가 젖어 썩는 것을 줄입니다. 구운 점토의 내구성과 내수성으로 지붕 표면을 보호합니다. 기왓골을 따라 물이 처마 밖으로 빠져나가도록 배수면을 만듭니다.',
    roleEn: 'Roof tiles cover the roof bed, limiting rain and snow penetration and reducing moisture-related timber decay. Fired clay provides a durable, water-resistant outer surface. The tile channels guide water downslope and beyond the eaves.',
    detailTitleKo: '기와는 어떻게 겹칠까?', detailTitleEn: 'How are roof tiles layered?',
    lightKo: '암키와는 오목한 골을 이루며 물을 아래로 흘려보냅니다. 반원통형 수키와는 암키와 사이의 이음부를 엎어 덮어 틈으로 물이 드는 것을 줄입니다. 처마 끝에서는 암막새와 수막새가 노출된 기와 끝을 마감합니다.',
    lightEn: 'Concave tiles form channels that carry water downslope. Semi-cylindrical convex tiles cap the joints between them and reduce water penetration. At the eave, decorative end tiles finish the exposed tile ends.',
    tmiKo: '전통 기와는 점토를 성형·건조한 뒤 약 1,000℃ 안팎에서 구워 만들었습니다. 수키와 표면에는 제작할 때 두드린 격자·평행선 무늬가, 안쪽에는 천 자국이 남기도 합니다. 막새의 무늬와 명문은 제작 시기나 생산지를 추정하는 자료가 되기도 합니다.',
    tmiEn: 'Traditional tiles were shaped and dried, then fired at around 1,000°C. Convex tiles may retain stamped grid or parallel patterns outside and textile impressions inside. Designs and inscriptions on end tiles can help identify production date or place.',
    sources: [
      { ko: '한국민족문화대백과, 「기와」', en: 'Encyclopedia of Korean Culture, “Roof Tile”', url: 'https://encykorea.aks.ac.kr/Article/E0008356' },
      { ko: '한국민족문화대백과, 「수키와」', en: 'Encyclopedia of Korean Culture, “Convex Roof Tile”', url: 'https://encykorea.aks.ac.kr/Article/E0031748' },
      { ko: '한국민족문화대백과, 「암키와」', en: 'Encyclopedia of Korean Culture, “Concave Roof Tile”', url: 'https://encykorea.aks.ac.kr/Article/E0035162' }
    ]
  }
};

const gateLearningSlotData = Object.freeze({
  gaepan: {
    summaryKo: '지붕 골격을 수평으로 받치며 하중을 기둥과 보로 전달하는 부재입니다.',
    summaryEn: 'A horizontal roof member that transfers roof loads toward beams and posts.',
    roleKo: '서까래를 아래에서 받칩니다. 지붕 하중을 보와 기둥 방향으로 전달합니다.',
    roleEn: 'It supports the rafters from below. It transfers roof loads toward the beams and posts.',
    detailTitleKo: '도리는 어디에 놓일까?', detailTitleEn: 'Where is the purlin placed?',
    lightKo: '지붕 경사면 아래에서 건물 길이 방향으로 이어집니다. 여러 도리가 높이를 달리하며 지붕 골격을 지지합니다.',
    lightEn: 'It runs along the building beneath the sloping roof plane. Multiple purlins support the roof frame at different heights.',
    tmiKo: '처마 쪽의 가장 바깥 도리는 처마도리 또는 주심도리라고 부릅니다.',
    tmiEn: 'The outermost purlin at the eave is commonly called the eave or jusim purlin.',
    sources: [
      { ko: '한국민족문화대백과, 「도리」', en: 'Encyclopedia of Korean Culture, “Purlin”', url: 'https://encykorea.aks.ac.kr/Article/E0015603' },
      { ko: '서울한옥포털, 「한옥의 구조」', en: 'Seoul Hanok Portal, “Structure of Hanok”', url: 'https://hanok.seoul.go.kr/front/kor/info/infoHanok.do?tab=2' }
    ]
  },
  seokkarae: {
    summaryKo: '기둥을 지면에서 띄우고 상부 하중을 기초와 지반으로 전달하는 석재입니다.',
    summaryEn: 'A stone support that raises a post above the ground and transfers its load to the foundation.',
    roleKo: '기둥 하중을 지반으로 분산합니다. 목재 기둥이 흙과 물에 직접 닿는 것을 줄입니다.',
    roleEn: 'It distributes post loads into the ground. It reduces direct contact between timber posts, soil, and water.',
    detailTitleKo: '주춧돌은 어디에 놓일까?', detailTitleEn: 'Where is the cornerstone placed?',
    lightKo: '각 기둥 바로 아래에 놓여 기둥 위치와 건물 하부의 기준을 만듭니다.',
    lightEn: 'It sits directly beneath each post and establishes the post layout and lower datum of the building.',
    tmiKo: '자연석 윗면에 맞춰 기둥 밑동을 다듬는 방식은 그랭이질과 관련됩니다.',
    tmiEn: 'Fitting a post base to the uneven surface of a natural stone is associated with geuraengi-jil.',
    sources: [
      { ko: '한국민족문화대백과, 「주추」', en: 'Encyclopedia of Korean Culture, “Foundation Stone”', url: 'https://encykorea.aks.ac.kr/Article/E0053449' },
      { ko: '국가한옥센터, 「한옥의 시공」', en: 'National Hanok Center, “Hanok Construction”', url: 'https://www.hanokdb.kr/theology/sub_04' }
    ]
  },
  giwa: {
    summaryKo: '용마루 끝을 마감하며 지붕의 상징적 인상을 만드는 장식 부재입니다.',
    summaryEn: 'A decorative ridge-end element that finishes the roof silhouette.',
    roleKo: '용마루 끝을 시각적으로 마감합니다. 지붕 최상부의 상징성과 방향성을 강조합니다.',
    roleEn: 'It visually terminates the main ridge. It emphasizes the symbolic character and direction of the roof crest.',
    detailTitleKo: '취두는 어디에 놓일까?', detailTitleEn: 'Where is the chwidu placed?',
    lightKo: '지붕의 가장 높은 용마루 양 끝에 놓여 먼 거리에서도 지붕 윤곽을 분명하게 만듭니다.',
    lightEn: 'It is placed at the ends of the highest ridge, clarifying the roof silhouette from a distance.',
    tmiKo: '취두는 궁궐이나 성문 같은 위계가 높은 건축의 지붕에서 두드러집니다.',
    tmiEn: 'Chwidu are especially prominent on high-status roofs such as palace and gate buildings.',
    sources: [
      { ko: '한국민족문화대백과, 「용마루」', en: 'Encyclopedia of Korean Culture, “Main Roof Ridge”', url: 'https://encykorea.aks.ac.kr/Article/E0039458' },
      { ko: '국가유산청, 「종묘 정전 기와·취두·용두 상세도」', en: 'Korea Heritage Service, “Jongmyo Roof Tile and Chwidu Detail Drawing”', url: 'https://www.heritage.go.kr/heri/cul/chartImgHeritage.do?file_seq=2841546&title3d=%EB%8F%84%EB%A9%B4_%EA%B5%AD%EB%B3%B4_%EC%A2%85%EB%AC%98+%EC%A0%95%EC%A0%84_%EA%B8%B0%EC%99%80%2C+%EC%B7%A8%EB%91%90%2C+%EC%9A%A9%EB%91%90+%EC%83%81%EC%84%B8%EB%8F%84_%EC%A2%85%EB%AC%98+%EC%9D%BC%EA%B3%BD+%EC%A0%95%EB%B0%80+%EC%8B%A4%EC%B8%A1' }
    ]
  },
  gidung: {
    summaryKo: '건물을 지면보다 높게 받치고 상부 구조의 하중을 지반으로 전달하는 기반입니다.',
    summaryEn: 'A raised base supporting the building above ground and distributing structural loads.',
    roleKo: '건물의 수평 기준면을 만듭니다. 상부 구조의 하중을 넓은 면적으로 지반에 전달합니다.',
    roleEn: 'It establishes a level building datum. It spreads upper-structure loads across the ground.',
    detailTitleKo: '기단은 어떻게 구성될까?', detailTitleEn: 'How is the platform formed?',
    lightKo: '건물 하부를 둘러싼 석축과 바닥 면이 하나의 높여진 기반을 형성합니다.',
    lightEn: 'Stonework around the building and the upper floor plane form one raised base.',
    tmiKo: '기단의 높이와 폭은 배수, 접근 방식, 건물의 시각적 위계에 영향을 줍니다.',
    tmiEn: 'Platform height and width influence drainage, access, and the building’s visual hierarchy.',
    sources: [
      { ko: '한국민족문화대백과, 「가구식 기단」', en: 'Encyclopedia of Korean Culture, “Post-and-Lintel Platform”', url: 'https://encykorea.aks.ac.kr/Article/E0071906' },
      { ko: '서울한옥포털, 「한옥의 구조」', en: 'Seoul Hanok Portal, “Structure of Hanok”', url: 'https://hanok.seoul.go.kr/front/kor/info/infoHanok.do?tab=2' }
    ]
  }
});

// Keep every viewer-facing number on one canonical, top-to-bottom order.
// 01 기와 → 02 개판 → 03 서까래 → 04 기둥
const partOrder = ['giwa', 'gaepan', 'seokkarae', 'gidung'];
const viewerUiPartOrder = [...partOrder];
const viewerBuildingPartOrders = Object.freeze({
  minga: Object.freeze(['giwa', 'gaepan', 'seokkarae', 'gidung']),
  sachal: TEMPLE_PART_ORDER,
  gate: Object.freeze(['giwa', 'gaepan', 'seokkarae', 'gidung'])
});

const archiveCategoryLabel = {
  minga: { ko: '민가', en: 'House' },
  sachal: { ko: '사찰', en: 'Temple' },
  gate: { ko: '성문·누각', en: 'Gate/Pavilion' },
  hyanggyo: { ko: '향교', en: 'Confucian School' }
};

const archiveSiteLabel = {
  'cheongju-hyanggyo': { ko: '청주향교', en: 'Cheongju Hyanggyo' },
  yonghwasa: { ko: '용화사', en: 'Yonghwasa' },
  bosalsa: { ko: '보살사', en: 'Bosalsa' },
  hwajangsa: { ko: '화장사', en: 'Hwajangsa' },
  'heungdeoksa-site': { ko: '흥덕사지', en: 'Heungdeoksa Temple Site' },
  'bugang-old-house': { ko: '부강리 고가', en: 'Bugang-ri Old House' },
  'nohyeon-old-house': { ko: '노현리 고가', en: 'Nohyeon-ri Old House' },
  'munui-munsangwan': { ko: '문의 문산관', en: 'Munui Munsangwan' },
  'munui-yangban': { ko: '문의 양반 가옥 복원', en: 'Munui Yangban House' },
  sangdangsanseong: { ko: '상당산성', en: 'Sangdangsanseong' },
  'sangdangsanseong-gongnammun': { ko: '상당산성 공남문', en: 'Gongnammun Gate' },
  'sangdangsanseong-mihomun': { ko: '상당산성 미호문', en: 'Mihomun Gate' },
  'sangdangsanseong-jindongmun': { ko: '상당산성 진동문', en: 'Jindongmun Gate' }
};
const archiveSiteOrder = Object.keys(archiveSiteLabel).filter(site => site !== 'sangdangsanseong');
// Current photographed locations, including the houses relocated to Munui.
// Cheongju tourism: cjyu.cheongju.go.kr (sites 524, 743, 755, 778).
// Munui: heritage.go.kr, ccbaCpno=2113302210000. Hwajangsa: Chungbuk tourism, tourNo=551.
const archiveSiteLocations = {
  'cheongju-hyanggyo': { ko: '청주 상당구 대성동', en: 'Daeseong-dong, Sangdang-gu, Cheongju' },
  yonghwasa: { ko: '청주 서원구 사직동', en: 'Sajik-dong, Seowon-gu, Cheongju' },
  bosalsa: { ko: '청주 상당구 용암동', en: 'Yongam-dong, Sangdang-gu, Cheongju' },
  hwajangsa: { ko: '청주 상당구 명암동', en: 'Myeongam-dong, Sangdang-gu, Cheongju' },
  'heungdeoksa-site': { ko: '청주 흥덕구 운천동', en: 'Uncheon-dong, Heungdeok-gu, Cheongju' },
  'bugang-old-house': { ko: '청주 상당구 문의면', en: 'Munui-myeon, Sangdang-gu, Cheongju' },
  'nohyeon-old-house': { ko: '청주 상당구 문의면', en: 'Munui-myeon, Sangdang-gu, Cheongju' },
  'munui-munsangwan': { ko: '청주 상당구 문의면', en: 'Munui-myeon, Sangdang-gu, Cheongju' },
  'munui-yangban': { ko: '청주 상당구 문의면', en: 'Munui-myeon, Sangdang-gu, Cheongju' },
  sangdangsanseong: { ko: '청주 상당구 산성동', en: 'Sanseong-dong, Sangdang-gu, Cheongju' },
  'sangdangsanseong-gongnammun': { ko: '청주 상당구 산성동', en: 'Sanseong-dong, Sangdang-gu, Cheongju' },
  'sangdangsanseong-mihomun': { ko: '청주 상당구 산성동', en: 'Sanseong-dong, Sangdang-gu, Cheongju' },
  'sangdangsanseong-jindongmun': { ko: '청주 상당구 산성동', en: 'Sanseong-dong, Sangdang-gu, Cheongju' }
};
const archiveMunuiSites = Object.freeze([
  'munui-munsangwan',
  'bugang-old-house',
  'nohyeon-old-house',
  'munui-yangban'
]);
const archiveMetaLabel = {
  era: {
    early: { ko: '조선 전기', en: 'Early Joseon' },
    late: { ko: '조선 후기', en: 'Late Joseon' },
    modern: { ko: '근대', en: 'Modern' },
    field: { ko: '현장 기록', en: 'Field Record' }
  },
  region: {
    central: { ko: '중부', en: 'Central' },
    yeongnam: { ko: '영남', en: 'Yeongnam' },
    honam: { ko: '호남', en: 'Honam' },
    jeju: { ko: '제주', en: 'Jeju' }
  },
  part: {
    ...Object.fromEntries(Object.entries(partData).map(([key, value]) => [key, { ko: value.ko, en: value.en }])),
    overview: { ko: '건축·공간', en: 'Building & Space' }
  }
};

const archiveSeed = [
  ['ARC-001','late','central','minga','munui-yangban','gidung','shade','20260505_140059.webp'],
  ['ARC-002','late','central','minga','munui-yangban','seokkarae','shade','20260505_140107.webp'],
  ['ARC-003','late','central','minga','munui-yangban','pyeongodae','edge','20260505_140217.webp'],
  ['ARC-004','late','central','minga','bugang-old-house','gidung','shade','20260505_142912.webp'],
  ['ARC-005','late','central','minga','bugang-old-house','giwa','drainage','20260505_142919.webp'],
  ['ARC-006','late','central','minga','bugang-old-house','chimannori','edge','20260505_142953.webp'],
  ['ARC-007','late','central','minga','bugang-old-house','seokkarae','shade','20260505_143013.webp'],
  ['ARC-008','late','central','minga','bugang-old-house','chunyeo','edge','20260505_143157.webp'],
  ['ARC-009','late','central','minga','bugang-old-house','gidung','shade','20260505_143207.webp'],
  ['ARC-010','late','central','gate','munui-munsangwan','pyeongodae','edge','20260505_143518.webp'],
  ['ARC-011','late','central','gate','munui-munsangwan','chunyeo','edge','20260505_143536.webp'],
  ['ARC-012','late','central','gate','munui-munsangwan','buyeon','shade','20260505_143641.webp'],
  ['ARC-013','late','central','gate','munui-munsangwan','giwa','drainage','20260505_143831.webp'],
  ['ARC-014','late','central','minga','nohyeon-old-house','seokkarae','shade','20260505_144322.webp'],
  ['ARC-015','late','central','minga','nohyeon-old-house','gidung','shade','20260505_144539.webp']
];

const archiveFieldPhotoSets = Object.freeze([
  {
    site: 'sangdangsanseong',
    category: 'gate',
    folder: 'sangdangsanseong',
    imageVersion: '20261109-02',
    parts: ['overview','overview','overview','chunyeo','overview','overview','gongpo']
  },
  {
    site: 'yonghwasa',
    category: 'sachal',
    folder: 'yonghwasa',
    parts: ['gongpo','seokkarae','chunyeo','gongpo','giwa','chunyeo','chunyeo','seokkarae','giwa','chunyeo','gongpo','gongpo','giwa','giwa','chunyeo']
  },
  {
    site: 'cheongju-hyanggyo',
    category: 'hyanggyo',
    folder: 'cheongju-hyanggyo',
    parts: ['chunyeo','giwa','gongpo','gidung','giwa','seokkarae','giwa','giwa','seokkarae','giwa','giwa','chunyeo','giwa','giwa','chunyeo']
  },
  {
    site: 'bosalsa',
    category: 'sachal',
    folder: 'bosalsa',
    parts: [
      'overview','overview','overview','overview','overview','overview','overview',
      'chunyeo','gongpo','overview','gidung','overview','overview','seokkarae',
      'gongpo','overview','gongpo','gongpo','seokkarae','chunyeo','chunyeo',
      'overview','seokkarae','seokkarae','overview','chunyeo','overview'
    ]
  },
  {
    site: 'hwajangsa',
    category: 'sachal',
    folder: 'hwajangsa',
    year: 2024,
    parts: ['overview','overview','chunyeo','overview','overview','overview','giwa','overview','overview']
  },
  {
    site: 'heungdeoksa-site',
    category: 'sachal',
    folder: 'heungdeoksa-site',
    parts: [
      'overview','overview','overview','overview','overview','overview','overview',
      'chunyeo','overview','overview','overview','gongpo','gongpo','chunyeo',
      'overview','gongpo','gongpo','gongpo','gongpo'
    ]
  },
  // Append the expanded replacement set without changing other locations' record IDs.
  {
    site: 'sangdangsanseong',
    category: 'gate',
    folder: 'sangdangsanseong',
    imageOffset: 7,
    imageVersion: '20261109-02',
    parts: [
      'chunyeo','overview','overview','overview','overview','overview','overview',
      'overview','overview','overview','overview','overview','overview','overview',
      'overview','overview','overview','overview','overview','overview','overview',
      'overview','chunyeo','chunyeo','chunyeo','overview','chunyeo','overview',
      'overview','overview','seokkarae','giwa','overview'
    ]
  }
]);

archiveFieldPhotoSets.forEach(({ site, category, folder, parts, year = 2026, imageOffset = 0, imageVersion = '' }) => {
  parts.forEach((part, index) => {
    const recordNumber = String(archiveSeed.length + 1).padStart(3, '0');
    const imageNumber = String(index + imageOffset + 1).padStart(2, '0');
    archiveSeed.push([
      `ARC-${recordNumber}`,
      'field',
      'central',
      category,
      site,
      part,
      'field',
      `${folder}/${imageNumber}.webp${imageVersion ? `?v=${imageVersion}` : ''}`,
      year
    ]);
  });
});

// Source frame numbers follow the supplied gate ranges; keep existing IDs for retained photos.
const archiveFortressGates = Object.freeze([
  { site: 'sangdangsanseong-gongnammun', frames: [79,81,82,83,84,86] },
  { site: 'sangdangsanseong-mihomun', frames: [89,91,92,95,98,101] },
  { site: 'sangdangsanseong-jindongmun', frames: [102,103,104,107,108,109,110,112,113,114,115] }
]);
const archiveExcludedPhotos = new Set([
  'heungdeoksa-site/09.webp', // Mistakenly included statue photo.
  'yonghwasa/02.webp', // Near-repeat of the bracket/rafter underside in 01.
  'yonghwasa/07.webp', // Overlapping side-eave view; retain the clearer depth in 10.
  'yonghwasa/15.webp' // Same small-building corner as the wider view in 14.
]);
for (let index = archiveSeed.length - 1; index >= 0; index--) {
  const row = archiveSeed[index];
  // Curate after generating IDs so retained records keep their existing links.
  if (archiveExcludedPhotos.has(row[7])) {
    archiveSeed.splice(index, 1);
    continue;
  }
  if (row[4] !== 'sangdangsanseong') continue;
  const frame = 75 + Number(row[7].match(/\/(\d+)\.webp/)[1]);
  const gate = archiveFortressGates.find(gate => gate.frames.includes(frame));
  if (gate) row[4] = gate.site;
  else archiveSeed.splice(index, 1);
}

const archiveItems = archiveSeed.map((row, index) => {
  const [recordId, era, region, category, site, part, functionKey, imageFile, recordYear = 2026] = row;
  const partLabel = archiveMetaLabel.part[part];
  const siteLabel = archiveSiteLabel[site];
  const photoCopy = archivePhotoDescriptions[imageFile.split('?')[0]];
  const descKo = photoCopy?.ko || `${siteLabel.ko}의 ${partLabel.ko}와 처마 주변의 빛과 그늘을 살펴봅니다.`;
  const descEn = photoCopy?.en || `Observe the ${partLabel.en} and the light and shade around the eaves at ${siteLabel.en}.`;
  const siteRecordNumber = String(archiveSeed.slice(0, index + 1).filter((item) => item[4] === site).length).padStart(2, '0');
  return {
    id: recordId.toLowerCase(),
    recordId,
    era,
    region,
    category,
    site,
    locationKo: archiveSiteLocations[site]?.ko || '',
    locationEn: archiveSiteLocations[site]?.en || '',
    part,
    functionKey,
    recordYear,
    titleKo: `${siteLabel.ko} ${partLabel.ko} 기록 ${siteRecordNumber}`,
    titleEn: `${siteLabel.en} ${partLabel.en} Record ${siteRecordNumber}`,
    image: `url('./assets/images/archive/${imageFile}')`,
    descKo,
    descEn,
    captionKo: photoCopy?.captionKo || descKo,
    captionEn: photoCopy?.captionEn || descEn
  };
});

function archiveLabel(group, value, lang = getLang()) {
  if (group === 'building') return archiveCategoryLabel[value]?.[lang === 'ko' ? 'ko' : 'en'] || value;
  if (group === 'site') return archiveSiteLabel[value]?.[lang === 'ko' ? 'ko' : 'en'] || value;
  return archiveMetaLabel[group]?.[value]?.[lang === 'ko' ? 'ko' : 'en'] || value;
}


function getLang() { return localStorage.getItem(LANG_KEY) || 'ko'; }
function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });
  document.querySelectorAll('.lang-button').forEach((button) => button.classList.toggle('active', button.dataset.lang === lang));
  document.querySelectorAll('.lang-switch').forEach((switcher) => { switcher.dataset.activeLang = lang; });
  prepareHomeTitleLetters();
  updateDynamicText();
  window.__updateHotspotLabels?.();
  window.__refreshHomeTimeToggle?.();
}
function setupCommonUI() {
  setLang(getLang());
  document.querySelectorAll('.lang-button').forEach((button) => button.addEventListener('click', () => setLang(button.dataset.lang)));

  const menuOverlay = document.getElementById('menuOverlay');
  const menuOpen = document.querySelector('.hamburger-button');
  const menuClose = document.querySelector('.menu-close');
  if (menuOverlay && menuOpen) menuOpen.addEventListener('click', () => { menuOverlay.classList.add('active'); document.body.classList.add('lock-scroll'); });
  if (menuOverlay && menuClose) menuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', (event) => { if (event.target === menuOverlay) closeMenu(); });
  function closeMenu() { menuOverlay.classList.remove('active'); document.body.classList.remove('lock-scroll'); }
}

function findArchiveItem(value) {
  return archiveItems.find((item) => item.id === value || item.titleKo === value || item.titleEn === value) || archiveItems[0];
}

function setupArchiveModal() {
  const modal = document.getElementById('archiveModal');
  if (!modal) return;

  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const metaEl = document.getElementById('modalMeta');
  const relatedPartEl = document.getElementById('modalRelatedPart');
  const previousButton = modal.querySelector('[data-modal-prev]');
  const nextButton = modal.querySelector('[data-modal-next]');
  const imageEl = modal.querySelector('.modal-image');
  const infoEl = modal.querySelector('.modal-info');
  const closeButton = modal.querySelector('.modal-close');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  modal.classList.add('archive-modal-motion');
  modal.inert = true;
  let currentItem = archiveItems[0];
  let closeTimer = null;
  let returnFocus = null;
  let photoAnimations = [];
  let photoVersion = 0;

  function cancelPhotoMotion() {
    photoVersion++;
    photoAnimations.forEach(animation => animation.cancel());
    photoAnimations = [];
  }

  function getModalItems() {
    const visibleItems = window.__archiveModalItems;
    return Array.isArray(visibleItems) && visibleItems.length ? visibleItems : archiveItems;
  }

  function updateModalNavigation(isKo) {
    const canNavigate = getModalItems().length > 1;
    [previousButton, nextButton].forEach((button) => {
      if (button) button.hidden = !canNavigate;
    });
    previousButton?.setAttribute('aria-label', isKo ? '이전 사진' : 'Previous photo');
    nextButton?.setAttribute('aria-label', isKo ? '다음 사진' : 'Next photo');
  }

  function navigateModal(direction) {
    const items = getModalItems();
    if (items.length < 2) return;
    const currentIndex = Math.max(0, items.findIndex((item) => item.id === currentItem.id));
    openModal(items[(currentIndex + direction + items.length) % items.length], direction);
  }

  function paintModalContent(item) {
    const lang = getLang();
    const isKo = lang === 'ko';

    if (titleEl) titleEl.textContent = isKo ? item.titleKo : item.titleEn;
    if (descEl) descEl.textContent = isKo ? item.descKo : item.descEn;
    if (metaEl) {
      metaEl.innerHTML = `
        <span>${item.era === 'field' ? `${item.recordYear} · ` : ''}${archiveLabel('era', item.era, lang)}</span>
        <span>${archiveLabel('region', item.region, lang)}</span>
        <span>${archiveLabel('building', item.category, lang)}</span>
      `;
    }
    if (relatedPartEl) relatedPartEl.textContent = archiveLabel('part', item.part, lang);
    imageEl?.style.setProperty('background-image', item.image);
    imageEl?.setAttribute('aria-label', isKo ? item.titleKo : item.titleEn);
    updateModalNavigation(isKo);
  }

  function changeModalPhoto(item, direction) {
    const parts = [imageEl, infoEl].filter(Boolean);
    const starts = parts.map(part => ({ opacity: getComputedStyle(part).opacity, translate: getComputedStyle(part).translate }));
    cancelPhotoMotion();
    if (reducedMotion.matches || !parts.length || !parts[0].animate) {
      paintModalContent(item);
      return;
    }
    const version = photoVersion;
    photoAnimations = parts.map((part, index) => part.animate([
      starts[index], { opacity: 0, translate: `${-direction * 12}px 0` }
    ], { duration: 110, fill: 'forwards', easing: 'ease-out' }));
    Promise.allSettled(photoAnimations.map(animation => animation.finished)).then(() => {
      if (version !== photoVersion || !modal.classList.contains('active')) return;
      photoAnimations.forEach(animation => animation.cancel());
      paintModalContent(item);
      photoAnimations = parts.map(part => part.animate([
        { opacity: 0, translate: `${direction * 16}px 0` },
        { opacity: 1, translate: '0 0' }
      ], { duration: 240, easing: 'cubic-bezier(.22,.61,.36,1)' }));
      Promise.allSettled(photoAnimations.map(animation => animation.finished)).then(() => {
        if (version === photoVersion) photoAnimations = [];
      });
    });
  }

  function openModal(item, direction = 0) {
    if (!item) return;
    const wasOpen = modal.classList.contains('active');
    if (!wasOpen && closeTimer === null) returnFocus = document.activeElement;
    clearTimeout(closeTimer);
    closeTimer = null;
    const changedPhoto = currentItem?.id !== item.id;
    currentItem = item;
    if (wasOpen && changedPhoto && direction) changeModalPhoto(item, direction);
    else { cancelPhotoMotion(); paintModalContent(item); }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.inert = false;
    document.body.classList.add('lock-scroll');
    if (!wasOpen) closeButton?.focus({ preventScroll: true });
  }

  function finishClosing() {
    closeTimer = null;
    if (modal.classList.contains('active')) return;
    document.body.classList.remove('lock-scroll');
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }

  function closeModal() {
    if (!modal.classList.contains('active')) return;
    cancelPhotoMotion();
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    clearTimeout(closeTimer);
    if (reducedMotion.matches) finishClosing();
    else closeTimer = setTimeout(finishClosing, 220);
  }

  window.__openArchiveModal = openModal;

  document.querySelectorAll('[data-open-archive-modal]').forEach((button, index) => {
    button.addEventListener('click', () => {
      const item = button.dataset.id
        ? findArchiveItem(button.dataset.id)
        : (button.dataset.title ? findArchiveItem(button.dataset.title) : archiveItems[index % archiveItems.length]);
      openModal(item);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
  previousButton?.addEventListener('click', () => navigateModal(-1));
  nextButton?.addEventListener('click', () => navigateModal(1));

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('active')) return;
    if (['ArrowLeft', 'ArrowRight', 'Escape'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'Escape') closeModal();
      else navigateModal(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Tab') {
      const buttons = [...modal.querySelectorAll('button:not([hidden]):not(:disabled)')];
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
}

function setupArchivePage() {
  if (document.body.dataset.page !== 'archive') return;
  const gallery = setupArchiveGallery({
    items: archiveItems,
    siteLabels: archiveSiteLabel,
    siteOrder: archiveSiteOrder,
    munuiSites: archiveMunuiSites,
    getLang,
    partLabel: part => archiveLabel('part', part),
    openPhoto: item => window.__openArchiveModal?.(item)
  });
  window.__refreshArchiveGallery = () => gallery?.refreshLanguage();
}
async function setupViewer() {
  if (document.body.dataset.page !== 'viewer') return;

  const viewerLayout = document.getElementById('viewerLayout');
  const viewerStage = document.getElementById('viewerStage');
  const canvas = document.getElementById('threeCanvas');
  const viewerLoading = document.getElementById('viewerLoading');
  const viewerLoadingMessage = document.getElementById('viewerLoadingMessage');
  const viewerLoadingProgress = document.getElementById('viewerLoadingProgress');
  const viewerBuildingLoading = document.getElementById('viewerBuildingLoading');
  const viewerBuildingLoadingName = document.getElementById('viewerBuildingLoadingName');
  const viewerBuildingLoadingLabel = document.getElementById('viewerBuildingLoadingLabel');
  const sidePanel = document.getElementById('sidePanel');
  const togglePanelButton = document.getElementById('togglePanelButton');
  const statusText = document.getElementById('statusText');
  const hotspotLayer = document.getElementById('hotspotLayer');
  const partCallout = document.getElementById('partCallout');
  const partCalloutBox = document.getElementById('partCalloutBox');
  const partCalloutLine = document.getElementById('partCalloutLine');
  const partCalloutLineMaskPath = document.getElementById('partCalloutLineMaskPath');
  const partCalloutOutline = document.getElementById('partCalloutOutline');
  const natureAudio = document.getElementById('natureAudio');
  const soundMasterButton = document.getElementById('soundMasterButton');
  const viewerDefaultGuide = document.getElementById('viewerDefaultGuide');
  const learningPanel = document.getElementById('learningPanel');
  if (learningPanel) document.body.appendChild(learningPanel);
  const selectorStepper = document.getElementById('selectorStepper');
  const prevPartButton = document.getElementById('prevPartButton');
  const nextPartButton = document.getElementById('nextPartButton');
  const currentPartButton = document.getElementById('currentPartButton');
  const showAllPartsButton = document.getElementById('showAllPartsButton');
  const currentPartIndex = document.getElementById('currentPartIndex');
  const currentPartName = document.getElementById('currentPartName');
  const selectorPartCount = document.getElementById('selectorPartCount');
  const learningPanelVisibilityButton = document.getElementById('learningPanelVisibilityButton');
  const learningSummaryCard = document.getElementById('learningSummaryCard');
  const learningDetailButton = document.getElementById('learningDetailButton');
  const labelLayer = document.createElement('div');
  labelLayer.className = 'explode-label-layer';
  viewerStage?.appendChild(labelLayer);

  let THREE, OrbitControls, GLTFLoader, RoomEnvironment, MeshoptDecoder, DRACOLoader;
  let scene, camera, renderer, controls;
  let hemisphereLight = null;
  let sunLight = null;
  let fillLight = null;
  let timeOfDay = 0.08;
  let targetTimeOfDay = 0.08;
  let timeAutoplayResumeAt = performance.now() + 650;
  let lastTimeAnimationAt = performance.now();
  let isTimeControlDragging = false;
  let isTimeAutoplayPaused = false;
  let isLearningTimePaused = false;
  let model = null;
  const shouldRefreshTempleShadow = createShadowRefreshGate();

  function setActiveViewerPartOrder(buildingKey) {
    const nextOrder = viewerBuildingPartOrders[buildingKey] || viewerBuildingPartOrders.minga;
    viewerUiPartOrder.splice(0, viewerUiPartOrder.length, ...nextOrder);

    document.querySelectorAll('.part-button').forEach((button, index) => {
      button.dataset.part = nextOrder[index];
    });
    document.querySelectorAll('.hotspot').forEach((button, index) => {
      button.dataset.part = nextOrder[index];
    });
  }

  function activePartLayerIndex(partKey) {
    return Math.max(0, viewerUiPartOrder.indexOf(partKey));
  }
  let currentModelPath = null;
  let currentBuildingModelKey = null;
  let modelLoadRequestId = 0;
  let modelCenter = null;
  let modelViewBounds = null;
  let activeViewpoint = 'courtyard';
  let gateViewBounds = null;
  let modelRawCenter = null;
  let rawMaxSize = 1;
  let explodeReferenceSize = 1;
  const meshes = [];
  const baseMeshes = [];
  const gateSideMeshes = [];
  const hotspotAnchorMeshes = new Map();
  let selectedPart = null;
  let explodeState = 'none'; // none / selected / all
  let desiredCameraPosition = null;
  let desiredControlsTarget = null;
  let activeCalloutHotspot = null;
  let returnAnimationActive = false;
  const loadingStartedAt = performance.now();
  let loadingMessageShownAt = loadingStartedAt;
  let loadingMessageChangeTimer = null;
  let loadingMessageIndex = 0;
  const loadingMessages = {
    ko: ['처마 아래, 빛이 머무는 자리를 봅니다', '겹쳐진 구조 사이로 공간이 열립니다', '한옥의 깊이를 천천히 펼쳐봅니다'],
    en: ['Light settles beneath the eaves', 'Space opens between layered structures', 'The depth of hanok slowly unfolds']
  };
  const loadingMessageTimer = window.setInterval(() => {
    if (!viewerLoadingMessage || viewerLoading?.classList.contains('is-complete')) return;
    viewerLoadingMessage.classList.add('is-changing');
    loadingMessageChangeTimer = window.setTimeout(() => {
      loadingMessageIndex = (loadingMessageIndex + 1) % loadingMessages.ko.length;
      const lang = getLang() === 'ko' ? 'ko' : 'en';
      viewerLoadingMessage.textContent = loadingMessages[lang][loadingMessageIndex];
      viewerLoadingMessage.classList.remove('is-changing');
      loadingMessageShownAt = performance.now();
      loadingMessageChangeTimer = null;
    }, 300);
  }, 3600);

  function stopLoadingMessages() {
    window.clearInterval(loadingMessageTimer);
    window.clearTimeout(loadingMessageChangeTimer);
    viewerLoadingMessage?.classList.remove('is-changing');
  }

  function setLoadingProgress(value) {
    const progress = Math.max(7, Math.min(100, value));
    if (viewerLoadingProgress) viewerLoadingProgress.style.width = `${progress}%`;
    const activeDrawing = viewerBuildingLoading?.querySelector('[data-building-loading-drawing].is-active');
    const drawingLines = [...(activeDrawing?.querySelectorAll('[data-building-draw]') || [])];
    const normalizedProgress = progress / 100;
    drawingLines.forEach((line, index) => {
      const start = drawingLines.length > 1 ? index / (drawingLines.length - 1) * .48 : 0;
      const lineProgress = Math.min(1, Math.max(0, (normalizedProgress - start) / .52));
      line.style.strokeDashoffset = (1 - lineProgress).toFixed(3);
    });
  }

  function showBuildingLoading(buildingKey) {
    if (!viewerBuildingLoading) return;
    const lang = getLang();
    const data = buildingData[buildingKey] || buildingData.minga;
    if (viewerBuildingLoadingName) viewerBuildingLoadingName.textContent = lang === 'ko' ? data.ko : data.en;
    if (viewerBuildingLoadingLabel) viewerBuildingLoadingLabel.textContent = lang === 'ko'
      ? '공간을 전환하는 중'
      : 'Moving to another space';
    viewerBuildingLoading.querySelectorAll('[data-building-loading-drawing]').forEach((drawing) => {
      const isActive = drawing.dataset.buildingLoadingDrawing === buildingKey;
      drawing.classList.toggle('is-active', isActive);
      if (isActive) drawing.querySelectorAll('[data-building-draw]').forEach((line) => { line.style.strokeDashoffset = '1'; });
    });
    setLoadingProgress(7);
    viewerBuildingLoading.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => viewerBuildingLoading.classList.add('is-visible'));
  }

  function hideBuildingLoading() {
    if (!viewerBuildingLoading) return;
    viewerBuildingLoading.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!viewerBuildingLoading.classList.contains('is-visible')) viewerBuildingLoading.setAttribute('aria-hidden', 'true');
    }, 280);
  }

  function finishViewerLoading() {
    stopLoadingMessages();
    setLoadingProgress(100);
    const now = performance.now();
    const remaining = Math.max(0, 2600 - (now - loadingStartedAt), 2400 - (now - loadingMessageShownAt));
    window.setTimeout(() => viewerLoading?.classList.add('is-complete'), remaining + 180);
  }

  function setupAudioToggle(buttonId, audio, volume) {
    const button = document.getElementById(buttonId);
    if (!button || !audio) return;
    audio.volume = volume;
    let desiredOn = true;

    const syncButton = () => {
      button.classList.toggle('active', desiredOn);
      button.setAttribute('aria-pressed', String(desiredOn));
    };
    const tryPlay = async () => {
      if (!desiredOn || !audio.paused) return;
      try { await audio.play(); } catch { /* First user interaction retries playback. */ }
    };

    syncButton();
    tryPlay();
    document.addEventListener('pointerdown', tryPlay, { once: true });
    document.addEventListener('keydown', tryPlay, { once: true });

    button.addEventListener('click', async () => {
      desiredOn = !desiredOn;
      syncButton();
      if (desiredOn) {
        try {
          await audio.play();
        } catch {
          setViewerMessage(getLang() === 'ko' ? '브라우저에서 오디오 재생을 허용해주세요.' : 'Please allow audio playback in your browser.');
        }
      } else {
        audio.pause();
      }
    });
  }

  setupAudioToggle('natureAudioButton', natureAudio, .24);
  const bgmAudioButton = document.getElementById('bgmAudioButton');
  const syncBgmButtons = (isOn) => {
    bgmAudioButton?.classList.toggle('active', isOn);
    bgmAudioButton?.setAttribute('aria-pressed', String(isOn));
    soundMasterButton?.classList.toggle('active', isOn);
    soundMasterButton?.setAttribute('aria-pressed', String(isOn));
  };

  let masterSoundOn = siteBgmController?.enabled ?? true;
  syncBgmButtons(masterSoundOn);
  if (!masterSoundOn) natureAudio?.pause();
  soundMasterButton?.addEventListener('click', async () => {
    masterSoundOn = !masterSoundOn;
    syncBgmButtons(masterSoundOn);
    const hiddenAudioButtons = [
      document.getElementById('natureAudioButton'),
      document.getElementById('bgmAudioButton')
    ];
    if (natureAudio) {
      if (masterSoundOn) {
        try { await natureAudio.play(); } catch { /* Browser gesture policy can block playback. */ }
      } else {
        natureAudio.pause();
      }
    }
    await siteBgmController?.setEnabled(masterSoundOn);
    hiddenAudioButtons.forEach((button) => {
      button?.classList.toggle('active', masterSoundOn);
      button?.setAttribute('aria-pressed', String(masterSoundOn));
    });
  });

  function setViewerMessage(message) {
    if (statusText) statusText.textContent = message;
  }

  function learningValue(data, key) {
    const lang = getLang();
    return data?.[`${key}${lang === 'ko' ? 'Ko' : 'En'}`] || '';
  }

  function renderLearningBullets(list, text) {
    if (!list) return;
    const items = (String(text).match(/[^.!?。]+[.!?。]?/g) || [String(text)])
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4);
    list.replaceChildren(...items.map((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));
  }

  function syncStructureSelector(partKey) {
    if (!selectorStepper) return;

    if (!partKey || !partData[partKey]) {
      selectorStepper.hidden = true;
      return;
    }

    const index = Math.max(0, viewerUiPartOrder.indexOf(partKey));
    const number = String(index + 1).padStart(2, '0');
    const total = String(viewerUiPartOrder.length).padStart(2, '0');

    selectorStepper.hidden = false;

    if (currentPartIndex) currentPartIndex.textContent = number;
    if (currentPartName) currentPartName.textContent = getPartLabel(partKey);
    if (selectorPartCount) selectorPartCount.textContent = total;
    const partPosition = viewerUiPartOrder.indexOf(partKey);
    if (prevPartButton) {
      prevPartButton.disabled = partPosition <= 0;
      prevPartButton.setAttribute('aria-disabled', String(partPosition <= 0));
    }
    if (nextPartButton) {
      nextPartButton.disabled = partPosition >= viewerUiPartOrder.length - 1;
      nextPartButton.setAttribute('aria-disabled', String(partPosition >= viewerUiPartOrder.length - 1));
    }
  }

  function stepSelectedPart(direction) {
    if (!selectedPart) return;
    const currentIndex = Math.max(0, viewerUiPartOrder.indexOf(selectedPart));
    const nextIndex = Math.max(0, Math.min(viewerUiPartOrder.length - 1, currentIndex + direction));
    if (nextIndex === currentIndex) return;
    const nextPart = viewerUiPartOrder[nextIndex];
    updatePartLocal(nextPart, true, true);
    playPartCallout(nextPart);
  }

  function hideLearningPanelByUser() {
    if (!selectedPart || !learningPanel) return;
    viewerLayout?.classList.remove('learning-detail-open');
    setLearningTimePaused(false);
    learningPanel.setAttribute('aria-hidden', 'true');
    learningSummaryCard?.setAttribute('aria-hidden', 'false');
    learningPanelVisibilityButton?.setAttribute('aria-pressed', 'true');
    window.setTimeout(() => {
      if (renderer && camera) resizeRenderer();
    }, 320);
  }

  function showLearningPanelByUser() {
    if (!selectedPart || !learningPanel) return;
    viewerLayout?.classList.add('learning-detail-open');
    setLearningTimePaused(true);
    learningPanel.setAttribute('aria-hidden', 'false');
    learningSummaryCard?.setAttribute('aria-hidden', 'true');
    learningPanelVisibilityButton?.setAttribute('aria-pressed', 'false');
    window.setTimeout(() => {
      if (renderer && camera) resizeRenderer();
      updatePartCalloutGeometry();
    }, 320);
  }

  window.__syncViewerStructureSelector = syncStructureSelector;

  prevPartButton?.addEventListener('click', () => stepSelectedPart(-1));
  nextPartButton?.addEventListener('click', () => stepSelectedPart(1));
  learningPanelVisibilityButton?.addEventListener('click', hideLearningPanelByUser);
  learningDetailButton?.addEventListener('click', showLearningPanelByUser);

  function renderLearningPanel(partKey) {
    if (!partKey || !learningPanel) return;
    const data = getViewerLearningData(partKey);
    if (!data) return;

    const isFirstPanelOpen = !viewerLayout?.classList.contains('learning-active');

    syncStructureSelector(partKey);
    if (isFirstPanelOpen) {
      learningPanelVisibilityButton?.setAttribute('aria-pressed', 'false');
    }

    const lang = getLang();
    const isKo = lang === 'ko';
    const partIndex = Math.max(0, viewerUiPartOrder.indexOf(partKey)) + 1;
    const relatedArchiveItems = viewerArchiveRecords(archiveItems, currentBuildingModelKey, partKey, Infinity);
    const relatedItems = relatedArchiveItems.slice(0, 4);
    const compareBuildings = ['minga', 'sachal', 'gate'];
    const compareLabelsKo = {
      minga: '생활 공간과 가까운 처마',
      sachal: '층위가 풍부한 처마',
      gate: '큰 규모와 모서리 방향'
    };
    const compareLabelsEn = {
      minga: 'Eaves close to daily space',
      sachal: 'Layered eave underside',
      gate: 'Large scale and corner direction'
    };

    document.getElementById('learningPartNumber').textContent = String(partIndex).padStart(2, '0');
    document.getElementById('learningPartTitle').textContent = getPartLabel(partKey);
    document.getElementById('learningPartEn').textContent = getViewerPartData(partKey)?.en?.toUpperCase() || '';
    document.getElementById('learningSummary').textContent = learningValue(data, 'summary');
    document.getElementById('learningSummaryCardTitle').textContent = getPartLabel(partKey);
    document.getElementById('learningSummaryCardText').textContent = learningValue(data, 'summary');
    document.getElementById('learningRoleTitle').textContent = isKo ? '어떤 역할을 할까?' : 'What does it do?';
    renderLearningBullets(document.getElementById('learningRoleText'), learningValue(data, 'role'));
    renderLearningDiagrams(learningPanel, {
      building: document.querySelector('.building-tab.active')?.dataset.building || currentBuildingModelKey,
      part: partKey,
      lang
    });
    document.getElementById('learningLightTitle').textContent = learningValue(data, 'detailTitle') || (isKo ? '더 알아보기' : 'Learn more');
    renderLearningBullets(document.getElementById('learningLightText'), learningValue(data, 'light'));
    document.getElementById('learningTmiTitle').textContent = 'TMI';
    renderLearningBullets(document.getElementById('learningTmiList'), learningValue(data, 'tmi'));

    const sourcesTitle = document.getElementById('learningSourcesTitle');
    const sourcesList = document.getElementById('learningSourcesList');
    if (sourcesTitle) sourcesTitle.textContent = isKo ? '출처' : 'Sources';
    if (sourcesList) {
      sourcesList.innerHTML = (data.sources || []).map((source) => `
        <li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${isKo ? source.ko : source.en}</a></li>
      `).join('');
    }

    const compareWrap = document.getElementById('learningCompare');
    if (compareWrap) {
      compareWrap.innerHTML = compareBuildings.map((building, index) => {
        const item = viewerArchiveRecords(archiveItems, building, partKey, 1)[0];
        return `
          <button class="learning-compare-card" type="button" data-compare-record="${item.id}">
            <span class="learning-compare-image" style="background-image:${item.image}"></span>
            <em>${archiveLabel('building', building, lang)}</em>
            <b>${isKo ? compareLabelsKo[building] : compareLabelsEn[building]}</b>
          </button>
        `;
      }).join('');
      compareWrap.querySelectorAll('[data-compare-record]').forEach((button) => {
        button.addEventListener('click', () => {
          const item = findArchiveItem(button.dataset.compareRecord);
          window.__archiveModalItems = viewerArchiveRecords(archiveItems, item.category, partKey, Infinity);
          window.__openArchiveModal?.(item);
        });
      });
    }

    const relatedGrid = document.getElementById('learningRelatedGrid');
    if (relatedGrid) {
      relatedGrid.innerHTML = relatedItems.length
        ? relatedItems.map((item) => `
            <button class="learning-related-card" type="button" data-related-record="${item.id}" aria-label="${isKo ? item.titleKo : item.titleEn}">
              <span style="background-image:${item.image}"></span>
              <small>${item.recordId}</small>
            </button>
          `).join('')
        : `<p>${isKo ? '연결된 샘플 자료가 없습니다.' : 'No related sample records.'}</p>`;
      relatedGrid.querySelectorAll('[data-related-record]').forEach((button) => {
        button.addEventListener('click', () => {
          window.__archiveModalItems = relatedArchiveItems;
          window.__openArchiveModal?.(findArchiveItem(button.dataset.relatedRecord));
        });
      });
    }

    const archiveCount = relatedArchiveItems.length;
    document.getElementById('learningArchiveCount').textContent = `${String(archiveCount).padStart(2, '0')} ${isKo ? '기록' : 'RECORDS'}`;
    const archiveLink = document.getElementById('learningArchiveLink');
    if (archiveLink) {
      const query = new URLSearchParams({ category: currentBuildingModelKey, site: viewerArchiveSites[currentBuildingModelKey] });
      if (relatedArchiveItems.some(item => item.part === partKey)) query.set('part', partKey);
      archiveLink.href = `./archive.html?${query}`;
      archiveLink.firstChild.textContent = isKo ? '관련 아카이브 전체 보기 ' : 'View related archive ';
    }

    viewerLayout?.classList.add('learning-active');
    viewerDefaultGuide?.classList.add('is-hidden');
    const detailOpen = viewerLayout?.classList.contains('learning-detail-open');
    learningPanel.setAttribute('aria-hidden', detailOpen ? 'false' : 'true');
    learningSummaryCard?.setAttribute('aria-hidden', detailOpen ? 'true' : 'false');

    window.setTimeout(() => {
      resizeRenderer();
      updatePartCalloutGeometry();
    }, 560);
  }

  window.__renderLearningPanel = renderLearningPanel;

  function clearPartSelection() {
    selectedPart = null;
    document.querySelectorAll('.part-button').forEach((button) => button.classList.remove('active'));
    document.querySelectorAll('.hotspot').forEach((button) => button.classList.remove('active'));
    updatePartText(null);
    viewerLayout?.classList.remove('learning-active', 'learning-detail-open');
    setLearningTimePaused(false);
    viewerDefaultGuide?.classList.remove('is-hidden');
    learningPanel?.setAttribute('aria-hidden', 'true');
    learningSummaryCard?.setAttribute('aria-hidden', 'true');
    learningPanelVisibilityButton?.setAttribute('aria-pressed', 'false');
    syncStructureSelector(null);
    partCallout?.classList.remove('is-visible', 'is-playing');
    activeCalloutHotspot = null;
    window.setTimeout(() => resizeRenderer(), 560);
  }

  function resetViewerState() {
    explodeState = 'none';
    clearPartSelection();
    if (model) applyExplodeState({ animateReturn: true });
    applyViewpoint('courtyard');
  }

  // 이 버튼들은 3D 라이브러리 로딩 실패와 상관없이 먼저 눌리게 한다.
  function syncViewerHeaderState() {
    const hidden = sidePanel?.classList.contains('hidden');
    document.body.classList.toggle('viewer-info-open', !hidden);
    document.body.classList.toggle('viewer-info-collapsed', !!hidden);
  }

  syncViewerHeaderState();

  togglePanelButton?.addEventListener('click', () => {
    sidePanel.classList.toggle('hidden');
    viewerLayout.classList.toggle('panel-hidden');
    const hidden = sidePanel.classList.contains('hidden');
    togglePanelButton.textContent = hidden ? '›' : '‹';
    togglePanelButton.setAttribute('aria-label', hidden ? '정보 열기' : '정보 접기');
    syncViewerHeaderState();
    window.setTimeout(() => {
      if (renderer && camera) resizeRenderer();
      else window.dispatchEvent(new Event('resize'));
    }, 360);
  });

  document.getElementById('dragInfoButton')?.addEventListener('click', () => {
    setViewerMessage(getLang() === 'ko'
      ? '마우스 드래그: 회전 / 휠: 확대·축소 / 우클릭 드래그: 이동'
      : 'Mouse drag: rotate / wheel: zoom / right drag: pan');
  });

  document.getElementById('fullscreenButton')?.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await viewerStage.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      setViewerMessage('브라우저가 전체 화면 전환을 막았습니다.');
    }
    if (renderer && camera) resizeRenderer();
  });

  document.getElementById('resetCameraButton')?.addEventListener('click', () => {
    if (controls) resetViewerState();
    else setViewerMessage('3D 모델 로딩 뒤 초기화할 수 있습니다.');
  });

  document.getElementById('explodeSelectedButton')?.addEventListener('click', () => {
    if (!model) return setViewerMessage('모델 로딩 후 선택 그룹 분해 기능을 사용할 수 있습니다.');
    if (!selectedPart) return setViewerMessage('먼저 왼쪽 항목이나 핫스팟에서 그룹을 선택하세요.');
    explodeState = 'selected';
    applyExplodeState({ followCamera: true });
  });

  document.getElementById('resetExplodeButton')?.addEventListener('click', () => {
    if (!model) return setViewerMessage('모델 로딩 후 분해 상태를 초기화할 수 있습니다.');
    resetViewerState();
  });

  document.getElementById('explodeAllButton')?.addEventListener('click', () => {
    if (!model) return setViewerMessage('모델 로딩 후 전체 분해 기능을 사용할 수 있습니다.');
    explodeState = 'all';
    applyExplodeState({ followCamera: currentBuildingModelKey === 'gate' });
  });

  document.querySelectorAll('.part-button').forEach((button) => {
    button.addEventListener('click', () => {
      updatePartLocal(button.dataset.part, true, true);
      playPartCallout(button.dataset.part);
    });
  });

  document.querySelectorAll('.hotspot').forEach((button) => {
    button.addEventListener('click', () => {
      updatePartLocal(button.dataset.part, true, true);
      playPartCallout(button.dataset.part, button);
    });
  });

  function playPartCallout(partKey, sourceButton = null) {
    if (!partCallout || !partCalloutBox || !partCalloutLine || !partCalloutLineMaskPath || !partCalloutOutline || !viewerStage) return;
    const hotspot = sourceButton || document.querySelector(`.hotspot[data-part="${partKey}"]`);
    activeCalloutHotspot = hotspot;
    const data = getViewerPartData(partKey);
    const partIndex = viewerUiPartOrder.indexOf(partKey) + 1;
    document.getElementById('partCalloutNumber').textContent = String(partIndex || 1).padStart(2, '0');
    document.getElementById('partCalloutTitle').textContent = getPartLabel(partKey);
    document.getElementById('partCalloutDesc').textContent = data ? (getLang() === 'ko' ? data.descKo : data.descEn) : '';
    partCallout.classList.add('is-visible');
    partCallout.classList.remove('is-playing');

    requestAnimationFrame(() => {
      updatePartCalloutGeometry();
      void partCallout.offsetWidth;
      partCallout.classList.add('is-playing');
    });
  }

  function updatePartCalloutGeometry() {
    if (!partCallout?.classList.contains('is-visible') || !activeCalloutHotspot) return;
    const stageRect = viewerStage.getBoundingClientRect();
    const hotspotRect = activeCalloutHotspot.getBoundingClientRect();
    const startX = hotspotRect.left + hotspotRect.width / 2 - stageRect.left;
    const startY = hotspotRect.top + hotspotRect.height / 2 - stageRect.top;
    // offsetLeft/Top may be based on a different offset parent than the stage.
    // Rects keep the callout line and its box in the same viewport coordinate space.
    const boxRect = partCalloutBox.getBoundingClientRect();
    const boxX = boxRect.left - stageRect.left;
    const boxY = boxRect.top - stageRect.top;
    const boxWidth = boxRect.width;
    const boxHeight = boxRect.height;
    const endY = Math.min(boxY + boxHeight * .45, Math.max(boxY + 28, startY));
    const elbowX = startX + Math.max(28, Math.min(82, (boxX - startX) * .34));
    const elbowY = startY + (endY - startY) * .58;
    const linePath = `M ${startX} ${startY} L ${elbowX} ${elbowY} L ${boxX} ${endY}`;
    partCalloutLine.setAttribute('d', linePath);
    partCalloutLineMaskPath.setAttribute('d', linePath);
    partCalloutOutline.setAttribute('x', boxX);
    partCalloutOutline.setAttribute('y', boxY);
    partCalloutOutline.setAttribute('width', boxWidth);
    partCalloutOutline.setAttribute('height', boxHeight);
    const lineLength = partCalloutLine.getTotalLength();
    partCalloutLineMaskPath.style.strokeDasharray = `${lineLength}`;
    partCalloutLineMaskPath.style.setProperty('--line-length', lineLength);
  }

  document.querySelectorAll('.building-tab').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.building-tab').forEach((tab) => tab.classList.remove('active'));
      button.classList.add('active');
      clearPartSelection();
      hotspotLayer?.classList.add('is-switching-building');
      setActiveViewerPartOrder(button.dataset.building);
      refreshViewerPartLabels();
      updateBuildingText(button.dataset.building, true);
      if (GLTFLoader) loadBuildingModel(button.dataset.building);
    });
  });

  document.querySelector('[data-building-prev]')?.addEventListener('click', () => stepBuilding(-1));
  document.querySelector('[data-building-next]')?.addEventListener('click', () => stepBuilding(1));

  function stepBuilding(direction) {
    const tabs = [...document.querySelectorAll('.building-tab')];
    const current = tabs.findIndex((button) => button.classList.contains('active'));
    tabs[(current + direction + tabs.length) % tabs.length]?.click();
  }

  try {
    THREE = await import('three');
    ({ OrbitControls } = await import('three/addons/controls/OrbitControls.js'));
    ({ GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js'));
    ({ MeshoptDecoder } = await import('./vendor/meshopt_decoder.module.js?v=0.25.0'));
    ({ DRACOLoader } = await import('three/addons/loaders/DRACOLoader.js'));
    ({ RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js'));
  } catch (error) {
    console.error(error);
    setViewerMessage('Three.js 라이브러리를 불러오지 못했습니다. viewer.html의 importmap, 인터넷 연결, CDN 차단 여부를 확인하세요.');
    stopLoadingMessages();
    viewerLoading?.classList.add('is-error');
    if (viewerLoadingMessage) viewerLoadingMessage.textContent = getLang() === 'ko' ? '3D 라이브러리를 불러오지 못했습니다' : 'Unable to load the 3D library';
    return;
  }

  scene = new THREE.Scene();
  scene.background = null;

  camera = new THREE.PerspectiveCamera(45, viewerStage.clientWidth / viewerStage.clientHeight, 0.01, 2000);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(viewerStage.clientWidth, viewerStage.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // AgX preserves timber/tile midtones better than ACES and keeps the shaded
  // underside of the eaves from collapsing into solid black.
  renderer.toneMapping = THREE.AgXToneMapping ?? THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.93;

  // 별도의 HDR 파일 없이도 목재와 기와의 표면이 검게 뭉개지지 않도록
  // 중립적인 실내 환경광을 만든다. 배경은 기존 CSS 그라데이션을 유지한다.
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnvironment = new RoomEnvironment();
  const environmentRenderTarget = pmremGenerator.fromScene(roomEnvironment, 0.04);
  scene.environment = environmentRenderTarget.texture;
  scene.environmentIntensity = 0.62;
  roomEnvironment.dispose();
  pmremGenerator.dispose();

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.enableZoom = true;

  // Part selection/reset can briefly animate the camera to a useful view.
  // Once the visitor starts manipulating the model, their input must take
  // priority; otherwise the render loop keeps pulling the camera back toward
  // the pending animation target and makes OrbitControls feel locked.
  controls.addEventListener('start', () => {
    desiredCameraPosition = null;
    desiredControlsTarget = null;
    setViewpointState(null);
  });
  window.__hanokControls = controls;

  hemisphereLight = new THREE.HemisphereLight(0xfff8ea, 0x8d7d70, 1.9);
  scene.add(hemisphereLight);

  sunLight = new THREE.DirectionalLight(0xfff4dd, 2.25);
  sunLight.position.set(-5, 7, 4);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.bias = -0.0002;
  sunLight.shadow.normalBias = 0.025;
  scene.add(sunLight);

  // A soft, non-shadow-casting fill from the opposite side reveals interior
  // timber without flattening the main sun direction or adding a second shadow.
  fillLight = new THREE.DirectionalLight(0xffe3c8, 0.24);
  fillLight.position.set(5, 3.5, -4.5);
  fillLight.castShadow = false;
  scene.add(fillLight);

  const viewerTimeSlider = document.getElementById('viewerTimeSlider');
  const viewerTimeTrack = document.getElementById('viewerTimeTrack');
  const viewerTimeReadout = document.getElementById('viewerTimeReadout');
  const viewerTimeToggle = document.getElementById('viewerTimeToggle');
  const viewerSunPathLine = document.getElementById('viewerSunPathLine');
  const viewerSunPathTrail = document.getElementById('viewerSunPathTrail');
  const viewerSunPathTicks = document.getElementById('viewerSunPathTicks');
  const viewerSunTickElements = [];
  let viewerSunTicksKey = '';
  const viewerLightPanel = document.getElementById('viewerLightPanel');
  const today = koreanDate();
  const seasonYear = today.slice(0, 4);
  const initialMonth = Number(today.slice(5, 7));
  let artisticSeason = initialMonth >= 4 && initialMonth <= 9 ? 'summer' : 'winter';
  const seasonDate = () => `${seasonYear}-${artisticSeason === 'summer' ? '06-21' : '12-21'}`;
  let sunPath = createSunPath(seasonDate());

  function lightTimeLabel(minutes) {
    const rounded = Math.round(minutes);
    return `${String(Math.floor(rounded / 60)).padStart(2, '0')}:${String(rounded % 60).padStart(2, '0')}`;
  }

  function refreshSunPath() {
    viewerSunPathLine?.setAttribute('d', sunPath.path);
    const isKo = getLang() === 'ko';
    const events = [sunPath.sunrise, sunPath.noon, sunPath.sunset];
    const names = isKo ? ['일출', '정오', '일몰'] : ['Sunrise', 'Noon', 'Sunset'];
    viewerLightPanel.querySelectorAll('.viewer-time-phase').forEach((label, index) => {
      label.textContent = index === 1 ? '12:00' : names[index];
      const description = names[index];
      label.setAttribute('aria-label', description);
      label.title = description;
    });
    ['rise', 'noon', 'set'].forEach((key, index) => {
      viewerTimeTrack.style.setProperty(`--sun-${key}-left`, `${sunPathPoint(sunPath, events[index]).x / SUN_PATH_SIZE.width * 100}%`);
    });
    viewerTimeTrack.style.setProperty('--sun-noon-top', `${sunPathPoint(sunPath, sunPath.noon).y / SUN_PATH_SIZE.height * 100}%`);
    viewerTimeSlider?.setAttribute('aria-label', isKo ? '시간 · 일출부터 일몰' : 'Time · sunrise to sunset');
  }

  function refreshLightControls() {
    const isKo = getLang() === 'ko';
    const seasonControls = document.getElementById('viewerLightSeasons');
    seasonControls.setAttribute('aria-label', isKo ? '계절 선택' : 'Choose season');
    seasonControls.querySelectorAll('[data-light-season]').forEach((button) => {
      button.disabled = false;
      button.setAttribute('aria-pressed', String(button.dataset.lightSeason === artisticSeason));
      button.setAttribute('aria-label', button.dataset.lightSeason === 'summer'
        ? (isKo ? '여름' : 'Summer') : (isKo ? '겨울' : 'Winter'));
    });
    viewerLightPanel?.setAttribute('aria-label', isKo ? '빛 살펴보기' : 'Explore the light');
    refreshSunPath();
    updateViewerTimeUi(targetTimeOfDay);
    updateTimeToggleState();
  }
  window.__refreshViewerLightControls = refreshLightControls;

  function selectLightSeason(season) {
    const selectedMinutes = sunMinutesAtProgress(sunPath, targetTimeOfDay);
    artisticSeason = season;
    sunPath = createSunPath(seasonDate());
    // Retain the selected clock time when possible; otherwise use the nearest
    // daylight endpoint of the newly selected season.
    targetTimeOfDay = sunProgressAtMinutes(sunPath, selectedMinutes);
    setTimeAutoplayPaused(true);
    timeOfDay = targetTimeOfDay;
    refreshLightControls();
    updateTimeOfDayLighting(timeOfDay);
  }
  viewerLightPanel.querySelectorAll('[data-light-season]').forEach((button) => button.addEventListener('click', () => {
    selectLightSeason(button.dataset.lightSeason);
  }));
  const morningSunColor = new THREE.Color(0xe5f3ff);
  let groundShadowOpacity = .16;
  const noonSunColor = new THREE.Color(0xfffdf2);
  const eveningSunColor = new THREE.Color(0xd6b39c);
  const morningSkyColor = new THREE.Color(0xb9ddff);
  const noonSkyColor = new THREE.Color(0xffffff);
  const eveningSkyColor = new THREE.Color(0xa3aebd);
  const twilightSkyColor = new THREE.Color(0xa0b0c5);
  const twilightFillColor = new THREE.Color(0xd7c9bf);
  const morningGroundColor = new THREE.Color(0x8194a6);
  const eveningGroundColor = new THREE.Color(0x87766e);
  // Smoky blue above, soft taupe/cocoa below, with a restrained copper glow.
  const VIEWER_SKY_STOPS = [0, .5, .8, 1];
  const VIEWER_SKY_PALETTES = [
    { base: [185,211,232], top: [194,218,239], middle: [216,231,239], bottom: [239,242,235], glow: [163,203,235], soft: [204,225,241], shade: [131,157,180] },
    { base: [245,241,233], top: [245,241,233], middle: [238,233,224], bottom: [248,244,237], glow: [220,227,231], soft: [236,225,205], shade: [126,118,108] },
    { base: [185,173,165], top: [151,163,177], middle: [192,175,163], bottom: [210,185,165], glow: [212,166,140], soft: [206,180,162], shade: [125,134,150] },
    { base: [173,158,150], top: [136,151,170], middle: [178,157,147], bottom: [193,167,150], glow: [210,163,141], soft: [194,171,156], shade: [111,126,146] }
  ];
  const prefersReducedTimeMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TIME_AUTOPLAY_DURATION = 36000;
  const TIME_AUTOPLAY_RESUME_DELAY = 4200;

  function updateViewerTimeUi(value) {
    const progress = Math.min(1, Math.max(0, value));
    const totalMinutes = Math.round(sunMinutesAtProgress(sunPath, progress));
    const point = sunPathPoint(sunPath, totalMinutes);
    viewerTimeTrack?.style.setProperty('--sun-left', `${(point.x / SUN_PATH_SIZE.width * 100).toFixed(3)}%`);
    viewerTimeTrack?.style.setProperty('--sun-top', `${(point.y / SUN_PATH_SIZE.height * 100).toFixed(3)}%`);
    if (viewerSunPathTrail) {
      // Draw one actual arc segment. Dash normalization with a non-scaling
      // stroke can repeat the dash/gap pattern at different viewport scales.
      const first = sunPath.points[0], last = sunPath.points.at(-1);
      const cx = (first.x + last.x) / 2;
      const radius = (last.x - first.x) / 2;
      const angle = Math.min(Math.PI, Math.max(0, Math.atan2(first.y - point.y, cx - point.x)));
      const endX = cx - radius * Math.cos(angle), endY = first.y - radius * Math.sin(angle);
      viewerSunPathTrail.setAttribute('d', angle <= 0 ? ''
        : `M${first.x} ${first.y} A${radius} ${radius} 0 0 1 ${endX.toFixed(5)} ${endY.toFixed(5)}`);
    }
    const ticksKey = `${sunPath.date}:${totalMinutes}`;
    if (viewerSunPathTicks && ticksKey !== viewerSunTicksKey) {
      sunPathTicks(sunPath, totalMinutes).forEach((tick, index) => {
        if (!viewerSunTickElements[index]) {
          const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          viewerSunPathTicks.append(element);
          viewerSunTickElements[index] = element;
        }
        viewerSunTickElements[index].setAttribute('d', tick.d);
        viewerSunTickElements[index].setAttribute('opacity', tick.opacity.toFixed(3));
      });
      viewerSunTicksKey = ticksKey;
    }
    if (viewerTimeSlider && Number(viewerTimeSlider.value) !== progress) viewerTimeSlider.value = String(progress);
    if (viewerTimeReadout) {
      const timeLabel = lightTimeLabel(totalMinutes);
      viewerTimeReadout.textContent = timeLabel;
      viewerTimeSlider?.setAttribute('aria-valuetext', timeLabel);
    }

  }

  function pauseTimeAutoplay(delay = TIME_AUTOPLAY_RESUME_DELAY) {
    timeAutoplayResumeAt = performance.now() + delay;
  }

  function setLearningTimePaused(paused) {
    if (isLearningTimePaused === paused) return;
    isLearningTimePaused = paused;
    // Freeze the light currently on screen, including any pending time easing.
    if (paused) targetTimeOfDay = timeOfDay;
    if (scene) {
      updateViewerTimeUi(targetTimeOfDay);
      updateTimeToggleState();
    }
  }

  function updateTimeToggleState() {
    if (!viewerTimeToggle) return;
    const lang = getLang();
    const paused = isTimeAutoplayPaused || isLearningTimePaused;
    const label = isLearningTimePaused
      ? (lang === 'ko' ? '설명을 보는 동안 시간 일시정지' : 'Time paused while reading the description')
      : isTimeAutoplayPaused
      ? (lang === 'ko' ? '시간 자동재생' : 'Play time')
      : (lang === 'ko' ? '시간 자동재생 일시정지' : 'Pause time');
    viewerTimeToggle.disabled = isLearningTimePaused;
    viewerTimeToggle.classList.toggle('is-paused', paused);
    viewerTimeToggle.setAttribute('aria-pressed', String(paused));
    viewerTimeToggle.setAttribute('aria-label', label);
    viewerTimeToggle.title = label;
  }

  function setTimeAutoplayPaused(paused) {
    isTimeAutoplayPaused = paused;
    if (!paused) {
      if (targetTimeOfDay >= .999) {
        targetTimeOfDay = 0;
        timeOfDay = 0;
        updateViewerTimeUi(0);
        updateTimeOfDayLighting(0);
      }
      timeAutoplayResumeAt = performance.now();
    }
    updateTimeToggleState();
  }

  function timeProgressFromPointer(event) {
    if (!viewerTimeTrack) return targetTimeOfDay;
    const rect = viewerTimeTrack.getBoundingClientRect();
    const scaleX = Math.max(1, rect.width) / SUN_PATH_SIZE.width;
    const minutes = sunMinutesAtX(sunPath, (event.clientX - rect.left) / scaleX);
    return sunProgressAtMinutes(sunPath, minutes);
  }

  function updateTimeFromPointer(event) {
    targetTimeOfDay = timeProgressFromPointer(event);
    updateViewerTimeUi(targetTimeOfDay);
  }

  viewerTimeTrack?.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    isTimeControlDragging = true;
    viewerTimeTrack?.classList.add('is-dragging');
    viewerTimeTrack.setPointerCapture?.(event.pointerId);
    viewerTimeSlider?.focus({ preventScroll: true });
    timeAutoplayResumeAt = Number.POSITIVE_INFINITY;
    updateTimeFromPointer(event);
  });
  viewerTimeTrack?.addEventListener('pointermove', (event) => {
    if (!isTimeControlDragging) return;
    updateTimeFromPointer(event);
  });
  const finishTimeInteraction = () => {
    if (!isTimeControlDragging) return;
    isTimeControlDragging = false;
    viewerTimeTrack?.classList.remove('is-dragging');
    pauseTimeAutoplay();
  };
  viewerTimeTrack?.addEventListener('pointerup', finishTimeInteraction);
  viewerTimeTrack?.addEventListener('pointercancel', finishTimeInteraction);
  viewerTimeTrack?.addEventListener('lostpointercapture', finishTimeInteraction);
  viewerTimeSlider?.addEventListener('blur', finishTimeInteraction);
  window.addEventListener('pointerup', finishTimeInteraction);
  viewerTimeSlider?.addEventListener('input', () => {
    targetTimeOfDay = Math.min(1, Math.max(0, Number(viewerTimeSlider.value)));
    if (!isTimeControlDragging) pauseTimeAutoplay();
    updateViewerTimeUi(targetTimeOfDay);
  });
  viewerTimeToggle?.addEventListener('click', () => setTimeAutoplayPaused(!isTimeAutoplayPaused));
  updateViewerTimeUi(targetTimeOfDay);
  updateTimeToggleState();
  refreshLightControls();

  function updateTimeOfDayLighting(value) {
    if (!sunLight || !hemisphereLight || !fillLight) return;
    groundShadowOpacity = .16;
    const eased = value * value * (3 - 2 * value);
    const solarAngle = Math.PI * eased;
    const solarElevation = Math.sin(solarAngle);
    const phase = eased < .5 ? eased * 2 : (eased - .5) * 2;
    const morningStrength = 1 - THREE.MathUtils.smoothstep(eased, 0, .5);
    const eveningStrength = THREE.MathUtils.smoothstep(eased, .5, 1);
    const twilightStrength = THREE.MathUtils.smoothstep(eased, .8, 1);
    const sunX = Math.cos(solarAngle) * 7.5;
    const sunZ = 4.4 - solarElevation * 1.5;
    const horizontalDistance = Math.hypot(sunX, sunZ);
    const visualElevation = THREE.MathUtils.degToRad(32 + solarElevation * 38);

    sunLight.position.set(
      sunX,
      Math.tan(visualElevation) * horizontalDistance,
      sunZ
    );
    sunLight.intensity = (1.05 + solarElevation * 1.3 + morningStrength * .15 - eveningStrength * .12) * (1 - twilightStrength * .12);
    sunLight.visible = true;
    // The front faces south, independent of the model's file axes.
    const buildingSun = orientLightToBuilding(sunLight.position, currentBuildingModelKey);
    sunLight.position.set(buildingSun.x, buildingSun.y, buildingSun.z);
    if (eased < .5) {
      sunLight.color.copy(morningSunColor).lerp(noonSunColor, phase);
      hemisphereLight.color.copy(morningSkyColor).lerp(noonSkyColor, phase);
    } else {
      sunLight.color.copy(noonSunColor).lerp(eveningSunColor, phase);
      hemisphereLight.color.copy(noonSkyColor).lerp(eveningSkyColor, phase).lerp(twilightSkyColor, twilightStrength);
    }
    hemisphereLight.groundColor.copy(morningGroundColor).lerp(eveningGroundColor, eased);
    hemisphereLight.intensity = .95 + solarElevation * .55 - eveningStrength * .12 - twilightStrength * .04;
    fillLight.intensity = .18 + (1 - solarElevation) * .1 - eveningStrength * .08;
    fillLight.color.copy(morningSunColor).lerp(eveningSunColor, eased).lerp(noonSunColor, .32).lerp(twilightFillColor, twilightStrength);
    viewerStage.style.setProperty('--evening-progress', eveningStrength.toFixed(3));
    const skySegment = eased < .5 ? 0 : eased < .8 ? 1 : 2;
    const skyPhase = (eased - VIEWER_SKY_STOPS[skySegment]) / (VIEWER_SKY_STOPS[skySegment + 1] - VIEWER_SKY_STOPS[skySegment]);
    const skyProgress = skyPhase * skyPhase * (3 - 2 * skyPhase);
    const skyFrom = VIEWER_SKY_PALETTES[skySegment];
    const skyTo = VIEWER_SKY_PALETTES[skySegment + 1];
    for (const key of Object.keys(skyFrom)) {
      const rgb = skyFrom[key].map((channel, index) => Math.round(THREE.MathUtils.lerp(channel, skyTo[key][index], skyProgress)));
      viewerStage.style.setProperty(`--viewer-sky-${key}`, rgb.join(','));
    }
  }
  updateTimeOfDayLighting(timeOfDay);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.ShadowMaterial({ opacity: groundShadowOpacity })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  const groundShadow = softenGroundShadow(ground.material);
  scene.add(ground);

  function applyArchitecturalMaterialFinish(material) {
    if (!material) return;

    const name = (material.name || '').toLowerCase();
    const isTile = /giwa|tile|기와/.test(name);
    const isWood = /wood|timber|rafter|door|floor|나무|목재/.test(name);
    const isPaperOrPlaster = /koreapaper|paper|plaster|wall|흰벽|한지/.test(name);
    const isStone = /stone|concrete|concrate|주춧돌|material\.002/.test(name);

    // 한옥 재료는 비금속 표면으로 유지하고, 원본 색상과 텍스처는 건드리지 않는다.
    if ('metalness' in material) material.metalness = 0;

    if (isTile) {
      if ('roughness' in material) material.roughness = 0.72;
      if ('envMapIntensity' in material) material.envMapIntensity = 0.42;
      if ('clearcoat' in material) material.clearcoat = 0.015;
      if ('clearcoatRoughness' in material) material.clearcoatRoughness = 0.82;
    } else if (isWood) {
      if ('roughness' in material) material.roughness = 0.8;
      if ('envMapIntensity' in material) material.envMapIntensity = 0.3;
      if ('clearcoat' in material) material.clearcoat = 0;
      if ('clearcoatRoughness' in material) material.clearcoatRoughness = 1;
    } else if (isPaperOrPlaster) {
      if ('roughness' in material) material.roughness = 0.92;
      if ('envMapIntensity' in material) material.envMapIntensity = 0.12;
      if ('clearcoat' in material) material.clearcoat = 0;
    } else if (isStone) {
      if ('roughness' in material) material.roughness = 0.84;
      if ('envMapIntensity' in material) material.envMapIntensity = 0.2;
      if ('clearcoat' in material) material.clearcoat = 0;
    } else if ('envMapIntensity' in material) {
      material.envMapIntensity = 0.24;
    }

    // GLB base-color/emissive maps are authored in sRGB; data maps must remain
    // linear. Explicit assignment avoids washed-out wood or overly dark tiles.
    [material.map, material.emissiveMap].forEach((texture) => {
      if (texture && 'colorSpace' in texture) texture.colorSpace = THREE.SRGBColorSpace;
    });
    [material.normalMap, material.roughnessMap, material.metalnessMap, material.aoMap].forEach((texture) => {
      if (texture && 'colorSpace' in texture) texture.colorSpace = THREE.NoColorSpace;
    });

    const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    [material.map, material.emissiveMap, material.normalMap, material.roughnessMap, material.metalnessMap, material.aoMap].forEach((texture) => {
      if (texture) texture.anisotropy = maxAnisotropy;
    });
  }

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  // Also accept compressed GLBs exported directly from Blender. Draco's
  // decoder is fetched only when a model actually uses that extension.
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/libs/draco/gltf/');
  loader.setDRACOLoader(dracoLoader);

  function disposeMaterialResources(material, disposedTextures) {
    if (!material) return;
    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((item) => {
      Object.values(item).forEach((value) => {
        if (value?.isTexture && !disposedTextures.has(value)) {
          disposedTextures.add(value);
          value.dispose();
        }
      });
      item.dispose?.();
    });
  }

  function disposeModelResources(root) {
    if (!root) return;
    const disposedGeometries = new Set();
    const disposedTextures = new Set();
    root.traverse((child) => {
      if (!child.isMesh) return;
      if (child.geometry && !disposedGeometries.has(child.geometry)) {
        disposedGeometries.add(child.geometry);
        child.geometry.dispose();
      }
      disposeMaterialResources(child.material, disposedTextures);
      disposeMaterialResources(child.userData?.originalMaterials, disposedTextures);
    });
  }

  function loadBuildingModel(buildingKey) {
    const nextPath = MODEL_PATHS[buildingKey] || MODEL_PATHS.minga;
    const requestId = ++modelLoadRequestId;
    setActiveViewerPartOrder(buildingKey);
    if (nextPath === currentModelPath && model) {
      // Rebuild selection state when the already loaded building is selected.
      explodeState = 'none';
      returnAnimationActive = false;
      desiredCameraPosition = null;
      desiredControlsTarget = null;
      applyExplodeState();
      // 같은 성문 탭을 다시 누른 직후 재분류하더라도, 이동 중인 현재 좌표를
      // 새 원점으로 저장하지 않도록 실제 원본 위치에 먼저 확정 복귀한다.
      if (currentBuildingModelKey === 'gate') {
        [...meshes, ...gateSideMeshes].forEach((mesh) => {
          if ((!mesh.userData.isGateExplodePart && !mesh.userData.isGateSideWall) || !mesh.userData.originalPosition) return;
          mesh.position.copy(mesh.userData.originalPosition);
          mesh.userData.targetPosition = mesh.userData.originalPosition.clone();
          mesh.visible = true;
          restoreMaterial(mesh);
        });
        model.updateWorldMatrix(true, true);
      }
      clearGeneratedExplodeMeshes(model);
      currentBuildingModelKey = buildingKey;
      model.visible = true;
      if (buildingKey === 'gate') prepareGateExplodableMeshes(model);
      else prepareExplodableMeshes(model);
      prepareHotspotAnchors();
      refreshViewerPartLabels();
      updateHotspotPositions();
      hotspotLayer?.classList.remove('is-switching-building');
      canvas?.removeAttribute('aria-busy');
      hideBuildingLoading();
      return;
    }

    const previousModel = model;
    canvas?.setAttribute('aria-busy', 'true');
    if (previousModel) showBuildingLoading(buildingKey);
    setLoadingProgress(7);
    setViewerMessage(getLang() === 'ko'
      ? `${buildingData[buildingKey]?.ko || '건축'} 모델을 불러오는 중입니다.`
      : `Loading the ${buildingData[buildingKey]?.en || 'building'} model.`);

    loader.load(nextPath, (gltf) => {
      if (requestId !== modelLoadRequestId) {
        disposeModelResources(gltf.scene);
        return;
      }

      clearPartSelection();
      explodeState = 'none';
      desiredCameraPosition = null;
      desiredControlsTarget = null;
      returnAnimationActive = false;
      hotspotAnchorMeshes.clear();

      if (previousModel) {
        scene.remove(previousModel);
        disposeModelResources(previousModel);
      }

      model = gltf.scene;
      currentModelPath = nextPath;
      currentBuildingModelKey = buildingKey;

      // Blender에서 뒤집힌 면이나 얇은 단면이 포함된 경우에도 각도에 따라
      // 검게 사라지지 않도록, 불러온 GLB 재질을 Viewer에서 양면 렌더링한다.
      // 원래 색상·텍스처·투명도 값은 유지한다.
      model.traverse((child) => {
        if (!child.isMesh || !child.material) return;
        const loadedMaterials = Array.isArray(child.material) ? child.material : [child.material];
        loadedMaterials.forEach((material) => {
          applyArchitecturalMaterialFinish(material);
          material.side = THREE.DoubleSide;
          material.shadowSide = THREE.DoubleSide;
          material.needsUpdate = true;
        });
      });

      scene.add(model);
      if (buildingKey === 'gate') {
        prepareGateExplodableMeshes(model);
      } else {
        prepareExplodableMeshes(model);
      }
      fitModelToView(model);
      prepareHotspotAnchors();
      refreshViewerPartLabels();
      updateHotspotPositions();
      hotspotLayer?.classList.remove('is-switching-building');

      window.__hanokModelReady = true;
      const requestedPart = new URLSearchParams(window.location.search).get('part');
      if (buildingKey !== 'gate' && requestedPart && viewerUiPartOrder.includes(requestedPart)) {
        updatePartLocal(requestedPart, true, true);
        playPartCallout(requestedPart);
      }

      canvas?.removeAttribute('aria-busy');
      hideBuildingLoading();
      setViewerMessage(getLang() === 'ko'
        ? `${buildingData[buildingKey]?.ko || '건축'} 3D 모델이 준비되었습니다.`
        : `The ${buildingData[buildingKey]?.en || 'building'} 3D model is ready.`);
      finishViewerLoading();
    }, (progress) => {
      if (requestId !== modelLoadRequestId) return;
      if (progress.total) {
        const mbLoaded = (progress.loaded / 1024 / 1024).toFixed(1);
        const mbTotal = (progress.total / 1024 / 1024).toFixed(1);
        setViewerMessage(`GLB 로딩 중... ${Math.round(progress.loaded / progress.total * 100)}% (${mbLoaded}MB / ${mbTotal}MB)`);
        setLoadingProgress(progress.loaded / progress.total * 100);
      } else {
        setViewerMessage('GLB 로딩 중... 파일 용량이 크면 첫 로딩에 시간이 오래 걸릴 수 있습니다.');
        setLoadingProgress(22);
      }
    }, (error) => {
      if (requestId !== modelLoadRequestId) return;
      console.error(error);
      if (previousModel) previousModel.visible = true;
      hotspotLayer?.classList.remove('is-switching-building');
      canvas?.removeAttribute('aria-busy');
      hideBuildingLoading();
      setViewerMessage(`3D 모델을 불러오지 못했습니다. ${nextPath} 경로와 Live Server 실행 여부를 확인하세요.`);
      if (!previousModel) {
        stopLoadingMessages();
        viewerLoading?.classList.add('is-error');
        if (viewerLoadingMessage) viewerLoadingMessage.textContent = getLang() === 'ko' ? '3D 모델을 불러오지 못했습니다' : 'Unable to load the 3D model';
      }
    });
  }

  const initialBuildingKey = document.querySelector('.building-tab.active')?.dataset.building || 'minga';
  setActiveViewerPartOrder(initialBuildingKey);
  loadBuildingModel(initialBuildingKey);

  function cloneMaterial(material) {
    return Array.isArray(material) ? material.map((item) => item.clone()) : material.clone();
  }

  function clearGeneratedExplodeMeshes(root) {
    if (!root) return;
    const generated = [];
    root.traverse((child) => {
      if (!child.isMesh) return;
      if (
        (child.name || '').includes('__explode_') ||
        (child.name || '').includes('__roof_slice_') ||
        (child.name || '').includes('__gate_explode_')
      ) {
        generated.push(child);
      }
    });
    generated.forEach((mesh) => {
      mesh.parent?.remove(mesh);
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => material?.dispose?.());
    });
    meshes.length = 0;
    baseMeshes.length = 0;
    gateSideMeshes.length = 0;
    hotspotAnchorMeshes.clear();
  }

  function getMaterialName(material) {
    return Array.isArray(material)
      ? material.map((item) => item?.name || '').join(' ')
      : (material?.name || '');
  }

  function restoreMaterial(mesh) {
    if (!mesh.userData.originalMaterials) return;
    mesh.material = cloneMaterial(mesh.userData.originalMaterials);
  }

  function makeHighlightMaterial(material) {
    if (Array.isArray(material)) return material.map((item) => makeHighlightMaterial(item));
    // Selection is communicated by the hotspot/callout UI. Tinting a complete
    // architectural mesh changes dark roof tiles into a red-brown slab, so the
    // selected part keeps its authored GLB material unchanged.
    return material.clone();
  }

  function makeBaseGhostMaterial(material, opacity = .16) {
    if (Array.isArray(material)) return material.map((item) => makeBaseGhostMaterial(item, opacity));
    const clone = material.clone();
    clone.transparent = true;
    clone.opacity = opacity;
    clone.depthWrite = false;
    if ('color' in clone) clone.color = clone.color.clone().lerp(new THREE.Color(0xffffff), .44);
    return clone;
  }

  function makeContextMaterial(material, opacity = .13, wash = .58) {
    if (Array.isArray(material)) return material.map((item) => makeContextMaterial(item, opacity, wash));
    const clone = material.clone();
    clone.transparent = true;
    clone.opacity = opacity;
    clone.depthWrite = false;
    if ('color' in clone) clone.color = clone.color.clone().lerp(new THREE.Color(0xffffff), wash);
    return clone;
  }

  function prepareExplodableMeshes(root) {
    meshes.length = 0;
    baseMeshes.length = 0;
    gateSideMeshes.length = 0;

    // 원본 한옥은 기준 모델로 남기고, 오브젝트 경로로 판별한 부재의 material group을
    // 복제해 분해도로 정렬한다. 같은 재질을 공유해도 부모/오브젝트 이름으로 분리된다.
    const rawCenters = [];

    // Snapshot originals before adding clones to their parents.
    const sourceMeshes = [];
    root.traverse((child) => { if (child.isMesh) sourceMeshes.push(child); });
    sourceMeshes.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      child.userData.originalPosition = child.position.clone();
      child.userData.targetPosition = child.position.clone();
      child.userData.originalMaterials = cloneMaterial(child.material);
      child.userData.materialName = getMaterialName(child.material).toLowerCase();
      baseMeshes.push(child);

      const geometry = child.geometry;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      const groups = geometry.groups?.length
        ? geometry.groups
        : [{ start: 0, count: geometry.index ? geometry.index.count : geometry.attributes.position.count, materialIndex: 0 }];

      groups.forEach((group, groupIndex) => {
        const material = materials[group.materialIndex ?? groupIndex] || materials[0];
        const materialName = (material?.name || '').toLowerCase();
        const partKey = detectScenePartKey(child, materialName);

        // 오브젝트 경로나 material 키워드와 맞는 group만 exploded clone으로 만든다.
        if (!partKey) return;

        const subGeometry = new THREE.BufferGeometry();
        if (geometry.index) subGeometry.setIndex(geometry.index);
        Object.keys(geometry.attributes).forEach((name) => {
          subGeometry.setAttribute(name, geometry.attributes[name]);
        });
        subGeometry.setDrawRange(group.start, group.count);
        subGeometry.boundingBox = geometry.boundingBox;
        subGeometry.boundingSphere = geometry.boundingSphere;

        const clone = new THREE.Mesh(subGeometry, material.clone());
        clone.name = `${child.name || 'mesh'}__explode_${partKey}_${material.name || groupIndex}`;
        clone.position.copy(child.position);
        clone.rotation.copy(child.rotation);
        clone.scale.copy(child.scale);
        clone.visible = false;
        clone.castShadow = true;
        clone.receiveShadow = true;
        clone.userData.originalPosition = clone.position.clone();
        clone.userData.targetPosition = clone.position.clone();
        clone.userData.originalMaterials = material.clone();
        clone.userData.materialName = materialName;
        clone.userData.localCenter = computeGroupCenter(geometry, group);
        clone.userData.assignedPart = partKey;
        if (currentBuildingModelKey === 'sachal') {
          clone.userData.templeFloor = findTempleGroup(child, root)?.floor;
        }
        clone.userData.stackIndex = activePartLayerIndex(partKey);
        clone.userData.stackTotal = viewerUiPartOrder.length;

        rawCenters.push(clone.userData.localCenter.clone());
        child.parent.add(clone);
        meshes.push(clone);
      });
    });

    if (!meshes.length && currentBuildingModelKey !== 'sachal') {
      // 안전장치: material group을 못 찾으면, 전체 모델 대신 상단 geometry만 복제해서 사용한다.
      baseMeshes.forEach((mesh) => {
        const fallback = createRoofSliceMeshes(mesh, viewerUiPartOrder.length);
        fallback.forEach((partMesh) => {
          rawCenters.push(partMesh.userData.localCenter.clone());
          mesh.parent.add(partMesh);
          meshes.push(partMesh);
        });
      });
    }

    modelRawCenter = averageVectors(rawCenters);
    const rawBox = new THREE.Box3().setFromObject(root);
    const rawSize = rawBox.getSize(new THREE.Vector3());
    rawMaxSize = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
    if (currentBuildingModelKey === 'sachal') {
      // A repeated temple-tab click rebuilds clones after fitModelToView has
      // scaled the root. Keep offsets in original model units on both paths.
      const rootScale = Math.abs(root.getWorldScale(new THREE.Vector3()).y) || 1;
      rawMaxSize /= rootScale;
      explodeReferenceSize = rawSize.y / rootScale || rawMaxSize;
    } else {
      explodeReferenceSize = rawMaxSize;
    }

    // GLB 안에서는 한 부위가 여러 mesh로 나뉘어 있어도 하나의 건축 층이다.
    // 같은 부위의 mesh를 개별 순번으로 벌리면 조각마다 흩어지므로 항상 동일한
    // 오프셋을 공유하게 한다.
    meshes.forEach((mesh) => {
      mesh.userData.groupSpreadIndex = 0;
    });

    meshes.forEach((mesh) => {
      const index = activePartLayerIndex(mesh.userData.assignedPart);
      // GLB 내부의 부모 회전과 관계없이 월드 Y축으로만 분해한다.
      mesh.userData.explodeDirection = new THREE.Vector3(0, 1, 0);
      mesh.userData.stackIndex = index;
    });
  }

  function prepareGateExplodableMeshes(root) {
    meshes.length = 0;
    baseMeshes.length = 0;
    gateSideMeshes.length = 0;
    hotspotAnchorMeshes.clear();

    // mt_castle.glb의 아래 4개 이름은 Mesh가 아니라 여러 material primitive를
    // 감싸는 부모 Group이다. GLTFLoader가 만든 Scene024 등의 자식 Mesh를
    // 부모 경로로 묶어 실제 원본 Mesh들을 직접 이동시킨다. 성벽과 난간은
    // 고정된 architectural context로 남는다.
    // 사용자가 지정한 네 GLB Group을 그대로 네 개의 독립 분해 그룹으로 쓴다.
    // partKey는 기존 01~04 UI 슬롯과 연결하기 위한 키일 뿐, 노드의 실제
    // 건축 부재 명칭을 코드가 추정한다는 의미가 아니다.
    // UI 번호는 화면에서 보이는 수직 순서(위→아래)를 따른다.
    const gateObjectAssignments = [
      ['giwa', 'sm_chwidu01b_1'],
      ['gaepan', 'sm_purlin02g'],
      ['seokkarae', 'sm_cornerstone01c_9'],
      ['gidung', 'sm_gidan01c']
    ];
    const rawCenters = [];
    const sourceMeshes = [];
    root.updateWorldMatrix(true, true);
    root.traverse((child) => {
      if (child.isMesh) sourceMeshes.push(child);
    });

    sourceMeshes.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      child.userData.originalPosition = child.position.clone();
      child.userData.targetPosition = child.position.clone();
      child.userData.originalMaterials = cloneMaterial(child.material);
      child.userData.materialName = getMaterialName(child.material).toLowerCase();

      // 실제 Mesh 이름(Scene024 등)이 아니라 부모 Group까지 포함한 전체
      // object path에서 지정된 Group 이름을 찾는다.
      const objectPath = getObjectPathText(child);
      const assignment = gateObjectAssignments.find(([, expectedName]) => objectPath.includes(expectedName));
      if (!assignment) {
        const isSideWall = objectPath.includes('sm_battlement03a_1')
          || objectPath.includes('sm_stone_barrier01a_1');
        child.userData.isGateSideWall = isSideWall;
        child.userData.isGateTransparentContext = /battlement|stone_barrier|castle_door|dark_gate/.test(child.userData.materialName);
        if (isSideWall) gateSideMeshes.push(child);
        baseMeshes.push(child);
        return;
      }

      const [partKey] = assignment;
      child.userData.localCenter = computeMeshCenter(child);
      child.userData.assignedPart = partKey;
      child.userData.stackIndex = activePartLayerIndex(partKey);
      child.userData.stackTotal = gateObjectAssignments.length;
      child.userData.groupSpreadIndex = 0;
      child.userData.explodeDirection = new THREE.Vector3(0, 1, 0);
      child.userData.isGateExplodePart = true;
      child.userData.isGateTransparentContext = /battlement|stone_barrier|castle_door|dark_gate/.test(child.userData.materialName);
      child.visible = true;

      rawCenters.push(child.userData.localCenter.clone());
      meshes.push(child);
    });

    const matchedGateParts = new Set(meshes.map((mesh) => mesh.userData.assignedPart));
    const missingGateGroups = gateObjectAssignments
      .filter(([partKey]) => !matchedGateParts.has(partKey))
      .map(([, expectedName]) => expectedName);
    if (missingGateGroups.length) {
      console.warn('[Viewer] Gate explode groups not found:', missingGateGroups.join(', '));
    }

    // 기단 좌우의 성벽/난간은 핫스팟 파트로 등록하지 않는다. 각 원본의
    // 실제 월드 중심을 기준으로 좌우 방향만 기록해 Explode 때 바깥으로 연다.
    const gateRootCenter = new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
    gateSideMeshes.forEach((mesh) => {
      const sideCenter = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
      mesh.userData.gateSideDirection = sideCenter.x < gateRootCenter.x ? -1 : 1;
    });

    modelRawCenter = rawCenters.length
      ? averageVectors(rawCenters)
      : new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
    root.updateWorldMatrix(true, true);
    const rawBox = new THREE.Box3().setFromObject(root);
    const rawSize = rawBox.getSize(new THREE.Vector3());
    // prepareGateExplodableMeshes는 최초 로드 전(scale=1)에도, 이미 화면에
    // 맞춰 축소된 모델을 다시 선택했을 때도 호출된다. 화면에 맞춘 scale이
    // 들어간 Box3 값을 다시 모델 원본 단위로 환산해야 두 경우의 분해 거리가
    // 동일하다. 그렇지 않으면 재선택 때 scale이 두 번 적용되어 거의 안 벌어진다.
    const rootWorldScaleY = Math.abs(root.getWorldScale(new THREE.Vector3()).y) || 1;
    rawMaxSize = (Math.max(rawSize.x, rawSize.y, rawSize.z) || 1) / rootWorldScaleY;
    explodeReferenceSize = Math.max((rawSize.y || 0) / rootWorldScaleY, 1);
    gateSideMeshes.forEach((mesh) => {
      mesh.userData.gateSideOffset = Math.max(explodeReferenceSize * .22, 2);
    });

    // 각 원본 그룹의 실제 높이를 이용해 아래에서 위로 쌓는다. 이 방식은
    // 이름별 임의 비율로 큰 복합 mesh를 밀어 올리던 기존 문제를 없애고,
    // 인접 그룹의 bounding box가 일정 간격을 두고 만나도록 보장한다.
    // 네 원본 덩어리의 경계가 화면에서 다시 맞닿아 보이지 않을 만큼
    // 분명한 간격을 둔다. 모델 높이에 비례하되 작은 모델에서도 최소
    // 간격을 보장해 Explode 버튼의 결과가 즉시 읽히게 한다.
    const stackGap = Math.max(explodeReferenceSize * .14, 1.2);
    const stackGapWorld = stackGap * rootWorldScaleY;
    // UI 명칭 순서로 모델 덩어리를 재배열하지 않는다. 네 노드의 실제
    // assembled 상태 높이를 측정한 뒤 그 순서를 유지한 채 간격만 벌린다.
    const measuredGateGroups = gateObjectAssignments.map(([partKey]) => {
      const partMeshes = meshes.filter((mesh) => mesh.userData.assignedPart === partKey);
      if (!partMeshes.length) return null;

      const partBox = new THREE.Box3();
      partMeshes.forEach((mesh) => partBox.union(new THREE.Box3().setFromObject(mesh)));
      return { partKey, partMeshes, partBox };
    }).filter(Boolean).sort((a, b) => a.partBox.getCenter(new THREE.Vector3()).y - b.partBox.getCenter(new THREE.Vector3()).y);

    let nextMinY = null;
    measuredGateGroups.forEach(({ partMeshes, partBox }) => {
      const offsetWorld = nextMinY == null ? 0 : Math.max(0, nextMinY - partBox.min.y);
      const offset = offsetWorld / rootWorldScaleY;
      partMeshes.forEach((mesh) => {
        mesh.userData.gateExplodeOffset = offset;
      });
      nextMinY = partBox.max.y + offsetWorld + stackGapWorld;
    });
  }

  function detectMaterialPartKey(materialName) {
    const name = (materialName || '').toLowerCase();
    return viewerUiPartOrder.find((partKey) => {
      return partData[partKey]?.keywords?.some((keyword) => name.includes(keyword.toLowerCase()));
    }) || null;
  }

  function getObjectPathText(object) {
    const names = [];
    let current = object;
    while (current && current !== model) {
      if (current.name) names.push(current.name);
      current = current.parent;
    }
    return names.join(' ').toLowerCase();
  }

  function detectScenePartKey(object, materialName) {
    // Temple nulls are authoritative; shared materials and the context group
    // must never pull unrelated members into the selected structure.
    if (currentBuildingModelKey === 'sachal') return findTempleGroup(object, model)?.partKey || null;
    const objectPath = getObjectPathText(object);
    const explicitPart = viewerUiPartOrder.find((partKey) => {
      return partData[partKey]?.objectKeywords?.some((keyword) => objectPath.includes(keyword.toLowerCase()));
    });
    if (explicitPart) return explicitPart;

    const materialPart = detectMaterialPartKey(materialName);
    // '나무기둥' 재질은 기둥과 개판 덮개가 함께 사용한다.
    // 기둥은 반드시 gidung/기둥 오브젝트 경로에서만 분류한다.
    if (materialPart === 'gidung') return null;
    return materialPart;
  }

  function createRoofSliceMeshes(sourceMesh, bucketCount) {
    const geometry = sourceMesh.geometry;
    if (!geometry?.attributes?.position) return [];

    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const minY = box.min.y;
    const maxY = box.max.y;
    const rangeY = Math.max(maxY - minY, 0.0001);
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const uv = geometry.attributes.uv;
    const index = geometry.index;
    const triangleCount = index ? Math.floor(index.count / 3) : Math.floor(position.count / 3);
    if (triangleCount < bucketCount * 8) return [];

    const buckets = Array.from({ length: bucketCount }, () => ({ position: [], normal: [], uv: [] }));
    const vertex = new THREE.Vector3();

    function getVertexIndex(triangleBase, corner) {
      return index ? index.getX(triangleBase + corner) : triangleBase + corner;
    }

    function pushAttribute(bucket, attribute, vertexIndex, targetName) {
      if (!attribute) return;
      const itemSize = attribute.itemSize;
      for (let i = 0; i < itemSize; i++) bucket[targetName].push(attribute.getComponent(vertexIndex, i));
    }

    for (let triangle = 0; triangle < triangleCount; triangle++) {
      const base = triangle * 3;
      const ids = [getVertexIndex(base, 0), getVertexIndex(base, 1), getVertexIndex(base, 2)];
      let ySum = 0;
      ids.forEach((id) => { vertex.fromBufferAttribute(position, id); ySum += vertex.y; });
      const normalizedY = (ySum / 3 - minY) / rangeY;
      // 상단 45%만 roof/eave fallback으로 복제한다. 하부 벽체까지 분해하지 않기 위한 제한.
      if (normalizedY < .55) continue;
      const bucketIndex = Math.max(0, Math.min(bucketCount - 1, Math.floor((1 - normalizedY) * bucketCount)));
      const bucket = buckets[bucketIndex];
      ids.forEach((id) => {
        pushAttribute(bucket, position, id, 'position');
        pushAttribute(bucket, normal, id, 'normal');
        pushAttribute(bucket, uv, id, 'uv');
      });
    }

    const material = Array.isArray(sourceMesh.material) ? sourceMesh.material[0] : sourceMesh.material;
    return buckets.map((bucket, bucketIndex) => {
      if (!bucket.position.length) return null;
      const bucketGeometry = new THREE.BufferGeometry();
      bucketGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bucket.position, 3));
      if (bucket.normal.length) bucketGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(bucket.normal, 3));
      else bucketGeometry.computeVertexNormals();
      if (bucket.uv.length) bucketGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(bucket.uv, 2));
      bucketGeometry.computeBoundingBox();
      bucketGeometry.computeBoundingSphere();
      const partKey = viewerUiPartOrder[bucketIndex] || viewerUiPartOrder[viewerUiPartOrder.length - 1];
      const partMesh = new THREE.Mesh(bucketGeometry, material.clone());
      partMesh.name = `${sourceMesh.name || 'mesh'}__roof_slice_${bucketIndex}_${partKey}`;
      partMesh.position.copy(sourceMesh.position);
      partMesh.rotation.copy(sourceMesh.rotation);
      partMesh.scale.copy(sourceMesh.scale);
      partMesh.visible = false;
      partMesh.castShadow = true;
      partMesh.receiveShadow = true;
      partMesh.userData.originalPosition = partMesh.position.clone();
      partMesh.userData.targetPosition = partMesh.position.clone();
      partMesh.userData.originalMaterials = partMesh.material.clone();
      partMesh.userData.materialName = getMaterialName(partMesh.material).toLowerCase();
      partMesh.userData.localCenter = bucketGeometry.boundingBox.getCenter(new THREE.Vector3());
      partMesh.userData.assignedPart = partKey;
      partMesh.userData.stackIndex = bucketIndex;
      partMesh.userData.stackTotal = bucketCount;
      return partMesh;
    }).filter(Boolean);
  }

  function computeGroupCenter(geometry, group) {
    const position = geometry.attributes.position;
    const index = geometry.index;
    const min = new THREE.Vector3(Infinity, Infinity, Infinity);
    const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
    const vertex = new THREE.Vector3();

    const end = group.start + group.count;
    for (let i = group.start; i < end; i++) {
      const vertexIndex = index ? index.getX(i) : i;
      vertex.fromBufferAttribute(position, vertexIndex);
      min.min(vertex);
      max.max(vertex);
    }

    if (!Number.isFinite(min.x)) return new THREE.Vector3();
    return min.add(max).multiplyScalar(.5);
  }

  function computeMeshCenter(mesh) {
    // Stored centres must remain in mesh-local coordinates. setFromObject()
    // returns a world-space box; applying matrixWorld to that value again sent
    // gate hotspots far away from their actual parts.
    const geometry = mesh?.geometry;
    if (!geometry) return new THREE.Vector3();
    if (!geometry.boundingBox) geometry.computeBoundingBox();
    return geometry.boundingBox?.getCenter(new THREE.Vector3()) || new THREE.Vector3();
  }

  function computeMeshTargetCenter(mesh) {
    const center = mesh.userData.localCenter
      ? mesh.userData.localCenter.clone()
      : computeMeshCenter(mesh);
    const targetPosition = mesh.userData.targetPosition || mesh.position;
    const localMatrix = new THREE.Matrix4().compose(targetPosition, mesh.quaternion, mesh.scale);
    center.applyMatrix4(localMatrix);
    mesh.parent?.updateWorldMatrix?.(true, false);
    if (mesh.parent) center.applyMatrix4(mesh.parent.matrixWorld);
    return center;
  }

  function computeMeshesTargetCenter(targetMeshes) {
    const centers = targetMeshes.filter(Boolean).map((mesh) => computeMeshTargetCenter(mesh));
    return centers.length ? averageVectors(centers) : modelCenter?.clone() || new THREE.Vector3();
  }

  function computeMeshWorldCenter(mesh) {
    const center = mesh.userData.localCenter
      ? mesh.userData.localCenter.clone()
      : computeMeshCenter(mesh);
    mesh.updateWorldMatrix(true, false);
    return center.applyMatrix4(mesh.matrixWorld);
  }

  function computeMeshesWorldCenter(targetMeshes) {
    const centers = targetMeshes.filter(Boolean).map((mesh) => computeMeshWorldCenter(mesh));
    return centers.length ? averageVectors(centers) : modelCenter?.clone() || new THREE.Vector3();
  }

  function prepareHotspotAnchors() {
    hotspotAnchorMeshes.clear();
    model?.updateWorldMatrix(true, true);

    const buildingKey = currentBuildingModelKey
      || document.querySelector('.building-tab.active')?.dataset.building
      || 'minga';
    const profile = viewerHotspotProfiles[buildingKey] || viewerHotspotProfiles.minga;

    const candidatesByPart = Object.fromEntries(viewerUiPartOrder.map((partKey) => [
      partKey,
      meshes.filter((mesh) => mesh.userData.assignedPart === partKey)
    ]));

    function projectedX(mesh) {
      return computeMeshWorldCenter(mesh).project(camera).x;
    }

    function chooseScreenPercentile(candidates, percentile) {
      if (!candidates?.length) return null;
      const ordered = [...candidates].sort((a, b) => projectedX(a) - projectedX(b));
      return ordered[Math.round((ordered.length - 1) * percentile)];
    }

    viewerUiPartOrder.forEach((partKey) => {
      const candidates = candidatesByPart[partKey] || [];
      let anchor = null;

      // The named anchors belong only to the house model. Temple and gate must
      // select from their own model/profile instead of inheriting these nodes.
      if (buildingKey === 'minga' && partKey === 'gidung') {
        anchor = candidates.find((mesh) => mesh.name.includes('긴채 기둥 002')) || null;
      } else if (buildingKey === 'minga' && partKey === 'gaepan') {
        anchor = candidates.find((mesh) => mesh.name.includes('개판 덮개 003')) || null;
      }

      anchor ||= chooseScreenPercentile(candidates, profile[partKey]?.percentile ?? .5);
      if (anchor) hotspotAnchorMeshes.set(partKey, anchor);
    });
  }

  function updateHotspotLabels() {
    document.querySelectorAll('.hotspot').forEach((button) => {
      const partKey = button.dataset.part;
      const partIndex = viewerUiPartOrder.indexOf(partKey);
      button.dataset.label = getPartLabel(partKey);
      const number = button.querySelector('span');
      if (number && partIndex >= 0) number.textContent = String(partIndex + 1).padStart(2, '0');
    });
  }

  function refreshViewerPartLabels() {
    document.querySelectorAll('.part-button').forEach((button, index) => {
      const label = button.querySelector('b');
      const number = button.querySelector('span');
      if (label) label.textContent = getPartLabel(button.dataset.part);
      if (number) number.textContent = String(index + 1).padStart(2, '0');
    });
    updateHotspotLabels();
    if (selectedPart) syncStructureSelector(selectedPart);
  }
  window.__refreshViewerPartLabels = refreshViewerPartLabels;
  refreshViewerPartLabels();

  function updateHotspotPositions() {
    if (!camera || !hotspotLayer) return;
    document.querySelectorAll('.hotspot').forEach((button) => {
      const partKey = button.dataset.part;
      const anchorMesh = hotspotAnchorMeshes.get(partKey);
      const partMeshes = anchorMesh ? [anchorMesh] : meshes.filter((mesh) => partMatches(mesh, partKey));
      if (!partMeshes.length) {
        button.hidden = true;
        return;
      }

      const projected = computeMeshesWorldCenter(partMeshes).project(camera);
      const buildingKey = currentBuildingModelKey || 'minga';
      const hotspotProfile = viewerHotspotProfiles[buildingKey]?.[partKey];
      const left = (projected.x * .5 + .5) * 100 + (hotspotProfile?.offsetX || 0);
      const top = (-projected.y * .5 + .5) * 100 + (hotspotProfile?.offsetY || 0);
      const visible = projected.z > -1 && projected.z < 1 && left > -8 && left < 108 && top > -8 && top < 108;

      button.hidden = !visible;
      if (!visible) return;
      button.style.left = `${left}%`;
      button.style.top = `${top}%`;
      button.classList.toggle('active', partKey === selectedPart);
    });
  }

  window.__updateHotspotLabels = updateHotspotLabels;
  updateHotspotLabels();

  function averageVectors(vectors) {
    if (!vectors.length) return new THREE.Vector3();
    const result = new THREE.Vector3();
    vectors.forEach((vector) => result.add(vector));
    return result.multiplyScalar(1 / vectors.length);
  }

  function fitModelToView(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.8 / maxSize;

    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    // Rotated roof meshes have very loose local boxes. Read their actual
    // vertices once on load so the temple is framed around the visible building.
    const newBox = new THREE.Box3().setFromObject(object, currentBuildingModelKey === 'sachal');
    const newSize = newBox.getSize(new THREE.Vector3());
    modelCenter = newBox.getCenter(new THREE.Vector3());
    const newMax = Math.max(newSize.x, newSize.y, newSize.z) || 1;
    modelViewBounds = newBox.clone();
    gateViewBounds = null;
    if (currentBuildingModelKey === 'gate') {
      const parts = { roof: new THREE.Box3(), beams: new THREE.Box3(), supports: new THREE.Box3(), base: new THREE.Box3(), door: new THREE.Box3() };
      object.traverse((child) => {
        const name = (child.name || '').toLowerCase();
        const key = name.includes('sm_chwidu01b_1') ? 'roof'
          : name.includes('sm_purlin02g') ? 'beams'
          : name.includes('sm_cornerstone01c_9') ? 'supports'
          : name.includes('sm_gidan01c') ? 'base' : null;
        if (key) parts[key].union(new THREE.Box3().setFromObject(child));
        if (child.isMesh && /castle_door/i.test(getMaterialName(child.material))) {
          parts.door.union(new THREE.Box3().setFromObject(child));
        }
      });
      if (Object.values(parts).every((bounds) => !bounds.isEmpty())) {
        gateViewBounds = { ...parts, front: parts.base.clone().union(parts.roof) };
      }
    }
    groundShadow.updateBounds(newBox);
    camera.near = newMax / 100;
    camera.far = newMax * 140;
    controls.minDistance = newMax * .08;
    controls.maxDistance = newMax * 8;
    controls.maxPolarAngle = Math.PI * .75;
    camera.updateProjectionMatrix();
    applyViewpoint('courtyard', true);
    controls.saveState();
    resizeRenderer();
  }

  function setViewpointState(value) {
    activeViewpoint = value;
  }

  function applyViewpoint(value, immediate = false) {
    if (!modelViewBounds || !camera || !controls) return;
    const isGate = currentBuildingModelKey === 'gate' && gateViewBounds;
    const isTemple = currentBuildingModelKey === 'sachal';
    const modelSize = modelViewBounds.getSize(new THREE.Vector3());
    camera.near = Math.max(modelSize.x, modelSize.y, modelSize.z) / (isGate && value === 'eaves' ? 400 : 100);
    camera.updateProjectionMatrix();
    // The gate faces +X; its side walls extend along Z. The front view frames
    // the central entrance and pavilion, while overview includes all walls.
    const framingBounds = isGate && value !== 'overview' ? gateViewBounds.front : modelViewBounds;
    const size = framingBounds.getSize(new THREE.Vector3());
    const center = framingBounds.getCenter(new THREE.Vector3());
    const span = Math.max(size.x, size.y, size.z);
    const aspect = Math.max(.35, viewerStage.clientWidth / viewerStage.clientHeight);
    const projectedWidth = (isGate || isTemple) && value !== 'overview' ? size.z * .9 + size.x * .4 : size.x * .9 + size.z * .4;
    const fitDistance = Math.max(size.y, projectedWidth / aspect)
      / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.2 + (isTemple && value !== 'overview' ? size.x : size.z) * .5;
    // Model files do not declare surveyed dimensions. Eye level is proportional
    // to the building height, not presented as a measured 1.6 m camera position.
    const eyeY = isGate ? gateViewBounds.door.min.y + (gateViewBounds.door.max.y - gateViewBounds.door.min.y) * .42
      : modelViewBounds.min.y + size.y * .28;
    let target = center.clone();
    let position;
    if (value === 'overview') {
      const distance = Math.max(fitDistance, span * 1.7);
      position = center.clone().add(new THREE.Vector3(.58, .48, .72).normalize().multiplyScalar(distance));
    } else if (value === 'eaves' && isGate) {
      const { roof, beams, supports } = gateViewBounds;
      const roofSize = roof.getSize(new THREE.Vector3());
      const roofCenter = roof.getCenter(new THREE.Vector3());
      // Stand at the upper pavilion, outside its columns and beneath the roof
      // overhang. Ground-level house proportions would put this inside masonry.
      const pavilionEyeY = supports.min.y + (beams.min.y - supports.min.y) * .68;
      position = new THREE.Vector3(roof.max.x - roofSize.x * .06, pavilionEyeY, roofCenter.z + roofSize.z * .22);
      target.set(roofCenter.x - roofSize.x * .08, beams.min.y + (beams.max.y - beams.min.y) * .25, roofCenter.z + roofSize.z * .12);
    } else if (value === 'eaves' && isTemple) {
      target.set(center.x - size.x * .15, modelViewBounds.min.y + size.y * .57, center.z);
      position = new THREE.Vector3(modelViewBounds.min.x - Math.max(size.x * .1, span * .08),
        eyeY, center.z + size.z * .18);
    } else if (value === 'eaves') {
      target.set(center.x, modelViewBounds.min.y + size.y * .57, center.z + size.z * .15);
      position = new THREE.Vector3(center.x + size.x * .18, eyeY,
        modelViewBounds.max.z + Math.max(size.z * .1, span * .08));
    } else if (isGate) {
      const doorCenter = gateViewBounds.door.getCenter(new THREE.Vector3());
      target.set(center.x, framingBounds.min.y + size.y * .4, doorCenter.z);
      // Start directly in front of the entrance; this model faces +X.
      position = new THREE.Vector3(center.x + fitDistance, eyeY, doorCenter.z);
    } else if (isTemple) {
      // The temple's plaque and main doors face -X; +Z is its narrow gable end.
      target.set(center.x, modelViewBounds.min.y + size.y * .4, center.z);
      position = new THREE.Vector3(center.x - fitDistance, eyeY, center.z);
    } else {
      target.set(center.x, modelViewBounds.min.y + size.y * .4, center.z);
      // The house front faces +Z, with no sideways camera offset.
      position = new THREE.Vector3(center.x, eyeY, center.z + fitDistance);
    }
    if (value !== 'eaves') {
      // Fit the actual perspective projection, including tall gates and narrow
      // screens. Leave room for the header and controls without raising eye level.
      const probe = camera.clone();
      probe.aspect = aspect;
      probe.updateProjectionMatrix();
      const corners = [];
      for (const x of [framingBounds.min.x, framingBounds.max.x]) {
        for (const y of [framingBounds.min.y, framingBounds.max.y]) {
          for (const z of [framingBounds.min.z, framingBounds.max.z]) corners.push(new THREE.Vector3(x, y, z));
        }
      }
      const fitsView = (candidate) => {
        probe.position.copy(candidate);
        probe.lookAt(target);
        probe.updateMatrixWorld();
        return corners.every((corner) => {
          const projected = corner.clone().project(probe);
          return Math.abs(projected.x) <= .84 && Math.abs(projected.y) <= .66 && projected.z < 1;
        });
      };
      for (let attempt = 0; attempt < 32; attempt += 1) {
        if (fitsView(position)) break;
        position.sub(target).multiplyScalar(1.08).add(target);
        if (value === 'courtyard') position.y = eyeY;
      }
      if (isTemple && value === 'courtyard') {
        // Fill the same safe screen area as the other buildings instead of
        // retaining unnecessary distance from the initial conservative estimate.
        let near = Math.max(0, target.x - framingBounds.min.x) + camera.near * 2;
        let far = target.x - position.x;
        const candidate = position.clone();
        for (let attempt = 0; attempt < 20; attempt += 1) {
          const distance = (near + far) / 2;
          candidate.x = target.x - distance;
          if (fitsView(candidate)) far = distance;
          else near = distance;
        }
        position.x = target.x - far * 1.02;
      }
    }
    setViewpointState(value);
    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      desiredCameraPosition = null;
      desiredControlsTarget = null;
      camera.position.copy(position);
      controls.target.copy(target);
      controls.update();
    } else moveCameraTo(target, position, span * 140);
  }

  function detectPartKey(mesh) {
    const searchText = `${mesh.name || ''} ${mesh.userData.materialName || ''} ${mesh.parent?.name || ''}`.toLowerCase();
    for (const partKey of viewerUiPartOrder) {
      const data = partData[partKey];
      if (data?.keywords?.some((keyword) => searchText.includes(keyword.toLowerCase()))) {
        return partKey;
      }
    }
    return null;
  }

  function partMatches(mesh, partKey) {
    if (currentBuildingModelKey === 'sachal') return mesh.userData.assignedPart === partKey;
    if (mesh.userData.assignedPart === partKey) return true;
    const data = partData[partKey];
    if (!data) return false;
    const searchText = `${mesh.name || ''} ${mesh.userData.materialName || ''} ${mesh.parent?.name || ''}`.toLowerCase();
    return data.keywords.some((keyword) => searchText.includes(keyword.toLowerCase()));
  }

  function getMatchedMeshes(partKey) {
    if (!partKey) return [];
    const matched = meshes.filter((mesh) => partMatches(mesh, partKey));
    if (currentBuildingModelKey === 'sachal') return matched;
    if (matched.length) return matched;

    // 모델 구조상 정확한 전통 부재 이름이 없을 때도 버튼 반응이 보이도록 material 순서로 fallback.
    const order = viewerUiPartOrder;
    const index = Math.max(order.indexOf(partKey), 0) % Math.max(meshes.length, 1);
    return meshes[index] ? [meshes[index]] : [];
  }

  function setTargetOffset(mesh, distance) {
    setWorldVerticalTarget(mesh, distance);
  }

  function setWorldVerticalTarget(mesh, localDistance) {
    const originalPosition = mesh.userData.originalPosition || mesh.position;
    if (!mesh.parent || !model) {
      mesh.userData.targetPosition = originalPosition.clone().add(new THREE.Vector3(0, localDistance, 0));
      return;
    }

    // localDistance는 모델 원본 단위다. 모델 전체 스케일만 반영한 뒤,
    // 월드의 수직 이동량을 해당 부모의 로컬 좌표로 역변환한다.
    model.updateWorldMatrix(true, true);
    const modelWorldScale = model.getWorldScale(new THREE.Vector3());
    const worldDistance = localDistance * Math.abs(modelWorldScale.y || 1);
    const parentOriginWorld = mesh.parent.localToWorld(new THREE.Vector3(0, 0, 0));
    const parentVerticalWorld = parentOriginWorld.clone().add(new THREE.Vector3(0, worldDistance, 0));
    const parentOriginLocal = mesh.parent.worldToLocal(parentOriginWorld.clone());
    const parentVerticalLocal = mesh.parent.worldToLocal(parentVerticalWorld);
    const localVerticalOffset = parentVerticalLocal.sub(parentOriginLocal);

    mesh.userData.targetPosition = originalPosition.clone().add(localVerticalOffset);
  }

  function setWorldHorizontalTarget(mesh, localDistance) {
    const originalPosition = mesh.userData.originalPosition || mesh.position;
    if (!mesh.parent || !model) {
      mesh.userData.targetPosition = originalPosition.clone().add(new THREE.Vector3(localDistance, 0, 0));
      return;
    }

    // 좌우 벽체도 부모 회전/스케일에 상관없이 화면의 월드 X축 방향으로만
    // 이동한다. localDistance는 모델 원본 단위로 관리한다.
    model.updateWorldMatrix(true, true);
    const modelWorldScale = model.getWorldScale(new THREE.Vector3());
    const worldDistance = localDistance * Math.abs(modelWorldScale.x || 1);
    const parentOriginWorld = mesh.parent.localToWorld(new THREE.Vector3(0, 0, 0));
    const parentHorizontalWorld = parentOriginWorld.clone().add(new THREE.Vector3(worldDistance, 0, 0));
    const parentOriginLocal = mesh.parent.worldToLocal(parentOriginWorld.clone());
    const parentHorizontalLocal = mesh.parent.worldToLocal(parentHorizontalWorld);
    const localHorizontalOffset = parentHorizontalLocal.sub(parentOriginLocal);

    mesh.userData.targetPosition = originalPosition.clone().add(localHorizontalOffset);
  }

  function getArchitecturalExplodeProfile(partKey) {
    const profiles = {
      // 기둥 → 서까래 → 개판 덮개 → 기와 순서의 수직 분해도.
      // 같은 part에 속한 모든 mesh는 이 하나의 Y 오프셋을 공유한다.
      gidung: .02,
      seokkarae: .18,
      gaepan: .32,
      giwa: .50
    };
    return profiles[partKey] || 0;
  }

  function setStackedExplodeOffset(mesh, { selected = false, all = false } = {}) {
    const partKey = mesh.userData.assignedPart;
    if (currentBuildingModelKey === 'sachal') {
      const profile = templeExplodeProfile(partKey, mesh.userData.templeFloor);
      setWorldVerticalTarget(mesh, (profile + (selected ? .06 : 0)) * explodeReferenceSize);
      return;
    }
    if (currentBuildingModelKey === 'gate' && mesh.userData.isGateExplodePart) {
      const baseOffset = mesh.userData.gateExplodeOffset || 0;
      const selectedOffset = selected ? explodeReferenceSize * .025 : 0;
      setWorldVerticalTarget(mesh, baseOffset + selectedOffset);
      return;
    }
    const verticalProfile = getArchitecturalExplodeProfile(partKey);

    // 선택 상태에서도 같은 층의 모양을 깨지 않고 약간만 더 띄운다.
    const referenceSize = currentBuildingModelKey === 'gate' ? explodeReferenceSize : rawMaxSize;
    const selectedY = selected ? referenceSize * (currentBuildingModelKey === 'gate' ? .035 : .06) : 0;
    setWorldVerticalTarget(mesh, verticalProfile * referenceSize + selectedY);
  }

  function updateExplodeLabels(selectedMeshes = []) {
    if (!labelLayer) return;
    labelLayer.innerHTML = '';
    labelLayer.classList.remove('active');
  }

  function moveCameraTo(target, position, farDistance) {
    desiredControlsTarget = target.clone();
    desiredCameraPosition = position.clone();
    camera.far = Math.max(camera.far, farDistance);
    camera.updateProjectionMatrix();
  }

  function frameExplodedView(selectedMeshes = []) {
    if (!camera || !controls || !modelCenter) return;
    setViewpointState(null);
    if (explodeState === 'none') {
      desiredCameraPosition = null;
      desiredControlsTarget = null;
      controls.reset();
      return;
    }

    const worldScale = model?.scale?.x || 1;
    const explodedSpanWorld = rawMaxSize * worldScale * 1.2;
    const explodedCenter = computeMeshesTargetCenter(meshes);

    if (explodeState === 'selected' && selectedMeshes.length) {
      const target = computeMeshesTargetCenter(selectedMeshes);
      const distance = currentBuildingModelKey === 'gate'
        ? Math.max(6.2, rawMaxSize * worldScale * 1.55)
        : Math.max(7.5, rawMaxSize * worldScale * 2.55);
      moveCameraTo(target, new THREE.Vector3(
        target.x + distance * .70,
        target.y + distance * .42,
        target.z + distance * .88
      ), Math.max(distance * 14, explodedSpanWorld * 4));
      return;
    }

    if (currentBuildingModelKey === 'gate') {
      // 성문은 폭이 긴 모델이라 raw width로 새 카메라 거리를 계산하면 갑자기
      // 지나치게 작아진다. 현재 시점의 방향은 유지하면서, 실제 네 덩어리의
      // 분해 후 중심을 따라가 모든 층이 화면 안에 남게 한다.
      const currentOffset = camera.position.clone().sub(controls.target);
      const currentDistance = Math.max(currentOffset.length(), 1);
      const target = explodedCenter.clone();
      const position = target.clone().add(currentOffset.normalize().multiplyScalar(currentDistance * 1.12));
      moveCameraTo(target, position, currentDistance * 12);
      return;
    }

    const distance = Math.max(15, explodedSpanWorld * 1.05);
    const target = explodedCenter.clone();
    target.y += explodedSpanWorld * .02;
    moveCameraTo(target, new THREE.Vector3(
      target.x + distance * .72,
      target.y + distance * .42,
      target.z + distance * .96
    ), distance * 10);
  }

  function applyExplodeState({ followCamera = false, animateReturn = false } = {}) {
    if (!model) return;

    const selectedMeshes = getMatchedMeshes(selectedPart);
    const selectedSet = new Set(selectedMeshes);
    const isExploding = explodeState !== 'none';
    if (!followCamera && !animateReturn) {
      desiredCameraPosition = null;
      desiredControlsTarget = null;
    }
    returnAnimationActive = animateReturn && !isExploding;

    // 기준 한옥: 움직이지 않는다. 성문의 좌우 벽체는 별도의 핫스팟 없이
    // 분해 상태에서만 양옆으로 열리고, 문/벽 재질은 투명한 맥락으로 남는다.
    baseMeshes.forEach((mesh) => {
      if (!returnAnimationActive) restoreMaterial(mesh);
      if (currentBuildingModelKey === 'gate') {
        if (mesh.userData.isGateSideWall) {
          const sideDistance = isExploding
            ? (mesh.userData.gateSideOffset || 0) * (mesh.userData.gateSideDirection || 1)
            : 0;
          setWorldHorizontalTarget(mesh, sideDistance);
        }
        if (isExploding && mesh.userData.isGateTransparentContext) {
          mesh.material = makeContextMaterial(mesh.material, .20, .18);
        }
        return;
      }
      if (isExploding && currentBuildingModelKey !== 'gate') {
        const opacity = explodeState === 'selected' ? .08 : .14;
        mesh.material = makeBaseGhostMaterial(mesh.material, opacity);
      }
    });

    // 민가/사찰은 material-group clone, 성문은 GLB 원본 4개가 움직인다.
    meshes.forEach((mesh) => {
      if (!returnAnimationActive) restoreMaterial(mesh);
      const isDirectGatePart = currentBuildingModelKey === 'gate' && mesh.userData.isGateExplodePart;
      mesh.visible = isDirectGatePart || isExploding || returnAnimationActive;

      if (!isExploding) {
        setTargetOffset(mesh, 0);
        return;
      }

      const selected = selectedSet.has(mesh);
      setStackedExplodeOffset(mesh, { selected: explodeState === 'selected' && selected, all: explodeState === 'all' });

      if (explodeState === 'selected' && selected) {
        mesh.material = makeHighlightMaterial(mesh.material);
      } else if (explodeState === 'selected') {
        mesh.material = isDirectGatePart
          ? makeContextMaterial(mesh.material, .42, .20)
          : makeContextMaterial(mesh.material);
      }

      // 성문 Group 안에 포함된 문짝·벽체 primitive는 선택 파트 여부와
      // 관계없이 투명하게 두어 내부 목구조와 분해 간격을 가리지 않게 한다.
      if (isDirectGatePart && mesh.userData.isGateTransparentContext) {
        mesh.material = makeContextMaterial(mesh.material, .20, .18);
      }
    });

    hotspotLayer?.classList.toggle('active', isExploding);
    updateExplodeLabels(selectedMeshes);

    if (followCamera) frameExplodedView(selectedMeshes);

    if (!isExploding) {
      setViewerMessage(getLang() === 'ko' ? '분해 상태를 초기화했습니다.' : 'Exploded view reset.');
    } else if (explodeState === 'all') {
      setViewerMessage(getLang() === 'ko'
        ? (currentBuildingModelKey === 'gate'
          ? '성문의 네 구조 그룹을 실제 높이에 맞춰 수직으로 분해했습니다.'
          : '기준 한옥은 흐리게 남기고, 지붕·외피·바닥 그룹이 건축 분해도처럼 크게 벌어집니다.')
        : (currentBuildingModelKey === 'gate'
          ? 'The four gate structure groups are separated vertically from their measured bounds.'
          : 'The base hanok stays ghosted while roof, envelope, and floor groups open into a wide architectural exploded view.'));
    } else {
      setViewerMessage(getLang() === 'ko'
        ? `${getPartLabel(selectedPart)} 선택. 카메라가 해당 그룹을 따라가고, 나머지 그룹은 흐린 맥락으로 남습니다.`
        : `${getPartLabel(selectedPart)} selected. The camera follows that group while the rest stays as context.`);
    }
  }

  function updatePartLocal(partKey, shouldExplode = true, followCamera = false) {
    selectedPart = partKey;
    document.querySelectorAll('.part-button').forEach((button) => {
      button.classList.toggle('active', button.dataset.part === partKey);
    });
    updatePartText(partKey);
    renderLearningPanel(partKey);
    if (shouldExplode) explodeState = 'selected';
    if (model) applyExplodeState({ followCamera });
    else setViewerMessage('모델 로딩 후 선택 부위가 분해도처럼 표시됩니다.');
  }

  window.addEventListener('resize', resizeRenderer);
  document.addEventListener('fullscreenchange', resizeRenderer);
  if ('ResizeObserver' in window) {
    const stageResizeObserver = new ResizeObserver(() => resizeRenderer());
    stageResizeObserver.observe(viewerStage);
  }

  function resizeRenderer() {
    if (!renderer || !camera) return;
    camera.aspect = viewerStage.clientWidth / viewerStage.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewerStage.clientWidth, viewerStage.clientHeight);
    if (activeViewpoint && explodeState === 'none') applyViewpoint(activeViewpoint, true);
  }

  function animate(now = performance.now()) {
    requestAnimationFrame(animate);
    const timeDelta = Math.min(50, Math.max(0, now - lastTimeAnimationAt));
    lastTimeAnimationAt = now;
    if (!prefersReducedTimeMotion && !isTimeAutoplayPaused && !isLearningTimePaused && !isTimeControlDragging && now >= timeAutoplayResumeAt) {
      targetTimeOfDay += timeDelta / TIME_AUTOPLAY_DURATION;
      if (targetTimeOfDay >= 1) {
        targetTimeOfDay = 1;
        setTimeAutoplayPaused(true);
      }
      updateViewerTimeUi(targetTimeOfDay);
    }
    timeOfDay += (targetTimeOfDay - timeOfDay) * .08;
    updateTimeOfDayLighting(timeOfDay);
    const movingMeshes = gateSideMeshes.length ? [...meshes, ...gateSideMeshes] : meshes;
    if (movingMeshes.length) {
      movingMeshes.forEach((mesh) => {
        if (mesh.userData.targetPosition) {
          mesh.position.lerp(mesh.userData.targetPosition, .12);
        }
      });
      if (returnAnimationActive) {
        const returned = movingMeshes.every((mesh) => !mesh.userData.targetPosition || mesh.position.distanceTo(mesh.userData.targetPosition) < .002);
        if (returned) {
          movingMeshes.forEach((mesh) => {
            mesh.position.copy(mesh.userData.originalPosition);
            restoreMaterial(mesh);
          });
          // House/temple explode meshes are copies of the assembled originals.
          // Hide them before restoring shadows to avoid overlapping surfaces and
          // duplicate shadow casters. Gate parts are originals; side walls stay visible.
          meshes.forEach((mesh) => {
            mesh.visible = currentBuildingModelKey === 'gate' && !!mesh.userData.isGateExplodePart;
          });
          baseMeshes.forEach((mesh) => {
            restoreMaterial(mesh);
          });
          returnAnimationActive = false;
        }
      }
    }
    if (desiredCameraPosition && desiredControlsTarget) {
      camera.position.lerp(desiredCameraPosition, .075);
      controls.target.lerp(desiredControlsTarget, .075);
      if (
        camera.position.distanceTo(desiredCameraPosition) < .02 &&
        controls.target.distanceTo(desiredControlsTarget) < .02
      ) {
        camera.position.copy(desiredCameraPosition);
        controls.target.copy(desiredControlsTarget);
        desiredCameraPosition = null;
        desiredControlsTarget = null;
      }
    }
    controls.update();
    updateHotspotPositions();
    updatePartCalloutGeometry();
    // Show shadows and the time panel only after the building is fully assembled.
    const showShadows = explodeState === 'none' && !returnAnimationActive;
    sunLight.castShadow = showShadows;
    ground.visible = showShadows;
    ground.material.opacity = groundShadowOpacity;
    const hideLightPanel = !showShadows;
    if (viewerLightPanel && viewerLightPanel.classList.contains('is-light-hidden') !== hideLightPanel) {
      viewerLightPanel.classList.toggle('is-light-hidden', hideLightPanel);
      viewerLightPanel.inert = hideLightPanel;
      viewerLightPanel.setAttribute('aria-hidden', String(hideLightPanel));
    }
    renderer.shadowMap.autoUpdate = currentBuildingModelKey !== 'sachal';
    if (!renderer.shadowMap.autoUpdate && shouldRefreshTempleShadow(now, model, showShadows, timeOfDay)) {
      renderer.shadowMap.needsUpdate = true;
    }
    renderer.render(scene, camera);
  }

  animate();
}

function setupViewerTutorial() {
  if (document.body.dataset.page !== 'viewer') return;

  const tutorial = document.getElementById('viewerTutorial');
  const helpButton = document.getElementById('viewerTutorialHelp');
  const loading = document.getElementById('viewerLoading');
  const stepLabel = document.getElementById('viewerTutorialStep');
  const title = document.getElementById('viewerTutorialTitle');
  const panels = [...document.querySelectorAll('[data-tutorial-step]')];
  const dots = [...document.querySelectorAll('.viewer-tutorial-dots i')];
  const skipButton = document.getElementById('viewerTutorialSkip');
  const backButton = document.getElementById('viewerTutorialBack');
  const nextButton = document.getElementById('viewerTutorialNext');
  const hotspotLayer = document.getElementById('hotspotLayer');
  const lightPanel = document.getElementById('viewerLightPanel');
  const bottomControls = document.querySelector('.viewer-controls');
  const buildingTabs = document.querySelector('.viewer-building-switch');
  if (!tutorial || !helpButton || !title || !nextButton) return;
  const localizedCopy = [...tutorial.querySelectorAll('[lang]')];
  const headerControls = [...document.querySelectorAll('.site-header .logo-button, .site-header .lang-button, .site-header .hamburger-button')];
  const menuButton = document.querySelector('.site-header .hamburger-button');


  const copy = {
    ko: [
      { title: '뷰어 움직이기' },
      { title: '구조 살펴보기' },
      { title: '빛과 구조 조절하기' },
      { title: '건물 선택하기' }
    ],
    en: [
      { title: 'Explore the Viewer' },
      { title: 'Explore the Structure' },
      { title: 'Adjust Light and Structure' },
      { title: 'Choose a Building' }
    ]
  };
  const focusedElements = [hotspotLayer, lightPanel, bottomControls, buildingTabs].filter(Boolean);
  const stepCount = copy.ko.length;
  let step = 0;
  let isOpen = false;
  let previousFocus = null;
  let launchTimer = null;


  function hasSeenTutorial() {
    try { return localStorage.getItem(VIEWER_TUTORIAL_KEY) === '1'; } catch { return false; }
  }

  function rememberTutorial() {
    try { localStorage.setItem(VIEWER_TUTORIAL_KEY, '1'); } catch { /* Storage can be unavailable in private contexts. */ }
  }

  function clearFocus() {
    focusedElements.forEach((element) => element.classList.remove('viewer-tutorial-focus'));
  }

  function renderTutorial() {
    const lang = getLang() === 'ko' ? 'ko' : 'en';
    const content = copy[lang][step];
    localizedCopy.forEach((element) => { element.hidden = element.lang !== lang; });
    clearFocus();
    for (let index = 0; index < stepCount; index += 1) {
      tutorial.classList.toggle(`is-step-${index + 1}`, step === index);
      dots[index]?.classList.toggle('is-active', step === index);
    }
    panels.forEach((panel) => { panel.hidden = Number(panel.dataset.tutorialStep) !== step; });
    if (step === 1) hotspotLayer?.classList.add('viewer-tutorial-focus');
    if (step === 2) {
      lightPanel?.classList.add('viewer-tutorial-focus');
      bottomControls?.classList.add('viewer-tutorial-focus');
    }
    if (step === 3) buildingTabs?.classList.add('viewer-tutorial-focus');
    if (stepLabel) stepLabel.textContent = `0${step + 1} / 0${stepCount}`;
    title.textContent = content.title;
    if (backButton) {
      backButton.hidden = step === 0;
      backButton.textContent = lang === 'ko' ? '이전' : 'Back';
    }
    if (skipButton) skipButton.textContent = lang === 'ko' ? '건너뛰기' : 'Skip';
    nextButton.textContent = step === stepCount - 1
      ? (lang === 'ko' ? '시작하기' : 'Explore')
      : (lang === 'ko' ? '다음 →' : 'Next →');
    helpButton.setAttribute('aria-label', lang === 'ko' ? '사용법 보기' : 'View tutorial');

  }

  function closeTutorial(restoreFocus = true) {
    if (!isOpen) return;
    isOpen = false;

    rememberTutorial();
    clearFocus();
    tutorial.hidden = true;
    document.body.classList.remove('viewer-tutorial-active');
    helpButton.hidden = false;
    if (restoreFocus) {
      const returnFocus = previousFocus && previousFocus !== document.body ? previousFocus : helpButton;
      returnFocus.focus?.({ preventScroll: true });
    }
  }

  function openTutorial() {
    window.clearTimeout(launchTimer);
    previousFocus = document.activeElement;
    step = 0;
    isOpen = true;
    helpButton.hidden = true;
    tutorial.hidden = false;
    document.body.classList.add('viewer-tutorial-active');
    renderTutorial();
    requestAnimationFrame(() => nextButton.focus({ preventScroll: true }));
  }

  function advanceTutorial() {
    if (step >= stepCount - 1) closeTutorial();
    else {
      step += 1;
      renderTutorial();
      nextButton.focus({ preventScroll: true });
    }
  }

  function revealTutorial() {
    if (!loading?.classList.contains('is-complete')) return;
    helpButton.hidden = false;
    if (!hasSeenTutorial()) launchTimer = window.setTimeout(openTutorial, 520);
  }

  helpButton.addEventListener('click', openTutorial);
  menuButton?.addEventListener('click', () => { if (isOpen) closeTutorial(false); });
  skipButton?.addEventListener('click', closeTutorial);
  backButton?.addEventListener('click', () => {
    if (step === 0) return;
    step -= 1;
    renderTutorial();
    nextButton.focus({ preventScroll: true });
  });
  nextButton.addEventListener('click', advanceTutorial);
  document.addEventListener('keydown', (event) => {
    if (!isOpen) return;
    if (!['Escape', 'ArrowRight', 'ArrowLeft', 'Tab'].includes(event.key)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.key === 'Escape') closeTutorial();
    else if (event.key === 'ArrowRight') advanceTutorial();
    else if (event.key === 'ArrowLeft' && step > 0) {
      step -= 1;
      renderTutorial();
    }
    else if (event.key === 'Tab') {
      const buttons = [...headerControls, backButton, nextButton, skipButton].filter((button) => button && !button.hidden);
      const current = buttons.indexOf(document.activeElement);
      const next = (current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length;
      buttons[next].focus({ preventScroll: true });
    }
  }, true);
  window.__refreshViewerTutorial = () => {
    helpButton.setAttribute('aria-label', getLang() === 'ko' ? '사용법 보기' : 'View tutorial');
    if (isOpen) renderTutorial();
  };

  if (loading?.classList.contains('is-complete')) revealTutorial();
  else if (loading) {
    const observer = new MutationObserver(() => {
      if (!loading.classList.contains('is-complete')) return;
      observer.disconnect();
      revealTutorial();
    });
    observer.observe(loading, { attributes: true, attributeFilter: ['class'] });
  }
}

function updateBuildingText(buildingKey, updateDesc = true) {
  const lang = getLang();
  const data = buildingData[buildingKey];
  if (!data) return;
  document.getElementById('buildingTitle') && (document.getElementById('buildingTitle').textContent = lang === 'ko' ? data.ko : data.en);
  document.getElementById('photoCategory') && (document.getElementById('photoCategory').textContent = lang === 'ko' ? data.ko : data.en);
  if (updateDesc && document.getElementById('partDesc')) document.getElementById('partDesc').textContent = lang === 'ko' ? data.descKo : data.descEn;
}
function updatePartText(partKey) {
  const lang = getLang();
  const data = getViewerPartData(partKey);
  if (!data) {
    if (document.getElementById('partTitle')) document.getElementById('partTitle').textContent = lang === 'ko' ? '파츠 선택' : 'Select Part';
    if (document.getElementById('partDesc')) document.getElementById('partDesc').textContent = lang === 'ko'
      ? '왼쪽 항목이나 모델 위 핫스팟을 선택하면 해당 그룹이 분해도에서 강조됩니다.'
      : 'Select a group on the left or a hotspot on the model to highlight it in the exploded view.';
    return;
  }
  if (document.getElementById('partTitle')) document.getElementById('partTitle').textContent = lang === 'ko' ? data.ko : data.en;
  if (document.getElementById('partDesc')) document.getElementById('partDesc').textContent = lang === 'ko' ? data.descKo : data.descEn;
}
function getViewerPartData(partKey) {
  const activeBuilding = document.querySelector('.building-tab.active')?.dataset.building || 'minga';
  if (activeBuilding === 'sachal') {
    if (partKey === 'giwa') return { ...partData.giwa, ko: '지붕', en: 'Roof',
      descKo: '용화사 모델의 1층과 2층 지붕을 함께 선택합니다.',
      descEn: 'Select the roofs on both levels of the Yonghwasa model.' };
    if (partKey === 'gaepan') return { ...partData.gaepan, ko: '덮개 판' };
  }
  return activeBuilding === 'gate'
    ? (gatePartSlotData[partKey] || partData[partKey])
    : partData[partKey];
}
function getViewerLearningData(partKey) {
  const activeBuilding = document.querySelector('.building-tab.active')?.dataset.building || 'minga';
  return activeBuilding === 'gate'
    ? (gateLearningSlotData[partKey] || learningPartData[partKey] || learningPartDataLegacy[partKey])
    : (learningPartData[partKey] || learningPartDataLegacy[partKey]);
}
function getPartLabel(partKey) { const lang = getLang(); const data = getViewerPartData(partKey); return data ? (lang === 'ko' ? data.ko : data.en) : partKey; }
function updateDynamicText() {
  if (document.body.dataset.page === 'viewer') {
    window.__refreshViewerLightControls?.();
    window.__refreshViewerTutorial?.();
    const activeBuilding = document.querySelector('.building-tab.active')?.dataset.building || 'minga';
    const activePart = document.querySelector('.part-button.active')?.dataset.part || null;
    updateBuildingText(activeBuilding, false);
    window.__refreshViewerPartLabels?.();
    updatePartText(activePart);
    window.__syncViewerStructureSelector?.(activePart);
    if (activePart && document.getElementById('partCallout')?.classList.contains('is-visible')) {
      const data = getViewerPartData(activePart);
      const lang = getLang();
      const calloutTitle = document.getElementById('partCalloutTitle');
      const calloutDesc = document.getElementById('partCalloutDesc');
      if (calloutTitle) calloutTitle.textContent = lang === 'ko' ? data.ko : data.en;
      if (calloutDesc) calloutDesc.textContent = lang === 'ko' ? data.descKo : data.descEn;
    }
    if (activePart) window.__renderLearningPanel?.(activePart);
  }
  if (document.body.dataset.page === 'archive') {
    window.__refreshArchiveGallery?.();
  }
}

function setupHomeVideoScrub() {
  if (document.body.dataset.page !== 'home') return;
  const hero = document.querySelector('.hero-banner');
  const video = document.getElementById('heroScrubVideo');
  if (!hero || !video) return;

  video.pause();
  video.removeAttribute('controls');

  const state = { current: 0, target: 0, ready: false, active: false };
  let frameId = null;

  function duration() {
    return Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
  }

  function setInitialFrame() {
    const total = duration();
    if (!total) return;
    state.ready = true;
    state.current = total * .5;
    state.target = state.current;
    try { video.currentTime = state.current; } catch {}
  }

  function setTargetFromPointer(event) {
    const total = duration();
    if (!total) return;
    const rect = hero.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    state.target = total * Math.min(1, Math.max(0, x + (y - .5) * .08));
    state.active = true;
    requestFrame();
  }

  function releasePointer() {
    state.active = false;
  }

  function renderFrame() {
    const total = duration();
    if (!total) {
      frameId = null;
      return;
    }

    const ease = state.active ? .16 : .08;
    state.current += (state.target - state.current) * ease;
    const clampedTime = Math.min(total - .03, Math.max(0, state.current));

    if (Math.abs(video.currentTime - clampedTime) > .015) {
      try { video.currentTime = clampedTime; } catch {}
    }

    if (Math.abs(state.target - state.current) > .01) {
      frameId = requestAnimationFrame(renderFrame);
    } else {
      state.current = state.target;
      frameId = null;
    }
  }

  function requestFrame() {
    if (frameId === null) frameId = requestAnimationFrame(renderFrame);
  }

  video.addEventListener('loadedmetadata', setInitialFrame, { once: true });
  if (duration()) setInitialFrame();

  const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  if (canHover) {
    hero.addEventListener('pointermove', setTargetFromPointer);
    hero.addEventListener('pointerleave', releasePointer);
    window.addEventListener('blur', releasePointer);
  }
}

setupPersistentSiteBgm();
setupIndexEntrance();
setupCommonUI();
setupHomeScrollScene();
setupHomeVideoScrub();
setupArchiveModal();
setupArchivePage();
setupViewer();
setupViewerTutorial();
