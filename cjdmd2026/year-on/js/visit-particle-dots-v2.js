(()=>{
 const root=document.getElementById('visitOpening'),stage=root?.querySelector('.visit-opening-sticky'),canvas=stage?.querySelector('canvas'),symbol=stage?.querySelector('.visit-particle-symbol');if(!canvas||!symbol)return;
 const wordmark=stage.querySelector('.visit-particle-wordmark');
 const glowCanvas=document.createElement('canvas'),glowCtx=glowCanvas.getContext('2d'),glowSprite=document.createElement('canvas');glowSprite.width=glowSprite.height=32;const glowBrush=glowSprite.getContext('2d'),halo=glowBrush.createRadialGradient(16,16,0,16,16,16);halo.addColorStop(0,'rgba(190,224,248,.45)');halo.addColorStop(.35,'rgba(160,211,245,.18)');halo.addColorStop(1,'rgba(150,204,242,0)');glowBrush.fillStyle=halo;glowBrush.fillRect(0,0,32,32);
 const ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const clamp=n=>Math.max(0,Math.min(1,n)),ease=n=>{n=clamp(n);return n*n*(3-2*n)},range=(p,a,b)=>ease((p-a)/(b-a));
 let w=0,h=0,last=0,raf=0,points=[],ready=false,began=0,handoffAt=0,dragStart=null,handValue=0,handTarget=0,idleSince=0,assemblyValue=0,pendingAdvance=false,formedAt=0,reversing=false;root.dataset.particleInteraction="true";const mouse={x:-1000,y:-1000,active:false};
 let seed=83;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 // Smooth, multi-frequency potential; its perpendicular gradient produces a curl field.
 function curl(x,y,t){return [Math.cos(y*1.7+t*.18)*.65+Math.cos(x*.8+y*1.1-t*.13)*.35,-Math.cos(x*1.4-t*.12)*.7-Math.cos(x*.8+y*1.1-t*.13)*.25]}
 function resize(){const b=stage.getBoundingClientRect();w=b.width;h=b.height;const d=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);glowCanvas.width=Math.max(1,Math.round(w/3));glowCanvas.height=Math.max(1,Math.round(h/3));points.forEach(p=>{p.x=p.y=undefined;p.vx=p.vy=0});request()}
 function init(){
  function sample(image,kind){const c=document.createElement('canvas');c.width=420;c.height=Math.round(420*image.naturalHeight/image.naturalWidth);const s=c.getContext('2d',{willReadFrequently:true});s.drawImage(image,0,0,c.width,c.height);const pixels=s.getImageData(0,0,c.width,c.height).data;
   // Irregular, evenly spaced points avoid both LED grids and sandy clumps.
   const spacing=1.65,cells=new Map(),inside=(x,y)=>{if(x<0||y<0||x>=c.width||y>=c.height)return false;const k=(Math.floor(y)*c.width+Math.floor(x))*4;return pixels[k+3]>130&&pixels[k]+pixels[k+1]+pixels[k+2]>300};
   const attempts=Math.ceil(c.width*c.height*1.3);
   for(let i=0;i<attempts;i++){
    const x=random()*c.width,y=random()*c.height;if(!inside(x,y))continue;
    const gx=Math.floor(x/spacing),gy=Math.floor(y/spacing);let crowded=false;
    for(let yy=gy-1;yy<=gy+1&&!crowded;yy++)for(let xx=gx-1;xx<=gx+1;xx++){const other=cells.get(xx+','+yy);if(other&&Math.hypot(other.x-x,other.y-y)<spacing){crowded=true;break}}
    if(crowded)continue;cells.set(gx+','+gy,{x,y});
    const edge=!inside(x-2.4,y)||!inside(x+2.4,y)||!inside(x,y-2.4)||!inside(x,y+2.4);
    points.push({kind,u:x/c.width,v:y/c.height,phase:random(),band:(random()+random()+random()-1.5),depth:random(),orbit:random()*Math.PI*2,speed:.052+random()*.045,size:.48+random()*.63,alpha:.48+random()*.38,edge,vx:0,vy:0,delay:.12+random()*.38});
   }


  }
  sample(symbol,'symbol');ready=true;began=performance.now();resize();
 }
 function draw(now){raf=0;if(!ready)return;const dt=Math.min(.035,(now-(last||now))/1000);last=now;const t=now/1000,r=stage.getBoundingClientRect(),p=clamp(-root.getBoundingClientRect().top/Math.max(1,root.offsetHeight-innerHeight));if(!idleSince)idleSince=now;
 if(reversing){if(handValue<=.001)assemblyValue=Math.max(0,assemblyValue-dt/1.7);if(assemblyValue===0){reversing=false;idleSince=now;}}
 else if(pendingAdvance)assemblyValue=Math.min(1,assemblyValue+dt/2.4);
 if(assemblyValue>=1&&!formedAt)formedAt=now;
 if(pendingAdvance&&formedAt&&now-formedAt>250){handTarget=1;handoffAt=now;pendingAdvance=false;}
 handValue+=Math.max(-dt/3.6,Math.min(dt/3.6,handTarget-handValue));
 const age=(now-began)/1000,assembly=ease(assemblyValue),handoff=ease(handValue),solid=range(handoff,0,.28);root.style.setProperty('--particle-solid',solid);root.style.setProperty('--particle-wordmark',range(handoff,.78,.96));root.style.setProperty('--opening-move',range(handoff,.30,.73));root.style.setProperty('--opening-copy',range(handoff,.76,.96));root.style.setProperty('--opening-cta',range(handoff,.92,1));
 if(handoff===1&&!root.dataset.handoffDone){root.dataset.handoffDone='true';dispatchEvent(new Event('yearon-visit-handoff'));}

 root.dataset.particleCount=points.length;root.dataset.particleAssembly=assembly.toFixed(3);ctx.clearRect(0,0,w,h);glowCtx.clearRect(0,0,glowCanvas.width,glowCanvas.height);glowCtx.globalCompositeOperation='lighter';const symbolBounds=symbol.getBoundingClientRect(),wordBounds=wordmark.getBoundingClientRect(),radius=Math.min(90,w*.075),damping=Math.exp(-dt*4.6);
 const light=ctx.createLinearGradient(symbolBounds.left-r.left,symbolBounds.top-r.top,symbolBounds.right-r.left,symbolBounds.bottom-r.top);light.addColorStop(0,'#c9e5f5');light.addColorStop(.45,'#edf8ff');light.addColorStop(.72,'#d8edfa');light.addColorStop(1,'#d2eafa');ctx.fillStyle=light;
 for(const a of points){const b=a.kind==='word'?wordBounds:symbolBounds;const travel=t*.062+Math.sin(t*.65)*.008;const u=(a.phase+travel+(a.speed-.07)*t*.6)%1,n=curl(u*4,a.band,t*.75);
 const fx=w*(-.04+u*1.08),center=h*.48+h*(.085*Math.sin(u*6.2-t*.58)+.022*Math.sin(u*12-t*.28));
 const layer=Math.sin(a.band*2.1+t*.24);
 const orbit=a.orbit+t*(.38+a.depth*.22),depthSpread=.025+.072*Math.sin(Math.PI*u)**2;
 const fy=center+Math.sin(orbit)*h*depthSpread*(.3+a.depth*.7)+a.band*h*.016+n[0]*h*.006;
const gather=clamp((assemblyValue-a.delay)/(1-a.delay));const q=reduced.matches?1:Math.pow(gather,1.8);const driftX=Math.sin(t*.9+a.v*13+a.u*6)*2.2+Math.sin(t*1.3+a.phase*6.28)*.7,driftY=Math.cos(t*.8+a.u*15-a.v*4)*1.8;
 const sweep=Math.sin(Math.PI*q),ribbon=a.phase*Math.PI*2+t*.36;
 const arcX=Math.sin(ribbon+a.band)*w*.045*sweep,arcY=Math.cos(ribbon+a.u*4)*h*.055*sweep;
 const tx=arcX+fx*(1-q)+(b.left-r.left+a.u*b.width+driftX*(1-q)*(1-solid))*q,ty=arcY+fy*(1-q)+(b.top-r.top+a.v*b.height+driftY*(1-q)*(1-solid))*q;
 const previousX=a.x,previousY=a.y;
 if(a.x===undefined||(a.flowU!==undefined&&u<a.flowU-.5&&q<.96)){a.x=tx;a.y=ty;a.vx=a.vy=0}const settle=22;let ax=(tx-a.x)*settle,ay=(ty-a.y)*settle;
 if(mouse.active){const dx=a.x-mouse.x,dy=a.y-mouse.y,d=Math.hypot(dx,dy);if(d<radius&&d>.01){const force=1050*ease(1-d/radius)*(1-solid);ax+=dx/d*force;ay+=dy/d*force}}
 if(q>.015){
 const response=1-Math.exp(-dt*(15+q*12));a.x+=(tx-a.x)*response;a.y+=(ty-a.y)*response;a.vx=0;a.vy=0;
 // Local cursor displacement is damped directly, without spring overshoot.
 if(mouse.active){const dx=a.x-mouse.x,dy=a.y-mouse.y,d=Math.hypot(dx,dy);if(d>0&&d<radius){const push=16*ease(1-d/radius)*(1-solid);a.x+=dx/d*push*dt*10;a.y+=dy/d*push*dt*10}}
 }else{
 // Wrap the flow outside the viewport instead of springing across the whole canvas.
 // That cross-screen chase produced repeated piles of particles at shared x positions.
 if(a.flowU!==undefined&&u<a.flowU-.5){a.x=fx;a.y=fy;a.vx=0;a.vy=0}
 const response=1-Math.exp(-dt*9);a.x=fx;a.y+=(fy-a.y)*response;
 if(mouse.active){const dx=a.x-mouse.x,dy=a.y-mouse.y,d=Math.hypot(dx,dy);if(d>0&&d<radius){const push=18*ease(1-d/radius);a.x+=dx/d*push;a.y+=dy/d*push}}
 }a.flowU=u;
 const sheen=.88+.12*Math.sin(a.u*7+a.v*3-t*.7);const streamFade=ease(u/.10)*ease((1-u)/.10),flowOpacity=streamFade*(1-q)+q;
 const opacity=Math.min(.82,a.alpha*1.28)*(.72+.28*a.depth)*(.94+.06*q)*sheen*(1-solid)*flowOpacity;
 if(q<.9&&!reduced.matches){const radius=(6+a.depth*3)*(1-q);glowCtx.globalAlpha=opacity*.11*(1-q);glowCtx.drawImage(glowSprite,(a.x-radius)/3,(a.y-radius)/3,radius*2/3,radius*2/3);}
 ctx.globalAlpha=opacity;ctx.beginPath();ctx.arc(a.x,a.y,a.size*(.6+a.depth*.65)*(1-q)+q*(.55+a.size*.22),0,Math.PI*2);ctx.fill()}
 ctx.globalAlpha=.65*(1-assembly);ctx.globalCompositeOperation='lighter';ctx.drawImage(glowCanvas,0,0,w,h);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;if(!reduced.matches)request()
 }
 function request(){if(!raf&&ready&&!document.hidden)raf=requestAnimationFrame(draw)}
 let scrollIntent=0,touchY=null;
 function advance(){if(reduced.matches){assemblyValue=1;handValue=handTarget=1;pendingAdvance=false;request();return;}reversing=false;pendingAdvance=true;idleSince=0;dragStart=null;request()}
 function reverse(){reversing=true;handTarget=0;handoffAt=0;pendingAdvance=false;formedAt=0;delete root.dataset.handoffDone;idleSince=performance.now();dispatchEvent(new Event('yearon-visit-reverse'));request()}
 stage.addEventListener('wheel',e=>{e.preventDefault();if(e.deltaY<0){reverse();return}if(e.deltaY>0){scrollIntent+=Math.min(100,e.deltaY);if(scrollIntent>=70)advance()}},{passive:false});
 stage.addEventListener('touchstart',e=>{touchY=e.touches[0]?.clientY},{passive:true});
 stage.addEventListener('touchend',e=>{const y=e.changedTouches[0]?.clientY;if(touchY!==null&&touchY-y>35)advance();touchY=null},{passive:true});
 stage.addEventListener('touchmove',e=>{if(!root.dataset.handoffDone)e.preventDefault()},{passive:false});
 stage.addEventListener('pointerdown',e=>{if(e.target.closest('a,button')||!ready||handoffAt)return;dragStart={x:e.clientX,y:e.clientY};stage.setPointerCapture(e.pointerId)});
 stage.addEventListener('pointermove',e=>{if(dragStart&&Math.hypot(e.clientX-dragStart.x,e.clientY-dragStart.y)>65){advance()}});
 stage.addEventListener('pointerup',()=>dragStart=null);stage.addEventListener('pointercancel',()=>dragStart=null);
 stage.tabIndex=0;stage.setAttribute('aria-label','파티클 로고를 드래그하면 전시 소개가 나타납니다');stage.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!handoffAt){e.preventDefault();advance()}});
 stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;mouse.active=true;if(assemblyValue<.85)idleSince=performance.now();request()},{passive:true});stage.addEventListener('pointerleave',()=>{mouse.active=false;request()});addEventListener('scroll',request,{passive:true});addEventListener('resize',resize);document.addEventListener('visibilitychange',()=>{last=0;request()});reduced.addEventListener('change',request);Promise.all([symbol.decode(),wordmark.decode()]).then(init).catch(()=>root.style.setProperty('--particle-solid','1'));
})();
