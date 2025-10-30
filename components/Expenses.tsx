import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import ExpenseForm from './ExpenseForm';
import Card from './Card';
import { MOCK_EXPENSES_DATA } from '../data/mockData';
import type { Expense } from '../types';

const Expenses: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultParentForModal, setDefaultParentForModal] = useState<string | undefined>(undefined);
    const [sortKey, setSortKey] = useState<keyof Expense | null>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Unpaid'>('All');
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const expenseCategories = useMemo(() => ['All', ...Array.from(new Set(MOCK_EXPENSES_DATA.filter(e => !e.parentId).map(e => e.category)))], []);

    const handleSort = (key: keyof Expense) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };
    
    const handleAddTopLevelExpense = () => {
        setDefaultParentForModal(undefined);
        setIsModalOpen(true);
    };

    const handleAddSubCategory = (parentId: string) => {
        setDefaultParentForModal(parentId);
        setIsModalOpen(true);
    };
    
    const toggleRow = (id: string) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const filteredData = useMemo(() => {
        return MOCK_EXPENSES_DATA.filter(expense => {
            const expenseDate = new Date(`${expense.date}T00:00:00`);
            const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
            const end = endDate ? new Date(`${endDate}T00:00:00`) : null;
            
            const matchesStartDate = !start || expenseDate >= start;
            const matchesEndDate = !end || expenseDate <= end;
            const matchesStatus = statusFilter === 'All' || expense.status === statusFilter;

            if (categoryFilter === 'All') {
                 return matchesStartDate && matchesEndDate && matchesStatus;
            }
            // If filtering by a parent category, include all its children
            const parent = MOCK_EXPENSES_DATA.find(e => e.id === expense.parentId);
            const matchesCategory = expense.category === categoryFilter || (parent && parent.category === categoryFilter);

            return matchesStartDate && matchesEndDate && matchesStatus && matchesCategory;
        });
    }, [startDate, endDate, categoryFilter, statusFilter]);

    const totalExpenses = useMemo(() => {
        return filteredData.reduce((acc, curr) => acc + curr.amount, 0);
    }, [filteredData]);
    
    const topCategory = useMemo(() => {
        if (filteredData.length === 0) return 'N/A';

        const categorySpending = filteredData.reduce((acc, curr) => {
            const parentId = curr.parentId || curr.id;
            const parentCategory = MOCK_EXPENSES_DATA.find(e => e.id === parentId)?.category || 'Unknown';
            acc[parentCategory] = (acc[parentCategory] || 0) + curr.amount;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    }, [filteredData]);

    const sortedData = useMemo(() => {
        const dataToSort = [...filteredData];
        if (sortKey) {
            dataToSort.sort((a, b) => {
                const valA = a[sortKey];
                const valB = b[sortKey];

                let comparison = 0;
                if (valA > valB) {
                    comparison = 1;
                } else if (valA < valB) {
                    comparison = -1;
                }
                return sortDirection === 'desc' ? comparison * -1 : comparison;
            });
        }
        return dataToSort;
    }, [filteredData, sortKey, sortDirection]);
    
    const { rootExpenses, childrenByParentId } = useMemo(() => {
        const childrenMap = new Map<string, Expense[]>();
        const roots: Expense[] = [];
        for (const item of sortedData) {
            if (item.parentId) {
                if (!childrenMap.has(item.parentId)) {
                    childrenMap.set(item.parentId, []);
                }
                childrenMap.get(item.parentId)!.push(item);
            } else {
                roots.push(item);
            }
        }
        return { rootExpenses: roots, childrenByParentId: childrenMap };
    }, [sortedData]);


    const handleExportCSV = () => {
        const headers = ['ID', 'Date', 'Category', 'Payee', 'Amount', 'Status', 'Parent ID'].join(',');
        const rows = sortedData.map(e => [e.id, e.date, e.category, `"${e.payee}"`, e.amount, e.status, e.parentId || ''].join(','));
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'expenses_data.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    };
    
    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    const renderRow = (expense: Expense, level: number, children: Expense[] = []) => {
        const isExpanded = expandedRows.has(expense.id);
        const hasChildren = children.length > 0;
        const totalAmount = hasChildren ? children.reduce((sum, child) => sum + child.amount, 0) : expense.amount;

        return (
            <React.Fragment key={expense.id}>
                <tr className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-text-light">{expense.id}</td>
                    <td style={{ paddingLeft: `${1.5 + level * 2}rem` }} className="py-3 whitespace-nowrap text-sm text-text-main">
                        <div className="flex items-center">
                            {hasChildren && (
                                <button onClick={() => toggleRow(expense.id)} className="mr-2 text-gray-500 hover:text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                            <span className={hasChildren ? 'font-semibold' : ''}>{expense.category}</span>
                        </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-text-light">{expense.date}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-text-light">{expense.payee}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-text-main text-right">{formatCurrency(totalAmount)}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-center">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${expense.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {expense.status}
                        </span>
                    </td>
                     <td className="px-6 py-3 whitespace-nowrap text-sm text-center">
                        <button className="text-primary hover:text-primary-dark font-medium mr-2">View</button>
                        {!expense.parentId && (
                            <button 
                                onClick={() => handleAddSubCategory(expense.id)}
                                className="text-secondary hover:text-green-700 font-medium"
                            >
                                Add Sub
                            </button>
                        )}
                    </td>
                </tr>
                {isExpanded && children.map(child => renderRow(child, level + 1, childrenByParentId.get(child.id) || []))}
            </React.Fragment>
        );
    };

    return (
        <>
            <div className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card 
                        title="Total Expenses"
                        value={formatCurrency(totalExpenses)}
                        change={`${filteredData.length} records`}
                        changeType="increase"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.153.24c-1.136 0-2.25-.333-3.184-.955a5.985 5.985 0 01-1.84-2.185M4.75 4.97a48.416 48.416 0 016.75-.47c2.291 0 4.545.16 6.75.47m-13.5 0c-1.01.143-2.01.317-3 .52m3-.52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.24c1.136 0 2.25-.333 3.184-.955a5.985 5.985 0 001.84-2.185" /></svg>}
                    />
                    <Card 
                        title="Top Expense Category"
                        value={topCategory}
                        change="Highest spending"
                        changeType="increase"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>}
                    />
                </div>
                <div className="bg-card p-6 rounded-lg shadow space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-semibold text-text-main">Expense Records</h2>
                         <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end flex-wrap">
                             <button 
                                onClick={handleExportCSV}
                                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center shrink-0 w-full sm:w-auto justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Export CSV
                            </button>
                            <button 
                                onClick={handleAddTopLevelExpense}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center shrink-0 w-full sm:w-auto justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                Add New Expense
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                             <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="block w-full border border-gray-300 rounded-md py-2 px-3 leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                        <div>
                             <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="block w-full border border-gray-300 rounded-md py-2 px-3 leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select id="categoryFilter" className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 leading-5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                {expenseCategories.map(category => <option key={category} value={category}>{category}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select id="statusFilter" className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 leading-5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Paid' | 'Unpaid')}>
                                <option value="All">All Statuses</option>
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-card">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider w-2/6">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">Payee</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-text-light uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-text-light uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rootExpenses.map(expense => renderRow(expense, 0, childrenByParentId.get(expense.id) || []))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Expense">
                <ExpenseForm onClose={() => setIsModalOpen(false)} allExpenses={MOCK_EXPENSES_DATA} defaultParentId={defaultParentForModal} />
            </Modal>
        </>
    );
};

export default Expenses;
