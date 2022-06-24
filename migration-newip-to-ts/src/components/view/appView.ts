import News from './news/news';
import Sources from './sources/sources';
import { SourceData, ArticleData } from '../interface/interface';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: { articles?: ArticleData[] }) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: { sources?: SourceData[] }) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
