import { IDataItem } from '../../../../interface/interface';
class Card {
    public company: IDataItem;
    constructor(data: IDataItem) {
        this.company = data;
    }
}
export default Card;
