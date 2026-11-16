/* Only the existing YEAR:ON entrance uses this uploaded CRT recording. */
(()=>{
 const entry=document.querySelector('.media-entry-crt');if(!entry||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const sound=new Audio('assets/audio/media-entry/crt-power-on.m4a');sound.preload='auto';sound.volume=.72;sound.id='mediaEntrySound';sound.hidden=true;document.body.append(sound);
 let started=false,pending=false,closed=false;
 const phone=document.querySelector('.time-panel[data-era="2026"]');
 function closeOnPhone(){
   if(!phone?.classList.contains('active'))return;
   closed=true;clean();sound.pause();phoneObserver.disconnect();
 }
 const phoneObserver=new MutationObserver(closeOnPhone);
 if(phone){phoneObserver.observe(phone,{attributes:true,attributeFilter:['class']});closeOnPhone();}
 const elapsed=()=>{const animation=entry.getAnimations().find(a=>a.animationName==='yearonPowerOnExit');return animation?Number(animation.currentTime||0)/1000:Infinity};
 function clean(){document.removeEventListener('pointerdown',start);document.removeEventListener('keydown',start)}
 async function start(){if(started||pending||closed||phone?.classList.contains('active'))return;const t=elapsed();if(t>2.35){clean();return}pending=true;try{if(sound.readyState>=1)sound.currentTime=Math.max(0,t);await sound.play();if(closed)sound.pause();started=true;clean()}catch(_){/* A blocked entrance stays silent; never replay the effect after entry. */}finally{pending=false}}
 sound.addEventListener('loadedmetadata',()=>{if(!started)start()},{once:true});entry.addEventListener('animationend',e=>{if(e.animationName==='yearonPowerOnExit'){closed=true;clean();sound.pause()} });
 document.addEventListener('pointerdown',start,{passive:true});document.addEventListener('keydown',start);addEventListener('pagehide',()=>{closed=true;clean();sound.pause()},{once:true});start();
})();
