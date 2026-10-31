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
    // gallerySpreadX/Y: 중심 주변에 흩어진 아이콘 무리의 가로/세로 범위입니다.
    // galleryMobileSpreadX/Y: 750px 미만 화면의 간격. 아이콘 크기와 랜덤 순서는 유지합니다.
    // galleryGap/galleryMobileGap: 배치 시 목표 여백(px). galleryMinGap은 가까운 아이콘 사이에 확보할 최소 여백입니다.
    // galleryIconScale: 기본 아이콘 크기 배율. galleryFloatX/Y: 떠다니는 최대 거리(px). galleryHoverScale: 호버 배율.
    const SETTINGS = { galleryFloatX: 0, galleryFloatY: 0, galleryFloatSpeed: .75, galleryHoverScale: 1, galleryIconScale: 1.1, galleryGap: 70, galleryMobileGap: 18, galleryMinGap: 70, gallerySpreadX: .8, gallerySpreadY: 1, galleryMobileSpreadX: .88, galleryMobileSpreadY: .86, wordScale: .98, wordCenterY: .5, spring: .024, damping: .82 };
    const canvas = document.getElementById("formation");
    if (!canvas || !document.getElementById("scrollScene")) return;
    if (!Array.isArray(window.DESIGNERS)) { console.error("designer-data.js를 먼저 연결해 주세요."); return; }
    const ctx = canvas.getContext("2d");
    // Compose the moving personal pieces in the same layer as the finished team icon.
    const assemblyCanvas = document.createElement('canvas');
    const assemblyCtx = assemblyCanvas.getContext('2d');
    // 회색 장식도 글자를 구성하던 원본 조각이 확대되어 남는 자리입니다.
    const GALLERY_AMBIENT = { maxPerSide: 18, clusterGap: 18, pieceGap: 36, topCount: 3, topGap: 24,
      sourceMinSize: 100, candidatesPerShape: 1, rasterSize: 96, floatX: 3, floatY: 5, floatSpeed: .55 };
    const HIDDEN_ORIGIN = { size: 32, focusX: .45, focusY: .5 };
    // 첫 구성 아이콘은 남고, 같은 팀의 나머지 조각은 한 번에 함께 들어옵니다.
    // start만 확대 진행률이며, 나머지 결합 시간은 스크롤과 독립적인 밀리초입니다.
    const TEAM_ENTRY = { start: .67, duration: 1500, teamStagger: 400,
      durationJitter: 140, handoffDuration: 160, margin: 32, startScale: 2.6 };
    // 블러는 작은 비트맵으로 한 번만 만들고, 이동 중에는 이미지만 섞습니다.
    const TEAM_ENTRY_BLUR = { size: 192, padding: 30, radii: [4, 10] };
    const teamEntryBlendCanvas = document.createElement('canvas');
    teamEntryBlendCanvas.width = teamEntryBlendCanvas.height = TEAM_ENTRY_BLUR.size + TEAM_ENTRY_BLUR.padding * 2;
    const teamEntryBlendCtx = teamEntryBlendCanvas.getContext('2d');
    // 회전한 조각은 작은 캔버스에 먼저 합성해 겹치는 색이 밝아지지 않게 합니다.
    const TEAM_HOVER = { degrees: 3, size: 384, padding: 24 };
    const teamHoverCanvas = document.createElement('canvas');
    teamHoverCanvas.width = teamHoverCanvas.height = TEAM_HOVER.size + TEAM_HOVER.padding * 2;
    const teamHoverCtx = teamHoverCanvas.getContext('2d');
    const floatCanvas = document.createElement('canvas');
    let floatBatch = window.createHeroSpriteBatch?.(floatCanvas) || null;
    // 한 GPU 배치를 재사용하고 블러는 묶음별로 한 번만 적용합니다.
    const FLOAT_BLUR = { radii: [0, 5, 14], startRatio: 1.35, fullRatio: 4 };
    const floatPasses = FLOAT_BLUR.radii.map(radius => ({ radius, items: [] }));
    let floatFallbackCanvas, floatFallbackCtx;
    // 같은 카메라가 앞으로 이동합니다. 원래 큰 조각일수록 가까워서 먼저 화면을 지나갑니다.
    const WORD_APPROACH = { zoom: 8, end: 1, handoffStart: .9, clearEnd: 1, nearFade: .025, nearClip: .008 };
    // 원본 SVG 크기별 깊이 기준입니다. 기준 사이도 보간해 중간 크기가 같은 층으로 뭉치지 않습니다.
    const ICON_DEPTH_STOPS = [[8, 1], [14, 1.008], [22, 1.025], [32, 1.055],
      [48, 1.115], [72, 1.22], [120, 1.4], [320, 1.8]];
    let cameraZoom = WORD_APPROACH.zoom;
    let cameraFocus = { x: 0, y: 0 };
    // main-hero.js와 같은 이동 거리(1130 단위 기준), 속도, 2초 진입 곡선.
    const WORD_FLOAT = { referenceWidth: 1130, distance: 27, intro: 2, minSpeed: .2, maxSpeed: .55,
      zoomDrift: 1.2, maxTravel: 36 };
    // 화면 여백에 더하는 아이콘: 면적에 맞춰 개수를 조절하고 중앙 글자는 비워 둡니다.
    const FLOAT_FIELD = { areaPerIcon: 400, maxCount: 1600, minSize: 3, sizeRange: 9, maxDrift: 22 };
    // 확대 중 빈 여백을 지나가는 장식입니다. 마지막 갤러리에는 남지 않습니다.
    const PASSING_FIELD = { layers: 7, areaPerIcon: 36000, maxPerLayer: 48,
      minSize: 48, maxSize: 100, fadeStart: 180, fadeEnd: 320, blurStrength: .5 };
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
    const word = { src: new URL('../assets/images/designer/gyeolhap-word.svg?v=20261030-all-glyphs', scriptURL).href };
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let motionReduced = reducedMotion.matches;
    let sprites = [], fragments = [], fragmentRows = [], hoverLayers = [], particles = [], floatingField = [], wordArtwork, wordLayout;
    let width = 0, height = 0, spacing = 20;
    let ambientViewportWidth = 0, ambientStageLeft = 0;
    let ambientSlots = [], ambientParticles = [];
    let renderBounds = { left: 0, top: 0, width: 0, height: 0 }, zoomFloating = [], restFloating = [];
    let paused = false, raf = 0, previousTime = 0, until = 0, loaded = false;
    let spread = 0, scrollTarget = 0, spreadSlots = [], lastDraw = [];
    let teamEntryTime = 0, teamEntryFinish = 0, teamEntryLastSpread = 0;
    let teamEntryReversing = false, teamEntryInitialized = false;
    let galleryOrder = source.map((_, team) => team);
    let galleryOffsets = [];
    let galleryShuffleArmed = true, galleryRevision = 0;
    let idleTime = 0, galleryTime = 0;
    let hoveredTeam = -1, focusedTeam = -1;
    const galleryHover = source.map(() => 0), detailOrigins = source.map(() => null);
    const detailMotions = source.map(() => null);
    let detailPanelOrigin = null;
    let wordShiftY = 0;
    let selectedTeam = -1;
    let viewActive = scene.classList.contains("slide-view"), savedProgress = 0;
    // 아이콘 갤러리는 그리드의 초성·검색 선택과 무관하게 전체 프로젝트를 표시합니다.
    const visibleTeams = source.map(() => true);
    toolbar.inert = viewActive;
    toolbar.setAttribute('aria-hidden', String(viewActive));
    const detailProgress = source.map(() => 0), detailTargets = source.map(() => []), iconButtons = [];
    const random = (min, max) => min + Math.random() * (max - min);
    const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (a, b, value) => { const t = clamp((value - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    // 회색 장식의 시간도 처음부터 이어서 확대·도착·복귀 사이에 움직임이 멈추지 않게 합니다.
    const idleActive = () => viewActive && !paused && !motionReduced && !document.hidden && spread < 1 && wordArtwork?.floating.length > 0;
    const galleryIdleActive = () => viewActive && !paused && !motionReduced && !document.hidden &&
      selectedTeam < 0 && !detailProgress.some(value => value > 0) &&
      ((spread > .86 && (SETTINGS.galleryFloatX !== 0 || SETTINGS.galleryFloatY !== 0) && visibleTeams.some(Boolean)) ||
        ((GALLERY_AMBIENT.floatX !== 0 || GALLERY_AMBIENT.floatY !== 0) && ambientParticles.length > 0));
    const teamEntryComplete = () => teamEntryTime >= teamEntryFinish + TEAM_ENTRY.handoffDuration;
    const teamEntryActive = () => teamEntryReversing ? teamEntryTime > 0 : spread > TEAM_ENTRY.start && !teamEntryComplete();
    const currentCameraScale = () => Math.pow(cameraZoom, smooth(0, WORD_APPROACH.end, clamp(spread, 0, 1)));
    function teamInteractive(team, pose = null) {
      if (!loaded || !viewActive || !visibleTeams[team] || !spreadSlots[team] || spread <= .01) return false;
      pose ||= galleryCameraPose(galleryPose(team), currentCameraScale());
      const y = pose.y + wordRenderOffset(spread), radius = pose.size / 2;
      // 글자 속에 숨은 점 크기일 때만 제외하고, 식별되는 순간부터 선택할 수 있습니다.
      return pose.size >= 20 && pose.x + radius > renderBounds.left && pose.x - radius < renderBounds.left + renderBounds.width &&
        y + radius > renderBounds.viewportTop && y - radius < renderBounds.viewportTop + innerHeight;
    }
    function hoverTarget(team) {
      return teamInteractive(team) && selectedTeam < 0 && (hoveredTeam === team || focusedTeam === team) ? 1 : 0;
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
      return { x: lerp(x, origin?.x ?? x, locked), y: lerp(y, origin?.y ?? y, locked),
        size: lerp(size, origin?.size ?? size, locked) };
    }
    const loadImage = (src) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("이미지를 불러올 수 없습니다."));
      image.src = src;
    });
    function collectAmbientGlyphs(root) {
      const byShape = new Map();
      const selector = 'path,rect,circle,ellipse,polygon,polyline,line';
      for (const node of root.querySelectorAll('[data-formation-glyph]')) {
        const [, , w, h] = node.getAttribute('data-formation-glyph').split(' ').map(Number);
        const size = Math.max(w, h);
        if (size < GALLERY_AMBIENT.sourceMinSize || Math.min(w, h) / size < .75) continue;
        const members = node.matches(selector) ? [node] : [...node.querySelectorAll(selector)];
        const shapes = new Set(members.map(member => member.getAttribute('class')));
        // 이 원본의 cls-N은 개인 아이콘 유형입니다. 여러 유형이 결합된 묶음은 제외합니다.
        if (shapes.size !== 1) continue;
        const shape = [...shapes][0];
        if (!/^cls-\d+$/.test(shape) || shape === 'cls-34') continue;
        if (!byShape.has(shape)) byShape.set(shape, []);
        byShape.get(shape).push({ node, size });
      }
      const candidates = new Map();
      // 유형별로 완전한 원본 하나만 골라 중앙에 작게 숨기고, 확대용 해상도는 유지합니다.
      for (const [shape, items] of byShape) {
        items.sort((a, b) => b.size - a.size).slice(0, GALLERY_AMBIENT.candidatesPerShape)
          .forEach(item => candidates.set(item.node, shape));
      }
      return candidates;
    }
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
      const ambientGlyphs = collectAmbientGlyphs(root);
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
        // 원래 글자의 밀도를 유지합니다. 중앙의 작은 팀 모양과 함께 같은 카메라로 확대합니다.
        node.setAttribute('data-formation-glyph', [x, y, w, h, 0].join(' '));
        node.removeAttribute('data-formation-team'); node.removeAttribute('data-formation-color');
        return { x, y, width: w, height: h, projectId: icon.projectId, color: piece.color,
          studentId: profiles[team].members[fragmentRows[team][index]]?.id || null, sprite: piece };
      }));
      // 획 안팎의 모든 아이콘을 한 장의 atlas에 모읍니다. bounds는 제작 시 미리 계산합니다.
      // 정지 화면은 배치가 정해진 뒤 같은 atlas로 한 번만 캐시합니다.
      const rasterWidth = 2400;
      const atlas = root.cloneNode(false), atlasWidth = 2048, rasterScale = rasterWidth / sourceWidth;
      if (defs) atlas.appendChild(defs.cloneNode(true));
      let tileX = 0, tileY = 0, rowHeight = 0;
      const floating = [...root.querySelectorAll('[data-formation-float], [data-formation-glyph]')].map(node => {
        const glyph = node.hasAttribute('data-formation-glyph');
        const [x, y, w, h, strength] = node.getAttribute(glyph ? 'data-formation-glyph' : 'data-formation-float').split(' ').map(Number);
        const ambientShape = ambientGlyphs.get(node) || null;
        const ambientCandidate = ambientShape !== null;
        // 처음에는 작게 숨겨져 있어도, 남을 조각만 최종 크기에 맞춰 선명하게 저장합니다.
        const tileScale = ambientCandidate ? Math.max(rasterScale, GALLERY_AMBIENT.rasterSize / Math.max(w, h)) : rasterScale;
        const tileWidth = Math.ceil(w * tileScale) + 4, tileHeight = Math.ceil(h * tileScale) + 4;
        if (tileX + tileWidth > atlasWidth) { tileX = 0; tileY += rowHeight; rowHeight = 0; }
        const bounds = { x: x - 2 / tileScale, y: y - 2 / tileScale,
          width: tileWidth / tileScale, height: tileHeight / tileScale };
        const tile = doc.createElementNS(root.namespaceURI, 'svg');
        tile.setAttribute('x', tileX); tile.setAttribute('y', tileY);
        tile.setAttribute('width', tileWidth); tile.setAttribute('height', tileHeight);
        tile.setAttribute('viewBox', [bounds.x, bounds.y, bounds.width, bounds.height].join(' '));
        tile.appendChild(node); atlas.appendChild(tile);
        const piece = { ...bounds, visualSize: Math.max(w, h), glyph, ambientCandidate, ambientShape, ax: tileX, ay: tileY, gw: tileWidth, gh: tileHeight,
          phase: random(0, Math.PI * 2), speed: random(WORD_FLOAT.minSpeed, WORD_FLOAT.maxSpeed),
          drift: strength * WORD_FLOAT.distance * sourceWidth / WORD_FLOAT.referenceWidth * random(.6, 1) };
        tileX += tileWidth; rowHeight = Math.max(rowHeight, tileHeight);
        return piece;
      });
      const atlasHeight = Math.max(1, tileY + rowHeight);
      atlas.setAttribute('viewBox', [0, 0, atlasWidth, atlasHeight].join(' '));
      const floatAtlas = await rasterize(atlas, atlasWidth, atlasHeight);
      // 캐시를 만들 때도 거대한 SVG를 다시 해석하지 않고 이미 그린 비트맵만 잘라 씁니다.
      floatAtlas.naturalWidth = atlasWidth; floatAtlas.naturalHeight = atlasHeight;
      const background = document.createElement('canvas');
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
      for (const bank of banks) for (const piece of bank.slice(1)) {
        piece.entryBlur = TEAM_ENTRY_BLUR.radii.map(radius => {
          const image = document.createElement('canvas');
          image.width = image.height = teamEntryBlendCanvas.width;
          const context = image.getContext('2d');
          context.filter = `blur(${radius}px)`;
          context.drawImage(piece.image, TEAM_ENTRY_BLUR.padding, TEAM_ENTRY_BLUR.padding, TEAM_ENTRY_BLUR.size, TEAM_ENTRY_BLUR.size);
          return image;
        });
      }
      return banks;
    }
    function drawTeamHover(context, icon, team, x, y, size) {
      const amount = galleryHover[team];
      if (amount === 0 || !teamHoverCtx) {
        context.drawImage(icon.image, x - size / 2, y - size / 2, size, size);
        return;
      }
      const extent = teamHoverCanvas.width;
      teamHoverCtx.clearRect(0, 0, extent, extent);
      for (const piece of hoverLayers[team]) {
        teamHoverCtx.save();
        teamHoverCtx.translate(extent / 2, extent / 2);
        teamHoverCtx.rotate(piece.hoverAngle * amount);
        teamHoverCtx.drawImage(piece.image, -TEAM_HOVER.size / 2, -TEAM_HOVER.size / 2, TEAM_HOVER.size, TEAM_HOVER.size);
        teamHoverCtx.restore();
      }
      const paddedSize = size * extent / TEAM_HOVER.size;
      context.drawImage(teamHoverCanvas, x - paddedSize / 2, y - paddedSize / 2, paddedSize, paddedSize);
    }
    function drawTeamEntryPiece(context, piece, width, height, blur = 0, colorAmount = 1) {
      if ((blur <= .001 && colorAmount >= 1) || !teamEntryBlendCtx) {
        context.drawImage(piece.image, -width / 2, -height / 2, width, height);
        return;
      }
      // 고정 조각도 같은 색상 합성을 사용하되 불필요한 블러 캐시는 만들지 않습니다.
      const level = piece.entryBlur ? clamp(blur, 0, TEAM_ENTRY_BLUR.radii.length) : 0;
      const low = Math.floor(level), high = Math.ceil(level), mix = level - low;
      const pad = TEAM_ENTRY_BLUR.padding, size = TEAM_ENTRY_BLUR.size;
      const extent = teamEntryBlendCanvas.width;
      const drawLevel = (level) => {
        if (level === 0) teamEntryBlendCtx.drawImage(piece.image, pad, pad, size, size);
        else teamEntryBlendCtx.drawImage(piece.entryBlur[level - 1], 0, 0);
      };
      teamEntryBlendCtx.clearRect(0, 0, extent, extent);
      teamEntryBlendCtx.globalCompositeOperation = 'source-over';
      teamEntryBlendCtx.globalAlpha = 1 - mix;
      drawLevel(low);
      if (mix > 0) {
        // 합산 보간으로 선명도만 바꾸고 아이콘의 불투명도는 유지합니다.
        teamEntryBlendCtx.globalCompositeOperation = 'lighter';
        teamEntryBlendCtx.globalAlpha = mix;
        drawLevel(high);
      }
      teamEntryBlendCtx.globalAlpha = 1;
      if (colorAmount < 1) {
        // 기존 합성 비트맵의 알파를 유지해 회색에서 원래 색으로 안착 직전에 전환합니다.
        teamEntryBlendCtx.globalCompositeOperation = 'source-atop';
        teamEntryBlendCtx.globalAlpha = 1 - colorAmount;
        teamEntryBlendCtx.fillStyle = '#dedede';
        teamEntryBlendCtx.fillRect(0, 0, extent, extent);
        teamEntryBlendCtx.globalAlpha = 1;
      }
      teamEntryBlendCtx.globalCompositeOperation = 'source-over';
      context.drawImage(teamEntryBlendCanvas, -width * extent / size / 2, -height * extent / size / 2,
        width * extent / size, height * extent / size);
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
    // duration/returnDuration: 펼치기/글자로 돌아오기 시간(ms). 결합 시간과 분리합니다.
    // wheelThreshold: 휠 감도(px), swipeThreshold: 스와이프 거리(px).
    const SCROLL_STEP = { duration: 3600, returnDuration: 2900, wheelThreshold: 60, wheelIdle: 220, swipeThreshold: 42 };
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
      const previousTarget = scrollTarget;
      scrollTarget = readScroll();
      if (!loaded) return;
      // 확대 전부터 같은 자리에 있던 아이콘이므로 스크롤 도중 배치를 바꾸지 않습니다.
      if (scrollTarget < previousTarget - .0001) closeDetails();
      // 자동 스크롤은 이미 보간하므로 화면에 추가 지연을 걸지 않습니다.
      if (stepDestination !== null) spread = scrollTarget;
      if (paused || motionReduced) { spread = scrollTarget; snapTeamEntry(spread); settle(); draw(); }
      else wake(650);
      setHint();
    }
    function scrollToState(expanded) {
      if (!viewActive) return;
      cancelStep();
      if (!expanded) closeDetails();
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
        // 확대는 원래 속도로 끝내고, 남은 결합은 별도 시간으로 계속 재생합니다.
        const pacedProgress = smooth(0, 1, progress);
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
      const opacity = viewActive ? smooth(.48, .86, spread) : 1;
      const usable = !viewActive || spread > .72;
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
        snapTeamEntry(savedProgress);
        window.scrollTo({ top: scene.offsetTop + savedProgress * scrollRange(), behavior: 'instant' });
        if (loaded) { layout(); onScroll(); draw(); }
      }
      updateToolbar();
    }
    function captureReturnGallery() {
      if (!loaded) return null;
      return {
        layout: 'centered-scatter-v3',
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
      snapTeamEntry(progress);
      const indexes = new Map(source.map((project, team) => [project.projectId, team]));
      if (Array.isArray(state?.order) && state.order.length === source.length && new Set(state.order).size === source.length && state.order.every(id => indexes.has(id))) {
        galleryOrder = state.order.map(id => indexes.get(id));
        galleryOffsets = state.layout === 'centered-scatter-v3' && state.offsets?.length === source.length &&
          state.offsets.every(point => Number.isFinite(point.x) && Number.isFinite(point.y) && Math.abs(point.x) <= 1 && Math.abs(point.y) <= 1)
          ? state.offsets.map(({ x, y }) => ({ x, y })) : [];
        galleryOrder.forEach(team => iconList.appendChild(iconButtons[team].parentElement));
      }
      galleryRevision = Number.isInteger(state?.revision) ? Math.max(0, state.revision) : 0;
      galleryShuffleArmed = state?.shuffleArmed ?? progress <= .001;
      paused = !!state?.paused;
      galleryTime = Number.isFinite(state?.floatTime) ? Math.max(0, state.floatTime) : 0;
      hoveredTeam = focusedTeam = -1; galleryHover.fill(0); detailOrigins.fill(null); detailMotions.fill(null); detailPanelOrigin = null;
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
      const slot = detailPanelOrigin || spreadSlots[selectedTeam], panelBox = designerPanel.getBoundingClientRect();
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
    function entryDetailPose(team, index, slot, scale) {
      const piece = fragments[team][index];
      const entry = teamEntryPose({ team, sprite: piece }, slot, scale, teamEntryTime);
      const pose = entry || fragmentCameraPose(piece, slot, scale);
      return { ...pose, y: pose.y + wordRenderOffset(spread), opacity: entry ? (entry.opacity ?? 1) : 0,
        blur: pose.blur || 0, colorAmount: pose.colorAmount ?? 1, angle: piece.hoverAngle * galleryHover[team] };
    }
    function detailPiecePose(team, index, slot, scale) {
      const entry = entryDetailPose(team, index, slot, scale), motion = detailMotions[team];
      if (!motion || detailProgress[team] <= 0) return entry;
      const opening = team === selectedTeam, target = detailTargets[team][index];
      const destination = opening && target
        ? { x: target.x, y: target.y, width: target.size, height: target.size, opacity: 1, blur: 0, colorAmount: 1, angle: 0 }
        : entry;
      const progress = opening
        ? (detailProgress[team] - motion.start) / Math.max(.0001, 1 - motion.start)
        : (motion.start - detailProgress[team]) / Math.max(.0001, motion.start);
      const travel = smooth(0, 1, progress), origin = motion.pieces[index];
      return Object.fromEntries(['x', 'y', 'width', 'height', 'opacity', 'blur', 'colorAmount', 'angle']
        .map(key => [key, lerp(origin[key], destination[key], travel)]));
    }
    function captureDetailMotion(team) {
      const slot = galleryPose(team), scale = currentCameraScale();
      const pieces = fragments[team].map((_, index) => detailPiecePose(team, index, slot, scale));
      detailMotions[team] = { start: detailProgress[team], pieces };
    }
    function closeDetails(restoreFocus = false, immediate = false) {
      const previous = selectedTeam;
      if (previous < 0) {
        if (immediate) syncDetailsInstantly();
        return;
      }
      captureDetailMotion(previous);
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
      if (!teamInteractive(team)) return;
      if (selectedTeam === team) { closeDetails(); return; }
      if (selectedTeam >= 0) closeDetails();
      captureDetailMotion(team);
      detailOrigins[team] = galleryPose(team);
      detailPanelOrigin = galleryCameraPose(detailOrigins[team], currentCameraScale());
      detailPanelOrigin.y += wordRenderOffset(spread);
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
      // 첫 장면을 만들 때 한 번만 순서를 정합니다.
      if (next.length > 1 && next.every((team, i) => team === previous[i])) next.push(next.shift());
      galleryOrder = next;
      galleryOffsets = [];
      galleryShuffleArmed = false; galleryRevision++;
      // 화면의 순서와 키보드 탐색 순서만 바꾸고 학생/색상 연결은 유지합니다.
      galleryOrder.forEach(team => iconList.appendChild(iconButtons[team].parentElement));
    }
    function makeSpreadSlots() {
      // 줄/열이나 양 끝 고정점 없이, 중심 주변에서 서로 떨어진 무작위 위치를 고릅니다.
      const headingBottom = spreadHeading.offsetTop + spreadHeading.offsetHeight;
      const top = Math.min(height * .3, headingBottom + Math.min(26, height * .045));
      const bottom = Math.max(10, Math.min(30, height * .045));
      const availableHeight = Math.max(40, height - top - bottom);
      // 기존 아이콘 크기 기준만 유지합니다. 실제 위치에는 행/열을 사용하지 않습니다.
      const rowCount = width / availableHeight > 3.4 ? 2 : width >= 750 ? 3 : width >= 500 ? 4 : 5;
      const rowHeight = availableHeight / rowCount, columnWidth = width * .94 / Math.ceil(source.length / rowCount);
      const size = Math.max(12, Math.min(112, columnWidth * .55, rowHeight * .65) * SETTINGS.galleryIconScale);
      const compactX = width < 750 ? SETTINGS.galleryMobileSpreadX : SETTINGS.gallerySpreadX;
      const compactY = width < 750 ? SETTINGS.galleryMobileSpreadY : SETTINGS.gallerySpreadY;
      const safeSize = Math.max(44, size) * SETTINGS.galleryHoverScale;
      const requestedGap = Math.max(SETTINGS.galleryMinGap, width < 750 ? SETTINGS.galleryMobileGap : SETTINGS.galleryGap);
      const radiusX = Math.max(1, width - safeSize - 16) * .5 * compactX;
      const radiusY = Math.max(1, availableHeight - safeSize - 16) * .5 * compactY;
      const distance = (a, b) => Math.max(Math.abs(a.x - b.x) * radiusX, Math.abs(a.y - b.y) * radiusY);
      if (galleryOffsets.length !== source.length) {
        galleryOffsets = [];
        // 둥근 영역의 모서리 쪽도 활용하되, 개별 아이콘을 경계에 맞춰 정렬하지 않습니다.
        const randomPoint = () => {
          let point;
          do { point = { x: random(-1, 1), y: random(-1, 1) }; }
          while (point.x ** 4 + point.y ** 4 > 1);
          return point;
        };
        const nearestDistance = (point, skip = -1) => galleryOffsets.reduce((nearest, other, i) =>
          i === skip ? nearest : Math.min(nearest, distance(point, other)), Infinity);
        for (let i = 0; i < source.length; i++) {
          let best, bestDistance = -1;
          for (let attempt = 0; attempt < 96; attempt++) {
            const point = randomPoint();
            const clearance = nearestDistance(point);
            if (clearance > bestDistance) { best = point; bestDistance = clearance; }
            if (clearance >= safeSize + requestedGap) break;
          }
          galleryOffsets.push(best);
        }
        // 새 배치를 만들 때만 가까운 아이콘을 빈 공간으로 옮겨 크기 축소를 최소화합니다.
        // 스크롤 프레임과 화면 크기 변경에서는 저장된 좌표를 그대로 사용합니다.
        for (let pass = 0; pass < 12; pass++) {
          let crowded = false;
          galleryOffsets.forEach((point, i) => {
            let best = point, bestDistance = nearestDistance(point, i);
            if (bestDistance >= safeSize + requestedGap) return;
            crowded = true;
            for (let attempt = 0; attempt < 256; attempt++) {
              const candidate = randomPoint(), clearance = nearestDistance(candidate, i);
              if (clearance > bestDistance) { best = candidate; bestDistance = clearance; }
              if (bestDistance >= safeSize + requestedGap) break;
            }
            galleryOffsets[i] = best;
          });
          if (!crowded) break;
        }
      }
      // 무리 전체를 중심에 옮깁니다. 개별 아이콘을 좌우 경계에 붙이거나 잘라 맞추지 않습니다.
      const xs = galleryOffsets.map(point => point.x), ys = galleryOffsets.map(point => point.y);
      const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
      const centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
      let clearance = Infinity;
      galleryOffsets.forEach((point, i) => galleryOffsets.slice(i + 1).forEach(other => {
        clearance = Math.min(clearance, distance(point, other));
      }));
      // 좁은 화면에서도 서로 가려지지 않도록 필요한 경우에만 크기를 조금 줄입니다.
      const iconSize = Math.max(12, Math.min(size, (clearance - SETTINGS.galleryMinGap) / SETTINGS.galleryHoverScale));
      const slots = galleryOffsets.map(point => ({
        x: width / 2 + (point.x - centerX) * radiusX,
        y: top + availableHeight / 2 + (point.y - centerY) * radiusY,
        size: iconSize
      }));
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
      layoutGalleryAmbient();
      positionDetails();
      if (particles.length) { updateCameraZoom(); layoutZoomFloating(); }
    }
    function updateCameraZoom() {
      const wordScale = wordLayout.width / wordArtwork.width;
      // 팀 아이콘을 더 가까이 두어 확대 중 일찍 커지고 넓게 펼쳐지도록 합니다.
      cameraZoom = Math.max(WORD_APPROACH.zoom, spreadSlots[0].size / (HIDDEN_ORIGIN.size * wordScale));
      cameraFocus = { x: wordLayout.left + wordLayout.width * HIDDEN_ORIGIN.focusX,
        y: wordLayout.top + wordLayout.height * HIDDEN_ORIGIN.focusY };
      for (const p of particles) {
        const pose = fragmentCameraPose(p.sprite, spreadSlots[p.team], 1);
        p.x = p.tx = pose.x;
        p.y = p.ty = pose.y;
        p.wordWidth = pose.width;
        p.wordHeight = pose.height;
        p.size = Math.max(p.wordWidth, p.wordHeight);
      }
    }
    function projectScenePoint(x, y, scale) {
      const travel = (scale - 1) / (cameraZoom - 1);
      return { x: x + (x - cameraFocus.x) * (scale - 1) + (width / 2 - cameraFocus.x) * travel,
        y: y + (y - cameraFocus.y) * (scale - 1) + (height / 2 - cameraFocus.y) * travel };
    }
    function wordRenderOffset(timeline) {
      return Math.round(wordShiftY * (1 - smooth(0, .65, timeline)) * 100) / 100;
    }
    function galleryCameraPose(slot, scale) {
      const x = cameraFocus.x + (slot.x - width / 2) / cameraZoom;
      const y = cameraFocus.y + (slot.y - height / 2) / cameraZoom;
      const pose = projectScenePoint(x, y, scale), size = slot.size * scale / cameraZoom;
      return { x: pose.x, y: pose.y, size };
    }
    function fragmentCameraPose(piece, slot, scale) {
      const pose = galleryCameraPose(slot, scale);
      // 기준 구성 아이콘과 합류를 마친 조각이 공유하는 위치와 크기입니다.
      return { x: pose.x + piece.offsetX * pose.size,
        y: pose.y + piece.offsetY * pose.size,
        width: pose.size * piece.relativeWidth, height: pose.size * piece.relativeHeight };
    }
    function teamEntryTiming(team, index) {
      if (index <= 0) return { start: 0, duration: 0, end: 0 };
      const variation = (Math.sin(team * 12.9898) + 1) / 2;
      // 팀 사이의 시차는 유지하되, 2·3번째 조각은 출발과 안착 시간을 공유합니다.
      const arrivalVariation = (Math.sin(team * 17.173 + 7.619) + 1) / 2;
      const start = variation * TEAM_ENTRY.teamStagger;
      const duration = TEAM_ENTRY.duration + arrivalVariation * TEAM_ENTRY.durationJitter;
      return { start, duration, end: start + duration };
    }
    function snapTeamEntry(progress) {
      teamEntryTime = smooth(TEAM_ENTRY.start, 1, progress) * (teamEntryFinish + TEAM_ENTRY.handoffDuration);
      teamEntryLastSpread = progress;
      teamEntryReversing = false;
      teamEntryInitialized = true;
    }
    function advanceTeamEntry(elapsed) {
      if (spread < teamEntryLastSpread - .000001) {
        teamEntryReversing = true;
      } else if (spread > teamEntryLastSpread + .000001) teamEntryReversing = false;
      // 축소 스크롤에 압축하지 않고, 들어올 때와 같은 시간으로 현재 위치부터 되감습니다.
      if (teamEntryReversing) teamEntryTime = Math.max(0, teamEntryTime - elapsed);
      else if (spread <= TEAM_ENTRY.start) teamEntryTime = 0;
      else teamEntryTime = Math.min(teamEntryFinish + TEAM_ENTRY.handoffDuration, teamEntryTime + elapsed);
      teamEntryLastSpread = spread;
    }
    function teamEntryPose(particle, slot, scale, elapsed) {
      const piece = particle.sprite, index = fragments[particle.team].indexOf(piece);
      const target = fragmentCameraPose(piece, slot, scale);
      if (index <= 0) {
        // 고정 조각도 합류하는 조각과 같은 시점에 회색에서 원래 색으로 바뀝니다.
        const { start, duration } = teamEntryTiming(particle.team, 1);
        const colorAmount = smooth(.7, 1, clamp((elapsed - start) / duration, 0, 1));
        return { ...target, colorAmount };
      }
      const pieceVariation = (Math.sin(particle.team * 17.173 + index * 7.619) + 1) / 2;
      const { start, duration, end } = teamEntryTiming(particle.team, index);
      if (elapsed < start) return null;
      if (elapsed >= end) return target;
      // 나가는 경로 전체를 같은 카메라 안에 놓아 위치와 크기가 함께 축소됩니다.
      const pathTarget = teamEntryReversing ? fragmentCameraPose(piece, slot, cameraZoom) : target;
      const t = clamp((elapsed - start) / duration, 0, 1);
      // 화면 안으로는 바로 진입하고, 마지막 남은 거리만 길게 감속합니다.
      const join = 1 - (1 - t) ** 3;
      const depthScale = 1 + (TEAM_ENTRY.startScale - 1) * (1 - t) ** 2;
      const blur = TEAM_ENTRY_BLUR.radii.length * (1 - smooth(.05, .7, t));
      const colorAmount = smooth(.7, 1, t);
      const left = renderBounds.left, right = left + renderBounds.width;
      const top = renderBounds.viewportTop, bottom = top + innerHeight;
      const horizontal = Math.min(slot.x - left, right - slot.x);
      const vertical = Math.min(slot.y - top, bottom - slot.y);
      // 같은 팀의 다음 조각은 다른 방향에서 들어오되 가까운 화면 끝을 사용합니다.
      const fromSide = index % 2 === 1 ? horizontal <= vertical : horizontal > vertical;
      // 커진 아이콘의 블러 가장자리까지 화면 밖에서 출발하도록 여유를 확보합니다.
      const padding = slot.size * Math.max(piece.relativeWidth, piece.relativeHeight) * TEAM_ENTRY.startScale *
        (.5 + TEAM_ENTRY_BLUR.padding / TEAM_ENTRY_BLUR.size) + TEAM_ENTRY.margin;
      // 시작점을 옆으로도 충분히 벌려 수평·수직 대신 대각선으로 접근합니다.
      const diagonal = .22 + pieceVariation * .14;
      const offsetX = (slot.x < (left + right) / 2 ? 1 : -1) * renderBounds.width * diagonal;
      const offsetY = (slot.y < (top + bottom) / 2 ? 1 : -1) * innerHeight * diagonal;
      const x = fromSide ? (slot.x - left < right - slot.x ? left - padding : right + padding)
        : clamp(slot.x + offsetX, left + padding, right - padding);
      const y = fromSide ? clamp(slot.y + offsetY, top + padding, bottom - padding)
        : (slot.y - top < bottom - slot.y ? top - padding : bottom + padding);
      const dx = pathTarget.x - x, dy = pathTarget.y - y, distance = Math.hypot(dx, dy) || 1;
      const bend = clamp(distance * (.16 + pieceVariation * .1), 40, 180) * (pieceVariation < .5 ? -1 : 1);
      const bendX = -dy / distance * bend, bendY = dx / distance * bend;
      const c1x = x + dx * .32 + bendX, c1y = y + dy * .32 + bendY;
      const c2x = x + dx * .78 + bendX * .4, c2y = y + dy * .78 + bendY * .4;
      const remaining = 1 - join;
      let flightX = remaining ** 3 * x + 3 * remaining ** 2 * join * c1x + 3 * remaining * join ** 2 * c2x + join ** 3 * pathTarget.x;
      let flightY = remaining ** 3 * y + 3 * remaining ** 2 * join * c1y + 3 * remaining * join ** 2 * c2y + join ** 3 * pathTarget.y;
      if (teamEntryReversing) {
        const cameraRatio = scale / cameraZoom;
        flightX = target.x + (flightX - pathTarget.x) * cameraRatio;
        flightY = target.y + (flightY - pathTarget.y) * cameraRatio;
      }
      return { x: flightX, y: flightY, width: target.width * depthScale, height: target.height * depthScale,
        blur, colorAmount, opacity: teamEntryReversing ? smooth(0, .2, t) : 1 };
    }
    function approachDepthRate(sourceSize) {
      // 가장 작은 조각만 팀 아이콘의 깊이(1)에 남고, 나머지는 크기마다 다른 속도로 지나갑니다.
      if (sourceSize <= ICON_DEPTH_STOPS[0][0]) return ICON_DEPTH_STOPS[0][1];
      for (let i = 1; i < ICON_DEPTH_STOPS.length; i++) {
        const [size, rate] = ICON_DEPTH_STOPS[i];
        if (sourceSize > size) continue;
        const [previousSize, previousRate] = ICON_DEPTH_STOPS[i - 1];
        const amount = Math.log(sourceSize / previousSize) / Math.log(size / previousSize);
        return lerp(previousRate, rate, amount);
      }
      return ICON_DEPTH_STOPS[ICON_DEPTH_STOPS.length - 1][1];
    }
    function layoutGalleryAmbient() {
      ambientSlots = [];
      if (!width || !height) return;
      const stageBox = stage.getBoundingClientRect();
      const referenceSize = spreadSlots[0]?.size || 0;
      const topExtra = Math.ceil(referenceSize + GALLERY_AMBIENT.topGap + 18);
      ambientViewportWidth = document.documentElement.clientWidth;
      ambientStageLeft = stageBox.left;
      if (!spreadSlots.length) return;
      // 같은 갤러리로 돌아오거나 크기만 바뀔 때 장식이 매번 뒤섞이지 않게 합니다.
      let seed = galleryOrder.reduce((value, team) => (Math.imul(value, 31) + team + 1) >>> 0, galleryRevision + 7);
      const next = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
      const clusterLeft = ambientStageLeft + Math.min(...spreadSlots.map(slot => slot.x - slot.size * SETTINGS.galleryHoverScale / 2));
      const clusterRight = ambientStageLeft + Math.max(...spreadSlots.map(slot => slot.x + slot.size * SETTINGS.galleryHoverScale / 2));
      const clusterTop = Math.min(...spreadSlots.map(slot => slot.y - slot.size * SETTINGS.galleryHoverScale / 2));
      // 팀 아이콘 무리의 전체 가로 폭을 비우고, 좌우 바깥 여백에만 그립니다.
      const bands = [
        { left: 0, right: Math.max(0, clusterLeft - GALLERY_AMBIENT.clusterGap), outer: 0 },
        { left: Math.min(ambientViewportWidth, clusterRight + GALLERY_AMBIENT.clusterGap), right: ambientViewportWidth, outer: ambientViewportWidth }
      ];
      const placed = [];
      // 무리 아래쪽 양옆의 빈 포켓도 채우되, 팀 아이콘과 이름 아래 여백을 확보합니다.
      for (let side = 0; side < 2; side++) {
        const size = referenceSize, radius = size / 2;
        const targetX = side === 0 ? clusterLeft + radius : clusterRight - radius;
        const targetY = height - radius - 8;
        let point, bestDistance = Infinity;
        for (let row = 0; row < 7; row++) for (let column = -12; column <= 12; column++) {
          const candidate = { x: targetX + column * size / 8, y: targetY - row * size / 10, radius };
          if (candidate.x - radius < 8 || candidate.x + radius > ambientViewportWidth - 8) continue;
          const clearsTeams = spreadSlots.every(slot => {
            const teamX = ambientStageLeft + slot.x, teamRadius = slot.size * SETTINGS.galleryHoverScale / 2;
            return Math.abs(candidate.x - teamX) >= radius + teamRadius + GALLERY_AMBIENT.pieceGap ||
              candidate.y - radius >= slot.y + teamRadius + GALLERY_AMBIENT.pieceGap + 24;
          });
          const clearsPieces = placed.every(other => Math.max(Math.abs(candidate.x - other.x), Math.abs(candidate.y - other.y)) -
            radius - other.radius >= GALLERY_AMBIENT.pieceGap);
          if (!clearsTeams || !clearsPieces) continue;
          const distance = (candidate.x - targetX) ** 2 + (candidate.y - targetY) ** 2;
          if (distance < bestDistance) { point = candidate; bestDistance = distance; }
        }
        if (!point) continue;
        placed.push(point);
        ambientSlots.push({ x: point.x - ambientStageLeft, y: point.y, size, opacity: .7, priority: side });
      }
      bands.forEach((band, side) => {
        const bandWidth = band.right - band.left;
        if (bandWidth < referenceSize * .65) return;
        const edgeTeam = spreadSlots.reduce((edge, slot) => (side === 0 ? slot.x < edge.x : slot.x > edge.x) ? slot : edge);
        const count = Math.min(GALLERY_AMBIENT.maxPerSide,
          Math.max(3, Math.round(bandWidth * height / (referenceSize + GALLERY_AMBIENT.pieceGap) ** 2 * .8)));
        for (let i = 0; i < count; i++) {
          const size = referenceSize, radius = size / 2;
          // 먼저 가장 바깥 팀 바로 옆을 채우고, 나머지는 화면 끝까지 이어집니다.
          const minX = side === 0 ? -size * .18 : band.left + radius;
          const maxX = side === 0 ? band.right - radius : ambientViewportWidth + size * .18;
          if (minX > maxX) continue;
          let point;
          for (let attempt = 0; attempt < 180; attempt++) {
            const inward = Math.pow(next(), .65);
            const x = i === 0 ? (side === 0 ? maxX : minX) : i === 1 ? band.outer :
              lerp(minX, maxX, side === 0 ? inward : 1 - inward);
            const y = i === 0 && attempt === 0 ? clamp(edgeTeam.y, radius + 8, height - radius - 8) :
              radius + 8 + next() * Math.max(0, height - size - 16);
            const candidate = { x, y, radius };
            const clear = placed.every(other => Math.max(Math.abs(candidate.x - other.x),
              Math.abs(candidate.y - other.y)) - radius - other.radius >= GALLERY_AMBIENT.pieceGap);
            if (clear) { point = candidate; break; }
          }
          if (!point) continue;
          placed.push(point);
          ambientSlots.push({ x: point.x - ambientStageLeft, y: point.y, size, opacity: lerp(.5, .9, next()), priority: 5 + i * 2 + side });
        }
      });
      // 무리 위로 세 조각만 살짝 더 내밀고, 제목과 보기 버튼 영역은 비워 둡니다.
      const titleBoxes = [...toolbar.querySelectorAll('.textbox, .view-buttons')].map(element => element.getBoundingClientRect());
      for (let i = 0; i < GALLERY_AMBIENT.topCount; i++) {
        const size = referenceSize, radius = size / 2;
        for (let attempt = 0; attempt < 24; attempt++) {
          const ratio = [.25, .55, .82][i] + (next() - .5) * .07;
          const point = { x: lerp(clusterLeft, clusterRight, ratio),
            y: clusterTop - GALLERY_AMBIENT.topGap - radius - next() * 18, radius };
          if (point.y - radius < -topExtra || point.x - radius < 8 || point.x + radius > ambientViewportWidth - 8) continue;
          const clearsTitle = titleBoxes.every(box => point.x + radius + 18 <= box.left || point.x - radius - 18 >= box.right ||
            stageBox.top + point.y + radius + 18 <= box.top || stageBox.top + point.y - radius - 18 >= box.bottom);
          const clearsPieces = placed.every(other => Math.max(Math.abs(point.x - other.x), Math.abs(point.y - other.y)) -
            radius - other.radius >= GALLERY_AMBIENT.pieceGap);
          if (!clearsTitle || !clearsPieces) continue;
          placed.push(point);
          ambientSlots.push({ x: point.x - ambientStageLeft, y: point.y, size, opacity: lerp(.5, .75, next()), priority: 2 + i });
          break;
        }
      }
    }
    function targetPoints() {
      const wordWidth = Math.min(width * .98, Math.max(45, height - 24) * wordArtwork.width / wordArtwork.height, 1250) * SETTINGS.wordScale;
      const wordHeight = wordWidth * wordArtwork.height / wordArtwork.width;
      const left = (width - wordWidth) / 2, top = (height - wordHeight) / 2;
      wordLayout = { left, top, width: wordWidth, height: wordHeight };
      spacing = Math.max(8.5, wordWidth / 56);
      updateCameraZoom();
      return wordArtwork.anchors.map(anchor => {
        const pose = fragmentCameraPose(anchor.sprite, spreadSlots[anchor.sprite.team], 1);
        return { x: pose.x, y: pose.y, width: pose.width, height: pose.height,
          sprite: anchor.sprite, studentId: anchor.studentId };
      });
    }
    function layoutFloatingField() {
      const pool = wordArtwork.floating.filter(piece => !piece.glyph && Math.max(piece.width, piece.height) >= 45);
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
    function sizeRenderLayers(box) {
      // 확대되는 조각이 컨테이너 경계가 아닌 실제 화면 가장자리로 빠져나가도록 합니다.
      const dpr = Math.min(devicePixelRatio || 1, 2), padding = Math.abs(wordShiftY);
      renderBounds = { left: -box.left, top: -box.top - padding, viewportTop: -box.top, dpr,
        width: document.documentElement.clientWidth, height: innerHeight + padding * 2 };
      Object.assign(canvas.style, { left: renderBounds.left + 'px', top: -box.top + 'px',
        width: renderBounds.width + 'px', height: innerHeight + 'px', transform: 'none' });
      canvas.width = Math.round(renderBounds.width * dpr); canvas.height = Math.round(innerHeight * dpr);
      // 넓게 흩어진 팀 조각도 무대의 사각 경계에 잘리지 않도록 화면 전체를 사용합니다.
      assemblyCanvas.width = canvas.width; assemblyCanvas.height = canvas.height;
      assemblyCtx.setTransform(dpr, 0, 0, dpr, -renderBounds.left * dpr, -renderBounds.viewportTop * dpr);
      floatBatch?.resize(renderBounds.width, innerHeight, dpr);
    }
    function retainAmbientGlyphs(originals) {
      const used = new Set(), usedShapes = new Set();
      const candidates = originals.filter(item => item.piece.ambientCandidate);
      ambientParticles = [];
      // 고유 형태가 부족한 큰 화면에서도 위·아래와 좌우를 고르게 채우고 복제하지 않습니다.
      for (const slot of [...ambientSlots].sort((a, b) => a.priority - b.priority)) {
        let selected, bestScore = Infinity;
        for (const item of candidates) {
          if (usedShapes.has(item.piece.ambientShape)) continue;
          const sourceX = cameraFocus.x + (slot.x - width / 2) / cameraZoom;
          const sourceY = cameraFocus.y + (slot.y - height / 2) / cameraZoom;
          const score = (item.x - sourceX) ** 2 + (item.y - sourceY) ** 2;
          if (score < bestScore) { selected = item; bestScore = score; }
        }
        if (!selected) continue;
        used.add(selected);
        usedShapes.add(selected.piece.ambientShape);
        ambientParticles.push({ ...selected, target: slot });
      }
      return used;
    }
    function ambientPose(item, cameraScale) {
      const pose = galleryCameraPose(item.target, cameraScale);
      const sourceSize = Math.max(item.width, item.height);
      // 같은 공간에서 떠다니는 움직임도 아이콘과 함께 확대합니다. 도착 후 따로 시작하지 않습니다.
      const floatWeight = motionReduced ? 0 : cameraScale / cameraZoom;
      const phase = galleryTime * GALLERY_AMBIENT.floatSpeed * (.8 + item.speed);
      return { x: pose.x + Math.sin(phase * .83 + item.phase) * GALLERY_AMBIENT.floatX * floatWeight,
        y: pose.y + Math.sin(phase + item.phase * 1.37) * GALLERY_AMBIENT.floatY * floatWeight,
        width: pose.size * item.width / sourceSize,
        height: pose.size * item.height / sourceSize,
        opacity: lerp(1, item.target.opacity, (cameraScale - 1) / (cameraZoom - 1)) };
    }
    function layoutPassingField(originals) {
      const pool = originals.filter(item => item.piece.ambientCandidate);
      if (!pool.length) return [];
      const viewportWidth = renderBounds.width, viewportHeight = innerHeight;
      const budget = Math.min(PASSING_FIELD.maxPerLayer, Math.max(18,
        Math.round(viewportWidth * viewportHeight / PASSING_FIELD.areaPerIcon)));
      const columns = Math.min(budget, Math.ceil(Math.sqrt(budget * viewportWidth / viewportHeight)));
      const rows = Math.max(1, Math.floor(budget / columns)), result = [];
      let seed = galleryOrder.reduce((value, team) => (Math.imul(value, 31) + team + 1) >>> 0, galleryRevision + 83);
      const next = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
      for (let layer = 0; layer < PASSING_FIELD.layers; layer++) {
        // 각 깊이는 서로 다른 시점에 카메라를 지나갑니다. 끝에서는 모두 화면 밖으로 나갑니다.
        const passProgress = lerp(.62, .995, (layer + .5) / PASSING_FIELD.layers);
        const passScale = Math.pow(cameraZoom, passProgress);
        const depthRate = 1 / (1 - 1 / passScale);
        const referenceScale = Math.pow(cameraZoom, passProgress - .08);
        const itemScale = 1 / (1 - (1 - 1 / referenceScale) * depthRate);
        const focus = projectScenePoint(cameraFocus.x, cameraFocus.y, itemScale);
        for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
          const piece = pool[(layer * 11 + (row * columns + column) * 7) % pool.length].piece;
          const targetX = renderBounds.left + (column + lerp(.15, .85, next())) / columns * viewportWidth;
          const targetY = renderBounds.viewportTop + (row + lerp(.15, .85, next())) / rows * viewportHeight;
          const size = lerp(PASSING_FIELD.minSize, PASSING_FIELD.maxSize, next());
          const ratio = size / itemScale / Math.max(piece.width, piece.height);
          // 중간 화면의 고른 분포를 원래 깊이로 역투영해, 새로 튀어나오지 않고 계속 확대되게 합니다.
          result.push({ piece, x: cameraFocus.x + (targetX - focus.x) / itemScale,
            y: cameraFocus.y + (targetY - focus.y) / itemScale,
            width: piece.width * ratio, height: piece.height * ratio, depthRate, zoomOnly: true,
            opacity: lerp(.4, .7, next()), phase: next() * Math.PI * 2, speed: lerp(.2, .4, next()), drift: 0 });
        }
      }
      return result;
    }
    function layoutZoomFloating() {
      const scale = wordLayout.width / wordArtwork.width;
      const originals = wordArtwork.floating.map(piece => ({ piece,
        x: wordLayout.left + (piece.x + piece.width / 2 - wordArtwork.originX) * scale,
        y: wordLayout.top + (piece.y + piece.height / 2 - wordArtwork.originY) * scale,
        width: piece.width * scale, height: piece.height * scale,
        phase: piece.phase, speed: piece.speed, drift: piece.drift * scale, opacity: 1
      }));
      retainAmbientGlyphs(originals);
      // 작은 갤러리 주위도 원본 조각으로 채웁니다. 빈 사각 영역을 만들지 않습니다.
      zoomFloating = originals.concat(floatingField, layoutPassingField(originals)).map(item => {
        const right = renderBounds.left + renderBounds.width, bottom = renderBounds.top + renderBounds.height;
        const visualSize = Math.max(item.width, item.height) * item.piece.visualSize / Math.max(item.piece.width, item.piece.height);
        const depthRate = item.depthRate ?? approachDepthRate(visualSize / scale);
        const motionDrift = Math.max(item.drift, Math.min(WORD_FLOAT.zoomDrift, visualSize * .12));
        const unit = projectScenePoint(item.x, item.y, 2);
        const vx = unit.x - item.x, vy = unit.y - item.y;
        // 떠다니는 최대 폭까지 포함해 화면을 벗어나는 배율을 미리 구하고 이후에는 그리지 않습니다.
        // 가장 작은 조각이 최종 깊이에 도착하기 전에 근접 한계로 잘리지 않게 합니다.
        const exits = [item.zoomOnly ? PASSING_FIELD.fadeEnd / Math.max(item.width, item.height) :
          Math.max(1 / WORD_APPROACH.nearClip, cameraZoom + 1)];
        const rightSpeed = vx - motionDrift - item.width / 2;
        const leftSpeed = vx + motionDrift + item.width / 2;
        const bottomSpeed = vy - motionDrift - item.height / 2;
        const topSpeed = vy + motionDrift + item.height / 2;
        if (rightSpeed > 0) exits.push((right + 2 - item.x + vx) / rightSpeed);
        if (leftSpeed < 0) exits.push((renderBounds.left - 2 - item.x + vx) / leftSpeed);
        if (bottomSpeed > 0) exits.push((bottom + 2 - item.y + vy) / bottomSpeed);
        if (topSpeed < 0) exits.push((renderBounds.top - 2 - item.y + vy) / topSpeed);
        const exitScale = Math.max(1, Math.min(...exits));
        return { ...item, vx, vy, depthRate, motionDrift, exitAt: (1 - 1 / exitScale) / depthRate };
      }).sort((a, b) => b.exitAt - a.exitAt);
      restFloating = zoomFloating.filter(item => !item.piece.glyph && !item.zoomOnly);
      const cache = wordArtwork.background, dpr = renderBounds.dpr;
      cache.width = Math.round(width * dpr); cache.height = Math.round(height * dpr);
      const cacheCtx = cache.getContext('2d');
      cacheCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const item of zoomFloating) if (item.piece.glyph && !item.zoomOnly) {
        const piece = item.piece;
        cacheCtx.drawImage(wordArtwork.floatAtlas, piece.ax, piece.ay, piece.gw, piece.gh,
          item.x - item.width / 2, item.y - item.height / 2, item.width, item.height);
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
        if (wordPositionChanged || ambientViewportWidth !== document.documentElement.clientWidth || Math.abs(ambientStageLeft - box.left) > .1) {
          sizeRenderLayers(box); layoutGalleryAmbient(); layoutZoomFloating(); draw();
        }
        return;
      }
      width = nextWidth; height = nextHeight;
      sizeRenderLayers(box);
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
      updateCameraZoom();
      layoutFloatingField();
      layoutZoomFloating();
      scrollTarget = readScroll(); spread = scrollTarget;
      if (!teamEntryInitialized) snapTeamEntry(spread);
      settle(); draw();
      setHint();
    }
    function settle() {
      for (const p of particles) { p.x = p.tx; p.y = p.ty; p.vx = p.vy = p.spin = 0; p.angle = p.targetAngle; }
    }
    function draw() {
      if (!loaded || !viewActive || !width || !height) return;
      // 검색 영역이 비어 있는 첫 화면은 글자를 화면 중앙에 놓습니다.
      // 화면 크기의 캔버스 안에서 좌표만 이동해 확대 중에도 페이지 높이는 유지합니다.
      const wordOffset = wordRenderOffset(spread);
      designerPanel.hidden = selectedTeam < 0 && !detailProgress.some(progress => progress > 0);
      const bounds = renderBounds;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(bounds.dpr, 0, 0, bounds.dpr, -bounds.left * bounds.dpr, (-bounds.viewportTop + wordOffset) * bounds.dpr);
      assemblyCtx.clearRect(bounds.left, bounds.viewportTop, bounds.width, innerHeight);
      const galleryPoses = spreadSlots.map((_, team) => galleryPose(team));
      const t = clamp(spread, 0, 1);
      const cameraScale = currentCameraScale();
      // 투명 버튼도 실제로 그려진 아이콘의 위치와 크기를 따라갑니다.
      let interactiveCount = 0;
      iconButtons.forEach((button, team) => {
        const base = spreadSlots[team], pose = galleryCameraPose(galleryPoses[team], cameraScale);
        const interactive = teamInteractive(team, pose);
        button.hidden = !interactive;
        if (interactive) interactiveCount++;
        const hitScale = Math.max(24, pose.size) / Math.max(44, base.size);
        button.style.transform = 'translate(' + (pose.x - base.x) + 'px,' + (pose.y + wordOffset - base.y) + 'px) scale(' + hitScale + ')';
        button.classList.toggle('is-hovered', hoverTarget(team) === 1);
      });
      iconList.hidden = interactiveCount === 0;
      // 기준 팀 아이콘과 회색 장식을 같은 카메라로 확대합니다.
      const approach = (cameraScale - 1) / (cameraZoom - 1);
      const cameraTravel = 1 - 1 / cameraScale;
      // 확대가 끝나도 조각은 계속 이동하며, 모두 안착한 뒤 같은 위치의 원본 SVG로 넘깁니다.
      const iconOpacity = smooth(teamEntryFinish, teamEntryFinish + TEAM_ENTRY.handoffDuration, teamEntryTime), fragmentOpacity = 1 - iconOpacity;
      const attention = Math.max(...detailProgress);
      lastDraw = [];
      // 움직임이 시작되면 통짜 글자 이미지를 쓰지 않고, 모든 획을 개별 아이콘으로 그립니다.
      if (approach === 0) ctx.drawImage(wordArtwork.background, 0, 0, width, height);
      if (t < 1 || ambientParticles.length) {
        const visibleTop = bounds.viewportTop - wordOffset, visibleBottom = visibleTop + innerHeight;
        const ambientVisibility = 1 - smooth(0, .25, Math.max(...detailProgress));
        // 지나가는 작은 조각도 확대가 마무리되는 동안 함께 사라집니다.
        const departingOpacity = 1 - smooth(WORD_APPROACH.handoffStart, WORD_APPROACH.clearEnd, t);
        const intro = clamp(idleTime / WORD_FLOAT.intro, 0, 1);
        const idleAmount = motionReduced ? 0 : intro < .5 ? 4 * intro ** 3 : 1 - (-2 * intro + 2) ** 3 / 2;
        const zoomMotion = smooth(0, .16, t);
        const passingOpacity = smooth(.24, .34, t);
        floatPasses.forEach(pass => { pass.items.length = 0; });
        for (const item of approach === 0 ? restFloating : zoomFloating) {
          if (cameraTravel >= item.exitAt || departingOpacity === 0) break;
          if (item.zoomOnly && passingOpacity === 0) continue;
          // 원근 투영: 모두 동시에 움직이되 가까운(큰) 아이콘일수록 더 빠르게 커집니다.
          const distance = 1 - cameraTravel * item.depthRate;
          const itemScale = 1 / distance;
          const w = item.width * itemScale, h = item.height * itemScale;
          let x = item.x + item.vx * (itemScale - 1) - w / 2;
          let y = item.y + item.vy * (itemScale - 1) - h / 2;
          // 확대 중에도 계속 떠다니되 가까워진 아이콘의 흔들림은 화면 기준 36px 이내로 제한합니다.
          const phase = idleTime * item.speed;
          const baseDrift = lerp(item.drift, item.motionDrift, zoomMotion) * idleAmount;
          const drift = baseDrift * itemScale / (1 + baseDrift * (itemScale - 1) / WORD_FLOAT.maxTravel);
          x += Math.sin(phase + item.phase) * drift;
          y += Math.cos(phase * .81 + item.phase) * drift;
          if (x + w < bounds.left || x > bounds.left + bounds.width ||
              y + h < visibleTop || y > visibleBottom) continue;
          item.drawX = x - bounds.left; item.drawY = y - visibleTop;
          item.drawWidth = w; item.drawHeight = h;
          // 초점도 마지막 팀 아이콘의 깊이를 따릅니다. 그 앞을 지나가는 조각만 흐려집니다.
          const focusRatio = itemScale / cameraScale;
          const nearOpacity = item.zoomOnly ? 1 - smooth(PASSING_FIELD.fadeStart, PASSING_FIELD.fadeEnd, Math.max(w, h)) :
            lerp(1, smooth(WORD_APPROACH.nearClip, WORD_APPROACH.nearFade, distance),
              smooth(1, FLOAT_BLUR.startRatio, focusRatio));
          item.drawOpacity = item.opacity * departingOpacity * nearOpacity * (item.zoomOnly ? passingOpacity : 1);
          // 지나가는 더미는 기존 0~5px 블러 배치만 사용해 형태를 선명하게 유지합니다.
          const blurLevel = smooth(FLOAT_BLUR.startRatio, FLOAT_BLUR.fullRatio, focusRatio) *
            (floatPasses.length - 1) * (item.zoomOnly ? PASSING_FIELD.blurStrength : 1);
          item.blurLow = Math.floor(blurLevel); item.blurMix = blurLevel - item.blurLow;
          floatPasses[item.blurLow].items.push(item);
          if (item.blurMix > 0) floatPasses[item.blurLow + 1].items.push(item);
        }
        const paintPass = (pass, index) => {
          if (floatBatch) floatBatch.clear();
          else {
            if (!floatFallbackCanvas) {
              floatFallbackCanvas = document.createElement('canvas');
              floatFallbackCtx = floatFallbackCanvas.getContext('2d');
            }
            if (floatFallbackCanvas.width !== canvas.width) floatFallbackCanvas.width = canvas.width;
            if (floatFallbackCanvas.height !== canvas.height) floatFallbackCanvas.height = canvas.height;
            floatFallbackCtx.setTransform(1, 0, 0, 1, 0, 0);
            floatFallbackCtx.clearRect(0, 0, canvas.width, canvas.height);
            floatFallbackCtx.setTransform(bounds.dpr, 0, 0, bounds.dpr, 0, 0);
          }
          for (const item of pass.items) {
            const piece = item.piece;
            const opacity = item.drawOpacity * (index === item.blurLow ? 1 - item.blurMix : item.blurMix);
            if (floatBatch) floatBatch.add(piece, item.drawX, item.drawY, item.drawWidth, item.drawHeight, 0, opacity);
            else {
              floatFallbackCtx.globalAlpha = opacity;
              floatFallbackCtx.drawImage(wordArtwork.floatAtlas, piece.ax, piece.ay, piece.gw, piece.gh,
                item.drawX, item.drawY, item.drawWidth, item.drawHeight);
            }
          }
        };
        for (let index = 0; index < floatPasses.length; index++) {
          const pass = floatPasses[index];
          if (!pass.items.length) continue;
          paintPass(pass, index);
          if (floatBatch && !floatBatch.flush(wordArtwork.floatAtlas)) {
            floatBatch.dispose(); floatBatch = null; paintPass(pass, index);
          }
          ctx.save();
          // 인접한 블러 단계를 더해 섞으면 전환 중 아이콘의 불투명도가 줄지 않습니다.
          if (index > 0) ctx.globalCompositeOperation = 'lighter';
          ctx.filter = pass.radius ? `blur(${pass.radius * bounds.dpr}px)` : 'none';
          ctx.drawImage(floatBatch ? floatCanvas : floatFallbackCanvas, bounds.left, visibleTop, bounds.width, innerHeight);
          ctx.restore();
        }
        // 화면에 남는 회색 아이콘은 가까이 지나가는 장식과 분리해 선명하게 그립니다.
        if (ambientVisibility > 0) for (const item of ambientParticles) {
          const pose = ambientPose(item, cameraScale), piece = item.piece;
          const x = pose.x - pose.width / 2, y = pose.y - pose.height / 2;
          if (x + pose.width < bounds.left || x > bounds.left + bounds.width ||
              y + pose.height < visibleTop || y > visibleBottom) continue;
          ctx.globalAlpha = pose.opacity * ambientVisibility;
          ctx.drawImage(wordArtwork.floatAtlas, piece.ax, piece.ay, piece.gw, piece.gh, x, y, pose.width, pose.height);
        }
        ctx.globalAlpha = 1;
        // 조각 전체를 한 번 합성해 회색으로 바꿉니다. 추가 SVG·픽셀 처리·개별 필터는 사용하지 않습니다.
        const grayAmount = smooth(0, .32, t);
        if (grayAmount > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'source-atop';
          ctx.globalAlpha = grayAmount;
          ctx.fillStyle = '#dedede';
          ctx.fillRect(bounds.left, visibleTop, bounds.width, innerHeight);
          ctx.restore();
        }
      }
      if (fragmentOpacity > 0) for (const p of particles) {
        if (fragmentOpacity === 0) continue;
        const opacity = lerp(1, visibleTeams[p.team] ? 1 : 0, t) *
          (1 - smooth(0, .18, detailProgress[p.team])) * lerp(1, .14, attention);
        if (opacity < .001) continue;
        const slot = galleryPoses[p.team], piece = p.sprite;
        const pose = teamEntryPose(p, slot, cameraScale, teamEntryTime);
        if (!pose) continue;
        const pieceOpacity = opacity * (pose.opacity ?? 1);
        if (pieceOpacity < .001) continue;
        const w = pose.width, h = pose.height;
        const x = pose.x, y = pose.y, angle = piece.hoverAngle * galleryHover[p.team];
        const halo = pose.blur > .001 ? TEAM_ENTRY_BLUR.padding / TEAM_ENTRY_BLUR.size : 0;
        if (x + w * (.5 + halo) < bounds.left || x - w * (.5 + halo) > bounds.left + bounds.width ||
            y + h * (.5 + halo) < bounds.viewportTop - wordOffset || y - h * (.5 + halo) > bounds.viewportTop + innerHeight - wordOffset) continue;
        assemblyCtx.save(); assemblyCtx.globalAlpha = pieceOpacity; assemblyCtx.translate(x, y); assemblyCtx.rotate(angle);
        drawTeamEntryPiece(assemblyCtx, piece, w, h, pose.blur, pose.colorAmount);
        assemblyCtx.restore();
        lastDraw.push({ id: p.id, name: piece.name, color: piece.color, kind: "color-group", role: "assembly",
          team: p.team, studentId: p.studentId, x, y, size: Math.max(w, h), angle, opacity: pieceOpacity * fragmentOpacity });
      }
      // Hand off at the same projected position and size after the pieces settle.
      if (iconOpacity > 0) {
        // Fade the composed pieces once, then add the original with the
        // complementary weight. Source-over crossfades dip to 75% opacity
        // halfway through and flash against the white page.
        assemblyCtx.save();
        assemblyCtx.globalCompositeOperation = 'destination-in';
        assemblyCtx.globalAlpha = fragmentOpacity;
        assemblyCtx.fillRect(bounds.left, bounds.viewportTop, bounds.width, innerHeight);
        assemblyCtx.globalCompositeOperation = 'lighter';
        sprites.forEach((icon, team) => {
          if (!visibleTeams[team]) return;
          const { x, y, size } = galleryCameraPose(galleryPoses[team], cameraScale);
          const detail = detailProgress[team];
          const opacity = iconOpacity * (1 - smooth(0, .18, detail)) * lerp(1, .14, attention);
          if (opacity <= 0) return;
          assemblyCtx.globalAlpha = opacity;
          drawTeamHover(assemblyCtx, icon, team, x, y, size);
          lastDraw.push({ name: icon.name, kind: "icon", team, x, y, size, angle: 0, opacity });
        });
        assemblyCtx.restore();
      }
      ctx.drawImage(assemblyCanvas, bounds.left, bounds.viewportTop, bounds.width, innerHeight);
      if (attention > 0) {
        // Reuse the same fill-color groups, moving the intact group beside its
        // member card. No subpath splitting or duplicate full icon is used.
        fragments.forEach((bank, team) => {
          const detail = detailProgress[team];
          if (detail < .001 || !detailTargets[team].length) return;
          const slot = galleryPoses[team];
          // 상세 아이콘은 전체 결합 완료를 기다리지 않고 현재 조각 위치에서 출발합니다.
          ctx.save();
          ctx.setTransform(bounds.dpr, 0, 0, bounds.dpr, -bounds.left * bounds.dpr, -bounds.viewportTop * bounds.dpr);
          bank.forEach((piece, i) => {
            const target = detailTargets[team][i];
            const pose = detailPiecePose(team, i, slot, cameraScale);
            const { x, y, width: w, height: h, angle } = pose;
            const opacity = smooth(0, .18, detail) * pose.opacity;
            if (opacity <= .001) return;
            ctx.save(); ctx.globalAlpha = opacity; ctx.translate(x, y); ctx.rotate(angle);
            drawTeamEntryPiece(ctx, piece, w, h, pose.blur, pose.colorAmount); ctx.restore();
            lastDraw.push({ name: piece.name, color: piece.color, kind: 'color-group', role: 'detail', team, studentId: target.studentId, x, y, size: Math.max(w, h), angle, opacity });
          });
          ctx.restore();
        });
        ctx.globalAlpha = 1;
      }
      const titleOpacity = smooth(.35, .88, spread);
      spreadHeading.style.opacity = String(titleOpacity);
      spreadHeading.style.transform = "translateY(" + (1 - titleOpacity) * 12 + "px)";
      spreadHeading.setAttribute("aria-hidden", String(spread < .95));
      updateToolbar();
    }
    function wake(duration = 2600) {
      if (!viewActive || paused || motionReduced || document.hidden || !loaded || window.DesignerReturnState?.restoring || document.documentElement.classList.contains('page-transition-active')) return;
      until = Math.max(until, performance.now() + duration);
      if (!raf) { previousTime = 0; raf = requestAnimationFrame(frame); }
    }
    function frame(now) {
      raf = 0;
      if (!viewActive || paused || motionReduced || document.hidden || window.DesignerReturnState?.restoring || document.documentElement.classList.contains('page-transition-active')) return;
      const dt = previousTime ? clamp((now - previousTime) / 16.667, .25, 2) : 1;
      const entryElapsed = previousTime ? clamp(now - previousTime, 0, 50) : 0;
      previousTime = now;
      if (idleActive()) idleTime += dt / 60;
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
      advanceTeamEntry(entryElapsed);
      let detailMoving = false;
      detailProgress.forEach((progress, team) => {
        const target = team === selectedTeam ? 1 : 0;
        let next = lerp(progress, target, 1 - Math.pow(.86, dt));
        if (Math.abs(next - target) < .0005) next = target;
        detailProgress[team] = next;
        if (next !== target) detailMoving = true;
      });
      draw();
      setHint();
      if (idleActive() || galleryIdleActive() || teamEntryActive() || hoverMoving || spread !== scrollTarget || detailMoving) raf = requestAnimationFrame(frame);
      else { settle(); draw(); }
    }
    function scatter() {
      scrollToState(readScroll() <= .001);
    }
    function setHint() {
      const message = selectedTeam >= 0 ? "빈 곳을 누르면 아이콘이 다시 모입니다." : !iconList.hidden ? "아이콘을 누르면 디자이너를 볼 수 있습니다." : scrollTarget > .01 ? "33명의 개인 아이콘이 모여 14개의 팀 아이콘이 됩니다." : "아래로 스크롤하면 개인 아이콘이 팀별로 모입니다.";
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
      if (paused) { cancelAnimationFrame(raf); raf = 0; spread = scrollTarget; snapTeamEntry(spread); syncDetailsInstantly(); settle(); draw(); } else wake();
      setHint();
    });
    reducedMotion.addEventListener("change", (event) => {
      motionReduced = event.matches;
      galleryHover.forEach((_, team) => { galleryHover[team] = hoverTarget(team); });
      if (motionReduced && stepDestination !== null) scrollToState(stepDestination === 1);
      if (motionReduced) { cancelAnimationFrame(raf); raf = 0; spread = scrollTarget; snapTeamEntry(spread); syncDetailsInstantly(); settle(); draw(); } else wake();
      setHint();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else wake();
    });
    document.addEventListener('page-transition:change', event => {
      if (event.detail.active) { cancelAnimationFrame(raf); raf = 0; previousTime = 0; }
      else wake();
    });
    async function init() {
      if (!ctx || !assemblyCtx) throw new Error("이 브라우저에서는 Canvas를 사용할 수 없습니다.");
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
      hoverLayers = fragments.map(bank => {
        bank.forEach((piece, index) => {
          // 1개: +3도, 2개: +3/-3도, 3개: +3/0/-3도.
          piece.hoverAngle = TEAM_HOVER.degrees * (bank.length === 1 ? 1 : 1 - 2 * index / (bank.length - 1)) * Math.PI / 180;
        });
        return [...bank].sort((a, b) => a.layer - b.layer);
      });
      // 한 조각인 팀도 색상 전환을 마친 뒤 완성 아이콘으로 넘깁니다.
      teamEntryFinish = Math.max(0, ...fragments.map((_, team) => teamEntryTiming(team, 1).end));
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
        shuffleGallery();
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
    // Let the page wipe wait for the first still frame instead of competing with SVG preparation.
    window.DesignerFormationReady = init().catch((error) => {
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
  
