import AppController from '../controller/controller';
import {ResponseExtended} from '../interface/interface';
import {AppView} from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    private applyEvents() {
        const categories = document.querySelector('.categories') as HTMLElement;
        categories.addEventListener('click', (e): void =>
            // no need to write inferred types, extra wrap
            this.controller.switchCategory(e, (category) => {
                this.view.drawSources(category);
            })
        );

        const sources = document.querySelector('.sources') as HTMLElement;
        // no need to write inferred types
        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => {
                this.view.drawNews(data);
            })
        );

        const addToFavoriteBtn = document.querySelector('#addToFavoriteBtn') as HTMLElement;
        addToFavoriteBtn.addEventListener('click', (): void => {
            const sourceId: string | null = this.controller.toggleCurrentSourceInFavorites();
            if (sourceId) {
                this.view.updateFavoriteSources(sourceId);
            }
        });
    }

    private updateSources(data?: ResponseExtended) {
        const currentCategory = this.view.drawCategories(data, this.controller.getFavoriteSources());
        this.view.drawSources(currentCategory);
    }

    public start() {
        this.applyEvents();

        this.controller.getSources((data) => {
            this.updateSources(data);
        });
    }
}

export default App;
