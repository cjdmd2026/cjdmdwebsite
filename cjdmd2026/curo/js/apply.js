/* ==========================================================================
   CURO — 렌탈 상담 신청 (137차 시안, apply-proposal.html)
   흐름: 1~6 대화형 질문 → 7 신청자 정보(폼) → 8 확인·동의 → 9 완료
   - 질문은 아래 STEPS 데이터로 관리 (type 에 따라 화면이 그려짐)
   - 선택지 배치는 layout(grid2 / list / chips / chars / period / products) — 개수·글 길이에 맞게
   - 답에 따른 안내 문구 = REACT (나중에 늘리기 쉬움). 의료적 판단·효과 단정 표현은 쓰지 않음
   ========================================================================== */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const noop = { hidden: true, style: {}, classList: { add() {}, remove() {}, toggle() {} }, addEventListener() {}, set innerHTML(v) {}, set textContent(v) {} };
  const $$ = (id) => document.getElementById(id) || noop;   // 상담 패널에는 없는 요소(오른쪽 요약 등)

  /* ---------- 141차: 사이트 상담 패널(#k-chat, float.css/float.js) 안에 그리기 ----------
     시안 페이지(apply-proposal.html)에는 #ap-log 가 이미 있음. 사이트 페이지에서는 패널 본문을 이 흐름으로 바꿈 */
  const PANEL = !$('ap-log') && $('k-chat');
  if (PANEL) {
    const body = PANEL.querySelector('.k-chat-body');
    if (!body) return;
    body.id = 'ap-body'; body.classList.add('ap-body');
    body.innerHTML = '<div class="ap-log" id="ap-log" aria-live="polite"></div>';
    body.insertAdjacentHTML('beforebegin', '<div class="ap-phase" id="ap-phase" hidden><div class="ap-phase-t"><span id="ap-phase-name"></span><span id="ap-phase-n"></span></div><div class="ap-phase-bar"><i id="ap-phase-fill"></i></div></div>');
    body.insertAdjacentHTML('afterend', '<footer class="ap-foot" id="ap-foot"><div class="ap-total" id="ap-total" hidden></div><div class="ap-btns"><button class="ap-prev" type="button" id="ap-prev">‹ 이전</button><div class="ap-btns-r" id="ap-btns-r"></div></div></footer>' +
      '<div class="ap-sheet" id="ap-sheet" role="dialog" aria-modal="true" aria-labelledby="ap-sheet-t" hidden><div class="ap-sheet-in"><h3 id="ap-sheet-t"></h3><div class="ap-sheet-body" id="ap-sheet-body"></div><button class="ap-btn" type="button" id="ap-sheet-ok">확인</button></div></div>');
  }
  const HOME = 'index.html';   // topnav.js 와 같음
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const won = (n) => n.toLocaleString('ko-KR') + '원';

  /* ---------- 임시 아이콘 (export 된 아이콘이 없어 inline SVG — 파일이 생기면 교체) ---------- */
  const SV = (d) => `<svg viewBox="0 0 48 48" aria-hidden="true">${d}</svg>`;
  const cal = (n) => SV('<rect x="7" y="10" width="34" height="31" rx="5" class="s"/><path d="M7 18h34M16 6v8M32 6v8" class="s"/>' +
    [...Array(8)].map((_, i) => `<rect x="${12 + (i % 4) * 7}" y="${23 + Math.floor(i / 4) * 8}" width="5" height="5" rx="1" class="${i < n ? 'f' : 'e'}"/>`).join(''));   // 지난 기간만큼 칸이 채워짐
  /* 231차: 사용자 아이콘 (웹/임시 Frame 1000006609~16 → Icon/Consult*.svg). 색은 consult.css 의 .o/.f/.e 로 (고르면 민트) */
  /* 231차: 사용자 아이콘 (웹/임시 Frame 1000006609~16 → Icon/Consult*.svg) — 선택 시 색 바뀌게 class 로 inline */
  const SVU = (d) => `<svg viewBox="0 0 200 200" aria-hidden="true">${d}</svg>`;
  const IC = {
    /* 232차: 달력 1개(Icon/ConsultWhen.svg)를 돌려씀 — n = 1~4, 기간만큼 칸이 민트로 (칸별 채워지는 순서 = 원래 4개 그림과 같음) */
    ...Object.fromEntries([1, 2, 3, 4].map((n) => { const LV = [1, 3, 2, 4, 2, 4, 3, 4], c = (i) => (LV[i] <= n ? 'f' : 'e');
      return ['d' + n, SVU(`<path d="M142.606 167.08H57.7644C45.2129 167.08 35 156.905 35 144.399V70.9893C35 58.484 45.2129 48.3086 57.7644 48.3086H142.606C155.157 48.3086 165.37 58.484 165.37 70.9893V144.399C165.37 156.905 155.157 167.08 142.606 167.08ZM57.7644 57.1567C50.0973 57.1567 43.8808 63.3504 43.8808 70.9893V144.399C43.8808 152.038 50.0973 158.232 57.7644 158.232H142.606C150.273 158.232 156.489 152.038 156.489 144.399V70.9893C156.489 63.3504 150.273 57.1567 142.606 57.1567H57.7644Z" class="g"/><path d="M72.2998 70.3687C69.8428 70.3687 67.8594 68.3926 67.8594 65.9446V37.4241C67.8594 34.9761 69.8428 33 72.2998 33C74.7568 33 76.7402 34.9761 76.7402 37.4241V65.9446C76.7402 68.3926 74.7568 70.3687 72.2998 70.3687Z" class="g"/><path d="M128.042 70.3687C125.585 70.3687 123.602 68.3926 123.602 65.9446V37.4241C123.602 34.9761 125.585 33 128.042 33C130.499 33 132.482 34.9761 132.482 37.4241V65.9446C132.482 68.3926 130.499 70.3687 128.042 70.3687Z" class="g"/><path d="M160.93 85.4692H39.4404C36.9834 85.4692 35 83.4932 35 81.0452C35 78.5972 36.9834 76.6211 39.4404 76.6211H160.93C163.387 76.6211 165.37 78.5972 165.37 81.0452C165.37 83.4932 163.387 85.4692 160.93 85.4692Z" class="g"/><path d="M72.4471 98.8867H60.1917C59.0309 98.8867 58.0898 99.8243 58.0898 100.981V113.191C58.0898 114.348 59.0309 115.285 60.1917 115.285H72.4471C73.6079 115.285 74.5489 114.348 74.5489 113.191V100.981C74.5489 99.8243 73.6079 98.8867 72.4471 98.8867Z" class="${c(0)}"/><path d="M72.4471 126.996H60.1917C59.0309 126.996 58.0898 127.934 58.0898 129.09V141.301C58.0898 142.457 59.0309 143.395 60.1917 143.395H72.4471C73.6079 143.395 74.5489 142.457 74.5489 141.301V129.09C74.5489 127.934 73.6079 126.996 72.4471 126.996Z" class="${c(1)}"/><path d="M95.033 98.8867H82.7775C81.6168 98.8867 80.6758 99.8243 80.6758 100.981V113.191C80.6758 114.348 81.6168 115.285 82.7775 115.285H95.033C96.1938 115.285 97.1348 114.348 97.1348 113.191V100.981C97.1348 99.8243 96.1938 98.8867 95.033 98.8867Z" class="${c(2)}"/><path d="M95.033 126.996H82.7775C81.6168 126.996 80.6758 127.934 80.6758 129.09V141.301C80.6758 142.457 81.6168 143.395 82.7775 143.395H95.033C96.1938 143.395 97.1348 142.457 97.1348 141.301V129.09C97.1348 127.934 96.1938 126.996 95.033 126.996Z" class="${c(3)}"/><path d="M117.592 98.8867H105.336C104.175 98.8867 103.234 99.8243 103.234 100.981V113.191C103.234 114.348 104.175 115.285 105.336 115.285H117.592C118.752 115.285 119.693 114.348 119.693 113.191V100.981C119.693 99.8243 118.752 98.8867 117.592 98.8867Z" class="${c(4)}"/><path d="M117.592 126.996H105.336C104.175 126.996 103.234 127.934 103.234 129.09V141.301C103.234 142.457 104.175 143.395 105.336 143.395H117.592C118.752 143.395 119.693 142.457 119.693 141.301V129.09C119.693 127.934 118.752 126.996 117.592 126.996Z" class="${c(5)}"/><path d="M127.893 115.316H140.148C141.309 115.316 142.25 114.379 142.25 113.222V101.012C142.25 99.8554 141.309 98.9178 140.148 98.9178H127.893C126.732 98.9178 125.791 99.8554 125.791 101.012V113.222C125.791 114.379 126.732 115.316 127.893 115.316Z" class="${c(6)}"/><path d="M127.893 143.367H140.148C141.309 143.367 142.25 142.43 142.25 141.273V129.063C142.25 127.906 141.309 126.969 140.148 126.969H127.893C126.732 126.969 125.791 127.906 125.791 129.063V141.273C125.791 142.43 126.732 143.367 127.893 143.367Z" class="${c(7)}"/>`)]; })),
    e1: SVU('<path d="M99.7294 164.459C64.0378 164.459 35 135.421 35 99.7294C35 64.0378 64.0378 35 99.7294 35C135.421 35 164.459 64.0378 164.459 99.7294C164.459 135.421 135.421 164.459 99.7294 164.459ZM99.7294 43.7259C68.8531 43.7259 43.7551 68.8239 43.7551 99.7003C43.7551 130.577 68.8531 155.675 99.7294 155.675C130.606 155.675 155.704 130.577 155.704 99.7003C155.704 68.8239 130.606 43.7259 99.7294 43.7259Z" class="g"/><path d="M125.851 104.111H73.6119C71.1897 104.111 69.2344 102.155 69.2344 99.733C69.2344 97.3108 71.1897 95.3555 73.6119 95.3555H125.851C128.273 95.3555 130.228 97.3108 130.228 99.733C130.228 102.155 128.273 104.111 125.851 104.111Z" class="g"/>'),
    e2: SVU('<path d="M99.5611 113.825C74.5013 113.825 54.0909 95.9364 54.0909 73.95C54.0909 71.5596 54.3274 69.1692 54.8265 66.805C49.3889 59.3974 48.811 46.6574 56.9016 38.1465C60.9469 33.8648 66.5683 31.3431 72.6888 31.0279C78.2576 30.7652 83.4587 32.3675 87.2151 35.5197C95.1743 33.5233 103.79 33.497 111.881 35.5197C115.532 32.42 120.733 30.7652 126.144 31.1329C132.055 31.5007 137.545 34.0487 141.59 38.3304C149.155 46.3159 150.18 58.8195 144.269 66.805C144.742 69.1692 145.005 71.5596 145.005 73.95C145.005 95.9364 124.621 113.825 99.5348 113.825H99.5611ZM73.8709 38.9083C73.6082 38.9083 73.3455 38.9083 73.0828 38.9083C69.0638 39.1184 65.2549 40.7996 62.6281 43.584C57.0855 49.3893 57.7159 58.6619 61.9714 63.0487C62.917 64.0469 63.2848 65.4654 62.9433 66.805C62.3129 69.1429 61.9977 71.5596 61.9977 73.95C61.9977 91.6022 78.8618 105.945 99.5874 105.945C120.313 105.945 137.177 91.6022 137.177 73.95C137.177 71.5596 136.862 69.1692 136.231 66.805C135.864 65.4654 136.231 64.0469 137.203 63.0487C141.249 58.8458 141.564 49.6782 135.916 43.7416C133.237 40.9047 129.612 39.2235 125.698 38.9871C122.125 38.777 118.737 39.8539 116.53 41.9554C116.268 42.1918 116.163 42.3494 116.031 42.4807C115.033 43.6365 113.431 44.1094 111.933 43.6628C103.869 41.2724 95.0955 41.2987 87.2413 43.6628C85.6652 44.1619 83.9316 43.584 82.9596 42.2443C82.8546 42.113 82.6969 41.9816 82.5656 41.824C80.5955 39.9327 77.3645 38.8295 73.9234 38.8295L73.8709 38.9083Z" class="g"/><path d="M73.2954 126.455C79.2846 126.455 85.3263 132.181 87.6904 140.062C89.1089 144.79 89.0038 149.781 87.4014 153.774C86.6134 155.744 84.6958 159.237 80.8869 160.367C80.0989 160.603 79.2846 160.708 78.444 160.708C72.4549 160.708 66.4132 154.982 64.0491 147.101C61.3434 138.013 64.4431 128.687 70.8525 126.796C71.6406 126.56 72.4549 126.455 73.2954 126.455ZM73.2954 118.574C71.7194 118.574 70.1433 118.784 68.6197 119.257C57.9286 122.436 52.4911 135.937 56.5101 149.387C59.9512 160.892 69.1713 168.641 78.444 168.641C80.0201 168.641 81.5962 168.431 83.1197 167.958C93.8109 164.78 99.2484 151.278 95.2293 137.829C91.7882 126.323 82.5681 118.574 73.2954 118.574Z" class="g"/><path d="M57.7956 148.944C57.1389 148.944 56.456 148.787 55.8255 148.419C51.465 145.897 48.2603 141.642 46.8418 136.362C45.0031 129.559 46.2114 121.731 50.1253 114.901C54.9061 106.626 65.8074 100.453 73.1625 99.5078C75.3165 99.2189 77.2866 100.742 77.5755 102.896C77.8645 105.05 76.3409 107.021 74.187 107.309C68.7757 108.019 60.2648 113.088 56.9551 118.841C54.0656 123.858 53.1462 129.506 54.4333 134.313C55.0375 136.598 56.456 139.698 59.7132 141.589C61.6045 142.666 62.2612 145.083 61.158 146.974C60.4225 148.235 59.109 148.944 57.7431 148.944H57.7956Z" class="g"/><path d="M141.301 148.944C139.935 148.944 138.622 148.235 137.886 146.974C136.809 145.083 137.44 142.693 139.331 141.589C142.588 139.724 144.007 136.598 144.611 134.313C145.898 129.506 144.979 123.858 142.089 118.841C138.779 113.088 130.269 108.019 124.857 107.309C122.703 107.021 121.18 105.05 121.469 102.896C121.758 100.742 123.728 99.2189 125.882 99.5078C133.237 100.48 144.138 106.626 148.919 114.901C152.859 121.731 154.041 129.532 152.229 136.362C150.81 141.616 147.632 145.897 143.245 148.419C142.615 148.761 141.958 148.944 141.275 148.944H141.301Z" class="g"/><path d="M125.803 126.455C126.644 126.455 127.458 126.586 128.246 126.796C134.656 128.714 137.782 138.013 135.05 147.101C132.686 154.982 126.644 160.708 120.655 160.708C119.814 160.708 119 160.577 118.212 160.367C114.403 159.237 112.485 155.744 111.697 153.774C110.095 149.781 109.99 144.79 111.408 140.062C113.773 132.181 119.814 126.455 125.803 126.455ZM125.803 118.574C116.504 118.574 107.284 126.323 103.869 137.829C99.8505 151.278 105.288 164.754 115.979 167.958C117.529 168.431 119.105 168.641 120.655 168.641C129.954 168.641 139.174 160.892 142.589 149.387C146.608 135.937 141.17 122.462 130.479 119.257C128.929 118.784 127.353 118.574 125.803 118.574Z" class="g"/><path d="M82.8305 78.122C85.1953 78.122 87.1122 76.205 87.1122 73.8403C87.1122 71.4756 85.1953 69.5586 82.8305 69.5586C80.4658 69.5586 78.5488 71.4756 78.5488 73.8403C78.5488 76.205 80.4658 78.122 82.8305 78.122Z" class="g"/><path d="M116.268 78.122C118.633 78.122 120.55 76.205 120.55 73.8403C120.55 71.4756 118.633 69.5586 116.268 69.5586C113.903 69.5586 111.986 71.4756 111.986 73.8403C111.986 76.205 113.903 78.122 116.268 78.122Z" class="g"/><path d="M99.5649 97.4856C106.224 97.4856 111.622 92.9225 111.622 87.2936C111.622 81.6647 106.224 77.1016 99.5649 77.1016C92.9059 77.1016 87.5078 81.6647 87.5078 87.2936C87.5078 92.9225 92.9059 97.4856 99.5649 97.4856Z" class="g"/><path d="M100.483 162.235C96.2535 162.235 92.392 161.92 89.3975 161.578C87.2435 161.342 85.6937 159.372 85.9301 157.218C86.1665 155.064 88.1366 153.514 90.2906 153.75C94.0732 154.197 101.507 154.775 108.705 153.855C110.859 153.593 112.829 155.116 113.118 157.27C113.38 159.424 111.857 161.394 109.703 161.683C106.577 162.077 103.425 162.235 100.483 162.235Z" class="g"/>'),
    e3: SVU('<path d="M142.287 115.433C131.936 115.433 123.504 107.001 123.504 96.6504C123.504 86.2994 131.936 77.8672 142.287 77.8672C152.638 77.8672 161.07 86.2994 161.07 96.6504C161.07 107.001 152.638 115.433 142.287 115.433ZM142.287 85.975C136.395 85.975 131.612 90.7587 131.612 96.6504C131.612 102.542 136.395 107.326 142.287 107.326C148.179 107.326 152.962 102.542 152.962 96.6504C152.962 90.7587 148.179 85.975 142.287 85.975Z" class="g"/><path d="M170.933 155.022C168.879 155.022 167.123 153.482 166.906 151.401C165.474 137.753 154.88 127.483 142.286 127.483C129.692 127.483 119.124 137.78 117.692 151.401C117.449 153.644 115.449 155.239 113.233 155.022C111.016 154.779 109.395 152.779 109.611 150.563C111.476 132.78 125.53 119.375 142.286 119.375C159.042 119.375 173.122 132.78 174.987 150.563C175.23 152.779 173.609 154.779 171.366 155.022C171.231 155.022 171.068 155.022 170.933 155.022Z" class="g"/><path d="M71.3669 96.5658C57.1511 96.5658 45.584 84.9986 45.584 70.7829C45.584 56.5672 57.1511 45 71.3669 45C85.5826 45 97.1498 56.5672 97.1498 70.7829C97.1498 84.9986 85.5826 96.5658 71.3669 96.5658ZM71.3669 53.0809C61.6105 53.0809 53.6918 61.0265 53.6918 70.7559C53.6918 80.4853 61.6375 88.431 71.3669 88.431C81.0963 88.431 89.0419 80.4853 89.0419 70.7559C89.0419 61.0265 81.0963 53.0809 71.3669 53.0809Z" class="g"/><path d="M113.638 155.028C111.584 155.028 109.827 153.488 109.611 151.407C107.395 130.272 90.936 114.354 71.3421 114.354C51.7481 114.354 35.3163 130.272 33.1001 151.407C32.8569 153.65 30.857 155.244 28.6408 155.028C26.4247 154.785 24.8031 152.812 25.0193 150.569C27.6679 125.299 47.5591 106.246 71.315 106.246C95.071 106.246 115.016 125.299 117.665 150.569C117.908 152.785 116.286 154.785 114.043 155.028C113.908 155.028 113.746 155.028 113.611 155.028H113.638Z" class="g"/>'),
    e4: SVU('<path d="M79.0608 96.1412C65.2378 96.1412 53.9902 84.8935 53.9902 71.0705C53.9902 57.2475 65.2378 46 79.0608 46C92.8838 46 104.131 57.2475 104.131 71.0705C104.131 84.8935 92.8838 96.1412 79.0608 96.1412ZM79.0608 53.8575C69.5739 53.8575 61.8741 61.5838 61.8741 71.0444C61.8741 80.505 69.6002 88.2311 79.0608 88.2311C88.5214 88.2311 96.2476 80.505 96.2476 71.0444C96.2476 61.5838 88.5214 53.8575 79.0608 53.8575Z" class="g"/><path d="M120.189 152.985C118.192 152.985 116.484 151.487 116.273 149.464C114.119 128.913 98.1143 113.435 79.0617 113.435C60.0092 113.435 44.0313 128.913 41.8764 149.464C41.6398 151.619 39.6689 153.169 37.5402 152.985C35.3853 152.749 33.8086 150.83 34.0188 148.649C36.5942 124.078 55.9359 105.551 79.0355 105.551C102.135 105.551 121.529 124.078 124.105 148.649C124.341 150.804 122.764 152.749 120.583 152.985C120.452 152.985 120.294 152.985 120.163 152.985H120.189Z" class="g"/><path d="M138.559 103.029C137.377 103.029 136.273 102.503 135.511 101.583L122.923 86.3151C121.53 84.6332 121.793 82.1628 123.448 80.77C125.13 79.4035 127.601 79.64 128.993 81.2956L138.428 92.7534L159.661 65.2389C160.975 63.5045 163.472 63.1891 165.18 64.5293C166.915 65.8696 167.23 68.3399 165.89 70.0481L141.634 101.478C140.898 102.424 139.768 103.002 138.585 103.002H138.533L138.559 103.029Z" class="g"/>'),
  };

  /* ---------- 데이터 ---------- */
  const PRICE = { 30: 150000, 60: 270000, 90: 360000 };     // 143차: 확정 — 60일 = 30일×2 의 10% 할인, 90일 = ×3 의 20% 할인 (PROGRAM 카드와 같음)
  const LIST = { 30: 150000, 60: 300000, 90: 450000 };      // 할인 전 가격
  const FRIENDS = [
    { id: 'beary', name: '베어리', kind: '곰', line: '씩씩하게 용기를<br>북돋아 줘요', color: '#925725', bg: '#F7EBDD', img: 'assets/images/friends/pose-beary.svg' },
    { id: 'ellie', name: '엘리', kind: '코끼리', line: '차분하고 다정하게<br>곁을 지켜요', color: '#286369', bg: '#E2F0F1', img: 'assets/images/friends/pose-ellie.svg' },
    { id: 'rabby', name: '래비', kind: '토끼', line: '새로운 도전을<br>신나게 함께해요', color: '#813350', bg: '#F6E6EC', img: 'assets/images/friends/pose-rabby.svg' },
    { id: 'mio', name: '미오', kind: '고양이', line: '작은 변화도<br>세심하게 살펴요', color: '#7C471B', bg: '#F5EBDD', img: 'assets/images/friends/pose-mio.svg?v=283' },
  ];
  // 138차: 추가 구매 = 동화책 · 주사 보조캡(캐릭터별) · 주사 각도 가이드(구매 전용).
  //   139차: 친구별로 있는 건 주사 보조캡만. 렌탈 기본 포함(대여) = 동화책 1권 + 고른 친구 보조캡 1개 — 그 외는 구매
  const PRODUCTS = [
    { id: 'book', name: '동화책', desc: '콩이와 가디언즈의 모험으로<br>주사와 친해져요', perChar: false, price: 13000, img: 'assets/images/kit/products/book-real.webp' },
    { id: 'cap', name: '주사 보조캡', desc: '바늘을 가려 주사에 대한<br>부담을 덜어 줘요', perChar: true, price: 28000, img: 'assets/images/kit/products/cap-real.webp' },
    { id: 'assist', name: '주사 각도 가이드', desc: '올바른 각도로 주사할 수<br>있도록 도와줘요', perChar: false, buyOnly: true, price: 12000, img: 'assets/images/kit/products/assist-real.webp' },
  ];
  const CHAR_ICON = { beary: 'assets/icons/beary-select.svg?v=273', ellie: 'assets/icons/ellie-select.svg?v=273', rabby: 'assets/icons/rabby-select.svg?v=273', mio: 'assets/icons/mio-select.svg?v=273' };
  const STEPS = [
    { key: 'diag', type: 'single', layout: 'grid2', q: '아이는 언제 1형 당뇨를 진단받았나요?', help: '정확하지 않아도 괜찮아요.', short: '진단 시기',
      opts: [['m1', '1개월 이내', 'd1'], ['m3', '1~3개월 전', 'd2'], ['m6', '3~6개월 전', 'd3'], ['m6p', '6개월 이상', 'd4']] },
    { key: 'exp', type: 'single', layout: 'list', q: '아이는 지금까지 주사 연습을 얼마나 해봤나요?', help: '지금 상황에 가장 가까운 것을 골라 주세요.', short: '연습 경험',
      opts: [['none', '아직 연습해 본 적이 없어요.', 'e1'], ['doll', '인형이나 도구로 연습해 봤어요.', 'e2'], ['help', '보호자의 도움을 받아 주사해 봤어요.', 'e3'], ['self', '스스로 주사한 경험이 있어요.', 'e4']] },
    { key: 'hard', type: 'multi', layout: 'chips', q: '아이는 주사할 때 어떤 부분을 어려워하나요?', help: '해당하는 것을 모두 골라 주세요.', short: '어려워하는 부분',
      opts: [['fear', '주사가 무서워요.'], ['order', '주사 순서가 헷갈려요.'], ['angle', '주사 위치와 각도를 맞추기 어려워요.'], ['wait', '주사 후 기다리기 어려워요.'], ['alone', '혼자 해보는 게 어려워요.'], ['unknown', '아직 잘 모르겠어요.', null, true]] },
    { key: 'friend', type: 'single', layout: 'chars', q: '아이와 함께할 CURO 친구를 선택해 주세요.', help: '키트와 학습 콘텐츠에서 이 친구가 함께해요.', short: '함께할 친구' },
    { key: 'period', type: 'single', layout: 'period', q: '연습 키트를 얼마나 이용하고 싶으신가요?', help: '기간은 상담 중에도 바꿀 수 있어요.', short: '렌탈 기간' },
    { key: 'addons', type: 'products', layout: 'products', q: '함께 이용하고 싶은 상품이 있나요?', help: '추가 상품은 구매 상품이에요. 필요 없으면 추가 없이 넘어가도 돼요.', short: '추가 구매' },
    { key: 'info', type: 'form', q: '거의 다 왔어요! 상담과 배송을 위해 필요한 정보를 알려 주세요.', short: '신청자 정보' },
    { key: 'confirm', type: 'confirm', q: '신청 내용을 확인하고 동의해 주세요.', short: '확인' },
  ];
  // 답에 따른 큐로 반응 (확장용 표). 효과를 단정하지 않는 공감·안내 문구만
  const REACT = {
    hard: (v) => v.includes('unknown') ? '괜찮아요. 상담에서 아이의 모습을 함께 살펴보며 이야기 나눠요.'
      : v.includes('fear') ? '무서운 마음, 천천히 함께 줄여가 봐요.'
      : v.includes('alone') ? '혼자 해보는 연습도 한 단계씩 함께 준비해 봐요.'
      : '알려 주셔서 고마워요. 상담 때 이 부분을 중심으로 안내해 드릴게요.',
    friend: (v) => { const f = FRIENDS.find((x) => x.id === v); return f ? `좋아요! ${f.name}가 연습할 때마다 곁에서 응원할게요.` : ''; },
  };

  /* ---------- 상태 ---------- */
  const A = { diag: null, exp: null, hard: [], friend: null, period: 30, addons: {}, ask: false,
    info: { gName: '', gPhone: '', zip: '', addr: '', addr2: '', times: [], cName: '', cBirth: '', memo: '' },
    agree: { privacy: false, terms: false, guardian: false, marketing: false } };
  let cur = 0, done = false;

  const label = (s, v) => { const o = (s.opts || []).find((x) => x[0] === v); return o ? o[1].replace('\n', ' ') : ''; };
  const prodOf = (key) => PRODUCTS.find((p) => p.id === key.split(':')[0]);
  const addonsTotal = () => Object.entries(A.addons).reduce((t, [k, q]) => { const p = prodOf(k); return t + (p && p.price ? p.price * q : 0); }, 0);
  const addonsList = () => Object.entries(A.addons).map(([k, q]) => { const p = prodOf(k), c = k.split(':')[1], f = FRIENDS.find((x) => x.id === c); return `${p.name}${f ? `(${f.name})` : ''} ${q}개`; });
  const friendName = () => (FRIENDS.find((x) => x.id === A.friend) || {}).name || '고른 친구';
  const answerText = (i) => {
    const s = STEPS[i];
    if (s.key === 'hard') return A.hard.map((v) => label(s, v)).join(' · ');
    if (s.key === 'friend') { const f = FRIENDS.find((x) => x.id === A.friend); return f ? `${f.name}랑 함께할게요!` : ''; }
    if (s.key === 'period') return `${A.period}일`;
    if (s.key === 'addons') { const l = addonsList(); return l.length ? l.join(', ') : '추가 구매 없이 진행할게요'; }
    return label(s, A[s.key]);
  };
  const answered = (i) => {
    const k = STEPS[i].key;
    return k === 'hard' ? A.hard.length > 0 : k === 'addons' || k === 'period' ? true : !!A[k];
  };

  /* ---------- 그리기: 말풍선 ---------- */
  const bot = (html, cls = '') => `<div class="ap-msg ${cls}"><span class="ap-av" aria-hidden="true"><img src="assets/icons/consultation.svg" alt=""></span><div class="ap-bub">${html}</div></div>`;
  const me = (txt, i) => `<div class="ap-me"><p class="ap-me-bub">${esc(txt)}</p><button type="button" class="ap-edit" data-go="${i}">수정</button></div>`;
  const dots = (i) => `<ol class="ap-dots" aria-label="질문 ${i + 1} / 6">${[0, 1, 2, 3, 4, 5].map((n) => `<li class="${n < i ? 'is-done' : n === i ? 'is-cur' : ''}">${n + 1}</li>`).join('')}</ol>`;
  const qBubble = (i, past) => {   // past = 이미 답한 질문 (보조 설명·진행 숫자 없이 짧게)
    const s = STEPS[i];
    const tag = s.type === 'multi' ? '<span class="ap-tag">여러 개 선택 가능</span>' : '';
    if (past) return bot(`<p class="ap-q">${esc(s.q)}</p>`, 'is-past');
    return bot(`<p class="ap-q">${esc(s.q)}${tag}</p>${s.help ? `<p class="ap-help">${esc(s.help)}</p>` : ''}${dots(Math.min(i, 5))}`);
  };

  /* ---------- 그리기: 답변 영역 ---------- */
  function answerUI(i) {
    const s = STEPS[i];
    if (s.layout === 'grid2' || s.layout === 'list') {
      return `<div class="ap-opts ap-${s.layout}" role="radiogroup" aria-label="${esc(s.q)}">` + s.opts.map(([v, t, ic]) =>
        `<button type="button" class="ap-opt" role="radio" aria-checked="${A[s.key] === v}" data-v="${v}"><span class="ap-ic">${IC[ic] || ''}</span><span class="ap-opt-t">${esc(t)}</span><span class="ap-ck" aria-hidden="true"></span></button>`).join('') + '</div>';
    }
    if (s.layout === 'chips') {
      return `<div class="ap-opts ap-chips" role="group" aria-label="${esc(s.q)}">` + s.opts.map(([v, t, , ex]) =>
        `<button type="button" class="ap-opt${ex ? ' is-ex' : ''}" aria-pressed="${A.hard.includes(v)}" data-v="${v}"><span class="ap-box" aria-hidden="true"></span><span class="ap-opt-t">${esc(t).replace('\n', '<br>')}</span></button>`).join('') +
        `</div><p class="ap-count">${A.hard.length ? `${A.hard.length}개 선택됨` : '하나 이상 골라 주세요'}</p>`;
    }
    if (s.layout === 'chars') {
      return '<div class="ap-opts ap-chars" role="radiogroup" aria-label="함께할 친구">' + FRIENDS.map((f) =>
        `<button type="button" class="ap-char" role="radio" aria-checked="${A.friend === f.id}" data-v="${f.id}" style="--c:${f.color};--cb:${f.bg}"><span class="ap-char-img"><img src="${f.img}" alt=""></span><b>${f.name}</b><small>${f.line}</small><span class="ap-ck" aria-hidden="true"></span></button>`).join('') + '</div>';
    }
    if (s.layout === 'period') {
      return '<div class="ap-opts ap-period" role="radiogroup" aria-label="렌탈 기간">' + [[30, '기본'], [60, '10% 할인'], [90, '20% 할인']].map(([d, t]) =>
        `<button type="button" class="ap-per" role="radio" aria-checked="${A.period === d}" data-v="${d}"><b>${d}일</b><small>${t}</small></button>`).join('') + '</div>' +
        `<div class="ap-price"><span>가격</span><span class="ap-price-r">${LIST[A.period] !== PRICE[A.period] ? `<del>${won(LIST[A.period])}</del>` : ''}<strong>${won(PRICE[A.period])}</strong></span></div>`;
    }
    if (s.layout === 'products') {
      const qty = (k, label) => `<div class="ap-qty" aria-label="${label} 수량"><button type="button" data-qty="${k}" data-d="-1" aria-label="빼기">−</button><span>${A.addons[k]}</span><button type="button" data-qty="${k}" data-d="1" aria-label="더하기">+</button></div>`;
      return `<div class="ap-base"><b>기본 제공 (렌탈 포함)</b><span>동화책 1권 · ${esc(friendName())} 주사 보조캡 1개</span></div><ul class="ap-prods">` + PRODUCTS.map((p) => {
        const on = Object.keys(A.addons).some((k) => k.split(':')[0] === p.id);
        let h = `<li class="ap-prod${on ? ' is-on' : ''}${p.perChar ? ' is-char' : ''}${p.buyOnly ? ' has-badge' : ''}">${p.buyOnly ? '<em class="ap-badge">추가 구매 전용</em>' : ''}<div class="ap-prod-top"><span class="ap-prod-img"><img src="${p.img}" alt=""></span>` +
          `<div class="ap-prod-t"><b>${p.name}</b><small>${p.desc}</small><span class="ap-prod-p">${p.price ? won(p.price) : '가격 확정 예정'}</span></div>`;
        if (!p.perChar) h += A.addons[p.id] ? qty(p.id, p.name) : `<button type="button" class="ap-add" data-add="${p.id}">담기</button>`;
        h += '</div>';
        if (p.perChar) h += '<ul class="ap-vars">' + FRIENDS.map((f) => {
          const k = `${p.id}:${f.id}`;
          return `<li class="ap-var${A.addons[k] ? ' is-on' : ''}" style="--c:${f.color}"><img src="${CHAR_ICON[f.id]}" alt=""><span class="ap-var-n">${f.name}${f.id === A.friend ? '<small>기본 포함</small>' : ''}</span>` +
            (A.addons[k] ? qty(k, `${p.name} ${f.name}`) : `<button type="button" class="ap-add ap-add-s" data-add="${k}" aria-label="${p.name} ${f.name} 담기">담기</button>`) + '</li>';
        }).join('') + '</ul>';
        return h + '</li>';
      }).join('') + '</ul>';
    }
    if (s.type === 'form') return formUI();
    if (s.type === 'confirm') return confirmUI();
    return '';
  }

  function formUI() {
    const I = A.info, T = ['오전 (9~12시)', '오후 (12~18시)', '저녁 (18~21시)', '언제든 괜찮아요'];
    const f = (id, lab, v, ph, extra = '') => `<div class="ap-f"><label for="${id}">${lab}</label><input id="${id}" value="${esc(v)}" placeholder="${ph}" ${extra}><p class="ap-err" id="${id}-err"></p></div>`;
    return `<div class="ap-form">
      <section class="ap-card"><h3>보호자 정보</h3>
        <div class="ap-row2">${f('gName', '보호자 이름', I.gName, '이름을 입력해 주세요', 'autocomplete="name"')}${f('gPhone', '연락처', I.gPhone, '010-0000-0000', 'inputmode="numeric" autocomplete="tel"')}</div>
        <div class="ap-f"><label for="zip">주소</label><div class="ap-addr"><input id="zip" value="${esc(I.zip)}" placeholder="우편번호"><button type="button" class="ap-btn-line" id="ap-zip">주소 검색</button></div>
          <input id="addr" value="${esc(I.addr)}" placeholder="기본 주소"><input id="addr2" value="${esc(I.addr2)}" placeholder="상세 주소를 입력해 주세요"><p class="ap-err" id="addr-err"></p></div>
        <div class="ap-f"><span class="ap-lab">통화 가능한 시간 <em>여러 개 선택 가능</em></span><div class="ap-tchips">${T.map((t) => `<button type="button" class="ap-tchip" aria-pressed="${I.times.includes(t)}" data-t="${t}">${t}</button>`).join('')}</div><p class="ap-err" id="times-err"></p></div>
      </section>
      <section class="ap-card"><h3>자녀 정보</h3>
        <div class="ap-row2">${f('cName', '자녀 이름', I.cName, '이름을 입력해 주세요')}${f('cBirth', '생년월일', I.cBirth, '', 'type="date"')}</div>
        <div class="ap-f"><label for="memo">추가로 전달하고 싶은 내용 <em>선택</em></label><textarea id="memo" maxlength="300" rows="3" placeholder="상담 때 참고할 내용이 있다면 적어 주세요">${esc(I.memo)}</textarea><p class="ap-cnt"><span id="memo-n">${I.memo.length}</span>/300</p></div>
      </section></div>`;
  }

  function confirmUI() {
    const I = A.info, f = FRIENDS.find((x) => x.id === A.friend), list = addonsList();
    const row = (k, v, go) => `<div class="ap-row"><dt>${k}</dt><dd>${v}</dd>${go != null ? `<button type="button" class="ap-edit" data-go="${go}">수정</button>` : ''}</div>`;
    const mask = I.gPhone.replace(/(\d{3})-?(\d{3,4})-?(\d{4})/, '$1-****-$3');
    const P = PRICE[A.period];
    const total = P != null ? won(P + addonsTotal()) : '상담 후 안내';
    const ag = (k, t, req) => `<li><label class="ap-agree"><input type="checkbox" data-ag="${k}"${A.agree[k] ? ' checked' : ''}><span class="ap-box" aria-hidden="true"></span><span>${req ? '<em>(필수)</em>' : '<em class="is-opt">(선택)</em>'} ${t}</span></label><button type="button" class="ap-view" data-view="${k}">보기</button></li>`;
    return `<div class="ap-form">
      <section class="ap-card ap-receipt"><h3>상담 답변</h3><dl>
        ${[0, 1, 2].map((i) => row(STEPS[i].short, esc(answerText(i)), i)).join('')}</dl>
        <h3>함께할 친구</h3><dl><div class="ap-row"><dt class="ap-fr">${f ? `<img src="${f.img}" alt="">` : ''}</dt><dd>${f ? f.name : '-'}</dd><button type="button" class="ap-edit" data-go="3">수정</button></div></dl>
        <h3>렌탈 정보</h3><dl>
        ${row('렌탈 기간', `${A.period}일 · ${P != null ? won(P) : '가격 확정 예정'}`, 4)}
        ${row('기본 제공', `동화책 1권 · ${esc(friendName())} 주사 보조캡 1개 (대여)`)}
        ${row('추가 구매', list.length ? esc(list.join(', ')) : '없음', 5)}
        
        <div class="ap-row ap-sum-row"><dt>예상 합계</dt><dd><b>${total}</b></dd></div></dl>
        <h3>신청자 정보</h3><dl>
        ${row('보호자', `${esc(I.gName)} · ${esc(mask)}`, 6)}
        ${row('주소', esc(`${I.addr} ${I.addr2}`.trim()), 6)}
        ${row('통화 시간', esc(I.times.join(', ')), 6)}
        ${row('자녀', `${esc(I.cName)} · ${esc(I.cBirth)}`, 6)}</dl>
        <p class="ap-pay">결제는 상담 후 진행돼요. 지금은 상담 신청만 완료돼요.</p>
      </section>
      <section class="ap-card ap-agrees"><label class="ap-agree ap-all"><input type="checkbox" id="ap-all"${Object.values(A.agree).every(Boolean) ? ' checked' : ''}><span class="ap-box" aria-hidden="true"></span><b>전체 동의</b></label>
        <ul>${ag('privacy', '개인정보 수집·이용 동의', 1)}${ag('terms', '렌탈 이용약관 동의', 1)}${ag('guardian', '법정대리인(보호자) 동의 — 만 14세 미만 자녀 정보', 1)}${ag('marketing', '학습 소식·혜택 안내 받기', 0)}</ul></section></div>`;
  }

  // 138차: 완료 = 그림 · 제목 · 한 줄 안내 · 다음 순서 카드 · 홈 버튼 (내용 줄임)
  function doneUI() {
    const f = FRIENDS.find((x) => x.id === A.friend) || FRIENDS[0];
    return `<div class="ap-done" style="--c:${f.color};--cb:${f.bg}">
      <span class="ap-done-img"><img src="${f.img}" alt="${f.name}"></span>
      <h2>신청이 완료되었어요</h2>
      <p>보내주신 내용을 확인한 뒤 <b>1~2영업일</b> 안에<br>${esc(A.info.gName || '○○○')}님께 연락드릴게요.</p>
      <ol class="ap-next"><li class="is-done"><b>신청 접수</b><small>완료</small></li><li><b>상담 연락</b><small>1~2영업일 이내</small></li><li><b>결제 · 키트 배송</b><small>상담 후 진행</small></li></ol></div>`;
  }

  /* ---------- 전체 그리기 ---------- */
  function render(scroll = true) {
    const log = $('ap-log');
    if (done) {
      log.innerHTML = doneUI(); log.classList.add('is-done');
      $('ap-foot').hidden = true; $('ap-phase').hidden = true; $$('ap-sum').classList.add('is-done'); $$('ap').classList.add('is-done');
      $('ap-body').scrollTop = 0; return;
    }
    let h = bot('안녕하세요! CURO 렌탈을 도와드릴게요.<br>몇 가지만 선택하면 상담 신청이 완료돼요 :)');
    for (let i = 0; i < cur; i++) {
      if (i >= 6) break;                                   // 7·8 단계는 말풍선 기록 대신 화면 전환
      h += qBubble(i, true) + me(answerText(i), i);
      const r = REACT[STEPS[i].key];
      if (r) { const t = r(A[STEPS[i].key]); if (t) h += bot(esc(t), 'is-react'); }
    }
    if (cur >= 6) h = '';                                  // 정보 입력부터는 폼 화면
    h += (cur < 6 ? qBubble(cur) : bot(`<p class="ap-q">${esc(STEPS[cur].q)}</p>${dots(5)}`)) + `<div class="ap-ans ap-ans-${STEPS[cur].layout || STEPS[cur].type}" id="ap-ans">${answerUI(cur)}</div>`;
    log.innerHTML = h;
    log.classList.toggle('is-static', !scroll);   // 143차: 같은 단계 안에서 고르기만 바뀌면 말풍선이 다시 올라오지 않게
    log.classList.remove('is-done');
    // 진행: 1~6 = 말풍선 안 숫자, 7·8 = 머리 아래 막대
    const ph = false;   // 143차: 7·8 단계도 막대 대신 숫자 원 (6단계로 봄)
    $('ap-phase').hidden = !ph;
    if (ph) { $('ap-phase-name').textContent = cur === 6 ? '정보 입력' : '마지막 확인'; $('ap-phase-n').textContent = `${cur + 1} / 8`; $('ap-phase-fill').style.width = `${((cur + 1) / 8) * 100}%`; }
    renderFoot(); renderSum();
    if (scroll) {
      const body = $('ap-body');
      if (cur >= 6) body.scrollTop = 0;
      else requestAnimationFrame(() => { const q = log.querySelector('.ap-msg:nth-last-of-type(1)'); const a = $('ap-ans'); const t = (a ? a.previousElementSibling : q); body.scrollTo({ top: Math.max(0, t.offsetTop - 16), behavior: 'smooth' }); });
    }
  }

  function canNext() {
    const k = STEPS[cur].key;
    if (k === 'confirm') return A.agree.privacy && A.agree.terms && A.agree.guardian;
    if (k === 'info') return true;                         // 누르면 검사
    return answered(cur);
  }
  function renderFoot() {
    const s = STEPS[cur];
    $('ap-prev').style.visibility = cur > 0 ? 'visible' : 'hidden';
    let r = '';
    if (s.type === 'single' && s.layout !== 'period') r = '';   // 고르면 자동으로 넘어감
    else if (s.key === 'addons') r = `<button type="button" class="ap-btn-line" data-next="skip"${addonsList().length ? ' disabled' : ''}>추가 없이 다음</button><button type="button" class="ap-btn" data-next="1"${addonsList().length ? '' : ' disabled'}>담고 다음</button>`;
    else if (s.key === 'confirm') r = `<button type="button" class="ap-btn" data-next="1"${canNext() ? '' : ' disabled'}>상담 신청 완료</button>`;
    else r = `<button type="button" class="ap-btn" data-next="1"${canNext() ? '' : ' disabled'}>다음</button>`;
    if (s.type === 'single' && s.layout !== 'period' && answered(cur)) r = '<button type="button" class="ap-btn" data-next="1">다음</button>';
    $('ap-btns-r').innerHTML = r;
    $('ap-foot').hidden = !r && cur === 0;   // 첫 질문에서 아직 고르지 않았으면 아래 버튼 줄 숨김 (빈 줄 방지)
    // 금액 막대 (기간·추가 상품 단계)
    const tb = $('ap-total');
    tb.hidden = !(s.key === 'period' || s.key === 'addons');
    if (!tb.hidden) {
      const P = PRICE[A.period], ad = addonsTotal();
      tb.innerHTML = `<span>렌탈 ${P != null ? won(P) : '확정 예정'}</span><span>+ 추가 ${won(ad)}</span><b>합계 ${P != null ? won(P + ad) : '상담 후 안내'}</b>`;
    }
  }

  function renderSum() {
    const rows = [];
    for (let i = 0; i < 6; i++) if (i < cur || (i === cur && answered(i) && (i === 4))) rows.push(`<div><dt>${STEPS[i].short}</dt><dd>${esc(i === 3 ? (FRIENDS.find((x) => x.id === A.friend) || {}).name || '' : answerText(i))}</dd></div>`);
    $$('ap-sum-list').innerHTML = rows.join('') || '<p class="ap-sum-empty">질문에 답하면 여기에 차곡차곡 모여요.</p>';
    const P = PRICE[A.period], ad = addonsTotal();
    $$('ap-sum-price').innerHTML = cur >= 4 ? `<span>예상 금액</span><b>${P != null ? won(P + ad) : '상담 후 안내'}</b>` : '';
  }

  /* ---------- 이동 ---------- */
  function go(i) { cur = Math.max(0, Math.min(STEPS.length - 1, i)); render(); }
  function next() {
    if (STEPS[cur].key === 'info' && !validate()) return;
    if (STEPS[cur].key === 'confirm') { if (!canNext()) return; done = true; render(); return; }
    go(cur + 1);
  }

  function validate() {
    const I = A.info; let ok = true, first = null;
    const err = (id, msg) => { const e = $(id + '-err'); if (e) e.textContent = msg || ''; const inp = $(id); if (inp) inp.setAttribute('aria-invalid', msg ? 'true' : 'false'); if (msg) { ok = false; first = first || id; } };
    err('gName', I.gName.trim() ? '' : '보호자 이름을 입력해 주세요.');
    err('gPhone', /^01\d-?\d{3,4}-?\d{4}$/.test(I.gPhone) ? '' : '연락처를 정확히 입력해 주세요.');
    err('addr', I.addr && I.addr2.trim() ? '' : '주소와 상세 주소를 입력해 주세요.');
    err('times', I.times.length ? '' : '통화 가능한 시간을 골라 주세요.');
    err('cName', I.cName.trim() ? '' : '자녀 이름을 입력해 주세요.');
    err('cBirth', I.cBirth ? '' : '생년월일을 입력해 주세요.');
    if (first) { const el = $(first) || document.querySelector(`[data-t]`); if (el && el.focus) el.focus(); }
    return ok;
  }

  /* ---------- 입력 ---------- */
  let autoT = 0;
  document.addEventListener('click', (e) => {
    if (PANEL && !PANEL.contains(e.target)) return;   // 사이트에서는 상담 패널 안 클릭만
    const t = e.target.closest('button, [data-go]');
    if (!t) return;
    if (t.dataset.go != null) { go(+t.dataset.go); return; }
    if (t.dataset.next) { if (t.dataset.next === 'skip') A.addons = {}; next(); return; }
    if (t.id === 'ap-prev') { go(cur - 1); return; }
    const s = STEPS[cur];
    if (t.classList.contains('ap-opt') && s.type === 'single') {
      A[s.key] = t.dataset.v; render(false);
      clearTimeout(autoT); autoT = setTimeout(() => go(cur + 1), 400);   // 하나 고르면 잠깐 보여 주고 다음 질문
      return;
    }
    if (t.classList.contains('ap-char')) { A.friend = t.dataset.v; render(false); clearTimeout(autoT); autoT = setTimeout(() => go(cur + 1), 550); return; }
    if (t.classList.contains('ap-opt') && s.type === 'multi') {
      const v = t.dataset.v, ex = t.classList.contains('is-ex');
      if (A.hard.includes(v)) A.hard = A.hard.filter((x) => x !== v);
      else A.hard = ex ? [v] : A.hard.filter((x) => x !== 'unknown').concat(v);   // '아직 잘 모르겠어요' 는 다른 것과 함께 고를 수 없음
      render(false); return;
    }
    if (t.classList.contains('ap-per')) { A.period = +t.dataset.v; render(false); return; }
    if (t.dataset.add) { A.addons[t.dataset.add] = 1; render(false); return; }
    if (t.dataset.qty) { const id = t.dataset.qty, n = (A.addons[id] || 0) + (+t.dataset.d); if (n <= 0) delete A.addons[id]; else A.addons[id] = Math.min(9, n); render(false); return; }
    if (t.dataset.t) { const v = t.dataset.t, T = A.info.times; A.info.times = T.includes(v) ? T.filter((x) => x !== v) : T.concat(v); t.setAttribute('aria-pressed', A.info.times.includes(v)); return; }
    if (t.id === 'ap-zip') { findAddress(); return; }   // 268차: 실제 주소 검색
    if (t.dataset.view) { openSheet(t.dataset.view); return; }
  });
  /* 268차: 주소 검색 = 카카오(다음) 우편번호 서비스 (무료 · 키 필요 없음). 처음 누를 때 스크립트를 불러와 패널 위에 검색 창을 띄움.
     고르면 우편번호 · 기본 주소를 채우고 상세 주소 칸으로. 불러오지 못하면 직접 입력 안내 */
  const POSTCODE_SRC = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  let postLoad = null;
  function loadPostcode() {
    if (window.daum && window.daum.Postcode) return Promise.resolve();
    if (!postLoad) postLoad = new Promise((ok, no) => {
      const sc = document.createElement('script');
      sc.src = POSTCODE_SRC; sc.async = true; sc.onload = ok; sc.onerror = () => { postLoad = null; no(); };
      document.head.appendChild(sc);
    });
    return postLoad;
  }
  function findAddress() {
    const host = PANEL || document.body;
    const lay = document.createElement('div');
    lay.className = 'ap-post' + (PANEL ? '' : ' is-fixed');
    lay.innerHTML = '<div class="ap-post-box" role="dialog" aria-modal="true" aria-label="주소 검색"><div class="ap-post-head"><b>주소 검색</b><button type="button" class="ap-post-x" aria-label="닫기">×</button></div><div class="ap-post-body"><p class="ap-post-msg">주소 검색을 불러오는 중이에요…</p></div></div>';
    host.appendChild(lay);
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const close = () => { lay.remove(); document.removeEventListener('keydown', onKey); };
    document.addEventListener('keydown', onKey);
    lay.addEventListener('click', (e) => { if (e.target === lay || e.target.closest('.ap-post-x')) close(); });
    const body = lay.querySelector('.ap-post-body');
    loadPostcode().then(() => {
      if (!lay.isConnected) return;
      body.innerHTML = '';
      new window.daum.Postcode({
        width: '100%', height: '100%',
        oncomplete: (d) => {
          const road = d.userSelectedType !== 'J';
          let addr = road ? d.roadAddress : d.jibunAddress;
          if (road) {
            const ex = [/[동로가]$/.test(d.bname || '') ? d.bname : '', d.apartment === 'Y' ? d.buildingName : ''].filter(Boolean).join(', ');
            if (ex) addr += ` (${ex})`;
          }
          A.info.zip = d.zonecode; A.info.addr = addr;
          const z = $('zip'), a = $('addr'), a2 = $('addr2');
          if (z) z.value = d.zonecode;
          if (a) a.value = addr;
          close();
          if (a2) a2.focus();
        }
      }).embed(body, { autoClose: false });
    }, () => { body.innerHTML = '<p class="ap-post-msg">주소 검색을 불러오지 못했어요.<br>인터넷 연결을 확인하거나 주소를 직접 입력해 주세요.</p>'; });
  }
  document.addEventListener('input', (e) => {
    if (PANEL && !PANEL.contains(e.target)) return;
    const t = e.target;
    if (t.id === 'ap-all') { Object.keys(A.agree).forEach((k) => { A.agree[k] = t.checked; }); document.querySelectorAll('[data-ag]').forEach((c) => { c.checked = t.checked; }); renderFoot(); return; }
    if (t.dataset.ag) { A.agree[t.dataset.ag] = t.checked; const all = $('ap-all'); if (all) all.checked = Object.values(A.agree).every(Boolean); renderFoot(); return; }
    if (t.id in A.info) {
      let v = t.value;
      if (t.id === 'gPhone') { const d = v.replace(/\D/g, '').slice(0, 11); v = d.length > 7 ? `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}` : d.length > 3 ? `${d.slice(0, 3)}-${d.slice(3)}` : d; t.value = v; }
      A.info[t.id] = v;
      if (t.id === 'memo') $('memo-n').textContent = v.length;
    }
  });

  /* ---------- 약관 시트 ---------- */
  const TERMS = {
    privacy: ['개인정보 수집·이용 동의', '수집 항목: 보호자 이름, 연락처, 주소, 통화 가능 시간, 자녀 이름·생년월일, 상담 답변<br>이용 목적: 렌탈 상담, 키트 배송, 문의 응대<br>보관 기간: 상담 종료 후 1년 또는 렌탈 종료 시까지 (시안 — 실제 문구로 교체)'],
    terms: ['렌탈 이용약관', '렌탈 기간, 반납·회수, 분실·파손 시 처리 등 이용 조건 (시안 — 실제 약관으로 교체)'],
    guardian: ['법정대리인 동의', '만 14세 미만 자녀의 개인정보를 수집하기 위해 법정대리인(보호자)의 동의가 필요해요. (시안 — 실제 문구로 교체)'],
    marketing: ['학습 소식·혜택 안내', '새 학습 콘텐츠와 혜택 소식을 문자로 받아요. 동의하지 않아도 신청할 수 있어요.'],
  };
  function openSheet(k) { $('ap-sheet-t').textContent = TERMS[k][0]; $('ap-sheet-body').innerHTML = TERMS[k][1]; $('ap-sheet').hidden = false; $('ap-sheet-ok').focus(); }
  $('ap-sheet-ok').addEventListener('click', () => { $('ap-sheet').hidden = true; });
  $('ap-sheet').addEventListener('click', (e) => { if (e.target.id === 'ap-sheet') $('ap-sheet').hidden = true; });

  /* ---------- 모바일: 선택 내용 시트 ---------- */
  const sum = $$('ap-sum'), dim = $$('ap-dim');
  const setSum = (on) => { sum.classList.toggle('is-open', on); dim.hidden = !on; };
  $$('ap-sum-open').addEventListener('click', () => setSum(true));
  $$('ap-sum-close').addEventListener('click', () => setSum(false));
  dim.addEventListener('click', () => setSum(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setSum(false); $('ap-sheet').hidden = true; } });

  // 확인용: apply-proposal.html?step=4 처럼 바로 그 단계로 (시안 캡처용, 예시 답 채움)
  const qs = new URLSearchParams(location.search);
  if (!PANEL && qs.get('demo')) {
    Object.assign(A, { diag: 'm3', exp: 'doll', hard: ['fear', 'angle'], friend: 'beary', period: 30, addons: { assist: 1, 'cap:ellie': 1 } });
    Object.assign(A.info, { gName: '김보호', gPhone: '010-1234-5678', zip: '04524', addr: '서울특별시 중구 세종대로 110', addr2: '101동 1001호', times: ['오후 (12~18시)'], cName: '김콩이', cBirth: '2019-05-12' });
  }
  if (!PANEL && qs.get('step')) cur = Math.max(0, Math.min(7, +qs.get('step') - 1));
  if (!PANEL && qs.get('done')) done = true;
  render(!!qs.get('step'));
  window.CURO_APPLY = { A, go, STEPS };
})();
