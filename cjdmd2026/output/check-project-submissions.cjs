const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');
const { chromium } = require('C:/Users/tph06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const qa = path.join(root, 'output/figma/project-qa');
const reports = [];

(async () => {
    await fs.mkdir(qa, { recursive: true });
    const sandbox = { window: {} };
    vm.runInNewContext(await fs.readFile(path.join(root, 'js/project-data.js'), 'utf8'), sandbox);
    vm.runInNewContext(await fs.readFile(path.join(root, 'js/designer-data.js'), 'utf8'), sandbox);
    const projects = sandbox.window.PROJECTS;
    const submissions = JSON.parse(await fs.readFile(path.join(root, 'output/figma/project-submissions-20261107.json'), 'utf8'));
    const assets = JSON.parse(await fs.readFile(path.join(root, 'output/figma/project-assets-20261107.json'), 'utf8'));
    assert.equal(projects.length, 14);
    assert.equal(assets.length, 84);
    assert.equal(projects.find(p => p.id === 'cheoma').title, '처마');
    for (const p of projects) {
        const source = submissions.teams.find(t => t.nodeId === assets.find(a => a.projectId === p.id).teamNodeId);
        assert.equal(p.description, source.fields.find(f => f.name.endsWith('_공통소개글')).values.join('\n').trim());
        for (const [key, label] of Object.entries({interactive:'인터랙티브',service:'서비스',interface:'인터페이스'})) {
            assert.equal(p.courseCards[key].title, source.fields.find(f => f.name.endsWith(`_${label}_제목`)).values.join('\n').trim());
            assert.equal(p.courseCards[key].description, source.fields.find(f => f.name.endsWith(`_${label}_설명`)).values.join('\n').trim());
        }
        for (const url of [p.image, p.slideImage, p.logo, ...Object.values(p.courseCards).map(c => c.image)]) {
            const assetPath = url.split('?')[0];
            const buffer = await fs.readFile(path.join(root, assetPath.replace(/^\.\.\//, '')));
            assert.ok(buffer.length > 100, url);
            if (assetPath.endsWith('.webp')) assert.equal(buffer.toString('ascii', 8, 12), 'WEBP');
        }
    }
    const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
    try {
        const context = await browser.newContext({viewport:{width:1440,height:900}});
        await context.addInitScript(() => {
            window.Lenis = class { raf(){} resize(){} stop(){} start(){} on(){} off(){} scrollTo(y){window.scrollTo({top:y,behavior:'instant'});} };
        });
        await context.route('**/*', async route => {
            const url = new URL(route.request().url());
            if (url.hostname !== 'site.test') return route.fulfill({contentType:'text/javascript',body:''});
            try {
                let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
                if (!file.startsWith(root + path.sep)) throw Error('unsafe');
                if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
                await route.fulfill({path:file});
            } catch { await route.fulfill({status:404,body:''}); }
        });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        for (const project of projects) {
            const designer = sandbox.window.DESIGNERS.find(d => d.projectIds.includes(project.id));
            assert.ok(designer, project.id);
            await page.goto(`http://site.test/designer/profile/?id=${designer.id}`);
            await page.waitForFunction(() => document.querySelectorAll('.project-card').length === 3 && document.querySelector('.hero-logo')?.naturalWidth > 0);
            await page.locator('.project-image').evaluateAll(images => images.forEach(i => i.loading='eager'));
            await page.waitForFunction(() => [...document.querySelectorAll('.project-image')].every(i => i.complete && i.naturalWidth > 0));
            await page.waitForFunction(() => document.documentElement.classList.contains('motion-ready'));
            const actual = await page.locator('.project-card').evaluateAll(cards => cards.map((c,i) => ({
                course:c.dataset.courseId,title:c.querySelector('h3').textContent,
                image:(i===0?document.querySelector('#projectImage'):c.querySelector('.project-image'))?.getAttribute('src')
            })));
            assert.deepEqual(actual.map(c=>c.course), ['interactive','service','interface']);
            for (const card of actual) {
                assert.equal(card.title, project.courseCards[card.course].title);
                assert.ok(card.image.endsWith(project.courseCards[card.course].image.replace(/^\.\.\//,'')));
            }
            await page.evaluate(() => window.scrollTo({top:document.querySelector('.handoff-section').offsetTop + innerHeight,behavior:'instant'}));
            await page.waitForFunction(() => +getComputedStyle(document.querySelector('.hero-title')).opacity > 0.8);
            const hero = await page.locator('.hero-title').evaluate(n=>({opacity:+getComputedStyle(n).opacity,logo:!!n.querySelector('img'),bounds:n.getBoundingClientRect().toJSON()}));
            if(hero.opacity<0.8) {
                console.log(await page.evaluate(()=>({scrollY,innerHeight,ready:document.documentElement.className,section:document.querySelector('.handoff-section').getBoundingClientRect().toJSON(),list:document.querySelector('.list-layer').getBoundingClientRect().toJSON(),stage:getComputedStyle(document.querySelector('.handoff-section')).getPropertyValue('--motion-travel'),flyer:document.querySelector('#heroFlyer').className,errors:document.body.innerText.slice(-100)})));
                await page.screenshot({path:path.join(qa,'hero-debug.png')});
            }
            assert.ok(hero.logo && hero.opacity > 0.8, `${project.id}: fullscreen logo ${hero.opacity}`);
            if (['apuchika','omix','cocorang'].includes(project.id)) await page.screenshot({path:path.join(qa, `${project.id}-hero.png`)});
            await page.setViewportSize({width:1280,height:800});
            await page.waitForTimeout(50);
            assert.equal(await page.locator('.hero-title img').count(), 1, 'Logo persists after resize');
            await page.setViewportSize({width:1440,height:900});
            await page.emulateMedia({reducedMotion:'reduce'});
            const overflow=[];
            for (let i=0;i<3;i++) {
                await page.locator('.project-card').nth(i).focus();
                await page.waitForTimeout(30);
                const layout=await page.locator('.project-card').nth(i).evaluate(n=>({card:n.getBoundingClientRect().toJSON(),copy:n.querySelector('.card-copy').getBoundingClientRect().toJSON()}));
                if(layout.copy.height>layout.card.height+2) overflow.push({course:i,...layout});
            }
            if (project.id==='apuchika') await page.locator('.list-layer').screenshot({path:path.join(qa,'apuchika-courses-desktop.png')});
            reports.push({project:project.id,heroOpacity:hero.opacity,cards:actual,overflow});
            assert.equal(overflow.length,0,`${project.id}: course descriptions fit`);
            await page.emulateMedia({reducedMotion:'no-preference'});
            console.log(JSON.stringify({project:project.id,loaded:3,logo:true,overflow:overflow.length}));
        }
        for (const width of [390, 768]) {
            await page.setViewportSize({width,height:844});
            await page.emulateMedia({reducedMotion:'reduce'});
            const designer = sandbox.window.DESIGNERS.find(d=>d.projectIds.includes('curo'));
            await page.goto(`http://site.test/designer/profile/?id=${designer.id}`);
            await page.waitForFunction(()=>document.querySelector('.hero-logo')?.naturalWidth>0);
            for(let i=0;i<3;i++) {
                await page.locator('.project-card').nth(i).focus();
                await page.waitForTimeout(30);
                const layout=await page.locator('.project-card').nth(i).evaluate(n=>({card:n.getBoundingClientRect().toJSON(),copy:n.querySelector('.card-copy').getBoundingClientRect().toJSON(),thumb:n.querySelector('.project-thumb').getBoundingClientRect().toJSON()}));
                reports.push({width,course:i,overflow:layout.copy.height>layout.card.height+2,...layout});
                assert.ok(layout.copy.height<=layout.card.height+2,`${width}px: text fits`);
                assert.ok(layout.copy.right<=width,`${width}px: text stays inside viewport`);
                assert.ok(layout.copy.bottom<=layout.card.bottom+2,`${width}px: copy stays within card`);
                if(width<760) assert.ok(layout.thumb.bottom<layout.copy.top,`${width}px: image does not overlap text`);
            }
            await page.locator('.project-card').evaluateAll(cards=>cards.forEach(c=>c.blur()));
            await page.locator('.list-layer').screenshot({path:path.join(qa,`curo-courses-${width}.png`)});
        }
        await page.setViewportSize({width:1440,height:900});
        await page.goto('http://site.test/project/');
        await page.waitForFunction(()=>document.querySelector('#gridview .card .card-image')?.style.backgroundImage.includes('submissions'));
        await page.waitForTimeout(500);
        const grid=await page.locator('#gridview .card').evaluateAll(cards=>cards.map(c=>({id:c.dataset.projectId,background:c.querySelector('.card-image')?.style.backgroundImage})));
        const slides=await page.locator('#slideview .card').evaluateAll(cards=>cards.map(c=>({id:c.dataset.projectId,background:c.style.backgroundImage})));
        assert.equal(grid.length,14);
        assert.equal(slides.length,14);
        for(const card of grid) assert.ok(card.background.includes(`/submissions/${card.id}/portrait.webp`));
        for(const card of slides) assert.ok(card.background.includes(`/submissions/${card.id}/landscape.webp`));
        reports.push({grid,slides,errors});
        assert.deepEqual(errors, []);
        await fs.writeFile(path.join(qa,'validation.json'),JSON.stringify(reports,null,2));
    } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
