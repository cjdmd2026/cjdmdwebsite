import { initSurveyFlow } from "./flow.js";

initSurveyFlow({
  formId: "pre-survey-form",
  progressId: "pre-progress",
  completeId: "pre-complete",
  statusId: "survey-status",
  storageKey: "jikjiSurveyPre",
  draftKey: "jikjiSurveyPreDraft",
  onComplete: ({ result }) => saveAggregateResponse("jikjiSurveyPreResponses", result),
});

function saveAggregateResponse(key, result) {
  try {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const responses = Array.isArray(existing) ? existing : [];
    const previous = JSON.parse(localStorage.getItem("jikjiSurveyPre") || "null");
    if (previous?.completedAt && !responses.some(response => response.completedAt === previous.completedAt)) {
      responses.push(previous);
    }
    if (!responses.some(response => response.completedAt === result.completedAt)) responses.push(result);
    localStorage.setItem(key, JSON.stringify(responses));
  } catch {
    // Survey completion remains available even if local storage is full.
  }
}
