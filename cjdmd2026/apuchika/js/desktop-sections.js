(()=>{
 const header=document.querySelector('.apu-header');if(!header)return;
 const mq=matchMedia('(min-width:801px)');
 function align(){
  if(!mq.matches)return;
  const links=[...header.querySelectorAll('.gnb>a')],columns=[...header.querySelectorAll('.apu-nav-column')];
  const panel=header.querySelector('.apu-nav-panel');if(!panel)return;
  const base=panel.getBoundingClientRect().left;
  links.forEach((link,i)=>{const r=link.getBoundingClientRect(),c=columns[i];if(!c)return;c.style.setProperty('--column-center',r.left-base+r.width/2+'px');c.style.setProperty('--column-width',r.width+'px');c.style.setProperty('--submenu-size',Math.min(18,parseFloat(getComputedStyle(link).fontSize)*.78)+'px')});
  document.documentElement.style.setProperty('--desktop-header',header.getBoundingClientRect().height+'px');
 }
 header.querySelectorAll('.apu-nav-column a').forEach(a=>{if(a.textContent.trim()==='사용후기')a.remove()});
 const pinMQ=matchMedia('(min-width:801px) and (min-height:700px) and (prefers-reduced-motion:no-preference)');
 function pins(){
  if(pinMQ.matches){document.querySelectorAll('.guardian-profile,body.home-page .badge-invite-v98,body.home-page #start').forEach(scene=>{if(scene.parentElement.classList.contains('desktop-pin-stage'))return;const wrap=document.createElement('div');wrap.className='desktop-pin-stage';scene.before(wrap);wrap.append(scene)})}
  else document.querySelectorAll('.desktop-pin-stage').forEach(w=>w.replaceWith(...w.childNodes));
 }
 document.querySelectorAll('.guardians,.planet-friends,.friends-stories,.join-guardians,body.home-page #oral-care,body.home-page #solution,body.home-page #process,body.home-page #learn-more,body.home-page #start,.kw-components,.kw-learning,.kw-tsd,.kw-faq,.community-reviews,.story-feature,.episode-library').forEach(s=>s.classList.add('desktop-section-stop'));
 addEventListener('resize',align);mq.addEventListener('change',align);pinMQ.addEventListener('change',pins);document.fonts?.ready.then(align);align();pins();
})();
