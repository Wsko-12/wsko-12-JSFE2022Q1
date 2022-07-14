import { CompanyCountry } from '../../../../../interface/interface';
import Builder from '../../builder/Builder';
import SettingsElement from '../settingElement/SettingsElement';
import './style.scss';
export default class County extends SettingsElement {
    private _element: HTMLElement;
    private _flagsContainer: HTMLElement;
    private _flags: { [key: string]: HTMLElement } = {};
    private _selected: CompanyCountry[] = [];

    constructor(label: string) {
        super();
        const builder = Builder.createElement;

        const title = <HTMLHeadingElement>builder('h4', {
            classes: 'country__title',
            content: label,
        });

        this._flagsContainer = <HTMLDivElement>builder('div', {
            classes: 'country__container',
        });

        this._element = <HTMLDivElement>builder('div', {
            classes: 'country',
            content: [title, this._flagsContainer],
        });

        this._flagsContainer.addEventListener('click', (e) => {
            if (e.target != this._flagsContainer && e.target instanceof HTMLElement) {
                const country = <CompanyCountry>e.target.dataset.country;
                this.applySelected(country);
            }
        });
    }

    public getElement(): HTMLElement {
        return this._element;
    }

    public fill(countries: CompanyCountry[]): void {
        this._flagsContainer.innerHTML = '';
        countries.forEach((country) => {
            this._flagsContainer.append(this.createFlagElement(country));
        });
    }

    public applySelected(selected: CompanyCountry[] | CompanyCountry): void {
        if (Array.isArray(selected)) {
            this._selected = selected;
            this.markAllSelected();
        } else {
            const index = this._selected.indexOf(selected);
            if (index === -1) {
                this._selected.push(selected);
                this._flags[selected].classList.add('country__flag_selected');
            } else {
                this._selected.splice(index, 1);
                this._flags[selected].classList.remove('country__flag_selected');
            }
            this.onChange();
        }
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
        for (const flag in this._flags) {
            const flagElement = this._flags[flag];
            flagElement.classList.remove('country__flag_selected');
        }
        this._selected.forEach((country) => {
            if (this._flags[country]) {
                this._flags[country].classList.add('country__flag_selected');
            }
        });
    }

    private createFlagElement(country: CompanyCountry): HTMLElement {
        if (this._flags[country]) return this._flags[country];
        const builder = Builder.createElement;
        const flag = <HTMLDivElement>builder('div', {
            classes: ['country__flag', 'flag', `flag_${country.toLowerCase()}`],
            dataset: {
                country,
            },
        });
        this._flags[country] = flag;
        return flag;
    }
}
