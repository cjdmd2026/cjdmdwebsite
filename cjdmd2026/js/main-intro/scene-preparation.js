import * as THREE from 'three';

// Upload hidden geometry/textures and compile their actual material variants
// during the introduction, instead of paying that cost at each reveal wave.
export function createScenePreparation(renderer,scene,camera,onReady,onProgress=()=>{}){
  const layer=31,batchSize=12;
  let prepared=new WeakMap(),queue=[],generation=0,scheduled=0,running=false;
  let stats={ready:false,total:0,completed:0,batches:0,maxBatchMs:0,error:null};
  const materials=object=>Array.isArray(object.material)?object.material:[object.material];
  const signature=object=>[object.geometry?.uuid,...materials(object).flatMap(material=>
    [material.uuid,material.version,material.map?.uuid,material.map?.version])].join(':');

  function upload(batch){
    const viewport=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4());
    const scissorTest=renderer.getScissorTest(),autoClear=renderer.autoClear,background=scene.background;
    const cameraMask=camera.layers.mask,nodeStates=new Map(),materialStates=new Map(),geometryStates=new Map();
    const remember=node=>{
      if(!nodeStates.has(node))nodeStates.set(node,{visible:node.visible,mask:node.layers.mask,culled:node.frustumCulled});
    };
    try{
      // Use the real framebuffer/programs, but write no color or depth. A tiny
      // scissor and a single primitive avoid rendering the whole field offscreen.
      renderer.autoClear=false;scene.background=null;
      renderer.setViewport(0,0,1,1);renderer.setScissor(0,0,1,1);renderer.setScissorTest(true);
      camera.layers.set(layer);
      scene.traverse(node=>{if(node.isLight){remember(node);node.layers.enable(layer);}});
      for(const {object} of batch){
        remember(object);object.visible=true;object.frustumCulled=false;object.layers.enable(layer);
        for(let parent=object.parent;parent;parent=parent.parent){remember(parent);parent.visible=true;}
        for(const material of materials(object)){
          if(!materialStates.has(material))materialStates.set(material,{colorWrite:material.colorWrite,depthWrite:material.depthWrite});
          material.colorWrite=false;material.depthWrite=false;
        }
        const geometry=object.geometry;
        if(geometry&&!geometryStates.has(geometry)){
          geometryStates.set(geometry,{...geometry.drawRange});
          geometry.setDrawRange(0,Math.min(3,geometry.index?.count||geometry.attributes.position.count));
        }
      }
      renderer.render(scene,camera);
    }finally{
      for(const [geometry,range] of geometryStates)geometry.setDrawRange(range.start,range.count);
      for(const [material,state] of materialStates)Object.assign(material,state);
      for(const [node,state] of nodeStates){
        node.visible=state.visible;node.layers.mask=state.mask;node.frustumCulled=state.culled;
      }
      camera.layers.mask=cameraMask;scene.background=background;renderer.autoClear=autoClear;
      renderer.setViewport(viewport);renderer.setScissor(scissor);renderer.setScissorTest(scissorTest);
    }
  }

  function schedule(){
    if(scheduled||running||!queue.length||document.hidden)return;
    scheduled=window.requestIdleCallback?requestIdleCallback(run,{timeout:120}):setTimeout(run,16);
  }
  async function run(){
    scheduled=0;if(running||document.hidden)return;
    running=true;
    // Keep large texture and vertex uploads from entering the GPU queue in a
    // single burst. Small line and guide buffers can still share a batch.
    const version=generation;
    let count=1,bytes=queue[0].bytes;
    while(count<queue.length && count<batchSize && bytes+queue[count].bytes<=4*1024*1024){
      bytes+=queue[count].bytes;
      count++;
    }
    const batch=queue.splice(0,count);
    try{
      // Compile without changing the live scene's visibility while waiting for
      // KHR_parallel_shader_compile. Rendering can continue in the meantime.
      await Promise.all(batch.map(({object})=>renderer.compileAsync(object,camera,scene)));
      if(version!==generation)return;
      const start=performance.now();upload(batch);
      stats.maxBatchMs=Math.max(stats.maxBatchMs,performance.now()-start);
      for(const {object} of batch)prepared.set(object,signature(object));
      stats.completed+=batch.length;stats.batches++;
      if(!queue.length)stats.ready=true;
      onProgress({...stats});
      if(stats.ready)onReady();
    }catch(error){
      // Preparation is optional; an unsupported driver must not prevent playback.
      if(version===generation){stats.error=String(error);queue=[];onProgress({...stats});}
    }finally{running=false;schedule();}
  }

  function prepare(){
    generation++;
    const resources=[];
    scene.traverse(object=>{if(object.material&&(object.isMesh||object.isLine||object.isPoints||object.isSprite))resources.push(object);});
    queue=resources.filter(object=>prepared.get(object)!==signature(object)).map(object=>{
      const geometry=object.geometry;
      let bytes=geometry?.index?.array.byteLength||0;
      for(const attribute of Object.values(geometry?.attributes||{}))bytes+=attribute.array.byteLength;
      for(const material of materials(object)){
        const image=material.map?.image;
        if(image?.width && image.height)bytes+=4*image.width*image.height;
      }
      return {object,bytes};
    });
    // Solids and their shadow atlases go first; the much smaller construction
    // lines follow. Resizing queues only newly created or changed resources.
    queue.sort((a,b)=>(a.object.isInstancedMesh?0:a.object.isMesh?1:2)-(b.object.isInstancedMesh?0:b.object.isMesh?1:2));
    stats={ready:queue.length===0,total:resources.length,completed:resources.length-queue.length,batches:0,maxBatchMs:0,error:null};
    onProgress({...stats});
    if(stats.ready)onReady();
    schedule();
  }
  document.addEventListener('visibilitychange',schedule);
  renderer.domElement.addEventListener('webglcontextrestored',()=>{prepared=new WeakMap();prepare();});
  return {prepare,inspect:()=>({...stats,pending:stats.total-stats.completed})};
}
