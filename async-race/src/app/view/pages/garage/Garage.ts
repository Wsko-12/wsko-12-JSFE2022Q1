import PageBuilder from '../../../utils/PageBuilder';
import Redactor from './redactor/Redactor';
import Table from './table/Table';

export default class Garage {
    private _elements: {
        element: HTMLElement;
        redactor: Redactor;
        table: Table;
    };

    constructor() {
        const redactor = new Redactor();
        const table = new Table();

        const element = PageBuilder.createElement('section', {
            content: [redactor.getElement(), table.getElement()],
        });

        this._elements = {
            redactor,
            table,
            element,
        };
    }

    getElement() {
        return this._elements.element;
    }
}
