import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import Card from './Card';
import Modal from './Modal';
import SupplierForm from './SupplierForm';
import { MOCK_SUPPLIERS_DATA } from '../data/mockData';
import type { Supplier, ColumnDefinition } from '../types';

const columns: ColumnDefinition<Supplier>[] = [
    { header: 'Supplier Name', accessor: 'name', sortable: true },
    { header: 'Contact Person', accessor: 'contactPerson' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Category', accessor: 'category', sortable: true },
    { header: 'Total Spent', accessor: 'totalSpent', render: (val) => `$${Number(val).toFixed(2)}`, sortable: true },
    {
        header: 'Actions',
        accessor: 'id',
        render: () => (
            <button className="text-primary hover:text-primary-dark text-sm font-medium">View Details</button>
        )
    }
];

const Suppliers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortKey, setSortKey] = useState<keyof Supplier | null>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: keyof Supplier) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const filteredData = useMemo(() => {
        return MOCK_SUPPLIERS_DATA.filter(supplier =>
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

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

    const totalSpent = useMemo(() => {
        return MOCK_SUPPLIERS_DATA.reduce((acc, curr) => acc + curr.totalSpent, 0);
    }, []);

    return (
        <>
            <div className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card 
                        title="Total Suppliers"
                        value={String(MOCK_SUPPLIERS_DATA.length)}
                        change="All active vendors"
                        changeType="increase"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h16.5M6 12C5.172 12 4.5 11.328 4.5 10.5S5.172 9 6 9s1.5.672 1.5 1.5S6.828 12 6 12zm9 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" /></svg>}
                    />
                     <Card 
                        title="Total Spent with Suppliers"
                        value={`$${totalSpent.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                        change="Lifetime value"
                        changeType="increase"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
                    />
                </div>
                <div className="bg-card p-6 rounded-lg shadow space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-semibold text-text-main">Supplier List</h2>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search suppliers..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center shrink-0 w-full sm:w-auto justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                Add New Supplier
                            </button>
                        </div>
                    </div>
                    <DataTable 
                        columns={columns} 
                        data={sortedData} 
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                    />
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Supplier">
                <SupplierForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default Suppliers;