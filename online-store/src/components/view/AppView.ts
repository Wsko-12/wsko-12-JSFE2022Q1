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
    private _onSettingsChange: ((filters: Filters) => void) | null = null;

    public build(): void {
        this.settings.setCallback((filters: Filters) => {
            this.onSettingsChange(filters);
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

    public drawCards(data: IDataItem[]) {
        this.catalog.fill(data);
    }

    private onSettingsChange(filters: Filters) {
        if (this._onSettingsChange) this._onSettingsChange(filters);
    }

    public applyFilters(filter: Filters): void {
        this.settings.applyFilters(filter);
    }

    public setOnSettingsChange(callback: (filters: Filters) => void) {
        this._onSettingsChange = callback;
    }
}
export default AppView;
