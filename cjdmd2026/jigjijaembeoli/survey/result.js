import { surveyRpc } from "./api.js";

const participantCode = sessionStorage.getItem("jikjiParticipantCode");
const resultToken = sessionStorage.getItem("jikjiResultToken");
const status = document.querySelector("#result-status");
const metrics = document.querySelector("#survey-metrics");
const message = document.querySelector("#result-message");

function setStatus(text, isError = false) {
  status.textContent = text;
  status.classList.toggle("is-error", isError);
}

function paintMetric(name, before, after, kind = "scale") {
  const card = metrics.querySelector(`[data-metric="${name}"]`);
  const rows = ["pre", "post"];
  const values = [before, after];
  const targetWidths = [];
  rows.forEach((row, index) => {
    const value = values[index];
    const bar = card.querySelector(`[data-bar="${row}"]`);
    const label = card.querySelector(`[data-score="${row}"]`);
    const amount = kind === "binary" ? (value === "yes" ? 100 : 0) : Number(value);
    targetWidths.push(kind === "binary" ? amount : amount * 20);
    bar.style.width = "0%";
    label.textContent = kind === "binary"
      ? (value === "yes" ? "정답" : value === "unknown" ? "잘 모르겠어요" : "오답")
      : `${amount} / 5점`;
  });
  const change = card.querySelector("[data-change]");
  if (kind === "binary") {
    const beforeCorrect = before === "yes";
    const afterCorrect = after === "yes";
    change.textContent = beforeCorrect === afterCorrect
      ? "한 문항의 정답 여부를 비교했어요."
      : afterCorrect ? "체험 후 정답을 선택했어요." : "체험 전후 응답을 그대로 표시했어요.";
    return { delta: Number(afterCorrect) - Number(beforeCorrect) };
  }
  const delta = Number(after) - Number(before);
  change.textContent = `체험 후 ${delta > 0 ? `+${delta}` : delta}점 (5점 척도)`;
  return { delta, bars: [...card.querySelectorAll("[data-bar]")], widths: targetWidths };
}

async function loadResult() {
  if (!participantCode || !resultToken) {
    location.replace("../post/");
    return;
  }
  try {
    const result = await surveyRpc("jikji_get_result", { p_code: participantCode, p_result_token: resultToken });
    if (!result?.pre || !result?.post) throw new Error("체험 후 설문이 완료된 참여번호인지 확인해 주세요.");
    const understanding = paintMetric("understanding", result.pre.Q04, result.post.Q01);
    const knowledge = paintMetric("knowledge", result.pre.Q05, result.post.Q02, "binary");
    const awareness = paintMetric("awareness", result.pre.Q06, result.post.Q03);
    const interest = paintMetric("interest", result.pre.Q08, result.post.Q07);

    if (understanding.delta > 0 && interest.delta > 0) {
      message.textContent = "직지에 대한 이해도와 관심도가 모두 높아졌어요. 새로운 배움이 시작되었네요!";
    } else if (knowledge.delta > 0) {
      message.textContent = "직지의 중요한 특징을 새롭게 알게 되었어요!";
    } else if (understanding.delta === 0 && interest.delta === 0 && knowledge.delta === 0) {
      message.textContent = "직지와 함께한 경험을 소중하게 간직해 주세요!";
    } else {
      message.textContent = "답변해 주셔서 고마워요. 직지와 함께한 경험을 천천히 떠올려 보세요!";
    }
    document.querySelector("#result-participant-code").textContent = participantCode;
    document.querySelector("#result-token").textContent = resultToken;
    document.querySelector("#survey-access-receipt").hidden = false;
    metrics.hidden = false;
    status.hidden = true;
    requestAnimationFrame(() => [understanding, knowledge, awareness, interest].forEach(metric => {
      metric.bars.forEach((bar, index) => { bar.style.width = `${metric.widths[index]}%`; });
    }));
  } catch (error) {
    setStatus(error.message || "결과를 불러오지 못했어요. 참여번호를 다시 확인해 주세요.", true);
    const link = document.createElement("a");
    link.className = "survey-back-link";
    link.href = "../post/";
    link.textContent = "참여번호 확인하기";
    status.append(" ", link);
  }
}

document.querySelector("#return-home").addEventListener("click", () => {
  sessionStorage.removeItem("jikjiParticipantCode");
  sessionStorage.removeItem("jikjiResultToken");
});

document.querySelector("#copy-result-access").addEventListener("click", async event => {
  const status = document.querySelector("#result-access-copy-status");
  const credentials = `${participantCode}\n${resultToken}`;
  try {
    await navigator.clipboard.writeText(credentials);
    status.textContent = "참여번호와 결과 확인 번호를 복사했어요. 안전하게 보관해 주세요.";
  } catch {
    status.textContent = credentials;
  }
  event.currentTarget.focus();
});

loadResult();
