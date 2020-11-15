export function mergeDicts(dicts: Array<object>) {
    return dicts.reduce((a, b) => ({...a, ...b}));
}
