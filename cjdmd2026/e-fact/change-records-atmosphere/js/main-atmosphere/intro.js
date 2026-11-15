(() => {
  const video=document.querySelector('#film'), stage=document.querySelector('.cinema');
  const invitation=document.querySelector('#invitation'), gate=document.querySelector('#play-gate');
  const sound=document.querySelector('#sound'), pause=document.querySelector('#pause'), replay=document.querySelector('#replay');
  let revealed=false;
  function reveal(){
    if(revealed)return;
    revealed=true;stage.classList.add('ready');invitation.inert=false;invitation.setAttribute('aria-hidden','false');
    document.querySelector('#status').textContent='청주 소각시설 현황 버튼으로 E.FACT 메인 페이지에 들어갈 수 있습니다.';
  }
  function update(){
    const duration=video.duration;
    if(Number.isFinite(duration)&&duration>0){
      document.querySelector('#progress').style.transform=`scaleX(${Math.min(1,video.currentTime/duration)})`;
      // Reveal during the final 22% (at most 3 seconds), keeping the last frame after playback.
      if(video.currentTime>=duration-Math.min(3,duration*.22))reveal();
    }
    const t=Math.floor(video.currentTime||0);
    document.querySelector('#time').textContent=`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
  }
  async function play(){try{await video.play();gate.hidden=true}catch{gate.hidden=false}}
  video.addEventListener('timeupdate',update);video.addEventListener('loadedmetadata',update);
  video.addEventListener('play',()=>{gate.hidden=true;pause.textContent='일시정지 Ⅱ';pause.setAttribute('aria-label','영상 일시정지')});
  video.addEventListener('pause',()=>{pause.textContent='재생 ▷';pause.setAttribute('aria-label','영상 재생')});
  video.addEventListener('ended',()=>{reveal();replay.hidden=false;pause.hidden=true;update()});
  function failure(){reveal();gate.hidden=true;pause.hidden=true;sound.hidden=true;document.querySelector('#status').textContent='영상을 불러올 수 없습니다. 청주 소각시설 현황 버튼으로 이동할 수 있습니다.'}
  video.addEventListener('error',failure);video.querySelector('source').addEventListener('error',failure);
  gate.addEventListener('click',play);
  pause.addEventListener('click',()=>video.paused?play():video.pause());
  sound.addEventListener('click',()=>{video.muted=!video.muted;sound.textContent=video.muted?'소리 켜기':'소리 끄기';sound.setAttribute('aria-pressed',String(!video.muted))});
  replay.addEventListener('click',()=>{revealed=false;stage.classList.remove('ready');invitation.inert=true;invitation.setAttribute('aria-hidden','true');video.currentTime=0;replay.hidden=true;pause.hidden=false;play()});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){video.autoplay=false;video.pause();reveal();}else{play()}
})();
