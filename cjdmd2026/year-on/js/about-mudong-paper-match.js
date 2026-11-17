/* Extend only the frame's paper colours, with a separate quiet hanji grain layer. */
(()=>{
 const scene=document.querySelector('.yai-painting[data-painting="mudong"]'),video=scene?.querySelector('video'),art=scene?.querySelector('.yai-art');if(!video||!art)return;
 const canvas=document.createElement('canvas');canvas.className='yai-paper-continuation';canvas.setAttribute('aria-hidden','true');art.prepend(canvas);
 const ctx=canvas.getContext('2d',{alpha:false}),sample=document.createElement('canvas');sample.width=96;sample.height=54;
 const sc=sample.getContext('2d',{willReadFrequently:true});if(!ctx||!sc)return;
 ctx.fillStyle='#d9c39f';ctx.fillRect(0,0,canvas.width,canvas.height);
 let last=0,frame=0,active=false;
 function paperAt(bytes,row,right){
  const values=[];
  for(let dy=-2;dy<=2;dy++)for(let dx=0;dx<7;dx++){
   const y=Math.max(0,Math.min(53,row+dy)),x=right?95-dx:dx,i=(y*96+x)*4;
   const r=bytes[i],g=bytes[i+1],b=bytes[i+2];values.push({r,g,b,l:r*.2126+g*.7152+b*.0722});
  }
  values.sort((a,b)=>a.l-b.l);
  const middle=values.slice(Math.floor(values.length*.58),Math.floor(values.length*.86));
  return [middle.reduce((a,c)=>a+c.r,0)/middle.length,middle.reduce((a,c)=>a+c.g,0)/middle.length,middle.reduce((a,c)=>a+c.b,0)/middle.length];
 }
 function draw(now=0){
  if(video.readyState<2)return;
  try{
  const box=art.getBoundingClientRect(),h=Math.max(1,Math.round(320*box.height/Math.max(1,box.width)));
  if(canvas.width!==320||canvas.height!==h){canvas.width=320;canvas.height=h;ctx.fillStyle='#d9c39f';ctx.fillRect(0,0,320,h);}
  sc.drawImage(video,0,0,96,54);const pixels=sc.getImageData(0,0,96,54).data;
  const rect=video.getBoundingClientRect(),top=(rect.top-box.top)/box.height,ratio=rect.height/box.height;
  for(let y=0;y<h;y++){
   const row=Math.round(Math.max(0,Math.min(1,(y/h-top)/Math.max(.01,ratio)))*53),a=paperAt(pixels,row,false),b=paperAt(pixels,row,true);
   const gradient=ctx.createLinearGradient(0,0,320,0);
   gradient.addColorStop(0,`rgb(${a.join(',')})`);gradient.addColorStop(1,`rgb(${b.join(',')})`);
   ctx.fillStyle=gradient;ctx.fillRect(0,y,320,1);
  }
  last=now;canvas.dataset.ready='true';
  }catch(error){canvas.dataset.ready='false';last=now;}
 }
 function tick(now){frame=0;if(!active||document.hidden)return;if(now-last>180)draw(now);frame=requestAnimationFrame(tick)}
 function start(){active=scene.style.visibility==='visible';if(active&&!frame)frame=requestAnimationFrame(tick);if(!active&&frame){cancelAnimationFrame(frame);frame=0}}
 new MutationObserver(start).observe(scene,{attributes:true,attributeFilter:['style']});
 video.addEventListener('loadeddata',()=>draw());video.addEventListener('playing',start);addEventListener('resize',()=>draw());document.addEventListener('visibilitychange',start);start();
})();
