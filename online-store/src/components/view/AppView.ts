import Catalog from './elements/catalog/Catalog';
import Builder from './elements/builder/Builder';
import Header from './elements/header/Header';
import Settings from './elements/settings/Settings';
import './style.scss';
import { IFilters, IDataItem, SettingsCallback } from '../../interface/interface';
import { Footer } from './elements/footer/Footer';
import Popup from './elements/popup/Popup';
import Basket from '../basket/Basket';

class AppView {
    private header = new Header();
    private footer = new Footer();
    private settings = new Settings();
    private catalog = new Catalog();
    private popup = new Popup();
    private basket = new Basket();

    private _onSettingsChangeCallback: SettingsCallback | null = null;

    public build(): void {
        this.basket.addOnFullListener(() => {
            this.popup.show('Sorry, all slots are full');
        });

        const builder = Builder.createElement;

        const header = this.header.getElement();

        const settings = this.settings.getElement();
        this.settings.setChangeCallback((filters: IFilters, fullReset?: boolean) => {
            this.onChange(filters, fullReset);
        });

        const catalog = this.catalog.getElement();

        const container = <HTMLDivElement>builder('div', {
            classes: ['container'],
            content: [settings, catalog],
        });

        const main = <HTMLElement>builder('main', {
            content: [container],
        });

        const wrapper = <HTMLDivElement>builder('div', {
            classes: 'wrapper',
            content: [main, this.footer.getElement()],
        });

        document.body.append(header, wrapper, this.popup.getElement());

        const searchInput = document.querySelector('#searchInput');
        if (searchInput && searchInput instanceof HTMLElement) {
            searchInput.focus();
        }
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

    public setFilters(filter: IFilters): void {
        this.settings.setFilters(filter);
    }

    private onChange(filters: IFilters, fullReset?: boolean): void {
        if (this._onSettingsChangeCallback) this._onSettingsChangeCallback(filters, fullReset);
    }
}
export default AppView;
