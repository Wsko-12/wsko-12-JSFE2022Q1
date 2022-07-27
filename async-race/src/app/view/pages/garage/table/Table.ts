import API from '../../../../../api/Api';
import { EConstants } from '../../../../../typescript/enums';
import { CarData } from '../../../../../typescript/interface';
import PageBuilder from '../../../../utils/PageBuilder';

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

    private _currentPage = 1;

    private _allCars = 0;

    constructor() {
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

        const list = <HTMLUListElement>PageBuilder.createElement('ul', {});

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
    }

    public getElement() {
        return this._elements.element;
    }

    public async update() {
        const data = await API.getCars(this._currentPage);
        if (data) {
            this._allCars = data.count;
            this.updateCounterElement(data.count);
            this.updatePageElement();
            this.fillCarsList(data.cars);
        }
    }

    private createCarItem(data: CarData) {
        const container = <HTMLDivElement>PageBuilder.createElement('div', {
            content: data.name,
        });
        return container;
    }

    private fillCarsList(data: CarData[]) {
        const elements = data.map((car) => this.createCarItem(car));
        this._elements.list.append(...elements);
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
