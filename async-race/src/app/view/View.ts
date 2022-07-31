import { EAppPages } from '../../typescript/enums';
import { isAppPage } from '../../typescript/typeguards';
import PageBuilder from '../utils/PageBuilder';
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';
import './style.scss';

export default class View {
    private _elements: {
        header: HTMLElement;
        main: HTMLElement;
    };

    private _pages = {
        [EAppPages.garage]: new Garage(),
        [EAppPages.winners]: new Winners(),
    };

    private _currentPage: EAppPages | null = null;

    constructor() {
        const headerButtons = this.createHeaderButtons();
        const header = PageBuilder.createElement('header', {
            classes: 'header',
            content: headerButtons,
        });

        this._elements = {
            header,
            main: PageBuilder.createElement('main'),
        };

        this.applyEvents();

        this.renderPage(EAppPages.garage);
    }

    private applyEvents() {
        const { header } = this._elements;
        header.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) {
                const button = <HTMLElement>e.target;
                const { page } = button.dataset;
                if (page && isAppPage(page)) {
                    this.renderPage(page);
                }
            }
        });
    }

    private createHeaderButtons(): [HTMLButtonElement, HTMLButtonElement] {
        const garage = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button header__buttons header__buttons_garage',
            content: 'To Garage',
            dataset: {
                page: EAppPages.garage,
            },
        });
        const winners = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button header__buttons header__buttons_winners',
            content: 'To Winners',
            dataset: {
                page: EAppPages.winners,
            },
        });

        return [garage, winners];
    }

    private renderPage(page: EAppPages) {
        if (this._currentPage === page) {
            return;
        }
        this._currentPage = page;
        const { main } = this._elements;
        main.innerHTML = '';
        if (page === EAppPages.winners) {
            this._pages[page].update();
        }
        main.append(this._pages[page].getElement());
    }

    public render() {
        document.body.append(this._elements.header, this._elements.main);
    }
}
