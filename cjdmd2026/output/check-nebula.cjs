const fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});try{
for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
const page=await browser.newPage({viewport:{width,height}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/*',async route=>{const url=new URL(route.request().url());if(url.hostname!=='intro.test')return route.fulfill({status:200,contentType:'text/javascript',body:''});try{let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+path.sep))throw Error('unsafe');if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');await route.fulfill({status:200,contentType:types[path.extname(file)]||'application/octet-stream',body:await fs.readFile(file)});}catch{await route.fulfill({status:404,body:'Not found'});}});
await page.goto('http://intro.test/main/',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.heroNebula?.inspect().ready,null,{timeout:60000});
const samples=await page.evaluate(()=>{const result=[];for(const t of [0,1,10,30,60,120]){heroNebula.renderAt(t);result.push(heroNebula.inspect());}heroNebula.renderAt(10);return result;});
await page.waitForTimeout(900);await page.screenshot({path:path.join(root,'output',`nebula-${process.argv[2]||'after'}-${name}.png`)});
await fs.writeFile(path.join(root,'output',`nebula-${process.argv[2]||'after'}-${name}.json`),JSON.stringify({samples,errors},null,2));
console.log(JSON.stringify({name,errors,samples:samples.map(({elapsed,count,mode})=>({elapsed,count,mode}))}));await page.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
