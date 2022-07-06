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
        this.view.applyFilters(this.controller.getFilters());

        this.view.drawCards(this.controller.getData());

        this.view.setChangeCallback((filters: Filters) => {
            this.controller.applyFilters(filters);
            this.view.drawCards(this.controller.getData());
        });

        this.view.setResetCallback(() => {
            this.controller.resetFilters();
            this.view.drawCards(this.controller.getData());
        });
    }
}
export default App;
