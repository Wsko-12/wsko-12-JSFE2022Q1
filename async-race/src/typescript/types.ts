export type TColorHEX = `#${string}`;

export type TCarRedactorCallback = (name: string, color: string, clear: () => void) => void;

export type TCarMenuEditorCallback = (name: string, color: string) => Promise<undefined>;
