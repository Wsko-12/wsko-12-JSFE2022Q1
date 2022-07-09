import { Filters, LogoColor } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import Colors from './colors/Colors';
import County from './country/Country';
import RangeElement from './range/RangeElement';
import './style.scss';

class Settings {
    private _currentFilters: Filters;

    private _resetButton: HTMLButtonElement | undefined;
    private _fullResetButton: HTMLButtonElement | undefined;

    private _priceRange: RangeElement | undefined;
    private _yearRange: RangeElement | undefined;
    private _employeeRange: RangeElement | undefined;
    private _discountCheckBox: HTMLInputElement | undefined;
    private _countries: County | undefined;
    private _searchInput: HTMLInputElement | undefined;
    private _colors: Colors | undefined;

    private _onChangeCallback: ((filters: Filters) => void) | null = null;
    private _onFullResetCallback: (() => void) | null = null;

    constructor() {
        this._currentFilters = {
            discountOnly: true,
            name: '',
            price: {
                current: [0, 0],
                maxMin: [0, 0],
            },
            year: {
                current: [0, 0],
                maxMin: [0, 0],
            },
            colors: {
                all: [],
                selected: [],
            },
            employees: {
                current: [0, 0],
                maxMin: [0, 0],
            },
            countries: {
                selected: [],
                all: [],
            },
        };
    }

    public build(): HTMLElement {
        const build = new Builder();
        const builder = build.createElement;
        const slideContainer = builder('div', {
            classes: 'side__slider',
        });
        const element = builder('aside', {
            classes: 'side',
            content: [slideContainer],
        });

        this._resetButton = builder('input', {
            attrs: {
                type: 'button',
                value: 'Reset',
            },
        }) as HTMLButtonElement;

        this._resetButton.addEventListener('click', () => {
            this.reset();
        });

        this._fullResetButton = builder('input', {
            attrs: {
                type: 'button',
                value: 'Full Reset',
            },
        }) as HTMLButtonElement;

        this._fullResetButton.addEventListener('click', () => {
            this.onFullReset();
        });

        this._searchInput = builder('input', {
            classes: ['search'],
            id: 'searchInput',
            attrs: {
                type: 'text',
                placeholder: 'Search...',
            },
        }) as HTMLInputElement;
        this._searchInput.addEventListener('input', (e) => {
            this._currentFilters.name = (e.target as HTMLInputElement).value;
            this.onChange();
        });

        const clearSearch = builder('button', {
            classes: 'search__clear',
        });
        clearSearch.addEventListener('click', () => {
            this._currentFilters.name = '';
            (this._searchInput as HTMLInputElement).value = '';
            this.onChange();
        });

        const findSection = builder('section', {
            classes: ['side-item', 'search-section'],
            content: [this._searchInput, clearSearch],
        });

        this._priceRange = new RangeElement(
            'Price',
            'priceRange',
            [0, 100],
            (value) => `$${Math.floor((value / 1000000000) * 100) / 100}B`
        );
        this._priceRange.setChangeCallback((min, max) => {
            this._currentFilters.price.current[0] = min;
            this._currentFilters.price.current[1] = max;
            this.onChange();
        });

        this._yearRange = new RangeElement('Year', 'yearRange', [0, 100]);
        this._yearRange.setChangeCallback((min, max) => {
            this._currentFilters.year.current[0] = min;
            this._currentFilters.year.current[1] = max;
            this.onChange();
        });

        this._employeeRange = new RangeElement(
            'Employees count',
            'employeeRange',
            [0, 100],
            Card.getFormattedEmployeeCount
        );
        this._employeeRange.setChangeCallback((min, max) => {
            this._currentFilters.employees.current[0] = min;
            this._currentFilters.employees.current[1] = max;
            this.onChange();
        });

        this._colors = new Colors('Logo colors');
        this._colors.setChangeCallback((colors: LogoColor[]) => {
            this._currentFilters.colors.selected = colors;
            this.onChange();
        });

        this._discountCheckBox = builder('input', {
            id: 'discountOnlyCheckbox',
            attrs: {
                type: 'checkbox',
            },
        }) as HTMLInputElement;
        const discountLabel = builder('label', {
            attrs: {
                for: 'discountOnlyCheckbox',
            },
            content: 'Only with discount: ',
        });

        const discount = builder('div', {
            classes: 'discount',
            content: [discountLabel, this._discountCheckBox],
        });

        this._countries = new County('Country');
        this._countries.setChangeCallback((countries) => {
            this._currentFilters.countries.selected = countries;
            this.onChange();
        });

        const filterSection = builder('section', {
            classes: ['side-item', 'filter-section'],
            content: [
                this._priceRange.getElement(),
                this._yearRange.getElement(),
                this._employeeRange.getElement(),
                this._colors.getElement(),
                discount,
                this._countries.getElement(),
            ],
        });

        this._discountCheckBox.addEventListener('change', (e) => {
            this._currentFilters.discountOnly = (e.target as HTMLInputElement).checked;
            this.onChange();
        });

        slideContainer.append(findSection, filterSection, this._resetButton, this._fullResetButton);
        return element;
    }

    public setFilters(filters: Filters): void {
        this._currentFilters = filters;
        this.setElements();
    }

    public setChangeCallback(callback: (filters: Filters) => void): void {
        this._onChangeCallback = callback;
    }

    public setFullResetCallback(callback: () => void): void {
        this._onFullResetCallback = callback;
    }

    private onChange(): void {
        if (this._onChangeCallback) this._onChangeCallback(this._currentFilters);
    }

    private onFullReset(): void {
        if (this._onFullResetCallback) this._onFullResetCallback();
    }

    private reset() {
        this.resetElements();
        this.resetCurrentFilters();
    }

    private setElements() {
        const filters = this._currentFilters;
        (this._searchInput as HTMLInputElement).value = filters.name;

        this._priceRange?.setMinMax(...filters.price.maxMin);
        this._priceRange?.setCurrentMinMax(...filters.price.current);

        this._yearRange?.setMinMax(...filters.year.maxMin);
        this._yearRange?.setCurrentMinMax(...filters.year.current);

        this._employeeRange?.setMinMax(...filters.employees.maxMin);
        this._employeeRange?.setCurrentMinMax(...filters.employees.current);

        this._colors?.setColors(filters.colors.all);
        this._colors?.applySelected(filters.colors.selected);

        (this._discountCheckBox as HTMLInputElement).checked = filters.discountOnly;

        this._countries?.fill(filters.countries.all);
        this._countries?.applySelected(filters.countries.selected);
    }

    private resetElements() {
        (this._searchInput as HTMLInputElement).value = '';
        this._priceRange?.reset();
        this._yearRange?.reset();
        this._employeeRange?.reset();
        (this._discountCheckBox as HTMLInputElement).checked = false;
        this._colors?.reset();
        this._countries?.reset();
    }

    private resetCurrentFilters() {
        this._currentFilters.name = '';
        this._currentFilters.discountOnly = false;
        this._currentFilters.colors.selected = [];
        this._currentFilters.countries.selected = [];
        this._currentFilters.year.current = [...this._currentFilters.year.maxMin];
        this._currentFilters.price.current = [...this._currentFilters.price.maxMin];
        this._currentFilters.employees.current = [...this._currentFilters.employees.maxMin];

        this.onChange();
    }
}
export default Settings;
