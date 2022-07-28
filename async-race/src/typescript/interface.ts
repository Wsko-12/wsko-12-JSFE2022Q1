import { TColorHEX } from './types';

export interface ICarsResponse {
    count: number;
    cars: ICarData[];
}

export interface ICarData {
    name: string;
    color: TColorHEX;
    id: number;
}
