/* Project slide variant: scene-colored personal icon matrix dissolve (independent alternative to the white wave).
 * Replace the existing project controller script with this file (use defer).
 * Required existing files: project-data.js and assets/images/project/test/icon/*.svg.
 * CSS and overlay markup are inserted automatically. No HTML body or CSS edits.
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
  .project-dial-title, .project-info, .title-section .project-title, .desktop-slide-description
) { visibility: hidden !important; opacity: 0 !important; animation: none !important; }
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
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) { animation:none !important; transform:none !important; clip-path:none !important; opacity:1 !important; }
`;
    document.head.append(waveStyle);

/* Build input for project-ascii-transition.js. Not an additional browser include. */
(() => {
  'use strict';
  const options = {
    durationMs: 1400, cellSize: 12,
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
  const vertexSource = `
    attribute vec2 position;
    varying vec2 uv;
    void main() { uv=position*.5+.5; gl_Position=vec4(position,0.,1.); }
  `;
  const fragmentSource = `
    precision highp float;
    varying vec2 uv;
    uniform sampler2D imageA, imageB, iconAtlas, foreground, nextForeground, controls, nextControls;
    uniform vec2 resolution, sizeA, sizeB, iconGrid;
    uniform vec4 sceneTint;
    uniform float progress, direction, cellSize, codeTime, iconCount;
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
    vec3 scene(vec2 p, float incoming) {
      vec3 a=texture2D(imageA,cover(p,sizeA)).rgb;
      vec4 content=texture2D(foreground,p);
      vec3 b=texture2D(imageB,cover(p,sizeB)).rgb;
      vec4 nextContent=texture2D(nextForeground,p);
      float handoff=ease(.60,.84,progress);
      float alpha=mix(content.a,nextContent.a,handoff);
      vec3 premultiplied=mix(content.rgb*content.a,nextContent.rgb*nextContent.a,handoff);
      vec3 background=mix(mix(a,b,incoming),sceneTint.rgb,sceneTint.a);
      // Controls follow the scene, never the title's opacity/position animation.
      // Each glass snapshot already includes its backdrop and translucent fill.
      vec4 ui=texture2D(controls,p), nextUI=texture2D(nextControls,p);
      float uiAlpha=mix(ui.a,nextUI.a,incoming);
      background=background*(1.-uiAlpha)+mix(ui.rgb*ui.a,nextUI.rgb*nextUI.a,incoming);
      return background*(1.-alpha)+premultiplied;
    }
    void main() {
      float t=progress;
      float q=ease(0.,.90,t);
      float amp=sin(q*3.14159265);
      vec2 domain=vec2(uv.x*resolution.x/resolution.y,uv.y)*3.1;
      float n1=fbm(domain+vec2(q*.72,-q*.48));
      float n2=fbm(domain+vec2(8.3,2.7)+vec2(-q*.52,q*.58));
      float axis=direction>0.?uv.y:1.-uv.y;
      float wave=(n1-.5)*.24+sin(uv.x*5.5+n2*2.6+q*1.8)*.038;
      // One shared front keeps both projects visible around a short icon band.
      float front=mix(-.24,1.28,q)-axis+wave*amp;
      float incoming=ease(-.035,.035,front);
      vec2 cells=resolution/vec2(cellSize);
      vec2 grid=uv*cells;
      vec2 cell=floor(grid);
      float seed=random(cell);
      vec2 center=(floor(grid)+.5)/cells;
      vec3 color=scene(center,incoming);
      // Keep the matrix alive throughout the automatic transition.
      float clock=codeTime*(2.4+seed*1.4)+seed*5.;
      float step=floor(clock);
      float first=floor(random(cell+vec2(step,step*.37))*iconCount);
      float second=floor(random(cell+vec2(step+1.,(step+1.)*.37))*iconCount);
      vec2 local=fract(grid);
      vec4 iconA=texture2D(iconAtlas,iconUV(first,local));
      vec4 iconB=texture2D(iconAtlas,iconUV(second,local));
      float change=ease(.68,1.,fract(clock));
      float ink=mix(iconA.a,iconB.a,change);
      float grain=(region(cell/4.)-.5)*.025;
      // The leading and trailing edges stay 14% of the viewport apart,
      // with 3.5% feathering on each side instead of covering the whole slide.
      float becomeIcons=ease(-.035,.035,front+.07+grain);
      float becomeImage=ease(-.035,.035,front-.07+grain);
      float iconAmount=becomeIcons*(1.-becomeImage);
      // As in the text version, each cell takes its color from the scene below.
      vec3 detail=scene(uv,incoming);
      vec3 iconColor=min(color*1.35+.025,vec3(1.));
      vec3 iconLayer=mix(vec3(1.),iconColor,ink);
      gl_FragColor=vec4(mix(detail,iconLayer,iconAmount),1.);
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
          const selector = 'path,rect,circle,ellipse,polygon,polyline,line';
          const shapes = root => [...root.querySelectorAll(selector)].filter(node => !node.closest('defs,clipPath,mask'));
          const fill = element => {
            for (let node = element; node; node = node.parentElement) {
              const value = node.style?.fill || node.getAttribute('fill');
              if (value) return value.trim().toLowerCase();
            }
            return '#000000';
          };
          const colors = shapes(svg).map(fill);
          // These groups match the personal assignments in designer-icon-data.js.
          // Preserve every path of one color, including disconnected components.
          return Promise.all([...new Set(colors.filter(color => color !== 'none'))].map(async color => {
            const personal = svg.cloneNode(true);
            shapes(personal).forEach((node, index) => { if (colors[index] !== color) node.remove(); });
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
    uniforms = Object.fromEntries(['imageA','imageB','iconAtlas','foreground','nextForeground','controls','nextControls','resolution','sizeA','sizeB','sceneTint','progress','direction','cellSize','codeTime','iconCount','iconGrid']
      .map(name => [name, gl.getUniformLocation(program, name)]));
    atlas = texture(icons.sheet);
    atlasCount = icons.count;
    atlasGrid = icons.grid;
    overlay.dataset.iconCount = String(atlasCount);
    overlay.dataset.renderMode = 'personal-icons';
    return true;
  }

// Rasterize the glass controls separately so their alpha is applied only once.
async function captureControls(bounds, ratio, backgroundSource) {
  const surface = document.createElement('canvas');
  surface.width = Math.max(1, Math.round(bounds.width * ratio));
  surface.height = Math.max(1, Math.round(bounds.height * ratio));
  surface.controlCount = 0;
  const elements = [...document.querySelectorAll(
    '.project-description .search-bar input, .project-description .view-button'
  )].filter(element => {
    const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
    return element.getClientRects().length && rect.width && rect.height &&
      style.visibility === 'visible' && style.display !== 'none';
  });
  if (!elements.length) return surface;
  const image = await prepare(backgroundSource);
  const backdrop = document.createElement('canvas');
  backdrop.width = surface.width;
  backdrop.height = surface.height;
  const background = backdrop.getContext('2d');
  const scale = Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
  const width = image.naturalWidth * scale, height = image.naturalHeight * scale;
  background.scale(ratio, ratio);
  background.drawImage(image, (bounds.width-width)/2, (bounds.height-height)/2, width, height);
  const tint = readSceneTint();
  background.fillStyle = `rgba(${tint[0]*255},${tint[1]*255},${tint[2]*255},${tint[3]})`;
  background.fillRect(0, 0, bounds.width, bounds.height);
  const ctx = surface.getContext('2d');
  ctx.scale(ratio, ratio);
  const opacity = element => {
    let value = 1;
    for (let node = element; node instanceof Element; node = node.parentElement) {
      value *= Number(getComputedStyle(node).opacity);
    }
    return value;
  };
  for (const element of elements) {
    const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
    const x = rect.left-bounds.left, y = rect.top-bounds.top;
    const patch = document.createElement('canvas');
    patch.width = Math.ceil(rect.width*ratio);
    patch.height = Math.ceil(rect.height*ratio);
    const paint = patch.getContext('2d');
    paint.scale(ratio, ratio);
    const radius = Math.min(parseFloat(style.borderTopLeftRadius) || 0, rect.width/2, rect.height/2);
    paint.beginPath();
    paint.roundRect(0, 0, rect.width, rect.height, radius);
    paint.clip();
    const blur = Number((style.backdropFilter || style.webkitBackdropFilter || '').match(/blur\(([\d.]+)px\)/)?.[1]) || 0;
    const padding = Math.ceil(blur*3);
    paint.filter = blur ? `blur(${blur}px)` : 'none';
    paint.drawImage(backdrop, (x-padding)*ratio, (y-padding)*ratio,
      (rect.width+padding*2)*ratio, (rect.height+padding*2)*ratio,
      -padding, -padding, rect.width+padding*2, rect.height+padding*2);
    paint.filter = 'none';
    paint.fillStyle = style.backgroundColor;
    paint.fillRect(0, 0, rect.width, rect.height);
    const border = parseFloat(style.borderTopWidth) || 0;
    if (border && style.borderTopStyle !== 'none') {
      paint.lineWidth = border;
      paint.strokeStyle = style.borderTopColor;
      paint.beginPath();
      paint.roundRect(border/2, border/2, rect.width-border, rect.height-border, Math.max(0,radius-border/2));
      paint.stroke();
    }
    if (element instanceof HTMLInputElement) {
      const placeholder = getComputedStyle(element, '::placeholder');
      const text = element.value || element.placeholder;
      const left = (parseFloat(style.paddingLeft)||0)+border;
      const right = (parseFloat(style.paddingRight)||0)+border;
      paint.save();
      paint.beginPath();
      paint.rect(left, border, Math.max(0,rect.width-left-right), rect.height-border*2);
      paint.clip();
      paint.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      paint.textBaseline = 'alphabetic';
      paint.fillStyle = element.value ? style.color : placeholder.color;
      paint.globalAlpha = element.value ? 1 : Number(placeholder.opacity);
      if ('letterSpacing' in paint) paint.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
      const metrics = paint.measureText('Mg');
      const ascent = metrics.fontBoundingBoxAscent ?? parseFloat(style.fontSize)*.8;
      const descent = metrics.fontBoundingBoxDescent ?? parseFloat(style.fontSize)*.2;
      paint.fillText(text, left-element.scrollLeft, (rect.height-ascent-descent)/2+ascent);
      paint.restore();
    }
    const images = (element instanceof HTMLInputElement ? element.parentElement : element).querySelectorAll('img');
    for (const icon of images) {
      const iconStyle = getComputedStyle(icon), iconRect = icon.getBoundingClientRect();
      if (!iconRect.width || !iconRect.height || iconStyle.visibility !== 'visible') continue;
      await icon.decode();
      paint.save();
      paint.globalAlpha = Number(iconStyle.opacity);
      paint.filter = iconStyle.filter;
      paint.translate(iconRect.left-rect.left+iconRect.width/2, iconRect.top-rect.top+iconRect.height/2);
      const matrix = new DOMMatrixReadOnly(iconStyle.transform === 'none' ? undefined : iconStyle.transform);
      paint.rotate(Math.atan2(matrix.b, matrix.a));
      const iconWidth = parseFloat(iconStyle.width), iconHeight = parseFloat(iconStyle.height);
      paint.drawImage(icon, -iconWidth/2, -iconHeight/2, iconWidth, iconHeight);
      paint.restore();
    }
    ctx.save();
    ctx.globalAlpha = opacity(element);
    ctx.drawImage(patch, 0, 0, rect.width*ratio, rect.height*ratio, x, y, rect.width, rect.height);
    ctx.restore();
    surface.controlCount++;
  }
  return surface;
}

// Keep title motion independent from the captured search and view controls.
async function captureForeground(target, {includeHidden = false, backgroundSource} = {}) {
  const bounds = target.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  const surface = document.createElement('canvas');
  surface.width = Math.max(1, Math.round(bounds.width * ratio));
  surface.height = Math.max(1, Math.round(bounds.height * ratio));
  const ctx = surface.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.translate(-bounds.left, -bounds.top);
  let textRuns = 0;
  const selectors = '.project-dial-item.is-active .project-dial-title, .project-info, .title-section .project-title, .desktop-slide-description';
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
  const decodeSvg = async svg => {
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], {type:'image/svg+xml'}));
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      return image;
    } finally { URL.revokeObjectURL(url); }
  };
  const icon = document.querySelector('.project-dial-item.is-active .project-dial-icon svg');
  let iconCount = 0;
  if (icon && (includeHidden || getComputedStyle(icon).visibility !== 'hidden')) {
    const rect = icon.getBoundingClientRect();
    if (rect.width && rect.height) {
      const copy = icon.cloneNode(true);
      copy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      copy.setAttribute('width', String(rect.width));
      copy.setAttribute('height', String(rect.height));
      const image = await decodeSvg(copy);
      // Capture the complete icon alongside the title, with no fragment motion.
      textLayer.getContext('2d').drawImage(image,
        (rect.left-bounds.left)*ratio, (rect.top-bounds.top)*ratio,
        rect.width*ratio, rect.height*ratio);
      iconCount = 1;
    }
  }
  const source = backgroundSource || getComputedStyle(target).backgroundImage.match(/^url\(["']?(.*?)["']?\)$/)?.[1];
  surface.controls = await captureControls(bounds, ratio, source);
  surface.codeContent = {textRuns, iconCount, controlCount:surface.controls.controlCount};
  const ease = (a, b, value) => {
    const t = Math.max(0, Math.min(1, (value-a)/(b-a)));
    return t*t*t*(t*(t*6-15)+10);
  };
  surface.renderCodeFrame = (progress, incoming, direction) => {
    const copyPhase = incoming ? 1-ease(.66,.92,progress) : ease(.48,.70,progress);
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,surface.width,surface.height);
    ctx.globalAlpha = 1-copyPhase;
    ctx.drawImage(textLayer, (incoming?1:-1)*direction*72*ratio*copyPhase, 0);
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
    overlay.style.zIndex = String(Number.isFinite(z) && z > 1 ? z - 1 : 999);
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
    // Reuse the cached title and complete icon throughout the code transition.
    for (const [source, value, incoming] of [[job.contentSource,job.content,false],[job.nextSource,job.nextContent,true]]) {
      if (!source?.renderCodeFrame || progress === job.paintedProgress) continue;
      source.renderCodeFrame(progress,incoming,job.direction);
      gl.bindTexture(gl.TEXTURE_2D,value);
      gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,gl.RGBA,gl.UNSIGNED_BYTE,source);
      overlay.dataset[incoming?'incomingMotion':'outgoingMotion']=source.codeContent.copyMotion.toFixed(3);
    }
    job.paintedProgress=progress;
    [job.a, job.b, atlas, job.content, job.nextContent, job.controls, job.nextControls].forEach((value, index) => {
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
    gl.uniform1i(uniforms.controls, 5);
    gl.uniform1i(uniforms.nextControls, 6);
    gl.uniform2f(uniforms.sizeA, job.from.naturalWidth, job.from.naturalHeight);
    gl.uniform2f(uniforms.sizeB, job.to.naturalWidth, job.to.naturalHeight);
    gl.uniform4fv(uniforms.sceneTint, job.sceneTint);
    gl.uniform1f(uniforms.progress, progress);
    gl.uniform1f(uniforms.codeTime, job.codeTime);
    gl.uniform1f(uniforms.direction, job.direction);
    gl.uniform1f(uniforms.cellSize, Math.max(8, Number(options.cellSize) || 12));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
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
    gl?.deleteTexture(previous.controls);
    gl?.deleteTexture(previous.nextControls);
    if (success) completed++;
    previous.resolve(success);
  }
  function tick(now) {
    if (!job) return;
    if (job.preparing) { job.last=now; frame=requestAnimationFrame(tick); return; }
    const dt = Math.min(now - job.last, 48);
    job.last = now;
    job.codeTime += dt / 1000;
    const duration = Math.max(300, Number(options.durationMs) || 1400);
    job.elapsed += dt;
    const progress = Math.min(1, job.elapsed / duration);
    try {
      // Capture the incoming controls before the narrow band reaches the viewport.
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
              gl.deleteTexture(active.nextControls);
              active.nextControls=texture(content.controls || document.createElement('canvas'));
              active.nextSource=content;
              active.paintedProgress=null;
              overlay.dataset.incomingText=String(content.codeContent?.textRuns || 0);
              overlay.dataset.incomingIcons=String(content.codeContent?.iconCount || 0);
              overlay.dataset.incomingControls=String(content.codeContent?.controlCount || 0);
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
  async function transition({direction = 1, swap, from, to, target, foreground = null}) {
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
      sources = await Promise.all([prepare(from), prepare(to), prepareIconAtlas()]);
      if (current !== generation) return false;
      if (!initGL(sources[2])) return withoutCanvas();
    } catch (error) {
      if (current !== generation) return false;
      console.warn('[ProjectASCII] Image/WebGL unavailable; using the original image.', error);
      return withoutCanvas();
    }
    return new Promise(resolve => {
      job = {direction: Math.sign(direction) || 1, swap, target, resolve,
        codeTime: 0,
        sceneTint: readSceneTint(),
        from: sources[0], to: sources[1], swapped: false, elapsed: 0, last: performance.now()};
      try {
        job.a = texture(job.from);
        job.b = texture(job.to);
        const content = foreground || document.createElement('canvas');
        job.content = texture(content);
        job.contentSource = content;
        job.nextContent = texture(document.createElement('canvas'));
        job.controls = texture(content.controls || document.createElement('canvas'));
        job.nextControls = texture(content.controls || document.createElement('canvas'));
        overlay.dataset.incomingText = '0';
        overlay.dataset.incomingIcons = '0';
        overlay.dataset.incomingControls = '0';
        overlay.dataset.foregroundText = String(content.codeContent?.textRuns || 0);
        overlay.dataset.foregroundIcons = String(content.codeContent?.iconCount || 0);
        overlay.dataset.foregroundControls = String(content.codeContent?.controlCount || 0);
        paint(0);
        overlay.dataset.phase = 'covering';
        overlay.classList.add('is-active');
        document.documentElement.classList.add('project-wave-running');
        frame = requestAnimationFrame(tick);
      } catch (error) {
        console.warn('[ProjectASCII]', error);
        swap();
        finish(true);
      }
    });
  }
  function cancel() { generation++; finish(false); }
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
    ready: Promise.resolve(), prepare, captureForeground, transition, cancel,
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
            let engine=null,phase='idle',pending=null,request=0,disabled=false,disposed=false;
            let wheelTotal=0,lastWheel=0,searchFrame=0,wheelLocked=false,wheelDirection=0;
            let wanted=null,wantedDirection=1,loading=false,prepared=null;
            let initial=true,stoppedLenis=null;
            const root=document.documentElement;

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

            // 선택된 프로젝트의 완성된 SVG만 제목 옆에 표시합니다.
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
            const iconLoads=projectDialItems.map(async item=>{
                const projectId=String(item.dataset.projectId),file=projectIconFiles[projectId];
                const title=item.querySelector('.project-dial-title');
                if(!file||!title)return;
                const slot=document.createElement('span');
                slot.className='project-dial-icon';slot.setAttribute('aria-hidden','true');
                title.after(slot);item.classList.add('has-project-icon');
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
            html[data-project-fluid-view="slide"],html[data-project-fluid-view="slide"] body { overflow:hidden; }

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

            .project-dial.has-project-icons {
                --project-dial-icon-size:clamp(20px,2.1vw,32px);
                --project-dial-icon-gap: 1rem;
                --project-dial-title-duration:800ms;
            }
            .container:has(#slideview:not([hidden])) .project-dial.has-project-icons {
                width:min(
                    calc(36vw + var(--project-dial-icon-size) + var(--project-dial-icon-gap)),
                    calc(100vw - 12rem)
                );
            }
            .project-dial-item.has-project-icon {
                gap:var(--project-dial-icon-gap);
            }
            .project-dial-icon {
                display:block;
                flex:0 0 var(--project-dial-icon-size);
                width:var(--project-dial-icon-size);
                height:var(--project-dial-icon-size);
                max-width:none;
                transform:translateY(-1.25rem);
                visibility:hidden;
                pointer-events:none;
            }
            .project-dial-icon svg { display:block; width:100%; height:100%; }
            .project-dial-icon svg,
            .project-dial-icon svg * { animation:none!important; transition:none!important; }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active.is-icon-loaded .project-dial-icon {
                visibility:visible;
            }
            /* 제목의 자리와 행 높이를 유지해 다이얼이 흔들리지 않게 합니다. */
            html[data-project-fluid-view="slide"] .project-dial-title {
                display:block;
                visibility:hidden;
                opacity:0;
                clip-path:inset(0 100% 0 0);
                animation:none;
            }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active:not(.has-project-icon) .project-dial-title,
            html[data-project-fluid-view="slide"] .project-dial-item.is-active.is-icon-loaded .project-dial-title {
                visibility:visible;
                opacity:1;
                clip-path:inset(0 0 0 0);
                animation:project-dial-title-reveal var(--project-dial-title-duration,800ms) cubic-bezier(.22,1,.36,1) both;
            }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active.has-project-icon.is-icon-loaded .project-dial-title {
                animation-delay:var(--project-dial-title-delay,0ms);
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
                html[data-project-fluid-view="slide"] .project-dial-item.is-active:not(.has-project-icon) .project-dial-title,
                html[data-project-fluid-view="slide"] .project-dial-item.is-active.has-project-icon.is-icon-loaded .project-dial-title {
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

                const dialRect=projectDial.getBoundingClientRect();
                const centerInsideDial=window.innerHeight/2-dialRect.top;
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
            function clearTransition(){
                root.classList.remove('project-ascii-content-ready');
                window.ProjectWave.cancel();
                root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                request++;
                wanted=null;prepared=null;loading=false;phase='idle';pending=null;
                wheelTotal=0;lastWheel=0;wheelLocked=false;wheelDirection=0;
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
                if (disposed || slideview.hidden || !cards[next] || cards[next].hidden) return;
                if (next === index || phase !== 'idle') return;
                if (reduce.matches) { jump(next); return; }
                const current = ++request;
                wanted = next;
                loading = true;
                phase = 'loading';
                try {
                    await Promise.all([window.ProjectWave.ready, loadImage(getSource(cards[next])), ...iconLoads]);
                    if (current !== request || disposed || slideview.hidden || cards[next].hidden) return;
                    const foreground=await captureAsciiContent(cards[index]);
                    if(current!==request||disposed||slideview.hidden||cards[next].hidden)return;
                    loading=false;
                    phase = 'animating';
                    const finished = await window.ProjectWave.transition({
                        direction,
                        from: getSource(cards[index]),
                        to: getSource(cards[next]),
                        target: cards[index],
                        foreground,
                        swap() {
                            root.classList.add('project-wave-text-pending');
                            root.classList.remove('project-wave-text-enter', 'project-wave-text-exit');
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
                        root.classList.remove('project-wave-text-pending','project-wave-text-exit','project-wave-text-enter');
                        markActive(index,true);
                        updateSlideInfo(cards[index].dataset.projectId,false);
                    }
                    if (finished && current === request && !disposed && !slideview.hidden) {
                        root.classList.remove('project-wave-text-pending','project-wave-text-enter','project-wave-text-exit');
                        forceTextVisible();
                    }
                } catch (error) {
                    if (current === request && !disposed) {
                        root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                        console.error('[Project wave transition]', error);
                        markActive(next, true, direction);
                        updateSlideInfo(cards[next].dataset.projectId, false);
                    }
                } finally {
                    if (current === request) {
                        wanted = null;
                        phase = 'idle';
                        loading = false;
                        wheelTotal = 0;
                        warm();
                    }
                }
            }
            function navigate(direction){
                if (phase !== 'idle') return;
                if(
                    root.classList.contains('project-intro-pending') ||
                    root.classList.contains('project-intro-running')
                ) return;

                const list=visibleCards();if(!list.length||slideview.hidden)return;
                const at=list.indexOf(cards[wanted??index]);
                const next=at<0?list[0]:list[at+direction];
                if(next)transitionTo(cards.indexOf(next),direction);
            }
// Resolve the real DOM underneath the canvas to the incoming texture's final pose.
function captureAsciiContent(target, options = {}) {
    return window.ProjectASCII.captureForeground(target,{...options,backgroundSource:getSource(target)});
}

function settleAsciiContent() {
    root.classList.remove('project-wave-text-enter','project-wave-text-exit');
    root.classList.add('project-ascii-content-ready');
}

            function currentLenis(){
                // The supplied HTML declares `const lenis` at window scope (not window.lenis).
                try{return typeof lenis!=='undefined'?lenis:window.lenis;}catch{return window.lenis;}
            }
            function changeView(view){
                if(view!=='grid'&&view!=='slide')return;

                const wasSlide=!slideview.hidden;

                clearTransition();
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

                    if(stoppedLenis){
                        stoppedLenis.start();
                        stoppedLenis=null;
                    }
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
                        true
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

                if(view==='slide'){
                    queueMicrotask(warm);
                }
            }
            function reconcileSearch(){
                if(disposed)return;
                const list=visibleCards();
                if(!list.length){clearTransition();return;}
                if(engine?.nodes.some(n=>[n.from,n.to].some(f=>!list.some(c=>c.dataset.projectId===f.id)))){jump(list.includes(cards[index])?index:cards.indexOf(list[0]));return;}
                if(!list.includes(cards[index]))jump(cards.indexOf(list[0]));
                else if(wanted!==null&&!list.includes(cards[wanted])){wanted=null;prepared=null;loading=false;request++;warm();}
            }
            listen(document,'project-search-change',event=>{
                // The existing filter sets card.hidden and publishes visibleIds.
                const raw=event.detail?.visibleIds;
                if(Array.isArray(raw)){
                    const ids=new Set(raw.map(String));
                    const allowed=cards.filter(c=>ids.has(String(c.dataset.projectId)));
                    if(!allowed.length){clearTransition();return;}
                    if(!allowed.includes(cards[index]))jump(cards.indexOf(allowed[0]));
                    else if(wanted!==null&&!allowed.includes(cards[wanted])){wanted=null;prepared=null;loading=false;request++;warm();}
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
                const newGesture=now-lastWheel>wheelOption('wheelGestureGap',180,80,1000)
                    || direction!==wheelDirection;
                if(newGesture){wheelTotal=0;wheelLocked=false;}
                lastWheel=now;
                wheelDirection=direction;
                // Drop input during a transition, including its inertial tail.
                // A new gesture after settling can trigger one full animation.
                if(phase!=='idle'||loading||root.classList.contains('project-intro-pending')
                    ||root.classList.contains('project-intro-running')){
                    wheelTotal=0;wheelLocked=true;return;
                }
                if(wheelLocked)return;
                const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
                wheelTotal+=delta*unit;
                const threshold=wheelOption('wheelThreshold',90,1,500);
                if(Math.abs(wheelTotal)>=threshold){
                    wheelTotal=0;
                    navigate(direction);
                    // Set after navigate: reduced motion may synchronously reset state.
                    wheelLocked=true;
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
                syncFluidSurfaceBounds(cards[wanted??index]||cards[index]);

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
            markActive(index,true);changeView('slide');
            window.ProjectFluidSlide={
                next:()=>navigate(1),prev:()=>navigate(-1),
                goTo(projectId){const next=cards.findIndex(c=>String(c.dataset.projectId)===String(projectId));if(next>=0)void transitionTo(next,next<index?-1:1);},
                setOptions(options){Object.assign(settings,options);engine?.setOptions(options);if(engine&&!slideview.hidden)engine.resize();},
                changeView,
                get state(){return {
                    view:slideview.hidden?'grid':'slide',phase,index,projectId:cards[index]?.dataset.projectId,
                    pendingId:wanted===null?null:cards[wanted]?.dataset.projectId,loading,disabled,
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
                    projectDial?.classList.remove('has-project-icons');
                    observer.disconnect();events.abort();engine?.destroy();engine=null;host.remove();style.remove();
                    if(stoppedLenis)stoppedLenis.start();
                    if(originalView===null)root.removeAttribute('data-project-fluid-view');else root.setAttribute('data-project-fluid-view',originalView);
                    delete window.ProjectFluidSlide;
                }
            };
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
