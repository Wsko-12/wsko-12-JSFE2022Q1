import './common.scss';
import AppView from '../view/AppView';
import Controller from '../controller/Controller';
import { Filters } from '../../interface/interface';
import LocalStorage from '../localStorage/LocalStorage';
class App {
    public view: AppView = new AppView();
    public controller: Controller = new Controller();
    private _localStorage: LocalStorage = new LocalStorage();
    public start() {
        this.view.build();
        const startFilters = this.controller.getCurrentFilters();
        this.view.setStartFilters(startFilters);

        this.view.drawCards(this.controller.getFilteredData(startFilters));

        this.view.setSettingsChangeCallback((filters: Filters) => {
            this._localStorage.saveFilters(filters);
            this.view.drawCards(this.controller.getFilteredData(filters));
        });

        this.view.setSettingsResetCallback(() => {
            const basicFilters = this.controller.getBasicFilters();
            this._localStorage.saveFilters(basicFilters);
            this.view.setStartFilters(basicFilters);
            this.view.drawCards(this.controller.getFilteredData(basicFilters));
        });
    }
}
export default App;
