(() => {
  const film=document.querySelector('#kaFilm'); if(!film)return;
  const main=document.querySelector('#cultureArchive'); const header=document.querySelector('.global-header');
  const audio=document.querySelector('#kaFilmAudio'); const sound=document.querySelector('#kaFilmSound'); const skip=document.querySelector('#kaFilmSkip'); const field=film.querySelector('.ka-film-field');
  const narration={"en": {"src": "assets/audio/karchive-intro-en-male-v7-20261113.m4a", "voice": "en-US-ChristopherNeural", "language": "en", "duration": 50.803, "cues": [{"start": 0.4, "end": 4.785, "text": "Over time, our everyday lives and culture have changed in many ways."}, {"start": 5.165, "end": 9.248, "text": "Yet people continue to come together and share their experiences today."}, {"start": 9.628, "end": 14.553, "text": "People enjoying music together, sharing food, and cheering at the same moment."}, {"start": 14.933, "end": 26.058, "text": "At concerts, we sing the same songs. At sports grounds, we support one team. At festivals, different people gather to enjoy a shared moment."}, {"start": 26.438, "end": 34.188, "text": "We find this not only on special occasions, but also in ordinary life, as people spend time together and share their days."}, {"start": 34.568, "end": 41.921, "text": "Cultural forms and expressions change with each era, while relationships and a culture of togetherness continue in new ways."}, {"start": 42.301, "end": 46.816, "text": "This sense of WE-NESS can still be found throughout Korean culture today."}, {"start": 47.196, "end": 49.973, "text": "Explore its many forms in K-ARCHIVE."}]}, "ko": {"src": "assets/audio/karchive-intro-en-male-v7-20261113.m4a", "voice": "en-US-ChristopherNeural", "language": "en", "duration": 50.803, "cues": [{"start": 0.4, "end": 4.785, "text": "시대가 흐르며 우리의 일상과 문화는 다양한 모습으로 변화해 왔습니다."}, {"start": 5.165, "end": 9.248, "text": "하지만 사람들과 함께하고, 서로의 경험을 나누는 모습은 오늘날에도 이어지고 있습니다."}, {"start": 9.628, "end": 14.553, "text": "음악을 함께 즐기고, 음식을 나누며, 같은 순간에 환호하는 사람들."}, {"start": 14.933, "end": 26.058, "text": "공연장에서는 같은 노래를 부르고, 스포츠 경기장에서는 한 팀을 응원하며, 축제에서는 서로 다른 사람들이 모여 하나의 순간을 즐깁니다."}, {"start": 26.438, "end": 34.188, "text": "이러한 모습은 특별한 순간뿐만 아니라, 사람들과 어울리고 일상을 나누는 평범한 생활 속에서도 발견할 수 있습니다."}, {"start": 34.568, "end": 41.921, "text": "시대에 따라 문화의 형태와 표현 방식은 달라졌지만, 사람들 사이의 관계와 함께하는 문화는 새로운 모습으로 이어지고 있습니다."}, {"start": 42.301, "end": 46.816, "text": "이처럼 오늘날 한국 문화 곳곳에서도 발견할 수 있는 우리성(WE-NESS)."}, {"start": 47.196, "end": 49.973, "text": "K-ARCHIVE에서 그 다양한 모습을 살펴봅니다."}]}};
  const symbols=[Array.from({length:8},(_,i)=>`<circle cx="50" cy="23" r="6" transform="rotate(${i*45} 50 50)"/>`).join(''),Array.from({length:6},(_,i)=>`<ellipse cx="50" cy="36" rx="16" ry="22" transform="rotate(${i*60} 50 50)" fill="none" stroke="currentColor" stroke-width="1.3"/>`).join(''),Array.from({length:10},(_,i)=>`<ellipse cx="50" cy="26" rx="3.5" ry="10" transform="rotate(${i*36} 50 50)"/>`).join(''),'<path d="M22 54 C10 14 70 10 79 42 S24 70 22 43 S82 47 70 74 S24 78 22 54" fill="none" stroke="currentColor" stroke-width="1.5"/>'];
  const labels=['K-POP','FOOD','SPORTS','FESTIVAL','DAILY LIFE']; const motifs=[1,0,2,1,3];
  const angleStep=360/labels.length;
  const radiansStep=2*Math.PI/labels.length;
  field.innerHTML=labels.map((label,i)=>`<div class="ka-film-card" style="--n:${i};--angle:${i*angleStep}deg;--x:${Math.sin(i*radiansStep)};--y:${-Math.cos(i*radiansStep)};--x2:${Math.sin((i+1)*radiansStep)};--y2:${-Math.cos((i+1)*radiansStep)}"><svg viewBox="0 0 100 100">${symbols[motifs[i]]}</svg><span>${label}</span></div>`).join('');
  const lang=(window.YEARON_LANG||localStorage.getItem('yearon-language'))==='en'?'en':'ko';
  const track=narration.en, other=narration.ko;
  const lineupStart=track.cues[2].start;
  const sequence=window.createYearonArchiveSequence?.(film);
  const scrollStage=document.createElement('div');
  scrollStage.className='ka-sequence-scroll';
  scrollStage.tabIndex=0;
  scrollStage.setAttribute('role','region');
  scrollStage.setAttribute('aria-label','스크롤하여 K-ARCHIVE 인트로 탐색');
  scrollStage.innerHTML='<div class="ka-sequence-distance"></div><span class="ka-sequence-cue" aria-hidden="true">SCROLL TO EXPLORE ↓</span>';
  scrollStage.hidden=true;
  film.append(scrollStage);
  audio.src=track.src;
  let closed=false,frame=0,visualStart=performance.now(),lastStage=-1,pausedAt=0,enabled=true;
  main.inert=true; document.body.classList.add('ka-film-open');
  const fitHeader=()=>film.style.top=header.getBoundingClientRect().bottom+'px'; const ro=new ResizeObserver(fitHeader); ro.observe(header); fitHeader();
  function setSound(on){enabled=on;audio.muted=!on;sound.textContent=on?'SOUND ON':'SOUND OFF';sound.setAttribute('aria-pressed',String(on));}
  function close(){if(closed)return;closed=true;ro.disconnect();audio.pause();cancelAnimationFrame(frame);film.hidden=true;
 document.documentElement.style.setProperty('--ka-entry-top',header.getBoundingClientRect().bottom+'px');
 const finish=()=>{main.inert=false;document.body.classList.remove('ka-film-open')};
 if(window.createYearonArchiveEntry)window.createYearonArchiveEntry(finish);else finish();}
  function renderScrollStage(){
    const distance=scrollStage.scrollHeight-scrollStage.clientHeight;
    const progress=Math.min(1,scrollStage.scrollTop/Math.max(1,distance));
    sequence.render(.65+progress*(sequence.duration-.65));
    film.style.setProperty('--progress',progress);
    scrollStage.classList.toggle('has-scrolled',progress>.025);
    if(progress>=.999)close();
  }
  scrollStage.addEventListener('scroll',renderScrollStage,{passive:true});
  function elapsed(){return Math.max(0,(performance.now()-visualStart)/1000);}
  function tick(){if(closed)return;const time=elapsed(),progress=Math.min(1,time/track.duration);film.style.setProperty('--progress',progress);film.style.setProperty('--core-opacity',Math.max(0,Math.min(1,(lineupStart-time)/.8)));document.querySelector('#kaFilmTime').textContent=String(Math.floor(time/60)).padStart(2,'0')+':'+String(Math.floor(time%60)).padStart(2,'0');const stage=track.cues.reduce((s,c,i)=>time>=c.start?i:s,0);if(stage!==lastStage){lastStage=stage;film.dataset.scene=Math.min(3,Math.floor(stage*4/track.cues.length));document.querySelector('#kaFilmCaption').textContent=other.cues[stage].text;document.querySelector('#kaFilmTranslation').textContent=track.cues[stage].text;}if(time>=track.duration){
      audio.pause();
      if(!sequence?.duration){close();return;}
      scrollStage.hidden=false;
      renderScrollStage();
      if(!film.contains(document.activeElement))scrollStage.focus({preventScroll:true});
      return;
    }
    frame=requestAnimationFrame(tick);}
  async function play(){if(elapsed()>=track.duration)return;try{audio.currentTime=Math.min(elapsed(),track.duration);await audio.play();}catch(e){setSound(false);}}
  function visibility(){if(closed||!scrollStage.hidden)return;if(document.hidden){pausedAt=performance.now();audio.pause();cancelAnimationFrame(frame);}else{visualStart+=performance.now()-pausedAt;if(enabled)play();frame=requestAnimationFrame(tick);}}
  sound.addEventListener('click',()=>{setSound(!enabled);if(enabled)play();else audio.pause();});skip.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});document.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',()=>{audio.pause();cancelAnimationFrame(frame);});frame=requestAnimationFrame(tick);play();
})();
