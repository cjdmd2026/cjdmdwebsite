import * as THREE from 'three';
import {createReveal,updateDrawing,inspectGuide,fitGuideToCell} from './reveal.js';
import {patternGrid,SOLO_COUNT,revealCue,waveCue,outlineReturn,localReveal} from './crescendo.js';
import {REVEAL_DURATION} from './reveal-timing.js';
import {scatterPattern,randomGenerator} from './scatter.js';
import {createShadowMaterial} from './shadows.js';
import {applyFlatColorFinish} from './materials.js';

function instanceMaterial(source,color){
  const material=source.clone();material.transparent=true;material.opacity=1;
  // Source materials may already be midway through their own color reveal on resize.
  material.color.set(color);material.emissive.set(color);
  material.onBeforeCompile=shader=>{
    shader.uniforms.neutralEmissive={value:new THREE.Color(0xffffff).multiplyScalar(material.emissiveIntensity)};
    shader.vertexShader='attribute float instanceReveal; attribute float instanceTint; varying float vReveal; varying float vTint;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvReveal=instanceReveal; vTint=instanceTint;');
    shader.fragmentShader='varying float vReveal; varying float vTint; uniform vec3 neutralEmissive;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,vTint); diffuseColor.a *= vReveal;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance=mix(neutralEmissive,totalEmissiveRadiance,vTint);');
  };
  material.customProgramCacheKey=()=> 'floor-pattern-color-reveal';
  return applyFlatColorFinish(material);
}

export class PatternField{
  constructor(scene,sources,material){
    this.scene=scene;this.sources=sources;this.material=material;
    this.copies=[];this.batches=[];this.key='';this.stats={count:0,visible:0,complete:0,active:0};
    this.transform=new THREE.Object3D();
  }

  fit(cameras,portrait,settings,waveOrigin){
    // Cover the ground visible through every viewport corner, plus overscan.
    // The camera frames the original field; adding tiles never pushes it farther away.
    const ray=new THREE.Raycaster(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),-.003),corners=[];
    for(const camera of cameras)for(const x of [-1.16,1.16])for(const y of [-1.16,1.16]){
        ray.setFromCamera(new THREE.Vector2(x,y),camera);
        const hit=ray.ray.intersectPlane(plane,new THREE.Vector3());if(hit)corners.push(hit);
      }
    const grid=patternGrid(portrait),box=new THREE.Box3().setFromPoints(corners);
    const minRow=Math.floor((grid.originZ-box.max.z)/grid.stepZ)-1,maxRow=Math.ceil((grid.originZ-box.min.z)/grid.stepZ)+1;
    const minCol=Math.floor(box.min.x/grid.stepX)-1,maxCol=Math.ceil(box.max.x/grid.stepX)+1;
    const key=[portrait,minRow,maxRow,minCol,maxCol,settings.layout,settings.depth,waveOrigin.x.toFixed(5),waveOrigin.z.toFixed(5)].join(':');
    this.coverage={left:box.min.x,right:box.max.x,front:box.max.z,back:box.min.z};
    if(key===this.key)return;
    this.clear();this.key=key;
    const occupied=new Map(this.sources.map(({mesh},sourceIndex)=>{
      const row=Math.round((grid.originZ-mesh.position.z)/grid.stepZ);
      return [row+':'+Math.round(mesh.position.x/grid.stepX-grid.offset(row)),sourceIndex];
    }));
    const placements=settings.layout==='scattered'?scatterPattern({left:minCol*grid.stepX,right:maxCol*grid.stepX,back:grid.originZ-maxRow*grid.stepZ,front:grid.originZ-minRow*grid.stepZ},this.sources):[];
    if(settings.layout==='grid')for(let row=minRow;row<=maxRow;row++)for(let col=minCol;col<=maxCol;col++){
      if(occupied.has(row+':'+col))continue;
      const x=(col+grid.offset(row))*grid.stepX,z=grid.originZ-row*grid.stepZ;
      placements.push({x,z,row,col,rotation:0});
    }
    if(settings.layout==='grid'){
      const random=randomGenerator(192807),order=[...placements],counts=this.sources.map(()=>1);
      // Randomize cell assignment rather than position. Include original icons
      // in the exclusion map so matches cannot touch horizontally or diagonally.
      for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
      for(const cell of order){
        const nearby=new Set();
        for(let row=cell.row-2;row<=cell.row+2;row++)for(let col=cell.col-2;col<=cell.col+2;col++){
          const sourceIndex=occupied.get(row+':'+col);
          if(sourceIndex!==undefined)nearby.add(sourceIndex);
        }
        const eligible=counts.map((_,index)=>index).filter(index=>!nearby.has(index));
        const leastUsed=Math.min(...eligible.map(index=>counts[index]));
        const choices=eligible.filter(index=>counts[index]===leastUsed);
        cell.sourceIndex=choices[Math.floor(random()*choices.length)];
        cell.radius=this.sources[cell.sourceIndex].radius;
        counts[cell.sourceIndex]++;occupied.set(cell.row+':'+cell.col,cell.sourceIndex);
      }
    }
    const radial=point=>Math.hypot(point.x-waveOrigin.x,point.z-waveOrigin.z);
    placements.forEach(cell=>{cell.radial=radial(cell);});
    const distances=[...placements.map(p=>p.radial),...this.sources.slice(SOLO_COUNT).map(source=>radial(source.mesh.position))];
    const nearest=Math.min(...distances),farthest=Math.max(...distances);
    this.wave={origin:{x:waveOrigin.x,z:waveOrigin.z},nearest,farthest};
    this.sources.forEach((source,index)=>{
      source.cue=index<SOLO_COUNT?revealCue(index):waveCue(radial(source.mesh.position),nearest,farthest);
    });
    this.sources.forEach((source,sourceIndex)=>{
      const cells=placements.filter(p=>p.sourceIndex===sourceIndex);if(!cells.length)return;
      const geometry=source.mesh.geometry.clone(),shadowGeometry=source.shadow.geometry.clone();
      const fill=new THREE.InstancedBufferAttribute(new Float32Array(cells.length),1);
      const contact=new THREE.InstancedBufferAttribute(new Float32Array(cells.length),1);
      const tint=new THREE.InstancedBufferAttribute(new Float32Array(cells.length),1);
      geometry.setAttribute('instanceReveal',fill);shadowGeometry.setAttribute('instanceReveal',contact);
      geometry.setAttribute('instanceTint',tint);
      const mesh=new THREE.InstancedMesh(geometry,instanceMaterial(source.mesh.material,source.color),cells.length);
      const shadow=new THREE.InstancedMesh(shadowGeometry,createShadowMaterial(source.patternShadow,true),cells.length);
      mesh.name=source.icon.id+'-pattern';shadow.name=source.icon.id+'-pattern-contact';shadow.renderOrder=1;
      // Repeated objects share the source's soft, lightly tinted shadow.
      mesh.castShadow=mesh.receiveShadow=false;mesh.frustumCulled=shadow.frustumCulled=false;
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);shadow.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.scene.add(mesh,shadow);
      const batch={mesh,shadow,fill,contact,tint};this.batches.push(batch);
      cells.forEach((cell,slot)=>{
        const transform=new THREE.Object3D();transform.position.set(cell.x,.003,cell.z);transform.rotation.y=cell.rotation;
        const cue=waveCue(cell.radial,nearest,farthest);
        const copy={...cell,icon:source.icon,color:source.color,mesh:transform,caster:source.caster,heightFactor:source.heightFactor,batch,slot,cue};
        copy.reveal=createReveal(copy,source.reveal);copy.reveal.group.visible=false;
        fitGuideToCell(copy.reveal,settings.layout==='grid'?grid:null);
        this.scene.add(copy.reveal.group);this.copies.push(copy);
        this.transform.position.set(cell.x,.001,cell.z);this.transform.rotation.set(-Math.PI/2,0,cell.rotation);this.transform.scale.setScalar(1);this.transform.updateMatrix();
        shadow.setMatrixAt(slot,this.transform.matrix);
      });
      shadow.instanceMatrix.needsUpdate=true;
    });
    this.stats.count=this.copies.length;
  }

  update(timeline,settings){
    let visible=0,complete=0,active=0,flattened=0;
    const ending=outlineReturn(timeline);
    this.batches.forEach(batch=>{batch.dirty=false;});
    for(const copy of this.copies){
      const started=timeline>=copy.cue.start,local=localReveal(timeline,copy.cue);
      // Reuse static solids or flat color icons; revisit both when scrolling backward.
      if(started&&local>=REVEAL_DURATION&&ending===0&&copy.settled){visible++;complete++;continue;}
      if(started&&ending===1&&copy.finalized){visible++;complete++;flattened++;continue;}
      if(!started&&copy.dormant)continue;
      copy.settled=started&&local>=REVEAL_DURATION&&ending===0;copy.finalized=started&&ending===1;
      copy.dormant=!started;copy.batch.dirty=true;
      const depth=settings.depth*copy.heightFactor;
      const state=updateDrawing(copy,local,started,depth,ending);
      if(state.phase==='solid'||state.phase==='flat')copy.reveal.group.visible=false;
      this.transform.position.copy(copy.mesh.position);this.transform.rotation.copy(copy.mesh.rotation);
      this.transform.scale.set(started?1:0,Math.max(.001,state.extrusion)*depth,started?1:0);this.transform.updateMatrix();
      copy.batch.mesh.setMatrixAt(copy.slot,this.transform.matrix);
      copy.batch.fill.setX(copy.slot,started?state.fill:0);
      copy.batch.contact.setX(copy.slot,started?state.extrusion:0);
      copy.batch.tint.setX(copy.slot,started?state.tint:0);
      if(started&&(state.fill>0||state.lineOpacity>0))visible++;
      if(started&&state.complete)complete++;
      if(started&&(!state.complete||(ending>0&&ending<1)))active++;
      if(started&&state.phase==='flat')flattened++;
    }
    for(const batch of this.batches){
      if(batch.dirty){
        batch.mesh.visible=batch.fill.array.some(value=>value>0);
        batch.shadow.visible=batch.contact.array.some(value=>value>0);
        batch.mesh.instanceMatrix.needsUpdate=true;batch.fill.needsUpdate=batch.contact.needsUpdate=batch.tint.needsUpdate=true;
      }
      batch.shadow.material.opacity=settings.shadow;
    }
    this.stats={count:this.copies.length,visible,complete,active,flattened};
  }

  isFlashing(){return this.copies.some(copy=>copy.reveal.active&&performance.now()-copy.reveal.sparkAt<360);}
  inspect(){return {...this.stats,coverage:this.coverage,wave:this.wave,instances:this.copies.map(copy=>({id:copy.icon.id,color:new THREE.Color(0xffffff).lerp(copy.reveal.targetColor,copy.batch.tint.getX(copy.slot)).getHexString(),tint:copy.batch.tint.getX(copy.slot),fill:copy.batch.fill.getX(copy.slot),flatness:copy.reveal.state.flatness,lineOpacity:copy.reveal.state.lineOpacity,lineColor:copy.reveal.lines[0].material.color.getHexString(),x:copy.x,z:copy.z,radius:copy.radius,rotation:copy.rotation,cue:copy.cue,visible:copy.batch.fill.getX(copy.slot)>0,extrusion:copy.batch.contact.getX(copy.slot),guide:inspectGuide(copy.reveal),drawingVisible:copy.reveal.group.visible,pointVisible:copy.reveal.group.visible&&copy.reveal.dot.visible,strokeVertices:copy.reveal.lines.reduce((sum,line)=>sum+line.geometry.drawRange.count,0),phase:copy.reveal.state.phase}))};}

  clear(){
    for(const copy of this.copies){
      this.scene.remove(copy.reveal.group);
      copy.reveal.guide.geometry.dispose();copy.reveal.guide.material.dispose();
      copy.reveal.lines.forEach(line=>line.geometry.dispose());copy.reveal.lines[0].material.dispose();
      copy.reveal.dot.material.dispose();copy.reveal.halo.material.dispose();
    }
    for(const {mesh,shadow} of this.batches){
      this.scene.remove(mesh,shadow);mesh.dispose();shadow.dispose();
      mesh.geometry.dispose();shadow.geometry.dispose();mesh.material.dispose();shadow.material.dispose();
    }
    this.copies=[];this.batches=[];
  }
}
