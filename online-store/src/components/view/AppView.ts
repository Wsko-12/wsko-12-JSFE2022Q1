import Catalog from './elements/catalog/Catalog';
import Builder from './elements/builder/Builder';
import Header from './elements/header/Header';
import Settings from './elements/settings/Settings';
import './style.scss';
import { Filters, IDataItem } from '../../interface/interface';

class AppView {
    private header: Header = new Header();
    private settings: Settings = new Settings();
    private catalog: Catalog = new Catalog();
    private _onChangeCallback: ((filters: Filters) => void) | null = null;
    private _onResetCallback: (() => void) | null = null;

    public build(): void {
        this.settings.setChangeCallback((filters: Filters) => {
            this.onChange(filters);
        });

        this.settings.setResetCallback(() => {
            this.onReset();
        });

        const builder = new Builder().createElement;

        const header: HTMLElement = this.header.build();
        document.body.append(header);

        const settings = this.settings.build();
        const catalog = this.catalog.build();

        const container = builder('div', {
            classes: ['container'],
            content: [settings, catalog],
        });

        const main = builder('main', {
            content: [container],
        });

        document.body.append(header, main);
    }

    public setChangeCallback(callback: (filters: Filters) => void) {
        this._onChangeCallback = callback;
    }

    public setResetCallback(callback: () => void) {
        this._onResetCallback = callback;
    }

    public drawCards(data: IDataItem[]) {
        this.catalog.fill(data);
    }
    public applyFilters(filter: Filters): void {
        this.settings.applyFilters(filter);
    }

    private onChange(filters: Filters) {
        if (this._onChangeCallback) this._onChangeCallback(filters);
    }

    private onReset() {
        if (this._onResetCallback) this._onResetCallback();
    }
}
export default AppView;
