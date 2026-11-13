const fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const root=path.resolve(__dirname,'..'),phase=process.argv[2]||'after';
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const reports=[];
 try{
  for(const [width,height] of (phase==='before'?[[1440,900]]:[[1440,900],[1024,768],[390,844]])){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'}),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.hostname!=='designer.test')return route.fulfill({body:''});
    try{let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+path.sep))throw new Error('outside');if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');await route.fulfill({path:file});}catch{await route.fulfill({status:404,body:''});}
   });
   await page.goto('http://designer.test/designer/profile/?id=kwon-minseong');
   await page.waitForFunction(()=>window.DesignerDetail&&document.querySelectorAll('.project-card').length===3&&document.getElementById('projectImage')?.naturalWidth>0);
   await page.evaluate(()=>document.fonts.ready);
   if(phase==='before')await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready')||document.querySelector('.motion-ready'));
   const report=await page.evaluate(()=>{
    const intro=document.querySelector('.intro').getBoundingClientRect(),list=document.getElementById('listLayer').getBoundingClientRect(),section=document.getElementById('handoffSection').getBoundingClientRect();
    return {profileName:document.querySelector('.profile .name h1').textContent,profileBottom:intro.bottom+scrollY,listTop:list.top+scrollY,sectionTop:section.top+scrollY,scrollHeight:document.documentElement.scrollHeight,motionReady:!!document.querySelector('.motion-ready'),stickyDisplay:getComputedStyle(document.getElementById('stickyStage')).display,flyerCount:document.querySelectorAll('#heroFlyer').length,cards:document.querySelectorAll('.project-card').length};
   });
   if(phase!=='before'){
    if(report.motionReady||report.stickyDisplay!=='none'||report.flyerCount||Math.abs(report.listTop-report.sectionTop)>1)throw new Error('Fullscreen handoff still active');
    await page.locator('.list-title').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(root,'output/profile-direct-list-'+width+'.png')});
    if(width>=760){await page.locator('.project-card').nth(1).hover();await page.waitForFunction(()=>document.querySelectorAll('.project-card')[1].classList.contains('is-active'));}
    const wheelPrevented=await page.evaluate(()=>{const e=new WheelEvent('wheel',{deltaY:40,bubbles:true,cancelable:true});document.querySelector('.project-card').dispatchEvent(e);return e.defaultPrevented;});
    if(wheelPrevented)throw new Error('Step scroll still intercepts wheel');
    report.wheelPrevented=wheelPrevented;
   }
   report.viewport=[width,height];report.errors=errors;reports.push(report);console.log(JSON.stringify(report));await page.close();
  }
  await fs.writeFile(path.join(root,'output/profile-direct-list-'+phase+'.json'),JSON.stringify(reports,null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});