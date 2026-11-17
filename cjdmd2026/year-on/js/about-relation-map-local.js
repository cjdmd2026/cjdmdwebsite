/* Five connected chapters, read vertically on one continuous silver thread. */
(()=>{
const drawing=document.getElementById('wnRelationMap');if(!drawing)return;
const ns='http://www.w3.org/2000/svg',labels=[],items=[],clamp=n=>Math.max(0,Math.min(1,n)),ease=n=>{n=clamp(n);return n*n*(3-2*n)},range=(p,a,b)=>ease((p-a)/(b-a));
const add=(tag,attrs,parent=drawing)=>{const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));parent.append(e);return e};
const content=add('g',{});
function text(parent,x,y,ko,en,cls='wn-continuous-label'){const e=add('text',{x,y,'text-anchor':'middle',class:cls},parent);labels.push({e,ko,en});return e}
function group(y,at){const g=add('g',{},content);items.push({g,y,at});return g}
const spine='M500 374V2980';
add('path',{d:spine,class:'wn-continuous-spine'},content);
const trace=add('path',{d:spine,class:'wn-continuous-trace',pathLength:1,'stroke-dasharray':1},content);
// Mask only the thread behind labels; keep the spine itself straight and continuous.
const defs=drawing.ownerSVGElement.querySelector('defs'),threadMask=add('mask',{id:'wn-thread-reading-mask',maskUnits:'userSpaceOnUse',x:190,y:150,width:620,height:3400},defs);
add('rect',{x:190,y:150,width:620,height:3400,fill:'white'},threadMask);
content.querySelectorAll('.wn-continuous-spine,.wn-continuous-trace').forEach(e=>e.setAttribute('mask','url(#wn-thread-reading-mask)'));

const top=group(270,0);add('circle',{cx:500,cy:270,r:104,class:'wn-continuous-glass'},top);text(top,500,257,'OURNESS','OURNESS','wn-element-name');text(top,500,287,'우리성','A sense of us','wn-continuous-korean');
[['교류','Exchange',550,-1],['함께함','Togetherness',640,1],['관계','Relationship',730,-1],['나눔','Sharing',820,1],['공감','Empathy',910,-1]].forEach(([ko,en,y,side],i)=>{const g=group(y,.07+i*.045);add('path',{d:`M500 ${y}h${side*55}`,class:'wn-continuous-branch',pathLength:1,'stroke-dasharray':1},g);const t=text(g,500+side*72,y,ko,en,'wn-continuous-label wn-branch-label');t.setAttribute('text-anchor',side<0?'end':'start')});
const relation=group(1320,.44),upper=add('g',{},relation),lower=add('g',{},relation);
add('circle',{cx:500,cy:1250,r:100,class:'wn-continuous-outline'},upper);text(upper,500,1230,'나','Self');
add('circle',{cx:500,cy:1390,r:100,class:'wn-continuous-outline'},lower);text(lower,500,1410,'타인','Others');

const us=text(relation,500,1320,'우리','Us','wn-continuous-us');
const culture=group(1800,.57);add('circle',{cx:500,cy:1800,r:104,class:'wn-continuous-glass wn-culture-glass'},culture);text(culture,500,1789,'관계 속 ‘우리’가','A sense of “us”','wn-continuous-label');text(culture,500,1817,'문화에 스며들다','woven into culture','wn-continuous-label');
function sideNote(y,at,lines){const g=group(y,at);add('path',{d:`M500 ${y}h50`,class:'wn-continuous-branch',pathLength:1,'stroke-dasharray':1},g);lines.forEach(([ko,en],i)=>{const t=text(g,572,y+(i-(lines.length-1)/2)*27,ko,en,'wn-editorial-heading wn-side-note');t.setAttribute('text-anchor','start')});return g}
sideNote(2020,.68,[['풍속화 속에','The “us” within'],['담긴 ‘우리’','genre paintings']]);
sideNote(2190,.76,[['시대는 달라도','Across different times,'],['이어지는 관계의 가치','connection lives on']]);
sideNote(2400,.87,[['K-Culture 속에','A sense of “us”'],['이어지는 ‘우리’','living on in K-Culture']]);
window.YEARONRelationMap=(p,alpha)=>{drawing.style.opacity=alpha;const step=p<.07?0:p<.39?1:p<.60?2:p<.87?3:4;drawing.dataset.chapter=['01 · ESSENCE','02 · FORMATION','03 · EXPANSION','04 · DISCOVERY','05 · CONTINUITY'][step];const camera=2615.5*clamp((p-.08)/.84);content.setAttribute('transform',`translate(0 ${-camera})`);const center=camera+270,traveled=clamp((center-374)/(2980-374));trace.style.strokeDashoffset=1-traveled;items.forEach(({g,y,at})=>{const reveal=at===0?1:(g===relation||g===culture)?1:range(center,y-35,y+5);g.style.opacity=reveal;g.querySelectorAll('[stroke-dasharray]').forEach(path=>path.style.strokeDashoffset=1-reveal)});upper.removeAttribute('transform');lower.removeAttribute('transform');us.style.opacity=1;maskLabels();};
// Mask the complete shapes, including their animated approach, instead of clipping around letters.
const shapeClearances=[...upper.querySelectorAll('circle'),...lower.querySelectorAll('circle'),...culture.querySelectorAll('circle')].map(el=>({el,cover:add('circle',{fill:'black'},threadMask)}));
function maskLabels(){const inverse=content.getCTM()?.inverse();if(!inverse)return;shapeClearances.forEach(({el,cover})=>{const relative=inverse.multiply(el.getCTM()),point=new DOMPoint(+el.getAttribute('cx'),+el.getAttribute('cy')).matrixTransform(relative);cover.setAttribute('cx',point.x);cover.setAttribute('cy',point.y);cover.setAttribute('r',+el.getAttribute('r'))})}
items.forEach(item=>{const offset=(item.y-270)*.35-(item.y>=1320?260:0);item.g.setAttribute('transform',`translate(0 ${offset})`);item.y+=offset});
const relationPosition=items.find(item=>item.g===relation).y;
function localize(){const en=window.YEARON_LANG==='en'||document.documentElement.lang==='en';labels.forEach(({e,ko,en:english})=>e.textContent=en?english:ko);maskLabels()}addEventListener('yearon-language-change',localize);localize();window.YEARONRelationMap(0,0);
})();
