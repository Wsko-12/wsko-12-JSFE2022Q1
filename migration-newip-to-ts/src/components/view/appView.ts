import News from './news/news';
import Sources from './sources/sources';
import { SourceData, ArticleData, Category } from '../interface/interface';
import Categories from './categories/categories';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    private readonly categories: Categories;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.categories = new Categories();
    }

    public drawNews(data?: { articles?: ArticleData[] }) {
        const values: ArticleData[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawCategories(data?: { sources?: SourceData[] }, favoriteSources?: string[]): Category {
        const values: SourceData[] = data?.sources ? data?.sources : [];
        return this.categories.draw(values, favoriteSources);
    }

    public drawSources(data?: { sources?: SourceData[] } | Category) {
        let values: SourceData[];
        if (typeof data === 'string') {
            values = this.categories.getSourcesByCategory(data);
        } else {
            values = data?.sources ? data?.sources : [];
        }
        this.sources.draw(values);
    }

    public updateFavoriteSources(sourceIdToToggle: string) {
        this.categories.toggleFavoriteSource(sourceIdToToggle);
        if (this.categories.getCurrentCategory() === 'Favorites') {
            this.drawSources('Favorites');
        }
    }
}

export default AppView;
