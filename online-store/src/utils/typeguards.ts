import { ECompanyCountry, ELogoColor } from '../interface/interface';

export const isLogoColor = (value: string | null): value is ELogoColor => {
    if (!value) {
        return false;
    }

    return value in ELogoColor;
};

export const isLogoColorArr = (arr: string[]): arr is ELogoColor[] => arr.every(isLogoColor);

export const isCompanyCountry = (value: string | null): value is ECompanyCountry => {
    if (!value) {
        return false;
    }

    return value in ECompanyCountry;
};

export const isCompanyCountryArr = (arr: string[]): arr is ECompanyCountry[] => arr.every(isCompanyCountry);
