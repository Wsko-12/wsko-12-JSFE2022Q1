import { EAppPages, EConstants } from './enums';
import { TColorHEX } from './types';

export const isAppPage = (value: string | null): value is EAppPages => {
    if (!value) {
        return false;
    }

    return value in EAppPages;
};

export const isColorHex = (value: string | null): value is TColorHEX => {
    if (!value || value.length < EConstants.HEX_COLOR_STRING_LENGTH || value[0] !== '#') {
        return false;
    }

    const digits = value.slice(1);

    const bit16string = `0x${digits}`;
    return !Number.isNaN(+bit16string);
};
