import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'cff3ced2f2354c3a9a1ac0feb8176ccc',
        });
    }
}

export default AppLoader;
