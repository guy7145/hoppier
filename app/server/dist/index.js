"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./alias");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const hops_1 = tslib_1.__importDefault(require("./data/hops"));
const app = express_1.default();
app.options('*', cors_1.default());
app.use(cors_1.default({
    origin: 'http://localhost:3000',
}));
app.get('/data/all-hops', function (req, res) {
    console.log(`sending data... (${Object.keys(hops_1.default).length} different hops)`);
    res.json(hops_1.default);
});
app.get('/data/hop/:hopName', function (req, res) {
    res.json(hops_1.default[req.params.hopName]);
});
app.use(express_1.default.static('../client/dist/'));
const port = process.env.PORT || 8080;
console.log(`listening on port ${port}`);
app.listen(port);
