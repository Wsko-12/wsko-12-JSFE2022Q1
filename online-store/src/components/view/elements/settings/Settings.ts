import { Filters, LogoColor } from '../../../../interface/interface';
import Builder from '../builder/Builder';
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
        };
    }

    public build(): HTMLElement {
        const build = new Builder();
        const builder = build.createElement;

        const element = builder('aside', {
            classes: 'side',
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

        this._priceRange = new RangeElement('Price', 'priceRange', [0, 100]);
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

        this._colors = new Colors('Logo colors');
        this._colors.setChangeCallback((colors: LogoColor[]) => {
            this._currentFilters.colors.current = colors;
            this.onChange();
        });

        const filterSection = builder('section', {
            classes: ['side-item', 'filter-section'],
            content: [this._priceRange.getElement(), this._yearRange.getElement(), this._colors.getElement()],
        });

        element.append(this._resetButton, findSection, filterSection);
        return element;
    }

    public setStartFilters(filters: Filters) {
        this._currentFilters = filters;
        this._priceRange?.setMinMax(...filters.price.maxMin);
        this._priceRange?.setCurrentMinMax(...filters.price.current);

        this._yearRange?.setMinMax(...filters.year.maxMin);
        this._yearRange?.setCurrentMinMax(...filters.year.current);

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
