const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/core/UserService');
const config = require('../../config');

module.exports = async (req, res, next) => {
    const {authorization} = req.headers;

    if (authorization) {
        jwt.verify(authorization, config.auth.local.key, async (err, decoded) => {
            if (err || _.isNil(decoded)) {
                next(new Error("UnauthenticatedError"));
            }
            try {
                const obj = decoded;
                const user = await UserService.getUserByEmail(obj.sub);
                if (_.isNil(user)) {
                    const message = 'User account does not exist';
                    return next(new Error(message));
                }
                req.user = user;
                req.user_id = String(user.id);
                next();
            } catch (e) {
                next(new Error("Unauthorized to see this resource"));
            }
        });
    } else {
        next(new Error("Unauthorized to see this resource"))
    }


};
