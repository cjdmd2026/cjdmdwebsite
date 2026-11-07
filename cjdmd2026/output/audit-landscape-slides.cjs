const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output/figma/project-qa/landscape');

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try {
    const context = await browser.newContext({viewport:{width:1920,height:1080}, deviceScaleFactor:1, reducedMotion:'reduce'});
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
    await page.goto('http://site.test/project/');
    await page.waitForFunction(() => window.ProjectFluidSlide && window.PROJECTS?.length === 14);
    const ids = await page.evaluate(() => window.PROJECTS.map(p => p.id));
    const report = [];
    for (const id of ids) {
      await page.evaluate(id => window.ProjectFluidSlide.goTo(id), id);
      await page.waitForFunction(id => window.ProjectFluidSlide.state.projectId === id && window.ProjectFluidSlide.state.phase === 'idle', id);
      const entry = await page.evaluate(async id => {
        const card = document.querySelector(`#slideview .card[data-project-id="${id}"]`);
        const style = getComputedStyle(card);
        const url = style.backgroundImage.slice(5,-2);
        const image = new Image(); image.src = url; await image.decode();
        return {id, url, natural:[image.naturalWidth,image.naturalHeight], bounds:card.getBoundingClientRect().toJSON(),
          backgroundSize:style.backgroundSize, filter:style.filter, opacity:style.opacity,
          wave:document.querySelector('.project-wave') && {display:getComputedStyle(document.querySelector('.project-wave')).display,opacity:getComputedStyle(document.querySelector('.project-wave')).opacity},
          active:card.classList.contains('is-active')};
      }, id);
      assert.ok(entry.url.includes(`/submissions/${id}/landscape.webp?v=`));
      const assetUrl = new URL(entry.url);
      const bytes = await fs.readFile(path.join(root, assetUrl.pathname));
      assert.equal(assetUrl.searchParams.get('v'), createHash('sha256').update(bytes).digest('hex').slice(0,12));
      assert.ok(entry.natural[0] >= 1600);
      assert.equal(entry.filter, 'none');
      assert.equal(entry.backgroundSize, 'cover');
      assert.ok(entry.active);
      if (['curo','year-on','cocorang','magmoa','omix'].includes(id)) await page.screenshot({path:path.join(output,`${id}-slide.png`)});
      report.push(entry);
    }
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.evaluate(() => window.ProjectFluidSlide.goTo('year-on'));
    await page.waitForFunction(() => window.ProjectFluidSlide.state.projectId === 'year-on' && window.ProjectFluidSlide.state.phase === 'idle' && !window.ProjectWave.state.busy);
    const transition = await page.evaluate(() => ({slide:window.ProjectFluidSlide.state,wave:window.ProjectWave.state,overlayVisibility:getComputedStyle(document.querySelector('.project-wave')).visibility}));
    assert.equal(transition.overlayVisibility, 'hidden');
    assert.deepEqual(errors, []);
    await fs.writeFile(path.join(output, 'slide-audit.json'),JSON.stringify({report,transition,errors},null,2));
    console.log(JSON.stringify({slides:report.length,transition,errors}));
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
