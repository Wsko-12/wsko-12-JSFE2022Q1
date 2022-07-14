import companiesData from '../../data/data';
import { IFilters, IDataItem } from '../../interface/interface';
import LocalStorage from '../localStorage/LocalStorage';
import Filter from './filter/Filter';

export default class Controller {
    private readonly data: IDataItem[];
    private _startFilters: IFilters;
    private _filter: Filter = new Filter();

    constructor() {
        this.data = companiesData;
        this._startFilters = this.loadFilters();
    }

    public getStartFilters(): IFilters {
        return this._startFilters;
    }

    public getFilteredData(filters: IFilters): IDataItem[] {
        return this._filter.filterOut(filters, [...this.data]);
    }

    private loadFilters(): IFilters {
        const basicFilters = this._filter.calculateBasicFilters(this.data);
        const savedFilters = new LocalStorage().getFilters();
        if (!savedFilters) return basicFilters;
        return {
            name: savedFilters.name,
            price: {
                current: savedFilters.price.current,
                maxMin: basicFilters.price.maxMin,
            },
            year: {
                current: savedFilters?.year.current,
                maxMin: basicFilters.year.maxMin,
            },
            colors: {
                all: basicFilters.colors.all,
                selected: savedFilters?.colors.selected,
            },
            employees: {
                current: savedFilters?.employees.current,
                maxMin: basicFilters.employees.maxMin,
            },
            discountOnly: savedFilters?.discountOnly,
            countries: {
                all: basicFilters.countries.all,
                selected: savedFilters?.countries.selected,
            },
        };
    }
}
