import { ICarData } from '../../../../typescript/interface';
import { TColorHEX } from '../../../../typescript/types';
import PageBuilder from '../../../utils/PageBuilder';

export default class Car {
    private _name = '';

    private _color: TColorHEX = '#000000';

    private _id: number;

    private _commonElements = {
        icon: this.createIcon(),
        title: <HTMLHeadingElement>PageBuilder.createElement('h3'),
    };

    private _garageElements = this.createGarageElements();

    constructor(data: ICarData) {
        this._id = data.id;
        this.setName(data.name);
        this.setColor(data.color);
        this.applyEvents();
    }

    private applyEvents() {}

    private createIcon() {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.97 35.21">
                <path d="M74.22,59.62c0,.22,0,.43,0,.64a7.46,7.46,0,0,0,14.84.3,7.3,7.3,0,0,
                        0,.07-.94,7.47,7.47,0,0,0-14.94,0ZM86.32,59H84.18a3.16,3.16,0,0,0-.27-.66l1.52-1.52A4.68,
                        4.68,0,0,1,86.32,59Zm-.89,3.47L83.9,60.93a2.48,2.48,0,0,0,.27-.65h2.16A4.69,4.69,0,0,1,85.43,
                        62.46Zm-3.09-.35a2.77,2.77,0,0,0,.64-.26l1.52,1.51a4.58,4.58,0,0,1-2.16.9Zm0-7.12a4.69,4.69,0,0,
                        1,2.18.9L83,57.42a2.38,2.38,0,0,0-.66-.28ZM81,55v2.15a2.7,2.7,0,0,0-.66.27l-1.52-1.52A4.69,4.69,0,0,1,81,
                        55Zm-2.16,8.37,1.52-1.51a2.77,2.77,0,0,0,.64.26v2.15A4.62,4.62,0,0,1,78.88,63.36Zm-1.82-3.08H79.2a2.9,2.9,0,
                        0,0,.28.65L78,62.46A4.64,4.64,0,0,1,77.06,60.28ZM79.2,59H77.05a4.8,4.8,0,0,1,.9-2.18l1.52,1.52a2.55,2.55,0,0,0-.27.66Z" transform="translate(0 -31.88)"/>
                <path d="M12.21,59.62c0,.22,0,.43,0,.64a7.46,7.46,0,0,0,14.83.3,7.3,7.3,0,0,
                        0,.07-.94,7.47,7.47,0,0,0-14.94,0ZM24.32,59H22.17a2.7,2.7,0,0,0-.27-.66l1.52-1.52A4.8,4.8,0,
                        0,1,24.32,59Zm-.91,3.47-1.52-1.53a2.48,2.48,0,0,0,.27-.65h2.16A4.61,4.61,0,0,1,
                        23.41,62.46Zm-3.08-.35a2.85,2.85,0,0,0,.65-.26l1.51,1.51a4.58,4.58,0,0,1-2.16.9Zm0-7.12a4.69,
                        4.69,0,0,1,2.18.9L21,57.42a2.38,2.38,0,0,0-.66-.28ZM19,57.14a2.7,2.7,0,0,0-.66.27l-1.52-1.52A4.69,4.69,0,
                        0,1,19,55Zm-2.16,6.22,1.52-1.51a2.77,2.77,0,0,0,.64.26v2.15A4.62,4.62,0,0,1,16.87,63.36Zm-1.82-3.08H17.2a2.35,
                        2.35,0,0,0,.27.65l-1.53,1.53A4.64,4.64,0,0,1,15.05,60.28ZM17.19,59H15.05a4.68,4.68,0,0,1,.89-2.18l1.52,1.52a2.55,
                        2.55,0,0,0-.27.66Z" transform="translate(0 -31.88)"/>
                <path data-name="body" d="M0,52.41a6.48,6.48,0,0,0,2.91,5.82l7.62,1.43.19,0a.09.09,0,0,1,0,0,
                        9,9,0,1,1,17.94,0,9.07,9.07,0,0,1-.08,1.12c0,.12,0,.23-.06.35L73,
                        62h0a9.34,9.34,0,0,1-.29-1.61c0-.25,0-.5,0-.75a9,9,0,1,1,17.94,0,9.07,
                        9.07,0,0,1-.08,1.12,5.48,5.48,0,0,1-.1.56c3.06-.35,5.71-.87,7.08-1.65a10.6,
                        10.6,0,0,0,1.35-6,42.13,42.13,0,0,0-1.45-4.51c-1-2.59-19.11-6.37-20.94-6.41-6.22-2.63-16.81-7.69-19.16-8.51-13.91-4.82-28.43-.87-31.65-.13S13.2,
                        38.77,10.79,39.51A74.79,74.79,0,0,1,3.27,41a1.79,1.79,0,0,0-1.52,1.77v5.53A5.14,5.14,
                        0,0,0,0,52.41Zm43.77-18.1s13.32.2,19.93,6.2c0,0-1.47.56-1.17,
                        3.05l-16.62-.51ZM26.49,39.54l2.23-3.61S33.2,34.21,41,34.31L42.4,42.8l-15.15-.51Zm-6.55.19a78,
                        78,0,0,1,7.21-3.29l-4.22,5.8H18.71A2.37,2.37,0,0,1,19.94,39.73Z" transform="translate(0 -31.88)"/>
            </svg>
        `;

        const object = <HTMLObjectElement>PageBuilder.createElement('object', {
            content: svg,
        });

        return object;
    }

    public getGarageElement() {
        return this._garageElements.element;
    }

    private createGarageElements() {
        const element = <HTMLLIElement>PageBuilder.createElement('li');

        const header = <HTMLDivElement>PageBuilder.createElement('div');
        element.append(header);

        const select = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Select',
        });

        const remove = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Remove',
        });
        header.append(select, remove, this._commonElements.title);

        const body = <HTMLDivElement>PageBuilder.createElement('div');
        element.append(body);

        const controls = <HTMLDivElement>PageBuilder.createElement('div');
        const start = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'A',
        });

        const stop = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'B',
        });
        controls.append(start, stop);
        body.append(controls);

        const track = <HTMLDivElement>PageBuilder.createElement('div');
        body.append(track);

        const carContainer = <HTMLDivElement>PageBuilder.createElement('div');
        carContainer.append(this._commonElements.icon);
        track.append(carContainer);

        return {
            element,
            headerButtons: {
                select,
                remove,
            },
            controlsButtons: {
                start,
                stop,
            },
        };
    }

    public setColor(value: TColorHEX) {
        this._color = value;
        const carBody = <SVGPathElement>this._commonElements.icon.querySelector('[data-name="body"]');
        carBody.style.fill = value;
    }

    public getColor() {
        return this._color;
    }

    public setName(value: string) {
        this._name = value;
        this._commonElements.title.innerHTML = value;
    }

    public getName() {
        return this._name;
    }

    public getId() {
        return this._id;
    }
}
