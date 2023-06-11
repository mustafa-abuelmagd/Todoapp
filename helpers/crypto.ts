const bcrypt = require('bcrypt-nodejs');
const uniqid = require('uniqid');
const jwt = require('jsonwebtoken');

const config = require('../config');

export class Utils {
    static createHash(text: string) {
        const salt = bcrypt.genSaltSync(5);
        return bcrypt.hashSync(text, salt);
    }

    static compareHash(text: string, hash: string) {
        return bcrypt.compareSync(text, hash);
    }

    static generateJwtToken(data: String) {
        const token = jwt.sign(data, config.auth.local.key);
        return token;
    }


    static async decodeJWT(token: string) {
        if (token) {
            return await this.verifyToken(token);
        }
    }

    static verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.auth.local.key, undefined, function (err: Error, decoded: string) {
                if (!err) {
                    return resolve(decoded);
                }
                if (err.name === 'TokenExpiredError') {
                    err.message = 'Token has been expired...';
                } else if (err.name === 'JsonWebTokenError') {
                    err.message = 'Invalid Token....';
                }
                return reject(err);
            });
        });
    }


}

// module.exports = Utils;
