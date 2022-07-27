import { TCarMenuEditorCallback } from '../../../../../typescript/types';
import PageBuilder from '../../../../utils/PageBuilder';
import Redactor from './readactor/Redactor';

export default class Menu {
    private _elements: {
        container: HTMLElement;
        update: Redactor;
        create: Redactor;
    };

    constructor(createCar: TCarMenuEditorCallback, updateCar: TCarMenuEditorCallback) {
        const create = new Redactor('Create', (name, color, clear) => {
            createCar(name, color).then(clear);
        });
        const update = new Redactor('Update', (name, color, clear) => {
            updateCar(name, color).then(clear);
        });
        update.disableAll(true);

        const container = PageBuilder.createElement('section', {
            content: [create.getElement(), update.getElement()],
        });

        this._elements = {
            container,
            create,
            update,
        };
    }

    public getElement() {
        return this._elements.container;
    }
}
