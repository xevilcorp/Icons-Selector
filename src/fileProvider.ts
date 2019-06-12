import * as fs from 'fs';

export class FileProvider
{
    public static path: string;
    private static _templates: {[key: string]: string} = {};
    private static _styles: {[key: string]: string} = {};
    public static getTemplate(name: string): string
    {
        if(this._templates[name]) { return this._templates[name]; }

        this._templates[name] = fs.readFileSync(`${this.path}/templates/${name}.html`).toString() || "";
        return this._templates[name];
    }
    public static getStyle(name: string): string
    {
        if(this._styles[name]){return this._styles[name];}

        this._styles[name] = fs.readFileSync(`${this.path}/styles/${name}.css`).toString() || "";
        return this._styles[name];
    }
    
    public static parseTemplate(name: string, data: any): string
    {
        return this.getTemplate(name).replace(/{{\s*(.*?)\s*}}/g, (substring: string, match: string): string =>
        {
            return (data[match] || ""); 
        });
    }
}

