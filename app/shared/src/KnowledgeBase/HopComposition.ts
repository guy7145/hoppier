import _ from 'lodash/collection';
import {Hop} from '../types/hop';


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

export function isHopMissingData(hop: Hop): Boolean {
    return !_.every(hopCompounds.map(c => hop[c] && hop[c] !== '' && hop[c] !== MISSING_PROPERTY))
}

export function filterHopsWithMissingData(hopsList: Array<Hop>): Array<Hop> {
    console.log('missing data:');
    console.log(hopsList.filter(hop => isHopMissingData(hop)).map(hop => hop.title));
    return hopsList.filter(hop => !isHopMissingData(hop));
}
