// const {
//     ROLE_NAMES_ENUM
// } = require('../config/auth/roles');
// const {
//     LANGUAGES_ENUM
// } = require('../config/constants/languages');
// const {
//     COMPLAINT_STATUS_ENUM
// } = require('../config/constants/complaint');
//
// const {
//     PAYMENT_STATUS_ENUM
// } = require('../config/constants/payment');
module.exports = {
    SginUpSchema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 2
            },
            email: {
                type: 'string',
                pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 20,
            },

        },
        required: ['name', 'email', 'password'],
    },
    loginSchema: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                minLength: 6,
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 20,
            },
        },
        required: ['email', 'password'],
    },
    todoSchema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 2
            },
            details: {
                type: 'string',
                minLength: 2
            }
        },
        required: [ 'name'],
    }
}