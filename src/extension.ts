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
            const firstLine = document.lineAt(0);
            let edit: vscode.TextEdit[] = [];

            if (firstLine.text !== '42') {
                edit.push(vscode.TextEdit.insert(firstLine.range.start, '42\n'));
            }
            
			return edit;
        }
    });
}

// this method is called when your extension is deactivated
//export function deactivate() {}
