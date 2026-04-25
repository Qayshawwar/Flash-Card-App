// FR-01, FR-22, FR-23: supported import file formats and their text-extraction functions.
// To add a new format: add one entry to PARSERS with its mimetype and an ExtractFn.
// Note: 'application/pdf' is export-only and must NOT be added here.

export type ExtractFn = (buffer: Buffer) => string;

const csvExtract: ExtractFn = (buffer) => {
    const lines = buffer.toString('utf-8').split(/\r?\n/).filter(l => l.trim());
    const start = lines[0].toLowerCase().replace(/\s/g, '') === 'question,answer' ? 1 : 0;
    return lines.slice(start).map(line => {
        const comma = line.indexOf(',');
        if (comma === -1) return '';
        const q = line.slice(0, comma).trim().replace(/^"|"$/g, '');
        const a = line.slice(comma + 1).trim().replace(/^"|"$/g, '');
        return `Q: ${q}\nA: ${a}`;
    }).filter(Boolean).join('\n\n');
};

export const PARSERS = new Map<string, ExtractFn>([
    ['text/plain', (buffer) => buffer.toString('utf-8')],
    ['text/csv', csvExtract],
    // Windows browsers often report CSV as application/vnd.ms-excel
    ['application/vnd.ms-excel', csvExtract],
    ['application/json', (buffer) => {
        const data = JSON.parse(buffer.toString('utf-8')) as Array<{ question: string; answer: string }>;
        return data.map(({ question, answer }) => `Q: ${question}\nA: ${answer}`).join('\n\n');
    }],
]);
