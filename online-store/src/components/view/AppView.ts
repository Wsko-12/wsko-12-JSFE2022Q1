import Catalog from './elements/catalog/Catalog';
import Builder from './elements/builder/Builder';
import Header from './elements/header/Header';
import Settings from './elements/settings/Settings';
import './style.scss';
import { IDataItem } from '../../interface/interface';

class AppView {
    private header: Header = new Header();
    private settings: Settings = new Settings();
    private catalog: Catalog = new Catalog();

    build(): void {
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

    drawCards(data: IDataItem[]) {
        this.catalog.fill(data);
    }
}
export default AppView;
