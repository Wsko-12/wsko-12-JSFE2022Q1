import companiesData from '../../data/data';
import { IDataItem } from '../../interface/interface';

export default class Controller {
    private data: IDataItem[];
    constructor() {
        this.data = companiesData;
    }

    private filter(): IDataItem[] {
        return this.data;
    }

    getData(): IDataItem[] {
        return this.filter();
    }
}
