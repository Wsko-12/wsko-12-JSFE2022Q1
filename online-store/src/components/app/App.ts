import './common.scss';
import AppView from '../view/AppView';
import Controller from '../controller/Controller';
import { IFilters } from '../../interface/interface';
import LocalStorage from '../localStorage/LocalStorage';
import Basket from '../basket/Basket';
class App {
    public view = new AppView();
    public controller = new Controller();

    private _basket = new Basket();
    private _localStorage = new LocalStorage();

    public start() {
        this.view.build();
        const startFilters = this.controller.getStartFilters();
        this.view.setFilters(startFilters);

        this.view.drawCards(this.controller.getFilteredData(startFilters));

        this.view.setSettingsChangeCallback((filters: IFilters, fullReset?: boolean) => {
            if (fullReset) {
                this._localStorage.clear();
                this._basket.clear();
                this.view.clear();
            }
            this._localStorage.saveFilters(filters);
            this.view.drawCards(this.controller.getFilteredData(filters));
        });
    }
}
export default App;
