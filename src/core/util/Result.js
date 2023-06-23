export default class Result {
    constructor({
        error = [],
        status = null,
        data = [],
        count = 0
    } = {}) {
        this.error = error;
        this.status = status;
        this.data = data;
        this.count = count;
    }
}