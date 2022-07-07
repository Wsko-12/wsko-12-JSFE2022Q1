import Builder from '../builder/Builder';
import './style.scss';
class Header {
    build(): HTMLElement {
        const builder = new Builder().createElement;

        const logo = builder('h1', {
            classes: ['logo', 'header__logo'],
            content: 'Com<span class="logo-span">Store</span>',
        });

        const basketCounter = builder('div', {
            classes: ['basket-icon__counter', 'basket-icon__counter_hidden'],
            content: `20`,
        });

        const basketIcon = builder('object', {
            classes: 'basket-icon',
            content: `
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21">
                <path fill-rule="evenodd" clip-rule="evenodd" d="
                        M8 1c0 1-3.5 1-4 1S0 2 0 1s3.5-1 4-1 4 0 4 1zm2.7 13.9a1 1 0 01-1.1-.6l-2.9-8a1 
                        1 0 011-1.3l15.3.2c.6 0 1 .6 1 1.2l-1.3 6c0 .3-.4.6-.8.7L10.7 15zm.6 3.5a2 2 0 
                        11-4.1 0 2 2 0 014.1 0zm8.3 2.1a2 2 0 100-4.2 2 2 0 000 4.2z" fill="white"/>
                </svg>`,
        });

        const basket = builder('div', {
            classes: 'basket',
            content: [basketIcon, basketCounter],
        });

        const container = builder('div', {
            classes: 'header__container',
            content: [logo, basket],
        });

        const element = builder('header', {
            classes: 'header',
            content: [container],
        });

        return element;
    }
}
export default Header;
