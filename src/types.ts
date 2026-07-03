export interface Product {
  id: string;               // PRD001
  sku: string;              // GYA-NEC-0001
  name: string;             // Kalung Bunga Mawar Gold
  category: string;         // Necklace
  brand: string;            // Elora Fine Jewels
  material: string;         // Gold 18K
  unit: string;             // pcs or pair or set
  costPrice: number;        // 151000
  sellingPrice: number;     // 209000
  profitMargin: number;     // 27.8 (%)
  currentStock: number;     // 1507
  safetyStock: number;      // 2
  reorderPoint: number;     // 3
  eoq: number;              // 28
  leadTime: number;         // 5 (hari)
  inventoryValue: number;   // 227557000 (computed as costPrice * currentStock)
  lastPurchaseDate: string; // 6/9/2026
  lastSalesDate: string;    // 6/13/2026
  status: 'Active' | 'Inactive'; // Active
  avgDailyDemand: number;   // 0.22
  imageUrl?: string;
}

export interface SheetConfig {
  sheetUrl: string;
  gasUrl: string;
  isConnected: boolean;
  lastSynced: string | null;
}

export interface Order {
  id: string;
  clientName: string;
  email: string;
  date: string;
  amount: number;
  itemsCount: number;
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'COD' | 'E-Wallet';
  status: 'Completed' | 'Pending' | 'In Progress' | 'Cancelled';
  productNames: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  joinedDate: string;
  ordersCount: number;
  spent: number;
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  contactName?: string;
  email: string;
  phone: string;
  category?: string;
  material?: string;
  leadTimeDays?: number;
  leadTime?: number;
  reliability?: number;
  costPerPO?: number;
  activeOrders?: number;
  rating: number;
  location?: string;
  ordersPlaced?: number;
  outstandingAmount?: number;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  category: 'Sales' | 'Purchase' | 'Operations' | 'Marketing' | 'Logistics' | 'Staff';
  amount: number;
  type: 'Income' | 'Expense';
  status: 'Settled' | 'Pending';
}

export interface ForecastItem {
  productId: string;
  productName: string;
  category: string;
  avgDailyDemand: number;
  currentStock: number;
  safetyStock: number;
  reorderPoint: number;
  forecastedDemand30Days: number;
  recommendedOrderQty: number;
  estimatedStockOutDays: number; // days until stockout
  actionRequired: 'Reorder Now' | 'Watchlist' | 'Healthy';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'order' | 'stock' | 'payment' | 'customer' | 'system';
  isRead: boolean;
}
