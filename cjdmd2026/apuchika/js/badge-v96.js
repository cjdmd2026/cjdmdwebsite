const $=id=>document.getElementById(id);
const video=$('camera'),canvas=$('badgeCanvas'),ctx=canvas.getContext('2d');
const overlay=$('frameOverlay'),overlayContext=overlay.getContext('2d');
const STORAGE_KEY='apuchika-badge-draft-v71';
const roles={
 leader:{color:'#ffad0d',theme:'orange',title:'수호대장',description:'친구들을 지켜주는 용감한 양치별 수호대장'},
 scholar:{color:'#0ba8f6',theme:'blue',title:'척척박사',description:'뭐든지 알려주는 똑똑한 양치별 척척박사'},
 cheer:{color:'#b4dc00',theme:'green',title:'치어리더',description:'친구들에게 용기를 주는 씩씩한 치어리더'}
};
const frames={apu:{theme:'orange',color:'#ffad0d',name:'아푸',asset:'../assets/images/badge/frame-1-v77.webp'},chika:{theme:'blue',color:'#0ba8f6',name:'치카',asset:'../assets/images/badge/frame-2-v77.webp'},friends:{theme:'green',color:'#b4dc00',name:'양치별 친구들',asset:'../assets/images/badge/frame-3-v77.webp'}};
let draft={name:'',role:'',frame:'apu'};
try{sessionStorage.removeItem(STORAGE_KEY)}catch{}
function saveDraft(){}
let stream=null,cameraGeneration=0,timerGeneration=0,photo=null,step='intro',captureBusy=false;
let finalized=false,stampDone=false,participantGeneration=0;
let outputBlob=null,outputURL=null,shareID=null,shareBusy=false;
const fontsReady=Promise.all([document.fonts.load('40px ApuNavHeading'),document.fonts.load('30px ApuNavBody'),document.fonts.load('64px BadgeInfo')]);
const cardAssets={};
async function loadImage(src){const image=new Image();image.src=src;await image.decode();return image}
const assetsReady=Promise.all([
 ...Object.values(frames).map(async frame=>{frame.image=await loadImage(frame.asset)}),
 ...['orange','blue','green'].map(async color=>{const [card,stamp]=await Promise.all([loadImage('../assets/images/badge/card-'+color+'-v83.webp'),loadImage('../assets/images/badge/stamp-'+color+'-v74.webp')]);cardAssets[color]={card,stamp}})
]);
assetsReady.catch(()=>{});
$('memberName').value=draft.name;
function setCaptureBusy(value){captureBusy=value;document.querySelectorAll('[data-frame]').forEach(b=>b.disabled=value);$('shoot').disabled=value||!stream||!video.videoWidth}
function stopCamera(){cameraGeneration++;timerGeneration++;$('countdown').hidden=true;stream?.getTracks().forEach(t=>t.stop());stream=null;video.srcObject=null;setCaptureBusy(false)}
function showStep(next){
 step=next;document.body.classList.toggle('workflow-active',['name','role','camera','result'].includes(next));
 $('intro').hidden=next!=='intro';$('studio').hidden=next==='intro';
 for(const value of ['name','role','camera','result'])$(value+'Step').hidden=next!==value;
 const active=['name','role'].includes(next)?'info':next;
 document.querySelectorAll('[data-step]').forEach(el=>{const current=el.dataset.step===active;el.classList.toggle('active',current);if(current)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current')});
 if(next==='name')$('memberName').focus({preventScroll:true});else if(next!=='intro')$(next+'Title').focus({preventScroll:true});
 window.scrollTo({top:0,behavior:'instant'});
}
function updateSelections(){
 document.querySelectorAll('[data-role]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.role===draft.role)));
 document.querySelectorAll('[data-frame]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.frame===draft.frame)));
}
function drawCover(c,image,x,y,w,h){
 const iw=image.videoWidth||image.naturalWidth||image.width,ih=image.videoHeight||image.naturalHeight||image.height;
 const scale=Math.max(w/iw,h/ih),dw=iw*scale,dh=ih*scale;
 c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.drawImage(image,x+(w-dw)/2,y+(h-dh)/2,dw,dh);c.restore();
}
function drawFrame(c,frameKey){const image=frames[frameKey].image;if(!image)return;const scale=Math.min(1200/image.naturalWidth,824/image.naturalHeight),w=image.naturalWidth*scale,h=image.naturalHeight*scale;c.drawImage(image,(1200-w)/2,824-h,w,h);}
async function updateFrame(){updateSelections();try{await Promise.all([assetsReady,fontsReady]);overlayContext.clearRect(0,0,1200,824);drawFrame(overlayContext,draft.frame)}catch{$('cameraStatus').textContent='프레임 이미지를 불러오지 못했어요. 페이지를 새로고침해 주세요.'}}
function cameraError(error){
 const messages={NotAllowedError:'카메라 권한이 꺼져 있어요. 주소창의 사이트 설정과 Mac 시스템 설정에서 카메라 사용을 허용한 뒤 다시 연결해 주세요.',NotFoundError:'연결된 카메라를 찾지 못했어요. 웹캠 연결을 확인해 주세요.',NotReadableError:'카메라를 사용 중인 다른 앱을 닫은 뒤 다시 연결해 주세요.',SecurityError:'카메라 사용이 제한되어 있어요. 사이트를 새 탭에서 직접 열어 주세요.'};
 $('directCamera').hidden=window.top===window.self;
 $('cameraStatus').textContent=messages[error?.name]||'카메라 영상을 시작하지 못했어요. 다른 앱에서 카메라를 닫고 다시 연결해 주세요.';
 $('cameraPlaceholder').hidden=false;$('cameraPlaceholder').querySelector('p').textContent=$('cameraStatus').textContent;$('retryCamera').hidden=false;
}
async function startCamera(){
 stopCamera();$('directCamera').hidden=true;showStep('camera');const generation=cameraGeneration;
 $('cameraPlaceholder').hidden=false;$('cameraPlaceholder').querySelector('p').textContent='카메라를 준비하고 있어요';$('retryCamera').hidden=true;$('cameraStatus').textContent='브라우저에서 카메라 사용을 허용해 주세요.';updateFrame();
 try{
  if(!navigator.mediaDevices?.getUserMedia)throw Object.assign(new Error('camera unavailable'),{name:'SecurityError'});
  const incoming=await navigator.mediaDevices.getUserMedia({video:true,audio:false});
  if(generation!==cameraGeneration||step!=='camera'){incoming.getTracks().forEach(t=>t.stop());return}
  stream=incoming;video.srcObject=stream;await video.play();
  if(!video.videoWidth)await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>{video.removeEventListener('loadeddata',ready);reject(new Error('video not ready'))},12000);function ready(){clearTimeout(timeout);resolve()}video.addEventListener('loadeddata',ready,{once:true})});
  if(generation!==cameraGeneration||step!=='camera')return;
  $('cameraPlaceholder').hidden=true;setCaptureBusy(false);$('cameraStatus').textContent='';
  stream.getVideoTracks()[0]?.addEventListener('ended',()=>{if(step==='camera'){stopCamera();cameraError({name:'NotReadableError'})}},{once:true});
 }catch(error){if(generation===cameraGeneration&&step==='camera'){stopCamera();cameraError(error)}}
}
function fitText(value,x,y,width,size,fill='#254257',font='ApuNavHeading'){
 ctx.fillStyle=fill;ctx.textAlign='left';ctx.font=`${size}px ${font},sans-serif`;
 while(ctx.measureText(value).width>width&&size>17){size--;ctx.font=`${size}px ${font},sans-serif`}
 ctx.fillText(value,x,y);
}
function wrapText(value,x,y,width,size,lineHeight){
 ctx.font=`${size}px ApuNavBody,sans-serif`;ctx.fillStyle='#64828f';ctx.textAlign='left';let line='';
 for(const word of value.split(' ')){const candidate=line?line+' '+word:word;if(line&&ctx.measureText(candidate).width>width){ctx.fillText(line,x,y);y+=lineHeight;line=word}else line=candidate}if(line)ctx.fillText(line,x,y);
}
const signatureCanvas=$('signaturePad'),signatureContext=signatureCanvas.getContext('2d');
let signing=false,signatureDirty=false;
function signaturePoint(event){const r=signatureCanvas.getBoundingClientRect();return [(event.clientX-r.left)*signatureCanvas.width/r.width,(event.clientY-r.top)*signatureCanvas.height/r.height]}
signatureCanvas.addEventListener('pointerdown',event=>{if(shareBusy||step!=='result'||!finalized)return;event.preventDefault();clearTimeout(stampTimer);signing=true;signatureCanvas.setPointerCapture(event.pointerId);const [x,y]=signaturePoint(event);signatureContext.beginPath();signatureContext.moveTo(x,y);signatureContext.lineTo(x+.1,y);signatureContext.strokeStyle='#161616';signatureContext.lineWidth=7;signatureContext.lineCap='round';signatureContext.lineJoin='round';signatureContext.stroke();signatureDirty=true;stampDone=false;signatureCanvas.parentElement.classList.add('has-signature')});
signatureCanvas.addEventListener('pointermove',event=>{if(!signing)return;event.preventDefault();const [x,y]=signaturePoint(event);signatureContext.lineTo(x,y);signatureContext.stroke()});
let stampTimer;
async function finishSignature(){
 if(!signing)return;
 signing=false;const person=participantGeneration;
 clearTimeout(stampTimer);stampTimer=setTimeout(async()=>{
  if(person!==participantGeneration||signing||!signatureDirty||!finalized||step!=='result')return;
  const stamp=document.createElement('img');stamp.src=cardAssets[frames[draft.frame].theme].stamp.src;
  stamp.className='stamp-overlay';stamp.style.cssText='position:absolute;left:76.66%;top:62%;width:26.86%;pointer-events:none;z-index:4';
  document.querySelector('.finished-card').append(stamp);
  const motion=stamp.animate([{transform:'scale(1.65) rotate(-8deg)',opacity:0},{transform:'scale(.96)',opacity:1,offset:.72},{transform:'scale(1)',opacity:1}],{duration:450,easing:'ease-out',fill:'forwards'});
  await Promise.race([motion.finished.catch(()=>{}),new Promise(r=>setTimeout(r,520))]);
  if(person!==participantGeneration||signing||!finalized||step!=='result'){stamp.remove();return}
  stampDone=true;await showResult();signatureCanvas.style.visibility='hidden';$('resultImage').src=outputURL;stamp.remove();
 },440)
}
signatureCanvas.addEventListener('pointerup',finishSignature);signatureCanvas.addEventListener('pointercancel',finishSignature);
$('clearSignature').onclick=async()=>{if(shareBusy)return;signatureContext.clearRect(0,0,820,390);signatureDirty=false;stampDone=false;clearTimeout(stampTimer);signatureCanvas.parentElement.classList.remove('has-signature');if(photo)await showResult()};
function drawBadge(){
 const role=roles[draft.role],assets=cardAssets[frames[draft.frame].theme];
 ctx.clearRect(0,0,2048,1129);ctx.save();ctx.beginPath();ctx.roundRect(0,0,2048,1129,64);ctx.clip();ctx.drawImage(assets.card,0,0,2048,1129);if(!finalized){ctx.fillStyle='#fff';ctx.fillRect(1150,820,850,220);}
 const issued=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());ctx.fillStyle='#fff';ctx.font='40px ApuNavHeading,sans-serif';ctx.textAlign='right';ctx.fillText('DATE : '+issued,1970,200);
 const framed=document.createElement('canvas');framed.width=1200;framed.height=824;const c=framed.getContext('2d');c.save();c.beginPath();c.roundRect(0,0,1200,824,90);c.clip();c.drawImage(photo,0,0);c.restore();drawFrame(c,draft.frame);
 ctx.drawImage(framed,75,313,1024,709);
 fitText(draft.name,1410,420,520,90,'#444','BadgeInfo');fitText(role.title,1410,596,520,90,'#444','BadgeInfo');
 if(signatureDirty)ctx.drawImage(signatureCanvas,1150,650,820,390);
 const stampWidth=550,stampHeight=stampWidth*assets.stamp.naturalHeight/assets.stamp.naturalWidth;
 if(finalized&&signatureDirty&&stampDone)ctx.drawImage(assets.stamp,1570,700,stampWidth,stampHeight);ctx.restore();
}
let renderID=0;
async function showResult(){
 const id=++renderID;const signed=finalized&&signatureDirty&&stampDone;
 $('openSave').hidden=true;$('resultStep').classList.toggle('is-review',!finalized);$('resultStep').style.setProperty('--signature-color',frames[draft.frame].color);$('resultTitle').textContent=finalized?'수호대원증 발급 완료!':'수호대원증 발급 중 · · ·';
 await Promise.all([fontsReady,assetsReady]);if(id!==renderID)return;drawBadge();const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));if(id!==renderID)return;if(!blob)throw new Error('대원증 이미지를 만들지 못했어요. 다시 찍어 주세요.');
 outputBlob=blob;if(outputURL)URL.revokeObjectURL(outputURL);outputURL=URL.createObjectURL(blob);const savedStamp=stampDone;stampDone=false;drawBadge();$('resultImage').src=canvas.toDataURL('image/png');stampDone=savedStamp;drawBadge();$('download').href=outputURL;if(!saveDialog.open)resetShare();$('openSave').hidden=!signed;if(step!=='result')showStep('result');else{document.querySelectorAll('[data-step]').forEach(el=>{const active=el.dataset.step==='result';el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current')})}
}
$('start').onclick=()=>showStep('name');
$('memberName').addEventListener('input',()=>{draft.name=$('memberName').value.trim();$('nameError').hidden=true;saveDraft()});
$('nameForm').onsubmit=e=>{e.preventDefault();draft.name=$('memberName').value.trim();if(!draft.name||Array.from(draft.name).length>5){$('nameError').textContent='이름은 1~5글자로 적어 주세요.';$('nameError').hidden=false;$('memberName').focus();return}saveDraft();updateSelections();showStep('role')};
document.querySelectorAll('[data-role]').forEach(b=>b.onclick=async()=>{draft.role=b.dataset.role;saveDraft();updateSelections();startCamera()});
document.querySelectorAll('[data-frame]').forEach(b=>b.onclick=()=>{if(captureBusy)return;draft.frame=b.dataset.frame;saveDraft();updateFrame()});
$('finalizeBadge').onclick=async()=>{if(!photo)return;const card=document.querySelector('.finished-card');await card.animate([{opacity:1},{opacity:0}],{duration:160,fill:'forwards'}).finished;finalized=true;await showResult();await card.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'ease-out',fill:'forwards'}).finished};$('reviewRetake').onclick=startCamera;
$('retryCamera').onclick=startCamera;$('retake').onclick=()=>{if(!shareBusy)startCamera()};
$('shoot').onclick=async()=>{
 if(!stream||!video.videoWidth||captureBusy)return;
 const generation=++timerGeneration;setCaptureBusy(true);
 for(let n=3;n>0;n--){if(generation!==timerGeneration)return;$('countdown').hidden=false;$('countdown').textContent=String(n);await new Promise(r=>setTimeout(r,1000))}
 if(generation!==timerGeneration||step!=='camera')return;$('countdown').hidden=true;
 if(!video.videoWidth||video.readyState<2){setCaptureBusy(false);$('cameraStatus').textContent='카메라 화면을 불러온 뒤 다시 찍어 주세요.';return}
 const snap=document.createElement('canvas');snap.width=1200;snap.height=824;const c=snap.getContext('2d');c.translate(snap.width,0);c.scale(-1,1);drawCover(c,video,0,0,1200,824);photo=snap;finalized=false;
 const flash=$('captureFlash').animate([{opacity:0},{opacity:.95,offset:.12},{opacity:0}],{duration:420,easing:'ease-out'});
 await flash.finished.catch(()=>{});
 if(generation!==timerGeneration||step!=='camera')return;
 stopCamera();
 try{await showResult()}catch(error){$('cameraStatus').textContent=error.message;$('retryCamera').hidden=false;$('cameraPlaceholder').hidden=false}
};
function resetShare(){shareID=null;$('qrResult').hidden=true;$('makeQR').hidden=false;$('qrStatus').textContent='';$('qrImage').removeAttribute('src')}
function setShareBusy(value){shareBusy=value;$('saveDialog').classList.toggle('is-loading',value);for(const id of ['makeQR','edit','restart','retake','revoke','clearSignature'])$(id).disabled=value}
$('edit').onclick=()=>{if(!shareBusy)showStep('name')};
async function createShareQR(){
 if(!outputBlob||shareBusy)return;const participant=participantGeneration;setShareBusy(true);$('qrStatus').textContent='다운로드 QR을 만들고 있어요';
 try{const response=await fetch('/api/badges',{method:'POST',headers:{'Content-Type':'image/png'},body:outputBlob,signal:AbortSignal.timeout(30000)});const result=await response.json();if(participant!==participantGeneration)return;if(!response.ok)throw new Error(result.error||'QR 생성에 실패했어요.');shareID=result.id;$('qrImage').src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(result.qr);$('qrResult').hidden=false;$('makeQR').hidden=true;$('qrStatus').textContent='스마트폰으로 QR코드를 스캔해 이미지를 다운로드 해 보세요.'}
 catch(error){$('qrStatus').textContent=error.name==='TimeoutError'?'연결이 늦어지고 있어요. 다시 시도해 주세요.':error.message||'인터넷 연결을 확인한 뒤 다시 시도해 주세요.'}
 finally{setShareBusy(false)}
};
$('makeQR').onclick=createShareQR;
$('revoke').onclick=async()=>{if(!shareID||shareBusy)return;setShareBusy(true);try{const r=await fetch('/api/badges/'+encodeURIComponent(shareID),{method:'DELETE'});if(!r.ok)throw new Error();resetShare();$('qrStatus').textContent='다운로드 링크와 업로드한 이미지를 삭제했어요.'}catch{$('qrStatus').textContent='삭제하지 못했어요. 다시 눌러 주세요.'}finally{setShareBusy(false)}};
function resetParticipant(){renderID++;participantGeneration++;signing=false;clearTimeout(stampTimer);document.querySelectorAll('.stamp-overlay').forEach(e=>e.remove());stampDone=false;finalized=false;signatureCanvas.style.visibility='';signatureCanvas.parentElement.classList.remove('has-signature');stopCamera();photo=null;signatureContext.clearRect(0,0,820,390);signatureDirty=false;outputBlob=null;if(outputURL)URL.revokeObjectURL(outputURL);outputURL=null;$('resultImage').removeAttribute('src');$('download').removeAttribute('href');draft={name:'',role:'',frame:'apu'};saveDraft();$('memberName').value='';$('nameError').hidden=true;resetShare();updateSelections();showStep('intro')}
$('restart').onclick=resetParticipant;
window.addEventListener('pagehide',stopCamera);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&stream&&step==='camera'){stopCamera();$('cameraPlaceholder').hidden=false;$('cameraPlaceholder').querySelector('p').textContent='카메라를 다시 연결해 주세요';$('cameraStatus').textContent='카메라를 잠시 껐어요. 다시 연결해 주세요.';$('retryCamera').hidden=false}});
updateSelections();

const saveDialog=$('saveDialog');
for(const id of ['makeQR','qrResult','qrStatus'])$('saveQRSlot').append($(id));
let farewellBusy=false;
$('openSave').onclick=()=>{if(!outputURL)return;saveDialog.showModal();if(!shareID)void createShareQR()};
$('closeSave').onclick=()=>saveDialog.close();
saveDialog.addEventListener('close',async()=>{
 if(farewellBusy)return;
 if(!shareID){$('openSave').focus();return}
 saveDialog.returnValue='';farewellBusy=true;
 const scene=$('badgeFarewell');
 try{await scene.querySelector('img').decode()}catch{}
 scene.hidden=false;scene.classList.add('flight');
 await new Promise(r=>setTimeout(r,matchMedia('(prefers-reduced-motion:reduce)').matches?1500:7300));
 resetParticipant();scene.hidden=true;scene.classList.remove('flight');farewellBusy=false;$('start').focus();
});
