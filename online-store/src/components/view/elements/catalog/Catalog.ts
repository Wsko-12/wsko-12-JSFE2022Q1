import { IDataItem } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import Card from '../card/Card';
import './style.scss';

type Sort = '-' | 'alphabetA' | 'alphabetZ' | 'priceL' | 'priceH';

class Catalog {
    private _onPage: Card[] = [];
    private _element: HTMLElement | undefined;
    private _container: HTMLElement | undefined;
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

        const element = builder('section', {
            classes: 'catalog',
            content: [header, this._container],
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
        let index = 0;
        const length = this._onPage.length;
        this._container?.classList.add('catalog__container_on-sort');

        const sort = (): void => {
            if (index === length) {
                this._container?.classList.remove('catalog__container_on-sort');
                return;
            }

            const element: HTMLElement = this._onPage[index].getElement();
            element.classList.add('card_on-sort');
            setTimeout(() => {
                element.classList.remove('card_on-sort');
                element.remove();
                this._container?.append(element);
                index++;
                sort();
            }, 50);
        };
        sort();
    }
}
export default Catalog;
