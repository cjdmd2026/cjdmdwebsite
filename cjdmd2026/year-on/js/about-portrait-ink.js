(()=>{const clamp=n=>Math.max(0,Math.min(1,n)),ease=n=>{n=clamp(n);return n*n*(3-2*n)};
 const maskCanvas=document.createElement('canvas');maskCanvas.width=192;maskCanvas.height=108;
 const ctx=maskCanvas.getContext('2d'),pixels=ctx.createImageData(192,108),field=new Float32Array(192*108),cache=new Map();
 const hash=(x,y)=>{const v=Math.sin(x*127.1+y*311.7)*43758.5453;return v-Math.floor(v)};
 function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y),u=ease(x-ix),v=ease(y-iy);return (hash(ix,iy)*(1-u)+hash(ix+1,iy)*u)*(1-v)+(hash(ix,iy+1)*(1-u)+hash(ix+1,iy+1)*u)*v}
 for(let y=0;y<108;y++)for(let x=0;x<192;x++){
  const u=x/192,v=y/108,n=noise(u*5,v*5)*.55+noise(u*16,v*16)*.28+noise(u*43,v*43)*.12+hash(x,y)*.05;
  field[y*192+x]=Math.hypot((u-.16)/1.12,(v-.55)/.9)*.64+n*.29;
 }
 function inkMask(p){const step=Math.round(clamp(p)*96);if(step===96)return 'none';if(cache.has(step))return cache.get(step);
  const threshold=-.12+step/96*1.5;
  for(let i=0;i<field.length;i++){const j=i*4;pixels.data[j]=pixels.data[j+1]=pixels.data[j+2]=255;pixels.data[j+3]=clamp((threshold-field[i])*24+.5)*255}
  ctx.putImageData(pixels,0,0);const url='url("'+maskCanvas.toDataURL('image/png')+'")';cache.set(step,url);return url;
 }

window.YEARONPortraitInk=inkMask;})();
