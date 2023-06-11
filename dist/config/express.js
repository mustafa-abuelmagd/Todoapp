"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require('cors');
const devLogger = require('morgan');
const Errors_1 = require("../helpers/errors/Errors");
module.exports = (app, router, config) => {
    app.use(cors());
    app.use(body_parser_1.default.json({ limit: '10mb' }));
    app.use(body_parser_1.default.urlencoded({
        limit: '10mb',
        extended: true,
    }));
    // @ts-ignore
    const Router = new router(app, config);
    Router.initialize();
    // catch 404 and forwarding to error handler
    app.use((req, res, next) => {
        const err = new Errors_1.NotFoundError();
        next(err);
    });
    app.use((err, req, res, next) => {
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
