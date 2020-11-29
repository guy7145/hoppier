import {hopCompounds} from "@shared/KnowledgeBase/HopComposition";
import _ from 'lodash/math';


export function hopValues(hop, keys) {
    return keys
        .map(k => hop.normalized[k])
        .map(v => Array.isArray(v) ? _.mean(v) : v)
        .map(v => v === '?' ? 0 : v);
}

export function hopToMinMax(hop) {
    const hopMin = {...hop, title: `${hop.title} (min)`};
    const hopMax = {...hop, title: `${hop.title} (max)`};
    hopCompounds.forEach((c) => {
        const value = hop[c];
        if (Array.isArray(value) && value.length > 1) {
            hopMin[c] = _.min(value);
            hopMax[c] = _.max(value);
        }
    });

    return [hopMin, hopMax];
}