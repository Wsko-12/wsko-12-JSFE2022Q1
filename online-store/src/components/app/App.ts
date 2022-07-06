import './common.scss';
import AppView from '../view/AppView';
import Controller from '../controller/Controller';
import { Filters } from '../../interface/interface';
class App {
    view: AppView;
    controller: Controller;
    constructor() {
        this.view = new AppView();
        this.controller = new Controller();
    }
    public start() {
        this.view.build();
        const basicFilters = this.controller.getBasicFilters();
        const startFilters = basicFilters; // | localStorage.getFilters();
        this.view.setStartFilters(startFilters);

        this.view.drawCards(this.controller.getFilteredData(startFilters));

        this.view.setSettingsChangeCallback((filters: Filters) => {
            this.view.drawCards(this.controller.getFilteredData(filters));
        });

        this.view.setSettingsResetCallback(() => {
            const basicFilters = this.controller.getBasicFilters();
            this.view.setStartFilters(basicFilters);
            this.view.drawCards(this.controller.getFilteredData(basicFilters));
        });
    }
}
export default App;
