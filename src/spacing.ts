import * as vscode from 'vscode';
import * as f from './functions';

export function spacing(edit: vscode.TextEdit[], line: vscode.TextLine, lineS: string, baseSpacing: number,
    bracketLessIf: boolean, insertSpaces: boolean, tabsize: number, spaceTab: string, caseBaseSpacing: number): boolean {

    if (lineS[0] === '}') {
        baseSpacing--;
    } else if (bracketLessIf && lineS[0] === '{') {
        baseSpacing--;
        bracketLessIf = false;
    }


    var tabReplace = false;
    var _k = 0;
    if (insertSpaces) { //insert Spaces === true

        var returnRange = 0;
        for (_k = 0; _k < baseSpacing * tabsize; _k += tabsize) { //tab amounts

            //replace tab with spaces
            if (lineS[_k] === '\t') {
                edit.push(vscode.TextEdit.replace(f.newRange(line, _k, 0), spaceTab));
                continue;
            }

            //how '}' affect spacing
            if (f.charExistInRange(lineS, '}', _k + 1, tabsize + tabsize - 1)) {
                baseSpacing--;
                if (baseSpacing !== -1 && baseSpacing <= caseBaseSpacing + 1) {
                    baseSpacing--;
                    caseBaseSpacing = -1;
                }
                if (_k >= baseSpacing * tabsize) {
                    break;
                }
            }
            //how '{' affect spacing
            else if (f.charExistInRange(lineS, '{', _k + tabsize, tabsize)) {
                baseSpacing--;
                bracketLessIf = false;
            }

            //increase spacing
            if ((returnRange = f.isInRange(lineS, ' ', _k, tabsize)) < tabsize) {
                var s = '';
                for (let i = 0; i < tabsize - returnRange; i++) {
                    s += ' ';
                }
                edit.push(vscode.TextEdit.insert(line.range.start, s));
            }
        }
        //decrease spacing || remove extra tab
        if (lineS[_k] === ' ' || lineS[_k] === '\t') { //TODO fin a way to remove multiple spaces at once. p.s. I don't know why I can't get it to work properly
            edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
        }


    } else { //insert Spaces === false
        //TODO fix-up/clean-up
        for (_k = 0; _k < baseSpacing || lineS[_k] === '\t'; _k++) { //tab amounts

            var nextTab = '';
            for (let i = 0; i < tabsize; i++) {
                nextTab += lineS[_k + i];
            }
            if (nextTab === spaceTab) {
                edit.push(vscode.TextEdit.replace(new vscode.Range(line.range.start.translate(0, _k), line.range.start.translate(0, _k + tabsize)), '\t'));
                _k += 4;
                tabReplace = true;
                if (_k >= baseSpacing) {
                    break;
                }
            }

            else if (lineS[_k + 1] === '}') {
                baseSpacing--;
                if (baseSpacing !== -1 && baseSpacing <= caseBaseSpacing + 1) {
                    baseSpacing--;
                    caseBaseSpacing = -1;
                }
                if (_k >= baseSpacing) {
                    break;
                }
            } else if (bracketLessIf && lineS[_k + 1] === '{') {
                baseSpacing--;
                bracketLessIf = false;
            }

            if (_k < baseSpacing) {
                if (lineS[_k] !== '\t') {
                    if (lineS[_k] === ' ') {
                        edit.push(vscode.TextEdit.replace(f.newRange(line, _k, 0), '\t'));
                    } else {
                        edit.push(vscode.TextEdit.insert(line.range.start, '\t'));
                    }

                }
            } else {
                if (lineS[_k] === '\t') {
                    edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
                }
            }
        }
        if (lineS[_k] === ' ' && !tabReplace) {
            edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
        } else if (lineS[_k] === '\t') {
            edit.push(vscode.TextEdit.delete(f.newRange(line, _k, 0)));
        }
    }

    return bracketLessIf;
}