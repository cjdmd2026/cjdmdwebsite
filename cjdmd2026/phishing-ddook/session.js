
import { db } from "./firebase-init.js";
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function getSessionId() {
  const params = new URLSearchParams(window.location.search);
  const uidFromUrl = params.get("uid");

  if (uidFromUrl) {
    sessionStorage.setItem("visitUid", uidFromUrl);
    return uidFromUrl;
  }
  return sessionStorage.getItem("visitUid");
}

export async function logAction(title, desc, level) {
  const uid = getSessionId();
  if (!uid) {
    console.warn("[session.js] 세션 ID가 없어서 행동을 기록하지 못했습니다.");
    return;
  }
  await setDoc(doc(db, "visits", uid), {
    timeline: arrayUnion({ title, desc, level, at: Date.now() })
  }, { merge: true });
}

export async function setScore(dimension, points) {
  sessionStorage.setItem("score_" + dimension, String(points));

  const uid = getSessionId();
  if (!uid) {
    console.warn("[session.js] 세션 ID가 없어서 점수를 기록하지 못했습니다.");
    return;
  }
  await setDoc(doc(db, "visits", uid), {
    scores: { [dimension]: points }
  }, { merge: true });
}

export async function setField(fieldName, value) {
  const uid = getSessionId();
  if (!uid) {
    console.warn("[session.js] 세션 ID가 없어서 값을 저장하지 못했습니다.");
    return;
  }
  await setDoc(doc(db, "visits", uid), { [fieldName]: value }, { merge: true });
}

const ORDER = ["urgency", "trust", "action", "verify", "repeat"];

const DIMENSION_INFO = {
  urgency: {
    label: "긴급성",
    blurb: "상황이 급하다고 몰아붙이면 이유를 따지지 않고 서두르는 편",
    tips: [
      "아무리 급해도 30초만 멈추고 생각해보기",
      "재촉하는 연락일수록 먼저 의심하기"
    ]
  },
  trust: {
    label: "신뢰",
    blurb: "공공기관이나 아는 사람이라고 하면 쉽게 믿는 편",
    tips: [
      "공식 기관은 전화로 개인정보나 송금을 요구하지 않는다는 것 기억하기",
      "소속이나 직위를 말해도 공식 번호로 다시 확인하기"
    ]
  },
  action: {
    label: "행동유도",
    blurb: "시키는 대로 링크를 누르거나 바로 행동에 옮기는 편",
    tips: [
      "링크나 앱 설치를 요구하면 바로 누르지 않기",
      "어떤 행동을 하기 전에 왜 필요한지 되묻기"
    ]
  },
  verify: {
    label: "확인",
    blurb: "다른 곳에 확인하지 않고 그대로 진행하는 편",
    tips: [
      "가족이나 공식 고객센터 등 다른 채널로 반드시 재확인하기",
      "화면에 뜨는 번호나 이름만 보고 믿지 않기"
    ]
  },
  repeat: {
    label: "반복",
    blurb: "같은 부탁이 반복되면 결국 들어주는 편",
    tips: [
      "같은 부탁이 반복될수록 더 의심하기",
      "한 번 넘어갔더라도 그 다음부터는 멈추는 연습하기"
    ]
  }
};

const TYPE_BY_PAIR = {
  "trust,urgency":  "급하다 하면 바로 믿는 순둥이",
  "action,urgency": "지금 하라면 바로 하는 빠름이",
  "urgency,verify": "급하면 확인 안하는 덜렁이",
  "repeat,urgency": "급하다 하면 끝까지 하는 불안이",
  "action,trust":   "믿으면 바로 해주는 순진이",
  "trust,verify":   "믿으면 확인 안하는 방심이",
  "repeat,trust":   "믿어서 계속 해주는 소심이",
  "action,verify":  "시키면 확인 없이 하는 성급이",
  "action,repeat":  "시키는 대로 계속 하는 따라쟁이",
  "repeat,verify":  "확인 안하고 끝까지 하는 깜빡이"
};

function pickTopTwoDimensions(scores) {
  const entries = ORDER.map(dim => ({ dim, score: scores[dim] || 0 }));
  entries.sort((a, b) => b.score - a.score || ORDER.indexOf(a.dim) - ORDER.indexOf(b.dim));
  const top2 = [entries[0].dim, entries[1].dim];
  top2.sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
  return top2;
}

export function describeType(scores) {
  const s = {};
  ORDER.forEach(dim => { s[dim] = Number((scores || {})[dim] || 0); });

  const [dimA, dimB] = pickTopTwoDimensions(s);
  const key = [dimA, dimB].slice().sort().join(",");
  const typeName = TYPE_BY_PAIR[key] || "알 수 없음";

  const infoA = DIMENSION_INFO[dimA];
  const infoB = DIMENSION_INFO[dimB];
  const typeSummary = `${typeName} 유형은 ${infoA.blurb}이고, 동시에 ${infoB.blurb} 경향이 있어요.`;
  const tips = [...infoA.tips, ...infoB.tips];
  return { typeName, typeSummary, tips };
}

export function fixUnknownType(data) {
  if (!data) return data;
  const broken = !Object.values(TYPE_BY_PAIR).includes(data.resultType);
  if (broken && data.scores && Object.keys(data.scores).length) {
    const t = describeType(data.scores);
    return { ...data, resultType: t.typeName, typeSummary: t.typeSummary, tips: t.tips };
  }
  return data;
}

export async function computeAndSaveResultType() {
  const scores = {};
  ORDER.forEach(dim => {
    scores[dim] = Number(sessionStorage.getItem("score_" + dim) || 0);
  });

  const { typeName, typeSummary, tips } = describeType(scores);

  const uid = getSessionId();
  if (!uid) {
    console.warn("[session.js] 세션 ID가 없어서 유형을 저장하지 못했습니다.");
    return null;
  }

  await setDoc(doc(db, "visits", uid), {
    resultType: typeName,
    typeSummary,
    tips
  }, { merge: true });

  return { typeName, typeSummary, tips };
}

export async function fetchResult() {
  const uid = getSessionId();
  if (!uid) return null;

  const snap = await getDoc(doc(db, "visits", uid));
  return snap.exists() ? snap.data() : null;
}

