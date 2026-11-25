import React, { useState } from 'react';
import { Pill, Plus, X, Search, Check } from 'lucide-react';
import { MedicineItem, PRESET_MEDICINES } from '../lib/durEngine';

interface MedicineSelectorProps {
  selectedMedicines: MedicineItem[];
  onAddMedicine: (item: MedicineItem) => void;
  onRemoveMedicine: (id: string) => void;
}

export const MedicineSelector: React.FC<MedicineSelectorProps> = ({
  selectedMedicines,
  onAddMedicine,
  onRemoveMedicine,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  // Filter presets based on search
  const filteredPresets = PRESET_MEDICINES.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.hospitalDept && m.hospitalDept.includes(searchQuery))
  );

  return (
    <section className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <Pill className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 truncate">
            1. 복용 중인 처방약 / 일반약
          </h2>
        </div>
        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
          {selectedMedicines.length}개 선택됨
        </span>
      </div>

      {/* Selected Medicine Chips */}
      {selectedMedicines.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {selectedMedicines.map((med) => (
            <div
              key={med.id}
              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold shadow-2xs"
            >
              {med.hospitalDept && (
                <span className="text-[10px] text-blue-600 font-bold">
                  [{med.hospitalDept.split('/')[0].trim()}]
                </span>
              )}
              <span className="truncate max-w-[170px]">{med.name}</span>
              <button
                type="button"
                onClick={() => onRemoveMedicine(med.id)}
                className="p-0.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-200/60"
                title="삭제"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center mb-3">
          <p className="text-xs text-slate-500 font-medium">
            현재 등록된 처방약이 없습니다. 아래에서 처방받으신 약을 추가해 보세요.
          </p>
        </div>
      )}

      {/* Toggle Quick Presets Drawer */}
      {!showPicker ? (
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>자주 처방되는 약 추가하기</span>
        </button>
      ) : (
        <div className="mt-2 pt-3 border-t border-slate-100 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700">
              병원 진료과별 대표 처방약 선택
            </span>
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              접기
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="약 이름 또는 진료과 검색 (예: 소염제, 타이레놀, 내과)"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          {/* Preset Buttons Grid */}
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 pt-1">
            {filteredPresets.map((med) => {
              const isSelected = selectedMedicines.some((m) => m.id === med.id);
              return (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      onRemoveMedicine(med.id);
                    } else {
                      onAddMedicine(med);
                    }
                  }}
                  className={`w-full p-2 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold truncate">{med.name}</span>
                      {med.hospitalDept && (
                        <span className="text-[10px] text-slate-400 shrink-0">
                          ({med.hospitalDept})
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {med.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center">
                        <Plus className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
