import API from '../../../../../api/Api';
import { EAppPages, EConstants } from '../../../../../typescript/enums';
import { IWinnerData } from '../../../../../typescript/interface';
import Car from '../../components/car/Car';
import Table from '../../components/table/Table';
import './style.scss';

export default class WinnersTable extends Table {
    constructor() {
        super(EAppPages.winners, EConstants.WINNERS_PER_PAGE);
        this.update();
        super.applyEvents();
    }

    public update = async () => {
        const data = await API.getWinners(this._currentPage);
        if (data) {
            this.setAllItemsCount(data.count);
            this.updatePageElement();
            this.fillList(data.winners);
        }
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
