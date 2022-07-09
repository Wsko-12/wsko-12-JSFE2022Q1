import { Sort } from '../../../../../interface/interface';
import Builder from '../../builder/Builder';

export default class Sorting {
    private _element: HTMLSelectElement;
    private _noSortItem: HTMLOptionElement;

    private _onChangeCallback: ((sorting: Sort) => void) | null = null;

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

    public getElement(): HTMLElement {
        return this._element;
    }

    public clear(): void {
        this._element.prepend(this._noSortItem);
        this._noSortItem.selected = true;
    }

    public setChangeCallback(callback: (sorting: Sort) => void): void {
        this._onChangeCallback = callback;
    }

    private applyEvents(): void {
        this._element.addEventListener('change', (e: Event) => {
            const select = e.target as HTMLSelectElement;
            const value = select.options[select.selectedIndex].value;
            if (value != '-') {
                (this._noSortItem as HTMLOptionElement).remove();
            }
            this.onChange(value as Sort);
        });
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

    private onChange(value: Sort): void {
        if (this._onChangeCallback) this._onChangeCallback(value);
    }
}
