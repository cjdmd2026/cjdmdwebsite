(()=>{
  'use strict';
  const cards=[...document.querySelectorAll('.impact-card')];
  const hotspots=[...document.querySelectorAll('.body-hotspot')];
  const guide=document.querySelector('.body-guide');
  const dialog=document.querySelector('#impact-dialog');
  const mount=document.querySelector('#impact-dialog-content');
  const close=document.querySelector('#impact-dialog-close');
  const stage=document.querySelector('.body-stage-profile');
  const baseImage=document.createElement('img');
  const stateImage=document.createElement('img');
  const anatomyAssets={chloride:'../images/pages/assets/anatomy-hcl.svg',sulfur:'../images/pages/assets/anatomy-sox.svg',dust:'../images/pages/assets/anatomy-pm.svg',nitrogen:'../images/pages/assets/anatomy-nox.svg',carbon:'../images/pages/assets/anatomy-co.svg'};
  if(stage){
    baseImage.className='body-base-image';
    baseImage.src=anatomyAssets.chloride;
    baseImage.alt='오염물질 반응 위치를 선택할 수 있는 인체 측면 해부 도식';
    stateImage.className='body-state-image';
    stateImage.alt='선택한 오염물질의 주요 반응 부위를 표시한 인체 측면 해부 도식';
    stage.prepend(baseImage,stateImage);
  }
  if(!cards.length)return;

  function readCard(card){
    const summary=card.querySelector('summary');
    return{code:summary?.querySelector('.impact-code')?.textContent||'',icon:summary?.querySelector('.impact-icon')?.innerHTML||'',label:summary?.querySelector('small')?.textContent||'',title:summary?.querySelector('b')?.textContent||'',detail:card.querySelector('.impact-detail')?.cloneNode(true),tone:[...card.classList].find(name=>name!=='impact-card')||''};
  }
  function selectHotspot(trigger){
    hotspots.forEach(node=>node.classList.toggle('is-active',node===trigger));
    const next=anatomyAssets[trigger?.dataset.impact];
    if(!stateImage||!next)return;
    stateImage.classList.remove('is-selected');
    stateImage.onload=()=>requestAnimationFrame(()=>stateImage.classList.add('is-selected'));
    if(stateImage.getAttribute('src')===next){requestAnimationFrame(()=>stateImage.classList.add('is-selected'));return;}
    stateImage.src=next;
  }
  function showInline(card,trigger){
    if(!guide)return;
    const data=readCard(card);
    guide.className=`body-guide body-result ${data.tone}`;
    guide.replaceChildren();
    const head=document.createElement('div');
    head.className='body-result-head';
    const names=document.createElement('div');
    const code=document.createElement('strong');
    code.textContent=data.code;
    const label=document.createElement('small');
    label.textContent=data.label;
    names.append(code,label);
    const icon=document.createElement('span');
    icon.className='body-result-icon';
    icon.innerHTML=data.icon;
    head.append(names,icon);
    const title=document.createElement('h4');
    title.textContent=data.title;
    guide.append(head,title);
    if(data.detail)guide.append(data.detail);
    selectHotspot(trigger);
  }
  function showModal(card){
    if(!dialog||!mount)return;
    const data=readCard(card);
    mount.className=`impact-dialog-card ${data.tone}`;
    mount.replaceChildren();
    const visual=document.createElement('div');
    visual.className='impact-dialog-visual';
    const code=document.createElement('span');
    code.className='impact-dialog-code';
    code.textContent=data.code;
    const icon=document.createElement('span');
    icon.className='impact-dialog-icon';
    icon.innerHTML=data.icon;
    visual.append(code,icon);
    const copy=document.createElement('div');
    copy.className='impact-dialog-copy';
    const small=document.createElement('small');
    small.textContent=data.label;
    const title=document.createElement('h3');
    title.id='impact-dialog-title';
    title.textContent=data.title;
    copy.append(small,title);
    if(data.detail)copy.append(data.detail);
    mount.append(visual,copy);
    dialog.showModal();
    document.body.classList.add('impact-modal-open');
    close?.focus();
  }
  cards.forEach(card=>{
    card.removeAttribute('open');
    card.querySelector('summary')?.addEventListener('click',event=>{event.preventDefault();showModal(card);});
  });
  hotspots.forEach(node=>node.addEventListener('click',()=>{
    const card=cards.find(item=>item.classList.contains(node.dataset.impact));
    if(card)showInline(card,node);
  }));
  function closeDialog(){dialog?.close();document.body.classList.remove('impact-modal-open');}
  close?.addEventListener('click',closeDialog);
  dialog?.addEventListener('click',event=>{if(event.target===dialog)closeDialog();});
  dialog?.addEventListener('close',()=>document.body.classList.remove('impact-modal-open'));
  /* No pollutant is selected initially: the anatomy remains a neutral white-line drawing. */
})();
