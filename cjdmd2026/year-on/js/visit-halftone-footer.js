/* Slow, continuous halftone contours, drawn only while the footer is visible. */
(()=>{
 const root=document.querySelector('.visit-halftone-footer'),canvas=root?.querySelector('canvas');if(!canvas)return;
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let width=0,height=0,frame=0,visible=false,last=0,time=0,pointer={x:.5,y:.5,weight:0},target={x:.5,y:.5,weight:0};
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 function size(){const b=root.getBoundingClientRect();width=Math.round(b.width);height=Math.round(b.height);const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(time)}
 function draw(t){
  ctx.fillStyle='#030609';ctx.fillRect(0,0,width,height);
  const step=width<650?5:6,cols=Math.ceil(width/step),rows=Math.ceil(height/step),buckets=[[],[],[],[],[],[]];
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
   const px=x*step+step*.5,py=y*step+step*.5,nx=px/width,ny=py/height;
   const curve=.47+.28*Math.sin(nx*6.2-t*.43)+.13*Math.sin(nx*12.1+t*.29);
   const band=Math.exp(-Math.pow((ny-curve)/(.22+.06*Math.sin(nx*8+t*.2)),2));
   const drift=.44+.32*Math.sin(nx*7.2+ny*3.7+t*.35);
   const pool=Math.exp(-((nx-(.76+.12*Math.sin(t*.13)))**2/.045+(ny-(.18+.12*Math.sin(t*.2)))**2/.16));
   const distance=Math.hypot((nx-pointer.x)*1.5,ny-pointer.y);
   const influence=pointer.weight*Math.exp(-distance*distance*18)*.16;
   const density=clamp((band*.9+pool*.52-drift*.29+influence-.12)*1.5);
   const grain=((x*127+y*311)%73)/73;
   const r=.2+Math.pow(density,.7)*(step*.46)+grain*.1;
   if(density<.025)continue;
   buckets[Math.min(5,Math.floor(density*6))].push([px,py,r]);
  }
  const colors=['#183247','#345771','#5b88ab','#87b4d7','#b3d6f1','#e0f1ff'];
  buckets.forEach((dots,i)=>{ctx.fillStyle=colors[i];ctx.beginPath();for(const [x,y,r] of dots){ctx.moveTo(x+r,y);ctx.arc(x,y,r,0,Math.PI*2)}ctx.fill()});
 }
 function tick(now){frame=0;if(!visible||document.hidden||reduced.matches)return;if(now-last>=33){time=now*.0006;pointer.x+=(target.x-pointer.x)*.055;pointer.y+=(target.y-pointer.y)*.055;pointer.weight+=(target.weight-pointer.weight)*.045;draw(time);last=now}frame=requestAnimationFrame(tick)}
 function start(){if(visible&&!document.hidden&&!frame&&!reduced.matches)frame=requestAnimationFrame(tick);else if(reduced.matches)draw(2.1)}
 new ResizeObserver(size).observe(root);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0}},{rootMargin:'120px'}).observe(root);
 root.addEventListener('pointermove',e=>{const b=root.getBoundingClientRect();target={x:clamp((e.clientX-b.left)/b.width),y:clamp((e.clientY-b.top)/b.height),weight:1}});
 root.addEventListener('pointerleave',()=>target.weight=0);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else start()});
 reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;start()});
 root.querySelector('.visit-footer-top').addEventListener('click',e=>{e.preventDefault();location.hash='visitOpening';scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'})});
 size();
})();
