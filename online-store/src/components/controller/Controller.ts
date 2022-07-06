import companiesData from '../../data/data';
import { Filters, IDataItem } from '../../interface/interface';

export default class Controller {
    private readonly data: IDataItem[];
    private _filters: Filters;
    constructor() {
        this.data = companiesData;
        this._filters = this.createFilters();
    }

    public getFilters(): Filters {
        return this._filters;
    }

    private createFilters(): Filters {
        const price: [min: number, max: number] = [Infinity, -Infinity];
        this.data.forEach((item) => {
            if (item.price > price[1]) {
                price[1] = Math.ceil(item.price);
            }
            if (item.price < price[0]) {
                price[0] = Math.floor(item.price);
            }
        });

        return {
            price: {
                current: price,
                maxMin: price,
            },
        };
    }

    private filterByPrice(data: IDataItem[]): IDataItem[] {
        const min = this._filters.price.current[0];
        const max = this._filters.price.current[1];
        return data.filter((item) => {
            return item.price >= min && item.price <= max;
        });
    }

    private filter(): IDataItem[] {
        let filtered: IDataItem[] = [...this.data];
        filtered = this.filterByPrice(filtered);

        return filtered;
    }

    getData(): IDataItem[] {
        return this.filter();
    }

    applyFilters(filters: Filters) {
        this._filters = filters;
    }
}
