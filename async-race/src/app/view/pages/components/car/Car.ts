import API from '../../../../../api/Api';
import {EConstants, EEngineStatuses, EErrors, EHTMLDataSet, ERedactorActions} from '../../../../../typescript/enums';
import {ICarData, IEngineData} from '../../../../../typescript/interface';
import {TColorHEX, TRaceCallback} from '../../../../../typescript/types';
import PageBuilder from '../../../../utils/PageBuilder';
import ErrorView from '../errorView/errorView';
import carIconSvg from '../../../../assets/carIconSvg';
import './style.scss';

export default class Car {
    public static memory: Record<string, Car> = {};

    private _name = '';

    private _color: TColorHEX = '#000000';

    private readonly _id: number;

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
        // set like this
        this.name = data.name;
        this.setColor(data.color);
        this._garageElements.element.dataset[EHTMLDataSet.carId] = this._id.toString();
        this._garageElements.engineButtons.stop.disabled = true;
        this.applyEvents();
        Car.memory[this._id] = this;
    }

    // getter
    public get garageElement() {
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

    // setter
    public set name(value: string) {
        this._name = value;
        this._garageElements.name.innerHTML = value;

        this._winnersElements.name.innerHTML = value;
    }

    public get name() {
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
            ErrorView.showError(EErrors.carStart);
            return false;
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
        const {select, remove} = this._garageElements.editButtons;
        select.disabled = flag;
        remove.disabled = flag;
    }

    public stop = async (tableReset?: boolean) => {
        this._garageElements.engineButtons.stop.disabled = true;
        const engineData = await API.getEngineData(this._id, EEngineStatuses.stopped);

        /* Error simulator */
        // if (Math.random() < 0.5) {
        //     engineData = null;
        // }

        if (engineData) {
            this.reset();
            return engineData;
        }

        /* Errors catcher */
        // if can't receive data when...

        // user clicks 'B'(stop engine button);
        if (!tableReset) {
            this._garageElements.engineButtons.stop.disabled = false;
            ErrorView.showError(EErrors.carStop);
            return false;
        }

        // user clicks 'reset'
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
        const {start, stop} = this._garageElements.engineButtons;
        this._animation.stopped = true;
        start.disabled = false;
        stop.disabled = true;
        this._garageElements.car.style.transform = 'translate(0px, 0px)';
    };

    private driveAnimation = (raceCallback?: TRaceCallback) => {
        if (!this._engineData || this._animation.stopped) {
            return;
        }

        const {distance, velocity} = this._engineData;
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
        controls.stop.addEventListener('click', () => {
            this.stop();
        });
    }

    private showBrokeIcon(flag: boolean) {
        const icon = <HTMLElement>this._garageElements.car.querySelector('.car-item__icon-broke');
        if (icon) {
            icon.style.display = flag ? 'flex' : 'none';
        }
    }

    private createIcon() {
        return <HTMLObjectElement>PageBuilder.createElement('object', {
            content: carIconSvg,
        });
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
        const {track} = trackElements;
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
            content: [iconClone],
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

        return {select, remove};
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

        return {track, carContainer};
    }
}
