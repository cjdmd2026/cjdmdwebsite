import * as THREE from 'three';

// The opening sweep crosses the viewport before its canvas becomes sticky.
// Project the same animated geometry outside the canvas's clipping boundary.
export function createOpeningGuideOverlay(host,reveal){
  const {guide}=reveal,sweep=guide.userData.sweep;
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
  svg.classList.add('opening-guide-sweep');
  svg.setAttribute('aria-hidden','true');
  svg.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;display:none';
  svg.setAttribute('fill','none');
  svg.setAttribute('stroke','#'+sweep.material.color.getHexString());
  svg.setAttribute('stroke-width','1');
  const lines=Array.from({length:4},()=>{
    const line=document.createElementNS(ns,'line');svg.append(line);return line;
  });
  document.body.append(svg);
  sweep.material.visible=false;
  const point=new THREE.Vector3();
  return {
    update(camera){
      const visible=reveal.group.visible&&guide.visible&&sweep.visible;
      svg.style.display=visible?'block':'none';
      if(!visible)return;
      const rect=host.getBoundingClientRect(),positions=sweep.geometry.attributes.position;
      svg.setAttribute('viewBox',`0 0 ${innerWidth} ${innerHeight}`);
      svg.setAttribute('opacity',String(sweep.material.opacity));
      lines.forEach((line,index)=>{
        for(let endpoint=0;endpoint<2;endpoint++){
          point.fromBufferAttribute(positions,index*2+endpoint);
          sweep.localToWorld(point).project(camera);
          line.setAttribute('x'+(endpoint+1),String(rect.left+(point.x+1)*rect.width/2));
          line.setAttribute('y'+(endpoint+1),String(rect.top+(1-point.y)*rect.height/2));
        }
      });
    }
  };
}
