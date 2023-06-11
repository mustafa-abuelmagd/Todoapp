"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config_dev_1 = require("./config.dev");
const nodeEnv = process.env.NODE_ENV || 'development';
const configuration = config_dev_1.development;
// @ts-ignore
exports.config = configuration[nodeEnv];
