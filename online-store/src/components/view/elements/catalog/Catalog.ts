import { IDataItem, TArraySortCallback } from '../../../../interface/interface';
import Basket from '../../../basket/Basket';
import LocalStorage from '../../../localStorage/LocalStorage';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import SortingElement from './sortingElement/SortingElement';
import './style.scss';

class Catalog {
    private _onPage: Card[] = [];
    private _localStorage = new LocalStorage();
    private _basket = new Basket();

    private readonly _element: HTMLElement;
    private readonly _container: HTMLDivElement;
    private readonly _containerClone: HTMLDivElement;
    private _sortingElement: SortingElement;

    private _sortSelected = '-';

    private _cache: { [key: string]: Card } = {};

    constructor() {
        this._sortSelected = this._localStorage.getSorting() || '-';

        const builder = Builder.createElement;

        const header = <HTMLElement>builder('header', {
            classes: ['catalog__header', 'side-item'],
        });

        const sortTitle = <HTMLParagraphElement>builder('p', {
            classes: ['catalog__subtitle'],
            content: 'Sort: ',
        });

        const sortingSaved = this._localStorage.getSorting();
        this._sortingElement = new SortingElement(sortingSaved || undefined);
        this._sortingElement.setChangeCallback((value: string) => {
            if (this._sortSelected === value || value === '-') return;
            this._sortSelected = value;
            this._localStorage.saveSorting(value);
            this.sortOnPageArr();
            this.sortView();
        });

        header.append(sortTitle, this._sortingElement.getElement());

        this._container = <HTMLDivElement>builder('div', {
            classes: 'catalog__container',
        });
        this._containerClone = <HTMLDivElement>builder('div', {
            classes: ['catalog__container', 'catalog__container_clone'],
        });

        this._element = <HTMLElement>builder('section', {
            classes: 'catalog',
            content: [header, this._container, this._containerClone],
        });
        this.applyEvents();
    }

    public getElement() {
        return this._element;
    }

    public fill(companiesData: IDataItem[]): void {
        this._container.innerHTML = '';

        this._onPage = companiesData.map((company) => {
            if (!this._cache[company.name]) {
                this._cache[company.name] = new Card(company);
            }
            this._cache[company.name].markInBasket(this._basket.has(company.name));
            return this._cache[company.name];
        });

        if (!companiesData.length) {
            const message = <HTMLParagraphElement>Builder.createElement('p', {
                classes: 'catalog__message',
                content: 'Sorry, no matches found :(',
            });
            this._container.append(message);

            return;
        }
        this.sortOnPageArr();
        this._container.append(...this._onPage.map((card) => card.getElement()));
    }

    public clear(): void {
        this._sortSelected = '-';
        this._sortingElement?.clear();
        for (const card in this._cache) {
            this._cache[card].getElement().style.order = '';
        }
    }

    private getSortFunction(sorting: string): TArraySortCallback<Card> {
        if (sorting.includes('alphabet')) {
            return (a, b) => {
                const aName = a.company.name.toLowerCase().trim();
                const bName = b.company.name.toLowerCase().trim();
                if (sorting === 'alphabetA') {
                    return aName < bName ? -1 : aName > bName ? 1 : 0;
                } else {
                    return aName > bName ? -1 : aName < bName ? 1 : 0;
                }
            };
        } else if (sorting.includes('price')) {
            return (a, b) => {
                const aPrice = a.company.price - a.company.price * (a.company.discount / 100);
                const bPrice = b.company.price - b.company.price * (b.company.discount / 100);
                if (sorting === 'priceL') {
                    return aPrice - bPrice;
                } else {
                    return bPrice - aPrice;
                }
            };
        } else if (sorting.includes('employee')) {
            return (a, b) => {
                const aEmployees = a.company.employees;
                const bEmployees = b.company.employees;
                if (sorting === 'employeeL') {
                    return aEmployees - bEmployees;
                } else {
                    return bEmployees - aEmployees;
                }
            };
        } else if (sorting.includes('year')) {
            return (a, b) => {
                const aYear = a.company.year;
                const bYear = b.company.year;
                if (sorting === 'yearL') {
                    return bYear - aYear;
                } else {
                    return aYear - bYear;
                }
            };
        }
        return () => 0;
    }

    private sortOnPageArr(): void {
        if (this._sortSelected === '-') return;
        const sortFunc = this.getSortFunction(this._sortSelected);
        this._onPage.sort(sortFunc);
    }

    private sortView(): void {
        this._container.classList.add('catalog__container_on-sort');
        this._containerClone.innerHTML = this._container.innerHTML;
        const containerRect = this._container.getBoundingClientRect();
        const positionsBeforeSort: [x: number, y: number][] = [];
        const positionsAfterSort: [x: number, y: number][] = [];

        this._container.style.width = containerRect.width + 'px';
        this._container.style.height = containerRect.height + 'px';

        const cardsCollection = this._container.children;

        Array.prototype.forEach.call(cardsCollection, (child: HTMLElement) => {
            const rect = child.getBoundingClientRect();
            positionsBeforeSort.push([rect.x - containerRect.x, rect.y - containerRect.y]);
        });

        this._onPage.forEach((card, i) => {
            const cardElement = card.getElement();
            cardElement.style.order = i + '';
        });

        setTimeout(() => {
            this._containerClone.innerHTML = '';

            Array.prototype.forEach.call(cardsCollection, (child: HTMLElement, i) => {
                const rect = child.getBoundingClientRect();
                positionsAfterSort.push([rect.x - containerRect.x, rect.y - containerRect.y]);
                setTimeout(() => {
                    this._container.classList.remove('catalog__container_on-sort');

                    child.style.position = 'absolute';
                    child.style.top = positionsBeforeSort[i][1] + 'px';
                    child.style.left = positionsBeforeSort[i][0] + 'px';
                    child.style.transitionDuration = '0.5s';
                    setTimeout(() => {
                        child.style.top = positionsAfterSort[i][1] + 'px';
                        child.style.left = positionsAfterSort[i][0] + 'px';

                        setTimeout(() => {
                            this._container.style.width = '';
                            this._container.style.height = '';

                            child.style.position = '';
                            child.style.top = '';
                            child.style.left = '';
                            child.style.transitionDuration = '';
                        }, 500);
                    }, 20);
                }, 10);
            });
        }, 300);
    }

    private applyEvents(): void {
        this._container.addEventListener('click', (e) => {
            if (e.target != this._container && e.target instanceof HTMLElement) {
                const element = <HTMLElement>e.target.closest('.card');
                if (element != null) {
                    const company = element.dataset.company;
                    if (company) {
                        const card = this._cache[company];
                        const inBasket = this._basket.toggle(company);
                        card.markInBasket(inBasket);
                    }
                }
            }
        });
    }
}
export default Catalog;
