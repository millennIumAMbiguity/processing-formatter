'use strict';
//import { format } from 'path';
import * as vscode from 'vscode';
import { spacing } from './spacing';
import * as f from './functions';



export function activate(context: vscode.ExtensionContext) {

    vscode.languages.registerDocumentFormattingEditProvider('pde', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {

            //load settings
            const config = vscode.workspace.getConfiguration('processing-formatter');
            const editor = vscode.workspace.getConfiguration('editor');
            //get settings
            const ifAndForSpace = config.get('format.useSpaceAfterIfAndFor');
            const settingLog = config.get('interface.logChanges');
            const tabsize = editor.get('tabSize') as number;
            const insertSpaces = editor.get('insertSpaces') as boolean;

            let edit: vscode.TextEdit[] = [];
            let curlyBracketsCount: number = 0;
            let bracketsCount: number = 0;
            let bracketsTrack: number = -1;
            let comment: boolean = false;
            let bracketLessIf: boolean = false;
            let bracketLessIfs: number = 0;
            let bracketLessIfBracket: boolean = false;
            let isStatemnt: boolean = false;
            let isString: number = 0;
            let spaceTab: string = ' ';
            let isInsideACase: boolean = false;
            let caseBaseSpacing: number = -1;
            let ignoreSpacing: boolean = false;
            let ignoreFormatting: boolean = false;

            for (let i = 1; i < tabsize; i++) {
                spaceTab += ' ';
            }


            for (var _i = 0; _i < document.lineCount; _i++) {
                const line = document.lineAt(_i);
                const lineS = line.text;

                let baseSpace: number = curlyBracketsCount + bracketLessIfs;
                if (bracketLessIf) {
                    baseSpace++;
                }
                if (isInsideACase) {
                    baseSpace++;
                }

                if (!ignoreSpacing && !ignoreFormatting) {
                    var newBracketLessIf = spacing(edit, line, lineS, baseSpace, bracketLessIf, insertSpaces, tabsize, spaceTab, caseBaseSpacing);
                    if (bracketLessIf && !newBracketLessIf) {
                        baseSpace--;
                    }
                    bracketLessIf = newBracketLessIf;
                }


                //TODO: separate the formatting to its own file

                baseSpace--;
                if (!insertSpaces) {
                    baseSpace--;
                }
                if (baseSpace < 0) {
                    baseSpace = 0;
                }

                for (var _k = baseSpace; _k < lineS.length; _k++) {

                    if (ignoreFormatting) {

                        if (comment) {
                            if (lineS[_k] === '*' && lineS[_k + 1] === '/') { //end multiline comment
                                comment = false;
                            }
                            break;
                        }
                        if (lineS[_k] === '/') {
                            if (lineS[_k + 1] === '*') { //start multiline comment
                                comment = true;
                            } else if (lineS[_k + 1] === '/') {
                                let formatingARguments: boolean[] = f.getArguments(lineS, ignoreFormatting, ignoreSpacing);
                                ignoreFormatting = formatingARguments[0];
                                ignoreSpacing = formatingARguments[1];
                            }
                            break;
                        }
                        if (lineS[_k] !== ' ' && lineS[_k] !== '\t') {
                            break;
                        }

                    } else {

                        if (isString !== 0) {
                            if (isString === 1 && lineS[_k] === '"') { //string character: "
                                isString = 0;
                            } else if (isString === 2 && lineS[_k] === "'") { //string character: '
                                isString = 0;
                            }
                            continue;
                        }

                        if (_k + 1 < lineS.length) {

                            if (comment) {
                                if (lineS[_k] === '*' && lineS[_k + 1] === '/') { //end multiline comment
                                    _k++;
                                    comment = false;
                                }
                                continue;
                            }
                            if (lineS[_k] === '/') {
                                if (lineS[_k + 1] === '*') { //start multiline comment
                                    _k++;
                                    comment = true;
                                    break;
                                }
                                if (lineS[_k + 1] === '/') { //dont format comments
                                    let formatingARguments: boolean[] = f.getArguments(lineS, ignoreFormatting, ignoreSpacing);
                                    ignoreFormatting = formatingARguments[0];
                                    ignoreSpacing = formatingARguments[1];
                                    break;
                                }
                            }


                            if (lineS[_k] === ' ') {
                                if (_k > 0) {
                                    if (lineS[_k - 1] === '(') { //no space after "("
                                        edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                        continue;
                                    } else if (lineS[_k - 1] === '[') { //no space after "{"
                                        edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                        continue;
                                    } else if (lineS[_k - 1] === '.') { //no space after "."
                                        edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                        continue;
                                    }
                                }

                                if (lineS[_k + 1] === ';') { //no space before ";"
                                    edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                } else if (lineS[_k + 1] === '(') { //no space before "(" unless its after a if statment
                                    if (ifAndForSpace) {
                                        if (!(_k > 1 && lineS[_k - 2] === 'i' && lineS[_k - 1] === 'f') && //if
                                            !(_k > 2 && lineS[_k - 3] === 'f' && lineS[_k - 2] === 'o' && lineS[_k - 1] === 'r') && //for
                                            !(_k > 3 && lineS[_k - 4] === 'e' && lineS[_k - 3] === 'l' && lineS[_k - 2] === 's' && lineS[_k - 1] === 'e') && //else
                                            !(_k > 0 && f.isOpperator(lineS[_k - 1]))) { // opperator "+ ()"

                                            edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                        }
                                    } else if (!(_k > 0 && f.isOpperator(lineS[_k - 1]))) { // space betwin opperator and (
                                        edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                    }
                                } else if (lineS[_k + 1] === ')') { //no space before ")"
                                    edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                } else if (lineS[_k + 1] === '[') { //no space before "["
                                    edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                } else if (lineS[_k + 1] === ']') { //no space before "]"
                                    edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                } else if (lineS[_k + 1] === '.') { //no space before "."
                                    edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                }

                            } else {
                                if (lineS[_k] === ')') {
                                    if (lineS[_k + 1] === '{') { //add space betwin ")" and "{"
                                        edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k + 1), ' '));
                                    }
                                } else if (lineS[_k] === '}' && lineS[_k + 1] !== ' ' && lineS[_k + 1] !== undefined && lineS[_k + 1] !== ';') {
                                    edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k + 1), ' '));
                                } else if ((lineS[_k] === '(' || lineS[_k] === ',' || lineS[_k] === '=') && lineS[_k + 1] === ' ' && lineS[_k + 2] === '-') { // handle negativ numbers // if ( - 1, - 2) -> if ( -1, -2)
                                    _k += 3;
                                    if (lineS[_k] === ' ') {
                                        edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                                    }
                                    continue;
                                }

                                if (!(lineS[_k] === '-' && lineS[_k + 1] === '-') && //dont add spaces on --
                                    !(lineS[_k] === '+' && lineS[_k + 1] === '+') && //dont add spaces on ++
                                    !(!isStatemnt && (lineS[_k] === '<' || lineS[_k] === '>'))) {
                                    if (f.isOpperator(lineS[_k])) { // spaces before and after opperators. example if (i==0) -> if (i == 0)

                                        if (lineS[_k] === '!') { //for cases as: if (! boolValue) -> if (!boolValue)
                                            if (lineS[_k + 1] === ' ') {
                                                edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 1)));
                                            }
                                            continue;
                                        }
                                        if (lineS[_k] === '*' && _k > 0 && lineS[_k - 1] === '.') { //for cases as "import processing.pdf.*;"
                                            continue;
                                        }
                                        if (_k > 0 && (lineS[_k - 1] === '+' || lineS[_k - 1] === '-')) { //for -= or +=
                                            continue;
                                        }

                                        var isOpperatorK1 = f.isOpperator(lineS[_k + 1]);
                                        if (isOpperatorK1) {
                                            if (lineS[_k + 2] !== ' ') {
                                                edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k + 2), ' ')); //add space after double Opperator
                                            } /*else if ( lineS[_k + 3] === ' ') {
                                                                        edit.push(vscode.TextEdit.delete(f.newRange(line, _k+3, 0))); //remove double space after double Opperator
                                                                }*/
                                        }
                                        else {
                                            if (lineS[_k] === '!') { //for cases as "if (!boolValue)"
                                                continue;
                                            }
                                            if (lineS[_k + 1] !== ';' && lineS[_k + 1] !== ' ' && !isOpperatorK1) {
                                                edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k + 1), ' '));
                                            }
                                        }

                                        if (lineS.length > 0 && lineS[_k - 1] !== ' ' && !f.isOpperator(lineS[_k - 1])) { //space before opperator
                                            edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k), ' '));
                                        }
                                    }
                                }
                            }


                        } else if (comment) {
                            continue;
                        }
                        if (_k + 2 < lineS.length) {
                            if (lineS[_k] !== ' ') {
                                if (lineS[_k] === 'i' && lineS[_k + 1] === 'f' && //space betwin "if" and "("
                                    (lineS[_k + 2] === undefined || lineS[_k + 2] === '(' || lineS[_k + 2] === ' ')) {
                                    isStatemnt = true;
                                    if (bracketLessIf) {
                                        bracketLessIfs++;
                                    }
                                    bracketLessIf = true;
                                    if (ifAndForSpace && lineS[_k + 2] === '(') {
                                        edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k + 2), ' '));
                                        _k++;
                                    }
                                }
                                else if (lineS[_k] === 'f' && lineS[_k + 1] === 'o' && lineS[_k + 2] === 'r' && //space betwin "for" and "("
                                    (lineS[_k + 3] === undefined || lineS[_k + 3] === '(' || lineS[_k + 3] === ' ')) {
                                    isStatemnt = true;
                                    if (bracketLessIf) {
                                        bracketLessIfs++;
                                    }
                                    bracketLessIf = true;
                                    bracketsTrack = bracketsCount;
                                    if (ifAndForSpace && lineS[_k + 3] === '(') {
                                        edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k + 3), ' '));
                                        _k++;
                                    }
                                }
                                else if (_k + 3 < lineS.length) {
                                    if (lineS[_k] === 'e' && lineS[_k + 1] === 'l' && lineS[_k + 2] === 's' && lineS[_k + 3] === 'e' && //space betwin "else " and "("
                                        (lineS[_k + 4] === undefined || lineS[_k + 4] === '(' || lineS[_k + 4] === ' ') &&
                                        !(lineS[_k + 5] === 'i' && lineS[_k + 6] === 'f')) { //is not a "if else"
                                        if (bracketLessIf) {
                                            bracketLessIfs++;
                                        }
                                        bracketLessIf = true;
                                        if (ifAndForSpace && lineS[_k + 4] === '(') {
                                            edit.push(vscode.TextEdit.insert(line.range.start.translate(0, _k + 4), ' '));
                                            _k++;
                                        }
                                    }
                                    //gets spacing for switches
                                    else if (lineS[_k] === 'c' && lineS[_k + 1] === 'a' && lineS[_k + 2] === 's' && lineS[_k + 3] === 'e' && lineS[_k + 4] === ' ') {
                                        isInsideACase = true;
                                        caseBaseSpacing = baseSpace;
                                        _k += 3;
                                        continue;
                                    } else if (lineS[_k] === 'b' && lineS[_k + 1] === 'r' && lineS[_k + 2] === 'e' && lineS[_k + 3] === 'a' && lineS[_k + 4] === 'k' && (lineS[_k + 5] === ';' || lineS[_k + 5] === ' ')) {
                                        _k += 3;
                                        if (caseBaseSpacing >= baseSpace - 1) {
                                            isInsideACase = false;
                                            caseBaseSpacing = -1;
                                        }
                                    }
                                }
                            }
                        }

                        if (lineS[_k] === '{') {
                            curlyBracketsCount++;
                            bracketLessIf = false;
                            bracketsTrack = -1;
                            bracketLessIfBracket = true;
                        } else if (lineS[_k] === '}') {
                            curlyBracketsCount--;
                            bracketLessIfs = 0;
                            bracketLessIfBracket = false;
                            if (isInsideACase && caseBaseSpacing >= baseSpace - 1) {
                                isInsideACase = false;
                                caseBaseSpacing = -1;
                            }

                        } else if (lineS[_k] === ';') {
                            if (bracketsTrack === -1) {
                                bracketLessIf = false;
                                if (!bracketLessIfBracket) {
                                    bracketLessIfs = 0;
                                }
                                bracketLessIfBracket = false;
                            }
                        } else if (lineS[_k] === '(') {
                            bracketsCount++;
                            bracketLessIf = true;
                        } else if (lineS[_k] === ')') {
                            isStatemnt = false;
                            bracketsCount--;
                            if (bracketsTrack === bracketsCount) {
                                bracketsTrack = -1;
                            }
                        } else if (lineS[_k] === '"') {
                            isString = 1;
                        } else if (lineS[_k] === "'") {
                            isString = 2;
                        }
                    }
                }
            }
            if (edit.length > 0 && settingLog) {
                vscode.window.showInformationMessage('Applied a total of ' + edit.length + ' edits.');
            }
            return edit;
        }
    });
}


// this method is called when your extension is deactivated
//export function deactivate() {}
