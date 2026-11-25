import {
  MedicineItem,
  SupplementItem,
  PRESET_MEDICINES,
  PRESET_SUPPLEMENTS,
} from './durEngine';

export const MEDICAL_LEGAL_DISCLAIMER = {
  shortNotice:
    '본 서비스는 식약처(MFDS) 허가사항 및 DUR 공공데이터를 기반으로 한 일반 정보 제공 서비스이며, 의사·약사의 전문적 진단 및 처방을 대체하지 않습니다.',
  fullNotice:
    '【의료법 제27조 관련 법적 고지 및 면책 조항】\n' +
    '1. 본 서비스는 개인의 건강 관리 및 이해를 돕기 위해 공공데이터(식품의약품안전처, 건강보험심사평가원)의 의약품·건강기능식품 안전사용 정보를 요약 제공합니다.\n' +
    '2. 본 분석 결과는 특정 질환의 진단, 예방, 치료 또는 처방 변경의 지시가 아니며, 의료기관의 의학적 판단을 대신할 수 없습니다.\n' +
    '3. 복용 중인 전문의약품의 복용 중단, 용량 변경, 또는 영양제 병용 여부는 반드시 담당 주치의 또는 전담 약사와 사전에 상담하십시오.\n' +
    '4. 응급 상황이거나 이상 반응이 발생한 경우 즉시 가까운 병의원 응급실을 방문하거나 119에 연락하십시오.',
  institutionBadge: '식약처 DUR 공공데이터 기반',
};

const STORAGE_KEY = 'pill_check_saved_state_v1';

export interface UserPillState {
  medicines: MedicineItem[];
  supplements: SupplementItem[];
}

export function loadUserPillState(): UserPillState {
  if (typeof localStorage === 'undefined') {
    return { medicines: [], supplements: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.medicines) && Array.isArray(parsed.supplements)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load user pill state', e);
  }

  // 기본 초기 상태: 친절한 1-클릭 가이드를 위해 정형외과 소염제 + 오메가3 예시 기본 로드
  const defaultMeds = [PRESET_MEDICINES[0]]; // 록소프로펜정
  const defaultSupps = [PRESET_SUPPLEMENTS[0]]; // 오메가3
  return { medicines: defaultMeds, supplements: defaultSupps };
}

export function saveUserPillState(state: UserPillState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save user pill state', e);
  }
}

// -------------------------------------------------------------
// 원클릭 빠른 체험 프리셋 시나리오
// -------------------------------------------------------------
export interface QuickScenario {
  id: string;
  title: string;
  badge: string;
  desc: string;
  medicines: MedicineItem[];
  supplements: SupplementItem[];
}

export const QUICK_SCENARIOS: QuickScenario[] = [
  {
    id: 'scenario_bleeding',
    title: '정형외과 처방약 + 오메가3',
    badge: '🔴 출혈 위험 확인',
    desc: '소염진통제와 오메가3 병용 시 지혈 지연 상호작용',
    medicines: [PRESET_MEDICINES[0]], // 록소프로펜
    supplements: [PRESET_SUPPLEMENTS[0]], // 오메가3
  },
  {
    id: 'scenario_chelation',
    title: '항생제 + 유산균 & 칼슘',
    badge: '🟡 시간차 복용 확인',
    desc: '항생제 약효 무력화 방지 2~3시간 간격 복용',
    medicines: [PRESET_MEDICINES[5]], // 시프로플록사신 (항생제)
    supplements: [PRESET_SUPPLEMENTS[2], PRESET_SUPPLEMENTS[5]], // 유산균, 칼슘
  },
  {
    id: 'scenario_synergy',
    title: '고지혈증약 + 코엔자임Q10',
    badge: '🟢 추천 시너지',
    desc: '스타틴 약물 복용 시 고갈되는 CoQ10의 유익한 보충',
    medicines: [PRESET_MEDICINES[4]], // 아토르바스타틴
    supplements: [PRESET_SUPPLEMENTS[9]], // 코엔자임Q10
  },
  {
    id: 'scenario_duplication',
    title: '병원 2곳 중복 처방',
    badge: '🚨 성분 중복 경고',
    desc: '서로 다른 병원에서 소염진통제 중복 처방 시 위장관 위험',
    medicines: [PRESET_MEDICINES[0], PRESET_MEDICINES[1]], // 록소프로펜 + 이부프로펜
    supplements: [],
  },
];
