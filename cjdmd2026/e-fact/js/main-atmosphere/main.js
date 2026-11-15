(() => {'use strict';
 const hero=document.querySelector('.hero-scroll'),stage=document.querySelector('.hero-stage'),button=document.querySelector('#motion');
 const media=matchMedia('(prefers-reduced-motion: reduce)');let quiet=media.matches,frame=0;
 const layers={sky:document.querySelector('.sky'),factory:document.querySelector('.factory'),ground:document.querySelector('.ground'),back:document.querySelector('.mist-back'),front:document.querySelector('.mist-front'),title:document.querySelector('.world-title'),copy:document.querySelector('.hero-copy')};
 const clamp=v=>Math.max(0,Math.min(1,v));
 function draw(){frame=0;if(quiet)return;const p=clamp(-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight-stage.offsetHeight));
 layers.sky.style.transform=`translateY(${-p*28}px) scale(${1.05+p*.025})`;
 layers.factory.style.transform=`translateY(${-p*50}px) scale(${1+p*.16})`;
 layers.ground.style.transform=`translateY(${p*75}px) scale(${1+p*.34})`;
 layers.back.style.transform=`translate3d(${-p*120}px,${-p*35}px,0) scale(${1+p*.15})`;
 layers.front.style.transform=`translate3d(${p*180}px,${p*60}px,0) scale(${1+p*.3})`;
 layers.title.style.transform=`translateY(${-p*110}px) scale(${1-p*.045})`;
 layers.copy.style.transform=`translateY(${-p*18}px)`;layers.copy.style.opacity=String(1-p*.2);
 hero.dataset.progress=p.toFixed(4);
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(draw)}
 function mode(){document.body.classList.toggle('reduce-motion',quiet);button.setAttribute('aria-pressed',String(quiet));button.textContent=quiet?'모션 켜기':'모션 줄이기';schedule()}
 button.addEventListener('click',()=>{quiet=!quiet;mode()});media.addEventListener('change',()=>{quiet=media.matches;mode()});addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);mode();

 const density=document.querySelector('.density-network');
 if(density){
  const nodes=[...density.querySelectorAll('.density-node')],routes=[...density.querySelectorAll('.density-route')],status=density.querySelector('.density-live-status');
  const selected=new Set();
  const render=hovered=>{
   const active=new Set(selected);if(hovered)active.add(hovered);
   density.dataset.count=String(active.size);
   nodes.forEach(node=>{const id=node.dataset.density;node.classList.toggle('is-active',active.has(id));node.setAttribute('aria-pressed',String(selected.has(id)))});
   routes.forEach(route=>route.classList.toggle('is-active',active.has(route.dataset.route)));
   status.textContent=active.size===0?'시설을 선택해 흐름을 겹쳐 보세요.':active.size===1?'하나의 시설에서 생활권으로 이어지는 흐름':active.size===2?'두 시설의 흐름이 생활권에서 겹칩니다.':'세 시설의 흐름이 하나의 생활권에 겹칩니다.';
  };
  nodes.forEach(node=>{
   node.addEventListener('pointerenter',()=>render(node.dataset.density));
   node.addEventListener('pointerleave',()=>render());
   node.addEventListener('focus',()=>render(node.dataset.density));
   node.addEventListener('blur',()=>render());
   node.addEventListener('click',()=>{const id=node.dataset.density;selected.has(id)?selected.delete(id):selected.add(id);render()});
  });
  render();
 }
})();
