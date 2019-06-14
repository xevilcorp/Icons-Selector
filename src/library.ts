import * as vscode from 'vscode';

import { FileProvider } from './fileProvider';
//import * as path from 'path';
import { Icons } from './icons';

const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

export class Library {
    private _path: string;
    constructor(path: string) {
        this._path = path;
    }

    public startCommand(): void {
        const panel = vscode.window.createWebviewPanel(
            'fonts-selector',
            'Icons',
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
            }
        );
            


        panel.webview.html = this.getWebviewContent();
        
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'updateSearch':
                        panel.webview.postMessage({ command: 'updateSearch', items: Icons.getItems(message.terms)});
                        return;
                }
            }
        );
    }

    public getWebviewContent() {
        FileProvider.path = this._path;
        let baseuri = 'vscode-resource:/' + this._path + "/";
        return FileProvider.parseTemplate('index', { items: Icons.getItems(""), baseUri: baseuri});
    }
}



