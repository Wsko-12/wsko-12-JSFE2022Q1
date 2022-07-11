import { CompanyCountry, LogoColor } from '../../../../../interface/interface';

type Callback = (data: number | LogoColor[] | CompanyCountry[], data2?: number) => void;

export default abstract class SettingsElement {
    protected abstract onChange<T>(data?: T): void;
    public abstract reset(): void;
    public abstract getElement(): HTMLElement;

    protected _onChangeCallback: Callback | null = null;

    public setChangeCallback(callback: Callback): void {
        this._onChangeCallback = callback;
    }
}
