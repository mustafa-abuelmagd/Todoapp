"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const authentication_1 = require("./authentication");
const hooks_1 = require("./hooks");
exports.middlewares = {
    hooks: hooks_1.hooks,
    authentication: authentication_1.authentication,
};
