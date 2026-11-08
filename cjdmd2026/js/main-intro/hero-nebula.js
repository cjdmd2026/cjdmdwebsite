import {randomGenerator} from './scatter.js';

export function createHeroNebula(host,sources){
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
  canvas.className='hero-nebula-canvas';host.append(canvas);
  const random=randomGenerator(210426),pieces=[];
  const variation=randomGenerator(110626);
  // Two smaller copies per source leave space between the passing forms.
  for(let index=0;index<sources.length*2;index++){
    const source=sources[(index*13)%sources.length];
    // Keep neighbours staggered, but mix in off-centre and slightly smaller forms.
    const offset=(((index*13)%sources.length+.5)/sources.length-.5)*1.8+(random()+random()+random()-1.5)*.24;
    const breakout=variation()<.36&&Math.abs(offset)>.45?Math.sign(offset)*(.55+variation()*.3):0;
    const sizeVariation=variation()<.26?.78+variation()*.12:1;
    const phaseJitter=(variation()-.5)*.6;
    pieces.push({source,offset,breakout,phaseJitter,size:(.64+random()*.95)*sizeVariation,
      roll:(random()-.5)*Math.PI*2,speed:.008+random()*.004,spin:(random()-.5)*.07,seed:random()*Math.PI*2});
  }
  let width=0,height=0,ratio=1,elapsed=0,lastTime=0,raf=0,visible=true,frames=0,manual=false;
  let loading=document.documentElement.classList.contains('intro-loading');
  function draw(){
    const time=elapsed;
    const portrait=width<650;
    const count=sources.length*(portrait?1:2),baseSize=portrait?46:92;
    // Wrap only beyond the real viewport edges, with enough overscan for the
    // entire rotated icon and its sideways drift to leave the screen first.
    const margin=Math.max(baseSize*2.25,width*.14);
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle='rgba(129,144,152,.55)';
    ctx.lineJoin='round';
    for(let index=0;index<count;index++){
      const piece=pieces[index];
      // A shared forward pace avoids catch-up clusters; bounded sway keeps the
      // individual movement without letting the spacing collapse over time.
      const sway=(Math.sin(time*piece.speed*5+piece.seed)-Math.sin(piece.seed))*.002;
      const phase=((index+.5+piece.phaseJitter)/count+time*.01+sway)%1,t=(phase*(width+margin*2)-margin)/width;
      const envelope=Math.sin(Math.PI*Math.max(0,Math.min(1,t)));
      const spread=Math.min(height*.20,width*.20)*(.48+.52*envelope);
      // A few icons wander beyond the main band, then rejoin near its ends.
      const drift=(piece.offset+piece.breakout*envelope)*spread+Math.sin(time*.25+piece.seed)*spread*.1;
      const x=width*t-drift*.36;
      const y=height*(.02+.72*t+.035*Math.sin(t*Math.PI*2))+drift;
      const size=baseSize*piece.size*(.8+.2*envelope);
      const scale=size/piece.source.size, roll=-(piece.roll+time*piece.spin);
      const cos=Math.cos(roll)*scale*ratio,sin=Math.sin(roll)*scale*ratio;
      ctx.setTransform(cos,sin,-sin,cos,x*ratio,y*ratio);
      ctx.lineWidth=(width<650?.8:.9)/scale;
      ctx.stroke(piece.source.caster.path);
    }
    frames++;host.classList.add('is-ready');
  }
  function tick(time){
    raf=0;
    if(loading||!visible||document.hidden)return;
    if(lastTime&&time-lastTime<32){raf=requestAnimationFrame(tick);return;}
    const dt=lastTime?Math.min((time-lastTime)/1000,.1):1/60;lastTime=time;
    const flowing=!manual&&!reducedMotion.matches;
    if(flowing)elapsed+=dt;
    draw();if(flowing)raf=requestAnimationFrame(tick);
  }
  function resume(){if(!raf&&!loading&&visible&&!document.hidden){lastTime=0;raf=requestAnimationFrame(tick);}}
  function resize(){
    const nextRatio=Math.min(devicePixelRatio||1,1.75);
    if(width===host.clientWidth&&height===host.clientHeight&&ratio===nextRatio)return;
    width=host.clientWidth;height=host.clientHeight;
    ratio=nextRatio;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    draw();resume();
  }
  const observer=new IntersectionObserver(([entry])=>{
    visible=entry.isIntersecting&&entry.intersectionRatio>.001;
    if(visible)resume();else{cancelAnimationFrame(raf);raf=0;lastTime=0;}
  },{threshold:.001});observer.observe(host);
  new ResizeObserver(resize).observe(host);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(raf);raf=0;}else resume();
  });
  reducedMotion.addEventListener('change',()=>{cancelAnimationFrame(raf);raf=0;resume();});
  if(loading)window.addEventListener('main-intro-reveal',()=>{loading=false;resume();},{once:true});
  resize();
  return {
    inspect:()=>({ready:frames>0,sourceCount:sources.length,count:width<650?sources.length:pieces.length,baseSize:width<650?46:92,elapsed,frames,visible,paused:!raf,width,height,mode:'neutral-contour-stream'}),
    renderAt(time){manual=true;cancelAnimationFrame(raf);raf=0;elapsed=time;draw();},
    play(){manual=false;resume();},
    exportPNG(){draw();return canvas.toDataURL('image/png');}
  };
}
