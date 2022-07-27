import View from './view/View';

export default class App {
    private _view = new View();

    start() {
        this._view.render();
    }
}
