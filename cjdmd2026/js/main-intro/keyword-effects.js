import icons from './icons.json' with {type:'json'};

// The small accents share original icon colors that remain visible on white.
export const accentIcons=icons.filter(({color})=>{
  const [r,g,b]=color.slice(1).match(/../g).map(hex=>{
    const channel=parseInt(hex,16)/255;
    return channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4;
  });
  return 1.05/(.2126*r+.7152*g+.0722*b+.05)>=2.3;
});

export function createKeywordPalette(){
  const selectedColors=new Set();
  return entry=>{
    const available=accentIcons.filter(icon=>!selectedColors.has(icon.color));
    const icon=available[Math.floor(Math.random()*available.length)];
    if(entry.icon)selectedColors.delete(entry.icon.color);
    selectedColors.add(icon.color);entry.icon=icon;
    entry.word.style.setProperty('--keyword-color',icon.color);
    entry.glyph.dataset.iconId=icon.id;
    entry.glyph.innerHTML=`<svg viewBox="${icon.viewBox}" fill="currentColor" aria-hidden="true">${icon.svg}</svg>`;
  };
}

export function bounceKeyword(glyph,reducedMotion){
  const frames=reducedMotion.matches
    ?[{opacity:0},{opacity:1,offset:.25},{opacity:0}]
    :[
      {opacity:0,transform:'translate(0,.12em) rotate(-12deg) scale(.25)'},
      {opacity:1,transform:'translate(.18em,-.28em) rotate(14deg) scale(1.25)',offset:.25},
      {opacity:1,transform:'translate(.28em,-.12em) rotate(30deg) scale(.90)',offset:.55},
      {opacity:0,transform:'translate(.42em,-.30em) rotate(48deg) scale(.20)'}
    ];
  return glyph.animate(frames,{duration:reducedMotion.matches?240:480,easing:'cubic-bezier(.22,.7,.3,1)'});
}
