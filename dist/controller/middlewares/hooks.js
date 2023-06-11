"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hooks = void 0;
const _ = require('lodash');
const Ajv = require('ajv');
const { ValidationError, UnauthorizedError, } = require('../../helpers/errors/Errors');
const hooks = (req, res, next) => {
    req.validate = (schema, data, strict = true) => {
        const ajv = new Ajv();
        const nSchema = schema;
        // if (!strict) {
        //     delete nSchema.required;
        // }
        const valid = ajv.validate(nSchema, data);
        if (!valid) {
            console.log(ajv.errors);
            throw new ValidationError(null, ajv.errors);
        }
    };
    next();
};
exports.hooks = hooks;
