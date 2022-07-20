type SettingsElementOnChangeCallback = (data: number | string[], data2?: number) => void;

export default abstract class SettingsElement {
    protected abstract onChange<T>(data?: T): void;
    public abstract reset(): void;
    public abstract getElement(): HTMLElement;

    protected _onChangeCallback: SettingsElementOnChangeCallback | null = null;

    public setChangeCallback(callback: SettingsElementOnChangeCallback): void {
        this._onChangeCallback = callback;
    }
}
