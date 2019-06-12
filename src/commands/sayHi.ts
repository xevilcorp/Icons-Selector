import * as vscode from 'vscode';

export function sayHiCommand() {
	const message = 'Hi';
	vscode.window.showInformationMessage(message);
}