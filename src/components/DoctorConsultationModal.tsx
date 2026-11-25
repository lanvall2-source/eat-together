import React, { useState } from 'react';
import { Stethoscope, X, Copy, Check, AlertTriangle } from 'lucide-react';
import {
  MedicineItem,
  SupplementItem,
  AnalysisResult,
  DrugDuplicationWarning,
} from '../lib/durEngine';

interface DoctorConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicines: MedicineItem[];
  supplements: SupplementItem[];
  interactions: AnalysisResult[];
  duplications: DrugDuplicationWarning[];
}

export const DoctorConsultationModal: React.FC<DoctorConsultationModalProps> = ({
  isOpen,
  onClose,
  medicines,
  supplements,
  interactions,
  duplications,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const medText = medicines.map((m) => `- ${m.name}`).join('\n');
    const suppText = supplements.map((s) => `- ${s.name}`).join('\n');
    const alertText = [
      ...duplications.map((d) => `[중복 주의] ${d.title}`),
      ...interactions.map((i) => `[${i.severity === 'danger' ? '주의' : '참고'}] ${i.title}`),
    ].join('\n');

    const fullSummary =
      `[복약 상담용 목록]\n` +
      `■ 처방/일반약 (${medicines.length}종):\n${medText || '- 없음'}\n\n` +
      `■ 영양제/건기식 (${supplements.length}종):\n${suppText || '- 없음'}\n\n` +
      `■ 확인 포인트:\n${alertText || '- 특이사항 없음'}\n\n` +
      `(출처: 잇투게더 / 식약처 안전 섭취 가이드)`;

    navigator.clipboard.writeText(fullSummary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                의사·약사용 10초 상담 카드
              </h3>
              <p className="text-[10px] text-blue-600 font-semibold">
                진료실에서 화면을 그대로 보여주세요
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prescription Card Style Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1 text-xs">
          {/* Greeting Box */}
          <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100">
            <p className="font-extrabold text-blue-900 text-xs">
              “선생님, 제가 복용 중인 약물 및 영양제 목록입니다.”
            </p>
            <p className="text-[10.5px] text-blue-800 mt-1">
              새로운 약 처방 또는 치료 계획 시 참고 부탁드립니다.
            </p>
          </div>

          {/* Section 1: Medicines */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <span>💊 처방 및 복용 약물</span>
              <span className="text-slate-400 font-normal">({medicines.length}종)</span>
            </h4>
            {medicines.length > 0 ? (
              <div className="space-y-1">
                {medicines.map((m) => (
                  <div
                    key={m.id}
                    className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-800">{m.name}</span>
                    <span className="text-[10px] text-slate-400">{m.hospitalDept}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 p-2 bg-slate-50 rounded-xl">
                등록된 약물 없음
              </p>
            )}
          </div>

          {/* Section 2: Supplements */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <span>🌿 정기 복용 영양제 / 건기식</span>
              <span className="text-slate-400 font-normal">({supplements.length}종)</span>
            </h4>
            {supplements.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {supplements.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-1 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200 font-semibold text-[11px]"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 p-2 bg-slate-50 rounded-xl">
                등록된 영양제 없음
              </p>
            )}
          </div>

          {/* Section 3: Points for Doctor to Review */}
          {(interactions.length > 0 || duplications.length > 0) && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
              <h4 className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>주치의 상담 요망 포인트</span>
              </h4>
              <ul className="space-y-1 text-[10.5px] text-amber-900 leading-normal list-disc list-inside">
                {duplications.map((d, i) => (
                  <li key={`d_${i}`}>
                    <strong>성분 중복</strong>: {d.title}
                  </li>
                ))}
                {interactions.map((item, i) => (
                  <li key={`i_${i}`}>
                    <strong>{item.title}</strong> ({item.involvedMedicine} + {item.involvedSupplement})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-[9.5px] text-slate-400 text-center">
            * 의료법 제27조 준수: 본 카드는 의학적 진단/처방권자의 상담을 돕기 위한 환자용 편의 자료입니다.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>텍스트 복사</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
