(()=>{
 const mq=matchMedia('(min-width:801px)');let frame;
 function fit(){
  document.querySelectorAll('.guardian-profile').forEach(scene=>{
   const copy=scene.querySelector('.profile-copy h2'),art=scene.querySelector('.profile-character');if(!copy||!art)return;
   if(!mq.matches){art.style.removeProperty('--profile-art-scale');return}
   art.style.setProperty('--profile-art-scale','1');
   const img=art.querySelector('.profile-main');if(!img)return;
   const r=img.getBoundingClientRect(),target=copy.getBoundingClientRect().top;
   const contentHeight=Math.min(r.height,r.width/2),fraction=art.classList.contains('profile-character-apu')?.195:.236;
   const head=r.bottom-contentHeight*(1-fraction),denominator=r.bottom-head;
   if(denominator>0)art.style.setProperty('--profile-art-scale',String(Math.max(.85,Math.min(1.35,(r.bottom-target)/denominator))));
  });
 }
 function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(fit)}
 addEventListener('resize',schedule);addEventListener('load',schedule);document.fonts?.ready.then(schedule);mq.addEventListener('change',schedule);schedule();
})();
