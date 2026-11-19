// Type the opening line once the existing parentheses reveal reaches the copy.
const introLine=document.querySelector('.entry-subtitle strong');
const introText=introLine?.textContent||'';
let introTyped=false,introTimer=0;
function typeOpeningCopy(visible){
 if(!introLine)return;
 if(!visible){clearTimeout(introTimer);introTyped=false;introLine.classList.remove('is-typing');introLine.textContent=introText;return;}
 if(introTyped)return;
 introTyped=true;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 introLine.setAttribute('aria-label',introText);
 const letters=Array.from(introText);let count=0;
 introLine.textContent='';introLine.classList.add('is-typing');
 function next(){introLine.textContent=letters.slice(0,++count).join('');if(count<letters.length)introTimer=setTimeout(next,letters[count-1]===' '?150:85);else introTimer=setTimeout(()=>{introLine.classList.remove('is-typing');requestUpdate()},150);}
 introTimer=setTimeout(next,180);
}
const entry=document.querySelector('#entry');
let targetProgress=0,smoothProgress=0,frame=0,stableGeometry=null;
const clamp=n=>Math.max(0,Math.min(1,n)),smoothstep=n=>n*n*(3-2*n);
function readProgress(){const r=entry.getBoundingClientRect();targetProgress=clamp(-r.top/Math.max(1,entry.offsetHeight-innerHeight))}
function paintIntro(raw){
 const p=clamp(raw/.995),opening=smoothstep(clamp((p-.02)/.43));
 // The space stays empty while the parentheses open; copy follows their arrival.
 const subtitle=smoothstep(clamp((p-.46)/.10)),handoff=smoothstep(clamp((raw-.975)/.025));
 const set=(name,value)=>entry.style.setProperty(name,value);
 set('--handoff',handoff.toFixed(3));set('--morph','1');set('--opening',opening.toFixed(3));
 set('--full-o-opacity',(1-clamp(opening/.08)).toFixed(3));set('--paren-opacity',opening<.025?'0':'1');set('--en-opacity','1');
 set('--o-shift',(opening*.92).toFixed(3)+'em');set('--year-spread',(opening*1.1).toFixed(3)+'em');set('--n-spread',(opening*1.1).toFixed(3)+'em');
 set('--slot-scale','0');set('--slot-opacity','0');set('--subtitle-opacity',subtitle.toFixed(3));set('--subtitle-y',((1-subtitle)*18).toFixed(1)+'px');set('--logo-opacity',(1-handoff).toFixed(3));
 const openingCopy=Math.max(1-smoothstep(clamp((p-.15)/.08)),smoothstep(clamp((p-.955)/.025)));
 document.documentElement.style.setProperty('--opening-copy-opacity',openingCopy.toFixed(3));
 stableGeometry=null;
 const geometry=stableGeometry||[entry.querySelector('.o-top')?.getBoundingClientRect(),entry.querySelector('.o-bottom')?.getBoundingClientRect(),entry.querySelector('.entry-sticky')?.getBoundingClientRect()];
 const [left,right,sticky]=geometry;if(opening===1)stableGeometry=geometry;
 if(left&&right&&sticky){const width=Math.max(180,right.left-left.right);set('--subtitle-center-y',((left.top+right.top)/2-sticky.top+left.height*.374).toFixed(1)+'px');set('--subtitle-x',((left.right+right.left)/2-sticky.left).toFixed(1)+'px');set('--subtitle-width',Math.min(420,width*.84).toFixed(1)+'px')}
 typeOpeningCopy(subtitle>.05&&handoff<1);
 entry.dataset.openingCopyReady=String(subtitle>.95 && (!introLine.classList.contains("is-typing") || matchMedia("(prefers-reduced-motion: reduce)").matches));
 entry.classList.toggle('is-open',opening>.04);entry.classList.toggle('is-second-open',opening>.58);
}
function animateIntro(){smoothProgress+=(targetProgress-smoothProgress)*.045;if(Math.abs(targetProgress-smoothProgress)<.00015)smoothProgress=targetProgress;paintIntro(smoothProgress);if(smoothProgress!==targetProgress)frame=requestAnimationFrame(animateIntro);else frame=0}
function requestUpdate(){readProgress();if(!frame)frame=requestAnimationFrame(animateIntro)}
document.querySelector('#homeButton')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
addEventListener('scroll',requestUpdate,{passive:true});addEventListener('resize',()=>{stableGeometry=null;requestUpdate()});
if('scrollRestoration'in history)history.scrollRestoration='manual';
addEventListener('pageshow',event=>{if(!location.hash&&(event.persisted||performance.getEntriesByType('navigation')[0]?.type==='reload'))scrollTo(0,0);readProgress();smoothProgress=targetProgress;paintIntro(smoothProgress)});
readProgress();smoothProgress=targetProgress;paintIntro(smoothProgress);

// Re-measure after asynchronous fonts, layout and bfcache restoration.
new ResizeObserver(()=>{stableGeometry=null;requestUpdate()}).observe(entry);
document.fonts?.ready.then(()=>{stableGeometry=null;requestUpdate()});
addEventListener("load",()=>{stableGeometry=null;requestUpdate()},{once:true});
