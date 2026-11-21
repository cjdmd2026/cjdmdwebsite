/* A single scroll-controlled process: individuals → connections → we-ness. */
(()=>{
 const root=document.querySelector('#ypInfographic.wn-three-step');if(!root)return;
 const svg=root.querySelector('.wn-svg'),people=root.querySelector('.wn-individuals'),links=root.querySelector('.wn-connections'),result=root.querySelector('.wn-result'),name=root.querySelector('.wn-result-name'),label=root.querySelector('.wn-process-label'),ko=root.querySelector('.wn-process-ko'),translation=root.querySelector('.wn-process-en'),cue=root.querySelector('.wn-process-cue');
 const ns='http://www.w3.org/2000/svg',clamp=n=>Math.max(0,Math.min(1,n)),smooth=n=>{n=clamp(n);return n*n*(3-2*n)},range=(p,a,b)=>smooth((p-a)/(b-a)),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const steps=[['INDIVIDUAL','우리는 저마다 다른 일상을 살아간다.','We each live a different everyday life.'],['CONNECTION','서로 만나고, 반응하며 관계를 맺는다.','We meet, respond to one another and form relationships.'],['WE','관계와 경험을 공유하며 ‘우리’라는 감각을 형성한다.','Sharing relationships and experiences forms a sense of “us”.']];
 const centres=[[-195,0],[-96,-110],[105,-115],[195,0],[95,115],[-105,110]],nodes=[],edges=[];let progress=0,lastValue=0,stage=-1;
 const create=(tag,attrs)=>{const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));return el};
 const glassDefs=create('defs',{});
 glassDefs.innerHTML='<radialGradient id="wnIndividualBody" cx="31%" cy="22%" r="88%"><stop offset="0" stop-color="#e5eaf2" stop-opacity=".14"/><stop offset=".38" stop-color="#9aa4b6" stop-opacity=".07"/><stop offset=".68" stop-color="#4b5569" stop-opacity=".05"/><stop offset="1" stop-color="#bdc8d8" stop-opacity=".12"/></radialGradient><linearGradient id="wnIndividualRim" x1="18%" y1="0%" x2="83%" y2="100%"><stop stop-color="#f1f5fa" stop-opacity=".45"/><stop offset=".45" stop-color="#b9c5d6" stop-opacity=".28"/><stop offset="1" stop-color="#f2f7ff" stop-opacity=".38"/></linearGradient>';
 svg.prepend(glassDefs);result.setAttribute('fill','url(#wnIndividualBody)');result.setAttribute('stroke','url(#wnIndividualRim)');
 centres.forEach(([x,y])=>{const group=create('g',{}),circle=create('circle',{r:34,class:'wn-person-glass',fill:'url(#wnIndividualBody)',stroke:'url(#wnIndividualRim)','stroke-width':1.1}),text=create('text',{y:5,'text-anchor':'middle',fill:'#39454e'});text.classList.add('wn-person-word');group.append(circle,text);people.append(group);nodes.push({group,text,x,y})});
 [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4],[0,3],[2,5]].forEach(([a,b],i)=>{const path=create('path',{d:`M${500+centres[a][0]} ${270+centres[a][1]}L${500+centres[b][0]} ${270+centres[b][1]}`,pathLength:1,'stroke-dasharray':1,'stroke-dashoffset':1});links.append(path);edges.push({path,a,b,i})});
 svg.querySelector('title')?.remove();svg.setAttribute('aria-label','개인에서 우리성으로 이어지는 관계');svg.removeAttribute('aria-labelledby');
 const en=()=>window.YEARON_LANG==='en'||document.documentElement.lang==='en';
 function copy(index){stage=index;label.textContent=`STEP 0${index+1} · ${steps[index][0]}`;ko.textContent=steps[index][en()?2:1];translation.textContent=steps[index][2];translation.hidden=en();name.textContent=en()?'WE':'우리';nodes.forEach(n=>n.text.textContent=en()?'Individual':'개인')}
 function render(value){const input=clamp(value),overall=input<=.32?input/.32*.40:input<=.58?.40+(input-.32)/.26*.09:.49+(input-.58)/.42*.51;lastValue=input;window.YEARONWenessAppearance?.(input);progress=clamp(overall/.42);root.classList.remove('is-static');const collapse=range(progress,.30,.73),index=progress<.22?0:progress<.65?1:2,exit=1;if(index!==stage)copy(index);
  const gathering=range(progress,.04,.17);nodes.forEach((n,i)=>{const x=(i-2.5)*85+(n.x-(i-2.5)*85)*gathering,y=n.y*gathering;n.px=500+x*(1-collapse);n.py=270+y*(1-collapse);n.group.setAttribute('transform',`translate(${n.px} ${n.py})`);n.group.style.opacity=String(1-range(progress,.68,.74))});
  edges.forEach(({path,a,b,i})=>{
   const ax=nodes[a].px,ay=nodes[a].py,bx=nodes[b].px,by=nodes[b].py;
   const dx=bx-ax,dy=by-ay,distance=Math.hypot(dx,dy),inset=33;
   // Stop just outside both glass rims; hide the segment as the nodes overlap.
   if(distance<=inset*2){path.setAttribute('d','M0 0');path.style.opacity='0';}
   else{const ux=dx/distance,uy=dy/distance,startX=ax+ux*inset,startY=ay+uy*inset,endX=bx-ux*inset,endY=by-uy*inset;const draw=range(progress,.20+i*.012,.36+i*.012);path.setAttribute('d',`M${startX} ${startY}L${startX+(endX-startX)*draw} ${startY+(endY-startY)*draw}`);path.style.opacity=draw>0?'1':'0';path.dataset.drawProgress=draw.toFixed(3);}
   path.removeAttribute('pathLength');path.removeAttribute('stroke-dasharray');path.removeAttribute('stroke-dashoffset');path.style.strokeDasharray='none';path.style.strokeDashoffset='0';
  });
  people.style.opacity=String(exit);links.style.opacity=String((1-range(progress,.68,.75))*exit);result.style.opacity=String(range(progress,.70,.76)*exit);result.setAttribute('r',String(104*range(progress,.67,.75)));const morph=range(overall,.495,.555),reveal=range(overall,.55,.62),handoff=range(overall,.70,.77);
  name.style.opacity=String(range(progress,.74,.78)*(1-morph)*(1-handoff));
  root.querySelector('.wn-definition-name').textContent='OURNESS';
  root.querySelector('.wn-definition-name').style.opacity=String(morph*(1-handoff));
  root.querySelector('.wn-definition-korean').style.opacity=String(range(overall,.505,.565)*(1-handoff));
  const rise=reduced.matches?0:6*(1-morph);
  root.querySelector('.wn-definition-name').style.transform=`translateY(${rise}px)`;
  root.querySelector('.wn-definition-korean').style.transform=`translateY(${rise}px)`;
  svg.style.transform='none';root.classList.toggle('is-map-reading',overall>=.70);svg.setAttribute('viewBox','200 -30 600 600');
  result.style.opacity=String(range(progress,.70,.76)*(1-handoff));
  window.YEARONRelationMap?.(clamp((overall-.77)/.19),handoff);
  root.querySelector('.wn-definition-copy').style.opacity=String(reveal*(1-range(overall,.67,.72)));
  root.querySelector('.wn-definition-copy').style.setProperty('--key-emphasis',String(range(overall,.55,.625)));
  root.querySelector('.wn-definition-copy').style.setProperty('--detail-emphasis',String(range(overall,.575,.65)));
  root.querySelector('.wn-definition-copy').style.transform=`translate(-50%,${(1-reveal)*15}px)`;
  const uri=root.querySelector('.wn-uri-copy');uri.style.opacity='0';uri.setAttribute('aria-hidden','true');
  const showingUri=overall>=.40&&overall<.555;
  // Keep “우리” in place and append only the changing example inside its circle.
  if(!name.querySelector('.wn-uri-prefix')){name.textContent='';const prefix=create('tspan',{class:'wn-uri-prefix'}),suffix=create('tspan',{class:'wn-uri-suffix'});name.append(prefix,suffix)}
  name.querySelector('.wn-type-caret')?.remove();
  const prefix=name.querySelector('.wn-uri-prefix'),suffix=name.querySelector('.wn-uri-suffix');prefix.textContent=en()?'WE':'우리';suffix.textContent='';suffix.style.opacity='0';
  if(showingUri){
   const local=clamp((overall-.40)/.09),segment=Math.min(2,Math.floor(local*3)),phase=Math.min(1,local*3-segment);
   const word=en()?[' home',' neighborhood',' school'][segment]:[' 집',' 동네',' 학교'][segment];
   prefix.textContent=en()?'Our':'우리';suffix.textContent=word;
   name.style.opacity=String(segment===2?range(phase,0,.18)*(1-morph):range(phase,0,.18)*(1-range(phase,.78,1)));
   name.style.transform=`translateY(${reduced.matches?0:-5*morph}px)`;
   suffix.style.opacity='1';name.style.fontSize=en()?'20px':'24px';
  }
  else{name.style.removeProperty('font-size');name.style.transform='none';}
  const copyOpacity=index===0?1-range(progress,.17,.22):index===1?range(progress,.22,.27)*(1-range(progress,.60,.65)):range(progress,.65,.71);
  if(showingUri){ko.textContent=en()?uri.querySelector('p').dataset.en:uri.querySelector('p').dataset.ko;translation.textContent=uri.querySelector('p').dataset.en;translation.hidden=en();ko.parentElement.style.opacity=String(range(overall,.40,.412)*(1-range(overall,.495,.55)));}
  else{ko.textContent=steps[index][en()?2:1];translation.textContent=steps[index][2];translation.hidden=en();ko.parentElement.style.opacity=String(copyOpacity*(1-range(overall,.39,.40)));}
  label.style.opacity='1';label.textContent=`STEP 0${index+1} · ${steps[index][0]}`;if(overall>.49)label.textContent=overall<.72?'WHAT IS WE-NESS?':overall<.79?'':'WE-NESS / IN RELATION';else if(overall>.40)label.textContent='OUR SENSE OF US';if(overall>=.70)label.textContent=root.querySelector('#wnRelationMap').dataset.chapter||'OURNESS';cue.style.opacity=String(.55*exit);
 }
 function localize(){stage=-1;copy(progress<.22?0:progress<.65?1:2);render(lastValue)}
 addEventListener('yearon-language-change',localize);reduced.addEventListener('change',()=>render(lastValue));
 // This function is driven by about-six.js; it never changes the document scroll position.
 window.YEARONWeness=render;render(0);
})();
