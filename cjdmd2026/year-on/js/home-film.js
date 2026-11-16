(() => {
  const video=document.querySelector('#homeFilmVideo'),journey=document.querySelector('.home-film-journey');
  if(!video||!journey)return;
  const button=document.querySelector('#homeFilmToggle'),destination=document.querySelector('.film-destination'),link=destination.querySelector('a');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused=reduced.matches,request=0,pending=false,smoothed=0,lastPaint=0;
  video.muted=true;
  const clamp=n=>Math.min(1,Math.max(0,n)),ease=n=>n*n*(3-2*n);
  function paint(now=performance.now()){
    const rect=journey.getBoundingClientRect();
    document.body.classList.add('has-film-scene');
    const travel=Math.max(1,journey.offsetHeight-innerHeight),p=clamp(-rect.top/travel);
    const target=clamp((p-.04)/.34);
    const dt=Math.min(64,Math.max(1,now-lastPaint||16));lastPaint=now;
    smoothed=reduced.matches?target:smoothed+(target-smoothed)*(1-Math.exp(-dt/180));
    if(Math.abs(target-smoothed)<.0005)smoothed=target;
    const arrive=ease(smoothed),leave=arrive;
    journey.style.setProperty('--destination-label',ease(clamp(smoothed/.72)));
    journey.style.setProperty('--destination-button',ease(clamp((smoothed-.12)/.78)));
    journey.style.setProperty('--destination-caption',ease(clamp((smoothed-.28)/.72)));
    journey.style.setProperty('--logo-opacity',1-leave);journey.style.setProperty('--logo-y',(-leave*35)+'px');
    journey.style.setProperty('--destination-opacity',arrive);journey.style.setProperty('--destination-y',((1-arrive)*24)+'px');if(rect.top>0)journey.style.removeProperty('--opening-copy-opacity');else journey.style.setProperty('--opening-copy-opacity',String(1-arrive));
    journey.style.setProperty('--film-scale',1.05-p*.05);journey.style.setProperty('--film-shade',.35+p*.15);
    destination.classList.toggle('is-ready',arrive>.8);destination.setAttribute('aria-hidden',String(arrive<=.8));link.tabIndex=arrive>.8?0:-1;
    pending=false;
    if(smoothed!==target){pending=true;requestAnimationFrame(paint);}
  }
  const scroll=()=>{if(!pending){pending=true;requestAnimationFrame(paint);}};
  const render=()=>{button.textContent=video.paused?'PLAY ↗':'PAUSE Ⅱ';button.setAttribute('aria-label',video.paused?'Play the YEAR:ON film':'Pause the YEAR:ON film');};
  async function sync(){const id=++request;if(document.hidden||userPaused){video.pause();render();return;}try{await video.play();if(id!==request&&(document.hidden||userPaused))video.pause();}catch{render();}}
  button.addEventListener('click',()=>{userPaused=!video.paused;sync();});video.addEventListener('play',render);video.addEventListener('pause',render);
  video.addEventListener('volumechange',()=>{if(!video.muted)video.muted=true;});
  document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',()=>video.pause());
  reduced.addEventListener('change',()=>{userPaused=reduced.matches;sync();paint();});
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);
  paint();render();sync();
})();
