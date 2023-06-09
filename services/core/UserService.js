const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('../../helpers/crypto');
const BaseService = require("../BaseService");
const {BUSINESS_ERROR_MSG} = require("./../../helpers/errors")

class UserService extends BaseService {


    async getUserById(id) {
        try {
            const gottenUser = await prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            return gottenUser;
        } catch (e) {
            throw new this.BusinessError(
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);

        }
    }

    async getUserByEmail(email) {
        try {
            const gottenUser = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (gottenUser) {
                return gottenUser;
            } else {
                throw new this.BusinessError(
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE,
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME,
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS,
                    BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);

            }

        } catch (e) {
            throw e;
        }
    }

    async signUp(reqData) {
        try {
            if (reqData.email && reqData.password) {
                let User = await prisma.user.findUnique({
                    where: {
                        email: reqData.email
                    }
                });
                if (User) {
                    throw new this.BusinessError(
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.CODE,
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.NAME,
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.STATUS,
                        BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER.MSG);
                }
                let newUser = await prisma.user.create({
                    data: {
                        "name": reqData.name,
                        "email": reqData.email,
                        "password": crypto.createHash(reqData.password),
                        "token": crypto.generateJwtToken({sub: reqData.email}),
                    },
                });
                if (newUser) {
                    console.log(newUser)
                    delete newUser.password;
                    return newUser;
                }
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new UserService();

//
// exports.createUser = async function (data) {
//     const result = await prisma.user.create({
//         data: {
//             "name": data.name,
//             "email": data.email,
//         }
//     });
//     return result;
// }
//
// exports.getAllUsers = async function () {
//     const users = await prisma.user.findMany();
//
//     return users;
// }
//
// exports.getUserById = async function (id) {
//     try {
//         const gottenUser = await prisma.user.findUnique({
//             where: {
//                 id: id
//             }
//         });
//         return gottenUser;
//     } catch (e) {
//         console.log(e);
//     }
// }
//
// exports.getUserByEmail = async function (email) {
//     try {
//         const gottenUser = await prisma.user.findUnique({
//             where: {
//                 email: email
//             }
//         });
//         return gottenUser;
//     } catch (e) {
//         console.log(e);
//     }
// }
//
// exports.signUp = async function (reqData) {
//     try {
//         if (reqData.email && reqData.password) {
//             let User = await prisma.user.findUnique({
//                 where: {
//                     email: reqData.email
//                 }
//             });
//             if (User) {
//                 throw new Error("Duplicated Email ");
//             }
//             let newUser = await prisma.user.create({
//                 data: {
//                     "name": reqData.name,
//                     "email": reqData.email,
//                     "password": crypto.createHash(reqData.password),
//                     "token": crypto.generateJwtToken({sub: reqData.email}),
//                 },
//             });
//             if (newUser) {
//                 console.log(newUser)
//                 delete newUser.password;
//                 return newUser;
//             }
//         }
//     } catch (error) {
//         console.log("error", error)
//     }
// }






