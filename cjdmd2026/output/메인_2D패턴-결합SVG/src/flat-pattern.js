// 시작 지점: main/index.html의 카메라가 수직으로 내려다보는 컬러 2D 패턴.
import * as THREE from 'three';
import {SVGLoader} from 'three/addons/loaders/SVGLoader.js';
import {SOLO_COUNT,CRESCENDO_START,PULLBACK_END,fieldPositions,patternGrid} from './crescendo.js';
import {sampleCamera} from './camera-motion.js';
import {randomGenerator} from './scatter.js';
import {createGridExtension} from './grid-extension.js';
import {applyGridDistance,flatFinish} from './materials.js';
import icons from '../assets/icons.json';
export function createFlatPattern(scene,camera){
const objects=[],settings={depth:1,angle:38,layout:'grid'},journey={};
const group=new THREE.Group();scene.add(group);
let extension;
const loader=new SVGLoader();
const extrusionGeometry={depth:46.2,bevelEnabled:true,bevelSize:1.3,bevelThickness:2.2,bevelSegments:5,steps:1,curveSegments:20};
const noise=(i,k=1)=>{const x=Math.sin((i+1)*127.1+k*311.7)*43758.5453;return x-Math.floor(x);};


  for(const [index,icon] of icons.entries()){
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

    const material=applyGridDistance(new THREE.MeshBasicMaterial({color:icon.color,transparent:true,toneMapped:false}));
    const mesh=new THREE.Mesh(geometry,material); group.add(mesh);
    const caster={contours:shapes.flatMap(shape=>[shape,...shape.holes]).map(shape=>({
      points:shape.getPoints(16).map(p=>[(p.x-center.x)*scale,(p.y-center.z)*scale])
    }))};
    objects.push({mesh,index,radius,caster,color:icon.color});
  }
  flatFinish.value=1;
  const batches=[];
  function fitGrid(cameras){
    for(const mesh of batches){group.remove(mesh);mesh.dispose();}batches.length=0;
    if(extension){group.remove(extension);extension.geometry.dispose();extension.material.map.dispose();extension.material.dispose();}
    const portrait=journey.layoutMode==='portrait';
    const ray=new THREE.Raycaster(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),-.003),corners=[];
    for(const camera of cameras)for(const x of [-1.16,1.16])for(const y of [-1.16,1.16]){
        ray.setFromCamera(new THREE.Vector2(x,y),camera);
        const hit=ray.ray.intersectPlane(plane,new THREE.Vector3());if(hit)corners.push(hit);
      }
    const grid=patternGrid(portrait),box=new THREE.Box3().setFromPoints(corners);
    const minRow=Math.floor((grid.originZ-box.max.z)/grid.stepZ)-1,maxRow=Math.ceil((grid.originZ-box.min.z)/grid.stepZ)+1;
    const minCol=Math.floor(box.min.x/grid.stepX)-1,maxCol=Math.ceil(box.max.x/grid.stepX)+1;
    const occupied=new Map(objects.map(({mesh},sourceIndex)=>{
      const row=Math.round((grid.originZ-mesh.position.z)/grid.stepZ);
      return [row+':'+Math.round(mesh.position.x/grid.stepX-grid.offset(row)),sourceIndex];
    }));
    const placements=[];
    if(settings.layout==='grid')for(let row=minRow;row<=maxRow;row++)for(let col=minCol;col<=maxCol;col++){
      if(occupied.has(row+':'+col))continue;
      const x=(col+grid.offset(row))*grid.stepX,z=grid.originZ-row*grid.stepZ;
      placements.push({x,z,row,col,rotation:0});
    }
    if(settings.layout==='grid'){
      const random=randomGenerator(192807),order=[...placements],counts=objects.map(()=>1);
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
        cell.radius=objects[cell.sourceIndex].radius;
        counts[cell.sourceIndex]++;occupied.set(cell.row+':'+cell.col,cell.sourceIndex);
      }
    }

    const matrix=new THREE.Object3D();
    for(const [index,source] of objects.entries()){
      const cells=placements.filter(p=>p.sourceIndex===index);if(!cells.length)continue;
      const mesh=new THREE.InstancedMesh(source.mesh.geometry,source.mesh.material,cells.length);
      cells.forEach((p,i)=>{
        matrix.position.set(p.x,.003,p.z);matrix.scale.set(1,.001*source.heightFactor,1);
        matrix.updateMatrix(); mesh.setMatrixAt(i,matrix.matrix);
      });
      mesh.frustumCulled=false;group.add(mesh);batches.push(mesh);
    }
    extension=createGridExtension(grid,minCol,maxCol,minRow,maxRow,objects,placements);
    group.add(extension);extension.visible=true;
  }
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
  fitGrid(coverageCameras);
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


  function fit(w,h){
    const portrait=w/h<.8;
    const coords=fieldPositions(portrait);
    journey.layoutMode=portrait?'portrait':'landscape';
    objects.forEach((o,i)=>{
      const c=coords[i];o.heightFactor=c.height;o.mesh.position.set(c.x,.003,c.z);
      o.mesh.scale.y=.001*c.height;
    });
    fitPoses(w,h);
    const shot=journey.wide;
    placeCamera(w,h,shot.center,shot.distance,0,0,shot.yaw,90,0,shot.fov);
    scene.fog.near=shot.distance+45;scene.fog.far=shot.distance+110;
  }
  return {fit,group};
}
