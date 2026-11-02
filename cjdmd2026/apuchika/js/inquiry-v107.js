(() => {
 const dialog = document.getElementById('rental-inquiry-dialog');
 document.getElementById('open-rental-inquiry').addEventListener('click', () => dialog.showModal());
 dialog.querySelector('.rental-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', event => { if(event.target === dialog){ const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); }});
 document.getElementById('copy-rental-inquiry').addEventListener('click', async () => {
   const message=document.getElementById('rental-message');
   const status=document.getElementById('rental-copy-status');
   if(!message.value.trim()){status.textContent='문의 내용을 먼저 적어주세요.';message.focus();return;}
   try {await navigator.clipboard.writeText(`[아푸치카 대여 문의 · ${document.getElementById('rental-topic').value}]\n${message.value.trim()}`);status.textContent='문의 내용을 복사했어요. 아직 접수된 내용은 아니에요.';}
   catch {status.textContent='자동 복사가 어려워요. 작성한 내용을 선택해 복사해주세요.';message.focus();message.select();}
 });
})();
