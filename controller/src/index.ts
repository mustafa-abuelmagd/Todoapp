import express, {Request, Response, NextFunction, Router } from 'express';

const _ = require('lodash');

const UserService = require('../../services/core/UserService');
const crypto = require('../../helpers/crypto')
const BaseService = require("../../services/BaseService");
const {BUSINESS_ERROR_MSG} = require("./../../helpers/errors")
import {BusinessError} from '../../helpers/errors/Errors';
import {SignUpSchema, loginSchema} from "../../helpers/validation";
const BaseController = require("../BaseController");
const router = Router()


router.post('/signUp', async (req, res, next) => {
    try {
        const data = req.body;
        await req.validate(SignUpSchema, data);
        if (!data.email || !data.password) {
            throw new BusinessError(
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.CODE,
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.NAME,
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.STATUS,
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.MSG,
            );
        }
        let user;
        user = await UserService.signUp(data);
        console.log(user)
        const response = {
            id: user.id,
            token: user.token
        };
        res.send(response);
    } catch (err) {
        next(err);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const data = req.body;
        await req.validate(loginSchema, data);
        if (!req.body.email || !req.body.password) {
            console.log("this should not be printed")
            throw new BusinessError(
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.CODE,
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.NAME,
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.STATUS,
                BUSINESS_ERROR_MSG.MISSING_INFORMATION.MSG,
            );
        }
        const {
            email,
            password
        } = req.body;

        let emailRegex = new RegExp(email, 'i');
        let User = await UserService.getUserByEmail(email)
        if (!User) {
            throw new BusinessError(
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.CODE,
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.NAME,
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.STATUS,
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.MSG,
            );
        }
        const isMatch = crypto.compareHash(password, User.password);
        if (!isMatch) {
            throw new BusinessError(
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.CODE,
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.NAME,
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.STATUS,
                BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL.MSG,
            );
        }
        const response = {
            id: User.id,
            token: User.token
        };
        res.send(response);
    } catch (err) {
        next(err);
    }
});

// app.use("/users", router);
// }

module.exports = new BaseController('/users', 'public', router)
