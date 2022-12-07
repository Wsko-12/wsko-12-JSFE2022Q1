import Builder from '../builder/Builder';
import './style.scss';

export default class Popup {
    private _element: HTMLDivElement;
    private _message: HTMLElement;
    private _timeoutId: number | null = null;

    constructor() {
        const builder = Builder.createElement;

        this._message = <HTMLParagraphElement>builder('p', {
            classes: 'popup__message',
        });

        this._element = <HTMLDivElement>builder('div', {
            classes: ['popup', 'page-item'],
            content: [this._message],
        });
    }

    private hide(timeoutId: number) {
        if (this._timeoutId === timeoutId) {
            this._element.classList.remove('popup_showed');
        }
    }

    public show(msg: string): void {
        this._element.classList.add('popup_showed');
        this._message.innerHTML = msg;

        const id = Math.random();
        this._timeoutId = id;

        setTimeout(() => {
            this.hide(id);
        }, 2000);
    }

    public getElement() {
        return this._element;
    }
}
