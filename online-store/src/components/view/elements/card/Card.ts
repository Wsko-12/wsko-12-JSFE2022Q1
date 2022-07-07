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
        this._element = this.build();
    }
    private build(): HTMLElement {
        const builder = new Builder().createElement;

        const image = builder('img', {
            classes: 'card__image',
        }) as HTMLImageElement;
        image.src = this.company.logoUrl;

        const title = builder('h3', {
            classes: 'card__title',
            content: this.company.name,
        });
        const year = builder('p', {
            classes: 'card__year',
            content: this.company.year.toString(),
        });
        // const country = builder

        const employees = builder('p', {
            classes: 'card__employees',
            content: '<b>Employees:</b> ' + Card.getFormattedEmployeeCount(this.company.employees),
        });

        const caption = builder('figcaption', {
            classes: ['card__caption'],
            content: [title, year, employees, this.createPriceElement()],
        });

        if (this.company.discount > 0) {
            const discount = builder('figcaption', {
                classes: ['card__discount'],
                content: -this.company.discount + '%',
            });
            caption.append(discount);
        }

        const element = builder('figure', {
            classes: ['card'],
            content: [image, caption],
        });
        return element;
    }
    public getElement(): HTMLElement {
        return this._element;
    }
    private createPriceElement(): HTMLElement {
        const builder = new Builder().createElement;
        let element: HTMLElement;
        const price = this.company.price;
        const discount = this.company.discount;

        const priceFormatted = (Math.floor((price / 10 ** 9) * 100) / 100).toString();
        if (discount > 0) {
            const priceWithDiscount = price - price * (discount / 100);
            const priceWithDiscoutnFormatted = (Math.floor((priceWithDiscount / 10 ** 9) * 100) / 100).toString();
            element = builder('p', {
                classes: 'card__price',
                content: `<s>$${priceFormatted}b</s> <b>$${priceWithDiscoutnFormatted}b</b>`,
            });
        } else {
            element = builder('p', {
                classes: 'card__price',
                content: `$${priceFormatted}b`,
            });
        }

        return element;
    }
}
export default Card;
