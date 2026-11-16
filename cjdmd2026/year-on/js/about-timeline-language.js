(()=>{
 const root=document.getElementById('ypMediaAnchor');if(!root)return;
 const texts=[...root.querySelectorAll('[data-ko][data-en]')];
 function update(){const en=(document.documentElement.lang||window.YEARON_LANG||'ko').startsWith('en');texts.forEach(el=>{const value=en?el.dataset.en:el.dataset.ko;if(el.textContent!==value)el.textContent=value;el.lang=en?'en':'ko';});}
 new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 document.addEventListener('click',()=>{setTimeout(update,0);setTimeout(update,150)});
 addEventListener('storage',update);update();
})();
