import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { Product } from '../types';
import { AlertTriangle, TrendingUp, DollarSign, PieChart as PieIcon } from 'lucide-react';

interface InventoryChartsProps {
  products: Product[];
}

const COLORS = [
  '#0f172a', // Slate 900
  '#059669', // Emerald 600
  '#4f46e5', // Indigo 600
  '#ea580c', // Orange 600
  '#0284c7', // Sky 600
  '#ca8a04', // Yellow 600
  '#db2777', // Pink 600
  '#7c3aed', // Violet 600
  '#2563eb', // Blue 600
  '#0d9488'  // Teal 600
];

export default function InventoryCharts({ products }: InventoryChartsProps) {
  // 1. Data: Inventory Value by Category
  const categoryData = useMemo(() => {
    const cats: Record<string, { name: string; value: number; count: number }> = {};
    products.forEach((p) => {
      const v = p.currentStock * p.costPrice;
      if (!cats[p.category]) {
        cats[p.category] = { name: p.category, value: 0, count: 0 };
      }
      cats[p.category].value += v;
      cats[p.category].count += 1;
    });
    return Object.values(cats).sort((a, b) => b.value - a.value);
  }, [products]);

  // 2. Data: Selling vs Cost Price Scatter
  const scatterData = useMemo(() => {
    return products.map((p) => ({
      name: p.name,
      sku: p.sku,
      category: p.category,
      cost: p.costPrice,
      selling: p.sellingPrice,
      margin: p.profitMargin,
      stock: p.currentStock
    }));
  }, [products]);

  // 3. Data: Stock Level Status Breakdown
  const stockStatusData = useMemo(() => {
    let lowStock = 0;
    let adequateStock = 0;
    
    products.forEach((p) => {
      if (p.currentStock <= p.reorderPoint) {
        lowStock += 1;
      } else {
        adequateStock += 1;
      }
    });

    return [
      { name: 'Reorder Needed (Low Stock)', value: lowStock },
      { name: 'Adequate Stock', value: adequateStock }
    ];
  }, [products]);

  // 4. Critical items needing reorder
  const criticalItems = useMemo(() => {
    return products
      .filter((p) => p.currentStock <= p.reorderPoint)
      .slice(0, 5)
      .map((p) => ({
        name: p.name,
        stock: p.currentStock,
        rop: p.reorderPoint,
        sku: p.sku
      }));
  }, [products]);

  // Formatting utility
  const formatIDRCompact = (num: number) => {
    if (num >= 1e9) return `Rp ${(num / 1e9).toFixed(1)}M`;
    if (num >= 1e6) return `Rp ${(num / 1e6).toFixed(0)}Jt`;
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  const formatIDRFull = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Bar Chart: Inventory Value by Category */}
      <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-sans font-semibold text-sm text-slate-950 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Nilai Investaris Kapital per Kategori
            </h3>
            <p className="text-[10px] text-slate-500">Nilai aset dihitung dari (Harga Beli × Stok Sekarang)</p>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Baris Kumulatif</span>
        </div>
        <div className="h-72 w-full">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatIDRCompact}
                />
                <Tooltip
                  formatter={(value: number) => [formatIDRFull(value), "Nilai Aset"]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'sans-serif',
                    fontSize: '11px'
                  }}
                  labelStyle={{ fontWeight: 'bold', color: '#34d399' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">Tidak ada data untuk ditampilkan</div>
          )}
        </div>
      </div>

      {/* 2. Pie Chart: Stock Status Breakdown */}
      <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-sans font-semibold text-sm text-slate-950 flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-indigo-600" />
              Status Kesehatan Stok (ROP)
            </h3>
            <p className="text-[10px] text-slate-500">Perbandingan SKU kritis vs aman</p>
          </div>
        </div>
        <div className="h-52 w-full relative flex items-center justify-center">
          {products.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    <Cell fill="#f43f5e" /> {/* Rose 500 (Low Stock) */}
                    <Cell fill="#10b981" /> {/* Emerald 500 (Adequate) */}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value} SKU`, "Jumlah SKU"]}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-sans font-bold text-slate-900">
                  {((stockStatusData[1].value / products.length) * 100).toFixed(0)}%
                </span>
                <span className="text-[9px] text-slate-500 font-medium">Stok Aman</span>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">Tidak ada data</div>
          )}
        </div>

        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-50">
          <div className="space-y-1">
            <span className="flex items-center gap-1.5 font-sans font-medium text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              Aman ({stockStatusData[1].value})
            </span>
            <p className="text-[9px] text-slate-400 ml-4">Stok &gt; Batas ROP</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-1.5 font-sans font-medium text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
              Kritis ({stockStatusData[0].value})
            </span>
            <p className="text-[9px] text-slate-400 ml-4">Stok ≤ Batas ROP</p>
          </div>
        </div>
      </div>

      {/* 3. Scatter Plot: Cost Price vs Selling Price per SKU */}
      <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-sans font-semibold text-sm text-slate-950 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            Analisis Pricing & Profit Margin SKU
          </h3>
          <p className="text-[10px] text-slate-500">Membandingkan Harga Beli vs Harga Jual per SKU untuk visualisasi rentang profit</p>
        </div>
        <div className="h-72 w-full">
          {products.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  dataKey="cost"
                  name="Harga Beli"
                  unit=" Rp"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <YAxis
                  type="number"
                  dataKey="selling"
                  name="Harga Jual"
                  unit=" Rp"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <ZAxis type="number" dataKey="margin" range={[40, 400]} name="Margin" unit="%" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border-none p-3 rounded-lg text-[11px] text-white shadow-lg space-y-1 font-sans">
                          <p className="font-semibold text-emerald-400">{data.name}</p>
                          <p className="text-slate-400">SKU: {data.sku}</p>
                          <p>Kategori: {data.category}</p>
                          <p className="border-t border-slate-800 pt-1 mt-1 text-slate-300">
                            Harga Beli: <span className="font-mono text-white">{formatIDRFull(data.cost)}</span>
                          </p>
                          <p className="text-slate-300">
                            Harga Jual: <span className="font-mono text-white">{formatIDRFull(data.selling)}</span>
                          </p>
                          <p className="text-indigo-300 font-semibold">
                            Profit Margin: {data.margin.toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="SKUs aksesoris" data={scatterData} fill="#4f46e5" />
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">Tidak ada data</div>
          )}
        </div>
      </div>

      {/* 4. Critical Stock Alert Panel */}
      <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-sans font-semibold text-sm text-slate-950 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />
            Top SKU Mendesak Reorder
          </h3>
          <p className="text-[10px] text-slate-500">Mendesak untuk diajukan PO baru demi kelancaran pasokan</p>
        </div>

        <div className="space-y-3.5 h-[280px] overflow-y-auto pr-1">
          {criticalItems.length > 0 ? (
            criticalItems.map((item, idx) => (
              <div key={idx} className="p-3 bg-amber-50/55 rounded-xl border border-amber-100/50 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">{item.sku}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Current: <strong className="text-slate-900">{item.stock}</strong></span>
                </div>
                <h4 className="font-sans font-medium text-xs text-slate-900 line-clamp-1">{item.name}</h4>
                
                {/* Visual Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (item.stock / (item.rop || 1)) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                    <span>Stok saat ini: {item.stock}</span>
                    <span>Batas ROP: {item.rop}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
              <span className="text-2xl">🎉</span>
              <p className="text-xs text-slate-600 font-semibold">Gudang dalam kondisi aman!</p>
              <p className="text-[10px] text-slate-400">Tidak ada produk yang menyentuh batas pemesanan ulang.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
