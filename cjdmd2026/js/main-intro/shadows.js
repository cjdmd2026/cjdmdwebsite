import * as THREE from 'three';

// The key light and its projection must agree as the camera travels.
export const KEY_LIGHT_POSITION = [-10, 30, 16];
export const CONTACT_SHADOW_LAYER = 1;
const ATLAS_COLUMNS = 4;
const FRAME_COUNT = 16;
const TILE_SIZE = 256;

// Each step draws one light sample. The caller can yield the main thread
// between samples; the texture is returned only after all frames are drawn.
export function* renderShadowAtlas(caster, span, depth, rotation = 0) {
  const atlas = document.createElement('canvas');
  atlas.width = atlas.height = ATLAS_COLUMNS * TILE_SIZE;
  // These offscreen surfaces are baked once and read back for texture upload.
  // Prefer CPU backing so their raster work doesn't queue ahead of loader frames.
  const bakeContext = {willReadFrequently:true};
  const output = atlas.getContext('2d', bakeContext);
  const mask = document.createElement('canvas');
  mask.width = mask.height = TILE_SIZE;
  const ctx = mask.getContext('2d', bakeContext);
  const tile = document.createElement('canvas');
  tile.width = tile.height = TILE_SIZE;
  const soft = tile.getContext('2d', bakeContext);
  const scale = TILE_SIZE / span;
  const cos = Math.cos(rotation), sin = Math.sin(rotation);
  const project = (x, z, y, lightX, lightZ) => [
    (x - y * (cos * lightX - sin * lightZ) / KEY_LIGHT_POSITION[1]) * scale + TILE_SIZE / 2,
    (z - y * (sin * lightX + cos * lightZ) / KEY_LIGHT_POSITION[1]) * scale + TILE_SIZE / 2
  ];
  function polygon(path, points, positive = true) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length];
      area += a[0] * b[1] - b[0] * a[1];
    }
    if ((area > 0) !== positive) points.reverse();
    path.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) path.lineTo(...points[i]);
    path.closePath();
  }
  function silhouette(height, lightX, lightZ) {
    const path = new Path2D();
    for (const contour of caster.contours) {
      const bottom = contour.points.map(([x, z]) => project(x, z, .003, lightX, lightZ));
      const top = contour.points.map(([x, z]) => project(x, z, height + .003, lightX, lightZ));
      polygon(path, [...bottom], !contour.hole);
      polygon(path, [...top], !contour.hole);
      for (let i = 0; i < bottom.length; i++) {
        const j = (i + 1) % bottom.length;
        polygon(path, [bottom[i], bottom[j], top[j], top[i]]);
      }
    }
    return path;
  }
  const footprint = silhouette(0, ...[KEY_LIGHT_POSITION[0], KEY_LIGHT_POSITION[2]]);
  // Average a broad light source: the shared contact edge stays attached while
  // the penumbra grows with height. A single blurred full-height decal cannot do this.
  const samples = Array.from({length: 12}, (_, index) => {
    const radius = 11 * Math.sqrt((index + .5) / 12), angle = index * 2.39996323;
    return [KEY_LIGHT_POSITION[0] + Math.cos(angle) * radius, KEY_LIGHT_POSITION[2] + Math.sin(angle) * radius];
  });
  for (let frame = 0; frame < FRAME_COUNT; frame++) {
    const height = caster.height * depth * frame / (FRAME_COUNT - 1);
    // Every light sample at this height uses the same blur. Accumulate their
    // coverage first and filter the mask once per height frame.
    ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#fff';
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = .72 / samples.length;
    for (const [lightX, lightZ] of samples) {
      ctx.fill(silhouette(height, lightX, lightZ));
      yield 1 / (FRAME_COUNT * samples.length);
    }
    soft.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
    soft.globalAlpha = 1;
    soft.filter = `blur(${(.018 + height * .018) * scale}px)`;
    soft.drawImage(mask, 0, 0);
    ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fill(footprint);
    soft.globalAlpha = .35;
    soft.filter = `blur(${.035 * scale}px)`;
    soft.drawImage(mask, 0, 0);
    // Canvas rows run down, whereas the texture's UV rows run up.
    output.drawImage(tile, (frame % ATLAS_COLUMNS) * TILE_SIZE,
      (ATLAS_COLUMNS - 1 - Math.floor(frame / ATLAS_COLUMNS)) * TILE_SIZE);
  }
  const texture = new THREE.CanvasTexture(atlas);
  texture.colorSpace = THREE.SRGBColorSpace;
  // Avoid mip levels mixing neighbouring height frames in distant views.
  texture.generateMipmaps = false;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.userData = {style: 'height-aware-area-light',frames: FRAME_COUNT,light: KEY_LIGHT_POSITION};
  return texture;
}

export function createShadowMaterial(map = null, instanced = false) {
  const material = new THREE.MeshBasicMaterial({
    map,transparent: true,opacity: 1,depthWrite: false,color: 0xc9ced6,toneMapped: false,
    polygonOffset: true,polygonOffsetFactor: -1,polygonOffsetUnits: -4
  });
  const height = {value: 0};
  material.userData.shadowHeight = height;
  material.onBeforeCompile = shader => {
    shader.uniforms.shadowHeight = height;
    shader.vertexShader = `varying float vShadowHeight;\n${instanced ? 'attribute float instanceReveal;' : 'uniform float shadowHeight;'}\n` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
      `#include <begin_vertex>\nvShadowHeight = ${instanced ? 'instanceReveal' : 'shadowHeight'};`);
    shader.fragmentShader = `varying float vShadowHeight;
      vec2 shadowFrameUv(vec2 uv, float frame) {
        vec2 cell = vec2(mod(frame, 4.0), floor(frame / 4.0));
        return (cell + clamp(uv, vec2(.5 / 256.0), vec2(1.0 - .5 / 256.0))) / 4.0;
      }\n` + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
      float frame = clamp(vShadowHeight, 0.0, 1.0) * 15.0;
      float lower = floor(frame);
      float alpha = mix(texture2D(map, shadowFrameUv(vMapUv, lower)).a,
        texture2D(map, shadowFrameUv(vMapUv, min(lower + 1.0, 15.0))).a, fract(frame));
      diffuseColor.a *= alpha * smoothstep(0.0, .18, vShadowHeight);
    `);
  };
  material.customProgramCacheKey = () => 'height-aware-ground-shadow-' + instanced;
  return material;
}

