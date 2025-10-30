import type { Sale, InventoryItem, Product, Purchase, Branch, StockTransfer, Expense, Settlement, Supplier, CashFlowActivity, Contact, TaxRate } from '../types';

export const MOCK_SALES_DATA: Sale[] = [
  { id: 'S001', date: '2023-10-26', customer: 'John Doe', total: 899.99, paymentStatus: 'Paid', items: 1 },
  { id: 'S002', date: '2023-10-26', customer: 'Jane Smith', total: 45.50, paymentStatus: 'Paid', items: 2 },
  { id: 'S003', date: '2023-10-25', customer: 'Peter Jones', total: 150.00, paymentStatus: 'Pending', items: 1 },
  { id: 'S004', date: '2023-10-25', customer: 'Mary Brown', total: 29.99, paymentStatus: 'Paid', items: 1 },
  { id: 'S005', date: '2023-10-24', customer: 'David Williams', total: 1200.00, paymentStatus: 'Paid', items: 2 },
  { id: 'S006', date: '2023-10-23', customer: 'Emily Clark', total: 75.00, paymentStatus: 'Overdue', items: 1 },
  { id: 'S007', date: '2023-10-22', customer: 'Michael Scott', total: 99.98, paymentStatus: 'Paid', items: 2 },
];

export const MOCK_SUPPLIERS_DATA: Supplier[] = [
  { id: 'SUP001', name: 'Apple Inc.', contactPerson: 'Tim Cook', email: 'sales@apple.com', phone: '800-275-2273', category: 'Electronics', totalSpent: 9990 },
  { id: 'SUP002', name: 'Samsung Electronics', contactPerson: 'Jane Lee', email: 'orders@samsung.com', phone: '800-726-7864', category: 'Electronics', totalSpent: 5495 },
  { id: 'SUP003', name: 'Anker Innovations', contactPerson: 'Steven Yang', email: 'support@anker.com', phone: '800-988-7973', category: 'Accessories', totalSpent: 5050 },
  { id: 'SUP004', name: 'Spigen Co., Ltd.', contactPerson: 'Dae-Young Kim', email: 'contact@spigen.com', phone: '949-502-5121', category: 'Accessories', totalSpent: 2000 },
  { id: 'SUP005', name: 'Google LLC', contactPerson: 'Sundar Pichai', email: 'procurement@google.com', phone: '650-253-0000', category: 'Electronics', totalSpent: 6500 },
  { id: 'SUP006', name: 'Samsung Parts', contactPerson: 'John Parts', email: 'parts@samsung.com', phone: '800-627-4368', category: 'Parts Distributor', totalSpent: 2250 },
  { id: 'SUP-GEN', name: 'General Seller', contactPerson: 'N/A', email: 'n/a', phone: 'n/a', category: 'Others', totalSpent: 0 },
];

export const MOCK_PURCHASES_DATA: Purchase[] = [
  { 
    id: 'P001', date: '2023-10-25', supplier: 'Apple Inc.', supplierContact: '800-275-2273', invoiceId: 'INV-A123',
    lineItems: [{ productId: 'IP15P-256-BLK-US-NEW', productName: 'Apple iPhone 15 Pro 256GB Black US NEW', unit: 'pcs', quantity: 10, price: 999 }],
    total: 9990, status: 'Paid' 
  },
  { 
    id: 'P002', date: '2023-10-24', supplier: 'Samsung Electronics', supplierContact: '800-726-7864', invoiceId: 'INV-S456', 
    lineItems: [{ productId: 'GS23U-512-WHT-KO-NEW', productName: 'Samsung Galaxy S23 Ultra 512GB White KO NEW', unit: 'pcs', quantity: 5, price: 1099 }],
    total: 5495, status: 'Unpaid' 
  },
  { 
    id: 'P003', date: '2023-10-22', supplier: 'Anker Innovations', supplierContact: '800-988-7973', invoiceId: 'INV-K789',
    lineItems: [{ productId: 'ANK-PB-10K-BLK', productName: 'Anker Power Bank 10000mAh Black', unit: 'pcs', quantity: 100, price: 25 }],
    total: 2500, status: 'Paid' 
  },
  { 
    id: 'P004', date: '2023-09-15', supplier: 'Spigen Co., Ltd.', supplierContact: '949-502-5121', invoiceId: 'INV-G101',
    lineItems: [{ productId: 'SPG-TA-S23U', productName: 'Spigen Tough Armor Case for Galaxy S23 Ultra', unit: 'pcs', quantity: 200, price: 10 }],
    total: 2000, status: 'Overdue' 
  },
  { 
    id: 'P005', date: '2023-10-20', supplier: 'Google LLC', supplierContact: '650-253-0000', invoiceId: 'INV-P212',
    lineItems: [{ productId: 'P8-128-GRY-US-NEW', productName: 'Google Pixel 8 128GB Gray US NEW', unit: 'pcs', quantity: 10, price: 650 }],
    total: 6500, status: 'Unpaid' 
  },
  { 
    id: 'P006', date: '2023-10-18', supplier: 'Samsung Parts', supplierContact: '800-627-4368', invoiceId: 'INV-R313',
    lineItems: [{ productId: 'SMP-OLED-S22', productName: 'Samsung OLED Screen Replacement S22', unit: 'pcs', quantity: 15, price: 150 }],
    total: 2250, status: 'Paid'
  },
  {
    id: 'P007', date: '2023-10-28', supplier: 'Anker Innovations', supplierContact: '800-988-7973', invoiceId: 'INV-K991',
    lineItems: [
        { productId: 'ANK-PB-10K-BLK', productName: 'Anker Power Bank 10000mAh Black', unit: 'pcs', quantity: 50, price: 25 },
        { productId: 'SPG-TA-S23U', productName: 'Spigen Tough Armor Case for Galaxy S23 Ultra', unit: 'pcs', quantity: 50, price: 10 }
    ],
    shippingCost: 50,
    otherFees: 25,
    total: (50 * 25) + (50 * 10) + 50 + 25, // 1250 + 500 + 50 + 25 = 1825
    status: 'Paid'
  }
];

export const MOCK_PRODUCTS_DATA: Product[] = [
    {
    id: 'IP15P-256-BLK-US-NEW',
    productNo: 'PR-000001',
    name: 'Apple iPhone 15 Pro 256GB Black US NEW',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    category: 'Phone',
    costPrice: 999,
    sellingPrice: 1199,
    stock: 25,
    variations: { ram: '8GB', storage: '256GB', color: 'Black', modelCode: 'A2848', country: 'US', condition: 'NEW', yearReleased: '2023' }
  },
  {
    id: 'GS23U-512-WHT-KO-NEW',
    productNo: 'PR-000002',
    name: 'Samsung Galaxy S23 Ultra 512GB White KO NEW',
    brand: 'Samsung',
    model: 'Galaxy S23 Ultra',
    category: 'Phone',
    costPrice: 1099,
    sellingPrice: 1299,
    stock: 15,
    variations: { ram: '12GB', storage: '512GB', color: 'White', country: 'KO', condition: 'NEW', yearReleased: '2023' }
  },
  {
    id: 'P8-128-GRY-US-NEW',
    productNo: 'PR-000003',
    name: 'Google Pixel 8 128GB Gray US NEW',
    brand: 'Google',
    model: 'Pixel 8',
    category: 'Phone',
    costPrice: 650,
    sellingPrice: 799,
    stock: 18,
    variations: { ram: '8GB', storage: '128GB', color: 'Gray', country: 'US', condition: 'NEW', yearReleased: '2023' }
  },
  {
    id: 'IP14PM-128-DPP-LL-NEW',
    productNo: 'PR-000004',
    name: 'Apple iPhone 14 Pro Max 128GB Deep Purple LL NEW',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    category: 'Phone',
    costPrice: 1099,
    sellingPrice: 1299,
    stock: 10,
    variations: { ram: '6GB', storage: '128GB', color: 'Deep Purple', country: 'LL', condition: 'NEW', yearReleased: '2022' }
  },
  {
    id: 'IP14PM-128-DPP-LL-USED',
    productNo: 'PR-000005',
    name: 'Apple iPhone 14 Pro Max 128GB Deep Purple LL USED',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    category: 'Phone',
    costPrice: 950,
    sellingPrice: 1099,
    stock: 15,
    variations: { ram: '6GB', storage: '128GB', color: 'Deep Purple', country: 'LL', condition: 'USED', yearReleased: '2022' }
  },
  {
    id: 'IP14PM-256-SBK-LL-NEW',
    productNo: 'PR-000006',
    name: 'Apple iPhone 14 Pro Max 256GB Space Black LL NEW',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    category: 'Phone',
    costPrice: 1050,
    sellingPrice: 1199,
    stock: 20,
    variations: { ram: '6GB', storage: '256GB', color: 'Space Black', country: 'LL', condition: 'NEW', yearReleased: '2022' }
  },
  {
    id: 'IP14P-128-SLV-LL-NEW',
    productNo: 'PR-000007',
    name: 'Apple iPhone 14 Pro 128GB Silver LL NEW',
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    category: 'Phone',
    costPrice: 850,
    sellingPrice: 999,
    stock: 30,
    variations: { ram: '6GB', storage: '128GB', color: 'Silver', country: 'LL', condition: 'NEW', yearReleased: '2022' }
  },
  {
    id: 'IP14PL-128-MNT-LL-NEW',
    productNo: 'PR-000008',
    name: 'Apple iPhone 14 Plus 128GB Midnight LL NEW',
    brand: 'Apple',
    model: 'iPhone 14 Plus',
    category: 'Phone',
    costPrice: 750,
    sellingPrice: 899,
    stock: 22,
    variations: { ram: '6GB', storage: '128GB', color: 'Midnight', country: 'LL', condition: 'NEW', yearReleased: '2022' }
  },
  {
    id: 'IP14-128-STL-LL-NEW',
    productNo: 'PR-000009',
    name: 'Apple iPhone 14 128GB Starlight LL NEW',
    brand: 'Apple',
    model: 'iPhone 14',
    category: 'Phone',
    costPrice: 650,
    sellingPrice: 799,
    stock: 40,
    variations: { ram: '6GB', storage: '128GB', color: 'Starlight', country: 'LL', condition: 'NEW', yearReleased: '2022' }
  },
  {
    id: 'IPDPR1296-128-SGY-US-NEW',
    productNo: 'PR-000010',
    name: 'Apple iPad Pro 12.9 6th Gen 128GB Space Gray US NEW',
    brand: 'Apple',
    model: 'iPad Pro 12.9 6th Gen',
    category: 'Tablet',
    costPrice: 999,
    sellingPrice: 1099,
    stock: 12,
    variations: { ram: '8GB', storage: '128GB', color: 'Space Gray', country: 'US', condition: 'NEW', generation: '6th Gen', yearReleased: '2022' }
  },
  {
    id: 'ANK-PB-10K-BLK',
    productNo: 'PR-000011',
    name: 'Anker Power Bank 10000mAh Black',
    brand: 'Anker',
    model: 'PowerCore 10000',
    category: 'Accessory',
    costPrice: 25,
    sellingPrice: 49.99,
    stock: 80,
    variations: { storage: '10000mAh', color: 'Black', country: 'N/A', condition: 'NEW' }
  },
  {
    id: 'SPG-TA-S23U',
    productNo: 'PR-000012',
    name: 'Spigen Tough Armor Case for Galaxy S23 Ultra',
    brand: 'Spigen',
    model: 'Tough Armor',
    category: 'Accessory',
    costPrice: 10,
    sellingPrice: 24.99,
    stock: 120,
    variations: { storage: 'N/A', color: 'Black', country: 'N/A', condition: 'NEW' }
  },
  {
    id: 'SMP-OLED-S22',
    productNo: 'PR-000013',
    name: 'Samsung OLED Screen Replacement S22',
    brand: 'Samsung Parts',
    model: 'S22 Screen',
    category: 'Repair Part',
    costPrice: 150,
    sellingPrice: 249.99,
    stock: 10,
    variations: { storage: 'N/A', color: 'N/A', country: 'N/A', condition: 'Parts Replace' }
  }
];

export const MOCK_INVENTORY_DATA: InventoryItem[] = [
  { id: 'INV001', productName: 'iPhone 15 Pro', sku: 'IP15P-256-BLK', category: 'Phone', quantity: 25, location: 'Main Store', costPrice: 999, sellingPrice: 1199 },
  { id: 'INV002', productName: 'Galaxy S23 Ultra', sku: 'GS23U-512-WHT', category: 'Phone', quantity: 15, location: 'Main Store', costPrice: 1099, sellingPrice: 1299 },
  { id: 'INV003', productName: 'USB-C Cable', sku: 'UBC-1M-GEN', category: 'Accessory', quantity: 150, location: 'Warehouse', costPrice: 5, sellingPrice: 19.99 },
  { id: 'INV004', productName: 'Screen Protector IP15', sku: 'SP-IP15', category: 'Accessory', quantity: 200, location: 'Main Store', costPrice: 2.5, sellingPrice: 14.99 },
  { id: 'INV005', productName: 'iPhone 14 Battery', sku: 'BAT-IP14', category: 'Repair Part', quantity: 45, location: 'Repair Center', costPrice: 25, sellingPrice: 69.99 },
  { id: 'INV006', productName: 'Pixel 8', sku: 'P8-128-GRY', category: 'Phone', quantity: 18, location: 'Main Store', costPrice: 650, sellingPrice: 799 },
  { id: 'INV007', productName: 'Apple iPhone 14 Pro Max 128GB LL Deep Purple - NEW', sku: 'IP14PM-3LLDPP-0', category: 'Phone', quantity: 10, location: 'Main Store', costPrice: 1099, sellingPrice: 1299 },
  { id: 'INV008', productName: 'iPhone 14 Pro Max 128GB Deep Purple', sku: 'IP14PM-3LLDPP-0', category: 'Phone', quantity: 15, location: 'Main Store', costPrice: 950, sellingPrice: 1099 },
  { id: 'INV009', productName: 'iPhone 14 Pro Max 256GB Space Black', sku: 'IP14PM-4LLSBK-0', category: 'Phone', quantity: 20, location: 'Warehouse A', costPrice: 1050, sellingPrice: 1199 },
  { id: 'INV010', productName: 'iPhone 14 Pro 128GB Silver', sku: 'IP14PR-3LLSLV-0', category: 'Phone', quantity: 30, location: 'Main Store', costPrice: 850, sellingPrice: 999 },
  { id: 'INV011', productName: 'iPhone 14 Plus 128GB Midnight', sku: 'IP14PL-3LLMNT-0', category: 'Phone', quantity: 22, location: 'Main Store', costPrice: 750, sellingPrice: 899 },
  { id: 'INV012', productName: 'iPhone 14 128GB Starlight', sku: 'IP14-3LLSTL-0', category: 'Phone', quantity: 40, location: 'Warehouse A', costPrice: 650, sellingPrice: 799 },
  { id: 'INV013', productName: 'iPad Pro 12.9 6th Gen 128GB Space Gray', sku: 'IPDPR1296-3LLSGY-0', category: 'Tablet', quantity: 12, location: 'Main Store', costPrice: 999, sellingPrice: 1099 },
  { id: 'INV014', productName: 'iPad Pro 11 4th Gen 128GB Silver', sku: 'IPDPR114-3LLSLV-0', category: 'Tablet', quantity: 18, location: 'Main Store', costPrice: 720, sellingPrice: 799 },
];

export const MOCK_BRANCHES_DATA: Branch[] = [
    { id: 'B001', name: 'Main Store', address: '123 Market St, Downtown', phone: '555-1234', manager: 'Alice Johnson' },
    { id: 'B002', name: 'Warehouse A', address: '456 Industrial Ave, South End', phone: '555-5678', manager: 'Bob Williams' },
    { id: 'B003', name: 'Repair Center', address: '789 Tech Rd, North Park', phone: '555-9012', manager: 'Charlie Brown' },
    { id: 'B004', name: 'Uptown Kiosk', address: '101 Uptown Plaza', phone: '555-3456', manager: 'Diana Prince' },
];

export const MOCK_STOCK_TRANSFERS_DATA: StockTransfer[] = [
    { id: 'ST001', date: '2023-10-25', fromBranch: 'Warehouse A', toBranch: 'Main Store', productName: 'iPhone 15 Pro', quantity: 10, status: 'Completed' },
    { id: 'ST002', date: '2023-10-24', fromBranch: 'Warehouse A', toBranch: 'Repair Center', productName: 'iPhone 14 Battery', quantity: 20, status: 'Completed' },
    { id: 'ST003', date: '2023-10-26', fromBranch: 'Main Store', toBranch: 'Uptown Kiosk', productName: 'Spigen Tough Armor Case', quantity: 50, status: 'In Transit' },
    { id: 'ST004', date: '2023-10-22', fromBranch: 'Main Store', toBranch: 'Repair Center', productName: 'OLED Screen Replacement S22', quantity: 5, status: 'Cancelled' },
];

export const MOCK_EXPENSES_DATA: Expense[] = [
    { id: 'EXP001', date: '2023-10-28', category: 'Rent', payee: 'City Properties', amount: 2500, status: 'Paid' },
    { id: 'EXP002', date: '2023-10-27', category: 'Utilities', payee: 'Downtown Power & Light', amount: 345.67, status: 'Paid' },
    { id: 'EXP003', date: '2023-10-26', category: 'Supplies', payee: 'Office Supplies Co.', amount: 125.50, status: 'Paid' },
    { id: 'EXP004', date: '2023-10-25', category: 'Marketing', payee: '', amount: 0, status: 'Unpaid' },
    { id: 'EXP006', parentId: 'EXP004', date: '2023-10-25', category: 'Online Advertising', payee: 'Social Media Ads', amount: 300, status: 'Unpaid' },
    { id: 'EXP007', parentId: 'EXP004', date: '2023-10-24', category: 'Marketing Tools', payee: 'Analytics Software Inc.', amount: 200, status: 'Paid' },
    { id: 'EXP005', date: '2023-10-22', category: 'Salaries', payee: 'Employee Payroll', amount: 8500, status: 'Paid' },
];

export const MOCK_SETTLEMENTS_DATA: Settlement[] = [
    { id: 'SET001', date: '2023-10-28', amount: 1245.50, type: 'Card Settlement', fromAccount: 'Stripe', toAccount: 'Main Bank Account' },
    { id: 'SET002', date: '2023-10-28', amount: 850.00, type: 'Cash Deposit', fromAccount: 'Cash Register', toAccount: 'Main Bank Account' },
    { id: 'SET003', date: '2023-10-27', amount: 5000.00, type: 'Internal Transfer', fromAccount: 'Main Bank Account', toAccount: 'Savings Account' },
    { id: 'SET004', date: '2023-10-26', amount: 2500.00, type: 'Bank Transfer', fromAccount: 'Main Bank Account', toAccount: 'City Properties (Rent)' },
];

export const MOCK_CASH_FLOW_DATA: CashFlowActivity[] = [
    // Operating Activities
    { id: 'CF001', date: '2023-10-28', description: 'Cash sales from customers', category: 'Operating', amount: 1245.50, type: 'inflow' },
    { id: 'CF002', date: '2023-10-28', description: 'Payment for rent (EXP001)', category: 'Operating', amount: 2500, type: 'outflow' },
    { id: 'CF003', date: '2023-10-27', description: 'Payment for utilities (EXP002)', category: 'Operating', amount: 345.67, type: 'outflow' },
    { id: 'CF004', date: '2023-10-26', description: 'Payment to Apple Inc. (P001)', category: 'Operating', amount: 9990, type: 'outflow' },
    { id: 'CF005', date: '2023-10-25', description: 'Collection from Peter Jones (S003)', category: 'Operating', amount: 150.00, type: 'inflow' },
    { id: 'CF006', date: '2023-10-24', description: 'Payment for Marketing Tools (EXP007)', category: 'Operating', amount: 200, type: 'outflow' },
    { id: 'CF007', date: '2023-10-22', description: 'Payment for employee salaries (EXP005)', category: 'Operating', amount: 8500, type: 'outflow' },
    { id: 'CF008', date: '2023-10-20', description: 'Cash sales from customers', category: 'Operating', amount: 3200.00, type: 'inflow' },

    // Investing Activities
    { id: 'CF009', date: '2023-10-15', description: 'Purchase of new repair equipment', category: 'Investing', amount: 3500, type: 'outflow' },
    { id: 'CF010', date: '2023-09-05', description: 'Sale of old display shelf', category: 'Investing', amount: 300, type: 'inflow' },

    // Financing Activities
    { id: 'CF011', date: '2023-09-01', description: 'Owner investment', category: 'Financing', amount: 20000, type: 'inflow' },
    { id: 'CF012', date: '2023-10-01', description: 'Short-term loan repayment', category: 'Financing', amount: 1000, type: 'outflow' },
];

export const MOCK_CONTACTS_DATA: Contact[] = [
    { id: 'C001', name: 'John Doe', type: 'Customer', email: 'john.d@example.com', phone: '555-0101', company: 'JD Industries', lastContactDate: '2023-10-26' },
    { id: 'C002', name: 'Jane Smith', type: 'Customer', email: 'jane.s@example.com', phone: '555-0102', lastContactDate: '2023-10-26' },
    { id: 'C003', name: 'Peter Jones', type: 'Customer', email: 'peter.j@example.com', phone: '555-0103', company: 'Jones & Co.', lastContactDate: '2023-10-25' },
    { id: 'C004', name: 'Emily Clark', type: 'Customer', email: 'emily.c@example.com', phone: '555-0104', lastContactDate: '2023-10-23' },
    { id: 'C005', name: 'Tech Solutions Inc.', type: 'Lead', email: 'contact@techsolutions.com', phone: '555-0201', company: 'Tech Solutions Inc.', lastContactDate: '2023-10-20' },
    { id: 'C006', name: 'Sarah Miller', type: 'Lead', email: 'sarah.m@example.com', phone: '555-0202', lastContactDate: '2023-10-18' },
];

export const MOCK_TAX_RATES_DATA: TaxRate[] = [
    { id: 'TAX001', name: 'Standard Sales Tax', rate: 8.25, isDefault: true },
    { id: 'TAX002', name: 'Reduced Rate (Services)', rate: 5.0, isDefault: false },
    { id: 'TAX003', name: 'Tax-Exempt', rate: 0, isDefault: false },
];