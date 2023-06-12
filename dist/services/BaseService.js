"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const Errors_1 = require("../helpers/errors/Errors");
class BaseService {
    constructor() {
        this.UnauthenticatedError = new Errors_1.UnauthenticatedError;
        this.UnauthorizedError = new Errors_1.UnauthorizedError;
        this.NotFoundError = new Errors_1.NotFoundError;
        this.ValidationError = new Errors_1.ValidationError;
        this.BusinessError = new Errors_1.BusinessError;
    }
}
exports.BaseService = BaseService;
