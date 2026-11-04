import * as THREE from 'three';
import {gridNear,gridFalloff} from './materials.js';

const sizes=[3,6,8,12,16,24,32,44,62];
// Interior of the horizontal ㄹ stroke in the native 1130 × 1600 portrait.
const detail={x:570/1130,y:590/1600};
const vertex=`
attribute vec4 piece, tile;
attribute float depthRatio;
uniform float cameraStart,cameraEnd,cameraNow,units;
uniform vec2 wordSize,viewport,endPan,frameOffset;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
void main(){
  float z=cameraEnd*depthRatio;
  bool passesLens=z>=cameraStart;
  float distance=cameraNow-z;
  if(distance<=cameraNow*.012){gl_Position=vec4(2.,2.,2.,1.);return;}
  float atEnd=units*(cameraEnd-z);
  vec2 center=endPan+(vec2(piece.x-.5,.5-piece.y)*wordSize+frameOffset)*atEnd;
  vec2 size=piece.zw*wordSize*atEnd;

  // A piece starts beyond an edge, never as a blurred tile on the camera axis.
  if(passesLens){
    vec2 ray=endPan*(z-cameraStart)/(cameraEnd-cameraStart);
    vec2 delta=center-ray;
    float extent=length(size)*.56;
    vec2 direction=length(delta)>.0001?normalize(delta):vec2(1.,0.);
    vec2 approach=direction*max(length(delta),extent+units*z*.04*min(viewport.x,viewport.y));
    center=ray+mix(approach,delta,smoothstep(.04,.88,distance/(cameraEnd-z)));
  }
  vec2 screenSize=size/(units*distance);
  // Relative to the grid at z=0: distant marks stay legible while the
  // silhouettes near the lens enlarge, fall out of focus and pass the frame.
  float magnification=(cameraEnd-z)*cameraNow/(cameraEnd*distance);
  float blur=min(clamp((magnification-1.)*3.2,0.,15.),.20*min(screenSize.x,screenSize.y));
  vec2 padding=2.*blur/max(screenSize,vec2(.01));
  vec2 corner=position.xy*(1.+2.*padding);
  bounds=vec4(tile.xy,tile.xy+tile.zw);
  uvAt=tile.xy+(vec2(corner.x,-corner.y)+.5)*tile.zw;
  blurUV=blur*tile.zw/max(screenSize,vec2(.01));
  vec2 point=center+corner*size;
  printDetail=vec3(2.*point/(viewport*units*max(cameraStart-z,.001)),passesLens?0.:1.);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(point,z,1.);
}`;
const fragment=`
uniform sampler2D ink;
uniform vec2 halfTexel;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
uniform float paperInk;
vec4 sampleInk(vec2 uv){
  if(any(lessThan(uv,bounds.xy))||any(greaterThan(uv,bounds.zw)))return vec4(0.);
  return texture2D(ink,clamp(uv,bounds.xy+halfTexel,bounds.zw-halfTexel));
}
void main(){
  vec4 color=sampleInk(uvAt);
  if(max(blurUV.x,blurUV.y)>.00001){
    vec2 x=vec2(blurUV.x,0.),y=vec2(0.,blurUV.y);
    color=color*.25+(sampleInk(uvAt+x)+sampleInk(uvAt-x)+sampleInk(uvAt+y)+sampleInk(uvAt-y))*.125
      +(sampleInk(uvAt+x+y)+sampleInk(uvAt+x-y)+sampleInk(uvAt-x+y)+sampleInk(uvAt-x-y))*.0625;
  }
  if(printDetail.z>.5){
    float edge=smoothstep(1.20,1.80,sqrt(length(printDetail.xy*printDetail.xy)));
    color*=mix(paperInk,1.,edge);
  }
  if(color.a<.003)discard;
  gl_FragColor=color;
}`;

export function createWordFlight(scene,invalidate){
  const surface=window.MainWordSurface, banks=new Map();
  const group=new THREE.Group();group.name='결합 · size-ordered depth field';scene.add(group);
  const uniforms={ink:{value:null},cameraStart:{value:1},cameraEnd:{value:8},cameraNow:{value:1},
    units:{value:1},halfTexel:{value:new THREE.Vector2()},endPan:{value:new THREE.Vector2()},
    wordSize:{value:new THREE.Vector2()},viewport:{value:new THREE.Vector2()},
    frameOffset:{value:new THREE.Vector2()},paperInk:{value:0}};
  const material=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:fragment,
    transparent:true,premultipliedAlpha:true,depthTest:false,depthWrite:false,toneMapped:false});
  const baseBackground=scene.background,background=new THREE.Color();
  const up=new THREE.Vector3(),right=new THREE.Vector3(),center=new THREE.Vector3();
  let theme=null,mesh=null,gridCamera=null,width=0,height=0,pose=null;
  function buildGeometry(records){
    const rect=[],tile=[],depths=[];
    for(const r of records){
      rect.push(...r.rect);tile.push(...r.tile);
      depths.push(r.depthRatio);
    }
    const geom=new THREE.InstancedBufferGeometry();
    const quad=new THREE.PlaneGeometry(1,1);
    geom.index=quad.index;geom.setAttribute('position',quad.attributes.position);
    for(const [key,data,n] of [['piece',rect,4],['tile',tile,4],['depthRatio',depths,1]])
      geom.setAttribute(key,new THREE.InstancedBufferAttribute(new Float32Array(data),n));
    geom.instanceCount=records.length;
    return geom;
  }
  async function load(theme){
    const {set,image}=surface.getSource(theme);
    await image.decode();
    const atlas=new THREE.Texture(image);
    atlas.flipY=false;atlas.premultiplyAlpha=true;atlas.generateMipmaps=false;
    atlas.minFilter=THREE.LinearFilter;atlas.needsUpdate=true;
    const records=set.s.map(([x,y,w,h,ax,ay],i)=>{
      const size=Math.max(w,h);
      const noise=Math.sin(i*78.233)*43758.5453;
      return {rect:[(x+w/2)/set.w,(y+h/2)/set.h,w/set.w,h/set.h],
        tile:[ax/image.naturalWidth,ay/image.naturalHeight,w/image.naturalWidth,h/image.naturalHeight],
        size,order:noise-Math.floor(noise)};
    }).sort((a,b)=>a.size-b.size || a.order-b.order);
    // Depth follows the actual SVG footprint. Rank separates the many equal
    // 7px/13px marks without letting a smaller size overtake a larger one.
    const minSize=records[0].size,maxSize=records.at(-1).size;
    for(let i=0;i<records.length;i++){
      const r=records[i];
      const size=(r.size-minSize)/Math.max(1,maxSize-minSize),rank=i/Math.max(1,records.length-1);
      r.depthRatio=.018+.685*Math.pow(size,1.22)+.145*Math.pow(rank,1.65);
    }
    const geometry=buildGeometry(records),depths=geometry.attributes.depthRatio.array;
    const stops=[];
    for(const size of [...sizes.filter(s=>s<maxSize),maxSize]){
      const index=records.findIndex(r=>r.size>=size);
      stops.push({size:records[index].size,depth:depths[index]});
    }
    const layer=new THREE.Mesh(geometry,material);
    layer.frustumCulled=false;layer.renderOrder=4;
    banks.set(theme,{records,atlas,stops,layer,
      layeredCount:depths.reduce((n,z)=>n+(z>0),0),
      ordered:depths.every((z,i)=>i===0||z>=depths[i-1])});
  }
  function select(themeName){
    const bank=banks.get(themeName);if(!bank||theme===themeName)return;
    if(mesh)group.remove(mesh);
    theme=themeName;mesh=bank.layer;group.add(mesh);
    uniforms.ink.value=bank.atlas;
    uniforms.halfTexel.value.set(.5/bank.atlas.image.width,.5/bank.atlas.image.height);
    invalidate();
  }
  const ready=Promise.all([load('light'),load('dark')]).then(()=>select(surface.theme));
  return {
    ready,
    fit(camera,w,h){
      gridCamera=camera.clone();width=w;height=h;
    },
    update(camera,floor,p,ending){
      select(surface.theme);
      floor.visible=p===0;
      background.setScalar(theme==='dark'?1-THREE.MathUtils.smoothstep(p,0,.20):1);
      scene.background=p>0?background:baseBackground;
      const bank=banks.get(theme);
      group.visible=Boolean(bank && p>0);
      pose=null;if(!gridCamera||!bank||ending<=0)return;
      const frame=surface.frame;
      const D=gridCamera.position.y-.003,tan=Math.tan(THREE.MathUtils.degToRad(gridCamera.fov/2));
      const maxZoom=THREE.MathUtils.clamp(Math.min(width,height)/12/(12*frame.w/1130),9,19);
      const end=D*maxZoom,now=D*Math.pow(maxZoom,p),units=2*tan/height;
      gridNear.value=D;
      right.setFromMatrixColumn(gridCamera.matrixWorld,0);up.setFromMatrixColumn(gridCamera.matrixWorld,1);
      center.set(gridCamera.position.x,.003,gridCamera.position.z);
      group.position.copy(center);group.quaternion.copy(gridCamera.quaternion);
      const u=uniforms;u.cameraStart.value=D;u.cameraEnd.value=end;u.cameraNow.value=now;
      u.units.value=units;u.wordSize.value.set(frame.w,frame.h);u.viewport.value.set(width,height);
      u.frameOffset.value.set(frame.x+frame.w/2-width/2,height/2-frame.y-frame.h/2);
      const endX=width/2-frame.x-frame.w*detail.x;
      const endY=frame.y+frame.h*detail.y-height/2;
      u.endPan.value.set(endX*units*end,endY*units*end);
      if(p>0){
        const pan=(now-D)/(end-D);
        camera.position.copy(center).addScaledVector(right,endX*units*end*pan).addScaledVector(up,endY*units*end*pan);
        camera.position.y=.003+now;camera.quaternion.copy(gridCamera.quaternion);
        camera.near=Math.max(.05,now*.012);camera.far=end*3+250;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
        scene.fog.near=now+45;scene.fog.far=now+110;
      }
      // Within the same stroke, the coarse print replaces the receding fine
      // grid at its optical rate. There is no empty aperture at the focal point.
      u.paperInk.value=1-(1-THREE.MathUtils.smoothstep(now,end*.52,end*.9))/(1+gridFalloff*(now/D-1));
      const crossed=now*.988/end;
      pose={distance:now,zoom:end/now,detail,wordPieces:bank.records.length,printsVisible:group.visible,
        layeredPieces:bank.layeredCount,sizeDepthOrdered:bank.ordered,sizeDepths:bank.stops,
        passedSizeStops:bank.stops.filter(stop=>crossed>=stop.depth).map(stop=>stop.size),frame:{...frame},theme};
    },
    inspect:()=>pose
  };
}
