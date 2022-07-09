import LocalStorage from '../localStorage/LocalStorage';

type Listener = (basket: string[]) => void;

export default class Basket {
    private static _instance: Basket;
    private _localStorage: LocalStorage = new LocalStorage();
    private _items: string[] = this._localStorage.getBasket() || [];

    private _maxItems = 20;

    private _onChangeListeners: Listener[] = [];
    private _onFullListeners: Listener[] = [];

    constructor() {
        if (!Basket._instance) Basket._instance = this;
        return Basket._instance;
    }

    public getItems(): string[] {
        return this._items;
    }

    public has(companyName: string): boolean {
        return this._items.indexOf(companyName) != -1;
    }

    public addOnChangeListener(listener: Listener): void {
        this._onChangeListeners.push(listener);
    }

    public addOnFullListener(listener: Listener): void {
        this._onChangeListeners.push(listener);
    }

    public getItemsCount(): number {
        return this._items.length;
    }

    public clear(): void {
        this._items = [];
        this.onChange();
    }

    public toggle(companyName: string): boolean {
        const index = this._items.indexOf(companyName);
        if (index === -1) {
            if (this.getItemsCount() < this._maxItems) {
                this._items.push(companyName);
                this.onChange();
                return true;
            } else {
                this.onFull();
                return false;
            }
        } else {
            this._items.splice(index, 1);
            this.onChange();
            return false;
        }
    }

    private onChange(): void {
        this._localStorage.saveBasket(this._items);
        this._onChangeListeners.forEach((listener) => {
            listener(this._items);
        });
    }

    private onFull(): void {
        console.log('Bassket full');
        this._onFullListeners.forEach((listener) => {
            listener(this._items);
        });
    }
}
