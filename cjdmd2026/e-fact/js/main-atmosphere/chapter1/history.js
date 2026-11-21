(() => {
  'use strict';
  const root=document.querySelector('.history-experience'); if(!root)return;
  const data=window.HISTORY_DATA,run=root.querySelector('.history-run'),scenes=[...root.querySelectorAll('.history-scene')];
  const buttons=[...root.querySelectorAll('.history-year-button')],smoke=root.querySelector('.history-clouds'),dialog=root.querySelector('dialog'),toggle=root.querySelector('.history-toggle'),counter=root.querySelector('.history-counter'),prev=root.querySelector('[data-direction="-1"]'),next=root.querySelector('[data-direction="1"]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'); let quiet=reduced.matches,active=0,frame=0,top=0,start=0,step=1000,entryDistance=0;
  const plate=new Image(),plume=new Image();
  const layers=[{scale:1.12,alpha:1,lag:0,blur:10},{scale:1.48,alpha:.38,lag:.11,blur:19},{scale:1.9,alpha:.19,lag:.19,blur:28}].map(config=>{
    const canvas=document.createElement('canvas');canvas.style.filter=`blur(${config.blur}px)`;
    return {...config,canvas,ctx:canvas.getContext('2d')};
  });
  smoke.replaceChildren(...layers.map(l=>l.canvas));
  plate.src='../../images/main-atmosphere/chapter1/assets/opaque-ash-smoke.jpg';plume.src='../../images/main-atmosphere/chapter1/assets/industrial-smoke.svg';
  plate.onload=plume.onload=()=>schedule();
  const stage=root.querySelector('.history-stage'),intro=root.querySelector('.history-intro');
  stage.prepend(intro);root.classList.add('integrated-intro');
  const introKicker=intro.querySelector('.history-kicker');
  const introTitle=intro.querySelector('h2');
  const introCopy=intro.querySelector('.intro-copy');
  const introEnter=intro.querySelector('.history-enter');
  const introMeta=intro.querySelector('.history-meta');
  const introRange=document.createElement('div');
  introRange.className='history-time-range';
  introRange.setAttribute('aria-label','1999년부터 2023년까지');
  introRange.innerHTML='<span class="history-time-from">1999</span><i class="history-time-line" aria-hidden="true"></i><span class="history-time-to">2023</span>';
  introTitle.className='history-intro-title';
  introTitle.setAttribute('aria-label','청주 소각시설을 둘러싼 변화의 기록');
  const titleLead=document.createElement('span');
  titleLead.className='history-title-lead';
  titleLead.textContent='청주 소각시설을 둘러싼';
  const titleAccent=document.createElement('span');
  titleAccent.className='history-title-accent';
  titleAccent.textContent='변화의 기록';
  introTitle.replaceChildren(titleLead,titleAccent);
  introTitle.before(introRange);
  const timeFrom=introRange.querySelector('.history-time-from');
  const timeTo=introRange.querySelector('.history-time-to');
  const timeLine=introRange.querySelector('.history-time-line');
  root.classList.add('has-intro-motion');

  function setIntroElement(node,progress,{x=0,y=20,scale=1}={}){
    node.style.opacity=String(progress);
    node.style.transform=`translate3d(${x*(1-progress)}px,${y*(1-progress)}px,0) scale(${1+(scale-1)*(1-progress)})`;
  }

  function renderIntroMotion(progress,forceVisible=false){
    if(forceVisible){
      [introKicker,introRange,timeFrom,timeTo,introTitle,titleLead,titleAccent,introCopy,introEnter,introMeta].forEach(node=>{
        node.style.opacity='1';node.style.transform='none';node.style.clipPath='none';
      });
      timeLine.style.transform='scaleX(1)';
      intro.style.setProperty('--history-bg-scale','1');
      intro.style.setProperty('--history-scan-progress','1');
      return;
    }
    const phase=(a,b)=>smooth((progress-a)/(b-a));
    const kickerP=phase(.01,.13);
    const yearP=phase(.10,.34);
    const leadP=phase(.30,.49);
    const accentP=phase(.42,.61);
    const copyP=phase(.56,.73);
    const actionP=phase(.68,.84);
    setIntroElement(introKicker,kickerP,{y:14});
    setIntroElement(introRange,yearP,{y:18,scale:1.018});
    setIntroElement(timeFrom,yearP,{x:-52,y:0});
    setIntroElement(timeTo,yearP,{x:52,y:0});
    timeLine.style.transform=`scaleX(${yearP})`;
    setIntroElement(introTitle,Math.max(leadP,accentP),{y:0});
    setIntroElement(titleLead,leadP,{y:34});
    setIntroElement(titleAccent,accentP,{y:38});
    titleLead.style.clipPath=`inset(${(1-leadP)*100}% 0 0)`;
    titleAccent.style.clipPath=`inset(${(1-accentP)*100}% 0 0)`;
    setIntroElement(introCopy,copyP,{y:24});
    setIntroElement(introEnter,actionP,{y:18});
    setIntroElement(introMeta,actionP,{y:14});
    intro.style.setProperty('--history-bg-scale',String(1.06-progress*.06));
    intro.style.setProperty('--history-scan-progress',String(phase(.52,.68)));
  }
  let width=1,height=1;
  function drawSmoke(reveal,direction,progress){
    layers.forEach((layer,index)=>{
      const {ctx}=layer;ctx.clearRect(0,0,width,height);
      if(reveal>=1)return;
      if(!plate.complete||!plate.naturalWidth){if(index===0){ctx.fillStyle='#171717';ctx.fillRect(0,0,width,height);}return;}
      const travel=clamp(reveal-layer.lag*Math.sin(reveal*Math.PI));
      const edge=(-.3+travel*1.72)*width;
      const scale=Math.max(width/plate.width,height/plate.height)*layer.scale;
      ctx.save();ctx.globalAlpha=layer.alpha;ctx.beginPath();ctx.moveTo(direction===1?width:0,0);
      for(let y=0;y<=height+10;y+=10){
        const wave=(Math.sin(y/height*(12+index*4)+progress*.22+index)*.048+Math.sin(y/height*31-progress*.15+index*2)*.024)*width;
        const x=edge+wave;ctx.lineTo(direction===1?x:width-x,y);
      }
      ctx.lineTo(direction===1?width:0,height);ctx.closePath();ctx.clip();
      ctx.drawImage(plate,(width-plate.width*scale)/2,(height-plate.height*scale)/2,plate.width*scale,plate.height*scale);ctx.restore();
      // Separate feathered plumes travel at different depths along the moving front.
      if(plume.complete&&plume.naturalWidth&&reveal>0&&reveal<1){
        for(let j=0;j<5;j++){
          const size=width*(.32+((j+index)%3)*.16);
          const x=direction===1?edge:width-edge;
          const drift=Math.sin(progress*.25+j*2+index)*width*.055;
          const y=(j/4)*height-height*.2+Math.cos(progress*.2+j)*height*.018;
          ctx.save();ctx.globalAlpha=layer.alpha*(.55+(j%2)*.2)*Math.sin(reveal*Math.PI);
          ctx.translate(x+drift,y);ctx.rotate(direction*(j%2?.18:-.12));
          ctx.drawImage(plume,-size*.5,-size*.45,size,size*1.5);ctx.restore();
        }
      }
    });
  }
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)); const smooth=t=>{t=clamp(t);return t*t*(3-2*t)};
  root.classList.add('has-js');
  function setup(){
    const header=document.querySelector('#header'); top=header?header.getBoundingClientRect().height:0;
    root.style.setProperty('--history-top',`${top}px`); root.classList.toggle('is-quiet',quiet);
    if(quiet)renderIntroMotion(1,true);
    // Keep visible reveal/closing distances; halve only the fully covered holds.
    step=Math.max(3000,innerHeight*4.8)*.92;entryDistance=innerWidth<=760?innerHeight*.75:innerHeight*2.2;
    width=run.clientWidth;height=innerHeight-top;const dpr=Math.min(devicePixelRatio||1,1.25);layers.forEach(({canvas,ctx})=>{canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}); run.style.setProperty('--run-height',quiet?'auto':`${step*scenes.length+entryDistance+innerHeight-top}px`);
    start=run.getBoundingClientRect().top+scrollY-top+entryDistance; toggle.textContent=quiet?'연기 전환 켜기':'모션 줄이기 ↘'; toggle.setAttribute('aria-pressed',String(quiet));
    scenes.forEach(s=>{s.style.cssText='';s.inert=false;s.removeAttribute('aria-hidden')}); schedule();
  }
  function render(){
    frame=0;if(quiet){stage.style.maskImage='none';stage.style.webkitMaskImage='none';intro.style.cssText='';intro.inert=false;root.classList.remove('is-entering');renderIntroMotion(1,true);return;}
    const entry=clamp((scrollY-(start-entryDistance))/entryDistance);
    const inIntro=scrollY<start;
    renderIntroMotion(entry);
    intro.style.opacity=String(1-smooth((entry-.86)/.14));
    intro.style.transform=`scale(${1+smooth((entry-.80)/.20)*.025}) translateY(${-smooth((entry-.80)/.20)*18}px)`;
    intro.style.visibility=inIntro?'visible':'hidden';intro.inert=!inIntro||entry>.7;
    root.classList.toggle('is-entering',inIntro);
    stage.style.maskImage=stage.style.webkitMaskImage='none';
    // Scroll position is the sole source of truth: no elapsed-time catch-up.
    const q=clamp((scrollY-start)/step,0,scenes.length-.001);
    active=Math.floor(q);
    const local=(q-active)*.92;
    // Old fully covered spans [0,.10] and [.94,1] take half the scroll.
    // The entire visible transition between them retains its original distance.
    const p=local<.05?local*2:local<.89?local+.05:.94+(local-.89)*2;
    const direction=active%2===0?1:-1;
    const opening=smooth((p-.04)/.40);
    const closing=active===scenes.length-1?0:smooth((p-.68)/.30);
    const reveal=opening*(1-closing);
    scenes.forEach((scene,i)=>{
      const current=i===active&&!inIntro;scene.style.visibility=current?'visible':'hidden';scene.style.opacity=current?'1':'0';
      scene.style.transform=current?`translate3d(${direction*((1-opening)*18-closing*10)}px,0,${-35*(1-opening)}px)`:'translate3d(0,0,-100px)';
      scene.inert=!current||reveal<.8;scene.setAttribute('aria-hidden',String(scene.inert));
    });
    smoke.style.opacity=String(inIntro?smooth((entry-.22)/.78):1);smoke.style.visibility=!inIntro&&reveal>=1?'hidden':'visible';
    drawSmoke(inIntro?0:reveal,direction,q);
    smoke.dataset.direction=direction===1?'right':'left';smoke.dataset.reveal=reveal.toFixed(4);
    buttons.forEach((b,i)=>b.setAttribute('aria-current',String(i===active)));counter.textContent=`${String(active+1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}　${data[active].year}`;prev.disabled=active===0;next.disabled=active===scenes.length-1;
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(render)}
  function go(i){i=clamp(i,0,scenes.length-1);if(quiet)scenes[i].scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});else scrollTo({top:start+(i+.48)*step,behavior:reduced.matches?'instant':'smooth'})}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>go(i)));prev.addEventListener('click',()=>go(active-1));next.addEventListener('click',()=>go(active+1));root.querySelector('.history-enter').addEventListener('click',e=>{e.preventDefault();go(0)});
  toggle.addEventListener('click',()=>{const i=active;quiet=!quiet;setup();requestAnimationFrame(()=>go(i))});
  root.querySelectorAll('.history-detail-button').forEach((button,i)=>button.addEventListener('click',()=>{const item=data[i],contents=dialog.querySelector('.history-dialog-content');contents.replaceChildren();const label=document.createElement('small');label.textContent=`${item.year} / ${item.tag}`;contents.append(label);const h=document.createElement('h3');h.textContent=item.title;contents.append(h);item.details.forEach(text=>{const p=document.createElement('p');p.textContent=text;contents.append(p)});item.sources.forEach(([label,url])=>{const a=document.createElement('a');a.href=url;a.textContent=label+' ↗';a.target='_blank';a.rel='noopener noreferrer';contents.append(a)});dialog.showModal()}));
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',setup);addEventListener('load',setup);reduced.addEventListener('change',()=>{quiet=reduced.matches;setup()});new ResizeObserver(()=>{start=run.getBoundingClientRect().top+scrollY-top+entryDistance;schedule()}).observe(document.body);setup();
})();
