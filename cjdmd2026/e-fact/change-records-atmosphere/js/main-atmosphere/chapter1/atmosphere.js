(() => {
  // No autoplay or time-lagged scrolling: keep reference content directly usable.
  const search=document.querySelector('#decode-search-input');
  if(search)search.setAttribute('aria-label','소각 관련 정보 검색');
  const image=document.querySelector('.hero-image');
  let frame=0;
  const update=()=>{frame=0;if(!image||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const p=Math.max(0,Math.min(1,scrollY/image.offsetHeight));image.style.backgroundPosition=`65% ${35+p*9}%`;};
  addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});update();
})();
