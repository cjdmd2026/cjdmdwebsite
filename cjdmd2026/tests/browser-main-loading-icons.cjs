const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../public-dist');
(async()=>{
  const icons=JSON.parse(await fs.readFile(path.join(root,'js/main-intro/icons.json'),'utf8'));
  const html=await fs.readFile(path.join(root,'main/index.html'),'utf8');
  const markup=html.slice(html.indexOf('<div id="introLoader"'),html.indexOf('<!-- Main:S -->'));
  const script=await fs.readFile(path.join(root,'js/main-intro-loading.js'),'utf8');
  const css=await fs.readFile(path.join(root,'css/main-intro.css'),'utf8');
  assert.equal(icons.length,33);
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const images=[],selected=new Set();
  try{
    const page=await browser.newPage({viewport:{width:240,height:280},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*',route=>route.fulfill({body:''}));
    for(let index=0;index<icons.length;index++){
      await page.goto('http://loader-icons.test/');
      await page.setContent(`<html class="intro-loading"><head><style>${css}</style></head><body>${markup}<main></main></body></html>`);
      await page.evaluate(index=>{window.loaderRandom=Math.random;Math.random=()=>(index+.5)/33;},index);
      await page.addScriptTag({content:script});
      await page.evaluate(()=>{Math.random=loaderRandom;MainIntroLoading.update(45);});
      const actual=await page.evaluate(()=>{
        const svg=document.querySelector('#introLoader svg'),shape=document.getElementById('intro-loader-shape');
        const b=shape.getBBox(),fill=document.querySelector('.intro-loader-fill'),outline=document.querySelector('.intro-loader-outline');
        return {id:MainIntroLoading.inspect().icon,count:document.querySelectorAll('#introLoader svg').length,
          viewBox:svg.getAttribute('viewBox'),bounds:[b.x,b.y,b.width,b.height],
          color:getComputedStyle(fill).fill,outlineFill:getComputedStyle(outline).fill,clip:getComputedStyle(fill).clipPath,
          sameShape:fill.getAttribute('href')===outline.getAttribute('href')};
      });
      assert.equal(actual.id,icons[index].id);selected.add(actual.id);
      assert.equal(actual.count,1);assert(actual.sameShape);assert.equal(actual.outlineFill,'none');
      assert.match(actual.clip,/55%/);
      const [x,y,w,h]=actual.bounds,[vx,vy,vw,vh]=actual.viewBox.split(/\s+/).map(Number);
      assert(w>0&&h>0&&x>=vx&&y>=vy&&x+w<=vx+vw&&y+h<=vy+vh,`${actual.id} fits inside its SVG`);
      const rgb=icons[index].color.slice(1).match(/../g).map(v=>parseInt(v,16));
      assert.equal(actual.color,`rgb(${rgb.join(', ')})`);
      images.push({name:icons[index].name,image:(await page.screenshot()).toString('base64')});
      await page.evaluate(()=>MainIntroLoading.finish());
      await page.waitForFunction(()=>MainIntroLoading.inspect().phase==='done');
      assert.equal(await page.evaluate(()=>MainIntroLoading.inspect().icon),actual.id,'The icon does not change while filling');
    }
    assert.equal(selected.size,33);assert.deepEqual(errors,[]);
    await page.setViewportSize({width:1440,height:1680});
    await page.setContent(`<body style="margin:0;display:grid;grid-template-columns:repeat(6,240px);font:14px sans-serif">${images.map(item=>`<div style="height:280px;position:relative"><img width="240" height="280" src="data:image/png;base64,${item.image}"><span style="position:absolute;bottom:12px;left:12px">${item.name}</span></div>`).join('')}</body>`);
    const output=path.resolve(__dirname,'../output/submit-qa');await fs.mkdir(output,{recursive:true});
    await page.screenshot({path:path.join(output,'loading-icons-33.png'),fullPage:true});
    console.log(JSON.stringify({distinctIcons:selected.size,outlineAndColorFill:true,stablePerLoad:true,errors}));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
