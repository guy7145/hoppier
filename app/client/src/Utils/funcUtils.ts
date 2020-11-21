export function concatFunctions(...funcs) {
    return () => funcs.forEach(func => func());
}
