import express, {Application, Express, Request, Response, NextFunction} from 'express';
import {validationSchema} from '../../validations/validation';

import * as _ from 'lodash';
import * as Ajv from 'ajv';
const {
    ValidationError,
    UnauthorizedError,
} = require('../../helpers/errors/Errors');

export const hooks= (req: Request, res: Response, next: NextFunction) => {
    req.validate = (schema: validationSchema, data: any, strict = true) => {
        // @ts-ignore
        const ajv = new Ajv();
        const nSchema: validationSchema = schema;
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
