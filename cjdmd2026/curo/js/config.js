/* ==========================================================================
   CURO — 좌표/설정 단일 소스 (single source of truth)
   - 모든 좌표는 "scene 좌표" = 레이어 PNG 원본 px (Main1: 2076×1080 canvas)
   - 측정 근거: HANDOFF.md §6–§12
   - 여기 값을 바꾸면 main.js 가 CSS custom property 로 반영한다.
   ========================================================================== */
window.CURO_CONFIG = {

  main1: {
    scene: { w: 2076, h: 1080 },          // 레이어 공통 canvas
    frame: { x: 0, y: 0, w: 1920, h: 1080 }, // 디자인 frame (bleed 는 오른쪽 x1920–2076 에만 존재)

    // ---- camera (HANDOFF §19-1) ----
    camera: {
      // coverRect: Background 가 완전히 불투명한 영역. viewport 는 항상 이 안에서만 잘라낸다 (빈 여백 금지).
      //   현재 Background 불투명 영역 = x 0–1920, y 0–1080 → 사실상 frame 과 같다.
      //   나중에 Background 에 좌우/상하 bleed 를 추가하면 이 값만 넓히면 crop 이 자동으로 줄어든다.
      coverRect: { x: 0, y: 0, w: 1920, h: 1080 },
      // focus: crop 이 필요할 때 viewport 중앙에 두려는 scene 좌표.
      //   y 559 = 로고 top(93) ~ arrow bottom(1025) 의 중심 → 위(하늘)를 아래(길/전경)보다 조금 더 자른다.
      focus: { x: 960, y: 559 }
    },

    // ---- UI compress (세로 crop 이 생길 때만 동작, 1920×1080 에서는 0) ----
    uiCompress: {
      minScale: 0.75,        // 로고/CTA 최소 축소 비율
      // 로고 상단 breathing room (3차 보정): 세로 crop 이 생기는 viewport 에서
      //   보이는 영역 위쪽 끝 ~ 로고 top 최소 여백 = logoMinTop × f (scene px).
      //   2차 40 → 75 (+약 30px, 1920×937 기준 34.7 → 65.1). 1920×1080 은 기본 top 93 이 더 크므로 영향 없음.
      logoMinTop: 75,
      // 로고가 내려갈 때 뒤의 캐릭터(코끼리 귀)와 겹치지 않도록 최소 간격 (scene px × f).
      //   간격이 부족하면 breathing 이 줄어든다 (로고 크기·캐릭터 위치는 건드리지 않음).
      logoMinGapToArt: 10,
      // 아주 낮은 viewport 에서 간격 확보가 불가능할 때의 최후 여백 (이 값은 캐릭터 간격보다 우선)
      logoHardMinTop: 24,
      // 로고 가로 범위(로고 폭 × f) 안에서 가장 높은 캐릭터 픽셀의 scene y (Main1-Character.png 알파 측정값).
      //   [f, y] — 사이 값은 선형 보간. 에셋이 바뀌면 재측정 필요.
      //   31차: 새 Main1-Character + Main1-FrontCover 기준 재측정 (새 로고 345 폭 범위 → 책 윗면이 가장 높음)
      //   33차: 로고를 525 폭으로 키우면서 bbox 대신 실제 로고 글자 모양(α>20)으로 재측정 = min(캐릭터 top − 글자 아래끝) + 로고 높이×f
      logoArtClearance: [[1, 312.0], [0.95, 323.9], [0.9, 341.7], [0.85, 365.6], [0.8, 417.4], [0.75, 418.3]],   // 35차: 새 Main1-Character (코끼리 36px 낮아짐 + 책등/윗면 다시 포함) 로 재측정
      ctaMinBottom: 30,      // arrow 아래쪽 끝 ~ 보이는 영역 아래쪽 끝 최소 여백 (scene px × f)
      ctaAnchorY: 1025.3     // arrow chevron 아래쪽 끝 (scene y). CTA 그룹은 이 점을 기준으로 축소
    },

    // 레이어 z-order (아래 → 위) — HTML 순서와 동일. 레이어는 모두 scene (0,0), scale 1.
    // 118차: 배경(Background.webp) = 예전 Background + MediumShot + LongShot 을 한 장으로 합친 것 (사용자 export, 1920×1080)
    layers: ['background', 'character', 'book'],

    // 31차: 새 책 (웹/메인/메인1/Main1-FrontCover.png · Main1-Character.png, 둘 다 2076×1080 같은 캔버스에 이미 배치됨).
    //   book = 표지 hinge 사각형 (scene px). 왼쪽 변 x 754 = 책등 오른쪽 끝(표지가 시작되는 곳, Character 의 책등 718–754 바로 옆),
    //   세로 455–928 = hinge 열(x 754)에서 표지가 불투명한 구간 → 왼쪽 가운데 (754, 691.5) = hinge.
    //   표지 그림(assets.cover)은 이 사각형보다 조금 크다 (오른쪽 위 모서리 y 443, 아래 그림자) → 책 좌표 기준 offset 으로 같이 회전.
    book: { x: 754, y: 454, w: 468, h: 473 },   // 129차: main1.psd 합성과 맞춤 (표지 1px 위, 캐릭터 1px 아래)

    // 32차: 펼쳐진 책 안쪽 페이지 (Index3 책 안의 Main2 창). page = 표지가 덮던 종이 면 (scene px, 표지 불투명 영역 기준:
    //   x 754–1222, 윗변은 hinge 쪽 455 → 오른쪽 443 로 살짝 기울어 평균 449, 아랫변 928).
    //   창 = page 를 paddingX/Y 만큼 안쪽으로 줄인 사각형 + radius 둥근 모서리 (scene px). Main2 는 비율 그대로 창 안에서만 보임 (자르기만, 늘이지 않음).
    //   zoom 이 진행되면 창이 같은 page geometry 에서 화면 전체로 이어서 넓어짐 → 여백이 갑자기 바뀌지 않음
    bookInterior: { page: { x: 754, y: 448, w: 468, h: 479 }, paddingX: 20, paddingY: 20, radius: 8 },

    // 31차: 웹용 복사본의 box [x, y, w, h] (scene px) — tools/build_main1_assets.py 가 alpha bbox(+2px)로 crop 한 위치.
    //   원래 캔버스의 같은 자리에 원래 px 크기로 놓으므로 합성은 crop 전과 동일 (tools/main1_asset_boxes.json)
    assets: {
      background: [0, 0, 1920, 1080],     // 118차: Background.webp (1920×1080, 원경·중경·근경 합본)
      character:  [436, 263, 1105, 704],  // 118차: Main1-Character.webp (png 와 같은 크기·자리) ← Main1-Character.png  (35차 새 버전: 원본 alpha 438,264–1539,964 + 2px, 34차와 bounds 같음)
      cover:      [735, 434, 490, 509],   // 130차: 책등·윗면과의 틈 메움 (오른쪽·아래 변은 그대로, 왼쪽 2·위 3px 키움)   // 118차: Main1-FrontCover.webp (png 와 같은 크기·자리, 표지 + 아래 그림자)
      bookSlot:   [735, 434, 490, 509]    // Main1-BookSlot-mask.png (표지 불투명 실루엣) — 표지가 떠난 자리를 종이색으로
    },

    // scene UI (scene 좌표)
    // 33차: 로고 표시 크기 ≠ PNG 크기. 새 Logo.png(345×94)는 글자 bounds = 파일 전체(투명 여백 0).
    //   의도안(예전 구현 화면)의 CURO 글자 화면 폭 = 1920 기준 525px (사용자 첨부 이미지 실측 519–525, 예전 로고 525×140 과 같음)
    //   → 글자 폭 525 로 표시 (345 의 약 1.52배, 1.4배(483) 테스트보다 조금 큼), 비율 유지 h = 525 × 94/345 = 143.04.
    //   가로 중심 957.5 유지 (x = 957.5 − 262.5), top 93 = 의도안과 같음 (실측 ≈ 92.6)
    logo:  { x: 725, y: 93, w: 470, h: 470 * 94 / 345 },   // 163차: 로고 조금 작게 (525 → 470, 가운데 960 유지)
    cta:   { cx: 960, cy: 981.2, fontSize: 20, letterSpacing: 0 }, // CLICK TO OPEN 대문자 중심. Figma: Pretendard Regular 20, 자간 0%, line-height auto (text box ≈145×24)
    arrow: { cx: 959.5, cy: 1019.8, size: 36, pathCy: 18.44 } // SVG 36×36, chevron path 중심 y=18.44
  },

  // ---- Main2 (STORY 첫 장면) ----
  main2: {
    scene: { w: 2397, h: 1080 },                 // 6개 레이어 공통 canvas
    // 레이어 (아래 → 위). enabled:false 는 DOM 에는 있지만 숨김 (optional)
    // 27차: box = 웹용 복사본을 투명 여백 없이 잘라낸 위치·크기 [x, y, w, h] (scene 좌표, tools/build_story_layers.py 가 계산).
    //   원본 캔버스의 같은 자리에 놓이므로 화면은 crop 전과 같다. group = 같은 depth·항상 같은 이동인 이웃 레이어를 하나로 묶어 이동 (compositor layer 1장)
    layers: [
      // 40차: 사용자 크롭 이미지로 교체 — box 는 이전 화면과 픽셀 대조로 찾은 위치 (크기 변경 없음, 잘라낸 부분은 이동 중에도 보이지 않는 영역임을 계산으로 확인)
      { key: 'distant',    enabled: true,  depth: 'far',       box: [300, 0, 1434, 728] },   // Main2-DistantView  (원경: 창밖) — 이전 [159,0,1575,1080] 에서 왼쪽 투명 141px·아래 352px(중경에 항상 가려짐) 제거
      { key: 'character2', enabled: false, depth: 'character', box: [1156, 309, 279, 373] },   // Main2-Character2   (래비, optional — 아직 OFF. 40차: OFF 이면 이미지를 내려받지 않음 — HTML data-src, story.js)
      { key: 'middle',     enabled: true,  depth: 'mid',       box: [263, 0, 2021, 1080] },   // Main2-MiddleView   (중경) — 이전 [44,0,2240,1080] 에서 왼쪽 219px(카메라 왼쪽 밖, 이동 중에도 안 보임) 제거. 오른쪽 210px fade 는 다시 구움
      { key: 'close',      enabled: true,  depth: 'near',      box: [91, 818, 1934, 262] },    // Main2-CloseView    (근경: 책상)
      { key: 'character',  enabled: true,  depth: 'character', box: [527, 247, 660, 607] },   // Main2-Character    (콩이)
      { key: 'recentL',    enabled: true,  depth: 'near',      box: [263, 687, 388, 393] },   // Main2-RecentViewLeft  (최근경 왼쪽 잎) — 이전 RecentView(0,687 2397×393) 의 x 263–651
      { key: 'recentR',    enabled: true,  depth: 'near',      box: [1896, 687, 501, 393] }   // Main2-RecentViewRight (최근경 오른쪽 잎, 오른쪽 fade 포함) — 이전 RecentView 의 x 1896–2397
    ],
    // STORY 가로 이동 depth parallax (story.js). 이동량 배율: 1 = 화면(캐릭터)과 같은 속도, 1보다 크면 더 빨리 스쳐 감
    // 25차: 원경을 더 느리게, 근경을 더 빠르게 (23·24차 0.75 / 0.9 / 1.0 / 1.25)
    //   mid 는 0.72 까지만: 창밖(원경)은 벽(중경)의 창문 너머로만 보이도록 그려져 있어서, 원경–중경 차이가 크면
    //   이동 후반에 벽이 먼저 빠져나가고 창밖 하늘만 떠 보인다. 조건: (mid − far) ÷ far × 1469 < 488 → far 0.55 이면 mid ≤ 0.73
    // 29차: 한 단계 약하게 (25차 0.55 / 0.72 / 1.0 / 1.35). 창밖–벽 조건 (0.82−0.68)÷0.68×1469 = 302 < 488 → 하늘만 떠 보이는 문제 없음
    parallax: { far: 0.68, mid: 0.82, character: 1.0, near: 1.22 },
    edgeFade: { left: 0, right: 210 },           // 장면 가장자리 투명 fade (scene px). 25차부터 이미지 복사본에 구워 넣음 (tools/bake_edge_fade.py) — 값을 바꾸면 스크립트도 같이
    // 텍스트 등장 (정착 후). 콩이가 고민하는 장면 → 조용하게: fade + 아주 부드러운 위로 이동
    text: {
      duration: 0.8, ease: 'cubic-bezier(0.33, 0, 0.2, 1)', stagger: 0.14,
      kicker: { y: 8 }, title: { y: 18 }, body: { y: 10 },
      arrow: { delay: 0.1, duration: 0.6, x: -6 }     // body 등장이 끝난 뒤 delay 초 후 fade-in (+ x 만큼에서 제자리로). 반복 animation 없음
    },
    // fullscreen camera: 원본 방 일러스트(core) x 263–2182 가 완전히 불투명 (DistantView 포함 시)
    camera: {
      coverRect: { x: 263, y: 0, w: 1919, h: 1080 },
      focus: { x: 1222.5, y: 540 }               // core 중심
    },
    background: '#FFFAF1',                       // Main2 오른쪽 벽색 (stage 배경)
    // 355차: 창밖 하늘(far)을 벽(mid)과 함께 움직이는 틀 안으로 자름. 틀 = MiddleView 불투명 범위 x 263–2074 (오른쪽 210px fade 전까지)
    //   → 다음 장면으로 넘길 때 하늘 오른쪽 끝이 벽 밖(빈 공간)으로 세로 띠처럼 보이던 것 (창 크기에 따라 보임) 방지
    frame: 'mid', frameBox: [263, 1811]
  },

  // ---- Main5 (STORY 5번째 장면 — Main3·4 는 아직 없음) ----
  main5: {
    scene: { w: 2533, h: 1080 },                 // 5개 레이어 공통 canvas
    layers: [                                    // 아래 → 위 (HTML 순서와 같아야 함). box·group 은 main2.layers 설명 참고
      // 40차: 사용자가 투명 여백을 잘라 교체한 이미지 기준. 토끼 그림자는 Main5-Character.png 안에 포함(바닥 원경에는 없음).
      //   토끼(+그림자)는 중경(방석·책) 뒤. 위치는 이전 화면과 픽셀 대조로 찾은 값 (tools/story_crop_boxes.md)
      { key: 'distant',   enabled: true, depth: 'far',       box: [0, 0, 2533, 1080] },   // Main5-DistantView  (방 바닥 전체, 원경)
      { key: 'character', enabled: true, depth: 'character', box: [582, 0, 862, 1080] },  // Main5-Character    (토끼 + 그림자, 862×1080 — 토끼는 예전 Rabbit(715,0)과 픽셀 동일 위치)
      { key: 'middle',    enabled: true, depth: 'mid',       box: [0, 416, 943, 664] },   // Main5-MiddleView   (왼쪽 방석·책 — 토끼 앞)
      { key: 'close',     enabled: true, depth: 'near',      box: [1334, 507, 1199, 573], group: 'near' },   // Main5-CloseView    (손·상자)
      { key: 'recent',    enabled: true, depth: 'near',      box: [1335, 665, 659, 415], group: 'near' }    // Main5-RecentView   (최근경 → 근경 그룹)
    ],
    // 25차: 위에서 내려다본 바닥 장면이라 토끼 그림자가 원경(바닥) 레이어에 그려져 있다. 원경을 너무 느리게 하면
    //   이동 중 그림자가 토끼에서 떨어져 얼룩처럼 보여서 Main2 보다 덜 느리게 (그림자 간격 = (1 − far) × 이동량)
    // 29차: 한 단계 약하게 (25차 0.8 / 0.9 / 1.0 / 1.35). 근경(손) 미끄러짐·그림자 벌어짐 감소
    parallax: { far: 0.86, mid: 0.94, character: 1.0, near: 1.22 },
    edgeFade: { left: 140, right: 0 },           // 왼쪽 끝(x 0) 알파 40 가장자리가 선처럼 보이지 않게. 이미지 복사본에 구워 넣음 (tools/bake_edge_fade.py)
    // 텍스트 등장: 첫 학습 단계 → Main2 보다 아주 약간 경쾌 (bounce/elastic 없음)
    text: {
      duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: 0.1,
      kicker: { y: 10 }, title: { y: 24 }, body: { y: 14 },
      arrow: { delay: 0.05, duration: 0.5, x: -6 }
    },
    // fullscreen camera: DistantView 가 완전히 불투명한 core x 364–2346 (폭 1983)
    camera: {
      coverRect: { x: 364, y: 0, w: 1983, h: 1080 },
      focus: { x: 1355.5, y: 540 }               // core 중심
    },
    background: '#FBF4ED'                        // core 오른쪽 끝 바닥색 (stage 배경)
  },

  // ---- Main3 · Main4 · Main6 ~ Main9 (45차) ----
  //   Main2/Main5 와 같은 구조: scene = 레이어 공통 canvas(원본 PSD 출력 크기), box = 웹용 WebP 를 놓을 자리 [x, y, w, h] (scene px).
  //   box 는 각 폴더의 1920×1080 기준 이미지(메인N/mainN.png)와 원본 레이어 PNG 를 SIFT 정합 + 합성 비교로 찾은 값 (tools/story_scenes_45.md).
  //   WebP 는 사용자가 PNG 의 투명 여백을 잘라 0.6~0.8 배로 줄인 파일 → 표시 크기는 box (= 원본 PNG 에서의 크기).
  //   camera: coverRect = 1920×1080 기준 이미지가 보이는 창 (46차: 45차의 'canvas 전체' 는 16:9 보다 넓은 viewport 에서 오른쪽 bleed·그라데이션이
  //           보이는 원인 → Main2(1919 폭)/Main5 처럼 기준 창으로 제한). focus = 그 창의 중심.
  //           cover 계산(story.js coverCamera)은 Main2/Main5 와 같음: 넓은 화면 = 폭 맞춤(위아래 잘림), 높은 화면 = 높이 맞춤(좌우 잘림, 기준 창 안에서 focus 중심).
  //   parallax: Main2/Main5 에서 쓰는 값 중에서 레이어 깊이에 맞게 고름 (far·mid·character·near 의 실제 값은 장면마다 다름).
  //   레이어 순서(아래 → 위)는 HTML 순서와 같아야 함. 정지 화면 = 기준 이미지 (합성 비교로 순서 확인)
  main3: {
    scene: { w: 1998, h: 1080 },                 // 기준 이미지 main3.png 자체가 1998×1080 canvas (레이어와 같은 좌표, offset 0)
    layers: [
      { key: 'distant', enabled: true,  depth: 'far',       box: [0, 0, 1710, 912] },     // main3-DistantView  (창밖 하늘·산)
      // RecentView: 기준 이미지에서 MiddleView 뒤에 완전히 가려짐(보이는 px 0) → 내려받지 않음 (data-src). 앞에 둘 의도라면 depth/순서만 바꾸면 됨
      { key: 'recent',  enabled: false, depth: 'character', box: [0, 989, 1714, 91] },    // main3-RecentView   (아래 책상 띠 — MiddleView 뒤)
      { key: 'middle',  enabled: true,  depth: 'character', box: [0, 0, 1998, 1080] },    // main3-MiddleView   (벽·창문·커튼 + 창가 친구들 — 장면의 기본 레이어)
      { key: 'close',   enabled: true,  depth: 'near',      box: [897, 739, 490, 341] }   // main3-CloseView    (화분·책)
    ],
    //   창(기본 1.0) 너머 하늘 0.82 → 창/하늘 비 1.22 (Main2 벽 0.82 / 하늘 0.68 = 1.21 과 같은 느낌)
    parallax: { far: 0.82, character: 1.0, near: 1.22 },
    camera: { coverRect: { x: 39, y: 0, w: 1920, h: 1080 }, focus: { x: 999, y: 540 } },   // 1920 창 = x 39–1959 (가운데)
    frame: 'character',   // 45차: 창밖 하늘(far)을 이 depth(창틀이 있는 방 레이어)와 함께 움직이는 canvas 틀 안으로 자름 → 이동 중 하늘만 장면 밖으로 떠 보이지 않음 (story.js)
    // 47차: 텍스트 등장 = Main2 와 같은 값
    text: {
      duration: 0.8, ease: 'cubic-bezier(0.33, 0, 0.2, 1)', stagger: 0.14,
      kicker: { y: 8 }, title: { y: 18 }, body: { y: 10 }, logo: { y: 8 },
      arrow: { delay: 0.1, duration: 0.6, x: -6 }
    },
    background: '#FDF8EC'
  },
  main4: {
    scene: { w: 2156, h: 1080 },                 // 1920 기준 이미지 = canvas x 118–2038
    layers: [
      { key: 'distant',   enabled: true, depth: 'far',       box: [0, 0, 2156, 1080] },     // main4-DistantView (흐린 방 배경)
      { key: 'character', enabled: true, depth: 'character', box: [312, 104, 1068, 976] },  // main4-Character   (콩이 + 말풍선)
      { key: 'close',     enabled: true, depth: 'near',      box: [533, 838, 1623, 242] }   // main4-CloseView   (앞 책상 모서리)
    ],
    parallax: { far: 0.82, character: 1.0, near: 1.22 },    // 방 배경 = Main2 벽(mid)과 같은 0.82
    camera: { coverRect: { x: 118, y: 0, w: 1920, h: 1080 }, focus: { x: 1078, y: 540 } },
    // 47차: 텍스트 등장 = Main2 와 같은 값
    text: {
      duration: 0.8, ease: 'cubic-bezier(0.33, 0, 0.2, 1)', stagger: 0.14,
      kicker: { y: 8 }, title: { y: 18 }, body: { y: 10 }, logo: { y: 8 },
      arrow: { delay: 0.1, duration: 0.6, x: -6 }
    },
    background: '#FBF4E8'
  },
  main6: {
    scene: { w: 2077, h: 1080 },                 // 1920 기준 이미지 = canvas x 78–1998
    layers: [
      { key: 'distant',   enabled: true, depth: 'far',       box: [0, 0, 2077, 1080] },     // main6-DistantView (방·바닥 전체)
      { key: 'middle',    enabled: true, depth: 'mid',       box: [0, 507, 1616, 573] },    // main6-MiddleView  (러그)
      { key: 'character', enabled: true, depth: 'character', box: [209, 193, 1022, 838] },  // main6-Character   (콩이·코끼리·곰 + 말풍선)
      { key: 'recent',    enabled: true, depth: 'near',      box: [186, 791, 833, 289] }    // main6-RecentView  (앞 책·크레파스)
    ],
    parallax: { far: 0.86, mid: 0.94, character: 1.0, near: 1.22 },   // 바닥 장면 → Main5 와 같은 값
    camera: { coverRect: { x: 78, y: 0, w: 1920, h: 1080 }, focus: { x: 1038, y: 540 } },
    // 47차: 텍스트 등장 = Main5(단계 페이지)와 같은 값
    text: {
      duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: 0.1,
      kicker: { y: 10 }, title: { y: 24 }, body: { y: 14 },
      arrow: { delay: 0.05, duration: 0.5, x: -6 }
    },
    background: '#FAF3EA'
  },
  main7: {
    scene: { w: 2210, h: 1080 },                 // 1920 기준 이미지 = canvas x 145–2065
    layers: [
      { key: 'distant',   enabled: true, depth: 'far',       box: [71, 0, 1949, 590] },     // main7-DistantView (창밖 하늘)
      { key: 'middle',    enabled: true, depth: 'mid',       box: [0, 0, 2210, 1080] },     // main7-MiddleView  (방·창문·책상·고양이)
      { key: 'character', enabled: true, depth: 'character', box: [264, 84, 582, 996] }     // main7-Character   (콩이)
    ],
    parallax: { far: 0.68, mid: 0.82, character: 1.0 },    // Main2 와 같은 값 (근경 레이어 없음)
    camera: { coverRect: { x: 145, y: 0, w: 1920, h: 1080 }, focus: { x: 1105, y: 540 } },
    frame: 'mid',   // 45차: 창밖 하늘(far)을 이 depth(창틀이 있는 방 레이어)와 함께 움직이는 canvas 틀 안으로 자름 → 이동 중 하늘만 장면 밖으로 떠 보이지 않음 (story.js)
    // 47차: 텍스트 등장 = Main5(단계 페이지)와 같은 값
    text: {
      duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: 0.1,
      kicker: { y: 10 }, title: { y: 24 }, body: { y: 14 },
      arrow: { delay: 0.05, duration: 0.5, x: -6 }
    },
    background: '#FDF2EA'
  },
  main8: {
    scene: { w: 2246, h: 1080 },                 // 1920 기준 이미지 = canvas x 163–2083
    layers: [
      // DistantView 만 1920×1080 canvas 로 출력됨 (다른 레이어는 2246) → 기준 이미지 좌표 그대로 = scene x +163
      { key: 'distant',   enabled: true, depth: 'far',       box: [163, 0, 1815, 574] },    // main8-DistantView (창밖 하늘)
      { key: 'middle',    enabled: true, depth: 'mid',       box: [0, 0, 2246, 1080] },     // Main8-MiddleView  (방·침대·창문)
      { key: 'character', enabled: true, depth: 'character', box: [312, 144, 1052, 936] },  // main8-Character   (콩이 + 곰)
      { key: 'close',     enabled: true, depth: 'near',      box: [202, 769, 2044, 311] }   // main8-CloseView   (앞 책상·컵·연필꽂이)
    ],
    parallax: { far: 0.68, mid: 0.82, character: 1.0, near: 1.22 },   // Main2 와 같은 값
    camera: { coverRect: { x: 163, y: 0, w: 1920, h: 1080 }, focus: { x: 1123, y: 540 } },
    frame: 'mid',   // 45차: 창밖 하늘(far)을 이 depth(창틀이 있는 방 레이어)와 함께 움직이는 canvas 틀 안으로 자름 → 이동 중 하늘만 장면 밖으로 떠 보이지 않음 (story.js)
    // 47차: 텍스트 등장 = Main5(단계 페이지)와 같은 값
    text: {
      duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: 0.1,
      kicker: { y: 10 }, title: { y: 24 }, body: { y: 14 },
      arrow: { delay: 0.05, duration: 0.5, x: -6 }
    },
    background: '#FBF4E8'
  },
  main9: {
    // 레이어가 1808×941 canvas 로 출력됨. 기준 이미지 = canvas × 1.14772(1080/941) 의 x 155–2075 (오른쪽 끝 맞춤)
    //   → scene 좌표는 원래 canvas 그대로 두고 camera 가 배율을 맞춤 (coverRect 높이 941 → 1080 화면에서 s = 1.1477)
    scene: { w: 1808, h: 941 },
    layers: [
      { key: 'distant', enabled: true, depth: 'far',       box: [188, 0, 1326, 562] },    // main9-DistantView (창밖 하늘)
      { key: 'middle',  enabled: true, depth: 'mid',       box: [0, 0, 1808, 941] },      // main9-MiddleView  (방·책장·창문)
      { key: 'close',   enabled: true, depth: 'character', box: [291, 556, 577, 385] },   // main9-CloseView   (의자·담요 — 캐릭터 없는 장면의 기본 레이어)
      { key: 'recent',  enabled: true, depth: 'near',      box: [0, 593, 1808, 348] }     // main9-RecentView  (앞 책상·노트·연필꽂이)
    ],
    parallax: { far: 0.68, mid: 0.82, character: 1.0, near: 1.22 },   // Main2 와 같은 값
    camera: { coverRect: { x: 135.05, y: 0, w: 1672.95, h: 941 }, focus: { x: 971.5, y: 470.5 } },   // 1920 창 = canvas x 135.05–1808 (= 기준 1920×1080 ÷ 1.14772)
    frame: 'mid',   // 45차: 창밖 하늘(far)을 이 depth(창틀이 있는 방 레이어)와 함께 움직이는 canvas 틀 안으로 자름 → 이동 중 하늘만 장면 밖으로 떠 보이지 않음 (story.js)
    // 47차: 텍스트 등장 = Main2 와 같은 값
    text: {
      duration: 0.8, ease: 'cubic-bezier(0.33, 0, 0.2, 1)', stagger: 0.14,
      kicker: { y: 8 }, title: { y: 18 }, body: { y: 10 }, logo: { y: 8 },
      arrow: { delay: 0.1, duration: 0.6, x: -6 }
    },
    background: '#FAF1E6'
  },

  // ---- STORY 가로 이동 (Main2 → Main3 → Main4 → Main5 → Main6 → … → Main9, 45차) ----
  //   24차: 장면을 화면 크기로 자르지 않는다. 하나의 긴 world 위에 Main2 · (연결 구간) · Main5 가 놓이고
  //   카메라(cam)가 가로로 이동한다. 자르는 곳은 가장 바깥 STORY viewport(#story) 하나뿐.
  story: {
    panels: ['story-1', 'story-3', 'story-4', 'story-5', 'story-6', 'story-7', 'story-8', 'story-9'],   // world 순서 (왼쪽 → 오른쪽). 'story-N' = MainN (예외: 'story-1' = Main2)
    // 45차: panel id → 장면 config 이름 (CURO_CONFIG[이름]). Main10(책 덮임)은 별도 연출 — 아직 없음
    scenes: { 'story-1': 'main2', 'story-3': 'main3', 'story-4': 'main4', 'story-5': 'main5', 'story-6': 'main6', 'story-7': 'main7', 'story-8': 'main8', 'story-9': 'main9' },
    // 45차: 이미지 준비 범위 (현재 장면 index 기준). load = 이 범위 안 장면만 이미지를 내려받음(data-src → src), decode = img.decode() 로 미리 풀어 둠.
    //   'story-1'(Main2)은 책 열기에서 바로 보이므로 HTML 에서 처음부터 src
    preload: { load: 2, decode: 1 },
    // 25차: 1.5s power2.inOut → 2.0s sine.inOut. sine 은 가운데 최고 속도가 평균의 1.57배(power2 는 2배)라 덜 휙 지나감.
    //   원경 plane 이동 거리(화면 폭 + gap)는 그대로라 원경 체감 속도 약 −35%, 캐릭터 plane 은 원경 배율이 낮아진 만큼 거리가 늘어 약 −10%
    slide: { duration: 2.0, ease: 'sine.inOut' },
    // depth parallax: 모든 레이어가 cam 하나를 공유. 레이어 화면 위치 = (장면 위치 − cam) × 배율(scene.parallax[depth]).
    //   장면에 정착했을 때(장면 위치 = cam)는 모든 레이어 offset 0 → reference 그대로. Y축·scale 변화 없음
    parallax: true,
    // 장면 사이 연결 구간 (41차: 별도 레이어·이미지·mask 없음 — 빈 공간에는 #story 배경 단색만 보임)
    //   키 = '앞 장면|다음 장면' (panels 의 이웃한 두 id). Main3·4 를 넣으면 'story-1|story-3', 'story-3|story-4' … 처럼 구간마다 추가
    //   gap        : 원경 plane 에서 앞 장면 화면 오른쪽 끝 ~ 다음 장면 화면 왼쪽 끝 사이 폭 (1080 높이 기준 px, 화면 높이에 비례).
    //                장면 간 cam 이동 거리 = (화면 폭 + gap) ÷ 원경 배율 → 바꾸면 이동 거리·속도감이 바뀜 (지금 값 320 유지)
    //   background : 그 구간에서 보이는 빈 공간 색. 이동 중 화면 가운데에 가장 가까운 구간의 색이 쓰인다
    gapBackground: '#FCF7ED',                    // 구간에 background 를 안 적었을 때 쓰는 색
    transitions: {
      // 45차: background = 두 장면의 맞닿는 가장자리(canvas 끝 40px) 색 중앙값의 평균.
      //   gap = 다음 두 값 중 큰 값 (10 단위 올림, tools/story_scenes_45.md · tools/gap_sim_45.js):
      //     ① 정지 화면에 이웃 장면 bleed 가 들어오지 않는 최소값 (16:9 · 16:10 · 21:9 에서) + 20
      //     ② 이동 중간(50%)에 보이는 빈 띠 폭이 예전 Main2→Main5(gap 320) 와 같은 값 (1920×1080 에서 약 26px), 0 미만이면 0
      //   (frame 으로 하늘을 자른 장면은 하늘 대신 canvas 틀 기준으로 계산)
      'story-1|story-3': { gap: 60, background: '#FEF9ED' },    // Main2 → Main3  (#FEF9ED | #FDF8EC)
      'story-3|story-4': { gap: 240, background: '#FEF9EF' },    // Main3 → Main4  (#FEF9EE | #FBF4E8)
      'story-4|story-5': { gap: 540, background: '#FCF7EB' },    // Main4 → Main5  (#FCF5EA | #E7DDD1  Main5 왼쪽 끝은 조금 어두운 바닥)
      'story-5|story-6': { gap: 340, background: '#FDF6ED' },    // Main5 → Main6  (#FDF5EA | #FAF3EA)
      'story-6|story-7': { gap: 150, background: '#FEF3EE' },    // Main6 → Main7  (#FCF2EC | #FDF2EA)
      'story-7|story-8': { gap: 0, background: '#FDF6EB' },    // Main7 → Main8  (#FDF2EC | #FBF4E8)
      'story-8|story-9': { gap: 0, background: '#FCF5EA' }     // Main8 → Main9  (#FBF4E8 | #FAF1E6)
      // (41~44차의 'story-1|story-5' {gap 320, #FCF7ED} 는 Main2·Main5 가 더 이상 이웃이 아니라 삭제)
    },
    // 텍스트 (28차): 장면 이동이 완전히 끝난 뒤(이동 완료 이벤트) 등장. 이동 중 progress 로 미리 시작하지 않음 (26·27차 startAt 방식 취소)
    //   afterMove = STORY 장면끼리 이동 완료 후 쉬는 시간 (0 = 멈추자마자), pause = 책 열기로 도착했을 때 쉬는 시간, fadeOut = 이동 시작 시 사라지는 시간 (s)
    text: {
      afterMove: 0, pause: 0.25, fadeOut: 0.25,
      // 30차: 화면 비율이 16:9 가 아닐 때 텍스트 위치. 글자 크기는 contain(min) 유지, 위치는 그림(cover)을 따라감
      //   follow 1 = 그림의 anchor 지점에 붙음 / 0 = 예전처럼 화면 가운데 정렬.  anchor = 디자인 px (1920×1080)
      //   margin = 화면 가장자리와 텍스트 사이 최소 여백 (디자인 px, contain 배율 적용). 1920×1080 에서는 결과 동일
      layout: { follow: 1, anchor: { x: 1540, y: 500 }, margin: 60 }
    }
  },

  // ---- 페이지 이동 (wheel / 키 / swipe) ----
  //   아래 = 다음 페이지, 위 = 이전 페이지. scroll 은 trigger 일 뿐 (progress 연결 없음).
  //   pages 순서대로 이동하며, 전환 중에는 입력을 무시한다. 다음 페이지가 아직 없으면 아무 일도 없음.
  // ---- Main10 (119차): 책 뒤표지 + 'CURO 를 더 만나볼까요?' + 푸터. Main9 에서 아래로 = 책이 닫히며 등장, Main10 맨 위에서 위로 = 책을 열고 Main9 로 ----
  //   좌표 = main10-BG.webp (1920×2160) 기준 px. 캐릭터·뒤표지 위치는 사용자 기준.png 와 맞춘 값 (차이 1.3/255)
  main10: {
    scene: { w: 1920, h: 2160 },
    screenH: 1080,                         // 한 화면(위 절반) 높이 — 화면 비율이 달라도 위 절반은 cover 로 채움
    focusY: 559,                           // 첫 화면: 세로로 잘릴 때 이 y 가 화면 가운데 (Main1 과 같은 값)
    character: [438, 265, 1100, 700],      // main10-Character.webp (양옆 친구들 + 책등·윗면)
    cover: [716, 442, 472, 493],           // main10-BackCover.webp (뒤표지 한 장, 오른쪽 변 = 책등 쪽 hinge)
    book: { x: 718, y: 452, w: 468, h: 478 },   // 뒤표지 불투명 사각형. hinge = 오른쪽 변 (x 1186)
    page: { paddingX: 20, paddingY: 20, radius: 8 },   // 표지가 열리면 보이는 안쪽 종이 + Main9 창 여백 (Main1 bookInterior 와 같은 값)
    paper: '#FBF5EA',
    tuckX: 4,                              // 127차: 14 는 책등과 표지 사이 틈이 보여 4 로 (열린 표지가 책등에 딱 붙음)
    scrollDuration: 0.9                    // 첫 화면 ⇄ 둘째 화면 ⇄ 푸터 이동 시간 (초)
  },

  pages: {
    order: ['main', 'story-1', 'story-3', 'story-4', 'story-5', 'story-6', 'story-7', 'story-8', 'story-9', 'main10'],   // 'main' = MAIN(책 표지), 'story-1' = Main2, 'story-N' = MainN, 'main10' = 책 뒤표지(119차, Index3 만)
    wheelThreshold: 40,           // wheel deltaY 누적이 이 값을 넘으면 이동
    wheelWindowMs: 400,           // 누적 초기화 시간
    cooldownMs: 700,              // 전환이 끝난 뒤 trackpad 관성 scroll 로 한 번 더 넘어가지 않도록 잠시 무시
    touchThreshold: 40,           // swipe (px)
    keysNext: ['ArrowDown', 'PageDown', ' '],
    keysPrev: ['ArrowUp', 'PageUp']
  },

  // ---- 책 열기 / 닫기 (MAIN ⇄ Main2) ----
  //   17차: 표지가 왼쪽 hinge 기준으로 커지는 것(grow)·넘어가는 것(flip)·Main1 → Main2 전환(spread)이 동시에 진행.
  //   표지에 가려진 부분부터 바뀌기 시작해 화면 끝까지 퍼지고, 표지가 다 넘어가면 이미 다음 화면. 닫기(위로 scroll)는 같은 timeline 을 되감는다.
  //   camera zoom 없음 · preview 없음 · 울렁임/노이즈/그림자 없음.
  bookOpen: {
    //   16차: 확대 · 넘기기 · 화면 전환이 모두 0초에 함께 시작한다 (확대 → 넘기기 순서 없음, hold 없음).
    cover: {
      // grow : 표지가 왼쪽 hinge 를 기준으로 커진다 (17차: 화면 중앙으로 오지 않음 — reference 처럼 왼쪽으로 넘어가며 빠짐)
      grow: { start: 0, duration: 0.55, ease: 'power2.out' },   // 20차: 0.7 → 0.55 (전체 약 20% 빠르게)
      scale: 2.2,               // 다 커졌을 때 배율 (원래 표지 × scale). 1920×1080 에서 500 → 1100px
                                //   넘어가며 기울어지므로 실제로 보이는 폭은 이보다 작다. 15차 1.6 → 16차 2.2
      // slide : 넘어가는 동안 hinge(표지 왼쪽 변)가 화면 왼쪽 밖으로 빠져나간다 (reference: 책이 카메라 쪽으로 오며 왼쪽으로 지나감)
      slide: { start: 0, duration: 0.6, ease: 'sine.inOut' },    // 18차: 왼쪽 끝이 화면 밖에 닿도록. 20차 0.65 → 0.6
      hinge: {
        exitX: -0.12,           // 18차 −0.05 → −0.12. slide 끝에서 hinge 의 화면 x (viewport 폭 비율, 0 = 왼쪽 끝, 음수 = 화면 밖)
        centerY: 1              // hinge 세로 위치를 화면 중앙 쪽으로 옮기는 비율 (0 = 제자리, 1 = 화면 세로 중앙) — grow 에 연동
      },
      // flip : 처음부터 넘어가기 시작. 20차: power2.in(3제곱, 거의 정면인 채로 사라짐) → power1.in(2제곱) 으로 바꿔
      //        일찍부터 눈에 띄게 기울어진 채 넘어간다. 1.0 → 0.8s
      flip: { start: 0, duration: 0.8, ease: 'power1.in', angle: -180 },
      tilt: -20,                // 21차: 커지는 동안(grow 진행률) 먼저 이만큼 기울어진다 → 처음부터 열리는 느낌. flip 은 나머지 각도(−160°)를 담당
      perspective: 1.0,         // 20차 1.4 → 1.0 (기울어짐이 더 사다리꼴로 보이게). perspective = viewport 높이 × 이 값. 작을수록 넘어가는 표지가 관객 쪽으로 크게 스윙하며 왼쪽으로 빠진다.
                                //   표지 폭 × scale(책 좌표 1100) 이 카메라 평면(perspective)을 넘으면 표지가 통째로 사라지므로 약 1 이상 유지 (넘어가는 표지는 약 50° 전후에 옆면이 되어 사라지므로 1.0 까지 안전)
      back: 'none'              // 뒷면: 'none' / 'paper'
    },
    reveal: {
      // 표지에 가려진 영역부터 Main1 → Main2 로 바뀌고, 표지가 넘어가는 것과 동시에 화면 끝까지 퍼진다 (spread)
      // 19차: 조금 느리게 (0.85 → 1.5s, 화면이 다 바뀌는 시점 약 0.8s → 1.1s), 모양은 reference 처럼 불규칙한 구름 모양 (blobs)
      spread: { start: 0, duration: 1.2, ease: 'sine.inOut' },   // 20차 1.5 → 1.2
      coverage: 0.95,           // 기준 반경 R 의 시작값 = 표지 반폭(화면 기준) × coverage
      feather: 220,             // 경계 부드러움 (scene px × MAIN scale). 19차 140 → 220 (reference 처럼 뿌옇게)
      // blobs: 구멍을 이루는 타원들. x, y = 중심 offset, rx, ry = 반지름 — 모두 기준 반경 R 에 대한 비율.
      //   첫 번째(중심) 타원이 끝에서 화면 전체를 덮도록 R 이 계산된다. 나머지가 가장자리를 울퉁불퉁하게 만든다.
      blobs: [
        { x:  0.00, y:  0.00, rx: 1.00, ry: 0.85 },
        { x:  0.70, y: -0.22, rx: 0.60, ry: 0.50 },
        { x: -0.75, y:  0.18, rx: 0.62, ry: 0.48 },
        { x:  0.35, y:  0.48, rx: 0.55, ry: 0.45 },
        { x: -0.30, y: -0.52, rx: 0.50, ry: 0.42 },
        { x:  1.00, y:  0.38, rx: 0.40, ry: 0.34 },
        { x: -1.05, y: -0.32, rx: 0.42, ry: 0.36 }
      ],
      twist: 0.5,               // 퍼지는 동안 blob 배치가 도는 양 (rad) → 모양이 조금씩 변함
      pulse: 0.12,              // 바깥 blob 크기가 출렁이는 양 (비율). 0 이면 고정
      gather: 0.35              // 처음에는 바깥 blob 이 표지 밑에 모여 있다가 spread 진행률 0 → gather 동안 제자리로 벌어진다
    },
    uiExit: {
      start: 0,
      duration: 0.3,
      ease: 'power2.in',
      y: -30                    // 로고·CLICK TO OPEN 이 위로 빠지는 양 (scene px). hamburger 는 그대로 유지
    },
    reducedMotionTimeScale: 3   // prefers-reduced-motion 이면 이 배율로 빠르게 재생
  },

  // viewport 기준 UI (1920×1080 viewport 에서의 px → uiScale 로 비례)
  ui: {
    scaleMin: 0.6,
    scaleMax: 1.5,
    // hamburger / X (8차): 하나의 정사각형 아이콘 영역을 공유. 모든 값 × uiScale, 정수 px 스냅, stroke 는 2px 고정.
    //   size: 기존 hamburger 폭 48 과 높이 34 의 중간 = 41 → 짝수 스냅으로 1920×1080 에서 42×42.
    //   중심은 7차 hamburger 중심(오른쪽에서 87.15, 위에서 74.65)과 동일.
    hamburger: {
      size: 41,            // 194차: 예전 자리·모양으로 되돌리고 크기만 살짝 줄임 (59 → 51)
      scale: 1.12,         // 224차: 1.25 → 1.12 (51 → 약 46px)         // 아이콘 전체 배율 (중심 기준). 9차 1.2 → 10차 테스트 ×1.2 = 1.44 → 41 × 1.44 = 59.0
                           //   1920×1080 에서 59×59 (stroke 3 은 홀수라 박스도 홀수로 스냅 → 선이 정수 px 에 놓임). 되돌리기: scale 1.2, stroke 2

      centerRight: 87.15,  // 193차: 다시 오른쪽 끝 쪽으로 (192차 295 = 메뉴 선은 너무 안쪽)
      centerTop: 74.65,    // 194차: 예전 자리 그대로
      stroke: 3,           // 선 두께 (px, 고정). 10차 테스트: 2 → 3
      lineLength: 1,       // hamburger 선 길이 = size × lineLength (3개 동일, 가로 중앙)
      lineGap: 0.34,       // 선 중심 간 간격 = size × lineGap → 59 기준 20px (hamburger 59×43)
      xAngle: 45,
      xExtent: 0.86        // X bbox(둥근 끝 포함) = size × xExtent → 59 기준 약 51×51 (정사각형 안). 1 이면 박스를 꽉 채움
    },
    menu: {
      panelWidth: 503,       // 메뉴 목업 측정값 (1279px 목업 × 1.5012)
      fontSize: 40,          // Figma: Pretendard Bold 40, 자간 0%, left align
      groupWidth: 267,       // Figma: menu group width
      groupOffsetX: -30,     // 패널 중앙 기준 group 가로 이동 (음수 = 왼쪽). 20/25/30/37 비교 → 30 (§24-3)
      itemPitch: 118,        // 항목 중심 간격 (목업 78.6px × 1.5012)
      iconSize: 72,          // ⚠ reference 에 hover icon 이 없음 → 임시값 (시각 조정 필요)
      iconGap: 12            // 각 메뉴 텍스트 오른쪽 끝 ↔ 아이콘 박스 왼쪽 끝 (× ui). 12/14/16 비교 → 12 (§24-2)
    }
  },

  debug: {
    // Main1.png reference 는 레이어 대비 scale 1.00935, translate(+0.02, −3.86).
    // overlay 는 역변환해서 scene 좌표에 겹친다: layer = (ref − t) / s
    // 31차: 새 책 기준 reference = 웹/메인/KakaoTalk_20260917_135834365_02.png (2076×1080, 레이어와 같은 캔버스 → 변환 없음)
    main1Ref: { src: 'assets/images/_reference/Main1-v31.png', s: 1, tx: 0, ty: 0 },
    main1RefOld: { src: 'assets/images/_reference/Main1.png', s: 1.00935, tx: 0.02, ty: -3.86 },
    menuMockup: { src: 'assets/images/_reference/Menu-open-mockup.png' }
  }
};
