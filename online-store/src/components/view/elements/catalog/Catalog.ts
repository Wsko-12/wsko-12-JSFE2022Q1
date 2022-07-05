import { IDataItem } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import './style.scss';
class Catalog {
    private _onPage: Card[] = [];
    build(): HTMLElement {
        const builder = new Builder().createElement;
        const element = builder('section', {
            classes: 'catalog',
        });
        return element;
    }
    fill(companiesData: IDataItem[]) {
        this._onPage = companiesData.map((company) => new Card(company));
    }
}
export default Catalog;
