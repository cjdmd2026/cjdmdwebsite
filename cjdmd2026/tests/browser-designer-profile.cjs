const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const {chromium} = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../public-dist');

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:900}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let failPreview = false;
    async function serve(route) {
      const url = new URL(route.request().url());
      if (url.hostname !== 'profile.test') return route.abort();
      if (failPreview && url.pathname.endsWith('/logo-profile.webp')) return route.abort();
      let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
      if (!file.startsWith(root + path.sep)) return route.abort();
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
      return route.fulfill({path:file});
    }
    await page.route('**/*', serve);
    await page.goto('http://profile.test/designer/profile/?id=go-biju');
    const designers = await page.evaluate(() => DESIGNERS.map(d => ({id:d.id, name:d.nameKo})));
    for (const designer of designers) {
      await page.evaluate(id => {
        history.replaceState(null, '', '?id=' + id);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, designer.id);
      await page.waitForFunction(({id, name}) => {
        const canvas = document.querySelector('.designer-floating-background canvas');
        return canvas?.parentElement.dataset.designerId === id &&
          document.querySelector('.profile h1').textContent === name &&
          document.querySelector('#projectImage')?.naturalWidth > 0;
      }, designer);
      const ink = await page.evaluate(() => {
        const c = document.createElement('canvas');
        c.width = 100; c.height = 70;
        const ctx = c.getContext('2d');
        ctx.drawImage(document.querySelector('.designer-floating-background canvas'), 0, 0, c.width, c.height);
        return ctx.getImageData(0, 0, c.width, c.height).data.some((v, i) => i % 4 === 3 && v > 0);
      });
      assert(ink, designer.id + ' shows its own background fragments');
      assert.equal(await page.locator('.designer-floating-background').count(), 1);
    }

    failPreview = true;
    await page.goto('http://profile.test/designer/profile/?id=go-biju');
    await page.waitForFunction(() => document.querySelector('.hero-logo')?.naturalWidth > 0);
    assert.match(await page.locator('.hero-logo').getAttribute('src'), /\/logo\.png/);
    await page.waitForFunction(() => document.documentElement.classList.contains('motion-ready'));
    // The optional smooth-scroll script is offline; both wheel steps still work.
    await page.mouse.wheel(0, 150);
    await page.waitForFunction(() => document.querySelector('.header').classList.contains('is-full-image-hidden'));
    await page.waitForTimeout(2300);
    await page.mouse.wheel(0, 150);
    await page.waitForFunction(() => scrollY > innerHeight && document.querySelector('#heroFlyer').parentElement.id === 'firstProjectThumb');
    await page.locator('.project-card').nth(1).focus();
    assert(await page.locator('.project-card').nth(1).evaluate(card => card.classList.contains('is-active')));

    failPreview = false;
    const phone = await browser.newPage({viewport:{width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2});
    await phone.route('**/*', serve);
    phone.on('pageerror', error => errors.push(error.message));
    const mobileRequests = [];
    phone.on('request', req => mobileRequests.push(req.url()));
    await phone.goto('http://profile.test/designer/profile/?id=kwon-minseong');
    await phone.waitForSelector('.designer-floating-background canvas');
    for (const {id,name} of designers) {
      const summary = await phone.evaluate(id => {
        history.replaceState(null, '', '?id=' + id);
        dispatchEvent(new PopStateEvent('popstate'));
        const person = DESIGNERS.find(d => d.id === id);
        const work = PROJECTS.find(p => p.id === person.projectIds[0]);
        const cards = [...document.querySelectorAll('.project-card')];
        return {
          name: document.querySelector('.profile h1').textContent,
          project: document.querySelector('.list-title').textContent === work.title,
          linked: new URL(document.querySelector('.profile-project-link').href).pathname === '/project/' + work.url.slice(2),
          courses: cards.map(card => card.dataset.courseId),
          readable: cards.every(card => card.tabIndex === -1 && getComputedStyle(card.querySelector('.card-copy')).opacity === '1'),
          fullPage: !!document.querySelector('#heroFlyer') || document.documentElement.classList.contains('motion-ready')
        };
      }, id);
      assert.deepEqual(summary, {name,project:true,linked:true,courses:['interactive','service','interface'],readable:true,fullPage:false});
    }
    assert(!mobileRequests.some(url => /lenis|student-mouse-effect|logo-profile/.test(url)));
    for (const [width,height] of [[320,640],[390,844],[844,390]]) {
      await phone.setViewportSize({width,height});
      await phone.waitForFunction(() => !document.querySelector('#heroFlyer'));
      const layout = await phone.evaluate(() => ({
        width:document.documentElement.scrollWidth, viewport:innerWidth,
        gap:document.querySelector('.list-layer').getBoundingClientRect().top - document.querySelector('.intro').getBoundingClientRect().bottom,
        stage:getComputedStyle(document.querySelector('#stickyStage')).display
      }));
      assert.deepEqual(layout, {width,viewport:width,gap:0,stage:'none'});
      await phone.locator('.project-card').last().scrollIntoViewIfNeeded();
      assert(await phone.locator('.project-card').last().evaluate(card => card.getBoundingClientRect().top < innerHeight));
    }
    await phone.setViewportSize({width:390,height:844});
    await phone.locator('.menu-button').click();
    assert(await phone.locator('#profile-menu').isVisible());
    await phone.keyboard.press('Escape');
    await phone.waitForSelector('#profile-menu', {state:'hidden'});
    assert(await phone.locator('main').evaluate(main => !main.inert));
    // Cross the breakpoint with motion enabled and ensure the fixed stage is released.
    await phone.setViewportSize({width:1280,height:800});
    await phone.waitForFunction(() => document.documentElement.classList.contains('motion-ready'));
    await phone.setViewportSize({width:390,height:844});
    await phone.waitForFunction(() => !document.querySelector('#heroFlyer') && !document.documentElement.classList.contains('motion-ready'));
    await phone.emulateMedia({reducedMotion:'reduce'});
    const projectURL = await phone.locator('.profile-project-link').getAttribute('href');
    await phone.locator('.profile-project-link').click();
    await phone.waitForURL(projectURL);
    await phone.goto('http://profile.test/designer/profile/?id=unknown');
    await phone.waitForSelector('[data-designer-detail-status]');
    assert.equal(await phone.locator('.designer-floating-background').count(), 0);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({desktopProfiles:designers.length, mobileProfiles:designers.length, errors}));
  } finally {
    await browser.close();
  }
})().catch(error => {console.error(error);process.exitCode=1});
