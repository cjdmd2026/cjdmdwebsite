const clamp=value=>Math.max(0,Math.min(1,value));

export function createReadingHover(heading,reducedMotion,textSelector='[data-read]'){
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  const pointer={x:0,y:0,active:false};
  const rows=[...heading.querySelectorAll(textSelector)].map(word=>{
    const text=[...word.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).map(node=>node.textContent).join('');
    const source=document.createElement('span'),letters=document.createElement('span');
    source.className='reading-source';source.textContent=text;
    letters.className='reading-letters';letters.setAttribute('aria-hidden','true');
    const accent=word.dataset.readAccent||'',accentStart=accent?text.indexOf(accent):-1;
    const chars=Array.from(text,(char,index)=>{
      const element=document.createElement('span');
      element.className='reading-char';element.textContent=char;letters.append(element);
      if(accentStart>=0&&index>=accentStart&&index<accentStart+accent.length)element.classList.add('reading-accent');
      return {element,center:0,x:0,velocity:0,target:0};
    });
    for(const node of [...word.childNodes])if(node.nodeType===Node.TEXT_NODE)node.remove();
    word.prepend(source,letters);word.classList.add('reading-interactive');
    return {word,letters,chars,fontSize:0};
  });
  let frame=0,lastTime=0;

  function tick(time){
    const dt=Math.min(1/30,(time-lastTime)/1000||1/60);lastTime=time;
    let moving=false;
    for(const row of rows){
      for(const char of row.chars){
        char.velocity+=((char.target-char.x)*260-char.velocity*24)*dt;
        char.x+=char.velocity*dt;
        if(Math.abs(char.target-char.x)<.015&&Math.abs(char.velocity)<.05){
          char.x=char.target;char.velocity=0;
        }else moving=true;
        char.element.style.transform=`translate3d(${char.x.toFixed(3)}px,0,0)`;
      }
      row.word.style.setProperty('--read-end-shift',`${row.chars.at(-1).x.toFixed(3)}px`);
    }
    frame=moving?requestAnimationFrame(tick):0;
  }
  function start(){
    if(!frame){lastTime=performance.now();frame=requestAnimationFrame(tick);}
  }
  function reset(immediate=false){
    pointer.active=false;
    for(const row of rows){
      for(const char of row.chars){
        char.target=0;
        if(immediate){char.x=0;char.velocity=0;char.element.style.transform='none';}
      }
      if(immediate)row.word.style.setProperty('--read-end-shift','0px');
    }
    if(immediate){cancelAnimationFrame(frame);frame=0;}else start();
  }
  function updateTargets(){
    if(!pointer.active)return;
    const headingBounds=heading.getBoundingClientRect();
    if(pointer.x<headingBounds.left||pointer.x>headingBounds.right||pointer.y<headingBounds.top||pointer.y>headingBounds.bottom){reset();return;}
    // Separate font runs on the same visual line share one displacement field,
    // so expanding one word also makes room in the words that follow it.
    const lines=[];
    for(const row of rows){
      const bounds=row.letters.getBoundingClientRect(),center=bounds.top+bounds.height/2;
      let line=lines.find(item=>Math.abs(item.center-center)<Math.min(item.height,bounds.height)*.25);
      if(!line){line={center,height:bounds.height,left:bounds.left,right:bounds.right,fontSize:row.fontSize,runs:[]};lines.push(line);}
      line.left=Math.min(line.left,bounds.left);line.right=Math.max(line.right,bounds.right);
      line.fontSize=Math.max(line.fontSize,row.fontSize);line.runs.push({row,bounds});
    }
    for(const line of lines){
      const dy=(pointer.y-line.center)/(line.height*1.15);
      const influence=Math.pow(clamp(1-dy*dy),2);
      const radius=line.fontSize*1.35,force=line.fontSize*.64;
      const outside=Math.max(0,line.left-pointer.x,pointer.x-line.right)/radius;
      const proximity=Math.exp(-outside*outside);
      for(const {row,bounds} of line.runs){
        // Use the stationary line and glyph origins, never their displaced positions.
        for(const char of row.chars){
          const dx=(bounds.left+char.center-pointer.x)/radius;
          // A monotone displacement opens gaps without crushing adjacent letters.
          char.target=force*Math.tanh(dx)*influence*proximity;
          char.target=Math.max(20-line.left,Math.min(innerWidth-20-line.right,char.target));
        }
      }
    }
    start();
  }
  function measure(){
    for(const row of rows){
      const bounds=row.letters.getBoundingClientRect();
      row.fontSize=parseFloat(getComputedStyle(row.word).fontSize);
      row.word.style.setProperty('--read-width',`${bounds.width}px`);
      for(const char of row.chars){
        const glyph=char.element.getBoundingClientRect(),left=glyph.left-bounds.left-char.x;
        char.center=left+glyph.width/2;
        char.element.style.setProperty('--char-left',`${left}px`);
      }
    }
    updateTargets();
  }
  heading.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||!finePointer.matches||reducedMotion.matches)return;
    pointer.x=event.clientX;pointer.y=event.clientY;pointer.active=true;updateTargets();
  });
  heading.addEventListener('pointerleave',()=>reset());
  heading.addEventListener('pointercancel',()=>reset());
  window.addEventListener('blur',()=>reset());
  window.addEventListener('scroll',updateTargets,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset(true);});
  reducedMotion.addEventListener('change',()=>reset(true));
  finePointer.addEventListener('change',()=>reset(true));
  const observer=new ResizeObserver(measure);
  rows.forEach(row=>observer.observe(row.letters));
  document.fonts.ready.then(measure);
  measure();
}
