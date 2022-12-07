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

export interface ResponseExtended {
    articles?: ArticleData[];
    sources?: SourceData[];
    sourceId?: string;
}

export interface SourceDescription {
    name: string;
    inFavorite: boolean;
}

// more 'speaking' type name
export type Callback<DataType> = (data?: DataType) => void;

// if value = key in enum, you can do Object.values(ECategory) and TS will infer this keys as your enum
// than you can easily use typeguards
export enum ECategory {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    I = "I",
    J = "J",
    K = "K",
    L = "L",
    M = "M",
    N = "N",
    O = "O",
    P = "P",
    Q = "Q",
    R = "R",
    S = "S",
    T = "T",
    U = "U",
    V = "V",
    W = "W",
    X = "X",
    Y = "Y",
    Z = "Z",
    Others = "Others",
    Favorites = "Favorites",
}

export type Category =
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z'
    | 'Others'
    | 'Favorites';
export enum Chars {
    A = 1,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
}
