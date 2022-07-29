import API from '../../../../api/Api';
import { TColorHEX } from '../../../../typescript/types';
import PageBuilder from '../../../utils/PageBuilder';
import Editor from './editor/Editor';
import Table from './table/Table';

export default class Garage {
    private _elements: {
        element: HTMLElement;
    };

    private _editor: Editor;

    private _table: Table;

    private _selectedCarId: number | null = null;

    constructor() {
        this._editor = new Editor(this.createCar, this.updateCar);
        this._table = new Table(this.selectCar, this.removeCar);

        const element = PageBuilder.createElement('section', {
            content: [this._editor.getElement(), this._table.getElement()],
        });

        this._elements = {
            element,
        };
    }

    private selectCar = async (id: number) => {
        this._selectedCarId = id;
        const carData = await API.getCar(id);
        if (carData) {
            this._editor.selectCar(carData);
        }
        return Promise.resolve();
    };

    private updateCar = async (name: string, color: TColorHEX) => {
        if (this._selectedCarId) {
            const result = await API.updateCar(this._selectedCarId, {
                name,
                color,
            });
            this._table.update();
            return result;
        }
        return Promise.resolve(null);
    };

    private createCar = async (name: string, color: TColorHEX) => {
        const data = await API.createCar(name, color);
        this._table.update();
        return data;
    };

    private removeCar = async (id: number) => {
        return API.removeCar(id).then(this._table.update);
    };

    public update() {
        console.log('[Garage] update');
        this._table.update();
    }

    public getElement() {
        return this._elements.element;
    }
}
