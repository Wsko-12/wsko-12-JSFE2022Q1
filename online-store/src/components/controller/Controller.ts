import companiesData from '../../data/data';
import { Filters, IDataItem, MinMax } from '../../interface/interface';

export default class Controller {
    private readonly data: IDataItem[];
    private readonly _basicFiltersJson: string;

    private _filters: Filters;

    constructor() {
        this.data = companiesData;
        const basicFilters = this.createFilters();
        this._basicFiltersJson = JSON.stringify(basicFilters);
        this._filters = basicFilters;
    }

    public resetFilters(): void {
        this._filters = JSON.parse(this._basicFiltersJson);
    }

    public getBasicFilters(): Filters {
        return JSON.parse(this._basicFiltersJson);;
    }

    public getFilters(): Filters {
        return this._filters;
    }

    private createFilters(): Filters {
        function check(value: number, minMax: MinMax) {
            if (value > minMax[1]) {
                minMax[1] = Math.ceil(value);
            }
            if (value < minMax[0]) {
                minMax[0] = Math.floor(value);
            }
        }

        const price: MinMax = [Infinity, -Infinity];
        const year: MinMax = [Infinity, -Infinity];
        this.data.forEach((item) => {
            check(item.price, price);
            check(item.year, year);
        });

        return {
            price: {
                current: price,
                maxMin: price,
            },
            year: {
                current: year,
                maxMin: year,
            },
        };
    }

    filterByMinMax(data: IDataItem[], property: 'year' | 'price') {
        const min = this._filters[property].current[0];
        const max = this._filters[property].current[1];
        return data.filter((item) => {
            return item[property] >= min && item[property] <= max;
        });
    }

    private filter(): IDataItem[] {
        let filtered: IDataItem[] = [...this.data];
        filtered = this.filterByMinMax(filtered, 'price');
        filtered = this.filterByMinMax(filtered, 'year');

        return filtered;
    }

    getData(): IDataItem[] {
        return this.filter();
    }

    applyFilters(filters: Filters) {
        this._filters = filters;
    }
}
