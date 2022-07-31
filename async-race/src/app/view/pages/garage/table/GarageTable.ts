import API from '../../../../../api/Api';
import { EAppPages, EConstants, ERedactorActions } from '../../../../../typescript/enums';
import { ICarData } from '../../../../../typescript/interface';
// import { isCarData, isCarDataArr } from '../../../../../typescript/typeguards';
import { TCarSelectorCallback } from '../../../../../typescript/types';
import PageBuilder from '../../../../utils/PageBuilder';
import Utils from '../../../../utils/utils';
import Car from '../../components/car/Car';
import Table from '../../components/table/Table';
import './style.scss';

// ToDO When update one car don't update all table

export default class GarageTable extends Table {
    private _callbacks: {
        [ERedactorActions.select]: TCarSelectorCallback;
        [ERedactorActions.remove]: TCarSelectorCallback;
    };

    private _raceMode = false;

    private _addedElements = {
        menu: this.createMenu(),
        popUp: this.createPopUpElement(),
    };

    private _carsList: Car[] = [];

    constructor(selectCar: TCarSelectorCallback, removeCar: TCarSelectorCallback) {
        super(EAppPages.garage, EConstants.CARS_PER_PAGE);

        this._callbacks = {
            [ERedactorActions.select]: selectCar,
            [ERedactorActions.remove]: removeCar,
        };

        this._elements.header.prepend(this._addedElements.menu.element);
        this._elements.element.append(this._addedElements.popUp.element);

        this.applyEvents();
        this.update();
    }

    private createMenu() {
        const element = <HTMLMenuElement>PageBuilder.createElement('menu', {
            classes: 'garage-menu',
        });

        const race = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button garage-menu__button garage-menu__button_race',
            content: 'Race',
        });

        const reset = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button garage-menu__button',
            content: 'Reset',
        });

        const generate = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button garage-menu__button',
            content: `Generate${EConstants.CARS_GENERATOR}`,
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

    private showPopUp(flag: boolean, carName?: string, sec?: number) {
        const { element, name, time } = this._addedElements.popUp;

        if (!flag) {
            element.style.display = 'none';
        } else if (carName && sec) {
            name.innerHTML = carName;
            time.innerHTML = sec.toString();

            element.style.display = 'block';

            setTimeout(() => {
                this.showPopUp(false);
            }, EConstants.POP_UP_SHOW_TIME);
        }
    }

    private createPopUpElement() {
        const name = <HTMLSpanElement>PageBuilder.createElement('span');
        const time = <HTMLSpanElement>PageBuilder.createElement('span');

        const inner = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'display__inner garage__popup_display',
            content: [`Winner: `, name, ' time: ', time, 's'],
        });

        const container = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'display',
            content: inner,
        });

        const element = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'garage__popup',
            content: container,
        });

        return {
            element,
            name,
            time,
        };
    }

    private race = async () => {
        if (this._carsList.length === 0) {
            return;
        }

        this.disablePagination(true);
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
            this.disablePagination(false);
        });
    };

    private resetAll = async (e?: Event) => {
        // if user click "reset" during race, it's reset race
        // and if car wins it will be skipped
        // this was done because we use this function
        // without e arg before the start of the race
        this._raceMode = !e;
        this.showPopUp(false);
        this.disableMenuButtons(true);
        const promises = this._carsList.map((car) => car.stop());

        const allSettled = await Promise.allSettled(promises);
        if (e && e.type === 'click') {
            this.disableMenuButtons(false);
        }
        return allSettled;
    };

    private showWinnerMessage(name: string, time: number) {
        this.disableMenuButtons(false);
        this.showPopUp(true, name, Utils.msToSec(time));
    }

    private generateCars = async () => {
        const { generate } = this._addedElements.menu.buttons;
        generate.disabled = true;

        const promises = [];
        for (let i = 0; i < EConstants.CARS_GENERATOR; i += 1) {
            const name = Utils.generateCarName();
            const color = Utils.generateHEXColor();
            const promise = API.createCar(name, color);
            promises.push(promise);
        }

        await Promise.allSettled(promises);

        generate.disabled = false;
        this.update();
    };

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

    private disableMenuButtons(flag: boolean) {
        const { race, reset, generate } = this._addedElements.menu.buttons;
        race.disabled = flag;
        reset.disabled = flag;
        generate.disabled = flag;
    }

    public update = async () => {
        const data = await API.getCars(this._currentPage);
        if (data) {
            this.disableMenuButtons(false);
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
