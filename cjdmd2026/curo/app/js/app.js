/* CURO 앱 프로토타입 — 화면 전환(hash) + 화면 그리기
   - 데이터는 시안 속 예시 값으로 고정 (저장 · 서버 없음)
   - 화면 하나 = SCREENS 의 함수 하나 (HTML 문자열을 돌려줌) */
(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const BASE = document.documentElement.dataset.base || '';   /* 사이트에서는 app.html (data-base="app/") 로 열림 */
  const I = (n) => `${BASE}img/${n}.webp`;
  const app = $('#app');

  /* ---------- 화면 크기: 시안(390 폭) 그대로 비율 맞춤 ---------- */
  const frameEl = $('#frame'), root = document.documentElement;
  if (/[?&]mock=1/.test(location.search)) root.classList.add('mock');
  function fit() {
    const z = (root.classList.contains('mock') ? 390 : Math.min(window.innerWidth, 480)) / 390;
    frameEl.style.zoom = z;
    root.style.setProperty('--vh', (window.innerHeight / z).toFixed(2) + 'px');
  }
  fit(); window.addEventListener('resize', fit);

  /* ---------- 상태 (화면 사이에서 유지) ---------- */
  const S = {
    guardian: { name: '김민주', birth: '1984. 11. 25', rel: '어머니', phone: '010 - 1234 - 5678', face: 'mio' },
    kid: { name: '이서준', birth: '2011. 02. 16', sex: '여자 아이', diag: '2020. 08. 20', face: 'beary' },
    char: 0,
    liked: {}, hlike: {}, bm: {}, post: 0, recs: {}, addFor: 'rec-weight',   /* 2차: 좋아요는 처음엔 모두 꺼짐 */
    toggles: { allNoti: true, myPost: true, dark: false }
  };
  const CHARS = [
    { id: 'beary', name: '베어리' }, { id: 'ellie', name: '엘리' }, { id: 'rabby', name: '래비' }, { id: 'mio', name: '미오' }
  ];

  /* ---------- 공통 조각 ---------- */
  const back = (white) => `<button class="back${white ? ' w' : ''}" data-back aria-label="뒤로"><img src="${I(white ? 'i-back-w' : 'i-back')}" alt=""></button>`;
  const topC = (title, right = '', white = false) => `<header class="top top-c${white ? ' light' : ''}">${back(white)}<span class="top-t">${title}</span><div class="r">${right}</div></header>`;
  const topBack = (white) => `<header class="top">${back(white)}</header>`;
  const logoTop = (icons, white) => `<header class="top ${white ? 'light' : 'dark'}"><img class="logo" src="${I(white ? 'logo-white' : 'logo-dark')}" alt="CURO"><div class="icons">${icons}</div></header>`;
  const icon = (n, go, dot) => `<button class="ic-btn" ${go ? `data-go="${go}"` : ''}><img src="${I(n)}" alt="">${dot ? '<i class="dot"></i>' : ''}</button>`;

  function calGrid(sel, cls = 'mcal', days = 31, heads = true) {
    const h = heads ? ['월', '화', '수', '목', '금', '토', '일'].map((d) => `<b>${d}</b>`).join('') : '';
    let c = '';
    for (let d = 1; d <= days; d++) c += `<span data-day="${d}" class="${d === sel ? 'is-on' : ''}${cls === 'mcal' && [5, 6, 8, 9, 10].includes(d) ? ' bd' : ''}">${d}</span>`;
    return `<div class="${cls}">${h}${c}</div>`;
  }

  /* 차트 — 시안(빠른 기록)에서 잰 자리. svg 390 × 206 = 화면 폭 그대로
     세로축 글자 오른쪽 끝 x 44, 가로줄 x 51 → 오른쪽 끝(점점 흐려짐), 맨 위 줄 y 10, 0 줄 y 190
     가로 글자 가운데 = 65 + 63·i (시간) / 68 + 65·i (요일), 막대 폭 16 */
  const XL = ['오전 0시', '오전 1시', '오전 2시', '오전 3시', '오전4시', '오전 5시'];
  const XD = ['월', '화', '수', '목', '금'];
  let gid = 0;
  function frame(ticks, yOf, labels, xs, body) {
    const id = 'g' + (++gid);
    let g = `<defs><linearGradient id="${id}l" x1="51" x2="390" gradientUnits="userSpaceOnUse"><stop offset=".8" stop-color="#E6E6E6"/><stop offset="1" stop-color="#E6E6E6" stop-opacity="0"/></linearGradient>
      <linearGradient id="${id}t" x1="0" x2="1"><stop offset=".86" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>`;
    ticks.forEach((t) => { const y = yOf(t); g += `<line x1="51" x2="390" y1="${y}" y2="${y}" stroke="url(#${id}l)" stroke-width="${t ? 1 : 1.5}"/><text x="44" y="${y + 3}" font-size="8.5" text-anchor="end" fill="#222">${t}</text>`; });
    g += body;
    labels.forEach((l, i) => { g += `<text x="${xs(i)}" y="205" font-size="8" text-anchor="middle" fill="${i > 4 ? '#BBB' : '#222'}">${l}</text>`; });
    g += `<rect x="330" y="0" width="60" height="206" fill="url(#${id}t)"/>`;
    return `<svg viewBox="0 0 390 210" width="390" height="210">${g}</svg>`;
  }
  const lin = (max) => (v) => 190 - 180 * v / max;
  const xT = (i) => 65 + 63 * i, xD = (i) => 68 + 65 * i;
  function areaChart(pts, max = 200) {
    const y = lin(max), id = 'a' + (++gid);
    const d = `M51 190 L51 ${y(pts[0][1])} ` + pts.map(([x, v]) => `L${x} ${y(v)}`).join(' ') + ' L390 190 Z';
    const body = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD98C"/><stop offset="1" stop-color="#FFF6E2" stop-opacity=".6"/></linearGradient></defs><path class="g-up" d="${d}" fill="url(#${id})"/>`;
    return frame([200, 150, 100, 50, 0], y, XL, xT, body);
  }
  const GLU = [[51, 113], [67, 113], [128, 135], [191, 118], [254, 100], [317, 100], [390, 92]];
  function rangeChart(r, max = 200) {
    const y = lin(max);
    const body = r.map(([lo, hi, light], i) => `<rect class="g-mid" style="animation-delay:${i * 70}ms" x="${xT(i) - 8}" y="${y(hi)}" width="16" height="${y(lo) - y(hi)}" rx="8" fill="${light ? '#FFE09A' : '#FFC94D'}"/>`).join('');
    return frame([200, 150, 100, 50, 0], y, XL, xT, body);
  }
  /* 체중: 세로축 60 · 50 · 40 · 30 · 0 (30 아래는 줄여 그림), 막대는 위만 둥글고 아래는 바닥에 붙음 */
  function weightChart(vals) {
    const y = (v) => (v >= 30 ? 145 - (v - 30) * 4.5 : 190 - v * 1.5);
    const body = vals.map(([v, light], i) => { const x = xD(i) - 8, t = y(v); return `<path class="g-up" style="animation-delay:${i * 70}ms" d="M${x} 190 V${t + 8} a8 8 0 0 1 16 0 V190 Z" fill="${light ? '#FFE09A' : '#FFC94D'}"/>`; }).join('');
    return frame([60, 50, 40, 30, 0], y, XD, xD, body);
  }
  const BP = [[45, 168], [75, 128, 1], [45, 168], [55, 148], [68, 134], [85, 120, 1]];
  const WT = [[45], [41, 1], [45], [45], [46]];

  const TOAST = $('#toast');
  let tt = 0;
  function toast(t) { TOAST.textContent = t; TOAST.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => TOAST.classList.remove('is-on'), 1500); }

  /* ---------- 화면들 ---------- */
  const SCREENS = {
    splash: () => `<div class="splash"><img src="${I('symbol')}" alt="CURO"></div>`,

    start: () => `<img class="start-logo" src="${I('logo-dark')}" alt="CURO"><div class="gap"></div>
      <div class="start-btns"><a class="btn tall" data-go="login">로그인</a><a class="btn tall line" data-go="easy">간편 로그인</a><div class="links"><a data-go="signup">회원 가입하기</a></div></div>`,

    easy: () => `${topBack()}<div class="ttl"><h1>간편 로그인</h1><p>적은 터치로 손쉬운 로그인</p></div><div class="gap"></div>${snsBtns()}
      <div class="links" style="margin:12px 0 53px"><a data-toast="가입한 휴대폰 번호로 아이디를 보내 드렸어요">아이디 찾기</a><span>|</span><a data-toast="비밀번호 재설정 링크를 보내 드렸어요">비밀번호 찾기</a></div>`,

    login: () => `${topBack()}<div class="ttl"><h1>계정 로그인</h1><p>기존에 생성한 계정으로 로그인</p></div><div class="gap" style="max-height:59px"></div>
      <div class="fld big"><label style="margin-bottom:7px">ID</label><input class="inp" id="lg-id" autocomplete="off"></div>
      <div class="fld big" style="margin-top:18px"><label style="margin-bottom:6px">Password</label><div class="inp-wrap"><input class="inp" id="lg-pw" type="password"><button class="eye" data-eye="lg-pw"><img src="${I('i-eye-off')}" alt="보기"></button></div>
      <button class="chk" data-chk><i></i>자동로그인</button></div>
      <div class="fld" style="margin-top:17px"><a class="btn is-off" id="lg-go" data-go="home">로그인</a><div class="links" style="margin-top:11px"><a data-toast="가입한 휴대폰 번호로 아이디를 보내 드렸어요">아이디 찾기</a><span>|</span><a data-toast="비밀번호 재설정 링크를 보내 드렸어요">비밀번호 찾기</a></div></div>
      <div class="gap" style="max-height:91px"></div><div class="or">or</div><div class="gap" style="max-height:25px"></div>${snsBtns()}<div class="links" style="margin:11px 0 0"><a data-go="signup">회원 가입하기</a></div><div class="gap" style="max-height:53px"></div>`,

    signup: () => `${topBack()}<div class="ttl"><h1>회원 가입</h1><p>생성할 계정의 정보를 적어주세요.</p></div><div class="gap" style="max-height:84px"></div>
      <div class="fld big"><label style="margin-bottom:7px">ID</label><input class="inp" id="su-id" autocomplete="off"></div>
      <div class="fld big" style="margin-top:18px"><label style="margin-bottom:6px">Password</label><div class="inp-wrap"><input class="inp" id="su-pw" type="password"><button class="eye" data-eye="su-pw"><img src="${I('i-eye-off')}" alt="보기"></button></div>
      <input class="inp" id="su-pw2" type="password" style="margin-top:13px" placeholder="비밀번호 확인"></div>
      <div class="fld" style="margin-top:29px"><a class="btn is-off" id="su-go" data-go="terms">다음</a></div><div class="gap"></div>`,

    terms: () => `${topBack()}<div class="ttl"><h1>${S.guardian.name}님 반갑습니다!</h1><p>서비스 사용을 위한 약관 동의입니다.</p></div>
      <div class="terms">
        <h3>필수적 약관 동의<button class="ck" data-ck="req" aria-label="필수 약관 모두 동의"></button></h3>
        <ul>${['서비스 이용약관', '본인확인 서비스 이용약관', '개인정보 수집/이용약관', '위치기반 서비스 이용약관', '만 14세 이상입니다'].map((t) => `<li>(필수) ${t}<img src="${I('i-chev')}" alt=""></li>`).join('')}</ul>
        <h3>선택적 약관 동의<button class="ck" data-ck="opt" aria-label="선택 약관 모두 동의"></button></h3>
        <ul><li>(선택) 마케팅 정보 수신 동의<img src="${I('i-chev')}" alt=""></li><li>(선택) 제 3자 정보 제공 동의<img src="${I('i-chev')}" alt=""></li></ul>
      </div>
      <div class="notice">※약관 동의 안내※<br>자유에 따라 선택 약관 동의에 거부할 수 있으나,<br>필수항목 동의 거부 시에는 회원가입 및 이용이 제한됩니다.</div><div class="gap"></div>
      <div class="foot-btn shadow"><a class="btn is-off" id="tm-go" data-go="kid">전체 동의</a></div>`,

    kid: () => profileForm('kid'),
    guardian: () => profileForm('guardian'),

    home: () => `<div class="home-head">${logoTop(icon('i-siren', 'sos') + icon('i-bell', 'noti', true), true)}
        <h2>오늘의 컨디션</h2>
        <a class="kid-card" data-go="condition"><div><b>${S.kid.name}</b><p>우리 아이 혈당 확인하러 가기</p></div><img src="${I('kid-boy')}" alt=""></a>
        <div class="vitals"><div><b>혈당</b><span>160<small>mg/dL</small></span></div><div><b>혈압</b><span>130/80<small>mmHg</small></span></div><div><b>체중</b><span>22.4<small>kg</small></span></div></div>
        </div><div class="home-wave"><svg viewBox="0 0 390 40" width="390" height="40" preserveAspectRatio="none"><path d="M0 0H390V19Q195 59 0 19Z" fill="#37BBB0"/></svg></div>
      <div class="home-body">
        <h3>지금 먹어도 될까?</h3>
        <a class="calc-card" data-go="cal"><small>사진 하나로 간편하게!</small><b>열량 계산기</b><p>현재 섭취 칼로리 : 600 Kcal</p><img src="${I('il-camera')}" alt=""><span class="mini-pill">바로가기</span></a>
        <h3>빠른 기록</h3>
        <div class="quick">
          <a data-go="rec-glucose"><b>혈당</b><img src="${I('il-glucose')}" alt=""><span class="mini-pill">입력하기</span></a>
          <a data-go="rec-bp"><b>혈압 / 심박수</b><img src="${I('il-heart')}" alt=""><span class="mini-pill">입력하기</span></a>
          <a data-go="rec-weight"><b>체중</b><img src="${I('il-weight')}" alt=""><span class="mini-pill">입력하기</span></a>
          <a data-go="rec-meal"><b>식사</b><img src="${I('il-meal')}" alt=""><span class="mini-pill">입력하기</span></a>
        </div>
        <h3>혈당 분석</h3>
        <div class="ana" data-go="condition">
          <div><div class="ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="53" fill="none" stroke="#E6F6F5" stroke-width="10"/><circle cx="60" cy="60" r="53" fill="none" stroke="#1EB2A6" stroke-width="10" stroke-dasharray="333" stroke-dashoffset="16" stroke-linecap="round"/><circle cx="60" cy="60" r="42" fill="none" stroke="#FFF1CC" stroke-width="8"/><circle cx="60" cy="60" r="42" fill="none" stroke="#FFC94D" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="62" stroke-linecap="round"/></svg><div class="c"><b>180<small>mg/dL</small></b><em>혈당주의</em></div></div><div class="ring-cap">목표 혈당 100</div></div>
          <div class="ana-r"><b>이번주</b><p><span>180</span> / 100</p><b>이번달</b><p><span>110</span> / 90</p><div class="lg"><i style="background:#1EB2A6"></i>오늘의 혈당</div><div class="lg"><i style="background:#FFC94D"></i>목표 혈당 100</div></div>
        </div>
        <a class="hosp-card" data-go="hospital"><b>가까운 전문 병원</b><small>내 주변 1형 당뇨 전문 병원을 찾아봐요.</small><img src="${I('il-hospital')}" alt=""><div class="ft"><span data-go="hosp-visit">방문 병원</span><span data-go="hospital">근처 병원 3</span></div></a>
      </div>`,

    noti: () => `${topC('알림', icon('i-gear', 'noti-set'))}
      <div class="chips" style="margin:22px 0 0">${chips(['전체', '인슐린', '혈압', '저혈당', '리포트'])}</div>
      <div class="noti">
        <a data-go="sos"><span class="ico" style="background:#1EB2A6"><img src="${I('i-warn')}" alt="" style="width:6px"></span><div><small>[긴급]</small><b>혈당이 70mg/dL 미만입니다!</b></div></a>
        <a data-go="condition"><span class="ico"><img src="${I('i-symbol-w')}" alt=""></span><div><small>[리포트]</small><b>오늘 탄수화물 섭취 기록이 부족합니다</b></div></a>
        <a data-go="edu"><span class="ico"><img src="${I('i-symbol-w')}" alt=""></span><div><small>[인슐린]</small><b>인슐린 투여 시간을 잊지 말고 체크해 주세요</b></div></a>
        <a data-go="sos"><span class="ico"><img src="${I('i-symbol-w')}" alt=""></span><div><small>[긴급]</small><b>아이가 평소보다 물을 많이 찾나요?</b></div></a>
      </div>`,

    'noti-set': () => `${topC('알림')}<div class="setl" style="margin-top:8px">
      <div class="it">모든 알림 표시${tg('allNoti')}</div><div class="it">내 게시글 알림${tg('myPost')}</div><a class="it" data-info="notiTime">알림 설정</a></div>`,

    settings: () => `${topC('설정')}<div class="setl">
      <h3>알림</h3><div class="it">모든 알람 표시${tg('allNoti')}</div><div class="it">내 게시글 관리${tg('myPost')}</div><a class="it" data-go="noti-set">알림 설정</a><a class="it" data-info="display">화면 설정</a><hr>
      <h3>앱 설정</h3><div class="it ind">다크모드${tg('dark')}</div><a class="it ind" data-info="keyword">관심 키워드 설정</a><a class="it ind" data-info="lock">암호/지문 잠금</a><a class="it ind" data-info="link">계정연동</a><hr>
      <h3>이용 안내</h3><div class="it ind">앱 버전<span class="ver">1.0.0 (최신)</span></div><a class="it ind" data-info="ask">문의하기</a><a class="it ind" data-info="notice">공지사항</a><a class="it ind" data-info="leave">회원탈퇴</a></div>`,

    condition: () => `<div class="mhead" style="padding-bottom:46px">${topC('5월', icon('i-siren', 'sos'), true)}${calGrid(11)}</div>
      <div class="sheet">
      <h2 class="sec">혈당 기록</h2>${statBox([['최고', '140', 'mg/dL'], ['최저', '98', 'mg/dL']], 'rec-glucose')}<div class="chart">${areaChart(GLU)}</div>
      ${feed('취침 후 야간 혈당이 목표 범위 안에서 안정적으로 유지되었습니다.<br>새벽 시간대 저혈당이나 급격한 변동 없이 완만한 흐름을 보이고 있어요.')}<div class="sec-gap"></div>
      <h2 class="sec">혈압 기록</h2>${statBox([['최고', '210', 'mmHg'], ['최저', '80', 'mmHg'], ['', '65', 'bpm']], 'rec-bp')}<div class="chart">${rangeChart(BP)}</div>
      ${stage('관심', 55)}${feed('오늘 아침식사 후 혈당이 조금 높아졌어요. 간식 시간을 조절해 볼까요?<br>저녁 운동 후 혈당을 한 번 더 확인해 보세요.')}<div class="sec-gap"></div>
      <h2 class="sec">체중 기록</h2>${statBox([['최고', '36.0', 'kg'], ['최저', '30.2', 'kg']], 'rec-weight')}<div class="chart">${weightChart(WT)}</div>
      ${stage('적정', 48)}${feed('체중 변화가 안정적입니다. 탄수화물 계량 완료와 고혈당 인슐린 2단위 주입이 잘 기록되었습니다. 추가 주입 시 용량에 주의하세요.')}<div class="sec-gap"></div>
      <h2 class="sec">섭취 계산</h2>${statBox([['누적 섭취 칼로리', '1,100', 'kcal']], 'rec-meal')}${nut()}
      ${feed('디저트와 균형 잡힌 키토김밥, 월남쌈으로 구성된 식사를 하셨네요. 단백질과 지방, 탄수화물 밸런스가 비교적 잘 잡혀 있으며, 당분 섭취량도 적당합니다.')}<div class="blank"></div></div>`,

    'rec-glucose': () => recPage('혈당', [['156', 'mg/dL']], '혈당 기록', statBox([['최고', '140', 'mg/dL'], ['최저', '98', 'mg/dL']]), `<div class="chart">${areaChart(GLU)}</div>`,
      '', '취침 후 야간 혈당이 목표 범위 안에서 안정적으로 유지되었습니다.<br>새벽 시간대 저혈당이나 급격한 변동 없이 완만한 흐름을 보이고 있어요.', addCard('공복 혈당', '오후 6시 22분', '118 <small>mg/dL</small>', 'm-glucose')),
    'rec-bp': () => recPage('혈압 / 심박수', [['145', 'mmHg'], ['78', 'bpm']], '혈압 기록', statBox([['최고', '210', 'mmHg'], ['최저', '80', 'mmHg'], ['', '65', 'bpm']]), `<div class="chart">${rangeChart(BP)}</div>`,
      stage('관심', 55), '오늘 아침식사 후 혈당이 조금 높아졌어요. 간식 시간을 조절해 볼까요?<br>저녁 운동 후 혈당을 한 번 더 확인해 보세요.', addCard('혈압', '오후 6시 22분', '140 <small>mmHg</small>', 'm-bp')),
    'rec-weight': () => recPage('체중', [['34.1', 'kg']], '체중 기록', statBox([['최고', '36.0', 'kg'], ['최저', '30.2', 'kg']]), `<div class="chart">${weightChart(WT)}</div>`,
      stage('적정', 48), '체중 변화가 안정적입니다. 탄수화물 계량 완료와 고혈당 인슐린 2단위 주입이 잘 기록되었습니다. 추가 주입 시 용량에 주의하세요.', addCard('메모', '활동 및 체중 관리 일지', '꾸준한 운동을 통해서 체중을 조절해야하기 때문에 오늘도 2시간 동안 수영을 진행', 'm-memo', true)),
    'rec-meal': () => recPage('식사', [['1,100', 'kcal']], '섭취 계산', statBox([['누적 섭취 칼로리', '1,100', 'kcal']]) + nut(), '',
      '', '디저트와 균형 잡힌 키토김밥, 월남쌈으로 구성된 식사를 하셨네요. 단백질과 지방, 탄수화물 밸런스가 비교적 잘 잡혀 있으며, 당분 섭취량도 적당합니다.',
      `<div class="sec-gap"></div><h2 class="sec">식사 앨범</h2><div class="album">${[['f-gimbap', '키토김밥', 300], ['f-dessert', '귤 디저트', 500], ['f-wolnam', '월남쌈', 300]].map(([f, n, k]) => `<figure><img src="${I(f)}" alt=""><figcaption><span>${n}</span>${k} kcal</figcaption></figure>`).join('')}</div>`
      + '<div class="sec-gap"></div><h2 class="sec">추가 기록</h2>' + addCard('간식', '오후 6시 22분', '<b class="lg">가나 초콜릿 한 조각</b>', 'm-snack')),

    cal: () => `<div class="rhead">${topC('열량 계산', '', true)}<div class="date">2026. 5. 9</div><div class="val"><div><b>1,100<small>kcal</small></b></div></div></div>
      <div class="sheet"><h2 class="sec">오늘은 어떤 걸 먹을까요?</h2>
      <div class="three"><a data-go="cal-search"><img src="${I('il-search')}" alt="">검색하기</a><a data-go="cal-camera"><img src="${I('il-camera')}" alt="">촬영하기</a><a data-go="cal-load"><img src="${I('il-load')}" alt="">불러오기</a></div>
      <div class="two"><div><small>현재 혈당</small><b>156 <small>mg/dL</small></b></div><div><small>현재 몸무게</small><b>34.1 <small>kg</small></b></div></div>
      <h2 class="sec" style="margin-top:45px">현재 상태</h2><div class="chart">${areaChart(GLU)}</div>
      <div class="feed"><b>섭취 추천</b><p>디저트와 균형 잡힌 키토김밥, 월남쌈으로 구성된 식사를 하셨네요. 단백질과 지방, 탄수화물 밸런스가 비교적 잘 잡혀 있으며, 당분 섭취량도 적당합니다.</p></div>
      <div class="pad"><a class="btn line-mint" data-go="cal-search">추천받기</a></div><div class="blank"></div></div>`,

    'cal-search': () => `${topC('검색', icon('i-bm-b'))}<div class="search"><input placeholder="음식을 검색해 보세요"><img src="${I('i-search')}" alt=""></div>
      <div class="sort"><img src="${I('i-sort')}" alt="">추천순</div>
      <div class="foods">${FOODS.map((f) => `<div class="food"><div class="ph"><img src="${I(f.img)}" alt="">${f.reco ? '<em>추천</em>' : ''}</div><div><b>${f.name}</b><p>${f.desc}</p></div>
        <button class="heart" data-like="${f.id}"><img src="${I(S.liked[f.id] ? 'i-like-on' : 'i-like-off')}" alt="좋아요"></button><button class="pick-b" data-go="food">선택하기</button></div>`).join('')}</div>`,

    'cal-camera': () => `<div class="cam-view"><img src="${I('f-dessert')}" alt="">${topBack(true)}<div class="cam-foot"></div><button class="shutter" data-go="food" aria-label="촬영"></button></div>`,

    'cal-load': () => `<div class="mhead" style="padding-bottom:46px">${topC('5월', icon('i-bm-b'), true)}${calGrid(11)}</div>
      <div class="sheet"><h2 class="sec">하루 식사</h2><div class="day-meal">
      <figure data-go="food"><img src="${I('f-chicken')}" alt=""><em>아침</em><figcaption><span>닭가슴살 &amp; 감자</span>340kcal</figcaption></figure>
      <figure data-go="food"><img src="${I('f-tofu')}" alt=""><em>점심</em><figcaption><span>두부버섯</span>320kcal</figcaption></figure></div>
      <div class="sec-gap"></div><h2 class="sec">자주 먹는 메뉴</h2><div class="freq">
      ${[['닭가슴살 샐러드', 310], ['현미곤약밥 &amp; 두부구이', 340], ['호밀빵 닭가슴살 샌드위치', 285], ['통들깨 미역국', 120], ['무당 GREEK 요거트 &amp; 견과류', 175]].map(([n, k], i) => `<a class="${i > 2 ? 'w' : ''}" data-go="food"><em>${i + 1}</em><div><b>${n}</b><span>${k} <small>kcal</small></span></div></a>`).join('')}</div>
      <div class="pad"><a class="btn line-mint">더보기</a></div><div class="blank"></div></div>`,

    food: () => `<div class="fd-photo"><img src="${I('f-dessert')}" alt="">${topBack(true)}<div class="kc">480 <small>kcal</small></div><div class="ftg"><span>귤</span><span>치즈케이크</span></div></div>
      <div class="fd-sheet"><div class="fd-name">귤 디저트<button data-like="dessert"><img src="${I(S.liked.dessert ? 'i-like-on' : 'i-like-off')}" alt="좋아요"></button></div>
      <div class="nut" style="margin-top:4px">${[['탄수화물', '55g'], ['식이섬유', '3g'], ['단백질', '7g'], ['지방', '20g'], ['염분', '150~250mg']].map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>
      <div class="sec-gap"></div><p class="big-q"><span>귤 디저트</span>를 섭취하면,<br>혈당이 빠르게 상승할 것으로 예상되요.</p>
      <div class="chart">${areaChart([[51, 60], [67, 62], [128, 95], [191, 150], [254, 132], [317, 108], [390, 96]])}</div>
      ${feed('귤 디저트를 섭취하면, 버터 크러스트와 크림치즈의 단순 정제 탄수화물과 설탕 및 시럽 함량이 높아 혈당이 급격하게 상승한 후 빠르게 감소할 것으로 예상돼요.', '예상 혈당')}
      <div class="sec-gap"></div><h2 class="sec">추천 메뉴</h2><div class="reco">
      ${[['r-chicken', '닭가슴살 덮밥', '아침', 520], ['r-salad', '샐러드', '점심', 310], ['r-bibim', '나물 비빔밥', '저녁', 560], ['r-sujebi', '녹차 수제비', '간식', 380]].map(([f, n, t, k]) => `<figure><img src="${I(f)}" alt=""><em>${t}</em><figcaption><span>${n}</span>${k} kcal</figcaption></figure>`).join('')}</div>
      <div class="pad"><a class="btn line-mint" data-go="cal-search">더보기</a></div>
      <div class="pad" style="padding-bottom:30px"><a class="btn" data-go="rec-meal">한 끼 선택</a></div></div>`,

    edu: () => `<div class="edu-head">${logoTop(icon('i-cal-w', 'roadmap'), true)}
      <div class="slides" id="edu-slides">
        <div class="slide"><h2>학습현황</h2><div class="study"><img src="${I(CHARS[S.char].id + '-full-t')}" alt="">
          <div class="r"><div class="hd"><b>${CHARS[S.char].name}<span style="font-weight:400">와 학습 중</span></b><button data-swap aria-label="캐릭터 바꾸기"><img src="${I('i-swap')}" alt=""></button></div>
          <ul><li><i></i>벨트를 활용한 주사 연습 진행</li><li><i></i>오늘의 학습 일지 작성</li><li class="off"><i></i>동화책 2화 보기</li></ul></div></div>
          <div class="prog">학습 완료 : 70%<div class="bar"><i style="width:70%"></i></div></div></div>
        <div class="slide"><h2>교구 연동</h2><div class="devs"><a><img src="${I('il-doll')}" alt="">인형</a><a><img src="${I('il-belt')}" alt="">벨트</a><a><img src="${I('il-tablet')}" alt="">태블릿</a></div>
          <div class="prog2"><div class="prog">인형 : 80%<div class="bar"><i style="width:80%"></i></div></div><div class="prog">벨트 : 50%<div class="bar"><i style="width:50%"></i></div></div></div></div>
      </div><div class="dots"><i class="is-on"></i><i></i></div></div>
      <div class="edu-sheet"><h3>2026년 5월</h3><div class="week">${['월', '화', '수', '목', '금', '토', '일'].map((d, i) => `<button class="${i ? '' : 'is-on'}" data-wk>${d}</button>`).join('')}</div>${lessons()}</div><div class="blank"></div>`,

    roadmap: () => `<div class="road-head">${topBack(true)}<small>2026. 5. 9</small><h2>학습 1일 째</h2><img class="peek" src="${I(CHARS[S.char].id + '-peek')}" alt=""></div>
      <div class="road-sheet"><div class="grab"></div><div class="month"><img src="${I('i-prev')}" alt="">5월<img src="${I('i-next')}" alt=""></div>
      <div class="rcal">${['월', '화', '수', '목', '금', '토', '일'].map((d) => `<b>${d}</b>`).join('')}${road()}</div>
      <div class="legend"><span><i style="background:var(--red)"></i>인형</span><span><i style="background:var(--orange)"></i>주사</span><span><i style="background:var(--yellow)"></i>벨트</span><span><i style="background:#6DCB75"></i>실제연습</span></div>
      <div class="road-hr"></div>
      <div style="padding:0 28px"><div class="lesson-sort"><h3>학습내용</h3><span>정확도 순<img src="${I('i-sort')}" alt=""></span></div>${lessons()}</div><div class="blank"></div></div>`,

    sos: () => `${topC('긴급')}<div class="search" style="margin-top:20px"><input><img src="${I('i-search')}" alt=""></div>
      <div class="chips" style="margin:11px 0 0">${chips(['전체', '인슐린', '혈압', '저혈당', '리포트', '리포트'])}</div>
      <div class="posts">${GUIDES.map((g, i) => `<a class="post" data-guide="${i}" data-go="guide"><div class="kw">${g.kw.map((k) => `<span>${k}</span>`).join('')}</div><h4>${g.t}</h4><p>${g.sum}</p><div class="mt"><span>CURO 긴급 매뉴얼 | 조회 ${g.v}</span><span><img src="${I('i-comments')}" alt="">${g.c}</span></div></a>`).join('')}</div>
      <a class="fab" href="tel:119"><img src="${I('i-sos')}" alt="">긴급전화</a>`,

    guide: () => { const g = GUIDES[S.guide || 0];
      return `${topC('긴급 매뉴얼')}<div class="info"><div class="kw">${g.kw.map((k) => `<span>${k}</span>`).join('')}</div><h2>${g.t}</h2><p class="lead">${g.sum}</p>
        ${g.steps.map(([h, t], i) => `<div class="stp"><em>${i + 1}</em><div><b>${h}</b><p>${t}</p></div></div>`).join('')}
        <div class="note">${g.call ? '<b>바로 119</b> ' + g.call + '<br>' : ''}이 매뉴얼은 일반적인 안내예요. 실제 대처는 담당 의료진이 정해 준 방법을 먼저 따라 주세요.</div></div>
        <a class="fab" href="tel:119"><img src="${I('i-sos')}" alt="">긴급전화</a>`; },

    info: () => { const d = INFO[S.info] || INFO.guide;
      return `${topC(d.t)}<div class="info">${d.lead ? `<p class="lead">${d.lead}</p>` : ''}${d.body}</div><div class="blank"></div>`; },

    com: () => `${logoTop(icon('i-search') + icon('i-more'))}
      <div class="ctabs" data-tabs>${['전체', '제품', '정보'].map((t, i) => `<button class="${i ? '' : 'is-on'}">${t}</button>`).join('')}</div>
      <div class="chips" style="margin:11px 0 0">${chips(['전체', '인슐린', '혈압', '저혈당', '리포트', '리포트'])}</div>
      <div class="posts">${POSTS.map((p, i) => postItem(p, i)).join('')}</div>
      <a class="fab" data-go="write"><span class="pl">+</span>글쓰기</a>`,

    post: () => { const p = POSTS[S.post] || POSTS[0], bm = S.bm[S.post];
      return `<header class="top post-top">${back()}<div class="bc">커뮤니티<small>전체 게시판</small></div><div class="icons"><span class="ic-btn"><img src="${I('i-more')}" alt=""></span></div></header>
      <div class="pd"><button class="bm${bm ? ' is-on' : ''}" data-bm aria-label="북마크"><img src="${I(bm ? 'i-bm-on' : 'i-bm-b')}" alt=""></button><div class="au" style="margin-top:0"><img src="${I(p.face)}" alt=""><div><b>${p.au}</b><small>${p.ago || '방금 전'}</small></div></div>
      <h2>${p.t}</h2>
      <p>${p.full || p.p}</p>
      ${p.ims ? `<div class="pd-ims">${p.ims.map((m) => `<img src="${I(m)}" alt="">`).join('')}</div>` : ''}
      <div class="kw">${p.kw.map((k) => `<span>${k}</span>`).join('')}</div>
      <div class="mt" style="margin-top:14px"><span><img src="${I('i-share')}" alt="" style="height:10px;width:auto;display:inline;vertical-align:-1px;opacity:.5"> ${p.share || 0}</span><span><img src="${I('i-comments')}" alt="" style="height:9px;width:auto;display:inline;vertical-align:-1px;opacity:.5"> ${p.cm || 0}</span></div></div>
      <div class="cmt">${(p.cm ? (p.cmts || [['cm-rabby', '래비 깡총', '저희는 피하 수액을 집에서 매일 맞추고, 흐르는 정수기 물을 주니 음수량이 늘었어요! 가장 중요한 건 스트레스 관리였어요.', 0], ['cm-ellie-t', '엘리 천하무적', '헉, 저희 아이도 그렇게 했는데 정말 많이 좋아졌어요!<br>이방법 다른 분들도 써보셨으면 해요! 완전 강추강추!!', 1], ['cm-mio', '미오 공부 중', '헉, 저희 아이도 그렇게 했는데 정말 많이 좋아졌어요!<br>이방법 다른 분들도 써보셨으면 해요! 완전 강추강추!!', 1], ['cm-beary', '멍 때리는 베어리', '저희는 피하 수액을 집에서 매일 맞추고, 흐르는 정수기 물을 주니 음수량이 늘었어요! 가장 중요한 건 스트레스 관리였어요.', 0]]) : []).map(([f, n, t, re]) => `<div class="c${re ? ' re' : ''}"><div class="au" style="margin-top:0"><img src="${I(f)}" alt=""><div><b>${n}</b><small>5시간 전</small></div></div><p>${t}</p><time>2026.7.31 16:59</time><img class="more" src="${I('i-more-g')}" alt=""></div>`).join('')}</div>
      <div class="reply"><div><input placeholder="댓글을 입력해주세요."><button data-toast="댓글이 등록됐어요"><img src="${I('i-reply')}" alt="보내기"></button></div></div>`; },

    write: () => `<header class="top top-c"><button class="back x" data-back aria-label="닫기"><img src="${I('i-close')}" alt=""></button><span class="top-t">글쓰기</span><div class="r"><button data-post style="font-size:14px">등록</button></div></header>
      <input class="write-t" placeholder="제목을 입력하세요"><textarea class="write-b" placeholder="내용을 작성해주세요."></textarea><div class="write-img" id="w-img"></div>`,

    my: () => `${logoTop(icon('i-gear', 'settings'))}
      <div class="prof"><div class="pic"><img src="${I(S.guardian.face + '-face')}" alt=""></div><div><b>${S.guardian.name}님</b><p><a data-go="profile">프로필 수정</a> | <a data-go="start">로그아웃</a></p></div></div>
      <div class="mydev"><a><img src="${I('il-doll')}" alt="">인형</a><a><img src="${I('il-belt')}" alt="">벨트</a><a><img src="${I('il-tablet')}" alt="">태블릿</a></div>
      <div class="mylist"><h3>렌탈기기</h3><a data-info="guide">사용 가이드</a><a data-info="rental">렌탈 정보</a><hr><h3>리포트</h3><a data-go="condition">하루 요약</a><a data-info="docs">병원서류 제출</a><hr><h3>커뮤니티</h3><a data-info="limit">이용 제한 내역</a><a data-info="keyword">관심 키워드 설정</a><a data-info="rules">커뮤니티 이용규칙</a><hr><h3>긴급</h3><a data-go="sos">긴급 메뉴얼</a><a data-go="hospital">가까운 전문 병원</a></div><div class="blank"></div>`,

    profile: () => `${topC('프로필 수정')}<div class="avatar pf-av"><img src="${I(S.guardian.face + '-face')}" alt=""></div>
      <div class="pf-name"><b>${S.guardian.name}님</b><p>ID: KMJ_1984</p></div>
      <div class="fld" style="margin-top:28px"><label>생년월일</label><button class="inp inp-cal" data-date="pf"><img src="${I('i-cal')}" alt="">0000. 00. 00.</button></div>
      <div class="fld"><label>관계</label><div class="seg" data-seg><button>어머니</button><button>아버지</button></div></div>
      <div class="fld"><label>전화번호</label><input class="inp" placeholder="010 - 0000 - 0000"></div>
      <div class="fld"><label>주소</label><input class="inp" placeholder="서울 영등포구 63로 50 한화금융센터_63"></div>
      <div class="fld"><label>메모</label><textarea class="inp" style="height:91px"></textarea></div>
      <div class="gap"></div><div class="foot-btn shadow"><a class="btn" data-back data-toast="저장됐어요">저장</a></div>`,

    hospital: () => `${topC('근처 병원', icon('i-search-b') + icon('i-bell-b', 'noti'))}
      <div class="map-box"><img src="${I('map-h')}" alt="지도"><span class="pin" style="left:40%;top:36%"></span></div>
      <div class="hsheet"><div class="grab"></div>${HOSP.map((h, i) => hosItem(h, i)).join('')}<div class="blank"></div></div>`,

    'rec-add': () => `<header class="top top-c">${back()}<span class="top-t">추가 기록</span><div class="r"><button data-recsave style="font-size:14px">등록</button></div></header>
      <input class="write-t" id="ra-t" placeholder="제목을 입력하세요"><textarea class="write-b" id="ra-b" placeholder="기록을 작성해주세요."></textarea>`,

    'hosp-visit': () => `${topC('방문 병원', icon('i-bell-b', 'noti'))}<div class="search" style="margin-top:20px"><input><img src="${I('i-search')}" alt=""></div>
      <div class="sort"><img src="${I('i-sort')}" alt="">추천순</div>
      <div class="hlist">${[0, 1].map((i) => hosItem(HOSP[i], i, false, 'visit')).join('')}</div>`,

    'hospital-map': () => `${S.hfrom === 'visit' ? topC('방문 병원', icon('i-search-b') + icon('i-bell-b', 'noti')) : logoTop(icon('i-search-b') + icon('i-bell-b', 'noti'))}
      <div class="map-full"><img class="mp" src="${I('map-v')}" alt="지도"><span class="pin" style="left:46%;top:46%"></span><span class="loc"><i></i></span></div>
      <div class="hsheet"><div class="grab"></div>${hosItem(HOSP[S.hosp || 0], S.hosp || 0, true)}</div>`
  };

  /* ---------- 데이터 ---------- */
  const FOODS = [
    { id: 'salad', img: 'r-salad', name: '샐러드', reco: 1, desc: '신선한 제철 채소와 아삭한 옥수수, 방울토마토가 어우러져 한 끼를 산뜻하고 건강하게 채워주는 프레시 샐러드' },
    { id: 'chicken', img: 'r-chicken', name: '닭가슴살 덮밥', reco: 1, desc: '담백하게 구운 닭가슴살과 고소한 영양 곡물, 신선한 채소를 푸짐하게 얹어 가볍고 든든하게 즐기는 건강 덮밥' },
    { id: 'bibim', img: 'r-bibim', name: '나물 비빔밥', desc: '정성껏 볶아낸 정갈한 각종 나물과 고소한 계란후라이, 매콤달콤한 특제 양념장이 어우러진 전통 비빔밥' },
    { id: 'sujebi', img: 'r-sujebi', name: '녹차 수제비', desc: '은은한 녹차 향을 품은 쫀득한 수제비 반죽과 깊고 시원하게 우려낸 맑은 국물이 매력적인 힐링 수제비' },
    { id: 'miyeok', img: 'r-miyeok', name: '미역국', desc: '부드러운 미역과 쫄깃한 소고기를 푹 고아내어 속을 따뜻하고 든든하게 풀어주는 진한 고기 미역국' },
    { id: 'juk', img: 'r-juk', name: '닭죽', desc: '부드럽게 찢은 닭고기와 구수한 육수로 정성껏 끓여내어 소화가 잘 되는 든든한 닭죽' },
    { id: 'samgye', img: 'r-samgye', name: '삼계탕', desc: '영양 가득한 재료를 넣고 푹 끓여낸 진한 국물의 보양 삼계탕' },
    { id: 'doenjang', img: 'r-doenjang', name: '된장찌개', desc: '구수한 된장에 두부와 채소를 듬뿍 넣어 끓인 집밥 된장찌개' }
  ];
  const POSTS = [
    { kw: ['#인슐린', '#저혈당'], face: 'cm-rabby', au: '활기찬 래비', t: '심장 철렁한 순간', p: '안녕하세요. 저는 1형 당뇨를 판정받은지 아직 3일밖에 안된 한 아이의 엄마입니다. 저는 아직 모르는 점이 많은데 오늘 인슐린을 제시간에 맞지 못하여 아이에게 저혈당이 와서 정말 놀랐어요.',
      full: '안녕하세요. 저는 1형 당뇨를 판정받은지 아직 3일밖에 안된 한 아이의 엄마입니다.<br><br>저는 아직 모르는 점이 많은데 오늘 인슐린을 제시간에 맞지 못하여 아이에게 저혈당 쇼크가 왔었어요. 이번 일로 정말 놀랐는데, 앞으로 저혈당이 오면 아이를 어떻게 관리해주는 게 좋을까요?', ago: '6시간 전', share: 73, cm: 800,
      cmts: [['cm-mio', '미오 공부 중', '저도 처음에 똑같이 놀랐어요. 주스나 포도당 사탕을 늘 가방에 넣어 다니니까 마음이 훨씬 놓이더라고요.', 0], ['cm-rabby', '활기찬 래비', '감사해요! 오늘 바로 챙겨 둘게요.', 1], ['cm-ellie-t', '엘리 천하무적', '15분 뒤에 꼭 다시 재 보세요. 저희는 앱 긴급 매뉴얼 보면서 순서대로 했어요!', 0], ['cm-beary', '멍 때리는 베어리', '아이가 놀라지 않게 침착하게 말해 주는 것도 중요하더라고요. 힘내세요!', 0]] },
    { kw: ['#리포트', '#학습'], face: 'cm-ellie-t', au: '엘리 천하무적', t: 'CURO 키트 첫 연습!', p: '오늘은 기다리던 CURO 서비스 키트로 학습을 본격적으로 시작했어요. 아이가 태블릿을 빨리 사용하고 싶어서 엄청 보챘는데, 정말 게임하는 것처럼 아이가 즐겁게 연습했어요.', ims: ['f-dessert', 'f-tofu', 'f-mandu'],
      full: '오늘은 기다리던 CURO 서비스 키트로 학습을 본격적으로 시작했어요.<br><br>아이가 태블릿을 빨리 사용하고 싶어서 엄청 보챘는데, 정말 게임하는 것처럼 아이가 즐겁게 연습했어요. 인형에게 먼저 주사 연습을 해 보고, 벨트를 차고 직접 해 보니 훨씬 덜 무서워하더라고요!', ago: '12분 전', share: 41, cm: 143,
      cmts: [['cm-beary-t', '노래 부르는 베어리', '저희 아이도 베어리랑 연습하더니 주사 시간을 기다려요 ㅎㅎ', 0], ['cm-ellie-t', '엘리 천하무적', '맞아요! 게임처럼 하니까 무서워하지 않더라고요.', 1], ['cm-rabby', '래비 깡총', '벨트 연습은 며칠째부터 하셨어요? 저희도 곧 시작하려고요!', 0], ['cm-ellie-t', '엘리 천하무적', '인형 연습 5일 하고 6일째부터 했어요. 로드맵대로 따라가면 돼요!', 1]] },
    { kw: ['#BUN/Cre', '#수치관리'], face: 'cm-beary-t', au: '노래 부르는 베어리', t: 'BUN/Cre 수치, 집에서 낮출 수 있는 꿀팁 공유해요.', p: '병원에서 CKD 2기 진단받았습니다. BUN이 45, Cre가 2.8이에요. 피하 수액 말고 집에서 음수량을 늘리는 확실한 노하우나 식사량 늘리는 방법이 궁금합니다.',
      full: '병원에서 CKD 2기 진단받았습니다. BUN이 45, Cre가 2.8이에요. 피하 수액 말고 집에서 음수량을 늘리는 확실한 노하우나 식사량 늘리는 방법이 궁금합니다.<br><br>정말 절실합니다. 저희 아이와 같은 진단을 받으신 분들께서는 어떻게 아이를 관리하셨나요??', ago: '6시간 전', share: 73, cm: 800 }
  ];
  const GUIDES = [
    { kw: ['#저혈당', '#긴급'], t: '저혈당일 때 (70mg/dL 미만)', v: '12,840', c: 96, call: '아이가 의식이 없거나 삼키지 못하면 입으로 아무것도 주지 말고 바로 119에 연락하세요.',
      sum: '식은땀, 떨림, 어지러움, 갑자기 짜증을 내면 저혈당일 수 있어요. 먼저 혈당을 재고 빨리 흡수되는 당을 주세요.',
      steps: [['혈당 재기', '증상이 있으면 바로 혈당을 재요. 잴 수 없는 상황이면 저혈당으로 보고 대처해요.'], ['빠른 당 15g 먹이기', '주스 반 컵(120~150ml), 포도당 사탕, 설탕물처럼 빨리 흡수되는 당을 줘요. 초콜릿·과자는 흡수가 느려요.'], ['15분 뒤 다시 재기', '아직 70mg/dL 미만이면 한 번 더 15g 을 줘요.'], ['돌아오면 간식', '식사 시간이 멀었다면 빵·우유 같은 간식을 조금 먹여 다시 떨어지지 않게 해요.'], ['기록 남기기', '시간, 혈당, 먹은 것을 빠른 기록에 남겨 의료진과 함께 봐요.']] },
    { kw: ['#고혈당', '#케톤'], t: '고혈당일 때 (250mg/dL 이상)', v: '8,215', c: 54, call: '구토가 계속되거나, 숨이 가쁘고 과일 냄새가 나거나, 아이가 처지면 바로 응급실로 가세요.',
      sum: '목이 자주 마르고 소변을 자주 보면 고혈당일 수 있어요. 케톤이 함께 있는지 확인하는 게 중요해요.',
      steps: [['혈당과 케톤 확인', '혈당이 250mg/dL 이상이면 소변이나 혈액 케톤을 확인해요.'], ['물 충분히', '당이 없는 물을 자주 마시게 해요.'], ['인슐린은 처방대로', '추가(교정) 인슐린은 의료진이 정해 준 용량대로만 맞춰요.'], ['2~3시간마다 다시 재기', '내려가지 않거나 케톤이 나오면 담당 병원에 연락해요.']] },
    { kw: ['#인슐린', '#깜빡'], t: '인슐린 주사를 깜빡했을 때', v: '6,402', c: 31,
      sum: '놓친 걸 알았다고 두 번 맞추면 저혈당이 올 수 있어요. 먼저 혈당을 재고 의료진 지침을 확인해요.',
      steps: [['혈당 먼저', '지금 혈당을 재서 기록해요.'], ['두 번 맞추지 않기', '놓친 양을 한꺼번에 더 맞추지 않아요.'], ['담당 병원에 문의', '언제, 얼마나 맞출지는 담당 의료진에게 확인해요.'], ['알림 켜 두기', '앱 알림 설정에서 인슐린 시간 알림을 켜 두면 다음에 놓치지 않아요.']] },
    { kw: ['#아플때', '#감기'], t: '아이가 아플 때 (감기·장염)', v: '5,977', c: 42, call: '물을 전혀 마시지 못하거나 구토가 반나절 넘게 이어지면 바로 병원에 가세요.',
      sum: '아프면 잘 먹지 않아도 혈당이 오르거나 크게 흔들릴 수 있어요. 평소보다 자주 재는 게 가장 중요해요.',
      steps: [['2~4시간마다 혈당', '밤에도 평소보다 자주 재요.'], ['기저 인슐린은 멈추지 않기', '못 먹어도 기저 인슐린은 의료진과 상의 없이 끊지 않아요.'], ['물·전해질 자주', '조금씩 자주 마시게 해요.'], ['케톤 확인', '혈당이 높으면 케톤도 함께 확인해요.']] },
    { kw: ['#응급실', '#준비물'], t: '병원에 갈 때 챙길 것', v: '4,330', c: 18,
      sum: '급하게 병원에 가야 할 때를 대비해 미리 챙겨 두면 좋은 것들이에요.',
      steps: [['혈당 기록', '앱의 하루 요약 화면을 보여 주면 최근 혈당을 바로 알릴 수 있어요.'], ['인슐린과 주사 도구', '사용 중인 인슐린 이름과 용량을 메모해 두세요.'], ['빠른 당', '주스, 포도당 사탕을 챙겨요.'], ['연락처', '담당 병원과 보호자 연락처를 적어 두세요.']] }
  ];
  const INFO = {
    guide: { t: '사용 가이드', lead: 'CURO 키트는 인형 → 주사 → 벨트 → 실제 연습 순서로 30일 동안 함께해요.', body: [['인형 연습', '베어리 인형에게 먼저 주사를 놓아 보며 순서를 익혀요.'], ['주사 연습', '연습용 주사기로 소독 → 잡기 → 누르기 → 정리 순서를 반복해요.'], ['벨트 연습', '연습 벨트를 배에 차고 실제 위치에 놓는 연습을 해요.'], ['태블릿 연동', '태블릿을 켜고 마이 > 기기에서 연동하면 연습 기록이 학습현황에 쌓여요.']].map(([h, t], i) => `<div class="stp"><em>${i + 1}</em><div><b>${h}</b><p>${t}</p></div></div>`).join('') },
    rental: { t: '렌탈 정보', body: `<dl class="kv"><dt>이용 상품</dt><dd>CURO 키트 60일</dd><dt>이용 기간</dt><dd>2026. 05. 01 ~ 2026. 06. 29</dd><dt>남은 기간</dt><dd>D-51</dd><dt>구성</dt><dd>인형 · 연습 벨트 · 태블릿 · 동화책</dd><dt>반납 방법</dt><dd>기간이 끝나면 받은 상자에 담아 두세요. 택배 기사님이 찾아가요.</dd></dl>` },
    docs: { t: '병원서류 제출', lead: '진료 때 보여 줄 기록을 PDF 로 만들어 병원에 보낼 수 있어요.', body: `<dl class="kv"><dt>기간</dt><dd>최근 2주</dd><dt>포함 내용</dt><dd>혈당 · 혈압 · 체중 · 식사 · 인슐린 기록</dd><dt>받는 곳</dt><dd>CM병원 (방문 병원)</dd></dl><div class="pad" style="padding:20px 0 0"><a class="btn" data-toast="CM병원으로 기록을 보냈어요">기록 보내기</a></div>` },
    limit: { t: '이용 제한 내역', body: '<p class="empty">이용 제한 내역이 없어요.<br>모두가 편안한 커뮤니티를 함께 만들어 주셔서 감사해요.</p>' },
    keyword: { t: '관심 키워드 설정', lead: '고른 키워드의 글이 올라오면 알려 드려요.', body: `<div class="chips kwset">${['인슐린', '저혈당', '고혈당', '식단', '학교생활', '주사 연습', '병원', '리포트', '운동', '간식'].map((k, i) => `<button class="${i < 3 ? 'is-on' : ''}" data-kwt>#${k}</button>`).join('')}</div>` },
    rules: { t: '커뮤니티 이용규칙', body: [['서로 존중해요', '같은 고민을 가진 보호자들의 공간이에요. 비방·욕설은 삼가 주세요.'], ['의료 정보는 참고만', '다른 아이에게 맞았던 방법이 우리 아이에게는 맞지 않을 수 있어요. 치료는 의료진과 상의해요.'], ['개인정보 보호', '아이 얼굴·이름·병원 기록 같은 개인정보는 올리지 않아요.'], ['광고 금지', '제품 판매·홍보 글은 숨김 처리될 수 있어요.']].map(([h, t], i) => `<div class="stp"><em>${i + 1}</em><div><b>${h}</b><p>${t}</p></div></div>`).join('') },
    display: { t: '화면 설정', body: '<div class="setl" style="padding:0"><div class="it">글자 크기<span class="ver">보통</span></div><div class="it">다크모드</div><div class="it">그래프 움직임<span class="ver">켜짐</span></div></div>' },
    lock: { t: '암호/지문 잠금', lead: '앱을 열 때 암호나 지문으로 아이 기록을 보호해요.', body: '<div class="setl" style="padding:0"><div class="it">암호 잠금<span class="ver">꺼짐</span></div><div class="it">지문 잠금<span class="ver">꺼짐</span></div></div>' },
    link: { t: '계정연동', body: '<div class="setl" style="padding:0"><div class="it">카카오<span class="ver" style="color:var(--mint)">연동됨</span></div><div class="it">네이버<span class="ver">연동하기</span></div><div class="it">구글<span class="ver">연동하기</span></div><div class="it">애플<span class="ver">연동하기</span></div></div>' },
    ask: { t: '문의하기', lead: '궁금한 점을 남겨 주시면 평일 하루 안에 답변 드려요.', body: '<textarea class="inp" style="height:140px" placeholder="문의 내용을 적어 주세요."></textarea><div style="padding-top:16px"><a class="btn" data-toast="문의가 접수됐어요">보내기</a></div><p class="small">고객센터 1588-0000 (평일 10:00 ~ 18:00)</p>' },
    notice: { t: '공지사항', body: [['[안내] 동화책 2화가 열렸어요', '2026. 05. 08'], ['[업데이트] 빠른 기록에 메모 기능이 생겼어요', '2026. 05. 02'], ['[이벤트] 30일 로드맵 완주하면 베어리 스티커 증정', '2026. 04. 25'], ['[점검] 5월 12일 새벽 2시~4시 서버 점검', '2026. 04. 20']].map(([t, d]) => `<div class="nt"><b>${t}</b><small>${d}</small></div>`).join('') },
    leave: { t: '회원탈퇴', lead: '탈퇴하면 아이의 기록과 학습현황이 모두 지워지고 되돌릴 수 없어요.', body: '<p class="small" style="margin-top:0">렌탈 중인 기기가 있다면 반납 후에 탈퇴할 수 있어요.</p><div style="padding-top:20px"><a class="btn line-mint" data-toast="렌탈 기기를 반납한 뒤에 탈퇴할 수 있어요">탈퇴하기</a></div>' },
    notiTime: { t: '알림 설정', body: '<div class="setl" style="padding:0"><div class="it">인슐린 시간<span class="ver">08:00 · 12:30 · 18:30</span></div><div class="it">혈당 재기<span class="ver">식후 2시간</span></div><div class="it">학습 알림<span class="ver">매일 19:00</span></div><div class="it">긴급 알림<span class="ver" style="color:var(--mint)">항상 켜짐</span></div></div>' }
  };
  const HOSP = [
    { img: 'h-cm', name: 'CM병원', kind: '종합병원', addr: '서울 영등포구 영등포로 36길 13 (충무병원) CM병원', d: '50m' },
    { img: 'h-sok', name: 'SOK속편한 내과', kind: '내과', addr: '서울 동대문구 고산자로 399 SOK속편한내과', d: '240m' },
    { img: 'h-kk', name: '건국대학교병원', kind: '종합병원', addr: '서울 광진구 능동로 120-1 건국대학교병원', d: '560m' },
    { img: 'h-ku', name: '고려대학교 구로병원', kind: '종합병원', addr: '서울 구로구 구로동로 148 고려대학교 구로병원', d: '1.2km' }
  ];

  /* ---------- 조각 함수 ---------- */
  function snsBtns() {
    return `<div class="sns">${[['sns-kakao', '카카오톡'], ['sns-naver', '네이버'], ['sns-google', '구글'], ['sns-apple', '애플']].map(([i, t]) => `<button data-go="home"><img src="${I(i)}" alt="">${t} 로그인</button>`).join('')}</div>`;
  }
  function chips(list) { return list.map((t, i) => `<button class="${i ? '' : 'is-on'}" data-chip>${t}</button>`).join(''); }
  function tg(k) { return `<button class="tg${S.toggles[k] ? ' is-on' : ''}" data-tg="${k}" aria-label="켜기/끄기"></button>`; }
  function statBox(items, go) {
    return `<div class="stat"><div class="k">${items.map(([l, v, u]) => `<div><small>${l || '&nbsp;'}</small><b>${v} <small>${u}</small></b></div>`).join('')}</div><span class="di" ${go ? `data-go="${go}"` : ''}>직접 입력 ›</span></div>`;
  }
  function feed(t, title = '하루 피드백') { return `<div class="feed"><b>${title}</b><p>${t}</p></div>`; }
  function stage(t, w) { return `<div class="stage">단계 : ${t}<div class="bar"><i style="width:${w}%"></i></div></div>`; }
  function nut() { return `<div class="nut">${[['탄수화물', '85 / 324 g'], ['식이섬유', '14 / 25 g'], ['단백질', '48 / 55 g'], ['지방', '42 / 54 g'], ['염분', '3.2 / 5.0 g']].map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>`; }
  function addCard(tag, time, val, img, text) {
    return `<div class="add-card"><span class="tag">${tag}</span><p>${time}${text ? `<span style="display:block;font-size:8.5px;margin-top:4px;padding-right:90px">${val}</span>` : `<b>${val}</b>`}</p><img class="bg" src="${I(img)}" alt=""><div class="act"><span>메모</span><span>수정하기 ›</span></div></div>`;
  }
  function recPage(title, vals, secTitle, stat, chart, stg, fb, extra) {
    return `<div class="rhead">${topC(title, '', true)}<div class="date">2026. 5. 9</div><div class="val"><div>${vals.map(([v, u]) => `<b>${v}<small>${u}</small></b>`).join('')}</div><span>기기 연동하기</span></div></div>
      <div class="sheet"><h2 class="sec">${secTitle}<span class="q">?</span></h2>${stat}${chart}${stg}${feed(fb)}${extra.includes('sec-gap') ? '' : '<div class="sec-gap"></div><h2 class="sec">추가 기록</h2>'}${extra}
      ${userRecs()}<button class="plus" data-addrec aria-label="기록 추가"><i></i></button><div class="blank"></div></div>`;
  }
  function userRecs() {   /* 2차: + 로 추가한 기록 (그 화면에만) */
    return (S.recs[cur()] || []).map((r) => addCard('메모', `<b style="font-size:12px">${r.t}</b>`, r.b || '&nbsp;', 'm-memo', true)).join('');
  }
  function lessons() {
    return `<div class="lessons">${[['동화책', '동화책 2화 보기', 0, 'cur'], ['주사 연습', '벨트를 활용하여 주사 연습', 100], ['일지 작성', '오늘의 학습 일지 작성', 100, 'faded'], ['주사기 탐색', '주사기 구조 알아보기', 100, 'faded']].map(([t, s, p, k]) => `<div class="lesson${k === 'cur' ? ' is-cur' : ''}${k === 'faded' ? ' is-done2' : ''}"><b>${t}</b><p>${s}</p><span class="bd${p === 100 ? ' done' : ''}">${p === 100 ? '완료' : '미완료'}</span><div class="pb"><div><i style="width:${p}%"></i></div>${p}%</div></div>`).join('')}</div>`;
  }
  function road() {
    const m = { 1: 'r', 2: 'o s', 3: 'o', 4: 'o', 5: 'o', 6: 'o', 7: 'o e', 8: 'o se', 9: 'o se', 10: 'y s', 11: 'y', 12: 'y', 13: 'y', 14: 'y e', 24: 'g s', 25: 'g', 26: 'g', 27: 'g', 28: 'g e', 29: 'g s', 30: 'g', 31: 'g e' };
    let h = '';
    for (let d = 1; d <= 31; d++) {
      let c = m[d] || '';
      if (d === 8) c = 'o s'; if (d === 9) c = 'o e';
      h += `<span class="${c}">${d}</span>`;
    }
    return h;
  }
  function postItem(p, i) {
    return `<a class="post" data-post-i="${i}" data-go="post"><div class="kw">${p.kw.map((k) => `<span>${k}</span>`).join('')}</div><div class="au"><img src="${I(p.face)}" alt=""><div><b>${p.au}</b><small>12분 전</small></div></div><h4>${p.t}</h4><p>${p.p}</p>
      ${p.ims ? `<div class="ims"><img src="${I(p.ims[0])}" alt=""><div class="c2"><img src="${I(p.ims[1])}" alt=""><img src="${I(p.ims[2])}" alt=""></div></div>` : ''}
      <div class="mt"><span>조회 3,500</span><span><img src="${I('i-comments')}" alt="">143</span></div></a>`;
  }
  function hosItem(h, i, single, from) {
    return `<div class="hos" ${single ? '' : `data-hosp="${i}" data-from="${from || 'near'}"`}><div class="ph" style="background-image:url('${I(h.img)}')" role="img" aria-label="${h.name}"></div><div><b>${h.name}<small>${h.kind}</small></b><p>${h.addr}</p></div>
      <button class="hrt" data-hlike="${i}" aria-label="좋아요"><img src="${I(S.hlike[i] ? 'i-like-on' : 'i-like-off')}" alt=""></button><span class="dist">${h.d}</span><div class="acts"><button><img src="${I('i-route')}" alt="">안내</button><a href="tel:02-000-0000"><button><img src="${I('i-phone')}" alt="">전화</button></a></div></div>`;
  }
  function profileForm(who) {
    const kid = who === 'kid', d = kid ? S.kid : S.guardian;
    const face = d.picked ? `<img src="${I('pf-' + d.face)}" alt="">` : '<span class="cam"></span>';
    return `${topBack()}<div class="ttl" style="padding-top:14px"><h1>${kid ? '우리 아이 등록' : '보호자 등록'}</h1><p>간편한 관리를 위해 프로필을 등록해주세요!</p></div>
      <div class="gap" style="max-height:39px;min-height:10px"></div><div class="avatar${d.picked ? '' : ' empty'}" data-face="${who}">${face}</div><div class="gap" style="max-height:23px;min-height:10px"></div><div class="gap g23"></div>
      <div class="fld"><label>이름</label><input class="inp" data-name="${who}" placeholder="ex) 홍길동" value="${d.filled ? d.name : ''}"></div><div class="gap g23"></div>
      <div class="fld"><label>생년월일</label><button class="inp inp-cal${d.filled ? ' has' : ''}" data-date="${who}-birth"><img src="${I('i-cal')}" alt="">${d.filled ? d.birth : '0000. 00. 00.'}</button></div><div class="gap g23"></div>
      <div class="fld"><label>성별</label><div class="seg" data-seg>${(kid ? ['남자 아이', '여자 아이'] : ['아버지', '어머니']).map((t) => `<button class="${d.filled && (kid ? d.sex : d.rel) === t ? 'is-on' : ''}">${t}</button>`).join('')}</div></div><div class="gap g23"></div>
      ${kid ? `<div class="fld"><label>당뇨판정일</label><button class="inp inp-cal${d.filled ? ' has' : ''}" data-date="kid-diag"><img src="${I('i-cal')}" alt="">${d.filled ? d.diag : '0000. 00. 00.'}</button></div>`
        : `<div class="fld"><label>전화번호</label><input class="inp" placeholder="010 - 1234 - 5678" value="${d.filled ? d.phone : ''}"></div>`}<div class="gap g23"></div>
      <div class="fld"><label>메모</label><textarea class="inp"></textarea></div><div class="gap"></div>
      <div class="foot-btn shadow"><a class="btn${d.filled ? '' : ' is-off'}" data-next="${kid ? 'guardian' : 'home'}">${kid ? '다음' : '가입하기'}</a></div>`;
  }

  /* ---------- 화면 전환 ---------- */
  const TABS = { home: 'home', edu: 'edu', com: 'com', my: 'my', condition: 'home', 'rec-glucose': 'home', 'rec-bp': 'home', 'rec-weight': 'home', 'rec-meal': 'home', cal: 'home', 'cal-search': 'home', 'cal-load': 'home', hospital: 'home', 'hosp-visit': 'home', 'hospital-map': 'home', roadmap: 'edu', sos: 'home', guide: 'home', info: 'my' };
  /* 스크롤 없이 한 화면에 맞추는 화면 (내용이 화면보다 길면 화면 전체를 살짝 줄임) */
  const FIT = ['start', 'easy', 'login', 'signup', 'terms', 'kid', 'guardian', 'noti', 'noti-set', 'cal-camera', 'write', 'hospital-map', 'profile', 'rec-add'];
  const dock = $('#dock'), tabbar = $('#tabbar'), topbtn = $('#topbtn'), fabSlot = $('#fab-slot');
  function shrinkFit(sec) {
    sec.style.zoom = ''; sec.style.height = '';
    const need = $$(':scope > *', sec).reduce((h, el) => h + (el.classList.contains('gap') ? parseFloat(getComputedStyle(el).minHeight) : el.offsetHeight + parseFloat(getComputedStyle(el).marginTop) + parseFloat(getComputedStyle(el).marginBottom)), 0) + sec.offsetTop * 0 + parseFloat(getComputedStyle(sec).paddingTop);
    const have = sec.clientHeight;
    if (need > have + 1) { const z = Math.max(0.72, have / need); sec.style.zoom = z; sec.style.height = `calc(var(--vh) / ${z})`; sec.style.marginLeft = sec.style.marginRight = 'auto'; }
  }
  function render(name) {
    if (!SCREENS[name]) name = 'splash';
    const sec = document.createElement('section');
    const fit = FIT.includes(name);
    sec.className = 'scr is-on' + (TABS[name] ? ' has-tab' : '') + (fit ? ' fit' : '');
    sec.dataset.scr = name;
    sec.innerHTML = SCREENS[name]();
    $$('.scr', app).forEach((s) => s.remove());
    app.appendChild(sec);
    const t = TABS[name];
    dock.classList.toggle('is-on', !!t);
    $$('button', tabbar).forEach((b) => { const on = b.dataset.tab === t; b.classList.toggle('is-on', on); $('img', b).src = I('tab-' + b.dataset.tab + (on ? '-on' : '')); });
    fabSlot.innerHTML = '';
    const fab = $('.fab', sec); if (fab) fabSlot.appendChild(fab);
    dock.classList.toggle('has-fab', !!fab);
    window.scrollTo(0, 0);
    topbtn.classList.remove('is-on');
    const first = sec.firstElementChild;
    if (first && first.matches('.home-head, .rhead, .mhead, .edu-head, .road-head')) sec.classList.add('mint-top');
    bind(sec, name);
    if (fit) { shrinkFit(sec); document.fonts && document.fonts.ready.then(() => shrinkFit(sec)); }
    if (name === 'splash') setTimeout(() => { if (cur() === 'splash') go('start', true); }, 1400);
  }
  const cur = () => (location.hash.replace(/^#\/?/, '') || 'splash');
  function go(name, replace) { if (replace) location.replace('#/' + name); else location.hash = '#/' + name; }
  window.addEventListener('hashchange', () => render(cur()));
  window.addEventListener('scroll', () => topbtn.classList.toggle('is-on', !!TABS[cur()] && window.scrollY > 60), { passive: true });
  window.addEventListener('resize', () => { const sec = $('.scr.fit'); if (sec) shrinkFit(sec); });
  topbtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  $$('button', tabbar).forEach((b) => b.addEventListener('click', () => go(b.dataset.tab)));

  /* ---------- 날짜 선택 팝업 ---------- */
  const dim = $('#dim');
  let dateTarget = null, dateSel = 25, dateYM = [1984, 11];
  function openDate(key, btn) {
    dateTarget = { key, btn };
    dateYM = key.startsWith('kid') ? (key === 'kid-diag' ? [2020, 8] : [2011, 2]) : [1984, 11];
    dateSel = key === 'kid-diag' ? 20 : key.startsWith('kid') ? 16 : 25;
    drawDate(); dim.classList.add('is-on');
  }
  function drawDate() {
    $('.pick h4 span', dim).textContent = `${dateYM[0]}. ${dateYM[1]}.`;
    $('.pick .cal7', dim).outerHTML = calGrid(dateSel, 'cal7');
  }
  dim.addEventListener('click', (e) => {
    const d = e.target.closest('[data-day]');
    if (d) { dateSel = +d.dataset.day; drawDate(); return; }
    if (e.target.closest('[data-mv]')) { const v = +e.target.closest('[data-mv]').dataset.mv; dateYM[1] += v; if (dateYM[1] < 1) { dateYM = [dateYM[0] - 1, 12]; } if (dateYM[1] > 12) { dateYM = [dateYM[0] + 1, 1]; } drawDate(); return; }
    if (e.target.closest('[data-cancel]') || e.target === dim) { dim.classList.remove('is-on'); return; }
    if (e.target.closest('[data-ok]')) {
      const txt = `${dateYM[0]}. ${String(dateYM[1]).padStart(2, '0')}. ${String(dateSel).padStart(2, '0')}.`;
      const b = dateTarget.btn; b.lastChild.textContent = txt; b.classList.add('has');
      dim.classList.remove('is-on'); checkProfile();
    }
  });

  /* ---------- 2차: 프로필 사진 고르기 팝업 ---------- */
  const FACES = ['beary', 'mio', 'ellie', 'rabby'];
  const fdim = document.createElement('div');
  fdim.className = 'dim fdim';
  fdim.innerHTML = `<div class="pick fpick" role="dialog" aria-label="프로필 사진"><h4>프로필 사진</h4><div class="fgrid">${FACES.map((f) => `<button data-pf="${f}" aria-label="${f}"><img src="${I('pf-' + f)}" alt=""></button>`).join('')}</div>
    <div class="row"><button class="btn is-off" style="pointer-events:auto" data-fcancel>뒤로가기</button><button class="btn" data-fok>완료</button></div></div>`;
  frameEl.appendChild(fdim);
  let faceWho = 'kid', faceSel = null;
  function drawFaces() { $$('[data-pf]', fdim).forEach((b) => { const f = b.dataset.pf, on = f === faceSel; b.classList.toggle('is-on', on); $('img', b).src = I('pf-' + f + (faceSel && !on ? '-off' : '')); }); }
  function openFace(who) { faceWho = who; const d = who === 'kid' ? S.kid : S.guardian; faceSel = d.picked ? d.face : null; drawFaces(); fdim.classList.add('is-on'); }
  fdim.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pf]');
    if (b) { faceSel = b.dataset.pf; drawFaces(); return; }
    if (e.target.closest('[data-fcancel]') || e.target === fdim) { fdim.classList.remove('is-on'); return; }
    if (e.target.closest('[data-fok]')) {
      fdim.classList.remove('is-on');
      if (!faceSel) return;
      const d = faceWho === 'kid' ? S.kid : S.guardian; d.face = faceSel; d.picked = true;
      const a = $('[data-face]'); if (a) { a.classList.remove('empty'); a.innerHTML = `<img src="${I('pf-' + d.face)}" alt="">`; }
    }
  });

  /* ---------- 화면별 동작 ---------- */
  function checkProfile() {
    const sec = $('.scr'); if (!sec) return;
    const next = $('[data-next]', sec); if (!next) return;
    const name = $('[data-name]', sec).value.trim();
    next.classList.toggle('is-off', !name);
  }
  function bind(sec, name) {
    if (name === 'login') {
      const f = () => $('#lg-go').classList.toggle('is-off', !($('#lg-id').value && $('#lg-pw').value));
      $('#lg-id').addEventListener('input', f); $('#lg-pw').addEventListener('input', f);
    }
    if (name === 'signup') {
      const f = () => $('#su-go').classList.toggle('is-off', !($('#su-id').value && $('#su-pw').value && $('#su-pw2').value));
      ['#su-id', '#su-pw', '#su-pw2'].forEach((s) => $(s).addEventListener('input', f));
    }
    if (name === 'kid' || name === 'guardian') $('[data-name]', sec).addEventListener('input', checkProfile);
    if (name === 'edu') {
      const sl = $('#edu-slides'), dots = $$('.dots i', sec);
      sl.addEventListener('scroll', () => { const i = Math.round(sl.scrollLeft / sl.clientWidth); dots.forEach((d, k) => d.classList.toggle('is-on', k === i)); }, { passive: true });
    }
  }
  frameEl.addEventListener('click', (e) => {
    const t = e.target;
    const el = (s) => t.closest(s);
    if (el('[data-back]')) { const tb = el('[data-back]'); if (tb.dataset.toast) toast(tb.dataset.toast); history.length > 1 ? history.back() : go('home'); return; }
    if (el('[data-toast]') && !el('[data-go]')) { toast(el('[data-toast]').dataset.toast); }
    if (el('[data-eye]')) { const b = el('[data-eye]'), inp = $('#' + b.dataset.eye); const show = inp.type === 'password'; inp.type = show ? 'text' : 'password'; $('img', b).src = I(show ? 'i-eye' : 'i-eye-off'); return; }
    if (el('[data-chk]')) { el('[data-chk]').classList.toggle('is-on'); return; }
    if (el('[data-ck]')) { el('[data-ck]').classList.toggle('is-on'); $('#tm-go').classList.toggle('is-off', !$('[data-ck="req"]').classList.contains('is-on')); return; }
    if (el('#tm-go')) { e.preventDefault(); $$('[data-ck]').forEach((c) => c.classList.add('is-on')); setTimeout(() => go('kid'), 300); return; }
    if (el('[data-face]')) { openFace(el('[data-face]').dataset.face); return; }
    if (el('[data-date]')) { e.preventDefault(); openDate(el('[data-date]').dataset.date, el('[data-date]')); return; }
    if (el('[data-seg] button')) { const b = el('[data-seg] button'); $$('button', b.parentNode).forEach((x) => x.classList.toggle('is-on', x === b)); return; }
    if (el('[data-next]')) { const n = el('[data-next]'); if (n.classList.contains('is-off')) return; const who = cur(); const d = who === 'kid' ? S.kid : S.guardian; const v = $('[data-name]').value.trim(); if (v) d.name = v; go(n.dataset.next); return; }
    if (el('[data-chip]')) { const b = el('[data-chip]'); $$('button', b.parentNode).forEach((x) => x.classList.toggle('is-on', x === b)); return; }
    if (el('[data-tabs] button')) { const b = el('[data-tabs] button'); $$('button', b.parentNode).forEach((x) => x.classList.toggle('is-on', x === b)); return; }
    if (el('[data-wk]')) { const b = el('[data-wk]'); $$('button', b.parentNode).forEach((x) => x.classList.toggle('is-on', x === b)); return; }
    if (el('[data-day]') && el('.mcal')) { const b = el('[data-day]'); $$('span', b.parentNode).forEach((x) => x.classList.toggle('is-on', x === b)); return; }
    if (el('[data-tg]')) { const b = el('[data-tg]'); S.toggles[b.dataset.tg] = !S.toggles[b.dataset.tg]; b.classList.toggle('is-on'); return; }
    if (el('[data-hlike]')) { const b = el('[data-hlike]'), k = +b.dataset.hlike; S.hlike[k] = !S.hlike[k]; $('img', b).src = I(S.hlike[k] ? 'i-like-on' : 'i-like-off'); return; }
    if (el('[data-bm]')) { const b = el('[data-bm]'); S.bm[S.post] = !S.bm[S.post]; b.classList.toggle('is-on', S.bm[S.post]); $('img', b).src = I(S.bm[S.post] ? 'i-bm-on' : 'i-bm-b'); return; }
    if (el('[data-addrec]')) { S.addFor = cur(); go('rec-add'); return; }
    if (el('[data-recsave]')) { const ti = $('#ra-t').value.trim(); if (!ti) { toast('제목을 입력해 주세요'); return; } (S.recs[S.addFor] = S.recs[S.addFor] || []).push({ t: ti.replace(/</g, '&lt;'), b: $('#ra-b').value.trim().replace(/</g, '&lt;') }); toast('기록을 추가했어요'); history.back(); return; }
    if (el('[data-info]')) { S.info = el('[data-info]').dataset.info; go('info'); return; }
    if (el('[data-guide]')) { S.guide = +el('[data-guide]').dataset.guide; }
    if (el('[data-kwt]')) { el('[data-kwt]').classList.toggle('is-on'); return; }
    if (el('[data-post-i]')) { S.post = +el('[data-post-i]').dataset.postI; }
    if (el('[data-like]')) { const b = el('[data-like]'), k = b.dataset.like; S.liked[k] = !S.liked[k]; $('img', b).src = I(S.liked[k] ? 'i-like-on' : 'i-like-off'); return; }
    if (el('[data-swap]')) { S.char = (S.char + 1) % 4; render('edu'); return; }
    if (el('[data-hosp]')) { if (el('.acts')) return; const h = el('[data-hosp]'); S.hosp = +h.dataset.hosp; S.hfrom = h.dataset.from; go('hospital-map'); return; }
    if (el('[data-addimg]')) { $('#w-img').innerHTML = `<img src="${I('f-gimbap')}" alt="">`; return; }
    if (el('[data-post]')) { const ti = $('.write-t').value.trim(); if (!ti) { toast('제목을 입력해 주세요'); return; } POSTS.unshift({ kw: ['#새글'], face: 'cm-' + S.guardian.face, au: S.guardian.name, t: ti, p: $('.write-b').value || '', ago: '방금 전' }); toast('글이 등록됐어요'); go('com'); return; }
    const g = el('[data-go]');
    if (g) { e.preventDefault(); if (g.dataset.toast) toast(g.dataset.toast); go(g.dataset.go); }
  });

  render(cur());
})();
