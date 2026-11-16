(function () {
  'use strict';

  var mobileAgent = /Android|iPhone|iPad|iPod|Mobile|IEMobile|Windows Phone|BlackBerry|BB10|Opera Mini/i.test(navigator.userAgent || '');
  // iPadOS can identify itself as a Mac when requesting desktop websites.
  var desktopIPad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  var mobileHint = navigator.userAgentData && navigator.userAgentData.mobile;

  if (!mobileAgent && !desktopIPad && !mobileHint) return;

  var notice = new URL('desktop-only.html', document.currentScript.src);
  document.documentElement.style.display = 'none';
  // Stop the experience before its videos, audio and session scripts load.
  window.stop();
  window.location.replace(notice.href);
})();
