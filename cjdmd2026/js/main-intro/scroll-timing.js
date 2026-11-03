import {STORY_END,WAVE_OUTLINE_START,TOPVIEW_START,INTRO_CUES} from './crescendo.js';
import {FILL_START,OPENING_MEASURE_DURATION} from './reveal-timing.js';

export const OPENING_DRAW_SCALE=1.25;
export const OPENING_DRAW_END=FILL_START+OPENING_MEASURE_DURATION;
const openingExtra=OPENING_DRAW_END*(OPENING_DRAW_SCALE-1);

// Keep the camera/scroll acceleration anchored when inner colors move earlier.
export const FINALE_SPEEDUP_START=TOPVIEW_START-.65;
export const FINALE_SPEED=1.6;
const SPEED_RAMP=.6;
const rampAdvance=SPEED_RAMP*(1+FINALE_SPEED)/2;
const clamp=time=>Math.max(0,Math.min(STORY_END,time));

// Accelerate the shared playhead during its final approach to the overhead view.
// Integrating smoothstep keeps both camera motion and its acceleration continuous.
function advance(delta){
  if(delta>=SPEED_RAMP)return delta*FINALE_SPEED-(FINALE_SPEED-1)*SPEED_RAMP/2;
  const u=delta/SPEED_RAMP;
  return delta+(FINALE_SPEED-1)*SPEED_RAMP*(u*u*u-.5*u*u*u*u);
}

function baseTimelineAtScroll(position){
  // Give only the opening guide and outline more scroll distance; later stages
  // retain their current speed and are simply shifted by the added opening time.
  const progress=position<=OPENING_DRAW_END*OPENING_DRAW_SCALE
    ?position/OPENING_DRAW_SCALE:position-openingExtra;
  if(progress<=FINALE_SPEEDUP_START)return clamp(progress);
  return clamp(FINALE_SPEEDUP_START+advance(progress-FINALE_SPEEDUP_START));
}

function baseScrollAtTimeline(timeline){
  const time=clamp(timeline),delta=time-FINALE_SPEEDUP_START;
  if(time<=OPENING_DRAW_END)return time*OPENING_DRAW_SCALE;
  if(delta<=0)return time+openingExtra;
  if(delta>=rampAdvance)return FINALE_SPEEDUP_START+openingExtra+(delta+(FINALE_SPEED-1)*SPEED_RAMP/2)/FINALE_SPEED;
  let low=0,high=SPEED_RAMP;
  for(let i=0;i<32;i++){
    const mid=(low+high)/2;
    if(advance(mid)<delta)low=mid;else high=mid;
  }
  return FINALE_SPEEDUP_START+openingExtra+(low+high)/2;
}

// Keep the field's scroll window anchored to the camera, independently of color
// duration, so a slower tint does not change scrolling elsewhere in the scene.
export const WAVE_SCROLL_START=WAVE_OUTLINE_START;
export const WAVE_SCROLL_END=TOPVIEW_START+.45;
// Keep the field sequence within its existing scroll budget as its internal
// emphasis moves from colored solids to drawing and extrusion.
export const WAVE_SCROLL_BUDGET=6.20;
const waveStart=baseScrollAtTimeline(WAVE_SCROLL_START);
const waveEnd=baseScrollAtTimeline(WAVE_SCROLL_END);
const waveLength=waveEnd-waveStart,blend=Math.min(.6,waveLength/2);
export const WAVE_SCROLL_SCALE=(WAVE_SCROLL_BUDGET-blend)/(waveLength-blend);
const savedScroll=(1-WAVE_SCROLL_SCALE)*(waveLength-blend);
const smoothIntegral=u=>u*u*u-.5*u*u*u*u;

function compressWave(position){
  const delta=position-waveStart;
  if(delta<=0)return position;
  if(delta>=waveLength)return position-savedScroll;
  const area=delta<blend?blend*smoothIntegral(delta/blend)
    :delta>waveLength-blend?waveLength-blend-blend*smoothIntegral((waveLength-delta)/blend)
    :delta-blend/2;
  return position-(1-WAVE_SCROLL_SCALE)*area;
}

function expandWave(position){
  if(position<=waveStart)return position;
  if(position>=waveEnd-savedScroll)return position+savedScroll;
  let low=waveStart,high=waveEnd;
  for(let i=0;i<36;i++){
    const mid=(low+high)/2;
    if(compressWave(mid)<position)low=mid;else high=mid;
  }
  return (low+high)/2;
}

export const SECOND_SCROLL_START=INTRO_CUES[1].start;
// About 30% less travel than the previous .72 pace after the first icon.
export const SECOND_SCROLL_SCALE=.50;
const secondStart=compressWave(baseScrollAtTimeline(SECOND_SCROLL_START));
const secondBlend=.60,secondRamp=secondBlend*(1+SECOND_SCROLL_SCALE)/2;

// Preserve the complete first icon, then ease into a shorter remaining journey.
function compressLater(position){
  const delta=position-secondStart;
  if(delta<=0)return position;
  if(delta>=secondBlend)return secondStart+delta*SECOND_SCROLL_SCALE+(1-SECOND_SCROLL_SCALE)*secondBlend/2;
  return position-(1-SECOND_SCROLL_SCALE)*secondBlend*smoothIntegral(delta/secondBlend);
}

function expandLater(position){
  const delta=position-secondStart;
  if(delta<=0)return position;
  if(delta>=secondRamp)return secondStart+(delta-(1-SECOND_SCROLL_SCALE)*secondBlend/2)/SECOND_SCROLL_SCALE;
  let low=secondStart,high=secondStart+secondBlend;
  for(let i=0;i<36;i++){
    const mid=(low+high)/2;
    if(compressLater(mid)<position)low=mid;else high=mid;
  }
  return (low+high)/2;
}

export function timelineAtScroll(position){return baseTimelineAtScroll(expandWave(expandLater(position)));}
export function scrollAtTimeline(timeline){return compressLater(compressWave(baseScrollAtTimeline(timeline)));}
export const SCROLL_DURATION=scrollAtTimeline(STORY_END);
// Begin drawing when Content 02 starts entering the viewport. Subtract the same
// lead from its track height so later stages retain their existing scroll pace.
export const JOURNEY_ENTRY_VIEWPORTS=.85;
// Use 70% of the former .60 distance, preserving every internal phase ratio.
export const SCROLL_DISTANCE_SCALE=.42;
export const JOURNEY_HEIGHT_SVH=100+SCROLL_DURATION*115*SCROLL_DISTANCE_SCALE-JOURNEY_ENTRY_VIEWPORTS*100;
export function journeyScrollRange(trackTop,trackHeight,viewportHeight){
  const lead=viewportHeight*JOURNEY_ENTRY_VIEWPORTS;
  return {start:trackTop-lead,distance:Math.max(1,trackHeight-viewportHeight+lead)};
}
