// File bytes go directly to private R2; only short-lived, scoped URLs reach the browser.
export function upload(url, file, { headers, abortSignal, onUploadProgress = () => {}, createRequest = () => new XMLHttpRequest() } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = createRequest();
    let settled = false;
    function finish(error) {
      if (settled) return;
      settled = true; abortSignal?.removeEventListener('abort', abort);
      error ? reject(error) : resolve();
    }
    function failure(message, status) { const error = new Error(message); error.status = status; finish(error); }
    function abort() { xhr.abort(); finish(new DOMException('Upload aborted', 'AbortError')); }
    if (abortSignal?.aborted) { finish(new DOMException('Upload aborted', 'AbortError')); return; }
    xhr.upload.onprogress = event => onUploadProgress({ loaded: event.loaded, percentage: file.size ? Math.min(100, event.loaded / file.size * 100) : 100 });
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) { onUploadProgress({ loaded: file.size, percentage: 100 }); finish(); }
      else failure(xhr.status === 403 ? '업로드 연결 시간이 지났거나 저장소 설정을 확인해야 합니다. 다시 시도해주세요.' : '파일 전송을 완료하지 못했습니다. 다시 시도해주세요.', xhr.status);
    };
    xhr.onerror = () => failure('파일 저장소에 연결할 수 없습니다. 네트워크 상태를 확인한 뒤 다시 시도해주세요.', 0);
    xhr.ontimeout = () => failure('파일 전송 시간이 초과되었습니다. 다시 시도해주세요.', 0);
    xhr.onabort = () => finish(new DOMException('Upload aborted', 'AbortError'));
    abortSignal?.addEventListener('abort', abort, { once: true });
    try {
      xhr.open('PUT', url); xhr.timeout = 10 * 60 * 1000;
      for (const [name, value] of Object.entries(headers || {})) xhr.setRequestHeader(name, value);
      xhr.send(file);
    } catch (error) { finish(error); }
  });
}
