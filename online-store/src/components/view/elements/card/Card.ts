import { IDataItem } from '../../../../interface/interface';
import Builder from '../builder/Builder';
import './style.scss';

class Card {
    public company: IDataItem;
    private _element: HTMLElement;
    public static getFormattedEmployeeCount(count: number): string {
        return count
            .toString()
            .split('')
            .reverse()
            .map((item, i) => {
                if (i % 3 === 0 && i != 0) {
                    return item + ',';
                }
                return item;
            })
            .reverse()
            .join('');
    }

    constructor(data: IDataItem) {
        this.company = data;

        const builder = new Builder().createElement;

        const image = <HTMLImageElement>builder('img', {
            classes: 'card__image',
        });
        image.src = this.company.logoUrl;

        const title = <HTMLHeadingElement>builder('h3', {
            classes: 'card__title',
            content: this.company.name,
        });

        const year = <HTMLParagraphElement>builder('p', {
            classes: 'card__year',
            content: this.company.year.toString(),
        });

        const flag = <HTMLDivElement>builder('div', {
            classes: ['card__flag', 'flag', `flag_${this.company.country.toLowerCase()}`],
        });

        const subtitle = <HTMLDivElement>builder('div', {
            classes: 'card__subtitle',
            content: [year, flag],
        });

        const employees = <HTMLParagraphElement>builder('p', {
            classes: 'card__employees',
            content: '<b>Employees:</b> ' + Card.getFormattedEmployeeCount(this.company.employees),
        });

        const caption = <HTMLElement>builder('figcaption', {
            classes: ['card__caption'],
            content: [title, subtitle, employees, this.createPriceElement()],
        });

        if (this.company.discount > 0) {
            const discount = <HTMLDivElement>builder('div', {
                classes: ['card__discount'],
                content: -this.company.discount + '%',
            });
            caption.append(discount);
        }

        const inBasketMarker = <HTMLDivElement>builder('div', {
            classes: ['card__marker'],
        });

        this._element = <HTMLElement>builder('figure', {
            classes: ['card'],
            dataset: {
                company: this.company.name,
            },
            content: [image, caption, inBasketMarker],
        });
    }

    public getElement(): HTMLElement {
        return this._element;
    }

    public markInBasket(inBasket: boolean): void {
        if (inBasket) {
            this._element.classList.add('card_in-basket');
        } else {
            this._element.classList.remove('card_in-basket');
        }
    }

    private createPriceElement(): HTMLElement {
        const builder = new Builder().createElement;
        let element: HTMLElement;
        const price = this.company.price;
        const discount = this.company.discount;

        const priceFormatted = (Math.floor((price / 10 ** 9) * 100) / 100).toString();
        if (discount > 0) {
            const priceWithDiscount = price - price * (discount / 100);
            const priceWithDiscountFormatted = (Math.floor((priceWithDiscount / 10 ** 9) * 100) / 100).toString();
            element = <HTMLParagraphElement>builder('p', {
                classes: 'card__price',
                content: `<s>$${priceFormatted}b</s> <b>$${priceWithDiscountFormatted}B</b>`,
            });
        } else {
            element = <HTMLParagraphElement>builder('p', {
                classes: 'card__price',
                content: `$${priceFormatted}B`,
            });
        }

        return element;
    }
}
export default Card;
