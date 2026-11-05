import * as THREE from 'three';

const FLOOR_SIZE=200,SPACING_PX=20,DIAMETER_PX=2;

export function createDottedFloor(renderer){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,128,128);
  ctx.fillStyle='#dddddd';ctx.beginPath();
  ctx.arc(64,64,128*DIAMETER_PX/SPACING_PX/2,0,Math.PI*2);ctx.fill();
  const map=new THREE.CanvasTexture(canvas);
  map.colorSpace=THREE.SRGBColorSpace;
  map.wrapS=map.wrapT=THREE.RepeatWrapping;
  map.anisotropy=renderer.capabilities.getMaxAnisotropy();
  const opacity={value:1};
  // The floor is unlit so the dots keep their requested #ddd color under the
  // bright studio lighting. The existing contact shadows sit above this surface.
  // This is a backdrop. Projected icons can recede in screen space while
  // their flat meshes still share almost the same depth as the white plane.
  const material=new THREE.MeshBasicMaterial({name:'White dotted floor',map,color:0xffffff,toneMapped:false,depthWrite:false,transparent:true});
  material.onBeforeCompile=shader=>{
    shader.uniforms.dotOpacity=opacity;
    shader.fragmentShader='uniform float dotOpacity;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',
      `#include <map_fragment>
       diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,dotOpacity);`);
  };
  material.customProgramCacheKey=()=> 'dotted-floor-fade';
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(FLOOR_SIZE,FLOOR_SIZE),material);
  mesh.name='White floor';mesh.rotation.x=-Math.PI/2;mesh.renderOrder=-1;
  let worldSpacing=0;
  return {
    mesh,
    fit(openingPose,viewportHeight,fov=34){
      // Calibrate to 20 CSS px in the opening shot, then anchor the pattern to
      // the floor so its perspective follows the camera without sliding.
      const viewHeight=2*(openingPose.distance+openingPose.center.y)*Math.tan(THREE.MathUtils.degToRad(fov)/2);
      worldSpacing=viewHeight/viewportHeight*SPACING_PX;
      map.repeat.setScalar(FLOOR_SIZE/worldSpacing);
    },
    update(pitch,finalApproach){
      // Keep the opening dotted; clear the floor on the return to the 2D ending.
      opacity.value=finalApproach?1-THREE.MathUtils.smoothstep(pitch,70,90):1;
    },
    inspect(){return {color:'#dddddd',spacingPx:SPACING_PX,diameterPx:DIAMETER_PX,worldSpacing,opacity:opacity.value};}
  };
}
