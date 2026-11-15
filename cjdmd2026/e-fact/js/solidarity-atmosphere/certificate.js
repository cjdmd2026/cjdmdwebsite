(() => {
 const cert=document.querySelector('#certificate'),form=document.querySelector('#sign-form');
 const name=document.querySelector('#cert-name'),region=document.querySelector('#cert-region'),message=document.querySelector('#cert-message'),state=document.querySelector('#cert-state'),hint=document.querySelector('#cert-hint'),print=document.querySelector('#print-cert');
 const date=document.querySelector('#cert-date');const motion=matchMedia('(prefers-reduced-motion: reduce)');
 function display(record){name.textContent=record.name||'당신의 이름';region.textContent=record.region||'지역을 선택해주세요';message.textContent=record.message||'작은 관심이 모여, 우리의 내일을 바꿉니다.';date.textContent=new Date(record.createdAt||Date.now()).toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric'})}
 function preview(){cert.classList.remove('sealed');state.textContent='작성 중';print.disabled=true;hint.textContent='작성한 이름과 문장이 연대서에 반영됩니다.';display({name:form.elements.name.value.trim(),region:form.elements.region.value,message:form.elements.message.value.trim()})}
 form.addEventListener('input',preview);form.addEventListener('change',preview);preview();
 document.addEventListener('solidarity:signed',e=>{display(e.detail);state.textContent='연대 완료';hint.textContent='직인을 찍어 연대서를 완성했습니다. 이 브라우저에만 저장됩니다.';print.disabled=false;cert.classList.remove('sealed');void cert.offsetWidth;cert.classList.add('sealed');cert.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'center'})});
 cert.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||motion.matches)return;const r=cert.getBoundingClientRect();cert.style.setProperty('--rx',`${-(e.clientY-r.top-r.height/2)/r.height*4}deg`);cert.style.setProperty('--ry',`${(e.clientX-r.left-r.width/2)/r.width*5}deg`)});
 cert.addEventListener('pointerleave',()=>{cert.style.setProperty('--rx','0deg');cert.style.setProperty('--ry','0deg')});print.addEventListener('click',()=>window.print());
})();
