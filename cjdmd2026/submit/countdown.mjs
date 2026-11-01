const countdown = document.getElementById('submission-countdown');
const value = document.getElementById('submission-countdown-value');
const label = document.getElementById('submission-deadline-label');
// November 15 at 24:00 KST is November 16 at 00:00 KST.
const deadline = Date.parse(document.getElementById('submission-deadline')?.dateTime);

if (countdown && value && label && Number.isFinite(deadline)) {
  function updateCountdown() {
    const remaining = deadline - Date.now();
    const days = Math.max(0, Math.ceil(remaining / 86_400_000));
    const text = `D-${days}`;
    if (value.textContent !== text) {
      value.textContent = text;
      countdown.setAttribute('aria-label', remaining > 0 ? `제출 마감까지 ${days}일` : '제출 마감 시간이 되었습니다');
      label.textContent = remaining > 0 ? '제출 마감까지' : '제출 마감';
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateCountdown();
  });
}
