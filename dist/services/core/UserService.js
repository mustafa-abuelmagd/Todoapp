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
exports.UserService = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('../../helpers/crypto');
const BaseService = require("../BaseService");
const { BUSINESS_ERROR_MSG } = require("../../helpers/errors");
class UserService extends BaseService {
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gottenUser = yield prisma.user.findUnique({
                    where: {
                        id: id
                    }
                });
                return gottenUser;
            }
            catch (e) {
                throw new this.BusinessError(BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE, BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME, BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS, BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gottenUser = yield prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });
                if (gottenUser) {
                    return gottenUser;
                }
                else {
                    throw new this.BusinessError(BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE, BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME, BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS, BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    signUp(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (reqData.email && reqData.password) {
                    let User = yield prisma.user.findUnique({
                        where: {
                            email: reqData.email
                        }
                    });
                    if (User) {
                        throw new this.BusinessError(BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.CODE, BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.NAME, BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.STATUS, BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.MSG);
                    }
                    let newUser = yield prisma.user.create({
                        data: {
                            "name": reqData.name,
                            "email": reqData.email,
                            "password": crypto.createHash(reqData.password),
                            "token": crypto.generateJwtToken({ sub: reqData.email }),
                        },
                    });
                    if (newUser) {
                        console.log(newUser);
                        delete newUser.password;
                        return newUser;
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
module.exports = new UserService();
