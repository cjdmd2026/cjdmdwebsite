import {createKeywordPalette,bounceKeyword} from './keyword-effects.js';

export const CAPTION_COLOR_DELAY=.65;
export const CAPTION_COLOR_DURATION=.90;
const ease=value=>{const t=Math.max(0,Math.min(1,value));return t*t*(3-2*t);};

export function createCaptionKeywords(captions,reducedMotion){
  const chooseIcon=createKeywordPalette(),entries=new Map();
  let active=null;
  captions.forEach((caption,index)=>{
    const word=caption.querySelector('[data-caption-keyword]');
    if(!word)return;
    const color=document.createElement('span'),glyph=document.createElement('span');
    color.className='caption-keyword-color';color.dataset.label=word.textContent;
    color.setAttribute('aria-hidden','true');
    glyph.className='keyword-pop';glyph.setAttribute('aria-hidden','true');
    word.append(color,glyph);
    const entry={word,glyph,icon:null,started:false,recolor:false,completed:false,animation:null};
    chooseIcon(entry);entries.set(index,entry);
  });
  function clear(entry){
    if(!entry)return;
    entry.animation?.cancel();entry.animation=null;
    if(active===entry)active=null;
  }
  function bounce(entry){
    clear(active);
    const bounds=entry.word.getBoundingClientRect();
    if(bounds.bottom<=70||bounds.top>=innerHeight)return;
    active=entry;
    const animation=bounceKeyword(entry.glyph,reducedMotion);
    entry.animation=animation;
    animation.onfinish=()=>{
      if(entry.animation!==animation)return;
      clear(entry);entry.word.dataset.phase='complete';
    };
  }
  reducedMotion.addEventListener('change',()=>{entries.forEach(entry=>{clear(entry);entry.word.dataset.phase=entry.completed?'complete':'color';});});
  return {
    update(index,local,captionOpacity){
      const entry=entries.get(index);if(!entry)return;
      const progress=ease((local-CAPTION_COLOR_DELAY)/CAPTION_COLOR_DURATION);
      if(local<=CAPTION_COLOR_DELAY){
        if(entry.started)entry.recolor=true;
        entry.started=false;
      }else if(!entry.started){
        if(entry.recolor)chooseIcon(entry);
        entry.started=true;entry.recolor=false;
      }
      entry.word.style.setProperty('--keyword-tint',String(progress));
      if(progress<1){clear(entry);entry.completed=false;}
      else if(!entry.completed){
        entry.completed=true;
        // Only pulse on the visible color-completion beat, not on a deep scroll restore.
        if(captionOpacity>.9&&local<CAPTION_COLOR_DELAY+CAPTION_COLOR_DURATION+.55)bounce(entry);
      }
      if(captionOpacity<.05)clear(entry);
      entry.word.dataset.phase=entry.animation?'pop':progress===1?'complete':progress>0?'color':'waiting';
    }
  };
}
