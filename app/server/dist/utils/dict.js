"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDicts = void 0;
function mergeDicts(dicts) {
    return dicts.reduce((a, b) => (Object.assign(Object.assign({}, a), b)));
}
exports.mergeDicts = mergeDicts;
