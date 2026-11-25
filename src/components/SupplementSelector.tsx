import React from 'react';
import { Apple, Check, Plus } from 'lucide-react';
import { SupplementItem, PRESET_SUPPLEMENTS } from '../lib/durEngine';

interface SupplementSelectorProps {
  selectedSupplements: SupplementItem[];
  onToggleSupplement: (item: SupplementItem) => void;
}

export const SupplementSelector: React.FC<SupplementSelectorProps> = ({
  selectedSupplements,
  onToggleSupplement,
}) => {
  return (
    <section className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Apple className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 truncate">
            2. 함께 드시는 영양제 / 건기식
          </h2>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
          {selectedSupplements.length}개 선택됨
        </span>
      </div>

      <p className="text-[11px] text-slate-500 mb-2.5">
        매일 또는 자주 챙겨 드시는 영양제를 탭하여 선택해 주세요.
      </p>

      {/* Pill Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {PRESET_SUPPLEMENTS.map((supp) => {
          const isSelected = selectedSupplements.some((s) => s.id === supp.id);
          return (
            <button
              key={supp.id}
              type="button"
              onClick={() => onToggleSupplement(supp)}
              className={`p-2.5 rounded-2xl text-left transition-all border flex flex-col justify-between active:scale-[0.98] ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs ring-1 ring-emerald-400'
                  : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full mb-1">
                <span className="text-xs font-bold truncate">{supp.name}</span>
                {isSelected ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center shrink-0">
                    <Plus className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <span className="text-[9.5px] text-slate-500 truncate">
                {supp.category}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
