import _ from "lodash";
import {Hop} from "./types";


const MISSING_PROPERTY = '?';


export const hopChemicals = [
    'total oil',
    'myrcene oil',
    'co-humulone',
    'humulene oil',
    'caryophyllene oil',
    'farnesene oil',
    'alpha acid',
    'beta acid',
];

function isHopMissingData(hop: Hop): Boolean {
    return !_.every(hopChemicals.map(c => hop[c] && hop[c] !== '' && hop[c] !== MISSING_PROPERTY))
}

export function filterHopsWithMissingData(hopsList: Array<Hop>): Array<Hop> {
    return hopsList.filter(hop => !isHopMissingData(hop));
}
