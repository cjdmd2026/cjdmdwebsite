(()=>{
 document.querySelectorAll('.site-music-toggle').forEach(button=>button.remove());
 let actions=document.querySelector('.shared-quick-actions');
 if(!actions){actions=document.createElement('div');actions.className='shared-quick-actions';document.body.append(actions)}
 let top=actions.querySelector('button,a');
 if(!top){top=document.createElement('button');top.type='button';top.setAttribute('aria-label','맨 위로 이동');const image=document.createElement('img');image.alt='';image.src=new URL('../assets/images/top-v59.webp',document.currentScript.src).href;top.append(image);actions.append(top);top.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}))}
})();
