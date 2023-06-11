import {
    UnauthenticatedError,
    UnauthorizedError,
    NotFoundError,
    ValidationError,
    BusinessError
} from '../helpers/errors/Errors';

class BaseService {
    UnauthenticatedError?: UnauthenticatedError;
    UnauthorizedError?: UnauthorizedError;
    NotFoundError?: NotFoundError;
    ValidationError?: ValidationError;
    BusinessError?: BusinessError;

    constructor() {

        this.UnauthenticatedError = new UnauthenticatedError;
        this.UnauthorizedError = new UnauthorizedError;
        this.NotFoundError = new NotFoundError;
        this.ValidationError = new ValidationError;
        this.BusinessError = new BusinessError;
    }
}

module.exports = BaseService;