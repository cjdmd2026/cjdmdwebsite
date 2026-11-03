import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
const root = path.join(process.cwd(), 'output/icon-effects-share-20261103');
const qa = path.join(process.cwd(), 'output/icon-effects-share-qa');
await fs.mkdir(qa, { recursive: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const check = (ok, message) => { if (!ok) throw new Error(message); };
const port = 4187;
const server = spawn(process.execPath, [path.join(root, 'serve.mjs')], { env: { ...process.env, PORT: String(port) }, windowsHide: true, stdio: 'ignore' });
const profile = path.join(qa, 'chrome-profile');
await fs.mkdir(profile, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=0', '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1440,900', 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
let chromeLog = '';
chrome.stderr.on('data', chunk => { chromeLog += chunk; });
let ws;
const report = { errors: [], checks: [] };
try {
  let devPort;
  for (let i = 0; i < 100; i++) {
    try { devPort = (await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; } catch { await sleep(100); }
  }
  check(devPort, 'Chrome did not start: exit=' + chrome.exitCode + ' ' + chromeLog);
  const tabs = await (await fetch(`http://127.0.0.1:${devPort}/json/list`)).json();
  ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
  let next = 0;
  const pending = new Map();
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const p = pending.get(message.id); pending.delete(message.id);
      if (message.error) p?.reject(new Error(JSON.stringify(message.error))); else p?.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') report.errors.push(message.params.exceptionDetails);
    else if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) report.errors.push(message.params.response);
    else if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params.type)) report.errors.push(message.params);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++next; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const until = async (expression, label, ms = 15000) => {
    const deadline = Date.now() + ms;
    while (Date.now() < deadline) { if (await evaluate(expression)) return; await sleep(120); }
    throw new Error('Timeout: ' + label);
  };
  const shot = async name => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    await fs.writeFile(path.join(qa, name + '.png'), Buffer.from(data, 'base64'));
  };
  const go = async route => {
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/${route}` });
    await until("document.readyState === 'complete'", 'page loaded');
  };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await go('main/');
  await until("typeof window.MainHeroScroll === 'function' && document.querySelectorAll('canvas').length >= 10", 'main initialized');
  await sleep(800); await shot('main-scatter');
  const wheel = direction => send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 1000, y: 650, deltaX: 0, deltaY: direction * 100 });
  const step = n => until(`document.getElementById('heroStage').dataset.step === '${n}' && document.getElementById('heroStage').dataset.motion === 'idle'`, 'hero step ' + n);
  await wheel(1); await step(1); await shot('main-assembled');
  await wheel(1); await step(2); await shot('main-poster');
  await wheel(-1); await step(1); await wheel(-1); await step(0);
  report.checks.push('main wheel: 0 -> 1 -> 2 -> 1 -> 0; no missing image/script resources');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await sleep(250);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown' });
  await step(1); await shot('main-mobile-assembled');
  report.checks.push('main at 390px: resized and keyboard assembly completed');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await go('archive/');
  const host = "document.getElementById('cjdmd-floating-outline-background')";
  await until(`${host}?.shadowRoot.querySelectorAll('.piece').length > 0`, 'archive SVGs loaded');
  await evaluate(`window.qaMerges = []; new MutationObserver(ms => { for(const m of ms) for(const el of m.addedNodes) if(el instanceof Element && el.matches('.fusion-piece')) window.qaMerges.push(el.dataset.trigger); }).observe(${host}.shadowRoot, {childList:true,subtree:true});`);
  await until("window.qaMerges.includes('collision')", 'automatic collision merge', 20000);
  await shot('archive-auto-merge');
  report.checks.push('archive automatic collision merge observed');
  // Use reduced motion to hold positions while exercising real pointer dragging.
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await sleep(150);
  const points = await evaluate(`Array.from(${host}.shadowRoot.querySelectorAll('.stage > .piece')).map(el => { const r = el.querySelector('.color-group').getBoundingClientRect(); return { x:r.x+r.width/2, y:r.y+r.height/2, width:r.width, height:r.height }; }).filter(r => r.x>40 && r.x<450 && r.y>120 && r.y<760 && r.width>15 && r.height>15)`);
  check(points.length >= 2, 'Need visible drag targets');
  let manual = false;
  for (let attempt = 0; attempt < Math.min(points.length - 1, 5); attempt++) {
    const a = points[attempt], b = points[attempt + 1];
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: a.x, y: a.y });
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: a.x, y: a.y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: b.x, y: b.y, button: 'left', buttons: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: b.x, y: b.y, button: 'left', clickCount: 1 });
    manual = await evaluate("window.qaMerges.includes('drop')");
    if (manual) break;
  }
  check(manual, 'Manual drop merge not observed');
  await shot('archive-manual-merge');
  await until(`${host}.shadowRoot.querySelectorAll('.fusion-piece').length === 0`, 'manual merge split', 8000);
  report.checks.push('archive real pointer drag/drop merge and timed split in reduced motion');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await go('archive/');
  await until(`${host} !== null`, 'mobile archive host');
  check(await evaluate(`${host}.shadowRoot.querySelectorAll('.piece').length === 0`), 'Archive breakpoint should remain disabled');
  report.checks.push('archive original 760px breakpoint retained');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await go('svg-gallery.html');
  const allSVGs = await evaluate(`(async () => { const catalog = await (await fetch('assets/svg/catalog.json')).json(); const files = [...catalog.teams,...catalog.individual.map(i=>i.file),...catalog.reference.map(i=>i.file),'assets/images/icons/mouse-icon-animated.svg']; return await Promise.all(files.map(async file => { const response=await fetch(file); const xml=new DOMParser().parseFromString(await response.text(),'image/svg+xml'); return {file,ok:response.ok && xml.documentElement.localName==='svg' && !xml.querySelector('parsererror')}; })); })()`);
  check(allSVGs.length === 50 && allSVGs.every(x => x.ok), 'SVG missing or invalid');
  report.checks.push('all 50 packaged SVG files fetched and XML parsed successfully');
  const copies = JSON.parse(await fs.readFile(path.join(root, 'copied-files.json'), 'utf8'));
  for (const item of copies) {
    const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
    check(hash(await fs.readFile(path.join(root, item.destination))) === item.sha256, 'Copied file mismatch: ' + item.destination);
    check(hash(await fs.readFile(path.join(process.cwd(), item.source))) === item.sha256, 'Source modified: ' + item.source);
  }
  report.checks.push('all 27 copied originals match SHA-256; original source files unchanged');
  check(report.errors.length === 0, 'Browser errors: ' + JSON.stringify(report.errors));
  report.success = true;
} catch (error) { report.success = false; report.failure = error.stack; process.exitCode = 1; }
finally {
  ws?.close();
  chrome.kill(); server.kill();
  await fs.writeFile(path.join(qa, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
