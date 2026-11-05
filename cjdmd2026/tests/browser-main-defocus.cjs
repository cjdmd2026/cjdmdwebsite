const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),esbuild=require('esbuild');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');

(async()=>{
  // Hold the camera and SVGs still so the pixels measure only the blur entrance.
  // The override exists only in this in-memory test bundle.
  const bundle=await esbuild.build({entryPoints:[path.join(root,'js/main-intro/scene.js')],bundle:true,write:false,format:'iife',plugins:[{
    name:'defocus-control',setup(build){
      build.onLoad({filter:/grid-defocus\.js$/},async args=>({
        contents:(await fs.readFile(args.path,'utf8')).replace('render(camera,blur){','render(camera,blur){ blur=window.__testBlur ?? blur;'),
        resolveDir:path.dirname(args.path),loader:'js'
      }));
    }
  }]});
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*',async route=>{
      const url=new URL(route.request().url());
      if(url.hostname!=='defocus.test')return route.fulfill({contentType:'text/javascript',body:''});
      if(url.pathname==='/js/main-intro.js')return route.fulfill({contentType:'text/javascript',body:bundle.outputFiles[0].text});
      try{
        let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
        if(!file.startsWith(root+path.sep))throw new Error('Unsafe test path');
        if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');
        await route.fulfill({path:file});
      }catch{await route.fulfill({status:404,body:''});}
    });
    await page.goto('http://defocus.test/main/');
    await page.waitForFunction(()=>window.heroStudio?.ready&&MainIntroLoading.inspect().phase==='done',null,{timeout:90000});
    await page.evaluate(()=>{
      Object.defineProperty(MainWordSurface,'time',{value:MainWordSurface.time});
      window.__testBlur=0;
      scrollTo(0,MainIntro.anchor()-document.querySelector('#scene').clientHeight*.85*.75);
    });
    await page.waitForFunction(()=>MainIntro.progress>.24&&heroStudio.inspect().camera.timeline===heroStudio.inspect().timelineEnd);
    const results=[];
    for(const blur of [0,.011,.15,.4,1,2,0]){
      results.push(await page.evaluate(async blur=>{
        window.__testBlur=blur;dispatchEvent(new Event('main-word-layout'));
        await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);
        const source=document.querySelector('#scene canvas'),sample=document.createElement('canvas');
        sample.width=source.width;sample.height=source.height;
        const ctx=sample.getContext('2d');ctx.drawImage(source,0,0);
        const pixels=ctx.getImageData(0,0,sample.width,sample.height).data;
        if(!window.__sharpFrame)window.__sharpFrame=pixels;
        let ink=0,delta=0,changed=0;
        for(let i=0;i<pixels.length;i+=4){
          let edge=false;
          for(let k=0;k<3;k++){
            const difference=Math.abs(pixels[i+k]-__sharpFrame[i+k]);
            ink+=255-pixels[i+k];delta+=difference;if(difference>15)edge=true;
          }
          if(edge)changed++;
        }
        const count=sample.width*sample.height;
        return {blur,ink:ink/(3*count),delta:delta/(3*count),changed:changed/count};
      },blur));
    }
    assert.ok(results[0].ink>5,'The comparison contains visible pattern ink');
    assert.ok(results[1].delta<.05&&results[1].changed<.001,'Enabling blur does not abruptly resample the sharp pattern');
    assert.ok(results[2].delta<.2,'The initial softening remains gradual');
    assert.ok(results[4].delta>results[3].delta&&results[5].delta>results[4].delta,'Defocus increases progressively');
    assert.ok(results.every(result=>Math.abs(result.ink/results[0].ink-1)<.015),'Blur preserves total ink instead of adding a white veil');
    assert.ok(results.at(-1).delta<.01,'Reverse playback returns to the same sharp pattern');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({results,errors},null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
