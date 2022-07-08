import { Filters } from '../../interface/interface';

export default class LocalStorage {
    private static _instance: LocalStorage;
    private _storage = window.localStorage;
    constructor() {
        if (!LocalStorage._instance) LocalStorage._instance = this;
        return LocalStorage._instance;
    }

    public getFilters(): Filters | null {
        const json: string | null = this._storage.getItem('filters');
        if (!json) return null;
        const parsed = JSON.parse(json) as Filters;
        return parsed;
    }
    public saveFilters(filters: Filters): void {
        const json = JSON.stringify(filters);
        this._storage.setItem('filters', json);
    }

    public clear(): void {
        this._storage.clear();
    }
}
