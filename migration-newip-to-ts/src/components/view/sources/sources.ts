import './sources.css';
import { SourceData } from '../../interface/interface';

class Sources {
    public draw(data: readonly SourceData[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const title = sourceClone.querySelector('.source__item-name') as HTMLElement;
            title.textContent = item.name;

            const button = sourceClone.querySelector('.source__item') as HTMLElement;
            button.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const source = document.querySelector('.sources') as HTMLElement;
        source.append(fragment);
    }
}

export default Sources;
