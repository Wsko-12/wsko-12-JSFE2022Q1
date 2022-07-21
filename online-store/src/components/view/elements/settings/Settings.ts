import { ECompanyCountry, IFilters, ELogoColor, SettingsCallback, isLogoColorArr } from '../../../../interface/interface';
import { IFilters, SettingsCallback } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import Colors from './colors/Colors';
import County from './country/Country';
import RangeElement from './range/RangeElement';
import './style.scss';

class Settings {
    private _currentFilters: IFilters;

    private _element: HTMLElement;

    private _resetButton: HTMLButtonElement;
    private _fullResetButton: HTMLButtonElement;

    private _priceRange: RangeElement;
    private _yearRange: RangeElement;
    private _employeeRange: RangeElement;
    private _discountCheckBox: HTMLInputElement;
    private _countries: County;
    private _searchInput: HTMLInputElement;
    private _clearSearchButton: HTMLButtonElement;
    private _colors: Colors;

    private _onChangeCallback: SettingsCallback | null = null;

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

        const builder = Builder.createElement;
        const slideContainer = <HTMLDivElement>builder('div', {
            classes: 'side__slider',
        });
        this._element = <HTMLElement>builder('aside', {
            classes: 'side',
            content: [slideContainer],
        });

        this._resetButton = <HTMLButtonElement>builder('input', {
            classes: ['button', 'side-item__button'],
            attrs: {
                type: 'button',
                value: 'Reset filters',
            },
        });

        this._fullResetButton = <HTMLButtonElement>builder('input', {
            classes: ['button', 'side-item__button'],
            attrs: {
                type: 'button',
                value: 'Reset settings',
            },
        });

        const buttonsWrapper = <HTMLDivElement>builder('div', {
            classes: ['side-item__buttons-wrapper'],
            content: [this._resetButton, this._fullResetButton],
        });

        this._searchInput = <HTMLInputElement>builder('input', {
            classes: ['search'],
            id: 'searchInput',
            attrs: {
                type: 'text',
                placeholder: 'Search...',
                autocomplete: 'off',
            },
        });

        this._clearSearchButton = <HTMLButtonElement>builder('button', {
            classes: 'search__clear',
        });

        const findSection = <HTMLElement>builder('section', {
            classes: ['side-item', 'search-section'],
            content: [this._searchInput, this._clearSearchButton],
        });

        this._priceRange = new RangeElement(
            'Price',
            'priceRange',
            [0, 100],
            (value) => `$${Math.floor((value / 1000000000) * 100) / 100}B`
        );

        this._yearRange = new RangeElement('Year', 'yearRange', [0, 100]);

        this._employeeRange = new RangeElement(
            'Employees count',
            'employeeRange',
            [0, 100],
            Card.getFormattedEmployeeCount
        );

        this._colors = new Colors('Logo colors');

        this._discountCheckBox = <HTMLInputElement>builder('input', {
            id: 'discountOnlyCheckbox',
            attrs: {
                type: 'checkbox',
            },
        });
        const discountLabel = <HTMLLabelElement>builder('label', {
            attrs: {
                for: 'discountOnlyCheckbox',
            },
            content: 'Only with discount: ',
        });

        const discount = <HTMLDivElement>builder('div', {
            classes: 'discount',
            content: [discountLabel, this._discountCheckBox],
        });

        this._countries = new County('Country');

        const filterSection = <HTMLElement>builder('section', {
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

        this.applyListeners();
        slideContainer.append(findSection, filterSection, buttonsWrapper);
    }

    public getElement(): HTMLElement {
        return this._element;
    }

    public setFilters(filters: IFilters): void {
        this._currentFilters = filters;
        this.setElements();
    }

    public setChangeCallback(callback: SettingsCallback): void {
        this._onChangeCallback = callback;
    }

    private applyListeners(): void {
        this._resetButton.addEventListener('click', () => {
            this.reset();
        });

        this._fullResetButton.addEventListener('click', () => {
            this.reset(true);
        });

        this._searchInput.addEventListener('input', (e) => {
            if (e.target instanceof HTMLInputElement) {
                this._currentFilters.name = e.target.value;
                this.onChange();
            }
        });

        this._clearSearchButton.addEventListener('click', () => {
            this._currentFilters.name = '';
            this._searchInput.value = '';
            this.onChange();
        });

        this._priceRange.setChangeCallback((min, max) => {
            if (typeof min === 'number' && typeof max === 'number') {
                this._currentFilters.price.current[0] = min;
                this._currentFilters.price.current[1] = max;
                this.onChange();
            }
        });

        this._yearRange.setChangeCallback((min, max) => {
            if (typeof min === 'number' && typeof max === 'number') {
                this._currentFilters.year.current[0] = min;
                this._currentFilters.year.current[1] = max;
                this.onChange();
            }
        });

        this._employeeRange.setChangeCallback((min, max) => {
            if (typeof min === 'number' && typeof max === 'number') {
                this._currentFilters.employees.current[0] = min;
                this._currentFilters.employees.current[1] = max;
                this.onChange();
            }
        });

        this._colors.setChangeCallback((colors) => {
            if (Array.isArray(colors) && isLogoColorArr(colors)) {
                this._currentFilters.colors.selected = colors;
                this.onChange();
            }
        });

        this._countries.setChangeCallback((countries) => {
            if (Array.isArray(countries) && isCompanyCountryArr(countries)) {
                this._currentFilters.countries.selected = countries;
                this.onChange();
            }
        });

        this._discountCheckBox.addEventListener('change', (e) => {
            if (e.target instanceof HTMLInputElement) {
                this._currentFilters.discountOnly = e.target.checked;
                this.onChange();
            }
        });
    }

    private onChange(fullReset?: boolean): void {
        if (this._onChangeCallback) this._onChangeCallback(this._currentFilters, fullReset);
    }

    private reset(fullReset?: boolean) {
        this.resetElements();
        this.resetCurrentFilters();
        this.onChange(fullReset);
    }

    private setElements() {
        const filters = this._currentFilters;
        this._searchInput.value = filters.name;

        this._priceRange.setMinMax(...filters.price.maxMin);
        this._priceRange.setCurrentMinMax(...filters.price.current);

        this._yearRange.setMinMax(...filters.year.maxMin);
        this._yearRange.setCurrentMinMax(...filters.year.current);

        this._employeeRange.setMinMax(...filters.employees.maxMin);
        this._employeeRange.setCurrentMinMax(...filters.employees.current);

        this._colors.setColors(filters.colors.all);
        this._colors.applySelected(filters.colors.selected);

        this._discountCheckBox.checked = filters.discountOnly;

        this._countries.fill(filters.countries.all);
        this._countries.applySelected(filters.countries.selected);
    }

    private resetElements() {
        this._searchInput.value = '';
        this._priceRange.reset();
        this._yearRange.reset();
        this._employeeRange.reset();
        this._discountCheckBox.checked = false;
        this._colors.reset();
        this._countries.reset();
    }

    private resetCurrentFilters() {
        this._currentFilters.name = '';
        this._currentFilters.discountOnly = false;
        this._currentFilters.colors.selected = [];
        this._currentFilters.countries.selected = [];
        this._currentFilters.year.current = [...this._currentFilters.year.maxMin];
        this._currentFilters.price.current = [...this._currentFilters.price.maxMin];
        this._currentFilters.employees.current = [...this._currentFilters.employees.maxMin];
    }
}
export default Settings;
