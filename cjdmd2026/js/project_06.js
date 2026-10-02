/* Project slide variant: horizontal SVG mask blinds (Codrops-inspired independent variant).
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
.project-blinds canvas { display: block; width: 100%; height: 100%; }
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
html[data-project-fluid-view="slide"].project-blinds-content-ready :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) { animation:none !important; transform:none !important; clip-path:none !important; opacity:1 !important; }
`;
    document.head.append(waveStyle);

/* Build input for project-blinds-transition.js. Not an additional browser include. */
/* Horizontal SVG blinds, independently adapted from the Codrops reference.
 * https://tympanus.net/Tutorials/SVGMaskScrollTransition/
 * Build input only; deploy project_06.js.
 */
(() => {
  'use strict';
  const options={durationMs:1100,contentDurationMs:2200,blindCount:30,...window.PROJECT_BLINDS_OPTIONS};
  const blindDuration=Math.max(500,Number(options.durationMs)||1100);
  const contentDuration=Math.max(500,Number(options.contentDurationMs)||2200);
  const totalDuration=Math.max(blindDuration,contentDuration);
  const ns='http://www.w3.org/2000/svg';
  const svgNode=(name,attributes={})=>{
    const node=document.createElementNS(ns,name);
    for(const [key,value] of Object.entries(attributes))node.setAttribute(key,value);
    return node;
  };
  const overlay=document.createElement('div');
  overlay.className='project-wave project-blinds';
  overlay.setAttribute('aria-hidden','true');
  const svg=svgNode('svg',{preserveAspectRatio:'none',width:'100%',height:'100%'});
  svg.style.cssText='display:block;width:100%;height:100%';
  overlay.append(svg);
  document.body.append(overlay);
  const maskId=`project-blinds-${Math.random().toString(36).slice(2)}`;
  const defs=svgNode('defs');
  const mask=svgNode('mask',{id:maskId,maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:0,y:0});
  mask.style.maskType='luminance';
  defs.append(mask);
  svg.append(defs);
  const count=Math.max(8,Math.min(60,Math.round(Number(options.blindCount)||30)));
  const slits=Array.from({length:count},()=>{
    const pair=[svgNode('rect',{fill:'white','shape-rendering':'crispEdges'}),svgNode('rect',{fill:'white','shape-rendering':'crispEdges'})];
    mask.append(...pair);
    return pair;
  });
  const makeLayer=masked=>{
    const foreign=svgNode('foreignObject',{x:0,y:0});
    const canvas=document.createElement('canvas');
    canvas.style.cssText='display:block;width:100%;height:100%';
    foreign.append(canvas);
    if(masked)foreign.setAttribute('mask',`url(${location.href.split('#')[0]}#${maskId})`);
    svg.append(foreign);
    return {foreign,canvas,context:canvas.getContext('2d')};
  };
  const oldLayer=makeLayer(false),newLayer=makeLayer(true);
  const leftLayer=makeLayer(false);
  leftLayer.canvas.dataset.blindsLeft='true';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const cache=new Map();
  let job=null,frame=0,generation=0,completed=0;
  const clamp=t=>Math.max(0,Math.min(1,t));
  const ease=t=>{t=clamp(t);return t*t*t*(t*(t*6-15)+10);};
  async function prepare(source){
    const url=new URL(source,document.baseURI).href;
    if(!cache.has(url)){
      const image=new Image();
      image.crossOrigin='anonymous';image.src=url;
      const promise=image.decode().then(()=>image);
      cache.set(url,promise);
      promise.catch(()=>cache.delete(url));
      while(cache.size>4)cache.delete(cache.keys().next().value);
    }
    return cache.get(url);
  }
  function readTint(){
    const element=document.querySelector('.gradient');
    if(!element||!element.getClientRects().length)return null;
    const style=getComputedStyle(element);
    return style.visibility==='visible'?{color:style.backgroundColor,opacity:Number(style.opacity)}:null;
  }
  function paintLayer(layer,image,content,incoming,w,h,ratio){
    const canvas=layer.canvas,ctx=layer.context;
    const width=Math.max(1,Math.round(w*ratio)),height=Math.max(1,Math.round(h*ratio));
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
    layer.foreign.setAttribute('width',w);layer.foreign.setAttribute('height',h);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    ctx.clearRect(0,0,w,h);
    const scale=Math.max(w/image.naturalWidth,h/image.naturalHeight);
    const iw=image.naturalWidth*scale,ih=image.naturalHeight*scale;
    ctx.drawImage(image,(w-iw)/2,(h-ih)/2,iw,ih);
    if(job.tint){ctx.save();ctx.globalAlpha=job.tint.opacity;ctx.fillStyle=job.tint.color;ctx.fillRect(0,0,w,h);ctx.restore();}
    if(content){
      // Ambient pieces keep flowing; each scene's title and assembled icon stay in place.
      content.renderCodeFrame?.(incoming?1:0,incoming,job.direction);
      ctx.drawImage(content,0,0,w,h);
    }
  }
  function paint(progress){
    if(!job)return;
    const maskProgress=clamp(progress*totalDuration/blindDuration);
    const contentProgress=clamp(progress*totalDuration/contentDuration);
    const r=job.target.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);
    const header=document.querySelector('.header');
    const z=parseInt(header?getComputedStyle(header).zIndex:'1000',10);
    Object.assign(overlay.style,{left:`${r.left}px`,top:`${r.top}px`,width:`${w}px`,height:`${h}px`,zIndex:String(Number.isFinite(z)&&z>1?z-1:999)});
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    mask.setAttribute('width',w);mask.setAttribute('height',h);
    const ratio=Math.min(devicePixelRatio||1,1.5);
    paintLayer(oldLayer,job.from,job.foreground,false,w,h,ratio);
    if(job.incoming)paintLayer(newLayer,job.to,job.incoming,true,w,h,ratio);
    // Project copy and icon pieces form an unmasked foreground above both scenes.
    const leftCanvas=leftLayer.canvas,leftContext=leftLayer.context;
    const width=Math.max(1,Math.round(w*ratio)),height=Math.max(1,Math.round(h*ratio));
    if(leftCanvas.width!==width||leftCanvas.height!==height){leftCanvas.width=width;leftCanvas.height=height;}
    leftLayer.foreign.setAttribute('width',w);leftLayer.foreign.setAttribute('height',h);
    leftContext.setTransform(ratio,0,0,ratio,0,0);
    leftContext.clearRect(0,0,w,h);
    const handoff=job.incoming?ease((contentProgress-.38)/.12):0;
    for(const [content,incoming,opacity] of [[job.foreground?.leftLayer,false,1-handoff],[job.incoming?.leftLayer,true,handoff]]){
      if(!content||opacity===0)continue;
      content.renderCodeFrame(contentProgress,incoming,job.direction);
      leftContext.globalAlpha=opacity;
      leftContext.drawImage(content,0,0,w,h);
    }
    leftContext.globalAlpha=1;
    const band=h/count;
    slits.forEach((pair,i)=>{
      const row=job.direction>0?count-1-i:i;
      const center=(row+.5)*band;
      pair.forEach((rect,side)=>{
        const delay=(i*2+side)/(count*2-1)*.36;
        const open=ease((maskProgress-delay)/.64);
        const size=open*(band/2+.5);
        rect.setAttribute('x',0);rect.setAttribute('width',w);
        rect.setAttribute('y',side?center:center-size);
        rect.setAttribute('height',size);
      });
    });
    overlay.dataset.progress=progress.toFixed(3);
    overlay.dataset.maskProgress=maskProgress.toFixed(3);
    overlay.dataset.contentProgress=contentProgress.toFixed(3);
  }
  function finish(success){
    cancelAnimationFrame(frame);frame=0;
    const previous=job;job=null;
    overlay.classList.remove('is-active');overlay.dataset.phase='idle';
    document.documentElement.classList.remove('project-wave-running');
    if(success)completed++;
    previous?.resolve(success);
  }
  function tick(now){
    if(!job)return;
    const dt=Math.min(48,now-job.last);job.last=now;
    if(job.preparing){paint(0);frame=requestAnimationFrame(tick);return;}
    const duration=totalDuration,s=job.scrub;
    if(s&&!s.committed){
      if(now-s.lastInput>=s.returnDelay){
        if(job.returnStarted==null){job.returnStarted=now;job.returnFrom=job.progress;}
        const t=clamp((now-job.returnStarted)/s.returnDuration);
        job.progress=job.returnFrom*(1-ease(t));
        s.progress=job.progress;s.distance=s.progress*s.distanceScale;
        overlay.dataset.phase='returning';
        if(t===1){paint(0);finish(false);return;}
      }else{
        if(job.returnStarted!=null||job.goal!==s.progress){job.start=job.progress;job.goal=s.progress;job.followTime=now;job.returnStarted=null;}
        const t=clamp((now-job.followTime)/160);
        job.progress=job.start+(job.goal-job.start)*ease(t);
        overlay.dataset.phase='scrubbing';
        if(t===1&&s.progress===0){paint(0);finish(false);return;}
      }
    }else{job.progress=clamp(job.progress+dt/duration);overlay.dataset.phase='revealing';}
    paint(job.progress);
    if(job.progress===1){job.swap();finish(true);return;}
    frame=requestAnimationFrame(tick);
  }
  async function transition({direction=1,swap,preview,from,to,target,scrub=null,foreground=null}){
    if(job)return false;
    const current=++generation;
    if(reduced.matches){await swap();return true;}
    let images;
    try{images=await Promise.all([prepare(from),prepare(to)]);}
    catch(error){
      console.warn('[ProjectBlinds] Image unavailable',error);
      return false;
    }
    if(current!==generation)return false;
    if(reduced.matches){await swap();return true;}
    return new Promise(resolve=>{
      const active=job={direction:Math.sign(direction)||1,swap,target,scrub,foreground,resolve,
        from:images[0],to:images[1],tint:readTint(),progress:0,last:performance.now(),preparing:true};
      paint(0);overlay.classList.add('is-active');overlay.dataset.phase='preparing';
      document.documentElement.classList.add('project-wave-running');
      frame=requestAnimationFrame(tick);
      Promise.resolve().then(()=>preview?.()).then(content=>{
        if(job!==active)return;
        active.incoming=content || document.createElement('canvas');
        active.preparing=false;active.last=performance.now();
        overlay.dataset.incomingControls=String(content?.codeContent?.controlCount||0);
        overlay.dataset.incomingIcons=String(content?.codeContent?.iconCount||0);
        overlay.dataset.leftIcons=String(content?.leftLayer?.codeContent?.iconCount||0);
        if(active.skipMotion){active.swap();finish(true);}
      }).catch(error=>{console.error('[ProjectBlinds]',error);if(job===active)finish(false);});
    });
  }
  function cancel(){generation++;finish(false);}
  reduced.addEventListener('change',()=>{
    if(!reduced.matches||!job)return;
    if(job.scrub&&!job.scrub.committed){finish(false);return;}
    if(job.preparing){job.skipMotion=true;return;}
    job.swap();finish(true);
  });
  window.ProjectWave=window.ProjectBlinds=Object.freeze({ready:Promise.resolve(),prepare,captureForeground,transition,cancel,
    get state(){return {busy:!!job,phase:overlay.dataset.phase||'idle',completed,progress:Number(overlay.dataset.progress||0),maskProgress:Number(overlay.dataset.maskProgress||0),contentProgress:Number(overlay.dataset.contentProgress||0)};}});
// Build input: capture the project foreground and controls, excluding the header.
const asciiControlImages = new Map();
async function captureProjectControls(bounds, ratio) {
  const layer = document.createElement('canvas');
  layer.width = Math.max(1,Math.round(bounds.width*ratio));
  layer.height = Math.max(1,Math.round(bounds.height*ratio));
  const context = layer.getContext('2d');
  context.scale(ratio,ratio);
  context.translate(-bounds.left,-bounds.top);
  const root = document.querySelector('.project-description .project-warp');
  const visible = element => {
    const rect=element.getBoundingClientRect(), style=getComputedStyle(element);
    return rect.width>0 && rect.height>0 && style.visibility==='visible' && Number(style.opacity)>0;
  };
  let count=0;
  if (root && visible(root)) {
    for (const element of root.querySelectorAll('input,button')) {
      if (!visible(element)) continue;
      const rect=element.getBoundingClientRect(), style=getComputedStyle(element);
      const border=parseFloat(style.borderTopWidth)||0;
      const radius=Math.min(parseFloat(style.borderTopLeftRadius)||0,rect.width/2,rect.height/2);
      context.save();
      context.globalAlpha=Number(style.opacity);
      context.beginPath();
      context.roundRect(rect.left+border/2,rect.top+border/2,rect.width-border,rect.height-border,Math.max(0,radius-border/2));
      context.fillStyle=style.backgroundColor;
      context.fill();
      if (border) {
        context.strokeStyle=style.borderTopColor;
        context.lineWidth=border;
        context.stroke();
      }
      if (element.matches('input')) {
        context.clip();
        const text=element.value || element.placeholder;
        const textStyle=element.value?style:getComputedStyle(element,'::placeholder');
        context.globalAlpha*=Number(textStyle.opacity);
        context.font=`${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        context.fillStyle=textStyle.color;
        context.textBaseline='middle';
        context.fillText(text,rect.left+border+parseFloat(style.paddingLeft)-element.scrollLeft,rect.top+rect.height/2);
      }
      context.restore();
      count++;
    }
    // Draw images after the input surfaces: the search symbol overlays its input.
    for (const element of root.querySelectorAll('img')) {
      if (!visible(element)) continue;
      const url=element.currentSrc || element.src;
      if (!asciiControlImages.has(url)) {
        const image=new Image();
        image.crossOrigin='anonymous';
        image.src=url;
        const promise=image.decode().then(()=>image);
        asciiControlImages.set(url,promise);
        promise.catch(()=>asciiControlImages.delete(url));
      }
      const image=await asciiControlImages.get(url);
      const rect=element.getBoundingClientRect(), style=getComputedStyle(element);
      context.save();
      context.globalAlpha=Number(style.opacity);
      context.filter=style.filter;
      context.drawImage(image,rect.left,rect.top,rect.width,rect.height);
      context.restore();
    }
  }
  layer.controlCount=count;
  return layer;
}

async function captureBlindsLayer(target, {includeHidden = false, iconMotion = [], leftOnly = false} = {}) {
  if (!leftOnly) iconMotion=[];
  const bounds = target.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  const controls = leftOnly ? document.createElement('canvas') : await captureProjectControls(bounds,ratio);
  const surface = document.createElement('canvas');
  surface.width = Math.max(1, Math.round(bounds.width * ratio));
  surface.height = Math.max(1, Math.round(bounds.height * ratio));
  const ctx = surface.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.translate(-bounds.left, -bounds.top);
  let textRuns = 0;
  const selectors = leftOnly ? '.project-dial-item.is-active .project-dial-title, .title-section .project-title, .project-info, .desktop-slide-description' : ':not(*)';
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
  const icons = leftOnly ? document.querySelector('.project-icon-field') : null;
  let fieldImage = null, fieldRect = null, pieceAtlas = null;
  let iconCount = 0;
  if (icons && getComputedStyle(icons).visibility !== 'hidden') {
    const rect = icons.getBoundingClientRect();
    if (rect.width && rect.height) {
      const copy = icons.cloneNode(true);
      copy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      copy.setAttribute('width', String(rect.width));
      copy.setAttribute('height', String(rect.height));
      copy.removeAttribute('class');
      copy.removeAttribute('style');
      iconCount = copy.querySelectorAll('[data-piece]').length;
      // Rasterize all moving pieces once into an atlas, never serialize SVG per frame.
      if (iconMotion.length) {
        const movingGroups = new Set(iconMotion.map(piece=>piece.node.parentElement.dataset.projectId));
        [...copy.children].filter(group=>movingGroups.has(group.dataset.projectId)).forEach(group=>group.remove());
        const sheet = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sheet.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        sheet.setAttribute('width', String(128 * Math.min(16,iconMotion.length)));
        sheet.setAttribute('height', String(128 * Math.ceil(iconMotion.length/16)));
        iconMotion.forEach((piece, i) => {
          const tile = document.createElementNS(sheet.namespaceURI, 'svg');
          const size = piece.size + 4;
          tile.setAttribute('x', String((i%16) * 128));
          tile.setAttribute('y', String(Math.floor(i/16) * 128));
          tile.setAttribute('width', '128');
          tile.setAttribute('height', '128');
          tile.setAttribute('viewBox', `${-size/2} ${-size/2} ${size} ${size}`);
          const node = piece.node.cloneNode(true);
          node.removeAttribute('transform');
          node.removeAttribute('opacity');
          tile.append(node);
          sheet.append(tile);
        });
        pieceAtlas = await decodeSvg(sheet);
      }
      fieldImage = await decodeSvg(copy);
      fieldRect = rect;
    }
  }
  surface.codeContent = {textRuns, iconCount, controlCount:controls.controlCount};
  surface.hasLiveMotion = iconMotion.some(piece=>piece.readPosition);
  const ease = (a, b, value) => {
    const t = Math.max(0, Math.min(1, (value-a)/(b-a)));
    return t*t*(3-2*t);
  };
  surface.renderCodeFrame = (progress, incoming, direction) => {
    const iconPhase = incoming ? 1-ease(.38,.85,progress) : ease(.08,.42,progress);
    const copyPhase = incoming ? 1-ease(.58,.98,progress) : ease(.10,.42,progress);
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,surface.width,surface.height);
    ctx.globalAlpha = 1-copyPhase;
    ctx.drawImage(textLayer, (incoming?1:-1)*direction*72*ratio*copyPhase, 0);
    ctx.restore();
    if (fieldImage) ctx.drawImage(fieldImage, fieldRect.left, fieldRect.top, fieldRect.width, fieldRect.height);
    const fieldScaleX = fieldRect ? fieldRect.width/innerWidth : 1;
    const fieldScaleY = fieldRect ? fieldRect.height/innerHeight : 1;
    if (pieceAtlas) iconMotion.forEach((piece, i) => {
      const p = {};
      // Small stagger keeps the original SVG fragments distinct during assembly.
      const phase = piece.active===false ? 1 : ease(0,1,Math.max(0,Math.min(1,iconPhase*1.12-(piece.stagger || 0)*.12)));
      const scattered = piece.readPosition ? piece.readPosition() : piece.scattered;
      for (const key of ['x','y','scale','rotation','opacity']) {
        p[key] = piece.assembled[key] + (scattered[key]-piece.assembled[key])*phase;
      }
      ctx.save();
      ctx.translate(fieldRect.left+p.x*fieldScaleX, fieldRect.top+p.y*fieldScaleY);
      ctx.scale(fieldScaleX,fieldScaleY);
      ctx.rotate(p.rotation*Math.PI/180);
      ctx.scale(p.scale,p.scale);
      ctx.globalAlpha = p.opacity;
      const size = piece.size+4;
      ctx.drawImage(pieceAtlas,(i%16)*128,Math.floor(i/16)*128,128,128,-size/2,-size/2,size,size);
      ctx.restore();
    });
    ctx.drawImage(controls,bounds.left,bounds.top,bounds.width,bounds.height);
    surface.codeContent.iconMotion = iconPhase;
    surface.codeContent.copyMotion = copyPhase;
    return surface;
  };
  surface.renderCodeFrame(includeHidden?1:0,includeHidden,1);
  return surface;
}

async function captureForeground(target, options={}) {
  const scene=await captureBlindsLayer(target,options);
  scene.leftLayer=await captureBlindsLayer(target,{...options,leftOnly:true});
  return scene;
}

})();


(function(){
    const PROJECT_FLUID_SETTINGS={
        duration: 1.05,       // 다이얼과 이미지가 비슷한 호흡으로 움직이도록 약간 단축
        overlapAt: 0.58,     // 너무 빠르게 겹치지 않도록 조금 뒤에서 다음 전환 허용
        rgbRelease: 0.18,    // 안전용 잔여값. 실제 Fluid 해제는 wipe 마지막 구간 안에서 끝냄
        rgb: 5,              // RGB를 한 단계 부드럽게
        fluid: 50,          // 세로 전환에서 과한 출렁임을 줄임
        wheelThreshold: 90,  // 미세 휠 입력에 너무 민감하게 반응하지 않도록
        wheelInterval: 120,  // 연속 입력 간 호흡
        pixelRatio: 1.25,
        maxTextureSize: 1920,
        ...window.PROJECT_FLUID_OPTIONS
    };
    // Colored matrix text dissolve replaces the bundled RGB transition.

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
            let wheelTotal=0,lastWheel=0,searchFrame=0,wheelTimer=0,lastStep=-Infinity;
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

            // SVG 조각은 화면 좌표로 움직이고, 조립되면 원본의 좌표/겹침 순서로 돌아갑니다.
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
            // 조립/분산/간격은 ms. flowSpeed와 flowDistance는 흐름의 속도/이동 폭 배율입니다.
            const iconAssemblySettings={
                gatherDuration:700,scatterDuration:650,stagger:120,
                flowSpeed:1,flowDistance:1
            };
            const svgNamespace='http://www.w3.org/2000/svg';
            const svgElement=name=>document.createElementNS(svgNamespace,name);
            const dialIcons=new Map();
            let dialIconProjectId=null,iconFrame=0,iconFieldReady=false;
            let deferIconAssembly=false;
            let iconAssemblyWaiter=null;
            let iconFlowTime=0,iconLastFrame=0,iconFlowBounds=null;
            const iconField=svgElement('svg');
            iconField.classList.add('project-icon-field');
            iconField.setAttribute('aria-hidden','true');
            iconField.setAttribute('focusable','false');
            document.body.appendChild(iconField);

            // 복합 path의 구멍은 바깥 윤곽과 함께 움직여야 합니다.
            // 안쪽 윤곽은 바깥 윤곽과 묶어 fill-rule과 원래 도형을 보존합니다.
            function splitIconShape(shape,measure){
                const clone=()=>{
                    const node=shape.cloneNode(true);
                    node.removeAttribute('id');
                    return node;
                };
                const path=shape.getAttribute('d')||'';
                if(shape.localName!=='path'||/m/.test(path))return [clone()];
                const contours=path.match(/M[^M]+/g)||[];
                if(contours.length<2)return [clone()];
                const groups=contours.map(d=>{
                    const node=clone();node.setAttribute('d',d);measure.appendChild(node);
                    const box=measure.getBBox();node.remove();
                    return {paths:[d],box};
                });
                const contains=(a,b)=>a.x<=b.x+.01&&a.y<=b.y+.01&&
                    a.x+a.width>=b.x+b.width-.01&&a.y+a.height>=b.y+b.height-.01;
                for(let i=0;i<groups.length;i++){
                    for(let j=i+1;j<groups.length;j++){
                        const a=groups[i],b=groups[j];
                        if(!contains(a.box,b.box)&&!contains(b.box,a.box))continue;
                        const x=Math.min(a.box.x,b.box.x),y=Math.min(a.box.y,b.box.y);
                        a.box={x,y,width:Math.max(a.box.x+a.box.width,b.box.x+b.box.width)-x,
                            height:Math.max(a.box.y+a.box.height,b.box.y+b.box.height)-y};
                        a.paths.push(...b.paths);groups.splice(j,1);i=-1;break;
                    }
                }
                return groups.map(group=>{const node=clone();node.setAttribute('d',group.paths.join(''));return node;});
            }

            const iconLoads=projectDialItems.map(async(item,projectOrder)=>{
                const projectId=String(item.dataset.projectId),file=projectIconFiles[projectId];
                const title=item.querySelector('.project-dial-title');
                if(!file||!title)return;
                const slot=document.createElement('span');
                slot.className='project-dial-icon';slot.setAttribute('aria-hidden','true');
                title.before(slot);item.classList.add('has-project-icon');
                const group=svgElement('g');group.dataset.projectId=projectId;iconField.appendChild(group);
                const entry={item,slot,group,pieces:[],projectOrder};
                dialIcons.set(projectId,entry);
                const measureSvg=svgElement('svg'),measure=svgElement('g');
                measureSvg.style.cssText='position:fixed;width:1px;height:1px;visibility:hidden;pointer-events:none';
                measureSvg.setAttribute('aria-hidden','true');measureSvg.appendChild(measure);
                try{
                    const response=await fetch(new URL(file, iconBaseUrl),{signal:events.signal});
                    if(!response.ok)throw new Error(`SVG ${response.status}`);
                    const xml=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
                    if(disposed)return;
                    if(xml.querySelector('parsererror'))throw new Error('Invalid SVG');
                    document.body.appendChild(measureSvg);
                    for(const layer of xml.querySelectorAll('.icon-layer')){
                        for(const source of layer.querySelectorAll('path,polygon,rect,circle,ellipse,polyline')){
                            for(const shape of splitIconShape(source,measure)){
                                measure.appendChild(shape);const box=measure.getBBox();shape.remove();
                                const cx=box.x+box.width/2,cy=box.y+box.height/2;
                                const node=svgElement('g'),centered=svgElement('g');
                                centered.setAttribute('transform',`translate(${-cx} ${-cy})`);
                                centered.appendChild(shape);node.appendChild(centered);group.appendChild(node);
                                node.dataset.piece=String(entry.pieces.length);
                                entry.pieces.push({node,cx,cy,size:Math.max(box.width,box.height,1),current:null,motion:null});
                            }
                        }
                    }
                    if(!entry.pieces.length)throw new Error('Empty SVG');
                }catch(error){
                    if(error.name!=='AbortError')console.warn(`[Project icons] ${file}`,error);
                    group.remove();slot.remove();item.classList.remove('has-project-icon','is-icon-loaded');
                    dialIcons.delete(projectId);
                }finally{measureSvg.remove();}
            });
            if(dialIcons.size)projectDial?.classList.add('has-project-icons');

            const iconMix=(a,b,t)=>a+(b-a)*t;
            const iconEase=t=>1-Math.pow(1-t,3);
            const iconRandom=seed=>{const value=Math.sin(seed*127.1+311.7)*43758.5453;return value-Math.floor(value);};
            function paintIconPiece(piece){
                const p=piece.current;
                piece.node.setAttribute('transform',`translate(${p.x.toFixed(4)} ${p.y.toFixed(4)}) rotate(${p.rotation.toFixed(4)}) scale(${p.scale.toFixed(6)})`);
                if(piece.paintedOpacity!==p.opacity){
                    piece.node.setAttribute('opacity',p.opacity);piece.paintedOpacity=p.opacity;
                }
            }
            function iconFlowRightAt(y){
                const b=iconFlowBounds;
                const vertical=(y-b.arcCenter)/b.arcRadius;
                let right=b.inset+(b.arcRight-b.inset)*Math.sqrt(Math.max(0,1-vertical*vertical));
                const dy=y-b.centerY;
                // 완성된 아이콘 주변을 완만하게 돌아가도록 연속적인 안쪽 경계를 만듭니다.
                const avoid=b.centerX-b.iconClearance+dy*dy/(2*b.iconClearance);
                const blend=Math.max(10-Math.abs(right-avoid),0)/10;
                right=Math.min(right,avoid)-blend*blend*2.5;
                return Math.max(b.inset+.01,right);
            }
            function flowingIconPosition(piece){
                if(reduce.matches||!iconFlowBounds)return {...piece.scattered};
                const b=iconFlowBounds,phase=piece.seed*Math.PI*2;
                const t=iconFlowTime*iconAssemblySettings.flowSpeed;
                const distance=iconAssemblySettings.flowDistance;
                // 삼각함수 좌표로 아치 내부를 순환하므로 경계에서 튕기거나 순간이동하지 않습니다.
                const vertical=piece.flowVertical+distance*(
                    (Math.sin(t*.24+phase)-Math.sin(phase))*28/b.arcRadius+
                    (Math.sin(t*.13+phase*2)-Math.sin(phase*2))*10/b.arcRadius
                );
                const y=b.arcCenter+Math.sin(vertical)*b.arcRadius;
                const horizontal=piece.flowHorizontal+distance*(
                    (Math.sin(t*.29+phase*1.7)-Math.sin(phase*1.7))*.34+
                    (Math.sin(t*.17+phase)-Math.sin(phase))*.12
                );
                const x=b.inset+(iconFlowRightAt(y)-b.inset)*(.5+.5*Math.sin(horizontal));
                return {...piece.scattered,x,y,
                    rotation:piece.scattered.rotation+(Math.sin(t*.22+phase)-Math.sin(phase))*12*distance};
            }
            function requestIconFrame(){
                if(!iconFrame&&iconFieldReady&&!disposed&&!slideview.hidden&&!document.hidden){
                    iconFrame=requestAnimationFrame(drawIconField);
                }
            }
            function layoutIconField(){
                if(!iconFieldReady||slideview.hidden||!projectDial)return;
                const width=innerWidth,height=innerHeight;
                iconField.setAttribute('viewBox',`0 0 ${width} ${height}`);
                // clamp() 변수는 계산 전 문자열이므로 실제 슬롯의 CSS width를 읽습니다.
                const slot=dialIcons.values().next().value?.slot;
                const iconSize=slot?parseFloat(getComputedStyle(slot).width):72;
                const left=projectDial.getBoundingClientRect().left,scale=iconSize/268;
                const centerY=height/2,centerX=left+iconSize/2;
                const pieces=[...dialIcons.values()].flatMap(entry=>entry.pieces);
                // 순서를 섞되 위치는 고정하여 스크롤할 때마다 아치가 뒤바뀌지 않습니다.
                const ranked=[...pieces].sort((a,b)=>a.seed-b.seed);
                // 아치의 테두리가 아니라 왼쪽 가장자리부터 안쪽 면적 전체에 배치합니다.
                const inset=18,arcRight=Math.max(inset+40,left+iconSize-10);
                const arcTop=Math.max(72,height*.085),arcBottom=height-24;
                const arcCenter=(arcTop+arcBottom)/2,arcRadius=(arcBottom-arcTop)/2;
                const iconClearance=iconSize/2+18;
                iconFlowBounds={inset,arcRight,arcCenter,arcRadius,centerX,centerY,iconClearance};
                let candidate=0;
                ranked.forEach((piece,i)=>{
                    let x,y;
                    // 고정된 2차원 수열로 조각들이 특정 선이나 지점에 몰리지 않게 합니다.
                    do{
                        candidate++;
                        x=inset+((.5+candidate*.754877666)%1)*(arcRight-inset);
                        y=arcTop+((.5+candidate*.569840291)%1)*(arcBottom-arcTop);
                    }while(x>iconFlowRightAt(y));
                    piece.scattered={x,y,scale:Math.min(.5,(11+iconRandom(i+31)*12)/piece.size),
                        rotation:(iconRandom(i+73)-.5)*120,opacity:.3+iconRandom(i+101)*.35};
                    const clampUnit=value=>Math.max(-1,Math.min(1,value));
                    piece.flowVertical=Math.asin(clampUnit((y-arcCenter)/arcRadius));
                    piece.flowHorizontal=Math.asin(clampUnit(2*(x-inset)/(iconFlowRightAt(y)-inset)-1));
                    piece.assembled={x:centerX+(piece.cx-120)*scale,y:centerY+(piece.cy-120)*scale,
                        scale,rotation:0,opacity:1};
                    if(!piece.current){piece.current=flowingIconPosition(piece);paintIconPiece(piece);}
                });
                iconField.classList.add('is-ready');
            }
            function finishIconAssembly(){
                if(!iconFieldReady)return;
                const entry=dialIcons.get(dialIconProjectId);
                if(entry&&entry.group.dataset.state!=='assembled'&&!entry.pieces.some(piece=>piece.motion)){
                    entry.group.dataset.state='assembled';
                }
                if(entry&&entry.group.dataset.state==='assembled'&&!entry.item.classList.contains('is-icon-loaded')){
                    entry.item.classList.add('is-icon-loaded');
                }
                const waiter=iconAssemblyWaiter;
                const target=waiter&&dialIcons.get(waiter.id);
                if(waiter&&(!target||target.group.dataset.state===waiter.state)){
                    iconAssemblyWaiter=null;
                    waiter.resolve(true);
                }
            }
            function waitForIconMotion(projectId,state){
                return new Promise(resolve=>{
                    iconAssemblyWaiter={id:String(projectId),state,resolve};
                    finishIconAssembly();
                });
            }
            function drawIconField(now){
                iconFrame=0;
                if(disposed||slideview.hidden||document.hidden){iconLastFrame=0;return;}
                if(iconLastFrame&&!reduce.matches)iconFlowTime+=Math.min((now-iconLastFrame)/1000,.05);
                iconLastFrame=now;
                let moving=false;
                dialIcons.forEach(entry=>{
                    const active=entry.group.dataset.projectId===dialIconProjectId;
                    entry.pieces.forEach(piece=>{
                        const motion=piece.motion;
                        if(!motion){
                            if(!active&&!reduce.matches){piece.current=flowingIconPosition(piece);paintIconPiece(piece);}
                            return;
                        }
                        const t=Math.max(0,Math.min(1,(now-motion.start)/motion.duration));
                        const eased=iconEase(motion.gather?Math.min(1,t/.84):t);
                        // 분산 목적지도 계속 흐르게 하여 도착 직후의 움직임이 이어지게 합니다.
                        const target=motion.gather?motion.to:flowingIconPosition(piece);
                        const p={};
                        for(const key of ['x','y','rotation','opacity'])p[key]=iconMix(motion.from[key],target[key],eased);
                        if(motion.gather){
                            p.scale=t<.84?iconMix(motion.from.scale,target.scale*1.08,eased):
                                target.scale*(t<.92?iconMix(1.08,.97,(t-.84)/.08):iconMix(.97,1,(t-.92)/.08));
                        }else p.scale=iconMix(motion.from.scale,target.scale,eased);
                        piece.current=t===1?{...target}:p;paintIconPiece(piece);
                        if(t===1)piece.motion=null;else moving=true;
                    });
                    if(!active&&entry.group.dataset.state!=='scattered'&&!entry.pieces.some(piece=>piece.motion)){
                        entry.group.dataset.state='scattered';
                    }
                });
                finishIconAssembly();
                if(moving||(!reduce.matches&&dialIcons.size>1))requestIconFrame();
            }
            function moveIconEntry(entry,gather){
                const now=performance.now();
                entry.group.dataset.state=gather?'assembling':'scattering';
                entry.pieces.forEach((piece,i)=>{
                    const to=gather?piece.assembled:flowingIconPosition(piece);
                    if(reduce.matches){piece.current={...to};piece.motion=null;paintIconPiece(piece);return;}
                    piece.motion={from:{...piece.current},to:{...to},gather,
                        start:now+(i/Math.max(1,entry.pieces.length-1))*iconAssemblySettings.stagger,
                        duration:gather?iconAssemblySettings.gatherDuration:iconAssemblySettings.scatterDuration};
                });
                if(reduce.matches)entry.group.dataset.state=gather?'assembled':'scattered';
                requestIconFrame();
            }
            function syncDialIcon(projectId){
                if(slideview.hidden)return;
                const id=String(projectId);
                // Keep the incoming fragments flowing until the wave has fully exited.
                if(deferIconAssembly){
                    const previous=dialIcons.get(dialIconProjectId);
                    previous?.item.classList.remove('is-icon-loaded');
                    dialIconProjectId=null;
                    if(iconFieldReady&&previous){
                        layoutIconField();
                        moveIconEntry(previous,false);
                    }
                    return;
                }
                if(id===dialIconProjectId)return;
                const previous=dialIcons.get(dialIconProjectId);
                previous?.item.classList.remove('is-icon-loaded');
                dialIconProjectId=id;
                if(!iconFieldReady)return;
                layoutIconField();
                if(previous)moveIconEntry(previous,false);
                const active=dialIcons.get(id);
                if(active){
                    active.item.classList.remove('is-icon-loaded');
                    iconField.appendChild(active.group);
                    moveIconEntry(active,true);
                }
            }
            function resetIconField(){
                cancelAnimationFrame(iconFrame);iconFrame=0;dialIconProjectId=null;
                iconFlowTime=0;iconLastFrame=0;
                dialIcons.forEach(entry=>{
                    entry.item.classList.remove('is-icon-loaded');entry.group.dataset.state='scattered';
                    entry.pieces.forEach(piece=>{
                        piece.motion=null;
                        if(piece.scattered){piece.current={...piece.scattered};paintIconPiece(piece);}
                    });
                });
            }
            function resizeIconField(){
                if(!iconFieldReady||slideview.hidden)return;
                layoutIconField();
                dialIcons.forEach(entry=>entry.pieces.forEach(piece=>{
                    const target=entry.group.dataset.projectId===dialIconProjectId?piece.assembled:flowingIconPosition(piece);
                    if(piece.motion){
                        piece.motion.from={...piece.current};piece.motion.to={...target};piece.motion.start=performance.now();
                    }else{piece.current={...target};paintIconPiece(piece);}
                }));
            }
            Promise.all(iconLoads).then(()=>{
                if(disposed)return;
                dialIcons.forEach(entry=>entry.pieces.forEach((piece,i)=>{piece.seed=iconRandom(entry.projectOrder*101+i+1);}));
                iconFieldReady=true;
                if(slideview.hidden)return;
                layoutIconField();
                const id=dialIconProjectId||cards[index]?.dataset.projectId;
                dialIconProjectId=null;syncDialIcon(id);
                finishIconAssembly();
            });
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
                --project-dial-icon-size:clamp(48px,5vw,80px);
                --project-dial-icon-gap:clamp(12px,1.25vw,24px);
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
                visibility:hidden;
                pointer-events:none;
            }
            .project-icon-field {
                display:none;
                position:fixed;
                inset:0;
                width:100%;
                height:100%;
                z-index:90;
                overflow:hidden;
                pointer-events:none;
            }
            html[data-project-fluid-view="slide"] .project-icon-field.is-ready { display:block; }
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

                syncDialIcon(projectId);
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
                scrollSession=null;
                root.classList.remove('project-blinds-content-ready');
                window.ProjectWave.cancel();
                iconAssemblyWaiter?.resolve(false);
                iconAssemblyWaiter=null;
                deferIconAssembly=false;
                root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                request++;clearTimeout(wheelTimer);wheelTimer=0;
                wanted=null;prepared=null;loading=false;phase='idle';pending=null;wheelTotal=0;lastStep=-Infinity;
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
                    if (card) { loadImage(getSource(card)).catch(() => {}); window.ProjectBlinds.prepare(getSource(card)).catch(() => {}); }
                }
            }
            async function transitionTo(next, direction = 1, scrub = null) {
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
                    const foreground=await captureBlindsContent(cards[index]);
                    if(current!==request||disposed||slideview.hidden||cards[next].hidden)return;
                    loading=false;
                    deferIconAssembly=true;
                    phase = 'animating';
                    const finished = await window.ProjectWave.transition({
                        direction,
                        from: getSource(cards[index]),
                        to: getSource(cards[next]),
                        target: cards[index],
                        scrub, foreground,
                        async preview() {
                            const previous=index;
                            try {
                                root.classList.add('project-wave-text-pending');
                                markActive(next,true,direction);
                                updateSlideInfo(cards[next].dataset.projectId,false);
                                settleBlindsContent(cards[next].dataset.projectId);
                                return await captureBlindsContent(cards[next],{includeHidden:true});
                            } finally {
                                if(current===request&&!disposed&&!slideview.hidden){
                                    markActive(previous,true);
                                    updateSlideInfo(cards[previous].dataset.projectId,false);
                                    settleBlindsContent(cards[previous].dataset.projectId);
                                    root.classList.remove('project-wave-text-pending');
                                }
                            }
                        },
                        swap() {
                            deferIconAssembly=true;
                            root.classList.add('project-wave-text-pending');
                            root.classList.remove('project-wave-text-enter', 'project-wave-text-exit');
                            root.style.setProperty('--project-wave-copy-offset', `${direction * 14}px`);
                            markActive(next, true, direction);
                            updateSlideInfo(cards[next].dataset.projectId, false);
                            forceTextVisible();
                            wanted = null;
                            settleBlindsContent(cards[next].dataset.projectId);
                            return null;
                        }
                    });
                    if (!finished && current === request && !disposed && !slideview.hidden) {
                        deferIconAssembly=false;
                        root.classList.remove('project-wave-text-pending','project-wave-text-exit','project-wave-text-enter');
                        markActive(index,true);
                        updateSlideInfo(cards[index].dataset.projectId,false);
                    }
                    if (finished && current === request && !disposed && !slideview.hidden) {
                        deferIconAssembly=false;
                        root.classList.remove('project-wave-text-pending','project-wave-text-enter','project-wave-text-exit');
                        forceTextVisible();
                    }
                } catch (error) {
                    if (current === request && !disposed) {
                        deferIconAssembly=false;
                        root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                        console.error('[Project wave transition]', error);
                        markActive(next, true, direction);
                        updateSlideInfo(cards[next].dataset.projectId, false);
                    }
                } finally {
                    if (current === request) {
                        wanted = null;
                        phase = 'idle';
                        if(scrollSession===scrub)scrollSession=null;
                        loading = false;
                        wheelTotal = 0;
                        clearTimeout(wheelTimer);
                        wheelTimer = 0;
                        lastStep = performance.now();
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
// Build input, inserted inside the existing project controller.
// One wheel gesture triggers one complete transition; inertia is never queued.
let scrollSession = null;
let blindsWheelTime = -Infinity, blindsWheelTotal = 0, blindsWheelLocked = false;
function handleAsciiWheel(delta) {
    if (disposed || slideview.hidden || !delta) return;
    const now=performance.now(),options=window.PROJECT_BLINDS_OPTIONS || {};
    const value=(name,fallback,min,max)=>{
        const number=Number(options[name]);
        return Number.isFinite(number)?Math.max(min,Math.min(max,number)):fallback;
    };
    const quiet=value('wheelQuietMs',220,120,1000);
    if(now-blindsWheelTime>quiet){blindsWheelLocked=false;blindsWheelTotal=0;}
    blindsWheelTime=now;
    if(phase!=='idle'||now-lastStep<quiet){blindsWheelLocked=true;blindsWheelTotal=0;return;}
    if(blindsWheelLocked)return;
    if(Math.sign(delta)!==Math.sign(blindsWheelTotal))blindsWheelTotal=0;
    blindsWheelTotal+=delta;
    if(Math.abs(blindsWheelTotal)<value('wheelThreshold',24,4,160))return;
    const direction=Math.sign(blindsWheelTotal);
    blindsWheelLocked=true;blindsWheelTotal=0;
    navigate(direction);
}

// Resolve the real DOM underneath the canvas to the incoming texture's final pose.
function captureBlindsContent(target, options = {}) {
    const iconMotion=[...dialIcons.values()].flatMap(entry=>entry.pieces.filter(piece=>piece.current).map((piece,i)=>({
        node:piece.node, size:piece.size,
        active:String(entry.group.dataset.projectId)===String(target.dataset.projectId),
        stagger:i/Math.max(1,entry.pieces.length-1),
        assembled:{...piece.current}, scattered:{...flowingIconPosition(piece)},
        readPosition:()=>flowingIconPosition(piece)
    })));
    return window.ProjectBlinds.captureForeground(target,{...options,iconMotion});
}

function settleBlindsContent(projectId) {
    deferIconAssembly=false;
    syncDialIcon(projectId);
    if (iconFieldReady) {
        layoutIconField();
        dialIcons.forEach((entry,id)=>{
            const active=String(id)===String(projectId);
            entry.pieces.forEach(piece=>{
                piece.motion=null;
                const position=active?piece.assembled:flowingIconPosition(piece);
                if(position){piece.current={...position};paintIconPiece(piece);}
            });
            entry.group.dataset.state=active?'assembled':'scattered';
            entry.item.classList.toggle('is-icon-loaded',active);
        });
        finishIconAssembly();
    }
    root.classList.remove('project-wave-text-enter','project-wave-text-exit');
    root.classList.add('project-blinds-content-ready');
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
                    resetIconField();
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
            function flushWheel(){
                wheelTimer=0;
                if(disposed||slideview.hidden){wheelTotal=0;return;}
                const threshold=wheelOption('wheelThreshold',10,1,500);
                if(Math.abs(wheelTotal)<threshold)return;
                const dir=Math.sign(wheelTotal);wheelTotal=0;lastStep=performance.now();navigate(dir);
            }
            listen(document,'wheel',event=>{
                if(slideview.hidden||event.ctrlKey||event.metaKey||editable(event.target))return;
                const nested=event.composedPath().find(el=>el instanceof Element&&el.matches('[data-fluid-ignore],[role="dialog"]'));
                if(nested)return;
                if(event.cancelable)event.preventDefault();
                event.lenisStopPropagation=true;
                const delta=Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX;
                if(!delta)return;
                if(!reduce.matches){
                    const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
                    handleAsciiWheel(delta*unit);
                    return;
                }
                const now=performance.now();
                if(now-lastWheel>160||Math.sign(delta)!==Math.sign(wheelTotal))wheelTotal=0;
                lastWheel=now;
                const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
                wheelTotal+=delta*unit;
                const threshold=wheelOption('wheelThreshold',10,1,500);
                if(Math.abs(wheelTotal)>=threshold){
                    const wait=wheelOption('wheelInterval',100,0,1000)-(now-lastStep);
                    if(wait<=0){clearTimeout(wheelTimer);flushWheel();}
                    else if(!wheelTimer)wheelTimer=setTimeout(flushWheel,wait);
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
                resizeIconField();
                if(dialPosition!==null)applyDialVisual(dialPosition);
                else syncProjectDial(cards[index]?.dataset.projectId,0,true);
            });
            listen(reduce,'change',()=>{
                if(reduce.matches){
                    const next=wanted??index;
                    resetIconField();jump(next);
                }else{iconLastFrame=0;requestIconFrame();warm();}
            });
            listen(document,'visibilitychange',()=>{
                iconLastFrame=0;
                if(document.hidden){cancelAnimationFrame(iconFrame);iconFrame=0;}
                else requestIconFrame();
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
                    resetIconField();
                    dialIcons.forEach(entry=>{
                        entry.item.classList.remove('has-project-icon','is-icon-loaded');
                        entry.slot.remove();
                    });
                    dialIcons.clear();iconField.remove();
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
