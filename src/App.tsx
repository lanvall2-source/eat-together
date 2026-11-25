import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Header,
} from './components/Header';
import { MedicineSelector } from './components/MedicineSelector';
import { SupplementSelector } from './components/SupplementSelector';
import { InteractionReport } from './components/InteractionReport';
import { DoctorConsultationModal } from './components/DoctorConsultationModal';
import { MedicalDisclaimerModal } from './components/MedicalDisclaimerModal';
import {
  MedicineItem,
  SupplementItem,
  analyzeInteractions,
} from './lib/durEngine';
import {
  loadUserPillState,
  saveUserPillState,
  QUICK_SCENARIOS,
  MEDICAL_LEGAL_DISCLAIMER,
} from './lib/pillStore';
import { Sparkles, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  // State for user selected medicines & supplements
  const [medicines, setMedicines] = useState<MedicineItem[]>(() => {
    return loadUserPillState().medicines;
  });

  const [supplements, setSupplements] = useState<SupplementItem[]>(() => {
    return loadUserPillState().supplements;
  });

  // Modals state
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isDoctorCardOpen, setIsDoctorCardOpen] = useState(false);

  // Auto save to localStorage
  useEffect(() => {
    saveUserPillState({ medicines, supplements });
  }, [medicines, supplements]);

  // Real-time DUR & Interaction Analysis
  const analysis = useMemo(() => {
    return analyzeInteractions(medicines, supplements);
  }, [medicines, supplements]);

  // Handlers for medicines
  const handleAddMedicine = useCallback((item: MedicineItem) => {
    setMedicines((prev) => {
      if (prev.some((m) => m.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const handleRemoveMedicine = useCallback((id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // Handlers for supplements
  const handleToggleSupplement = useCallback((item: SupplementItem) => {
    setSupplements((prev) => {
      const exists = prev.some((s) => s.id === item.id);
      if (exists) {
        return prev.filter((s) => s.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  // Quick Scenario Loader
  const handleLoadScenario = useCallback((scenarioId: string) => {
    const sc = QUICK_SCENARIOS.find((s) => s.id === scenarioId);
    if (sc) {
      setMedicines(sc.medicines);
      setSupplements(sc.supplements);
    }
  }, []);

  // Reset
  const handleReset = useCallback(() => {
    setMedicines([]);
    setSupplements([]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-100">
      {/* Top Header */}
      <Header onOpenDisclaimer={() => setIsDisclaimerOpen(true)} />

      {/* Main Content Container */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-3.5 space-y-3.5">
        {/* Quick Testing Scenarios Bar */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              자주 겪는 상황별 1초 시뮬레이션
            </span>
            {(medicines.length > 0 || supplements.length > 0) && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                초기화
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleLoadScenario(sc.id)}
                className="px-2.5 py-1 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-[10.5px] font-bold text-slate-700 hover:text-blue-700 whitespace-nowrap transition-all active:scale-95 shrink-0"
              >
                {sc.title}
              </button>
            ))}
          </div>
        </section>

        {/* Step 1: Prescription Drugs Selector */}
        <MedicineSelector
          selectedMedicines={medicines}
          onAddMedicine={handleAddMedicine}
          onRemoveMedicine={handleRemoveMedicine}
        />

        {/* Step 2: Supplements Selector */}
        <SupplementSelector
          selectedSupplements={supplements}
          onToggleSupplement={handleToggleSupplement}
        />

        {/* Step 3: Real-Time Clinical Analysis Report */}
        <InteractionReport
          medicines={medicines}
          supplements={supplements}
          interactions={analysis.interactions}
          duplications={analysis.duplications}
          summary={analysis.summary}
          onOpenDoctorCard={() => setIsDoctorCardOpen(true)}
        />

        {/* Legal Disclaimer Footer Box */}
        <footer className="pt-2 pb-4 text-center space-y-1.5">
          <p className="text-[10px] text-slate-400 leading-normal px-2 break-keep">
            {MEDICAL_LEGAL_DISCLAIMER.shortNotice}
          </p>
          <button
            type="button"
            onClick={() => setIsDisclaimerOpen(true)}
            className="text-[10px] font-semibold text-blue-600 hover:underline"
          >
            의료법 제27조 준수 및 상세 면책 조항 보기
          </button>
        </footer>
      </main>

      {/* Modals */}
      <MedicalDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <DoctorConsultationModal
        isOpen={isDoctorCardOpen}
        onClose={() => setIsDoctorCardOpen(false)}
        medicines={medicines}
        supplements={supplements}
        interactions={analysis.interactions}
        duplications={analysis.duplications}
      />
    </div>
  );
};
export default App;
