/* Fictional 2005 Korean web, local-only exhibition interactions. */
(()=>{'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const en=()=>window.YEARON_LANG==='en',t=(k,e)=>en()?e:k;
let saved={};try{saved=JSON.parse(localStorage.getItem('yearon-pc2005')||'{}')}catch{}
const data={comments:saved.comments||{},guest:saved.guest||[],written:saved.written||[],chats:saved.chats||{}};
function save(){try{localStorage.setItem('yearon-pc2005',JSON.stringify(data))}catch{}}
const entries=[
 ['welcome','공지','처음 오신 분은 인사 남겨 주세요','모임지기','10.15','처음 오신 분도 부담 없이 글을 남겨 주세요. 음악, 공부, 운동, 사진처럼 좋아하는 이야기를 함께 나눕니다.\n모임 시간과 장소는 공지에서 확인해 주세요. 서로의 연락처는 동의 없이 올리지 않기로 해요.',['새로 가입했습니다. 잘 부탁드려요!','반갑습니다. 편하게 둘러보세요.']],
 ['concert','모임','토요일 대학로 공연 같이 보실 분','푸른소리','10.14','이번 토요일 오후 세 시에 대학로에서 작은 공연을 보려고 합니다. 두 시 반에 혜화역 2번 출구 앞에서 만나요.\n처음 오시는 분도 환영합니다. 공연이 끝나면 근처에서 따뜻한 차 한 잔 해요. 참가하실 분은 댓글 남겨 주세요.',['저도 같이 가고 싶어요.','역 앞에서 기다릴게요. 파란 가방을 들고 갑니다.']],
 ['study','자료','스터디에서 정리한 영어 표현 파일','연필한자루','10.14','이번 주 스터디에서 헷갈렸던 표현을 한 장으로 정리했습니다. 예문은 각자 하나씩 보탰어요.\n틀린 곳을 발견하면 알려 주세요. 다음 모임 전까지 고쳐 놓겠습니다.',['시간 내서 정리해 줘서 고마워요.','저는 예문 두 개 더 찾아볼게요.']],
 ['football','스포츠','일요일 축구, 한 자리 비었습니다','운동화','10.13','일요일 오전 아홉 시 동네 학교 운동장에서 만납니다. 인원이 한 명 부족해서 함께 뛸 분을 찾습니다.\n잘하지 못해도 괜찮아요. 운동화와 마실 물만 챙겨 오세요. 경기 뒤에는 같이 운동장 정리하고 헤어집니다.',['처음 가도 괜찮을까요?','네! 운동화만 챙겨 오세요.']],
 ['walk','사진','지난주 산책길을 그림으로 남겼어요','산들바람','10.12','디지털카메라 배터리가 다 돼서 친구와 본 풍경을 집에서 그려 봤습니다.\n다음에는 서로 카메라를 바꿔 들고 찍어 보기로 했어요. 같은 길을 걸어도 눈에 들어오는 게 다르더라고요.',['그림 보니 그날 바람이 생각나네요.','다음 산책에도 함께 가요.']],
 ['pharmacy','생활','야간 약국 위치 정리해 봤어요','바람개비','10.12','늦은 시간에 약국을 찾기 어려워서 동네 게시판의 안내를 정리했습니다.\n실제 이용 전에는 전화로 운영 시간을 확인하세요. 바뀐 안내가 있으면 댓글로 함께 고쳐 주세요. 이 글은 전시용 가상 생활 정보입니다.',['직접 확인하는 게 중요하겠네요.','우리 동네 안내도 찾아보겠습니다.']],
 ['music','취미','처음 간 음악감상회가 반가웠던 이유','하늘나무','10.11','좋아하는 CD 한 장씩 가져와 번갈아 들었습니다. 처음에는 말이 없었는데, 같은 곡을 좋아한다는 걸 알고 나니 이야기가 길어졌어요.\n다음에는 각자 좋아하는 가사를 한 줄씩 적어 오기로 했습니다.',['제가 가져간 음반도 좋아해 주셔서 기뻤어요.','다음엔 친구 한 명 더 데려가도 될까요?']],
 ['books','생활','남는 책 교환하실 분 계세요?','책갈피','10.10','다 읽은 소설 세 권을 다른 책과 바꾸고 싶습니다. 책에 적힌 짧은 메모는 지우지 않았어요.\n책장에 꽂아 두기보다 다른 사람이 읽으면 좋겠습니다. 토요일 도서관 앞에서 만날 수 있어요.',['저는 여행 책이 있는데 괜찮을까요?','네, 서로 안 읽어 본 책이면 좋겠어요.']]
].map(([id,cat,title,author,date,body,comments])=>({id,cat,title,author,date,body,comments}));
const news=[
 ['library','지역','동네 도서관, 토요일 책 교환 장터 안내','동네 도서관 마당에서 읽은 책을 서로 바꾸는 작은 장터가 열립니다. 책 속에 짧은 추천 메모를 끼워 다른 독자에게 전할 수 있습니다.\n운영을 돕는 주민들은 책을 분류하고 자리를 안내합니다. 가져온 책이 없어도 자유롭게 둘러볼 수 있습니다.'],
 ['theatre','문화','공연 뒤에도 이어진 관객들의 이야기','주말 대학로의 작은 공연장에서는 공연이 끝난 뒤 관객들이 감상을 나누었습니다. 같은 장면을 보고도 서로 다르게 기억하는 이야기가 오갔습니다.\n온라인 카페에는 함께 공연을 보자는 글과 후기가 올라왔습니다.'],
 ['camera','생활','디지털카메라 사진, 함께 정리해 보세요','사진을 날짜별 폴더에 모으고 파일 이름에 장소를 적으면 나중에 찾기 쉽습니다. 친구가 찍은 사진을 받았다면 촬영한 사람의 이름도 남겨 두세요.\n카페 사진첩에 올릴 때에는 사진 속 사람에게 먼저 물어보는 것이 좋습니다.'],
 ['sports','스포츠','주말 운동 모임, 초보 회원도 함께','공을 차는 실력보다 시간을 지키고 서로 배려하는 약속을 먼저 나누는 동네 모임입니다. 새로 온 회원에게는 준비 운동과 경기 규칙을 설명합니다.\n경기가 끝나면 양 팀이 함께 도구를 정리합니다.'],
 ['economy','생활경제','장보기 메모를 나누는 이웃들','각자 적어 둔 장보기 요령을 게시판에서 나눕니다. 오래 보관할 수 있는 재료와 남은 음식을 활용하는 방법처럼 작은 경험이 모였습니다.\n가격이나 영업 정보는 달라질 수 있어 직접 확인하고 새로운 정보를 보태기로 했습니다.']
].map(([id,cat,title,body])=>({id,cat,title,body}));
const records = [
 ['news/worldcup','2002 월드컵 거리 응원','2002 World Cup street cheering','붉은악마 대한민국 축구 응원 world cup football sports red devils'],
 ['fan','이영호 팬카페','Lee Young-ho Fan Club','이영호 이어온가요 1992 공연 음악 노래 lee young ho fan music'],
 ['fan/stage','1992년 이어온가요 무대 영상','1992 IEOON GAYO performance','이영호 이어온가요 1992 음악방송 영상 tv'],
 ['fan/meet','이영호 팬 모임 안내','Lee Young-ho fan meetup','이영호 팬클럽 모임 공연 concert'],
 ['fan/review','공연이 끝난 뒤에 남긴 후기','After the concert','이영호 공연 후기 팬 댓글'],
 ['mini/home','미니홈피','Mini-homepage','싸이월드 미니홈피 cyworld profile'],
 ['mini/album','미니홈피 사진첩','Mini-homepage photo album','사진첩 디지털카메라 gallery photos album'],
 ['mini/friends','미니홈피 일촌','Mini-homepage friends','일촌 친구 이웃 friends'],
 ['mini/guest','미니홈피 방명록','Mini-homepage guestbook','안부 방명록 guestbook'],
 ['mini/diary','미니홈피 다이어리','Mini-homepage diary','일기 다이어리 blog diary'],
 ['cafe/all','생활·취미 커뮤니티','Daily life and hobbies board','카페 게시판 생활 취미 모임 community cafe café'],
 ['messenger','이어온 메신저','YEAR:ON Messenger','채팅 대화 메신저 messenger chat'],
 ['portal/mail','받은 편지함','Inbox','메일 편지 mail inbox'],
 ['portal/knowledge','지식검색','Questions and answers','질문 답변 지식검색 help questions']
];
const worldCupImage = 'assets/images/archive-v2/worldcup-cityhall-2002.jpg';
const featuredRoutes = ['fan','fan/stage','mini/home'];
const suggestions = [
 ['2002 월드컵','2002 World Cup'], ['붉은악마','Red Devils'],
 ['이영호','Lee Young-ho'], ['이어온가요','IEOON GAYO'],
 ['사진첩','Photo album'], ['일촌','Friends']
];
const searchLinks = () => suggestions.map(([ko,eng])=>link('search/'+t(ko,eng),t(ko,eng))).join('');
const searchKey = value => String(value).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'');
const fanPosts = {
 stage: ['1992년 이어온가요 무대 영상','1992 IEOON GAYO performance','집에 남아 있던 방송을 다시 봤어요. 첫 소절이 나오자 그때 같이 보던 언니가 생각나서 카페에 올립니다.','I watched the broadcast again at home. The first line reminded me of my sister, who watched it with me, so I shared it here.','저도 가족이랑 봤던 무대예요. 올려 주셔서 고맙습니다.','I watched it with my family too. Thanks for sharing.'],
 meet: ['이영호 팬 모임 안내','Lee Young-ho fan meetup','토요일 오후 두 시에 대학로에서 만나요. 각자 기억에 남는 무대 이야기를 하나씩 가져오면 좋겠어요.','Let’s meet in Daehangno at two on Saturday. Bring a memory of a favourite performance to share.','처음 가는데 저도 같이 앉아도 될까요?','It’s my first time. Can I sit with you?'],
 review: ['공연이 끝난 뒤에 남긴 후기','After the concert','옆자리에 앉은 분이 후렴을 따라 부르길래 저도 따라 불렀어요. 집에 오니 게시판에 그분이 남긴 후기가 있더라고요.','The person next to me sang the chorus, so I joined in. Later that evening I found their account on the board.','저도 그날 같은 줄에 앉아 있었어요!','I was sitting in that row too!']
};
function fanCafe(id) {
 const post = fanPosts[id];
 const menu = Object.entries(fanPosts).map(([key, item])=>link('fan/'+key,t(item[0],item[1]))).join('');
 const boardMeta = {stage:['18','06.14','밤편지','316'],meet:['17','06.12','모임지기','148'],review:['16','06.09','푸른소리','207']};
 const board = `<h2>${t('팬카페 게시판','Fan club board')}</h2><p>${t('방송 자료를 모으고, 공연 후기를 나누는 이영호 팬들의 공간입니다.','A place for Lee Young-ho fans to share recordings and concert memories.')}</p><table><thead><tr>${[t('번호','No.'),t('제목','Subject'),t('작성자','Author'),t('날짜','Date'),t('조회','Views')].map(v=>`<th scope="col">${v}</th>`).join('')}</tr></thead><tbody>${Object.entries(fanPosts).map(([key,item])=>{const [number,date,author,views]=boardMeta[key];return `<tr><td>${number}</td><td>${link('fan/'+key,t(item[0],item[1]))} <small>[1]</small></td><td>${author}</td><td>${date}</td><td>${views}</td></tr>`}).join('')}</tbody></table>`;
 const detail = post ? `<article class="p05-post"><small>2003.${boardMeta[id][1]} · ${boardMeta[id][2]} · ${t('전시용 재현 게시글','Fictional exhibition post')}</small><h2>${t(post[0],post[1])}</h2><p>${t(post[2],post[3])}</p>${id==='stage'?'<video controls playsinline preload="none" src="assets/videos/crt/kpop-broadcast-v2.mp4"></video>':''}<h3>${t('댓글','Comment')}</h3><p>${t(post[4],post[5])}</p>${link('fan',t('목록으로','Back to posts'))}</article>` : board;
 return `<div class="p05-cafe-banner p05-fan-banner"><b>${t('이영호 팬카페','Lee Young-ho Fan Club')}</b><span>LEE YOUNG-HO FAN CLUB · 2003</span></div><div class="p05-cafe"><aside><h3>${t('카페 메뉴','Café menu')}</h3>${menu}</aside><section>${detail}</section></div>`;
}
function worldCup() {
 const image = worldCupImage;
 return `<article class="p05-post"><small>${t('이어온 뉴스 · 전시용 기사','YEAR:ON News · Exhibition article')}</small><h2>${t('2002 월드컵, 거리에서 함께 외친 응원','2002 World Cup: cheering together in the streets')}</h2><figure><a href="${image}" data-photo aria-label="${t('거리 응원 사진 확대','Enlarge the street cheering photo')}"><img class="p05-record-image" src="${image}" alt="${t('2002년 월드컵 거리 응원','Street supporters at the 2002 World Cup')}"></a><figcaption>${t('2002 월드컵 거리 응원 · K-ARCHIVE','2002 World Cup street cheering · K-ARCHIVE')} · <a href="https://commons.wikimedia.org/wiki/File:2002_FIFA_한일월드컵-시청_거리응원_(1).jpg" target="_blank" rel="noopener">${t('국립민속박물관 민속아카이브 · 공공누리 제1유형','National Folk Museum of Korea · KOGL Type 1')}</a></figcaption></figure><p>${t('2002년 한일 월드컵 당시, 사람들은 광장과 거리에 모여 대형 화면으로 경기를 지켜봤다. 처음 만난 사람들도 같은 구호를 외쳤고, 경기 뒤에는 온라인 게시판에서 응원 장소와 사진, 후기를 나눴다.','During the 2002 Korea–Japan World Cup, people gathered around large screens in streets and squares. Strangers joined the same chants, and afterward people shared meeting points, photographs and memories on message boards.')}</p><p>${t('다음이 2003년에 발표한 자료에 따르면 월드컵 기간에 대표팀과 경기 등을 주제로 한 카페가 2,500개 넘게 만들어졌다. 거리에서 시작된 응원은 경기 소식과 감상을 나누는 온라인 모임으로 이어졌다.','According to Daum’s 2003 report, more than 2,500 cafés about the teams, matches and other World Cup topics opened during the tournament. The cheering continued online as people shared match news and reactions.')}</p><p><a href="https://www.kakaocorp.com/page/detail/5547" target="_blank" rel="noopener">${t('자료 · 다음카페 4주년 보도자료','Source · Daum Café fourth anniversary press release')}</a></p>${link('cafe/스포츠',t('관련 카페 글 보기','Browse related café posts'))}</article>`;
}
function searchResults(query) {
 const words = query.trim().split(/\s+/).map(searchKey).filter(Boolean);
 const indexed = [
  ...records,
  ...news.map(p=>['news/'+p.id,p.title,p.title,p.cat+' '+p.body,p.body]),
  ...[...data.written,...entries].map(p=>['cafe/post/'+p.id,p.title,p.title,p.cat+' '+p.body+' '+p.author,p.body])
 ];
 const results = words.length ? indexed.filter(([,ko,eng,tags])=>{
  const index = searchKey([ko,eng,tags].join(' '));
  return words.every(word=>index.includes(word));
 }) : [];
 return `<div class="p05-results"><h2>${t('통합검색','Integrated search')} · ${esc(query)}</h2><p>${results.length} ${t('건','results')}</p>${results.map(([route,ko,eng,,body])=>{
  const group = {news:t('뉴스','News'),fan:t('팬카페','Fan club'),mini:t('미니홈피','Mini-homepage'),cafe:t('게시판','Message board')}[route.split('/')[0]] || t('서비스','Services');
  return `<article><small>${group}</small> ${link(route,t(ko,eng))}${body&&!en()?`<p>${esc(body.split('\n')[0])}</p>`:''}</article>`;
 }).join('')||`<p>${t('검색 결과가 없습니다. 아래 검색어로 다시 찾아보세요.','No results. Try one of these terms.')}</p><div class="p05-search-links">${searchLinks()}</div>`}</div>`;
}
const friends=[['푸른소리','온라인','토요일 공연 같이 가요','concert'],['연필한자루','온라인','자료 정리 끝!','study'],['운동화','온라인','일요일 아홉 시','football'],['하늘나무','자리비움','잠깐 바람 쐬러','music'],['바람개비','오프라인','다녀간 흔적을 남겨요','pharmacy']];
const link=(route,text)=>`<button type="button" data-route="${esc(route)}">${esc(text)}</button>`;
const footer=()=>`<footer class="p05-footer">${t('2005년 온라인 문화를 바탕으로 구성한 전시용 가상 사이트 · 입력은 이 브라우저에 저장됩니다.','An exhibition reconstruction of 2005 online culture. Fictional people and posts; entries are stored in this browser.')}</footer>`;
function mini(tab='home',person='하늘나무'){
 const tabs=[['home','홈'],['album','사진첩'],['diary','다이어리'],['guest','방명록'],['friends','일촌']];
 let body='';
 const bio={하늘나무:'좋아하는 것들을 천천히 모으는 중.',푸른소리:'공연이 끝난 뒤에도 노래는 계속.',연필한자루:'오늘 배운 것은 내일 함께 나누기.',운동화:'주말에는 운동장에서 만나요.',바람개비:'동네의 작은 소식을 모읍니다.'}[person]||'다녀간 안부를 기다립니다.';
 if(tab==='home')body=`<h3>오늘의 작은 방</h3><div class="p05-mini-update"><small>2005.10.15</small><p>청계천 사진을 사진첩에 올렸어요.</p>${link('mini/album','사진첩 열기 →')}</div><p>오늘의 한 줄 : ${esc(bio)}</p><h3>최근 기록</h3>${link('mini/diary','10.14 공연이 끝난 뒤')}${link('mini/guest','방명록에 안부 남기기')}`;
 if(tab==='album')body=`<h3>2005년의 서울 · 자료 사진</h3>${[['stream-2005.jpg','청계천을 걷는 사람들','2005.10.09','Nesnad','Cheonggyecheon_shortly_after_reopening_-_oct_9_-_2005.jpg'],['palace-2005.jpg','경복궁에서 바라본 풍경','2005.02','Mammique','Korea-Building_in_Gyeongbokgung_palace_Seoul-2005.jpg']].map(([file,title,date,author,source])=>`<figure><img class="p05-album-photo" src="assets/images/pc-2005/${file}" alt="${title}"><figcaption><b>${title}</b> · ${date}<p>${file==='stream-2005.jpg'?'같은 길을 거닐며 시간을 보내는 사람들의 모습.':'도시 안에서 함께 찾아갈 수 있는 장소의 기록.'}</p><small>실제 자료 사진 · ${author} · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a> · <a href="https://commons.wikimedia.org/wiki/File:${source}" target="_blank" rel="noopener">출처</a></small></figcaption></figure>`).join('')}`;
 if(tab==='diary')body=['공연이 끝난 뒤','조별 과제를 마치고','친구가 알려 준 산책길'].map((v,i)=>`<article><h3>2005.10.${14-i} · ${v}</h3><p>${['공연장에서 처음 만난 사람이 카페에서 보던 닉네임의 주인공이었다. 집에 돌아와 미니홈피 주소를 주고받았다. 다음 공연에는 같이 가기로 했다.','각자 조사한 자료를 모으니 처음에는 보이지 않던 답이 나왔다. 늦게까지 남은 친구와 김밥을 나눠 먹었다.','사진만 보고 찾아간 길이었다. 친구가 적어 준 설명 덕분에 헤매지 않았다. 다음에는 내가 좋아하는 길을 소개해 주고 싶다.'][i]}</p></article>`).join('');
 if(tab==='guest')body=`<h3>다녀간 흔적</h3><form data-form="guest" data-owner="${esc(person)}"><label>이름 <input name="name" maxlength="20" value="나그네" required></label><textarea name="body" required maxlength="300" aria-label="방명록 내용" placeholder="안부를 남겨 주세요"></textarea><button>글 남기기</button></form>${[...data.guest.filter(p=>!p.owner||p.owner===person),{name:person==='푸른소리'?'하늘나무':'푸른소리',body:'공연장에서 반가웠어요. 다음에 또 같이 가요!'},{name:'연필한자루',body:'사진 잘 보고 갑니다. 다음엔 같이 걸어요.'}].map(p=>`<article><b>${esc(p.name)}</b><p>${esc(p.body)}</p></article>`).join('')}`;
 if(tab==='friends')body=friends.map(([n,status,msg])=>`<article><b>${n}</b> · ${status}<p>${msg}</p>${link('mini/home/'+n,'미니홈피 방문')}</article>`).join('');
 return `<div class="p05-mini"><aside><small>TODAY <b>12</b> / TOTAL 320</small><div class="p05-profile"><span>YEAR:ON<br>MINI HOME</span></div><h3>${esc(person)}</h3><p>${esc(bio)}</p><hr><b>일촌 ${friends.length}</b><p>2005.10.15</p><small>♪ 작은 오후<br>YEAR:ON original</small><button type="button" data-bgm aria-pressed="false">BGM 재생 ▷</button></aside><section><h2>${esc(person)}의 작은 방</h2>${body}</section><nav>${tabs.map(([k,v])=>link('mini/'+k+'/'+person,v)).join('')}</nav></div>`}
function cafe(route){const [_,kind='all',id]=route.split('/'),all=[...data.written,...entries],p=all.find(x=>x.id===id);let body;
 if(kind==='post'&&p)body=`<article class="p05-post"><h2>${esc(p.title)}</h2><small>${esc(p.author)} · 2005.${p.date} · 조회 ${p.views||27}</small><p>${esc(p.body).replaceAll('\n','<br>')}</p>${p.id==='study'?link('memo','영어 표현 정리.txt 열기'):''}${link('mini/home/'+p.author,'작성자의 미니홈피 방문')}<h3>댓글 ${(p.comments||[]).length+(data.comments[p.id]||[]).length}</h3>${[...(p.comments||[]),...(data.comments[p.id]||[])].map((v,i)=>`<p class="p05-comment">ㄴ ${esc(v)} ${i>=(p.comments||[]).length?'<button type="button" data-remove-comment="'+(i-(p.comments||[]).length)+'" data-post-id="'+p.id+'">삭제</button>':''}</p>`).join('')}<form data-form="comment" data-id="${p.id}"><input name="body" aria-label="댓글 내용" required maxlength="300" placeholder="댓글을 남겨 주세요"><button>등록</button></form>${link('cafe/all','목록으로')}</article>`;
 else if(kind==='write')body=`<h2>글쓰기</h2><form data-form="write"><label>제목 <input name="title" required maxlength="90"></label><label>작성자 <input name="name" required maxlength="20" value="나그네"></label><textarea name="body" required maxlength="2000" aria-label="게시글 내용"></textarea><button>등록</button></form>`;
 else {const list=kind==='all'?all:all.filter(p=>p.cat===kind);body=`<h2>${kind==='all'?'전체 게시글':esc(kind)}</h2><table><thead><tr><th>번호</th><th>제목</th><th>작성자</th><th>날짜</th><th>조회</th></tr></thead><tbody>${list.map((p,i)=>`<tr><td>${list.length-i}</td><td>${link('cafe/post/'+p.id,p.title)} <small>[${(p.comments||[]).length+(data.comments[p.id]||[]).length}]</small></td><td>${esc(p.author)}</td><td>${p.date}</td><td>${p.views||27+i*9}</td></tr>`).join('')}</tbody></table>${link('cafe/write','글쓰기')}`}
 return `<div class="p05-cafe-banner"><b>주말을 함께</b><span>음악 · 공부 · 운동 · 일상　Since 2004</span></div><div class="p05-cafe"><aside><h3>우리 카페</h3><p>관심사를 따라 만나는 작은 모임</p><hr>${['all','공지','모임','자료','스포츠','사진','생활','취미'].map(v=>link('cafe/'+v,v==='all'?'전체글 보기':v)).join('')}</aside><section>${body}</section></div>`;
}
function portal(section='home',query=''){
 const menu=[['home','홈'],['news','뉴스'],['fan','카페'],['mini/home','미니홈피'],['cafe/all','커뮤니티'],['knowledge','지식검색'],['mail','메일'],['culture','문화'],['sports','스포츠']];
 let main='';
 if(section==='search')main=searchResults(query);
 else if(section==='mail')main='<h2>받은 편지함</h2>'+[['토요일 만나는 장소 알려 드려요','푸른소리','혜화역 2번 출구, 오후 두 시 반입니다. 혹시 늦으면 카페에 댓글을 남겨 주세요.'],['자료 정리 감사합니다','연필한자루','여러 사람이 예문을 보태니 훨씬 보기 좋아졌네요. 다음 모임에 인쇄해 갈게요.']].map(v=>`<details><summary>${v[0]}　<small>${v[1]}</small></summary><p>${v[2]}</p></details>`).join('');
 else if(section==='knowledge')main='<h2>지식검색 · 함께 묻고 답하기</h2>'+[['사진 파일 이름은 어떻게 정리하나요?','날짜_장소_촬영자 순으로 적어 두면 나중에 찾기 편해요. 친구 사진도 섞이지 않고요.'],['음악감상회에 처음 가는데 뭘 가져가나요?','좋아하는 CD 한 장이면 충분합니다. 듣고 싶은 곡을 미리 골라 오면 좋아요.'],['스터디 모임 장소 추천 부탁해요','도서관 모임방 예약부터 확인해 보세요. 이용 시간과 인원도 미리 알아보시고요.']].map(v=>`<details open><summary>Q. ${v[0]}</summary><p>A. ${v[1]}</p></details>`).join('');
 else main=`<h3>${section==='sports'?'스포츠':section==='culture'?'문화·공연':'오늘의 소식'}</h3>${news.filter(p=>section==='sports'?p.cat==='스포츠':section==='culture'?p.cat==='문화':true).map(p=>`<p>${link('news/'+p.id,p.title)} <small>${p.cat}</small></p>`).join('')}<h3>카페에서 나누는 이야기</h3>${entries.slice(1,6).map(p=>`<p>${link('cafe/post/'+p.id,p.title)} <small>[${p.comments.length}]</small></p>`).join('')}<div class="p05-small-banner">함께 읽는 책 한 권　${link('cafe/post/books','우리 동네 책 교환')}</div><h3>지식검색</h3>${link('knowledge','궁금한 점을 함께 풀어보세요 →')}`;
 return `<header class="p05-portal-head"><b>이어온<span>YEΛR:ON</span></b><form data-form="search" autocomplete="off"><input name="yearonRecordQuery" autocomplete="off" spellcheck="false" maxlength="100" value="${esc(query)}" aria-label="${t('포털 검색어','Portal search term')}" placeholder="${t('검색어를 입력하세요','Enter a search term')}"><button>${t('검색','Search')}</button></form></header><nav class="p05-services">${menu.map(([r,v])=>link(r==='home'?'portal':(r.includes('/')||r==='fan')?r:'portal/'+r,v)).join('')}</nav><div class="p05-portal"><aside><div class="p05-box p05-account-box"><h3>반갑습니다, 관람객님</h3><p>전시용 체험 계정</p>${link('mini/home','내 미니홈피')}${link('messenger','메신저 열기')}</div><div class="p05-box"><h3>가입한 카페</h3>${link('cafe/all','주말을 함께')}${link('cafe/자료','함께 쓰는 공부 자료')}${link('cafe/스포츠','주말 운동 모임')}</div><div class="p05-box p05-life-box"><h3>생활 메모</h3><p>오늘도 서로에게<br>반가운 안부를.</p></div></aside><section>${section==='home'||section==='news'?`<div class="p05-portal-feature"><small>2002.06 · ${t('주요 뉴스','Top story')}</small><button type="button" data-route="news/worldcup" class="p05-feature-link"><img src="${worldCupImage}" alt=""><span><strong>${t(records[0][1],records[0][2])}</strong><small>${t('서울시청 앞에서 모인 사람들','Supporters gather outside Seoul City Hall')}</small></span></button></div><div class="p05-record-links">${featuredRoutes.map(route=>{const [,ko,eng]=records.find(record=>record[0]===route);return link(route,t(ko,eng));}).join('')}</div>`:''}${main}</section><aside><h3>${t('추천 검색어','Suggested searches')}</h3><ol class="p05-keywords">${suggestions.map(([ko,eng])=>`<li>${link('search/'+t(ko,eng),t(ko,eng))}</li>`).join('')}</ol><h3>이번 주 모임</h3>${link('cafe/post/concert','대학로 공연')}${link('cafe/post/football','일요일 축구')}${link('mini/album','이웃의 사진첩')}<div class="p05-small-banner">책장 속 한 권을<br>이웃에게</div></aside></div>`;
}
function messenger(win,name){
 const friend=friends.find(f=>f[0]===name),history=data.chats[name]||[];
 if(!friend)return `<div class="p05-messenger"><header><b>이어온 메신저</b><small>관람객 · 온라인 ●</small></header><p>친구 ${friends.length}명</p>${friends.map(([n,status,msg])=>`<button type="button" data-friend="${n}"><i class="${status==='온라인'?'online':''}">●</i><b>${n}</b><small>${msg} · ${status}</small><span>대화하기 ›</span></button>`).join('')}<footer>전시용 가상 친구들과 대화합니다. <button type="button" data-notify aria-pressed="false">알림음 꺼짐</button></footer></div>`;
 const intro={concert:'토요일 공연 같이 가실래요? 두 시 반에 혜화역에서 만나요.',study:'이번 주 표현 정리한 파일 올렸어요. 같이 확인해 주세요.',football:'일요일 아홉 시에 운동장에서 만나요. 처음 와도 괜찮아요.',music:'잠깐 산책 나왔어요. 방명록에 남겨 주면 돌아와서 볼게요.',pharmacy:'지금은 접속하지 않았습니다. 미니홈피에 안부를 남겨 주세요.'}[friend[3]];
 return `<div class="p05-chat"><header>${link('messenger','← 친구 목록')}<b>${name}</b> <small>${friend[1]}</small></header><div class="p05-chat-log"><p><b>${name}</b><br>${intro}</p>${history.map(p=>`<p class="${p.me?'me':''}"><b>${p.me?'나':name}</b><br>${esc(p.text)}</p>`).join('')}</div>${friend[1]==='온라인'?`<form data-form="chat" data-friend="${name}"><textarea name="body" required maxlength="500" aria-label="대화 내용"></textarea><button>보내기</button></form><div class="p05-chat-choices"><button data-chat-choice="언제 어디서 만나나요?">시간·장소 묻기</button><button data-chat-choice="준비할 게 있나요?">준비물 묻기</button></div>`:'<p>자리비움·오프라인 친구에게 자동 답장이 오지 않습니다.</p>'}<footer><button type="button" data-clear-chat="${name}">대화 지우기</button>${link('cafe/post/'+friend[3],'관련 카페 글 열기')}${link('mini/home/'+name,'미니홈피 방문')}</footer></div>`;
}
function mount(win,app){
 const body=win.querySelector('.pc-window-body');body.innerHTML='<div class="p05-shell"><div class="p05-toolbar"><button data-back>◀ 뒤로</button><button data-forward>앞으로 ▶</button>'+link('portal','⌂ 홈')+'<span>Internet Explorer</span></div><label class="p05-address">주소 <input readonly aria-label="현재 주소"></label><div class="p05-page" tabindex="0" role="region" aria-label="프로그램 내용"></div><div class="p05-caption"></div></div>';
 body.setAttribute('translate','no');if(app==='pccomm')body.classList.add('p05-native-messenger');const page=body.querySelector('.p05-page'),caption=body.querySelector('.p05-caption'),history=[];let at=-1,route='',audioCtx=null,bgmTimer=0,noteIndex=0,notify=false;
 function tone(freq,duration=.15){try{audioCtx??=new (window.AudioContext||window.webkitAudioContext)();audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain(),now=audioCtx.currentTime;o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(.035,now+.015);g.gain.exponentialRampToValueAtTime(.001,now+duration);o.connect(g).connect(audioCtx.destination);o.start(now);o.stop(now+duration+.02);o.onended=()=>{o.disconnect();g.disconnect()}}catch{}}
 function stopMusic(){clearInterval(bgmTimer);bgmTimer=0;const b=body.querySelector('[data-bgm]');if(b){b.textContent='BGM 재생 ▷';b.setAttribute('aria-pressed','false')}}const mediumPanel=document.querySelector('.time-panel[data-era="2002"]');const mediumObserver=new MutationObserver(()=>{if(!mediumPanel.classList.contains('active'))stopMusic()});mediumObserver.observe(mediumPanel,{attributes:true,attributeFilter:['class']});const removal=new MutationObserver(()=>{if(!win.isConnected){stopMusic();audioCtx?.close();removal.disconnect();mediumObserver.disconnect();removeEventListener('yearon-language-change',updateLanguage)}});removal.observe(document.querySelector('#pcWindowLayer'),{childList:true});document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMusic()});
 function show(next,push=true){stopMusic();route=next;if(push){history.splice(at+1);history.push(next);at=history.length-1}let content='';let parts=next.split('/');
 if(parts[0]==='messenger')content=messenger(win,parts[1]);
 else if(parts[0]==='mini')content=mini(parts[1],parts[2]);
 else if(parts[0]==='cafe')content=cafe(next);
 else if(parts[0]==='fan')content=fanCafe(parts[1]);
 else if(next==='news/worldcup')content=worldCup();
 else if(next==='news/worldcup/photo')content=`<article class="p05-post">${link('news/worldcup',t('← 기사로 돌아가기','← Back to the article'))}<img class="p05-record-image" src="assets/images/archive-v2/worldcup-cityhall-2002.jpg" alt="${t('2002년 월드컵 거리 응원','Street supporters at the 2002 World Cup')}"></article>`;
 else if(parts[0]==='news'){const n=news.find(n=>n.id===parts[1]);content=`<article class="p05-post"><small>이어온 뉴스 · ${n?.cat} · 2005.10.15</small><h2>${n?.title}</h2><p>${n?.body.replaceAll('\n','<br>')}</p>${link('portal/news','뉴스 목록')}</article>`}
 else if(parts[0]==='memo')content='<article class="p05-post"><h2>영어 표현 정리.txt</h2><p>1. Could you help me? — 도움을 부탁할 때<br>2. Shall we meet at two? — 약속 시간을 정할 때<br>3. Thank you for sharing. — 자료를 나누어 준 친구에게</p>'+link('cafe/post/study','자료실 글로 돌아가기')+'</article>';
 else content=portal(parts[0]==='search'?'search':parts[1]||'home',parts[0]==='search'?parts.slice(1).join('/'):'');
 page.innerHTML=content;
 if(en()){
 const guide=document.createElement('div');guide.className='p05-english-guide';guide.textContent=parts[0]==='cafe'?'Community café: open a post, leave a comment, or visit its author’s mini-homepage. The records and people are fictional.':parts[0]==='mini'?'Mini-homepage: explore the profile, photo album and diary, leave a guestbook message, or visit a friend. Archival photos are credited separately.':parts[0]==='messenger'?'Messenger: choose an online friend and type or use a suggested question. Replies are scripted exhibition scenarios, not live messages.':'Search the exhibition records for the 2002 World Cup, IEOON GAYO, fan club posts or photo albums.';page.prepend(guide);
 const labels={'홈':'Home','뉴스':'News','카페':'Café','블로그':'Blog','지식검색':'Q&A','메일':'Mail','문화':'Culture','스포츠':'Sports','검색':'Search','내 미니홈피':'My mini-homepage','메신저 열기':'Messenger','전체글 보기':'All posts','공지':'Notices','모임':'Meetings','자료':'Files','사진':'Photos','생활':'Daily life','취미':'Hobbies','작성자의 미니홈피 방문':'Visit author’s page','목록으로':'Back to list','글쓰기':'Write a post','등록':'Post','삭제':'Delete','사진첩':'Photo album','다이어리':'Diary','방명록':'Guestbook','일촌':'Friends','글 남기기':'Leave a message','← 친구 목록':'← Friends','보내기':'Send','시간·장소 묻기':'Ask time and place','준비물 묻기':'Ask what to bring','관련 카페 글 열기':'Open related café post','미니홈피 방문':'Visit mini-homepage'};
 page.querySelectorAll('button').forEach(b=>{const v=b.textContent.trim();if(labels[v])b.textContent=labels[v]});
 const synopsis={concert:'Join a small theatre outing on Saturday. Meet at Hyehwa Station, Exit 2, at 2:30 p.m. Leave a comment if you would like to come.',study:'Members combined their English study notes. Open the text file, check the examples, and suggest corrections in the comments.',football:'The Sunday football group needs one more player. Beginners are welcome; bring trainers and water.',walk:'Members share drawings and memories of a walk, and plan to exchange cameras next time.',pharmacy:'A fictional neighbourhood notice invites people to share and verify late-night pharmacy information.',music:'A newcomer recalls sharing favourite CDs at a listening group.',books:'Readers arrange to exchange books and leave recommendation notes for one another.',welcome:'New members are invited to introduce themselves and respect one another’s privacy.'};
 if(parts[0]==='cafe'&&parts[1]==='post'&&synopsis[parts[2]]){const p=document.createElement('p');p.className='p05-english-guide';p.textContent=synopsis[parts[2]];page.querySelector('.p05-post h2')?.after(p)}
 }
 page.scrollTop=0;body.querySelector('.p05-address input').value='http://'+(parts[0]==='mini'?'minihome.yearon.local/':parts[0]==='cafe'?'cafe.yearon.local/':parts[0]==='messenger'?'messenger.yearon.local/':'www.yearon.local/')+next;
 body.querySelector('[data-back]').disabled=at<=0;body.querySelector('[data-forward]').disabled=at>=history.length-1;caption.innerHTML=footer();page.append(caption);
 }
 function send(name,text){(data.chats[name]||=[]).push({me:true,text});const f=friends.find(f=>f[0]===name);if(f?.[1]==='온라인')data.chats[name].push({me:false,text:text.includes('준비')?({concert:'편한 옷차림이면 됩니다. 공연 뒤에 차도 같이 마셔요.',study:'노트와 필기도구를 챙겨 와 주세요. 자료는 제가 인쇄할게요.',football:'운동화와 물만 챙겨 오세요. 공은 제가 가져갑니다.'}[f[3]]):text.includes('시간')||text.includes('언제')?({concert:'토요일 오후 두 시 반, 혜화역 2번 출구입니다.',study:'토요일 오후 두 시 도서관 모임방이에요.',football:'일요일 오전 아홉 시, 동네 학교 운동장입니다.'}[f[3]]):'메시지 잘 봤어요. 자세한 약속은 아래 카페 글에서 확인해 주세요. 함께하면 반갑겠습니다.'});if(notify)tone(784,.22);save();show('messenger/'+name,false);const log=page.querySelector('.p05-chat-log');if(log)log.scrollTop=log.scrollHeight;}
 body.addEventListener('click',e=>{
 const photo=e.target.closest('[data-photo]');
 if(photo){
  e.preventDefault();
  show('news/worldcup/photo');
  return;
 }
 let b=e.target.closest('button');if(!b)return;if(b.dataset.clearChat){data.chats[b.dataset.clearChat]=[];save();show(route,false);return}if(b.hasAttribute('data-bgm')){if(bgmTimer){stopMusic();b.textContent='BGM 재생 ▷';b.setAttribute('aria-pressed','false')}else{const notes=[261.63,329.63,392,329.63,293.66,349.23,440,392];const play=()=>tone(notes[noteIndex++%notes.length],.6);play();bgmTimer=setInterval(play,720);b.textContent='BGM 정지 ■';b.setAttribute('aria-pressed','true')}return}if(b.hasAttribute('data-notify')){notify=!notify;b.setAttribute('aria-pressed',String(notify));b.textContent=notify?'알림음 켜짐 ♪':'알림음 꺼짐';if(notify)tone(660);return}if(b.dataset.removeComment!==undefined){data.comments[b.dataset.postId].splice(Number(b.dataset.removeComment),1);save();show(route,false);return}if(b.dataset.route){const next=b.dataset.route;if(app==='pccomm'&&!next.startsWith('messenger')){window.YEARON_PC_OPEN?.('internet')?._p05Show?.(next)}else if(app==='internet'&&next.startsWith('messenger')){window.YEARON_PC_OPEN?.('pccomm')?._p05Show?.(next)}else show(next);}if(b.hasAttribute('data-back')&&at>0)show(history[--at],false);if(b.hasAttribute('data-forward')&&at<history.length-1)show(history[++at],false);if(b.dataset.friend)show('messenger/'+b.dataset.friend);if(b.dataset.chatChoice)send(route.split('/')[1],b.dataset.chatChoice)});
 body.addEventListener('submit',e=>{const f=e.target;if(!f.dataset.form)return;e.preventDefault();const v=Object.fromEntries(new FormData(f));if(f.dataset.form==='search'){const query=v.yearonRecordQuery.trim();if(query)show('search/'+query);return}if(!v.body?.trim())return;
 if(f.dataset.form==='comment'){(data.comments[f.dataset.id]||=[]).push(v.body.trim());save();show(route,false)}
 if(f.dataset.form==='guest'){data.guest.unshift({name:v.name.trim()||'나그네',body:v.body.trim(),owner:f.dataset.owner});save();show(route,false)}
 if(f.dataset.form==='write'){const id='visitor-'+Date.now();data.written.unshift({id,cat:'생활',title:v.title.trim(),author:v.name.trim(),date:'10.15',body:v.body.trim(),comments:[]});save();show('cafe/post/'+id)}
 if(f.dataset.form==='chat')send(f.dataset.friend,v.body.trim());
 });show(app==='pccomm'?'messenger':'portal');
 win._p05Show=show;const updateLanguage=()=>{if(win.isConnected)show(route,false)};addEventListener('yearon-language-change',updateLanguage);
}
window.YEARON_PC2005={mount};
})();
