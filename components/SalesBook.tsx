import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import Modal from './Modal';
import SaleForm from './SaleForm';
import { MOCK_SALES_DATA } from '../data/mockData';
import type { Sale, ColumnDefinition } from '../types';

const columns: ColumnDefinition<Sale>[] = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Date', accessor: 'date', sortable: true },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Items', accessor: 'items' },
    { header: 'Total', accessor: 'total', render: (val) => `$${Number(val).toFixed(2)}`, sortable: true },
    { 
      header: 'Status', 
      accessor: 'paymentStatus',
      sortable: true,
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
            <button className="text-primary hover:text-primary-dark text-sm font-medium">View Details</button>
        )
    }
];

const SalesBook: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortKey, setSortKey] = useState<keyof Sale | null>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [orderIdFilter, setOrderIdFilter] = useState('');
    const [customerNameFilter, setCustomerNameFilter] = useState('');
    const [minAmountFilter, setMinAmountFilter] = useState('');
    const [maxAmountFilter, setMaxAmountFilter] = useState('');

    const handleSort = (key: keyof Sale) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const filteredData = useMemo(() => {
        const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
        const end = endDate ? new Date(`${endDate}T00:00:00`) : null;
        const minAmount = parseFloat(minAmountFilter);
        const maxAmount = parseFloat(maxAmountFilter);

        return MOCK_SALES_DATA.filter(sale => {
            const matchesOrderId = !orderIdFilter || sale.id.toLowerCase().includes(orderIdFilter.toLowerCase());
            const matchesCustomer = !customerNameFilter || sale.customer.toLowerCase().includes(customerNameFilter.toLowerCase());
            const matchesMinAmount = isNaN(minAmount) || sale.total >= minAmount;
            const matchesMaxAmount = isNaN(maxAmount) || sale.total <= maxAmount;
            const matchesStatus = statusFilter === 'All' || sale.paymentStatus === statusFilter;
            
            const saleDate = new Date(`${sale.date}T00:00:00`);
            const matchesStartDate = !start || saleDate >= start;
            const matchesEndDate = !end || saleDate <= end;

            return matchesOrderId && matchesCustomer && matchesMinAmount && matchesMaxAmount && matchesStatus && matchesStartDate && matchesEndDate;
        });
    }, [orderIdFilter, customerNameFilter, minAmountFilter, maxAmountFilter, statusFilter, startDate, endDate]);

    const sortedAndFilteredData = useMemo(() => {
        if (!sortKey) {
            return filteredData;
        }

        const sortedData = [...filteredData];
        sortedData.sort((a, b) => {
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
        return sortedData;
    }, [filteredData, sortKey, sortDirection]);


    return (
        <>
            <div className="bg-card p-6 rounded-lg shadow space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl font-semibold text-text-main">All Sales</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center shrink-0 w-full sm:w-auto justify-center"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Add New Sale
                    </button>
                </div>
                
                <div className="space-y-4 border-t border-b border-gray-200 py-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                            <input
                                type="text"
                                id="orderId"
                                placeholder="e.g., S001"
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                value={orderIdFilter}
                                onChange={(e) => setOrderIdFilter(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                            <input
                                type="text"
                                id="customerName"
                                placeholder="e.g., John Doe"
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                value={customerNameFilter}
                                onChange={(e) => setCustomerNameFilter(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end gap-2">
                             <div>
                                <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                                <input
                                    type="number"
                                    id="minAmount"
                                    placeholder="0"
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                    value={minAmountFilter}
                                    onChange={(e) => setMinAmountFilter(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                                <input
                                    type="number"
                                    id="maxAmount"
                                    placeholder="1000"
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                    value={maxAmountFilter}
                                    onChange={(e) => setMaxAmountFilter(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select 
                                id="status"
                                className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 leading-5 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Paid' | 'Pending' | 'Overdue')}
                            >
                                <option value="All">All Statuses</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 w-full">
                            <label htmlFor="startDate" className="text-sm font-medium text-gray-700 shrink-0">From:</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="block w-full border border-gray-300 rounded-md py-2 px-3 leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                         <div className="flex items-center gap-2 w-full">
                            <label htmlFor="endDate" className="text-sm font-medium text-gray-700 shrink-0">To:</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="block w-full border border-gray-300 rounded-md py-2 px-3 leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                     </div>
                </div>

                <p className="text-sm text-text-light border-l-4 border-primary pl-3">This table is linked to the <span className="font-semibold">Accounts Receivable</span> module to track money owed by customers.</p>
                <DataTable 
                    columns={columns} 
                    data={sortedAndFilteredData} 
                    onSort={handleSort}
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Sale">
                <SaleForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default SalesBook;
