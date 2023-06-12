"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    constructor(url, type, router) {
        this.url = url;
        this.type = type;
        this.router = router;
    }
}
exports.BaseController = BaseController;
