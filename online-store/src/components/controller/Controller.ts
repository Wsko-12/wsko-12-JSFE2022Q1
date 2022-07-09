import companiesData from '../../data/data';
import { CompanyCountry, Filters, IDataItem, LogoColor, MinMax } from '../../interface/interface';
import LocalStorage from '../localStorage/LocalStorage';

// TODO: make class Filter
export default class Controller {
    private readonly data: IDataItem[];
    private readonly _basicFiltersJson: string;
    private _currentFilters: Filters;

    constructor() {
        this.data = companiesData;
        const basicFilters = this.calculateFilters();
        this._basicFiltersJson = JSON.stringify(basicFilters);
        this._currentFilters = this.loadFilters(basicFilters);
    }

    public getCurrentFilters(): Filters {
        return this._currentFilters;
    }

    public getFilteredData(filters: Filters): IDataItem[] {
        return this.filter(filters);
    }

    public clear(): void {
        this._currentFilters = JSON.parse(this._basicFiltersJson);
    }

    private calculateFilters(): Filters {
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
        const employees: MinMax = [Infinity, -Infinity];
        const countries: CompanyCountry[] = [];

        const colors: LogoColor[] = [];
        this.data.forEach((item) => {
            check(item.price, price);
            check(item.year, year);
            check(item.employees, employees);

            item.color.forEach((color) => {
                if (colors.indexOf(color) === -1) {
                    colors.push(color);
                }
            });

            if (countries.indexOf(item.country) === -1) {
                countries.push(item.country);
            }
        });

        return {
            name: '',
            price: {
                current: price,
                maxMin: price,
            },
            year: {
                current: year,
                maxMin: year,
            },
            colors: {
                all: colors,
                selected: [],
            },
            employees: {
                current: employees,
                maxMin: employees,
            },
            discountOnly: false,
            countries: {
                all: countries,
                selected: [],
            },
        };
    }

    private loadFilters(basicFilters: Filters): Filters {
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
        } as Filters;
    }

    private filterByDiscount(filters: Filters, data: IDataItem[]): IDataItem[] {
        if (!filters.discountOnly) return data;
        return data.filter((item) => item.discount > 0);
    }

    private filterByNameIncludes(filters: Filters, data: IDataItem[]): IDataItem[] {
        if (filters.name === '') return data;
        const search = filters.name.trim().toLowerCase();
        return data.filter((item) => {
            const name = item.name.trim().toLowerCase();
            return name.includes(search);
        });
    }

    private filterByCountry(filters: Filters, data: IDataItem[]): IDataItem[] {
        const selected = filters.countries.selected;
        if (selected.length === 0) {
            return data;
        }
        return data.filter((item) => {
            return selected.indexOf(item.country) != -1;
        });
    }

    private filterByLogoColor(filters: Filters, data: IDataItem[]): IDataItem[] {
        if (filters.colors.selected.length === 0) {
            return data;
        }
        return data.filter((item) => {
            const colors: LogoColor[] = item.color;
            const selected: LogoColor[] = filters.colors.selected;
            let allColors = true;
            for (let i = 0; i < selected.length; i++) {
                if (colors.indexOf(selected[i]) === -1) {
                    allColors = false;
                }
            }
            return allColors;
        });
    }

    private filterByMinMax(filters: Filters, data: IDataItem[], property: 'year' | 'price' | 'employees'): IDataItem[] {
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
        filtered = this.filterByMinMax(filters, filtered, 'employees');
        filtered = this.filterByLogoColor(filters, filtered);
        filtered = this.filterByNameIncludes(filters, filtered);
        filtered = this.filterByDiscount(filters, filtered);
        filtered = this.filterByCountry(filters, filtered);

        return filtered;
    }
}
