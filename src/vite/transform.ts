import path from 'path';

export interface CodeExtraction {
    id: string,
    template: string,
    script: string,

}

export function extract(code: string, id: string): CodeExtraction {
    const templateMatch = code.match(/<template[^>]*>([\s\S]*?)<\/template>/);
    const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/);

    const templateContent = templateMatch?.[1]?.trim() ?? '';
    const scriptContent = scriptMatch?.[1]?.trim() ?? '';

    return {
        id: path.parse(id).name,
        template: templateContent,
        script: scriptContent,
    }
}
