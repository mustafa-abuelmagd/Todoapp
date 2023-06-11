class BaseController {
    url: string;
    type: string;
    router: any;

    constructor(url: string, type: string, router: any) {
        this.url = url;
        this.type = type;
        this.router = router;
    }
}

module.exports = {
    BaseController
};