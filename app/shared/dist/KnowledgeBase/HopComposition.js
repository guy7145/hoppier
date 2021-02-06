"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterHopsWithMissingData = exports.isHopMissingData = exports.hopCompounds = void 0;
var collection_1 = __importDefault(require("lodash/collection"));
var MISSING_PROPERTY = '?';
exports.hopCompounds = [
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
    return !collection_1.default.every(exports.hopCompounds.map(function (c) { return hop[c] && hop[c] !== '' && hop[c] !== MISSING_PROPERTY; }));
}
exports.isHopMissingData = isHopMissingData;
function filterHopsWithMissingData(hopsList) {
    console.log('missing data:');
    console.log(hopsList.filter(function (hop) { return isHopMissingData(hop); }).map(function (hop) { return hop.title; }));
    return hopsList.filter(function (hop) { return !isHopMissingData(hop); });
}
exports.filterHopsWithMissingData = filterHopsWithMissingData;
