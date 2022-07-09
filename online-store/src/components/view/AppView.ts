import Catalog from './elements/catalog/Catalog';
import Builder from './elements/builder/Builder';
import Header from './elements/header/Header';
import Settings from './elements/settings/Settings';
import './style.scss';
import { Filters, IDataItem, SettingsCallback } from '../../interface/interface';

class AppView {
    private header: Header = new Header();
    private settings: Settings = new Settings();
    private catalog: Catalog = new Catalog();
    private _onSettingsChangeCallback: SettingsCallback | null = null;

    public build(): void {
        this.settings.setChangeCallback((filters: Filters, fullReset?: boolean) => {
            this.onChange(filters, fullReset);
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
        (document.querySelector('#searchInput') as HTMLElement).focus();
    }

    public clear(): void {
        this.catalog.clear();
    }

    public setSettingsChangeCallback(callback: SettingsCallback): void {
        this._onSettingsChangeCallback = callback;
    }

    public drawCards(data: IDataItem[]): void {
        this.catalog.fill(data);
    }

    public setFilters(filter: Filters): void {
        this.settings.setFilters(filter);
    }

    private onChange(filters: Filters, fullReset?: boolean): void {
        if (this._onSettingsChangeCallback) this._onSettingsChangeCallback(filters, fullReset);
    }
}
export default AppView;
