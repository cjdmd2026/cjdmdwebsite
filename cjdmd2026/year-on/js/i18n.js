/* =========================================================
   한국어 / 영어 전환
   HTML 요소에 data-ko와 data-en을 적으면 자동으로 바뀝니다.
   선택한 언어는 브라우저에 기억됩니다.
   ========================================================= */

const savedLanguage = localStorage.getItem("yearon-language") || "ko";
window.YEARON_LANG = savedLanguage;

function changeLanguage(language) {
  window.YEARON_LANG = language;
  localStorage.setItem("yearon-language", language);
  document.documentElement.lang = language;

  document.querySelectorAll("[data-ko][data-en]").forEach((element) => {
    if (element.closest('[translate="no"]')) return;
    if (element.hasAttribute("data-i18n-html")) {
      element.innerHTML = element.dataset[language];
    } else {
      element.textContent = element.dataset[language];
    }
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });

  window.dispatchEvent(new CustomEvent("yearon-language-change"));
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => changeLanguage(button.dataset.lang));
});

changeLanguage(savedLanguage);
