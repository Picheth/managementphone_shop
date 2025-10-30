import type { Account } from '../types';

export const MOCK_ACCOUNTS_DATA: Account[] = [
  // Assets
  { id: '1010', name: 'Cash on Hand', type: 'Asset', subType: 'Current Asset', balance: 1250.75, description: 'Physical cash in the register.' },
  { id: '1020', name: 'Main Business Bank Account', type: 'Asset', subType: 'Current Asset', balance: 0, description: 'Primary bank accounts for operations.' },
  { id: '1021', parentId: '1020', name: 'Checking Account', type: 'Asset', subType: 'Current Asset', balance: 18480.50, description: 'Day-to-day transaction account.' },
  { id: '1022', parentId: '1020', name: 'Savings Account', type: 'Asset', subType: 'Current Asset', balance: 7000.00, description: 'Business savings and reserve funds.' },
  { id: '1200', name: 'Accounts Receivable', type: 'Asset', subType: 'Current Asset', balance: 2150.00, description: 'Money owed by customers.' },
  { id: '1400', name: 'Inventory', type: 'Asset', subType: 'Current Asset', balance: 125400.00, description: 'Value of all products in stock.' },
  { id: '1500', name: 'Prepaid Rent', type: 'Asset', subType: 'Current Asset', balance: 2500.00, description: 'Rent paid in advance.' },
  { id: '1800', name: 'Store Equipment', type: 'Asset', subType: 'Fixed Asset', balance: 15000.00, description: 'Display cases, computers, tools.' },

  // Liabilities
  { id: '2000', name: 'Accounts Payable', type: 'Liability', subType: 'Current Liability', balance: 14245.00, description: 'Money owed to suppliers.' },
  { id: '2100', name: 'Sales Tax Payable', type: 'Liability', subType: 'Current Liability', balance: 1850.25, description: 'Sales tax collected, to be paid to government.' },
  { id: '2500', name: 'Short-Term Loan', type: 'Liability', subType: 'Current Liability', balance: 10000.00, description: 'Loan for initial inventory purchase.' },

  // Equity
  { id: '3000', name: 'Owner\'s Capital', type: 'Equity', subType: 'Owner\'s Equity', balance: 100000.00, description: 'Initial investment by the owner.' },
  { id: '3200', name: 'Retained Earnings', type: 'Equity', subType: 'Owner\'s Equity', balance: 46186.00, description: 'Cumulative profits reinvested in the business.' },

  // Revenue
  { id: '4000', name: 'Product Sales Revenue', type: 'Revenue', subType: 'Sales', balance: 350200.00, description: 'Revenue from selling phones and accessories.' },
  { id: '4100', name: 'Repair Services Revenue', type: 'Revenue', subType: 'Services', balance: 45300.00, description: 'Revenue from repair services.' },
  { id: '4900', name: 'Sales Returns and Allowances', type: 'Revenue', subType: 'Contra Revenue', balance: -2500.00, description: 'Reductions in revenue due to returns.' },

  // Expenses
  { id: '5000', name: 'Cost of Goods Sold (COGS)', type: 'Expense', subType: 'Direct Costs', balance: 210120.00, description: 'Cost of inventory sold.' },
  { id: '6010', name: 'Rent Expense', type: 'Expense', subType: 'Operating Expense', balance: 30000.00, description: 'Annual rent for the store.' },
  { id: '6020', name: 'Salaries and Wages', type: 'Expense', subType: 'Operating Expense', balance: 0, description: 'Total employee salaries.' },
  { id: '6021', parentId: '6020', name: 'Sales Staff Salaries', type: 'Expense', subType: 'Operating Expense', balance: 50000.00, description: 'Salaries for the sales team.' },
  { id: '6022', parentId: '6020', name: 'Admin Staff Salaries', type: 'Expense', subType: 'Operating Expense', balance: 25000.00, description: 'Salaries for administrative staff.' },
  { id: '6030', name: 'Utilities Expense', type: 'Expense', subType: 'Operating Expense', balance: 4120.00, description: 'Electricity, water, internet.' },
  { id: '6040', name: 'Marketing and Advertising', type: 'Expense', subType: 'Operating Expense', balance: 6000.00, description: 'Promotional expenses.' },
];