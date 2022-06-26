export interface SourceData {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface ArticleData {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: Pick<SourceData, 'id' | 'name'>;
    title: string;
    url: string;
    urlToImage: string | null;
}

export type Callback = <DataType>(data?: DataType) => void;
