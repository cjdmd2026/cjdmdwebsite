import * as THREE from 'three';
import {gridNear,gridFalloff,gridInk,gridRecession} from './materials.js';

const sizes=[3,6,8,12,16,24,32,44,62];
// Interior of the horizontal ㄹ stroke in the native 1130 × 1600 portrait.
const detail={x:570/1130,y:590/1600};
const vertex=`
attribute vec4 piece, tile;
attribute float depthRatio;
attribute vec3 appearance;
attribute vec3 swim;
attribute vec4 scatter;
attribute vec2 gatherSpan;
uniform float cameraStart,cameraEnd,cameraNow,units,flight,recession,gather;
uniform float swimTime,swimScale,motionEnabled;
uniform vec2 wordSize,viewport,endPan,frameOffset;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
varying float markInk;
void main(){
  float z=cameraEnd*depthRatio-recession*appearance.y;
  bool passesLens=z>=cameraStart;
  float distance=cameraNow-z;
  if(distance<=cameraNow*.012){gl_Position=vec4(2.,2.,2.,1.);return;}
  float atEnd=units*(cameraEnd-z);
  vec2 cloud=vec2(scatter.x-.5,.5-scatter.y)*viewport;
  vec2 portrait=vec2(piece.x-.5,.5-piece.y)*wordSize+frameOffset;
  float joined=smoothstep(gatherSpan.x,gatherSpan.x+gatherSpan.y,gather);
  vec2 route=portrait-cloud;
  float bend=min(1.,min(viewport.x,viewport.y)/max(1.,length(route)))*.04*sin(swim.x);
  vec2 arc=vec2(-route.y,route.x)*bend*4.*joined*(1.-joined)*motionEnabled;
  vec2 center=endPan+(mix(cloud,portrait,joined)+arc)*atEnd;
  vec2 size=piece.zw*wordSize*atEnd*mix(scatter.z,1.,joined);

  float extraSway=0.;
  // The soft marks already occupy the rear plane while their foreground icons fly in.
  if(motionEnabled>.5 && appearance.z==0.){
    // Launch outside the *moving* viewport when the lens first clears this plane.
    float entry=max(cameraStart,z/.988);
    float start=log(entry/cameraStart)/log(cameraEnd/cameraStart);
    float t=clamp((flight-start)/(1.-start),0.,1.);
    vec2 ray=endPan*((entry-cameraStart)/(cameraEnd-cameraStart));
    vec2 delta=center-ray;
    vec2 heading=vec2(cos(swim.x),sin(swim.x));
    vec2 radial=length(delta)>.0001?normalize(delta):heading;
    float edge=units*.5*min(viewport.x,viewport.y)*max(entry-z,entry*.04);
    vec2 dir=normalize(radial + (.20+.65*(1.-smoothstep(edge,edge*3.,length(delta))))*heading);
    float extent=units*.5*min(viewport.x/max(abs(dir.x),.001),viewport.y/max(abs(dir.y),.001))*max(entry-z,entry*.04);
    float margin=length(size)*.85+(swim.z+12.)*swimScale*atEnd;
    vec2 origin=ray+dir*max(length(delta)+edge*(.14+.10*sin(swim.x)),extent*1.08+margin);
    // Stagger by depth and individual phase. Both the travel and the extra sway
    // lose their velocity at the landing point, leaving only the portrait's orbit.
    float remaining=pow(1.-t,2.25+.55*sin(swim.x));
    center=mix(center,origin,remaining)
      +vec2(-dir.y,dir.x)*sin(swim.x*1.9)*edge*.58*t*remaining;
    extraSway=10.*remaining;
  }
  if(motionEnabled>.5){
    vec2 orbit=vec2(sin(swim.x+swimTime*swim.y),-.70*cos(swim.x*1.37+swimTime*swim.y*.81));
    center+=orbit*(swim.z+extraSway)*swimScale*atEnd;
  }
  vec2 screenSize=size/(units*distance);
  // Relative to the grid at z=0: distant marks stay legible while the
  // silhouettes near the lens enlarge, fall out of focus and pass the frame.
  float magnification=(cameraEnd-z)*cameraNow/(cameraEnd*distance);
  float defocus=1.15*(1.-smoothstep(.28,.94,flight));
  float blur=min(clamp((magnification-1.)*3.2+defocus,0.,15.),.20*min(screenSize.x,screenSize.y));
  blur=max(blur,appearance.z*min(screenSize.x,screenSize.y));
  blur=max(blur,scatter.w*swimScale*(1.-joined));
  vec2 padding=2.*blur/max(screenSize,vec2(.01));
  vec2 corner=position.xy*(1.+2.*padding);
  bounds=vec4(tile.xy,tile.xy+tile.zw);
  uvAt=tile.xy+(vec2(corner.x,-corner.y)+.5)*tile.zw;
  blurUV=blur*tile.zw/max(screenSize,vec2(.01));
  vec2 point=center+corner*size;
  printDetail=vec3(2.*point/(viewport*units*max(cameraStart-z,.001)),passesLens?0.:1.);
  markInk=appearance.x*(motionEnabled>.5?1.:smoothstep(0.,.045,flight));
  gl_Position=projectionMatrix*modelViewMatrix*vec4(point,z,1.);
}`;
const fragment=`
uniform sampler2D ink;
uniform vec2 halfTexel;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
varying float markInk;
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
  color*=markInk;
  if(color.a<.003)discard;
  gl_FragColor=color;
}`;

export function createWordFlight(scene,invalidate){
  const surface=window.MainWordSurface, banks=new Map();
  const group=new THREE.Group();group.name='결합 · size-ordered depth field';scene.add(group);
  const uniforms={ink:{value:null},cameraStart:{value:1},cameraEnd:{value:8},cameraNow:{value:1},
    units:{value:1},halfTexel:{value:new THREE.Vector2()},endPan:{value:new THREE.Vector2()},
    wordSize:{value:new THREE.Vector2()},viewport:{value:new THREE.Vector2()},
    frameOffset:{value:new THREE.Vector2()},paperInk:{value:0},flight:{value:0},recession:gridRecession,
    swimTime:{value:0},swimScale:{value:1},motionEnabled:{value:1},gather:{value:0}};
  const material=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:fragment,
    transparent:true,premultipliedAlpha:true,depthTest:false,depthWrite:false,toneMapped:false});
  const baseBackground=scene.background,background=new THREE.Color();
  const up=new THREE.Vector3(),right=new THREE.Vector3(),center=new THREE.Vector3();
  let theme=null,mesh=null,gridCamera=null,width=0,height=0,pose=null;
  function buildGeometry(records){
    const rect=[],tile=[],depths=[],appearance=[],swims=[],scatter=[],spans=[];
    for(const r of records){
      rect.push(...r.rect);tile.push(...r.tile);
      depths.push(r.depthRatio);
      appearance.push(r.opacity??1,r.backFraction??0,r.blurRatio??0);
      swims.push(...r.swim);
      scatter.push(...r.scatter);spans.push(...r.span);
    }
    const geom=new THREE.InstancedBufferGeometry();
    const quad=new THREE.PlaneGeometry(1,1);
    geom.index=quad.index;geom.setAttribute('position',quad.attributes.position);
    for(const [key,data,n] of [['piece',rect,4],['tile',tile,4],['depthRatio',depths,1],['appearance',appearance,3],
      ['swim',swims,3],['scatter',scatter,4],['gatherSpan',spans,2]])
      geom.setAttribute(key,new THREE.InstancedBufferAttribute(new Float32Array(data),n));
    geom.instanceCount=records.length;
    return geom;
  }
  async function load(theme){
    const {set,image,prints}=surface.getSource(theme);
    await image.decode();
    const atlas=new THREE.Texture(image);
    atlas.flipY=false;atlas.premultiplyAlpha=true;atlas.generateMipmaps=false;
    atlas.minFilter=THREE.LinearFilter;atlas.needsUpdate=true;
    const bySource=set.s.map(([x,y,w,h,ax,ay],i)=>{
      const size=Math.max(w,h);
      const noise=Math.sin(i*78.233)*43758.5453;
      return {rect:[(x+w/2)/set.w,(y+h/2)/set.h,w/set.w,h/set.h],
        tile:[ax/image.naturalWidth,ay/image.naturalHeight,w/image.naturalWidth,h/image.naturalHeight],
        size,order:noise-Math.floor(noise),...prints[i]};
    });
    const records=[...bySource].sort((a,b)=>a.size-b.size || a.order-b.order);
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
    banks.set(theme,{records,bySource,atlas,stops,layer,svgHeight:set.h,
      layeredCount:depths.reduce((n,z)=>n+(z>0),0),
      ordered:depths.every((z,i)=>i===0||z>=depths[i-1])});
  }
  function fitSurroundings(bank,frame){
    const field=surface.getSurroundings(theme);
    if(field===bank.field)return;
    // Both renderers use the same atlas crop, size, opacity and landing point.
    const sides=field.map(item=>{
      const source=bank.bySource[item.sprite.sourceIndex];
      const sizeInSvg=Math.max(item.w,item.h)*bank.svgHeight/frame.h;
      const owner=bank.bySource[item.ownerIndex];
      // A soft landing patch follows its foreground icon in both layouts.
      // Peripheral flecks stay in their surrounding field while the word gathers.
      const scatter=owner ? [
        owner.scatter[0]+(item.x-frame.x-owner.rect[0]*frame.w)*owner.scatter[2]/width,
        owner.scatter[1]+(item.y-frame.y-owner.rect[1]*frame.h)*owner.scatter[2]/height,
        owner.scatter[2],0
      ] : [item.x/width,item.y/height,1,0];
      return {...source,rect:[(item.x-frame.x)/frame.w,(item.y-frame.y)/frame.h,item.w/frame.w,item.h/frame.h],
        depthRatio:item.blurRatio ? .020+.0012*sizeInSvg : source.depthRatio,blurRatio:item.blurRatio,
        scatter,span:owner?.span ?? source.span,swim:item.swim,opacity:item.opacity,backFraction:item.detail ? .8-(source.size-3)*.13 : 0};
    });
    bank.field=field;bank.detailCount=field.filter(item=>item.detail).length;
    const ordered=[...sides,...bank.records].sort((a,b)=>a.depthRatio-b.depthRatio);
    const geometry=buildGeometry(ordered);
    bank.layer.geometry.dispose();bank.layer.geometry=geometry;
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
  window.addEventListener('main-word-layout',invalidate);
  return {
    ready,
    fit(camera,w,h){
      gridCamera=camera.clone();width=w;height=h;
    },
    update(camera,floor,p,ending,gather){
      select(surface.theme);
      floor.visible=p===0;
      uniforms.flight.value=p;
      uniforms.gather.value=gather;
      // Let the first arriving SVG marks overlap the rear pattern before its ink fades.
      gridInk.value=1-THREE.MathUtils.smootherstep(p,.26,.70);
      gridRecession.value=0;
      background.setScalar(theme==='dark'?1-THREE.MathUtils.smoothstep(p,0,.20):1);
      scene.background=p>0?background:baseBackground;
      const bank=banks.get(theme);
      const frame=surface.frame;
      if(bank)fitSurroundings(bank,frame);
      group.visible=Boolean(bank && p>0);
      pose=null;if(!gridCamera||!bank||ending<=0)return;
      const D=gridCamera.position.y-.003,tan=Math.tan(THREE.MathUtils.degToRad(gridCamera.fov/2));
      const maxZoom=THREE.MathUtils.clamp(Math.min(width,height)/12/(12*frame.w/1130),9,19);
      const end=D*maxZoom,now=D*Math.pow(maxZoom,p),units=2*tan/height;
      gridNear.value=D;
      gridRecession.value=D*.85*THREE.MathUtils.smootherstep(p,0,.38);
      right.setFromMatrixColumn(gridCamera.matrixWorld,0);up.setFromMatrixColumn(gridCamera.matrixWorld,1);
      center.set(gridCamera.position.x,.003,gridCamera.position.z);
      group.position.copy(center);group.quaternion.copy(gridCamera.quaternion);
      const u=uniforms;u.cameraStart.value=D;u.cameraEnd.value=end;u.cameraNow.value=now;
      u.swimTime.value=surface.time;u.swimScale.value=frame.h/bank.svgHeight;u.motionEnabled.value=Number(surface.motionEnabled);
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
      u.paperInk.value=1-gridInk.value/(1+gridFalloff*((now+gridRecession.value)/D-1));
      const crossed=now*.988/end;
      pose={distance:now,zoom:end/now,gather,detail,wordPieces:bank.records.length,printsVisible:group.visible,
        gridInk:gridInk.value,gridRecession:gridRecession.value,surroundings:bank.field.length,detailPrints:bank.detailCount,
        layeredPieces:bank.layeredCount,sizeDepthOrdered:bank.ordered,sizeDepths:bank.stops,
        passedSizeStops:bank.stops.filter(stop=>crossed>=stop.depth).map(stop=>stop.size),frame:{...frame},theme};
    },
    inspect:()=>pose
  };
}
