import Builder from '../builder/Builder';
import './style.scss';
class Settings {
    build(): HTMLElement {
        const builder = new Builder().createElement;

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
        element.append(findSection);

        return element;
    }
}
export default Settings;
