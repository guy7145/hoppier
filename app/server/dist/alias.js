"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const module_alias_1 = tslib_1.__importDefault(require("module-alias"));
const path_1 = tslib_1.__importDefault(require("path"));
const aliasDir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
console.log(aliasDir);
module_alias_1.default.addAlias('@shared', path_1.default.resolve(__dirname, `../../shared/${aliasDir}`));
module_alias_1.default();
