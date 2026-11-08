import * as THREE from 'three';

// Defocus the receding pattern on its own, then draw the SVG foreground sharply.
// Two separable passes keep the cost independent of the number of pattern icons.
export function createGridDefocus(renderer,scene,foreground){
  let grid=null;
  const softened=new THREE.WebGLRenderTarget(1,1,{depthBuffer:false});
  const uniforms={image:{value:null},original:{value:null},blend:{value:1},step:{value:new THREE.Vector2()}};
  const material=new THREE.ShaderMaterial({uniforms,depthTest:false,depthWrite:false,toneMapped:false,
    vertexShader:`varying vec2 uvAt;
      void main(){uvAt=uv;gl_Position=vec4(position.xy,0.,1.);}`,
    fragmentShader:`uniform sampler2D image,original;uniform float blend;uniform vec2 step;varying vec2 uvAt;
      void main(){
        vec4 color=texture2D(image,uvAt)*.2270270270;
        color+=(texture2D(image,uvAt+step)+texture2D(image,uvAt-step))*.1945945946;
        color+=(texture2D(image,uvAt+2.*step)+texture2D(image,uvAt-2.*step))*.1216216216;
        color+=(texture2D(image,uvAt+3.*step)+texture2D(image,uvAt-3.*step))*.0540540541;
        color+=(texture2D(image,uvAt+4.*step)+texture2D(image,uvAt-4.*step))*.0162162162;
        gl_FragColor=mix(texture2D(original,uvAt),color,blend);
      }`});
  const screen=new THREE.Scene(),lens=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  screen.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
  let width=1,height=1;
  return {
    ready:renderer.compileAsync(screen,lens),
    fit(w,h){
      width=w;height=h;
      // Capture the same antialiased, display-encoded frame used before blur.
      // Moving transparent icons to a linear render target would change their
      // contrast abruptly even with an almost-zero blur radius.
      const size=renderer.getDrawingBufferSize(new THREE.Vector2());
      if(!grid||grid.image.width!==size.x||grid.image.height!==size.y){
        grid?.dispose();grid=new THREE.FramebufferTexture(size.x,size.y);
        grid.minFilter=grid.magFilter=THREE.LinearFilter;
        renderer.initTexture(grid);
      }
      // Bound the extra blur pass's fill rate on high-density displays.
      const ratio=Math.min(renderer.getPixelRatio(),Math.sqrt(1800000/(w*h)));
      const x=Math.max(1,Math.round(w*ratio)),y=Math.max(1,Math.round(h*ratio));
      softened.setSize(x,y);renderer.initRenderTarget(softened);
    },
    render(camera,blur){
      if(blur<=.01){renderer.render(scene,camera);return;}
      const target=renderer.getRenderTarget(),autoClear=renderer.autoClear,visible=foreground.visible;
      try{
        foreground.visible=false;renderer.autoClear=true;
        renderer.render(scene,camera);renderer.copyFramebufferToTexture(grid);
        uniforms.original.value=grid;uniforms.blend.value=1;
        uniforms.image.value=grid;uniforms.step.value.set(blur*.5/width,0);
        renderer.setRenderTarget(softened);renderer.render(screen,lens);
        uniforms.image.value=softened.texture;uniforms.step.value.set(0,blur*.5/height);
        // The smaller blur buffer must not replace the sharp frame in one step.
        // Blend from the full-resolution original, preserving its color and ink.
        uniforms.blend.value=THREE.MathUtils.smootherstep(blur,0,.9);
        renderer.setRenderTarget(target);renderer.render(screen,lens);
        foreground.visible=visible;renderer.autoClear=false;renderer.clearDepth();
        if(visible)renderer.render(foreground,camera);
      }finally{
        foreground.visible=visible;renderer.autoClear=autoClear;renderer.setRenderTarget(target);
      }
    }
  };
}
