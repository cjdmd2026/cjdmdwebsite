/* Fictional radio programmes: recorded neural speech, creator-supplied narration and songs, vintage receiver processing. */
(()=>{
 const radio=document.getElementById('radioMedia'),tuner=document.getElementById('radioTuner'),deck=document.querySelector('.radio-console');
 if(!radio||!tuner||!deck)return;
 const directAudio=true; // Keep the programme on the native audio output in every browser.
 const panel=radio.closest('.time-panel'),buttons=[...radio.querySelectorAll('[data-radio-station]')];
 let errorMessage="";
 const titles=['밤의 음악다방','가요 산책','이어온소식','오후의 다이얼'];
 const english=['Night Music Café','A Walk Through Pop','YEAR:ON News','Afternoon Dial'];
 const frequencies={FM:[89.1,93.1,97.1,101.1],AM:[621,873,1125,1377]};
 const nearestStation=value=>Math.round(value*1.5);
 const isLocked=value=>Math.abs(value-nearestStation(value)/1.5)<.09;
 const presetStations=[0,1,2];
 let manifest=[],players=[],ctx,bus,analyser,levelData,volume=.8,band="FM",sourceNodes=[],selected=0,playing=false,token=0,lastCue='',loading=false;
 let broadcastTurn=Math.floor(Math.random()*3);
 let cueTimer=null;
 let bedSource=null;
 let powered=false,position=0,staticSource=null;
 let tuningSource=null,metadataCancel=null,tuningBuffer=null,switchBuffer=null,switchSource=null;
 const tuningData=fetch('assets/audio/radio-production/radio-static-quantumriver.mp3').then(r=>{if(!r.ok)throw Error('tuning');return r.arrayBuffer()}).catch(()=>null);
 const switchData=fetch('assets/audio/radio-production/radio_switch.mp3').then(r=>{if(!r.ok)throw Error('switch');return r.arrayBuffer()}).catch(()=>null);
 const ready=fetch('assets/audio/radio-production/manifest-five.json?v=dial-music-order-20261116').then(r=>{if(!r.ok)throw Error('broadcast manifest');return r.json()}).catch(()=>[{"title": "밤의 음악다방", "english": "Night Music Café", "src": "assets/audio/radio-production/night-cafe-donggun-songs.mp3", "summary": "동건의 밤 인사와 함께 듣는 우리의 지난날, 우리의 울림.", "summary_en": "A night-time introduction, followed by Our Past and Our Echo.", "cues": [{"start": 0, "end": 91.848, "label": "밤의 음악다방 · 오늘의 이야기", "en": "Night Music Café · Tonight’s story"}, {"start": 91.848, "end": 454.898, "label": "♪ 우리의 지난날", "en": "♪ Our Past"}, {"start": 454.898, "end": 759.648, "label": "♪ 우리의 울림", "en": "♪ Our Echo"}]}, {"title": "가요 산책", "english": "A Walk Through Pop", "src": "assets/audio/radio-production/yearon-radio-ch02.mp3", "summary": "〈우리의 지난날〉과 〈우리의 울림〉을 이어 듣는 시간.", "summary_en": "Listen to Our Past and Our Echo back to back.", "cues": [{"start": 0, "end": 363.05, "label": "♪ 우리의 지난날", "en": "♪ Our Past"}, {"start": 363.05, "end": 667.8, "label": "♪ 우리의 울림", "en": "♪ Our Echo"}]}, {"title": "이어온소식", "english": "YEAR:ON News", "src": "assets/audio/radio-production/yearon-news-user-20261116.mp3", "summary": "우리 주변의 생활과 이웃들의 이야기를 전합니다.", "summary_en": "Everyday stories from our neighbourhoods and the people around us.", "cues": [{"start": 0, "end": 4.4, "label": "청취자 여러분, 안녕하십니까. 이어온소식입니다.", "en": "Hello, listeners. This is YEAR:ON News."}, {"start": 4.4, "end": 9.0, "label": "오늘도 우리 주변에서 전해진 여러 가지 생활 소식을 전해 드리겠습니다.", "en": "Here are today’s everyday stories from the people around us."}]}, {"title": "오후의 다이얼", "english": "Afternoon Dial", "src": "assets/audio/radio-production/afternoon-dial-music-midway-20261116.mp3", "summary": "다이얼 너머로 흘러나오는 노래. 잠시 머물러 함께 들어보세요.", "summary_en": "A song already playing beyond the dial. Stay a moment and listen.", "cues": [], "broadcastVariants": ["assets/audio/radio-production/afternoon-dial-music-midway-20261116.mp3", "assets/audio/radio-production/afternoon-dial-music-start2-20261116.mp3", "assets/audio/radio-production/afternoon-dial-music-start3-20261116.mp3"]}]).then(data=>{manifest=data;titles.splice(0,4,...data.map(p=>p.title));english.splice(0,4,...data.map(p=>p.english));players=data.map((p,i)=>{const a=new Audio(p.src);a.id='radioAudio'+i;a.hidden=true;document.body.append(a);a.preload='metadata';a.loop=true;a.volume=directAudio?volume:.8;a.addEventListener('timeupdate',()=>{if(playing&&selected===i){const cue=p.cues.find(c=>a.currentTime>=c.start&&a.currentTime<c.end);const text=cue?(en()?cue.en:cue.label):(en()?p.summary_en:p.summary);if(text!==lastCue){lastCue=text;radio.dispatchEvent(new Event('yearon-radio-state'))}}});a.addEventListener('error',()=>{if(players[selected]===a&&playing)fail()});return a});return data});
 // Keep a failed prefetch handled; the next deliberate play presents an inline error.
 ready.then(()=>paint()).catch(()=>{});
 function en(){return window.YEARON_LANG==='en'}
 function localize(){lastCue='';paint()}

 function frequencyLabel(value=position){
 const scale=frequencies[band],low=scale[0],high=scale[scale.length-1],hz=low+(high-low)*value/2;
 return band==='FM'?hz.toFixed(1)+' MHz':Math.round(hz/9)*9+' kHz';
 }
 function paint(){
 radio.classList.toggle('on',powered);
 radio.dispatchEvent(new Event('yearon-radio-state'));
 }
 async function audioGraph(){
 if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();bus=ctx.createGain();bus.gain.value=volume;analyser=ctx.createAnalyser();analyser.fftSize=256;levelData=new Uint8Array(analyser.fftSize);const hp=ctx.createBiquadFilter(),lp=ctx.createBiquadFilter(),warm=ctx.createWaveShaper(),compress=ctx.createDynamicsCompressor(),mono=ctx.createGain();hp.type='highpass';hp.frequency.value=180;hp.Q.value=.65;lp.type='lowpass';lp.frequency.value=4200;lp.Q.value=.65;const curve=new Float32Array(2048);for(let i=0;i<curve.length;i++){const x=i*2/(curve.length-1)-1;curve[i]=Math.tanh(x*1.25)/Math.tanh(1.25)}warm.curve=curve;warm.oversample='2x';compress.threshold.value=-19;compress.knee.value=15;compress.ratio.value=2.2;compress.attack.value=.012;compress.release.value=.2;mono.channelCount=1;mono.channelCountMode='explicit';bus.connect(hp).connect(lp).connect(warm).connect(compress).connect(mono).connect(analyser);analyser.connect(ctx.destination);sourceNodes=players.map(a=>{const g=ctx.createGain();g.gain.value=0;if(!directAudio){const source=ctx.createMediaElementSource(a);source.connect(g).connect(bus)}return g})}
 const resumed=ctx.resume();if(!tuningBuffer){const bytes=await tuningData;if(bytes)tuningBuffer=await ctx.decodeAudioData(bytes.slice(0)).catch(()=>null)}return resumed;
 }
 async function clickSwitch(){
 try{await ready;await audioGraph();if(!panel.classList.contains('active')||document.hidden)return;
 if(!switchBuffer){const data=await switchData;if(data)switchBuffer=await ctx.decodeAudioData(data.slice(0))}
 if(!switchBuffer||!panel.classList.contains('active')||document.hidden)return;
 if(switchSource){try{switchSource.stop()}catch(e){}}
 const sound=ctx.createBufferSource(),gain=ctx.createGain();sound.buffer=switchBuffer;gain.gain.value=.65;sound.connect(gain).connect(bus);switchSource=sound;sound.onended=()=>{if(switchSource===sound)switchSource=null;sound.disconnect();gain.disconnect()};sound.start();
 }catch(e){}
 }
 function tuning(){
 if(!ctx||!bus)return Promise.resolve();
 if(tuningBuffer){const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=tuningBuffer;gain.gain.setValueAtTime(.0001,ctx.currentTime);gain.gain.linearRampToValueAtTime(.25,ctx.currentTime+.035);gain.gain.linearRampToValueAtTime(.0001,ctx.currentTime+.60);source.connect(gain).connect(bus);tuningSource=source;return new Promise(resolve=>{source.onended=()=>{if(tuningSource===source)tuningSource=null;source.disconnect();gain.disconnect();resolve()};source.start(0,0,.62)})}
 const now=ctx.currentTime,duration=.42,buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate),d=buffer.getChannelData(0);
 for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(.35+.65*Math.sin(i/d.length*Math.PI)**2);
 const s=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();s.buffer=buffer;filter.type='bandpass';filter.Q.value=.7;filter.frequency.setValueAtTime(1100,now);filter.frequency.exponentialRampToValueAtTime(4300,now+.17);filter.frequency.exponentialRampToValueAtTime(800,now+duration);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.065,now+.045);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);s.connect(filter).connect(gain).connect(bus);tuningSource=s;s.start();s.stop(now+duration);return new Promise(resolve=>{s.onended=()=>{if(tuningSource===s)tuningSource=null;s.disconnect();filter.disconnect();gain.disconnect();resolve()}});
 }
 function stopBed(){clearTimeout(cueTimer);cueTimer=null;if(bedSource){try{bedSource.stop()}catch(e){}bedSource=null}}
 function startBed(){stopBed();if(!ctx)return;const buffer=ctx.createBuffer(1,ctx.sampleRate*3,ctx.sampleRate),d=buffer.getChannelData(0);let previous=0;for(let i=0;i<d.length;i++){previous=.78*previous+.22*(Math.random()*2-1);d[i]=previous}const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffer;source.loop=true;gain.gain.value=.035;source.connect(gain).connect(bus);source.onended=()=>{source.disconnect();gain.disconnect()};source.start();bedSource=source}
 function stopStatic(){
 if(staticSource){staticSource.stop();staticSource=null}
 }
 function idleNoise(){
 if(!ctx||staticSource||!panel.classList.contains('active')||document.hidden)return;
 const buffer=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),samples=buffer.getChannelData(0);
 for(let i=0;i<samples.length;i++)samples[i]=Math.random()*2-1;
 const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
 source.buffer=buffer;source.loop=true;filter.type='bandpass';filter.frequency.value=band==='AM'?1050:3100;
 gain.gain.value=band==='AM'?.085:.055;
 source.connect(filter).connect(gain).connect(bus);
 source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect()};
 staticSource=source;source.start();
 }
 function stop(){stopBed();powered=false;stopStatic();token++;if(switchSource){try{switchSource.stop()}catch(e){}switchSource=null}if(metadataCancel){metadataCancel();metadataCancel=null}if(tuningSource){try{tuningSource.stop()}catch(e){}tuningSource=null}players.forEach(a=>a.pause());sourceNodes.forEach(g=>{g.gain.cancelScheduledValues(ctx.currentTime);g.gain.setValueAtTime(0,ctx.currentTime)});playing=false;loading=false;position=0;selected=0;tuner.value='0';lastCue='';paint()}
 function fail(){stop();errorMessage=en()?'Audio could not load. Choose a broadcast to try again.':'방송을 불러오지 못했습니다. 방송 버튼을 눌러 다시 시도해 주세요.';paint()}
 async function play(index){
 if(!panel.classList.contains('active')||document.hidden)return;
 powered=true;errorMessage="";stopBed();stopStatic();
 const request=++token;if(metadataCancel){metadataCancel();metadataCancel=null}if(tuningSource){try{tuningSource.stop()}catch(e){}tuningSource=null}const fading=players.findIndex(a=>!a.paused);
 if(fading>=0&&ctx){
 const gain=sourceNodes[fading].gain,now=ctx.currentTime;
 gain.cancelAndHoldAtTime(now);
 gain.linearRampToValueAtTime(0,now+.12);
 }else players.forEach(a=>a.pause());
 playing=false;selected=Math.max(0,Math.min(3,index));position=selected/1.5;tuner.value=String(position);loading=true;paint();radio.dispatchEvent(new Event('yearon-radio-station'));
 try{
 await ready;if(request!==token)return;
 if(directAudio){
   players.forEach(a=>a.pause());const a=players[selected],variants=manifest[selected].broadcastVariants;
   if(variants?.length){a.src=variants[broadcastTurn++%variants.length];a.load()}
   a.volume=volume;a.currentTime=0;await a.play();if(request!==token){a.pause();return}
   playing=true;loading=false;lastCue='';paint();return;
 }
 await audioGraph();if(request!==token)return;
 if(fading>=0){await new Promise(resolve=>setTimeout(resolve,130));if(request!==token)return}
 players.forEach(a=>a.pause());sourceNodes.forEach(g=>{g.gain.cancelScheduledValues(ctx.currentTime);g.gain.setValueAtTime(0,ctx.currentTime)});await tuning();if(request!==token)return;
 const a=players[selected],variants=manifest[selected].broadcastVariants;if(variants?.length){a.src=variants[broadcastTurn++%variants.length];a.load();}if(a.readyState<1)await new Promise((resolve,reject)=>{
 let timer;const cleanup=()=>{clearTimeout(timer);a.removeEventListener('loadedmetadata',done);a.removeEventListener('error',bad);if(metadataCancel===cancel)metadataCancel=null};
 const done=()=>{cleanup();resolve()};const bad=()=>{cleanup();reject(Error('audio load'))};const cancel=()=>{cleanup();resolve()};
 metadataCancel=cancel;a.addEventListener('loadedmetadata',done,{once:true});a.addEventListener('error',bad,{once:true});timer=setTimeout(bad,12000);a.load();
 });
 if(request!==token)return;
 a.currentTime=0;
 await a.play();if(request!==token){if(a!==players[selected]||(!playing&&!loading))a.pause();return}
 const g=sourceNodes[selected].gain;g.setValueAtTime(0,ctx.currentTime);g.linearRampToValueAtTime(1,ctx.currentTime+.28);startBed();playing=true;loading=false;lastCue='';paint();const intro=manifest[selected].cues?.[0]?.start||0;if(intro>.8&&selected!==1)cueTimer=setTimeout(()=>{if(request===token&&playing)tuning()},(intro-.62)*1000);
 }catch(e){if(request===token)fail()}
 }
 buttons.forEach((b,i)=>{b.onclick=()=>play(presetStations[i])});
 async function tune(value,commit=false){
 position=value;
 const nearest=nearestStation(value),locked=isLocked(value);
 if(!powered){selected=nearest;tuner.value=String(nearest/1.5);paint();return}
 if(locked&&playing&&selected===nearest){return}
 if(commit){position=nearest/1.5;play(nearest);return}
 if(playing||loading){
 const fading=players.findIndex(a=>!a.paused),request=++token;
 if(tuningSource){try{tuningSource.stop()}catch(e){}tuningSource=null}
 if(metadataCancel){metadataCancel();metadataCancel=null}
 stopBed();playing=false;loading=false;
 if(fading>=0&&ctx){
 const gain=sourceNodes[fading].gain,now=ctx.currentTime;
 gain.cancelAndHoldAtTime(now);
 gain.linearRampToValueAtTime(0,now+.12);
 await new Promise(resolve=>setTimeout(resolve,130));
 if(request!==token)return;
 players[fading].pause();
 }else players.forEach(a=>a.pause());
 if(value!==position)return;
 }
 selected=nearest;tuner.value=String(nearest/1.5);paint();
 const request=token;
 try{await ready;if(request!==token||!powered)return;await audioGraph();
 if(request===token&&powered&&!playing&&!loading&&players.every(a=>a.paused))idleNoise()}catch(e){if(request===token)fail()}
 }
 function togglePower(){
 if(powered)stop();
 else{position=0;selected=0;tuner.value='0';play(0)}
 clickSwitch();
 }
 tuner.oninput=null;tuner.addEventListener('input',()=>{
 position=Number(tuner.value);selected=nearestStation(position);
 if(powered)play(selected);else{paint();radio.dispatchEvent(new Event('yearon-radio-station'))}
 });


 new MutationObserver(()=>{if(!panel.classList.contains('active')&&powered)stop()}).observe(panel,{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});addEventListener('pagehide',stop);addEventListener('yearon-language-change',localize);
 window.YEARON_RADIO={stop,play,tune,togglePower,frequencyLabel,setVolume(v){volume=Math.max(0,Math.min(1,v));if(directAudio)players.forEach(a=>a.volume=volume);if(bus)bus.gain.setTargetAtTime(volume,ctx.currentTime,.04)},setBand(v){band=v==="AM"?"AM":"FM";stopStatic();if(powered&&playing)play(selected);else tune(position,true)},getLevel(){if(!playing||!analyser)return 0;analyser.getByteTimeDomainData(levelData);return Math.sqrt(levelData.reduce((s,v)=>s+((v-128)/128)**2,0)/levelData.length)},getState(){return{powered,playing,loading,selected,position,volume,band,errorMessage}}};localize();
})();
