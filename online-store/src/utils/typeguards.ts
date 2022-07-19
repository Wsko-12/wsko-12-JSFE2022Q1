import { ELogoColor } from '../interface/interface';

export const isLogoColor = (value: string | null): value is ELogoColor => {
    if (!value) {
        return false;
    }

    return value in ELogoColor;
};
