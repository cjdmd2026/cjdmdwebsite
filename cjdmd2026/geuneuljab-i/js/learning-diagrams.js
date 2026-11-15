// Explanatory schematics, not measured drawings of the loaded GLB.
// Structure references: https://hanok.seoul.go.kr/front/kor/info/infoHanok.do?tab=2
// https://encykorea.aks.ac.kr/Article/E0027666 (rafters)
// https://encykorea.aks.ac.kr/Article/E0053449 (foundation stones)
// Gate UI slot names differ from the actual members; resolve them before drawing.
const gateParts = { giwa: 'chwidu', gaepan: 'purlin', seokkarae: 'stone', gidung: 'platform' };
const commonParts = { juchutdol: 'stone' };
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const path = (d, kind = 'context') => `<path class="diagram-${kind}" d="${d}"/>`;
const rect = (x, y, width, height, kind = 'selected') => `<rect class="diagram-${kind}" x="${x}" y="${y}" width="${width}" height="${height}" rx="2"/>`;
const circle = (x, y, radius, kind = 'selected') => `<circle class="diagram-${kind}" cx="${x}" cy="${y}" r="${radius}"/>`;
const label = (x, y, ko, en, lang, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}">${(lang === 'en' ? en : ko).split('\n').map((line, index) => `<tspan x="${x}" dy="${index ? 24 : 0}">${escape(line)}</tspan>`).join('')}</text>`;
const arrow = (x, y, length = 27) => path(`M${x} ${y}v${length}m-5-6 5 6 5-6`, 'arrow');
const roof = () => path('M32 91Q62 96 87 78L180 30 273 78Q298 96 328 91M32 98Q62 103 87 85L180 37 273 85Q298 103 328 98');
const frame = () => path('M82 94h196M92 94v46m176-46v46M65 141h230');
const plane = () => path('M38 108 124 37h204l-86 71Z', 'surface');
const rafters = (kind = 'context') => [0, 1, 2, 3, 4, 5].map(i => path(`M${46 + i * 34} 113l86-71`, kind)).join('');
// A curled ridge-end profile with its scroll and seated base, rather than a
// flame icon. Use the same selected fill and line weights as the other parts.
const ridgeOrnament = (x, y, mirror = 1, scale = 1) => `<g transform="translate(${x} ${y}) scale(${mirror * scale} ${scale})">`
  + path('M-12 0v-13c-11-2-16-15-10-25c6-11 22-10 27 0c5 10 3 23 5 38Z', 'selected')
  + path('M-13-15c-9-5-10-17-2-22c7-4 15 1 13 8c-1 6-9 7-11 2c-1-3 2-5 5-4M-12-7H9', 'accent')
  + '</g>';
const ridgeRoof = () => path('M83 78Q180 87 277 78Q291 106 323 126Q180 144 37 126Q69 106 83 78Z', 'surface')
  + path('M83 78 58 92Q36 104 18 100Q28 118 37 126M277 78 302 92Q324 104 342 100Q332 118 323 126M18 105Q28 123 37 131Q180 149 323 131Q332 123 342 105')
  + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
    const start = 94 + i * 21.5, end = 53 + i * 31.75;
    const bottom = 135 - 9 * ((end - 180) / 143) ** 2;
    return path(`M${start} 82Q${(start + end) / 2} 108 ${end} ${bottom.toFixed(1)}`);
  }).join('')
  + path('M65 104Q180 120 295 104M51 117Q180 134 309 117M83 72Q180 81 277 72M83 78v-6m194 6v-6');
const bracket = (x, y) => rect(x - 12, y, 24, 12) + rect(x - 31, y - 14, 62, 12) + rect(x - 49, y - 28, 98, 12) + rect(x - 39, y - 40, 18, 10) + rect(x + 21, y - 40, 18, 10);

const diagrams = {
  giwa: {
    descriptions: [
      ['기와가 지붕 바탕을 덮는 위치를 강조한 그림', 'Roof tiles highlighted above the roof base'],
      ['오목한 암키와의 골과 이음부를 덮는 수키와의 단면', 'Concave tile channels and convex tiles covering their joints']
    ],
    role: lang => plane() + rafters() + path('M38 100 124 29h204l-86 71Z', 'selected')
      + [0, 1, 2, 3, 4, 5].map(i => path(`M${51 + i * 33} 91l69-57`, 'accent')).join('')
      + path('M75 70h-44v-34', 'guide') + label(32, 26, '기와', 'Roof tiles', lang, 'start')
      + label(180, 160, '지붕 바탕 위를 덮는 층', 'Covering the roof base', lang),
    detail: lang => path('M40 112h280', 'guide')
      + path('M48 75Q76 115 104 75Q132 115 160 75Q188 115 216 75Q244 115 272 75', 'accent')
      + [104, 160, 216].map(x => path(`M${x - 13} 79Q${x} 49 ${x + 13} 79`, 'selected')).join('')
      + path('M160 57V36h56M132 95v40H92', 'guide')
      + label(222, 39, '수키와', 'Convex tile', lang, 'start')
      + label(lang === 'en' ? 124 : 86, 140, '암키와', 'Concave tile', lang, 'end')
      + label(180, 166, '골 위의 이음부를 덮습니다', 'Covering the joints between channels', lang)
  },
  gaepan: {
    descriptions: [
      ['서까래 위를 연속된 면으로 덮는 개판의 위치', 'Roof boarding as a continuous plane above the rafters'],
      ['개판과 그 아래 서까래를 분리해 보여주는 그림', 'An exploded view of boarding above the rafters']
    ],
    role: lang => rafters() + path('M38 100 124 29h204l-86 71Z', 'selected')
      + [0, 1, 2].map(i => path(`M${59 + i * 22} ${83 - i * 18}h204`, 'accent')).join('')
      + path('M93 66H36V35', 'guide') + label(32, 26, '개판', 'Boarding', lang, 'start')
      + label(180, 160, '서까래 사이를 면으로 잇습니다', 'A continuous plane above rafters', lang),
    detail: lang => path('M50 73 108 27h203l-58 46Z', 'selected')
      + path('M69 58h202m-185-14h202', 'accent')
      + [0, 1, 2, 3, 4, 5].map(i => path(`M${51 + i * 34} 134l60-47`, 'context')).join('')
      + [104, 182, 260].map(x => arrow(x, 79, 19)).join('')
      + label(35, 38, '개판', 'Boarding', lang, 'start')
      + label(280, 146, '서까래', 'Rafters', lang)
      + label(180, 169, '판재는 서까래 위에 놓입니다', 'Boards rest on the rafters', lang)
  },
  seokkarae: {
    descriptions: [
      ['도리 위에 경사지게 반복되는 서까래', 'Repeated sloping rafters resting on purlins'],
      ['곧은 구간의 평서까래와 모서리의 선자서까래 배치 비교', 'Parallel rafters and fan rafters at a roof corner']
    ],
    role: lang => plane() + path('M49 111h202M83 83h202M117 55h202') + rafters('accent')
      + label(180, 160, '경사진 부재가 지붕면을 만듭니다', 'Sloping members form the roof plane', lang),
    detail: lang => path('M26 43h119v86H26ZM198 42h122v87H198Z', 'surface')
      + [0, 1, 2, 3, 4].map(i => path(`M${38 + i * 23} 47v77`, 'accent')).join('')
      + [0, 1, 2, 3, 4].map(i => path(`M202 46L${218 + i * 24} 125`, 'accent')).join('')
      + path('M202 46 314 125', 'selected')
      + label(85, 153, '평서까래', 'Parallel rafters', lang)
      + label(260, 153, '선자서까래', 'Fan rafters', lang)
  },
  gidung: {
    descriptions: [
      ['보와 지붕을 받치고 주춧돌로 하중을 전달하는 기둥', 'Columns supporting the beams and transferring loads to stones'],
      ['자연석 주춧돌의 표면에 맞춘 기둥 밑동의 개념 단면', 'A schematic column base fitted to an irregular foundation stone']
    ],
    role: lang => roof() + path('M78 93h204M63 145h234')
      + [94, 176, 258].map(x => rect(x - 8, 95, 16, 42)).join('')
      + [94, 176, 258].map(x => path(`M${x - 16} 138h32l5 8h-42Z`, 'surface')).join('')
      + arrow(319, 102, 30) + label(180, 167, '보 → 기둥 → 주춧돌', 'Beam → column → stone', lang),
    detail: lang => path('M134 29h58v73q-15-9-29 1q-18-3-29 6Z', 'selected')
      + path('M112 111 134 109q11-9 29-6q14-10 29-1l23 5 11 28H104Z', 'surface')
      + path('M105 144h121', 'guide') + arrow(251, 65, 54)
      + label(87, 56, '기둥', 'Column', lang)
      + label(281, 143, '주춧돌', 'Stone', lang)
      + label(180, 169, '돌 표면에 밑동을 맞춥니다', 'Fitting the timber base to the stone', lang)
  },
  gongpo: {
    descriptions: [
      ['기둥 위와 처마 아래에 겹쳐진 공포 부재의 개념도', 'Layered bracket members above a column and beneath the eaves'],
      ['두 층의 처마 아래 공포를 함께 강조한 그림', 'Bracket groups highlighted beneath both roof levels']
    ],
    role: lang => path('M49 64 180 28 311 64M49 70 180 34 311 70M170 114v35m20-35v35')
      + bracket(180, 105) + label(180, 168, '기둥 위에 겹쳐지는 부재', 'Layered members above the column', lang),
    detail: lang => path('M60 52 180 22 300 52M60 58 180 28 300 58M70 121 180 91 290 121M70 127 180 97 290 127M114 71v38m132-38v38M114 140v16m132-16v16')
      + [114, 180, 246].map(x => rect(x - 12, 61, 24, 9) + rect(x - 18, 130, 36, 9)).join('')
      + label(32, 69, '2층', 'Upper', lang) + label(32, 138, '1층', 'Lower', lang)
      + label(180, 173, '두 층의 같은 부위를 함께 선택', 'Matching groups on both levels', lang)
  },
  chwidu: {
    descriptions: [
      ['기와 골과 곡선 처마를 나타낸 지붕 위 용마루 양 끝의 취두 위치', 'Chwidu at both ridge ends above a tiled roof with curved eaves'],
      ['용마루 끝에 놓이는 취두의 말린 형태와 받침을 확대한 선형 개념도', 'Line diagram of the curled Chwidu profile and its base at the ridge end']
    ],
    role: lang => ridgeRoof() + ridgeOrnament(84, 76) + ridgeOrnament(276, 76, -1)
      + path('M148 25H112L91 39M212 25H248L269 39', 'guide')
      + label(180, 29, '취두', 'Chwidu', lang)
      + label(180, 178, '용마루 양 끝을 마감합니다', 'Finishing both ridge ends', lang),
    detail: lang => path('M129 118 309 89 326 126Q201 166 78 152ZM129 105 309 76v13l-180 29Z', 'surface')
      + path('M120 100 300 66l9 5-180 34ZM129 111l180-29M129 115l180-29M120 100v12l9 6')
      + [0, 1, 2, 3, 4, 5].map(i => path(`M${144 + i * 28} ${116 - i * 4.5}l${-40 + i * 8} ${37 - i * 4}`)).join('')
      + ridgeOrnament(129, 101, 1, 1.3)
      + path('M66 41H89L109 61M267 38V56L235 92', 'guide')
      + label(66, 33, '취두', 'Chwidu', lang)
      + label(267, 30, '용마루', 'Main ridge', lang)
      + label(180, 185, '용마루 끝에 놓이는 장식기와', 'Ornament at the ridge end', lang)
  },
  purlin: {
    descriptions: [
      ['지붕 경사 아래 여러 높이에 놓인 도리의 단면 위치', 'Purlin sections at different heights beneath the roof slope'],
      ['서까래와 직각으로 건물 길이 방향에 놓인 도리', 'Purlins running along the building, across the rafters']
    ],
    role: lang => path('M19 108 180 24 341 108M19 115 180 31 341 115') + frame()
      + [[51, 94], [115, 61], [180, 27], [245, 61], [309, 94]].map(([x, y]) => circle(x, y, 8)).join('')
      + label(180, 169, '높이를 달리하며 지붕을 받칩니다', 'Supporting the roof\nat different heights', lang),
    detail: lang => plane() + rafters()
      + path('M116 43h211M77 75h211M37 107h211', 'heavy')
      + path('M116 39v8m211-8v8M77 71v8m211-8v8M37 103v8m211-8v8', 'context')
      + label(180, 164, '서까래를 가로질러 받치는 도리', 'Purlins supporting the rafters', lang)
  },
  stone: {
    descriptions: [
      ['기둥 바로 아래 놓이는 주춧돌 위치', 'Foundation stones directly beneath each column'],
      ['기둥에서 주춧돌과 지반으로 이어지는 하중 전달', 'Load passing from a column through its stone into the ground']
    ],
    role: lang => roof() + frame()
      + [92, 268].map(x => path(`M${x - 18} 135h36l7 13h-50Z`, 'selected')).join('')
      + label(180, 172, '각 기둥의 바로 아래', 'Directly beneath each column', lang),
    detail: lang => path('M157 26h46v75h-46Z')
      + path('M139 101h82l15 25H124Z', 'selected')
      + path('M76 132h208M85 137l-8 8m34-8-8 8m34-8-8 8m34-8-8 8m34-8-8 8m34-8-8 8m34-8-8 8m34-8-8 8', 'guide')
      + arrow(180, 54, 34) + arrow(150, 130, 20) + arrow(210, 130, 20)
      + label(180, 175, '기둥 → 주춧돌 → 지반', 'Column → stone → ground', lang)
  },
  buyeon: {
    descriptions: [
      ['서까래 위에 덧대어 처마를 내미는 부연의 위치', 'Buyeon members extending the eave above the rafters'],
      ['서까래 한 단의 홑처마와 부연이 추가된 겹처마 비교', 'Single eaves compared with double eaves that add buyeon']
    ],
    role: lang => path('M47 70 257 130M51 62 261 122M83 135h150M122 94v41M46 54 312 100')
      + path('M165 60 316 102l-4 13-151-42Z', 'selected')
      + path('M227 76V37h62', 'guide') + label(295, 40, '부연', 'Buyeon', lang)
      + label(180, 168, '서까래 위의 두 번째 처마 층', 'A second tier above the rafters', lang),
    detail: lang => path('M25 64 144 103M25 72 144 111M51 79v49M208 73 318 111M208 81 318 119M224 86v42')
      + path('M255 56 332 81l-3 10-77-25Z', 'selected')
      + path('M158 36v101', 'guide')
      + label(87, 155, '홑처마', 'Single eave', lang)
      + label(264, 155, '겹처마', 'Double eave', lang)
  },
  pyeongodae: {
    descriptions: [
      ['서까래 끝을 가로로 연결하는 평고대', 'Pyeongodae connecting the rafter ends along the eave'],
      ['서까래 끝의 초매기와 부연 끝의 이매기 위치 비교', 'The first pyeongodae at rafters and the second at buyeon ends']
    ],
    role: lang => plane() + rafters()
      + path('M31 116Q140 130 251 113', 'heavy')
      + path('M155 125v20', 'guide')
      + label(180, 166, '반복되는 부재 끝을 하나의 선으로', 'Connecting the repeated rafter ends', lang),
    detail: lang => path('M35 66 209 118M35 74 209 126M148 59 306 99M148 67 306 107')
      + circle(208, 122, 7) + circle(305, 103, 7)
      + path('M208 130v17H119M305 94V39h-63', 'guide')
      + label(111, 154, '초매기', 'First tier', lang, 'end')
      + label(234, 42, '이매기', 'Second tier', lang, 'end')
      + label(180, 175, '각 층의 처마 끝선을 정리합니다', 'Defining the edge of each tier', lang)
  },
  chunyeo: {
    descriptions: [
      ['두 지붕면이 만나는 모서리의 대각선 부재인 추녀', 'Chunyeo at the diagonal where two roof planes meet'],
      ['추녀 양옆으로 펼쳐지는 선자서까래', 'Fan rafters spreading on both sides of the corner rafter']
    ],
    role: lang => path('M51 38h132l130 98H51Z', 'surface')
      + [76, 102, 128, 154].map(x => path(`M${x} 43v88`)).join('')
      + path('M188 48h-5v87M215 68h-32M242 88h-59M269 108h-86')
      + path('M183 38 316 136', 'heavy')
      + label(180, 166, '두 지붕면이 만나는 대각선', 'The diagonal at the roof corner', lang),
    detail: lang => path('M54 128h246V34', 'guide')
      + [70, 108, 147, 184, 223, 261, 300].map(x => path(`M168 36L${x} 128`)).join('')
      + path('M168 36 300 128', 'heavy')
      + path('M300 135v14h-35', 'guide')
      + label(256, 155, '추녀', 'Chunyeo', lang, 'end')
      + label(94, 162, '선자서까래', 'Fan rafters', lang)
  },
  sarae: {
    descriptions: [
      ['추녀 위에 놓여 겹처마 모서리를 연장하는 사래', 'Sarae above the chunyeo extending a double-eave corner'],
      ['긴 추녀와 그 위의 짧은 사래의 층위 관계', 'A shorter sarae above the main corner rafter']
    ],
    role: lang => path('M38 78 270 132M42 67 274 121M61 148h183M101 94v54')
      + path('M170 57 322 92l-3 13-152-35Z', 'selected')
      + path('M258 73V35h32', 'guide')
      + label(296, 38, '사래', 'Sarae', lang)
      + label(180, 170, '겹처마 모서리에 더해지는 층', 'An added tier\nat the double-eave corner', lang),
    detail: lang => path('M38 83 270 134l3-13L41 70Z', 'surface')
      + path('M164 47 323 83l-3 13-159-36Z', 'selected')
      + path('M98 86v48M242 70V33', 'guide')
      + label(98, 155, '추녀', 'Chunyeo', lang)
      + label(242, 26, '사래', 'Sarae', lang)
      + label(235, 172, '추녀 위의 짧은 부재', 'A shorter member above', lang)
  },
  chimannori: {
    descriptions: [
      ['여러 도리 가운데 처마 쪽 가장 바깥의 처마도리', 'The outermost eave purlins among the roof purlins'],
      ['처마도리 바깥으로 내민 서까래의 관계', 'Rafters projecting outward beyond the eave purlin']
    ],
    role: lang => roof() + frame()
      + [[115, 61], [180, 27], [245, 61]].map(([x, y]) => circle(x, y, 7, 'surface')).join('')
      + circle(51, 94, 8) + circle(309, 94, 8)
      + label(180, 169, '처마 쪽의 가장 바깥 도리', 'The outermost purlins at the eaves', lang),
    detail: lang => plane() + rafters()
      + path('M116 43h211M77 75h211') + path('M37 107h211', 'heavy')
      + path('M37 115v29h98', 'guide')
      + label(144, 149, '처마도리', 'Eave purlin', lang, 'start')
      + label(180, 174, '받침 밖으로 처마가 내밀어집니다', 'The eave extends beyond its support', lang)
  },
  platform: {
    descriptions: [
      ['건물 하부를 둘러싼 높여진 기단', 'A raised platform beneath the building'],
      ['지면보다 높인 바닥과 기단 석축의 개념 단면', 'A section showing a raised floor and the platform stonework']
    ],
    role: lang => roof() + path('M86 94h188M95 94v30m170-30v30')
      + path('M59 124h242v24H59Z', 'selected')
      + path('M59 136h242M120 124v12m60-12v12m60-12v12m-90 0v12m60-12v12', 'accent')
      + label(180, 172, '건물을 지면보다 높이는 기반', 'A raised base for the building', lang),
    detail: lang => path('M105 45v36m150-36v36M65 132h265', 'guide')
      + path('M83 85h197v36H83ZM60 122h243v10H60Z', 'selected')
      + path('M83 103h197M139 85v18m70-18v18m-43 0v18m70-18v18', 'accent')
      + path('M35 85v47m-5-47h10m-10 47h10', 'accent')
      + label(182, 66, '높인 바닥', 'Raised floor', lang)
      + label(303, 156, '지면', 'Ground', lang)
      + label(180, 165, '석축과 바닥이\n하나의 기반을 이룹니다', 'Stonework supports\nthe raised floor', lang)
  }
};

export function getLearningDiagramKey(building, part) {
  return (building === 'gate' && gateParts[part]) || commonParts[part] || part;
}

export function renderLearningDiagrams(panel, { building, part, lang = 'ko' }) {
  const key = getLearningDiagramKey(building, part);
  const diagram = diagrams[key];
  if (!panel || !diagram) return;
  ['role', 'detail'].forEach((section, index) => {
    const container = panel.querySelector(section === 'role' ? '.role-diagram' : '.light-diagram');
    if (!container) return;
    const description = diagram.descriptions[index][lang === 'en' ? 1 : 0];
    container.removeAttribute('aria-hidden');
    container.dataset.diagram = key;
    container.innerHTML = `<svg class="part-diagram" viewBox="0 0 360 208" role="img" aria-label="${escape(description)}" lang="${lang === 'en' ? 'en' : 'ko'}"><title>${escape(description)}</title>${diagram[section](lang)}</svg>`;
  });
}
