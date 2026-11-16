/* Separate telescopic antenna. The radio artwork and reflection stay in place. */
(()=>{const radio=document.querySelector('#radioMedia');if(!radio)return;
 const antenna=document.createElement('div');antenna.className='radio-antenna';antenna.setAttribute('role','slider');antenna.tabIndex=0;antenna.setAttribute('aria-label','라디오 안테나 각도');antenna.setAttribute('aria-valuemin','5');antenna.setAttribute('aria-valuemax','35');
 antenna.innerHTML='<svg viewBox="0 0 500 42" aria-hidden="true"><defs><linearGradient id="antennaChrome" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".13" stop-color="#b6c5d5"/><stop offset=".29" stop-color="#263240"/><stop offset=".46" stop-color="#f0f8ff"/><stop offset=".59" stop-color="#fff"/><stop offset=".72" stop-color="#4c5a69"/><stop offset="1" stop-color="#bcc9d4"/></linearGradient></defs><g fill="url(#antennaChrome)" stroke="#7c8d9e" stroke-width="1"><path d="M12 12H110V31H12Z"/><path d="M108 14H298V29H108Z"/><path d="M297 16H474V27H297Z"/><rect x="469" y="10" width="23" height="23" rx="5"/><ellipse cx="13" cy="24" rx="17" ry="15"/><ellipse cx="13" cy="34" rx="21" ry="4"/></g><path d="M32 14H109M113 16H296M301 18H468" stroke="#fff" stroke-width="1.5" opacity=".85"/></svg>';
 radio.append(antenna);let current=-14,target=-14,frame=0,dragging=false;
 const clamp=n=>Math.max(-35,Math.min(-5,n));
 function paint(){antenna.style.setProperty('--antenna-angle',current+'deg');antenna.setAttribute('aria-valuenow',String(Math.round(-current)));antenna.setAttribute('aria-valuetext',Math.round(-current)+'도')}
 function tick(){frame=0;current+=(target-current)*.25;if(Math.abs(target-current)<.03)current=target;paint();if(current!==target)frame=requestAnimationFrame(tick)}
 function request(){if(!frame)frame=requestAnimationFrame(tick)}
 function pivot(){const r=radio.getBoundingClientRect();return{x:r.left+r.width*.598,y:r.top+r.height*.242}}
 function move(e){if(!dragging)return;const p=pivot();target=clamp(Math.atan2(e.clientY-p.y,e.clientX-p.x)*180/Math.PI);request()}
 antenna.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();dragging=true;antenna.setPointerCapture(e.pointerId);antenna.classList.add('is-dragging')});antenna.addEventListener('pointermove',move);
 const end=()=>{dragging=false;antenna.classList.remove('is-dragging')};antenna.addEventListener('pointerup',end);antenna.addEventListener('pointercancel',end);
 antenna.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();target=e.key==='Home'?-14:e.key==='End'?-35:clamp(target+(['ArrowUp','ArrowLeft'].includes(e.key)?-2:2));request()});paint();
})();
