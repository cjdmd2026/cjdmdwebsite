/* CURO 1형 당뇨 테스트 — 화면 전환 · 타이머 · 점수 · 굿즈 재고(일차별 배정 + 이월) · 기록(이 태블릿 브라우저에 저장) */
(function () {
  const Q = window.QUIZ, $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const stage = $('#stage');
  const KEY = 'curo-test-v1', DAY = 86400000;
  const COVER = { yellow: 'img/cover-yellow.webp?v=321', teal: 'img/cover-teal.webp?v=320', orange: 'img/cover-orange.webp?v=322' };

  /* ---------- 화면 맞춤: #stage = 화면 전체(설계 px), 가운데 내용 .mid(1400×876)가 화면에 다 들어오는 배율 ---------- */
  let lockH = 0;
  function fit() {
    const w = window.innerWidth;
    let h = window.innerHeight;
    if (document.activeElement && document.activeElement.tagName === 'INPUT' && lockH) h = lockH;   // 키보드가 올라와도 화면이 줄지 않게
    else lockH = h;
    const s = Math.min(w / 1400, h / 876), W = w / s, H = h / s;
    stage.style.width = W + 'px'; stage.style.height = H + 'px';
    stage.style.transform = `scale(${s})`;
    stage.style.setProperty('--oy', ((H - 876) / 2) + 'px');
  }
  window.addEventListener('resize', fit); fit();

  /* ---------- 저장 ---------- */
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  function load() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(KEY)); } catch (e) { d = null; }
    d = d || {};
    d.records = d.records || []; d.receipts = d.receipts || [];
    d.set = Object.assign({ start: today(), day: 0, stock: Object.assign({}, Q.stock) }, d.set || {});
    return d;
  }
  let DB = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { /* 저장 불가(시크릿 모드 등) — 화면은 계속 동작 */ } };
  save();

  /* ---------- 재고: 하루 배정 = 총수량 ÷ 일수, 지난날 남은 건 이월 ---------- */
  function dayNo() {
    if (DB.set.day) return DB.set.day;
    const a = new Date(DB.set.start + 'T00:00:00'), b = new Date(today() + 'T00:00:00');
    return Math.min(Q.days, Math.max(1, Math.floor((b - a) / DAY) + 1));
  }
  const released = (id) => Math.floor(DB.set.stock[id] * dayNo() / Q.days);
  const given = (id) => DB.receipts.filter((r) => r.item === id).length;
  const avail = (id) => Math.max(0, released(id) - given(id));
  const KIDS = Q.keyrings.map((k) => k.id);
  const goodsLeft = (g) => g === 'keyring' ? KIDS.reduce((n, id) => n + avail(id), 0) : avail(g);

  /* ---------- 상태 ---------- */
  const S = { cat: null, name: '', ans: [], i: 0, t0: 0, ms: 0, tick: 0, score: 0, mode: 'quiz', recPage: 0 };
  const cat = () => Q.cats.find((c) => c.id === S.cat);
  const fmt = (ms) => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const fmt2 = (ms) => { const s = Math.floor(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')} : ${String(s % 60).padStart(2, '0')}`; };
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function theme(t, bg) { stage.dataset.theme = t; stage.dataset.bg = bg || t; }
  function show(id) {
    $$('.scr').forEach((s) => s.classList.toggle('on', s.id === 's-' + id));
    $$('.modal').forEach((m) => m.classList.remove('on', 'show'));
    if (id !== 'quiz') stopTimer();
  }

  /* ---------- 1. 시작화면 ---------- */
  const DECO = {
    yellow: '<path d="M0 264 A150 150 0 0 1 150 414 L105 414 A105 105 0 0 0 0 309 Z" fill="#FFAE2B"/><circle cx="46" cy="232" r="16" fill="#FFAE2B"/><circle cx="141" cy="276" r="16" fill="#FFAE2B"/><circle cx="192" cy="375" r="16" fill="#FFAE2B"/>',
    teal: '<circle cx="338" cy="193" r="69" fill="none" stroke="#179C91" stroke-width="46"/><path d="M0 312 C 52 296 96 360 158 388 C 210 410 262 398 300 414 L0 414 Z" fill="#179C91"/><circle cx="69" cy="316" r="12" fill="#179C91"/><circle cx="108" cy="358" r="12" fill="#13897F"/><circle cx="171" cy="352" r="12" fill="#179C91"/><circle cx="233" cy="364" r="12" fill="#179C91"/><circle cx="276" cy="406" r="12" fill="#179C91"/>',
    orange: '<circle cx="345" cy="0" r="105" fill="none" stroke="#EB5210" stroke-width="70"/><path d="M0 135 L30 168 L0 202 L30 236 L0 270 L30 304 L0 338 Z" fill="#EB5210"/><circle cx="55" cy="203" r="10" fill="#EB5210"/><circle cx="55" cy="264" r="10" fill="#EB5210"/><circle cx="55" cy="325" r="10" fill="#EB5210"/>'
  };
  const HC = { yellow: ['#FFC94D', '#E2B03D', '#FF6182', '#8BD053'], teal: ['#1EB2A6', '#2B7C75', '#FFAF36', '#D06253'], orange: ['#FF6320', '#D5460A', '#FAD932', '#53CFC4'] };
  $('#home-cards').innerHTML = Q.cats.map((c, i) => {
    const h = HC[c.theme];
    const rings = [47, 127, 206, 286, 365].map((y) => `<i class="rg" style="top:${y - 6}px"></i>`).join('');
    return `<button class="hcard" data-cat="${c.id}" style="left:${142 + i * 390}px;--cc:${h[0]};--cs:${h[1]}">
      <svg viewBox="0 0 345 414" aria-hidden="true">${DECO[c.theme]}</svg>
      <i class="tb" style="left:263px;background:${h[2]}"></i><i class="tb" style="left:290px;background:${h[3]}"></i>${rings}
      <h2>${c.title}</h2><p>${c.sub}</p><span class="go"></span></button>`;
  }).join('');
  $('#home-cards').addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (b) openIntro(b.dataset.cat); });
  function goHome() { S.cat = null; theme('yellow', 'paper'); show('home'); }
  $('#go-records').addEventListener('click', () => openRecords(0));
  document.addEventListener('click', (e) => { const g = e.target.closest('[data-go="home"]'); if (g) goHome(); });

  /* ---------- 2. 시작 전 ---------- */
  function openIntro(id) {
    S.cat = id; const c = cat();
    theme(c.theme, 'cover');
    stage.style.setProperty('--cover', `url('${COVER[c.theme]}')`);
    $('.in-title').textContent = c.title; $('.in-sub').textContent = c.sub;
    renderRank(); $('#name').value = ''; $('#name').classList.remove('shake'); show('intro');
  }
  function renderRank() {
    const best = {};
    DB.records.filter((r) => r.cat === S.cat && r.date === today()).forEach((r) => {
      const b = best[r.name];
      if (!b || r.score > b.score || (r.score === b.score && r.ms < b.ms)) best[r.name] = r;
    });
    const list = Object.values(best).sort((a, b) => b.score - a.score || a.ms - b.ms).slice(0, 30);
    $('#rank').innerHTML = list.length ? list.map((r, i) => `<li${i < 3 ? ' class="top"' : ''}><b>${i + 1}등</b><span>${esc(r.name)}님</span><em>${r.score}점 &nbsp;I&nbsp; ${fmt(r.ms)}</em></li>`).join('')
      : '<li class="none">오늘 첫 번째 도전자가 되어 보세요!</li>';
  }
  $('#name').addEventListener('animationend', (e) => e.target.classList.remove('shake'));
  $('#name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const n = $('#name').value.trim();
    if (!n) { const i = $('#name'); i.classList.remove('shake'); void i.offsetWidth; i.classList.add('shake'); i.focus(); return; }
    S.name = n; $('#name').blur(); setTimeout(fit, 60);
    showList();
  });
  function showList() {
    $('#gl-cols').innerHTML = ['keyring', 'sticker', 'band'].map((g) => {
      const G = Q.goods[g], n = goodsLeft(g);
      return `<div class="gl-col t-${G.tier}"><p class="rg2">${G.range}</p><div class="ph"><img src="${G.img}" alt=""><span class="left${n ? '' : ' sold'}">${n ? n + '개 남음' : '품절'}</span></div><p class="nm"><span>${G.name}</span></p></div>`;
    }).join('');
    const m = $('#m-list'); m.classList.remove('show'); m.classList.add('on');
    void m.offsetWidth; requestAnimationFrame(() => m.classList.add('show'));
  }
  $('#gl-ok').addEventListener('click', () => startQuiz());

  /* ---------- 3. 문제 ---------- */
  $('.rings').innerHTML = [0, 1, 2, 3, 4, 5].map((k) => `<i class="rg" style="top:${76 + k * 79.5}px"></i>`).join('');
  $('#prog').innerHTML = '<i></i>'.repeat(10);
  $('.gl-rings').innerHTML = '<i></i>'.repeat(10);
  function startQuiz() {
    const c = cat();
    S.ans = new Array(c.q.length).fill(null); S.i = 0; S.mode = 'quiz';
    $('#s-quiz').classList.remove('ans'); theme(c.theme);
    $('.dd').src = `img/doodle-${c.theme}.webp`;
    show('quiz'); startTimer(); drawQ();
  }
  function startTimer() { stopTimer(); S.t0 = performance.now(); S.ms = 0; $('#timer').textContent = fmt2(0); S.tick = setInterval(() => { S.ms = performance.now() - S.t0; $('#timer').textContent = fmt2(S.ms); }, 250); }
  function stopTimer() { if (S.tick) { clearInterval(S.tick); S.tick = 0; } }
  function drawQ() {
    const c = cat(), q = c.q[S.i], a = S.ans[S.i], ans = S.mode === 'ans';
    $('.q-ask').textContent = c.ask;
    $('.q-num em').textContent = String(S.i + 1).padStart(2, '0') + '.';
    $('.q-body').innerHTML = esc(q[0]).replace(/℃/g, '<i class="deg"></i>C');   // 주아체에 ℃ 모양이 없어 동그라미를 그림
    $$('.oxb').forEach((b) => b.classList.toggle('sel', b.dataset.a === a));
    $$('#prog i').forEach((p, k) => p.classList.toggle('on', k <= S.i));
    const prev = $('#q-prev'), next = $('#q-next');
    const last = S.i === c.q.length - 1;
    prev.disabled = S.i === 0;
    next.disabled = ans ? last : !a;
    prev.classList.toggle('on', !prev.disabled); next.classList.toggle('on', !next.disabled);
    $$('.rings .rg').forEach((r, k) => { r.style.display = ans && k > 4 ? 'none' : ''; });
    if (ans) {
      const ok = a === q[1];
      const m = $('.q-mark'); m.src = ok ? 'img/mark-right.webp' : 'img/mark-wrong.webp'; m.alt = ok ? '정답' : '오답';
      $('#expl').textContent = q[2];
    }
  }
  $$('.oxb').forEach((b) => b.addEventListener('click', () => {
    if (S.mode === 'ans') return;
    S.ans[S.i] = b.dataset.a; drawQ();
  }));
  $('#q-prev').addEventListener('click', () => { if (S.i > 0) { S.i--; drawQ(); } });
  $('#q-next').addEventListener('click', () => {
    const c = cat();
    if (S.mode === 'ans') { if (S.i < c.q.length - 1) { S.i++; drawQ(); } return; }
    if (!S.ans[S.i]) return;
    if (S.i < c.q.length - 1) { S.i++; drawQ(); return; }
    finish();
  });

  /* ---------- 4. 점수 ---------- */
  function finish() {
    stopTimer(); S.ms = performance.now() - S.t0;
    const c = cat();
    S.score = c.q.reduce((n, q, k) => n + (S.ans[k] === q[1] ? 10 : 0), 0);
    DB.records.push({ cat: S.cat, name: S.name, score: S.score, ms: Math.round(S.ms), date: today(), at: Date.now() });
    save(); S.claimed = false; openScore();
  }
  function openScore() {
    const c = cat();
    theme(c.theme, 'score');
    $('#sc-title').textContent = c.test;
    $('#sc-level').textContent = '당뇨박사 ' + Q.levels.find((l) => S.score >= l.min).name;
    $('#sc-point').textContent = S.score + '점';
    $('#to-goods').style.visibility = S.claimed ? 'hidden' : '';
    show('score');
  }
  $('#q-back').addEventListener('click', openScore);
  $('#to-answer').addEventListener('click', () => { S.mode = 'ans'; S.i = 0; theme(cat().theme); $('#s-quiz').classList.add('ans'); show('quiz'); drawQ(); });
  document.addEventListener('click', (e) => { if (e.target.closest('[data-act="retry"]')) { theme(cat().theme); startQuiz(); } });

  /* ---------- 5. 굿즈 선택 ---------- */
  const card = (o) => `<button class="gcard t-${o.tier}${o.sold ? ' sold' : ''}" data-id="${o.id}" style="${o.hl ? '--hl2:' + o.hl : ''}">
    <img class="clip" src="img/clip-${o.clip || o.tier}.webp" alt=""><span class="ph"><img src="${o.img}" alt="">${o.band != null ? `<span class="left">${o.band}</span>` : ''}</span>
    <span class="pz">${o.pz}</span><span class="nm"><span>${o.nm}</span></span>${o.more ? '<span class="more"></span>' : ''}</button>`;
  function openGoods() {
    const c = cat(); theme(c.theme);
    const sc = $('#s-goods'); sc.classList.remove('k', 'rec');
    $('#g-title').textContent = '굿즈 선택';
    const ok = ['keyring', 'sticker', 'band'].filter((g) => S.score >= Q.goods[g].min);
    $('#gcards').className = 'gcards';
    $('#gcards').innerHTML = ok.map((g) => {
      const G = Q.goods[g], n = goodsLeft(g);
      return card({ id: g, tier: G.tier, img: G.img, band: n ? n + '개 남음' : '품절', sold: !n, pz: G.prize, nm: G.name, more: g === 'keyring' && n });
    }).join('');
    show('goods');
  }
  function openKeyrings() {
    const sc = $('#s-goods'); sc.classList.add('k');
    $('#gcards').className = 'gcards k4';
    $('#gcards').innerHTML = Q.keyrings.map((k) => {
      const n = avail(k.id);
      return card({ id: 'k:' + k.id, tier: 'yellow', img: k.img, sold: !n, pz: n ? n + '개 남음' : '품절', nm: k.name, hl: k.hl });
    }).join('');
  }
  $('#to-goods').addEventListener('click', openGoods);
  $('#g-skip').addEventListener('click', goHome);
  $('#g-back').addEventListener('click', () => { if ($('#s-goods').classList.contains('rec')) goHome(); else openGoods(); });
  $('#gcards').addEventListener('click', (e) => {
    const b = e.target.closest('.gcard'); if (!b || $('#s-goods').classList.contains('rec')) return;
    const id = b.dataset.id;
    if (b.classList.contains('sold')) return ask('해당 굿즈는 품절 상품입니다.\n다른 굿즈를 골라주세요.', null);
    if (id === 'keyring') return openKeyrings();
    const item = id.startsWith('k:') ? id.slice(2) : id;
    const label = id.startsWith('k:') ? `큐로 키링(${Q.keyrings.find((k) => k.id === item).name})` : Q.goods[id].name;
    ask(`'${label}'를 수령하시겠습니까?\n(수령 확정 후 변경 불가)`, () => claim(item));
  });
  function claim(item) {
    if (avail(item) < 1) return ask('해당 굿즈는 품절 상품입니다.\n다른 굿즈를 골라주세요.', null);
    DB.receipts.push({ item, name: S.name, cat: S.cat, score: S.score, ms: Math.round(S.ms), day: dayNo(), date: today(), at: Date.now() });
    save(); S.claimed = true; goHome();
  }

  /* ---------- 팝업 ---------- */
  let onYes = null;
  function ask(msg, yes) { $('#m-msg').textContent = msg; onYes = yes; $('#m-alert').classList.add('on'); }
  $('#m-no').addEventListener('click', () => $('#m-alert').classList.remove('on'));
  $('#m-yes').addEventListener('click', () => { $('#m-alert').classList.remove('on'); const f = onYes; onYes = null; if (f) f(); });

  /* ---------- 수령 기록 ---------- */
  const itemInfo = (item) => {
    const k = Q.keyrings.find((x) => x.id === item);
    if (k) return { img: k.img, nm: '큐로 키링', tier: 'yellow' };
    const G = Q.goods[item]; return { img: G.img, nm: G.name, tier: G.tier };
  };
  function openRecords(p) {
    theme('yellow');
    const sc = $('#s-goods'); sc.classList.remove('k'); sc.classList.add('rec');
    $('#g-title').textContent = '수령 기록';
    const list = DB.receipts.slice().reverse(), pages = Math.max(1, Math.ceil(list.length / 4));
    S.recPage = Math.min(Math.max(0, p), pages - 1);
    const part = list.slice(S.recPage * 4, S.recPage * 4 + 4);
    $('#gcards').className = 'gcards k4';
    $('#gcards').innerHTML = part.length ? part.map((r) => { const I = itemInfo(r.item); return card({ id: '', tier: I.tier, clip: 'yellow', img: I.img, pz: I.nm, nm: esc(r.name) + '님' }); }).join('')
      : '<p style="align-self:center;font-size:30px;color:#C9B58C">아직 수령 기록이 없어요</p>';
    const pv = $('#r-prev'), nx = $('#r-next');
    pv.disabled = S.recPage === 0; nx.disabled = S.recPage >= pages - 1;
    pv.classList.toggle('on', !pv.disabled); nx.classList.toggle('on', !nx.disabled);
    show('goods');
  }
  $('#r-prev').addEventListener('click', () => openRecords(S.recPage - 1));
  $('#r-next').addEventListener('click', () => openRecords(S.recPage + 1));

  /* ---------- 관리 메뉴: 수령 기록 제목을 2초 꾹 ---------- */
  let lp = 0;
  const tt = $('.tape-title');
  tt.addEventListener('pointerdown', () => { if (!$('#s-goods').classList.contains('rec')) return; lp = setTimeout(openAdmin, 1800); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => tt.addEventListener(ev, () => clearTimeout(lp)));
  const NAMES = { beary: '키링 베어리', mio: '키링 미오', ellie: '키링 엘리', rabby: '키링 래비', sticker: '스티커', band: '밴드' };
  function openAdmin() {
    const d = dayNo(), ids = Object.keys(NAMES);
    const rows = ids.map((id) => `<tr><td>${NAMES[id]}</td><td><input type="number" min="0" data-stock="${id}" value="${DB.set.stock[id]}"></td><td>${(DB.set.stock[id] / Q.days).toFixed(DB.set.stock[id] % Q.days ? 1 : 0)}</td><td>${released(id)}</td><td>${given(id)}</td><td class="ad-big">${avail(id)}</td></tr>`).join('');
    const byDay = [1, 2, 3, 4].map((k) => `<td>${DB.receipts.filter((r) => r.day === k).length}</td>`).join('');
    $('#admin').innerHTML = `<button class="ad-x" id="ad-x">×</button><div class="ad-box">
      <h3>관리 메뉴</h3><p class="hint">이 태블릿 브라우저에만 저장돼요. 시크릿 모드로 열거나 브라우저 데이터를 지우면 기록이 사라지니, 중간중간 '기록 내려받기'로 백업해 두세요.</p>
      <h4>전시 일차 — 지금 <span class="ad-big">${d}일차</span></h4>
      <div class="row">전시 첫날 <input type="date" id="ad-start" value="${DB.set.start}">
        일차 정하기 <select id="ad-day"><option value="0">날짜로 자동</option>${[1, 2, 3, 4].map((k) => `<option value="${k}"${DB.set.day === k ? ' selected' : ''}>${k}일차로 고정</option>`).join('')}</select></div>
      <p class="hint">보통은 '날짜로 자동'에 두세요. 테스트할 때만 일차를 고정해서 확인하면 돼요.</p>
      <h4>굿즈 수량</h4>
      <table><tr><th>품목</th><th>총수량</th><th>하루 배정</th><th>${d}일차까지 풀린 수량</th><th>나간 수량</th><th>지금 남은 수량</th></tr>${rows}</table>
      <p class="hint">하루 배정 = 총수량 ÷ ${Q.days}일. 그날 남은 건 다음 날로 이월돼요. (예: 1일차에 엘리 키링 1개가 나가면 그날은 품절, 2일차에 다시 1개)</p>
      <div class="row" style="margin-top:10px"><button class="a" id="ad-save">수량 저장</button></div>
      <h4>기록</h4>
      <table><tr><th>응시 기록</th><th>수령 기록</th><th>1일차 수령</th><th>2일차</th><th>3일차</th><th>4일차</th></tr><tr><td>${DB.records.length}</td><td>${DB.receipts.length}</td>${byDay}</tr></table>
      <div class="row" style="margin-top:12px"><button class="a" id="ad-csv">기록 내려받기 (엑셀용 CSV)</button><button class="a gray" id="ad-undo">마지막 수령 1건 취소</button></div>
      <h4>초기화</h4>
      <div class="row"><button class="a red" id="ad-clr-rank">오늘의 랭킹 · 응시 기록 지우기</button><button class="a red" id="ad-clr-rec">수령 기록 지우기 (재고 원상복구)</button><button class="a red" id="ad-clr-all">전부 처음으로 (전시 시작 전 테스트 후)</button></div>
    </div>`;
    $('#admin').classList.add('on');
  }
  $('#admin').addEventListener('click', (e) => {
    const t = e.target, id = t.id;
    if (id === 'ad-x' || t === $('#admin')) { $('#admin').classList.remove('on'); openRecords(S.recPage); return; }
    if (id === 'ad-save') { $$('[data-stock]').forEach((i) => { DB.set.stock[i.dataset.stock] = Math.max(0, parseInt(i.value, 10) || 0); }); save(); openAdmin(); }
    if (id === 'ad-undo') { const r = DB.receipts[DB.receipts.length - 1]; if (r && confirm(`${r.name}님의 ${NAMES[r.item] || r.item} 수령을 취소할까요?`)) { DB.receipts.pop(); save(); openAdmin(); } }
    if (id === 'ad-csv') csv();
    if (id === 'ad-clr-rank' && confirm('응시 기록(랭킹)을 모두 지울까요?')) { DB.records = []; save(); openAdmin(); }
    if (id === 'ad-clr-rec' && confirm('수령 기록을 모두 지울까요? 재고가 처음 상태로 돌아가요.')) { DB.receipts = []; save(); openAdmin(); }
    if (id === 'ad-clr-all' && confirm('응시·수령 기록과 설정을 모두 지우고, 오늘을 전시 첫날로 정할까요?')) { localStorage.removeItem(KEY); DB = load(); save(); openAdmin(); }
  });
  $('#admin').addEventListener('change', (e) => {
    if (e.target.id === 'ad-start') { DB.set.start = e.target.value || today(); save(); openAdmin(); }
    if (e.target.id === 'ad-day') { DB.set.day = parseInt(e.target.value, 10) || 0; save(); openAdmin(); }
  });
  function csv() {
    const cn = (id) => (Q.cats.find((c) => c.id === id) || {}).title || id;
    const t = (ms) => new Date(ms).toLocaleString('ko-KR');
    const lines = ['구분,시각,일차,이름,과목,점수,걸린 시간,굿즈'];
    DB.receipts.forEach((r) => lines.push(['수령', t(r.at), r.day, r.name, cn(r.cat), r.score, fmt(r.ms), NAMES[r.item]].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')));
    DB.records.forEach((r) => lines.push(['응시', t(r.at), '', r.name, cn(r.cat), r.score, fmt(r.ms), ''].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv' }));
    a.download = `curo-test-기록-${today()}.csv`; document.body.appendChild(a); a.click(); a.remove();
  }

  goHome();
})();
