import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flower,
  LayoutDashboard,
  Layers,
  ShoppingCart,
  Users,
  TrendingUp,
  Truck,
  BarChart3,
  DollarSign,
  Bell,
  Settings,
  Database,
  RefreshCw,
  AlertTriangle,
  Menu,
  X,
  LogOut,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';

import { Product, Order, Customer, Supplier, Transaction, NotificationItem } from './types';
import { 
  initialProducts, 
  initialOrders, 
  initialCustomers, 
  initialSuppliers, 
  initialTransactions, 
  initialNotifications 
} from './data';

// Import newly created sub-views
import DashboardView from './components/DashboardView';
import ProductsView from './components/ProductsView';
import OrdersView from './components/OrdersView';
import CustomersView from './components/CustomersView';
import ForecastingView from './components/ForecastingView';
import SuppliersView from './components/SuppliersView';
import AnalyticsView from './components/AnalyticsView';
import FinanceView from './components/FinanceView';
import NotificationsView from './components/NotificationsView';
import SettingsView from './components/SettingsView';

// Original modal components
import ProductForm from './components/ProductForm';

// Theme imports for Personalization
import { 
  ThemePreferences, 
  DEFAULT_THEME_PREFS, 
  THEME_COLOR_MAP, 
  FONT_MAP, 
  EFFECT_MAP,
  TEXT_COLOR_MAP
} from './lib/theme';

export default function App() {
  // --- Personalization Theme Preferences State ---
  const [themePrefs, setThemePrefs] = useState<ThemePreferences>(() => {
    const saved = localStorage.getItem('giya_theme_prefs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_THEME_PREFS;
      }
    }
    return DEFAULT_THEME_PREFS;
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = themePrefs.theme;
    
    const colors: Record<string, Record<string, string>> = {
      rose: {
        'pink-50': '#fdf2f8',
        'pink-100': '#fce7f3',
        'pink-200': '#fbcfe8',
        'pink-300': '#f9a8d4',
        'pink-400': '#f472b6',
        'pink-500': '#ec4899',
        'pink-600': '#db2777',
        'pink-700': '#be185d',
        'pink-800': '#9d174d',
        'pink-900': '#831843',
        'pink-950': '#500724',
        
        'rose-50': '#fff1f2',
        'rose-100': '#ffe4e6',
        'rose-200': '#fecdd3',
        'rose-300': '#fda4af',
        'rose-400': '#fb7185',
        'rose-500': '#f43f5e',
        'rose-600': '#e11d48',
        'rose-700': '#be123c',
        'rose-800': '#9f1239',
        'rose-900': '#881337',
        'rose-950': '#4c0519',
      },
      ocean: {
        'pink-50': '#f0f9ff',
        'pink-100': '#e0f2fe',
        'pink-200': '#bae6fd',
        'pink-300': '#7dd3fc',
        'pink-400': '#38bdf8',
        'pink-500': '#0ea5e9',
        'pink-600': '#0284c7',
        'pink-700': '#0369a1',
        'pink-800': '#075985',
        'pink-900': '#0c4a6e',
        'pink-950': '#082f49',

        'rose-50': '#eff6ff',
        'rose-100': '#dbeafe',
        'rose-200': '#bfdbfe',
        'rose-300': '#93c5fd',
        'rose-400': '#60a5fa',
        'rose-500': '#3b82f6',
        'rose-600': '#2563eb',
        'rose-700': '#1d4ed8',
        'rose-800': '#1e40af',
        'rose-900': '#1e3a8a',
        'rose-950': '#172554',
      },
      emerald: {
        'pink-50': '#f0fdf4',
        'pink-100': '#dcfce7',
        'pink-200': '#bbf7d0',
        'pink-300': '#86efac',
        'pink-400': '#4ade80',
        'pink-500': '#22c55e',
        'pink-600': '#16a34a',
        'pink-700': '#15803d',
        'pink-800': '#166534',
        'pink-900': '#14532d',
        'pink-950': '#052e16',

        'rose-50': '#f0fdfa',
        'rose-100': '#ccfbf1',
        'rose-200': '#99f6e4',
        'rose-300': '#5eead4',
        'rose-400': '#2dd4bf',
        'rose-500': '#14b8a6',
        'rose-600': '#0d9488',
        'rose-700': '#0f766e',
        'rose-800': '#115e59',
        'rose-900': '#134e4a',
        'rose-950': '#042f2e',
      },
      sunset: {
        'pink-50': '#fff7ed',
        'pink-100': '#ffedd5',
        'pink-200': '#fed7aa',
        'pink-300': '#fdba74',
        'pink-400': '#fb923c',
        'pink-500': '#f97316',
        'pink-600': '#ea580c',
        'pink-700': '#c2410c',
        'pink-800': '#9a3412',
        'pink-900': '#7c2d12',
        'pink-950': '#431407',

        'rose-50': '#fffbeb',
        'rose-100': '#fef3c7',
        'rose-200': '#fde68a',
        'rose-300': '#fcd34d',
        'rose-400': '#fbbf24',
        'rose-500': '#f59e0b',
        'rose-600': '#d97706',
        'rose-700': '#b45309',
        'rose-800': '#92400e',
        'rose-900': '#78350f',
        'rose-950': '#451a03',
      },
      violet: {
        'pink-50': '#faf5ff',
        'pink-100': '#f3e8ff',
        'pink-200': '#e9d5ff',
        'pink-300': '#d8b4fe',
        'pink-400': '#c084fc',
        'pink-500': '#a855f7',
        'pink-600': '#9333ea',
        'pink-700': '#7e22ce',
        'pink-800': '#6b21a8',
        'pink-900': '#581c87',
        'pink-950': '#3b0764',

        'rose-50': '#f5f3ff',
        'rose-100': '#ede9fe',
        'rose-200': '#ddd6fe',
        'rose-300': '#c4b5fd',
        'rose-400': '#a78bfa',
        'rose-500': '#8b5cf6',
        'rose-600': '#7c3aed',
        'rose-700': '#6d28d9',
        'rose-800': '#5b21b6',
        'rose-900': '#4c1d95',
        'rose-950': '#2e1065',
      }
    };

    const selectedColors = colors[theme] || colors.rose;
    Object.entries(selectedColors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  }, [themePrefs.theme]);

  const handleUpdateThemePrefs = (newPrefs: ThemePreferences) => {
    setThemePrefs(newPrefs);
    localStorage.setItem('giya_theme_prefs', JSON.stringify(newPrefs));
  };

  const activeTheme = THEME_COLOR_MAP[themePrefs.theme] || THEME_COLOR_MAP.rose;
  const activeFont = FONT_MAP[themePrefs.font] || FONT_MAP.jakarta;
  const activeEffect = EFFECT_MAP[themePrefs.effect] || EFFECT_MAP.default;
  const activeTextColor = TEXT_COLOR_MAP[themePrefs.textColor] || TEXT_COLOR_MAP.slate;

  // --- Sidebar & Navigation ---
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'catalog' | 'orders' | 'customers' | 'forecasting' | 'suppliers' | 'analytics' | 'finance' | 'notifications' | 'settings'
  >('dashboard');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Core Products State ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('giya_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // --- Orders State ---
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('giya_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const oldEnglishNames = [
          "Savannah Nguyen", "Jerome Bell", "Kristin Watson", "Darlene Robertson",
          "Cameron Williamson", "Courtney Henry", "Albert Flores", "Eleanor Pena",
          "Theresa Webb", "Marvin McKinney", "Esther Howard", "Zahra Putri",
          "Budi Hermawan", "Ratna Kartika", "Joko Supriadi", "Siti Rahayu",
          "Agus Hermawan", "Dewi Sartika", "Asep Sunandar", "Budi Utomo",
          "Cecep Nurjaman", "Ujang Mulyana", "Susi Susanti", "Floyd Miles",
          "Jane Cooper", "Wade Warren", "Guy Hawkins", "Leslie Alexander",
          "Arlene McCoy", "Darrell Steward", "Cody Fisher"
        ];
        const hasOldNames = parsed.some((o: any) => 
          oldEnglishNames.includes(o.clientName)
        );
        if (hasOldNames) {
          localStorage.setItem('giya_orders', JSON.stringify(initialOrders));
          return initialOrders;
        }
        return parsed;
      } catch (e) {
        return initialOrders;
      }
    }
    return initialOrders;
  });

  // --- Customers State ---
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('giya_customers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const oldEnglishNames = [
          "Savannah Nguyen", "Jerome Bell", "Kristin Watson", "Darlene Robertson",
          "Cameron Williamson", "Courtney Henry", "Albert Flores", "Eleanor Pena",
          "Theresa Webb", "Marvin McKinney", "Esther Howard", "Zahra Putri",
          "Budi Hermawan", "Ratna Kartika", "Joko Supriadi", "Siti Rahayu",
          "Agus Hermawan", "Dewi Sartika", "Asep Sunandar", "Budi Utomo",
          "Cecep Nurjaman", "Ujang Mulyana", "Susi Susanti", "Floyd Miles",
          "Jane Cooper", "Wade Warren", "Guy Hawkins", "Leslie Alexander",
          "Arlene McCoy", "Darrell Steward", "Cody Fisher"
        ];
        const hasOldNames = parsed.some((c: any) => 
          oldEnglishNames.includes(c.name)
        );
        if (hasOldNames) {
          localStorage.setItem('giya_customers', JSON.stringify(initialCustomers));
          return initialCustomers;
        }
        return parsed;
      } catch (e) {
        return initialCustomers;
      }
    }
    return initialCustomers;
  });

  // --- Suppliers State ---
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('giya_suppliers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasNoLocation = parsed.some((s: any) => !s.location);
        if (hasNoLocation) {
          localStorage.setItem('giya_suppliers', JSON.stringify(initialSuppliers));
          return initialSuppliers;
        }
        return parsed;
      } catch (e) {
        return initialSuppliers;
      }
    }
    return initialSuppliers;
  });

  // --- Transactions State ---
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('giya_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const oldEnglishNames = [
          "Savannah Nguyen", "Jerome Bell", "Kristin Watson", "Darlene Robertson",
          "Cameron Williamson", "Courtney Henry", "Albert Flores", "Eleanor Pena",
          "Theresa Webb", "Marvin McKinney", "Esther Howard", "Zahra Putri",
          "Budi Hermawan", "Ratna Kartika", "Joko Supriadi", "Siti Rahayu",
          "Agus Hermawan", "Dewi Sartika", "Asep Sunandar", "Budi Utomo",
          "Cecep Nurjaman", "Ujang Mulyana", "Susi Susanti", "Floyd Miles",
          "Jane Cooper", "Wade Warren", "Guy Hawkins", "Leslie Alexander",
          "Arlene McCoy", "Darrell Steward", "Cody Fisher", "Siti Aminah"
        ];
        const hasOldNames = parsed.some((t: any) => 
          oldEnglishNames.some(name => t.description?.includes(name))
        );
        const hasBulkDisbursement = parsed.some((t: any) => 
          t.description?.includes("Pencairan Dana")
        );
        if (hasOldNames || !hasBulkDisbursement) {
          localStorage.setItem('giya_transactions', JSON.stringify(initialTransactions));
          return initialTransactions;
        }
        return parsed;
      } catch (e) {
        return initialTransactions;
      }
    }
    return initialTransactions;
  });

  // --- Notifications State ---
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('giya_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const oldEnglishNames = [
          "Savannah Nguyen", "Jerome Bell", "Kristin Watson", "Darlene Robertson",
          "Cameron Williamson", "Courtney Henry", "Albert Flores", "Eleanor Pena",
          "Theresa Webb", "Marvin McKinney", "Esther Howard", "Zahra Putri",
          "Budi Hermawan", "Ratna Kartika", "Joko Supriadi", "Siti Rahayu",
          "Agus Hermawan", "Dewi Sartika", "Asep Sunandar", "Budi Utomo",
          "Cecep Nurjaman", "Ujang Mulyana", "Susi Susanti", "Floyd Miles",
          "Jane Cooper", "Wade Warren", "Guy Hawkins", "Leslie Alexander",
          "Arlene McCoy", "Darrell Steward", "Cody Fisher"
        ];
        const hasOldNames = parsed.some((n: any) =>
          oldEnglishNames.some(name => n.message?.includes(name))
        );
        if (hasOldNames) {
          localStorage.setItem('giya_notifications', JSON.stringify(initialNotifications));
          return initialNotifications;
        }
        return parsed;
      } catch (e) {
        return initialNotifications;
      }
    }
    return initialNotifications;
  });

  // --- GAS Sync State ---
  const [gasUrl, setGasUrl] = useState<string>(() => {
    return localStorage.getItem('giya_gas_url') || '';
  });
  
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'failed'>(() => {
    const savedStatus = localStorage.getItem('giya_conn_status');
    return (savedStatus as 'idle' | 'success' | 'failed') || 'idle';
  });

  const [lastSynced, setLastSynced] = useState<string | null>(() => {
    return localStorage.getItem('giya_last_synced') || null;
  });

  const [isTesting, setIsTesting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // --- Forecasting Parameters ---
  const [orderingCost, setOrderingCost] = useState<number>(() => {
    const saved = localStorage.getItem('giya_ordering_cost');
    return saved ? parseInt(saved) : 150000;
  });
  const [holdingCostRate, setHoldingCostRate] = useState<number>(() => {
    const saved = localStorage.getItem('giya_holding_rate');
    return saved ? parseFloat(saved) : 20;
  });
  const [safetyFactorZ, setSafetyFactorZ] = useState<number>(() => {
    const saved = localStorage.getItem('giya_safety_z');
    return saved ? parseFloat(saved) : 1.65;
  });
  const [useDynamicCalculation, setUseDynamicCalculation] = useState<boolean>(() => {
    const saved = localStorage.getItem('giya_use_dynamic');
    return saved ? JSON.parse(saved) : true;
  });

  // --- SKU Catalog View Sub-States ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- Persist States to LocalStorage ---
  useEffect(() => {
    localStorage.setItem('giya_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('giya_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('giya_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('giya_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('giya_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('giya_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('giya_gas_url', gasUrl);
  }, [gasUrl]);

  useEffect(() => {
    localStorage.setItem('giya_conn_status', connectionStatus);
  }, [connectionStatus]);

  useEffect(() => {
    if (lastSynced) localStorage.setItem('giya_last_synced', lastSynced);
  }, [lastSynced]);

  useEffect(() => {
    localStorage.setItem('giya_ordering_cost', String(orderingCost));
    localStorage.setItem('giya_holding_rate', String(holdingCostRate));
    localStorage.setItem('giya_safety_z', String(safetyFactorZ));
    localStorage.setItem('giya_use_dynamic', JSON.stringify(useDynamicCalculation));
  }, [orderingCost, holdingCostRate, safetyFactorZ, useDynamicCalculation]);

  // Success toast autoclose
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // --- Auto-healing of corrupted / zeroed out local state on mount ---
  useEffect(() => {
    if (products.length === 0) {
      setProducts(initialProducts);
      setOrders(initialOrders);
      setCustomers(initialCustomers);
      setSuppliers(initialSuppliers);
      setTransactions(initialTransactions);
      return;
    }
    const hasCorrupt = products.some(p => 
      !p.name || 
      p.name.trim() === '' ||
      p.name === 'Produk Tanpa Nama' || 
      p.name.toLowerCase() === 'tidak tersedia' || 
      p.category === 'Uncategorized' ||
      p.sellingPrice === 0 ||
      p.costPrice === 0
    );
    if (hasCorrupt) {
      setProducts(initialProducts);
      setOrders(initialOrders);
      setCustomers(initialCustomers);
      setSuppliers(initialSuppliers);
      setTransactions(initialTransactions);

      localStorage.setItem('giya_products', JSON.stringify(initialProducts));
      localStorage.setItem('giya_orders', JSON.stringify(initialOrders));
      localStorage.setItem('giya_customers', JSON.stringify(initialCustomers));
      localStorage.setItem('giya_suppliers', JSON.stringify(initialSuppliers));
      localStorage.setItem('giya_transactions', JSON.stringify(initialTransactions));
      
      setSuccessToast("Sistem mendeteksi data kosong/error, katalog aksesoris Giya otomatis dipulihkan!");
    }
  }, []);

  // --- Dynamic Mathematical Calculation Engine ---
  const processedProducts = useMemo(() => {
    return products.map((p) => {
      if (!useDynamicCalculation) {
        return {
          ...p,
          inventoryValue: p.currentStock * p.costPrice
        };
      }

      // Safe defaults if Google Sheet sync returned 0 or missing values
      const demand = p.avgDailyDemand > 0 ? p.avgDailyDemand : 0.25;
      const lead = p.leadTime > 0 ? p.leadTime : 5;

      // Calculate annual demand: D = demand * 365
      const dAnnual = demand * 365;
      
      // Calculate carrying cost rate: H = costPrice * holdingCostRate %
      const costForH = p.costPrice > 0 ? p.costPrice : 50000;
      const hAnnual = costForH * (holdingCostRate / 100);

      // Compute EOQ: sqrt((2 * D * S) / H)
      let eoqVal = p.eoq;
      if (hAnnual > 0 && dAnnual > 0) {
        eoqVal = Math.round(Math.sqrt((2 * dAnnual * orderingCost) / hAnnual));
      }
      if (!eoqVal || eoqVal === 0) {
        eoqVal = 20;
      }
      
      // Compute Safety Stock: Z * demand * sqrt(lead)
      const safetyStockVal = Math.max(1, Math.round(safetyFactorZ * demand * Math.sqrt(lead)));

      // Compute ROP: (demand * lead) + safetyStock
      const ropVal = Math.max(2, Math.round((demand * lead) + safetyStockVal));

      return {
        ...p,
        safetyStock: safetyStockVal,
        reorderPoint: ropVal,
        eoq: eoqVal,
        inventoryValue: p.currentStock * p.costPrice
      };
    });
  }, [products, useDynamicCalculation, orderingCost, holdingCostRate, safetyFactorZ]);

  const reorderAlertCount = useMemo(() => {
    return processedProducts.filter((p) => p.currentStock <= p.reorderPoint).length;
  }, [processedProducts]);

  // --- Fetch Data from Google Sheet Apps Script ---
  const handleFetchFromGAS = async (customUrl?: string) => {
    const urlToUse = customUrl || gasUrl;
    if (!urlToUse) return;

    setIsTesting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(urlToUse);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        let syncedCountText: string[] = [];
        let finalProductsList = [...products];
        let finalCustomersList = [...customers];
        let finalOrdersList = [...orders];
        let finalTransactionsList = [...transactions];

        // 1. Sync Products (if products array is returned, or fallback to result.data)
        const rawProducts = result.products || (Array.isArray(result.data) ? result.data : null);
        if (Array.isArray(rawProducts)) {
          const mappedProducts: Product[] = rawProducts
            .map((item: any, idx: number) => {
              const cost = parseFloat(item.costPrice) || 0;
              const sell = parseFloat(item.sellingPrice) || 0;
              const currentStock = parseFloat(item.currentStock) || 0;
              const margin = sell > 0 ? parseFloat((((sell - cost) / sell) * 100).toFixed(1)) : 0;
              
              // Smart recovery of demand, lead time, and safety parameters if 0 or missing
              const rawDemand = parseFloat(item.avgDailyDemand);
              const avgDailyDemand = (!isNaN(rawDemand) && rawDemand > 0) 
                ? rawDemand 
                : parseFloat((0.15 + (Math.floor(Math.random() * 35) / 100)).toFixed(2)); // realistic default 0.15 - 0.50

              const rawLead = parseFloat(item.leadTime);
              const leadTime = (!isNaN(rawLead) && rawLead > 0)
                ? rawLead
                : (Math.floor(Math.random() * 4) + 4); // 4 - 7 days lead time

              const rawSafety = parseFloat(item.safetyStock);
              const safetyStock = (!isNaN(rawSafety) && rawSafety > 0)
                ? rawSafety
                : Math.max(1, Math.round(avgDailyDemand * 10 * 1.5));

              const rawRop = parseFloat(item.reorderPoint);
              const reorderPoint = (!isNaN(rawRop) && rawRop > 0)
                ? rawRop
                : Math.max(2, Math.round((avgDailyDemand * leadTime) + safetyStock));

              const rawEoq = parseFloat(item.eoq);
              const eoq = (!isNaN(rawEoq) && rawEoq > 0)
                ? rawEoq
                : Math.max(10, Math.round(Math.sqrt((2 * (avgDailyDemand * 365) * 50000) / (cost * 0.15)) || 25));

              return {
                id: item.id || `PRD${String(idx + 1).padStart(3, '0')}`,
                sku: item.sku || `GYA-SKU-${idx + 1}`,
                name: item.name || 'Produk Tanpa Nama',
                category: item.category || 'Uncategorized',
                brand: item.brand || 'Giya Gold',
                material: item.material || 'Lainnya',
                unit: item.unit || 'pcs',
                costPrice: cost,
                sellingPrice: sell,
                profitMargin: margin,
                currentStock: currentStock,
                safetyStock: safetyStock,
                reorderPoint: reorderPoint,
                eoq: eoq,
                leadTime: leadTime,
                inventoryValue: cost * currentStock,
                lastPurchaseDate: item.lastPurchaseDate || new Date().toISOString().split('T')[0],
                lastSalesDate: item.lastSalesDate || new Date().toISOString().split('T')[0],
                status: (item.status === 'Inactive' ? 'Inactive' : 'Active') as 'Active' | 'Inactive',
                avgDailyDemand: avgDailyDemand
              };
            })
            // Filter out empty rows, non-existent rows, or corrupted rows from Sheets
            .filter((p: Product) => {
              const isValidName = p.name && p.name.trim() !== '' && p.name !== 'Produk Tanpa Nama' && p.name.toLowerCase() !== 'tidak tersedia';
              // Keep if name is valid, and SKU is valid or selling price is greater than 0
              return !!isValidName && (p.costPrice > 0 || p.sellingPrice > 0);
            });

          if (mappedProducts.length > 0) {
            setProducts(mappedProducts);
            finalProductsList = mappedProducts;
            syncedCountText.push(`${mappedProducts.length} Produk`);
          } else {
            console.warn("Sinkronisasi: Tidak ada produk valid yang disaring dari Google Sheet.");
          }
        }

        // 2. Sync Customers
        let activeCustomersList = [...customers];
        if (Array.isArray(result.customers)) {
          const mappedCustomers: Customer[] = result.customers.map((item: any, idx: number) => {
            return {
              id: item.id || `CST${String(idx + 1).padStart(3, '0')}`,
              name: item.name || 'Pelanggan Tanpa Nama',
              email: item.email || 'customer@gmail.com',
              location: item.location || item.lokasi || item.kota || item.city || item.alamat || 'Bandung, Jawa Barat',
              joinedDate: item.joinedDate || new Date().toISOString().split('T')[0],
              ordersCount: parseInt(item.ordersCount) || 0,
              spent: parseFloat(item.spent) || 0,
              status: item.status === 'Inactive' ? 'Inactive' : (item.status === 'Pending' ? 'Pending' : 'Active')
            };
          });
          activeCustomersList = mappedCustomers;
          setCustomers(mappedCustomers);
          finalCustomersList = mappedCustomers;
          syncedCountText.push(`${mappedCustomers.length} Pelanggan`);
        }

        // 3. Sync Orders
        if (Array.isArray(result.orders)) {
          const mappedOrders: Order[] = result.orders.map((item: any, idx: number) => {
            let namesArr: string[] = [];
            if (Array.isArray(item.productNames)) {
              namesArr = item.productNames;
            } else if (typeof item.productNames === 'string') {
              namesArr = item.productNames.split(',').map((s: string) => s.trim()).filter(Boolean);
            } else if (item.productNames) {
              namesArr = [String(item.productNames)];
            } else {
              namesArr = ['Aksesoris Cantik'];
            }
            
            // Cek apakah item.name adalah nama produk (misalnya karena tertimpa di Apps Script)
            const emailStr = (item.email || '').trim().toLowerCase();
            const matchedCustomer = activeCustomersList.find(c => c.email && c.email.trim().toLowerCase() === emailStr);
            
            const isNameAProduct = item.name && (
              item.name.includes(',') || 
              item.name === item.productNames ||
              (typeof item.productNames === 'string' && item.productNames.includes(item.name)) ||
              namesArr.some(prodName => prodName.toLowerCase() === item.name.toLowerCase())
            );

            let finalClientName = 'Pelanggan';
            if (item.clientName) {
              finalClientName = item.clientName;
            } else if (item.customerName) {
              finalClientName = item.customerName;
            } else if (item.name && !isNameAProduct) {
              finalClientName = item.name;
            } else if (matchedCustomer) {
              finalClientName = matchedCustomer.name;
            } else if (item.name) {
              finalClientName = item.name;
            }

            return {
              id: item.id || `#ORD-${String(idx + 1).padStart(4, '0')}`,
              clientName: finalClientName,
              email: item.email || 'customer@gmail.com',
              date: item.date || new Date().toISOString().split('T')[0],
              amount: parseFloat(item.amount) || 0,
              itemsCount: parseInt(item.itemsCount) || namesArr.length || 1,
              paymentMethod: item.paymentMethod || 'Bank Transfer',
              status: item.status || 'Completed',
              productNames: namesArr
            };
          });
          setOrders(mappedOrders);
          finalOrdersList = mappedOrders;
          syncedCountText.push(`${mappedOrders.length} Pesanan`);
        }

        // 4. Sync Suppliers
        if (Array.isArray(result.suppliers)) {
          const mappedSuppliers: Supplier[] = result.suppliers.map((item: any, idx: number) => {
            return {
              id: item.id || item.supplierId || item.idSupplier || item.idPemasok || `SUP${String(idx + 1).padStart(3, '0')}`,
              name: item.name || item.supplierName || item.namaSupplier || item.namaPemasok || item.namaVendor || item.vendorName || 'Supplier Tanpa Nama',
              contactPerson: item.contactPerson || item.contactName || item.kontak || item.narahubung || 'Narahubung',
              contactName: item.contactName || item.contactPerson || item.kontak || item.narahubung || 'Narahubung',
              email: item.email || 'supplier@gmail.com',
              phone: item.phone || item.telp || item.telepon || item.noHp || '-',
              leadTime: parseFloat(item.leadTime) || parseFloat(item.leadTimeDays) || parseFloat(item.waktuTunggu) || 5,
              leadTimeDays: parseFloat(item.leadTimeDays) || parseFloat(item.leadTime) || parseFloat(item.waktuTunggu) || 5,
              reliability: parseFloat(item.reliability) || parseFloat(item.keandalan) || 100,
              rating: parseFloat(item.rating) || 5,
              status: item.status || 'Active',
              location: item.location || item.lokasi || item.kota || item.city || item.alamat || 'Bandung, Jawa Barat',
              material: item.material || item.category || item.bahan || item.kategori || 'Emas & Perak',
              category: item.category || item.material || item.kategori || item.bahan || 'Emas & Perak',
              ordersPlaced: parseInt(item.ordersPlaced) || parseInt(item.jumlahPesanan) || 0,
              outstandingAmount: parseFloat(item.outstandingAmount) || parseFloat(item.tagihan) || 0
            };
          });
          setSuppliers(mappedSuppliers);
          syncedCountText.push(`${mappedSuppliers.length} Pemasok`);
        }

        // 5. Sync Transactions
        if (Array.isArray(result.transactions)) {
          const mappedTransactions: Transaction[] = result.transactions.map((item: any, idx: number) => {
            return {
              id: item.id || `#TRX-00${idx + 1}`,
              description: item.description || 'Transaksi',
              date: item.date || new Date().toISOString().split('T')[0],
              category: item.category || 'Sales',
              amount: parseFloat(item.amount) || 0,
              type: item.type === 'Expense' ? 'Expense' : 'Income',
              status: item.status === 'Pending' ? 'Pending' : 'Settled'
            };
          });
          setTransactions(mappedTransactions);
          finalTransactionsList = mappedTransactions;
          syncedCountText.push(`${mappedTransactions.length} Transaksi`);
        }

        setConnectionStatus('success');
        const nowStr = new Date().toLocaleString('id-ID');
        setLastSynced(nowStr);
        
        // Auto-regenerate notifications with the latest data from the sheet
        handleRefreshNotifications(finalProductsList, finalOrdersList, finalCustomersList, finalTransactionsList);
        
        setSuccessToast(`Berhasil mensinkronisasi ${syncedCountText.join(', ')} dari Google Sheets secara real-time!`);
      } else {
        throw new Error(result.error || "Gagal mengurai data. Pastikan format kolom Google Sheets sesuai.");
      }
    } catch (err: any) {
      console.error(err);
      setConnectionStatus('failed');
      setErrorMessage(err.message || 'Gagal menghubungi server Google Apps Script.');
    } finally {
      setIsTesting(false);
    }
  };

  // --- Purchase Order (PO) Action Handlers ---
  const handlePlacePO = (supplierId: string, productId: string, qty: number, pricePerUnit: number) => {
    const matchedProduct = products.find(p => p.id === productId);
    const matchedSupplier = suppliers.find(s => s.id === supplierId);
    if (!matchedProduct || !matchedSupplier) return;

    // Create Expense Transaction
    const newTx: Transaction = {
      id: `#TRX-00${Math.floor(10 + Math.random() * 90)}`,
      description: `Kirim PO: ${qty}x ${matchedProduct.name} ke ${matchedSupplier.name}`,
      date: new Date().toISOString().split('T')[0],
      category: 'Purchase',
      amount: pricePerUnit * qty,
      type: 'Expense',
      status: 'Settled'
    };
    setTransactions([newTx, ...transactions]);

    // Create Notification Log
    const newNotif: NotificationItem = {
      id: `NOT-00${Math.floor(10 + Math.random() * 90)}`,
      title: 'Purchase Order Dikirim',
      message: `Sukses memesan ${qty} pcs ${matchedProduct.name} ke vendor ${matchedSupplier.name}.`,
      timeAgo: 'Baru saja',
      type: 'system',
      isRead: false
    };
    setNotifications([newNotif, ...notifications]);

    // Simulate Receiving Stock instantly! (Live experience helper)
    setProducts(products.map(p => p.id === productId ? { 
      ...p, 
      currentStock: p.currentStock + qty,
      inventoryValue: (p.currentStock + qty) * p.costPrice
    } : p));

    setSuccessToast(`Pesanan PO berhasil dikirim ke ${matchedSupplier.name}. Stok otomatis terupdate.`);
  };

  const handlePlacePOToSupplier = (productId: string, qty: number) => {
    const matchedProduct = products.find(p => p.id === productId);
    if (!matchedProduct) return;
    const sup = suppliers[0] || { id: 'SUP001' };
    handlePlacePO(sup.id, productId, qty, matchedProduct.costPrice);
  };

  // --- Orders & Billing Action Handlers ---
  const handleAddOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);

    // Create Income Transaction
    const newTx: Transaction = {
      id: `#TRX-0${Math.floor(100 + Math.random() * 900)}`,
      description: `Penjualan Online - ${newOrder.clientName}`,
      date: newOrder.date,
      category: 'Sales',
      amount: newOrder.amount,
      type: 'Income',
      status: 'Settled'
    };
    setTransactions([newTx, ...transactions]);

    // Handle Customer metrics
    const existingCustIdx = customers.findIndex(c => c.name.toLowerCase() === newOrder.clientName.toLowerCase());
    if (existingCustIdx !== -1) {
      setCustomers(customers.map((c, i) => i === existingCustIdx ? {
        ...c,
        ordersCount: c.ordersCount + 1,
        spent: c.spent + newOrder.amount
      } : c));
    } else {
      const newCust: Customer = {
        id: `CST0${Math.floor(10 + Math.random() * 90)}`,
        name: newOrder.clientName,
        email: newOrder.email,
        location: 'Bandung, West Java',
        joinedDate: new Date().toISOString().split('T')[0],
        ordersCount: 1,
        spent: newOrder.amount,
        status: 'Active'
      };
      setCustomers([newCust, ...customers]);
    }

    // Push new notification
    const newNotif: NotificationItem = {
      id: `NOT-0${Math.floor(100 + Math.random() * 900)}`,
      title: `Pesanan Baru Masuk`,
      message: `Pesanan baru senilai Rp ${newOrder.amount.toLocaleString('id-ID')} berhasil diterima dari ${newOrder.clientName}.`,
      timeAgo: 'Baru saja',
      type: 'order',
      isRead: false
    };
    setNotifications([newNotif, ...notifications]);

    setSuccessToast(`Pesanan berhasil dibuat! Transaksi tercatat.`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    
    const newNotif: NotificationItem = {
      id: `NOT-00${Math.floor(10 + Math.random() * 90)}`,
      title: `Status Pesanan Diubah`,
      message: `Pesanan ${orderId} diubah statusnya menjadi ${status}.`,
      timeAgo: 'Baru saja',
      type: 'order',
      isRead: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  // --- Notifications Mark / Clean ---
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleRefreshNotifications = (
    customProducts?: Product[],
    customOrders?: Order[],
    customCustomers?: Customer[],
    customTransactions?: Transaction[]
  ) => {
    const targetProducts = customProducts || products;
    const targetOrders = customOrders || orders;
    const targetCustomers = customCustomers || customers;
    const targetTransactions = customTransactions || transactions;

    const generated: NotificationItem[] = [];

    // 1. Check Low Stock (max 4)
    const lowStockProducts = [...targetProducts]
      .filter(p => p.currentStock <= p.reorderPoint)
      .slice(0, 4);
    
    lowStockProducts.forEach((p, index) => {
      generated.push({
        id: `NOT-STOCK-${p.id}-${index}-${Date.now()}`,
        title: `Peringatan Stok Rendah (${p.sku})`,
        message: `Produk '${p.name}' hanya tersisa ${p.currentStock} unit di bawah batas aman ROP (${p.reorderPoint} unit).`,
        timeAgo: "Baru saja terdeteksi",
        type: 'stock',
        isRead: false
      });
    });

    // 2. Check Recent Orders (max 4)
    const sortedOrdersList = [...targetOrders]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
    
    sortedOrdersList.forEach((o, index) => {
      generated.push({
        id: `NOT-ORDER-${o.id}-${index}-${Date.now()}`,
        title: `Pesanan Baru ${o.id}`,
        message: `${o.clientName} melakukan pemesanan senilai Rp ${o.amount.toLocaleString('id-ID')} (${o.productNames.join(', ')}).`,
        timeAgo: "Berdasarkan transaksi terbaru",
        type: 'order',
        isRead: false
      });
    });

    // 3. VIP / Big spender customers (max 3)
    const vipCustomers = [...targetCustomers]
      .filter(c => c.spent >= 5000000)
      .slice(0, 3);
    
    vipCustomers.forEach((c, index) => {
      generated.push({
        id: `NOT-CUST-${c.id}-${index}-${Date.now()}`,
        title: `Aktivitas Pelanggan Premium`,
        message: `Pelanggan '${c.name}' terdeteksi sebagai VIP dengan total pembelanjaan Rp ${c.spent.toLocaleString('id-ID')}.`,
        timeAgo: "Status Akun Terkini",
        type: 'customer',
        isRead: true
      });
    });

    // 4. Financial large payments / transfers (max 3)
    const largeTransactions = [...targetTransactions]
      .filter(t => t.amount >= 1000000)
      .slice(0, 3);
    
    largeTransactions.forEach((t, index) => {
      generated.push({
        id: `NOT-PAY-${t.id}-${index}-${Date.now()}`,
        title: t.type === 'Income' ? 'Penerimaan Kas Masuk' : 'Pengeluaran Kas Keluar',
        message: `${t.description} sebesar Rp ${t.amount.toLocaleString('id-ID')} tercatat dengan status ${t.status}.`,
        timeAgo: "Buku Kas Terkini",
        type: 'payment',
        isRead: true
      });
    });

    // Fallback if none generated
    const finalNotifs = generated.length > 0 ? generated : initialNotifications;
    setNotifications(finalNotifs);
    setSuccessToast("Aktivitas dan log notifikasi berhasil diperbarui berdasarkan data teraktual!");
    return finalNotifs;
  };

  // --- SKU Catalog Handlers ---
  const handleSaveProduct = (p: Product) => {
    const exists = products.some((prod) => prod.id === p.id);
    if (exists) {
      setProducts(products.map((prod) => prod.id === p.id ? p : prod));
      setSuccessToast(`SKU ${p.sku} berhasil diperbarui!`);
    } else {
      setProducts([p, ...products]);
      setSuccessToast(`SKU ${p.sku} berhasil ditambahkan!`);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk SKU: ${p.sku}?`)) {
      setProducts(products.filter((prod) => prod.id !== id));
      setSuccessToast(`SKU ${p.sku} berhasil dihapus dari katalog.`);
    }
  };

  const handleEditProduct = (p: Product) => {
    setEditingProduct(p);
    setIsFormOpen(true);
  };

  const handleAddProductClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers([newSupplier, ...suppliers]);
    setSuccessToast(`Supplier ${newSupplier.name} sukses ditambahkan!`);
  };

  const handleSaveGasUrl = (url: string) => {
    setGasUrl(url);
    handleFetchFromGAS(url);
  };

  const handleResetGasUrl = () => {
    setGasUrl('');
    setConnectionStatus('idle');
    setLastSynced(null);
    setProducts(initialProducts);
  };

  // State to track if there is a custom default saved
  const [hasCustomDefault, setHasCustomDefault] = useState<boolean>(() => {
    return !!localStorage.getItem('giya_custom_default_products');
  });

  const handleSetCurrentAsDefault = () => {
    localStorage.setItem('giya_custom_default_products', JSON.stringify(products));
    localStorage.setItem('giya_custom_default_orders', JSON.stringify(orders));
    localStorage.setItem('giya_custom_default_customers', JSON.stringify(customers));
    localStorage.setItem('giya_custom_default_suppliers', JSON.stringify(suppliers));
    localStorage.setItem('giya_custom_default_transactions', JSON.stringify(transactions));
    setHasCustomDefault(true);
    setSuccessToast("Halaman/Data saat ini sukses disimpan sebagai Setelan Awal baru!");
  };

  const handleClearCustomDefault = () => {
    localStorage.removeItem('giya_custom_default_products');
    localStorage.removeItem('giya_custom_default_orders');
    localStorage.removeItem('giya_custom_default_customers');
    localStorage.removeItem('giya_custom_default_suppliers');
    localStorage.removeItem('giya_custom_default_transactions');
    setHasCustomDefault(false);
    setSuccessToast("Setelan awal kustom berhasil dihapus. Kembali ke default bawaan asli Giya.");
  };

  const handleResetToDemoData = () => {
    // Clear Google Sheets URL state and syncing states
    setGasUrl('');
    setConnectionStatus('idle');
    setLastSynced(null);
    localStorage.removeItem('giya_gas_url');
    localStorage.removeItem('giya_last_synced');

    // Retrieve saved custom defaults or fall back to code defaults
    const customProducts = localStorage.getItem('giya_custom_default_products');
    const customOrders = localStorage.getItem('giya_custom_default_orders');
    const customCustomers = localStorage.getItem('giya_custom_default_customers');
    const customSuppliers = localStorage.getItem('giya_custom_default_suppliers');
    const customTransactions = localStorage.getItem('giya_custom_default_transactions');

    const targetProducts = customProducts ? JSON.parse(customProducts) : initialProducts;
    const targetOrders = customOrders ? JSON.parse(customOrders) : initialOrders;
    const targetCustomers = customCustomers ? JSON.parse(customCustomers) : initialCustomers;
    const targetSuppliers = customSuppliers ? JSON.parse(customSuppliers) : initialSuppliers;
    const targetTransactions = customTransactions ? JSON.parse(customTransactions) : initialTransactions;

    // Reset Core States to Target Datasets
    setProducts(targetProducts);
    setOrders(targetOrders);
    setCustomers(targetCustomers);
    setSuppliers(targetSuppliers);
    setTransactions(targetTransactions);

    // Persist defaults back to active local storage
    localStorage.setItem('giya_products', JSON.stringify(targetProducts));
    localStorage.setItem('giya_orders', JSON.stringify(targetOrders));
    localStorage.setItem('giya_customers', JSON.stringify(targetCustomers));
    localStorage.setItem('giya_suppliers', JSON.stringify(targetSuppliers));
    localStorage.setItem('giya_transactions', JSON.stringify(targetTransactions));

    setSuccessToast(customProducts ? "Semua data berhasil disetel ulang ke setelan awal kustom Anda!" : "Semua data berhasil disetel ulang ke setelan awal default!");
  };

  // Unread Notification Badge
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  // Sidebar Links config
  const navLinks: { id: typeof activeTab; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Katalog SKU', icon: Layers },
    { id: 'orders', label: 'Pesanan', icon: ShoppingCart },
    { id: 'customers', label: 'Daftar Pelanggan', icon: Users },
    { id: 'forecasting', label: 'Peramalan AI', icon: TrendingUp },
    { id: 'suppliers', label: 'Supplier & Vendor', icon: Truck },
    { id: 'analytics', label: 'Analitik Bisnis', icon: BarChart3 },
    { id: 'finance', label: 'Keuangan & Kas', icon: DollarSign },
    { id: 'notifications', label: 'Notifikasi', icon: Bell, badge: unreadCount },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className={`min-h-screen ${activeFont.className} ${activeEffect.ambientClass} ${activeTextColor.className} flex transition-all duration-300`}>
      
      {/* SIDEBAR NAVIGATION - DESKTOP */}
      <aside className={`hidden lg:flex flex-col w-64 bg-white border-r ${activeTheme.primaryBorder} shrink-0 sticky top-0 h-screen transition-all duration-300`}>
        {/* Brand logo header with flower */}
        <div className={`p-6 border-b ${activeTheme.primaryBorderLight} flex items-center gap-3 bg-gradient-to-r ${activeTheme.bgGradient}`}>
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${themePrefs.theme === 'rose' ? 'from-pink-500 to-rose-500 shadow-pink-500/20' : themePrefs.theme === 'ocean' ? 'from-blue-500 to-sky-500 shadow-blue-500/20' : themePrefs.theme === 'emerald' ? 'from-emerald-500 to-teal-500 shadow-emerald-500/20' : themePrefs.theme === 'sunset' ? 'from-orange-500 to-amber-500 shadow-orange-500/20' : 'from-violet-500 to-purple-500 shadow-violet-500/20'} flex items-center justify-center text-white shadow-md`}>
            <Flower className="w-5.5 h-5.5 text-white animate-spin-slow" />
          </div>
          <div>
            <h2 className={`font-bold text-sm ${activeTheme.textHeader} tracking-tight`}>Giya Business</h2>
            <span className={`text-[10px] uppercase font-extrabold tracking-widest ${themePrefs.theme === 'rose' ? 'text-pink-500' : themePrefs.theme === 'ocean' ? 'text-blue-500' : themePrefs.theme === 'emerald' ? 'text-emerald-500' : themePrefs.theme === 'sunset' ? 'text-orange-500' : 'text-violet-500'} font-mono block -mt-0.5`}>Management System</span>
          </div>
        </div>

        {/* Scrollable Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all relative group cursor-pointer ${
                  isActive 
                    ? `${activeTheme.sidebarActive} font-extrabold shadow-sm` 
                    : `text-slate-600 hover:${activeTheme.primaryText} hover:${activeTheme.primaryBgLight}`
                }`}
              >
                {/* Accent bar */}
                {isActive && (
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 ${activeTheme.accentBar} rounded-r-full`} />
                )}
                <Icon className={`w-4.5 h-4.5 ${isActive ? activeTheme.primaryText : `text-slate-400 group-hover:${activeTheme.primaryText}`}`} />
                <span>{link.label}</span>
                {link.badge && link.badge > 0 ? (
                  <span className={`ml-auto ${activeTheme.badge} font-extrabold text-[9px] px-2 py-0.5 rounded-full`}>
                    {link.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User profile */}
        <div className={`p-4 border-t ${activeTheme.primaryBorderLight} ${activeTheme.primaryBgLight} flex items-center gap-3`}>
          <div className={`w-9 h-9 rounded-full ${activeTheme.primaryBgLight} border ${activeTheme.primaryBorder} flex items-center justify-center font-bold ${activeTheme.primaryText} text-xs select-none`}>
            {localStorage.getItem('giya_user_name') ? localStorage.getItem('giya_user_name')?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'EF'}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-xs font-bold ${activeTheme.textHeader} truncate`}>{localStorage.getItem('giya_user_name') || 'Erika Fitriani'}</h4>
            <p className={`text-[10px] ${activeTheme.primaryText}/60 font-medium truncate`}>{localStorage.getItem('giya_user_store') || 'Admin Giya'}</p>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER BAR */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className={`lg:hidden sticky top-0 z-40 bg-white border-b ${activeTheme.primaryBorder} px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${themePrefs.theme === 'rose' ? 'from-pink-500 to-rose-500' : themePrefs.theme === 'ocean' ? 'from-blue-500 to-sky-500' : themePrefs.theme === 'emerald' ? 'from-emerald-500 to-teal-500' : themePrefs.theme === 'sunset' ? 'from-orange-500 to-amber-500' : 'from-violet-500 to-purple-500'} flex items-center justify-center text-white shadow-xs`}>
              <Flower className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`font-bold text-xs ${activeTheme.textHeader} tracking-tight`}>Giya Business</h2>
              <span className={`text-[8px] ${activeTheme.primaryText} uppercase tracking-wider font-bold block -mt-0.5`}>Management System</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className={`bg-pink-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full`}>
                {unreadCount}
              </span>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 ${activeTheme.primaryBgLight} ${activeTheme.primaryText} rounded-lg cursor-pointer`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* MOBILE SLIDE-IN MENU DRAWER */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden flex justify-end animate-fade-in">
            <div className={`w-64 bg-white h-full flex flex-col border-l ${activeTheme.primaryBorder} shadow-2xl`}>
              <div className={`p-4 border-b ${activeTheme.primaryBorderLight} flex justify-between items-center ${activeTheme.primaryBgLight}`}>
                <span className={`font-bold ${activeTheme.textHeader} text-xs`}>Giya Navigation Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => { setActiveTab(link.id); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        isActive 
                          ? `${activeTheme.sidebarActive} font-extrabold` 
                          : `text-slate-600 hover:${activeTheme.primaryBgLight}`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                      {link.badge && link.badge > 0 ? (
                        <span className={`ml-auto ${activeTheme.badge} font-extrabold text-[8px] px-1.5 py-0.5 rounded-full`}>
                          {link.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>

              <div className={`p-4 border-t ${activeTheme.primaryBorderLight} flex items-center gap-2.5 ${activeTheme.primaryBgLight}`}>
                <div className={`w-8 h-8 rounded-full ${activeTheme.primaryBgLight} border ${activeTheme.primaryBorder} flex items-center justify-center font-bold ${activeTheme.primaryText} text-xs`}>
                  {localStorage.getItem('giya_user_name') ? localStorage.getItem('giya_user_name')?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'EF'}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${activeTheme.textHeader}`}>{localStorage.getItem('giya_user_name') || 'Erika Fitriani'}</h4>
                  <p className={`text-[9px] ${activeTheme.primaryText}/60`}>{localStorage.getItem('giya_user_store') || 'Admin Giya'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOP STATUS BAR OVERVIEW & TOAST NOTIFICATION */}
        <div className="p-4 lg:p-6 border-b border-pink-50 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {connectionStatus === 'success' ? (
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Terhubung ke Google Sheet</span>
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 border border-pink-100 text-xs font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span>Mode Demo Lokal</span>
              </span>
            )}

            {lastSynced && (
              <span className="text-xs text-slate-400 font-mono">
                Update terakhir: {lastSynced}
              </span>
            )}
          </div>


        </div>

        {/* ACTIVE CANVAS MAIN WINDOW */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto animate-fade-in pb-16">
          
          {/* TOASTS NOTIFICATIONS */}
          {successToast && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-2xl shadow-xl px-5 py-4 border border-slate-800 flex items-center gap-3 animate-slide-up max-w-sm">
              <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0 animate-bounce" />
              <div className="text-xs">
                <p className="font-bold text-white">Sukses</p>
                <p className="text-slate-300 mt-0.5 font-medium">{successToast}</p>
              </div>
              <button onClick={() => setSuccessToast(null)} className="text-slate-400 hover:text-white ml-2 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ROP ALERTS STAGE WIDGET */}
          {reorderAlertCount > 0 && activeTab !== 'notifications' && activeTab !== 'forecasting' && (
            <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 px-5 py-3.5 rounded-2xl flex items-center justify-between flex-wrap gap-3.5 shadow-2xs">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 animate-pulse shrink-0" />
                <div className="text-xs">
                  <span className="font-extrabold text-amber-950 block">Perhatian: Ada {reorderAlertCount} SKU aksesoris di bawah batas aman (ROP)!</span>
                  <span className="text-amber-800 mt-0.5 block">Lakukan pemesanan ulang segera ke Supplier untuk menjamin kelangsungan stok toko.</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('forecasting')}
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Lihat Rekomendasi
              </button>
            </div>
          )}

          {/* SUB ROUTER STAGE WINDOWS */}
          {(() => {
            switch (activeTab) {
              case 'dashboard':
                return (
                  <DashboardView 
                    products={processedProducts}
                    orders={orders}
                    onAddOrder={() => setActiveTab('orders')}
                    onNavigateToTab={(tab) => setActiveTab(tab)}
                    orderingCost={orderingCost}
                    holdingCostRate={holdingCostRate}
                    themePrefs={themePrefs}
                    onUpdateThemePrefs={handleUpdateThemePrefs}
                  />
                );
              case 'catalog':
                return (
                  <ProductsView 
                    products={processedProducts}
                    onAddProduct={handleAddProductClick}
                    onEditProduct={handleEditProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                );
              case 'orders':
                return (
                  <OrdersView 
                    orders={orders}
                    products={processedProducts}
                    onAddOrder={handleAddOrder}
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                  />
                );
              case 'customers':
                return (
                  <CustomersView 
                    customers={customers}
                  />
                );
              case 'forecasting':
                return (
                  <ForecastingView 
                    products={processedProducts}
                    orderingCost={orderingCost}
                    holdingCostRate={holdingCostRate}
                    safetyFactorZ={safetyFactorZ}
                    useDynamicCalculation={useDynamicCalculation}
                    onUpdateParams={({ orderingCost: s, holdingCostRate: h, safetyFactorZ: z, useDynamicCalculation: d }) => {
                      setOrderingCost(s);
                      setHoldingCostRate(h);
                      setSafetyFactorZ(z);
                      setUseDynamicCalculation(d);
                      setSuccessToast("Parameter matematika EOQ & Safety Stock diperbarui!");
                    }}
                    onPlacePOToSupplier={handlePlacePOToSupplier}
                  />
                );
              case 'suppliers':
                return (
                  <SuppliersView 
                    suppliers={suppliers}
                    products={processedProducts}
                    onAddSupplier={handleAddSupplier}
                    onPlacePO={handlePlacePO}
                  />
                );
              case 'analytics':
                return (
                  <AnalyticsView 
                    products={processedProducts}
                    orders={orders}
                    suppliers={suppliers}
                    customers={customers}
                  />
                );
              case 'finance':
                return (
                  <FinanceView 
                    transactions={transactions}
                  />
                );
              case 'notifications':
                return (
                  <NotificationsView 
                    notifications={notifications}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onMarkAsRead={handleMarkAsRead}
                    onClearAll={handleClearAllNotifications}
                    onRefresh={() => handleRefreshNotifications()}
                  />
                );
              case 'settings':
                return (
                  <SettingsView 
                    gasUrl={gasUrl}
                    onSaveGasUrl={handleSaveGasUrl}
                    onResetGasUrl={handleResetGasUrl}
                    onResetToDemoData={handleResetToDemoData}
                    onSetCurrentAsDefault={handleSetCurrentAsDefault}
                    onClearCustomDefault={handleClearCustomDefault}
                    hasCustomDefault={hasCustomDefault}
                    connectionStatus={connectionStatus}
                    lastSynced={lastSynced}
                    isTesting={isTesting}
                    errorMessage={errorMessage}
                  />
                );
              default:
                return (
                  <div className="text-center py-20 text-slate-400">
                    Menu dalam tahap pengerjaan.
                  </div>
                );
            }
          })()}
        </main>
      </div>

      {/* --- ADD/EDIT MODAL SHEET --- */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
          availableCategories={['Necklace', 'Ring', 'Bracelet', 'Earrings', 'Pendant', 'Anklet', 'Brooch', 'Hair Accessories', 'Gift Set', 'Limited Edition']}
        />
      )}
    </div>
  );
}
