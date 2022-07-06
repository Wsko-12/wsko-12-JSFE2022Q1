import { IDataItem } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import './style.scss';
class Catalog {
    private _onPage: Card[] = [];
    private _element: HTMLElement | undefined;
    build(): HTMLElement {
        const builder = new Builder().createElement;
        const element = builder('section', {
            classes: 'catalog',
        });
        this._element = element;
        return element;
    }
    fill(companiesData: IDataItem[]) {
        (this._element as HTMLElement).innerHTML = '';
        this._onPage = companiesData.map((company) => new Card(company));
        this._element?.append(...this._onPage.map((card) => card.getElement()));
    }
}
export default Catalog;
