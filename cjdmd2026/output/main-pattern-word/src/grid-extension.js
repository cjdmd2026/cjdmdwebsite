import * as THREE from 'three';
import {applyGridDistance} from './materials.js';

// Repeat the actual fitted cells outside the animated field. The hole in the
// middle leaves every original mesh visible and avoids drawing the ink twice.
export function createGridExtension(grid,minCol,maxCol,minRow,maxRow,sources,copies){
  const {stepX,stepZ,originZ}=grid;
  const cols=maxCol-minCol+1,rows=maxRow-minRow+1;
  const left=(minCol-.5)*stepX,back=originZ-(maxRow+.5)*stepZ;
  const width=cols*stepX,length=rows*stepZ;
  const pixels=Math.min(96,Math.floor(2048/Math.max(cols,rows)))||1;
  const canvas=document.createElement('canvas');
  canvas.width=cols*pixels;canvas.height=rows*pixels;
  const ctx=canvas.getContext('2d');
  const paths=sources.map(source=>{
    const path=new Path2D();
    for(const {points} of source.caster.contours){
      if(points.length<3)continue;
      path.moveTo(...points[0]);
      for(let i=1;i<points.length;i++)path.lineTo(...points[i]);
      path.closePath();
    }
    return path;
  });
  const sx=pixels/stepX,sz=pixels/stepZ;
  function stamp(x,z,index){
    ctx.setTransform(sx,0,0,sz,(x-left)*sx,(z-back)*sz);
    ctx.fillStyle=sources[index].color;ctx.fill(paths[index]);
  }
  sources.forEach(({mesh},index)=>stamp(mesh.position.x,mesh.position.z,index));
  copies.forEach(({x,z,sourceIndex})=>stamp(x,z,sourceIndex));
  const map=new THREE.CanvasTexture(canvas);
  map.flipY=false;map.colorSpace=THREE.SRGBColorSpace;
  map.wrapS=map.wrapT=THREE.RepeatWrapping;
  const geometry=new THREE.BufferGeometry(),position=[],uv=[],indices=[];
  function strip(x0,z0,x1,z1){
    const i=position.length/3;
    for(const [u,v] of [[x0,z0],[x0,z1],[x1,z1],[x1,z0]]){
      position.push(left+u*width,.003,back+v*length);uv.push(u,v);
    }
    indices.push(i,i+1,i+2,i,i+2,i+3);
  }
  // A tile spans at least the initial viewport. At most 19 are visible
  // across it after the pullback, including on wider screens.
  strip(-20,-20,21,0);strip(-20,1,21,21);
  strip(-20,0,0,1);strip(1,0,21,1);
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(position,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  geometry.setIndex(indices);
  const material=applyGridDistance(new THREE.MeshBasicMaterial({
    map,transparent:true,depthWrite:false,toneMapped:false,fog:false
  }));
  const mesh=new THREE.Mesh(geometry,material);mesh.name='Continuous flat icon grid';mesh.visible=false;
  return mesh;
}
