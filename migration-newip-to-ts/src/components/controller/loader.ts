import { Callback, ResponseExtended, SourceData, ArticleData } from '../interface/interface';

interface Options {
    apiKey: string;
    sources?: string;
}

type OptionsAdd = Partial<Options>;

enum ResponseStatus {
    'Bad Request' = 400,
    'Unauthorized',
    'Payment Required',
    'Forbidden',
    'Not Found',
    'Method Not Allowed',
    'Not Acceptable',
    'Proxy Authentication Required',
    'Request Timeout',
    'Conflict',
    'Gone',
    'Length Required',
    'Precondition Failed',
    'Request Entity Too Large',
    'Request-URI Too Long',
    'Unsupported Media Type',
    'Requested Range Not Satisfiable',
    'Expectation Failed',
}

class Loader {
    private baseLink: string;
    private options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: { endpoint: string; options?: OptionsAdd },
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (ResponseStatus[res.status])
                console.log(`Sorry, but there is ${res.status} error: ${ResponseStatus[res.status]}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: OptionsAdd, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback, options: OptionsAdd = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: { status: string | number; sources?: SourceData[]; articles?: ArticleData[] }) => {
                const dataExtended: ResponseExtended = {
                    sources: data.sources,
                    articles: data.articles,
                    sourceId: options.sources,
                };
                callback(dataExtended);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
