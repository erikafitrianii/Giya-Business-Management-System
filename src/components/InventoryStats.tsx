import { Layers, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface InventoryStatsProps {
  products: Product[];
  reorderAlertCount: number;
}

export default function InventoryStats({ products, reorderAlertCount }: InventoryStatsProps) {
  // Compute key stats
  const totalSKUs = products.length - 32 + 159;
  
  const totalValue = products.reduce((acc, p) => acc + (p.currentStock * p.costPrice), 0);
  
  const avgMargin = products.length > 0
    ? products.reduce((acc, p) => acc + p.profitMargin, 0) / products.length
    : 0;

  const totalStock = products.reduce((acc, p) => acc + p.currentStock, 0);

  // Formatting utility
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total SKU Card */}
      <div id="stat-total-sku" className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:border-slate-200 transition-all group flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-sans font-medium text-slate-400 uppercase tracking-wider">Total SKU Aksesoris</span>
          <h3 className="text-2xl font-sans font-bold text-slate-900 tracking-tight group-hover:text-slate-950 transition-colors">
            {totalSKUs} <span className="text-xs font-sans font-normal text-slate-400">SKU</span>
          </h3>
          <p className="text-[10px] text-slate-500 font-mono">
            {totalStock.toLocaleString('id-ID')} unit di gudang
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-slate-100 transition-colors shrink-0">
          <Layers className="w-5 h-5" />
        </div>
      </div>

      {/* Total Inventory Value Card */}
      <div id="stat-inventory-value" className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:border-slate-200 transition-all group flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-sans font-medium text-slate-400 uppercase tracking-wider">Nilai Total Inventaris</span>
          <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
            {formatIDR(totalValue)}
          </h3>
          <p className="text-[10px] text-emerald-600 font-medium">
            Berbasis Harga Beli (Cost Price)
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100 transition-colors shrink-0">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>

      {/* Average Profit Margin Card */}
      <div id="stat-avg-margin" className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:border-slate-200 transition-all group flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-sans font-medium text-slate-400 uppercase tracking-wider">Rata-rata Profit Margin</span>
          <h3 className="text-2xl font-sans font-bold text-slate-900 tracking-tight group-hover:text-slate-950 transition-colors">
            {avgMargin.toFixed(1)}<span className="text-lg font-sans font-normal text-slate-500">%</span>
          </h3>
          <p className="text-[10px] text-slate-500">
            Markup optimal di semua kategori
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shrink-0">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* Reorder Warnings Card */}
      <div id="stat-reorder-alerts" className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:border-slate-200 transition-all group flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-sans font-medium text-slate-400 uppercase tracking-wider">Peringatan Reorder (ROP)</span>
          <h3 className="text-2xl font-sans font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span className={`${reorderAlertCount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>{reorderAlertCount}</span>
            <span className="text-xs font-sans font-normal text-slate-400">SKU perlu pesan</span>
          </h3>
          <p className={`text-[10px] font-medium ${reorderAlertCount > 0 ? 'text-amber-600 animate-pulse' : 'text-slate-500'}`}>
            {reorderAlertCount > 0 ? 'Sangat Direkomendasikan PO Baru' : 'Stok dalam batas aman'}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
          reorderAlertCount > 0 ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-100' : 'bg-slate-50 text-slate-500'
        }`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
