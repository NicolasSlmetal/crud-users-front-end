export interface ButtonItem {
    type: "button";
    text: string;
    extraClasses? : string[];
    callback: (...params: any) => any
}