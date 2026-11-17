/* One brief bilingual reading frame follows the existing power-on film. */
(()=>{
 const crt=document.querySelector('.media-entry-crt'),entryState=window.YEARON_MEDIA_ENTRY;
 if(!crt||entryState?.skip||performance.now()-(entryState?.started??0)>3800)return;
 const frame=document.createElement('section');frame.className='media-entry-purpose';frame.setAttribute('aria-label','시대별 매체 탐색 안내');frame.setAttribute('translate','no');
 frame.innerHTML='<div class="media-entry-purpose-copy"><div lang="ko"><h1>시대를 넘어 이어진 우리의 기록.</h1><p><span>함께 살아가는 사람들의 모습은 시대마다 다른 매체에 담겨왔습니다.</span><span>풍속화부터 스마트폰까지, 그 속에 이어온 한국의 우리성을 탐색해 보세요.</span></p></div><div class="purpose-english" lang="en"><h2>Records of Us Across Time.</h2><p><span>Different media have carried scenes of people living together across time.</span><span>From genre paintings to smartphones, explore the Korean sense of WE-NESS.</span></p></div></div>';
 const syncLanguage=()=>{const en=window.YEARON_LANG==='en';frame.querySelector('[lang=ko]').hidden=en;frame.querySelector('[lang=en]').hidden=!en};addEventListener('yearon-language-change',syncLanguage);syncLanguage();
 crt.after(frame);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let started=false,closed=false,hold;
 const deck=document.querySelector('#timeDeck');const wasInert=deck?.inert;
 if(deck)deck.inert=true;
 function close(){if(closed)return;closed=true;clearTimeout(hold);if(deck)deck.inert=wasInert;frame.classList.add('is-leaving');frame.setAttribute('aria-hidden','true');frame.inert=true;if(!reduced)frame.animate([{opacity:1},{opacity:0}],{duration:550,easing:'ease-in-out',fill:'forwards'}).finished.then(()=>frame.remove());else frame.remove();removeEventListener('keydown',escape)}
 function escape(e){if(e.key==='Escape')close()}
 function show(){if(started||closed)return;if(!crt.isConnected||performance.now()-(entryState?.started??0)>4200){close();return;}started=true;frame.classList.add('is-reading');if(!reduced)frame.querySelector('.media-entry-purpose-copy').animate([{opacity:0,translate:'0 7px'},{opacity:1,translate:'0 0'}],{duration:700,easing:'ease-out',fill:'both'}).finished.then(()=>frame.classList.add('is-ready'));hold=setTimeout(close,4000)}
 addEventListener('keydown',escape);
 document.addEventListener('pointerdown',event=>{if(event.target.closest('#timeDeck,#timeNav,.header-right'))close()},{capture:true});
 addEventListener('pagehide',close,{once:true});
 addEventListener('pageshow',event=>{if(event.persisted)close()});
 crt.addEventListener('animationend',e=>{if(e.target===crt)show()},{once:true});
 if(reduced)show();else setTimeout(show,Math.max(0,2700-(performance.now()-(entryState?.started??performance.now()))));
})();
