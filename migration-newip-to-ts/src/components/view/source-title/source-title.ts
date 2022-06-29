import { SourceDescription } from '../../interface/interface';
import './source-title.css';

class SourceTitle {
    public draw(sourceDescription: SourceDescription | null): void {
        const container = document.querySelector('.title-container') as HTMLElement;
        if (!sourceDescription) {
            container.style.display = 'none';
            return;
        }
        this.updateFavoriteButton(sourceDescription.inFavorite);
        container.style.display = 'flex';
        const title = document.querySelector('.source-title') as HTMLElement;
        title.innerHTML = sourceDescription.name;
    }
    public updateFavoriteButton(inFavorite: boolean): void {
        const button = document.querySelector('#addToFavoriteBtn') as HTMLElement;
        if (inFavorite) {
            button.classList.add('favorite-btn_active');
        } else {
            button.classList.remove('favorite-btn_active');
        }
    }
}

export default SourceTitle;
