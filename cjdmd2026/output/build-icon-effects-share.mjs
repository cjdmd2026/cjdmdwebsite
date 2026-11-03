import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const repo = process.cwd();
const out = path.join(repo, 'output', 'icon-effects-share-20261103');
const copied = [];
const read = name => fs.readFile(path.join(repo, name), 'utf8');
async function write(name, value) {
  const dest = path.join(out, name);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, value, 'utf8');
}
async function copy(source, dest = source) {
  const bytes = await fs.readFile(path.join(repo, source));
  await write(dest, bytes);
  copied.push({ source, destination: dest, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
}

// Preserve the production hero engine and its actual render data byte-for-byte.
for (const name of ['main-hero.js', 'main-hero-sprite-batch.js', 'main-poster-sprites.js', 'main-scroll-input.js']) {
  await copy(`js/${name}`);
}
for (const name of ['poster_sprites_white.webp', 'poster_sprites_black.webp', 'Vertical_poster_white.webp', 'Vertical_poster_black.webp']) {
  await copy(`assets/images/poster/${name}`);
}
await copy('assets/images/icons/mouse-icon-animated.svg');

const data = { window: {} };
vm.runInNewContext(await read('js/main-data.js'), data);
await write('js/main-posters.js', '// Hero-only data extracted from js/main-data.js. PDF downloads are outside this demo.\nwindow.MAIN_POSTERS = ' + JSON.stringify(data.window.MAIN_POSTERS.map(p => ({ ...p, pdf: '' })), null, 2) + ';\n');

const archive = await read('js/archive.js');
const archiveMarker = archive.indexOf('/* =========================================================\n   6. Floating Outline Background');
// Normalize line endings only for locating the original standalone block.
const archiveLF = archive.replace(/\r\n/g, '\n');
const blockStart = archiveLF.indexOf('/* =========================================================\n   6. Floating Outline Background');
if (blockStart < 0) throw new Error('Archive effect marker not found');
let archiveEffect = archiveLF.slice(blockStart);
archiveEffect = archiveEffect.replace('   Append this block after the existing archive functions.', '   Extracted from js/archive.js; no gallery, history, or Lenis dependency.');
archiveEffect = archiveEffect.replace('    "use strict";', '    "use strict";\n\n    // Original archive desktop breakpoint. Keep this inside the isolated effect.\n    const archiveDesktop = matchMedia("(min-width: 760px)");');
await write('js/archive-background.js', archiveEffect);
const svgPaths = [...new Set([...archiveEffect.matchAll(/"(\.\.\/assets\/[^"\n]+\.svg)"/g)].map(m => m[1].slice(3)))];
if (svgPaths.length !== 14) throw new Error('Expected 14 archive team SVGs');
for (const source of svgPaths) await copy(source);

// Export real SVG files from the existing per-person geometry data, without redrawing.
const icons = { window: {} };
vm.runInNewContext(await read('js/main-icon-fragments.js'), icons);
vm.runInNewContext(await read('js/designer-icon-data.js'), icons);
await copy('js/main-icon-fragments.js', 'assets/svg/source-data/main-icon-fragments.js');
await copy('js/designer-icon-data.js', 'assets/svg/source-data/designer-icon-data.js');
const individual = [];
for (const [id, icon] of Object.entries(icons.window.MAIN_ICON_FRAGMENTS)) {
  const file = `assets/svg/individual/${id}.svg`;
  await write(file, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" fill="${icon.color}">\n  <title>${id}</title>\n  ${icon.svg}\n</svg>\n`);
  const project = icons.window.DESIGNER_ICON_PROJECTS.find(p => Object.hasOwn(p.studentColors, id));
  individual.push({ id, color: icon.color, file, teamSvg: project ? `assets/images/project/test/icon/${project.file}` : null });
}
await copy('assets/images/poster/assembly-poster.svg', 'assets/svg/reference/assembly-poster.svg');
await copy('assets/images/designer/gyeolhap-word.svg', 'assets/svg/reference/gyeolhap-word.svg');
await write('assets/svg/catalog.json', JSON.stringify({ teams: svgPaths, individual, reference: [
  { file: 'assets/svg/reference/assembly-poster.svg', original: 'assets/images/poster/assembly-poster.svg', usage: 'assembly 페이지의 포스터 벡터 참고본. 현재 main의 렌더링 입력 파일은 아님.' },
  { file: 'assets/svg/reference/gyeolhap-word.svg', original: 'assets/images/designer/gyeolhap-word.svg', usage: 'designer 페이지의 결합 글자 벡터 참고본. 현재 main의 좌표 데이터와 별개.' }
] }, null, 2));

const mainCSS = (await read('css/main.css')).replace(/\r\n/g, '\n');
const heroCSS = mainCSS.slice(mainCSS.indexOf('.hero {'), mainCSS.indexOf('/* ============================== 02. Committee'));
const tabletCSS = mainCSS.slice(mainCSS.indexOf('@media (max-width: 1100px)'), mainCSS.indexOf('/* ============================== Mobile'));
await write('css/main-effect.css', `/* Hero rules extracted from css/main.css. Demo reset uses system fonts. */
:root { --u: min(1vw, calc(100vh * 16 / 9 / 100)); --poster-ratio: 1686 / 2387; --hero-poster-height: min(58.2vh, calc(46 * var(--u))); --header-height: 70px; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, "Malgun Gothic", sans-serif; background: #fff; color: #111; overflow-x: clip; line-height: 1.5; }
button { border: 0; background: none; color: inherit; font: inherit; cursor: pointer; }
a { color: inherit; }
:focus-visible { outline: 2px solid #4f7cff; outline-offset: 4px; }
${heroCSS}
${tabletCSS}
.demo-nav { position: fixed; z-index: 20; top: 16px; left: 16px; display: flex; gap: 12px; padding: 10px 14px; border: 1px solid #ddd; border-radius: 12px; background: #fffe; font-size: 13px; }
.demo-nav a { text-decoration: none; }
.hero-text p { white-space: normal; }
.hero-scroll-hint { display: flex; flex-direction: column; align-items: center; gap: 8px; width: max-content; font-size: 12px; }
@media (max-width: 759px) {
  :root { --hero-poster-height: 44svh; --header-height: 56px; }
  .hero-poster-col { left: 50%; top: calc(var(--header-height) + 24px); transform: translateX(-50%); }
  .hero-indicator { top: calc(100% + 14px); }
  .hero-text { left: 20px; right: 20px; top: auto; bottom: 34px; width: auto; text-align: center; transform: translateY(calc((1 - var(--text-opacity, 0)) * 20px)); }
  .hero-text h2 { font-size: 1.5rem; margin-bottom: .8rem; }
  .hero-text p { font-size: .82rem; margin-bottom: 1rem; }
}
`);
await write('main/index.html', `<!doctype html>
<html lang="ko" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>메인 · 아이콘 부유와 결합</title>
<link rel="icon" href="data:,"><link rel="stylesheet" href="../css/main-effect.css">
<script>if ('scrollRestoration' in history) history.scrollRestoration = 'manual';</script>
<script defer src="../js/main-posters.js"></script><script defer src="../js/main-poster-sprites.js"></script><script defer src="../js/main-scroll-input.js"></script><script defer src="../js/main-hero-sprite-batch.js"></script><script defer src="../js/main-hero.js"></script>
</head><body>
<nav class="demo-nav" aria-label="예제 이동"><a href="../">목록</a><a href="../archive/">아카이브 효과</a><a href="./">다시 시작</a></nav>
<main><section class="hero" id="hero" aria-labelledby="heroTitle"><div class="hero-stage" id="heroStage" data-theme="light" data-step="0">
<canvas class="hero-bg" id="heroBg" aria-hidden="true"></canvas><canvas class="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas><canvas class="hero-fx" id="heroFx" aria-hidden="true"></canvas>
<div class="hero-layout"><div class="hero-poster-col"><button class="hero-poster" id="heroPoster" type="button" aria-label="포스터 전환"><canvas class="hero-poster__canvas" id="heroPosterCanvas" aria-hidden="true"></canvas></button>
<div class="hero-indicator" id="heroIndicator" role="tablist" aria-label="포스터 선택"><button type="button" role="tab" data-index="0" aria-selected="true" aria-label="화이트 포스터"></button><button type="button" role="tab" data-index="1" aria-selected="false" aria-label="블랙 포스터"></button></div></div>
<div class="hero-text"><h1 id="heroTitle">다채로운 개성이<br>빚어낸 결합</h1><p>위로 스크롤하면 결합 상태로 돌아갑니다.<br>한 번 더 올리면 아이콘이 다시 흩어집니다.</p></div></div>
<div class="hero-scroll-hint" id="heroHint" aria-hidden="true"><img src="../assets/images/icons/mouse-icon-animated.svg" alt=""><span>아래로: 결합 → 포스터 · 위로: 이전 단계</span></div>
</div></section></main></body></html>`);
await write('css/share.css', `*{box-sizing:border-box}body{margin:0;font-family:system-ui,"Malgun Gothic",sans-serif;color:#24262b;background:#f8f9fb;line-height:1.7}a{color:inherit}main{max-width:1000px;margin:auto;padding:64px 24px 100px}h1{font-size:clamp(30px,5vw,48px);line-height:1.2;letter-spacing:-.04em}h2{margin-top:36px}p{color:#565c66}nav{display:flex;gap:18px;flex-wrap:wrap}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin:32px 0}.card{display:block;padding:26px;background:white;border:1px solid #dce0e6;border-radius:18px;text-decoration:none}.card strong{font-size:22px}.card p{margin-bottom:0}code{background:#edf0f4;padding:3px 7px;border-radius:5px}.note{padding:16px 20px;background:#eef1f6;border-radius:12px}.svg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:14px}.svg-card{min-width:0;padding:16px;border:1px solid #dce0e6;background:white;border-radius:12px;text-align:center}.svg-card img{display:block;width:100%;height:105px;object-fit:contain;margin-bottom:12px}.svg-card span{display:block;font-size:12px;overflow-wrap:anywhere}.archive-demo{background:white}.archive-demo main{max-width:660px;text-align:center;min-height:220vh;padding-top:160px;pointer-events:none}.archive-demo nav{position:fixed;top:20px;left:24px;z-index:2;font-size:14px}.archive-demo .spacer{height:60vh}.mobile-note{display:none}@media(max-width:759px){.mobile-note{display:block}.archive-demo main{padding-top:120px;min-height:100vh}.archive-demo .spacer{height:12vh}}`);
await write('archive/index.html', `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>아카이브 · 배경 아이콘 결합</title><link rel="icon" href="data:,"><link rel="stylesheet" href="../css/share.css"><script defer src="../js/archive-background.js"></script></head><body class="archive-demo"><nav aria-label="예제 이동"><a href="../">목록</a><a href="../main/">메인 효과</a><a href="./">다시 시작</a></nav><main><p>ARCHIVE BACKGROUND</p><h1>흐르고, 만나고,<br>다시 흩어지는 아이콘</h1><p>양옆의 아이콘은 가까워지면 자동으로 결합합니다.<br>아이콘을 잡아 다른 아이콘에 겹쳐 놓아 보세요.</p><p class="mobile-note">원본과 같이 화면 너비 760px 이상에서 동작합니다.<br>데스크톱 또는 넓은 창에서 확인해 주세요.</p><div class="spacer"></div><h2>스크롤 아래까지 이어지는 배경</h2><p>결합한 아이콘은 잠시 유지된 뒤 분리됩니다.<br>가운데는 본문을 읽을 수 있도록 점점 옅어집니다.</p></main></body></html>`);
const escape = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const galleryCard = (file, label) => `<a class="svg-card" href="${file}" download><img loading="lazy" src="${file}" alt="${escape(label)}"><span>${escape(label)}</span></a>`;
await write('svg-gallery.html', `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SVG 파일 모음</title><link rel="icon" href="data:,"><link rel="stylesheet" href="css/share.css"></head><body><main><nav><a href="./">목록</a><a href="main/">메인</a><a href="archive/">아카이브</a></nav><h1>SVG 파일 모음</h1><p>아래 항목은 모두 ZIP 안에 들어 있는 실제 SVG 파일입니다. 클릭하면 해당 파일을 저장합니다.</p><h2>팀 결합 아이콘 · ${svgPaths.length}개</h2><p>아카이브 효과가 직접 불러오는 원본 SVG입니다.</p><div class="svg-grid">${svgPaths.map(f => galleryCard(f, path.basename(f))).join('')}</div><h2>개인 조각 아이콘 · ${individual.length}개</h2><p>기존 main-icon-fragments.js의 도형과 색상을 유지하여 개별 SVG로 저장했습니다. 현재 메인 애니메이션은 WebP 스프라이트를 사용합니다.</p><div class="svg-grid">${individual.map(i => galleryCard(i.file, i.id)).join('')}</div><h2>벡터 참고본</h2><p>아래 두 파일은 다른 페이지에서 사용하던 원본 벡터입니다. 현재 메인의 스프라이트 좌표와 일치하는 렌더링 입력으로 간주하지 마세요.</p><ul><li><a download href="assets/svg/reference/assembly-poster.svg">assembly 포스터 원본 SVG</a></li><li><a download href="assets/svg/reference/gyeolhap-word.svg">designer 결합 글자 원본 SVG</a></li><li><a download href="assets/images/icons/mouse-icon-animated.svg">메인 스크롤 안내 SVG</a></li></ul></main></body></html>`);
await write('index.html', `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>아이콘 효과 공유 패키지</title><link rel="icon" href="data:,"><link rel="stylesheet" href="css/share.css"></head><body><main><p>CJDMD 2026 · INTERACTION EXAMPLES</p><h1>아이콘 효과 공유 패키지</h1><p>메인의 부유·스크롤 결합과 아카이브의 배경 결합을 각각 실행할 수 있습니다.<br>필요한 코드, 이미지, SVG 파일을 모두 이 폴더에 복사해 두었습니다.</p><p class="note" id="server-note">실행: 이 폴더에서 <code>node serve.mjs</code>를 실행한 뒤 <code>http://127.0.0.1:4173</code>으로 접속하세요. Windows는 <code>START-WINDOWS.cmd</code>를 실행해도 됩니다.</p><div class="cards"><a class="card" href="main/"><strong>01 · 메인</strong><p>아이콘 부유 → 스크롤 결합 → 포스터 전환<br>휠·터치·방향키로 단계 이동</p></a><a class="card" href="archive/"><strong>02 · 아카이브</strong><p>배경 부유 → 자동 / 드래그 결합 → 분리<br>760px 이상 화면에서 실행</p></a><a class="card" href="svg-gallery.html"><strong>03 · SVG 모음</strong><p>팀 아이콘 14개 + 개인 조각 ${individual.length}개<br>벡터 참고본과 스크롤 안내 포함</p></a></div><h2>기능 설명과 적용 방법</h2><p><a href="README.md">README.md</a> · <a href="docs/FEATURES.ko.md">기능 정리</a> · <a href="docs/FILES.ko.md">파일 구성과 원본 대응표</a></p><p>별도 npm 패키지 설치나 외부 CDN 연결 없이 실행됩니다.</p></main><script>if(location.protocol !== 'file:') document.getElementById('server-note').textContent = '로컬 서버 연결 완료. 위 예제에서 효과를 확인하세요.';</script></body></html>`);
await write('serve.mjs', `import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.md':'text/plain; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp' };
const server = createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const bytes = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? 'Port already in use. Close the other server or set PORT.' : error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log('Open http://127.0.0.1:' + port + ' — Ctrl+C to stop.'));
`);
await write('START-WINDOWS.cmd', '@echo off\r\ncd /d "%~dp0"\r\nwhere node >nul 2>nul\r\nif errorlevel 1 (\r\n  echo Node.js is required. Or run: python -m http.server 4173 --bind 127.0.0.1\r\n  pause\r\n  exit /b 1\r\n)\r\necho Open http://127.0.0.1:4173 in your browser.\r\nnode serve.mjs\r\npause\r\n');
await write('README.md', `# 아이콘 효과 공유 패키지

2026-11-03 작업 폴더의 실제 코드를 복사·분리한 실행 예제입니다. 기존 사이트 파일은 수정하지 않았습니다.

## 실행

1. ZIP을 **전체 압축 해제**합니다.
2. 압축 해제한 폴더에서 \`node serve.mjs\`를 실행합니다. Node.js 18 이상을 사용하세요. Windows에서는 \`START-WINDOWS.cmd\`를 실행할 수도 있습니다.
3. 브라우저에서 http://127.0.0.1:4173 을 엽니다.
4. 메인 효과, 아카이브 효과, SVG 모음을 선택합니다.

Node.js가 없고 Python이 있으면 \`python -m http.server 4173 --bind 127.0.0.1\`을 같은 폴더에서 실행해도 됩니다. HTML을 직접 더블클릭하면 아카이브의 SVG fetch가 제한될 수 있으므로 로컬 HTTP 서버를 사용하세요. npm install이나 외부 CDN은 필요하지 않습니다.

## 포함 내용

- **메인:** 부유, 마우스 밀어내기, 스크롤에 따른 ‘결합’ 조립, 역방향 분산. 원본 히어로 엔진에 연결된 다음 단계의 포스터 이동·전환도 유지했습니다.
- **아카이브:** 윤곽선 배경 부유, 자동 충돌 결합, 드래그 결합, 유지 후 분리, 중앙 페이드. 원본처럼 너비 760px 이상에서 실행합니다.
- **실제 SVG ${svgPaths.length + individual.length + 3}개:** 팀 원본 14개, 개인 조각 ${individual.length}개, 벡터 참고본 2개, 스크롤 안내 1개.
- 메인 실행에 필요한 WebP 4개와 스프라이트 좌표 데이터도 실제 파일로 포함했습니다.

메인의 현재 렌더링은 SVG 파일을 직접 이동시키는 방식이 아니라 **WebP 스프라이트 + 좌표 데이터 + Canvas/WebGL** 방식입니다. SVG만 복사하면 메인 효과가 재현되지 않으므로 \`js/\`, \`css/\`, \`assets/\`를 함께 옮겨 주세요.

## 전달 및 적용

받는 사람에게 ZIP 전체를 전달하면 됩니다. 예제의 상대 경로를 유지한 채 폴더를 통째로 복사하면 독립 실행됩니다. 기존 페이지에 붙이는 방법과 필수 HTML ID, 스크립트 순서는 [기능 정리](docs/FEATURES.ko.md)에 있습니다.

- [기능 정리](docs/FEATURES.ko.md)
- [파일 구성과 원본 대응](docs/FILES.ko.md)
- [SVG 미리보기](svg-gallery.html)
- [SVG 파일·색상·팀 매핑](assets/svg/catalog.json)

위원회, 교수진, 영상, 작품 목록, 아카이브 사진, 서버 API, 환경변수, PDF 다운로드는 공유 대상에서 제외했습니다. 기본 시스템 폰트를 사용하며, 원본 전체 사이트의 메뉴·페이지 전환·하단 섹션 스크롤은 포함하지 않습니다.
`.replaceAll('\`', '`'));
await write('docs/FEATURES.ko.md', `# 기능 정리

## 1. 메인 — 부유 → 스크롤 결합

처음에는 포스터를 구성하는 아이콘들이 화면 안팎에 흩어져 천천히 움직입니다. 큰 아이콘은 선명하게, 작은 아이콘은 여러 블러 레이어로 깊이감을 줍니다. 마우스 이동·클릭으로 주변 아이콘을 밀어낼 수 있습니다.

아래 방향 휠 / 터치 스와이프 / 방향키 입력을 받으면 큰 아이콘부터 시차를 두고 원래 포스터 좌표로 모여 ‘결합’을 만듭니다. 각 아이콘의 부유 진폭, 회전, 크기, 블러가 이동과 함께 정리되고, 글자 획의 바깥쪽 작은 아이콘은 완성 후에도 움직입니다. 위 방향 입력은 다시 분산시킵니다.

원본 히어로 엔진을 보존해 다음 입력의 포스터 정착 단계도 포함했습니다.

| 단계 | 동작 |
| --- | --- |
| 0 | 흩어진 아이콘의 부유 및 마우스 반응 |
| 1 | 포스터 좌표로 모여 ‘결합’ 완성 |
| 2 | 왼쪽 포스터 위치로 축소 이동, 설명 노출, 화이트/블랙 전환 |

### 구현

- \`main-poster-sprites.js\`: 테마별 원본 크기, 목적 좌표, 아틀라스 잘라내기 영역.
- \`main-hero.js\`: 상태 전환, tween, 위치·회전·투명도 보간, 마우스 힘, Canvas 렌더링.
- \`main-hero-sprite-batch.js\`: WebGL로 많은 아이콘을 한 번에 그리며, 실패 시 2D 렌더링으로 대체.
- \`main-scroll-input.js\`: 한 번의 휠 제스처에서 발생하는 다수 이벤트·관성 입력을 정리.
- idle 30fps / 상호작용 60fps 제한, 화면 밖 아이콘 생략, 정착 획 캐시. 동작 줄이기 설정에 대응.

### 적용 순서

1. \`main/index.html\`의 hero section 전체를 복사합니다.
2. \`css/main-effect.css\`를 연결합니다. 다른 페이지에서는 reset과 demo-nav 규칙을 해당 사이트 스타일에 맞춰 조정합니다.
3. 아래 순서대로 일반 script에 defer를 지정해 연결합니다. type=module로 바꾸지 않습니다.

\`main-posters.js → main-poster-sprites.js → main-scroll-input.js → main-hero-sprite-batch.js → main-hero.js\`

필수 ID는 \`hero, heroStage, heroCanvas, heroBg, heroPoster, heroPosterCanvas\`입니다. 후속 포스터 전환을 위해 예제의 \`heroFx, heroIndicator\`도 그대로 복사하세요. 테마 데이터, 아틀라스, 포스터 이미지 경로는 main-hero.js 파일 위치를 기준으로 계산합니다. 제공한 js/assets의 상대 위치를 유지하면 됩니다. Lenis는 선택 사항이며 이 패키지는 기본 브라우저 입력만 사용합니다.

### 주요 조절값 — main-hero.js 상단 SETTINGS / PUSH

| 값 | 기본값 | 역할 |
| --- | --- | --- |
| fly / scatter | 900 / 1275 ms | 결합 / 분산 시간 |
| iconScatterSpeed / iconScatterDistance | 0.14 / 1.25 | 처음 부유하는 속도 / 거리 |
| iconBlurMax / iconBlurLayers | 3.5 / 6 | 최대 블러 / 레이어 수 |
| iconGatherLastStart | 0.28 | 마지막 아이콘 출발 시점 비율 |
| iconGatherCurve | 0.04 | 결합 이동 경로의 휨 |
| iconSideMaxCount | 1800 | 결합 주변 보조 아이콘 최대 수 |
| PUSH.radius / clickRadius | 110 / 200 px | 마우스 / 클릭 영향 범위 |
| autoInterval | 5500 ms | 포스터 자동 전환 간격 |

목적 글자를 바꾸려면 이미지뿐 아니라 좌표 데이터도 함께 재생성해야 합니다. 참고 SVG를 다른 것으로 교체하는 것만으로 메인의 글자가 바뀌지는 않습니다.

## 2. 아카이브 — 배경 아이콘 결합 / 분리

팀 SVG 14개를 읽고 같은 채움색의 도형끼리 하나의 조각으로 묶습니다. 실제 표시는 채움을 제거한 윤곽선입니다. 조각은 배경에서 천천히 흐르고, 화면 중앙으로 갈수록 옅어집니다. 문서 높이에 맞춰 조각 묶음을 추가하여 스크롤 아래까지 배경을 이어갑니다.

서로 다른 종류의 조각이 가까워지면 자동 결합합니다. 두 원본 도형을 하나의 SVG 안에 겹쳐 합성하고, 이동·각도·크기를 보간해 맞춘 뒤 기존 두 조각을 페이드아웃합니다. **SVG 경로 자체를 변형하는 모핑이나 boolean union 연산은 아닙니다.** 잠깐 유지한 후 늘어남·눌림·반동과 함께 두 조각으로 다시 분리됩니다.

직접 아이콘을 잡아 다른 아이콘 근처에 놓아도 결합합니다. 잡은 아이콘은 커지고, 대상에 가까워질수록 흔들림이 달라집니다. 놓을 때 대상이 없으면 합치지 않고 돌아다닙니다. Escape, 포인터 취소, 창 비활성화 시 드래그를 정리합니다.

### 적용

페이지에 다음 파일 하나를 연결하면 배경 호스트와 Shadow DOM 내부 스타일을 자동으로 만듭니다.

\`<script defer src="../js/archive-background.js"></script>\`

외부 라이브러리나 archive 원본 CSS는 필요 없습니다. \`ICON_URLS\`는 **HTML 페이지 기준** 상대 경로이므로 파일 배치를 바꿀 때 수정합니다. SVG는 HTTP로 제공해야 합니다. 효과가 body에 position:relative, isolation:isolate, 배경색을 설정하며 z-index:-1로 깔리므로 기존 페이지의 불투명 배경 레이어와 쌓임 순서를 확인하세요.

원본대로 760px 이상에서 동작합니다. 더 좁은 화면에 쓰려면 파일 상단의 archiveDesktop 미디어 쿼리를 조정하세요. 링크·버튼·입력창 및 기존 콘텐츠 클래스에서는 배경 드래그를 시작하지 않습니다. 새로운 콘텐츠 클래스는 isContentTarget 선택자에 추가할 수 있습니다.

### 주요 조절값 — archive-background.js 상단

| 값 | 기본값 | 역할 |
| --- | --- | --- |
| LINE_COLOR / STROKE_WIDTH | #444444 / 1.25 | 윤곽선 색 / 두께 |
| TILE_HEIGHT_VH | 80 | 반복 배경 묶음 기준 높이 |
| FLOW_SPEED | 18 | 부유 속도 계산 기준 |
| SNAP_DISTANCE | 24 px | 드롭 대상 탐색 여유 거리 |
| HOLD_SCALE | 1.25 | 잡은 아이콘의 확대 배율 |
| MERGE_DURATION / MERGE_HOLD | 0.65 / 1.05 초 | 자동 결합 시간 / 유지 시간 |
| MANUAL_MERGE_DURATION / MANUAL_MERGE_HOLD | 0.85 / 3 초 | 드래그 결합 시간 / 유지 시간 |
| SPLIT_IMPULSE | 175 | 분리할 때 주는 속도 |
| MERGE_COOLDOWN | 7 초 + 무작위 여유 | 분리 후 자동 재결합 대기 |
| MAX_MERGES | 2 | 자동 결합 시작을 제한하는 동시 결합 수 기준 |

MAX_MERGES는 자동 충돌 판정에만 적용됩니다. 수동 드래그 결합에는 같은 제한을 걸지 않습니다. 숨겨진 탭·페이지 전환 중에는 루프를 멈추고, 화면 밖 조각의 그리기를 생략합니다. 동작 줄이기에서는 자동 부유가 멈추지만 수동 결합과 분리 타이머는 유지됩니다.
`.replaceAll('\`', '`'));
await write('docs/FILES.ko.md', `# 파일 구성과 원본 대응

원본의 경로만 기재한 문서가 아니라, 필요한 파일의 실제 사본을 포함한 패키지입니다.

| 공유용 경로 | 원본 / 처리 |
| --- | --- |
| js/main-hero.js | 같은 경로에서 수정 없이 복사 |
| js/main-hero-sprite-batch.js | 같은 경로에서 수정 없이 복사 |
| js/main-scroll-input.js | 같은 경로에서 수정 없이 복사 |
| js/main-poster-sprites.js | 같은 경로의 전체 좌표 데이터 복사 |
| js/main-posters.js | js/main-data.js 중 MAIN_POSTERS만 추출; PDF 경로 비움 |
| js/archive-background.js | js/archive.js의 6. Floating Outline Background 블록 추출; 외부 archiveDesktop 변수를 내부에 정의 |
| css/main-effect.css | css/main.css의 hero / tablet / mobile hero 규칙 추출; 최소 reset과 예제 메뉴 스타일 추가 |
| css/share.css | 안내·아카이브 데모·SVG 미리보기용 스타일 |
| assets/images/poster/*.webp | 메인에서 실제 사용하는 아틀라스 2개 + 포스터 2개 복사 |
| assets/images/project/test/icon/*.svg | 아카이브에서 실제 로드하는 팀 SVG 14개, 수정 없이 복사 |
| assets/svg/individual/*.svg | 기존 MAIN_ICON_FRAGMENTS의 viewBox / 색상 / 도형으로 만든 개인 조각 ${individual.length}개 |
| assets/svg/source-data/*.js | 개인 SVG의 추출 근거인 조각 데이터·팀 매핑 원본 복사 |
| assets/svg/reference/assembly-poster.svg | assets/images/poster/assembly-poster.svg의 실제 사본; assembly 페이지 참고본 |
| assets/svg/reference/gyeolhap-word.svg | assets/images/designer/gyeolhap-word.svg의 실제 사본; designer 페이지 참고본 |
| assets/images/icons/mouse-icon-animated.svg | 메인 스크롤 안내 SVG 원본 사본 |
| assets/svg/catalog.json | SVG 경로·개인 ID·색상·팀 원본 연결 |
| main/index.html / archive/index.html | 관련 기능만 남긴 독립 실행 HTML |
| index.html / svg-gallery.html | 예제 목록과 실제 SVG 미리보기 |
| serve.mjs / START-WINDOWS.cmd | 외부 설치 패키지 없이 실행하는 로컬 서버 |
| copied-files.json | 그대로 복사한 파일의 원본 경로와 SHA-256 |
| MANIFEST.sha256 | 패키지 파일별 SHA-256 (이 파일 자신 제외) |

참고 SVG 두 개는 현재 main의 WebP 렌더링 입력 파일이 아닙니다. 개인 조각 SVG 역시 원본 데이터로부터 내보낸 편집·재사용용 파일이며, 메인 효과는 별도 포스터 아틀라스와 좌표 데이터가 담당합니다.

전체 사이트의 학생 소개, 위원회·교수진·영상, 아카이브 사진과 과거 전시 콘텐츠, 서버, 인증·환경설정은 들어 있지 않습니다. 개인 SVG 파일 이름에는 기존 데이터의 식별자를 유지했습니다.
`);
await write('copied-files.json', JSON.stringify(copied, null, 2));
console.log(JSON.stringify({ out, copied: copied.length, individualSVG: individual.length, totalSVG: svgPaths.length + individual.length + 3 }, null, 2));
