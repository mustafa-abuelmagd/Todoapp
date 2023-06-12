import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
import {Utils} from '../../helpers/crypto';
import {BaseService} from "../BaseService";
import {BUSINESS_ERROR_MSG} from "../../helpers/errors/index";
import {BusinessError} from "../../helpers/errors/Errors";


export class UserService extends BaseService {
    constructor() {
        super();
    }

    async getUserById(id: string | undefined) {
        try {
            const gottenUser = await prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            return gottenUser;
        } catch (e) {
            throw new BusinessError(
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);

        }
    }

    async getUserByEmail(email: string) {
        try {
            const gottenUser = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (gottenUser) {
                return gottenUser;
            } else {
                throw new BusinessError(
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE,
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME,
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS,
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);

            }

        } catch (e) {
            throw e;
        }
    }

    async signUp(reqData: { email: string, password: string, name: string }) {
        try {
            if (reqData.email && reqData.password) {
                let User = await prisma.user.findUnique({
                    where: {
                        email: reqData.email
                    }
                });
                if (User) {
                    throw new BusinessError(
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.CODE,
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.NAME,
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.STATUS,
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.MSG);
                }
                let newUser = await prisma.user.create({
                    data: {
                        "name": reqData.name,
                        "email": reqData.email,
                        "password": Utils.createHash(reqData.password),
                        "token": Utils.generateJwtToken(reqData.email),
                    },
                });
                if (newUser) {
                    console.log(newUser)
                    // @ts-ignore
                    delete newUser.password;
                    return newUser;
                }
            }
        } catch (error) {
            throw error
        }
    }
}







