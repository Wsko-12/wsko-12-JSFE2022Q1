// eslint-disable-next-line import/no-cycle
import { TColorHEX } from './types';

export interface ICarsResponse {
    count: number;
    cars: ICarData[];
}

export interface ICarDataShort {
    name: string;
    color: TColorHEX;
}

export interface ICarData extends ICarDataShort {
    id: number;
}

export interface IEngineData {
    velocity: number;
    distance: number;
}
