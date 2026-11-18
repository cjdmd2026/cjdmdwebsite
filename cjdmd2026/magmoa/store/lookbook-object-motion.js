/* Localized photo deformation keeps the kitchen objects inside the original scene. */
window.createKitchenMotion = function(scene) {
 const photo=scene.querySelector('.fridge-photo');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const canvas=document.createElement('canvas');canvas.className='kitchen-motion-canvas';canvas.setAttribute('aria-hidden','true');
 const gl=canvas.getContext('webgl',{alpha:false,antialias:false});
 function fallback(){
  ['plant','lemon','tools'].forEach(kind=>{const layer=photo.cloneNode();layer.className='kitchen-photo-piece kitchen-piece-'+kind;layer.alt='';layer.setAttribute('aria-hidden','true');photo.after(layer);});
  scene.classList.add('uses-photo-pieces');
  let timer;return {trigger(kind,on=true){if(kind==='plant')scene.classList.toggle('piece-plant-active',on);else {clearTimeout(timer);scene.classList.remove('piece-lemon-active','piece-tools-active');void scene.offsetWidth;scene.classList.add('piece-'+kind+'-active');timer=setTimeout(()=>scene.classList.remove('piece-lemon-active','piece-tools-active'),1500);}},stop(){clearTimeout(timer);scene.classList.remove('piece-plant-active','piece-lemon-active','piece-tools-active');}};
 }
 if(!gl) return fallback();
 const vertex='attribute vec2 p; varying vec2 uv; void main(){uv=vec2((p.x+1.0)*.5,(1.0-p.y)*.5);gl_Position=vec4(p,0.,1.);}';
 const fragment=`precision mediump float;
 varying vec2 uv;uniform sampler2D photo;uniform float time;uniform float plant;uniform float lemon;uniform float tools;
 float spot(vec2 p,vec2 c,vec2 radius){vec2 d=(p-c)/radius;return exp(-dot(d,d)*2.0);}
 void main(){vec2 q=uv;
 float leaves=spot(uv,vec2(.055,.385),vec2(.105,.23));
 q.x+=leaves*plant*(sin(time*2.8+uv.y*5.)*.009+sin(time*4.1)*.002);
 q.y+=leaves*plant*sin(time*2.8)*.002;
 float fruit=spot(uv,vec2(.105,.662),vec2(.075,.052));
 q.y+=fruit*lemon*abs(sin(time*13.))*.017;
 q.x+=fruit*lemon*sin(time*10.+uv.x*80.)*.004;
 float wood=spot(uv,vec2(.905,.53),vec2(.065,.115));
 q.x+=wood*tools*sin(time*16.+uv.y*5.)*.012;
 gl_FragColor=texture2D(photo,clamp(q,vec2(.001),vec2(.999)));}`;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Kitchen shader unavailable');return s;}
 let program;
 try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Kitchen shader unavailable');}catch{return {trigger(){},stop(){}};}
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const p=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);
 const uniforms={};['time','plant','lemon','tools'].forEach(k=>uniforms[k]=gl.getUniformLocation(program,k));
 let fallbackController;
 let ready=false,frame=0,plantOn=false,lemonAt=-100,toolsAt=-100,active=false;
 function draw(now){frame=0;if(!ready)return;const t=now/1000;
 const lemon=Math.max(0,1-(t-lemonAt)/1.5),tools=Math.max(0,1-(t-toolsAt)/1.4);
 gl.uniform1f(uniforms.time,t);gl.uniform1f(uniforms.plant,plantOn&&!reduced.matches?1:0);gl.uniform1f(uniforms.lemon,reduced.matches?0:lemon);gl.uniform1f(uniforms.tools,reduced.matches?0:tools);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
 if(active&&!document.hidden&&!reduced.matches&&(plantOn||lemon>0||tools>0))frame=requestAnimationFrame(draw);
 }
 function wake(){if(!frame)frame=requestAnimationFrame(draw);}
 function setup(){if(ready||!photo.naturalWidth)return;canvas.width=Math.min(1600,photo.naturalWidth);canvas.height=Math.round(canvas.width*photo.naturalHeight/photo.naturalWidth);gl.viewport(0,0,canvas.width,canvas.height);const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,photo);}catch{fallbackController=fallback();return;}
 photo.after(canvas);ready=true;scene.classList.add('has-object-motion');wake();}
 photo.addEventListener('load',setup,{once:true});setup();
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(frame);frame=0;ready=false;scene.classList.remove('has-object-motion');canvas.remove();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&active)wake();});
 return {trigger(kind,on=true){if(fallbackController){fallbackController.trigger(kind,on);return;}active=true;if(kind==='plant')plantOn=on;if(kind==='lemon')lemonAt=performance.now()/1000;if(kind==='tools')toolsAt=performance.now()/1000;wake();},stop(){fallbackController?.stop();active=false;plantOn=false;lemonAt=toolsAt=-100;cancelAnimationFrame(frame);frame=0;wake();}};
};
