
/* Preload the sticker sound so the first click can play it immediately. */
const stickerSound = new Audio('images/sticker_ui2.wav');
stickerSound.preload = 'auto';
stickerSound.volume = 0.65;

function playStickerPop() {
  stickerSound.currentTime = 0;
  stickerSound.play().catch(() => {});
}

// ==========================================
// 01. DOM 요소 선택 & 리소스 초기화
// ==========================================
const commonHeader = document.getElementById('commonHeader');
const track = document.getElementById('communityScrollTrack');
const heroText = document.getElementById('communityHeroText');
const heroChar = document.getElementById('communityHeroChar');
const pinnedViewport = document.getElementById('communityHeroViewport');
const stampLayer = document.getElementById('communityStampLayer');
const clickHint = document.getElementById('communityClickHint');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const headerNav = document.getElementById('headerNav');

/* 히어로 영역 클릭 시 생성될 스티커 이미지 경로 목록 */
const communityClickStickers = [
  'images/community-click-sticker-1.webp',
  'images/community-click-sticker-2.webp',
  'images/community-click-sticker-3.webp',
  'images/community-click-sticker-4.webp',
  'images/community-click-sticker-5.webp',
  'images/community-click-sticker-6.webp'
];

/* 스티커 이미지 로드 실패 시 적용될 폴백(Fallback) SVG 데이터 */
const fallbackStickers = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23FFD100'/><text x='50%' y='58%' font-size='22' font-weight='bold' text-anchor='middle' fill='%23222'>Good!</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='90' height='45' rx='10' fill='%23FF5511'/><text x='50%' y='65%' font-size='18' font-weight='bold' text-anchor='middle' fill='%23FFF'>Yep!</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36' fill='%23FF8800'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%2300D084'/><text x='50%' y='58%' font-size='18' font-weight='bold' text-anchor='middle' fill='%23FFF'>읽:꼬</text></svg>"
];

/* 인터랙션 제어용 상태 변수 모음 */
let targetScrollProgress = 0;
let currentScrollProgress = 0;
let targetMouseX = window.innerWidth / 2;
let targetMouseY = window.innerHeight / 2;
let currentMouseX = targetMouseX;
let currentMouseY = targetMouseY;
let isMouseDown = false;
let isMouseInView = false;
let lastScrollY = window.scrollY;


// ==========================================
// 02. 스크롤 위치 계산 & UI 요소 인터랙션
// ==========================================
function calculateScroll() {
  /* 스크롤 트랙 기준 현재 진행 비율(0 ~ 1) 계산 */
  const trackRect = track.getBoundingClientRect();
  const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);
  targetScrollProgress = Math.max(0, Math.min(1, -trackRect.top / maxScroll));
  
  const currentScrollY = window.scrollY;

  /* 최상단 이동 시 헤더 노출 및 스티커 부드럽게 제거 */
  if (currentScrollY <= 10) {
    commonHeader.classList.remove('is-hidden');
    const stamps = stampLayer.querySelectorAll('.community-click-stamp:not(.is-fading)');
    stamps.forEach(stamp => {
      stamp.classList.add('is-fading');
      setTimeout(() => { if (stamp.parentNode) stamp.parentNode.removeChild(stamp); }, 400); 
    });
  }
  /* 스크롤 방향 감지하여 헤더 숨김/노출 처리 */
  else if (currentScrollY > lastScrollY && currentScrollY > 80) {
    commonHeader.classList.add('is-hidden');
  }
  else if (currentScrollY < lastScrollY) {
    commonHeader.classList.remove('is-hidden');
  }

  /* 탑 스크롤 버튼 표시 제어 */
  if (currentScrollY > 300) {
    scrollTopBtn.classList.add('is-visible');
  } else {
    scrollTopBtn.classList.remove('is-visible');
  }
  
  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', calculateScroll);
window.addEventListener('resize', calculateScroll);
calculateScroll();


// ==========================================
// 03. 마우스 좌표 추적 & 힌트 렌더링
// ==========================================
pinnedViewport.addEventListener('mousemove', (e) => {
  const rect = pinnedViewport.getBoundingClientRect();
  targetMouseX = e.clientX - rect.left;
  targetMouseY = e.clientY - rect.top;
  if (!isMouseInView) {
    isMouseInView = true;
    clickHint.classList.add('is-active');
  }
});

pinnedViewport.addEventListener('mouseleave', () => {
  isMouseInView = false;
  clickHint.classList.remove('is-active');
});

pinnedViewport.addEventListener('mousedown', () => isMouseDown = true);
pinnedViewport.addEventListener('mouseup', () => isMouseDown = false);


// ==========================================
// 04. 메인 프레임 스무딩 애니메이션 (RAF Loop)
// ==========================================
function renderLoop() {
  /* 스크롤 진행 상황 부드럽게 감쇠(LERP) */
  currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
  
  const animProgress = Math.min(1, currentScrollProgress / 0.55);
  const easeProgress = 1 - Math.pow(1 - animProgress, 4); 

  /* 모바일에서는 스크롤 시작 전에도 Community 제목/잉꼬가 보여야 하므로
     PC 전용 등장 애니메이션을 실행하지 않습니다. */
  const isMobileHero = window.matchMedia('(max-width: 768px)').matches;
  let textOpacity = 1;
  if (isMobileHero) {
    heroChar.style.removeProperty('transform');
    heroText.style.removeProperty('transform');
    heroText.style.removeProperty('opacity');
    stampLayer.style.removeProperty('opacity');
  } else {
    const charTranslateY = (1 - easeProgress) * 150;
    const charScale = 0.82 + (easeProgress * 0.18);
    heroChar.style.transform = `translate(-50%, ${charTranslateY}px) scale(${charScale})`;
    const textTranslateY = (1 - easeProgress) * 60;
    textOpacity = easeProgress;
    heroText.style.transform = `translate(-50%, ${textTranslateY}px)`;
    heroText.style.opacity = textOpacity;
    stampLayer.style.opacity = textOpacity;
  }

  /* 히어로 요소 투명화 시 스티커 레이어 비우기 */
  if (textOpacity < 0.01 && stampLayer.children.length > 0) {
    stampLayer.innerHTML = '';
  }

  /* 마우스 커서 팔로워 인터랙션 */
  currentMouseX += (targetMouseX - currentMouseX) * 0.15;
  currentMouseY += (targetMouseY - currentMouseY) * 0.15;

  const cursorScale = isMouseDown ? 0.85 : 1;
  clickHint.style.transform = `translate(${currentMouseX + 12}px, ${currentMouseY + 12}px) scale(${cursorScale})`;

  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);


// ==========================================
// 05. 뷰포트 클릭 시 랜덤 스티커 생성
// ==========================================
pinnedViewport.addEventListener('click', (e) => {
  /* 모바일 네비게이션 메뉴가 활성화되어 있을 경우 이벤트 무시 */
  if (headerNav.classList.contains('is-open')) return;

  const rect = pinnedViewport.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  const randomIndex = Math.floor(Math.random() * communityClickStickers.length);
  const randomRotate = Math.floor(Math.random() * 50) - 25;

  const stampEl = document.createElement('img');
  stampEl.className = 'community-click-stamp';
  stampEl.src = communityClickStickers[randomIndex];
  
  /* 이미지 로드 에러 시 SVG 폴백으로 교체 */
  stampEl.onerror = () => stampEl.src = fallbackStickers[randomIndex];
  
  stampEl.style.left = `${clickX}px`;
  stampEl.style.top = `${clickY}px`;
  stampEl.style.setProperty('--target-deg', `${randomRotate}deg`);

  stampLayer.appendChild(stampEl);
  playStickerPop();
  
  /* 최대로 쌓일 수 있는 스티커 개수 제한 (30개 초과 시 오래된 스티커 삭제) */
  if (stampLayer.children.length > 30) stampLayer.removeChild(stampLayer.children[0]);
});


// ==========================================
// 06. 탑 스크롤 버튼 & 모바일 토글 메뉴
// ==========================================
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('is-active');
  headerNav.classList.toggle('is-open');
});


// ==========================================
// 07. 스크롤 리빌(Reveal) 애니메이션 (시차 효과 적용)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1) 일반 리빌 요소 처리
  const revealElements = document.querySelectorAll('.reveal-up:not(.testimonial-card)');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2) 추천 후기 카드 순차적(Stagger) 애니메이션 처리
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 그룹 내에서 몇 번째 카드인지 계산하여 지연시간 부여 (0.1초 간격)
        const cards = Array.from(testimonialCards);
        const index = cards.indexOf(entry.target);
        
        // 카드별로 0.1초(100ms)씩 시차를 두고 애니메이션 실행
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add("is-visible");
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1
  });

  testimonialCards.forEach((card) => {
    cardObserver.observe(card);
  });
});


// ==========================================
// 08. 중복 없는 시연용 리뷰 데이터 및 저장 상태
// ==========================================
// 아래 후기는 실제 고객 리뷰가 아닌 UI 시연용 예시입니다.
const sampleReviews = [
  { title:'그림책 모험 덕분에 읽기 연습을 먼저 찾네요', text:'글자를 보자마자 피하던 아이였는데 잎글마을 미션을 하나씩 끝내는 시간을 좋아해요. 오늘은 어떤 친구를 만나는지 물어보며 스스로 태블릿을 켭니다.', author:'도토리맘', date:'2026.11.01', imageUrl:'./images/review_uploaded_1.jpg' },
  { title:'자음 타일을 손으로 놓는 과정이 재미있대요', text:'종이 학습지만 할 때보다 직접 타일을 움직이며 소리를 맞춰보니 더 오래 집중하네요. 틀려도 다시 시도할 수 있어 부담이 적었습니다.', author:'별빛보호자', date:'2026.10.29', imageUrl:'./images/review_uploaded_2.jpg' },
  { title:'짧게 나누어 하는 훈련이 우리 집에 잘 맞아요', text:'긴 공부 시간보다 저녁 식사 후 짧게 한 단계씩 진행하고 있어요. 아이가 지치기 전에 끝나서 다음 날도 기분 좋게 시작합니다.', author:'초록나무', date:'2026.10.24', imageUrl:'./images/review_uploaded_3.jpg' },
  { title:'모음 소리를 구분하는 놀이가 특히 좋았어요', text:'비슷하게 들리는 소리를 구분할 때 어려워했는데 캐릭터 목소리를 듣고 따라 해보는 활동은 즐거워하더라고요. 반복하기도 편했어요.', author:'달콩맘', date:'2026.10.21', imageUrl:'./images/review_uploaded_4.jpg' },
  { title:'아이가 직접 고른 미션부터 시작해요', text:'훈련 순서를 함께 확인하고 오늘 할 것을 아이가 골라요. 스스로 선택하니 참여하는 태도가 달라졌고 완료했을 때 표정도 밝아집니다.', author:'사과별', date:'2026.10.15', imageUrl:'./images/review_uploaded_5.jpg' },
  { title:'교구와 화면이 연결되어 신기해하네요', text:'글자 타일을 패드에 올리고 화면에서 반응이 나타나니 처음엔 신기해서 여러 번 해보았어요. 이제 소리를 듣고 알맞은 글자를 찾아보려 합니다.', author:'민트구름', date:'2026.10.12', imageUrl:null },
  { title:'보호자도 진행 단계를 이해하기 쉬워요', text:'아이에게 무엇을 알려줘야 할지 막막했는데 모음부터 철자까지 단계가 나뉘어 있어서 좋아요. 집에서 함께할 때 설명할 방향이 잡혀요.', author:'하늘연필', date:'2026.10.09', imageUrl:null },
  { title:'틀려도 다시 할 수 있어 마음이 편안해졌어요', text:'정답을 못 찾으면 속상해하던 아이가 게임에서는 다시 해보자고 말해요. 점수보다 도전하는 과정을 칭찬하게 됐습니다.', author:'나뭇잎맘', date:'2026.10.04', imageUrl:null },
  { title:'이동 없이 집에서 이어서 할 수 있다는 점이 좋아요', text:'방문 훈련을 하던 날에는 이동만으로도 피곤했는데 집에서는 아이 컨디션에 맞춰 시간을 정할 수 있어요. 부담이 줄어 꾸준함을 지키기 쉬웠어요.', author:'모래시계', date:'2026.09.28', imageUrl:null },
  { title:'캐릭터 이야기 덕분에 다음 단계가 궁금하대요', text:'나뭇잎을 모으면서 새로운 장소로 가는 이야기를 좋아합니다. 읽기 과제보다는 모험을 이어간다고 생각해서 자연스럽게 참여해요.', author:'노랑새', date:'2026.09.22', imageUrl:null },
  { title:'아이와 오늘 배운 글자를 이야기하는 시간이 생겼어요', text:'훈련이 끝나면 어떤 소리를 찾았는지 설명해줘요. 부모와 아이가 같은 활동을 보고 대화할 수 있다는 게 반가운 변화였습니다.', author:'반짝연두', date:'2026.09.18', imageUrl:null },
  { title:'주말에도 무리 없이 짧게 복습하고 있어요', text:'평일에 했던 내용을 주말에 한 번 더 해보며 기억을 되짚어요. 따로 준비물이 많지 않아서 가볍게 시작하기 좋습니다.', author:'코코밤', date:'2026.09.11', imageUrl:null }];
const allReviews = sampleReviews.map((item,index)=>({id:index+1,...item,isPhoto:!!item.imageUrl,isSample:true}));
const storageKey = 'ilkko_local_reviews_v1';
try {
  const saved = JSON.parse(localStorage.getItem(storageKey)||'[]');
  if(Array.isArray(saved)) {
    saved.forEach((r,i)=>{
      if(r && typeof r.title==='string' && typeof r.text==='string' && typeof r.author==='string') {
        allReviews.unshift({id:10000+i,title:r.title.slice(0,60),text:r.text.slice(0,800),author:r.author.slice(0,20),date:r.date||'',imageUrl:r.imageUrl||null,isPhoto:!!r.imageUrl,isSample:false});
      }
    });
  }
} catch(err) { console.warn('로컬 리뷰를 불러오지 못했습니다.',err); }
let currentTab = 'all';
let currentPage = 1;
const itemsPerPage = 5;

// 문자열을 HTML에 안전하게 표시하기 위한 이스케이프
function reviewEscape(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function renderReviews() {
  const container=document.getElementById('reviewContainer');
  if(!container)return;
  container.innerHTML='';
  const filtered=allReviews.filter(item=>currentTab==='all'||(currentTab==='photo'?item.isPhoto:!item.isPhoto));
  const totalPages=Math.max(1,Math.ceil(filtered.length/itemsPerPage));
  if(currentPage>totalPages)currentPage=totalPages;
  const pageItems=filtered.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage);
  if(!pageItems.length){container.innerHTML='<p class="review-empty">등록된 후기가 없습니다.</p>';}
  pageItems.forEach(item=>{
    const node=document.createElement('article');
    node.className='review-item'+(item.isPhoto?' has-photo':'');
    const imgSrc=item.imageUrl && (item.imageUrl.startsWith('./images/')||item.imageUrl.startsWith('data:image/'))?item.imageUrl:null;
    node.innerHTML=`<div class="review-item-content"><h4 class="item-title">${reviewEscape(item.title)}</h4><p class="item-text">${reviewEscape(item.text)}</p><div class="item-meta"><span class="author">${reviewEscape(item.author)}</span><span class="divider">|</span><span class="date">${reviewEscape(item.date)}</span></div></div>${imgSrc?`<div class="review-item-photo"><img src="${imgSrc}" alt="후기에 첨부된 사진" loading="lazy"></div>`:''}`;
    container.appendChild(node);
  });
  renderPagination(totalPages);
}
function renderPagination(totalPages){
 const parent=document.getElementById('paginationContainer');
 if(!parent)return;
 parent.innerHTML='';
 if(totalPages<2)return;
 const makeButton=(text,page,disabled=false,active=false)=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.disabled=disabled;b.className=active?'page-num active': 'page-num';b.setAttribute('aria-label',text==='‹'?'이전 페이지':text==='›'?'다음 페이지':`${page}페이지`);if(active)b.setAttribute('aria-current','page');b.addEventListener('click',()=>{currentPage=page;renderReviews();});return b;};
 parent.appendChild(makeButton('‹',currentPage-1,currentPage===1));
 const first=Math.max(1,Math.min(currentPage-2,totalPages-4));
 const last=Math.min(totalPages,first+4);
 for(let p=first;p<=last;p++)parent.appendChild(makeButton(String(p),p,false,currentPage===p));
 parent.appendChild(makeButton('›',currentPage+1,currentPage===totalPages));
}

// ==========================================
// 09. 후기 작성 모달 (시연용 로컬 저장)
// ==========================================
function setupReviewDialog(){
  const backdrop=document.getElementById('reviewWriteDialog');
  const open=document.getElementById('openReviewModal');
  const close=document.getElementById('closeReviewModal');
  const cancel=document.getElementById('cancelReviewModal');
  const form=document.getElementById('writeReviewForm');
  const feedback=document.getElementById('reviewFormFeedback');
  if(!backdrop||!open||!close||!form)return;
  let priorFocus=null;
  function hide(){backdrop.hidden=true;document.body.classList.remove('review-dialog-open');priorFocus?.focus();}
  function show(){priorFocus=document.activeElement;feedback.textContent='';backdrop.hidden=false;document.body.classList.add('review-dialog-open');document.getElementById('reviewNickname').focus();}
  open.addEventListener('click',show);
  close.addEventListener('click',hide);
  cancel?.addEventListener('click',hide);
  backdrop.addEventListener('click',e=>{if(e.target===backdrop)hide();});
  document.addEventListener('keydown',e=>{
    if(backdrop.hidden)return;
    if(e.key==='Escape'){hide();return;}
    if(e.key==='Tab'){
      const focusables=[...backdrop.querySelectorAll('button:not([disabled]),input:not([disabled]),textarea:not([disabled])')];
      if(!focusables.length)return;
      const first=focusables[0],last=focusables[focusables.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const nick=document.getElementById('reviewNickname').value.trim();
    const title=document.getElementById('reviewTitle').value.trim();
    const content=document.getElementById('reviewContent').value.trim();
    if(!nick||!title||!content){feedback.textContent='닉네임, 제목, 후기를 모두 작성해 주세요.';return;}
    const file=document.getElementById('reviewPhoto').files[0];
    let imageUrl=null;
    if(file){
      if(file.size>3*1024*1024){feedback.textContent='사진은 3MB 이하로 올려주세요.';return;}
      if(!['image/png','image/jpeg','image/webp'].includes(file.type)){feedback.textContent='PNG, JPG, WebP 이미지만 가능합니다.';return;}
      try {imageUrl=await new Promise((res,rej)=>{const reader=new FileReader();reader.onload=()=>res(reader.result);reader.onerror=rej;reader.readAsDataURL(file);});}
      catch(err){feedback.textContent='사진을 불러오지 못했어요.';return;}
    }
    const review={id:Date.now(),title,text:content,author:nick,date:new Date().toLocaleDateString('ko-KR').replace(/\.\s*/g,'.').replace(/\.$/,''),isPhoto:!!imageUrl,imageUrl,isSample:false};
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');
      saved.unshift(review);
      localStorage.setItem(storageKey,JSON.stringify(saved.slice(0,30)));
    }catch(err){feedback.textContent='브라우저 저장공간이 부족하거나 차단되어 후기를 저장할 수 없어요. 작은 사진으로 다시 시도해 주세요.';return;}
    allReviews.unshift(review);
    currentTab='all';currentPage=1;
    document.querySelectorAll('.tab-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.tab==='all'));
    renderReviews();
    form.reset();hide();
    document.querySelector('.review-list-section')?.scrollIntoView({behavior:'smooth',block:'start'});
  });
}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tab-btn').forEach(other=>other.classList.toggle('active',other===btn));
  currentTab=btn.dataset.tab;currentPage=1;renderReviews();
 }));
 renderReviews();setupReviewDialog();
});

/* 새로 방문한 모바일 페이지는 첫 화면에서 시작; 뒤로가기 위치는 유지 */
if (window.matchMedia('(max-width:768px)').matches && !location.hash) {
  try { history.scrollRestoration = 'manual'; } catch(e) {}
  window.addEventListener('load', () => { window.scrollTo(0,0); }, {once:true});
}
