const cases = [
  {key:"isseane",number:"01",scope:"GLOBAL",country:"FRANCE",name:"프랑스 Isséane",title:"도시 안에 숨은 자원회수시설",summary:"시설을 지하화하고 도시 경관·정보 공개·시민 견학을 연결한 도심형 시설입니다.",tags:["공간 통합","시설 공개"]},
  {key:"copenhill",number:"02",scope:"GLOBAL",country:"DENMARK",name:"덴마크 CopenHill",title:"소각장 지붕이 된 도시의 새로운 산",summary:"소각시설 지붕과 외벽을 스키·하이킹·등반 공간으로 활용한 사례입니다.",tags:["랜드마크","시민 여가"]},
  {key:"spittelau",number:"03",scope:"GLOBAL",country:"AUSTRIA",name:"오스트리아 Spittelau",title:"혐오시설의 외관을 도시의 상징으로",summary:"예술적 재건축과 지역난방을 결합해 도심 기반시설을 드러낸 사례입니다.",tags:["예술 건축","지역난방"]},
  {key:"beitou",number:"04",scope:"GLOBAL",country:"TAIWAN",name:"대만 Beitou",title:"굴뚝을 전망대로 바꾼 지역 복지시설",summary:"소각장 굴뚝 전망대와 주민 편의·환경교육 기능을 결합했습니다.",tags:["전망대","환경교육"]},
  {key:"hanam",number:"05",scope:"DOMESTIC",country:"KOREA · HANAM",name:"하남 Union Park",title:"환경시설은 지하로, 지상은 시민공원으로",summary:"소각·하수·음식물·재활용 시설을 지하화하고 상부를 공원으로 조성했습니다.",tags:["지하화","시민공원"]},
  {key:"asan",number:"06",scope:"DOMESTIC",country:"KOREA · ASAN",name:"아산 환경과학공원",title:"소각열과 환경교육을 하나의 공원으로",summary:"소각열 활용과 생태곤충원·과학관·전망대를 한 장소에 연결했습니다.",tags:["에너지","환경교육"]},
  {key:"musashino",number:"07",scope:"GLOBAL",country:"JAPAN",name:"일본 Musashino",title:"주민과 함께 감시하는 도심형 클린센터",summary:"계획 단계의 시민 참여와 실시간 운영정보 공개를 결합한 사례입니다.",tags:["주민 감시","정보 공개"]},
  {key:"mapo",number:"08",scope:"DOMESTIC",country:"KOREA · SEOUL",name:"서울 마포 자원회수시설",title:"공원 옆 자원회수시설과 주민지원 구조",summary:"열 회수와 주민지원협의체·주민지원기금을 함께 운영합니다.",tags:["에너지","주민지원"]},
  {key:"jeonju",number:"09",scope:"DOMESTIC",country:"KOREA · JEONJU",name:"전주권 소각자원센터",title:"주민 감시원이 확인하는 폐기물 반입",summary:"주민감시원이 반입 폐기물과 성상검사 과정에 참여하는 사례입니다.",tags:["주민감시원","성상검사"]},
  {key:"jeju",number:"10",scope:"DOMESTIC",country:"KOREA · JEJU",name:"제주 환경자원순환센터",title:"주민 협약과 지역사업으로 완성한 입지 합의",summary:"공개 공모와 주민협약, 지역 수익사업을 통해 시설 입지를 추진했습니다.",tags:["주민협약","지역 환원"]},
  {key:"seongnam",number:"11",scope:"DOMESTIC",country:"KOREA · SEONGNAM",name:"성남 상대원동 대체시설",title:"노후시설 교체와 주민지원 협약",summary:"노후 소각장을 대체 건립하면서 주민지원기금과 관리 방안을 협의했습니다.",tags:["시설 현대화","주민지원"]},
  {key:"gyeongju",number:"12",scope:"DOMESTIC",country:"KOREA · GYEONGJU",name:"경주 자원회수시설",title:"반입 수수료를 주민 복지로 환원",summary:"주민협동조합과 편익시설을 통해 시설 수익 일부를 지역에 환원합니다.",tags:["주민협동조합","복지 환원"]},
  {key:"selchp",number:"13",scope:"GLOBAL",country:"UNITED KINGDOM",name:"영국 SELCHP",title:"폐기물 에너지를 지역난방으로 연결",summary:"런던의 소각열을 인근 주거단지 지역난방에 공급하는 사례입니다.",tags:["지역난방","에너지 복지"]},
  {key:"garstad",number:"14",scope:"GLOBAL",country:"SWEDEN",name:"스웨덴 Gärstad",title:"자원순환 교육과 지역 고용의 거점",summary:"재활용센터·지역난방·환경교육을 지자체 공기업이 통합 운영합니다.",tags:["환경교육","공공 운영"]},
  {key:"ulsan",number:"15",scope:"DOMESTIC",country:"KOREA · ULSAN",name:"울산 성암소각장",title:"소각 스팀을 산업단지에 공급하는 순환 모델",summary:"소각에서 발생한 증기를 인근 산업체에 공급해 에너지와 수익을 회수합니다.",tags:["산업 스팀","열 회수"]},
  {key:"tuasone",number:"16",scope:"GLOBAL",country:"SINGAPORE",name:"싱가포르 TuasOne",title:"고밀도 국가의 대규모 폐기물 에너지시설",summary:"토지 제약 속에서 대량의 잔여폐기물을 처리하고 전력을 생산합니다.",tags:["대규모 처리","자동화"]},
  {key:"hagenholz",number:"17",scope:"GLOBAL",country:"SWITZERLAND",name:"스위스 Hagenholz",title:"소각열을 도시 에너지망에 정밀하게 연결",summary:"전기·지역난방 생산과 소각재 금속 회수를 결합한 취리히 사례입니다.",tags:["지역난방","금속 회수"]},
  {key:"pyeongtaek",number:"18",scope:"DOMESTIC",country:"KOREA · PYEONGTAEK",name:"평택 Eco Center",title:"복합 폐기물처리시설과 주민 편익의 결합",summary:"여러 폐기물 처리기능을 통합하고 주민편익시설과 연계한 사례입니다.",tags:["복합시설","주민 편익"]}
];
for(const item of cases){item.image=`../images/pages/img/cases-card/${item.key}.jpg`;}


const regions = {
  europe:{name:"유럽",english:"EUROPE",image:"../images/pages/img/map-europe.jpg",keys:["isseane","copenhill","spittelau","selchp","garstad","hagenholz"],world:{x:51.1,y:38.3},pins:{selchp:{x:25.1,y:48.4},isseane:{x:31.7,y:62.7},hagenholz:{x:43.1,y:69.1},copenhill:{x:47.2,y:40.4},garstad:{x:52.3,y:31.3},spittelau:{x:53.2,y:69.1}}},
  korea:{name:"대한민국",english:"KOREA",image:"../images/pages/img/map-korea.jpg",keys:["hanam","asan","mapo","jeonju","jeju","seongnam","gyeongju","ulsan","pyeongtaek"],world:{x:79.7,y:45},pins:{mapo:{x:42,y:36},hanam:{x:52,y:39},seongnam:{x:59,y:46},pyeongtaek:{x:45,y:49},asan:{x:36,y:53},jeonju:{x:40,y:64},gyeongju:{x:60,y:59},ulsan:{x:66,y:68},jeju:{x:48,y:83}}},
  taiwan:{name:"대만",english:"TAIWAN",image:"../images/pages/img/map-taiwan.jpg",keys:["beitou"],world:{x:78.6,y:53.8},pins:{beitou:{x:57.9,y:11.7}}},
  japan:{name:"일본",english:"JAPAN",image:"../images/pages/img/map-japan.jpg",keys:["musashino"],world:{x:83.4,y:45.7},pins:{musashino:{x:58.5,y:62.4}}},
  singapore:{name:"싱가포르",english:"SINGAPORE",image:"../images/pages/img/map-singapore.jpg",keys:["tuasone"],world:{x:74.2,y:66.4},pins:{tuasone:{x:29.9,y:60.6}}}
};

const $ = selector => document.querySelector(selector);
// Coordinates are source-image pixels, never viewport pixels.
const sourcePoint=(x,y)=>({x:100*x/1672,y:100*y/941});
regions.europe.pins={selchp:sourcePoint(521,500),isseane:sourcePoint(587,594),hagenholz:sourcePoint(731,650),copenhill:sourcePoint(797,400),garstad:sourcePoint(863,324),spittelau:sourcePoint(910,608)};
regions.japan.pins={musashino:sourcePoint(930,550)};
regions.taiwan.pins={beitou:sourcePoint(960,126)};
regions.singapore.pins={tuasone:sourcePoint(502,551)};
// Anchors stay on the source map; callouts can move without moving the location.
regions.korea.pins={mapo:sourcePoint(800,418),hanam:sourcePoint(826,420),seongnam:sourcePoint(823,434),pyeongtaek:sourcePoint(815,455),asan:sourcePoint(810,476),jeonju:sourcePoint(812,565),gyeongju:sourcePoint(935,571),ulsan:sourcePoint(949,601),jeju:sourcePoint(764,757)};
// World-map anchors sit on land; detached labels are connected separately.
regions.europe.world=sourcePoint(832,347);
regions.korea.world=sourcePoint(1312,413);
regions.japan.world=sourcePoint(1360,415);
regions.taiwan.world=sourcePoint(1309,470);
regions.singapore.world=sourcePoint(1205,591);
const callouts={korea:{mapo:[32,30],hanam:[66,32],seongnam:[70,44],pyeongtaek:[29,46],asan:[28,57],jeonju:[32,70],gyeongju:[73,59],ulsan:[75,72],jeju:[43,90]},world:{europe:[46,29],korea:[72,35],japan:[91,43],taiwan:[87,57],singapore:[68,73]}};
callouts.europe={selchp:[22,44],isseane:[27,68],hagenholz:[43,79],copenhill:[43,34],garstad:[62,29],spittelau:[65,68]};
callouts.japan={musashino:[71,57]};
callouts.taiwan={beitou:[72,23]};
callouts.singapore={tuasone:[23,72]};
function connectPin(button,anchor,display){
  if(!display)return;
  button.style.setProperty('--x',`${display[0]}%`);button.style.setProperty('--y',`${display[1]}%`);
  const ns='http://www.w3.org/2000/svg';
  let svg=markers.querySelector('svg');
  if(!svg){svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.classList.add('pin-connections');markers.prepend(svg);}
  const line=document.createElementNS(ns,'line');
  for(const [name,value] of Object.entries({x1:anchor.x,y1:anchor.y,x2:display[0],y2:display[1]}))line.setAttribute(name,value);
  svg.append(line);
  const dot=document.createElement('span');dot.className='location-anchor';dot.style.left=`${anchor.x}%`;dot.style.top=`${anchor.y}%`;markers.append(dot);
}
const markers = $("#map-markers");
const picture = $("#map-picture");
const mapImage = $("#map-image");
const panel = $("#case-panel");
const regionButtons = $("#region-buttons");
let activeRegion = null;
let selectedCase = null;

const caseByKey = key => cases.find(item => item.key === key);

function markerButton({className="",x,y,label,subLabel,onClick,number}){
  const button = document.createElement("button");
  button.type = "button";
  button.className = `map-marker ${className}`;
  button.style.setProperty("--x",`${x}%`);
  button.style.setProperty("--y",`${y}%`);
  button.setAttribute("aria-label",label);
  button.innerHTML = number
    ? `<span class="marker-number">${number}</span><span class="case-pin-name">${label}</span><span class="case-pin-arrow" aria-hidden="true">↗</span>`
    : `<span class="marker-core"></span><span class="marker-label"><strong>${label}</strong><small>${subLabel}</small></span>`;
  button.addEventListener("click",onClick);
  return button;
}

function swapMap(src,alt,after){
  picture.classList.add("changing");
  window.setTimeout(() => {
    mapImage.src = src;
    mapImage.alt = alt;
    markers.replaceChildren();
    after();
    requestAnimationFrame(() => picture.classList.remove("changing"));
  },180);
}

function updateRegionButtons(){
  const selectedRegion = activeRegion || "world";
  regionButtons.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed",String(button.dataset.region === selectedRegion)));
}

function renderWorld({updateHash=true}={}){
  activeRegion = null;
  closePanel({clearHash:false});
  $("#map-route").innerHTML = "<span>WORLD</span><b>전체 사례 지도</b>";
  $("#map-count").textContent = "5 REGION SPOTS";
  $("#map-hint").style.opacity = "1";
  updateRegionButtons();
  swapMap("../images/pages/img/world-map.jpg","국내외 환경시설 사례 세계 지도",() => {
    Object.entries(regions).forEach(([key,region]) => {
      const button=markerButton({x:region.world.x,y:region.world.y,label:region.name,subLabel:`${region.keys.length}개 사례`,onClick:()=>renderRegion(key)});
      connectPin(button,region.world,callouts.world[key]);markers.append(button);
    });
  });
  if(updateHash) history.replaceState(null,"",location.pathname);
}

function renderRegion(key,{updateHash=true}={}){
  const region = regions[key];
  if(!region) return;
  activeRegion = key;
  closePanel({clearHash:false});
  $("#map-route").innerHTML = `<span>${region.english}</span><b>${region.name} 사례 지도</b>`;
  $("#map-count").textContent = `${region.keys.length} CASE${region.keys.length > 1 ? "S" : ""}`;
  $("#map-hint").style.opacity = "0";
  updateRegionButtons();
  swapMap(region.image,`${region.name} 환경시설 사례 확대 지도`,() => {
    region.keys.forEach(caseKey => {
      const item = caseByKey(caseKey);
      const pin = region.pins[caseKey];
      const button = markerButton({className:"case-marker",x:pin.x,y:pin.y,label:item.name,subLabel:item.title,onClick:()=>openCase(caseKey),number:item.number});
      button.dataset.case = caseKey;
      connectPin(button,pin,callouts[key]?.[caseKey]);
      markers.append(button);
    });
  });
  if(updateHash) history.replaceState(null,"",`#${key}`);
}

function openCase(key,{updateHash=true}={}){
  const item = caseByKey(key);
  if(!item) return;
  selectedCase = key;
  markers.querySelectorAll(".case-marker").forEach(marker => marker.classList.toggle("active",marker.dataset.case === key));
  $("#panel-image").src = item.image;
  $("#panel-image").alt = `${item.name} 사례 이미지`;
  $("#panel-number").textContent = `${item.scope} CASE ${item.number}`;
  $("#panel-country").textContent = item.country;
  $("#panel-title").textContent = item.title;
  $("#panel-name").textContent = item.name;
  $("#panel-summary").textContent = item.summary;
  $("#panel-tags").innerHTML = item.tags.map(tag=>`<span># ${tag}</span>`).join("");
  $("#panel-link").href = `CaseDetailModern.html?case=${item.key}`;
  let official=document.querySelector('#panel-official');if(!official){official=document.createElement('div');official.id='panel-official';official.className='official-sources';document.querySelector('#panel-link').after(official);}window.renderCaseSources(item.key,official);
  panel.classList.add("open");
  panel.setAttribute("aria-hidden","false");
  document.body.classList.add("panel-visible");
  if(updateHash) history.replaceState(null,"",`#${activeRegion}/${key}`);
}

function closePanel({clearHash=true}={}){
  selectedCase = null;
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden","true");
  document.body.classList.remove("panel-visible");
  markers?.querySelectorAll(".active").forEach(marker=>marker.classList.remove("active"));
  if(clearHash && activeRegion) history.replaceState(null,"",`#${activeRegion}`);
}

const worldButton = document.createElement("button");
worldButton.type = "button";
worldButton.className = "region-button region-button-world";
worldButton.dataset.region = "world";
worldButton.setAttribute("aria-pressed","false");
worldButton.innerHTML = '전체 지도<span>ALL REGIONS</span>';
worldButton.addEventListener("click",()=>renderWorld());
regionButtons.append(worldButton);

Object.entries(regions).forEach(([key,region]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "region-button";
  button.dataset.region = key;
  button.setAttribute("aria-pressed","false");
  button.innerHTML = `${region.name}<span>${region.keys.length} CASE${region.keys.length > 1 ? "S" : ""}</span>`;
  button.addEventListener("click",()=>renderRegion(key));
  regionButtons.append(button);
});

$("#panel-close").addEventListener("click",()=>closePanel());
$("#menu-toggle").addEventListener("click",event => {
  const open = $("#site-header").classList.toggle("menu-open");
  event.currentTarget.setAttribute("aria-expanded",String(open));
  event.currentTarget.querySelector(".sr-only").textContent = open ? "메뉴 닫기" : "메뉴 열기";
});
document.addEventListener("keydown",event => {
  if(event.key === "Escape"){
    if(panel.classList.contains("open")) closePanel();
    else if($("#site-header").classList.contains("menu-open")) $("#menu-toggle").click();
  }
});
document.addEventListener("click",event => {
  if(window.innerWidth <= 760 && panel.classList.contains("open") && !panel.contains(event.target) && !event.target.closest(".case-marker")) closePanel();
});

function restoreFromHash(){
  const [regionKey,caseKey] = location.hash.slice(1).split("/");
  if(!regions[regionKey]) return renderWorld({updateHash:false});
  renderRegion(regionKey,{updateHash:false});
  if(caseKey && caseByKey(caseKey)) window.setTimeout(()=>openCase(caseKey,{updateHash:false}),240);
}

restoreFromHash();
