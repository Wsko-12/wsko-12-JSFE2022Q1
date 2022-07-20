import { CompanyCountry, ECompanyCountry, ELogoColor, LogoColor } from '../interface/interface';

export const isLogoColor = (value: string | null): value is LogoColor => {
    if (!value) {
        return false;
    }

    return value in ELogoColor;
};

export const isLogoColorArr = (arr: string[]): arr is LogoColor[] => arr.every(isLogoColor);

export const isCompanyCountry = (value: string | null): value is CompanyCountry => {
    if (!value) {
        return false;
    }

    return value in ECompanyCountry;
};

export const isCompanyCountryArr = (arr: string[]): arr is CompanyCountry[] => arr.every(isCompanyCountry);
