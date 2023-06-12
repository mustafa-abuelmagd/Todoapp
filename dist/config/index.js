"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config_dev_1 = require("./config.dev");
const NODE_ENV = process.env.NODE_ENV || 'development';
const configuration = config_dev_1.development;
configuration.NODE_ENV = NODE_ENV;
exports.config = configuration;
