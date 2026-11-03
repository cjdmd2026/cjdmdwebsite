/* =========================================================
   Main Hero — 포스터 영역 (스크롤 1번 = 한 단계)
   단계 0 : 포스터를 이루는 우리 아이콘들이 화면 전체에 흩어져 떠다님
   단계 1 : (스크롤 1번) 아이콘이 포스터 속 자리로 모여 '결합' 완성
            → 뒤에 포스터 그래픽이 먼저 깔리고, 아이콘은 입자처럼 닦여 사라짐
   단계 2 : (스크롤 1번) 그래픽이 왼쪽 포스터 자리로 이동, 오른쪽 설명 노출,
            배경 아이콘이 퍼지며 자리잡음 → 포스터가 입자 느낌으로 닦이며 나타남
   정착 후 : 일정 간격으로 기본 ↔ 다크 포스터 자동 전환
            포스터가 먼저 왼쪽→오른쪽으로 입자처럼 닦이고, 배경은 조금 늦게·느리게 같은 방향
            포스터 클릭 시 즉시 전환
   위로 스크롤하면 단계가 거꾸로 돌아갑니다.
   ========================================================= */
(() => {
    "use strict";

    /* ---------- 조절값 ---------- */
    const SETTINGS = {
        autoInterval: 5500,      // 포스터 자동 전환 간격(ms)
        posterWipe: 720,         // 포스터 전환 시간(ms): 기존 포스터가 왼쪽부터 입자로 부서져 오른쪽으로 날아감
        bgDelay: 150,            // 배경 시작: 포스터 전환이 1/3쯤 남았을 때 (포스터 전환 중반부터 함께)
        bgWipe: 720,             // 배경 닦이는 시간(ms) — 포스터보다 조금 느리게
        bigFrameHeight: 0.92,    // '결합' 크게 보일 때 그래픽 높이 (화면 높이 대비)
        iconBlurFullSize: 8,     // 원본 기준: 가장 작은 아이콘은 최대 블러 유지
        iconBlurClearSize: 40,   // 이 크기까지 블러를 점진적으로 줄이고, 큰 아이콘은 선명하게
        iconBlurMax: 3.5,        // 원본 기준 최대 블러 반경 — 화면 크기에 맞춰 함께 축소
        iconBlurLayers: 6,      // 약한 블러부터 강한 블러까지, 인접 단계를 섞어 연속적으로 표현
        iconBlurPixelBudget: 1440 * 900, // 블러 레이어별 최대 픽셀 수 — 큰 화면의 합성 비용 제한
        maxFPS: 60,             // 120/144Hz 화면에서도 아이콘 연산은 초당 최대 60회
        idleFPS: 30,            // 아주 느린 부유는 30fps, 결합·스크롤·마우스 반응은 60fps
        iconBlurFalloff: 3,     // 중간 크기도 최대 강도에 몰리지 않도록 크기에 따라 빠르게 완화
        iconPushMinSize: 8,      // 원본 기준: 가장 작은 아이콘의 마우스 반응
        iconPushFullSize: 40,    // 이 크기부터 기존 마우스 반응 강도 유지
        iconPushMinStrength: .15,// 가장 작은 아이콘은 기존 힘의 15%만 적용
        iconScatterSpeed: .14,   // 첫 화면에서는 아주 느린 흐름으로 움직임
        iconScatterDistance: 1.25, // 작은 흔들림보다 길게 미끄러지는 부유 경로
        iconIdleFullSize: 8,     // 결합 상태에서 가장 작은 아이콘은 천천히 떠다님
        iconIdleMaxSize: 24,     // 떠다니는 작은 아이콘의 크기에 따른 움직임 강도 기준
        iconIdleDistance: 27,    // 원본 기준 이동 반경 — 화면에 맞춰 함께 축소
        iconIdleIntro: 2,        // 결합 후 떠다니는 움직임이 서서히 시작되는 시간(초)
        iconIdleStrokeFalloff: 48, // 획에서 멀어질수록 기존 이동 범위로 돌아오는 거리
        iconSideMaxCount: 1800,   // 결합 글자 주변을 더 풍성하게 채우되 최대 개수 제한 (양쪽 합계)
        iconSideAreaPerIcon: 500, // 여백 면적에 맞춰 기존보다 촘촘하게 배치
        iconSideMinWidth: 64,     // 좁은 모바일 여백에는 추가하지 않아 글자를 가리지 않음
        iconSideSpreadStart: .3, // 결합 도중부터 개별 아이콘이 퍼지는 흐름을 이어감
        iconSideSpreadStagger: 280, // 결합 완료 무렵 거의 자리 잡도록 개별 출발 시차를 압축(ms)
        iconSideTravelMin: 320,  // 서로 다른 속도와 감속은 유지하며 전체 방출을 760ms로 단축
        iconSideTravelMax: 480,
        iconSideFadeOut: 480,    // 역스크롤 때 현재 자리에서 부드럽게 사라지는 시간(ms)
        iconSideIdleDistance: 30, // 원본 기준 개별 부유 반경 — 화면 크기에 맞춰 함께 축소
        iconForegroundScale: .22, // 큰 아이콘은 전경에서 최대 22% 크게 떠 있다가 원래 크기로 안착
        iconGatherFirstEnd: .72, // 개별 이동은 648ms로 여유를 두고 서로 겹치게 함
        iconGatherLastStart: .28, // 출발·도착 시차는 252ms로 큰 아이콘부터 촘촘하게 연결
        iconGatherRankBlend: .7, // 크기와 크기순 순위를 함께 반영해 작은 아이콘의 도착이 몰리지 않게 함
        iconGatherOutwardScale: .18, // 작은 아이콘은 화면 중심에서 바깥쪽으로 살짝 밀린 뒤 합류
        iconGatherTurnOverlap: .16, // 바깥 밀림과 합류 시작을 겹쳐 중간에 멈추지 않고 방향을 바꿈
        iconGatherCurve: .04,    // 이동 거리의 4%만 옆으로 휘어 중앙까지 완만한 곡선으로 합류
        iconOffscreenRatio: .15,  // 첫 화면에 약 85%를 보이고, 나머지는 화면 밖에서 합류
        iconOffscreenNear: .18,   // 화면 가장자리에서 충분히 떨어져 부유 중에도 안으로 비치지 않게 함
        iconOffscreenFar: .65,    // 위·아래·양옆에서 서로 다른 거리로 날아옴 (화면 크기 기준)
        // 단계 전환 시간(ms)
        fly: 900, scatter: 1275, // 648ms 이동 + 252ms 시차, 마지막 안착에 조금 더 여유를 줌
        graphicIn: 320, dissolve: 420,
        move: 1250, reveal: 380,
        clickSwitch: 280          // 포스터 클릭 시 빠른 전환(ms)
    };

    const hero = document.getElementById("hero");
    const stage = document.getElementById("heroStage");
    const canvas = document.getElementById("heroCanvas");
    const bgCanvas = document.getElementById("heroBg");
    const posterButton = document.getElementById("heroPoster");
    const posterCanvas = document.getElementById("heroPosterCanvas");
    const download = document.getElementById("posterDownload");
    const indicator = document.getElementById("heroIndicator");
    const header = document.querySelector(".header");
    const heroAmbient = stage?.querySelector(".hero-ambient");
    if (!hero || !stage || !canvas || !posterButton || !posterCanvas || !bgCanvas) return;

    const ctx = canvas.getContext("2d");
    // 인접한 블러 레이어를 크기별 비율로 섞어 강도가 경계 없이 이어지게 합니다.
    // 필터는 레이어에만 적용해 수천 개 아이콘의 개별 필터 연산을 피합니다.
    const blurLayers = Array.from({ length: SETTINGS.iconBlurLayers }, (_, i) => {
        let layerCanvas = document.createElement("canvas");
        const batch = window.createHeroSpriteBatch?.(layerCanvas) || null;
        // WebGL 초기화가 중간에 실패한 캔버스도 새 2D 캔버스로 안전하게 대체합니다.
        if (!batch) layerCanvas = document.createElement("canvas");
        layerCanvas.id = `heroSoftCanvas${i + 1}`;
        layerCanvas.className = canvas.className;
        layerCanvas.setAttribute("aria-hidden", "true");
        return { canvas: layerCanvas, batch, ctx: batch ? null : layerCanvas.getContext("2d"), strength: (i + 1) / SETTINGS.iconBlurLayers, alpha: 1, dirty: false };
    });
    // 강하게 흐린 작은 아이콘이 뒤에, 선명한 큰 아이콘이 앞에 놓입니다.
    for (const layer of [...blurLayers].reverse()) canvas.before(layer.canvas);
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const posters = window.MAIN_POSTERS || [
        { theme: "light", image: "", pdf: "", background: "#fff" },
        { theme: "dark", image: "", pdf: "", background: "#000" }
    ];
    // 버전별(light/dark) 결합 아이콘 배치 — 포스터마다 아이콘 배치가 달라 따로 사용
    const SP = window.MAIN_POSTER_SPRITES || { w: 1, h: 1, s: [] };
    const SETS = SP.light ? SP : { light: SP };
    const SPRITES = SETS.light;

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    // 결합 전용: 40% 지점부터 길게 감속하며, 도착할 때 속도·가속도·가속도의 변화율까지 0이 됩니다.
    const easeGather = t => t * t * t * (20 + t * (-45 + t * (36 - 10 * t)));
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const lerp = (a, b, t) => a + (b - a) * t;
    const rand = (a, b) => a + Math.random() * (b - a);

    /* ---------- 이미지 ---------- */
    const scriptURL = document.currentScript?.src || document.baseURI;
    const loadImage = src => {
        if (!src) return null;
        const img = new Image();
        img.decoding = "async";
        img.src = new URL(src, scriptURL).href;
        return img;
    };
    const ready = img => img && img.complete && img.naturalWidth > 0;
    // 버전별(블랙/화이트) 아이콘 색 아틀라스와 포스터 속 결합 위치 보정
    const atlases = { light: loadImage(SETS.light?.atlas), dark: loadImage(SETS.dark?.atlas) };
    const themeOf = () => posters[current]?.theme === "dark" ? "dark" : "light";
    const atlasNow = () => atlases[themeOf()] || atlases.light || atlases.dark;
    const fitNow = () => [1, 0, 0];   // 버전별 원본에서 직접 뽑아 보정 불필요
    // '결합'은 이미지로 교체하지 않고 아이콘 그대로 왼쪽 포스터 자리로 이동 → 포스터가 나타나면 사라짐
    const currentGraphic = () => null;
    const hasGraphic = () => false;
    const posterImages = posters.map(p => loadImage(p.image));

    /* =====================================================
       애니메이션 값 (tween)
    ===================================================== */
    const V = {
        fly: 0,        // 아이콘: 흩어짐(0) → 자리(1)
        sideSpread: 0, // 주변 아이콘은 결합 이후에도 독립적으로 하나씩 퍼짐
        sideOpacity: 0, // 역스크롤에서는 이동을 멈추고 투명도만 낮춤
        graphic: 0,    // 그래픽이 아이콘 뒤에 깔림
        dissolve: 0,   // 아이콘이 입자처럼 사라짐
        move: 0,       // 그래픽: 화면 중앙(0) → 포스터 자리(1)
        reveal: 0,     // 포스터가 그래픽 위로 닦이며 나타남
        text: 0,       // 설명 텍스트
        ambient: 0     // 배경 아이콘
    };
    const tweens = new Map();
    function tween(key, to, duration, { delay = 0, ease = easeInOut } = {}) {
        return new Promise(resolve => {
            tweens.get(key)?.resolve();
            if (reducedMotion.matches) duration = Math.min(duration, 200);
            const from = V[key];
            const start = performance.now() + delay;
            tweens.set(key, { from, to, start, duration, ease, resolve });
        });
    }
    function stepTweens(now) {
        tweens.forEach((t, key) => {
            if (now < t.start) return;
            const p = t.duration ? clamp((now - t.start) / t.duration) : 1;
            V[key] = lerp(t.from, t.to, t.ease(p));
            if (p >= 1) { tweens.delete(key); t.resolve(); }
        });
    }
    function setNow(values) {
        Object.entries(values).forEach(([k, v]) => { tweens.get(k)?.resolve(); tweens.delete(k); V[k] = v; });
    }

    /* =====================================================
       1. 아이콘 (스프라이트)
    ===================================================== */
    let W = 1, H = 1, DPR = 1;
    let stageLeft = 0, stageTop = 0, headerHeight = 70;
    let iconSets = { light: [], dark: [] };
    let sideIconSets = { light: [], dark: [] }, sideFields = { light: [], dark: [] };
    // 개별 방출과 부유를 같은 경로로 그립니다. 페이드아웃·동작 줄이기에서는 그린 캔버스를 재사용합니다.
    const sideLayers = [-1, 1].map(side => {
        const c = document.createElement("canvas");
        c.className = "hero-side-icons";
        c.setAttribute("aria-hidden", "true");
        c.style.cssText = "position:absolute;pointer-events:none;z-index:2;opacity:0;";
        canvas.before(c);
        return { side, canvas: c, ctx: c.getContext("2d"), populated: false, progress: -1, reduced: false };
    });
    let sideCacheKey = "";
    let sideFloatTime = 0, sideLastTime = null;
    let sideBatch = null, sideBatchCanvas = null, sideBatchUnavailable = false, sideBatchSize = "";
    const sideGpuFrame = { left: 0, top: 0, items: null, progress: -1, reduced: false, floatTime: 0 };
    const iconsNow = () => iconSets[themeOf()]?.length ? iconSets[themeOf()] : iconSets.light;
    const iconPhysics = new WeakMap();
    const pointerCellSize = 128;
    const settledCache = { canvas: document.createElement("canvas"), key: "", floating: [] };
    settledCache.ctx = settledCache.canvas.getContext("2d");
    let bigFrame = { x: 0, y: 0, w: 1, h: 1 };
    let smallFrame = { x: 0, y: 0, w: 1, h: 1 };

    function buildIcons() {
        function scatterPosition() {
            // 좌우 화면 밖까지 조금 겹쳐 배치해 부유 중에도 가장자리에 빈 띠가 생기지 않게 합니다.
            if (Math.random() >= SETTINGS.iconOffscreenRatio) return { sx: rand(-.03, 1.03), sy: rand(.03, .97) };
            const edge = Math.floor(Math.random() * 4);
            const distance = rand(SETTINGS.iconOffscreenNear, SETTINGS.iconOffscreenFar);
            const along = rand(-.12, 1.12);
            if (edge === 0) return { sx: -distance, sy: along };
            if (edge === 1) return { sx: 1 + distance, sy: along };
            if (edge === 2) return { sx: along, sy: -distance };
            return { sx: along, sy: 1 + distance };
        }
        const pushStrength = size => lerp(SETTINGS.iconPushMinStrength, 1,
            clamp((size - SETTINGS.iconPushMinSize) / (SETTINGS.iconPushFullSize - SETTINGS.iconPushMinSize)));
        const idleStrength = size => 1 - clamp((size - SETTINGS.iconIdleFullSize) /
            (SETTINGS.iconIdleMaxSize - SETTINGS.iconIdleFullSize));
        const blurLevel = size => {
            const t = clamp((SETTINGS.iconBlurClearSize - size) / (SETTINGS.iconBlurClearSize - SETTINGS.iconBlurFullSize));
            // 원본 8px 이하: 최대 / 13px: 약 60% / 18px: 약 32% / 24px: 약 13%.
            return Math.pow(t, SETTINGS.iconBlurFalloff) * blurLayers.length;
        };
        function glyphMotionStrengths(set) {
            // 확정 포스터(1130 × 1600)의 글자 획만 고정합니다.
            // 주변 밀도나 큰 아이콘과의 거리에 관계없이 획 사이와 외곽은 떠다닙니다.
            const strokes = [
                { r: 40, p: [[320, 195], [610, 195], [610, 300], [585, 355], [480, 390], [320, 390]] }, // ㄱ
                { r: 42, p: [[810, 190], [810, 400]] }, // ㅕ
                { r: 38, p: [[710, 250], [810, 250]] },
                { r: 38, p: [[710, 360], [810, 360]] },
                { r: 40, p: [[330, 490], [810, 490], [810, 590], [330, 590], [330, 690], [810, 690]] }, // ㄹ
                { r: 42, p: [[440, 810], [440, 835]] }, // ㅎ의 위쪽 획
                { r: 40, p: [[310, 875], [590, 875]] },
                { r: 50, p: [[795, 845], [795, 1170]] }, // ㅏ
                { r: 40, p: [[795, 995], [850, 995]] },
                { r: 54, p: [[355, 1230], [355, 1415]] }, // ㅂ
                { r: 55, p: [[790, 1230], [790, 1415]] },
                { r: 42, p: [[350, 1415], [810, 1415]] },
                { r: 40, p: [[350, 1300], [810, 1300]] }
            ];
            const segments = strokes.flatMap(({ r, p }) => p.slice(1).map(([bx, by], i) => {
                const [ax, ay] = p[i], dx = bx - ax, dy = by - ay;
                return { ax, ay, dx, dy, lengthSquared: dx * dx + dy * dy, radius: r };
            }));
            return (set?.s || []).map(([x, y, w, h]) => {
                const cx = (x + w / 2) * 1130 / set.w, cy = (y + h / 2) * 1600 / set.h;
                let distance = Infinity;
                for (const { ax, ay, dx, dy, lengthSquared, radius } of segments) {
                    const t = clamp(((cx - ax) * dx + (cy - ay) * dy) / lengthSquared);
                    distance = Math.min(distance, Math.hypot(cx - ax - t * dx, cy - ay - t * dy) - radius);
                }
                // ㅎ의 둥근 획: 안쪽 빈 공간은 고정 영역에서 제외합니다.
                const outer = Math.hypot((cx - 460) / 165, (cy - 1060) / 130);
                const inner = Math.hypot((cx - 460) / 90, (cy - 1060) / 60);
                // 타원 경계까지의 거리는 짧은 반지름을 기준으로 근사합니다.
                const ringDistance = outer > 1 ? (outer - 1) * 130 : inner < 1 ? (1 - inner) * 60 : 0;
                distance = Math.min(distance, ringDistance);
                if (distance <= 0) return 0;
                // 획 경계에서는 거의 움직이지 않고, 거리에 따라 기존 진폭까지 부드럽게 커집니다.
                const proximity = clamp(distance / SETTINGS.iconIdleStrokeFalloff);
                return proximity * proximity * (3 - 2 * proximity);
            });
        }
        const make = set => {
            const sprites = set?.s || [];
            const motionStrength = glyphMotionStrengths(set);
            const sizes = sprites.map(s => Math.max(s[2], s[3]));
            const minSize = sizes.reduce((min, size) => Math.min(min, size), Infinity);
            const maxSize = sizes.reduce((max, size) => Math.max(max, size), 0);
            // 실제 크기만 쓰면 대부분인 3~16px 아이콘이 같은 시점에 몰립니다.
            // 큰 순서의 순위를 섞어 연속적으로 배분하고, 같은 크기도 원본 순서대로 조금씩 시차를 둡니다.
            const ranked = sizes.map((_, index) => index).sort((a, b) => sizes[b] - sizes[a] || a - b);
            const ranks = new Uint32Array(sprites.length);
            ranked.forEach((index, rank) => { ranks[index] = rank; });
            const lastRank = Math.max(1, sprites.length - 1);
            return sprites.map(([gx, gy, gw, gh, ax, ay, kind], index) => {
                const size = sizes[index];
                const depth = (size - minSize) / (maxSize - minSize || 1);
                const gatherOrder = lerp(1 - depth, ranks[index] / lastRank, SETTINGS.iconGatherRankBlend);
                const gatherStart = gatherOrder * SETTINGS.iconGatherLastStart;
                const gatherEnd = lerp(SETTINGS.iconGatherFirstEnd, 1, gatherOrder);
                const gatherDuration = gatherEnd - gatherStart;
                return {
                    gx, gy, gw, gh, ax, ay, depth,
                    gatherStart, gatherDuration,
                    gatherPushEnd: gatherStart + gatherDuration * SETTINGS.iconGatherTurnOverlap,
                    gatherOutward: idleStrength(size), // 8px 이하는 최대, 24px 이상은 바깥 밀림 없음
                    whole: kind === 1,
                    blurLevel: blurLevel(size),
                    pushStrength: pushStrength(size),
                    idleDrift: motionStrength[index] ? motionStrength[index] * idleStrength(size) * SETTINGS.iconIdleDistance * rand(.6, 1) : 0,
                    ...scatterPosition(), // 캔버스는 화면 크기로 유지하고 시작 좌표만 바깥까지 확장
                    delay: Math.random() * .4, // 역방향으로 흩어질 때의 시차
                    phase: Math.random() * Math.PI * 2,
                    px: 0, py: 0, pvx: 0, pvy: 0, spin: 0, angle: 0, awake: false,   // 마우스에 밀린 정도
                    speed: rand(.2, .55),
                    drift: rand(8, 26)
                };
            }).sort((a, b) => a.depth - b.depth); // 작은 아이콘부터 그려 큰 전경 아이콘이 앞에 놓이게 합니다.
        };
        iconSets = { light: make(SETS.light), dark: make(SETS.dark) };
        for (const [theme, icons] of Object.entries(iconSets)) {
            const pool = icons.filter(ic => Math.max(ic.gw, ic.gh) >= 8 && Math.max(ic.gw, ic.gh) <= 24);
            const set = SETS[theme];
            // 실제 글자 획의 아이콘을 출발점으로 삼고, 목적지와 비슷한 높이에서 퍼지게 합니다.
            const sources = Object.fromEntries([-1, 1].map(side => {
                const strokes = pool.filter(ic => !ic.idleDrift && (ic.gx + ic.gw / 2 < set.w / 2 ? -1 : 1) === side);
                return [side, (strokes.length ? strokes : pool).slice().sort((a, b) => a.gy - b.gy)];
            }));
            sideIconSets[theme] = pool.length ? Array.from({ length: SETTINGS.iconSideMaxCount }, (_, i) => {
                const side = i % 2 ? 1 : -1, v = Math.random();
                const origins = sources[side];
                const sourceIndex = Math.min(origins.length - 1, Math.floor(clamp(v + rand(-.1, .1)) * origins.length));
                return {
                    sprite: pool[Math.floor(Math.random() * pool.length)],
                    source: origins[sourceIndex], side,
                    u: Math.random(), v, edgeJitter: rand(-1, 1),
                    size: rand(5, 18), alpha: rand(.4, .85),
                    launch: rand(0, SETTINGS.iconSideSpreadStagger),
                    duration: rand(SETTINGS.iconSideTravelMin, SETTINGS.iconSideTravelMax),
                    bend: rand(-1, 1),
                    floatPhase: rand(0, Math.PI * 2), floatSpeed: rand(.35, .65), floatStrength: rand(.6, 1)
                };
            }) : [];
        }
        measureIcons();
    }

    function measureSideIcons() {
        const innerLeft = bigFrame.x + bigFrame.w * .24;
        const innerRight = bigFrame.x + bigFrame.w * .76;
        const margin = 16, fieldHeight = Math.min(bigFrame.h * 1.04, Math.max(1, H - 24));
        const fieldTop = (H - fieldHeight) / 2;
        const spans = { '-1': Math.max(0, innerLeft - margin), '1': Math.max(0, W - margin - innerRight) };
        const counts = Object.fromEntries(Object.entries(spans).map(([side, span]) => [side,
            // 글자 쪽으로 확장한 영역을 빼고 실제 화면 여백을 확인해 좁은 모바일은 비워 둡니다.
            span - bigFrame.w * .12 < SETTINGS.iconSideMinWidth ? 0 : Math.min(SETTINGS.iconSideMaxCount / 2,
                Math.floor(span * fieldHeight / SETTINGS.iconSideAreaPerIcon))]));
        for (const [theme, pool] of Object.entries(sideIconSets)) {
            const used = { '-1': 0, '1': 0 };
            sideFields[theme] = [];
            for (const item of pool) {
                if (used[item.side]++ >= counts[item.side]) continue;
                const vertical = item.v * 2 - 1;
                // 위아래는 좁고 중앙은 넓은 구름 모양으로 원본 외곽과 자연스럽게 연결합니다.
                const envelope = .45 + .55 * Math.sqrt(Math.max(0, 1 - vertical * vertical));
                // 글자 가까이는 촘촘하고 멀어질수록 성기게, 시작 경계도 조금씩 흩어 줍니다.
                const travel = Math.pow(item.u, 1.7);
                const inner = (item.side < 0 ? innerLeft : innerRight) + item.edgeJitter * bigFrame.w * .04;
                item.x = inner + item.side * spans[item.side] * envelope * travel;
                item.y = fieldTop + item.v * fieldHeight;
                item.originX = item.source.tx + item.source.sw / 2;
                item.originY = item.source.ty + item.source.sh / 2;
                item.arc = item.bend * Math.min(36, bigFrame.h * .045);
                item.floatRadius = item.floatStrength * SETTINGS.iconSideIdleDistance * bigFrame.h / SPRITES.h;
                const size = clamp(item.size * bigFrame.h / SPRITES.h * lerp(1, .55, travel), 1.25, 10);
                const ratio = size / Math.max(item.sprite.gw, item.sprite.gh);
                item.w = item.sprite.gw * ratio;
                item.h = item.sprite.gh * ratio;
                // 가장자리 일부만 지우지 않고, 분포 전체의 크기·농도를 연속적으로 낮춥니다.
                const verticalFade = 1 - Math.pow(Math.abs(vertical), 3);
                const outerFade = (1 - travel) * (1 - travel) * (1 + 2 * travel);
                item.opacity = item.alpha * verticalFade * outerFade;
                if (item.opacity > .01) sideFields[theme].push(item);
            }
        }
        sideCacheKey = "";
        // 이미지가 준비된 로드·리사이즈 시점에도 현재 진행도와 부유 위치를 유지합니다.
        paintSideCache();
    }

    function disableSideBatch() {
        sideBatch?.dispose();
        sideBatchCanvas?.remove();
        sideBatch = sideBatchCanvas = null;
        sideBatchUnavailable = true;
        sideBatchSize = sideCacheKey = "";
    }

    function getSideBatch() {
        if (sideBatchUnavailable) return null;
        if (!sideBatch) {
            const c = document.createElement("canvas");
            sideBatch = window.createHeroSpriteBatch?.(c) || null;
            if (!sideBatch) { sideBatchUnavailable = true; return null; }
            c.className = "hero-side-icons";
            c.setAttribute("aria-hidden", "true");
            c.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;opacity:0;";
            canvas.before(c);
            sideBatchCanvas = c;
            c.addEventListener("webglcontextlost", disableSideBatch, { once: true });
            // GPU를 쓰는 동안 2D 대체 버퍼는 보관하지 않습니다.
            for (const layer of sideLayers) {
                layer.canvas.style.opacity = "0";
                layer.canvas.width = layer.canvas.height = 1;
                layer.progress = -1;
            }
        }
        const size = `${W}:${H}:${DPR}`;
        if (sideBatchSize !== size) {
            const ratio = Math.min(DPR, 1.5, Math.sqrt(SETTINGS.iconBlurPixelBudget / (W * H)));
            sideBatch.resize(W, H, ratio);
            sideGpuFrame.progress = -1;
            sideBatchSize = size;
        }
        return sideBatch;
    }

    function paintSideCache() {
        const atlas = atlasNow();
        if (!ready(atlas)) return;
        // 로드·리사이즈 때 GPU를 준비하고, 실패한 환경에서만 2D 캐시를 만듭니다.
        if (sideFields[themeOf()]?.length && getSideBatch()) return;
        const key = `${themeOf()}:${W}:${H}:${DPR}`;
        if (sideCacheKey === key) return;
        const icons = sideFields[themeOf()] || [];
        for (const layer of sideLayers) {
            const items = icons.filter(item => item.side === layer.side);
            const c = layer.canvas, context = layer.ctx;
            layer.items = items;
            layer.populated = items.length > 0;
            if (!layer.populated) {
                c.style.opacity = "0";
                c.width = c.height = 1;
                continue;
            }
            let left = W, top = H, right = 0, bottom = 0;
            for (const item of items) {
                left = Math.min(left, Math.min(item.x, item.originX) - item.floatRadius - item.w / 2);
                top = Math.min(top, Math.min(item.y, item.originY) - Math.abs(item.arc) - item.floatRadius - item.h / 2);
                right = Math.max(right, Math.max(item.x, item.originX) + item.floatRadius + item.w / 2);
                bottom = Math.max(bottom, Math.max(item.y, item.originY) + Math.abs(item.arc) + item.floatRadius + item.h / 2);
            }
            left = Math.floor(left) - 1; top = Math.floor(top) - 1;
            const width = Math.ceil(right) - left + 1, height = Math.ceil(bottom) - top + 1;
            // 옅고 작은 장식에는 1.5배면 충분하며, 실제 분포 영역만 버퍼로 잡습니다.
            sizeCanvas(c, context, width, height, Math.min(DPR, 1.5));
            context.imageSmoothingQuality = "high";
            Object.assign(layer, { left, top, width, height });
            paintSideFrame(layer, atlas, clamp(V.sideSpread));
            c.style.left = `${left}px`; c.style.top = `${top}px`;
            c.style.width = `${width}px`; c.style.height = `${height}px`;
        }
        sideCacheKey = key;
    }

    function paintSideFrame(layer, atlas, progress, batch = null) {
        const context = layer.ctx, reduced = reducedMotion.matches;
        const elapsed = progress * (SETTINGS.iconSideSpreadStagger + SETTINGS.iconSideTravelMax);
        if (batch) batch.clear();
        else context.clearRect(0, 0, layer.width, layer.height);
        for (const item of layer.items) {
            const p = clamp((elapsed - item.launch) / item.duration);
            if (p <= 0) continue;
            // 출발·도착 시점을 각자 다르게 두고, 천천히 가속한 뒤 길게 감속합니다.
            const travel = reduced ? 1 : easeGather(p);
            const scale = reduced ? 1 : lerp(.35, 1, travel);
            // 방출 경로에 부유를 처음부터 섞어 도착 후 별도의 이동으로 전환되지 않게 합니다.
            const phase = sideFloatTime * item.floatSpeed + item.floatPhase;
            const floatRadius = reduced ? 0 : item.floatRadius * travel;
            const x = lerp(item.originX, item.x, travel) + Math.sin(phase) * floatRadius;
            const y = lerp(item.originY, item.y, travel) + item.arc * 4 * travel * (1 - travel) +
                Math.cos(phase * .81 + item.floatPhase) * floatRadius;
            const w = item.w * scale, h = item.h * scale;
            const ic = item.sprite;
            // 투명도 변화는 출발점의 짧은 구간에만 사용하고, 등장은 이동으로 보여 줍니다.
            const alpha = item.opacity * easeOut(clamp(p / (reduced ? 1 : .14)));
            if (batch) batch.add(ic, x - w / 2, y - h / 2, w, h, 0, alpha);
            else {
                context.globalAlpha = alpha;
                context.drawImage(atlas, ic.ax, ic.ay, ic.gw, ic.gh,
                    x - w / 2 - layer.left, y - h / 2 - layer.top, w, h);
            }
        }
        if (batch) { if (!batch.flush(atlas)) return false; }
        else context.globalAlpha = 1;
        layer.progress = progress;
        layer.reduced = reduced;
        layer.floatTime = sideFloatTime;
        return true;
    }

    function renderSideIcons(time) {
        const progress = clamp(V.sideSpread);
        const opacity = V.sideOpacity * (1 - easeOut(clamp(V.move))) * (1 - V.dissolve) * (1 - V.reveal);
        const visible = progress > 0 && opacity > .001 && ready(atlasNow()) && sideFields[themeOf()]?.length;
        const floating = visible && step !== 0 && !reducedMotion.matches;
        // 숨겨진 탭·포스터 단계에서 시간이 지나도 복귀 시 위치가 갑자기 바뀌지 않습니다.
        if (floating && sideLastTime !== null) sideFloatTime += clamp((time - sideLastTime) / 1000, 0, .05);
        sideLastTime = floating ? time : null;
        if (sideBatchCanvas && !visible) sideBatchCanvas.style.opacity = "0";
        if (visible) {
            const batch = getSideBatch();
            if (batch) {
                if (sideGpuFrame.items !== sideFields[themeOf()]) {
                    sideGpuFrame.items = sideFields[themeOf()];
                    sideGpuFrame.progress = -1;
                }
                const repaint = sideGpuFrame.progress !== progress || sideGpuFrame.reduced !== reducedMotion.matches ||
                    (floating && sideGpuFrame.floatTime !== sideFloatTime);
                if (!repaint || paintSideFrame(sideGpuFrame, atlasNow(), progress, batch)) {
                    const value = opacity.toFixed(4);
                    if (sideBatchCanvas.style.opacity !== value) sideBatchCanvas.style.opacity = value;
                    return;
                }
                // GPU 업로드 실패 시 같은 프레임에 2D로 대체해 아이콘을 유지합니다.
                disableSideBatch();
            }
        }
        if (visible) paintSideCache();
        for (const layer of sideLayers) {
            const value = visible && layer.populated ? opacity.toFixed(4) : "0";
            if (layer.canvas.style.opacity !== value) layer.canvas.style.opacity = value;
            if (value === "0") continue;
            if (layer.progress !== progress || layer.reduced !== reducedMotion.matches ||
                (floating && layer.floatTime !== sideFloatTime)) paintSideFrame(layer, atlasNow(), progress);
        }
    }

    function sizeCanvas(c, context, w, h, pixelRatio = DPR) {
        const width = Math.max(1, Math.round(w * pixelRatio));
        const height = Math.max(1, Math.round(h * pixelRatio));
        if (c.width !== width || c.height !== height) {
            c.width = width;
            c.height = height;
        }
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function measureIcons() {
        const k = bigFrame.h / SPRITES.h;
        for (const icons of Object.values(iconSets)) {
            const grid = new Map(), awake = new Set(), scattered = [];
            for (const ic of icons) {
                ic.sw = ic.gw * k;
                ic.sh = ic.gh * k;
                const foreground = 1 + ic.depth * SETTINGS.iconForegroundScale;
                ic.scatterW = ic.sw * foreground;
                ic.scatterH = ic.sh * foreground;
                ic.left = ic.sx * W - ic.scatterW / 2;
                ic.top = ic.sy * H - ic.scatterH / 2;
                const outward = ic.gatherOutward * SETTINGS.iconGatherOutwardScale;
                ic.outwardX = (ic.sx - .5) * W * outward;
                ic.outwardY = (ic.sy - .5) * H * outward;
                ic.tx = bigFrame.x + ic.gx * k;
                ic.ty = bigFrame.y + ic.gy * k;
                // 경로의 휨은 크기 측정 때 한 번만 계산해 매 프레임 거리 연산을 피합니다.
                const dx = ic.tx - ic.left, dy = ic.ty - ic.top;
                const distance = Math.hypot(dx, dy);
                const bend = Math.min(distance * SETTINGS.iconGatherCurve, Math.min(W, H) * .04);
                const direction = ic.phase < Math.PI ? 1 : -1;
                ic.curveX = distance ? -dy / distance * bend * direction : 0;
                ic.curveY = distance ? dx / distance * bend * direction : 0;
                // 회전·부유를 포함한 최대 영역이 화면 밖이면 삼각함수 계산 전 제외합니다.
                ic.reach = ic.drift * SETTINGS.iconScatterDistance + Math.max(ic.scatterW, ic.scatterH);
                if (ic.awake) awake.add(ic);
                const outside = ic.left + ic.scatterW + ic.reach < 0 || ic.top + ic.scatterH + ic.reach < 0 ||
                    ic.left - ic.reach > W || ic.top - ic.reach > H;
                // 화면 밖에서 대기하는 아이콘은 첫 화면의 렌더 루프와 마우스 격자에서 모두 제외합니다.
                // 이미 마우스에 밀린 아이콘은 리사이즈 후에도 돌아오는 움직임을 유지합니다.
                if (outside && !ic.awake) continue;
                scattered.push(ic);
                const cell = `${Math.floor(ic.sx * W / pointerCellSize)}:${Math.floor(ic.sy * H / pointerCellSize)}`;
                if (!grid.has(cell)) grid.set(cell, []);
                grid.get(cell).push(ic);
            }
            iconPhysics.set(icons, { grid, awake, scattered });
        }
        measureSideIcons();
        settledCache.key = "";
    }

    function nearbyIcons(x1, y1, x2, y2, radius) {
        const physics = iconPhysics.get(iconsNow());
        // 이미 밀려난 아이콘은 격자 밖으로 나가도 원래 자리로 돌아올 때까지 갱신합니다.
        const candidates = new Set(physics.awake);
        const left = Math.floor((Math.min(x1, x2) - radius) / pointerCellSize);
        const right = Math.floor((Math.max(x1, x2) + radius) / pointerCellSize);
        const top = Math.floor((Math.min(y1, y2) - radius) / pointerCellSize);
        const bottom = Math.floor((Math.max(y1, y2) + radius) / pointerCellSize);
        for (let y = top; y <= bottom; y++) for (let x = left; x <= right; x++) {
            const cell = physics.grid.get(`${x}:${y}`);
            if (cell) for (const ic of cell) candidates.add(ic);
        }
        return candidates;
    }

    function paintSettledCache(atlas, icons) {
        const key = `${themeOf()}:${W}:${H}:${DPR}`;
        if (settledCache.key !== key) {
            const c = settledCache.ctx;
            sizeCanvas(settledCache.canvas, c, W, H);
            c.clearRect(0, 0, W, H);
            c.imageSmoothingQuality = "high";
            settledCache.floating = [];
            for (const ic of icons) {
                if (ic.idleDrift) settledCache.floating.push(ic);
                else c.drawImage(atlas, ic.ax, ic.ay, ic.gw, ic.gh, ic.tx, ic.ty, ic.sw, ic.sh);
            }
            settledCache.key = key;
        }
        ctx.drawImage(settledCache.canvas, 0, 0, W, H);
    }

    let posterW = 1, posterH = 1;
    const blurPixelRatio = () => Math.min(DPR, 1, Math.sqrt(SETTINGS.iconBlurPixelBudget / (W * H)));
    function measure() {
        const rect = stage.getBoundingClientRect();
        stageLeft = rect.left;
        stageTop = rect.top + window.scrollY;
        headerHeight = header?.offsetHeight || 70;
        W = Math.max(1, rect.width);
        H = Math.max(1, rect.height);
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        sizeCanvas(canvas, ctx, W, H);
        assembledBatch?.resize(W, H, DPR);
        const blurRatio = blurPixelRatio();
        for (const layer of blurLayers) {
            // 이미 흐린 작은 아이콘에 고해상도 화면 전체 버퍼를 중복해서 쓰지 않습니다.
            if (layer.batch) layer.batch.resize(W, H, blurRatio);
            else {
                sizeCanvas(layer.canvas, layer.ctx, W, H, blurRatio);
                layer.ctx.imageSmoothingQuality = "high";
            }
            layer.dirty = true;
        }
        bgWipe.resize(W, H, DPR);
        ctx.imageSmoothingQuality = "high";

        const ratio = SPRITES.w / SPRITES.h;
        let fh = H * SETTINGS.bigFrameHeight;
        let fw = fh * ratio;
        if (fw > W * 0.95) { fw = W * 0.95; fh = fw / ratio; }
        bigFrame = { x: (W - fw) / 2, y: (H - fh) / 2, w: fw, h: fh };
        measureIcons();

        const p = posterButton.getBoundingClientRect();
        smallFrame = { x: p.left - rect.left, y: p.top - rect.top, w: p.width, h: p.height };
        posterW = Math.max(1, p.width);
        posterH = Math.max(1, p.height);
        posterWipe.resize(posterW, posterH, DPR);
        // 포스터 전환 입자는 첫 화면에서 사용하지 않습니다. 실제 전환 때 준비합니다.
        if (fxCanvas && fx) {
            sizeCanvas(fxCanvas, fx, W, H);
            if (fxDirty) fx.clearRect(0, 0, W, H);
            fxDirty = false;
        }
        fxCells = null;
        lastPosterState = lastIconState = "";
    }

    /* =====================================================
       2. 입자 닦임 전환 (grain wipe)
       Codrops "Distortion and Grain Effects on Scroll" 의 방식을 응용:
       - 화면 픽셀 단위의 고운 노이즈로 경계가 왼쪽→오른쪽으로 번져가고
       - 경계 근처는 simplex noise 로 이미지 좌표를 살짝 흔들어(왜곡) 입자처럼 보이게 함
       WebGL 사용, 지원되지 않거나 로컬 파일(file://)로 열어 이미지가 막히면 2D 캔버스로 대체
    ===================================================== */
    const WIPE_FRAG = `
        precision highp float;
        uniform sampler2D uA, uB;
        uniform float uT, uTime, uGrain, uBand, uMode;
        varying vec2 vUv;
        vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
            m = m * m; m = m * m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }
        float rnd(vec2 c) { return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
            vec2 uv = vUv;
            float mask;
            if (uMode > 1.5) {
                // 부드러운 경계가 왼쪽 → 오른쪽으로 이동 (배경용, 입자 없음)
                float d = (uT * (1.0 + uBand * 2.0) - uBand) - uv.x;
                mask = smoothstep(-uBand, uBand, d);
            } else if (uMode > 0.5) {
                mask = uT;                                   // 한 번에 교체 (크로스페이드)
            } else {
                // 일자 경계가 왼쪽 → 오른쪽으로 이동, 경계선에만 아주 고운 입자
                float d = (uT * (1.0 + uBand * 2.0) - uBand) - uv.x;
                float g = rnd(floor(gl_FragCoord.xy / uGrain) + floor(uTime * 30.0));
                mask = d >= uBand ? 1.0 : (d <= -uBand ? 0.0 : step(g, (d + uBand) / (2.0 * uBand)));
            }
            gl_FragColor = mix(texture2D(uA, uv), texture2D(uB, uv), mask);
        }`;
    const WIPE_VERT = `
        attribute vec2 p;
        varying vec2 vUv;
        void main() { vUv = p * 0.5 + 0.5; vUv.y = 1.0 - vUv.y; gl_Position = vec4(p, 0.0, 1.0); }`;

    // src: { color: [r,g,b,a] } 또는 { image, color }
    function createWipe(el, options) {
        const opts = Object.assign({ grain: 1, band: .02 }, options);
        let gl = null, prog = null, uni = {}, texCache = new Map(), failed = false;
        let cw = 1, ch = 1, dpr = 1;

        try {
            gl = el.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
        } catch (e) { gl = null; }
        if (gl) {
            const sh = (type, src) => {
                const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
                if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
                return s;
            };
            try {
                prog = gl.createProgram();
                gl.attachShader(prog, sh(gl.VERTEX_SHADER, WIPE_VERT));
                gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, WIPE_FRAG));
                gl.linkProgram(prog);
                gl.useProgram(prog);
                const buf = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buf);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
                const loc = gl.getAttribLocation(prog, "p");
                gl.enableVertexAttribArray(loc);
                gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
                ["uA", "uB", "uT", "uTime", "uGrain", "uBand", "uMode"].forEach(k => { uni[k] = gl.getUniformLocation(prog, k); });
                gl.uniform1i(uni.uA, 0);
                gl.uniform1i(uni.uB, 1);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            } catch (e) { console.warn("[hero] WebGL wipe 비활성:", e); gl = null; }
        }

        // ---- 2D 대체 (고운 입자) ----
        let ctx2d = null, mask = null, scratch = null, sctx = null;
        function use2D() {
            failed = true;
            if (gl) {
                // WebGL 컨텍스트를 쓴 캔버스는 2D로 바꿀 수 없어 새 캔버스로 교체
                const fresh = el.cloneNode(false);
                el.replaceWith(fresh);
                el = fresh;
                gl = null;
            }
            ctx2d = el.getContext("2d");
            scratch = document.createElement("canvas");
            sctx = scratch.getContext("2d");
            resize(cw, ch, dpr);
        }
        function build2DMask() {
            const cell = 2;
            const cols = Math.max(1, Math.ceil(cw / cell)), rows = Math.max(1, Math.ceil(ch / cell));
            const c = document.createElement("canvas"); c.width = cols; c.height = rows;
            const thr = new Float32Array(cols * rows);
            for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
                thr[y * cols + x] = x / cols;   // 일자 경계
            }
            mask = { c, cx: c.getContext("2d"), thr, data: c.getContext("2d").createImageData(cols, rows) };
        }
        function paint2D(t) {
            const band = opts.band;
            const p = t * (1 + band * 2) - band;
            const d = mask.data.data;
            for (let i = 0; i < mask.thr.length; i++) {
                const e = p - mask.thr[i];
                const on = e >= band ? true : e <= -band ? false : Math.random() < (e + band) / (2 * band);
                d[i * 4 + 3] = on ? 255 : 0;
            }
            mask.cx.putImageData(mask.data, 0, 0);
        }
        const fill2D = (c, src) => {
            const [r, g, b, a] = src.color || [0, 0, 0, 0];
            c.clearRect(0, 0, cw, ch);
            if (a > 0) { c.fillStyle = `rgba(${r},${g},${b},${a / 255})`; c.fillRect(0, 0, cw, ch); }
            if (src.image && ready(src.image)) c.drawImage(src.image, 0, 0, cw, ch);
        };

        // ---- WebGL 텍스처 ----
        function texFor(src) {
            const useImg = src.image && ready(src.image);
            const key = useImg ? src.image.src : "c:" + (src.color || [0, 0, 0, 0]).join(",");
            if (texCache.has(key)) return texCache.get(key);
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            if (useImg) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src.image); // file:// 이면 여기서 SecurityError
            } else {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(src.color || [0, 0, 0, 0]));
            }
            texCache.set(key, tex);
            return tex;
        }

        function resize(w, h, ratio) {
            cw = Math.max(1, w); ch = Math.max(1, h); dpr = ratio;
            el.width = Math.round(cw * dpr);
            el.height = Math.round(ch * dpr);
            if (gl) gl.viewport(0, 0, el.width, el.height);
            if (ctx2d) {
                ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
                scratch.width = el.width; scratch.height = el.height;
                sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                build2DMask();
            }
        }

        // from → to 를 진행도 t(0~1)로 그림
        function draw(from, to, t, time, mode = "wipe") {
            t = Math.min(1, Math.max(0, t));
            if (gl) {
                try {
                    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texFor(t >= 1 ? to : from));
                    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texFor(to));
                } catch (e) { use2D(); return draw(from, to, t, time, mode); }
                gl.uniform1f(uni.uT, t >= 1 ? 1 : t);
                gl.uniform1f(uni.uTime, time / 1000);
                gl.uniform1f(uni.uGrain, opts.grain * dpr);
                gl.uniform1f(uni.uBand, opts.band);
                gl.uniform1f(uni.uMode, mode === "soft" ? 2 : mode === "fade" ? 1 : 0);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                return;
            }
            if (!ctx2d) use2D();
            if (t >= 1) { fill2D(ctx2d, to); return; }
            fill2D(ctx2d, from);
            if (t <= 0) return;
            if (mode === "fade") {
                ctx2d.globalAlpha = t; fill2D(sctx, to); ctx2d.drawImage(scratch, 0, 0, cw, ch); ctx2d.globalAlpha = 1;
                return;
            }
            if (mode === "soft") {
                const b = opts.band, p = t * (1 + b * 2) - b;
                fill2D(sctx, to);
                const gr = sctx.createLinearGradient((p - b) * cw, 0, (p + b) * cw, 0);
                gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(1, "rgba(0,0,0,0)");
                sctx.globalCompositeOperation = "destination-in";
                sctx.fillStyle = gr; sctx.fillRect(0, 0, cw, ch);
                sctx.globalCompositeOperation = "source-over";
                ctx2d.drawImage(scratch, 0, 0, cw, ch);
                return;
            }
            fill2D(sctx, to);
            paint2D(t);
            sctx.globalCompositeOperation = "destination-in";
            sctx.imageSmoothingEnabled = false;
            sctx.drawImage(mask.c, 0, 0, cw, ch);
            sctx.globalCompositeOperation = "source-over";
            ctx2d.drawImage(scratch, 0, 0, cw, ch);
        }

        return { draw, resize, get canvas() { return el; } };
    }

    const bgWipe = createWipe(bgCanvas, { band: .22 });   // 배경: 입자 없이 부드럽게
    // 포스터는 2D 캔버스 하나에 새 포스터 + 남은 기존 포스터를 함께 그림
    const pCtx = posterCanvas.getContext("2d");
    const pScratch = document.createElement("canvas");
    const psCtx = pScratch.getContext("2d");
    const posterWipe = {
        resize(w, h, dpr) {
            [posterCanvas, pScratch].forEach(c => { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); });
            pCtx.setTransform(1, 0, 0, 1, 0, 0); psCtx.setTransform(1, 0, 0, 1, 0, 0);
        }
    };
    function paintPoster(c, index) {
        const w = posterCanvas.width, h = posterCanvas.height;
        c.fillStyle = posters[index].background || (posters[index].theme === "dark" ? "#000" : "#fff");
        c.fillRect(0, 0, w, h);
        const img = posterImages[index];
        if (ready(img)) c.drawImage(img, 0, 0, w, h);
    }

    /* =====================================================
       3. 포스터 / 배경 그리기
    ===================================================== */
    let current = 0;
    let themeFrom = 0, themeT = 1, bgT = 1;     // 전환 진행도 (1 = 완료)
    const hexToRgba = (hex, a = 255) => {
        const h = (hex || "#000").replace("#", "");
        const v = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
        return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16), a];
    };
    const TRANSPARENT = { color: [0, 0, 0, 0] };
    const posterSrc = index => ({
        color: hexToRgba(posters[index].background || (posters[index].theme === "dark" ? "#000" : "#fff")),
        image: posterImages[index]
    });
    const bgSrc = index => ({ color: posters[index].theme === "dark" ? [0, 0, 0, 255] : [255, 255, 255, 255] });

    let switchMode = "wipe";   // 자동 전환 = 일자 닦임 / 클릭 = 빠른 페이드
    let lastBackground = "";
    function renderBg(time) {
        // 정지한 단색 배경을 매 프레임 전체 화면 WebGL로 다시 칠하지 않습니다.
        const background = posters[current].theme === "dark" ? "#000" : "#fff";
        const state = bgT >= 1 ? background : "transition";
        if (state !== lastBackground) {
            stage.style.backgroundColor = background;
            bgWipe.canvas.style.visibility = bgT >= 1 ? "hidden" : "";
            lastBackground = state;
        }
        if (bgT >= 1) return;
        bgWipe.draw(bgSrc(themeFrom), bgSrc(current), bgT, time, switchMode === "fade" ? "fade" : "soft");
    }
    // 배경 아이콘(main.js)이 배경 전환과 같은 위치·속도로 색을 바꾸도록 상태를 공유
    window.MainHeroBg = () => ({
        fromDark: posters[themeFrom].theme === "dark",
        toDark: posters[current].theme === "dark",
        t: bgT,
        band: .22,
        fade: switchMode === "fade",
        ambient: V.ambient
    });

    /* =====================================================
       포스터 전환 입자
       - 새 포스터는 아래에 바로 깔리고, 기존 포스터를 작은 칸(입자)으로 나눠
         왼쪽부터 차례로 떨어져 나가 오른쪽으로 흩날리며 사라짐
    ===================================================== */
    const fxCanvas = document.getElementById("heroFx");
    const fx = fxCanvas?.getContext("2d");
    const FX = { cell: 1, release: .62, flight: .38, spreadX: .95, spreadY: 90 };  // 입자 크기(px) — 작을수록 고움
    let fxCells = null, fxCols = 1, fxRows = 1, fxDirty = false;
    let fxMask = null, fxMaskCtx = null, fxMaskData = null;
    let fxBuf = null, fxBufCtx = null, fxBufData = null, fxBufW = 1, fxBufH = 1;
    const fxColors = new Map();   // 포스터별 칸 색상 캐시
    function buildFx() {
        if (!fxCanvas) return;
        fxCanvas.width = Math.round(W * DPR);
        fxCanvas.height = Math.round(H * DPR);
        fx.setTransform(DPR, 0, 0, DPR, 0, 0);
        fxCols = Math.ceil(posterW / FX.cell); fxRows = Math.ceil(posterH / FX.cell);
        const n = fxCols * fxRows;
        fxCells = { t0: new Float32Array(n), vx: new Float32Array(n), vy: new Float32Array(n), lift: new Float32Array(n) };
        for (let y = 0, i = 0; y < fxRows; y++) for (let x = 0; x < fxCols; x++, i++) {
            const nx = x / fxCols;
            fxCells.t0[i] = nx * FX.release * .8 + Math.random() * FX.release * .2;
            fxCells.vx[i] = rand(.25, 1) * posterW * FX.spreadX * (.5 + nx * .5);
            fxCells.vy[i] = rand(-1, 1) * FX.spreadY;
            fxCells.lift[i] = rand(0, FX.spreadY * .8);
        }
        fxMask = document.createElement("canvas"); fxMask.width = fxCols; fxMask.height = fxRows;
        fxMaskCtx = fxMask.getContext("2d"); fxMaskData = fxMaskCtx.createImageData(fxCols, fxRows);
        // 날아가는 입자용 버퍼 (화면 해상도 그대로, 포스터 + 오른쪽 여유)
        fxBufW = Math.ceil((posterW * (1 + FX.spreadX) + 20) * DPR);
        fxBufH = Math.ceil((posterH + FX.spreadY * 2.4) * DPR);
        fxBuf = document.createElement("canvas"); fxBuf.width = fxBufW; fxBuf.height = fxBufH;
        fxBufCtx = fxBuf.getContext("2d"); fxBufData = fxBufCtx.createImageData(fxBufW, fxBufH);
        fxColors.clear();
    }
    function colorsFor(index) {
        const key = index + ":" + (ready(posterImages[index]) ? 1 : 0);
        if (fxColors.has(key)) return fxColors.get(key);
        const c = document.createElement("canvas"); c.width = fxCols; c.height = fxRows;
        const x = c.getContext("2d");
        const [r, g, b] = hexToRgba(posters[index].background || "#000");
        x.fillStyle = `rgb(${r},${g},${b})`; x.fillRect(0, 0, fxCols, fxRows);
        if (ready(posterImages[index])) x.drawImage(posterImages[index], 0, 0, fxCols, fxRows);
        let data;
        try { data = x.getImageData(0, 0, fxCols, fxRows).data; }
        catch (e) { data = new Uint8ClampedArray(fxCols * fxRows * 4).map((_, i) => [r, g, b, 255][i % 4]); }  // file:// 대비
        fxColors.set(key, data);
        return data;
    }
    function renderFx(from, t) {
        if (!fx) return;
        if (t >= 1) {
            if (fxDirty) { fx.clearRect(0, 0, W, H); fxDirty = false; }
            return;
        }
        if (!fxCells) buildFx();
        fxDirty = true;
        fx.clearRect(0, 0, W, H);
        const ox = smallFrame.x, oy = smallFrame.y;
        const src = posterSrc(from);
        const img = src.image && ready(src.image) ? src.image : null;
        const col = colorsFor(from);
        const { t0, vx, vy, lift } = fxCells;
        const n = fxCols * fxRows;

        // 1) 아직 붙어 있는 부분은 포스터 캔버스에서 같은 픽셀 격자로 그림 (renderPoster) → 가장자리 선이 남지 않음
        const md = fxMaskData.data;
        for (let i = 0; i < n; i++) md[i * 4 + 3] = t <= t0[i] ? 255 : 0;
        fxMaskCtx.putImageData(fxMaskData, 0, 0);

        // 2) 떨어져 나간 입자: 화면 픽셀 단위로 고운 점을 찍어 오른쪽으로 흩날림
        const bd = fxBufData.data; bd.fill(0);
        const bx0 = ox, by0 = oy - FX.spreadY * 1.2;
        const cs = FX.cell * DPR;
        for (let y = 0, i = 0; y < fxRows; y++) for (let x = 0; x < fxCols; x++, i++) {
            if (t <= t0[i]) continue;
            const lt = (t - t0[i]) / FX.flight;
            if (lt >= 1) continue;
            const e = lt * lt;
            const px = (x * FX.cell + e * vx[i]) * DPR;
            const py = (y * FX.cell + lt * vy[i] * .5 - e * lift[i] + FX.spreadY * 1.2) * DPR;
            const a = (1 - lt) * (1 - lt) * 255;
            const sz = 1;   // 화면 픽셀 1개 크기의 아주 고운 입자
            const X = px | 0, Y = py | 0;
            const ci = i * 4;
            for (let yy = 0; yy < sz; yy++) {
                const row = Y + yy; if (row < 0 || row >= fxBufH) continue;
                for (let xx = 0; xx < sz; xx++) {
                    const colx = X + xx; if (colx < 0 || colx >= fxBufW) continue;
                    const k = (row * fxBufW + colx) * 4;
                    if (bd[k + 3] >= a) continue;
                    bd[k] = col[ci]; bd[k + 1] = col[ci + 1]; bd[k + 2] = col[ci + 2]; bd[k + 3] = a;
                }
            }
        }
        fxBufCtx.putImageData(fxBufData, 0, 0);
        fx.drawImage(fxBuf, bx0, by0, fxBufW / DPR, fxBufH / DPR);
    }

    let lastPosterState = "";
    function renderPoster(time) {
        const state = `${current}:${themeFrom}:${V.reveal}:${themeT}:${ready(posterImages[current])}:${ready(posterImages[themeFrom])}`;
        if (state === lastPosterState) return;
        lastPosterState = state;
        const w = posterCanvas.width, h = posterCanvas.height;
        pCtx.globalAlpha = 1;
        pCtx.clearRect(0, 0, w, h);
        if (themeT >= 1) {
            if (V.reveal > 0) { pCtx.globalAlpha = V.reveal; paintPoster(pCtx, current); pCtx.globalAlpha = 1; }   // 아이콘 → 포스터
            renderFx(themeFrom, 1);
        } else if (switchMode === "fade") {
            paintPoster(pCtx, themeFrom);                                                  // 클릭: 빠른 페이드
            pCtx.globalAlpha = themeT; paintPoster(pCtx, current); pCtx.globalAlpha = 1;
            renderFx(themeFrom, 1);
        } else {
            paintPoster(pCtx, current);                                                    // 새 포스터를 아래에 깔고
            renderFx(themeFrom, themeT);                                                   // 입자 계산 + 마스크 갱신
            if (themeT < 1 && fxMask) {                                                    // 아직 안 부서진 기존 포스터
                psCtx.globalCompositeOperation = "source-over";
                psCtx.clearRect(0, 0, w, h);
                paintPoster(psCtx, themeFrom);
                psCtx.globalCompositeOperation = "destination-in";
                psCtx.imageSmoothingEnabled = false;
                psCtx.drawImage(fxMask, 0, 0, w, h);
                psCtx.globalCompositeOperation = "source-over";
                pCtx.drawImage(pScratch, 0, 0);
            }
        }
    }

    /* =====================================================
       4. 아이콘 / 그래픽 그리기
    ===================================================== */
    /* 흩어진 아이콘이 마우스에 밀리는 효과 — 카운트다운(dday-icon-matter.js)과 같은 힘 계산을 재사용
       - 마우스가 지나간 선분 기준으로 밀어냄, 빠르게 움직일수록 더 넓고 세게
       - 클릭하면 주변 아이콘이 퍼짐 / 시간이 지나면 원래 자리로 천천히 돌아감 */
    // 메인 포스터용으로 조정: 부드럽게 밀리고, 살짝 출렁이며 천천히 제자리로 돌아옴
    const PUSH = { radius: 110, clickRadius: 200, clickForce: 9, strength: .32, decay: .9, home: .006, max: 14 };
    let pointerNearHeader = false;
    function syncHeaderVisibility() {
        if (!header) return;
        const hidden = V.text <= 0 && !pointerNearHeader;
        if (header.classList.contains("is-intro-hidden") !== hidden) {
            header.classList.toggle("is-intro-hidden", hidden);
        }
    }
    const pointer = { x: -1000, y: -1000, oldX: -1000, oldY: -1000, vx: 0, vy: 0, active: false, down: false };
    const toStage = e => [e.clientX - stageLeft, e.clientY + window.scrollY - stageTop];
    document.addEventListener("pointermove", e => {
        if (e.pointerType !== "touch") {
            // 경계에서 헤더가 반복해서 나타났다 사라지지 않도록 여유를 둠
            pointerNearHeader = e.clientY <= headerHeight + (pointerNearHeader ? 16 : 0);
            syncHeaderVisibility();
        }
        const [x, y] = toStage(e);
        if (step !== 0 || x < 0 || y < 0 || x > W || y > H) { pointer.active = false; return; }
        if (pointer.active) {
            pointer.oldX = pointer.x; pointer.oldY = pointer.y;
            pointer.vx = clamp(x - pointer.x, -65, 65); pointer.vy = clamp(y - pointer.y, -65, 65);
        } else { pointer.oldX = x; pointer.oldY = y; pointer.vx = pointer.vy = 0; }
        pointer.x = x; pointer.y = y; pointer.active = true;
    }, { passive: true });
    document.addEventListener("pointerdown", e => {
        if (step !== 0) return;
        const [x, y] = toStage(e);
        pointer.down = true;
        const { awake } = iconPhysics.get(iconsNow());
        for (const ic of nearbyIcons(x, y, x, y, PUSH.clickRadius)) {
            const cx = ic.sx * W + ic.px, cy = ic.sy * H + ic.py;
            let dx = cx - x, dy = cy - y, d = Math.hypot(dx, dy);
            if (d >= PUSH.clickRadius) continue;
            if (d < .1) { dx = Math.cos(ic.phase); dy = Math.sin(ic.phase); d = 1; }
            const f = Math.pow(1 - d / PUSH.clickRadius, 1.3) * PUSH.clickForce * ic.pushStrength;
            ic.pvx += dx / d * f; ic.pvy += dy / d * f;
            ic.awake = true;
            awake.add(ic);
        }
    }, { passive: true });
    window.addEventListener("pointerup", () => { pointer.down = false; }, { passive: true });
    document.addEventListener("pointerleave", () => {
        pointer.active = false;
        pointerNearHeader = false;
        syncHeaderVisibility();
    }, { passive: true });

    function stepPush(dtFrames) {
        const canPush = pointer.active && step === 0;
        const { awake } = iconPhysics.get(iconsNow());
        if (!canPush && !awake.size) return;
        const speed = Math.hypot(pointer.vx, pointer.vy);
        const radius = Math.min(PUSH.radius, W * .2) + Math.min(speed, 30);
        const radiusSquared = radius * radius;
        const dec = Math.pow(PUSH.decay, dtFrames);
        const spinDec = Math.pow(.954, dtFrames);
        const sx = pointer.x - pointer.oldX, sy = pointer.y - pointer.oldY, seg = sx * sx + sy * sy;
        const candidates = canPush ? nearbyIcons(pointer.oldX, pointer.oldY, pointer.x, pointer.y, radius) : awake;
        for (const ic of candidates) {
            const cx = ic.sx * W + ic.px, cy = ic.sy * H + ic.py;
            if (canPush) {
                const t = seg ? clamp(((cx - pointer.oldX) * sx + (cy - pointer.oldY) * sy) / seg, 0, 1) : 1;
                let dx = cx - (pointer.oldX + sx * t), dy = cy - (pointer.oldY + sy * t);
                const distanceSquared = dx * dx + dy * dy;
                if (distanceSquared < radiusSquared) {
                    let d = Math.sqrt(distanceSquared);
                    if (d < .1) { dx = Math.cos(ic.phase); dy = Math.sin(ic.phase); d = 1; }
                    const strength = PUSH.strength * ic.pushStrength;
                    const fall = Math.pow(1 - d / radius, 1.5), f = fall * (1.8 + Math.min(speed, 40) * .36 + (pointer.down ? 3 : 0)) * strength;
                    ic.pvx += dx / d * f + pointer.vx * fall * .17 * strength;
                    ic.pvy += dy / d * f + pointer.vy * fall * .17 * strength;
                    ic.spin += (pointer.vx * dy - pointer.vy * dx) * fall * .00004 * ic.pushStrength;
                    ic.awake = true;
                    awake.add(ic);
                }
            }
            if (!ic.awake) continue;
            ic.pvx -= ic.px * PUSH.home; ic.pvy -= ic.py * PUSH.home;     // 원래 자리로
            ic.pvx = clamp(ic.pvx, -PUSH.max, PUSH.max); ic.pvy = clamp(ic.pvy, -PUSH.max, PUSH.max);
            ic.px += ic.pvx * dtFrames; ic.py += ic.pvy * dtFrames;
            ic.pvx *= dec; ic.pvy *= dec;
            ic.spin *= spinDec; ic.angle += ic.spin * dtFrames;
            if (Math.abs(ic.px) + Math.abs(ic.py) < .02 && Math.abs(ic.pvx) + Math.abs(ic.pvy) + Math.abs(ic.spin) < .002) {
                ic.px = ic.py = ic.pvx = ic.pvy = ic.spin = 0;
                ic.awake = false;
                awake.delete(ic);
            }
        }
        pointer.oldX = pointer.x; pointer.oldY = pointer.y;
        pointer.vx *= .65; pointer.vy *= .65;
    }
    let lastIconTime = 0;
    let scatterTime = 0; // 스크롤 전후에 이어지는 부유 시간 — 숨겨진 탭에서는 멈춤
    let lastIconState = "";
    let assembledTime = 0;
    let assembledCanvas = null, assembledBatch = null, assembledBatchUnavailable = false;

    function disableAssembledBatch() {
        assembledBatch?.dispose();
        assembledBatch = assembledCanvas = null;
        assembledBatchUnavailable = true;
        lastIconState = "";
    }

    function getAssembledBatch() {
        if (assembledBatchUnavailable) return null;
        if (!assembledBatch) {
            // 디자이너 페이지와 같이 선명한 아이콘 전체를 한 GPU 배치로 그린 뒤 한 번만 합성합니다.
            // 첫 화면에서는 쓰지 않으므로 실제로 모인 뒤에만 버퍼를 만듭니다.
            assembledCanvas = document.createElement("canvas");
            assembledBatch = window.createHeroSpriteBatch?.(assembledCanvas) || null;
            if (!assembledBatch) { disableAssembledBatch(); return null; }
            assembledBatch.resize(W, H, DPR);
            // 동작 줄이기로 정지한 상태에서도 컨텍스트가 손실되면 2D로 다시 그립니다.
            assembledCanvas.addEventListener("webglcontextlost", disableAssembledBatch, { once: true });
        }
        return assembledBatch;
    }

    function useCanvasFallback(layer) {
        layer.batch.dispose();
        layer.batch = null;
        const replacement = layer.canvas.cloneNode(false);
        layer.canvas.replaceWith(replacement);
        layer.canvas = replacement;
        layer.ctx = replacement.getContext("2d");
        sizeCanvas(replacement, layer.ctx, W, H, blurPixelRatio());
        layer.ctx.imageSmoothingQuality = "high";
        lastIconState = "";
    }

    function renderIcons(time) {
        renderSideIcons(time);
        const state = `${current}:${V.fly}:${V.graphic}:${V.dissolve}:${V.move}:${V.reveal}:${ready(atlasNow())}`;
        const idling = step === 1 && V.fly === 1 && V.move === 0;
        const moving = (V.fly < 1 || idling) && !reducedMotion.matches && V.dissolve < 1 && V.reveal < 1;
        if (!moving && state === lastIconState) { lastIconTime = time; return; }
        lastIconState = state;
        ctx.clearRect(0, 0, W, H);
        for (const layer of blurLayers) {
            if (layer.dirty) {
                if (layer.batch) layer.batch.clear();
                else layer.ctx.clearRect(0, 0, W, H);
            }
            layer.dirty = false;
            layer.alpha = 1;
        }
        const dt = lastIconTime ? Math.min(.05, (time - lastIconTime) / 1000) : 0;
        lastIconTime = time;
        if (V.fly < 1 && !reducedMotion.matches) scatterTime += dt;
        const scatterClock = scatterTime * SETTINGS.iconScatterSpeed;
        if (V.fly === 0) assembledTime = 0;
        else if (idling && !reducedMotion.matches) assembledTime += dt;
        if (dt && !reducedMotion.matches && V.fly < 1) stepPush(dt * 60);
        const motion = reducedMotion.matches ? 0 : 1;
        const move = easeInOut(clamp(V.move));
        // 결합 직후에는 서서히 움직이고, 축소가 시작되면 현재 흔들림을 멈춰 원래 자리로 돌아갑니다.
        const idleAmount = easeInOut(clamp(assembledTime / SETTINGS.iconIdleIntro)) * (1 - easeOut(clamp(V.move))) * motion;
        const frame = {
            x: lerp(bigFrame.x, smallFrame.x, move),
            y: lerp(bigFrame.y, smallFrame.y, move),
            w: lerp(bigFrame.w, smallFrame.w, move),
            h: lerp(bigFrame.h, smallFrame.h, move)
        };

        // 포스터 자리에 포스터 배경색을 먼저 깔아 뒤의 배경 아이콘이 비치지 않게 함
        if (V.move > 0 && V.reveal <= 0) {
            ctx.globalAlpha = clamp(V.move * 1.4);
            ctx.fillStyle = posters[current].background || (posters[current].theme === "dark" ? "#000" : "#fff");
            ctx.fillRect(frame.x, frame.y, frame.w, frame.h);
            ctx.globalAlpha = 1;
        }

        // 포스터 그래픽 (아이콘 뒤에 먼저 깔림) — 포스터가 완전히 덮으면 생략
        const graphic = currentGraphic();
        if (V.graphic > 0 && V.reveal < 1 && ready(graphic)) {
            ctx.globalAlpha = V.graphic;
            ctx.drawImage(graphic, frame.x, frame.y, frame.w, frame.h);
            ctx.globalAlpha = 1;
        }

        const atlas = atlasNow();
        const [fs, fx0, fy0, fsy0] = fitNow();
        const fsy = fsy0 || fs;
        const gcx = SPRITES.w / 2, gcy = SPRITES.h / 2;
        if (V.dissolve >= 1 || V.reveal >= 1 || !ready(atlas)) return;
        const k = bigFrame.h / SPRITES.h;          // 흩어진 상태의 크기
        const kf = frame.h / SPRITES.h;            // 모인 상태(포스터 자리로 이동 포함)의 크기
        const fade = 1 - V.dissolve;                         // 그래픽이 깔린 뒤 아이콘 전체가 한 번에 사라짐
        let icons = iconsNow();
        const scattered = V.fly === 0;
        const settled = V.fly === 1;
        if (scattered) icons = iconPhysics.get(icons).scattered;
        // 글자 획은 정지 이미지로 재사용하고 외곽의 움직이는 아이콘만 매 프레임 그립니다.
        // 축소·역방향 전환에서는 전체 아이콘의 위치를 다시 계산합니다.
        if (idling && V.dissolve === 0 && V.reveal === 0 && V.graphic === 0) {
            paintSettledCache(atlas, icons);
            icons = settledCache.floating;
        }
        // 모이는 동안 초점이 돌아오고, 결합이 완성되면 원래 캔버스에 선명하게 그립니다.
        const focus = easeInOut(clamp(V.fly));
        const blur = SETTINGS.iconBlurMax * k * (1 - focus);
        for (const layer of blurLayers) {
            const radius = blur * layer.strength;
            const filter = radius > .001 ? `blur(${radius.toFixed(3)}px)` : "none";
            if (layer.canvas.style.filter !== filter) layer.canvas.style.filter = filter;
        }
        const hide = 1 - V.reveal;
        const batch = settled ? getAssembledBatch() : null;
        if (batch) batch.clear();
        let batchDirty = false;
        let lastAlpha = 1;
        for (let i = 0; i < icons.length; i++) {
            const ic = icons[i];
            if (scattered) {
                const left = ic.left + ic.px, top = ic.top + ic.py, reach = ic.reach;
                if (left + ic.scatterW + reach < 0 || top + ic.scatterH + reach < 0 || left - reach > W || top - reach > H) continue;
            }
            // 크기별 순서는 유지하며 중간에도 가속도가 꺾이지 않는 ease-in-out을 적용합니다.
            const a = scattered ? 0 : settled ? 1 : step === 1
                ? easeGather(clamp((V.fly - ic.gatherStart) / ic.gatherDuration))
                : easeInOut(clamp(V.fly * 1.4 - ic.delay));
            // 포스터에 같은 '결합'이 같은 자리에 있으므로, 아이콘은 포스터가 다 나타날 때까지 그대로 두었다가
            // 완전히 덮인 순간 지움 → 보는 사람에게는 주변 글자·선만 새로 나타나는 것처럼 보임
            const alpha = (ic.whole ? 1 : a) * fade * hide;
            if (alpha <= 0.01) continue;

            const ws = ic.scatterW, hs = ic.scatterH;
            const w = lerp(ws, ic.gw * kf * fs, a), h = lerp(hs, ic.gh * kf * fsy, a);
            const wob = (1 - a) * motion;
            const tx = frame.x + (gcx + (ic.gx - gcx) * fs + fx0) * kf;
            const ty = frame.y + (gcy + (ic.gy - gcy) * fsy + fy0) * kf;
            const ang = ic.angle * wob;
            const drift = ic.idleDrift * kf * a * idleAmount;
            const margin = Math.abs(ang) > .002 ? Math.max(w, h) : 0;
            let x = tx, y = ty;
            if (!settled) {
                // 합류가 시작될 때도 바깥 움직임을 조금 이어가 멈춤 없이 부드러운 곡선으로 돌아옵니다.
                const outward = step === 1 && ic.gatherOutward
                    ? easeGather(clamp(V.fly / ic.gatherPushEnd)) * motion : 0;
                // 바깥 밀림을 출발 위치에 더해 먼저 살짝 퍼지고, 합류할수록 자연스럽게 사라지게 합니다.
                x = lerp(ic.left + ic.px * wob + ic.outwardX * outward, tx, a);
                y = lerp(ic.top + ic.py * wob + ic.outwardY * outward, ty, a);
                const curve = step === 1 ? 4 * a * (1 - a) * motion : 0;
                x += ic.curveX * curve;
                y += ic.curveY * curve;
                // 같은 부유 위상을 유지한 채 진폭만 천천히 줄여 현재 움직임에서 결합으로 이어집니다.
                const floatReach = ic.drift * SETTINGS.iconScatterDistance * wob * (1 - a);
                const padding = floatReach + Math.abs(drift) + margin + blur * 3;
                // 모이는 중에도 아직 화면에 들어오지 않은 아이콘은 부유·회전·그리기 계산을 생략합니다.
                if (x + w + padding < 0 || y + h + padding < 0 || x - padding > W || y - padding > H) continue;
                if (floatReach) {
                    x += Math.sin(scatterClock * ic.speed + ic.phase) * floatReach;
                    y += Math.cos(scatterClock * ic.speed * .8 + ic.phase) * floatReach;
                }
            }
            if (drift) {
                x += Math.sin(assembledTime * ic.speed + ic.phase) * drift;
                y += Math.cos(assembledTime * ic.speed * .81 + ic.phase) * drift;
            }
            if (x + w + margin < 0 || y + h + margin < 0 || x - margin > W || y - margin > H) continue;
            // 크기별 연속값으로 두 강도를 섞고, 모일수록 한 레이어로 정리합니다.
            const level = settled ? 0 : ic.blurLevel;
            const lower = Math.floor(level), blend = (level - lower) * (1 - a);
            const passes = blend > 0 ? 2 : 1;
            for (let pass = 0; pass < passes; pass++) {
                const index = lower + pass;
                const layer = index > 0 ? blurLayers[index - 1] : null;
                const drawCtx = layer ? layer.ctx : ctx;
                const opacity = alpha * (pass === 0 ? 1 - blend : blend);
                if (layer) {
                    layer.dirty = true;
                    if (layer.batch) {
                        layer.batch.add(ic, x, y, w, h, ang, opacity);
                        continue;
                    }
                    if (opacity !== layer.alpha) { drawCtx.globalAlpha = opacity; layer.alpha = opacity; }
                } else if (batch) {
                    batch.add(ic, x, y, w, h, ang, opacity);
                    batchDirty = true;
                    continue;
                } else if (opacity !== lastAlpha) { ctx.globalAlpha = opacity; lastAlpha = opacity; }
                if (Math.abs(ang) > .002) {
                    const dx = x + w / 2, dy = y + h / 2;
                    drawCtx.save(); drawCtx.translate(dx, dy); drawCtx.rotate(ang);
                    drawCtx.drawImage(atlas, ic.ax, ic.ay, ic.gw, ic.gh, -w / 2, -h / 2, w, h);
                    drawCtx.restore();
                } else drawCtx.drawImage(atlas, ic.ax, ic.ay, ic.gw, ic.gh, x, y, w, h);
            }
        }
        ctx.globalAlpha = 1;
        if (batchDirty) {
            if (!batch.flush(atlas)) {
                // 업로드 실패도 같은 프레임에 2D로 다시 그려 아이콘이 사라지지 않게 합니다.
                disableAssembledBatch();
                renderIcons(time);
                return;
            }
            ctx.drawImage(assembledCanvas, 0, 0, W, H);
        }
        for (const layer of blurLayers) {
            if (layer.batch) {
                if (layer.dirty && !layer.batch.flush(atlas)) useCanvasFallback(layer);
            } else layer.ctx.globalAlpha = 1;
            const visibility = layer.dirty ? "" : "hidden";
            if (layer.canvas.style.visibility !== visibility) layer.canvas.style.visibility = visibility;
        }
    }

    /* =====================================================
       5. 단계 전환
    ===================================================== */
    let step = 0;           // 현재 목표 단계
    let busy = false;       // 단계 애니메이션 중
    let pendingIntent = 0;

    async function goStep(next) {
        next = clamp(next, 0, 2);
        if (next === step || busy) return;
        lockPage();
        busy = true;
        stage.dataset.motion = 'moving';
        const prev = step;
        step = next;
        stage.dataset.step = String(step);
        stopAuto();

        if (prev === 0 && next === 1) {
            sideFloatTime = 0;
            sideLastTime = null;
            setNow({ sideSpread: 0, sideOpacity: 1 });
            // 주변 장식은 결합 도중부터 겹쳐 나오고 이후에도 각자의 속도로 퍼집니다.
            // 장식의 완료를 기다리지 않아 다음 스크롤은 기존 시점부터 받습니다.
            tween("sideSpread", 1, SETTINGS.iconSideSpreadStagger + SETTINGS.iconSideTravelMax, {
                delay: reducedMotion.matches ? 0 : SETTINGS.fly * SETTINGS.iconSideSpreadStart,
                ease: t => t
            });
            // 전체 시간은 선형으로 진행하고, 아이콘별 구간에서 easing을 한 번만 적용합니다.
            await tween("fly", 1, SETTINGS.fly, { ease: t => t });
            if (hasGraphic()) {   // 그래픽 이미지가 있는 버전만 이미지로 교체 (흰 버전은 아이콘 그대로)
                await tween("graphic", 1, SETTINGS.graphicIn, { ease: easeOut });
                await tween("dissolve", 1, SETTINGS.dissolve, { ease: easeOut });
            }
        } else if (prev === 1 && next === 0) {
            if (V.dissolve > 0) await tween("dissolve", 0, SETTINGS.dissolve * .7, { ease: t => t });
            if (V.graphic > 0) await tween("graphic", 0, 250);
            // 방출 도중 되돌려도 현재 위치를 보존하고, 새 아이콘의 출발도 멈춥니다.
            setNow({ sideSpread: V.sideSpread });
            tween("sideOpacity", 0, SETTINGS.iconSideFadeOut);
            await tween("fly", 0, SETTINGS.scatter);
            setNow({ sideSpread: 0, sideOpacity: 0 });
        } else if (prev === 1 && next === 2) {
            measure();
            tween("text", 1, 800, { delay: 450, ease: easeOut });
            // 결합이 거의 도착하는 순간(이동의 90%)부터 바로 포스터로 전환 — 텀 없이 이어지게
            // 포스터 이미지가 완전히 준비된 뒤에만 나타나게 (중간에 빈 바탕이 비쳐 깜빡이지 않도록)
            const img = posterImages[current];
            const imgReady = img && img.decode ? img.decode().catch(() => {}) : Promise.resolve();
            const revealDone = Promise.all([imgReady, new Promise(r => setTimeout(r, SETTINGS.move * .9))])
                .then(() => tween("reveal", 1, SETTINGS.reveal, { ease: easeInOut }));
            await tween("move", 1, SETTINGS.move);
            // 포스터가 나타나는 동안만 잠금을 유지합니다.
            await revealDone;
            setNow({ sideSpread: 1 }); // 가려진 장식의 방출을 마무리해 되돌아올 때 완성 상태 유지
            // 포스터가 다 나타나면 배경 아이콘을 왼쪽부터 오른쪽으로 천천히 드러냅니다.
            tween("ambient", 1, 1200, { ease: t => t });
            startAuto();
        } else if (prev === 2 && next === 1) {
            tween("text", 0, 400);
            tween("ambient", 0, 400);
            await tween("reveal", 0, SETTINGS.reveal * .6, { ease: t => t });
            await tween("move", 0, SETTINGS.move * .9);
        }
        busy = false;
        stage.dataset.motion = 'idle';
        if (step === 2) unlockPage();
        flushIntent();
    }

    // 스크롤바·링크 등으로 아래로 내려간 경우: 정착 상태로 바로 맞춤
    function jumpToSettled() {
        if (step === 2 && !busy) return;
        busy = false;
        pendingIntent = 0;
        stage.dataset.motion = 'idle';
        step = 2;
        stage.dataset.step = "2";
        const g = hasGraphic() ? 1 : 0;
        setNow({ fly: 1, sideSpread: 1, sideOpacity: 1, graphic: g, dissolve: g, move: 1, reveal: 1, text: 1, ambient: 1 });
        locked = false;
        if (hasLenis()) lenis.start();
        measure();
        startAuto();
    }

    /* ---------- 입력: 휠 / 터치 / 키보드 ---------- */
    const atTop = () => window.scrollY <= 2;
    const wantsHero = dir => atTop() && ((dir > 0 && step < 2) || (dir < 0 && step > 0));
    const wheelIntent = window.MainScrollInput.createWheelTracker();

    /* 페이지 스크롤 잠금
       - 포스터 단계(0·1)이거나 단계가 바뀌는 중에는 페이지가 절대 내려가지 않음
       - 포스터 레이아웃(2)의 등장 애니메이션이 끝나면 즉시 잠금을 풉니다. */
    const hasLenis = () => {
        try { return typeof lenis !== "undefined" && lenis && typeof lenis.stop === "function"; }
        catch (e) { return false; }   // Lenis 로드 실패 시
    };
    let locked = false;
    // 섹션 스크롤은 포스터 연출과 입력 잠금이 모두 끝난 뒤 시작합니다.
    window.MainHeroCanScroll = () => step === 2 && !busy && !locked && !touchUsed;
    function lockPage() {
        if (!locked) { locked = true; if (hasLenis()) lenis.stop(); }
    }
    function unlockPage() {
        if (!locked || step !== 2 || busy) return;
        locked = false;
        if (hasLenis()) lenis.start();
    }

    function handleIntent(dir) {
        if (busy) { pendingIntent = dir; return; }
        if (wantsHero(dir)) void goStep(step + dir);
        else if (dir > 0 && step === 2) window.MainSectionScroll?.request(dir);
    }
    window.MainHeroScroll = handleIntent;
    function flushIntent() {
        if (!pendingIntent || busy || (pendingIntent > 0 && step === 2 && touchUsed)) return;
        const dir = pendingIntent;
        pendingIntent = 0;
        if (!document.body.classList.contains('mobile-menu-open') &&
            !document.documentElement.classList.contains('page-transition-active')) handleIntent(dir);
    }

    window.addEventListener("wheel", e => {
        if (e.defaultPrevented || e.target.closest?.("input, textarea, select, [contenteditable]") ||
            document.body.classList.contains('mobile-menu-open') ||
            document.documentElement.classList.contains('page-transition-active')) return;
        const intent = wheelIntent(e);
        if (!intent) return;
        const dir = intent.direction;
        const hero = atTop() && (locked || wantsHero(dir));
        if (!hero) return;
        e.preventDefault();
        e.stopImmediatePropagation();   // Lenis 스크롤 막기
        if (intent.trigger) handleIntent(dir);
        if (step === 2 && !busy) unlockPage();
    }, { passive: false, capture: true });

    let touchY = null, touchUsed = false;
    window.addEventListener("touchstart", e => { touchY = e.touches[0].clientY; touchUsed = false; }, { passive: true, capture: true });
    window.addEventListener("touchmove", e => {
        if (touchY === null || e.touches.length !== 1 ||
            document.body.classList.contains('mobile-menu-open') ||
            document.documentElement.classList.contains('page-transition-active')) return;
        const dy = touchY - e.touches[0].clientY;
        const dir = Math.sign(dy);
        const holding = atTop() && (locked || busy || touchUsed);
        if (!dir || (!holding && !wantsHero(dir))) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!touchUsed && Math.abs(dy) > 36) {
            touchUsed = true;
            handleIntent(dir);
        }
    }, { passive: false, capture: true });
    const endTouch = () => {
        touchY = null; touchUsed = false;
        if (step === 2 && !busy) unlockPage();
        flushIntent();
    };
    window.addEventListener("touchend", endTouch, { passive: true, capture: true });
    window.addEventListener("touchcancel", endTouch, { passive: true, capture: true });

    window.addEventListener("keydown", e => {
        if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey ||
            e.target.closest?.("input, textarea, select, [contenteditable]") ||
            document.body.classList.contains('mobile-menu-open') ||
            document.documentElement.classList.contains('page-transition-active')) return;
        const down = ["ArrowDown", "PageDown", " "].includes(e.key);
        const up = ["ArrowUp", "PageUp"].includes(e.key);
        const dir = down ? 1 : up ? -1 : 0;
        if (!dir || !atTop() || (!busy && !wantsHero(dir))) return;
        e.preventDefault();
        if (!e.repeat) handleIntent(dir);
    }, { capture: true });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40 && step < 2) jumpToSettled();
    }, { passive: true });

    /* =====================================================
       6. 포스터 전환 (기본 ↔ 다크)
    ===================================================== */
    let autoTimer = 0;
    let fxWarmup = 0;
    let wipeStart = 0;

    function syncDownload(index) {
        if (!download) return;
        const p = posters[index];
        if (p.pdf) {
            download.href = p.pdf;
            download.removeAttribute("aria-disabled");
            download.removeAttribute("title");
            download.setAttribute("aria-label", `${p.label || "포스터"} PDF 다운로드`);
        } else {
            download.removeAttribute("href");
            download.setAttribute("aria-disabled", "true");
            download.setAttribute("title", "준비 중입니다");
            download.setAttribute("aria-label", `${p.label || "포스터"} PDF 준비 중`);
        }
    }

    function syncUI(index) {
        indicator?.querySelectorAll("button").forEach((btn, i) => btn.setAttribute("aria-selected", String(i === index)));
        syncDownload(index);
    }

    function goTo(index, mode = "wipe") {
        index = (index + posters.length) % posters.length;
        if (index === current) return;
        switchMode = mode;
        stage.style.setProperty("--theme-color-dur", mode === "fade" ? ".3s" : ".9s");
        themeFrom = current;      // 진행 중이어도 즉시 새 전환 시작
        current = index;
        themeT = 0; bgT = 0;
        wipeStart = performance.now();
        syncUI(index);
    }

    function stepTheme(now) {
        if (themeT >= 1 && bgT >= 1) return;
        const e = now - wipeStart;
        const fast = switchMode === "fade" || reducedMotion.matches;
        const posterDur = fast ? SETTINGS.clickSwitch : SETTINGS.posterWipe;
        const bgDur = fast ? SETTINGS.clickSwitch : SETTINGS.bgWipe;
        themeT = clamp(e / posterDur);
        bgT = clamp((e - (fast ? 0 : SETTINGS.bgDelay)) / bgDur);
        // 글자색은 배경이 절반쯤 지날 때 바뀜
        if (bgT > .45) stage.dataset.theme = posters[current].theme;
    }

    function startAuto() {
        if (autoTimer || document.hidden || step !== 2) return;
        if (!fxCells && !fxWarmup) {
            fxWarmup = setTimeout(() => {
                fxWarmup = 0;
                if (step === 2 && !document.hidden && !fxCells) buildFx();
            }, 1000);
        }
        autoTimer = setInterval(() => goTo(current + 1), SETTINGS.autoInterval);
    }
    function stopAuto() { clearInterval(autoTimer); autoTimer = 0; }
    function restartAuto() { stopAuto(); startAuto(); }

    posterButton.addEventListener("click", () => {
        if (!stage.classList.contains("is-poster-ready")) return;
        goTo(current + 1, "fade");   // 클릭: 입자 효과 없이 빠르게
        restartAuto();
    });
    indicator?.addEventListener("click", event => {
        const btn = event.target.closest("button[data-index]");
        if (!btn || step !== 2) return;
        goTo(Number(btn.dataset.index));   // 아래 바: 자동 전환과 같은 방식
        restartAuto();
    });
    document.addEventListener("visibilitychange", () => document.hidden ? stopAuto() : startAuto());

    /* =====================================================
       Loop
    ===================================================== */
    const cssValues = new Map();
    function setCSS(element, name, value) {
        if (!element || cssValues.get(name) === value) return;
        cssValues.set(name, value);
        element.style.setProperty(name, value);
    }
    function syncCSS(rect) {
        setCSS(stage, "--text-opacity", V.text.toFixed(3));
        setCSS(stage, "--text-events", V.text > .5 ? "auto" : "none");
        setCSS(stage, "--poster-shadow", clamp((V.move - .8) / .2).toFixed(3));
        setCSS(stage, "--hint-opacity", step < 2 && !busy ? "1" : "0");
        setCSS(heroAmbient, "--ambient-reveal", V.ambient.toFixed(3));
        // 결합 아이콘을 포스터 위에 두고, 포스터가 아래에서 완전히 나타난 뒤에 아이콘을 지움
        stage.classList.toggle("icons-front", V.move > 0 && V.reveal < 1);
        const posterReady = step === 2 && !busy && V.reveal >= 1;
        stage.classList.toggle("is-poster-ready", posterReady);
        const tabIndex = posterReady ? 0 : -1;
        if (posterButton.tabIndex !== tabIndex) posterButton.tabIndex = tabIndex;
        syncHeaderVisibility();
        header?.classList.toggle("is-dark", stage.dataset.theme === "dark" && rect.bottom > headerHeight);
    }

    let lastFrameTime = 0;
    function loop(now) {
        requestAnimationFrame(loop);
        if (document.hidden || document.documentElement.classList.contains("page-transition-active")) {
            lastIconTime = 0;
            lastFrameTime = 0;
            return;
        }
        const resting = step < 2 && !busy && !tweens.size && !pointer.down &&
            Math.abs(pointer.vx) + Math.abs(pointer.vy) < .1;
        const frameInterval = 1000 / (resting ? SETTINGS.idleFPS : SETTINGS.maxFPS);
        const elapsed = now - lastFrameTime;
        if (elapsed < frameInterval - .5) return;
        // 144Hz처럼 60의 배수가 아닌 화면에서도 남은 시간을 다음 프레임에 반영합니다.
        lastFrameTime = now - Math.min(frameInterval, Math.max(0, elapsed - frameInterval));
        stepTweens(now);
        stepTheme(now);
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) {
            renderBg(now);
            renderIcons(now);
            renderPoster(now);
        } else lastIconTime = 0;
        syncCSS(rect);
    }

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(measure, 120);
    });
    document.fonts?.ready.then(measure);
    window.addEventListener("load", () => {
        measure();
        if (window.scrollY > 40) jumpToSettled();
    });

    measure();
    buildIcons();
    syncUI(0);
    if (window.scrollY <= 2) lockPage();
    requestAnimationFrame(loop);
})();
