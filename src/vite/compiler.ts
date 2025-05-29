import * as acorn from 'acorn';
import { CodeExtraction } from "./transform";

function extractDefaultExport(code: string, ast: acorn.Program): string | null {
    for (const node of ast.body) {
        if (node.type === 'ExportDefaultDeclaration') {
            const start = node.declaration.start;
            const end = node.declaration.end;
            return code.slice(start, end);
        }
    }

    return null
}

export function compileToJs(code: CodeExtraction): string {
    const ast = acorn.parse(code.script, {
        sourceType: 'module',
        ecmaVersion: 'latest'
    })

    const scriptContent = extractDefaultExport(code.script, ast);
    if (scriptContent == null) throw new Error("[Fatal] Invalid component script");

    const generated = `
export default {
    id: "${code.id}",
    template: \`${code.template}\`,
    script: ${scriptContent},
};
`

    return generated;
}
