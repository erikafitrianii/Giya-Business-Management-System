import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  UserPlus, 
  Mail, 
  MapPin, 
  Tag, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { Customer } from '../types';

interface CustomersViewProps {
  customers: Customer[];
  onAddCustomer?: (c: Customer) => void;
}

export default function CustomersView({ customers }: CustomersViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Pending' | 'Inactive'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Metrics cards
  const metrics = useMemo(() => {
    const total = customers.length;
    const active = customers.filter(c => c.status === 'Active').length;
    const vip = customers.filter(c => c.spent > 5000000).length;
    return { total, active, vip };
  }, [customers]);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    let result = customers;

    if (activeFilter !== 'All') {
      result = result.filter(c => c.status === activeFilter);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term)
      );
    }

    return result;
  }, [customers, activeFilter, searchTerm]);

  // Pagination
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;

  // Export Customer List
  const handleExportCustomers = () => {
    let csv = "Customer ID,Name,Email,Location,Joined Date,Orders Count,Spent,Status\n";
    filteredCustomers.forEach(c => {
      csv += `${c.id},"${c.name}",${c.email},"${c.location}",${c.joinedDate},${c.ordersCount},${c.spent},${c.status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Giya_Customers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to generate elegant, compact page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show page 1
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-950 font-sans tracking-tight">Daftar Pelanggan</h1>
          <p className="text-sm text-pink-700/80">Pantau loyalitas pembeli, riwayat total belanja, dan kelompok pelanggan VIP Anda.</p>
        </div>
        <button 
          onClick={handleExportCustomers}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-sm whitespace-nowrap"
        >
          <Download className="w-4.5 h-4.5" />
          <span>Ekspor Pelanggan</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs relative overflow-hidden">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Pelanggan</p>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1 font-sans">{metrics.total.toLocaleString('id-ID')}</h3>
          <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 rounded-full" style={{ width: '80%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs relative overflow-hidden">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pelanggan Aktif</p>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1 font-sans">{metrics.active.toLocaleString('id-ID')}</h3>
          <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs relative overflow-hidden">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Anggota VIP (Spent &gt; 5jt)</p>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1 font-sans">{metrics.vip.toLocaleString('id-ID')}</h3>
          <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }} />
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
        <div className="border-b border-pink-50 flex flex-col md:flex-row items-center justify-between p-4 gap-4 bg-pink-50/10">
          <div className="flex gap-1">
            {(['All', 'Active', 'Pending', 'Inactive'] as const).map((tab) => {
              const names = { All: 'Semua', Active: 'Aktif', Pending: 'Menunggu', Inactive: 'Nonaktif' };
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveFilter(tab); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs' 
                      : 'text-pink-900/70 hover:bg-pink-50'
                  }`}
                >
                  {names[tab]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, email, kota asal..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-pink-100 bg-white placeholder-pink-300 focus:outline-hidden focus:ring-2 focus:ring-pink-400 text-slate-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/20 text-pink-950/70 text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5 border-b border-pink-50">Pelanggan</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Lokasi</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Tanggal Gabung</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Total Pesanan</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Total Belanja</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Status</th>
                <th className="py-3.5 px-5 border-b border-pink-50 text-center">Tipe Member</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-sm">
              {paginatedCustomers.map((c) => {
                const statusColor = 
                  c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  c.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-rose-50 text-rose-700 border-rose-100';

                const isVip = c.spent >= 5000000;

                return (
                  <tr key={c.id} className="hover:bg-pink-50/10 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center font-bold text-pink-700 text-xs select-none">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <Mail className="w-2.5 h-2.5 text-pink-300" />
                            <span>{c.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        <span>{c.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-mono">
                      {new Date(c.joinedDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-semibold">{c.ordersCount} kali</td>
                    <td className="py-3.5 px-5 font-bold text-slate-800">{formatIDR(c.spent)}</td>
                    <td className="py-3.5 px-5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${statusColor}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      {isVip ? (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded-lg font-extrabold uppercase shadow-2xs">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500 animate-pulse" />
                          <span>VIP Member</span>
                        </span>
                      ) : (
                        <span className="inline-block bg-slate-50 border border-slate-100 text-slate-400 text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase">
                          Reguler
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 bg-pink-50/10 border-t border-pink-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {((currentPage - 1) * itemsPerPage) + 1} s/d {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length} pelanggan
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-xl border border-pink-100 bg-white text-pink-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-50 transition-all flex items-center justify-center cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {getPageNumbers().map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-400 select-none">
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs' 
                        : 'bg-white border border-pink-100 text-pink-600 hover:bg-pink-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-xl border border-pink-100 bg-white text-pink-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-50 transition-all flex items-center justify-center cursor-pointer"
                title="Halaman Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
