'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand('format-processing.format', () => {
        const {activeTextEditor} = vscode.window;

        if (activeTextEditor && activeTextEditor.document.languageId === 'pde') {
            const {document} = activeTextEditor;
            const firstLine = document.lineAt(0);
            if (firstLine.text !== '42') {
                const edit = new vscode.WorkspaceEdit();
                edit.insert(document.uri, firstLine.range.start, '42\n');
                return vscode.workspace.applyEdit(edit);
            }
        }
    });

    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('pde', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            let edit: vscode.TextEdit[] = [];
            let curlyBracketsCount: number = 0;
            let comment: boolean = false;
            let bracketLessIf: boolean = false;


            for (var _i = 0; _i < document.lineCount; _i++) {
                const line = document.lineAt(_i);
                const lineS = line.text;

                var curlyBracketsCountCopy = curlyBracketsCount;
                if (bracketLessIf){
                    curlyBracketsCountCopy++;
                }

                for (var _k = 0; _k < curlyBracketsCountCopy || lineS[_k] === '\t'; _k++) { //tab amounts
                    if (lineS[_k] === '}') {
                        curlyBracketsCountCopy--;
                    }

                    if (_k < curlyBracketsCountCopy) {
                        if (lineS[_k] !== '\t') {
                            edit.push(vscode.TextEdit.insert(line.range.start.translate(0,_k), '\t'));
                        }
                    } else {
                        if (lineS[_k] === '\t') {
                            edit.push(vscode.TextEdit.delete(new vscode.Range(line.range.start.translate(0,_k), line.range.start.translate(0,_k+1))));
                        }
                    }
                    
                }


                for (var _k = 0; _k < lineS.length; _k++) {

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
                                continue;
                            }
                            if (lineS[_k + 1] === '/') { //dont format comments
                                break;
                            }
                        }
                        

                        if (lineS[_k] === ' ') {

                            if (_k > 0) {
                                if (lineS[_k-1] === '(')  { //no space after "("
                                    edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                                } else if (lineS[_k-1] === '[') { //no space after "{"
                                    edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                                } else if (lineS[_k-1] === '.') { //no space after "."
                                    edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                                }
                            }

                            if (lineS[_k+1] === ';') { //no space before ";"
                                edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                            } else if (lineS[_k+1] === '(') { //no space before "(" unless its after a if statment
                                if (_k > 2) {
                                    if (lineS[_k-2] !== 'i' && lineS[_k-1] !== 'f') {
                                        edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                                    }
                                } else {
                                    edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                                }
                            } else if (lineS[_k+1] === ')') { //no space before ")"
                                edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                            } else if (lineS[_k+1] === '[') { //no space before "["
                                edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                            } else if (lineS[_k+1] === ']') { //no space before "]"
                                edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                            } else if (lineS[_k+1] === '.') { //no space before "."
                                edit.push(vscode.TextEdit.delete(newRange(line, _k, 0)));
                            } 
                        } else {
                            if (lineS[_k] === ')') {
                                if (lineS[_k+1] === '{') { //add space betwin ")" and "{"
                                    edit.push(vscode.TextEdit.insert(line.range.start.translate(0,_k+1), ' '));
                                }
                            }

                            if (lineS[_k] !== '-' && lineS[_k+1] !== '-' && lineS[_k] !== '+' && lineS[_k+1] !== '+') { //dont add spaces on ++ and --
                                if (isOpperator(lineS[_k])) { // spaces before and after opperators. example if (i==0) -> if (i == 0)

                                    if (lineS[_k] === '!') { //for cases as: if (! boolValue) -> if (!boolValue)
                                        if (lineS[_k+1] === ' ') {
                                            edit.push(vscode.TextEdit.delete(newRange(line, _k, 1)));
                                            continue;
                                        }
                                    }
                                    if (lineS[_k] === '*' && _k > 0 && lineS[_k-1] === '.') { //for cases as "import processing.pdf.*;"
                                        continue;
                                    }

                                    var isOpperatorK1 = isOpperator(lineS[_k+1]);

                                    if (!isOpperatorK1 && lineS[_k] === '!') { //for cases as "if (!boolValue)"
                                        continue;
                                    }

                                    if (lineS.length > 0 && lineS[_k-1] !== ' ' && !isOpperator(lineS[_k-1])){
                                        edit.push(vscode.TextEdit.insert(line.range.start.translate(0,_k), ' '));
                                    }
        
                                    if (lineS[_k+1] !== ';' && lineS[_k+1] !== ' ' && !isOpperatorK1) {
                                        edit.push(vscode.TextEdit.insert(line.range.start.translate(0,_k+1), ' '));
                                    }
                                }
                            }

                        } 


                    } else if (comment){
                        continue;
                    }
                    if (_k + 2 < lineS.length) { 




                        if (lineS[_k] !== ' ') {
                            if (lineS[_k] === 'i' && lineS[_k+1] === 'f') { //space betwin "if" and "("
                                bracketLessIf = true;
                                if (lineS[_k+2] === '(') { 
                                    edit.push(vscode.TextEdit.insert(line.range.start.translate(0,_k+2), ' '));
                                    _k++;
                                }
                            }
                        }


                    }

                    if (lineS[_k] === '{') {
                        curlyBracketsCount++;
                        bracketLessIf = false;
                    } else if (lineS[_k] === '}') {
                        curlyBracketsCount--;
                    } else if (lineS[_k] === ';') {
                        bracketLessIf = false;
                    }


                }
            }

            
			return edit;
        }
    });
}

function isOpperator(s: string) : boolean {
    return (s === '=' || s === '<' || s === '>' || s === '&' || s === '!' || s === '|' || s === '%' || s === '?' || s === '~' || s === '^' 
    || s === '+' || s === '-' || s === '*' || s === '/');
}

function newRange(line: vscode.TextLine, k: number, n: number) : vscode.Range {
    return new vscode.Range(line.range.start.translate(0,k+n), line.range.start.translate(0,k+n+1));
}

// this method is called when your extension is deactivated
//export function deactivate() {}
