/* MEDIA BY ERA: translate fixed and interaction copy without replacing controls. */
(()=>{
  const pairs=[
    ['.time-panel[data-era="1780"] .era-stamp span','PUNGSOKHWA','풍속화'],
    ['.time-panel[data-era="1920"] .era-stamp span','NEWSPAPER','신문'],
    ['.time-panel[data-era="1955"] .era-stamp span','RADIO','라디오'],
    ['.time-panel[data-era="1988"] .era-stamp span','CRT TELEVISION','브라운관 TV'],
    ['.time-panel[data-era="2002"] .era-stamp span','PC / INTERNET','컴퓨터 / 인터넷'],
    ['.time-panel[data-era="2026"] .era-stamp span','SMARTPHONE','스마트폰'],
    ['#paperMedia > span','CLICK / DRAG TO UNFOLD →','클릭하거나 드래그해 펼치기 →'],
    ['.broadcast-meta span:nth-child(2)','ARCHIVE BROADCAST · SEOUL','아카이브 방송 · 서울'],
    ['#clock','ON AIR','방송 중'],
    ['.side-title b','CHANNEL<br>EXPLORER','채널<br>탐색'],
    ['.side-title span','TURN THE DIAL<br>OR USE ← →','다이얼을 돌리거나<br>← → 키를 누르세요'],
    ['#placeholder p','AWAITING SOURCE','신호 대기 중'],
    ['#placeholder > span','VIDEO SLOT · 1280×720','영상 영역 · 1280×720'],
    ['#channelDial span','CLICK / DRAG','클릭 / 드래그'],
    ['.right-tools p','HIDE THE FRAME<br>ENTER THE SIGNAL','프레임을 벗어나<br>화면 속으로'],
    ['.control-help','DIAL · DRAG · WHEEL · ARROW KEYS · 1—5','다이얼 · 드래그 · 휠 · 방향키 · 1—5'],
    ['.pc-icons button[data-pc-page="cyworld"] span','MINIHOMPY','미니홈피'],
    ['.pc-icons button[data-pc-page="news"] span','PORTAL NEWS','포털 뉴스'],
    ['.pc-icons button[data-pc-page="board"] span','FAN CAFE','팬 카페'],
    ['.social-app nav button[data-feed="all"]','ALL','전체'],
    ['.pc-search strong','SEARCH THE K-WEB','한국 웹 검색'],
    ['.pc-search button','SEARCH','검색'],
    ['.pc-portal h2','THE WEB BECAME<br>A PLACE TO GATHER.','웹은 함께 모이는<br>공간이 되었습니다.'],
    ['.pc-portal > p','Minihomepages kept friendships close. Portal news carried a shared street. Fan cafés turned audiences into communities.','미니홈피는 친구들을 가깝게 이어 주고, 포털 뉴스는 거리의 소식을 전했습니다. 팬 카페에서는 관객이 하나의 공동체가 되었습니다.'],
    ['.pc-portal ol li:nth-child(1)','<b>01</b> LEAVE A GUESTBOOK NOTE','<b>01</b> 방명록 남기기'],
    ['.pc-portal ol li:nth-child(2)','<b>02</b> FOLLOW THE NEWS TOGETHER','<b>02</b> 함께 뉴스 읽기'],
    ['.pc-portal ol li:nth-child(3)','<b>03</b> MEET AGAIN IN A FAN CAFÉ','<b>03</b> 팬 카페에서 다시 만나기'],
    ['.pc-hint','OPEN A 2002 WEBSITE ↑','2002년 웹사이트 열기 ↑'],
    ['#pcPage .cy-page main header','MY MINI HOMEPY <span>♡</span>','나의 미니홈피 <span>♡</span>'],
    ['#pcPage .cy-page .cy-photo span','one photograph, many remembered names','사진 한 장에 남은 많은 이름'],
    ['#pcPage .cy-page main > p','A private room on the early Korean web became a shared memory shelf. Friends crossed each other’s pages and left small notes behind.','초기 한국 웹의 개인 공간은 함께하는 기억의 선반이 되었습니다. 친구들은 서로의 페이지를 찾아 작은 기록을 남겼습니다.'],
    ['#pcPage .cy-page main > button','LEAVE A GUESTBOOK NOTE','방명록 남기기'],
    ['#pcPage .news-page nav','HOME　SOCIETY　CULTURE　SPORTS','홈　사회　문화　스포츠'],
    ['#pcPage .news-page h2','THE STREETS<br>BECOME ONE RED WAVE','거리가 하나의<br>붉은 물결이 됩니다'],
    ['#pcPage .news-page > p','Television showed the match. Portal pages carried photographs, messages and reactions from one street to another. A public event became a networked memory.','TV는 경기를 보여 주고, 포털에는 사진과 글, 반응이 거리에서 거리로 퍼졌습니다. 하나의 공공 행사가 인터넷에 남는 기억이 되었습니다.'],
    ['#pcPage .news-page > div','<b>LIVE BOARD</b> “We are meeting at City Hall at seven.”　[428]','<b>실시간 게시판</b> “일곱 시에 시청 앞에서 만나요.”　[428]'],
    ['#pcPage .board-page nav','CAFE HOME　NOTICE　FREE BOARD　PHOTO','카페 홈　공지　자유 게시판　사진'],
    ['#pcPage .board-page h3','FREE BOARD / 함께 만드는 기록','자유 게시판 / 함께 만드는 기록'],
    ['#pcPage .board-page footer','Online fan communities turned watching into sharing, collecting and making together.','온라인 팬 커뮤니티에서 보는 경험은 함께 나누고 모으고 만드는 경험으로 이어졌습니다.'],
    ['.pc-screen-ui > footer button','START','시작'],
    ['.pc-screen-ui > footer time','10:02 PM','오후 10:02'],
    ['.social-app .post-pop strong','ONE SONG,<br>12,800 VOICES.','하나의 노래,<br>12,800개의 목소리.'],
    ['.social-app .post-pop p','THE MOMENT THE LIGHTSTICKS MOVED AS ONE.','응원봉이 하나처럼 움직이던 순간.'],
    ['.social-app .post-food strong','PASS THE<br>SIDE DISH.','반찬을<br>건네다.'],
    ['.social-app .post-food p','A TABLE BECOMES SHARED THE MOMENT FOOD STARTS MOVING.','음식을 건네는 순간, 식탁은 모두의 자리가 됩니다.'],
    ['.social-app .post-sports strong','THE SCORE<br>WE SHARED.','함께 나눈<br>승부.'],
    ['.social-app .post-sports p','NINETY MINUTES, ONE REACTION.','90분 동안 함께한 하나의 반응.'],
    ['#commentForm button','POST','게시'],
    ['#commentToast','COMMENT ADDED TO THE ARCHIVE','댓글이 아카이브에 추가되었습니다.'],
    ['.era-now b','CONTINUE','CONTINUE'],
    ['#closeExpanded','REDUCE SCREEN ×','화면 축소 ×'],
  ];
  const mediaLabels=[['PUNGSOKHWA','풍속화'],['NEWSPAPER','신문'],['RADIO','라디오'],['CRT TELEVISION','브라운관 TV'],['PC / INTERNET','컴퓨터 / 인터넷'],['SMARTPHONE','스마트폰']];
  const dynamic=new Map([
    ['This is Seoul Central Broadcasting. Today, we bring you stories from the city’s markets and streets.','서울 중앙방송국입니다. 오늘은 서울의 시장과 거리에서 전해온 이야기를 들려드립니다.'],
    ['Listeners across the country, our public music broadcast now begins. Please welcome them with applause.','전국의 청취자 여러분, 공개 음악 방송을 시작합니다. 큰 박수로 맞아 주세요.'],
    ['The match is over. Cheers from streets and cafés are spreading throughout Seoul.','경기가 끝났습니다. 거리와 다방의 함성이 서울 곳곳으로 퍼집니다.'],
    ['COMMUNITY REPLIES','커뮤니티 댓글'],['2 MESSAGES','댓글 2개'],['Write a reply...','댓글을 남겨 주세요...'],['Write a 2002 web reply','2002년 웹 댓글 작성'],
    ['LEAVE A GUESTBOOK NOTE','방명록 남기기'],['등록','POST'],
    ['THE STREETS BECOME ONE RED WAVE','거리가 하나의 붉은 물결이 됩니다'],
    ['A private room on the early Korean web became a shared memory shelf. Friends crossed each other’s pages and left small notes behind.','초기 한국 웹의 개인 공간은 함께하는 기억의 선반이 되었습니다. 친구들은 서로의 페이지를 찾아 작은 기록을 남겼습니다.'],
    ['Online fan communities turned watching into sharing, collecting and making together.','온라인 팬 커뮤니티에서 보는 경험은 함께 나누고 모으고 만드는 경험으로 이어졌습니다.']
  ]);
  const reverse=new Map([...dynamic].map(([en,ko])=>[ko,en]));
  function paint(){
    const lang=window.YEARON_LANG==='en'?'en':'ko';
    document.body.dataset.mediaLang=lang;
    for(const [selector,en,ko] of pairs){
      const el=document.querySelector(selector);if(el)el.innerHTML=selector.includes('.era-stamp span')?en:(lang==='en'?en:ko);
    }
    document.querySelectorAll('.era-bridge #timeNav button').forEach((button,i)=>{
      const label=mediaLabels[i];
      const el=button.querySelector(':scope > span:not(.era-current-heading)');
      if(label&&el)el.textContent=label[0];
    });
    const scroll=document.querySelector('#scrollTrigger');if(scroll)scroll.textContent=lang==='en'?(document.querySelector('#scrollMedia')?.classList.contains('fully-open')?'← DRAG TO ROLL':'DRAG TO UNROLL →'):(document.querySelector('#scrollMedia')?.classList.contains('fully-open')?'← 드래그해 말기':'드래그해 펼치기 →');
    const paper=document.querySelector('#paperMedia > span');if(paper)paper.textContent=lang==='en'?'CLICK / DRAG TO UNFOLD →':'클릭하거나 드래그해 펼치기 →';
    const input=document.querySelector('#commentInput');if(input)input.placeholder=lang==='en'?'ADD A COMMENT…':'댓글을 남겨 주세요…';
    const pcInput=document.querySelector('#pcCommentForm input');if(pcInput){pcInput.placeholder=lang==='en'?'Write a reply...':'댓글을 남겨 주세요...';pcInput.setAttribute('aria-label',lang==='en'?'Write a 2002 web reply':'2002년 웹 댓글 작성')}
    document.querySelectorAll('#pcPage h2,#pcPage p,#pcPage footer,#pcPage button,#pcPage header b').forEach(el=>{
      if(el.children.length)return;
      const txt=el.textContent.trim();const next=lang==='en'?reverse.get(txt):dynamic.get(txt);if(next)el.textContent=next;
    });
    document.querySelectorAll('#pcCommentForm button').forEach(el=>el.textContent=lang==='en'?'POST':'등록');
  }
  window.addEventListener('yearon-language-change',paint);
  const pcPage=document.querySelector('#pcPage');
  if(pcPage)new MutationObserver(()=>{if(pcPage.children.length)paint()}).observe(pcPage,{childList:true});
  paint();
})();
