import { IFilters } from '../../interface/interface';

// if you will use this abstract latter - possible to improve it
// abstract LocalStorage has 3 methods get, set, clear
// create keys enum and provide it to LocalStorage method, like your getAndParse
// if signature of your storage could change, possible to add versioning to avoid user clear it or possible mistakes
// example in './LocalStorageVersioning.ts'

export default class LocalStorage {
    private static _instance: LocalStorage;
    private _storage = window.localStorage;
    constructor() {
        if (!LocalStorage._instance) LocalStorage._instance = this;
        return LocalStorage._instance;
    }

    public getBasket(): string[] | null {
        return <string[]>this.getAndParse('basket');
    }

    public saveBasket(basket: string[]): void {
        this.save('basket', basket);
    }

    public getFilters(): IFilters | null {
        return <IFilters>this.getAndParse('filters');
    }

    public saveFilters(filters: IFilters): void {
        this.save('filters', filters);
    }

    public saveSorting(sorting: string): void {
        this._storage.setItem('sorting', sorting);
    }

    public getSorting(): string | null {
        return this._storage.getItem('sorting');
    }

    public clear(): void {
        this._storage.clear();
    }

    private getAndParse<T>(key: string): T | null {
        const json: string | null = this._storage.getItem(key);
        if (!json) return null;
        const parsed = JSON.parse(json) as T;
        return parsed;
    }

    private save<T>(key: string, data: T): void {
        const json = JSON.stringify(data);
        this._storage.setItem(key, json);
    }
}
