import { Filters } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import RangeElement from './range/RangeElement';
import './style.scss';

class Settings {
    private _currentFilters: Filters;
    private _callback: ((filters: Filters) => void) | null = null;
    private _priceRange: RangeElement | undefined;
    private _yearRange: RangeElement | undefined;

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
        };
    }
    public setCallback(callback: (filters: Filters) => void) {
        this._callback = callback;
    }
    public applyFilters(filters: Filters) {
        this._currentFilters = filters;
        this._priceRange?.setMinMax(...filters.price.maxMin);
        this._priceRange?.setCurrentMinMax(...filters.price.current);

        this._yearRange?.setMinMax(...filters.year.maxMin);
        this._yearRange?.setCurrentMinMax(...filters.year.current);
    }

    public build(): HTMLElement {
        const build = new Builder();
        const builder = build.createElement;

        const element = builder('aside', {
            classes: 'side',
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
        this._priceRange.applyCallback((min, max) => {
            this._currentFilters.price.current[0] = min;
            this._currentFilters.price.current[1] = max;
            this.onChange();
        });

        this._yearRange = new RangeElement('Year', 'yearRange', [0, 100]);
        this._yearRange.applyCallback((min, max) => {
            this._currentFilters.year.current[0] = min;
            this._currentFilters.year.current[1] = max;
            this.onChange();
        });

        const filterSection = builder('section', {
            classes: ['side-item', 'filter-section'],
            content: [this._priceRange.getElement(), this._yearRange.getElement()],
        });

        element.append(findSection, filterSection);
        return element;
    }

    private onChange() {
        if (this._callback) this._callback(this._currentFilters);
    }
}
export default Settings;
