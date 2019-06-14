

import iconsJsonObj from "./metadata/icons.json";
import { FileProvider } from './fileProvider';

const code = { "solid": "fas", "regular": "fa", "brand": "fab" };
export class Icons {
    public static getItems(userSearch: string) {
        let selectAll = false;
        let items = [];
        let icons = iconsJsonObj;
        //if the user search entry is empty, let's select all items.
        if (userSearch.trim() === "") { selectAll = true; }
        /*I separate the words of the user search in a string array,
        so if the user types "fish cat", it will check individually the
        existence of fish or cat in the key, label or search values*/
        let userSearchTerms = userSearch.trim().toUpperCase().split(' ');

        /*Removes the S from the search terms*/
        /*if(!selectAll) {
            let temp: string[] = [];
            userSearchTerms.forEach(userSearchTerm => {
                if (userSearchTerm.substring(userSearchTerm.length - 1) === "S") {
                    temp.push(userSearchTerm.substring(0, userSearchTerm.length - 1));
                }
                else{
                    temp.push(userSearchTerm);
                }
            });
            userSearchTerms = temp;
        }*/
        



        /*Iterates though each item of the json icons file*/
        for (let [key, value] of Object.entries(icons)) {
            let labelTerms = value.label.toUpperCase().split(' ');
            let isOnLabel = false;
            let isOnSearchTerms = false;
            let matchScore = 0;
            /*Check if there is a match between the
            user search and the label of the item*/
            if (!selectAll) {
                for (let userSearchTerm of userSearchTerms) {
                    for (let labelTerm of labelTerms) {
                        if (labelTerm.indexOf(userSearchTerm) !== -1) {
                            let score = userSearchTerm.length / labelTerm.length;
                            if (labelTerm.substring(labelTerm.length - 1) === "S") {
                                score += 1 / labelTerm.length;
                            }
                            matchScore = score > matchScore ? score : matchScore;
                            if (score > matchScore) { matchScore = score; }
                            isOnLabel = true;
                        }
                    }
                }
            }
            /*Check if there is a match between the
            user search and the stored search terms of the item*/
            if (!selectAll && !isOnLabel) {
                for (let searchTerm of value.search.terms) {
                    for (let userSearchTerm of userSearchTerms) {
                        if (searchTerm.toUpperCase().indexOf(userSearchTerm) !== -1) {
                            let score = userSearchTerm.length / searchTerm.length;
                            if (score > matchScore) { matchScore = score; }
                            isOnSearchTerms = true;
                        }
                    }
                }
            }
            /*If there's a match in any of the above check stages, then*/
            if (selectAll || isOnLabel || isOnSearchTerms) {
                let item = { title: value.label, svgs: value.svg, score: Math.round(matchScore * 100), isOnLabel: isOnLabel };
                items.push(item);
            }
        }
        if (selectAll) {
            items.sort((a, b) => a.title > b.title ? 1 : a.title !== b.title ? -1 : 0);
        } else {
            items.sort(function (a, b) {
                if (b.score - a.score === 0) {
                    if (b.isOnLabel) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                } else {
                    return b.score - a.score;
                }
            });
        }

        let itemsTemplate = "";
        items.forEach(e => {
            /*Each item might have more than one version of itself,
            usually differing on how it's filled, solid, regular, etc, 
            so we iterate through those versions like different icons.*/
            Object.entries(e.svgs).forEach(k => {
                itemsTemplate += FileProvider.parseTemplate('item', {
                    title: e.title,
                    raw: k[1].raw,
                    match: e.score
                });
            });
        });
        return itemsTemplate;
    }
}

