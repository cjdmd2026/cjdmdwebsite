import { upload } from '@vercel/blob/client';
import { initBotId } from 'botid/client/core';

const teams = __TEAMS__;
const limits = __LIMITS__;
const byId = id => document.getElementById(id);
const form = byId('submission-form');
const teamSelect = byId('team');
const input = byId('zip-file');
const dropZone = byId('drop-zone');
const status = byId('submission-status');
const submitButton = byId('submit-button');
const receiptKey = 'dmd2026-submission-receipt';
let selectedFile = null;
let enabled = false;
let busy = false;
let fileRevision = 0;
let polling = false;
let receipt = null;

initBotId({ protect: [{ path: '/api/submission', method: 'POST' }] });
for (const team of teams) teamSelect.add(new Option(team.name, team.id));
const selectedTeam = () => teams.find(team => team.id === teamSelect.value);
const sizeLabel = bytes => bytes < 1024 ** 2 ? `${(bytes / 1024).toFixed(1)} KiB` : `${(bytes / 1024 ** 2).toFixed(1)} MiB`;
function updateSubmit() { submitButton.disabled = !enabled || busy || !selectedTeam() || !selectedFile || !byId('confirm').checked; }
function showError(message) { byId('form-error').textContent = message; byId('form-error').hidden = false; byId('form-error').focus(); }
function clearError() { byId('form-error').hidden = true; }
function saveReceipt(value) {
  receipt = value;
  try { value ? sessionStorage.setItem(receiptKey, JSON.stringify(value)) : sessionStorage.removeItem(receiptKey); } catch { /* Submission can continue without browser storage. */ }
}
function setBusy(value) { busy = value; byId('form-fields').disabled = value; updateSubmit(); }
function showStatus(title, description, progress) {
  status.hidden = false;
  byId('status-title').textContent = title;
  byId('status-description').textContent = description;
  const bar = byId('upload-progress');
  bar.hidden = false;
  if (typeof progress === 'number') {
    bar.value = progress;
    byId('progress-label').textContent = `${Math.round(progress)}%`;
  } else { bar.removeAttribute('value'); byId('progress-label').textContent = '파일을 처리하고 있습니다'; }
}
function renderTeam() {
  const team = selectedTeam();
  byId('team-preview').hidden = !team;
  if (team) {
    byId('team-name').textContent = team.name;
    byId('team-members').textContent = team.members.join(' · ');
    byId('team-url').textContent = `dmd2026.com/${team.slug}/`;
  }
  byId('confirm').checked = false;
  updateSubmit();
}
function renderFile() {
  byId('file-preview').hidden = !selectedFile;
  if (selectedFile) {
    byId('file-name').textContent = selectedFile.name;
    byId('file-size').textContent = `${sizeLabel(selectedFile.size)} · 업로드 준비됨`;
    byId('choose-file').firstChild.textContent = '파일 변경 ';
  } else byId('choose-file').firstChild.textContent = '파일 선택 ';
  byId('confirm').checked = false;
  updateSubmit();
}
async function chooseFile(files) {
  if (busy) return;
  const revision = ++fileRevision;
  selectedFile = null;
  clearError();
  renderFile();
  if (!files.length) return;
  if (files.length !== 1) { showError('웹사이트를 하나의 ZIP으로 압축해서 선택해주세요.'); return; }
  const file = files[0];
  if (!/\.zip$/i.test(file.name)) { showError('ZIP 형식의 파일을 선택해주세요.'); return; }
  if (file.size > limits.zipBytes) { showError('ZIP 파일은 최대 200 MiB까지 제출할 수 있습니다.'); return; }
  if (file.size < 22) { showError('비어 있거나 올바르지 않은 ZIP 파일입니다.'); return; }
  try {
    const header = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    if (revision !== fileRevision) return;
    if (header[0] !== 0x50 || header[1] !== 0x4b || header[2] !== 3 || header[3] !== 4) { showError('ZIP 파일을 읽을 수 없습니다. 웹사이트 폴더를 다시 압축해주세요.'); return; }
    selectedFile = file;
    renderFile();
  } catch { if (revision === fileRevision) showError('파일을 읽지 못했습니다. 파일을 다시 선택해주세요.'); }
}
async function api(action, options = {}) {
  const headers = { ...options.headers };
  if (options.body) headers['Content-Type'] = 'application/json';
  const response = await fetch(`/api/submission?action=${action}`, { ...options, headers, cache: 'no-store', signal: AbortSignal.timeout(30000) });
  let data;
  try { data = await response.json(); } catch { throw new Error('제출 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'); }
  if (!response.ok) throw new Error(data.error || '요청을 처리하지 못했습니다.');
  return data;
}
const authorization = () => ({ Authorization: `Bearer ${receipt.ticket}` });
async function startProcessing() { await api('process', { method: 'POST', headers: authorization(), body: '{}' }); }
async function pollStatus() {
  if (polling || !receipt) return;
  polling = true;
  byId('retry-status').hidden = true;
  let failures = 0;
  let rounds = 0;
  try {
    while (receipt && rounds++ < 180) {
      let result;
      try { result = await api('status', { headers: authorization() }); failures = 0; }
      catch (error) {
        if (++failures >= 3) throw error;
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }
      const team = teams.find(item => item.id === result.teamId);
      if (result.phase === 'submitted') {
        showStatus('제출이 완료되었습니다.', `${team?.name || ''} 팀의 웹사이트가 접수되었습니다. 담당자 확인 후 공개됩니다.\n\n접수 번호  ${result.id.slice(0, 8)}\n연결될 주소  dmd2026.com/${result.slug}/`, 100);
        byId('status-kicker').textContent = 'SUCCESSFULLY SUBMITTED';
        status.classList.add('is-complete');
        byId('progress-label').textContent = '접수 완료';
        byId('new-submission').hidden = false;
        return;
      }
      if (result.phase === 'failed') {
        showStatus('파일을 확인해주세요.', `${result.message || '제출 처리에 실패했습니다.'}\n접수 번호  ${result.id.slice(0, 8)}`);
        byId('upload-progress').hidden = true;
        byId('progress-label').textContent = '제출 미완료';
        byId('new-submission').hidden = false;
        return;
      }
      if (result.phase === 'saving') showStatus('웹사이트를 전달하고 있어요.', `파일 ${result.completedFiles || 0} / ${result.totalFiles || '…'}개 처리 중\n접수 번호  ${result.id.slice(0, 8)}`);
      else showStatus('파일을 확인하고 있어요.', `웹사이트 구조와 파일을 확인하고 있습니다.\n접수 번호  ${result.id.slice(0, 8)}`);
      if ((result.phase === 'paused' && (!result.resumeAfter || result.resumeAfter <= Date.now())) || result.phase === 'awaiting_upload') await startProcessing();
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    throw new Error('처리가 계속되고 있습니다. 잠시 후 상태를 다시 확인해주세요.');
  } catch (error) {
    showStatus('접수 상태를 다시 확인해주세요.', `${error.message}\n업로드한 파일은 다시 선택하지 않아도 됩니다.\n접수 번호  ${receipt?.id?.slice(0, 8) || ''}`);
    byId('retry-status').hidden = false;
    byId('new-submission').hidden = false;
  } finally { polling = false; }
}
teamSelect.addEventListener('change', renderTeam);
byId('confirm').addEventListener('change', updateSubmit);
byId('choose-file').addEventListener('click', () => input.click());
input.addEventListener('change', () => chooseFile(input.files));
byId('remove-file').addEventListener('click', () => { fileRevision++; selectedFile = null; input.value = ''; renderFile(); clearError(); });
for (const type of ['dragenter', 'dragover']) dropZone.addEventListener(type, event => { event.preventDefault(); if (!busy) dropZone.classList.add('is-dragging'); });
for (const type of ['dragleave', 'drop']) dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.remove('is-dragging'); });
dropZone.addEventListener('drop', event => chooseFile(event.dataTransfer.files));
document.addEventListener('dragover', event => { if (event.dataTransfer?.types.includes('Files')) event.preventDefault(); });
document.addEventListener('drop', event => { if (event.dataTransfer?.types.includes('Files')) event.preventDefault(); });
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitButton.disabled || !selectedFile) return;
  clearError();
  setBusy(true);
  showStatus('업로드를 준비하고 있어요.', '잠시만 기다려주세요.', 0);
  status.focus();
  try {
    const prepared = await api('prepare', { method: 'POST', body: JSON.stringify({ teamId: selectedTeam().id, fileName: selectedFile.name, fileSize: selectedFile.size }) });
    await upload(prepared.pathname, selectedFile, { access: 'private', contentType: 'application/zip', handleUploadUrl: '/api/submission?action=upload', clientPayload: prepared.ticket, multipart: true,
      onUploadProgress: ({ percentage }) => showStatus('파일을 업로드하고 있어요.', `${selectedFile.name}\n업로드가 끝날 때까지 이 창을 열어두세요.`, percentage),
    });
    saveReceipt({ ...prepared, teamId: selectedTeam().id });
    showStatus('파일을 확인하고 있어요.', '업로드가 완료되었습니다. 제출 내용을 확인합니다.');
    try { await startProcessing(); } catch { /* The signed upload callback can also start processing. Poll the durable receipt. */ }
    await pollStatus();
  } catch (error) {
    setBusy(false);
    status.hidden = true;
    showError(error.message?.startsWith('Vercel Blob') ? '파일 업로드에 실패했습니다. 네트워크 상태를 확인하고 다시 제출해주세요.' : error.message || '파일 업로드에 실패했습니다. 다시 시도해주세요.');
  }
});
byId('retry-status').addEventListener('click', () => pollStatus());
byId('new-submission').addEventListener('click', () => {
  saveReceipt(null); selectedFile = null; input.value = ''; fileRevision++;
  status.hidden = true; status.classList.remove('is-complete');
  byId('status-kicker').textContent = 'SUBMITTING YOUR WORK';
  byId('new-submission').hidden = true; clearError(); setBusy(false); renderFile(); teamSelect.focus();
});
window.addEventListener('beforeunload', event => { if (busy && !receipt) { event.preventDefault(); event.returnValue = ''; } });
async function initialize() {
  try {
    const config = await api('config');
    enabled = config.enabled === true;
    if (!enabled) { byId('service-notice').textContent = '제출 기능을 준비하고 있어요. 파일 준비 방법을 먼저 확인하고, 담당자의 안내 후 제출해주세요.'; byId('service-notice').hidden = false; }
  } catch {
    byId('service-notice').textContent = '제출 서버에 연결하지 못했어요. 잠시 후 페이지를 새로고침해주세요.';
    byId('service-notice').hidden = false;
  }
  updateSubmit();
  try {
    const saved = JSON.parse(sessionStorage.getItem(receiptKey));
    if (enabled && saved?.ticket && saved?.id) {
      receipt = saved; teamSelect.value = saved.teamId; renderTeam(); setBusy(true);
      showStatus('이전 제출을 확인하고 있어요.', '접수 상태를 불러옵니다.');
      await pollStatus();
    }
  } catch { /* Invalid or unavailable browser storage does not block a new submission. */ }
}
initialize();
