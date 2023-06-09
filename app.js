const express = require('express')
const http = require('http');
const config = require('./config')

class Server {
    constructor(_config) {
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
            this.server.on('error', (err) => {
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
                resolve();

            });

            this.server.listen(this.config.port);
        });

        const info = this.server.address();
        console.log(`Running API server at ${info.address}:${info.port} on ${config.NODE_ENV}`);
    }

}

const server = new Server(config)
if (!module.parent) {
    server.start();
}
module.exports = server


// const createError = require('http-errors');
// const express = require('express');
// const cors = require('cors');
// const logger = require('morgan');
// const middlewares = require("./controller/middlewares");
//
// const app = express();
//
// corsOptions = {
//     origin: '*',
// }
// app.use(cors(corsOptions))
//
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//
// app.use(middlewares.hooks);
// require("./controller/src/auth")(app);
// app.use(middlewares.authentication);
// require("./controller/src/todo")(app);
//
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// app.use((err, req, res, next) => {
//     console.log(err)
//     const payload = {
//         code: err.code || 0,
//         name: err.name,
//         message: err.message || 'Error',
//     };
//
//     res.statusCode = err.status || 500;
//     // ajv errors
//     if (err.status && err.status === 400) {
//         // Handle ajv errors
//         if (Array.isArray(err.message)) {
//             payload.details = err.message;
//             payload.message = 'validation error(s)';
//         }
//     }
//
//     payload.stack = err.stack;
//
//     res.json(payload);
// });
//
//
// module.exports = app;
