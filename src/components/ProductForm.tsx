import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3, Trash } from 'lucide-react';
import { Product } from '../types';

interface ProductFormProps {
  product: Product | null; // Null if adding a new one
  onSave: (p: Product) => void;
  onClose: () => void;
  availableCategories: string[];
}

export default function ProductForm({ product, onSave, onClose, availableCategories }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    id: '',
    sku: '',
    name: '',
    category: 'Necklace',
    brand: '',
    material: '',
    unit: 'pcs',
    costPrice: 0,
    sellingPrice: 0,
    profitMargin: 0,
    currentStock: 0,
    safetyStock: 0,
    reorderPoint: 0,
    eoq: 0,
    leadTime: 0,
    lastPurchaseDate: '',
    lastSalesDate: '',
    status: 'Active',
    avgDailyDemand: 0,
    imageUrl: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      // Set defaults for a new product
      const newId = 'PRD' + String(Math.floor(Math.random() * 900) + 100);
      setFormData({
        id: newId,
        sku: 'GYA-' + newId,
        name: '',
        category: 'Necklace',
        brand: 'Giya Gold',
        material: 'Gold 18K',
        unit: 'pcs',
        costPrice: 100000,
        sellingPrice: 150000,
        profitMargin: 33.3,
        currentStock: 100,
        safetyStock: 5,
        reorderPoint: 10,
        eoq: 20,
        leadTime: 7,
        lastPurchaseDate: new Date().toISOString().split('T')[0],
        lastSalesDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        avgDailyDemand: 0.5,
        imageUrl: '',
      });
    }
  }, [product]);

  // Recalculate profit margin and inventory value dynamically as the user types prices
  const handlePriceChange = (field: 'costPrice' | 'sellingPrice', val: number) => {
    const updated = { ...formData, [field]: val };
    const cost = field === 'costPrice' ? val : (formData.costPrice || 0);
    const sell = field === 'sellingPrice' ? val : (formData.sellingPrice || 0);
    
    if (sell > 0) {
      const margin = ((sell - cost) / sell) * 100;
      updated.profitMargin = parseFloat(margin.toFixed(1));
    } else {
      updated.profitMargin = 0;
    }
    
    // Calculate inventory value
    const stock = formData.currentStock || 0;
    updated.inventoryValue = cost * stock;

    setFormData(updated);
  };

  const handleStockChange = (val: number) => {
    const cost = formData.costPrice || 0;
    setFormData({
      ...formData,
      currentStock: val,
      inventoryValue: cost * val
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${product ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {product ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-sans font-semibold text-base text-slate-900">
                {product ? 'Edit SKU Aksesoris' : 'Tambah SKU Aksesoris Baru'}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {formData.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-semibold text-slate-400 uppercase tracking-wider">Informasi Dasar</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  placeholder="Contoh: Kalung Mutiara Classic"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Kode SKU</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-mono font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  placeholder="GYA-NEC-0001"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                >
                  {availableCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Brand / Merek</label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  placeholder="Elora Fine Jewels"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Bahan / Material</label>
                <input
                  type="text"
                  required
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  placeholder="Gold 18K"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-sans font-medium text-slate-600">URL Gambar Produk (Opsional)</label>
                <input
                  type="url"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:col-span-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-medium text-slate-600">Satuan</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                    placeholder="pcs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-medium text-slate-600">Status SKU</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  >
                    <option value="Active">Aktif</option>
                    <option value="Inactive">Tidak Aktif</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Finance */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-sans font-semibold text-slate-400 uppercase tracking-wider">Harga & Keuangan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Harga Beli (Cost Price)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-sans font-semibold text-slate-400">Rp</span>
                  <input
                    type="number"
                    required
                    value={formData.costPrice || ''}
                    onChange={(e) => handlePriceChange('costPrice', parseInt(e.target.value) || 0)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Harga Jual (Selling Price)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-sans font-semibold text-slate-400">Rp</span>
                  <input
                    type="number"
                    required
                    value={formData.sellingPrice || ''}
                    onChange={(e) => handlePriceChange('sellingPrice', parseInt(e.target.value) || 0)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/55 flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 font-sans">Profit Margin Otomatis</span>
                <span className="text-base font-sans font-bold text-slate-900 mt-1">
                  {formData.profitMargin || 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Stock Parameters */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-sans font-semibold text-slate-400 uppercase tracking-wider">Metrik Inventaris & Parameter EOQ</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Stok Sekarang</label>
                <input
                  type="number"
                  required
                  value={formData.currentStock || ''}
                  onChange={(e) => handleStockChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Safety Stock</label>
                <input
                  type="number"
                  required
                  value={formData.safetyStock || ''}
                  onChange={(e) => setFormData({ ...formData, safetyStock: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Reorder Point (ROP)</label>
                <input
                  type="number"
                  required
                  value={formData.reorderPoint || ''}
                  onChange={(e) => setFormData({ ...formData, reorderPoint: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">EOQ</label>
                <input
                  type="number"
                  required
                  value={formData.eoq || ''}
                  onChange={(e) => setFormData({ ...formData, eoq: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Lead Time (hari)</label>
                <input
                  type="number"
                  required
                  value={formData.leadTime || ''}
                  onChange={(e) => setFormData({ ...formData, leadTime: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Permintaan Harian Rata-rata</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.avgDailyDemand || ''}
                  onChange={(e) => setFormData({ ...formData, avgDailyDemand: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Tgl Pembelian Terakhir</label>
                <input
                  type="date"
                  required
                  value={formData.lastPurchaseDate}
                  onChange={(e) => setFormData({ ...formData, lastPurchaseDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-slate-600">Tgl Penjualan Terakhir</label>
                <input
                  type="date"
                  required
                  value={formData.lastSalesDate}
                  onChange={(e) => setFormData({ ...formData, lastSalesDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-end gap-3 bg-slate-50/50 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-sans font-medium text-slate-500 hover:bg-slate-100/50 hover:text-slate-800 transition-all active:scale-95"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-sans font-semibold transition-all shadow-sm active:scale-95"
          >
            {product ? 'Simpan Perubahan' : 'Tambahkan Produk'}
          </button>
        </div>
      </div>
    </div>
  );
}
