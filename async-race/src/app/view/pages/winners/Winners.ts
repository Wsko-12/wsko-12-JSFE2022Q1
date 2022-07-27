import PageBuilder from '../../../utils/PageBuilder';

export default class Winners {
    private _elements: {
        element: HTMLElement;
    };

    constructor() {
        const element = PageBuilder.createElement('section');

        this._elements = {
            element,
        };
    }

    getElement() {
        return this._elements.element;
    }
}
