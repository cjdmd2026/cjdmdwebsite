(function () {
  'use strict';
  if (typeof HTMLAudioElement === 'undefined' || !window.Promise) return;

  var proto = HTMLAudioElement.prototype;
  var basePlay = HTMLMediaElement.prototype.play;
  var basePause = HTMLMediaElement.prototype.pause;
  var blocked = [];

  proto.play = function () {
    var el = this;
    el.__wantPlay = true;
    var p = basePlay.call(el);
    if (p && typeof p.then === 'function') {
      p.then(null, function (err) {
        if (err && err.name === 'NotAllowedError' && el.__wantPlay && blocked.indexOf(el) < 0) {
          blocked.push(el);
        }
      });
    }
    return p;
  };

  proto.pause = function () {
    this.__wantPlay = false;
    return basePause.call(this);
  };

  function retry() {
    if (!blocked.length) return;
    var list = blocked;
    blocked = [];
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (el.__wantPlay && el.paused && !el.ended) {
        try {
          var p = basePlay.call(el);
          if (p && p.catch) p.catch(function () {});
        } catch (e) {}
      }
    }
  }

  ['touchend', 'pointerdown', 'click', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, retry, true);
  });
})();
