import * as bcrypt from 'bcrypt-nodejs';
// import {uniqid} from 'uniqid';
import * as jwt from 'jsonwebtoken';

import {config} from '../config/index';
import {JwtPayload} from "jsonwebtoken";

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

    static verifyToken(token: string): Promise<JwtPayload> {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            jwt.verify(token, config.auth.local.key, function (err: Error, decoded: JwtPayload) {
                if (!err) {
                    return resolve(decoded as JwtPayload);
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
