(() => {
 const form=document.querySelector('#ask');
 if(!form)return;
 const feedback=document.querySelector('#feedback');
 const button=form.querySelector('button[type="submit"]');
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(button.disabled||!form.reportValidity())return;
  button.disabled=true;button.textContent='접수 중';feedback.textContent='';
  const payload=Object.fromEntries(new FormData(form).entries());
  try{
   const response=await fetch('/apuchika/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   if(!response.ok)throw new Error('inquiry_failed');
   feedback.textContent='문의가 접수되었습니다.';
   form.reset();
  }catch{
   feedback.textContent='문의가 접수되지 않았습니다. 잠시 후 다시 시도해 주세요.';
  }finally{button.disabled=false;button.textContent='문의하기';}
 });
})();
