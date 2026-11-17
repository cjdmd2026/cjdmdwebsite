    const screens=[...document.querySelectorAll('.screen')];
    const stepNow=document.querySelector('#stepNow');
    const progress=document.querySelector('#progressBar');
    const form=document.querySelector('#solidarityForm');
    const nameInput=document.querySelector('#name');
    const messageInput=document.querySelector('#message');
    const count=document.querySelector('#count');
    const error=document.querySelector('#error');
    const certificateNo=document.querySelector('#certificateNo');
    const certificateDate=document.querySelector('#certificateDate');
    let current=0,sendTimer;
    function prepareCertificate(){
      const now=new Date();
      const stamp=String(now.getFullYear()).slice(-2)+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0');
      certificateNo.textContent=`CJS-${stamp}-${String(Math.floor(Math.random()*900)+100)}`;
      certificateDate.textContent=new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'long',day:'numeric'}).format(now);
    }
    function show(step){
      clearTimeout(sendTimer);current=step;
      screens.forEach((screen,i)=>screen.classList.toggle('active',i===step));
      stepNow.textContent=String(Math.min(step+1,6)).padStart(2,'0');
      progress.style.width=`${Math.min((step+1)*(100/6),100)}%`;
      if(step===3){prepareCertificate();setTimeout(()=>nameInput.focus(),500)}
    }
    document.addEventListener('click',e=>{
      const next=e.target.closest('[data-next]'),prev=e.target.closest('[data-prev]');
      if(next)show(Math.min(current+1,3));
      if(prev)show(Math.max(current-1,0));
    });
    messageInput.addEventListener('input',()=>count.textContent=messageInput.value.length);
    function makeParticles(){
      const box=document.querySelector('#particles');box.innerHTML='';
      for(let i=0;i<84;i++){
        const p=document.createElement('i');p.className='particle';
        p.style.setProperty('--sx',`${-150+Math.random()*300}px`);
        p.style.setProperty('--sy',`${-230+Math.random()*250}px`);
        p.style.setProperty('--ex',`${-20+Math.random()*40}px`);
        p.style.setProperty('--s',`${1.5+Math.random()*5.5}px`);
        p.style.setProperty('--d',`${3.6+Math.random()*1.8}s`);
        p.style.setProperty('--delay',`${.75+Math.random()*1.25}s`);box.appendChild(p);
      }
    }
    form.addEventListener('submit',e=>{
      e.preventDefault();const person=nameInput.value.trim(),message=messageInput.value.trim();
      if(!person||!message){error.textContent='이름과 한마디를 모두 적어주세요.';return}
      error.textContent='';document.querySelector('#letterName').textContent=person;
      document.querySelector('#letterMessage').textContent=message;
      document.querySelector('#signaturePreview').textContent=`${person}님의 빛이 나무에 머물렀습니다.`;
      const entries=JSON.parse(localStorage.getItem('solidarity-tree-entries')||'[]');
      entries.push({name:person,message,createdAt:new Date().toISOString()});
      localStorage.setItem('solidarity-tree-entries',JSON.stringify(entries.slice(-100)));
      makeParticles();show(4);sendTimer=setTimeout(()=>show(5),7000);
    });
    document.querySelector('#restart').addEventListener('click',()=>{
      form.reset();count.textContent='0';show(0);
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&current>0&&current<4)show(current-1)});
