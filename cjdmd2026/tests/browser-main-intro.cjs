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
      page.on('console',message=>{if(message.type()==='error'&&/Shader Error|VALIDATE_STATUS/.test(message.text()))errors.push(message.text());});
      await page.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='intro.test'){await route.fulfill({status:200,contentType:'text/javascript',body:''});return;}
        try{
          let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
          if(!file.startsWith(root+path.sep))throw new Error('Unsafe test request');
          if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');
          const body=await fs.readFile(file);
          await route.fulfill({status:200,contentType:types[path.extname(file)]||'application/octet-stream',body});
        }catch{await route.fulfill({status:404,body:'Not found'});}
      });
      await page.goto('http://intro.test/main/',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>window.heroStudio && window.MainWordSurface?.getSource('light').image?.complete,null,{timeout:90000});
      assert.equal(await page.evaluate(()=>heroStudio.ready),true);
      assert.equal(await page.evaluate(()=>typeof window.MainHeroIntro),'undefined','The scattered intro renderer is not active');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      if(mobile){
        await page.getByRole('button',{name:'메뉴 열기',exact:true}).click();
        await page.keyboard.press('Escape');await page.locator('.menu-button').evaluate(n=>n.blur());
      }
      await page.evaluate(()=>{
        window.gridTop=()=>MainIntro.anchor()-document.querySelector('#scene').clientHeight*.85;
        scrollTo(0,gridTop());
      });
      await page.waitForFunction(()=>{
        const {pitch,ending}=heroStudio.inspect().camera;
        return ending===1 && pitch>89.99999 && MainIntro.progress===0 && Math.abs(scrollY-gridTop())<2;
      },null,{timeout:15000});
      await page.waitForTimeout(450);
      assert.equal(await page.evaluate(()=>MainIntro.progress),0,'The flat grid waits for a new scroll');
      const field=await page.evaluate(()=>heroStudio.inspect().wordFlight);
      assert.equal(field.printsVisible,false,'The waiting grid has no floating or blurred foreground layer');
      assert.equal(field.gridInk,1);
      assert.equal(field.detailPrints,8);
      assert.equal(field.surroundings,await page.evaluate(()=>MainWordSurface.getSurroundings('light').length));
      assert.equal(field.layeredPieces,field.wordPieces,'Every real print has nonzero physical depth');
      assert.equal(field.sizeDepthOrdered,true,'All GPU instances follow SVG size order');
      assert.ok(field.sizeDepths[0].depth<.04&&field.sizeDepths.at(-1).depth>.8,'Tiny and large marks occupy distinct depths');
      assert.equal(await page.evaluate(()=>heroStudio.inspect().camera.groundShadows),false,'No contact shadows at the flat grid');
      assert.equal(field.wordPieces,await page.evaluate(()=>MainWordSurface.getSource('light').set.s.length));
      // Scrub to a known camera distance. Colored pixels sampled from the
      // resting grid must project to the same floor points, now with less ink.
      const fixedGrid=await page.evaluate(async()=>{
        const scene=document.querySelector('#scene canvas');
        const sample=document.createElement('canvas');
        sample.width=innerWidth;sample.height=innerHeight;
        const ctx=sample.getContext('2d',{willReadFrequently:true});
        const pixels=()=>{
          ctx.drawImage(scene,0,0,sample.width,sample.height);
          return ctx.getImageData(0,0,sample.width,sample.height).data;
        };
        const original=pixels(),grid=heroStudio.inspect().wordFlight;
        const checkpoint=.14;
        scrollTo(0,gridTop()+(MainIntro.anchor()-gridTop())*checkpoint);
        const started=performance.now();
        while(Math.abs(MainIntro.progress-checkpoint)>.003){
          if(performance.now()-started>8000)throw new Error('Could not scrub to the grid checkpoint');
          await new Promise(requestAnimationFrame);
        }
        const current=pixels(),{distance,frame,gridRecession}=heroStudio.inspect().wordFlight;
        const scale=grid.distance/(distance+gridRecession),pan=(distance-grid.distance)/(distance+gridRecession)/(1-1/grid.zoom);
        const dx=(frame.x+grid.detail.x*frame.w-innerWidth/2)*pan;
        const dy=(frame.y+grid.detail.y*frame.h-innerHeight/2)*pan;
        const ink=(image,x,y)=>{
          const i=4*(Math.round(y)*innerWidth+Math.round(x));
          return Math.max(image[i],image[i+1],image[i+2])-Math.min(image[i],image[i+1],image[i+2]);
        };
        let count=0,matches=0,rest=0,receded=0;
        for(let y=12;y<innerHeight-12;y+=7)for(let x=12;x<innerWidth-12;x+=7){
          const before=ink(original,x,y);
          if(before<50||Math.min(ink(original,x-2,y),ink(original,x+2,y),ink(original,x,y-2),ink(original,x,y+2))<50)continue;
          const after=ink(current,innerWidth/2+(x-innerWidth/2)*scale+dx,innerHeight/2+(y-innerHeight/2)*scale+dy);
          count++;if(after>before*.15)matches++;
          rest+=before;receded+=after;
        }
        return {count,anchored:matches/count,contrast:receded/rest};
      });
      assert.ok(fixedGrid.count>100&&fixedGrid.anchored>.95
        &&fixedGrid.contrast>.25&&fixedGrid.contrast<.9,`Fixed, distance-faded floor: ${JSON.stringify(fixedGrid)}`);
      // A held scroll position and a settled portrait should both keep swimming.
      // Read the rendered pixels; checking a clock alone would not catch a stopped renderer.
      const movement=async selector=>page.evaluate(async selector=>{
        const source=document.querySelector(selector),c=document.createElement('canvas');
        c.width=480;c.height=Math.round(c.width*innerHeight/innerWidth);
        const ctx=c.getContext('2d',{willReadFrequently:true});
        function snapshot(){
          ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(source,0,0,c.width,c.height);
          return ctx.getImageData(0,0,c.width,c.height).data;
        }
        await new Promise(requestAnimationFrame);
        const first=snapshot(),progress=MainIntro.progress;
        await new Promise(resolve=>setTimeout(resolve,500));
        await new Promise(requestAnimationFrame);
        const next=snapshot();
        if(Math.abs(MainIntro.progress-progress)>.001)throw new Error('Expected the camera to stay still');
        let diff=0;
        for(let i=0;i<next.length;i+=4)for(let k=0;k<3;k++)diff+=Math.abs(next[i+k]-first[i+k]);
        return diff/(3*c.width*c.height);
      },selector);
      await page.evaluate(()=>scrollTo(0,gridTop()+.5*(MainIntro.anchor()-gridTop())));
      await page.waitForFunction(()=>Math.abs(MainIntro.progress-.5)<.003);
      const halfwayInk=await page.evaluate(()=>heroStudio.inspect().wordFlight.gridInk);
      assert.ok(halfwayInk>.3 && halfwayInk<.7,'The rear pattern is still fading halfway through the zoom');
      await page.evaluate(()=>scrollTo(0,gridTop()+.68*(MainIntro.anchor()-gridTop())));
      await page.waitForFunction(()=>Math.abs(MainIntro.progress-.68)<.003);
      const flightDrift=await movement('#scene canvas');
      assert.ok(mobile?flightDrift===0:flightDrift>.04,`Swimming during held zoom: ${flightDrift}`);
      // Compare the same flight frame with and without the soft backdrop.
      // Count previously white pixels filled by the new marks, not just new instances.
      const filledPixels=await page.evaluate(async()=>{
        const surface=MainWordSurface,clock=Object.getOwnPropertyDescriptor(surface,'time');
        const getField=surface.getSurroundings,field=getField(surface.theme);
        const source=document.querySelector('#scene canvas'),sample=document.createElement('canvas');
        sample.width=innerWidth;sample.height=innerHeight;
        const ctx=sample.getContext('2d',{willReadFrequently:true});
        const nextFrame=()=>new Promise(requestAnimationFrame);
        async function capture(items){
          surface.getSurroundings=()=>items;
          dispatchEvent(new Event('main-word-layout'));
          await nextFrame();await nextFrame();
          ctx.drawImage(source,0,0,sample.width,sample.height);
          return ctx.getImageData(0,0,sample.width,sample.height).data;
        }
        try{
          Object.defineProperty(surface,'time',{configurable:true,value:surface.time});
          const without=await capture(field.filter(item=>!item.blurRatio)),withInk=await capture(field);
          let filled=0;
          for(let i=0;i<without.length;i+=4){
            const a=Math.min(without[i],without[i+1],without[i+2]);
            const b=Math.min(withInk[i],withInk[i+1],withInk[i+2]);
            if(a>=245 && a-b>=12)filled++;
          }
          return filled;
        }finally{
          Object.defineProperty(surface,'time',clock);surface.getSurroundings=getField;
          dispatchEvent(new Event('main-word-layout'));
        }
      });
      assert.ok(filledPixels>100,`The blurred backdrops occupy previously empty landing areas: ${filledPixels}`);
      await page.evaluate(()=>scrollTo(0,gridTop()));
      await page.waitForFunction(()=>MainIntro.progress===0);
      await page.evaluate(()=>{
        window.zoomFrames=[];
        window.fieldOutsideWord={};
        const sample=document.createElement('canvas');sample.width=160;sample.height=Math.round(160*innerHeight/innerWidth);
        const ctx=sample.getContext('2d',{willReadFrequently:true});
        const outerInk=()=>{
          ctx.drawImage(document.querySelector('#scene canvas'),0,0,sample.width,sample.height);
          const pixels=ctx.getImageData(0,0,sample.width,sample.height).data;
          let ink=0;
          for(let y=0;y<sample.height;y++)for(let x=0;x<sample.width;x++){
            if(x>=sample.width*.22&&x<sample.width*.78)continue;
            const i=(y*sample.width+x)*4;
            ink+=255-Math.min(pixels[i],pixels[i+1],pixels[i+2]);
          }
          return ink;
        };
        const record=()=>{
          if(MainIntro.progress>0){
            const {wordFlight:pose,camera}=heroStudio.inspect();
            if(pose){
              zoomFrames.push([MainIntro.progress,pose.zoom,pose.distance,pose.passedSizeStops.length,camera.groundShadows,pose.gridInk,pose.gridRecession,pose.gather,performance.now()]);
              if(pose.gather>.03 && pose.gather<.15 && fieldOutsideWord.scattered===undefined)fieldOutsideWord.scattered=outerInk();
              if(MainIntro.complete)fieldOutsideWord.joined=outerInk();
            }
          }
          if(!MainIntro.complete)requestAnimationFrame(record);
        };requestAnimationFrame(record);
      });
      if(mobile){
        await page.evaluate(()=>{
          const touch=y=>new Touch({identifier:1,target:document.body,clientX:180,clientY:y});
          document.body.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[touch(550)]}));
          document.body.dispatchEvent(new TouchEvent('touchmove',{bubbles:true,cancelable:true,touches:[touch(440)]}));
          document.body.dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[]}));
        });
      }else await page.mouse.wheel(0,125);
      await page.waitForFunction(()=>MainIntro.complete&&!MainIntro.moving,null,{timeout:12000});
      await page.waitForFunction(()=>zoomFrames.at(-1)?.[7]===1);
      const frames=await page.evaluate(()=>zoomFrames);
      assert.ok(frames.length>=2 && frames[0][1]>1 && Math.abs(frames.at(-1)[1]-1)<.001,JSON.stringify(frames));
      assert.ok(frames.every(([p,zoom,distance],i)=>!i||(p>=frames[i-1][0] && zoom<=frames[i-1][1] && distance>=frames[i-1][2])),
        'One scroll pulls the camera back continuously');
      assert.ok(frames[0][3]<frames.at(-1)[3] && frames.every((f,i)=>!i||f[3]>=frames[i-1][3]),'The camera crosses the size planes in increasing order');
      assert.ok(frames.every(f=>!f[4]),'The camera never renders the shadow layer while it recedes');
      assert.ok(frames.filter(f=>f[0]>=.70).every(f=>f[5]===0)&&frames.at(-1)[6]>field.distance*.8,'The receding grid finishes fading before the word lands');
      assert.equal(await page.evaluate(()=>MainWordSurface.inspect().sideSpread),1,'Surroundings are already in place on handoff');
      const depthRatio=frames.at(-1)[2]/field.distance;
      assert.ok(depthRatio>=9-1e-6&&depthRatio<=19+1e-6,'The word lands within the shorter grid-to-word distance');
      if(!mobile)assert.ok(new Set(frames.map(f=>f[3])).size>=4,'The camera passes successive real icon sizes');
      const joining=frames.filter(f=>f[7]>.02 && f[7]<.98);
      assert.ok(joining.length>=1 && joining.every(f=>f[0]<1 && f[1]>1),
        'The icons gather while the camera is still zooming out');
      if(!mobile)assert.ok(joining.at(-1)[8]-joining[0][8]>1300 && joining.at(-1)[2]>joining[0][2],
        'The gather develops gradually across a moving zoom');
      const outerInk=await page.evaluate(()=>fieldOutsideWord);
      if(!mobile)assert.ok(outerInk.scattered>outerInk.joined*2,`Original full-width field contracts into the portrait: ${JSON.stringify(outerInk)}`);
      const result=await page.evaluate(()=>{
        const scene=document.querySelector('#scene canvas'),canvas=document.getElementById('heroCanvas'),frame=MainWordSurface.frame;
        const c=document.createElement('canvas');c.width=240;c.height=Math.round(240*frame.h/frame.w);
        const ctx=c.getContext('2d',{willReadFrequently:true});
        function draw(...sources){
          ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);
          for(const source of sources){
            const sx=source.width/innerWidth,sy=source.height/innerHeight;
            ctx.drawImage(source,frame.x*sx,frame.y*sy,frame.w*sx,frame.h*sy,0,0,c.width,c.height);
          }
        }
        draw(scene);const actual=ctx.getImageData(0,0,c.width,c.height).data;
        const native=document.createElement('canvas');native.width=innerWidth;native.height=innerHeight;
        const composite=native.getContext('2d');
        for(const side of document.querySelectorAll('.hero-side-icons')){
          const r=side.getBoundingClientRect(),alpha=Number(getComputedStyle(side).opacity);
          if(alpha>0&&side.width>1){composite.globalAlpha=alpha;composite.drawImage(side,r.left,r.top,r.width,r.height);}
        }
        composite.globalAlpha=1;composite.drawImage(canvas,0,0,innerWidth,innerHeight);
        draw(native);
        const expected=ctx.getImageData(0,0,c.width,c.height).data;
        let error=0,ink=0;
        for(let i=0;i<actual.length;i+=4){
          error+=Math.abs(expected[i]-actual[i])+Math.abs(expected[i+1]-actual[i+1])+Math.abs(expected[i+2]-actual[i+2]);
          ink+=255-Math.min(actual[i],actual[i+1],actual[i+2]);
        }
        return {meanPixelError:error/(3*c.width*c.height),ink:ink/(c.width*c.height),wordStep:MainWordSurface.inspect().step,portrait:frame.h>frame.w};
      });
      assert.ok(result.portrait && result.wordStep===1);assert.ok(result.ink>5 && result.meanPixelError<18,
        `The flying fragments land precisely on the original vertical word: ${JSON.stringify(result)}`);
      const portraitDrift=await movement('#heroCanvas');
      assert.ok(mobile?portraitDrift===0:portraitDrift>.04,`Swimming after landing: ${portraitDrift}`);
      await page.waitForTimeout(500);
      await page.screenshot({path:path.join(root,`output/main-intro-${mobile?'mobile':'desktop'}-word.png`)});
      await page.keyboard.press('PageDown');
      await page.waitForFunction(()=>MainWordSurface.inspect().step===2 && !MainWordSurface.inspect().busy);
      await page.screenshot({path:path.join(root,`output/main-intro-${mobile?'mobile':'desktop'}-poster.png`)});
      await page.getByRole('tab',{name:'다크 포스터'}).click();
      await page.waitForFunction(()=>document.querySelector('#heroStage').dataset.theme==='dark');
      assert.match(await page.locator('#posterDownload').getAttribute('href'),/black\.pdf/);
      await page.getByRole('tab',{name:'다크 포스터'}).evaluate(n=>n.blur());
      await page.keyboard.press('PageDown');
      await page.waitForFunction(()=>scrollY>MainIntro.anchor()+100&&document.querySelector('main').dataset.sectionScrollState==='idle');
      await page.keyboard.press('PageUp');
      await page.waitForFunction(()=>Math.abs(scrollY-MainIntro.anchor())<2&&document.querySelector('main').dataset.sectionScrollState==='idle');
      await page.keyboard.press('PageUp');
      await page.waitForFunction(()=>MainWordSurface.inspect().step===1 && !MainWordSurface.inspect().busy);

      await page.keyboard.press('PageUp');
      await page.waitForFunction(()=>MainIntro.progress===0&&!MainIntro.moving&&Math.abs(scrollY-gridTop())<2,null,{timeout:12000});
      await page.waitForTimeout(400);
      assert.equal(await page.evaluate(()=>MainIntro.progress),0,'The grid stays parked after zooming back');
      await page.evaluate(()=>scrollTo(0,0));
      await page.waitForFunction(()=>heroStudio.inspect().camera.timeline===0);
      await page.waitForFunction(()=>!document.querySelector('.header').classList.contains('is-intro-hidden'));
      assert.deepEqual(errors,[]);
      report[mobile?'mobile':'desktop']={...result,fixedGrid,flightDrift,portraitDrift,filledPixels,zoomFrames:frames.length,forwardAndReverse:true,errors};
      await page.close();
    }
    await fs.writeFile(path.join(root,'output/main-intro-validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
