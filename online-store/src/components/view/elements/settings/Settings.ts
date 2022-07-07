import { Filters, LogoColor } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import Colors from './colors/Colors';
import RangeElement from './range/RangeElement';
import './style.scss';

class Settings {
    private _currentFilters: Filters;
    private _onChangeCallback: ((filters: Filters) => void) | null = null;
    private _onResetCallback: (() => void) | null = null;

    private _resetButton: HTMLButtonElement | undefined;
    private _priceRange: RangeElement | undefined;
    private _yearRange: RangeElement | undefined;
    private _employeeRange: RangeElement | undefined;

    private _colors: Colors | undefined;

    constructor() {
        this._currentFilters = {
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
                current: [],
            },
            employees: {
                current: [0, 0],
                maxMin: [0, 0],
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
            content:[slideContainer],
        });

        this._resetButton = builder('input', {
            attrs: {
                type: 'button',
                value: 'Reset',
            },
        }) as HTMLButtonElement;

        this._resetButton.addEventListener('click', () => {
            this.onReset();
        });

        const searchInput = builder('input', {
            classes: ['search'],
            attrs: {
                type: 'text',
                placeholder: 'Search company...',
            },
        });

        const findSection = builder('section', {
            classes: ['side-item', 'search-section'],
            content: [searchInput],
        });

        this._priceRange = new RangeElement(
            'Price',
            'priceRange',
            [0, 100],
            (value) => `$${Math.floor((value / 1000000000) * 100) / 100}b`
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
            this._currentFilters.colors.current = colors;
            this.onChange();
        });

        const filterSection = builder('section', {
            classes: ['side-item', 'filter-section'],
            content: [
                this._priceRange.getElement(),
                this._yearRange.getElement(),
                this._employeeRange.getElement(),
                this._colors.getElement(),
            ],
        });

        slideContainer.append(findSection, filterSection, this._resetButton);
        return element;
    }

    public setStartFilters(filters: Filters) {
        this._currentFilters = filters;
        this._priceRange?.setMinMax(...filters.price.maxMin);
        this._priceRange?.setCurrentMinMax(...filters.price.current);

        this._yearRange?.setMinMax(...filters.year.maxMin);
        this._yearRange?.setCurrentMinMax(...filters.year.current);

        this._employeeRange?.setMinMax(...filters.employees.maxMin);
        this._employeeRange?.setCurrentMinMax(...filters.employees.current);

        this._colors?.setColors(filters.colors.all);
    }

    public setChangeCallback(callback: (filters: Filters) => void) {
        this._onChangeCallback = callback;
    }

    public setResetCallback(callback: () => void) {
        this._onResetCallback = callback;
    }

    private onChange() {
        if (this._onChangeCallback) this._onChangeCallback(this._currentFilters);
    }

    private onReset() {
        if (this._onResetCallback) this._onResetCallback();
    }
}
export default Settings;
