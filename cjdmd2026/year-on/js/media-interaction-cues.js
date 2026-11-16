(()=>{
  const items=[
    {era:'1780',host:'.scroll-media',target:'.scroll-media',en:['PULL THE RIGHT ROLLER','Drag right to reveal the painting'],ko:['오른쪽 봉을 당겨보세요','오른쪽으로 끌어 그림을 펼쳐보세요']},
    {era:'1920',host:'.paper-media',target:'.paper-media',en:['DRAG LEFT TO UNFOLD','Drag right to return'],ko:['왼쪽으로 밀어 펼쳐보세요','오른쪽으로 밀면 이전 지면으로 돌아갑니다']},
    {era:'1955',host:'#radioMedia',target:'.radio-four-dials button, .radio-four-dials input, .radio-antenna, #radioTuner, .radio-presets button',en:['PRESS THE FIRST DIAL','Click for power; drag for volume. Tune with the fourth dial.'],ko:['첫 번째 다이얼을 눌러보세요','클릭: 전원 ON / OFF · 드래그: 음량\n네 번째 다이얼: 주파수 찾기']},
    {era:'1988',host:'#television',target:'#channelDial, #prevChannel, #nextChannel, #channelNav button',en:['TURN THE DIAL','Change the channel'],ko:['채널을 돌려보세요','위쪽 원형 다이얼을 드래그해\n채널을 바꿔보세요']},
    {era:'2002',host:'.pc-media',target:'#pcPower, .pc-icons button',en:['PRESS POWER','Then open a desktop app'],ko:['전원 버튼을 눌러보세요','부팅 후 바탕화면 앱을 열어보세요']},
    {era:'2026',host:'.phone-media',target:'.social-app',en:['OPEN YEAR:ON','Tap the app to explore the feed'],ko:['YEAR:ON 앱을 열어보세요','앱을 눌러 일상 속 기록을 살펴보세요']}
  ];
  const records=[];
  const paintLanguage=()=>{
    const key=window.YEARON_LANG==='en'?'en':'ko';
    records.forEach(({cue,item})=>{
      const copy=item[key];
      cue.querySelector('b').textContent=copy[0];
      const detail=cue.querySelector('small');
      detail.textContent=copy[1];
      if(item.era==='1988')detail.style.whiteSpace='pre-line';
    });
  };
  items.forEach(item=>{
    if(item.era==='1955')return;
    const panel=document.querySelector(`.time-panel[data-era="${item.era}"]`);
    const host=panel?.querySelector(item.host);
    if(!panel||!host)return;
    const cue=document.createElement('div');
    cue.className='interaction-cue';
    cue.setAttribute('aria-hidden','true');
    cue.innerHTML='<b></b><small></small>';
    host.appendChild(cue);
    const record={item,panel,cue,used:false,showTimer:0};
    records.push(record);
    const dismiss=()=>{
      if(record.used)return;
      record.used=true;
      clearTimeout(record.showTimer);
      cue.classList.remove('is-visible');
      cue.classList.add('is-hidden');
    };
    if(item.era==='1988'){
      addEventListener('yearon-crt-channel-tuned',()=>{
        if(panel.classList.contains('active'))dismiss();
      });
      return;
    }
    panel.querySelectorAll(item.target).forEach(target=>{
      target.addEventListener('pointerdown',dismiss,{passive:true});
      target.addEventListener('wheel',dismiss,{passive:true});
      target.addEventListener('keydown',event=>{
        if(['Enter',' ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))dismiss();
      });
    });
  });
  const update=()=>records.forEach(record=>{
    clearTimeout(record.showTimer);
    if(!record.panel.classList.contains('active')){
      record.cue.classList.remove('is-visible');
      if(record.item.era==='1988')record.used=false;
      return;
    }
    if(record.used)return;
    if(record.item.era==='1988'){
      record.cue.classList.remove('is-hidden');
      record.cue.classList.add('is-visible');
      requestGuides();
      return;
    }
    record.showTimer=setTimeout(()=>{
      if(!record.panel.classList.contains('active')||record.used)return;
      record.cue.classList.remove('is-hidden');
      record.cue.classList.add('is-visible');
      requestGuides();setTimeout(requestGuides,400);
    },300);
  });
  const observer=new MutationObserver(()=>{update();requestGuides();});
  records.forEach(record=>observer.observe(record.panel,{attributes:true,attributeFilter:['class']}));
  window.addEventListener('yearon-language-change',paintLanguage);
  paintLanguage();

  const continuation=document.querySelector('.era-now');
  const previous=document.querySelector('#timeNav button[data-index="4"]');
  if(continuation)document.body.append(continuation);
  const compact=matchMedia('(max-width:800px)');

  // Draw guide lines to the actual hit targets, after responsive media sizing.
  function alignGuides(){
    if(continuation?.getClientRects().length&&previous?.offsetHeight){
      const bounds=previous.getBoundingClientRect();
      const line=getComputedStyle(previous,'::after');
      const lineTop=parseFloat(line.top);
      const center=compact.matches||!Number.isFinite(lineTop)
        ? bounds.top+bounds.height/2
        : bounds.top+(previous.clientTop+lineTop+(parseFloat(line.height)||1)/2)*bounds.height/previous.offsetHeight;
      continuation.style.setProperty('--continue-axis',center+'px');
    }
    const anchors={'1780':'#scrollMedia>.scroll-right-roller','1920':'.paper-book','1955':'.radio-power','1988':'#channelDial','2002':'#pcPower','2026':'.phone-yearon-app'};
    records.forEach(({item,panel,cue})=>{
      const target=panel.querySelector(anchors[item.era]);if(!target)return;
      const t=target.getBoundingClientRect(),host=cue.parentElement,h=host.getBoundingClientRect();
      if(!t.width||!h.width)return;
      const scale=h.height/host.offsetHeight||1;
      const paper=item.era==='1920';
      const edge=paper?t.left+t.width*.75:t.right;
      if(paper&&!compact.matches)cue.style.setProperty('left',((edge-h.left)/scale+32)+'px','important');
      cue.style.setProperty('top',((t.top+t.height/2-h.top)/scale-5)+'px','important');
      if(paper){
        const edgeX=Math.min(innerWidth-175,t.right+22);
        cue.style.setProperty('position','fixed','important');
        // The host can be transformed: keep positioning in its local coordinates.
        cue.style.setProperty('position','absolute','important');
        cue.style.setProperty('left',((edgeX-h.left)/scale)+'px','important');
        cue.style.setProperty('top',((t.top+t.height*.45-h.top)/scale)+'px','important');
      }
      const c=cue.getBoundingClientRect();
      let svg=cue.querySelector('svg.cue-guide');
      if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('cue-guide');svg.innerHTML='<path/><circle r="2"/>';cue.append(svg);}
      const x=(edge-c.left)/scale,y=5;
      svg.querySelector('path').setAttribute('d',`M${x} 5H-8`);
      svg.querySelector('circle').setAttribute('cx',x);svg.querySelector('circle').setAttribute('cy',y);
    });
    const tv=document.querySelector('#television'),hint=tv?.querySelector('.tv-power-hint'),button=tv?.querySelector('.tv-power-control');
    if(hint&&button){const t=button.getBoundingClientRect(),h=tv.getBoundingClientRect();hint.style.top=((t.top+t.height/2-h.top)-7)+'px';hint.style.setProperty('--power-guide-length',Math.max(0,h.width*1.01-(t.right-h.left)-10)+'px');}
  }
  let guideFrame=0;const requestGuides=()=>{cancelAnimationFrame(guideFrame);guideFrame=requestAnimationFrame(alignGuides)};
  addEventListener('resize',requestGuides);addEventListener('yearon-crt-power',requestGuides);
  const guideObserver=new ResizeObserver(requestGuides);records.forEach(({cue})=>guideObserver.observe(cue.parentElement));
  document.querySelector('#timeTrack')?.addEventListener('transitionend',requestGuides);
  document.querySelectorAll('.time-panel img').forEach(img=>img.addEventListener('load',requestGuides));
  if(previous)guideObserver.observe(previous);
  addEventListener('pageshow',()=>{records.forEach(r=>{r.used=false;r.cue.classList.remove('is-hidden')});update();requestGuides()});
  update();
  requestGuides();document.fonts?.ready.then(requestGuides);
})();
