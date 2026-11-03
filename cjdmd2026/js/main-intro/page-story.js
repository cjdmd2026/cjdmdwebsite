import {INTRO_CUES,WAVE_COLOR_END,WAVE_COLOR_DURATION,WAVE_COLOR_SPREAD} from './crescendo.js';
import {initSiteHeader} from './site-header.js';
import {createContentOne} from './content-one.js';
import {createCaptionKeywords} from './caption-keywords.js';
import {createConstructionToolbar} from './construction-toolbar.js';
import {createReadingHover} from './reading-hover.js';
import {OPENING_LABEL_START,GUIDE_SWEEP_END} from './reveal-timing.js';

const clamp=value=>Math.max(0,Math.min(1,value));
const ease=value=>{const t=clamp(value);return t*t*(3-2*t);};
// Give the different-shapes caption more room by borrowing from the following caption.
export const CAPTION_CUES=[GUIDE_SWEEP_END,OPENING_LABEL_START,INTRO_CUES[1].start,INTRO_CUES[2].start+1.5];
export const CAPTION_FADE_START=WAVE_COLOR_END-WAVE_COLOR_DURATION-WAVE_COLOR_SPREAD;
export const CAPTION_FADE_DURATION=2.4;
export const CAPTION_END=CAPTION_FADE_START+CAPTION_FADE_DURATION;

export function createPageStory(){
  const siteHeader=initSiteHeader();
  const captions=[...document.querySelectorAll('[data-caption]')];
  const constructionBar=document.querySelector('.construction-bar');
  const toolbar=createConstructionToolbar(constructionBar);
  const heroTitle=document.querySelector('.hero-heading');
  const year=document.querySelector('.section-year');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  createReadingHover(heroTitle,reducedMotion,'[data-hover-text]');
  const captionKeywords=createCaptionKeywords(captions,reducedMotion);
  const intro=document.querySelector('#content01');
  const contentOne=createContentOne(intro,reducedMotion);
  let active=-1,reading=0;

  function resize(){
    constructionBar.style.setProperty('--bar-scale',String(Math.min(1,Math.max(0,innerWidth-40)/308)));
    updateIntro();
  }
  function updateIntro(){
    // Both elements dissolve as their actual position approaches the screen top.
    // The year stays crisp while sticky, then follows Content 01 out of view.
    for(const element of [heroTitle,year]){
      const fade=ease((innerHeight*.64-element.getBoundingClientRect().top)/(innerHeight*.44));
      element.style.opacity=String((element===year ? .7 : 1)*(1-fade));
      element.style.filter=`blur(${reducedMotion.matches?0:fade*12}px)`;
    }
    // Shift the reading window down by 10% of the viewport, keeping its pace.
    reading=clamp((innerHeight*.60-intro.getBoundingClientRect().top)/innerHeight);
    contentOne.update(reading);
  }
  function update(timeline){
    // Let the navigation travel over the same scroll interval and easing as the title.
    siteHeader.setAutoHideProgress(ease((timeline-CAPTION_FADE_START)/CAPTION_FADE_DURATION));
    // The tool strip belongs to the first icon, between its red sweep and the next guide.
    const barEntering=ease((timeline-GUIDE_SWEEP_END)/.55);
    const barLeaving=ease((timeline-INTRO_CUES[1].start)/.55);
    const barOpacity=barEntering*(1-barLeaving);
    constructionBar.style.opacity=String(barOpacity);
    constructionBar.style.visibility=barOpacity>0?'visible':'hidden';
    constructionBar.style.transform=`translate(-50%,${reducedMotion.matches?0:((1-barEntering)+barLeaving)*66}px) scale(var(--bar-scale,1))`;
    // Once the bar settles, its selection turns on even if scrolling pauses.
    toolbar.update(barEntering,barLeaving);
    active=-1;
    CAPTION_CUES.forEach((cue,index)=>{if(timeline>=cue)active=index;});
    if(timeline>=CAPTION_END)active=-1;
    captions.forEach((caption,index)=>{
      const entering=ease((timeline-CAPTION_CUES[index])/.55);
      // Dissolve the last caption with the first color band, before the wave fills the field.
      const last=index===captions.length-1;
      const leaving=ease((timeline-(last?CAPTION_FADE_START:CAPTION_CUES[index+1]))/(last?CAPTION_FADE_DURATION:.55));
      const opacity=entering*(1-leaving);
      caption.style.opacity=String(opacity);
      caption.style.filter=`blur(${reducedMotion.matches?0:((1-entering)+leaving)*10}px)`;
      caption.style.transform=`translateY(${reducedMotion.matches?0:(1-entering)*10-leaving*10}px)`;
      caption.setAttribute('aria-hidden',String(index!==active));
      captionKeywords.update(index,timeline-CAPTION_CUES[index],opacity);
    });
  }
  addEventListener('scroll',updateIntro,{passive:true});
  addEventListener('resize',resize);
  resize();update(0);
  return {update,inspect:()=>({caption:active,reading,text:captions[active]?.textContent.trim()})};
}
