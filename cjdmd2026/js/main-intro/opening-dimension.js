import * as THREE from 'three';
import {OPENING_MEASURE_START,OPENING_MEASURE_DURATION,OPENING_LABEL_START,OPENING_OUTLINE_START,OPENING_DIMENSION_FADE} from './reveal-timing.js';

const NS='http://www.w3.org/2000/svg',COLOR='#FF3C3C';
const clamp=value=>Math.max(0,Math.min(1,value));
const ease=value=>{const t=clamp(value);return t*t*(3-2*t);};

export function createOpeningDimension(host,object){
  const svgHeight=Number(object.icon.viewBox.trim().split(/[\s,]+/)[3]);
  const label=String(Number(svgHeight.toFixed(2)));
  const svg=document.createElementNS(NS,'svg');
  svg.setAttribute('class','opening-dimension');svg.setAttribute('aria-hidden','true');
  Object.assign(svg.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',display:'none'});
  const group=document.createElementNS(NS,'g');group.setAttribute('stroke',COLOR);group.setAttribute('stroke-width','1');group.setAttribute('fill','none');
  svg.append(group);
  const lines=['upper-cap','stem','lower-cap'].map(name=>{
    const line=document.createElementNS(NS,'line');line.setAttribute('data-part',name);group.append(line);return line;
  });
  const text=document.createElementNS(NS,'text');text.textContent=label;
  text.setAttribute('fill',COLOR);text.setAttribute('stroke','none');text.setAttribute('dominant-baseline','middle');
  text.setAttribute('font-family','Handjet, monospace');text.setAttribute('font-weight','400');
  text.style.fontVariantNumeric='tabular-nums';group.append(text);host.append(svg);
  let state={visible:false,label,svgHeight,color:COLOR,progress:0,opacity:0};
  const point=new THREE.Vector3();
  function project(x,z,camera,width,height){
    point.set(x,.008, z);object.reveal.group.localToWorld(point);point.project(camera);
    return {x:(point.x+1)*width/2,y:(1-point.y)*height/2};
  }
  function line(element,a,b){
    element.setAttribute('x1',a.x);element.setAttribute('y1',a.y);element.setAttribute('x2',b.x);element.setAttribute('y2',b.y);
  }
  return {
    update(local,camera,width,height){
      const progress=clamp((local-OPENING_MEASURE_START)/OPENING_MEASURE_DURATION);
      const opacity=ease(progress/.12)*(1-ease((local-OPENING_OUTLINE_START)/OPENING_DIMENSION_FADE))*object.reveal.state.guideOpacity;
      state={...state,visible:opacity>.001,progress,opacity};
      svg.style.display=state.visible?'block':'none';group.setAttribute('opacity',opacity);
      if(!state.visible)return;
      svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const {minZ,maxZ,maxX}=object.reveal.guide.userData.bounds;
      const top=project(maxX,minZ,camera,width,height),bottom=project(maxX,maxZ,camera,width,height);
      const length=Math.hypot(bottom.x-top.x,bottom.y-top.y);
      const right={x:(bottom.y-top.y)/length,y:-(bottom.x-top.x)/length};
      const a={x:top.x+right.x*9,y:top.y+right.y*9},b={x:bottom.x+right.x*9,y:bottom.y+right.y*9};
      const upper=ease(progress/.20),stem=ease((progress-.10)/.55),lower=ease((progress-.62)/.18);
      const cap=(center,amount)=>[{x:center.x-right.x*6*amount,y:center.y-right.y*6*amount},{x:center.x+right.x*6*amount,y:center.y+right.y*6*amount}];
      line(lines[0],...cap(a,upper));
      line(lines[1],a,{x:a.x+(b.x-a.x)*stem,y:a.y+(b.y-a.y)*stem});
      line(lines[2],...cap(b,lower));
      const labelOpacity=ease((local-OPENING_LABEL_START)/(OPENING_MEASURE_DURATION*.20)),fontSize=width<500?12:14;
      const labelX=(a.x+b.x)/2+right.x*(7+(1-labelOpacity)*5),labelY=(a.y+b.y)/2+right.y*7;
      text.setAttribute('x',labelX);text.setAttribute('y',labelY);text.setAttribute('font-size',fontSize);text.setAttribute('opacity',labelOpacity);
      state={...state,upper,stem,lower,labelOpacity,top:a,bottom:b,labelPosition:{x:labelX,y:labelY},fontSize};
    },
    inspect(){return {...state};}
  };
}
