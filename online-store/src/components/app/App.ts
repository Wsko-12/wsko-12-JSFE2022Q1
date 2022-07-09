import './common.scss';
import AppView from '../view/AppView';
import Controller from '../controller/Controller';
import { Filters } from '../../interface/interface';
import LocalStorage from '../localStorage/LocalStorage';
import Basket from '../basket/Basket';
class App {
    public view: AppView = new AppView();
    public controller: Controller = new Controller();

    private _basket: Basket = new Basket();
    private _localStorage: LocalStorage = new LocalStorage();

    public start(): void {
        this.view.build();
        const startFilters = this.controller.getCurrentFilters();
        this.view.setFilters(startFilters);

        this.view.drawCards(this.controller.getFilteredData(startFilters));

        this.view.setSettingsChangeCallback((filters: Filters) => {
            this._localStorage.saveFilters(filters);
            this.view.drawCards(this.controller.getFilteredData(filters));
        });

        this.view.setSettingsFullResetCallback(() => {
            this._localStorage.clear();
            this._basket.clear();
            this.controller.clear();
            this.view.clear();
            const basicFilters = this.controller.getBasicFilters();
            this._localStorage.saveFilters(basicFilters);
            this.view.setFilters(basicFilters);
            this.view.drawCards(this.controller.getFilteredData(basicFilters));
        });
    }
}
export default App;
