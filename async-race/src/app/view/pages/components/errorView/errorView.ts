import {EConstants} from '../../../../../typescript/enums';
import PageBuilder from '../../../../utils/PageBuilder';

export default class ErrorView {
    public static showError(msg: string) {
        const title = <HTMLHeadingElement>PageBuilder.createElement('h1', {
            classes: 'error__title',
            content: 'ERROR',
        });

        const subtitle = <HTMLHeadingElement>PageBuilder.createElement('h3', {
            classes: 'error__subtitle',
            content: msg,
        });
        const errorMessage = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'error',
            content: [title, subtitle],
        });

        document.body.append(errorMessage);
        setTimeout(() => {
            errorMessage.remove();
        }, EConstants.ERROR_SHOW_TIME);
    }
}
