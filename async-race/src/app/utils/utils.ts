import {EConstants} from '../../typescript/enums';
import {TColorHEX} from '../../typescript/types';

const carNames = [
    'Acura',
    'Alfa Romeo',
    'Aston Martin',
    'Audi',
    'Bentley',
    'BMW',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'Citroen',
    'Dacia',
    'Dodge',
    'Ferrari',
    'Fiat',
    'Ford',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Jaguar ',
    'Jeep',
    'Kia',
    'Lamborghini',
    'Lancia',
    'Land Rover',
    'Lexus',
    'Lincoln',
    'Lotus',
    'Maserati',
    'Mazda ',
    'Mercedes',
    'Mitsubishi',
    'Nissan',
    'Opel',
    'Peugeot',
    'Porsche',
    'Renault',
    'Seat',
    'Skoda',
    'Subaru',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo',
];

const models = [
    'Q3',
    'Q3',
    'Q4',
    'Q4',
    'Q5',
    'Q5',
    'Q7',
    'Q7',
    'Q8',
    'Q8',
    'A3',
    'A3',
    'A4',
    'A4',
    'A5',
    'A5',
    'A6',
    'A6',
    'A7',
    'A7',
    'A8',
    'A8',
    'TT',
    'TT',
    'R8',
    'R8',
    'DB11',
    'DBX',
    'DB9',
];

export default class Utils {
    public static msToSec(ms: number) {
        return Math.round((ms / EConstants.MS_IN_SEC) * 100) / 100;
    }

    public static generateCarName() {
        const namesLength = carNames.length;
        const nameIndx = Math.round(Math.random() * (namesLength - 1));

        const modelsLength = models.length;
        const modelIndx = Math.round(Math.random() * (modelsLength - 1));

        return `${carNames[nameIndx]} ${models[modelIndx]}`;
    }

    public static generateHEXColor(): TColorHEX {
        const r = Utils.getRandomColor16BitColor();
        const g = Utils.getRandomColor16BitColor();
        const b = Utils.getRandomColor16BitColor();

        return `#${r}${g}${b}`;
    }

    public static getRandomColor16BitColor(): string {
        return Math.round(Math.random() * EConstants.FF_16_Bit).toString(16);
    }
}
