"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HopComposition_1 = require("@shared/KnowledgeBase/HopComposition");
const fs_1 = require("fs");
const math_1 = tslib_1.__importDefault(require("lodash/math"));
const dict_1 = require("../utils/dict");
const asArray = x => Array.isArray(x) ? x : [x];
const normalizeCompound = (v, vMax) => Array.isArray(v) ? v.map(vv => vv / vMax * 100) : v / vMax * 100;
const normalizeHop = (hop, hopMax) => dict_1.mergeDicts(HopComposition_1.hopCompounds.map(comp => ({ [comp]: normalizeCompound(hop[comp], hopMax[comp]) })));
const hopsObj = JSON.parse(fs_1.readFileSync('./data.json').toString());
const hopsList = HopComposition_1.filterHopsWithMissingData(Object.values(hopsObj));
const hopMax = hopsList.reduce((hop1, hop2) => dict_1.mergeDicts(HopComposition_1.hopCompounds.map(comp => ({ [comp]: math_1.default.max([...asArray(hop1[comp]), ...asArray(hop2[comp])]) }))));
hopsList.forEach(hop => hop.normalized = normalizeHop(hop, hopMax));
const hopsObject = hopsList
    .reduce((acc, currentHop) => (Object.assign(Object.assign({}, acc), { [currentHop.title.toLowerCase()]: currentHop })), {});
exports.default = hopsObject;
