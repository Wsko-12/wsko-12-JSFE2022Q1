import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'a716cebce9c94d59b9158a8208390022', // cff3ced2f2354c3a9a1ac0feb8176ccc
        });
    }
}

export default AppLoader;
