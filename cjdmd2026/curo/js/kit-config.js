/* ==========================================================================
   CURO KIT 페이지 설정 (49차, 50차 수정)
   - 좌표 = 1920×1080 디자인 px (시안 product*.png 와 같은 좌표). 화면에서는 kit.js 가 배율을 곱한다.
   - 시간 = 초(s). 수정하기 쉽게 한곳에 모음.
   ========================================================================== */
window.CURO_KIT = {

  // ---- 1 → 2 → 3 세로 full-page snap, 4 = 일반 스크롤 ----
  snap: {
    duration: 0.9,                 // 한 섹션 이동 시간
    ease: 'cubic-bezier(0.65, 0, 0.35, 1)',   // ease-in-out (kit.js 가 같은 곡선으로 scroll 보간)
    wheelThreshold: 40,            // wheel deltaY 누적이 이 값을 넘으면 이동 (STORY pages.js 와 같은 값)
    wheelWindowMs: 400,            // 누적 초기화 시간
    cooldownMs: 650,               // 이동이 끝난 뒤 trackpad 관성으로 한 번 더 넘어가지 않도록 무시하는 시간
    touchThreshold: 40,            // swipe (px)
    settleMs: 160                  // scrollbar 드래그 등으로 snap 구간 중간에 멈췄을 때 가까운 섹션으로 맞추기까지 대기
  },

  // ---- 화면 배율 (50차) ----
  //   1~3 : 섹션마다 '실제 콘텐츠 세로 범위'(fit, 디자인 px)가 화면 높이에 들어오도록 배율을 정한다.
  //         배율 = min(vw/1920, (vh − 2·fitPad) / (bottom − top)). 세로 위치는 1080 frame 가운데 정렬을 기본으로,
  //         콘텐츠 범위가 화면(위·아래 fitPad)을 벗어날 때만 필요한 만큼 옮긴다.
  //         → 브라우저 상단 UI 로 높이가 줄어든 일반 창(예: 1920×945)에서도 F11(1920×1080)과 같은 1배로 보임.
  //           범위 밖(위·아래 흰 여백, 배경 원의 끝)만 화면 밖으로 잘린다. 좌우 구성 비율은 그대로.
  //   4   : 폭 기준 (vw/1920), 최대 maxScale4 배
  layout: {
    maxScale4: 1,
    fitPad: 24,                    // 콘텐츠 범위 위·아래 최소 여백 (화면 px)
    fit: {                         // [top, bottom] 디자인 px
      k1: [170, 1020],             // 제목 위 ~ 페이지 점 아래 (배경 원 위쪽 끝은 잘릴 수 있음)
      k2: [88, 962],               // 전개된 부품 맨 위(뚜껑 93) ~ A~H 목록·크기 정보 아래
      k3: [120, 960]               // 사진 위 ~ 사진·원 아래
    }
  },

  // ---- KIT 전용 아이콘 파일 (사용자 export) ----
  //   (위로 가기 · 상담 아이콘과 floating 배율은 공통 js/float.js 의 CFG 에서 지정)
  // ---- 80차: 제품 5종 (0번 'CURO 키트 안에 무엇이 들어있을까?' + 1번 제품 슬라이드) ----
  //   순서 = 1번 페이지 점 순서 (피그마 '프로덕트 레이아웃'). detail: true = 아래 2~4번 상세가 있는 제품(지금은 벨트만)
  //   box  = 1번에서 원 중심 기준 제품 상자 [left, top, width, height] (디자인 px, 그림은 상자 안에 비율 유지)
  //   peek = 이 제품이 '다음 제품'으로 오른쪽 끝에 보일 때 지름 300 원 안 상자 [left, top, width, height]
  //   k0   = 0번 장면: 상자 [x, y, w, h] (피그마 1920×1080), spot = 동그라미 중심 [x, y], ill/real = 평소(동화풍)/hover(실물)
  //   cy/qy/ay = 피그마에서 이 제품 화면만 다른 원 중심 y / 다음 제품 원 중심 y / 화살표 y 차이 (없으면 520.5 / 556 / 0)
  //   color = 1번 원 색 (81차: 피그마 화면에서 확인)
  //   1번 이미지: 동화책 표지·벨트 = 81차 피그마 화면에서 잘라낸 임시 (원본 파일 받으면 교체)
  products: [
    { id: 'book', name: '동화책', detail: true, cy: 539.5, qy: 570, ay: 14,
      title: '콩이와 큐로 가디언즈<br>동화책 단행본', body: '콩이와 가디언즈의 모험을 따라가며,<br>낯설고 두려운 주사와 자연스럽게 친해져요.', label: '기본 제공품', price: '',
      img: 'assets/images/kit/products/book-mockup.webp?v=332', color: '#B8DCD3', box: [-222.5, -153.5, 446, 462], peek: [62, 59, 175, 182],
      k0: { box: [290, 231, 688, 568], spot: [562, 495], z: 2, ill: 'assets/images/kit/products/book-illust.webp?v=332', real: 'assets/images/kit/products/book-real.webp?v=332' } },
    { id: 'doll', name: '주사 연습 인형', detail: true, cy: 539.5,
      title: '큐로 가디언즈<br>주사 연습 인형', body: '귀여운 인형으로 재미있고 안전하게,<br>아이에게 맞춘 최적의 주사 연습을 제공합니다.', label: '기본 제공품', price: '',
      img: 'assets/images/kit/products/doll-real.webp?v=80', color: '#F8E9D5', box: [-242.5, -210.5, 485, 524], peek: [54, 46, 193, 208],
      k0: { box: [762, 199, 384, 389], spot: [957, 423], z: 1, ill: 'assets/images/kit/products/doll-illust.webp?v=80', real: 'assets/images/kit/products/doll-real.webp?v=80' } },
    { id: 'belt', name: '주사 연습 벨트', detail: true,
      title: '큐로 가디언즈<br>주사 연습 벨트', body: '주사 위치와 유지 시간을 연습하고,<br>실시간 피드백으로 올바른 주사 습관을 익혀요.', label: '기본 제공품', price: '',
      img: 'assets/images/kit/products/belt-layout.webp?v=81', color: '#F6F0E6', box: [-384.5, -136.5, 643, 350], peek: [39.7, 98.1, 238.6, 129.9],
      k0: { box: [1022, 466, 632, 330], spot: [1293, 653], z: 3, ill: 'assets/images/kit/products/belt-illust.webp?v=80', real: 'assets/images/kit/products/belt-real.webp?v=80' } },
    { id: 'cap', name: '주사 보조 캡', detail: true,
      title: '큐로 가디언즈<br>주사 보조 캡', body: '주사 바늘을 가려 두려움을 덜어주고,<br>편안한 그립으로 주사 연습을 도와줘요.', label: '기본 제공품', price: '',
      img: 'assets/images/kit/products/cap-layout.webp?v=80', color: '#FFF5E5', box: [-343.5, -196.5, 536, 549], peek: [46.9, 44.4, 205.9, 210.7],
      k0: { box: [1070, 817, 400, 124], spot: [1285, 871], z: 4, ill: 'assets/images/kit/products/cap-illust.webp?v=80', real: 'assets/images/kit/products/cap-real.webp?v=80' } },
    { id: 'assist', name: '주사 각도 가이드', detail: true,
      title: '큐로 어시스트<br>주사 각도 가이드', body: '주사기를 90도로 고정해 흔들림을 줄이고,<br>올바른 각도로 주사할 수 있도록 도와줘요.', label: '별도 구매 상품', price: '12,000원',
      img: 'assets/images/kit/products/assist-real.webp?v=80', color: '#C3DDE5', box: [-229.5, -73.5, 459, 381], peek: [61, 76, 179, 149],
      k0: { box: [812, 756, 182, 154], spot: [903, 836], z: 4, ill: 'assets/images/kit/products/assist-illust.webp?v=80', real: 'assets/images/kit/products/assist-real.webp?v=80' } }
  ],
  // 89차: 0번 배경을 더 넓은 그림(백그라운드.webp 1920×1080, 예전 배경을 0.87배로 줄여 (126, 70)에 놓은 것과 같음)으로 바꿈.
  //   products[].k0 의 box/spot 은 피그마(예전 배경) 좌표 그대로 두고, 이 값으로 새 배경 좌표로 옮김 → 배경에 그려진 그림자와 맞음
  k0map: { scale: 0.87, x: 126, y: 70 },
  startProduct: 'belt',            // 0번을 거치지 않고 1번에 처음 왔을 때 보이는 제품

  icons: {
    check: 'assets/icons/check-box.svg',           // 4번 체크 목록
    prev: 'assets/icons/left-arrow.svg',           // 3번 마우스 따라다니는 PREV
    next: 'assets/icons/right-arrow.svg'           // 3번 마우스 따라다니는 NEXT
  },

  // ---- 3번 제품 특징 #01~#03 (63차) ----
  //   세 장 모두 같은 레이아웃. 바뀌는 것 = 번호·제목·설명·(사진). 썸네일 3개는 보기용 이미지(전환 버튼 아님, 64차)
  //   title/body 는 HTML (<span class="k-hl"> = 민트 강조, <br> = 줄바꿈)
  //   162차: k3 제목 윗줄 = <span class="k3-title-s"> (작은 글씨), 아랫줄 제품 이름을 민트로 강조
  //   photo 를 바꾸면 사진도 crossfade (지금은 세 장 모두 같은 패드 사진 — 시안과 같음)
  k3: {
    slides: [
      { num: '#01', title: '<span class="k3-title-s">부드러운 촉감으로 구현한,</span><br><span class="k-hl">실리콘 연습 패드</span>',
        body: '부드러운 실리콘 소재를 적용해 실제 사용 상황에<br>가까운 촉감으로 반복해서 연습할 수 있도록 제작했어요.',
        // 235차: 사용자 이미지 (웹/프로덕트/3/벨트 벨트1 → pad-main, 1327×1185). 손은 베이지 띠의 둥근 왼쪽 끝 밖으로 안 나오게 mask
        //   mask = 띠 왼쪽 반원(중심 = 틀 392.5, 472 · 반지름 315) + 사진 왼쪽에서 270su 오른쪽 전부 (벨트 위·아래로 튀어나온 부분은 그대로)
        photo: 'assets/images/kit/pad/pad-main.webp?v=235', alt: '손가락으로 실리콘 패드를 누르는 모습', box: [30, -35, 969, 865],
        mask: 'radial-gradient(circle calc(315 * var(--su)) at calc(362.5 * var(--su)) calc(507 * var(--su)), #000 calc(315 * var(--su) - 1px), transparent calc(315 * var(--su))), linear-gradient(#000, #000) calc(270 * var(--su)) 0 / 100% 100% no-repeat' },
      { num: '#02', title: '<span class="k3-title-s">착용과 조절이 간편한,</span><br>탈착형 <span class="k-hl">벨트 스트랩</span>',
        body: '버클과 길이 조절이 가능한 스트랩을 적용해<br>아이의 체형에 맞춰 편안하게 착용할 수 있도록 제작했어요.',
        // 148차: 사용자 이미지 (웹/프로덕트/4/벨트 벨트2 → strap-main, 벨트2-1~3 → strap-thumb-1~3)
        //   box = 사진 위치 [x, y, w, h] (오른쪽 사진 틀 997×788 기준 su) — 시안처럼 베이지 띠 왼쪽 위로 벨트가 튀어나옴
        photo: 'assets/images/kit/strap/strap-main.webp?v=148', alt: '버클로 연결된 탈착형 벨트 스트랩', box: [-108, 112, 1105, 652],
        thumbs: [['assets/images/kit/strap/strap-thumb-1.webp?v=148', '스트랩 고정 고리'], ['assets/images/kit/strap/strap-thumb-2.webp?v=148', '길이 조절 버클'], ['assets/images/kit/strap/strap-thumb-3.webp?v=148', '버클을 채운 모습']] },
      { num: '#03', title: '<span class="k3-title-s">편안한 착용감을 더하는,</span><br><span class="k-hl">3D 에어메쉬</span> 쿠션',
        body: '몸에 닿는 안쪽에는 3D 에어메쉬와 쿠션 소재를 적용해<br>반복해서 연습할 때도 편안하게 착용할 수 있도록 제작했어요.',
        // 152차: 사용자 이미지 (웹/프로덕트/4/벨트 벨트3 → cushion-main, 벨트 3-1~3 → cushion-thumb-1~3)
        photo: 'assets/images/kit/cushion/cushion-main.webp?v=152', alt: '3D 에어메쉬 쿠션을 댄 벨트 안쪽', box: [186, 105, 880, 823], clipBottom: 682,   /* 252차: 88% 로 줄임 · 253차: 45 위로 (아래 잘림 = 띠 아래 끝 그대로) */   // 시안처럼 베이지 띠 아래 끝(틀 y 787)에서 잘림 = 사진 위에서 683su
        thumbs: [['assets/images/kit/cushion/cushion-thumb-1.webp?v=152', '3D 에어메쉬 짜임'], ['assets/images/kit/cushion/cushion-thumb-2.webp?v=152', '손가락으로 누른 쿠션'], ['assets/images/kit/cushion/cushion-thumb-3.webp?v=152', '쿠션 옆모습']] }
    ],
    outDuration: 0.22,             // 글 사라짐 (s)
    inDuration: 0.42,              // 글 나타남 (s)
    // 마우스 따라다니는 PREV/NEXT 원 (화면 왼쪽 절반 = PREV, 오른쪽 절반 = NEXT)
    cursor: {
      follow: 0.16,                // 따라오는 정도 (0~1, 60fps 한 프레임 기준. 클수록 빠르게 붙음)
      hideOn: 'a, button, input, textarea, select, .k-float, .k-chat',   // 이 위에서는 숨김(일반 커서)
      dimOn: '.k3-col'             // 글·썸네일 위: 숨기지 않고 투명하게 (클릭하면 그대로 이동)
    }
  },

  // ---- 2번 '안전한 설계' 전개 애니메이션 ----
  explode: {
    startDelay: 0.25,              // 섹션 2 정착 후 기다리는 시간
    fadeDuration: 0.7,             // 완성 외형(Show first) fade-out + 내부 부품 reveal
    fadeEase: 'cubic-bezier(0.45, 0, 0.55, 1)',
    holdDuration: 0.35,            // 내부 구조가 보이는 상태 유지
    moveDuration: 1.3,             // 각 부품이 조립 위치 → 전개 위치로 이동
    moveEase: 'cubic-bezier(0.65, 0, 0.35, 1)',
    moveStagger: 0.04,             // 부품별 시작 간격 (앞쪽 부품부터)
    revealOpacity: {               // reveal 단계(내부 구조가 비쳐 보이는 상태)의 부품 투명도. 없으면 1
      'b-sensor-case': 0.5,          // 251차: 케이스가 실리콘 바로 뒤에서 안쪽 보드·센서를 덮으므로 비쳐 보이게
      'a-injection-silicone': 0.6,   // 247차: 0.35 → 0.6 (겉 실리콘이 앞에서 안쪽 부품을 살짝 덮게 — 사용자 시안)
      'h-air-mesh-cushion': 0,     // 조립 상태에서는 뒤판 뒤에 가려진 부품 → 이동하면서 나타남
      'g-mounting-screw': 0
    },
    dimOpacity: 0.2,               // A~H 강조 시 나머지 부품 투명도 (0.15~0.25 테스트 범위)
    textDimOpacity: 0.35,          // A~H 강조 시 나머지 목록 글자 투명도 (선택 항목은 기본 색·두께 그대로)
    dimDuration: 0.25,
    resetOn: ['k1']                // 이 섹션에 도착하면 전개 상태를 초기화 → 2번 재진입 시 처음부터 다시
  },

  // ---- 2번 부품 설명 콜아웃 (60차) — 부품에 hover(또는 A~H 목록 hover) 하면 그 부품 근처에 나타남 ----
  //   box = 이름 상자 왼쪽 위 (디자인 px, 분해도와 같은 좌표), w = 상자 폭(기본 271)
  //   line = 연결선 [상자 쪽 시작점, …꺾는 점, 부품 위 끝 점(작은 원)]
  //   설명 문구는 상자 아래, 상자 폭 안에서 자동 줄바꿈(단어 단위, 줄 길이 균형)
  // 250차: 모든 제품 콜아웃 끝 점이 부품 선 위에 오도록 좌표 검토·수정 (투명 영역에 떠 있던 것)
  callouts: {
    A: { name: '주사 부위 실리콘', desc: '아이가 주사 위치를 확인하고 안전하게 주사 연습을 할 수 있도록 돕는 실리콘 패드',
         box: [640, 852], line: [[640, 884], [612, 884], [590, 870]] },
    B: { name: '센서 고정 케이스', desc: '내부 센서를 정해진 위치에 안정적으로 고정하고 보호하는 구조물',
         box: [640, 852], line: [[760, 852], [760, 819]] },
    C: { name: '자기장 감지 센서', desc: '주사 도구의 자석을 감지해 올바른 주사 위치인지 확인하는 센서',
         box: [700, 852], line: [[850, 852], [850, 752]] },
    D: { name: '제어 보드 & 방열판', desc: '센서의 신호를 처리하고, 작동 중 발생하는 열을 분산하는 핵심 부품',
         box: [800, 852], line: [[950, 852], [950, 710]] },
    E: { name: '후면 덮개', desc: '내부 부품을 보호하고 벨트의 후면 구조를 완성하는 커버',
         box: [1044, 111], line: [[1044, 143], [990, 143], [990, 340]] },
    F: { name: '스트랩 고정부', desc: '벨트 스트랩을 본체에 연결하고 착용 시 안정적으로 고정하는 부품',
         box: [1360, 556], line: [[1360, 588], [1345, 588], [1345, 686], [1294, 710]] },
    G: { name: '고정 나사', desc: '각 부품을 결합해 내부 구조가 흔들리지 않도록 고정하는 부품',
         box: [1360, 556], line: [[1360, 588], [1256, 588]] },
    H: { name: '에어메쉬 쿠션', desc: '복부와 맞닿는 부분의 압박을 완화하고 통기성을 높이는 쿠션',
         box: [1044, 111], line: [[1295.5, 175], [1295.5, 316], [1250, 368]] }
  },

  // ---- 238차: 제품별 상세 화면 (kit.js 가 1번에서 고른 제품 = html[data-kit-product] 에 맞춰 바꿈) ----
  //   sections = 1번 아래로 이어지는 화면 (벨트 = 2·3·4, 인형 = 2·4, 동화책 = 4). 4번 내용은 kit.html 의 .kp-제품 블록
  sections: { belt: ['k2', 'k3', 'k4'], doll: ['k2', 'k4'], book: ['k4'], assist: ['k2', 'k4'], cap: ['k2', 'k4'] },
  //   stages = 2번 분해도 (벨트는 위의 showFirst · parts · callouts · explode.revealOpacity 그대로)
  //   인형: 사용자 시안(1920×1080) 좌표, 그림은 SVG 원래 크기 × 1.077 (시안 배율). 부품 순서 = 아래 → 위
  stages: {
    doll: {
      showAlt: '조립된 주사 연습 인형',
      showFirst: { src: 'assets/images/kit/doll/show-first.svg?v=238', w: 389.11, h: 635.66, pos: [770, 253] },
      // C 인형 본체 = 팔·실리콘이 빠진 몸통 (239차 · 241차 수정본 '인형 전개도_Body.svg') — 움직이지 않음 (exploded = assembled)
      parts: [
      // 244차: 왼팔은 몸통 뒤 (중간 단계에서 리본·얼굴 아래로 가려지게 — 사용자 시안)
      { id: 'd-arm-left', part: 'D', src: 'assets/images/kit/doll/d-arm-left.svg', w: 93.72, h: 141.64, exploded: [729, 371], assembled: [860, 462] },
      { id: 'c-body', part: 'C', src: 'assets/images/kit/doll/c-body.svg?v=241', w: 389.11, h: 635.66, exploded: [770, 253], assembled: [770, 253] },
      { id: 'e-joint-left-1', part: 'E', src: 'assets/images/kit/doll/e-joint-left-1.svg', w: 24.79, h: 24.65, exploded: [830, 435], assembled: [922, 480] },
      { id: 'e-joint-left-2', part: 'E', src: 'assets/images/kit/doll/e-joint-left-2.svg', w: 17.68, h: 18.14, exploded: [863, 461], assembled: [938, 476] },
      { id: 'e-joint-right-1', part: 'E', src: 'assets/images/kit/doll/e-joint-right-1.svg', w: 21.79, h: 23.38, exploded: [1101, 525], assembled: [1034, 510] },
      { id: 'e-joint-right-2', part: 'E', src: 'assets/images/kit/doll/e-joint-right-2.svg', w: 33.66, h: 29.14, exploded: [1127, 507], assembled: [1055, 526] },
      { id: 'a-silicone-pad', part: 'A', src: 'assets/images/kit/doll/a-silicone-pad.svg', w: 88.68, h: 124.03, exploded: [464, 674], assembled: [912, 586] },
      { id: 'b-silicone-fixing', part: 'B', src: 'assets/images/kit/doll/b-silicone-fixing.svg', w: 104.7, h: 142.77, exploded: [610, 622], assembled: [908, 573] },
      { id: 'd-arm-right', part: 'D', src: 'assets/images/kit/doll/d-arm-right.svg', w: 118.13, h: 255.41, exploded: [1180, 444], assembled: [1031, 500] }
      ],
      revealOpacity: { 'e-joint-left-1': 0.45, 'e-joint-left-2': 0.45, 'e-joint-right-1': 0.45, 'e-joint-right-2': 0.45 },
      callouts: {
        A: { name: '주사 연습 실리콘 패드', desc: '인형에 주사하는 연습을 반복할 수 있도록 제작했어요.', box: [440, 852], line: [[508, 852], [508, 795]] },
        B: { name: '실리콘 고정부', desc: '실리콘 패드를 인형에 고정하고 쉽게 분리할 수 있도록 도와줘요.', box: [600, 852], line: [[662, 852], [662, 762]] },
        C: { name: '인형 본체', desc: '부드러운 솜을 채워 아이가 편안하게 안고 연습할 수 있어요.', box: [1110, 750], line: [[1110, 782], [1053, 782]] },
        D: { name: '인형 팔', desc: '관절과 연결되어 팔의 위치를 자연스럽게 조절할 수 있어요.', box: [1360, 600], line: [[1360, 632], [1292, 632]] },
        E: { name: '회전형 안전 관절', desc: '팔을 자유롭게 움직여 원하는 자세로 조절할 수 있어요.', box: [1300, 400], line: [[1300, 432], [1200, 432], [1152, 512]] }
      }
    },
    // 242차: 주사 각도 가이드 — 243차: 사용자 시안 3 → 1 → 2: 처음 = 프레임만 → 안쪽 패드가 비침 → 프레임·패드가 나뉨
    //   그림 = SVG 원래 크기 × 1.09 (시안 배율). 패드가 프레임 위에 비쳐 보이도록 z 2
    assist: {
      showAlt: '조립된 주사 각도 가이드',
      showFirst: { src: 'assets/images/kit/assist/show-first.svg?v=263', w: 477.59, h: 470.59, pos: [647, 394] },   // 263차: 조립 외형 = 사용자 Show first, 프레임 = 사용자 Angle Frame (따로)
      parts: [
        { id: 'b-angle-frame', hitFill: true, part: 'B', src: 'assets/images/kit/assist/b-angle-frame.svg?v=263', w: 472.55, h: 465.0, exploded: [792.36, 336], assembled: [651.36, 394] },
        { id: 'a-anti-slip-pad', hitFill: true, part: 'A', src: 'assets/images/kit/assist/a-anti-slip-pad.svg?v=242', w: 457.96, h: 469.81, exploded: [480, 493], assembled: [647, 394], z: 2 }
      ],
      revealOpacity: { 'a-anti-slip-pad': 0.35 },
      callouts: {
        A: { name: '미끄럼방지 패드', desc: '피부와 닿는 부분의 미끄러짐을 줄여 안정감을 높여줘요.', box: [200, 800], line: [[471, 832], [512, 832]] },
        B: { name: '각도 유지 프레임', desc: '주사 펜의 각도를 일정하게 유지하도록 도와줘요.', box: [1300, 600], line: [[1300, 632], [1252, 598]] }
      }
    },
    // 246차: 주사 보조 캡 — 사용자 시안 1 → 2 → 3 (완성 외형 → 겉이 비치며 안쪽 부품 → 분해). 그림 = SVG 원래 크기 (시안 1배)
    //   248차: 부품 이름·설명 = 사용자 문구
    cap: {
      showAlt: '조립된 주사 보조 캡',
      showFirst: { src: 'assets/images/kit/cap/show-first.svg?v=246', w: 578.44, h: 448.16, pos: [671, 316] },
      parts: [
        { id: 'e-lower-cap-left', part: 'E', src: 'assets/images/kit/cap/e-lower-cap-left.svg?v=246', w: 245.14, h: 175.27, exploded: [809, 323], assembled: [747, 489] },
        { id: 'e-lower-cap-right', part: 'E', src: 'assets/images/kit/cap/e-lower-cap-right.svg?v=246', w: 251.9, h: 175.39, exploded: [906, 504], assembled: [753, 533] },
        { id: 'd-magnet', part: 'D', src: 'assets/images/kit/cap/d-magnet.svg?v=246', w: 76.12, h: 87.8, exploded: [851, 518], assembled: [932, 513] },
        { id: 'c-silicone-holder', part: 'C', src: 'assets/images/kit/cap/c-silicone-holder.svg?v=246', w: 85.62, h: 85.92, exploded: [782, 561], assembled: [959, 524] },
        { id: 'b-needle-silicone', part: 'B', src: 'assets/images/kit/cap/b-needle-silicone.svg?v=246', w: 63.69, h: 65.78, exploded: [731, 613], assembled: [978, 518] },
        { id: 'a-cap-lid', part: 'A', src: 'assets/images/kit/cap/a-cap-lid.svg?v=246', w: 373.5, h: 305.51, exploded: [374, 621], assembled: [671, 458] },
        { id: 'f-upper-cap', part: 'F', src: 'assets/images/kit/cap/f-upper-cap.svg?v=246', w: 332.68, h: 283.35, exploded: [1070, 186], assembled: [918, 318] }
      ],
      revealOpacity: { 'a-cap-lid': 0.6, 'f-upper-cap': 0.6 },
      callouts: {
        A: { name: '캡 뚜껑', desc: '캡 끝부분을 덮어 내부를 보호해요.', box: [790, 770], line: [[790, 802], [663, 802]] },
        B: { name: '바늘 가림 실리콘', desc: '연습할 때 바늘이 직접 보이지 않도록 가려줘요.', box: [640, 780], line: [[760, 780], [760, 678]] },
        C: { name: '실리콘 고정부', desc: '실리콘 부품을 정해진 위치에 고정해요.', box: [760, 760], line: [[826, 760], [826, 646]] },
        D: { name: '네오디뮴 자석', desc: '주사 연습 벨트의 센서와 상호작용해 주사 위치를 감지할 수 있도록 도와줘요.', box: [960, 720], line: [[990, 720], [905, 600]] },
        E: { name: '하단 캡', desc: '상단 캡과 결합해 외부 구조를 완성해요.', box: [1180, 560], line: [[1180, 592], [1117, 592]] },
        F: { name: '상단 캡', desc: '주사 펜이 들어가는 부분을 감싸고 보호해요.', box: [1240, 500], line: [[1290, 500], [1290, 379]],
          note: '*총 4종류가 있어요',   // 272차: 친구별 상단 캡 4종 (웹/프로덕트/2/주사캡 전개도/…상단캡-○○.svg)
          icons: [['assets/images/kit/cap/upper-cap-beary.svg?v=272', '베어리 상단 캡'], ['assets/images/kit/cap/upper-cap-ellie.svg?v=272', '엘리 상단 캡'], ['assets/images/kit/cap/upper-cap-rabby.svg?v=272', '래비 상단 캡'], ['assets/images/kit/cap/upper-cap-mio.svg?v=272', '미오 상단 캡']] }
      }
    }
  },

  // 완성 외형 (조립 상태) — 시안 product2.png 정합 (791, 320)
  showFirst: { src: 'assets/images/kit/belt/show-first.webp?v=234', w: 344.22, h: 442.03, pos: [791, 320] },

  // 부품 (아래 → 위 순서 = 겹침 순서). exploded = 최종 전개 위치(60차 시안 분해도 정합 — 59차 대비 (−136, +119) 이동, 부품 크기 그대로),
  //   assembled = 조립 상태 위치(product2.png / product2-1.png 정합. 쿠션·나사는 가려져 있어 뒤판 기준 전개 방향으로 추정)
  //   part = 왼쪽 아래 목록 A~H. F = 스트랩 고정부 (원기둥 2 + 뚜껑 2, 사용자 확인)
  parts: [
    { id: 'h-air-mesh-cushion', part: 'H', src: 'assets/images/kit/belt/h-air-mesh-cushion.svg', w: 184.19, h: 322.79, exploded: [1147, 273], assembled: [932, 306] },
    { id: 'g-mounting-screw', part: 'G', src: 'assets/images/kit/belt/g-mounting-screw.svg', w: 207.71, h: 306.19, exploded: [1050, 360], assembled: [916, 330] },
    { id: 'e-rear-cover', part: 'E', src: 'assets/images/kit/belt/e-rear-cover.svg', w: 249.81, h: 442.04, exploded: [961, 331], assembled: [885, 320] },
    { id: 'f-strap-mount-left', part: 'F', src: 'assets/images/kit/belt/f-strap-mount-left.svg', w: 34.89, h: 145.66, exploded: [918, 247], assembled: [894, 340] },
    { id: 'f-strap-mount-right', part: 'F', src: 'assets/images/kit/belt/f-strap-mount-right.svg', w: 38.14, h: 155.47, exploded: [1257, 691], assembled: [1091, 603] },
    { id: 'f-lid-left', part: 'F', src: 'assets/images/kit/belt/f-lid-left.svg', w: 25.31, h: 33.34, exploded: [913, 212], assembled: [891, 323] },
    { id: 'f-lid-right', part: 'F', src: 'assets/images/kit/belt/f-lid-right.svg', w: 33.85, h: 43.49, exploded: [1266, 647], assembled: [1097, 579] },
    { id: 'd-control-board', part: 'D', src: 'assets/images/kit/belt/d-control-board.svg', w: 133.85, h: 255.99, exploded: [866, 478], assembled: [909, 450] },
    { id: 'c-magnetic-sensor', part: 'C', src: 'assets/images/kit/belt/c-magnetic-sensor.svg', w: 171.35, h: 257.01, exploded: [750, 500], assembled: [836, 444] },
    // 251차: 겹침 = 앞에서부터 주사 부위 실리콘 → 센서 고정 케이스 (사용자). 247차에 뒤로 보냈던 것 되돌림
    { id: 'b-sensor-case', part: 'B', src: 'assets/images/kit/belt/b-sensor-case.svg', w: 256.25, h: 345.85, exploded: [539, 486], assembled: [829, 385] },
    { id: 'a-injection-silicone', part: 'A', src: 'assets/images/kit/belt/a-injection-silicone.webp?v=234', w: 308.72, h: 364.56, exploded: [288, 560], assembled: [793, 376] }
  ]
};
