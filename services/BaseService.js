const ERRORS = require('../helpers/errors/Errors')

class BaseService {
    constructor() {

        this.UnauthenticatedError = ERRORS.UnauthenticatedError;
        this.UnauthorizedError = ERRORS.UnauthorizedError;
        this.NotFoundError = ERRORS.NotFoundError;
        this.ValidationError = ERRORS.ValidationError;
        this.BusinessError = ERRORS.BusinessError;
    }
}

module.exports = BaseService;