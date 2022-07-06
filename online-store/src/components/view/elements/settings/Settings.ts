import Builder from '../builder/Builder';
import RangeElement from './range/RangeElement';
import './style.scss';
class Settings {
    build(): HTMLElement {
        const build = new Builder();
        const builder = build.createElement;

        const element = builder('aside', {
            classes: 'side',
        });

        const searchInput = builder('input', {
            classes: ['search'],
            attrs: {
                type: 'text',
                placeholder: 'Search company...',
            },
        });

        const findSection = builder('section', {
            classes: ['side-item', 'search-section'],
            content: [searchInput],
        });

        const priceRange = new RangeElement('priceRange', [0, 100]);
        const filterSection = builder('section', {
            classes: ['side-item', 'filter-section'],
            content: [priceRange.getElement()],
        });

        element.append(findSection, filterSection);
        return element;
    }
}
export default Settings;
