import { EAppPages } from './enums';

export const isAppPage = (value: string | null): value is EAppPages => {
    if (!value) {
        return false;
    }

    return value in EAppPages;
};
