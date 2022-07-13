import { MinMax } from '../../../../../interface/interface';
import Builder from '../../builder/Builder';
import SettingsElement from '../settingElement/SettingsElement';
import './style.scss';

export default class RangeElement extends SettingsElement {
    private _range: [min: number, max: number];
    private _id: string;
    private _element: HTMLElement;

    private _sliderStart: HTMLElement | undefined;
    private _sliderStartHidden: HTMLElement | undefined;

    private _sliderEnd: HTMLElement | undefined;
    private _sliderEndHidden: HTMLElement | undefined;

    private _progressBar: HTMLElement | undefined;
    private _bar: HTMLElement | undefined;
    private _label: HTMLElement | undefined;

    private _currentMin: number;
    private _currentMax: number;
    private _clicked = false;

    private _currentMinValue: number;
    private _currentMaxValue: number;

    private _labelsTemplate: (value: number) => string;

    constructor(label: string, id: string, range: MinMax, labelsTemplate?: (value: number) => string) {
        super();
        this._range = range;
        this._currentMin = 0;
        this._currentMax = 100;
        this._currentMinValue = range[0];
        this._currentMaxValue = range[1];
        this._id = id;
        this._element = this.build(label);
        this._labelsTemplate = labelsTemplate || ((value: number) => value.toString());

        this.applyListeners();
    }

    public getElement(): HTMLElement {
        return this._element;
    }

    public setLabelsTemplate(templateFunction: (value: number) => string): void {
        this._labelsTemplate = templateFunction;
    }

    public reset(): void {
        this.setCurrentMinMax(...this._range);
    }

    public setMinMax(min: number, max: number): void {
        this._range[0] = min;
        this._range[1] = max;
        this.update();
    }

    public setCurrentMinMax(min: number, max: number): void {
        const newMax = ((max - this._range[0]) / (this._range[1] - this._range[0])) * 100;
        this._currentMax = newMax < 0 ? 0 : newMax > 100 ? 100 : newMax;
        const newMin = ((min - this._range[0]) / (this._range[1] - this._range[0])) * 100;

        this._currentMin = newMin < 0 ? 0 : newMin > 100 ? 100 : newMin;
        this.update();
    }

    protected onChange(): void {
        if (this._onChangeCallback) {
            this._onChangeCallback(this._currentMinValue, this._currentMaxValue);
        }
    }

    private build(label: string): HTMLElement {
        const builder = new Builder().createElement;
        this._label = <HTMLHeadingElement>builder('h4', {
            classes: 'range__label',
            content: label,
        });
        this._sliderStart = <HTMLDivElement>builder('div', {
            classes: ['range-bar__slider', 'range-bar__slider_start'],
            id: this._id + 'Start',
            dataset: {
                start: 1,
                end: 0,
            },
            content: `<div>${this._range[0]}</div>`,
        });
        this._sliderStartHidden = <HTMLDivElement>builder('div', {
            classes: ['range-bar__slider_hidden', 'range-bar__slider_start'],
            id: this._id + 'StartHidden',
        });

        this._sliderEnd = <HTMLDivElement>builder('div', {
            classes: ['range-bar__slider', 'range-bar__slider_end'],
            id: this._id + 'End',
            dataset: {
                start: 0,
                end: 1,
            },
            content: `<div>${this._range[1]}</div>`,
        });
        this._sliderEndHidden = <HTMLDivElement>builder('div', {
            classes: ['range-bar__slider_hidden', 'range-bar__slider_end'],
            id: this._id + 'EndHidden',
        });

        this._progressBar = <HTMLDivElement>builder('div', {
            classes: ['range-bar__progress'],
            id: this._id + 'Progress',
        });

        this._bar = <HTMLDivElement>builder('div', {
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

        const container = <HTMLDivElement>builder('div', {
            classes: ['range-container'],
            content: [this._label, this._bar],
        });

        return container;
    }

    private update(): void {
        this.changeLabels();
        this.changeProgressBar();
        this.moveBothSliders();
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
            if (this._clicked) {
                this._clicked = false;
                this.removeActiveClass();
                this.onChange();
            }
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
            if (this._clicked) {
                this._clicked = false;
                this.removeActiveClass();
                this.onChange();
            }
        });
    }

    private moveBothSliders(): void {
        if (this._sliderStartHidden && this._sliderEndHidden && this._sliderStart && this._sliderEnd) {
            this._sliderStartHidden.style.left = this._currentMin + '%';
            this._sliderEndHidden.style.left = this._currentMax + '%';

            const step = 100 / (this._range[1] - this._range[0]);
            const minStepped = Math.round(this._currentMin / step) * step;
            const maxStepped = Math.round(this._currentMax / step) * step;

            this._sliderStart.style.left = minStepped + '%';
            this._sliderEnd.style.left = maxStepped + '%';
        }
    }

    private addActiveClass(slider: HTMLElement): void {
        this._progressBar?.classList.add('range-bar__progress_active');
        slider.classList.add('range-bar__slider_active');
    }

    private removeActiveClass(): void {
        this._progressBar?.classList.remove('range-bar__progress_active');
        this._sliderStart?.classList.remove('range-bar__slider_active');
        this._sliderEnd?.classList.remove('range-bar__slider_active');
    }

    private changeProgressBar(): void {
        if (this._progressBar) {
            const step = 100 / (this._range[1] - this._range[0]);
            const minStepped = Math.round(this._currentMin / step) * step;
            const maxStepped = Math.round(this._currentMax / step) * step;
            this._progressBar.style.width = maxStepped - minStepped + '%';
            this._progressBar.style.left = minStepped + '%';
        }
    }

    private calculateMousePosition(clientX: number): number | undefined {
        if (this._bar) {
            const elRect = this._bar.getBoundingClientRect();
            return ((clientX - elRect.left) / elRect.width) * 100;
        }
    }

    private getClosestSlider(clientX: number): HTMLElement | undefined {
        if (this._sliderStartHidden && this._sliderEndHidden && this._sliderStart && this._sliderEnd) {
            const startRect = this._sliderStartHidden.getBoundingClientRect();
            const endRect = this._sliderEndHidden.getBoundingClientRect();

            const startCenter = startRect.left + startRect.width / 2;
            const endCenter = endRect.left + endRect.width / 2;

            const startDist = Math.abs(clientX - startCenter);
            const endDist = Math.abs(clientX - endCenter);
            return startDist < endDist ? this._sliderStart : this._sliderEnd;
        }
    }

    private moveSliderTo(slider: HTMLElement, percent: number): void {
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
        const hidden = isMin ? this._sliderStartHidden : this._sliderEndHidden;
        if (hidden) {
            hidden.style.left = clamped + '%';
            const percentStepped = Math.floor(clamped / stepPercent) * stepPercent;
            slider.style.left = percentStepped + '%';
            if (isMin) {
                this._currentMin = percentStepped;
            } else {
                this._currentMax = percentStepped;
            }
        }
    }

    private changeLabels(): void {
        const deltaValue = this._range[1] - this._range[0];
        const minValue = this._range[0] + Math.round((deltaValue * this._currentMin) / 100);
        const maxValue = this._range[0] + Math.round((deltaValue * this._currentMax) / 100);

        if (this._sliderStart && this._sliderEnd) {
            const labelStart = this._sliderStart.firstChild;
            const labelEnd = this._sliderEnd.firstChild;
            if (labelStart instanceof HTMLElement) {
                labelStart.innerHTML = this._labelsTemplate(minValue);
            }
            if (labelEnd instanceof HTMLElement) {
                labelEnd.innerHTML = this._labelsTemplate(maxValue);
            }
        }
        this._currentMinValue = minValue;
        this._currentMaxValue = maxValue;
    }

    private moveSlider(clientX: number): void {
        const slider = this.getClosestSlider(clientX);
        if (slider) {
            const mousePosition = this.calculateMousePosition(clientX);
            if (mousePosition) {
                this.removeActiveClass();
                this.addActiveClass(slider);
                this.moveSliderTo(slider, mousePosition);
                this.changeProgressBar();
                this.changeLabels();
            }
        }
    }
}
