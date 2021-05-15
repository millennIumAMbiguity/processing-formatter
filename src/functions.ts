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
export function getAmountCharacterRepets(s: string, c: string, startId: number): number {
    let count: number = 0;
    for (let i = startId; i < s.length; i++) {
        if (s[i] !== c) {
            break;
        }
        count++;
    }
    return count;
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
export function getArguments(s: string, ignoreFormatting: boolean, ignoreSpacing: boolean): boolean[] {
    let argumentsArray: string[] = s.split('[');
    for (let index = 1; index < argumentsArray.length; index++) {
        let tempArray: string[] = argumentsArray[index].split(']');
        if (tempArray.length <= 1) {
            continue;
        }
        let argument: string = tempArray[0];
        argument.toLocaleLowerCase();
        argument = argument.replace(' ', '');
        switch (argument) {
            case "ignoreformatting":
                ignoreFormatting = true;
                break;
            case "formatting":
                ignoreFormatting = !ignoreFormatting;
                break;
            case "applyformatting":
                ignoreFormatting = false;
                break;
            case "ignorespacing":
                ignoreSpacing = true;
                break;
            case "spacing":
                ignoreSpacing = !ignoreSpacing;
                break;
            case "applyspacing":
                ignoreSpacing = false;
                break;
        }
    }
    return [ignoreFormatting, ignoreSpacing];
}