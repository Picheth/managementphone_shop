import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import Card from './Card';
import Modal from './Modal';
import ContactForm from './ContactForm';
import { MOCK_CONTACTS_DATA } from '../data/mockData';
import type { Contact, ColumnDefinition } from '../types';

const columns: ColumnDefinition<Contact>[] = [
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Company', accessor: 'company' },
    { 
      header: 'Type', 
      accessor: 'type',
      sortable: true,
      render: (type) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          type === 'Customer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {type}
        </span>
      )
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Last Contact', accessor: 'lastContactDate', sortable: true },
    {
        header: 'Actions',
        accessor: 'id',
        render: () => (
            <button className="text-primary hover:text-primary-dark text-sm font-medium">View Profile</button>
        )
    }
];

const Contacts: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortKey, setSortKey] = useState<keyof Contact | null>('lastContactDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (key: keyof Contact) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };
    
    const { filteredData, totalContacts, totalLeads } = useMemo(() => {
        const data = MOCK_CONTACTS_DATA.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        return {
            filteredData: data,
            totalContacts: MOCK_CONTACTS_DATA.length,
            totalLeads: MOCK_CONTACTS_DATA.filter(c => c.type === 'Lead').length,
        }
    }, [searchTerm]);

    const sortedData = useMemo(() => {
        const dataToSort = [...filteredData];
        if (sortKey) {
            dataToSort.sort((a, b) => {
                const valA = a[sortKey];
                const valB = b[sortKey];
                let comparison = 0;
                if (valA! > valB!) {
                    comparison = 1;
                } else if (valA! < valB!) {
                    comparison = -1;
                }
                return sortDirection === 'desc' ? comparison * -1 : comparison;
            });
        }
        return dataToSort;
    }, [filteredData, sortKey, sortDirection]);

    return (
        <>
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card 
                        title="Total Contacts"
                        value={String(totalContacts)}
                        change="All customers & leads"
                        changeType="increase"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.61.91 1.074 1.97 1.074 3.125" /></svg>}
                    />
                    <Card 
                        title="New Leads"
                        value={String(totalLeads)}
                        change="Potential customers"
                        changeType="increase"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" /></svg>}
                    />
                </div>
                <div className="bg-card p-6 rounded-lg shadow space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-semibold text-text-main">Contact Management</h2>
                         <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search contacts..."
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
                                Add Contact
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Contact">
                <ContactForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default Contacts;