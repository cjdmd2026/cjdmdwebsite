// main-hero.js에서 결합 직전까지 필요한 배치와 동작만 분리했습니다.
import layout from '../assets/word-layout.json';
import atlasUrl from '../assets/word-atlas.webp';
const image=new Image(); image.src=atlasUrl;
const SETS={light:layout}, SPRITES=layout, wordFlight=true;
const flightPrints={},landingBackdrops={},sideIconSets={},sideFields={};
let iconSets={},bigFrame={x:0,y:0,w:1,h:1},W=1,H=1;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const swimEpoch=document.timeline.currentTime??performance.now();
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t,rand=(a,b)=>a+Math.random()*(b-a);
const SETTINGS = {
    autoInterval: 5500,      // 포스터 자동 전환 간격(ms)
    posterWipe: 720,         // 포스터 전환 시간(ms): 기존 포스터가 왼쪽부터 입자로 부서져 오른쪽으로 날아감
    bgDelay: 150,            // 배경 시작: 포스터 전환이 1/3쯤 남았을 때 (포스터 전환 중반부터 함께)
    bgWipe: 720,             // 배경 닦이는 시간(ms) — 포스터보다 조금 느리게
    bigFrameHeight: 0.92,    // '결합' 크게 보일 때 그래픽 높이 (화면 높이 대비)
    iconBlurFullSize: 8,     // 원본 기준: 가장 작은 아이콘은 최대 블러 유지
    iconBlurClearSize: 40,   // 이 크기까지 블러를 점진적으로 줄이고, 큰 아이콘은 선명하게
    iconBlurMax: 3.5,        // 원본 기준 최대 블러 반경 — 화면 크기에 맞춰 함께 축소
    iconSidePixelBudget: 1440 * 900, // 주변 장식의 최대 픽셀 수 — 큰 화면의 합성 비용 제한
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

const glyphSegments = [
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
].flatMap(({ r, p }) => p.slice(1).map(([bx, by], i) => {
    const [ax, ay] = p[i], dx = bx - ax, dy = by - ay;
    return { ax, ay, dx, dy, lengthSquared: dx * dx + dy * dy, radius: r };
}));

function glyphMotionAt(cx, cy, iconRadius) {
    let distance = Infinity;
    for (const { ax, ay, dx, dy, lengthSquared, radius } of glyphSegments) {
        const t = clamp(((cx - ax) * dx + (cy - ay) * dy) / lengthSquared);
        distance = Math.min(distance, Math.hypot(cx - ax - t * dx, cy - ay - t * dy) - radius);
    }
    // ㅎ의 둥근 획: 안쪽 빈 공간은 고정 영역에서 제외합니다.
    const outer = Math.hypot((cx - 460) / 165, (cy - 1060) / 130);
    const inner = Math.hypot((cx - 460) / 90, (cy - 1060) / 60);
    // 타원 경계까지의 거리는 짧은 반지름을 기준으로 근사합니다.
    const ringDistance = outer > 1 ? (outer - 1) * 130 : inner < 1 ? (1 - inner) * 60 : 0;
    distance = Math.min(distance, ringDistance) - iconRadius;
    if (distance <= 0) return 0;
    // 획 경계에서는 거의 움직이지 않고, 거리에 따라 기존 진폭까지 부드럽게 커집니다.
    const proximity = clamp(distance / SETTINGS.iconIdleStrokeFalloff);
    return proximity * proximity * (3 - 2 * proximity);
}

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
    const blurStrength = size => {
        const t = clamp((SETTINGS.iconBlurClearSize - size) / (SETTINGS.iconBlurClearSize - SETTINGS.iconBlurFullSize));
        // 원본 8px 이하: 최대 / 13px: 약 60% / 18px: 약 32% / 24px: 약 13%.
        return Math.pow(t, SETTINGS.iconBlurFalloff);
    };
    const make = (set, theme) => {
        const sprites = set?.s || [];
        const identities = window.MAIN_POSTER_IDENTITIES;
        const codes = atob(identities?.[theme] || "");
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
            const identity = codes.length === sprites.length ? codes.charCodeAt(index) - 1 : -1;
            const design = identity >> 2;
            const size = sizes[index];
            const glyphFreedom = glyphMotionAt((gx + gw / 2) * 1130 / set.w, (gy + gh / 2) * 1600 / set.h,
                wordFlight ? Math.max(gw * 1130 / set.w, gh * 1600 / set.h) / 2 : 0);
            const depth = (size - minSize) / (maxSize - minSize || 1);
            const gatherOrder = lerp(1 - depth, ranks[index] / lastRank, SETTINGS.iconGatherRankBlend);
            const gatherStart = gatherOrder * SETTINGS.iconGatherLastStart;
            const gatherEnd = lerp(SETTINGS.iconGatherFirstEnd, 1, gatherOrder);
            const gatherDuration = gatherEnd - gatherStart;
            return {
                gx, gy, gw, gh, ax, ay, depth, sourceIndex: index,
                scatterScale: 1 + depth * SETTINGS.iconForegroundScale,
                designId: identities?.designs[design] || null,
                designAngle: (identity & 3) * Math.PI / 2,
                designPeriod: (identities?.symmetryTurns[design] || 4) * Math.PI / 2,
                gatherStart, gatherDuration,
                gatherPushEnd: gatherStart + gatherDuration * SETTINGS.iconGatherTurnOverlap,
                gatherOutward: idleStrength(size), // 8px 이하는 최대, 24px 이상은 바깥 밀림 없음
                whole: kind === 1,
                blurStrength: blurStrength(size),
                pushStrength: pushStrength(size),
                glyphFreedom,
                idleDrift: glyphFreedom ? glyphFreedom * idleStrength(size) * SETTINGS.iconIdleDistance * rand(.6, 1) : 0,
                ...scatterPosition(), // 캔버스는 화면 크기로 유지하고 시작 좌표만 바깥까지 확장
                delay: Math.random() * .4, // 역방향으로 흩어질 때의 시차
                phase: Math.random() * Math.PI * 2,
                px: 0, py: 0, pvx: 0, pvy: 0, spin: 0, angle: 0, awake: false,   // 마우스에 밀린 정도
                speed: rand(.2, .55),
                drift: rand(8, 26)
            };
        }).sort((a, b) => a.depth - b.depth); // 작은 아이콘부터 그려 큰 전경 아이콘이 앞에 놓이게 합니다.
    };
    iconSets = { light: make(SETS.light, "light"),  };
    for (const [theme, icons] of Object.entries(iconSets)) {
        if (wordFlight) {
            flightPrints[theme] = new Array(icons.length);
            for (const ic of icons) {
                const radius = 2.6 + 2 * ic.depth + ic.idleDrift * .72;
                ic.swim = [ic.phase, .38 + ic.speed * .72, radius, radius * ic.glyphFreedom];
                flightPrints[theme][ic.sourceIndex] = {
                    swim: ic.swim,
                    scatter: [ic.sx, ic.sy, ic.scatterScale, SETTINGS.iconBlurMax * ic.blurStrength],
                    span: [ic.gatherStart, ic.gatherDuration]
                };
            }
            landingBackdrops[theme] = buildLandingBackdrops(icons);
        }
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

// Tiny original prints in and around the ㄹ detail span the gap between
// the rear lattice and the word, including on narrow screens.
const detailPrints = [[.43,.325],[.51,.338],[.555,.36],[.415,.391],[.55,.41],[.47,.427],[.596,.387],[.395,.353]];
// Work in original SVG coordinates so resizing never reshuffles a pocket of ink.
function buildLandingBackdrops(icons) {
    const sizeOf = icon => Math.max(icon.gw, icon.gh);
    const small = icons.filter(icon => icon.whole && sizeOf(icon) >= 8 && sizeOf(icon) <= 16);
    const marks = [], footprints = [];
    if (!small.length) return marks;
    // Icons are sorted by size. Several atlas tiles can belong to one large SVG mark.
    for (let i = icons.length - 1; i >= 0; i--) {
        const icon = icons[i], size = sizeOf(icon);
        if (size < 30) break;
        const x = icon.gx + icon.gw / 2, y = icon.gy + icon.gh / 2;
        if (footprints.some(p => Math.hypot(p.x - x, p.y - y) < .30 * (size + p.size))) continue;
        footprints.push({x, y, size});
        const count = Math.round(size / 7.5);
        for (let j = 0; j < count; j++) {
            const seed = icon.sourceIndex * 73 + j * 137;
            const sprite = small[seed % small.length];
            const angle = icon.sourceIndex * 1.73 + j * 2.40;
            const radius = .40 * Math.sqrt((j + .35) / count);
            const side = size * (.22 + .06 * Math.sin(seed));
            const scale = side / sizeOf(sprite);
            marks.push({sprite, ownerIndex: icon.sourceIndex, x: x + Math.cos(angle) * icon.gw * radius,
                y: y + Math.sin(angle) * icon.gh * radius, w: sprite.gw * scale, h: sprite.gh * scale,
                opacity: .49 + .08 * Math.cos(seed), blurRatio: .20,
                swim: [angle % (Math.PI * 2), sprite.swim[1], size * .045, size * .045 * icon.glyphFreedom]});
        }
    }
    return marks;
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
        for (const mark of landingBackdrops[theme] || []) {
            const k = bigFrame.h / SETS[theme].h;
            const x = bigFrame.x + mark.x * k, y = bigFrame.y + mark.y * k;
            sideFields[theme].push({...mark, side: mark.x < SETS[theme].w / 2 ? -1 : 1,
                x, y, originX: x, originY: y, w: mark.w * k, h: mark.h * k, arc: 0,
                floatRadius: mark.swim[3] * k});
        }
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
            if (wordFlight) {
                const radius = SETTINGS.iconSideIdleDistance * item.floatStrength * .72;
                const freedom = glyphMotionAt((item.x - bigFrame.x) * 1130 / bigFrame.w,
                    (item.y - bigFrame.y) * 1600 / bigFrame.h, (size / 2) * 1600 / bigFrame.h);
                item.swim = [item.floatPhase, item.floatSpeed, radius, radius * freedom];
                item.floatRadius = item.swim[3] * bigFrame.h / SETS[theme].h;
            }
            // 가장자리 일부만 지우지 않고, 분포 전체의 크기·농도를 연속적으로 낮춥니다.
            const verticalFade = 1 - Math.pow(Math.abs(vertical), 3);
            const outerFade = (1 - travel) * (1 - travel) * (1 + 2 * travel);
            item.opacity = item.alpha * verticalFade * outerFade;
            if (item.opacity > .01) sideFields[theme].push(item);
        }
        if (wordFlight) {
            const tiny = iconSets[theme].filter(ic => Math.max(ic.gw, ic.gh) <= 7);
            if (tiny.length) detailPrints.forEach(([u,v], i) => {
                const sprite = tiny[(i * 73 + 19) % tiny.length], k = bigFrame.h / SETS[theme].h;
                const x = bigFrame.x + u * bigFrame.w, y = bigFrame.y + v * bigFrame.h;
                const radius = sprite.swim[2];
                const landedRadius = radius * glyphMotionAt(u * 1130, v * 1600, Math.max(sprite.gw, sprite.gh) / 2);
                sideFields[theme].push({sprite, detail: true, side: u < .5 ? -1 : 1, x, y, originX: x, originY: y,
                    w: sprite.gw * k, h: sprite.gh * k, opacity: .85, arc: 0,
                    swim: [sprite.swim[0], sprite.swim[1], radius, landedRadius], floatRadius: landedRadius * k});
            });
        }
    }

}


function measureIcons(){
  const k=bigFrame.h/SPRITES.h;
  for(const ic of iconSets.light){
    ic.sw=ic.gw*k;ic.sh=ic.gh*k;
    ic.tx=bigFrame.x+ic.gx*k;ic.ty=bigFrame.y+ic.gy*k;
  }
  measureSideIcons();
}
export function fitSurface(width,height){
  W=width;H=height;
  const ratio=SPRITES.w/SPRITES.h;
  const fw=Math.min(H*SETTINGS.bigFrameHeight*ratio,W*.95),fh=fw/ratio;
  bigFrame={x:(W-fw)/2,y:(H-fh)/2,w:fw,h:fh};
  if(!iconSets.light)buildIcons();else measureIcons();
}
export const surface={
  theme:'light',get frame(){return bigFrame;},
  get time(){return ((document.timeline.currentTime??performance.now())-swimEpoch)*.001;},
  get motionEnabled(){return !reducedMotion.matches;},
  getSource(){return {set:layout,image,prints:flightPrints.light};},
  getSurroundings(){return sideFields.light;}
};
