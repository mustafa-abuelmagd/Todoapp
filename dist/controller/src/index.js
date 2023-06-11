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
const express_1 = require("express");
const _ = require('lodash');
const UserService = require('../../services/core/UserService');
const crypto = require('../../helpers/crypto');
const BaseService = require("../../services/BaseService");
const { BUSINESS_ERROR_MSG } = require("./../../helpers/errors");
const Errors_1 = require("../../helpers/errors/Errors");
const validation_1 = require("../../helpers/validation");
const BaseController = require("../BaseController");
const router = (0, express_1.Router)();
router.post('/signUp', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield req.validate(validation_1.SignUpSchema, data);
        if (!data.email || !data.password) {
            throw new Errors_1.BusinessError(BUSINESS_ERROR_MSG.MISSING_INFORMATION.CODE, BUSINESS_ERROR_MSG.MISSING_INFORMATION.NAME, BUSINESS_ERROR_MSG.MISSING_INFORMATION.STATUS, BUSINESS_ERROR_MSG.MISSING_INFORMATION.MSG);
        }
        let user;
        user = yield UserService.signUp(data);
        console.log(user);
        const response = {
            id: user.id,
            token: user.token
        };
        res.send(response);
    }
    catch (err) {
        next(err);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield req.validate(validation_1.loginSchema, data);
        if (!req.body.email || !req.body.password) {
            console.log("this should not be printed");
            throw new Errors_1.BusinessError(BUSINESS_ERROR_MSG.MISSING_INFORMATION.CODE, BUSINESS_ERROR_MSG.MISSING_INFORMATION.NAME, BUSINESS_ERROR_MSG.MISSING_INFORMATION.STATUS, BUSINESS_ERROR_MSG.MISSING_INFORMATION.MSG);
        }
        const { email, password } = req.body;
        let emailRegex = new RegExp(email, 'i');
        let User = yield UserService.getUserByEmail(email);
        if (!User) {
            throw new Errors_1.BusinessError(BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.CODE, BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.NAME, BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.STATUS, BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.MSG);
        }
        const isMatch = crypto.compareHash(password, User.password);
        if (!isMatch) {
            throw new Errors_1.BusinessError(BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.CODE, BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.NAME, BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.STATUS, BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.MSG);
        }
        const response = {
            id: User.id,
            token: User.token
        };
        res.send(response);
    }
    catch (err) {
        next(err);
    }
}));
// app.use("/users", router);
// }
module.exports = new BaseController('/users', 'public', router);
