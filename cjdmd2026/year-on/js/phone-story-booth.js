(() => {
  const app = document.querySelector('.phone-media .culture-sns');
  if (!app) return;
  const panel = app.closest('.time-panel');
  const t = (ko, en) => window.YEARON_LANG === 'en' ? en : ko;
  const booth = document.createElement('section');
  booth.className = 'story-booth';
  booth.setAttribute('role', 'dialog');
  booth.setAttribute('aria-modal', 'true');
  booth.hidden = true;
  app.append(booth);

  let stream, opener, mode, generation = 0, facing = 'user', urls = [];
  let caption = '', frame = 0, drawing = false, stroke, strokes = [], redo = [];
  let filterIndex=0,ink='#ffffff',penWidth=7;
  const filters=[['원본','Original','none'],['쿨','Cool','saturate(.85) contrast(1.06) sepia(.1) hue-rotate(170deg)'],['웜','Warm','sepia(.28) saturate(1.12)'],['필름','Film','contrast(.9) brightness(1.05) saturate(.65) sepia(.18)'],['흑백','Mono','grayscale(1) contrast(1.12)'],['선명','Vivid','saturate(1.4) contrast(1.08)']];
  const icons={archive:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 8v12h16V8"/><path d="M3 4h18v4H3zM9 12h6M10 15h4"/></svg>',gallery:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="m4 16 5-5 4 4 3-3 5 5"/></svg>',flip:'<svg viewBox="0 0 24 24"><path d="M20 8a8 8 0 0 0-14-2L3 9m0-5v5h5M4 16a8 8 0 0 0 14 2l3-3m0 5v-5h-5"/></svg>',pen:'<svg viewBox="0 0 24 24"><path d="m4 16-1 5 5-1L21 7l-4-4Z M14 6l4 4"/></svg>',filter:'<svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="6"/><circle cx="15" cy="9" r="6"/><circle cx="12" cy="15" r="6"/></svg>'};
  const photo = document.createElement('canvas');
  const preview = document.createElement('canvas');
  for (const canvas of [photo, preview]) {
    canvas.width = 540;
    canvas.height = 960;
  }
  preview.setAttribute('aria-label', 'Story preview');
  const ctx = preview.getContext('2d');
  function fitPreview(){const box=booth.querySelector('.story-booth-preview');if(!box)return;const scale=Math.min(box.clientWidth/540,box.clientHeight/960);preview.style.width=(540*scale)+'px';preview.style.height=(960*scale)+'px';}
  const previewResize=new ResizeObserver(fitPreview);
  const select = selector => booth.querySelector(selector);
  const underlying = () => app.querySelectorAll('.culture-brand,.culture-feed,.culture-modes,.phone-home-button,.phone-relock');
  const button = (action, label, content = label) =>
    `<button type="button" data-booth="${action}" aria-label="${label}" title="${label}">${content}</button>`;
  const status = value => { const el = select('[role=status]'); if (el) el.textContent = value; };

  function stopCamera() {
    generation++;
    stream?.getTracks().forEach(track => track.stop());
    stream = null;
    const video = select('video');
    if (video) video.srcObject = null;
  }

  function show(next, title, header, body, footer = '') {
    stopCamera();
    urls.forEach(url => URL.revokeObjectURL(url));
    urls = [];
    mode = next;app.classList.toggle('phone-camera-open',!!next);
    booth.dataset.mode = mode;
    booth.setAttribute('aria-label', title);
    booth.innerHTML = `<header>${button('close', t('닫기', 'Close'), '×')}<strong>${title}</strong>${header}</header>
      <div class="story-booth-body">${body}<p role="status"></p></div><footer>${footer}</footer>`;
    select('[data-booth=close]').focus({preventScroll: true});
  }

  function camera() {
    show('camera', 'STORY', '<span class="story-camera-spacer" aria-hidden="true"></span>',
      '<video autoplay muted playsinline></video><div class="story-booth-guide" aria-hidden="true"></div>',
      button('gallery', t('촬영 사진 보관함', 'Saved photos'), icons.gallery) +
      button('capture', t('촬영', 'Take photo'), '<span></span>') +
      button('flip', t('카메라 전환', 'Switch camera'), icons.flip));
    startCamera();
  }

  async function startCamera() {
    const video = select('video');
    const capture = select('[data-booth=capture]');
    capture.disabled = true;
    status(t('카메라를 여는 중…', 'Opening camera…'));
    const request = generation;
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({video: {facingMode: {ideal: facing}}, audio: false});
      if (request !== generation) {
        cameraStream.getTracks().forEach(track => track.stop());
        return;
      }
      stream = cameraStream;
      const actualFacing = stream.getVideoTracks()[0].getSettings().facingMode || facing;
      video.classList.toggle('is-mirrored', actualFacing === 'user');
      video.srcObject = stream;
      await video.play();
      if (request !== generation) return;
      capture.disabled = false;
      status('');
    } catch {
      if (request !== generation) return;
      stopCamera();
      status(t('카메라를 사용할 수 없어요. 촬영 사진 보관함을 확인하거나 카메라 권한을 확인해 주세요.', 'Camera unavailable. Open saved photos or check camera permissions.'));
    }
  }

  function usePhoto(source, width, height, mirror = false) {
    const cropWidth = Math.min(width, height * 9 / 16);
    const cropHeight = Math.min(height, width * 16 / 9);
    const base = photo.getContext('2d');
    base.save();
    if (mirror) { base.translate(540, 0); base.scale(-1, 1); }
    base.drawImage(source, (width - cropWidth) / 2, (height - cropHeight) / 2, cropWidth, cropHeight, 0, 0, 540, 960);
    base.restore();
    caption = '';
    frame = 0;
    drawing = false;
    preview.classList.remove('is-drawing');
    stroke = null;
    strokes = [];redo=[];filterIndex=0;
    editor();
  }

  function paint() {
    ctx.clearRect(0,0,540,960);ctx.save();ctx.filter=filters[filterIndex][2];ctx.drawImage(photo, 0, 0);ctx.restore();
    ctx.lineCap = ctx.lineJoin = 'round';
    for (const line of strokes) {
      const points=line.points;ctx.strokeStyle=line.color;ctx.lineWidth=line.width;
      ctx.beginPath();
      ctx.moveTo(...points[0]);
      ctx.lineTo(points[0][0] + .01, points[0][1]);
      points.slice(1).forEach(point => ctx.lineTo(...point));
      ctx.stroke();
    }
    select('[data-booth=undo]')?.toggleAttribute('disabled',!strokes.length);
    select('[data-booth=redo]')?.toggleAttribute('disabled',!redo.length);
    if (frame) {
      ctx.strokeStyle = frame === 1 ? '#f7f5ee' : '#b8d8f0';
      ctx.lineWidth = frame === 1 ? 22 : 4;
      ctx.strokeRect(17, 17, 506, 926);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = '600 21px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('YEAR:ON  /  STORY', 270, 906);
    }
    if (caption.trim()) {
      ctx.font = '600 30px sans-serif';
      ctx.textAlign = 'center';
      const width = Math.min(ctx.measureText(caption).width + 28, 482);
      ctx.fillStyle = '#101218bd';
      ctx.fillRect((540 - width) / 2, 747, width, 49);
      ctx.fillStyle = '#fff';
      ctx.fillText(caption, 270, 780, width - 24);
    }
  }

  function editor() {
    show('edit', t('스토리 편집','Edit story'), button('retake', t('다시 찍기','Retake'), '↻'),
      '<div class="story-booth-preview"></div><div class="story-edit-tools" hidden></div><input class="story-booth-caption" maxlength="52" hidden>',
      button('filter',t('필터','Filters'),icons.filter) + button('pen', t('그리기','Draw'), icons.pen) + button('text', t('글쓰기','Text'), 'Aa') +
      button('frame', t('프레임','Frame'), '▣') +
      button('save', t('저장','Save')));
    select('.story-booth-preview').append(preview);previewResize.disconnect();previewResize.observe(select('.story-booth-preview'));requestAnimationFrame(fitPreview);
    const input = select('.story-booth-caption');
    input.placeholder = t('한 줄을 남겨보세요', 'Leave a line');
    input.setAttribute('aria-label', input.placeholder);
    input.addEventListener('input', () => { caption = input.value; paint(); });
    select('[data-booth=pen]').setAttribute('aria-pressed', 'false');
    paint();
  }

  function point(e) {
    const rect = preview.getBoundingClientRect();
    return [(e.clientX - rect.left) * 540 / rect.width, (e.clientY - rect.top) * 960 / rect.height];
  }
  preview.addEventListener('pointerdown', e => {
    if (!drawing || !e.isPrimary || e.button !== 0) return;
    preview.setPointerCapture(e.pointerId);
    e.preventDefault();redo=[];stroke={points:[point(e)],color:ink,width:penWidth};
    strokes.push(stroke);
    paint();
  });
  preview.addEventListener('pointermove', e => {
    if (!stroke || !preview.hasPointerCapture(e.pointerId)) return;
    stroke.points.push(point(e));
    paint();
  });
  preview.addEventListener('lostpointercapture', () => { stroke = null; });

  async function storage(write, deleteKey) {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('yearon-story-booth', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('photos', {autoIncrement: true});
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    try {
      return await new Promise((resolve, reject) => {
        const deleting = deleteKey !== undefined;
        const tx = db.transaction('photos', write || deleting ? 'readwrite' : 'readonly');
        const store = tx.objectStore('photos');
        const request = write ? store.add(write) : deleting ? store.delete(deleteKey) : store.getAll();
        const keys = write || deleting ? null : store.getAllKeys();
        tx.oncomplete = () => resolve(keys
          ? request.result.map((photo, i) => ({...photo, key: keys.result[i]}))
          : request.result);
        tx.onabort = () => reject(tx.error);
      });
    } finally { db.close(); }
  }

  async function archive() {
    show('archive', t('스토리 보관함','Story archive'), button('retake', t('카메라','Camera'), '+'),
      '<div class="story-booth-grid"></div>');
    const request = generation;
    try {
      const entries = await storage();
      if (request !== generation) return;
      const grid = select('.story-booth-grid');
      if (!entries.length) status(t('아직 보관된 사진이 없어요.', 'No saved photos yet.'));
      entries.reverse().forEach(({image, date, key}) => {
        const url = URL.createObjectURL(image);
        urls.push(url);
        const card = document.createElement('button');
        card.type = 'button';
        const img = new Image();
        img.src = url;
        img.alt = new Date(date).toLocaleString();
        card.append(img);
        card.onclick = () => {
          grid.hidden = true;
          const large = new Image();
          large.className = 'story-booth-full';
          large.src = url;
          large.alt = img.alt;
          select('.story-booth-body').prepend(large);
          booth.querySelector('footer').innerHTML = button('archive', t('목록으로','Back to archive')) +
            button('edit-photo',t('사진 편집','Edit photo'))+button('download-photo',t('사진 다운로드','Download photo'))+button('delete-photo', t('사진 삭제','Delete photo'));
          select('[data-booth=edit-photo]').onclick=()=>{if(large.complete&&large.naturalWidth)usePhoto(large,large.naturalWidth,large.naturalHeight)};
          select('[data-booth=download-photo]').onclick=()=>{const a=document.createElement('a');a.href=url;a.download='YEARON-'+new Date(date).toISOString().replace(/[:.]/g,'-')+'.jpg';a.click()};
          const remove = select('[data-booth=delete-photo]');
          remove.onclick = async () => {
            remove.disabled = true;
            try {
              await storage(null, key);
              if (remove.isConnected) archive();
            } catch {
              if (!remove.isConnected) return;
              remove.disabled = false;
              status(t('사진을 삭제하지 못했어요.', 'Could not delete the photo.'));
            }
          };
          select('[data-booth=archive]').focus();
        };
        grid.append(card);
      });
    } catch {
      if (request === generation) status(t('보관함을 열 수 없어요.', 'Could not open the archive.'));
    }
  }

  function close(restore = true) {
    if (booth.hidden) return;
    show('', '', '', '');
    booth.hidden = true;app.classList.remove('phone-camera-open');
    underlying().forEach(el => { el.inert = app.classList.contains('phone-is-home') || app.classList.contains('phone-is-locked'); });
    if (restore) opener?.focus({preventScroll: true});
  }

  app.addEventListener('click', e => {
    const trigger = e.target.closest('[data-my-story]');
    if (!trigger) return;
    opener = trigger;
    facing = 'user';
    booth.hidden = false;
    underlying().forEach(el => { el.inert = true; });
    camera();
  });
  booth.addEventListener('click', async e => {
    const control = e.target.closest('[data-booth]');
    switch (control?.dataset.booth) {
      case 'close': close(); break;
      case 'archive': archive(); break;
      case 'retake': camera(); break;
      case 'flip': facing = facing === 'user' ? 'environment' : 'user'; camera(); break;
      case 'gallery': archive(); break;
      case 'capture': {
        const video = select('video');
        if (video.videoWidth) usePhoto(video, video.videoWidth, video.videoHeight, video.classList.contains('is-mirrored'));
        break;
      }
      case 'filter': {
        drawing=false;preview.classList.remove('is-drawing');select('[data-booth=pen]').setAttribute('aria-pressed','false');
        const tools=select('.story-edit-tools');tools.hidden=false;
        tools.innerHTML='<div class="story-filter-strip">'+filters.map((f,i)=>'<button type="button" data-filter="'+i+'" aria-pressed="'+(i===filterIndex)+'"><img alt="" src="'+photo.toDataURL('image/jpeg',.45)+'" style="filter:'+f[2]+'"><span>'+t(f[0],f[1])+'</span></button>').join('')+'</div>';
        tools.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filterIndex=Number(b.dataset.filter);tools.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));paint()});break;
      }
      case 'text': {
        drawing=false;preview.classList.remove('is-drawing');select('[data-booth=pen]').setAttribute('aria-pressed','false');select('.story-edit-tools').hidden=true;
        const input = select('.story-booth-caption');
        input.hidden = !input.hidden;
        if (!input.hidden) input.focus();
        break;
      }
      case 'pen': {
        drawing = !drawing;select('.story-booth-caption').hidden=true;
        preview.classList.toggle('is-drawing', drawing);control.setAttribute('aria-pressed', drawing);
        const tools=select('.story-edit-tools');tools.hidden=!drawing;
        if(drawing){tools.innerHTML='<div class="story-pen-colors">'+['#ffffff','#17191d','#ff6b72','#ffd56a','#83d9fc','#bca3ff'].map(c=>'<button type="button" data-ink="'+c+'" aria-label="'+c+'" aria-pressed="'+(c===ink)+'" style="--ink:'+c+'"></button>').join('')+'</div><div class="story-pen-options"><input type="range" min="2" max="24" value="'+penWidth+'" aria-label="'+t('펜 굵기','Brush size')+'">'+button('undo',t('되돌리기','Undo'),'↶')+button('redo',t('다시 실행','Redo'),'↷')+'</div>';
        tools.querySelectorAll('[data-ink]').forEach(b=>b.onclick=()=>{ink=b.dataset.ink;tools.querySelectorAll('[data-ink]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))});
        tools.querySelector('input').oninput=e=>penWidth=Number(e.target.value);paint();}break;
      }
      case 'frame': frame = (frame + 1) % 3; paint(); break;
      case 'undo': if(strokes.length)redo.push(strokes.pop());paint(); break;
      case 'redo': if(redo.length)strokes.push(redo.pop());paint();break;
      case 'save': {
        control.disabled = true;
        const request = generation;status(t('사진을 보관하는 중…','Saving photo…'));paint();
        try {
          const image = await new Promise(resolve => preview.toBlob(resolve, 'image/jpeg', .95));
          if (!image) throw new Error('Photo encoding failed');
          await storage({image, date: Date.now()});
          if (request === generation) archive();
        } catch {
          if (request === generation) {
            status(t('저장하지 못했어요. 다시 시도해 주세요.', 'Could not save. Please try again.'));
            control.disabled = false;
          }
        }
        break;
      }
    }
  });

  booth.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.stopPropagation(); close(); }
    if (e.key !== 'Tab') return;
    const controls = [...booth.querySelectorAll('button:not(:disabled),input:not([hidden])')].filter(el => el.getClientRects().length);
    const edge = e.shiftKey ? controls[0] : controls.at(-1);
    if (e.target === edge) {
      e.preventDefault();
      (e.shiftKey ? controls.at(-1) : controls[0]).focus();
    }
  });
  const watch = new MutationObserver(() => {
    if (!panel.classList.contains('active') || app.matches('.phone-is-home,.phone-is-locked')) close(false);
  });
  for (const el of [app, panel]) watch.observe(el, {attributes: true, attributeFilter: ['class']});
  addEventListener('pagehide', () => close(false));
  addEventListener('yearon-phone-reset', () => close(false));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && mode === 'camera') stopCamera();
    else if (!document.hidden && mode === 'camera' && !stream) startCamera();
  });
})();
