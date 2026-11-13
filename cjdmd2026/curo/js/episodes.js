/* ==========================================================================
   STORY 페이지 (68차) — story.html 전용. 목록 ↔ 영상 보기 두 화면.
   - 목록: 히어로 + 1~7화 카드 (열린 화만 클릭·hover, 잠긴 화는 반응 없음)
   - 영상 보기: story.html#ep-N  (주소 hash 로 전환 → 브라우저 뒤로 가기 = 목록)
     왼쪽 = 제목 + 영상(없으면 임시 배경) + 줄거리 3줄, 오른쪽 = 다음 이야기 목록 + 연속재생 스위치
   내용·썸네일·영상 파일·열린 화 수는 아래 CURO_STORY 에서 수정
   ========================================================================== */
window.CURO_STORY = {
  unlocked: 1,                                   // 1화부터 몇 화까지 열려 있는지 (나머지는 자물쇠)
  placeholder: 'assets/images/story/hero.webp',  // 영상이 아직 없을 때 영상 자리에 보이는 임시 배경
  episodes: [
    { title: '큐로 가디언즈의 시작', thumb: 'assets/images/story/ep-1.webp?v=69', video: 'https://player.mux.com/029pK5x9JcrlyMa1acjdqo02I3WnUtydXO8uR022W1XQnE',   // 359차: Mux 영상 교체 (354차 영상 대신)
      summary: ['콩이는 주사기에서 나온 동물 친구들을 만나게 돼요.', '“우리는 콩이의 몸을 지켜주는 가디언즈야!”', '가디언즈에게 주사 방법을 배우고, 주사 연습 벨트를 착용해 직접 연습하며 주사에 대한 두려움을 이겨내요.'] },
    { title: '주사 준비 대작전', thumb: 'assets/images/story/ep-2.webp?v=69', video: '',
      summary: ['주사를 맞으려던 콩이는 필요한 물건들이 흩어져 있는 것을 발견해요.', '“어라? 주사를 맞으려면 뭐가 필요하지?”', '가디언즈와 함께 필요한 준비물을 하나씩 확인하며 주사를 준비하는 방법을 배워요.'] },
    { title: '깨끗깨끗! 손 씻기', thumb: 'assets/images/story/ep-3.webp?v=69', video: '',
      summary: ['주사를 맞으려던 콩이를 미오가 급하게 불러요.', '“잠깐! 주사하기 전에 손부터 깨끗하게 씻어야 해!”', '콩이는 가디언즈와 함께 손을 깨끗하게 씻으며 주사 전 위생 관리 방법을 배워요.'] },
    { title: '어디에 놓을까?', thumb: 'assets/images/story/ep-4.webp?v=69', video: '',
      summary: ['주사를 맞으려던 콩이는 어디에 주사를 놓아야 할지 고민해요.', '“주사는 어디에 놓아야 하지?”', '가디언즈에게 주사할 위치를 확인하는 방법을 배우며 올바른 주사 위치를 알아가요.'] },
    { title: '용감하게 하나, 둘!', thumb: 'assets/images/story/ep-5.webp?v=69', video: '',
      summary: ['이번에는 콩이가 가디언즈의 도움 없이 직접 해보기로 해요.', '“이번에는 내가 직접 해볼래!”', '콩이는 배운 순서대로 차근차근 주사를 연습하고, 가디언즈는 곁에서 응원해줘요.'] },
    { title: '주사 후에도 꼼꼼하게!', thumb: 'assets/images/story/ep-6.webp?v=69', video: '',
      summary: ['주사를 끝낸 콩이는 신이 나서 바로 놀러 가려고 해요.', '“콩이야! 주사가 끝났다고 끝난 게 아니야!”', '베어리와 함께 사용한 물품을 정리하고 주사 후 해야 할 일을 확인해요.'] },
    { title: '오늘의 주사 기록하기', thumb: 'assets/images/story/ep-7.webp?v=69', video: '',
      summary: ['주사를 마친 콩이는 오늘의 주사 이야기를 일기에 적어보기로 해요.', '“오늘은 내가 혼자서 주사 연습에 성공했어!”', '가디언즈와 함께 오늘의 주사 과정을 기록하며 주사 후 기록하는 습관을 배워요.'] }
  ],
  icons: { play: 'assets/icons/play.svg', lock: 'assets/icons/lock.svg' }
};

(function () {
  'use strict';
  const S = window.CURO_STORY, EP = S.episodes, N = EP.length;
  const root = document.documentElement;
  const open = (i) => i < S.unlocked;                       // i = 0-based
  const icon = (k) => encodeURI(S.icons[k]);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const name = (i) => `${i + 1}화. ${EP[i].title}`;

  /* ---------- 목록 카드 ---------- */
  const grid = document.getElementById('st-grid');
  grid.innerHTML = EP.map((e, i) => {
    const on = open(i);
    const thumb = `<span class="st-thumb"><img src="${esc(e.thumb)}" width="1600" height="900" alt="" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">`
      + `<span class="st-thumb-ic"><img src="${icon(on ? 'play' : 'lock')}" alt=""></span></span>`;
    const text = `<h3 class="st-ct">${esc(name(i))}</h3><p class="st-cd">${esc(e.summary[0])} ${esc(e.summary[1])}</p>`;
    return on
      ? `<li class="st-card is-open"><a href="#ep-${i + 1}" aria-label="${esc(name(i))} 영상 보기">${thumb}${text}</a></li>`
      : `<li class="st-card is-locked" aria-disabled="true"><div aria-label="${esc(name(i))} (아직 열리지 않았어요)">${thumb}${text}</div></li>`;
  }).join('');

  /* ---------- 영상 보기 ---------- */
  const vTitle = document.getElementById('sw-title'), vBox = document.getElementById('sw-video'), vDesc = document.getElementById('sw-desc');
  const side = document.getElementById('sw-list');
  /* 189차: 폰에서 줄거리 접기/펼치기 버튼 (PC 에서는 CSS 로 숨김) */
  const swEl = document.querySelector('.sw');
  const more = document.createElement('button');
  more.type = 'button'; more.className = 'sw-more'; more.setAttribute('aria-controls', 'sw-desc');
  vDesc.parentNode.insertBefore(more, vDesc);
  function setDesc(on) {
    swEl.classList.toggle('is-desc-open', on);
    more.setAttribute('aria-expanded', on ? 'true' : 'false');
    more.innerHTML = (on ? '줄거리 접기' : '줄거리 보기') + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  more.addEventListener('click', () => setDesc(!swEl.classList.contains('is-desc-open')));
  function renderSide(cur) {
    side.innerHTML = EP.map((e, i) => {
      const on = open(i), now = i === cur;
      const inner = `<span class="sw-thumb"><img src="${esc(e.thumb)}" width="1600" height="900" alt="" loading="lazy" decoding="async">${on ? '' : `<span class="sw-lock"><img src="${icon('lock')}" alt=""></span>`}</span>`
        + `<span class="sw-it"><span class="sw-itt">${esc(name(i))}</span>${now ? '<span class="sw-now">재생 중</span>' : ''}</span>`;
      if (!on) return `<li class="sw-item is-locked" aria-disabled="true">${inner}</li>`;
      return `<li class="sw-item${now ? ' is-now' : ''}"><a href="#ep-${i + 1}"${now ? ' aria-current="true"' : ''}>${inner}</a></li>`;
    }).join('');
    const nowEl = side.querySelector('.is-now');
    if (nowEl) side.scrollTop = Math.max(0, nowEl.offsetTop - side.offsetTop - 8);
  }
  let vimeoQ = null;
  function withVimeo(cb) {   // Vimeo player.js 는 영상 볼 때 한 번만 불러옴
    if (window.Vimeo && window.Vimeo.Player) return cb();
    if (!vimeoQ) { vimeoQ = []; const sc = document.createElement('script'); sc.src = 'https://player.vimeo.com/api/player.js'; sc.onload = () => vimeoQ.forEach((f) => f()); document.head.appendChild(sc); }
    vimeoQ.push(cb);
  }
  function renderWatch(i) {
    const e = EP[i];
    vTitle.textContent = name(i);
    const vimeo = /player\.vimeo\.com/.test(e.video), mux = /player\.mux\.com/.test(e.video);   // 354차: Mux 플레이어도 iframe   // 353차: Vimeo 주소면 Vimeo 플레이어(iframe), 아니면 영상 파일
    const next = () => { if (auto.checked && open(i + 1) && i + 1 < N) location.hash = `#ep-${i + 2}`; };
    vBox.innerHTML = !e.video
      ? `<img class="sw-ph" src="${esc(S.placeholder)}" alt="" aria-hidden="true">`
      : mux
        ? `<iframe src="${esc(e.video)}" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen title="${esc(name(i))}"></iframe>`
      : vimeo
        ? `<iframe src="${esc(e.video)}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="${esc(name(i))}"></iframe>`
        : `<video src="${esc(e.video)}" controls playsinline poster="${esc(e.thumb)}"></video>`;
    const v = vBox.querySelector('video'), fr = vBox.querySelector('iframe');
    if (v) v.addEventListener('ended', next);
    if (fr) withVimeo(() => { try { new window.Vimeo.Player(fr).on('ended', next); } catch (err) { /* */ } });   // 연속재생 = Vimeo player.js 'ended'
    vDesc.innerHTML = '<span>' + e.summary.map(esc).join('<br>') + '</span>';
    setDesc(false);
    renderSide(i);
    document.title = `CURO — STORY · ${name(i)}`;
  }

  /* 연속재생 스위치 (영상이 생기면: 끝나면 다음 열린 화로) */
  const auto = document.getElementById('sw-auto');
  try { auto.checked = localStorage.getItem('curo-story-auto') === '1'; } catch (err) { /* 저장 불가 환경 */ }
  auto.addEventListener('change', () => { try { localStorage.setItem('curo-story-auto', auto.checked ? '1' : '0'); } catch (err) { /* */ } });

  /* ---------- 화면 전환 (hash) ---------- */
  function route() {
    const m = /^#ep-(\d+)$/.exec(location.hash);
    const i = m ? +m[1] - 1 : -1;
    const watch = i >= 0 && i < N && open(i);
    if (m && !watch) { history.replaceState(null, '', location.pathname); }
    root.classList.toggle('st-watch', watch);
    if (watch) renderWatch(i); else document.title = 'CURO — STORY';
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();

  /* 위로 가기 버튼 표시 / 맨 위로 (공통 floating) */
  const onScroll = () => root.classList.toggle('float-top-on', window.scrollY > window.innerHeight * 0.4);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (window.CURO_FLOAT) window.CURO_FLOAT.onTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
})();
