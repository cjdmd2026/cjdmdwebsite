(()=>{
  const story=document.getElementById('visitOpening');
  if(!story)return;
  const cta=story.querySelector('.visit-opening-cta');
  const destination=document.getElementById('visitExhibition');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!location.hash){history.scrollRestoration='manual';scrollTo(0,0)}
  const directEntry=location.hash==='#visitExhibition';
  let unlocked=reduced||directEntry;
  if(directEntry){
    addEventListener('pageshow',()=>requestAnimationFrame(()=>{
      destination?.scrollIntoView({behavior:'instant',block:'start'});
    }),{once:true});
  }
  let locked=false;
  let transitioning=false;
  let lockY=0;
  let snapping=false;
  let progressValue=0;
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
  const gatePosition=()=>story.offsetTop+Math.max(1,story.offsetHeight-innerHeight)*.99;
  const lockPage=gate=>{
    if(unlocked||locked)return;
    locked=true;
    lockY=gate;
    story.classList.add('is-gated');
    scrollTo({top:lockY,left:0,behavior:'auto'});
  };
  const unlockPage=()=>{
    if(!locked)return;
    story.classList.remove('is-gated');
    locked=false;
  };
  let queued=false;
  const render=()=>{
    queued=false;
    if(locked||transitioning)return;
    if(reduced){story.style.setProperty('--opening-move','1');story.style.setProperty('--opening-copy','1');story.style.setProperty('--opening-cta','1');return}
    if(story.dataset.particleInteraction==='true')return;
    const rect=story.getBoundingClientRect();
    const distance=Math.max(1,story.offsetHeight-innerHeight);
    const progress=Math.max(0,Math.min(1,-rect.top/distance));
    progressValue=progress;
    story.style.setProperty('--opening-exit',unlocked?smooth((progress-.9)/.1).toFixed(4):'0');
    story.style.setProperty('--opening-move',smooth((progress-.82)/.10).toFixed(4));
    story.style.setProperty('--opening-copy',smooth((progress-.92)/.055).toFixed(4));
    story.style.setProperty('--opening-cta',smooth((progress-.965)/.025).toFixed(4));
    if(!unlocked&&!locked&&progress>=.99){
      lockPage(story.offsetTop+distance*.99);
      requestAnimationFrame(render);
    }
  };
  const request=()=>{if(!queued){queued=true;requestAnimationFrame(render)}};
  const shouldGate=()=>!unlocked&&(locked||progressValue>=.985);
  addEventListener('scroll',()=>{
    if(locked&&!unlocked&&Math.abs(scrollY-lockY)>1&&!snapping){
      snapping=true;
      scrollTo({top:lockY,left:0,behavior:'auto'});
      requestAnimationFrame(()=>{snapping=false;request()});
      return;
    }
    request();
  },{passive:true});
  addEventListener('resize',()=>{
    if(locked&&!unlocked){lockY=gatePosition();scrollTo({top:lockY,left:0,behavior:'auto'})}
    request();
  },{passive:true});
  addEventListener('wheel',event=>{if(locked&&event.deltaY<0){unlockPage();scrollTo({top:Math.max(0,lockY-8),behavior:'auto'});request();return}if(shouldGate())event.preventDefault()},{passive:false});
  addEventListener('keydown',event=>{
    if(!shouldGate())return;
    if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))event.preventDefault();
  });
  addEventListener('touchmove',event=>{if(shouldGate())event.preventDefault()},{passive:false});
  cta?.addEventListener('click',event=>{
    event.preventDefault();
    if(transitioning||!destination)return;
    unlocked=true;unlockPage();history.pushState(null,'','#visitExhibition');
    destination.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});

  });
  addEventListener('yearon-visit-reverse',()=>{unlocked=false;unlockPage();history.replaceState(null,'',location.pathname);scrollTo({top:story.offsetTop,behavior:'instant'})});
  addEventListener('yearon-visit-handoff',()=>{lockPage(gatePosition())});
  render();
})();
