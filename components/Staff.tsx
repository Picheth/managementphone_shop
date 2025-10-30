import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import Card from './Card';
import Modal from './Modal';
import UserForm from './UserForm';
import { MOCK_STAFF_DATA } from '../data/staffData';
import { MOCK_BRANCHES_DATA } from '../data/mockData';
import type { User, ColumnDefinition } from '../types';

const Staff: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortKey, setSortKey] = useState<keyof User | null>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const branchesMap = useMemo(() => {
        return new Map(MOCK_BRANCHES_DATA.map(branch => [branch.id, branch.name]));
    }, []);

    const columns: ColumnDefinition<User>[] = [
        { 
            header: 'Name', 
            accessor: 'name', 
            sortable: true,
            render: (name, row) => (
                <div>
                    <div className="font-medium text-text-main">{String(name)}</div>
                    <div className="text-xs text-text-light">{row.email}</div>
                </div>
            )
        },
        { 
            header: 'Role', 
            accessor: 'role', 
            sortable: true,
            render: (role) => {
                 let colorClasses = 'bg-gray-100 text-gray-800';
                 if (role === 'Admin') colorClasses = 'bg-red-100 text-red-800';
                 if (role === 'Manager') colorClasses = 'bg-yellow-100 text-yellow-800';
                 if (role === 'Sales Staff') colorClasses = 'bg-blue-100 text-blue-800';
                 if (role === 'Technician') colorClasses = 'bg-indigo-100 text-indigo-800';
                 return (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
                        {String(role)}
                    </span>
                 );
            }
        },
        { 
            header: 'Branch', 
            accessor: 'branchId',
            render: (branchId) => branchesMap.get(String(branchId)) || 'N/A'
        },
        { 
          header: 'Status', 
          accessor: 'status',
          sortable: true,
          render: (status) => (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {String(status)}
            </span>
          )
        },
        {
            header: 'Actions',
            accessor: 'id',
            render: () => (
                <div className="space-x-2">
                    <button className="text-primary hover:text-primary-dark text-sm font-medium">Edit</button>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">Deactivate</button>
                </div>
            )
        }
    ];
    
    const handleSort = (key: keyof User) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };
    
    const filteredData = useMemo(() => {
        return MOCK_STAFF_DATA.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
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

    const activeUsers = MOCK_STAFF_DATA.filter(u => u.status === 'Active').length;

    return (
        <>
            <div className="space-y-6">
                <Card 
                    title="Active Users"
                    value={String(activeUsers)}
                    change={`${MOCK_STAFF_DATA.length} total staff accounts`}
                    changeType="increase"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                <div className="bg-card p-6 rounded-lg shadow space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-semibold text-text-main">Staff & User Management</h2>
                         <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
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
                                Add New User
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
                <UserForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default Staff;