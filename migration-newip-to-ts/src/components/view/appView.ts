import News from './news/news';
import Sources from './sources/sources';
import { SourceData, ArticleData } from '../interface/interface';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: { articles?: ArticleData[] }) {
        const values: ArticleData[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: { sources?: SourceData[] }) {
        const values: SourceData[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
