(()=>{
  const root=document.querySelector('.pc-screen-ui'),media=document.querySelector('.time-panel[data-era="2002"] .pc-media');
  const power=document.querySelector('#pcPower'),boot=document.querySelector('#pcBoot'),desktop=document.querySelector('#pcDesktop');
  const layer=document.querySelector('#pcWindowLayer'),tasks=document.querySelector('#pcTaskButtons'),startButton=document.querySelector('#pcStartButton'),startMenu=document.querySelector('#pcStartMenu'),hint=document.querySelector('#pcHint');
  if(!root||!media||!power||!boot||!desktop||!layer)return;
  const internetIcon=desktop.querySelector('.pc-desktop-icon[data-pc-open="internet"]');
  function updateInternetHint(){
    if(!internetIcon)return;
    internetIcon.title=document.documentElement.lang==='en'
      ? 'Explore a 2000s web portal, community cafés and mini-homepages.'
      : '2000년대 포털, 카페, 미니홈피를 둘러보세요.';
  }
  updateInternetHint();
  new MutationObserver(updateInternetHint).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  const bootTitle=document.querySelector('#pcBootTitle'),bootText=document.querySelector('#pcBootText'),clock=document.querySelector('#pcClock');
  let powered=false,booting=false,z=20,timers=[],chatTimer=0;
  const windows=new Map();
  const makeGlass=()=>{const glass=document.createElement('div');glass.className='pc-crt-glass';glass.setAttribute('aria-hidden','true');return glass;};
  root.append(makeGlass());
  const appNames={computer:'내 컴퓨터',documents:'내 문서',pccomm:'이어온 메신저',internet:'YEAR:ON 인터넷',recycle:'휴지통',notepad:'메모장',album:'기록 사진첩',readme:'매체 기록.txt',system:'시스템 등록 정보'};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const phase=(name,title,text)=>{boot.dataset.phase=name;bootTitle.innerHTML=title;bootText.textContent=text};
  const later=(fn,ms)=>timers.push(setTimeout(fn,ms));
  const updateClock=()=>{const d=new Date(),h=d.getHours(),m=String(d.getMinutes()).padStart(2,'0');clock.textContent=`${h<12?'오전':'오후'} ${h%12||12}:${m}`};
  updateClock();setInterval(updateClock,30000);

  const explorer=(type)=>{
    if(type==='recycle')return '<div class="pc-empty"><div><b>♲</b><p>휴지통이 비어 있습니다.<br>기억은 아직 지워지지 않았습니다.</p></div></div>';
    const rows=type==='computer'?[['▣','로컬 디스크 (C:)','8.4GB 남음'],['▰','이어:온 기록 (Y:)','시대별 기록 6개'],['▤','나의 기록.txt','메모장으로 쓰기'],['⌘','제어판','시스템 설정']]:[['▰','매체 기록.txt','함께 이어온 기록'],['▰','기록 사진첩','그림과 사진 모아보기'],['▰','나의 기록.txt','직접 쓰는 메모'],['▰','풍속화 자료','단원풍속도첩 25점']];
    return `<div class="pc-explorer-toolbar">주소　${type==='computer'?'내 컴퓨터':'C:\\내 문서'}</div><div class="pc-explorer-grid">${rows.map((r,i)=>`<button type="button" class="pc-file" data-pc-launch="${(type==='computer'?['documents','album','notepad','system']:['readme','album','notepad','album'])[i]}"><i>${r[0]}</i><span><b>${r[1]}</b><small>${r[2]}</small></span></button>`).join('')}</div>`;
  };

  function contentFor(app){if(app==='album')return '<div class="pc-album"><img src="assets/images/about-rebuild/archive/02-ssireum.webp" alt="김홍도 씨름"><div><b>김홍도 · 씨름</b><p>《단원풍속도첩》에 담긴 25점 중 한 장면.</p><button type="button" data-album-prev>← 이전</button><span data-album-index>1 / 3</span><button type="button" data-album-next>다음 →</button></div></div>';if(app==='readme')return '<article class="pc-document"><h2>그때의 기록, 오늘의 이야기</h2><p>신문의 지면과 라디오의 목소리, TV 속 장면을 지나 일상의 기록은 컴퓨터 화면으로 이어졌습니다.</p><p>2000년대의 인터넷에서는 카페에 글을 남기고, 미니홈피에 사진을 올리고, 메신저로 안부를 나누었습니다.</p><p>이 컴퓨터에서도 인터넷과 메신저를 열고, 메모장에 나만의 기록을 남겨보세요.</p><small>YEAR:ON · 전시용 체험 자료</small></article>';if(app==='system')return '<article class="pc-document"><h2>YEAR SYSTEM 2005</h2><p>Windows XP 스타일의 전시용 가상 데스크톱</p><p>프로그램: 인터넷 · 메신저 · 메모장 · 기록 사진첩</p><p>작성한 메모와 체험 반응은 현재 브라우저에 저장됩니다.</p></article>';if(app==='notepad')return '<div class="pc-notepad"><div class="pc-note-tools"><button type="button" data-note-save>저장</button><button type="button" data-note-download>.txt 내려받기</button><span role="status" data-note-status>나의 기록.txt</span></div><textarea class="pc-note-input" aria-label="메모장 내용" spellcheck="false" placeholder="오늘 남기고 싶은 이야기를 적어보세요."></textarea><footer><span data-note-count>0자</span><span>UTF-8 · YEAR:ON</span></footer></div>';return (app==='pccomm'||app==='internet')?'<p>페이지를 여는 중…</p>':explorer(app)}
  function focusWindow(win){if(!win)return;windows.forEach(w=>w.classList.remove('active'));win.classList.remove('minimized');win.classList.add('active');win.style.zIndex=++z;tasks.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.task===win.dataset.app))}
  function closeWindow(app){const win=windows.get(app);if(!win)return;win._pcHeaderObserver?.disconnect();win.remove();windows.delete(app);tasks.querySelector(`[data-task="${app}"]`)?.remove();if(app==='pccomm')clearInterval(chatTimer)}
  function makeDraggable(win){const bar=win.querySelector('.pc-titlebar');let drag;bar.addEventListener('pointerdown',e=>{if(e.target.closest('button')||win.matches(':popover-open'))return;focusWindow(win);drag={x:e.clientX,y:e.clientY,l:win.offsetLeft,t:win.offsetTop};bar.setPointerCapture(e.pointerId)});bar.addEventListener('pointermove',e=>{if(!drag)return;const maxX=desktop.clientWidth-win.offsetWidth,maxY=desktop.clientHeight-win.offsetHeight;win.style.left=Math.max(0,Math.min(maxX,drag.l+e.clientX-drag.x))+'px';win.style.top=Math.max(0,Math.min(maxY,drag.t+e.clientY-drag.y))+'px'});bar.addEventListener('pointerup',()=>drag=null)}
  function openApp(app){
    if(!powered||!appNames[app])return;startMenu.hidden=true;startButton.setAttribute('aria-expanded','false');
    if(windows.has(app)){focusWindow(windows.get(app));return}
    const win=document.createElement('section');win.className='pc-window';win.dataset.app=app;win.setAttribute('role','dialog');win.innerHTML=`<header class="pc-titlebar"><strong>${appNames[app]}</strong><div class="pc-window-controls"><button data-min aria-label="최소화">_</button><button data-expand aria-label="확대" aria-pressed="false">□</button><button data-close aria-label="닫기">×</button></div></header><div class="pc-menubar">파일　편집　보기　도움말</div><div class="pc-window-body">${contentFor(app)}</div><footer class="pc-statusbar">YEAR SYSTEM · READY</footer>`;
    win.append(makeGlass());
    layer.append(win);
    const expand=win.querySelector('[data-expand]');
    let zoomAnimation, originalFrame;
    const updateHeader=()=>{
      const header=document.querySelector('.global-header');
      win.style.setProperty('--pc-header-bottom',Math.max(0,header?.getBoundingClientRect().bottom||0)+'px');
    };
    const zoomFrame=(from,to)=>({transform:`translate(${from.left-to.left}px,${from.top-to.top}px) scale(${from.width/to.width},${from.height/to.height})`});
    const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
    expand.onclick=()=>{
      if(zoomAnimation?.playState==='running')return;
      if(win.matches(':popover-open')){
        if(reduced()||!originalFrame){win.hidePopover();return;}
        const full=win.getBoundingClientRect();
        zoomAnimation=win.animate([{transform:'none'},zoomFrame(originalFrame,full)],{duration:360,easing:'cubic-bezier(.4,0,.2,1)'});
        zoomAnimation.onfinish=()=>{if(win.matches(':popover-open'))win.hidePopover();};
        return;
      }
      originalFrame=win.getBoundingClientRect();
      updateHeader();
      win.setAttribute('popover','auto');
      win.showPopover();
      if(!reduced())zoomAnimation=win.animate([zoomFrame(originalFrame,win.getBoundingClientRect()),{transform:'none'}],{duration:560,easing:'cubic-bezier(.16,1,.3,1)'});
    };
    const headerObserver=new ResizeObserver(()=>{if(win.isConnected)updateHeader();else headerObserver.disconnect();});
    const globalHeader=document.querySelector('.global-header');
    if(globalHeader)headerObserver.observe(globalHeader);
    win._pcHeaderObserver=headerObserver;
    win.addEventListener('toggle',()=>{
      const expanded=win.matches(':popover-open');
      if(!expanded)win.removeAttribute('popover');
      expand.textContent=expanded?'❐':'□';
      expand.setAttribute('aria-label',expanded?'원래 크기로 복원':'확대');
      expand.setAttribute('aria-pressed',String(expanded));
    });
if(app==='notepad'){
 const input=win.querySelector('textarea'),status=win.querySelector('[data-note-status]'),count=win.querySelector('[data-note-count]');
 try{input.value=localStorage.getItem('yearon-pc-note')||''}catch{}
 const update=()=>count.textContent=input.value.length+'자';update();input.addEventListener('input',()=>{status.textContent='저장하지 않은 기록';update()});
 win.querySelector('[data-note-save]').onclick=()=>{try{localStorage.setItem('yearon-pc-note',input.value);status.textContent='이 기기에 저장됨'}catch{status.textContent='저장 공간을 사용할 수 없습니다'}};
 win.querySelector('[data-note-download]').onclick=()=>{const url=URL.createObjectURL(new Blob(['\ufeff'+input.value],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='YEARON-나의기록.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='텍스트 파일로 내려받음'};
 }if(app==='album'){
 const album=[['assets/images/about-rebuild/archive/02-ssireum.webp','김홍도 · 씨름','《단원풍속도첩》에 담긴 25점 중 한 장면.'],['assets/images/phone-editorial-20261105/market-seoul.jpg','광장시장의 일상','시장 골목을 오가며 마주치는 오늘의 풍경.'],['assets/images/phone-editorial-20261106/hanbok-courtyard.jpg','궁에서 만난 오늘','오래된 풍경 속에 남기는 새로운 장면.']];let at=0;const paint=()=>{const a=album[at];win.querySelector('.pc-album img').src=a[0];win.querySelector('.pc-album img').alt=a[1];win.querySelector('.pc-album b').textContent=a[1];win.querySelector('.pc-album p').textContent=a[2];win.querySelector('[data-album-index]').textContent=(at+1)+' / '+album.length};win.querySelector('[data-album-prev]').onclick=()=>{at=(at+album.length-1)%album.length;paint()};win.querySelector('[data-album-next]').onclick=()=>{at=(at+1)%album.length;paint()};
 }win.addEventListener('click',e=>{const b=e.target.closest('[data-pc-launch]');if(b)openApp(b.dataset.pcLaunch)});windows.set(app,win);if(app!=='internet')makeDraggable(win);win.addEventListener('pointerdown',()=>focusWindow(win));win.querySelector('[data-close]').onclick=()=>closeWindow(app);win.querySelector('[data-min]').onclick=()=>{if(win.matches(':popover-open'))win.hidePopover();win.classList.add('minimized');tasks.querySelector(`[data-task="${app}"]`)?.classList.remove('active')};
    const task=document.createElement('button');task.dataset.task=app;task.textContent=appNames[app];task.onclick=()=>win.classList.contains('minimized')?focusWindow(win):(win.classList.contains('active')?win.classList.add('minimized'):focusWindow(win));tasks.append(task);focusWindow(win);
    if(app==='notepad')requestAnimationFrame(()=>win.querySelector('textarea')?.focus({preventScroll:true}));
    if(app==='pccomm')window.YEARON_PC2005?.mount(win,app);
    if(app==='internet')window.YEARON_PC2005?.mount(win,app);
  }
  window.YEARON_PC_OPEN=app=>{openApp(app);return windows.get(app)};
  const editableSelector = 'textarea, input:not([type]), input[type="text"], input[type="search"]';
  let typingField;
  root.addEventListener('focusin', event => {
    if (event.target.matches(editableSelector) && !event.target.readOnly) typingField = event.target;
  });

  const keyboard = document.createElement('div');
  keyboard.className = 'pc-picture-keyboard';
  keyboard.setAttribute('role', 'group');
  keyboard.setAttribute('aria-label', '컴퓨터 그림 키보드');
  const rows = [
    { x: 10.5, y: 81.6, step: 2.86, keys: [...'1234567890', '⌫'] },
    { x: 10.6, y: 83.7, step: 2.88, keys: [...'qwertyuiop'] },
    { x: 11.3, y: 85.8, step: 2.95, keys: [...'asdfghjkl', '↵'] },
    { x: 12.2, y: 88.1, step: 3, keys: [...'zxcvbnm', ',', '.', '/'] },
    { x: 16, y: 90.4, step: 18, keys: [' '] }
  ];
  for (const { x, y, step, keys } of rows) {
    keys.forEach((key, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.key = key;
      button.textContent = key === ' ' ? 'Space' : key.toUpperCase();
      button.setAttribute('aria-label', ({' ':'스페이스', '⌫':'백스페이스', '↵':'엔터'})[key] || button.textContent);
      Object.assign(button.style, {left: (x + step * index) + '%', top: y + '%', width: step + '%'});
      keyboard.append(button);
    });
  }
  keyboard.hidden = true;
  media.append(keyboard);
  keyboard.addEventListener('pointerdown', event => event.preventDefault());
  keyboard.addEventListener('click', event => {
    const key = event.target.closest('button')?.dataset.key;
    if (!key || !powered) return;

    let field = typingField;
    if (!field?.isConnected || !field.closest('.pc-window.active:not(.minimized)')) {
      openApp('notepad');
      field = windows.get('notepad')?.querySelector('textarea');
    }
    if (!field || field.disabled) return;
    field.focus({preventScroll: true});
    if (key === '↵' && field.tagName === 'INPUT') {
      field.form?.requestSubmit();
      return;
    }
    let start = field.selectionStart ?? field.value.length;
    const end = field.selectionEnd ?? start;
    if (key === '⌫' && start === end) {
      start -= Array.from(field.value.slice(0, start)).at(-1)?.length ?? 0;
    }
    const value = key === '⌫' ? '' : key === '↵' ? '\n' : key;
    if (field.maxLength >= 0 && field.value.length - (end - start) + value.length > field.maxLength) return;
    field.setRangeText(value, start, end, 'end');
    field.dispatchEvent(new Event('input', {bubbles:true}));
  });

  function finishBoot(){keyboard.hidden=false;powered=true;booting=false;root.classList.add('is-on');desktop.classList.add('ready');boot.classList.add('hidden');power.classList.add('on');power.setAttribute('aria-label','컴퓨터 전원 끄기');hint.textContent='아이콘을 두 번 눌러 프로그램을 여세요 ↑'}
  function startBoot(fast=false){if(booting)return;keyboard.hidden=true;timers.forEach(clearTimeout);timers=[];booting=true;powered=false;windows.forEach((_,k)=>closeWindow(k));root.classList.remove('is-on');desktop.classList.remove('ready');boot.classList.remove('hidden');phase('power','','');const scale=matchMedia('(prefers-reduced-motion:reduce)').matches?.15:fast?.55:1;later(()=>phase('bios','YEAR SYSTEM 2005','Memory Test: 65536K OK\nDetecting communication devices... OK\nStarting Windows XP...'),450*scale);later(()=>phase('logo','Windows XP','바탕화면을 불러오는 중...'),1350*scale);later(finishBoot,4450*scale)}

  power.addEventListener('click',()=>{if(powered||booting)resetExhibit();else startBoot(false)});
  media.querySelectorAll('[data-pc-open]').forEach(btn=>{btn.addEventListener('dblclick',()=>openApp(btn.dataset.pcOpen));btn.addEventListener('keydown',e=>{if(e.key==='Enter')openApp(btn.dataset.pcOpen)});btn.addEventListener('click',()=>{media.querySelectorAll('.pc-desktop-icon').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');if(btn.closest('.pc-start-menu'))openApp(btn.dataset.pcOpen)})});
  startButton.onclick=e=>{e.stopPropagation();startMenu.hidden=!startMenu.hidden;startButton.setAttribute('aria-expanded',String(!startMenu.hidden))};desktop.addEventListener('click',e=>{if(!e.target.closest('.pc-start-menu,#pcStartButton')){startMenu.hidden=true;startButton.setAttribute('aria-expanded','false')}});media.querySelector('[data-pc-action="restart"]').onclick=()=>startBoot(false);
  const pixelIcons={
 notepad:'<path fill="#202d3f" d="M6 2h21v28H6z"/><path fill="#d6e9f3" d="M7 3h19v26H7z"/><path fill="#fff" d="M9 5h15v22H9z"/><path fill="#748fa7" d="M11 9h11v1H11zM11 13h11v1H11zM11 17h11v1H11zM11 21h9v1h-9z"/><path fill="#447cab" d="M3 5h5v3H3zM3 12h5v3H3zM3 19h5v3H3z"/>',
 computer:'<path fill="#111" d="M3 1h25v21H18v3h12v6H1v-6h12v-3H3z"/><path fill="#ddd" d="M4 2h23v18H4zM2 26h27v4H2z"/><path fill="#fff" d="M4 2h23v2H4zM2 26h27v1H2z"/><path fill="#777" d="M25 4h2v16H4v-2h21zM3 29h25v1H3z"/><path fill="#050505" d="M6 5h18v11H6z"/><path fill="#174d97" d="M7 6h16v9H7z"/><path fill="#46c1c8" d="M8 7h13v6H8z"/><path fill="#b1ffff" d="M8 7h8v1H8z"/><path fill="#66ed24" d="M4 27h3v2H4z"/><path fill="#222" d="M19 27h7v1h-7z"/>',
 documents:'<path fill="#111" d="M8 1h17l5 5v22H8zM4 4h18l5 5v21H4zM1 8h18l5 5v19H1z"/><path fill="#999" d="M9 2h15l4 5v19H9zM5 5h16l4 5v18H5z"/><path fill="#fff" d="M2 9h15v6h6v15H2zM18 10l4 4h-4z"/><path fill="#bbb" d="M4 18h15v1H4zM4 21h15v1H4zM4 24h12v1H4z"/><path fill="#666" d="M2 30h21v1H2z"/>',
 pccomm:'<path fill="#111" d="M1 2h21v17H1zM7 19h9v3H7zM2 22h19v4H2zM17 14h14v15H17z"/><path fill="#ddd" d="M2 3h19v14H2zM3 23h17v2H3zM18 15h12v12H18z"/><path fill="#000080" d="M4 5h15v10H4zM20 17h8v8h-8z"/><path fill="#5ff3eb" d="M6 7h8v1H6zM6 10h11v1H6zM21 19h5v1h-5zM21 22h4v1h-4z"/>',
 internet:'<path fill="#111" d="M10 1h12v2h5v4h3v6h1v10h-3v5h-6v3H10v-2H5v-4H2V11h2V6h6z"/><path fill="#1434a0" d="M10 3h12v2h4v4h3v12h-3v6h-6v2H10v-2H6v-4H4V12h2V8h4z"/><path fill="#228be3" d="M10 4h10v2h4v4h3v10h-3v5H10v-2H6V13h2V8h2z"/><path fill="#076c13" d="M10 3h10v3h-5v3h-4v3H7v4H4v-5h2V7h4zM17 15h9v7h-4v5h-5v-4h-3v-5h3z"/><path fill="#40df39" d="M10 4h8v2h-4v3h-4v3H7v2H5v-3h2V8h3zM18 16h6v4h-4v4h-2z"/><path fill="#a8ffff" d="M8 7h2v3H8zM6 11h2v5H6z"/>',
 recycle:'<path fill="#111" d="M5 8h22v3h-2v18h-3v3H9v-3H6V11H3V8zM11 2h10v3h5v3H5V5h6z"/><path fill="#999" d="M7 11h17v17h-3v2H10v-2H8zM6 6h19v3H6z"/><path fill="#ddd" d="M8 12h3v15H8zM13 12h2v17h-2zM18 12h2v17h-2zM7 6h17v1H7zM12 3h8v2h-8z"/><path fill="#555" d="M22 12h2v15h-2zM10 9h12v1H10z"/>'
 };
 media.querySelectorAll('.pc-desktop-icon').forEach(button=>{const icon=button.querySelector('i');icon.innerHTML='<svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">'+pixelIcons[button.dataset.pcOpen]+'</svg>'});
 const splash=document.createElement('div');splash.className='pc-boot-splash';splash.setAttribute('aria-hidden','true');splash.innerHTML='<small>Microsoft</small><svg viewBox="0 0 180 128" aria-hidden="true"><g transform="translate(25 4) rotate(10 70 60)"><path fill="#111" d="M52 14Q91-2 136 11V104Q93 92 52 111z"/><path fill="#ee7941" d="M58 19Q75 12 92 13V49Q75 49 58 56z"/><path fill="#8fbd4b" d="M99 13Q115 13 130 18V54Q114 49 99 49z"/><path fill="#2d9acb" d="M58 63Q75 56 92 56V94Q75 96 58 102z"/><path fill="#f9d65a" d="M99 56Q115 56 130 61V98Q114 94 99 94z"/><path fill="#333" d="M37 21h11v9H37zM21 26h9v8h-9zM9 31h7v7H9zM38 39h10v10H38zM23 43h8v8h-8zM11 48h7v7h-7zM38 59h10v10H38zM22 64h9v9h-9zM9 69h7v7H9zM37 80h11v10H37zM21 86h9v8h-9zM8 91h7v7H8zM37 100h11v10H37zM22 106h8v8h-8z"/></g></svg><div class="pc-boot-brand"><span>Microsoft</span><b>Windows<em>XP</em></b><strong>Microsoft Internet Explorer</strong></div><div class="pc-boot-progress"><i></i></div>';
 boot.append(splash);
  phase('off','','');
  function resetExhibit(){
    keyboard.hidden=true;
    timers.forEach(clearTimeout);timers=[];clearTimeout(chatTimer);
    
    windows.forEach((_,k)=>closeWindow(k));powered=false;booting=false;
    root.classList.remove('is-on');desktop.classList.remove('ready');boot.classList.remove('hidden');
    power.classList.remove('on');power.setAttribute('aria-label','컴퓨터 전원 켜기');
    startMenu.hidden=true;startButton.setAttribute('aria-expanded','false');
    hint.textContent='전원 버튼을 눌러 컴퓨터를 켜보세요 ↑';
    phase('off','','');
  }
  try{sessionStorage.removeItem('yearonPcBooted')}catch{}
  addEventListener('pageshow',e=>{if(e.persisted)resetExhibit()});
  addEventListener('pagehide',resetExhibit);
  resetExhibit();
})();
