(()=>{
  const nav=document.querySelector('#timeNav');
  if(!nav)return;

  const eras=[
    {year:'1780',medium:'PUNGSOKHWA'},
    {year:'1880',medium:'NEWSPAPER'},
    {year:'1920',medium:'RADIO'},
    {year:String(window.YEARON_TV_YEAR||'1980'),medium:'CRT TELEVISION'},
    {year:'2000',medium:'PC / INTERNET'},
    {year:'2010',medium:'SMARTPHONE'}
  ];
  const descriptions=['그림 속에 사람들의 일상과 관계를 담다.','글과 인쇄를 통해 시대의 소식을 전하다.','소리를 통해 사람들의 이야기를 함께 듣다.','영상과 소리로 시대의 일상을 함께 나누다.','인터넷을 통해 서로의 생각과 일상을 주고받다.','손안의 화면으로 일상을 실시간으로 공유하다.'];
  const descriptionsEn=['Capturing everyday lives and relationships in paintings.','Bringing news of the times through writing and print.','Listening together to people’s stories through sound.','Sharing everyday life through moving images and sound.','Exchanging thoughts and everyday lives over the internet.','Sharing everyday moments in real time through a screen in the hand.'];
  const buttons=[...nav.querySelectorAll('button[data-index]')];
  let current=-1,renderedYear=null;

  buttons.forEach((button,index)=>{
    const heading=document.createElement('span');
    heading.className='era-current-heading';
    heading.setAttribute('aria-hidden','true');
    heading.innerHTML=`<span class="era-current-medium">${eras[index].medium}</span><span class="era-odometer"></span><small class="era-current-description">${descriptions[index]}</small>`;
    button.append(heading);
  });

  const sequence=(from,to,direction)=>{
    const values=[from];
    let value=from;
    const step=direction>0?1:-1;
    while(value!==to){
      value=(value+step+10)%10;
      values.push(value);
    }
    return values;
  };

  const longSequence=(from,to,direction)=>{
    const values=[from];
    const step=direction>0?1:-1;
    let value=from;
    let turns=0;
    do{
      value=(value+step+10)%10;
      values.push(value);
      turns++;
    }while(turns<3||value!==to);
    return values;
  };

  const render=(index,animate)=>{
    const button=buttons[index];
    if(!button)return;
    const counter=button.querySelector('.era-odometer');
    const oldYear=renderedYear||eras[index].year;
    const nextYear=eras[index].year;
    const direction=Number(nextYear)>=Number(oldYear)?1:-1;
    const centuryJump=Math.abs(Number(nextYear)-Number(oldYear))>=100;
    counter.replaceChildren();
    if(index===0){
      for(const digit of '18'){const viewport=document.createElement('span');viewport.className='era-odometer-digit';const reel=document.createElement('span');reel.className='era-odometer-reel';const cell=document.createElement('i');cell.textContent=digit;reel.append(cell);viewport.append(reel);counter.append(viewport)}
      const suffix=document.createElement('span');suffix.className='era-odometer-suffix';suffix.textContent='TH C';counter.append(suffix);current=index;renderedYear=eras[index].year;return;
    }
    if(current===0)animate=false;

    [...nextYear].forEach((digit,place)=>{
      const viewport=document.createElement('span');
      viewport.className='era-odometer-digit';
      const reel=document.createElement('span');
      reel.className='era-odometer-reel';
      const spinCentury=animate&&centuryJump&&place>0;
      const values=animate?(spinCentury?longSequence(Number(oldYear[place]),Number(digit),direction):sequence(Number(oldYear[place]),Number(digit),direction)):[Number(digit)];
      values.forEach(value=>{
        const cell=document.createElement('i');
        cell.textContent=String(value);
        reel.append(cell);
      });
      viewport.append(reel);
      counter.append(viewport);
      if(animate&&values.length>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
        reel.animate([{transform:'translate3d(0,0,0)'},{transform:`translate3d(0,${-.92*(values.length-1)}em,0)`}],{duration:680+place*35,easing:'cubic-bezier(.22,.65,.25,1)',fill:'forwards'});
      }
    });

    const suffix=document.createElement('span');
    suffix.className='era-odometer-suffix';
    suffix.textContent='s';
    counter.append(suffix);
    current=index;renderedYear=nextYear;
  };

  const sync=()=>{
    const index=buttons.findIndex(button=>button.classList.contains('active'));
    if(index<0||index===current)return;
    render(index,current>=0);
  };

  addEventListener('yearon-tv-year-change',event=>{
    const year=String(event.detail.year);if(eras[3].year===year)return;
    eras[3].year=year;if(current===3)render(3,true);
  });
  new MutationObserver(sync).observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});
  const syncLanguage=()=>buttons.forEach((button,i)=>{const el=button.querySelector('.era-current-description');el.textContent=window.YEARON_LANG==='en'?descriptionsEn[i]:descriptions[i]});
  addEventListener('yearon-language-change',syncLanguage);syncLanguage();
  sync();
})();
