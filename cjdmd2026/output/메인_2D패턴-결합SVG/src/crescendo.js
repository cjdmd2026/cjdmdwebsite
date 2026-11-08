import {scatterField,randomGenerator} from './scatter.js';
import {REVEAL_DURATION,SOLID_START,POINT_END,OUTLINE_DURATION,FILL_START,EXTRUSION_START,EXTRUSION_DURATION,COLOR_START,COLOR_DURATION,COLOR_END,OPENING_MEASURE_DURATION} from './reveal-timing.js';

export const SOLO_COUNT=3;
export const COLOR_FADE_EXTENSION=.80;
const secondStart=REVEAL_DURATION+OPENING_MEASURE_DURATION+.45;
export const INTRO_CUES=[
  {start:0,tempo:1,measureDuration:OPENING_MEASURE_DURATION,colorExtra:COLOR_FADE_EXTENSION,duration:REVEAL_DURATION+OPENING_MEASURE_DURATION+COLOR_FADE_EXTENSION},
  {start:secondStart,tempo:1,colorExtra:COLOR_FADE_EXTENSION,duration:REVEAL_DURATION+COLOR_FADE_EXTENSION},
  {start:secondStart+SOLID_START-.02,tempo:1,colorExtra:COLOR_FADE_EXTENSION,duration:REVEAL_DURATION+COLOR_FADE_EXTENSION}
];
// Keep the camera transition anchored to the third icon reaching full height.
export const CRESCENDO_START=INTRO_CUES[2].start+SOLID_START;
// Draw surrounding guides in advance so actual icon outlines are visible at that beat.
export const WAVE_OUTLINE_START=CRESCENDO_START-.08;
export const WAVE_SPREAD=7.20;
// Keep the final camera flight anchored while redistributing the wave's stages.
export const OUTLINE_RETURN_START=CRESCENDO_START+WAVE_SPREAD+.52*REVEAL_DURATION/.70+.27;
export const TOPVIEW_START=OUTLINE_RETURN_START-1.05;
export const PULLBACK_END=OUTLINE_RETURN_START+1.55;
// The icons lose all depth four fifths of the way through the final tilt.
// The grid remains flat as the camera finishes its overhead approach.
export const FLAT_GRID_TIME=OUTLINE_RETURN_START+.8*(PULLBACK_END-OUTLINE_RETURN_START);
export const STORY_END=PULLBACK_END;
export const WAVE_EXTRUSION_SHARE=.48;
export const WAVE_COLOR_DURATION=2.00+COLOR_FADE_EXTENSION;
// Start inner colors earlier so successive bands are 1.4 units apart instead
// of 1.07, keeping the soft fade, outer finish, and scroll length unchanged.
export const WAVE_COLOR_SPREAD=4.20;
export const WAVE_STEPS=7;
export const WAVE_COLOR_STEPS=4;
// Extend only color, retaining each band's start and the camera's existing cues.
export const WAVE_COLOR_END=TOPVIEW_START+.45+COLOR_FADE_EXTENSION;
const retimedPhases=[
  [POINT_END,OUTLINE_DURATION,'outlineExtra'],
  [EXTRUSION_START,EXTRUSION_DURATION,'extrusionExtra'],
  [COLOR_START,COLOR_DURATION,'colorExtra']
];

export function introIndex(time){return time<INTRO_CUES[1].start?0:time<INTRO_CUES[2].start?1:2;}

export function outlineReturn(timeline){
  return Math.max(0,Math.min(1,(timeline-OUTLINE_RETURN_START)/(FLAT_GRID_TIME-OUTLINE_RETURN_START)));
}

export function revealCue(index){
  return INTRO_CUES[index];
}

// Originals and repeated tiles share seven radial beats across the complete reveal.
// The gaps between bands make drawing and rising visibly travel out from the center.
export function waveCue(radius,nearest,farthest){
  const radialProgress=Math.max(0,Math.min(1,(radius-nearest)/Math.max(.001,farthest-nearest)));
  const waveStep=Math.round(radialProgress*(WAVE_STEPS-1));
  const progress=waveStep/(WAVE_STEPS-1);
  const tempo=(.76-progress*.24)/.70;
  // Keep drawing in radial order and retain the existing slow height rise.
  // Use part of the inner outlines' long interval to start their colors earlier.
  const drawStart=WAVE_OUTLINE_START+WAVE_SPREAD*progress;
  const gaps=((EXTRUSION_START-FILL_START)+(COLOR_START-SOLID_START))*tempo;
  const riseDuration=(TOPVIEW_START-.65+.40*progress-drawStart-gaps)*WAVE_EXTRUSION_SHARE;
  // Share a color cue within each radial band, leaving a clear beat between bands.
  const colorStep=Math.round(progress*(WAVE_COLOR_STEPS-1));
  const colorProgress=colorStep/(WAVE_COLOR_STEPS-1);
  const colorStart=WAVE_COLOR_END-WAVE_COLOR_DURATION-WAVE_COLOR_SPREAD*(1-colorProgress);
  const outlineExtra=colorStart-drawStart-gaps-riseDuration-OUTLINE_DURATION*tempo;
  const extrusionExtra=riseDuration-EXTRUSION_DURATION*tempo;
  const colorExtra=WAVE_COLOR_DURATION-COLOR_DURATION*tempo;
  return {start:drawStart-POINT_END*tempo,tempo,waveStep,colorStep,outlineExtra,extrusionExtra,colorExtra,
    duration:tempo*REVEAL_DURATION+outlineExtra+extrusionExtra+colorExtra};
}

export function localReveal(timeline,cue){
  let elapsed=Math.max(0,timeline-cue.start);
  const tempo=cue.tempo||cue.duration/REVEAL_DURATION;
  const measurement=cue.measureDuration||0;
  for(const [start,duration,key] of retimedPhases){
    const extra=cue[key]||0;
    if(!extra)continue;
    const phaseStart=start*tempo+measurement,phaseDuration=duration*tempo+extra;
    if(elapsed<=phaseStart)break;
    if(elapsed<phaseStart+phaseDuration)return start+measurement/tempo+(elapsed-phaseStart)/phaseDuration*duration;
    elapsed-=extra;
  }
  return elapsed/tempo;
}

export function fieldPositions(portrait,layout='grid',radii=[]){
  if(layout==='scattered')return scatterField(portrait,radii);
  const rows=portrait?[3,4,4,4,4,4,4,3,3]:[3,7,9,9,5],positions=[];
  rows.forEach((count,row)=>{
    for(let col=0;col<count;col++)positions.push({x:(col-Math.floor(count/2))*(portrait?3.15:3.3),z:((rows.length-1)/2-row)*(portrait?3.05:2.85)});
  });
  // Keep the three opening cells, then shuffle the remaining designs within the grid.
  const solo=positions.splice(0,SOLO_COUNT);
  const random=randomGenerator(90317);
  for(let i=positions.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[positions[i],positions[j]]=[positions[j],positions[i]];}
  const width=Math.max(...[...solo,...positions].map(p=>Math.abs(p.x)))||1;
  const length=Math.max(...[...solo,...positions].map(p=>Math.abs(p.z)))||1;
  return [...solo,...positions].map(p=>({...p,height:1+1.1*Math.exp(-2.4*((p.x/width)**2+(p.z/length)**2))}));
}

// Continue one shared lattice beyond the original 33, including on portrait screens.
export function patternGrid(portrait){
  return {stepX:portrait?3.15:3.3,stepZ:portrait?3.05:2.85,originZ:portrait?12.2:5.7,
    offset:()=>0};
}
