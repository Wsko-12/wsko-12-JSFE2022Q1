import { ECompanyCountry, ELogoColor } from '../../../../../interface/interface';

type Callback = (data: number | ELogoColor[] | ECompanyCountry[], data2?: number) => void;

export default abstract class SettingsElement {
    protected abstract onChange<T>(data?: T): void;
    public abstract reset(): void;
    public abstract getElement(): HTMLElement;

    protected _onChangeCallback: Callback | null = null;

    public setChangeCallback(callback: Callback): void {
        this._onChangeCallback = callback;
    }
}
