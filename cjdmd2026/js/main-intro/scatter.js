export function randomGenerator(seed){
  let state=seed>>>0;
  return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
}

export const ICON_GAP=.22;
export const SAME_ICON_GAP=5;

// Rotation-independent footprint bounds prevent contact; repeated designs get
// a wider exclusion zone so the same icon never becomes its own neighbour.
export class SpacingIndex{
  constructor(){this.cells=new Map();this.maxRadius=0;}
  add(point){
    const key=Math.floor(point.x/4)+':'+Math.floor(point.z/4);
    if(!this.cells.has(key))this.cells.set(key,[]);
    this.cells.get(key).push(point);this.maxRadius=Math.max(this.maxRadius,point.radius);
  }
  accepts(point,gap=ICON_GAP){
    const x=Math.floor(point.x/4),z=Math.floor(point.z/4),reach=Math.ceil((point.radius+this.maxRadius+Math.max(gap,SAME_ICON_GAP))/4);
    for(let i=x-reach;i<=x+reach;i++)for(let j=z-reach;j<=z+reach;j++){
      for(const other of this.cells.get(i+':'+j)||[]){
        const same=point.sourceIndex!==undefined&&point.sourceIndex===other.sourceIndex;
        if(Math.hypot(point.x-other.x,point.z-other.z)<point.radius+other.radius+(same?SAME_ICON_GAP:gap))return false;
      }
    }
    return true;
  }
}

export function scatterField(portrait,radii){
  const random=randomGenerator(90317),spacing=new SpacingIndex(),points=[];
  const rx=portrait?7.2:14,rz=portrait?15:9;
  const first={x:-3.5,z:portrait?10:5.7,radius:radii[0]};points.push(first);spacing.add(first);
  for(let index=1;index<3;index++){
    const previous=points[index-1],angle=index===1?-.23:-.4,distance=previous.radius+radii[index]+.5;
    const point={x:previous.x+Math.cos(angle)*distance,z:previous.z+Math.sin(angle)*distance,radius:radii[index]};
    points.push(point);spacing.add(point);
  }
  for(let index=3;index<33;index++){
    let point;
    for(let attempt=0;attempt<20000;attempt++){
      const angle=random()*Math.PI*2,radius=Math.sqrt(random()),expansion=1+Math.floor(attempt/5000)*.1;
      const candidate={x:Math.cos(angle)*rx*radius*expansion,z:Math.sin(angle)*rz*radius*expansion,radius:radii[index]};
      if(spacing.accepts(candidate)){point=candidate;break;}
    }
    if(!point)throw new Error('Could not place icon '+index+' without overlap');
    points.push(point);spacing.add(point);
  }
  return points.map(point=>({...point,height:1+1.1*Math.exp(-2.4*((point.x/rx)**2+(point.z/rz)**2))}));
}

export function scatterPattern(bounds,sources){
  const random=randomGenerator(192807),spacing=new SpacingIndex(),placements=[];
  const active=sources.map((source,sourceIndex)=>({x:source.mesh.position.x,z:source.mesh.position.z,radius:source.radius,sourceIndex}));
  active.forEach(point=>spacing.add(point));
  // Shuffle a full set before reusing any design. Spatial rejection also checks
  // the originals, not just the copies, and never relaxes the separation rule.
  let bag=[],cursor=0;
  function nextDesign(){
    if(cursor===bag.length){
      bag=sources.map((_,index)=>index);cursor=0;
      for(let i=bag.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
    }
    return bag[cursor];
  }
  while(active.length){
    const activeIndex=Math.floor(random()*active.length),base=active[activeIndex];let found=false;
    const sourceIndex=nextDesign(),radius=sources[sourceIndex].radius;
    for(let attempt=0;attempt<36;attempt++){
      const angle=random()*Math.PI*2,distance=(base.radius+radius+ICON_GAP)*(1+random());
      const point={x:base.x+Math.cos(angle)*distance,z:base.z+Math.sin(angle)*distance,radius,sourceIndex};
      if(point.x<bounds.left||point.x>bounds.right||point.z<bounds.back||point.z>bounds.front||!spacing.accepts(point))continue;
      point.rotation=0;
      spacing.add(point);active.push(point);placements.push(point);cursor++;found=true;break;
    }
    if(!found){active[activeIndex]=active[active.length-1];active.pop();}
  }
  return placements;
}
