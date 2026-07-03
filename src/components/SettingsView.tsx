import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Home, 
  Store, 
  Bell, 
  Save, 
  CheckCircle2,
  FileSpreadsheet,
  Link,
  Sparkles,
  RefreshCw,
  Pin,
  Trash2
} from 'lucide-react';
import SetupGuide from './SetupGuide';

interface SettingsViewProps {
  gasUrl: string;
  onSaveGasUrl: (url: string) => void;
  onResetGasUrl: () => void;
  onResetToDemoData: () => void;
  onSetCurrentAsDefault: () => void;
  onClearCustomDefault: () => void;
  hasCustomDefault: boolean;
  connectionStatus: 'idle' | 'success' | 'failed';
  lastSynced: string | null;
  isTesting: boolean;
  errorMessage: string;
}

export default function SettingsView({
  gasUrl,
  onSaveGasUrl,
  onResetGasUrl,
  onResetToDemoData,
  onSetCurrentAsDefault,
  onClearCustomDefault,
  hasCustomDefault,
  connectionStatus,
  lastSynced,
  isTesting,
  errorMessage
}: SettingsViewProps) {

  // Profile Form States
  const [fullName, setFullName] = useState(() => localStorage.getItem('giya_user_name') || 'Erika Fitriani');
  const [emailAddress, setEmailAddress] = useState(() => localStorage.getItem('giya_user_email') || 'fitriani.erika26@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('giya_user_phone') || '+62 812 3456 7890');
  const [storeName, setStoreName] = useState(() => localStorage.getItem('giya_user_store') || 'Admin Giya');
  const [address, setAddress] = useState(() => localStorage.getItem('giya_user_address') || 'Jl. Raya Banjar, West Java, Indonesia');

  // Apps Script Web App Input
  const [urlInput, setUrlInput] = useState(gasUrl);
  const [showGuide, setShowGuide] = useState(false);

  // Notification states
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [lowStockNotif, setLowStockNotif] = useState(true);
  const [newOrderNotif, setNewOrderNotif] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('giya_user_name', fullName);
    localStorage.setItem('giya_user_email', emailAddress);
    localStorage.setItem('giya_user_phone', phoneNumber);
    localStorage.setItem('giya_user_store', storeName);
    localStorage.setItem('giya_user_address', address);

    setToastMessage("Informasi profil berhasil disimpan!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSync = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGasUrl(urlInput);
    setToastMessage("URL Google Apps Script disimpan! Melakukan tes koneksi...");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-pink-950 font-sans tracking-tight">Pengaturan Aplikasi</h1>
        <p className="text-sm text-pink-700/80">Sesuaikan data identitas Giya Store, preferensi notifikasi, dan sambungan Google Sheets.</p>
      </div>

      {toastMessage && (
        <div className="bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs animate-pulse">
          {toastMessage}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Information */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-pink-50 flex items-center gap-2 bg-pink-50/10">
            <User className="w-5 h-5 text-pink-500" />
            <h3 className="font-bold text-slate-800 text-sm">Informasi Profil Toko</h3>
          </div>
          
          <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pemilik</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Penanggungjawab</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Whatsapp / Telepon</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Outlet / Toko</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Toko Lengkap</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full text-xs p-3 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400 resize-none"
              />
            </div>

            <div className="pt-3 border-t border-pink-50 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Integration Syncing Settings */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-pink-50 flex items-center gap-2 bg-pink-50/10">
            <FileSpreadsheet className="w-5 h-5 text-pink-500" />
            <h3 className="font-bold text-slate-800 text-sm">Integrasi Google Sheets</h3>
          </div>

          <form onSubmit={handleSaveSync} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Google Apps Script Web App URL</label>
              <input
                type="url"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-pink-100 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-pink-400 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                Gunakan URL Deploy Web App Apps Script Anda agar data inventaris aksesoris sinkron secara real-time dua arah ke spreadsheet.
              </p>
            </div>

            {/* Connection Status representation */}
            <div className="p-3 bg-pink-50/50 border border-pink-50 rounded-xl space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Status Koneksi:</span>
              <div className="flex items-center gap-2">
                {isTesting ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                    <span className="text-xs font-bold text-pink-700 animate-pulse">Menghubungkan & Menguji...</span>
                  </>
                ) : connectionStatus === 'success' ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-700">Terkoneksi Berhasil</span>
                  </>
                ) : connectionStatus === 'failed' ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-bold text-rose-700">Koneksi Gagal / Putus</span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <span className="text-xs font-bold text-slate-500">Demo Lokal (Tanpa Sheets)</span>
                  </>
                )}
              </div>
              {lastSynced && (
                <span className="text-[10px] text-slate-400 font-mono font-medium block">
                  Terakhir sinkronisasi: {lastSynced}
                </span>
              )}
            </div>

            {connectionStatus === 'failed' && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center gap-2 text-rose-800 font-bold">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold">!</span>
                  <span>Solusi Diagnosis Kegagalan Koneksi:</span>
                </div>
                
                <div className="text-slate-600 space-y-2.5 leading-relaxed bg-white/60 p-3 rounded-xl border border-rose-100/50">
                  <p className="font-semibold text-rose-900">
                    Sistem mendeteksi tautan Apps Script Anda memerlukan otentikasi login Google (Error CORS / Redirect). Ini berarti aksesnya masih terkunci!
                  </p>
                  
                  <div className="space-y-2 pl-1.5 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-rose-600 mt-0.5">1.</span>
                      <p>
                        <strong className="text-slate-900">Ubah "Who has access" ke "Anyone":</strong><br />
                        Di editor Apps Script Anda, klik tombol <strong className="text-slate-900">Deploy &gt; Manage deployments</strong> (atau <strong className="text-slate-900">New deployment</strong>). Klik ikon pensil untuk mengedit, lalu pada bagian <strong className="text-rose-700">"Who has access"</strong>, pastikan Anda memilih <strong className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded">"Anyone"</strong> (Siapa saja, bahkan anonim). Jika diatur ke "Only myself" atau "Anyone with Google Account", tautan Anda akan selalu memicu login Google dan koneksi ke dashboard akan ditolak demi keamanan.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-rose-600 mt-0.5">2.</span>
                      <p>
                        <strong className="text-slate-900">Pastikan bukan link "Test Deployment":</strong><br />
                        Gunakan URL yang diakhiri dengan <code className="font-mono bg-rose-50/50 px-1 text-rose-800 font-bold">/exec</code>. Jangan gunakan URL editor atau URL test deployment yang berakhir dengan <code className="font-mono bg-slate-100 px-1 text-slate-700">/dev</code> karena itu membutuhkan login akun Google Anda.
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="font-bold text-rose-600 mt-0.5">3.</span>
                      <p>
                        <strong className="text-slate-900">Deploy Ulang Setiap Ada Perubahan Kode:</strong><br />
                        Jika Anda mengedit kode Apps Script, Anda harus membuat versi baru dengan cara klik <strong className="text-slate-900">Deploy &gt; Manage deployments &gt; Edit (Pensil) &gt; Version: New Version &gt; Deploy</strong> agar perubahannya diterapkan ke link publik.
                      </p>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-[10px] font-mono text-rose-500 bg-rose-100/30 p-2 rounded-lg border border-rose-100">
                    Sebab Detail: {errorMessage}
                  </p>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowGuide(!showGuide)}
                className="w-full py-2.5 px-4 rounded-xl border border-pink-200 text-pink-600 hover:bg-pink-50 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-pink-50/20"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{showGuide ? "Sembunyikan Panduan & Kode Script" : "Buka Panduan Langkah-Demi-Langkah & Kode Script"}</span>
              </button>
            </div>

            <div className="pt-3 border-t border-pink-50 flex items-center justify-between gap-4">
              {gasUrl && (
                <button
                  type="button"
                  onClick={() => { onResetGasUrl(); setUrlInput(''); }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Putuskan Sambungan
                </button>
              )}
              <button
                type="submit"
                disabled={isTesting || !urlInput}
                className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer ml-auto"
              >
                <Link className="w-4 h-4" />
                <span>{isTesting ? "Menghubungkan..." : "Simpan & Tes Koneksi"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Render Step by Step Guide when toggled */}
        {showGuide && (
          <div className="md:col-span-2">
            <SetupGuide 
              gasUrl={urlInput}
              setGasUrl={setUrlInput}
              onTestConnection={() => onSaveGasUrl(urlInput)}
              isTesting={isTesting}
              connectionStatus={connectionStatus}
              errorMessage={errorMessage}
            />
          </div>
        )}

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden md:col-span-2">
          <div className="p-5 border-b border-pink-50 flex items-center gap-2 bg-pink-50/10">
            <Bell className="w-5 h-5 text-pink-500" />
            <h3 className="font-bold text-slate-800 text-sm">Preferensi Pemberitahuan</h3>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-pink-50/20 border border-pink-50 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Notifikasi Email Rekap Harian</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Kirim rekap inventaris harian ke inbox email Anda.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                  className="w-4 h-4 accent-pink-500 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-pink-50/20 border border-pink-50 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Peringatan Whatsapp / SMS</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Kirim SMS instan jika terjadi reorder mendesak.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={(e) => setSmsNotif(e.target.checked)}
                  className="w-4 h-4 accent-pink-500 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-pink-50/20 border border-pink-50 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Peringatan Stok Rendah (Low Stock)</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Beritahu di layar jika stok aksesoris di bawah ROP.</p>
                </div>
                <input
                  type="checkbox"
                  checked={lowStockNotif}
                  onChange={(e) => setLowStockNotif(e.target.checked)}
                  className="w-4 h-4 accent-pink-500 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-pink-50/20 border border-pink-50 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Notifikasi Pesanan Baru (Real-time)</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Bunyikan alert suara jika ada pelanggan checkout.</p>
                </div>
                <input
                  type="checkbox"
                  checked={newOrderNotif}
                  onChange={(e) => setNewOrderNotif(e.target.checked)}
                  className="w-4 h-4 accent-pink-500 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Setelan Awal & Pemulihan Data Section */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden md:col-span-2 mt-6">
          <div className="p-5 border-b border-pink-50 flex items-center justify-between bg-pink-50/10">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-pink-500 animate-spin-slow" />
              <h3 className="font-bold text-slate-800 text-sm">Setelan Awal & Pemulihan Data</h3>
            </div>
            {hasCustomDefault && (
              <span className="px-2.5 py-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Setelan Awal Kustom Aktif</span>
              </span>
            )}
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-pink-50">
            {/* Card 1: Tetapkan Setelan Awal Baru */}
            <div className="space-y-4 pb-6 md:pb-0 md:pr-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Pin className="w-4 h-4 text-pink-500" />
                  <h4 className="text-xs font-bold text-slate-700">Tetapkan Halaman Ini Sebagai Setelan Awal</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Menjadikan seluruh data di halaman sekarang (katalog SKU, transaksi kas, riwayat pesanan, profil pelanggan, dan supplier) sebagai <strong>data acuan default</strong>. Ketika tombol reset ditekan, data akan dipulihkan ke keadaan saat ini.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Apakah Anda yakin ingin menetapkan data di seluruh halaman sekarang sebagai data setelan awal baru?")) {
                      onSetCurrentAsDefault();
                    }
                  }}
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Pin className="w-3.5 h-3.5" />
                  <span>Jadikan Setelan Awal</span>
                </button>

                {hasCustomDefault && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Apakah Anda yakin ingin menghapus setelan awal kustom dan kembali ke data default pabrik Giya semula?")) {
                        onClearCustomDefault();
                      }
                    }}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 text-slate-500 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Hapus setelan awal kustom"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Kustom</span>
                  </button>
                )}
              </div>
            </div>

            {/* Card 2: Reset Data ke Setelan Awal */}
            <div className="space-y-4 pt-6 md:pt-0 md:pl-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-rose-500" />
                  <h4 className="text-xs font-bold text-rose-950">Reset Semua Data ke Setelan Awal</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Menghapus seluruh perubahan sementara dan memulihkan seluruh aplikasi ke <strong>data setelan awal</strong> {hasCustomDefault ? "kustom Anda" : "bawaan asli Giya"}. Sambungan Google Sheets juga akan diputus sementara untuk pemulihan demo lokal.
                </p>
              </div>
              
              <div className="pt-2">
                <button
                  type="button"
                  id="btn_reset_demo_data"
                  onClick={() => {
                    const confirmMsg = hasCustomDefault 
                      ? "Apakah Anda yakin ingin menyetel ulang semua data kembali ke setelan awal kustom yang Anda buat sebelumnya?"
                      : "Apakah Anda yakin ingin menyetel ulang semua data kembali ke setelan awal bawaan Giya?";
                    if (window.confirm(confirmMsg)) {
                      onResetToDemoData();
                    }
                  }}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 hover:border-rose-300 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Data Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
