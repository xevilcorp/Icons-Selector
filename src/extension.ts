import * as vscode from 'vscode';

import { sayByeCommand } from './commands/sayBye';
import { sayHiCommand } from './commands/sayHi';
import { Library } from './library';
import {Icons} from './icons';

let library: Library;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fonts-selector" is now active!');
	let i = new Icons();

    library = new Library(context.extensionPath);

	let commands = [
		vscode.commands.registerCommand('fonts-selector.sayHi',sayHiCommand),
		vscode.commands.registerCommand('fonts-selector.sayBye',sayByeCommand),
		vscode.commands.registerCommand('fonts-selector.start',library.startCommand.bind(library))
	];
	
	context.subscriptions.push(...commands);
}

export function deactivate() {}
