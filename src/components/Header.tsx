import React from 'react';
import { ShieldCheck, Info, Pill } from 'lucide-react';

interface HeaderProps {
  onOpenDisclaimer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDisclaimer }) => {
  return (
    <header className="safe-top px-4 pt-3.5 pb-2.5 bg-white/95 backdrop-blur-md border-b border-med-border sticky top-0 z-30 flex items-center justify-between gap-2 shadow-2xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Pill className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-extrabold text-med-text tracking-tight truncate">
              잇투게더
            </h1>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200 shrink-0">
              안전 섭취 가이드
            </span>
          </div>
          <p className="text-[10px] text-med-text-muted truncate mt-0.5">
            영양제 & 비타민 성분 조합 비서
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenDisclaimer}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-med-text-secondary bg-slate-100 hover:bg-slate-200 transition-colors shrink-0 border border-slate-200"
        title="의료법 제27조 안내 및 출처"
      >
        <ShieldCheck className="w-3 h-3 text-emerald-600" />
        <span>면책 고지</span>
        <Info className="w-2.5 h-2.5 text-slate-400" />
      </button>
    </header>
  );
};
