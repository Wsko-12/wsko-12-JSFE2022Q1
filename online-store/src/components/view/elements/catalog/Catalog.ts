import { IDataItem } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import './style.scss';

type Sort = '-' | 'alphabetA' | 'alphabetZ' | 'priceL' | 'priceH';

class Catalog {
    private _onPage: Card[] = [];
    private _element: HTMLElement | undefined;
    private _container: HTMLElement | undefined;
    private _containerClone: HTMLElement | undefined;

    private _sortSelected: Sort = '-';

    private _cache: { [key: string]: Card } = {};
    public build(): HTMLElement {
        const builder = new Builder().createElement;

        const header = builder('header', {
            classes: ['catalog__header', 'side-item'],
        });

        const sortTitle = builder('p', {
            classes: ['catalog__subtitle'],
            content: 'Sort: ',
        });
        function generateOptions(): HTMLElement[] {
            const options: [Sort, string][] = [
                ['alphabetA', 'Name: A-Z'],
                ['alphabetZ', 'Name: Z-A'],
                ['priceL', 'Price: Low-Hight'],
                ['priceH', 'Price: Hight-Low'],
            ];
            return options.map((option) => {
                return builder('option', {
                    attrs: {
                        value: option[0],
                    },
                    content: option[1],
                });
            });
        }
        const noSortOption = builder('option', {
            attrs: {
                value: '-',
            },
            content: '-',
        });
        const options = builder('select', {
            classes: ['catalog__select'],
            attrs: {
                name: 'sorting',
            },
            content: [noSortOption, ...generateOptions()],
        });
        header.append(sortTitle, options);
        options.addEventListener('change', (e: Event) => {
            const select = e.target as HTMLSelectElement;
            const value = select.options[select.selectedIndex].value;
            if (value != '-') {
                noSortOption.remove();
            }
            if (this._sortSelected === value || value === '-') return;
            this._sortSelected = select.options[select.selectedIndex].value as Sort;
            this.sortOnPageArr();
            this.sortView();
        });

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
        return element;
    }
    public fill(companiesData: IDataItem[]) {
        (this._container as HTMLElement).innerHTML = '';
        this._onPage = companiesData.map((company) => {
            if (!this._cache[company.name]) {
                this._cache[company.name] = new Card(company);
            }
            return this._cache[company.name];
        });
        this.sortOnPageArr();
        this._container?.append(...this._onPage.map((card) => card.getElement()));
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
        }

        this._onPage.sort(sortFunc);
    }
    private sortView() {
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
}
export default Catalog;
