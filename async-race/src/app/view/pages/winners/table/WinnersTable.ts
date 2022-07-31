import API from '../../../../../api/Api';
import {
    EAppPages,
    EConstants,
    EWinnersSorts,
    EWinnersSortsOrder,
    EWinnersSortsOrderChars,
} from '../../../../../typescript/enums';
import { IWinnerData } from '../../../../../typescript/interface';
import PageBuilder from '../../../../utils/PageBuilder';
import Car from '../../components/car/Car';
import Table from '../../components/table/Table';
import './style.scss';

enum ESortingContentString {
    wins = 'Wins',
    time = 'Time (s)',
}
export default class WinnersTable extends Table {
    private _addedElements = {
        menu: this.createMenu(),
    };

    private _sortOrder: EWinnersSortsOrder | null = null;

    private _sortSelected: EWinnersSorts | null = null;

    constructor() {
        super(EAppPages.winners, EConstants.WINNERS_PER_PAGE);

        this._elements.listContainer.classList.add('display');
        this._elements.list.classList.add('display__inner');

        this._elements.header.append(this._addedElements.menu.element);
        this.update();
        this.applyEvents();
    }

    public update = async () => {
        const data = await API.getWinners(this._currentPage, this._sortSelected, this._sortOrder);
        if (data) {
            this.setAllItemsCount(data.count);
            this.updatePageElement();
            this.fillList(data.winners);
        }
    };

    protected applyEvents() {
        super.applyEvents();
        const { time, wins } = this._addedElements.menu;
        time.addEventListener('click', this.handleSorting);
        wins.addEventListener('click', this.handleSorting);
    }

    private createMenu() {
        const element = <HTMLMenuElement>PageBuilder.createElement('menu', {
            classes: 'winners__menu, winners__item',
        });
        const position = <HTMLDivElement>PageBuilder.createElement('div', {
            content: 'N',
        });
        const car = <HTMLDivElement>PageBuilder.createElement('div', {
            content: 'Car',
        });

        const name = <HTMLDivElement>PageBuilder.createElement('div', {
            content: 'Name',
        });

        const wins = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'winners__menu_button button',
            content: ESortingContentString.wins,
            dataset: {
                sorting: EWinnersSorts.wins,
            },
        });

        const time = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'winners__menu_button button',
            content: ESortingContentString.time,
            dataset: {
                sorting: EWinnersSorts.time,
            },
        });

        element.append(position, car, name, wins, time);

        return {
            element,
            wins,
            time,
        };
    }

    private handleSorting = (e: MouseEvent) => {
        const target = <HTMLDivElement>e.target;
        const sorting = <EWinnersSorts>target.dataset.sorting;
        this._sortSelected = sorting;

        this._sortOrder = this._sortOrder === EWinnersSortsOrder.ASC ? EWinnersSortsOrder.DESC : EWinnersSortsOrder.ASC;
        const oppositeSorting = sorting === EWinnersSorts.wins ? EWinnersSorts.time : EWinnersSorts.wins;
        this._addedElements.menu[oppositeSorting].innerHTML = ESortingContentString[oppositeSorting];
        this._addedElements.menu[sorting].innerHTML =
            ESortingContentString[sorting] + EWinnersSortsOrderChars[this._sortOrder];

        this.update();
    };

    private fillList = async (winners: IWinnerData[]) => {
        this._elements.list.innerHTML = '';
        let place = 0;
        const elements: HTMLElement[] = [];
        for await (const winner of winners) {
            place += 1;
            let element: HTMLElement;
            if (!Car.memory[winner.id]) {
                const data = await API.getCar(winner.id);
                if (data) {
                    element = new Car(data).getWinnersElement(place, winner.wins, winner.time);
                    elements.push(element);
                }
            } else {
                element = Car.memory[winner.id].getWinnersElement(place, winner.wins, winner.time);
                elements.push(element);
            }
        }
        this._elements.list.append(...elements);
    };
}
