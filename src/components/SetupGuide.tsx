import { useState } from 'react';
import { Copy, Check, Database, HelpCircle, FileText, ChevronRight, FileSpreadsheet, Download, Settings, RefreshCw, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { 
  gasCode,
  initialProducts,
  initialCustomers,
  initialOrders,
  initialSuppliers,
  initialTransactions
} from '../data';

interface SetupGuideProps {
  gasUrl: string;
  setGasUrl: (url: string) => void;
  onTestConnection: () => void;
  isTesting: boolean;
  connectionStatus: 'idle' | 'success' | 'failed';
  errorMessage: string;
}

export default function SetupGuide({
  gasUrl,
  setGasUrl,
  onTestConnection,
  isTesting,
  connectionStatus,
  errorMessage
}: SetupGuideProps) {
  interface ExcelColumn {
    col: string;
    name: string;
    type: string;
    sample: string;
    desc: string;
    formula?: string;
  }

  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [excelTab, setExcelTab] = useState<'products' | 'customers' | 'orders' | 'suppliers' | 'transactions'>('products');

  // Excel parameter customizer
  const [paramS, setParamS] = useState(150000); // Ordering cost (S)
  const [paramH, setParamH] = useState(20);     // Carrying cost rate (H%)
  const [paramZ, setParamZ] = useState(1.65);   // Safety factor Z
  const [copiedFormulaKey, setCopiedFormulaKey] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(gasCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormulaKey(key);
    setTimeout(() => setCopiedFormulaKey(null), 2000);
  };

  const handleDownloadExcel = () => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Tab 1: produk
      const productsHeaders = [
        "Product ID", "SKU", "Nama Produk", "Kategori", "Merek", "Bahan", "Satuan",
        "Harga Beli", "Harga Jual", "Margin Keuntungan", "Stok Sekarang",
        "Permintaan Harian", "Lead Time", "Stok Aman", "Reorder Point", "EOQ",
        "Nilai Inventaris", "Tanggal Beli Terakhir", "Tanggal Jual Terakhir", "Status"
      ];
      const productsRows = [productsHeaders];
      initialProducts.forEach((p, idx) => {
        const r = idx + 2; // Row idx starts from 2 (Header is Row 1)
        productsRows.push([
          p.id,
          p.sku,
          p.name,
          p.category,
          p.brand,
          p.material,
          p.unit,
          p.costPrice,
          p.sellingPrice,
          { f: `=(I${r}-H${r})/I${r}` },
          p.currentStock,
          p.avgDailyDemand,
          p.leadTime,
          { f: `=ROUND(${paramZ} * L${r} * SQRT(M${r}), 0)` },
          { f: `=(L${r} * M${r}) + N${r}` },
          { f: `=ROUND(SQRT((2 * (L${r} * 365) * ${paramS}) / (H${r} * ${paramH / 100})), 0)` },
          { f: `=K${r} * H${r}` },
          p.lastPurchaseDate,
          p.lastSalesDate,
          p.status
        ] as any);
      });
      const wsProducts = XLSX.utils.aoa_to_sheet(productsRows);
      XLSX.utils.book_append_sheet(wb, wsProducts, "produk");

      // Tab 2: pelanggan
      const customerHeaders = [
        "Customer ID", "Nama Pelanggan", "Email", "Lokasi", "Tanggal Gabung", "Jumlah Pesanan", "Total Belanja", "Status"
      ];
      const customerRows = [customerHeaders];
      initialCustomers.forEach(c => {
        customerRows.push([
          c.id,
          c.name,
          c.email,
          c.location,
          c.joinedDate,
          c.ordersCount,
          c.spent,
          c.status
        ] as any);
      });
      const wsCustomers = XLSX.utils.aoa_to_sheet(customerRows);
      XLSX.utils.book_append_sheet(wb, wsCustomers, "pelanggan");

      // Tab 3: pesanan
      const orderHeaders = [
        "Order ID", "Nama Pelanggan", "Email", "Tanggal", "Jumlah", "Jumlah Item", "Metode Pembayaran", "Status", "Nama Produk"
      ];
      const orderRows = [orderHeaders];
      initialOrders.forEach(o => {
        orderRows.push([
          o.id,
          o.clientName,
          o.email,
          o.date,
          o.amount,
          o.itemsCount,
          o.paymentMethod,
          o.status,
          o.productNames ? o.productNames.join(', ') : ''
        ] as any);
      });
      const wsOrders = XLSX.utils.aoa_to_sheet(orderRows);
      XLSX.utils.book_append_sheet(wb, wsOrders, "pesanan");

      // Tab 4: supplier
      const supplierHeaders = [
        "Supplier ID", "Nama Supplier", "Narahubung", "Email", "Telepon", "Kategori", "Lead Time Days", "Reliability", "Rating", "Status"
      ];
      const supplierRows = [supplierHeaders];
      initialSuppliers.forEach(s => {
        supplierRows.push([
          s.id,
          s.name,
          s.contactPerson,
          s.email,
          s.phone,
          s.category,
          s.leadTimeDays,
          s.reliability,
          s.rating,
          "Active"
        ] as any);
      });
      const wsSuppliers = XLSX.utils.aoa_to_sheet(supplierRows);
      XLSX.utils.book_append_sheet(wb, wsSuppliers, "supplier");

      // Tab 5: transaksi
      const transactionHeaders = [
        "Transaction ID", "Deskripsi", "Tanggal", "Kategori", "Jumlah", "Tipe", "Status"
      ];
      const transactionRows = [transactionHeaders];
      initialTransactions.forEach(t => {
        transactionRows.push([
          t.id,
          t.description,
          t.date,
          t.category,
          t.amount,
          t.type,
          t.status
        ] as any);
      });
      const wsTransactions = XLSX.utils.aoa_to_sheet(transactionRows);
      XLSX.utils.book_append_sheet(wb, wsTransactions, "transaksi");

      // Export file
      XLSX.writeFile(wb, "Giya_Master_Inventory_Template.xlsx");
    } catch (err) {
      console.error("Gagal mendownload Excel:", err);
      alert("Gagal membuat file Excel. Silakan coba lagi.");
    }
  };

  const steps = [
    {
      id: 1,
      title: "Siapkan Google Sheet",
      desc: "Buat Google Spreadsheet baru. Salin data Master Data aksesoris Anda ke dalamnya. Pastikan baris header kolom (seperti Product ID, SKU, dll) berada di baris pertama atau kedua secara jelas."
    },
    {
      id: 2,
      title: "Buka Apps Script",
      desc: "Di Google Sheet Anda, klik menu 'Extensions' (Ekstensi) > 'Apps Script'. Hapus kode bawaan yang ada di editor."
    },
    {
      id: 3,
      title: "Tempel Kode & Simpan",
      desc: "Salin kode Apps Script di bawah ini, tempel ke editor Apps Script Anda, lalu klik tombol Simpan (ikon disket)."
    },
    {
      id: 4,
      title: "Terapkan (Deploy)",
      desc: "Klik tombol 'Deploy' (Terapkan) di kanan atas > 'New deployment' (Terapkan baru). Pilih tipe 'Web app' (Aplikasi web). Atur 'Execute as' ke diri Anda, dan 'Who has access' ke 'Anyone' (Siapa saja, bahkan anonim). Klik Deploy."
    },
    {
      id: 5,
      title: "Hubungkan ke Dashboard",
      desc: "Salin 'Web App URL' yang dihasilkan saat deploy, lalu tempelkan ke kolom URL di bawah untuk mensinkronisasi dashboard Anda secara live!"
    }
  ];

  // Helper to get adapted formulas
  const getProductFormulas = (rowIdx: number = 2) => {
    const s = paramS;
    const hDecimal = paramH / 100;
    const z = paramZ;

    return {
      margin: `=(I${rowIdx}-H${rowIdx})/I${rowIdx}`,
      safetyStock: `=ROUND(${z} * L${rowIdx} * SQRT(M${rowIdx}), 0)`,
      rop: `=(L${rowIdx} * M${rowIdx}) + N${rowIdx}`,
      eoq: `=ROUND(SQRT((2 * (L${rowIdx} * 365) * ${s}) / (H${rowIdx} * ${hDecimal})), 0)`,
      invValue: `=K${rowIdx} * H${rowIdx}`
    };
  };

  const productFormulas = getProductFormulas(2);

  // Column definitions for active interactive spreadsheets
  const productColumns: ExcelColumn[] = [
    { col: 'A', name: 'Product ID', type: 'Teks (Kunci)', sample: 'PRD001', formula: '', desc: 'ID Unik produk, jangan sampai duplikat' },
    { col: 'B', name: 'SKU', type: 'Teks (Kunci)', sample: 'GYA-NEC-0001', formula: '', desc: 'Kode SKU produk untuk scan / pencarian' },
    { col: 'C', name: 'Nama Produk', type: 'Teks', sample: 'Kalung Bunga Mawar Gold', formula: '', desc: 'Nama aksesoris Giya secara lengkap' },
    { col: 'D', name: 'Kategori', type: 'Teks', sample: 'Necklace', formula: '', desc: 'Kategori produk (Necklace, Ring, dll)' },
    { col: 'E', name: 'Merek', type: 'Teks', sample: 'Elora Fine Jewels', formula: '', desc: 'Merek / Vendor pembuat' },
    { col: 'F', name: 'Bahan', type: 'Teks', sample: 'Gold 18K', formula: '', desc: 'Material dasar aksesoris' },
    { col: 'G', name: 'Satuan', type: 'Teks', sample: 'pcs', formula: '', desc: 'Satuan hitung stok (pcs, pair, set)' },
    { col: 'H', name: 'Harga Beli', type: 'Angka (Rupiah)', sample: '151000', formula: '', desc: 'Harga modal / Cost Price dari supplier' },
    { col: 'I', name: 'Harga Jual', type: 'Angka (Rupiah)', sample: '209000', formula: '', desc: 'Harga banderol jual ke konsumen' },
    { col: 'J', name: 'Margin Keuntungan', type: 'Rumus (Persentase)', sample: '27.8%', formula: productFormulas.margin, desc: 'Laba kotor (%) dihitung otomatis oleh Excel' },
    { col: 'K', name: 'Stok Sekarang', type: 'Angka Bulat', sample: '1507', formula: '', desc: 'Jumlah fisik stok yang tersedia di rak saat ini' },
    { col: 'L', name: 'Permintaan Harian', type: 'Angka Desimal', sample: '0.22', formula: '', desc: 'Rata-rata penjualan harian (diperoleh dari total_jual / hari)' },
    { col: 'M', name: 'Lead Time', type: 'Angka Bulat (Hari)', sample: '5', formula: '', desc: 'Waktu tunggu pengiriman dari supplier' },
    { col: 'N', name: 'Stok Aman', type: 'Rumus (Angka)', sample: '2', formula: productFormulas.safetyStock, desc: 'Safety Stock pengaman stok kosong' },
    { col: 'O', name: 'Reorder Point', type: 'Rumus (Angka)', sample: '3', formula: productFormulas.rop, desc: 'Batas stok minimum untuk memesan kembali' },
    { col: 'P', name: 'EOQ', type: 'Rumus (Angka)', sample: '28', formula: productFormulas.eoq, desc: 'Jumlah pemesanan paling ekonomis' },
    { col: 'Q', name: 'Nilai Inventaris', type: 'Rumus (Rupiah)', sample: '227557000', formula: productFormulas.invValue, desc: 'Total aset uang yang terikat pada stok ini' },
    { col: 'R', name: 'Tanggal Beli Terakhir', type: 'Tanggal (YYYY-MM-DD)', sample: '2026-06-09', formula: '', desc: 'Tanggal kulakan terakhir ke supplier' },
    { col: 'S', name: 'Tanggal Jual Terakhir', type: 'Tanggal (YYYY-MM-DD)', sample: '2026-06-13', formula: '', desc: 'Tanggal terakhir ada konsumen membeli' },
    { col: 'T', name: 'Status', type: 'Pilihan (Active/Inactive)', sample: 'Active', formula: '', desc: 'Status aktifasi penjualan produk' }
  ];

  const customerColumns: ExcelColumn[] = [
    { col: 'A', name: 'Customer ID', type: 'Teks (Kunci)', sample: 'CST001', desc: 'ID Pelanggan unik' },
    { col: 'B', name: 'Nama Pelanggan', type: 'Teks', sample: 'Dimas Aditya', desc: 'Nama pembeli / client' },
    { col: 'C', name: 'Email', type: 'Teks', sample: 'dimas@example.com', desc: 'Kontak surat elektronik pelanggan' },
    { col: 'D', name: 'Lokasi', type: 'Teks', sample: 'Jakarta Selatan, DKI Jakarta', desc: 'Daerah / kota pengiriman utama' },
    { col: 'E', name: 'Tanggal Gabung', type: 'Tanggal (YYYY-MM-DD)', sample: '2024-01-12', desc: 'Tanggal registrasi / transaksi pertama' },
    { col: 'F', name: 'Jumlah Pesanan', type: 'Angka Bulat', sample: '24', desc: 'Akumulasi frekuensi belanja' },
    { col: 'G', name: 'Total Belanja', type: 'Angka (Rupiah)', sample: '12480000', desc: 'Total rupiah yang sudah dibelanjakan' },
    { col: 'H', name: 'Status', type: 'Pilihan (Active/Inactive)', sample: 'Active', desc: 'Status keaktifan pelanggan' }
  ];

  const orderColumns: ExcelColumn[] = [
    { col: 'A', name: 'Order ID', type: 'Teks (Kunci)', sample: '#ORD-0041', desc: 'ID Invoice pesanan unik' },
    { col: 'B', name: 'Nama Pelanggan', type: 'Teks', sample: 'Dimas Aditya', desc: 'Nama pemesan' },
    { col: 'C', name: 'Email', type: 'Teks', sample: 'dimas@example.com', desc: 'Kontak pemesan' },
    { col: 'D', name: 'Tanggal', type: 'Tanggal (YYYY-MM-DD)', sample: '2026-07-01', desc: 'Tanggal transaksi pesanan dibuat' },
    { col: 'E', name: 'Jumlah', type: 'Angka (Rupiah)', sample: '550000', desc: 'Total nominal invoice pesanan' },
    { col: 'F', name: 'Jumlah Item', type: 'Angka Bulat', sample: '5', desc: 'Jumlah kuantitas item dalam pesanan' },
    { col: 'G', name: 'Metode Pembayaran', type: 'Teks', sample: 'Credit Card', desc: 'Metode bayar (Bank Transfer, COD, dll)' },
    { col: 'H', name: 'Status', type: 'Pilihan', sample: 'Completed', desc: 'Status (Completed, Pending, Cancelled, In Progress)' },
    { col: 'I', name: 'Nama Produk', type: 'Teks (Pisah Koma)', sample: 'Kalung Bunga Mawar Gold, Kalung Crescent Moon Silver', desc: 'Nama produk yang dibeli dipisahkan tanda koma' }
  ];

  const supplierColumns: ExcelColumn[] = [
    { col: 'A', name: 'Supplier ID', type: 'Teks (Kunci)', sample: 'SUP001', desc: 'ID Supplier unik' },
    { col: 'B', name: 'Nama Supplier', type: 'Teks', sample: 'PT Sinar Abadi Emas', desc: 'Nama perusahaan / vendor' },
    { col: 'C', name: 'Narahubung', type: 'Teks', sample: 'Budi Sentosa', desc: 'Nama Sales / contact person' },
    { col: 'D', name: 'Email', type: 'Teks', sample: 'budi.sentosa@sinarabadiemas.co.id', desc: 'Alamat korespondensi email' },
    { col: 'E', name: 'Telepon', type: 'Teks', sample: '+62 812 3456 7890', desc: 'No Hp / Whatsapp aktif' },
    { col: 'F', name: 'Kategori', type: 'Teks', sample: 'Gold 18K/24K', desc: 'Spesialisasi bahan logam mulia' },
    { col: 'G', name: 'Lead Time Days', type: 'Angka Bulat', sample: '5', desc: 'Waktu kirim rata-rata (Hari)' },
    { col: 'H', name: 'Reliability', type: 'Angka (Persen)', sample: '98', desc: 'Persentase keandalan pemenuhan barang' },
    { col: 'I', name: 'Rating', type: 'Angka Desimal', sample: '4.8', desc: 'Penilaian performa supplier' },
    { col: 'J', name: 'Status', type: 'Pilihan (Active/Inactive)', sample: 'Active', desc: 'Status keaktifan kerja sama' }
  ];

  const transactionColumns: ExcelColumn[] = [
    { col: 'A', name: 'Transaction ID', type: 'Teks (Kunci)', sample: '#TRX-001', desc: 'ID unik mutasi kas / bank' },
    { col: 'B', name: 'Deskripsi', type: 'Teks', sample: 'Order Payment - Dimas Aditya', desc: 'Keterangan sumber pendapatan/pengeluaran' },
    { col: 'C', name: 'Tanggal', type: 'Tanggal (YYYY-MM-DD)', sample: '2026-07-01', desc: 'Tanggal pencatatan transaksi kas' },
    { col: 'D', name: 'Kategori', type: 'Teks', sample: 'Sales', desc: 'Kategori (Sales, Purchase, Marketing, Operations)' },
    { col: 'E', name: 'Jumlah', type: 'Angka (Rupiah)', sample: '550000', desc: 'Nilai nominal uang transaksi' },
    { col: 'F', name: 'Tipe', type: 'Pilihan (Income/Expense)', sample: 'Income', desc: 'Arah aliran kas (Income = Masuk, Expense = Keluar)' },
    { col: 'G', name: 'Status', type: 'Pilihan (Settled/Pending)', sample: 'Settled', desc: 'Status pencairan (Settled = Lunas, Pending = Menunggu)' }
  ];

  const getActiveColumns = () => {
    switch (excelTab) {
      case 'products': return { name: 'Daftar Produk (produk)', cols: productColumns, note: 'Tulis nama sheet/tab sebagai "produk" atau "products" agar dikenali otomatis.' };
      case 'customers': return { name: 'Daftar Pelanggan (pelanggan)', cols: customerColumns, note: 'Tulis nama sheet/tab sebagai "pelanggan" atau "customers" agar dikenali otomatis.' };
      case 'orders': return { name: 'Daftar Pesanan (pesanan)', cols: orderColumns, note: 'Tulis nama sheet/tab sebagai "pesanan" atau "orders" agar dikenali otomatis.' };
      case 'suppliers': return { name: 'Supplier & Vendor (supplier)', cols: supplierColumns, note: 'Tulis nama sheet/tab sebagai "supplier" atau "suppliers" atau "pemasok" agar dikenali otomatis.' };
      case 'transactions': return { name: 'Transaksi Arus Kas (transaksi)', cols: transactionColumns, note: 'Tulis nama sheet/tab sebagai "transaksi" atau "transactions" agar dikenali otomatis.' };
    }
  };

  const activeSheetInfo = getActiveColumns();

  // Function to download CSV Template representation
  const handleDownloadCSV = () => {
    const current = getActiveColumns();
    const headers = current.cols.map(c => c.name).join(',');
    const samples = current.cols.map(c => c.formula ? `"${c.formula}"` : `"${c.sample}"`).join(',');
    const csvContent = "data:text/csv;charset=utf-8," + [headers, samples].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Giya_Template_${excelTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="setup-guide" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8 space-y-8">
      
      {/* SECTION 1: Standard Connection Setup */}
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-sans font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              Integrasi Google Sheet & Google Apps Script
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hubungkan dashboard ini dengan data inventaris Google Sheet Anda secara realtime dan dua arah.
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Ready to Sync
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Interactive Steps */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="font-sans font-medium text-xs uppercase text-slate-400 tracking-wider">Langkah-langkah</span>
            </div>

            <div className="space-y-3">
              {steps.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-start gap-3 cursor-pointer ${
                    activeStep === step.id
                      ? 'bg-slate-50 border-slate-200 shadow-sm ring-1 ring-slate-100'
                      : 'bg-white border-transparent hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                    activeStep === step.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {step.id}
                  </div>
                  <div>
                    <h4 className={`font-sans font-medium text-sm ${activeStep === step.id ? 'text-slate-900' : 'text-slate-600'}`}>
                      {step.title}
                    </h4>
                    {activeStep === step.id && (
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {step.desc}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Apps Script Code & Connection Input */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans font-medium text-xs uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Google Apps Script Code
                </span>
                <button
                  onClick={handleCopy}
                  id="btn-copy-gas-code"
                  type="button"
                  className="px-3 py-1.5 text-xs font-sans font-medium rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Salin Kode Script
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 font-mono text-xs text-slate-300 h-64 overflow-y-auto shadow-inner p-4">
                <pre className="text-left leading-relaxed whitespace-pre font-mono">{gasCode}</pre>
                <div className="absolute bottom-2 right-2 bg-slate-900/95 border border-slate-800 text-[10px] px-2 py-1 rounded text-slate-400 pointer-events-none">
                  Scroll untuk melihat semua kode
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="text-sm font-sans font-semibold text-slate-950 flex items-center gap-1.5">
                <span>Masukkan Web App URL Hasil Deploy</span>
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" title="Dapatkan ini dari deploy Google Apps Script Anda sebagai Web App" />
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={gasUrl}
                    onChange={(e) => setGasUrl(e.target.value)}
                    id="input-gas-url"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono text-xs transition-all bg-slate-50/50"
                  />
                </div>
                <button
                  onClick={onTestConnection}
                  disabled={isTesting || !gasUrl}
                  id="btn-test-connection"
                  type="button"
                  className="px-5 py-3 rounded-xl bg-slate-950 text-white font-sans font-medium text-sm hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
                >
                  {isTesting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                      Menghubungkan...
                    </>
                  ) : (
                    <>
                      Hubungkan Sheet
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Connection feedback */}
              {connectionStatus === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Koneksi Berhasil!</p>
                    <p className="text-emerald-700/90 mt-0.5">Dashboard sekarang tersinkronisasi langsung dengan Google Sheet Anda secara aman.</p>
                  </div>
                </div>
              )}

              {connectionStatus === 'failed' && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">!</span>
                  <div>
                    <p className="font-semibold">Gagal Menghubungkan</p>
                    <p className="text-rose-700/90 mt-0.5">{errorMessage || "Pastikan URL benar dan izin akses diatur ke 'Anyone'."}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Interactive Excel Template and Formula Hub */}
      <div className="pt-8 border-t border-slate-100 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-sans font-semibold text-pink-950 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-pink-500" />
              Template Kolom & Rumus Excel / Google Sheets Lengkap
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Gunakan susunan kolom di bawah ini untuk membuat tabel Excel Anda. Salin rumus kalkulasi otomatis kami langsung ke sel Anda.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={handleDownloadExcel}
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Unduh Template Excel (.xlsx) Lengkap</span>
            </button>
            
            <button
              onClick={handleDownloadCSV}
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 active:scale-95 rounded-xl text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Unduh CSV Per Tab</span>
            </button>
          </div>
        </div>

        {/* Dynamic Formula Parameter Adjuster */}
        <div className="bg-pink-50/20 border border-pink-100/60 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Biaya Pemesanan (S) per PO
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">Rp</span>
              <input
                type="number"
                value={paramS}
                onChange={(e) => setParamS(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-xs pl-9 pr-3 py-1.5 bg-white border border-pink-100 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-400 font-mono"
              />
            </div>
            <p className="text-[9px] text-slate-400">Asumsi biaya administrasi dan kirim per order</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Carrying Cost Rate (H%) per Tahun
            </label>
            <div className="relative">
              <input
                type="number"
                value={paramH}
                onChange={(e) => setParamH(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-full text-xs px-3 py-1.5 bg-white border border-pink-100 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-400 font-mono"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">%</span>
            </div>
            <p className="text-[9px] text-slate-400">Persentase harga barang untuk biaya simpan gudang</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Faktor Keamanan Z (Safety Stock)
            </label>
            <select
              value={paramZ}
              onChange={(e) => setParamZ(parseFloat(e.target.value))}
              className="w-full text-xs px-3 py-1.5 bg-white border border-pink-100 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-400"
            >
              <option value="1.65">1.65 (Keandalan 95%)</option>
              <option value="1.96">1.96 (Keandalan 97.5%)</option>
              <option value="2.33">2.33 (Keandalan 99%)</option>
              <option value="1.28">1.28 (Keandalan 90%)</option>
            </select>
            <p className="text-[9px] text-slate-400">Tingkat toleransi kehabisan stok aman</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2">
          {(['products', 'customers', 'orders', 'suppliers', 'transactions'] as const).map((tab) => {
            const label = tab === 'products' ? 'Produk (Products)' 
                        : tab === 'customers' ? 'Pelanggan (Customers)'
                        : tab === 'orders' ? 'Pesanan (Orders)'
                        : tab === 'suppliers' ? 'Pemasok (Suppliers)'
                        : 'Transaksi (Transactions)';
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setExcelTab(tab)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  excelTab === tab
                    ? 'bg-pink-500 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <span>Struktur Tab Sheet: </span>
              <span className="font-mono bg-pink-50 text-pink-700 px-2 py-0.5 rounded text-xs">{activeSheetInfo.name}</span>
            </h4>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Baris pertama sheet Anda wajib menjadi nama kolom (Header).
            </span>
          </div>
          <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            📌 {activeSheetInfo.note}
          </p>
        </div>

        {/* Table of Columns */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 font-sans font-semibold text-slate-700">
                <th className="p-3 w-16">Kolom</th>
                <th className="p-3 w-40">Header Kolom Excel</th>
                <th className="p-3 w-36">Tipe Data</th>
                <th className="p-3 w-36">Contoh Isian</th>
                <th className="p-3">Rumus Excel (Sel Baris ke-2)</th>
                <th className="p-3 w-12 text-center">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeSheetInfo.cols.map((row) => (
                <tr key={row.col} className="hover:bg-slate-50/40">
                  <td className="p-3 font-mono font-bold text-pink-600">{row.col}</td>
                  <td className="p-3 font-semibold text-slate-800">{row.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.formula ? 'bg-pink-50 text-pink-700 border border-pink-100' 
                      : row.type.includes('Kunci') ? 'bg-purple-50 text-purple-700 border border-purple-100'
                      : 'bg-slate-100 text-slate-600'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600 bg-slate-50/20">{row.sample}</td>
                  <td className="p-3">
                    {row.formula ? (
                      <code className="font-mono text-xs text-pink-600 font-bold bg-pink-50/40 px-2 py-1 rounded select-all block break-all">
                        {row.formula}
                      </code>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">{row.desc}</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.formula ? (
                      <button
                        onClick={() => handleCopyText(row.formula, row.col)}
                        type="button"
                        className="p-1 hover:bg-pink-50 rounded text-pink-600 active:scale-90 transition-all cursor-pointer"
                        title="Salin rumus Excel"
                      >
                        {copiedFormulaKey === row.col ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCopyText(row.name, row.col)}
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded text-slate-400 active:scale-90 transition-all cursor-pointer"
                        title="Salin nama header"
                      >
                        {copiedFormulaKey === row.col ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mini Tutorial on Excel/Sheets Formulas */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
          <h5 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-pink-500" />
            💡 Cara Kerja & Logika Perhitungan di Excel:
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <p>
                <strong>1. Profit Margin (J2):</strong><br />
                Mengevaluasi selisih untung kotor. Rumus <code>=(I2-H2)/I2</code> membagi keuntungan dengan Harga Jual (I). Format kolom J ini sebagai <strong>Percentage (%)</strong> di Excel Anda.
              </p>
              <p>
                <strong>2. Safety Stock (N2):</strong><br />
                Mengukur ketidakpastian pengiriman vendor. Rumus <code>=ROUND({paramZ} * L2 * SQRT(M2), 0)</code> mengalikan faktor keamanan Z (<code>{paramZ}</code>) dengan permintaan harian (L2) dan akar kuadrat dari lead time pengiriman (M2).
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong>3. Reorder Point (O2):</strong><br />
                Batas minimum stok untuk memesan. Rumus <code>=(L2 * M2) + N2</code> menjamin stok tersisa masih cukup selama masa tunggu kirim ditambah stok aman pengaman.
              </p>
              <p>
                <strong>4. EOQ (P2):</strong><br />
                Rumus <code>=ROUND(SQRT((2 * (L2 * 365) * {paramS}) / (H2 * {paramH/100})), 0)</code> menyeimbangkan biaya simpan tahunan dengan biaya kirim per order agar jumlah order paling murah & efisien secara finansial.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
