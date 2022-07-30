import View from './view/View';
import './style.scss';

export default class App {
    private _view = new View();

    start() {
        this._view.render();
    }
}
