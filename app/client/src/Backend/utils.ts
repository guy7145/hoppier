export default function getListOperations<T>(lst: Array<T>, setter: (items: Array<T>) => void) {
    const setItem = item => setter([item]);
    const addItem = item => setter([...lst, item]);
    const removeItem = item => setter(lst.filter(other => other !== item));

    return {setItem, addItem, removeItem};
}
