export default class Matrix {
    constructor (arr=[]) {
        this.innerArray = [...arr];
    }

    innerIndex(i, j) {
        return this.innerArray * i + j;
    }

    get(i, j) {
        return this.innerArray[this.innerIndex(i, j)];
    }

    set(i, j, value) {
        this.innerArray[this.innerIndex(i, j)] = value;
    }
}
