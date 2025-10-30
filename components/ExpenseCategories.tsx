import React from 'react';
import { MOCK_EXPENSE_CATEGORIES } from '../data/expenseCategoriesData';

const ExpenseCategories: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-text-main">Standard Expense Categories</h2>
                <p className="text-sm text-text-light mt-1">
                    A comprehensive list of standard expense categories to help with financial tracking and reporting. These can be used when recording new expenses.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_EXPENSE_CATEGORIES.map(category => (
                    <div key={category.id} className="bg-card rounded-lg shadow p-6 flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mr-4">
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-bold text-primary">{category.name}</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-text-main list-disc pl-5 flex-1">
                            {category.subcategories.map(sub => (
                                <li key={sub}>{sub}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseCategories;
