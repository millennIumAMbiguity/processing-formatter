import * as vscode from 'vscode';

export function isOpperator(s: string): boolean {
    return (s === '=' || s === '<' || s === '>' || s === '&' || s === '!' || s === '|' || s === '%' || s === '?' || s === ':' || s === '~' || s === '^'
        || s === '+' || s === '-' || s === '*' || s === '/');
}

export function newRange(line: vscode.TextLine, k: number, n: number): vscode.Range {
    return new vscode.Range(line.range.start.translate(0, k + n), line.range.start.translate(0, k + n + 1));
}

export function getCharacterRepets(s: string, c: string, startId: number, n: number): boolean {
    for (let i = startId; i < startId + n; i++) {
        if (s[i] !== c) {
            return false;
        }
    }
    return true;
}
export function isInRange(s: string, c: string, startId: number, n: number): number {
    let i = 0;
    for (i = startId; i < startId + n; i++) {
        if (s[i] !== c) {
            return i - startId;
        }
    }
    return i;
}
export function charExistInRange(s: string, c: string, startId: number, n: number): boolean {
    for (let i = startId; i < startId + n; i++) {
        if (s[i] === c) {
            return true;
        }
    }
    return false;
}