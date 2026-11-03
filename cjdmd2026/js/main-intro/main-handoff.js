import * as THREE from 'three';
export const HANDOFF_VIEWPORTS=.85;
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{const t=clamp(v);return t*t*(3-2*t);};

// Keep the finished flat icons on the same screen while they move toward the
// real poster hero's scatter positions. Its existing gathering animation follows.
export function createMainHandoff(host,objects,copies,camera){
  const state=window.MainIntro,stage=host.closest('.animation-stage');
  const canvas=document.createElement('canvas');canvas.className='intro-scatter-canvas';canvas.setAttribute('aria-hidden','true');stage.append(canvas);
  const ctx=canvas.getContext('2d'),paths=new Map();
  let items=null,width=0,height=0,moving=false;
  function pathFor(source){
    if(paths.has(source.icon.id))return paths.get(source.icon.id);
    const path=new Path2D();
    for(const {points} of source.caster.contours){
      path.moveTo(...points[0]);for(const point of points.slice(1))path.lineTo(...point);path.closePath();
    }
    paths.set(source.icon.id,path);return path;
  }
  function prepare(){
    width=host.clientWidth;height=host.clientHeight;
    const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const targets=window.MainHeroIntro?.targets()||[];
    const project=(x,z)=>{const p=new THREE.Vector3(x,.003,z).project(camera);return {x:(p.x+1)*width/2,y:(1-p.y)*height/2};};
    const entries=[...objects,...copies()].map(object=>{
      const source=objects[object.sourceIndex??object.index],x=object.mesh.position.x,z=object.mesh.position.z;
      const p=project(x,z),unit=project(x+1,z);
      return {source,path:pathFor(source),x:p.x,y:p.y,scale:Math.hypot(unit.x-p.x,unit.y-p.y),angle:Math.atan2(unit.y-p.y,unit.x-p.x)};
    }).sort((a,b)=>Math.hypot(a.x-width/2,a.y-height/2)-Math.hypot(b.x-width/2,b.y-height/2));
    items=entries.map((entry,index)=>{
      const target=targets[index]||{x:width*(.5+Math.cos(index*2.39996)*1.2),y:height*(.5+Math.sin(index*2.39996)*1.2),size:12};
      return {...entry,target,delay:Math.min(.12,index/entries.length*.12)};
    });
  }
  function update(progress){
    const p=clamp(progress),wasComplete=state.complete;
    state.progress=p;state.complete=p>=.99999;
    document.body.classList.toggle('intro-before-main',!state.complete);
    document.body.classList.toggle('intro-scattering',p>0&&!state.complete);
    document.getElementById('mainIntro').inert=state.complete;
    if(p>0&&p<1){
      if(!items||width!==host.clientWidth||height!==host.clientHeight)prepare();
      ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);
      for(const item of items){
        const t=ease((p-item.delay)/(1-item.delay)),arc=Math.sin(t*Math.PI)*(1-t)*.10;
        const x=THREE.MathUtils.lerp(item.x,item.target.x,t)+(item.target.x-width/2)*arc;
        const y=THREE.MathUtils.lerp(item.y,item.target.y,t)+(item.target.y-height/2)*arc;
        const scale=THREE.MathUtils.lerp(item.scale,item.target.size/item.source.size,t);
        ctx.save();ctx.translate(x,y);ctx.rotate(item.angle*(1-t));ctx.scale(scale,scale);
        ctx.fillStyle=item.source.color;ctx.fill(item.path,'evenodd');ctx.restore();
      }
    }
    canvas.style.display=p>0&&!state.complete?'block':'none';
    host.style.visibility=p>0?'hidden':'visible';
    stage.style.opacity=String(1-ease((p-.72)/.28));
    stage.style.visibility=state.complete?'hidden':'visible';
    if(state.complete!==wasComplete)window.dispatchEvent(new CustomEvent('main-intro-handoff',{detail:{complete:state.complete}}));
  }
  const lenisInstance=()=>{try{return typeof lenis!=='undefined'?lenis:null;}catch{return null;}};
  function travel(forward){
    if(moving)return;moving=true;state.moving=true;
    const start=scrollY,end=state.anchor()-(forward?0:innerHeight*HANDOFF_VIEWPORTS);
    const begin=performance.now(),duration=matchMedia('(prefers-reduced-motion:reduce)').matches?180:1250;
    lenisInstance()?.stop();
    const frame=now=>{
      const t=clamp((now-begin)/duration);
      window.scrollTo({top:start+(end-start)*ease(t),behavior:'instant'});
      if(t<1)requestAnimationFrame(frame);
      else{
        moving=false;state.moving=false;state.inputUntil=performance.now()+450;
        lenisInstance()?.scrollTo(end,{immediate:true,force:true});
        if(!forward)lenisInstance()?.start();
        window.dispatchEvent(new Event('scroll'));
      }
    };requestAnimationFrame(frame);
  }
  state.reverse=()=>travel(false);
  const ignore=event=>event.defaultPrevented||document.body.classList.contains('mobile-menu-open')||document.documentElement.classList.contains('page-transition-active')||event.target.closest?.('input,textarea,select,[contenteditable]');
  function wants(direction){
    return moving||(!state.complete&&direction>0&&scrollY>=state.anchor()-innerHeight*HANDOFF_VIEWPORTS-Math.min(80,innerHeight*.08));
  }
  addEventListener('wheel',event=>{
    if(ignore(event)||!wants(Math.sign(event.deltaY)))return;
    event.preventDefault();event.stopImmediatePropagation();if(!moving)travel(true);
  },{capture:true,passive:false});
  let touchY=0;
  addEventListener('touchstart',event=>{touchY=event.touches[0].clientY;},{passive:true});
  addEventListener('touchmove',event=>{
    if(ignore(event)||event.touches.length!==1)return;
    const delta=touchY-event.touches[0].clientY;if(!wants(Math.sign(delta)))return;
    event.preventDefault();event.stopImmediatePropagation();if(!moving&&delta>36)travel(true);
  },{capture:true,passive:false});
  addEventListener('keydown',event=>{
    if(ignore(event)||!['ArrowDown','PageDown',' '].includes(event.key)||event.target.closest?.('button,a'))return;
    if(!wants(1))return;event.preventDefault();event.stopImmediatePropagation();if(!moving&&!event.repeat)travel(true);
  },{capture:true});
  return {update,reset(){items=null;},inspect:()=>({progress:state.progress,complete:state.complete,moving,count:items?.length||0,anchor:state.anchor()})};
}
