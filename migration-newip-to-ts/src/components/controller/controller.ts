import AppLoader from './appLoader';
import {Callback, Category, ECategory, ResponseExtended, SourceData} from '../interface/interface';
import LocalStorage from '../localStorage/localStorage';
import {isCategory} from "../../utils/typeguards";

class AppController extends AppLoader {
    private currentSource: string | null = null;
    private localStorage: LocalStorage = new LocalStorage();

    public switchCategory(e: Event, callback: Callback<Category | { sources?: SourceData[] | undefined }>): void {
        // if you already cast smt to Type, no need to duplicate this type
        const target = e.target as HTMLElement;
        // if you already cast smt to Type, no need to duplicate this type
        const categoriesContainer = e.currentTarget as HTMLElement;

        if (target !== categoriesContainer) {
            const button = target.closest('.category__item');
            // clean up casts
            if (button instanceof Element) {
                // if you already cast smt to Type, no need to duplicate this type
                // const category = button.getAttribute('data-category-char') as Category;
                // but better use typeguard like 'isCategory'
                const category = button.getAttribute('data-category-char');
                if (isCategory(category)) {
                    // after this check you already know that it is 'Category'
                    callback(category);
                } else {
                    // also, should be ErrorBoundary to handle exceptions in App
                    throw new Error("[AppController] switchCategory typeof category is not 'Category'")
                }
            } else {
                throw new Error("[AppController] switchCategory button is not instanceof 'Element'")
            }
        }
    }

    // no need to duplicate return type, it inferred from usage
    public toggleCurrentSourceInFavorites() {
        // if body in {}
        if (this.currentSource) {
            this.localStorage.toggleSourceInFavorites(this.currentSource)
        }
        return this.currentSource;
    }

    // no need to duplicate return type, it inferred from usage
    public getFavoriteSources() {
        // use generics when it is possible
        return this.localStorage.read<string[]>('favoriteSources') ?? [];
        // no need
        // return favorites ? favorites : [];
    }

    // no need to duplicate return type, it inferred from usage
    public getSources(callback: Callback<ResponseExtended>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<ResponseExtended>) {
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
