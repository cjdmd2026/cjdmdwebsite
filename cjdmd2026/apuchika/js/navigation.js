document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('.apu-header'),nav=header?.querySelector('.gnb');
 if(!header||!nav)return;
 const setOpen=open=>header.classList.toggle('menu-open',open);
 nav.addEventListener('mouseenter',()=>setOpen(true));
 nav.addEventListener('focusin',()=>setOpen(true));
 header.addEventListener('mouseleave',()=>setOpen(false));
 header.addEventListener('focusout',e=>{if(!header.contains(e.relatedTarget))setOpen(false)});
 header.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
 header.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
});

document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-common-top]').forEach(button=>button.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));});
