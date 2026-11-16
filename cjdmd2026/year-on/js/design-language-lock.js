/* Keep the EN typographic treatment of display labels in both languages. */
(()=>{
 const selector='.era-stamp,.era-stamp *,#channelTitle,#channelTitle *,#channelEyebrow,#channelNav button,#channelNav button *,#placeholder>span,#osd,#osd *,.culture-brand,.culture-brand *, .culture-categories button,.culture-modes button,.culture-caption h3';
 const props=['font-family','font-weight','font-size','font-style','letter-spacing','line-height','font-variant-numeric'];
 const originals=new WeakMap();let pending=false;
 function apply(){pending=false;const elements=[...new Set([...document.querySelectorAll(selector),...[...document.querySelectorAll('body *')].filter(el=>{if(el.children.length||el.closest('script,style,textarea,input,.culture-comment-list,#timeNav'))return false;const t=el.textContent.trim();return t.length>0&&/[A-Za-z0-9]/.test(t)&&!/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(t)})])];for(const el of elements){if(!originals.has(el))originals.set(el,props.map(p=>[p,el.style.getPropertyValue(p),el.style.getPropertyPriority(p)]));for(const [p,v,priority]of originals.get(el)){if(v)el.style.setProperty(p,v,priority);else el.style.removeProperty(p)}}
  document.querySelectorAll('[data-en][data-ko]').forEach(el=>{const en=el.dataset.en.replace(/<[^>]*>/g,' ').trim();if(!el.closest('.vf-exhibition')&&en.length<80&&/[A-Z]/.test(en)&&!/[a-z]/.test(en)&&el.matches('h1,h2,h3,h4,b,strong,small,span,nav a,nav button')&&!el.closest('form')){el.dataset.ko=el.dataset.en;el.setAttribute('translate','no');if(el.hasAttribute('data-i18n-html')){if(el.innerHTML!==el.dataset.en)el.innerHTML=el.dataset.en;}else if(el.textContent!==el.dataset.en)el.textContent=el.dataset.en;}});
  const lang=document.documentElement.getAttribute('lang');document.documentElement.lang='en';
  const styles=elements.map(el=>{const css=getComputedStyle(el);return props.map(p=>[p,css.getPropertyValue(p)])});
  if(lang===null)document.documentElement.removeAttribute('lang');else document.documentElement.lang=lang;
  elements.forEach((el,i)=>styles[i].forEach(([p,v])=>el.style.setProperty(p,v,'important')));
 }
 const request=()=>{if(!pending){pending=true;requestAnimationFrame(apply)}};
 window.addEventListener('yearon-language-change',request);window.addEventListener('resize',request,{passive:true});
 new MutationObserver(records=>{if(records.some(r=>!r.target.parentElement?.closest('#timeNav')&&!r.target.closest?.('#timeNav')))request();}).observe(document.body,{childList:true,subtree:true});
 if(document.fonts)document.fonts.ready.then(request);request();
})();
