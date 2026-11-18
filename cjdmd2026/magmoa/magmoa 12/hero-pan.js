(() => {
  const hero = document.querySelector('.home-page .hero');
  if (!hero) return;
  const background = hero.querySelector('.hero-art');
  const person = hero.querySelector('.hero-person');
  // Original canvas: 1586 × 992. Extraction enlarged the person;
  // restore its original proportions before applying viewport cover cropping.
  const fitPerson = () => {
    const w=hero.clientWidth, h=hero.clientHeight;
    const cover=Math.max(w/1586,h/992);
    const cw=1586*cover,ch=992*cover, ratio=.83;
    const alignment=matchMedia('(max-width:650px)').matches?.65:.5;
    person.style.setProperty('--person-width', `${cw*ratio}px`);
    person.style.setProperty('--person-height', `${ch*ratio}px`);
    person.style.setProperty('--person-left', `${(w-cw)*alignment+cw*(1-ratio)*.5}px`);
    person.style.setProperty('--person-top', `${(h-ch)*.5+ch*(1-ratio)}px`);
  };
  fitPerson(); new ResizeObserver(fitPerson).observe(hero);
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-panorama'; canvas.setAttribute('aria-hidden', 'true');
  hero.insertBefore(canvas, person);
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
  if (!gl) return;
  const shader = (type, source) => { const s=gl.createShader(type); gl.shaderSource(s,source); gl.compileShader(s); if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(s)); return s; };
  const program=gl.createProgram();
  try {
    gl.attachShader(program,shader(gl.VERTEX_SHADER,'attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}'));
    gl.attachShader(program,shader(gl.FRAGMENT_SHADER,`precision mediump float;
      varying vec2 uv; uniform sampler2D photo; uniform float yaw; uniform float aspect; uniform float imageAspect;
      void main(){
        float panoramaWidth=2.44;
        float panoramaHeight=panoramaWidth/imageAspect;
        float fov=min(0.68,tan(panoramaHeight*.47)*aspect);
        vec3 ray=normalize(vec3((uv.x*2.-1.)*fov, (uv.y*2.-1.)*fov/aspect, 1.));
        float longitude=atan(ray.x,ray.z)+yaw;
        float latitude=atan(ray.y,length(ray.xz));
        vec2 sampleUV=vec2(.5+longitude/panoramaWidth,.5-latitude/panoramaHeight);
        gl_FragColor=texture2D(photo,clamp(sampleUV,vec2(.001),vec2(.999)));
      }`));
    gl.linkProgram(program); if(!gl.getProgramParameter(program,gl.LINK_STATUS)) return;
  } catch(e) { canvas.remove(); return; }
  gl.useProgram(program);
  const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const p=gl.getAttribLocation(program,'p'); gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  const yawUniform=gl.getUniformLocation(program,'yaw'), aspectUniform=gl.getUniformLocation(program,'aspect');
  const enabled=matchMedia('(min-width:781px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  let current=0,target=0,frame=0,last=0,ready=false,fallback=false;
  const draw=()=>{ if(!ready)return; if(fallback){background.style.transform=`perspective(1400px) translateX(${-current*hero.clientWidth*.22}px) scale(1.18) rotateY(${current*12}deg)`;return;} gl.uniform1f(yawUniform,current);gl.uniform1f(aspectUniform,canvas.width/canvas.height);gl.drawArrays(gl.TRIANGLES,0,6); };
  const resize=()=>{const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(hero.clientWidth*dpr);canvas.height=Math.round(hero.clientHeight*dpr);gl.viewport(0,0,canvas.width,canvas.height);draw();};
  const tick=(time)=>{const dt=last?Math.min(time-last,50):16;last=time;current+=(target-current)*(1-Math.exp(-dt/180));if(Math.abs(target-current)<.0001)current=target;draw();if(current!==target)frame=requestAnimationFrame(tick);else{frame=0;last=0;}};
  const animate=()=>{if(!frame&&ready)frame=requestAnimationFrame(tick);};
  const upload=()=>{if(!background.naturalWidth)return;gl.bindTexture(gl.TEXTURE_2D,texture);try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,background);}catch(e){fallback=true;canvas.remove();}gl.uniform1f(gl.getUniformLocation(program,'imageAspect'),background.naturalWidth/background.naturalHeight);ready=true;resize();};
  background.addEventListener('load',upload);if(background.complete)upload();
  hero.addEventListener('pointermove',e=>{if(!enabled.matches||e.pointerType==='touch')return;const r=hero.getBoundingClientRect();target=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1))*.35;animate();},{passive:true});
  const reset=()=>{target=0;animate();};hero.addEventListener('pointerleave',reset);window.addEventListener('blur',reset);
  enabled.addEventListener('change',reset);new ResizeObserver(resize).observe(hero);
})();
