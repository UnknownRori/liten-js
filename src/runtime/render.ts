import { LitenComponent } from "../types/liten";

export function renderTemplate(template: string, ctx: Record<string, any>): string {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        const val = ctx[key.trim()];
        return val !== undefined ? val : '';
    });
}

export function mountComponent(component: LitenComponent, target: HTMLElement) {
    if (component.script.mounted) component.script.mounted()
    const ctx = component.script.data ? component.script.data() : {};

    target.innerHTML = renderTemplate(component.template, ctx);
}
