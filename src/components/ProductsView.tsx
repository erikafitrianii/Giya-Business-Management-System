import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Edit, 
  Trash, 
  Plus, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight,
  Database,
  Info,
  Layers,
  Sparkles,
  Gem,
  Watch,
  Gift,
  Crown,
  Award,
  CircleDot,
  Heart,
  Sparkle,
  Link2,
  Sun
} from 'lucide-react';
import { Product } from '../types';
import { 
  ThemePreferences, 
  THEME_COLOR_MAP, 
  FONT_MAP, 
  EFFECT_MAP 
} from '../lib/theme';

interface ProductsViewProps {
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  themePrefs?: ThemePreferences;
}

export default function ProductsView({ 
  products, 
  onAddProduct, 
  onEditProduct, 
  onDeleteProduct,
  themePrefs = { theme: 'rose', font: 'jakarta', effect: 'default', textColor: 'slate', chartColor: 'rosewood' }
}: ProductsViewProps) {
  
  const activeTheme = THEME_COLOR_MAP[themePrefs.theme] || THEME_COLOR_MAP.rose;
  const activeFont = FONT_MAP[themePrefs.font] || FONT_MAP.jakarta;
  const activeEffect = EFFECT_MAP[themePrefs.effect] || EFFECT_MAP.default;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockStatusFilter, setStockStatusFilter] = useState<'All' | 'Low' | 'Adequate' | 'Out'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Formatting helpers
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Metrics for upper cards
  const metrics = useMemo(() => {
    const total = products.length;
    const active = products.filter(p => p.status === 'Active').length;
    const lowStock = products.filter(p => p.currentStock > 0 && p.currentStock <= p.reorderPoint).length;
    const outOfStock = products.filter(p => p.currentStock === 0).length;

    return { total, active, lowStock, outOfStock };
  }, [products]);

  // Unique categories derived dynamically
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)].sort();
  }, [products]);

  // Filtering
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (stockStatusFilter === 'Low') {
      result = result.filter(p => p.currentStock > 0 && p.currentStock <= p.reorderPoint);
    } else if (stockStatusFilter === 'Out') {
      result = result.filter(p => p.currentStock === 0);
    } else if (stockStatusFilter === 'Adequate') {
      result = result.filter(p => p.currentStock > p.reorderPoint);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.material.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
      );
    }

    return result;
  }, [products, selectedCategory, stockStatusFilter, searchTerm]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Category Icon Resolver
  const getProductEmoji = (category: string) => {
    const catLower = category.toLowerCase();
    if (catLower.includes('neck') || catLower.includes('kalung')) return '📿'; // necklace
    if (catLower.includes('ring') || catLower.includes('cincin')) return '💍'; // ring
    if (catLower.includes('ear') || catLower.includes('anting')) return '💎'; // earring
    if (catLower.includes('anklet') || catLower.includes('kaki')) return '🔗'; // anklet
    if (catLower.includes('brace') || catLower.includes('gelang')) return '🎗️'; // bracelet
    if (catLower.includes('pendant') || catLower.includes('liontin')) return '💝'; // pendant
    if (catLower.includes('brooch') || catLower.includes('bros')) return '🌸'; // brooch
    if (catLower.includes('hair') || catLower.includes('rambut')) return '👑'; // hair accessories
    if (catLower.includes('gift') || catLower.includes('set') || catLower.includes('hadiah')) return '🎁'; // gift set
    if (catLower.includes('limit') || catLower.includes('edisi') || catLower.includes('terbatas')) return '⭐'; // limited edition
    if (catLower.includes('watch')) return '⌚'; // watch
    return '✨';
  };

  const getProductBgColor = (category: string) => {
    const tk = (themePrefs.theme || 'rose').toLowerCase();
    let c1 = 'pink';
    if (tk === 'ocean') c1 = 'blue';
    else if (tk === 'emerald') c1 = 'emerald';
    else if (tk === 'sunset') c1 = 'orange';
    else if (tk === 'violet') c1 = 'violet';
    return `bg-${c1}-50/50 border-${c1}-100`;
  };

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
              // fallback if URL fails
              (e.currentTarget as HTMLImageElement).src = '';
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      );
    }

    // Determine color variables based on current UI Theme
    const tk = (themePrefs.theme || 'rose').toLowerCase();
    let c1 = 'pink';
    let c2 = 'rose';
    let dropShadowColor = 'rgba(219,39,119,0.35)'; // Default Pink

    if (tk === 'ocean') {
      c1 = 'blue';
      c2 = 'sky';
      dropShadowColor = 'rgba(59,130,246,0.35)';
    } else if (tk === 'emerald') {
      c1 = 'emerald';
      c2 = 'teal';
      dropShadowColor = 'rgba(16,185,129,0.35)';
    } else if (tk === 'sunset') {
      c1 = 'orange';
      c2 = 'amber';
      dropShadowColor = 'rgba(249,115,22,0.35)';
    } else if (tk === 'violet') {
      c1 = 'violet';
      c2 = 'purple';
      dropShadowColor = 'rgba(139,92,246,0.35)';
    }

    let bgGradient = `from-${c1}-50 via-${c1}-100/40 to-${c2}-100/80`;

    // Set background gradient based on category or name, using theme colors
    if (nameLower.includes('kalung') || catLower.includes('neck') || catLower.includes('necklace')) {
      bgGradient = `from-${c1}-50 via-${c1}-100/30 to-${c2}-100/70`;
    } else if (nameLower.includes('cincin') || catLower.includes('ring')) {
      bgGradient = `from-${c2}-50 via-${c1}-50/50 to-${c1}-100/60`;
    } else if (nameLower.includes('anting') || catLower.includes('ear') || catLower.includes('earrings')) {
      bgGradient = `from-${c1}-100/30 via-${c2}-50 to-${c1}-100/70`;
    } else if (nameLower.includes('gelang kaki') || catLower.includes('anklet') || nameLower.includes('kaki')) {
      bgGradient = `from-${c2}-50 via-${c2}-100/30 to-${c1}-100/70`;
    } else if (nameLower.includes('gelang') || catLower.includes('brace') || catLower.includes('bracelet')) {
      bgGradient = `from-${c2}-50 via-${c1}-50/80 to-${c2}-100/75`;
    } else if (nameLower.includes('liontin') || nameLower.includes('pendant') || catLower.includes('pendant')) {
      bgGradient = `from-${c2}-50 via-${c1}-100/20 to-${c2}-100/60`;
    } else if (nameLower.includes('bros') || catLower.includes('brooch') || catLower.includes('brooch')) {
      bgGradient = `from-${c1}-50 to-${c2}-100/40`;
    } else if (nameLower.includes('rambut') || nameLower.includes('hair') || catLower.includes('hair') || nameLower.includes('jepit')) {
      bgGradient = `from-${c1}-50 via-${c2}-100/30 to-${c1}-100/60`;
    } else if (nameLower.includes('set') || nameLower.includes('hadiah') || catLower.includes('gift') || catLower.includes('set')) {
      bgGradient = `from-${c1}-100/50 via-${c2}-50 to-${c2}-100/90`;
    } else if (nameLower.includes('limit') || nameLower.includes('terbatas') || catLower.includes('limit') || catLower.includes('limited')) {
      bgGradient = `from-${c1}-100 via-${c2}-100 to-${c1}-200/50`;
    }

    // Dynamic graphic generation mimicking premium 3D/colored vector icons directly centered
    const renderVisualGraphic = () => {
      // 1. Cincin (Ring)
      if (nameLower.includes('cincin') || catLower.includes('ring')) {
        return (
          <div className="relative flex items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            {/* Main ring body */}
            <div className={`w-18 h-18 rounded-full border-[7px] border-${c1}-400 flex items-center justify-center relative rotate-12`}>
              <div className="absolute inset-1 rounded-full border border-white/40" />
            </div>
            {/* Big Diamond perched on top */}
            <div className={`absolute -top-1.5 bg-white p-1 rounded-lg border border-${c1}-200 rotate-45 shadow-sm`}>
              <Gem className={`w-6 h-6 text-${c1}-500 fill-${c1}-100`} />
            </div>
          </div>
        );
      }

      // 2. Kalung (Necklace)
      if (nameLower.includes('kalung') || catLower.includes('neck') || catLower.includes('necklace')) {
        return (
          <div className="relative flex flex-col items-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            {/* Necklace chain arc */}
            <div className={`w-18 h-12 border-b-[5px] border-x-[5px] border-${c1}-400 rounded-b-full relative flex items-end justify-center`}>
              <div className="absolute inset-x-1 bottom-0 border-b border-white/50" />
              {/* Hanging Pendant Diamond */}
              <div className={`absolute -bottom-4 bg-gradient-to-tr from-${c1}-500 to-${c2}-400 p-1.5 rounded-full border-2 border-white shadow-md rotate-45`}>
                <Gem className={`w-5 h-5 text-white fill-${c1}-100/50 -rotate-45`} />
              </div>
            </div>
          </div>
        );
      }

      // 3. Liontin (Pendant)
      if (nameLower.includes('liontin') || nameLower.includes('pendant') || catLower.includes('pendant')) {
        return (
          <div className="relative flex flex-col items-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            {/* Chain/Hanger link */}
            <div className={`w-1.5 h-6 bg-gradient-to-b from-${c2}-300 to-${c2}-500 rounded-full`} />
            {/* Beautiful Pendant Heart/Gem */}
            <div className={`bg-gradient-to-tr from-${c2}-600 to-${c1}-400 p-2.5 rounded-full border-2 border-white shadow-md relative -mt-1.5`}>
              <Heart className="w-8 h-8 text-white fill-white/85" />
              <Sparkle className={`w-3.5 h-3.5 text-${c2}-200 absolute top-1 right-1 animate-pulse`} />
            </div>
          </div>
        );
      }

      // 4. Gelang Kaki (Anklet)
      if (nameLower.includes('gelang kaki') || catLower.includes('anklet') || nameLower.includes('kaki')) {
        return (
          <div className="relative flex items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            <div className={`w-20 h-10 border-b-[4px] border-${c2}-400/90 rounded-b-full relative flex items-end justify-center`}>
              <div className="absolute -bottom-2.5 flex gap-2">
                <div className={`w-3 h-3 bg-${c2}-500 rounded-full border border-white shadow-2xs`} />
                <div className={`w-4 h-4 bg-${c1}-500 rounded-full border border-white flex items-center justify-center shadow-2xs`}>
                  <Sparkle className="w-2.5 h-2.5 text-white" />
                </div>
                <div className={`w-3 h-3 bg-${c2}-500 rounded-full border border-white shadow-2xs`} />
              </div>
            </div>
          </div>
        );
      }

      // 5. Gelang (Bracelet)
      if (nameLower.includes('gelang') || catLower.includes('bracelet') || catLower.includes('brace')) {
        return (
          <div className="relative flex items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            <div className={`w-18 h-18 rounded-full border-[6px] border-${c1}-400 flex items-center justify-center relative`}>
              <div className={`absolute inset-0.5 rounded-full border-[3px] border-${c2}-300 rotate-45 opacity-80`} />
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-${c1}-600 rounded-full border-2 border-white shadow-sm`} />
            </div>
          </div>
        );
      }

      // 6. Anting (Earrings)
      if (nameLower.includes('anting') || catLower.includes('ear') || catLower.includes('earrings')) {
        return (
          <div className="relative flex gap-4 filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            <div className="flex flex-col items-center">
              <div className={`w-1 h-3 bg-${c1}-300 rounded-full`} />
              <div className={`w-6.5 h-6.5 bg-gradient-to-br from-${c1}-500 to-${c2}-400 rounded-full border border-white flex items-center justify-center shadow-xs`}>
                <Sparkle className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center mt-2.5">
              <div className={`w-1 h-3 bg-${c1}-300 rounded-full`} />
              <div className={`w-6.5 h-6.5 bg-gradient-to-br from-${c1}-500 to-${c2}-400 rounded-full border border-white flex items-center justify-center shadow-xs`}>
                <Sparkle className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>
        );
      }

      // 7. Bros (Brooch)
      if (nameLower.includes('bros') || catLower.includes('brooch') || nameLower.includes('brooch')) {
        return (
          <div className="relative flex items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            <Sun className={`w-16 h-16 text-${c2}-500 fill-${c2}-100 rotate-12`} />
            <div className={`absolute p-1 bg-white rounded-full border border-${c2}-200`}>
              <Gem className={`w-5 h-5 text-${c2}-600 fill-${c2}-200`} />
            </div>
          </div>
        );
      }

      // 8. Aksesoris Rambut (Hair Accessories)
      if (nameLower.includes('rambut') || nameLower.includes('jepit') || nameLower.includes('hair') || catLower.includes('hair') || nameLower.includes('mahkota') || nameLower.includes('tiara')) {
        return (
          <div className="relative flex flex-col items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            <Crown className={`w-16 h-16 text-${c1}-500 fill-${c1}-100`} />
            <div className="absolute -top-1 flex gap-1.5">
              <Sparkle className={`w-3.5 h-3.5 text-${c1}-500`} />
            </div>
          </div>
        );
      }

      // 9. Set Hadiah (Gift Set)
      if (nameLower.includes('set') || nameLower.includes('hadiah') || catLower.includes('gift') || catLower.includes('set')) {
        return (
          <div className="relative flex items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            <Gift className={`w-16 h-16 text-${c1}-600 fill-${c1}-100`} />
            <div className={`absolute -top-1.5 -right-1.5 bg-${c1}-500 text-white rounded-full p-1 border border-white shadow-xs`}>
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </div>
        );
      }

      // 10. Edisi Terbatas (Limited Edition)
      if (nameLower.includes('limit') || nameLower.includes('terbatas') || catLower.includes('limit') || catLower.includes('limited')) {
        return (
          <div className="relative flex items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
            <Award className={`w-18 h-18 text-${c2}-600 fill-${c2}-50`} />
            <div className="absolute">
              <Crown className={`w-8 h-8 text-${c1}-500 fill-${c1}-100 rotate-12`} />
            </div>
          </div>
        );
      }

      // Fallback
      return (
        <div className="relative flex items-center justify-center filter hover:scale-110 transition-transform duration-300" style={{ filter: `drop-shadow(0 8px 16px ${dropShadowColor})` }}>
          <Gem className={`w-16 h-16 text-${c1}-500 fill-${c1}-50`} />
          <Sparkles className={`w-4 h-4 text-${c1}-400 absolute -top-1 -right-1 animate-pulse`} />
        </div>
      );
    };

    return (
      <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:scale-105 relative overflow-hidden`}>
        {/* Subtle decorative ring overlay in the background */}
        <div className="absolute inset-0 border-[6px] border-white/15 rounded-full scale-125 opacity-35 pointer-events-none" />
        
        {/* Centered Jewelry Graphic without extra white circles */}
        <div className="mb-2">
          {renderVisualGraphic()}
        </div>

        <span className={`text-[10px] font-mono tracking-widest uppercase font-bold text-${c1}-950/70 bg-white/70 px-2 py-0.5 rounded-full border border-${c1}-100/40 z-10 shadow-3xs`}>
          {p.material || 'Premium'}
        </span>
      </div>
    );
  };

  const tk = (themePrefs.theme || 'rose').toLowerCase();
  let c1 = 'pink';
  let c2 = 'rose';
  if (tk === 'ocean') {
    c1 = 'blue';
    c2 = 'sky';
  } else if (tk === 'emerald') {
    c1 = 'emerald';
    c2 = 'teal';
  } else if (tk === 'sunset') {
    c1 = 'orange';
    c2 = 'amber';
  } else if (tk === 'violet') {
    c1 = 'violet';
    c2 = 'purple';
  }

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
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${activeTheme.textHeader} font-sans tracking-tight`}>Katalog Produk & SKU</h1>
          <p className={`text-sm ${activeTheme.textMuted}`}>Kelola master data produk, level reorder point, dan nilai aset inventaris aksesoris Anda.</p>
        </div>
        <button 
          onClick={onAddProduct}
          className={`flex items-center justify-center gap-2 bg-gradient-to-r from-${c1}-500 to-${c2}-500 hover:from-${c1}-600 hover:to-${c2}-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-sm whitespace-nowrap`}
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Tambah SKU Baru</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`bg-white rounded-2xl p-5 border border-${c1}-100 shadow-xs`}>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total SKU</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1 font-sans">{metrics.total}</h3>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded-sm">+24 minggu ini</span>
        </div>

        <div className={`bg-white rounded-2xl p-5 border border-${c1}-100 shadow-xs`}>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Aktif Di Toko</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1 font-sans">{metrics.active}</h3>
          <span className={`text-[10px] text-${c1}-600 font-bold bg-${c1}-50 px-1 rounded-sm`}>88.3% dari total</span>
        </div>

        <div className={`bg-white rounded-2xl p-5 border border-${c1}-100 shadow-xs relative overflow-hidden`}>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Stok Menipis (Low)</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1 font-sans">{metrics.lowStock}</h3>
          <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1 rounded-sm">Butuh Order Ulang</span>
        </div>

        <div className={`bg-white rounded-2xl p-5 border border-${c1}-100 shadow-xs`}>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Habis (Out of Stock)</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1 font-sans">{metrics.outOfStock}</h3>
          <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1 rounded-sm">Tindakan Diperlukan</span>
        </div>
      </div>

      {/* Filter and Category Area */}
      <div className="space-y-4">
        {/* Horizontal Category Pill Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 whitespace-nowrap max-w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected 
                    ? `bg-gradient-to-r from-${c1}-500 to-${c2}-500 border-${c1}-500 text-white shadow-xs` 
                    : `bg-white border-${c1}-100 text-${c1}-950/70 hover:bg-${c1}-50`
                }`}
              >
                <span>{getProductEmoji(cat)}</span>
                <span className="ml-1.5">{cat === 'All' ? 'Semua Kategori' : cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Stock status dropdown, and Controls */}
        <div className={`bg-white rounded-2xl p-4 border border-${c1}-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 text-${c1}-400 absolute left-3.5 top-1/2 -translate-y-1/2`} />
            <input
              type="text"
              placeholder="Cari aksesoris berdasarkan nama, SKU, bahan..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-${c1}-100 bg-white placeholder-${c1}-300 focus:outline-hidden focus:ring-2 focus:ring-${c1}-400 text-slate-700`}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className={`text-xs font-bold text-${c1}-950/60 hidden sm:inline`}>Status Stok:</span>
            <div className="flex gap-1">
              {(['All', 'Adequate', 'Low', 'Out'] as const).map((status) => {
                const names = { All: 'Semua', Adequate: 'Aman', Low: 'Menipis', Out: 'Habis' };
                const isActive = stockStatusFilter === status;
                return (
                  <button
                    key={status}
                    onClick={() => { setStockStatusFilter(status); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive 
                        ? `bg-${c1}-100 text-${c1}-700 font-bold border border-${c1}-200` 
                        : 'bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {names[status]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((p) => {
          const isLowStock = p.currentStock > 0 && p.currentStock <= p.reorderPoint;
          const isOut = p.currentStock === 0;

          const stockStatusPill = isOut 
            ? 'bg-rose-100 text-rose-700 border-rose-200' 
            : isLowStock 
              ? 'bg-amber-100 text-amber-700 border-amber-200' 
              : 'bg-emerald-100 text-emerald-700 border-emerald-200';

          const stockStatusText = isOut ? 'Habis' : isLowStock ? 'Batas ROP' : 'Stok Aman';

          return (
            <div 
              key={p.id}
              className={`bg-white rounded-2xl border border-${c1}-100 shadow-xs hover:shadow-lg transition-all overflow-hidden group flex flex-col justify-between`}
            >
              {/* Product Visual Area */}
              <div className="h-40 w-full relative overflow-hidden border-b select-none bg-slate-100">
                {renderProductIcon(p)}
                
                {/* ID Tag */}
                <span className={`absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-mono font-bold text-${c1}-900 px-2 py-0.5 rounded-lg shadow-2xs border border-${c1}-50`}>
                  {p.id}
                </span>

                {/* Status indicator */}
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-lg border shadow-2xs ${stockStatusPill}`}>
                  {stockStatusText}
                </span>

                {/* Category Icon Badge */}
                <span className="absolute bottom-2.5 left-2.5 bg-slate-900/65 backdrop-blur-xs text-sm p-1.5 rounded-xl shadow-2xs border border-white/10 text-white leading-none">
                  {getProductEmoji(p.category)}
                </span>
              </div>

              {/* Product Details Area */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className={`text-[10px] font-bold uppercase text-${c1}-500 tracking-wider font-mono`}>{p.category} • {p.material}</span>
                  <h4 className={`text-sm font-bold text-slate-800 line-clamp-1 mt-0.5 group-hover:text-${c1}-600 transition-colors`} title={p.name}>
                    {p.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">SKU: {p.sku}</p>
                </div>

                <div className={`mt-4 pt-3 border-t border-${c1}-50/50 flex justify-between items-end`}>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Harga Jual</span>
                    <span className={`text-sm font-extrabold text-${c1}-600`}>{formatIDR(p.sellingPrice)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Stok</span>
                    <span className={`text-xs font-bold ${isOut ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-slate-700'}`}>
                      {p.currentStock} {p.unit}
                    </span>
                  </div>
                </div>

                {/* Edit Actions overlay in hover */}
                <div className={`mt-4 pt-2.5 border-t border-${c1}-50/50 flex gap-2`}>
                  <button
                    onClick={() => onEditProduct(p)}
                    className={`flex-1 py-1.5 bg-${c1}-50 hover:bg-${c1}-100 text-${c1}-700 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Ubah</span>
                  </button>
                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    className="p-1.5 border border-rose-100 hover:bg-rose-50 text-rose-600 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                    title="Hapus"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className={`bg-white p-12 text-center rounded-2xl border border-${c1}-100 shadow-xs max-w-xl mx-auto`}>
          <Info className={`w-8 h-8 text-${c1}-400 mx-auto mb-3`} />
          <h4 className={`text-sm font-bold text-${c1}-950`}>Tidak ada produk ditemukan</h4>
          <p className="text-xs text-slate-400 mt-1">Gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
        </div>
      )}

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className={`flex flex-col sm:flex-row items-center justify-between p-4 bg-white border border-${c1}-100 rounded-2xl shadow-xs gap-4`}>
          <span className="text-xs text-slate-500 font-medium">
            Menampilkan {((currentPage - 1) * itemsPerPage) + 1} s/d {Math.min(currentPage * itemsPerPage, filteredProducts.length)} dari {filteredProducts.length} produk
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); }}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-xl border border-${c1}-100 bg-white text-${c1}-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-${c1}-50 transition-all flex items-center justify-center cursor-pointer`}
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
                  onClick={() => { setCurrentPage(Number(page)); }}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    currentPage === page 
                      ? `bg-gradient-to-r from-${c1}-500 to-${c2}-500 text-white shadow-xs` 
                      : `bg-white border border-${c1}-100 text-${c1}-600 hover:bg-${c1}-50`
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); }}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-xl border border-${c1}-100 bg-white text-${c1}-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-${c1}-50 transition-all flex items-center justify-center cursor-pointer`}
              title="Halaman Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
