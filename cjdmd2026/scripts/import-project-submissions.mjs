import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJSON = async name => JSON.parse(await readFile(path.join(root, 'output/figma', name), 'utf8'));
const submission = await readJSON('project-submissions-20261107.json');
const assets = await readJSON('project-assets-20261107.json');
const dataPath = path.join(root, 'js/project-data.js');
const context = { window: {} };
vm.runInNewContext(await readFile(dataPath, 'utf8'), context);
const projects = context.window.PROJECTS;
const courses = { interactive: '인터랙티브', service: '서비스', interface: '인터페이스' };

for (const project of projects) {
    const projectAssets = assets.filter(asset => asset.projectId === project.id);
    if (projectAssets.length !== 6) throw new Error(`Expected six assets: ${project.id}`);
    const team = submission.teams.find(team => team.nodeId === projectAssets[0].teamNodeId);
    if (!team) throw new Error(`Submission missing: ${project.id}`);
    const value = suffix => {
        const field = team.fields.find(field => field.name.endsWith(suffix));
        const result = field?.values.join('\n').trim();
        if (!result) throw new Error(`Missing ${suffix}: ${project.id}`);
        return result;
    };
    const asset = role => projectAssets.find(asset => asset.role === role);
    const url = role => {
        const file = asset(role);
        return `../${file.output}${file.contentHash ? `?v=${file.contentHash}` : ''}`;
    };
    // Preserve the site's stable IDs, current project names, members and ordering.
    project.description = value('_공통소개글');
    project.image = url('portrait');
    project.slideImage = url('landscape');
    project.logo = url('logo');
    for (const [key, label] of Object.entries(courses)) {
        const [width, height] = asset(key).dimensions;
        project.courseCards[key] = {
            title: value(`_${label}_제목`),
            description: value(`_${label}_설명`),
            image: url(key),
            ...(project.id === 'omix' ? { imageFit: 'cover' }
                : width / height < 1.45 || width / height > 2.1 ? { imageFit: 'contain' } : {})
        };
    }
}

const header = `/* =========================================================
   Project Data — 팀 공통 정보 + 과목별 상세 카드
   Figma 제출 자료 반영: 2026-11-07 · 14팀 / 3과목
   - image: 세로 대표 이미지 (프로젝트 그리드)
   - slideImage: 가로 대표 이미지 (프로젝트 슬라이드)
   - logo: 디자이너 상세의 전체 화면 로고 (SVG 우선)
   - courseCards: interactive → service → interface
   - imageFit: OMIX는 cover로 영역을 채우며, 나머지는 제출 비율에 맞춰 지정
   - 팀의 기존 id / title / members / slideOrder는 유지합니다.
========================================================= */

`;
const serialized = JSON.stringify(projects, null, 4).replace(/^(\s*)"([A-Za-z_$][\w$]*)":/gm, '$1$2:');
await writeFile(dataPath, header + 'window.PROJECTS = ' + serialized + ';\n');

for (const name of ['project/index.html', 'project/test01.html', 'project/test02.html', 'designer/profile/index.html']) {
    const file = path.join(root, name);
    let html = await readFile(file, 'utf8');
    html = html.replace(/project-data\.js\?v=[^"']+/g, 'project-data.js?v=20261107-grid-descriptions');
    if (name === 'designer/profile/index.html') {
        html = html.replace('designer-detail.css"', 'designer-detail.css?v=20261107-submissions"')
            .replace('designer-detail.js"', 'designer-detail.js?v=20261107-submissions"');
    }
    await writeFile(file, html);
}
console.log(`Applied ${projects.length} projects / ${projects.length * 3} course cards.`);
