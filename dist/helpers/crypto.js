"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const bcrypt = require('bcrypt-nodejs');
const uniqid = require('uniqid');
const jwt = require('jsonwebtoken');
const config = require('../config');
class Utils {
    static createHash(text) {
        const salt = bcrypt.genSaltSync(5);
        return bcrypt.hashSync(text, salt);
    }
    static compareHash(text, hash) {
        return bcrypt.compareSync(text, hash);
    }
    static generateJwtToken(data) {
        const token = jwt.sign(data, config.auth.local.key);
        return token;
    }
    static decodeJWT(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token) {
                return yield this.verifyToken(token);
            }
        });
    }
    static verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.auth.local.key, undefined, function (err, decoded) {
                if (!err) {
                    return resolve(decoded);
                }
                if (err.name === 'TokenExpiredError') {
                    err.message = 'Token has been expired...';
                }
                else if (err.name === 'JsonWebTokenError') {
                    err.message = 'Invalid Token....';
                }
                return reject(err);
            });
        });
    }
}
exports.Utils = Utils;
// module.exports = Utils;
