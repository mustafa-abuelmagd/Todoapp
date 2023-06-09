
module.exports = {
    SginUpSchema: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                pattern: '^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$'
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 20,
            },
            invitationCode: {
                type: 'string',
            },
        },
        required: ['email', 'password'],
    },
    loginSchema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 6,
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 20,
            },
            type: {
                type: 'string',
                enum: ROLE_NAMES_ENUM,
            },
            device_id: {
                type: "string"
            }
        },
        required: ['name', 'password', 'type'],
    },
    emailSchema: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                minLength: 2
            },
            subject: {
                type: 'string',
                minLength: 2
            }
        },
        required: ['email'],
    },
    updateProfileSchema: {
        type: 'object',
        properties: {
            device_id: {
                type: 'string'
            },
            mobile: {
                type: 'string'
            },
            name: {
                type: 'string'
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 20,
            },
            email: {
                type: 'string',
                pattern: '^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$'
            },
            search_input: {
                type: 'array',
                items: {
                    type: "string"
                }
            },
        },
    },
    verifySchema: {
        type: 'object',
        properties: {
            user: {
                type: 'string',
                pattern: '^[0-9a-fA-F]{24}$',
            },
            mobile_token: {
                type: 'number'
            }
        },
        required: ['user', 'mobile_token'],
    },
}