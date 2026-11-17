(()=>{const radio=document.querySelector('#radioMedia'),tuner=document.querySelector('#radioTuner');if(!radio||!tuner)return;
 const image=new Image(),canvas=document.createElement('canvas');canvas.className='radio-mechanics';canvas.setAttribute('aria-hidden','true');radio.append(canvas);const ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion:reduce)');let ready=false,frame=0,x=800,target=800,light=0;
 const windows=[
   {left:351, color:'#65ff2a', core:'#adff68'},
   {left:505, color:'#ff2018', core:'#ff382b'}
 ];
 function running(){return radio.classList.contains('on')&&!document.hidden&&!reduced.matches&&([...document.querySelectorAll('audio[id^="radioAudio"]')].some(a=>!a.paused&&!a.ended&&a.readyState>=3))}
 function draw(now){frame=0;if(!ready)return;const w=radio.clientWidth,h=radio.clientHeight,dpr=Math.min(2,devicePixelRatio||1);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);const s=Math.min(w/image.naturalWidth,h/image.naturalHeight),ox=(w-image.naturalWidth*s)/2,oy=(h-image.naturalHeight*s)/2;ctx.save();ctx.translate(ox,oy);ctx.scale(s,s);
 const lightTarget=Number(radio.classList.contains('on'));
 light=reduced.matches?lightTarget:light+(lightTarget-light)*.24;
 if(Math.abs(lightTarget-light)<.01)light=lightTarget;
 ctx.globalAlpha=light;
 windows.forEach(({left,color,core})=>{
   const width=127,y=317+58*.45;
   const glow=ctx.createLinearGradient(left+width*.18,0,left+width*.82,0);
   glow.addColorStop(0,color+'00');
   glow.addColorStop(.25,color);
   glow.addColorStop(.5,core);
   glow.addColorStop(.75,color);
   glow.addColorStop(1,color+'00');
   ctx.save();
   ctx.strokeStyle=glow;
   ctx.shadowColor=color;
   ctx.shadowBlur=7;
   ctx.lineWidth=6;
   ctx.beginPath();
   ctx.moveTo(left+width*.18,y);
   ctx.lineTo(left+width*.82,y);
   ctx.stroke();
   ctx.restore();
 });
 ctx.globalAlpha=1;
 // Replace just the baked-in red tuning mark with the neighbouring scale background.
 ctx.drawImage(image,866,333,56,27,916,333,56,27);x+=(target-x)*.16;if(Math.abs(target-x)<.08)x=target;ctx.strokeStyle='#697681';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,333);ctx.lineTo(x,359);ctx.stroke();
 const level=window.YEARON_RADIO?.getLevel()||0;if(running()&&level>.001){[[307,655,174],[1370,655,174]].forEach(([cx,cy,r],i)=>{const size=1+Math.min(.007,level*.025)*(.65+.35*Math.sin(now*.08+i));ctx.save();ctx.translate(cx,cy);ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();ctx.scale(size,size);ctx.drawImage(image,-cx,-cy);ctx.restore()})}ctx.restore();if(running()||x!==target||light!==lightTarget)frame=requestAnimationFrame(draw)}
 function request(){const p=window.YEARON_RADIO?.getState().position??Number(tuner.value);target=p<=1?800+p*295:1095+(p-1)*175;if(reduced.matches)x=target;if(!frame)frame=requestAnimationFrame(draw)}
 radio.addEventListener('yearon-radio-tuning',event=>{const p=event.detail.position;target=p<=1?800+p*295:1095+(p-1)*175;if(reduced.matches)x=target;if(!frame)frame=requestAnimationFrame(draw)});
 radio.addEventListener('yearon-radio-station',request);
 image.onload=()=>{ready=true;canvas.style.filter=getComputedStyle(radio.querySelector(':scope > img')).filter.split('drop-shadow')[0].trim()||'none';request()};image.src=radio.querySelector(':scope > img').src;tuner.addEventListener('input',request);tuner.addEventListener('change',request);new MutationObserver(request).observe(radio,{attributes:true,attributeFilter:['class']});new ResizeObserver(request).observe(radio);document.addEventListener('visibilitychange',request);reduced.addEventListener('change',request);['playing','pause','waiting','ended','error'].forEach(event=>document.addEventListener(event,request,true));
})();
