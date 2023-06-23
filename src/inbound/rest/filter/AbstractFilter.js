export default class AbstractFilter {
    constructor(req) {
        this.filter = {}
        this.getPathParams(req);
        this.getQueryParams(req);
    }

    getPathParams(req) {
        const pathParamsKeys = Object.keys(req.params);
        for (const key of pathParamsKeys) {
            this.filter[key] = req.params[key];
        }
    }

    getQueryParams(req) {
        const queryParamsKeys = Object.keys(req.query);
        for (const key of queryParamsKeys) {
            this.filter[key] = req.query[key];
        }        
    }
}