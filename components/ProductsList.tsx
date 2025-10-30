import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import Modal from './Modal';
import { MOCK_PRODUCTS_DATA } from '../data/mockData';
import type { Product, ColumnDefinition } from '../types';

const columns: ColumnDefinition<Product>[] = [
    { header: 'Product No.', accessor: 'productNo' },
    { 
        header: 'Product', 
        accessor: 'name',
        render: (_, row) => (
            <div>
                <div className="font-medium text-text-main">{row.name}</div>
                <div className="text-xs text-text-light">SKU: {row.id}</div>
            </div>
        )
    },
    { header: 'Category', accessor: 'category' },
    { header: 'Cost Price', accessor: 'costPrice', render: (val) => `$${Number(val).toFixed(2)}` },
    { header: 'Selling Price', accessor: 'sellingPrice', render: (val) => `$${Number(val).toFixed(2)}` },
    { 
      header: 'Stock', 
      accessor: 'stock',
      render: (stock) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          Number(stock) > 50 ? 'bg-green-100 text-green-800' :
          Number(stock) > 10 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {/* FIX: The type of `stock` is inferred broadly as it can be any value of a Product property.
              This includes objects, which cannot be rendered directly in React.
              Casting to String prevents this issue. For this column, `stock` will always be a number. */}
          {String(stock)} units
        </span>
      )
    },
];

const ProductsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);

    const handleRowClick = (product: Product) => {
        setSelectedProductDetails(product);
        setIsDetailModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsDetailModalOpen(false);
        setSelectedProductDetails(null);
    };

    const filteredData = useMemo(() => {
        if (!searchTerm) {
            return MOCK_PRODUCTS_DATA;
        }
        return MOCK_PRODUCTS_DATA.filter(product =>
            Object.values(product).some(value => {
                if(typeof value === 'object' && value !== null) {
                    return Object.values(value).some(subValue => 
                        String(subValue).toLowerCase().includes(searchTerm.toLowerCase())
                    )
                }
                return String(value).toLowerCase().includes(searchTerm.toLowerCase())
            }
            )
        );
    }, [searchTerm]);

    const handleImport = () => {
        console.log("Import data functionality triggered.");
        alert("This would open a file dialog to import product data from a CSV file.");
    };

    return (
        <>
            <div className="bg-card p-6 rounded-lg shadow space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-semibold text-text-main">Product Catalog</h2>
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={handleImport}
                            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center shrink-0 w-full sm:w-auto justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            Import Data
                        </button>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center shrink-0 w-full sm:w-auto justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Add New Product
                        </button>
                    </div>
                </div>
                <p className="text-sm text-text-light border-l-4 border-primary pl-3">Click on a product row to view its detailed information.</p>
                <DataTable columns={columns} data={filteredData} onRowClick={handleRowClick} />
            </div>
            <Modal isOpen={isDetailModalOpen} onClose={handleCloseModal} title={selectedProductDetails?.name || "Product Details"}>
                {selectedProductDetails ? (
                    <div className="space-y-4 text-sm">
                        <div className="p-4 border rounded-md bg-gray-50/50">
                            <p className="font-semibold text-lg text-primary">{selectedProductDetails.name}</p>
                            <div className="flex justify-between text-text-light mt-1">
                                <span>SKU: {selectedProductDetails.id}</span>
                                <span>Product No: {selectedProductDetails.productNo}</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div className="font-medium text-gray-600">Brand:</div>
                            <div className="font-semibold text-text-main">{selectedProductDetails.brand}</div>

                            <div className="font-medium text-gray-600">Model:</div>
                            <div className="font-semibold text-text-main">{selectedProductDetails.model}</div>

                            <div className="font-medium text-gray-600">Category:</div>
                            <div className="font-semibold text-text-main">{selectedProductDetails.category}</div>

                            <div className="font-medium text-gray-600">Stock Quantity:</div>
                            <div className="font-semibold text-text-main">{selectedProductDetails.stock} units</div>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-md text-text-main mb-2">Variations</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {selectedProductDetails.variations.ram && <>
                                    <div className="font-medium text-gray-600">RAM:</div>
                                    <div className="font-semibold text-text-main">{selectedProductDetails.variations.ram}</div>
                                </>}
                                <div className="font-medium text-gray-600">Storage:</div>
                                <div className="font-semibold text-text-main">{selectedProductDetails.variations.storage}</div>
                                <div className="font-medium text-gray-600">Color:</div>
                                <div className="font-semibold text-text-main">{selectedProductDetails.variations.color}</div>
                                {selectedProductDetails.variations.generation && <>
                                    <div className="font-medium text-gray-600">Generation:</div>
                                    <div className="font-semibold text-text-main">{selectedProductDetails.variations.generation}</div>
                                </>}
                                {selectedProductDetails.variations.modelCode && <>
                                    <div className="font-medium text-gray-600">Model Code:</div>
                                    <div className="font-semibold text-text-main">{selectedProductDetails.variations.modelCode}</div>
                                </>}
                                {selectedProductDetails.variations.yearReleased && <>
                                    <div className="font-medium text-gray-600">Year Released:</div>
                                    <div className="font-semibold text-text-main">{selectedProductDetails.variations.yearReleased}</div>
                                </>}
                                <div className="font-medium text-gray-600">Country/Region:</div>
                                <div className="font-semibold text-text-main">{selectedProductDetails.variations.country}</div>
                                <div className="font-medium text-gray-600">Condition:</div>
                                <div className="font-semibold text-text-main">{selectedProductDetails.variations.condition}</div>
                                {selectedProductDetails.variations.others && <>
                                    <div className="font-medium text-gray-600">Others:</div>
                                    <div className="font-semibold text-text-main">{selectedProductDetails.variations.others}</div>
                                </>}
                            </div>
                        </div>
                        
                         <div className="border-t pt-4 space-y-2">
                             <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Cost Price:</span>
                                <span className="text-lg font-bold text-red-600">{`$${selectedProductDetails.costPrice.toFixed(2)}`}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Selling Price:</span>
                                <span className="text-lg font-bold text-green-600">{`$${selectedProductDetails.sellingPrice.toFixed(2)}`}</span>
                            </div>
                         </div>
                         <div className="bg-gray-50 px-4 py-3 -mx-6 -mb-6 sm:flex sm:flex-row-reverse rounded-b-lg mt-4">
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-text-light">Product details could not be found.</p>
                        <div className="bg-gray-50 px-4 py-3 -mx-6 -mb-6 sm:flex sm:flex-row-reverse rounded-b-lg mt-4">
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default ProductsList;