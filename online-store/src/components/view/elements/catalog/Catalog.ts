import { IDataItem, Sort } from '../../../../interface/interface';
import Basket from '../../../basket/Basket';
import LocalStorage from '../../../localStorage/LocalStorage';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import SortingElement from './sortingElement/SortingElement';
import './style.scss';

class Catalog {
    private _onPage: Card[] = [];
    private _element: HTMLElement | undefined;
    private _container: HTMLElement | undefined;
    private _containerClone: HTMLElement | undefined;
    private _localStorage: LocalStorage = new LocalStorage();
    private _basket: Basket = new Basket();
    private _sortingElement: SortingElement | undefined;

    private _sortSelected: Sort = '-';

    private _cache: { [key: string]: Card } = {};

    public build(): HTMLElement {
        this._sortSelected = (this._localStorage.getSorting() as Sort) || '-';

        const builder = new Builder().createElement;

        const header = builder('header', {
            classes: ['catalog__header', 'side-item'],
        });

        const sortTitle = builder('p', {
            classes: ['catalog__subtitle'],
            content: 'Sort: ',
        });

        this._sortingElement = new SortingElement();
        this._sortingElement.setChangeCallback((value: Sort) => {
            if (this._sortSelected === value || value === '-') return;
            this._sortSelected = value;
            this._localStorage.saveSorting(value);
            this.sortOnPageArr();
            this.sortView();
        });

        header.append(sortTitle, this._sortingElement.getElement());

        this._container = builder('div', {
            classes: 'catalog__container',
        });
        this._containerClone = builder('div', {
            classes: ['catalog__container', 'catalog__container_clone'],
        });

        const element = builder('section', {
            classes: 'catalog',
            content: [header, this._container, this._containerClone],
        });

        this._element = element;
        this.applyEvents();
        return element;
    }

    public fill(companiesData: IDataItem[]): void {
        (this._container as HTMLElement).innerHTML = '';
        this._onPage = companiesData.map((company) => {
            if (!this._cache[company.name]) {
                this._cache[company.name] = new Card(company);
            }
            this._cache[company.name].markInBasket(this._basket.has(company.name));
            return this._cache[company.name];
        });
        this.sortOnPageArr();
        this._container?.append(...this._onPage.map((card) => card.getElement()));
    }

    public clear(): void {
        this._sortSelected = '-';
        this._sortingElement?.clear();
        for (const card in this._cache) {
            this._cache[card].getElement().style.order = '';
        }
    }

    private sortOnPageArr(): void {
        if (this._sortSelected === '-') return;
        let sortFunc: (a: Card, b: Card) => number = () => 0;
        if (this._sortSelected === 'alphabetA' || this._sortSelected === 'alphabetZ') {
            sortFunc = (a: Card, b: Card) => {
                const aName = a.company.name.toLowerCase().trim();
                const bName = b.company.name.toLowerCase().trim();
                if (this._sortSelected === 'alphabetA') {
                    return aName < bName ? -1 : aName > bName ? 1 : 0;
                } else {
                    return aName > bName ? -1 : aName < bName ? 1 : 0;
                }
            };
        } else if (this._sortSelected === 'priceL' || this._sortSelected === 'priceH') {
            sortFunc = (a: Card, b: Card) => {
                const aPrice = a.company.price - a.company.price * (a.company.discount / 100);
                const bPrice = b.company.price - b.company.price * (b.company.discount / 100);
                if (this._sortSelected === 'priceL') {
                    return aPrice - bPrice;
                } else {
                    return bPrice - aPrice;
                }
            };
        } else if (this._sortSelected === 'employeeL' || this._sortSelected === 'employeeH') {
            sortFunc = (a: Card, b: Card) => {
                const aEmployees = a.company.employees;
                const bEmployees = b.company.employees;
                if (this._sortSelected === 'employeeL') {
                    return aEmployees - bEmployees;
                } else {
                    return bEmployees - aEmployees;
                }
            };
        } else if (this._sortSelected === 'yearL' || this._sortSelected === 'yearH') {
            sortFunc = (a: Card, b: Card) => {
                const aYear = a.company.year;
                const bYear = b.company.year;
                if (this._sortSelected === 'yearL') {
                    return bYear - aYear;
                } else {
                    return aYear - bYear;
                }
            };
        }

        this._onPage.sort(sortFunc);
    }

    private sortView(): void {
        (this._container as HTMLElement).classList.add('catalog__container_on-sort');
        (this._containerClone as HTMLElement).innerHTML = (this._container as HTMLElement).innerHTML;
        const containerRect = (this._container as HTMLElement).getBoundingClientRect();
        const positionsBeforeSort: [x: number, y: number][] = [];
        const positionsAfterSort: [x: number, y: number][] = [];

        (this._container as HTMLElement).style.width = containerRect.width + 'px';

        this._container?.childNodes.forEach((child) => {
            const rect = (child as HTMLElement).getBoundingClientRect();
            positionsBeforeSort.push([rect.x - containerRect.x, rect.y - containerRect.y]);
        });

        this._onPage.forEach((card: Card, i: number) => {
            const cardElement = card.getElement();
            cardElement.style.order = i + '';
        });

        setTimeout(() => {
            (this._containerClone as HTMLElement).innerHTML = '';
            this._container?.childNodes.forEach((child, i) => {
                const rect = (child as HTMLElement).getBoundingClientRect();
                positionsAfterSort.push([rect.x - containerRect.x, rect.y - containerRect.y]);
                setTimeout(() => {
                    (this._container as HTMLElement).classList.remove('catalog__container_on-sort');

                    (child as HTMLElement).style.position = 'absolute';
                    (child as HTMLElement).style.top = positionsBeforeSort[i][1] + 'px';
                    (child as HTMLElement).style.left = positionsBeforeSort[i][0] + 'px';
                    (child as HTMLElement).style.transitionDuration = '0.5s';
                    setTimeout(() => {
                        (child as HTMLElement).style.top = positionsAfterSort[i][1] + 'px';
                        (child as HTMLElement).style.left = positionsAfterSort[i][0] + 'px';

                        setTimeout(() => {
                            (this._container as HTMLElement).style.width = '';

                            (child as HTMLElement).style.position = '';
                            (child as HTMLElement).style.top = '';
                            (child as HTMLElement).style.left = '';
                            (child as HTMLElement).style.transitionDuration = '';
                        }, 500);
                    }, 10);
                }, 10);
            });
        }, 200);
    }

    private applyEvents(): void {
        this._container?.addEventListener('click', (e: MouseEvent) => {
            if (e.target != this._container) {
                const element = (e.target as HTMLElement).closest('.card') as HTMLElement;
                const company = element.dataset.company as string;
                const card = this._cache[company] as Card;
                const inBasket = this._basket.toggle(company);
                card.markInBasket(inBasket);
            }
        });
    }
}
export default Catalog;
