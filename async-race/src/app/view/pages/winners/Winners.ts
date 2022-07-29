import PageBuilder from '../../../utils/PageBuilder';
import WinnersTable from './table/WinnersTable';

export default class Winners {
    private _elements: {
        element: HTMLElement;
    };

    private _table: WinnersTable;

    constructor() {
        const element = PageBuilder.createElement('section');
        this._table = new WinnersTable();
        element.append(this._table.getElement());

        this._elements = {
            element,
        };
    }

    public update() {
        this._table.update();
    }

    public getElement() {
        return this._elements.element;
    }
}
