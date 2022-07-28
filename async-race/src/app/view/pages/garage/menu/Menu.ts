import { ERedactorActions } from '../../../../../typescript/enums';
import { ICarData } from '../../../../../typescript/interface';
import { TCarMenuEditorCallback } from '../../../../../typescript/types';
import PageBuilder from '../../../../utils/PageBuilder';
import Redactor from './redactor/Redactor';

export default class Menu {
    private _elements: {
        container: HTMLElement;
        update: Redactor;
        create: Redactor;
    };

    private _selectedCar: ICarData | null = null;

    constructor(createCar: TCarMenuEditorCallback, updateCar: TCarMenuEditorCallback) {
        const create = new Redactor(ERedactorActions.create, (name, color, clear) => {
            createCar(name, color).then(() => clear(false));
        });
        const update = new Redactor(ERedactorActions.update, (name, color, clear) => {
            updateCar(name, color).then(() => clear(true));
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

    public selectCar(car: ICarData) {
        this._selectedCar = car;

        const { update } = this._elements;
        update.setColor(car.color);
        update.setInput(car.name);

        update.disableAll(false);
    }

    public getElement() {
        return this._elements.container;
    }
}
