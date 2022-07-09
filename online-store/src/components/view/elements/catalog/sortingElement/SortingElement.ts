import { Sort } from '../../../../../interface/interface';
import Builder from '../../builder/Builder';

export default class Sorting {
    private _onChangeCallback: ((sorting: Sort) => void) | null = null;
    private _element: HTMLSelectElement;
    private _noSortItem: HTMLOptionElement;
    constructor(selected?: Sort) {
        const builder = new Builder().createElement;
        this._noSortItem = builder('option', {
            attrs: {
                value: '-',
            },
            content: '-',
        }) as HTMLOptionElement;

        this._element = builder('select', {
            classes: ['catalog__select'],
            attrs: {
                name: 'sorting',
            },
            content: selected ? [this._noSortItem, ...this.generateOptions(selected)] : this.generateOptions(selected),
        }) as HTMLSelectElement;

        this.applyEvents();
    }

    private generateOptions(selected?: Sort): HTMLElement[] {
        const builder = new Builder().createElement;
        const options: [Sort, string][] = [
            ['alphabetA', 'Name: A-Z'],
            ['alphabetZ', 'Name: Z-A'],
            ['yearL', 'Year: Young-Old'],
            ['yearH', 'Year: Old-Young'],
            ['priceL', 'Price: Low-Hight'],
            ['priceH', 'Price: Hight-Low'],
            ['employeeL', 'Employee: Less-More'],
            ['employeeH', 'Employee: More-Less'],
        ];
        return options.map((option) => {
            const element = builder('option', {
                attrs: {
                    value: option[0],
                },
                content: option[1],
            }) as HTMLOptionElement;
            element.selected = selected === option[0];
            return element;
        });
    }

    public getElement(): HTMLElement {
        return this._element;
    }

    public clear() {
        this._element.prepend(this._noSortItem);
        this._noSortItem.selected = true;
    }
    applyEvents() {
        this._element.addEventListener('change', (e: Event) => {
            const select = e.target as HTMLSelectElement;
            const value = select.options[select.selectedIndex].value;
            if (value != '-') {
                (this._noSortItem as HTMLOptionElement).remove();
            }
            this.onChange(value as Sort);
        });
    }

    public setChangeCallback(callback: (sorting: Sort) => void) {
        this._onChangeCallback = callback;
    }

    private onChange(value: Sort) {
        if (this._onChangeCallback) this._onChangeCallback(value);
    }
}
