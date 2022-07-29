import API from '../../../../../api/Api';
import { EConstants, ERedactorActions } from '../../../../../typescript/enums';
import { ICarData } from '../../../../../typescript/interface';
import { TCarSelectorCallback } from '../../../../../typescript/types';
import PageBuilder from '../../../../utils/PageBuilder';
import Car from '../../car/Car';
import './style.scss';

export default class Table {
    private _elements: {
        element: HTMLElement;
        counter: HTMLSpanElement;
        page: HTMLSpanElement;
        list: HTMLUListElement;
        footer: {
            element: HTMLElement;
            buttons: {
                prev: HTMLButtonElement;
                next: HTMLButtonElement;
            };
        };
        menu: {
            element: HTMLMenuElement;
            buttons: {
                race: HTMLButtonElement;
                reset: HTMLButtonElement;
                generate: HTMLButtonElement;
            };
        };
    };

    private _raceMode = false;

    private _callbacks: {
        [ERedactorActions.select]: TCarSelectorCallback;
        [ERedactorActions.remove]: TCarSelectorCallback;
    };

    private _currentPage = 1;

    private _allCars = 0;

    private _carsList: Car[] = [];

    constructor(selectCar: TCarSelectorCallback, removeCar: TCarSelectorCallback) {
        this._callbacks = {
            [ERedactorActions.select]: selectCar,
            [ERedactorActions.remove]: removeCar,
        };

        const element = PageBuilder.createElement('section');

        const header = PageBuilder.createElement('header');

        const counter = <HTMLSpanElement>PageBuilder.createElement('span', {});
        const title = <HTMLHeadingElement>PageBuilder.createElement('h2', {
            content: ['Garage ', counter],
        });

        const page = <HTMLSpanElement>PageBuilder.createElement('span', {});
        const subtitle = <HTMLHeadingElement>PageBuilder.createElement('h3', {
            content: ['Page ', page],
        });

        const list = <HTMLUListElement>PageBuilder.createElement('ul', {
            classes: 'garage__table',
        });

        const footer = this.createFooter();

        const menu = this.createMenu();

        header.append(menu.element, title, subtitle);

        element.append(header, list, footer.element);

        this._elements = {
            element,
            counter,
            page,
            list,
            footer,
            menu,
        };

        this.update();
        this.applyEvents();
    }

    public getElement() {
        return this._elements.element;
    }

    public update = async () => {
        console.log('[Garage Table] update');

        const data = await API.getCars(this._currentPage);
        if (data) {
            this._allCars = data.count;
            this.updateCounterElement(data.count);
            this.updatePageElement();
            this.fillCarsList(data.cars);
        }
    };

    private applyEvents() {
        this.applyFooterEvents();
        this.applyMenuEvents();
        this.applyListEvents();
    }

    private fillCarsList(data: ICarData[]) {
        const cars = data.map((carData) => new Car(carData));
        this._carsList = cars;
        const elements = cars.map((car) => car.getGarageElement());
        const { list } = this._elements;
        list.innerHTML = '';
        list.append(...elements);
    }

    private updateCounterElement(value: number) {
        this._elements.counter.innerHTML = `(${value})`;
    }

    private updatePageElement() {
        const { prev, next } = this._elements.footer.buttons;

        next.disabled = false;
        prev.disabled = false;

        if (this._currentPage === 1) {
            prev.disabled = true;
        }
        const current = this._currentPage * EConstants.CARS_PER_PAGE;
        if (current >= this._allCars) {
            next.disabled = true;
        }
        this._elements.page.innerHTML = `#${this._currentPage}`;
    }

    private createFooter() {
        const element = <HTMLElement>PageBuilder.createElement('footer');

        const prev = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Prev',
        });
        const next = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Next',
        });

        element.append(prev, next);

        return {
            element,
            buttons: {
                prev,
                next,
            },
        };
    }

    private applyFooterEvents() {
        const { prev, next } = this._elements.footer.buttons;

        prev.addEventListener('click', () => {
            this._currentPage -= 1;
            this.update();
        });

        next.addEventListener('click', () => {
            this._currentPage += 1;
            this.update();
        });
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

    private resetAll = async (e?: Event) => {
        // if user click "reset" during race, it's reset race
        // and if car wins it will be skipped
        // this was done because we use this function
        // without e arg before the start of the race
        this._raceMode = !e;
        this._elements.menu.buttons.reset.disabled = true;

        const promises = this._carsList.map((car) => car.stop());

        const allSettled = await Promise.allSettled(promises);
        if (e && e.type === 'click') {
            this._elements.menu.buttons.race.disabled = false;
            this._elements.menu.buttons.reset.disabled = false;
        }
        return allSettled;
    };

    private race = async () => {
        this._raceMode = true;
        this._elements.menu.buttons.race.disabled = true;
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
            this._elements.menu.buttons.reset.disabled = false;
        });
    };

    private showWinnerMessage(name: string, time: number) {
        this._elements.menu.buttons.race.disabled = false;
        console.log(`${name} wins ${time}`);
    }

    private applyMenuEvents() {
        const { race, reset, generate } = this._elements.menu.buttons;
        race.addEventListener('click', this.race);

        reset.addEventListener('click', this.resetAll);

        generate.addEventListener('click', this.generateCars);
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
}
