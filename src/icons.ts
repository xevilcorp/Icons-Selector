

import i from "./metadata/icons.json";
import {FileProvider} from './fileProvider';

const code = {"solid": "fas", "regular":"fa", "brand":"fab"};
export class Icons{

    constructor()
    {
        
    }
    public static getItems() {
        let items = "";
        let icons = i;        
        for (let [key, value] of Object.entries(icons)) {
            for(let [type, v] of Object.entries(value.svg)) {
                items += FileProvider.parseTemplate('item', {
                    title: key,
                    raw: v.raw,
                    code: (<any>code)[type]
                });   
            }
        }
        return items;
    }
}

