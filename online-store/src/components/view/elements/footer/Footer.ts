import Builder from '../builder/Builder';
import './style.scss';

export class Footer {
    private _element: HTMLElement;
    private _container: HTMLElement;

    constructor() {
        const builder = new Builder().createElement;

        const authorLink = <HTMLParagraphElement>builder('p', {
            content: 'by <a href="https://github.com/Wsko-12" target="_blank">Vlad Vasko</a>, 2022',
        });

        const description = <HTMLParagraphElement>builder('p', {
            content: 'No any lib used',
        });

        const descriptionContainer = <HTMLDivElement>builder('div', {
            classes: ['footer__description'],
            content: [authorLink, description],
        });

        const link = <HTMLAnchorElement>builder('a', {
            attrs: {
                target: '_blank',
                href: 'https://rs.school/js/',
            },
        });

        const logo = <HTMLDivElement>builder('div', {
            classes: 'footer__logo',
            content: [link],
        });

        this._container = <HTMLDivElement>builder('div', {
            classes: 'footer__container',
            content: [logo, descriptionContainer],
        });

        this._element = <HTMLElement>builder('footer', {
            classes: 'footer',
            content: [this._container],
        });
    }

    public getElement(): HTMLElement {
        return this._element;
    }
}
