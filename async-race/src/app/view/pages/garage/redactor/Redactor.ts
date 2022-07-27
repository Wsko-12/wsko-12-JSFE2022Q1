import PageBuilder from '../../../../utils/PageBuilder';

export default class Redactor {
    private _elements: {
        container: HTMLElement;
    };

    constructor() {
        const container = PageBuilder.createElement('section');
        this._elements = {
            container,
        };
    }

    public getElement() {
        return this._elements.container;
    }
}
