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
    private _onSettingsChangeCallback: ((filters: Filters) => void) | null = null;
    private _onSettingsResetCallback: (() => void) | null = null;

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

    public setSettingsChangeCallback(callback: (filters: Filters) => void) {
        this._onSettingsChangeCallback = callback;
    }

    public setSettingsResetCallback(callback: () => void) {
        this._onSettingsResetCallback = callback;
    }

    public drawCards(data: IDataItem[]) {
        this.catalog.fill(data);
    }
    public setStartFilters(filter: Filters): void {
        this.settings.setStartFilters(filter);
    }

    private onChange(filters: Filters) {
        if (this._onSettingsChangeCallback) this._onSettingsChangeCallback(filters);
    }

    private onReset() {
        if (this._onSettingsResetCallback) this._onSettingsResetCallback();
    }
}
export default AppView;
