import React, { useState, useMemo } from 'react';
import { 
  Users, 
  MapPin, 
  Phone, 
  Star, 
  Plus, 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  FileText, 
  Clock, 
  DollarSign,
  Sparkles
} from 'lucide-react';
import { Supplier, Product } from '../types';

interface SuppliersViewProps {
  suppliers: Supplier[];
  products: Product[];
  onAddSupplier: (supplier: Supplier) => void;
  onPlacePO: (supplierId: string, productId: string, qty: number, pricePerUnit: number) => void;
}

export default function SuppliersView({
  suppliers,
  products,
  onAddSupplier,
  onPlacePO
}: SuppliersViewProps) {

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPOOpen, setIsPOOpen] = useState(false);

  // New Supplier Form State
  const [name, setName] = useState('');
  const [material, setMaterial] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [leadTime, setLeadTime] = useState(5);
  const [rating, setRating] = useState(4.5);

  // PO Form State
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [poQty, setPoQty] = useState(50);

  // Form handle Supplier
  const handleSaveSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !material || !contactName) {
      alert("Harap isi semua kolom wajib!");
      return;
    }

    const newSupplier: Supplier = {
      id: `#SPL-0${Math.floor(10 + Math.random() * 90)}`,
      name,
      material,
      contactName,
      phone: phone || '+62 821-xxxx-xxxx',
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@supplier.com`,
      location: location || 'Bandung, Jawa Barat',
      leadTime,
      rating,
      ordersPlaced: 0,
      outstandingAmount: 0
    };

    onAddSupplier(newSupplier);
    
    // Reset Form
    setName('');
    setMaterial('');
    setContactName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setLeadTime(5);
    setRating(4.5);
    setIsAddOpen(false);
  };

  // Form handle Purchase Order (PO)
  const handleSavePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplierId || !selectedProductId || poQty <= 0) {
      alert("Harap pilih supplier, barang, dan kuantitas valid!");
      return;
    }

    const matchedProduct = products.find(p => p.id === selectedProductId);
    const unitPrice = matchedProduct ? matchedProduct.costPrice : 500000;

    onPlacePO(selectedSupplierId, selectedProductId, poQty, unitPrice);
    
    alert(`Sukses mengirim Purchase Order (PO) sebanyak ${poQty} pcs ke Supplier! Menunggu konfirmasi pengiriman.`);
    setIsPOOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-950 font-sans tracking-tight">Kemitraan & Supplier</h1>
          <p className="text-sm text-pink-700/80">
            Daftar pengrajin aksesoris, vendor, dan logistik Giya.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPOOpen(true)}
            className="flex items-center justify-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer text-sm"
          >
            <Send className="w-4.5 h-4.5" />
            <span>Kirim PO Baru</span>
          </button>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-sm whitespace-nowrap"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Tambah Supplier</span>
          </button>
        </div>
      </div>

      {/* Overview stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-pink-50 text-pink-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Vendor Aktif</p>
            <h4 className="text-xl font-bold text-slate-800 font-sans mt-0.5">{suppliers.length} Vendor</h4>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded-sm">100% On-time SLA</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Rata-Rata Lead Time</p>
            <h4 className="text-xl font-bold text-slate-800 font-sans mt-0.5">5.2 Hari</h4>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded-sm">Sangat Cepat</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Pesanan PO</p>
            <h4 className="text-xl font-bold text-slate-800 font-sans mt-0.5">48 Kali</h4>
            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1 rounded-sm">Tersinkronisasi</span>
          </div>
        </div>
      </div>

      {/* Main suppliers table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-pink-50 bg-pink-50/10 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm">Direktori Rekanan Vendor</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/20 text-pink-950/70 text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5 border-b border-pink-50">ID Vendor</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Nama Supplier</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Bahan Utama</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Lokasi / Kota</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Kontak Person</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Lead Time (SLA)</th>
                <th className="py-3.5 px-5 border-b border-pink-50">Bintang Rating</th>
                <th className="py-3.5 px-5 border-b border-pink-50 text-center">Status Hubungan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-sm">
              {suppliers.map((s) => {
                return (
                  <tr key={s.id} className="hover:bg-pink-50/10 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-xs font-semibold text-slate-800">{s.id}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-800">{s.name}</td>
                    <td className="py-3.5 px-5">
                      <span className="text-xs bg-pink-50 text-pink-700 px-2.5 py-1 rounded-lg border border-pink-100 font-semibold">
                        {s.material || s.category || 'Emas & Perak'}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-300" />
                        <span>{s.location || 'Bandung, Jawa Barat'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="text-slate-700 font-medium">{s.contactName || s.contactPerson || 'Penanggung Jawab'}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{s.phone}</div>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-700 font-mono">{s.leadTime || s.leadTimeDays || 5} Hari</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1 text-amber-500 font-bold font-mono">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                        <span>{s.rating}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase">
                        Aktif / Terpercaya
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW SUPPLIER MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-pink-100">
            <div className="p-5 border-b border-pink-50 flex justify-between items-center bg-pink-50/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-slate-800">Tambah Supplier Rekanan Baru</h3>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSupplier} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Supplier *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: PT Mulia Gold Solder"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bahan Pasokan Utama *</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Perak Murni, Emas Batangan, Diamond"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak Person (Nama) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Ibu Shinta"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / WA</label>
                  <input
                    type="text"
                    placeholder="+62 821-..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Supplier</label>
                  <input
                    type="email"
                    placeholder="sales@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi / Kota</label>
                  <input
                    type="text"
                    placeholder="Cileunyi, Bandung"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lead Time (Hari)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={leadTime}
                    onChange={(e) => setLeadTime(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-pink-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md cursor-pointer"
                >
                  Simpan Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW PURCHASE ORDER (PO) MODAL */}
      {isPOOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-pink-100">
            <div className="p-5 border-b border-pink-50 flex justify-between items-center bg-pink-50/20">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-pink-500 animate-bounce" />
                <h3 className="font-bold text-slate-800">Kirim Purchase Order (PO)</h3>
              </div>
              <button onClick={() => setIsPOOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePO} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pilih Supplier Rekanan</label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:ring-2 focus:ring-pink-400"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.material})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pilih Bahan / Aksesoris Butuh Stok</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:ring-2 focus:ring-pink-400"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Stok: {p.currentStock})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jumlah Order (Pcs)</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={poQty}
                  onChange={(e) => setPoQty(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Estimate PO value */}
              {(() => {
                const p = products.find(prod => prod.id === selectedProductId);
                const price = p ? p.costPrice : 500000;
                const total = price * poQty;
                return (
                  <div className="p-3.5 bg-pink-50 border border-pink-100 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimasi Nilai Kontrak PO</span>
                    <span className="text-sm font-extrabold text-pink-600 block mt-0.5">{formatIDR(total)}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Dihitung berdasarkan Harga Pokok Produksi (HPP).</span>
                  </div>
                );
              })()}

              <div className="pt-4 border-t border-pink-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPOOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md cursor-pointer"
                >
                  Kirim PO Kontrak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
