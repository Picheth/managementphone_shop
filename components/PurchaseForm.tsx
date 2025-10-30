import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_PRODUCTS_DATA, MOCK_SUPPLIERS_DATA } from '../data/mockData';
import type { Purchase, Product, PurchaseLineItem } from '../types';

interface PurchaseFormProps {
  onClose: () => void;
  // onSave: (purchase: Omit<Purchase, 'id'>) => void;
}

interface FormLineItem extends PurchaseLineItem {
    _id: string; // Internal temporary ID for React keys
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onClose }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [supplier, setSupplier] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [supplierContact, setSupplierContact] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [status, setStatus] = useState<'Paid' | 'Unpaid' | 'Overdue'>('Unpaid');
  
  const [lineItems, setLineItems] = useState<FormLineItem[]>([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [otherFees, setOtherFees] = useState(0);
  
  const [activeProductSearch, setActiveProductSearch] = useState<{ index: number; term: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | { [key: number]: { [key: string]: string } } }>({});

  // Initialize with one empty line item
  useEffect(() => {
    if (lineItems.length === 0) {
      setLineItems([{ _id: crypto.randomUUID(), productId: '', productName: '', unit: 'pcs', quantity: 1, price: 0 }]);
    }
  }, []);

  const { subtotal, grandTotal } = useMemo(() => {
    const sub = lineItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const grand = sub + shippingCost + otherFees;
    return { subtotal: sub, grandTotal: grand };
  }, [lineItems, shippingCost, otherFees]);


  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSupplierId(selectedId);
    const selectedSupplier = MOCK_SUPPLIERS_DATA.find(s => s.id === selectedId);
    if (selectedSupplier) {
        setSupplier(selectedSupplier.name);
        if (selectedSupplier.id === 'SUP-GEN') {
            const generatedInvoiceId = `GS-${Date.now()}`;
            setInvoiceId(generatedInvoiceId);
            setSupplierContact('');
        } else {
            setSupplierContact(selectedSupplier.phone);
            if (invoiceId.startsWith('GS-')) setInvoiceId('');
        }
    } else {
        setSupplier('');
        setSupplierContact('');
        setInvoiceId('');
    }
  };

  const filteredProducts = useMemo(() => {
    if (!activeProductSearch || !activeProductSearch.term) return [];
    return MOCK_PRODUCTS_DATA.filter(p => 
        p.id.toLowerCase().includes(activeProductSearch.term.toLowerCase()) || 
        p.name.toLowerCase().includes(activeProductSearch.term.toLowerCase())
    );
  }, [activeProductSearch]);
  
  const handleProductSearchChange = (index: number, term: string) => {
    setActiveProductSearch({ index, term });
    // Clear product info when searching
    handleItemChange(index, 'productId', '');
    handleItemChange(index, 'productName', '');
  };

  const handleProductSelect = (product: Product, index: number) => {
    const items = [...lineItems];
    items[index].productId = product.id;
    items[index].productName = product.name;
    items[index].price = product.costPrice;
    setLineItems(items);
    setActiveProductSearch(null);
  };
  
  const handleAddItem = () => {
    setLineItems([...lineItems, { _id: crypto.randomUUID(), productId: '', productName: '', unit: 'pcs', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (lineItems.length > 1) {
        setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };
  
  const handleItemChange = (index: number, field: keyof FormLineItem, value: any) => {
      const updatedItems = lineItems.map((item, i) => {
          if (i === index) {
              return { ...item, [field]: value };
          }
          return item;
      });
      setLineItems(updatedItems);
  };

  const validateForm = (): boolean => {
    const newErrors: any = { lineItems: {} };
    if (!date) newErrors.date = 'Date is required.';
    if (!supplierId) newErrors.supplier = 'Supplier is required.';
    if (!invoiceId.trim()) newErrors.invoiceId = 'Supplier Invoice # is required.';
    
    lineItems.forEach((item, index) => {
        if (!item.productId) {
            if (!newErrors.lineItems[index]) newErrors.lineItems[index] = {};
            newErrors.lineItems[index].product = 'Product is required.';
        }
        if (item.quantity <= 0) {
            if (!newErrors.lineItems[index]) newErrors.lineItems[index] = {};
            newErrors.lineItems[index].quantity = 'Must be > 0.';
        }
        if (item.price < 0) {
            if (!newErrors.lineItems[index]) newErrors.lineItems[index] = {};
            newErrors.lineItems[index].price = 'Cannot be negative.';
        }
    });

    if (Object.keys(newErrors.lineItems).length === 0) delete newErrors.lineItems;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        const finalLineItems = lineItems.map(({ _id, ...rest }) => rest);
        const newPurchase = { date, supplier, supplierContact, invoiceId, lineItems: finalLineItems, shippingCost, otherFees, total: grandTotal, status };
        console.log('Saving new purchase:', newPurchase);
        onClose();
    }
  };
  
  const getInputClasses = (fieldName: string) => `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors[fieldName] ? 'border-red-500' : ''}`;
  const getLineItemInputClasses = (index: number, fieldName: string) => `block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${(errors.lineItems as any)?.[index]?.[fieldName] ? 'border-red-500' : ''}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Supplier and Invoice Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={getInputClasses('date')} required />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date as string}</p>}
        </div>
        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Supplier</label>
          <select id="supplier" value={supplierId} onChange={handleSupplierChange} className={getInputClasses('supplier')} required>
              <option value="">Select a supplier</option>
              {MOCK_SUPPLIERS_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {errors.supplier && <p className="text-red-500 text-xs mt-1">{errors.supplier as string}</p>}
        </div>
      </div>
       <div>
          <label htmlFor="invoiceId" className="block text-sm font-medium text-gray-700">Supplier Invoice #</label>
          <input type="text" id="invoiceId" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} placeholder="INV-A123" className={`${getInputClasses('invoiceId')} ${supplierId === 'SUP-GEN' ? 'bg-gray-100' : ''}`} readOnly={supplierId === 'SUP-GEN'} required />
          {errors.invoiceId && <p className="text-red-500 text-xs mt-1">{errors.invoiceId as string}</p>}
        </div>
      
      {/* Item Details Table */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <h3 className="text-md font-semibold text-gray-800">Items</h3>
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-12 gap-x-2 text-xs font-medium text-gray-500">
            <div className="col-span-5">Product</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Unit</div>
            <div className="col-span-2">Unit Price</div>
            <div className="col-span-1"></div>
        </div>
        {lineItems.map((item, index) => (
            <div key={item._id} className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-12 md:col-span-5 relative">
                    <label className="text-xs font-medium text-gray-500 md:hidden">Product</label>
                    <input
                        type="text"
                        value={activeProductSearch?.index === index ? activeProductSearch.term : item.productName || item.productId}
                        onChange={(e) => handleProductSearchChange(index, e.target.value)}
                        onFocus={() => handleProductSearchChange(index, item.productId || '')}
                        onBlur={() => setTimeout(() => setActiveProductSearch(null), 200)}
                        placeholder="SKU or Name"
                        className={getLineItemInputClasses(index, 'product')}
                        autoComplete="off"
                    />
                    {activeProductSearch?.index === index && filteredProducts.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                            {filteredProducts.map(p => (
                                <li key={p.id} onMouseDown={() => handleProductSelect(p, index)} className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm">
                                    <div className="font-medium">{p.id}</div>
                                    <div className="text-xs">{p.name}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {(errors.lineItems as any)?.[index]?.product && <p className="text-red-500 text-xs mt-1">{(errors.lineItems as any)[index].product}</p>}
                </div>
                <div className="col-span-4 md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 md:hidden">Quantity</label>
                    <input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))} className={getLineItemInputClasses(index, 'quantity')} min="1" />
                </div>
                <div className="col-span-4 md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 md:hidden">Unit</label>
                    <input type="text" value={item.unit} onChange={e => handleItemChange(index, 'unit', e.target.value)} className={getLineItemInputClasses(index, 'unit')} />
                </div>
                <div className="col-span-4 md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 md:hidden">Unit Price</label>
                    <input type="number" value={item.price} onChange={e => handleItemChange(index, 'price', Number(e.target.value))} className={getLineItemInputClasses(index, 'price')} min="0" step="0.01" />
                </div>
                <div className="col-span-12 md:col-span-1 flex items-end justify-end pt-2 md:pt-0">
                    <button type="button" onClick={() => handleRemoveItem(index)} className="text-gray-400 hover:text-red-500 disabled:opacity-50" disabled={lineItems.length <= 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            </div>
        ))}
        <button type="button" onClick={handleAddItem} className="mt-2 text-sm font-medium text-primary hover:text-primary-dark">+ Add another line</button>
      </div>
      
      {/* Totals and Status */}
      <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Payment Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value as 'Paid' | 'Unpaid' | 'Overdue')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
              <option>Unpaid</option>
              <option>Paid</option>
              <option>Overdue</option>
          </select>
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="shippingCost" className="text-sm font-medium text-gray-700">Shipping Cost</label>
                <input type="number" id="shippingCost" value={shippingCost} onChange={e => setShippingCost(Number(e.target.value))} className="w-24 text-right rounded-md border-gray-300 shadow-sm sm:text-sm" min="0" />
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="otherFees" className="text-sm font-medium text-gray-700">Other Fees</label>
                <input type="number" id="otherFees" value={otherFees} onChange={e => setOtherFees(Number(e.target.value))} className="w-24 text-right rounded-md border-gray-300 shadow-sm sm:text-sm" min="0" />
            </div>
            <div className="flex items-center justify-between font-bold text-lg pt-2 border-t">
                <span>Grand Total</span>
                <span>{grandTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            </div>
        </div>
      </div>
      
       <div className="bg-gray-50 px-4 py-3 -mx-6 -mb-4 sm:flex sm:flex-row-reverse">
          <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm">
              Save Purchase
          </button>
          <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
          </button>
      </div>
    </form>
  );
};

export default PurchaseForm;