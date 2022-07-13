export type LogoColor = 'gray' | 'black' | 'red' | 'green' | 'blue' | 'yellow';
export enum ColorPalette {
    blue = '#437F97',
    yellow = '#FFB30F',
    green = '#3BB273',
    red = '#EA3546',
    black = '#303030',
    gray = '#C9CAD9',
}

export type CompanyCountry = 'USA' | 'Europe' | 'Russia';
export interface IDataItem {
    name: string;
    color: LogoColor[];
    country: CompanyCountry;
    discount: number;
    price: number;
    employees: number;
    year: number;
    logoUrl: string;
}
export type MinMax = [min: number, max: number];

export interface Filters {
    name: string;
    price: {
        current: MinMax;
        maxMin: MinMax;
    };
    year: {
        current: MinMax;
        maxMin: MinMax;
    };
    colors: {
        selected: LogoColor[];
        all: LogoColor[];
    };
    employees: {
        current: MinMax;
        maxMin: MinMax;
    };
    countries: {
        all: CompanyCountry[];
        selected: CompanyCountry[];
    };
    discountOnly: boolean;
}

export type SettingsCallback = (filters: Filters, fullReset?: boolean) => void;
