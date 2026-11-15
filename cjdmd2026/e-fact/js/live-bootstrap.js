(() => {
  'use strict';
  const scriptURL = document.currentScript?.src;
  const localHost = ['127.0.0.1', 'localhost'].includes(location.hostname);
  if (location.protocol !== 'file:' && !(localHost && location.port !== '8765')) return;
  // Resolve from this script's folder, even if the entire website was moved or nested.
  const root = scriptURL ? new URL('../', scriptURL) : new URL('..', location.href);
  const relativePath = location.pathname.startsWith(root.pathname)
    ? location.pathname.slice(root.pathname.length) : 'main-atmosphere/intro.html';
  const target = new URL(relativePath, 'http://127.0.0.1:8765/');
  target.search = location.search;
  target.hash = location.hash;
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
      detail.textContent = '실시간 대기질·배출 자료는 서버 실행이 필요합니다. 웹사이트 폴더의 “E.FACT 실시간 실행.command”를 실행해 주세요.';
      const button = document.createElement('button');button.type = 'button';button.textContent = '확인 · 닫기';
      button.style.cssText = 'cursor:pointer;padding:7px 14px;border:1px solid #59d2c4;background:#063c40;color:#b8f5e8;font:inherit';
      button.addEventListener('click', () => notice.remove());
      notice.append(title, detail, button);document.body.append(notice);
    });
  }
  async function connect(showNotice) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    try {
      await fetch('http://127.0.0.1:8765/api/health', {mode:'no-cors',cache:'no-store',signal:controller.signal});
      clearTimeout(timer);location.replace(target.href);
    } catch {
      clearTimeout(timer);if(showNotice)offline();
      setTimeout(() => connect(false), 15000);
    }
  }
  connect(true);
})();
