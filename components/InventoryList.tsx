import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import { MOCK_INVENTORY_DATA } from '../data/mockData';
import type { InventoryItem, ColumnDefinition } from '../types';

const LOW_STOCK_THRESHOLD = 20;

const columns: ColumnDefinition<InventoryItem>[] = [
    { header: 'Product Name', accessor: 'productName' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Quantity', 
      accessor: 'quantity',
      render: (qty) => (
        <span className={Number(qty) < LOW_STOCK_THRESHOLD ? 'text-red-500 font-bold' : ''}>{qty}</span>
      )
    },
    { header: 'Location', accessor: 'location' },
    { header: 'Cost Price', accessor: 'costPrice', render: (val) => `$${Number(val).toFixed(2)}` },
    { header: 'Selling Price', accessor: 'sellingPrice', render: (val) => `$${Number(val).toFixed(2)}` },
    {
        header: 'Actions',
        accessor: 'id',
        render: () => (
            <div className="space-x-2">
                <button className="text-primary hover:text-primary-dark text-sm font-medium">Edit</button>
                <button className="text-yellow-500 hover:text-yellow-600 text-sm font-medium">Adjust</button>
            </div>
        )
    }
];

const InventoryList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm) {
            return MOCK_INVENTORY_DATA;
        }
        return MOCK_INVENTORY_DATA.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);
    
    const getRowClassName = (item: InventoryItem) => {
        return item.quantity < LOW_STOCK_THRESHOLD ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50';
    };


    return (
        <div className="bg-card p-6 rounded-lg shadow space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-semibold text-text-main">Inventory List</h2>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 shrink-0">Export CSV</button>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Add Item
                    </button>
                </div>
            </div>
            <DataTable columns={columns} data={filteredData} rowClassName={getRowClassName} />
        </div>
    );
};

export default InventoryList;