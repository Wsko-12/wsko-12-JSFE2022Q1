import AppController from '../controller/controller';
import { Category } from '../interface/interface';
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
        this.controller.getSources((data) => {
            const currentCategory: Category = this.view.drawCategories(data, this.controller.getFavoriteSources());
            this.view.drawSources(currentCategory);
        });

        const addToFavoriteBtn = document.querySelector('#addToFavoriteBtn') as HTMLElement;
        addToFavoriteBtn.addEventListener('click', () => {
            const sourceId: string | null = this.controller.toggleCurrentSourceInFavorites();
            if (sourceId) {
                this.view.updateFavoriteSources(sourceId);
            }
        });
    }
}

export default App;
