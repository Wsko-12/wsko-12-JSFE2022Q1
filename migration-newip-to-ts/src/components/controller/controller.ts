import AppLoader from './appLoader';
import { Callback, Category } from '../interface/interface';
import LocalStorage from '../localStorage/localStorage';

class AppController extends AppLoader {
    private currentSource: string | null = null;
    private localStorage: LocalStorage = new LocalStorage();
    public switchCategory(e: Event, callback: Callback): void {
        const target: HTMLElement = e.target as HTMLElement;
        const categoriesContainer: HTMLElement = e.currentTarget as HTMLElement;

        if (target !== categoriesContainer) {
            const button = target.closest('.category__item') as HTMLElement;
            const category: Category = button.getAttribute('data-category-char') as Category;
            callback(category);
        }
    }

    public toggleCurrentSourceInFavorites(): string | null {
        if (this.currentSource) this.localStorage.toggleSourceInFavorites(this.currentSource);
        return this.currentSource;
    }

    public getFavoriteSources(): string[] {
        const favorites: string[] | null = this.localStorage.read('favoriteSources');
        return favorites ? favorites : [];
    }

    public getSources(callback: Callback): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId != null) {
                    if (newsContainer?.getAttribute('data-source') !== sourceId) {
                        newsContainer?.setAttribute('data-source', sourceId);
                        this.currentSource = sourceId;
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
