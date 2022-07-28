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
            prevButton: HTMLButtonElement;
            nextButton: HTMLButtonElement;
        };
    };

    private _callbacks: {
        [ERedactorActions.select]: TCarSelectorCallback;
        [ERedactorActions.remove]: TCarSelectorCallback;
    };

    private _currentPage = 1;

    private _allCars = 0;

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

        header.append(title, subtitle);

        const list = <HTMLUListElement>PageBuilder.createElement('ul', {
            classes: 'garage__table',
        });

        const footerButtons = this.createFooterButtons();
        const footer = <HTMLElement>PageBuilder.createElement('footer', {
            content: footerButtons,
        });

        element.append(header, list, footer);

        this._elements = {
            element,
            counter,
            page,
            list,
            footer: {
                element: footer,
                prevButton: footerButtons[0],
                nextButton: footerButtons[1],
            },
        };

        this.update();
        this.applyEvents();
    }

    public getElement() {
        return this._elements.element;
    }

    public update = async () => {
        const data = await API.getCars(this._currentPage);
        if (data) {
            this._allCars = data.count;
            this.updateCounterElement(data.count);
            this.updatePageElement();
            this.fillCarsList(data.cars);
        }
    };

    private applyEvents() {
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

    private fillCarsList(data: ICarData[]) {
        const cars = data.map((carData) => new Car(carData));
        const elements = cars.map((car) => car.getGarageElement());
        const { list } = this._elements;
        list.innerHTML = '';
        list.append(...elements);
    }

    private updateCounterElement(value: number) {
        this._elements.counter.innerHTML = `(${value})`;
    }

    private updatePageElement() {
        const next = this._elements.footer.nextButton;
        const prev = this._elements.footer.prevButton;

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

    private createFooterButtons(): [HTMLButtonElement, HTMLButtonElement] {
        const prev = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Prev',
        });
        const next = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Next',
        });

        prev.addEventListener('click', () => {
            this._currentPage -= 1;
            this.update();
        });

        next.addEventListener('click', () => {
            this._currentPage += 1;
            this.update();
        });

        return [prev, next];
    }
}
