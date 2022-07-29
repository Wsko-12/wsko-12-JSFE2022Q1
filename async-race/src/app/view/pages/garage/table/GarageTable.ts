import API from '../../../../../api/Api';
import { EAppPages, EConstants, ERedactorActions } from '../../../../../typescript/enums';
import { ICarData } from '../../../../../typescript/interface';
// import { isCarData, isCarDataArr } from '../../../../../typescript/typeguards';
import { TCarSelectorCallback } from '../../../../../typescript/types';
import PageBuilder from '../../../../utils/PageBuilder';
import Car from '../../components/car/Car';
import Table from '../../components/table/Table';

// ToDO When update one car don't update all table
export default class GarageTable extends Table {
    private _callbacks: {
        [ERedactorActions.select]: TCarSelectorCallback;
        [ERedactorActions.remove]: TCarSelectorCallback;
    };

    private _raceMode = false;

    private _addedElements: {
        menu: {
            element: HTMLMenuElement;
            buttons: {
                race: HTMLButtonElement;
                reset: HTMLButtonElement;
                generate: HTMLButtonElement;
            };
        };
    };

    private _carsList: Car[] = [];

    constructor(selectCar: TCarSelectorCallback, removeCar: TCarSelectorCallback) {
        super(EAppPages.garage, EConstants.CARS_PER_PAGE);

        this._callbacks = {
            [ERedactorActions.select]: selectCar,
            [ERedactorActions.remove]: removeCar,
        };

        const menu = this.createMenu();

        this._elements.header.prepend(menu.element);
        this._addedElements = {
            menu,
        };
        this.applyEvents();
        this.update();
    }

    private createMenu() {
        const element = <HTMLMenuElement>PageBuilder.createElement('menu');

        const race = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Race',
        });

        const reset = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Reset',
        });

        const generate = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Generate',
        });

        element.append(race, reset, generate);

        return {
            element,
            buttons: {
                race,
                reset,
                generate,
            },
        };
    }

    protected applyEvents() {
        super.applyEvents();
        this.applyMenuEvents();
        this.applyListEvents();
    }

    private race = async () => {
        // !! ToFix: disable race when we don't have cars
        this._raceMode = true;
        this._addedElements.menu.buttons.race.disabled = true;
        await this.resetAll();
        let winner = true;
        const raceCallback = (name: string, time: number) => {
            if (winner) {
                winner = false;
                if (this._raceMode) {
                    this.showWinnerMessage(name, time);
                    return true;
                }
            }
            return winner;
        };

        const promises = this._carsList.map((car) => {
            return car.startEngine(raceCallback);
        });
        Promise.allSettled(promises).then(() => {
            this._addedElements.menu.buttons.reset.disabled = false;
        });
    };

    private resetAll = async (e?: Event) => {
        // if user click "reset" during race, it's reset race
        // and if car wins it will be skipped
        // this was done because we use this function
        // without e arg before the start of the race
        this._raceMode = !e;
        const { reset, race } = this._addedElements.menu.buttons;

        reset.disabled = true;

        const promises = this._carsList.map((car) => car.stop());

        const allSettled = await Promise.allSettled(promises);
        if (e && e.type === 'click') {
            race.disabled = false;
            reset.disabled = false;
        }
        return allSettled;
    };

    private showWinnerMessage(name: string, time: number) {
        this._addedElements.menu.buttons.race.disabled = false;
        console.log(`${name} wins ${time}`);
    }

    private generateCars = () => {};

    private applyListEvents() {
        const { list } = this._elements;
        list.addEventListener('click', (e) => {
            if (e.target && e.target instanceof HTMLElement) {
                const { dataset } = e.target;
                if (dataset.button === 'true' && dataset.type === 'edit') {
                    const { action } = dataset;
                    const carItem = <HTMLElement>e.target.closest('.car-item');
                    if (action && carItem && carItem.dataset.carId) {
                        const { carId } = carItem.dataset;
                        const carIdNumber = +carId;
                        if (Number.isNaN(carIdNumber)) {
                            return;
                        }
                        switch (action) {
                            case ERedactorActions.remove:
                                this._callbacks.remove(carIdNumber);
                                break;
                            case ERedactorActions.select:
                                this._callbacks.select(carIdNumber);
                                break;
                            default:
                        }
                    }
                }
            }
        });
    }

    private applyMenuEvents() {
        const { race, reset, generate } = this._addedElements.menu.buttons;
        race.addEventListener('click', this.race);

        reset.addEventListener('click', this.resetAll);

        generate.addEventListener('click', this.generateCars);
    }

    public update = async () => {
        console.log('[Garage Table] update');

        const data = await API.getCars(this._currentPage);
        if (data) {
            this.setAllItemsCount(data.count);
            this.updatePageElement();
            this.fillList(data.cars);
        }
    };

    // ?! How to make it using abstract method
    // private fillList<T>(data: T[]) {
    // /* // ?! Why this typeguard don't works */
    //     if (isCarDataArr(data)) {
    //     const cars = data.map((carData) => {
    //         if (isCarData(carData)) {
    //             return new Car(carData);
    //         }
    //     });

    /* //?! Second way */
    //     const filtered = data.filter(isCarData);
    //     const cars = filtered.map((carData) => new Car(carData));

    //     this._carsList = cars;
    //     const elements = cars.map((car) => car.getGarageElement());
    //     const { list } = this._elements;
    //     list.innerHTML = '';
    //     list.append(...elements);
    // }

    private fillList(data: ICarData[]) {
        const cars = data.map((carData) => {
            return new Car(carData);
        });
        this._carsList = cars;
        const elements = cars.map((car) => car.getGarageElement());
        const { list } = this._elements;
        list.innerHTML = '';
        list.append(...elements);
    }
}
