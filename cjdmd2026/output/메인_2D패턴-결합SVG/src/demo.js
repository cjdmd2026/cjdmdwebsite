import * as THREE from 'three';
import {createFlatPattern} from './flat-pattern.js';
import {surface,fitSurface} from './word-surface.js';
import {createWordFlight} from './word-flight.js';
import {createMainHandoff,HANDOFF_VIEWPORTS} from './main-handoff.js';

// 앞선 인트로가 끝난 프레임을 시작점으로 두고, 다음 포스터로 넘어가지 않는다.
async function start(){
  const host=document.querySelector('#scene'), track=document.querySelector('#track');
  const button=document.querySelector('#move'),status=document.querySelector('#status');
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  scrollTo(0,0);
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  host.append(renderer.domElement);
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0xfafafa);scene.fog=new THREE.Fog(0xfafafa,10,17);
  const camera=new THREE.PerspectiveCamera(34,1,.1,250),gridCamera=camera.clone();
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({
    color:0xffffff,transparent:true,toneMapped:false,depthWrite:false
  }));
  floor.rotation.x=-Math.PI/2;floor.renderOrder=-1;scene.add(floor);
  const grid=createFlatPattern(scene,camera);
  window.MainIntro={complete:false,progress:0,inputUntil:0,anchor:()=>host.clientHeight*HANDOFF_VIEWPORTS};
  window.MainWordSurface=surface;
  fitSurface(host.clientWidth,host.clientHeight);
  let raf=0,ready=false,lastFrame=-Infinity,w=0,h=0,p=0,gather=0,detail={progress:0,gather:0,travel:1};
  const invalidate=()=>{if(ready&&!raf&&!document.hidden)raf=requestAnimationFrame(render);};
  const flight=createWordFlight(renderer,scene,invalidate);
  await flight.ready;
  const handoff=createMainHandoff(host,(next,joined,small)=>{
    p=next;gather=joined;detail=small;invalidate();
  });
  function render(now){
    raf=0;
    if(document.hidden)return;
    if(p===1&&!window.MainIntro.moving&&window.MainIntro.complete&&now-lastFrame<32){invalidate();return;}
    camera.copy(gridCamera,false);
    grid.group.visible=p<.88; // 이 지점을 지나면 원본의 패턴 불투명도도 0이다.
    flight.update(camera,floor,p,1,gather,detail);
    flight.render(camera);
    handoff.update(p,gather);
    button.textContent=p===1?'패턴으로 돌아가기 ↑':p===0?'결합 보기 ↓':window.MainIntro.moving?'전환 중…':'결합 보기 ↓';
    button.disabled=!!window.MainIntro.moving;
    if(p>0&&surface.motionEnabled)invalidate();
    lastFrame=now;
  }
  function resize(){
    if(w===host.clientWidth&&h===host.clientHeight)return;
    const previous=p;w=host.clientWidth;h=host.clientHeight;
    track.style.height=(h*(1+HANDOFF_VIEWPORTS))+'px';
    renderer.setPixelRatio(2);renderer.setSize(w,h,false);
    fitSurface(w,h);grid.fit(w,h);gridCamera.copy(camera,false);flight.fit(gridCamera,w,h);
    scrollTo(0,h*HANDOFF_VIEWPORTS*previous);handoff.readScroll();invalidate();
  }
  button.addEventListener('click',()=>handoff.travel(p<1));
  addEventListener('scroll',handoff.readScroll,{passive:true});
  addEventListener('resize',resize);new ResizeObserver(resize).observe(host);
  document.addEventListener('visibilitychange',invalidate);
  resize();ready=true;invalidate();status.hidden=true;button.hidden=false;
}
const fail=err=>{
  console.error(err);
  const status=document.querySelector('#status');
  status.innerHTML='애니메이션을 표시할 수 없습니다. <a href="art/gyeolhap.svg">결합 SVG 열기</a>';
  status.hidden=false;document.querySelector('#move').hidden=true;
};
start().catch(fail);
