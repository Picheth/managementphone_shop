import React, { useState } from 'react';

interface SaleFormProps {
  onClose: () => void;
  // onSave: (sale: Omit<Sale, 'id'>) => void; // In a real app
}

const SaleForm: React.FC<SaleFormProps> = ({ onClose }) => {
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState(1);
  const [total, setTotal] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Pending');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!date) {
        newErrors.date = 'Date is required.';
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Add T00:00:00 to avoid timezone issues where the selected date might be interpreted as the previous day.
        const selectedDate = new Date(date + 'T00:00:00');
        if (selectedDate < today) {
            newErrors.date = 'Date cannot be in the past.';
        }
    }
    if (!customer.trim()) newErrors.customer = 'Customer name is required.';
    if (items <= 0) newErrors.items = 'Items must be greater than 0.';
    if (total < 0) newErrors.total = 'Total cannot be negative.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        const newSale = { date, customer, items, total, paymentStatus };
        console.log('Saving new sale:', newSale);
        // onSave(newSale); // In a real app
        onClose();
    }
  };

  const getInputClasses = (fieldName: string) => {
    let baseClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm";
    if (errors[fieldName]) {
        baseClasses += " border-red-500 focus:border-red-500 focus:ring-red-500";
    }
    return baseClasses;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={getInputClasses('date')}
          required
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>
      <div>
        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          id="customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className={getInputClasses('customer')}
          placeholder="John Doe"
          required
        />
         {errors.customer && <p className="text-red-500 text-xs mt-1">{errors.customer}</p>}
      </div>
       <div className="grid grid-cols-2 gap-4">
        <div>
            <label htmlFor="items" className="block text-sm font-medium text-gray-700">Items</label>
            <input
            type="number"
            id="items"
            value={items}
            onChange={(e) => setItems(Number(e.target.value))}
            className={getInputClasses('items')}
            min="1"
            required
            />
            {errors.items && <p className="text-red-500 text-xs mt-1">{errors.items}</p>}
        </div>
        <div>
            <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total ($)</label>
            <input
            type="number"
            id="total"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className={getInputClasses('total')}
            min="0"
            step="0.01"
            required
            />
            {errors.total && <p className="text-red-500 text-xs mt-1">{errors.total}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Payment Status</label>
        <select
          id="status"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value as 'Paid' | 'Pending' | 'Overdue')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option>Pending</option>
          <option>Paid</option>
          <option>Overdue</option>
        </select>
      </div>
       <div className="bg-gray-50 px-4 py-3 -mx-6 -mb-4 sm:flex sm:flex-row-reverse">
            <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
                Save Sale
            </button>
            <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
            >
                Cancel
            </button>
        </div>
    </form>
  );
};

export default SaleForm;