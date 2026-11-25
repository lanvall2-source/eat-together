import React from 'react';
import { ShieldAlert, X, CheckCircle } from 'lucide-react';

interface MedicalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalDisclaimerModal: React.FC<MedicalDisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                의료법 제27조 안내 및 면책 조항
              </h3>
              <p className="text-[10px] text-slate-500">
                식약처 DUR 공공데이터 기반 정보 제공
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 text-xs leading-relaxed text-slate-700 pr-1">
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl">
            <p className="font-semibold text-blue-900 text-[11px] flex items-center gap-1 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
              공식 공공데이터 준수 안내
            </p>
            <p className="text-[10.5px] text-blue-800 leading-normal">
              본 서비스의 약물 및 영양제 상호작용 규칙은 **식품의약품안전처(MFDS) 의약품안전사용서비스(DUR)** 및 **한국약학회·임상영양 가이드라인**의 공인 자료를 토대로 제공됩니다.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <p className="font-bold text-slate-900">【필수 유의 사항】</p>
            <p>
              1. <strong>진단·처방 대체 불가</strong>: 본 서비스의 결과는 특정 질환의 진단이나 처방 변경 지시가 아니며, 주치의 또는 약사의 전문적 임상 판단을 대체하지 않습니다.
            </p>
            <p>
              2. <strong>임의 중단 금지</strong>: 처방받으신 전문의약품의 복용을 임의로 중단하거나 용량을 변경하지 마시고, 반드시 담당 의사와 먼저 상의하십시오.
            </p>
            <p>
              3. <strong>개인별 특이성</strong>: 환자의 간/신장 기능, 기저 질환, 임신 여부 등에 따라 약물 반응이 상이할 수 있습니다.
            </p>
          </div>

          <div className="p-2.5 bg-slate-100/70 rounded-xl text-[10px] text-slate-500">
            * 본 서비스는 사용자의 의료 데이터를 서버에 전송하거나 저장하지 않으며, 단말기 내부(localStorage)에서 안전하게 처리됩니다.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            확인 및 이해했습니다
          </button>
        </div>
      </div>
    </div>
  );
};
