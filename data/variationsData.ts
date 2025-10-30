import type { VariationAttribute } from '../types';

export const MOCK_VARIATIONS_DATA: VariationAttribute[] = [
    { id: 'ram', name: 'RAM', values: ['4GB', '6GB', '8GB', '12GB', '16GB', '18GB', '24GB', '32GB', '64GB', '128GB'] },
    { id: 'storage', name: 'Storage', values: ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB', '3TB', '4TB', '8TB', '10000mAh', '20000mAh', '30000mAh', 'N/A'] },
    { id: 'color', name: 'Color', values: [
        'Alpine Green', 'BMW M Edition', 'Black', 'Black Titanium', 'Blue', 
        'Blue Titanium', 'Bora Purple', 'Burgundy', 'Cloud White', 'Cosmic Organge', 
        'Cream', 'Deep Blue', 'Deep Purple', 'Desert Titanium', 'Gold', 'Graphite', 
        'Gray', 'Green', 'Jet Black', 'Lavender', 'Light Gold', 'Lime', 'Matte Gold', 
        'Matte Midnight Green', 'Matte Silver', 'Matte Space Gray', 'Midnight', 
        'Mist Blue', 'N/A', 'Natural Titanium', 'Navy', 'Olive', 'Pacific Blue', 
        'Phantom Black', 'Phantom Brown', 'Phantom Navy', 'Phantom Silver', 
        'Phantom Titanium', 'Pink', 'Pink Gold', 'Purple', 'Red', 'Rose Gold', 'Sage', 
        'Sierra Blue', 'Silver', 'Sky Blue', 'Space Black', 'Space Gray', 'Starlight', 
        'Teal', 'Ulramarine', 'Violet', 'White', 'White Titanium', 'Yellow'
    ] },
    { id: 'generation', name: 'Generation', values: ['1st Gen','2nd Gen','3rd Gen', '4th Gen', '5th Gen', '6th Gen', '7th Gen', '8th Gen', '9th Gen', '10th Gen', '11th Gen', '12th Gen'] },
    { id: 'model_code', name: 'Model Code', values: [] },
    { id: 'year_released', name: 'Year Released', values: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'] },
    { id: 'country', name: 'Country', values: ['B', 'B/DS', 'BA', 'CA', 'CH', 'E', 'E/DS', 'G', 'JA', 'JP', 'KH', 'KO', 'LL', 'N', 'N/A', 'U', 'U1', 'US', 'W', 'XA', 'ZA', 'ZP'] },
    { id: 'condition', name: 'Condition', values: ['NEW', 'NEW N/A', 'NEW ACT', 'NEW NoBox', 'USED', 'UnknownPart','ApplePart', 'Activated', 'PartReplace', 'Others'] },
];