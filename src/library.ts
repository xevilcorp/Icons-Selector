import * as vscode from 'vscode';

import { FileProvider } from './fileProvider';
import * as path from 'path';
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
            'Page Title',
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
            }
        );



        let iteration = 0;
        const updateWebview = () => {
            const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
            panel.title = cat;
            panel.webview.html = this.getWebviewContent(cat);
        };

        updateWebview();
        //const interval = setInterval(updateWebview, 10000);

        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'updateSearch':
                        vscode.window.showErrorMessage(message.text);
                        return;
                }
            }
        );

        panel.onDidDispose(function () {
            //clearInterval(interval);
        });


    }

    public getWebviewContent(cat: keyof typeof cats) {
        FileProvider.path = this._path;
        return FileProvider.parseTemplate('index', { items: Icons.getItems() });
    }
}



