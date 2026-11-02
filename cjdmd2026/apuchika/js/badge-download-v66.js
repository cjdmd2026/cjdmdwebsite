const id=new URLSearchParams(location.search).get('id'),status=document.getElementById('status');
let blob,url;
async function load(){
 if(!/^\d{13}-[a-f0-9]{48}$/.test(id||'')){status.textContent='QR 다운로드 링크를 확인해 주세요.';return}
 try{const r=await fetch('/api/badges/'+encodeURIComponent(id),{cache:'no-store'});if(!r.ok){let error;try{error=(await r.json()).error}catch{}throw new Error(error||'대원증을 불러오지 못했어요.')}
 blob=await r.blob();if(blob.type!=='image/png')throw new Error('사진을 불러오지 못했어요. 사이트 로그인 상태를 확인해 주세요.');url=URL.createObjectURL(blob);const photo=document.getElementById('photo');photo.src=url;photo.hidden=false;document.getElementById('actions').hidden=false;document.getElementById('save').href=url;status.textContent='양치별 수호대원이 된 걸 환영해요!';
 const file=new File([blob],'아푸치카-수호대원증.png',{type:'image/png'});
 if(navigator.canShare?.({files:[file]})){const share=document.getElementById('share');share.hidden=false;share.onclick=async()=>{try{await navigator.share({files:[file],title:'나의 수호대원증'})}catch(e){if(e.name!=='AbortError')status.textContent='공유하지 못했어요. 이미지 다운로드를 이용해 주세요.'}}}
 }catch(e){status.textContent=e.message;document.getElementById('retry').hidden=false}
}
load();window.addEventListener('pagehide',()=>{if(url)URL.revokeObjectURL(url)});
