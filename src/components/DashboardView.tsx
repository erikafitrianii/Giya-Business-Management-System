import React, { useMemo, useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  FileText, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Download, 
  ChevronRight, 
  Calendar,
  Layers,
  Sparkles,
  AlertCircle,
  Gem,
  Watch,
  Gift,
  Crown,
  Award,
  CircleDot,
  Heart,
  Sparkle,
  Palette,
  Check,
  Link2,
  Sun
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Product, Order } from '../types';

import { 
  ThemePreferences, 
  ThemeKey, 
  ChartColorKey, 
  FontKey, 
  EffectKey, 
  TextColorKey,
  THEME_COLOR_MAP, 
  FONT_MAP, 
  EFFECT_MAP, 
  CHART_COLOR_MAP,
  TEXT_COLOR_MAP,
  DEFAULT_THEME_PREFS
} from '../lib/theme';

interface DashboardViewProps {
  products: Product[];
  orders: Order[];
  onAddOrder: () => void;
  onNavigateToTab: (tab: any) => void;
  orderingCost: number;
  holdingCostRate: number;
  themePrefs?: ThemePreferences;
  onUpdateThemePrefs?: (prefs: ThemePreferences) => void;
}

export default function DashboardView({ 
  products, 
  orders, 
  onAddOrder, 
  onNavigateToTab,
  orderingCost,
  holdingCostRate,
  themePrefs = DEFAULT_THEME_PREFS,
  onUpdateThemePrefs
}: DashboardViewProps) {
  const activeTheme = THEME_COLOR_MAP[themePrefs.theme] || THEME_COLOR_MAP.rose;
  const activeFont = FONT_MAP[themePrefs.font] || FONT_MAP.jakarta;
  const activeEffect = EFFECT_MAP[themePrefs.effect] || EFFECT_MAP.default;
  const chartColors = CHART_COLOR_MAP[themePrefs.chartColor] || CHART_COLOR_MAP.rosewood;

  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  
  // Render a beautiful stylized icon matching the product name/category
  const renderProductIcon = (p: Product) => {
    const nameLower = p.name ? p.name.toLowerCase() : '';
    const catLower = p.category ? p.category.toLowerCase() : '';

    // Support real product image if specified
    if (p.imageUrl && p.imageUrl.trim().startsWith('http')) {
      return (
        <div className="w-full h-full overflow-hidden relative">
          <img 
            src={p.imageUrl} 
            alt={p.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '';
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      );
    }

    let bgGradient = "from-pink-50 via-pink-100/40 to-rose-100/80";

    // Set background gradient based on category or name
    if (nameLower.includes('kalung') || catLower.includes('neck') || catLower.includes('necklace')) {
      bgGradient = "from-pink-50 via-pink-100/30 to-rose-100/70";
    } else if (nameLower.includes('cincin') || catLower.includes('ring')) {
      bgGradient = "from-teal-50 via-teal-100/30 to-emerald-100/60";
    } else if (nameLower.includes('anting') || catLower.includes('ear') || catLower.includes('earrings')) {
      bgGradient = "from-purple-50 via-purple-100/30 to-pink-100/60";
    } else if (nameLower.includes('gelang kaki') || catLower.includes('anklet') || nameLower.includes('kaki')) {
      bgGradient = "from-rose-50 via-rose-100/30 to-pink-100/70";
    } else if (nameLower.includes('gelang') || catLower.includes('brace') || catLower.includes('bracelet')) {
      bgGradient = "from-sky-50 via-sky-100/30 to-blue-100/60";
    } else if (nameLower.includes('liontin') || nameLower.includes('pendant') || catLower.includes('pendant')) {
      bgGradient = "from-rose-50 via-pink-100/20 to-rose-100/60";
    } else if (nameLower.includes('bros') || catLower.includes('brooch') || catLower.includes('brooch')) {
      bgGradient = "from-rose-50 via-pink-100/30 to-orange-100/50";
    } else if (nameLower.includes('rambut') || nameLower.includes('hair') || catLower.includes('hair') || nameLower.includes('jepit')) {
      bgGradient = "from-amber-50 via-yellow-100/30 to-amber-100/60";
    } else if (nameLower.includes('set') || nameLower.includes('hadiah') || catLower.includes('gift') || catLower.includes('set')) {
      bgGradient = "from-fuchsia-50 via-fuchsia-100/30 to-pink-100/60";
    } else if (nameLower.includes('limit') || nameLower.includes('terbatas') || catLower.includes('limit') || catLower.includes('limited')) {
      bgGradient = "from-yellow-50 via-yellow-100/40 to-amber-200/50";
    }

    // Dynamic graphic generation mimicking premium 3D/colored vector icons directly centered
    const renderVisualGraphic = () => {
      // 1. Cincin (Ring)
      if (nameLower.includes('cincin') || catLower.includes('ring')) {
        return (
          <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(20,184,166,0.35)] hover:scale-110 transition-transform duration-300">
            {/* Main ring body */}
            <div className="w-12 h-12 rounded-full border-[5px] border-teal-400 flex items-center justify-center relative rotate-12">
              <div className="absolute inset-0.5 rounded-full border border-white/40" />
            </div>
            {/* Big Diamond perched on top */}
            <div className="absolute -top-1 bg-white p-0.5 rounded-md border border-teal-200 rotate-45 shadow-2xs">
              <Gem className="w-4 h-4 text-teal-500 fill-teal-100" />
            </div>
          </div>
        );
      }

      // 2. Kalung (Necklace)
      if (nameLower.includes('kalung') || catLower.includes('neck') || catLower.includes('necklace')) {
        return (
          <div className="relative flex flex-col items-center filter drop-shadow-[0_6px_12px_rgba(219,39,119,0.35)] hover:scale-110 transition-transform duration-300">
            {/* Necklace chain arc */}
            <div className="w-12 h-8 border-b-[4px] border-x-[4px] border-pink-400 rounded-b-full relative flex items-end justify-center">
              <div className="absolute inset-x-0.5 bottom-0 border-b border-white/50" />
              {/* Hanging Pendant Diamond */}
              <div className="absolute -bottom-3 bg-gradient-to-tr from-pink-500 to-rose-400 p-1 rounded-full border border-white shadow-md rotate-45">
                <Gem className="w-3.5 h-3.5 text-white fill-pink-100/50 -rotate-45" />
              </div>
            </div>
          </div>
        );
      }

      // 3. Liontin (Pendant)
      if (nameLower.includes('liontin') || nameLower.includes('pendant') || catLower.includes('pendant')) {
        return (
          <div className="relative flex flex-col items-center filter drop-shadow-[0_6px_12px_rgba(244,63,94,0.35)] hover:scale-110 transition-transform duration-300">
            {/* Chain/Hanger link */}
            <div className="w-1 h-4 bg-gradient-to-b from-rose-300 to-rose-500 rounded-full" />
            {/* Beautiful Pendant Heart/Gem */}
            <div className="bg-gradient-to-tr from-rose-600 to-pink-400 p-2 rounded-full border border-white shadow-md relative -mt-1">
              <Heart className="w-6 h-6 text-white fill-white/85" />
              <Sparkle className="w-2.5 h-2.5 text-rose-200 absolute top-0.5 right-0.5 animate-pulse" />
            </div>
          </div>
        );
      }

      // 4. Gelang Kaki (Anklet)
      if (nameLower.includes('gelang kaki') || catLower.includes('anklet') || nameLower.includes('kaki')) {
        return (
          <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(244,63,94,0.35)] hover:scale-110 transition-transform duration-300">
            <div className="w-14 h-8 border-b-[3px] border-rose-400/90 rounded-b-full relative flex items-end justify-center">
              <div className="absolute -bottom-2 flex gap-1.5">
                <div className="w-2 h-2 bg-rose-500 rounded-full border border-white shadow-3xs" />
                <div className="w-3 h-3 bg-pink-500 rounded-full border border-white flex items-center justify-center shadow-3xs">
                  <Sparkle className="w-2 text-white" />
                </div>
                <div className="w-2 h-2 bg-rose-500 rounded-full border border-white shadow-3xs" />
              </div>
            </div>
          </div>
        );
      }

      // 5. Gelang (Bracelet)
      if (nameLower.includes('gelang') || catLower.includes('bracelet') || catLower.includes('brace')) {
        return (
          <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(59,130,246,0.35)] hover:scale-110 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full border-[5px] border-blue-400 flex items-center justify-center relative">
              <div className="absolute inset-0.5 rounded-full border-[2px] border-sky-300 rotate-45 opacity-80" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-blue-600 rounded-full border border-white shadow-sm" />
            </div>
          </div>
        );
      }

      // 6. Anting (Earrings)
      if (nameLower.includes('anting') || catLower.includes('ear') || catLower.includes('earrings')) {
        return (
          <div className="relative flex gap-3 filter drop-shadow-[0_6px_12px_rgba(168,85,247,0.35)] hover:scale-110 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-2 bg-purple-300 rounded-full" />
              <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full border border-white flex items-center justify-center shadow-xs">
                <Sparkle className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center mt-1.5">
              <div className="w-0.5 h-2 bg-purple-300 rounded-full" />
              <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full border border-white flex items-center justify-center shadow-xs">
                <Sparkle className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
        );
      }

      // 7. Bros (Brooch)
      if (nameLower.includes('bros') || catLower.includes('brooch') || nameLower.includes('brooch')) {
        return (
          <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(236,72,153,0.35)] hover:scale-110 transition-transform duration-300">
            <Sun className="w-12 h-12 text-rose-500 fill-rose-100 rotate-12" />
            <div className="absolute p-0.5 bg-white rounded-full border border-rose-200">
              <Gem className="w-4 h-4 text-rose-600 fill-rose-200" />
            </div>
          </div>
        );
      }

      // 8. Aksesoris Rambut (Hair Accessories)
      if (nameLower.includes('rambut') || nameLower.includes('jepit') || nameLower.includes('hair') || catLower.includes('hair') || nameLower.includes('mahkota') || nameLower.includes('tiara')) {
        return (
          <div className="relative flex flex-col items-center justify-center filter drop-shadow-[0_6px_12px_rgba(245,158,11,0.35)] hover:scale-110 transition-transform duration-300">
            <Crown className="w-12 h-12 text-amber-500 fill-amber-100" />
            <div className="absolute -top-0.5 flex gap-1">
              <Sparkle className="w-2.5 h-2.5 text-amber-500" />
            </div>
          </div>
        );
      }

      // 9. Set Hadiah (Gift Set)
      if (nameLower.includes('set') || nameLower.includes('hadiah') || catLower.includes('gift') || catLower.includes('set')) {
        return (
          <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(217,70,239,0.35)] hover:scale-110 transition-transform duration-300">
            <Gift className="w-12 h-12 text-fuchsia-600 fill-fuchsia-100" />
            <div className="absolute -top-1 -right-1 bg-fuchsia-500 text-white rounded-full p-0.5 border border-white shadow-2xs">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>
        );
      }

      // 10. Edisi Terbatas (Limited Edition)
      if (nameLower.includes('limit') || nameLower.includes('terbatas') || catLower.includes('limit') || catLower.includes('limited')) {
        return (
          <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(234,179,8,0.45)] hover:scale-110 transition-transform duration-300">
            <Award className="w-12 h-12 text-yellow-600 fill-yellow-50" />
            <div className="absolute">
              <Crown className="w-6 h-6 text-yellow-500 fill-yellow-100 rotate-12" />
            </div>
          </div>
        );
      }

      // Fallback
      return (
        <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(236,72,153,0.3)] hover:scale-110 transition-transform duration-300">
          <Gem className="w-12 h-12 text-pink-500 fill-pink-50" />
          <Sparkles className="w-3.5 h-3.5 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
      );
    };

    return (
      <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex flex-col items-center justify-center p-3 transition-all duration-500 group-hover:scale-105 relative overflow-hidden`}>
        {/* Subtle decorative ring overlay in the background */}
        <div className="absolute inset-0 border-[4px] border-white/15 rounded-full scale-125 opacity-35 pointer-events-none" />
        
        {/* Centered Jewelry Graphic without extra white circles */}
        <div className="mb-1">
          {renderVisualGraphic()}
        </div>

        <span className="text-[9px] font-mono tracking-wider uppercase font-bold text-pink-950/70 bg-white/70 px-1.5 py-0.5 rounded-full border border-pink-100/40 z-10 shadow-3xs">
          {p.material || 'Premium'}
        </span>
      </div>
    );
  };

  const bestSellers = useMemo(() => {
    return [...products]
      .filter(p => p.name && p.name !== 'Produk Tanpa Nama' && p.name.toLowerCase() !== 'tidak tersedia')
      .sort((a, b) => (b.avgDailyDemand || 0) - (a.avgDailyDemand || 0))
      .slice(0, 4);
  }, [products]);

  // States for custom period selector
  const [startDate, setStartDate] = useState<string>(() => {
    if (orders && orders.length > 0) {
      const dates = orders.map(o => o.date).filter(Boolean).sort();
      if (dates.length > 0) return dates[0];
    }
    return '2026-06-01';
  });
  const [endDate, setEndDate] = useState<string>(() => {
    if (orders && orders.length > 0) {
      const dates = orders.map(o => o.date).filter(Boolean).sort();
      if (dates.length > 0) return dates[dates.length - 1];
    }
    return '2026-06-30';
  });

  React.useEffect(() => {
    if (orders && orders.length > 0) {
      const dates = orders.map(o => o.date).filter(Boolean);
      if (dates.length > 0) {
        const sortedDates = [...dates].sort();
        setStartDate(sortedDates[0]);
        setEndDate(sortedDates[sortedDates.length - 1]);
      }
    }
  }, [orders]);

  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);

  // Helper to format Indonesian dates nicely
  const formatIndonesianDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Format to IDR Rupiah
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Filter orders by selected custom period
  const filteredOrdersByPeriod = useMemo(() => {
    return orders.filter(o => {
      if (!o.date) return false;
      return o.date >= startDate && o.date <= endDate;
    });
  }, [orders, startDate, endDate]);

  // Metrics calculations based on period
  const totalRevenue = useMemo(() => {
    return filteredOrdersByPeriod
      .filter(o => o.status === 'Completed' || o.status === 'In Progress')
      .reduce((sum, o) => sum + o.amount, 0);
  }, [filteredOrdersByPeriod]);

  const totalSalesCount = useMemo(() => {
    return filteredOrdersByPeriod
      .filter(o => o.status === 'Completed')
      .reduce((sum, o) => sum + o.itemsCount, 0);
  }, [filteredOrdersByPeriod]);

  const totalOrdersCount = useMemo(() => {
    return filteredOrdersByPeriod.length;
  }, [filteredOrdersByPeriod]);

  const totalProfit = useMemo(() => {
    // Profit margin average ~ 35% of revenue
    return totalRevenue * 0.35;
  }, [totalRevenue]);

  // Dynamic Chart Data: Aggregated from filtered orders by period - EXACTLY the last 7 days leading to endDate
  const salesChartData = useMemo(() => {
    const dates: string[] = [];
    const endD = new Date(endDate);
    
    // Generate the last 7 days ending at endDate
    for (let i = 6; i >= 0; i--) {
      const d = new Date(endD);
      d.setDate(endD.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
    }

    // Group orders by date
    const groups: { [key: string]: { sales: number; revenue: number } } = {};
    
    // Initialize groups for all 7 dates to guarantee they exist
    dates.forEach(dateStr => {
      groups[dateStr] = { sales: 0, revenue: 0 };
    });

    // Aggregate values from the orders list for the 7 dates
    orders.forEach(o => {
      if (o.date && groups[o.date]) {
        if (o.status === 'Completed' || o.status === 'In Progress') {
          groups[o.date].revenue += o.amount;
          groups[o.date].sales += o.itemsCount;
        }
      }
    });

    const data = dates.map((dateStr: string) => {
      const d = new Date(dateStr);
      const dayStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
      return {
        date: dayStr,
        sales: groups[dateStr].sales,
        revenue: groups[dateStr].revenue,
        originalDate: dateStr
      };
    });

    return data;
  }, [orders, endDate]);

  // Filter state for dynamic table
  const [activeSubTab, setActiveSubTab] = React.useState<'All' | 'Completed' | 'In Progress' | 'Pending' | 'Cancelled'>('All');

  const filteredOrders = useMemo(() => {
    const list = activeSubTab === 'All' 
      ? filteredOrdersByPeriod 
      : filteredOrdersByPeriod.filter(o => o.status === activeSubTab);
    return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filteredOrdersByPeriod, activeSubTab]);

  // Custom tooltips
  const CustomTooltipSales = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-pink-100 rounded-xl shadow-lg">
          <p className="text-xs text-slate-500 font-medium mb-1">{payload[0].payload.date}</p>
          <p className="text-sm font-bold text-pink-600">{payload[0].value.toLocaleString('id-ID')} unit</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipRev = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-pink-100 rounded-xl shadow-lg">
          <p className="text-xs text-slate-500 font-medium mb-1">{payload[0].payload.date}</p>
          <p className="text-sm font-bold text-pink-700">{formatIDR(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Overview Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${activeTheme.textHeader} font-sans tracking-tight`}>Dashboard</h1>
          <p className={`text-sm ${activeTheme.primaryText}/80`}>Pantau penjualan aksesoris Giya, stok, dan kinerja toko hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* PERSONALIZATION (PALETTE) BUTTON & POPUP */}
          <div className="relative">
            <button 
              onClick={() => setIsPersonalizationOpen(!isPersonalizationOpen)}
              className={`flex items-center justify-center p-2.5 rounded-xl border ${activeTheme.primaryBorder} bg-white text-slate-700 hover:${activeTheme.primaryText} hover:${activeTheme.primaryBgLight} transition-all duration-200 cursor-pointer shadow-xs`}
              title="Personalisasi Tema"
            >
              <Palette className={`w-5 h-5 ${isPersonalizationOpen ? activeTheme.primaryText : 'text-slate-500'}`} />
            </button>

            {isPersonalizationOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsPersonalizationOpen(false)} 
                />
                <div className="absolute left-0 mt-2 w-80 bg-white border border-slate-150 rounded-2xl shadow-xl z-50 p-5 animate-fade-in text-xs text-slate-700 space-y-4">
                  {/* Title */}
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Palette className={`w-4.5 h-4.5 ${activeTheme.primaryText}`} />
                    <span className="font-bold text-slate-800 text-sm">Personalization</span>
                  </div>

                  {/* UI Themes */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                      TEMA UI DASHBOARD
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['rose', 'ocean', 'emerald', 'sunset', 'violet'] as ThemeKey[]).map((tKey) => {
                        const isSelected = themePrefs.theme === tKey;
                        const labelMap: Record<ThemeKey, string> = {
                          rose: 'Rose',
                          ocean: 'Ocean Blue',
                          emerald: 'Emerald',
                          sunset: 'Sunset',
                          violet: 'Violet'
                        };
                        const colorBadge: Record<ThemeKey, string> = {
                          rose: 'bg-[#ec4899]',
                          ocean: 'bg-blue-500',
                          emerald: 'bg-emerald-500',
                          sunset: 'bg-orange-500',
                          violet: 'bg-violet-500'
                        };
                        return (
                          <button
                            key={tKey}
                            onClick={() => onUpdateThemePrefs?.({ ...themePrefs, theme: tKey })}
                            className={`flex items-center gap-2 p-2 rounded-lg border text-[11px] font-bold cursor-pointer transition-all ${
                              isSelected 
                                ? `${activeTheme.sidebarActive} ${activeTheme.primaryBorder} border-2` 
                                : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
                            }`}
                          >
                            <span className={`w-2.5 h-2.5 rounded-full ${colorBadge[tKey]}`} />
                            <span className="truncate">{labelMap[tKey]}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-slate-800" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chart Colors dropdown */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                      WARNA DIAGRAM / CHART
                    </span>
                    <select
                      value={themePrefs.chartColor}
                      onChange={(e) => onUpdateThemePrefs?.({ ...themePrefs, chartColor: e.target.value as ChartColorKey })}
                      className={`w-full text-xs font-bold border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 ${activeTheme.ring} text-slate-700 bg-slate-50 cursor-pointer`}
                    >
                      <option value="rosewood">Rosewood</option>
                      <option value="soft_blue">Soft Blue</option>
                      <option value="warm_amber">Warm Amber</option>
                      <option value="emerald_green">Emerald Green</option>
                    </select>
                  </div>

                  {/* Text Colors dropdown */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                      WARNA TEKS UTAMA
                    </span>
                    <select
                      value={themePrefs.textColor || 'slate'}
                      onChange={(e) => onUpdateThemePrefs?.({ ...themePrefs, textColor: e.target.value as TextColorKey })}
                      className={`w-full text-xs font-bold border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 ${activeTheme.ring} text-slate-700 bg-slate-50 cursor-pointer`}
                    >
                      <option value="slate">Slate Gray</option>
                      <option value="charcoal">Charcoal Black</option>
                      <option value="navy">Deep Navy</option>
                      <option value="brown">Warm Espresso</option>
                    </select>
                  </div>

                  {/* Font dropdown */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                      GAYA HURUF (FONT)
                    </span>
                    <select
                      value={themePrefs.font}
                      onChange={(e) => onUpdateThemePrefs?.({ ...themePrefs, font: e.target.value as FontKey })}
                      className={`w-full text-xs font-bold border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 ${activeTheme.ring} text-slate-700 bg-slate-50 cursor-pointer`}
                    >
                      <option value="jakarta">Plus Jakarta (Modern)</option>
                      <option value="poppins">Poppins (Friendly)</option>
                      <option value="inter">Inter (Sains/Sleek)</option>
                      <option value="mono">JetBrains Mono (Teknis)</option>
                    </select>
                  </div>

                  {/* Footnote */}
                  <p className="text-[9px] text-slate-400 italic pt-1 text-center">
                    ✨ Fitur AI Detektif Selisih & tema khusus tetap aktif!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Clickable Date Period Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
              className={`flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border ${activeTheme.primaryBorder} shadow-xs text-sm ${activeTheme.textHeader} hover:${activeTheme.primaryText} font-bold hover:${activeTheme.primaryBgLight} transition-all cursor-pointer`}
            >
              <Calendar className={`w-4 h-4 ${activeTheme.primaryText}`} />
              <span className={activeTheme.textHeader}>{formatIndonesianDate(startDate)} – {formatIndonesianDate(endDate)}</span>
            </button>

            {isPeriodDropdownOpen && (
              <>
                {/* Backdrop to close click outside */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsPeriodDropdownOpen(false)} 
                />
                <div className={`absolute right-0 mt-2 w-72 bg-white border ${activeTheme.primaryBorder} rounded-2xl shadow-xl z-50 p-4 animate-fade-in`}>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
                      Pilih Tanggal
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mulai</label>
                        <input 
                          type="date" 
                          value={startDate} 
                          onChange={(e) => setStartDate(e.target.value)}
                          className={`w-full text-xs font-bold border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:ring-1 ${activeTheme.ring} text-slate-700 bg-slate-50`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sampai</label>
                        <input 
                          type="date" 
                          value={endDate} 
                          onChange={(e) => setEndDate(e.target.value)}
                          className={`w-full text-xs font-bold border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:ring-1 ${activeTheme.ring} text-slate-700 bg-slate-50`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button 
            onClick={onAddOrder}
            className={`flex items-center gap-2 bg-gradient-to-r ${themePrefs.theme === 'rose' ? 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' : themePrefs.theme === 'ocean' ? 'from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600' : themePrefs.theme === 'emerald' ? 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : themePrefs.theme === 'sunset' ? 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600' : 'from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600'} text-white font-bold px-4 py-2.5 rounded-xl shadow-md ${activeEffect.buttonEffect} cursor-pointer text-sm`}
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pesanan</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className={`bg-white rounded-2xl p-5 border ${activeTheme.primaryBorder} ${activeEffect.shadowClass} hover:shadow-md transition-all group relative overflow-hidden`}>
          <div className={`absolute right-0 top-0 w-24 h-24 ${activeTheme.primaryBgLight}/40 rounded-bl-full -z-10 group-hover:scale-110 transition-all`} />
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.primaryText}/75`}>Total Pendapatan</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1 font-sans">{formatIDR(totalRevenue)}</h3>
            </div>
            <div className={`p-2.5 ${activeTheme.primaryBgLight} ${activeTheme.primaryText} rounded-xl`}>
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs">
            <span className="flex items-center font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +41%
            </span>
            <span className="text-slate-400">vs bulan lalu</span>
          </div>
        </div>

        {/* Total Sales Card */}
        <div className={`bg-white rounded-2xl p-5 border ${activeTheme.primaryBorder} ${activeEffect.shadowClass} hover:shadow-md transition-all group relative overflow-hidden`}>
          <div className={`absolute right-0 top-0 w-24 h-24 ${activeTheme.primaryBgLight}/40 rounded-bl-full -z-10 group-hover:scale-110 transition-all`} />
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.primaryText}/75`}>Total Item Terjual</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1 font-sans">{totalSalesCount.toLocaleString('id-ID')} <span className="text-sm font-normal text-slate-400">pcs</span></h3>
            </div>
            <div className={`p-2.5 ${activeTheme.primaryBgLight} ${activeTheme.primaryText} rounded-xl`}>
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs">
            <span className="flex items-center font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +41%
            </span>
            <span className="text-slate-400">vs bulan lalu</span>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className={`bg-white rounded-2xl p-5 border ${activeTheme.primaryBorder} ${activeEffect.shadowClass} hover:shadow-md transition-all group relative overflow-hidden`}>
          <div className={`absolute right-0 top-0 w-24 h-24 ${activeTheme.primaryBgLight}/40 rounded-bl-full -z-10 group-hover:scale-110 transition-all`} />
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.primaryText}/75`}>Total Transaksi</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1 font-sans">{totalOrdersCount.toLocaleString('id-ID')}</h3>
            </div>
            <div className={`p-2.5 ${activeTheme.primaryBgLight} ${activeTheme.primaryText} rounded-xl`}>
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs">
            <span className="flex items-center font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
              <ArrowDownRight className="w-3.5 h-3.5" />
              -12%
            </span>
            <span className="text-slate-400">vs bulan lalu</span>
          </div>
        </div>

        {/* Profit Card */}
        <div className={`bg-white rounded-2xl p-5 border ${activeTheme.primaryBorder} ${activeEffect.shadowClass} hover:shadow-md transition-all group relative overflow-hidden`}>
          <div className={`absolute right-0 top-0 w-24 h-24 ${activeTheme.primaryBgLight}/40 rounded-bl-full -z-10 group-hover:scale-110 transition-all`} />
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.primaryText}/75`}>Estimasi Laba Kotor</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1 font-sans">{formatIDR(totalProfit)}</h3>
            </div>
            <div className={`p-2.5 ${activeTheme.primaryBgLight} ${activeTheme.primaryText} rounded-xl`}>
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs">
            <span className="flex items-center font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +41%
            </span>
            <span className="text-slate-400">vs bulan lalu</span>
          </div>
        </div>
      </div>

      {/* Stock Health Alerts Banner if any low stock */}
      {products.filter(p => p.currentStock <= p.reorderPoint).length > 0 && (
        <div className={`bg-rose-50/70 border border-rose-150 rounded-2xl p-4 flex items-center gap-3.5`}>
          <div className="bg-rose-100 text-rose-600 p-2 rounded-xl shrink-0">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-rose-950">Peringatan Kebutuhan Reorder!</h4>
            <p className="text-xs text-rose-700 mt-0.5">
              Terdapat <span className="font-bold">{products.filter(p => p.currentStock <= p.reorderPoint).length} SKU</span> produk aksesoris yang berada di bawah batas Reorder Point (ROP). Segera pesan ulang menggunakan rekomendasi di tab <strong>Forecasting</strong> atau <strong>Supplier</strong>.
            </p>
          </div>
          <button 
            onClick={() => onNavigateToTab('forecasting')}
            className="text-xs font-bold text-rose-700 hover:text-rose-900 bg-white border border-rose-200 px-3 py-1.5 rounded-xl cursor-pointer shadow-xs whitespace-nowrap"
          >
            Selesaikan Reorder
          </button>
        </div>
      )}

      {/* Best Sellers Section */}
      <div className={`bg-white rounded-2xl border ${activeTheme.primaryBorder} p-5 ${activeEffect.shadowClass}`}>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              <span>Aksesoris Best Seller (Terlaris)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Produk aksesoris dengan tingkat permintaan harian kustom tertinggi.</p>
          </div>
          <button 
            onClick={() => onNavigateToTab('catalog')}
            className={`text-xs font-bold ${activeTheme.primaryText} hover:opacity-85 cursor-pointer`}
          >
            Lihat Katalog Lengkap
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map((item, index) => {
            const colors = [
              { bg: activeTheme.primaryText === 'text-pink-600' ? 'bg-pink-600' : activeTheme.primaryText === 'text-blue-600' ? 'bg-blue-600' : activeTheme.primaryText === 'text-emerald-600' ? 'bg-emerald-600' : activeTheme.primaryText === 'text-orange-600' ? 'bg-orange-600' : 'bg-violet-600', text: 'text-white', label: '#1 Terlaris' },
              { bg: activeTheme.primaryText === 'text-pink-600' ? 'bg-pink-500' : activeTheme.primaryText === 'text-blue-600' ? 'bg-blue-500' : activeTheme.primaryText === 'text-emerald-600' ? 'bg-emerald-500' : activeTheme.primaryText === 'text-orange-600' ? 'bg-orange-500' : 'bg-violet-500', text: 'text-white', label: '#2 Terlaris' },
              { bg: activeTheme.primaryText === 'text-pink-600' ? 'bg-pink-400' : activeTheme.primaryText === 'text-blue-600' ? 'bg-blue-400' : activeTheme.primaryText === 'text-emerald-600' ? 'bg-emerald-400' : activeTheme.primaryText === 'text-orange-600' ? 'bg-orange-400' : 'bg-violet-400', text: 'text-white', label: '#3 Terlaris' },
              { bg: activeTheme.primaryBgLight, text: activeTheme.primaryText, label: '#4 Terlaris' },
            ];
            const rank = colors[index] || { bg: 'bg-pink-500', text: 'text-white', label: `#${index + 1}` };
            
            const textHoverColor = activeTheme.primaryText === 'text-pink-600' ? 'group-hover:text-pink-600' : activeTheme.primaryText === 'text-blue-600' ? 'group-hover:text-blue-600' : activeTheme.primaryText === 'text-emerald-600' ? 'group-hover:text-emerald-600' : activeTheme.primaryText === 'text-orange-600' ? 'group-hover:text-orange-600' : 'group-hover:text-violet-600';

            return (
              <div 
                key={item.id} 
                className={`${activeTheme.primaryBgLight}/10 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group`}
              >
                {/* Ranking Badge */}
                <div className={`absolute left-3 top-3 z-10 ${rank.bg} ${rank.text} text-[9px] font-extrabold px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider`}>
                  {rank.label}
                </div>

                <div className="space-y-3">
                  {/* Image container */}
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 relative">
                    {renderProductIcon(item)}
                    <div className="absolute right-2.5 bottom-2.5 bg-slate-900/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Stok: {item.currentStock} pcs
                    </div>
                  </div>

                  {/* Title & SKU */}
                  <div>
                    <h4 className={`text-xs font-bold text-slate-800 line-clamp-1 ${textHoverColor} transition-colors`} title={item.name}>
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[9px] font-bold text-slate-400 font-mono">{item.sku}</span>
                      <span className={`text-[9px] ${activeTheme.primaryText} font-bold ${activeTheme.primaryBgLight} px-1.5 py-0.5 rounded-md`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Harga Jual</span>
                    <span className="text-xs font-extrabold text-slate-800">{formatIDR(item.sellingPrice)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Permintaan</span>
                    <span className="text-xs font-extrabold text-emerald-600 font-mono">
                      {item.avgDailyDemand.toFixed(2)} <span className="text-[9px] font-normal text-slate-400">/hari</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {bestSellers.length === 0 && (
            <div className="col-span-4 text-center py-6 text-slate-400 text-xs font-medium">
              Belum ada data aksesoris best seller tersedia.
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Sales Bar Chart */}
        <div className={`bg-white rounded-2xl p-5 border ${activeTheme.primaryBorder} ${activeEffect.shadowClass}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Total Penjualan Unit</h3>
              <p className="text-xs text-slate-400 mt-0.5">Perkembangan unit aksesoris terjual 7 hari terakhir</p>
            </div>
            <div className={`flex items-center gap-2 ${activeTheme.primaryBgLight} ${activeTheme.primaryText} font-bold text-xs px-2.5 py-1 rounded-xl`}>
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+28.3% Pekan Ini</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.85}/>
                    <stop offset="95%" stopColor={chartColors.secondary || chartColors.primary} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltipSales />} cursor={{ fill: chartColors.quaternary || '#f8fafc' }} />
                <Bar dataKey="sales" fill="url(#colorSales)" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Revenue Area Chart */}
        <div className={`bg-white rounded-2xl p-5 border ${activeTheme.primaryBorder} ${activeEffect.shadowClass}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Total Pendapatan Toko</h3>
              <p className="text-xs text-slate-400 mt-0.5">Grafik perputaran uang pendapatan 7 hari terakhir</p>
            </div>
            <div className={`flex items-center gap-2 ${activeTheme.primaryBgLight} ${activeTheme.primaryText} font-bold text-xs px-2.5 py-1 rounded-xl`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>+20.5% Pekan Ini</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v/1000000).toFixed(0)}jt`} />
                <Tooltip content={<CustomTooltipRev />} />
                <Area type="monotone" dataKey="revenue" stroke={chartColors.primary} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Last Sales Table */}
      <div className={`bg-white rounded-2xl border ${activeTheme.primaryBorder} ${activeEffect.shadowClass} overflow-hidden`}>
        <div className={`p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div>
            <h3 className="text-base font-bold text-slate-800">Daftar Transaksi Terakhir</h3>
            <p className="text-xs text-slate-400 mt-0.5">Monitor aktivitas pesanan yang masuk dan status prosesnya.</p>
          </div>
          <button 
            onClick={() => onNavigateToTab('orders')}
            className={`text-xs font-bold ${activeTheme.primaryText} hover:opacity-85 flex items-center gap-1 cursor-pointer`}
          >
            <span>Lihat Semua Pesanan</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter subtabs */}
        <div className={`px-5 py-2.5 ${activeTheme.primaryBgLight}/30 border-b border-slate-100 flex flex-wrap gap-1.5`}>
          {(['All', 'Completed', 'In Progress', 'Pending', 'Cancelled'] as const).map((status) => {
            const isActive = activeSubTab === status;
            return (
              <button
                key={status}
                onClick={() => setActiveSubTab(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? themePrefs.theme === 'rose' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs' : themePrefs.theme === 'ocean' ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-xs' : themePrefs.theme === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xs' : themePrefs.theme === 'sunset' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs' : 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-xs'
                    : `text-slate-600 hover:${activeTheme.primaryText} hover:${activeTheme.primaryBgLight}`
                }`}
              >
                {status === 'All' ? 'Semua' : status}
              </button>
            );
          })}
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${activeTheme.primaryBgLight}/20 ${activeTheme.primaryText} text-xs font-bold uppercase tracking-wider`}>
                <th className="py-3 px-5 border-b border-slate-100">Order ID</th>
                <th className="py-3 px-5 border-b border-slate-100">Nama Pelanggan</th>
                <th className="py-3 px-5 border-b border-slate-100">Tanggal</th>
                <th className="py-3 px-5 border-b border-slate-100">Jumlah Produk</th>
                <th className="py-3 px-5 border-b border-slate-100">Total Pembayaran</th>
                <th className="py-3 px-5 border-b border-slate-100">Metode</th>
                <th className="py-3 px-5 border-b border-slate-100">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.slice(0, 5).map((order) => {
                const statusColor = 
                  order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  order.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                  order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-rose-50 text-rose-700 border-rose-100';

                return (
                  <tr key={order.id} className={`hover:${activeTheme.primaryBgLight}/10 transition-colors`}>
                    <td className="py-3 px-5 font-mono text-xs font-semibold text-slate-800">{order.id}</td>
                    <td className="py-3 px-5 font-medium text-slate-700">{order.clientName}</td>
                    <td className="py-3 px-5 text-slate-500">
                      {new Date(order.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-5 text-slate-500 text-center sm:text-left">{order.itemsCount} pcs</td>
                    <td className="py-3 px-5 font-semibold text-slate-800">{formatIDR(order.amount)}</td>
                    <td className="py-3 px-5">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Tidak ada pesanan dengan status "{activeSubTab}" ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
