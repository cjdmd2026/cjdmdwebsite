(()=>{'use strict';
const model=document.querySelector('#holo-model'), shell=model?.querySelector('.holo-shell'); if(!model||!shell)return;
const layouts=[
// 청주시: 곡선 관리동, 중앙 처리동, 단일 고층 굴뚝
{b:[[0,30,210,62,24],[12,-35,130,62,42],[150,-15,86,90,58],[80,65,160,34,16],[-125,72,170,30,15]],s:[[165,-72,16,132]],t:[[82,-58,28,34]]},
// 우진: 긴 공정동, 교차 이송설비, 적백 굴뚝 위치
{b:[[-75,5,205,70,48],[100,18,98,76,62],[-116,-74,100,42,25],[40,-77,130,38,32],[145,-70,58,42,27]],s:[[126,78,15,105],[-28,78,11,70]],t:[[66,78,24,42],[-82,75,18,35]]},
// 리뉴에너지충북: 불규칙한 소형 공정동 군집
{b:[[-95,-20,105,66,54],[10,-38,72,70,48],[92,-22,110,62,38],[-125,62,78,48,29],[-28,66,90,46,37],[82,67,80,42,25],[155,35,44,65,46]],s:[[-65,75,13,100],[150,-62,11,74]],t:[[32,60,24,38],[118,-68,22,42]]},
// 다나: 붉은 장방형 지붕군의 실제 배치
{b:[[-90,-25,190,58,42],[85,-32,146,54,45],[-124,50,112,52,32],[18,55,90,48,30],[125,54,82,45,28]],s:[[-5,4,15,112],[148,-60,10,67]],t:[[68,60,22,36],[-80,62,18,28]]},
// 한세이프: 긴 단일 처리동과 후면 집진설비
{b:[[-32,0,260,78,62],[-130,72,80,38,24],[118,66,82,52,42],[142,-55,62,58,48]],s:[[87,-70,17,124],[28,-70,12,86]],t:[[145,40,27,48],[95,47,22,38]]},
// 대한제지: 초장축 생산동, 야적장, 원형 수처리조
{b:[[-65,-5,250,72,48],[106,-6,112,78,39],[-115,72,110,42,28],[38,73,135,42,26],[145,70,52,42,29]],s:[[158,-70,14,92]],t:[[-145,-76,34,18],[-95,-77,28,18],[95,-78,31,18],[145,-77,25,18]]},
// 나투라페이퍼: 연결된 대형 청색 지붕 생산동
{b:[[-88,-20,220,82,44],[88,-18,150,86,48],[-95,70,210,38,25],[92,70,142,42,29],[0,-78,120,34,32]],s:[[-132,-72,13,88]],t:[[78,-75,32,18],[126,-75,32,18]]}
];
function face(cls){const d=document.createElement('i');d.className=cls;return d}
function box([x,y,w,d,h]){const e=document.createElement('div');e.className='geo-box';e.style.cssText=`--x:${x}px;--y:${y}px;--w:${w}px;--d:${d}px;--h:${h*1.65}px`;['front','back','left','right','top','bottom'].forEach(c=>e.append(face(c)));return e}
function cylinder([x,y,r,h],stack=false){const e=document.createElement('div');e.className=stack?'geo-cylinder geo-stack':'geo-cylinder';e.style.cssText=`--x:${x}px;--y:${y}px;--r:${r}px;--h:${h*1.65}px`;for(let i=0;i<16;i++){const q=face('cyl-side');q.style.setProperty('--i',i);e.append(q)}e.append(face('cyl-cap top'));e.append(face('cyl-cap bottom'));if(stack){for(let i=1;i<5;i++){const ring=face('stack-ring');ring.style.setProperty('--i',i);e.append(ring)}}return e}
function render(){shell.querySelectorAll("img").forEach(i=>i.hidden=true);let root=shell.querySelector('.facility-geometry');if(root)root.remove();root=document.createElement('div');root.className='facility-geometry';const grid=document.createElement('div');grid.className='geo-grid';root.append(grid);const l=layouts[+(model.dataset.variant||0)]||layouts[0];l.b.forEach(v=>root.append(box(v)));l.t.forEach(v=>root.append(cylinder(v)));l.s.forEach(v=>root.append(cylinder(v,true)));shell.append(root)}
render();new MutationObserver(render).observe(model,{attributes:true,attributeFilter:['data-variant']});
})();
