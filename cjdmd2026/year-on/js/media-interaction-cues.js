(()=>{
  const items=[
    {era:'1780',host:'.scroll-media',target:'.scroll-media',en:['Drag right to unfold the painting','After unfolding, select a glowing spot'],ko:['오른쪽으로 끌어 그림을 펼쳐보세요','그림을 펼친 후 스팟을 선택해보세요']},
    {era:'1920',host:'.paper-media',target:'.paper-media',en:['Drag to turn the newspaper pages','Explore the articles and everyday life of the time'],ko:['드래그하여 지면을 넘겨보세요','당시의 기사와 생활 모습을 살펴보세요']},
    {era:'1955',host:'#radioMedia',target:'.radio-four-dials button, .radio-four-dials input, .radio-antenna, #radioTuner, .radio-presets button',en:['PRESS THE FIRST DIAL','Click for power; drag for volume. Tune with the fourth dial.'],ko:['전원 버튼을 눌러보세요','상단 첫 번째 다이얼을 눌러 전원을 켜보세요']},
    {era:'1988',host:'#television',target:'#channelDial, #prevChannel, #nextChannel, #channelNav button',en:['TURN THE DIAL','Change the channel'],ko:['채널을 돌려보세요','위쪽 원형 다이얼을 드래그해\n채널을 바꿔보세요']},
    {era:'2002',host:'.pc-media',target:'#pcPower, .pc-icons button',en:['PRESS POWER','Then open the Internet icon'],ko:['전원 버튼을 눌러보세요','부팅 후 인터넷 아이콘을 열어보세요']},
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
    record.reset=()=>{record.used=false;record.radioPhase=0;clearTimeout(record.showTimer);const copy=item[window.YEARON_LANG==='en'?'en':'ko'];cue.querySelector('b').textContent=copy[0];cue.querySelector('small').textContent=copy[1];cue.classList.remove('is-hidden');cue.classList.toggle('is-visible',panel.classList.contains('active'));requestGuides()};
    const dismiss=()=>{
      if(record.used)return;
      record.used=true;
      clearTimeout(record.showTimer);
      cue.classList.remove('is-visible');
      cue.classList.add('is-hidden');host.querySelector(':scope > .cue-target-light')?.classList.remove('is-visible');
    };
    if(item.era==='1955'){
      record.radioPhase=0;
      host.addEventListener('yearon-radio-state',()=>{
        if(!panel.classList.contains('active'))return;
        if(!window.YEARON_RADIO?.getState().powered){record.reset();return}
        if(window.YEARON_RADIO?.getState().powered&&record.radioPhase===0){
          record.radioPhase=1;
          dismiss();
          cue.querySelector('b').textContent=window.YEARON_LANG==='en'?'TUNE THE CHANNEL':'채널을 바꿔보세요';
          cue.querySelector('small').textContent=window.YEARON_LANG==='en'?'Drag the frequency ruler left or right':'상단 두 번째 다이얼을 좌우로 드래그하세요. 아래 주파수 눈금에서도 바꿀 수 있어요.';
          requestGuides();
        }
      });
      host.addEventListener('yearon-radio-channel-used',()=>{if(record.radioPhase===1)dismiss()});
    }else if(item.era==='1988'){
      addEventListener('yearon-crt-power',event=>{if(typeof event.detail?.powered!=='boolean')return;record.reset();if(!event.detail.powered){cue.querySelector('b').textContent=window.YEARON_LANG==='en'?'Press the power button':'전원 버튼을 눌러보세요';cue.querySelector('small').textContent=window.YEARON_LANG==='en'?'Press the small upper-right knob':'오른쪽 위 작은 전원 다이얼을 눌러보세요'}requestGuides()});
      addEventListener('yearon-crt-channel-tuned',()=>{if(panel.classList.contains('active'))dismiss()});
    }else if(item.era==='1780'){
      host.addEventListener('yearon-scroll-reveal',()=>{if(parseFloat(host.style.getPropertyValue('--scroll-progress'))>.3)dismiss()});
    }else if(item.era==='1920'){
      let start;
      host.addEventListener('pointerdown',e=>start=e.clientX,{passive:true});
      addEventListener('pointerup',e=>{if(start!==undefined&&panel.classList.contains('active')&&Math.abs(e.clientX-start)>35)dismiss();start=undefined},{passive:true});
    }else{
      if(item.era==='2002'){const screen=panel.querySelector('.pc-screen-ui');let wasOn=screen?.classList.contains('is-on');if(screen)new MutationObserver(()=>{const on=screen.classList.contains('is-on');if(wasOn&&!on)record.reset();if(!wasOn&&on){record.used=false;cue.classList.remove('is-hidden');cue.classList.add('is-visible');cue.querySelector('b').textContent=window.YEARON_LANG==='en'?'Open the Internet window':'인터넷 창을 열어보세요';cue.querySelector('small').textContent=window.YEARON_LANG==='en'?'Double-click the Internet icon on the desktop':'바탕화면의 인터넷 아이콘을 두 번 눌러보세요';requestGuides()}wasOn=on}).observe(screen,{attributes:true,attributeFilter:['class']})}
      if(item.era==='2002'){const layer=panel.querySelector('#pcWindowLayer');if(layer)new MutationObserver(()=>{if(layer.querySelector('.pc-window[data-app=internet]'))dismiss()}).observe(layer,{childList:true,subtree:true})}
      if(item.era==='2026'){const app=panel.querySelector('.social-app');let wasHome=false;if(app)new MutationObserver(()=>{const home=app.classList.contains('phone-is-home')||app.classList.contains('phone-is-locked');if(home&&!wasHome)record.reset();wasHome=home}).observe(app,{attributes:true,attributeFilter:['class']})}
      panel.addEventListener('click',e=>{if(item.era==='2002'?false:e.target.closest('.phone-yearon-app'))dismiss()});
    }
  });
  const update=()=>records.forEach(record=>{
    clearTimeout(record.showTimer);
    if(!record.panel.classList.contains('active')){
      record.cue.classList.remove('is-visible');record.cue.parentElement.querySelector(':scope > .cue-target-light')?.classList.remove('is-visible');
      record.used=false;record.radioPhase=0;record.cue.classList.remove('is-hidden');const copy=record.item[window.YEARON_LANG==='en'?'en':'ko'];record.cue.querySelector('b').textContent=copy[0];record.cue.querySelector('small').textContent=copy[1];
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
    records.forEach(({item,panel,cue,radioPhase})=>{
      const target=panel.querySelector(item.era==='2002'&&panel.querySelector('.pc-screen-ui.is-on')?'.pc-desktop-icon[data-pc-open=internet]':item.era==='1955'&&radioPhase===1?'.radio-frequency':item.era==='1988'&&panel.querySelector('#television.tv-is-off')?'.tv-power-control':anchors[item.era]);if(!target)return;
      const t=target.getBoundingClientRect(),host=cue.parentElement,h=host.getBoundingClientRect();
      if(!t.width||!h.width)return;
      const scale=h.width/host.offsetWidth||1;
      const paper=item.era==='1920';
      const edge=t.right;
      cue.style.setProperty('position','absolute','important');
      cue.style.setProperty('transform','none','important');
      cue.style.setProperty('text-align','left','important');
      const cueWidth=cue.getBoundingClientRect().width||150;
      // Anchor the copy outside the object, in the same coordinate space as its control.
      let left=paper?t.right+22:['1780','2002'].includes(item.era)?t.right+32:Math.max(t.right+28,h.right+22);
      let top=t.top+t.height/2-5;
      if(left+cueWidth>innerWidth-20){
        if(innerWidth>800)left=Math.max(t.right+18,innerWidth-cueWidth-20);
        else {left=Math.max(20,Math.min(innerWidth-cueWidth-20,t.left));top=Math.max(150,h.top-48);}
      }
      cue.style.setProperty('left',((left-h.left)/scale)+'px','important');
      cue.style.setProperty('top',((top-h.top)/scale)+'px','important');
      let light=host.querySelector(':scope > .cue-target-light');if(!light){light=document.createElement('i');light.className='cue-target-light';light.setAttribute('aria-hidden','true');host.append(light)}light.style.left=((edge-h.left)/scale)+'px';light.style.top=((t.top+t.height/2-h.top)/scale)+'px';light.classList.toggle('is-visible',cue.classList.contains('is-visible')&&!cue.classList.contains('is-hidden'));
      const c=cue.getBoundingClientRect();
      let svg=cue.querySelector('svg.cue-guide');
      if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('cue-guide');svg.innerHTML='<path/><circle r="2"/>';cue.append(svg);}
      const x=(edge-c.left)/scale,y=(t.top+t.height/2-c.top)/scale;
      svg.querySelector('path').setAttribute('d',`M${x} ${y}H-8`);
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
