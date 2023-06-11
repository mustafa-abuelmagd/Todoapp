"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessError = exports.UnexpectedError = exports.ValidationError = exports.UnauthorizedError = exports.UnauthenticatedError = exports.NotFoundError = exports.BaseError = void 0;
class BaseError extends Error {
    constructor(code = 0, name = "Error", status = 500, message = "Internal Server Error") {
        super(message);
        this.code = code;
        this.name = name;
        this.status = status;
        this.message = message;
    }
    toJson() {
        return {
            error: this.name,
            message: this.message,
        };
    }
}
exports.BaseError = BaseError;
class NotFoundError extends BaseError {
    constructor(code = 0, name = "Error 404", status = 404, message = "Resource Not Found") {
        super(code, name, status, message);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthenticatedError extends BaseError {
    constructor(code = 0, name = "UnAuthenticatedError", status = 403, message = "You Cannot View This Resource Unauthenticated.") {
        super(code, name, status, message);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class UnauthorizedError extends BaseError {
    constructor(code = 0, name = "UnAuthorizedError", status = 401, message = "You Are Unauthorized To View This Resource.") {
        super(code, name, status, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ValidationError extends BaseError {
    constructor(code = 0, name = "ValidationError", status = 400, message = "Bad Request") {
        super(code, name, status, message);
    }
}
exports.ValidationError = ValidationError;
class UnexpectedError extends BaseError {
    constructor(code = 0, name = "UnexpectedError", status = 500, message = "Resource Not Found") {
        super(code, name, status, message);
    }
}
exports.UnexpectedError = UnexpectedError;
class BusinessError extends BaseError {
    constructor(code = 0, name = "UnexpectedError", status = 500, message = "Business error") {
        super(code, name, status, message);
    }
}
exports.BusinessError = BusinessError;
