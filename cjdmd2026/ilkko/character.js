
/* 클릭 스티커 팝 사운드: 실제 사용자 클릭 시 짧은 원본 뿅! 음향 */
/* 스티커 클릭: 부드러운 우드/버블 계열 팝 효과 (외부 파일 불필요) */
let stickerSound = null;
function playStickerPop() {
  try {
    if (!stickerSound) stickerSound = new Audio('images/sticker_ui2.ogg');
    stickerSound.pause();
    stickerSound.currentTime = 0;
    stickerSound.volume = 0.65;
    const playPromise = stickerSound.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => {});
  } catch (e) { /* 오디오 재생 제한이 있어도 스티커는 표시됩니다 */ }
}
// ==========================================
// 01. DOM 요소 선택 & 상태 변수
// ==========================================
const commonHeader = document.getElementById('commonHeader');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const headerNav = document.getElementById('headerNav');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const heroSection = document.getElementById('characterHeroSection');
const stampLayer = document.getElementById('heroStampLayer');
const clickHint = document.getElementById('characterClickHint');

let lastScrollY = window.scrollY;

/* 스티커 이미지 경로 리스트 (6개) */
const communityClickStickers = [
  'images/character-click-sticker-1.webp',
  'images/character-click-sticker-2.webp',
  'images/character-click-sticker-3.webp',
  'images/character-click-sticker-4.webp',
  'images/character-click-sticker-5.webp',
  'images/character-click-sticker-6.webp'
];

/* 로드 실패 시 적용될 폴백 SVG 데이터 (6개 세트) */
const fallbackStickers = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23FFD100'/><text x='50%' y='58%' font-size='22' font-weight='bold' text-anchor='middle' fill='%23222'>Good!</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='90' height='45' rx='10' fill='%23FF5511'/><text x='50%' y='65%' font-size='18' font-weight='bold' text-anchor='middle' fill='%23FFF'>Yep!</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36' fill='%23FF8800'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%2300D084'/><text x='50%' y='58%' font-size='18' font-weight='bold' text-anchor='middle' fill='%23FFF'>읽:꼬</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 15 L85 85 L15 85 Z' fill='%23FF4081'/><text x='50%' y='75%' font-size='16' font-weight='bold' text-anchor='middle' fill='%23FFF'>COOL</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='80' height='80' rx='40' fill='%237C4DFF'/><text x='50%' y='58%' font-size='20' font-weight='bold' text-anchor='middle' fill='%23FFF'>★</text></svg>"
];

/* 마우스 커서 팔로워용 상태 변수 */
let targetMouseX = window.innerWidth / 2;
let targetMouseY = window.innerHeight / 2;
let currentMouseX = targetMouseX;
let currentMouseY = targetMouseY;
let isMouseDown = false;
let isMouseInView = false;

// ==========================================
// 02. 스크롤 동작 (헤더 숨김/노출)
// ==========================================
function handleScroll() {
  const currentScrollY = window.scrollY;

  if (currentScrollY <= 10) {
    commonHeader.classList.remove('is-hidden');
  } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
    commonHeader.classList.add('is-hidden');
  } else if (currentScrollY < lastScrollY) {
    commonHeader.classList.remove('is-hidden');
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll);

// ==========================================
// 03. 히어로 영역 마우스 커서 팔로워 (Click 힌트)
// ==========================================
heroSection.addEventListener('mousemove', (e) => {
  const rect = heroSection.getBoundingClientRect();
  targetMouseX = e.clientX - rect.left;
  targetMouseY = e.clientY - rect.top;
  if (!isMouseInView) {
    isMouseInView = true;
    clickHint.classList.add('is-active');
  }
});

heroSection.addEventListener('mouseleave', () => {
  isMouseInView = false;
  clickHint.classList.remove('is-active');
});

heroSection.addEventListener('mousedown', () => isMouseDown = true);
heroSection.addEventListener('mouseup', () => isMouseDown = false);

function renderCursorLoop() {
  currentMouseX += (targetMouseX - currentMouseX) * 0.15;
  currentMouseY += (targetMouseY - currentMouseY) * 0.15;

  const cursorScale = isMouseDown ? 0.85 : 1;
  clickHint.style.transform = `translate(${currentMouseX + 12}px, ${currentMouseY + 12}px) scale(${cursorScale})`;

  requestAnimationFrame(renderCursorLoop);
}
requestAnimationFrame(renderCursorLoop);

// ==========================================
// 04. 히어로 영역 클릭 시 랜덤 스티커 생성 & 자동 삭제
// ==========================================
heroSection.addEventListener('click', (e) => {
  if (headerNav.classList.contains('is-open')) return;

  const rect = heroSection.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  const randomIndex = Math.floor(Math.random() * communityClickStickers.length);
  const randomRotate = Math.floor(Math.random() * 50) - 25;

  const stampEl = document.createElement('img');
  stampEl.className = 'hero-click-stamp';
  stampEl.src = communityClickStickers[randomIndex];
  
  stampEl.onerror = () => {
    stampEl.src = fallbackStickers[randomIndex];
  };
  
  stampEl.style.left = `${clickX}px`;
  stampEl.style.top = `${clickY}px`;
  stampEl.style.setProperty('--target-deg', `${randomRotate}deg`);

  stampLayer.appendChild(stampEl);
  playStickerPop();

  /* 2.5초 후 페이드 아웃 -> 0.5초 뒤 완전 제거 */
  setTimeout(() => {
    stampEl.classList.add('is-fading');
    setTimeout(() => {
      if (stampEl.parentNode) {
        stampEl.parentNode.removeChild(stampEl);
      }
    }, 500);
  }, 2500);
  
  if (stampLayer.children.length > 30) {
    stampLayer.removeChild(stampLayer.children[0]);
  }
});

// ==========================================
// 05. 탑 버튼 & 모바일 토글 메뉴
// ==========================================
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('is-active');
  headerNav.classList.toggle('is-open');
});

// ==========================================
// 06. 양쪽 무한 순환 캐러셀 (우측 슬라이드 덜컥거림 완전 보정)
// ==========================================
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrevBtn = document.getElementById('carouselPrevBtn');
const carouselNextBtn = document.getElementById('carouselNextBtn');

if (carouselTrack && carouselPrevBtn && carouselNextBtn) {
  let cards = Array.from(carouselTrack.children);
  let isAnimating = false; // 연타 시 튀는 현상 방지 락

  /* 초기 중앙 위치 기준 설정 */
  let currentIndex = 1;

  // 로딩 시 첫 번째 카드가 왼쪽에 보이도록 맨 끝 카드를 미리 맨 앞으로 1개 배치
  const lastCard = carouselTrack.lastElementChild;
  carouselTrack.insertBefore(lastCard, carouselTrack.firstElementChild);
  cards = Array.from(carouselTrack.children);

  function updateCarousel(animated = true) {
    cards.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    const cardWidth = 820; // 카드 기본 너비
    const gap = 32;       // 카드 간격
    const wrapperWidth = carouselTrack.parentElement.offsetWidth;

    const currentCardCenter = (currentIndex * (cardWidth + gap)) + (cardWidth / 2);
    const centerOffset = (wrapperWidth / 2) - currentCardCenter;

    if (!animated) {
      carouselTrack.style.transition = 'none';
    } else {
      carouselTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    carouselTrack.style.transform = `translateX(${centerOffset}px)`;
  }

  /* 오른쪽 버튼 클릭 (다음 카드) */
  carouselNextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex++;
    updateCarousel(true);

    /* 애니메이션이 끝난 후 요소 재배치 (튐 방지) */
    setTimeout(() => {
      const firstCard = carouselTrack.firstElementChild;
      carouselTrack.appendChild(firstCard);
      cards = Array.from(carouselTrack.children);
      
      currentIndex--;
      updateCarousel(false); // 애니메이션 없이 위치 순간 고정
      isAnimating = false;
    }, 450); // CSS transition 시간(0.45s)과 동기화
  });

  /* 왼쪽 버튼 클릭 (이전 카드) */
  carouselPrevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const lastCard = carouselTrack.lastElementChild;
    carouselTrack.insertBefore(lastCard, carouselTrack.firstElementChild);
    cards = Array.from(carouselTrack.children);

    currentIndex++;
    updateCarousel(false); // 먼저 순간적으로 보정 위치로 이동

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        currentIndex--;
        updateCarousel(true); // 부드럽게 왼쪽으로 슬라이드
        setTimeout(() => {
          isAnimating = false;
        }, 450);
      });
    });
  });

  /* 화면 크기 변경 대응 */
  window.addEventListener('resize', () => updateCarousel(false));

  /* 초기 실행 */
  updateCarousel(false);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. 각 캐릭터별 6개 상세 스티커 이미지 데이터 (이미지 파일명/경로에 맞춰 수정하세요)
  const characterDetails = {
    '잉꼬': [
      'images/ingkko_1.webp', 'images/ingkko_2.webp', 'images/ingkko_3.webp',
      'images/ingkko_4.webp', 'images/ingkko_5.webp', 'images/ingkko_6.webp'
    ],
    '두두': [
      'images/dudu_1.webp', 'images/dudu_2.webp', 'images/dudu_3.webp',
      'images/dudu_4.webp', 'images/dudu_5.webp', 'images/dudu_6.webp'
    ],
    '꾸미': [
      'images/kkumi_1.webp', 'images/kkumi_2.webp', 'images/kkumi_3.webp',
      'images/kkumi_4.webp', 'images/kkumi_5.webp', 'images/kkumi_6.webp'
    ],
    '바오': [
      'images/bao_1.webp', 'images/bao_2.webp', 'images/bao_3.webp',
      'images/bao_4.webp', 'images/bao_5.webp', 'images/bao_6.webp'
    ],
    '루이': [
      'images/lu-i_1.webp', 'images/lu-i_2.webp', 'images/lu-i_3.webp',
      'images/lu-i_4.webp', 'images/lu-i_5.webp', 'images/lu-i_6.webp'
    ],
    '레오': [
      'images/leo_1.webp', 'images/leo_2.webp', 'images/leo_3.webp',
      'images/leo_4.webp', 'images/leo_5.webp', 'images/leo_6.webp'
    ],
    '우엉이': [
      'images/ueong_1.webp', 'images/ueong_2.webp', 'images/ueong_3.webp',
      'images/ueong_4.webp', 'images/ueong_5.webp', 'images/ueong_6.webp'
    ]
  };

  const modalOverlay = document.getElementById('characterModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCharTitle = document.getElementById('modalCharTitle');
  const moreBtns = document.querySelectorAll('.card-more-btn');

  // '더보기' 버튼 클릭 이벤트 설정
  moreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.character-card');
      const charName = card.querySelector('.card-char-name').textContent.trim();

      // 모달 타이틀 변경
      modalCharTitle.textContent = charName;

      // 이미지 6개 동적 매칭
      const imgs = characterDetails[charName];
      for (let i = 1; i <= 6; i++) {
        const imgEl = document.getElementById(`modalImg${i}`);
        if (imgs && imgs[i - 1]) {
          imgEl.src = imgs[i - 1];
        } else {
          // 등록된 세부 이미지가 없는 경우 기본 대체 캐릭터 이미지 출력
          imgEl.src = card.querySelector('.card-char-img').src;
        }
      }

      // 모달 표시
      modalOverlay.classList.add('is-active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    });
  });

  // 닫기 함수
  const closeModal = () => {
    modalOverlay.classList.remove('is-active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // X 버튼 클릭 시 닫기
  modalCloseBtn.addEventListener('click', closeModal);

  // 배경 바깥 어두운 영역 클릭 시 닫기
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ESC 키 누르면 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });
});


