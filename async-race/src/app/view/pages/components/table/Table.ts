import PageBuilder from '../../../../utils/PageBuilder';

export default abstract class Table {
    protected _name: string;

    protected _elements: {
        element: HTMLElement;
        counter: HTMLSpanElement;
        page: HTMLSpanElement;
        list: HTMLUListElement;
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
        const element = PageBuilder.createElement('section');

        const header = PageBuilder.createElement('header');

        const counter = <HTMLSpanElement>PageBuilder.createElement('span', {});
        const title = <HTMLHeadingElement>PageBuilder.createElement('h2', {
            content: [`${nameCapitalized} `, counter],
        });

        const page = <HTMLSpanElement>PageBuilder.createElement('span', {});
        const subtitle = <HTMLHeadingElement>PageBuilder.createElement('h3', {
            content: ['Page ', page],
        });

        const list = <HTMLUListElement>PageBuilder.createElement('ul', {
            classes: 'garage__table',
        });

        const footer = Table.createFooter();

        header.append(title, subtitle);

        element.append(header, list, footer.element);

        this._elements = {
            element,
            header,
            counter,
            list,
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
        prev.disabled = false;

        if (this._currentPage === 1) {
            prev.disabled = true;
        }
        const current = this._currentPage * this._maxItemsPerPage;
        if (current >= this._allItemsCount) {
            next.disabled = true;
        }
        this._elements.page.innerHTML = `#${this._currentPage}`;
    }

    protected updateCounterElement(value: number) {
        this._elements.counter.innerHTML = `(${value})`;
    }

    protected setAllItemsCount(value: number) {
        this._allItemsCount = value;
    }

    protected applyEvents() {
        this.applyFooterEvents();
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
    // Error Ts1243: 'Async' Modifier Cannot Be Used With 'Abstract'
    public update = async () => {};

    // protected abstract fillList<T>(data: T[]): void;

    public getElement() {
        return this._elements.element;
    }
}
