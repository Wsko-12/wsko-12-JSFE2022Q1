import { EAppPages, EConstants, EHTMLDataSet } from '../../typescript/enums';
import PageBuilder from '../utils/PageBuilder';
// eslint-disable-next-line import/no-cycle
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';
import './style.scss';

export default class View {
    public static showError(msg: string) {
        const title = <HTMLHeadingElement>PageBuilder.createElement('h1', {
            classes: 'error__title',
            content: 'ERROR',
        });

        const subtitle = <HTMLHeadingElement>PageBuilder.createElement('h3', {
            classes: 'error__subtitle',
            content: msg,
        });
        const errorMessage = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'error',
            content: [title, subtitle],
        });

        document.body.append(errorMessage);
        setTimeout(() => {
            errorMessage.remove();
        }, EConstants.ERROR_SHOW_TIME);
    }

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
                const page = <EAppPages>button.dataset[EHTMLDataSet.page];
                if (page) {
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
                [EHTMLDataSet.page]: EAppPages.garage,
            },
        });
        const winners = <HTMLButtonElement>PageBuilder.createElement('button', {
            classes: 'button header__buttons header__buttons_winners',
            content: 'To Winners',
            dataset: {
                [EHTMLDataSet.page]: EAppPages.winners,
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
