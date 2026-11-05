const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
const expected=['매력','집합','조화','적응','방법'];
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),reports=[];try{
for(const [name,width,height,reducedMotion] of [['figma',1920,1080,'no-preference'],['desktop',1440,900,'no-preference'],['mobile',390,844,'reduce'],['small-mobile',320,740,'reduce']]){
if(process.argv[2]==='mobile'&&!name.includes('mobile'))continue;
const page=await browser.newPage({viewport:{width,height},reducedMotion}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/*',async route=>{const url=new URL(route.request().url());if(url.hostname!=='intro.test')return route.fulfill({status:200,contentType:'text/javascript',body:''});try{let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+path.sep))throw Error('unsafe');if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');await route.fulfill({status:200,contentType:types[path.extname(file)]||'application/octet-stream',body:await fs.readFile(file)});}catch{await route.fulfill({status:404,body:'Not found'});}});
await page.goto('http://intro.test/main/',{waitUntil:'domcontentloaded'});
await page.waitForFunction(()=>window.heroStudio?.ready&&window.MainIntroLoading?.inspect().phase==='done',null,{timeout:90000});await page.evaluate(()=>document.fonts.ready);
const details=await page.evaluate(()=>[...document.querySelectorAll('#content01 [data-read]')].map(word=>({text:word.querySelector('.reading-source').textContent,accent:[...word.querySelectorAll('.reading-accent')].map(x=>x.textContent).join(''),width:word.getBoundingClientRect().width,left:word.getBoundingClientRect().left,fontSize:parseFloat(getComputedStyle(word).fontSize),accentEnd:parseFloat(word.style.getPropertyValue('--read-accent-end')),popLeft:parseFloat(getComputedStyle(word.querySelector('.keyword-pop')).left)})));
assert.deepEqual(details.map(r=>r.accent),expected);assert.match(details[1].text,/집합입니다/);assert.match(details[4].text,/방법입니다/);
for(const row of details){assert.ok(row.left+row.width<=width-19,`${name}: text exceeds the viewport: ${row.text} (${row.width})`);assert.ok(Math.abs(row.popLeft-row.accentEnd-row.fontSize*.12)<1,`${name}: the pop should follow the highlighted keyword`);}
const scrollToProgress=async p=>{await page.evaluate(p=>{const intro=document.getElementById('content01');scrollTo({top:scrollY+intro.getBoundingClientRect().top+(p-.6)*innerHeight,behavior:'instant'});},p);await page.waitForTimeout(reducedMotion==='reduce'?100:750);};
for(let index=0;index<5;index++){await scrollToProgress(index*.2+.15);const fills=await page.evaluate(()=>[...document.querySelectorAll('#content01 [data-read]')].map(n=>parseFloat(n.style.getPropertyValue('--read-fill'))));assert.ok(fills.slice(0,index+1).every(v=>v===100),`${name}: revealed lines ${index}: ${fills}`);assert.ok(fills.slice(index+1).every(v=>v===0),`${name}: future lines stay dim: ${fills}`);}
await scrollToProgress(-.01);await page.waitForFunction(()=>[...document.querySelectorAll('#content01 [data-read]')].every(n=>parseFloat(n.style.getPropertyValue('--read-fill'))===0),null,{timeout:5000});
await scrollToProgress(.6);await page.screenshot({path:path.join(root,'output',`revised-copy-${name}.png`)});
if(name==='desktop'){
const accent=page.locator('#content01 .reading-line').nth(1).locator('.reading-accent').first();const box=await accent.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.waitForTimeout(350);
assert.ok(await page.evaluate(()=>[...document.querySelectorAll('#content01 .reading-char')].some(n=>getComputedStyle(n).transform!=='none'&&Math.abs(new DOMMatrix(getComputedStyle(n).transform).m41)>1)),'Hover still displaces the reading text');await page.mouse.move(0,0);
}
assert.deepEqual(errors,[]);const report={name,rows:details.map(({text,accent,width})=>({text,accent,width})),forwardAndReverse:true,errors};reports.push(report);console.log(JSON.stringify(report));await page.close();
}
await fs.writeFile(path.join(root,`output/revised-copy-validation${process.argv[2]==='mobile'?'-mobile-final':''}.json`),JSON.stringify(reports,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
