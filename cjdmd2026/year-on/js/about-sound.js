/* ABOUT-only ambience. Browser autoplay denial falls back to a user gesture. */
(()=>{
 const audio=document.querySelector('#aboutMusic'),button=document.querySelector('#aboutSound');
 if(!audio||!button)return;
 let enabled=true,pending=false,gone=false,fade=0;
 try{enabled=localStorage.getItem('yearon-about-sound')!=='off'}catch{}
 audio.volume=.45;
 const ko=()=>window.YEARON_LANG!=='en';
 function paint(){
  const playing=!audio.paused&&!audio.ended;
  button.textContent=playing?'SOUND OFF':'SOUND ON';
  button.setAttribute('aria-pressed',String(playing));
  button.setAttribute('aria-label',ko()?(playing?'배경음악 끄기':'배경음악 켜기'):(playing?'Turn background music off':'Turn background music on'));
 }
 async function play(){
  if(!enabled||pending||gone||document.hidden||!audio.paused)return;
  pending=true;
  try{audio.volume=.38;if(audio.readyState>=1&&audio.currentTime<.90)audio.currentTime=.90;await audio.play();if(!enabled||gone||document.hidden){audio.pause();return}const start=performance.now();cancelAnimationFrame(fade);const rise=now=>{if(audio.paused)return;audio.volume=.38+.07*Math.min(1,(now-start)/150);if(now-start<150)fade=requestAnimationFrame(rise)};fade=requestAnimationFrame(rise)}catch{/* Gesture retry remains available after autoplay denial. */}finally{pending=false;paint()}
 }
 function gesture(event){if(event.target.closest?.('#aboutSound'))return;play()}
 ['pointerdown','keydown','touchend'].forEach(name=>document.addEventListener(name,gesture,{passive:true}));
 button.addEventListener('click',()=>{enabled=audio.paused;try{localStorage.setItem('yearon-about-sound',enabled?'on':'off')}catch{}if(enabled)play();else{cancelAnimationFrame(fade);audio.pause();paint()}});
 audio.addEventListener('loadedmetadata',()=>{if(audio.currentTime<.90)audio.currentTime=.90});
 audio.addEventListener('timeupdate',()=>{if(!audio.paused&&audio.currentTime<.90)audio.currentTime=.90});
 audio.load();
 audio.addEventListener('play',paint);audio.addEventListener('pause',paint);
 audio.addEventListener('error',()=>{button.textContent='SOUND UNAVAILABLE';button.disabled=true;button.setAttribute('aria-label',ko()?'음원을 불러올 수 없습니다':'Audio unavailable')});
 window.addEventListener('yearon-language-change',paint);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){audio.pause();paint()}else play()});
 window.addEventListener('pagehide',()=>{gone=true;cancelAnimationFrame(fade);audio.pause()});
 window.addEventListener('pageshow',()=>{gone=false;play()});
 paint();play();
})();
