interface createElementProps {
    classes?: string[] | string | null;
    id?: string | null;
    attrs?: { [key: string]: string | number };
    dataset?: { [key: string]: string | number };
    content?: string | HTMLElement[];
}
class ElementsBuilder {
    private static _instance: ElementsBuilder;
    constructor() {
        if (!ElementsBuilder._instance) ElementsBuilder._instance = this;
        return ElementsBuilder._instance;
    }
    public createElement(tag: string, properties: createElementProps): HTMLElement {
        const element = document.createElement(tag) as HTMLElement;
        if (properties.classes) {
            if (typeof properties.classes === 'string') {
                element.classList.add(properties.classes);
            } else {
                element.classList.add(...properties.classes);
            }
        }
        if (properties.id) {
            element.id = properties.id;
        }

        if (properties.attrs) {
            for (const attr in properties.attrs) {
                const value: string | number = properties.attrs[attr];
                element.setAttribute(attr, value.toString());
            }
        }

        if (properties.dataset) {
            for (const key in properties.dataset) {
                const value: string | number = properties.dataset[key];
                element.dataset[key] = value.toString();
            }
        }

        if (properties.content) {
            if (typeof properties.content === 'string') {
                element.innerHTML = properties.content;
            } else {
                element.append(...properties.content);
            }
        }
        return element;
    }
}
export default ElementsBuilder;
