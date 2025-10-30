import type { User } from '../types';

export const MOCK_STAFF_DATA: User[] = [
    { id: 'USR001', name: 'Admin User', email: 'admin@phonestore.com', role: 'Admin', status: 'Active', branchId: 'B001' },
    { id: 'USR002', name: 'Alice Johnson', email: 'alice.j@phonestore.com', role: 'Manager', status: 'Active', branchId: 'B001' },
    { id: 'USR003', name: 'Bob Williams', email: 'bob.w@phonestore.com', role: 'Manager', status: 'Inactive', branchId: 'B002' },
    { id: 'USR004', name: 'Charlie Brown', email: 'charlie.b@phonestore.com', role: 'Technician', status: 'Active', branchId: 'B003' },
    { id: 'USR005', name: 'Diana Prince', email: 'diana.p@phonestore.com', role: 'Sales Staff', status: 'Active', branchId: 'B004' },
    { id: 'USR006', name: 'Edward Nygma', email: 'ed.n@phonestore.com', role: 'Sales Staff', status: 'Active', branchId: 'B001' },
];