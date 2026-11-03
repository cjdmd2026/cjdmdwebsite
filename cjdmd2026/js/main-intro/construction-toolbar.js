export function createConstructionToolbar(bar){
  const buttons=[...bar.querySelectorAll('.construction-tool')];
  let selected=0,ready=false;

  function render(){
    buttons.forEach((button,index)=>{
      button.setAttribute('aria-pressed',String(ready&&index===selected));
      button.tabIndex=ready&&index===selected?0:-1;
    });
  }
  buttons.forEach((button,index)=>{
    button.addEventListener('click',()=>{
      if(!ready)return;
      selected=index;
      bar.classList.add('is-tool-manual');
      render();
    });
    button.addEventListener('keydown',event=>{
      if(!ready||event.altKey||event.ctrlKey||event.metaKey)return;
      const next=event.key==='ArrowRight'?(index+1)%buttons.length
        :event.key==='ArrowLeft'?(index+buttons.length-1)%buttons.length
        :event.key==='Home'?0:event.key==='End'?buttons.length-1:null;
      if(next===null)return;
      event.preventDefault();
      buttons.forEach((item,i)=>{item.tabIndex=i===next?0:-1;});
      buttons[next].focus({preventScroll:true});
    });
  });
  render();

  return {
    update(entering,leaving){
      // Replaying the entrance starts with the selection tool again. Ordinary
      // scrolling keeps the user's choice rather than overwriting it each frame.
      if(entering===0){selected=0;bar.classList.remove('is-tool-manual');}
      const nextReady=entering===1&&leaving<1;
      if(nextReady===ready)return;
      ready=nextReady;
      if(!ready&&bar.contains(document.activeElement))document.activeElement.blur();
      bar.inert=!ready;
      bar.setAttribute('aria-hidden',String(!ready));
      bar.classList.toggle('is-tool-selected',ready);
      render();
    }
  };
}
