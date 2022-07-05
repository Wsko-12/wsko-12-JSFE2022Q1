import './common.scss';
import AppView from '../view/AppView';
import Controller from '../controller/Controller';
class App {
    view: AppView;
    controller: Controller;
    constructor() {
        this.view = new AppView();
        this.controller = new Controller();
    }
    public start() {
        this.view.build();
        this.view.drawCards(this.controller.getData());
    }
}
export default App;
