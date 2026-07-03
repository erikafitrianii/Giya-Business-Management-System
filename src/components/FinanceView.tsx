import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  ShoppingBag, 
  Settings,
  CreditCard,
  Layers,
  Percent,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Transaction } from '../types';

interface FinanceViewProps {
  transactions: Transaction[];
  onAddTransaction?: (t: Transaction) => void;
}

export default function FinanceView({ transactions }: FinanceViewProps) {
  
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  // Metrics
  const incomeTotal = useMemo(() => {
    return transactions
      .filter(t => t.type === 'Income' && t.status === 'Settled')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const expenseTotal = useMemo(() => {
    return transactions
      .filter(t => t.type === 'Expense' && t.status === 'Settled')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const netProfit = incomeTotal - expenseTotal;

  // Chart data: Income vs Expense monthly trend
  const trendData = [
    { name: 'Jan', Pendapatan: 35000000, Pengeluaran: 22000000 },
    { name: 'Feb', Pendapatan: 48000000, Pengeluaran: 28000000 },
    { name: 'Mar', Pendapatan: 52000000, Pengeluaran: 30000000 },
    { name: 'Apr', Pendapatan: 64000000, Pengeluaran: 38000000 },
    { name: 'May', Pendapatan: 59000000, Pengeluaran: 35000000 },
    { name: 'Jun', Pendapatan: 84000000, Pengeluaran: 46000000 },
    { name: 'Jul', Pendapatan: 95000000, Pengeluaran: 52000000 },
  ];

  // Expense breakdown percentages and amounts
  const expensesBreakdown = [
    { name: 'Belanja & Pembelian Stok (Purchase)', amount: 15000000, percentage: 48, color: 'bg-pink-600' },
    { name: 'Operasional Kantor & Sewa (Operations)', amount: 8000000, percentage: 25, color: 'bg-rose-500' },
    { name: 'Iklan & Pemasaran (Marketing)', amount: 3500000, percentage: 11, color: 'bg-fuchsia-500' },
    { name: 'Logistik & Ongkos Kirim (Logistics)', amount: 1200000, percentage: 4, color: 'bg-pink-300' },
    { name: 'Gaji Karyawan Giya Store (Staff)', amount: 12500000, percentage: 40, color: 'bg-rose-300' }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-950 font-sans tracking-tight">Keuangan & Transaksi</h1>
          <p className="text-sm text-pink-700/80">Pantau arus kas laba-rugi, pembelanjaan operasional, dan mutasi saldo toko aksesoris Anda.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-28 h-28 bg-white/10 rounded-tl-full -z-0 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">Total Pendapatan</p>
          <h3 className="text-3xl font-extrabold mt-1.5 font-sans">{formatIDR(incomeTotal)}</h3>
          <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-lg mt-3 inline-block">
            +41% vs bulan lalu
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-xs relative overflow-hidden">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Pengeluaran</p>
          <h3 className="text-3xl font-extrabold text-slate-800 mt-1.5 font-sans">{formatIDR(expenseTotal)}</h3>
          <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-lg mt-3 inline-block">
            -8% vs bulan lalu
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-xs relative overflow-hidden">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Laba Bersih (Net Profit)</p>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-1.5 font-sans">{formatIDR(netProfit)}</h3>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg mt-3 inline-block">
            +41% margin optimal
          </span>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expense monthly bar chart */}
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Analisis Pendapatan & Pengeluaran</h3>
              <p className="text-xs text-slate-400 mt-0.5">Perbandingan rasio kas masuk dan keluar per bulan</p>
            </div>
            <div className="flex gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-pink-500">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                <span>Pendapatan</span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span>Pengeluaran</span>
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v/1000000).toFixed(0)}jt`} />
                <Tooltip formatter={(value) => formatIDR(value as number)} />
                <Bar dataKey="Pendapatan" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="Pengeluaran" fill="#fda4af" radius={[4, 4, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown List */}
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Alokasi Biaya Terbesar</h3>
            <p className="text-xs text-slate-400 mt-0.5">Rincian pengeluaran operasional bulan ini</p>
          </div>

          <div className="space-y-4 mt-6 flex-1 flex flex-col justify-center">
            {expensesBreakdown.slice(0, 4).map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span className="truncate max-w-[180px]" title={exp.name}>{exp.name}</span>
                  <span className="font-extrabold text-pink-600">{formatIDR(exp.amount)}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${exp.color} rounded-full`} style={{ width: `${exp.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-pink-50">
          <h3 className="text-base font-bold text-slate-800">Arus Kas & Buku Kas Umum</h3>
          <p className="text-xs text-slate-400 mt-0.5">Daftar mutasi debit/kredit keuangan Giya Store.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/20 text-pink-950/70 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-5 border-b border-pink-50">No. Transaksi</th>
                <th className="py-3 px-5 border-b border-pink-50">Keterangan</th>
                <th className="py-3 px-5 border-b border-pink-50">Tanggal</th>
                <th className="py-3 px-5 border-b border-pink-50">Kategori</th>
                <th className="py-3 px-5 border-b border-pink-50 text-right">Jumlah Uang</th>
                <th className="py-3 px-5 border-b border-pink-50">Jenis</th>
                <th className="py-3 px-5 border-b border-pink-50">Status Kas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-sm">
              {sortedTransactions.map((t) => {
                const typePill = t.type === 'Income' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-rose-50 text-rose-700 border-rose-100';

                return (
                  <tr key={t.id} className="hover:bg-pink-50/10 transition-colors">
                    <td className="py-3 px-5 font-mono text-xs font-semibold text-slate-800">{t.id}</td>
                    <td className="py-3 px-5 font-semibold text-slate-700">{t.description}</td>
                    <td className="py-3 px-5 text-slate-500">
                      {new Date(t.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                        {t.category}
                      </span>
                    </td>
                    <td className={`py-3 px-5 font-bold text-right ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'Income' ? '+' : '-'} {formatIDR(t.amount)}
                    </td>
                    <td className="py-3 px-5">
                      <span className={`text-xs px-2 py-0.5 rounded-lg font-bold border ${typePill}`}>
                        {t.type === 'Income' ? 'Kas Masuk' : 'Kas Keluar'}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{t.status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
