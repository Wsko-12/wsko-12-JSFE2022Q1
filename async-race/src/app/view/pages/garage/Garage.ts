import PageBuilder from '../../../utils/PageBuilder';
import Menu from './menu/Menu';
import Table from './table/Table';

export default class Garage {
    private _elements: {
        element: HTMLElement;
        menu: Menu;
        table: Table;
    };

    private selectedCarId: number | null = null;

    constructor() {
        const menu = new Menu(this.createCar, this.updateCar);
        const table = new Table();

        const element = PageBuilder.createElement('section', {
            content: [menu.getElement(), table.getElement()],
        });

        this._elements = {
            menu,
            table,
            element,
        };
    }

    private selectCar = (id: number) => {
        this.selectedCarId = id;
    };

    private updateCar = async (name: string, value: string) => {
        console.log(name, value);
        return Promise.resolve(undefined);
    };

    private createCar = async (name: string, value: string) => {
        console.log(name, value);
        return Promise.resolve(undefined);
    };

    private removeCar = async (id: number) => {
        console.log(id);
        return Promise.resolve(undefined);
    };

    public getElement() {
        return this._elements.element;
    }
}
