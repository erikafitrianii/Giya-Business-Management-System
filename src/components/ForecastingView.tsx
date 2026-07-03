import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  RefreshCw,
  ShoppingBag,
  Search,
  Filter,
  TrendingDown,
  LineChart,
  Activity,
  X,
  FileText,
  Check,
  Settings,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Product } from '../types';
import { runProductForecasting, ProductForecastResult, ForecastDataPoint } from '../lib/forecastingEngine';

interface ForecastingViewProps {
  products: Product[];
  orderingCost: number;
  holdingCostRate: number;
  safetyFactorZ: number;
  useDynamicCalculation: boolean;
  onUpdateParams: (params: { orderingCost: number; holdingCostRate: number; safetyFactorZ: number; useDynamicCalculation: boolean }) => void;
  onPlacePOToSupplier?: (productId: string, qty: number) => void;
}

export default function ForecastingView({
  products,
  orderingCost,
  holdingCostRate,
  safetyFactorZ,
  useDynamicCalculation,
  onUpdateParams,
  onPlacePOToSupplier
}: ForecastingViewProps) {

  // Active sub-tab state: 'eoq_rop' or 'demand_forecast'
  const [activeTab, setActiveTab] = useState<'eoq_rop' | 'demand_forecast'>('demand_forecast');

  // Interactive Forecasting Parameters (Alpha & weights)
  const [forecastingAlpha, setForecastingAlpha] = useState<number>(0.3);
  const [weight1, setWeight1] = useState<number>(0.5); // Most recent month (t-1)
  const [weight2, setWeight2] = useState<number>(0.3); // Month t-2
  const [weight3, setWeight3] = useState<number>(0.2); // Month t-3

  // Search and Filter States for forecasting list
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');

  // Selected product for detailed modal analysis
  const [selectedForecastItem, setSelectedForecastItem] = useState<ProductForecastResult | null>(null);
  const [customPOQty, setCustomPOQty] = useState<string>('');
  const [poSubmittedSuccess, setPoSubmittedSuccess] = useState<boolean>(false);

  // Local helper for Indonesian Rupiah
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Local state for interactive sliders of EOQ (will sync back to parent)
  const [localOrderingCost, setLocalOrderingCost] = useState(orderingCost);
  const [localHoldingRate, setLocalHoldingRate] = useState(holdingCostRate);
  const [localZFactor, setLocalZFactor] = useState(safetyFactorZ);
  const [localUseDynamic, setLocalUseDynamic] = useState(useDynamicCalculation);

  const handleApplySimulator = () => {
    onUpdateParams({
      orderingCost: localOrderingCost,
      holdingCostRate: localHoldingRate,
      safetyFactorZ: localZFactor,
      useDynamicCalculation: localUseDynamic
    });
  };

  // Safeguard: Filter out corrupted or blank/zero products to ensure clean calculations
  const validProducts = useMemo(() => {
    return products.filter(p => 
      p.name && 
      p.name.trim() !== '' && 
      p.name !== 'Produk Tanpa Nama' && 
      p.name.toLowerCase() !== 'tidak tersedia' &&
      p.category !== 'Uncategorized'
    );
  }, [products]);

  // Forecast calculations per product for EOQ & ROP Table
  const forecastedItems = useMemo(() => {
    return validProducts.map(p => {
      // Calculate Days to Stockout: Current Stock / Avg Daily Demand
      const daysToStockout = p.avgDailyDemand > 0 
        ? Math.round(p.currentStock / p.avgDailyDemand)
        : 9999;

      // Recommended Order Qty is EOQ
      const recommendedQty = p.eoq || 30;

      // Recommended Order Date is based on Lead Time
      const daysUntilOrder = Math.max(0, daysToStockout - p.leadTime);
      const isUrgent = p.currentStock <= p.reorderPoint || daysToStockout <= p.leadTime;

      // Estimated Order Date string
      const orderDateObj = new Date();
      orderDateObj.setDate(orderDateObj.getDate() + daysUntilOrder);
      const formattedOrderDate = orderDateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

      return {
        ...p,
        daysToStockout,
        recommendedQty,
        daysUntilOrder,
        formattedOrderDate,
        isUrgent
      };
    });
  }, [validProducts]);

  // Dynamic next-month forecasts for all valid products using the custom model params
  const fullForecastResults = useMemo(() => {
    return validProducts.map(p => 
      runProductForecasting(p, forecastingAlpha, weight1, weight2, weight3)
    );
  }, [validProducts, forecastingAlpha, weight1, weight2, weight3]);

  // List of distinct categories for filtering
  const categories = useMemo(() => {
    const list = new Set(validProducts.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, [validProducts]);

  // Filtering for Next Month Forecasting list
  const filteredForecasts = useMemo(() => {
    return fullForecastResults.filter(item => {
      const matchSearch = item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = categoryFilter === 'All' || item.product.category === categoryFilter;
      const matchMethod = methodFilter === 'All' || item.bestMethodKey === methodFilter;
      return matchSearch && matchCategory && matchMethod;
    });
  }, [fullForecastResults, searchQuery, categoryFilter, methodFilter]);

  // Forecast summaries (EOQ)
  const urgentCount = useMemo(() => {
    return forecastedItems.filter(item => item.isUrgent).length;
  }, [forecastedItems]);

  const healthyCount = Math.max(0, forecastedItems.length - urgentCount);

  // Next-Month Demand Forecasting Summary stats
  const totalRecommendedPOQty = useMemo(() => {
    return filteredForecasts.reduce((sum, item) => sum + item.recommendedPOQty, 0);
  }, [filteredForecasts]);

  const averageAccuracy = useMemo(() => {
    if (filteredForecasts.length === 0) return 100;
    const avgMAPE = filteredForecasts.reduce((sum, item) => sum + item.bestMethodMAPE, 0) / filteredForecasts.length;
    return Math.max(0, Math.min(100, 100 - avgMAPE));
  }, [filteredForecasts]);

  const totalForecastedDemand = useMemo(() => {
    return filteredForecasts.reduce((sum, item) => sum + item.bestMethodForecast, 0);
  }, [filteredForecasts]);

  const dominantMethod = useMemo(() => {
    if (filteredForecasts.length === 0) return 'Tidak Ada';
    const counts = { MA: 0, WMA: 0, SES: 0 };
    filteredForecasts.forEach(item => {
      counts[item.bestMethodKey]++;
    });
    if (counts.SES >= counts.MA && counts.SES >= counts.WMA) {
      return 'Exp. Smoothing (SES)';
    } else if (counts.WMA >= counts.MA) {
      return 'Weighted Moving Average';
    } else {
      return 'Moving Average (3-Mo)';
    }
  }, [filteredForecasts]);

  // Reset PO submission states when closing modal
  const handleCloseDetailModal = () => {
    setSelectedForecastItem(null);
    setCustomPOQty('');
    setPoSubmittedSuccess(false);
  };

  const handleOpenDetailModal = (item: ProductForecastResult) => {
    setSelectedForecastItem(item);
    setCustomPOQty(item.recommendedPOQty.toString());
    setPoSubmittedSuccess(false);
  };

  const handleSendPO = () => {
    if (!selectedForecastItem || !onPlacePOToSupplier) return;
    const qty = parseInt(customPOQty, 10);
    if (isNaN(qty) || qty <= 0) return;

    onPlacePOToSupplier(selectedForecastItem.product.id, qty);
    setPoSubmittedSuccess(true);
    
    // Update local products currentStock temporarily (user expectation)
    setTimeout(() => {
      handleCloseDetailModal();
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-pink-950 font-sans tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-pink-600" />
            <span>AI & Peramalan Stok (Demand Forecasting)</span>
          </h1>
          <p className="text-sm text-pink-700/80 mt-0.5">
            Analisis prediksi peramalan permintaan produk aksesoris Giya berdasarkan laju demand harian, historis penjualan, dan algoritma matematika peramalan terbaik.
          </p>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex border-b border-pink-100 bg-pink-50/10 p-1.5 rounded-2xl gap-2 max-w-2xl">
        <button
          onClick={() => setActiveTab('demand_forecast')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'demand_forecast'
              ? 'bg-white text-pink-700 shadow-sm border border-pink-100/50'
              : 'text-slate-500 hover:text-slate-700 hover:bg-white/45'
          }`}
        >
          <Activity className="w-4 h-4 text-pink-500" />
          <span>Peramalan Permintaan Bulan Depan (Juli 2026)</span>
          <span className="bg-pink-100 text-pink-700 text-[9px] px-1.5 py-0.5 rounded-md font-extrabold ml-1 uppercase">Best Method</span>
        </button>

        <button
          onClick={() => setActiveTab('eoq_rop')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'eoq_rop'
              ? 'bg-white text-pink-700 shadow-sm border border-pink-100/50'
              : 'text-slate-500 hover:text-slate-700 hover:bg-white/45'
          }`}
        >
          <Sliders className="w-4 h-4 text-pink-500" />
          <span>Estimasi Pengadaan (EOQ & ROP)</span>
        </button>
      </div>

      {/* ======================= TAB 1: DEMAND FORECASTING (BEST METHOD) ======================= */}
      {activeTab === 'demand_forecast' && (
        <div className="space-y-6">
          {/* Top Quick Stats for Next Month forecasting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-pink-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Prediksi Permintaan</span>
                <span className="text-xl font-extrabold text-slate-800 font-mono">{totalForecastedDemand} pcs</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Bulan depan (Juli 2026)</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-emerald-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Rata-rata Akurasi Peramalan</span>
                <span className="text-xl font-extrabold text-emerald-600 font-mono">{averageAccuracy.toFixed(1)}%</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Berdasarkan MAPE historis</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-purple-50 rounded-xl">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Metode Dominan Terpilih</span>
                <span className="text-sm font-extrabold text-purple-700 block truncate" title={dominantMethod}>{dominantMethod}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Metode dengan error terendah</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-amber-50 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Rekomendasi Pemesanan Baru</span>
                <span className="text-xl font-extrabold text-amber-600 font-mono">+{totalRecommendedPOQty} pcs</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Untuk mencukupi stok Juli</span>
              </div>
            </div>
          </div>

          {/* Laboratory Parameter Sliders for Global Testing */}
          <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-xs">
            <div className="flex items-center justify-between border-b border-pink-50 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-pink-600" />
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Laboratorium Parameter Peramalan</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Sesuaikan parameter algoritma peramalan untuk meminimalkan error MAPE secara dinamis.</p>
                </div>
              </div>
              <span className="text-[10px] bg-pink-50 text-pink-700 font-bold px-2.5 py-1 rounded-full border border-pink-100">Live Simulation Mode</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Exponential smoothing alpha */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Parameter Smoothing (Alpha α)</span>
                  <span className="text-pink-600 font-mono text-xs">{forecastingAlpha.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.05"
                  value={forecastingAlpha}
                  onChange={(e) => setForecastingAlpha(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <p className="text-[9px] text-slate-400">Semakin tinggi alpha, semakin responsif terhadap penjualan terbaru.</p>
              </div>

              {/* Weight 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Bobot Bulan t-1 (Bulan Terakhir)</span>
                  <span className="text-pink-600 font-mono text-xs">{weight1.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={weight1}
                  onChange={(e) => setWeight1(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Weight 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Bobot Bulan t-2</span>
                  <span className="text-pink-600 font-mono text-xs">{weight2.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={weight2}
                  onChange={(e) => setWeight2(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Weight 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Bobot Bulan t-3</span>
                  <span className="text-pink-600 font-mono text-xs">{weight3.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.5"
                  step="0.05"
                  value={weight3}
                  onChange={(e) => setWeight3(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Forecasting List Table Section */}
          <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
            {/* Search & Filter Header */}
            <div className="p-5 border-b border-pink-50 bg-pink-50/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Daftar Hasil Peramalan & Analisis Akurasi</h3>
                <p className="text-xs text-slate-400 mt-0.5">Klik detail untuk membandingkan grafik simulasi 3 metode dan parameter error MAD/MAPE.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search query */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari nama / SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 w-48 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                  />
                </div>

                {/* Category filter */}
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="text-xs bg-white border border-slate-200 py-1.5 px-2.5 rounded-xl focus:outline-none focus:border-pink-500"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c === 'All' ? 'Semua Kategori' : c}</option>
                    ))}
                  </select>
                </div>

                {/* Best method filter */}
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="text-xs bg-white border border-slate-200 py-1.5 px-2.5 rounded-xl focus:outline-none focus:border-pink-500"
                >
                  <option value="All">Semua Metode Terbaik</option>
                  <option value="MA">Moving Average (MA)</option>
                  <option value="WMA">Weighted MA</option>
                  <option value="SES">Exp. Smoothing (SES)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pink-50/20 text-pink-950/70 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-5 border-b border-pink-50">Produk / Aksesoris</th>
                    <th className="py-3.5 px-5 border-b border-pink-50 text-center">Stok Sekarang</th>
                    <th className="py-3.5 px-5 border-b border-pink-50 text-center">Historis 6 Bulan (Unit)</th>
                    <th className="py-3.5 px-5 border-b border-pink-50 text-center">Metode Terbaik</th>
                    <th className="py-3.5 px-5 border-b border-pink-50 text-center">Akurasi Peramalan</th>
                    <th className="py-3.5 px-5 border-b border-pink-50 text-center">Prediksi Juli 2026</th>
                    <th className="py-3.5 px-5 border-b border-pink-50 text-center">Rekomendasi / Status Stok</th>
                    <th className="py-3.5 px-5 border-b border-pink-50 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 text-sm">
                  {filteredForecasts.map((item) => {
                    const accuracyVal = Math.max(0, Math.min(100, 100 - item.bestMethodMAPE));
                    
                    // Style of accuracy badge
                    let accuracyStyle = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                    if (accuracyVal < 80) {
                      accuracyStyle = 'bg-rose-50 text-rose-700 border-rose-100';
                    } else if (accuracyVal < 90) {
                      accuracyStyle = 'bg-amber-50 text-amber-700 border-amber-100';
                    }

                    // Style of method badge
                    let methodStyle = 'bg-blue-50 text-blue-700 border border-blue-100';
                    if (item.bestMethodKey === 'WMA') {
                      methodStyle = 'bg-purple-50 text-purple-700 border border-purple-100';
                    } else if (item.bestMethodKey === 'SES') {
                      methodStyle = 'bg-pink-50 text-pink-700 border border-pink-100';
                    }

                    // Sparkline SVG generator for row
                    const historyMax = Math.max(...item.history, 10);
                    const historyMin = Math.min(...item.history, 0);
                    const sparkPoints = item.history.map((val, idx) => {
                      const x = 5 + idx * 16;
                      const y = 20 - ((val - historyMin) / (historyMax - historyMin)) * 16;
                      return `${x},${y}`;
                    }).join(' ');

                    return (
                      <tr key={item.product.id} className="hover:bg-pink-50/10 transition-colors">
                        {/* Title Info */}
                        <td className="py-3.5 px-5">
                          <div className="font-semibold text-slate-800 line-clamp-1">{item.product.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {item.product.sku} • <span className="text-pink-600 font-bold">{item.product.category}</span>
                          </div>
                        </td>

                        {/* Current Stock */}
                        <td className="py-3.5 px-5 text-center font-bold text-slate-700">
                          {item.product.currentStock} pcs
                        </td>

                        {/* Historis Sparkline + Tiny Figures */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center justify-center gap-3">
                            {/* Render actual mini SVG Sparkline */}
                            <svg className="w-24 h-6 overflow-visible" strokeWidth="1.5">
                              <polyline
                                fill="none"
                                stroke="#ec4899"
                                strokeWidth="2"
                                points={sparkPoints}
                              />
                              {item.history.map((val, idx) => {
                                const x = 5 + idx * 16;
                                const y = 20 - ((val - historyMin) / (historyMax - historyMin)) * 16;
                                return (
                                  <circle 
                                    key={idx} 
                                    cx={x} 
                                    cy={y} 
                                    r="2.5" 
                                    fill="#f472b6" 
                                    stroke="#db2777" 
                                    strokeWidth="0.5" 
                                  />
                                );
                              })}
                            </svg>
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                              Akhir: {item.history[5]}
                            </span>
                          </div>
                        </td>

                        {/* Best Method Key */}
                        <td className="py-3.5 px-5 text-center">
                          <span className={`${methodStyle} text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase`}>
                            {item.bestMethodKey}
                          </span>
                        </td>

                        {/* Accuracy Percentage */}
                        <td className="py-3.5 px-5 text-center">
                          <span className={`border ${accuracyStyle} text-xs px-2 py-0.5 rounded-lg font-bold font-mono`}>
                            {accuracyVal.toFixed(1)}%
                          </span>
                        </td>

                        {/* July Predicted Value */}
                        <td className="py-3.5 px-5 text-center font-extrabold text-pink-600 font-mono text-base">
                          {item.bestMethodForecast} <span className="text-[10px] font-normal text-slate-400">pcs</span>
                        </td>

                        {/* Stock Recommendation status */}
                        <td className="py-3.5 px-5 text-center">
                          {item.recommendedPOQty > 0 ? (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2.5 py-1 rounded-xl font-bold uppercase inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-500 animate-pulse" />
                              <span>Pesan +{item.recommendedPOQty} pcs</span>
                            </span>
                          ) : item.stockStatus === 'Overstock' ? (
                            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] px-2.5 py-1 rounded-xl font-bold uppercase inline-flex items-center gap-1">
                              <span>Overstock (Stok Melimpah)</span>
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] px-2.5 py-1 rounded-xl font-bold uppercase inline-flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              <span>Stok Aman (Cukup)</span>
                            </span>
                          )}
                        </td>

                        {/* Detail Trigger */}
                        <td className="py-3.5 px-5 text-center">
                          <button
                            onClick={() => handleOpenDetailModal(item)}
                            className="bg-pink-50 hover:bg-pink-100 border border-pink-200 hover:border-pink-300 text-pink-700 font-bold text-xs py-1.5 px-3 rounded-xl transition-all flex items-center gap-1 mx-auto cursor-pointer shadow-xs"
                          >
                            <LineChart className="w-3.5 h-3.5" />
                            <span>Analisis Grafik</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredForecasts.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                        Tidak ada data aksesoris yang cocok dengan pencarian / filter Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================= TAB 2: ORIGINAL EOQ & ROP SIMULATOR ======================= */}
      {activeTab === 'eoq_rop' && (
        <div className="space-y-6 animate-fade-in">
          {/* Forecaster control center / Simulator */}
          <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Sliders className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-slate-800 text-sm">Simulasi Parameter EOQ & Safety Stock</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sesuaikan parameter biaya di bawah untuk melihat bagaimana rumus Economic Order Quantity (EOQ) dan Reorder Point (ROP) beradaptasi secara dinamis untuk mengoptimalkan biaya modal barang Anda.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Slide 1: Ordering Cost */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Biaya Sekali PO (S)</label>
                  <div className="text-sm font-extrabold text-pink-600 font-mono mb-1">{formatIDR(localOrderingCost)}</div>
                  <input
                    type="range"
                    min="50000"
                    max="500000"
                    step="10000"
                    value={localOrderingCost}
                    onChange={(e) => setLocalOrderingCost(Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Slide 2: Holding cost rate */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Biaya Simpan % / thn (H)</label>
                  <div className="text-sm font-extrabold text-pink-600 font-mono mb-1">{localHoldingRate}% <span className="text-[10px] text-slate-400 font-normal">dari Modal</span></div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={localHoldingRate}
                    onChange={(e) => setLocalHoldingRate(Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Slide 3: Safety Factor Z */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Safety Factor (Z-Score)</label>
                  <div className="text-sm font-extrabold text-pink-600 font-mono mb-1">{localZFactor} <span className="text-[10px] text-slate-400 font-normal">(95% SLA)</span></div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.5"
                    step="0.05"
                    value={localZFactor}
                    onChange={(e) => setLocalZFactor(Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-pink-50">
                <button
                  onClick={handleApplySimulator}
                  className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Terapkan Parameter</span>
                </button>
              </div>
            </div>

            {/* Sidebar help */}
            <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-pink-900 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
                  <span>Giya AI Engine</span>
                </div>
                <h4 className="text-xs font-extrabold text-pink-950 mt-1">Mengapa Menggunakan EOQ & ROP?</h4>
                <p className="text-[10px] text-pink-800 leading-relaxed mt-1">
                  <strong>EOQ</strong> menghitung jumlah pemesanan paling ekonomis untuk menyeimbangkan biaya simpan dan biaya pesan. <br />
                  <strong>ROP (Reorder Point)</strong> memandu tanggal tepat pengiriman agar stok aman tidak habis di tengah lead time supplier.
                </p>
              </div>

              {/* Quick results */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-pink-100 mt-4 text-center">
                <div className="bg-white p-2 rounded-xl border border-pink-100">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Harus Reorder</span>
                  <span className="text-base font-extrabold text-rose-600">{urgentCount} SKU</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-pink-100">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Stok Aman</span>
                  <span className="text-base font-extrabold text-emerald-600">{healthyCount} SKU</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Forecasting Table */}
          <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-pink-50 flex items-center justify-between bg-pink-50/10">
              <div>
                <h3 className="text-base font-bold text-slate-800">Daftar Estimasi Kebutuhan Stok</h3>
                <p className="text-xs text-slate-400 mt-0.5">Analisis hari menuju stockout dan tanggal anjuran PO.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pink-50/20 text-pink-950/70 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-5 border-b border-pink-50">Produk</th>
                    <th className="py-3.5 px-5 border-b border-pink-50">Demand Harian</th>
                    <th className="py-3.5 px-5 border-b border-pink-50">Stok Saat Ini</th>
                    <th className="py-3.5 px-5 border-b border-pink-50">Batas ROP</th>
                    <th className="py-3.5 px-5 border-b border-pink-50">Sisa Hari (Stockout)</th>
                    <th className="py-3.5 px-5 border-b border-pink-50">Jumlah Order Rekomendasi (EOQ)</th>
                    <th className="py-3.5 px-5 border-b border-pink-50">Tanggal Harus PO</th>
                    <th className="py-3.5 px-5 border-b border-pink-50">Status / Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 text-sm">
                  {forecastedItems.map((item) => {
                    const stockoutText = item.daysToStockout > 365 ? '1+ Tahun' : `${item.daysToStockout} Hari`;
                    
                    return (
                      <tr key={item.id} className="hover:bg-pink-50/10 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-semibold text-slate-800">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {item.id} • {item.category}</div>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-700 font-mono">{item.avgDailyDemand.toFixed(2)} pcs/hari</td>
                        <td className={`py-3.5 px-5 font-bold ${item.currentStock <= item.reorderPoint ? 'text-rose-600' : 'text-slate-700'}`}>
                          {item.currentStock} {item.unit}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-slate-600 font-mono">{item.reorderPoint} pcs</td>
                        <td className={`py-3.5 px-5 font-bold ${item.daysToStockout <= item.leadTime ? 'text-rose-600 animate-pulse' : 'text-slate-600'}`}>
                          {stockoutText}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-pink-600 font-mono">{item.recommendedQty} {item.unit}</td>
                        <td className="py-3.5 px-5 text-slate-600 font-mono font-medium">{item.formattedOrderDate}</td>
                        <td className="py-3.5 px-5">
                          {item.isUrgent ? (
                            <div className="flex items-center gap-2">
                              <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase shrink-0">
                                Reorder Now!
                              </span>
                              {onPlacePOToSupplier && (
                                <button
                                  onClick={() => onPlacePOToSupplier(item.id, item.recommendedQty)}
                                  className="px-2.5 py-1 bg-pink-500 hover:bg-pink-600 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
                                >
                                  Buat PO
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase inline-block">
                              Aman (Healthy)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================= DETAILED ANALYSIS MODAL (HIGH INTENSITY DESIGN) ======================= */}
      {selectedForecastItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-pink-100 flex flex-col overflow-hidden max-h-[92vh] animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-pink-50 bg-gradient-to-r from-pink-50/40 to-rose-50/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-pink-100 text-pink-700 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Analisis Detail Forecasting
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-1 flex items-center gap-2">
                  <span>{selectedForecastItem.product.name}</span>
                  <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {selectedForecastItem.product.sku}
                  </span>
                </h3>
              </div>
              <button 
                onClick={handleCloseDetailModal}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh]">
              
              {/* Row 1: Parameter Tuning & Best Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Winner Card */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50/20 border border-pink-100/70 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                      <span>Metode Peramalan Terbaik (MAPE Terendah)</span>
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-800 mt-2">
                      {selectedForecastItem.bestMethodName}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Model algoritma ini mendeteksi error terendah pada historis penjualan produk ini. Nilai error MAPE adalah <strong>{selectedForecastItem.bestMethodMAPE.toFixed(2)}%</strong> (Akurasi: <strong>{(100 - selectedForecastItem.bestMethodMAPE).toFixed(2)}%</strong>).
                    </p>
                  </div>

                  <div className="border-t border-pink-100/50 pt-4 mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/80 p-2 rounded-xl border border-pink-100/40">
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">MAD</span>
                      <span className="text-xs font-extrabold text-slate-700 font-mono">
                        {selectedForecastItem.metrics[selectedForecastItem.bestMethodKey].mad.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-xl border border-pink-100/40">
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">MSE</span>
                      <span className="text-xs font-extrabold text-slate-700 font-mono">
                        {selectedForecastItem.metrics[selectedForecastItem.bestMethodKey].mse.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-xl border border-pink-100/40">
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">MAPE</span>
                      <span className="text-xs font-extrabold text-pink-600 font-mono">
                        {selectedForecastItem.bestMethodMAPE.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Local Parameter Sliders */}
                <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs uppercase tracking-wider">
                    <Sliders className="w-4 h-4 text-pink-500" />
                    <span>Eksperimen Parameter Produk ini</span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Smoothing factor Alpha */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>Alpha (Exp. Smoothing)</span>
                        <span className="text-pink-600 font-mono">{forecastingAlpha.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={forecastingAlpha}
                        onChange={(e) => setForecastingAlpha(Number(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Weight 1 */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>Bobot Bulan t-1</span>
                        <span className="text-pink-600 font-mono">{weight1.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.8"
                        step="0.05"
                        value={weight1}
                        onChange={(e) => setWeight1(Number(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Weight 2 */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>Bobot Bulan t-2</span>
                        <span className="text-pink-600 font-mono">{weight2.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.8"
                        step="0.05"
                        value={weight2}
                        onChange={(e) => setWeight2(Number(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Aesthetic SVG Comparison Line Chart */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-pink-400" />
                    <div>
                      <h4 className="font-bold text-xs">Grafik Evaluasi & Perbandingan Model Peramalan</h4>
                      <p className="text-[9px] text-slate-400">Membandingkan Penjualan Riil (Jan-Jun) vs Prediksi 3 Metode Matematika</p>
                    </div>
                  </div>

                  {/* Legends */}
                  <div className="flex flex-wrap gap-2 text-[9px] font-semibold">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-400 block" />Actual</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 block" />MA-3</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-400 block" />WMA-3</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />SES</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 block" />Regresi Linear (LR)</span>
                  </div>
                </div>

                {/* Draw SVG lines dynamically */}
                {(() => {
                  const chartPoints = selectedForecastItem.chartData;
                  const allValues = chartPoints.flatMap(d => [
                    d.actual || 0,
                    d.forecastMA || 0,
                    d.forecastWMA || 0,
                    d.forecastSES || 0,
                    d.forecastLR || 0
                  ]).filter(v => v > 0);

                  const maxVal = Math.max(...allValues, 12);
                  const minVal = Math.max(0, Math.min(...allValues, 0) - 2);

                  const chartH = 150;
                  const chartW = 740;

                  // getY coordinate mapping
                  const getY = (val: number) => {
                    if (maxVal === minVal) return chartH / 2;
                    return chartH - 10 - ((val - minVal) / (maxVal - minVal)) * (chartH - 25);
                  };

                  const getX = (idx: number) => 40 + idx * 110;

                  // Generating path strings
                  // Actual sales has 6 points (0 to 5)
                  const actualPath = chartPoints.slice(0, 6).map((d, i) => `${getX(i)},${getY(d.actual)}`).join(' ');
                  // MA forecast has 4 points (Apr, May, Jun, Jul) -> idx 3 to 6
                  const maPath = chartPoints.slice(3, 7).map((d, i) => `${getX(3 + i)},${getY(d.forecastMA || 0)}`).join(' ');
                  // WMA forecast has 4 points -> idx 3 to 7
                  const wmaPath = chartPoints.slice(3, 7).map((d, i) => `${getX(3 + i)},${getY(d.forecastWMA || 0)}`).join(' ');
                  // SES forecast has 6 points (Feb to Jul) -> idx 1 to 7
                  const sesPath = chartPoints.slice(1, 7).map((d, i) => `${getX(1 + i)},${getY(d.forecastSES || 0)}`).join(' ');
                  // LR forecast has 5 points (Mar to Jul) -> idx 2 to 7
                  const lrPath = chartPoints.slice(2, 7).map((d, i) => `${getX(2 + i)},${getY(d.forecastLR || 0)}`).join(' ');

                  return (
                    <div className="relative">
                      <svg className="w-full h-44 overflow-visible font-mono text-[9px] text-slate-500" viewBox={`0 0 ${chartW} ${chartH}`}>
                        
                        {/* Horizontal grid lines */}
                        {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
                          const val = Math.round(minVal + ratio * (maxVal - minVal));
                          const y = getY(val);
                          return (
                            <g key={idx}>
                              <line 
                                x1="30" 
                                y1={y} 
                                x2={chartW - 20} 
                                y2={y} 
                                stroke="#334155" 
                                strokeDasharray="3,3" 
                              />
                              <text x="5" y={y + 3} fill="#94a3b8" textAnchor="start">{val}</text>
                            </g>
                          );
                        })}

                        {/* actual path */}
                        <polyline
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                          points={actualPath}
                        />

                        {/* MA path */}
                        <polyline
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          points={maPath}
                        />

                        {/* WMA path */}
                        <polyline
                          fill="none"
                          stroke="#c084fc"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          points={wmaPath}
                        />

                        {/* SES path */}
                        <polyline
                          fill="none"
                          stroke="#f472b6"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          points={sesPath}
                        />

                        {/* LR path */}
                        <polyline
                          fill="none"
                          stroke="#fb923c"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          points={lrPath}
                        />

                        {/* Draw circular nodes and annotations */}
                        {chartPoints.map((dp, idx) => {
                          const x = getX(idx);
                          return (
                            <g key={idx}>
                              {/* X labels */}
                              <text 
                                x={x} 
                                y={chartH + 8} 
                                fill={idx === 6 ? '#f472b6' : '#94a3b8'} 
                                className="font-semibold text-center" 
                                textAnchor="middle"
                              >
                                {dp.monthName}
                              </text>

                              {/* Actual points */}
                              {idx < 6 && (
                                <g>
                                  <circle cx={x} cy={getY(dp.actual)} r="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                                  <text x={x} y={getY(dp.actual) - 8} fill="#38bdf8" textAnchor="middle" className="font-bold">{dp.actual}</text>
                                </g>
                              )}

                              {/* Predicted July highlight box */}
                              {idx === 6 && (
                                <g>
                                  {/* Best Method final prediction dot */}
                                  <circle 
                                    cx={x} 
                                    cy={getY(selectedForecastItem.bestMethodForecast)} 
                                    r="5.5" 
                                    fill="#ec4899" 
                                    stroke="#ffffff" 
                                    strokeWidth="1.5" 
                                    className="animate-ping" 
                                  />
                                  <circle 
                                    cx={x} 
                                    cy={getY(selectedForecastItem.bestMethodForecast)} 
                                    r="5.5" 
                                    fill="#ec4899" 
                                    stroke="#ffffff" 
                                    strokeWidth="1.5" 
                                  />
                                  <rect 
                                    x={x - 20} 
                                    y={getY(selectedForecastItem.bestMethodForecast) - 24} 
                                    width="40" 
                                    height="16" 
                                    rx="4" 
                                    fill="#db2777" 
                                    className="shadow-sm" 
                                  />
                                  <text 
                                    x={x} 
                                    y={getY(selectedForecastItem.bestMethodForecast) - 13} 
                                    fill="#ffffff" 
                                    textAnchor="middle" 
                                    className="font-extrabold text-[9px]"
                                  >
                                    {selectedForecastItem.bestMethodForecast}
                                  </text>
                                </g>
                              )}
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  );
                })()}
              </div>

              {/* Row 2.5: Error Metrics (MAD, MSE, MAPE) Comparison Table */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                    <Activity className="w-4.5 h-4.5 text-pink-500" />
                    <span>Tabel Perhitungan Tingkat Error & Evaluasi Model (MAD, MSE, MAPE)</span>
                  </div>
                  <span className="text-[9px] text-emerald-650 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md font-extrabold uppercase">MAPE TERKECIL = METODE TERPILIH</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                        <th className="py-2.5 px-4">Metode Peramalan</th>
                        <th className="py-2.5 px-4 text-center">Mean Absolute Deviation (MAD)</th>
                        <th className="py-2.5 px-4 text-center">Mean Squared Error (MSE)</th>
                        <th className="py-2.5 px-4 text-center">Mean Absolute Percentage Error (MAPE)</th>
                        <th className="py-2.5 px-4 text-center">Prediksi Bulan Depan (Unit)</th>
                        <th className="py-2.5 px-4 text-center">Akurasi & Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {(['MA', 'WMA', 'SES', 'LR'] as const).map((key) => {
                        const m = selectedForecastItem.metrics[key];
                        const isBest = selectedForecastItem.bestMethodKey === key;
                        return (
                          <tr key={key} className={`hover:bg-slate-50/30 transition-colors ${isBest ? 'bg-pink-50/15' : ''}`}>
                            <td className="py-3 px-4 font-semibold text-slate-800">
                              <div className="flex items-center gap-1.5">
                                {isBest ? (
                                  <Check className="w-4 h-4 text-pink-600 font-extrabold" />
                                ) : (
                                  <span className="w-4" />
                                )}
                                <span>{m.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-medium">{m.mad.toFixed(2)}</td>
                            <td className="py-3 px-4 text-center font-mono font-medium">{m.mse.toFixed(2)}</td>
                            <td className={`py-3 px-4 text-center font-mono font-extrabold text-sm ${isBest ? 'text-pink-600' : 'text-slate-500'}`}>
                              {m.mape.toFixed(2)}%
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">{Math.round(m.nextMonthForecast)} pcs</td>
                            <td className="py-3 px-4 text-center">
                              {isBest ? (
                                <span className="bg-pink-100 text-pink-700 text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase border border-pink-200">
                                  Terbaik (Akurasi {(100 - m.mape).toFixed(1)}%)
                                </span>
                              ) : (
                                <span className="bg-slate-100 text-slate-500 text-[9px] font-medium px-2 py-0.5 rounded-md uppercase border border-slate-200">
                                  Akurasi {(100 - m.mape).toFixed(1)}%
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Row 3: Standard Model comparison table */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-700">Tabel Perbandingan Riil vs Forecast (Unit)</h4>
                  <span className="text-[9px] text-pink-600 font-extrabold uppercase">Terbaik diarsir pink</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-4 border-b border-slate-100">Bulan</th>
                        <th className="py-2.5 px-4 border-b border-slate-100">Penjualan Riil (Y)</th>
                        <th className={`py-2.5 px-4 border-b border-slate-100 ${selectedForecastItem.bestMethodKey === 'MA' ? 'bg-pink-50/50 text-pink-700' : ''}`}>Moving Average (MA-3)</th>
                        <th className={`py-2.5 px-4 border-b border-slate-100 ${selectedForecastItem.bestMethodKey === 'WMA' ? 'bg-pink-50/50 text-pink-700' : ''}`}>Weighted Moving Average</th>
                        <th className={`py-2.5 px-4 border-b border-slate-100 ${selectedForecastItem.bestMethodKey === 'SES' ? 'bg-pink-50/50 text-pink-700' : ''}`}>Exponential Smoothing (SES)</th>
                        <th className={`py-2.5 px-4 border-b border-slate-100 ${selectedForecastItem.bestMethodKey === 'LR' ? 'bg-pink-50/50 text-pink-700' : ''}`}>Regresi Linear (LR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {selectedForecastItem.chartData.map((row, idx) => {
                        const isBestMA = selectedForecastItem.bestMethodKey === 'MA';
                        const isBestWMA = selectedForecastItem.bestMethodKey === 'WMA';
                        const isBestSES = selectedForecastItem.bestMethodKey === 'SES';
                        const isBestLR = selectedForecastItem.bestMethodKey === 'LR';
                        
                        return (
                          <tr key={idx} className="hover:bg-slate-50/30">
                            <td className="py-2.5 px-4 font-semibold text-slate-800">{row.monthName}</td>
                            <td className="py-2.5 px-4 font-extrabold text-slate-700 font-mono">{idx === 6 ? '-' : row.actual}</td>
                            <td className={`py-2.5 px-4 font-mono ${isBestMA ? 'bg-pink-50/30 font-bold text-pink-600' : ''}`}>{row.forecastMA || '-'}</td>
                            <td className={`py-2.5 px-4 font-mono ${isBestWMA ? 'bg-pink-50/30 font-bold text-pink-600' : ''}`}>{row.forecastWMA || '-'}</td>
                            <td className={`py-2.5 px-4 font-mono ${isBestSES ? 'bg-pink-50/30 font-bold text-pink-600' : ''}`}>{row.forecastSES || '-'}</td>
                            <td className={`py-2.5 px-4 font-mono ${isBestLR ? 'bg-pink-50/30 font-bold text-pink-600' : ''}`}>{row.forecastLR || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer (Action Control to place PO) */}
            <div className="p-6 border-t border-pink-50 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Stok Saat Ini</span>
                  <span className="text-sm font-extrabold text-slate-800">{selectedForecastItem.product.currentStock} pcs</span>
                </div>
                <div className="text-pink-600 font-bold">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Kebutuhan Juli (Forecast + Safety Buffer)</span>
                  <span className="text-sm font-extrabold text-slate-800">
                    {selectedForecastItem.bestMethodForecast + (selectedForecastItem.product.safetyStock || 2)} pcs
                  </span>
                </div>
              </div>

              {onPlacePOToSupplier && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty PO"
                      value={customPOQty}
                      onChange={(e) => setCustomPOQty(e.target.value)}
                      className="pl-3 pr-8 py-2 w-28 text-xs font-bold text-slate-700 font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                    />
                    <span className="text-[9px] font-bold text-slate-400 absolute right-3 top-3">pcs</span>
                  </div>

                  <button
                    onClick={handleSendPO}
                    disabled={poSubmittedSuccess}
                    className={`flex items-center gap-1 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs cursor-pointer transition-all ${
                      poSubmittedSuccess 
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white'
                    }`}
                  >
                    {poSubmittedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 animate-bounce" />
                        <span>PO Dikirim!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Kirim Purchase Order (PO)</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
