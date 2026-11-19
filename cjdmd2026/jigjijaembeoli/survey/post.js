import { initSurveyFlow } from "./flow.js";

const results = document.querySelector("#post-results");
const notice = document.querySelector("#post-results-notice");
const metrics = document.querySelector("#post-local-metrics");
const summary = document.querySelector("#post-results-summary");
const totalResponses = document.querySelector("#post-total-responses");

function readStorage(key, fallback = null) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function appendResponse(key, result, legacyKey) {
  try {
    const stored = readStorage(key, []);
    const responses = Array.isArray(stored) ? stored : [];
    const legacy = readStorage(legacyKey);
    if (legacy?.completedAt && !responses.some(item => item.completedAt === legacy.completedAt)) responses.push(legacy);
    if (!responses.some(item => item.completedAt === result.completedAt)) responses.push(result);
    localStorage.setItem(key, JSON.stringify(responses));
    return responses;
  } catch {
    return [];
  }
}

function readResponses(key, legacyKey) {
  const saved = readStorage(key, []);
  const responses = Array.isArray(saved) ? [...saved] : [];
  const legacy = readStorage(legacyKey);
  if (legacy?.completedAt && !responses.some(item => item.completedAt === legacy.completedAt)) responses.push(legacy);
  return responses;
}

function distribution(responses, key, options) {
  const validAnswers = responses
    .map(response => response?.answers?.[key])
    .filter(answer => options.some(option => option.value === String(answer)));
  return options.map(option => {
    const count = validAnswers.filter(answer => String(answer) === option.value).length;
    const percent = validAnswers.length ? count / validAnswers.length * 100 : 0;
    return { ...option, count, percent, total: validAnswers.length };
  });
}

function renderDistribution(container, title, data) {
  container.replaceChildren();
  const heading = document.createElement("h4");
  heading.className = "survey-distribution__title";
  heading.textContent = `${title} · ${data[0]?.total || 0}명`;
  container.append(heading);

  const rows = document.createElement("div");
  rows.className = "survey-distribution__rows";
  data.forEach(item => {
    const row = document.createElement("div");
    row.className = "survey-dist-row";
    row.tabIndex = 0;
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", `${title}, ${item.label}: ${item.count}명, ${Math.round(item.percent)}퍼센트`);
    row.dataset.tooltip = `${item.label}: ${item.count}명 (${Math.round(item.percent)}%)`;
    const label = document.createElement("span");
    label.className = "survey-dist-row__label";
    label.textContent = item.label;
    const track = document.createElement("div");
    track.className = "survey-dist-track";
    const bar = document.createElement("span");
    bar.className = `survey-dist-bar survey-dist-bar--${container.dataset.distribution}`;
    bar.style.width = `${item.percent}%`;
    track.append(bar);
    const value = document.createElement("strong");
    value.className = "survey-dist-row__value";
    value.textContent = `${Math.round(item.percent)}%`;
    row.append(label, track, value);
    rows.append(row);
  });
  container.append(rows);
}

function renderMetric(card, config, beforeResponses, afterResponses) {
  const options = config.options;
  renderDistribution(
    card.querySelector('[data-distribution="pre"]'),
    "체험 전",
    distribution(beforeResponses, config.before, options),
  );
  renderDistribution(
    card.querySelector('[data-distribution="post"]'),
    "체험 후",
    distribution(afterResponses, config.after, options),
  );
}

function renderAggregateResults() {
  if (!results) return;
  results.hidden = false;
  const beforeResponses = readResponses("jikjiSurveyPreResponses", "jikjiSurveyPre");
  const afterResponses = readResponses("jikjiSurveyPostResponses", "jikjiSurveyPost");
  totalResponses.textContent = `총 ${afterResponses.length}명의 사용자가 응답했어요`;

  const scale = ["1", "2", "3", "4", "5"].map(value => ({ value, label: value }));
  const knowledge = [
    { value: "yes", label: "맞아요" },
    { value: "no", label: "아니에요" },
    { value: "unknown", label: "잘 모르겠어요" },
  ];
  const definitions = [
    { id: "understanding", before: "Q04", after: "Q01", options: scale },
    { id: "knowledge", before: "Q05", after: "Q02", options: knowledge },
    { id: "awareness", before: "Q06", after: "Q03", options: scale },
    { id: "interest", before: "Q08", after: "Q07", options: scale },
  ];
  definitions.forEach(config => {
    renderMetric(metrics.querySelector(`[data-local-metric="${config.id}"]`), config, beforeResponses, afterResponses);
  });

  metrics.hidden = false;
  summary.hidden = false;
  if (!beforeResponses.length) {
    notice.hidden = false;
    notice.textContent = "체험 전 응답이 아직 없어요. 체험 전 설문도 완료하면 왼쪽(전)과 오른쪽(후)의 전체 응답 분포를 나란히 비교할 수 있습니다.";
  } else {
    notice.hidden = true;
  }
  summary.textContent = `각 문항의 왼쪽은 체험 전 ${beforeResponses.length}명, 오른쪽은 체험 후 ${afterResponses.length}명의 응답 분포예요. 막대 위에 마우스를 올리면 응답 수와 비율을 볼 수 있습니다.`;
}

initSurveyFlow({
  formId: "post-survey-form",
  progressId: "post-progress",
  completeId: "post-complete",
  statusId: "post-status",
  storageKey: "jikjiSurveyPost",
  draftKey: "jikjiSurveyPostDraft",
  onComplete: ({ result }) => {
    appendResponse("jikjiSurveyPostResponses", result, "jikjiSurveyPost");
    renderAggregateResults();
  },
});
