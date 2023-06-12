import express, {Request, Response, NextFunction} from 'express';
import * as _ from 'lodash';
import {UserService} from '../../services/core/UserService';
import {Utils as crypto} from '../../helpers/crypto'
import {BaseService} from "../../services/BaseService";
const {BUSINESS_ERROR_MSG} = require("./../../helpers/errors/Errors")
import {BusinessError} from '../../helpers/errors/Errors';
import {SignUpSchema, loginSchema} from "../../helpers/validation/index";
import {BaseController} from "../BaseController";

const router = express.Router();

const _UserService = new UserService();

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
        user = await _UserService.signUp(data);
        console.log(user)
        const response = {
            id: user?.id,
            token: user?.token
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
        let User = await _UserService.getUserByEmail(email)
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
