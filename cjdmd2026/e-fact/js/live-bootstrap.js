(() => {
  'use strict';
  if (location.protocol !== 'file:') return;
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }
  function offline() {
    ready(() => {
      if (document.querySelector('#efact-local-notice')) return;
      const notice = document.createElement('aside');
      notice.id = 'efact-local-notice';
      notice.setAttribute('aria-label', '실시간 데이터 실행 안내');
      notice.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:9999;width:min(370px,calc(100vw - 32px));box-sizing:border-box;padding:18px 20px;background:#0b2328;color:#edf4ef;border:1px solid #37736e;box-shadow:0 8px 30px #0006;font:13px/1.7 sans-serif';
      const title = document.createElement('strong');title.textContent = '페이지는 바로 둘러볼 수 있습니다.';
      const detail = document.createElement('p');detail.style.margin = '8px 0 12px';
      detail.textContent = '실시간 자료는 웹사이트 주소로 접속해야 볼 수 있어요. 파일을 직접 연 상태에서는 자료에 연결할 수 없습니다.';
      const button = document.createElement('button');button.type = 'button';button.textContent = '확인 · 닫기';
      button.style.cssText = 'cursor:pointer;padding:7px 14px;border:1px solid #59d2c4;background:#063c40;color:#b8f5e8;font:inherit';
      button.addEventListener('click', () => notice.remove());
      notice.append(title, detail, button);document.body.append(notice);
    });
  }
  offline();
})();
