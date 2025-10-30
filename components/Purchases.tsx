import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import Modal from './Modal';
import PurchaseForm from './PurchaseForm';
import PaymentForm from './PaymentForm';
import { MOCK_PURCHASES_DATA } from '../data/mockData';
import type { Purchase, ColumnDefinition, PurchaseLineItem } from '../types';

const Purchases: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Unpaid' | 'Overdue'>('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

    const handleRecordPayment = (purchase: Purchase) => {
        setSelectedPurchase(purchase);
        setIsPaymentModalOpen(true);
    };

    const columns: ColumnDefinition<Purchase>[] = [
        { header: 'Date', accessor: 'date' },
        { header: 'Purchase ID', accessor: 'id' },
        { header: 'Supplier Name', accessor: 'supplier' },
        { header: 'Supplier Invoice', accessor: 'invoiceId' },
        { 
          header: 'Items', 
          accessor: 'lineItems',
          // FIX: The `items` parameter is broadly typed and could be a non-array, causing `.length` to be undefined.
          // `undefined` is not a valid ReactNode. Using Array.isArray ensures a valid number is always returned.
          render: (items) => (Array.isArray(items) ? items.length : 0)
        },
        { header: 'Total', accessor: 'total', render: (val) => `$${Number(val).toFixed(2)}` },
        { 
          header: 'Status', 
          accessor: 'status',
          render: (status) => (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              status === 'Paid' ? 'bg-green-100 text-green-800' :
              status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {/* FIX: The type of `status` is inferred broadly as it can be any value of a Purchase property.
                  This includes objects (like lineItems), which cannot be rendered directly in React.
                  Casting to String prevents this issue. For this column, `status` will always be a string. */}
              {String(status)}
            </span>
          )
        },
        {
            header: 'Action',
            accessor: 'id',
            render: (id, row) => {
                if (row.status === 'Unpaid' || row.status === 'Overdue') {
                    return (
                        <button
                            onClick={() => handleRecordPayment(row)}
                            className="text-primary hover:text-primary-dark text-sm font-medium"
                        >
                            Record Payment
                        </button>
                    );
                }
                return <button className="text-secondary hover:text-green-700 text-sm font-medium">View Receipt</button>;
            }
        }
    ];

    const filteredData = useMemo(() => {
        return MOCK_PURCHASES_DATA.filter(purchase => {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = !searchTerm || 
                purchase.supplier.toLowerCase().includes(lowercasedSearchTerm) ||
                purchase.invoiceId.toLowerCase().includes(lowercasedSearchTerm) ||
                purchase.id.toLowerCase().includes(lowercasedSearchTerm) ||
                purchase.lineItems.some(item => 
                    item.productName.toLowerCase().includes(lowercasedSearchTerm) ||
                    item.productId.toLowerCase().includes(lowercasedSearchTerm)
                );

            const matchesStatus = statusFilter === 'All' || purchase.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    return (
        <>
            <div className="bg-card p-6 rounded-lg shadow space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-semibold text-text-main">All Purchases</h2>
                    <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap justify-end">
                        <div className="w-full sm:w-auto">
                             <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                            <select
                                id="status-filter"
                                className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 leading-5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Paid' | 'Unpaid' | 'Overdue')}
                            >
                                <option value="All">All Statuses</option>
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </div>
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search purchases..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center shrink-0"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Add New Purchase
                        </button>
                    </div>
                </div>
                <p className="text-sm text-text-light border-l-4 border-primary pl-3">This table is linked to the <span className="font-semibold">Accounts Payable</span> module to track money owed to suppliers.</p>
                <DataTable columns={columns} data={filteredData} />
            </div>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Purchase">
                <PurchaseForm onClose={() => setIsAddModalOpen(false)} />
            </Modal>

            <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title={`Record Payment for Invoice #${selectedPurchase?.invoiceId}`}>
                <PaymentForm purchase={selectedPurchase} onClose={() => setIsPaymentModalOpen(false)} />
            </Modal>
        </>
    );
};

export default Purchases;