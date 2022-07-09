import { Filters } from '../../interface/interface';

export default class LocalStorage {
    private static _instance: LocalStorage;
    private _storage = window.localStorage;
    constructor() {
        if (!LocalStorage._instance) LocalStorage._instance = this;
        return LocalStorage._instance;
    }

    public getFilters(): Filters | null {
        return this.getAndParse('filters');
    }
    public saveFilters(filters: Filters): void {
        this.save('filters', filters);
    }

    public saveSorting(sorting: string) {
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
