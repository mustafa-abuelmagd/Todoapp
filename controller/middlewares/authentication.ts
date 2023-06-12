import {Request, Response, NextFunction} from 'express';

export type User =  {
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    token?: string,
    todos?: string[],
    created_at?: Date,
    updated_at?: Date,
}

declare global {
    namespace Express {
        interface Request {
            user?: User | undefined;
            user_id?: string | undefined;
            validate: Function;
        }
    }
}

import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import {UserService} from '../../services/core/UserService';
import {config} from '../../config/index';

const _UserService = new UserService();

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if (authorization) {
        // @ts-ignore
        jwt.verify(authorization, config.auth.local.key, async (err: Error, decoded: string) => {
            if (err || _.isNil(decoded)) {
                next(new Error("UnauthenticatedError"));
            }
            try {
                const obj = decoded;
                const user = await _UserService.getUserByEmail(obj);
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
