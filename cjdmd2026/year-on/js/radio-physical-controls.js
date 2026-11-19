(()=>{
 const radio=document.querySelector('#radioMedia'),tuner=document.querySelector('#radioTuner');if(!radio||!tuner)return;
 radio.querySelectorAll('.radio-tuning-knob,.radio-stop-knob').forEach(b=>b.remove());
 const controls=document.createElement('div');controls.className='radio-four-dials';
 controls.innerHTML='<button class="radio-power" type="button" aria-label="라디오 전원" aria-pressed="false"><span>클릭: 전원 ON / OFF</span></button><input class="radio-volume" type="range" min="0" max="100" value="80" aria-label="라디오 볼륨"><input class="radio-frequency" type="range" min="0" max="2" value="0" step="0.01" aria-label="라디오 주파수"><button class="radio-band" type="button" aria-label="AM/FM 선택" aria-pressed="false"><span>FM</span></button>';
 radio.append(controls);const power=controls.querySelector('.radio-power'),volume=controls.querySelector('.radio-volume'),frequency=controls.querySelector('.radio-frequency'),band=controls.querySelector('.radio-band');
 const volumeBadge=document.createElement('output');volumeBadge.className='radio-volume-badge';volumeBadge.setAttribute('aria-hidden','true');controls.append(volumeBadge);
 function updateVolumeBadge(){volumeBadge.textContent=Math.round(Number(volume.value))+'%';volumeBadge.style.left=(volume.offsetLeft+volume.offsetWidth/2)+'px';volumeBadge.style.top=(volume.offsetTop-volume.offsetHeight*.1)+'px';}
 let volumeHeld=false;
 const showVolumeBadge=()=>{updateVolumeBadge();volumeBadge.classList.add('is-visible')};
 const hideVolumeBadge=()=>{if(!volumeHeld)volumeBadge.classList.remove('is-visible')};
 volume.addEventListener('pointerenter',showVolumeBadge);volume.addEventListener('focus',showVolumeBadge);volume.addEventListener('pointerleave',hideVolumeBadge);volume.addEventListener('blur',hideVolumeBadge);
 volume.addEventListener('pointerdown',()=>{volumeHeld=true;showVolumeBadge()});
 addEventListener('pointerup',()=>{if(!volumeHeld)return;volumeHeld=false;if(!volume.matches(':hover,:focus-visible'))hideVolumeBadge()});
 addEventListener('pointercancel',()=>{volumeHeld=false;hideVolumeBadge()});
 addEventListener('resize',updateVolumeBadge);
 const markers={};
 ['power','volume','frequency'].forEach(name=>{const marker=document.createElement('i');marker.className='radio-dial-index radio-dial-index-'+name;marker.setAttribute('aria-hidden','true');controls.append(marker);markers[name]=marker;});
 function updateMarkers(){const state=window.YEARON_RADIO?.getState();markers.power.style.transform='rotate('+(-115+powerLevel*2.3)+'deg)';markers.volume.style.transform='rotate('+(-115+Number(volume.value)*2.3)+'deg)';markers.frequency.style.transform='rotate('+(-115+Number(frequency.value)*115)+'deg)';}
 const receiver=()=>window.YEARON_RADIO;
 let powerLevel=0,draggingFrequency=false;
 power.setAttribute('aria-label','라디오 전원');
 let skipPowerClick=false,lastVolume=.4;
 const cap=document.createElement('i');cap.className='radio-power-cap';cap.setAttribute('aria-hidden','true');power.prepend(cap);
 const shell=radio.querySelector(':scope > img');if(shell)power.style.setProperty('--radio-shell','url("'+shell.src+'")');
 power.onclick=()=>{
  if(skipPowerClick){skipPowerClick=false;return;}
  const state=receiver()?.getState();if(!state)return;
  if(!state.powered)receiver().setVolume(lastVolume);
  else if(state.volume>.03)lastVolume=state.volume;
  receiver().togglePower();paint();
 };
 function turnPower(value){
  const targetLevel=Math.max(0,Math.min(100,value));powerLevel=targetLevel;
  const state=receiver()?.getState();if(!state)return;
  if(powerLevel>3&&!state.powered)receiver().togglePower();
  if(powerLevel<=3&&state.powered)receiver().togglePower();
  powerLevel=targetLevel;
  volume.value=String(Math.round(powerLevel));
  receiver().setVolume(powerLevel/100);
  if(powerLevel>3)lastVolume=powerLevel/100;
  
  updateMarkers();
 }
 function rotary(element,get,set,range,commit){
  let drag=null;
  element.addEventListener('pointerdown',event=>{
   if(event.button!==0)return;event.preventDefault();
   drag={id:event.pointerId,x:event.clientX,y:event.clientY,value:get()};if(element===power){skipPowerClick=false;element.classList.add('is-pressing');}
   element.setPointerCapture(event.pointerId);element.classList.add('is-turning');element.focus({preventScroll:true});
   if(element===frequency)draggingFrequency=true;
  });
  element.addEventListener('pointermove',event=>{
   if(!drag||drag.id!==event.pointerId)return;
   const pixels=(event.clientX-drag.x)-(event.clientY-drag.y);
   if(Math.abs(pixels)<4)return;if(element===power){skipPowerClick=true;element.classList.remove('is-pressing');}
   set(Math.max(0,Math.min(range,drag.value+pixels*range/140)));
  });
  const end=event=>{if(!drag||drag.id!==event.pointerId)return;drag=null;element.classList.remove('is-turning','is-pressing');if(element===frequency)draggingFrequency=false;commit?.();};
  element.addEventListener('pointerup',end);element.addEventListener('pointercancel',end);
  element.addEventListener('lostpointercapture',end);
 }

 rotary(frequency,()=>Number(frequency.value),v=>{frequency.value=String(v);updateFrequency(false)},2,()=>updateFrequency(true));
 power.addEventListener('keydown',event=>{
  let value=powerLevel;
  if(['ArrowRight','ArrowUp'].includes(event.key))value+=5;
  else if(['ArrowLeft','ArrowDown'].includes(event.key))value-=5;
  else if(event.key==='Home')value=0;
  else if(event.key==='End')value=100;
  else return;event.preventDefault();turnPower(value);
 });
 volume.oninput=()=>{
   powerLevel=Number(volume.value);receiver()?.setVolume(powerLevel/100);
   volume.setAttribute('aria-valuetext',volume.value+'%');
   updateVolumeBadge();
   updateMarkers();
 };
 function updateFrequency(commit){
   updateMarkers();
   const position=Number(frequency.value);
   receiver()?.tune(position,commit);if(commit)radio.dispatchEvent(new Event('yearon-radio-channel-used')); 
   frequency.setAttribute('aria-valuetext',receiver()?.frequencyLabel()||'89.1 MHz');
   radio.dispatchEvent(new CustomEvent('yearon-radio-tuning',{detail:{position:Number(frequency.value)}}));
 }
 frequency.addEventListener('input',()=>updateFrequency(false));
 frequency.addEventListener('change',()=>updateFrequency(true));
 band.onclick=()=>{
   const am=band.getAttribute('aria-pressed')!=='true';
   band.setAttribute('aria-pressed',String(am));
   band.querySelector('span').textContent=am?'AM':'FM';
   receiver()?.setBand(am?'AM':'FM');
   paint();
 };
 function paint(){
   power.setAttribute('aria-pressed',String(radio.classList.contains('on')));
   const state=receiver()?.getState();if(state){powerLevel=state.powered?Math.round(state.volume*100):0;volume.value=String(powerLevel);if(powerLevel>3)lastVolume=powerLevel/100;}
   power.removeAttribute('title');
   if(!draggingFrequency)frequency.value=String(receiver()?.getState().position??Number(tuner.value));
   frequency.setAttribute('aria-valuetext',receiver()?.frequencyLabel()||'89.1 MHz');
   updateMarkers();updateVolumeBadge();
 }
 radio.addEventListener('yearon-radio-station',paint);
 new MutationObserver(paint).observe(radio,{attributes:true,attributeFilter:['class']});
 const tooltip=document.createElement('div');tooltip.className='radio-knob-tooltip';tooltip.hidden=true;document.body.append(tooltip);
 const hints=[[power,'눌러 전원을 켜고 끄세요','Press to turn power on or off'],[frequency,'다이얼을 잡고 좌우로 드래그해 채널을 돌려보세요','Drag the dial left or right to tune'],[volume,'좌우로 드래그해 음량을 조절하세요','Drag left or right to adjust volume'],[band,'눌러 AM / FM을 바꿔보세요','Press to switch AM / FM']];
 let firstUse=true,hovering=false;
 function placeHint(control,ko,en){const english=window.YEARON_LANG==='en';const titles=control===power?['전원 버튼을 눌러보세요','Press the power button']:control===frequency?['주파수를 맞춰보세요','Tune the frequency']:control===volume?['음량을 조절해보세요','Adjust the volume']:['AM / FM을 바꿔보세요','Switch AM / FM'];let title=tooltip.querySelector('b'),detail=tooltip.querySelector('small');if(!title){title=document.createElement('b');detail=document.createElement('small');tooltip.replaceChildren(title,detail)}title.textContent=titles[english?1:0];detail.textContent=english?en:ko;const b=control.getBoundingClientRect();const shell=radio.getBoundingClientRect();tooltip.style.left=Math.min(innerWidth-180,shell.right+24)+'px';tooltip.style.top=(b.top+b.height/2-4)+'px';tooltip.style.setProperty('--radio-hint-line',Math.max(16,Math.min(innerWidth-180,shell.right+24)-b.right-9)+'px');if(innerWidth<=850){tooltip.style.left=(shell.left+shell.width/2)+'px';tooltip.style.top=(shell.bottom+8)+'px';}tooltip.hidden=false}
 function initialHint(){const active=radio.closest('.time-panel')?.classList.contains('active');if(false&&firstUse&&active&&!hovering){placeHint(power,'첫 번째 버튼을 눌러 전원을 켜보세요','Press the first button to turn on')}else if(!active)tooltip.hidden=true}
 hints.forEach(([control,ko,en])=>{const show=()=>{hovering=true;placeHint(control,ko,en)};control.addEventListener('pointerenter',show);control.addEventListener('focus',show);const leave=()=>{hovering=false;tooltip.hidden=true;initialHint()};control.addEventListener('pointerleave',leave);control.addEventListener('blur',leave);control.addEventListener('pointerdown',()=>{firstUse=false;tooltip.hidden=true})});
 new MutationObserver(initialHint).observe(radio.closest('.time-panel'),{attributes:true,attributeFilter:['class']});
 addEventListener('pageshow',()=>{firstUse=true;initialHint()});addEventListener('resize',initialHint);addEventListener('yearon-language-change',initialHint);/* Initial instructions are owned by media-interaction-cues. */

 paint();
})();
