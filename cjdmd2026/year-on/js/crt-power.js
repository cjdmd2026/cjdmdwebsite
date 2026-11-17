(()=>{const screen=document.querySelector('#screenWindow'),tv=document.querySelector('#television');if(!screen||!tv)return;
 const video=screen.querySelector('video'),layer=document.createElement('div');layer.className='crt-power-layer';layer.setAttribute('aria-hidden','true');screen.append(layer);
 const button=document.createElement('button');button.className='tv-power-control';button.type='button';button.innerHTML='<span>POWER ON / OFF</span>';tv.append(button);
 let powered=false,timer=0;const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 function paint(){const en=window.YEARON_LANG==='en';button.setAttribute('aria-label',en?(powered?'Turn TV off':'Turn TV on'):(powered?'TV 전원 끄기':'TV 전원 켜기'));button.setAttribute('aria-pressed',String(powered));tv.classList.toggle('tv-is-off',!powered)}
 function setPower(on,animate=true){clearTimeout(timer);powered=on;screen.classList.remove('crt-starting','crt-stopping');screen.dataset.power=on?'on':animate?'stopping':'off';video?.pause();paint();dispatchEvent(new CustomEvent('yearon-crt-power',{detail:{reset:true,powered:on}}));if(!animate||reduced.matches){screen.dataset.power=on?'on':'off';return}void layer.offsetWidth;screen.classList.add(on?'crt-starting':'crt-stopping');timer=setTimeout(()=>{screen.classList.remove('crt-starting','crt-stopping');screen.dataset.power=on?'on':'off';dispatchEvent(new Event('yearon-crt-power'))},on?700:460)}

 button.onclick=()=>setPower(!powered);video?.addEventListener('play',()=>{if(!powered)video.pause()});addEventListener('yearon-language-change',paint);setPower(true,false);
})();
