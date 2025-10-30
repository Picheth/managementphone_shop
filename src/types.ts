import type React from 'react';

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

export interface NavGroup {
    group: string;
    items: NavItem[];
}

export interface CardData {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    icon: React.ReactNode;
}

export interface Sale {
    id: string;
    date: string;
    customer: string;
    total: number;
    paymentStatus: 'Paid' | 'Pending' | 'Overdue';
    items: number;
}

export interface PurchaseLineItem {
    productId: string;
    productName: string;
    unit: string;
    quantity: number;
    price: number;
}

export interface Purchase {
    id: string;
    date: string;
    supplier: string;
    supplierContact: string;
    invoiceId: string;
    lineItems: PurchaseLineItem[];
    shippingCost?: number;
    otherFees?: number;
    total: number; // Grand total
    status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface InventoryItem {
    id: string;
    productName: string;
    sku: string;
    category: 'Phone' | 'Accessory' | 'Repair Part' | 'Tablet';
    quantity: number;
    location: string;
    costPrice: number;
    sellingPrice: number;
}

export type ProductCondition = 'NEW' | 'USED' | 'Activated' | 'Parts Replace' | 'Others';

export interface Product {
    id: string; // The SKU, e.g. IP12PM128-BLK-LL-NEW
    productNo: string; // The sequential ID, e.g. PR-000001
    name: string;
    brand: string;
    model: string;
    category: 'Phone' | 'Accessory' | 'Repair Part' | 'Tablet';
    costPrice: number;
    sellingPrice: number;
    stock: number;
    variations: {
        ram?: string;
        storage: string;
        color: string;
        generation?: string;
        modelCode?: string;
        yearReleased?: string;
        country: string;
        condition: ProductCondition;
        others?: string;
    };
}

export interface VariationAttribute {
    id: string;
    name: string;
    values: string[];
}


export interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    manager: string;
}

export interface StockTransfer {
    id: string;
    date: string;
    fromBranch: string;
    toBranch: string;
    productName: string;
    quantity: number;
    status: 'In Transit' | 'Completed' | 'Cancelled';
}

export interface Expense {
    id: string;
    parentId?: string;
    date: string;
    category: string;
    payee: string;
    amount: number;
    status: 'Paid' | 'Unpaid';
}

export interface Settlement {
    id: string;
    date: string;
    amount: number;
    type: 'Bank Transfer' | 'Cash Deposit' | 'Card Settlement' | 'Internal Transfer';
    fromAccount: string;
    toAccount: string;
}

export interface Account {
  id: string;
  parentId?: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  subType: string;
  balance: number;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  // FIX: Added 'Others' to allow for more flexible supplier categorization.
  category: 'Electronics' | 'Accessories' | 'Parts Distributor' | 'Others';
  totalSpent: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Sales Staff' | 'Technician';
  status: 'Active' | 'Inactive';
  branchId: string;
}

export interface CashFlowActivity {
    id: string;
    date: string;
    description: string;
    category: 'Operating' | 'Investing' | 'Financing';
    amount: number;
    type: 'inflow' | 'outflow';
}

export interface Contact {
  id: string;
  name: string;
  type: 'Customer' | 'Lead';
  email: string;
  phone: string;
  company?: string;
  lastContactDate: string;
}

export interface TaxRate {
    id: string;
    name: string;
    rate: number;
    isDefault: boolean;
}

export interface ColumnDefinition<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
}