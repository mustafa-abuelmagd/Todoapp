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
exports.authentication = void 0;
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/core/UserService');
const config = require('../../config');
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (authorization) {
        jwt.verify(authorization, config.auth.local.key, undefined, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err || _.isNil(decoded)) {
                next(new Error("UnauthenticatedError"));
            }
            try {
                const obj = decoded;
                const user = yield UserService.getUserByEmail(obj.sub);
                if (_.isNil(user)) {
                    const message = 'User account does not exist';
                    return next(new Error(message));
                }
                req.user = user;
                req.user_id = String(user.id);
                next();
            }
            catch (e) {
                next(new Error("Unauthorized to see this resource"));
            }
        }));
    }
    else {
        next(new Error("Unauthorized to see this resource"));
    }
});
exports.authentication = authentication;
