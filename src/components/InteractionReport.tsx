import React from 'react';
import {
  Clock,
  ShieldCheck,
  FileText,
  ChevronRight,
} from 'lucide-react';
import {
  AnalysisResult,
  DrugDuplicationWarning,
  MedicineItem,
  SupplementItem,
} from '../lib/durEngine';

interface InteractionReportProps {
  medicines: MedicineItem[];
  supplements: SupplementItem[];
  interactions: AnalysisResult[];
  duplications: DrugDuplicationWarning[];
  summary: {
    dangerCount: number;
    warningCount: number;
    synergyCount: number;
    isSafe: boolean;
  };
  onOpenDoctorCard: () => void;
}

export const InteractionReport: React.FC<InteractionReportProps> = ({
  medicines,
  supplements,
  interactions,
  duplications,
  summary,
  onOpenDoctorCard,
}) => {
  const hasItems = medicines.length > 0 || supplements.length > 0;

  if (!hasItems) {
    return (
      <section className="bg-white border border-slate-200/90 rounded-3xl p-5 text-center shadow-xs">
        <p className="text-xs text-slate-400 font-medium">
          처방약이나 영양제를 선택하시면 실시간 충돌 및 궁합 분석 결과가 나타납니다.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3.5">
      {/* 1. Summary Status Banner */}
      {summary.dangerCount > 0 ? (
        <div className="p-4 bg-red-50 border-2 border-red-300 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-xs">
              !
            </span>
            <h3 className="text-sm font-extrabold text-red-950">
              주의가 필요한 충돌 또는 중복 {summary.dangerCount}건 발견
            </h3>
          </div>
          <p className="text-xs text-red-800 leading-relaxed break-keep mt-1">
            출혈 위험 증가, 약물 흡수 차단 또는 성분 중복이 감지되었습니다. 아래 세부 권고사항을 확인하시고 복용 전 주치의와 상의하세요.
          </p>
        </div>
      ) : summary.warningCount > 0 ? (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-extrabold text-amber-950">
              복용 시간 간격 조절 필요 {summary.warningCount}건
            </h3>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed break-keep mt-1">
            약효가 떨어지지 않도록 2~3시간의 시간 차이를 두고 복용하는 것을 권장합니다.
          </p>
        </div>
      ) : (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-extrabold text-emerald-950">
              현재 등록된 조합에서 알려진 충돌이 없습니다
            </h3>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed break-keep mt-1">
            식약처 DUR 공인 기준상 병용 금기나 심각한 상호작용이 감지되지 않았습니다. 권장 용법에 맞춰 안심하고 드셔도 좋습니다.
          </p>
        </div>
      )}

      {/* 2. Doctor Consultation CTA Button */}
      <button
        type="button"
        onClick={onOpenDoctorCard}
        className="w-full p-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-between shadow-md active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <p className="text-xs font-extrabold leading-tight">
              의사 / 약사용 10초 상담 카드 열기
            </p>
            <p className="text-[10px] text-blue-100 mt-0.5">
              병원이나 약국 방문 시 화면 그대로 보여주세요
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-blue-200" />
      </button>

      {/* 3. Drug Duplications List */}
      {duplications.map((dup, idx) => (
        <div
          key={`dup_${idx}`}
          className="p-4 bg-white border-2 border-red-200 rounded-3xl shadow-xs space-y-2 animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black tracking-wide">
              성분 중복 위험
            </span>
            <h4 className="text-xs font-bold text-slate-900">{dup.title}</h4>
          </div>

          <div className="flex flex-wrap gap-1">
            {dup.drugs.map((d) => (
              <span
                key={d}
                className="text-[11px] font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-lg"
              >
                {d}
              </span>
            ))}
          </div>

          <p className="text-xs text-slate-700 leading-relaxed break-keep">
            {dup.reason}
          </p>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-800 font-medium">
            💡 <strong>행동 가이드</strong>: {dup.actionAdvice}
          </div>
        </div>
      ))}

      {/* 4. Drug-Supplement Interactions List */}
      {interactions.map((item, idx) => {
        const isDanger = item.severity === 'danger';
        const isWarning = item.severity === 'warning';

        return (
          <div
            key={`inter_${idx}`}
            className={`p-4 bg-white rounded-3xl shadow-xs space-y-2 border transition-all animate-fade-in ${
              isDanger
                ? 'border-red-200'
                : isWarning
                ? 'border-amber-200'
                : 'border-emerald-200 bg-emerald-50/20'
            }`}
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                    isDanger
                      ? 'bg-red-100 text-red-700'
                      : isWarning
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isDanger ? '주의 · 충돌' : isWarning ? '복용 간격 조절' : '시너지 궁합'}
                </span>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {item.title}
                </h4>
              </div>
            </div>

            {/* Target Pair Pill */}
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-lg border border-slate-200 truncate max-w-[150px]">
                {item.involvedMedicine}
              </span>
              <span className="text-slate-400 font-normal">+</span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-lg border border-slate-200 truncate max-w-[150px]">
                {item.involvedSupplement}
              </span>
            </div>

            {/* Mechanism text */}
            <p className="text-xs text-slate-700 leading-relaxed break-keep">
              {item.mechanism}
            </p>

            {/* Practical Advice Box */}
            <div
              className={`p-2.5 rounded-xl text-[11px] leading-relaxed break-keep font-medium border ${
                isDanger
                  ? 'bg-red-50/70 border-red-200 text-red-900'
                  : isWarning
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              💡 <strong>권장 수칙</strong>: {item.actionAdvice}
            </div>

            {/* K-FDA source tag */}
            <p className="text-[9.5px] text-slate-400 text-right">
              출처: {item.referenceSource}
            </p>
          </div>
        );
      })}
    </section>
  );
};
