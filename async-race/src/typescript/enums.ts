export enum EAppPages {
    garage = 'garage',
    winners = 'winners',
}

export enum EConstants {
    HEX_COLOR_STRING_LENGTH = 7,
    MS_IN_SEC = 1000,
    CARS_PER_PAGE = 7,
    WINNERS_PER_PAGE = 10,
    FF_16_Bit = 255,
    CARS_GENERATOR = 100,
    POP_UP_SHOW_TIME = 4000,
}

export enum EUrls {
    base = 'http://127.0.0.1:3000',
    garage = '/garage',
    engine = '/engine',
    winners = '/winners',
}

export enum EResponseStatuses {
    success = 200,
    created = 201,
}

export enum ERedactorActions {
    create = 'create',
    update = 'update',
    select = 'select',
    remove = 'remove',
}

export enum EEngineStatuses {
    started = 'started',
    drive = 'drive',
    stopped = 'stopped',
}

export enum EWinnersSorts {
    wins = 'wins',
    time = 'time',
}

export enum EWinnersSortsOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum EWinnersSortsOrderChars {
    ASC = '🠗',
    DESC = '🠕',
}

export enum EHTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum EHTMLDataSet {
    page = 'page',
    button = 'isButton',
    buttonAction = 'buttonAction',
    carId = 'carId',
    sorting = 'sorting',
}
