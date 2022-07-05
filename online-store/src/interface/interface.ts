export type LogoColor = 'colorful' | 'gray' | 'black' | 'orange' | 'red' | 'green' | 'blue' | 'yellow';
export type CompanyCountry = 'USA' | 'Europe' | 'Russia';
export interface IDataItem {
    name: string;
    color: LogoColor[] | LogoColor;
    country: CompanyCountry;
    discount: number;
    price: number;
    count: number;
    year: number;
    logoUrl: string;
}
