const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),report={};
  try{
    for(const mobile of [false,true]){
      const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:900},reducedMotion:mobile?'reduce':'no-preference',hasTouch:mobile});
      const errors=[];page.on('pageerror',error=>errors.push(error.message));
      await page.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='intro.test'){await route.fulfill({status:200,contentType:'text/javascript',body:''});return;}
        try{
          let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
          if(!file.startsWith(root+path.sep))throw new Error('Unsafe test request');
          if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');
          await route.fulfill({status:200,contentType:types[path.extname(file)]||'application/octet-stream',body:await fs.readFile(file)});
        }catch{await route.fulfill({status:404,body:'Not found'});}
      });
      await page.goto('http://intro.test/main/',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>window.heroStudio?.ready&&window.MainHeroIntro?.inspect().ready,{timeout:90000});
      await page.evaluate(()=>document.fonts.ready);
      assert.equal(await page.evaluate(()=>MainHeroIntro.inspect().step),0);
      assert.equal(await page.locator('.header').evaluate(n=>n.classList.contains('is-intro-hidden')),false);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      if(mobile){
        await page.getByRole('button',{name:'메뉴 열기',exact:true}).click();
        assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'true');
        await page.keyboard.press('Escape');await page.locator('.menu-button').evaluate(n=>n.blur());
      }else{
        await page.mouse.move(900,400);await page.mouse.wheel(0,300);
        await page.waitForFunction(()=>scrollY>20);
        assert.equal(await page.evaluate(()=>MainHeroIntro.inspect().step),0,'Intro scroll does not advance the poster');
      }
      await page.evaluate(()=>scrollTo(0,MainIntro.anchor()-innerHeight*.85-5));
      await page.waitForFunction(()=>heroStudio.inspect().camera.pitch===90);
      await page.screenshot({path:path.join(root,`output/main-intro-${mobile?'mobile':'desktop'}-grid.png`)});
      if(mobile){
        const cdp=await page.context().newCDPSession(page);
        await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:195,y:640}]});
        await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:195,y:480}]});
        await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      }else await page.mouse.wheel(0,150);
      await page.waitForFunction(()=>MainIntro.complete&&!MainIntro.moving,{timeout:15000});
      await page.waitForTimeout(550);
      const connected=await page.evaluate(()=>({main:MainHeroIntro.inspect(),offset:scrollY-MainIntro.anchor(),progress:MainIntro.progress,body:document.body.className}));
      assert.equal(connected.main.step,0);assert.ok(Math.abs(connected.offset)<2);assert.ok(connected.main.locked);
      const pixels=await page.locator('#heroCanvas').evaluate(canvas=>{
        const data=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;let colored=0;
        for(let i=0;i<data.length;i+=4)if(data[i+3]>20&&Math.max(data[i],data[i+1],data[i+2])-Math.min(data[i],data[i+1],data[i+2])>25)colored++;
        return colored;
      });assert.ok(pixels>1000,'Real scattered hero is visible after the handoff');
      await page.screenshot({path:path.join(root,`output/main-intro-${mobile?'mobile':'desktop'}-connected.png`)});
      await page.keyboard.press('PageDown');
      await page.waitForFunction(()=>MainHeroIntro.inspect().step===1&&!MainHeroIntro.inspect().busy,{timeout:20000});
      await page.keyboard.press('PageDown');
      await page.waitForFunction(()=>MainHeroIntro.inspect().step===2&&!MainHeroIntro.inspect().busy,{timeout:20000});
      await page.screenshot({path:path.join(root,`output/main-intro-${mobile?'mobile':'desktop'}-poster.png`)});
      await page.keyboard.press('PageDown');
      await page.waitForFunction(()=>scrollY>MainIntro.anchor()+100&&document.querySelector('main').dataset.sectionScrollState==='idle');
      await page.keyboard.press('PageUp');
      await page.waitForFunction(()=>Math.abs(scrollY-MainIntro.anchor())<2&&document.querySelector('main').dataset.sectionScrollState==='idle');
      await page.keyboard.press('PageUp');
      await page.waitForFunction(()=>MainHeroIntro.inspect().step===1&&!MainHeroIntro.inspect().busy);
      await page.keyboard.press('PageUp');
      await page.waitForFunction(()=>MainHeroIntro.inspect().step===0&&!MainHeroIntro.inspect().busy);
      await page.keyboard.press('PageUp');
      await page.waitForFunction(()=>MainIntro.progress<.001&&!MainIntro.moving,{timeout:15000});
      assert.equal(await page.evaluate(()=>MainHeroIntro.inspect().locked),false);
      await page.evaluate(()=>scrollTo(0,0));
      await page.waitForFunction(()=>heroStudio.inspect().camera.timeline===0);
      await page.waitForFunction(()=>!document.querySelector('.header').classList.contains('is-intro-hidden'));
      assert.deepEqual(errors,[]);
      report[mobile?'mobile':'desktop']={connected,coloredPixels:pixels,forwardAndReverse:true,errors};
      await page.close();
    }
    await fs.writeFile(path.join(root,'output/main-intro-validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
