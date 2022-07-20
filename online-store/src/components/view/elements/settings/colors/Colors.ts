import { EColorPalette, LogoColor } from '../../../../../interface/interface';
import { isLogoColor } from '../../../../../utils/typeguards';
import Builder from '../../builder/Builder';
import SettingsElement from '../settingElement/SettingsElement';
import './style.scss';
export default class Colors extends SettingsElement {
    private _colors: LogoColor[] = [];
    private _element: HTMLDivElement;
    private _colorsElements: { [key: string]: HTMLElement } = {};
    private _container: HTMLDivElement;
    private _selected: LogoColor[] = [];

    constructor(label: string) {
        super();
        const builder = Builder.createElement;

        const title = <HTMLHeadingElement>builder('h4', {
            classes: ['colors__title'],
            content: label,
        });

        this._container = <HTMLDivElement>builder('div', {
            classes: ['colors__container'],
            content: this.generateColorsItem(),
        });

        this._element = <HTMLDivElement>builder('div', {
            classes: ['colors'],
            content: [title, this._container],
        });
        this.applyListeners();
    }

    public getElement() {
        return this._element;
    }

    public setColors(colors: LogoColor[]): void {
        this._colors = colors;
        this.update();
    }

    public applySelected(colors: LogoColor[]): void {
        this._selected = colors;
        this.markAllSelected();
    }

    public reset(): void {
        this._selected = [];
        this.markAllSelected();
    }

    protected onChange(): void {
        if (this._onChangeCallback) {
            this._onChangeCallback(this._selected);
        }
    }

    private markAllSelected(): void {
        for (const color in this._colorsElements) {
            const element = this._colorsElements[color];
            if (isLogoColor(color)) {
                if (this._selected.indexOf(color) === -1) {
                    element.classList.remove('colors__item_selected');
                } else {
                    element.classList.add('colors__item_selected');
                }
            } else {
                console.error("[Colors] markAllSelected typeof selected color isn't a LogoColor");
            }
        }
    }

    private generateColorsItem(): HTMLElement[] {
        const builder = Builder.createElement;

        const items: HTMLElement[] = this._colors.map((color) => {
            if (this._colorsElements[color]) return this._colorsElements[color];
            const item = builder('div', {
                classes: ['colors__item'],
                dataset: {
                    color,
                },
            });
            item.style.backgroundColor = EColorPalette[color];
            this._colorsElements[color] = item;
            return item;
        });
        return items;
    }

    private update(): void {
        this._container.innerHTML = '';
        this._container.append(...this.generateColorsItem());
    }

    private applyListeners(): void {
        this._container.addEventListener('click', (e) => {
            if (e.target !== this._container && e.target instanceof HTMLElement) {
                const element = e.target;
                element.classList.toggle('colors__item_selected');
                const color = <LogoColor>element.dataset.color;
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
}
