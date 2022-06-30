class LocalStorage {
    private static _singleton: LocalStorage;
    constructor() {
        if (!LocalStorage._singleton) {
            LocalStorage._singleton = this;
        }
        return LocalStorage._singleton;
    }
    public read<T>(property: string): T | null {
        const item: string | null = window.localStorage.getItem(property);
        return item ? JSON.parse(item) : null;
    }
    private set<T>(property: string, value: T): void {
        window.localStorage.setItem(property, JSON.stringify(value));
    }
    public toggleSourceInFavorites(sourceId: string): void {
        const favorites = <string[] | null>this.read('favoriteSources');
        if (!favorites) {
            this.set('favoriteSources', [sourceId]);
        } else {
            const index: number = favorites.indexOf(sourceId);
            if (index === -1) {
                favorites.push(sourceId);
            } else {
                favorites.splice(index, 1);
            }

            this.set('favoriteSources', favorites);
        }
    }
}

export default LocalStorage;
