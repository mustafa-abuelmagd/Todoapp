"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUSINESS_ERROR_MSG = void 0;
const err_codes_js_1 = require("./err-codes.js");
exports.BUSINESS_ERROR_MSG = {
    API: {
        NOT_FOUND: {
            NAME: 'NOT_FOUND',
            CODE: 4,
            STATUS: err_codes_js_1.HTTP_CODES.NOT_FOUND,
            MSG: 'Not found',
        },
    },
    DEFAULT_VALIDATION_ERROR: {
        NAME: 'VALIDATION_ERROR',
        CODE: 9,
        MSG: 'Validation errors',
        STATUS: err_codes_js_1.HTTP_CODES.BAD_REQUEST
    },
    USERS: {
        DUPLICATE_USER: {
            NAME: 'DUPLICATE_USER_ERROR',
            CODE: 5,
            STATUS: err_codes_js_1.HTTP_CODES.DUPLICATE_ENTITY,
            MSG: 'User with this data already exist'
        },
        USER_NOT_FOUND: {
            NAME: 'USER_NOT_FOUND',
            CODE: 6,
            STATUS: err_codes_js_1.HTTP_CODES.NOT_FOUND,
            MSG: 'User not found',
        }
    },
    TODOS: {
        TODO_NOT_FOUND: {
            NAME: 'USER_NOT_FOUND',
            CODE: 6,
            STATUS: err_codes_js_1.HTTP_CODES.NOT_FOUND,
            MSG: 'User not found',
        }
    },
    AUTHENTICATION_FAIL: {
        NAME: 'AUTHENTICATION_FAIL',
        CODE: 6,
        MSG: 'Username or password is wrong',
        STATUS: err_codes_js_1.HTTP_CODES.FORBIDDEN_ACCESS,
    },
    MISSING_INFORMATION: {
        NAME: 'MISSING_INFORMATION',
        CODE: 6,
        MSG: 'Please fill in the necessary data',
        STATUS: err_codes_js_1.HTTP_CODES.FORBIDDEN_ACCESS,
    },
    AUTHORIZATION_ERROR: {
        NAME: 'AUTHORIZATION_ERROR',
        CODE: 6,
        MSG: 'You are not authorized to access this resource',
        STATUS: err_codes_js_1.HTTP_CODES.FORBIDDEN_ACCESS,
    },
    JWT_TOKEN_FAIL: {
        NAME: 'TOKEN_FAILED',
        CODE: 7,
        MSG: 'You are not authenticated, please use another jwt token, try to logout and login',
        STATUS: err_codes_js_1.HTTP_CODES.FORBIDDEN_ACCESS,
    },
};
