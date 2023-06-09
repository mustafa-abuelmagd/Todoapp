const _ = require('lodash');
const Ajv = require('ajv');
const {
    ValidationError,
    UnauthorizedError,
} = require('../../helpers/errors/Errors');

module.exports = (req, res, next) => {
    req.validate = (schema, data, strict = true) => {
        const ajv = new Ajv();
        const nSchema = schema;
        if (!strict) {
            delete nSchema.required;
        }
        const valid = ajv.validate(nSchema, data);
        if (!valid) {
            console.log(ajv.errors);
            throw new ValidationError(null, ajv.errors);
        }
    };

    next();
};
