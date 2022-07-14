import { CompanyCountry, IDataItem, IFilters, LogoColor, MinMax } from '../../../interface/interface';

export default class Filter {
    public filterOut(filters: IFilters, data: IDataItem[]): IDataItem[] {
        let filtered = data;
        filtered = this.filterByMinMax(filters, filtered, 'price');
        filtered = this.filterByMinMax(filters, filtered, 'year');
        filtered = this.filterByMinMax(filters, filtered, 'employees');
        filtered = this.filterByLogoColor(filters, filtered);
        filtered = this.filterByNameIncludes(filters, filtered);
        filtered = this.filterByDiscount(filters, filtered);
        filtered = this.filterByCountry(filters, filtered);

        return filtered;
    }

    public calculateBasicFilters(data: IDataItem[]): IFilters {
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
        data.forEach((item) => {
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

    private filterByDiscount(filters: IFilters, data: IDataItem[]): IDataItem[] {
        if (!filters.discountOnly) return data;
        return data.filter((item) => item.discount > 0);
    }

    private filterByNameIncludes(filters: IFilters, data: IDataItem[]): IDataItem[] {
        if (filters.name === '') return data;
        const search = filters.name.trim().toLowerCase();
        return data.filter((item) => {
            const name = item.name.trim().toLowerCase();
            return name.includes(search);
        });
    }

    private filterByCountry(filters: IFilters, data: IDataItem[]): IDataItem[] {
        const selected = filters.countries.selected;
        if (selected.length === 0) {
            return data;
        }
        return data.filter((item) => {
            return selected.indexOf(item.country) != -1;
        });
    }

    private filterByLogoColor(filters: IFilters, data: IDataItem[]): IDataItem[] {
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

    private filterByMinMax(
        filters: IFilters,
        data: IDataItem[],
        property: 'year' | 'price' | 'employees'
    ): IDataItem[] {
        const min = filters[property].current[0];
        const max = filters[property].current[1];
        return data.filter((item) => {
            return item[property] >= min && item[property] <= max;
        });
    }
}
