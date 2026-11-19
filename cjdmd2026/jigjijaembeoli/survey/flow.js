/* One-question-at-a-time survey flow with local drafts until a shared store is connected. */
export function initSurveyFlow({ formId, progressId, completeId, storageKey, draftKey, statusId, onComplete }) {
  const form = document.getElementById(formId);
  const progress = document.getElementById(progressId);
  const complete = document.getElementById(completeId);
  const status = document.getElementById(statusId);
  if (!form || !progress || !complete || !status) return;

  const questions = [...form.querySelectorAll(".survey-question")];
  const backButton = form.querySelector("[data-survey-back]");
  const nextButton = form.querySelector("[data-survey-next]");
  const submitButton = form.querySelector("[data-survey-submit]");
  let current = 0;
  let draft = readStorage(draftKey) || { answers: {}, consent: false };

  function readStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function getAnswers() {
    const answers = {};
    form.querySelectorAll("input[type='radio']:checked").forEach(input => {
      answers[input.name] = input.value;
    });
    return answers;
  }

  function saveDraft() {
    draft = {
      answers: getAnswers(),
      consent: Boolean(form.querySelector(".survey-consent input")?.checked),
    };
    saveStorage(draftKey, draft);
  }

  Object.entries(draft.answers || {}).forEach(([name, value]) => {
    const choice = [...form.querySelectorAll("input[type='radio']")]
      .find(input => input.name === name && input.value === value);
    if (choice) choice.checked = true;
  });
  const consentInput = form.querySelector(".survey-consent input");
  if (consentInput) consentInput.checked = Boolean(draft.consent);

  progress.replaceChildren(...questions.map((_, index) => {
    const segment = document.createElement("span");
    if (index === 0) segment.classList.add("is-current");
    return segment;
  }));

  function showQuestion(index, moveFocus = false) {
    current = Math.max(0, Math.min(questions.length - 1, index));
    questions.forEach((question, questionIndex) => {
      const active = questionIndex === current;
      question.hidden = !active;
      question.disabled = !active;
      question.classList.remove("is-entering");
      if (active) {
        const number = question.querySelector(".survey-question__number");
        if (number) number.textContent = String(questionIndex + 1).padStart(2, "0");
        question.classList.add("is-entering");
      }
    });

    [...progress.children].forEach((segment, segmentIndex) => {
      segment.classList.toggle("is-current", segmentIndex === current);
      segment.classList.toggle("is-complete", segmentIndex < current);
    });
    progress.setAttribute("aria-label", `설문 ${current + 1} / ${questions.length}`);
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-valuemin", "1");
    progress.setAttribute("aria-valuemax", String(questions.length));
    progress.setAttribute("aria-valuenow", String(current + 1));
    progress.setAttribute("aria-valuetext", `설문 ${current + 1} / ${questions.length}`);
    backButton.disabled = current === 0;
    backButton.hidden = current === 0;
    nextButton.hidden = current === questions.length - 1;
    submitButton.hidden = current !== questions.length - 1;
    status.textContent = "";
    if (moveFocus) questions[current].querySelector("legend")?.focus({ preventScroll: true });
  }

  function currentIsValid() {
    const question = questions[current];
    const invalid = [...question.querySelectorAll("input, select, textarea")]
      .find(control => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    invalid.focus({ preventScroll: true });
    return false;
  }

  nextButton.addEventListener("click", () => {
    if (!currentIsValid()) return;
    saveDraft();
    showQuestion(current + 1, true);
  });
  backButton.addEventListener("click", () => {
    saveDraft();
    showQuestion(current - 1, true);
  });
  form.addEventListener("change", saveDraft);
  form.addEventListener("animationend", event => {
    if (event.animationName === "survey-question-enter") event.target.classList.remove("is-entering");
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (current !== questions.length - 1) {
      if (currentIsValid()) showQuestion(current + 1, true);
      return;
    }
    if (!currentIsValid()) return;

    const result = {
      answers: getAnswers(),
      consent: Boolean(consentInput?.checked),
      completedAt: new Date().toISOString(),
    };
    const saved = saveStorage(storageKey, result);
    try { localStorage.removeItem(draftKey); } catch {}
    form.hidden = true;
    complete.hidden = false;
    if (!saved) {
      const intro = complete.querySelector(".survey-intro");
      if (intro) intro.textContent = "답변을 완료했어요. 이 브라우저의 저장 공간을 사용할 수 없어 이번 응답은 임시 저장되지 않았습니다.";
    }
    onComplete?.({ result, saved });
    complete.focus({ preventScroll: true });
  });

  showQuestion(0);
}
