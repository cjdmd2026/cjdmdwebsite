(() => {
  const hero=document.querySelector('.hero'),stage=document.querySelector('.hero-stage');
  const sky=document.querySelector('.world-sky'),windowFrame=document.querySelector('.window-frame');
  const title=document.querySelector('.hero-heading'),word=document.querySelector('.world-word');
  const label=title?.querySelector('.hero-label'),heading=title?.querySelector('h1');
  const description=title?.querySelector('.hero-description'),footnote=document.querySelector('.hero-footnote');
  const prelude=title?.querySelector('.hero-prelude');
  const question=title?.querySelector('.hero-question'),invitation=title?.querySelector('.hero-invitation');
  const smokes=[...document.querySelectorAll('.world-mist')],motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,x=0,y=0;
  const clamp=value=>Math.max(0,Math.min(1,value));
  function draw(){
    frame=0;
    const p=motion.matches?0:clamp(-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight-stage.offsetHeight));
    const ease=value=>1-Math.pow(1-value,3);
    const phase=(startIn,endIn,startOut,endOut)=>ease(clamp((p-startIn)/(endIn-startIn)))*(1-ease(clamp((p-startOut)/(endOut-startOut))));
    const questionReveal=motion.matches?0:phase(.025,.11,.2,.28);
    const invitationReveal=motion.matches?0:phase(.12,.2,.29,.37);
    const titleReveal=motion.matches?1:ease(clamp((p-.34)/.14));
    const copyReveal=motion.matches?1:ease(clamp((p-.53)/.14));
    const footReveal=motion.matches?1:ease(clamp((p-.69)/.12));
    const exit=motion.matches?1:1-ease(clamp((p-.91)/.09));
    const px=motion.matches?0:x,py=motion.matches?0:y;
    stage.style.setProperty('--question-dim',String(questionReveal*.3+invitationReveal*.14));
    sky.style.transform=`translate3d(${px*-10}px,${py*-7-p*25}px,0) scale(${1.07+p*.22})`;
    windowFrame.style.transform=`translate3d(${px*22-p*100}px,${py*12+p*25}px,0) scale(${1+p*.65})`;
    windowFrame.style.opacity=String(1-p*.75);
    title.style.transform=`translate(-50%,-50%) translate3d(${px*2}px,${py*2}px,0)`;
    if(prelude)prelude.style.transform='translate(-50%,-50%)';
    if(question){question.style.opacity=String(questionReveal);question.style.transform=`translateY(${(1-questionReveal)*32}px)`;}
    if(invitation){invitation.style.opacity=String(invitationReveal);invitation.style.transform=`translateY(${(1-invitationReveal)*28}px)`;}
    [label,heading].forEach(el=>{if(!el)return;el.style.opacity=String(titleReveal*exit);el.style.transform=`translateY(${(1-titleReveal)*34}px)`;});
    if(description){description.style.opacity=String(copyReveal*exit);description.style.transform=`translateY(${(1-copyReveal)*42}px)`;}
    if(footnote){footnote.style.opacity=String(footReveal*exit);footnote.style.transform=`translateY(${(1-footReveal)*18}px)`;}
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
