/* =========================================================
   YEAR:ON 메인 페이지 JavaScript
   1. 채널 목록 만들기
   2. TV 화면에 채널 표시하기
   3. CRT 채널 전환 효과
   4. 버튼 / 다이얼 / 키보드 조작
   5. TV 화면 확대하기
   ========================================================= */

const channels = window.YEARON_CHANNELS;
const $ = (selector) => document.querySelector(selector);

const screen = $("#screenWindow");
const video = $("#channelVideo");
const placeholder = $("#placeholder");
const canvas = $("#staticCanvas");
const context = canvas.getContext("2d", { alpha: false });

let activeChannel = 0;
let hasTuned = false;
video.muted=false;video.defaultMuted=false;video.removeAttribute("muted");video.volume=.75;
let isChanging = false;
let noiseFrame = 0;
let noisePixels=null,lastNoiseTime=0,signalAttempt=0;
const tvPanel=screen.closest('.time-panel');
function playTvSignal(){
  if(!hasTuned||!signalVisible())return;
  const source=video.currentSrc||video.src;
  video.play().catch(error=>{
    if(error.name!=='NotAllowedError'||!signalVisible()||source!==(video.currentSrc||video.src))return;
    video.muted=true;video.play().catch(()=>{});
  });
}
function signalVisible(){return screen.dataset.power!=='off'&&screen.dataset.power!=='stopping'&&!document.hidden&&(!tvPanel||tvPanel.classList.contains('active'))}
function syncSignalNoise(){
 const waiting=!hasTuned||!document.querySelector('#channelStage').classList.contains('has-video');
 if(!signalVisible()){if(!video.paused)video.pause();}
 else if(hasTuned&&!isChanging&&video.readyState>=3&&video.paused)playTvSignal();
 screen.classList.toggle('crt-no-signal',waiting);
 if(signalVisible()&&(waiting||isChanging)){
   if(!noiseFrame)drawNoise(performance.now());
 }
 else{cancelAnimationFrame(noiseFrame);noiseFrame=0;stopStaticAudio();}
}
let staticAudio = null;
let isWheelLocked = false;
let dragStart = null;
let dialWasDragged = false;
let dialRotation = 0;
let dialDragAngle = 0;
let dialDragRotation = 0;
const dialStep = 45;
const dialPhoto = document.createElement('span');
dialPhoto.className = 'original-dial-photo';
dialPhoto.setAttribute('aria-hidden', 'true');
document.querySelector('#channelDial').append(dialPhoto);
let dialChannel = 0;
let dialAnimation = 0;
let handleFrame = 0;
function renderHandle(frame) {
  handleFrame = ((Math.round(frame) % 4) + 4) % 4;
  dialPhoto.style.backgroundPosition = '100% 0%';
}
renderHandle(0);
const dialPreload = new Image();
dialPreload.src = 'assets/images/dial-turn-sequence.webp';

function setDialRotation(rotation, dragging = false) {
  const target = ((Math.round(rotation / dialStep) % 4) + 4) % 4;
  // A repeated channel sync must not restart an in-flight turn.
  if (!dragging && rotation === dialRotation && dialAnimation) return;
  cancelAnimationFrame(dialAnimation);
  dialAnimation = 0;
  renderHandle(target);
  dialRotation = rotation;
  const dial = $("#channelDial");
  dial.style.setProperty("--dial-rotation", `${rotation}deg`);
  dial.classList.toggle("is-dragging", dragging);
}

function syncDialToChannel(index = activeChannel) {
  let steps = index - dialChannel;
  if (steps > channels.length / 2) steps -= channels.length;
  if (steps < -channels.length / 2) steps += channels.length;
  const start = dragStart ? dialDragRotation : dialRotation;
  setDialRotation(start + steps * dialStep);
  dialChannel = index;
}

/* =========================
   1. 채널 버튼 만들기
   channels.js의 데이터 개수만큼 버튼을 자동 생성합니다.
   ========================= */
function updateCurrentChannel(){
 document.querySelectorAll('#channelNav .tv-station').forEach(el=>{const selected=hasTuned&&!channels[activeChannel].isAdvertisement&&Number(el.dataset.station)===activeChannel;el.classList.toggle('active',selected);if(selected)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current');});
}
function renderNavigation() {
 if(document.body.classList.contains('media-time-body')){
  $('#channelNav').innerHTML=channels.map((c,i)=>c.isAdvertisement?'':`<div class="tv-station" data-station="${i}"><b>CH ${c.number}</b><span>${c.name}</span></div>`).join('');updateCurrentChannel();return;
 }

  const channelButtons = channels.map((channel, index) => channel.isAdvertisement ? "" : `
    <button data-channel="${index}" class="${index === activeChannel ? "active" : ""}">
      <b>CH ${channel.number}</b>
      ${channel.name ? `<span>${channel.name}</span>` : ""}
    </button>
  `).join("");

  $("#channelNav").innerHTML = channelButtons;

  document.querySelectorAll("[data-channel]").forEach((button) => {
    button.addEventListener("click", () => {
      changeChannel(Number(button.dataset.channel));
    });
  });
}

/* =========================
   2. Canvas 크기와 지지직 노이즈
   노이즈는 채널이 바뀌는 짧은 순간에만 실행합니다.
   ========================= */
function fitCanvas() {
  const screenSize = screen.getBoundingClientRect();
  const density=Math.min(devicePixelRatio||1,1.0);
  const width=Math.max(2,Math.round(screenSize.width*density)),height=Math.max(2,Math.round(screenSize.height*density));
  if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;noisePixels=null;}
}

function drawNoise(time=performance.now()) {
  if(!signalVisible()){noiseFrame=0;return;}
  // Fine, subdued analogue grain. Idle static stays silent and runs at 20 fps.
  if(time-lastNoiseTime>=50){
    lastNoiseTime=time;
    if(!noisePixels||noisePixels.width!==canvas.width||noisePixels.height!==canvas.height)noisePixels=context.createImageData(canvas.width,canvas.height);
    const pixels=noisePixels.data;
    // Independent fine snow avoids the former diagonal moire pattern.
    for(let y=0;y<canvas.height;y++){
      const sweep=1-.13*Math.exp(-Math.pow((y/canvas.height-((time/3000)%1))/.12,2));
      for(let x=0;x<canvas.width;x++){
        const i=(y*canvas.width+x)*4;
        const grain=Math.random(),v=Math.pow(grain,1.15);
        pixels[i]=(24+v*178)*sweep;
        pixels[i+1]=(65+v*174)*sweep;
        pixels[i+2]=(110+v*142)*sweep;pixels[i+3]=255;
      }
    }
    context.putImageData(noisePixels,0,0);
  }
  noiseFrame=requestAnimationFrame(drawNoise);
}
function startNoise() {syncSignalNoise();startStaticAudio();}
function stopNoise() {stopStaticAudio();syncSignalNoise();}

function startStaticAudio() {
  stopStaticAudio();
  if (!signalVisible()) return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  const audioContext = window.__yearonCrtAudioContext || (window.__yearonCrtAudioContext = new AudioCtor());
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  const duration = .55;
  const buffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * duration), audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {const t=i/audioContext.sampleRate;const hiss=(Math.random()*2-1);const click=(t<.035?Math.sin(t*2200)*Math.exp(-t*125)*1.8:0)+(t>.12&&t<.15?Math.sin((t-.12)*3400)*Math.exp(-(t-.12)*190):0);data[i]=Math.max(-1,Math.min(1,hiss*.70+click));}
  const source = audioContext.createBufferSource();
  const high = audioContext.createBiquadFilter();
  const low = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  high.type = 'highpass'; high.frequency.value = 280;
  low.type = 'lowpass'; low.frequency.value = 5400;
  gain.gain.setValueAtTime(.0001, audioContext.currentTime);
  gain.gain.linearRampToValueAtTime(.10, audioContext.currentTime + .025);
  gain.gain.setValueAtTime(.055, audioContext.currentTime + .20);
  gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .5);
  source.buffer = buffer;
  source.connect(high).connect(low).connect(gain).connect(audioContext.destination);
  source.start();
  staticAudio = { source, gain, context: audioContext };
}

function stopStaticAudio() {
  if (!staticAudio) return;
  const { source, gain, context } = staticAudio;
  try {
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.setTargetAtTime(.0001, context.currentTime, .018);
    source.stop(context.currentTime + .1);
  } catch (_) {}
  staticAudio = null;
}

/* =========================
   3. 선택한 채널의 내용 표시
   영상 파일이 없으면 VIDEO SLOT 화면이 대신 보입니다.
   ========================= */
function showChannel(index) {
  const channel = channels[index];
  updateCurrentChannel();
  if(hasTuned){window.YEARON_TV_YEAR=String(channel.year||1980);dispatchEvent(new CustomEvent('yearon-tv-year-change',{detail:{year:window.YEARON_TV_YEAR}}));}
  const attempt=++signalAttempt;

  document.documentElement.style.setProperty("--channel", channel.color);
  document.documentElement.style.setProperty("--accent", channel.accent);

  $("#transmissionLabel").textContent = `TRANSMISSION ${channel.number}`;
  $("#channelEyebrow").textContent = `CH.${channel.number}${channel.name ? " · "+channel.name : ""}`;
  $("#channelTitle").innerHTML = channel.title;
  $("#channelMessage").textContent = window.YEARON_LANG === "en"
    ? channel.messageEn
    : channel.message;
  $("#osd").innerHTML = channel.isAdvertisement ? "" : `CH ${channel.number} <span>STEREO</span>`;
  placeholder.querySelector("strong").textContent = `CH.${channel.number}`;

  // 기존 영상을 멈추고 새 영상 경로를 불러옵니다.
  placeholder.classList.remove("hidden");
  $("#channelStage").classList.remove("has-video");
  video.pause();
  video.removeAttribute("src");
  video.load();
  if(!hasTuned||!channel.video){
    video.oncanplay=null;video.onerror=null;
    document.querySelectorAll("#channelNav button").forEach((button,buttonIndex)=>button.classList.toggle("active",hasTuned&&!channel.isAdvertisement&&Number(button.dataset.channel)===index));
    if(hasTuned)syncDialToChannel(index);
    syncSignalNoise();return;
  }
  // Install listeners before loading so a cached video cannot miss canplay.

  // 영상이 존재하면 재생하고, 없으면 안내 화면을 유지합니다.
  video.oncanplay = () => {
    if(attempt!==signalAttempt)return;
    placeholder.classList.add("hidden");
    $("#channelStage").classList.add("has-video");
    syncSignalNoise();
    if(signalVisible())playTvSignal();
  };

  video.onerror = () => {
    if(attempt!==signalAttempt)return;
    placeholder.classList.remove("hidden");
    $("#channelStage").classList.remove("has-video");
    syncSignalNoise();
  };

  video.src=channel.video;
  video.load();
  document.querySelectorAll("#channelNav button").forEach((button, buttonIndex) => {
    button.classList.toggle("active", !channel.isAdvertisement && Number(button.dataset.channel) === index);
  });
  syncDialToChannel(index);
  syncSignalNoise();
}

/* =========================
   4. CRT 채널 전환 순서
   STATIC → 화면 밀림 → 컬러 간섭 → 다음 채널
   숫자는 밀리초이므로 전환 속도를 바꿀 때 수정합니다.
   ========================= */
function changeChannel(nextIndex) {
  if (isChanging || screen.dataset.power==='off' || screen.dataset.power==='stopping') return;

  const safeIndex = (nextIndex + channels.length) % channels.length;
  if (hasTuned && safeIndex === activeChannel) return;
  hasTuned=true;video.muted=false;video.pause();
  dispatchEvent(new Event('yearon-crt-channel-tuned'));

  isChanging = true;
  syncDialToChannel(safeIndex);
  screen.classList.add("is-switching");
  startNoise();

  setTimeout(() => screen.classList.add("phase-roll"), 55);
  setTimeout(() => screen.classList.add("phase-bars"), 85);
  setTimeout(() => screen.classList.remove("phase-bars"), 190);
  setTimeout(() => screen.classList.add("phase-acquire"), 280);
  setTimeout(() => {activeChannel=safeIndex;showChannel(activeChannel);},310);
  setTimeout(() => {
    screen.classList.remove("phase-static", "phase-roll", "phase-bars", "phase-acquire", "is-switching");
    isChanging=false;stopNoise();
  },560);
}

/* =========================
   7. 버튼 클릭 연결
   ========================= */
$("#prevChannel")?.addEventListener("click", () => changeChannel(activeChannel - 1));
$("#nextChannel")?.addEventListener("click", () => changeChannel(hasTuned ? activeChannel + 1 : 0));
$("#channelDial").addEventListener("click", () => {
  if (dialWasDragged) {
    dialWasDragged = false;
    return;
  }
  changeChannel(hasTuned ? activeChannel + 1 : 0);
});
// TV stays in its physical cabinet; screen clicks no longer open an overlay.
screen.removeAttribute('role');screen.removeAttribute('tabindex');screen.setAttribute('aria-label','브라운관 화면');

/* 다이얼 드래그 조작 */
$("#channelDial").addEventListener("pointerdown", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  dialDragAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI;
  dialDragRotation = dialRotation;
  dragStart = { x: event.clientX, y: event.clientY, centerX, centerY };
  dialWasDragged = false;
  event.currentTarget.classList.add("is-dragging");
  event.currentTarget.setPointerCapture(event.pointerId);
});

$("#channelDial").addEventListener("pointermove", (event) => {
  if (!dragStart) return;
  const angle = Math.atan2(event.clientY - dragStart.centerY, event.clientX - dragStart.centerX) * 180 / Math.PI;
  let delta = angle - dialDragAngle;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  if (Math.abs(delta) > 4) dialWasDragged = true;
  setDialRotation(dialDragRotation + delta, true);
});

$("#channelDial").addEventListener("pointerup", (event) => {
  if (!dragStart) return;
  const angle = Math.atan2(event.clientY - dragStart.centerY, event.clientX - dragStart.centerX) * 180 / Math.PI;
  let delta = angle - dialDragAngle;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  event.currentTarget.classList.remove("is-dragging");
  if (dialWasDragged) changeChannel(activeChannel + (delta >= 0 ? 1 : -1));
  else syncDialToChannel();
  dragStart = null;
});

$("#channelDial").addEventListener("pointercancel", () => {
  dragStart = null;
  syncDialToChannel();
});

/* 키보드 조작: 방향키, 채널 번호 */
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    changeChannel(hasTuned ? activeChannel + 1 : 0);
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    changeChannel(activeChannel - 1);
  }

  const numberKey = Number(event.key) - 1;
  if (numberKey >= 0 && numberKey < channels.filter(channel=>!channel.isAdvertisement).length) {
    changeChannel(numberKey);
  }
});

/* 마우스 휠 조작 */
$(".broadcast-page").addEventListener("wheel", (event) => {
  if (document.body.classList.contains("media-time-body")) return;
  if (isWheelLocked || Math.abs(event.deltaY) < 18) return;

  isWheelLocked = true;
  changeChannel(activeChannel + (event.deltaY > 0 ? 1 : -1));

  setTimeout(() => {
    isWheelLocked = false;
  }, 820);
}, { passive: true });

/* 모바일 좌우 스와이프 */
let touchStartX = 0;

screen.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

screen.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 45) {
    changeChannel(activeChannel + (distance < 0 ? 1 : -1));
  }
});

/* =========================
   8. 페이지가 열릴 때 최초 실행
   ========================= */
window.addEventListener("resize", fitCanvas);
window.addEventListener("yearon-language-change", () => { renderNavigation(); showChannel(activeChannel); });
window.addEventListener("yearon-crt-visibility",syncSignalNoise);
video.addEventListener("play",()=>{if(!hasTuned)video.pause()});
renderNavigation();
showChannel(0);
fitCanvas();

/* Do not run off-screen grain or sound while another medium is in view. */
if(tvPanel)new MutationObserver(syncSignalNoise).observe(tvPanel,{attributes:true,attributeFilter:['class']});
document.addEventListener('visibilitychange',syncSignalNoise);
window.addEventListener('pagehide',()=>{cancelAnimationFrame(noiseFrame);noiseFrame=0;stopStaticAudio()});
syncSignalNoise();

new ResizeObserver(()=>{fitCanvas();syncSignalNoise()}).observe(screen);

window.addEventListener('yearon-crt-power',event=>{
  if(event.detail?.reset){
    signalAttempt++;video.oncanplay=null;video.onerror=null;video.pause();
    hasTuned=false;isChanging=false;screen.classList.remove('phase-static','phase-roll','phase-bars','phase-acquire','is-switching');
    showChannel(activeChannel);
  }
  fitCanvas();syncSignalNoise();
});

// Keep the passive station frame narrower than the physical CRT.
if(document.body.classList.contains('media-time-body')){
 const television=document.querySelector('#television'),footer=document.querySelector('.channel-footer');
 const fitStationFrame=()=>{if(!footer)return;const bounds=television.getBoundingClientRect(),width=bounds.width;footer.style.setProperty('--tv-frame-width',width+'px');footer.style.setProperty('width',(width*.90)+'px','important');footer.style.setProperty('position','absolute','important');footer.style.setProperty('margin','0','important');footer.style.setProperty('left','50%','important');footer.style.setProperty('transform','translateX(-50%)','important');footer.style.setProperty('translate','none','important');footer.style.setProperty('bottom','auto','important');const parent=footer.offsetParent?.getBoundingClientRect();const gap=Math.max(12,Math.min(22,innerHeight*.018));const top=Math.min(bounds.bottom+gap,innerHeight-footer.offsetHeight-12);footer.style.setProperty('top',(top-(parent?.top||0))+'px','important');};
 new ResizeObserver(fitStationFrame).observe(television);window.addEventListener('resize',fitStationFrame);document.fonts?.ready.then(fitStationFrame);fitStationFrame();
}
