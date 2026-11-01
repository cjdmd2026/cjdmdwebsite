import { upload } from '@vercel/blob/client';
import { initBotId } from 'botid/client/core';
import { folderSelection, sameManifest } from './files.mjs';
import './header.mjs';

const teams = __TEAMS__;
const byId = id => document.getElementById(id);
const teamSelect = byId('team');
const input = byId('folder-files');
const status = byId('submission-status');
const receiptKey = 'dmd2026-folder-receipt';
let entries = [], folderName = '', receipt = null, enabled = false, busy = false;
let stage = 'draft', polling = false, paused = false, controller;
let admissionState = { busy: false }, refreshing = false, heartbeatPending = false;
const rows = new Map();
const selectedTeam = () => teams.find(team => team.id === teamSelect.value);
const allUploaded = () => entries.length > 0 && entries.every(entry => entry.state === 'uploaded');
const sizeLabel = bytes => bytes < 1024 ** 2 ? `${(bytes / 1024).toFixed(1)} KiB` : `${(bytes / 1024 ** 2).toFixed(1)} MiB`;
const manifest = () => entries.map(({ path, size, sha256 }) => ({ path, size, sha256 }));
const authorization = () => ({ Authorization: `Bearer ${receipt.ticket}` });
initBotId({ protect: [{ path: '/api/submission', method: 'POST' }] });
for (const team of teams) teamSelect.add(new Option(team.name, team.id));

function controls() {
  byId('form-fields').disabled = busy || stage !== 'draft';
  teamSelect.disabled = Boolean(receipt);
  byId('remove-file').hidden = Boolean(receipt);
  const pending = entries.filter(entry => entry.state !== 'uploaded');
  const waiting = admissionState.busy && !receipt;
  byId('upload-button').disabled = !enabled || waiting || busy || stage !== 'draft' || !selectedTeam() || !pending.length || pending.some(entry => !entry.file);
  byId('upload-button').textContent = waiting ? '다른 팀 제출 완료 후 업로드 가능' : allUploaded() ? '모든 파일 업로드 완료' : entries.some(entry => entry.state === 'failed') ? '실패한 파일 다시 업로드 ↑' : receipt ? '남은 파일 이어서 업로드 ↑' : '업로드 시작 ↑';
  byId('submit-button').disabled = !enabled || busy || stage !== 'draft' || !receipt || !allUploaded() || !byId('confirm').checked;
  byId('new-submission').hidden = !receipt || busy;
  byId('new-submission').textContent = stage === 'draft' && receipt ? '업로드 취소 · 새 제출 시작 ↗' : '새 제출 시작 ↗';
}
function renderAdmission() {
  byId('admission-notice').hidden = !enabled;
  const owner = teams.find(team => team.id === admissionState.teamId)?.name || '다른';
  byId('admission-message').textContent = admissionState.busy
    ? admissionState.cleaning ? `이전 제출의 임시 파일을 정리하고 있어요. 약 ${Math.max(1, Math.ceil((admissionState.expiresAt - Date.now()) / 60000))}분 대기 후 다시 확인해주세요. 이 화면은 1분마다 자동 확인합니다.`
      : receipt ? '현재 접수를 진행 중입니다. 30분 이상 진행이 없으면 임시 파일이 정리됩니다.'
        : `${owner} 팀이 제출 중이에요. 지금은 팀과 폴더를 준비할 수 있고, 앞선 제출이 끝나면 업로드할 수 있습니다.`
    : '한 번에 한 팀씩 제출합니다. 업로드 시작을 누르면 제출 순서를 확보합니다.';
  byId('refresh-admission').hidden = !admissionState.busy || Boolean(receipt && stage !== 'done');
  controls();
}
async function refreshAdmission() {
  if (refreshing) return;
  refreshing = true; byId('refresh-admission').disabled = true;
  try {
    const config = await api('config'); enabled = config.enabled === true && ('webkitdirectory' in input);
    admissionState = config.admission || { busy: false };
    byId('service-notice').hidden = enabled;
    if (!enabled) byId('service-notice').textContent = '제출 기능을 준비하고 있어요. 폴더와 파일 목록을 먼저 확인하고, 담당자의 안내 후 제출해주세요.';
    renderAdmission();
  } catch {
    enabled = false;
    byId('service-notice').textContent = '제출 상태를 확인하지 못했어요. 잠시 후 다시 확인해주세요.';
    byId('service-notice').hidden = false;
    controls();
  } finally { refreshing = false; byId('refresh-admission').disabled = false; }
}
function setBusy(value) { busy = value; controls(); }
function showError(message) { byId('form-error').textContent = message; byId('form-error').hidden = false; byId('form-error').focus(); }
function clearError() { byId('form-error').hidden = true; }
function saveReceipt(value) {
  receipt = value;
  try { value ? localStorage.setItem(receiptKey, JSON.stringify(value)) : localStorage.removeItem(receiptKey); } catch { /* The open tab can still finish submission. */ }
}
function showStatus(title, description, progress) {
  status.hidden = false;
  byId('status-title').textContent = title;
  byId('status-description').textContent = description;
  const bar = byId('upload-progress'); bar.hidden = false;
  if (typeof progress === 'number') { bar.value = progress; byId('progress-label').textContent = `${Math.round(progress)}%`; }
  else { bar.removeAttribute('value'); byId('progress-label').textContent = '처리 중'; }
}
function renderTeam() {
  const team = selectedTeam(); byId('team-preview').hidden = !team;
  if (team) {
    byId('team-name').textContent = team.name;
    byId('team-members').textContent = team.members.join(' · ');
    byId('team-url').textContent = `dmd2026.com/${team.slug}/`;
  }
  byId('confirm').checked = false; controls();
}
function updateRow(index) {
  const entry = entries[index], row = rows.get(index);
  if (!row) return;
  const labels = { pending: entry.file ? '대기' : '폴더 재선택', uploading: `${Math.round(entry.progress || 0)}%`, verifying: '확인 중', uploaded: '완료', failed: '실패' };
  row.li.dataset.state = entry.state; row.state.textContent = labels[entry.state] || '대기';
  row.error.textContent = entry.error || ''; row.error.hidden = !entry.error;
  byId('file-count').textContent = `${entries.filter(item => item.state === 'uploaded').length} / ${entries.length}개 완료`;
}
function renderFiles() {
  byId('file-preview').hidden = !entries.length; byId('file-list-panel').hidden = !entries.length;
  byId('file-name').textContent = folderName || '이전 제출 폴더';
  byId('file-size').textContent = `${entries.length}개 파일 · ${sizeLabel(entries.reduce((sum, entry) => sum + entry.size, 0))}`;
  byId('choose-file').firstChild.textContent = receipt ? '같은 폴더 다시 선택 ' : entries.length ? '폴더 변경 ' : '폴더 선택 ';
  byId('file-list').replaceChildren(); rows.clear();
  entries.forEach((entry, index) => {
    const li = document.createElement('li'); li.className = 'file-row';
    const path = document.createElement('span'); path.className = 'file-path'; path.textContent = entry.path;
    const size = document.createElement('span'); size.className = 'file-size'; size.textContent = sizeLabel(entry.size);
    const state = document.createElement('span'); state.className = 'file-state';
    const error = document.createElement('span'); error.className = 'file-error';
    li.append(path, size, state, error); byId('file-list').append(li);
    rows.set(index, { li, state, error }); updateRow(index);
  });
  controls();
}
async function chooseFolder(files) {
  if (busy || !files.length || stage !== 'draft') return;
  clearError(); setBusy(true);
  try {
    const selected = folderSelection(files);
    for (let i = 0; i < selected.files.length; i++) {
      const entry = selected.files[i];
      showStatus('폴더를 확인하고 있어요.', `${entry.path}\n파일 ${i + 1} / ${selected.files.length}개 확인 중`, i / selected.files.length * 100);
      const digest = await crypto.subtle.digest('SHA-256', await entry.file.arrayBuffer());
      entry.sha256 = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    }
    if (receipt && !sameManifest(selected.files, manifest())) throw new Error('이전 업로드와 파일 내용이 다릅니다. 원래 폴더를 선택하거나 ‘새 제출 시작’을 눌러 수정본을 제출해주세요.');
    entries = selected.files.map((entry, i) => ({ ...entry, state: receipt && entries[i]?.state === 'uploaded' ? 'uploaded' : 'pending' }));
    folderName = selected.name; byId('confirm').checked = false; renderFiles();
    if (receipt) uploadSummary(); else status.hidden = true;
  } catch (error) {
    if (receipt) uploadSummary(); else status.hidden = true;
    showError(error.message || '폴더를 읽지 못했습니다. 다시 선택해주세요.');
  }
  finally { input.value = ''; setBusy(false); }
}
async function api(action, options = {}) {
  const headers = { ...options.headers };
  if (options.body) headers['Content-Type'] = 'application/json';
  const response = await fetch(`/api/submission?action=${action}`, { ...options, headers, cache: 'no-store', signal: AbortSignal.timeout(action === 'confirm-file' ? 120000 : 30000) });
  let data;
  try { data = await response.json(); } catch { throw new Error('제출 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'); }
  if (!response.ok) { const error = new Error(data.error || '요청을 처리하지 못했습니다.'); error.status = response.status; throw error; }
  return data;
}
const post = (action, body = {}) => api(action, { method: 'POST', headers: receipt ? authorization() : {}, body: JSON.stringify(body) });
const confirmFile = index => post('confirm-file', { index });
function uploadSummary() {
  const done = entries.filter(entry => entry.state === 'uploaded').length;
  const failed = entries.filter(entry => entry.state === 'failed').length;
  showStatus(allUploaded() ? '업로드 완료, 마지막 확인만 남았어요.' : '남은 파일을 이어서 올려주세요.', allUploaded() ? '팀과 전체 파일을 확인한 뒤 ‘제출 완료’를 눌러주세요. 아직 최종 제출 전입니다. 30분 이상 진행이 없으면 임시 파일이 정리됩니다.' : `${done} / ${entries.length}개 완료${failed ? ` · ${failed}개 실패` : ''}\n완료된 파일은 다시 올리지 않습니다. 중단 후 30분 안에 같은 브라우저에서 같은 폴더를 다시 선택해주세요.`, done / entries.length * 100);
}
async function uploadFiles() {
  if (byId('upload-button').disabled) return;
  clearError(); setBusy(true); paused = false;
  byId('pause-upload').hidden = false; byId('pause-upload').disabled = false; byId('retry-status').hidden = true;
  showStatus('업로드를 준비하고 있어요.', '파일 목록을 확인합니다.', 0); status.focus();
  try {
    if (!receipt) {
      const prepared = await api('prepare', { method: 'POST', body: JSON.stringify({ teamId: selectedTeam().id, files: manifest() }) });
      saveReceipt({ ...prepared, teamId: selectedTeam().id, folderName });
      admissionState = { busy: true, teamId: selectedTeam().id }; renderAdmission();
    }
    for (let index = 0; index < entries.length; index++) {
      if (paused) break;
      const entry = entries[index]; if (entry.state === 'uploaded') continue;
      entry.error = ''; entry.state = 'verifying'; updateRow(index);
      try {
        // Reconcile a lost success response before uploading the same file again.
        let confirmed = await confirmFile(index);
        if (!confirmed.uploaded && !paused) {
          controller = new AbortController(); entry.state = 'uploading'; updateRow(index);
          await upload(`${receipt.pathname}${index}`, entry.file, {
            access: 'private', contentType: 'application/octet-stream', handleUploadUrl: '/api/submission?action=upload',
            clientPayload: JSON.stringify({ ticket: receipt.ticket, index }), multipart: entry.size > 8 * 1024 ** 2,
            abortSignal: controller.signal,
            onUploadProgress: ({ percentage, loaded }) => {
              entry.progress = percentage; updateRow(index);
              const doneBytes = entries.filter(item => item.state === 'uploaded').reduce((sum, item) => sum + item.size, 0);
              const totalBytes = entries.reduce((sum, item) => sum + item.size, 0);
              showStatus('파일을 하나씩 올리고 있어요.', `${entry.path}\n${entries.filter(item => item.state === 'uploaded').length} / ${entries.length}개 완료 · 이 창을 열어두세요.`, Math.min(100, (doneBytes + loaded) / totalBytes * 100));
            },
          });
          entry.state = 'verifying'; updateRow(index); confirmed = await confirmFile(index);
        }
        if (confirmed.uploaded) entry.state = 'uploaded';
        else if (paused) entry.state = 'pending';
        else throw new Error(confirmed.message || '전송을 확인하지 못했습니다. 다시 업로드해주세요.');
      } catch (error) {
        // Storage may have received the file even if the browser lost the response.
        let recovered = false;
        if (!paused) { try { recovered = (await confirmFile(index)).uploaded; } catch { /* Retry this file later. */ } }
        entry.state = recovered ? 'uploaded' : paused ? 'pending' : 'failed';
        entry.error = recovered || paused ? '' : error.message?.startsWith('Vercel Blob') ? '전송에 실패했습니다. 네트워크 상태를 확인한 뒤 다시 업로드해주세요.' : error.message;
        if ([401, 410, 423, 503].includes(error.status)) { paused = true; showError(error.message); }
      } finally { controller = null; updateRow(index); }
    }
    uploadSummary();
  } catch (error) { showError(error.message || '업로드를 시작하지 못했습니다.'); if (error.status === 423) await refreshAdmission(); }
  finally { byId('pause-upload').hidden = true; setBusy(false); }
}
async function pollStatus() {
  if (polling || !receipt) return;
  polling = true; byId('retry-status').hidden = true;
  let failures = 0;
  try {
    for (let round = 0; receipt && round < 180; round++) {
      let result;
      try { result = await api('status', { headers: authorization() }); failures = 0; }
      catch (error) { if (++failures >= 3 || error.status === 401) throw error; await new Promise(resolve => setTimeout(resolve, 5000)); continue; }
      if (result.phase === 'awaiting_upload' && result.mode === 'folder') {
        const uploaded = new Set(result.uploaded);
        entries = result.files.map((file, i) => ({ ...file, file: entries[i]?.sha256 === file.sha256 && entries[i]?.path === file.path ? entries[i].file : undefined, state: uploaded.has(i) ? 'uploaded' : 'pending' }));
        stage = 'draft'; setBusy(false); renderFiles(); renderAdmission(); uploadSummary(); return;
      }
      if (['submitted', 'merge_failed', 'failed', 'cancelled'].includes(result.phase)) {
        stage = 'done'; setBusy(false); const success = result.phase === 'submitted';
        status.classList.toggle('is-complete', success);
        byId('status-kicker').textContent = success ? 'SUCCESSFULLY SUBMITTED' : 'SUBMISSION NEEDS ATTENTION';
        const delivery = result.merged ? '웹사이트 파일 저장이 완료되었습니다. 배포가 끝나면 아래 주소에서 확인할 수 있어요. 반영까지 몇 분 걸릴 수 있습니다.' : '웹사이트가 접수되었습니다. 이 접수는 자동 반영 전 방식으로 처리되어 담당자의 확인이 필요합니다.';
        showStatus(success ? '제출이 완료되었습니다.' : result.phase === 'merge_failed' ? '접수 완료 · 자동 반영 확인 필요' : '파일을 확인해주세요.', success ? `${teams.find(team => team.id === result.teamId)?.name || ''} 팀의 ${delivery}\n\n접수 번호  ${result.id.slice(0, 8)}\n연결될 주소  dmd2026.com/${result.slug}/` : `${result.message || '제출 처리에 실패했습니다.'}\n접수 번호  ${result.id.slice(0, 8)}`, 100);
        byId('upload-progress').hidden = !success; byId('progress-label').textContent = success ? result.merged ? '저장 완료 · 배포 대기' : '접수 완료' : result.phase === 'merge_failed' ? '자동 반영 확인 필요' : '제출 미완료'; await refreshAdmission(); return;
      }
      stage = 'processing'; setBusy(true);
      showStatus(result.phase === 'merging' ? '웹사이트에 자동 반영하고 있어요.' : '웹사이트를 전달하고 있어요.', `파일 ${result.completedFiles || 0} / ${result.totalFiles || '…'}개 처리 중\n접수 번호  ${result.id.slice(0, 8)}`);
      if (result.phase === 'queued' || (result.phase === 'paused' && (!result.resumeAfter || result.resumeAfter <= Date.now()))) await post('process');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    throw new Error('처리가 계속되고 있습니다. 잠시 후 상태를 다시 확인해주세요.');
  } catch (error) {
    setBusy(false); showStatus('접수 상태를 다시 확인해주세요.', `${error.message}\n접수 번호  ${receipt?.id?.slice(0, 8) || ''}`); byId('retry-status').hidden = false;
  } finally { polling = false; controls(); }
}
teamSelect.addEventListener('change', renderTeam);
byId('confirm').addEventListener('change', controls);
byId('choose-file').addEventListener('click', () => input.click());
input.addEventListener('change', () => chooseFolder(input.files));
byId('remove-file').addEventListener('click', () => { entries = []; folderName = ''; input.value = ''; clearError(); renderFiles(); });
byId('upload-button').addEventListener('click', uploadFiles);
byId('pause-upload').addEventListener('click', () => { paused = true; controller?.abort(); byId('pause-upload').disabled = true; });
byId('retry-status').addEventListener('click', pollStatus);
byId('refresh-admission').addEventListener('click', refreshAdmission);
byId('submission-form').addEventListener('submit', async event => {
  event.preventDefault(); if (byId('submit-button').disabled) return;
  clearError(); stage = 'processing'; setBusy(true);
  showStatus('최종 제출을 확인하고 있어요.', '모든 파일의 업로드를 확인합니다.'); status.focus();
  try { await post('finalize'); } catch (error) { showError(error.message); }
  // Reconcile a lost finalize response from durable state, never assume success.
  await pollStatus();
});
byId('new-submission').addEventListener('click', async () => {
  if (busy || polling) return;
  setBusy(true);
  if (receipt) {
    try { await post('cancel'); }
    catch (error) { if (error.status !== 401) { showError(error.message); setBusy(false); return; } }
  }
  saveReceipt(null); entries = []; folderName = ''; input.value = ''; stage = 'draft';
  status.hidden = true; status.classList.remove('is-complete');
  byId('status-kicker').textContent = 'SUBMITTING YOUR WORK'; byId('retry-status').hidden = true;
  byId('confirm').checked = false; clearError(); setBusy(false); renderFiles(); await refreshAdmission(); teamSelect.focus();
});
window.addEventListener('beforeunload', event => { if (busy && stage === 'draft') { event.preventDefault(); event.returnValue = ''; } });
async function initialize() {
  await refreshAdmission();
  if (!('webkitdirectory' in input)) { enabled = false; byId('service-notice').textContent = '폴더 선택을 지원하는 PC의 최신 브라우저에서 제출해주세요.'; byId('service-notice').hidden = false; }
  try {
    const saved = JSON.parse(localStorage.getItem(receiptKey));
    if (saved?.ticket && saved?.id && saved.expires > Date.now()) {
      if (enabled) { receipt = saved; folderName = saved.folderName; teamSelect.value = saved.teamId; renderTeam(); stage = 'processing'; setBusy(true); await pollStatus(); }
    } else if (saved) { saveReceipt(null); showError('이전 업로드의 24시간 유효기간이 지났습니다. 폴더를 선택해 새로 제출해주세요.'); }
  } catch { /* Browser storage is optional. */ }
  controls();
}
setInterval(async () => {
  if (document.hidden) return;
  if (receipt && busy && !heartbeatPending) {
    heartbeatPending = true;
    try { await post('heartbeat'); }
    catch (error) { if (error.status === 410) { paused = true; controller?.abort(); showError(error.message); } }
    finally { heartbeatPending = false; }
  } else if (!receipt || stage === 'done') await refreshAdmission();
}, 60_000);
initialize();
