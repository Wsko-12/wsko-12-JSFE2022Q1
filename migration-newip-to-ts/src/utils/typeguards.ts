import {ECategory} from "../components/interface/interface";

export const isCategory = (value: string | null): value is ECategory => {
    if (!value) {
        return false;
    }

    return Object.values(ECategory).includes(value as ECategory);
    // or
    // return value in ECategory;
}
