import * as THREE from 'three';
import {LineSegments2} from 'three/addons/lines/LineSegments2.js';
import {LineSegmentsGeometry} from 'three/addons/lines/LineSegmentsGeometry.js';
import {LineMaterial} from 'three/addons/lines/LineMaterial.js';
import {randomGenerator} from './scatter.js';

// Trace the source SVG contours at both ends of the existing extrusion. Only
// corners get connecting edges; curved sides stay clean instead of triangulated.
function outlineGeometry(source){
  const vertices=[],height=source.caster.height,half=height/2;
  const segment=(a,b)=>vertices.push(...a,...b);
  for(const contour of source.caster.contours){
    const points=contour.points.filter((p,i,list)=>!i||Math.hypot(p[0]-list[i-1][0],p[1]-list[i-1][1])>1e-5);
    if(points.length<3)continue;
    if(Math.hypot(points[0][0]-points.at(-1)[0],points[0][1]-points.at(-1)[1])<1e-5)points.pop();
    points.forEach((p,i)=>{
      const previous=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
      for(const y of [-half,half])segment([p[0],y,p[1]],[next[0],y,next[1]]);
      const a=new THREE.Vector2(p[0]-previous[0],p[1]-previous[1]).normalize();
      const b=new THREE.Vector2(next[0]-p[0],next[1]-p[1]).normalize();
      if(a.dot(b)<.78)segment([p[0],-half,p[1]],[p[0],half,p[1]]);
    });
  }
  return new LineSegmentsGeometry().setPositions(vertices);
}

export function createHeroNebula(host,sources){
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setClearColor(0xffffff,0);renderer.autoClear=false;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.domElement.className='hero-nebula-canvas';host.append(renderer.domElement);
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,4000);
  camera.position.z=2000;camera.lookAt(0,0,0);
  const lines=new THREE.Scene();
  const random=randomGenerator(210426),pieces=[],assets=sources.map(source=>({source,outline:outlineGeometry(source)}));
  const variation=randomGenerator(110626);
  const baseNeutral=new THREE.Color('#819098');
  // Two smaller copies per source leave space between the passing forms.
  for(let index=0;index<sources.length*2;index++){
    const asset=assets[(index*13)%assets.length];
    const lineMaterial=new LineMaterial({color:baseNeutral,linewidth:.9,transparent:true,opacity:.55,depthTest:false,depthWrite:false});
    const wire=new LineSegments2(asset.outline,lineMaterial);lines.add(wire);
    // Keep neighbours staggered, but mix in off-centre and slightly smaller forms.
    const offset=(((index*13)%sources.length+.5)/sources.length-.5)*1.8+(random()+random()+random()-1.5)*.24;
    const breakout=variation()<.36&&Math.abs(offset)>.45?Math.sign(offset)*(.55+variation()*.3):0;
    const sizeVariation=variation()<.26?.78+variation()*.12:1;
    const phaseJitter=(variation()-.5)*.6;
    pieces.push({wire,asset,offset,breakout,phaseJitter,size:(.64+random()*.95)*sizeVariation,
      pitch:(random()-.5)*.85,yaw:(random()-.5)*1.2,roll:(random()-.5)*Math.PI*2,speed:.008+random()*.004,spin:(random()-.5)*.07,seed:random()*Math.PI*2});
  }
  let width=1,height=1,elapsed=0,lastTime=0,raf=0,visible=true,frames=0,manual=false;
  function place(time){
    const portrait=width<650;
    const count=sources.length*(portrait?1:2),baseSize=portrait?46:92;
    // Wrap only beyond the real viewport edges, with enough overscan for the
    // entire rotated icon and its sideways drift to leave the screen first.
    const margin=Math.max(baseSize*2.25,width*.14);
    pieces.forEach((piece,index)=>{
      const enabled=index<count;
      piece.wire.visible=enabled;if(!enabled)return;
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
      piece.wire.position.set(x-width/2,height/2-y,Math.sin(piece.seed)*80);
      piece.wire.rotation.set(Math.PI/2+piece.pitch+Math.sin(time*.13+piece.seed)*.10,piece.yaw,piece.roll+time*piece.spin);
      piece.wire.scale.setScalar(size/piece.asset.source.size);
    });
  }
  function draw(){
    place(elapsed);
    renderer.clear();
    renderer.render(lines,camera);
    frames++;host.classList.add('is-ready');
  }
  function tick(time){
    raf=0;
    if(!visible||document.hidden)return;
    if(lastTime&&time-lastTime<32){raf=requestAnimationFrame(tick);return;}
    const dt=lastTime?Math.min((time-lastTime)/1000,.1):1/60;lastTime=time;
    const flowing=!manual&&!reducedMotion.matches;
    if(flowing)elapsed+=dt;
    draw();if(flowing)raf=requestAnimationFrame(tick);
  }
  function resume(){if(!raf&&visible&&!document.hidden){lastTime=0;raf=requestAnimationFrame(tick);}}
  function resize(){
    width=host.clientWidth;height=host.clientHeight;
    const ratio=Math.min(devicePixelRatio||1,1.75);
    renderer.setPixelRatio(ratio);renderer.setSize(width,height,false);
    camera.left=-width/2;camera.right=width/2;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix();
    pieces.forEach(piece=>{piece.wire.material.linewidth=width<650?.8:.9;});
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
  resize();
  return {
    inspect:()=>({ready:frames>0,sourceCount:sources.length,count:pieces.filter(p=>p.wire.visible).length,baseSize:width<650?46:92,elapsed,frames,visible,paused:!raf,width,height,mode:'neutral-contour-stream'}),
    renderAt(time){manual=true;cancelAnimationFrame(raf);raf=0;elapsed=time;draw();},
    play(){manual=false;resume();},
    exportPNG(){draw();return renderer.domElement.toDataURL('image/png');}
  };
}
