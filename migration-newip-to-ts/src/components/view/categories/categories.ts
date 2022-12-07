import {Category, SourceData, Chars, SourceDescription, ECategory} from '../../interface/interface';
import './categories.css';
import {isCategory} from "../../../utils/typeguards";

interface ICategoriesWithFavorite extends Partial<Record<ECategory, SourceData[]>> {
    [ECategory.Favorites]: SourceData[];
}

class Categories {
    private current: Category = 'A';
    private categories: ICategoriesWithFavorite = { [ECategory.Favorites]: [] };
    private all: SourceData[] = [];
    private isAlphabetChar(char: string) {
        if (isNaN(+char)) {
            return char in Chars;
        } else {
            return false;
        }
    }

    private isSourceInFavorite(sourceId: string): boolean {
        return this.categories.Favorites.some((item) => item.id === sourceId);
    }

    public draw(data: readonly SourceData[], favoriteSources: string[] = []): Category {
        data.forEach((item: SourceData) => {
            this.all.push(item);
            if (favoriteSources.includes(item.id)) this.categories.Favorites.push(item);
            const firstChar = item.name[0].toUpperCase();

            if (!isCategory(firstChar)) {
                throw new Error("[Categories] draw, typeof firstChar is not 'Category'")
            }

            // use enum, not strings
            const category = this.isAlphabetChar(firstChar) ? firstChar : ECategory.Others;

            const currentCategory = this.categories[category];

            if (!currentCategory) {
                this.categories[category] = [item];
            } else {
                currentCategory.push(item);
            }
        });

        const fragment = document.createDocumentFragment();
        const categoryItemTemp = document.querySelector('#categoryItemTemp') as HTMLTemplateElement;

        const categories = Object.keys(this.categories) as ECategory[];
        categories.forEach((char) => {
            const categoryClone = categoryItemTemp.content.cloneNode(true) as DocumentFragment;
            const title = categoryClone.querySelector('.category__item-name') as HTMLElement;
            title.textContent = char;

            const button = categoryClone.querySelector('.category__item') as HTMLElement;
            button.setAttribute('data-category-char', char);

            fragment.append(categoryClone);
        });

        this.current = this.categories.Favorites.length > 0 ? ECategory.Favorites : categories[1];

        const category = document.querySelector('.categories') as HTMLElement;
        category.append(fragment);

        return this.current;
    }

    public getSourcesByCategory(category: Category) {
        this.current = category;
        return this.categories[category];
    }

    public toggleFavoriteSource(sourceId: string): boolean {
        const index: number = this.categories.Favorites.findIndex((item) => item.id === sourceId);
        if (index >= 0) {
            this.categories.Favorites.splice(index, 1);
            return false;
        } else {
            const source: SourceData | undefined = this.all.find((item) => item.id === sourceId);
            if (source) this.categories.Favorites.push(source);
            return true;
        }
    }

    public getCurrentCategory(): Category {
        return this.current as Category;
    }

    public getSourceDescription(sourceId?: string): SourceDescription | null {
        if (!sourceId) return null;
        const source: SourceData | undefined = this.all.find((item: SourceData) => item.id === sourceId);
        if (!source) return null;

        const description: SourceDescription = {
            name: source.name,
            inFavorite: this.isSourceInFavorite(sourceId),
        };
        return description;
    }
}

export default Categories;
