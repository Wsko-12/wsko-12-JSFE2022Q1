import {Callback, ResponseExtended, SourceData, ArticleData} from '../interface/interface';

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

interface IRawData {
    status: string | number;
    sources?: SourceData[];
    articles?: ArticleData[];
}

const callJson = <T>(res: Response) => res.json() as Promise<T>;

class Loader {
    private baseLink: string;
    private options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        {endpoint, options = {}}: { endpoint: string; options?: OptionsAdd },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
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

    private makeUrl(options: OptionsAdd, endpoint: string) {
        // use util types 'Record'
        const urlOptions: Record<string, string> = {...this.options, ...options};
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback<ResponseExtended>, options: OptionsAdd = {}) {
        fetch(this.makeUrl(options, endpoint), {method})
            .then(this.errorHandler)
            // extract util functions for better readability
            .then<IRawData>(callJson)
            // try to not inline types, bad readability and use generics
            .then((data) => {
                const dataExtended: ResponseExtended = {
                    sources: data.sources,
                    articles: data.articles,
                    sourceId: options.sources,
                };
                callback(dataExtended);
            })
            // extra wrap
            .catch(console.error);
    }
}

export default Loader;
