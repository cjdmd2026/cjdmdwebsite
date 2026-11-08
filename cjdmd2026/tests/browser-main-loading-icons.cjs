const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const {chromium} = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../public-dist');

(async () => {
  const [icons, html, script, css] = await Promise.all([
    fs.readFile(path.join(root, 'js/main-intro/icons.json'), 'utf8').then(JSON.parse),
    fs.readFile(path.join(root, 'main/index.html'), 'utf8'),
    fs.readFile(path.join(root, 'js/main-intro-loading.js'), 'utf8'),
    fs.readFile(path.join(root, 'css/main-intro.css'), 'utf8')
  ]);
  const markup = html.slice(html.indexOf('<div id="introLoader"'), html.indexOf('<!-- Main:S -->'));
  const browser = await chromium.launch({headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try {
    const page = await browser.newPage({viewport: {width: 390, height: 844}, reducedMotion: 'reduce'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => route.fulfill({contentType: 'text/html', body:
      `<html class="intro-loading"><head><style>${css}</style></head><body>${markup}<main></main></body></html>`}));
    async function openIcon(index) {
      await page.goto('http://loader-icons.test/');
      await page.evaluate(({index, count}) => { Math.random = () => (index + .5) / count; }, {index, count: icons.length});
      await page.addScriptTag({content: script});
    }
    const counts = [];
    for (const [index, icon] of icons.entries()) {
      await openIcon(index);
      const result = await page.evaluate(async icon => {
        const svg = document.querySelector('.intro-loader-field');
        const parts = [...svg.querySelectorAll('defs > g')];
        const tiles = [...document.querySelectorAll('.intro-loader-tile')];
        const outlined = getComputedStyle(svg).opacity === '0' && tiles.every(tile =>
          getComputedStyle(tile.querySelector('svg')).fill === 'none' && getComputedStyle(tile.querySelector('svg')).stroke !== 'none');
        const original = svg.cloneNode(false);
        original.style.opacity = '1';
        original.innerHTML = icon.svg;
        const restored = svg.cloneNode(true);
        restored.style.opacity = '1';
        restored.querySelector(':scope > g').remove();
        for (const part of restored.querySelectorAll('defs > g')) restored.append(part);

        // Compare the actual joined fragments to the source, including holes.
        async function pixels(art) {
          art.setAttribute('viewBox', icon.viewBox);
          art.setAttribute('width', 268);
          art.setAttribute('height', 268);
          const img = new Image();
          img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(art));
          await img.decode();
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = 268;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          return ctx.getImageData(0, 0, 268, 268).data;
        }
        const [actual, expected] = await Promise.all([pixels(restored), pixels(original)]);
        let error = 0;
        for (let i = 3; i < actual.length; i += 4) error += Math.abs(actual[i] - expected[i]);

        const centers = tiles.map(tile => {
          const box = tile.getBoundingClientRect(), style = getComputedStyle(tile);
          return {x: box.x + box.width / 2, y: box.y + box.height / 2,
            radius: Math.hypot(parseFloat(style.width), parseFloat(style.height)) / 2};
        });
        const separated = centers.every((a, i) => centers.slice(0, i).every(b =>
          Math.hypot(a.x - b.x, a.y - b.y) > a.radius + b.radius));
        MainIntroLoading.update(50);
        const docked = tiles.filter(tile => getComputedStyle(tile).transform === 'none').length;
        MainIntroLoading.finish();
        return {id: MainIntroLoading.inspect().icon, solid: svg.getAttribute('fill'), separated, docked, outlined,
          count: parts.length, maskError: error / (268 * 268), exactFinish: svg.querySelector(':scope > g').innerHTML === original.innerHTML && svg.style.opacity === '1'};
      }, icon);
      assert.equal(result.id, icon.id);
      assert.equal(result.solid, icon.color);
      assert(result.outlined, icon.id + ' stays outline-only until assembled');
      assert(result.separated && result.count > 1, icon.id + ' starts in separate pieces');
      assert(result.docked > 0 && result.docked < result.count, icon.id + ' assembles progressively');
      assert(result.maskError < 1 && result.exactFinish, icon.id + ' preserves its original silhouette');
      counts.push(result.count);
    }

    // Read compositor frames while JS is deliberately unable to run during a
    // flight and contact. No percentage updates can cause frames in this span.
    await page.emulateMedia({reducedMotion: 'no-preference'});
    await openIcon(2);
    await page.waitForTimeout(880);
    await page.evaluate(() => MainIntroLoading.update(5));
    await page.waitForTimeout(980);
    const anchor = page.locator('.intro-loader-tile').first();
    const impacts = await anchor.evaluate(tile => {
      MainIntroLoading.update(50);
      return tile.getAnimations().filter(animation => animation.effect.getKeyframes().some(frame =>
        frame.transform && Math.abs(parseFloat(frame.transform.split('rotate(')[1])) > .05)).length;
    });
    assert(impacts >= 2);
    const session = await page.context().newCDPSession(page);
    const frames = [];
    session.on('Page.screencastFrame', frame => {
      frames.push({time: frame.metadata.timestamp * 1000, image: frame.data});
      session.send('Page.screencastFrameAck', {sessionId:frame.sessionId}).catch(() => {});
    });
    await session.send('Page.startScreencast', {format:'png', maxWidth:390, maxHeight:844, everyNthFrame:1});
    const busy = await page.evaluate(() => new Promise(resolve => setTimeout(() => {
      const start = performance.now();
      while (performance.now() - start < 700) { /* Simulate a heavy geometry batch. */ }
      resolve([performance.timeOrigin + start, performance.timeOrigin + performance.now()]);
    }, 65)));
    await session.send('Page.stopScreencast');
    const moving = new Set(frames.filter(frame => frame.time > busy[0] && frame.time < busy[1]).map(frame => frame.image));
    assert(moving.size > 2, 'the compositor presents changing frames during main-thread work: ' + moving.size);
    // Once the impact has settled, the two docked parts must still move as
    // one body while the loader receives no further progress.
    await page.waitForTimeout(1900);
    const idle = await page.evaluate(async () => {
      const pair = [...document.querySelectorAll('.intro-loader-tile')].slice(0, 2);
      const centers = () => pair.map(tile => {
        const box = tile.getBoundingClientRect();
        return {x:box.x + box.width / 2, y:box.y + box.height / 2};
      });
      const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
      const first = centers(), spacing = distance(...first), travel = [0, 0];
      let spacingError = 0;
      for (let i = 0; i < 7; i++) {
        await new Promise(resolve => setTimeout(resolve, 180));
        const current = centers();
        current.forEach((point, j) => { travel[j] = Math.max(travel[j], distance(point, first[j])); });
        spacingError = Math.max(spacingError, Math.abs(distance(...current) - spacing));
      }
      return {travel, spacingError, progress:MainIntroLoading.inspect().progress};
    });
    assert.equal(idle.progress, 50);
    assert(idle.travel.every(px => px > 1) && idle.spacingError < .5, JSON.stringify(idle));
    await page.evaluate(() => MainIntroLoading.finish());
    await page.waitForFunction(() => MainIntroLoading.inspect().phase === 'done');
    assert.equal(counts.length, 33);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({icons: counts.length, minParts: Math.min(...counts), maxParts: Math.max(...counts), framesDuring700msBlock: moving.size, idle, errors}));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
