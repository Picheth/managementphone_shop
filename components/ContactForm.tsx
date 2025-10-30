import React, { useState } from 'react';

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [type, setType] = useState<'Customer' | 'Lead'>('Customer');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = 'Contact name is required.';
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!phone.trim()) newErrors.phone = 'Phone number is required.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('New Contact:', { name, company, type, email, phone });
            onClose();
        }
    };
    
    const getInputClasses = (fieldName: string) => {
        let baseClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm";
        if (errors[fieldName]) {
            baseClasses += " border-red-500 focus:border-red-500 focus:ring-red-500";
        }
        return baseClasses;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={getInputClasses('name')} placeholder="e.g., John Doe" required />
                     {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                 <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company (Optional)</label>
                    <input type="text" id="company" value={company} onChange={e => setCompany(e.target.value)} className={getInputClasses('company')} placeholder="e.g., JD Industries" />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={getInputClasses('email')} placeholder="e.g., john.d@example.com" required />
                     {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className={getInputClasses('phone')} placeholder="e.g., 555-0101" required />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Contact Type</label>
                <select id="type" value={type} onChange={e => setType(e.target.value as 'Customer' | 'Lead')} className={getInputClasses('type')}>
                    <option>Customer</option>
                    <option>Lead</option>
                </select>
            </div>
             <div className="bg-gray-50 px-4 py-3 -mx-6 -mb-4 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm">
                    Save Contact
                </button>
                <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ContactForm;