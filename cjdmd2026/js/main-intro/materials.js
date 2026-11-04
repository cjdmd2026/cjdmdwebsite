// All solids share the final transition from lit clay to flat SVG color.
export const flatFinish={value:0};
export const gridNear={value:1};
export const gridFalloff=1.15;
export const gridRecession={value:0},gridInk={value:1};

// Keep the floor fixed in world space. Only its ink fades with true eye
// distance; the camera projection alone determines tile position and size.
export function applyGridDistance(material){
  const compile=material.onBeforeCompile,key=material.customProgramCacheKey();
  material.onBeforeCompile=function(shader,renderer){
    compile.call(this,shader,renderer);
    Object.assign(shader.uniforms,{gridNear,gridFlat:flatFinish,gridRecession,gridInk});
    shader.vertexShader='uniform float gridRecession; varying vec3 vGridView;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>',
      '#include <project_vertex>\nmvPosition.z-=gridRecession; gl_Position=projectionMatrix*mvPosition; vGridView=mvPosition.xyz;');
    shader.fragmentShader='varying vec3 vGridView; uniform float gridNear,gridFlat,gridInk;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`
      float eye=length(vGridView);
      float distanceInk=1./(1.+${gridFalloff}*max(0.,eye/gridNear-1.));
      diffuseColor.a*=mix(1.,distanceInk*gridInk,gridFlat);
      #include <opaque_fragment>`);
  };
  material.customProgramCacheKey=()=>key+'-grid-distance';
  return material;
}

export function applyFlatColorFinish(material){
  const compile=material.onBeforeCompile,key=material.customProgramCacheKey();
  material.onBeforeCompile=function(shader,renderer){
    compile.call(this,shader,renderer);
    shader.uniforms.flatFinish=flatFinish;
    shader.fragmentShader='uniform float flatFinish;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',
      'outgoingLight=mix(outgoingLight,diffuseColor.rgb,flatFinish);\n#include <opaque_fragment>');
  };
  material.customProgramCacheKey=()=>key+'-flat-color-finish';
  return applyGridDistance(material);
}

