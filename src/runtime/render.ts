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

    if (component.script.components) {
        for (const [name, componentChild] of Object.entries(component.script.components)) {
            const nodes = target.querySelectorAll(name.toLowerCase());
            nodes.forEach(node => {
                node.innerHTML = '';
                mountComponent(componentChild, node);
            });
        }
    }

}
