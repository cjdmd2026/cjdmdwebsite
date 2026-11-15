(() => {
  const hero=document.querySelector('.hero'),stage=document.querySelector('.hero-stage');
  const sky=document.querySelector('.world-sky'),windowFrame=document.querySelector('.window-frame');
  const title=document.querySelector('.hero-heading'),word=document.querySelector('.world-word');
  const smokes=[...document.querySelectorAll('.world-mist')],motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,x=0,y=0;
  function draw(){
    frame=0;
    const p=motion.matches?0:Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight-stage.offsetHeight)));
    const px=motion.matches?0:x,py=motion.matches?0:y;
    sky.style.transform=`translate3d(${px*-10}px,${py*-7-p*25}px,0) scale(${1.07+p*.22})`;
    windowFrame.style.transform=`translate3d(${px*22-p*100}px,${py*12+p*25}px,0) scale(${1+p*.65})`;
    windowFrame.style.opacity=String(1-p*.75);
    title.style.transform=`translate3d(${px*3}px,${-p*38}px,0)`;
    word.style.transform=`translateY(${-p*80}px)`;
    smokes.forEach((el,i)=>el.style.transform=`translate3d(${(i?1:-1)*p*250+px*20}px,${-p*50}px,0) scale(${1+p*.2})`);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(draw)}
  stage.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;x=(e.clientX/innerWidth-.5)*2;y=(e.clientY/innerHeight-.5)*2;schedule()});
  stage.addEventListener('pointerleave',()=>{x=0;y=0;schedule()});
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);motion.addEventListener('change',schedule);
  new IntersectionObserver(([entry])=>stage.classList.toggle('offscreen',!entry.isIntersecting)).observe(hero);
  draw();
})();
