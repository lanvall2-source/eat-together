import { describe, it, expect } from 'vitest';
import {
  analyzeInteractions,
  MedicineItem,
  SupplementItem,
  PRESET_MEDICINES,
  PRESET_SUPPLEMENTS,
} from './durEngine';

describe('K-FDA DUR & Supplement Interaction Engine', () => {
  it('detects Bleeding risk when NSAID and Omega-3 are co-administered', () => {
    const meds: MedicineItem[] = [PRESET_MEDICINES[0]]; // 록소프로펜정 (NSAID)
    const supps: SupplementItem[] = [PRESET_SUPPLEMENTS[0]]; // 오메가3

    const result = analyzeInteractions(meds, supps);
    expect(result.summary.dangerCount).toBeGreaterThanOrEqual(1);
    expect(result.summary.isSafe).toBe(false);
    expect(result.interactions.some((i) => i.title.includes('출혈 경향 증가'))).toBe(true);
  });

  it('detects Chelation Absorption Block when Antibiotic and Calcium/Iron are co-administered', () => {
    const meds: MedicineItem[] = [PRESET_MEDICINES[5]]; // 시프로플록사신 (항생제)
    const supps: SupplementItem[] = [PRESET_SUPPLEMENTS[5]]; // 칼슘

    const result = analyzeInteractions(meds, supps);
    expect(result.summary.dangerCount).toBeGreaterThanOrEqual(1);
    expect(result.interactions.some((i) => i.title.includes('항생제 흡수 방해'))).toBe(true);
    expect(result.interactions[0].actionAdvice).toContain('2시간');
  });

  it('detects Time-interval warning when Antibiotic and Probiotics are co-administered', () => {
    const meds: MedicineItem[] = [PRESET_MEDICINES[5]]; // 시프로플록사신 (항생제)
    const supps: SupplementItem[] = [PRESET_SUPPLEMENTS[2]]; // 유산균

    const result = analyzeInteractions(meds, supps);
    expect(result.summary.warningCount).toBeGreaterThanOrEqual(1);
    expect(result.interactions.some((i) => i.title.includes('유산균 유익균 사멸'))).toBe(true);
  });

  it('detects Recommended Synergy between Statin and Coenzyme Q10', () => {
    const meds: MedicineItem[] = [PRESET_MEDICINES[4]]; // 아토르바스타틴
    const supps: SupplementItem[] = [PRESET_SUPPLEMENTS[9]]; // 코엔자임Q10

    const result = analyzeInteractions(meds, supps);
    expect(result.summary.synergyCount).toBeGreaterThanOrEqual(1);
    expect(result.interactions.some((i) => i.title.includes('고갈되는 CoQ10 보충'))).toBe(true);
  });

  it('detects Drug Duplication Warning for 2 or more NSAIDs', () => {
    const meds: MedicineItem[] = [
      PRESET_MEDICINES[0], // 록소프로펜
      PRESET_MEDICINES[1], // 이부프로펜
    ];
    const supps: SupplementItem[] = [];

    const result = analyzeInteractions(meds, supps);
    expect(result.duplications.length).toBe(1);
    expect(result.duplications[0].title).toContain('소염진통제(NSAIDs) 계열 중복');
    expect(result.summary.dangerCount).toBeGreaterThanOrEqual(1);
  });

  it('reports isSafe=true when no clinical interactions or duplications exist', () => {
    const meds: MedicineItem[] = [PRESET_MEDICINES[2]]; // 타이레놀 단독
    const supps: SupplementItem[] = [PRESET_SUPPLEMENTS[2]]; // 유산균

    const result = analyzeInteractions(meds, supps);
    expect(result.summary.dangerCount).toBe(0);
    expect(result.summary.warningCount).toBe(0);
    expect(result.summary.isSafe).toBe(true);
  });
});
