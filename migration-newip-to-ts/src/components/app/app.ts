import AppController from '../controller/controller';
import { Category, ResponseExtended } from '../interface/interface';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    private applyEvents() {
        const categories = document.querySelector('.categories') as HTMLElement;
        categories.addEventListener('click', (e) =>
            this.controller.switchCategory(e, <Category>(category: Category) => {
                this.view.drawSources(category);
            })
        );

        const sources = document.querySelector('.sources') as HTMLElement;
        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, <ResponseExtended>(data: ResponseExtended) => {
                this.view.drawNews(data);
            })
        );

        const addToFavoriteBtn = document.querySelector('#addToFavoriteBtn') as HTMLElement;
        addToFavoriteBtn.addEventListener('click', () => {
            const sourceId: string | null = this.controller.toggleCurrentSourceInFavorites();
            if (sourceId) {
                this.view.updateFavoriteSources(sourceId);
            }
        });
    }

    private updateSources(data: ResponseExtended) {
        const currentCategory: Category = this.view.drawCategories(data, this.controller.getFavoriteSources());
        this.view.drawSources(currentCategory);
    }

    public start() {
        this.applyEvents();

        this.controller.getSources(<ResponseExtended>(data: ResponseExtended) => {
            this.updateSources(data);
        });
    }
}

export default App;
