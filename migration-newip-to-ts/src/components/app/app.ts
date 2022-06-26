import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const categories = document.querySelector('.categories') as HTMLElement;
        categories.addEventListener('click', (e) =>
            this.controller.switchCategory(e, (char) => {
                this.view.drawSources(char);
            })
        );

        const sources = document.querySelector('.sources') as HTMLElement;

        sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(this.view.drawCategories(data)));
    }
}

export default App;
