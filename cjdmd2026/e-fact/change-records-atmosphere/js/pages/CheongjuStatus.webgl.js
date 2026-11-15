const host=document.querySelector('#holo-stage'), model=document.querySelector('#holo-model'), shell=model?.querySelector('.holo-shell');
if(host&&model&&shell){
 shell.querySelectorAll('img,.facility-geometry').forEach(e=>e.style.display='none');
 const canvas=document.createElement('canvas'); canvas.className='facility-webgl'; canvas.setAttribute('aria-label','마우스로 회전하는 청주 소각시설 3D 모형'); shell.append(canvas);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,premultipliedAlpha:false}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(); scene.fog=new THREE.FogExp2(0x020607,.018);
 const camera=new THREE.PerspectiveCamera(32,1,.1,100); camera.position.set(12,5.2,15); camera.lookAt(0,1.7,0);
 const root=new THREE.Group(); scene.add(root);
 const hemi=new THREE.HemisphereLight(0x75fbff,0x020607,2.1), key=new THREE.DirectionalLight(0x4cf9ff,5); key.position.set(-5,10,8); scene.add(hemi,key);
 const cyan=0x00bcc2, deep=0x020607;
 renderer.setClearColor(0x000000,0); renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.22;
 const surface=new THREE.MeshPhysicalMaterial({color:0x006f73,emissive:0x008f94,emissiveIntensity:.72,metalness:.42,roughness:.24,transparent:true,opacity:.38,side:THREE.DoubleSide,depthWrite:false});
 const equipment=new THREE.MeshPhysicalMaterial({color:0x00a5ab,emissive:0x008f94,emissiveIntensity:.85,metalness:.5,roughness:.2,transparent:true,opacity:.48,side:THREE.DoubleSide,depthWrite:false});
 const lineMat=new THREE.LineBasicMaterial({color:0x8cfcff,transparent:true,opacity:.92,depthWrite:false});
 const wireMat=new THREE.LineBasicMaterial({color:0x00bcc2,transparent:true,opacity:.16,depthWrite:false});
 function addMesh(mesh,wire=true){root.add(mesh);const edge=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,24),lineMat);mesh.add(edge);if(wire){const wf=new THREE.LineSegments(new THREE.WireframeGeometry(mesh.geometry),wireMat);mesh.add(wf)}return mesh}
 function slab(x,z,w,d,h,y,mat=surface){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y+h/2,z);return addMesh(m)}
 function box(x,z,w,d,h,roof=0){slab(x,z,w,d,h,0);const ribs=Math.max(3,Math.min(11,Math.floor(w/.55)));for(let i=1;i<ribs;i++){const rx=x-w/2+w*i/ribs;slab(rx,z,.025,d*.96,.035,h+.02,equipment)}const vents=Math.max(1,Math.min(4,Math.floor(w*d/5)));for(let i=0;i<vents;i++){const vx=x-w*.32+(vents===1?0:i*w*.64/(vents-1));cyl(vx,z-d*.16,.09,.28,false,h)}if(roof)slab(x,z,w*.96,d*.96,.07,h+.07,equipment);for(let y=.35;y<h;y+=.46)slab(x,z+d/2+.012,w*.9,.018,.025,y,equipment)}
 function cyl(x,z,r,h,stack=false,baseY=0){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r*(stack?.92:1),h,24,Math.max(2,Math.floor(h*2)),false),stack?equipment:surface);m.position.set(x,baseY+h/2,z);addMesh(m,true);for(let y=h*.18;y<h;y+=h*.18){const ring=new THREE.Mesh(new THREE.TorusGeometry(r*1.09,.025,6,32),equipment);ring.rotation.x=Math.PI/2;ring.position.set(x,baseY+y,z);root.add(ring)}if(stack){const crown=new THREE.Mesh(new THREE.TorusGeometry(r*1.3,.045,8,32),equipment);crown.rotation.x=Math.PI/2;crown.position.set(x,baseY+h,z);root.add(crown)}}
 function pipe(x,z,len,y,rot=0){const m=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,len,12,Math.max(2,Math.floor(len)),false),equipment);m.rotation.z=Math.PI/2;m.rotation.y=rot;m.position.set(x,y,z);addMesh(m,true);for(let k=-len*.38;k<=len*.38;k+=.7){const ring=new THREE.Mesh(new THREE.TorusGeometry(.115,.018,5,20),equipment);ring.rotation.y=Math.PI/2;ring.position.set(x+k*Math.cos(rot),y,z-k*Math.sin(rot));root.add(ring)}}
 function catwalk(x,z,w,d,y){slab(x,z,w,.08,.06,y,equipment);for(let i=-w/2;i<=w/2;i+=.5)cyl(x+i,z,.018,.42,false,y);slab(x,z,w,.025,.025,y+.42,equipment)}
 function siteDetails(l){l.b.forEach((v,i)=>{const[x,z,w,d,h]=v;if(i<3){catwalk(x,z+d*.53,w*.84,d,h*.62);if(i===0)pipe(x,z-d*.62,w*.72,h*.72,0)}});const pad=new THREE.Mesh(new THREE.BoxGeometry(10,.08,6.4),new THREE.MeshPhysicalMaterial({color:deep,emissive:0x006f73,emissiveIntensity:.4,transparent:true,opacity:.28,depthWrite:false}));pad.position.y=-.07;addMesh(pad,false)}
 const L=[
 {b:[[0,1,5.4,1.6,1.2,1],[-1.6,-1.3,3.2,1.4,2.2,1],[2.5,-.7,2,2.2,2.9,1],[-3.8,2,4.2,.8,.7,1]],s:[[3,-2,0.38,5.6]],t:[[1.2,-1.8,.65,1.4]],p:[[.4,-.2,5,2.8,0]]},
 {b:[[-1.8,0,5.2,1.7,2.2,1],[2.1,.3,2.4,1.8,3,1],[-3,-2,2.6,1,1.2,1],[.3,-2,3,1,1.4,1]],s:[[2.9,2,.34,4.8],[-.8,2,.25,3.2]],t:[[1.1,2,.58,1.9]],p:[[0,1.2,6,3.2,0]]},
 {b:[[-2,-.5,2.8,1.6,2.7,1],[0,-.9,1.8,1.8,2.3,1],[2.1,-.4,2.8,1.5,1.8,1],[-2.8,1.8,2,1.1,1.2,1],[-.4,1.9,2.2,1.1,1.7,1],[2,1.8,1.8,1,1.1,1]],s:[[-1.3,2,.28,4.5],[3,-1.8,.24,3.3]],t:[[.7,1.7,.55,1.5]],p:[[.2,.5,5.8,2.6,0]]},
 {b:[[-2,-.6,4.8,1.5,2,1],[2,-.7,3.6,1.4,2.1,1],[-2.8,1.5,2.8,1.2,1.4,1],[.4,1.6,2.2,1.1,1.3,1],[2.8,1.5,1.7,1,1.2,1]],s:[[0,0,.34,5],[3,-1.8,.22,3]],t:[[1.5,1.6,.5,1.4]],p:[[0,.4,6,2.5,0]]},
 {b:[[-.8,0,6.2,1.9,3.1,1],[-3,2,2,1,1.1,1],[2.8,1.7,2.1,1.3,2,1],[3.3,-1.7,1.5,1.5,2.4,1]],s:[[2,-2,.38,5.8],[.8,-2,.27,4]],t:[[3,1,.6,2]],p:[[1.3,-.7,4.8,3.4,0]]},
 {b:[[-1.6,0,6.4,1.8,2.2,1],[2.5,0,2.7,1.9,1.8,1],[-2.8,2.1,2.8,1,1.2,1],[.8,2.1,3.2,1,1.1,1]],s:[[3.5,-2,.3,4.2]],t:[[-3.2,-2,.8,.7],[-1.9,-2,.7,.7],[1.8,-2,.75,.7],[3.1,-2,.65,.7]],p:[[.5,.9,5,2.6,0]]},
 {b:[[-2,-.5,5.5,2,2,1],[2.2,-.5,3.8,2.1,2.3,1],[-2,2,5.2,.9,1.1,1],[2.1,2,3.6,1,1.3,1]],s:[[-3.2,-2,.3,4]],t:[[1.8,-2,.75,.7],[3.2,-2,.75,.7]],p:[[0,.8,6,2.4,0]]}
 ];
 function clear(){root.traverse(o=>{o.geometry?.dispose()});root.clear()}
 function build(i){clear();const l=L[i]||L[0];l.b.forEach(v=>box(...v));l.s.forEach(v=>cyl(...v,true));l.t.forEach(v=>cyl(...v,false));l.p.forEach(v=>pipe(...v));siteDetails(l);root.rotation.set(0,0,0);root.scale.setScalar(.92);}
 build(+(model.dataset.variant||0)); new MutationObserver(()=>build(+(model.dataset.variant||0))).observe(model,{attributes:true,attributeFilter:['data-variant']});
 const grid=new THREE.GridHelper(18,36,0x00bcc2,0x00484b);grid.material.transparent=true;grid.material.opacity=.15;scene.add(grid);
 for(let r=3;r<8;r+=1.5){const ring=new THREE.Mesh(new THREE.RingGeometry(r,r+.015,96),new THREE.MeshBasicMaterial({color:cyan,transparent:true,opacity:.18,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.02;scene.add(ring)}
 let yaw=-.65,pitch=0,down=false,sx=0,sy=0,syaw=0,spitch=0;
 canvas.addEventListener('pointerdown',e=>{e.stopPropagation();down=true;sx=e.clientX;sy=e.clientY;syaw=yaw;spitch=pitch;canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!down)return;e.stopPropagation();yaw=syaw+(e.clientX-sx)*.009;pitch=Math.max(-.15,Math.min(.45,spitch+(e.clientY-sy)*.006))});
 const up=e=>{if(!down)return;e.stopPropagation();down=false;canvas.releasePointerCapture?.(e.pointerId)};canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 function resize(){const r=host.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(host);resize();
 const scan=new THREE.Mesh(new THREE.CylinderGeometry(6.2,6.2,.035,96,1,true),new THREE.MeshBasicMaterial({color:cyan,transparent:true,opacity:.17,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(scan);let time=0;function draw(){time+=.008;if(!down)yaw+=.00065;root.rotation.y=yaw;root.rotation.x=pitch;scan.position.y=.2+(Math.sin(time)*.5+.5)*5.8;scan.material.opacity=.08+(Math.sin(time*2)*.5+.5)*.16;renderer.render(scene,camera);requestAnimationFrame(draw)}draw();
}
