document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. 공통 헤더 & 모바일 메뉴 & 스크롤 탑 버튼
  // ----------------------------------------------------
  const commonHeader = document.getElementById('commonHeader');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const headerNav = document.getElementById('headerNav');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  let lastScrollY = window.scrollY;

  // 헤더 스마트 상하 스크롤 감지 및 탑버튼 표시 제어
  function handleScroll() {
    const currentScrollY = window.scrollY;

    // 헤더 노출/숨김
    if (currentScrollY <= 10) {
      commonHeader.classList.remove('is-hidden');
    } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
      commonHeader.classList.add('is-hidden');
    } else if (currentScrollY < lastScrollY) {
      commonHeader.classList.remove('is-hidden');
    }

    // 탑 버튼 활성화 (200px 이상 스크롤 시)
    if (scrollTopBtn) {
      if (currentScrollY > 200) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll);

  // 모바일 내비게이션 토글
  if (mobileMenuToggle && headerNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('is-active');
      headerNav.classList.toggle('is-open');
    });
  }

  // 최상단 스크롤 버튼
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----------------------------------------------------
  // 2. 도움말 페이지 전용: 탭 전환 및 FAQ 아코디언
  // ----------------------------------------------------
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabLinks.length > 0) {
    tabLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        // 모든 탭 활성화 상태 제거 및 클릭한 탭 활성화
        tabLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        // 모든 FAQ 탭 컨텐츠 숨기기 및 열려있는 질문 모두 초기화(닫기)
        tabContents.forEach(content => {
          content.classList.remove('active');
          content.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        });

        // 해당 탭 내용 보여주기
        const targetId = this.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // Q&A 아코디언 클릭 로직
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        
        if (faqItem.classList.contains('active')) {
          // 이미 열려있으면 닫기
          faqItem.classList.remove('active');
        } else {
          // 같은 탭 내의 다른 열려있는 질문들은 모두 닫기
          const parentTab = this.closest('.tab-content');
          if (parentTab) {
            parentTab.querySelectorAll('.faq-item').forEach(item => {
              item.classList.remove('active');
            });
          }
          // 클릭한 질문 열기
          faqItem.classList.add('active');
        }
      });
    });
  }
});