/* 3D cylindrical entry inspired by Ana Tudor's dPXVyqN carousel. */
window.createYearonArchiveEntry=function(onEnter){
 const layer=document.createElement('section');layer.className='ka-carousel-entry';layer.setAttribute('aria-label','드래그로 사진 회전, 아래로 스크롤하여 K-ARCHIVE 입장');
 layer.innerHTML='<div class="ka-carousel-scene"><div class="ka-carousel-ring"></div></div><p><svg class="ka-entry-mouse" viewBox="0 0 20 32" fill="none" aria-hidden="true"><rect x="3" y="1" width="14" height="25" rx="7"/><path d="M10 6v6"/></svg><span>SCROLL TO EXPLORE</span></p><button type="button">K-ARCHIVE 입장 ↗</button>';
 const ring=layer.querySelector('.ka-carousel-ring');
 // A deliberately curated museum-like entrance, independent of the browsing order.
 const records=[...document.querySelectorAll('#archiveObjects .ka-object')];
 const curated=['kim-02-ssireum.png','ox-market-1904.jpg','jongno-1905.jpg','kim-03-mudong.png','street-vendors-1950.jpg','seoul-street-view-1950.jpg','worldcup-cityhall-2002.jpg','kim-05-jumak.png','bank-street-1950.jpg','market-gathering-1951.jpg','kim-06-bbalraeteo.png','laundry-in-stream.jpg','community-roof-1973.jpg','street-market-1951.jpg','seoul-olympics-1988.jpg','bts-wembley-fans-2019.jpg'];
 const selected=curated.map(key=>records.find(n=>n.dataset.image===key)).filter(Boolean);
 const fallback=records.filter(n=>!selected.includes(n)).sort((a,b)=>Number(a.dataset.year)-Number(b.dataset.year));
 const unique=[...selected,...fallback].slice(0,16).map(n=>n.querySelector('img')).map(i=>i.currentSrc||i.src);
 unique.forEach((src,i)=>{const img=document.createElement('img');img.src=src;img.alt='';img.draggable=false;img.style.setProperty('--i',i);ring.append(img)});ring.style.setProperty('--n',Math.max(1,unique.length));
 document.body.append(layer);const archive=document.querySelector('#cultureArchive');archive.style.visibility='hidden';let start=null,dragAngle=0,entered=false,angle=0,last=performance.now(),raf;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function finish(){if(entered)return;entered=true;cancelAnimationFrame(raf);archive.style.visibility='';archive.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:1100,easing:'cubic-bezier(.22,.61,.36,1)'});layer.classList.add('is-entering');setTimeout(()=>{layer.remove();onEnter()},1100)}
 let wheelTravel=0;layer.addEventListener('wheel',e=>{e.preventDefault();wheelTravel=Math.max(0,wheelTravel+Math.min(100,e.deltaY));if(wheelTravel>100)finish()},{passive:false});
 layer.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;start=e.clientX;dragAngle=angle;layer.setPointerCapture(e.pointerId);layer.classList.add('is-dragging')});
 layer.addEventListener('pointermove',e=>{if(start===null)return;const dx=e.clientX-start;angle=dragAngle+dx*.14;ring.style.transform=`rotateY(${angle}deg)`});
 layer.addEventListener('pointerup',e=>{start=null;layer.classList.remove('is-dragging')});layer.addEventListener('pointercancel',()=>start=null);layer.querySelector('button').onclick=finish;
 layer.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();finish()}});layer.tabIndex=0;layer.focus({preventScroll:true});
 function tick(now){if(entered)return;if(start===null&&!reduced){angle+=(now-last)*.006;ring.style.transform=`rotateY(${angle}deg)`}last=now;raf=requestAnimationFrame(tick)}raf=requestAnimationFrame(tick);
};
