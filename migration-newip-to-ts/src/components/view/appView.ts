import News from './news/news';
import Sources from './sources/sources';
import { SourceData, ArticleData, Category, ResponseExtended, SourceDescription } from '../interface/interface';
import Categories from './categories/categories';
import SourceTitle from './source-title/source-title';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    private readonly categories: Categories;
    private readonly title: SourceTitle;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.categories = new Categories();
        this.title = new SourceTitle();
    }

    private drawTitle(data?: ResponseExtended): void {
        const sourceDescription: SourceDescription | null = this.categories.getSourceDescription(data?.sourceId);
        this.title.draw(sourceDescription);
    }

    public drawNews(data?: ResponseExtended): void {
        this.drawTitle(data);
        const values: ArticleData[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawCategories(data?: ResponseExtended, favoriteSources?: string[]): Category {
        const values: SourceData[] = data?.sources ? data?.sources : [];
        return this.categories.draw(values, favoriteSources);
    }

    public drawSources(data?: { sources?: SourceData[] } | Category): void {
        let values: SourceData[];
        if (typeof data === 'string') {
            values = this.categories.getSourcesByCategory(data);
        } else {
            values = data?.sources ? data?.sources : [];
        }
        this.sources.draw(values);
    }

    public updateFavoriteSources(sourceIdToToggle: string): void {
        const inFavorite: boolean = this.categories.toggleFavoriteSource(sourceIdToToggle);
        this.title.updateFavoriteButton(inFavorite);
        if (this.categories.getCurrentCategory() === 'Favorites') {
            this.drawSources('Favorites');
        }
    }
}

export default AppView;
