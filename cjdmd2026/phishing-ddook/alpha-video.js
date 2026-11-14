(function () {
  'use strict';

  var ua = navigator.userAgent || '';
  var isIOS = /iP(hone|ad|od)/.test(ua) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isSafari = /Safari\//.test(ua) && !/(Chrome|Chromium|CriOS|FxiOS|EdgiOS|Edg\/|OPR|Android)/.test(ua);

  var mode = (isIOS || isSafari) ? 'canvas' : 'native';
  try {
    var q = new URLSearchParams(location.search).get('alpha');
    if (q === 'canvas' || q === 'native') sessionStorage.setItem('alphaMode', q);
    if (q === 'auto') sessionStorage.removeItem('alphaMode');
    var saved = sessionStorage.getItem('alphaMode');
    if (saved === 'canvas' || saved === 'native') mode = saved;
  } catch (e) {}

  var STACKED_RE = /_alpha\.mp4(\?|#|$)/;
  var pairs = [];
  var loopRunning = false;
  var hasRVFC = typeof HTMLVideoElement !== 'undefined' &&
                'requestVideoFrameCallback' in HTMLVideoElement.prototype;

  function injectStyle() {
    if (document.getElementById('alpha-video-style')) return;
    var s = document.createElement('style');
    s.id = 'alpha-video-style';
    s.textContent =
      'video.av-source{-webkit-clip-path:inset(50%)!important;clip-path:inset(50%)!important;}' +
      'canvas.av-canvas{position:absolute;pointer-events:none;margin:0;padding:0;border:0;' +
      'box-sizing:border-box;max-width:none;max-height:none;min-width:0;min-height:0;}';
    (document.head || document.documentElement).appendChild(s);
  }

  function url(path) {
    if (!path) return path;
    if (mode !== 'canvas') return path;
    return String(path).replace(/\.webm(\?|#|$)/i, '_alpha.mp4$1');
  }
  function isStacked(v) {
    return STACKED_RE.test(v.currentSrc || v.src || '');
  }

  var VS = 'attribute vec2 p;varying vec2 uv;' +
           'void main(){uv=vec2((p.x+1.0)*0.5,(1.0-p.y)*0.5);gl_Position=vec4(p,0.0,1.0);}';
  var FS = 'precision mediump float;uniform sampler2D t;varying vec2 uv;' +
           'void main(){' +
           ' vec3 c=texture2D(t,vec2(uv.x,uv.y*0.5)).rgb;' +
           ' float a=texture2D(t,vec2(uv.x,0.5+uv.y*0.5)).g;' +
           ' a=a<0.02?0.0:a;' +
           ' gl_FragColor=vec4(min(c,vec3(a)),a);' +
           '}';

  function makeGL(c) {
    var opts = { alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: true,
                 antialias: false, depth: false, stencil: false };
    var gl = c.getContext('webgl', opts) || c.getContext('experimental-webgl', opts);
    if (!gl) return null;
    function sh(type, src) {
      var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o);
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o));
      return o;
    }
    try {
      var prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
      gl.useProgram(prog);
      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      var tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.clearColor(0, 0, 0, 0);
      return gl;
    } catch (e) {
      console.warn('[alpha-video] WebGL 준비 실패, 느린 방식으로 그려요:', e);
      return null;
    }
  }

  function draw2D(st) {
    var v = st.v, w = v.videoWidth, h = v.videoHeight, hh = h >> 1;
    if (!st.tmp) { st.tmp = document.createElement('canvas'); }
    if (st.tmp.width !== w || st.tmp.height !== h) { st.tmp.width = w; st.tmp.height = h; }
    var tctx = st.tmp.getContext('2d', { willReadFrequently: true });
    tctx.drawImage(v, 0, 0, w, h);
    var top = tctx.getImageData(0, 0, w, hh), bot = tctx.getImageData(0, hh, w, hh);
    var d = top.data, m = bot.data;
    for (var i = 0; i < d.length; i += 4) {
      var a = m[i + 1];
      if (a < 5) { d[i + 3] = 0; continue; }
      var k = 255 / a;
      d[i] = Math.min(255, d[i] * k); d[i + 1] = Math.min(255, d[i + 1] * k); d[i + 2] = Math.min(255, d[i + 2] * k);
      d[i + 3] = a;
    }
    st.ctx2d.putImageData(top, 0, 0);
  }

  function drawFrame(st) {
    var v = st.v, c = st.c;
    if (v.readyState < 2 || !v.videoWidth || !isStacked(v)) return false;
    var w = v.videoWidth, h = v.videoHeight >> 1;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    if (st.gl === undefined) {
      st.gl = makeGL(c);
      if (!st.gl) st.ctx2d = c.getContext('2d');
    }
    try {
      if (st.gl) {
        var gl = st.gl;
        gl.viewport(0, 0, w, h);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, v);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      } else if (st.ctx2d) {
        draw2D(st);
      }
      st.drawn = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearCanvas(st) {
    st.drawn = false;
    if (st.gl) { st.gl.clear(st.gl.COLOR_BUFFER_BIT); }
    else if (st.ctx2d) { st.ctx2d.clearRect(0, 0, st.c.width, st.c.height); }
  }

  var COPY = ['transform', 'transformOrigin', 'filter', 'webkitFilter', 'opacity', 'visibility',
              'zIndex', 'objectFit', 'objectPosition', 'borderRadius'];

  function sync(st) {
    var v = st.v, c = st.c;
    if (!v.isConnected) { if (c.parentNode) c.parentNode.removeChild(c); return; }
    if (c.parentNode !== v.parentNode || v.nextSibling !== c) {
      v.parentNode.insertBefore(c, v.nextSibling);
    }
    var cs = getComputedStyle(v);
    var hidden = cs.display === 'none' || (v.offsetWidth === 0 && v.offsetHeight === 0);
    var css = c.style;
    if (hidden) { if (css.display !== 'none') css.display = 'none'; return; }
    if (css.display === 'none') css.display = '';

    var pos = cs.position === 'fixed' ? 'fixed' : 'absolute';
    var box = pos + '|' + v.offsetLeft + '|' + v.offsetTop + '|' + v.offsetWidth + '|' + v.offsetHeight;
    if (box !== st.lastBox) {
      st.lastBox = box;
      css.position = pos;
      css.left = v.offsetLeft + 'px';
      css.top = v.offsetTop + 'px';
      css.width = v.offsetWidth + 'px';
      css.height = v.offsetHeight + 'px';
    }
    for (var i = 0; i < COPY.length; i++) {
      var k = COPY[i], val = cs[k];
      if (val === undefined) continue;
      if (k === 'zIndex' && val === 'auto') val = '';
      if (st.last[k] !== val) { st.last[k] = val; css[k] = val; }
    }
  }

  function tick() {
    if (!pairs.length) { loopRunning = false; return; }
    for (var i = pairs.length - 1; i >= 0; i--) {
      var st = pairs[i];
      try {
        sync(st);
        var v = st.v;
        if (v.currentTime !== st.lastT) {
          st.lastT = v.currentTime;
          if (!hasRVFC || v.paused) st.dirty = true;
        }
        if (st.dirty && drawFrame(st)) st.dirty = false;
      } catch (e) { }
    }
    requestAnimationFrame(tick);
  }
  function startLoop() {
    if (loopRunning) return;
    loopRunning = true;
    requestAnimationFrame(tick);
  }

  function prime(st) {
    var v = st.v;
    if (st.priming || v.readyState >= 2 || !v.paused || !isStacked(v)) return;
    st.priming = true;
    st.userPlayed = false;
    var t0 = v.currentTime, wasMuted = v.muted;
    st.primeMuted = wasMuted;
    v.muted = true;
    var p;
    try { p = st.origPlay(); } catch (e) { p = null; }
    var done = function () {
      if (!st.userPlayed) {
        try { v.pause(); } catch (e) {}
        try { v.currentTime = t0; } catch (e) {}
        v.muted = wasMuted;
      }
      st.priming = false;
      st.dirty = true;
    };
    if (p && p.then) p.then(done, function () { if (!st.userPlayed) v.muted = wasMuted; st.priming = false; });
    else done();
  }

  var gestureHooked = false;
  function hookGesturePrime() {
    if (gestureHooked) return;
    gestureHooked = true;
    var onGesture = function () {
      for (var i = 0; i < pairs.length; i++) {
        var st = pairs[i];
        if (!st.drawn && st.v.paused && st.v.readyState < 2) prime(st);
      }
    };
    document.addEventListener('touchend', onGesture, true);
    document.addEventListener('pointerdown', onGesture, true);
  }

  function find(v) {
    for (var i = 0; i < pairs.length; i++) if (pairs[i].v === v) return pairs[i];
    return null;
  }

  function attach(v) {
    if (mode !== 'canvas' || !v || find(v)) return;
    injectStyle();
    var c = document.createElement('canvas');
    c.className = 'av-canvas';
    c.setAttribute('aria-hidden', 'true');
    c.style.display = 'none';
    v.classList.add('av-source');
    var st = { v: v, c: c, last: {}, lastBox: '', lastT: -1, dirty: true, drawn: false };
    pairs.push(st);

    st.origPlay = v.play.bind(v);
    v.play = function () {
      if (st.priming) { st.userPlayed = true; v.muted = st.primeMuted; }
      return st.origPlay();
    };

    v.addEventListener('loadedmetadata', function () {
      if (isStacked(v) && v.videoWidth && v.videoHeight) {
        v.style.aspectRatio = v.videoWidth + ' / ' + (v.videoHeight / 2);
      }
      st.dirty = true;
      setTimeout(function () { prime(st); }, 250);
    });
    v.addEventListener('emptied', function () { clearCanvas(st); st.dirty = true; });
    ['loadeddata', 'seeked', 'playing', 'canplay'].forEach(function (ev) {
      v.addEventListener(ev, function () { st.dirty = true; });
    });
    if (hasRVFC) {
      var onFrame = function () { st.dirty = true; v.requestVideoFrameCallback(onFrame); };
      v.requestVideoFrameCallback(onFrame);
    }
    if (v.parentNode) v.parentNode.insertBefore(c, v.nextSibling);
    hookGesturePrime();
    startLoop();
  }

  function setSrc(v, path) {
    if (!v) return;
    attach(v);
    v.src = url(path);
  }

  function scan(root) {
    var list = (root || document).querySelectorAll('video[data-alpha-src]');
    for (var i = 0; i < list.length; i++) {
      var v = list[i];
      if (v.__avScanned) continue;
      v.__avScanned = true;
      setSrc(v, v.getAttribute('data-alpha-src'));
    }
  }

  function aspect(v) {
    if (!v || !v.videoWidth || !v.videoHeight) return null;
    return isStacked(v) ? v.videoWidth / (v.videoHeight / 2) : v.videoWidth / v.videoHeight;
  }
  function frame(v) {
    var st = find(v);
    if (st && isStacked(v)) {
      if (!st.drawn || st.dirty) drawFrame(st);
      if (!st.drawn) return null;
      return { source: st.c, width: st.c.width, height: st.c.height };
    }
    if (!v || v.readyState < 2 || !v.videoWidth) return null;
    return { source: v, width: v.videoWidth, height: v.videoHeight };
  }

  function playWithFallback(v) {
    var p;
    try { p = v.play(); } catch (e) { p = Promise.reject(e); }
    if (!p || !p.catch) return Promise.resolve();
    return p.catch(function (err) {
      if (!err || err.name !== 'NotAllowedError') { console.log('영상 재생 실패:', err); return; }
      console.log('🔇 자동재생이 막혀서 소리 없이 먼저 재생해요. 화면을 누르면 소리와 함께 다시 시작합니다.');
      var wasMuted = v.muted;
      v.muted = true;
      v.play().catch(function () {});
      var once = function () {
        document.removeEventListener('pointerdown', once, true);
        document.removeEventListener('touchend', once, true);
        document.removeEventListener('click', once, true);
        v.muted = wasMuted;
        try { v.currentTime = 0; } catch (e) {}
        v.play().catch(function () {});
      };
      document.addEventListener('pointerdown', once, true);
      document.addEventListener('touchend', once, true);
      document.addEventListener('click', once, true);
    });
  }

  window.AlphaVideo = {
    mode: mode,
    url: url,
    attach: attach,
    setSrc: setSrc,
    scan: scan,
    aspect: aspect,
    frame: frame,
    playWithFallback: playWithFallback
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scan(); });
  } else {
    scan();
  }
})();
