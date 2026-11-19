/* ============================================================
   이미지 경로 — 키 = HTML의 data-image="키" 와 1:1 연결.
   main.js 가 자동으로 <img src> 를 채웁니다 (HTML/JS 수정 불필요).
   임시 이미지는 images/ 에 로컬 다운로드되어 있습니다.
   파일만 같은 이름으로 교체하거나, 아래 경로만 바꾸면 반영됩니다.

   공통 규칙
   - 흑백: CSS(.bw) 필터로 처리 → 컬러 파일을 넣어도 흑백으로 보임
   - 잘림: 모든 이미지는 object-fit: cover (지정 비율로 꽉 차게 중앙 크롭)
   - 로딩 실패: placehold.co 자동 대체
   - 투명 PNG: 기본 불필요(JPG 권장). floating* 만 PNG 쓰면 더 깔끔(선택)
   ============================================================ */
const P = "images/";

export const siteImages = {
  footprintCursor: P + "footstep-cursor.webp",
  // Empty optional paths retain the text logo or character image fallbacks.
  brandLogo: P + "brand-logo.webp",
  character01: "",
  character02: "",
  /* HERO 배경
     섹션: Hero | 비율 16:10 | 권장 1600x1000 | PNG 불필요 | cover(중앙 크롭, 좌우/상하 약간 잘림) */
  heroMain: P + "heroMain.jpg",
  storyBackground: P + "story-background.webp",
  storyLayerBackground: P + "story-layers/background_1920x1080.webp",
  storyLayerPeople: P + "story-layers/people_1920x1080.webp",
  storyLayerTablet: P + "story-layers/tablet_1920x1080.webp",
  introJik: P + "intro-jik.webp",
  introJi: P + "intro-ji.webp",

  /* FLOATING 장식 (떠다니는 오브젝트)
     섹션: Story | 비율 1:1 | 권장 400x400 | PNG 권장(투명 배경 시 더 자연스러움) | cover */
  floating01: P + "floating01.jpg",
  floating02: P + "floating02.jpg",
  floating03: P + "floating03.jpg",
  floating04: P + "floating04.jpg",
  floating05: P + "floating05.jpg",

  /* SERVICES 가로 카드
     섹션: Services | 비율 4:3 | 권장 800x600 | PNG 불필요 | cover(카드 상단 고정 높이로 크롭) */
  service01: P + "service01.jpg",
  service02: P + "service02.jpg",
  service03: P + "service03.jpg",
  service04: P + "service04.jpg",
  service05: P + "service05.jpg",
  service06: P + "service06.jpg",

  /* SPECIALIST 세로 이미지
     섹션: Specialist | 비율 9:11 | 권장 900x1100 | PNG 불필요 | cover(세로 고정, 좌우 크롭) */
  // Heritage / Identity / Character / Typography / Interaction / Expansion.
  // Temporary images: replace each path independently with your final artwork.
  specialist: P + "specialist.jpg",
  specialist02: P + "service01.jpg",
  specialist03: P + "service02.jpg",
  specialist04: P + "service03.jpg",
  specialist05: P + "service05.jpg",
  specialist06: P + "service06.jpg",

  /* PROCESS 단계 이미지(현재 그리드는 텍스트 중심, 확장용으로 보관)
     섹션: Process | 비율 1:1 | 권장 600x600 | PNG 불필요 | cover */
  process01: P + "process01.jpg",
  process02: P + "process02.jpg",
  process03: P + "process03.jpg",
  process04: P + "process04.jpg",
  process05: P + "process05.jpg",
  process06: P + "process06.jpg",

  /* FOOTER 배경
     섹션: Footer | 비율 8:3 | 권장 1600x600 | PNG 불필요 | cover(어둡게 오버레이됨) */
  footerBg: P + "footerBg.jpg",
};
