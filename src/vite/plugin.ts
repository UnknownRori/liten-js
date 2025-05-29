import { Plugin } from 'vite';
import { extract } from './transform';
import { compileToJs } from './compiler';
import path from 'path';

export default function Liten(): Plugin {
    return {
        name: 'liten',
        enforce: "pre",
        async resolveId(id, importer) {
            if (id.endsWith(".lt")) {
                if (!path.isAbsolute(id) && importer) {
                    const resolved = path.resolve(path.dirname(importer), id);
                    return resolved;
                }
                return id;
            }
            return null;
        },
        async transform(code, id) {
            if (!id.endsWith(".lt")) return;


            const extractedCode = extract(code, id);

            return {
                code: compileToJs(extractedCode),
                map: null,
            }
        }
    }
}
