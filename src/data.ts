import { Product } from './types';

export const initialProducts: Product[] = [
  // Necklaces
  {
    id: "PRD001",
    sku: "GYA-NEC-0001",
    name: "Kalung Bunga Mawar Gold",
    category: "Necklace",
    brand: "Elora Fine Jewels",
    material: "Gold 18K",
    unit: "pcs",
    costPrice: 151000,
    sellingPrice: 209000,
    profitMargin: 27.8,
    currentStock: 1507,
    safetyStock: 2,
    reorderPoint: 3,
    eoq: 28,
    leadTime: 5,
    inventoryValue: 227557000,
    lastPurchaseDate: "2026-06-09",
    lastSalesDate: "2026-06-13",
    status: "Active",
    avgDailyDemand: 0.22
  },
  {
    id: "PRD002",
    sku: "GYA-NEC-0002",
    name: "Kalung Heart Pendant Silver",
    category: "Necklace",
    brand: "Giya Gold",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 171000,
    sellingPrice: 238000,
    profitMargin: 28.2,
    currentStock: 904,
    safetyStock: 3,
    reorderPoint: 5,
    eoq: 34,
    leadTime: 5,
    inventoryValue: 154584000,
    lastPurchaseDate: "2026-05-01",
    lastSalesDate: "2026-06-25",
    status: "Active",
    avgDailyDemand: 0.36
  },
  {
    id: "PRD003",
    sku: "GYA-NEC-0003",
    name: "Kalung Mutiara Laut Rose",
    category: "Necklace",
    brand: "Mutiara Nusantara",
    material: "Rose Gold 18K",
    unit: "pcs",
    costPrice: 449000,
    sellingPrice: 768000,
    profitMargin: 41.5,
    currentStock: 1489,
    safetyStock: 2,
    reorderPoint: 3,
    eoq: 22,
    leadTime: 3,
    inventoryValue: 668561000,
    lastPurchaseDate: "2026-06-28",
    lastSalesDate: "2026-06-12",
    status: "Active",
    avgDailyDemand: 0.40
  },
  {
    id: "PRD004",
    sku: "GYA-NEC-0004",
    name: "Kalung Berlian Solitaire Gold",
    category: "Necklace",
    brand: "Permata Indah",
    material: "Gold Plated",
    unit: "pcs",
    costPrice: 465000,
    sellingPrice: 739000,
    profitMargin: 37.1,
    currentStock: 1153,
    safetyStock: 3,
    reorderPoint: 5,
    eoq: 21,
    leadTime: 5,
    inventoryValue: 536145000,
    lastPurchaseDate: "2026-06-29",
    lastSalesDate: "2026-06-29",
    status: "Active",
    avgDailyDemand: 0.37
  },
  {
    id: "PRD005",
    sku: "GYA-NEC-0005",
    name: "Kalung Choker Elegan Stainless",
    category: "Necklace",
    brand: "Elora Fine Jewels",
    material: "Stainless Steel",
    unit: "pcs",
    costPrice: 140000,
    sellingPrice: 214800,
    profitMargin: 34.8,
    currentStock: 502,
    safetyStock: 6,
    reorderPoint: 9,
    eoq: 11,
    leadTime: 10,
    inventoryValue: 70280000,
    lastPurchaseDate: "2026-06-19",
    lastSalesDate: "2026-06-29",
    status: "Active",
    avgDailyDemand: 0.33
  },
  {
    id: "PRD006",
    sku: "GYA-NEC-0006",
    name: "Kalung Jalinan Mewah Gold",
    category: "Necklace",
    brand: "Permata Indah",
    material: "Gold 18K",
    unit: "pcs",
    costPrice: 131000,
    sellingPrice: 213000,
    profitMargin: 38.5,
    currentStock: 1340,
    safetyStock: 11,
    reorderPoint: 17,
    eoq: 36,
    leadTime: 21,
    inventoryValue: 175540000,
    lastPurchaseDate: "2026-06-25",
    lastSalesDate: "2026-05-28",
    status: "Active",
    avgDailyDemand: 0.31
  },
  {
    id: "PRD007",
    sku: "GYA-NEC-0007",
    name: "Kalung Crescent Moon Silver",
    category: "Necklace",
    brand: "Cahaya Emas",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 187000,
    sellingPrice: 297000,
    profitMargin: 37.0,
    currentStock: 943,
    safetyStock: 5,
    reorderPoint: 8,
    eoq: 35,
    leadTime: 7,
    inventoryValue: 176341000,
    lastPurchaseDate: "2026-03-26",
    lastSalesDate: "2026-06-30",
    status: "Active",
    avgDailyDemand: 0.42
  },
  {
    id: "PRD008",
    sku: "GYA-NEC-0008",
    name: "Kalung Bintang Kejora Rose",
    category: "Necklace",
    brand: "Elora Fine Jewels",
    material: "Rose Gold 18K",
    unit: "pcs",
    costPrice: 413000,
    sellingPrice: 706000,
    profitMargin: 41.5,
    currentStock: 1216,
    safetyStock: 4,
    reorderPoint: 6,
    eoq: 20,
    leadTime: 7,
    inventoryValue: 502208000,
    lastPurchaseDate: "2026-06-08",
    lastSalesDate: "2026-06-19",
    status: "Active",
    avgDailyDemand: 0.32
  },
  {
    id: "PRD009",
    sku: "GYA-NEC-0009",
    name: "Kalung Angsa Cantik Gold",
    category: "Necklace",
    brand: "Mutiara Nusantara",
    material: "Gold Plated",
    unit: "pcs",
    costPrice: 64600,
    sellingPrice: 108500,
    profitMargin: 40.5,
    currentStock: 1116,
    safetyStock: 3,
    reorderPoint: 5,
    eoq: 16,
    leadTime: 7,
    inventoryValue: 72093600,
    lastPurchaseDate: "2026-06-20",
    lastSalesDate: "2026-06-04",
    status: "Active",
    avgDailyDemand: 0.30
  },
  {
    id: "PRD010",
    sku: "GYA-NEC-0010",
    name: "Kalung Lily Putih Stainless",
    category: "Necklace",
    brand: "Giya Gold",
    material: "Stainless Steel",
    unit: "pcs",
    costPrice: 100900,
    sellingPrice: 144800,
    profitMargin: 30.3,
    currentStock: 1549,
    safetyStock: 6,
    reorderPoint: 10,
    eoq: 12,
    leadTime: 14,
    inventoryValue: 156294100,
    lastPurchaseDate: "2026-05-15",
    lastSalesDate: "2026-05-06",
    status: "Active",
    avgDailyDemand: 0.28
  },

  // Rings
  {
    id: "PRD021",
    sku: "GYA-RIN-0021",
    name: "Cincin Solitaire Diamond Gold",
    category: "Ring",
    brand: "Mutiara Nusantara",
    material: "Gold 18K",
    unit: "pcs",
    costPrice: 189000,
    sellingPrice: 290000,
    profitMargin: 34.8,
    currentStock: 730,
    safetyStock: 2,
    reorderPoint: 3,
    eoq: 30,
    leadTime: 3,
    inventoryValue: 137970000,
    lastPurchaseDate: "2026-06-05",
    lastSalesDate: "2026-06-28",
    status: "Active",
    avgDailyDemand: 0.31
  },
  {
    id: "PRD022",
    sku: "GYA-RIN-0022",
    name: "Cincin Eternity Band Gold",
    category: "Ring",
    brand: "Cahaya Emas",
    material: "Gold 24K",
    unit: "pcs",
    costPrice: 256000,
    sellingPrice: 412000,
    profitMargin: 37.9,
    currentStock: 1643,
    safetyStock: 2,
    reorderPoint: 3,
    eoq: 28,
    leadTime: 3,
    inventoryValue: 420608000,
    lastPurchaseDate: "2026-05-23",
    lastSalesDate: "2026-06-23",
    status: "Active",
    avgDailyDemand: 0.36
  },
  {
    id: "PRD023",
    sku: "GYA-RIN-0023",
    name: "Cincin Pave Crystal Silver",
    category: "Ring",
    brand: "Elora Fine Jewels",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 568000,
    sellingPrice: 933000,
    profitMargin: 39.1,
    currentStock: 713,
    safetyStock: 7,
    reorderPoint: 11,
    eoq: 18,
    leadTime: 14,
    inventoryValue: 404984000,
    lastPurchaseDate: "2026-05-22",
    lastSalesDate: "2026-06-27",
    status: "Active",
    avgDailyDemand: 0.32
  },
  {
    id: "PRD024",
    sku: "GYA-RIN-0024",
    name: "Cincin Cluster Deluxe White",
    category: "Ring",
    brand: "Mutiara Nusantara",
    material: "White Gold 18K",
    unit: "pcs",
    costPrice: 93700,
    sellingPrice: 145200,
    profitMargin: 35.5,
    currentStock: 868,
    safetyStock: 5,
    reorderPoint: 8,
    eoq: 14,
    leadTime: 10,
    inventoryValue: 81331600,
    lastPurchaseDate: "2026-03-12",
    lastSalesDate: "2026-05-26",
    status: "Active",
    avgDailyDemand: 0.32
  },
  {
    id: "PRD025",
    sku: "GYA-RIN-0025",
    name: "Cincin Twisted Elegance Rose",
    category: "Ring",
    brand: "Permata Indah",
    material: "Rose Gold 18K",
    unit: "pcs",
    costPrice: 190100,
    sellingPrice: 277700,
    profitMargin: 31.5,
    currentStock: 667,
    safetyStock: 3,
    reorderPoint: 5,
    eoq: 10,
    leadTime: 5,
    inventoryValue: 126796700,
    lastPurchaseDate: "2026-04-28",
    lastSalesDate: "2026-06-22",
    status: "Active",
    avgDailyDemand: 0.33
  },

  // Bracelets
  {
    id: "PRD041",
    sku: "GYA-BRA-0041",
    name: "Gelang Tennis Classic Silver",
    category: "Bracelet",
    brand: "Permata Indah",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 95000,
    sellingPrice: 154000,
    profitMargin: 38.3,
    currentStock: 1173,
    safetyStock: 1,
    reorderPoint: 2,
    eoq: 40,
    leadTime: 3,
    inventoryValue: 111435000,
    lastPurchaseDate: "2026-06-28",
    lastSalesDate: "2026-06-19",
    status: "Active",
    avgDailyDemand: 0.28
  },
  {
    id: "PRD042",
    sku: "GYA-BRA-0042",
    name: "Gelang Charm Butterfly Gold",
    category: "Bracelet",
    brand: "Mutiara Nusantara",
    material: "Gold 18K",
    unit: "pcs",
    costPrice: 134000,
    sellingPrice: 197000,
    profitMargin: 32.0,
    currentStock: 1294,
    safetyStock: 3,
    reorderPoint: 5,
    eoq: 32,
    leadTime: 7,
    inventoryValue: 173396000,
    lastPurchaseDate: "2026-01-15",
    lastSalesDate: "2026-06-18",
    status: "Active",
    avgDailyDemand: 0.25
  },
  {
    id: "PRD043",
    sku: "GYA-BRA-0043",
    name: "Gelang Bangle Gold Rose",
    category: "Bracelet",
    brand: "Giya Gold",
    material: "Rose Gold 18K",
    unit: "pcs",
    costPrice: 403000,
    sellingPrice: 603000,
    profitMargin: 33.2,
    currentStock: 792,
    safetyStock: 3,
    reorderPoint: 5,
    eoq: 20,
    leadTime: 5,
    inventoryValue: 319176000,
    lastPurchaseDate: "2026-12-08",
    lastSalesDate: "2026-06-29",
    status: "Active",
    avgDailyDemand: 0.31
  },

  // Earrings
  {
    id: "PRD059",
    sku: "GYA-EAR-0059",
    name: "Anting Drop Mutiara Silver",
    category: "Earrings",
    brand: "Cahaya Emas",
    material: "Silver 925",
    unit: "pair",
    costPrice: 68000,
    sellingPrice: 107000,
    profitMargin: 36.4,
    currentStock: 1278,
    safetyStock: 5,
    reorderPoint: 8,
    eoq: 56,
    leadTime: 7,
    inventoryValue: 86904000,
    lastPurchaseDate: "2026-06-25",
    lastSalesDate: "2026-06-18",
    status: "Active",
    avgDailyDemand: 0.40
  },
  {
    id: "PRD060",
    sku: "GYA-EAR-0060",
    name: "Anting Hoop Classic Gold",
    category: "Earrings",
    brand: "Mutiara Nusantara",
    material: "Gold 18K",
    unit: "pair",
    costPrice: 87000,
    sellingPrice: 121000,
    profitMargin: 28.1,
    currentStock: 764,
    safetyStock: 7,
    reorderPoint: 11,
    eoq: 51,
    leadTime: 10,
    inventoryValue: 66468000,
    lastPurchaseDate: "2025-12-17",
    lastSalesDate: "2026-06-30",
    status: "Active",
    avgDailyDemand: 0.42
  },

  // Pendants
  {
    id: "PRD077",
    sku: "GYA-PEN-0077",
    name: "Liontin Salib Suci Silver",
    category: "Pendant",
    brand: "Mutiara Nusantara",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 86000,
    sellingPrice: 148000,
    profitMargin: 41.9,
    currentStock: 1503,
    safetyStock: 6,
    reorderPoint: 10,
    eoq: 42,
    leadTime: 14,
    inventoryValue: 129258000,
    lastPurchaseDate: "2026-06-24",
    lastSalesDate: "2026-06-07",
    status: "Active",
    avgDailyDemand: 0.28
  },
  {
    id: "PRD078",
    sku: "GYA-PEN-0078",
    name: "Liontin Initial Letter Gold",
    category: "Pendant",
    brand: "Cahaya Emas",
    material: "Gold 18K",
    unit: "pcs",
    costPrice: 116000,
    sellingPrice: 199000,
    profitMargin: 41.7,
    currentStock: 1311,
    safetyStock: 1,
    reorderPoint: 2,
    eoq: 38,
    leadTime: 3,
    inventoryValue: 152076000,
    lastPurchaseDate: "2026-06-08",
    lastSalesDate: "2026-06-23",
    status: "Active",
    avgDailyDemand: 0.30
  },

  // Anklets
  {
    id: "PRD093",
    sku: "GYA-ANK-0093",
    name: "Gelang Kaki Rantai Emas Silver",
    category: "Anklet",
    brand: "Cahaya Emas",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 55000,
    sellingPrice: 79000,
    profitMargin: 30.4,
    currentStock: 1516,
    safetyStock: 1,
    reorderPoint: 2,
    eoq: 42,
    leadTime: 3,
    inventoryValue: 83380000,
    lastPurchaseDate: "2026-06-10",
    lastSalesDate: "2026-06-16",
    status: "Active",
    avgDailyDemand: 0.18
  },
  {
    id: "PRD094",
    sku: "GYA-ANK-0094",
    name: "Gelang Kaki Mutiara Gold",
    category: "Anklet",
    brand: "Giya Gold",
    material: "Gold Plated",
    unit: "pcs",
    costPrice: 138000,
    sellingPrice: 217000,
    profitMargin: 36.4,
    currentStock: 875,
    safetyStock: 1,
    reorderPoint: 1,
    eoq: 25,
    leadTime: 3,
    inventoryValue: 120750000,
    lastPurchaseDate: "2026-05-28",
    lastSalesDate: "2026-05-30",
    status: "Active",
    avgDailyDemand: 0.16
  },

  // Brooches
  {
    id: "PRD107",
    sku: "GYA-BRO-0107",
    name: "Bros Bunga Lily Silver",
    category: "Brooch",
    brand: "Giya Gold",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 95000,
    sellingPrice: 144000,
    profitMargin: 34.0,
    currentStock: 1847,
    safetyStock: 1,
    reorderPoint: 2,
    eoq: 22,
    leadTime: 10,
    inventoryValue: 175465000,
    lastPurchaseDate: "2026-03-30",
    lastSalesDate: "2026-06-15",
    status: "Active",
    avgDailyDemand: 0.09
  },
  {
    id: "PRD108",
    sku: "GYA-BRO-0108",
    name: "Bros Kupu-Kupu Emas Gold",
    category: "Brooch",
    brand: "Cahaya Emas",
    material: "Gold Plated",
    unit: "pcs",
    costPrice: 122000,
    sellingPrice: 173000,
    profitMargin: 29.5,
    currentStock: 760,
    safetyStock: 2,
    reorderPoint: 3,
    eoq: 21,
    leadTime: 10,
    inventoryValue: 92720000,
    lastPurchaseDate: "2026-05-22",
    lastSalesDate: "2026-06-05",
    status: "Active",
    avgDailyDemand: 0.10
  },

  // Hair Accessories
  {
    id: "PRD119",
    sku: "GYA-HAI-0119",
    name: "Jepit Rambut Mutiara Silver",
    category: "Hair Accessories",
    brand: "Giya Gold",
    material: "Silver 925",
    unit: "pcs",
    costPrice: 66000,
    sellingPrice: 94000,
    profitMargin: 29.8,
    currentStock: 1203,
    safetyStock: 1,
    reorderPoint: 1,
    eoq: 30,
    leadTime: 3,
    inventoryValue: 79398000,
    lastPurchaseDate: "2026-06-05",
    lastSalesDate: "2026-06-30",
    status: "Active",
    avgDailyDemand: 0.11
  },
  {
    id: "PRD120",
    sku: "GYA-HAI-0120",
    name: "Bandana Emas Classic Gold",
    category: "Hair Accessories",
    brand: "Cahaya Emas",
    material: "Gold Plated",
    unit: "pcs",
    costPrice: 110000,
    sellingPrice: 152000,
    profitMargin: 27.6,
    currentStock: 1113,
    safetyStock: 2,
    reorderPoint: 3,
    eoq: 24,
    leadTime: 10,
    inventoryValue: 122430000,
    lastPurchaseDate: "2026-05-12",
    lastSalesDate: "2026-06-25",
    status: "Active",
    avgDailyDemand: 0.11
  },

  // Gift Sets
  {
    id: "PRD133",
    sku: "GYA-GIF-0133",
    name: "Set Aksesoris Pengantin Lengkap Gold",
    category: "Gift Set",
    brand: "Mutiara Nusantara",
    material: "Gold 18K",
    unit: "set",
    costPrice: 482000,
    sellingPrice: 656000,
    profitMargin: 26.5,
    currentStock: 1173,
    safetyStock: 4,
    reorderPoint: 6,
    eoq: 19,
    leadTime: 7,
    inventoryValue: 565386000,
    lastPurchaseDate: "2026-06-28",
    lastSalesDate: "2026-06-05",
    status: "Active",
    avgDailyDemand: 0.33
  },
  {
    id: "PRD134",
    sku: "GYA-GIF-0134",
    name: "Set Kalung & Anting Serasi Silver",
    category: "Gift Set",
    brand: "Giya Gold",
    material: "Silver 925",
    unit: "set",
    costPrice: 550000,
    sellingPrice: 763000,
    profitMargin: 27.9,
    currentStock: 2441,
    safetyStock: 12,
    reorderPoint: 19,
    eoq: 22,
    leadTime: 14,
    inventoryValue: 1342550000,
    lastPurchaseDate: "2026-02-18",
    lastSalesDate: "2026-06-24",
    status: "Active",
    avgDailyDemand: 0.51
  },

  // Limited Edition
  {
    id: "PRD147",
    sku: "GYA-LIM-0147",
    name: "Koleksi Batik Emas Nusantara Gold",
    category: "Limited Edition",
    brand: "Mutiara Nusantara",
    material: "Gold 24K",
    unit: "set",
    costPrice: 63400,
    sellingPrice: 100900,
    profitMargin: 37.2,
    currentStock: 1007,
    safetyStock: 1,
    reorderPoint: 8,
    eoq: 8,
    leadTime: 5,
    inventoryValue: 63843800,
    lastPurchaseDate: "2026-04-26",
    lastSalesDate: "2026-06-15",
    status: "Active",
    avgDailyDemand: 0.07
  },
  {
    id: "PRD148",
    sku: "GYA-LIM-0148",
    name: "Lunar New Year Gold Dragon Platinum",
    category: "Limited Edition",
    brand: "Cahaya Emas",
    material: "Platinum 950",
    unit: "set",
    costPrice: 186400,
    sellingPrice: 324900,
    profitMargin: 42.6,
    currentStock: 1241,
    safetyStock: 3,
    reorderPoint: 5,
    eoq: 5,
    leadTime: 21,
    inventoryValue: 231322400,
    lastPurchaseDate: "2026-05-16",
    lastSalesDate: "2026-04-29",
    status: "Active",
    avgDailyDemand: 0.08
  }
];

export const initialOrders = [
  {
    id: "#ORD-0041",
    clientName: "Dimas Aditya",
    email: "dimas@example.com",
    date: "2026-07-01",
    amount: 550000,
    itemsCount: 5,
    paymentMethod: "Credit Card" as const,
    status: "Completed" as const,
    productNames: ["Kalung Bunga Mawar Gold", "Kalung Crescent Moon Silver"]
  },
  {
    id: "#ORD-0042",
    clientName: "Rizky Maulana",
    email: "rizky@example.com",
    date: "2026-07-01",
    amount: 890000,
    itemsCount: 3,
    paymentMethod: "Bank Transfer" as const,
    status: "Pending" as const,
    productNames: ["Kalung Bintang Kejora Rose"]
  },
  {
    id: "#ORD-0043",
    clientName: "Nur Shinta",
    email: "nurshinta@example.com",
    date: "2026-06-30",
    amount: 2100000,
    itemsCount: 8,
    paymentMethod: "Credit Card" as const,
    status: "In Progress" as const,
    productNames: ["Kalung Angsa Cantik Gold", "Kalung Choker Elegan Stainless"]
  },
  {
    id: "#ORD-0044",
    clientName: "Muhammad Zaki",
    email: "zaki@example.com",
    date: "2026-06-29",
    amount: 449900,
    itemsCount: 2,
    paymentMethod: "COD" as const,
    status: "Cancelled" as const,
    productNames: ["Kalung Heart Pendant Silver"]
  },
  {
    id: "#ORD-0045",
    clientName: "Emma Olivia",
    email: "emma@example.com",
    date: "2026-06-29",
    amount: 3200000,
    itemsCount: 12,
    paymentMethod: "Credit Card" as const,
    status: "Completed" as const,
    productNames: ["Set Kalung & Anting Serasi Silver", "Kalung Berlian Solitaire Gold"]
  },
  {
    id: "#ORD-0046",
    clientName: "Riyan Saputra",
    email: "riyan@example.com",
    date: "2026-06-28",
    amount: 673000,
    itemsCount: 4,
    paymentMethod: "Bank Transfer" as const,
    status: "Pending" as const,
    productNames: ["Bros Kupu-Kupu Emas Gold"]
  },
  {
    id: "#ORD-0047",
    clientName: "Alyssa Eva",
    email: "alyssa@example.com",
    date: "2026-06-25",
    amount: 1850000,
    itemsCount: 3,
    paymentMethod: "E-Wallet" as const,
    status: "Completed" as const,
    productNames: ["Lunar New Year Gold Dragon Platinum"]
  },
  {
    id: "#ORD-0048",
    clientName: "Bagas Ramadhan",
    email: "bagas@example.com",
    date: "2026-06-22",
    amount: 950000,
    itemsCount: 2,
    paymentMethod: "Bank Transfer" as const,
    status: "Completed" as const,
    productNames: ["Set Aksesoris Pengantin Lengkap Gold"]
  },
  {
    id: "#ORD-0049",
    clientName: "Amanda Felicia",
    email: "amanda@example.com",
    date: "2026-06-20",
    amount: 4500000,
    itemsCount: 6,
    paymentMethod: "Credit Card" as const,
    status: "In Progress" as const,
    productNames: ["Koleksi Batik Emas Nusantara Gold"]
  },
  {
    id: "#ORD-0050",
    clientName: "Vanessa Clarissa",
    email: "vanessa@example.com",
    date: "2026-06-18",
    amount: 1200000,
    itemsCount: 3,
    paymentMethod: "COD" as const,
    status: "Completed" as const,
    productNames: ["Kalung Jalinan Mewah Gold"]
  }
];

export const initialCustomers = [
  {
    id: "CST001",
    name: "Dimas Aditya",
    email: "dimas@example.com",
    location: "Jakarta Selatan, DKI Jakarta",
    joinedDate: "2024-01-12",
    ordersCount: 24,
    spent: 12480000,
    status: "Active" as const
  },
  {
    id: "CST002",
    name: "Rizky Maulana",
    email: "rizky@example.com",
    location: "Bandung, Jawa Barat",
    joinedDate: "2024-03-05",
    ordersCount: 18,
    spent: 8900000,
    status: "Pending" as const
  },
  {
    id: "CST003",
    name: "Nur Shinta",
    email: "nurshinta@example.com",
    location: "Surabaya, Jawa Timur",
    joinedDate: "2024-02-20",
    ordersCount: 31,
    spent: 21000000,
    status: "Active" as const
  },
  {
    id: "CST004",
    name: "Muhammad Zaki",
    email: "zaki@example.com",
    location: "Denpasar, Bali",
    joinedDate: "2024-04-08",
    ordersCount: 7,
    spent: 3400000,
    status: "Inactive" as const
  },
  {
    id: "CST005",
    name: "Emma Olivia",
    email: "emma@example.com",
    location: "Medan, Sumatera Utara",
    joinedDate: "2024-06-01",
    ordersCount: 42,
    spent: 34500000,
    status: "Active" as const
  },
  {
    id: "CST006",
    name: "Riyan Saputra",
    email: "riyan@example.com",
    location: "Semarang, Jawa Tengah",
    joinedDate: "2024-05-15",
    ordersCount: 12,
    spent: 6730000,
    status: "Active" as const
  },
  {
    id: "CST007",
    name: "Alyssa Eva",
    email: "alyssa@example.com",
    location: "Makassar, Sulawesi Selatan",
    joinedDate: "2024-02-10",
    ordersCount: 15,
    spent: 11250000,
    status: "Active" as const
  },
  {
    id: "CST008",
    name: "Bagas Ramadhan",
    email: "bagas@example.com",
    location: "Yogyakarta, DIY",
    joinedDate: "2024-03-22",
    ordersCount: 9,
    spent: 5800000,
    status: "Active" as const
  }
];

export const initialSuppliers = [
  {
    id: "SUP001",
    name: "PT Sinar Abadi Emas",
    contactPerson: "Budi Sentosa",
    contactName: "Budi Sentosa",
    email: "budi.sentosa@sinarabadiemas.co.id",
    phone: "+62 812 3456 7890",
    category: "Gold 18K/24K",
    material: "Gold 18K/24K",
    leadTimeDays: 5,
    leadTime: 5,
    reliability: 98,
    costPerPO: 150000,
    activeOrders: 2,
    ordersPlaced: 12,
    outstandingAmount: 15000000,
    rating: 4.8,
    location: "Jakarta Pusat, DKI Jakarta",
    status: "Active" as const
  },
  {
    id: "SUP002",
    name: "CV Perak Nusantara",
    contactPerson: "Siti Aminah",
    contactName: "Siti Aminah",
    email: "siti.aminah@peraknusantara.com",
    phone: "+62 821 9876 5432",
    category: "Silver 925",
    material: "Silver 925",
    leadTimeDays: 3,
    leadTime: 3,
    reliability: 95,
    costPerPO: 80000,
    activeOrders: 1,
    ordersPlaced: 8,
    outstandingAmount: 4500000,
    rating: 4.5,
    location: "Yogyakarta, DIY",
    status: "Active" as const
  },
  {
    id: "SUP003",
    name: "Permata Indo Distributor",
    contactPerson: "H. Hendra",
    contactName: "H. Hendra",
    email: "hendra@permataindo.net",
    phone: "+62 857 1111 2222",
    category: "Diamonds & Pearls",
    material: "Diamonds & Pearls",
    leadTimeDays: 10,
    leadTime: 10,
    reliability: 90,
    costPerPO: 250000,
    activeOrders: 3,
    ordersPlaced: 15,
    outstandingAmount: 28500000,
    rating: 4.2,
    location: "Surabaya, Jawa Timur",
    status: "Active" as const
  },
  {
    id: "SUP004",
    name: "Craft Logam Utama",
    contactPerson: "Andi Wijaya",
    contactName: "Andi Wijaya",
    email: "andi.wijaya@craftlogam.id",
    phone: "+62 819 4444 5555",
    category: "Stainless Steel/Alloys",
    material: "Stainless Steel/Alloys",
    leadTimeDays: 7,
    leadTime: 7,
    reliability: 96,
    costPerPO: 50000,
    activeOrders: 0,
    ordersPlaced: 5,
    outstandingAmount: 0,
    rating: 4.6,
    location: "Tangerang, Banten",
    status: "Active" as const
  },
  {
    id: "SUP005",
    name: "Toko Manik Cantik",
    contactPerson: "Shinta Dewi",
    contactName: "Shinta Dewi",
    email: "shinta@manikcantik.co.id",
    phone: "+62 811 222 333",
    category: "Manik-Manik & Kristal",
    material: "Manik-Manik & Kristal",
    leadTimeDays: 4,
    leadTime: 4,
    reliability: 97,
    costPerPO: 30000,
    activeOrders: 1,
    ordersPlaced: 14,
    outstandingAmount: 1200000,
    rating: 4.7,
    location: "Bandung, Jawa Barat",
    status: "Active" as const
  },
  {
    id: "SUP006",
    name: "CV Gilang Gemilang",
    contactPerson: "Heri Susanto",
    contactName: "Heri Susanto",
    email: "heri@gilanggemilang.com",
    phone: "+62 813 9999 8888",
    category: "Kuningan & Tembaga",
    material: "Kuningan & Tembaga",
    leadTimeDays: 6,
    leadTime: 6,
    reliability: 94,
    costPerPO: 40000,
    activeOrders: 0,
    ordersPlaced: 6,
    outstandingAmount: 0,
    rating: 4.4,
    location: "Semarang, Jawa Tengah",
    status: "Active" as const
  },
  {
    id: "SUP007",
    name: "Bali Silver Craft",
    contactPerson: "Wayan Sudarta",
    contactName: "Wayan Sudarta",
    email: "wayan@balisilver.co.id",
    phone: "+62 812 7777 6666",
    category: "Perak Bakar Bali",
    material: "Perak Bakar Bali",
    leadTimeDays: 8,
    leadTime: 8,
    reliability: 93,
    costPerPO: 90000,
    activeOrders: 2,
    ordersPlaced: 9,
    outstandingAmount: 8400000,
    rating: 4.5,
    location: "Denpasar, Bali",
    status: "Active" as const
  },
  {
    id: "SUP008",
    name: "Sumatra Stone & Gem",
    contactPerson: "M. Yusuf",
    contactName: "M. Yusuf",
    email: "yusuf@sumatrastone.com",
    phone: "+62 852 3333 4444",
    category: "Batu Mulia & Akik",
    material: "Batu Mulia & Akik",
    leadTimeDays: 9,
    leadTime: 9,
    reliability: 92,
    costPerPO: 120000,
    activeOrders: 1,
    ordersPlaced: 7,
    outstandingAmount: 3200000,
    rating: 4.3,
    location: "Medan, Sumatera Utara",
    status: "Active" as const
  },
  {
    id: "SUP009",
    name: "Borneo Pearl Supplier",
    contactPerson: "H. Syahrani",
    contactName: "H. Syahrani",
    email: "syahrani@borneopearl.net",
    phone: "+62 853 5555 6666",
    category: "Mutiara Air Laut",
    material: "Mutiara Air Laut",
    leadTimeDays: 12,
    leadTime: 12,
    reliability: 89,
    costPerPO: 300000,
    activeOrders: 1,
    ordersPlaced: 11,
    outstandingAmount: 18000000,
    rating: 4.1,
    location: "Martapura, Kalimantan Selatan",
    status: "Active" as const
  },
  {
    id: "SUP010",
    name: "Celebes Packaging & Box",
    contactPerson: "Andi Matalata",
    contactName: "Andi Matalata",
    email: "andi@celebesbox.id",
    phone: "+62 811 444 555",
    category: "Kotak Aksesoris",
    material: "Kotak Aksesoris",
    leadTimeDays: 5,
    leadTime: 5,
    reliability: 98,
    costPerPO: 25000,
    activeOrders: 0,
    ordersPlaced: 18,
    outstandingAmount: 0,
    rating: 4.9,
    location: "Makassar, Sulawesi Selatan",
    status: "Active" as const
  },
  {
    id: "SUP011",
    name: "Sriwijaya Gold Supplier",
    contactPerson: "Ridwan Kamil",
    contactName: "Ridwan Kamil",
    email: "ridwan@sriwijayagold.com",
    phone: "+62 813 2222 1111",
    category: "Emas Batangan 24K",
    material: "Emas Batangan 24K",
    leadTimeDays: 4,
    leadTime: 4,
    reliability: 97,
    costPerPO: 180000,
    activeOrders: 1,
    ordersPlaced: 10,
    outstandingAmount: 12500000,
    rating: 4.6,
    location: "Palembang, Sumatera Selatan",
    status: "Active" as const
  },
  {
    id: "SUP012",
    name: "Solo Accessories",
    contactPerson: "Joko Widodo",
    contactName: "Joko Widodo",
    email: "jokowi@soloaccessories.id",
    phone: "+62 811 777 888",
    category: "Tali Kulit & Anyaman",
    material: "Tali Kulit & Anyaman",
    leadTimeDays: 5,
    leadTime: 5,
    reliability: 96,
    costPerPO: 35000,
    activeOrders: 2,
    ordersPlaced: 13,
    outstandingAmount: 2500000,
    rating: 4.7,
    location: "Surakarta, Jawa Tengah",
    status: "Active" as const
  },
  {
    id: "SUP013",
    name: "Lombok Pearl Gallery",
    contactPerson: "Gede Bagus",
    contactName: "Gede Bagus",
    email: "gede@lombokpearls.com",
    phone: "+62 878 1111 9999",
    category: "Mutiara Air Tawar",
    material: "Mutiara Air Tawar",
    leadTimeDays: 10,
    leadTime: 10,
    reliability: 91,
    costPerPO: 150000,
    activeOrders: 0,
    ordersPlaced: 4,
    outstandingAmount: 0,
    rating: 4.4,
    location: "Mataram, NTB",
    status: "Active" as const
  },
  {
    id: "SUP014",
    name: "PT Logistik Jaya Abadi",
    contactPerson: "Ahmad Yani",
    contactName: "Ahmad Yani",
    email: "ahmad.yani@logistikjaya.co.id",
    phone: "+62 812 8888 9999",
    category: "Jasa Pengiriman",
    material: "Jasa Pengiriman",
    leadTimeDays: 3,
    leadTime: 3,
    reliability: 99,
    costPerPO: 20000,
    activeOrders: 1,
    ordersPlaced: 22,
    outstandingAmount: 800000,
    rating: 4.9,
    location: "Jakarta Barat, DKI Jakarta",
    status: "Active" as const
  },
  {
    id: "SUP015",
    name: "Manik-Manik Nusantara",
    contactPerson: "Rina Melati",
    contactName: "Rina Melati",
    email: "rina@maniknusantara.id",
    phone: "+62 812 5555 4444",
    category: "Manik Kaca & Akrilik",
    material: "Manik Kaca & Akrilik",
    leadTimeDays: 5,
    leadTime: 5,
    reliability: 95,
    costPerPO: 30000,
    activeOrders: 1,
    ordersPlaced: 11,
    outstandingAmount: 1100000,
    rating: 4.5,
    location: "Bandung, Jawa Barat",
    status: "Active" as const
  }
];

export const initialTransactions = [
  {
    id: "#TRX-001",
    description: "Order Payment - Dimas Aditya",
    date: "2026-07-01",
    category: "Sales" as const,
    amount: 550000,
    type: "Income" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-002",
    description: "Purchase Order - PT Sinar Abadi Emas",
    date: "2026-07-01",
    category: "Purchase" as const,
    amount: 15000000,
    type: "Expense" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-003",
    description: "Pencairan Dana Penjualan Shopee Store",
    date: "2026-06-30",
    category: "Sales" as const,
    amount: 28500000,
    type: "Income" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-004",
    description: "Meta Ads Marketing Campaign",
    date: "2026-06-29",
    category: "Marketing" as const,
    amount: 3500000,
    type: "Expense" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-005",
    description: "Office Rent & High-Speed Utilities",
    date: "2026-06-28",
    category: "Operations" as const,
    amount: 8000000,
    type: "Expense" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-006",
    description: "Order Payment - Emma Olivia",
    date: "2026-06-27",
    category: "Sales" as const,
    amount: 3200000,
    type: "Income" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-007",
    description: "Pencairan Dana Penjualan Tokopedia",
    date: "2026-06-26",
    category: "Sales" as const,
    amount: 22500000,
    type: "Income" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-008",
    description: "Logistic Courier Shipment Insured",
    date: "2026-06-25",
    category: "Logistics" as const,
    amount: 1200000,
    type: "Expense" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-009",
    description: "Giya Store Staff Salaries",
    date: "2026-06-24",
    category: "Staff" as const,
    amount: 12500000,
    type: "Expense" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-010",
    description: "Pencairan Dana Penjualan TikTok Shop",
    date: "2026-06-23",
    category: "Sales" as const,
    amount: 15200000,
    type: "Income" as const,
    status: "Settled" as const
  },
  {
    id: "#TRX-011",
    description: "Order Payment - Alyssa Eva",
    date: "2026-06-22",
    category: "Sales" as const,
    amount: 1850000,
    type: "Income" as const,
    status: "Settled" as const
  }
];

export const initialNotifications = [
  {
    id: "NOT-001",
    title: "Pesanan Baru Diterima #ORD-0041",
    message: "Dimas Aditya melakukan checkout pesanan senilai Rp 550.000 untuk 5 item aksesoris.",
    timeAgo: "5 menit yang lalu",
    type: "order" as const,
    isRead: false
  },
  {
    id: "NOT-002",
    title: "Peringatan Stok Rendah (Low Stock)",
    message: "Produk 'Kalung Heart Pendant Silver' tersisa hanya 8 unit di bawah batas aman ROP.",
    timeAgo: "1 jam yang lalu",
    type: "stock" as const,
    isRead: false
  },
  {
    id: "NOT-003",
    title: "Pembayaran Berhasil Dicairkan",
    message: "Pembayaran e-commerce bulanan sebesar Rp 12.000.000 telah dicairkan ke rekening bank utama.",
    timeAgo: "3 jam yang lalu",
    type: "payment" as const,
    isRead: true
  },
  {
    id: "NOT-004",
    title: "Pelanggan VIP Baru Diaktifkan",
    message: "Emma Olivia telah ditingkatkan ke status VIP setelah total pembelanjaan melebihi Rp 30jt.",
    timeAgo: "Kemarin",
    type: "customer" as const,
    isRead: true
  },
  {
    id: "NOT-005",
    title: "Laporan Bulanan Siap Diunduh",
    message: "Laporan analisis inventaris dan finansial Giya Store bulan Juni 2026 telah digenerasi.",
    timeAgo: "2 hari yang lalu",
    type: "system" as const,
    isRead: true
  },
  {
    id: "NOT-006",
    title: "Status Pesanan Dikirim",
    message: "Paket pesanan #ORD-0039 telah diterima oleh kurir logistik dan sedang menuju ke penerima.",
    timeAgo: "3 hari yang lalu",
    type: "order" as const,
    isRead: true
  },
  {
    id: "NOT-007",
    title: "Pesanan Dibatalkan Pembeli",
    message: "Pesanan #ORD-0038 dibatalkan otomatis oleh sistem karena melebihi tenggat bayar.",
    timeAgo: "4 hari yang lalu",
    type: "order" as const,
    isRead: true
  }
];

export const gasCode = `/**
 * GOOGLE APPS SCRIPT: GIYA INVENTORY MULTI-SHEET API GATEWAY
 * 
 * SCRIPT INI DILETTAKKAN DI DALAM: Extensions > Apps Script pada Google Sheets Anda.
 * Deploy sebagai "Web App" dengan hak akses "Anyone" (Siapa saja, bahkan anonim).
 */

// Menangani permintaan GET untuk membaca seluruh tab data secara real-time
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    
    var result = {
      success: true,
      timestamp: new Date().toISOString(),
      source: "Google Sheets Multi-Sheet Sync",
      products: null,
      customers: null,
      orders: null,
      suppliers: null,
      transactions: null
    };
    
    for (var s = 0; s < sheets.length; s++) {
      var sheet = sheets[s];
      var sheetName = sheet.getName().toLowerCase().trim();
      
      // Deteksi jenis data dari nama sheet/tab
      var type = "";
      if (sheetName.indexOf("product") !== -1 || sheetName.indexOf("produk") !== -1) {
        type = "products";
      } else if (sheetName.indexOf("customer") !== -1 || sheetName.indexOf("pelanggan") !== -1) {
        type = "customers";
      } else if (sheetName.indexOf("order") !== -1 || sheetName.indexOf("pesanan") !== -1) {
        type = "orders";
      } else if (sheetName.indexOf("supplier") !== -1 || sheetName.indexOf("pemasok") !== -1 || sheetName.indexOf("vendor") !== -1) {
        type = "suppliers";
      } else if (sheetName.indexOf("transaction") !== -1 || sheetName.indexOf("transaksi") !== -1 || sheetName.indexOf("cash") !== -1 || sheetName.indexOf("arus") !== -1) {
        type = "transactions";
      }
      
      if (type !== "") {
        var parsedData = parseSheet(sheet);
        if (parsedData && parsedData.length > 0) {
          result[type] = parsedData;
        }
      }
    }
    
    // Fallback: Jika tidak ditemukan lembar tab spesifik, gunakan lembar aktif sebagai produk (Backward Compatibility)
    if (!result.products && !result.customers && !result.orders) {
      var activeSheet = ss.getActiveSheet();
      var parsedData = parseSheet(activeSheet);
      result.products = parsedData;
      result.data = parsedData;
    } else if (result.products) {
      result.data = result.products;
    }
    
    return createJsonResponse(result);
    
  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.message || error.toString()
    });
  }
}

// Mengurai isi satu sheet/tab menjadi daftar objek JSON
function parseSheet(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length === 0) return [];
  
  // Cari baris header secara dinamis
  var headerRowIdx = -1;
  for (var i = 0; i < Math.min(data.length, 15); i++) {
    for (var j = 0; j < data[i].length; j++) {
      var cellStr = data[i][j].toString().toLowerCase().trim();
      if (
        cellStr === 'id' || 
        cellStr.indexOf('product id') !== -1 || 
        cellStr.indexOf('customer id') !== -1 || 
        cellStr.indexOf('order id') !== -1 || 
        cellStr.indexOf('supplier id') !== -1 || 
        cellStr.indexOf('transaction id') !== -1 ||
        cellStr.indexOf('sku') !== -1 ||
        cellStr.indexOf('nama pelanggan') !== -1 ||
        cellStr.indexOf('client name') !== -1
      ) {
        headerRowIdx = i;
        break;
      }
    }
    if (headerRowIdx !== -1) break;
  }
  
  if (headerRowIdx === -1) {
    headerRowIdx = 0;
  }
  
  var headers = data[headerRowIdx].map(function(h) {
    return h.toString().trim();
  });
  
  var rows = [];
  for (var r = headerRowIdx + 1; r < data.length; r++) {
    var rowData = data[r];
    var idVal = rowData[0] ? rowData[0].toString().trim() : "";
    
    // Lewati baris kosong, baris pemisah, atau penjelasan asumsi
    if (!idVal || idVal === "" || idVal.toLowerCase().indexOf("asumsi") === 0 || idVal.toLowerCase().indexOf("ordering") === 0) {
      continue;
    }
    
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var header = headers[c];
      if (!header) continue;
      
      var val = rowData[c];
      var key = mapHeaderToKey(header, sheet.getName().toLowerCase().trim());
      obj[key] = cleanValue(key, val);
    }
    
    // Hitung ulang Inventory Value khusus produk jika ada costPrice & currentStock
    if (sheet.getName().toLowerCase().indexOf("pelanggan") === -1 && sheet.getName().toLowerCase().indexOf("customer") === -1) {
      if (!obj.inventoryValue && obj.costPrice && obj.currentStock) {
        obj.inventoryValue = obj.costPrice * obj.currentStock;
      }
    }
    
    rows.push(obj);
  }
  
  return rows;
}

// Memetakan header kolom Bahasa Indonesia / Inggris ke kunci camelCase standar
function mapHeaderToKey(header, sheetName) {
  var h = header.toLowerCase().replace(/\\s+/g, '').replace(/\\([^\\)]+\\)/g, '').trim();
  var sName = (sheetName || "").toLowerCase().trim();
  
  // 1. Jika ini sheet pesanan / order
  if (sName.indexOf("order") !== -1 || sName.indexOf("pesanan") !== -1) {
    if (h.indexOf("id") !== -1 || h.indexOf("orderid") !== -1 || h.indexOf("idpesanan") !== -1) return "id";
    if (h.indexOf("productnames") !== -1 || h.indexOf("namaproduk") !== -1 || h.indexOf("barang") !== -1 || h.indexOf("item") !== -1 || h.indexOf("produk") !== -1 || h.indexOf("product") !== -1) return "productNames";
    if (h.indexOf("clientname") !== -1 || h.indexOf("namaclient") !== -1 || h.indexOf("namapelanggan") !== -1 || h.indexOf("customername") !== -1 || h === "name" || h === "nama" || h.indexOf("pelanggan") !== -1 || h.indexOf("customer") !== -1 || h.indexOf("client") !== -1 || h.indexOf("pembeli") !== -1 || h.indexOf("buyer") !== -1) return "clientName";
    if (h.indexOf("paymentmethod") !== -1 || h.indexOf("metodebayar") !== -1 || h.indexOf("metodepembayaran") !== -1) return "paymentMethod";
    if (h.indexOf("shippingmethod") !== -1 || h.indexOf("metodekirim") !== -1 || h.indexOf("metodepengiriman") !== -1) return "shippingMethod";
    if (h.indexOf("itemscount") !== -1 || h.indexOf("jumlahitem") !== -1) return "itemsCount";
    if (h === "date" || h === "tanggal") return "date";
    if (h === "amount" || h === "total" || h === "jumlah") return "amount";
    if (h === "status") return "status";
    if (h === "email") return "email";
  }
  
  // 2. Jika ini sheet pelanggan / customer
  if (sName.indexOf("customer") !== -1 || sName.indexOf("pelanggan") !== -1) {
    if (h.indexOf("customerid") !== -1 || h.indexOf("idpelanggan") !== -1) return "id";
    if (h.indexOf("customername") !== -1 || h.indexOf("namapelanggan") !== -1 || h === "name" || h === "nama") return "name";
    if (h.indexOf("joineddate") !== -1 || h.indexOf("tanggalgabung") !== -1 || h.indexOf("tanggaljoin") !== -1) return "joinedDate";
    if (h.indexOf("orderscount") !== -1 || h.indexOf("jumlahpesanan") !== -1 || h.indexOf("jumlahorder") !== -1 || h.indexOf("totalpesanan") !== -1) return "ordersCount";
    if (h.indexOf("spent") !== -1 || h.indexOf("totalbelanja") !== -1 || h.indexOf("totalspent") !== -1) return "spent";
    if (h === "email") return "email";
    if (h === "status") return "status";
    if (h === "location" || h === "lokasi" || h === "alamat") return "location";
  }

  // 3. Jika ini sheet pemasok / supplier / vendor
  if (sName.indexOf("supplier") !== -1 || sName.indexOf("pemasok") !== -1 || sName.indexOf("vendor") !== -1) {
    if (h.indexOf("supplierid") !== -1 || h.indexOf("idsupplier") !== -1 || h.indexOf("idpemasok") !== -1) return "id";
    if (h.indexOf("suppliername") !== -1 || h.indexOf("namasupplier") !== -1 || h.indexOf("namapemasok") !== -1 || h === "name" || h === "nama") return "name";
    if (h.indexOf("contactperson") !== -1 || h.indexOf("kontak") !== -1 || h.indexOf("narahubung") !== -1) return "contactPerson";
    if (h.indexOf("phone") !== -1 || h.indexOf("telp") !== -1 || h.indexOf("telepon") !== -1 || h.indexOf("nohp") !== -1) return "phone";
    if (h === "email") return "email";
    if (h === "status") return "status";
    if (h === "location" || h === "lokasi" || h === "alamat") return "location";
  }

  // 4. Jika ini sheet transaksi / transaction / cash flow
  if (sName.indexOf("transaction") !== -1 || sName.indexOf("transaksi") !== -1 || sName.indexOf("cash") !== -1 || sName.indexOf("arus") !== -1) {
    if (h.indexOf("transactionid") !== -1 || h.indexOf("idtransaksi") !== -1) return "id";
    if (h.indexOf("description") !== -1 || h.indexOf("deskripsi") !== -1 || h.indexOf("keterangan") !== -1) return "description";
    if (h.indexOf("type") !== -1 || h.indexOf("tipe") !== -1 || h.indexOf("jenis") !== -1) return "type";
    if (h === "date" || h === "tanggal") return "date";
    if (h === "amount" || h === "total" || h === "jumlah") return "amount";
    if (h === "category" || h === "kategori") return "category";
    if (h === "status") return "status";
  }

  // 5. Jika ini sheet produk / products (Atau pencocokan umum bawaan)
  if (h.indexOf("productid") !== -1) return "id";
  if (h.indexOf("sku") !== -1) return "sku";
  if (h.indexOf("productname") !== -1 || h.indexOf("namaproduk") !== -1) return "name";
  if (h.indexOf("category") !== -1 || h.indexOf("kategori") !== -1) return "category";
  if (h.indexOf("brand") !== -1 || h.indexOf("merek") !== -1) return "brand";
  if (h.indexOf("material") !== -1 || h.indexOf("bahan") !== -1) return "material";
  if (h.indexOf("unit") !== -1 || h.indexOf("satuan") !== -1) return "unit";
  if (h.indexOf("costprice") !== -1 || h.indexOf("hargabeli") !== -1) return "costPrice";
  if (h.indexOf("sellingprice") !== -1 || h.indexOf("hargajual") !== -1) return "sellingPrice";
  if (h.indexOf("profitmargin") !== -1 || h.indexOf("margin") !== -1) return "profitMargin";
  if (h.indexOf("currentstock") !== -1 || h.indexOf("stoksekarang") !== -1) return "currentStock";
  if (h.indexOf("safetystock") !== -1 || h.indexOf("stokaman") !== -1) return "safetyStock";
  if (h.indexOf("reorderpoint") !== -1 || h.indexOf("rop") !== -1) return "reorderPoint";
  if (h.indexOf("eoq") !== -1) return "eoq";
  if (h.indexOf("leadtime") !== -1 || h.indexOf("waktutunggu") !== -1) return "leadTime";
  if (h.indexOf("inventoryvalue") !== -1 || h.indexOf("nilaiinventaris") !== -1) return "inventoryValue";
  if (h.indexOf("lastpurchasedate") !== -1 || h.indexOf("tanggalbeli") !== -1) return "lastPurchaseDate";
  if (h.indexOf("lastsalesdate") !== -1 || h.indexOf("tanggaljual") !== -1) return "lastSalesDate";
  if (h.indexOf("productstatus") !== -1 || h.indexOf("status") !== -1) return "status";
  if (h.indexOf("avgdailydemand") !== -1 || h.indexOf("permintaanharian") !== -1) return "avgDailyDemand";

  // Fallbacks umum jika tidak cocok ke tab manapun
  if (h === "id") return "id";
  if (h === "name" || h === "nama") return "name";
  if (h === "email") return "email";
  if (h === "status") return "status";
  if (h === "location" || h === "lokasi" || h === "alamat") return "location";
  if (h === "date" || h === "tanggal") return "date";
  if (h === "amount" || h === "total" || h === "jumlah") return "amount";
  if (h === "category" || h === "kategori") return "category";
  
  return h;
}

// Membersihkan nilai numerik, persentase, dan tanggal
function cleanValue(key, val) {
  if (val === null || val === undefined) return "";
  
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  
  var valStr = val.toString().trim();
  
  // Kunci-kunci bertipe angka desimal atau bulat
  var numericKeys = [
    "costPrice", "sellingPrice", "currentStock", "safetyStock", "reorderPoint", 
    "eoq", "leadTime", "inventoryValue", "avgDailyDemand", "profitMargin",
    "ordersCount", "spent", "amount", "itemsCount", "reliability", "rating"
  ];
  
  if (numericKeys.indexOf(key) !== -1) {
    if (key === "profitMargin") {
      valStr = valStr.replace("%", "").trim();
    }
    
    // Penanganan format angka desimal koma khas Indonesia / titik ribuan
    if (valStr.indexOf(',') !== -1 && valStr.indexOf('.') !== -1) {
      valStr = valStr.replace(/\\./g, "").replace(",", ".");
    } else if (valStr.indexOf(',') !== -1) {
      valStr = valStr.replace(",", ".");
    } else if (valStr.indexOf('.') !== -1 && key !== "avgDailyDemand" && key !== "profitMargin" && key !== "reliability") {
      if (valStr.length > 4 || valStr.indexOf('.') !== valStr.lastIndexOf('.')) {
        valStr = valStr.replace(/\\./g, "");
      }
    }
    
    var num = parseFloat(valStr);
    return isNaN(num) ? 0 : num;
  }
  
  return valStr;
}

// Membuat output JSON yang aman dengan CORS Header tersemat otomatis oleh GAS Web App
function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}
`;
