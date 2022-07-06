import companiesData from '../../data/data';
import { Filters, IDataItem, MinMax } from '../../interface/interface';

export default class Controller {
    private readonly data: IDataItem[];
    private readonly _basicFiltersJson: string;

    constructor() {
        this.data = companiesData;
        const basicFilters = this.createFilters();
        this._basicFiltersJson = JSON.stringify(basicFilters);
    }

    public getBasicFilters(): Filters {
        return JSON.parse(this._basicFiltersJson);
    }

    public getFilteredData(filters: Filters): IDataItem[] {
        return this.filter(filters);
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

    private filterByMinMax(filters: Filters, data: IDataItem[], property: 'year' | 'price') {
        const min = filters[property].current[0];
        const max = filters[property].current[1];
        return data.filter((item) => {
            return item[property] >= min && item[property] <= max;
        });
    }

    private filter(filters: Filters): IDataItem[] {
        let filtered: IDataItem[] = [...this.data];
        filtered = this.filterByMinMax(filters, filtered, 'price');
        filtered = this.filterByMinMax(filters, filtered, 'year');

        return filtered;
    }
}
