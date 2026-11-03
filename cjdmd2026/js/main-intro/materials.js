// All solids share the final transition from lit clay to flat SVG color.
export const flatFinish={value:0};

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
  return material;
}
