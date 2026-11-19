import { SURVEY_CONFIG } from "./config.js";

export class SurveyApiError extends Error {
  constructor(message, code = "SURVEY_API_ERROR") {
    super(message);
    this.name = "SurveyApiError";
    this.code = code;
  }
}

export function isSurveyBackendConfigured() {
  return Boolean(SURVEY_CONFIG.supabaseUrl && SURVEY_CONFIG.supabaseAnonKey);
}

export async function surveyRpc(functionName, args = {}) {
  if (!isSurveyBackendConfigured()) {
    throw new SurveyApiError("설문 저장 서버가 아직 연결되지 않았어요. 서버 설정 후 다시 참여해 주세요.", "NOT_CONFIGURED");
  }

  const baseUrl = SURVEY_CONFIG.supabaseUrl.replace(/\/$/, "");
  let response;
  try {
    response = await fetch(`${baseUrl}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SURVEY_CONFIG.supabaseAnonKey,
        Authorization: `Bearer ${SURVEY_CONFIG.supabaseAnonKey}`,
      },
      body: JSON.stringify(args),
    });
  } catch {
    throw new SurveyApiError("저장 서버에 연결할 수 없어요. 인터넷 연결을 확인한 뒤 다시 시도해 주세요.", "NETWORK_ERROR");
  }

  if (!response.ok) {
    let message = "응답을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.";
    try {
      const detail = await response.json();
      if (detail.code === "P0001" && detail.message) message = detail.message;
    } catch {}
    throw new SurveyApiError(message, "REQUEST_FAILED");
  }
  return response.json();
}

export function normalizeParticipantCode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}
