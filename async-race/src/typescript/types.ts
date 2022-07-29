// eslint-disable-next-line import/no-cycle
import { ICarData } from './interface';

export type TColorHEX = `#${string}`;

export type TCarRedactorCallback = (name: string, color: TColorHEX, clear: (disable: boolean) => void) => void;

export type TCarMenuEditorCallback = (name: string, color: TColorHEX) => Promise<ICarData | null>;

export type TCarSelectorCallback = (id: number) => Promise<ICarData | void>;

export type TRaceCallback = (name: string, time: number) => boolean;
