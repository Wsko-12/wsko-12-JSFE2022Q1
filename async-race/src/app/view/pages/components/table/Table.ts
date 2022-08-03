import { EErrors } from '../../../../../typescript/enums';
import PageBuilder from '../../../../utils/PageBuilder';
import './style.scss';
import {ICarData, IWinnerData} from "../../../../../typescript/interface";

export default abstract class Table<T extends ICarData | IWinnerData> {
    protected _name: string;

    protected _elements: {
        element: HTMLElement;
        counter: HTMLSpanElement;
        page: HTMLSpanElement;
        list: HTMLUListElement;
        listContainer: HTMLDivElement;
        header: HTMLElement;
        footer: {
            element: HTMLElement;
            buttons: {
                prev: HTMLButtonElement;
                next: HTMLButtonElement;
            };
        };
    };

    private _maxItemsPerPage: number;

    protected _currentPage = 1;

    private _allItemsCount = 0;

    constructor(name: string, maxCountPerPage: number) {
        this._maxItemsPerPage = maxCountPerPage;
        name = name.trim();
        this._name = name;
        const nameCapitalized = name[0].toUpperCase() + name.slice(1).toLowerCase();
        const element = PageBuilder.createElement('section', {
            classes: `${name}__section`,
        });

        const header = PageBuilder.createElement('header');

        const counter = <HTMLSpanElement>PageBuilder.createElement('span', {});
        const title = <HTMLHeadingElement>PageBuilder.createElement('h2', {
            classes: 'table__title',
            content: [`${nameCapitalized} `, counter],
        });

        const page = <HTMLSpanElement>PageBuilder.createElement('span', {});
        const subtitle = <HTMLHeadingElement>PageBuilder.createElement('h3', {
            classes: 'table__subtitle',
            content: ['Page ', page],
        });

        const list = <HTMLUListElement>PageBuilder.createElement('ul', {
            classes: `${name}__table`,
        });

        const listContainer = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: `${name}__table_container`,
            content: list,
        });

        const footer = Table.createFooter();

        header.append(title, subtitle);

        element.append(header, listContainer, footer.element);

        this._elements = {
            element,
            header,
            counter,
            list,
            listContainer,
            page,
            footer,
        };
        this.updatePageElement();
    }

    private static createFooter() {
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

    protected updatePageElement() {
        const { prev, next } = this._elements.footer.buttons;

        next.disabled = false;

        prev.disabled = this._currentPage === 1;

        const current = this._currentPage * this._maxItemsPerPage;
        if (current >= this._allItemsCount) {
            next.disabled = true;
        }
        this._elements.page.innerHTML = `#${this._currentPage}`;
    }

    protected setAllItemsCount(value: number) {
        this._allItemsCount = value;
        this._elements.counter.innerHTML = `(${value})`;
    }

    protected applyEvents() {
        this.applyFooterEvents();
    }

    protected disablePagination(flag: boolean) {
        const { prev, next } = this._elements.footer.buttons;
        prev.disabled = flag;
        next.disabled = flag;
        if (!flag) {
            this.updatePageElement();
        }
    }

    private applyFooterEvents() {
        const { prev, next } = this._elements.footer.buttons;

        prev.addEventListener('click', () => {
            this._currentPage -= 1;
            this.updatePageElement();
            this.update();
        });

        next.addEventListener('click', () => {
            this._currentPage += 1;
            this.updatePageElement();
            this.update();
        });
    }

    // ?! it's must be abstract
    // ?! Error Ts1243: 'Async' Modifier Cannot Be Used With 'Abstract'
    // no need for abstract method show that it async,
    // you can show if needed that it returns Promise<>
     public abstract update(): void;

    // ?! it's must be abstract
    // answer is simple ;) generic on class not on method
    protected abstract fillList(data: Array<T>): void;

    public getElement() {
        return this._elements.element;
    }

    protected showError() {
        this._elements.list.innerHTML = '';
        const errorMsg: string = EErrors.tableFill;
        const errorMessage = <HTMLHeadingElement>PageBuilder.createElement('h2', {
            classes: 'table__error',
            content: errorMsg,
        });
        this._elements.list.append(errorMessage);
    }
}
