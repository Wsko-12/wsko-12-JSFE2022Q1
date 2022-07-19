import { CompanyCountry, LogoColor } from '../../../../../interface/interface';

// type SettingsElementOnChangeCallback = (data: number | LogoColor[] | CompanyCountry[], data2?: number) => void;

interface SettingsElementOnChangeCallback {
    (data: LogoColor[], data2?: number): void;
    (data: CompanyCountry[], data2?: number): void;
    (data: number, data2: number): void;
}

export default abstract class SettingsElement {
    protected abstract onChange<T>(data?: T): void;
    public abstract reset(): void;
    public abstract getElement(): HTMLElement;

    protected _onChangeCallback: SettingsElementOnChangeCallback | null = null;

    public setChangeCallback(callback: SettingsElementOnChangeCallback): void {
        this._onChangeCallback = callback;
    }
}
