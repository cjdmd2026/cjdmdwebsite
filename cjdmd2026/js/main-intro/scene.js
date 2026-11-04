import * as THREE from 'three';
import {SVGLoader} from 'three/addons/loaders/SVGLoader.js';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {createReveal,updateReveal,flattenProgress,inspectGuide,fitGuideViewport,fitGuideToCell} from './reveal.js';
import {SOLO_COUNT,CRESCENDO_START,TOPVIEW_START,OUTLINE_RETURN_START,PULLBACK_END,STORY_END,localReveal,fieldPositions,outlineReturn,patternGrid} from './crescendo.js';
import {createWordFlight} from './word-flight.js';
import {PatternField} from './pattern.js';
import {paintGridBackdrop} from './grid-extension.js';
import {sampleCamera} from './camera-motion.js';
import {timelineAtScroll,SCROLL_DURATION,JOURNEY_HEIGHT_SVH,journeyScrollRange} from './scroll-timing.js';
import {createShadowAtlas,createShadowMaterial,KEY_LIGHT_POSITION,CONTACT_SHADOW_LAYER} from './shadows.js';
import {applyFlatColorFinish,flatFinish} from './materials.js';
import {createDottedFloor} from './floor-pattern.js';
import {createOpeningDimension} from './opening-dimension.js';
import {createOpeningConstruction} from './opening-construction.js';
import {createOpeningGuideOverlay} from './opening-guide-overlay.js';
import {GUIDE_DURATION} from './reveal-timing.js';
import {createPageStory} from './page-story.js';
import {createHeroNebula} from './hero-nebula.js';
import {createScenePreparation} from './scene-preparation.js';
import {createMainHandoff,HANDOFF_VIEWPORTS} from './main-handoff.js';
import icons from './icons.json' with {type:'json'};

const $=selector=>document.querySelector(selector);
const host=$('#scene');
const pageStory=createPageStory();
const settings={angle:38,depth:1,shadow:.64,layout:'grid'};
const objects=[];
const failures=[];
let renderer,scene,camera,keyLight,pattern,floorPattern,openingDimension,openingConstruction,openingGuideOverlay,preparation,raf=0,width=1,height=1,exporting=false;
const timelineEnd=()=>STORY_END;
const journey={current:0,target:0,poses:[],lastFrame:0};
let handoff;
let wordFlight;
let handoffProgress=0;
let backdropNeedsResize=true;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const focus=new THREE.Vector3();
// Keep the matte finish, with less self-lighting so adjacent faces stay distinct.
const clayMaterial=new THREE.MeshStandardMaterial({name:'Soft colored clay',color:0xffffff,roughness:.78,metalness:0,emissive:0xffffff,emissiveIntensity:.02,toneMapped:false});
// Narrow the rounded rim without changing the total extrusion height (50.6).
const extrusionGeometry={depth:46.2,bevelEnabled:true,bevelSize:1.3,bevelThickness:2.2,bevelSegments:5,steps:1,curveSegments:20};
const noise=(i,k=1)=>{const x=Math.sin((i+1)*127.1+k*311.7)*43758.5453;return x-Math.floor(x);};

function render(time){
  raf=0;if(!renderer||exporting)return;
  const dt=Math.min((time-journey.lastFrame)/1000||.016,.05);journey.lastFrame=time;
  if(window.MainIntro.complete&&handoffProgress===1&&!backdropNeedsResize){handoff?.update(1);return;}
  if(handoffProgress>0)journey.current=STORY_END;
  else{
    const difference=journey.target-journey.current;
    journey.current=reducedMotion.matches||Math.abs(difference)<.001
      ?journey.target:journey.current+difference*(1-Math.exp(-12*dt));
  }
  setCamera(width,height);
  wordFlight.update(camera,floorPattern.mesh,handoffProgress,camera.userData.ending);
  if(handoffProgress===1){
    paintGridBackdrop(pattern.extension,$('#heroGrid'),camera,width,height);
    backdropNeedsResize=false;
  }
  renderer.render(scene,camera);
  handoff?.update(handoffProgress);
  if((handoffProgress===0&&Math.abs(journey.target-journey.current)>.0001)||objects.some(object=>object.reveal.active&&performance.now()-object.reveal.sparkAt<360)||pattern?.isFlashing())invalidate();
}
function invalidate(){if(!raf)raf=requestAnimationFrame(render);}

// A pitch-aligned up vector stays stable even when looking exactly straight down.
function placeCamera(w,h,center,distance,shiftX=0,shiftY=0,yaw=38,pitch=44,roll=0,fov=34){
  const theta=THREE.MathUtils.degToRad(yaw),phi=THREE.MathUtils.degToRad(pitch);
  camera.aspect=w/h;camera.fov=fov;
  // Keep enough depth precision to distinguish flat icons from the white floor
  // during the distant overhead shot; a fixed .1 near plane loses that gap.
  camera.near=Math.max(.1,distance*.05);
  camera.position.set(center.x+Math.sin(theta)*Math.cos(phi)*distance,center.y+Math.sin(phi)*distance,center.z+Math.cos(theta)*Math.cos(phi)*distance);
  camera.up.set(-Math.sin(theta)*Math.sin(phi),Math.cos(phi),-Math.cos(theta)*Math.sin(phi));
  camera.lookAt(center.x,center.y,center.z);camera.rotateZ(roll);
  camera.setViewOffset(w,h,shiftX*w,shiftY*h,w,h);
  camera.updateMatrixWorld(true);
}

function screenBounds(mesh){
  const vertices=mesh.geometry.attributes.position,corner=new THREE.Vector3();
  const projection=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(mesh.matrixWorld);
  const bounds={left:Infinity,right:-Infinity,top:Infinity,bottom:-Infinity};
  // Frame the actual silhouette, including sparse icons with widely spaced parts.
  for(let i=0;i<vertices.count;i++){
    corner.fromBufferAttribute(vertices,i).applyMatrix4(projection);const sx=(corner.x+1)/2,sy=(1-corner.y)/2;
    bounds.left=Math.min(bounds.left,sx);bounds.right=Math.max(bounds.right,sx);bounds.top=Math.min(bounds.top,sy);bounds.bottom=Math.max(bounds.bottom,sy);
  }
  return bounds;
}

function fitPoses(w,h){
  const scales=objects.map(({mesh})=>mesh.scale.y);
  objects.forEach(({mesh,heightFactor})=>{mesh.scale.y=settings.depth*heightFactor;});scene.updateMatrixWorld(true);
  journey.poses=objects.slice(0,SOLO_COUNT).map(({mesh,index})=>{
    const center=new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
    center.y=mesh.position.y;
    const yaw=index===0?0:settings.angle+(index===1?-8:12),pitch=index===0?90:index===1?48:58;
    let distance=4,bounds;
    for(let i=0;i<80;i++){
      placeCamera(w,h,center,distance,0,0,yaw,pitch);bounds=screenBounds(mesh);
      if(bounds.right-bounds.left<(w/h<1?.78:.52)&&bounds.bottom-bounds.top<.45)break;
      distance*=1.035;
    }
    return {center,distance,yaw,pitch,shiftX:(bounds.left+bounds.right)/2-.5,shiftY:(bounds.top+bounds.bottom)/2-.5};
  });
  // Use one lens and one dolly distance for the opening three forms.
  const soloDistance=Math.max(...journey.poses.map(pose=>pose.distance));
  journey.poses.forEach((pose,index)=>{
    pose.distance=soloDistance;
    placeCamera(w,h,pose.center,pose.distance,0,0,pose.yaw,pose.pitch);
    const bounds=screenBounds(objects[index].mesh);
    pose.shiftX=(bounds.left+bounds.right)/2-.5;pose.shiftY=(bounds.top+bounds.bottom)/2-.5;
  });
  floorPattern.fit(journey.poses[0],h);
  const guideGrid=settings.layout==='grid'?patternGrid(journey.layoutMode==='portrait'):null;
  objects.forEach(object=>fitGuideToCell(object.reveal,guideGrid));
  const opening=journey.poses[0];
  placeCamera(w,h,opening.center,opening.distance,opening.shiftX,opening.shiftY,opening.yaw,opening.pitch);
  fitGuideViewport(objects[0].reveal,camera);
  const fullBox=new THREE.Box3();objects.forEach(({mesh})=>fullBox.expandByObject(mesh));
  const center=fullBox.getCenter(new THREE.Vector3()),yaw=settings.angle,pitch=54;
  center.y=.003;
  let distance=14,bounds;
  for(let i=0;i<90;i++){
    placeCamera(w,h,center,distance,0,0,yaw,pitch,0,34);bounds=fieldBounds();
    if(bounds.right-bounds.left<.94&&bounds.bottom-bounds.top<(w/h<.8?.72:.76))break;
    distance*=1.045;
  }
  const finalYaw=90+settings.angle-38;
  let finalDistance=distance*1.65;
  for(let i=0;i<60;i++){
    placeCamera(w,h,center,finalDistance,0,0,finalYaw,90);const finalBounds=fieldBounds();
    if(finalBounds.right-finalBounds.left<.90&&finalBounds.bottom-finalBounds.top<.76)break;
    finalDistance*=1.045;
  }
  journey.wide={center,distance:finalDistance,yaw:finalYaw,pitch:90,fov:34,shiftX:0,shiftY:0};
  // Include the entire dolly-and-tilt route, so turning overhead never reveals a bare edge.
  const coverageCameras=[];
  for(let time=CRESCENDO_START;time<=PULLBACK_END+.001;time+=(PULLBACK_END-CRESCENDO_START)/12){
    const pose=sampleCamera(time,journey.poses,journey.wide);
    placeCamera(w,h,pose.center,pose.distance,pose.shiftX,pose.shiftY,pose.yaw,pose.pitch,pose.roll,pose.fov);
    coverageCameras.push(camera.clone());
  }
  // Start the ripple at the ground point under the viewport center as the field opens.
  const wavePose=sampleCamera(CRESCENDO_START,journey.poses,journey.wide);
  placeCamera(w,h,wavePose.center,wavePose.distance,wavePose.shiftX,wavePose.shiftY,wavePose.yaw,wavePose.pitch,wavePose.roll,wavePose.fov);
  const ray=new THREE.Raycaster(),waveOrigin=new THREE.Vector3();
  ray.setFromCamera(new THREE.Vector2(0,0),camera);
  ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-.003),waveOrigin);
  pattern?.fit(coverageCameras,journey.layoutMode==='portrait',settings,waveOrigin);
  objects.forEach(({mesh},index)=>{mesh.scale.y=scales[index];});scene.updateMatrixWorld(true);
}

function fieldBounds(){
  const result={left:Infinity,right:-Infinity,top:Infinity,bottom:-Infinity};
  objects.forEach(({mesh})=>{
    const bounds=screenBounds(mesh);
    result.left=Math.min(result.left,bounds.left);result.right=Math.max(result.right,bounds.right);
    result.top=Math.min(result.top,bounds.top);result.bottom=Math.max(result.bottom,bounds.bottom);
  });
  return result;
}

function setCamera(w,h){
  if(!journey.poses.length)return;
  const timeline=THREE.MathUtils.clamp(journey.current,0,STORY_END);
  pageStory.update(timeline);
  const ending=outlineReturn(timeline);
  flatFinish.value=flattenProgress(ending);
  const shadowStrength=handoffProgress>0?0:settings.shadow*(1-THREE.MathUtils.smoothstep(timeline,TOPVIEW_START,OUTLINE_RETURN_START));
  if(shadowStrength>0)camera.layers.enable(CONTACT_SHADOW_LAYER);
  else camera.layers.disable(CONTACT_SHADOW_LAYER);
  const pose=sampleCamera(timeline,journey.poses,journey.wide,reducedMotion.matches?0:1);
  const {solo,index:soloIndex,distance,yaw,pitch,shiftX,shiftY,roll,fov,travelling,pullback,overhead}=pose;
  focus.set(pose.center.x,pose.center.y,pose.center.z);
  placeCamera(w,h,focus,distance,shiftX,shiftY,yaw,pitch,roll,fov);
  if(timeline<=GUIDE_DURATION){
    const rect=host.getBoundingClientRect();
    fitGuideViewport(objects[0].reveal,camera,2*Math.max(0,rect.top)/Math.max(1,rect.height));
  }
  floorPattern.update(pitch,timeline>=TOPVIEW_START);
  let generated=0,complete=0,activeReveals=0;
  objects.forEach(object=>{
    const started=timeline>=object.cue.start;
    const visible=started;
    updateReveal(object,localReveal(timeline,object.cue),visible,settings.depth*object.heightFactor,shadowStrength,ending);
    if(started)generated++;
    if(visible&&object.reveal.state.complete)complete++;
    if(visible&&(!object.reveal.state.complete||(ending>0&&ending<1)))activeReveals++;
  });
  pattern?.update(timeline,settings,shadowStrength);
  scene.updateMatrixWorld(true);
  openingGuideOverlay?.update(camera);
  openingDimension?.update(localReveal(timeline,objects[0].cue),camera,w,h);
  openingConstruction?.update(localReveal(timeline,objects[0].cue),camera,w,h);
  scene.fog.near=distance+45;scene.fog.far=distance+110;
  keyLight.position.copy(focus).add(new THREE.Vector3(...KEY_LIGHT_POSITION));keyLight.target.position.copy(focus);
  const latest=objects.filter(object=>timeline>=object.cue.start).sort((a,b)=>b.cue.start-a.cue.start)[0];
  const index=solo?soloIndex:latest.index,state=objects[index].reveal.state;
  const phase=solo?'solo':timeline<TOPVIEW_START+.3?'crescendo':'finale';
  const framing=pullback>.99?fieldBounds():screenBounds(objects[index].mesh);
  camera.userData={projection:'cinematic-perspective',framing,position:camera.position.toArray(),focus:focus.toArray(),index,progress:timeline/STORY_END,timeline,yaw,pitch,roll,distance,travelling,pullback,overhead,ending,groundShadows:camera.layers.isEnabled(CONTACT_SHADOW_LAYER),direction:camera.getWorldDirection(new THREE.Vector3()).toArray(),phase,generated,complete,activeReveals,reveal:{...state}};
}

function readScroll(){
  const track=$('#journey');
  const trackTop=track.getBoundingClientRect().top+scrollY;
  const handoffDistance=host.clientHeight*HANDOFF_VIEWPORTS;
  const {start,distance}=journeyScrollRange(trackTop,track.offsetHeight-handoffDistance,host.clientHeight);
  const gridOffset=scrollY-start-distance;
  handoff?.readScroll();
  const target=timelineAtScroll(THREE.MathUtils.clamp((scrollY-start)/distance,0,1)*SCROLL_DURATION),nearest=Math.round(target);
  journey.target=gridOffset>=-1?STORY_END:Math.abs(target-nearest)<.001?Math.min(nearest,STORY_END):target;
  invalidate();
}

async function createObjects(){
  const loader=new SVGLoader();
  for(let index=0;index<icons.length;index++){
    const icon=icons[index];
    try{
      const parsed=loader.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" fill="white">${icon.svg}</svg>`);
      const shapes=parsed.paths.flatMap(path=>path.toShapes());
      if(!shapes.length)throw new Error('Empty geometry');
      const geometry=new THREE.ExtrudeGeometry(shapes,extrusionGeometry);
      geometry.rotateX(Math.PI/2);
      geometry.computeBoundingBox();
      const box=geometry.boundingBox,center=box.getCenter(new THREE.Vector3());
      geometry.translate(-center.x,-box.min.y,-center.z);
      const size=2.25+(noise(index,2)-.5)*.65;
      const scale=size/Math.max(box.max.x-box.min.x,box.max.z-box.min.z);
      geometry.scale(scale,scale,scale);geometry.computeBoundingBox();geometry.computeBoundingSphere();
      const positions=geometry.attributes.position;let radius=0;
      for(let vertex=0;vertex<positions.count;vertex++)radius=Math.max(radius,Math.hypot(positions.getX(vertex),positions.getZ(vertex)));
      const color=icon.color;
      const material=applyFlatColorFinish(clayMaterial.clone());material.transparent=true;
      material.name=icon.id+'-clay';
      const mesh=new THREE.Mesh(geometry,material);
      mesh.name=icon.id;mesh.castShadow=true;mesh.receiveShadow=true;
      mesh.userData={id:icon.id,name:icon.name,index,source:'SVG',shapeCount:shapes.length,holeCount:shapes.reduce((sum,shape)=>sum+shape.holes.length,0)};
      scene.add(mesh);
      const shadowSpan=size+4.2;
      const [viewX,viewY,viewWidth,viewHeight]=icon.viewBox.trim().split(/[\s,]+/).map(Number);
      const svgBounds={minX:(viewX-center.x)*scale,maxX:(viewX+viewWidth-center.x)*scale,
        minZ:(viewY-center.z)*scale,maxZ:(viewY+viewHeight-center.z)*scale};
      mesh.userData.svgBounds=svgBounds;
      // Boundary contours give the same extruded silhouette without rasterizing
      // thousands of overlapping bevel triangles for every light sample.
      const caster={svgBounds,height:(extrusionGeometry.depth+extrusionGeometry.bevelThickness*2)*scale,contours:shapes.flatMap(shape=>[
        {hole:false,points:shape.getPoints(16)},...shape.holes.map(hole=>({hole:true,points:hole.getPoints(16)}))
      ]).map(contour=>({hole:contour.hole,points:contour.points.map(p=>[(p.x-center.x)*scale,(p.y-center.z)*scale])}))};
      const shadow=new THREE.Mesh(new THREE.PlaneGeometry(shadowSpan,shadowSpan),createShadowMaterial());
      shadow.layers.set(CONTACT_SHADOW_LAYER);
      shadow.name=icon.id+'-contact';shadow.rotation.x=-Math.PI/2;shadow.position.y=.001;shadow.renderOrder=1;scene.add(shadow);
      objects.push({icon,color,mesh,shadow,size,radius,index,shadowSpan,caster,shadowKey:''});
    }catch(error){failures.push({id:icon.id,error:error.message});}
  }
  if(objects.length!==33)throw new Error(`Expected 33 objects, created ${objects.length}: ${JSON.stringify(failures)}`);
  positionObjects();
}

function positionObjects(){
  const portrait=host.clientWidth/host.clientHeight<.8,coordinates=fieldPositions(portrait,settings.layout,objects.map(object=>object.radius));
  journey.layoutMode=portrait?'portrait':'landscape';
  objects.forEach(object=>{
    const {index,mesh,shadow}=object,base=coordinates[index];
    const x=base.x,z=base.z;
    // Keep the grid and every SVG upright; only the designs assigned to cells vary.
    const rotation=0;
    object.heightFactor=base.height;const depth=settings.depth*object.heightFactor;
    mesh.position.set(x,.003,z);mesh.rotation.y=rotation;mesh.scale.y=depth;
    shadow.position.set(x,.001,z);shadow.rotation.z=rotation;
    if(object.reveal){object.reveal.group.position.copy(mesh.position);object.reveal.group.rotation.copy(mesh.rotation);}
    const shadowKey=`${depth}:${rotation}`;
    if(object.shadowKey!==shadowKey){
      const previous=shadow.material.map;
      if(object.patternShadow&&object.patternShadow!==previous)object.patternShadow.dispose();
      shadow.material.map=createShadowAtlas(object.caster,object.shadowSpan,depth,rotation);
      // Originals and copies share height frames; only their reveal progress differs.
      object.patternShadow=rotation===0?shadow.material.map:createShadowAtlas(object.caster,object.shadowSpan,depth,0);
      shadow.material.needsUpdate=true;previous?.dispose();object.shadowKey=shadowKey;
    }
    shadow.material.opacity=settings.shadow;
  });
  scene.updateMatrixWorld(true);
}

function resize(){
  if(!renderer||exporting)return;
  width=host.clientWidth;height=host.clientHeight;
  backdropNeedsResize=true;
  if(journey.layoutMode!==(width/height<.8?'portrait':'landscape'))positionObjects();
  // Supersample lower-density displays too, keeping small silhouettes well defined.
  renderer.setPixelRatio(2);renderer.setSize(width,height,false);
  fitPoses(width,height);
  const terminal=journey.wide;
  placeCamera(width,height,terminal.center,terminal.distance,0,0,terminal.yaw,90,0,terminal.fov);
  wordFlight.fit(camera,width,height);
  readScroll();setCamera(width,height);preparation?.prepare();invalidate();
}

async function exportPNG(w=3840,h=2160){
  exporting=true;
  try{
    renderer.setPixelRatio(1);renderer.setSize(w,h,false);fitPoses(w,h);setCamera(w,h);renderer.render(scene,camera);
    return renderer.domElement.toDataURL('image/png');
  }finally{exporting=false;resize();}
}

async function exportGLB(index){
  const exporter=new GLTFExporter();
  let root;
  const materials=[];
  const exportMaterial=object=>{
    const material=object.mesh.material.clone();material.opacity=1;material.transparent=false;material.depthWrite=true;
    material.color.set(object.color);material.emissive.set(object.color);
    materials.push(material);return material;
  };
  if(Number.isInteger(index)){
    root=objects[index].mesh.clone();root.visible=true;root.material=exportMaterial(objects[index]);root.position.set(0,0,0);root.rotation.set(0,0,0);root.scale.y=settings.depth*objects[index].heightFactor;
  }else{
    root=new THREE.Group();root.name='CJU_33_COLOR_OBJECTS';
    objects.forEach(object=>{
      const mesh=object.mesh.clone();mesh.visible=true;mesh.material=exportMaterial(object);
      object.mesh.matrixWorld.decompose(mesh.position,mesh.quaternion,mesh.scale);
      mesh.scale.y=settings.depth*object.heightFactor;
      root.add(mesh);
    });
  }
  let buffer;
  try{buffer=await exporter.parseAsync(root,{binary:true});}finally{materials.forEach(material=>material.dispose());}
  let binary='';const bytes=new Uint8Array(buffer);
  for(let start=0;start<bytes.length;start+=16384)binary+=String.fromCharCode(...bytes.subarray(start,start+16384));
  return btoa(binary);
}

async function init(){
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
    renderer.setClearColor(0xfafafa);renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
    renderer.shadowMap.enabled=false;
    renderer.domElement.setAttribute('aria-label','33종의 원본 컬러 입체 아이콘이 반복되어 바닥을 채우는 패턴');host.append(renderer.domElement);
    scene=new THREE.Scene();scene.background=new THREE.Color(0xfafafa);scene.fog=new THREE.Fog(0xfafafa,10,17);
    camera=new THREE.PerspectiveCamera(32,1,.1,250);
    scene.add(new THREE.HemisphereLight(0xffffff,0xf1f0ed,1.9));
    keyLight=new THREE.DirectionalLight(0xfffdf8,1.7);keyLight.position.set(...KEY_LIGHT_POSITION);
    scene.add(keyLight);scene.add(keyLight.target);
    const fill=new THREE.DirectionalLight(0xffffff,.7);fill.position.set(12,16,-8);scene.add(fill);
    floorPattern=createDottedFloor(renderer);scene.add(floorPattern.mesh);
    await createObjects();
    window.heroNebula=createHeroNebula($('.hero-art'),objects);
    objects.forEach((object,index)=>{object.reveal=createReveal(object,undefined,index===0?'viewport':'edge');scene.add(object.reveal.group);});
    openingDimension=createOpeningDimension(host,objects[0]);
    openingConstruction=createOpeningConstruction(host,objects[0]);
    openingGuideOverlay=createOpeningGuideOverlay(host,objects[0].reveal);
    pattern=new PatternField(scene,objects,clayMaterial);
    preparation=createScenePreparation(renderer,scene,camera,invalidate);
    wordFlight=createWordFlight(scene,invalidate);
    await wordFlight.ready;
    handoff=createMainHandoff(host,progress=>{
      handoffProgress=progress;invalidate();
    });
    $('#journey').style.height=`${JOURNEY_HEIGHT_SVH+HANDOFF_VIEWPORTS*100}svh`;
    addEventListener('scroll',readScroll,{passive:true});addEventListener('resize',resize);
    resize();renderer.render(scene,camera);host.classList.add('ready');
    window.heroStudio={ready:true,exportPNG,exportGLB,inspect:()=>({count:objects.length,preparation:preparation.inspect(),pattern:pattern.inspect(),floor:floorPattern.inspect(),dimension:openingDimension.inspect(),errors:failures,settings:{...settings},timelineEnd:timelineEnd(),cameraPath:{poses:journey.poses,wide:journey.wide},wordFlight:wordFlight.inspect(),camera:{...camera.userData,rotation:camera.rotation.toArray(),up:camera.up.toArray()},objects:objects.map(({mesh,icon,reveal,heightFactor,index,radius,cue})=>({id:icon.id,name:icon.name,vertices:mesh.geometry.attributes.position.count,triangles:mesh.geometry.attributes.position.count/3,...mesh.userData,color:mesh.material.color.getHexString(),lineColor:reveal.lines[0].material.color.getHexString(),cue,heightFactor,radius,position:mesh.position.toArray(),baseY:mesh.position.y,rotation:mesh.rotation.toArray(),heightScale:mesh.scale.y,visible:mesh.visible,guide:inspectGuide(reveal),drawingVisible:reveal.group.visible,pointVisible:reveal.group.visible&&reveal.dot.visible,strokeVertices:reveal.lines.reduce((sum,line)=>sum+line.geometry.drawRange.count,0),reveal:{...reveal.state}})),renderer:renderer.info.render})};
  }catch(error){
    console.warn('Intro unavailable; continuing with the existing main hero.',error);
    window.MainIntro.complete=true;window.MainIntro.progress=1;
    document.body.classList.remove('intro-before-main');
    document.body.classList.add('intro-unavailable');
    window.dispatchEvent(new CustomEvent('main-intro-handoff',{detail:{complete:true}}));
    window.heroStudio={ready:false,error:String(error)};
  }
}
init();
