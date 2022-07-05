import Header from './header/Header';

class AppView {
    private header: Header = new Header();
    init() {
        this.header.init();
    }
}
export default AppView;
