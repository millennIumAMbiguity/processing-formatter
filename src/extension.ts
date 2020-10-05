'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
/*
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "processing-formatter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('processing-formatter.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from processing-formatter!');
	});

	context.subscriptions.push(disposable);
*/
	vscode.commands.registerCommand('format-processing.format', () => {
        const {activeTextEditor} = vscode.window;

        if (activeTextEditor && activeTextEditor.document.languageId === 'pde') {
            const {document} = activeTextEditor;
            const firstLine = document.lineAt(0);
            if (firstLine.text !== '42') {
                const edit = new vscode.WorkspaceEdit();
                edit.insert(document.uri, firstLine.range.start, '42\n');
                return vscode.workspace.applyEdit(edit)
            }
        }
    });

    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('pde', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const firstLine = document.lineAt(0);
            if (firstLine.text !== '42') {
                return [vscode.TextEdit.insert(firstLine.range.start, '42\n')];
			}
			return [];
        }
    });
}

// this method is called when your extension is deactivated
//export function deactivate() {}
