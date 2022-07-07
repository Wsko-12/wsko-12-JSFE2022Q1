import { ColorPalette, LogoColor } from '../../../../../interface/interface';
import Builder from '../../builder/Builder';
import './style.scss';
type Callback = (colors: LogoColor[]) => void;
export default class Colors {
    private _onChangeCallback: Callback | undefined;
    private _colors: LogoColor[] = [];
    private _element: HTMLElement;
    private _container: HTMLElement;
    private _selected: LogoColor[] = [];
    constructor(label: string) {
        const builder = new Builder().createElement;

        const title = builder('h4', {
            classes: ['colors__title'],
            content: label,
        });

        this._container = builder('div', {
            classes: ['colors__container'],
            content: this.generateColorsItem(),
        });

        this._element = builder('div', {
            classes: ['colors'],
            content: [title, this._container],
        });
        this.applyListeners();
    }

    public getElement(): HTMLElement {
        return this._element;
    }
    public setColors(colors: LogoColor[]): void {
        this._colors = colors;
        this.update();
    }

    public setChangeCallback(callback: Callback) {
        this._onChangeCallback = callback;
    }

    private generateColorsItem(): HTMLElement[] {
        const builder = new Builder().createElement;

        const items: HTMLElement[] = this._colors.map((color) => {
            const item = builder('div', {
                classes: ['colors__item'],
                dataset: {
                    color,
                },
            });
            item.style.backgroundColor = ColorPalette[color];
            return item;
        });
        return items;
    }

    private update(): void {
        this._container.innerHTML = '';
        this._container.append(...this.generateColorsItem());
    }

    private applyListeners() {
        this._container.addEventListener('click', (e) => {
            if (e.target !== this._container) {
                const element = e.target as HTMLElement;
                element.classList.toggle('colors__item_selected');
                const color = element.dataset.color as LogoColor;
                const index = this._selected.indexOf(color);
                if (index === -1) {
                    this._selected.push(color);
                } else {
                    this._selected.splice(index, 1);
                }
                this.onChange();
            }
        });
    }

    private onChange() {
        if (this._onChangeCallback) {
            this._onChangeCallback(this._selected);
        }
    }
}
