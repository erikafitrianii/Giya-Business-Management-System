import { SlidersHorizontal, Info, RefreshCw } from 'lucide-react';

interface AssumptionControlProps {
  orderingCost: number;
  setOrderingCost: (val: number) => void;
  holdingCostRate: number;
  setHoldingCostRate: (val: number) => void;
  safetyFactorZ: number;
  setSafetyFactorZ: (val: number) => void;
  useDynamicCalculation: boolean;
  setUseDynamicCalculation: (val: boolean) => void;
  onReset: () => void;
}

export default function AssumptionControl({
  orderingCost,
  setOrderingCost,
  holdingCostRate,
  setHoldingCostRate,
  safetyFactorZ,
  setSafetyFactorZ,
  useDynamicCalculation,
  setUseDynamicCalculation,
  onReset
}: AssumptionControlProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-50">
        <h3 className="font-sans font-semibold text-sm text-slate-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          Model Asumsi Kebijakan EOQ & Safety Stock
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          title="Reset ke Asumsi Default Bisnis"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Default
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Ordering Cost */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-slate-500 flex items-center gap-1">
            Ordering Cost per PO (Rp)
            <span className="cursor-help text-slate-400 group relative">
              <Info className="w-3 h-3" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10 leading-relaxed mb-1">
                Biaya pesan per pesanan pembelian (S).
              </span>
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-sans font-medium text-slate-400">Rp</span>
            <input
              type="number"
              value={orderingCost}
              onChange={(e) => setOrderingCost(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 bg-slate-50/20"
            />
          </div>
        </div>

        {/* Holding Cost Rate */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-slate-500 flex items-center gap-1">
            Holding Cost Rate (%/thn)
            <span className="cursor-help text-slate-400 group relative">
              <Info className="w-3 h-3" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10 leading-relaxed mb-1">
                Biaya simpan per unit per tahun dinyatakan dalam % dari harga beli (H).
              </span>
            </span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="1"
              value={holdingCostRate}
              onChange={(e) => setHoldingCostRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 bg-slate-50/20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans font-medium text-slate-400">%</span>
          </div>
        </div>

        {/* Safety Factor Z */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-slate-500 flex items-center gap-1">
            Safety Factor (Z-Score)
            <span className="cursor-help text-slate-400 group relative">
              <Info className="w-3 h-3" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10 leading-relaxed mb-1">
                Faktor pengali pengaman berbasis tingkat layanan. Z=1,65 untuk Service Level ~95%.
              </span>
            </span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={safetyFactorZ}
              onChange={(e) => setSafetyFactorZ(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 bg-slate-50/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
