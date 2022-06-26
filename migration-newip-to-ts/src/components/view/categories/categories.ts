import { Char, SourceData, Chars } from '../../interface/interface';
import './categories.css';

class Categories {
    private current = 'A';
    private categories: { [key: string]: SourceData[] } = { Favorites: [] };
    private all: SourceData[] = [];
    private isAlphabetChar(char: string): boolean {
        if (isNaN(+char)) {
            return char in Chars;
        } else {
            return false;
        }
    }
    public draw(data: readonly SourceData[], favoriteSources: string[] = []): Char {
        data.forEach((item) => {
            this.all.push(item);
            if (favoriteSources.includes(item.id)) this.categories.Favorites.push(item);
            const firstChar = item.name[0].toUpperCase();

            const category: string = this.isAlphabetChar(firstChar) ? firstChar : 'Other';
            if (!this.categories[category]) {
                this.categories[category] = [];
            }
            this.categories[category].push(item);
        });

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const categoryItemTemp = document.querySelector('#categoryItemTemp') as HTMLTemplateElement;

        const categories: string[] = Object.keys(this.categories);
        categories.forEach((char: string) => {
            const categoryClone = categoryItemTemp.content.cloneNode(true) as DocumentFragment;
            const title = categoryClone.querySelector('.category__item-name') as HTMLElement;
            title.textContent = char;

            const button = categoryClone.querySelector('.category__item') as HTMLElement;
            button.setAttribute('data-category-char', char);

            fragment.append(categoryClone);
        });

        this.current = this.categories.Favorites.length > 0 ? 'Favorites' : categories[1];

        const category = document.querySelector('.categories') as HTMLElement;
        category.append(fragment);

        return this.current as Char;
    }

    public getSourcesByCategory(category: Char): SourceData[] {
        this.current = category;
        return this.categories[category];
    }

    public toggleFavoriteSource(sourceId: string) {
        const index: number | boolean = this.categories.Favorites.findIndex((item) => item.id === sourceId);
        if (index >= 0) {
            this.categories.Favorites.splice(index, 1);
        } else {
            const source: SourceData | undefined = this.all.find((item) => item.id === sourceId);
            if (source) this.categories.Favorites.push(source);
        }
    }

    public getCurrentCategory() {
        return this.current as Char;
    }
}

export default Categories;
