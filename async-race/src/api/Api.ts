import {
    EConstants,
    EEngineStatuses,
    EResponseStatuses,
    EUrls,
    EWinnersSorts,
    EWinnersSortsOrder,
} from '../typescript/enums';
import {
    ICarData,
    ICarDataShort,
    ICarsResponse,
    IEngineData,
    IWinnerData,
    IWinnersResponse,
} from '../typescript/interface';
import { TColorHEX } from '../typescript/types';

export default class API {
    public static async saveRaceWinnerResult(id: number, time: number) {
        const sec = Math.round((time / EConstants.MS_IN_SEC) * 100) / 100;
        const inBase = await this.getWinner(id);
        if (inBase) {
            const { wins } = inBase;
            const timeToSave = inBase.time > sec ? sec : inBase.time;
            return this.updateWinner(id, wins + 1, timeToSave);
        }
        return this.createWinner(id, sec);
    }

    private static async updateWinner(id: number, wins: number, time: number) {
        const url = `${this.getWinnersUrl()}/${id}`;
        const data = { wins, time };
        const init = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const responseData = <IWinnersResponse>await this.load(url, init);
        if (!responseData) {
            console.error(`[API] updateWinner error: can't update winner`);
        }
        return responseData;
    }

    private static async createWinner(id: number, time: number) {
        const url = `${this.getWinnersUrl()}`;

        const data = {
            id,
            time,
            wins: 1,
        };

        const init = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const responseData = <ICarData>await this.load(url, init);
        if (!responseData) {
            console.error(`[API] createWinner error: can't create winner`);
        }
        return responseData;
    }

    private static async getWinner(id: number) {
        const url = `${this.getWinnersUrl()}/${id}`;
        const result = <IWinnerData>await this.load(url);
        return result;
    }

    public static async getCars(page: number): Promise<ICarsResponse | null> {
        const options = `?_page=${page}&_limit=${EConstants.CARS_PER_PAGE}`;
        const url = this.getGarageUrl() + options;

        try {
            const response = await fetch(url);
            if (response.status === EResponseStatuses.success) {
                const count = response.headers.get('X-Total-Count');
                const cars = <ICarData[]>await response.json();
                if (count && cars) {
                    return {
                        count: +count,
                        cars,
                    };
                }
            }
        } catch (err) {
            console.error(`[API] getCars ${err}`);
        }
        return null;
    }

    private static createWinnersOptions(page = 1, sort?: EWinnersSorts, order?: EWinnersSortsOrder) {
        let options = `?_page=${page}&_limit=${EConstants.WINNERS_PER_PAGE}`;
        if (sort) {
            options += `&_sort=${sort}`;
        }
        if (order) {
            options += `&_order=${order}`;
        }
        return options;
    }

    public static async getWinners(
        page = 1,
        sort?: EWinnersSorts,
        order?: EWinnersSortsOrder
    ): Promise<IWinnersResponse | null> {
        const options = this.createWinnersOptions(page, sort, order);
        const url = this.getWinnersUrl() + options;

        try {
            const response = await fetch(url);
            if (response.status === EResponseStatuses.success) {
                const count = response.headers.get('X-Total-Count');
                const winners = <IWinnerData[]>await response.json();
                if (count && winners) {
                    return {
                        count: +count,
                        winners,
                    };
                }
            }
        } catch (err) {
            console.error(`[API] getWinners ${err}`);
        }
        return null;
    }

    public static async getCar(id: number): Promise<ICarData | null> {
        const url = `${this.getGarageUrl()}/${id}`;
        const responseData = <ICarData>await this.load(url);
        if (!responseData) {
            console.error(`[API] getCar error: can't receive data`);
        }
        return responseData;
    }

    public static async createCar(name: string, color: TColorHEX): Promise<ICarData | null> {
        const url = `${this.getGarageUrl()}`;
        const init = {
            method: 'POST',
            body: JSON.stringify({ name, color }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const responseData = <ICarData>await this.load(url, init);
        if (!responseData) {
            console.error(`[API] createCar error: can't create car`);
        }
        return responseData;
    }

    public static async updateCar(id: number, data: ICarDataShort): Promise<ICarData | null> {
        const url = `${this.getGarageUrl()}/${id}`;
        const init = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const responseData = <ICarData>await this.load(url, init);
        if (!responseData) {
            console.error(`[API] updateCar error: can't receive data`);
        }
        return responseData;
    }

    public static async removeCarWinners(id: number): Promise<void> {
        const url = `${this.getWinnersUrl()}/${id}`;
        const init = {
            method: 'DELETE',
        };
        const responseData = await this.load(url, init);
        if (!responseData) {
            console.error(`[API] removeCarWinners error: can't delete car`);
        }
        return Promise.resolve();
    }

    public static async removeCarGarage(id: number): Promise<void> {
        const url = `${this.getGarageUrl()}/${id}`;
        const init = {
            method: 'DELETE',
        };
        const responseData = await this.load(url, init);
        if (!responseData) {
            console.error(`[API] removeCarGarage error: can't delete car`);
        }
        return Promise.resolve();
    }

    public static async getEngineData(id: number, status: EEngineStatuses): Promise<IEngineData | null> {
        const url = `${this.getEngineUrl()}?id=${id}&status=${status}`;
        const init = {
            method: 'PATCH',
        };
        const responseData = <IEngineData>await this.load(url, init);
        if (!responseData) {
            console.error(`[API] getEngineData error: can't receive data`);
        }
        return responseData;
    }

    private static getGarageUrl() {
        return `${EUrls.base}${EUrls.garage}`;
    }

    private static getEngineUrl() {
        return `${EUrls.base}${EUrls.engine}`;
    }

    private static getWinnersUrl() {
        return `${EUrls.base}${EUrls.winners}`;
    }

    private static async load<T>(url: string, init?: RequestInit): Promise<T | null> {
        try {
            const response = await fetch(url, init);
            if (response.status === EResponseStatuses.success || response.status === EResponseStatuses.created) {
                const data = <T>await response.json();
                return data || null;
            }
            throw new Error(`[API] load error: ${response.status} ${response.statusText}`);
        } catch (err) {
            // console.error(`[API] load error: `, err);
        }
        return null;
    }
}
