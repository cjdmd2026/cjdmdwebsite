// Presentation treatment for the transparent ground only. Solar direction and
// shadows received by the architecture remain untouched.
export function softenGroundShadow(material) {
  const uniforms = {
    groundShadowCenter: { value: [0, 0] },
    groundShadowHalfSize: { value: [0, 0] },
    groundShadowFade: { value: [0.6, 2.4] }
  };

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = `varying vec2 vGroundShadowXZ;\n${shader.vertexShader}`
      .replace('#include <project_vertex>', `#include <project_vertex>
        vGroundShadowXZ = (modelMatrix * vec4(transformed, 1.0)).xz;`);
    shader.fragmentShader = `
      varying vec2 vGroundShadowXZ;
      uniform vec2 groundShadowCenter;
      uniform vec2 groundShadowHalfSize;
      uniform vec2 groundShadowFade;
      ${shader.fragmentShader}`
      .replace('#include <tonemapping_fragment>', `
        vec2 outsideFootprint = max(abs(vGroundShadowXZ - groundShadowCenter) - groundShadowHalfSize, vec2(0.0));
        float groundShadowAlpha = 1.0 - smoothstep(groundShadowFade.x, groundShadowFade.y, length(outsideFootprint));
        gl_FragColor.a *= groundShadowAlpha;
        #include <tonemapping_fragment>`);
  };
  material.customProgramCacheKey = () => 'soft-ground-shadow-v1';

  return {
    updateBounds(bounds) {
      const width = bounds.max.x - bounds.min.x;
      const depth = bounds.max.z - bounds.min.z;
      const span = Math.max(width, depth, 0.001);
      uniforms.groundShadowCenter.value = [
        (bounds.min.x + bounds.max.x) / 2,
        (bounds.min.z + bounds.max.z) / 2
      ];
      uniforms.groundShadowHalfSize.value = [width / 2, depth / 2];
      // Keep nearby shadows, then fade over a broad band without a hard edge.
      uniforms.groundShadowFade.value = [span * 0.12, span * 0.6];
    }
  };
}
