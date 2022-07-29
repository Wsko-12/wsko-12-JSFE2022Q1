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
    }

    public update = async () => {
        const data = await API.getWinners(this._currentPage);
        if (data) {
            this.setAllItemsCount(data.count);
            this.updatePageElement();
            this.fillList(data.winners);
        }
    };

    private fillList(winners: IWinnerData[]) {
        this._elements.list.innerHTML = '';
        const elements = winners
            .filter((winner) => Car.memory[winner.id])
            .map((winner, i) => Car.memory[winner.id].getWinnersElement(i + 1, winner.wins, winner.time));
        this._elements.list.append(...elements);
    }
}
