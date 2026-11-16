(() => {
  const screen = document.querySelector('#screenWindow');
  const stage = document.querySelector('#channelStage');
  const video = document.querySelector('#channelVideo');
  if (!screen || !stage || !video) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'crt-tube-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  video.insertAdjacentElement('afterend', canvas);
  const glass = Object.assign(document.createElement('i'), {className:'crt-tube-glass'});
  const burst = Object.assign(document.createElement('i'), {className:'crt-channel-burst'});
  glass.setAttribute('aria-hidden', 'true');
  burst.setAttribute('aria-hidden', 'true');
  screen.append(glass, burst);

  const gl = canvas.getContext('webgl', {alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'high-performance'});
  if (!gl) { canvas.remove(); glass.remove(); burst.remove(); return; }

  const vertexSource = `attribute vec2 aPosition;varying vec2 vUv;void main(){vUv=aPosition*.5+.5;gl_Position=vec4(aPosition,0.,1.);}`;
  const fragmentSource = `
    precision mediump float;
    uniform sampler2D uVideo;uniform vec2 uResolution;uniform vec2 uVideoSize;uniform float uTime;uniform float uSwitching;varying vec2 vUv;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
    vec2 containUv(vec2 uv){float sa=uResolution.x/max(uResolution.y,1.);float va=uVideoSize.x/max(uVideoSize.y,1.);if(sa<va){uv.x=(uv.x-.5)*(sa/va)+.5;}else{uv.y=(uv.y-.5)*(va/sa)+.5;}return (uv-.5)*.94+.5;}
    vec3 picture(vec2 uv,vec2 radial){vec2 f=containUv(uv);if(f.x<0.||f.x>1.||f.y<0.||f.y>1.)return vec3(.002,.004,.006);vec2 fringe=radial*.00125;return vec3(texture2D(uVideo,f+fringe).r,texture2D(uVideo,f).g,texture2D(uVideo,f-fringe).b);}
    void main(){
      vec2 p=vUv*2.-1.;p.x*=uResolution.x/max(uResolution.y,1.);float r2=dot(p,p);
      vec2 curved=p*(1.+.042*r2+.007*r2*r2);curved.x/=uResolution.x/max(uResolution.y,1.);vec2 uv=curved*.46+.5;
      float inside=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);vec3 color=picture(uv,p);
      float line=.965+.035*sin((gl_FragCoord.y+uTime*3.2)*3.14159265);
      float grain=(hash(floor(gl_FragCoord.xy*.72)+floor(uTime*22.))-.5)*.026;
      float flicker=1.+sin(uTime*51.)*.0045+sin(uTime*17.)*.0025;
      color=mix(color,vec3(dot(color,vec3(.299,.587,.114))),.035);color=color*line*flicker+grain;
      color*=1.-smoothstep(.48,1.42,r2)*.42;
      color+=(hash(vec2(floor(gl_FragCoord.y*.35),floor(uTime*45.)))-.5)*uSwitching*.22;
      gl_FragColor=vec4(max(color,0.)*inside,1.);
    }`;

  function compile(type, source) { const item=gl.createShader(type); gl.shaderSource(item,source); gl.compileShader(item); if(!gl.getShaderParameter(item,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(item)); return item; }
  let program;
  try { program=gl.createProgram(); gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexSource)); gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragmentSource)); gl.linkProgram(program); if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)); }
  catch(error){ console.warn('CRT shader unavailable:',error); canvas.remove(); glass.remove(); burst.remove(); return; }

  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  const uniforms={resolution:gl.getUniformLocation(program,'uResolution'),videoSize:gl.getUniformLocation(program,'uVideoSize'),time:gl.getUniformLocation(program,'uTime'),switching:gl.getUniformLocation(program,'uSwitching')};
  let gpuUnavailable=false;
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();gpuUnavailable=true;screen.classList.remove('crt-webgl-ready');canvas.style.display='none';});
  canvas.addEventListener('webglcontextrestored',()=>{screen.classList.remove('crt-webgl-ready');canvas.remove();});
  const dpr=Math.min(devicePixelRatio||1,1.5);
  function resize(){const rect=stage.getBoundingClientRect(),w=Math.max(2,Math.round(rect.width*dpr)),h=Math.max(2,Math.round(rect.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}}
  let last=0;
  function render(now){requestAnimationFrame(render);if(document.hidden||now-last<1000/30)return;last=now;resize();if(gpuUnavailable||gl.isContextLost()){screen.classList.remove('crt-webgl-ready');return;}if(video.readyState<2||!video.videoWidth)return;try{gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,video);}catch(_){screen.classList.remove('crt-webgl-ready');return;}gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);gl.uniform2f(uniforms.videoSize,video.videoWidth,video.videoHeight);gl.uniform1f(uniforms.time,now*.001);gl.uniform1f(uniforms.switching,screen.classList.contains('is-switching')?1:0);gl.drawArrays(gl.TRIANGLES,0,6);screen.classList.add('crt-webgl-ready');}
  new ResizeObserver(resize).observe(stage);requestAnimationFrame(render);
})();
