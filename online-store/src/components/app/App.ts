import './common.scss';
import AppView from '../view/AppView';
class App {
    view: AppView;
    constructor() {
        this.view = new AppView();
    }
    public start() {
        this.view.init();
        return;
    }
}
export default App;
