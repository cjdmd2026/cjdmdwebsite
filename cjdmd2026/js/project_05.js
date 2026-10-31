/* Project slide variant: scene-colored personal icon matrix dissolve (independent alternative to the white wave).
 * Replace the existing project controller script with this file (use defer).
 * Required data: project-data.js, designer-data.js, designer-icon-data.js and assets/images/project/test/icon/*.svg.
 * Transition overlays are inserted automatically. The entry gate/cover live in project/index.html and project_03.css.
 */
(() => {
  "use strict";
  function initialize() {
    if (window.ProjectFluidSlide) {
      console.warn("[ProjectWave] A project controller is already loaded. Use one variant at a time.");
      return;
    }
    const iconBaseUrl = new URL(
      window.PROJECT_WAVE_OPTIONS?.iconBaseUrl || "../assets/images/project/test/icon/",
      document.baseURI
    );
    // Keep each color's original viewBox, paths and group transforms so pieces reassemble exactly.
    function splitIconColors(svg) {
      const shapes = root => [...root.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line')]
        .filter(node => !node.closest('defs,clipPath,mask'));
      const colors = shapes(svg).map(element => {
        for (let node = element; node; node = node.parentElement) {
          const value = node.style?.fill || node.getAttribute('fill');
          if (value) return value.trim().toLowerCase();
        }
        return '#000000';
      });
      return [...new Set(colors.filter(color => color !== 'none'))].map(color => {
        const piece = svg.cloneNode(true);
        shapes(piece).forEach((node, index) => { if (colors[index] !== color) node.remove(); });
        return {color, svg: piece};
      });
    }
    const waveStyle = document.createElement("style");
    waveStyle.dataset.projectWaveStyle = "";
    waveStyle.textContent = `
.project-wave {
  position: fixed; z-index: 999; overflow: hidden;
  visibility: hidden; pointer-events: none;
}
.project-wave.is-active { visibility: visible; pointer-events: auto; }
.project-ascii canvas { display: block; width: 100%; height: 100%; }
html.project-wave-running #slideview .card,
html.project-wave-running .project-info { transition: none !important; }
html[data-project-fluid-view="slide"].project-wave-text-pending :is(
  .project-dial-title, .title-section .project-title, .desktop-slide-description
),
html[data-project-fluid-view="slide"].project-wave-text-pending:not(.project-intro-copy-ready):not(.project-wave-copy-ready) .project-info {
  visibility: hidden !important; opacity: 0 !important; animation: none !important;
}
html[data-project-fluid-view="slide"].project-wave-text-enter :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) {
  visibility: visible !important;
  animation: project-wave-copy-in 520ms ease-out both !important;
}
html[data-project-fluid-view="slide"].project-wave-text-enter .project-info {
  animation-delay: 100ms !important;
}
html[data-project-fluid-view="slide"].project-wave-text-exit :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) {
  visibility: visible !important;
  animation: project-wave-copy-out 520ms ease-in reverse both !important;
}
@keyframes project-wave-copy-out {
  from { opacity: 0; transform: translateX(var(--project-wave-copy-offset, 14px)); clip-path: inset(0 100% 0 0); }
  to { opacity: 1; transform: translateX(0); clip-path: inset(0 0 0 0); }
}
@keyframes project-wave-copy-in {
  from { opacity: 0; transform: translateX(var(--project-wave-copy-offset, 14px)); clip-path: inset(0 100% 0 0); }
  to { opacity: 1; transform: translateX(0); clip-path: inset(0 0 0 0); }
}
@media (prefers-reduced-motion: reduce) {
  html.project-wave-text-enter :is(.project-dial-title, .project-info,
    .title-section .project-title, .desktop-slide-description) {
    animation: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important;
  }
}
`;
    waveStyle.textContent += `
html[data-project-fluid-view="slide"].project-ascii-content-ready :is(
  .project-dial-item.is-active .project-dial-title,
  .title-section .project-title, .desktop-slide-description
) { animation:none !important; transform:none !important; clip-path:none !important; opacity:1 !important; }
`;
    document.head.append(waveStyle);

/* Build input for project-ascii-transition.js. Not an additional browser include. */
(() => {
  'use strict';
  const options = {
    durationMs: 2100, cellSize: 12,
    ...window.PROJECT_ASCII_OPTIONS
  };
  const overlay = document.createElement('div');
  overlay.className = 'project-wave project-ascii';
  overlay.setAttribute('aria-hidden', 'true');
  const canvas = document.createElement('canvas');
  overlay.append(canvas);
  document.body.append(overlay);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const imageCache = new Map();
  const iconFiles = [
    'team-01-apuchika.svg', 'team-02-ommix.svg', 'team-03-phishing-ttuk.svg',
    'team-04-ilkko.svg', 'team-05-kuro.svg', 'team-06-dadeullim.svg',
    'team-07-style-lens.svg', 'team-08-geuneuljabi.svg', 'team-09-magmoa.svg',
    'team-10-ieoon.svg', 'team-11-byeolungwan.svg', 'team-12-kokorang.svg',
    'team-13-effect.svg', 'team-14-jikji-jamboree.svg'
  ];
  let iconAtlasLoad = null, atlasCount = 0, atlasGrid = [1, 1];
  let gl, program, buffer, atlas, uniforms;
  let job = null, frame = 0, generation = 0, completed = 0;
  const scrollMotion = {
    velocity: 0, rate: 1, targetRate: 1, direction: 0,
    lastInput: null, lastUpdate: performance.now()
  };
  const vertexSource = `
    attribute vec2 position;
    varying vec2 uv;
    void main() { uv=position*.5+.5; gl_Position=vec4(position,0.,1.); }
  `;
  const fragmentSource = `
    precision highp float;
    varying vec2 uv;
    uniform sampler2D imageA, imageB, iconAtlas, foreground, nextForeground;
    uniform vec2 resolution, sizeA, sizeB, iconGrid;
    uniform vec4 sceneTint;
    uniform float slideProgress, trailFade, direction, cellSize, codeTime, iconCount, fromBlank, toBlank;
    float random(vec2 p) {
      return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
    }
    float ease(float a, float b, float value) {
      float x=clamp((value-a)/(b-a),0.,1.);
      return x*x*x*(x*(x*6.-15.)+10.);
    }
    float region(vec2 p) {
      vec2 i=floor(p), f=fract(p);
      f=f*f*(3.-2.*f);
      return mix(mix(random(i),random(i+vec2(1.,0.)),f.x),
        mix(random(i+vec2(0.,1.)),random(i+vec2(1.,1.)),f.x),f.y);
    }
    float fbm(vec2 p) {
      float n=.57*region(p);
      p=mat2(.8,-.6,.6,.8)*p*2.03+vec2(3.7,1.9);
      n+=.28*region(p);
      p=mat2(.8,-.6,.6,.8)*p*2.01+vec2(5.3,7.1);
      return n+.15*region(p);
    }
    vec2 cover(vec2 p, vec2 size) {
      float r=resolution.x/resolution.y, ir=size.x/size.y;
      return (p-.5)*vec2(min(1.,r/ir),min(1.,ir/r))+.5;
    }
    vec2 iconUV(float index, vec2 local) {
      // Canvas rows are uploaded bottom-up; keep each personal icon upright.
      vec2 tile=vec2(mod(index,iconGrid.x),iconGrid.y-1.-floor(index/iconGrid.x));
      return (tile+local)/iconGrid;
    }
    vec3 scene(vec2 p, float incoming, vec2 copyMask) {
      vec3 a=texture2D(imageA,cover(p,sizeA)).rgb;
      vec4 content=texture2D(foreground,p);
      vec3 b=texture2D(imageB,cover(p,sizeB)).rgb;
      vec4 nextContent=texture2D(nextForeground,p);
      // Erase copy at the band's leading edge and reveal it at the trailing edge.
      // The two masks never overlap, so project copy is not crossfaded together.
      float alpha=content.a*copyMask.x+nextContent.a*copyMask.y;
      vec3 premultiplied=content.rgb*content.a*copyMask.x+nextContent.rgb*nextContent.a*copyMask.y;
      // Keep the intro background untinted; subsequent slides share the usual scrim.
      vec3 background=mix(mix(a,sceneTint.rgb,sceneTint.a*(1.-fromBlank)),
        mix(b,sceneTint.rgb,sceneTint.a*(1.-toBlank)),incoming);
      return background*(1.-alpha)+premultiplied;
    }
    void main() {
      float q=slideProgress;
      float amp=sin(q*3.14159265);
      vec2 domain=vec2(uv.x*resolution.x/resolution.y,uv.y)*3.1;
      float n1=fbm(domain+vec2(q*.72,-q*.48));
      float n2=fbm(domain+vec2(8.3,2.7)+vec2(-q*.52,q*.58));
      float axis=direction>0.?uv.y:1.-uv.y;
      float wave=(n1-.5)*.24+sin(uv.x*5.5+n2*2.6+q*1.8)*.038;
      // The image, copy, and icon band share the same moving boundary.
      float front=mix(mix(-.24,-.12,fromBlank),1.30,q)-axis+wave*amp;
      float incoming=ease(-.035,.035,front);
      vec2 cells=resolution/vec2(cellSize);
      vec2 grid=uv*cells;
      vec2 cell=floor(grid);
      float seed=random(cell);
      vec2 center=(floor(grid)+.5)/cells;
      float grain=(region(cell/4.)-.5)*.025;
      // Keep the leading edge crisp, with a wider, softer trailing edge.
      float becomeIcons=ease(-.035,.035,front+.12+grain);
      float becomeImage=ease(-.07,.09,front-.18+grain);
      vec2 copyMask=vec2(1.-becomeIcons,becomeImage);
      // Keep the matrix alive throughout the automatic transition.
      float clock=codeTime*(1.2+seed*.8)+seed*5.;
      float step=floor(clock);
      float first=floor(random(cell+vec2(step,step*.37))*iconCount);
      float second=floor(random(cell+vec2(step+1.,(step+1.)*.37))*iconCount);
      vec2 local=fract(grid);
      vec4 iconA=texture2D(iconAtlas,iconUV(first,local));
      vec4 iconB=texture2D(iconAtlas,iconUV(second,local));
      float change=ease(.68,1.,fract(clock));
      float ink=mix(iconA.a,iconB.a,change);
      float iconAmount=becomeIcons*(1.-becomeImage);
      // Keep the matrix band and its uneven lingering tail together.
      float trailLength=.22+random(cell+vec2(17.3,9.1))*.48;
      float trailDensity=ease(.28,.72,random(cell+vec2(4.7,23.6)));
      float trail=ease(.10,.24,front)
        *(1.-ease(.20,.24+trailLength,front));
      float trailAmount=trail*trailDensity*(1.-iconAmount)*(1.-trailFade);
      // Image exits keep sampling the outgoing artwork as the icons dissolve into white.
      vec3 color=scene(center,incoming*(1.-toBlank),copyMask);
      // As in the text version, each cell takes its color from the scene below.
      vec3 detail=scene(uv,incoming,copyMask);
      vec3 iconColor=min(color*1.35+.025,vec3(1.));
      // The white wash belongs only to the main band; the tail leaves individual icons.
      vec3 bandBackground=mix(detail,vec3(1.),.75);
      vec3 iconLayer=mix(bandBackground,iconColor,ink);
      vec3 result=mix(detail,iconLayer,iconAmount);
      // Uneven lifetimes leave a long, sparse trail over the incoming image.
      vec3 trailColor=mix(iconColor,vec3(1.),.76);
      result=mix(result,trailColor,ink*trailAmount*.30);
      gl_FragColor=vec4(result,1.);
    }
  `;

  function shader(type, source) {
    const result = gl.createShader(type);
    gl.shaderSource(result, source);
    gl.compileShader(result);
    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(result);
      gl.deleteShader(result);
      throw new Error(message);
    }
    return result;
  }
  function texture(source, nearest = false) {
    const value = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, value);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    return value;
  }
  function prepareIconAtlas() {
    if (!iconAtlasLoad) {
      iconAtlasLoad = Promise.allSettled(iconFiles.map(async file => {
        const controller = new AbortController();
        const urls = [];
        let timer;
        const load = async () => {
          const response = await fetch(new URL(file, iconBaseUrl), {signal: controller.signal});
          if (!response.ok) throw new Error('Icon ' + response.status + ' ' + file);
          const xml = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
          if (xml.querySelector('parsererror')) throw new Error('Invalid icon ' + file);
          const svg = xml.documentElement;
          svg.querySelectorAll('style,animate,animateTransform,animateMotion,set').forEach(node => node.remove());
          svg.setAttribute('width', '64');
          svg.setAttribute('height', '64');
          // These groups match the personal assignments in designer-icon-data.js.
          // Preserve every path of one color, including disconnected components.
          return Promise.all(splitIconColors(svg).map(async ({svg: personal}) => {
            const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(personal)], {type: 'image/svg+xml'}));
            urls.push(url);
            const image = new Image();
            image.src = url;
            await image.decode();
            return image;
          }));
        };
        try {
          return await Promise.race([load(), new Promise((_, reject) => {
            timer = setTimeout(() => { controller.abort(); reject(new Error('Icon load timed out: ' + file)); }, 3000);
          })]);
        } finally {
          clearTimeout(timer);
          controller.abort();
          urls.forEach(url => URL.revokeObjectURL(url));
        }
      })).then(results => {
        const images = results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
        if (!images.length) throw new Error('No project icons available');
        const columns = Math.min(8, images.length);
        const rows = Math.ceil(images.length / columns);
        const sheet = document.createElement('canvas');
        sheet.width = columns * 64;
        sheet.height = rows * 64;
        const context = sheet.getContext('2d');
        if (!context) throw new Error('Icon atlas canvas unavailable');
        // Cache static SVGs once; every matrix cell samples the same small atlas.
        images.forEach((image, index) => context.drawImage(image,
          (index % columns) * 64 + 3, Math.floor(index / columns) * 64 + 3, 58, 58));
        return {sheet, count: images.length, grid: [columns, rows]};
      }).catch(error => { iconAtlasLoad = null; throw error; });
    }
    return iconAtlasLoad;
  }

  function initGL(icons) {
    if (program) return true;
    gl = canvas.getContext('webgl', {alpha: false, antialias: false, depth: false, powerPreference: 'low-power'});
    if (!gl || gl.isContextLost()) return false;
    const vertex = shader(gl.VERTEX_SHADER, vertexSource);
    const fragment = shader(gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = Object.fromEntries(['imageA','imageB','iconAtlas','foreground','nextForeground','resolution','sizeA','sizeB','sceneTint','slideProgress','trailFade','direction','cellSize','codeTime','iconCount','iconGrid','fromBlank','toBlank']
      .map(name => [name, gl.getUniformLocation(program, name)]));
    atlas = texture(icons.sheet);
    atlasCount = icons.count;
    atlasGrid = icons.grid;
    overlay.dataset.iconCount = String(atlasCount);
    overlay.dataset.renderMode = 'personal-icons';
    return true;
  }

  function waveTiming(progress, fromBlank = false) {
    const t = Math.max(0, Math.min(1, progress / .82));
    const tail = Math.max(0, Math.min(1, (progress-.70)/.30));
    return {
      slideProgress: fromBlank ? 1-Math.pow(1-t,3) : t*t*t*(t*(t*6-15)+10),
      trailFade: tail*tail*(3-2*tail)
    };
  }

// Capture project titles only; search and view controls stay in their fixed DOM layer.
async function captureForeground(target, {includeHidden = false} = {}) {
  const bounds = target.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  const surface = document.createElement('canvas');
  surface.width = Math.max(1, Math.round(bounds.width * ratio));
  surface.height = Math.max(1, Math.round(bounds.height * ratio));
  const ctx = surface.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.translate(-bounds.left, -bounds.top);
  let textRuns = 0;
  // Keep the description in the DOM so it can reveal horizontally after the slide.
  const selectors = '.project-dial-item.is-active .project-dial-title, .title-section .project-title, .desktop-slide-description';
  for (const element of document.querySelectorAll(selectors)) {
    if (!element.getClientRects().length) continue;
    const parentStyle = getComputedStyle(element);
    if (!includeHidden && (parentStyle.visibility === 'hidden' || Number(parentStyle.opacity) === 0)) continue;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const style = getComputedStyle(node.parentElement);
      if (style.display === 'none' || (!includeHidden && style.visibility === 'hidden')) continue;
      ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      if ('letterSpacing' in ctx) ctx.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
      const metrics = ctx.measureText('Mg');
      const ascent = metrics.fontBoundingBoxAscent ?? parseFloat(style.fontSize) * .8;
      const descent = metrics.fontBoundingBoxDescent ?? parseFloat(style.fontSize) * .2;
      const range = document.createRange();
      let offset = 0, line = null;
      const flush = () => {
        if (!line) return;
        const baseline = line.top + (line.height - ascent - descent) / 2 + ascent;
        ctx.fillText(line.text, line.left, baseline);
        textRuns++;
      };
      for (const character of node.textContent) {
        range.setStart(node, offset);
        offset += character.length;
        range.setEnd(node, offset);
        const rect = range.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        if (!line || Math.abs(rect.top - line.top) > 1) {
          flush();
          line = {left:rect.left, top:rect.top, height:rect.height, text:character};
        } else line.text += character;
      }
      flush();
    }
  }
  const textLayer = document.createElement('canvas');
  textLayer.width = surface.width;
  textLayer.height = surface.height;
  textLayer.getContext('2d').drawImage(surface, 0, 0);
  // Icons and controls live in separate DOM layers above the transition canvas.
  surface.codeContent = {textRuns, iconCount:0};
  surface.renderCodeFrame = (slideProgress, incoming, direction) => {
    const copyPhase = incoming ? 1-slideProgress : slideProgress;
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,surface.width,surface.height);
    // The shader masks copy at the moving band instead of fading the whole layer.
    ctx.globalAlpha = 1;
    // Move the title opposite the slide and icon dial.
    ctx.drawImage(textLayer, 0, (incoming?-1:1)*direction*72*ratio*copyPhase);
    ctx.restore();
    surface.codeContent.copyMotion = copyPhase;
    return surface;
  };
  surface.renderCodeFrame(includeHidden?1:0,includeHidden,1);
  return surface;
}

  async function prepare(source) {
    const url = new URL(source, document.baseURI).href;
    if (imageCache.has(url)) return imageCache.get(url);
    const promise = (async () => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = url;
      await image.decode();
      return image;
    })();
    imageCache.set(url, promise);
    promise.catch(() => imageCache.delete(url));
    while (imageCache.size > 4) imageCache.delete(imageCache.keys().next().value);
    return promise;
  }
  function syncBounds() {
    if (!job) return;
    const rect = job.target.getBoundingClientRect();
    Object.assign(overlay.style, {left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`});
    const header = document.querySelector('.header');
    const z = parseInt(header ? getComputedStyle(header).zIndex : '1000', 10);
    // Image-only exits sit above the background scrim, below all foreground UI.
    overlay.style.zIndex = job.imageOnly ? '0' : String(Number.isFinite(z) && z > 1 ? z - 1 : 999);
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uniforms.resolution, rect.width, rect.height);
  }
  function paint(progress) {
    gl.useProgram(program);
    syncBounds();
    // Reveal the new scene first, then let the remaining pale icons dissipate.
    const {slideProgress, trailFade} = waveTiming(progress, job.fromBlank && !job.imageOnly);
    // Reuse the cached copy throughout the code transition.
    for (const [source, value, incoming] of [[job.contentSource,job.content,false],[job.nextSource,job.nextContent,true]]) {
      if (!source?.renderCodeFrame || progress === job.paintedProgress) continue;
      source.renderCodeFrame(slideProgress,incoming,job.direction);
      gl.bindTexture(gl.TEXTURE_2D,value);
      gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,gl.RGBA,gl.UNSIGNED_BYTE,source);
      overlay.dataset[incoming?'incomingMotion':'outgoingMotion']=source.codeContent.copyMotion.toFixed(3);
    }
    job.paintedProgress=progress;
    [job.a, job.b, atlas, job.content, job.nextContent].forEach((value, index) => {
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, value);
    });
    gl.uniform1i(uniforms.imageA, 0);
    gl.uniform1i(uniforms.imageB, 1);
    gl.uniform1i(uniforms.iconAtlas, 2);
    gl.uniform1f(uniforms.iconCount, atlasCount);
    gl.uniform2f(uniforms.iconGrid, atlasGrid[0], atlasGrid[1]);
    gl.uniform1i(uniforms.foreground, 3);
    gl.uniform1i(uniforms.nextForeground, 4);
    gl.uniform2f(uniforms.sizeA, job.from.naturalWidth, job.from.naturalHeight);
    gl.uniform2f(uniforms.sizeB, job.to.naturalWidth, job.to.naturalHeight);
    gl.uniform4fv(uniforms.sceneTint, job.sceneTint);
    gl.uniform1f(uniforms.fromBlank, job.fromBlank ? 1 : 0);
    gl.uniform1f(uniforms.toBlank, job.toBlank ? 1 : 0);
    gl.uniform1f(uniforms.slideProgress, slideProgress);
    gl.uniform1f(uniforms.trailFade, trailFade);
    gl.uniform1f(uniforms.codeTime, job.codeTime);
    gl.uniform1f(uniforms.direction, job.direction);
    gl.uniform1f(uniforms.cellSize, Math.max(8, Number(options.cellSize) || 12));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    job.onProgress?.(slideProgress, progress);
    overlay.dataset.progress = progress.toFixed(3);
  }
  function finish(success) {
    cancelAnimationFrame(frame);
    frame = 0;
    overlay.classList.remove('is-active');
    overlay.dataset.phase = 'idle';
    document.documentElement.classList.remove('project-wave-running');
    if (!job) return;
    const previous = job;
    job = null;
    gl?.deleteTexture(previous.a);
    gl?.deleteTexture(previous.b);
    gl?.deleteTexture(previous.content);
    gl?.deleteTexture(previous.nextContent);
    if (success) completed++;
    previous.resolve(success);
  }
  function tick(now) {
    if (!job) return;
    if (job.preparing) { job.last=now; frame=requestAnimationFrame(tick); return; }
    const dt = Math.min(now - job.last, 48);
    job.last = now;
    job.playbackRate = updatePlaybackRate(now);
    job.codeTime += dt / 1000;
    job.elapsed += dt * job.playbackRate;
    const progress = Math.min(1, job.elapsed / job.durationMs);
    try {
      // Capture the incoming title before the narrow band reaches the viewport.
      if (!job.swapped && progress >= .08) {
        job.swapped = true;
        const incoming = job.swap();
        overlay.dataset.phase = 'revealing';
        if (incoming?.then) {
          const active=job;
          active.preparing=true;
          incoming.then(content=>{
            if(job!==active)return;
            if(content) {
              gl.deleteTexture(active.nextContent);
              active.nextContent=texture(content);
              active.nextSource=content;
              active.paintedProgress=null;
              overlay.dataset.incomingText=String(content.codeContent?.textRuns || 0);
              overlay.dataset.incomingIcons=String(content.codeContent?.iconCount || 0);
            }
            active.preparing=false;
            active.last=performance.now();
          }).catch(error=>{if(job===active){console.error('[ProjectASCII]',error);finish(false);}});
          frame=requestAnimationFrame(tick);
          return;
        }
      }
      paint(progress);
      if (progress === 1) return finish(true);
      frame = requestAnimationFrame(tick);
    } catch (error) {
      console.error('[ProjectASCII]', error);
      finish(false);
    }
  }
  function readSceneTint() {
    const layer = document.querySelector('.gradient');
    if (!layer || !layer.getClientRects().length) return [0,0,0,0];
    const style = getComputedStyle(layer);
    if (style.visibility !== 'visible' || style.display === 'none') return [0,0,0,0];
    // Match the existing CSS scrim beneath the foreground, without dimming it twice.
    const swatch = document.createElement('canvas');
    swatch.width = swatch.height = 1;
    const context = swatch.getContext('2d');
    context.fillStyle = style.backgroundColor;
    context.fillRect(0,0,1,1);
    const rgba = context.getImageData(0,0,1,1).data;
    return [rgba[0]/255,rgba[1]/255,rgba[2]/255,rgba[3]/255*Number(style.opacity)];
  }
  async function prepareTransition(from, to) {
    const sources = await Promise.all([prepare(from), prepare(to), prepareIconAtlas()]);
    initGL(sources[2]);
    return sources;
  }
  async function transition({direction = 1, swap, from, to, target, foreground = null, fromBlank = false,
    toBlank = false, imageOnly = false, sceneTint = null, durationMs = options.durationMs, prepared = null, onStart, onProgress}) {
    if (job) return false;
    const current = ++generation;
    if (reduced.matches) { await swap(); return true; }
    async function withoutCanvas() {
      if (current !== generation) return false;
      await swap();
      return true;
    }
    let sources;
    try {
      sources = prepared || await prepareTransition(from, to);
      if (current !== generation) return false;
      if (!initGL(sources[2])) return withoutCanvas();
    } catch (error) {
      if (current !== generation) return false;
      console.warn('[ProjectASCII] Image/WebGL unavailable; using the original image.', error);
      return withoutCanvas();
    }
    return new Promise(resolve => {
      const now = performance.now();
      job = {direction: Math.sign(direction) || 1, swap, target, resolve, onProgress,
        codeTime: 0, playbackRate: updatePlaybackRate(now),
        durationMs: Math.max(300, Number(durationMs) || 2100),
        sceneTint: sceneTint || readSceneTint(), fromBlank, toBlank, imageOnly,
        from: sources[0], to: sources[1], swapped: false, elapsed: 0, last: now};
      try {
        job.a = texture(job.from);
        job.b = texture(job.to);
        const content = foreground || document.createElement('canvas');
        job.content = texture(content);
        job.contentSource = content;
        job.nextContent = texture(document.createElement('canvas'));
        overlay.dataset.incomingText = '0';
        overlay.dataset.incomingIcons = '0';
        overlay.dataset.foregroundText = String(content.codeContent?.textRuns || 0);
        overlay.dataset.foregroundIcons = String(content.codeContent?.iconCount || 0);
        overlay.dataset.scope = imageOnly ? 'image' : 'scene';
        overlay.dataset.imagePhase = imageOnly ? (fromBlank ? 'entering' : 'leaving') : '';
        paint(0);
        overlay.dataset.phase = 'covering';
        overlay.classList.add('is-active');
        document.documentElement.classList.add('project-wave-running');
        onStart?.();
        frame = requestAnimationFrame(tick);
      } catch (error) {
        console.warn('[ProjectASCII]', error);
        swap();
        finish(true);
      }
    });
  }
  function transitionImage({source, target, entering = false, onStart, onProgress}) {
    const blank = document.createElement('canvas');
    blank.width = blank.height = 1;
    const context = blank.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0,0,1,1);
    const white = blank.toDataURL();
    return transition({from:entering?white:source,to:entering?source:white,target,onStart,onProgress,
      fromBlank:entering,toBlank:!entering,imageOnly:true,sceneTint:readSceneTint(),
      direction:entering?-1:1,durationMs:1000,swap(){}});
  }
  function updateScrollSpeed(delta) {
    if (!Number.isFinite(delta) || !delta) return;
    const now = performance.now(), direction = Math.sign(delta);
    const gap = scrollMotion.lastInput === null ? Infinity : now-scrollMotion.lastInput;
    const fresh = gap > 400 || direction !== scrollMotion.direction;
    const interval = fresh ? 100 : Math.max(4, gap);
    const velocity = Math.min(4, Math.abs(delta)/interval);
    const blend = 1-Math.exp(-interval/100);
    scrollMotion.velocity = fresh ? velocity
      : scrollMotion.velocity+(velocity-scrollMotion.velocity)*blend;
    const intensity = Math.min(1, scrollMotion.velocity/2.4);
    // Preserve the lingering tail even during fast wheel / trackpad gestures.
    scrollMotion.targetRate = .85+.80*intensity*intensity*(3-2*intensity);
    scrollMotion.lastInput = now;
    scrollMotion.direction = direction;
  }
  function updatePlaybackRate(now) {
    const dt = Math.max(0, now-scrollMotion.lastUpdate);
    const age = scrollMotion.lastInput === null ? Infinity : now-scrollMotion.lastInput;
    // Ease back to normal after input stops; never freeze halfway through a slide.
    const target = 1+(scrollMotion.targetRate-1)*Math.exp(-Math.max(0,age-120)/260);
    const response = target > scrollMotion.rate ? 160 : 220;
    scrollMotion.rate += (target-scrollMotion.rate)*(1-Math.exp(-dt/response));
    scrollMotion.lastUpdate = now;
    return scrollMotion.rate;
  }
  function cancel() {
    generation++; finish(false);
    Object.assign(scrollMotion, {velocity:0, rate:1, targetRate:1, direction:0,
      lastInput:null, lastUpdate:performance.now()});
  }
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    if (job && !job.swapped) job.swap();
    finish(true);
    program = null;
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches && job) {
      if (!job.swapped) job.swap();
      finish(true);
    }
  });
  if (!reduced.matches) void prepareIconAtlas().catch(() => {});
  window.ProjectWave = window.ProjectASCII = Object.freeze({
    ready: Promise.resolve(), prepare, prepareTransition, captureForeground, transition, transitionImage, updateScrollSpeed, cancel,
    get state() { return {busy: !!job, phase: overlay.dataset.phase || 'idle', completed, progress: Number(overlay.dataset.progress || 0)}; }
  });
})();


(function(){
    const PROJECT_FLUID_SETTINGS={
        duration: 1.05,       // 다이얼과 이미지가 비슷한 호흡으로 움직이도록 약간 단축
        overlapAt: 0.58,     // 너무 빠르게 겹치지 않도록 조금 뒤에서 다음 전환 허용
        rgbRelease: 0.18,    // 안전용 잔여값. 실제 Fluid 해제는 wipe 마지막 구간 안에서 끝냄
        rgb: 5,              // RGB를 한 단계 부드럽게
        fluid: 50,          // 세로 전환에서 과한 출렁임을 줄임
        wheelThreshold: 90,  // 미세 휠 입력에 너무 민감하게 반응하지 않도록
        wheelGestureGap: 180, // 휠 입력이 끊긴 뒤 다음 제스처 허용
        wheelRepeatDelay: 160, // 강한 연속 입력은 제스처가 끝나기 전에도 허용
        pixelRatio: 1.25,
        maxTextureSize: 1920,
        ...window.PROJECT_FLUID_OPTIONS
    };
    // Colored icon matrix dissolve replaces the bundled RGB transition.

    (() => {
        "use strict";
        let writerFrame=0,writerTimer=0,infoRevealCleanup=null;
        function clearWriterQueue(){
            cancelAnimationFrame(writerFrame);
            clearTimeout(writerTimer);
            infoRevealCleanup?.();
            infoRevealCleanup=null;
        }
        function revealProjectInfo(projectInfo,animate){
            if(!projectInfo)return;

            projectInfo.classList.remove('is-visible');
            void projectInfo.offsetWidth;

            if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches){
                projectInfo.classList.add('is-visible');
                return;
            }

            const activeTitle=document.querySelector(
                '.project-dial-item.is-active .project-dial-title'
            );
            let done=false,fallbackTimer=0;
            const cleanup=()=>{
                activeTitle?.removeEventListener('animationstart',onTitleRevealStart);
                clearTimeout(fallbackTimer);
            };
            const show=()=>{
                if(done)return;
                done=true;
                cleanup();
                requestAnimationFrame(()=>projectInfo.classList.add('is-visible'));
            };
            const onTitleRevealStart=event=>{
                if(event.animationName!=='project-dial-title-reveal')return;
                clearTimeout(fallbackTimer);
                fallbackTimer=window.setTimeout(show,300);
            };

            if(activeTitle){
                activeTitle.addEventListener('animationstart',onTitleRevealStart);
                fallbackTimer=window.setTimeout(show,2400);
                infoRevealCleanup=cleanup;
            }else{
                show();
            }
        }
        // =========================================================
        // PROJECTS 데이터
        // =========================================================
        function getProjects() {
            if (
                !window.PROJECTS ||
                !Array.isArray(window.PROJECTS)
            ) {
                console.error(
                    "PROJECTS 데이터를 찾을 수 없습니다. project-data.js 연결을 확인해주세요."
                );
                return [];
            }
            return window.PROJECTS;
        }
        function getProjectById(
            projectId
        ) {
            return getProjects().find(
                project =>
                    String(project.id) ===
                    String(projectId)
            );
        }
        // =========================================================
        // Category Label
        // =========================================================
        const CATEGORY_LABELS = {
            all:
                "ALL",
            health:
                "건강",
            education:
                "교육",
            environment:
                "환경",
            culture:
                "문화",
            leisure:
                "여가",
            welfare:
                "복지",
            life:
                "생활",
            XR:
                "생활",
            xr:
                "생활"
        };
        function getCategoryLabel(
            category
        ) {
            return (
                CATEGORY_LABELS[category]
                ||
                category
                ||
                ""
            );
        }
        // =========================================================
        // HTML 카드 ↔ project-data.js 연결
        //
        // Slide / Grid 순서는 HTML 순서를 그대로 사용.
        // =========================================================
        function bindProjectCards() {
            const cards =
                document.querySelectorAll(
                    `
                    #slideview .card[data-project-id],
                    #gridview .card[data-project-id]
                    `
                );
            cards.forEach(
                card => {
                    const projectId =
                        card.dataset.projectId;
                    const project =
                        getProjectById(
                            projectId
                        );
                    if (!project) {
                        console.warn(
                            `프로젝트 데이터를 찾을 수 없습니다: ${projectId}`
                        );
                        return;
                    }
                    // =============================================
                    // Category
                    // =============================================
                    if (project.category) {
                        card.dataset.category =
                            project.category;
                    }
                    // =============================================
                    // Grid Image
                    // =============================================
                    const gridImage =
                        card.querySelector(
                            ".card-image"
                        );
                    if (
                        gridImage &&
                        project.image
                    ) {
                        gridImage.style.backgroundImage =
                            `url("${project.image}")`;
                    }
                    // =============================================
                    // Slide Image
                    // =============================================
                    if (
                        card.closest(
                            "#slideview"
                        ) &&
                        project.image
                    ) {
                        card.style.backgroundImage =
                            `url(${project.slideImage || project.image})`;
                    }
                    // =============================================
                    // Grid Info
                    // =============================================
                    const category =
                        card.querySelector(
                            ".card-category"
                        );
                    const title =
                        card.querySelector(
                            ".card-title"
                        );
                    const members =
                        card.querySelector(
                            ".card-members"
                        );
                    const description =
                        card.querySelector(
                            ".card-description"
                        );
                    if (category) {
                        category.textContent =
                            getCategoryLabel(
                                project.category
                            );
                    }
                    if (title) {
                        title.textContent =
                            project.title;
                    }
                    if (members) {
                        members.textContent =
                            project.members.join(" / ");
                    }
                    if (description) {
                        description.textContent =
                            project.description;
                    }
                }
            );
        }
        // =========================================================
        // Slide 프로젝트 정보 변경
        // =========================================================
        function updateSlideInfo(
            projectId,
            animate = false
        ) {
            clearWriterQueue();
            const project =
                getProjectById(
                    projectId
                );
            if (!project) {
                return;
            }
            const titleGroup =
                document.querySelector(
                    ".title-section h1[typewriter-effect]"
                );
            const titles =
                document.querySelectorAll(
                    ".project-title"
                );
            const worker =
                document.querySelector(
                    ".worker"
                );
            const description = document.querySelector(
                ".project-description .project-info-block:first-child p"
            );
            // =====================================================
            // 기존 Writer 중지
            // =====================================================
            if (
                animate &&
                window.TypewriterEffect
            ) {
                if (titleGroup) {
                    window.TypewriterEffect.cancel(
                        titleGroup
                    );
                }
            }
            // =====================================================
            // 프로젝트 정보 입력
            // =====================================================
            titles.forEach(
                title => {
                    title.textContent =
                        project.title;
                }
            );
            if (worker) {
                worker.textContent =
                    project.members.join(" / ");
            }
            if (description) {
                description.textContent =
                    project.description;
            }
            const projectInfo = description?.closest(
                ".project-info"
            );
            // =====================================================
            // Writer 다시 실행
            // =====================================================
            if (
                animate &&
                window.TypewriterEffect
            ) {
                writerFrame=requestAnimationFrame(
                    () => {
                        if (titleGroup) {
                            window.TypewriterEffect.replay(
                                titleGroup
                            );
                        }
                    }
                );
            }
            revealProjectInfo(projectInfo,animate);
        }
        // =========================================================
        // Grid 제목
        // =========================================================
        function showGridTitle() {
            clearWriterQueue();
            const titleGroup =
                document.querySelector(
                    ".title-section h1[typewriter-effect]"
                );
            const titles =
                document.querySelectorAll(
                    ".project-title"
                );
            const worker =
                document.querySelector(
                    ".worker"
                );
            if (
                window.TypewriterEffect
            ) {
                if (titleGroup) {
                    window.TypewriterEffect.cancel(
                        titleGroup
                    );
                }
            }
            titles.forEach(
                title => {
                    title.textContent =
                        "프로젝트";
                }
            );
            if (worker) {
                worker.textContent =
                    "";
            }
            /*
            * cancel() 이후 manual typewriter가
            * 숨겨지는 것을 방지
            */
            if (titleGroup) {
                titleGroup.classList.add(
                    "is-typed"
                );
                titleGroup.dataset.typing =
                    "false";
                titleGroup.dataset.typed =
                    "true";
            }
        }
        // =========================================================
        // 초기화
        // =========================================================

        function initProjectPage() {
            if (window.ProjectFluidSlide) return;
            bindProjectCards();
            const slideview=document.querySelector('#slideview');
            const gridview=document.querySelector('#gridview');
            const cards=[...document.querySelectorAll('#slideview .card[data-project-id]')];
            const viewButtons=[...document.querySelectorAll('.view-button')];
            if (!slideview || !cards.length) return;
            const events=new AbortController();
            const listen=(el,event,handler,options={})=>el.addEventListener(event,handler,{...options,signal:events.signal});
            const settings={...PROJECT_FLUID_SETTINGS};
            const reduce=matchMedia('(prefers-reduced-motion: reduce)');
            let index=Math.max(0,cards.findIndex(c=>c.classList.contains('is-active')));
            let engine=null,phase='idle',queuedDirection=null,request=0,disabled=false,disposed=false;
            let wheelTotal=0,lastWheel=0,searchFrame=0,wheelLocked=false,wheelDirection=0;
            let lastWheelAmount=0,lastWheelNavigation=0;
            let wanted=null,wantedDirection=1,loading=false,prepared=null;
            let initial=true,stoppedLenis=null;
            let searchTarget=null,searchTimer=0;
            let descriptionExit=null;
            const root=document.documentElement;
            let intro=null;
            // =========================================================
            // Project Dial
            // ---------------------------------------------------------
            // Slide View의 활성 프로젝트와 project-dial을 동기화합니다.
            // 다음 프로젝트(+1) : 리스트가 아래 -> 위로 이동
            // 이전 프로젝트(-1) : 리스트가 위 -> 아래로 이동
            // =========================================================
            const projectDial=document.querySelector('.project-dial');
            const projectDialList=projectDial?.querySelector('.project-dial-list')||null;
            const projectDialItems=projectDialList
                ? [...projectDialList.querySelectorAll('.project-dial-item[data-project-id]')]
                : [];

            // Icons form their own dial, independent of the title/description layer.
            const projectIconFiles={
                'apuchika':'team-01-apuchika.svg',
                'omix':'team-02-ommix.svg',
                'phishing-ddook':'team-03-phishing-ttuk.svg',
                'ilkko':'team-04-ilkko.svg',
                'curo':'team-05-kuro.svg',
                'dadeullim':'team-06-dadeullim.svg',
                'stylens':'team-07-style-lens.svg',
                'cheoma':'team-08-geuneuljabi.svg',
                'magmoa':'team-09-magmoa.svg',
                'year-on':'team-10-ieoon.svg',
                '28':'team-11-byeolungwan.svg',
                'cocorang':'team-12-kokorang.svg',
                'efact':'team-13-effect.svg',
                'jikji':'team-14-jikji-jamboree.svg'
            };
            const dialIcons=new Map();
            const iconRail=document.createElement('div');
            iconRail.className='project-icon-rail';
            iconRail.setAttribute('aria-hidden','true');
            const header=document.querySelector('.header');
            const headerZ=parseInt(header?getComputedStyle(header).zIndex:'1000',10);
            // Same stacking level as the wave, inserted later so icons stay above it.
            iconRail.style.zIndex=String(Number.isFinite(headerZ)&&headerZ>1?headerZ-1:999);
            document.body.append(iconRail);
            let iconTransition=null;
            const iconLoads=projectDialItems.map(async item=>{
                const projectId=String(item.dataset.projectId),file=projectIconFiles[projectId];
                const title=item.querySelector('.project-dial-title');
                if(!file||!title)return;
                const slot=document.createElement('span');
                slot.className='project-dial-icon';slot.setAttribute('aria-hidden','true');
                slot.dataset.projectId=projectId;
                iconRail.append(slot);item.classList.add('has-project-icon');
                dialIcons.set(projectId,{item,slot});
                try{
                    const response=await fetch(new URL(file,iconBaseUrl),{signal:events.signal});
                    if(!response.ok)throw new Error('SVG '+response.status);
                    const xml=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
                    if(disposed)return;
                    if(xml.querySelector('parsererror'))throw new Error('Invalid SVG');
                    const icon=document.importNode(xml.documentElement,true);
                    // 원본 SVG에 포함된 등장 애니메이션도 제거합니다.
                    icon.querySelectorAll('style,animate,animateTransform,animateMotion,set').forEach(node=>node.remove());
                    icon.removeAttribute('role');icon.removeAttribute('aria-labelledby');
                    icon.setAttribute('aria-hidden','true');icon.setAttribute('focusable','false');
                    slot.replaceChildren(icon);
                    slot.classList.add('is-icon-loaded');
                    item.classList.add('is-icon-loaded');
                }catch(error){
                    if(error.name!=='AbortError')console.warn('[Project icons] '+file,error);
                    slot.remove();item.classList.remove('has-project-icon','is-icon-loaded');
                    dialIcons.delete(projectId);
                }
            });
            if(dialIcons.size)projectDial?.classList.add('has-project-icons');
            // Dial은 현재 위치를 정수 index가 아니라 실수 position으로 관리합니다.
            // 예: 4 -> 5로 이동할 때 4.0, 4.1, 4.2 ... 5.0처럼
            // 연속적으로 변하기 때문에 opacity / scale도 끊기지 않습니다.
            let dialPosition=null;
            let dialRaf=0;

            const originalView=root.getAttribute('data-project-fluid-view');
            const host=document.createElement('div');
            host.className='project-fluid-surface';host.setAttribute('aria-hidden','true');
            slideview.appendChild(host);
            const style=document.createElement('style');
            style.dataset.projectFluidStyle='';
            style.textContent=`
            #slideview .project-fluid-surface {
                position:absolute;
                left:0;
                top:0;
                width:1px;
                height:1px;
                z-index:2;
                visibility:hidden;
                pointer-events:none;
                overflow:hidden;
            }
            #slideview.is-fluid-transitioning .project-fluid-surface { visibility:visible; }

            /* Fluid 캔버스는 카드보다 위에 있지만,
               활성 카드 자체를 다시 위로 올려 border가 사라지지 않게 합니다.
               카드의 background는 투명하므로 border만 Fluid 위에 남습니다. */
            #slideview.is-fluid-transitioning .card {
                background-image:none!important;
                background-color:transparent!important;
                transition:none!important;
            }
            #slideview.is-fluid-transitioning .card.is-active {
                z-index:3!important;
            }

            #slideview.is-fluid-transitioning .card img { visibility:hidden; }
            #slideview .card[data-fluid-instant] { transition:none!important; }
            html[data-project-fluid-view="slide"] body { overflow:hidden; }

            /*
             * Dial은 JS가 매 프레임 위치/농도/크기를 연속 보간합니다.
             * 기존 CSS transition과 동시에 적용되면 이중 easing이 생기므로
             * slide view에서만 transition을 잠시 맡기지 않습니다.
             */
            html[data-project-fluid-view="slide"] .project-dial-list {
                transition:none!important;
                will-change:transform;
            }

            html[data-project-fluid-view="slide"] .project-dial-item {
                transition:none!important;
                transform-origin:left center;
                will-change:transform,opacity,filter;
            }

            html[data-project-fluid-view="slide"] {
                --project-dial-icon-size:clamp(3rem,5vw,5rem);
                --project-icon-left:clamp(2rem,6vw,6rem);
                --project-copy-left:calc(var(--project-icon-left) + var(--project-dial-icon-size) + 2rem);
                --project-dial-title-duration:800ms;
            }
            .container:has(#slideview:not([hidden])) .project-dial.has-project-icons {
                left:var(--project-copy-left);
                width:min(50vw,calc(100vw - var(--project-copy-left) - 3rem));
            }
            .container:has(#slideview:not([hidden])) .project-dial-title {
                font-size:var(--project-dial-icon-size);
                white-space:nowrap;
                text-align:left;
            }
            html[data-project-fluid-view="slide"] .project-info {
                left:var(--project-copy-left);
                top:calc(50vh + var(--project-dial-icon-size) / 2 + 1.5rem);
                width:min(50vw,calc(100vw - var(--project-copy-left) - 3rem));
                text-align:left;
            }
            .project-icon-rail { display:none; }
            html[data-project-fluid-view="slide"] .project-icon-rail {
                display:block;
                position:fixed;
                left:var(--project-icon-left);
                top:calc(var(--header-height,70px) + 1rem);
                bottom:2rem;
                width:var(--project-dial-icon-size);
                overflow:hidden;
                pointer-events:none;
            }
            .project-icon-rail .project-dial-icon {
                display:block;
                position:absolute;
                left:calc(50% - var(--project-rail-icon-size,0px) / 2);
                top:0;
                width:var(--project-rail-icon-size,0px);
                height:var(--project-rail-icon-size,0px);
                max-width:none;
                visibility:hidden;
                pointer-events:none;
                transform-origin:center;
                will-change:transform,opacity;
            }
            .project-icon-rail .project-dial-icon[hidden] { display:none; }
            .project-dial-icon svg { display:block; width:100%; height:100%; }
            .project-dial-icon svg,
            .project-dial-icon svg * { animation:none!important; transition:none!important; }
            .project-icon-rail .project-dial-icon.is-icon-loaded {
                visibility:visible;
            }
            @media (max-width:759px) {
                html[data-project-fluid-view="slide"] .project-icon-rail { display:none; }
            }
            /* 제목의 자리와 행 높이를 유지해 다이얼이 흔들리지 않게 합니다. */
            html[data-project-fluid-view="slide"] .project-dial-title {
                display:block;
                visibility:hidden;
                opacity:0;
                clip-path:inset(0 100% 0 0);
                animation:none;
            }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active .project-dial-title {
                visibility:visible;
                opacity:1;
                clip-path:inset(0 0 0 0);
                animation:project-dial-title-reveal var(--project-dial-title-duration,800ms) cubic-bezier(.22,1,.36,1) both;
            }
            @keyframes project-dial-title-reveal {
                from { clip-path:inset(0 100% 0 0); }
                to { clip-path:inset(0 0 0 0); }
            }
            html[data-project-fluid-view="slide"] .project-info {
                opacity:0;
                transform:translateX(-32px);
                clip-path:inset(0 100% 0 0);
                will-change:transform,opacity,clip-path;
            }
            html[data-project-fluid-view="slide"] .project-info.is-visible {
                animation:project-info-reveal 700ms cubic-bezier(.22,1,.36,1) both;
            }
            @keyframes project-info-reveal {
                from {
                    opacity:0;
                    transform:translateX(-32px);
                    clip-path:inset(0 100% 0 0);
                }
                to {
                    opacity:1;
                    transform:translateX(0);
                    clip-path:inset(0 0 0 0);
                }
            }
            @media (prefers-reduced-motion:reduce) {
                html[data-project-fluid-view="slide"] .project-dial-item.is-active .project-dial-title {
                    animation:none;
                }
                html[data-project-fluid-view="slide"] .project-info,
                html[data-project-fluid-view="slide"] .project-info.is-visible {
                    opacity:1;
                    transform:none;
                    clip-path:none;
                    animation:none;
                }
            }
            `;
            document.head.appendChild(style);
            function visibleCards(){return cards.filter(card=>!card.hidden);}

            // =========================================================
            // Fluid Surface Bounds
            // ---------------------------------------------------------
            // WebGL 전환 캔버스를 #slideview 전체(100vh)가 아니라
            // 실제 슬라이드 카드가 차지하는 영역에만 맞춥니다.
            // 따라서 CSS에서 카드 높이/위치를 바꿔도 애니메이션이
            // 현재 레이아웃을 그대로 따라갑니다.
            // =========================================================
            function syncFluidSurfaceBounds(card=cards[wanted??index]||cards[index]){
                if(!card||slideview.hidden)return;

                const viewRect=slideview.getBoundingClientRect();
                const cardRect=card.getBoundingClientRect();

                host.style.left=`${cardRect.left-viewRect.left}px`;
                host.style.top=`${cardRect.top-viewRect.top}px`;
                host.style.width=`${Math.max(1,cardRect.width)}px`;
                host.style.height=`${Math.max(1,cardRect.height)}px`;

                /* 카드의 radius도 Fluid Surface에 그대로 적용해서
                   전환 중 모서리가 네모로 튀어나오지 않게 합니다. */
                const cardStyle=getComputedStyle(card);
                host.style.borderRadius=cardStyle.borderRadius;
            }

            function getSource(card){
                const project =
                    getProjectById(card.dataset.projectId);

                const source =
                    project?.slideImage ||
                    project?.image;

                if(source){
                    return new URL(
                        source,
                        document.baseURI
                    ).href;
                }

                const value =
                    getComputedStyle(card).backgroundImage;

                const match =
                    value.match(
                        /^url\(["']?(.*?)["']?\)$/
                    );

                return match
                    ? new URL(
                        match[1],
                        document.baseURI
                    ).href
                    : '';
            }
            // =========================================================
            // Dial Motion
            // =========================================================
            const dialClamp=(value,min,max)=>Math.max(min,Math.min(max,value));
            const dialLerp=(a,b,t)=>a+(b-a)*t;

            function syncIconRail(projectId){
                const ids=visibleCards().map(card=>String(card.dataset.projectId))
                    .filter(id=>dialIcons.has(id));
                const from=ids.indexOf(iconTransition?.fromId);
                const to=ids.indexOf(iconTransition?.toId);
                const moving=iconTransition&&from>=0&&to>=0;
                const active=ids.indexOf(String(projectId));
                const progress=moving?dialClamp(iconTransition.progress,0,1):0;
                const height=iconRail.clientHeight;
                // 제목과 같은 화면 중앙에 현재 아이콘을 두고, 나머지는 위아래 공간에 맞춥니다.
                // Fixed layout coordinates stay stable while the view transition scales the rail.
                const center=dialClamp(window.innerHeight/2-iconRail.offsetTop,0,height);
                const size=Math.min(iconRail.clientWidth,2*Math.min(center,height-center));
                iconRail.style.setProperty('--project-rail-icon-size',`${size.toFixed(2)}px`);
                const layoutAt=(activeIndex,itemIndex)=>{
                    if(activeIndex<0){
                        const step=Math.min(height/Math.max(1,ids.length),size*.8);
                        return {center:(height-(ids.length-1)*step)/2+itemIndex*step,
                            size:Math.min(size*.46,step*.8),opacity:.4};
                    }
                    const offset=itemIndex-activeIndex;
                    if(!offset)return {center,size,opacity:1};
                    const above=offset<0;
                    const count=above?activeIndex:ids.length-activeIndex-1;
                    const space=Math.max(0,(above?center:height-center)-size/2);
                    const gap=Math.min(12,size*.18,space);
                    const step=Math.min(size*.8,(space-gap)/count);
                    return {
                        center:center+Math.sign(offset)*(size/2+gap+(Math.abs(offset)-.5)*step),
                        size:Math.min(size*.46,step*.8),opacity:.4
                    };
                };
                dialIcons.forEach(({slot},id)=>{
                    const itemIndex=ids.indexOf(id);
                    slot.hidden=itemIndex<0;
                    if(slot.hidden)return;
                    const before=layoutAt(moving?from:active,itemIndex);
                    const after=moving?layoutAt(to,itemIndex):before;
                    const scale=dialLerp(before.size,after.size,progress)/Math.max(1,size);
                    const y=dialLerp(before.center,after.center,progress)-size/2;
                    slot.style.transform=`translate3d(0,${y.toFixed(2)}px,0) scale(${scale.toFixed(4)})`;
                    slot.style.opacity=dialLerp(before.opacity,after.opacity,progress).toFixed(3);
                });
            }

            // 빠르게 출발하고 마지막에서 천천히 안착하는 곡선.
            // CSS의 cubic-bezier(.22,1,.36,1)와 비슷한 인상입니다.
            const dialEase=t=>1-Math.pow(1-t,3);

            function updateDialClasses(activeIndex){
                projectDialItems.forEach((item,i)=>{
                    const distance=Math.abs(i-activeIndex);
                    item.classList.toggle('is-active',distance===0);
                    item.classList.toggle('is-near',distance===1);
                    item.classList.toggle('is-far',distance===2);
                    item.classList.toggle('is-none',distance>2);
                });
            }

            function getDialItemCenterAt(position){
                if(!projectDialItems.length)return 0;

                const last=projectDialItems.length-1;
                const safe=dialClamp(position,0,last);

                const low=Math.floor(safe);
                const high=Math.ceil(safe);
                const mix=safe-low;

                const lowItem=projectDialItems[low];
                const highItem=projectDialItems[high];

                const lowCenter=lowItem.offsetTop+lowItem.offsetHeight/2;
                const highCenter=highItem.offsetTop+highItem.offsetHeight/2;

                return dialLerp(lowCenter,highCenter,mix);
            }

            function applyDialVisual(position){
                if(!projectDial||!projectDialList||!projectDialItems.length)return;

                const centerInsideDial=window.innerHeight/2-projectDial.offsetTop;
                const itemCenter=getDialItemCenterAt(position);

                projectDialList.style.transform=
                    `translate3d(0, ${centerInsideDial-itemCenter}px, 0)`;

                /*
                 * 중앙을 통과하는 순간을 기준으로 각 항목의 상태를
                 * 연속적으로 계산합니다.
                 *
                 * active -> near -> far -> none이 갑자기 바뀌지 않고,
                 * 이동 도중 자연스럽게 밝아졌다가 다시 흐려집니다.
                 */
                projectDialItems.forEach((item,i)=>{
                    const signed=i-position;
                    const distance=Math.abs(signed);

                    let opacity;
                    if(distance<=1){
                        opacity=dialLerp(1,.52,distance);
                    }else if(distance<=2){
                        opacity=dialLerp(.52,.22,distance-1);
                    }else if(distance<=3){
                        opacity=dialLerp(.22,.05,distance-2);
                    }else{
                        opacity=.035;
                    }

                    let scale;

                    if(distance<=1){
                        // active 1.0 → near 0.8
                        scale=dialLerp(
                            1,
                            .5,
                            distance
                        );
                    }else if(distance<=2){
                        // near 0.8 → far 0.4
                        scale=dialLerp(
                            .5,
                            .4,
                            distance-1
                        );
                    }else if(distance<=3){
                        // far 0.4 → none 0.3
                        scale=dialLerp(
                            .4,
                            .3,
                            distance-2
                        );
                    }else{
                        scale=.3;
                    }

                    const blur=distance<=1.15
                        ? 0
                        : dialClamp((distance-1.15)*.34,0,.8);

                    /*
                     * 아주 약한 X 깊이만 줍니다.
                     * 과한 3D 다이얼 느낌 없이 중앙 항목이 살짝 앞으로
                     * 오는 듯한 인상만 남깁니다.
                     */
                    const x=dialClamp(distance*2.2,0,5.5);

                    item.style.opacity=opacity.toFixed(3);
                    item.style.transform=
                        `translate3d(${-x}px,0,0) scale(${scale.toFixed(4)})`;
                    item.style.filter=`blur(${blur.toFixed(2)}px)`;
                });
            }

            function stopDialMotion(){
                if(dialRaf){
                    cancelAnimationFrame(dialRaf);
                    dialRaf=0;
                }
            }

            function syncProjectDial(projectId,direction=0,instant=false){
                syncIconRail(projectId);
                if(!projectDial||!projectDialList||!projectDialItems.length)return;

                const targetIndex=projectDialItems.findIndex(
                    item=>String(item.dataset.projectId)===String(projectId)
                );
                if(targetIndex<0)return;

                updateDialClasses(targetIndex);

                projectDial.classList.toggle('is-moving-up',direction>0);
                projectDial.classList.toggle('is-moving-down',direction<0);
                projectDial.dataset.direction=
                    direction>0?'up':
                    direction<0?'down':
                    'none';

                if(dialPosition===null){
                    const existing=projectDialItems.findIndex(
                        item=>item.classList.contains('is-active')
                    );
                    dialPosition=existing>=0?existing:targetIndex;
                }

                stopDialMotion();

                if(
                    instant ||
                    Math.abs(targetIndex-dialPosition)<.001 ||
                    reduce.matches
                ){
                    dialPosition=targetIndex;
                    applyDialVisual(dialPosition);
                    return;
                }

                const from=dialPosition;
                const distance=Math.abs(targetIndex-from);

                /*
                 * 1칸 이동은 약 850ms.
                 * 연속 스크롤로 2칸 이상 목표가 바뀌어도
                 * 길이가 과하게 늘어나지 않게 제한합니다.
                 */
                const duration=dialClamp(
                    settings.duration*820 + Math.max(0,distance-1)*75,
                    700,
                    1050
                );

                const started=performance.now();

                const tick=now=>{
                    const raw=dialClamp((now-started)/duration,0,1);
                    const eased=dialEase(raw);

                    dialPosition=dialLerp(from,targetIndex,eased);
                    applyDialVisual(dialPosition);

                    if(raw<1){
                        dialRaf=requestAnimationFrame(tick);
                    }else{
                        dialRaf=0;
                        dialPosition=targetIndex;
                        applyDialVisual(targetIndex);
                    }
                };

                dialRaf=requestAnimationFrame(tick);
            }

            function markActive(next,instant=false,direction=0){
                if(instant)cards.forEach(c=>c.setAttribute('data-fluid-instant',''));

                cards.forEach((c,i)=>c.classList.toggle('is-active',i===next));
                index=next;

                // 이미지 슬라이드와 Dial을 같은 project-id 기준으로 동기화
                syncProjectDial(cards[next]?.dataset.projectId,direction,instant);

                if(instant){
                    void slideview.offsetWidth;
                    cards.forEach(c=>c.removeAttribute('data-fluid-instant'));
                }
            }
            function forceTextVisible(){
                document.querySelectorAll('.title-section h1[typewriter-effect],.slide-description p[typewriter-effect]').forEach(el=>{
                    el.classList.add('is-typed');el.dataset.typing='false';el.dataset.typed='true';
                });
            }
            function cancelDescriptionExit(){
                const exit=descriptionExit;
                descriptionExit=null;
                exit?.animation.cancel();
                exit?.element.remove();
            }
            async function exitProjectDescription(){
                clearWriterQueue();
                cancelDescriptionExit();
                const info=document.querySelector('.project-info');
                if(!info)return;
                const style=getComputedStyle(info);
                if(reduce.matches||style.visibility==='hidden'||Number(style.opacity)===0){
                    info.classList.remove('is-visible');
                    return;
                }
                const from={opacity:style.opacity,transform:style.transform,clipPath:style.clipPath};
                const bounds=info.getBoundingClientRect();
                const offset=new DOMMatrixReadOnly(style.transform==='none'?undefined:style.transform);
                // Keep the outgoing copy above the canvas while the real description updates.
                const outgoing=info.cloneNode(true);
                outgoing.className='project-info-exit';
                outgoing.setAttribute('aria-hidden','true');
                for(const property of style)outgoing.style.setProperty(property,style.getPropertyValue(property));
                Object.assign(outgoing.style,{
                    position:'fixed',left:`${bounds.left-offset.m41}px`,top:`${bounds.top-offset.m42}px`,
                    right:'auto',bottom:'auto',margin:'0',pointerEvents:'none',
                    zIndex:String(Number.isFinite(headerZ)&&headerZ>1?headerZ-1:999),
                    // Preserve each text child's color instead of inheriting the parent's computed fill.
                    webkitTextFillColor:'currentColor',
                    animation:'none',transition:'none'
                });
                document.body.append(outgoing);
                info.classList.remove('is-visible');
                const animation=outgoing.animate([
                    from,
                    {opacity:0,transform:'translateX(-40px)',clipPath:from.clipPath}
                ],{duration:260,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'});
                animation.id='project-info-exit';
                descriptionExit={animation,element:outgoing};
                try{
                    await animation.finished;
                }catch{
                    // View changes and reduced motion can cancel the exit.
                }finally{
                    if(descriptionExit?.animation===animation)cancelDescriptionExit();
                }
            }
            async function exitProjectCopy(){
                root.classList.remove('project-wave-text-enter');
                root.classList.add('project-wave-text-exit');
                const elements=document.querySelectorAll(
                    '.project-dial-item.is-active .project-dial-title, .project-info, '+
                    '.title-section .project-title, .desktop-slide-description'
                );
                // Wait for the actual reverse animations, including cancellation on view changes.
                const animations=[...elements].flatMap(element=>element.getAnimations())
                    .filter(animation=>animation.animationName==='project-wave-copy-out');
                const results=await Promise.all(animations.map(animation=>animation.finished.then(()=>true,()=>false)));
                return results.every(Boolean);
            }
            function clearEntryPieces(entry){
                entry.pieces.forEach(({element,label})=>{element.remove();label?.remove();});
                entry.pieces=[];
                entry.fragmentSlots.forEach(slot=>slot.classList.remove('is-entry-fragmented'));
                entry.fragmentSlots=[];
            }
            function finishIntro(cancel=false){
                const entry=intro;
                if(!entry)return;
                intro=null;
                clearTimeout(entry.timeout);
                entry.observer?.disconnect();
                entry.release?.();
                clearEntryPieces(entry);
                entry.labels?.remove();
                entry.animations.forEach(animation=>animation.cancel());
                entry.inert.forEach(([element,value])=>{element.inert=value;});
                if(cancel)window.ProjectWave.cancel();
                root.classList.remove('project-intro-pending','project-intro-running','project-intro-aligned','project-intro-copy-ready',
                    'project-wave-text-pending');
                delete iconRail.dataset.entryPhase;
                phase='idle';
                wheelTotal=0;wheelLocked=false;lastWheel=0;
                syncIconRail(cards[index]?.dataset.projectId);
                if(!disposed&&!slideview.hidden){
                    // Keep the description's earlier reveal running through the wave's final tail.
                    if(cancel||!entry.copyRevealed)updateSlideInfo(cards[index].dataset.projectId,false);
                    forceTextVisible();
                    flushSearchFocus();
                }
            }
            async function playEntryIntro(){
                clearTimeout(window.projectIntroFallback);
                if(!root.classList.contains('project-intro-pending'))return;
                if(reduce.matches||innerWidth<760||slideview.hidden){
                    root.classList.remove('project-intro-pending');
                    return;
                }
                // Keep header navigation interactive as soon as its entrance reveals it.
                const entry={animations:[],pieces:[],fragmentSlots:[],inert:[...document.querySelectorAll('.main,.footer')]
                    .map(element=>[element,element.inert])};
                intro=entry;
                phase='intro';
                entry.inert.forEach(([element])=>{element.inert=true;});
                // Failed assets or a suspended animation must never leave a blank, locked page.
                entry.timeout=setTimeout(()=>{if(intro===entry)finishIntro(true);},12000);
                const play=(element,frames,options)=>{
                    const animation=element.animate(frames,{fill:'both',...options});
                    entry.animations.push(animation);
                    return animation;
                };
                const designers=new Map((window.DESIGNERS||[]).map(designer=>[designer.id,designer.nameKo]));
                const owners=new Map((window.DESIGNER_ICON_PROJECTS||[]).map(project=>[
                    String(project.projectId),new Map(Object.entries(project.studentColors||{})
                        .map(([id,color])=>[color.trim().toLowerCase(),{id,name:designers.get(id)}]))
                ]));
                try{
                    const introBackground=document.createElement('canvas');
                    introBackground.width=innerWidth;
                    introBackground.height=innerHeight;
                    const paint=introBackground.getContext('2d');
                    // Match the CSS cover so the first slide continues without a background flash.
                    const gradient=paint.createLinearGradient(0,0,0,introBackground.height);
                    gradient.addColorStop(0,'#f4f4f4');
                    gradient.addColorStop(.5,'#fff');
                    gradient.addColorStop(1,'#f4f4f4');
                    paint.fillStyle=gradient;
                    paint.fillRect(0,0,introBackground.width,introBackground.height);
                    const from=introBackground.toDataURL(),to=getSource(cards[index]);
                    // Decode both scenes and compile the shader before any icon motion starts.
                    const [prepared]=await Promise.all([
                        window.ProjectWave.prepareTransition(from,to),...iconLoads,document.fonts.ready,
                        document.fonts.load('600 12px "Pretendard Variable"',projectDialItems
                            .map(item=>getProjectById(item.dataset.projectId)?.title||'').concat([...designers.values()])
                            .join(' ')).catch(()=>[])
                    ]);
                    if(intro!==entry)return;
                    // A navigation wave may still cover this page. Begin only when it has left.
                    await new Promise(resolve=>{
                        const check=()=>{
                            if(!root.classList.contains('page-transition-preload')
                                &&!root.classList.contains('page-transition-active')
                                &&!document.querySelector('.page-transition-layer')){
                                entry.observer.disconnect();resolve();
                            }
                        };
                        entry.release=resolve;
                        entry.observer=new MutationObserver(check);
                        entry.observer.observe(document.body,{childList:true});
                        entry.observer.observe(root,{attributes:true,attributeFilter:['class']});
                        check();
                    });
                    if(intro!==entry)return;
                    syncIconRail(cards[index].dataset.projectId);
                    updateSlideInfo(cards[index].dataset.projectId,false);
                    forceTextVisible();settleAsciiContent();
                    const incoming=await captureAsciiContent(cards[index],{includeHidden:true});
                    if(intro!==entry)return;
                    const bounds=iconRail.getBoundingClientRect();
                    const size=parseFloat(iconRail.style.getPropertyValue('--project-rail-icon-size'));
                    if(!size)return;
                    const originX=innerWidth/2-(bounds.left+bounds.width/2);
                    const originY=innerHeight/2-bounds.top-size/2;
                    const slots=visibleCards().map(card=>dialIcons.get(String(card.dataset.projectId))?.slot)
                        .filter(slot=>slot?.classList.contains('is-icon-loaded')&&!slot.hidden);
                    // Fit every project into one centered row, including smaller desktop widths.
                    const rowWidth=innerWidth-2*Math.max(24,innerWidth*.05);
                    const pitch=Math.min(104,rowWidth/Math.max(1,slots.length));
                    const iconSize=Math.min(72,pitch*.72,Math.max(48,innerHeight*.085));
                    const scale=iconSize/size;
                    entry.labels=document.createElement('div');
                    entry.labels.className='project-entry-labels';
                    entry.labels.setAttribute('aria-hidden','true');
                    entry.labels.style.zIndex=iconRail.style.zIndex;
                    entry.labels.style.setProperty('--project-entry-label-size',`${Math.min(12,Math.max(9,pitch*.18))}px`);
                    document.body.append(entry.labels);
                    const poses=slots.map((slot,i)=>{
                        const x=originX+(i-(slots.length-1)/2)*pitch;
                        const y=originY;
                        const pose={slot,transform:slot.style.transform,opacity:slot.style.opacity,
                            assembled:`translate3d(${x}px,${y}px,0) scale(${scale})`,
                            centerX:innerWidth/2+x-originX,centerY:innerHeight/2+y-originY};
                        // Hold the real slot at its assembly position while its individual colors travel.
                        play(slot,[{transform:pose.assembled,opacity:1}],{duration:1});
                        slot.classList.add('is-entry-fragmented');
                        entry.fragmentSlots.push(slot);
                        splitIconColors(slot.querySelector('svg')).forEach(({color,svg},colorIndex)=>{
                            const element=document.createElement('span');
                            element.className='project-entry-piece';
                            element.dataset.color=color;
                            element.setAttribute('aria-hidden','true');
                            element.append(svg);slot.append(element);
                            const owner=owners.get(slot.dataset.projectId)?.get(color);
                            let label;
                            if(owner?.name){
                                element.dataset.designerId=owner.id;
                                label=document.createElement('span');
                                label.className='project-entry-label project-entry-designer';
                                label.dataset.designerId=owner.id;
                                label.textContent=owner.name;
                                entry.labels.append(label);
                            }
                            entry.pieces.push({element,svg,label,pose,group:i,colorIndex});
                        });
                        return pose;
                    });
                    const scatterDepth=Math.min(140,Math.min(innerWidth,innerHeight)*.18);
                    const edgePops=entry.pieces.map((piece,i)=>{
                        const side=i%4;
                        const count=Math.ceil((entry.pieces.length-side)/4);
                        const pieceScale=.72+Math.random()*.5;
                        // Jitter within each edge segment, then vary its depth so pieces do not form a row.
                        const along=(Math.floor(i/4)+.15+Math.random()*.7)/count;
                        const margin=Math.max(48,iconSize*pieceScale*.85+22);
                        const depth=margin+Math.random()*scatterDepth;
                        const horizontal=margin+along*(innerWidth-2*margin);
                        const vertical=margin+along*(innerHeight-2*margin);
                        const [edgeX,edgeY]=[
                            [horizontal,depth],[innerWidth-depth,vertical],
                            [innerWidth-horizontal,innerHeight-depth],[depth,innerHeight-vertical]
                        ][side];
                        // Offsets are local to the scaled slot, while the edge positions are viewport pixels.
                        const dx=(edgeX-piece.pose.centerX)/scale,dy=(edgeY-piece.pose.centerY)/scale;
                        const rotation=-24+Math.random()*48;
                        const position=`translate3d(${dx}px,${dy}px,0) rotate(${rotation}deg)`;
                        piece.edge=`${position} scale(${pieceScale})`;
                        piece.element.dataset.edge=['top','right','bottom','left'][side];
                        if(piece.label){
                            // Use the same viewport destination as the piece. SVG screen matrices can omit
                            // the animated HTML ancestors' 3D transforms and report the left rail instead.
                            const box=piece.svg.getBBox(),viewBox=piece.svg.viewBox.baseVal;
                            const pixelsPerUnit=iconSize*pieceScale/Math.max(viewBox.width,viewBox.height);
                            const radians=rotation*Math.PI/180,cos=Math.cos(radians),sin=Math.sin(radians);
                            // Rotate the bottom-center anchor and its caption together, keeping a 6px gap.
                            const localX=(box.x+box.width/2-viewBox.x-viewBox.width/2)*pixelsPerUnit;
                            const localY=(box.y+box.height-viewBox.y-viewBox.height/2)*pixelsPerUnit+6;
                            piece.label.style.left=`${edgeX+localX*cos-localY*sin}px`;
                            piece.label.style.top=`${edgeY+localX*sin+localY*cos}px`;
                        }
                        const delay=Math.random()*360+i*2;
                        const animation=play(piece.element,[
                            {transform:`${position} scale(0)`,opacity:0},
                            {transform:`${position} scale(${pieceScale*1.16})`,opacity:1,offset:.6},
                            {transform:piece.edge,opacity:1}
                        ],{duration:460,delay,easing:'cubic-bezier(.22,1,.36,1)'});
                        animation.id='project-entry-edge-pop';
                        if(piece.label){
                            play(piece.label,[
                                {opacity:0,transform:`translate(-50%,0) rotate(${rotation}deg) translateY(6px)`},
                                {opacity:1,transform:`translate(-50%,0) rotate(${rotation}deg)`}
                            ],{duration:300,delay:delay+100,easing:'cubic-bezier(.22,1,.36,1)'});
                        }
                        return animation.finished;
                    });
                    iconRail.dataset.entryPhase='edge-pop';
                    root.classList.replace('project-intro-pending','project-intro-running');
                    await Promise.all(edgePops);
                    if(intro!==entry)return;
                    const labels=poses.map(pose=>{
                        const label=document.createElement('span');
                        label.className='project-entry-label';
                        label.textContent=getProjectById(pose.slot.dataset.projectId)?.title||'';
                        Object.assign(label.style,{
                            left:`${pose.centerX}px`,top:`${pose.centerY+iconSize/2+12}px`,width:`${pitch-4}px`
                        });
                        entry.labels.append(label);
                        return label;
                    });
                    iconRail.dataset.entryPhase='assemble';
                    let assembledCount=0;
                    // Reveal each name as its own colors finish joining, overlapping the next icon's arrival.
                    await Promise.all(poses.map(async (pose,group)=>{
                        await Promise.all(entry.pieces.filter(piece=>piece.pose===pose).map(piece=>{
                            const delay=piece.group*55+piece.colorIndex*16;
                            if(piece.label){
                                play(piece.label,[{opacity:1},{opacity:0}],
                                    {duration:180,delay,easing:'ease-out',fill:'forwards'});
                            }
                            const animation=play(piece.element,[
                                {transform:piece.edge,opacity:1},
                                {transform:'translate3d(0,0,0) rotate(0deg) scale(1)',opacity:1}
                            ],{duration:620,delay,
                                easing:'cubic-bezier(.65,0,.2,1)'});
                            animation.id='project-entry-assemble';
                            return animation.finished;
                        }));
                        if(intro!==entry)return;
                        if(++assembledCount===poses.length){
                            // At zero local offset every color has the exact original SVG geometry.
                            clearEntryPieces(entry);
                            iconRail.dataset.entryPhase='labels';
                        }
                        const label=labels[group];
                        // Continue into alignment as soon as the final name fades in, without a hold.
                        const animation=play(label,[
                            {opacity:0,transform:'translate(-50%,6px)'},
                            {opacity:1,transform:'translate(-50%,0px)'}
                        ],{duration:180,easing:'cubic-bezier(.22,1,.36,1)'});
                        animation.id='project-entry-label-in';
                        await animation.finished;
                    }));
                    if(intro!==entry)return;
                    iconRail.dataset.entryPhase='align';
                    labels.forEach(label=>{
                        const animation=play(label,[
                            {opacity:1,transform:'translate(-50%,0px)'},
                            {opacity:0,transform:'translate(-50%,-4px)'}
                        ],{duration:180,easing:'ease-out'});
                        animation.id='project-entry-label-out';
                    });
                    const alignment=Promise.all(poses.map(({slot,assembled,transform,opacity},i)=>{
                        const animation=play(slot,[{transform:assembled,opacity:1},{transform,opacity}],
                            {duration:760,delay:i*18,easing:'cubic-bezier(.65,0,.2,1)'});
                        animation.id='project-entry-align';
                        return animation.finished;
                    })).then(()=>{
                        if(intro!==entry)return;
                        entry.labels.remove();
                        entry.labels=null;
                        entry.animations.forEach(animation=>animation.cancel());
                        entry.animations=[];
                        // Keep the rail unclipped until every icon reaches its left-hand position.
                        root.classList.add('project-intro-aligned');
                        iconRail.dataset.entryPhase='reveal';
                    });
                    // Let the icons lead by 400ms, then overlap the prepared project wave.
                    const reveal=new Promise(resolve=>setTimeout(resolve,400)).then(()=>{
                        if(intro!==entry)return;
                        return window.ProjectWave.transition({
                            from,to,prepared,target:cards[index],fromBlank:true,
                            onProgress(progress){
                                if(intro!==entry||entry.copyRevealed||progress<.72)return;
                                // Follow the title as it clears the central band, rather than waiting for the full wave.
                                entry.copyRevealed=true;
                                root.classList.add('project-intro-copy-ready');
                            },
                            swap(){
                                if(intro!==entry)return;
                                root.classList.add('project-wave-text-pending');
                                return Promise.resolve(incoming);
                            }
                        });
                    });
                    await Promise.all([alignment,reveal]);
                }catch(error){
                    if(intro===entry)console.warn('[Project entry] Showing the project without the intro.',error);
                }finally{
                    if(intro===entry)finishIntro();
                }
            }
            function clearTransition(){
                cancelSearchFocus();
                window.ProjectViewTransition?.cancel();
                finishIntro(true);
                cancelDescriptionExit();
                root.classList.remove('project-ascii-content-ready');
                window.ProjectWave.cancel();
                root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit', 'project-wave-copy-ready');
                request++;
                wanted=null;prepared=null;loading=false;phase='idle';queuedDirection=null;
                iconTransition=null;
                syncIconRail(cards[index]?.dataset.projectId);
                wheelTotal=0;lastWheel=0;wheelLocked=false;wheelDirection=0;
                lastWheelAmount=0;lastWheelNavigation=0;
                engine?.cancel();slideview.classList.remove('is-fluid-transitioning');
            }
            function jump(next,updateText=true){
                clearTransition();markActive(next,true);
                if(updateText&&!slideview.hidden)updateSlideInfo(cards[next].dataset.projectId,false);
                queueMicrotask(warm);
            }
            const imageLoads = new Map();
            function loadImage(source) {
                if (!source) return Promise.reject(new Error('Missing project image'));
                const url = new URL(source, document.baseURI).href;
                if (!imageLoads.has(url)) {
                    const image = new Image();
                    image.src = url;
                    imageLoads.set(url, image.decode().catch(error => {
                        imageLoads.delete(url);
                        throw error;
                    }));
                }
                return imageLoads.get(url);
            }
            function warm() {
                if (disposed || slideview.hidden) return;
                const visible = visibleCards(), at = visible.indexOf(cards[index]);
                for (const card of [visible[at - 1], cards[index], visible[at + 1]]) {
                    if (card) { loadImage(getSource(card)).catch(() => {}); window.ProjectASCII.prepare(getSource(card)).catch(() => {}); }
                }
            }
            async function transitionTo(next, direction = 1) {
                if (disposed || window.ProjectViewTransition?.busy || slideview.hidden || !cards[next] || cards[next].hidden) return;
                if (next === index || phase !== 'idle') return;
                if (reduce.matches) { jump(next); return; }
                const current = ++request;
                wanted = next;
                loading = true;
                phase = 'loading';
                try {
                    await Promise.all([
                        window.ProjectWave.ready,
                        loadImage(getSource(cards[next])), ...iconLoads
                    ]);
                    if (current !== request || disposed || slideview.hidden || cards[next].hidden) return;
                    const foreground=await captureAsciiContent(cards[index]);
                    if(current!==request||disposed||slideview.hidden||cards[next].hidden)return;
                    loading=false;
                    phase = 'animating';
                    iconTransition={fromId:String(cards[index].dataset.projectId),
                        toId:String(cards[next].dataset.projectId),progress:0};
                    const finished = await window.ProjectWave.transition({
                        direction,
                        onStart(){ void exitProjectDescription(); },
                        onProgress(progress, timelineProgress){
                            if(current!==request||disposed||slideview.hidden||!iconTransition)return;
                            iconTransition.progress=progress;
                            syncIconRail(cards[index]?.dataset.projectId);
                            // Start the 700ms description reveal during the final fifth of the wave.
                            if(timelineProgress>=.8&&queuedDirection===null){
                                root.classList.add('project-wave-copy-ready');
                            }
                        },
                        from: getSource(cards[index]),
                        to: getSource(cards[next]),
                        target: cards[index],
                        foreground,
                        swap() {
                            root.classList.add('project-wave-text-pending');
                            root.classList.remove('project-wave-text-enter', 'project-wave-text-exit', 'project-wave-copy-ready');
                            root.style.setProperty('--project-wave-copy-offset', `${direction * 14}px`);
                            markActive(next, true, direction);
                            updateSlideInfo(cards[next].dataset.projectId, false);
                            forceTextVisible();
                            wanted = null;
                            settleAsciiContent();
                            return captureAsciiContent(cards[next],{includeHidden:true});
                        }
                    });
                    if (!finished && current === request && !disposed && !slideview.hidden) {
                        cancelDescriptionExit();
                        root.classList.remove('project-wave-text-pending','project-wave-text-exit','project-wave-text-enter');
                        markActive(index,true);
                        updateSlideInfo(cards[index].dataset.projectId,false);
                    }
                    if (finished && current === request && !disposed && !slideview.hidden) {
                        cancelDescriptionExit();
                        // Continuous scrolling only reveals the final project's description.
                        if (queuedDirection !== null) {
                            document.querySelector('.project-info')?.classList.remove('is-visible');
                        }
                        // Preserve the reveal already in progress when the canvas finishes.
                        root.classList.remove('project-wave-text-pending','project-wave-text-enter','project-wave-text-exit');
                        forceTextVisible();
                    }
                } catch (error) {
                    if (current === request && !disposed) {
                        cancelDescriptionExit();
                        root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                        console.error('[Project wave transition]', error);
                        markActive(next, true, direction);
                        updateSlideInfo(cards[next].dataset.projectId, false);
                    }
                } finally {
                    if (current === request) {
                        root.classList.remove('project-wave-copy-ready');
                        wanted = null;
                        phase = 'idle';
                        loading = false;
                        iconTransition = null;
                        syncIconRail(cards[index]?.dataset.projectId);
                        wheelTotal = 0;
                        const queued = queuedDirection;
                        queuedDirection = null;
                        warm();
                        if (searchTarget !== null) {
                            if (!searchTimer) flushSearchFocus();
                        } else if (queued !== null) navigate(queued);
                    }
                }
            }
            function navigate(direction){
                if (disposed || window.ProjectViewTransition?.busy) return;
                cancelSearchFocus();
                if(
                    root.classList.contains('project-intro-pending') ||
                    root.classList.contains('project-intro-running')
                ) return;

                const list=visibleCards();if(!list.length||slideview.hidden)return;
                const at=list.indexOf(cards[wanted??index]);
                const next=at<0?list[0]:list[at+direction];
                if(phase!=='idle'){
                    // Keep only the latest requested step, never a long scroll backlog.
                    queuedDirection=next?direction:null;
                    if(next){
                        root.classList.remove('project-wave-copy-ready');
                        loadImage(getSource(next)).catch(()=>{});
                        window.ProjectASCII.prepare(getSource(next)).catch(()=>{});
                    }
                    return;
                }
                if(next)void transitionTo(cards.indexOf(next),direction);
            }

            function cancelSearchFocus(){
                clearTimeout(searchTimer);
                searchTimer=0;
                searchTarget=null;
            }
            function flushSearchFocus(){
                if(searchTarget===null||searchTimer||disposed||slideview.hidden)return;
                if(phase!=='idle'||window.ProjectViewTransition?.busy
                    ||root.classList.contains('project-intro-pending')
                    ||root.classList.contains('project-intro-running'))return;
                const next=searchTarget;
                searchTarget=null;
                if(next!==index&&!cards[next].hidden)void transitionTo(next,next<index?-1:1);
            }
            function focusSearch(projectId,{immediate=false}={}){
                cancelSearchFocus();
                queuedDirection=null;
                if(projectId===null||disposed||slideview.hidden)return;
                const next=cards.findIndex(card=>String(card.dataset.projectId)===String(projectId));
                if(next<0||cards[next].hidden)return;
                searchTarget=next;
                if(immediate)flushSearchFocus();
                else searchTimer=setTimeout(()=>{searchTimer=0;flushSearchFocus();},250);
            }
// Resolve the real DOM underneath the canvas to the incoming texture's final pose.
function captureAsciiContent(target, options = {}) {
    return window.ProjectASCII.captureForeground(target,options);
}

function settleAsciiContent() {
    root.classList.remove('project-wave-text-enter','project-wave-text-exit');
    root.classList.add('project-ascii-content-ready');
}

            function currentLenis(){
                // The supplied HTML declares `const lenis` at window scope (not window.lenis).
                try{return typeof lenis!=='undefined'?lenis:window.lenis;}catch{return window.lenis;}
            }
            function resumeGridScroll(){
                // Lenis가 슬라이드 초기화 뒤에 로드되면 stoppedLenis에 기록되지 않습니다.
                // 그리드에서는 현재 인스턴스까지 확인해 슬라이드의 스크롤 잠금을 해제합니다.
                const scrolling=currentLenis() || stoppedLenis;
                scrolling?.start();
                stoppedLenis=null;
            }
            async function changeView(view){
                if(view!=='grid'&&view!=='slide')return;
                if(disposed)return;
                if(innerWidth<760){
                    clearTransition();
                    applyView('grid');
                    return;
                }
                if(window.ProjectViewTransition?.busy)return;
                if(!initial&&root.dataset.projectFluidView===view)return;
                clearTransition();
                if(initial||reduce.matches||!window.ProjectViewTransition){
                    applyView(view);
                    return;
                }
                const focusedButton=document.activeElement?.closest('.view-button');
                const scrolling=currentLenis();
                const stopScrolling=()=>{
                    if(scrolling&&!scrolling.isStopped){
                        scrolling.stop();
                        stoppedLenis=scrolling;
                    }
                };
                stopScrolling();
                await window.ProjectViewTransition.run({
                    getSlideImage(){return {source:getSource(cards[index]),target:cards[index]};},
                    swap(){applyView(view);stopScrolling();}
                });
                if(disposed)return;
                if(slideview.hidden)resumeGridScroll();
                flushSearchFocus();
                if(focusedButton){
                    const scope=slideview.hidden?'.title-section':'.project-warp';
                    document.querySelector(`${scope} .view-button:not([hidden])`)?.focus({preventScroll:true});
                }
            }
            function applyView(view){

                const wasSlide=!slideview.hidden;

                clearWriterQueue();

                slideview.hidden=view!=='slide';
                if(gridview)gridview.hidden=view!=='grid';

                root.setAttribute(
                    'data-project-fluid-view',
                    view
                );

                viewButtons.forEach(button=>{
                    button.hidden=
                        button.dataset.view===view;

                    button.classList.toggle(
                        'is-active',
                        button.dataset.view===view
                    );
                });

                if(view==='grid'){
                    /*
                     * Grid에서는 project-dial이 display:none이 되므로
                     * 숨겨진 상태에서 위치 계산 RAF가 계속 돌지 않게 정지합니다.
                     */
                    stopDialMotion();

                    showGridTitle();

                    resumeGridScroll();
                }else{
                    const l=currentLenis();

                    if(
                        l &&
                        !l.isStopped &&
                        typeof l.stop==='function'
                    ){
                        l.stop();
                        stoppedLenis=l;
                    }

                    if(!wasSlide||initial){
                        window.scrollTo({
                            top:0,
                            left:0,
                            behavior:'instant'
                        });
                    }

                    const visible=visibleCards();

                    if(
                        visible.length &&
                        cards[index].hidden
                    ){
                        markActive(
                            cards.indexOf(visible[0]),
                            true
                        );
                    }

                    syncFluidSurfaceBounds(
                        cards[index]
                    );

                    if(engine){
                        engine.resize();
                    }

                    updateSlideInfo(
                        cards[index].dataset.projectId,
                        !window.ProjectViewTransition?.busy
                    );

                    if(!initial){
                        forceTextVisible();
                    }

                    /*
                     * Slide가 다시 display 상태가 된 다음 프레임에
                     * Dial의 실제 크기/offsetTop을 다시 읽어 중앙 위치를 계산합니다.
                     *
                     * 이전 Grid 상태에서 남아 있던 dialPosition도 버려
                     * 화면 밖 translate 값이 재사용되지 않게 합니다.
                     */
                    requestAnimationFrame(()=>{
                        if(slideview.hidden)return;

                        dialPosition=null;

                        syncProjectDial(
                            cards[index]?.dataset.projectId,
                            0,
                            true
                        );
                    });
                }

                initial=false;
                document.dispatchEvent(new CustomEvent('project-view-change',{detail:{view}}));

                if(view==='slide'){
                    queueMicrotask(warm);
                }
            }
            function reconcileSearch(){
                if(disposed)return;
                queuedDirection=null;
                const list=visibleCards();
                if(!list.length){clearTransition();return;}
                if(engine?.nodes.some(n=>[n.from,n.to].some(f=>!list.some(c=>c.dataset.projectId===f.id)))){jump(list.includes(cards[index])?index:cards.indexOf(list[0]));return;}
                if(!list.includes(cards[index]))jump(cards.indexOf(list[0]));
                else if(wanted!==null&&!list.includes(cards[wanted]))jump(index);
                syncIconRail(cards[index]?.dataset.projectId);
            }
            listen(document,'project-search-change',event=>{
                queuedDirection=null;
                // The existing filter sets card.hidden and publishes visibleIds.
                const raw=event.detail?.visibleIds;
                if(Array.isArray(raw)){
                    const ids=new Set(raw.map(String));
                    const allowed=cards.filter(c=>ids.has(String(c.dataset.projectId)));
                    if(!allowed.length){clearTransition();return;}
                    if(!allowed.includes(cards[index]))jump(cards.indexOf(allowed[0]));
                    else if(wanted!==null&&!allowed.includes(cards[wanted]))jump(index);
                }
                cancelAnimationFrame(searchFrame);searchFrame=requestAnimationFrame(reconcileSearch);
            });
            const observer=new MutationObserver(reconcileSearch);
            cards.forEach(card=>observer.observe(card,{attributes:true,attributeFilter:['hidden']}));
            viewButtons.forEach(button=>listen(button,'click',()=>changeView(button.dataset.view)));
            const editable=target=>target instanceof Element&&target.closest('input,textarea,select,[contenteditable="true"],[role="dialog"],[data-fluid-ignore]');
            const wheelOption=(name,fallback,min,max)=>Math.min(max,Math.max(min,Number.isFinite(Number(settings[name]))?Number(settings[name]):fallback));
            listen(document,'wheel',event=>{
                if(disposed||slideview.hidden||event.ctrlKey||event.metaKey||editable(event.target))return;
                const nested=event.composedPath().find(el=>el instanceof Element&&el.matches('[data-fluid-ignore],[role="dialog"]'));
                if(nested)return;
                if(event.cancelable)event.preventDefault();
                event.lenisStopPropagation=true;
                const delta=Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX;
                if(!delta)return;
                const now=performance.now();
                const direction=Math.sign(delta);
                const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
                const amount=Math.abs(delta*unit);
                const threshold=wheelOption('wheelThreshold',90,1,500);
                // Accept fresh flicks and sustained wheel input, but not a decaying tail.
                const renewedPush=wheelLocked
                    && now-lastWheelNavigation>=wheelOption('wheelRepeatDelay',160,80,600)
                    && ((amount>=12&&amount>lastWheelAmount*1.5)
                        || (amount>=threshold*.5&&amount>=lastWheelAmount*.98));
                const newGesture=now-lastWheel>wheelOption('wheelGestureGap',180,80,1000)
                    || direction!==wheelDirection || renewedPush;
                if(newGesture){wheelTotal=0;wheelLocked=false;}
                lastWheel=now;
                wheelDirection=direction;
                lastWheelAmount=amount;
                if(root.classList.contains('project-intro-pending')
                    ||root.classList.contains('project-intro-running')){
                    wheelTotal=0;wheelLocked=true;return;
                }
                // Locked/inertial events still adjust animation speed without adding slides.
                window.ProjectWave.updateScrollSpeed(delta*unit);
                if(wheelLocked)return;
                wheelTotal+=delta*unit;
                if(Math.abs(wheelTotal)>=threshold){
                    wheelTotal=0;
                    navigate(direction);
                    // Set after navigate: reduced motion may synchronously reset state.
                    wheelLocked=true;
                    lastWheelNavigation=now;
                    lastWheel=now;wheelDirection=direction;
                }
            },{passive:false,capture:true});
            listen(document,'keydown',event=>{
                if(slideview.hidden||editable(event.target)||event.ctrlKey||event.metaKey||event.altKey)return;
                const dir=['ArrowDown','ArrowRight','PageDown'].includes(event.key)?1:['ArrowUp','ArrowLeft','PageUp'].includes(event.key)?-1:0;
                if(dir){event.preventDefault();if(!event.repeat)navigate(dir);}
            });
            let touch=null;
            listen(document,'touchstart',event=>{
                if(slideview.hidden||editable(event.target)||event.touches.length!==1){touch=null;return;}
                touch={x:event.touches[0].clientX,y:event.touches[0].clientY};
            },{passive:true});
            listen(document,'touchmove',event=>{if(touch&&!slideview.hidden&&event.touches.length===1&&event.cancelable)event.preventDefault();},{passive:false});
            listen(document,'touchend',event=>{
                if(!touch||slideview.hidden)return;
                const end=event.changedTouches[0],dx=touch.x-end.clientX,dy=touch.y-end.clientY;touch=null;
                const delta=Math.abs(dy)>Math.abs(dx)?dy:dx;if(Math.abs(delta)>45)navigate(Math.sign(delta));
            },{passive:true});
            listen(document,'touchcancel',()=>{touch=null;},{passive:true});
            listen(window,'resize',()=>{
                finishIntro(true);
                syncFluidSurfaceBounds(cards[wanted??index]||cards[index]);
                syncIconRail(cards[index]?.dataset.projectId);

                // 화면 크기가 바뀌어도 현재 이동 중인 위치를 유지한 채 중앙 재계산
                if(dialPosition!==null)applyDialVisual(dialPosition);
                else syncProjectDial(cards[index]?.dataset.projectId,0,true);
            });
            listen(reduce,'change',()=>{
                if(reduce.matches){
                    const next=wanted??index;
                    jump(next);
                }else warm();
            });
            listen(window,'pagehide',()=>finishIntro(true));
            markActive(index,true);changeView('slide');
            window.ProjectFluidSlide={
                next:()=>navigate(1),prev:()=>navigate(-1),
                focusSearch,
                goTo(projectId){const next=cards.findIndex(c=>String(c.dataset.projectId)===String(projectId));if(next>=0)void transitionTo(next,next<index?-1:1);},
                setOptions(options){Object.assign(settings,options);engine?.setOptions(options);if(engine&&!slideview.hidden)engine.resize();},
                changeView,
                get state(){return {
                    view:slideview.hidden?'grid':'slide',phase,index,projectId:cards[index]?.dataset.projectId,
                    pendingId:wanted===null?null:cards[wanted]?.dataset.projectId,queuedDirection,loading,disabled,
                    textureCount:engine?.imageCache.size||0,loadingCount:engine?.imageLoads.size||0,
                    activeCount:engine?.nodes.length||0,wipes:engine?.state.wipes||[],
                    transitionCount:engine?.started||0,renderCount:engine?.renderCount||0,rgbEnvelope:engine?.energy||0
                };},
                destroy(){
                    clearTransition();disposed=true;clearWriterQueue();
                    cancelAnimationFrame(searchFrame);
                    stopDialMotion();
                    dialIcons.forEach(entry=>{
                        entry.item.classList.remove('has-project-icon','is-icon-loaded');
                        entry.slot.remove();
                    });
                    dialIcons.clear();
                    iconRail.remove();
                    projectDial?.classList.remove('has-project-icons');
                    observer.disconnect();events.abort();engine?.destroy();engine=null;host.remove();style.remove();
                    if(stoppedLenis)stoppedLenis.start();
                    if(originalView===null)root.removeAttribute('data-project-fluid-view');else root.setAttribute('data-project-fluid-view',originalView);
                    delete window.ProjectFluidSlide;
                }
            };
            void playEntryIntro();
        }
        if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initProjectPage,{once:true});
        else initProjectPage();
    })();

    })();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
