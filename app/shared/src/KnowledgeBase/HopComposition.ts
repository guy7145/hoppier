import _ from "lodash";
import {Hop} from "../types/hop";


const MISSING_PROPERTY = '?';


export const hopCompounds = [
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
    return !_.every(hopCompounds.map(c => hop[c] && hop[c] !== '' && hop[c] !== MISSING_PROPERTY))
}

export function filterHopsWithMissingData(hopsList: Array<Hop>): Array<Hop> {
    return hopsList.filter(hop => !isHopMissingData(hop));
}
