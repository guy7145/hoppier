export function concatFunctions(...funcs) {
    return () => funcs.forEach(func => func());
}

export const andPreventEventDefault = (f) => ev => {
    ev.preventDefault();
    f();
};