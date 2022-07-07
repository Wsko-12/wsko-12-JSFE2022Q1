import { IDataItem } from '../interface/interface';

/* 
[
    'AMD',
    'Airbnb',
    'Amazon',
    'Apple',
    'Coca-Cola Co',
    'Ford',
    'Henkel',
    'Meta',
    'Microsoft'
    'Netflix',
    'Nokia',
    'Nvidia',
    'PayPal',
    'PepsiCo',
    'Shell',
    'Spotify',
    'Tesla',
    'Twitter',
    'Volkswagen',
    'Walt Disney',
    'Yandex',
    'eBay'
]
*/
const companiesData: IDataItem[] = [
    {
        name: 'AMD',
        color: ['black'],
        country: 'USA',
        discount: 4,
        price: 122110000000,
        employees: 11400,
        year: 1969,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/amd-logo-1.svg',
    },
    {
        name: 'Airbnb',
        color: ['red'],
        country: 'USA',
        discount: 0,
        price: 59110000000,
        employees: 5597,
        year: 2008,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/airbnb.svg',
    },
    {
        name: 'Amazon',
        color: ['black', 'yellow'],
        country: 'USA',
        discount: 0,
        price: 1160000000000,
        employees: 1340000,
        year: 1994,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/amazon-2.svg',
    },
    {
        name: 'Apple',
        color: ['gray'],
        country: 'USA',
        discount: 0,
        price: 2310000000000,
        employees: 154000,
        year: 1976,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/apple.svg',
    },
    {
        name: 'Coca-Cola Co',
        color: ['red'],
        country: 'USA',
        discount: 0,
        price: 274880000000,
        employees: 79000,
        year: 1892,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/coca-cola-6.svg',
    },
    {
        name: 'Ford',
        color: ['blue'],
        country: 'USA',
        discount: 4,
        price: 44460000000,
        employees: 199000,
        year: 1903,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/ford-1.svg',
    },
    {
        name: 'Henkel',
        color: ['red'],
        country: 'Europe',
        discount: 4,
        price: 26450000000,
        employees: 52700,
        year: 1876,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/henkel-1.svg',
    },
    {
        name: 'Meta',
        color: ['blue'],
        country: 'USA',
        discount: 10,
        price: 459450000000,
        employees: 58604,
        year: 2004,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/meta-1.svg',
    },
    {
        name: 'Microsoft',
        color: ['red', 'yellow', 'gray', 'green', 'blue'],
        country: 'USA',
        discount: 0,
        price: 1990000000000,
        employees: 181000,
        year: 1975,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/microsoft.svg',
    },
    {
        name: 'Netflix',
        color: ['red'],
        country: 'USA',
        discount: 0,
        price: 81770000000,
        employees: 11300,
        year: 1997,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
    },
    {
        name: 'Nokia',
        color: ['blue'],
        country: 'Europe',
        discount: 10,
        price: 25700000000,
        employees: 58900,
        year: 1865,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/nokia-3.svg',
    },
    {
        name: 'Nvidia',
        color: ['black', 'green'],
        country: 'Europe',
        discount: 3,
        price: 378250000000,
        employees: 13775,
        year: 1993,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/nvidia.svg',
    },
    {
        name: 'PayPal',
        color: ['blue'],
        country: 'USA',
        discount: 0,
        price: 84810000000,
        employees: 26500,
        year: 1998,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/paypal-3.svg',
    },
    {
        name: 'PepsiCo',
        color: ['blue'],
        country: 'USA',
        discount: 0,
        price: 236020000000,
        employees: 309000,
        year: 1965,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/pepsico.svg',
    },
    {
        name: 'Shell',
        color: ['yellow', 'red'],
        country: 'Europe',
        discount: 0,
        price: 145950000000,
        employees: 82000,
        year: 1907,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/shell.svg',
    },
    {
        name: 'Spotify',
        color: ['green'],
        country: 'USA',
        discount: 0,
        price: 19810000000,
        employees: 8230,
        year: 2006,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/spotify-1.svg',
    },
    {
        name: 'Tesla',
        color: ['red'],
        country: 'USA',
        discount: 0,
        price: 720500000000,
        employees: 110000,
        year: 2003,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/tesla-motors.svg',
    },
    {
        name: 'Twitter',
        color: ['blue'],
        country: 'USA',
        discount: 10,
        price: 29200000000,
        employees: 7500,
        year: 2006,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/twitter-6.svg',
    },
    {
        name: 'Volkswagen',
        color: ['blue'],
        country: 'Europe',
        discount: 10,
        price: 76670000000,
        employees: 662575,
        year: 1937,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/volkswagen-3.svg',
    },
    {
        name: 'Walt Disney Pictures',
        color: ['black'],
        country: 'USA',
        discount: 0,
        price: 175010000000,
        employees: 190000,
        year: 1923,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/walt-disney-pictures.svg',
    },
    {
        name: 'Yandex',
        color: ['red', 'black'],
        country: 'Russia',
        discount: 70,
        price: 6060000000,
        employees: 10227,
        year: 2000,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/yandex-2.svg',
    },
    {
        name: 'eBay',
        color: ['red', 'blue', 'yellow', 'green'],
        country: 'USA',
        discount: 0,
        price: 24480000000,
        employees: 12700,
        year: 1995,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/ebay.svg',
    },
];
export default companiesData;
