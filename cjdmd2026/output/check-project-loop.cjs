const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:900}, reducedMotion:'reduce'});
    await context.addInitScript(() => {
      window.Lenis = class { raf(){} resize(){} stop(){} start(){} on(){} off(){} scrollTo(y){window.scrollTo({top:y,behavior:'instant'});} };
    });
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.hostname !== 'site.test') return route.fulfill({contentType:'text/javascript',body:''});
      try {
        let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
        if (!file.startsWith(root + path.sep)) throw Error('unsafe path');
        if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
        await route.fulfill({path:file});
      } catch { await route.fulfill({status:404,body:''}); }
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => {if(m.type()==='error')errors.push(m.text());});
    await page.goto('http://site.test/project/');
    await page.waitForFunction(() => window.ProjectFluidSlide && window.ProjectWave);
    const ids = await page.locator('#slideview .card').evaluateAll(cards => cards.map(c=>c.dataset.projectId));
    const first=ids[0], last=ids.at(-1);
    await page.evaluate(()=>{window.loopTrace=[];setInterval(()=>{const {projectId,pendingId,phase,queuedDirection}=window.ProjectFluidSlide.state;const line=JSON.stringify([projectId,pendingId,phase,queuedDirection]);if(window.loopTrace.at(-1)!==line)window.loopTrace.push(line);},75);});
    const settled = async id => {
      try {await page.waitForFunction(id => window.ProjectFluidSlide.state.projectId===id && window.ProjectFluidSlide.state.phase==='idle' && !window.ProjectWave.state.busy, id);}
      catch(e){console.error('Expected',id,await page.evaluate(()=>({slide:window.ProjectFluidSlide.state,wave:window.ProjectWave.state,trace:window.loopTrace,root:document.documentElement.className})),errors);throw e;}
    };
    const position = async id => {
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.evaluate(id => window.ProjectFluidSlide.goTo(id),id);
      await settled(id);
      await page.emulateMedia({reducedMotion:'no-preference'});
    };
    await position(last);
    await page.mouse.wheel(0,150);
    await settled(first);
    assert.equal(await page.locator('.project-dial-item.is-active').getAttribute('data-project-id'), first);
    await page.mouse.wheel(0,-150);
    await settled(last);
    assert.equal(await page.locator('.project-dial-item.is-active').getAttribute('data-project-id'), last);
    console.log('Wheel: last -> first -> last, including animated titles.');

    for (const [start,direction,target] of [[last,1,ids[1]],[first,-1,ids.at(-2)]]) {
      await position(start);
      await page.mouse.wheel(0,direction*150);
      await page.waitForFunction(() => window.ProjectFluidSlide.state.phase==='animating');
      await page.waitForTimeout(210);
      await page.mouse.wheel(0,direction*150);
      await page.waitForFunction(direction => window.ProjectFluidSlide.state.queuedDirection===direction,direction);
      await settled(target);
    }
    console.log('Queued wheel input continues in order across both boundaries.');

    await position(first);
    await page.keyboard.press('ArrowUp'); await settled(last);
    await page.keyboard.press('ArrowDown'); await settled(first);
    await page.emulateMedia({reducedMotion:'reduce'});
    const laps = await page.evaluate(() => {
      const ids=[...document.querySelectorAll('#slideview .card')].map(c=>c.dataset.projectId), forward=[],backward=[];
      for(let i=0;i<ids.length*2;i++){window.ProjectFluidSlide.next();forward.push(window.ProjectFluidSlide.state.projectId);}
      for(let i=0;i<ids.length;i++){window.ProjectFluidSlide.prev();backward.push(window.ProjectFluidSlide.state.projectId);}
      return {forward,backward};
    });
    assert.deepEqual(laps.forward,[...ids.slice(1),first,...ids.slice(1),first]);
    assert.deepEqual(laps.backward,[...ids.slice(1).reverse(),first]);

    const visible = async selected => {
      await page.evaluate(selected => document.querySelectorAll('#slideview .card').forEach(c=>c.hidden=!selected.includes(c.dataset.projectId)),selected);
      await page.waitForTimeout(50);
    };
    const subset=[ids[2],ids[5],ids[9]];
    await visible(subset);
    await page.evaluate(id=>window.ProjectFluidSlide.goTo(id),subset.at(-1));
    await page.evaluate(()=>window.ProjectFluidSlide.next()); await settled(subset[0]);
    await page.evaluate(()=>window.ProjectFluidSlide.prev()); await settled(subset.at(-1));
    await visible([first]);
    await page.evaluate(()=>{window.ProjectFluidSlide.next();window.ProjectFluidSlide.prev();}); await settled(first);
    await visible([]);
    await page.evaluate(()=>{window.ProjectFluidSlide.next();window.ProjectFluidSlide.prev();});
    assert.equal(await page.evaluate(()=>window.ProjectFluidSlide.state.phase),'idle');
    await visible(ids);
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({projects:ids.length,forwardLaps:2,reverseLaps:1,filteredWrap:true,singleAndEmptyStable:true,errors}));
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
