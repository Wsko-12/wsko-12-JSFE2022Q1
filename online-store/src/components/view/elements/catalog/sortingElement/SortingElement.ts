import Builder from '../../builder/Builder';

export default class Sorting {
    private _element: HTMLSelectElement;
    private _noSortItem: HTMLOptionElement;

    private _onChangeCallback: ((sorting: string) => void) | null = null;

    constructor(selected?: string) {
        const builder = new Builder().createElement;
        this._noSortItem = <HTMLOptionElement>builder('option', {
            attrs: {
                value: '-',
            },
            content: '-',
        });

        this._element = <HTMLSelectElement>builder('select', {
            classes: ['catalog__select'],
            attrs: {
                name: 'sorting',
            },
            content: !selected ? [this._noSortItem, ...this.generateOptions(selected)] : this.generateOptions(selected),
        });

        this.applyEvents();
    }

    public getElement(): HTMLElement {
        return this._element;
    }

    public clear(): void {
        this._element.prepend(this._noSortItem);
        this._noSortItem.selected = true;
    }

    public setChangeCallback(callback: (sorting: string) => void): void {
        this._onChangeCallback = callback;
    }

    private applyEvents(): void {
        this._element.addEventListener('change', (e: Event) => {
            if (e.target && e.target instanceof HTMLSelectElement) {
                const select = e.target;
                const value = select.options[select.selectedIndex].value;
                if (value != '-') {
                    this._noSortItem.remove();
                }
                this.onChange(value);
            }
        });
    }

    private generateOptions(selected?: string): HTMLElement[] {
        const builder = new Builder().createElement;
        const options: [string, string][] = [
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
            const element = <HTMLOptionElement>builder('option', {
                attrs: {
                    value: option[0],
                },
                content: option[1],
            });
            element.selected = selected === option[0];
            return element;
        });
    }

    private onChange(value: string): void {
        if (this._onChangeCallback) this._onChangeCallback(value);
    }
}
