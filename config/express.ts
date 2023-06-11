import express, {Application, Request, Response, NextFunction} from 'express';
import {Router} from '../routes';


import bodyParser from 'body-parser';

const cors = require('cors');
const devLogger = require('morgan');

import {
    UnauthenticatedError,
    UnauthorizedError,
    NotFoundError,
    ValidationError,
    BusinessError,
    BaseError
} from '../helpers/errors/Errors';
import {configType} from "./config.dev";

module.exports = (app: Application, router: any, config: configType) => {

    app.use(cors());
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({
        limit: '10mb',
        extended: true,
    }));


    const Router = new router(app, config);
    Router.initialize();
    // catch 404 and forwarding to error handler
    app.use((req: Request, res: Response, next: Function): void => {
        const err = new NotFoundError();
        next(err);
    });


    app.use((err: BaseError, req: Request, res: Response, next: NextFunction): void => {
        const payload = {
            code: err.code || 0,
            name: err.name,
            message: err.message || 'Error',
            details: err.stack,
            stack: err.stack

        };

        res.statusCode = err.status || 500;
        // ajv errors
        if (err.status && err.status === 400) {
            // Handle ajv errors
            if (Array.isArray(err.message)) {
                payload.details = err.message;
                payload.message = 'validation error(s)';
            }
        }

        payload.stack = err.stack;

        res.json(payload);
    });

};
