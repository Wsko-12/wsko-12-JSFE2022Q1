import { Char, SourceData, Chars } from '../../interface/interface';
import './categories.css';

class Categories {
    private current = 'A';
    private categories: { [key: string]: SourceData[] } = {};
    private isAlphabetChar(char: string): boolean {
        if (isNaN(+char)) {
            return char in Chars;
        } else {
            return false;
        }
    }
    public draw(data: readonly SourceData[]): Char {
        data.forEach((item) => {
            const firstChar = item.name[0].toUpperCase();

            const category: string = this.isAlphabetChar(firstChar) ? firstChar : 'Other';
            if (!this.categories[category]) {
                this.categories[category] = [];
            }
            this.categories[category].push(item);
        });

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const categoryItemTemp = document.querySelector('#categoryItemTemp') as HTMLTemplateElement;

        Object.keys(this.categories).forEach((char: string, i: number) => {
            if (i === 0) this.current = char;
            const categoryClone = categoryItemTemp.content.cloneNode(true) as DocumentFragment;
            const title = categoryClone.querySelector('.category__item-name') as HTMLElement;
            title.textContent = char;

            const button = categoryClone.querySelector('.category__item') as HTMLElement;
            button.setAttribute('data-category-char', char);

            fragment.append(categoryClone);
        });

        const category = document.querySelector('.categories') as HTMLElement;
        category.append(fragment);

        return this.current as Char;
    }

    public getSources(char: Char): SourceData[] {
        return this.categories[char];
    }
}

export default Categories;
