const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const angle=(a,b)=>2*Math.acos(Math.min(1,Math.abs(a.reduce((sum,x,i)=>sum+x*b[i],0))));

(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const report={};
  try{
    for(const mobile of [false,true]){
      const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:900}});
      const errors=[];page.on('pageerror',error=>errors.push(error.message));
      await page.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='flow.test')return route.fulfill({contentType:'text/javascript',body:''});
        try{
          let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
          if(!file.startsWith(root+path.sep))throw new Error('Unsafe test request');
          if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');
          await route.fulfill({path:file});
        }catch{await route.fulfill({status:404,body:''});}
      });
      await page.goto('http://flow.test/main/');
      await page.waitForFunction(()=>window.heroStudio?.ready&&MainIntroLoading.inspect().phase==='done',null,{timeout:90000});
      await page.evaluate(()=>{
        window.gridTop=()=>MainIntro.anchor()-document.querySelector('#scene').clientHeight*.85;
        window.cameraFrame=()=>{
          const state=heroStudio.inspect();
          return {time:performance.now(),progress:MainIntro.progress,timeline:state.camera.timeline,
            end:state.timelineEnd,pitch:state.camera.pitch,position:state.wordFlight?.position,
            quaternion:state.wordFlight?.quaternion,distance:state.wordFlight?.distance,gather:state.wordFlight?.gather,
            detailGather:state.wordFlight?.detailGather,detailFlight:state.wordFlight?.detailFlight};
        };
        scrollTo(0,gridTop()-100);
      });
      await page.waitForTimeout(900);
      const before=await page.evaluate(()=>cameraFrame());
      assert.ok(before.pitch<89.95&&before.quaternion,'Begin before the camera settles overhead');
      // Cross in one scroll frame while the pattern camera is still tilted.
      // Previously this replaced its pose with the terminal overhead camera.
      const crossing=await page.evaluate(async()=>{
        scrollTo(0,gridTop()+3);
        while(MainIntro.progress===0)await new Promise(requestAnimationFrame);
        return cameraFrame();
      });
      assert.ok(crossing.timeline<crossing.end&&crossing.pitch<89.95,
        `The live approach continues into SVG space: ${JSON.stringify(crossing)}`);
      await page.waitForTimeout(900);
      const settled=await page.evaluate(()=>cameraFrame());
      const firstTurn=angle(before.quaternion,crossing.quaternion),fullTurn=angle(before.quaternion,settled.quaternion);
      assert.ok(firstTurn<fullTurn*.9,'The first SVG frame preserves the approaching orientation');

      // Direction-specific timing must also remain continuous if a scrollbar
      // drag reverses halfway, rather than jumping to the other curve.
      const turns=await page.evaluate(async()=>{
        const poses=[];
        for(const p of [.8,.79,.8,0]){
          scrollTo(0,gridTop()+p*(MainIntro.anchor()-gridTop()));
          while(Math.abs(MainIntro.progress-p)>.003)await new Promise(requestAnimationFrame);
          poses.push(cameraFrame());
        }
        return poses;
      });
      assert.ok(turns[0].gather>.1&&turns[0].gather<.4,'Forward assembly keeps the original late timing');
      assert.ok(turns[1].gather<turns[0].gather&&turns[0].gather-turns[1].gather<.02,
        'Reversing a partial zoom starts from the current assembly');
      assert.ok(turns[2].gather>turns[1].gather&&turns[2].gather-turns[1].gather<.02,
        'Resuming the forward zoom does not snap to a different assembly');
      assert.equal(turns[3].gather,0);
      assert.ok(turns[1].detailGather<turns[0].detailGather&&turns[0].detailGather-turns[1].detailGather<.001,
        'Small icons begin unfolding gently from their current pose when a partial zoom reverses');
      assert.ok(turns[1].detailFlight<turns[0].detailFlight&&turns[0].detailFlight-turns[1].detailFlight<.001);
      assert.ok(Math.abs(turns[2].detailGather-turns[1].detailGather)<.02,
        'Resuming zoom out also preserves the gently unfolding small-icon pose');
      assert.equal(turns[3].detailGather,0);assert.equal(turns[3].detailFlight,0);

      // A single continued wheel gesture starts before the grid boundary and
      // carries the same shot all the way to the native SVG composition.
      await page.evaluate(()=>scrollTo(0,gridTop()-100));
      await page.waitForTimeout(900);
      await page.evaluate(()=>{
        window.flowFrames=[];
        const record=()=>{
          flowFrames.push(cameraFrame());
          if(!MainIntro.complete)requestAnimationFrame(record);
        };
        requestAnimationFrame(record);
      });
      await page.mouse.wheel(0,125);
      try{
        await page.waitForFunction(()=>MainIntro.complete&&!MainIntro.moving,null,{timeout:15000});
      }catch(error){
        console.error(await page.evaluate(()=>({moving:MainIntro.moving,offset:scrollY-gridTop(),last:flowFrames.at(-1)})));
        throw error;
      }
      await page.waitForFunction(()=>flowFrames.at(-1)?.progress===1);
      const frames=await page.evaluate(()=>flowFrames);
      const entry=frames.findIndex(frame=>frame.progress>0);
      assert.ok(entry>1&&frames.at(-1).progress===1,'One gesture includes the pattern approach and SVG landing');
      assert.ok(frames[entry-1].timeline>frames[0].timeline,'The pattern camera moves before the SVG entrance');
      assert.ok(frames.every((frame,i)=>!i||frame.progress>=frames[i-1].progress),'The shot never reverses at the seam');
      const seamTurn=angle(frames[entry-1].quaternion,frames[entry].quaternion);
      assert.ok(seamTurn<.025,`No angular cut on entry: ${seamTurn} radians`);
      const early=frames.find(frame=>frame.progress>=.08);
      assert.ok(early.distance/frames[entry].distance<1.05,'The camera eases away instead of kicking off the pattern');
      const cruising=frames.filter(frame=>frame.progress>.3&&frame.progress<.75);
      const speeds=cruising.flatMap((frame,i)=>{
        const next=cruising.slice(i+1).find(sample=>sample.time-frame.time>=180);
        return next?[Math.log(next.distance/frame.distance)/(next.time-frame.time)]:[];
      });
      const maxSpeed=Math.max(...speeds),averageSpeed=speeds.reduce((a,b)=>a+b,0)/speeds.length;
      assert.ok(maxSpeed<.00085&&maxSpeed<averageSpeed*1.4,'The dolly holds a calm speed without a mid-flight burst');
      assert.ok(frames.filter(frame=>frame.progress<=.56).every(frame=>frame.gather===0),
        'Forward gathering waits while the camera travels through the loose SVG field');
      assert.ok(frames.some(frame=>frame.progress>.6&&frame.progress<.8&&frame.gather>0&&frame.gather<.4),
        'The original gathering phase remains in the latter part of the zoom out');
      assert.ok(frames.every(frame=>Math.abs(frame.detailGather-frame.gather)<1e-8),
        'Gentle small-icon unfolding affects zoom in only; the full forward assembly stays unchanged');
      assert.equal(await page.evaluate(()=>MainWordSurface.inspect().step),1);
      const earlyReturn=await page.evaluate(async()=>{
        scrollTo(0,gridTop()+.88*(MainIntro.anchor()-gridTop()));
        while(Math.abs(MainIntro.progress-.88)>.003)await new Promise(requestAnimationFrame);
        return cameraFrame();
      });
      assert.ok(earlyReturn.detailGather>.96&&earlyReturn.detailGather<.98,
        'Small icons begin perceptible movement within the first 12% of zoom in, while still unfolding gently');
      assert.deepEqual(errors,[]);
      report[mobile?'mobile':'desktop']={firstTurn,fullTurn,seamTurn,maxSpeed,averageSpeed,frames:frames.length,earlyReturn,oneGesture:true,errors};
      await page.close();
    }
    await fs.mkdir(path.join(root,'output/submit-qa'),{recursive:true});
    await fs.writeFile(path.join(root,'output/submit-qa/main-camera-flow-validation.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
