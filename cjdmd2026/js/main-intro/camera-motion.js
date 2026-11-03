import {CRESCENDO_START,TOPVIEW_START,PULLBACK_END,STORY_END,INTRO_CUES,introIndex} from './crescendo.js';
import {POINT_END,OUTLINE_DURATION,EXTRUSION_START,EXTRUSION_DURATION,OPENING_MEASURE_DURATION} from './reveal-timing.js';

export const CAMERA_START=OPENING_MEASURE_DURATION+EXTRUSION_START+EXTRUSION_DURATION*.5;
export const CAMERA_KNOTS=[CAMERA_START,
  INTRO_CUES[1].start+POINT_END+OUTLINE_DURATION*.46,
  INTRO_CUES[2].start+POINT_END+OUTLINE_DURATION*.66,
  CRESCENDO_START,CRESCENDO_START+(TOPVIEW_START-CRESCENDO_START)*.604,TOPVIEW_START,PULLBACK_END];
const mix=(a,b,t)=>a+(b-a)*t;

// Shape-preserving cubic interpolation shares one velocity at every waypoint.
// Only the start and final overhead shot settle; passing an icon never restarts easing.
function track(time,values){
  const times=CAMERA_KNOTS,last=times.length-1;
  if(time<=times[0])return values[0];
  if(time>=times[last])return values[last];
  const spans=times.slice(1).map((t,i)=>t-times[i]);
  const slopes=spans.map((h,i)=>(values[i+1]-values[i])/h);
  const velocity=values.map((_,i)=>{
    if(!i||i===last||slopes[i-1]*slopes[i]<=0)return 0;
    const a=2*spans[i]+spans[i-1],b=spans[i]+2*spans[i-1];
    return (a+b)/(a/slopes[i-1]+b/slopes[i]);
  });
  const i=times.findIndex((t,i)=>i<last&&time<times[i+1]);
  const h=spans[i],t=(time-times[i])/h,t2=t*t,t3=t2*t;
  return (2*t3-3*t2+1)*values[i]+(t3-2*t2+t)*h*velocity[i]
    +(-2*t3+3*t2)*values[i+1]+(t3-t2)*h*velocity[i+1];
}

export function sampleCamera(timeline,poses,wide,motion=1){
  const time=Math.max(0,Math.min(STORY_END,timeline));
  const [first,second,third]=poses,span=wide.distance-first.distance;
  const between=(key,t)=>mix(third[key],wide[key],t);
  const centers=[first.center,second.center,third.center,...[.16,.65,.90,1].map(t=>({
    x:mix(third.center.x,wide.center.x,t),
    y:mix(third.center.y,wide.center.y,t),
    z:mix(third.center.z,wide.center.z,t)
  }))];
  const center={};
  for(const axis of ['x','y','z'])center[axis]=track(time,centers.map(p=>p[axis]));
  center.y+=motion*track(time,[0,.06,.10,.18,.30,.12,0]);
  const distance=track(time,[first.distance,second.distance*1.02,third.distance*1.08,
    first.distance+span*.06,first.distance+span*.40,first.distance+span*.70,wide.distance]);
  const yaw=track(time,[first.yaw,second.yaw,third.yaw,between('yaw',.18),between('yaw',.58),between('yaw',.82),wide.yaw]);
  const pitch=track(time,[first.pitch,second.pitch,third.pitch,third.pitch+1,third.pitch+3,68,90]);
  return {
    center,distance,yaw,pitch,
    shiftX:track(time,[first.shiftX,second.shiftX,third.shiftX,between('shiftX',.16),between('shiftX',.65),between('shiftX',.90),wide.shiftX]),
    shiftY:track(time,[first.shiftY,second.shiftY,third.shiftY,between('shiftY',.16),between('shiftY',.65),between('shiftY',.90),wide.shiftY]),
    fov:34,roll:motion?track(time,[0,-.018,-.020,-.016,-.012,-.008,0]):0,
    solo:time<CRESCENDO_START,index:introIndex(time),
    travelling:time>CAMERA_START&&time<PULLBACK_END,
    pullback:Math.max(0,Math.min(1,(distance-third.distance*1.08)/(wide.distance-third.distance*1.08))),
    overhead:Math.max(0,Math.min(1,(pitch-third.pitch)/(90-third.pitch)))
  };
}
