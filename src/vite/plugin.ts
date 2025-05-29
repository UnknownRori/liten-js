import { Plugin } from 'vite';
import fs from 'fs/promises';
import path from 'path';

export default function Liten(): Plugin {
    return {
        name: 'liten',
        enforce: "pre",
        async resolveId(id, importer) {
            if (id.endsWith(".html")) {
                if (!path.isAbsolute(id) && importer) {
                    const resolved = path.resolve(path.dirname(importer), id);
                    return resolved;
                }
                return id;
            }
            return null;
        },
        async load(id) {
            if (!id.endsWith(".html")) return;

            const tsPath = id.replace(/\.html$/, '.ts');
            const html = await fs.readFile(id, 'utf-8');

            const compiled = `
            import logic from '${tsPath}';
            const template = \`${html}\`;

            import { mountComponent } from '/src/runtime';

            export default function mount(target) {
            mountComponent(target, template, logic);
            }
            `;

            return compiled;
        }
    }
}
