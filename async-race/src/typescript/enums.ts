export enum EAppPages {
    garage = 'garage',
    winners = 'winners',
}

export enum EConstants {
    HEX_COLOR_STRING_LENGTH = 7,
    MS_IN_SEC = 1000,
    CARS_PER_PAGE = 7,
}

export enum EUrls {
    base = 'http://127.0.0.1:3000',
    garage = '/garage',
    engine = '/engine',
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
