export const enum EAppPages {
    garage = 'garage',
    winners = 'winners',
}

// usually enums used for data when you need at same time some value and its type, here you need just value
// its possible to use it in such way but use const for it
// with const enums you can just read it fields (can't iterate, use in, Object.values(enum) and so on)
export const enum EConstants {
    HEX_COLOR_STRING_LENGTH = 7,
    MS_IN_SEC = 1000,
    CARS_PER_PAGE = 7,
    WINNERS_PER_PAGE = 10,
    FF_16_Bit = 255,
    CARS_GENERATOR = 100,
    POP_UP_SHOW_TIME = 4000,
    ERROR_SHOW_TIME = 4000,

    BLACK_HEX = '#000000',
}

export const enum EUrls {
    base = 'http://127.0.0.1:3000',
    garage = '/garage',
    engine = '/engine',
    winners = '/winners',
}

export const enum EResponseStatuses {
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
    name = 'name',
    page = 'page',
    button = 'isButton',
    buttonAction = 'buttonAction',
    carId = 'carId',
    sorting = 'sorting',
}

export enum EErrors {
    tableFill = 'Sorry, something went wrong :(',

    raceStart = "Sorry, can't receive all cars engine data. Please, reset the race and try again",
    raceStartReset = "Sorry, can't start race because can't reset all cars. Please, try again",
    tableReset = "Sorry, can't reset all cars. Please, try again",

    carStart = "Sorry, can't receive engine data. Please, try again",
    carStop = "Sorry, can't receive engine data. Please, try again",

    selectCar = 'Sorry, something went wrong. Please, try again',
    updateCar = "Can't update car. Please, try again",
    createCar = "Can't create car. Please, try again",
    carRemove = "Can't remove car. Please, try again",
}
