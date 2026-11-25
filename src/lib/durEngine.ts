/**
 * K-FDA (식품의약품안전처) DUR 및 임상 복약 가이드 기반
 * 의약품 - 영양제 상호작용 & 중복 분석 엔진
 */

export type SeverityLevel = 'danger' | 'warning' | 'synergy';

export interface MedicineItem {
  id: string;
  name: string; // 상표명 또는 대표명 (예: 록소프로펜정, 타이레놀정, 아토르바스타틴 등)
  genericName: string; // 성분명 (예: Loxoprofen, Acetaminophen 등)
  category: DrugCategory;
  hospitalDept?: string; // 처방 진료과 (예: 정형외과, 내과, 이비인후과 등)
  description: string;
}

export type DrugCategory =
  | 'nsaid' // 소염진통제 (이부프로펜, 록소프로펜, 나프록센 등)
  | 'acetaminophen' // 해열진통제 (타이레놀, 아세트아미노펜 등)
  | 'blood_pressure' // 혈압약 (ACEI, ARB, 베타차단제 등)
  | 'statin' // 고지혈증약 (아토르바스타틴, 로수바스타틴 등)
  | 'antibiotic' // 항생제 (퀴놀론계, 테트라사이클린계 등)
  | 'antithrombotic' // 항응고/항혈전제 (와파린, 아스피린, 클로피도그렐 등)
  | 'thyroid' // 갑상선호르몬제 (신지로이드 등)
  | 'osteoporosis' // 골다공증약 (비스포스포네이트 등)
  | 'antacid' // 제산제/위장약 (알루미늄/마그네슘염, PPI 등)
  | 'antidiabetic' // 당뇨약 (메트포르민, 설포닐우레아 등)
  | 'antihistamine'; // 항히스타민제/비염약

export interface SupplementItem {
  id: string;
  name: string; // 영양제 이름 (예: 오메가3, 마그네슘, 유산균 등)
  code: SupplementCode;
  category: string;
  description: string;
  defaultTiming: string; // 추천 복용 시간대 (예: 식후 즉시, 공복 등)
}

export type SupplementCode =
  | 'omega3' // 오메가3 (EPA/DHA)
  | 'magnesium' // 마그네슘
  | 'probiotics' // 유산균
  | 'multivitamin' // 종합비타민
  | 'iron' // 철분
  | 'calcium' // 칼슘
  | 'vitamin_d' // 비타민D
  | 'vitamin_c' // 비타민C
  | 'milk_thistle' // 밀크씨슬 (실리마린)
  | 'ginkgo' // 은행잎추출물
  | 'coq10' // 코엔자임Q10
  | 'red_ginseng' // 홍삼/인삼
  | 'lutein' // 루테인/지아잔틴
  | 'zinc'; // 아연

export interface AnalysisResult {
  severity: SeverityLevel;
  title: string;
  involvedMedicine: string;
  involvedSupplement: string;
  mechanism: string; // 임상 메커니즘
  actionAdvice: string; // 환자 행동 가이드
  referenceSource: string; // 출처 (식약처 DUR 등)
}

export interface DrugDuplicationWarning {
  severity: 'danger';
  title: string;
  drugs: string[];
  reason: string;
  actionAdvice: string;
}

// -------------------------------------------------------------
// 대표 처방약 프리셋 데이터베이스
// -------------------------------------------------------------
export const PRESET_MEDICINES: MedicineItem[] = [
  {
    id: 'med_nsaid_1',
    name: '록소프로펜정 (소염진통제)',
    genericName: 'Loxoprofen',
    category: 'nsaid',
    hospitalDept: '정형외과 / 치과',
    description: '관절통, 근육통, 발치 후 염증 및 통증 완화',
  },
  {
    id: 'med_nsaid_2',
    name: '이부프로펜정 (애드빌 등)',
    genericName: 'Ibuprofen',
    category: 'nsaid',
    hospitalDept: '일반 / 이비인후과',
    description: '염증성 통증, 해열, 생리통 완화',
  },
  {
    id: 'med_tylenol',
    name: '아세트아미노펜 (타이레놀 등)',
    genericName: 'Acetaminophen',
    category: 'acetaminophen',
    hospitalDept: '내과 / 이비인후과',
    description: '해열, 두통 및 감기 몸살 완화',
  },
  {
    id: 'med_bp_1',
    name: '로사르탄정 (혈압약/ARB)',
    genericName: 'Losartan',
    category: 'blood_pressure',
    hospitalDept: '내과 / 순환기내과',
    description: '본태성 고혈압 치료 및 심혈관 보호',
  },
  {
    id: 'med_statin_1',
    name: '아토르바스타틴 (고지혈증약)',
    genericName: 'Atorvastatin',
    category: 'statin',
    hospitalDept: '내과',
    description: '콜레스테롤 합성 저하 및 혈중 지질 개선',
  },
  {
    id: 'med_antibiotic_1',
    name: '시프로플록사신 (항생제/퀴놀론계)',
    genericName: 'Ciprofloxacin',
    category: 'antibiotic',
    hospitalDept: '비뇨의학과 / 내과',
    description: '세균성 감염증(방광염, 호흡기 감염 등) 치료',
  },
  {
    id: 'med_antithrombotic_1',
    name: '아스피린장용정 100mg (항혈전제)',
    genericName: 'Aspirin Low-dose',
    category: 'antithrombotic',
    hospitalDept: '순환기내과 / 신경과',
    description: '혈소판 응집 억제를 통한 심근경색/뇌졸중 예방',
  },
  {
    id: 'med_thyroid_1',
    name: '신지로이드정 (갑상선호르몬제)',
    genericName: 'Levothyroxine',
    category: 'thyroid',
    hospitalDept: '내분비내과',
    description: '갑상선기능저하증 호르몬 보충요법',
  },
  {
    id: 'med_antacid_1',
    name: '알마겔정 / 제산제 (위장약)',
    genericName: 'Almagate',
    category: 'antacid',
    hospitalDept: '내과 / 소화기내과',
    description: '위산 중화 및 속쓰림, 위궤양 통증 완화',
  },
  {
    id: 'med_antidiabetic_1',
    name: '메트포르민정 (당뇨약)',
    genericName: 'Metformin',
    category: 'antidiabetic',
    hospitalDept: '내분비내과',
    description: '제2형 당뇨병 환자의 혈당 조절',
  },
];

// -------------------------------------------------------------
// 대표 영양제 / 건강기능식품 프리셋 데이터베이스
// -------------------------------------------------------------
export const PRESET_SUPPLEMENTS: SupplementItem[] = [
  {
    id: 'supp_omega3',
    name: '오메가3 (EPA/DHA)',
    code: 'omega3',
    category: '혈행 개선 / 눈 건강',
    description: '혈중 중성지질 개선 및 혈액 순환 보조',
    defaultTiming: '지방이 포함된 식사 직후',
  },
  {
    id: 'supp_magnesium',
    name: '마그네슘',
    code: 'magnesium',
    category: '근육 이완 / 신경 안정',
    description: '눈 밑 떨림 완화 및 수면·근육 기능 유지',
    defaultTiming: '저녁 식후 또는 취침 전',
  },
  {
    id: 'supp_probiotics',
    name: '유산균 (프로바이오틱스)',
    code: 'probiotics',
    category: '장 건강 / 배변 활동',
    description: '장내 유익균 증식 및 유해균 억제',
    defaultTiming: '기상 직후 공복 (미온수와 함께)',
  },
  {
    id: 'supp_multivitamin',
    name: '종합비타민 & 미네랄',
    code: 'multivitamin',
    category: '활력 / 영양 보충',
    description: '비타민 B군, C, A, 아연 등 복합 영양소',
    defaultTiming: '아침 또는 점심 식사 직후',
  },
  {
    id: 'supp_iron',
    name: '철분제',
    code: 'iron',
    category: '혈액 생성 / 빈혈 예방',
    description: '체내 산소 운반 및 혈액 생성에 필수',
    defaultTiming: '공복 (비타민C와 함께 섭취 시 흡수율 증가)',
  },
  {
    id: 'supp_calcium',
    name: '칼슘',
    code: 'calcium',
    category: '뼈 & 치아 건강',
    description: '골다공증 발생 위험 감소 및 뼈 형성',
    defaultTiming: '식후 (저녁 식후 권장)',
  },
  {
    id: 'supp_vitamin_d',
    name: '비타민D',
    code: 'vitamin_d',
    category: '칼슘 흡수 / 면역',
    description: '칼슘과 인이 흡수되고 이용되는 데 필요',
    defaultTiming: '지방 식사 직후',
  },
  {
    id: 'supp_vitamin_c',
    name: '비타민C (고함량)',
    code: 'vitamin_c',
    category: '항산화 / 활력',
    description: '결합조직 형성 및 유해산소로부터 세포 보호',
    defaultTiming: '식사 중 또는 식사 직후 (공복 시 속쓰림)',
  },
  {
    id: 'supp_milk_thistle',
    name: '밀크씨슬 (실리마린)',
    code: 'milk_thistle',
    category: '간 건강 / 피로 회복',
    description: '간 세포 보호 및 피로 개선에 도움',
    defaultTiming: '점심 또는 저녁 식후',
  },
  {
    id: 'supp_coq10',
    name: '코엔자임Q10 (CoQ10)',
    code: 'coq10',
    category: '항산화 / 높은 혈압 감소',
    description: '세포 에너지 생성 및 항산화, 혈압 조절',
    defaultTiming: '아침 식사 직후',
  },
  {
    id: 'supp_ginkgo',
    name: '은행잎추출물',
    code: 'ginkgo',
    category: '기억력 / 혈행 개선',
    description: '말초혈관 확장 및 혈류 개선',
    defaultTiming: '아침 식후',
  },
  {
    id: 'supp_red_ginseng',
    name: '홍삼 / 인삼',
    code: 'red_ginseng',
    category: '면역력 증진 / 피로 개선',
    description: '면역력 증진, 피로 개선, 혈소판 응집억제',
    defaultTiming: '공복 또는 식간',
  },
];

// -------------------------------------------------------------
// 핵심 임상 상호작용 분석 엔진
// -------------------------------------------------------------
export function analyzeInteractions(
  medicines: MedicineItem[],
  supplements: SupplementItem[]
): {
  interactions: AnalysisResult[];
  duplications: DrugDuplicationWarning[];
  summary: {
    dangerCount: number;
    warningCount: number;
    synergyCount: number;
    isSafe: boolean;
  };
} {
  const interactions: AnalysisResult[] = [];
  const duplications: DrugDuplicationWarning[] = [];

  // 1. 의약품 간 중복 검사 (예: 타이레놀 중복, 소염진통제 중복)
  const nsaids = medicines.filter((m) => m.category === 'nsaid');
  if (nsaids.length > 1) {
    duplications.push({
      severity: 'danger',
      title: '소염진통제(NSAIDs) 계열 중복 처방 주의',
      drugs: nsaids.map((m) => m.name),
      reason:
        '동일한 소염진통제 계열 약물이 2종류 이상 중복되었습니다. 위장관 출혈 및 궤양 위험이 급증할 수 있습니다.',
      actionAdvice:
        '서로 다른 병원에서 처방받으셨다면, 두 병원 중 한 곳에 전화하여 중복 복용 여부를 반드시 확인하세요.',
    });
  }

  const acetaminophens = medicines.filter((m) => m.category === 'acetaminophen');
  if (acetaminophens.length > 1) {
    duplications.push({
      severity: 'danger',
      title: '아세트아미노펜(해열진통) 성분 중복 주의',
      drugs: acetaminophens.map((m) => m.name),
      reason:
        '아세트아미노펜 성분은 일일 최대 4,000mg을 초과할 경우 급성 간 손상 위험이 매우 높습니다.',
      actionAdvice:
        '감기약과 진통제에 같은 성분이 들어있을 수 있으므로 용량을 철저히 합산하여 복용해야 합니다.',
    });
  }

  // 2. 의약품과 영양제 간 교차 상호작용 검사
  for (const med of medicines) {
    for (const supp of supplements) {
      // Rule 1: 소염진통제/항혈전제 + 오메가3/은행잎/홍삼 (출혈 경향 증가)
      if (
        (med.category === 'nsaid' || med.category === 'antithrombotic') &&
        (supp.code === 'omega3' || supp.code === 'ginkgo' || supp.code === 'red_ginseng')
      ) {
        interactions.push({
          severity: 'danger',
          title: '출혈 경향 증가 및 지혈 지연 위험',
          involvedMedicine: med.name,
          involvedSupplement: supp.name,
          mechanism: `${med.name}과 ${supp.name} 모두 혈소판 응집을 억제하여 지혈을 방해합니다. 함께 복용 시 멍이 잘 들거나 코피, 위장관 출혈 위험이 상승합니다.`,
          actionAdvice:
            '수술, 내시경, 발치 등 출혈이 예상되는 시술 1~2주 전에는 영양제 섭취를 중단하고, 평소 멍이 쉽게 든다면 주치의와 상담하세요.',
          referenceSource: '식약처 DUR 및 건기식 안전사용 매뉴얼',
        });
      }

      // Rule 2: 항생제 + 미네랄(철분/칼슘/마그네슘) (킬레이트 결합으로 약효 무력화)
      if (
        med.category === 'antibiotic' &&
        (supp.code === 'iron' || supp.code === 'calcium' || supp.code === 'magnesium')
      ) {
        interactions.push({
          severity: 'danger',
          title: '항생제 흡수 방해로 약효 급감',
          involvedMedicine: med.name,
          involvedSupplement: supp.name,
          mechanism: `항생제 성분이 ${supp.name}의 2가/3가 양이온 금속과 킬레이트 복합체를 형성하여 체내 흡수되지 않고 그대로 배출됩니다.`,
          actionAdvice:
            '항생제 복용 전후 최소 2시간(권장 3~4시간)의 시간 간격을 두고 영양제를 복용해야 약효가 유지됩니다.',
          referenceSource: '식약처 DUR 상호작용 공인 가이드',
        });
      }

      // Rule 3: 갑상선약(신지로이드) + 칼슘/철분 (흡수 억제)
      if (
        med.category === 'thyroid' &&
        (supp.code === 'calcium' || supp.code === 'iron')
      ) {
        interactions.push({
          severity: 'danger',
          title: '갑상선 호르몬제 흡수 방해',
          involvedMedicine: med.name,
          involvedSupplement: supp.name,
          mechanism: `${supp.name} 성분이 갑상선호르몬제(레보티록신)와 결합하여 혈중 호르몬 농도를 떨어뜨립니다.`,
          actionAdvice:
            '신지로이드는 아침 공복에 복용하고, 칼슘/철분 영양제는 최소 4시간 이상 간격을 두고 오후나 저녁에 드세요.',
          referenceSource: '식약처 의약품 안전사용기준',
        });
      }

      // Rule 4: 제산제/위장약 + 철분 (철분 흡수 저하)
      if (med.category === 'antacid' && supp.code === 'iron') {
        interactions.push({
          severity: 'warning',
          title: '철분제 흡수율 저하',
          involvedMedicine: med.name,
          involvedSupplement: supp.name,
          mechanism: '제산제가 위산도를 낮추어 산성 환경에서 흡수되는 철분의 흡수율을 크게 떨어뜨립니다.',
          actionAdvice: '제산제 복용 2시간 전 또는 2시간 후에 철분제를 복용하세요.',
          referenceSource: '식품의약품안전처 DUR 가이드',
        });
      }

      // Rule 5: 항생제 + 유산균 (유익균 사멸)
      if (med.category === 'antibiotic' && supp.code === 'probiotics') {
        interactions.push({
          severity: 'warning',
          title: '유산균 유익균 사멸 (시간차 복용 필요)',
          involvedMedicine: med.name,
          involvedSupplement: supp.name,
          mechanism: '항생제의 강력한 살균 작용으로 유산균 속 유익균이 대부분 사멸되어 효과를 보지 못합니다.',
          actionAdvice:
            '항생제를 복용한 지 최소 2~3시간이 지난 후 유산균을 섭취하시면 장내 유익균 보충에 큰 도움이 됩니다.',
          referenceSource: '임상 복약지도 가이드',
        });
      }

      // Rule 6: 혈압약(ACEI/ARB) + 고용량 마그네슘/칼륨 (전해질 주의)
      if (med.category === 'blood_pressure' && supp.code === 'magnesium') {
        interactions.push({
          severity: 'warning',
          title: '혈압 과다 강하 및 전해질 모니터링',
          involvedMedicine: med.name,
          involvedSupplement: supp.name,
          mechanism: '혈압약과 마그네슘이 동시에 혈관을 이완시켜 일시적인 어지럼증이나 저혈압 증상이 나타날 수 있습니다.',
          actionAdvice:
            '마그네슘은 일일 권장량을 넘기지 않도록 하고, 기립 시 어지럼증이 느껴진다면 섭취량을 조절하세요.',
          referenceSource: '식약처 영양학적 상호작용',
        });
      }

      // Rule 7: 고지혈증약(스타틴) + 코엔자임Q10 (★ 시너지 조합)
      if (med.category === 'statin' && supp.code === 'coq10') {
        interactions.push({
          severity: 'synergy',
          title: '★ 권장 시너지: 스타틴으로 고갈되는 CoQ10 보충',
          involvedMedicine: med.name,
          involvedSupplement: supp.name,
          mechanism: '스타틴 계열 약물은 콜레스테롤 합성뿐 아니라 체내 코엔자임Q10 합성 경로도 차단하여 근육통이나 피로감을 유발할 수 있습니다.',
          actionAdvice:
            '스타틴 복용자에게 코엔자임Q10 보충은 근육 피로를 경감시키는 데 매우 유익한 권장 조합입니다.',
          referenceSource: '한국약학회 및 임상영양 가이드',
        });
      }

      // Rule 8: 비타민D + 칼슘 / 마그네슘 (★ 시너지 조합)
      if (supp.code === 'vitamin_d') {
        const hasCalcium = supplements.some((s) => s.code === 'calcium');
        const hasMagnesium = supplements.some((s) => s.code === 'magnesium');
        if (hasCalcium || hasMagnesium) {
          // Add synergy only once
          const alreadyAdded = interactions.some(
            (i) => i.title.includes('칼슘 흡수 촉진')
          );
          if (!alreadyAdded) {
            interactions.push({
              severity: 'synergy',
              title: '★ 권장 시너지: 비타민D와 미네랄의 상호 흡수 촉진',
              involvedMedicine: '영양제 조합',
              involvedSupplement: '비타민D + 칼슘/마그네슘',
              mechanism: '비타민D는 장에서 칼슘의 흡수를 적극 돕고, 마그네슘은 비타민D가 활성형으로 전환되는 효소를 활성화합니다.',
              actionAdvice: '뼈 건강과 신경 안정에 이상적인 상호보완적 조합입니다.',
              referenceSource: '영양학회 가이드',
            });
          }
        }
      }
    }
  }

  // 통계 계산
  const dangerCount =
    interactions.filter((i) => i.severity === 'danger').length +
    duplications.length;
  const warningCount = interactions.filter((i) => i.severity === 'warning').length;
  const synergyCount = interactions.filter((i) => i.severity === 'synergy').length;
  const isSafe = dangerCount === 0 && warningCount === 0;

  return {
    interactions,
    duplications,
    summary: {
      dangerCount,
      warningCount,
      synergyCount,
      isSafe,
    },
  };
}
