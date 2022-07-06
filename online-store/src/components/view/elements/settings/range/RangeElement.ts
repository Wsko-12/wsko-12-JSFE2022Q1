import Builder from '../../builder/Builder';
import './style.scss';
type Callback = (minValue: number, maxValue: number) => void;
export default class RangeElement {
    private _range: number[];
    private _id: string;
    private _element: HTMLElement;

    private _sliderStart: HTMLElement | undefined;
    private _sliderStartHidden: HTMLElement | undefined;

    private _sliderEnd: HTMLElement | undefined;
    private _sliderEndHidden: HTMLElement | undefined;

    private _progressBar: HTMLElement | undefined;
    private _bar: HTMLElement | undefined;

    private _currentMin: number;
    private _currentMax: number;
    private _clicked = false;
    private _callback: Callback | undefined;

    constructor(id: string, range: [min: number, max: number]) {
        this._range = range;
        this._currentMin = range[0];
        this._currentMax = range[1];
        this._id = id;
        this._element = this.create();
        this.applyListeners();
    }
    public applyCallback(callback: Callback) {
        this._callback = callback;
    }

    public getElement(): HTMLElement {
        return this._element;
    }

    private create(): HTMLElement {
        const builder = new Builder().createElement;
        this._sliderStart = builder('div', {
            classes: ['range-bar__slider', 'range-bar__slider_start'],
            id: this._id + 'Start',
            dataset: {
                start: 1,
                end: 0,
            },
            content: `<span>${this._range[0]}</span>`,
        });
        this._sliderStartHidden = builder('div', {
            classes: ['range-bar__slider_hidden', 'range-bar__slider_start'],
            id: this._id + 'StartHidden',
        });

        this._sliderEnd = builder('div', {
            classes: ['range-bar__slider', 'range-bar__slider_end'],
            id: this._id + 'End',
            dataset: {
                start: 0,
                end: 1,
            },
            content: `<span>${this._range[1]}</span>`,
        });
        this._sliderEndHidden = builder('div', {
            classes: ['range-bar__slider_hidden', 'range-bar__slider_end'],
            id: this._id + 'EndHidden',
        });

        this._progressBar = builder('div', {
            classes: ['range-bar__progress'],
            id: this._id + 'Progress',
        });

        this._bar = builder('div', {
            classes: ['range-bar'],
            id: this._id,
            dataset: {
                min: this._range[0],
                max: this._range[1],
            },
            content: [
                this._sliderStart,
                this._sliderStartHidden,
                this._progressBar,
                this._sliderEnd,
                this._sliderEndHidden,
            ],
        });

        const container = builder('div', {
            classes: ['range-container'],
            content: [this._bar],
        });

        return container;
    }

    private applyListeners(): void {
        this._element.addEventListener('mousedown', (e) => {
            this._clicked = true;
            this.moveSlider(e.clientX);
        });

        this._element.ondragstart = () => false;

        document.addEventListener('mousemove', (e) => {
            if (this._clicked) {
                this.moveSlider(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            this._clicked = false;
        });

        this._element.addEventListener('touchstart', (e) => {
            this._clicked = true;
            const clientX = e.touches[0].clientX;
            this.moveSlider(clientX);
        });

        document.addEventListener('touchmove', (e) => {
            if (this._clicked) {
                const clientX = e.touches[0].clientX;
                this.moveSlider(clientX);
            }
        });

        document.addEventListener('touchend', () => {
            this._clicked = false;
        });
    }

    private changeProgressBar() {
        if (this._progressBar) {
            this._progressBar.style.width = this._currentMax - this._currentMin + '%';
            this._progressBar.style.left = this._currentMin + '%';
        }
    }

    private calculateMousePosition(clientX: number): number {
        const elRect = (this._bar as HTMLElement).getBoundingClientRect() as DOMRect;
        return ((clientX - elRect.left) / elRect.width) * 100;
    }

    private getClosestSlider(clientX: number): HTMLElement {
        const startRect = (this._sliderStartHidden as HTMLElement).getBoundingClientRect();
        const endRect = (this._sliderEndHidden as HTMLElement).getBoundingClientRect();

        const startCenter = startRect.left + startRect.width / 2;
        const endCenter = endRect.left + endRect.width / 2;

        const startDist = Math.abs(clientX - startCenter);
        const endDist = Math.abs(clientX - endCenter);
        return startDist < endDist ? (this._sliderStart as HTMLElement) : (this._sliderEnd as HTMLElement);
    }

    private moveSliderTo(slider: HTMLElement, percent: number) {
        const isMin = slider === this._sliderStart;
        const stepMin = this._range[0];
        const stepMax = this._range[1];

        const stepPercent = 100 / (stepMax - stepMin);
        if (isMin) {
            if (percent >= this._currentMax) {
                percent = this._currentMax - 1;
            }
        } else {
            if (percent - stepPercent <= this._currentMin) {
                percent = this._currentMin + 1;
            }
        }
        const clamped = percent < 0 ? 0 : percent > 100 ? 100 : percent;
        const hidden = (isMin ? this._sliderStartHidden : this._sliderEndHidden) as HTMLElement;
        hidden.style.left = clamped + '%';
        const percentStepped = Math.floor(clamped / stepPercent) * stepPercent;
        slider.style.left = percentStepped + '%';
        if (isMin) {
            this._currentMin = percentStepped;
        } else {
            this._currentMax = percentStepped;
        }
    }
    private changeLabels() {
        const deltaValue = this._range[1] - this._range[0];
        const minValue = this._range[0] + Math.floor((deltaValue * this._currentMin) / 100);
        const maxValue = this._range[0] + Math.floor((deltaValue * this._currentMax) / 100);
        (this._sliderStart?.firstChild as HTMLElement).innerHTML = minValue + '';
        (this._sliderEnd?.firstChild as HTMLElement).innerHTML = maxValue + '';

        if (this._callback) {
            this._callback(minValue, minValue);
        }
    }

    private moveSlider(clientX: number) {
        const slider = this.getClosestSlider(clientX);
        const mousePosition = this.calculateMousePosition(clientX);
        this.moveSliderTo(slider, mousePosition);
        this.changeProgressBar();
        this.changeLabels();
    }
}
