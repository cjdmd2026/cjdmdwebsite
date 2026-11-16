/* Navigation previews use the same rendered assets as the media objects. */
(()=>{
 const selectors=['.scroll-media>img.closed','.paper-media .paper-fixed','#radioMedia>img','.tv-time-panel .tv-frame','.pc-media>img','.phone-media>img'];
 function sync(){selectors.forEach((selector,index)=>{
  const frame=document.querySelector(selector),thumb=document.querySelector('#timeNav button[data-index="'+index+'"] .era-thumb');if(!frame||!thumb)return;
  const replacement=getComputedStyle(frame).content;
  const image=index===1?"url(\"assets/images/newspaper-front-user-20261109-final.webp\")":replacement.startsWith('url(')?replacement:'url("'+(frame.currentSrc||frame.src)+'")';
  thumb.style.setProperty('background-image',image,'important');
 })}
 addEventListener('load',sync,{once:true});addEventListener('resize',sync,{passive:true});sync();
})();
