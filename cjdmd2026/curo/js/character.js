/* ==========================================================================
   캐릭터 상세 (110차, 새 레이아웃) — character.html?c=beary|ellie|rabby|mio
   READY 에 있는 친구만 이 레이아웃, 나머지는 예전 레이아웃(character-old.html)으로 넘김
   내용·색은 아래 D 에서 수정. 기본 색 칩 모양 = assets/images/friends/color/{id}.svg (없으면 임시 inline SVG)
   ========================================================================== */
(function () {
  'use strict';
  const D = {
    beary: { name: '베어리', en: 'Beary', quote: '넌 할 수 있어! 내가 응원할게!',
      desc: ['다정하면서도 씩씩한 수호대의 리더. 밝고 용감한 성격으로 친구들을 이끌어준다.',
             '콩이가 주사를 무서워하거나 망설일 때면 가장 먼저 나서서 용기를 북돋아 주고, 작은 성공에도 누구보다 힘차게 응원해 준다.'],
      tags: ['용기', '공감', '다정함', '수호대의 리더'], colors: ['#E5A673', '#FFE9AF', '#F6D9B1', '#F0555B'],
      c: { top: '#FFCACB', bot: '#FFF3F3', ink: '#9E2F33', accent: '#E04A50', btn: '#D9575C' } },
    ellie: { name: '엘리', en: 'Ellie', quote: '걱정마. 내가 곁에 있을게.',
      desc: ['차분하고 다정한 수호대의 든든한 지킴이. 말수는 적지만 누구보다 따뜻한 마음을 가졌다.',
             '콩이가 주사 앞에서 긴장하거나 망설일 때면 조용히 곁을 지키며 마음을 편안하게 해주고, 콩이의 속도에 맞춰 천천히 연습을 도와준다.'],
      tags: ['든든함', '용기', '천하장사', '수호대의 지킴이'], colors: ['#BFEAF3', '#FFE9AF', '#FEDDB0', '#F55B5D'],
      c: { top: '#FFE188', bot: '#FFF6DE', ink: '#7A5A0C', accent: '#CC9A0E', btn: '#DDA824' } },
    rabby: { name: '래비', en: 'Rabby', quote: '좋아! 내가 해볼게!',
      // 198차: 폰에서 4줄이 되게 살짝 줄임
      desc: ['호기심 많고 에너지가 넘치는 수호대의 발명왕. 새로운 것에 도전하는 걸 좋아한다.',
             '장난기 넘치는 모습으로 친구들을 즐겁게 하지만, 주사 각도와 유지 시간처럼 정확함이 필요할 땐 누구보다 꼼꼼하게 연습을 도와준다.'],
      tags: ['쾌활함', '손재주', '꼼꼼함', '수호대의 발명왕'], colors: ['#FFFFFF', '#FFE9AF', '#FFDBB7', '#FFB0B7', '#B2D8FF'],   // 173차: 반반 칩 → 5개
      // 175차: 소개 3줄 직접 나눔 (줄 길이를 베어리 첫 줄과 비슷하게 맞춰 오른쪽이 튀어나오지 않게)
      lines: ['호기심 많고 에너지가 넘치는 수호대의 발명왕. 새로운 것에 도전하는 걸 좋아한다.', '장난기 넘치는 모습으로 친구들을 즐겁게 하지만, 주사 각도와 유지 시간처럼', '정확함이 필요할 땐 누구보다 꼼꼼하게 연습을 도와준다.'],
      c: { top: '#BFE3F7', bot: '#EEF8FE', ink: '#1D5F82', accent: '#2590C5', btn: '#2E8BBF' } },
    mio: { name: '미오', en: 'Mio', quote: '방금 정말 잘했어!',
      desc: ['똑똑하고 세심한 관찰력을 가진 수호대의 기록가. 침착한 성격으로 주변의 작은 변화도 놓치지 않는다.',
             '콩이의 주사 연습 과정을 꼼꼼하게 살펴보고, 작은 노력과 성취도 가장 먼저 발견해 구체적인 칭찬으로 자신감을 북돋아 준다.'],
      tags: ['꼼꼼함', '관찰력', '칭찬왕', '수호대의 기록가'], colors: ['#FCF8F0', '#FFE9AF', '#FFC890', '#4F4F4F'],
      lines: ['똑똑하고 세심한 관찰력을 가진 수호대의 기록가. 침착한 성격으로 주변의', '작은 변화도 놓치지 않는다. 콩이의 주사 연습 과정을 꼼꼼하게 살펴보고,', '작은 노력과 성취도 가장 먼저 발견해 구체적인 칭찬으로 자신감을 북돋아 준다.'],   // 175차: 3줄
      c: { top: '#D8EAAF', bot: '#F5FAE8', ink: '#4E6327', accent: '#77953A', btn: '#86A24C' } }
  };
  const ORDER = ['beary', 'ellie', 'rabby', 'mio'];
  const READY = ['beary', 'ellie', 'rabby', 'mio'];        // 110차: 베어리만 먼저 → 172차: 네 친구 모두 새 레이아웃
  // 기본 색 칩 모양 = 사용자 export assets/images/friends/color/{id}.svg 의 path 를 그대로 옮겨 둠
  // (로컬 파일로 열면 css mask·fetch 가 막혀서 파일을 직접 못 읽음 → 파일을 바꾸면 여기 d 도 바꿔 주기)
  const COLOR_SHAPE = {
    // lb = 글자(색 코드) 아래 위치 (모양 높이 대비), h = 칩 높이(u) — 172차: 엘리·래비·미오 실루엣 추가 (웹/프렌즈/들어갈 파일/컬러표기아이콘_* 실루엣.svg)
    beary: { vb: '0 0 93 72', h: 72, lb: 0.30, d: 'M92.478 12.992C90.2346 4.01692 81.5143 -1.61388 72.9949 0.412952C68.6315 1.4517 65.1757 4.30194 63.1334 8.03258C58.0827 5.60038 52.4485 4.18793 46.5031 4.18793C40.5577 4.18793 34.93 5.60038 29.8728 8.03258C27.8305 4.29561 24.3748 1.4517 20.0114 0.412952C11.492 -1.61388 2.7716 4.01692 0.528288 12.992C-1.42326 20.8143 2.18808 28.586 8.78833 31.8036C7.72503 35.0908 7.14151 38.4921 7.14151 41.8934C7.14151 60.781 24.7638 71.9919 46.4966 71.9919C68.2295 71.9919 85.8518 60.781 85.8518 41.8934C85.8518 38.4921 85.2747 35.0908 84.2049 31.8036C90.8052 28.586 94.4165 20.8143 92.465 12.992H92.478Z' },
    ellie: { vb: '0 0 202.37 147.49', h: 74, lb: 0.40, d: 'M202.37,50.09c0,17.28-8.91,32.72-23.86,38.35-3.88,1.46-7.89,2.15-11.9,2.15-.5,0-.99-.01-1.49-.04-5.74,15.04-22.14,23.33-49.7,25.23h0c-4.81,7.22-4.52,16.51-3.92,21.41.47,3.86-1.69,7.57-5.25,9.03-2.54,1.04-5.37,1.27-7.4,1.27h-.33c-1.6-.02-3.18-.49-4.54-1.36-10.4-6.59-16.75-17.5-18.38-31.57-20.83-3.19-33.51-11.09-38.38-24.01-.49.03-.97.04-1.46.04-4.02,0-8.02-.69-11.91-2.15C3.64,80.83-5.52,55.3,3.43,31.51,10.65,12.29,27.52,0,44.4,0c4.01,0,8.03.7,11.91,2.16,4.65,1.75,8.71,4.45,12.11,7.85C77.41,4.22,88.29.68,101.18.68s23.78,3.54,32.77,9.33c3.4-3.4,7.46-6.1,12.11-7.85,20.21-7.61,43.93,5.56,52.88,29.35,2.33,6.19,3.43,12.5,3.43,18.58Z' },
    rabby: { vb: '0 0 83.41 135.76', h: 84, lb: 0.15, fs: 10.5, d: 'M83.39,102.81c0,19.41-16.88,32.95-40.43,32.95S1.54,122.22,1.54,102.81c0-9.63,3.47-19.17,11.09-25.97C5.16,69.41,0,56.84,0,42.12,0,19.07,7.47,0,18.28,0s19.57,18.69,19.57,41.75c0,9-.26,17.34-1.22,24.16,2.06-.28,4.18-.43,6.33-.43,1.59,0,3.17.08,4.72.24-.94-6.79-1.2-15.05-1.2-23.97C46.48,18.7,55.25-.42,66.06,0c9.2.37,17.35,19.06,17.35,42.11,0,14.25-4.86,26.09-12.03,33.62,8.12,6.87,12.01,17.08,12.01,27.07Z' },
    mio: { vb: '0 0 126.94 114.36', h: 74, lb: 0.26, d: 'M123.69,11.46c-1.4-6.28-3.13-12.17-11.45-11.09-15.81,2.05-20.66,3.63-35.68,8.33l-3.19,1.29c-3.23-.48-6.53-.74-9.9-.74s-6.67.26-9.9.74l-1.87-.58C36.68,4.72,15.06.07,15.06.07,6.17-.67,4.66,4.78,3.3,11.07.52,23.97-.6,38.97,1.44,54.39c-.94,4.11-1.44,8.37-1.44,12.73,0,33.17,28.42,47.24,63.47,47.24s63.47-14.07,63.47-47.24c0-4.37-.5-8.63-1.44-12.73,1.11-18.64,1.54-27.94-1.81-42.93Z' }
  };

  const DIM = { beary: '#9E2F33', ellie: '#7A5A0C', rabby: '#1D5F82', mio: '#4E6327' };   // 274차: 새 버튼 색 계열   // 116차: 고르지 않은 친구 덮개 색 (30%, FRIENDS 와 같음)
  const ICON = { beary: 'assets/icons/beary-select.webp?v=333', ellie: 'assets/icons/ellie-select.webp?v=333', rabby: 'assets/icons/rabby-select.webp?v=333', mio: 'assets/icons/mio-select.webp?v=333' };
  const PAGE = 'character.html';
  const SCENE_W = [527, 370, 406, 397, 529, 377];
  const id = ORDER.includes((new URLSearchParams(location.search).get('c') || '').toLowerCase()) ? new URLSearchParams(location.search).get('c').toLowerCase() : 'beary';
  if (!READY.includes(id)) { location.replace(`character-old.html?c=${id}`); return; }
  const C = D[id];   // 274차: 색 = 새 선택 버튼 색 계열
  const $ = (x) => document.getElementById(x);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const main = $('cp');
  Object.entries(C.c).forEach(([k, v]) => main.style.setProperty('--c-' + k, v));

  document.title = `CURO — FRIENDS · ${C.name}`;
  const pose = `assets/images/friends/pose-${id}.svg?v=283`;
  const turn = (v, after) => `assets/images/friends/turn/${id}-${after ? 'hero-' : ''}${v}.svg?v=100`;
  const quoteHTML = `<span class="cp-q">‘</span>${esc(C.quote)}<span class="cp-q">’</span>`;
  const lum = (h) => { const n = parseInt(h.slice(1), 16); return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255); };

  // ① 배너
  $('cp-big').textContent = C.name;
  $('cp-en').textContent = C.en.toUpperCase();
  $('cp-bquote').innerHTML = quoteHTML;
  $('cp-banner-img').src = pose; $('cp-banner-img').alt = C.name;
  // 173차: 배너 캐릭터 크기·아래 잘림을 친구마다 (h = 그림 높이 u, b = 아래로 내려간 양 u) — 래비는 귀가 길어 작게, 미오는 조금 위로
  const BANNER_FIT = { beary: [640, -290], ellie: [640, -290], rabby: [580, -215], mio: [640, -290] };   // 174차: 미오 원래대로, 래비 조금 더 크게
  $('cp-banner-img').style.setProperty('--bh', BANNER_FIT[id][0]); $('cp-banner-img').style.setProperty('--bb', BANNER_FIT[id][1]);
  // 172차: 배너 작은 장식 — FRIENDS 등장 효과와 같은 친구별 그림, 흰색으로 몇 개만 (과하지 않게)
  const rp = (d) => `<path d="${d}" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>`;
  const SH = {
    star: rp('M50 12 L61 38 L89 40 L67 58 L74 86 L50 71 L26 86 L33 58 L11 40 L39 38 Z'),
    sparkle: rp('M50 8 Q55 45 92 50 Q55 55 50 92 Q45 55 8 50 Q45 45 50 8 Z'),
    heart: rp('M50 84 C20 64 10 46 18 32 C26 18 44 20 50 34 C56 20 74 18 82 32 C90 46 80 64 50 84 Z'),
    bubble: '<circle cx="50" cy="50" r="38" fill="none" stroke="#FFFFFF" stroke-width="9"/>',
    drop: rp('M50 10 C62 32 78 46 78 62 C78 78 66 90 50 90 C34 90 22 78 22 62 C22 46 38 32 50 10 Z'),
    leaf: rp('M18 82 C18 40 44 16 84 16 C84 58 60 82 18 82 Z'),
    bulb: '<circle cx="50" cy="42" r="28" fill="#FFFFFF"/><rect x="38" y="62" width="24" height="22" rx="7" fill="#FFFFFF"/>',
    ring: '<circle cx="50" cy="50" r="32" fill="none" stroke="#FFFFFF" stroke-width="13"/>',
    check: '<path d="M18 52 L40 74 L84 26" fill="none" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  const DECO_SET = { beary: ['sparkle', 'star', 'heart', 'sparkle', 'star'], ellie: ['sparkle', 'bubble', 'drop', 'sparkle', 'leaf'],
    rabby: ['sparkle', 'star', 'bulb', 'sparkle', 'star'], mio: ['sparkle', 'star', 'check', 'sparkle', 'ring'] };
  // [그림 번호, x(1920 기준 가운데에서), y(배너 위에서, 메뉴 아래 기준), 크기, 회전, 불투명도]
  const DECO_POS = [[0, -470, 56, 26, 0, 0.9], [1, -90, 70, 22, -12, 0.75], [2, 70, 268, 24, 12, 0.55], [3, 640, 64, 30, 0, 0.85], [4, 690, 300, 18, 16, 0.6]];
  $('cp-deco').innerHTML = DECO_POS.map(([k, x, y, sz, r, o], n) => `<span style="left:calc(50% + ${x} * var(--u));top:calc(var(--nav-h, 0px) + ${y} * var(--u));width:calc(${sz} * var(--u));height:calc(${sz} * var(--u));opacity:${o};--r:${r}deg;--d:${(4 + n * 0.7).toFixed(1)}s;--dl:${-n * 0.9}s"><svg viewBox="0 0 100 100">${SH[DECO_SET[id][k]]}</svg></span>`).join('');

  // ② 소개
  $('cp-tile').src = turn('front'); $('cp-tile').alt = `${C.name} 앞모습`;
  $('cp-dl').innerHTML = [['이름', C.name], ['역할', C.tags[C.tags.length - 1]], ['성격', C.tags.slice(0, -1).join(' · ')]]
    .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
  $('cp-quote').innerHTML = quoteHTML;
  // 소개 줄바꿈: 첫 문단 한 줄 + 둘째 문단은 마지막 쉼표에서 한 번 (시안처럼 3줄)
  const d2 = C.desc[1], cut = d2.lastIndexOf(', ');
  const lines = C.lines || [C.desc[0]].concat(cut > 0 ? [d2.slice(0, cut + 1), d2.slice(cut + 2)] : [d2]);   // 175차: lines 가 있으면 그대로
  $('cp-desc').innerHTML = `<p>${lines.map((l) => `<span>${esc(l)}</span>`).join('')}</p>`;
  // 기본 색: 캐릭터 얼굴 모양 (임시 inline SVG, viewBox 100×88 — 내보낸 얼굴 모양이 생기면 교체)
  const HEAD = {
    beary: '<circle cx="22" cy="24" r="15"/><circle cx="78" cy="24" r="15"/><ellipse cx="50" cy="54" rx="40" ry="33"/>',
    ellie: '<ellipse cx="17" cy="46" rx="17" ry="25"/><ellipse cx="83" cy="46" rx="17" ry="25"/><ellipse cx="50" cy="50" rx="34" ry="34"/>',
    rabby: '<ellipse cx="36" cy="22" rx="9" ry="22"/><ellipse cx="64" cy="22" rx="9" ry="22"/><ellipse cx="50" cy="60" rx="36" ry="28"/>',
    mio: '<path d="M14 52 L16 8 L42 26 Z"/><path d="M86 52 L84 8 L58 26 Z"/><ellipse cx="50" cy="56" rx="40" ry="31"/>'
  };
  $('cp-colors').innerHTML = C.colors.map((c) => {
    const pair = Array.isArray(c), f = pair ? c[0] : c;
    const label = pair ? c.join('<br>') : c, ink = lum(f) > 200 ? '#8A7A6A' : '#FFFFFF';
    if (COLOR_SHAPE[id]) {   // export 된 얼굴 모양에 색만 채움
      const k = 'g' + Math.random().toString(36).slice(2, 7), sh = COLOR_SHAPE[id];
      const grad = pair ? `<defs><linearGradient id="${k}"><stop offset="50%" stop-color="${c[0]}"/><stop offset="50%" stop-color="${c[1]}"/></linearGradient></defs>` : '';
      const [, , vw, vh] = sh.vb.split(' ').map(Number);
      return `<li class="is-shape" style="--h:${sh.h};--w:${(sh.h * vw / vh).toFixed(1)};--lb:${sh.lb * 100}%${sh.fs ? `;--fs:${sh.fs}` : ''}"><svg viewBox="${sh.vb}" aria-hidden="true">${grad}<path d="${sh.d}" fill="${pair ? `url(#${k})` : f}"${lum(f) > 235 ? ' stroke="rgba(0,0,0,0.22)" stroke-width="1"' : ''}/></svg><span style="color:${ink}">${label}</span></li>`;
    }
    const k = 'g' + Math.random().toString(36).slice(2, 7);
    const fill = pair ? `url(#${k})` : f;
    const grad = pair ? `<defs><linearGradient id="${k}"><stop offset="50%" stop-color="${c[0]}"/><stop offset="50%" stop-color="${c[1]}"/></linearGradient></defs>` : '';
    return `<li><svg viewBox="0 0 100 88" aria-hidden="true">${grad}<g fill="${fill}" stroke="${lum(f) > 235 ? 'rgba(0,0,0,0.22)' : 'none'}" stroke-width="1.2">${HEAD[id]}</g></svg><span style="color:${ink}">${label}</span></li>`;
  }).join('');

  // ③ 삼면도: 토글로 전/후 (큰 캐릭터는 늘 왼쪽)
  const views = [['front', '앞'], ['side', '옆'], ['back', '뒤']];
  const plateOf = () => C.c.bot;   // 110차: 시안처럼 전/후 같은 판 색 (그림만 바뀜)
  const block = (after) => `<div class="cp-view${after ? '' : ' is-on'}" role="tabpanel" aria-label="${after ? '변신 후' : '변신 전'}" style="--plate:${plateOf(after)};--cap:${C.c.ink}">
      <div class="cp-plate" style="${plateFit(after)}">${views.map(([v, k]) => `<figure><img src="${turn(v, after)}" alt="${C.name} ${after ? '변신 후' : '변신 전'} ${k}모습"><figcaption>${k}</figcaption></figure>`).join('')}</div>
      <img class="cp-hero-fig" src="${after ? turn('front', true) : pose}" alt="" style="${heroFit(after)}">
    </div>`;
  // 172차: 큰 캐릭터 = 그림의 위·아래 투명 여백을 빼고 보이는 키가 HERO_H 가 되게, 발끝 = 판 아래 끝
  //   PAD = 그림 파일 안 투명 여백 비율 [위, 아래] (자동 측정값 — 그림 파일을 바꾸면 다시 재기)
  const HERO_H = 410;
  //   [위, 아래, 왼쪽] 여백 비율 · AR = 그림 가로/세로 — 174차: 보이는 그림 왼쪽 끝 = 1100 기둥 왼쪽 (사용자 시안)
  const PAD = {
    beary: { pose: [0.073, 0.057, 0.14], after: [0.022, 0.022, 0.138] }, ellie: { pose: [0.071, 0.071, 0.098], after: [0.015, 0.015, 0.12] },
    rabby: { pose: [0.071, 0.073, 0.175], after: [0.024, 0.022, 0.233] }, mio: { pose: [0.083, 0.085, 0.185], after: [0.022, 0.022, 0.117] }
  };
  const AR = { pose: 286.66 / 353.87, after: 129 / 150 };
  // 175차: 판 왼쪽 끝 = 큰 캐릭터 보이는 폭의 가운데 (판 모서리가 캐릭터 뒤로 묻힘). 앞·옆·뒤 위치는 그대로(기둥에서 306 부터)
  const PAD_R = { beary: { pose: 0.10, after: 0.137 }, ellie: { pose: 0.098, after: 0.12 }, rabby: { pose: 0.188, after: 0.233 }, mio: { pose: 0.185, after: 0.118 } };
  function plateFit(after) {
    const k = after ? 'after' : 'pose', [t, b, l] = PAD[id][k], h = HERO_H / (1 - t - b), vis = h * AR[k] * (1 - l - PAD_R[id][k]);
    const pl = Math.round(vis * 0.5);
    return `--pl:${pl};--pp:${306 - pl}`;
  }
  function heroFit(after) {
    const k = after ? 'after' : 'pose', [t, b, l] = PAD[id][k], h = HERO_H / (1 - t - b);
    return `--hh:${h.toFixed(1)};--hb:${(-b * h).toFixed(1)};--hl:${(-l * h * AR[k]).toFixed(1)}`;
  }
  $('cp-views').innerHTML = block(false) + block(true);
  const tg = $('cp-toggle'), panels = $('cp-views').children;
  const btnOf = () => C.c.btn;
  tg.style.setProperty('--tg', btnOf(false));
  // 115차: 둥근 선택 박스 위치·폭 = 선택된 버튼에 맞춤 (처음·창 크기 바뀔 땐 움직임 없이)
  const place = (anim) => {
    const b = tg.querySelector('button[aria-selected="true"]');
    tg.classList.toggle('no-anim', !anim);
    tg.style.setProperty('--x', b.offsetLeft + 'px'); tg.style.setProperty('--w', b.offsetWidth + 'px');
  };
  place(false);
  window.addEventListener('resize', () => place(false));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => place(false));
  tg.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-v]'); if (!b) return;
    const after = b.dataset.v === 'after';
    tg.querySelectorAll('button').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    tg.style.setProperty('--tg', btnOf(after));
    panels[0].classList.toggle('is-on', !after); panels[1].classList.toggle('is-on', after);
    place(true);
  });

  // ④ 동화 속 장면
  $('cp-gallery').innerHTML = SCENE_W.map((w, i) => `<figure style="--w:${w}"><img src="assets/images/friends/scene/${id}-${i + 1}.webp?v=352" alt="" loading="lazy"></figure>`).join('');

  // ⑤ 다른 친구 (네 친구 모두, 지금 친구는 누르지 않음)
  $('cp-friends').innerHTML = ORDER.map((k) =>
    `<li><a href="${PAGE}?c=${k}" aria-label="${esc(D[k].name)}" style="--dim:${DIM[k]}"${k === id ? ' aria-current="page"' : ''}><img src="${encodeURI(ICON[k])}" alt=""></a><span class="cp-friends-name" aria-hidden="true">${esc(D[k].name)}</span></li>`).join('');
})();
