import {Request, Response, NextFunction} from 'express';

type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    token: string,
    todos: string,
    created_at: string,
    updated_at: string,
}
// declare module 'express' {
//     interface Request {
//         user?: User;
//         user_id?: string;
//         validate?: Function;
//     }
// }


declare global {
    namespace Express {
        interface Request {
            user?: User | undefined;
            user_id?: string | undefined;
            validate: Function ;
        }
    }
}

import * as _ from 'lodash';
const jwt = require('jsonwebtoken');
const UserService = require('../../services/core/UserService');
const config = require('../../config');

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if (authorization) {
        jwt.verify(authorization, config.auth.local.key, undefined, async (err: Error, decoded: string): Promise<void> => {
            if (err || _.isNil(decoded)) {
                next(new Error("UnauthenticatedError"));
            }
            try {
                const obj = decoded;
                const user = await UserService.getUserByEmail(obj.sub);
                if (_.isNil(user)) {
                    const message = 'User account does not exist';
                    return next(new Error(message));
                }
                req.user = user;
                req.user_id = String(user.id);
                next();
            } catch (e) {
                next(new Error("Unauthorized to see this resource"));
            }
        });
    } else {
        next(new Error("Unauthorized to see this resource"))
    }


};
