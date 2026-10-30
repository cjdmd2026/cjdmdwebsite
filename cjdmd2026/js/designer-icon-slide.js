(() => {
    "use strict";
    /*
     * 적용: 앞서 제공한 designer HTML + designer_02.css와 함께 사용합니다.
     * designer-data.js → designer-icon-data.js → designer_02.js → designer-filter.js → 이 파일 순서로 defer 연결합니다.
     * 학생 이름/사진/연결 변경: designer-data.js의 nameKo, nameEn, image, projectIds.
     * 각 학생의 projectIds에 아래 projectId가 있으면 해당 아이콘에 표시됩니다.
     * 예: projectIds: ["year-on"] → YEAR-ON 아이콘.
     * 아이콘 파일/프로젝트 설명 변경: designer-icon-data.js에서 수정합니다.
     * 클릭 후 학생 옆의 색상 조각 변경: 해당 프로젝트의 studentColors에서 수정합니다.
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
    const ICON_PROJECTS = window.DESIGNER_ICON_PROJECTS || [];

    // wordScale: 포스터 SVG 전체 크기. 원본의 주변 조각과 여백도 포함합니다.
    // wordCenterY: 초기 글자의 화면 내 중심 높이. 0.5 = 화면 중앙, 작은 값 = 위쪽.
    // gallerySpreadX/Y: 펼쳐진 아이콘의 가로/세로 간격. 작을수록 중앙에 모입니다.
    // galleryMobileSpreadX/Y: 750px 미만 화면의 간격. 아이콘 크기와 랜덤 순서는 유지합니다.
    // galleryGap/galleryMobileGap: 확대된 아이콘 사이의 최소 여백(px). 좁은 화면에서는 가능한 범위로 조정합니다.
    // galleryFloatX/Y: 떠다니는 최대 거리(px). 현재 0으로 고정. galleryHoverScale: 호버 배율.
    const SETTINGS = { galleryFloatX: 0, galleryFloatY: 0, galleryFloatSpeed: .75, galleryHoverScale: 1, galleryGap: 32, galleryMobileGap: 18, gallerySpreadX: 1, gallerySpreadY: .8, galleryMobileSpreadX: 1, galleryMobileSpreadY: .86, wordScale: .98, wordCenterY: .5, spring: .024, damping: .82 };
    const canvas = document.getElementById("formation");
    if (!canvas || !document.getElementById("scrollScene")) return;
    if (!Array.isArray(window.DESIGNERS)) { console.error("designer-data.js를 먼저 연결해 주세요."); return; }
    const ctx = canvas.getContext("2d");
    // Compose the moving personal pieces in the same layer as the finished team icon.
    const assemblyCanvas = document.createElement('canvas');
    const assemblyCtx = assemblyCanvas.getContext('2d');
    // The poster recedes separately from the personal SVG pieces embedded in it.
    const backgroundCanvas = document.createElement('canvas');
    const backgroundCtx = backgroundCanvas.getContext('2d');
    const floatCanvas = document.createElement('canvas');
    let floatBatch = window.createHeroSpriteBatch?.(floatCanvas) || null;
    const WORD_RETREAT = { depth: 1.2, blur: 8, fadeStart: .16, fadeEnd: .92 };
    // main-hero.js와 같은 이동 거리(1130 단위 기준), 속도, 2초 진입 곡선.
    const WORD_FLOAT = { referenceWidth: 1130, distance: 27, intro: 2, minSpeed: .2, maxSpeed: .55 };
    // 화면 여백에 더하는 아이콘: 면적에 맞춰 개수를 조절하고 중앙 글자는 비워 둡니다.
    const FLOAT_FIELD = { areaPerIcon: 400, maxCount: 1600, minSize: 3, sizeRange: 9, maxDrift: 22 };
    const stage = document.getElementById("stage"), hint = document.getElementById("hint");
    const replayButton = document.getElementById("replay"), pauseButton = document.getElementById("pause");
    const scene = document.getElementById("scrollScene"), spreadHeading = document.getElementById("spreadHeading");
    const scrollCue = document.getElementById("formationScrollCue");
    const spreadButton = document.getElementById("spreadToggle"), iconList = document.getElementById("iconList");
    const designerPanel = document.getElementById("designerPanel"), designerRows = document.getElementById("designerRows");
    const designerPanelTitle = document.getElementById("designerPanelTitle"), designerClose = document.getElementById("designerClose");
    designerPanel.hidden = true;
    const profiles = ICON_PROJECTS.map(project => ({
      ...project,
      members: window.DESIGNERS.filter(student => (student.projectIds || []).includes(project.projectId))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    }));
    const toolbar = document.querySelector('.designer-heading');
    const source = ICON_PROJECTS.map(project => ({ ...project, name: project.title, svg: "" }));
    // 포스터에 흩어진 개인 SVG를 팀 ID와 색상으로 찾아 같은 팀끼리 결합합니다.
    const word = { src: new URL('../assets/images/designer/gyeolhap-word.svg?v=20261029-10', scriptURL).href };
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let motionReduced = reducedMotion.matches;
    let sprites = [], fragments = [], fragmentRows = [], particles = [], floatingField = [], wordArtwork, wordLayout;
    let width = 0, height = 0, spacing = 20;
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
    let viewActive = scene.classList.contains("slide-view"), savedProgress = 0;
    // 아이콘 갤러리는 그리드의 초성·검색 선택과 무관하게 전체 프로젝트를 표시합니다.
    const visibleTeams = source.map(() => true);
    toolbar.inert = true;
    toolbar.setAttribute('aria-hidden', 'true');
    const detailProgress = source.map(() => 0), detailTargets = source.map(() => []), iconButtons = [];
    const random = (min, max) => min + Math.random() * (max - min);
    const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (a, b, value) => { const t = clamp((value - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    const idleActive = () => viewActive && !paused && !motionReduced && !document.hidden && spread < .16
      && wordArtwork?.floating.length > 0;
    const galleryIdleActive = () => (SETTINGS.galleryFloatX !== 0 || SETTINGS.galleryFloatY !== 0) && viewActive && !paused && !motionReduced && !document.hidden && spread > .86 && visibleTeams.some(Boolean) && selectedTeam < 0 && !detailProgress.some(value => value > 0);
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
    async function loadWordArtwork() {
      const response = await fetch(word.src);
      if (!response.ok) throw new Error('결합 SVG 로딩 실패 (' + response.status + ')');
      const doc = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
      if (doc.querySelector('parsererror') || doc.documentElement.localName !== 'svg') {
        throw new Error('결합 파일이 올바른 SVG가 아닙니다.');
      }
      const root = doc.documentElement, defs = root.querySelector('defs');
      const [originX, originY, sourceWidth, sourceHeight] = root.getAttribute('viewBox').trim().split(/[\s,]+/).map(Number);
      const marked = [...root.querySelectorAll('[data-formation-team][data-formation-color]')];
      const embedded = new Map(marked.map(node => [
        node.getAttribute('data-formation-team') + ':' + node.getAttribute('data-formation-color').toLowerCase(), node
      ]));
      const fragmentCount = fragments.reduce((sum, bank) => sum + bank.length, 0);
      if (marked.length !== fragmentCount || embedded.size !== fragmentCount) {
        throw new Error('결합 SVG에는 개인별 색상 조각이 정확히 하나씩 있어야 합니다.');
      }
      // SVG는 한 번만 래스터화하고, 프레임마다 원본 path를 다시 그리지 않습니다.
      async function rasterize(svg, pixelWidth, pixelHeight, asImage = false) {
        svg.setAttribute('width', pixelWidth); svg.setAttribute('height', pixelHeight);
        const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
        try {
          const image = await loadImage(url);
          if (asImage) return image;
          const layer = document.createElement('canvas'); layer.width = pixelWidth; layer.height = pixelHeight;
          layer.getContext('2d').drawImage(image, 0, 0, pixelWidth, pixelHeight);
          return layer;
        } finally { URL.revokeObjectURL(url); }
      }
      const anchors = source.flatMap((icon, team) => fragments[team].map((piece, index) => {
        const node = embedded.get(icon.projectId + ':' + piece.color);
        if (!node) throw new Error(icon.projectId + ' / ' + piece.color + ' 개인 아이콘의 시작 위치가 없습니다.');
        const [x, y, w, h] = node.getAttribute('data-formation-bounds').split(' ').map(Number);
        if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) {
          throw new Error(icon.projectId + ' 개인 아이콘의 시작 위치가 올바르지 않습니다.');
        }
        // 학생 상세에 쓰는 실제 색상 조각을 그대로 이동시켜 도착할 때 팀 모양을 완성합니다.
        node.remove();
        return { x, y, width: w, height: h, projectId: icon.projectId, color: piece.color,
          studentId: profiles[team].members[fragmentRows[team][index]]?.id || null, sprite: piece };
      }));
      // 획 사이와 바깥의 작은 아이콘은 한 장의 atlas에 모읍니다.
      // data-formation-float = 원본 bounds + 획과의 거리/크기에 따른 움직임 강도.
      const rasterWidth = 2400, rasterHeight = Math.round(rasterWidth * sourceHeight / sourceWidth);
      const atlas = root.cloneNode(false), atlasWidth = 2048, rasterScale = rasterWidth / sourceWidth;
      if (defs) atlas.appendChild(defs.cloneNode(true));
      let tileX = 0, tileY = 0, rowHeight = 0;
      const floating = [...root.querySelectorAll('[data-formation-float]')].map(node => {
        const [x, y, w, h, strength] = node.getAttribute('data-formation-float').split(' ').map(Number);
        const tileWidth = Math.ceil(w * rasterScale) + 4, tileHeight = Math.ceil(h * rasterScale) + 4;
        if (tileX + tileWidth > atlasWidth) { tileX = 0; tileY += rowHeight; rowHeight = 0; }
        const bounds = { x: x - 2 / rasterScale, y: y - 2 / rasterScale,
          width: tileWidth / rasterScale, height: tileHeight / rasterScale };
        const tile = doc.createElementNS(root.namespaceURI, 'svg');
        tile.setAttribute('x', tileX); tile.setAttribute('y', tileY);
        tile.setAttribute('width', tileWidth); tile.setAttribute('height', tileHeight);
        tile.setAttribute('viewBox', [bounds.x, bounds.y, bounds.width, bounds.height].join(' '));
        tile.appendChild(node); atlas.appendChild(tile);
        const piece = { ...bounds, ax: tileX, ay: tileY, gw: tileWidth, gh: tileHeight,
          phase: random(0, Math.PI * 2), speed: random(WORD_FLOAT.minSpeed, WORD_FLOAT.maxSpeed),
          drift: strength * WORD_FLOAT.distance * sourceWidth / WORD_FLOAT.referenceWidth * random(.6, 1) };
        tileX += tileWidth; rowHeight = Math.max(rowHeight, tileHeight);
        return piece;
      });
      const atlasHeight = Math.max(1, tileY + rowHeight);
      atlas.setAttribute('viewBox', [0, 0, atlasWidth, atlasHeight].join(' '));
      const [background, floatAtlas] = await Promise.all([
        rasterize(root, rasterWidth, rasterHeight), rasterize(atlas, atlasWidth, atlasHeight, true)
      ]);
      return { background, anchors, floatAtlas, floating, originX, originY, width: sourceWidth, height: sourceHeight };
    }
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
    // duration/returnDuration: 펼치기/글자로 돌아오기 시간(ms).
    // 이미지 가까이에서는 천천히, 떨어진 뒤에는 빠르게 이동하는 비대칭 속도 곡선입니다.
    // wheelThreshold: 휠 감도(px), swipeThreshold: 스와이프 거리(px).
    const SCROLL_STEP = { duration: 1850, returnDuration: 2100, wheelThreshold: 60, wheelIdle: 220, swipeThreshold: 42 };
    const wordDepartureProgress = t => t * t * t * (4 - 3 * t);
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
      scrollTarget = readScroll();
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
      const duration = expanded ? SCROLL_STEP.duration : SCROLL_STEP.returnDuration;
      function advance(now) {
        stepRaf = 0;
        if (!viewActive) { cancelStep(); return; }
        const progress = clamp((now - started) / duration, 0, 1);
        // 돌아올 때는 같은 곡선을 뒤집어 이미지에 들어가는 마지막 순간에 시간을 배분합니다.
        const pacedProgress = expanded ? wordDepartureProgress(progress) : 1 - wordDepartureProgress(1 - progress);
        window.scrollTo({ top: lerp(from, destination(), pacedProgress), behavior: 'instant' });
        onScroll();
        if (progress < 1) stepRaf = requestAnimationFrame(advance);
        else { stepDestination = null; onScroll(); }
      }
      stepRaf = requestAnimationFrame(advance);
    }
    function updateToolbar() {
      if (scrollCue) {
        // Ease in/out over a longer scroll interval, settling gently at both ends.
        const cueTime = clamp(spread / .4, 0, 1);
        const cueProgress = cueTime * cueTime * cueTime * (cueTime * (6 * cueTime - 15) + 10);
        const cueOpacity = loaded && viewActive ? 1 - cueProgress : 0;
        scrollCue.hidden = cueOpacity <= .001;
        scrollCue.style.opacity = String(cueOpacity);
        scrollCue.style.setProperty('--formation-scroll-offset', (motionReduced ? 0 : 64 * cueProgress) + 'px');
      }
      const opacity = viewActive ? smooth(.12, .68, spread) : 1;
      const usable = !viewActive || spread > .3;
      toolbar.style.setProperty('--formation-toolbar', opacity);
      toolbar.classList.toggle('is-revealed', opacity > .001);
      toolbar.inert = !usable; toolbar.setAttribute('aria-hidden', String(!usable));
      if (!usable && toolbar.contains(document.activeElement)) document.activeElement.blur();
    }
    function changeFormationView(view, keepToolbar = false) {
      const active = view === 'slide';
      if (window.DesignerReturnState?.restoring) { viewActive = active; updateToolbar(); return; }
      if (loaded && active === viewActive) { updateToolbar(); return; }
      if (!active) {
        savedProgress = stepDestination ?? (spread >= .5 ? 1 : 0);
        cancelStep(); resetGestures();
        closeDetails(false, true); viewActive = false; resetGalleryHover();
        cancelAnimationFrame(raf); raf = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        viewActive = true;
        // 보기 버튼으로 돌아오면 제목과 보기 전환 버튼이 보이는 갤러리 위치를 유지합니다.
        if (keepToolbar) savedProgress = 1;
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
    function positionDetails() {
      if (selectedTeam < 0 || designerPanel.hidden || !viewActive) return;
      // 크기와 간격은 CSS에서 관리하고, 표시된 실측값으로 좌표만 계산합니다.
      const slot = spreadSlots[selectedTeam], panelBox = designerPanel.getBoundingClientRect();
      if (!panelBox.width || !panelBox.height) return;
      const style = getComputedStyle(designerPanel);
      const edge = parseFloat(style.getPropertyValue('--panel-edge')) || 0;
      const topBound = parseFloat(style.getPropertyValue('--panel-top-space')) || 0;
      const pieceSpace = parseFloat(style.paddingLeft) || 0;
      const left = clamp(slot.x - pieceSpace / 2, edge, Math.max(edge, width - panelBox.width - edge));
      const top = clamp(slot.y - panelBox.height / 2, topBound, Math.max(topBound, height - panelBox.height - edge));
      const anchors = [...designerRows.querySelectorAll('.formation-piece-anchor')].map(anchor => anchor.getBoundingClientRect());
      detailTargets[selectedTeam] = fragments[selectedTeam].map((_, i) => {
        const row = fragmentRows[selectedTeam][i];
        const anchor = anchors[row];
        return {
          x: left + anchor.left - panelBox.left + anchor.width / 2,
          y: top + anchor.top - panelBox.top + anchor.height / 2,
          size: anchor.width,
          studentId: profiles[selectedTeam].members[row]?.id || null
        };
      });
      Object.assign(designerPanel.style, { left: left + 'px', top: top + 'px' });
    }
    // CSS 수정이나 이미지/폰트 로딩 후에도 카드 실측값과 캔버스 위치를 맞춥니다.
    const detailsObserver = new ResizeObserver(() => {
      if (!loaded || !viewActive || selectedTeam < 0 || designerPanel.hidden) return;
      positionDetails();
      draw();
    });
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
      selectedTeam = team; resetGalleryHover();
      const profile = profiles[team];
      designerPanelTitle.textContent = '';
      designerPanelTitle.setAttribute('aria-hidden', 'true');
      designerPanel.removeAttribute('aria-labelledby');
      designerPanel.setAttribute('aria-label', '디자이너 정보');
      detailsObserver.disconnect();
      designerRows.replaceChildren();
      const count = Math.max(fragments[team].length, profile.members.length, 1);
      designerPanel.style.setProperty('--row-count', count);
      for (let i = 0; i < count; i++) {
        const row = document.createElement('div'); row.className = 'formation-row';
        const anchor = document.createElement('span'); anchor.className = 'formation-piece-anchor';
        anchor.setAttribute('aria-hidden', 'true'); row.appendChild(anchor);
        if (profile.members[i]) {
          const card = createDesignerLink(profile.members[i]);
          card.style.setProperty('--row', i);
          row.appendChild(card);
        }
        designerRows.appendChild(row);
        detailsObserver.observe(row);
        detailsObserver.observe(anchor);
      }
      detailsObserver.observe(designerPanel);
      detailsObserver.observe(designerRows);
      designerPanel.hidden = false;
      designerPanel.inert = false; designerPanel.setAttribute('aria-hidden', 'false'); designerPanel.classList.add('is-open');
      positionDetails();
      iconButtons.forEach((button, i) => button.setAttribute('aria-expanded', String(i === team)));
      if (immediate || motionReduced || paused) { syncDetailsInstantly(); draw(); } else wake(1100);
      if (keyboard) designerRows.querySelector('.formation-person-card')?.focus({ preventScroll: true });
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
      // 화면 양옆의 여백까지 활용해 펼치되 아이콘 크기와 최소 간격은 유지합니다.
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
      // 좌우 편차를 확보하고 상하 편차는 아래에서 주변 아이콘과의 간격에 맞춰 조정합니다.
      const sidePadding = Math.max(8, width * .01);
      // 호버 확대와 클릭 영역까지 포함해 각 아이콘 사이에 여백을 확보합니다.
      const safeSize = Math.max(44, size) * SETTINGS.galleryHoverScale;
      const requestedGap = width < 750 ? SETTINGS.galleryMobileGap : SETTINGS.galleryGap;
      const availableGapX = (width - sidePadding * 2 - safeSize * Math.max(...rows)) / Math.max(1, Math.max(...rows) - 1);
      const availableGapY = (availableHeight - safeSize * rows.length) / Math.max(1, rows.length - 1);
      const gap = Math.max(0, Math.min(requestedGap, availableGapX, availableGapY));
      const safeGap = safeSize + gap;
      // 각 줄의 양 끝을 호버 확대까지 포함한 안전 여백에 맞춥니다.
      const horizontalRoom = width - sidePadding * 2 - Math.max(44, size) * SETTINGS.galleryHoverScale;
      const maxCellHeight = Math.max(1, (availableHeight - safeSize) / Math.max(1, rows.length - 1));
      const cellHeight = Math.min(maxCellHeight, Math.max(rowHeight * compactY, safeGap));
      const galleryTop = top + (availableHeight - cellHeight * rows.length) / 2;
      // 떠다니는 거리와 호버 확대까지 확보하고 좁은 화면에서는 위치 편차만 줄입니다.
      const floatFactor = Math.min(1, size / 100);
     const slots = [];
      rows.forEach((columns, row) => {
        // 아이콘이 적은 줄도 같은 좌우 폭을 사용하도록 줄마다 간격을 계산합니다.
        const maxCellWidth = Math.max(1, horizontalRoom / Math.max(1, columns - 1));
        const cellWidth = Math.min(maxCellWidth, Math.max(maxCellWidth * compactX, safeGap));
        const jitterRoomX = clamp((cellWidth - safeGap - 2 * SETTINGS.galleryFloatX * floatFactor) / (cellWidth * .2), 0, 1);
        for (let col = 0; col < columns; col++) {
          const i = slots.length;
          const offset = galleryOffsets[i];
          // 양 끝은 고정하고 안쪽 아이콘에만 가로 편차를 주어 좌우 공간을 충분히 사용합니다.
          const offsetX = col === 0 || col === columns - 1 ? 0 : offset.x * cellWidth * jitterRoomX;
          slots.push({ x: width / 2 + (col - (columns - 1) / 2) * cellWidth + offsetX,
            y: galleryTop + (row + .5) * cellHeight, size });
        }
      });
      // 각 아이콘의 높이 차이를 3배로 늘리되, 확대된 클릭 영역끼리 겹치지 않게 제한합니다.
      const verticalJitter = cellHeight * .42;
      slots.forEach((slot, i) => {
        let minY = Math.max(top + safeSize / 2, slot.y - verticalJitter);
        let maxY = Math.min(height - bottom - safeSize / 2, slot.y + verticalJitter);
        slots.forEach(other => {
          if (other === slot || Math.abs(other.x - slot.x) >= safeGap) return;
          if (other.y < slot.y) minY = Math.max(minY, other.y + safeGap);
          else maxY = Math.min(maxY, other.y - safeGap);
        });
        if (minY <= maxY) slot.y = clamp(slot.y + galleryOffsets[i].y * cellHeight * 3, minY, maxY);
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
      const wordWidth = Math.min(width * .98, Math.max(45, height - 24) * wordArtwork.width / wordArtwork.height, 1250) * SETTINGS.wordScale;
      const wordHeight = wordWidth * wordArtwork.height / wordArtwork.width;
      const left = (width - wordWidth) / 2, top = (height - wordHeight) / 2;
      wordLayout = { left, top, width: wordWidth, height: wordHeight };
      spacing = Math.max(8.5, wordWidth / 56);
      const scale = wordWidth / wordArtwork.width;
      return wordArtwork.anchors.map(anchor => ({
        x: left + (anchor.x + anchor.width / 2 - wordArtwork.originX) * scale,
        y: top + (anchor.y + anchor.height / 2 - wordArtwork.originY) * scale,
        width: anchor.width * scale, height: anchor.height * scale,
        sprite: anchor.sprite, studentId: anchor.studentId
      }));
    }
    function layoutFloatingField() {
      const pool = wordArtwork.floating.filter(piece => Math.max(piece.width, piece.height) >= 45);
      floatingField = [];
      if (!pool.length) return;
      const count = Math.min(FLOAT_FIELD.maxCount, Math.ceil(width * height / FLOAT_FIELD.areaPerIcon));
      const columns = Math.ceil(Math.sqrt(count * width / height)), rows = Math.ceil(count / columns);
      const centerX = wordLayout.left + wordLayout.width * .53;
      const centerY = wordLayout.top + wordLayout.height * .53;
      for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
        const x = (col + random(.05, .95)) / columns * width;
        const y = (row + random(.05, .95)) / rows * height;
        // 바깥쪽일수록 배치 확률을 낮춰 실제 개수가 줄어드는 부드러운 구름 모양을 만듭니다.
        // 화면 끝도 넓게 페더링하여 사각형 경계나 일정한 끝선이 생기지 않게 합니다.
        const radius = Math.hypot((x - centerX) / (width * .52), (y - centerY) / (height * .58));
        const edgeDistance = Math.min(x, width - x, y, height - y);
        const edgeFade = smooth(0, Math.min(width, height) * .18, edgeDistance);
        const density = (1 - smooth(.35, 1.25, radius)) * edgeFade;
        if (Math.random() > density) continue;
        const distance = Math.hypot((x - centerX) / (wordLayout.width * .39),
          (y - centerY) / (wordLayout.height * .32));
        const opacity = smooth(.85, 1.3, distance) * random(.5, .95) * (.35 + .65 * density) * edgeFade;
        if (opacity < .04) continue;
        const piece = pool[Math.floor(random(0, pool.length))];
        const size = (FLOAT_FIELD.minSize + Math.random() ** 1.7 * FLOAT_FIELD.sizeRange) * (width < 750 ? .8 : 1);
        const ratio = size / Math.max(piece.width, piece.height);
        floatingField.push({ piece, x, y, width: piece.width * ratio, height: piece.height * ratio,
          opacity, phase: random(0, Math.PI * 2), speed: random(.15, .4),
          drift: Math.min(random(8, FLOAT_FIELD.maxDrift), Math.max(0, edgeDistance - size)) });
      }
    }
    function layout(initial = false) {
      if (!viewActive) return;
      // 보기 전환의 perspective/translateZ가 적용된 시각적 크기를 좌표계로 저장하지 않습니다.
      // 캔버스와 투명 버튼은 같은 CSS 레이아웃 크기를 기준으로 배치합니다.
      const nextWidth = stage.clientWidth, nextHeight = stage.clientHeight;
      if (nextWidth < 1 || nextHeight < 1) return;
      const box = stage.getBoundingClientRect();
      const nextWordShiftY = innerHeight * SETTINGS.wordCenterY - (box.top + box.height / 2);
      const wordPositionChanged = Math.abs(nextWordShiftY - wordShiftY) > .1;
      wordShiftY = nextWordShiftY;
      if (!initial && width === nextWidth && height === nextHeight) {
        if (wordPositionChanged) draw();
        return;
      }
      width = nextWidth; height = nextHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      assemblyCanvas.width = canvas.width; assemblyCanvas.height = canvas.height;
      assemblyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      backgroundCanvas.width = canvas.width; backgroundCanvas.height = canvas.height;
      backgroundCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      floatBatch?.resize(width, height, dpr);
      positionSpreadSlots();
      particles = targetPoints().map((point, i) => {
        const piece = point.sprite, team = piece.team;
        return { id: i, assembly: true, tx: point.x, ty: point.y, x: point.x, y: point.y, vx: 0, vy: 0,
          idle: { phaseX: random(0, Math.PI * 2), phaseY: random(0, Math.PI * 2), phaseTurn: random(0, Math.PI * 2),
            rate: random(.6, 1.05), amplitude: 0, turn: 0 },
          angle: 0, targetAngle: 0, spin: 0, size: Math.max(point.width, point.height),
          wordWidth: point.width, wordHeight: point.height, sprite: piece, team, studentId: point.studentId };
      });
      particles.sort((a, b) => Number(a.assembly) - Number(b.assembly) || a.sprite.layer - b.sprite.layer);
      layoutFloatingField();
      scrollTarget = readScroll(); spread = scrollTarget;
      settle(); draw();
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
      assemblyCtx.clearRect(0, 0, width, height);
      backgroundCtx.clearRect(0, 0, width, height);
      const galleryPoses = spreadSlots.map((_, team) => galleryPose(team));
      // 투명 버튼도 실제로 그려진 아이콘의 위치와 크기를 따라갑니다.
      iconButtons.forEach((button, team) => {
        const base = spreadSlots[team], pose = galleryPoses[team];
        button.style.transform = 'translate(' + (pose.x - base.x) + 'px,' + (pose.y - base.y) + 'px) scale(' + pose.size / base.size + ')';
        button.classList.toggle('is-hovered', hoverTarget(team) === 1);
      });
      // 출발·도착 모두 천천히 움직여 글자에서 빠지고 다시 끼워지는 과정을 보여줍니다.
      const t = clamp((spread - .02) / .98, 0, 1);
      const assemblyTravel = smooth(0, .92, t);
      const iconOpacity = smooth(.92, 1, t), fragmentOpacity = 1 - iconOpacity;
      // Subtle independent motion around each fixed glyph anchor. It fades
      // out early in the scroll; the finished gallery stays at its fixed anchors.
      const idleWeight = motionReduced ? 0 : 1 - smooth(0, .16, spread);
      // Use one perspective and fixed glyph anchors for the whole background.
      // All values follow scroll progress so scrolling back restores the word.
      const backgroundLock = smooth(0, .16, spread);
      const backgroundScale = 1 / (1 + WORD_RETREAT.depth * smooth(0, 1, spread));
      const backgroundOpacity = 1 - smooth(WORD_RETREAT.fadeStart, WORD_RETREAT.fadeEnd, spread);
      const backgroundBlur = WORD_RETREAT.blur * smooth(.08, .85, spread);
      lastDraw = [];
      if (backgroundOpacity >= .001) {
        backgroundCtx.drawImage(wordArtwork.background,
          width / 2 + (wordLayout.left - width / 2) * backgroundScale,
          height / 2 + (wordLayout.top - height / 2) * backgroundScale,
          wordLayout.width * backgroundScale, wordLayout.height * backgroundScale);
        const intro = clamp(idleTime / WORD_FLOAT.intro, 0, 1);
        const amount = (intro < .5 ? 4 * intro ** 3 : 1 - (-2 * intro + 2) ** 3 / 2) * idleWeight;
        const scale = wordLayout.width / wordArtwork.width * backgroundScale;
        const left = width / 2 + (wordLayout.left - width / 2) * backgroundScale;
        const top = height / 2 + (wordLayout.top - height / 2) * backgroundScale;
        // main의 GPU 일괄 그리기를 재사용합니다. 미지원/컨텍스트 손실 시 2D로 복원합니다.
        const paintFloating = () => {
          floatBatch?.clear();
          for (const item of floatingField) {
            const piece = item.piece, phase = idleTime * item.speed;
            const dx = Math.sin(phase + item.phase) * item.drift * amount;
            const dy = Math.cos(phase * .81 + item.phase) * item.drift * amount;
            const w = item.width * backgroundScale, h = item.height * backgroundScale;
            const x = width / 2 + (item.x + dx - width / 2) * backgroundScale - w / 2;
            const y = height / 2 + (item.y + dy - height / 2) * backgroundScale - h / 2;
            if (floatBatch) floatBatch.add(piece, x, y, w, h, 0, item.opacity);
            else {
              backgroundCtx.globalAlpha = item.opacity;
              backgroundCtx.drawImage(wordArtwork.floatAtlas, piece.ax, piece.ay, piece.gw, piece.gh, x, y, w, h);
            }
          }
          backgroundCtx.globalAlpha = 1;
          for (const piece of wordArtwork.floating) {
            const phase = idleTime * piece.speed;
            const dx = Math.sin(phase + piece.phase) * piece.drift * amount;
            const dy = Math.cos(phase * .81 + piece.phase) * piece.drift * amount;
            const x = left + (piece.x - wordArtwork.originX + dx) * scale;
            const y = top + (piece.y - wordArtwork.originY + dy) * scale;
            const w = piece.width * scale, h = piece.height * scale;
            if (floatBatch) floatBatch.add(piece, x, y, w, h, 0, 1);
            else backgroundCtx.drawImage(wordArtwork.floatAtlas, piece.ax, piece.ay, piece.gw, piece.gh, x, y, w, h);
          }
        };
        paintFloating();
        if (floatBatch) {
          if (floatBatch.flush(wordArtwork.floatAtlas)) backgroundCtx.drawImage(floatCanvas, 0, 0, width, height);
          else { floatBatch.dispose(); floatBatch = null; paintFloating(); }
        }
      }
      if (t < 1) for (const p of particles) {
        if (p.assembly && fragmentOpacity === 0) continue;
        const perspective = p.assembly ? 1 : backgroundScale;
        const opacity = p.assembly ? lerp(1, visibleTeams[p.team] ? 1 : 0, t) : backgroundOpacity;
        if (opacity < .001) continue;
        // Separate personal pieces converge on the same viewBox to complete their team SVG.
        const travel = p.assembly ? assemblyTravel : 0;
        const slot = galleryPoses[p.team], piece = p.sprite;
        const finalX = slot.x + piece.offsetX * slot.size, finalY = slot.y + piece.offsetY * slot.size;
        const w = lerp(p.wordWidth, slot.size * piece.relativeWidth, travel) * perspective;
        const h = lerp(p.wordHeight, slot.size * piece.relativeHeight, travel) * perspective;
        const size = Math.max(w, h);
        const dx = finalX - p.tx, dy = finalY - p.ty, distance = Math.max(1, Math.hypot(dx, dy));
        const bend = Math.sin(travel * Math.PI) * Math.min(60, spacing * 2) * (p.team % 2 ? 1 : -1);
        const idle = p.idle, phase = idleTime * idle.rate;
        const idleX = Math.sin(phase + idle.phaseX) * idle.amplitude * idleWeight;
        const idleY = Math.sin(phase * .83 + idle.phaseY) * idle.amplitude * .85 * idleWeight;
        const idleTurn = Math.sin(phase * .7 + idle.phaseTurn) * idle.turn * idleWeight;
        // The gallery already provides safe bounds. Clamping moving pieces
        // separately would keep edge icons short of their final positions.
        const x = p.assembly ? lerp(p.x, finalX, travel) - dy / distance * bend + idleX
          : width / 2 + (lerp(p.x, p.tx, backgroundLock) + idleX - width / 2) * backgroundScale;
        const y = p.assembly ? lerp(p.y, finalY, travel) + dx / distance * bend + idleY
          : height / 2 + (lerp(p.y, p.ty, backgroundLock) + idleY - height / 2) * backgroundScale;
        const angle = (p.assembly ? p.angle * (1 - travel) : lerp(p.angle, p.targetAngle, backgroundLock)) + idleTurn;
        const particleCtx = p.assembly ? assemblyCtx : backgroundCtx;
        particleCtx.save(); particleCtx.globalAlpha = p.assembly ? opacity : 1; particleCtx.translate(x, y); particleCtx.rotate(angle);
        // 각 개인의 색과 도형을 유지한 채 같은 팀의 조각끼리 정확히 포개집니다.
        particleCtx.drawImage(piece.image, -w / 2, -h / 2, w, h);
        particleCtx.restore();
        lastDraw.push({ id: p.id, name: piece.name, color: piece.color, kind: "color-group", role: "assembly", team: p.team, studentId: p.studentId, x, y, size, angle, opacity: opacity * fragmentOpacity });
      }
      // Blur and fade the background as a single layer; keep the assembling
      // icons sharp and preserve opacity where the background pieces overlap.
      if (backgroundOpacity >= .001) {
        ctx.save();
        ctx.globalAlpha = backgroundOpacity;
        ctx.filter = backgroundBlur > 0 ? 'blur(' + backgroundBlur + 'px)' : 'none';
        ctx.drawImage(backgroundCanvas, 0, 0, width, height);
        ctx.restore();
      }
      // Hand off only after every personal piece has assembled into the complete team SVG.
      if (iconOpacity > 0) {
        // Fade the composed pieces once, then add the original with the
        // complementary weight. Source-over crossfades dip to 75% opacity
        // halfway through and flash against the white page.
        assemblyCtx.save();
        assemblyCtx.globalCompositeOperation = 'destination-in';
        assemblyCtx.globalAlpha = fragmentOpacity;
        assemblyCtx.fillRect(0, 0, width, height);
        assemblyCtx.globalCompositeOperation = 'lighter';
        const attention = Math.max(...detailProgress);
        sprites.forEach((icon, team) => {
          if (!visibleTeams[team]) return;
          const { x, y, size } = galleryPoses[team];
          const detail = detailProgress[team];
          const opacity = iconOpacity * (1 - smooth(0, .18, detail)) * lerp(1, .14, attention);
          if (opacity <= 0) return;
          assemblyCtx.globalAlpha = opacity;
          assemblyCtx.drawImage(icon.image, x - size / 2, y - size / 2, size, size);
          lastDraw.push({ name: icon.name, kind: "icon", team, x, y, size, angle: 0, opacity });
        });
        assemblyCtx.restore();
      }
      ctx.drawImage(assemblyCanvas, 0, 0, width, height);
      if (iconOpacity > 0) {
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
      // A longer ease-out tail lets the pieces and background settle together
      // when returning to the word, including direct upward scrolling.
      const followDamping = scrollTarget < spread ? .88 : .78;
      spread = lerp(spread, scrollTarget, 1 - Math.pow(followDamping, dt));
      if (Math.abs(spread - scrollTarget) < .0005) spread = scrollTarget;
      let detailMoving = false;
      detailProgress.forEach((progress, team) => {
        const target = team === selectedTeam ? 1 : 0;
        let next = lerp(progress, target, 1 - Math.pow(.86, dt));
        if (Math.abs(next - target) < .0005) next = target;
        detailProgress[team] = next;
        if (next !== target) detailMoving = true;
      });
      let motion = 0;
      if (spread < 1 || scrollTarget < 1) for (const p of particles) {
        p.vx += (p.tx - p.x) * SETTINGS.spring * dt; p.vy += (p.ty - p.y) * SETTINGS.spring * dt;
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
      else { settle(); draw(); }
    }
    function scatter() {
      if (readScroll() > .001) { scrollToState(false); return; }
      if (paused || motionReduced) { settle(); draw(); return; }
      for (const p of particles) {
        const margin = p.size;
        p.x = random(margin, width - margin); p.y = random(margin, height - margin);
        p.vx = random(-4, 4); p.vy = random(-4, 4); p.angle = random(-Math.PI, Math.PI); p.spin = random(-.06, .06);
      }
      wake(2700);
    }
    function setHint() {
      const message = selectedTeam >= 0 ? "빈 곳을 누르면 아이콘이 다시 모입니다." : spread > .995 ? "아이콘을 누르면 디자이너를 볼 수 있습니다." : scrollTarget > .01 ? "33명의 개인 아이콘이 모여 14개의 팀 아이콘이 됩니다." : "아래로 스크롤하면 개인 아이콘이 팀별로 모입니다.";
      if (hint.textContent !== message) hint.textContent = message;
      spreadButton.disabled = false;
      spreadButton.setAttribute("aria-pressed", String(scrollTarget > .5));
      spreadButton.textContent = scrollTarget > .5 ? "글자로 모으기 ↑" : "아이콘 펼치기 ↓";
      pauseButton.setAttribute("aria-pressed", String(paused)); pauseButton.textContent = paused ? "다시 움직이기" : "움직임 멈추기";
      pauseButton.disabled = motionReduced || spread > .01;
      replayButton.disabled = (paused || motionReduced) && scrollTarget < .001;
    }
    document.addEventListener('click', event => {
      if (!event.target.closest('.icon-hit, .formation-panel')) closeDetails();
    });
    document.addEventListener('designer:viewchange', event => changeFormationView(event.detail.view, event.detail.keepToolbar));
    // designer-filter-change는 그리드 전용이므로 아이콘 갤러리에서는 구독하지 않습니다.
    designerClose.addEventListener('click', () => closeDetails(true));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && selectedTeam >= 0) { event.preventDefault(); closeDetails(true); }
    });
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
      paused = !paused;
      if (paused && stepDestination !== null) scrollToState(stepDestination === 1);
      if (paused) { cancelAnimationFrame(raf); raf = 0; spread = scrollTarget; syncDetailsInstantly(); settle(); draw(); } else wake();
      setHint();
    });
    reducedMotion.addEventListener("change", (event) => {
      motionReduced = event.matches;
      galleryHover.forEach((_, team) => { galleryHover[team] = hoverTarget(team); });
      if (motionReduced && stepDestination !== null) scrollToState(stepDestination === 1);
      if (motionReduced) { cancelAnimationFrame(raf); raf = 0; spread = scrollTarget; syncDetailsInstantly(); settle(); draw(); } else wake();
      setHint();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else wake();
    });
    async function init() {
      if (!ctx || !assemblyCtx || !backgroundCtx) throw new Error("이 브라우저에서는 Canvas를 사용할 수 없습니다.");
      await Promise.all(source.map(async icon => {
        const response = await fetch(new URL(icon.file, iconBaseURL));
        if (!response.ok) throw new Error(icon.file + " 로딩 실패 (" + response.status + ")");
        icon.svg = await response.text();
        const parsed = new DOMParser().parseFromString(icon.svg, 'image/svg+xml');
        if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') {
          throw new Error(icon.file + " 파일이 올바른 SVG가 아닙니다.");
        }
      }));
      [sprites, fragments] = await Promise.all([loadWholeIcons(), loadFragments()]);
      fragmentRows = fragments.map((bank, team) => resolveFragmentRows(bank, profiles[team]));
      wordArtwork = await loadWordArtwork();
      for (const [team, icon] of source.entries()) {
        const item = document.createElement("li");
        const button = document.createElement('button'); button.type = 'button'; button.className = 'icon-hit';
        button.setAttribute('aria-label', profiles[team].title + ' 디자이너 보기');
        button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', 'designerPanel'); button.hidden = !visibleTeams[team];
        const teamName = document.createElement('span'); teamName.className = 'icon-team-name';
        teamName.textContent = profiles[team].title; teamName.setAttribute('aria-hidden', 'true');
        button.appendChild(teamName);
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
        ready: loaded, word: "결합", wordSource: word.src, wholeIconTypes: sprites.length, count: particles.length,
        embeddedIndividuals: wordArtwork.anchors.map(({ projectId, color, studentId, x, y, width, height }) => ({ projectId, color, studentId, x, y, width, height })),
        floatingCount: wordArtwork.floating.length + floatingField.length, floatingFieldCount: floatingField.length,
        floatingRenderer: floatBatch ? 'webgl' : '2d', idleTime,
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
        viewActive, filterActive: false, resultCount: window.DESIGNERS.length, visibleTeams: [...visibleTeams], toolbarVisible: !toolbar.inert, unmappedResultCount: 0,
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
  
