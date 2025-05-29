export function renderTemplate(template: string, ctx: Record<string, any>): string {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        const val = ctx[key.trim()];
        return val !== undefined ? val : '';
    });
}

export function mountComponent(
    target: HTMLElement,
    template: string,
    logic: any
) {
    const ctx = logic.data ? logic.data() : {};
    const html = renderTemplate(template, ctx);
    const el = document.createElement('div');
    el.innerHTML = html;
    target.appendChild(el);

    if (logic.components) {
        for (const [name, mountFn] of Object.entries(logic.components)) {
            const nodes = el.querySelectorAll(name.toLowerCase());
            nodes.forEach(node => {
                node.innerHTML = '';
                mountFn(node);
            });
        }
    }
}
