const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  toggle.textContent = open ? "×" : "☰";
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".support").open = false;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "메뉴 열기");
    toggle.textContent = "☰";
  }
});
document.addEventListener("click", (e) => {
  const s = document.querySelector(".support");
  if (!s.contains(e.target)) s.open = false;
});
document
  .querySelector("form")
  ?.addEventListener("submit", (e) => e.preventDefault());

/* Copy an inquiry draft without claiming that a static form sends messages. */
const copyInquiry = document.querySelector('#save-inquiry');
copyInquiry?.addEventListener('click', async () => {
  const form = document.querySelector('#contact-form');
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const draft = `이름: ${data.get('name')}\n이메일: ${data.get('email')}\n문의 유형: ${data.get('category')}\n\n${data.get('message')}`;
  try {
    await navigator.clipboard.writeText(draft);
    copyInquiry.textContent = '문의 내용 복사 완료 ✓';
  } catch {
    const field = document.querySelector('#message');
    field.focus();
    field.select();
    copyInquiry.textContent = '선택한 내용을 복사해 주세요';
  }
});
