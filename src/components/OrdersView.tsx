import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Ban, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Order, Product } from '../types';

interface OrdersViewProps {
  orders: Order[];
  products: Product[];
  onAddOrder: (order: Order) => void;
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
}

export default function OrdersView({ 
  orders, 
  products, 
  onAddOrder, 
  onUpdateOrderStatus 
}: OrdersViewProps) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Completed' | 'Pending' | 'In Progress' | 'Cancelled'>('All');
  
  // Modal State
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // New Order Form States
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Bank Transfer' | 'COD' | 'E-Wallet'>('Credit Card');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Formatting helper
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = orders.length;
    const completed = orders.filter(o => o.status === 'Completed').length;
    const pending = orders.filter(o => o.status === 'Pending').length;
    const cancelled = orders.filter(o => o.status === 'Cancelled').length;

    return { total, completed, pending, cancelled };
  }, [orders]);

  // Filters
  const filteredOrders = useMemo(() => {
    let result = orders;
    
    if (activeTab !== 'All') {
      result = result.filter(o => o.status === activeTab);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(o => 
        o.id.toLowerCase().includes(term) ||
        o.clientName.toLowerCase().includes(term) ||
        o.email.toLowerCase().includes(term) ||
        o.productNames.some(name => name.toLowerCase().includes(term))
      );
    }

    return [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders, activeTab, searchTerm]);

  // Paginated data
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;

  // Handle Save New Order
  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || selectedProductIds.length === 0) {
      alert("Harap isi nama pelanggan dan pilih minimal satu aksesoris!");
      return;
    }

    // Calculate total amount based on selected products
    const selectedProducts = products.filter(p => selectedProductIds.includes(p.id));
    const totalAmount = selectedProducts.reduce((sum, p) => sum + p.sellingPrice, 0);
    const names = selectedProducts.map(p => p.name);

    const newOrder: Order = {
      id: `#ORD-00${Math.floor(10 + Math.random() * 90)}`,
      clientName,
      email: email || `${clientName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      date: new Date().toISOString().split('T')[0],
      amount: totalAmount,
      itemsCount: selectedProductIds.length,
      paymentMethod,
      status: 'Pending',
      productNames: names
    };

    onAddOrder(newOrder);
    
    // Reset Form
    setClientName('');
    setEmail('');
    setSelectedProductIds([]);
    setPaymentMethod('Credit Card');
    setIsNewOrderOpen(false);
  };

  const toggleProductSelection = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  // Export Order to CSV
  const handleExportOrders = () => {
    let csv = "Order ID,Client Name,Email,Date,Amount,Items Count,Payment Method,Status\n";
    filteredOrders.forEach(o => {
      csv += `${o.id},"${o.clientName}",${o.email},${o.date},${o.amount},${o.itemsCount},${o.paymentMethod},${o.status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Giya_Orders_${new Date().toISOString().split('T')[0]}.csv`);
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
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-950 font-sans tracking-tight">Manajemen Pesanan</h1>
          <p className="text-sm text-pink-700/80">Proses transaksi masuk, update pengiriman, dan kelola invoice pelanggan.</p>
        </div>
        <button 
          onClick={() => setIsNewOrderOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-sm whitespace-nowrap"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Buat Pesanan Baru</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Pesanan</p>
            <h4 className="text-xl font-bold text-slate-800 font-sans mt-0.5">{metrics.total}</h4>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded-sm">+12% minggu ini</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Selesai</p>
            <h4 className="text-xl font-bold text-slate-800 font-sans mt-0.5">{metrics.completed}</h4>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded-sm">+8% minggu ini</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tertunda (Pending)</p>
            <h4 className="text-xl font-bold text-slate-800 font-sans mt-0.5">{metrics.pending}</h4>
            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1 rounded-sm">-3% minggu ini</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Ban className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Dibatalkan</p>
            <h4 className="text-xl font-bold text-slate-800 font-sans mt-0.5">{metrics.cancelled}</h4>
            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1 rounded-sm">-14% minggu ini</span>
          </div>
        </div>
      </div>

      {/* Orders Filter & Controls */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
        {/* Navigation subtabs */}
        <div className="border-b border-pink-50 flex flex-wrap items-center justify-between p-4 gap-4 bg-pink-50/10">
          <div className="flex flex-wrap gap-1">
            {(['All', 'Completed', 'In Progress', 'Pending', 'Cancelled'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs' 
                      : 'text-pink-900/70 hover:bg-pink-50'
                  }`}
                >
                  {tab === 'All' ? 'Semua Pesanan' : tab}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari order, pelanggan..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-pink-100 bg-white placeholder-pink-300 focus:outline-hidden focus:ring-2 focus:ring-pink-400 transition-all text-slate-700"
              />
            </div>
            {/* Export CSV button */}
            <button 
              onClick={handleExportOrders}
              className="flex items-center gap-1.5 bg-white border border-pink-100 hover:bg-pink-50/50 text-pink-700 font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/20 text-pink-950/70 text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5 border-b border-pink-50">Order ID</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Nama Pelanggan</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Tanggal</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Total Bayar</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Jumlah Item</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Metode Pembayaran</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Status</th>
                <th className="py-3.5 px-5 border-b border-pink-50 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-sm">
              {paginatedOrders.map((order) => {
                const statusColor = 
                  order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  order.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                  order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-rose-50 text-rose-700 border-rose-100';

                return (
                  <tr key={order.id} className="hover:bg-pink-50/10 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-xs font-semibold text-slate-800">{order.id}</td>
                    <td className="py-3.5 px-5">
                      <div className="font-medium text-slate-700">{order.clientName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{order.email}</div>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500">
                      {new Date(order.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-800">{formatIDR(order.amount)}</td>
                    <td className="py-3.5 px-5 text-slate-500 text-center sm:text-left">{order.itemsCount} pcs</td>
                    <td className="py-3.5 px-5">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <button 
                        onClick={() => setViewingOrder(order)}
                        className="p-1.5 hover:bg-pink-50 text-pink-600 hover:text-pink-700 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400">
                    Tidak ada pesanan ditemukan yang sesuai dengan kriteria pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        {totalPages > 1 && (
          <div className="p-4 bg-pink-50/10 border-t border-pink-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {((currentPage - 1) * itemsPerPage) + 1} s/d {Math.min(currentPage * itemsPerPage, filteredOrders.length)} dari {filteredOrders.length} hasil
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

      {/* NEW ORDER MODAL */}
      {isNewOrderOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-pink-100 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-pink-50 flex justify-between items-center bg-pink-50/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-slate-800">Form Pembuatan Pesanan Baru</h3>
              </div>
              <button onClick={() => setIsNewOrderOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOrder} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pelanggan *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Erika Fitriani"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Pelanggan</label>
                <input
                  type="email"
                  placeholder="pelanggan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                >
                  <option value="Credit Card">Kartu Kredit</option>
                  <option value="Bank Transfer">Transfer Bank (Virtual Account)</option>
                  <option value="E-Wallet">E-Wallet (OVO, GoPay, ShopeePay)</option>
                  <option value="COD">Bayar di Tempat (COD)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pilih Aksesoris Giya * (Bisa pilih lebih dari satu)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-pink-50 rounded-xl bg-pink-50/10">
                  {products.slice(0, 15).map((p) => {
                    const isSelected = selectedProductIds.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleProductSelection(p.id)}
                        className={`text-left p-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between border cursor-pointer ${
                          isSelected 
                            ? 'bg-pink-100 border-pink-300 text-pink-900' 
                            : 'bg-white border-slate-100 text-slate-600 hover:border-pink-200'
                        }`}
                      >
                        <div className="truncate">
                          <p className="font-bold truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{formatIDR(p.sellingPrice)}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-3.5 h-3.5 accent-pink-500"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-pink-50 flex items-center justify-between bg-pink-50/20 -mx-6 -mb-6 p-5">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Estimasi Tagihan</span>
                  <span className="text-base font-extrabold text-pink-600">
                    {formatIDR(products.filter(p => selectedProductIds.includes(p.id)).reduce((sum, p) => sum + p.sellingPrice, 0))}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewOrderOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md cursor-pointer"
                  >
                    Simpan Pesanan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ORDER DETAIL MODAL */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-pink-100">
            <div className="p-5 border-b border-pink-50 flex justify-between items-center bg-pink-50/20">
              <h3 className="font-bold text-slate-800 text-base">Detail Pesanan {viewingOrder.id}</h3>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pelanggan</span>
                <p className="text-sm font-bold text-slate-800">{viewingOrder.clientName}</p>
                <p className="text-xs text-slate-500 font-mono">{viewingOrder.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-pink-50 py-3.5">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tanggal Transaksi</span>
                  <p className="text-xs font-semibold text-slate-700">
                    {new Date(viewingOrder.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Metode Bayar</span>
                  <p className="text-xs font-semibold text-slate-700">{viewingOrder.paymentMethod}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Item Aksesoris</span>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {viewingOrder.productNames.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-pink-50/30 rounded-lg text-xs font-medium text-pink-950">
                      <div className="w-2 h-2 rounded-full bg-pink-400" />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-pink-50">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Tagihan</span>
                  <p className="text-base font-extrabold text-pink-600">{formatIDR(viewingOrder.amount)}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ubah Status</span>
                  <select
                    value={viewingOrder.status}
                    onChange={(e) => {
                      onUpdateOrderStatus(viewingOrder.id, e.target.value as any);
                      setViewingOrder(prev => prev ? { ...prev, status: e.target.value as any } : null);
                    }}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-pink-100 bg-white font-semibold text-slate-700 focus:ring-1 focus:ring-pink-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 bg-pink-50/10 border-t border-pink-50 flex justify-end">
              <button 
                onClick={() => setViewingOrder(null)} 
                className="px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
