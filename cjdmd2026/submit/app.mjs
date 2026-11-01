import { upload } from './upload.mjs';
import { initBotId } from 'botid/client/core';
import { folderSelection, validateFiles, applyFileChanges, ignoredFile } from './files.mjs';
import './header.mjs';

const teams = __TEAMS__;
const byId = id => document.getElementById(id);
const teamSelect = byId('team');
const input = byId('folder-files');
const status = byId('submission-status');
const receiptKey = 'dmd2026-folder-receipt-r2';
let entries = [], folderName = '', receipt = null, enabled = false, busy = false;
let stage = 'draft', polling = false, paused = false;
const uploadConcurrency = 4;
const uploadControllers = new Set();
function pauseUploads() {
  paused = true;
  for (const controller of uploadControllers) controller.abort();
  byId('pause-upload').disabled = true;
}
let admissionState = { busy: false }, refreshing = false, heartbeatPending = false;
let siteFiles = [], siteTreeSha = null, treeLoaded = false, directory = '', deletions = new Set(), draftFolders = new Set(), pendingRemoval = null;
let managerButtons = [];
const rows = new Map();
const selectedTeam = () => teams.find(team => team.id === teamSelect.value);
const allUploaded = () => entries.every(entry => entry.state === 'uploaded');
const hasChanges = () => entries.length > 0 || deletions.size > 0;
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
  let invalid = '';
  if (treeLoaded && hasChanges()) { try { applyFileChanges(siteFiles, entries, [...deletions]); } catch (error) { invalid = error.message; } }
  if (entries.length + deletions.size > 2000) invalid = '한 번에 변경할 파일은 최대 2,000개입니다. 변경을 나눠서 반영해주세요.';
  byId('change-warning').textContent = invalid; byId('change-warning').hidden = !invalid;
  byId('upload-button').disabled = !enabled || !treeLoaded || Boolean(invalid) || waiting || busy || stage !== 'draft' || !selectedTeam() || !pending.some(entry => entry.file);
  byId('upload-button').textContent = waiting ? '다른 팀 제출 완료 후 업로드 가능' : !entries.length && deletions.size ? '삭제만 변경할 때는 바로 반영할 수 있어요' : entries.length && allUploaded() ? '모든 파일 업로드 완료' : entries.some(entry => entry.state === 'failed') ? '실패한 파일 다시 업로드 ↑' : receipt ? '남은 파일 이어서 업로드 ↑' : '업로드 시작 ↑';
  byId('submit-button').disabled = !enabled || !treeLoaded || Boolean(invalid) || waiting || busy || stage !== 'draft' || !hasChanges() || !allUploaded() || !byId('confirm').checked;
  byId('new-submission').hidden = !receipt || busy;
  byId('new-submission').textContent = stage === 'draft' && receipt ? '업로드 취소 · 다시 편집 ↗' : '이 팀 파일 계속 편집 ↗';
  for (const id of ['choose-file', 'choose-files', 'choose-folder']) byId(id).disabled = !treeLoaded || busy || stage !== 'draft';
  for (const id of ['new-folder', 'create-folder', 'confirm-delete']) byId(id).disabled = !treeLoaded || busy || stage !== 'draft' || Boolean(receipt);
  byId('refresh-tree').disabled = busy || stage !== 'draft' || Boolean(receipt) || hasChanges();
  byId('discard-changes').disabled = busy || stage !== 'draft' || Boolean(receipt) || (!hasChanges() && !draftFolders.size);
  for (const { button, editing } of managerButtons) button.disabled = !treeLoaded || busy || stage !== 'draft' || (editing && Boolean(receipt));
}

function managerButton(text, action, editing = false) {
  const button = document.createElement('button'); button.type = 'button'; button.textContent = text;
  button.addEventListener('click', action); managerButtons.push({ button, editing }); return button;
}
function plannedFiles() {
  const map = new Map(siteFiles.filter(file => !deletions.has(file.path)).map(file => [file.path, { ...file, change: '' }]));
  for (const file of entries) map.set(file.path, { ...file, change: siteFiles.some(old => old.path === file.path) ? '교체 예정' : '추가 예정' });
  return [...map.values()];
}
function renderManager() {
  managerButtons = [];
  const breadcrumb = byId('folder-breadcrumbs'); breadcrumb.replaceChildren();
  breadcrumb.append(managerButton(selectedTeam()?.name || '팀 폴더', () => { directory = ''; renderManager(); }));
  let prefix = '';
  for (const part of directory.split('/').filter(Boolean)) {
    prefix += `${part}/`; const destination = prefix;
    const separator = document.createElement('span'); separator.textContent = ' / '; breadcrumb.append(separator, managerButton(part, () => { directory = destination; renderManager(); }));
  }
  const files = plannedFiles(), visible = new Map();
  for (const file of files) {
    if (!file.path.startsWith(directory)) continue;
    const relative = file.path.slice(directory.length), slash = relative.indexOf('/');
    if (slash >= 0) { const name = relative.slice(0, slash); visible.set(`${name}/`, { path: `${directory}${name}/`, name, folder: true }); }
    else visible.set(relative, { ...file, name: relative, folder: false });
  }
  for (const folder of draftFolders) {
    if (folder.startsWith(directory) && folder !== directory) {
      const name = folder.slice(directory.length).split('/')[0]; visible.set(`${name}/`, { path: `${directory}${name}/`, name, folder: true });
    }
  }
  const list = byId('directory-list'); list.replaceChildren();
  for (const item of [...visible.values()].sort((a, b) => Number(b.folder) - Number(a.folder) || a.name.localeCompare(b.name, 'ko'))) {
    const row = document.createElement('li'); row.className = 'directory-row';
    const name = item.folder ? managerButton(`▱ ${item.name}`, () => { directory = item.path; renderManager(); }) : document.createElement('span');
    if (!item.folder) name.textContent = item.name;
    name.className = 'directory-name';
    const detail = document.createElement('span'); detail.className = 'directory-detail'; detail.textContent = item.folder ? '폴더' : item.change || sizeLabel(item.size);
    const remove = managerButton('삭제', () => {
      pendingRemoval = item;
      const count = files.filter(file => item.folder ? file.path.startsWith(item.path) : file.path === item.path).length;
      byId('delete-description').textContent = `${item.path} · ${count}개 파일을 삭제 예정에 추가합니다. ‘변경사항 반영’ 전에는 실제 파일이 삭제되지 않습니다.`;
      byId('delete-confirmation').hidden = false;
    }, true);
    remove.className = 'directory-delete'; remove.setAttribute('aria-label', `${item.path} 삭제`);
    row.append(name, detail, remove); list.append(row);
  }
  byId('tree-message').hidden = treeLoaded && visible.size > 0;
  if (treeLoaded) byId('tree-message').textContent = '이 폴더에 파일이 없습니다. 파일을 추가해주세요.';
  byId('site-usage').textContent = `반영 후 ${files.length.toLocaleString()}개 · ${sizeLabel(files.reduce((sum, file) => sum + file.size, 0))} / 500 MiB`;
  const added = entries.filter(file => !siteFiles.some(old => old.path === file.path)).length;
  byId('change-summary').textContent = hasChanges() ? `추가 ${added}개 · 교체 ${entries.length - added}개 · 삭제 ${deletions.size}개` : '아직 변경한 파일이 없습니다.';
  byId('deletion-panel').hidden = !deletions.size; byId('deletion-list').replaceChildren();
  for (const path of deletions) {
    const row = document.createElement('li'), label = document.createElement('span'); label.textContent = path;
    row.append(label, managerButton('삭제 취소', () => { deletions.delete(path); byId('confirm').checked = false; renderManager(); }, true)); byId('deletion-list').append(row);
  }
  controls();
}
async function loadTree() {
  const team = selectedTeam();
  treeLoaded = false; siteFiles = []; siteTreeSha = null; entries = []; deletions = new Set(); draftFolders = new Set(); directory = ''; pendingRemoval = null;
  byId('delete-confirmation').hidden = true; byId('folder-create').hidden = true; byId('folder-name').value = ''; byId('confirm').checked = false;
  renderFiles();
  if (!team) { byId('tree-message').textContent = '팀을 선택하면 저장된 폴더와 파일이 표시됩니다.'; return; }
  treeLoaded = false; byId('tree-message').hidden = false; byId('tree-message').textContent = '저장된 파일을 불러오는 중입니다.';
  setBusy(true);
  try {
    const snapshot = await api(`tree&teamId=${encodeURIComponent(team.id)}`);
    siteFiles = snapshot.files; siteTreeSha = snapshot.treeSha; treeLoaded = true;
    renderFiles(); renderManager();
  } catch (error) { byId('tree-message').textContent = '파일 목록을 불러오지 못했습니다.'; showError(error.message); }
  finally { setBusy(false); byId('refresh-tree').disabled = Boolean(receipt) || stage !== 'draft'; }
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
  byId('file-name').textContent = '이번에 추가·교체할 파일';
  byId('file-size').textContent = `${entries.length}개 파일 · ${sizeLabel(entries.reduce((sum, entry) => sum + entry.size, 0))}`;
  byId('choose-file').firstChild.textContent = receipt ? '사이트 폴더 다시 선택 ' : '사이트 폴더 가져오기 ';
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
  renderManager();
}
async function chooseFolder(files, kind = 'site') {
  if (busy || !treeLoaded || !files.length || stage !== 'draft') return;
  clearError(); setBusy(true);
  try {
    let selected;
    if (kind === 'files') {
      const picks = Array.from(files).map(file => ({ path: directory + file.name, size: file.size, file })).filter(file => !ignoredFile(file.path));
      const checked = validateFiles(picks, { hashes: false, requireIndex: false });
      selected = { name: directory || '팀 폴더', files: checked.files.map((file, i) => ({ ...file, file: picks[i].file })) };
    } else selected = folderSelection(files, { prefix: kind === 'folder' ? directory : '', keepRoot: kind === 'folder', requireIndex: false });
    for (let i = 0; i < selected.files.length; i++) {
      const entry = selected.files[i];
      showStatus('폴더를 확인하고 있어요.', `${entry.path}\n파일 ${i + 1} / ${selected.files.length}개 확인 중`, i / selected.files.length * 100);
      const digest = await crypto.subtle.digest('SHA-256', await entry.file.arrayBuffer());
      entry.sha256 = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    }
    if (receipt) {
      const original = new Map(entries.map(file => [file.path, file]));
      if (selected.files.some(file => !original.has(file.path) || original.get(file.path).size !== file.size || original.get(file.path).sha256 !== file.sha256)) throw new Error('이전 업로드와 파일 내용이 다릅니다. 원래 파일을 선택하거나 업로드를 취소한 뒤 다시 편집해주세요.');
      const picked = new Map(selected.files.map(file => [file.path, file]));
      entries = entries.map(file => picked.has(file.path) ? { ...file, file: picked.get(file.path).file } : file);
    } else {
      const next = new Map(entries.map(file => [file.path, file]));
      for (const file of selected.files) next.set(file.path, { ...file, state: 'pending' });
      const nextDeletes = new Set(deletions); for (const file of selected.files) nextDeletes.delete(file.path);
      applyFileChanges(siteFiles, [...next.values()], [...nextDeletes], { requireIndex: false });
      if (next.size + nextDeletes.size > 2000) throw new Error('한 번에 변경할 파일은 최대 2,000개입니다. 변경을 나눠서 반영해주세요.');
      entries = [...next.values()].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0); deletions = nextDeletes;
    }
    folderName = selected.name; byId('confirm').checked = false; renderFiles();
    if (receipt) uploadSummary(); else status.hidden = true;
  } catch (error) {
    if (receipt) uploadSummary(); else status.hidden = true;
    showError(error.message || '폴더를 읽지 못했습니다. 다시 선택해주세요.');
  }
  finally { input.value = ''; byId('nested-folder-files').value = ''; byId('single-files').value = ''; setBusy(false); }
}
async function api(action, options = {}) {
  const headers = { ...options.headers };
  if (options.body) headers['Content-Type'] = 'application/json';
  let response;
  const timeout = AbortSignal.timeout(action === 'confirm-file' ? 120000 : 30000);
  try { response = await fetch(`/api/submission?action=${action}`, { ...options, headers, cache: 'no-store', signal: options.signal ? AbortSignal.any([options.signal, timeout]) : timeout }); }
  catch { const error = new Error('제출 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'); error.status = 0; throw error; }
  let data;
  try { data = await response.json(); } catch { const error = new Error('제출 서버 응답을 확인할 수 없습니다. 잠시 후 다시 시도해주세요.'); error.status = response.ok ? 502 : response.status; throw error; }
  if (!response.ok) { const error = new Error(data.error || '요청을 처리하지 못했습니다.'); error.status = response.status; throw error; }
  return data;
}
const post = (action, body = {}, signal) => api(action, { method: 'POST', headers: receipt ? authorization() : {}, body: JSON.stringify(body), signal });
const confirmFile = (index, signal) => post('confirm-file', { index }, signal);
const shouldPauseUpload = error => error.status === 0 || error.status >= 500 || [401, 403, 410, 423, 429].includes(error.status);
function uploadSummary() {
  const done = entries.filter(entry => entry.state === 'uploaded').length;
  const failed = entries.filter(entry => entry.state === 'failed').length;
  showStatus(allUploaded() ? '업로드 완료, 마지막 확인만 남았어요.' : '남은 파일을 이어서 올려주세요.', allUploaded() ? '추가·교체·삭제 목록을 확인한 뒤 ‘변경사항 반영’을 눌러주세요. 아직 사이트에 반영되지 않았습니다. 30분 이상 진행이 없으면 임시 파일이 정리됩니다.' : `${done} / ${entries.length}개 완료${failed ? ` · ${failed}개 실패` : ''}\n완료된 파일은 다시 올리지 않습니다. 중단 후 30분 안에 같은 브라우저에서 남은 파일을 같은 위치에 다시 선택해주세요.`, entries.length ? done / entries.length * 100 : 100);
}
async function prepareReceipt() {
  if (receipt) return;
  const prepared = await api('prepare', { method: 'POST', body: JSON.stringify({ teamId: selectedTeam().id, files: manifest(), deletions: [...deletions], baseTreeSha: siteTreeSha }) });
  saveReceipt({ ...prepared, teamId: selectedTeam().id, folderName });
  // Only a newly created receipt is known to have no previously uploaded files.
  // Restored receipts and every attempted file always reconcile before retrying.
  for (const entry of entries) entry.needsCheck = false;
  admissionState = { busy: true, teamId: selectedTeam().id }; renderAdmission();
}
async function uploadFiles() {
  if (byId('upload-button').disabled) return;
  clearError(); setBusy(true); paused = false;
  byId('pause-upload').hidden = false; byId('pause-upload').disabled = false; byId('retry-status').hidden = true;
  showStatus('업로드를 준비하고 있어요.', '파일 목록을 확인합니다.', 0); status.focus();
  try {
    await prepareReceipt();
    const activeBytes = new Map();
    const totalBytes = entries.reduce((sum, entry) => sum + entry.size, 0);
    function renderUploadProgress() {
      if (paused) return;
      const done = entries.filter(entry => entry.state === 'uploaded');
      const bytes = done.reduce((sum, entry) => sum + entry.size, 0) + [...activeBytes.values()].reduce((sum, loaded) => sum + loaded, 0);
      const progress = totalBytes ? bytes / totalBytes * 100 : 0;
      showStatus('파일을 올리고 있어요.', `${done.length} / ${entries.length}개 완료 · ${activeBytes.size}개 처리 중\n이 창을 열어두세요.`, Math.min(allUploaded() ? 100 : 99, progress));
    }
    async function transferFile(index) {
      const entry = entries[index];
      const controller = new AbortController();
      uploadControllers.add(controller); activeBytes.set(index, 0);
      entry.error = ''; entry.state = 'verifying'; updateRow(index);
      try {
        // Fresh files avoid an empty lookup; retries recover lost success responses.
        let confirmed = entry.needsCheck === false ? { uploaded: false } : await confirmFile(index, controller.signal);
        if (!confirmed.uploaded && !paused) {
          entry.needsCheck = true; entry.state = 'uploading'; updateRow(index);
          const destination = await post('upload-url', { index }, controller.signal);
          if (paused) { entry.state = 'pending'; return; }
          await upload(destination.url, entry.file, {
            headers: destination.headers,
            abortSignal: controller.signal,
            onUploadProgress: ({ percentage, loaded }) => {
              if (paused || controller.signal.aborted) return;
              entry.progress = percentage; updateRow(index);
              activeBytes.set(index, Math.max(0, Math.min(entry.size, loaded)));
              renderUploadProgress();
            },
          });
          if (!paused) { entry.state = 'verifying'; updateRow(index); confirmed = await confirmFile(index, controller.signal); }
        }
        if (confirmed.uploaded) entry.state = 'uploaded';
        else if (paused) entry.state = 'pending';
        else throw new Error(confirmed.message || '전송을 확인하지 못했습니다. 다시 업로드해주세요.');
      } catch (error) {
        // Storage may have received the file even if the browser lost the response.
        let recovered = false;
        if (!paused && !shouldPauseUpload(error)) {
          try { recovered = (await confirmFile(index, controller.signal)).uploaded; }
          catch (confirmationError) { if (shouldPauseUpload(confirmationError)) error = confirmationError; }
        }
        entry.state = recovered ? 'uploaded' : paused ? 'pending' : 'failed';
        entry.error = recovered || paused ? '' : error.message;
        if (!recovered && !paused && shouldPauseUpload(error)) { pauseUploads(); showError(`${error.message}\n남은 파일의 업로드를 멈췄습니다. 접수 상태를 확인한 뒤 다시 시도해주세요.`); }
      } finally { uploadControllers.delete(controller); activeBytes.delete(index); updateRow(index); renderUploadProgress(); }
    }
    let nextIndex = 0;
    async function worker() {
      while (!paused && nextIndex < entries.length) {
        const index = nextIndex++;
        if (entries[index].state === 'uploaded' || !entries[index].file) continue;
        await transferFile(index);
      }
    }
    // Keep controls locked until all in-flight requests have settled after a pause.
    const workers = await Promise.allSettled(Array.from({ length: Math.min(uploadConcurrency, entries.length) }, worker));
    const failure = workers.find(result => result.status === 'rejected');
    if (failure) throw failure.reason;
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
        deletions = new Set(result.deletions || []); siteTreeSha = result.baseTreeSha ?? siteTreeSha;
        stage = 'draft'; setBusy(false); renderFiles(); renderAdmission(); uploadSummary(); return;
      }
      if (['submitted', 'merge_failed', 'failed', 'cancelled'].includes(result.phase)) {
        stage = 'done'; setBusy(false); const success = result.phase === 'submitted';
        status.classList.toggle('is-complete', success);
        byId('status-kicker').textContent = success ? 'SUCCESSFULLY SUBMITTED' : 'SUBMISSION NEEDS ATTENTION';
        const delivery = result.unchanged ? '파일이 현재 저장된 내용과 같아 기존 웹사이트를 유지합니다.' : result.merged ? '웹사이트 파일 저장이 완료되었습니다. 배포가 끝나면 아래 주소에서 확인할 수 있어요. 반영까지 몇 분 걸릴 수 있습니다.' : '웹사이트가 접수되었습니다. 이 접수는 자동 반영 전 방식으로 처리되어 담당자의 확인이 필요합니다.';
        showStatus(success ? '제출이 완료되었습니다.' : result.phase === 'merge_failed' ? '접수 완료 · 자동 반영 확인 필요' : '파일을 확인해주세요.', success ? `${teams.find(team => team.id === result.teamId)?.name || ''} 팀의 ${delivery}\n\n접수 번호  ${result.id.slice(0, 8)}\n연결될 주소  dmd2026.com/${result.slug}/` : `${result.message || '제출 처리에 실패했습니다.'}\n접수 번호  ${result.id.slice(0, 8)}`, 100);
        byId('upload-progress').hidden = !success; byId('progress-label').textContent = success ? result.unchanged ? '변경 없음' : result.merged ? '저장 완료 · 배포 대기' : '접수 완료' : result.phase === 'merge_failed' ? '자동 반영 확인 필요' : '제출 미완료'; await refreshAdmission(); return;
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
teamSelect.addEventListener('change', async () => { renderTeam(); if (!receipt) { clearError(); await loadTree(); } });
byId('confirm').addEventListener('change', controls);
byId('choose-file').addEventListener('click', () => input.click());
input.addEventListener('change', () => chooseFolder(input.files));
byId('choose-files').addEventListener('click', () => byId('single-files').click());
byId('choose-folder').addEventListener('click', () => byId('nested-folder-files').click());
byId('single-files').addEventListener('change', () => chooseFolder(byId('single-files').files, 'files'));
byId('nested-folder-files').addEventListener('change', () => chooseFolder(byId('nested-folder-files').files, 'folder'));
byId('refresh-tree').addEventListener('click', async () => { if (!receipt && !hasChanges()) { clearError(); await loadTree(); } });
byId('discard-changes').addEventListener('click', async () => { if (!busy && !receipt && stage === 'draft') { clearError(); await loadTree(); } });
byId('new-folder').addEventListener('click', () => { byId('folder-create').hidden = false; byId('folder-name').focus(); });
byId('folder-name').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); byId('create-folder').click(); } });
byId('cancel-folder').addEventListener('click', () => { byId('folder-create').hidden = true; byId('folder-name').value = ''; });
byId('create-folder').addEventListener('click', () => {
  if (busy || receipt || stage !== 'draft') return;
  try {
    const name = byId('folder-name').value.trim().normalize('NFC');
    if (!name || name.includes('/')) throw new Error('폴더 이름 하나를 입력해주세요.');
    const path = `${directory}${name}/`;
    validateFiles([{ path: `${path}placeholder.txt`, size: 0 }], { hashes: false, requireIndex: false });
    const lower = path.toLowerCase();
    if (plannedFiles().some(file => file.path.toLowerCase() === lower.slice(0, -1) || file.path.toLowerCase().startsWith(lower)) || [...draftFolders].some(folder => folder.toLowerCase() === lower)) throw new Error('같은 이름의 파일 또는 폴더가 있습니다.');
    draftFolders.add(path); directory = path; byId('folder-create').hidden = true; byId('folder-name').value = ''; clearError(); renderManager();
  } catch (error) { showError(error.message); }
});
byId('cancel-delete').addEventListener('click', () => { pendingRemoval = null; byId('delete-confirmation').hidden = true; });
byId('confirm-delete').addEventListener('click', () => {
  if (!pendingRemoval || busy || receipt || stage !== 'draft') return;
  const selected = pendingRemoval, matches = path => selected.folder ? path.startsWith(selected.path) : path === selected.path;
  for (const file of siteFiles) if (matches(file.path)) deletions.add(file.path);
  entries = entries.filter(file => !matches(file.path));
  draftFolders = new Set([...draftFolders].filter(path => !matches(path)));
  pendingRemoval = null; byId('delete-confirmation').hidden = true; byId('confirm').checked = false; renderFiles();
});
byId('remove-file').addEventListener('click', () => { entries = []; folderName = ''; input.value = ''; clearError(); renderFiles(); });
byId('upload-button').addEventListener('click', uploadFiles);
byId('pause-upload').addEventListener('click', pauseUploads);
byId('retry-status').addEventListener('click', pollStatus);
byId('refresh-admission').addEventListener('click', refreshAdmission);
byId('submission-form').addEventListener('submit', async event => {
  event.preventDefault(); if (byId('submit-button').disabled) return;
  clearError(); stage = 'processing'; setBusy(true);
  showStatus('최종 제출을 확인하고 있어요.', '모든 파일의 업로드를 확인합니다.'); status.focus();
  try { await prepareReceipt(); await post('finalize'); }
  catch (error) {
    showError(error.message);
    if (!receipt) { stage = 'draft'; setBusy(false); status.hidden = true; if (error.status === 423) await refreshAdmission(); return; }
  }
  // Reconcile a lost finalize response from durable state, never assume success.
  await pollStatus();
});
byId('new-submission').addEventListener('click', async () => {
  if (busy || polling) return;
  setBusy(true);
  if (receipt) {
    try { await post('cancel'); }
    catch (error) { if (![401, 410].includes(error.status)) { showError(error.message); setBusy(false); return; } }
  }
  saveReceipt(null); entries = []; folderName = ''; input.value = ''; stage = 'draft';
  deletions = new Set(); draftFolders = new Set(); pendingRemoval = null; byId('delete-confirmation').hidden = true;
  status.hidden = true; status.classList.remove('is-complete');
  byId('status-kicker').textContent = 'SUBMITTING YOUR WORK'; byId('retry-status').hidden = true;
  byId('confirm').checked = false; clearError(); setBusy(false); renderFiles(); await refreshAdmission(); await loadTree(); teamSelect.focus();
});
window.addEventListener('beforeunload', event => { if (busy && stage === 'draft') { event.preventDefault(); event.returnValue = ''; } });
async function initialize() {
  await refreshAdmission();
  if (!('webkitdirectory' in input)) { enabled = false; byId('service-notice').textContent = '폴더 선택을 지원하는 PC의 최신 브라우저에서 제출해주세요.'; byId('service-notice').hidden = false; }
  try {
    const saved = JSON.parse(localStorage.getItem(receiptKey));
    if (!saved && localStorage.getItem('dmd2026-folder-receipt')) showError('저장소가 변경되었습니다. 이전에 완료하지 못한 업로드는 폴더를 다시 선택해 제출해주세요. 이미 반영된 사이트 파일은 그대로 유지됩니다.');
    if (saved?.ticket && saved?.id && saved.expires > Date.now()) {
      if (enabled) { receipt = saved; folderName = saved.folderName; teamSelect.value = saved.teamId; renderTeam(); await loadTree(); stage = 'processing'; setBusy(true); await pollStatus(); }
    } else if (saved) { saveReceipt(null); showError('이전 업로드의 24시간 유효기간이 지났습니다. 폴더를 선택해 새로 제출해주세요.'); }
  } catch { /* Browser storage is optional. */ }
  renderManager();
}
setInterval(async () => {
  if (document.hidden) return;
  if (receipt && busy && !heartbeatPending) {
    heartbeatPending = true;
    try { await post('heartbeat'); }
    catch (error) { if (error.status === 410) { pauseUploads(); showError(error.message); } }
    finally { heartbeatPending = false; }
  } else if (!receipt || stage === 'done') await refreshAdmission();
}, 60_000);
initialize();
