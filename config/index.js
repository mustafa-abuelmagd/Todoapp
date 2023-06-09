const development = require('./config.dev');
const nodeEnv = process.env.NODE_ENV || 'development';
const configuration = {
    development,
};
module.exports = configuration[nodeEnv];
