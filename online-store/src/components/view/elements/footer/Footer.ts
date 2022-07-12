import Builder from '../builder/Builder';
import './style.scss';

//TODO
/*
    1. Footer
    3. card selected
    4. Извините, все слоты заполнены
    5. tests
*/

export class Footer {
    private _element: HTMLElement;
    private _container: HTMLElement;

    constructor() {
        const builder = new Builder().createElement;

        const authorLink = builder('p', {
            content: 'by <a href="https://github.com/Wsko-12" target="_blank">Vlad Vasko</a>, 2022',
        });

        const description = builder('p', {
            content: 'No any lib used',
        });

        const descriptionContainer = builder('div', {
            classes: ['footer__description'],
            content: [authorLink, description],
        });

        const link = builder('a', {
            attrs: {
                target: '_blank',
                href: 'https://rs.school/js/',
            },
        });

        const logo = builder('div', {
            classes: 'footer__logo',
            content: [link],
        });

        this._container = builder('div', {
            classes: 'footer__container',
            content: [logo, descriptionContainer],
        });

        this._element = builder('footer', {
            classes: 'footer',
            content: [this._container],
        });
    }

    public getElement(): HTMLElement {
        return this._element;
    }
}
