import { EConstants } from './enums';
import { ICarData } from './interface';
import { TColorHEX } from './types';

// export const isAppPage = (value: string | null): value is EAppPages => {
//     if (!value) {
//         return false;
//     }

//     return value in EAppPages;
// };

export const isColorHex = (value: string | null): value is TColorHEX => {
    if (!value || value.length < EConstants.HEX_COLOR_STRING_LENGTH || value[0] !== '#') {
        return false;
    }

    const digits = value.slice(1);

    const bit16string = `0x${digits}`;
    return !Number.isNaN(Number(bit16string));
};

// ? is it okay to use any type in typeguards?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCarData = (obj: any): obj is ICarData => {
    if (!obj || !(obj instanceof Object)) {
        return false;
    }

    if (!obj.id || typeof obj.id !== 'number') {
        return false;
    }

    if (!obj.name || typeof obj.name !== 'string') {
        return false;
    }

    if (!obj.color || !isColorHex(obj.color)) {
        return false;
    }

    return true;
};

export const isCarDataArr = (arr: unknown[]): arr is ICarData[] => {
    return arr.every((value) => isCarData(value));
};
