import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const root = process.cwd();
const out = path.join(root, 'output/hero-blur-fix-qa');
const profile = path.join(out, 'chrome-profile');
await fs.mkdir(profile, { recursive: true });
await fs.rm(path.join(profile, 'DevToolsActivePort'), { force: true });
const original = await fs.readFile(path.join(root, 'js/main-hero.js'), 'utf8');
const hook = `
    if (location.search.includes('fallback')) window.createHeroSpriteBatch = () => null;
    window.__heroDiag = {
      ready: () => ready(atlasNow()),
      draw(p, direction = 1, theme = 0) {
        current = theme;
        step = p === 0 ? 0 : direction;
        Object.assign(V, { fly:p, graphic:0, dissolve:0, move:0, reveal:0, sideSpread:0, sideOpacity:0 });
        assembledTime = scatterTime = 0; lastIconTime = 0; lastIconState = '';
        renderIcons(1000);
        return {W,H,DPR,gpu:!!iconBatch,iconCount:iconsNow().length,buffer:[canvas.width,canvas.height]};
      },
      composite() {
        const c = document.createElement('canvas'); c.width=W*DPR; c.height=H*DPR;
        const g=c.getContext('2d'); g.fillStyle='white';g.fillRect(0,0,c.width,c.height);
        g.drawImage(canvas,0,0,c.width,c.height);
        return c;
      },
      saveBefore(){ this.before=this.composite(); },
      compare(){
        const after=this.composite(), w=after.width,h=after.height;
        const a=this.before.getContext('2d').getImageData(0,0,w,h).data,b=after.getContext('2d').getImageData(0,0,w,h).data;
        let changed=0,strong=0,total=0,inkBefore=0,inkAfter=0,occupied=0;
        for(let i=0;i<a.length;i+=4){let d=0;for(let k=0;k<3;k++){d+=Math.abs(a[i+k]-b[i+k]);inkBefore+=255-a[i+k];inkAfter+=255-b[i+k];}total+=d;if(d)changed++;if(d>30)strong++;if(a[i]<250||a[i+1]<250||a[i+2]<250||b[i]<250||b[i+1]<250||b[i+2]<250)occupied++;}
        return {changedPixels:changed,strongPixels:strong,occupiedPixels:occupied,meanRGBDifference:total/(w*h*3),inkChangePercent:(inkAfter/inkBefore-1)*100};
      },
      loseContext(){ iconCanvas.getContext('webgl').getExtension('WEBGL_lose_context').loseContext(); },
      state: () => ({step,busy,gpu:!!iconBatch,fly:V.fly,theme:themeOf()})
    };
    if (location.search.includes('live')) requestAnimationFrame(loop);`;
if (!original.endsWith('})();\n') && !original.endsWith('})();\r\n')) throw new Error('Unexpected source ending');
const diagnosticSource = original.replace('    requestAnimationFrame(loop);\n})();', hook+'\n})();').replace('    requestAnimationFrame(loop);\r\n})();',hook+'\r\n})();');
if(diagnosticSource === original) throw new Error('Hook did not attach');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://localhost');
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    if(file!==root&&!file.startsWith(root+path.sep)) throw new Error('Outside root');
    if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');
    const body=file===path.join(root,'js/main-hero.js')?diagnosticSource:await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
  } catch {res.writeHead(404);res.end('Not found');}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const port=server.address().port;
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','--disable-background-networking','--use-angle=swiftshader','--enable-unsafe-swiftshader','--window-size=1440,900','about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
let chromeLog='';chrome.stderr.on('data',d=>chromeLog+=d);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const report={mode:'Headless Chromium / SwiftShader, deterministic frames; not a real-device performance benchmark',cases:[],errors:[],checks:[]};
const check=(ok,message)=>{if(!ok)throw new Error(message);};
let ws;
try {
  let devPort;
  for(let i=0;i<100;i++){try{devPort=(await fs.readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];break;}catch{await sleep(100);}}
  if(!devPort)throw new Error('Chrome startup: '+chromeLog);
  const tabs=await(await fetch(`http://127.0.0.1:${devPort}/json/list`)).json();
  ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((r,j)=>{ws.addEventListener('open',r,{once:true});ws.addEventListener('error',j,{once:true});});
  let next=0;const pending=new Map();
  ws.addEventListener('close',()=>{for(const p of pending.values())p.reject(new Error('Browser closed'));pending.clear();});
  ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p?.reject(new Error(JSON.stringify(m.error)));else p?.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')report.errors.push(m.params.exceptionDetails);});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout: '+method));},30000);pending.set(id,{resolve:r=>{clearTimeout(timer);resolve(r);},reject:e=>{clearTimeout(timer);reject(e);}});ws.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  await send('Page.enable');await send('Runtime.enable');
  const until=async(expression,label)=>{for(let i=0;i<200;i++){if(await evaluate(expression))return;await sleep(100);}throw new Error('Timeout: '+label);};
  const go=async query=>{await send('Page.navigate',{url:`http://127.0.0.1:${port}/main/${query}`});await until('!!window.__heroDiag?.ready()','hero initialized');await evaluate('document.fonts.ready');await sleep(250);};
  const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(path.join(out,name+'.png'),Buffer.from(r.data,'base64'));};
  for(const [width,height,dpr] of [[1440,900,1],[1440,900,2],[1920,1080,1],[390,844,2]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:dpr,mobile:false});
    await send('Page.navigate',{url:`http://127.0.0.1:${port}/main/`});
    let ready=false;
    for(let i=0;i<160;i++){ready=await evaluate('!!window.__heroDiag?.ready()');if(ready)break;await sleep(100);}
    if(!ready)throw new Error('Hero did not initialize');
    await evaluate('document.fonts.ready');await sleep(250);
    const label=`${width}x${height}-dpr${dpr}`;
    const before=await evaluate('__heroDiag.draw(.999999)');
    check(before.gpu,'The WebGL renderer failed to initialize');
    await evaluate('__heroDiag.saveBefore()');
    const shotBefore=await send('Page.captureScreenshot',{format:'png'});
    await fs.writeFile(path.join(out,label+'-before.png'),Buffer.from(shotBefore.data,'base64'));
    const after=await evaluate('__heroDiag.draw(1)');
    const difference=await evaluate('__heroDiag.compare()');
    const shotAfter=await send('Page.captureScreenshot',{format:'png'});
    await fs.writeFile(path.join(out,label+'-after.png'),Buffer.from(shotAfter.data,'base64'));
    report.cases.push({label,before,after,difference});
    check(difference.strongPixels===0,'End-of-gather discontinuity: '+label);
    console.log(JSON.stringify({label,difference}));
    await evaluate('__heroDiag.draw(.999999,0)');
    const reverse=await evaluate('__heroDiag.compare()');
    check(reverse.strongPixels===0,'Reverse start discontinuity: '+label);
    report.cases.at(-1).reverse=reverse;
    if(width===1440&&dpr===1){for(const p of [0,.25,.5,.75]){await evaluate('__heroDiag.draw('+p+')');await shot('gather-'+p);}}
  }
  report.checks.push('Gather completion and reverse start have no strong pixel discontinuity at desktop, high DPI, Full HD and mobile sizes');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await go('');
  await until("!!window.MAIN_POSTER_SPRITES.dark",'dark data');
  await evaluate('__heroDiag.draw(.999999,1,1)');await evaluate('__heroDiag.saveBefore()');
  await evaluate('__heroDiag.draw(1,1,1)');
  report.dark=await evaluate('__heroDiag.compare()');check(report.dark.strongPixels===0,'Dark end discontinuity');
  console.log('Dark continuity passed; testing context loss');
  await evaluate('__heroDiag.loseContext()');await sleep(100);
  const lost=await evaluate('__heroDiag.draw(.5)');check(!lost.gpu,'Lost WebGL context should use 2D');
  console.log('Context loss fallback passed');
  report.checks.push('Dark atlas transition and WebGL context-loss fallback rendered');
  await go('?fallback');
  check(!(await evaluate('__heroDiag.draw(.5)')).gpu,'Forced 2D fallback did not activate');await shot('fallback-mid');
  await evaluate('__heroDiag.draw(.999999)');await evaluate('__heroDiag.saveBefore()');await evaluate('__heroDiag.draw(1)');
  report.fallback=await evaluate('__heroDiag.compare()');check(report.fallback.strongPixels===0,'Fallback end discontinuity');
  report.checks.push('2D fallback has no completion discontinuity');
  console.log('Forced fallback passed; testing live wheel events');
  await go('?live');
  const wheel=dir=>send('Input.dispatchMouseEvent',{type:'mouseWheel',x:1000,y:650,deltaX:0,deltaY:dir*100});
  const step=n=>until(`__heroDiag.state().step===${n}&&!__heroDiag.state().busy`,'live step '+n);
  await wheel(1);await step(1);await shot('live-assembled');
  await wheel(1);await step(2);await shot('live-poster');
  await wheel(-1);await step(1);await wheel(-1);await step(0);
  report.checks.push('Real wheel transitions 0 -> 1 -> 2 -> 1 -> 0 completed');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await go('?live');await wheel(1);await step(1);
  report.checks.push('Reduced-motion assembly completed');
  check(report.errors.length===0,'Browser exceptions: '+JSON.stringify(report.errors));
  report.success=true;
  console.log(JSON.stringify({success:true,checks:report.checks}));
}catch(error){report.failure=error.stack;process.exitCode=1;console.log(report.failure);}
finally{ws?.close();chrome.kill();server.close();await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));}
