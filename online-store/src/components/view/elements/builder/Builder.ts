interface createElementProps {
    classes?: string[] | string;
    id?: string;
    attrs?: { [key: string]: string | number | boolean };
    dataset?: { [key: string]: string | number };
    content?: string | (HTMLElement | string)[] | HTMLElement;
}

const prepareClassString = (str: string) => {
    return str
        .replace(/,/g, ' ')
        .replace(/\./g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
};

const prepareIdString = (str: string) => {
    return str
        .replace(/#/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
};

class Builder {
    public static createElement<T extends HTMLElement>(tag = 'div', properties: createElementProps = {}): T {
        const element = <T>document.createElement(tag);

        if (properties.classes) {
            let classesParsed: string[];
            if (typeof properties.classes === 'string') {
                classesParsed = prepareClassString(properties.classes).split(' ');
            } else {
                classesParsed = properties.classes.map((item) => prepareClassString(item));
            }
            element.classList.add(...classesParsed);
        }

        if (properties.id) {
            element.id = prepareIdString(properties.id);
        }

        if (properties.attrs) {
            for (const attr in properties.attrs) {
                const value = properties.attrs[attr];
                element.setAttribute(attr, value.toString());
            }
        }

        if (properties.dataset) {
            for (const key in properties.dataset) {
                const value = properties.dataset[key];
                element.dataset[key] = value.toString();
            }
        }

        if (properties.content) {
            if (typeof properties.content === 'string') {
                element.innerHTML = properties.content;
            } else if (properties.content instanceof HTMLElement) {
                element.append(properties.content);
            } else if (Array.isArray(properties.content)) {
                properties.content.forEach((item) => {
                    if (typeof item === 'string') {
                        element.insertAdjacentHTML('beforeend', item);
                    } else {
                        element.append(item);
                    }
                });
            }
        }
        return element;
    }
}
export default Builder;
