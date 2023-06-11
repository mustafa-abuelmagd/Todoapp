"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = exports.loginSchema = exports.SignUpSchema = void 0;
// export SignUpSchema = {
//     SignUpSchema: {
//         type: 'object',
//         properties: {
//             name: {
//                 type: 'string',
//                 minLength: 2
//             },
//             email: {
//                 type: 'string',
//                 pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
//             },
//             password: {
//                 type: 'string',
//                 minLength: 6,
//                 maxLength: 20,
//             },
//
//         },
//         required: ['name', 'email', 'password'],
//     },
//     loginSchema: {
//         type: 'object',
//         properties: {
//             email: {
//                 type: 'string',
//                 minLength: 6,
//             },
//             password: {
//                 type: 'string',
//                 minLength: 6,
//                 maxLength: 20,
//             },
//         },
//         required: ['email', 'password'],
//     },
//     todoSchema: {
//         type: 'object',
//         properties: {
//             userId: {
//                 type: 'string',
//                 minLength: 2
//             },
//             name: {
//                 type: 'string',
//                 minLength: 2
//             },
//             details: {
//                 type: 'string',
//                 minLength: 2
//             }
//         },
//         required: ['userId', 'name'],
//     }
// }
exports.SignUpSchema = {
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
};
exports.loginSchema = {
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
};
exports.todoSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            minLength: 2
        },
        name: {
            type: 'string',
            minLength: 2
        },
        details: {
            type: 'string',
            minLength: 2
        }
    },
    required: ['userId', 'name'],
};