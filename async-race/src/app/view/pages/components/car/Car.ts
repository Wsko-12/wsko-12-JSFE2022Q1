import API from '../../../../../api/Api';
import { EConstants, EEngineStatuses, EErrors, EHTMLDataSet, ERedactorActions } from '../../../../../typescript/enums';
import { ICarData, IEngineData } from '../../../../../typescript/interface';
import { TColorHEX, TRaceCallback } from '../../../../../typescript/types';
import PageBuilder from '../../../../utils/PageBuilder';
// eslint-disable-next-line import/no-cycle
import View from '../../../View';
import './style.scss';

export default class Car {
    public static memory: { [key: string]: Car } = {};

    private _name = '';

    private _color: TColorHEX = '#000000';

    private _id: number;

    private _animation = {
        id: 0,
        stopped: true,
        position: 0,
        timestamp: 0,
        pxPerSec: 0,
        startTime: 0,
        speed: 0,
    };

    private _engineData: IEngineData | null = null;

    private _commonElements = {
        icon: this.createIcon(),
    };

    private _winnersElements = this.createWinnersElements();

    private _garageElements = this.createGarageElements();

    constructor(data: ICarData) {
        this._id = data.id;
        this.setName(data.name);
        this.setColor(data.color);
        this._garageElements.element.dataset[EHTMLDataSet.carId] = this._id.toString();
        this._garageElements.engineButtons.stop.disabled = true;
        this.applyEvents();
        Car.memory[this._id] = this;
    }

    public getGarageElement() {
        return this._garageElements.element;
    }

    public getWinnersElement(place: number, wins: number, time: number) {
        this._animation.stopped = true;
        const elements = this._winnersElements;

        elements.marker.innerHTML = place.toString();
        elements.counter.innerHTML = wins.toString();
        elements.time.innerHTML = time.toString();

        return elements.element;
    }

    public setColor(value: TColorHEX) {
        this._color = value;
        const carBodyGarage = <SVGPathElement>(
            this._garageElements.car.querySelector(`[data-${EHTMLDataSet.name}="body"]`)
        );
        const carBodyWinners = <SVGPathElement>(
            this._winnersElements.car.querySelector(`[data-${EHTMLDataSet.name}="body"]`)
        );

        carBodyGarage.style.fill = value;
        carBodyWinners.style.fill = value;
    }

    public getColor() {
        return this._color;
    }

    public setName(value: string) {
        this._name = value;
        this._garageElements.name.innerHTML = value;

        this._winnersElements.name.innerHTML = value;
    }

    public getName() {
        return this._name;
    }

    public getId() {
        return this._id;
    }

    public startEngine = async (raceCallback?: TRaceCallback) => {
        this._garageElements.engineButtons.start.disabled = true;
        this.disableEditButtons(true);
        const engineData = await API.getEngineData(this._id, EEngineStatuses.started);
        const animationId = this.resetAnimationData();

        /* Error simulator */
        // if (Math.random() < 0.5) {
        //     engineData = null;
        // }

        if (engineData) {
            this._engineData = engineData;
            this._garageElements.engineButtons.stop.disabled = false;
            this.driveAnimation(raceCallback);
            this.sendDriveRequest(animationId);
            return engineData;
        }

        /* Errors catcher */
        // if can't receive data when...

        // user clicks 'A'(start engine button);
        if (!raceCallback) {
            this._garageElements.engineButtons.start.disabled = false;
            this.reset();
            View.showError(EErrors.carStart);
            return Promise.reject();
        }

        // user clicks 'race'
        return Promise.reject();
    };

    private sendDriveRequest = async (animationId: number) => {
        const engineStatus = await API.getEngineData(this._id, EEngineStatuses.drive);
        if (!engineStatus && !this._animation.stopped) {
            if (animationId === this._animation.id) {
                this.broke();
            }
        }
    };

    private disableEditButtons(flag: boolean) {
        const { select, remove } = this._garageElements.editButtons;
        select.disabled = flag;
        remove.disabled = flag;
    }

    public stop = async () => {
        this._garageElements.engineButtons.stop.disabled = true;
        const engineData = await API.getEngineData(this._id, EEngineStatuses.stopped);
        if (engineData) {
            this.reset();
            return engineData;
        }

        return Promise.reject();
    };

    private finish = (raceCallback?: TRaceCallback) => {
        this._animation.stopped = true;
        if (raceCallback) {
            const time = Date.now() - this._animation.startTime;
            const isWin = raceCallback(this._name, time);
            if (isWin) {
                this.saveResult(time);
            }
        }
    };

    private saveResult(time: number) {
        API.saveRaceWinnerResult(this._id, time);
    }

    private broke = () => {
        this.showBrokeIcon(true);
        this._animation.stopped = true;
    };

    private resetAnimationData() {
        this.showBrokeIcon(false);
        const now = Date.now();
        const id = Math.random();
        this._animation.id = id;
        this._animation.timestamp = now;
        this._animation.startTime = now;
        this._animation.stopped = false;
        this._animation.pxPerSec = 0;
        this._animation.position = 0;
        return id;
    }

    private reset = () => {
        this.showBrokeIcon(false);
        this.disableEditButtons(false);
        const { start, stop } = this._garageElements.engineButtons;
        this._animation.stopped = true;
        start.disabled = false;
        stop.disabled = true;
        this._garageElements.car.style.transform = 'translate(0px, 0px)';
    };

    private driveAnimation = (raceCallback?: TRaceCallback) => {
        if (!this._engineData || this._animation.stopped) {
            return;
        }

        const { distance, velocity } = this._engineData;
        const speed = distance / velocity;
        this._animation.speed = speed;

        const carIcon = this._garageElements.car;
        const carIconWidth = carIcon.clientWidth;
        const trackWidth = this._garageElements.track.clientWidth;

        if (trackWidth === 0) {
            // This case is triggered when the user clicks on the pagination buttons or move to another page.
            // trackElement.clientWidth returns 0 because element isn't on the page,
            // which means the page has changed and we can abort animation and race
            return;
        }

        const trackDistance = trackWidth - carIconWidth;

        const PxPerSec = (trackDistance / speed) * EConstants.MS_IN_SEC;
        this._animation.pxPerSec = PxPerSec;

        const last = this._animation.timestamp;
        const current = Date.now();
        this._animation.timestamp = current;

        const delta = current - last;
        this._animation.position += (delta / EConstants.MS_IN_SEC) * PxPerSec;
        carIcon.style.transform = `translate(${Math.floor(this._animation.position)}px, 0px)`;
        if (this._animation.position < trackDistance) {
            requestAnimationFrame(() => this.driveAnimation(raceCallback));
        } else {
            this.finish(raceCallback);
        }
    };

    private applyEvents() {
        const controls = this._garageElements.engineButtons;
        controls.start.addEventListener('click', () => this.startEngine());
        controls.stop.addEventListener('click', this.stop);
    }

    private showBrokeIcon(flag: boolean) {
        const icon = <HTMLElement>this._garageElements.car.querySelector('.car-item__icon-broke');
        if (icon) {
            icon.style.display = flag ? 'flex' : 'none';
        }
    }

    private createIcon() {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 58">
            <path data-name="body" d="M196.78,37.46c-2.14.89-4.29,1.77-6.43,2.68a.75.75,0,0,0-.4.58,9,9,0,0,0,.45,2.67c.29.66,
                                1,1.12,1.57,1.66a8.47,8.47,0,0,1-2.14.6c-4.46.05-8.94.2-13.37-.17-.64,
                                0-1.4-2.63-1.55-4.1-.87-8.74-7.54-14.91-16-14.6-9.13.33-15.32,6.42-15.74,
                                15.3a27.84,27.84,0,0,1-1.09,5.77c-.12.43-1.1.88-1.69.88-8.36.06-16.73,
                                0-25.09.06-16.77,0-33.54-.09-50.31.27-4.8.1-5.16-2.73-5-5.79.54-9-5-17.26-13.75-19.18-6.52-1.43-12.84-.65-17.49,
                                4.81s-4.85,11.55-2.75,18a3.89,3.89,0,0,1,.09.61,9,9,0,0,
                                1-2.6-.45c-3.93-2-7.7-4.39-11.74-6.15-2.05-.89-4.65-.48-6.82-1.2-1-.33-1.6-2-2.38-3l1.5-.28a.52.52,
                                0,0,0,.16-.09c-.28-.53-.44-1.33-.88-1.54-2.06-1-2.5-5.74-1.25-7.47A9.87,9.87,0,0,0,3.51,21.9c0-7.28,
                                5-8.74,10.63-9.84C28.35,9.28,42.43,5.25,56.77,3.84a249.16,249.16,0,0,1,44.63-.08c7.15.59,13.91,5.38,
                                21,7.94A82.31,82.31,0,0,0,137.15,16C151.5,18.25,165.92,20,180.3,22.1a78.24,78.24,0,0,1,12.81,2.4c1.4.45,
                                2,3.3,3,5,.53.87,1.24,1.64,1.86,2.46v1.62l-1.14,3.79ZM114,18.29a27.82,27.82,0,0,1,.6-4.6c.09-.33,1.54-.29,
                                2.36-.42-.88-.48-1.74-1-2.64-1.42-.4-.21-.86-.29-1.29-.47C107.87,9.27,102.89,6,97.56,5.27c-8.47-1.22-17.19-.85-25.8-1-.67,
                                0-1.88,1.21-2,2a40.73,40.73,0,0,0-.13,8.11,3.49,3.49,0,0,0,2.26,2.46c7.09.44,14.19.61,21.28.84C100.13,17.88,107.05,18.08,114,
                                18.29Zm-77-1.66c4.56,0,9.13-.19,13.68.08,2.67.15,3.66-.92,3.93-3.29.11-1,.87-2.17.51-2.78-.9-1.54,4.78-6-2-4.79Q39.95,8.21,26.89,11a11.21,
                                11.21,0,0,0-5.6,2.86c-1.08,1.16-.77,3,2,2.8C27.8,16.45,32.37,16.63,36.93,16.63Z"/>
            <circle cx="42.5" cy="41.5" r="16.5"/>
            <circle cx="159" cy="43" r="15"/>
        </svg>
        `;

        const object = <HTMLObjectElement>PageBuilder.createElement('object', {
            content: svg,
        });

        return object;
    }

    private createGarageElements() {
        const element = <HTMLLIElement>PageBuilder.createElement('li', {
            classes: 'car-item car-item_garage',
        });

        const header = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'car-item__header',
        });
        const editButtons = this.createEditButtons();

        const name = <HTMLHeadingElement>PageBuilder.createElement('h3');
        header.append(editButtons.select, editButtons.remove, name);
        element.append(header);

        const body = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'car-item__body',
        });
        element.append(body);

        const controls = <HTMLDivElement>PageBuilder.createElement('div');
        const engineButtons = this.createEngineButtons();
        controls.append(engineButtons.start, engineButtons.stop);

        body.append(controls);

        const trackElements = this.createTrackElements();
        const { track } = trackElements;
        body.append(track);

        return {
            element,
            track,
            name,
            car: trackElements.carContainer,
            editButtons,
            engineButtons,
        };
    }

    private createWinnersElements() {
        const element = <HTMLLIElement>PageBuilder.createElement('li', {
            classes: 'car-item car-item_winners',
        });
        const marker = <HTMLDivElement>PageBuilder.createElement('div', {});

        const iconClone = <HTMLElement>this._commonElements.icon.cloneNode(true);

        const carContainer = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'car-item__icon-container_winners',
            content: ['<div class="car-item__icon-broke">!</div>', iconClone],
        });
        const name = <HTMLDivElement>PageBuilder.createElement('div', {
            content: this._name,
        });
        const counter = <HTMLDivElement>PageBuilder.createElement('div', {});

        const time = <HTMLDivElement>PageBuilder.createElement('div', {});

        element.append(marker, carContainer, name, counter, time);
        return {
            element,
            marker,
            name,
            counter,
            time,
            car: carContainer,
        };
    }

    private createEditButtons() {
        const select = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'edit',
            dataset: {
                [EHTMLDataSet.button]: 'true',
                [EHTMLDataSet.buttonAction]: ERedactorActions.select,
            },
        });

        const remove = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button',
            content: 'Remove',
            dataset: {
                [EHTMLDataSet.button]: 'true',
                [EHTMLDataSet.buttonAction]: ERedactorActions.remove,
            },
        });

        return { select, remove };
    }

    private createEngineButtons() {
        const start = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button car-item__control-btn car-item__start',
            content: 'A',
        });

        const stop = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button car-item__control-btn car-item__stop',
            content: 'B',
        });
        return {
            start,
            stop,
        };
    }

    private createTrackElements() {
        const track = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'car-item__track display',
        });

        const trackInner = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'car-item__track_inner display__inner',
        });

        const iconClone = <HTMLElement>this._commonElements.icon.cloneNode(true);

        const carContainer = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'car-item__icon-container_garage',
            content: ['<div class="car-item__icon-broke"></div>', iconClone],
        });
        trackInner.append(carContainer);
        track.append(trackInner);

        return { track, carContainer };
    }
}
