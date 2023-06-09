const bodyParser = require('body-parser');
const cors = require('cors');
const devLogger = require('morgan');

const errors = require('../helpers/errors/Errors');

module.exports = (app, router, config) => {

    app.use(cors());
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({
        limit: '10mb',
        extended: true,
    }));


    const Router = new router(app, config);
    Router.initialize();
    // catch 404 and forwarding to error handler
    app.use((req, res, next) => {
        const err = new errors.NotFoundError();
        next(err);
    });


    app.use((err, req, res, next) => {
        const payload = {
            code: err.code || 0,
            name: err.name,
            message: err.message || 'Error',
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
