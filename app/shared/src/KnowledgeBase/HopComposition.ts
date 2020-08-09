import _ from "lodash";

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

function isHopMissingData(hop) {
    return !_.every(hopChemicals.map(c => hop[c] && hop[c] !== '' && hop[c] !== MISSING_PROPERTY))
}

export function filterHopsWithMissingData(hopsList) {
    return hopsList.filter(hop => !isHopMissingData(hop));
}
