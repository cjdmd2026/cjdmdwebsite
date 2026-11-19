/* Shared controls for the existing broadcast engine and physical radio dials. */
(()=>{
 const deck=document.querySelector('.radio-console'),radio=document.getElementById('radioMedia');
 if(!deck||!radio)return;
 const panel=radio.closest('.time-panel');
 const ui=document.createElement('div');ui.className='rg-layout';
 ui.innerHTML=`<div class="rg-programme"><a class="rg-photo" href="https://archives.kdemo.or.kr/isad/view/00731619" target="_blank" rel="noopener noreferrer" title="1964.09.25 라디오 부스 녹음 현장 · 경향신문 / 민주화운동기념사업회"><img src="assets/images/radio-studio-1964.jpg?v=photo1" loading="eager" decoding="async" alt="1964년 라디오 부스에서 마이크 앞에 앉아 녹음하는 사람들과 악단"></a><div class="rg-info"><div class="rg-meta"><span class="rg-frequency"></span><span class="rg-live" role="status">● OFF AIR</span></div><h2 class="rg-title"></h2><p class="rg-description" aria-live="polite" aria-atomic="true"></p></div></div><div class="rg-tuning"><div class="rg-dial-row"><div class="rg-dial"><div class="rg-scale" aria-hidden="true"></div><div class="rg-ticks" aria-hidden="true"></div><div class="rg-needle" aria-hidden="true"></div><input class="rg-tuner" type="range" min="0" max="2" step="0.01" value="0" aria-label="방송 주파수 조절"></div></div><div class="rg-channels" role="group" aria-label="라디오 방송 채널"></div></div>`;
 deck.replaceChildren(ui);deck.hidden=false;
 const q=s=>ui.querySelector(s),api=()=>window.YEARON_RADIO,tuner=q('.rg-tuner'),channelRoot=q('.rg-channels');
 let programmes=[{title:'밤의 음악다방',english:'Night Music Café'},{title:'가요 산책',english:'A Walk Through Pop'},{title:'이어온소식',english:'YEAR:ON News'},{title:'오후의 다이얼',english:'Afternoon Dial'}],last='',dragging=false;
 fetch('assets/audio/radio-production/manifest-five.json?v=dial-music-order-20261116').then(r=>r.json()).then(data=>{programmes=data;last='';paint()}).catch(()=>{});
 programmes.forEach((p,i)=>{const item=document.createElement('div');item.dataset.rgChannel=i;item.innerHTML=`<span>CH ${String(i+1).padStart(2,'0')}</span><span class="rg-channel-title"></span>`;channelRoot.append(item)});
 const dial=q('.rg-dial');let pointer=null;
 function dragTune(e,commit=false){const r=dial.getBoundingClientRect(),am=api()?.getState().band==='AM',min=am?540:88,max=am?1600:108,low=am?621:89.1,high=am?1377:101.1,hz=min+Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*(max-min),value=Math.max(0,Math.min(2,(hz-low)/(high-low)*2));tuner.value=value;api()?.tune(value,commit);last='';paint()}
 tuner.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();pointer=e.pointerId;dragging=true;tuner.setPointerCapture(pointer);dragTune(e)});
 tuner.addEventListener('pointermove',e=>{if(pointer===e.pointerId)dragTune(e)});
 const end=e=>{if(pointer!==e.pointerId)return;pointer=null;dragging=false;dragTune(e,true);radio.dispatchEvent(new Event('yearon-radio-channel-used'))};
 tuner.addEventListener('pointerup',end);tuner.addEventListener('pointercancel',()=>{pointer=null;dragging=false;last='';paint()});
 tuner.addEventListener('input',()=>{dragging=true;api()?.tune(Number(tuner.value),false);paint()});
 tuner.addEventListener('change',()=>{dragging=false;api()?.tune(Number(tuner.value),true);last='';paint()});
 const photos=[
 {src:'assets/images/radio-studio-1964.jpg',alt:'1964년 라디오 녹음 현장',source:'https://archives.kdemo.or.kr/isad/view/00731619',credit:'경향신문 · 민주화운동기념사업회'},
 {src:'assets/images/archive-v2/bts-wembley-fans-2019.jpg',alt:'공연을 함께 즐기는 관객들',source:'https://commons.wikimedia.org/wiki/File:Fans_during_BTS_Love_Yourself_concert_at_Wembley_Stadium,_1_June_2019.jpg',credit:'NenehTrainer · CC BY 3.0 · 2019'},
 {src:'assets/images/archive-v2/community-roof-1973.jpg',alt:'1973년 마을 지붕 개량 작업',source:'https://commons.wikimedia.org/wiki/File:%EB%86%8D%EC%B4%8C_%EC%83%88%EB%A7%88%EC%9D%84_%EC%9A%B4%EB%8F%99_%EC%A7%80%EB%B6%95_%EA%B0%9C%EB%9F%89_%EC%9E%91%EC%97%85.jpg',credit:'한국정책방송원 · 공공누리 제1유형'},
 {src:'assets/images/archive-v2/seoul-street-view-1950.jpg',alt:'1950년 무렵 서울 거리',source:'https://www.trumanlibrary.gov/photograph-records/2017-200',credit:'Gene Putnam · Harry S. Truman Library & Museum · Public domain'}
 ];
 photos.forEach(p=>{const image=new Image();image.src=p.src});
 function paint(){
  const state=api()?.getState();if(!state)return;
  const en=window.YEARON_LANG==='en',p=programmes[state.selected],failed=!!state.errorMessage;
  const audio=document.getElementById('radioAudio'+state.selected),cue=state.playing&&p.cues?.find(c=>audio&&audio.currentTime>=c.start&&audio.currentTime<c.end);
  const subtitle=cue?(en?cue.en:cue.label):state.playing?(en?p.summary_en:p.summary)||'':state.loading?(en?'Tuning in…':'방송을 맞추고 있어요…'):state.powered?(en?'Turn the dial to find a station.':'다이얼을 돌려 방송을 맞춰보세요.'):(en?'Turn on the top power knob, then tune in.':'상단 전원을 켜고, 다이얼로 방송을 맞춰보세요.'),key=JSON.stringify([state,en,programmes,failed,subtitle]);
  if(key===last)return;last=key;
  const am=state.band==='AM',low=am?621:89.1,high=am?1377:101.1,min=am?540:88,max=am?1600:108,hz=low+(high-low)*state.position/2;
  deck.style.setProperty('--rg-needle',((hz-min)/(max-min)*100)+'%');
  tuner.style.left='0';tuner.style.width='100%';
  if(!dragging)tuner.value=state.position;
  tuner.setAttribute('aria-valuetext',state.band+' '+api().frequencyLabel());
  q('.rg-frequency').textContent=state.band+' '+api().frequencyLabel();
  q('.rg-title').textContent=en?p.english:p.title;const photo=photos[state.selected],anchor=q('.rg-photo'),picture=anchor.querySelector('img');if(picture.getAttribute('src')!==photo.src){picture.src=photo.src;picture.alt=photo.alt;picture.dataset.channel=String(state.selected);anchor.href=photo.source;anchor.title=photo.alt+' · '+photo.credit;anchor.setAttribute('aria-label',photo.alt+' — '+photo.credit)}
  q('.rg-description').textContent=subtitle;
  q('.rg-live').textContent=failed?'● RETRY':state.loading?'● TUNING':state.playing?'● ON AIR':'● OFF AIR';
  if(failed)q('.rg-description').textContent=state.errorMessage;
  deck.dataset.playing=String(state.playing);deck.dataset.powered=String(state.powered);deck.dataset.loading=String(state.loading);
  const ticks=am?['540','700','900','1100','1300','1500','1600']:['88','90','92','94','96','98','100','102','104','106','108'];
  const scale=q('.rg-scale');if(scale.dataset.band!==state.band){scale.dataset.band=state.band;scale.replaceChildren(...ticks.map(value=>{const span=document.createElement('span');span.textContent=value;return span}))}
  channelRoot.querySelectorAll('[data-rg-channel]').forEach((b,i)=>{b.querySelector('.rg-channel-title').textContent=en?programmes[i].english:programmes[i].title;b.setAttribute('aria-current',String(i===state.selected));b.setAttribute('aria-label',`CH ${i+1} ${en?programmes[i].english:programmes[i].title}`)});
 }
 const timer=setInterval(()=>{if(panel.classList.contains('active')&&!document.hidden)paint()},150);
 radio.addEventListener('yearon-radio-state',paint);
 addEventListener('yearon-language-change',()=>{last='';paint()});radio.addEventListener('yearon-radio-station',()=>{last='';paint()});
 addEventListener('pagehide',()=>clearInterval(timer),{once:true});paint();
})();
