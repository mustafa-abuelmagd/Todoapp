"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt-nodejs"));
// import {uniqid} from 'uniqid';
const jwt = __importStar(require("jsonwebtoken"));
const index_1 = require("../config/index");
class Utils {
    static createHash(text) {
        const salt = bcrypt.genSaltSync(5);
        return bcrypt.hashSync(text, salt);
    }
    static compareHash(text, hash) {
        return bcrypt.compareSync(text, hash);
    }
    static generateJwtToken(data) {
        const token = jwt.sign(data, index_1.config.auth.local.key);
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
            // @ts-ignore
            jwt.verify(token, index_1.config.auth.local.key, function (err, decoded) {
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
