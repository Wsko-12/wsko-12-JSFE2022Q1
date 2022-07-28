import { EConstants, EResponseStatuses, EUrls } from '../typescript/enums';
import { ICarData, ICarDataShort, ICarsResponse } from '../typescript/interface';
import { TColorHEX } from '../typescript/types';

export default class API {
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

    public static async removeCar(id: number): Promise<void> {
        const url = `${this.getGarageUrl()}/${id}`;
        const init = {
            method: 'DELETE',
        };
        const responseData = await this.load(url, init);
        if (!responseData) {
            console.error(`[API] removeCar error: can't delete car`);
            return Promise.reject();
        }
        return Promise.resolve();
    }

    private static getGarageUrl() {
        return `${EUrls.base}${EUrls.garage}`;
    }

    private static async load<T>(url: string, init?: RequestInit): Promise<T | null> {
        try {
            const response = await fetch(url, init);
            if (response.status === EResponseStatuses.success) {
                const data = <T>await response.json();
                return data || null;
            }
            throw new Error(`[API] load error: ${response.status} ${response.statusText}`);
        } catch (err) {
            console.error(`[API] load error: `, err);
        }
        return null;
    }
}
