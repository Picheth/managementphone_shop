import React from 'react';

export interface ExpenseCategoryGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: string[];
}

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    React.createElement('span', { className: 'w-8 h-8' }, children)
);

export const MOCK_EXPENSE_CATEGORIES: ExpenseCategoryGroup[] = [
    { 
        id: 'inventory', 
        name: 'Inventory & Product Costs', 
        icon: React.createElement(IconWrapper, null, 
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, 
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" })
            )
        ),
        subcategories: [
            'Purchase of smartphones (all brands and models)',
            'Accessories (chargers, cables, cases, screen protectors, headphones)',
            'Refurbished or second-hand phones (if applicable)',
            'Packaging materials',
        ] 
    },
    { 
        id: 'rent', 
        name: 'Rent & Utilities', 
        icon: React.createElement(IconWrapper, null, 
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, 
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.545M3 4.5l3 1m0 6.205l-3 1m1.5.5l1.5-.545m0 0l-1.5 1.5v-1.5m1.5 0l1.5 1.5v-1.5" })
            )
        ),
        subcategories: [
            'Shop rent / lease',
            'Electricity',
            'Water',
            'Internet & phone line',
            'Security (guards or systems, if any)',
        ] 
    },
    { 
        id: 'salaries', 
        name: 'Salaries & Wages', 
        icon: React.createElement(IconWrapper, null, 
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, 
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.61.91 1.074 1.97 1.074 3.125" })
            )
        ),
        subcategories: [
            'Staff salaries (salespersons, technicians, support staff)',
            'Commissions / bonuses',
            'Payroll taxes & social contributions',
            'Training costs',
        ] 
    },
    { 
        id: 'marketing', 
        name: 'Marketing & Advertising', 
        icon: React.createElement(IconWrapper, null, 
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, 
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" }),
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-5.2-5.2" })
            )
        ),
        subcategories: [
            'Online ads (Facebook, Instagram, TikTok)',
            'Google Ads / SEO services',
            'Flyers, posters, banners',
            'Promotions & discounts',
            'Branding (signboards, shop logo, stickers)',
        ] 
    },
    { 
        id: 'operations', 
        name: 'Shop Operations', 
        icon: React.createElement(IconWrapper, null,
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995a6.427 6.427 0 010 .255c0 .382.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995a6.427 6.427 0 010-.255c0-.382-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" }),
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
            )
        ),
        subcategories: [
            'Cash register / POS system',
            'Software subscriptions (inventory management, accounting apps)',
            'Cleaning & maintenance',
            'Security systems (CCTV, alarms)',
            'Stationery & office supplies',
        ] 
    },
    { 
        id: 'repairs', 
        name: 'Repairs & Services', 
        icon: React.createElement(IconWrapper, null,
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.471-2.471a.563.563 0 01.801 0l3.535 3.535a.563.563 0 010 .801l-2.471 2.471m-4.586-4.586l2.471-2.471a.563.563 0 01.801 0l3.535 3.535a.563.563 0 010 .801l-2.471 2.471m0 0a2.25 2.25 0 11-3.182-3.182 2.25 2.25 0 013.182 0z" })
            )
        ),
        subcategories: [
            'Repair parts (screens, batteries, etc.)',
            'Technician tools & equipment',
            'Software updates & licenses',
            'Warranty services',
        ] 
    },
    { 
        id: 'transport', 
        name: 'Transportation & Logistics', 
        icon: React.createElement(IconWrapper, null,
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h16.5M6 12C5.172 12 4.5 11.328 4.5 10.5S5.172 9 6 9s1.5.672 1.5 1.5S6.828 12 6 12zm9 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" })
            )
        ),
        subcategories: [
            'Delivery fees (for customers or suppliers)',
            'Fuel or vehicle maintenance (if shop owns delivery vehicles)',
            'Courier services',
        ] 
    },
    { 
        id: 'financial', 
        name: 'Financial & Legal', 
        icon: React.createElement(IconWrapper, null,
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0h.75A.75.75 0 016.75 6v-.75m0 0h.75A.75.75 0 018.25 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75A.75.75 0 0111.25 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75A.75.75 0 0113.5 6v.75m0 0h.75a.75.75 0 01.75-.75V5.25m0 0h.75a.75.75 0 01.75.75v.75m3 12.75H2.25" })
            )
        ),
        subcategories: [
            'Bank fees / transaction charges',
            'Accounting / bookkeeping fees',
            'Insurance (shop, inventory, liability)',
            'Licenses & permits',
            'Professional fees (legal, consultancy)',
        ] 
    },
    { 
        id: 'misc', 
        name: 'Miscellaneous', 
        icon: React.createElement(IconWrapper, null,
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
                React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" })
            )
        ),
        subcategories: [
            'Employee welfare (tea, snacks, small perks)',
            'Office refreshments',
            'Contingency fund (unexpected expenses)',
        ] 
    },
];
