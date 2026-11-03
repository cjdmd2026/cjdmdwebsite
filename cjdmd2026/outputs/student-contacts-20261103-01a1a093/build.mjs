import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const out = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(out, '../../js/designer-data.js');
const source = await fs.readFile(sourcePath, 'utf8');
const sourceHash = crypto.createHash('sha256').update(source).digest('hex');
const context = { window: {} };
vm.runInNewContext(source, context, { timeout: 1000 });
const students = Array.from(context.window.DESIGNERS)
  .filter(s => s.id !== 'yoo-giljong')
  .sort((a, b) => a.order - b.order);
assert.equal(students.length, 33);
assert(!students.some(s => s.nameKo === '유길종'));
assert.equal(new Set(students.map(s => s.id)).size, students.length);
const missing = students.filter(s => !String(s.instagram || '').trim());
const rows = students.map((s, i) => [i + 1, s.nameKo, String(s.email || '').trim(), String(s.instagram || '').trim() || '없음']);
assert(rows.every(r => r[1] && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r[2])));
assert.equal(rows.filter(r => r[3] === '없음').length, missing.length);
assert.equal(students.filter(s => s.nameKo === '김지유').length, 2);

const wb = Workbook.create();
const sheet = wb.worksheets.add('학생 연락처');
sheet.showGridLines = false;
sheet.tabColor = '#334155';
const last = rows.length + 5;
sheet.getRange(`A1:D${last}`).format.font = { name: 'Malgun Gothic', size: 11, color: '#202733' };
sheet.getRange(`A1:D${last}`).format.verticalAlignment = 'center';
sheet.getRange(`A1:D${last}`).format.rowHeight = 25;
const widths = { A: 7, B: 12, C: 37, D: 28 };
for (const [col, width] of Object.entries(widths)) sheet.getRange(`${col}1:${col}${last}`).format.columnWidth = width;
sheet.getRange('A1:D1').format.rowHeight = 12;
sheet.getRange('A2').values = [['학생 이메일 · 인스타그램']];
sheet.getRange('A2:D2').format.font = { name: 'Malgun Gothic', size: 17, bold: true, color: '#1E293B' };
sheet.getRange('A2:D2').format.rowHeight = 37;
sheet.getRange('A2:D2').format.borders = { bottom: { style: 'thin', color: '#94A3B8' } };
sheet.getRange('A3').values = [[`출처: designer-data.js / 정리일: 2026-11-03 / 총 ${students.length}명`]];
sheet.getRange('A3:D3').format.font = { name: 'Malgun Gothic', size: 11, color: '#64748B' };
sheet.getRange('A4:D4').format.font = { name: 'Malgun Gothic', size: 11, color: '#64748B' };
sheet.getRange('A4:D4').format.rowHeight = 25;
sheet.getRange('A5:D5').values = [['번호', '이름', '이메일', '인스타그램']];
sheet.getRange(`A6:D${last}`).values = rows;
sheet.getRange(`B6:D${last}`).setNumberFormat('@');
sheet.getRange(`B6:D${last}`).format.horizontalAlignment = 'left';
sheet.getRange(`A6:A${last}`).setNumberFormat('0');
sheet.getRange(`A6:A${last}`).format.horizontalAlignment = 'right';
const table = sheet.tables.add(`A5:D${last}`, true, 'StudentContacts');
table.showFilterButton = true;
// Restrained alternating row fills keep adjacent contact details easy to track.
for (let row = 6; row <= last; row++) {
  sheet.getRange(`A${row}:D${row}`).format.fill = row % 2 ? '#F1F5F9' : '#FFFFFF';
}
sheet.getRange('A5:D5').format = {
  fill: '#334155',
  font: { name: 'Malgun Gothic', size: 11, bold: true, color: '#FFFFFF' },
  horizontalAlignment: 'center', verticalAlignment: 'center', rowHeight: 29,
  borders: { insideVertical: { style: 'thin', color: '#FFFFFF' } }
};
sheet.getRange(`A${last}:D${last}`).format.borders = { bottom: { style: 'thin', color: '#CBD5E1' } };
sheet.freezePanes.freezeRows(5);
wb.recalculate();
assert.deepEqual(JSON.parse(JSON.stringify(sheet.getRange(`A6:D${last}`).values)), rows);
assert.equal(sheet.getRange(`A6:D${last}`).values.length, 33);
const inspection = await wb.inspect({ kind: 'table', range: `학생 연락처!A5:D${last}`, include: 'values,formulas', tableMaxRows: 40, tableMaxCols: 4, maxChars: 14000 });
await fs.writeFile(path.join(out, 'inspection.ndjson'), inspection.ndjson);
const preview = await wb.render({ sheetName: '학생 연락처', range: `A1:D${last}`, scale: 1.4, format: 'png' });
await fs.writeFile(path.join(out, 'preview.png'), new Uint8Array(await preview.arrayBuffer()));
const xlsxPath = path.join(out, '학생_이메일_인스타그램_20261103.xlsx');
await (await SpreadsheetFile.exportXlsx(wb)).save(xlsxPath);

const lines = [
  '학생 이메일·인스타그램 연락처',
  `2026-11-03 기준 / 총 ${students.length}명`,
  '',
  ...rows.flatMap(r => [`${r[0]}. ${r[1]}`, `이메일: ${r[2]}`, `인스타그램: ${r[3]}`, ''])
];
const textPath = path.join(out, '학생_이메일_인스타그램_복사용.txt');
await fs.writeFile(textPath, '\uFEFF' + lines.join('\r\n'), 'utf8');
assert.equal(crypto.createHash('sha256').update(await fs.readFile(sourcePath, 'utf8')).digest('hex'), sourceHash);
await fs.writeFile(path.join(out, 'verification.json'), JSON.stringify({
  count: students.length, instagramMissing: missing.map(s => ({ id: s.id, name: s.nameKo })),
  sourceSha256: sourceHash, originalUnchanged: true, xlsx: xlsxPath, text: textPath
}, null, 2));
console.log(JSON.stringify({ count: students.length, instagramMissing: missing.map(s => s.nameKo), xlsx: xlsxPath, text: textPath }, null, 2));
