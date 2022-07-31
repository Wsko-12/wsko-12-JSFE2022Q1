import { isColorHex } from '../../../../../../typescript/typeguards';
import { TCarRedactorCallback, TColorHEX } from '../../../../../../typescript/types';
import PageBuilder, { ICreateElementProps } from '../../../../../utils/PageBuilder';
import './style.scss';

export default class Redactor {
    private _elements: {
        element: HTMLDivElement;
        button: HTMLInputElement;
        input: HTMLInputElement;
        color: HTMLInputElement;
    };

    private _onChangeCallback: TCarRedactorCallback | null = null;

    constructor(name: string, callback?: TCarRedactorCallback) {
        const createInputElement = (properties: ICreateElementProps) => {
            return <HTMLInputElement>PageBuilder.createElement('input', properties);
        };

        const input = createInputElement({
            classes: 'redactor__input_inner display__inner',
            attrs: {
                type: 'text',
            },
        });

        const inputContainer = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'redactor__input display',
            content: input,
        });

        const color = createInputElement({
            classes: 'redactor__color',
            attrs: {
                type: 'color',
            },
        });

        const button = createInputElement({
            classes: 'button redactor__button',
            attrs: {
                type: 'button',
                value: name,
            },
        });

        const element = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'redactor',
            content: [inputContainer, color, button],
        });

        this._elements = {
            element,
            input,
            color,
            button,
        };

        if (callback) {
            this.setChangeCallback(callback);
        }
        this.applyEvents();
    }

    public applyEvents() {
        const { input, button, color } = this._elements;
        button.addEventListener('click', () => {
            const colorHex = color.value;
            if (this._onChangeCallback && isColorHex(colorHex)) {
                this.disableAll(true);
                this._onChangeCallback(input.value, colorHex, this.clearAll);
            }
        });
    }

    public setChangeCallback(callback: TCarRedactorCallback) {
        this._onChangeCallback = callback;
    }

    public disableAll(flag: boolean) {
        const { input, button, color } = this._elements;
        input.disabled = flag;
        button.disabled = flag;
        color.disabled = flag;
    }

    public setColor(color: TColorHEX) {
        if (isColorHex(color)) {
            this._elements.color.value = color;
        }
    }

    public setInput(text: string) {
        this._elements.input.value = text;
    }

    public getElement() {
        return this._elements.element;
    }

    private clearAll = (disable: boolean) => {
        const { input, color } = this._elements;
        input.value = '';
        color.value = '#000000';
        this.disableAll(disable);
    };
}
