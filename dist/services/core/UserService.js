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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const crypto_1 = require("../../helpers/crypto");
const BaseService_1 = require("../BaseService");
const index_1 = require("../../helpers/errors/index");
const Errors_1 = require("../../helpers/errors/Errors");
class UserService extends BaseService_1.BaseService {
    constructor() {
        super();
    }
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
                throw new Errors_1.BusinessError(index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);
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
                    throw new Errors_1.BusinessError(index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);
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
                        throw new Errors_1.BusinessError(index_1.BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.CODE, index_1.BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.NAME, index_1.BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.STATUS, index_1.BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.MSG);
                    }
                    let newUser = yield prisma.user.create({
                        data: {
                            "name": reqData.name,
                            "email": reqData.email,
                            "password": crypto_1.Utils.createHash(reqData.password),
                            "token": crypto_1.Utils.generateJwtToken(reqData.email),
                        },
                    });
                    if (newUser) {
                        console.log(newUser);
                        // @ts-ignore
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
