import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import { MOCK_SALES_DATA } from '../data/mockData';
import type { Sale, ColumnDefinition } from '../types';
import Card from './Card';

const columns: ColumnDefinition<Sale>[] = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Date', accessor: 'date' },
    { header: 'Total', accessor: 'total', render: (val) => `$${Number(val).toFixed(2)}` },
    { 
      header: 'Status', 
      accessor: 'paymentStatus',
      render: (status) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'Paid' ? 'bg-green-100 text-green-800' :
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    },
     {
        header: 'Actions',
        accessor: 'id',
        render: () => (
            <button className="text-primary hover:text-primary-dark text-sm font-medium">Record Payment</button>
        )
    }
];

const AccountsReceivable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const receivableData = useMemo(() => {
        const unpaidSales = MOCK_SALES_DATA.filter(s => s.paymentStatus === 'Pending' || s.paymentStatus === 'Overdue');
        if (!searchTerm) {
            return unpaidSales;
        }
        return unpaidSales.filter(sale =>
            Object.values(sale).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    const totalReceivable = useMemo(() => {
        return receivableData.reduce((acc, curr) => acc + curr.total, 0);
    }, [receivableData]);

     const totalOverdue = useMemo(() => {
        return receivableData.filter(p => p.paymentStatus === 'Overdue').reduce((acc, curr) => acc + curr.total, 0);
    }, [receivableData]);

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card 
                    title="Total Receivable"
                    value={`$${totalReceivable.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                    change={`${receivableData.length} invoices`}
                    changeType="increase"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
                />
                 <Card 
                    title="Total Overdue"
                    value={`$${totalOverdue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                    change={`${receivableData.filter(p => p.paymentStatus === 'Overdue').length} invoices`}
                    changeType="decrease"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>}
                />
            </div>
            <div className="bg-card p-6 rounded-lg shadow space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-semibold text-text-main">Awaiting Customer Payments</h2>
                     <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search customers/orders..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <DataTable columns={columns} data={receivableData} />
            </div>
        </div>
    );
};

export default AccountsReceivable;