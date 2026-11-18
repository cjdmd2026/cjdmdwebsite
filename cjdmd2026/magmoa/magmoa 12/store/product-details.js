/* Product-specific editorial content. Product photography retains the supplied artwork. */
const MAGNET_DETAILS = [
 ['frog','초록빛 쉼표를 일상에','문암생태공원의 여유를 담았어요.','느긋한 맹꽁이','튤립을 품고 앉은 맹꽁이와 동그란 눈이 편안한 표정을 만듭니다.','작은 정원의 풍경','푸른 폭포와 알록달록한 꽃, 나무 간판까지 한 장면에 담았습니다.'],
 ['zoo','작은 동물원이 찾아왔어요','청주랜드 동물원의 친구들을 만나보세요.','모여 있는 동물 친구들','사자와 곰, 말과 거북이가 어우러진 풍성한 구성을 살펴보세요.','위로 펼쳐지는 즐거움','분홍 플라밍고와 날개를 펼친 앵무새가 장면에 생기를 더합니다.'],
 ['jikji','책 속에서 펼쳐진 청주의 이야기','청주고인쇄박물관을 작은 입체 풍경으로.','펼쳐진 책 위의 건물','고서의 형태 위로 박물관 건물과 계단을 차곡차곡 담았습니다.','초록 산과 푸른 하늘','둥근 프레임 안의 산과 구름이 건물 뒤로 포근하게 펼쳐집니다.'],
 ['villa','정원의 평온을 담아','청남대에서 만난 풍경을 가까이에 두세요.','청록색 지붕의 별장','기와의 곡선과 건물 정면, 넓은 계단을 입체적으로 표현했습니다.','정원의 작은 동행','나무와 꽃 사이, 계단에 앉은 노란 새 캐릭터를 찾아보세요.'],
 ['market','시장의 활기를 한 조각','육거리종합시장의 반가운 풍경.','푸른 기와와 시장 간판','육거리종합시장의 입구와 등불을 풍성하게 담았습니다.','표정이 있는 만두','중앙의 동그란 만두와 즐거운 요리사 캐릭터가 시선을 사로잡습니다.'],
 ['mmca','예술을 가까이에 두는 방법','국립현대미술관 청주를 일상 속 갤러리로.','빛나는 전시 창','건물의 큰 창 속 보랏빛 구슬이 전시를 보는 듯한 즐거움을 더합니다.','그림 그리는 두 친구','팔레트와 붓, 작은 그림까지 꼬마 화가들의 장면을 살펴보세요.'],
 ['sejong','왕의 휴식을 만나는 순간','초정행궁의 이야기를 입체적으로 담았습니다.','행궁을 품은 세종대왕','붉은 곤룡포와 온화한 표정의 캐릭터가 행궁 곁에 자리합니다.','지붕 위의 한글','검은 기와의 곡선과 색색의 글자가 만드는 경쾌한 디테일.'],
 ['seongangil','걷고 싶은 거리를 곁에','성안길에서 만난 다채로운 장면.','작은 가게가 있는 거리','노랑·초록 차양과 아기자기한 가게들이 거리의 분위기를 전합니다.','초록 프레임 속 만남','풍성한 나무, 높은 기둥과 두 캐릭터가 어우러진 둥근 구성을 담았습니다.'],
 ['fortress','성문 너머의 기억','상당산성의 풍경을 작은 오브제로.','돌담과 열린 성문','겹겹이 쌓인 돌의 표면과 성문 너머 풍경까지 살펴보세요.','성문을 지키는 두 친구','서로 다른 표정의 수문장과 붉은 장식이 장면에 재미를 더합니다.'],
 ['station','시간을 간직한 작은 역','청주옛역사공원의 추억을 담았어요.','시계를 품은 기관차','검은 기관차와 주황빛 차체, 정면의 큰 시계가 시선을 끕니다.','벤치 위의 이야기','청주역 건물 앞, 나란히 앉은 두 인물의 다정한 순간을 담았습니다.']
];
function productDetailImage(product) { return `images/details/${MAGNET_DETAILS[product.id-1][0]}-lifestyle.jpg`; }
function renderProductStory(target, product) {
 const [slug, headline, intro, featureA, copyA, featureB, copyB] = MAGNET_DETAILS[product.id-1];
 target.replaceChildren();
 const section = document.createElement('article'); section.className='magnet-story';
 // Copy is curated local data; image paths are controlled project assets.
 section.innerHTML=`
 <header class="magnet-story-intro"><span>MAGMOA · CHEONGJU COLLECTION</span><h2>${headline}</h2><p>${intro}</p><img src="${product.img1}" alt="${product.title} 전체 디자인" loading="lazy"></header>
 <section class="magnet-lifestyle"><div class="magnet-story-copy"><span>01 / IN YOUR SPACE</span><h3>여행의 한 장면,<br>매일 마주하는 곳에.</h3><p>냉장고나 자석이 붙는 보드 위에 두고<br>청주에서의 기억을 꺼내보세요.</p></div><img src="${productDetailImage(product)}" alt="${product.title} 냉장고 부착 연출 이미지" loading="lazy"><p class="magnet-image-note">AI로 제작한 사용 연출 이미지입니다. 실제 디자인은 제품 컷을 확인해 주세요.</p></section>
 <section class="magnet-design-points" aria-label="디자인 포인트"><div class="magnet-story-copy"><span>02 / DESIGN POINT</span><h3>${featureA}</h3><p>${copyA}</p></div><div class="magnet-story-copy"><span>03 / LITTLE DETAILS</span><h3>${featureB}</h3><p>${copyB}</p></div></section>
 <section class="magnet-ending"><span>COLLECT YOUR TRAVEL</span><h3>여행의 조각을 모으다.</h3><p>나를 위한 작은 기념품으로,<br>함께 여행한 사람에게 전하는 기억으로.</p></section>`;
 section.querySelectorAll("img").forEach(img => { img.addEventListener("error", () => { img.src = product.img1; }, {once:true}); });
 target.append(section);
}
