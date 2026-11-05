const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../public-dist'),output=path.resolve(__dirname,'../output/submit-qa');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
(async()=>{
  await fs.mkdir(output,{recursive:true});
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try{
    const scenarios=process.argv.slice(2);
    for(const scenario of scenarios.length?scenarios:['desktop','mobile','resize','script-failure','gpu-failure']){
      const started=Date.now();
      const mobile=scenario==='mobile';
      const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:900},reducedMotion:mobile?'reduce':'no-preference'});
      const errors=[];page.on('pageerror',error=>errors.push(error.message));
      await page.addInitScript(()=>{
        window.loadingSamples=[];
        new MutationObserver(records=>{
          for(const record of records)if(record.attributeName==='aria-valuenow'&&record.target.id==='introLoader'){
            loadingSamples.push({value:Number(record.target.getAttribute('aria-valuenow')),prepared:window.heroStudio?.inspect().preparation.ready});
          }
        }).observe(document,{subtree:true,attributes:true,attributeFilter:['aria-valuenow']});
      });
      await page.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='loading.test')return route.fulfill({status:200,contentType:'text/javascript',body:''});
        if(url.pathname==='/js/main-intro.js'){
          if(scenario==='script-failure')return route.abort();
          // Keep the initial zero state observable even on a warm local cache.
          await new Promise(resolve=>setTimeout(resolve,1200));
        }
        try{
          let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
          if(!file.startsWith(root+path.sep))throw new Error('Unsafe path');
          if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');
          let body=await fs.readFile(file);
          if(scenario==='gpu-failure'&&url.pathname==='/js/main-intro.js'){
            const esbuild=require('esbuild');
            const bundle=await esbuild.build({entryPoints:[path.resolve(__dirname,'../js/main-intro/scene.js')],bundle:true,write:false,format:'iife',plugins:[{name:'failed-preparation',setup(build){
              build.onLoad({filter:/scene-preparation\.js$/},async args=>({contents:(await fs.readFile(args.path,'utf8')).replace('await Promise.all(batch.map','throw new Error("Simulated shader preparation failure"); await Promise.all(batch.map'),resolveDir:path.dirname(args.path),loader:'js'}));
            }}]});
            body=bundle.outputFiles[0].text;
          }
          return route.fulfill({contentType:types[path.extname(file)]||'application/octet-stream',body});
        }catch{return route.fulfill({status:404,body:'Not found'});}
      });
      await page.goto('http://loading.test/main/',{waitUntil:'commit'});
      if(scenario!=='script-failure'){
        await page.waitForFunction(()=>window.MainIntroLoading?.inspect().phase==='loading');
        const start=await page.evaluate(()=>({state:MainIntroLoading.inspect(),fill:getComputedStyle(document.querySelector('.intro-loader-fill')).clipPath,heroOpacity:getComputedStyle(document.querySelector('.hero-art')).opacity}));
        assert.equal(start.state.progress,0);assert.equal(start.heroOpacity,'0');assert.match(start.fill,/100%/);
        if(scenario==='desktop')await page.screenshot({path:path.join(output,'main-loading-0.png')});
        await page.mouse.wheel(0,700);await page.keyboard.press('PageDown');
        assert.equal(await page.evaluate(()=>scrollY),0);
        assert.equal(await page.evaluate(()=>document.querySelector('main').inert),true);
      }
      if(scenario==='desktop'){
        await page.waitForFunction(()=>MainIntroLoading.inspect().progress>=25&&MainIntroLoading.inspect().phase==='loading',null,{timeout:90000});
        await page.screenshot({path:path.join(output,'main-loading-progress.png')});
      }
      if(scenario==='resize'){
        await page.waitForFunction(()=>window.heroStudio?.ready&&!heroStudio.inspect().preparation.ready,null,{timeout:90000});
        await page.setViewportSize({width:1024,height:768});
        await page.setViewportSize({width:390,height:844});
      }
      if(scenario==='desktop'){
        await page.waitForFunction(()=>MainIntroLoading.inspect().phase==='revealing',null,{timeout:90000});
        const reveal=await page.evaluate(()=>({progress:MainIntroLoading.inspect().progress,opacity:Number(getComputedStyle(document.querySelector('.hero-art')).opacity),blur:getComputedStyle(document.querySelector('.hero-art')).filter,prepared:heroStudio.inspect().preparation.ready}));
        assert.equal(reveal.progress,100);assert.equal(reveal.prepared,true);assert(reveal.opacity<1);assert.match(reveal.blur,/blur/);
        await page.screenshot({path:path.join(output,'main-loading-reveal.png')});
      }
      await page.waitForFunction(()=>window.MainIntroLoading?.inspect().phase==='done',null,{timeout:90000});
      // Unlocking scroll can requeue resources for the final viewport width.
      if(scenario==='gpu-failure')await page.waitForFunction(()=>heroStudio.inspect().preparation.error);
      const result=await page.evaluate(()=>({state:MainIntroLoading.inspect(),hidden:document.getElementById('introLoader').hidden,inert:document.querySelector('main').inert,busy:document.querySelector('main').getAttribute('aria-busy'),samples:loadingSamples,overflow:document.documentElement.scrollWidth>innerWidth,heroOpacity:getComputedStyle(document.querySelector('.hero-art')).opacity,heroBlur:getComputedStyle(document.querySelector('.hero-art')).filter,ready:window.heroStudio?.ready,preparation:window.heroStudio?.inspect?.().preparation,fallback:document.body.classList.contains('intro-unavailable')}));
      assert(result.hidden&&!result.inert&&!result.overflow);assert.equal(result.busy,'false');assert.deepEqual(errors,[]);
      assert(result.samples.every((sample,index)=>!index||sample.value>=result.samples[index-1].value));
      if(scenario.endsWith('failure')){
        assert(result.state.progress<100);
        if(scenario==='script-failure'){assert(result.fallback);assert(Date.now()-started<15000,'A failed bundle must release loading promptly');}
        else assert(result.preparation.error);
      }else{
        assert.equal(result.state.progress,100);assert.equal(result.ready,true);assert.equal(result.heroOpacity,'1');assert.equal(result.heroBlur,'none');
        assert(result.samples.some(sample=>sample.value>0&&sample.value<70));
        assert(result.samples.some(sample=>sample.value>=70&&sample.value<100));
        assert(result.samples.filter(sample=>sample.value===100).every(sample=>sample.prepared));
        if(mobile||scenario==='desktop')await page.screenshot({path:path.join(output,`main-loaded-${scenario}.png`)});
        await page.evaluate(()=>scrollTo(0,innerHeight*.5));assert(await page.evaluate(()=>scrollY)>0);
      }
      console.log(JSON.stringify({scenario,progress:result.state.progress,updates:result.samples.length,elapsedMs:Date.now()-started,preparationError:result.preparation?.error||null,errors}));
      await page.close();
    }
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
