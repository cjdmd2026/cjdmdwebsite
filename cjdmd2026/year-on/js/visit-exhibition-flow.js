(()=>{
const root=document.querySelector('.vf-exhibition');if(!root)return;
function localize(){const lang=window.YEARON_LANG==='en'?'en':'ko';root.dataset.language=lang;root.querySelectorAll('[data-ko][data-en]').forEach(el=>el.textContent=el.dataset[lang]);root.querySelectorAll('[data-map-zone]').forEach(el=>{const row=root.querySelector('[data-visit-zone="'+el.dataset.mapZone+'"] strong');el.setAttribute('aria-label',el.dataset.mapZone+' · '+row.textContent)})}
addEventListener('yearon-language-change',localize);document.addEventListener('DOMContentLoaded',localize,{once:true});localize();
function select(zone){root.querySelectorAll('[data-map-zone]').forEach(el=>el.classList.toggle('is-active',el.dataset.mapZone===zone));root.querySelectorAll('[data-visit-zone]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.visitZone===zone)))}
root.querySelectorAll('[data-map-zone]').forEach(el=>{el.addEventListener('click',()=>select(el.dataset.mapZone));el.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();select(el.dataset.mapZone)}})});
root.querySelectorAll('[data-visit-zone]').forEach(el=>el.addEventListener('click',()=>select(el.dataset.visitZone)));
})();
