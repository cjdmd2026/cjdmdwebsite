(() => {
    "use strict";
    /*
     * 적용: 앞서 제공한 designer HTML + designer_02.css와 함께 사용합니다.
     * designer-data.js → designer_02.js → designer-filter.js → 이 파일 순서로 defer 연결합니다.
     * 학생 이름/사진/연결 변경: designer-data.js의 nameKo, nameEn, image, projectIds.
     * 각 학생의 projectIds에 아래 projectId가 있으면 해당 아이콘에 표시됩니다.
     * 예: projectIds: ["year-on"] → YEAR-ON 아이콘.
     * 아이콘 파일/프로젝트 설명 변경: 아래 ICON_PROJECTS에서 수정합니다.
     * 클릭 후 학생 옆의 색상 조각 변경: 해당 프로젝트의 studentColors에서 수정합니다.ㅁ
     * "학생 ID": "SVG의 색상 코드" 형식이며, 이름/카드 순서는 바뀌지 않습니다.
     * 두 학생의 조각을 맞바꾸려면 두 색상 값을 서로 교환하세요.
     * 같은 SVG 안의 색상을 사용하고, 하나의 색상을 여러 학생에게 중복 지정하지 마세요.
     * 생략/오타/중복 값은 남은 조각으로 자동 배정하며, 잘못된 값은 콘솔에 안내합니다.
     * SVG는 기존 assets/images/project/test/icon 폴더에서 불러옵니다.
     */
    const scriptURL = document.currentScript?.src || new URL('../js/designer-icon-slide.js', document.baseURI).href;
    const iconBaseURL = new URL('../assets/images/project/test/icon/', scriptURL);
    // 디자이너 목록 HTML 기준 상세 페이지 경로입니다. 개별 주소는 designer-data.js의 href로 지정합니다.
    const DESIGNER_DETAIL_PATH = './profile/';
    const ICON_PROJECTS = [
        {
            "projectId": "apuchika",
            "file": "team-01-apuchika.svg",
            "title": "아푸치카",
            "topic": "아동 양치 교육",
            "studentColors": {
                "ahn-nagyeong": "#ccebf5", // 안나경
                "youn-taegyun": "#ffce07", // 윤태균
                "lee-nayeong": "#00aaff" // 이나영
            }
        },
        {
            "projectId": "omix",
            "file": "team-02-ommix.svg",
            "title": "OMIX",
            "topic": "불교 홍보",
            "studentColors": {
                "noh-minyeong": "#c4272f", // 노민영
                "song-seungbin": "#ffc5c8", // 송승빈
                "ham-daeyeon": "#7f1616" // 함대연
            }
        },
        {
            "projectId": "phishing-ddook",
            "file": "team-03-phishing-ttuk.svg",
            "title": "피싱뚝!",
            "topic": "보이스피싱 교육",
            "studentColors": {
                "kim-jiyoo-phishing-ddook": "#e5903a", // 김지유
                "nam-nayoung": "#f2f070", // 남나영
                "lee-goeun": "#eec35a" // 이고은
            }
        },
        {
            "projectId": "ilkko",
            "file": "team-04-ilkko.svg",
            "title": "읽:꼬",
            "topic": "난독증 재택 훈련 서비스",
            "studentColors": {
                "seo-yeonwoo": "#f59000", // 서연우
                "lim-jongwon": "#f6ffe3", // 임종원
                "jo-eungyo": "#ffd834" // 조은교
            }
        },
        {
            "projectId": "curo",
            "file": "team-05-kuro.svg",
            "title": "CURO",
            "topic": "당뇨 환자를 위한 바늘 친숙화 서비스",
            "studentColors": {
                "park-yuna": "#bdffbf", // 박윤아
                "yoo-hyejin": "#8bff6c", // 유혜진
                "ju-bomin": "#3f66b5" // 주보민
            }
        },
        {
            "projectId": "dadeullim",
            "file": "team-06-dadeullim.svg",
            "title": "다들림",
            "topic": "청각장애인을 위한 운전 보조 서비스",
            "studentColors": {
                "kim-doyeon": "#4ccad1", // 김도연
                "kim-sungeun": "#a8f0db", // 김성은
                "yun-jiwon": "#3b82a6" // 윤지원
            }
        },
        {
            "projectId": "stylens",
            "file": "team-07-style-lens.svg",
            "title": "Stylens",
            "topic": "시각장애인을 위한 스타일링 서비스",
            "studentColors": {
                "kim-dahyun": "#d33bff", // 김다현
                "kim-hawon": "#e692ff" // 김하원
            }
        },
        {
            "projectId": "cheoma",
            "file": "team-08-geuneuljabi.svg",
            "title": "그늘잡이",
            "topic": "한국 문화 소개",
            "studentColors": {
                "kim-minjae": "#b5b5b5", // 김민재
                "jo-wooseong": "#ffffff" // 조우성
            }
        },
        {
            "projectId": "magmoa",
            "file": "team-09-magmoa.svg",
            "title": "마그모아",
            "topic": "여행 서비스",
            "studentColors": {
                "son-yejin": "#536dea", // 손예진
                "song-yujin": "#4df4ff" // 송유진
            }
        },
        {
            "projectId": "year-on",
            "file": "team-10-ieoon.svg",
            "title": "YEAR-ON",
            "topic": "한국 문화 소개",
            "studentColors": {
                "kwon-minseong": "#4f00b4", // 권민성
                "min-jiho": "#ededea" // 민지호
            }
        },
        {
            "projectId": "28",
            "file": "team-11-byeolungwan.svg",
            "title": "별운간",
            "topic": "별자리 서비스",
            "studentColors": {
                "park-yoonji": "#065182", // 박윤지
                "ju-yejin": "#d5c8ac" // 주예진
            }
        },
        {
            "projectId": "cocorang",
            "file": "team-12-kokorang.svg",
            "title": "COCO LANG",
            "topic": "반려동물",
            "studentColors": {
                "kim-jiyou-cocorang": "#ffba79", // 김지유
                "kim-jiyoon": "#ff7154" // 김지윤
            }
        },
        {
            "projectId": "efact",
            "file": "team-13-effect.svg",
            "title": "E.FACT",
            "topic": "환경 보호",
            "studentColors": {
                "go-biju": "#50c4a6", // 고비주
                "kim-hyejin": "#178466" // 김혜진
            }
        },
        {
            "projectId": "jikji",
            "file": "team-14-jikji-jamboree.svg",
            "title": "직지잼버리",
            "topic": "문화 소개",
            "studentColors": {
                "kim-juyoun": "#fbe19f" // 김주연
            }
        }
    ];

    // wordScale: 결합 글자 크기. 1이 기본이며 현재는 0.88배입니다.
    // wordCenterY: 초기 글자의 화면 내 중심 높이. 0.5 = 화면 중앙, 작은 값 = 위쪽.
    // gallerySpreadX/Y: 펼쳐진 아이콘의 가로/세로 간격. 작을수록 중앙에 모입니다.
    // galleryMobileSpreadX/Y: 750px 미만 화면의 간격. 아이콘 크기와 랜덤 순서는 유지합니다.
    // galleryFloatX/Y: 떠다니는 최대 거리(px), galleryFloatSpeed: 속도, galleryHoverScale: 호버 배율.
    const SETTINGS = { galleryFloatX: 6, galleryFloatY: 8, galleryFloatSpeed: .75, galleryHoverScale: 1.08, gallerySpreadX: .78, gallerySpreadY: .8, galleryMobileSpreadX: .9, galleryMobileSpreadY: .86, wordScale: .88, wordCenterY: .5, columns: 56, minimumSpacing: 8.5, iconScale: 1.55, spring: .024, damping: .82, pointerRadius: 82 };
    const canvas = document.getElementById("formation");
    if (!canvas || !document.getElementById("scrollScene")) return;
    if (!Array.isArray(window.DESIGNERS)) { console.error("designer-data.js를 먼저 연결해 주세요."); return; }
    const ctx = canvas.getContext("2d");
    const stage = document.getElementById("stage"), hint = document.getElementById("hint");
    const replayButton = document.getElementById("replay"), pauseButton = document.getElementById("pause");
    const scene = document.getElementById("scrollScene"), spreadHeading = document.getElementById("spreadHeading");
    const spreadButton = document.getElementById("spreadToggle"), iconList = document.getElementById("iconList");
    const designerPanel = document.getElementById("designerPanel"), designerRows = document.getElementById("designerRows");
    const designerPanelTitle = document.getElementById("designerPanelTitle"), designerClose = document.getElementById("designerClose");
    designerPanel.hidden = true;
    const profiles = ICON_PROJECTS.map(project => ({
      ...project,
      members: window.DESIGNERS.filter(student => (student.projectIds || []).includes(project.projectId))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    }));
    const toolbar = document.querySelector('.designer-heading'), emptyMessage = document.getElementById('formationEmpty');
    const source = ICON_PROJECTS.map(project => ({ ...project, name: project.title, svg: "" }));
    // 미리보기와 같은 글자 윤곽. 별도 마스크 파일이나 웹폰트 로딩이 필요하지 않습니다.
    const word = {"width":969,"height":494,"src":"data:image/png;base64,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"};
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let motionReduced = reducedMotion.matches;
    const pointer = { x: -9999, y: -9999, active: false, down: false };
    let sprites = [], fragments = [], fragmentRows = [], particles = [], maskImage, width = 0, height = 0, spacing = 20;
    let paused = false, raf = 0, previousTime = 0, until = 0, loaded = false;
    let spread = 0, scrollTarget = 0, spreadSlots = [], lastDraw = [];
    let galleryOrder = source.map((_, team) => team);
    let galleryOffsets = source.map(() => ({ x: 0, y: 0 }));
    let galleryShuffleArmed = true, galleryRevision = 0;
    let idleTime = 0, galleryTime = 0;
    let hoveredTeam = -1, focusedTeam = -1;
    const galleryHover = source.map(() => 0), detailOrigins = source.map(() => null);
    let wordShiftY = 0;
    let selectedTeam = -1;
    let viewActive = scene.classList.contains("slide-view"), savedProgress = 0, filterActive = false, resultCount = window.DESIGNERS.length;
    let visibleTeams = source.map(() => true);
    const mappedIds = new Set(profiles.flatMap(profile => profile.members.map(member => member.id)));
    const unmappedList = document.createElement('div'); unmappedList.className = 'formation-unmapped'; unmappedList.hidden = true; stage.appendChild(unmappedList);
    let unmappedResults = [];
    toolbar.inert = true;
    toolbar.setAttribute('aria-hidden', 'true');
    const detailProgress = source.map(() => 0), detailTargets = source.map(() => []), iconButtons = [];
    const random = (min, max) => min + Math.random() * (max - min);
    const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (a, b, value) => { const t = clamp((value - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    const idleActive = () => viewActive && !paused && !motionReduced && !document.hidden && spread < .16;
    const galleryIdleActive = () => viewActive && !paused && !motionReduced && !document.hidden && spread > .86 && visibleTeams.some(Boolean) && selectedTeam < 0 && !detailProgress.some(value => value > 0);
    function hoverTarget(team) {
      return viewActive && spread >= .995 && scrollTarget >= .995 && selectedTeam < 0 && visibleTeams[team] && (hoveredTeam === team || focusedTeam === team) ? 1 : 0;
    }
    function refreshGalleryHover() {
      if (paused || motionReduced) {
        galleryHover.forEach((_, team) => { galleryHover[team] = hoverTarget(team); });
        draw();
      } else wake(450);
    }
    function resetGalleryHover() {
      hoveredTeam = focusedTeam = -1;
      refreshGalleryHover();
    }
    function galleryPose(team) {
      const slot = spreadSlots[team];
      const weight = motionReduced ? 0 : smooth(.88, 1, spread);
      const amplitude = Math.min(1, slot.size / 100);
      const phase = galleryTime * SETTINGS.galleryFloatSpeed * (.85 + (team % 5) * .07);
      const x = slot.x + Math.sin(phase * .83 + team * 2.39996) * SETTINGS.galleryFloatX * amplitude * weight;
      const y = slot.y + Math.sin(phase + team * 1.61803) * SETTINGS.galleryFloatY * amplitude * weight;
      const size = slot.size * lerp(1, SETTINGS.galleryHoverScale, galleryHover[team]);
      const origin = detailOrigins[team], locked = origin ? smooth(0, .2, detailProgress[team]) : 0;
      return { x: lerp(x, origin?.x ?? x, locked), y: lerp(y, origin?.y ?? y, locked), size: lerp(size, origin?.size ?? size, locked) };
    }
    const loadImage = (src) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("이미지를 불러올 수 없습니다."));
      image.src = src;
    });
    async function loadWholeIcons() {
      return Promise.all(source.map(async (icon) => {
        // Freeze only the source's entrance animation; keep all shapes and colors.
        const svg = icon.svg.replace("</svg>", '<style>.icon-layer { animation: none !important; }</style></svg>');
        const image = await loadImage("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
        const full = document.createElement("canvas"); full.width = full.height = 384;
        full.getContext("2d").drawImage(image, 0, 0, 384, 384);
        return { name: icon.name, image: full };
      }));
    }
    async function loadFragments() {
      const selector = "path,rect,circle,ellipse,polygon,polyline,line", jobs = [];
      const colorContext = document.createElement("canvas").getContext("2d");
      function fillColor(el) {
        let current = el, value;
        while (current && !value) {
          value = current.style?.fill || current.getAttribute("fill"); current = current.parentElement;
        }
        if (value === "none") return null;
        colorContext.fillStyle = "#000000"; colorContext.fillStyle = value || "#000000";
        return colorContext.fillStyle.toLowerCase();
      }
      for (const [team, icon] of source.entries()) {
        const doc = new DOMParser().parseFromString(icon.svg, "image/svg+xml");
        const originals = [...doc.querySelectorAll(selector)].filter(el => !el.closest("defs,clipPath,mask"));
        const colors = originals.map(fillColor), uniqueColors = [...new Set(colors.filter(Boolean))];
        for (const color of uniqueColors) {
          const root = doc.documentElement.cloneNode(true);
          // Keep EVERY path of this color, including disconnected subpaths.
          // Keep the SVG viewBox, groups and transforms; never split the pixels.
          [...root.querySelectorAll(selector)].filter(el => !el.closest("defs,clipPath,mask")).forEach((el, index) => { if (colors[index] !== color) el.remove(); });
          const frozen = doc.createElementNS("http://www.w3.org/2000/svg", "style");
          frozen.textContent = ".icon-layer { animation: none !important; }"; root.appendChild(frozen);
          const xml = new XMLSerializer().serializeToString(root);
          jobs.push(loadImage("data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml)).then(image => {
            const group = document.createElement("canvas"); group.width = group.height = 384;
            group.getContext("2d").drawImage(image, 0, 0, 384, 384);
            return { image: group, name: icon.name, team, color, shapeCount: colors.filter(c => c === color).length,
              layer: colors.lastIndexOf(color), ratio: 1, offsetX: 0, offsetY: 0, relativeWidth: 1, relativeHeight: 1 };
          }));
        }
      }
      const all = (await Promise.all(jobs)).flat();
      const banks = source.map((_, team) => all.filter(piece => piece.team === team));
      if (banks.some(bank => bank.length === 0)) throw new Error("아이콘 조각을 만들 수 없습니다.");
      return banks;
    }
    // 색상 그룹의 SVG 그리기 순서는 그대로 두고, 도착할 학생 행만 지정합니다.
    function resolveFragmentRows(bank, profile) {
      const count = Math.max(bank.length, profile.members.length);
      const rows = bank.map(() => -1);
      const usedRows = new Set();
      const assignments = profile.studentColors || {};
      const memberIds = new Set(profile.members.map(member => member.id));
      const normalizeColor = value => {
        if (typeof value !== 'string') return null;
        const color = value.trim().toLowerCase();
        if (/^#[0-9a-f]{6}$/.test(color)) return color;
        if (/^#[0-9a-f]{3}$/.test(color)) return '#' + [...color.slice(1)].map(char => char + char).join('');
        return null;
      };
      const warn = (id, reason) => console.warn('[designer-icon-slide] ' + profile.projectId + ' / ' + id + ': ' + reason);
      Object.keys(assignments).forEach(id => {
        if (!memberIds.has(id)) warn(id, '이 프로젝트의 학생 ID가 아닙니다. 해당 설정을 건너뜁니다.');
      });
      profile.members.forEach((member, row) => {
        if (!Object.prototype.hasOwnProperty.call(assignments, member.id)) return;
        const color = normalizeColor(assignments[member.id]);
        const index = color ? bank.findIndex(piece => piece.color === color) : -1;
        if (index < 0) { warn(member.id, 'SVG에 없는 색상입니다. 남은 조각으로 자동 배정합니다.'); return; }
        if (rows[index] >= 0) { warn(member.id, '이미 다른 학생에게 배정한 색상입니다. 남은 조각으로 자동 배정합니다.'); return; }
        rows[index] = row;
        usedRows.add(row);
      });
      // 먼저 명시한 학생-색상 연결을 확보한 뒤, 빈 학생 행에 남은 조각을 배정합니다.
      const freeRows = Array.from({ length: count }, (_, row) => row).filter(row => !usedRows.has(row));
      let next = 0;
      return rows.map(row => row >= 0 ? row : freeRows[next++]);
    }
    // 한 번의 휠/스와이프로 글자와 아이콘 정렬 화면 사이를 이동합니다.
    // duration: 이동 시간(ms), wheelThreshold: 휠 감도(px), swipeThreshold: 스와이프 거리(px).
    const SCROLL_STEP = { duration: 850, wheelThreshold: 60, wheelIdle: 220, swipeThreshold: 42 };
    let stepRaf = 0, stepDestination = null;
    let wheelTotal = 0, wheelDirection = 0, lastWheelAt = 0, wheelConsumed = false;
    let touchGesture = null;
    function cancelStep() {
      cancelAnimationFrame(stepRaf); stepRaf = 0; stepDestination = null;
    }
    function resetGestures() {
      wheelTotal = 0; wheelDirection = 0; lastWheelAt = 0; wheelConsumed = false; touchGesture = null;
    }
    function acceptsStep(target) {
      if (!loaded || !viewActive || window.DesignerReturnState?.restoring || document.body.classList.contains('mobile-menu-open')) return false;
      const element = target instanceof Element ? target : document.activeElement;
      if (element?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], .mobile-menu, [role="dialog"]')) return false;
      // 독립적으로 스크롤되는 내용은 해당 영역의 기본 동작을 유지합니다.
      for (let node = element; node && node !== scene && node !== document.body; node = node.parentElement) {
        if (node.scrollHeight > node.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(node).overflowY)) return false;
      }
      const box = scene.getBoundingClientRect();
      return box.top < innerHeight / 2 && box.bottom > innerHeight / 2;
    }
    function stepInDirection(direction) {
      if (stepDestination === null) scrollToState(direction > 0);
    }
    function onStepWheel(event) {
      if (event.defaultPrevented || event.ctrlKey || !event.cancelable || !acceptsStep(event.target)) return;
      if (!event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now(), direction = Math.sign(event.deltaY);
      if (now - lastWheelAt > SCROLL_STEP.wheelIdle) { wheelTotal = 0; wheelConsumed = false; }
      lastWheelAt = now;
      // 이동 중 입력과 같은 제스처의 관성 꼬리는 다음 이동으로 이어지지 않습니다.
      if (stepDestination !== null) { wheelConsumed = true; return; }
      if (wheelConsumed) return;
      if (direction !== wheelDirection) wheelTotal = 0;
      wheelDirection = direction;
      wheelTotal += Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (wheelTotal >= SCROLL_STEP.wheelThreshold) { wheelConsumed = true; wheelTotal = 0; stepInDirection(direction); }
    }
    function onStepTouchStart(event) {
      touchGesture = event.touches.length === 1 && acceptsStep(event.target)
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY, consumed: stepDestination !== null } : null;
    }
    function onStepTouchMove(event) {
      if (!touchGesture) return;
      if (event.touches.length !== 1 || !event.cancelable || !acceptsStep(event.target)) { touchGesture = null; return; }
      const dx = event.touches[0].clientX - touchGesture.x, dy = touchGesture.y - event.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy)) { touchGesture = null; return; }
      if (!dy) return;
      event.preventDefault();
      if (!touchGesture.consumed && Math.abs(dy) >= SCROLL_STEP.swipeThreshold) {
        touchGesture.consumed = true; stepInDirection(Math.sign(dy));
      }
    }
    function onStepKey(event) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || !acceptsStep(event.target)) return;
      if (event.key === ' ' && event.target instanceof Element && event.target.closest('a, button, [role="button"]')) return;
      const direction = ['ArrowDown', 'PageDown', 'End'].includes(event.key) ? 1
        : ['ArrowUp', 'PageUp', 'Home'].includes(event.key) ? -1 : event.key === ' ' ? (event.shiftKey ? -1 : 1) : 0;
      if (!direction) return;
      event.preventDefault();
      if (!event.repeat) stepInDirection(direction);
    }
    function scrollRange() { return Math.max(1, scene.offsetHeight - innerHeight); }
    function readScroll() { return clamp((scrollY - scene.offsetTop) / scrollRange(), 0, 1); }
    function onScroll() {
      if (!viewActive || window.DesignerReturnState?.restoring) return;
      scrollTarget = readScroll(); pointer.active = false;
      if (scrollTarget < .995) resetGalleryHover();
      if (!loaded) return;
      if (scrollTarget <= .001) galleryShuffleArmed = true;
      else if (galleryShuffleArmed) { shuffleGallery(); positionSpreadSlots(); }
      if (scrollTarget < .995) closeDetails(false, true);
      // Explicit scrolling remains usable with motion paused or reduced.
      if (paused || motionReduced) { spread = scrollTarget; settle(); draw(); }
      else wake(650);
      setHint();
    }
    function scrollToState(expanded) {
      if (!viewActive) return;
      cancelStep();
      if (!expanded) closeDetails(false, true);
      const target = expanded ? 1 : 0;
      const destination = () => scene.offsetTop + target * scrollRange();
      const from = scrollY;
      if (motionReduced || paused || Math.abs(destination() - from) < 1) {
        window.scrollTo({ top: destination(), behavior: 'instant' }); onScroll(); return;
      }
      stepDestination = target;
      const started = performance.now();
      function advance(now) {
        stepRaf = 0;
        if (!viewActive) { cancelStep(); return; }
        const progress = clamp((now - started) / SCROLL_STEP.duration, 0, 1);
        window.scrollTo({ top: lerp(from, destination(), smooth(0, 1, progress)), behavior: 'instant' });
        onScroll();
        if (progress < 1) stepRaf = requestAnimationFrame(advance);
        else { stepDestination = null; onScroll(); }
      }
      stepRaf = requestAnimationFrame(advance);
    }
    function updateToolbar() {
      const opacity = viewActive ? smooth(.12, .68, spread) : 1;
      const usable = !viewActive || spread > .3;
      toolbar.style.setProperty('--formation-toolbar', opacity);
      toolbar.classList.toggle('is-revealed', opacity > .001);
      toolbar.inert = !usable; toolbar.setAttribute('aria-hidden', String(!usable));
      if (!usable && toolbar.contains(document.activeElement)) document.activeElement.blur();
      emptyMessage.hidden = !viewActive || spread < .995 || visibleTeams.some(Boolean) || unmappedResults.length > 0;
      unmappedList.hidden = !viewActive || spread < .995 || unmappedResults.length === 0;
    }
    function changeFormationView(view) {
      const active = view === 'slide';
      if (window.DesignerReturnState?.restoring) { viewActive = active; updateToolbar(); return; }
      if (loaded && active === viewActive) { updateToolbar(); return; }
      if (!active) {
        savedProgress = stepDestination ?? (spread >= .5 ? 1 : 0);
        cancelStep(); resetGestures();
        closeDetails(false, true); viewActive = false; pointer.active = false; resetGalleryHover();
        cancelAnimationFrame(raf); raf = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        viewActive = true;
        window.scrollTo({ top: scene.offsetTop + savedProgress * scrollRange(), behavior: 'instant' });
        if (loaded) { layout(); onScroll(); draw(); }
      }
      updateToolbar();
    }
    function captureReturnGallery() {
      if (!loaded) return null;
      return {
        order: galleryOrder.map(team => source[team].projectId),
        offsets: galleryOffsets.map(({ x, y }) => ({ x, y })),
        progress: viewActive ? (stepDestination ?? scrollTarget) : savedProgress,
        selectedProject: selectedTeam >= 0 ? source[selectedTeam].projectId : null,
        revision: galleryRevision, shuffleArmed: galleryShuffleArmed, paused, floatTime: galleryTime
      };
    }
    function restoreReturnGallery(state, view) {
      cancelStep(); resetGestures(); cancelAnimationFrame(raf); raf = 0;
      pointer.active = false; pointer.down = false;
      viewActive = view === 'slide';
      const progress = Number.isFinite(state?.progress) ? clamp(state.progress, 0, 1) : 0;
      savedProgress = progress;
      const indexes = new Map(source.map((project, team) => [project.projectId, team]));
      if (Array.isArray(state?.order) && state.order.length === source.length && new Set(state.order).size === source.length && state.order.every(id => indexes.has(id))) {
        galleryOrder = state.order.map(id => indexes.get(id));
        galleryOffsets = galleryOrder.map((_, slot) => ({
          x: Number.isFinite(state.offsets?.[slot]?.x) ? clamp(state.offsets[slot].x, -.1, .1) : 0,
          y: Number.isFinite(state.offsets?.[slot]?.y) ? clamp(state.offsets[slot].y, -.14, .14) : 0
        }));
        galleryOrder.forEach(team => iconList.appendChild(iconButtons[team].parentElement));
      }
      galleryRevision = Number.isInteger(state?.revision) ? Math.max(0, state.revision) : 0;
      galleryShuffleArmed = state?.shuffleArmed ?? progress <= .001;
      paused = !!state?.paused;
      galleryTime = Number.isFinite(state?.floatTime) ? Math.max(0, state.floatTime) : 0;
      hoveredTeam = focusedTeam = -1; galleryHover.fill(0); detailOrigins.fill(null);
      selectedTeam = -1; detailProgress.fill(0);
      designerPanel.classList.remove('is-open'); designerPanel.hidden = true; designerPanel.inert = true;
      designerPanel.setAttribute('aria-hidden', 'true');
      iconButtons.forEach(button => button.setAttribute('aria-expanded', 'false'));
      if (viewActive) {
        window.scrollTo({ top: scene.offsetTop + progress * scrollRange(), behavior: 'instant' });
        layout(); positionSpreadSlots(); spread = scrollTarget = readScroll(); settle(); draw();
        const team = indexes.get(state?.selectedProject);
        if (progress >= .995 && team !== undefined && visibleTeams[team]) openDetails(team, false, true);
      }
      updateToolbar(); setHint();
    }
    function createDesignerLink(member) {
      const card = document.createElement('a'); card.className = 'formation-person-card';
      const url = new URL(member.href || DESIGNER_DETAIL_PATH, document.baseURI);
      url.searchParams.set('id', member.id);
      card.href = url.href; card.setAttribute('page-transition', '');
      card.dataset.designerId = member.id;
      card.setAttribute('aria-label', member.nameKo + ' 상세 페이지 보기');
      const portrait = document.createElement('img'); portrait.className = 'formation-portrait'; portrait.alt = ''; portrait.src = member.image;
      const copy = document.createElement('span'); copy.className = 'formation-copy';
      const name = document.createElement('span'); name.className = 'formation-name'; name.textContent = member.nameKo;
      const english = document.createElement('span'); english.className = 'formation-name-en'; english.textContent = member.nameEn;
      const plus = document.createElement('span'); plus.className = 'formation-plus'; plus.setAttribute('aria-hidden', 'true');
      copy.append(name, english); card.append(portrait, copy, plus);
      return card;
    }
    function applyDesignerFilter(detail) {
      const ids = new Set(detail.visibleIds);
      filterActive = detail.query.length > 0 || detail.initial !== 'all'; resultCount = ids.size;
      visibleTeams = profiles.map(profile => profile.members.some(member => ids.has(member.id)));
      // A designer without a supplied team SVG still has a searchable profile.
      // Do not invent an icon or associate that designer with a different team.
      unmappedResults = filterActive ? window.DESIGNERS.filter(member => ids.has(member.id) && !mappedIds.has(member.id)) : [];
      unmappedList.replaceChildren();
      unmappedResults.forEach(member => {
        unmappedList.appendChild(createDesignerLink(member));
      });
      if (selectedTeam >= 0 && !visibleTeams[selectedTeam]) closeDetails(false, true);
      iconButtons.forEach((button, team) => { button.hidden = !visibleTeams[team]; });
      if (!visibleTeams[hoveredTeam]) hoveredTeam = -1;
      if (!visibleTeams[focusedTeam]) focusedTeam = -1;
      refreshGalleryHover();
      if (loaded && viewActive) { draw(); setHint(); }
    }
    function positionDetails() {
      if (selectedTeam < 0) return;
      const count = Math.max(fragments[selectedTeam].length, profiles[selectedTeam].members.length, 1), slot = spreadSlots[selectedTeam];
      const panelWidth = Math.min(620, width - 16), narrow = width < 500;
      const pieceSpace = narrow ? Math.min(76, panelWidth * .22) : 126;
      const headingBottom = spreadHeading.offsetTop + spreadHeading.offsetHeight;
      const rowGap = height < 300 ? 8 : 12;
      const topBound = height < 260 ? 8 : headingBottom + 10;
      const cardHeight = Math.max(40, Math.min(narrow ? 90 : 112, (height - topBound - 42 - rowGap * (count - 1)) / count));
      const panelHeight = 34 + cardHeight * count + rowGap * (count - 1);
      const left = clamp(slot.x - pieceSpace / 2, 8, width - panelWidth - 8);
      const top = clamp(slot.y - panelHeight / 2, topBound, Math.max(topBound, height - panelHeight - 8));
      const portrait = Math.min(cardHeight * .74, narrow ? 58 : 84);
      Object.entries({ '--piece-space': pieceSpace, '--row-gap': rowGap, '--card-height': cardHeight,
        '--card-padding': Math.max(7, cardHeight * .12), '--card-gap': narrow ? 9 : 16,
        '--portrait-size': portrait, '--name-size': Math.min(narrow ? 16 : 22, cardHeight * .29),
        '--en-size': Math.min(narrow ? 7 : 13, cardHeight * .17)
      }).forEach(([key, value]) => designerPanel.style.setProperty(key, value + 'px'));
      Object.assign(designerPanel.style, { left: left + 'px', top: top + 'px', width: panelWidth + 'px' });
      detailTargets[selectedTeam] = fragments[selectedTeam].map((_, i) => {
        const row = fragmentRows[selectedTeam][i];
        return {
          x: left + (pieceSpace - 12) / 2, y: top + 34 + row * (cardHeight + rowGap) + cardHeight / 2,
          size: Math.min(cardHeight * .86, pieceSpace - 18),
          studentId: profiles[selectedTeam].members[row]?.id || null
        };
      });
    }
    function syncDetailsInstantly() {
      detailProgress.forEach((_, team) => { detailProgress[team] = team === selectedTeam ? 1 : 0; });
    }
    function closeDetails(restoreFocus = false, immediate = false) {
      const previous = selectedTeam;
      if (previous < 0 && !detailProgress.some(progress => progress > 0)) return;
      selectedTeam = -1;
      designerPanel.classList.remove('is-open'); designerPanel.inert = true;
      designerPanel.setAttribute('aria-hidden', 'true');
      iconButtons.forEach(button => button.setAttribute('aria-expanded', 'false'));
      if (previous >= 0 && designerPanel.contains(document.activeElement)) {
        if (restoreFocus) iconButtons[previous].focus({ preventScroll: true });
        else document.activeElement.blur();
      }
      if (immediate || motionReduced || paused) { syncDetailsInstantly(); if (loaded) draw(); }
      else if (previous >= 0) wake(850);
      if (loaded) setHint();
    }
    function openDetails(team, keyboard = false, immediate = false) {
      if (!viewActive || !visibleTeams[team] || spread < .995 || scrollTarget < .995) return;
      if (selectedTeam === team) { closeDetails(); return; }
      detailOrigins[team] = galleryPose(team);
      selectedTeam = team; pointer.active = false; resetGalleryHover();
      const profile = profiles[team];
      designerPanelTitle.textContent = '';
      designerPanelTitle.setAttribute('aria-hidden', 'true');
      designerPanel.removeAttribute('aria-labelledby');
      designerPanel.setAttribute('aria-label', '디자이너 정보');
      designerRows.replaceChildren();
      profile.members.forEach((member, i) => {
        const card = createDesignerLink(member);
        card.style.setProperty('--row', i);
        designerRows.appendChild(card);
      });
      positionDetails();
      designerPanel.hidden = false;
      designerPanel.inert = false; designerPanel.setAttribute('aria-hidden', 'false'); designerPanel.classList.add('is-open');
      iconButtons.forEach((button, i) => button.setAttribute('aria-expanded', String(i === team)));
      if (immediate || motionReduced || paused) { syncDetailsInstantly(); draw(); } else wake(1100);
      if (keyboard) designerRows.firstElementChild.focus({ preventScroll: true });
      setHint();
    }
    function shuffleGallery() {
      const previous = galleryOrder, next = [...previous];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      // 우연히 같은 순서가 나오더라도 새로 내려올 때는 다른 배치를 보여줍니다.
      if (next.length > 1 && next.every((team, i) => team === previous[i])) next.push(next.shift());
      galleryOrder = next;
      galleryOffsets = next.map(() => ({ x: random(-.1, .1), y: random(-.14, .14) }));
      galleryShuffleArmed = false; galleryRevision++;
      // 화면의 순서와 키보드 탐색 순서만 바꾸고 학생/색상 연결은 유지합니다.
      galleryOrder.forEach(team => iconList.appendChild(iconButtons[team].parentElement));
    }
    function makeSpreadSlots() {
      // 중앙에 모인 범위 안에서 위치를 섞되 아이콘 크기와 최소 간격은 유지합니다.
      const headingBottom = spreadHeading.offsetTop + spreadHeading.offsetHeight;
      const top = Math.min(height * .3, headingBottom + Math.min(26, height * .045));
      const bottom = Math.max(10, Math.min(30, height * .045));
      const availableHeight = Math.max(40, height - top - bottom);
      let rows;
      if (width / availableHeight > 3.4) rows = [7, 7];
      else if (width >= 750) rows = [5, 4, 5];
      else if (width >= 500) rows = [4, 3, 4, 3];
      else rows = [3, 3, 3, 3, 2];
      const rowHeight = availableHeight / rows.length, columnWidth = width * .94 / Math.max(...rows);
      const size = Math.max(12, Math.min(112, columnWidth * .55, rowHeight * .65));
      const compactX = width < 750 ? SETTINGS.galleryMobileSpreadX : SETTINGS.gallerySpreadX;
      const compactY = width < 750 ? SETTINGS.galleryMobileSpreadY : SETTINGS.gallerySpreadY;
      // 무작위 위치 편차(x ±.1, y ±.14)까지 포함해 서로 겹치지 않도록 제한합니다.
      const cellWidth = Math.min(columnWidth, Math.max(columnWidth * compactX, size / .78));
      const cellHeight = Math.min(rowHeight, Math.max(rowHeight * compactY, size / .70));
      const galleryTop = top + (availableHeight - cellHeight * rows.length) / 2;
      // 떠다니는 거리와 호버 확대까지 확보하고 좁은 화면에서는 위치 편차만 줄입니다.
      const floatFactor = Math.min(1, size / 100);
      const jitterRoomX = clamp((cellWidth - size * SETTINGS.galleryHoverScale - 2 * SETTINGS.galleryFloatX * floatFactor) / (cellWidth * .2), 0, 1);
      const jitterRoomY = clamp((cellHeight - size * SETTINGS.galleryHoverScale - 2 * SETTINGS.galleryFloatY * floatFactor) / (cellHeight * .28), 0, 1);
      const slots = [];
      rows.forEach((columns, row) => {
        for (let col = 0; col < columns; col++) {
          const i = slots.length;
          const offset = galleryOffsets[i];
          slots.push({ x: width / 2 + (col - (columns - 1) / 2) * cellWidth + offset.x * cellWidth * jitterRoomX,
            y: galleryTop + (row + .5) * cellHeight + offset.y * cellHeight * jitterRoomY, size });
        }
      });
      const byTeam = [];
      galleryOrder.forEach((team, slot) => { byTeam[team] = slots[slot]; });
      return byTeam;
    }
    function positionSpreadSlots() {
      spreadSlots = makeSpreadSlots();
      iconButtons.forEach((button, team) => {
        const slot = spreadSlots[team], hitSize = Math.max(44, slot.size);
        Object.assign(button.style, { left: slot.x - hitSize / 2 + 'px', top: slot.y - hitSize / 2 + 'px', width: hitSize + 'px', height: hitSize + 'px' });
      });
      positionDetails();
    }
    function targetPoints() {
      const wordWidth = Math.min(width * .93, Math.max(45, height - 76) * word.width / word.height, 1250) * SETTINGS.wordScale;
      const wordHeight = wordWidth * word.height / word.width;
      const left = (width - wordWidth) / 2, top = (height - wordHeight) / 2;
      spacing = Math.max(SETTINGS.minimumSpacing, wordWidth / SETTINGS.columns);
      const mask = document.createElement("canvas"); mask.width = Math.ceil(width); mask.height = Math.ceil(height);
      const mctx = mask.getContext("2d", { willReadFrequently: true });
      mctx.drawImage(maskImage, left, top, wordWidth, wordHeight);
      const pixels = mctx.getImageData(0, 0, mask.width, mask.height).data;
      const points = [], stepY = spacing * .88;
      for (let row = 0, y = top; y < top + wordHeight; row++, y += stepY) {
        for (let x = left + (row % 2) * spacing / 2; x < left + wordWidth; x += spacing) {
          const tx = x + random(-.23, .23) * spacing, ty = y + random(-.23, .23) * spacing;
          const ix = Math.round(tx), iy = Math.round(ty);
          if (ix >= 0 && iy >= 0 && ix < mask.width && iy < mask.height && pixels[(iy * mask.width + ix) * 4 + 3] > 210) points.push({ x: tx, y: ty });
        }
      }
      // Even representation of all 14 icons without a repeating color pattern.
      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); [points[i], points[j]] = [points[j], points[i]];
      }
      return points;
    }
    function layout(initial = false) {
      if (!viewActive) return;
      const box = stage.getBoundingClientRect();
      if (box.width < 1 || box.height < 1) return;
      const nextWordShiftY = innerHeight * SETTINGS.wordCenterY - (box.top + box.height / 2);
      const wordPositionChanged = Math.abs(nextWordShiftY - wordShiftY) > .1;
      wordShiftY = nextWordShiftY;
      if (!initial && Math.abs(width - box.width) < .5 && Math.abs(height - box.height) < .5) {
        if (wordPositionChanged) draw();
        return;
      }
      width = box.width; height = box.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      positionSpreadSlots();
      particles = targetPoints().map((point, i) => {
        const angle = random(-.65, .65), team = i % sprites.length;
        const bank = fragments[team], piece = bank[Math.floor(i / sprites.length) % bank.length];
        // Sample each trajectory once so reverse scrolling retraces the same
        // path. Individual directions dissolve the word instead of scaling it.
        const direction = random(0, Math.PI * 2), driftDistance = random(.24, .62);
        return { id: i, assembly: false, tx: point.x, ty: point.y, x: point.x, y: point.y, vx: 0, vy: 0,
          idle: { phaseX: random(0, Math.PI * 2), phaseY: random(0, Math.PI * 2), phaseTurn: random(0, Math.PI * 2),
            rate: random(.6, 1.05), amplitude: clamp(spacing * .14, .8, 2.6) * random(.65, 1), turn: random(.018, .045) },
          departure: { delay: random(0, .09), speed: random(.82, 1.25), depth: random(2.2, 4.8),
            dx: Math.cos(direction) * width * driftDistance, dy: Math.sin(direction) * height * driftDistance,
            curve: random(-.16, .16) * Math.min(width, height), nx: -Math.sin(direction), ny: Math.cos(direction),
            turn: random(-1.1, 1.1) },
          angle, targetAngle: angle, spin: 0, size: spacing * SETTINGS.iconScale * random(.78, 1.2), sprite: piece, team };
      });
      // Select exactly ONE existing instance of each SVG/color pair. The choice
      // stays fixed throughout scrolling in either direction.
      for (const bank of fragments) for (const piece of bank) {
        const slot = spreadSlots[piece.team];
        let selected, distance = Infinity;
        for (const p of particles) {
          if (p.sprite !== piece) continue;
          const d = Math.hypot(p.tx - slot.x, p.ty - slot.y);
          if (d < distance) { selected = p; distance = d; }
        }
        if (selected) selected.assembly = true;
      }
      particles.sort((a, b) => Number(a.assembly) - Number(b.assembly) || a.sprite.layer - b.sprite.layer);
      scrollTarget = readScroll(); spread = scrollTarget;
      if (initial && !window.DesignerReturnState?.restoring && !motionReduced && spread === 0) scatter(); else { settle(); draw(); }
      setHint();
    }
    function settle() {
      for (const p of particles) { p.x = p.tx; p.y = p.ty; p.vx = p.vy = p.spin = 0; p.angle = p.targetAngle; }
    }
    function draw() {
      if (!loaded || !viewActive || !width || !height) return;
      // 검색 영역이 비어 있는 첫 화면은 글자를 화면 중앙에 놓습니다.
      // 캔버스를 이동하므로 작은 화면에서도 글자 조각이 위쪽에서 잘리지 않습니다.
      // 스크롤 중에는 원래 좌표로 돌아가 정렬된 아이콘/정보 카드 위치를 유지합니다.
      const wordOffset = Math.round(wordShiftY * (1 - smooth(0, .65, spread)) * 100) / 100;
      const wordTransform = 'translateY(' + wordOffset + 'px)';
      if (canvas.style.transform !== wordTransform) canvas.style.transform = wordTransform;
      designerPanel.hidden = selectedTeam < 0 && !detailProgress.some(progress => progress > 0);
      ctx.clearRect(0, 0, width, height);
      const galleryPoses = spreadSlots.map((_, team) => galleryPose(team));
      // 투명 버튼도 실제로 그려진 아이콘의 위치와 크기를 따라갑니다.
      iconButtons.forEach((button, team) => {
        const base = spreadSlots[team], pose = galleryPoses[team];
        button.style.transform = 'translate(' + (pose.x - base.x) + 'px,' + (pose.y - base.y) + 'px) scale(' + pose.size / base.size + ')';
      });
      const t = smooth(.08, 1, spread), fragmentOpacity = 1 - smooth(.88, 1, t);
      // Subtle independent motion around each fixed glyph anchor. It fades
      // out early in the scroll; the finished gallery has its own slow drift.
      const idleWeight = motionReduced ? 0 : 1 - smooth(0, .16, spread);
      // Foreground groups assemble while background objects scatter separately.
      // No shared vanishing point or global transform is applied to the word.
      lastDraw = [];
      if (t < 1) for (const p of particles) {
        const departure = p.departure;
        const local = clamp((spread - departure.delay) / (1 - departure.delay), 0, 1);
        const drift = smooth(0, 1, local * departure.speed);
        const perspective = p.assembly ? 1 : 1 / (1 + Math.pow(local, 1.25) * departure.depth);
        const opacity = p.assembly ? fragmentOpacity * lerp(1, visibleTeams[p.team] ? 1 : 0, t) : (1 - smooth(.08, 1, local)) * Math.pow(perspective, .35);
        if (opacity < .001) continue;
        // Only the chosen color groups converge into their original icons.
        const travel = p.assembly ? smooth(0, .86, t) : 0;
        const slot = galleryPoses[p.team], piece = p.sprite;
        const finalX = slot.x + piece.offsetX * slot.size, finalY = slot.y + piece.offsetY * slot.size;
        const w = lerp(p.size * Math.min(1, piece.ratio), slot.size * piece.relativeWidth, travel) * perspective;
        const h = lerp(p.size / Math.max(1, piece.ratio), slot.size * piece.relativeHeight, travel) * perspective;
        const size = Math.max(w, h);
        const dx = finalX - p.tx, dy = finalY - p.ty, distance = Math.max(1, Math.hypot(dx, dy));
        const bend = Math.sin(travel * Math.PI) * Math.min(60, spacing * 2) * (p.team % 2 ? 1 : -1);
        const margin = size * .74;
        const arc = Math.sin(drift * Math.PI) * departure.curve;
        const idle = p.idle, phase = idleTime * idle.rate;
        const idleX = Math.sin(phase + idle.phaseX) * idle.amplitude * idleWeight;
        const idleY = Math.sin(phase * .83 + idle.phaseY) * idle.amplitude * .85 * idleWeight;
        const idleTurn = Math.sin(phase * .7 + idle.phaseTurn) * idle.turn * idleWeight;
        const x = (p.assembly ? clamp(lerp(p.x, finalX, travel) - dy / distance * bend, margin, width - margin)
          : p.x + departure.dx * drift + departure.nx * arc) + idleX;
        const y = (p.assembly ? clamp(lerp(p.y, finalY, travel) + dx / distance * bend, margin, height - margin)
          : p.y + departure.dy * drift + departure.ny * arc) + idleY;
        const angle = (p.assembly ? p.angle * (1 - travel) : p.angle + departure.turn * drift) + idleTurn;
        // Leaving objects may exit the canvas naturally; do not pile them up
        // against its edges by clamping their positions.
        if (!p.assembly && (x < -size || y < -size || x > width + size || y > height + size)) continue;
        ctx.save(); ctx.globalAlpha = opacity; ctx.translate(x, y); ctx.rotate(angle);
        ctx.drawImage(piece.image, -w / 2, -h / 2, w, h); ctx.restore();
        lastDraw.push({ id: p.id, name: piece.name, color: piece.color, kind: "color-group", role: p.assembly ? "assembly" : "background", x, y, size, angle, opacity });
      }
      // Pieces converge to their own original local positions. Finish with the
      // original complete SVG image so all layer overlaps and edges are exact.
      // Swap only after every selected group is exactly aligned, avoiding a
      // second offset silhouette while the complete SVG becomes visible.
      const iconOpacity = smooth(.88, 1, t);
      if (iconOpacity >= .001) {
        const attention = Math.max(...detailProgress);
        sprites.forEach((icon, team) => {
          if (!visibleTeams[team]) return;
          const { x, y, size } = galleryPoses[team];
          const detail = detailProgress[team];
          const opacity = iconOpacity * (1 - smooth(0, .18, detail)) * lerp(1, .14, attention);
          if (opacity < .001) return;
          ctx.globalAlpha = opacity;
          ctx.drawImage(icon.image, x - size / 2, y - size / 2, size, size);
          lastDraw.push({ name: icon.name, kind: "icon", team, x, y, size, angle: 0, opacity });
        });
        // Reuse the same fill-color groups, moving the intact group beside its
        // member card. No subpath splitting or duplicate full icon is used.
        fragments.forEach((bank, team) => {
          const detail = detailProgress[team];
          if (detail < .001 || !detailTargets[team].length) return;
          const slot = galleryPoses[team], travel = smooth(0, 1, detail);
          const opacity = iconOpacity * smooth(0, .18, detail);
          bank.forEach((piece, i) => {
            const target = detailTargets[team][i];
            const x = lerp(slot.x, target.x, travel), y = lerp(slot.y, target.y, travel);
            const size = lerp(slot.size, target.size, travel);
            ctx.globalAlpha = opacity; ctx.drawImage(piece.image, x - size / 2, y - size / 2, size, size);
            lastDraw.push({ name: piece.name, color: piece.color, kind: 'color-group', role: 'detail', team, studentId: target.studentId, x, y, size, angle: 0, opacity });
          });
        });
        ctx.globalAlpha = 1;
      }
      const titleOpacity = smooth(.35, .88, spread);
      spreadHeading.style.opacity = String(titleOpacity);
      spreadHeading.style.transform = "translateY(" + (1 - titleOpacity) * 12 + "px)";
      spreadHeading.setAttribute("aria-hidden", String(spread < .95));
      iconList.hidden = spread < .995 || scrollTarget < .995;
      updateToolbar();
    }
    function wake(duration = 2600) {
      if (!viewActive || paused || motionReduced || document.hidden || !loaded || window.DesignerReturnState?.restoring) return;
      until = Math.max(until, performance.now() + duration);
      if (!raf) { previousTime = 0; raf = requestAnimationFrame(frame); }
    }
    function frame(now) {
      raf = 0;
      if (!viewActive || paused || motionReduced || document.hidden || window.DesignerReturnState?.restoring) return;
      const dt = previousTime ? clamp((now - previousTime) / 16.667, .25, 2) : 1;
      previousTime = now;
      if (spread < .16) idleTime += dt / 60;
      if (galleryIdleActive()) galleryTime += dt / 60;
      let hoverMoving = false;
      galleryHover.forEach((value, team) => {
        const target = hoverTarget(team);
        let next = lerp(value, target, 1 - Math.pow(.78, dt));
        if (Math.abs(next - target) < .001) next = target;
        galleryHover[team] = next;
        if (next !== target) hoverMoving = true;
      });
      spread = lerp(spread, scrollTarget, 1 - Math.pow(.78, dt));
      if (Math.abs(spread - scrollTarget) < .0005) spread = scrollTarget;
      let detailMoving = false;
      detailProgress.forEach((progress, team) => {
        const target = team === selectedTeam ? 1 : 0;
        let next = lerp(progress, target, 1 - Math.pow(.86, dt));
        if (Math.abs(next - target) < .0005) next = target;
        detailProgress[team] = next;
        if (next !== target) detailMoving = true;
      });
      const radius = Math.max(35, Math.min(SETTINGS.pointerRadius, width * .13));
      let motion = 0;
      if (spread < 1 || scrollTarget < 1) for (const p of particles) {
        p.vx += (p.tx - p.x) * SETTINGS.spring * dt; p.vy += (p.ty - p.y) * SETTINGS.spring * dt;
        if (pointer.active && spread < .005 && scrollTarget === 0) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y, d = Math.hypot(dx, dy);
          if (d < radius) {
            const power = (1 - d / radius) ** 2 * (pointer.down ? 4.2 : 2.4) * dt;
            p.vx += dx / Math.max(d, .1) * power; p.vy += dy / Math.max(d, .1) * power;
            p.spin += power * .004 * (dx < 0 ? -1 : 1);
          }
        }
        const damping = SETTINGS.damping ** dt;
        p.vx *= damping; p.vy *= damping; p.x += p.vx * dt; p.y += p.vy * dt;
        p.spin += (p.targetAngle - p.angle) * .023 * dt; p.spin *= .8 ** dt; p.angle += p.spin * dt;
        const margin = p.size * .74;
        p.x = clamp(p.x, margin, width - margin); p.y = clamp(p.y, margin, height - margin);
        motion = Math.max(motion, Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y), Math.abs(p.angle - p.targetAngle));
      }
      draw();
      setHint();
      if (idleActive() || galleryIdleActive() || hoverMoving || now < until || motion > .12 || spread !== scrollTarget || detailMoving) raf = requestAnimationFrame(frame);
      else if (!pointer.active) { settle(); draw(); }
    }
    function scatter() {
      if (readScroll() > .001) { scrollToState(false); return; }
      if (paused || motionReduced) { settle(); draw(); return; }
      pointer.active = false;
      for (const p of particles) {
        const margin = p.size;
        p.x = random(margin, width - margin); p.y = random(margin, height - margin);
        p.vx = random(-4, 4); p.vy = random(-4, 4); p.angle = random(-Math.PI, Math.PI); p.spin = random(-.06, .06);
      }
      wake(2700);
    }
    function setHint() {
      const message = selectedTeam >= 0 ? "빈 곳을 누르면 아이콘이 다시 모입니다." : filterActive && spread > .995 ? '검색 결과 ' + resultCount + '명 · 아이콘 ' + visibleTeams.filter(Boolean).length + '개' : spread > .995 ? "아이콘을 누르면 디자이너를 볼 수 있습니다." : scrollTarget > .01 ? "14개의 아이콘이 하나씩 펼쳐집니다." : "아래로 스크롤하면 아이콘이 펼쳐집니다.";
      if (hint.textContent !== message) hint.textContent = message;
      spreadButton.disabled = false;
      spreadButton.setAttribute("aria-pressed", String(scrollTarget > .5));
      spreadButton.textContent = scrollTarget > .5 ? "글자로 모으기 ↑" : "아이콘 펼치기 ↓";
      pauseButton.setAttribute("aria-pressed", String(paused)); pauseButton.textContent = paused ? "다시 움직이기" : "움직임 멈추기";
      pauseButton.disabled = motionReduced || spread > .01;
      replayButton.disabled = (paused || motionReduced) && scrollTarget < .001;
    }
    function locate(event) {
      if (!viewActive) return;
      if (scrollTarget > .001 || spread > .001) return;
      if (event.pointerType === "touch" && !pointer.down) return;
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left; pointer.y = event.clientY - box.top; pointer.active = true; wake();
    }
    canvas.addEventListener("pointermove", locate);
    canvas.addEventListener("pointerdown", (event) => { pointer.down = true; locate(event); });
    const release = () => { pointer.active = false; pointer.down = false; wake(); };
    canvas.addEventListener("pointerleave", release); canvas.addEventListener("pointercancel", release);
    document.addEventListener('click', event => {
      if (!event.target.closest('.icon-hit, .formation-panel')) closeDetails();
    });
    document.addEventListener('designer:viewchange', event => changeFormationView(event.detail.view));
    document.addEventListener('designer-filter-change', event => applyDesignerFilter(event.detail));
    designerClose.addEventListener('click', () => closeDetails(true));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && selectedTeam >= 0) { event.preventDefault(); closeDetails(true); }
    });
    window.addEventListener("pointerup", release); window.addEventListener("blur", release);
    window.addEventListener('blur', resetGalleryHover);
    window.addEventListener('wheel', onStepWheel, { passive: false });
    window.addEventListener('touchstart', onStepTouchStart, { passive: true });
    window.addEventListener('touchmove', onStepTouchMove, { passive: false });
    window.addEventListener('touchend', () => { touchGesture = null; }, { passive: true });
    window.addEventListener('touchcancel', () => { touchGesture = null; }, { passive: true });
    window.addEventListener('keydown', onStepKey);
    window.addEventListener('blur', resetGestures);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      if (!loaded || !viewActive) return;
      const destination = stepDestination ?? (scrollTarget >= .5 ? 1 : 0);
      layout(); scrollToState(destination === 1);
    });
    spreadButton.addEventListener("click", () => scrollToState(scrollTarget <= .5));
    replayButton.addEventListener("click", scatter);
    pauseButton.addEventListener("click", () => {
      paused = !paused; pointer.active = false;
      if (paused && stepDestination !== null) scrollToState(stepDestination === 1);
      if (paused) { cancelAnimationFrame(raf); raf = 0; spread = scrollTarget; syncDetailsInstantly(); settle(); draw(); } else wake();
      setHint();
    });
    reducedMotion.addEventListener("change", (event) => {
      motionReduced = event.matches;
      galleryHover.forEach((_, team) => { galleryHover[team] = hoverTarget(team); });
      if (motionReduced && stepDestination !== null) scrollToState(stepDestination === 1);
      pointer.active = false;
      if (motionReduced) { cancelAnimationFrame(raf); raf = 0; spread = scrollTarget; syncDetailsInstantly(); settle(); draw(); } else wake();
      setHint();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; pointer.active = false; } else wake();
    });
    async function init() {
      if (!ctx) throw new Error("이 브라우저에서는 Canvas를 사용할 수 없습니다.");
      await Promise.all(source.map(async icon => {
        const response = await fetch(new URL(icon.file, iconBaseURL));
        if (!response.ok) throw new Error(icon.file + " 로딩 실패 (" + response.status + ")");
        icon.svg = await response.text();
        const parsed = new DOMParser().parseFromString(icon.svg, 'image/svg+xml');
        if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') {
          throw new Error(icon.file + " 파일이 올바른 SVG가 아닙니다.");
        }
      }));
      [sprites, maskImage, fragments] = await Promise.all([loadWholeIcons(), loadImage(word.src), loadFragments()]);
      fragmentRows = fragments.map((bank, team) => resolveFragmentRows(bank, profiles[team]));
      for (const [team, icon] of source.entries()) {
        const item = document.createElement("li");
        const button = document.createElement('button'); button.type = 'button'; button.className = 'icon-hit';
        button.setAttribute('aria-label', profiles[team].title + ' 디자이너 보기');
        button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', 'designerPanel'); button.hidden = !visibleTeams[team];
        button.addEventListener('pointerenter', event => {
          if (event.pointerType === 'touch') return;
          hoveredTeam = team; refreshGalleryHover();
        });
        const leaveIcon = () => { if (hoveredTeam === team) { hoveredTeam = -1; refreshGalleryHover(); } };
        button.addEventListener('pointerleave', leaveIcon);
        button.addEventListener('pointercancel', leaveIcon);
        button.addEventListener('focus', () => {
          focusedTeam = button.matches(':focus-visible') ? team : -1; refreshGalleryHover();
        });
        button.addEventListener('blur', () => { if (focusedTeam === team) { focusedTeam = -1; refreshGalleryHover(); } });
        button.addEventListener('click', event => openDetails(team, event.detail === 0));
        item.appendChild(button); iconButtons.push(button);
        iconList.appendChild(item);
      }
      loaded = true;
      if (!window.DesignerReturnState?.restoring) {
        if (readScroll() > .001) shuffleGallery();
        layout(true);
      }
      stage.classList.add("ready"); setHint();
      if (viewActive) wake();
      new ResizeObserver(() => layout()).observe(stage);
      window.GyeolhapIcons = Object.freeze({ snapshot: () => ({
        ready: loaded, word: "결합", wholeIconTypes: sprites.length, count: particles.length,
        fragmentTypes: fragments.reduce((sum, bank) => sum + bank.length, 0), fragmentsPerIcon: fragments.map(bank => bank.length),
        colorGroups: fragments.map(bank => bank.map(({ color, shapeCount }) => ({ color, shapeCount }))),
        studentColorAssignments: profiles.map((profile, team) => ({
          projectId: profile.projectId,
          pieces: fragments[team].map((piece, i) => ({
            color: piece.color, studentId: profile.members[fragmentRows[team][i]]?.id || null
          }))
        })),
        assemblyGroupCount: particles.filter(p => p.assembly).length,
        paused, reducedMotion: motionReduced, width, height, running: !!raf, idleActive: idleActive(),
        spread, scrollTarget, stepping: stepDestination !== null, stepTarget: stepDestination, visibleCount: lastDraw.length, renderedIcons: lastDraw,
        galleryOrder: [...galleryOrder], galleryRevision, selectedTeam, detailProgress: [...detailProgress],
        galleryTime, galleryFloating: galleryIdleActive(), galleryHover: [...galleryHover],
        galleryAnchors: spreadSlots.map(({ x, y, size }) => ({ x, y, size })),
        viewActive, filterActive, resultCount, visibleTeams: [...visibleTeams], toolbarVisible: !toolbar.inert, unmappedResultCount: unmappedResults.length,
        selectedDesigners: selectedTeam < 0 ? [] : profiles[selectedTeam].members.map(({ nameKo, nameEn }) => ({ nameKo, nameEn })),
        averageDistance: particles.reduce((sum, p) => sum + Math.hypot(p.x - p.tx, p.y - p.ty), 0) / particles.length,
        names: [...new Set(particles.map(p => p.sprite.name))],
        firstTarget: particles[0] ? { x: particles[0].tx, y: particles[0].ty } : null
      }) });
      window.DesignerReturnState?.registerGallery({ capture: captureReturnGallery, restore: restoreReturnGallery, resume: () => wake() });
    }
    init().catch((error) => {
      cancelAnimationFrame(raf); raf = 0; stage.classList.remove("ready"); ctx?.clearRect(0, 0, width, height);
      loaded = false;
      toolbar.inert = false; toolbar.setAttribute('aria-hidden', 'false');
      toolbar.classList.add('is-revealed'); toolbar.style.setProperty('--formation-toolbar', '1');
      hint.textContent = "아이콘을 불러오지 못했습니다. 그리드 보기로 디자이너를 확인해 주세요.";
      hint.classList.add("error");
      replayButton.disabled = pauseButton.disabled = spreadButton.disabled = true;
      console.error('[designer-icon-slide]', error);
      window.DesignerPage?.changeView('grid');
      window.DesignerReturnState?.galleryFailed();
    });
  })();
  
