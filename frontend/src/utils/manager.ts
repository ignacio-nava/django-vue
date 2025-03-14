import { createApp, type DefineComponent } from "vue";

export const getProps =  (
    propsNames: string[], 
    element: HTMLElement,
): Record<string, string | null>  => {
    let props = {};
    if (element.dataset) {
        for (let i = 0; i < propsNames.length; i++) {
            const propName = propsNames[i];
            const propValue = element.dataset[propName] ? element.dataset[propName] : null;
            props = { ...props, [propName]: propValue }
        };
    };

    return props;
}

export const injectScript = <T>(
    propsNames: string[] | null,
    element: HTMLElement,
    view: DefineComponent<T, {}, any> // T: props del componente, {}: estados y any: opciones adicionales
): void => {
    const props = propsNames && getProps(propsNames, element);
    const app = createApp(view, props || null);
    app.mount(element);
};