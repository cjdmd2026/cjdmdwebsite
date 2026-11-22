/* Hold the open parentheses until typing and a reading pause finish. */
(()=>{
 const entry=document.getElementById('entry'),journey=document.querySelector('.home-film-journey');
 if(!entry||!journey)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.body.dataset.homeHandoff=location.hash?'ready':'opening';
 let phase=location.hash?'done':'opening',timer=0,frame=0,readyAt=0,readingSince=0,touchY=null;
 const gate=()=>entry.offsetTop+Math.max(1,entry.offsetHeight-innerHeight)*.58;
 const destination=()=>scrollY+journey.getBoundingClientRect().top+Math.max(1,journey.offsetHeight-innerHeight)*.40;
 const blocked=t=>t.closest?.('.global-header,button,a,input,textarea,select,[role="dialog"]');
 const ease=t=>t*t*(3-2*t);
 const jump=y=>scrollTo({top:y,behavior:"instant"});
 function stop(){clearTimeout(timer);cancelAnimationFrame(frame);timer=frame=0;readyAt=0;phase='opening';document.body.dataset.homeHandoff='opening'}
 function begin(){
  if(phase!=='reading')return;phase='moving';document.body.dataset.homeHandoff='leaving';clearTimeout(timer);
  const from=scrollY,start=performance.now(),duration=reduced.matches?1:1100;
  const tick=now=>{if(phase!=='moving')return;const p=Math.min(1,(now-start)/duration);jump(from+(destination()-from)*ease(p));if(p<1)frame=requestAnimationFrame(tick);else{phase='arrival';document.body.dataset.homeHandoff='ready';timer=setTimeout(()=>{phase='done'},400)}};
  frame=requestAnimationFrame(tick);
 }
 function wait(){
  if(phase!=='reading')return;
  if(entry.dataset.openingCopyReady==='true'){if(!readyAt)readyAt=performance.now();if(performance.now()-readyAt>=1200){begin();return}}
  else readyAt=0;
  timer=setTimeout(wait,80);
 }
 function hold(){if(phase==='opening'){phase='reading';readyAt=0;readingSince=performance.now();wait()}if(phase==='reading'&&Math.abs(scrollY-gate())>1)jump(gate())}
 function down(event,amount){
  if(phase==='done')return;
  if(phase==='moving'||phase==='arrival'){event.preventDefault();return}
  if(phase==='reading'||scrollY+amount>=gate()){event.preventDefault();jump(gate());hold()}
 }
 addEventListener('wheel',e=>{if(e.ctrlKey||blocked(e.target)||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;if(e.deltaY<0){if(phase!=='done')stop();return}if(e.deltaY>0)down(e,e.deltaY)},{passive:false});
 addEventListener('touchstart',e=>{touchY=e.touches[0]?.clientY},{passive:true});
 addEventListener('touchmove',e=>{if(touchY==null||blocked(e.target))return;const delta=touchY-e.touches[0].clientY;if(delta>0)down(e,delta);else if(delta< -12&&phase!=='done')stop();touchY=e.touches[0].clientY},{passive:false});
 addEventListener('touchend',()=>touchY=null,{passive:true});
 addEventListener('keydown',e=>{if(blocked(e.target))return;if(['ArrowUp','PageUp','Home','Escape'].includes(e.key)){if(phase!=='done')stop();return}if(['ArrowDown','PageDown',' ','End'].includes(e.key))down(e,e.key==='ArrowDown'?40:innerHeight) });
 addEventListener('scroll',()=>{if(phase==='done'){if(scrollY<gate()*.1){phase='opening';document.body.dataset.homeHandoff='opening';}return}if(phase==='moving')return;if(phase==='arrival'){if(Math.abs(scrollY-destination())>2)jump(destination());return}if(scrollY>=gate()-1)hold();else if(phase==='reading'&&scrollY<gate()-8)stop()},{passive:true});
 addEventListener('resize',()=>{if(phase==='reading')jump(gate())});
 addEventListener('pagehide',()=>{clearTimeout(timer);cancelAnimationFrame(frame)});
})();

(()=>{if(!document.body.classList.contains('home-film-body'))return;const thumb=document.createElement('i');thumb.className='home-transparent-scroll-thumb';thumb.setAttribute('aria-hidden','true');document.body.append(thumb);let frame=0;function paint(){frame=0;const h=innerHeight,full=document.documentElement.scrollHeight,size=Math.max(36,h*h/full),range=full-h;thumb.style.height=size+'px';thumb.style.transform='translateY('+(range>0?scrollY/range*(h-size):0)+'px)';thumb.hidden=range<=0}function schedule(){if(!frame)frame=requestAnimationFrame(paint)}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);new ResizeObserver(schedule).observe(document.body);paint()})();
