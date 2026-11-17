(()=>{
 const remove=()=>document.querySelectorAll('.phone-media .culture-expand').forEach(button=>button.remove());remove();
 const phone=document.querySelector('.phone-media');if(phone)new MutationObserver(remove).observe(phone,{childList:true});
})();
