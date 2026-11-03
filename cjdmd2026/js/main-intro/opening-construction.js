import * as THREE from 'three';
import {OPENING_OUTLINE_START} from './reveal-timing.js';

const NS='http://www.w3.org/2000/svg';
const clamp=value=>Math.max(0,Math.min(1,value));
const ease=value=>{const t=clamp(value);return t*t*(3-2*t);};
const number=value=>String(Number(value.toFixed(2)));

export function createOpeningConstruction(host,object){
  const [vx,vy,vw,vh]=object.icon.viewBox.trim().split(/[\s,]+/).map(Number);
  const bounds=object.caster.svgBounds,cx=vx+vw/2,cy=vy+vh/2;
  // Recover the top rectangular block from the source SVG contours. Its actual
  // edges determine the tangent circles and dimensions, without bevels.
  const boxes=object.caster.contours.filter(contour=>!contour.hole).map(contour=>{
    const xs=contour.points.map(([x])=>vx+(x-bounds.minX)/(bounds.maxX-bounds.minX)*vw);
    const ys=contour.points.map(([,z])=>vy+(z-bounds.minZ)/(bounds.maxZ-bounds.minZ)*vh);
    const left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
    const centerX=(left+right)/2,centerY=(top+bottom)/2;
    const distance=Math.hypot(centerX-cx,centerY-cy)||1;
    const radial=xs.map((x,index)=>((x-cx)*(centerX-cx)+(ys[index]-cy)*(centerY-cy))/distance);
    return {left,right,top,bottom,centerX,centerY,
      radius:Math.max(...xs.map((x,index)=>Math.hypot(x-cx,ys[index]-cy))),
      radialInner:Math.min(...radial),radialOuter:Math.max(...radial)};
  });
  const block=boxes.filter(box=>box.left<cx&&box.right>cx&&box.bottom<cy).sort((a,b)=>a.top-b.top)[0];
  const centerBoxes=boxes.filter(box=>box.left<cx&&box.right>cx&&box.top<cy&&box.bottom>cy);
  const centerRadius=Math.max(...centerBoxes.map(box=>box.radius));
  // The upright center square has the smaller bounds of the two overlapping shapes.
  const centerBlock=centerBoxes.sort((a,b)=>(a.right-a.left)*(a.bottom-a.top)-(b.right-b.left)*(b.bottom-b.top))[0];
  const radii=[cy-block.top,cy-block.bottom,centerRadius];
  const smallBoxes=boxes.filter(box=>(box.right<cx||box.left>cx)&&(box.bottom<cy||box.top>cy));
  const smallRadii=['radialOuter','radialInner'].map(key=>smallBoxes.reduce((sum,box)=>sum+box[key],0)/smallBoxes.length);
  const svg=document.createElementNS(NS,'svg');
  svg.setAttribute('class','opening-construction');svg.setAttribute('aria-hidden','true');
  svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none';
  const group=document.createElementNS(NS,'g');svg.append(group);host.append(svg);
  function path(name,color,width){
    const element=document.createElementNS(NS,'path');
    element.dataset.part=name;element.setAttribute('fill','none');element.setAttribute('stroke',color);
    element.setAttribute('stroke-width',width);element.setAttribute('stroke-linecap','round');
    group.append(element);return element;
  }
  const rings=radii.map((radius,index)=>({element:path(['outer-circle','inner-circle','center-circle'][index],'#b0b7bf',.85),radius,
    centerX:cx,centerY:cy,start:.08+index*.24,duration:1.08,direction:index?-1:1}));
  // Shared concentric guides touch the inner and outer edges of all four blocks.
  smallRadii.forEach((radius,index)=>rings.push({element:path(`small-box-${index?'inner':'outer'}-circle`,'#b0b7bf',.85),radius,
    centerX:cx,centerY:cy,start:.72+index*.22,duration:.78,direction:index?-1:1}));
  const axes=[path('horizontal-axis','#c3c9cf',.65),path('vertical-axis','#c3c9cf',.65)];
  axes.forEach(element=>element.setAttribute('stroke-dasharray','3 5'));
  const dimensions=[
    {name:'block-width',value:number(block.right-block.left),a:[block.left,block.top-8],b:[block.right,block.top-8],anchor:'middle',offset:[0,-9],start:.64},
    {name:'block-height',value:number(block.bottom-block.top),a:[block.right+8,block.top],b:[block.right+8,block.bottom],anchor:'start',offset:[6,0],start:.98},
    {name:'center-width',value:number(centerBlock.right-centerBlock.left),a:[centerBlock.left,centerBlock.top-8],b:[centerBlock.right,centerBlock.top-8],anchor:'middle',offset:[0,-9],start:1.12},
    {name:'center-height',value:number(centerBlock.bottom-centerBlock.top),a:[centerBlock.right+8,centerBlock.top],b:[centerBlock.right+8,centerBlock.bottom],anchor:'start',offset:[6,0],start:1.32}
  ].map(data=>{
    const element=path(data.name,'#FF3C3C',1),label=document.createElementNS(NS,'text');
    label.textContent=data.value;label.dataset.part=data.name+'-value';
    label.setAttribute('fill','#FF3C3C');label.setAttribute('font-family','Handjet, monospace');
    label.setAttribute('font-weight','400');label.setAttribute('text-anchor',data.anchor);label.setAttribute('dominant-baseline','middle');
    label.setAttribute('stroke','#fff');label.setAttribute('stroke-width','3');label.setAttribute('stroke-linejoin','round');label.setAttribute('paint-order','stroke');
    label.style.fontVariantNumeric='tabular-nums';group.append(label);
    return {...data,element,label};
  });
  const point=new THREE.Vector3();
  function project(x,y,camera,width,height){
    point.set(bounds.minX+(x-vx)/vw*(bounds.maxX-bounds.minX),.009,bounds.minZ+(y-vy)/vh*(bounds.maxZ-bounds.minZ));
    object.reveal.group.localToWorld(point);point.project(camera);
    return {x:(point.x+1)*width/2,y:(1-point.y)*height/2};
  }
  function drawLine(element,a,b,progress,camera,width,height){
    const from=project(...a,camera,width,height),to=project(a[0]+(b[0]-a[0])*progress,a[1]+(b[1]-a[1])*progress,camera,width,height);
    element.setAttribute('d',`M${from.x},${from.y}L${to.x},${to.y}`);
    element.setAttribute('opacity',progress>0?1:0);
  }
  let state={visible:false,opacity:0,circles:rings.map(()=>0),dimensions:dimensions.map(({value})=>({value,progress:0,labelOpacity:0}))};
  return {
    update(local,camera,width,height){
      const elapsed=local-OPENING_OUTLINE_START;
      const opacity=ease(elapsed/.24)*object.reveal.state.guideOpacity;
      state={...state,visible:object.reveal.group.visible&&opacity>.001,opacity};
      svg.style.display=state.visible?'block':'none';group.setAttribute('opacity',opacity);
      if(!state.visible)return;
      svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      state.circles=rings.map(({element,radius,centerX,centerY,start,duration,direction})=>{
        const progress=ease((elapsed-start)/duration);
        const segments=Math.max(1,Math.ceil(progress*128));let d='';
        for(let i=0;i<=segments;i++){
          const angle=-Math.PI/2+progress*(i/segments)*Math.PI*2*direction;
          const p=project(centerX+Math.cos(angle)*radius,centerY+Math.sin(angle)*radius,camera,width,height);
          d+=(i?'L':'M')+p.x+','+p.y;
        }
        element.setAttribute('d',d);element.setAttribute('opacity',progress>0?1:0);return progress;
      });
      const axisProgress=ease((elapsed-.42)/.75),r=radii[0];
      drawLine(axes[0],[cx-r,cy],[cx+r,cy],axisProgress,camera,width,height);
      drawLine(axes[1],[cx,cy-r],[cx,cy+r],axisProgress,camera,width,height);
      state.dimensions=dimensions.map(({element,label,value,a,b,anchor,offset,start})=>{
        const progress=ease((elapsed-start)/.46),labelOpacity=ease((elapsed-start-.32)/.32);
        drawLine(element,a,b,progress,camera,width,height);
        const p=project((a[0]+b[0])/2,(a[1]+b[1])/2,camera,width,height);
        label.setAttribute('x',p.x+offset[0]+(anchor==='start'?(1-labelOpacity)*4:0));
        label.setAttribute('y',p.y+offset[1]+(anchor==='middle'?(1-labelOpacity)*4:0));
        label.setAttribute('font-size',width<500?12:14);label.setAttribute('opacity',labelOpacity);
        return {value,progress,labelOpacity};
      });
    },
    inspect(){return {...state,block,radii};}
  };
}
