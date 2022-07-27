export interface CarsResponse {
    count: number;
    cars: CarData[];
}

export interface CarData {
    name: string;
    color: string;
    id: string;
}
