import React from 'react';
import type { NavGroup } from './types';
import Dashboard from './components/Dashboard';
import SalesBook from './components/SalesBook';
import InventoryList from './components/InventoryList';
import ProductsList from './components/ProductsList';
import Purchases from './components/Purchases';
import Settlements from './components/Settlements';
import AccountsPayable from './components/AccountsPayable';
import AccountsReceivable from './components/AccountsReceivable';
import Branches from './components/Branches';
import StockTransfer from './components/StockTransfer';
import Expenses from './components/Expenses';
import CashFlow from './components/CashFlow';
import ChartOfAccounts from './components/ChartOfAccounts';
import Suppliers from './components/Suppliers';
import Placeholder from './components/Placeholder';
import SummaryReport from './components/SummaryReport';
import BalanceSheet from './components/BalanceSheet';
import IncomeStatement from './components/IncomeStatement';
import ProfitAndLoss from './components/ProfitAndLoss';
import Contacts from './components/Contacts';
import Others from './components/Others';
import Variations from './components/Variations';
import ExpenseCategories from './components/ExpenseCategories';
import Staff from './components/Staff';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="w-6 h-6">{children}</span>
);

const NAV_ITEMS: NavGroup[] = [
    {
        group: "Core",
        items: [
            {
                name: 'Dashboard',
                icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg></IconWrapper>,
                component: Dashboard,
            },
        ]
    },
    {
        group: "Operations",
        items: [
            { name: 'Purchases', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.858-6.441M15 11.25a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapper>, component: Purchases },
            { name: 'Sales', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0h.75A.75.75 0 016.75 6v-.75m0 0h.75A.75.75 0 018.25 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75A.75.75 0 0111.25 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75A.75.75 0 0113.5 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75a.75.75 0 01.75.75v.75m3 12.75H2.25" /></svg></IconWrapper>, component: SalesBook },
            { name: 'Settlements', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M12 8.25v10.5m0 0l-3-3m3 3l3-3m-3-3.75l3 3.75m-3-3.75l-3 3.75" /></svg></IconWrapper>, component: Settlements },
        ]
    },
    {
        group: "Inventory",
        items: [
            { name: 'Inventory', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg></IconWrapper>, component: InventoryList },
            { name: 'Products', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg></IconWrapper>, component: ProductsList },
            { name: 'Variations', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h.008v.008H16.5V8.25Zm-8.25 8.25h.008v.008H8.25v-.008Z" /></svg></IconWrapper>, component: Variations },
            { name: 'Branches | Locations', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.545M3 4.5l3 1m0 6.205l-3 1m1.5.5l1.5-.545m0 0l-1.5 1.5v-1.5m1.5 0l1.5 1.5v-1.5" /></svg></IconWrapper>, component: Branches },
            { name: 'Stock Transfer', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg></IconWrapper>, component: StockTransfer },
        ]
    },
    {
        group: "Finance",
        items: [
            { name: 'Accounts Payable', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg></IconWrapper>, component: AccountsPayable },
            { name: 'Accounts Receivable', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg></IconWrapper>, component: AccountsReceivable },
            { name: 'Cash Flow', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.156 0-2.982l.879-.659m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></IconWrapper>, component: CashFlow },
            { name: 'Expenses', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.153.24c-1.136 0-2.25-.333-3.184-.955a5.985 5.985 0 01-1.84-2.185M4.75 4.97a48.416 48.416 0 016.75-.47c2.291 0 4.545.16 6.75.47m-13.5 0c-1.01.143-2.01.317-3 .52m3-.52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.24c1.136 0 2.25-.333 3.184-.955a5.985 5.985 0 001.84-2.185" /></svg></IconWrapper>, component: Expenses },
            { name: 'Tax payments', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0h.75A.75.75 0 016.75 6v-.75m0 0h.75A.75.75 0 018.25 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75A.75.75 0 0111.25 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75A.75.75 0 0113.5 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75a.75.75 0 01.75.75v.75m3 12.75H2.25" /></svg></IconWrapper>, component: Placeholder },
        ]
    },
    {
        group: "Reports",
        items: [
            { name: 'Summary report', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" /></svg></IconWrapper>, component: SummaryReport },
            { name: 'Balance Sheet', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.153.24c-1.136 0-2.25-.333-3.184-.955a5.985 5.985 0 01-1.84-2.185M4.75 4.97a48.416 48.416 0 016.75-.47c2.291 0 4.545.16 6.75.47m-13.5 0c-1.01.143-2.01.317-3 .52m3-.52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.24c1.136 0 2.25-.333 3.184-.955a5.985 5.985 0 001.84-2.185" /></svg></IconWrapper>, component: BalanceSheet },
            { name: 'Income Statement', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.153 1.586m-5.8 0c-.379.32-.87.524-1.4.524H10.5a2.25 2.25 0 01-2.25-2.25v-1.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v1.5a2.25 2.25 0 01-2.25 2.25h-.75m-3.75 2.25c-.621 0-1.125.504-1.125 1.125v3.5c0 .621.504 1.125 1.125 1.125h3.5a1.125 1.125 0 001.125-1.125v-3.5a1.125 1.125 0 00-1.125-1.125h-3.5z" /></svg></IconWrapper>, component: IncomeStatement },
            { name: 'Profit & Loss', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg></IconWrapper>, component: ProfitAndLoss },
            { name: 'Reports', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" /></svg></IconWrapper>, component: Placeholder },
        ]
    },
    {
        group: "Settings",
        items: [
            { name: 'Chart of Accounts', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg></IconWrapper>, component: ChartOfAccounts },
            { name: 'Suppliers', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h16.5M6 12C5.172 12 4.5 11.328 4.5 10.5S5.172 9 6 9s1.5.672 1.5 1.5S6.828 12 6 12zm9 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" /></svg></IconWrapper>, component: Suppliers },
            { name: 'Contacts', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.61.91 1.074 1.97 1.074 3.125" /></svg></IconWrapper>, component: Contacts },
            { 
                name: 'Expense Categories', 
                icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg></IconWrapper>, 
                component: ExpenseCategories 
            },
            {
                name: 'Staff or Users',
                icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapper>,
                component: Staff,
            },
            { name: 'Others', icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg></IconWrapper>, component: Others },
        ]
    }
];

export { NAV_ITEMS };