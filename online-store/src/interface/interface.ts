// better to use enum here, string union type is rare case
export enum ELogoColor {
    gray = "gray",
    black = "black",
    red = "red",
    green = "green",
    blue = "blue",
    yellow = "yellow",
}

// type Decrement = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// type RepeatString<S extends string, N extends number> = N extends 1 ? S : `${S}${RepeatString<S, Decrement[N]>}`
// type THexSymbol = "A" | "B" | "C" | "D" | "E" | "F" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
// type TColorString = `#${RepeatString<THexSymbol, 3>}`
// type TColorString = `#${THexSymbol}${THexSymbol}${THexSymbol}${THexSymbol}${THexSymbol}${THexSymbol}`;
// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
// https://stackoverflow.com/questions/65336900/template-literal-types-typescript-repeat
// to complex for ts now - but you can try to play with it, for 3 symbols hex like #3AF its work good
type TColorString = `#${string}`;

export const logoColorMap: Record<ELogoColor, TColorString > = {
    [ELogoColor.blue]: '#437F97',
    [ELogoColor.yellow]: '#FFB30F',
    [ELogoColor.green]: '#3BB273',
    [ELogoColor.red]: '#EA3546',
    [ELogoColor.black]: '#303030',
    [ELogoColor.gray]: '#C9CAD9',
    // [ELogoColor.gray]: '#C9C',
}

// better to use enum here
export enum ECompanyCountry {
    USA = "USA",
    Europe = "Europe",
    Russia = "Russia",
}

export interface IDataItem {
    name: string;
    color: ELogoColor[];
    country: ECompanyCountry;
    discount: number;
    price: number;
    employees: number;
    year: number;
    logoUrl: string;
}

export type MinMax = [min: number, max: number];

export interface IFilters {
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
        selected: ELogoColor[];
        all: ELogoColor[];
    };
    employees: {
        current: MinMax;
        maxMin: MinMax;
    };
    countries: {
        all: ECompanyCountry[];
        selected: ECompanyCountry[];
    };
    discountOnly: boolean;
}

export type SettingsCallback = (filters: IFilters, fullReset?: boolean) => void;
