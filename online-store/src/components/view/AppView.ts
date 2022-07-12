import Catalog from './elements/catalog/Catalog';
import Builder from './elements/builder/Builder';
import Header from './elements/header/Header';
import Settings from './elements/settings/Settings';
import './style.scss';
import { Filters, IDataItem, SettingsCallback } from '../../interface/interface';
import { Footer } from './elements/footer/Footer';
import Popup from './elements/popup/Popup';
import Basket from '../basket/Basket';

class AppView {
    private header: Header = new Header();
    private footer: Footer = new Footer();
    private settings: Settings = new Settings();
    private catalog: Catalog = new Catalog();
    private popup: Popup = new Popup();
    private basket: Basket = new Basket();

    private _onSettingsChangeCallback: SettingsCallback | null = null;

    public build(): void {
        this.basket.addOnFullListener(() => {
            this.popup.show('Sorry, all slots are full');
        });

        const builder = new Builder().createElement;

        const header: HTMLElement = this.header.getElement();

        const settings = this.settings.getElement();
        this.settings.setChangeCallback((filters: Filters, fullReset?: boolean) => {
            this.onChange(filters, fullReset);
        });

        const catalog = this.catalog.getElement();

        const container = builder('div', {
            classes: ['container'],
            content: [settings, catalog],
        });

        const main = builder('main', {
            content: [container],
        });

        const wrapper = builder('div', {
            classes: 'wrapper',
            content: [main, this.footer.getElement()],
        });

        document.body.append(header, wrapper, this.popup.getElement());
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
