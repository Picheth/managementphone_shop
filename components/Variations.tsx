import React, { useState } from 'react';
import { MOCK_VARIATIONS_DATA } from '../data/variationsData';
import type { VariationAttribute } from '../types';

const Variations: React.FC = () => {
    const [variations, setVariations] = useState<VariationAttribute[]>(MOCK_VARIATIONS_DATA);
    const [newValues, setNewValues] = useState<Record<string, string>>({});

    const handleAddValue = (variationId: string) => {
        const newValue = newValues[variationId]?.trim();
        if (!newValue) return;

        setVariations(prev =>
            prev.map(v => {
                if (v.id === variationId) {
                    if (v.values.includes(newValue)) {
                        return v; // Avoid duplicates
                    }
                    return { ...v, values: [...v.values, newValue].sort() };
                }
                return v;
            })
        );

        setNewValues(prev => ({ ...prev, [variationId]: '' }));
    };
    
    const handleInputChange = (variationId: string, value: string) => {
        setNewValues(prev => ({...prev, [variationId]: value}));
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, variationId: string) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddValue(variationId);
        }
    };

    return (
        <div className="space-y-6">
             <div className="bg-card p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-text-main">Manage Product Variations</h2>
                <p className="text-sm text-text-light mt-1">Add or manage the available options for product attributes like color, storage, etc.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {variations.map(variation => (
                    <div key={variation.id} className="bg-card rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-primary mb-4">{variation.name}</h3>
                        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2">
                            {variation.values.map(value => (
                                <div key={value} className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm">
                                    <span>{value}</span>
                                    {/* Placeholder for a delete button */}
                                    <button className="text-gray-400 hover:text-red-500 text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 border-t pt-4">
                            <input
                                type="text"
                                placeholder={`Add new ${variation.name.toLowerCase()}...`}
                                value={newValues[variation.id] || ''}
                                onChange={(e) => handleInputChange(variation.id, e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, variation.id)}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            <button
                                onClick={() => handleAddValue(variation.id)}
                                className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 shrink-0"
                                aria-label={`Add ${variation.name}`}
                            >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Variations;