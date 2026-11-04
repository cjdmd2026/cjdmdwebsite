import * as THREE from 'three';
import {GUIDE_DURATION,GUIDE_SWEEP_END,POINT_START,POINT_END,OUTLINE_DURATION,FILL_START,EXTRUSION_START,EXTRUSION_DURATION,SOLID_START,COLOR_START,COLOR_DURATION,COLOR_END,OPENING_MEASURE_START,OPENING_MEASURE_END,openingRevealTime} from './reveal-timing.js';

export const TRAVEL_START=SOLID_START+.01;
const clamp=value=>THREE.MathUtils.clamp(value,0,1);
const ease=value=>{const t=clamp(value);return t*t*(3-2*t);};
export const flattenProgress=ending=>ease(ending);
const WHITE=new THREE.Color(0xffffff),NEUTRAL_LINE=new THREE.Color(0x9098a1);
let glowTexture;

export function revealState(local,ending=0){
  const state={
    phase:local<POINT_START?'guide':local<POINT_END?'point':local<FILL_START?'outline':local<EXTRUSION_START?'fill':local<SOLID_START?'extrude':local<COLOR_START?'white':local<COLOR_END?'color':'solid',
    guideProgress:ease(local/GUIDE_SWEEP_END),
    guideOpacity:ease(local/(GUIDE_DURATION*.28))*(1-ease((local-EXTRUSION_START)/(EXTRUSION_DURATION*.7))),
    stroke:clamp((local-POINT_END)/OUTLINE_DURATION),
    fill:ease((local-FILL_START)/.08),
    extrusion:ease((local-EXTRUSION_START)/EXTRUSION_DURATION),
    tint:ease((local-COLOR_START)/COLOR_DURATION),
    flatness:0,
    complete:local>=COLOR_END,
    lineOpacity:1-ease((local-(EXTRUSION_START+EXTRUSION_DURATION/6))/(EXTRUSION_DURATION*5/6))
  };
  // Keep the color fill as the solid settles onto the floor; lighting and shadows
  // recede with its height, leaving a filled 2D icon at the overhead ending.
  // A longer tint can finish during this move without delaying or snapping height.
  if(ending>0&&local>=SOLID_START){
    state.phase=ending>=1?'flat':'flattening';
    state.flatness=flattenProgress(ending);
    state.extrusion=1-state.flatness;
    state.fill=1;
    state.lineOpacity=0;
  }
  return state;
}

function guideSegments(bounds){
  const {minX,maxX,minZ,maxZ}=bounds;
  return [
    {a:[minX,minZ],b:[maxX,minZ]},
    {a:[maxX,maxZ],b:[minX,maxZ]},
    {a:[minX,maxZ],b:[minX,minZ]},
    {a:[maxX,minZ],b:[maxX,maxZ]}
  ];
}

function createGuide(bounds,mode){
  const segments=guideSegments(bounds);
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(24),3).setUsage(THREE.DynamicDrawUsage));
  const material=new THREE.LineBasicMaterial({color:0xb0b7bf,transparent:true,opacity:0,depthWrite:false,toneMapped:false});
  const guide=new THREE.LineSegments(geometry,material);
  guide.name='SVG construction guide';guide.renderOrder=2;guide.frustumCulled=false;
  guide.userData={segments,mode,svgBounds:bounds,bounds,origins:segments.map(({a})=>a),exits:segments.map(({b})=>b)};
  if(mode==='viewport'){
    const sweep=new THREE.LineSegments(geometry.clone(),new THREE.LineBasicMaterial({color:0xff3c3c,transparent:true,opacity:0,depthWrite:false,toneMapped:false}));
    sweep.name='Red guide sweep';sweep.renderOrder=3;sweep.frustumCulled=false;sweep.visible=false;
    guide.add(sweep);guide.userData.sweep=sweep;
  }
  return guide;
}

export function fitGuideToCell(reveal,grid){
  const data=reveal.guide.userData,source=data.svgBounds;
  // SVG whitespace can exceed its grid cell even when the actual icon fits.
  // Fit only the frame, preserving its proportions and a gap to adjacent frames.
  const scale=grid?Math.min(1,(grid.stepX/2-.10)/Math.max(Math.abs(source.minX),Math.abs(source.maxX)),
    (grid.stepZ/2-.10)/Math.max(Math.abs(source.minZ),Math.abs(source.maxZ))):1;
  data.bounds=Object.fromEntries(Object.entries(source).map(([key,value])=>[key,value*scale]));
  data.segments=guideSegments(data.bounds);
  data.origins=data.segments.map(({a})=>a);data.exits=data.segments.map(({b})=>b);
}

export function fitGuideViewport(reveal,camera,topExtension=0){
  const guide=reveal.guide;
  if(guide.userData.mode!=='viewport')return;
  reveal.group.updateWorldMatrix(true,false);
  const floorY=reveal.group.localToWorld(new THREE.Vector3(0,.008,0)).y;
  const plane=new THREE.Plane(new THREE.Vector3(0,1,0),-floorY),ray=new THREE.Raycaster(),corners=[];
  // Include the real screen top while the canvas is still entering the viewport.
  for(const x of [-1.06,1.06])for(const y of [-1.06,1.06+topExtension]){
    ray.setFromCamera(new THREE.Vector2(x,y),camera);
    const hit=ray.ray.intersectPlane(plane,new THREE.Vector3());
    if(hit)corners.push(reveal.group.worldToLocal(hit));
  }
  if(corners.length!==4)return;
  const bounds=new THREE.Box3().setFromPoints(corners);
  guide.userData.origins=guide.userData.segments.map(({a,b})=>a[0]!==b[0]
    ?[b[0]>a[0]?bounds.min.x:bounds.max.x,a[1]]
    :[a[0],b[1]>a[1]?bounds.min.z:bounds.max.z]);
  guide.userData.exits=guide.userData.segments.map(({a,b})=>a[0]!==b[0]
    ?[b[0]>a[0]?bounds.max.x:bounds.min.x,a[1]]
    :[a[0],b[1]>a[1]?bounds.max.z:bounds.min.z]);
  guide.userData.originScreens=guide.userData.origins.map(([x,z])=>
    reveal.group.localToWorld(new THREE.Vector3(x,.008,z)).project(camera).toArray().slice(0,2));
  guide.userData.exitScreens=guide.userData.exits.map(([x,z])=>
    reveal.group.localToWorld(new THREE.Vector3(x,.008,z)).project(camera).toArray().slice(0,2));
}

function updateGuide(guide,state){
  guide.visible=state.guideOpacity>0;
  guide.material.opacity=state.guideOpacity;
  if(!guide.visible)return;
  const positions=guide.geometry.attributes.position,progress=state.guideProgress;
  const sweep=guide.userData.sweep,sweepPositions=sweep?.geometry.attributes.position;
  if(sweep){sweep.visible=progress>0&&progress<1;sweep.material.opacity=state.guideOpacity;}
  guide.userData.segments.forEach(({a,b},index)=>{
    let ink=progress;
    if(sweep){
      const origin=guide.userData.origins[index],exit=guide.userData.exits[index];
      const length=Math.hypot(b[0]-a[0],b[1]-a[1]),dx=(b[0]-a[0])/length,dz=(b[1]-a[1])/length;
      const travel=Math.hypot(exit[0]-origin[0],exit[1]-origin[1]);
      // First connect both viewport edges, then let the tail catch the fixed head.
      // Leave a brief full-width beat before the soft gray box is uncovered behind it.
      const head=travel*ease(progress/.52),tail=travel*ease((progress-.58)/.42);
      sweepPositions.setXYZ(index*2,origin[0]+dx*tail,.0085,origin[1]+dz*tail);
      sweepPositions.setXYZ(index*2+1,origin[0]+dx*head,.0085,origin[1]+dz*head);
      const start=(a[0]-origin[0])*dx+(a[1]-origin[1])*dz;
      ink=clamp((tail-start)/length);
    }
    positions.setXYZ(index*2,a[0],.008,a[1]);
    positions.setXYZ(index*2+1,THREE.MathUtils.lerp(a[0],b[0],ink),.008,THREE.MathUtils.lerp(a[1],b[1],ink));
  });
  positions.needsUpdate=true;
  if(sweepPositions)sweepPositions.needsUpdate=true;
}

export function inspectGuide(reveal){
  const sweep=reveal.guide.userData.sweep;
  return {enabled:true,mode:reveal.guide.userData.mode,bounds:reveal.guide.userData.bounds,origins:reveal.guide.userData.origins,originScreens:reveal.guide.userData.originScreens,
    color:reveal.guide.material.color.getHexString(),visible:reveal.group.visible&&reveal.guide.visible,opacity:reveal.guide.material.opacity,
    sweep:sweep?{visible:reveal.group.visible&&reveal.guide.visible&&sweep.visible,color:sweep.material.color.getHexString(),points:Array.from(sweep.geometry.attributes.position.array),exits:reveal.guide.userData.exits,exitScreens:reveal.guide.userData.exitScreens}:null,
    progress:reveal.state.guideProgress,points:Array.from(reveal.guide.geometry.attributes.position.array)};
}

export function createReveal(object,template,guideMode='edge'){
  const group=new THREE.Group();group.name=object.icon.id+'-drawing';
  group.position.copy(object.mesh.position);group.rotation.copy(object.mesh.rotation);
  const color=NEUTRAL_LINE.clone(),targetColor=new THREE.Color(object.color);
  const guide=createGuide(object.caster.svgBounds,guideMode);
  guide.visible=false;group.add(guide);
  const material=new THREE.LineBasicMaterial({color,transparent:true,opacity:1,depthWrite:false,toneMapped:false});
  const lines=[];
  let total=0;
  for(const [contourIndex,contour] of object.caster.contours.entries()){
    if(template){
      const source=template.lines[contourIndex],geometry=source.geometry.clone();geometry.setDrawRange(0,0);
      const line=new THREE.Line(geometry,material);line.renderOrder=3;
      line.userData={offset:total,count:source.userData.count};total+=source.userData.count;
      group.add(line);lines.push(line);continue;
    }
    const points=[];
    for(let i=0;i<contour.points.length;i++){
      const a=contour.points[i],b=contour.points[(i+1)%contour.points.length];
      const steps=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.006));
      for(let j=0;j<steps;j++)points.push(new THREE.Vector3(THREE.MathUtils.lerp(a[0],b[0],j/steps),.012,THREE.MathUtils.lerp(a[1],b[1],j/steps)));
    }
    points.push(points[0].clone());
    const geometry=new THREE.BufferGeometry().setFromPoints(points);geometry.setDrawRange(0,0);
    const line=new THREE.Line(geometry,material);
    line.renderOrder=3;line.userData={offset:total,count:points.length};
    total+=points.length;group.add(line);lines.push(line);
  }
  const dot=new THREE.Mesh(template?.dot.geometry||new THREE.SphereGeometry(.018,16,12),new THREE.MeshBasicMaterial({color,transparent:true,depthWrite:false,depthTest:false,toneMapped:false}));
  dot.position.fromBufferAttribute(lines[0].geometry.attributes.position,0);dot.renderOrder=4;group.add(dot);
  if(!glowTexture){
    const canvas=document.createElement('canvas');canvas.width=canvas.height=64;
    const ctx=canvas.getContext('2d'),gradient=ctx.createRadialGradient(32,32,0,32,32,32);
    gradient.addColorStop(0,'rgba(255,255,255,.5)');gradient.addColorStop(.3,'rgba(255,255,255,.18)');gradient.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);glowTexture=new THREE.CanvasTexture(canvas);
  }
  const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture,color,transparent:true,depthWrite:false,depthTest:false}));
  halo.position.copy(dot.position);halo.scale.setScalar(.18);group.add(halo);
  return {group,guide,lines,dot,halo,total,targetColor,active:false,drawing:false,sparkAt:-Infinity,state:revealState(0)};
}

export function updateDrawing(object,local,visible,depth,ending=0){
  const reveal=object.reveal;
  const opening=reveal.guide.userData.mode==='viewport';
  const measuring=opening&&local>=OPENING_MEASURE_START&&local<OPENING_MEASURE_END;
  if(opening)local=openingRevealTime(local);
  reveal.group.visible=visible;
  if(!visible){
    reveal.active=false;reveal.drawing=false;
    return reveal.state;
  }
  reveal.active=true;
  const state=revealState(local,ending);reveal.state=state;
  if(measuring)state.phase='measure';
  updateGuide(reveal.guide,state);
  for(const line of reveal.lines){
    const {offset,count}=line.userData;
    line.visible=state.lineOpacity>0;
    line.geometry.setDrawRange(0,THREE.MathUtils.clamp(Math.floor(state.stroke*reveal.total-offset),0,count));
    line.position.y=object.caster.height*depth*state.extrusion;
  }
  reveal.lines[0].material.opacity=state.lineOpacity;
  reveal.lines[0].material.color.lerpColors(NEUTRAL_LINE,reveal.targetColor,state.tint);
  if(local>=POINT_START&&!reveal.drawing){reveal.sparkAt=performance.now();reveal.drawing=true;}
  if(local<POINT_START)reveal.drawing=false;
  const age=(performance.now()-reveal.sparkAt)/300,pulse=Math.sin(clamp(age)*Math.PI);
  const opacity=state.stroke===0?1:Math.max(0,1-age);
  reveal.dot.visible=reveal.halo.visible=local>=POINT_START&&local<POINT_START+.18&&opacity>0;
  reveal.dot.material.opacity=opacity;reveal.dot.scale.setScalar(1+pulse*.8);
  reveal.halo.material.opacity=opacity*(.25+pulse*.7);
  return state;
}

export function updateReveal(object,local,visible,depth,shadowStrength,ending=0){
  const state=updateDrawing(object,local,visible,depth,ending);
  object.mesh.visible=visible&&state.fill>0;
  object.shadow.visible=visible&&state.extrusion>0;
  if(!visible)return;
  object.mesh.scale.y=Math.max(.001,state.extrusion)*depth;
  object.mesh.material.opacity=state.fill;object.mesh.material.depthWrite=state.fill>.5;
  object.mesh.material.color.lerpColors(WHITE,object.reveal.targetColor,state.tint);
  object.mesh.material.emissive.copy(object.mesh.material.color);
  object.shadow.material.opacity=shadowStrength;
  object.shadow.material.userData.shadowHeight.value=state.extrusion;
}
