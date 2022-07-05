import { IDataItem } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import './style.scss';

class Card {
    public company: IDataItem;
    private _element: HTMLElement;

    constructor(data: IDataItem) {
        this.company = data;
        this._element = this.build();
    }
    private build(): HTMLElement {
        const builder = new Builder().createElement;

        const image = builder('img', {
            classes: ['card__image'],
        }) as HTMLImageElement;
        image.src = this.company.logoUrl;

        const title = builder('h3', {
            content: this.company.name,
        });

        const caption = builder('figcaption', {
            classes: ['card__caption'],
            content: [title],
        });
        const element = builder('figure', {
            classes: ['card'],
            content: [image, caption],
        });
        return element;
    }
    public getElement(): HTMLElement {
        return this._element;
    }
}
export default Card;
