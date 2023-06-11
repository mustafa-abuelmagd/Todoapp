import express, {Application} from 'express';
import http from 'http';

// (?:const|let|var)\s+(\w+)\s=\srequire\((.+)\)

// import {ErrnoException} from 'node';
export interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
    port?: number;
}

import {config} from './config';
import {
    UnauthenticatedError,
    UnauthorizedError,
    NotFoundError,
    ValidationError,
    BusinessError,
    BaseError
} from './helpers/errors/Errors';
import {configType} from "./config/config.dev";

// import * as express from 'express'
// const http = require('http');
// const config = require('./config')

type ServerType = {
    config: any,
    app: Application,
    server: Server,

}

class Server {
    server: any;
    config: configType;
    app: Application;

    constructor(_config: configType) {
        this.config = _config;
        this.app = express();
        this.server = http.createServer(this.app);

    }

    async preInitialize() {
        try {
            const expressRouter = require('./routes/index');
            const expressConfig = require('./config/express');
            expressConfig(this.app, expressRouter, this.config);

        } catch (e) {
            console.log(e);
        }
    }

    async start() {
        await this.preInitialize();
        await new Promise((resolve, reject) => {
            this.server.on('error', (err: ErrnoException) => {
                if (err.syscall !== 'listen') {
                    return reject(err);
                }
                switch (err.code) {
                    case 'EACCES':
                        console.error(`port ${err.port} requires elevated privileges`);
                        process.exit(1);
                    case 'EADDRINUSE':
                        console.error(`port ${err.port} is already in use`);
                        process.exit(1);
                    default:
                        reject(err);
                }
            });

            this.server.on('listening', () => {
                resolve(undefined);

            });

            this.server.listen(this.config.port);
        });

        const info = this.server.address();
        console.log(`Running API server at ${info.address}:${info.port} on ${config.NODE_ENV}`);
    }

}

const server: Server = new Server(config)
if (!module.parent) {
    server.start();
}
module.exports = server

