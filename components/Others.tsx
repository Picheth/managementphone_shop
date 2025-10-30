import React, { useState } from 'react';
import Modal from './Modal';
import TaxRateForm from './TaxRateForm';
import { MOCK_TAX_RATES_DATA } from '../data/mockData';

const Others: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-card p-6 rounded-lg shadow space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-text-main">Other Settings & Utilities</h2>
                    <p className="text-sm text-text-light mt-1">Manage miscellaneous settings for your business.</p>
                </div>

                <div className="border-t pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                             <h3 className="text-lg font-semibold text-text-main">Manage Tax Rates</h3>
                             <p className="text-sm text-text-light mt-1">Define tax rates for sales and purchases.</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center shrink-0 w-full sm:w-auto justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Add New Tax Rate
                        </button>
                    </div>

                    <div className="mt-4 space-y-3">
                        {MOCK_TAX_RATES_DATA.map(tax => (
                            <div key={tax.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md border">
                                <div>
                                    <span className="font-medium text-text-main">{tax.name}</span>
                                    {tax.isDefault && (
                                        <span className="ml-2 text-xs font-semibold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">Default</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-lg font-semibold text-primary">{tax.rate.toFixed(2)}%</span>
                                    <button className="text-sm font-medium text-gray-500 hover:text-primary">Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Tax Rate">
                <TaxRateForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default Others;