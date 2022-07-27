import { EConstants, EResponseStatuses, EUrls } from '../typescript/enums';
import { CarData, CarsResponse } from '../typescript/interface';

export default class API {
    public static async getCars(page: number): Promise<CarsResponse | null> {
        const options = `?_page=${page}&_limit=${EConstants.CARS_PER_PAGE}`;
        const url = this.getGarageUrl() + options;

        try {
            const response = await fetch(url);
            if (response.status === EResponseStatuses.success) {
                const count = response.headers.get('X-Total-Count');
                const cars = <CarData[]>await response.json();
                if (count && cars) {
                    return {
                        count: +count,
                        cars,
                    };
                }
            }
        } catch (err) {
            console.error(`[API] getData ${err}`);
            return null;
        }
        return null;
    }

    private static getGarageUrl() {
        return `${EUrls.base}${EUrls.garage}`;
    }
}
