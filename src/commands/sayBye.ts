import * as vscode from 'vscode';

export function sayByeCommand() {
	const message = 'Bye';
	vscode.window.showInformationMessage(message);
}


