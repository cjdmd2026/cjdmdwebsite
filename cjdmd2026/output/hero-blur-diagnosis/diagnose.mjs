import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const root = process.cwd();
const out = path.join(root, 'output/hero-blur-diagnosis');
const profile = path.join(out, 'chrome-profile');
await fs.mkdir(profile, { recursive: true });
const original = await fs.readFile(path.join(root, 'js/main-hero.js'), 'utf8');
const hook = `
    window.__heroDiag = {
      ready: () => ready(atlasNow()),
      draw(p) {
        step = p === 0 ? 0 : 1;
        Object.assign(V, { fly:p, graphic:0, dissolve:0, move:0, reveal:0, sideSpread:0, sideOpacity:0 });
        assembledTime = scatterTime = 0; lastIconTime = 0; lastIconState = '';
        renderIcons(1000);
        return {W,H,DPR,blurRatio:blurPixelRatio(),iconCount:iconsNow().length, layers:[canvas,...blurLayers.map(l=>l.canvas)].map(c=>({id:c.id,w:c.width,h:c.height,filter:c.style.filter,visibility:c.style.visibility}))};
      },
      composite() {
        const c = document.createElement('canvas'); c.width=W*DPR; c.height=H*DPR;
        const g=c.getContext('2d'); g.fillStyle='white';g.fillRect(0,0,c.width,c.height);
        for(const source of [...blurLayers].reverse().map(l=>l.canvas).concat(canvas)) {
          if(source.style.visibility==='hidden') continue;
          g.filter=source.style.filter||'none';g.drawImage(source,0,0,c.width,c.height);
        }
        return c;
      },
      saveBefore(){ this.before=this.composite(); },
      compare(){
        const after=this.composite(), w=after.width,h=after.height;
        const a=this.before.getContext('2d').getImageData(0,0,w,h).data,b=after.getContext('2d').getImageData(0,0,w,h).data;
        let changed=0,strong=0,total=0,inkBefore=0,inkAfter=0,occupied=0;
        for(let i=0;i<a.length;i+=4){let d=0;for(let k=0;k<3;k++){d+=Math.abs(a[i+k]-b[i+k]);inkBefore+=255-a[i+k];inkAfter+=255-b[i+k];}total+=d;if(d)changed++;if(d>30)strong++;if(a[i]<250||a[i+1]<250||a[i+2]<250||b[i]<250||b[i+1]<250||b[i+2]<250)occupied++;}
        return {changedPixels:changed,strongPixels:strong,occupiedPixels:occupied,meanRGBDifference:total/(w*h*3),inkChangePercent:(inkAfter/inkBefore-1)*100};
      }
    };`;
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
const report={mode:'Headless Chromium / SwiftShader, deterministic frames; not a real-device performance benchmark',cases:[]};
let ws;
try {
  let devPort;
  for(let i=0;i<100;i++){try{devPort=(await fs.readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];break;}catch{await sleep(100);}}
  if(!devPort)throw new Error('Chrome startup: '+chromeLog);
  const tabs=await(await fetch(`http://127.0.0.1:${devPort}/json/list`)).json();
  ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((r,j)=>{ws.addEventListener('open',r,{once:true});ws.addEventListener('error',j,{once:true});});
  let next=0;const pending=new Map();
  ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p?.reject(new Error(JSON.stringify(m.error)));else p?.resolve(m.result);}});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  await send('Page.enable');await send('Runtime.enable');
  for(const [width,height,dpr] of [[1440,900,1],[1440,900,2],[1920,1080,1]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:dpr,mobile:false});
    await send('Page.navigate',{url:`http://127.0.0.1:${port}/main/`});
    let ready=false;
    for(let i=0;i<160;i++){ready=await evaluate('!!window.__heroDiag?.ready()');if(ready)break;await sleep(100);}
    if(!ready)throw new Error('Hero did not initialize');
    await evaluate('document.fonts.ready');await sleep(250);
    const label=`${width}x${height}-dpr${dpr}`;
    const before=await evaluate('__heroDiag.draw(.999999)');
    await evaluate('__heroDiag.saveBefore()');
    const shotBefore=await send('Page.captureScreenshot',{format:'png'});
    await fs.writeFile(path.join(out,label+'-before.png'),Buffer.from(shotBefore.data,'base64'));
    const after=await evaluate('__heroDiag.draw(1)');
    const difference=await evaluate('__heroDiag.compare()');
    const shotAfter=await send('Page.captureScreenshot',{format:'png'});
    await fs.writeFile(path.join(out,label+'-after.png'),Buffer.from(shotAfter.data,'base64'));
    report.cases.push({label,before,after,difference});
    console.log(JSON.stringify({label,difference,buffers:{blur:before.layers[1].w,sharp:before.layers[0].w}}));
  }
}catch(error){report.failure=error.stack;process.exitCode=1;console.log(report.failure);}
finally{ws?.close();chrome.kill();server.close();await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));}
