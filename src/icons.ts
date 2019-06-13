

import i from "./metadata/icons.json";
import {FileProvider} from './fileProvider';

const code = {"solid": "fas", "regular":"fa", "brand":"fab"};
export class Icons{

    constructor()
    {
        
    }
    public static getItems(searchTerms:string) {
        let selectAll = false;
        if(searchTerms.trim() === "") {selectAll = true;}
        let terms = searchTerms.trim().split(' ');
        let items = "";
        let icons = i;  
        for (let [key, value] of Object.entries(icons)) {
            let isOnKey = false;
            let isOnLabel = false;
            let isOnSearchTerms = false;
            if(!selectAll) {
                for(let i of terms) {
                    if(key.indexOf(i) !== -1) {
                        isOnKey = true;
                    }
                }
            }
            if(!selectAll && !isOnKey) {
                for(let i of terms) {
                    if(value.label.indexOf(i) !== -1) {
                        isOnLabel = true;
                    }
                }
            }
            if(!isOnKey && !selectAll && !isOnLabel){
                for(let i of value.search.terms) {
                    for(let x of terms) {
                        if(i.indexOf(x) !== -1) {
                            isOnSearchTerms = true;
                        }
                    }
                }
            }
            if(isOnKey || isOnSearchTerms || selectAll) {
                for(let [type, v] of Object.entries(value.svg)) {
                    items += FileProvider.parseTemplate('item', {
                        title: value.label,
                        raw: v.raw
                        //,code: (<any>code)[type]
                    });   
                }
            } 
        }
        return items;
    }
}

