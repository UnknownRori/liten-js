import { Plugin } from 'vite';
import { extract } from './transform';
import { compileToJs } from './compiler';

export default function Liten(): Plugin {
    return {
        name: 'liten',
        enforce: "pre",
        async transform(code, id) {
            if (!id.endsWith(".lt")) return;


            console.log();
            const extractedCode = extract(code, id);

            return {
                code: compileToJs(extractedCode),
                map: null,
            }
        }
    }
}
