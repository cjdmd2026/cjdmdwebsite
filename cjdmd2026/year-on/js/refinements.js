(() => {
  const pairs=[
    ['K-CULTURE, BEYOND CONTENT.','콘텐츠 너머의 한국문화'],
    ['DIFFERENT SCENES. REPEATED ACTIONS.','다른 장면 속 이어지는 행동'],
    ['ONE PLACE','함께 모이는 공간'],['MANY SCREENS','서로 이어지는 화면'],
    ['FROM ME + YOU TO US.','나와 너에서 우리로'],
    ['THE MEDIUM CHANGES. THE MOMENT REMAINS.','매체는 달라져도 함께한 순간은 남습니다.'],
    ['FAMILIAR K-CULTURE. A LONGER CULTURAL VIEW.','익숙한 한국문화, 더 긴 시간으로 바라보기'],
    ['TIME OUTSIDE. CULTURE INSIDE.','시간을 따라 문화 속으로'],
    ['YEAR:ON looks beyond what people consume to how they gather, share, respond and participate. Culture is carried not only by content, but by the ways people experience it together.','YEAR:ON은 사람들이 무엇을 소비하는지에서 나아가, 어떻게 모이고 나누고 반응하고 참여하는지를 살펴봅니다. 문화는 콘텐츠와 함께, 그것을 경험하는 사람들의 관계를 통해 이어집니다.'],
    ['We-ness is the sense of relation formed when individual experiences overlap. It is not a fixed trait or a crowd count—it emerges through shared attention, participation and memory.','우리성은 각자의 경험이 겹치며 만들어지는 관계의 감각입니다. 함께 바라보고 참여하고 기억하는 과정에서 형성됩니다.'],
    ['Genre paintings recorded crowds around a game, a meal, work and performance.','풍속화는 놀이와 식사, 일과 공연을 중심으로 사람들이 모이는 장면을 기록했습니다.'],
    ['Concerts, stadiums, feeds and online communities carry shared reactions beyond one place.','공연장과 경기장, 피드와 온라인 커뮤니티는 함께하는 반응을 공간 너머로 전달합니다.'],
    ['Each medium preserves a different layer of the scene: gesture, text, voice, broadcast, participation and response.','매체마다 몸짓, 글, 목소리, 방송, 참여와 반응처럼 장면의 서로 다른 면을 남깁니다.'],
    ['For global audiences familiar with today’s K-Culture, YEAR:ON opens a longer view—connecting contemporary participation to earlier scenes of Korean everyday and collective life.','오늘의 한국문화에 익숙한 관람객에게 YEAR:ON은 더 긴 시선을 제안합니다. 현재의 참여를 과거 한국인의 일상과 함께하는 장면으로 연결합니다.'],
    ['GATHER','모이기'],['SHARE','나누기'],['WATCH','바라보기'],['CHEER','응원하기'],['MAKE','함께 만들기'],['RESPOND','반응하기'],
    ['ONE PLACE BECOMES A COMMON SCENE.','하나의 공간이 공동의 장면이 됩니다.'],
    ['WHAT MOVES BETWEEN PEOPLE CREATES RELATION.','사람 사이를 오가는 것이 관계를 만듭니다.'],
    ['ATTENTION SYNCHRONIZES DISTANT PEOPLE.','함께 바라보며 멀리 있는 사람도 이어집니다.'],
    ['A PRIVATE REACTION BECOMES A PUBLIC RHYTHM.','개인의 반응이 함께하는 리듬이 됩니다.'],
    ['CULTURE IS REPEATED BY MANY HANDS.','여러 사람의 손을 거치며 문화는 이어집니다.'],
    ['THE AUDIENCE BECOMES PART OF THE RECORD.','관람하는 사람도 기록의 일부가 됩니다.'],
    ['People arrive separately, but shared attention temporarily gives the group one shape.','각자 도착한 사람들은 같은 곳을 바라보는 순간 하나의 모임을 이룹니다.'],
    ['Food, information and memory become cultural when they circulate rather than remain with one person.','음식과 정보, 기억은 사람들 사이를 오가며 문화가 됩니다.'],
    ['A common scene connects spectators even when they do not know one another.','서로 모르는 관람객도 하나의 장면을 통해 이어집니다.'],
    ['Voice, gesture and colour turn individual emotion into a collective signal.','목소리와 몸짓, 색은 각자의 감정을 공동의 신호로 바꿉니다.'],
    ['Participation keeps a form alive while allowing every generation to change it.','참여는 문화를 이어가면서도 세대마다 새로운 모습으로 바꿉니다.'],
    ['Replies, reactions and remixes show that reception is itself a cultural action.','댓글과 반응, 재해석은 받아들이는 일 자체가 문화적 행동임을 보여줍니다.'],
    ['READ K-CULTURE THROUGH THE WAY WE EXPERIENCE IT.','함께 경험하는 방식으로 한국문화를 읽습니다.'],
    ['Choose a category. Follow its cultural meaning, the actions people share, and the records left by changing media.','문화를 선택하고, 그 의미와 함께하는 행동, 시대별 매체에 남은 기록을 따라가세요.'],
    ['A STAGE BECOMES A SHARED SIGNAL.','무대가 함께하는 신호가 됩니다.'],['A TABLE GROWS AS FOOD MOVES.','음식이 오가며 식탁이 넓어집니다.'],['A RESULT BECOMES OUR REACTION.','하나의 결과가 우리의 반응이 됩니다.'],['EVERYDAY ROUTINES BECOME CULTURE.','일상의 반복이 문화가 됩니다.'],
    ['ABOUT THE CULTURE','어떤 문화인가요?'],['TOGETHERNESS FOUND HERE','이 문화 속 우리성'],
    ['THE SAME CULTURE, RECORDED DIFFERENTLY.','같은 문화, 달라지는 기록 방식'],['ONE CATEGORY ACROSS SIX ERAS.','여섯 시대를 잇는 하나의 문화'],
    ['K-POP is a music culture shaped by performance, image, circulation and active fandom. Songs travel through broadcast, screens and networks, continually remade by the people who receive them.','K-POP은 공연과 이미지, 유통, 팬덤의 참여로 형성되는 음악 문화입니다. 노래는 방송과 화면, 네트워크를 지나며 사람들의 참여로 새롭게 이어집니다.'],
    ['Fans learn the same words, coordinate light, wait for releases and turn individual listening into a visible collective response.','팬들은 같은 가사를 익히고 빛을 맞추며 새 노래를 기다립니다. 각자의 감상은 함께 보이는 반응이 됩니다.'],
    ['K-FOOD is not only a collection of dishes. Its culture is also found in preparation, arrangement, serving and the movement of food between people.','K-FOOD의 문화는 음식뿐 아니라 준비와 차림, 대접, 사람들 사이에서 음식이 오가는 방식에도 담겨 있습니다.'],
    ['People cook with many hands, pass side dishes, share one table and express care through portions, timing and attention.','함께 요리하고 반찬을 건네며 한 식탁을 나눕니다. 양과 때를 살피는 작은 행동으로 마음을 표현합니다.'],
    ['K-SPORTS includes the event and the social culture surrounding it: the route to the venue, coordinated cheering, public screens and the stories retold afterward.','스포츠 문화에는 경기장으로 가는 길, 함께하는 응원, 공공 화면과 경기가 끝난 뒤 나누는 이야기까지 포함됩니다.'],
    ['Strangers wear the same colour, wait through the same tension and briefly become one side through rhythm, voice and shared attention.','낯선 사람들은 같은 색을 입고 긴장을 나누며 리듬과 목소리, 시선을 통해 잠시 한편이 됩니다.'],
    ['K-LIFESTYLE gathers ordinary patterns of movement, leisure, work and public life. What appears small becomes meaningful when repeated across a city and across generations.','일상문화는 이동과 여가, 일과 공공생활의 평범한 방식을 담습니다. 작은 행동도 도시와 세대를 거쳐 반복되며 의미를 만듭니다.'],
    ['People share routes, spaces, habits and informal rules—waiting, making room, exchanging information and noticing one another.','사람들은 길과 공간, 습관을 나누며 기다리고 자리를 내어주고 정보를 건네고 서로를 살핍니다.'],
    ['COLLECT THE SCENES ↓','장면 모으기 ↓'],['OPEN THIS MEDIA ERA →','이 시대의 매체 탐색 →'],
    ['THE WAY WE REMEMBER TOGETHER.','함께 기억하는 방식'],['Media changes. Shared moments remain.','기록하는 방식은 달라져도, 함께하는 장면은 이어집니다.'],
    ['WHAT IS IT?','어떤 문화인가요?'],['WOORI IN THIS CULTURE','이 문화 속 우리성']
  ];
  const norm=s=>s.replace(/\s+/g,' ').trim();
  const lookup=new Map();pairs.forEach(p=>{lookup.set(norm(p[0]),p);lookup.set(norm(p[1]),p)});
  let running=false;
  function translate(){
    if(running)return;running=true;observer.disconnect();
    document.querySelectorAll('h1,h2,h3,h4,p,small,strong,button,span,a').forEach(el=>{
      if(el.closest('[translate="no"],.entry,.global-header,.ka-film,.pc-screen-ui,.social-app')||el.querySelector('button,svg,img,input'))return;
      const text=norm(el.innerHTML.replace(/<br\s*\/?\s*>/gi,' ').replace(/<[^>]+>/g,''));
      const pair=lookup.get(text);if(!pair)return;
      el.dataset.en=pair[0];el.dataset.ko=pair[1];
      // These dictionary entries are plain editorial copy; preserve existing element identity.
      const next=window.YEARON_LANG==='ko'?pair[1]:pair[0];if(el.textContent!==next)el.textContent=next;
    });
    observer.observe(document.querySelector('main')||document.body,{childList:true,subtree:true});running=false;
  }
  const observer=new MutationObserver(translate);
  window.addEventListener('yearon-language-change',translate);translate();
  const zones=[...document.querySelectorAll('.floor-zone')];
  if(zones.length){
    const area=document.createElement('div');area.className='floor-detail';area.setAttribute('aria-live','polite');document.querySelector('.v7-floor').append(area);
    const info=[['풍속화 속 모임과 나눔을 관찰합니다.','Observe gathering and sharing in genre painting.'],['신문 속 공동의 관심사와 생활을 읽습니다.','Read shared interests and everyday life in print.'],['같은 목소리를 함께 듣는 경험을 만납니다.','Listen to the voice that connected many homes.'],['채널을 돌려 함께 반응한 장면을 발견합니다.','Turn the dial to discover shared reactions.'],['게시판과 댓글로 함께 만든 기록을 읽습니다.','Explore records made together through posts and replies.'],['현재의 피드와 참여를 탐색합니다.','Explore participation in the present-day feed.']];
    let selected=0;function show(i){selected=i;zones.forEach((z,j)=>z.setAttribute('aria-pressed',String(i===j)));area.replaceChildren();const p=document.createElement('p');p.textContent=info[i][window.YEARON_LANG==='ko'?0:1];const a=document.createElement('a');a.href='media-by-era.html?era='+i;a.textContent=window.YEARON_LANG==='ko'?'이 공간의 매체 체험 →':'EXPLORE THIS MEDIUM →';area.append(p,a)}
    zones.forEach((z,i)=>{z.setAttribute('role','button');z.setAttribute('tabindex','0');z.setAttribute('aria-label',z.textContent.trim());z.addEventListener('click',()=>show(i));z.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(i)}})});window.addEventListener('yearon-language-change',()=>show(selected));show(0);
  }
})();
