import PageBuilder from '../../../../utils/PageBuilder';

export default class Table {
    private _elements: {
        element: HTMLElement;
    };

    constructor() {
        const element = PageBuilder.createElement('section');
        this._elements = {
            element,
        };
    }

    public getElement() {
        return this._elements.element;
    }
}
